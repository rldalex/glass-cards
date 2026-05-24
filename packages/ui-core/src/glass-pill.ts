import { LitElement, html, css, type CSSResult } from 'lit';
import { property } from 'lit/decorators.js';

/**
 * `<glass-pill>` — Decorative pill (count, status badge, mode label).
 *
 * Static by default. Pass `interactive` to make it a button (with 44px
 * tap area via hit-area extension on coarse pointers).
 *
 * Pills are intentionally small visually (16-22px) for density. The
 * extension only kicks in when `interactive` is set.
 */
export class GlassPill extends LitElement {
  @property({ type: String, reflect: true }) tone: 'neutral' | 'accent' | 'success' | 'warning' | 'alert' | 'info' = 'neutral';
  @property({ type: Boolean, reflect: true }) interactive = false;
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: String, reflect: true }) size: 'sm' | 'md' = 'md';
  @property({ type: String, attribute: 'aria-label' }) ariaLabel: string | null = null;

  static styles: CSSResult[] = [
    css`
      :host {
        display: inline-flex;
        box-sizing: border-box;
        -webkit-tap-highlight-color: transparent;
      }
      .pill {
        position: relative;
        box-sizing: border-box;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.25rem;
        min-height: 1.125rem;
        padding: 0 0.5rem;
        border-radius: var(--radius-full);
        background: var(--s2);
        border: 1px solid var(--b1);
        color: var(--t2);
        font-family: 'Plus Jakarta Sans', sans-serif;
        font-size: var(--fz-xs);
        font-weight: 700;
        line-height: 1;
        white-space: nowrap;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        cursor: default;
        transition:
          background var(--t-fast),
          border-color var(--t-fast),
          color var(--t-fast);
      }
      :host([size='sm']) .pill {
        min-height: 0.875rem;
        padding: 0 0.375rem;
        font-size: var(--fz-xxs);
      }

      /* Tones — semantic colors. */
      :host([tone='accent']) .pill {
        background: rgba(var(--rgb-accent), 0.15);
        border-color: rgba(var(--rgb-accent), 0.3);
        color: var(--c-accent);
      }
      :host([tone='success']) .pill {
        background: rgba(var(--rgb-success), 0.15);
        border-color: rgba(var(--rgb-success), 0.3);
        color: var(--c-success);
      }
      :host([tone='warning']) .pill {
        background: rgba(var(--rgb-warning), 0.15);
        border-color: rgba(var(--rgb-warning), 0.3);
        color: var(--c-warning);
      }
      :host([tone='alert']) .pill {
        background: rgba(var(--rgb-alert), 0.15);
        border-color: rgba(var(--rgb-alert), 0.3);
        color: var(--c-alert);
      }
      :host([tone='info']) .pill {
        background: rgba(var(--rgb-info), 0.15);
        border-color: rgba(var(--rgb-info), 0.3);
        color: var(--c-info);
      }

      :host([interactive]) .pill {
        cursor: pointer;
      }
      :host([interactive]) .pill::after {
        content: '';
        position: absolute;
        inset: 0;
      }
      @media (pointer: coarse) {
        :host([interactive]) .pill::after {
          inset: calc((var(--tap-lg) - 1.125rem) / -2) calc((var(--tap-lg) - 100%) / -2);
        }
      }

      :host([disabled]) .pill {
        opacity: 0.4;
        pointer-events: none;
      }

      :host([interactive]) .pill:focus-visible {
        outline: 2px solid var(--c-accent);
        outline-offset: 2px;
      }
    `,
  ];

  protected render() {
    const tag = this.interactive ? 'button' : 'span';
    if (tag === 'button') {
      return html`
        <button
          type="button"
          class="pill"
          ?disabled=${this.disabled}
          aria-label=${this.ariaLabel ?? ''}
        >
          <slot></slot>
        </button>
      `;
    }
    return html`<span class="pill" role="status"><slot></slot></span>`;
  }
}

try { customElements.define('glass-pill', GlassPill); } catch { /* already registered */ }

declare global {
  interface HTMLElementTagNameMap {
    'glass-pill': GlassPill;
  }
}
