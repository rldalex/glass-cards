import { css } from 'lit';

export const coverCardStyles = css`
    :host {
      width: 100%;
      max-width: 31.25rem;
      margin: 0 auto;
      user-select: none;
      -webkit-user-select: none;
    }

    .cover-header {
      display: flex; align-items: center; justify-content: space-between;
      padding: 0 0.375rem;
      margin-bottom: 0.375rem; min-height: 1.375rem;
    }
    .cover-header-left { display: flex; align-items: center; gap: 0.5rem; }
    .cover-title {
      font-size: var(--fz-xs); font-weight: 700; text-transform: uppercase;
      letter-spacing: 1.5px; color: var(--t4);
    }
    .cover-count {
      display: inline-flex; align-items: center; justify-content: center;
      min-width: 0.875rem; height: 0.875rem; padding: 0 0.25rem;
      border-radius: var(--radius-full); font-size: var(--fz-xs); font-weight: 600;
      transition: background var(--t-med), color var(--t-med);
    }
    .cover-count.some { background: rgba(var(--rgb-purple),0.15); color: var(--cv-color, #a78bfa); }
    .cover-count.none { background: var(--s2); color: var(--t3); }
    .cover-count.all  { background: rgba(var(--rgb-purple),0.2); color: var(--cv-color, #a78bfa); }

    .cover-card { position: relative; padding: 0.125rem 0.875rem; }
    .card-inner {
      position: relative; z-index: 1;
      display: grid; grid-template-columns: 1fr 1fr; gap: 0;
    }

    /* Tint */
    .tint {
      position: absolute; inset: 0; border-radius: inherit;
      pointer-events: none; z-index: 0;
      transition: opacity var(--t-slow), background var(--t-slow);
    }

    /* ── Row ── */
    .cv-row {
      display: flex; align-items: center; gap: 0.625rem;
      grid-column: 1 / -1;
      padding: 0.5rem 0.25rem; position: relative;
      border-radius: var(--radius-md);
      transition: background var(--t-fast);
    }
    .cv-row.compact { grid-column: span 1; min-width: 0; overflow: hidden; }
    .cv-row.compact-right { padding-left: 0.625rem; }
    .cv-row.compact-right::before {
      content: ''; position: absolute; left: 0; top: 20%; bottom: 20%; width: 0.0625rem;
      background: linear-gradient(180deg, transparent, var(--b2), transparent);
    }
    /* No row-level hover: sub-buttons (icon-toggle + expand) carry their own. */
    @media (pointer: coarse) {
      .cv-row:active { animation: bounce 0.3s ease; }
    }


    .cv-expand-btn {
      flex: 1; min-width: 0;
      display: flex; align-items: center; gap: 0.625rem;
      background: none; border: none; padding: 0;
      font-family: inherit; cursor: pointer; outline: none;
      text-align: left;
      -webkit-tap-highlight-color: transparent;
    }
    .cv-expand-btn:focus-visible { outline: 2px solid rgba(var(--rgb-white),0.25); outline-offset: 2px; border-radius: var(--radius-sm); }

    /* Cover icon button — handled by <glass-icon-button>. Only override the
       active tint to match the entity colour token used elsewhere. */

    .cv-info { flex: 1; min-width: 0; }
    .cv-name {
      font-size: var(--fz-md); font-weight: 600; color: var(--t1); line-height: 1.2;
      overflow: hidden; white-space: nowrap; text-overflow: ellipsis;
    }
    .cv-sub { display: flex; align-items: center; gap: 0.3125rem; margin-top: 0.125rem; }
    .cv-state-text {
      font-size: var(--fz-sm); font-weight: 500; color: var(--t3);
      transition: color var(--t-med);
    }
    .cv-row.open .cv-state-text { color: rgba(var(--rgb-purple),0.6); }
    .cv-position {
      font-size: var(--fz-lg); font-weight: 700; color: var(--t3);
      font-variant-numeric: tabular-nums; flex-shrink: 0;
      transition: color var(--t-med);
    }
    .cv-position .unit { font-size: var(--fz-sm); font-weight: 500; }
    .cv-row.open .cv-position { color: var(--cv-color, #a78bfa); }

    .cv-dot {
      width: 0.375rem; height: 0.375rem; border-radius: 50%; flex-shrink: 0;
      background: var(--t4); transition: background var(--t-med), box-shadow var(--t-med);
    }
    .cv-row.open .cv-dot {
      background: var(--cv-color, #a78bfa); box-shadow: 0 0 8px rgba(var(--rgb-purple),0.4);
    }

    /* Unavailable badge inline (replaces dot) */
    .cv-expand-btn .unavailable-badge {
      position: static;
      flex-shrink: 0;
      --mdc-icon-size: 0.75rem;
      color: var(--c-warning);
    }

    /* ── Fold ── */
    .fold-sep-left  { grid-column: 1 / -1; width: calc(50% - 0.75rem); margin-right: auto; }
    .fold-sep-right { grid-column: 1 / -1; width: calc(50% - 0.75rem); margin-left: auto; }
    .fold-sep {
      grid-column: 1 / -1;
      height: 0.0625rem; margin: 0 0.75rem; overflow: hidden;
      background: linear-gradient(90deg, transparent, rgba(var(--rgb-purple),0.25), transparent);
      opacity: 0; transition: opacity var(--t-layout);
    }
    .fold-sep.visible { opacity: 1; }

    .ctrl-fold {
      grid-column: 1 / -1;
      display: grid; grid-template-rows: 0fr;
      transition: grid-template-rows var(--t-layout);
      pointer-events: none;
    }
    .ctrl-fold.open { grid-template-rows: 1fr; pointer-events: auto; }
    .ctrl-fold-inner {
      overflow: hidden; opacity: 0;
      transition: opacity var(--t-fast);
    }
    .ctrl-fold.open .ctrl-fold-inner { opacity: 1; transition-delay: 0.1s; }

    .ctrl-panel {
      padding: 0.375rem 0 0.25rem;
      display: flex; flex-direction: column; gap: 0.75rem;
    }
    /* ── Fold sections (Position / Inclinaison / Préréglages) ── */
    .cover-section { display: flex; flex-direction: column; gap: 0.4375rem; }

    /* Transport */
    .transport-row {
      display: flex; align-items: center; justify-content: center; gap: 0.375rem;
    }

    /* Slider */
    .slider-wrap { display: flex; align-items: center; gap: 0.5rem; }
    .slider-icon {
      display: flex; align-items: center; justify-content: center;
      width: 1.75rem; height: 1.75rem; flex-shrink: 0;
    }
    .slider-icon ha-icon {
      --mdc-icon-size: var(--icon-md);
      display: flex; align-items: center; justify-content: center;
      color: var(--t3);
    }
    glass-slider { flex: 1; }

    /* Presets */
    .preset-row { display: flex; gap: 0.375rem; flex-wrap: wrap; }

    .ctrl-sep { height: 0.0625rem; background: var(--b1); margin: 0.125rem 0; }
  `;
