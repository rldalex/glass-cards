import { html, css, nothing, type PropertyValues } from 'lit';
import { state } from 'lit/decorators.js';
import { bus } from '@glass-cards/event-bus';
import {
  BaseCard,
  getAreaEntities,
  type HomeAssistant,
  type LovelaceCardConfig,
} from '@glass-cards/base-card';
import { glassTokens, glassMixin } from '@glass-cards/ui-core';

interface NavItem {
  areaId: string;
  name: string;
  icon: string;
  lightsOn: number;
  temperature: string | null;
  humidity: string | null;
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
  private _popup: HTMLElement | null = null;
  private _areaStructure: AreaStructure[] = [];
  private _lastAreaKeys = '';

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
        z-index: 9990;
        font-family: 'Plus Jakarta Sans', sans-serif;
      }

      .nav-scroll {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 4px;
        overflow-x: auto;
        scrollbar-width: none;
        flex: 1;
        -webkit-mask-image: linear-gradient(
          to right,
          transparent 0,
          black 12px,
          black calc(100% - 12px),
          transparent 100%
        );
        mask-image: linear-gradient(
          to right,
          transparent 0,
          black 12px,
          black calc(100% - 12px),
          transparent 100%
        );
        padding: 0 8px;
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
        gap: 6px;
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
      .nav-item:hover {
        background: var(--s2);
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
      .nav-item.lights-on ha-icon {
        color: var(--c-warning);
        filter: drop-shadow(0 0 6px var(--c-warning));
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

      .indicator {
        position: absolute;
        top: 6px;
        right: 6px;
      }

      .light-dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: var(--c-warning);
        box-shadow: 0 0 6px var(--c-warning);
      }

      .temp-badge {
        font-size: 8px;
        font-weight: 700;
        color: var(--t3);
        background: var(--s2);
        border-radius: var(--radius-full);
        padding: 1px 4px;
        position: absolute;
        bottom: 4px;
        right: 2px;
      }

      .music-pulse {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: var(--c-accent);
        animation: pulse-music 0.8s ease-in-out infinite alternate;
      }

      @keyframes pulse-music {
        from {
          transform: scale(1);
        }
        to {
          transform: scale(1.4);
        }
      }
    `,
  ];

  connectedCallback() {
    super.connectedCallback();
    if (!this._popup) {
      this._popup = document.createElement('glass-room-popup');
      document.body.appendChild(this._popup);
    }

    this._listen('popup-close', () => {
      this._activeArea = null;
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._popup?.remove();
    this._popup = null;
  }

  setConfig(config: LovelaceCardConfig) {
    super.setConfig(config);
  }

  getCardSize() {
    return 0;
  }

  protected getTrackedEntityIds(): string[] {
    return this._items.flatMap((item) => item.entityIds);
  }

  updated(changedProps: PropertyValues) {
    super.updated(changedProps);
    if (changedProps.has('hass') && this.hass) {
      this._rebuildStructure();
      this._aggregateState();
      if (this._popup) {
        (this._popup as unknown as { hass: HomeAssistant }).hass = this.hass;
      }
    }
  }

  private _rebuildStructure() {
    if (!this.hass?.areas) return;
    const entityFingerprint = Object.values(this.hass.entities)
      .map((e) => `${e.entity_id}:${e.area_id ?? ''}`)
      .sort()
      .join('|');
    const cacheKey = Object.keys(this.hass.areas).sort().join(',') + '||' + entityFingerprint;
    if (cacheKey === this._lastAreaKeys) return;
    this._lastAreaKeys = cacheKey;

    this._areaStructure = [];
    for (const area of Object.values(this.hass.areas)) {
      const areaEntities = getAreaEntities(area.area_id, this.hass.entities, this.hass.devices);
      if (areaEntities.length === 0) continue;
      this._areaStructure.push({
        areaId: area.area_id,
        name: area.name,
        icon: area.icon || 'mdi:home',
        entityIds: areaEntities.map((e) => e.entity_id),
      });
    }
  }

  private _aggregateState() {
    if (!this.hass) return;
    const items: NavItem[] = this._areaStructure.map((area) => {
      let lightsOn = 0;
      let temperature: string | null = null;
      let humidity: string | null = null;
      let mediaPlaying = false;

      for (const entityId of area.entityIds) {
        const entity = this.hass?.states[entityId];
        if (!entity) continue;
        const domain = entityId.split('.')[0];

        if (domain === 'light' && entity.state === 'on') lightsOn++;
        if (domain === 'sensor') {
          const dc = entity.attributes.device_class;
          if (dc === 'temperature' && !temperature) temperature = `${entity.state}°`;
          if (dc === 'humidity' && !humidity) humidity = `${entity.state}%`;
        }
        if (domain === 'media_player' && entity.state === 'playing') mediaPlaying = true;
      }

      return { ...area, lightsOn, temperature, humidity, mediaPlaying };
    });

    this._items = items;
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
    return html`
      <button
        class="nav-item ${isActive ? 'active' : ''} ${item.lightsOn > 0 ? 'lights-on' : ''}"
        @click=${(e: Event) => this._handleNavClick(item, e)}
        aria-label=${item.name}
      >
        <ha-icon .icon=${item.icon}></ha-icon>
        <span class="nav-label-wrap"><span class="nav-label">${item.name}</span></span>
        ${item.lightsOn > 0
          ? html`<span class="indicator"><span class="light-dot"></span></span>`
          : item.mediaPlaying
            ? html`<span class="indicator"><span class="music-pulse"></span></span>`
            : nothing}
        ${item.temperature ? html`<span class="temp-badge">${item.temperature}</span>` : nothing}
      </button>
    `;
  }

  render() {
    if (this._items.length === 0) return nothing;

    return html`
      <nav class="navbar glass glass-float">
        <div class="nav-scroll">${this._items.map((item) => this._renderNavItem(item))}</div>
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
