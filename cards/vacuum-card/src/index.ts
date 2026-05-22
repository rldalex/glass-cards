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
import { humanizeRoomSlug } from './labels';

function normalize(s: string): string {
  return s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim();
}

export class GlassVacuumCard extends BaseCard {
  getCardSize(): number {
    return 4;
  }

  @property({ attribute: false }) hass?: import('@glass-cards/base-card').HomeAssistant;
  @property({ attribute: false }) config?: LovelaceCardConfig;

  @state() private _foldDailyOpen = false;
  @state() private _foldMaintenanceOpen = false;
  @state() private _pendingAction: string | null = null;
  @state() private _locateFlashing = false;

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
    this._pendingAction = null;
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
        --rgb-accent: 129, 140, 248;
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
      .rooms-row {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 0.5rem;
        padding: 0.625rem 0.75rem;
        overflow-x: auto;
        scroll-snap-type: x mandatory;
        scrollbar-width: none;
        mask-image: linear-gradient(90deg, transparent 0, black 24px, black calc(100% - 24px), transparent);
        -webkit-mask-image: linear-gradient(90deg, transparent 0, black 24px, black calc(100% - 24px), transparent);
      }
      .rooms-row::-webkit-scrollbar {
        display: none;
      }
      .room-chip {
        scroll-snap-align: start;
        flex-shrink: 0;
        display: inline-flex;
        align-items: center;
        gap: 0.375rem;
        min-height: 2.75rem;
        padding: 0 0.875rem;
        background: var(--s1);
        border: 1px solid var(--b2);
        border-radius: var(--radius-md);
        color: var(--t1);
        font-size: var(--fz-md);
        font-weight: 500;
        cursor: pointer;
        transition: background var(--t-fast), border-color var(--t-fast), transform var(--t-fast);
        white-space: nowrap;
      }
      .room-chip:active {
        transform: scale(0.97);
      }
      .room-chip.active {
        background: rgba(var(--rgb-info), 0.18);
        border-color: rgba(var(--rgb-info), 0.4);
      }
      .room-chip.all-house {
        background: rgba(var(--rgb-accent), 0.12);
        border-color: rgba(var(--rgb-accent), 0.3);
      }
      .room-chip.confirming {
        background: rgba(var(--rgb-warning), 0.18);
        border-color: rgba(var(--rgb-warning), 0.45);
      }
      .room-chip ha-icon {
        --mdc-icon-size: 1.125rem;
      }
      .rooms-sep {
        display: inline-block;
        width: 1px;
        height: 1.5rem;
        background: var(--b1);
        flex-shrink: 0;
      }
      .dot-pulse {
        width: 0.5rem;
        height: 0.5rem;
        border-radius: 50%;
        background: var(--c-info);
        animation: vac-dot-pulse 1.5s ease-in-out infinite;
      }
      @media (prefers-reduced-motion: reduce) {
        .dot-pulse {
          animation: none;
        }
      }
      @keyframes vac-dot-pulse {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.5; transform: scale(0.85); }
      }
      .transport {
        display: flex;
        gap: 0.5rem;
        padding: 0.5rem 0.75rem 0.75rem;
        align-items: center;
      }
      .transport-error {
        gap: 0.5rem;
      }
      .t-btn {
        position: relative;
        flex: 0 0 auto;
        width: 2.75rem;
        height: 2.75rem;
        background: var(--s2);
        border: 1px solid var(--b1);
        border-radius: var(--radius-md);
        color: var(--t1);
        cursor: pointer;
        transition: background var(--t-fast), border-color var(--t-fast), transform var(--t-fast);
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }
      .t-btn ha-icon {
        --mdc-icon-size: 1.25rem;
      }
      .t-btn:hover {
        background: var(--s3);
        border-color: var(--b2);
      }
      .t-btn:active {
        transform: scale(0.95);
      }
      .t-btn[aria-disabled='true'] {
        opacity: 0.4;
        cursor: not-allowed;
        pointer-events: none;
      }
      .t-btn.t-primary {
        background: rgba(var(--rgb-info), 0.18);
        border-color: rgba(var(--rgb-info), 0.4);
      }
      .t-btn.t-primary ha-icon {
        color: var(--c-info);
      }
      .t-btn.confirming {
        background: rgba(var(--rgb-warning), 0.22);
        border-color: rgba(var(--rgb-warning), 0.5);
        flex: 1 1 auto;
        width: auto;
        gap: 0.5rem;
        padding: 0 0.75rem;
        color: var(--c-warning);
      }
      .t-btn.confirming .confirm-label {
        font-size: var(--fz-sm);
        font-weight: 600;
      }
      .t-btn.flashing ha-icon {
        animation: vac-locate-flash 1.5s ease-out;
        color: var(--c-info);
      }
      .t-btn.t-secondary {
        flex: 1 1 auto;
        width: auto;
        gap: 0.5rem;
        padding: 0 0.875rem;
        font-size: var(--fz-md);
        font-weight: 500;
      }
      .t-btn.t-secondary ha-icon {
        --mdc-icon-size: 1.125rem;
      }
      .transport-error .t-primary {
        flex: 1 1 auto;
        width: auto;
        padding: 0 0.875rem;
        gap: 0.5rem;
        font-size: var(--fz-md);
        font-weight: 500;
      }
      @keyframes vac-locate-flash {
        0% { color: var(--c-info); transform: scale(1); }
        30% { color: var(--c-info); transform: scale(1.2); }
        60% { color: var(--c-info); transform: scale(1); }
        100% { color: var(--t1); transform: scale(1); }
      }
      @media (prefers-reduced-motion: reduce) {
        .t-btn.flashing ha-icon {
          animation: none;
        }
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

  private async _callService(domain: string, service: string, data: Record<string, unknown>): Promise<void> {
    if (!this.hass) return;
    await this.hass.callService(domain, service, data);
  }

  private _pressButton(entityId: string): void {
    void this._callService('button', 'press', { entity_id: entityId });
  }

  private _isCurrentRoomButton(_entityId: string, slug: string): boolean {
    const companions = this._companions();
    if (!companions) return false;
    const currentRoom = entityState(this.hass!, companions.currentRoom, '');
    if (!currentRoom) return false;
    return normalize(slug) === normalize(currentRoom);
  }

  private _confirmAllHouse(allHouseId: string): void {
    if (this._pendingAction === 'all_house') {
      if (this._confirmTimerId) clearTimeout(this._confirmTimerId);
      this._confirmTimerId = null;
      this._pendingAction = null;
      this._pressButton(allHouseId);
      return;
    }
    this._pendingAction = 'all_house';
    this._confirmTimerId = setTimeout(() => {
      this._pendingAction = null;
      this._confirmTimerId = null;
      this.requestUpdate();
    }, 3000);
  }

  private _isCleaning(state: string): boolean {
    return state === 'cleaning';
  }

  private _isPlaying(state: string): boolean {
    return state === 'cleaning';
  }

  private _vacuumStart = (): void => {
    void this._callService('vacuum', 'start', { entity_id: this.config!.entity as string });
  };

  private _vacuumPause = (): void => {
    void this._callService('vacuum', 'pause', { entity_id: this.config!.entity as string });
  };

  private _vacuumStop = (): void => {
    const vacuum = this._vacuumEntity();
    if (!vacuum) return;
    if (this._isCleaning(vacuum.state)) {
      if (this._pendingAction === 'stop') {
        if (this._confirmTimerId) clearTimeout(this._confirmTimerId);
        this._confirmTimerId = null;
        this._pendingAction = null;
        void this._callService('vacuum', 'stop', { entity_id: this.config!.entity as string });
        return;
      }
      this._pendingAction = 'stop';
      this._confirmTimerId = setTimeout(() => {
        this._pendingAction = null;
        this._confirmTimerId = null;
        this.requestUpdate();
      }, 3000);
      return;
    }
    void this._callService('vacuum', 'stop', { entity_id: this.config!.entity as string });
  };

  private _vacuumLocate = (): void => {
    void this._callService('vacuum', 'locate', { entity_id: this.config!.entity as string });
    this._locateFlashing = true;
    if (this._locateTimer) clearTimeout(this._locateTimer);
    this._locateTimer = setTimeout(() => {
      this._locateFlashing = false;
      this._locateTimer = null;
    }, 1500);
  };

  private _vacuumReturn = (): void => {
    void this._callService('vacuum', 'return_to_base', { entity_id: this.config!.entity as string });
  };

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
          ${this._renderRoomChips(companions)}
          ${this._renderTransport(vacuum)}
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
  private _renderRoomChips(companions: VacuumCompanions | null): TemplateResult | typeof nothing {
    if (!companions || companions.roomButtons.length === 0) return nothing;
    const allHouseId = companions.allHouseButton;
    const showingConfirm = this._pendingAction === 'all_house';

    return html`
      <div class="rooms-row" role="group" aria-label="Pièces à nettoyer">
        ${companions.roomButtons.map(({ entityId, slug }) => {
          const label = humanizeRoomSlug(slug);
          const isCurrent = this._isCurrentRoomButton(entityId, slug);
          return html`
            <button
              type="button"
              class="room-chip ${isCurrent ? 'active' : ''}"
              aria-label=${t('vacuum.clean_room_aria', { room: label })}
              aria-pressed=${isCurrent}
              @click=${() => this._pressButton(entityId)}
            >
              ${isCurrent ? html`<span class="dot dot-pulse"></span>` : nothing}
              <span class="room-label">${label}</span>
            </button>
          `;
        })}
        ${allHouseId
          ? html`
              <span class="rooms-sep" aria-hidden="true"></span>
              <button
                type="button"
                class="room-chip all-house ${showingConfirm ? 'confirming' : ''}"
                aria-label=${t('vacuum.all_house')}
                @click=${() => this._confirmAllHouse(allHouseId)}
              >
                <ha-icon icon="mdi:home-outline"></ha-icon>
                <span class="room-label">
                  ${showingConfirm ? t('vacuum.confirm_short') : t('vacuum.all_house')}
                </span>
              </button>
            `
          : nothing}
      </div>
    `;
  }
  private _renderTransport(vacuum: HassEntity): TemplateResult {
    if (vacuum.state === 'error') {
      return html`
        <div class="transport transport-error">
          <button
            type="button"
            class="t-btn t-secondary"
            aria-label=${t('vacuum.transport_locate')}
            @click=${this._vacuumLocate}
          >
            <ha-icon icon="mdi:crosshairs"></ha-icon>
            <span>${t('vacuum.transport_locate')}</span>
          </button>
          <button
            type="button"
            class="t-btn t-primary"
            aria-label=${t('vacuum.transport_retry')}
            @click=${this._vacuumStart}
          >
            <ha-icon icon="mdi:refresh"></ha-icon>
            <span>${t('vacuum.transport_retry')}</span>
          </button>
        </div>
      `;
    }

    const features = (vacuum.attributes.supported_features as number) ?? 0;
    const canStop = (features & 8) !== 0;
    const canLocate = (features & 512) !== 0;
    const canReturn = (features & 16) !== 0;

    const showingStopConfirm = this._pendingAction === 'stop';
    const isPlaying = this._isPlaying(vacuum.state);

    return html`
      <div class="transport">
        <button
          type="button"
          class="t-btn t-primary"
          aria-label=${isPlaying ? t('vacuum.transport_pause') : t('vacuum.transport_start')}
          @click=${isPlaying ? this._vacuumPause : this._vacuumStart}
        >
          <ha-icon icon=${isPlaying ? 'mdi:pause' : 'mdi:play'}></ha-icon>
        </button>
        ${canStop
          ? html`
              <button
                type="button"
                class="t-btn ${showingStopConfirm ? 'confirming' : ''}"
                aria-label=${t('vacuum.transport_stop')}
                ?aria-disabled=${vacuum.state === 'docked'}
                @click=${this._vacuumStop}
              >
                <ha-icon icon="mdi:stop"></ha-icon>
                ${showingStopConfirm
                  ? html`<span class="confirm-label">${t('vacuum.confirm_short')}</span>`
                  : nothing}
              </button>
            `
          : nothing}
        ${canLocate
          ? html`
              <button
                type="button"
                class="t-btn ${this._locateFlashing ? 'flashing' : ''}"
                aria-label=${t('vacuum.transport_locate')}
                @click=${this._vacuumLocate}
              >
                <ha-icon icon="mdi:crosshairs"></ha-icon>
              </button>
            `
          : nothing}
        ${canReturn
          ? html`
              <button
                type="button"
                class="t-btn"
                aria-label=${t('vacuum.transport_return')}
                ?aria-disabled=${vacuum.state === 'docked'}
                @click=${this._vacuumReturn}
              >
                <ha-icon icon="mdi:home-import-outline"></ha-icon>
              </button>
            `
          : nothing}
      </div>
    `;
  }
}

customElements.define('glass-vacuum-card', GlassVacuumCard);
