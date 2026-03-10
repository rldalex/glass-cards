import { html, css, nothing, type PropertyValues, type TemplateResult } from 'lit';
import { property, state } from 'lit/decorators.js';
import {
  BaseCard,
  BackendService,
  getAreaEntities,
  isEntityVisibleNow,
  type EntityScheduleMap,
  type HassEntity,
  type LovelaceCardConfig,
} from '@glass-cards/base-card';
import { glassTokens, glassMixin, foldMixin, marqueeMixin, marqueeText, bounceMixin } from '@glass-cards/ui-core';
import { t } from '@glass-cards/i18n';
import './editor';

// — Types & Constants —

type LightType = 'simple' | 'dimmable' | 'color_temp' | 'rgb';

interface LightInfo {
  entity: HassEntity;
  entityId: string;
  name: string;
  isOn: boolean;
  type: LightType;
  brightnessPct: number;
  colorTempKelvin: number | null;
  minKelvin: number;
  maxKelvin: number;
  rgbColor: [number, number, number] | null;
}

type LayoutItem =
  | { kind: 'full'; light: LightInfo }
  | { kind: 'compact-pair'; left: LightInfo; right: LightInfo | null };

const TEMP_RANGES: [number, 'light.temp_warm' | 'light.temp_neutral' | 'light.temp_cold', string][] = [
  [3000, 'light.temp_warm', '#ffd4a3'],
  [4000, 'light.temp_warm', '#ffedb3'],
  [4800, 'light.temp_neutral', '#fff5e6'],
  [9999, 'light.temp_cold', '#e0ecf5'],
];

// — Helpers —

function detectLightType(entity: HassEntity): LightType {
  const modes = entity.attributes.supported_color_modes as string[] | undefined;
  if (!modes || modes.length === 0) {
    return entity.attributes.brightness !== undefined ? 'dimmable' : 'simple';
  }
  if (modes.some((m) => ['hs', 'rgb', 'rgbw', 'rgbww', 'xy'].includes(m))) return 'rgb';
  if (modes.includes('color_temp')) return 'color_temp';
  if (modes.includes('brightness')) return 'dimmable';
  return 'simple';
}

function getTempInfo(kelvin: number): { label: string; color: string } {
  for (const [max, key, color] of TEMP_RANGES) {
    if (kelvin < max) return { label: t(key), color };
  }
  return { label: t('light.temp_cold'), color: '#e0ecf5' };
}

function rgbToHex(rgb: [number, number, number]): string {
  return '#' + rgb.map((c) => c.toString(16).padStart(2, '0')).join('');
}

function rgbToRgba(rgb: [number, number, number], alpha: number): string {
  return `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${alpha})`;
}

/**
 * Convert HS (hue 0-360, saturation 0-1) to RGB.
 * Uses HSV model with V=1 so center=white, edge=pure color.
 * This matches what HA lights expect via hs_color.
 */
function hsToRgb(h: number, s: number): [number, number, number] {
  const c = s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  let r = 0, g = 0, b = 0;
  if (h < 60) { r = c; g = x; }
  else if (h < 120) { r = x; g = c; }
  else if (h < 180) { g = c; b = x; }
  else if (h < 240) { g = x; b = c; }
  else if (h < 300) { r = x; b = c; }
  else { r = c; b = x; }
  const m = 1 - c;
  return [Math.round((r + m) * 255), Math.round((g + m) * 255), Math.round((b + m) * 255)];
}

const COLOR_DOTS: [number, number, number][] = [
  [251, 191, 36],
  [248, 113, 113],
  [244, 114, 182],
  [167, 139, 250],
  [129, 140, 248],
  [96, 165, 250],
  [74, 222, 128],
  [240, 240, 240],
];

/** Compare two colors by HS (hue ±5°, sat ±0.08) — tolerant to HA normalization. */
function hsClose(a: [number, number, number], b: [number, number, number]): boolean {
  const ha = rgbToHs(a), hb = rgbToHs(b);
  const hueDiff = Math.abs(ha.h - hb.h);
  const hueOk = hueDiff < 5 || hueDiff > 355; // wrap-around at 360
  return hueOk && Math.abs(ha.s - hb.s) < 0.08;
}

function rgbToHs(rgb: [number, number, number]): { h: number; s: number } {
  const r = rgb[0] / 255, g = rgb[1] / 255, b = rgb[2] / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const d = max - min;
  let h = 0;
  if (d !== 0) {
    if (max === r) h = ((g - b) / d + 6) % 6 * 60;
    else if (max === g) h = ((b - r) / d + 2) * 60;
    else h = ((r - g) / d + 4) * 60;
  }
  // HSV saturation: S = (max - min) / max
  const s = max === 0 ? 0 : d / max;
  return { h, s };
}

function rgbToWheelPos(rgb: [number, number, number]): { x: number; y: number } {
  const { h, s } = rgbToHs(rgb);
  const dist = Math.min(s, 1);
  const rad = (h * Math.PI) / 180;
  return { x: Math.cos(rad) * dist * 50 + 50, y: Math.sin(rad) * dist * 50 + 50 };
}

const ALLOWED_EFFECTS = ['off', 'candle', 'fire'] as const;

// — Component —

export class GlassLightCard extends BaseCard {
  static getConfigElement() {
    return document.createElement('glass-light-card-editor');
  }

  @property({ attribute: false }) areaId?: string;
  @property({ attribute: false }) visibleAreaIds?: string[];
  @state() private _expandedEntity: string | null = null;
  @state() private _dragValues = new Map<string, number>();
  @state() private _colorPickerEntity: string | null = null;
  @state() private _colorPickerRgb: [number, number, number] | null = null;
  @state() private _colorPickerPos: { x: number; y: number } | null = null;
  private _colorPickerHs: { h: number; s: number } | null = null;
  @state() private _showHeader = true;
  private _lightConfigLoaded = false;
  private _throttleTimers = new Map<string, ReturnType<typeof setTimeout>>();
  private _roomConfig: {
    hidden_entities: string[];
    entity_order: string[];
    entity_layouts: Record<string, string>;
  } | null = null;
  private _roomConfigLoaded = false;
  private _lastLoadedAreaId?: string;
  private _backend?: BackendService;
  private _cachedLights?: HassEntity[];
  private _cachedLightsHassRef?: Record<string, HassEntity>;
  private _schedules: EntityScheduleMap | null = null;
  private _schedulesLoaded = false;

  private get _isDashboardMode(): boolean {
    const area = this.areaId || (this._config?.area as string | undefined);
    return !area && !this._config?.entity;
  }

  static styles = [
    glassTokens,
    glassMixin,
    foldMixin,
    marqueeMixin,
    bounceMixin,
    css`
      :host {
        display: block;
        width: 100%;
        max-width: 500px;
        margin: 0 auto;
        font-family: 'Plus Jakarta Sans', sans-serif;
      }

      /* ── Card Header ── */
      .card-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 6px;
        padding: 0 6px;
      }
      .card-header-left {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .card-title {
        font-size: 9px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 1.5px;
        color: var(--t4);
      }
      .card-count {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-width: 18px;
        height: 18px;
        padding: 0 5px;
        border-radius: var(--radius-full);
        font-size: 10px;
        font-weight: 600;
        transition: all var(--t-med);
      }
      .card-count.none {
        background: var(--s2);
        color: var(--t3);
      }
      .card-count.some {
        background: rgba(251, 191, 36, 0.15);
        color: var(--c-light-glow);
      }
      .card-count.all {
        background: rgba(251, 191, 36, 0.2);
        color: var(--c-light-glow);
      }

      /* ── Toggle All ── */
      .toggle-all {
        position: relative;
        width: 40px;
        height: 22px;
        border-radius: 11px;
        background: var(--s2);
        border: 1px solid var(--b2);
        cursor: pointer;
        transition: all var(--t-fast);
        padding: 0;
        outline: none;
        font-family: inherit;
        -webkit-tap-highlight-color: transparent;
      }
      .toggle-all::after {
        content: '';
        position: absolute;
        top: 3px;
        left: 3px;
        width: 14px;
        height: 14px;
        border-radius: 50%;
        background: var(--t3);
        transition:
          transform var(--t-fast),
          background var(--t-fast),
          box-shadow var(--t-fast);
      }
      .toggle-all.on {
        background: rgba(251, 191, 36, 0.2);
        border-color: rgba(251, 191, 36, 0.3);
      }
      .toggle-all.on::after {
        transform: translateX(18px);
        background: var(--c-light-glow);
        box-shadow: 0 0 8px rgba(251, 191, 36, 0.4);
      }

      /* ── Card Body ── */
      .card {
        position: relative;
        padding: 14px;
      }
      .card-inner {
        position: relative;
        z-index: 1;
      }

      /* ── Tint (dynamic) ── */
      .tint {
        transition:
          opacity var(--t-slow),
          background var(--t-slow);
      }

      /* ── Lights Grid ── */
      .lights-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 0;
      }

      /* ── Light Row ── */
      .light-row {
        display: flex;
        align-items: center;
        gap: 10px;
        grid-column: 1 / -1;
        padding: 8px 4px;
        position: relative;
        transition: background var(--t-fast);
        border-radius: var(--radius-md);
      }
      @media (hover: hover) and (pointer: fine) {
        .light-row:hover {
          background: var(--s1);
        }
      }
      @media (hover: none) {
        .light-row:active { animation: bounce 0.3s ease; }
      }
      .light-row.compact {
        grid-column: span 1;
        min-width: 0;
        overflow: hidden;
      }
      .light-row.compact-right {
        padding-left: 10px;
      }
      .light-row.compact-right::before {
        content: '';
        position: absolute;
        left: 0;
        top: 20%;
        bottom: 20%;
        width: 1px;
        background: linear-gradient(
          to bottom,
          transparent,
          rgba(255, 255, 255, 0.08) 30%,
          rgba(255, 255, 255, 0.08) 70%,
          transparent
        );
      }

      /* ── Icon Button ── */
      .light-icon-btn {
        width: 36px;
        height: 36px;
        border-radius: var(--radius-md);
        background: var(--s2);
        border: 1px solid var(--b1);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        cursor: pointer;
        padding: 0;
        outline: none;
        font-family: inherit;
        color: var(--t3);
        transition:
          color var(--t-fast),
          background var(--t-fast),
          border-color var(--t-fast),
          filter var(--t-fast);
        -webkit-tap-highlight-color: transparent;
      }
      .light-icon-btn ha-icon {
        --mdc-icon-size: 18px;
        display: flex; align-items: center; justify-content: center;
      }
      .light-icon-btn.on {
        background: rgba(251, 191, 36, 0.1);
        border-color: rgba(251, 191, 36, 0.15);
        color: var(--c-light-glow);
        filter: drop-shadow(0 0 6px rgba(251, 191, 36, 0.4));
      }
      .light-icon-btn.on.rgb {
        background: var(--light-rgb-bg);
        border-color: var(--light-rgb-border);
        color: var(--light-rgb);
        filter: drop-shadow(0 0 6px var(--light-rgb-glow));
      }

      /* ── Expand Button ── */
      .light-expand-btn {
        flex: 1;
        min-width: 0;
        display: flex;
        align-items: center;
        gap: 10px;
        background: transparent;
        border: none;
        padding: 0;
        font-family: inherit;
        outline: none;
        text-align: left;
        color: inherit;
        cursor: pointer;
      }

      /* ── Light Info ── */
      .light-info {
        flex: 1;
        min-width: 0;
      }
      .light-name {
        font-size: 13px;
        font-weight: 600;
        color: var(--t1);
        line-height: 1.2;
        white-space: nowrap;
        overflow: hidden;
      }
      .light-sub {
        display: flex;
        align-items: center;
        gap: 5px;
        margin-top: 2px;
      }
      .light-brightness-text {
        font-size: 10px;
        font-weight: 500;
        color: var(--t3);
        transition: color var(--t-med);
      }
      .light-row[data-on='true'] .light-brightness-text {
        color: rgba(251, 191, 36, 0.55);
      }
      .light-row[data-on='true'][data-rgb] .light-brightness-text {
        color: var(--light-rgb-sub, rgba(251, 191, 36, 0.55));
      }
      .light-temp-dot {
        width: 4px;
        height: 4px;
        border-radius: 50%;
        transition: background var(--t-med);
      }
      .light-temp-text {
        font-size: 10px;
        font-weight: 400;
        color: var(--t4);
      }

      /* ── Status Dot ── */
      .light-dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        flex-shrink: 0;
        background: var(--t4);
        transition: all var(--t-med);
      }
      .light-row[data-on='true'] .light-dot {
        background: var(--c-light-glow);
        box-shadow: 0 0 8px rgba(251, 191, 36, 0.5);
      }
      .light-row[data-on='true'][data-rgb] .light-dot {
        background: var(--light-rgb);
        box-shadow: 0 0 8px var(--light-rgb-glow);
      }

      /* ── Control Fold ── */
      .ctrl-fold {
        display: grid;
        grid-template-rows: 0fr;
        transition: grid-template-rows var(--t-layout);
        grid-column: 1 / -1;
      }
      .ctrl-fold.open {
        grid-template-rows: 1fr;
      }
      .ctrl-fold-inner {
        overflow: hidden;
        opacity: 0;
        transition: opacity 0.25s var(--ease-std);
      }
      .ctrl-fold.open .ctrl-fold-inner {
        opacity: 1;
      }
      .fold-sep {
        height: 1px;
        margin: 0 12px;
        background: linear-gradient(90deg, transparent, var(--fold-color, rgba(251,191,36,0.25)), transparent);
        opacity: 0;
        transition: opacity 0.25s var(--ease-std);
        grid-column: 1 / -1;
      }
      .fold-sep.visible { opacity: 1; }
      .ctrl-panel {
        padding: 6px 0 4px;
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      .ctrl-label {
        font-size: 10px;
        font-weight: 600;
        letter-spacing: 0.5px;
        color: rgba(251, 191, 36, 0.6);
      }
      .ctrl-panel[data-rgb] .ctrl-label {
        color: var(--light-rgb-sub, rgba(251, 191, 36, 0.6));
      }

      /* ── Slider ── */
      .slider {
        position: relative;
        width: 100%;
        height: 36px;
        border-radius: var(--radius-lg);
        background: var(--s1);
        border: 1px solid var(--b1);
        overflow: visible;
      }
      .slider-fill {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        border-radius: inherit;
        pointer-events: none;
        overflow: hidden;
      }
      .slider-fill.warm {
        background: linear-gradient(90deg, rgba(251, 191, 36, 0.15), rgba(251, 191, 36, 0.3));
      }
      .slider-fill.dynamic {
        background: linear-gradient(
          90deg,
          var(--slider-fill-start, rgba(251, 191, 36, 0.15)),
          var(--slider-fill-end, rgba(251, 191, 36, 0.3))
        );
      }
      .slider-fill.temp-gradient {
        width: 100% !important;
        background: linear-gradient(
          90deg,
          rgba(255, 179, 71, 0.2) 0%,
          rgba(255, 245, 230, 0.15) 50%,
          rgba(135, 206, 235, 0.2) 100%
        );
        opacity: 0.7;
      }
      .slider-thumb {
        position: absolute;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 8px;
        height: 20px;
        border-radius: 4px;
        background: rgba(255, 255, 255, 0.7);
        box-shadow: 0 0 8px rgba(255, 255, 255, 0.2);
        pointer-events: none;
      }
      .slider-lbl {
        position: absolute;
        top: 50%;
        left: 12px;
        transform: translateY(-50%);
        font-size: 11px;
        font-weight: 600;
        color: var(--t2);
        pointer-events: none;
        display: flex;
        align-items: center;
        gap: 6px;
      }
      .slider-lbl ha-icon {
        --mdc-icon-size: 16px;
        opacity: 0.6;
        display: flex; align-items: center; justify-content: center;
      }
      .slider-val {
        position: absolute;
        top: 50%;
        right: 12px;
        transform: translateY(-50%);
        font-size: 11px;
        font-weight: 600;
        color: var(--t3);
        pointer-events: none;
      }
      .slider-native {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        cursor: pointer;
        margin: 0;
        padding: 0;
        -webkit-appearance: none;
        appearance: none;
      }

      /* ── Color Controls ── */
      .color-row {
        display: flex;
        gap: 8px;
        align-items: center;
        padding: 2px 0;
      }
      .cdot {
        width: 26px;
        height: 26px;
        border-radius: 50%;
        border: 2px solid transparent;
        cursor: pointer;
        transition: all var(--t-fast);
        padding: 0;
        outline: none;
        background: none;
        position: relative;
        -webkit-tap-highlight-color: transparent;
      }
      .cdot::before {
        content: '';
        position: absolute;
        inset: 2px;
        border-radius: 50%;
        background: var(--cdot-color);
      }
      @media (hover: hover) and (pointer: fine) {
        .cdot:hover { transform: scale(1.15); }
        .cdot:active { transform: scale(1.1); }
      }
      @media (hover: none) {
        .cdot:active { animation: bounce 0.3s ease; }
      }
      .cdot.active { border-color: rgba(255, 255, 255, 0.6); }
      .color-picker-btn {
        width: 26px;
        height: 26px;
        border-radius: 50%;
        border: 2px solid transparent;
        cursor: pointer;
        padding: 0;
        outline: none;
        background: none;
        -webkit-tap-highlight-color: transparent;
        transition: all var(--t-fast);
        flex-shrink: 0;
        position: relative;
      }
      .color-picker-btn::before {
        content: '';
        position: absolute;
        inset: 2px;
        border-radius: 50%;
        background: conic-gradient(
          hsl(0,80%,60%), hsl(60,80%,55%), hsl(120,70%,50%),
          hsl(180,75%,50%), hsl(240,75%,60%), hsl(300,75%,55%), hsl(360,80%,60%)
        );
      }
      @media (hover: hover) and (pointer: fine) {
        .color-picker-btn:hover { transform: scale(1.15); }
      }
      @media (hover: none) {
        .color-picker-btn:active { animation: bounce 0.3s ease; }
      }

      /* ── Color Picker Popup ── */
      .color-picker-overlay {
        position: fixed;
        inset: 0;
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(0, 0, 0, 0.4);
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
        animation: cpFadeIn 0.2s ease;
      }
      @keyframes cpFadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      .color-picker-dialog {
        background: linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 50%, rgba(255,255,255,0.06) 100%);
        backdrop-filter: blur(40px) saturate(1.4);
        -webkit-backdrop-filter: blur(40px) saturate(1.4);
        border: 1px solid var(--b2);
        border-radius: var(--radius-xl);
        padding: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 16px;
        box-shadow: inset 0 1px 0 0 rgba(255,255,255,0.1), 0 8px 32px rgba(0,0,0,0.4), 0 2px 8px rgba(0,0,0,0.15);
        max-width: 300px;
        width: 90vw;
      }
      .color-picker-dialog .cp-title {
        font-size: 11px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 1px;
        color: var(--t3);
      }
      .cp-wheel-wrap {
        position: relative;
        width: 220px;
        height: 220px;
      }
      .cp-wheel-wrap canvas {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        cursor: crosshair;
      }
      .cp-cursor {
        position: absolute;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 0 6px rgba(0,0,0,0.6), 0 0 0 1px rgba(0,0,0,0.2);
        pointer-events: none;
        transform: translate(-50%, calc(-50% - 28px));
        transition: left 0.05s, top 0.05s;
      }
      .cp-cursor::after {
        content: '';
        position: absolute;
        bottom: -8px;
        left: 50%;
        transform: translateX(-50%);
        width: 2px;
        height: 10px;
        background: rgba(255,255,255,0.5);
        border-radius: 1px;
      }
      .cp-preview {
        width: 100%;
        height: 36px;
        border-radius: var(--radius-md);
        border: 1px solid var(--b2);
      }
      .cp-hex {
        font-size: 12px; font-weight: 600; color: var(--t2);
        font-family: monospace; letter-spacing: 0.5px;
      }
      .cp-close {
        font-family: inherit;
        font-size: 12px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.8px;
        color: var(--t2);
        background: var(--s2);
        border: 1px solid var(--b2);
        border-radius: var(--radius-md);
        padding: 8px 24px;
        cursor: pointer;
        outline: none;
        -webkit-tap-highlight-color: transparent;
      }

      /* Focus-visible ring */
      .toggle-all:focus-visible,
      .light-icon-btn:focus-visible,
      .light-expand-btn:focus-visible,
      .cdot:focus-visible,
      .color-picker-btn:focus-visible {
        outline: 2px solid var(--c-accent);
        outline-offset: 2px;
      }

      /* ── Dashboard Mode ── */
      .dashboard-row {
        display: contents;
        animation: dashRowIn 0.4s var(--ease-std) both;
      }
      .dashboard-row:nth-child(1) { animation-delay: 0ms; }
      .dashboard-row:nth-child(2) { animation-delay: 50ms; }
      .dashboard-row:nth-child(3) { animation-delay: 100ms; }
      @keyframes dashRowIn {
        from { opacity: 0; transform: translateY(8px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .dashboard-overflow {
        font-size: 10px;
        font-weight: 500;
        color: var(--t3);
        text-align: center;
        padding: 6px 0 2px;
        letter-spacing: 0.3px;
        grid-column: 1 / -1;
      }
    `,
  ];

  setConfig(config: LovelaceCardConfig) {
    super.setConfig(config);
  }

  getCardSize() {
    if (this._isDashboardMode) {
      const count = this._getLights().length;
      return count === 0 ? 1 : Math.min(count, 6) + 1;
    }
    return 3;
  }

  protected _collapseExpanded(): void {
    if (this._expandedEntity !== null) this._expandedEntity = null;
    if (this._colorPickerEntity !== null) { this._colorPickerEntity = null; this._colorPickerPos = null; }
  }

  connectedCallback() {
    super.connectedCallback();
    this._listen('room-config-changed', (payload) => {
      const area = this.areaId || (this._config?.area as string | undefined);
      if (area && payload.areaId === area) {
        this._roomConfigLoaded = false;
        this._cachedLights = undefined;
        this._loadRoomConfig();
      }
    });
    this._listen('schedule-changed', () => {
      this._schedulesLoaded = false;
      this._cachedLights = undefined;
      this._loadSchedules();
    });
    this._listen('light-config-changed', () => {
      this._lightConfigLoaded = false;
      this._loadLightConfig();
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._cancelWheelDrag?.();
    this._cancelWheelDrag = undefined;
    this._wheelCanvas = null;
    this._throttleTimers.forEach((t) => clearTimeout(t));
    this._throttleTimers.clear();
    this._backend = undefined;
    this._schedulesLoaded = false;
    this._lightConfigLoaded = false;
    this._roomConfigLoaded = false;
  }

  private async _loadRoomConfig() {
    const area = this.areaId || (this._config?.area as string | undefined);
    if (!area || !this.hass || this._roomConfigLoaded) return;
    this._roomConfigLoaded = true;
    this._lastLoadedAreaId = area;
    try {
      if (!this._backend) this._backend = new BackendService(this.hass);
      const result = await this._backend.send<{
        hidden_entities: string[];
        entity_order: string[];
        entity_layouts: Record<string, string>;
      } | null>('get_room', { area_id: area });
      const currentArea = this.areaId || (this._config?.area as string | undefined);
      if (currentArea !== area) return;
      this._roomConfig = result;
      this._cachedLights = undefined;
      this.requestUpdate();
    } catch {
      // Backend not available
    }
  }

  private async _loadSchedules() {
    if (!this.hass || this._schedulesLoaded) return;
    this._schedulesLoaded = true;
    try {
      if (!this._backend) this._backend = new BackendService(this.hass);
      const result = await this._backend.send<EntityScheduleMap>('get_schedules');
      this._schedules = result;
      this._cachedLights = undefined;
      this.requestUpdate();
    } catch {
      this._schedulesLoaded = false;
    }
  }

  private async _loadLightConfig() {
    if (!this.hass || this._lightConfigLoaded) return;
    this._lightConfigLoaded = true;
    try {
      if (!this._backend) this._backend = new BackendService(this.hass);
      const result = await this._backend.send<{
        light_card: { show_header: boolean };
      }>('get_config');
      if (result?.light_card) {
        this._showHeader = result.light_card.show_header ?? true;
      }
    } catch {
      // Backend not available
    }
  }

  private _resetForNewArea() {
    this._roomConfig = null;
    this._roomConfigLoaded = false;
    this._expandedEntity = null;
    this._dragValues = new Map();
    this._cachedLights = undefined;
    this._throttleTimers.forEach((t) => clearTimeout(t));
    this._throttleTimers.clear();
  }

  protected getTrackedEntityIds(): string[] {
    if (this._isDashboardMode && this.hass && this.visibleAreaIds?.length && this.hass.entities && this.hass.devices) {
      const ids: string[] = [];
      for (const aId of this.visibleAreaIds) {
        for (const e of getAreaEntities(aId, this.hass.entities, this.hass.devices)) {
          if (e.entity_id.startsWith('light.')) ids.push(e.entity_id);
        }
      }
      return ids;
    }
    return this._getLights().map((e) => e.entity_id);
  }

  updated(changedProps: PropertyValues) {
    super.updated(changedProps);

    // Invalidate backend on WS reconnect
    if (changedProps.has('hass') && this.hass && this._backend && this._backend.connection !== this.hass.connection) {
      this._backend = undefined;
      this._roomConfigLoaded = false;
      this._schedulesLoaded = false;
      this._lightConfigLoaded = false;
    }

    // Load schedules
    if (this.hass && !this._schedulesLoaded) {
      this._loadSchedules();
    }

    // Load light card config
    if (this.hass && !this._lightConfigLoaded) {
      this._loadLightConfig();
    }

    // Load room config from backend when areaId is available or changes
    const area = this.areaId || (this._config?.area as string | undefined);
    if (area && this.hass) {
      if (this._lastLoadedAreaId !== area) {
        this._resetForNewArea();
      }
      if (!this._roomConfigLoaded) {
        this._loadRoomConfig();
      }
    }

    // Invalidate lights cache when hass changes
    if (changedProps.has('hass')) {
      this._cachedLights = undefined;
    }

    const lights = this._getLightInfos();
    const anyOn = lights.some((l) => l.isOn);
    if (anyOn) {
      this.setAttribute('lights-on', '');
    } else {
      this.removeAttribute('lights-on');
    }

    // Clear stale drag values once HA state catches up
    if (changedProps.has('hass') && this._dragValues.size > 0) {
      let changed = false;
      const next = new Map(this._dragValues);
      for (const info of lights) {
        const briKey = `bri:${info.entityId}`;
        const briDrag = next.get(briKey);
        if (briDrag !== undefined && Math.abs(info.brightnessPct - briDrag) <= 2) {
          next.delete(briKey);
          changed = true;
        }
        const tempKey = `temp:${info.entityId}`;
        const tempDrag = next.get(tempKey);
        if (
          tempDrag !== undefined &&
          info.colorTempKelvin !== null &&
          Math.abs(info.colorTempKelvin - tempDrag) <= 50
        ) {
          next.delete(tempKey);
          changed = true;
        }
      }
      if (changed) this._dragValues = next;
    }

    // Draw color wheel canvas when picker opens
    if (this._colorPickerEntity) {
      const canvas = this.renderRoot.querySelector('.cp-wheel-wrap canvas') as HTMLCanvasElement | null;
      if (canvas && !canvas.dataset.drawn) {
        this._drawColorWheel(canvas);
        canvas.dataset.drawn = '1';
      }
    }
  }

  // — Data —

  private _getLights(): HassEntity[] {
    if (!this.hass) return [];
    // Return cached result if hass.states reference hasn't changed
    if (this._cachedLights && this._cachedLightsHassRef === this.hass.states) {
      return this._cachedLights;
    }
    this._cachedLightsHassRef = this.hass.states;
    const result = this._computeLights();
    this._cachedLights = result;
    return result;
  }

  private _computeLights(): HassEntity[] {
    if (!this.hass) return [];
    const area = this.areaId || (this._config?.area as string | undefined);
    if (area) {
      // Merge hidden_entities from Lovelace config and backend room config
      const configHidden = (this._config?.hidden_entities as string[] | undefined) ?? [];
      const backendHidden = this._roomConfig?.hidden_entities ?? [];
      const hiddenSet = new Set<string>([...configHidden, ...backendHidden]);

      const lights = getAreaEntities(area, this.hass.entities, this.hass.devices)
        .filter((e) => e.entity_id.startsWith('light.') && !hiddenSet.has(e.entity_id) && isEntityVisibleNow(e.entity_id, this._schedules))
        .map((e) => this.hass?.states[e.entity_id])
        .filter((s): s is HassEntity => s !== undefined);

      // Apply custom order: Lovelace config takes priority, then backend
      const configOrder = (this._config?.entity_order as string[] | undefined) ?? [];
      const order = configOrder.length > 0 ? configOrder : (this._roomConfig?.entity_order ?? []);
      if (order.length > 0) {
        const orderMap = new Map<string, number>();
        order.forEach((id, i) => orderMap.set(id, i));
        lights.sort((a, b) => {
          const aIdx = orderMap.get(a.entity_id);
          const bIdx = orderMap.get(b.entity_id);
          if (aIdx !== undefined && bIdx !== undefined) return aIdx - bIdx;
          if (aIdx !== undefined) return -1;
          if (bIdx !== undefined) return 1;
          return 0;
        });
      }
      return lights;
    }
    if (this._config?.entity) {
      if (!isEntityVisibleNow(this._config.entity, this._schedules)) return [];
      const entity = this.hass.states[this._config.entity];
      return entity ? [entity] : [];
    }
    // Dashboard mode: ON lights from navbar-visible areas, sorted by name
    if (this._isDashboardMode) {
      const areas = this.visibleAreaIds;
      if (!areas || areas.length === 0 || !this.hass.entities || !this.hass.devices) return [];
      const areaEntityIds = new Set<string>();
      for (const aId of areas) {
        for (const e of getAreaEntities(aId, this.hass.entities, this.hass.devices)) {
          if (e.entity_id.startsWith('light.')) areaEntityIds.add(e.entity_id);
        }
      }
      return Object.values(this.hass.states)
        .filter((e) => areaEntityIds.has(e.entity_id) && e.state === 'on' && isEntityVisibleNow(e.entity_id, this._schedules))
        .sort((a, b) => {
          const nameA = (a.attributes.friendly_name as string) || a.entity_id;
          const nameB = (b.attributes.friendly_name as string) || b.entity_id;
          return nameA.localeCompare(nameB);
        });
    }
    return [];
  }

  /** Total number of lights across visible areas (on + off) — dashboard mode only. */
  private _dashboardTotalCache?: number;
  private _dashboardTotalEntitiesRef?: unknown;

  private _getDashboardLightTotal(): number {
    if (!this.hass || !this.hass.entities || !this.hass.devices) return 0;
    if (this._dashboardTotalCache !== undefined && this._dashboardTotalEntitiesRef === this.hass.entities) {
      return this._dashboardTotalCache;
    }
    const areas = this.visibleAreaIds;
    if (!areas || areas.length === 0) return 0;
    const ids = new Set<string>();
    for (const aId of areas) {
      for (const e of getAreaEntities(aId, this.hass.entities, this.hass.devices)) {
        if (e.entity_id.startsWith('light.')) ids.add(e.entity_id);
      }
    }
    this._dashboardTotalEntitiesRef = this.hass.entities;
    this._dashboardTotalCache = ids.size;
    return ids.size;
  }

  private _getLightInfos(): LightInfo[] {
    return this._getLights().map((entity) => this._buildLightInfo(entity));
  }

  private _buildLightInfo(entity: HassEntity): LightInfo {
    const isOn = entity.state === 'on';
    const type = detectLightType(entity);
    const brightness = entity.attributes.brightness as number | undefined;
    const brightnessPct =
      isOn && brightness !== undefined ? Math.round((brightness / 255) * 100) : 0;

    let colorTempKelvin: number | null = null;
    const minKelvin = (entity.attributes.min_color_temp_kelvin as number) || 2000;
    const maxKelvin = (entity.attributes.max_color_temp_kelvin as number) || 6500;
    if (isOn && type === 'color_temp') {
      colorTempKelvin = (entity.attributes.color_temp_kelvin as number) || null;
    }

    let rgbColor: [number, number, number] | null = null;
    if (isOn && type === 'rgb') {
      rgbColor = (entity.attributes.rgb_color as [number, number, number]) || null;
    }

    return {
      entity,
      entityId: entity.entity_id,
      name: (entity.attributes.friendly_name as string) || entity.entity_id,
      isOn,
      type,
      brightnessPct,
      colorTempKelvin,
      minKelvin,
      maxKelvin,
      rgbColor,
    };
  }

  // — Actions —

  private _toggleLight(entityId: string) {
    this.hass?.callService('light', 'toggle', {}, { entity_id: entityId });
  }

  private _toggleAll() {
    const lights = this._getLights();
    const anyOn = lights.some((l) => l.state === 'on');
    const service = anyOn ? 'turn_off' : 'turn_on';
    const ids = lights.map((l) => l.entity_id);
    this.hass?.callService('light', service, {}, { entity_id: ids });
    if (anyOn) {
      this._expandedEntity = null;
    }
  }

  private _turnAllOff() {
    const lights = this._getLights();
    const ids = lights.map((l) => l.entity_id);
    this.hass?.callService('light', 'turn_off', {}, { entity_id: ids });
    this._expandedEntity = null;
  }

  private _toggleExpand(entityId: string, isOn: boolean) {
    if (!isOn) return;
    if (this._expandedEntity === entityId) {
      this._expandedEntity = null;
    } else {
      this._expandedEntity = entityId;
    }
  }

  private _onSliderInput(key: string, value: number, send: (v: number) => void) {
    const next = new Map(this._dragValues);
    next.set(key, value);
    this._dragValues = next;

    // Trailing throttle: always send the latest value at end of window
    const existing = this._throttleTimers.get(key);
    if (existing !== undefined) clearTimeout(existing);
    this._throttleTimers.set(
      key,
      setTimeout(() => {
        this._throttleTimers.delete(key);
        send(this._dragValues.get(key) ?? value);
      }, 100),
    );
  }

  private _onSliderChange(key: string, value: number, send: (v: number) => void) {
    // Persist the exact committed value so stale-clear logic compares correctly
    const next = new Map(this._dragValues);
    next.set(key, value);
    this._dragValues = next;
    send(value);
    const timer = this._throttleTimers.get(key);
    if (timer !== undefined) clearTimeout(timer);
    this._throttleTimers.delete(key);
  }

  private _setBrightness(entityId: string, value: number) {
    this.hass?.callService('light', 'turn_on', { brightness_pct: value }, { entity_id: entityId });
  }

  private _setColorTemp(entityId: string, kelvin: number) {
    this.hass?.callService(
      'light',
      'turn_on',
      { color_temp_kelvin: kelvin },
      { entity_id: entityId },
    );
  }

  private _setHsColor(entityId: string, hue: number, sat: number) {
    this.hass?.callService('light', 'turn_on', { hs_color: [hue, sat * 100] }, { entity_id: entityId });
  }

  private _setEffect(entityId: string, effect: string) {
    if (effect === 'off') {
      this.hass?.callService('light', 'turn_on', {}, { entity_id: entityId });
    } else {
      this.hass?.callService('light', 'turn_on', { effect }, { entity_id: entityId });
    }
  }

  private _openColorPicker(entityId: string, currentRgb: [number, number, number] | null) {
    this._colorPickerEntity = entityId;
    this._colorPickerRgb = currentRgb ?? [255, 255, 255];
    this._colorPickerPos = currentRgb ? rgbToWheelPos(currentRgb) : null;
    this._colorPickerHs = currentRgb ? rgbToHs(currentRgb) : null;
  }

  private _closeColorPicker() {
    this._cancelWheelDrag?.();
    this._cancelWheelDrag = undefined;
    this._wheelCanvas = null;
    this._colorPickerEntity = null;
    this._colorPickerRgb = null;
    this._colorPickerPos = null;
    this._colorPickerHs = null;
  }

  private _wheelCanvas: HTMLCanvasElement | null = null;
  private _cancelWheelDrag?: () => void;

  private _onWheelInteraction(e: MouseEvent | TouchEvent) {
    const canvas = this._wheelCanvas;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const x = clientX - rect.left - rect.width / 2;
    const y = clientY - rect.top - rect.height / 2;
    const radius = rect.width / 2;
    const dist = Math.sqrt(x * x + y * y);
    const clampedDist = Math.min(dist, radius);

    // Canvas arc() uses clockwise angles with 0=right, Y-down
    const angle = Math.atan2(y, x); // radians, canvas coordinate system
    const hue = ((angle * 180 / Math.PI) % 360 + 360) % 360;
    const sat = clampedDist / radius;
    const rgb = hsToRgb(hue, sat);

    const pctX = x / radius * 50 + 50;
    const pctY = y / radius * 50 + 50;
    this._colorPickerPos = { x: pctX, y: pctY };
    this._colorPickerRgb = rgb;
    this._colorPickerHs = { h: hue, s: sat };

    // Throttled live preview — send hs_color to HA
    if (this._colorPickerEntity) {
      const key = `cp:${this._colorPickerEntity}`;
      const existing = this._throttleTimers.get(key);
      if (existing !== undefined) clearTimeout(existing);
      this._throttleTimers.set(
        key,
        setTimeout(() => {
          this._throttleTimers.delete(key);
          if (this._colorPickerEntity && this._colorPickerHs) {
            this._setHsColor(this._colorPickerEntity, this._colorPickerHs.h, this._colorPickerHs.s);
          }
        }, 150),
      );
    }
  }

  private _drawColorWheel(canvas: HTMLCanvasElement) {
    const size = 440; // 2x for retina
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const cx = size / 2, cy = size / 2;
    const r = size / 2;

    // HS wheel (HSV with V=1): white center → pure color at edge
    for (let angle = 0; angle < 360; angle++) {
      const startAngle = ((angle - 1) * Math.PI) / 180;
      const endAngle = ((angle + 1) * Math.PI) / 180;
      const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
      const [cr, cg, cb] = hsToRgb(angle, 1);
      gradient.addColorStop(0, '#ffffff');
      gradient.addColorStop(1, `rgb(${cr},${cg},${cb})`);
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, r, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = gradient;
      ctx.fill();
    }
  }

  // — Layout —

  private _getEntityLayout(entityId: string): 'full' | 'compact' {
    const configLayouts = (this._config?.entity_layouts as Record<string, string> | undefined) ?? {};
    const backendLayouts = this._roomConfig?.entity_layouts ?? {};
    const layout = configLayouts[entityId] || backendLayouts[entityId];
    return (layout as 'full' | 'compact') === 'full' ? 'full' : 'compact';
  }

  private _isCompact(light: LightInfo): boolean {
    return this._getEntityLayout(light.entityId) === 'compact';
  }

  private _buildLayout(lights: LightInfo[]): LayoutItem[] {
    const items: LayoutItem[] = [];
    let i = 0;
    while (i < lights.length) {
      const light = lights[i];
      if (this._isCompact(light)) {
        const next =
          i + 1 < lights.length && this._isCompact(lights[i + 1]) ? lights[i + 1] : null;
        if (next) {
          items.push({ kind: 'compact-pair', left: light, right: next });
          i += 2;
        } else {
          items.push({ kind: 'full', light });
          i++;
        }
      } else {
        items.push({ kind: 'full', light });
        i++;
      }
    }
    return items;
  }

  // — Tint —

  private _computeTint(lights: LightInfo[]): { background: string; opacity: string } | null {
    const onLights = lights.filter((l) => l.isOn);
    if (onLights.length === 0) return null;
    const ratio = onLights.length / lights.length;

    let color = '#fbbf24';
    const rgbLight = onLights.find((l) => l.type === 'rgb' && l.rgbColor);
    if (rgbLight?.rgbColor) color = rgbToHex(rgbLight.rgbColor);

    return {
      background: `radial-gradient(ellipse at 30% 30%, ${color}, transparent 70%)`,
      opacity: (ratio * 0.18).toFixed(3),
    };
  }

  // — Sub text —

  private _renderSubText(info: LightInfo): TemplateResult | TemplateResult[] | typeof nothing {
    if (!info.isOn) {
      return html`<span class="light-brightness-text">${t('common.off')}</span>`;
    }
    if (info.type === 'simple') {
      return html`<span class="light-brightness-text">${t('common.on')}</span>`;
    }

    const parts: TemplateResult[] = [
      html`<span class="light-brightness-text">${info.brightnessPct}%</span>`,
    ];

    if (info.type === 'color_temp' && info.colorTempKelvin) {
      const ti = getTempInfo(info.colorTempKelvin);
      parts.push(html`<span class="light-temp-dot" style="background:${ti.color}"></span>`);
      parts.push(html`<span class="light-temp-text">${ti.label}</span>`);
    }

    if (info.type === 'rgb' && info.rgbColor) {
      const hex = rgbToHex(info.rgbColor);
      parts.push(html`<span class="light-temp-dot" style="background:${hex}"></span>`);
      parts.push(html`<span class="light-temp-text">${t('light.color')}</span>`);
    }

    return parts;
  }

  // — Render: Light Row —

  private _renderLightRow(info: LightInfo, compact: boolean, isRight: boolean): TemplateResult {
    const rowClasses = ['light-row', compact ? 'compact' : '', isRight ? 'compact-right' : '']
      .filter(Boolean)
      .join(' ');

    const rgbStyle =
      info.isOn && info.type === 'rgb' && info.rgbColor
        ? `--light-rgb:${rgbToHex(info.rgbColor)};--light-rgb-bg:${rgbToRgba(info.rgbColor, 0.1)};--light-rgb-border:${rgbToRgba(info.rgbColor, 0.15)};--light-rgb-glow:${rgbToRgba(info.rgbColor, 0.4)};--light-rgb-sub:${rgbToRgba(info.rgbColor, 0.55)}`
        : '';

    const iconClasses = [
      'light-icon-btn',
      info.isOn ? 'on' : '',
      info.isOn && info.rgbColor ? 'rgb' : '',
    ]
      .filter(Boolean)
      .join(' ');

    return html`
      <div
        class=${rowClasses}
        data-on=${info.isOn}
        style=${rgbStyle}
        ?data-rgb=${info.isOn && info.type === 'rgb' && !!info.rgbColor}
      >
        <button
          class=${iconClasses}
          style=${rgbStyle}
          @click=${() => this._toggleLight(info.entityId)}
          aria-label="${t('light.toggle_aria', { name: info.name })}"
        >
          <ha-icon .icon=${'mdi:lightbulb'}></ha-icon>
        </button>
        <button
          class="light-expand-btn"
          @click=${() => this._toggleExpand(info.entityId, info.isOn)}
          aria-label="${info.isOn ? t('light.expand_aria', { name: info.name }) : info.name}"
          aria-expanded=${info.isOn ? (this._expandedEntity === info.entityId ? 'true' : 'false') : nothing}
        >
          <div class="light-info">
            <div class="light-name">${marqueeText(info.name)}</div>
            <div class="light-sub">${this._renderSubText(info)}</div>
          </div>
          <span class="light-dot"></span>
        </button>
      </div>
    `;
  }

  // — Render: Control Fold —

  private _getBrightnessFill(info: LightInfo): { fillClass: string; fillStyle: string } {
    if (info.type === 'rgb' && info.rgbColor) {
      const [r, g, b] = info.rgbColor;
      return {
        fillClass: 'dynamic',
        fillStyle: `--slider-fill-start:rgba(${r},${g},${b},0.15);--slider-fill-end:rgba(${r},${g},${b},0.35)`,
      };
    }
    if (info.type === 'color_temp' && info.colorTempKelvin) {
      const ti = getTempInfo(info.colorTempKelvin);
      const hex = ti.color;
      // Parse hex to rgb for rgba
      const hr = parseInt(hex.slice(1, 3), 16);
      const hg = parseInt(hex.slice(3, 5), 16);
      const hb = parseInt(hex.slice(5, 7), 16);
      return {
        fillClass: 'dynamic',
        fillStyle: `--slider-fill-start:rgba(${hr},${hg},${hb},0.15);--slider-fill-end:rgba(${hr},${hg},${hb},0.35)`,
      };
    }
    return { fillClass: 'warm', fillStyle: '' };
  }

  private _getFoldColor(info: LightInfo): string {
    if (info.rgbColor) return `rgba(${info.rgbColor[0]},${info.rgbColor[1]},${info.rgbColor[2]},0.3)`;
    if (info.type === 'color_temp' && info.colorTempKelvin) {
      const { color } = getTempInfo(info.colorTempKelvin);
      // Parse hex to rgba
      const r = parseInt(color.slice(1, 3), 16);
      const g = parseInt(color.slice(3, 5), 16);
      const b = parseInt(color.slice(5, 7), 16);
      return `rgba(${r},${g},${b},0.3)`;
    }
    return 'rgba(251,191,36,0.25)';
  }

  private _renderControlFold(info: LightInfo): TemplateResult {
    const isExpanded = this._expandedEntity === info.entityId && info.isOn;
    const isRgb = info.type === 'rgb';
    const { fillClass, fillStyle } = this._getBrightnessFill(info);
    const foldColor = this._getFoldColor(info);

    return html`
      <div class="fold-sep ${isExpanded ? 'visible' : ''}" style="--fold-color:${foldColor}"></div>
      <div class="ctrl-fold ${isExpanded ? 'open' : ''}">
        <div class="ctrl-fold-inner">
          <div class="ctrl-panel" ?data-rgb=${isRgb}>
            <span class="ctrl-label">${info.name}</span>

            ${info.type !== 'simple'
              ? this._renderSlider(
                  `bri:${info.entityId}`,
                  fillClass,
                  info.brightnessPct,
                  'mdi:brightness-6',
                  t('light.intensity'),
                  (v) => `${v}%`,
                  1,
                  100,
                  (v) => this._setBrightness(info.entityId, v),
                  fillStyle,
                )
              : nothing}
            ${info.type === 'color_temp' ? this._renderTempSlider(info) : nothing}
            ${info.type === 'rgb' ? this._renderColorRow(info) : nothing}
            ${this._renderEffectChips(info)}
          </div>
        </div>
      </div>
      <div class="fold-sep ${isExpanded ? 'visible' : ''}" style="--fold-color:${foldColor}"></div>
    `;
  }

  // — Render: Color Row —

  private _renderColorRow(info: LightInfo): TemplateResult {
    return html`
      <div class="color-row">
        ${COLOR_DOTS.map((rgb) => {
          const isActive = info.rgbColor ? hsClose(info.rgbColor, rgb) : false;
          return html`
            <button
              class="cdot ${isActive ? 'active' : ''}"
              style="--cdot-color:${rgbToHex(rgb)}"
              @click=${() => { const hs = rgbToHs(rgb); this._setHsColor(info.entityId, hs.h, hs.s); }}
              aria-label="${t('light.color_aria', { hex: rgbToHex(rgb) })}"
            ></button>
          `;
        })}
        <button
          class="color-picker-btn"
          @click=${() => this._openColorPicker(info.entityId, info.rgbColor)}
          aria-label="${t('light.color_picker_aria')}"
        ></button>
      </div>
    `;
  }

  // — Render: Effect Chips —

  private _renderEffectChips(info: LightInfo): TemplateResult | typeof nothing {
    const effects = info.entity.attributes.effect_list as string[] | undefined;
    if (!effects || effects.length === 0) return nothing;
    const available = ALLOWED_EFFECTS.filter((e) => e === 'off' || effects.includes(e));
    if (available.length <= 1) return nothing;
    const currentEffect = (info.entity.attributes.effect as string | undefined)?.toLowerCase();

    return html`
      <div class="color-row" style="flex-wrap:wrap">
        ${available.map(
          (effect) => html`
            <button
              class="cdot effect-chip ${currentEffect === effect || (!currentEffect && effect === 'off') ? 'active' : ''}"
              @click=${() => this._setEffect(info.entityId, effect)}
              aria-label="${t(`light.effect_${effect}`)}"
              style="width:auto;height:auto;border-radius:var(--radius-md);padding:4px 8px;font-size:9px;font-weight:600;letter-spacing:0.5px;text-transform:uppercase;color:var(--t3);border:1px solid var(--b2);background:var(--s1)"
            >${t(`light.effect_${effect}`)}</button>
          `,
        )}
      </div>
    `;
  }

  // — Render: Color Picker Popup —

  private _renderColorPicker(): TemplateResult | typeof nothing {
    if (!this._colorPickerEntity || !this._colorPickerRgb) return nothing;
    const rgb = this._colorPickerRgb;
    const hex = rgbToHex(rgb);

    return html`
      <div class="color-picker-overlay" @click=${(e: Event) => {
        if ((e.target as HTMLElement).classList.contains('color-picker-overlay')) this._closeColorPicker();
      }}>
        <div class="color-picker-dialog">
          <span class="cp-title">${t('light.color_picker_title')}</span>
          <div class="cp-wheel-wrap">
            <canvas
              @mousedown=${(e: MouseEvent) => {
                this._wheelCanvas = e.currentTarget as HTMLCanvasElement;
                this._onWheelInteraction(e);
                const onMove = (me: MouseEvent) => this._onWheelInteraction(me);
                const onUp = () => {
                  cleanup();
                  if (this._colorPickerEntity && this._colorPickerHs) {
                    this._setHsColor(this._colorPickerEntity, this._colorPickerHs.h, this._colorPickerHs.s);
                  }
                };
                const cleanup = () => {
                  window.removeEventListener('mousemove', onMove);
                  window.removeEventListener('mouseup', onUp);
                  this._cancelWheelDrag = undefined;
                };
                window.addEventListener('mousemove', onMove);
                window.addEventListener('mouseup', onUp);
                this._cancelWheelDrag = cleanup;
              }}
              @touchstart=${(e: TouchEvent) => {
                e.preventDefault();
                this._wheelCanvas = e.currentTarget as HTMLCanvasElement;
                this._onWheelInteraction(e);
                const onMove = (te: TouchEvent) => { te.preventDefault(); this._onWheelInteraction(te); };
                const onEnd = () => {
                  cleanup();
                  if (this._colorPickerEntity && this._colorPickerHs) {
                    this._setHsColor(this._colorPickerEntity, this._colorPickerHs.h, this._colorPickerHs.s);
                  }
                };
                const cleanup = () => {
                  window.removeEventListener('touchmove', onMove);
                  window.removeEventListener('touchend', onEnd);
                  window.removeEventListener('touchcancel', onEnd);
                  this._cancelWheelDrag = undefined;
                };
                window.addEventListener('touchmove', onMove, { passive: false });
                window.addEventListener('touchend', onEnd);
                window.addEventListener('touchcancel', onEnd);
                this._cancelWheelDrag = cleanup;
              }}
            ></canvas>
            <div class="cp-cursor" style="left:${this._colorPickerPos?.x ?? 50}%;top:${this._colorPickerPos?.y ?? 50}%;background:${hex}"></div>
          </div>
          <div class="cp-preview" style="background:${hex}"></div>
          <span class="cp-hex">${hex}</span>
          <button class="cp-close" @click=${() => this._closeColorPicker()}>
            ${t('common.close')}
          </button>
        </div>
      </div>
    `;
  }

  // — Render: Slider —

  private _renderSlider(
    sliderKey: string,
    fillClass: string,
    value: number,
    iconName: string,
    label: string,
    valTextFn: (v: number) => string,
    min: number,
    max: number,
    onChange: (v: number) => void,
    fillStyle = '',
  ): TemplateResult {
    const localVal = this._dragValues.get(sliderKey) ?? value;
    const pct = ((localVal - min) / (max - min)) * 100;
    const fillInline = fillStyle ? `width:${pct}%;${fillStyle}` : `width:${pct}%`;

    return html`
      <div class="slider">
        <div class="slider-fill ${fillClass}" style=${fillInline}></div>
        <div class="slider-thumb" style="left:${pct}%"></div>
        <div class="slider-lbl">
          <ha-icon .icon=${iconName}></ha-icon>
          ${label}
        </div>
        <div class="slider-val">${valTextFn(localVal)}</div>
        <input
          type="range"
          class="slider-native"
          min=${min}
          max=${max}
          .value=${String(localVal)}
          aria-label=${label}
          @input=${(e: Event) => {
            const v = Number((e.target as HTMLInputElement).value);
            this._onSliderInput(sliderKey, v, onChange);
          }}
          @change=${(e: Event) => {
            const v = Number((e.target as HTMLInputElement).value);
            this._onSliderChange(sliderKey, v, onChange);
          }}
        />
      </div>
    `;
  }

  // — Render: Temp Slider —

  private _renderTempSlider(info: LightInfo): TemplateResult {
    const kelvin = info.colorTempKelvin || info.minKelvin;
    const tempKey = `temp:${info.entityId}`;
    const localKelvin = this._dragValues.get(tempKey) ?? kelvin;
    const pct = Math.min(
      Math.max(
        ((localKelvin - info.minKelvin) / (info.maxKelvin - info.minKelvin)) * 100,
        2,
      ),
      98,
    );

    return html`
      <div class="slider">
        <div class="slider-fill temp-gradient"></div>
        <div class="slider-thumb" style="left:${pct}%"></div>
        <div class="slider-lbl">
          <ha-icon .icon=${'mdi:thermometer'}></ha-icon>
          ${t('light.temperature')}
        </div>
        <div class="slider-val">${localKelvin}K</div>
        <input
          type="range"
          class="slider-native"
          min=${info.minKelvin}
          max=${info.maxKelvin}
          .value=${String(localKelvin)}
          aria-label="${t('light.color_temp_label')}"
          @input=${(e: Event) => {
            const v = Number((e.target as HTMLInputElement).value);
            this._onSliderInput(tempKey, v, (k) => this._setColorTemp(info.entityId, k));
          }}
          @change=${(e: Event) => {
            const v = Number((e.target as HTMLInputElement).value);
            this._onSliderChange(tempKey, v, (k) => this._setColorTemp(info.entityId, k));
          }}
        />
      </div>
    `;
  }

  // — Render: Grid —

  private _renderGrid(lights: LightInfo[]): TemplateResult[] {
    const layout = this._buildLayout(lights);
    const results: TemplateResult[] = [];

    for (const item of layout) {
      if (item.kind === 'full') {
        results.push(this._renderLightRow(item.light, false, false));
        results.push(this._renderControlFold(item.light));
      } else {
        results.push(this._renderLightRow(item.left, true, false));
        if (item.right) {
          results.push(this._renderLightRow(item.right, true, true));
        }
        results.push(this._renderControlFold(item.left));
        if (item.right) {
          results.push(this._renderControlFold(item.right));
        }
      }
    }

    return results;
  }

  // — Dashboard Render —

  private _renderDashboardGrid(visible: LightInfo[]): TemplateResult[] {
    const results: TemplateResult[] = [];
    let i = 0;
    while (i < visible.length) {
      const left = visible[i];
      const right = i + 1 < visible.length ? visible[i + 1] : null;
      if (right) {
        // Compact pair
        results.push(html`
          ${this._renderLightRow(left, true, false)}
          ${this._renderLightRow(right, true, true)}
          ${this._renderControlFold(left)}
          ${this._renderControlFold(right)}
        `);
        i += 2;
      } else {
        // Last odd light: full width
        results.push(html`
          ${this._renderLightRow(left, false, false)}
          ${this._renderControlFold(left)}
        `);
        i++;
      }
    }
    return results;
  }

  private _renderDashboard(): TemplateResult | typeof nothing {
    const infos = this._getLightInfos();
    if (infos.length === 0) return nothing;

    const maxVisible = 6;
    const visible = infos.slice(0, maxVisible);
    const overflow = infos.length - maxVisible;
    const tint = this._computeTint(infos);
    const onCount = infos.length;
    const totalLights = Math.max(this._getDashboardLightTotal(), onCount);
    const countClass = onCount === totalLights ? 'all' : 'some';

    return html`
      ${this._showHeader ? html`
        <div class="card-header">
          <div class="card-header-left">
            <span class="card-title">${t('light.dashboard_title')}</span>
            <span class="card-count ${countClass}">${onCount}/${totalLights}</span>
          </div>
          <button
            class="toggle-all on"
            role="switch"
            aria-checked="true"
            @click=${() => this._turnAllOff()}
            aria-label="${t('light.dashboard_turn_all_off_aria')}"
          ></button>
        </div>
      ` : nothing}

      <div class="card glass">
        <div
          class="tint"
          style=${tint ? `background:${tint.background};opacity:${tint.opacity}` : 'opacity:0'}
        ></div>
        <div class="card-inner">
          <div class="lights-grid">
            ${this._renderDashboardGrid(visible)}
          </div>
          ${overflow > 0
            ? html`<div class="dashboard-overflow">
                ${t('light.dashboard_overflow', { count: String(overflow) })}
              </div>`
            : nothing}
        </div>
      </div>
      ${this._renderColorPicker()}
    `;
  }

  // — Main Render —

  render() {
    void this._lang;
    if (this._isDashboardMode) {
      const result = this._renderDashboard();
      this.style.display = result === nothing ? 'none' : '';
      return result;
    }

    const infos = this._getLightInfos();
    if (infos.length === 0) {
      this.style.display = 'none';
      return nothing;
    }
    this.style.display = '';

    const onCount = infos.filter((l) => l.isOn).length;
    const total = infos.length;
    const anyOn = onCount > 0;
    const countClass = onCount === 0 ? 'none' : onCount === total ? 'all' : 'some';

    const tint = this._computeTint(infos);

    return html`
      ${this._showHeader ? html`
        <div class="card-header">
          <div class="card-header-left">
            <span class="card-title">${t('light.title')}</span>
            <span class="card-count ${countClass}">${onCount}/${total}</span>
          </div>
          <button
            class="toggle-all ${anyOn ? 'on' : ''}"
            @click=${() => this._toggleAll()}
            role="switch"
            aria-checked=${anyOn ? 'true' : 'false'}
            aria-label="${anyOn ? t('light.toggle_all_on_aria') : t('light.toggle_all_off_aria')}"
          ></button>
        </div>
      ` : nothing}

      <div class="card glass">
        <div
          class="tint"
          style=${tint ? `background:${tint.background};opacity:${tint.opacity}` : 'opacity:0'}
        ></div>
        <div class="card-inner">
          <div class="lights-grid">${this._renderGrid(infos)}</div>
        </div>
      </div>
      ${this._renderColorPicker()}
    `;
  }
}

try { customElements.define('glass-light-card', GlassLightCard); } catch { /* scoped registry */ }

