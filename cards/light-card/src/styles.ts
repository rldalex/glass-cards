import { css } from 'lit';

export const lightCardStyles = css`
  :host {
    width: 100%;
    max-width: 31.25rem;
    margin: 0 auto;
    user-select: none;
    -webkit-user-select: none;
  }

  /* ── Card Header ── */
  .card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.375rem;
    padding: 0 0.375rem;
    min-height: 1.375rem;
  }
  .card-header-left {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  .card-title {
    font-size: var(--fz-xs);
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    color: var(--t4);
  }
  .card-count {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 0.875rem;
    height: 0.875rem;
    padding: 0 0.25rem;
    border-radius: var(--radius-full);
    font-size: var(--fz-xs);
    font-weight: 600;
    transition: background var(--t-med), color var(--t-med);
  }
  .card-count.none {
    background: var(--s2);
    color: var(--t3);
  }
  .card-count.some {
    background: rgba(var(--rgb-light-glow), 0.15);
    color: var(--c-light-glow);
  }
  .card-count.all {
    background: rgba(var(--rgb-light-glow), 0.2);
    color: var(--c-light-glow);
  }

  /* ── Card Body ── */
  .card {
    position: relative;
    padding: 0.125rem 0.875rem;
  }
  .card-inner {
    position: relative;
    z-index: 1;
  }

  /* ── Tint (dynamic) ── */
  .tint {
    transition:
      opacity var(--t-slow),
      background var(--t-slow);
  }

  /* ── Lights Grid ── */
  .lights-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0;
  }

  /* ── Light Row ── */
  .light-row {
    display: flex;
    align-items: center;
    gap: 0.625rem;
    grid-column: 1 / -1;
    padding: 0.5rem 0.25rem;
    position: relative;
    transition: background var(--t-fast);
    border-radius: var(--radius-md);
    -webkit-tap-highlight-color: transparent;
    user-select: none;
  }
  /* No row-level hover: the row contains its own interactive buttons
     (icon-toggle + expand) which carry their own hover/active states. */
  @media (pointer: coarse) {
    .light-row:active { animation: bounce 0.3s ease; }
  }
  .light-row.compact {
    grid-column: span 1;
    min-width: 0;
    overflow: hidden;
  }
  .light-row.compact-right {
    padding-left: 0.625rem;
  }
  .light-row.compact-right::before {
    content: '';
    position: absolute;
    left: 0;
    top: 20%;
    bottom: 20%;
    width: 0.0625rem;
    background: linear-gradient(
      to bottom,
      transparent,
      rgba(var(--rgb-white), 0.08) 30%,
      rgba(var(--rgb-white), 0.08) 70%,
      transparent
    );
  }

  /* ── Expand Button ── */
  .light-expand-btn {
    flex: 1;
    min-width: 0;
    display: flex;
    align-items: center;
    gap: 0.625rem;
    background: transparent;
    border: none;
    padding: 0;
    font-family: inherit;
    outline: none;
    text-align: left;
    color: inherit;
    cursor: pointer;
  }

  /* ── Light Info ── */
  .light-info {
    flex: 1;
    min-width: 0;
  }
  .light-name {
    font-size: var(--fz-md);
    font-weight: 600;
    color: var(--t1);
    line-height: 1.2;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .light-sub {
    display: flex;
    align-items: center;
    gap: 0.3125rem;
    margin-top: 0.125rem;
  }
  .light-brightness-text {
    font-size: var(--fz-sm);
    font-weight: 500;
    color: var(--t3);
    transition: color var(--t-med);
  }
  .light-row[data-on='true'] .light-brightness-text {
    color: rgba(var(--rgb-light-glow), 0.55);
  }
  .light-row[data-on='true'][data-rgb] .light-brightness-text {
    color: var(--light-rgb-sub, rgba(var(--rgb-light-glow), 0.55));
  }
  .light-temp-dot {
    width: 0.25rem;
    height: 0.25rem;
    border-radius: 50%;
    transition: background var(--t-med);
  }
  .light-temp-text {
    font-size: var(--fz-sm);
    font-weight: 400;
    color: var(--t4);
  }

  /* ── Status Dot ── */
  .light-dot {
    width: 0.375rem;
    height: 0.375rem;
    border-radius: 50%;
    flex-shrink: 0;
    background: var(--t4);
    transition: background var(--t-med), box-shadow var(--t-med);
  }
  .light-row[data-on='true'] .light-dot {
    background: var(--c-light-glow);
    box-shadow: 0 0 8px rgba(var(--rgb-light-glow), 0.5);
  }
  .light-row[data-on='true'][data-rgb] .light-dot {
    background: var(--light-rgb);
    box-shadow: 0 0 8px var(--light-rgb-glow);
  }

  /* Unavailable badge inline (replaces dot) */
  .light-expand-btn .unavailable-badge {
    position: static;
    flex-shrink: 0;
    --mdc-icon-size: 0.75rem;
    color: var(--c-warning);
  }

  /* ── Control Fold ── */
  .ctrl-fold {
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows var(--t-layout);
    grid-column: 1 / -1;
    pointer-events: none;
  }
  .ctrl-fold.open {
    grid-template-rows: 1fr;
    pointer-events: auto;
  }
  .ctrl-fold-inner {
    overflow: hidden;
    opacity: 0;
    transition: opacity var(--t-fast);
  }
  .ctrl-fold.open .ctrl-fold-inner {
    opacity: 1;
    transition-delay: 0.1s;
  }
  .fold-sep {
    height: 0.0625rem;
    margin: 0 0.75rem;
    overflow: hidden;
    background: linear-gradient(90deg, transparent, var(--fold-color, rgba(var(--rgb-light-glow),0.25)), transparent);
    opacity: 0;
    transition: opacity var(--t-layout);
    grid-column: 1 / -1;
  }
  /* In a compact pair, anchor the separator under the opened light only
     so the user can tell which fold belongs to which lamp. */
  .fold-sep.fold-sep-left  { grid-column: 1 / -1; width: calc(50% - 0.75rem); margin-right: auto; }
  .fold-sep.fold-sep-right { grid-column: 1 / -1; width: calc(50% - 0.75rem); margin-left: auto; }
  .fold-sep.visible { opacity: 1; }
  .ctrl-panel {
    padding: 0.375rem 0 0.25rem;
    display: flex;
    flex-direction: column;
    gap: 0.625rem;
  }
  /* ── Fold sections (Intensité / Température / Couleur / Effets) ── */
  .ctrl-panel {
    gap: 0.75rem;
  }
  .light-section {
    display: flex; flex-direction: column; gap: 0.4375rem;
  }

  /* ── Slider ── */
  .slider-wrap { display: flex; align-items: center; gap: 0.5rem; }
  .slider-icon {
    display: flex; align-items: center; justify-content: center;
    width: 1.75rem; height: 1.75rem; flex-shrink: 0;
  }
  .slider-icon ha-icon {
    --mdc-icon-size: 1.125rem;
    display: flex; align-items: center; justify-content: center;
    color: var(--t3);
  }
  glass-slider { flex: 1; }

  /* ── Color Controls ── */
  .color-row {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    padding: 0.125rem 0;
  }
  /* ── Effect pills row ── */
  .effect-row {
    display: flex; flex-wrap: wrap; gap: 0.375rem;
    padding: 0.125rem 0;
  }
  @media (hover: hover) and (pointer: fine) {
    .effect-chip:hover { transform: none; background: var(--s2); }
    .effect-chip:active { transform: none; }
  }
  @media (pointer: coarse) {
    .effect-chip:active { animation: none; transform: scale(0.96); }
  }
  .color-picker-btn {
    width: 1.625rem;
    height: 1.625rem;
    border-radius: 50%;
    border: 2px solid transparent;
    cursor: pointer;
    padding: 0;
    outline: none;
    background: none;
    -webkit-tap-highlight-color: transparent;
    transition: transform var(--t-fast);
    flex-shrink: 0;
    position: relative;
  }
  .color-picker-btn::before {
    content: '';
    position: absolute;
    inset: 2px;
    border-radius: 50%;
    background: conic-gradient(
      hsl(0,80%,60%), hsl(60,80%,55%), hsl(120,70%,50%),
      hsl(180,75%,50%), hsl(240,75%,60%), hsl(300,75%,55%), hsl(360,80%,60%)
    );
  }
  @media (hover: hover) and (pointer: fine) {
    .color-picker-btn:hover { transform: scale(1.15); }
  }
  @media (pointer: coarse) {
    .color-picker-btn:active { animation: bounce 0.3s ease; }
  }

  /* ── Color Picker Popup ── */
  .color-picker-overlay {
    position: fixed;
    inset: 0;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(var(--rgb-black), 0.4);
    backdrop-filter: var(--blur-sm);
    -webkit-backdrop-filter: var(--blur-sm);
    animation: cpFadeIn 0.2s ease;
  }
  @keyframes cpFadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  .color-picker-dialog {
    position: relative;
    background: linear-gradient(135deg, rgba(var(--rgb-white),0.08) 0%, rgba(var(--rgb-white),0.03) 50%, rgba(var(--rgb-white),0.06) 100%);
    backdrop-filter: blur(40px) saturate(1.4);
    -webkit-backdrop-filter: blur(40px) saturate(1.4);
    border: 1px solid var(--b2);
    border-radius: var(--radius-xl);
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.875rem;
    box-shadow: inset 0 1px 0 0 rgba(var(--rgb-white),0.1), 0 8px 32px rgba(var(--rgb-black),0.4), 0 2px 8px rgba(var(--rgb-black),0.15);
    max-width: 18.75rem;
    width: 90vw;
  }
  /* Close icon top-right (positioning only — visual handled by <glass-icon-button>) */
  .cp-close-x { position: absolute; top: 0.375rem; right: 0.375rem; }

  .cp-wheel-wrap {
    position: relative;
    width: 13.75rem;
    height: 13.75rem;
  }
  .cp-wheel-wrap canvas {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    cursor: crosshair;
  }
  .cp-cursor {
    position: absolute;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    border: 3px solid white;
    box-shadow: 0 0 6px rgba(var(--rgb-black),0.6), 0 0 0 1px rgba(var(--rgb-black),0.2);
    pointer-events: none;
    transform: translate(-50%, calc(-50% - 28px));
    transition: left 0.05s, top 0.05s;
  }
  .cp-cursor::after {
    content: '';
    position: absolute;
    bottom: -0.5rem;
    left: 50%;
    transform: translateX(-50%);
    width: 0.125rem;
    height: 0.625rem;
    background: rgba(var(--rgb-white),0.5);
    border-radius: 1px;
  }
  /* Compact preview row: swatch + hex code on one line */
  .cp-preview-row {
    display: inline-flex; align-items: center; gap: 0.625rem;
    padding: 0.375rem 0.5rem;
    border-radius: var(--radius-md);
    background: var(--s1); border: 1px solid var(--b1);
  }
  .cp-swatch {
    width: 1.625rem; height: 1.625rem; border-radius: var(--radius-sm);
    border: 1px solid rgba(var(--rgb-white), 0.15);
    box-shadow: inset 0 0 0 1px rgba(var(--rgb-black), 0.15);
  }
  .cp-hex {
    font-size: var(--fz-base); font-weight: 600; color: var(--t2);
    font-family: monospace; letter-spacing: 0.5px;
  }

  /* Focus-visible ring (legacy non-primitive buttons) */
  .light-expand-btn:focus-visible,
  .color-picker-btn:focus-visible {
    outline: 2px solid var(--c-accent);
    outline-offset: 2px;
  }

  /* ── Dashboard Mode ── */
  .dashboard-row {
    display: contents;
    animation: dashRowIn 0.4s var(--ease-std) both;
  }
  .dashboard-row:nth-child(1) { animation-delay: 0ms; }
  .dashboard-row:nth-child(2) { animation-delay: 50ms; }
  .dashboard-row:nth-child(3) { animation-delay: 100ms; }
  @keyframes dashRowIn {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .dashboard-overflow {
    font-size: var(--fz-sm);
    font-weight: 500;
    color: var(--t3);
    text-align: center;
    padding: 0.375rem 0 0.125rem;
    letter-spacing: 0.3px;
    grid-column: 1 / -1;
  }
`;
