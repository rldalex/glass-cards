import { LitElement, html, css, type CSSResult } from 'lit';
import { property } from 'lit/decorators.js';
import { motionMixin } from './motion-mixin';

/**
 * `<glass-chip>` — Pill-shaped selectable chip with 44px tap target.
 *
 * Use for: mode selectors, presets, scene chips, source pickers, tag filters.
 * Always has a `min-height` of var(--tap-lg) regardless of font size.
 *
 * The host renders an internal `<button>`. Provide a label via default slot
 * (and optionally an `icon` MDI name on the left).
 */
export class GlassChip extends LitElement {
  @property({ type: String }) icon = '';
  @property({ type: Boolean, reflect: true }) active = false;
  @property({ type: String, attribute: 'active-color' }) activeColor = 'accent';
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: String, reflect: true }) size: 'sm' | 'md' = 'md';
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
        gap: 0.375rem;
        min-height: var(--tap-lg);
        padding: 0 0.875rem;
        border-radius: var(--radius-md);
        background: var(--s1);
        border: 1px solid var(--b2);
        color: var(--t2);
        font-family: 'Plus Jakarta Sans', sans-serif;
        font-size: var(--fz-base);
        font-weight: 600;
        cursor: pointer;
        outline: none;
        white-space: nowrap;
        transition:
          color var(--t-fast),
          background var(--t-fast),
          border-color var(--t-fast),
          transform var(--t-fast);
        -webkit-tap-highlight-color: transparent;
      }
      /* Compact chip stays 44px tactile via hit-area, visual height shrinks. */
      :host([size='sm']) button {
        min-height: 1.75rem;
        padding: 0 0.625rem;
        font-size: var(--fz-sm);
      }
      :host([size='sm']) button::after {
        content: '';
        position: absolute;
        inset: 0;
      }
      @media (pointer: coarse) {
        :host([size='sm']) button::after {
          inset: calc((var(--tap-lg) - 1.75rem) / -2) 0;
        }
      }

      ::slotted(*) { pointer-events: none; }
      ha-icon {
        --mdc-icon-size: var(--icon-sm);
        flex-shrink: 0;
        color: inherit;
      }

      :host([active]) button {
        background: rgba(var(--_ac-rgb, var(--rgb-accent)), 0.15);
        border-color: rgba(var(--_ac-rgb, var(--rgb-accent)), 0.3);
        color: rgb(var(--_ac-rgb, var(--rgb-accent)));
      }

      :host([disabled]) button {
        opacity: 0.4;
        pointer-events: none;
      }

      @media (hover: hover) and (pointer: fine) {
        button:hover {
          background: var(--s2);
          border-color: var(--b3);
          color: var(--t1);
        }
        :host([active]) button:hover {
          background: rgba(var(--_ac-rgb, var(--rgb-accent)), 0.22);
        }
      }
      button:active { transform: scale(0.97); }
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
        aria-label=${this.ariaLabel ?? ''}
        aria-pressed=${this.active ? 'true' : 'false'}
      >
        ${this.icon ? html`<ha-icon .icon=${this.icon}></ha-icon>` : null}
        <slot></slot>
      </button>
    `;
  }
}

try { customElements.define('glass-chip', GlassChip); } catch { /* already registered */ }

declare global {
  interface HTMLElementTagNameMap {
    'glass-chip': GlassChip;
  }
}
