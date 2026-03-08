import { html, css, nothing, type PropertyValues } from 'lit';
import { state } from 'lit/decorators.js';
import { bus, type AmbientPeriod } from '@glass-cards/event-bus';
import {
  BaseCard,
  BackendService,
  getAreaEntities,
  type HomeAssistant,
  type LovelaceCardConfig,
} from '@glass-cards/base-card';
import { glassTokens, glassMixin } from '@glass-cards/ui-core';
import { setLanguage } from '@glass-cards/i18n';
import './editor';

function computeAmbientPeriod(hass: HomeAssistant): AmbientPeriod {
  const sun = hass.states['sun.sun'];
  if (!sun) {
    // Fallback: time-based periods
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 10) return 'morning';
    if (hour >= 10 && hour < 17) return 'day';
    if (hour >= 17 && hour < 21) return 'evening';
    return 'night';
  }
  const elevation = parseFloat(sun.attributes.elevation as string) || 0;
  if (elevation > 20) return 'day';
  if (elevation > 0) {
    // Sun is low — determine if rising (morning) or setting (evening)
    const nextSetting = Date.parse(sun.attributes.next_setting as string);
    const nextRising = Date.parse(sun.attributes.next_rising as string);
    // If next_setting is sooner than next_rising, sun is going down → evening
    if (!isNaN(nextSetting) && !isNaN(nextRising)) {
      return nextSetting < nextRising ? 'evening' : 'morning';
    }
    return sun.state === 'above_horizon' ? 'day' : 'night';
  }
  // elevation <= 0 — below horizon
  // Distinguish deep night from twilight (dusk/dawn)
  if (elevation > -6) {
    const nextRising = Date.parse(sun.attributes.next_rising as string);
    const nextSetting = Date.parse(sun.attributes.next_setting as string);
    if (!isNaN(nextRising) && !isNaN(nextSetting)) {
      return nextRising < nextSetting ? 'morning' : 'evening';
    }
  }
  return 'night';
}

const DEFAULT_TEMP_HIGH = 24.0;
const DEFAULT_TEMP_LOW = 17.0;
const DEFAULT_HUMIDITY_THRESHOLD = 65;

interface NavItem {
  areaId: string;
  name: string;
  icon: string;
  lightsOn: number;
  temperature: string | null;
  tempValue: number | null;
  humidity: string | null;
  humidityValue: number | null;
  mediaPlaying: boolean;
  entityIds: string[];
}

interface AreaStructure {
  areaId: string;
  name: string;
  icon: string;
  entityIds: string[];
}

export class GlassNavbarCard extends BaseCard {
  @state() private _items: NavItem[] = [];
  @state() private _activeArea: string | null = null;
  @state() private _scrollMask: 'none' | 'mask-right' | 'mask-left' | 'mask-both' = 'none';
  private _popup: HTMLElement | null = null;
  private _ownsPopup = false;
  private _areaStructure: AreaStructure[] = [];
  private _lastAreaKeys = '';
  private _lastEntitiesRef?: Record<string, unknown>;
  private _cachedEntityFingerprint = '';
  private _boundUpdateMask = this._updateNavMask.bind(this);
  private _scrollEl: Element | null = null;
  private _navbarConfig: {
    room_order: string[];
    hidden_rooms: string[];
    show_lights?: boolean;
    show_temperature?: boolean;
    show_humidity?: boolean;
    show_media?: boolean;
    auto_sort?: boolean;
    temp_high?: number;
    temp_low?: number;
    humidity_threshold?: number;
  } | null = null;
  private _configLoaded = false;
  private _roomConfigs: Record<string, { icon?: string | null }> = {};
  private _flipPositions = new Map<string, number>();
  private _backend?: BackendService;
  private _configReady = false;
  private _lastAmbientPeriod: AmbientPeriod | null = null;
  @state() private _editMode = false;

  static getConfigElement() {
    return document.createElement('glass-navbar-card-editor');
  }

  static styles = [
    glassTokens,
    glassMixin,
    css`
      :host {
        display: block;
        height: 0;
        overflow: visible;
      }

      .navbar {
        position: fixed;
        bottom: 16px;
        left: 50%;
        transform: translateX(-50%);
        max-width: 500px;
        width: calc(100vw - 32px);
        height: 58px;
        border-radius: 20px;
        display: flex;
        align-items: center;
        padding: 0 6px;
        box-sizing: border-box;
        z-index: 9997;
        font-family: 'Plus Jakarta Sans', sans-serif;
      }

      .nav-scroll {
        display: flex;
        align-items: center;
        gap: 4px;
        overflow-x: auto;
        scrollbar-width: none;
        flex: 1;
        padding-block: 8px;
      }
      .nav-scroll::before,
      .nav-scroll::after {
        content: '';
        flex: 1 0 8px;
      }
      .nav-scroll::-webkit-scrollbar {
        display: none;
      }

      .nav-item {
        background: transparent;
        border: none;
        border-radius: 14px;
        min-width: 42px;
        height: 42px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 10px;
        cursor: pointer;
        position: relative;
        color: var(--t3);
        font-family: inherit;
        outline: none;
        flex-shrink: 0;
        transition:
          background var(--t-fast),
          color var(--t-fast);
      }
      @media (hover: hover) {
        .nav-item:hover {
          background: var(--s2);
        }
      }
      .nav-item.active {
        background: rgba(255, 255, 255, 0.1);
        color: var(--t1);
      }

      .nav-item ha-icon {
        --mdc-icon-size: 22px;
        flex-shrink: 0;
        transition: color var(--t-fast);
      }

      /* 1. Pulse-light: oscillating glow on lights-on icons */
      .nav-item.has-light .nav-content > ha-icon {
        color: var(--c-light-glow);
        filter: drop-shadow(0 0 6px rgba(251, 191, 36, 0.6));
        animation: pulse-light 3s ease-in-out infinite;
      }
      @keyframes pulse-light {
        0%,
        100% {
          filter: drop-shadow(0 0 6px rgba(251, 191, 36, 0.6));
        }
        50% {
          filter: drop-shadow(0 0 2px rgba(251, 191, 36, 0.2));
        }
      }

      .nav-content {
        position: relative;
        display: flex;
        align-items: center;
        flex-shrink: 0;
      }
      .nav-item.active .nav-content {
        gap: 6px;
      }

      /* 2. Humidity bar centered on nav-content (icon + label, excludes badge) */
      .humidity-bar {
        position: absolute;
        bottom: -6px;
        left: 50%;
        transform: translateX(-50%);
        width: 14px;
        height: 3px;
        border-radius: 2px;
        background: var(--c-temp-cold);
        opacity: 0.8;
        box-shadow: 0 0 6px rgba(96, 165, 250, 0.4);
      }

      /* 3. Music icon bounce */
      .nav-item.has-music .nav-content > ha-icon {
        animation: pulse-music 0.8s ease-in-out infinite;
      }
      /* Combined: light glow + music bounce */
      .nav-item.has-light.has-music .nav-content > ha-icon {
        color: var(--c-light-glow);
        animation:
          pulse-light 3s ease-in-out infinite,
          pulse-music 0.8s ease-in-out infinite;
      }
      @keyframes pulse-music {
        0%,
        100% {
          transform: scale(1);
        }
        30% {
          transform: scale(1.2);
        }
        50% {
          transform: scale(0.95);
        }
        70% {
          transform: scale(1.1);
        }
      }

      /* 4. Temp badges (hot/cold) */
      .nav-temp-badge {
        position: absolute;
        top: 2px;
        right: 4px;
        width: 14px;
        height: 14px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        pointer-events: none;
        transition: opacity var(--t-fast);
      }
      .nav-temp-badge ha-icon {
        --mdc-icon-size: 10px;
      }
      .nav-item.has-temp-hot .nav-temp-badge {
        opacity: 1;
        color: var(--c-temp-hot);
        filter: drop-shadow(0 0 4px rgba(248, 113, 113, 0.6));
        animation: pulse-temp-hot 2s infinite ease-in-out;
      }
      .nav-item.has-temp-cold .nav-temp-badge {
        opacity: 1;
        color: var(--c-temp-cold);
        filter: drop-shadow(0 0 4px rgba(96, 165, 250, 0.6));
        animation: pulse-temp-cold 2s infinite ease-in-out;
      }
      @keyframes pulse-temp-hot {
        0%,
        100% {
          transform: scale(1);
          filter: drop-shadow(0 0 0 transparent);
        }
        50% {
          transform: scale(1.15);
          filter: drop-shadow(0 0 6px rgba(248, 113, 113, 0.6));
        }
      }
      @keyframes pulse-temp-cold {
        0%,
        100% {
          transform: scale(1);
          filter: drop-shadow(0 0 0 transparent);
        }
        50% {
          transform: scale(1.15);
          filter: drop-shadow(0 0 6px rgba(96, 165, 250, 0.6));
        }
      }

      /* 5. Dynamic scroll masking */
      .nav-scroll.mask-right {
        -webkit-mask-image: linear-gradient(to right, black calc(100% - 20px), transparent 100%);
        mask-image: linear-gradient(to right, black calc(100% - 20px), transparent 100%);
      }
      .nav-scroll.mask-left {
        -webkit-mask-image: linear-gradient(to left, black calc(100% - 20px), transparent 100%);
        mask-image: linear-gradient(to left, black calc(100% - 20px), transparent 100%);
      }
      .nav-scroll.mask-both {
        -webkit-mask-image: linear-gradient(
          to right,
          transparent 0%,
          black 20px,
          black calc(100% - 20px),
          transparent 100%
        );
        mask-image: linear-gradient(
          to right,
          transparent 0%,
          black 20px,
          black calc(100% - 20px),
          transparent 100%
        );
      }

      .nav-label-wrap {
        display: grid;
        grid-template-columns: 0fr;
        transition: grid-template-columns 0.35s var(--ease-out);
        overflow: hidden;
      }
      .nav-item.active .nav-label-wrap {
        grid-template-columns: 1fr;
      }
      .nav-label {
        font-size: 11px;
        font-weight: 600;
        white-space: nowrap;
        min-width: 0;
        opacity: 0;
        transition: opacity var(--t-fast);
      }
      .nav-item.active .nav-label {
        opacity: 1;
      }

      /* Focus-visible ring */
      .nav-item:focus-visible {
        outline: 2px solid var(--c-accent);
        outline-offset: 2px;
      }
    `,
  ];

  connectedCallback() {
    super.connectedCallback();
    // Singleton popup — reuse existing if another navbar instance created one
    const existing = document.querySelector('glass-room-popup') as HTMLElement | null;
    if (existing) {
      this._popup = existing;
      this._ownsPopup = false;
    } else {
      this._popup = document.createElement('glass-room-popup');
      document.body.appendChild(this._popup);
      this._ownsPopup = true;
    }

    this._listen('popup-close', () => {
      this._activeArea = null;
    });

    this._listen('navbar-config-changed', () => {
      this._loadBackendConfig();
    });

    this._editMode = this._detectEditMode();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._ownsPopup) this._popup?.remove();
    this._popup = null;
    this._ownsPopup = false;
    if (this._scrollEl) {
      this._scrollEl.removeEventListener('scroll', this._boundUpdateMask);
      this._scrollEl = null;
    }
    this._backend = undefined;
  }

  protected firstUpdated(changedProps: PropertyValues) {
    super.firstUpdated(changedProps);
    this._attachScrollListener();
  }

  private _detectEditMode(): boolean {
    let root = this.getRootNode() as ShadowRoot | Document;
    while (root instanceof ShadowRoot) {
      const host = root.host as HTMLElement & { lovelace?: { editMode?: boolean } };
      if (host.tagName === 'HUI-CARD-OPTIONS') return true;
      if (host.tagName === 'HUI-DIALOG-EDIT-CARD') return true;
      if (host.tagName === 'HA-PANEL-LOVELACE' && host.lovelace?.editMode) return true;
      root = host.getRootNode() as ShadowRoot | Document;
    }
    return false;
  }

  private _attachScrollListener() {
    if (this._scrollEl) return;
    const scroll = this.renderRoot.querySelector('.nav-scroll');
    if (!scroll) return;
    scroll.addEventListener('scroll', this._boundUpdateMask, { passive: true });
    this._scrollEl = scroll;
    this._updateNavMask();
  }

  setConfig(config: LovelaceCardConfig) {
    super.setConfig(config);
  }

  getCardSize() {
    return 0;
  }

  protected getTrackedEntityIds(): string[] {
    return ['sun.sun', ...this._items.flatMap((item) => item.entityIds)];
  }

  updated(changedProps: PropertyValues) {
    // Update global language singleton without setting _lang (no re-render needed)
    if (changedProps.has('hass') && this.hass) {
      if (this.hass.language) setLanguage(this.hass.language);
      this._editMode = this._detectEditMode();
      if (this._editMode) return;
      if (!this._configLoaded) {
        this._configLoaded = true;
        this._loadBackendConfig();
      }
      if (this._configReady) {
        this._rebuildStructure();
        this._aggregateState();
      }
      this._updateAmbient();
      if (this._popup) {
        (this._popup as unknown as { hass: HomeAssistant }).hass = this.hass;
      }
    }
    if (changedProps.has('_items')) {
      this.updateComplete.then(() => {
        this._attachScrollListener();
        this._updateNavMask();
        this._animateFlip();
      });
    }
  }

  private async _loadBackendConfig() {
    if (!this.hass) return;
    try {
      if (!this._backend) this._backend = new BackendService(this.hass);
      const result = await this._backend.send<{
        navbar: {
          room_order: string[];
          hidden_rooms: string[];
          show_lights?: boolean;
          show_temperature?: boolean;
          show_humidity?: boolean;
          show_media?: boolean;
          temp_high?: number;
          temp_low?: number;
          humidity_threshold?: number;
        };
        rooms: Record<string, { icon?: string | null }>;
      }>('get_config');
      this._navbarConfig = result.navbar;
      this._roomConfigs = result.rooms ?? {};
      // Force rebuild with new config
      this._configReady = true;
      this._lastAreaKeys = '';
      this._rebuildStructure();
      this._aggregateState();
    } catch {
      // Backend not available — use auto-discovery defaults
      this._configReady = true;
      this._rebuildStructure();
      this._aggregateState();
    }
  }

  private _rebuildStructure() {
    if (!this.hass?.areas) return;
    const configKey = this._navbarConfig
      ? `${this._navbarConfig.room_order.join(',')}|${this._navbarConfig.hidden_rooms.join(',')}`
      : '';
    // Only recalculate entity fingerprint when entities registry reference changes
    if (this.hass.entities !== this._lastEntitiesRef) {
      this._lastEntitiesRef = this.hass.entities;
      this._cachedEntityFingerprint = Object.values(this.hass.entities)
        .map((e) => `${e.entity_id}:${e.area_id ?? ''}`)
        .sort()
        .join('|');
    }
    const entityFingerprint = this._cachedEntityFingerprint;
    const iconKey = Object.entries(this._roomConfigs)
      .map(([k, v]) => `${k}:${v.icon ?? ''}`)
      .sort()
      .join(',');
    const cacheKey =
      Object.keys(this.hass.areas).sort().join(',') + '||' + entityFingerprint + '||' + configKey + '||' + iconKey;
    if (cacheKey === this._lastAreaKeys) return;
    this._lastAreaKeys = cacheKey;

    const hiddenSet = new Set(this._navbarConfig?.hidden_rooms ?? []);
    const orderMap = new Map<string, number>();
    (this._navbarConfig?.room_order ?? []).forEach((id, i) => orderMap.set(id, i));

    const allAreas: AreaStructure[] = [];
    for (const area of Object.values(this.hass.areas)) {
      if (hiddenSet.has(area.area_id)) continue;
      const areaEntities = getAreaEntities(area.area_id, this.hass.entities, this.hass.devices);
      if (areaEntities.length === 0) continue;
      const backendIcon = this._roomConfigs[area.area_id]?.icon;
      allAreas.push({
        areaId: area.area_id,
        name: area.name,
        icon: backendIcon || area.icon || 'mdi:home',
        entityIds: areaEntities.map((e) => e.entity_id),
      });
    }

    // Sort by backend order, then alphabetically
    allAreas.sort((a, b) => {
      const aOrder = orderMap.get(a.areaId);
      const bOrder = orderMap.get(b.areaId);
      if (aOrder !== undefined && bOrder !== undefined) return aOrder - bOrder;
      if (aOrder !== undefined) return -1;
      if (bOrder !== undefined) return 1;
      return a.name.localeCompare(b.name);
    });

    this._areaStructure = allAreas;
  }

  private _aggregateState() {
    if (!this.hass) return;
    const items: NavItem[] = this._areaStructure.map((area) => {
      let lightsOn = 0;
      let temperature: string | null = null;
      let tempValue: number | null = null;
      let humidity: string | null = null;
      let humidityValue: number | null = null;
      let mediaPlaying = false;

      for (const entityId of area.entityIds) {
        const entity = this.hass?.states[entityId];
        if (!entity) continue;
        const domain = entityId.split('.')[0];

        if (domain === 'light' && entity.state === 'on') lightsOn++;
        if (domain === 'sensor') {
          const dc = entity.attributes.device_class;
          if (dc === 'temperature' && !temperature) {
            temperature = `${entity.state}°`;
            tempValue = parseFloat(entity.state);
          }
          if (dc === 'humidity' && !humidity) {
            humidity = `${entity.state}%`;
            humidityValue = parseFloat(entity.state);
          }
        }
        if (domain === 'media_player' && entity.state === 'playing') mediaPlaying = true;
      }

      return { ...area, lightsOn, temperature, tempValue, humidity, humidityValue, mediaPlaying };
    });

    // Stable sort: bubble lit rooms to front while preserving relative order
    const autoSort = this._navbarConfig?.auto_sort !== false;
    if (autoSort) {
      items.sort((a, b) => {
        const aLit = a.lightsOn > 0 ? 0 : 1;
        const bLit = b.lightsOn > 0 ? 0 : 1;
        return aLit - bLit;
      });
    }

    // FLIP: capture current positions before DOM update
    this._snapshotPositions();

    this._items = items;
  }

  private _updateAmbient() {
    if (!this.hass) return;
    const period = computeAmbientPeriod(this.hass);
    if (period !== this._lastAmbientPeriod) {
      this._lastAmbientPeriod = period;
      bus.emit('ambient-update', { period });
    }
  }

  private _snapshotPositions() {
    this._flipPositions.clear();
    const buttons = this.renderRoot.querySelectorAll<HTMLElement>('.nav-item[data-area]');
    for (const btn of buttons) {
      const areaId = btn.dataset.area;
      if (!areaId) continue;
      this._flipPositions.set(areaId, btn.getBoundingClientRect().left);
    }
  }

  private _animateFlip() {
    if (this._flipPositions.size === 0) return;
    const buttons = this.renderRoot.querySelectorAll<HTMLElement>('.nav-item[data-area]');
    for (const btn of buttons) {
      const areaId = btn.dataset.area;
      if (!areaId) continue;
      const oldLeft = this._flipPositions.get(areaId);
      if (oldLeft === undefined) continue;
      const newLeft = btn.getBoundingClientRect().left;
      const deltaX = oldLeft - newLeft;
      if (Math.abs(deltaX) < 1) continue;
      btn.animate(
        [
          { transform: `translateX(${deltaX}px)` },
          { transform: 'translateX(0)' },
        ],
        { duration: 350, easing: 'cubic-bezier(0.4, 0, 0.2, 1)' },
      );
    }
    this._flipPositions.clear();
  }

  private _updateNavMask() {
    const scroll = this.renderRoot.querySelector('.nav-scroll') as HTMLElement | null;
    if (!scroll) return;
    const isScrollable = scroll.scrollWidth > scroll.offsetWidth;
    if (!isScrollable) {
      this._scrollMask = 'none';
      return;
    }
    const isAtStart = scroll.scrollLeft <= 5;
    const isAtEnd = scroll.scrollLeft + scroll.offsetWidth >= scroll.scrollWidth - 5;
    if (isAtStart && isAtEnd) this._scrollMask = 'none';
    else if (isAtStart) this._scrollMask = 'mask-right';
    else if (isAtEnd) this._scrollMask = 'mask-left';
    else this._scrollMask = 'mask-both';
  }

  private _handleNavClick(item: NavItem, e: Event) {
    const button = e.currentTarget as HTMLElement;
    const rect = button.getBoundingClientRect();

    if (this._activeArea === item.areaId) {
      bus.emit('popup-close', undefined);
      this._activeArea = null;
    } else {
      this._activeArea = item.areaId;
      bus.emit('popup-open', { areaId: item.areaId, originRect: rect });
    }
  }

  private _renderNavItem(item: NavItem) {
    const isActive = this._activeArea === item.areaId;
    const showLights = this._navbarConfig?.show_lights !== false;
    const showTemp = this._navbarConfig?.show_temperature !== false;
    const showHumidity = this._navbarConfig?.show_humidity !== false;
    const showMedia = this._navbarConfig?.show_media !== false;
    const tempHigh = this._navbarConfig?.temp_high ?? DEFAULT_TEMP_HIGH;
    const tempLow = this._navbarConfig?.temp_low ?? DEFAULT_TEMP_LOW;
    const humidityThreshold = this._navbarConfig?.humidity_threshold ?? DEFAULT_HUMIDITY_THRESHOLD;
    const hasLight = showLights && item.lightsOn > 0;
    const hasHumidity = showHumidity && item.humidityValue !== null && item.humidityValue >= humidityThreshold;
    const hasMusic = showMedia && item.mediaPlaying;
    const hasTempHot = showTemp && item.tempValue !== null && item.tempValue >= tempHigh;
    const hasTempCold = showTemp && item.tempValue !== null && !hasTempHot && item.tempValue <= tempLow;

    const classes = [
      'nav-item',
      isActive ? 'active' : '',
      hasLight ? 'has-light' : '',
      hasMusic ? 'has-music' : '',
      hasTempHot ? 'has-temp-hot' : '',
      hasTempCold ? 'has-temp-cold' : '',
    ]
      .filter(Boolean)
      .join(' ');

    return html`
      <button
        class=${classes}
        data-area=${item.areaId}
        @click=${(e: Event) => this._handleNavClick(item, e)}
        aria-label=${item.name}
        aria-pressed=${isActive ? 'true' : 'false'}
      >
        <span class="nav-temp-badge">
          <ha-icon .icon=${hasTempHot ? 'mdi:thermometer-high' : 'mdi:snowflake'}></ha-icon>
        </span>
        <span class="nav-content">
          <ha-icon .icon=${item.icon}></ha-icon>
          <span class="nav-label-wrap"><span class="nav-label">${item.name}</span></span>
          ${hasHumidity ? html`<span class="humidity-bar"></span>` : nothing}
        </span>
      </button>
    `;
  }

  render() {
    if (this._editMode || this._items.length === 0) return nothing;

    const scrollClass = `nav-scroll${this._scrollMask !== 'none' ? ` ${this._scrollMask}` : ''}`;
    return html`
      <nav class="navbar glass glass-float">
        <div class=${scrollClass}>${this._items.map((item) => this._renderNavItem(item))}</div>
      </nav>
    `;
  }
}

customElements.define('glass-navbar-card', GlassNavbarCard);

// Lovelace card registration
const windowWithCards = window as unknown as {
  customCards?: { type: string; name: string; description: string }[];
};
windowWithCards.customCards = windowWithCards.customCards || [];
windowWithCards.customCards.push({
  type: 'glass-navbar-card',
  name: 'Glass Navbar Card',
  description: 'Auto-discovering bottom navigation for Glass Cards',
});
