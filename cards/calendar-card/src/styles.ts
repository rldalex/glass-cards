import { css } from 'lit';

export const calendarCardStyles = css`
    :host { width: 100%; max-width: 31.25rem; margin: 0 auto; color: var(--t1); }
    .calendar-card { width: 100%; overflow: hidden; position: relative; }

    /* ── Card Header (matches presence/climate/etc. pattern) ── */
    .card-header {
      display: flex; align-items: center; justify-content: space-between;
      padding: 0 0.375rem; min-height: 1.375rem; margin-bottom: 0.375rem;
      box-sizing: border-box;
    }
    .card-header-left { display: flex; align-items: center; gap: 0.5rem; }
    .card-title {
      font-size: var(--fz-xs); font-weight: 700;
      text-transform: uppercase; letter-spacing: 1.5px;
      color: var(--t4);
    }
    /* ── Compact bar (matches presence-card height ~52px) ── */
    .v4-compact {
      display: flex; align-items: center; gap: 0.625rem;
      width: 100%;
      padding: 0.4375rem 0.875rem;
      min-height: 3.25rem;
      background: none; border: none; color: inherit;
      font-family: inherit; text-align: left;
      cursor: pointer; outline: none;
      border-radius: var(--radius-xl);
      transition: background var(--t-fast);
      -webkit-tap-highlight-color: transparent;
    }
    .v4-compact:active { background: rgba(var(--rgb-white), 0.03); }
    .v4-compact:focus-visible { outline: 2px solid rgba(var(--rgb-white), 0.25); outline-offset: -2px; }

    .v4-compact-left { display: inline-flex; align-items: center; gap: 0.5rem; flex-shrink: 0; }
    .v4-compact-icon { width: 0.875rem; height: 0.875rem; color: rgb(var(--rgb-accent)); flex-shrink: 0; }
    .v4-compact-date { font-size: var(--fz-base); font-weight: 700; color: var(--t1); white-space: nowrap; line-height: 1rem; }
    .v4-compact-count {
      font-size: var(--fz-sm); font-weight: 700; color: rgb(var(--rgb-accent));
      background: rgba(var(--rgb-accent), 0.12);
      border: 0.0625rem solid rgba(var(--rgb-accent), 0.2);
      border-radius: var(--radius-full); padding: 0 0.375rem;
      min-width: 1.125rem; height: 1.125rem;
      display: inline-flex; align-items: center; justify-content: center;
      line-height: 1; box-sizing: border-box;
    }
    .v4-compact-sep { width: 0.0625rem; height: 0.75rem; background: var(--b2); flex-shrink: 0; }

    /* ── Chevron (round, rotates via parent .open) ── */
    .v4-compact-chevron {
      width: 1.625rem; height: 1.625rem; border-radius: 50%;
      background: var(--s2); border: 0.0625rem solid var(--b1);
      display: inline-flex; align-items: center; justify-content: center;
      color: var(--t3); flex-shrink: 0;
      transition: background var(--t-fast), border-color var(--t-fast), color var(--t-fast);
    }
    /* No row-level hover on the closed compact bar: the chevron + state
       already signal interactivity, and hover-stickiness after a tap on
       mobile was distracting. */
    .v4-compact-chevron svg { width: 0.75rem; height: 0.75rem; transition: transform var(--t-fast); }
    .calendar-card.open .v4-compact-chevron svg { transform: rotate(180deg); }
    .calendar-card.open .v4-compact-chevron {
      background: rgba(var(--rgb-accent), 0.12);
      border-color: rgba(var(--rgb-accent), 0.3);
      color: rgb(var(--rgb-accent));
    }

    /* ── Ticker ── */
    .v4-ticker-wrap { flex: 1; min-width: 0; height: 1rem; position: relative; overflow: hidden; }
    .v4-ticker-item {
      display: inline-flex; align-items: center; gap: 0.375rem;
      position: absolute; left: 0; right: 0; top: 0; bottom: 0;
      transition:
        transform var(--t-med),
        opacity var(--t-med);
    }
    .v4-ticker-item.below  { transform: translateY(100%);  opacity: 0; pointer-events: none; }
    .v4-ticker-item.active { transform: translateY(0);     opacity: 1; }
    .v4-ticker-item.above  { transform: translateY(-100%); opacity: 0; pointer-events: none; }
    .v4-ticker-dot { width: 0.3125rem; height: 0.3125rem; border-radius: 50%; flex-shrink: 0; }
    .v4-ticker-text {
      font-size: var(--fz-base); font-weight: 500; color: var(--t2);
      flex: 1; min-width: 0;
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis; line-height: 1rem;
    }
    .v4-ticker-time { font-size: var(--fz-base); font-weight: 500; color: var(--t3); flex-shrink: 0; line-height: 1rem; }
    .v4-ticker-item.now .v4-ticker-text { color: var(--t1); font-weight: 600; }
    .v4-ticker-item.now .v4-ticker-time { color: rgb(var(--rgb-accent)); }
    .v4-ticker-empty {
      position: relative; height: 1rem; display: inline-flex; align-items: center;
      font-size: var(--fz-base); font-weight: 500; color: var(--t4); font-style: italic;
    }

    /* ── Fold separators (gradient lines above/below open fold) ── */
    /* Hidden entirely when closed — no space taken, no anti-aliased traces. */
    .v4-fold-sep {
      display: none;
      height: 0.0625rem;
      margin: 0 0.75rem;
      background: linear-gradient(90deg, transparent, rgba(var(--rgb-accent), 0.15), transparent);
      opacity: 0;
      transition: opacity var(--t-fast) 0.1s;
    }
    .calendar-card.open .v4-fold-sep { display: block; opacity: 1; }

    /* ── Fold (grid 0fr/1fr — never animate height) ── */
    .v4-fold { display: grid; grid-template-rows: 0fr; transition: grid-template-rows var(--t-layout); }
    .calendar-card.open .v4-fold { grid-template-rows: 1fr; }
    .v4-fold-inner { overflow: hidden; opacity: 0; transition: opacity var(--t-fast); }
    .calendar-card.open .v4-fold-inner { opacity: 1; transition: opacity var(--t-fast) 0.1s; }
    .v4-fold .card-inner { padding: 0.5rem 0.875rem 0.875rem; }

    /* ── Week strip ── */
    .v4-week-strip {
      display: grid; grid-template-columns: repeat(7, 1fr); gap: 0.125rem;
      margin-bottom: 0.75rem; padding: 0.375rem 0.25rem;
      border-radius: var(--radius-md); background: var(--s1); border: 0.0625rem solid var(--b1);
    }
    .v4-week-day {
      display: flex; flex-direction: column; align-items: center; gap: 0.1875rem;
      padding: 0.375rem 0; min-height: var(--tap-lg);
      border-radius: var(--radius-sm); background: none; border: none;
      cursor: pointer; outline: none; font-family: inherit;
      transition: background var(--t-fast);
      -webkit-tap-highlight-color: transparent;
    }
    @media (hover: hover) and (pointer: fine) {
      .v4-week-day:hover { background: var(--s3); }
    }
    .v4-week-day:focus-visible { outline: 2px solid rgba(var(--rgb-white), 0.25); outline-offset: -2px; }
    .v4-week-day-label { font-size: var(--fz-xs); font-weight: 600; color: var(--t3); text-transform: uppercase; letter-spacing: 0.3px; line-height: 1; }
    .v4-week-day-num {
      font-size: var(--fz-md); font-weight: 600; color: var(--t2); line-height: 1;
      width: 1.625rem; height: 1.625rem;
      display: flex; align-items: center; justify-content: center; border-radius: 50%;
      transition: background var(--t-fast), color var(--t-fast);
    }
    .v4-week-day.today .v4-week-day-num {
      background: rgba(var(--rgb-accent), 0.2);
      color: rgb(var(--rgb-accent));
      font-weight: 700;
      box-shadow: 0 0 12px rgba(var(--rgb-accent), 0.35);
    }
    .v4-week-day.selected .v4-week-day-num {
      background: rgb(var(--rgb-accent));
      color: rgba(var(--rgb-white), 0.95);
      font-weight: 700;
      box-shadow: 0 0 14px rgba(var(--rgb-accent), 0.45);
    }
    .v4-week-day.selected.today .v4-week-day-num {
      background: rgb(var(--rgb-accent));
      color: rgba(var(--rgb-white), 0.95);
      box-shadow: 0 0 14px rgba(var(--rgb-accent), 0.5);
    }
    .v4-week-day-dots { display: inline-flex; gap: 0.1875rem; min-height: 0.25rem; }
    .v4-week-dot { width: 0.25rem; height: 0.25rem; border-radius: 50%; }
    @media (pointer: coarse) {
      .v4-week-day { position: relative; }
      .v4-week-day::after { content: ''; position: absolute; inset: -0.25rem 0; }
    }

    /* ── Event section (eyebrow + list) ── */
    .v4-event-section { display: flex; flex-direction: column; gap: 0.375rem; margin-bottom: 0.5rem; }

    .v4-event-list { display: flex; flex-direction: column; gap: 0.1875rem; }
    .v4-event-row {
      position: relative;
      display: flex; align-items: center; gap: 0.625rem;
      padding: 0.5rem 0.625rem;
      min-height: var(--tap-lg); border-radius: var(--radius-md);
      background: var(--s1); border: 0.0625rem solid transparent;
      cursor: pointer; outline: none; font-family: inherit; text-align: left;
      width: 100%;
      transition: background var(--t-fast), border-color var(--t-fast), transform var(--t-fast), box-shadow var(--t-fast);
      -webkit-tap-highlight-color: transparent;
    }
    @media (hover: hover) and (pointer: fine) {
      .v4-event-row:hover {
        background: var(--s2);
        transform: translateX(2px);
        box-shadow: 0 0 0 1px color-mix(in srgb, var(--ev-color) 35%, transparent);
      }
      .v4-event-row:hover .v4-event-dot { transform: scale(1.15); }
    }
    @media (hover: hover) { .v4-event-row:active { transform: translateX(2px) scale(0.99); } }
    .v4-event-row:focus-visible { outline: 2px solid rgba(var(--rgb-white), 0.25); outline-offset: -2px; }

    /* Calendar color dot (replaces the banned 3px side-stripe) */
    .v4-event-dot {
      width: 0.625rem; height: 0.625rem; border-radius: 50%;
      flex-shrink: 0;
      background: var(--ev-color);
      transition: transform var(--t-fast), box-shadow var(--t-fast);
    }
    .v4-event-content { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 0.125rem; }
    .v4-event-title {
      font-size: var(--fz-base); font-weight: 600; color: var(--t1); line-height: 1.3;
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }
    .v4-event-time { font-size: var(--fz-sm); font-weight: 500; color: var(--t3); line-height: 1.2; }
    .v4-event-allday {
      font-size: var(--fz-xxs); font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;
      color: var(--t3); padding: 0.125rem 0.5rem; border-radius: var(--radius-full);
      background: var(--s2); border: 0.0625rem solid var(--b1); flex-shrink: 0;
    }

    /* Now state: ring accent + glow on the dot */
    .v4-event-row.now {
      background: color-mix(in srgb, var(--c-accent) 9%, transparent);
      border-color: color-mix(in srgb, var(--c-accent) 35%, transparent);
      box-shadow: 0 0 0 1px color-mix(in srgb, var(--c-accent) 25%, transparent) inset;
    }
    .v4-event-row.now .v4-event-time {
      color: rgb(var(--rgb-accent)); font-weight: 600;
    }
    .v4-event-row.now .v4-event-dot {
      box-shadow: 0 0 10px var(--ev-color);
      animation: cal-dot-pulse 1.8s ease-in-out infinite;
    }
    @keyframes cal-dot-pulse {
      0%, 100% { box-shadow: 0 0 10px var(--ev-color); }
      50%      { box-shadow: 0 0 4px var(--ev-color); }
    }

    /* ── Empty state ── */
    .v4-event-empty {
      display: flex; flex-direction: column; align-items: center; gap: 0.375rem;
      padding: 1rem 1.25rem; text-align: center;
    }
    .v4-event-empty .ambient-icon {
      width: 3rem; height: 3rem; border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      background: color-mix(in srgb, var(--c-accent) 10%, transparent);
      border: 1px solid color-mix(in srgb, var(--c-accent) 22%, transparent);
      box-shadow: 0 0 18px rgba(var(--rgb-accent), 0.15);
      margin-bottom: 0.25rem;
    }
    .v4-event-empty .ambient-svg {
      width: 1.375rem; height: 1.375rem;
      color: color-mix(in srgb, var(--c-accent) 75%, var(--t2));
    }
    .v4-event-empty-title { font-size: var(--fz-md); font-weight: 700; color: var(--t1); line-height: 1.3; }
    .v4-event-empty-sub { font-size: var(--fz-sm); font-weight: 500; color: var(--t3); }

    /* ── Legend ── */
    .v4-cal-legend {
      display: flex; gap: 0.625rem; padding: 0.5rem 0.125rem 0; flex-wrap: wrap;
      border-top: 1px solid var(--b1);
      margin-top: 0.5rem;
    }
    .v4-cal-legend-item { display: inline-flex; align-items: center; gap: 0.3125rem; }
    .v4-cal-legend-dot { width: 0.375rem; height: 0.375rem; border-radius: 50%; }
    .v4-cal-legend-label { font-size: var(--fz-xs); font-weight: 500; color: var(--t3); }

    /* ── Atmospheric halo at the bottom of the open fold ── */
    .calendar-card { position: relative; }
    .calendar-card::after {
      content: ''; position: absolute; left: 0; right: 0; bottom: 0;
      height: 50%; pointer-events: none; z-index: 0;
      background: radial-gradient(ellipse 70% 60% at 50% 100%, rgba(var(--rgb-accent), 0.08), transparent 70%);
      opacity: 0; transition: opacity var(--t-slow);
    }
    .calendar-card.open::after { opacity: 1; }
    .calendar-card > * { position: relative; z-index: 1; }

    /* ── Reduced motion ── */
    @media (prefers-reduced-motion: reduce) {
      .v4-fold,
      .v4-fold-inner,
      .v4-fold-sep,
      .v4-ticker-item,
      .v4-compact-chevron svg,
      .v4-week-day-num,
      .v4-event-row,
      .v4-event-dot,
      .calendar-card::after { transition-duration: 0.01ms !important; }
      .v4-event-row.now .v4-event-dot { animation: none; }
      .v4-ticker-item.above,
      .v4-ticker-item.below { display: none; }
      .v4-ticker-item.active { transform: none; opacity: 1; }
      .v4-event-row:hover { transform: none; }
    }
`;
