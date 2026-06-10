import { LitElement, html, css, nothing } from 'lit';
import { property, state } from 'lit/decorators.js';

/**
 * glass-icon-portal — fullscreen MDI icon picker (backdrop + search + grid).
 *
 * Replaces the three near-identical imperative portals that lived in the
 * config panel (room-detail, unassigned, title). The element renders its own
 * backdrop and is meant to be appended to document.body — use the
 * `openIconPortal()` helper below rather than instantiating it in a template:
 * a fixed-position overlay inside the panel DOM would be clipped by the glass
 * containers' backdrop-filter stacking contexts.
 *
 * i18n-agnostic by design (like glass-dropdown): labels come in as props.
 *
 * Events: `glass-icon-select` (detail: { icon }) — '' means "no icon" when
 * `allow-none` is set; `glass-icon-close` on backdrop click / Escape.
 */
export class GlassIconPortal extends LitElement {
  /** Currently selected icon (highlighted in the grid). */
  @property() value = '';
  /** Show the leading "no icon" cell that selects ''. */
  @property({ type: Boolean, attribute: 'allow-none' }) allowNone = false;
  /** Header label. */
  @property({ attribute: 'header-text' }) headerText = '';
  /** Message when the search has no result. */
  @property({ attribute: 'empty-text' }) emptyText = '';
  @property({ attribute: 'search-placeholder' }) searchPlaceholder = 'mdi:...';
  /** Icon list; when omitted, load it via loadMdiIconList() and set it. */
  @property({ attribute: false }) icons: string[] = [];

  @state() private _search = '';

  private _restoreFocusEl: HTMLElement | null = null;
  private _boundKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.stopPropagation();
      this._close();
    }
  };

  static styles = css`
    :host {
      position: fixed;
      inset: 0;
      z-index: 10000;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1.5rem;
      background: rgba(0, 0, 0, 0.5);
      font-family: 'Plus Jakarta Sans', sans-serif;
      box-sizing: border-box;
    }
    .popup {
      width: 100%;
      max-width: 25rem;
      max-height: 70vh;
      display: flex;
      flex-direction: column;
      border-radius: 22px;
      background: linear-gradient(135deg, #1a2233 0%, #141c2a 50%, #172030 100%);
      box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.1), 0 8px 32px rgba(0, 0, 0, 0.4);
      border: 1px solid rgba(255, 255, 255, 0.08);
      overflow: hidden;
    }
    .head {
      padding: 0.875rem 1rem 0.625rem;
      display: flex;
      flex-direction: column;
      gap: 0.625rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    }
    .head-title {
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: rgba(255, 255, 255, 0.45);
    }
    .search {
      width: 100%;
      padding: 0.5rem 0.75rem;
      border-radius: 10px;
      border: 1px solid rgba(255, 255, 255, 0.08);
      background: rgba(255, 255, 255, 0.04);
      color: rgba(255, 255, 255, 0.88);
      font-size: 13px;
      outline: none;
      box-sizing: border-box;
      font-family: inherit;
    }
    .grid-wrap {
      overflow: auto;
      flex: 1;
      padding: 0.5rem;
      scrollbar-width: none;
    }
    .grid-wrap::-webkit-scrollbar {
      display: none;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      gap: 4px;
    }
    .cell {
      width: 100%;
      aspect-ratio: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 10px;
      border: 1px solid rgba(255, 255, 255, 0.06);
      background: rgba(255, 255, 255, 0.04);
      color: rgba(255, 255, 255, 0.88);
      cursor: pointer;
      padding: 0;
    }
    .cell.selected {
      border: 2px solid rgba(129, 140, 248, 0.6);
      background: rgba(129, 140, 248, 0.15);
      color: rgb(129, 140, 248);
    }
    .cell ha-icon {
      --mdc-icon-size: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .cell.none ha-icon {
      opacity: 0.4;
    }
    .empty {
      grid-column: 1 / -1;
      text-align: center;
      padding: 2rem;
      color: rgba(255, 255, 255, 0.35);
      font-size: 13px;
    }
  `;

  connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('role', 'dialog');
    this.setAttribute('aria-modal', 'true');
    // Capture the invoker before stealing focus, restore it on close
    let active: Element | null = document.activeElement;
    while (active?.shadowRoot?.activeElement) active = active.shadowRoot.activeElement;
    this._restoreFocusEl = active as HTMLElement | null;
    document.addEventListener('keydown', this._boundKeydown, true);
    this.addEventListener('click', this._onBackdropClick);
    this.updateComplete.then(() => {
      (this.renderRoot.querySelector('.search') as HTMLInputElement | null)?.focus();
    });
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    document.removeEventListener('keydown', this._boundKeydown, true);
    const restore = this._restoreFocusEl;
    this._restoreFocusEl = null;
    if (restore?.isConnected) restore.focus({ preventScroll: true });
  }

  private _onBackdropClick = (e: MouseEvent) => {
    if (e.target === this) this._close();
  };

  private _close(): void {
    this.dispatchEvent(new CustomEvent('glass-icon-close', { bubbles: true, composed: true }));
  }

  private _select(icon: string): void {
    this.dispatchEvent(new CustomEvent('glass-icon-select', {
      detail: { icon }, bubbles: true, composed: true,
    }));
  }

  private _filtered(): string[] {
    const q = this._search.toLowerCase().trim();
    if (!q) return this.icons.slice(0, 120);
    return this.icons.filter((i) => i.toLowerCase().includes(q)).slice(0, 120);
  }

  render() {
    const icons = this._filtered();
    return html`
      <div class="popup">
        <div class="head">
          ${this.headerText ? html`<span class="head-title">${this.headerText}</span>` : nothing}
          <input
            class="search"
            placeholder=${this.searchPlaceholder}
            .value=${this._search}
            aria-label=${this.headerText || this.searchPlaceholder}
            @input=${(e: Event) => { this._search = (e.target as HTMLInputElement).value; }}
          />
        </div>
        <div class="grid-wrap">
          <div class="grid">
            ${this.allowNone ? html`
              <button
                class="cell none ${this.value === '' ? 'selected' : ''}"
                @click=${() => this._select('')}
              ><ha-icon .icon=${'mdi:cancel'}></ha-icon></button>
            ` : nothing}
            ${icons.map((icon) => html`
              <button
                class="cell ${icon === this.value ? 'selected' : ''}"
                title=${icon}
                @click=${() => this._select(icon)}
              ><ha-icon .icon=${icon}></ha-icon></button>
            `)}
            ${icons.length === 0 && this._search ? html`
              <div class="empty">${this.emptyText}</div>
            ` : nothing}
          </div>
        </div>
      </div>
    `;
  }
}

try { customElements.define('glass-icon-portal', GlassIconPortal); } catch { /* already registered */ }

// — Shared MDI icon list loader —
// Probes a hidden ha-icon-picker for HA's full icon list. Cached for the
// whole session: the list never changes and the probe costs a frame.

let _iconListCache: string[] | null = null;
let _iconListPending: Promise<string[]> | null = null;

export async function loadMdiIconList(hass: unknown): Promise<string[]> {
  if (_iconListCache) return _iconListCache;
  if (_iconListPending) return _iconListPending;
  _iconListPending = (async () => {
    let picker: (HTMLElement & { hass: unknown }) | null = null;
    try {
      picker = document.createElement('ha-icon-picker') as HTMLElement & { hass: unknown };
      picker.hass = hass;
      picker.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden;opacity:0;pointer-events:none';
      document.body.appendChild(picker);
      await new Promise((r) => setTimeout(r, 50));
      const gp = picker.shadowRoot?.querySelector('ha-generic-picker') as
        | (HTMLElement & { getItems(): Promise<{ id: string }[]> })
        | null;
      if (gp?.getItems) {
        const items = await gp.getItems();
        if (items?.length) _iconListCache = items.map((i) => i.id);
      }
    } catch { /* not in a HA context (dev harness) — leave empty */ } finally {
      picker?.remove();
      _iconListPending = null;
    }
    return _iconListCache ?? [];
  })();
  return _iconListPending;
}

export interface IconPortalOptions {
  /** hass object, used to probe HA's icon list (ignored if `icons` given). */
  hass?: unknown;
  /** Currently selected icon. */
  value?: string;
  /** Show the "no icon" cell (selects ''). */
  allowNone?: boolean;
  headerText?: string;
  emptyText?: string;
  searchPlaceholder?: string;
  /** Inject the icon list directly (showcase/tests) instead of probing HA. */
  icons?: string[];
  onSelect: (icon: string) => void;
  onClose?: () => void;
}

/**
 * Open a glass-icon-portal appended to document.body (escapes the panel's
 * backdrop-filter stacking contexts). Returns a close() function; the portal
 * also closes itself on backdrop click, Escape, and selection.
 */
export function openIconPortal(opts: IconPortalOptions): () => void {
  const portal = document.createElement('glass-icon-portal') as GlassIconPortal;
  portal.value = opts.value ?? '';
  portal.allowNone = opts.allowNone ?? false;
  portal.headerText = opts.headerText ?? '';
  portal.emptyText = opts.emptyText ?? '';
  if (opts.searchPlaceholder) portal.searchPlaceholder = opts.searchPlaceholder;

  const close = () => {
    portal.remove();
    opts.onClose?.();
  };
  portal.addEventListener('glass-icon-close', () => close());
  portal.addEventListener('glass-icon-select', (e) => {
    opts.onSelect((e as CustomEvent<{ icon: string }>).detail.icon);
    close();
  });
  document.body.appendChild(portal);

  if (opts.icons) {
    portal.icons = opts.icons;
  } else {
    void loadMdiIconList(opts.hass).then((icons) => {
      if (portal.isConnected) portal.icons = icons;
    });
  }
  return close;
}
