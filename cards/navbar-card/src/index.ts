import { html, css, nothing, type PropertyValues } from 'lit';
import { state } from 'lit/decorators.js';
import { bus } from '@glass-cards/event-bus';
import {
  BaseCard,
  type HomeAssistant,
  type LovelaceCardConfig,
  type EntityRegistryEntry,
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

export class GlassNavbarCard extends BaseCard {
  @state() private _items: NavItem[] = [];
  @state() private _activeArea: string | null = null;
  private _popup: HTMLElement | null = null;

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
      }

      .nav-label {
        font-size: 11px;
        font-weight: 600;
        white-space: nowrap;
        overflow: hidden;
        max-width: 0;
        opacity: 0;
        transition:
          max-width 0.35s var(--ease-out),
          opacity var(--t-fast);
      }
      .nav-item.active .nav-label {
        max-width: 80px;
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
    this._popup = document.createElement('glass-room-popup');
    document.body.appendChild(this._popup);

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
      this._discoverAreas();
      if (this._popup) {
        (this._popup as unknown as { hass: HomeAssistant }).hass = this.hass;
      }
    }
  }

  private _discoverAreas() {
    if (!this.hass?.areas) return;

    const items: NavItem[] = [];

    for (const area of Object.values(this.hass.areas)) {
      const areaEntities = this._getAreaEntities(area.area_id);
      if (areaEntities.length === 0) continue;

      let lightsOn = 0;
      let temperature: string | null = null;
      let humidity: string | null = null;
      let mediaPlaying = false;
      const entityIds: string[] = [];

      for (const regEntry of areaEntities) {
        const entity = this.hass.states[regEntry.entity_id];
        if (!entity) continue;

        const domain = regEntry.entity_id.split('.')[0];
        entityIds.push(regEntry.entity_id);

        if (domain === 'light' && entity.state === 'on') {
          lightsOn++;
        }
        if (domain === 'sensor') {
          const dc = entity.attributes.device_class;
          if (dc === 'temperature' && !temperature) {
            temperature = `${entity.state}°`;
          }
          if (dc === 'humidity' && !humidity) {
            humidity = `${entity.state}%`;
          }
        }
        if (domain === 'media_player' && entity.state === 'playing') {
          mediaPlaying = true;
        }
      }

      items.push({
        areaId: area.area_id,
        name: area.name,
        icon: area.icon || 'mdi:home',
        lightsOn,
        temperature,
        humidity,
        mediaPlaying,
        entityIds,
      });
    }

    this._items = items;
  }

  private _getAreaEntities(areaId: string): EntityRegistryEntry[] {
    if (!this.hass) return [];
    return Object.values(this.hass.entities).filter((e) => {
      if (e.disabled_by || e.hidden_by) return false;
      return this._resolveAreaId(e) === areaId;
    });
  }

  private _resolveAreaId(entry: EntityRegistryEntry): string | null {
    if (entry.area_id) return entry.area_id;
    if (entry.device_id && this.hass?.devices) {
      const device = this.hass.devices[entry.device_id];
      if (device?.area_id) return device.area_id;
    }
    return null;
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
        class="nav-item ${isActive ? 'active' : ''}"
        @click=${(e: Event) => this._handleNavClick(item, e)}
        aria-label=${item.name}
      >
        <ha-icon .icon=${item.icon}></ha-icon>
        <span class="nav-label">${item.name}</span>
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
