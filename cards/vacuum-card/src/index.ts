import { html, css, nothing, type TemplateResult } from 'lit';
import { property, state } from 'lit/decorators.js';
import {
  BaseCard,
  BackendService,
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
import {
  applyVacuumOverrides,
  emptyVacuumOverrides,
  type VacuumOverrides,
} from './roles';

function relativeTime(isoString: string): string {
  if (!isoString) return '';
  const date = new Date(isoString);
  if (isNaN(date.getTime())) return '';
  const diff = Math.floor((Date.now() - date.getTime()) / 1000);
  if (diff < 60) return t('vacuum.time_just_now');
  if (diff < 3600) return t('vacuum.time_minutes_ago', { n: Math.floor(diff / 60) });
  if (diff < 86400) return t('vacuum.time_hours_ago', { n: Math.floor(diff / 3600) });
  if (diff < 172800) return t('vacuum.time_yesterday');
  return t('vacuum.time_days_ago', { n: Math.floor(diff / 86400) });
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
  @state() private _showHeader = true;
  @state() private _configEntity = '';
  private _overrides: VacuumOverrides = emptyVacuumOverrides();
  private _optimisticTimer: ReturnType<typeof setTimeout> | null = null;

  private _locateTimer: ReturnType<typeof setTimeout> | null = null;
  private _confirmTimerId: ReturnType<typeof setTimeout> | null = null;
  private _backend?: BackendService;
  private _vacuumConfigLoaded = false;

  connectedCallback(): void {
    super.connectedCallback();
    this._listen('vacuum-config-changed', () => {
      this._vacuumConfigLoaded = false;
      this._loadVacuumConfig();
    });
  }

  protected updated(changedProps: import('lit').PropertyValues): void {
    super.updated(changedProps);
    if (changedProps.has('hass') && this.hass && this._backend && this._backend.connection !== this.hass.connection) {
      this._backend = undefined;
      this._vacuumConfigLoaded = false;
    }
    if (this.hass && !this._vacuumConfigLoaded) this._loadVacuumConfig();
  }

  private async _loadVacuumConfig(): Promise<void> {
    if (!this.hass || this._vacuumConfigLoaded) return;
    this._vacuumConfigLoaded = true;
    try {
      if (!this._backend) this._backend = new BackendService(this.hass);
      const result = await this._backend.send<{
        vacuum_card?: {
          show_header?: boolean;
          entity?: string;
          entity_overrides?: Record<string, string>;
          room_buttons_hidden?: string[];
          room_buttons_order?: string[];
          room_buttons_extra?: string[];
        };
      }>('get_config');
      const vc = result?.vacuum_card;
      if (vc) {
        this._showHeader = vc.show_header ?? true;
        this._configEntity = vc.entity ?? '';
        this._overrides = {
          entityOverrides: vc.entity_overrides ?? {},
          roomButtonsHidden: vc.room_buttons_hidden ?? [],
          roomButtonsOrder: vc.room_buttons_order ?? [],
          roomButtonsExtra: vc.room_buttons_extra ?? [],
        };
        this._companionsCacheKey = null;
        this.requestUpdate();
      }
    } catch {
      // Retry on the next hass tick.
      this._vacuumConfigLoaded = false;
    }
  }

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
    this._backend = undefined;
    this._vacuumConfigLoaded = false;
    // _configEntity/_overrides are kept so a quick remount renders the last
    // known config instead of flashing the defaults while the reload runs.
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
        max-width: 31.25rem;
        margin: 0 auto;
        color: var(--t1);
      }
      .card-inner {
        display: flex;
        flex-direction: column;
        position: relative;
        z-index: 1;
      }
      .card-header {
        display: flex; align-items: center; justify-content: space-between;
        padding: 0 0.375rem; margin-bottom: 0.375rem; min-height: 1.375rem;
      }
      .card-title {
        font-size: var(--fz-xs); font-weight: 700; text-transform: uppercase;
        letter-spacing: 1.5px; color: var(--t4);
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
      @keyframes vac-pulse-alert {
        0%, 100% { border-color: rgba(var(--rgb-alert), 0.4); }
        50%      { border-color: rgba(var(--rgb-alert), 1); }
      }
      @keyframes vac-pulse-warning {
        0%, 100% { border-color: rgba(var(--rgb-warning), 0.4); }
        50%      { border-color: rgba(var(--rgb-warning), 1); }
      }
      .glass.alert-pulse   { animation: vac-pulse-alert 2s ease-in-out infinite; border-width: 1.5px; }
      .glass.warning-pulse { animation: vac-pulse-warning 2.4s ease-in-out infinite; border-width: 1.5px; }
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
      .rooms-sep-v {
        display: inline-block;
        width: 1px;
        height: 1.25rem;
        background: var(--b1);
        flex-shrink: 0;
        margin: 0 0.125rem;
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
      .transport-error glass-button {
        flex: 1 1 auto;
      }
      .stop-confirm {
        flex: 1 1 auto;
      }
      @keyframes vac-locate-flash {
        0% { transform: scale(1); }
        30% { transform: scale(1.2); }
        60% { transform: scale(1); }
        100% { transform: scale(1); }
      }
      .locate-flashing {
        animation: vac-locate-flash 1.5s ease-out;
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
        background: none;
        border: none;
        font-size: inherit;
        color: var(--t1);
        cursor: pointer;
        text-align: left;
        font-family: inherit;
        outline: none;
        -webkit-tap-highlight-color: transparent;
      }
      .compact:focus-visible {
        outline: 2px solid rgba(var(--rgb-white),0.25);
        outline-offset: 2px;
      }
      .compact .unavailable-badge {
        position: static;
        flex-shrink: 0;
        --mdc-icon-size: 1rem;
        color: var(--c-warning);
      }
      .ctrl-fold {
        display: grid;
        grid-template-rows: 0fr;
        transition: grid-template-rows var(--t-layout);
        pointer-events: none;
      }
      .ctrl-fold.open {
        grid-template-rows: 1fr;
        pointer-events: auto;
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
      .chips-row glass-chip {
        flex-shrink: 0;
      }
      .rooms-track glass-chip {
        flex-shrink: 0;
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
      @media (prefers-reduced-motion: reduce) {
        .battery.charging ha-icon {
          animation: none;
        }
        .dot.pulsing {
          animation: none;
        }
        .locate-flashing {
          animation: none;
        }
        .glass.alert-pulse,
        .glass.warning-pulse {
          animation: none;
        }
        .glass.alert-pulse   { border-color: var(--c-alert); }
        .glass.warning-pulse { border-color: var(--c-warning); }
        .ctrl-fold {
          transition: none;
        }
        .ctrl-fold-inner {
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
    // Primary robot chosen in the Config Panel (backend), if it still exists.
    if (this._configEntity && this.hass.states[this._configEntity]) return this._configEntity;
    // Auto-pick first vacuum.* entity.
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

  // Companion discovery scans all hass.states; memoize it per hass tick
  // (render calls it several times per pass).
  private _companionsCache: VacuumCompanions | null = null;
  private _companionsCacheKey: unknown = null;

  private _companions(): VacuumCompanions | null {
    if (!this.hass) return null;
    const entityId = this._resolveEntityId();
    if (!entityId) return null;
    const cacheKey = this.hass.states;
    if (this._companionsCacheKey === cacheKey && this._companionsCache?.vacuumEntityId === entityId) {
      return this._companionsCache;
    }
    const auto = discoverVacuumCompanions(this.hass, entityId);
    this._companionsCache = applyVacuumOverrides(auto, this._overrides);
    this._companionsCacheKey = cacheKey;
    return this._companionsCache;
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
    if (companions?.battery && this._isStateReady(companions.battery)) {
      return numericState(this.hass!, companions.battery, 0);
    }
    // No battery companion sensor: fall back to the native vacuum attribute.
    const vacuum = this._vacuumEntity();
    return (vacuum?.attributes.battery_level as number | undefined) ?? 0;
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

  private _isStateReady(entityId: string | undefined): boolean {
    if (!entityId || !this.hass) return false;
    const s = this.hass.states[entityId]?.state;
    return s !== undefined && s !== 'unavailable' && s !== 'unknown';
  }

  private _alertLevel(
    vacuum: HassEntity,
    companions: VacuumCompanions | null,
  ): 'alert' | 'warning' | null {
    if (vacuum.state === 'error') return 'alert';
    if (!companions) return null;

    let hasWarning = false;

    if (this._isStateReady(companions.dirtyWaterBox) && isBinaryOn(this.hass!, companions.dirtyWaterBox)) hasWarning = true;
    if (this._isStateReady(companions.cleanWaterBox) && !isBinaryOn(this.hass!, companions.cleanWaterBox)) hasWarning = true;

    const consoKeys = [
      companions.consoBrushMain,
      companions.consoBrushSide,
      companions.consoFilter,
      companions.consoSensors,
    ];
    for (const key of consoKeys) {
      if (!this._isStateReady(key)) continue;
      const hours = numericState(this.hass!, key, NaN);
      if (!Number.isFinite(hours)) continue;
      if (hours < 50) hasWarning = true;
    }

    return hasWarning ? 'warning' : null;
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
      <glass-chip
        size="sm"
        active
        active-color=${showingConfirm ? 'warning' : 'cool'}
        .icon=${'mdi:home-outline'}
        aria-label=${t('vacuum.all_house')}
        @pointerdown=${gesture.pointerdown}
        @pointerup=${gesture.pointerup}
        @pointermove=${gesture.pointermove}
        @pointercancel=${gesture.pointercancel}
        @contextmenu=${gesture.contextmenu}
      >${showingConfirm ? t('vacuum.confirm_short') : t('vacuum.all_house')}</glass-chip>
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
    const alertLevel = this._alertLevel(vacuum, companions);
    const pulseClass = alertLevel === 'alert' ? 'alert-pulse' : alertLevel === 'warning' ? 'warning-pulse' : '';

    const open = this._open;
    return html`
      ${this._showHeader ? this._renderHeader() : nothing}
      <div
        class="glass ${isUnavailable ? 'unavailable' : ''} ${pulseClass}"
        role=${alertLevel ? 'status' : nothing}
        aria-live=${alertLevel ? 'polite' : nothing}
      >
        <div class="card-inner">
          ${this._renderCompact(vacuum, companions, open, alertLevel)}
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

  private _renderHeader(): TemplateResult {
    return html`
      <div class="card-header">
        <span class="card-title">${t('vacuum.title')}</span>
      </div>
    `;
  }

  private _renderCompact(
    vacuum: HassEntity,
    companions: VacuumCompanions | null,
    open: boolean,
    alertLevel: 'alert' | 'warning' | null,
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
    const compactAria = alertLevel
      ? `${t('vacuum.title')} — ${alertLevel === 'alert' ? t('vacuum.alert_aria') : t('vacuum.warning_aria')}`
      : t('vacuum.title');
    const isUnavailable = isEntityUnavailable(vacuum.state);
    const gesture = this._bindGesture({
      onTap: this._toggleOpen,
    });
    return html`
      <button
        class="compact ${open ? 'open' : ''}"
        aria-expanded=${open ? 'true' : 'false'}
        aria-label=${compactAria}
        @pointerdown=${gesture.pointerdown}
        @pointerup=${gesture.pointerup}
        @pointermove=${gesture.pointermove}
        @pointercancel=${gesture.pointercancel}
        @contextmenu=${gesture.contextmenu}
        @click=${(e: MouseEvent) => {
          // detail === 0 → synthetic click from Enter/Space; pointer taps are
          // handled by the gesture binding above.
          if (e.detail === 0) this._toggleOpen();
        }}
      >
        <ha-icon class="vacuum-icon" .icon=${'mdi:robot-vacuum-variant'}></ha-icon>
        <div class="status-info" aria-live="polite">
          <span class="vacuum-name">${friendlyName}</span>
          <span class="status-text">${statusLabel}</span>
        </div>
        ${isUnavailable
          ? html`<span class="unavailable-badge"><ha-icon .icon=${'mdi:alert-circle-outline'}></ha-icon></span>`
          : html`<div class=${battClass} aria-label=${batteryAria} style=${battStyle}>
              <ha-icon .icon=${battIcon}></ha-icon>
              <span>${battery}%</span>
            </div>`}
      </button>
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
                <glass-chip
                  size="sm"
                  active-color="cool"
                  ?active=${isCurrent}
                  aria-label=${t('vacuum.clean_room_aria', { room: label })}
                  aria-pressed=${isCurrent ? 'true' : 'false'}
                  @click=${() => this._onRoomChipTap(entityId, slug)}
                >${label}</glass-chip>
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
          <glass-button
            size="sm"
            .icon=${'mdi:crosshairs'}
            aria-label=${t('vacuum.transport_locate')}
            @click=${this._vacuumLocate}
          >${t('vacuum.transport_locate')}</glass-button>
          <glass-button
            size="sm"
            variant="primary"
            .icon=${'mdi:refresh'}
            aria-label=${t('vacuum.transport_retry')}
            @click=${this._vacuumStart}
          >${t('vacuum.transport_retry')}</glass-button>
        </div>
      `;
    }

    const features = (vacuum.attributes.supported_features as number) ?? 0;
    const canStop = (features & 8) !== 0;
    const canLocate = (features & 512) !== 0;
    const canReturn = (features & 16) !== 0;
    // START (8192) or legacy TURN_ON (1); PAUSE (4)
    const canStart = (features & 8192) !== 0 || (features & 1) !== 0;
    const canPause = (features & 4) !== 0;

    const showingStopConfirm = this._pendingAction === 'stop';
    const isPlaying = this._isPlaying(vacuum.state);

    return html`
      <div class="transport">
        ${(isPlaying ? canPause : canStart) ? html`
          <glass-icon-button
            active
            active-color="cool"
            .icon=${isPlaying ? 'mdi:pause' : 'mdi:play'}
            aria-label=${isPlaying ? t('vacuum.transport_pause') : t('vacuum.transport_start')}
            @click=${isPlaying ? this._vacuumPause : this._vacuumStart}
          ></glass-icon-button>
        ` : nothing}
        ${canStop
          ? showingStopConfirm
            ? html`
                <glass-button
                  class="stop-confirm"
                  size="sm"
                  variant="danger"
                  .icon=${'mdi:stop'}
                  aria-label=${t('vacuum.transport_stop')}
                  @click=${this._vacuumStop}
                >${t('vacuum.confirm_short')}</glass-button>
              `
            : html`
                <glass-icon-button
                  .icon=${'mdi:stop'}
                  aria-label=${t('vacuum.transport_stop')}
                  ?disabled=${vacuum.state === 'docked'}
                  @click=${this._vacuumStop}
                ></glass-icon-button>
              `
          : nothing}
        ${canLocate
          ? html`
              <glass-icon-button
                class=${this._locateFlashing ? 'locate-flashing' : ''}
                ?active=${this._locateFlashing}
                active-color="info"
                .icon=${'mdi:crosshairs'}
                aria-label=${t('vacuum.transport_locate')}
                @click=${this._vacuumLocate}
              ></glass-icon-button>
            `
          : nothing}
        ${canReturn
          ? html`
              <glass-icon-button
                .icon=${'mdi:home-import-outline'}
                aria-label=${t('vacuum.transport_return')}
                ?disabled=${vacuum.state === 'docked'}
                @click=${this._vacuumReturn}
              ></glass-icon-button>
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
        <glass-section-title label=${t('vacuum.section_suction')}></glass-section-title>
        <div class="chips-row">
          ${list.map((opt) => html`
            <glass-chip
              size="sm"
              active-color="cool"
              ?active=${opt === current}
              @click=${() => this._setFanSpeed(opt)}
            >${labelOf(FAN_SPEED_LABELS, opt)}</glass-chip>
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
        <glass-section-title label=${t('vacuum.section_mopping')}></glass-section-title>
        ${companions.mopIntensity && intensityList.length > 0
          ? html`
              <div class="chips-row">
                ${intensityList.map((opt) => html`
                  <glass-chip
                    size="sm"
                    active-color="cool"
                    ?active=${opt === currentIntensity}
                    @click=${() => this._selectOption(companions.mopIntensity!, opt)}
                  >${labelOf(MOP_INTENSITY_LABELS, opt)}</glass-chip>
                `)}
              </div>
            `
          : nothing}
        ${companions.mopPattern && patternList.length > 0
          ? html`
              <div class="chips-row">
                ${patternList.map((opt) => html`
                  <glass-chip
                    size="sm"
                    active-color="cool"
                    ?active=${opt === currentPattern}
                    @click=${() => this._selectOption(companions.mopPattern!, opt)}
                  >${labelOf(MOP_PATTERN_LABELS, opt)}</glass-chip>
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
        <glass-section-title label=${t('vacuum.section_dock')}></glass-section-title>
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
        <glass-section-title label=${t('vacuum.section_consumables')}></glass-section-title>
        ${items.map((i) => {
          const hours = numericState(this.hass!, i.key, 0);
          let fillColor: 'success' | 'warning' | 'alert' = 'success';
          if (hours < 20) fillColor = 'alert';
          else if (hours < 50) fillColor = 'warning';
          const pct = Math.max(0, Math.min(100, (hours / i.max) * 100));
          const rightLabel = hours < 0 ? t('vacuum.conso_clean_now') : t('vacuum.conso_hours', { hours: Math.round(hours) });
          return html`
            <div class="conso-row">
              <div class="conso-header">
                <span class="conso-label">${i.label}</span>
                <span class="conso-value" style="color:var(--c-${fillColor})">${rightLabel}</span>
              </div>
              <glass-progress-bar
                size="lg"
                .value=${pct}
                .fillColor=${fillColor}
                aria-label="${i.label} : ${rightLabel}"
              ></glass-progress-bar>
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
        <glass-section-title label=${t('vacuum.section_stats')}></glass-section-title>
        <div class="stats-row">${t('vacuum.stats_last_session', { when, duration, area: areaLabel })}</div>
        <div class="stats-row stats-totals">
          ${t('vacuum.stats_totals', { count: totalCount, area: `${totalArea} m²` })}
        </div>
      </div>
    `;
  }

}

customElements.define('glass-vacuum-card', GlassVacuumCard);
