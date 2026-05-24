import { css, type CSSResult } from 'lit';

/**
 * Apply to any primitive that animates transforms/opacity/colors. Honours
 * the user's OS-level `prefers-reduced-motion: reduce` setting by
 * collapsing every animation and transition inside the primitive's shadow
 * DOM to ~0ms. Per DESIGN.md motion rules.
 *
 * Usage:
 * ```ts
 * import { motionMixin } from './motion-mixin';
 * static styles = [motionMixin, css`...`];
 * ```
 */
export const motionMixin: CSSResult = css`
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
`;
