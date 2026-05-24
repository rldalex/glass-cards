import { LitElement, html, css, type CSSResult } from 'lit';
import { property } from 'lit/decorators.js';
import { motionMixin } from './motion-mixin';

/**
 * `<glass-drag-handle>` — Visual grip for draggable rows.
 *
 * Renders `mdi:drag` at low opacity, raises on hover. The actual drag
 * behavior is set up by the parent via pointer events or library
 * wrappers — this primitive is purely visual + cursor hint.
 *
 * Builtin hit-area extends the tactile region to var(--tap-lg) on coarse
 * pointers (the visual is intentionally compact at 20-24px). Place at
 * the start of a sortable row.
 */
export class GlassDragHandle extends LitElement {
  @property({ type: String, reflect: true }) size: 'sm' | 'md' = 'md';

  static styles: CSSResult[] = [
    motionMixin,
    css`
      :host {
        position: relative;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 1.25rem;
        height: 1.25rem;
        color: var(--t4);
        cursor: grab;
        flex-shrink: 0;
        transition: color var(--t-fast), opacity var(--t-fast);
        -webkit-tap-highlight-color: transparent;
      }
      :host([size='sm']) { width: 1rem; height: 1rem; }
      :host(:active) { cursor: grabbing; }
      @media (hover: hover) and (pointer: fine) {
        :host(:hover) { color: var(--t2); }
      }
      /* Builtin hit-area: 20px visual → 44px tactile on coarse pointers. */
      :host::before {
        content: '';
        position: absolute;
        inset: 0;
      }
      @media (pointer: coarse) {
        :host::before {
          inset: calc((var(--tap-lg) - 100%) / -2);
          min-width: var(--tap-lg);
          min-height: var(--tap-lg);
        }
      }
      ha-icon {
        --mdc-icon-size: 0.875rem;
        display: flex;
        align-items: center;
        justify-content: center;
        pointer-events: none;
      }
      :host([size='sm']) ha-icon { --mdc-icon-size: 0.75rem; }
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
