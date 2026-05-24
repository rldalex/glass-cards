import { LitElement, html, css, type CSSResult } from 'lit';
import { property } from 'lit/decorators.js';

/**
 * `<glass-empty-state>` — Centered icon + title + optional subtitle.
 *
 * Used when a list / view has no data: "Aucune lampe configurée",
 * "Connecte-toi à Spotify", "Aucun événement aujourd'hui".
 *
 * Variants:
 *   - `default` (neutral)
 *   - `alert` (tinted with alert color — for error states)
 *   - `compact` (smaller, inline use in folds)
 *
 * The default slot lets you add action buttons under the text.
 */
export class GlassEmptyState extends LitElement {
  @property({ type: String }) icon = '';
  @property({ type: String }) title = '';
  @property({ type: String }) subtitle = '';
  @property({ type: String, reflect: true }) variant: 'default' | 'alert' | 'compact' = 'default';

  static styles: CSSResult[] = [
    css`
      :host {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        padding: 1.5rem 1rem;
        text-align: center;
        color: var(--t3);
      }
      :host([variant='compact']) {
        padding: 0.75rem 0.5rem;
        gap: 0.25rem;
      }

      .icon-wrap {
        width: 3.25rem;
        height: 3.25rem;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--s2);
        border: 1px solid var(--b1);
        color: var(--t3);
        margin-bottom: 0.25rem;
      }
      :host([variant='compact']) .icon-wrap {
        width: 2rem;
        height: 2rem;
        margin-bottom: 0;
      }
      :host([variant='alert']) .icon-wrap {
        background: rgba(var(--rgb-alert), 0.1);
        border-color: rgba(var(--rgb-alert), 0.25);
        color: var(--c-alert);
      }
      .icon-wrap ha-icon {
        --mdc-icon-size: 1.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      :host([variant='compact']) .icon-wrap ha-icon { --mdc-icon-size: 1rem; }

      .title {
        font-family: 'Plus Jakarta Sans', sans-serif;
        font-size: var(--fz-md);
        font-weight: 600;
        color: var(--t1);
        line-height: 1.3;
      }
      :host([variant='compact']) .title { font-size: var(--fz-sm); }

      .subtitle {
        font-size: var(--fz-sm);
        color: var(--t3);
        line-height: 1.4;
        max-width: 16rem;
      }
      :host([variant='compact']) .subtitle { font-size: var(--fz-xs); }

      .actions {
        display: flex;
        gap: 0.5rem;
        margin-top: 0.5rem;
      }
    `,
  ];

  protected render() {
    return html`
      ${this.icon ? html`
        <div class="icon-wrap">
          <ha-icon .icon=${this.icon}></ha-icon>
        </div>
      ` : null}
      ${this.title ? html`<div class="title">${this.title}</div>` : null}
      ${this.subtitle ? html`<div class="subtitle">${this.subtitle}</div>` : null}
      <div class="actions"><slot></slot></div>
    `;
  }
}

try { customElements.define('glass-empty-state', GlassEmptyState); } catch { /* already registered */ }

declare global {
  interface HTMLElementTagNameMap {
    'glass-empty-state': GlassEmptyState;
  }
}
