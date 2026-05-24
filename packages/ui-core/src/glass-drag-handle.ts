import { LitElement, html, css, type CSSResult } from 'lit';
import { property } from 'lit/decorators.js';

/**
 * `<glass-drag-handle>` — Visual grip for draggable rows.
 *
 * Renders `mdi:drag` at low opacity, raises to higher opacity on hover.
 * The actual drag behavior is set up by the parent via pointer events
 * or library wrappers — this primitive is purely visual + cursor hint.
 *
 * Place at the start or end of a sortable row.
 */
export class GlassDragHandle extends LitElement {
  @property({ type: String, reflect: true }) size: 'sm' | 'md' = 'md';

  static styles: CSSResult[] = [
    css`
      :host {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        color: var(--t4);
        cursor: grab;
        flex-shrink: 0;
        transition: color var(--t-fast), opacity var(--t-fast);
        -webkit-tap-highlight-color: transparent;
      }
      :host(:active) { cursor: grabbing; }
      @media (hover: hover) and (pointer: fine) {
        :host(:hover) { color: var(--t2); }
      }
      ha-icon {
        --mdc-icon-size: 1.125rem;
        display: flex;
        align-items: center;
        justify-content: center;
        pointer-events: none;
      }
      :host([size='sm']) ha-icon { --mdc-icon-size: 0.875rem; }
    `,
  ];

  protected render() {
    return html`<ha-icon .icon=${'mdi:drag'} aria-hidden="true"></ha-icon>`;
  }
}

try { customElements.define('glass-drag-handle', GlassDragHandle); } catch { /* already registered */ }

declare global {
  interface HTMLElementTagNameMap {
    'glass-drag-handle': GlassDragHandle;
  }
}
