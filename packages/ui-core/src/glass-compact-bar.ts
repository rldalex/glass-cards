import { LitElement, html, css, type CSSResult } from 'lit';
import { property } from 'lit/decorators.js';

/**
 * `<glass-compact-bar>` — The 52px horizontal bar used as the compact /
 * folded header row across every card (presence, light, climate, etc.).
 *
 * Structure (named slots):
 *   - `start`: leading icon / icon-button (e.g. light-icon-btn)
 *   - default: middle content (label, marquee, indicators)
 *   - `end`: trailing controls (chevron, toggle, action)
 *
 * The bar itself is not interactive — wrap each slotted item in its own
 * button (glass-icon-button, glass-toggle, etc.). For "tap row to expand",
 * use the host as a regular div and add a click handler on the parent
 * card via the existing _bindGesture helper.
 */
export class GlassCompactBar extends LitElement {
  @property({ type: Boolean, reflect: true }) dense = false;

  static styles: CSSResult[] = [
    css`
      :host {
        display: flex;
        align-items: center;
        gap: 0.625rem;
        box-sizing: border-box;
        width: 100%;
        min-height: 3.25rem;
        padding: 0.4375rem 0.875rem;
      }
      :host([dense]) {
        min-height: 2.75rem;
        padding: 0.25rem 0.75rem;
      }
      ::slotted([slot='start']),
      ::slotted([slot='end']) {
        flex-shrink: 0;
      }
      .middle {
        flex: 1;
        min-width: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 0.125rem;
      }
    `,
  ];

  protected render() {
    return html`
      <slot name="start"></slot>
      <div class="middle">
        <slot></slot>
      </div>
      <slot name="end"></slot>
    `;
  }
}

try { customElements.define('glass-compact-bar', GlassCompactBar); } catch { /* already registered */ }

declare global {
  interface HTMLElementTagNameMap {
    'glass-compact-bar': GlassCompactBar;
  }
}
