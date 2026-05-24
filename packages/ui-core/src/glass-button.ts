import { LitElement, html, css, type CSSResult } from 'lit';
import { property } from 'lit/decorators.js';
import { motionMixin } from './motion-mixin';

/**
 * `<glass-button>` — Text or icon+text button at 44px (save/cancel/locate).
 *
 * For icon-only buttons in dense layouts prefer `<glass-icon-button>`.
 * For mode/preset chips prefer `<glass-chip>`.
 *
 * Variants:
 *   - `primary` (default): accent background, white text
 *   - `secondary`: surface s2 background, neutral text
 *   - `ghost`: transparent, used for cancel/back actions
 *   - `danger`: alert background, used for destructive actions
 */
export class GlassButton extends LitElement {
  @property({ type: String }) icon = '';
  @property({ type: String, reflect: true }) variant: 'primary' | 'secondary' | 'ghost' | 'danger' = 'secondary';
  @property({ type: String, reflect: true }) size: 'sm' | 'md' = 'md';
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean, reflect: true }) loading = false;
  @property({ type: String, attribute: 'aria-label' }) ariaLabel: string | null = null;

  static styles: CSSResult[] = [
    motionMixin,
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
        gap: 0.5rem;
        min-height: var(--tap-lg);
        padding: 0 1rem;
        border-radius: var(--radius-md);
        background: var(--s2);
        border: 1px solid var(--b2);
        color: var(--t1);
        font-family: 'Plus Jakarta Sans', sans-serif;
        font-size: var(--fz-base);
        font-weight: 600;
        cursor: pointer;
        outline: none;
        white-space: nowrap;
        transition:
          background var(--t-fast),
          border-color var(--t-fast),
          color var(--t-fast),
          transform var(--t-fast);
        -webkit-tap-highlight-color: transparent;
      }
      :host([size='sm']) button {
        min-height: 2.25rem;
        padding: 0 0.75rem;
        font-size: var(--fz-sm);
      }
      :host([size='sm']) button::after {
        content: '';
        position: absolute;
        inset: 0;
      }
      @media (pointer: coarse) {
        :host([size='sm']) button::after {
          inset: calc((var(--tap-lg) - 2.25rem) / -2) 0;
        }
      }

      :host([variant='primary']) button {
        background: rgba(var(--rgb-accent), 0.85);
        border-color: rgba(var(--rgb-accent), 1);
        color: #fff;
      }
      :host([variant='ghost']) button {
        background: transparent;
        border-color: var(--b1);
        color: var(--t2);
      }
      :host([variant='danger']) button {
        background: rgba(var(--rgb-alert), 0.15);
        border-color: rgba(var(--rgb-alert), 0.4);
        color: var(--c-alert);
      }

      ha-icon {
        --mdc-icon-size: var(--icon-sm);
        flex-shrink: 0;
      }

      :host([disabled]) button,
      :host([loading]) button {
        opacity: 0.5;
        pointer-events: none;
      }

      @media (hover: hover) and (pointer: fine) {
        button:hover {
          background: var(--s3);
          border-color: var(--b3);
        }
        :host([variant='primary']) button:hover {
          background: rgba(var(--rgb-accent), 1);
        }
        :host([variant='danger']) button:hover {
          background: rgba(var(--rgb-alert), 0.25);
        }
      }
      button:active { transform: scale(0.97); }
      button:focus-visible {
        outline: 2px solid var(--c-accent);
        outline-offset: 2px;
      }

      .spinner {
        width: 1rem;
        height: 1rem;
        border: 2px solid rgba(var(--rgb-white), 0.3);
        border-top-color: rgba(var(--rgb-white), 0.9);
        border-radius: 50%;
        animation: spin 0.7s linear infinite;
      }
      @keyframes spin { to { transform: rotate(360deg); } }
    `,
  ];

  protected render() {
    return html`
      <button
        type="button"
        ?disabled=${this.disabled || this.loading}
        aria-label=${this.ariaLabel ?? ''}
        aria-busy=${this.loading ? 'true' : 'false'}
      >
        ${this.loading
          ? html`<span class="spinner" aria-hidden="true"></span>`
          : this.icon
            ? html`<ha-icon .icon=${this.icon}></ha-icon>`
            : null}
        <slot></slot>
      </button>
    `;
  }
}

try { customElements.define('glass-button', GlassButton); } catch { /* already registered */ }

declare global {
  interface HTMLElementTagNameMap {
    'glass-button': GlassButton;
  }
}
