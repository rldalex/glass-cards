/// <reference types="vite/client" />
import { css, html, type CSSResult, type TemplateResult } from 'lit';
import { bus, removeHistoryIntercept, type AmbientPeriod } from '@glass-cards/event-bus';

// — Design Tokens —

export const glassTokens: CSSResult = css`
  :host {
    --ease-std: cubic-bezier(0.4, 0, 0.2, 1);
    --ease-out: cubic-bezier(0.16, 1, 0.3, 1);

    --t-slow: 1.2s var(--ease-std);
    --t-med: 0.4s var(--ease-std);
    --t-fast: 0.2s var(--ease-std);
    --t-layout: 0.35s var(--ease-out);

    --radius-xl: 22px;
    --radius-lg: 14px;
    --radius-md: 10px;
    --radius-sm: 8px;
    --radius-xs: 6px;
    --radius-full: 9999px;

    --fz-display: 28px;
    --fz-xl: 22px;
    --fz-lg: 14px;
    --fz-md: 13px;
    --fz-base: 11px;
    --fz-sm: 10px;
    --fz-xs: 9px;
    --fz-xxs: 8px;

    --rgb-white: 255, 255, 255;
    --rgb-black: 0, 0, 0;
    --rgb-success: 74, 222, 128;
    --rgb-alert: 248, 113, 113;
    --rgb-warning: 251, 191, 36;
    --rgb-info: 96, 165, 250;
    --rgb-accent: 129, 140, 248;
    --rgb-purple: 167, 139, 250;
    --rgb-light-glow: 251, 191, 36;
    --rgb-spotify: 29, 185, 84;
    --rgb-heat: 249, 115, 22;
    --rgb-cool: 56, 189, 248;

    --t1: rgba(var(--rgb-white), 0.88);
    --t2: rgba(var(--rgb-white), 0.6);
    --t3: rgba(var(--rgb-white), 0.55);
    --t4: rgba(var(--rgb-white), 0.35);

    --s1: rgba(var(--rgb-white), 0.04);
    --s2: rgba(var(--rgb-white), 0.06);
    --s3: rgba(var(--rgb-white), 0.08);
    --s4: rgba(var(--rgb-white), 0.12);

    --b1: rgba(var(--rgb-white), 0.06);
    --b2: rgba(var(--rgb-white), 0.08);
    --b3: rgba(var(--rgb-white), 0.15);

    --c-success: var(--success-color, #4ade80);
    --c-alert: var(--error-color, #f87171);
    --c-warning: var(--warning-color, #fbbf24);
    --c-info: var(--info-color, #60a5fa);
    --c-accent: var(--accent-color, #818cf8);
    --c-purple: #a78bfa;
    --c-teal: #2dd4bf;
    --c-light-glow: #fbbf24;
    --c-spotify: #1DB954;
    --c-spotify-hover: #1ed760;
    --c-temp-hot: #f87171;
    --c-temp-cold: #60a5fa;
    --c-heat: #f97316;
    --c-cool: #38bdf8;

    --blur-sm: blur(8px);
    --blur-md: blur(16px) saturate(1.3);
    --blur-lg: blur(40px) saturate(1.4);
    --blur-xl: blur(50px) saturate(1.5);

    --icon-xs: 0.625rem;
    --icon-sm: 0.875rem;
    --icon-md: 1.125rem;
    --icon-lg: 1.375rem;
    --icon-xl: 1.5rem;

    /* Spacing scale — base 0.25rem (4px) */
    --sp-1: 0.25rem;
    --sp-2: 0.5rem;
    --sp-3: 0.75rem;
    --sp-4: 1rem;
    --sp-5: 1.25rem;
    --sp-6: 1.5rem;
    --sp-8: 2rem;
    --sp-10: 2.5rem;
  }
`;

// — Host Mixin —

export const hostMixin: CSSResult = css`
  :host {
    display: block;
    box-sizing: border-box;
    font-family: 'Plus Jakarta Sans', sans-serif;
    -webkit-tap-highlight-color: transparent;
  }
`;

// — Glass Mixins —

export const glassMixin: CSSResult = css`
  .glass {
    border-radius: var(--radius-xl);
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.08) 0%,
      rgba(255, 255, 255, 0.03) 50%,
      rgba(255, 255, 255, 0.06) 100%
    );
    backdrop-filter: blur(40px) saturate(1.4);
    -webkit-backdrop-filter: blur(40px) saturate(1.4);
    box-shadow:
      inset 0 1px 0 0 rgba(255, 255, 255, 0.1),
      0 8px 32px rgba(0, 0, 0, 0.25),
      0 2px 8px rgba(0, 0, 0, 0.15);
    border: 1px solid var(--b2);
  }

  .glass-float {
    border-radius: var(--radius-xl);
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.08) 0%,
      rgba(255, 255, 255, 0.03) 50%,
      rgba(255, 255, 255, 0.06) 100%
    );
    backdrop-filter: blur(50px) saturate(1.5);
    -webkit-backdrop-filter: blur(50px) saturate(1.5);
    box-shadow:
      inset 0 1px 0 0 rgba(255, 255, 255, 0.1),
      0 20px 60px rgba(0, 0, 0, 0.4),
      0 4px 16px rgba(0, 0, 0, 0.25);
    border: 1px solid var(--b2);
  }

  .tint {
    position: absolute;
    inset: 0;
    border-radius: inherit;
    pointer-events: none;
    z-index: 0;
    transition: opacity var(--t-slow);
  }
`;

// — Marquee Mixin —

export const marqueeMixin: CSSResult = css`
  .marquee {
    display: block;
    overflow: hidden;
    white-space: nowrap;
    position: relative;
    text-overflow: ellipsis;
  }
  .marquee.scrolling {
    mask-image: linear-gradient(90deg, transparent, #000 4%, #000 96%, transparent);
    -webkit-mask-image: linear-gradient(90deg, transparent, #000 4%, #000 96%, transparent);
    text-overflow: clip;
  }
  .marquee .marquee-inner {
    display: inline-block;
  }
  .marquee.scrolling .marquee-inner {
    animation: marquee-scroll var(--marquee-duration, 8s) linear infinite;
    will-change: transform;
  }
  @keyframes marquee-scroll {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
`;

/** @deprecated Use marqueeText() without maxChars — kept for backward compat. */
export const MARQUEE_FULL = 18;
/** @deprecated Use marqueeText() without maxChars — kept for backward compat. */
export const MARQUEE_COMPACT = 12;

/**
 * Observe all .marquee elements inside a ShadowRoot and toggle the
 * `.scrolling` class based on real overflow (scrollWidth > clientWidth).
 *
 * Call once in connectedCallback(); returns a cleanup function to call
 * in disconnectedCallback().
 */
export function initMarqueeObserver(root: ShadowRoot | null): (() => void) {
  if (!root) return () => {};

  const check = (el: Element) => {
    const inner = el.querySelector('.marquee-inner') as HTMLElement | null;
    if (!inner) return;
    // Pause animation and reset to single text for measurement
    el.classList.remove('scrolling');
    const singleText = inner.dataset.text ?? inner.textContent?.split('\u00A0\u00A0\u00A0')[0] ?? '';
    inner.dataset.text = singleText;
    inner.textContent = singleText;
    // Double rAF ensures layout is complete before measuring (CLAUDE.md convention)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (el.scrollWidth > el.clientWidth + 1) {
          // Text overflows — duplicate for seamless scroll loop
          inner.textContent = `${singleText}\u00A0\u00A0\u00A0${singleText}\u00A0\u00A0\u00A0`;
          el.classList.add('scrolling');
        }
      });
    });
  };

  const ro = new ResizeObserver((entries) => {
    for (const entry of entries) {
      check(entry.target);
    }
  });

  // MutationObserver to detect new .marquee elements added to the DOM
  const mo = new MutationObserver(() => {
    syncObserved();
  });

  const observed = new Set<Element>();

  const syncObserved = () => {
    const marquees = root.querySelectorAll('.marquee');
    // Observe new elements
    marquees.forEach((m) => {
      if (!observed.has(m)) {
        observed.add(m);
        ro.observe(m);
        check(m);
      }
    });
    // Unobserve removed elements
    for (const m of observed) {
      if (!m.isConnected) {
        ro.unobserve(m);
        observed.delete(m);
      }
    }
  };

  mo.observe(root, { childList: true, subtree: true });
  syncObserved();

  return () => {
    ro.disconnect();
    mo.disconnect();
    observed.clear();
  };
}

/** @deprecated Use initMarqueeObserver() instead. */
export function updateMarquees(root: ShadowRoot | null): void {
  if (!root) return;
  const marquees = root.querySelectorAll('.marquee');
  for (const m of marquees) {
    m.classList.remove('scrolling');
    requestAnimationFrame(() => {
      if (m.scrollWidth > m.clientWidth + 1) {
        m.classList.add('scrolling');
      }
    });
  }
}

/**
 * Render text with automatic marquee scrolling.
 * Always wraps in a .marquee span — the actual scrolling is controlled
 * by initMarqueeObserver() which adds .scrolling only when the text
 * overflows its container.
 */
export function marqueeText(
  text: string,
  maxChars = MARQUEE_FULL,
  duration = '8s',
): TemplateResult | string {
  if (!text || text.length <= maxChars) return text || '';
  return html`<span class="marquee" style="--marquee-duration:${duration}"><span class="marquee-inner" data-text="${text}">${text}</span></span>`;
}

// — Press Mixin (mobile touch feedback) —

export const bounceMixin: CSSResult = css`
  @keyframes bounce {
    0%   { transform: scale(1); }
    40%  { transform: scale(0.94); }
    100% { transform: scale(1); }
  }
`;

// — Equalizer Mixin —

/** Equalizer animation mixin — 3 animated bars for now-playing indicator. */
export const eqMixin: CSSResult = css`
  .eq-bars {
    display: flex;
    align-items: flex-end;
    gap: 1px;
    height: 12px;
  }
  .eq-bars span {
    width: 2px;
    border-radius: 1px;
    background: var(--c-accent-dynamic, var(--c-accent)); /* set --c-accent-dynamic on host to tint bars */
    transform-origin: bottom;
    animation: eq-bar 0.8s ease-in-out infinite alternate;
  }
  .eq-bars span:nth-child(2) { animation-delay: 0.2s; }
  .eq-bars span:nth-child(3) { animation-delay: 0.4s; }
  @keyframes eq-bar {
    from { transform: scaleY(0.25); }
    to { transform: scaleY(1); }
  }
`;

// — Fold Mixin —

export const foldMixin: CSSResult = css`
  .fold {
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows var(--t-layout);
  }
  .fold.open {
    grid-template-rows: 1fr;
  }
  .fold-inner {
    overflow: hidden;
    opacity: 0;
    transition: opacity var(--t-fast);
  }
  .fold.open .fold-inner {
    opacity: 1;
    transition-delay: 0.1s;
  }
`;

// — Ambient Background —

interface AmbientConfig {
  body: string;
  blobTop: string;
  blobBottom: string;
}

const AMBIENT_THEMES: Record<AmbientPeriod, AmbientConfig> = {
  morning: { body: '#0f1923', blobTop: '#1a6b8a', blobBottom: '#2d8a6e' },
  day: { body: '#111827', blobTop: '#3b6fa0', blobBottom: '#4a90a0' },
  evening: { body: '#1a1118', blobTop: '#8a4a2d', blobBottom: '#6b3a5a' },
  night: { body: '#0a0e1a', blobTop: '#1a2040', blobBottom: '#2a1a3a' },
};

// — ThemeManager —

const AMBIENT_BG_ID = 'glass-cards-ambient-bg';

const AMBIENT_STYLES = `
  #${AMBIENT_BG_ID} {
    position: fixed;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    overflow: hidden;
    transition: background 1.2s cubic-bezier(0.4, 0, 0.2, 1);
  }
  #${AMBIENT_BG_ID}::before,
  #${AMBIENT_BG_ID}::after {
    content: '';
    position: absolute;
    border-radius: 50%;
    filter: blur(120px);
    opacity: 0.4;
    transition: background 1.2s cubic-bezier(0.4, 0, 0.2, 1);
  }
  #${AMBIENT_BG_ID}::before {
    width: 600px;
    height: 600px;
    top: -200px;
    right: -100px;
    background: var(--ambient-blob-top, #3b6fa0);
  }
  #${AMBIENT_BG_ID}::after {
    width: 500px;
    height: 500px;
    bottom: -150px;
    left: -100px;
    background: var(--ambient-blob-bottom, #4a90a0);
  }
  html::-webkit-scrollbar { display: none; }
  html { scrollbar-width: none; }
`;

export class ThemeManager {
  private period: AmbientPeriod = 'day';
  private cleanup?: () => void;
  private ambientEl: HTMLElement | null = null;
  private styleEl: HTMLStyleElement | null = null;

  constructor() {
    this.cleanup = bus.on('ambient-update', (payload) => {
      this.period = payload.period;
      this.applyAmbient();
    });
    this._injectAmbientBg();
    this.applyAmbient();
  }

  get currentPeriod(): AmbientPeriod {
    return this.period;
  }

  applyAmbient(period?: AmbientPeriod): void {
    if (period) this.period = period;
    const config = AMBIENT_THEMES[this.period];
    const root = document.documentElement;
    root.style.setProperty('--ambient-body', config.body);
    root.style.setProperty('--ambient-blob-top', config.blobTop);
    root.style.setProperty('--ambient-blob-bottom', config.blobBottom);
    if (this.ambientEl) {
      this.ambientEl.style.background = config.body;
    }
  }

  private _injectAmbientBg(): void {
    // Override HA's default background so our ambient div shows through
    document.documentElement.style.background = 'transparent';

    // Don't inject if already present (e.g. another instance)
    if (document.getElementById(AMBIENT_BG_ID)) {
      this.ambientEl = document.getElementById(AMBIENT_BG_ID);
      this.styleEl = document.head.querySelector('style[data-glass-ambient]') as HTMLStyleElement | null;
      return;
    }

    // Inject styles
    this.styleEl = document.createElement('style');
    this.styleEl.setAttribute('data-glass-ambient', '');
    this.styleEl.textContent = AMBIENT_STYLES;
    document.head.appendChild(this.styleEl);

    // Inject ambient div as first child of body
    this.ambientEl = document.createElement('div');
    this.ambientEl.id = AMBIENT_BG_ID;
    document.body.prepend(this.ambientEl);
  }

  destroy(): void {
    this.cleanup?.();
    this.ambientEl?.remove();
    this.ambientEl = null;
    this.styleEl?.remove();
    this.styleEl = null;
    document.documentElement.style.removeProperty('background');
    if (_themeManager === this) _themeManager = null;
  }
}

let _themeManager: ThemeManager | null = null;

export function getThemeManager(): ThemeManager {
  if (!_themeManager) {
    _themeManager = new ThemeManager();
  }
  return _themeManager;
}

// — Color Utilities —

export function hsToRgb(h: number, s: number): [number, number, number] {
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

export function rgbToHs(rgb: [number, number, number]): { h: number; s: number } {
  const r = rgb[0] / 255, g = rgb[1] / 255, b = rgb[2] / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const d = max - min;
  let h = 0;
  if (d !== 0) {
    if (max === r) h = ((g - b) / d + 6) % 6 * 60;
    else if (max === g) h = ((b - r) / d + 2) * 60;
    else h = ((r - g) / d + 4) * 60;
  }
  const s = max === 0 ? 0 : d / max;
  return { h, s };
}

export function rgbToHex(rgb: [number, number, number]): string {
  return '#' + rgb.map((c) => c.toString(16).padStart(2, '0')).join('');
}

export function hexToRgb(hex: string): [number, number, number] {
  return [
    parseInt(hex.slice(1, 3), 16),
    parseInt(hex.slice(3, 5), 16),
    parseInt(hex.slice(5, 7), 16),
  ];
}

export function rgbToWheelPos(rgb: [number, number, number]): { x: number; y: number } {
  const { h, s } = rgbToHs(rgb);
  const dist = Math.min(s, 1);
  const rad = (h * Math.PI) / 180;
  return { x: Math.cos(rad) * dist * 50 + 50, y: Math.sin(rad) * dist * 50 + 50 };
}

export function hexToWheelPos(hex: string): { x: number; y: number } {
  return rgbToWheelPos(hexToRgb(hex));
}

/**
 * Draw an HS color wheel on a canvas (HSV model, V=1: white center → pure hue at edge).
 */
export function drawColorWheel(canvas: HTMLCanvasElement): void {
  const rect = canvas.getBoundingClientRect();
  const size = Math.round(rect.width) || 220;
  const dpr = window.devicePixelRatio || 1;
  canvas.width = size * dpr;
  canvas.height = size * dpr;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  ctx.scale(dpr, dpr);
  const cx = size / 2, cy = size / 2, r = size / 2;
  for (let angle = 0; angle < 360; angle++) {
    const start = ((angle - 1) * Math.PI) / 180;
    const end = ((angle + 1) * Math.PI) / 180;
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
    const [cr, cg, cb] = hsToRgb(angle, 1);
    grad.addColorStop(0, '#ffffff');
    grad.addColorStop(1, `rgb(${cr},${cg},${cb})`);
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, r, start, end);
    ctx.closePath();
    ctx.fillStyle = grad;
    ctx.fill();
  }
}

export interface ColorWheelEvent {
  rgb: [number, number, number];
  hex: string;
  hs: { h: number; s: number };
  pos: { x: number; y: number };
}

/**
 * Compute color from a pointer position on the wheel canvas.
 */
export function colorFromWheelEvent(
  canvas: HTMLCanvasElement,
  clientX: number,
  clientY: number,
): ColorWheelEvent {
  const rect = canvas.getBoundingClientRect();
  const x = clientX - rect.left - rect.width / 2;
  const y = clientY - rect.top - rect.height / 2;
  const radius = rect.width / 2;
  const dist = Math.sqrt(x * x + y * y);
  const clampedDist = Math.min(dist, radius);
  const angle = Math.atan2(y, x);
  const hue = ((angle * 180 / Math.PI) % 360 + 360) % 360;
  const sat = clampedDist / radius;
  const rgb = hsToRgb(hue, sat);
  const hex = rgbToHex(rgb);
  const scale = dist > 0 ? clampedDist / dist : 1;
  const pos = { x: (x * scale) / radius * 50 + 50, y: (y * scale) / radius * 50 + 50 };
  return { rgb, hex, hs: { h: hue, s: sat }, pos };
}

// — Unavailable Entity Mixin —

export const unavailableMixin: CSSResult = css`
  .entity-unavailable {
    opacity: 0.4;
    pointer-events: none;
    position: relative;
  }
  .entity-unavailable .unavailable-badge {
    position: absolute;
    top: 0.25rem;
    right: 0.25rem;
    --mdc-icon-size: 0.75rem;
    color: var(--c-warning);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
  }
`;

export function isEntityUnavailable(state: string | undefined): boolean {
  return !state || state === 'unavailable' || state === 'unknown';
}

// — Domain colors —

export interface DomainColor {
  /** CSS variable reference, e.g. 'var(--c-info)' */
  cssVar: string;
  /** RGB triplet string, e.g. '96,165,250' */
  rgb: string;
}

export const DOMAIN_COLORS: Record<string, DomainColor> = {
  light:    { cssVar: '#fbbf24',  rgb: '251,191,36' },
  cover:    { cssVar: '#a78bfa',  rgb: '167,139,250' },
  climate:  { cssVar: '#60a5fa',  rgb: '96,165,250' },
  media:    { cssVar: '#818cf8',  rgb: '129,140,248' },
  fan:      { cssVar: '#2dd4bf',  rgb: '45,212,191' },
  spotify:  { cssVar: '#1DB954', rgb: '29,185,84' },
  camera:   { cssVar: '#f87171',  rgb: '248,113,113' },
  presence: { cssVar: '#818cf8',  rgb: '129,140,248' },
  title:    { cssVar: '#818cf8',  rgb: '129,140,248' },
  weather:  { cssVar: '#60a5fa',  rgb: '96,165,250' },
  calendar: { cssVar: '#4ade80',  rgb: '74,222,128' },
};

// — Responsive system —
export { BREAKPOINTS, type CardSize } from './breakpoints';
export { ResizeMixin } from './resize-mixin';
export { cardBase, gridResponsive } from './base-styles';

// — Glass Slider Component —
import './glass-slider';
export { GlassSlider } from './glass-slider';

// HMR support — cleanup on module reload
if (import.meta.hot) {
  import.meta.hot.dispose(() => {
    _themeManager?.destroy();
    _themeManager = null;
    removeHistoryIntercept();
  });
}
