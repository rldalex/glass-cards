import { css } from 'lit';

export const titleCardStyles = css`
    :host {
      width: 100%;
      max-width: 31.25rem;
      margin: 0 auto;
      user-select: none;
      -webkit-user-select: none;
    }

    .title-card {
      display: flex; flex-direction: column; align-items: center;
      gap: 0.25rem; padding: 0.25rem 1rem 0;
      text-align: center;
    }

    .title-text {
      font-size: var(--fz-xl); font-weight: 700; color: var(--t1);
      letter-spacing: -0.3px; line-height: 1.2;
      display: flex; align-items: center; gap: 0.875rem;
      width: 100%;
    }
    .title-text::before, .title-text::after {
      content: ''; flex: 1; height: 0.0625rem;
      background: linear-gradient(90deg, transparent, var(--b3));
    }
    .title-text::after {
      background: linear-gradient(90deg, var(--b3), transparent);
    }

    /* ── Dash trigger ── */
    .dash-trigger {
      display: flex; align-items: center; justify-content: center;
      min-height: 1.25rem;
      padding: 0.25rem 1rem;
      cursor: pointer; border: none; background: none; outline: none;
      -webkit-tap-highlight-color: transparent;
      border-radius: var(--radius-full);
      transition: background var(--t-fast);
      position: relative;
    }
    .dash-trigger::before { content: ''; position: absolute; inset: -10px -8px; }
    @media (hover: hover) and (pointer: fine) {
      .dash-trigger:hover { background: var(--s1); }
    }
    .dash-trigger:focus-visible { outline: 2px solid rgba(var(--rgb-white),0.25); outline-offset: 2px; }
    @media (pointer: coarse) {
      .dash-trigger:active { transform: scale(0.96); }
    }

    .dash-line {
      width: 1.25rem; height: 0.1875rem; border-radius: 1.5px;
      background: var(--t4);
      transition: background var(--t-med), width var(--t-med), box-shadow var(--t-med);
    }

    /* ── Fold section ── */
    .fold-section {
      display: grid;
      grid-template-rows: 0fr;
      transition: grid-template-rows var(--t-layout);
      overflow: hidden;
      width: 100%;
    }
    .fold-section.open { grid-template-rows: 1fr; }
    .fold-section-inner {
      overflow: hidden;
      opacity: 0;
      transition: opacity 0.2s var(--ease-std) 0s;
    }
    .fold-section.open .fold-section-inner {
      opacity: 1;
      transition: opacity 0.2s var(--ease-std) 0.1s;
    }

    /* Fold separator */
    .fold-sep {
      height: 0.0625rem; width: 80%; margin: 0.25rem auto;
      background: linear-gradient(90deg, transparent, var(--b3), transparent);
    }

    /* ── Chips group ── */
    .chips-group-label {
      font-size: var(--fz-xs); font-weight: 600; text-transform: uppercase;
      letter-spacing: 1px; color: var(--t3);
      text-align: center; padding: 0.375rem 0 0.125rem;
    }
    .chips-group + .chips-group .chips-group-label {
      border-top: 1px solid var(--b1);
      margin: 0 20%; padding-top: 0.5rem;
    }

    .chips-row {
      display: flex; flex-wrap: wrap; justify-content: center;
      gap: 0.375rem; padding: 0.25rem 0.25rem 0.5rem;
    }

    /* ── Chip pulse animation (applied to <glass-chip> on user click) ── */
    @keyframes chip-pulse {
      0%   { box-shadow: inset 0 0 0 0 currentColor; }
      50%  { box-shadow: inset 0 0 8px 1px currentColor; }
      100% { box-shadow: inset 0 0 0 0 currentColor; }
    }
    glass-chip.pulsing { animation: chip-pulse 0.5s var(--ease-out); border-radius: var(--radius-md); }

    /* ── Period indicator (crossfade) ── */
    .period-indicator {
      position: relative;
      height: 0.875rem;
      width: 100%;
    }
    .period-item {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: var(--fz-xs);
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      color: var(--t3);
      white-space: nowrap;
      user-select: none;
      -webkit-user-select: none;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.35s var(--ease-std);
    }
    .period-item.active {
      opacity: 1;
      pointer-events: auto;
    }
    .period-item ha-icon {
      margin-right: 0.25rem;
    }
    .period-item::after {
      content: '';
      display: inline-block;
      width: calc(9px + 0.25rem);
    }

    @media (prefers-reduced-motion: reduce) {
      .period-item, glass-chip, .dash-trigger, .fold-section, .fold-section-inner, .dash-line {
        transition-duration: 0.01ms !important;
      }
      glass-chip.pulsing { animation: none; }
    }
`;
