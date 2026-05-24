import { LitElement, html, css, type CSSResult } from 'lit';
import { property } from 'lit/decorators.js';

/**
 * `<glass-section-title>` — Uppercase letter-spaced eyebrow used as section
 * headers inside cards (presence, climate, media, etc.).
 *
 * No leading bullet/dot (the user has rejected those across the codebase).
 *
 * Slot `end` for optional trailing element (count pill, action chip).
 */
export class GlassSectionTitle extends LitElement {
  @property({ type: String }) label = '';

  static styles: CSSResult[] = [
    css`
      :host {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        width: 100%;
        min-height: 1.375rem;
        padding: 0 0.375rem;
        margin: 0 0 0.375rem;
        box-sizing: border-box;
      }
      .title {
        flex: 1;
        font-family: 'Plus Jakarta Sans', sans-serif;
        font-size: var(--fz-xs);
        font-weight: 700;
        letter-spacing: 1.5px;
        text-transform: uppercase;
        color: var(--t4);
        line-height: 1;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      ::slotted([slot='end']) {
        flex-shrink: 0;
      }
    `,
  ];

  protected render() {
    return html`
      <span class="title"><slot>${this.label}</slot></span>
      <slot name="end"></slot>
    `;
  }
}

try { customElements.define('glass-section-title', GlassSectionTitle); } catch { /* already registered */ }

declare global {
  interface HTMLElementTagNameMap {
    'glass-section-title': GlassSectionTitle;
  }
}
