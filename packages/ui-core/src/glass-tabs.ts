import { LitElement, html, css, type CSSResult } from 'lit';
import { property } from 'lit/decorators.js';

export interface GlassTabItem {
  value: string;
  label: string;
  icon?: string;
}

/**
 * `<glass-tabs>` — Segmented control / tabs for switching between views.
 *
 * Used for: forecast types (hourly/daily), entity tabs in rooms, library
 * categories. Each tab is 44px tall for tactile accessibility.
 *
 * @fires glass-tab-change — { value: string }
 */
export class GlassTabs extends LitElement {
  @property({ type: Array }) items: GlassTabItem[] = [];
  @property({ type: String, reflect: true }) value = '';
  @property({ type: String, attribute: 'aria-label' }) ariaLabel: string | null = null;
  @property({ type: String, reflect: true }) layout: 'rail' | 'segmented' = 'rail';

  static styles: CSSResult[] = [
    css`
      :host {
        display: block;
        box-sizing: border-box;
      }
      .tabs {
        display: flex;
        align-items: center;
        gap: 0.25rem;
        background: var(--s1);
        border: 1px solid var(--b1);
        border-radius: var(--radius-lg);
        padding: 0.25rem;
      }
      :host([layout='rail']) .tabs {
        background: transparent;
        border: none;
        padding: 0;
        gap: 0.5rem;
      }
      .tab {
        position: relative;
        flex: 1;
        min-height: var(--tap-lg);
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.375rem;
        padding: 0 0.75rem;
        background: transparent;
        border: 1px solid transparent;
        border-radius: var(--radius-md);
        color: var(--t3);
        font-family: 'Plus Jakarta Sans', sans-serif;
        font-size: var(--fz-base);
        font-weight: 600;
        cursor: pointer;
        outline: none;
        white-space: nowrap;
        transition:
          color var(--t-fast),
          background var(--t-fast),
          border-color var(--t-fast);
        -webkit-tap-highlight-color: transparent;
      }
      :host([layout='rail']) .tab {
        border-color: var(--b2);
        background: var(--s1);
      }
      .tab[aria-selected='true'] {
        background: var(--s3);
        color: var(--t1);
      }
      :host([layout='rail']) .tab[aria-selected='true'] {
        background: rgba(var(--rgb-accent), 0.15);
        border-color: rgba(var(--rgb-accent), 0.35);
        color: var(--c-accent);
      }
      ha-icon {
        --mdc-icon-size: var(--icon-sm);
        flex-shrink: 0;
      }
      @media (hover: hover) and (pointer: fine) {
        .tab:hover { color: var(--t2); background: var(--s2); }
      }
      .tab:focus-visible {
        outline: 2px solid var(--c-accent);
        outline-offset: 2px;
      }
      .tab:active { transform: scale(0.97); }
    `,
  ];

  private _onTab(value: string): void {
    if (this.value === value) return;
    this.value = value;
    this.dispatchEvent(new CustomEvent('glass-tab-change', {
      detail: { value },
      bubbles: true,
      composed: true,
    }));
  }

  protected render() {
    return html`
      <div
        class="tabs"
        role="tablist"
        aria-label=${this.ariaLabel ?? 'tabs'}
      >
        ${this.items.map((item) => html`
          <button
            type="button"
            class="tab"
            role="tab"
            aria-selected=${this.value === item.value ? 'true' : 'false'}
            @click=${() => this._onTab(item.value)}
          >
            ${item.icon ? html`<ha-icon .icon=${item.icon}></ha-icon>` : null}
            <span>${item.label}</span>
          </button>
        `)}
      </div>
    `;
  }
}

try { customElements.define('glass-tabs', GlassTabs); } catch { /* already registered */ }

declare global {
  interface HTMLElementTagNameMap {
    'glass-tabs': GlassTabs;
  }
}
