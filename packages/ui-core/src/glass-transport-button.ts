import { LitElement, html, css, type CSSResult } from 'lit';
import { property } from 'lit/decorators.js';

/**
 * `<glass-transport-button>` — Media transport control (play, pause, skip).
 *
 * Two variants:
 *   - `variant="standard"` (default): 44px tap target, secondary controls
 *   - `variant="main"`: 52px, circular emphasis (play/pause primary)
 *
 * Active state used by play-while-playing or shuffle/repeat toggles.
 */
export class GlassTransportButton extends LitElement {
  @property({ type: String }) icon = '';
  @property({ type: String, reflect: true }) variant: 'standard' | 'main' = 'standard';
  @property({ type: Boolean, reflect: true }) active = false;
  @property({ type: String, attribute: 'active-color' }) activeColor = 'accent';
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
        border-radius: 50%;
        background: var(--s2);
        border: 1px solid var(--b2);
        color: var(--t1);
        transition:
          background var(--t-fast),
          border-color var(--t-fast),
          color var(--t-fast),
          transform var(--t-fast);
        -webkit-tap-highlight-color: transparent;
      }
      :host([variant='main']) button {
        width: 3.25rem;
        height: 3.25rem;
        background: var(--s3);
        border-color: var(--b3);
      }

      ha-icon {
        --mdc-icon-size: var(--icon-md);
        pointer-events: none;
      }
      :host([variant='main']) ha-icon {
        --mdc-icon-size: var(--icon-lg);
      }

      :host([active]) button {
        background: rgba(var(--_ac-rgb, var(--rgb-accent)), 0.18);
        border-color: rgba(var(--_ac-rgb, var(--rgb-accent)), 0.35);
        color: rgb(var(--_ac-rgb, var(--rgb-accent)));
      }

      :host([disabled]) button {
        opacity: 0.4;
        pointer-events: none;
      }

      @media (hover: hover) and (pointer: fine) {
        button:hover { background: var(--s3); border-color: var(--b3); }
        :host([active]) button:hover {
          background: rgba(var(--_ac-rgb, var(--rgb-accent)), 0.25);
        }
      }
      button:active { transform: scale(0.94); }
      button:focus-visible {
        outline: 2px solid var(--c-accent);
        outline-offset: 2px;
      }
    `,
  ];

  private _resolveColor(): string {
    const name = this.activeColor;
    if (/^\d+\s*,\s*\d+\s*,\s*\d+$/.test(name)) return name;
    return `var(--rgb-${name})`;
  }

  protected render() {
    return html`
      <button
        type="button"
        style="--_ac-rgb:${this._resolveColor()}"
        ?disabled=${this.disabled}
        aria-label=${this.ariaLabel ?? this.icon ?? 'transport'}
        aria-pressed=${this.active ? 'true' : 'false'}
      >
        <slot>${this.icon ? html`<ha-icon .icon=${this.icon}></ha-icon>` : null}</slot>
      </button>
    `;
  }
}

try { customElements.define('glass-transport-button', GlassTransportButton); } catch { /* already registered */ }

declare global {
  interface HTMLElementTagNameMap {
    'glass-transport-button': GlassTransportButton;
  }
}
