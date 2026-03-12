import { html, css, nothing, type PropertyValues } from 'lit';
import { property, state } from 'lit/decorators.js';
import {
  BaseCard,
  BackendService,
  getAreaEntities,
  isEntityVisibleNow,
  type EntityScheduleMap,
  type HassEntity,
} from '@glass-cards/base-card';
import { glassTokens, glassMixin, foldMixin, marqueeMixin, marqueeText, MARQUEE_FULL, MARQUEE_COMPACT, bounceMixin } from '@glass-cards/ui-core';
import { t } from '@glass-cards/i18n';

// — Feature bitmask (HA FanEntityFeature) —

const FanFeature = {
  SET_SPEED: 1,
  OSCILLATE: 2,
  DIRECTION: 4,
  PRESET_MODE: 8,
  TURN_OFF: 16,
  TURN_ON: 32,
} as const;

// — Types —

interface FanInfo {
  entity: HassEntity;
  entityId: string;
  name: string;
  icon: string;
  isCeiling: boolean;
  isOn: boolean;
  percentage: number;
  speedCount: number;
  direction: string | null;
  oscillating: boolean;
  presetMode: string | null;
  presetModes: string[];
  supportedFeatures: number;
  lightEntityId: string | null;
  isSimple: boolean;
}

interface FanBackendConfig {
  show_header: boolean;
}

interface RoomFanConfig {
  hidden_entities: string[];
  entity_order: string[];
  entity_layouts: Record<string, string>;
}

// — Preset mode icons —

const PRESET_MODE_ICONS: Record<string, string> = {
  auto: 'mdi:autorenew',
  eco: 'mdi:leaf',
  night: 'mdi:weather-night',
  nuit: 'mdi:weather-night',
  comfort: 'mdi:sofa',
  confort: 'mdi:sofa',
  silent: 'mdi:volume-off',
  silence: 'mdi:volume-off',
  turbo: 'mdi:lightning-bolt',
};

// — Helpers —

function pctToStep(pct: number, speedCount: number): number {
  if (pct <= 0) return 0;
  return Math.max(1, Math.min(speedCount, Math.round(pct / (100 / speedCount))));
}

function stepToPct(step: number, speedCount: number): number {
  if (step <= 0) return 0;
  return (step / speedCount) * 100;
}

function stepToPctDisplay(step: number, speedCount: number): number {
  return Math.round(stepToPct(step, speedCount));
}

function snapPct(pct: number, speedCount: number): number {
  return stepToPct(pctToStep(pct, speedCount), speedCount);
}

function spinDuration(pct: number): string {
  if (pct <= 0) return '3s';
  if (pct <= 20) return '4s';
  if (pct <= 40) return '2.5s';
  if (pct <= 60) return '1.6s';
  if (pct <= 80) return '1.1s';
  return '0.7s';
}

function isCeilingFan(entityId: string, entity: HassEntity): boolean {
  const dc = entity.attributes.device_class as string | undefined;
  if (dc === 'ceiling') return true;
  const lower = entityId.toLowerCase();
  return lower.includes('ceiling') || lower.includes('plafond') || lower.includes('plafonnier');
}

function findCeilingLight(fanEntityId: string, hass: { states: Record<string, HassEntity>; devices?: Record<string, { id: string }>; entities?: Record<string, { entity_id: string; device_id?: string | null }> }): string | null {
  const suffix = fanEntityId.replace('fan.', '');
  // Naming convention: fan.X → light.X or light.X_light
  const candidates = [`light.${suffix}`, `light.${suffix}_light`];
  for (const c of candidates) {
    if (hass.states[c]) return c;
  }
  // Device match: find light entity on same device
  if (hass.entities) {
    const fanEntry = hass.entities[fanEntityId];
    if (fanEntry?.device_id) {
      for (const [eid, entry] of Object.entries(hass.entities)) {
        if (eid.startsWith('light.') && entry.device_id === fanEntry.device_id && hass.states[eid]) {
          return eid;
        }
      }
    }
  }
  return null;
}

// — Preset mode i18n key map —
const PRESET_I18N: Record<string, string> = {
  auto: 'fan.preset_auto',
  eco: 'fan.preset_eco',
  night: 'fan.preset_night',
  nuit: 'fan.preset_night',
  comfort: 'fan.preset_comfort',
  confort: 'fan.preset_comfort',
  silent: 'fan.preset_silent',
  silence: 'fan.preset_silent',
  turbo: 'fan.preset_turbo',
};

function presetLabel(mode: string): string {
  const key = PRESET_I18N[mode.toLowerCase()];
  if (key) return t(key as Parameters<typeof t>[0]);
  return mode.charAt(0).toUpperCase() + mode.slice(1);
}

// — Component —

class GlassFanCard extends BaseCard {
  @property({ attribute: false }) areaId?: string;
  @property({ attribute: false }) visibleAreaIds?: string[];

  @state() private _expandedEntity: string | null = null;
  @state() private _dragValues = new Map<string, number>();
  @state() private _showHeader = true;

  private _fanConfigLoaded = false;
  private _roomConfig: RoomFanConfig | null = null;
  private _roomConfigLoaded = false;
  private _roomConfigLoading = false;
  private _lastLoadedAreaId?: string;
  private _backend?: BackendService;
  private _cachedFanIds?: string[];
  private _cachedFansResult?: FanInfo[];
  private _fansFingerprint = '';
  private _dashboardHiddenEntities = new Set<string>();
  private _dashboardHiddenLoaded = false;
  private _throttleTimers = new Map<string, ReturnType<typeof setTimeout>>();
  private _sliderCleanups: (() => void)[] = [];
  private _schedules: EntityScheduleMap | null = null;
  private _schedulesLoaded = false;

  private get _isDashboardMode(): boolean {
    return !this.areaId;
  }

  static styles = [glassTokens, glassMixin, foldMixin, marqueeMixin, bounceMixin, css`
    :host {
      display: block;
      width: 100%;
      max-width: 500px;
      margin: 0 auto;
      font-family: 'Plus Jakarta Sans', sans-serif;
    }

    /* ── Card Header ── */
    .card-header {
      display: flex; align-items: center; justify-content: space-between;
      padding: 0 6px; margin-bottom: 6px; min-height: 22px;
    }
    .card-header-left { display: flex; align-items: center; gap: 8px; }
    .card-title {
      font-size: 9px; font-weight: 700; text-transform: uppercase;
      letter-spacing: 1.5px; color: var(--t4);
    }
    .card-count {
      display: inline-flex; align-items: center; justify-content: center;
      min-width: 14px; height: 14px; padding: 0 4px;
      border-radius: var(--radius-full); font-size: 9px; font-weight: 600;
      transition: all var(--t-med);
    }
    .card-count.some { background: rgba(129,140,248,0.15); color: var(--c-accent); }
    .card-count.none { background: var(--s2); color: var(--t3); }
    .card-count.all  { background: rgba(129,140,248,0.2); color: var(--c-accent); }

    /* ── Toggle All ── */
    .toggle-all {
      position: relative; width: 40px; height: 22px; border-radius: 11px;
      background: var(--s2); border: 1px solid var(--b2); cursor: pointer;
      transition: all var(--t-fast); padding: 0; outline: none;
      font-family: inherit; -webkit-tap-highlight-color: transparent;
    }
    .toggle-all::after {
      content: ''; position: absolute; top: 3px; left: 3px;
      width: 14px; height: 14px; border-radius: 50%;
      background: var(--t3);
      transition: transform var(--t-fast), background var(--t-fast), box-shadow var(--t-fast);
    }
    .toggle-all.on { background: rgba(129,140,248,0.2); border-color: rgba(129,140,248,0.3); }
    .toggle-all.on::after {
      transform: translateX(18px); background: var(--c-accent);
      box-shadow: 0 0 8px rgba(129,140,248,0.4);
    }
    .toggle-all:focus-visible { outline: 2px solid rgba(255,255,255,0.25); outline-offset: 2px; }

    /* ── Card Body ── */
    .fan-card { position: relative; padding: 2px 14px; }
    .card-inner {
      position: relative; z-index: 1;
      display: grid; grid-template-columns: 1fr 1fr; gap: 0;
    }

    .tint {
      transition: opacity var(--t-slow), background var(--t-slow);
    }

    /* ── Fan Row ── */
    .fan-row {
      display: flex; align-items: center; gap: 10px;
      grid-column: 1 / -1;
      padding: 8px 4px; position: relative;
      transition: background var(--t-fast); border-radius: var(--radius-md);
    }
    .fan-row.compact { grid-column: span 1; min-width: 0; overflow: hidden; }
    .fan-row.compact-right { padding-left: 10px; }
    .fan-row.compact-right::before {
      content: ''; position: absolute; left: 0; top: 20%; bottom: 20%; width: 1px;
      background: linear-gradient(to bottom, transparent, rgba(255,255,255,0.08) 30%, rgba(255,255,255,0.08) 70%, transparent);
    }
    @media (hover: hover) and (pointer: fine) {
      .fan-row:hover { background: var(--s1); }
    }
    @media (pointer: coarse) {
      .fan-row:active { animation: bounce 0.3s ease; }
    }

    /* ── Icon Button ── */
    .fan-icon-btn {
      width: 36px; height: 36px; border-radius: var(--radius-md);
      background: var(--s2); border: 1px solid var(--b1);
      display: flex; align-items: center; justify-content: center; flex-shrink: 0;
      transition: all var(--t-fast); cursor: pointer; padding: 0; outline: none;
      font-family: inherit; -webkit-tap-highlight-color: transparent;
    }
    .fan-icon-btn ha-icon {
      --mdc-icon-size: 18px;
      display: flex; align-items: center; justify-content: center;
      color: var(--t3); transition: color var(--t-fast), filter var(--t-fast);
    }
    .fan-icon-btn:focus-visible { outline: 2px solid rgba(255,255,255,0.25); outline-offset: -2px; }
    @media (hover: hover) and (pointer: fine) {
      .fan-icon-btn:hover { background: var(--s3); border-color: var(--b2); }
      .fan-icon-btn:hover ha-icon { color: var(--t2); }
    }
    @media (hover: hover) and (pointer: fine) {
      .fan-icon-btn:active { transform: scale(0.96); }
    }
    @media (pointer: coarse) {
      .fan-icon-btn:active { animation: bounce 0.3s ease; }
    }
    .fan-row.on .fan-icon-btn {
      background: rgba(129,140,248,0.1); border-color: rgba(129,140,248,0.15);
    }
    .fan-row.on .fan-icon-btn ha-icon {
      color: var(--c-accent); filter: drop-shadow(0 0 6px rgba(129,140,248,0.4));
    }

    /* ── Spinning animation ── */
    @keyframes spin-fan {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    @keyframes spin-fan-reverse {
      from { transform: rotate(360deg); }
      to { transform: rotate(0deg); }
    }
    .fan-row.on .fan-icon-btn ha-icon.spinning {
      animation: spin-fan var(--spin-duration, 2s) linear infinite;
    }
    .fan-row.on .fan-icon-btn ha-icon.spinning.reverse {
      animation: spin-fan-reverse var(--spin-duration, 2s) linear infinite;
    }

    /* ── Expand Button ── */
    .fan-expand-btn {
      flex: 1; min-width: 0;
      display: flex; align-items: center; gap: 10px;
      background: none; border: none; padding: 0;
      font-family: inherit; cursor: pointer; outline: none;
      text-align: left; color: inherit;
      -webkit-tap-highlight-color: transparent;
    }
    .fan-expand-btn:focus-visible {
      outline: 2px solid rgba(255,255,255,0.25); outline-offset: 2px;
      border-radius: var(--radius-sm);
    }

    /* ── Fan Info ── */
    .fan-info { flex: 1; min-width: 0; }
    .fan-name {
      font-size: 13px; font-weight: 600; color: var(--t1); line-height: 1.2;
      white-space: nowrap; overflow: hidden;
    }
    .fan-sub { display: flex; align-items: center; gap: 5px; margin-top: 2px; }
    .fan-speed-text {
      font-size: 10px; font-weight: 500; color: var(--t3);
      transition: color var(--t-med);
    }
    .fan-row.on .fan-speed-text { color: rgba(129,140,248,0.55); }

    .fan-direction {
      font-size: 10px; font-weight: 400; color: var(--t4);
      display: flex; align-items: center; gap: 3px;
    }
    .fan-direction ha-icon {
      --mdc-icon-size: 11px;
      display: flex; align-items: center; justify-content: center;
    }

    .fan-dot {
      width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0;
      background: var(--t4); transition: all var(--t-med);
    }
    .fan-row.on .fan-dot {
      background: var(--c-accent); box-shadow: 0 0 8px rgba(129,140,248,0.4);
    }

    /* ── Fold separator ── */
    .fold-sep {
      grid-column: 1 / -1;
      height: 1px; margin: 0 12px; overflow: hidden;
      background: linear-gradient(90deg, transparent, rgba(129,140,248,0.2), transparent);
      opacity: 0; transition: opacity var(--t-layout);
    }
    .fold-sep.visible { opacity: 1; }

    /* ── Controls fold ── */
    .ctrl-fold {
      grid-column: 1 / -1;
      display: grid; grid-template-rows: 0fr;
      transition: grid-template-rows var(--t-layout);
    }
    .ctrl-fold.open { grid-template-rows: 1fr; }
    .ctrl-fold-inner {
      overflow: hidden;
      opacity: 0; transition: opacity var(--t-fast);
    }
    .ctrl-fold.open .ctrl-fold-inner { opacity: 1; transition-delay: 0.1s; }

    .ctrl-panel {
      padding: 6px 0 4px;
      display: flex; flex-direction: column; gap: 10px;
    }
    .ctrl-label {
      font-size: 10px; font-weight: 600; letter-spacing: 0.5px;
      color: rgba(129,140,248,0.6); text-transform: uppercase;
    }

    /* ── Speed steps ── */
    .speed-steps { display: flex; gap: 4px; }
    .speed-step {
      flex: 1; height: 36px; border-radius: var(--radius-md);
      background: var(--s1); border: 1px solid var(--b1);
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      font-family: inherit; font-size: 11px; font-weight: 700; color: var(--t3);
      cursor: pointer; transition: all var(--t-fast); outline: none; padding: 2px 0;
      -webkit-tap-highlight-color: transparent;
    }
    @media (hover: hover) and (pointer: fine) {
      .speed-step:hover { background: var(--s3); border-color: var(--b2); color: var(--t2); }
    }
    .speed-step:focus-visible { outline: 2px solid rgba(255,255,255,0.25); outline-offset: -2px; }
    @media (hover: hover) and (pointer: fine) {
      .speed-step:active { transform: scale(0.96); }
    }
    @media (pointer: coarse) {
      .speed-step:active { animation: bounce 0.3s ease; }
    }
    .speed-step.active {
      background: rgba(129,140,248,0.1); border-color: rgba(129,140,248,0.15);
      color: var(--c-accent);
    }
    .speed-step-pct {
      font-size: 7px; font-weight: 600; color: var(--t4);
      letter-spacing: 0.3px; margin-top: 1px;
    }
    .speed-step.active .speed-step-pct { color: rgba(129,140,248,0.55); }

    /* ── Slider ── */
    .slider-wrap { display: flex; align-items: center; gap: 8px; }
    .slider-icon {
      display: flex; align-items: center; justify-content: center;
      width: 28px; height: 28px; flex-shrink: 0;
    }
    .slider-icon ha-icon {
      --mdc-icon-size: 18px;
      display: flex; align-items: center; justify-content: center;
      color: var(--t3);
    }
    .slider {
      position: relative; flex: 1; height: 36px;
      border-radius: var(--radius-lg); background: var(--s1);
      border: 1px solid var(--b1); overflow: hidden; cursor: pointer;
      touch-action: none; user-select: none; -webkit-user-select: none;
    }
    .slider-fill {
      position: absolute; top: 0; left: 0; height: 100%;
      border-radius: inherit; pointer-events: none;
      transition: width 0.05s linear;
    }
    .slider-fill.accent {
      background: linear-gradient(90deg, rgba(129,140,248,0.15), rgba(129,140,248,0.25));
    }
    .slider-fill.warm {
      background: linear-gradient(90deg, rgba(251,191,36,0.15), rgba(251,191,36,0.3));
    }
    .slider-thumb {
      position: absolute; top: 50%; transform: translate(-50%, -50%);
      width: 8px; height: 20px; border-radius: 4px;
      background: rgba(255,255,255,0.7); box-shadow: 0 0 8px rgba(255,255,255,0.2);
      pointer-events: none; transition: left 0.05s linear;
    }
    .slider-val {
      position: absolute; top: 50%; right: 12px; transform: translateY(-50%);
      font-size: 11px; font-weight: 600; color: var(--t3); pointer-events: none;
    }

    /* ── Mode chips ── */
    .mode-row { display: flex; gap: 6px; flex-wrap: wrap; }
    .chip {
      display: inline-flex; align-items: center; gap: 5px;
      padding: 5px 12px; border-radius: var(--radius-md);
      border: 1px solid var(--b2); background: var(--s1);
      font-family: inherit; font-size: 11px; font-weight: 600;
      color: var(--t3); cursor: pointer; transition: all var(--t-fast);
      outline: none; -webkit-tap-highlight-color: transparent;
    }
    .chip ha-icon {
      --mdc-icon-size: 14px;
      display: flex; align-items: center; justify-content: center;
    }
    @media (hover: hover) and (pointer: fine) {
      .chip:hover { background: var(--s3); color: var(--t2); border-color: var(--b3); }
    }
    .chip:focus-visible { outline: 2px solid rgba(255,255,255,0.25); outline-offset: -2px; }
    @media (hover: hover) and (pointer: fine) {
      .chip:active { transform: scale(0.96); }
    }
    @media (pointer: coarse) {
      .chip:active { animation: bounce 0.3s ease; }
    }
    .chip.active {
      border-color: rgba(129,140,248,0.15); background: rgba(129,140,248,0.1);
      color: rgba(129,140,248,0.8);
    }

    /* ── Direction toggle ── */
    .direction-row { display: flex; align-items: center; gap: 10px; }
    .direction-label {
      font-size: 11px; font-weight: 600; color: var(--t2); flex: 1;
      display: flex; align-items: center; gap: 6px;
    }
    .direction-label ha-icon {
      --mdc-icon-size: 16px;
      display: flex; align-items: center; justify-content: center;
      opacity: 0.6;
    }
    .direction-btns {
      display: flex; gap: 0; border-radius: 10px;
      border: 1px solid var(--b2); background: var(--s1); overflow: hidden;
    }
    .dir-btn {
      width: 36px; height: 28px; display: flex;
      align-items: center; justify-content: center;
      background: transparent; border: none; color: var(--t3);
      cursor: pointer; transition: all var(--t-fast); outline: none; padding: 0;
      font-family: inherit; -webkit-tap-highlight-color: transparent;
    }
    .dir-btn ha-icon {
      --mdc-icon-size: 16px;
      display: flex; align-items: center; justify-content: center;
    }
    @media (hover: hover) and (pointer: fine) {
      .dir-btn:hover { background: var(--s3); color: var(--t2); }
    }
    .dir-btn:focus-visible { outline: 2px solid rgba(255,255,255,0.25); outline-offset: -2px; }
    @media (hover: hover) and (pointer: fine) {
      .dir-btn:active { transform: scale(0.96); }
    }
    @media (pointer: coarse) {
      .dir-btn:active { animation: bounce 0.3s ease; }
    }
    .dir-btn.active { background: rgba(129,140,248,0.1); color: var(--c-accent); }
    .dir-btn + .dir-btn { border-left: 1px solid var(--b1); }

    /* ── Oscillation toggle ── */
    .osc-row { display: flex; align-items: center; gap: 10px; }
    .osc-label {
      font-size: 11px; font-weight: 600; color: var(--t2); flex: 1;
      display: flex; align-items: center; gap: 6px;
    }
    .osc-label ha-icon {
      --mdc-icon-size: 16px;
      display: flex; align-items: center; justify-content: center;
      opacity: 0.6;
    }
    .toggle-sm {
      position: relative; width: 38px; height: 20px; border-radius: 10px;
      background: var(--s2); border: 1px solid var(--b2);
      cursor: pointer; transition: all var(--t-fast);
      padding: 0; outline: none; font-family: inherit; flex-shrink: 0;
      -webkit-tap-highlight-color: transparent;
    }
    .toggle-sm::after {
      content: ''; position: absolute; top: 2px; left: 2px;
      width: 14px; height: 14px; border-radius: 50%;
      background: var(--t3); transition: all var(--t-fast);
    }
    .toggle-sm.on { background: rgba(129,140,248,0.2); border-color: rgba(129,140,248,0.3); }
    .toggle-sm.on::after {
      transform: translateX(18px); background: var(--c-accent);
      box-shadow: 0 0 8px rgba(129,140,248,0.4);
    }
    .toggle-sm:focus-visible { outline: 2px solid rgba(255,255,255,0.25); outline-offset: 2px; }

    /* ── Ceiling light row ── */
    .ceiling-light-row {
      display: flex; align-items: center; gap: 10px; padding: 6px 0;
    }
    .ceiling-light-label {
      font-size: 11px; font-weight: 600; color: var(--t2); flex: 1;
      display: flex; align-items: center; gap: 6px;
    }
    .ceiling-light-label ha-icon {
      --mdc-icon-size: 16px;
      display: flex; align-items: center; justify-content: center;
      opacity: 0.6;
    }

    /* ── Separator ── */
    .ctrl-sep { height: 1px; background: var(--b1); margin: 2px 0; }

    /* ── Empty state ── */
    .empty-state {
      grid-column: 1 / -1;
      padding: 16px; text-align: center; font-size: 12px; color: var(--t4);
    }
  `];

  // — Lifecycle —

  connectedCallback(): void {
    super.connectedCallback();
    this._listen('fan-config-changed', () => {
      this._fanConfigLoaded = false;
      this._cachedFanIds = undefined; this._fansFingerprint = '';
      this._loadFanConfig();
    });
    this._listen('room-config-changed', (payload) => {
      const area = this.areaId;
      if (area && payload.areaId === area) {
        this._roomConfigLoaded = false;
        this._roomConfig = null;
        this._cachedFanIds = undefined; this._fansFingerprint = '';
        this._loadRoomConfig();
      }
      // Dashboard mode: reload hidden entities
      if (this._isDashboardMode) {
        this._dashboardHiddenLoaded = false;
        this._loadDashboardHidden();
      }
    });
    this._listen('dashboard-config-changed', () => {
      this._cachedFanIds = undefined; this._fansFingerprint = '';
      this.requestUpdate();
    });
    this._listen('schedule-changed', () => {
      this._schedulesLoaded = false;
      this._loadSchedules();
    });
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._backend = undefined;
    this._fanConfigLoaded = false;
    this._schedulesLoaded = false;
    this._roomConfigLoaded = false;
    this._dashboardHiddenLoaded = false;
    for (const timer of this._throttleTimers.values()) clearTimeout(timer);
    this._throttleTimers.clear();
    for (const cleanup of this._sliderCleanups) cleanup();
    this._sliderCleanups = [];
  }

  protected _collapseExpanded(): void {
    if (this._expandedEntity !== null) this._expandedEntity = null;
  }

  protected updated(changedProps: PropertyValues): void {
    super.updated(changedProps);

    // Invalidate backend on WS reconnect
    if (changedProps.has('hass') && this.hass && this._backend && this._backend.connection !== this.hass.connection) {
      this._backend = undefined;
      this._fanConfigLoaded = false;
      this._roomConfigLoaded = false;
      this._schedulesLoaded = false;
      this._dashboardHiddenLoaded = false;
    }

    // Load schedules
    if (this.hass && !this._schedulesLoaded) {
      this._loadSchedules();
    }

    // Load fan config
    if (this.hass && !this._fanConfigLoaded) {
      this._loadFanConfig();
    }

    // Load room config when areaId available or changes
    if (this.areaId && this.hass) {
      if (this._lastLoadedAreaId !== this.areaId) {
        this._resetForNewArea();
      }
      if (!this._roomConfigLoaded) {
        this._loadRoomConfig();
      }
    }

    // Load dashboard hidden entities
    if (this.hass && this._isDashboardMode && !this._dashboardHiddenLoaded) {
      this._loadDashboardHidden();
    }

    // Invalidate structure cache when entities registry changes
    if (changedProps.has('hass') && this.hass) {
      const oldHass = changedProps.get('hass') as { entities?: unknown } | undefined;
      if (oldHass && oldHass.entities !== this.hass.entities) {
        this._cachedFanIds = undefined; this._fansFingerprint = '';
      }
    }
    // Invalidate when visible areas change (dashboard mode)
    if (changedProps.has('visibleAreaIds')) {
      this._cachedFanIds = undefined; this._fansFingerprint = '';
      this._dashboardHiddenLoaded = false;
    }

    // Clear stale drag values once HA state catches up
    if (changedProps.has('hass') && this._dragValues.size > 0) {
      const fans = this._getFanInfos();
      let changed = false;
      const next = new Map(this._dragValues);
      for (const fan of fans) {
        const key = `speed:${fan.entityId}`;
        const drag = next.get(key);
        if (drag !== undefined && Math.abs(fan.percentage - drag) <= 2) {
          next.delete(key);
          changed = true;
        }
        const lightKey = `light:${fan.entityId}`;
        const lightDrag = next.get(lightKey);
        if (lightDrag !== undefined && fan.lightEntityId) {
          const lightEntity = this.hass?.states[fan.lightEntityId];
          if (lightEntity) {
            const brightness = (lightEntity.attributes.brightness as number) ?? 0;
            const pct = Math.round((brightness / 255) * 100);
            if (Math.abs(pct - lightDrag) <= 2) {
              next.delete(lightKey);
              changed = true;
            }
          }
        }
      }
      if (changed) this._dragValues = next;
    }
  }

  protected getTrackedEntityIds(): string[] {
    if (this._isDashboardMode && this.hass && this.visibleAreaIds?.length && this.hass.entities && this.hass.devices) {
      const ids: string[] = [];
      for (const aId of this.visibleAreaIds) {
        for (const e of getAreaEntities(aId, this.hass.entities, this.hass.devices)) {
          if (e.entity_id.startsWith('fan.')) ids.push(e.entity_id);
        }
      }
      return ids;
    }
    return this._getFanInfos().map((f) => f.entityId);
  }

  // — Config loading —

  private async _loadFanConfig(): Promise<void> {
    if (!this.hass || this._fanConfigLoaded) return;
    this._fanConfigLoaded = true;
    try {
      if (!this._backend) this._backend = new BackendService(this.hass);
      const result = await this._backend.send<{
        fan_card?: FanBackendConfig;
      }>('get_config');
      if (result?.fan_card) {
        this._showHeader = result.fan_card.show_header ?? true;
      }
    } catch {
      // Backend not available
    }
  }

  private async _loadRoomConfig(): Promise<void> {
    if (!this.hass || !this.areaId || this._roomConfigLoaded || this._roomConfigLoading) return;
    this._roomConfigLoading = true;
    this._lastLoadedAreaId = this.areaId;
    try {
      if (!this._backend) this._backend = new BackendService(this.hass);
      const result = await this._backend.send<RoomFanConfig | null>('get_room', { area_id: this.areaId });
      if (this.areaId === this._lastLoadedAreaId) {
        this._roomConfig = result;
        this._roomConfigLoaded = true;
        this._cachedFanIds = undefined; this._fansFingerprint = '';
        this.requestUpdate();
      }
    } catch {
      // ignore
    } finally {
      this._roomConfigLoading = false;
    }
  }

  private async _loadSchedules(): Promise<void> {
    if (!this.hass || this._schedulesLoaded) return;
    this._schedulesLoaded = true;
    try {
      if (!this._backend) this._backend = new BackendService(this.hass);
      const result = await this._backend.send<EntityScheduleMap>('get_schedules');
      this._schedules = result;
      this._cachedFanIds = undefined; this._fansFingerprint = '';
      this.requestUpdate();
    } catch {
      this._schedulesLoaded = false;
    }
  }

  private async _loadDashboardHidden(): Promise<void> {
    if (!this.hass || this._dashboardHiddenLoaded || !this._isDashboardMode) return;
    this._dashboardHiddenLoaded = true;
    const areas = this.visibleAreaIds;
    if (!areas || areas.length === 0) return;
    try {
      if (!this._backend) this._backend = new BackendService(this.hass);
      const hidden = new Set<string>();
      for (const aId of areas) {
        const result = await this._backend.send<{
          hidden_entities: string[];
        } | null>('get_room', { area_id: aId });
        if (result?.hidden_entities) {
          for (const id of result.hidden_entities) hidden.add(id);
        }
      }
      this._dashboardHiddenEntities = hidden;
      this._cachedFanIds = undefined; this._fansFingerprint = '';
      this.requestUpdate();
    } catch {
      // Backend not available
    }
  }

  private _resetForNewArea(): void {
    this._roomConfig = null;
    this._roomConfigLoaded = false;
    this._roomConfigLoading = false;
    this._expandedEntity = null;
    this._dragValues = new Map();
    this._cachedFanIds = undefined; this._fansFingerprint = '';
    for (const timer of this._throttleTimers.values()) clearTimeout(timer);
    this._throttleTimers.clear();
  }

  // — Entity discovery —

  private _getFanIds(): string[] {
    if (this._cachedFanIds) return this._cachedFanIds;
    this._cachedFanIds = this._computeFanIds();
    return this._cachedFanIds;
  }

  private _computeFanIds(): string[] {
    if (!this.hass) return [];
    if (this.areaId) {
      const hiddenSet = new Set<string>(this._roomConfig?.hidden_entities ?? []);
      const ids = getAreaEntities(this.areaId, this.hass.entities, this.hass.devices)
        .filter((e) => e.entity_id.startsWith('fan.') && !hiddenSet.has(e.entity_id) && isEntityVisibleNow(e.entity_id, this._schedules))
        .map((e) => e.entity_id);

      const order = this._roomConfig?.entity_order ?? [];
      if (order.length > 0) {
        const orderMap = new Map<string, number>();
        order.forEach((id, i) => orderMap.set(id, i));
        ids.sort((a, b) => {
          const aIdx = orderMap.get(a);
          const bIdx = orderMap.get(b);
          if (aIdx !== undefined && bIdx !== undefined) return aIdx - bIdx;
          if (aIdx !== undefined) return -1;
          if (bIdx !== undefined) return 1;
          return 0;
        });
      }
      return ids;
    }
    // Dashboard mode: all fan IDs from visible areas
    if (this._isDashboardMode) {
      const areas = this.visibleAreaIds;
      if (!areas || areas.length === 0 || !this.hass.entities || !this.hass.devices) return [];
      const ids: string[] = [];
      for (const aId of areas) {
        for (const e of getAreaEntities(aId, this.hass.entities, this.hass.devices)) {
          if (e.entity_id.startsWith('fan.') && !this._dashboardHiddenEntities.has(e.entity_id)) ids.push(e.entity_id);
        }
      }
      return ids;
    }
    return [];
  }

  private _getFanInfos(): FanInfo[] {
    if (!this.hass) return [];
    const ids = this._getFanIds();

    // Build fingerprint
    const fp = ids.map((id) => {
      const e = this.hass?.states[id];
      return e ? `${id}:${e.state}:${e.last_updated}` : `${id}:-`;
    }).join('|');

    if (fp === this._fansFingerprint && this._cachedFansResult) {
      return this._cachedFansResult;
    }
    this._fansFingerprint = fp;

    const result = ids
      .map((id) => {
        const entity = this.hass?.states[id];
        if (!entity) return null;
        return this._buildFanInfo(id, entity);
      })
      .filter((f): f is FanInfo => f !== null);

    // Dashboard mode: filter to ON fans only
    if (this._isDashboardMode) {
      this._cachedFansResult = result.filter((f) => f.isOn);
    } else {
      this._cachedFansResult = result;
    }
    return this._cachedFansResult;
  }

  private _buildFanInfo(entityId: string, entity: HassEntity): FanInfo {
    const attrs = entity.attributes;
    const isOn = entity.state === 'on';
    const percentage = (attrs.percentage as number) ?? 0;
    const pctStep = attrs.percentage_step as number | undefined;
    const rawCount = attrs.speed_count as number | undefined;
    const speedCount = rawCount ?? (pctStep && pctStep > 0 ? Math.round(100 / pctStep) : 3);
    const direction = (attrs.direction as string) || null;
    const oscillating = (attrs.oscillating as boolean) || false;
    const presetMode = (attrs.preset_mode as string) || null;
    const presetModes = (attrs.preset_modes as string[]) || [];
    const supportedFeatures = (attrs.supported_features as number) || 0;
    const ceiling = isCeilingFan(entityId, entity);

    const registryIcon = this.hass?.entities[entityId]?.icon;
    const attrIcon = attrs.icon as string | undefined;
    const icon = registryIcon || attrIcon || (ceiling ? 'mdi:ceiling-fan' : 'mdi:fan');

    const lightEntityId = ceiling && this.hass ? findCeilingLight(entityId, this.hass) : null;

    // Simple fan = speed only, no preset/direction/oscillation/ceiling light
    const hasPreset = !!(supportedFeatures & FanFeature.PRESET_MODE) && presetModes.length > 0;
    const hasDirection = !!(supportedFeatures & FanFeature.DIRECTION);
    const hasOscillate = !!(supportedFeatures & FanFeature.OSCILLATE);
    const isSimple = !hasPreset && !hasDirection && !hasOscillate && !lightEntityId;

    return {
      entity,
      entityId,
      name: (attrs.friendly_name as string) || entityId.split('.')[1] || entityId,
      icon,
      isCeiling: ceiling,
      isOn,
      percentage: isOn ? percentage : 0,
      speedCount,
      direction,
      oscillating,
      presetMode: isOn ? presetMode : null,
      presetModes,
      supportedFeatures,
      lightEntityId,
      isSimple,
    };
  }

  // — Actions —

  private _toggleFan(fan: FanInfo, e: Event): void {
    e.stopPropagation();
    if (!this.hass) return;
    if (fan.isOn) {
      this.hass.callService('fan', 'turn_off', {}, { entity_id: fan.entityId });
    } else {
      // Turn on at speed step 1 if fan supports speed
      const sf = fan.supportedFeatures;
      if (sf & FanFeature.SET_SPEED) {
        const pct = stepToPct(1, fan.speedCount);
        this.hass.callService('fan', 'turn_on', { percentage: pct }, { entity_id: fan.entityId });
      } else {
        this.hass.callService('fan', 'turn_on', {}, { entity_id: fan.entityId });
      }
    }
  }

  private _toggleAll(): void {
    if (!this.hass) return;
    const fans = this._getFanInfos();
    const anyOn = fans.some((f) => f.isOn);
    if (anyOn) {
      const ids = fans.map((f) => f.entityId);
      this.hass.callService('fan', 'turn_off', {}, { entity_id: ids });
    } else {
      // Turn on each fan at speed step 1
      for (const fan of fans) {
        const sf = fan.supportedFeatures;
        if (sf & FanFeature.SET_SPEED) {
          const pct = stepToPct(1, fan.speedCount);
          this.hass.callService('fan', 'turn_on', { percentage: pct }, { entity_id: fan.entityId });
        } else {
          this.hass.callService('fan', 'turn_on', {}, { entity_id: fan.entityId });
        }
      }
    }
    if (anyOn) {
      this._expandedEntity = null;
    }
  }

  private _setSpeed(fan: FanInfo, pct: number): void {
    if (!this.hass) return;
    if (pct === 0) {
      this.hass.callService('fan', 'turn_off', {}, { entity_id: fan.entityId });
      return;
    }
    if (!fan.isOn) {
      this.hass.callService('fan', 'turn_on', {}, { entity_id: fan.entityId });
    }
    this.hass.callService('fan', 'set_percentage', { percentage: pct }, { entity_id: fan.entityId });
  }

  private _setPresetMode(fan: FanInfo, mode: string, e: Event): void {
    e.stopPropagation();
    if (!this.hass) return;
    // Toggle off if already active
    if (fan.presetMode === mode) {
      // Set back to percentage mode
      if (fan.percentage > 0) {
        this.hass.callService('fan', 'set_percentage', { percentage: fan.percentage }, { entity_id: fan.entityId });
      }
      return;
    }
    if (!fan.isOn) {
      this.hass.callService('fan', 'turn_on', {}, { entity_id: fan.entityId });
    }
    this.hass.callService('fan', 'set_preset_mode', { preset_mode: mode }, { entity_id: fan.entityId });
  }

  private _setDirection(fan: FanInfo, dir: string, e: Event): void {
    e.stopPropagation();
    if (!this.hass) return;
    this.hass.callService('fan', 'set_direction', { direction: dir }, { entity_id: fan.entityId });
  }

  private _toggleOscillation(fan: FanInfo, e: Event): void {
    e.stopPropagation();
    if (!this.hass) return;
    this.hass.callService('fan', 'oscillate', { oscillating: !fan.oscillating }, { entity_id: fan.entityId });
  }

  private _toggleCeilingLight(fan: FanInfo, e: Event): void {
    e.stopPropagation();
    if (!this.hass || !fan.lightEntityId) return;
    const lightEntity = this.hass.states[fan.lightEntityId];
    const service = lightEntity?.state === 'on' ? 'turn_off' : 'turn_on';
    this.hass.callService('light', service, {}, { entity_id: fan.lightEntityId });
  }

  private _hasControls(fan: FanInfo): boolean {
    const sf = fan.supportedFeatures;
    return !!(sf & FanFeature.SET_SPEED) || !!(sf & FanFeature.PRESET_MODE) || !!(sf & FanFeature.DIRECTION) || !!(sf & FanFeature.OSCILLATE) || !!fan.lightEntityId;
  }

  private _toggleExpand(fan: FanInfo): void {
    // Simple fans with no controls: toggle on/off instead of expanding
    if (!this._hasControls(fan)) {
      this._toggleFan(fan, new Event('click'));
      return;
    }
    this._expandedEntity = this._expandedEntity === fan.entityId ? null : fan.entityId;
  }

  // — Slider interaction —

  private _onSpeedSliderDown(fan: FanInfo, e: PointerEvent): void {
    e.stopPropagation();
    const slider = e.currentTarget as HTMLElement;
    slider.setPointerCapture(e.pointerId);
    const ac = new AbortController();
    const { signal } = ac;

    const update = (evt: PointerEvent) => {
      const rect = slider.getBoundingClientRect();
      const rawPct = Math.max(0, Math.min(100, Math.round(((evt.clientX - rect.left) / rect.width) * 100)));
      const snapped = snapPct(rawPct, fan.speedCount);
      const next = new Map(this._dragValues);
      next.set(`speed:${fan.entityId}`, snapped);
      this._dragValues = next;
    };

    update(e);

    const done = () => {
      ac.abort();
      try { slider.releasePointerCapture(e.pointerId); } catch { /* already released */ }
      this._sliderCleanups = this._sliderCleanups.filter((c) => c !== done);
      // Send final value to HA
      const finalPct = this._dragValues.get(`speed:${fan.entityId}`) ?? 0;
      this._setSpeed(fan, finalPct);
    };
    this._sliderCleanups.push(done);
    slider.addEventListener('pointermove', (evt) => update(evt as PointerEvent), { signal });
    slider.addEventListener('pointerup', done, { signal });
    slider.addEventListener('pointercancel', done, { signal });
    slider.addEventListener('lostpointercapture', done, { signal });
  }

  private _onLightSliderDown(fan: FanInfo, e: PointerEvent): void {
    e.stopPropagation();
    if (!fan.lightEntityId || !this.hass) return;
    const slider = e.currentTarget as HTMLElement;
    slider.setPointerCapture(e.pointerId);
    const ac = new AbortController();
    const { signal } = ac;
    const lightEntityId = fan.lightEntityId;

    const update = (evt: PointerEvent) => {
      const rect = slider.getBoundingClientRect();
      const pct = Math.max(0, Math.min(100, Math.round(((evt.clientX - rect.left) / rect.width) * 100)));
      const next = new Map(this._dragValues);
      next.set(`light:${fan.entityId}`, pct);
      this._dragValues = next;

      // Throttled HA call
      const key = `light:${fan.entityId}`;
      const existing = this._throttleTimers.get(key);
      if (existing) clearTimeout(existing);
      this._throttleTimers.set(key, setTimeout(() => {
        this._throttleTimers.delete(key);
        const val = this._dragValues.get(key) ?? pct;
        const brightness = Math.round((val / 100) * 255);
        this.hass?.callService('light', 'turn_on', { brightness }, { entity_id: lightEntityId });
      }, 100));
    };

    update(e);

    const done = () => {
      ac.abort();
      try { slider.releasePointerCapture(e.pointerId); } catch { /* already released */ }
      this._sliderCleanups = this._sliderCleanups.filter((c) => c !== done);
    };
    this._sliderCleanups.push(done);
    slider.addEventListener('pointermove', (evt) => update(evt as PointerEvent), { signal });
    slider.addEventListener('pointerup', done, { signal });
    slider.addEventListener('pointercancel', done, { signal });
    slider.addEventListener('lostpointercapture', done, { signal });
  }

  // — Render —

  protected render() {
    void this._lang;
    const fans = this._getFanInfos();

    // Dashboard mode: hide when no fans are on
    if (this._isDashboardMode) {
      if (fans.length === 0) {
        this.style.display = 'none';
        return nothing;
      }
      this.style.display = '';
    }

    // Room mode: show even if empty
    if (!this._isDashboardMode && fans.length === 0) {
      return html`
        ${this._showHeader ? this._renderHeader(0, 0) : nothing}
        <div class="glass fan-card">
          <div class="card-inner">
            <div class="empty-state">${t('fan.no_fans')}</div>
          </div>
        </div>
      `;
    }

    const onCount = fans.filter((f) => f.isOn).length;
    const total = fans.length;

    return html`
      ${this._showHeader ? this._renderHeader(onCount, total) : nothing}
      <div class="glass fan-card">
        <div class="tint" style="background:radial-gradient(ellipse at 30% 30%, var(--c-accent), transparent 70%);opacity:${total > 0 ? (onCount / total * 0.18).toFixed(3) : '0'};"></div>
        <div class="card-inner">
          ${this._isDashboardMode ? this._renderDashboardGrid(fans) : this._renderGrid(fans)}
        </div>
      </div>
    `;
  }

  private _renderHeader(onCount: number, total: number) {
    const anyOn = onCount > 0;
    const countClass = onCount === 0 ? 'none' : onCount === total ? 'all' : 'some';
    return html`
      <div class="card-header">
        <div class="card-header-left">
          <span class="card-title">${t('fan.title')}</span>
          <span class="card-count ${countClass}">${onCount}/${total}</span>
        </div>
        <button
          class="toggle-all ${anyOn ? 'on' : ''}"
          @click=${() => this._toggleAll()}
          aria-label=${anyOn ? t('fan.toggle_all_on_aria') : t('fan.toggle_all_off_aria')}
          role="switch"
          aria-checked=${anyOn ? 'true' : 'false'}
        ></button>
      </div>
    `;
  }

  private _getEntityLayout(entityId: string): 'full' | 'compact' {
    const layouts = this._roomConfig?.entity_layouts ?? {};
    const layout = layouts[entityId];
    return (layout as 'full' | 'compact') === 'full' ? 'full' : 'compact';
  }

  private _isCompact(fan: FanInfo): boolean {
    return this._getEntityLayout(fan.entityId) === 'compact';
  }

  private _renderGrid(fans: FanInfo[]) {
    const results: unknown[] = [];
    let i = 0;
    while (i < fans.length) {
      const fan = fans[i];
      if (this._isCompact(fan)) {
        const next = i + 1 < fans.length && this._isCompact(fans[i + 1]) ? fans[i + 1] : null;
        if (next) {
          const last = i + 2 >= fans.length;
          results.push(this._renderFanRow(fan, true, false));
          results.push(this._renderFanRow(next, true, true));
          results.push(this._renderControlFold(fan, last));
          results.push(this._renderControlFold(next, last));
          i += 2;
        } else {
          const last = i + 1 >= fans.length;
          results.push(this._renderFanRow(fan, false, false));
          results.push(this._renderControlFold(fan, last));
          i++;
        }
      } else {
        const last = i + 1 >= fans.length;
        results.push(this._renderFanRow(fan, false, false));
        results.push(this._renderControlFold(fan, last));
        i++;
      }
    }
    return results;
  }

  private _renderDashboardGrid(fans: FanInfo[]) {
    const results: unknown[] = [];
    let i = 0;
    while (i < fans.length) {
      const left = fans[i];
      const right = i + 1 < fans.length ? fans[i + 1] : null;
      if (right) {
        const last = i + 2 >= fans.length;
        results.push(this._renderFanRow(left, true, false));
        results.push(this._renderFanRow(right, true, true));
        results.push(this._renderControlFold(left, last));
        results.push(this._renderControlFold(right, last));
        i += 2;
      } else {
        results.push(this._renderFanRow(left, false, false));
        results.push(this._renderControlFold(left, true));
        i++;
      }
    }
    return results;
  }

  private _renderFanRow(fan: FanInfo, compact = false, isRight = false) {
    const speedDrag = this._dragValues.get(`speed:${fan.entityId}`);
    const displayPct = speedDrag ?? fan.percentage;
    const isExpanded = this._expandedEntity === fan.entityId;

    // Speed text — simple fans without controls show on/off, others show step info
    const hasControls = this._hasControls(fan);
    let speedText: string;
    if (!hasControls) {
      speedText = fan.isOn ? t('common.on') : t('fan.off');
    } else if (fan.isOn || speedDrag !== undefined) {
      const step = pctToStep(displayPct, fan.speedCount);
      speedText = fan.isSimple
        ? t('fan.speed_step_short', { step: String(step), total: String(fan.speedCount) })
        : `${displayPct}% · ${t('fan.speed_step', { step: String(step), total: String(fan.speedCount) })}`;
    } else {
      speedText = t('fan.off');
    }

    const rowClasses = ['fan-row', fan.isOn ? 'on' : '', compact ? 'compact' : '', isRight ? 'compact-right' : '']
      .filter(Boolean).join(' ');

    return html`
      <div class=${rowClasses}>
        <button
          class="fan-icon-btn"
          @click=${(e: Event) => this._toggleFan(fan, e)}
          aria-label=${t('fan.toggle_aria', { name: fan.name })}
        >
          <ha-icon
            .icon=${fan.icon}
            class="${fan.isOn ? 'spinning' : ''} ${fan.isOn && fan.direction === 'reverse' ? 'reverse' : ''}"
            style="${fan.isOn ? `--spin-duration:${spinDuration(fan.percentage)}` : ''}"
          ></ha-icon>
        </button>
        <button
          class="fan-expand-btn"
          @click=${() => this._toggleExpand(fan)}
          aria-expanded=${hasControls && isExpanded ? 'true' : 'false'}
          aria-label=${hasControls ? t('fan.expand_aria', { name: fan.name }) : t('fan.toggle_aria', { name: fan.name })}
        >
          <div class="fan-info">
            <div class="fan-name">${marqueeText(fan.name, compact ? MARQUEE_COMPACT : MARQUEE_FULL)}</div>
            <div class="fan-sub">
              <span class="fan-speed-text">${speedText}</span>
              ${fan.isOn && fan.direction !== null ? html`
                <span class="fan-direction">
                  <ha-icon .icon=${fan.direction === 'forward' ? 'mdi:rotate-right' : 'mdi:rotate-left'}></ha-icon>
                  ${fan.direction === 'forward' ? t('fan.direction_forward') : t('fan.direction_reverse')}
                </span>
              ` : nothing}
            </div>
          </div>
          <div class="fan-dot"></div>
        </button>
      </div>
    `;
  }

  private _renderControlFold(fan: FanInfo, isLast = false) {
    const isExpanded = this._expandedEntity === fan.entityId;
    return html`
      <div class="fold-sep ${isExpanded ? 'visible' : ''}"></div>
      <div class="ctrl-fold ${isExpanded ? 'open' : ''}">
        <div class="ctrl-fold-inner">
          ${isExpanded ? this._renderControls(fan) : nothing}
        </div>
      </div>
      ${!isLast ? html`<div class="fold-sep ${isExpanded ? 'visible' : ''}"></div>` : nothing}
    `;
  }

  private _renderControls(fan: FanInfo) {
    const sf = fan.supportedFeatures;
    const hasSpeed = !!(sf & FanFeature.SET_SPEED);
    const hasPreset = !!(sf & FanFeature.PRESET_MODE) && fan.presetModes.length > 0;
    const hasDirection = !!(sf & FanFeature.DIRECTION);
    const hasOscillate = !!(sf & FanFeature.OSCILLATE);

    const speedDrag = this._dragValues.get(`speed:${fan.entityId}`);
    const displayPct = speedDrag ?? fan.percentage;
    const currentStep = fan.isOn || speedDrag !== undefined ? pctToStep(displayPct, fan.speedCount) : 0;

    return html`
      <div class="ctrl-panel">
        ${!fan.isSimple ? html`<span class="ctrl-label">${fan.name}</span>` : nothing}

        ${hasSpeed ? html`
          <!-- Speed steps -->
          <div class="speed-steps">
            ${Array.from({ length: fan.speedCount }, (_, i) => {
              const step = i + 1;
              const pct = stepToPct(step, fan.speedCount);
              const pctDisplay = stepToPctDisplay(step, fan.speedCount);
              return html`
                <button
                  class="speed-step ${currentStep === step ? 'active' : ''}"
                  @click=${(e: Event) => { e.stopPropagation(); this._setSpeed(fan, pct); }}
                  aria-label=${t('fan.speed_step_aria', { step: String(step), pct: String(pctDisplay) })}
                >
                  <span>${step}</span>
                  <span class="speed-step-pct">${pctDisplay}%</span>
                </button>
              `;
            })}
          </div>

          ${!fan.isSimple ? html`
            <!-- Speed slider (complex fans only) -->
            <div class="slider-wrap">
              <div class="slider-icon"><ha-icon .icon=${'mdi:speedometer'}></ha-icon></div>
              <div class="slider" @pointerdown=${(e: PointerEvent) => this._onSpeedSliderDown(fan, e)}>
                <div class="slider-fill accent" style="width:${displayPct}%;"></div>
                <div class="slider-thumb" style="left:${displayPct}%;"></div>
                <div class="slider-val">${displayPct}%</div>
              </div>
            </div>
          ` : nothing}
        ` : nothing}

        ${hasPreset ? html`
          <!-- Preset modes -->
          <div class="mode-row">
            ${fan.presetModes.map((mode) => html`
              <button
                class="chip ${fan.presetMode === mode ? 'active' : ''}"
                @click=${(e: Event) => this._setPresetMode(fan, mode, e)}
                aria-label=${presetLabel(mode)}
              >
                <ha-icon .icon=${PRESET_MODE_ICONS[mode.toLowerCase()] || 'mdi:cog'}></ha-icon>
                <span>${presetLabel(mode)}</span>
              </button>
            `)}
          </div>
        ` : nothing}

        ${hasDirection ? html`
          <div class="ctrl-sep"></div>
          <!-- Direction -->
          <div class="direction-row">
            <div class="direction-label">
              <ha-icon .icon=${'mdi:rotate-3d-variant'}></ha-icon>
              ${t('fan.direction')}
            </div>
            <div class="direction-btns">
              <button
                class="dir-btn ${fan.direction === 'forward' ? 'active' : ''}"
                @click=${(e: Event) => this._setDirection(fan, 'forward', e)}
                aria-label=${t('fan.direction_forward_aria')}
              >
                <ha-icon .icon=${'mdi:rotate-right'}></ha-icon>
              </button>
              <button
                class="dir-btn ${fan.direction === 'reverse' ? 'active' : ''}"
                @click=${(e: Event) => this._setDirection(fan, 'reverse', e)}
                aria-label=${t('fan.direction_reverse_aria')}
              >
                <ha-icon .icon=${'mdi:rotate-left'}></ha-icon>
              </button>
            </div>
          </div>
        ` : nothing}

        ${hasOscillate ? html`
          <!-- Oscillation -->
          <div class="osc-row">
            <div class="osc-label">
              <ha-icon .icon=${'mdi:arrow-left-right'}></ha-icon>
              ${t('fan.oscillation')}
            </div>
            <button
              class="toggle-sm ${fan.oscillating ? 'on' : ''}"
              @click=${(e: Event) => this._toggleOscillation(fan, e)}
              role="switch"
              aria-checked=${fan.oscillating ? 'true' : 'false'}
              aria-label=${t('fan.oscillation_aria')}
            ></button>
          </div>
        ` : nothing}

        ${fan.lightEntityId ? this._renderCeilingLight(fan) : nothing}
      </div>
    `;
  }

  private _renderCeilingLight(fan: FanInfo) {
    if (!fan.lightEntityId || !this.hass) return nothing;
    const lightEntity = this.hass.states[fan.lightEntityId];
    if (!lightEntity) return nothing;

    const lightIsOn = lightEntity.state === 'on';
    const brightness = (lightEntity.attributes.brightness as number) ?? 0;
    const lightDrag = this._dragValues.get(`light:${fan.entityId}`);
    const displayPct = lightDrag ?? (lightIsOn ? Math.round((brightness / 255) * 100) : 0);

    return html`
      <div class="ctrl-sep"></div>
      <!-- Ceiling light -->
      <div class="ceiling-light-row">
        <div class="ceiling-light-label">
          <ha-icon .icon=${'mdi:lightbulb-outline'}></ha-icon>
          ${t('fan.ceiling_light')}
        </div>
        <button
          class="toggle-sm ${lightIsOn ? 'on' : ''}"
          @click=${(e: Event) => this._toggleCeilingLight(fan, e)}
          role="switch"
          aria-checked=${lightIsOn ? 'true' : 'false'}
          aria-label=${t('fan.ceiling_light_aria')}
        ></button>
      </div>
      ${lightIsOn ? html`
        <div class="slider-wrap">
          <div class="slider-icon"><ha-icon .icon=${'mdi:brightness-6'}></ha-icon></div>
          <div class="slider" @pointerdown=${(e: PointerEvent) => this._onLightSliderDown(fan, e)}>
            <div class="slider-fill warm" style="width:${displayPct}%;"></div>
            <div class="slider-thumb" style="left:${displayPct}%;"></div>
            <div class="slider-val">${displayPct}%</div>
          </div>
        </div>
      ` : nothing}
    `;
  }
}

try { customElements.define('glass-fan-card', GlassFanCard); } catch { /* already registered */ }
