import { LitElement, html, css, type CSSResult } from 'lit';
import { property } from 'lit/decorators.js';

/**
 * `<glass-chevron>` — Chevron that rotates when `open`.
 *
 * Used to signal expandable rows, compact-bar folds, and dropdown
 * triggers. Closed = points down (▼). Open = points up (▲) via
 * `transform: rotate(180deg)` with `--t-fast` easing.
 *
 * Two modes:
 *   - Decorative (default): non-interactive — the parent row owns the
 *     click target. Use when the row already wraps the chevron.
 *   - `interactive`: the chevron itself is the tap target, with 44px
 *     hit-area via builtin `::after` extension. Emits a standard `click`
 *     that bubbles. Use when there's no surrounding clickable region.
 *
 * Sizes: sm (0.75rem / 12px) for inline indicators, md (1rem / 16px)
 * default for compact bars, lg (1.25rem / 20px) for dropdown triggers.
 */
export class GlassChevron extends LitElement {
  @property({ type: Boolean, reflect: true }) open = false;
  @property({ type: String, reflect: true }) size: 'sm' | 'md' | 'lg' = 'md';
  @property({ type: String, reflect: true }) tone: 'neutral' | 'accent' | 'muted' = 'neutral';
  @property({ type: Boolean, reflect: true }) interactive = false;
  @property({ type: String, attribute: 'aria-label' }) ariaLabel: string | null = null;

  static styles: CSSResult[] = [
    css`
      :host {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        color: var(--t2);
        transition: color var(--t-fast);
        position: relative;
      }
      :host([tone='accent']) { color: var(--c-accent); }
      :host([tone='muted']) { color: var(--t4); }

      :host([interactive]) {
        cursor: pointer;
        -webkit-tap-highlight-color: transparent;
      }
      /* Builtin 44px hit-area when the chevron is its own tap target. */
      :host([interactive])::after {
        content: '';
        position: absolute;
        inset: 0;
      }
      @media (pointer: coarse) {
        :host([interactive])::after {
          inset: calc((var(--tap-lg) - 100%) / -2);
          min-width: var(--tap-lg);
          min-height: var(--tap-lg);
        }
      }
      :host([interactive]):focus-visible {
        outline: 2px solid var(--c-accent);
        outline-offset: 4px;
        border-radius: var(--radius-sm);
      }

      ha-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        transition: transform var(--t-fast);
        transform-origin: center;
      }
      :host([size='sm']) ha-icon { --mdc-icon-size: 0.75rem; }
      :host([size='md']) ha-icon { --mdc-icon-size: 1rem; }
      :host([size='lg']) ha-icon { --mdc-icon-size: 1.25rem; }

      :host([open]) ha-icon {
        transform: rotate(180deg);
      }
    `,
  ];

  connectedCallback(): void {
    super.connectedCallback();
    this.updateInteractiveAttrs();
  }

  protected updated(changed: Map<string, unknown>): void {
    super.updated(changed);
    if (changed.has('interactive')) this.updateInteractiveAttrs();
  }

  private updateInteractiveAttrs(): void {
    if (this.interactive) {
      this.setAttribute('role', 'button');
      if (!this.hasAttribute('tabindex')) this.setAttribute('tabindex', '0');
      this.addEventListener('keydown', this.onKeyDown);
    } else {
      this.removeAttribute('role');
      this.removeAttribute('tabindex');
      this.removeEventListener('keydown', this.onKeyDown);
    }
  }

  private onKeyDown = (e: KeyboardEvent): void => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this.click();
    }
  };

  protected render() {
    return html`<ha-icon .icon=${'mdi:chevron-down'} aria-hidden="true"></ha-icon>`;
  }
}

try { customElements.define('glass-chevron', GlassChevron); } catch { /* already registered */ }

declare global {
  interface HTMLElementTagNameMap {
    'glass-chevron': GlassChevron;
  }
}
