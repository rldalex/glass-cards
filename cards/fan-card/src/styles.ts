import { css } from 'lit';

export const fanCardStyles = css`
    :host {
      width: 100%;
      max-width: 31.25rem;
      margin: 0 auto;
      user-select: none;
      -webkit-user-select: none;
    }

    /* ── Card Header ── */
    .card-header {
      display: flex; align-items: center; justify-content: space-between;
      padding: 0 0.375rem; margin-bottom: 0.375rem; min-height: 1.375rem;
    }
    .card-header-left { display: flex; align-items: center; gap: 0.5rem; }
    .card-title {
      font-size: var(--fz-xs); font-weight: 700; text-transform: uppercase;
      letter-spacing: 1.5px; color: var(--t4);
    }
    .card-count {
      display: inline-flex; align-items: center; justify-content: center;
      min-width: 0.875rem; height: 0.875rem; padding: 0 0.25rem;
      border-radius: var(--radius-full); font-size: var(--fz-xs); font-weight: 600;
      transition: background var(--t-med), color var(--t-med);
    }
    .card-count.some { background: rgba(var(--rgb-accent),0.15); color: var(--c-accent); }
    .card-count.none { background: var(--s2); color: var(--t3); }
    .card-count.all  { background: rgba(var(--rgb-accent),0.2); color: var(--c-accent); }

    /* ── Card Body ── */
    .fan-card { position: relative; padding: 0.125rem 0.875rem; }
    .card-inner {
      position: relative; z-index: 1;
      display: grid; grid-template-columns: 1fr 1fr; gap: 0;
    }

    .tint {
      transition: opacity var(--t-slow), background var(--t-slow);
    }

    /* ── Fan Row ── */
    .fan-row {
      display: flex; align-items: center; gap: 0.625rem;
      grid-column: 1 / -1;
      padding: 0.5rem 0.25rem; position: relative;
      transition: background var(--t-fast); border-radius: var(--radius-md);
    }
    .fan-row.compact { grid-column: span 1; min-width: 0; overflow: hidden; }
    .fan-row.compact-right { padding-left: 0.625rem; }
    .fan-row.compact-right::before {
      content: ''; position: absolute; left: 0; top: 20%; bottom: 20%; width: 0.0625rem;
      background: linear-gradient(to bottom, transparent, rgba(var(--rgb-white),0.08) 30%, rgba(var(--rgb-white),0.08) 70%, transparent);
    }
    /* No row-level hover: sub-buttons (icon-toggle + expand) carry their own. */
    @media (pointer: coarse) {
      .fan-row:active { animation: bounce 0.3s ease; }
    }

    /* ── Spinning animation (applies to the icon inside <glass-icon-button>) ── */
    @keyframes spin-fan {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    @keyframes spin-fan-reverse {
      from { transform: rotate(360deg); }
      to { transform: rotate(0deg); }
    }
    .fan-row.on glass-icon-button ha-icon.spinning {
      animation: spin-fan var(--spin-duration, 2s) linear infinite;
      will-change: transform;
    }
    .fan-row.on glass-icon-button ha-icon.spinning.reverse {
      animation: spin-fan-reverse var(--spin-duration, 2s) linear infinite;
      will-change: transform;
    }

    /* ── Expand Button ── */
    .fan-expand-btn {
      flex: 1; min-width: 0;
      display: flex; align-items: center; gap: 0.625rem;
      background: none; border: none; padding: 0;
      font-family: inherit; cursor: pointer; outline: none;
      text-align: left; color: inherit;
      -webkit-tap-highlight-color: transparent;
    }
    .fan-expand-btn:focus-visible {
      outline: 2px solid rgba(var(--rgb-white),0.25); outline-offset: 2px;
      border-radius: var(--radius-sm);
    }

    /* ── Fan Info ── */
    .fan-info { flex: 1; min-width: 0; }
    .fan-name {
      font-size: var(--fz-md); font-weight: 600; color: var(--t1); line-height: 1.2;
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }
    .fan-sub { display: flex; align-items: center; gap: 0.3125rem; margin-top: 0.125rem; }
    .fan-speed-text {
      font-size: var(--fz-sm); font-weight: 500; color: var(--t3);
      transition: color var(--t-med);
    }
    .fan-row.on .fan-speed-text { color: rgba(var(--rgb-accent),0.55); }

    .fan-direction {
      font-size: var(--fz-sm); font-weight: 400; color: var(--t4);
      display: flex; align-items: center; gap: 0.1875rem;
    }
    .fan-direction ha-icon {
      --mdc-icon-size: 0.6875rem;
      display: flex; align-items: center; justify-content: center;
    }

    .fan-dot {
      width: 0.375rem; height: 0.375rem; border-radius: 50%; flex-shrink: 0;
      background: var(--t4); transition: background var(--t-med), box-shadow var(--t-med);
    }
    .fan-row.on .fan-dot {
      background: var(--c-accent); box-shadow: 0 0 8px rgba(var(--rgb-accent),0.4);
    }

    /* Unavailable badge inline (replaces dot) */
    .fan-expand-btn .unavailable-badge {
      position: static;
      flex-shrink: 0;
      --mdc-icon-size: 0.75rem;
      color: var(--c-warning);
    }

    /* ── Fold separator ── */
    .fold-sep {
      grid-column: 1 / -1;
      height: 0.0625rem; margin: 0 0.75rem; overflow: hidden;
      background: linear-gradient(90deg, transparent, rgba(var(--rgb-accent),0.2), transparent);
      opacity: 0; transition: opacity var(--t-layout);
    }
    /* In a compact pair, anchor the separator under the opened fan only. */
    .fold-sep.fold-sep-left  { grid-column: 1 / -1; width: calc(50% - 0.75rem); margin-right: auto; }
    .fold-sep.fold-sep-right { grid-column: 1 / -1; width: calc(50% - 0.75rem); margin-left: auto; }
    .fold-sep.visible { opacity: 1; }

    /* ── Controls fold ── */
    .ctrl-fold {
      grid-column: 1 / -1;
      display: grid; grid-template-rows: 0fr;
      transition: grid-template-rows var(--t-layout);
      pointer-events: none;
    }
    .ctrl-fold.open { grid-template-rows: 1fr; pointer-events: auto; }
    .ctrl-fold-inner {
      overflow: hidden;
      opacity: 0; transition: opacity var(--t-fast);
    }
    .ctrl-fold.open .ctrl-fold-inner { opacity: 1; transition-delay: 0.1s; }

    .ctrl-panel {
      padding: 0.375rem 0 0.25rem;
      display: flex; flex-direction: column; gap: 0.75rem;
    }
    /* ── Fold sections (Vitesse / Mode / Direction / Oscillation) ── */
    .fan-section {
      display: flex; flex-direction: column; gap: 0.4375rem;
    }

    /* ── Speed steps ── */
    .speed-steps { display: flex; gap: 0.25rem; }
    .speed-step {
      flex: 1; height: 2.25rem; border-radius: var(--radius-md);
      background: var(--s1); border: 1px solid var(--b1);
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      font-family: inherit; font-size: var(--fz-base); font-weight: 700; color: var(--t3);
      cursor: pointer; transition: background var(--t-fast), border-color var(--t-fast), color var(--t-fast), transform var(--t-fast); outline: none; padding: 0.125rem 0;
      -webkit-tap-highlight-color: transparent;
    }
    @media (hover: hover) and (pointer: fine) {
      .speed-step:hover { background: var(--s3); border-color: var(--b2); color: var(--t2); }
    }
    .speed-step:focus-visible { outline: 2px solid rgba(var(--rgb-white),0.25); outline-offset: -2px; }
    @media (hover: hover) and (pointer: fine) {
      .speed-step:active { transform: scale(0.96); }
    }
    @media (pointer: coarse) {
      .speed-step:active { animation: bounce 0.3s ease; }
    }
    .speed-step.active {
      background: rgba(var(--rgb-accent),0.1); border-color: rgba(var(--rgb-accent),0.15);
      color: var(--c-accent);
    }
    .speed-step-pct {
      font-size: var(--fz-xxs); font-weight: 600; color: var(--t4);
      letter-spacing: 0.3px; margin-top: 0.0625rem;
    }
    .speed-step.active .speed-step-pct { color: rgba(var(--rgb-accent),0.55); }

    /* ── Slider ── */
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

    /* ── Mode chips ── */
    .mode-row { display: flex; gap: 0.375rem; flex-wrap: wrap; }

    /* ── Direction toggle ── */
    .direction-row { display: flex; align-items: center; gap: 0.625rem; }
    .direction-label {
      font-size: var(--fz-base); font-weight: 600; color: var(--t2); flex: 1;
      display: flex; align-items: center; gap: 0.375rem;
    }
    .direction-label ha-icon {
      --mdc-icon-size: 1rem;
      display: flex; align-items: center; justify-content: center;
      opacity: 0.6;
    }
    .direction-btns { display: flex; gap: 0.25rem; }

    /* ── Oscillation toggle ── */
    .osc-row { display: flex; align-items: center; gap: 0.625rem; }
    .osc-label {
      font-size: var(--fz-base); font-weight: 600; color: var(--t2); flex: 1;
      display: flex; align-items: center; gap: 0.375rem;
    }
    .osc-label ha-icon {
      --mdc-icon-size: 1rem;
      display: flex; align-items: center; justify-content: center;
      opacity: 0.6;
    }

    /* ── Ceiling light row ── */
    .ceiling-light-row {
      display: flex; align-items: center; gap: 0.625rem; padding: 0.375rem 0;
    }
    .ceiling-light-label {
      font-size: var(--fz-base); font-weight: 600; color: var(--t2); flex: 1;
      display: flex; align-items: center; gap: 0.375rem;
    }
    .ceiling-light-label ha-icon {
      --mdc-icon-size: 1rem;
      display: flex; align-items: center; justify-content: center;
      opacity: 0.6;
    }

    /* ── Separator ── */
    .ctrl-sep { height: 0.0625rem; background: var(--b1); margin: 0.125rem 0; }

  `;
