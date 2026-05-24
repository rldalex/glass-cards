import { LitElement, html, css, type CSSResult, type PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';
import { motionMixin } from './motion-mixin';

/**
 * `<glass-progress-bar>` — Thin horizontal progress indicator.
 *
 * Two modes:
 *   - `interactive` (default false): the bar is purely visual — vacuum
 *     cleaning %, battery, download. No user interaction.
 *   - `interactive` true: the bar accepts pointer + keyboard input. Use
 *     for media seek bars, position trackers. Emits `glass-progress-input`
 *     during drag and `glass-progress-change` on release.
 *
 * Differs from `<glass-slider>`: thinner (4-6px), no thumb in static
 * mode, and the visual collapses on hover when interactive. Use slider
 * for chunky value controls (brightness, volume).
 *
 * Sizes:
 *   - `size="md"` (default): 4px track
 *   - `size="lg"`: 6px track — for stat/consumable bars where the bar
 *     reads as a meter, not a hairline indicator
 */
export class GlassProgressBar extends LitElement {
  @property({ type: Number }) value = 0;
  @property({ type: Number }) min = 0;
  @property({ type: Number }) max = 100;
  @property({ type: Boolean, reflect: true }) interactive = false;
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: String, reflect: true }) size: 'md' | 'lg' = 'md';
  @property({ type: String, attribute: 'fill-color' }) fillColor = 'accent';
  @property({ type: String, attribute: 'aria-label' }) ariaLabel: string | null = null;

  private _dragging = false;
  private _dragValue = 0;
  private _ac: AbortController | null = null;

  static styles: CSSResult[] = [
    motionMixin,
    css`
      :host {
        display: block;
        box-sizing: border-box;
        width: 100%;
      }
      .track {
        position: relative;
        height: 0.25rem;
        border-radius: var(--radius-full);
        background: var(--s2);
        overflow: hidden;
        transition: height var(--t-fast);
      }
      :host([size='lg']) .track { height: 0.375rem; }
      :host([interactive]) .track {
        cursor: pointer;
        touch-action: none;
        user-select: none;
        -webkit-user-select: none;
        -webkit-tap-highlight-color: transparent;
      }
      :host([interactive]:not([disabled])) .track:hover,
      :host([interactive]) .track.dragging {
        height: 0.375rem;
      }
      :host([size='lg'][interactive]:not([disabled])) .track:hover,
      :host([size='lg'][interactive]) .track.dragging {
        height: 0.5rem;
      }
      .fill {
        position: absolute;
        inset: 0;
        border-radius: inherit;
        background: rgb(var(--_pb-rgb, var(--rgb-accent)));
        transform-origin: left center;
        transform: scaleX(0);
        transition: transform var(--t-fast);
        will-change: transform;
      }
      :host([interactive]) .fill {
        background: rgba(var(--rgb-white), 0.9);
        box-shadow: 0 0 8px rgba(var(--rgb-white), 0.3);
      }
      .thumb {
        position: absolute;
        top: 50%;
        left: 0;
        width: 0.625rem;
        height: 0.625rem;
        border-radius: 50%;
        background: rgba(var(--rgb-white), 0.95);
        transform: translate(-50%, -50%);
        opacity: 0;
        transition: opacity var(--t-fast);
        pointer-events: none;
      }
      :host([interactive]:not([disabled])) .track:hover .thumb,
      :host([interactive]) .track.dragging .thumb {
        opacity: 1;
      }
      :host([disabled]) {
        opacity: 0.5;
        pointer-events: none;
      }
      :host([interactive]) .track:focus-visible {
        outline: 2px solid var(--c-accent);
        outline-offset: 2px;
      }
      /* Hit-area extension for interactive mode (so the 4-6px track
         actually accepts touches at 44px tactile height). */
      :host([interactive]) .track::before {
        content: '';
        position: absolute;
        inset: -0.625rem 0;
      }
      @media (pointer: coarse) {
        :host([interactive]) .track::before {
          inset: calc((var(--tap-lg) - 0.25rem) / -2) 0;
        }
      }
    `,
  ];

  private _resolveColor(): string {
    const c = this.fillColor;
    if (/^\d+\s*,\s*\d+\s*,\s*\d+$/.test(c)) return c;
    return `var(--rgb-${c})`;
  }

  private _pct(val?: number): number {
    const range = this.max - this.min;
    if (range <= 0) return 0;
    const v = val ?? (this._dragging ? this._dragValue : this.value);
    return Math.max(0, Math.min(100, ((v - this.min) / range) * 100));
  }

  private _pctToValue(pct: number): number {
    const range = this.max - this.min;
    return Math.max(this.min, Math.min(this.max, this.min + (pct / 100) * range));
  }

  protected updated(changed: PropertyValues): void {
    super.updated(changed);
    if (!this._dragging && (changed.has('value') || changed.has('min') || changed.has('max'))) {
      this._applyVisuals();
    }
  }

  protected firstUpdated(): void {
    this._applyVisuals();
  }

  private _applyVisuals(): void {
    const pct = this._pct();
    const fill = this.renderRoot.querySelector('.fill') as HTMLElement | null;
    const thumb = this.renderRoot.querySelector('.thumb') as HTMLElement | null;
    if (fill) fill.style.transform = `scaleX(${pct / 100})`;
    if (thumb) thumb.style.left = `${pct}%`;
  }

  private _onPointerDown(e: PointerEvent): void {
    if (!this.interactive || this.disabled) return;
    e.stopPropagation();
    const track = e.currentTarget as HTMLElement;
    track.setPointerCapture(e.pointerId);
    this._dragging = true;
    track.classList.add('dragging');
    this._ac = new AbortController();
    const { signal } = this._ac;

    const update = (evt: PointerEvent, isFinal: boolean) => {
      const rect = track.getBoundingClientRect();
      const rawPct = Math.max(0, Math.min(100, ((evt.clientX - rect.left) / rect.width) * 100));
      const val = this._pctToValue(rawPct);
      this._dragValue = val;
      this._applyVisuals();
      this.dispatchEvent(new CustomEvent(isFinal ? 'glass-progress-change' : 'glass-progress-input', {
        detail: { value: val },
        bubbles: true,
        composed: true,
      }));
    };

    update(e, false);

    const cleanup = () => {
      this._ac?.abort();
      this._ac = null;
      try { track.releasePointerCapture(e.pointerId); } catch { /* ignore */ }
      track.classList.remove('dragging');
      this._dragging = false;
    };

    track.addEventListener('pointermove', (evt) => update(evt as PointerEvent, false), { signal });
    track.addEventListener('pointerup', (evt) => { update(evt as PointerEvent, true); cleanup(); }, { signal });
    track.addEventListener('pointercancel', () => cleanup(), { signal });
    track.addEventListener('lostpointercapture', () => cleanup(), { signal });
  }

  private _onKeyDown(e: KeyboardEvent): void {
    if (!this.interactive || this.disabled) return;
    const range = this.max - this.min;
    const step = range / 20;
    let val: number;
    switch (e.key) {
      case 'ArrowRight': case 'ArrowUp':
        val = Math.min(this.max, this.value + step);
        break;
      case 'ArrowLeft': case 'ArrowDown':
        val = Math.max(this.min, this.value - step);
        break;
      case 'Home':
        val = this.min;
        break;
      case 'End':
        val = this.max;
        break;
      default:
        return;
    }
    e.preventDefault();
    this.dispatchEvent(new CustomEvent('glass-progress-change', {
      detail: { value: val },
      bubbles: true,
      composed: true,
    }));
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._ac?.abort();
    this._ac = null;
    this._dragging = false;
  }

  protected render() {
    return html`
      <div
        class="track"
        style="--_pb-rgb:${this._resolveColor()}"
        role=${this.interactive ? 'slider' : 'progressbar'}
        tabindex=${this.interactive && !this.disabled ? '0' : '-1'}
        aria-valuemin=${this.min}
        aria-valuemax=${this.max}
        aria-valuenow=${this._dragging ? this._dragValue : this.value}
        aria-label=${this.ariaLabel ?? 'progress'}
        @pointerdown=${this._onPointerDown}
        @keydown=${this._onKeyDown}
      >
        <div class="fill"></div>
        ${this.interactive ? html`<div class="thumb"></div>` : null}
      </div>
    `;
  }
}

try { customElements.define('glass-progress-bar', GlassProgressBar); } catch { /* already registered */ }

declare global {
  interface HTMLElementTagNameMap {
    'glass-progress-bar': GlassProgressBar;
  }
}
