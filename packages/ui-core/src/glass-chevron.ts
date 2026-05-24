import { LitElement, html, css, type CSSResult } from 'lit';
import { property } from 'lit/decorators.js';

/**
 * `<glass-chevron>` — Decorative chevron that rotates when `open`.
 *
 * Used to signal expandable rows, compact-bar folds, and dropdown
 * triggers. Closed = chevron points down (▼). Open = points up (▲)
 * via a `transform: rotate(180deg)` with `--t-fast` easing.
 *
 * The chevron is non-interactive — wrap it in `<glass-icon-button>` or
 * `<button>` if you need a click target. Most uses are slotted next to
 * the row's existing click area.
 *
 * Sizes: sm (0.75rem / 12px) for inline indicators, md (1rem / 16px)
 * default for compact bars, lg (1.25rem / 20px) for dropdown triggers.
 */
export class GlassChevron extends LitElement {
  @property({ type: Boolean, reflect: true }) open = false;
  @property({ type: String, reflect: true }) size: 'sm' | 'md' | 'lg' = 'md';
  @property({ type: String, reflect: true }) tone: 'neutral' | 'accent' | 'muted' = 'neutral';

  static styles: CSSResult[] = [
    css`
      :host {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        color: var(--t2);
        transition: color var(--t-fast);
      }
      :host([tone='accent']) { color: var(--c-accent); }
      :host([tone='muted']) { color: var(--t4); }

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
