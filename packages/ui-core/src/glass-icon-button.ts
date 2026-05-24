import { LitElement, html, css, type CSSResult } from 'lit';
import { property } from 'lit/decorators.js';

/**
 * `<glass-icon-button>` — Square rounded icon button, mobile-first 44px tap target.
 *
 * The host is the interactive button itself: bind `@click` directly on the
 * element. Internally renders a `<button>` so keyboard + a11y work natively.
 *
 * Sizes: sm (2rem visual + ::after hit-area), md (var(--tap-lg) = 44px),
 *        lg (3.25rem = 52px). Hit-area always reaches at least 44px in
 *        `@media (pointer: coarse)`.
 *
 * Active states are colored via `active-color` (semantic token name like
 * `accent`, `light-glow`, `spotify`, or a raw `R,G,B` triplet for custom).
 */
export class GlassIconButton extends LitElement {
  @property({ type: String }) icon = '';
  @property({ type: Boolean, reflect: true }) active = false;
  @property({ type: String, attribute: 'active-color' }) activeColor = 'accent';
  @property({ type: String, reflect: true }) size: 'xs' | 'sm' | 'md' | 'lg' = 'md';
  @property({ type: Boolean, reflect: true }) glow = false;
  @property({ type: Boolean, reflect: true }) unavailable = false;
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: String, attribute: 'aria-label' }) ariaLabel: string | null = null;

  static styles: CSSResult[] = [
    css`
      :host {
        display: inline-flex;
        box-sizing: border-box;
        -webkit-tap-highlight-color: transparent;
      }
      button {
        position: relative;
        box-sizing: border-box;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        padding: 0;
        margin: 0;
        font-family: inherit;
        outline: none;
        cursor: pointer;
        border-radius: var(--radius-md);
        background: var(--s2);
        border: 1px solid var(--b1);
        color: var(--t3);
        transition:
          color var(--t-fast),
          background var(--t-fast),
          border-color var(--t-fast),
          filter var(--t-fast),
          transform var(--t-fast);
        -webkit-tap-highlight-color: transparent;
      }
      /* Sizes — md is the canonical 44px tap target. */
      :host([size='xs']) button { width: 1.75rem; height: 1.75rem; border-radius: var(--radius-sm); }
      :host([size='sm']) button { width: 2rem; height: 2rem; }
      :host([size='md']) button { width: var(--tap-lg); height: var(--tap-lg); }
      :host([size='lg']) button { width: 3.25rem; height: 3.25rem; }

      /* Hit-area extension: any size < 44px gets a transparent ::after that
         widens the touchable region to at least var(--tap-lg) on coarse
         pointers (mobile/tablet). Desktop hover stays pixel-perfect. */
      button::after {
        content: '';
        position: absolute;
        inset: 0;
      }
      @media (pointer: coarse) {
        :host([size='xs']) button::after {
          inset: calc((var(--tap-lg) - 1.75rem) / -2);
        }
        :host([size='sm']) button::after {
          inset: calc((var(--tap-lg) - 2rem) / -2);
        }
      }

      /* Icon sizing — defaults to icon-md; override per-size. */
      ::slotted(ha-icon),
      ::slotted(*) {
        --mdc-icon-size: var(--icon-md);
        display: flex;
        align-items: center;
        justify-content: center;
        pointer-events: none;
      }
      :host([size='xs']) ::slotted(ha-icon) { --mdc-icon-size: var(--icon-xs); }
      :host([size='sm']) ::slotted(ha-icon) { --mdc-icon-size: var(--icon-sm); }
      :host([size='lg']) ::slotted(ha-icon) { --mdc-icon-size: var(--icon-lg); }

      /* Active state. The 'active-color' attribute selects which --rgb-* the
         button tints with; we set --_ac-rgb on the host from JS (render). */
      :host([active]) button {
        background: rgba(var(--_ac-rgb, var(--rgb-accent)), 0.1);
        border-color: rgba(var(--_ac-rgb, var(--rgb-accent)), 0.18);
        color: rgb(var(--_ac-rgb, var(--rgb-accent)));
      }
      :host([active][glow]) button {
        filter: drop-shadow(0 0 6px rgba(var(--_ac-rgb, var(--rgb-accent)), 0.4));
      }

      /* Unavailable state — alert border replaces normal border. */
      :host([unavailable]) button {
        border-color: var(--c-alert);
      }

      /* Disabled. */
      :host([disabled]) button {
        opacity: 0.4;
        pointer-events: none;
      }

      /* Press feedback. */
      @media (hover: hover) and (pointer: fine) {
        button:hover { background: var(--s3); border-color: var(--b2); color: var(--t2); }
        :host([active]) button:hover {
          background: rgba(var(--_ac-rgb, var(--rgb-accent)), 0.15);
        }
      }
      button:active { transform: scale(0.96); }

      /* Focus ring. */
      button:focus-visible {
        outline: 2px solid var(--c-accent);
        outline-offset: 2px;
      }
    `,
  ];

  /** Resolve the active-color name into an --rgb-* triplet reference. */
  private _resolveColor(): string {
    const name = this.activeColor;
    // Raw triplet like "255,128,0" — used as-is.
    if (/^\d+\s*,\s*\d+\s*,\s*\d+$/.test(name)) return name;
    // Otherwise treat as a token name. Caller's responsibility to ensure
    // --rgb-<name> is defined on the host or an ancestor.
    return `var(--rgb-${name})`;
  }

  protected render() {
    const ariaLabel = this.ariaLabel ?? this.icon ?? 'button';
    return html`
      <button
        type="button"
        style="--_ac-rgb:${this._resolveColor()}"
        ?disabled=${this.disabled}
        aria-label=${ariaLabel}
        aria-pressed=${this.active ? 'true' : 'false'}
      >
        <slot>${this.icon ? html`<ha-icon .icon=${this.icon}></ha-icon>` : null}</slot>
      </button>
    `;
  }
}

try { customElements.define('glass-icon-button', GlassIconButton); } catch { /* already registered */ }

declare global {
  interface HTMLElementTagNameMap {
    'glass-icon-button': GlassIconButton;
  }
}
