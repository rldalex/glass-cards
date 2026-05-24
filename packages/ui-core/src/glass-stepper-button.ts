import { LitElement, html, css, type CSSResult } from 'lit';
import { property } from 'lit/decorators.js';

/**
 * `<glass-stepper-button>` — +/- button used in numeric steppers
 * (temperature, brightness, position).
 *
 * Two variants:
 *   - `surface="light"` (default): on a normal card surface
 *   - `surface="dark"`: on a dark sub-panel (rgba(0,0,0,0.25)) — overrides
 *     background and border for sufficient contrast.
 *
 * Always 44px tap target (var(--tap-lg)).
 */
export class GlassStepperButton extends LitElement {
  @property({ type: String }) icon = '';
  @property({ type: String, reflect: true }) surface: 'light' | 'dark' = 'light';
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
        width: var(--tap-lg);
        height: var(--tap-lg);
        padding: 0;
        margin: 0;
        font-family: inherit;
        outline: none;
        cursor: pointer;
        border-radius: var(--radius-lg);
        background: var(--s2);
        border: 1px solid var(--b2);
        color: var(--t2);
        transition:
          background var(--t-fast),
          border-color var(--t-fast),
          color var(--t-fast),
          transform var(--t-fast);
        -webkit-tap-highlight-color: transparent;
      }
      /* On dark sub-panels, the default --s2/--b2 don't read; bump contrast. */
      :host([surface='dark']) button {
        background: rgba(var(--rgb-white), 0.1);
        border-color: rgba(var(--rgb-white), 0.18);
        color: var(--t1);
      }

      ha-icon {
        --mdc-icon-size: var(--icon-md);
        pointer-events: none;
      }

      :host([disabled]) button {
        opacity: 0.4;
        pointer-events: none;
      }

      @media (hover: hover) and (pointer: fine) {
        button:hover { background: var(--s3); border-color: var(--b3); color: var(--t1); }
        :host([surface='dark']) button:hover {
          background: rgba(var(--rgb-white), 0.15);
          border-color: rgba(var(--rgb-white), 0.25);
        }
      }
      button:active { transform: scale(0.94); }
      button:focus-visible {
        outline: 2px solid var(--c-accent);
        outline-offset: 2px;
      }
    `,
  ];

  protected render() {
    return html`
      <button
        type="button"
        ?disabled=${this.disabled}
        aria-label=${this.ariaLabel ?? this.icon ?? 'stepper'}
      >
        <slot>${this.icon ? html`<ha-icon .icon=${this.icon}></ha-icon>` : null}</slot>
      </button>
    `;
  }
}

try { customElements.define('glass-stepper-button', GlassStepperButton); } catch { /* already registered */ }

declare global {
  interface HTMLElementTagNameMap {
    'glass-stepper-button': GlassStepperButton;
  }
}
