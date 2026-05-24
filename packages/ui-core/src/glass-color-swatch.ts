import { LitElement, html, css, type CSSResult } from 'lit';
import { property } from 'lit/decorators.js';

/**
 * `<glass-color-swatch>` — Round color sample for palette/picker UIs.
 *
 * Visual diameter is intentionally compact (26px) for dense palettes. A
 * ::after extension widens the touchable region to var(--tap-lg) on
 * coarse pointers — required because color picking is precision work and
 * the user must be able to hit any swatch without zoom.
 *
 * Pass a hex color via `color`; the swatch fills with it.
 */
export class GlassColorSwatch extends LitElement {
  @property({ type: String }) color = '#ffffff';
  @property({ type: Boolean, reflect: true }) selected = false;
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: String, attribute: 'aria-label' }) ariaLabel: string | null = null;

  static styles: CSSResult[] = [
    css`
      :host {
        display: inline-flex;
        box-sizing: border-box;
        -webkit-tap-highlight-color: transparent;
      }
      button {
        position: relative;
        box-sizing: border-box;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 1.625rem;
        height: 1.625rem;
        padding: 0;
        margin: 0;
        background: var(--_swatch-bg, #fff);
        border: 1px solid rgba(var(--rgb-white), 0.18);
        border-radius: 50%;
        cursor: pointer;
        outline: none;
        transition:
          transform var(--t-fast),
          border-color var(--t-fast),
          box-shadow var(--t-fast);
        -webkit-tap-highlight-color: transparent;
      }
      /* Hit-area extension: 26px visual → 44px tactile on coarse pointers. */
      button::after {
        content: '';
        position: absolute;
        inset: calc((var(--tap-lg) - 1.625rem) / -2);
      }
      @media (hover: hover) and (pointer: fine) {
        button::after { inset: 0; }
      }

      :host([selected]) button {
        border-color: rgba(var(--rgb-white), 0.7);
        box-shadow:
          0 0 0 2px rgba(var(--rgb-white), 0.15),
          0 0 12px rgba(var(--rgb-white), 0.25);
      }

      :host([disabled]) button {
        opacity: 0.4;
        pointer-events: none;
      }

      button:active { transform: scale(0.9); }
      button:focus-visible {
        outline: 2px solid rgba(var(--rgb-white), 0.4);
        outline-offset: 3px;
      }
    `,
  ];

  protected render() {
    return html`
      <button
        type="button"
        style="--_swatch-bg:${this.color}"
        ?disabled=${this.disabled}
        aria-label=${this.ariaLabel ?? `color ${this.color}`}
        aria-pressed=${this.selected ? 'true' : 'false'}
      ></button>
    `;
  }
}

try { customElements.define('glass-color-swatch', GlassColorSwatch); } catch { /* already registered */ }

declare global {
  interface HTMLElementTagNameMap {
    'glass-color-swatch': GlassColorSwatch;
  }
}
