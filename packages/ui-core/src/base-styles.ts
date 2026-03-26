import { css, type CSSResult } from 'lit';

/** Base host styles — replaces the old max-width: 31.25rem pattern. */
export const cardBase: CSSResult = css`
  :host {
    display: block;
    width: 100%;
    box-sizing: border-box;
  }
`;

/** Responsive 2-column grid — collapses to 1 column on xs/sm. */
export const gridResponsive: CSSResult = css`
  .grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--sp-3, 0.75rem);
  }
  :host([size="xs"]) .grid,
  :host([size="sm"]) .grid {
    grid-template-columns: 1fr;
  }
  :host([size="xl"]) .grid {
    gap: var(--sp-4, 1rem);
  }
`;
