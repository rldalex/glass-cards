import { css } from 'lit';

export const climateCardStyles = css`
    :host {
      width: 100%;
      max-width: 31.25rem;
      margin: 0 auto;
      user-select: none;
      -webkit-user-select: none;
      color: var(--t1);

      /* Climate tokens */
      --cl-heat: #f97316;
      --cl-heat-bg: rgba(var(--rgb-heat), 0.1);
      --cl-heat-border: rgba(var(--rgb-heat), 0.15);
      --cl-heat-glow: rgba(var(--rgb-heat), 0.4);
      --cl-heat-sub: rgba(var(--rgb-heat), 0.6);

      --cl-cool: #38bdf8;
      --cl-cool-bg: rgba(var(--rgb-cool), 0.1);
      --cl-cool-border: rgba(var(--rgb-cool), 0.15);
      --cl-cool-glow: rgba(var(--rgb-cool), 0.4);
      --cl-cool-sub: rgba(var(--rgb-cool), 0.6);

      --cl-auto: #a78bfa;
      --cl-auto-bg: rgba(var(--rgb-purple),0.1);
      --cl-auto-border: rgba(var(--rgb-purple),0.15);
      --cl-auto-glow: rgba(var(--rgb-purple),0.4);

      --cl-dry: #eab308;
      --cl-fan: #06b6d4;
      --cl-off: var(--t4);
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
    .card-count.some { background: rgba(var(--rgb-heat), 0.15); color: var(--cl-heat); }
    .card-count.none { background: var(--s2); color: var(--t3); }
    .card-count.all  { background: rgba(var(--rgb-heat), 0.2); color: var(--cl-heat); }
    .card-header-right { font-size: var(--fz-sm); font-weight: 500; color: var(--t3); }

    /* ── Card Body ── */
    .climate-card { position: relative; overflow: hidden; }
    .climate-card.list-mode { padding: 0.125rem 0.875rem; }
    .climate-card.normal-mode {
      padding: 0.875rem;
      touch-action: pan-y; user-select: none; -webkit-user-select: none;
      -webkit-tap-highlight-color: transparent; cursor: default;
      transition: border-color var(--t-fast), border-radius var(--t-layout);
      display: flex; flex-direction: column; justify-content: center;
    }
    .card-inner { position: relative; z-index: 1; }
    .normal-mode .card-inner { display: flex; flex-direction: column; gap: 0; }

    /* ── Tint ── */
    .tint {
      position: absolute; inset: 0; border-radius: inherit;
      pointer-events: none; z-index: 0;
      transition: opacity var(--t-slow), background var(--t-slow);
      opacity: 0;
    }
    .tint.heat {
      opacity: 0.18;
      background: radial-gradient(ellipse at 30% 30%, var(--cl-heat), transparent 70%);
    }
    .tint.cool {
      opacity: 0.18;
      background: radial-gradient(ellipse at 30% 30%, var(--cl-cool), transparent 70%);
    }
    .tint.auto-tint {
      opacity: 0.12;
      background: radial-gradient(ellipse at 30% 30%, var(--cl-auto), transparent 70%);
    }
    /* Normal mode centers the tint */
    .normal-mode .tint.heat {
      background: radial-gradient(ellipse at 50% 40%, var(--cl-heat), transparent 70%);
      opacity: 0.15;
    }
    .normal-mode .tint.cool {
      background: radial-gradient(ellipse at 50% 40%, var(--cl-cool), transparent 70%);
      opacity: 0.15;
    }
    .normal-mode .tint.auto-tint {
      background: radial-gradient(ellipse at 50% 40%, var(--cl-auto), transparent 70%);
    }

    /* ════════════════════════════════════════════
       LIST MODE STYLES
       ════════════════════════════════════════════ */

    /* ── Row ── */
    .cl-row {
      display: flex; align-items: center; gap: 0.625rem;
      padding: 0.5rem 0.25rem; position: relative; flex-shrink: 0;
      transition: background var(--t-fast); border-radius: var(--radius-md);
    }
    /* No row-level hover: the row contains its own interactive buttons
       (icon-toggle + expand-area) which carry their own hover/active states. */
    @media (pointer: coarse) {
      .cl-row:active { animation: bounce 0.3s ease; }
    }

    /* Pulse animations applied to the <ha-icon> slotted into the
       <glass-icon-button> when the climate is actively heating or cooling. */
    @keyframes pulse-heat {
      0%, 100% { filter: drop-shadow(0 0 6px rgba(var(--rgb-heat), 0.6)); }
      50%      { filter: drop-shadow(0 0 2px rgba(var(--rgb-heat), 0.2)); }
    }
    @keyframes pulse-cool {
      0%, 100% { filter: drop-shadow(0 0 6px rgba(var(--rgb-cool), 0.6)); }
      50%      { filter: drop-shadow(0 0 2px rgba(var(--rgb-cool), 0.2)); }
    }
    glass-icon-button ha-icon.pulse-heat {
      animation: pulse-heat 2s ease-in-out infinite; will-change: filter;
    }
    glass-icon-button ha-icon.pulse-cool {
      animation: pulse-cool 2s ease-in-out infinite; will-change: filter;
    }

    /* ── Expand Button ── */
    .cl-expand-area {
      flex: 1; min-width: 0;
      display: flex; align-items: center; gap: 0.625rem;
      background: none; border: none; padding: 0;
      font-family: inherit; cursor: pointer; outline: none;
      text-align: left; color: inherit;
      -webkit-tap-highlight-color: transparent;
    }
    .cl-expand-area:focus-visible {
      outline: 2px solid rgba(var(--rgb-white),0.25); outline-offset: 2px;
      border-radius: var(--radius-sm);
    }

    /* ── Info ── */
    .cl-info { flex: 1; min-width: 0; }
    .cl-name {
      font-size: var(--fz-md); font-weight: 600; color: var(--t1); line-height: 1.2;
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }
    .cl-sub { display: flex; align-items: center; gap: 0.3125rem; margin-top: 0.125rem; }
    .cl-action-text {
      font-size: var(--fz-sm); font-weight: 500; color: var(--t3);
      transition: color var(--t-med);
    }
    .cl-row[data-action="heating"] .cl-action-text,
    .cl-row[data-action="preheating"] .cl-action-text { color: var(--cl-heat-sub); }
    .cl-row[data-action="cooling"] .cl-action-text { color: var(--cl-cool-sub); }

    .cl-mode-badge {
      font-size: var(--fz-xxs); font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;
      padding: 0.0625rem 0.3125rem; border-radius: var(--radius-full);
      background: var(--s2); color: var(--t4); flex-shrink: 0;
    }
    .cl-row[data-action="heating"] .cl-mode-badge,
    .cl-row[data-action="preheating"] .cl-mode-badge {
      background: var(--cl-heat-bg); color: var(--cl-heat-sub);
    }
    .cl-row[data-action="cooling"] .cl-mode-badge {
      background: var(--cl-cool-bg); color: var(--cl-cool-sub);
    }

    /* ── Temps ── */
    .cl-temps {
      display: flex; flex-direction: column; align-items: flex-end; gap: 0;
      flex-shrink: 0;
    }
    .cl-temp-current {
      font-size: var(--fz-xl); font-weight: 700; color: var(--t1);
      line-height: 1; font-variant-numeric: tabular-nums;
    }
    .cl-temp-current .unit { font-size: var(--fz-base); font-weight: 500; color: var(--t3); }
    .cl-temp-target {
      font-size: var(--fz-sm); font-weight: 600; color: var(--t3);
      font-variant-numeric: tabular-nums; margin-top: 0.0625rem;
    }
    .cl-row[data-action="heating"] .cl-temp-target,
    .cl-row[data-action="preheating"] .cl-temp-target { color: var(--cl-heat-sub); }
    .cl-row[data-action="cooling"] .cl-temp-target { color: var(--cl-cool-sub); }

    /* Status dot removed per design feedback — heating/cooling state is
       already conveyed by the row tint + temperature color (cl-temp-target). */

    /* Unavailable badge inline */
    .cl-expand-area .unavailable-badge {
      position: static;
      flex-shrink: 0;
      --mdc-icon-size: 0.75rem;
      color: var(--c-warning);
    }

    /* ── Fold separator ── */
    .fold-sep {
      height: 0; margin: 0 0.75rem; overflow: hidden;
      background: linear-gradient(90deg, transparent, rgba(var(--rgb-heat), 0.25), transparent);
      opacity: 0; transition: opacity 0.25s var(--ease-std), height 0.25s var(--ease-std);
    }
    .fold-sep.cool {
      background: linear-gradient(90deg, transparent, rgba(var(--rgb-cool), 0.25), transparent);
    }
    .fold-sep.visible { height: 0.0625rem; opacity: 1; }

    /* ── Controls fold (list mode) ── */
    .ctrl-fold {
      display: grid; grid-template-rows: 0fr;
      transition: grid-template-rows var(--t-layout);
    }
    .ctrl-fold.open { grid-template-rows: 1fr; }
    .ctrl-fold-inner {
      overflow: hidden; opacity: 0;
      transition: opacity 0.25s var(--ease-std);
    }
    .ctrl-fold.open .ctrl-fold-inner { opacity: 1; transition-delay: 0.1s; }
    .ctrl-panel {
      padding: 0.375rem 0 0.25rem;
      display: flex; flex-direction: column; gap: 0.625rem;
    }

    /* ── Section separator (tinted by current hvac action) ── */
    .section-sep {
      height: 1px; margin: 0.0625rem 0.25rem;
      background: linear-gradient(90deg, transparent, var(--b2), transparent);
      transition: background var(--t-med);
    }
    .section-sep.heat {
      background: linear-gradient(90deg, transparent, rgba(var(--rgb-heat), 0.25), transparent);
    }
    .section-sep.cool {
      background: linear-gradient(90deg, transparent, rgba(var(--rgb-cool), 0.25), transparent);
    }

    /* ── Large temperature stepper (list mode fold) ── */
    .temp-control {
      display: flex; align-items: center; justify-content: center; gap: 1rem;
      padding: 0.5rem 0;
    }

    .temp-display {
      display: flex; flex-direction: column; align-items: center; gap: 0.125rem;
      min-width: 6.25rem;
    }
    .temp-display-label {
      font-size: var(--fz-xs); font-weight: 600; text-transform: uppercase; letter-spacing: 0.8px;
      color: var(--t4);
    }
    .temp-display-value {
      font-size: 2.5rem; font-weight: 700; line-height: 1;
      font-variant-numeric: tabular-nums; transition: color var(--t-fast);
    }
    .temp-display-value.heat { color: var(--cl-heat); }
    .temp-display-value.cool { color: var(--cl-cool); }
    .temp-display-value.off { color: var(--t3); }
    .temp-display-value .unit { font-size: var(--fz-xl); font-weight: 500; }
    .temp-display-current {
      font-size: var(--fz-base); font-weight: 500; color: var(--t3);
      display: flex; align-items: center; gap: 0.25rem;
    }
    .temp-display-current ha-icon { display: flex; align-items: center; justify-content: center; }

    /* ════════════════════════════════════════════
       NORMAL MODE STYLES
       ════════════════════════════════════════════ */

    /* ── Thermal canvas ── */
    .thermal-canvas {
      position: absolute; inset: 0; border-radius: inherit;
      overflow: hidden; pointer-events: none; z-index: 0;
    }
    .thermal-canvas canvas { width: 100%; height: 100%; }

    /* ── Connected fold wrapper ── */
    .climate-wrap { display: flex; flex-direction: column; }
    .climate-wrap.fold-open .climate-card {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      border-bottom-color: transparent;
    }

    /* Touch hint at card bottom when fold closed */
    .normal-mode::after {
      content: ''; position: absolute; bottom: 0; left: 20%; right: 20%;
      height: 0.125rem; border-radius: 1px;
      background: linear-gradient(90deg, transparent, var(--b3), transparent);
      opacity: 0; transition: opacity var(--t-med); z-index: 2;
    }
    .climate-wrap:not(.fold-open) .normal-mode::after { opacity: 1; }

    /* Normal fold inner (external, connected) */
    .normal-fold-inner {
      position: relative; overflow: hidden;
      background: linear-gradient(135deg, rgba(var(--rgb-white),0.03), rgba(var(--rgb-white),0.01));
      backdrop-filter: var(--blur-lg);
      -webkit-backdrop-filter: var(--blur-lg);
      border: 1px solid var(--b2);
      border-top: none;
      border-radius: 0 0 var(--radius-xl) var(--radius-xl);
      box-shadow: 0 8px 32px rgba(var(--rgb-black),0.3), 0 2px 8px rgba(var(--rgb-black),0.2), inset 0 -1px 0 rgba(var(--rgb-black),0.1);
    }
    /* Atmospheric halo at fold bottom, tinted by current hvac action */
    .normal-fold-inner::after {
      content: ''; position: absolute; inset: 0; border-radius: inherit;
      pointer-events: none;
      background: radial-gradient(ellipse 80% 50% at 50% 100%, var(--fold-halo, transparent), transparent 70%);
      opacity: 0; transition: opacity var(--t-slow), background var(--t-slow);
      z-index: 0;
    }
    .normal-fold-inner[data-tint="heat"] { --fold-halo: rgba(var(--rgb-heat), 0.12); }
    .normal-fold-inner[data-tint="cool"] { --fold-halo: rgba(var(--rgb-cool), 0.12); }
    .normal-fold-inner[data-tint="auto-tint"] { --fold-halo: rgba(var(--rgb-purple), 0.10); }
    .normal-fold-inner[data-tint]:not([data-tint="none"])::after { opacity: 1; }
    .normal-fold-inner > * { position: relative; z-index: 1; }
    .normal-fold-inner .ctrl-panel {
      padding: 0.75rem 0.875rem 0.875rem; gap: 0.625rem;
    }

    /* Long-press visual feedback */
    .climate-card.lp-pulse {
      animation: lp-scale 0.2s var(--ease-out);
    }
    @keyframes lp-scale {
      0% { transform: scale(1); }
      50% { transform: scale(0.985); }
      100% { transform: scale(1); }
    }

    .ctrl-fold-sep-top {
      height: 0.0625rem; margin: 0 0.75rem;
      background: linear-gradient(90deg, transparent, var(--b3), transparent);
      transition: background var(--t-med);
    }
    .ctrl-fold-sep-top.heat-sep {
      background: linear-gradient(90deg, transparent, rgba(var(--rgb-heat), 0.25), transparent);
    }
    .ctrl-fold-sep-top.cool-sep {
      background: linear-gradient(90deg, transparent, rgba(var(--rgb-cool), 0.25), transparent);
    }

    /* ── Entity tabs ── */
    .entity-tabs {
      display: flex; gap: 0; overflow-x: auto; scrollbar-width: none;
      border-radius: var(--radius-lg); background: var(--s1);
      border: 1px solid var(--b1); padding: 0.1875rem;
    }
    .entity-tabs::-webkit-scrollbar { display: none; }

    .entity-tab {
      flex: 1; display: flex; align-items: center; justify-content: center; gap: 0.3125rem;
      padding: 0.4375rem 0.625rem; border-radius: var(--radius-sm); min-width: 0;
      font-family: inherit; font-size: var(--fz-base); font-weight: 600;
      color: var(--t3); cursor: pointer; transition: background var(--t-fast), color var(--t-fast), transform var(--t-fast);
      border: none; background: transparent; outline: none;
      -webkit-tap-highlight-color: transparent; white-space: nowrap;
    }
    .entity-tab:focus-visible { outline: 2px solid rgba(var(--rgb-white),0.25); outline-offset: 2px; }
    @media (hover: hover) { .entity-tab:active { transform: scale(0.96); } }
    @media (pointer: coarse) { .entity-tab:active { animation: bounce 0.3s ease; } }
    @media (hover: hover) and (pointer: fine) {
      .entity-tab:not(.active):hover { background: var(--s2); color: var(--t2); }
    }

    .entity-tab.heat { color: var(--cl-heat-sub); }
    .entity-tab.cool { color: var(--cl-cool-sub); }

    .entity-tab.active {
      background: var(--s4); color: var(--t1);
      box-shadow: 0 1px 4px rgba(var(--rgb-black),0.2);
    }
    .entity-tab.active.heat {
      background: var(--cl-heat-bg); color: var(--cl-heat);
      box-shadow: 0 1px 6px rgba(var(--rgb-heat), 0.15);
    }
    .entity-tab.active.cool {
      background: var(--cl-cool-bg); color: var(--cl-cool);
      box-shadow: 0 1px 6px rgba(var(--rgb-cool), 0.15);
    }

    /* ── Arc gauge ── */
    .gauge-section {
      display: flex; flex-direction: column; align-items: center;
      padding: 0; gap: 0;
    }
    .arc-gauge { position: relative; width: 15rem; height: 10rem; }
    .arc-gauge svg { width: 100%; height: 100%; }

    .arc-bg { fill: none; stroke: var(--s2); stroke-width: 8; stroke-linecap: round; }
    .arc-progress {
      fill: none; stroke-width: 8; stroke-linecap: round;
      transition: stroke-dashoffset 0.6s var(--ease-out), stroke var(--t-med);
    }
    .arc-progress.heat { stroke: var(--cl-heat); filter: drop-shadow(0 0 8px var(--cl-heat-glow)); }
    .arc-progress.cool { stroke: var(--cl-cool); filter: drop-shadow(0 0 8px var(--cl-cool-glow)); }
    .arc-progress.auto-arc { stroke: var(--cl-auto); filter: drop-shadow(0 0 8px var(--cl-auto-glow)); }
    .arc-progress.off { stroke: var(--t4); filter: none; }

    .arc-target-dot {
      fill: rgba(var(--rgb-white),0.9);
      filter: drop-shadow(0 0 4px rgba(var(--rgb-white),0.5));
      transition: fill 0.6s var(--ease-out), filter 0.6s var(--ease-out);
    }
    .arc-tick { stroke: var(--t4); stroke-width: 1; opacity: 0.3; }
    .arc-tick-major { stroke: var(--t3); stroke-width: 1.5; opacity: 0.5; }
    .arc-tick-label {
      font-size: var(--fz-xxs); font-weight: 500; fill: var(--t4);
      text-anchor: middle; dominant-baseline: middle;
    }

    /* Center display */
    .gauge-center {
      position: absolute; bottom: 0.875rem; left: 50%; transform: translateX(-50%);
      display: flex; flex-direction: column; align-items: center; gap: 0.125rem;
      width: 10rem;
    }
    .gauge-current-temp {
      font-size: 3rem; font-weight: 300; line-height: 1;
      font-variant-numeric: tabular-nums; letter-spacing: -2px;
      color: var(--t1); transition: color var(--t-med);
    }
    .gauge-current-temp .unit {
      font-size: var(--fz-xl); font-weight: 400; color: var(--t3);
      vertical-align: super; margin-left: -0.125rem;
    }
    .gauge-current-temp.off { color: var(--t3); }

    .gauge-action-label {
      font-size: var(--fz-sm); font-weight: 600; text-transform: uppercase;
      letter-spacing: 0.8px; color: var(--t3); transition: color var(--t-med);
      display: flex; align-items: center; gap: 0.25rem;
    }
    .gauge-action-label ha-icon { display: flex; align-items: center; justify-content: center; }
    .gauge-action-label.heat { color: var(--cl-heat-sub); }
    .gauge-action-label.cool { color: var(--cl-cool-sub); }
    .gauge-action-label.idle { color: var(--t3); }
    .gauge-action-label.off { color: var(--t4); }

    .gauge-sub-info {
      display: flex; align-items: center; gap: 0.375rem;
      font-size: var(--fz-sm); font-weight: 500; color: var(--t3);
    }
    .gauge-sub-info ha-icon { opacity: 0.5; display: flex; align-items: center; justify-content: center; }
    .gauge-sub-info-sep { color: var(--t4); }

    /* ── Normal mode temp stepper (glass sub-panel) ── */
    .temp-control-panel {
      display: flex; align-items: center; justify-content: center; gap: 0.875rem;
      padding: 0.625rem 1rem;
      border-radius: var(--radius-lg);
      /* backdrop-filter removed — parent .glass already applies blur(40px) */
      background: rgba(var(--rgb-black),0.25);
      border: 1px solid rgba(var(--rgb-white),0.08);
      box-shadow: 0 4px 16px rgba(var(--rgb-black),0.15), inset 0 1px 0 rgba(var(--rgb-white),0.04);
    }
    /* glass-stepper-button surface="dark" handles the normal-mode stepper */
    .target-display {
      display: flex; flex-direction: column; align-items: center; gap: 0;
      min-width: 6.25rem;
    }
    .target-label {
      font-size: var(--fz-xxs); font-weight: 700; text-transform: uppercase;
      letter-spacing: 1px; color: var(--t4);
    }
    .target-value {
      font-size: var(--fz-display); font-weight: 600; line-height: 1.1;
      font-variant-numeric: tabular-nums; letter-spacing: -1px;
      transition: color var(--t-med);
    }
    .target-value .unit { font-size: var(--fz-lg); font-weight: 400; color: var(--t3); }
    .target-value.heat { color: var(--cl-heat); }
    .target-value.cool { color: var(--cl-cool); }
    .target-value.auto-val { color: var(--cl-auto); }
    .target-value.off { color: var(--t4); }

    /* ════════════════════════════════════════════
       SHARED CONTROL STYLES (used in both modes)
       ════════════════════════════════════════════ */

    /* ── Modes / Presets section wrappers (eyebrow above, content below) ── */
    .modes-row, .presets-row { display: flex; flex-direction: column; }

    /* ── Mode tiles (primary HVAC selection) ── */
    .mode-tile-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(7.25rem, 1fr));
      gap: 0.375rem;
    }
    .mode-tile {
      position: relative; overflow: hidden;
      display: flex; align-items: center; gap: 0.5rem;
      padding: 0.5625rem 0.75rem; min-height: var(--tap-lg);
      border-radius: var(--radius-md);
      background: var(--s1);
      border: 1px solid var(--b2);
      font-family: inherit; font-size: var(--fz-base); font-weight: 600;
      color: var(--t3); text-align: left;
      cursor: pointer; outline: none;
      transition: background var(--t-fast), color var(--t-fast), border-color var(--t-fast), transform var(--t-fast);
      -webkit-tap-highlight-color: transparent;
    }
    .mode-tile-icon {
      --mdc-icon-size: 1.125rem; flex-shrink: 0;
      display: flex; align-items: center; justify-content: center;
      transition: color var(--t-fast), filter var(--t-fast);
    }
    .mode-tile-label {
      min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
    }
    .mode-tile:focus-visible { outline: 2px solid rgba(var(--rgb-white), 0.25); outline-offset: -2px; }
    @media (hover: hover) and (pointer: fine) {
      .mode-tile:not(.active):hover { background: var(--s2); color: var(--t2); border-color: var(--b3); }
    }
    @media (hover: hover) { .mode-tile:active { transform: scale(0.97); } }
    @media (pointer: coarse) { .mode-tile:active { animation: bounce 0.3s ease; } }

    /* Active states (atmospheric glow at top-left, tinted tile) */
    .mode-tile.active::before {
      content: ''; position: absolute; inset: 0; border-radius: inherit;
      background: radial-gradient(ellipse at 0% 0%, currentColor, transparent 60%);
      opacity: 0.10; pointer-events: none;
    }
    .mode-tile.mode-heat.active,
    .mode-tile.mode-dry.active {
      background: var(--cl-heat-bg); border-color: var(--cl-heat-border); color: var(--cl-heat);
    }
    .mode-tile.mode-heat.active .mode-tile-icon { animation: pulse-heat 2s ease-in-out infinite; will-change: filter; }
    .mode-tile.mode-cool.active,
    .mode-tile.mode-fan-only.active {
      background: var(--cl-cool-bg); border-color: var(--cl-cool-border); color: var(--cl-cool);
    }
    .mode-tile.mode-cool.active .mode-tile-icon { animation: pulse-cool 2s ease-in-out infinite; will-change: filter; }
    .mode-tile.mode-auto.active,
    .mode-tile.mode-heat-cool.active {
      background: var(--cl-auto-bg); border-color: var(--cl-auto-border); color: var(--cl-auto);
    }
    .mode-tile.mode-off.active {
      background: var(--s3); border-color: var(--b3); color: var(--t2);
    }

    /* ── Preset chips (ambiance row, horizontal scroll) ── */
    .preset-row {
      display: flex; gap: 0.375rem; overflow-x: auto;
      padding: 0.125rem 0.0625rem; margin: 0 -0.0625rem;
      scrollbar-width: none;
    }
    .preset-row::-webkit-scrollbar { display: none; }

    /* ── Air section (Fan, Swing, Humidity, Aux) ──
       Each row is a stacked group: <glass-section-title> eyebrow on
       top, pills below. The eyebrow already brings its own
       margin-bottom (0.375rem) so the row has no extra gap. */
    .air-section { display: flex; flex-direction: column; gap: 0.625rem; }
    .air-row {
      display: flex; flex-direction: column;
    }
    .air-pills {
      display: flex; gap: 0.375rem; overflow-x: auto; scrollbar-width: none;
      padding: 0 0.375rem;
    }
    .air-pills::-webkit-scrollbar { display: none; }
    .air-pills glass-chip {
      flex-shrink: 0;
      text-transform: capitalize;
    }

    /* Reduced motion: kill all non-essential animations */
    @media (prefers-reduced-motion: reduce) {
      .mode-tile.active .mode-tile-icon { animation: none; }
      .normal-fold-inner::after { transition: none; }
      .section-sep { transition: none; }
    }

    /* ── Stepper (inline -/+/value group, slotted into glass-section-title) ── */
    .stepper { display: flex; align-items: center; gap: 0.5rem; }
    .stepper-value {
      font-size: var(--fz-base); font-weight: 700; color: var(--t1);
      min-width: 2.5rem; text-align: center;
      font-variant-numeric: tabular-nums;
    }

    /* ── Range slider ── */
    .range-slider-row { display: flex; flex-direction: column; gap: 0.375rem; padding: 0.25rem 0; }
    .range-labels { display: flex; justify-content: space-between; }
    .range-label { font-size: var(--fz-base); font-weight: 700; }
    .range-label.heat { color: var(--cl-heat); }
    .range-label.cool { color: var(--cl-cool); }
    .range-track {
      position: relative; height: 1.75rem;
      background: var(--s1); border-radius: var(--radius-lg);
      border: 1px solid var(--b1);
      touch-action: none; user-select: none; -webkit-user-select: none;
    }
    .range-fill {
      position: absolute; top: 0; height: 100%;
      border-radius: inherit; pointer-events: none;
      background: linear-gradient(90deg, var(--cl-heat), var(--cl-cool));
      opacity: 0.2;
    }
    .range-thumb {
      position: absolute; top: 50%; transform: translate(-50%, -50%);
      width: 1rem; height: 1rem; border-radius: 50%;
      border: 2px solid; cursor: grab; outline: none;
      transition: box-shadow var(--t-fast);
      -webkit-tap-highlight-color: transparent;
    }
    .range-thumb:active { cursor: grabbing; }
    .range-thumb:focus-visible { box-shadow: 0 0 0 3px rgba(var(--rgb-white),0.25); }
    .range-thumb.low {
      background: var(--cl-heat); border-color: var(--cl-heat);
      box-shadow: 0 0 8px var(--cl-heat-glow);
    }
    .range-thumb.high {
      background: var(--cl-cool); border-color: var(--cl-cool);
      box-shadow: 0 0 8px var(--cl-cool-glow);
    }

  `;
