import { LitElement, html, css, type CSSResult, type PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';
import { glassTokens } from './index';

/**
 * `<glass-slider>` — Reusable pill-shaped slider with GPU-accelerated transforms.
 *
 * @fires glass-slider-input — on every pointer move during drag (detail: { value: number })
 * @fires glass-slider-change — on pointer release (detail: { value: number })
 */
export class GlassSlider extends LitElement {
  @property({ type: Number }) value = 0;
  @property({ type: Number }) min = 0;
  @property({ type: Number }) max = 100;
  @property({ type: Number }) step = 1;
  @property({ type: String }) color = 'var(--rgb-accent)';
  @property({ type: String }) label = '';
  @property({ type: Boolean, reflect: true }) disabled = false;

  private _dragging = false;
  private _dragValue = 0;
  private _ac: AbortController | null = null;

  static styles: CSSResult[] = [
    glassTokens,
    css`
      :host {
        display: block;
        box-sizing: border-box;
      }
      .track {
        position: relative;
        height: 2.25rem;
        border-radius: var(--radius-lg);
        background: var(--s1);
        border: 1px solid var(--b1);
        overflow: hidden;
        cursor: pointer;
        touch-action: none;
        user-select: none;
        -webkit-user-select: none;
        outline: none;
      }
      .track:focus-visible {
        outline: 2px solid rgba(var(--rgb-white), 0.25);
        outline-offset: 2px;
      }
      :host([disabled]) .track {
        opacity: 0.4;
        pointer-events: none;
      }
      .fill {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: inherit;
        pointer-events: none;
        transform-origin: left center;
        will-change: transform;
        background: linear-gradient(
          90deg,
          rgba(var(--_slider-color), 0.15),
          rgba(var(--_slider-color), 0.25)
        );
      }
      .thumb {
        position: absolute;
        top: 50%;
        left: 0;
        width: 0.5rem;
        height: 1.25rem;
        border-radius: 4px;
        background: rgba(var(--rgb-white), 0.7);
        box-shadow: 0 0 8px rgba(var(--rgb-white), 0.2);
        pointer-events: none;
        will-change: transform;
      }
      .label {
        position: absolute;
        top: 50%;
        right: 0.75rem;
        transform: translateY(-50%);
        font-family: 'Plus Jakarta Sans', sans-serif;
        font-size: var(--fz-base);
        font-weight: 600;
        color: var(--t3);
        pointer-events: none;
      }
    `,
  ];

  private _displayPct(val?: number): number {
    const range = this.max - this.min;
    if (range <= 0) return 0;
    const v = val ?? (this._dragging ? this._dragValue : this.value);
    return Math.max(0, Math.min(100, ((v - this.min) / range) * 100));
  }

  private _snap(raw: number): number {
    if (this.step <= 0) return raw;
    const snapped = Math.round(raw / this.step) * this.step;
    const decimals = (this.step.toString().split('.')[1] || '').length;
    return parseFloat(snapped.toFixed(decimals));
  }

  private _pctToValue(pct: number): number {
    const range = this.max - this.min;
    const raw = this.min + (pct / 100) * range;
    return Math.max(this.min, Math.min(this.max, this._snap(raw)));
  }

  protected updated(changed: PropertyValues): void {
    super.updated(changed);
    if (!this._dragging && (changed.has('value') || changed.has('min') || changed.has('max') || changed.has('color'))) {
      this._applyVisuals();
    }
  }

  protected firstUpdated(): void {
    this._applyVisuals();
  }

  private _applyVisuals(): void {
    const pct = this._displayPct();
    const fill = this.renderRoot.querySelector('.fill') as HTMLElement | null;
    const thumb = this.renderRoot.querySelector('.thumb') as HTMLElement | null;
    if (fill) fill.style.transform = `scaleX(${pct / 100})`;
    if (thumb) thumb.style.transform = `translate(calc(${pct}cqw - 50%), -50%)`;
  }

  private _onPointerDown(e: PointerEvent): void {
    if (this.disabled) return;
    e.stopPropagation();
    const track = e.currentTarget as HTMLElement;
    track.setPointerCapture(e.pointerId);
    this._dragging = true;
    this._ac = new AbortController();
    const { signal } = this._ac;

    const fill = this.renderRoot.querySelector('.fill') as HTMLElement;
    const thumb = this.renderRoot.querySelector('.thumb') as HTMLElement;

    const update = (evt: PointerEvent, isFinal: boolean) => {
      const rect = track.getBoundingClientRect();
      const rawPct = Math.max(0, Math.min(100, ((evt.clientX - rect.left) / rect.width) * 100));
      const val = this._pctToValue(rawPct);
      this._dragValue = val;

      const displayPct = this._displayPct(val);
      fill.style.transform = `scaleX(${displayPct / 100})`;
      thumb.style.transform = `translate(calc(${displayPct}cqw - 50%), -50%)`;

      const eventName = isFinal ? 'glass-slider-change' : 'glass-slider-input';
      this.dispatchEvent(new CustomEvent(eventName, {
        detail: { value: val },
        bubbles: true,
        composed: true,
      }));
    };

    update(e, false);

    const cleanup = () => {
      this._ac?.abort();
      this._ac = null;
      try { track.releasePointerCapture(e.pointerId); } catch { /* already released */ }
      this._dragging = false;
    };

    track.addEventListener('pointermove', (evt) => update(evt as PointerEvent, false), { signal });
    track.addEventListener('pointerup', (evt) => { update(evt as PointerEvent, true); cleanup(); }, { signal });
    track.addEventListener('pointercancel', () => cleanup(), { signal });
    track.addEventListener('lostpointercapture', () => cleanup(), { signal });
  }

  private _onKeyDown(e: KeyboardEvent): void {
    if (this.disabled) return;
    const s = this.step > 0 ? this.step : 1;
    let val: number;
    switch (e.key) {
      case 'ArrowRight': case 'ArrowUp':
        val = Math.min(this.max, this._snap(this.value + s));
        break;
      case 'ArrowLeft': case 'ArrowDown':
        val = Math.max(this.min, this._snap(this.value - s));
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
    this._dragValue = val;
    this._applyVisuals();
    this.dispatchEvent(new CustomEvent('glass-slider-change', {
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
        role="slider"
        tabindex="0"
        aria-valuemin="${this.min}"
        aria-valuemax="${this.max}"
        aria-valuenow="${this._dragging ? this._dragValue : this.value}"
        aria-label="${this.label || 'slider'}"
        style="container-type:inline-size;--_slider-color:${this.color}"
        @pointerdown=${this._onPointerDown}
        @keydown=${this._onKeyDown}
      >
        <div class="fill"></div>
        <div class="thumb"></div>
        ${this.label ? html`<span class="label">${this.label}</span>` : ''}
      </div>
    `;
  }
}

try { customElements.define('glass-slider', GlassSlider); } catch { /* already registered */ }

declare global {
  interface HTMLElementTagNameMap {
    'glass-slider': GlassSlider;
  }
}
