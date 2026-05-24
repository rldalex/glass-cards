import { LitElement, html, css, nothing, type CSSResult, type PropertyValues } from 'lit';
import { property, state, query } from 'lit/decorators.js';

export interface GlassDropdownItem {
  value: string;
  label: string;
  icon?: string;
}

/**
 * `<glass-dropdown>` — Single-select dropdown with optional search.
 *
 * Trigger button with caret expands a floating menu. Items can be
 * filtered when `searchable` is set. Closes on outside-click or Escape.
 *
 * @fires glass-dropdown-change — { value: string }
 */
export class GlassDropdown extends LitElement {
  @property({ type: Array }) items: GlassDropdownItem[] = [];
  @property({ type: String, reflect: true }) value = '';
  @property({ type: String }) label = '';
  @property({ type: String }) icon = '';
  @property({ type: String }) placeholder = '';
  /** Placeholder shown inside the search input. English fallback —
   *  consumers pass a localised string. */
  @property({ type: String, attribute: 'search-placeholder' }) searchPlaceholder = 'Search…';
  /** Text rendered when the search yields no matching item. English fallback. */
  @property({ type: String, attribute: 'empty-text' }) emptyText = 'No results';
  @property({ type: Boolean }) searchable = false;
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: String, attribute: 'aria-label' }) ariaLabel: string | null = null;

  @state() private _open = false;
  @state() private _query = '';
  @state() private _activeIndex = -1;

  @query('.dropdown-search') private _searchInput?: HTMLInputElement;

  private _onDocClick = (e: MouseEvent): void => {
    if (!this._open) return;
    if (!e.composedPath().includes(this)) this._close();
  };

  static styles: CSSResult[] = [
    css`
      :host {
        display: block;
        position: relative;
        box-sizing: border-box;
      }
      .trigger {
        width: 100%;
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        min-height: var(--tap-lg);
        padding: 0 0.875rem;
        background: var(--s2);
        border: 1px solid var(--b2);
        border-radius: var(--radius-lg);
        color: var(--t2);
        font-family: 'Plus Jakarta Sans', sans-serif;
        font-size: var(--fz-base);
        font-weight: 600;
        text-align: left;
        cursor: pointer;
        outline: none;
        transition: background var(--t-fast), border-color var(--t-fast);
        -webkit-tap-highlight-color: transparent;
      }
      .trigger ha-icon {
        --mdc-icon-size: 1rem;
        flex-shrink: 0;
        color: var(--t3);
      }
      .trigger .label {
        flex: 1;
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .trigger .label.empty { color: var(--t4); }

      @media (hover: hover) and (pointer: fine) {
        .trigger:hover { background: var(--s3); border-color: var(--b3); color: var(--t1); }
      }
      .trigger:focus-visible { outline: 2px solid var(--c-accent); outline-offset: 2px; }

      :host([disabled]) .trigger {
        opacity: 0.5;
        pointer-events: none;
      }

      .menu {
        position: absolute;
        top: calc(100% + 0.375rem);
        left: 0;
        right: 0;
        z-index: 20;
        max-height: 12.5rem;
        overflow-y: auto;
        padding: 0.25rem;
        background: #1e2433;
        border: 1px solid var(--b2);
        border-radius: var(--radius-lg);
        box-shadow: 0 12px 40px rgba(var(--rgb-black), 0.5);
        opacity: 0;
        transform: translateY(-4px);
        pointer-events: none;
        transition: opacity var(--t-fast), transform var(--t-fast);
        scrollbar-width: none;
      }
      .menu::-webkit-scrollbar { display: none; }
      :host([open]) .menu,
      .menu.open {
        opacity: 1;
        transform: translateY(0);
        pointer-events: auto;
      }
      .dropdown-search {
        width: calc(100% - 0.5rem);
        margin: 0.25rem;
        padding: 0.4375rem 0.625rem;
        border-radius: var(--radius-sm);
        border: 1px solid var(--b1);
        background: var(--s1);
        color: var(--t1);
        font-family: inherit;
        font-size: var(--fz-base);
        outline: none;
        box-sizing: border-box;
      }
      .dropdown-search:focus { border-color: var(--b3); }
      .dropdown-search::placeholder { color: var(--t4); }

      .item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        width: 100%;
        min-height: 2.25rem;
        padding: 0.5rem 0.75rem;
        background: transparent;
        border: none;
        border-radius: var(--radius-md);
        color: var(--t2);
        font-family: inherit;
        font-size: var(--fz-base);
        font-weight: 500;
        text-align: left;
        cursor: pointer;
        outline: none;
        transition: background var(--t-fast), color var(--t-fast);
        -webkit-tap-highlight-color: transparent;
      }
      .item ha-icon {
        --mdc-icon-size: 1rem;
        flex-shrink: 0;
      }
      .item:hover, .item.active-row {
        background: var(--s3);
        color: var(--t1);
      }
      .item.selected { color: var(--c-accent); }
      .empty {
        padding: 0.5rem 0.75rem;
        font-size: var(--fz-sm);
        color: var(--t4);
        text-align: center;
      }
    `,
  ];

  connectedCallback(): void {
    super.connectedCallback();
    document.addEventListener('click', this._onDocClick, true);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    document.removeEventListener('click', this._onDocClick, true);
  }

  protected updated(changed: PropertyValues): void {
    super.updated(changed);
    if (changed.has('_open')) {
      this.toggleAttribute('open', this._open);
      if (this._open && this.searchable) {
        // Focus search after the transition
        requestAnimationFrame(() => this._searchInput?.focus());
      }
    }
  }

  private _filteredItems(): GlassDropdownItem[] {
    if (!this._query) return this.items;
    const q = this._query.toLowerCase();
    return this.items.filter((it) =>
      it.label.toLowerCase().includes(q) ||
      it.value.toLowerCase().includes(q),
    );
  }

  private _open$(): void {
    if (this.disabled) return;
    this._open = true;
    this._activeIndex = -1;
  }

  private _close(): void {
    this._open = false;
    this._query = '';
  }

  private _toggleOpen(): void {
    if (this._open) this._close(); else this._open$();
  }

  private _selectItem(value: string): void {
    this.value = value;
    this.dispatchEvent(new CustomEvent('glass-dropdown-change', {
      detail: { value },
      bubbles: true,
      composed: true,
    }));
    this._close();
  }

  private _onKeyDown(e: KeyboardEvent): void {
    if (!this._open) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
        e.preventDefault();
        this._open$();
      }
      return;
    }
    const filtered = this._filteredItems();
    switch (e.key) {
      case 'Escape':
        e.preventDefault();
        this._close();
        break;
      case 'ArrowDown':
        e.preventDefault();
        this._activeIndex = Math.min(filtered.length - 1, this._activeIndex + 1);
        break;
      case 'ArrowUp':
        e.preventDefault();
        this._activeIndex = Math.max(0, this._activeIndex - 1);
        break;
      case 'Enter':
        e.preventDefault();
        if (this._activeIndex >= 0 && filtered[this._activeIndex]) {
          this._selectItem(filtered[this._activeIndex].value);
        }
        break;
    }
  }

  protected render() {
    const filtered = this._filteredItems();
    const selected = this.items.find((it) => it.value === this.value);
    const displayLabel = selected?.label || this.label || this.placeholder || '';

    return html`
      <button
        type="button"
        class="trigger"
        ?disabled=${this.disabled}
        aria-haspopup="listbox"
        aria-expanded=${this._open ? 'true' : 'false'}
        aria-label=${this.ariaLabel ?? displayLabel}
        @click=${this._toggleOpen}
        @keydown=${this._onKeyDown}
      >
        ${selected?.icon ? html`<ha-icon .icon=${selected.icon}></ha-icon>`
          : this.icon ? html`<ha-icon .icon=${this.icon}></ha-icon>` : null}
        <span class="label ${selected ? '' : 'empty'}">${displayLabel}</span>
        <glass-chevron ?open=${this._open} size="sm" tone="muted"></glass-chevron>
      </button>
      <div class="menu ${this._open ? 'open' : ''}" role="listbox">
        ${this.searchable ? html`
          <input
            class="dropdown-search"
            type="text"
            .value=${this._query}
            placeholder=${this.searchPlaceholder}
            @input=${(e: Event) => { this._query = (e.target as HTMLInputElement).value; this._activeIndex = 0; }}
            @keydown=${this._onKeyDown}
          />
        ` : nothing}
        ${filtered.length === 0
          ? html`<div class="empty">${this.emptyText}</div>`
          : filtered.map((it, i) => html`
              <button
                type="button"
                role="option"
                class="item ${it.value === this.value ? 'selected' : ''} ${i === this._activeIndex ? 'active-row' : ''}"
                aria-selected=${it.value === this.value ? 'true' : 'false'}
                @click=${() => this._selectItem(it.value)}
                @mouseenter=${() => { this._activeIndex = i; }}
              >
                ${it.icon ? html`<ha-icon .icon=${it.icon}></ha-icon>` : null}
                <span>${it.label}</span>
              </button>
            `)}
      </div>
    `;
  }
}

try { customElements.define('glass-dropdown', GlassDropdown); } catch { /* already registered */ }

declare global {
  interface HTMLElementTagNameMap {
    'glass-dropdown': GlassDropdown;
  }
}
