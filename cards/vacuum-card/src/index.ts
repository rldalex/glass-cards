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
      .status-line {
        display: inline-flex;
        align-items: center;
        gap: 0.3125rem;
        min-width: 0;
      }
      .status-line .status-text {
        font-size: var(--fz-sm);
        font-weight: 500;
        color: var(--t3);
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
      .status-text {
        font-size: var(--fz-md);
        color: var(--t1);
        font-weight: 500;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
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
      .rooms-row {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 0.5rem;
        padding: 0.625rem 0.75rem;
        overflow-x: auto;
        scroll-snap-type: x mandatory;
        scrollbar-width: none;
        mask-image: linear-gradient(90deg, black 0, black calc(100% - 32px), transparent);
        -webkit-mask-image: linear-gradient(90deg, black 0, black calc(100% - 32px), transparent);
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
        padding: 0.4375rem 0.75rem;
        background: var(--s1);
        border: 1px solid var(--b2);
        border-radius: var(--radius-md);
        color: var(--t2);
        font-size: var(--fz-sm);
        font-weight: 500;
        cursor: pointer;
        white-space: nowrap;
        transition: background var(--t-fast), border-color var(--t-fast), color var(--t-fast);
        min-height: 2.5rem;
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
      .room-chip:focus-visible,
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
        .room-chip,
        .chip {
          transition: none;
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

  private _statusVariant(state: string): 'success' | 'warning' | 'info' | 'alert' | 'off' {
    switch (state) {
      case 'cleaning': return 'success';
      case 'paused': return 'warning';
      case 'returning': return 'info';
      case 'error': return 'alert';
      case 'docked':
      default: return 'off';
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

  private _selectOption = (entityId: string, option: string): void => {
    void this._callService('select', 'select_option', { entity_id: entityId, option });
  };

  private _setFanSpeed = (speed: string): void => {
    void this._callService('vacuum', 'set_fan_speed', { entity_id: this.config!.entity as string, fan_speed: speed });
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
    // Direct DOM toggle to avoid Lit re-render (works around a bug where
    // re-rendering this card crashes Lit with 'ChildPart has no parentNode').
    const root = this.shadowRoot;
    if (!root) return;
    const compact = root.querySelector('.compact');
    const fold = root.querySelector('.ctrl-fold');
    if (!compact || !fold) return;
    const isOpen = fold.classList.toggle('open');
    compact.classList.toggle('open', isOpen);
    compact.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    this._open = isOpen;
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
    const statusVariant = this._statusVariant(vacuum.state);
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
          <span class="status-line">
            <span class="dot dot-${statusVariant}"></span>
            <span class="status-text">${statusLabel}</span>
          </span>
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
              ${isCurrent ? html`<span class="dot dot-info pulsing"></span>` : nothing}
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
