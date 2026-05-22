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
import { FAN_SPEED_LABELS, MOP_INTENSITY_LABELS, MOP_PATTERN_LABELS, labelOf, humanizeRoomSlug } from './labels';

function relativeTime(isoString: string): string {
  if (!isoString) return '';
  const date = new Date(isoString);
  if (isNaN(date.getTime())) return '';
  const diff = Math.floor((Date.now() - date.getTime()) / 1000);
  if (diff < 60) return 'à l\'instant';
  if (diff < 3600) return `il y a ${Math.floor(diff / 60)} min`;
  if (diff < 86400) return `il y a ${Math.floor(diff / 3600)} h`;
  if (diff < 172800) return 'hier';
  return `il y a ${Math.floor(diff / 86400)} jours`;
}

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

  @state() private _open = false;
  @state() private _pendingAction: string | null = null;
  @state() private _locateFlashing = false;
  @state() private _optimisticRoom: string | null = null;
  private _optimisticTimer: ReturnType<typeof setTimeout> | null = null;

  private _locateTimer: ReturnType<typeof setTimeout> | null = null;
  private _confirmTimerId: ReturnType<typeof setTimeout> | null = null;

  setConfig(config: LovelaceCardConfig): void {
    // config.entity is optional — when omitted (e.g., navbar-card auto-renders
    // the dashboard stack), the card auto-picks the first vacuum.* entity from
    // hass.states. If provided, it must point to a vacuum entity.
    if (config?.entity && !(config.entity as string).startsWith('vacuum.')) {
      throw new Error('vacuum-card: config.entity must be a vacuum.* entity_id');
    }
    this.config = config;
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this._locateTimer) clearTimeout(this._locateTimer);
    if (this._confirmTimerId) clearTimeout(this._confirmTimerId);
    if (this._optimisticTimer) clearTimeout(this._optimisticTimer);
    this._locateTimer = null;
    this._confirmTimerId = null;
    this._optimisticTimer = null;
    this._pendingAction = null;
    this._optimisticRoom = null;
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
      .vacuum-icon {
        --mdc-icon-size: 1.5rem;
        color: var(--t2);
        flex-shrink: 0;
      }
      .status-info {
        flex: 1 1 auto;
        display: flex;
        flex-direction: column;
        gap: 0.125rem;
        min-width: 0;
      }
      .vacuum-name {
        font-size: var(--fz-md);
        font-weight: 600;
        color: var(--t1);
        line-height: 1.2;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .status-text {
        font-size: var(--fz-sm);
        font-weight: 500;
        color: var(--t3);
        line-height: 1.2;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .dot {
        width: 0.5rem;
        height: 0.5rem;
        border-radius: 50%;
        flex-shrink: 0;
      }
      .dot-success { background: var(--c-success); box-shadow: 0 0 6px rgba(74,222,128,0.5); }
      .dot-alert   { background: var(--c-alert);   box-shadow: 0 0 6px rgba(248,113,113,0.5); }
      .dot-warning { background: var(--c-warning); box-shadow: 0 0 6px rgba(251,191,36,0.5); }
      .dot-info    { background: var(--c-info);    box-shadow: 0 0 6px rgba(96,165,250,0.5); }
      .dot-off     { background: var(--t4); }
      .battery {
        display: inline-flex;
        align-items: center;
        gap: 0.25rem;
        font-size: var(--fz-sm);
        font-weight: 600;
        flex-shrink: 0;
      }
      .battery ha-icon {
        --mdc-icon-size: 1.125rem;
      }
      .battery.charging ha-icon {
        animation: vac-pulse 2s ease-in-out infinite;
      }
      @keyframes vac-pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.55; }
      }
      .card-error {
        border-color: var(--c-alert) !important;
      }
      .rooms-section {
        padding: 0.5rem 0 0.75rem;
      }
      .rooms-scroller {
        overflow-x: auto;
        overflow-y: hidden;
        scrollbar-width: none;
        mask-image: linear-gradient(90deg, black 0, black calc(100% - 14px), transparent);
        -webkit-mask-image: linear-gradient(90deg, black 0, black calc(100% - 14px), transparent);
      }
      .rooms-scroller::-webkit-scrollbar {
        display: none;
      }
      .rooms-track {
        display: inline-flex;
        align-items: center;
        gap: 0.375rem;
        padding: 0 1.5rem 0 0.875rem;
      }
      .chip-accent {
        background: rgba(var(--rgb-accent), 0.12) !important;
        border-color: rgba(var(--rgb-accent), 0.3) !important;
        color: var(--t1) !important;
      }
      .chip ha-icon {
        --mdc-icon-size: 0.875rem;
      }
      .rooms-sep-v {
        display: inline-block;
        width: 1px;
        height: 1.25rem;
        background: var(--b1);
        flex-shrink: 0;
        margin: 0 0.125rem;
      }
      .rooms-sep {
        display: inline-block;
        width: 1px;
        height: 1.5rem;
        background: var(--b1);
        flex-shrink: 0;
      }
      .dot.pulsing {
        animation: vac-dot-pulse 1.5s ease-in-out infinite;
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
      .compact {
        box-sizing: border-box;
        display: flex;
        align-items: center;
        gap: 0.625rem;
        width: 100%;
        padding: 0.4375rem 0.875rem;
        border-radius: var(--radius-xl);
        min-height: 3.25rem;
        color: var(--t1);
        cursor: pointer;
        text-align: left;
        font-family: inherit;
        -webkit-tap-highlight-color: transparent;
      }
      .ctrl-fold {
        display: grid;
        grid-template-rows: 0fr;
        transition: grid-template-rows var(--t-layout);
      }
      .ctrl-fold.open {
        grid-template-rows: 1fr;
      }
      .ctrl-fold-inner {
        overflow: hidden;
        opacity: 0;
        transition: opacity var(--t-med) 0.1s;
      }
      .ctrl-fold.open .ctrl-fold-inner {
        opacity: 1;
      }
      .fold-content {
        display: flex;
        flex-direction: column;
      }
      .fold-sep {
        height: 1px;
        background: linear-gradient(90deg, transparent, rgba(var(--rgb-accent), 0.18), transparent);
        margin: 0 0.75rem;
      }
      .fold-sep.top {
        margin-bottom: 0.5rem;
      }
      .fold-sep.bottom {
        margin-top: 0.5rem;
      }
      .fold-section {
        padding: 0.5rem 0.875rem 0.75rem;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }
      .eyebrow {
        font-size: var(--fz-xs);
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 1.5px;
        color: var(--t4);
      }
      .chips-row {
        display: flex;
        flex-wrap: nowrap;
        gap: 0.375rem;
        overflow-x: auto;
        scrollbar-width: none;
        padding-bottom: 0.125rem;
      }
      .chips-row::-webkit-scrollbar {
        display: none;
      }
      .chip {
        flex-shrink: 0;
        display: inline-flex;
        align-items: center;
        gap: 0.3125rem;
        padding: 0.3125rem 0.75rem;
        background: var(--s1);
        border: 1px solid var(--b2);
        border-radius: var(--radius-md);
        color: var(--t2);
        font-size: var(--fz-sm);
        font-weight: 600;
        line-height: 1.4;
        cursor: pointer;
        white-space: nowrap;
        transition: background var(--t-fast), border-color var(--t-fast), color var(--t-fast);
        font-family: inherit;
      }
      .chip:hover {
        background: var(--s2);
      }
      .chip.active {
        background: rgba(var(--rgb-info), 0.18);
        border-color: rgba(var(--rgb-info), 0.4);
        color: var(--t1);
      }
      .status-row {
        display: flex;
        flex-wrap: wrap;
        gap: 0.375rem;
        margin-top: 0.25rem;
      }
      .badge {
        display: inline-flex;
        align-items: center;
        gap: 0.375rem;
        padding: 0.25rem 0.625rem;
        border-radius: 20px;
        font-size: var(--fz-sm);
        font-weight: 600;
      }
      .badge ha-icon {
        --mdc-icon-size: 0.9rem;
      }
      .badge-success { background: rgba(74,222,128,0.15);  color: var(--c-success); }
      .badge-alert   { background: rgba(248,113,113,0.15); color: var(--c-alert); }
      .badge-warning { background: rgba(251,191,36,0.15);  color: var(--c-warning); }
      .badge-info    { background: rgba(96,165,250,0.15);  color: var(--c-info); }
      .badge-off     { background: var(--s1); color: var(--t3); border: 1px solid var(--b1); }
      .dock-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(5.5rem, 1fr));
        gap: 0.375rem;
      }
      .dock-cell {
        display: flex;
        align-items: center;
        gap: 0.375rem;
        padding: 0.3125rem 0.5rem;
        background: var(--s1);
        border: 1px solid var(--b1);
        border-radius: var(--radius-md);
        min-height: 1.75rem;
        transition: background var(--t-fast), border-color var(--t-fast);
      }
      .dock-cell ha-icon {
        --mdc-icon-size: 0.9rem;
        flex-shrink: 0;
      }
      .dock-cell.success { background: rgba(74,222,128,0.08);  border-color: rgba(74,222,128,0.25); }
      .dock-cell.alert   { background: rgba(248,113,113,0.08); border-color: rgba(248,113,113,0.25); }
      .dock-cell.warning { background: rgba(251,191,36,0.08);  border-color: rgba(251,191,36,0.25); }
      .dock-cell.info    { background: rgba(96,165,250,0.08);  border-color: rgba(96,165,250,0.25); }
      .dock-label {
        font-size: var(--fz-xs);
        color: var(--t2);
        line-height: 1.2;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .conso-row {
        display: flex;
        flex-direction: column;
        gap: 0.3125rem;
      }
      .conso-header {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        font-size: var(--fz-sm);
      }
      .conso-label {
        color: var(--t2);
      }
      .conso-value {
        font-weight: 600;
      }
      .progress {
        position: relative;
        width: 100%;
        height: 0.375rem;
        background: var(--s2);
        border-radius: var(--radius-full);
        overflow: hidden;
      }
      .progress-fill {
        height: 100%;
        width: 100%;
        border-radius: inherit;
        transform-origin: left center;
        transition: transform var(--t-med), background var(--t-fast);
      }
      .stats-row {
        font-size: var(--fz-sm);
        color: var(--t2);
        line-height: 1.4;
      }
      .stats-totals {
        color: var(--t3);
      }
      button:focus-visible {
        outline: 2px solid rgba(255, 255, 255, 0.35);
        outline-offset: 2px;
      }
      .chip:focus-visible {
        outline-offset: -2px;
      }
      @media (prefers-reduced-motion: reduce) {
        .battery.charging ha-icon {
          animation: none;
        }
        .dot.pulsing {
          animation: none;
        }
        .t-btn.flashing ha-icon {
          animation: none;
        }
        .ctrl-fold {
          transition: none;
        }
        .ctrl-fold-inner {
          transition: none;
        }
        .t-btn,
        .chip {
          transition: none;
        }
      }
    `,
  ];

  /** Resolve the active vacuum entity_id. Use config.entity if set, otherwise
   *  fall back to the first vacuum.* entity found in hass.states. Returns null
   *  if hass is not ready or no vacuum entity exists at all. */
  private _resolveEntityId(): string | null {
    if (!this.hass) return null;
    const configEntity = this.config?.entity as string | undefined;
    if (configEntity && this.hass.states[configEntity]) return configEntity;
    // Auto-pick first vacuum.* entity (the Config Panel may override later).
    for (const id of Object.keys(this.hass.states)) {
      if (id.startsWith('vacuum.')) return id;
    }
    return null;
  }

  private _vacuumEntity(): HassEntity | null {
    const entityId = this._resolveEntityId();
    if (!entityId) return null;
    return this.hass!.states[entityId] ?? null;
  }

  private _companions(): VacuumCompanions | null {
    const entityId = this._resolveEntityId();
    if (!entityId) return null;
    return discoverVacuumCompanions(this.hass!, entityId);
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
    // Docked: surface "Mop drying" if dock is drying the mop right now
    if (vacuum.state === 'docked' && isBinaryOn(this.hass!, companions.dockDrying)) {
      const minutes = Math.round(numericState(this.hass!, companions.dockDryingTimeLeft, 0));
      if (minutes > 0) return t('vacuum.dock_drying_label', { minutes });
    }
    return t(`vacuum.status_${vacuum.state}` as Parameters<typeof t>[0]) ?? vacuum.state;
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

  private async _callService(domain: string, service: string, data: Record<string, unknown>): Promise<void> {
    if (!this.hass) return;
    await this.hass.callService(domain, service, data);
  }

  private _pressButton(entityId: string): void {
    void this._callService('button', 'press', { entity_id: entityId });
  }

  private _isCurrentRoomButton(_entityId: string, slug: string): boolean {
    // Optimistic state wins if set — user just tapped this room, we show it as
    // active even before HA reports back via `current_room`.
    if (this._optimisticRoom && normalize(this._optimisticRoom) === normalize(slug)) {
      return true;
    }
    const companions = this._companions();
    if (!companions) return false;
    const currentRoom = entityState(this.hass!, companions.currentRoom, '');
    if (!currentRoom) return false;
    return normalize(slug) === normalize(currentRoom);
  }

  private _onRoomChipTap(entityId: string, slug: string): void {
    // Optimistic mark + immediate service call. Clear the mark after 3s if HA
    // hasn't propagated the new current_room by then; if HA confirms earlier
    // (its current_room matches our optimistic slug), the chip stays active via
    // the real-state branch in _isCurrentRoomButton.
    this._optimisticRoom = slug;
    if (this._optimisticTimer) clearTimeout(this._optimisticTimer);
    this._optimisticTimer = setTimeout(() => {
      this._optimisticRoom = null;
      this._optimisticTimer = null;
    }, 3000);
    this._pressButton(entityId);
  }

  private _renderAllHouseChip(allHouseId: string, showingConfirm: boolean): TemplateResult {
    // Tap = 3s inline confirm (safety against accidental tap). Long-press = fire
    // immediately (power-user shortcut, matches the gesture convention in DESIGN.md).
    const gesture = this._bindGesture({
      onTap: () => this._confirmAllHouse(allHouseId),
      onLongPress: () => this._pressButton(allHouseId),
    });
    return html`
      <span class="rooms-sep-v" aria-hidden="true"></span>
      <button
        type="button"
        class="chip chip-accent ${showingConfirm ? 'confirming' : ''}"
        aria-label=${t('vacuum.all_house')}
        @pointerdown=${gesture.pointerdown}
        @pointerup=${gesture.pointerup}
        @pointermove=${gesture.pointermove}
        @pointercancel=${gesture.pointercancel}
        @contextmenu=${gesture.contextmenu}
      >
        <ha-icon .icon=${'mdi:home-outline'}></ha-icon>
        <span>${showingConfirm ? t('vacuum.confirm_short') : t('vacuum.all_house')}</span>
      </button>
    `;
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
    void this._callService('vacuum', 'start', { entity_id: this._resolveEntityId() ?? "" });
  };

  private _vacuumPause = (): void => {
    void this._callService('vacuum', 'pause', { entity_id: this._resolveEntityId() ?? "" });
  };

  private _vacuumStop = (): void => {
    const vacuum = this._vacuumEntity();
    if (!vacuum) return;
    if (this._isCleaning(vacuum.state)) {
      if (this._pendingAction === 'stop') {
        if (this._confirmTimerId) clearTimeout(this._confirmTimerId);
        this._confirmTimerId = null;
        this._pendingAction = null;
        void this._callService('vacuum', 'stop', { entity_id: this._resolveEntityId() ?? "" });
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
    void this._callService('vacuum', 'stop', { entity_id: this._resolveEntityId() ?? "" });
  };

  private _vacuumLocate = (): void => {
    void this._callService('vacuum', 'locate', { entity_id: this._resolveEntityId() ?? "" });
    this._locateFlashing = true;
    if (this._locateTimer) clearTimeout(this._locateTimer);
    this._locateTimer = setTimeout(() => {
      this._locateFlashing = false;
      this._locateTimer = null;
    }, 1500);
  };

  private _vacuumReturn = (): void => {
    void this._callService('vacuum', 'return_to_base', { entity_id: this._resolveEntityId() ?? "" });
  };

  private _selectOption = (entityId: string, option: string): void => {
    void this._callService('select', 'select_option', { entity_id: entityId, option });
  };

  private _setFanSpeed = (speed: string): void => {
    void this._callService('vacuum', 'set_fan_speed', { entity_id: this._resolveEntityId() ?? "", fan_speed: speed });
  };

  render(): TemplateResult | typeof nothing {
    if (!this.hass) return nothing;
    const vacuum = this._vacuumEntity();
    if (!vacuum) {
      // No vacuum.* entity in this HA — hide the card silently. (The user
      // toggled vacuum visible in the Dashboard tab but has no robot yet.)
      return nothing;
    }

    const companions = this._companions();
    const isUnavailable = isEntityUnavailable(vacuum.state);
    const isError = vacuum.state === 'error';

    const open = this._open;
    return html`
      <div class="glass ${isUnavailable ? 'unavailable' : ''} ${isError ? 'card-error' : ''}">
        <div class="card-inner">
          ${this._renderCompact(vacuum, companions, open)}
          <div class="ctrl-fold ${open ? 'open' : ''}">
            <div class="ctrl-fold-inner">
              <div class="fold-content">
                <div class="fold-sep top"></div>
                ${this._renderRoomChips(companions)}
                ${this._renderTransport(vacuum)}
                ${this._renderAspiration(vacuum)}
                ${this._renderLavage(companions)}
                ${this._renderDock(companions)}
                ${this._renderConso(companions)}
                ${this._renderStats(companions)}
                <div class="fold-sep bottom"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  private _toggleOpen = (): void => {
    this._open = !this._open;
  };

  private _renderCompact(
    vacuum: HassEntity,
    companions: VacuumCompanions | null,
    open: boolean,
  ): TemplateResult {
    const battery = this._batteryLevel();
    const charging = companions ? isBinaryOn(this.hass!, companions.charging) : false;
    const battIcon = this._batteryIcon(battery, charging);
    const battColor = this._batteryColor(battery);
    const statusLabel = this._statusLabel();
    const batteryAria = t('vacuum.battery_aria', {
      level: battery,
      charging: charging ? t('vacuum.charging') : t('vacuum.not_charging'),
    });

    const battStyle = `color:${battColor}`;
    const battClass = `battery ${charging ? 'charging' : ''}`;
    const friendlyName = (vacuum.attributes.friendly_name as string) ?? '';
    const gesture = this._bindGesture({
      onTap: this._toggleOpen,
      onLongPress: this._toggleOpen,
    });
    return html`
      <div
        class="compact ${open ? 'open' : ''}"
        role="button"
        tabindex="0"
        aria-expanded=${open ? 'true' : 'false'}
        aria-label=${t('vacuum.title')}
        @pointerdown=${gesture.pointerdown}
        @pointerup=${gesture.pointerup}
        @pointermove=${gesture.pointermove}
        @pointercancel=${gesture.pointercancel}
        @contextmenu=${gesture.contextmenu}
      >
        <ha-icon class="vacuum-icon" .icon=${'mdi:robot-vacuum'}></ha-icon>
        <div class="status-info" aria-live="polite">
          <span class="vacuum-name">${friendlyName}</span>
          <span class="status-text">${statusLabel}</span>
        </div>
        <div class=${battClass} aria-label=${batteryAria} style=${battStyle}>
          <ha-icon .icon=${battIcon}></ha-icon>
          <span>${battery}%</span>
        </div>
      </div>
    `;
  }
  private _renderRoomChips(companions: VacuumCompanions | null): TemplateResult | typeof nothing {
    if (!companions || companions.roomButtons.length === 0) return nothing;
    const allHouseId = companions.allHouseButton;
    const showingConfirm = this._pendingAction === 'all_house';

    return html`
      <div class="rooms-section">
        <div class="rooms-scroller">
          <div class="rooms-track" role="group" aria-label="Pièces à nettoyer">
            ${companions.roomButtons.map(({ entityId, slug }) => {
              const label = humanizeRoomSlug(slug);
              const isCurrent = this._isCurrentRoomButton(entityId, slug);
              return html`
                <button
                  type="button"
                  class="chip ${isCurrent ? 'active' : ''}"
                  aria-label=${t('vacuum.clean_room_aria', { room: label })}
                  aria-pressed=${isCurrent}
                  @click=${() => this._onRoomChipTap(entityId, slug)}
                >
                  ${isCurrent ? html`<span class="dot dot-info pulsing"></span>` : nothing}
                  <span>${label}</span>
                </button>
              `;
            })}
            ${allHouseId
              ? this._renderAllHouseChip(allHouseId, showingConfirm)
              : nothing}
          </div>
        </div>
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
            <ha-icon .icon=${'mdi:crosshairs'}></ha-icon>
            <span>${t('vacuum.transport_locate')}</span>
          </button>
          <button
            type="button"
            class="t-btn t-primary"
            aria-label=${t('vacuum.transport_retry')}
            @click=${this._vacuumStart}
          >
            <ha-icon .icon=${'mdi:refresh'}></ha-icon>
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
          <ha-icon .icon=${isPlaying ? 'mdi:pause' : 'mdi:play'}></ha-icon>
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
                <ha-icon .icon=${'mdi:stop'}></ha-icon>
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
                <ha-icon .icon=${'mdi:crosshairs'}></ha-icon>
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
                <ha-icon .icon=${'mdi:home-import-outline'}></ha-icon>
              </button>
            `
          : nothing}
      </div>
    `;
  }
  private _renderAspiration(vacuum: HassEntity): TemplateResult | typeof nothing {
    const features = (vacuum.attributes.supported_features as number) ?? 0;
    const hasFanSpeed = (features & 32) !== 0;
    if (!hasFanSpeed) return nothing;

    const list = (vacuum.attributes.fan_speed_list as string[] | undefined) ?? [];
    const current = vacuum.attributes.fan_speed as string | undefined;

    return html`
      <div class="fold-section">
        <div class="eyebrow">${t('vacuum.section_suction')}</div>
        <div class="chips-row">
          ${list.map((opt) => html`
            <button
              type="button"
              class="chip ${opt === current ? 'active' : ''}"
              @click=${() => this._setFanSpeed(opt)}
            >${labelOf(FAN_SPEED_LABELS, opt)}</button>
          `)}
        </div>
      </div>
    `;
  }

  private _renderLavage(companions: VacuumCompanions | null): TemplateResult | typeof nothing {
    if (!companions) return nothing;
    const hasMop = companions.mopIntensity || companions.mopPattern || companions.mopAttached;
    if (!hasMop) return nothing;

    const intensityState = this.hass!.states[companions.mopIntensity ?? ''];
    const patternState = this.hass!.states[companions.mopPattern ?? ''];
    const intensityList = (intensityState?.attributes.options as string[] | undefined) ?? [];
    const patternList = (patternState?.attributes.options as string[] | undefined) ?? [];
    const currentIntensity = intensityState?.state;
    const currentPattern = patternState?.state;

    return html`
      <div class="fold-section">
        <div class="eyebrow">${t('vacuum.section_mopping')}</div>
        ${companions.mopIntensity && intensityList.length > 0
          ? html`
              <div class="chips-row">
                ${intensityList.map((opt) => html`
                  <button
                    type="button"
                    class="chip ${opt === currentIntensity ? 'active' : ''}"
                    @click=${() => this._selectOption(companions.mopIntensity!, opt)}
                  >${labelOf(MOP_INTENSITY_LABELS, opt)}</button>
                `)}
              </div>
            `
          : nothing}
        ${companions.mopPattern && patternList.length > 0
          ? html`
              <div class="chips-row">
                ${patternList.map((opt) => html`
                  <button
                    type="button"
                    class="chip ${opt === currentPattern ? 'active' : ''}"
                    @click=${() => this._selectOption(companions.mopPattern!, opt)}
                  >${labelOf(MOP_PATTERN_LABELS, opt)}</button>
                `)}
              </div>
            `
          : nothing}
        <div class="status-row">
          ${this._renderBadge(
            isBinaryOn(this.hass!, companions.mopAttached)
              ? { label: t('vacuum.mop_attached'), variant: 'success', icon: 'mdi:check-circle' }
              : { label: t('vacuum.mop_missing'), variant: 'alert', icon: 'mdi:alert-circle-outline' },
          )}
          ${this._renderBadge(
            isBinaryOn(this.hass!, companions.tankAttached)
              ? { label: t('vacuum.tank_ok'), variant: 'success', icon: 'mdi:check-circle' }
              : { label: t('vacuum.tank_missing'), variant: 'alert', icon: 'mdi:alert-circle-outline' },
          )}
          ${this._renderBadge(
            isBinaryOn(this.hass!, companions.waterShortage)
              ? { label: t('vacuum.water_short'), variant: 'alert', icon: 'mdi:water-off' }
              : { label: t('vacuum.water_ok'), variant: 'success', icon: 'mdi:water' },
          )}
        </div>
      </div>
    `;
  }

  private _renderBadge({ label, variant, icon }: { label: string; variant: 'success' | 'alert' | 'warning' | 'info'; icon: string }): TemplateResult {
    return html`
      <div class="badge badge-${variant}">
        <ha-icon .icon=${icon}></ha-icon>
        <span>${label}</span>
      </div>
    `;
  }

  private _renderDock(companions: VacuumCompanions | null): TemplateResult | typeof nothing {
    if (!companions) return nothing;
    type DockVariant = 'success' | 'alert' | 'warning' | 'info' | 'idle';
    const cells: { icon: string; label: string; variant: DockVariant }[] = [
      {
        icon: 'mdi:battery-charging',
        label: isBinaryOn(this.hass!, companions.charging) ? t('vacuum.dock_charging') : t('vacuum.dock_idle'),
        variant: isBinaryOn(this.hass!, companions.charging) ? 'success' : 'idle',
      },
      {
        icon: 'mdi:hair-dryer-outline',
        label: isBinaryOn(this.hass!, companions.dockDrying)
          ? t('vacuum.dock_drying_label', {
              minutes: Math.round(numericState(this.hass!, companions.dockDryingTimeLeft, 0)),
            })
          : t('vacuum.dock_drying_idle'),
        variant: isBinaryOn(this.hass!, companions.dockDrying) ? 'info' : 'idle',
      },
      {
        icon: 'mdi:water-pump',
        label: isBinaryOn(this.hass!, companions.dirtyWaterBox) ? t('vacuum.dirty_full') : t('vacuum.dirty_ok'),
        variant: isBinaryOn(this.hass!, companions.dirtyWaterBox) ? 'alert' : 'success',
      },
      {
        icon: 'mdi:water',
        label: isBinaryOn(this.hass!, companions.cleanWaterBox) ? t('vacuum.clean_ok') : t('vacuum.clean_empty'),
        variant: isBinaryOn(this.hass!, companions.cleanWaterBox) ? 'success' : 'alert',
      },
      {
        icon: 'mdi:bottle-tonic-outline',
        label: isBinaryOn(this.hass!, companions.cleaningFluid) ? t('vacuum.fluid_ok') : t('vacuum.fluid_empty'),
        variant: isBinaryOn(this.hass!, companions.cleaningFluid) ? 'success' : 'warning',
      },
    ];
    const variantColor: Record<DockVariant, string> = {
      success: 'var(--c-success)',
      alert: 'var(--c-alert)',
      warning: 'var(--c-warning)',
      info: 'var(--c-info)',
      idle: 'var(--t3)',
    };

    return html`
      <div class="fold-section">
        <div class="eyebrow">${t('vacuum.section_dock')}</div>
        <div class="dock-grid">
          ${cells.map((c) => html`
            <div class="dock-cell ${c.variant === 'idle' ? '' : c.variant}" style="color:${variantColor[c.variant]}">
              <ha-icon .icon=${c.icon}></ha-icon>
              <span class="dock-label">${c.label}</span>
            </div>
          `)}
        </div>
      </div>
    `;
  }

  private _renderConso(companions: VacuumCompanions | null): TemplateResult | typeof nothing {
    if (!companions) return nothing;
    const items = [
      { key: companions.consoBrushMain, label: t('vacuum.conso_brush_main'), max: 300 },
      { key: companions.consoBrushSide, label: t('vacuum.conso_brush_side'), max: 200 },
      { key: companions.consoFilter, label: t('vacuum.conso_filter'), max: 150 },
      { key: companions.consoSensors, label: t('vacuum.conso_sensors'), max: 100 },
    ].filter((i) => i.key);

    if (items.length === 0) return nothing;

    return html`
      <div class="fold-section">
        <div class="eyebrow">${t('vacuum.section_consumables')}</div>
        ${items.map((i) => {
          const hours = numericState(this.hass!, i.key, 0);
          let color = 'var(--c-success)';
          if (hours < 0) color = 'var(--c-alert)';
          else if (hours < 20) color = 'var(--c-alert)';
          else if (hours < 50) color = 'var(--c-warning)';
          const pct = Math.max(0, Math.min(100, (hours / i.max) * 100));
          const rightLabel = hours < 0 ? t('vacuum.conso_clean_now') : t('vacuum.conso_hours', { hours: Math.round(hours) });
          return html`
            <div class="conso-row">
              <div class="conso-header">
                <span class="conso-label">${i.label}</span>
                <span class="conso-value" style="color:${color}">${rightLabel}</span>
              </div>
              <div
                class="progress"
                role="progressbar"
                aria-valuenow=${Math.max(0, Math.round(hours))}
                aria-valuemin="0"
                aria-valuemax=${i.max}
                aria-label="${i.label} : ${rightLabel}"
              >
                <div class="progress-fill" style="transform:scaleX(${pct / 100});background:${color}"></div>
              </div>
            </div>
          `;
        })}
      </div>
    `;
  }

  private _renderStats(companions: VacuumCompanions | null): TemplateResult | typeof nothing {
    if (!companions) return nothing;
    const lastEnd = entityState(this.hass!, companions.lastEnd, '');
    const dur = numericState(this.hass!, companions.durationCurrent, 0);
    const area = numericState(this.hass!, companions.areaCurrent, 0);
    const totalCount = Math.round(numericState(this.hass!, companions.totalCleanings, 0));
    const totalArea = Math.round(numericState(this.hass!, companions.areaTotal, 0));

    const when = lastEnd ? relativeTime(lastEnd) : '—';
    const duration = `${Math.round(dur)} min`;
    const areaLabel = `${area} m²`;

    return html`
      <div class="fold-section">
        <div class="eyebrow">${t('vacuum.section_stats')}</div>
        <div class="stats-row">${t('vacuum.stats_last_session', { when, duration, area: areaLabel })}</div>
        <div class="stats-row stats-totals">
          ${t('vacuum.stats_totals', { count: totalCount, area: `${totalArea} m²` })}
        </div>
      </div>
    `;
  }

}

customElements.define('glass-vacuum-card', GlassVacuumCard);
