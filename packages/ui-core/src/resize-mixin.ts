import { LitElement } from 'lit';
import { BREAKPOINTS, type CardSize } from './breakpoints.js';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Constructor<T = LitElement> = abstract new (...args: any[]) => T;

/**
 * Mixin that observes the host element's width and sets a `size` attribute
 * (`xs` | `sm` | `md` | `lg` | `xl`) on `:host`. CSS can then target
 * `:host([size="xs"])` etc. for responsive layout.
 */
export function ResizeMixin<T extends Constructor>(Base: T) {
  abstract class ResizeAware extends Base {
    private _ro?: ResizeObserver;
    private _cardSize: CardSize = 'md';

    override connectedCallback() {
      super.connectedCallback();
      this._ro = new ResizeObserver((entries) => {
        const w = entries[0]?.contentRect.width ?? (this as unknown as HTMLElement).offsetWidth;
        this._applySize(w);
      });
      this._ro.observe(this as unknown as Element);
    }

    override disconnectedCallback() {
      super.disconnectedCallback();
      this._ro?.disconnect();
      this._ro = undefined;
    }

    private _applySize(w: number) {
      let next: CardSize = 'xl';
      if (w < BREAKPOINTS.xs) next = 'xs';
      else if (w < BREAKPOINTS.sm) next = 'sm';
      else if (w < BREAKPOINTS.md) next = 'md';
      else if (w < BREAKPOINTS.lg) next = 'lg';

      if (next !== this._cardSize) {
        this._cardSize = next;
        (this as unknown as Element).setAttribute('size', next);
      }
    }
  }
  return ResizeAware as unknown as T;
}
