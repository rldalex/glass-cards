import { html, css, nothing, type TemplateResult } from 'lit';
import { property, state } from 'lit/decorators.js';
import {
  BaseCard,
  type HassEntity,
  type LovelaceCardConfig,
} from '@glass-cards/base-card';
import {
  glassTokens,
  hostMixin,
  glassMixin,
  foldMixin,
  marqueeMixin,
  bounceMixin,
  unavailableMixin,
  isEntityUnavailable,
} from '@glass-cards/ui-core';
import { t } from '@glass-cards/i18n';
import {
  discoverVacuumCompanions,
  entityState,
  isBinaryOn,
  numericState,
  type VacuumCompanions,
} from './companions';

export class GlassVacuumCard extends BaseCard {
  getCardSize(): number {
    return 4;
  }

  @property({ attribute: false }) hass?: import('@glass-cards/base-card').HomeAssistant;
  @property({ attribute: false }) config?: LovelaceCardConfig;

  @state() private _foldDailyOpen = false;
  @state() private _foldMaintenanceOpen = false;

  private _locateTimer: ReturnType<typeof setTimeout> | null = null;
  private _confirmTimerId: ReturnType<typeof setTimeout> | null = null;

  setConfig(config: LovelaceCardConfig): void {
    if (!config?.entity || !(config.entity as string).startsWith('vacuum.')) {
      throw new Error('vacuum-card: config.entity must be a vacuum.* entity_id');
    }
    this.config = config;
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this._locateTimer) clearTimeout(this._locateTimer);
    if (this._confirmTimerId) clearTimeout(this._confirmTimerId);
    this._locateTimer = null;
    this._confirmTimerId = null;
  }

  static styles = [
    glassTokens,
    hostMixin,
    glassMixin,
    foldMixin,
    marqueeMixin,
    bounceMixin,
    unavailableMixin,
    css`
      :host {
        --rgb-info: 96, 165, 250;
        --rgb-warning: 251, 191, 36;
        width: 100%;
        color: var(--t1);
      }
      .card-inner {
        display: flex;
        flex-direction: column;
        position: relative;
        z-index: 1;
      }
      .placeholder {
        padding: 1rem;
        font-size: var(--fz-md);
        color: var(--t2);
      }
      .hero {
        position: relative;
        display: block;
        width: 100%;
        border: 0;
        padding: 0;
        margin: 0;
        background: transparent;
        cursor: pointer;
        border-radius: var(--radius-xl) var(--radius-xl) 0 0;
        overflow: hidden;
        -webkit-tap-highlight-color: transparent;
      }
      .hero-img {
        display: block;
        width: 100%;
        height: 180px;
        object-fit: cover;
        user-select: none;
        pointer-events: none;
      }
      .hero-fallback {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 180px;
        background: linear-gradient(135deg, rgba(var(--rgb-info), 0.18), rgba(var(--rgb-info), 0.06));
      }
      .hero-fallback ha-icon {
        --mdc-icon-size: 48px;
        color: var(--t3);
      }
      .pill {
        position: absolute;
        bottom: 0.75rem;
        display: inline-flex;
        align-items: center;
        gap: 0.375rem;
        padding: 0.3125rem 0.75rem;
        background: rgba(0, 0, 0, 0.35);
        border: 1px solid var(--b2);
        border-radius: var(--radius-full);
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
        font-size: var(--fz-sm);
        font-weight: 500;
        color: var(--t1);
        line-height: 1.2;
      }
      .pill .dot {
        width: 0.5rem;
        height: 0.5rem;
        border-radius: 50%;
        flex-shrink: 0;
      }
      .pill ha-icon {
        --mdc-icon-size: 1rem;
      }
      .status-pill {
        left: 0.75rem;
        max-width: calc(100% - 8rem);
      }
      .pill-label {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .battery-pill {
        right: 0.75rem;
      }
      .battery-pill.charging ha-icon {
        animation: vac-pulse 2s ease-in-out infinite;
      }
      @media (prefers-reduced-motion: reduce) {
        .battery-pill.charging ha-icon {
          animation: none;
        }
      }
      @keyframes vac-pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.55; }
      }
      .card-error {
        border-color: var(--c-alert) !important;
      }
    `,
  ];

  private _vacuumEntity(): HassEntity | null {
    if (!this.hass || !this.config?.entity) return null;
    return this.hass.states[this.config.entity as string] ?? null;
  }

  private _companions(): VacuumCompanions | null {
    if (!this.hass || !this.config?.entity) return null;
    return discoverVacuumCompanions(this.hass, this.config.entity as string);
  }

  private _statusLabel(): string {
    const vacuum = this._vacuumEntity();
    const companions = this._companions();
    if (!vacuum || !companions) return '';

    if (vacuum.state === 'error') {
      const msg = entityState(this.hass!, companions.errorMessage, '');
      return msg && msg !== 'none' ? msg : t('vacuum.status_error');
    }
    if (vacuum.state === 'cleaning') {
      const room = entityState(this.hass!, companions.currentRoom, '');
      if (room) return t('vacuum.cleaning_room', { room });
      return t('vacuum.status_cleaning');
    }
    return t(`vacuum.status_${vacuum.state}` as Parameters<typeof t>[0]) ?? vacuum.state;
  }

  private _statusColor(state: string): string {
    switch (state) {
      case 'cleaning': return 'var(--c-success)';
      case 'paused': return 'var(--c-warning)';
      case 'returning': return 'var(--c-info)';
      case 'docked': return 'var(--t3)';
      case 'error': return 'var(--c-alert)';
      default: return 'var(--t3)';
    }
  }

  private _batteryLevel(): number {
    const companions = this._companions();
    if (!companions) return 0;
    return numericState(this.hass!, companions.battery, 0);
  }

  private _batteryIcon(level: number, charging: boolean): string {
    if (charging) {
      if (level > 80) return 'mdi:battery-charging';
      if (level > 60) return 'mdi:battery-charging-70';
      if (level > 40) return 'mdi:battery-charging-50';
      if (level > 20) return 'mdi:battery-charging-30';
      return 'mdi:battery-charging-10';
    }
    if (level > 80) return 'mdi:battery';
    if (level > 60) return 'mdi:battery-70';
    if (level > 40) return 'mdi:battery-50';
    if (level > 20) return 'mdi:battery-30';
    return 'mdi:battery-10';
  }

  private _batteryColor(level: number): string {
    if (level > 50) return 'var(--c-success)';
    if (level >= 20) return 'var(--c-warning)';
    return 'var(--c-alert)';
  }

  private _toggleDailyFold(): void {
    if (!this._foldDailyOpen) {
      this._foldDailyOpen = true;
    } else if (!this._foldMaintenanceOpen) {
      this._foldMaintenanceOpen = true;
    } else {
      this._foldDailyOpen = false;
      this._foldMaintenanceOpen = false;
    }
  }

  render(): TemplateResult | typeof nothing {
    const vacuum = this._vacuumEntity();
    if (!this.hass || !this.config?.entity) return nothing;

    if (!vacuum) {
      return html`
        <div class="glass">
          <div class="card-inner">
            <div class="placeholder">Vacuum entité ${this.config.entity} introuvable.</div>
          </div>
        </div>
      `;
    }

    const companions = this._companions();
    const friendlyName = (vacuum.attributes.friendly_name as string) ?? (this.config.entity as string);
    const isUnavailable = isEntityUnavailable(vacuum.state);
    const isError = vacuum.state === 'error';

    return html`
      <div class="glass ${isUnavailable ? 'unavailable' : ''} ${isError ? 'card-error' : ''}">
        <div class="card-inner">
          ${this._renderHero(vacuum, companions, friendlyName)}
        </div>
      </div>
    `;
  }

  private _renderHero(
    vacuum: HassEntity,
    companions: VacuumCompanions | null,
    friendlyName: string,
  ): TemplateResult {
    const battery = this._batteryLevel();
    const charging = companions ? isBinaryOn(this.hass!, companions.charging) : false;
    const battIcon = this._batteryIcon(battery, charging);
    const battColor = this._batteryColor(battery);
    const statusLabel = this._statusLabel();
    const statusColor = this._statusColor(vacuum.state);
    const mapUrl = companions?.mapImage
      ? (this.hass!.states[companions.mapImage]?.attributes.entity_picture as string)
      : null;

    return html`
      <button
        class="hero"
        type="button"
        aria-label=${t('vacuum.open_controls')}
        @click=${this._toggleDailyFold}
      >
        ${mapUrl
          ? html`<img class="hero-img" src=${mapUrl} alt=${t('vacuum.map_alt', { name: friendlyName })} />`
          : html`<div class="hero-fallback">
              <ha-icon icon="mdi:map-marker-off"></ha-icon>
            </div>`}
        <div class="pill status-pill" aria-live="polite">
          <span class="dot" style=${`background:${statusColor}`}></span>
          <span class="pill-label">${statusLabel}</span>
        </div>
        <div
          class="pill battery-pill ${charging ? 'charging' : ''}"
          aria-label=${t('vacuum.battery_aria', {
            level: battery,
            charging: charging ? t('vacuum.charging') : t('vacuum.not_charging'),
          })}
        >
          <ha-icon icon=${battIcon} style=${`color:${battColor}`}></ha-icon>
          <span class="pill-label" style=${`color:${battColor}`}>${battery}%</span>
        </div>
      </button>
    `;
  }
}

customElements.define('glass-vacuum-card', GlassVacuumCard);
