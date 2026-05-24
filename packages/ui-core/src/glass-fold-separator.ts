import { LitElement, css, html, type CSSResult } from 'lit';
import { property } from 'lit/decorators.js';

/**
 * `<glass-fold-separator>` — Gradient hairline (transparent → accent →
 * transparent) used above and below the opened panel of a fold, in lieu
 * of a bordered wrapper.
 *
 * The host carries no margin by default. Pair with `--t-layout` opacity
 * fade if you want it to appear synchronously with the fold opening.
 */
export class GlassFoldSeparator extends LitElement {
  @property({ type: String, reflect: true }) variant: 'full' | 'half' = 'full';
  @property({ type: String, attribute: 'tint' }) tint = 'accent';

  static styles: CSSResult[] = [
    css`
      :host {
        display: block;
        box-sizing: border-box;
        width: 100%;
        height: 1px;
      }
      .line {
        height: 1px;
        background: linear-gradient(
          90deg,
          transparent,
          rgba(var(--_sep-rgb, var(--rgb-accent)), 0.15),
          transparent
        );
      }
      :host([variant='half']) .line {
        margin: 0 auto;
        width: 50%;
      }
    `,
  ];

  private _resolveTint(): string {
    const name = this.tint;
    if (/^\d+\s*,\s*\d+\s*,\s*\d+$/.test(name)) return name;
    return `var(--rgb-${name})`;
  }

  protected render() {
    return html`<div class="line" style="--_sep-rgb:${this._resolveTint()}"></div>`;
  }
}

try { customElements.define('glass-fold-separator', GlassFoldSeparator); } catch { /* already registered */ }

declare global {
  interface HTMLElementTagNameMap {
    'glass-fold-separator': GlassFoldSeparator;
  }
}
