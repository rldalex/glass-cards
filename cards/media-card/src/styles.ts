import { css } from 'lit';

export const mediaCardStyles = css`
      :host {
        width: 100%;
        max-width: 31.25rem;
        margin: 0 auto;
        user-select: none;
        -webkit-user-select: none;
        /* media player tokens */
        --mp-color: #818cf8;
        --mp-bg: rgba(var(--rgb-accent),0.1);
        --mp-border: rgba(var(--rgb-accent),0.15);
        --mp-glow: rgba(var(--rgb-accent),0.4);
        --mp-sub: rgba(var(--rgb-accent),0.55);
      }

      /* ── Header ── */
      .card-header {
        display: flex; align-items: center; justify-content: space-between;
        padding: 0 0.375rem; margin-bottom: 0.375rem; min-height: 1.375rem;
      }
      .card-header-left { display: flex; align-items: center; gap: 0.5rem; }
      .card-title {
        font-size: var(--fz-xs); font-weight: 700; text-transform: uppercase;
        letter-spacing: 1.5px; color: var(--t4);
      }
      .card-source {
        font-size: var(--fz-sm); font-weight: 500; color: var(--t4);
        white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        max-width: 50%;
        opacity: 0; transition: opacity var(--t-fast);
      }
      .card-source.active { opacity: 1; color: rgba(var(--rgb-white),0.6); }

      /* ── Swipe slide animation ── */
      @keyframes swipe-exit-l {
        0%   { transform: translateX(0) scale(1); opacity: 1; filter: blur(0); }
        100% { transform: translateX(-40%) scale(0.92); opacity: 0; filter: blur(6px); }
      }
      @keyframes swipe-enter-r {
        0%   { transform: translateX(40%) scale(0.92); opacity: 0; filter: blur(6px); }
        100% { transform: translateX(0) scale(1); opacity: 1; filter: blur(0); }
      }
      @keyframes swipe-exit-r {
        0%   { transform: translateX(0) scale(1); opacity: 1; filter: blur(0); }
        100% { transform: translateX(40%) scale(0.92); opacity: 0; filter: blur(6px); }
      }
      @keyframes swipe-enter-l {
        0%   { transform: translateX(-40%) scale(0.92); opacity: 0; filter: blur(6px); }
        100% { transform: translateX(0) scale(1); opacity: 1; filter: blur(0); }
      }
      .swipe-exit-left  { animation: swipe-exit-l 220ms cubic-bezier(0.4, 0, 0.7, 0.2) forwards; pointer-events: none; will-change: transform, opacity; }
      .swipe-enter-right { animation: swipe-enter-r 280ms cubic-bezier(0.16, 1, 0.3, 1) forwards; pointer-events: none; will-change: transform, opacity; }
      .swipe-exit-right  { animation: swipe-exit-r 220ms cubic-bezier(0.4, 0, 0.7, 0.2) forwards; pointer-events: none; will-change: transform, opacity; }
      .swipe-enter-left  { animation: swipe-enter-l 280ms cubic-bezier(0.16, 1, 0.3, 1) forwards; pointer-events: none; will-change: transform, opacity; }

      /* ── Dash wrap ── */
      .dash-wrap {
        position: relative; z-index: 1;
        display: flex; flex-direction: column; gap: 0;
      }

      /* ── Hero card ── */
      .dash-hero {
        position: relative;
        border-radius: var(--radius-xl);
        overflow: hidden;
        background: #111;
        border: 1px solid var(--b2);
        box-shadow:
          0 8px 32px rgba(var(--rgb-black),0.3),
          0 2px 8px rgba(var(--rgb-black),0.2),
          inset 0 1px 0 rgba(var(--rgb-white),0.04),
          inset 0 -1px 0 rgba(var(--rgb-black),0.1);
        touch-action: pan-y;
        user-select: none; -webkit-user-select: none;
        -webkit-tap-highlight-color: transparent;
        transition: border-radius var(--t-layout), border-color var(--t-fast);
      }
      @media (hover: hover) and (pointer: fine) { .dash-hero:hover { border-color: var(--b3); } }

      /* Connected fold: hero loses bottom radius when fold is open */
      .dash-wrap.fold-open .dash-hero {
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
        border-bottom-color: transparent;
      }

      /* ── Full-bleed artwork background ── */
      .dash-art-bg {
        position: absolute; inset: 0; width: 100%; height: 100%;
        object-fit: cover; pointer-events: none; z-index: 0;
        transition: opacity 0.8s;
      }

      /* ── Gradient overlay — minimal vignette to preserve artwork visibility ── */
      .dash-gradient {
        position: absolute; inset: 0; pointer-events: none; z-index: 1;
        background: linear-gradient(
          to bottom,
          rgba(var(--rgb-black),0.08) 0%,
          rgba(var(--rgb-black),0) 25%,
          rgba(var(--rgb-black),0) 50%,
          rgba(var(--rgb-black),0.15) 75%,
          rgba(var(--rgb-black),0.4) 100%
        );
      }

      /* ── Decorative shapes (no-artwork fallback) ── */
      .dash-deco {
        position: absolute; inset: 0; pointer-events: none; z-index: 0; overflow: hidden;
        background: linear-gradient(135deg, rgba(30,30,50,1) 0%, rgba(15,15,30,1) 50%, rgba(25,20,40,1) 100%);
      }
      .dash-deco::before {
        content: ''; position: absolute;
        width: 17.5rem; height: 17.5rem; border-radius: 50%;
        top: -5rem; right: -3.75rem;
        background: radial-gradient(circle, rgba(var(--rgb-white),0.05), transparent 70%);
      }
      .dash-deco::after {
        content: ''; position: absolute;
        width: 13.75rem; height: 13.75rem; border-radius: 50%;
        bottom: -3.125rem; left: -2.5rem;
        background: radial-gradient(circle, rgba(168,85,247,0.06), transparent 70%);
      }
      .dash-placeholder {
        position: absolute; inset: 0; pointer-events: none; z-index: 0;
        display: flex; align-items: center; justify-content: center;
      }
      .dash-placeholder ha-icon {
        --mdc-icon-size: 5rem;
        color: rgba(var(--rgb-white),0.12);
        display: flex; align-items: center; justify-content: center;
        filter: drop-shadow(0 0 20px rgba(var(--rgb-accent),0.15));
      }

      /* ── Content ── */
      .dash-content {
        position: relative; z-index: 2;
        display: flex; flex-direction: column;
        min-height: 21.25rem;
        padding: 0.875rem;
      }

      /* ── Glass pill (shared for top badges) ── */
      .glass-pill {
        backdrop-filter: var(--blur-md);
        -webkit-backdrop-filter: var(--blur-md);
        background: rgba(var(--rgb-black),0.22);
        border: 1px solid rgba(var(--rgb-white),0.12);
        box-shadow: 0 2px 8px rgba(var(--rgb-black),0.2);
      }

      /* ── Glass panel (bottom info card) — frosted glass, artwork bleeds through ── */
      .glass-panel {
        border-radius: var(--radius-lg);
        backdrop-filter: blur(10px) saturate(1.4);
        -webkit-backdrop-filter: blur(10px) saturate(1.4);
        background: rgba(var(--rgb-black),0.25);
        border: 1px solid rgba(var(--rgb-white),0.12);
        box-shadow:
          0 4px 16px rgba(var(--rgb-black),0.12),
          inset 0 1px 0 rgba(var(--rgb-white),0.08);
      }

      /* ── Top bar ── */
      .dash-top {
        display: flex; align-items: center; justify-content: space-between;
      }
      .dash-speaker {
        display: inline-flex; align-items: center; gap: 0.375rem;
        padding: 0.25rem 0.625rem 0.25rem 0.375rem;
        border-radius: var(--radius-full, 9999px);
        font-size: var(--fz-sm); font-weight: 600; color: rgba(var(--rgb-white),0.9);
        overflow: hidden; white-space: nowrap; text-overflow: ellipsis;
        max-width: 100%;
      }
      .dash-speaker > span {
        overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
      }
      .dash-speaker ha-icon {
        display: flex; align-items: center; justify-content: center;
        --mdc-icon-size: 0.8125rem;
      }
      .dash-group-badge {
        display: inline-flex; align-items: center; gap: 0.25rem;
        padding: 0.125rem 0.5rem; border-radius: var(--radius-xl);
        color: rgba(var(--rgb-white),0.9);
        font-size: var(--fz-sm); font-weight: 600;
      }
      .dash-group-badge ha-icon {
        display: flex; align-items: center; justify-content: center;
        --mdc-icon-size: 0.75rem;
      }

      /* ── Equalizer bars ── */
      .dash-eq {
        display: flex; align-items: flex-end; gap: 0.125rem;
        height: 0.875rem; margin-left: 0.375rem;
      }
      .dash-eq-bar {
        width: 0.1875rem; border-radius: 1.5px;
        background: #fff;
        box-shadow: 0 0 3px rgba(var(--rgb-white),0.6);
      }
      .dash-eq.playing .dash-eq-bar:nth-child(1) {
        height: 40%; animation: eq-lo 0.65s ease-in-out infinite alternate;
      }
      .dash-eq.playing .dash-eq-bar:nth-child(2) {
        height: 80%; animation: eq-hi 0.52s ease-in-out infinite alternate;
        animation-delay: 0.12s;
      }
      .dash-eq.playing .dash-eq-bar:nth-child(3) {
        height: 55%; animation: eq-mid 0.78s ease-in-out infinite alternate;
        animation-delay: 0.25s;
      }
      .dash-eq.playing .dash-eq-bar:nth-child(4) {
        height: 70%; animation: eq-lo 0.6s ease-in-out infinite alternate;
        animation-delay: 0.08s;
      }
      @keyframes eq-lo  { 0% { height: 15%; } 100% { height: 70%; } }
      @keyframes eq-mid { 0% { height: 20%; } 100% { height: 90%; } }
      @keyframes eq-hi  { 0% { height: 25%; } 100% { height: 100%; } }

      /* ── Spacer ── */
      .dash-spacer { flex: 1; }

      /* ── Bottom info panel ── */
      .dash-info-panel {
        position: relative; z-index: 10;
        display: flex; flex-direction: column; gap: 0.5rem;
        padding: 0.75rem 0.875rem;
      }

      /* ── Track info ── */
      .dash-track {
        display: flex; flex-direction: column; gap: 0.125rem;
        min-width: 0;
        background: none; border: none; padding: 0; margin: 0;
        font-family: inherit; text-align: left; color: inherit;
        cursor: pointer; outline: none; width: 100%;
        -webkit-tap-highlight-color: transparent;
      }
      .dash-track:focus-visible {
        outline: 2px solid rgba(var(--rgb-white),0.35); outline-offset: 2px;
        border-radius: var(--radius-sm);
      }
      .dash-track-title {
        font-size: var(--fz-lg); font-weight: 700; color: #fff; line-height: 1.2;
        overflow: hidden; white-space: nowrap; text-overflow: ellipsis;
        text-shadow: 0 1px 4px rgba(var(--rgb-black),0.5), 0 0 12px rgba(var(--rgb-black),0.3);
      }
      .dash-track-artist {
        font-size: var(--fz-base); font-weight: 500; color: rgba(var(--rgb-white),0.75);
        overflow: hidden; white-space: nowrap; text-overflow: ellipsis;
        text-shadow: 0 1px 3px rgba(var(--rgb-black),0.5);
      }

      /* ── Time row ── */
      .dash-time-row {
        display: flex; justify-content: space-between; align-items: center;
      }
      .dash-track-time {
        font-size: var(--fz-xs); font-weight: 500; color: rgba(var(--rgb-white),0.4);
        font-variant-numeric: tabular-nums;
        text-shadow: 0 1px 2px rgba(var(--rgb-black),0.4);
      }
      .dash-track-source {
        font-size: var(--fz-xxs); font-weight: 700; text-transform: uppercase;
        letter-spacing: 0.5px; color: rgba(var(--rgb-white),0.3);
        padding: 0.0625rem 0.375rem; border-radius: 4px;
        background: rgba(var(--rgb-white),0.06);
      }
      .dash-source-row {
        display: flex; align-items: center; justify-content: center; gap: 0.5rem;
        margin-top: -0.125rem;
      }
      .dash-coordinator-badge {
        display: inline-flex; align-items: center; gap: 0.25rem;
        font-size: var(--fz-xs); font-weight: 600; color: rgba(var(--rgb-white),0.5);
      }
      .dash-coordinator-badge ha-icon {
        display: flex; align-items: center; justify-content: center;
        --mdc-icon-size: 0.6875rem;
      }

      /* ── Progress bar ── */
      .dash-progress-wrap {
        margin-top: 0;
      }
      .dash-progress {
        position: relative; width: 100%; height: 0.25rem;
        border-radius: 2px; background: var(--s2);
        cursor: pointer; touch-action: none;
        transition: height var(--t-fast);
      }
      @media (hover: hover) and (pointer: fine) {
        .dash-progress:hover { height: 0.375rem; }
        .dash-progress:hover .dash-progress-thumb { opacity: 1; }
      }
      .dash-progress-fill {
        position: absolute; top: 0; left: 0; height: 100%;
        border-radius: inherit;
        background: rgba(var(--rgb-white),0.85);
        box-shadow: 0 0 8px rgba(var(--rgb-white),0.3);
        transition: width 0.3s linear;
        pointer-events: none;
      }
      .dash-progress-thumb {
        position: absolute; top: 50%; transform: translate(-50%, -50%);
        width: 0.625rem; height: 0.625rem; border-radius: 50%;
        background: #fff; box-shadow: 0 0 6px rgba(var(--rgb-black),0.3);
        pointer-events: none; opacity: 0; transition: opacity var(--t-fast);
      }

      /* ── Transport ── */
      .dash-transport {
        display: flex; align-items: center; justify-content: center; gap: 0.5rem;
        margin-top: 0.125rem;
      }
      /* Transport buttons handled by <glass-transport-button>. */

      /* ── Idle state ── */
      .dash-idle {
        display: flex; flex-direction: column; align-items: center; justify-content: center;
        flex: 1; gap: 0.5rem; padding: 1.25rem;
      }
      .dash-idle ha-icon {
        display: flex; align-items: center; justify-content: center;
        --mdc-icon-size: 2rem; color: var(--t4);
      }
      .dash-idle span { font-size: var(--fz-base); color: var(--t3); font-weight: 500; }

      /* ── Navigation arrows (hover on sides) ── */
      .dash-nav-arrow {
        position: absolute; top: 0; bottom: 0; width: 2.5rem; z-index: 8;
        display: flex; align-items: center; justify-content: center;
        background: none; border: none; cursor: pointer; padding: 0;
        opacity: 0; transition: opacity var(--t-fast);
        -webkit-tap-highlight-color: transparent; outline: none;
      }
      .dash-nav-arrow ha-icon {
        display: flex; align-items: center; justify-content: center;
        --mdc-icon-size: var(--icon-xl); color: rgba(var(--rgb-white),0.7);
        filter: drop-shadow(0 1px 4px rgba(var(--rgb-black),0.5));
        transition: color var(--t-fast);
      }
      .dash-nav-left { left: 0; border-radius: var(--radius-xl) 0 0 var(--radius-xl); }
      .dash-nav-right { right: 0; border-radius: 0 var(--radius-xl) var(--radius-xl) 0; }
      @media (hover: hover) and (pointer: fine) {
        .dash-nav-left:hover, .dash-nav-right:hover {
          background: linear-gradient(90deg, rgba(var(--rgb-black),0.25), transparent);
        }
        .dash-nav-right:hover {
          background: linear-gradient(270deg, rgba(var(--rgb-black),0.25), transparent);
        }
        .dash-nav-arrow:hover ha-icon { color: #fff; }
        .dash-hero:hover .dash-nav-arrow { opacity: 1; }
      }
      @media (pointer: coarse) { .dash-nav-arrow:active { animation: bounce 0.3s ease; } }
      @media (hover: hover) and (pointer: fine) { .dash-nav-arrow:active { transform: scale(0.95); } }
      .dash-nav-arrow:focus-visible { outline: 2px solid rgba(var(--rgb-white),0.25); outline-offset: -2px; }

      /* ── Room dots (dashboard swipe indicator) ── */
      .dash-dots {
        display: flex; justify-content: center; gap: 0.375rem;
        padding: 0.5rem 0 0.125rem;
      }
      .dash-dot {
        width: 0.375rem; height: 0.375rem; border-radius: 50%;
        background: rgba(var(--rgb-white),0.2); border: none;
        padding: 0; cursor: pointer; transition: background var(--t-fast), transform var(--t-fast);
        outline: none; -webkit-tap-highlight-color: transparent;
      }
      .dash-dot.active {
        background: rgba(var(--rgb-white),0.7);
        transform: scale(1.3);
      }
      @media (hover: hover) and (pointer: fine) { .dash-dot:hover { background: rgba(var(--rgb-white),0.5); } }
      @media (pointer: coarse) { .dash-dot:active { animation: bounce 0.3s ease; } }
      .dash-dot:focus-visible { outline: 2px solid rgba(var(--rgb-white),0.5); outline-offset: 2px; }

      /* ══════════════════════════════════════════
         Connected Fold
         ══════════════════════════════════════════ */
      .ctrl-fold {
        display: grid; grid-template-rows: 0fr;
        transition: grid-template-rows var(--t-layout);
        pointer-events: none;
      }
      .ctrl-fold.open { grid-template-rows: 1fr; pointer-events: auto; }
      .ctrl-fold-inner {
        overflow: hidden;
        opacity: 0; transition: opacity 0.25s;
        background: linear-gradient(135deg, rgba(var(--rgb-white),0.03), rgba(var(--rgb-white),0.01));
        backdrop-filter: var(--blur-lg);
        -webkit-backdrop-filter: var(--blur-lg);
        border: 1px solid var(--b2);
        border-top: none;
        border-radius: 0 0 var(--radius-xl) var(--radius-xl);
        box-shadow:
          0 8px 32px rgba(var(--rgb-black),0.3),
          0 2px 8px rgba(var(--rgb-black),0.2),
          inset 0 -1px 0 rgba(var(--rgb-black),0.1);
      }
      .ctrl-fold.open .ctrl-fold-inner { opacity: 1; transition-delay: 0.1s; }

      .ctrl-label {
        font-size: var(--fz-xs); font-weight: 700; text-transform: uppercase;
        letter-spacing: 1px; color: rgba(var(--rgb-white),0.5); margin-bottom: -0.25rem;
      }

      .dash-fold-sep-top {
        height: 0.0625rem; margin: 0 0.75rem;
        background: linear-gradient(90deg, transparent, rgba(var(--rgb-white),0.12), transparent);
      }
      .dash-fold-panel {
        display: flex; flex-direction: column; gap: 0.625rem;
        padding: 0.75rem 1rem 0.875rem;
      }
      .dash-fold-sep {
        height: 0.0625rem; margin: 0.125rem 0;
        background: linear-gradient(90deg, transparent, rgba(var(--rgb-white),0.12), transparent);
      }

      /* Master-only quirks: hover bump on the mute icon and red icon when muted. */
      @media (hover: hover) and (pointer: fine) {
        .speaker-row.master .speaker-icon-btn:hover { background: rgba(var(--rgb-white), 0.14); color: #fff; }
      }
      .speaker-row.master.muted .speaker-icon-btn { color: var(--c-alert); }
      .speaker-icon-btn.static { cursor: default; }

      /* ── Volume slider ── */
      glass-slider { flex: 1; }

      /* ── Chips row container (chips themselves are <glass-chip>) ── */
      .chips-row { display: flex; gap: 0.375rem; flex-wrap: wrap; }

      /* ── Speakers list (multiroom) — sections container. Eyebrows now use
         <glass-section-title>. ── */
      .speakers-section,
      .media-section { display: flex; flex-direction: column; gap: 0.4375rem; }
      .speakers-count {
        display: inline-flex; align-items: center; justify-content: center;
        height: 1rem; padding: 0 0.4375rem;
        border-radius: var(--radius-full);
        background: var(--s2); color: var(--t3);
        font-size: var(--fz-xxs); font-weight: 700;
        letter-spacing: 0.5px;
      }
      /* Icon and slider read as one continuous bar. Radius aligned with the
         segmented controls/queue toggle above for visual consistency. */
      .speakers-list { display: flex; flex-direction: column; gap: 0.375rem; }
      .speaker-row {
        display: flex; align-items: stretch; height: 2.25rem;
        border-radius: var(--radius-lg);
        background: var(--s2); border: 1px solid var(--b1);
        overflow: hidden;
        transition: border-color var(--t-fast);
      }
      /* Joined speakers share the master's white tint (the whole group reads
         as a single tonal family). */
      .speaker-row:is(.master, .joined) {
        border-color: rgba(var(--rgb-white), 0.18);
      }

      .speaker-icon-btn {
        width: 2rem; flex-shrink: 0;
        background: var(--s3); border: none;
        border-right: 1px solid var(--b1);
        padding: 0; outline: none; cursor: pointer;
        display: flex; align-items: center; justify-content: center;
        color: var(--t4);
        transition: background var(--t-fast), color var(--t-fast);
        -webkit-tap-highlight-color: transparent;
      }
      .speaker-icon-btn ha-icon {
        --mdc-icon-size: 0.875rem;
        display: flex; align-items: center; justify-content: center;
      }
      .speaker-row:is(.master, .joined) .speaker-icon-btn {
        background: rgba(var(--rgb-white), 0.08);
        color: rgba(var(--rgb-white), 0.85);
        border-right-color: rgba(var(--rgb-white), 0.18);
      }
      @media (hover: hover) and (pointer: fine) {
        .speaker-row:not(.master):not(.joined) .speaker-icon-btn:hover { background: var(--s4); color: var(--t2); }
      }
      .speaker-icon-btn:focus-visible { outline: 2px solid rgba(var(--rgb-white),0.25); outline-offset: -2px; }

      .speaker-vol-slider {
        position: relative; flex: 1;
        align-self: stretch;
        display: flex; align-items: center; justify-content: space-between;
        gap: 0.5rem;
        padding: 0 0.625rem;
        background: var(--s1);
        overflow: hidden;
        cursor: pointer; touch-action: none;
        user-select: none; -webkit-user-select: none;
        transition: opacity var(--t-fast);
        outline: none;
      }
      .speaker-vol-slider:focus-visible {
        outline: 2px solid rgba(var(--rgb-white), 0.35);
        outline-offset: -2px;
      }
      .speaker-row:not(.master):not(.joined) .speaker-vol-slider {
        opacity: 0.4; pointer-events: none; cursor: default;
      }
      .speaker-vol-fill {
        position: absolute; top: 0; left: 0; height: 100%;
        pointer-events: none;
        background: linear-gradient(90deg,
          rgba(var(--rgb-white), 0.05),
          rgba(var(--rgb-white), 0.1));
        transition: width var(--t-fast);
      }
      .speaker-row:is(.master, .joined) .speaker-vol-fill {
        background: linear-gradient(90deg,
          rgba(var(--rgb-white), 0.08),
          rgba(var(--rgb-white), 0.18));
      }
      .speaker-vol-slider:active .speaker-vol-fill { transition: none; }
      .speaker-vol-name {
        position: relative; z-index: 1; pointer-events: none;
        display: inline-flex; align-items: center;
        font-size: var(--fz-sm); font-weight: 600; line-height: 1; color: var(--t1);
        white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        max-width: 60%;
        text-shadow: 0 1px 2px rgba(var(--rgb-black), 0.25);
      }
      .speaker-row:not(.master):not(.joined) .speaker-vol-name { color: var(--t3); text-shadow: none; }
      .speaker-vol-val {
        position: relative; z-index: 1; pointer-events: none;
        display: inline-flex; align-items: center;
        font-size: var(--fz-xs); font-weight: 700; line-height: 1; color: var(--t2);
        font-variant-numeric: tabular-nums;
      }
      .speaker-row:is(.master, .joined) .speaker-vol-val { color: var(--t1); }
      @media (prefers-reduced-motion: reduce) {
        .speaker-row, .speaker-vol-fill, .speaker-vol-slider, .speaker-icon-btn { transition: none; }
      }

      /* ── Segmented control (Controls / Queue) handled by <glass-tabs>. ── */

      /* ── Queue tab ── */
      .queue-loading, .queue-empty {
        text-align: center;
        padding: 1.25rem 0;
        font-size: var(--fz-base);
        color: rgba(var(--rgb-white),0.6);
        font-weight: 500;
      }
      .queue-list {
        max-height: 17.5rem;
        overflow-y: auto;
        scrollbar-width: none;
      }
      .queue-list::-webkit-scrollbar { display: none; }
      .queue-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.375rem 0.25rem;
      }
      .queue-num {
        width: 1.25rem;
        flex-shrink: 0;
        font-size: var(--fz-base);
        font-weight: 500;
        color: rgba(var(--rgb-white),0.5);
        text-align: center;
      }
      .queue-info {
        flex: 1;
        min-width: 0;
        display: flex;
        flex-direction: column;
        overflow: hidden;
      }
      .queue-title {
        font-size: var(--fz-base);
        font-weight: 500;
        color: #fff;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .queue-artist {
        font-size: var(--fz-sm);
        color: rgba(var(--rgb-white),0.6);
      }
      .queue-badge {
        font-size: var(--fz-xs);
        padding: 0.0625rem 0.3125rem;
        border-radius: var(--radius-sm);
        background: rgba(var(--rgb-white),0.08);
        color: rgba(var(--rgb-white),0.85);
        flex-shrink: 0;
      }
      /* Queue row remove button uses <glass-icon-button size="sm">.
         Dim it by default and reveal on hover. */
      .queue-item glass-icon-button { opacity: 0.4; transition: opacity var(--t-fast); }
      @media (hover: hover) and (pointer: fine) {
        .queue-item:hover glass-icon-button { opacity: 1; }
      }
    `;
