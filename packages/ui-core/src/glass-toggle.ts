import { LitElement, html, css, type CSSResult } from 'lit';
import { property } from 'lit/decorators.js';

/**
 * `<glass-toggle>` — Switch on/off with 44px tap wrapper.
 *
 * The visual knob track is small (40x22) for visual density, but the host
 * itself is the tap target and always reaches var(--tap-lg). Internally a
 * native `<button role="switch">` for keyboard + screen-reader support.
 *
 * @fires glass-toggle-change — { checked: boolean }
 */
export class GlassToggle extends LitElement {
  @property({ type: Boolean, reflect: true }) checked = false;
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: String, attribute: 'active-color' }) activeColor = 'accent';
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
        min-width: var(--tap-lg);
        min-height: var(--tap-lg);
        padding: 0 0.375rem;
        margin: 0;
        background: transparent;
        border: none;
        outline: none;
        cursor: pointer;
        font-family: inherit;
        -webkit-tap-highlight-color: transparent;
      }
      .track {
        position: relative;
        width: 2.5rem;
        height: 1.375rem;
        border-radius: var(--radius-full);
        background: var(--s2);
        border: 1px solid var(--b2);
        transition:
          background var(--t-fast),
          border-color var(--t-fast);
      }
      .knob {
        position: absolute;
        top: 50%;
        left: 0.125rem;
        width: 0.875rem;
        height: 0.875rem;
        border-radius: 50%;
        background: var(--t1);
        transform: translateY(-50%);
        transition: transform var(--t-fast);
        will-change: transform;
      }
      :host([checked]) .track {
        background: rgba(var(--_ac-rgb, var(--rgb-accent)), 0.4);
        border-color: rgba(var(--_ac-rgb, var(--rgb-accent)), 0.5);
      }
      :host([checked]) .knob {
        transform: translate(1.125rem, -50%);
        background: rgb(var(--_ac-rgb, var(--rgb-accent)));
      }
      :host([disabled]) {
        opacity: 0.4;
        pointer-events: none;
      }
      @media (hover: hover) and (pointer: fine) {
        button:hover .track {
          border-color: var(--b3);
        }
      }
      button:focus-visible .track {
        outline: 2px solid var(--c-accent);
        outline-offset: 2px;
      }
      button:active .knob { transform: translateY(-50%) scale(0.92); }
      :host([checked]) button:active .knob {
        transform: translate(1.125rem, -50%) scale(0.92);
      }
    `,
  ];

  private _resolveColor(): string {
    const name = this.activeColor;
    if (/^\d+\s*,\s*\d+\s*,\s*\d+$/.test(name)) return name;
    return `var(--rgb-${name})`;
  }

  private _onClick(e: Event): void {
    e.stopPropagation();
    if (this.disabled) return;
    this.checked = !this.checked;
    this.dispatchEvent(new CustomEvent('glass-toggle-change', {
      detail: { checked: this.checked },
      bubbles: true,
      composed: true,
    }));
  }

  protected render() {
    return html`
      <button
        type="button"
        role="switch"
        style="--_ac-rgb:${this._resolveColor()}"
        ?disabled=${this.disabled}
        aria-checked=${this.checked ? 'true' : 'false'}
        aria-label=${this.ariaLabel ?? 'toggle'}
        @click=${this._onClick}
      >
        <span class="track">
          <span class="knob"></span>
        </span>
      </button>
    `;
  }
}

try { customElements.define('glass-toggle', GlassToggle); } catch { /* already registered */ }

declare global {
  interface HTMLElementTagNameMap {
    'glass-toggle': GlassToggle;
  }
}
