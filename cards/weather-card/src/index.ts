import { css, html, svg, nothing, type CSSResult, type TemplateResult, type PropertyValues } from 'lit';
import { state } from 'lit/decorators.js';
import { BaseCard, BackendService, type HassEntity } from '@glass-cards/base-card';
import { glassTokens, glassMixin, foldMixin } from '@glass-cards/ui-core';
import { t, type TranslationKey } from '@glass-cards/i18n';

// — HA condition → internal key mapping —

const HA_CONDITION_MAP: Record<string, string> = {
  'sunny': 'sunny', 'clear-night': 'clear_night',
  'partlycloudy': 'partly_cloudy', 'cloudy': 'cloudy',
  'fog': 'foggy', 'rainy': 'rainy', 'pouring': 'pouring',
  'snowy': 'snowy', 'snowy-rainy': 'snowy_rainy',
  'hail': 'hail', 'lightning': 'lightning',
  'lightning-rainy': 'stormy', 'windy': 'windy',
  'windy-variant': 'windy_variant', 'exceptional': 'exceptional',
};

interface ConditionMeta {
  icon: string;
  textKey: TranslationKey;
  tint: string;
  tintOp: number;
  sparkStroke: string;
  sparkFill: string;
}

const CONDITIONS: Record<string, ConditionMeta> = {
  sunny:         { icon: 'mdi:weather-sunny',           textKey: 'weather.cond_sunny',         tint: '#fbbf24', tintOp: 0.10, sparkStroke: 'rgba(251,191,36,0.6)',  sparkFill: 'rgba(251,191,36,0.15)' },
  clear_night:   { icon: 'mdi:weather-night',           textKey: 'weather.cond_clear_night',   tint: '#818cf8', tintOp: 0.08, sparkStroke: 'rgba(129,140,248,0.5)', sparkFill: 'rgba(129,140,248,0.12)' },
  partly_cloudy: { icon: 'mdi:weather-partly-cloudy',   textKey: 'weather.cond_partly_cloudy', tint: '#fcd34d', tintOp: 0.07, sparkStroke: 'rgba(252,211,77,0.5)',  sparkFill: 'rgba(252,211,77,0.12)' },
  cloudy:        { icon: 'mdi:weather-cloudy',          textKey: 'weather.cond_cloudy',        tint: '#94a3b8', tintOp: 0.04, sparkStroke: 'rgba(148,163,184,0.4)', sparkFill: 'rgba(148,163,184,0.08)' },
  foggy:         { icon: 'mdi:weather-fog',             textKey: 'weather.cond_foggy',         tint: '#94a3b8', tintOp: 0.04, sparkStroke: 'rgba(148,163,184,0.35)',sparkFill: 'rgba(148,163,184,0.08)' },
  rainy:         { icon: 'mdi:weather-rainy',           textKey: 'weather.cond_rainy',         tint: '#60a5fa', tintOp: 0.10, sparkStroke: 'rgba(96,165,250,0.6)',  sparkFill: 'rgba(96,165,250,0.15)' },
  pouring:       { icon: 'mdi:weather-pouring',         textKey: 'weather.cond_pouring',       tint: '#3b82f6', tintOp: 0.14, sparkStroke: 'rgba(59,130,246,0.7)',  sparkFill: 'rgba(59,130,246,0.18)' },
  snowy:         { icon: 'mdi:weather-snowy',           textKey: 'weather.cond_snowy',         tint: '#e0f2fe', tintOp: 0.08, sparkStroke: 'rgba(224,242,254,0.5)', sparkFill: 'rgba(224,242,254,0.12)' },
  snowy_rainy:   { icon: 'mdi:weather-snowy-rainy',     textKey: 'weather.cond_snowy_rainy',   tint: '#93c5fd', tintOp: 0.08, sparkStroke: 'rgba(147,197,253,0.5)', sparkFill: 'rgba(147,197,253,0.12)' },
  hail:          { icon: 'mdi:weather-hail',            textKey: 'weather.cond_hail',          tint: '#bae6fd', tintOp: 0.10, sparkStroke: 'rgba(186,230,253,0.5)', sparkFill: 'rgba(186,230,253,0.12)' },
  lightning:     { icon: 'mdi:weather-lightning',        textKey: 'weather.cond_lightning',     tint: '#c084fc', tintOp: 0.12, sparkStroke: 'rgba(192,132,252,0.6)', sparkFill: 'rgba(167,139,250,0.15)' },
  stormy:        { icon: 'mdi:weather-lightning-rainy',  textKey: 'weather.cond_stormy',        tint: '#a78bfa', tintOp: 0.12, sparkStroke: 'rgba(167,139,250,0.6)', sparkFill: 'rgba(167,139,250,0.15)' },
  windy:         { icon: 'mdi:weather-windy',           textKey: 'weather.cond_windy',         tint: '#6ee7b7', tintOp: 0.06, sparkStroke: 'rgba(110,231,183,0.5)', sparkFill: 'rgba(110,231,183,0.10)' },
  windy_variant: { icon: 'mdi:weather-windy-variant',   textKey: 'weather.cond_windy_variant', tint: '#6ee7b7', tintOp: 0.06, sparkStroke: 'rgba(110,231,183,0.4)', sparkFill: 'rgba(110,231,183,0.10)' },
  exceptional:   { icon: 'mdi:alert-circle-outline',    textKey: 'weather.cond_exceptional',   tint: '#fca5a5', tintOp: 0.10, sparkStroke: 'rgba(252,165,165,0.5)', sparkFill: 'rgba(252,165,165,0.12)' },
};

const COMPASS = ['N','NNE','NE','ENE','E','ESE','SE','SSE','S','SSO','SO','OSO','O','ONO','NO','NNO'];
function bearingToDir(b: number | undefined): string {
  if (b == null) return '';
  return COMPASS[Math.round(((+b % 360 + 360) % 360) / 22.5) % 16];
}

function pad(n: number): string { return n < 10 ? '0' + n : '' + n; }

function intlDay(date: Date, lang: string): string {
  return date.toLocaleDateString(lang, { weekday: 'long' });
}
function intlDayShort(date: Date, lang: string): string {
  return date.toLocaleDateString(lang, { weekday: 'short' });
}
function intlMonth(date: Date, lang: string): string {
  return date.toLocaleDateString(lang, { month: 'long' });
}

// — Forecast types —

interface HourlyForecast {
  datetime: string;
  temperature: number;
  condition: string;
  precipitation_probability?: number;
}

interface DailyForecast {
  datetime: string;
  temperature: number;
  templow?: number;
  condition: string;
  precipitation_probability?: number;
}

// — Particle system types —

interface Particle {
  type: string;
  x: number; y: number;
  [key: string]: unknown;
}

interface FlashState {
  on: boolean; opacity: number; timer: number; interval: number; color: string;
}

// — Weather config from backend —

interface WeatherBackendConfig {
  entity_id: string;
  hidden_metrics: string[];
  show_daily: boolean;
  show_hourly: boolean;
}

// ================================================================
// WEATHER CARD
// ================================================================

class GlassWeatherCard extends BaseCard {
  // — State —
  @state() private _activeTab: 'daily' | 'hourly' | null = null;
  @state() private _forecastDaily: DailyForecast[] = [];
  @state() private _forecastHourly: HourlyForecast[] = [];
  @state() private _clockTime = '';
  @state() private _clockSec = '';
  @state() private _clockDay = '';
  @state() private _clockDate = '';

  // — Config from backend —
  private _weatherConfig: WeatherBackendConfig = {
    entity_id: '', hidden_metrics: [], show_daily: true, show_hourly: true,
  };
  // — Canvas animation —
  private _canvas: HTMLCanvasElement | null = null;
  private _ctx: CanvasRenderingContext2D | null = null;
  private _animId = 0;
  private _particles: Particle[] = [];
  private _flashState: FlashState = { on: false, opacity: 0, timer: 0, interval: 200, color: 'rgba(167,139,250,' };
  private _cW = 0;
  private _cH = 0;
  private _resizeObserver: ResizeObserver | null = null;

  // — Cached condition for animation loop —
  private _cachedCond = '';

  // — Subscriptions —
  private _clockInterval = 0;
  private _unsubDaily: (() => void) | null = null;
  private _unsubHourly: (() => void) | null = null;
  private _backend: BackendService | undefined;
  private _configLoaded = false;

  // — Styles —

  static styles: CSSResult[] = [glassTokens, glassMixin, foldMixin, css`
    :host {
      display: block;
      width: 100%;
      max-width: 500px;
      margin: 0 auto;
    }

    .weather-card-wrap {
      display: flex; flex-direction: column; gap: 6px;
    }

    .card-header {
      display: flex; align-items: center; justify-content: space-between;
      padding: 0 6px;
    }
    .card-title {
      font-size: 9px; font-weight: 700;
      text-transform: uppercase; letter-spacing: 1.5px;
      color: var(--t4);
    }
    .card-location {
      font-size: 9px; font-weight: 500; color: var(--t3);
    }

    .weather-card {
      position: relative;
      width: 100%; padding: 14px 14px 8px;
      box-sizing: border-box;
    }

    .card-inner {
      position: relative; z-index: 1;
      display: flex; flex-direction: column; gap: 8px;
    }

    /* ── Header: clock + weather ── */
    .wc-header {
      display: flex; align-items: flex-start; justify-content: space-between;
    }

    .wc-clock-zone {
      display: flex; flex-direction: column; gap: 1px;
    }
    .wc-clock-hm {
      font-size: 28px; font-weight: 300; line-height: 1;
      color: var(--t1); letter-spacing: -0.8px;
      font-variant-numeric: tabular-nums;
    }
    .wc-clock-sec {
      font-size: 12px; font-weight: 300; color: var(--t4);
      margin-left: 1px;
    }
    .wc-clock-date {
      font-size: 10px; font-weight: 500; color: var(--t4);
    }
    .wc-clock-day {
      font-weight: 600; color: var(--t3);
      text-transform: capitalize;
    }

    .wc-weather-zone {
      display: flex; flex-direction: column; align-items: flex-end; gap: 1px;
    }
    .wc-temp-row {
      display: flex; align-items: baseline; gap: 2px;
    }
    .wc-temp {
      font-size: 28px; font-weight: 700; line-height: 1;
      color: var(--t1); letter-spacing: -0.5px;
    }
    .wc-temp-unit {
      font-size: 12px; font-weight: 400; color: var(--t3);
    }
    .wc-cond-row {
      display: flex; align-items: center; gap: 4px;
    }
    .wc-cond-icon {
      --mdc-icon-size: 13px;
      width: 13px; height: 13px;
      display: flex; align-items: center; justify-content: center;
      color: var(--t3);
      transition: color var(--t-med), filter var(--t-med);
    }
    .wc-cond-icon.sunny { color: #fbbf24; filter: drop-shadow(0 0 4px rgba(251,191,36,0.35)); }
    .wc-cond-icon.partly_cloudy { color: #fcd34d; }
    .wc-cond-icon.cloudy { color: var(--t2); }
    .wc-cond-icon.rainy { color: #60a5fa; filter: drop-shadow(0 0 4px rgba(96,165,250,0.3)); }
    .wc-cond-icon.pouring { color: #3b82f6; filter: drop-shadow(0 0 4px rgba(59,130,246,0.4)); }
    .wc-cond-icon.stormy { color: #a78bfa; filter: drop-shadow(0 0 4px rgba(167,139,250,0.35)); }
    .wc-cond-icon.lightning { color: #c084fc; filter: drop-shadow(0 0 5px rgba(192,132,252,0.4)); }
    .wc-cond-icon.snowy { color: #e0f2fe; }
    .wc-cond-icon.snowy_rainy { color: #93c5fd; }
    .wc-cond-icon.hail { color: #bae6fd; filter: drop-shadow(0 0 3px rgba(186,230,253,0.3)); }
    .wc-cond-icon.foggy { color: var(--t3); }
    .wc-cond-icon.windy { color: #6ee7b7; filter: drop-shadow(0 0 3px rgba(110,231,183,0.3)); }
    .wc-cond-icon.windy_variant { color: #6ee7b7; }
    .wc-cond-icon.clear_night { color: #818cf8; filter: drop-shadow(0 0 4px rgba(129,140,248,0.35)); }
    .wc-cond-icon.exceptional { color: #fca5a5; filter: drop-shadow(0 0 4px rgba(252,165,165,0.3)); }
    .wc-cond-text {
      font-size: 10px; font-weight: 500; color: var(--t3);
    }
    .wc-feels {
      font-size: 9px; font-weight: 500; color: var(--t4);
    }

    /* ── Canvas animation ── */
    .wc-anim {
      position: absolute; inset: 0; border-radius: inherit;
      overflow: hidden; pointer-events: none; z-index: 0;
    }

    /* ── Sparkline ── */
    .wc-spark-zone {
      position: relative;
      width: 100%; height: 64px;
      border-radius: var(--radius-sm);
      overflow: hidden;
    }
    .wc-spark-svg {
      width: 100%; height: 100%;
      display: block;
    }
    .wc-spark-line {
      fill: none; stroke-width: 2;
      stroke-linecap: round; stroke-linejoin: round;
      transition: stroke var(--t-med), d var(--t-med);
    }
    .wc-spark-area {
      stroke: none;
      transition: fill var(--t-med), d var(--t-med);
    }
    .wc-spark-labels {
      position: absolute; inset: 0;
      display: flex; justify-content: space-between; align-items: flex-end;
      padding: 0 4px 4px;
      pointer-events: none;
    }
    .wc-spark-lbl {
      font-size: 8px; font-weight: 600; color: var(--t4);
      text-align: center;
    }
    .wc-spark-now {
      position: absolute;
      top: 0; bottom: 0;
      width: 1px;
      background: linear-gradient(to bottom, transparent, rgba(255,255,255,0.15), transparent);
      pointer-events: none;
    }
    .wc-spark-now-dot {
      position: absolute; top: 0;
      width: 6px; height: 6px; border-radius: 50%;
      background: var(--t1);
      box-shadow: 0 0 6px rgba(255,255,255,0.4);
      transform: translate(-50%, -50%);
      pointer-events: none;
    }

    /* ── Metrics Grid ── */
    .wc-metrics {
      display: grid; grid-template-columns: repeat(3, 1fr);
      gap: 1px;
      border-radius: var(--radius-sm);
      background: var(--b1);
      overflow: hidden;
    }
    .wc-metric {
      display: flex; align-items: center; justify-content: center; gap: 3px;
      padding: 5px 4px;
      background: var(--s1);
    }
    .wc-metric ha-icon {
      --mdc-icon-size: 11px;
      width: 11px; height: 11px;
      display: flex; align-items: center; justify-content: center;
      color: var(--t4);
    }
    .wc-metric.humidity ha-icon { color: rgba(96,165,250,0.5); }
    .wc-metric.pressure ha-icon { color: rgba(148,163,184,0.5); }
    .wc-metric.wind ha-icon { color: rgba(110,231,183,0.5); }
    .wc-metric.uv ha-icon { color: rgba(251,191,36,0.5); }
    .wc-metric.visibility ha-icon { color: rgba(148,163,184,0.4); }
    .wc-metric.sunrise ha-icon { color: rgba(251,191,36,0.4); }
    .wc-metric.sunset ha-icon { color: rgba(251,146,60,0.5); }
    .wc-metric-val { font-size: 10px; font-weight: 600; color: var(--t2); }
    .wc-metric-unit { font-size: 8px; font-weight: 400; color: var(--t4); }
    .wc-metric-dir { font-size: 8px; font-weight: 600; color: var(--t4); margin-left: 1px; }

    /* ── Forecast tabs ── */
    /* ── Fold separator ── */
    .wc-fold-sep {
      height: 1px; margin: 2px 12px;
      background: linear-gradient(90deg, transparent, rgba(129,140,248,0.25), transparent);
      opacity: 0; transition: opacity 0.25s var(--ease-std, ease);
    }
    .wc-fold-sep.visible { opacity: 1; }

    .wc-forecast-zone {
      display: flex; flex-direction: column; gap: 4px;
    }
    .wc-fc-tabs {
      display: flex; gap: 3px;
      margin: 0 auto; width: fit-content;
    }
    .wc-fc-tab {
      padding: 3px 10px;
      border: 1px solid var(--b1);
      border-radius: var(--radius-full);
      background: transparent; color: var(--t4);
      font-family: inherit; font-size: 9px; font-weight: 600;
      text-transform: uppercase; letter-spacing: 0.8px;
      cursor: pointer; transition: all var(--t-fast);
      outline: none;
    }
    .wc-fc-tab:focus-visible { box-shadow: 0 0 0 2px rgba(255,255,255,0.25); }
    .wc-fc-tab:active { transform: scale(0.96); }
    .wc-fc-tab.active {
      background: var(--s4); border-color: var(--b3); color: var(--t1);
    }
    @media (hover: hover) {
      .wc-fc-tab:hover { background: var(--s2); color: var(--t3); }
    }

    /* ── Daily list ── */
    .wc-daily-list, .wc-hourly-list {
      display: flex; flex-direction: column; gap: 1px;
      padding: 2px 0;
    }
    .wc-day-row {
      display: grid; grid-template-columns: 42px 18px 1fr 42px 38px;
      align-items: center; gap: 5px;
      padding: 5px 4px;
      border-radius: var(--radius-sm);
      transition: background var(--t-fast);
    }
    .wc-day-row:first-child { background: var(--s2); }
    .wc-day-label {
      font-size: 10px; font-weight: 600; color: var(--t3);
    }
    .wc-day-row:first-child .wc-day-label { color: var(--t2); }
    .wc-day-icon {
      --mdc-icon-size: 14px;
      width: 14px; height: 14px;
      display: flex; align-items: center; justify-content: center;
      color: var(--t3);
    }
    .wc-day-icon.sunny, .wc-hour-icon.sunny { color: #fbbf24; }
    .wc-day-icon.partly_cloudy, .wc-hour-icon.partly_cloudy { color: #fcd34d; }
    .wc-day-icon.cloudy, .wc-hour-icon.cloudy { color: var(--t2); }
    .wc-day-icon.rainy, .wc-hour-icon.rainy { color: #60a5fa; }
    .wc-day-icon.pouring, .wc-hour-icon.pouring { color: #3b82f6; }
    .wc-day-icon.stormy, .wc-hour-icon.stormy { color: #a78bfa; }
    .wc-day-icon.lightning, .wc-hour-icon.lightning { color: #c084fc; }
    .wc-day-icon.snowy, .wc-hour-icon.snowy { color: #e0f2fe; }
    .wc-day-icon.snowy_rainy, .wc-hour-icon.snowy_rainy { color: #93c5fd; }
    .wc-day-icon.hail, .wc-hour-icon.hail { color: #bae6fd; }
    .wc-day-icon.foggy, .wc-hour-icon.foggy { color: var(--t3); }
    .wc-day-icon.windy, .wc-hour-icon.windy { color: #6ee7b7; }
    .wc-day-icon.windy_variant, .wc-hour-icon.windy_variant { color: #6ee7b7; }
    .wc-day-icon.clear_night, .wc-hour-icon.clear_night { color: #818cf8; }
    .wc-day-icon.exceptional, .wc-hour-icon.exceptional { color: #fca5a5; }
    .wc-day-cond {
      font-size: 10px; font-weight: 500; color: var(--t4);
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }
    .wc-day-temps {
      display: flex; align-items: baseline; gap: 2px; justify-content: flex-end;
    }
    .wc-day-hi { font-size: 11px; font-weight: 700; color: var(--t1); }
    .wc-day-lo { font-size: 10px; font-weight: 500; color: var(--t4); }
    .wc-day-precip {
      font-size: 9px; font-weight: 500; color: rgba(96,165,250,0.5);
      text-align: right;
    }

    /* ── Hourly list ── */
    .wc-hour-row {
      display: grid; grid-template-columns: 42px 18px 1fr 38px 32px;
      align-items: center; gap: 5px;
      padding: 5px 4px;
      border-radius: var(--radius-sm);
      transition: background var(--t-fast);
    }
    .wc-hour-row.now { background: var(--s2); }
    .wc-hour-time {
      font-size: 10px; font-weight: 600; color: var(--t3);
    }
    .wc-hour-row.now .wc-hour-time { color: var(--t2); }
    .wc-hour-icon {
      --mdc-icon-size: 14px;
      width: 14px; height: 14px;
      display: flex; align-items: center; justify-content: center;
      color: var(--t3);
    }
    .wc-hour-cond {
      font-size: 10px; font-weight: 500; color: var(--t4);
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }
    .wc-hour-temp {
      font-size: 11px; font-weight: 700; color: var(--t1);
      text-align: right;
    }
    .wc-hour-precip {
      font-size: 9px; font-weight: 500; color: rgba(96,165,250,0.5);
      text-align: right;
    }

    @media (hover: hover) {
      .wc-day-row:hover, .wc-hour-row:hover { background: var(--s1); }
    }

    /* ── Tint ── */
    .tint {
      position: absolute; inset: 0; border-radius: inherit;
      pointer-events: none; z-index: 0;
      transition: opacity var(--t-slow);
    }
  `];

  // — Tracked entities —

  protected getTrackedEntityIds(): string[] {
    const ids: string[] = [];
    const eid = this._getEntityId();
    if (eid) ids.push(eid);
    if (this.hass?.states['sun.sun']) ids.push('sun.sun');
    return ids;
  }

  private _getEntityId(): string {
    // Priority: config entity > backend config > auto-discover
    if (this._config?.entity) return this._config.entity as string;
    if (this._weatherConfig.entity_id) return this._weatherConfig.entity_id;
    // Auto-discover first weather entity
    if (this.hass) {
      const weatherEntity = Object.keys(this.hass.states).find((k) => k.startsWith('weather.'));
      if (weatherEntity) return weatherEntity;
    }
    return '';
  }

  private _getWeatherState(): HassEntity | undefined {
    const eid = this._getEntityId();
    return eid ? this.hass?.states[eid] : undefined;
  }

  // — Condition helpers —

  private _mapCondition(haCondition: string): string {
    return HA_CONDITION_MAP[haCondition] ?? 'cloudy';
  }

  private _getConditionMeta(cond: string): ConditionMeta {
    return CONDITIONS[cond] ?? CONDITIONS.cloudy;
  }

  // — Lifecycle —

  private _canvasReady = false;

  private _needsCanvasReInit = false;

  connectedCallback(): void {
    super.connectedCallback();
    this._startClock();
    this._listen('weather-config-changed', () => this._loadConfig());
    // Flag canvas for re-init on next render (shadow DOM not yet available here)
    if (this._canvasReady) {
      this._needsCanvasReInit = true;
    }
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._stopClock();
    this._stopAnimation();
    this._unsubForecasts();
    this._resizeObserver?.disconnect();
    this._resizeObserver = null;
    this._canvas = null;
    this._ctx = null;
    this._backend = undefined;
  }

  protected updated(changedProps: PropertyValues): void {
    super.updated(changedProps);
    if (changedProps.has('hass') && this.hass) {
      // Invalidate backend on WS reconnect
      if (this._backend && this._backend.connection !== this.hass.connection) {
        this._backend = undefined;
        this._configLoaded = false;
        this._unsubForecasts();
      }
      if (!this._configLoaded) {
        this._configLoaded = true;
        this._backend = new BackendService(this.hass);
        this._loadConfig();
      }
      // Cache condition for animation loop (avoid Object.keys scan at 60fps)
      const ws = this._getWeatherState();
      this._cachedCond = ws ? this._mapCondition(ws.state) : '';
      this._subscribeForecasts();
    }
    // Re-init canvas after reconnect (shadow DOM is available in updated, not in connectedCallback)
    if (this._needsCanvasReInit) {
      this._needsCanvasReInit = false;
      this._initCanvas();
    }
  }

  protected firstUpdated(): void {
    this._canvasReady = true;
    this._initCanvas();
  }

  // — Backend config —

  private async _loadConfig(): Promise<void> {
    if (!this._backend) return;
    try {
      const result = await this._backend.send<{
        weather: WeatherBackendConfig;
      }>('get_config');
      if (result?.weather) {
        this._weatherConfig = result.weather;
      }
      this.requestUpdate();
    } catch { /* ignore */ }
  }

  // — Forecast subscriptions —

  private _subscribedEntity = '';
  private _subscribedShowDaily = false;
  private _subscribedShowHourly = false;
  private _subVersion = 0;

  private async _subscribeForecasts(): Promise<void> {
    const eid = this._getEntityId();
    if (!eid || !this.hass) return;

    const configChanged =
      this._subscribedShowDaily !== this._weatherConfig.show_daily ||
      this._subscribedShowHourly !== this._weatherConfig.show_hourly;
    if (eid === this._subscribedEntity && !configChanged) return;

    this._unsubForecasts();
    this._subscribedEntity = eid;
    this._subscribedShowDaily = this._weatherConfig.show_daily;
    this._subscribedShowHourly = this._weatherConfig.show_hourly;
    const version = ++this._subVersion;

    // Daily forecast
    if (this._weatherConfig.show_daily) {
      const unsub = await this.hass.connection.subscribeMessage<{ forecast: DailyForecast[] }>(
        (msg) => { this._forecastDaily = msg.forecast ?? []; },
        { type: 'weather/subscribe_forecast', forecast_type: 'daily', entity_id: eid },
      );
      if (this._subVersion !== version) { unsub(); return; }
      this._unsubDaily = unsub;
    }

    // Hourly forecast
    if (this._weatherConfig.show_hourly) {
      const unsub = await this.hass.connection.subscribeMessage<{ forecast: HourlyForecast[] }>(
        (msg) => { this._forecastHourly = msg.forecast ?? []; },
        { type: 'weather/subscribe_forecast', forecast_type: 'hourly', entity_id: eid },
      );
      if (this._subVersion !== version) { unsub(); return; }
      this._unsubHourly = unsub;
    }
  }

  private _unsubForecasts(): void {
    this._subVersion++;
    this._unsubDaily?.();
    this._unsubDaily = null;
    this._unsubHourly?.();
    this._unsubHourly = null;
    this._subscribedEntity = '';
  }

  // — Clock —

  private _startClock(): void {
    this._stopClock(); // Guard against double-start on unexpected double connectedCallback
    this._updateClock();
    this._clockInterval = window.setInterval(() => this._updateClock(), 1000);
  }

  private _stopClock(): void {
    if (this._clockInterval) {
      clearInterval(this._clockInterval);
      this._clockInterval = 0;
    }
  }

  private _updateClock(): void {
    const now = new Date();
    this._clockTime = pad(now.getHours()) + ':' + pad(now.getMinutes());
    this._clockSec = ':' + pad(now.getSeconds());
    this._clockDay = intlDay(now, this._lang);
    this._clockDate = now.getDate() + ' ' + intlMonth(now, this._lang);
  }

  // — Canvas animation —

  private _initCanvas(): void {
    this._canvas = this.renderRoot.querySelector<HTMLCanvasElement>('.wc-anim');
    if (!this._canvas) return;
    this._ctx = this._canvas.getContext('2d');
    this._resizeObserver = new ResizeObserver(() => this._resizeCanvas());
    const parent = this._canvas.parentElement;
    if (parent) this._resizeObserver.observe(parent);
    this._resizeCanvas();
    this._startAnimation();
  }

  private _resizeCanvas(): void {
    if (!this._canvas || !this._ctx) return;
    const parent = this._canvas.parentElement;
    if (!parent) return;
    const rect = parent.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    this._cW = rect.width;
    this._cH = rect.height;
    this._canvas.width = this._cW * dpr;
    this._canvas.height = this._cH * dpr;
    this._canvas.style.width = this._cW + 'px';
    this._canvas.style.height = this._cH + 'px';
    this._ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  private _startAnimation(): void {
    this._spawnParticles(this._cachedCond || 'cloudy');
    this._animate();
  }

  private _stopAnimation(): void {
    if (this._animId) {
      cancelAnimationFrame(this._animId);
      this._animId = 0;
    }
  }

  private _rnd(a: number, b: number): number { return a + Math.random() * (b - a); }

  private _spawnParticles(cond: string): void {
    this._particles = [];
    this._flashState = { on: false, opacity: 0, timer: 0, interval: this._rnd(120, 280), color: 'rgba(167,139,250,' };
    const cW = this._cW, cH = this._cH;
    if (!cW || !cH) return;

    const mkDrop = (color: string, lenMin: number, lenMax: number, speedMin: number, speedMax: number, angle: number): Particle => ({
      type: 'drop', x: this._rnd(0, cW), y: this._rnd(-30, -5),
      len: this._rnd(lenMin, lenMax), speed: this._rnd(speedMin, speedMax),
      angle, color, opacity: this._rnd(0.4, 0.7),
    });
    const mkFlake = (): Particle => ({
      type: 'flake', x: this._rnd(0, cW), y: this._rnd(-10, -3),
      r: this._rnd(1.5, 3.5), speed: this._rnd(0.4, 1.2),
      drift: this._rnd(-0.3, 0.3), phase: this._rnd(0, 6.28), opacity: this._rnd(0.3, 0.7),
    });
    const mkMote = (color: string): Particle => ({
      type: 'mote', x: this._rnd(cW * 0.1, cW * 0.9), y: this._rnd(cH * 0.3, cH * 0.9),
      r: this._rnd(1, 2.5), speed: this._rnd(0.15, 0.4),
      drift: this._rnd(-0.15, 0.15), phase: this._rnd(0, 6.28),
      color, opacity: 0, maxOp: this._rnd(0.3, 0.7), life: 0, maxLife: this._rnd(180, 360),
    });
    const mkStar = (): Particle => ({
      type: 'star', x: this._rnd(cW * 0.05, cW * 0.95), y: this._rnd(cH * 0.05, cH * 0.7),
      r: this._rnd(0.8, 1.8), phase: this._rnd(0, 6.28), speed: this._rnd(0.008, 0.025),
    });
    const mkCloud = (opacity: number, speed: number): Particle => ({
      type: 'cloud', x: this._rnd(-80, cW), y: this._rnd(cH * 0.05, cH * 0.6),
      w: this._rnd(50, 110), h: this._rnd(12, 26), speed: this._rnd(speed * 0.6, speed),
      opacity: this._rnd(opacity * 0.6, opacity),
    });
    const mkStreak = (): Particle => ({
      type: 'streak', x: this._rnd(-60, 0), y: this._rnd(cH * 0.1, cH * 0.85),
      w: this._rnd(40, 90), speed: this._rnd(2, 5), opacity: this._rnd(0.06, 0.14),
    });
    const mkFog = (): Particle => ({
      type: 'fog', x: this._rnd(-120, cW * 0.5), y: this._rnd(cH * 0.15, cH * 0.75),
      w: this._rnd(80, 160), h: this._rnd(18, 35), speed: this._rnd(0.2, 0.6), opacity: this._rnd(0.02, 0.04),
    });
    const mkHail = (): Particle => ({
      type: 'hail', x: this._rnd(0, cW), y: this._rnd(-15, -3),
      r: this._rnd(2, 4), speed: this._rnd(3, 5.5), opacity: this._rnd(0.5, 0.8),
    });

    const ps = this._particles;
    switch (cond) {
      case 'sunny':
        for (let i = 0; i < 10; i++) ps.push(mkMote('rgba(251,191,36,'));
        break;
      case 'clear_night':
        for (let i = 0; i < 14; i++) ps.push(mkStar());
        break;
      case 'partly_cloudy':
        for (let i = 0; i < 3; i++) ps.push(mkCloud(0.035, 0.4));
        for (let i = 0; i < 4; i++) ps.push(mkMote('rgba(251,191,36,'));
        break;
      case 'cloudy':
        for (let i = 0; i < 5; i++) ps.push(mkCloud(0.045, 0.35));
        break;
      case 'foggy':
        for (let i = 0; i < 7; i++) ps.push(mkFog());
        break;
      case 'rainy':
        for (let i = 0; i < 20; i++) ps.push(mkDrop('rgba(96,165,250,', 14, 24, 4, 7, 0.14));
        for (let i = 0; i < 3; i++) ps.push(mkCloud(0.025, 0.3));
        break;
      case 'pouring':
        for (let i = 0; i < 35; i++) ps.push(mkDrop('rgba(59,130,246,', 18, 30, 5.5, 9, 0.1));
        for (let i = 0; i < 4; i++) ps.push(mkCloud(0.035, 0.35));
        break;
      case 'stormy':
        for (let i = 0; i < 28; i++) ps.push(mkDrop('rgba(167,139,250,', 16, 28, 5, 8, 0.26));
        for (let i = 0; i < 4; i++) ps.push(mkCloud(0.05, 0.5));
        this._flashState.interval = this._rnd(80, 200);
        break;
      case 'lightning':
        for (let i = 0; i < 4; i++) ps.push(mkCloud(0.04, 0.4));
        this._flashState.interval = this._rnd(60, 160);
        this._flashState.color = 'rgba(192,132,252,';
        break;
      case 'snowy':
        for (let i = 0; i < 18; i++) ps.push(mkFlake());
        for (let i = 0; i < 3; i++) ps.push(mkCloud(0.025, 0.2));
        break;
      case 'snowy_rainy':
        for (let i = 0; i < 10; i++) ps.push(mkFlake());
        for (let i = 0; i < 14; i++) ps.push(mkDrop('rgba(96,165,250,', 12, 20, 3.5, 6, 0.14));
        break;
      case 'hail':
        for (let i = 0; i < 14; i++) ps.push(mkHail());
        for (let i = 0; i < 10; i++) ps.push(mkDrop('rgba(96,165,250,', 10, 18, 3.5, 5.5, 0.14));
        break;
      case 'windy':
        for (let i = 0; i < 8; i++) ps.push(mkStreak());
        break;
      case 'windy_variant':
        for (let i = 0; i < 6; i++) ps.push(mkStreak());
        for (let i = 0; i < 4; i++) ps.push(mkCloud(0.035, 1.2));
        break;
      case 'exceptional':
        for (let i = 0; i < 8; i++) ps.push(mkMote('rgba(252,165,165,'));
        for (let i = 0; i < 5; i++) ps.push(mkStreak());
        break;
    }
  }

  private _animate = (): void => {
    const ctx = this._ctx;
    if (!ctx) return;
    ctx.clearRect(0, 0, this._cW, this._cH);

    for (const p of this._particles) {
      this._updateParticle(p);
      this._drawParticle(ctx, p);
    }

    // Lightning flash
    const cond = this._cachedCond;
    if (cond === 'stormy' || cond === 'lightning') {
      this._updateFlash();
      if (this._flashState.opacity > 0.01) {
        ctx.fillStyle = this._flashState.color + this._flashState.opacity + ')';
        ctx.fillRect(0, 0, this._cW, this._cH);
      }
    }

    this._animId = requestAnimationFrame(this._animate);
  };

  private _updateParticle(p: Particle): void {
    const cW = this._cW, cH = this._cH;
    switch (p.type) {
      case 'drop':
        p.x = (p.x as number) + Math.sin(p.angle as number) * (p.speed as number);
        p.y = (p.y as number) + Math.cos(p.angle as number) * (p.speed as number);
        if ((p.y as number) > cH + 10) { p.y = this._rnd(-30, -5); p.x = this._rnd(0, cW); }
        break;
      case 'flake':
        p.y = (p.y as number) + (p.speed as number);
        p.phase = (p.phase as number) + 0.02;
        p.x = (p.x as number) + (p.drift as number) + Math.sin(p.phase as number) * 0.3;
        if ((p.y as number) > cH + 10) { p.y = this._rnd(-10, -3); p.x = this._rnd(0, cW); }
        break;
      case 'mote': {
        p.life = (p.life as number) + 1;
        p.y = (p.y as number) - (p.speed as number);
        p.x = (p.x as number) + (p.drift as number) + Math.sin((p.phase as number) + (p.life as number) * 0.015) * 0.2;
        const tVal = (p.life as number) / (p.maxLife as number);
        p.opacity = tVal < 0.15 ? (tVal / 0.15) * (p.maxOp as number) : tVal > 0.85 ? ((1 - tVal) / 0.15) * (p.maxOp as number) : (p.maxOp as number);
        if ((p.life as number) >= (p.maxLife as number)) {
          p.life = 0; p.x = this._rnd(cW * 0.1, cW * 0.9); p.y = this._rnd(cH * 0.3, cH * 0.9);
          p.maxLife = this._rnd(180, 360); p.maxOp = this._rnd(0.3, 0.7);
        }
        break;
      }
      case 'star':
        p.phase = (p.phase as number) + (p.speed as number);
        break;
      case 'cloud':
        p.x = (p.x as number) + (p.speed as number);
        if ((p.x as number) > cW + 20) { p.x = -(p.w as number) - this._rnd(10, 60); p.y = this._rnd(cH * 0.05, cH * 0.6); }
        break;
      case 'streak':
        p.x = (p.x as number) + (p.speed as number);
        if ((p.x as number) > cW + 20) { p.x = this._rnd(-80, -20); p.y = this._rnd(cH * 0.1, cH * 0.85); }
        break;
      case 'fog':
        p.x = (p.x as number) + (p.speed as number);
        if ((p.x as number) > cW + 40) { p.x = -(p.w as number) - this._rnd(20, 80); p.y = this._rnd(cH * 0.15, cH * 0.75); }
        break;
      case 'hail':
        p.y = (p.y as number) + (p.speed as number);
        if ((p.y as number) > cH + 10) { p.y = this._rnd(-15, -3); p.x = this._rnd(0, cW); }
        break;
    }
  }

  private _drawParticle(ctx: CanvasRenderingContext2D, p: Particle): void {
    switch (p.type) {
      case 'drop': {
        const dx = Math.sin(p.angle as number) * (p.len as number);
        const dy = Math.cos(p.angle as number) * (p.len as number);
        const grad = ctx.createLinearGradient(p.x, p.y, p.x + dx, p.y + dy);
        grad.addColorStop(0, (p.color as string) + '0)');
        grad.addColorStop(1, (p.color as string) + (p.opacity as number) + ')');
        ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(p.x + dx, p.y + dy);
        ctx.strokeStyle = grad; ctx.lineWidth = 1.5; ctx.stroke();
        break;
      }
      case 'flake':
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r as number, 0, 6.28);
        ctx.fillStyle = 'rgba(255,255,255,' + (p.opacity as number) + ')';
        ctx.fill();
        break;
      case 'mote':
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r as number, 0, 6.28);
        ctx.fillStyle = (p.color as string) + (p.opacity as number) + ')';
        ctx.shadowColor = (p.color as string) + ((p.opacity as number) * 0.5) + ')';
        ctx.shadowBlur = 6; ctx.fill(); ctx.shadowBlur = 0;
        break;
      case 'star': {
        const op = 0.15 + 0.75 * (0.5 + 0.5 * Math.sin(p.phase as number));
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r as number, 0, 6.28);
        ctx.fillStyle = 'rgba(255,255,255,' + op + ')'; ctx.fill();
        break;
      }
      case 'cloud': {
        const r = (p.h as number) / 2;
        ctx.beginPath();
        ctx.moveTo(p.x + r, p.y); ctx.lineTo(p.x + (p.w as number) - r, p.y);
        ctx.arcTo(p.x + (p.w as number), p.y, p.x + (p.w as number), p.y + r, r);
        ctx.arcTo(p.x + (p.w as number), p.y + (p.h as number), p.x + (p.w as number) - r, p.y + (p.h as number), r);
        ctx.lineTo(p.x + r, p.y + (p.h as number));
        ctx.arcTo(p.x, p.y + (p.h as number), p.x, p.y + r, r);
        ctx.arcTo(p.x, p.y, p.x + r, p.y, r);
        ctx.closePath();
        ctx.fillStyle = 'rgba(255,255,255,' + (p.opacity as number) + ')'; ctx.fill();
        break;
      }
      case 'streak': {
        const grad2 = ctx.createLinearGradient(p.x, p.y, p.x + (p.w as number), p.y);
        grad2.addColorStop(0, 'rgba(255,255,255,0)');
        grad2.addColorStop(0.5, 'rgba(255,255,255,' + (p.opacity as number) + ')');
        grad2.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(p.x + (p.w as number), p.y);
        ctx.strokeStyle = grad2; ctx.lineWidth = 1; ctx.stroke();
        break;
      }
      case 'fog': {
        const rf = (p.h as number) / 2;
        ctx.beginPath();
        ctx.moveTo(p.x + rf, p.y); ctx.lineTo(p.x + (p.w as number) - rf, p.y);
        ctx.arcTo(p.x + (p.w as number), p.y, p.x + (p.w as number), p.y + rf, rf);
        ctx.arcTo(p.x + (p.w as number), p.y + (p.h as number), p.x + (p.w as number) - rf, p.y + (p.h as number), rf);
        ctx.lineTo(p.x + rf, p.y + (p.h as number));
        ctx.arcTo(p.x, p.y + (p.h as number), p.x, p.y + rf, rf);
        ctx.arcTo(p.x, p.y, p.x + rf, p.y, rf);
        ctx.closePath();
        ctx.fillStyle = 'rgba(255,255,255,' + (p.opacity as number) + ')'; ctx.fill();
        break;
      }
      case 'hail': {
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r as number, 0, 6.28);
        ctx.fillStyle = 'rgba(224,242,254,' + (p.opacity as number) + ')'; ctx.fill();
        ctx.beginPath(); ctx.arc(p.x - (p.r as number) * 0.25, p.y - (p.r as number) * 0.25, (p.r as number) * 0.4, 0, 6.28);
        ctx.fillStyle = 'rgba(255,255,255,' + ((p.opacity as number) * 0.3) + ')'; ctx.fill();
        break;
      }
    }
  }

  private _updateFlash(): void {
    const fs = this._flashState;
    fs.timer++;
    if (fs.on) {
      fs.opacity *= 0.82;
      if (fs.opacity < 0.02) { fs.on = false; fs.opacity = 0; fs.timer = 0; fs.interval = this._rnd(80, 280); }
    } else if (fs.timer > fs.interval) {
      fs.on = true; fs.opacity = this._rnd(0.12, 0.22);
    }
  }

  // — Sparkline computation —

  private _computeSparkline(hourly: HourlyForecast[]): { linePath: string; areaPath: string; nowY: number } {
    const n = hourly.length;
    if (n < 2) return { linePath: '', areaPath: '', nowY: 32 };
    const svgW = 348, svgH = 64, padY = 10;

    let minV = Infinity, maxV = -Infinity;
    for (const h of hourly) {
      if (h.temperature < minV) minV = h.temperature;
      if (h.temperature > maxV) maxV = h.temperature;
    }
    const rangeV = maxV - minV || 1;

    const points = hourly.map((h, i) => ({
      x: (i / (n - 1)) * svgW,
      y: padY + ((maxV - h.temperature) / rangeV) * (svgH - padY * 2),
    }));

    // Catmull-Rom to bezier
    let linePath = `M${points[0].x},${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[Math.max(i - 1, 0)];
      const p1 = points[i];
      const p2 = points[Math.min(i + 1, points.length - 1)];
      const p3 = points[Math.min(i + 2, points.length - 1)];
      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;
      linePath += ` C${cp1x},${cp1y} ${cp2x},${cp2y} ${p2.x},${p2.y}`;
    }
    const areaPath = linePath + ` L${svgW},${svgH} L0,${svgH} Z`;
    return { linePath, areaPath, nowY: points[0].y };
  }

  // — Render —

  protected render(): TemplateResult | typeof nothing {
    void this._lang;
    const ws = this._getWeatherState();
    if (!ws) {
      return html`<div class="weather-card-wrap">
        <div class="card-header"><span class="card-title">${t('weather.title')}</span></div>
        <div class="glass weather-card"><div class="card-inner" style="padding:20px;text-align:center;color:var(--t3);font-size:11px;">${t('common.no_entity')}</div></div>
      </div>`;
    }

    const attrs = ws.attributes;
    const haCond = ws.state;
    const cond = this._mapCondition(haCond);
    const meta = this._getConditionMeta(cond);

    const temp = attrs.temperature as number ?? 0;
    const feelsLike = attrs.apparent_temperature as number | undefined;
    const humidity = attrs.humidity as number | undefined;
    const windSpeed = attrs.wind_speed as number | undefined;
    const windBearing = attrs.wind_bearing as number | undefined;
    const pressure = attrs.pressure as number | undefined;
    const visibility = attrs.visibility as number | undefined;
    const uvIndex = attrs.uv_index as number | undefined;
    const friendlyName = attrs.friendly_name as string ?? '';
    const tempUnit = (attrs.temperature_unit as string | undefined) ?? '°C';

    // Sun entity for sunrise/sunset
    const sunState = this.hass?.states['sun.sun'];
    const nextRising = sunState?.attributes.next_rising as string | undefined;
    const nextSetting = sunState?.attributes.next_setting as string | undefined;
    const sunrise = nextRising ? new Date(nextRising).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';
    const sunset = nextSetting ? new Date(nextSetting).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';

    const hidden = new Set(this._weatherConfig.hidden_metrics);

    // Sparkline from hourly forecast
    const sparkHourly = this._forecastHourly.slice(0, 10);
    const spark = this._computeSparkline(sparkHourly);

    const tintStyle = `background: radial-gradient(ellipse at 80% 20%, ${meta.tint}, transparent 70%); opacity: ${meta.tintOp};`;

    return html`
      <div class="weather-card-wrap">
        <div class="card-header">
          <span class="card-title">${t('weather.title')}</span>
          <span class="card-location">${friendlyName}</span>
        </div>

        <div class="glass weather-card">
          <div class="tint" style="${tintStyle}"></div>
          <canvas class="wc-anim"></canvas>
          <div class="card-inner">

            <!-- Header: clock + weather -->
            <div class="wc-header">
              <div class="wc-clock-zone">
                <div>
                  <span class="wc-clock-hm">${this._clockTime}</span><span class="wc-clock-sec">${this._clockSec}</span>
                </div>
                <span class="wc-clock-date"><span class="wc-clock-day">${this._clockDay}</span> ${this._clockDate}</span>
              </div>
              <div class="wc-weather-zone">
                <div class="wc-temp-row">
                  <span class="wc-temp">${Math.round(temp)}</span>
                  <span class="wc-temp-unit">${tempUnit}</span>
                </div>
                <div class="wc-cond-row">
                  <ha-icon .icon="${meta.icon}" class="wc-cond-icon ${cond}"></ha-icon>
                  <span class="wc-cond-text">${t(meta.textKey)}</span>
                </div>
                ${feelsLike != null ? html`<span class="wc-feels">${t('weather.feels_like', { temp: Math.round(feelsLike) })}</span>` : nothing}
              </div>
            </div>

            <!-- Sparkline -->
            ${sparkHourly.length >= 2 ? html`
              <div class="wc-spark-zone">
                <svg class="wc-spark-svg" viewBox="0 0 348 64" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stop-color="${meta.sparkFill}" />
                      <stop offset="100%" stop-color="transparent" />
                    </linearGradient>
                  </defs>
                  ${svg`<path class="wc-spark-area" d="${spark.areaPath}" fill="url(#sparkGrad)" />`}
                  ${svg`<path class="wc-spark-line" d="${spark.linePath}" stroke="${meta.sparkStroke}" />`}
                </svg>
                <div class="wc-spark-now" style="left:0px;">
                  <div class="wc-spark-now-dot" style="top:${(spark.nowY / 64) * 100}%"></div>
                </div>
                <div class="wc-spark-labels">
                  ${sparkHourly.map((h, i) =>
                    html`<span class="wc-spark-lbl">${i % 2 === 0 || i === sparkHourly.length - 1
                      ? (i === 0 ? t('weather.now') : new Date(h.datetime).getHours() + 'h')
                      : ''}</span>`
                  )}
                </div>
              </div>
            ` : nothing}

            <!-- Metrics -->
            ${this._renderMetrics(hidden, humidity, windSpeed, windBearing, pressure, uvIndex, visibility, sunrise, sunset)}

            <!-- Forecast -->
            ${this._renderForecasts(tempUnit)}

          </div>
        </div>
      </div>
    `;
  }

  private _renderMetrics(
    hidden: Set<string>,
    humidity: number | undefined,
    windSpeed: number | undefined,
    windBearing: number | undefined,
    pressure: number | undefined,
    uvIndex: number | undefined,
    visibility: number | undefined,
    sunrise: string,
    sunset: string,
  ): TemplateResult | typeof nothing {
    const metrics: TemplateResult[] = [];

    if (!hidden.has('humidity') && humidity != null) {
      metrics.push(html`<div class="wc-metric humidity">
        <ha-icon icon="mdi:water-percent"></ha-icon>
        <span class="wc-metric-val">${humidity}%</span>
      </div>`);
    }
    if (!hidden.has('wind') && windSpeed != null) {
      metrics.push(html`<div class="wc-metric wind">
        <ha-icon icon="mdi:weather-windy"></ha-icon>
        <span class="wc-metric-val">${Math.round(windSpeed)}</span>
        <span class="wc-metric-unit">km/h</span>
        <span class="wc-metric-dir">${bearingToDir(windBearing)}</span>
      </div>`);
    }
    if (!hidden.has('pressure') && pressure != null) {
      metrics.push(html`<div class="wc-metric pressure">
        <ha-icon icon="mdi:gauge"></ha-icon>
        <span class="wc-metric-val">${Math.round(pressure)}</span>
        <span class="wc-metric-unit">hPa</span>
      </div>`);
    }
    if (!hidden.has('uv') && uvIndex != null) {
      metrics.push(html`<div class="wc-metric uv">
        <ha-icon icon="mdi:sun-wireless"></ha-icon>
        <span class="wc-metric-val">${Math.round(uvIndex)}</span>
        <span class="wc-metric-unit">UV</span>
      </div>`);
    }
    if (!hidden.has('visibility') && visibility != null) {
      metrics.push(html`<div class="wc-metric visibility">
        <ha-icon icon="mdi:eye-outline"></ha-icon>
        <span class="wc-metric-val">${visibility}</span>
        <span class="wc-metric-unit">km</span>
      </div>`);
    }
    if (!hidden.has('sunrise') && sunrise) {
      metrics.push(html`<div class="wc-metric sunrise">
        <ha-icon icon="mdi:weather-sunset-up"></ha-icon>
        <span class="wc-metric-val">${sunrise}</span>
      </div>`);
    }
    if (!hidden.has('sunset') && sunset) {
      metrics.push(html`<div class="wc-metric sunset">
        <ha-icon icon="mdi:weather-sunset-down"></ha-icon>
        <span class="wc-metric-val">${sunset}</span>
      </div>`);
    }

    if (metrics.length === 0) return nothing;

    return html`<div class="wc-metrics">
      ${metrics}
    </div>`;
  }

  private _renderForecasts(tempUnit: string): TemplateResult | typeof nothing {
    const showDaily = this._weatherConfig.show_daily;
    const showHourly = this._weatherConfig.show_hourly;
    if (!showDaily && !showHourly) return nothing;

    return html`
      <div class="wc-forecast-zone">
        <div class="wc-fc-tabs">
          ${showDaily ? html`<button class="wc-fc-tab ${this._activeTab === 'daily' ? 'active' : ''}"
            @click="${() => this._switchTab('daily')}"
            aria-expanded="${this._activeTab === 'daily' ? 'true' : 'false'}"
            aria-controls="wc-daily-panel"
            aria-label="${t('weather.daily_tab')}">${t('weather.daily_tab')}</button>` : nothing}
          ${showHourly ? html`<button class="wc-fc-tab ${this._activeTab === 'hourly' ? 'active' : ''}"
            @click="${() => this._switchTab('hourly')}"
            aria-expanded="${this._activeTab === 'hourly' ? 'true' : 'false'}"
            aria-controls="wc-hourly-panel"
            aria-label="${t('weather.hourly_tab')}">${t('weather.hourly_tab')}</button>` : nothing}
        </div>

        <div class="wc-fold-sep ${(this._activeTab === 'daily' && this._forecastDaily.length > 0) || (this._activeTab === 'hourly' && this._forecastHourly.length > 0) ? 'visible' : ''}"></div>

        ${showDaily ? html`
          <div class="fold ${this._activeTab === 'daily' ? 'open' : ''}" id="wc-daily-panel" role="region">
            <div class="fold-inner">
              <div class="wc-daily-list">
                ${this._forecastDaily.slice(0, 7).map((d, i) => {
                  const dc = this._mapCondition(d.condition);
                  const dm = this._getConditionMeta(dc);
                  const dt = new Date(d.datetime);
                  const label = i === 0 ? t('weather.today') : intlDayShort(dt, this._lang);
                  return html`
                    <div class="wc-day-row">
                      <span class="wc-day-label">${label}</span>
                      <ha-icon .icon="${dm.icon}" class="wc-day-icon ${dc}"></ha-icon>
                      <span class="wc-day-cond">${t(dm.textKey)}</span>
                      <div class="wc-day-temps">
                        <span class="wc-day-hi">${Math.round(d.temperature)}&deg;</span>
                        ${d.templow != null ? html`<span class="wc-day-lo">${Math.round(d.templow)}&deg;</span>` : nothing}
                      </div>
                      <span class="wc-day-precip">${d.precipitation_probability != null && d.precipitation_probability > 0 ? d.precipitation_probability + '%' : ''}</span>
                    </div>
                  `;
                })}
              </div>
            </div>
          </div>
        ` : nothing}

        ${showHourly ? html`
          <div class="fold ${this._activeTab === 'hourly' ? 'open' : ''}" id="wc-hourly-panel" role="region">
            <div class="fold-inner">
              <div class="wc-hourly-list">
                ${this._forecastHourly.slice(0, 10).map((h, i) => {
                  const hc = this._mapCondition(h.condition);
                  const hm = this._getConditionMeta(hc);
                  const dt = new Date(h.datetime);
                  const timeLabel = i === 0 ? t('weather.now') : dt.getHours() + 'h';
                  return html`
                    <div class="wc-hour-row ${i === 0 ? 'now' : ''}">
                      <span class="wc-hour-time">${timeLabel}</span>
                      <ha-icon .icon="${hm.icon}" class="wc-hour-icon ${hc}"></ha-icon>
                      <span class="wc-hour-cond">${t(hm.textKey)}</span>
                      <span class="wc-hour-temp">${Math.round(h.temperature)}${tempUnit}</span>
                      <span class="wc-hour-precip">${h.precipitation_probability != null && h.precipitation_probability > 0 ? h.precipitation_probability + '%' : ''}</span>
                    </div>
                  `;
                })}
              </div>
            </div>
          </div>
        ` : nothing}
      </div>
    `;
  }

  private _switchTab(tab: 'daily' | 'hourly'): void {
    this._activeTab = this._activeTab === tab ? null : tab;
  }
}

customElements.define('glass-weather-card', GlassWeatherCard);

