import { LitElement, html, css, type CSSResult } from 'lit';
import { property, query } from 'lit/decorators.js';

/**
 * `<glass-form-input>` — Text input / textarea wrapper with 44px height
 * and consistent glass styling.
 *
 * @fires glass-input — { value: string } on every change
 * @fires glass-submit — { value: string } when user presses Enter
 *                       (or implicit form submit). Not fired for textarea.
 */
export class GlassFormInput extends LitElement {
  @property({ type: String }) value = '';
  @property({ type: String }) placeholder = '';
  @property({ type: String }) type: 'text' | 'search' | 'email' | 'number' = 'text';
  @property({ type: Boolean }) multiline = false;
  @property({ type: Number }) rows = 3;
  @property({ type: Boolean }) disabled = false;
  @property({ type: Number, attribute: 'max-length' }) maxLength?: number;
  @property({ type: String, attribute: 'aria-label' }) ariaLabel: string | null = null;

  @query('.input') private _input!: HTMLInputElement | HTMLTextAreaElement;

  static styles: CSSResult[] = [
    css`
      :host {
        display: block;
        box-sizing: border-box;
      }
      .wrapper {
        position: relative;
        display: flex;
        align-items: center;
        background: var(--s1);
        border: 1px solid var(--b2);
        border-radius: var(--radius-md);
        transition: border-color var(--t-fast), background var(--t-fast);
      }
      .wrapper:focus-within {
        border-color: rgba(var(--rgb-accent), 0.5);
        background: var(--s2);
      }
      .input {
        flex: 1;
        min-height: var(--tap-lg);
        padding: 0 0.875rem;
        background: transparent;
        border: none;
        outline: none;
        color: var(--t1);
        font-family: 'Plus Jakarta Sans', sans-serif;
        font-size: var(--fz-base);
        font-weight: 500;
        width: 100%;
        box-sizing: border-box;
        -webkit-tap-highlight-color: transparent;
      }
      textarea.input {
        resize: vertical;
        padding: 0.625rem 0.875rem;
        line-height: 1.4;
      }
      .input::placeholder {
        color: var(--t4);
      }
      :host([disabled]) .wrapper {
        opacity: 0.4;
        pointer-events: none;
      }
      ::slotted([slot='trailing']) {
        flex-shrink: 0;
        margin-right: 0.25rem;
      }
    `,
  ];

  /** Focus the underlying input. */
  focusInput(): void {
    this._input?.focus();
  }

  /** Get the current value (also accessible via .value). */
  getValue(): string {
    return this._input?.value ?? this.value;
  }

  private _onInput(e: Event): void {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement;
    this.value = target.value;
    this.dispatchEvent(new CustomEvent('glass-input', {
      detail: { value: this.value },
      bubbles: true,
      composed: true,
    }));
  }

  private _onKey(e: KeyboardEvent): void {
    if (e.key === 'Enter' && !this.multiline && !e.shiftKey) {
      e.preventDefault();
      this.dispatchEvent(new CustomEvent('glass-submit', {
        detail: { value: this.value },
        bubbles: true,
        composed: true,
      }));
    }
  }

  protected render() {
    return html`
      <div class="wrapper">
        ${this.multiline
          ? html`<textarea
              class="input"
              .value=${this.value}
              placeholder=${this.placeholder}
              ?disabled=${this.disabled}
              rows=${this.rows}
              maxlength=${this.maxLength ?? ''}
              aria-label=${this.ariaLabel ?? ''}
              @input=${this._onInput}
            ></textarea>`
          : html`<input
              class="input"
              type=${this.type}
              .value=${this.value}
              placeholder=${this.placeholder}
              ?disabled=${this.disabled}
              maxlength=${this.maxLength ?? ''}
              aria-label=${this.ariaLabel ?? ''}
              @input=${this._onInput}
              @keydown=${this._onKey}
            />`}
        <slot name="trailing"></slot>
      </div>
    `;
  }
}

try { customElements.define('glass-form-input', GlassFormInput); } catch { /* already registered */ }

declare global {
  interface HTMLElementTagNameMap {
    'glass-form-input': GlassFormInput;
  }
}
