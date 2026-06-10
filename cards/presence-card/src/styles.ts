import { css } from 'lit';

export const presenceCardStyles = css`
      :host {
        width: 100%;
        max-width: 31.25rem;
        margin: 0 auto;
        user-select: none;
        -webkit-user-select: none;
      }

      /* ── Header ── */
      .card-header {
        display: flex; align-items: center; justify-content: space-between;
        width: 100%; padding: 0 0.375rem; min-height: 1.375rem; margin-bottom: 0.375rem;
        box-sizing: border-box;
      }
      .card-header-left { display: flex; align-items: center; gap: 0.5rem; }
      .card-title {
        font-size: var(--fz-xs); font-weight: 700;
        text-transform: uppercase; letter-spacing: 1.5px;
        color: var(--t4);
      }
      .card-count {
        display: inline-flex; align-items: center; justify-content: center;
        min-width: 0.875rem; height: 0.875rem; padding: 0 0.25rem;
        border-radius: var(--radius-full);
        font-size: var(--fz-xs); font-weight: 600;
        transition: background var(--t-med), color var(--t-med);
      }
      .card-count.all-home { background: rgba(var(--rgb-success),0.15); color: var(--c-success); }
      .card-count.all-away { background: rgba(var(--rgb-alert),0.15); color: var(--c-alert); }
      .card-count.mixed { background: rgba(var(--rgb-warning),0.15); color: var(--c-warning); }

      /* ── Presence card ── */
      .presence-card { padding: 0.4375rem 0.875rem; width: 100%; box-sizing: border-box; position: relative; overflow: hidden; }

      /* Atmospheric halo at the card bottom — color-shifted per presence */
      .presence-card::after {
        content: ''; position: absolute; left: 0; right: 0; bottom: 0;
        height: 45%; pointer-events: none; z-index: 0;
        background: radial-gradient(ellipse 70% 60% at 50% 100%, rgba(var(--rgb-accent), 0.08), transparent 70%);
        transition: opacity var(--t-slow), background var(--t-slow);
      }
      .presence-card[data-presence="home"]::after {
        background: radial-gradient(ellipse 70% 60% at 50% 100%, rgba(var(--rgb-success), 0.1), transparent 70%);
      }
      .presence-card[data-presence="away"]::after {
        background: radial-gradient(ellipse 70% 60% at 50% 100%, rgba(var(--rgb-alert), 0.08), transparent 70%);
      }
      .presence-card[data-presence="mixed"]::after {
        background: radial-gradient(ellipse 70% 60% at 50% 100%, rgba(var(--rgb-warning), 0.08), transparent 70%);
      }
      @media (prefers-reduced-motion: reduce) {
        .presence-card::after { transition: none; }
      }

      .card-tint {
        position: absolute; inset: 0; border-radius: inherit;
        opacity: 0.06; z-index: 0;
        transition: opacity var(--t-slow), background var(--t-slow);
        pointer-events: none;
      }
      .presence-card[data-presence="home"] .card-tint {
        background: radial-gradient(ellipse at 50% 50%, var(--c-success), transparent 70%);
        opacity: 0.1;
      }
      .presence-card[data-presence="away"] .card-tint {
        background: radial-gradient(ellipse at 50% 50%, var(--c-alert), transparent 70%);
        opacity: 0.09;
      }
      .presence-card[data-presence="mixed"] .card-tint {
        background: linear-gradient(to right, rgba(var(--rgb-success),0.15), transparent 40%, transparent 60%, rgba(var(--rgb-alert),0.15));
        opacity: 0.5;
      }

      .card-inner {
        position: relative; z-index: 1;
        display: flex; align-items: center;
      }

      /* Solo: person left, chips right */
      .card-inner.solo-layout { justify-content: space-between; gap: 0.5rem; }

      /* Family: stacked pair rows */
      .card-inner.family-layout { flex-direction: column; gap: 0; }
      .family-row { display: flex; align-items: center; width: 100%; }
      .family-sep {
        height: 0.0625rem; margin: 0.5rem 0.75rem;
        background: linear-gradient(90deg, transparent, rgba(var(--rgb-accent), 0.25), transparent);
      }
      .family-row.solo-row { justify-content: center; }
      .family-row.solo-row .person-block { flex: 0 1 auto; }

      /* ── Person block ── */
      .person-block {
        display: flex; align-items: center; gap: 0.625rem;
        flex: 1; min-width: 0;
        transition: opacity var(--t-med);
      }
      .person-block.right { flex-direction: row-reverse; text-align: right; }
      /* When another person is active, fade out non-active blocks so the
         selected one stands out without needing to repeat the name in the fold */
      .person-block.dimmed { opacity: 0.32; }
      .distance-center.dimmed { opacity: 0.32; transition: opacity var(--t-med); }
      @media (prefers-reduced-motion: reduce) {
        .person-block, .distance-center { transition: none; }
      }

      .avatar-wrapper {
        position: relative; flex-shrink: 0;
        cursor: pointer; background: none; border: none;
        padding: 0; border-radius: 50%;
        -webkit-tap-highlight-color: transparent;
      }
      .avatar-wrapper:not(:focus-visible) { outline: none; }
      .avatar-wrapper:active { transform: scale(0.96); }
      .avatar-wrapper:focus-visible { outline: 2px solid rgba(var(--rgb-white),0.25); outline-offset: 2px; }

      .avatar {
        width: 2.375rem; height: 2.375rem; border-radius: 50%;
        display: flex; align-items: center; justify-content: center;
        transition: border-color var(--t-fast), box-shadow var(--t-fast);
        object-fit: cover;
      }
      .avatar-fallback { border: none; }
      img.avatar { display: block; }
      .avatar-fallback ha-icon {
        display: flex; align-items: center; justify-content: center;
        --mdc-icon-size: var(--icon-lg); color: rgba(var(--rgb-white),0.85);
      }

      /* Active state: when this person's fold is open, ring + glow the avatar */
      @media (prefers-reduced-motion: reduce) {
        .avatar { transition: none; }
      }


      .avatar-status {
        position: absolute; bottom: -0.0625rem; right: -0.0625rem;
        width: 0.75rem; height: 0.75rem; border-radius: 50%;
        border: 2px solid rgba(15,25,35,0.9);
        transition: background var(--t-med), box-shadow var(--t-med);
      }
      .avatar-status.home { background: var(--c-success); box-shadow: 0 0 6px rgba(var(--rgb-success),0.5); }
      .avatar-status.away { background: var(--c-alert); box-shadow: 0 0 6px rgba(var(--rgb-alert),0.5); }

      /* Sleeping: dim + slight transparency, like a "resting" state */
      .avatar.sleeping {
        filter: saturate(0.45) brightness(0.78);
        opacity: 0.7;
      }
      .sleep-badge {
        position: absolute; top: -0.1875rem; left: -0.375rem;
        display: inline-flex; align-items: center; justify-content: center;
        min-width: 1.25rem; height: 0.9375rem;
        padding: 0 0.3125rem;
        border-radius: var(--radius-full);
        background: var(--s4); border: 1px solid var(--b1);
        font-family: inherit; font-weight: 700;
        font-size: 0.5625rem; letter-spacing: 0.08em; line-height: 1;
        color: var(--t2);
        transform-origin: center;
        animation: sleep-breathing 3.2s cubic-bezier(0.45, 0, 0.55, 1) infinite;
      }
      .person-block.right .sleep-badge { left: auto; right: -0.375rem; }
      @keyframes sleep-breathing {
        0%, 100% { opacity: 0.65; transform: scale(0.94); }
        50%      { opacity: 1;    transform: scale(1.06); }
      }
      @media (prefers-reduced-motion: reduce) {
        .sleep-badge { animation: none; }
      }
      .avatar-status.zone { background: var(--c-info); box-shadow: 0 0 6px rgba(var(--rgb-info),0.5); }

      .avatar-unavailable {
        border: 2px solid var(--c-alert);
        background: rgba(var(--rgb-alert), 0.1);
        color: var(--c-warning);
      }
      .avatar-unavailable ha-icon {
        --mdc-icon-size: var(--icon-md);
        color: var(--c-warning);
      }

      .person-info { min-width: 0; flex: 1; }
      .person-name { font-size: var(--fz-md); font-weight: 600; color: var(--t1); line-height: 1.2; }
      .person-block.right .person-name { text-align: right; }

      .person-sub { display: flex; flex-direction: column; gap: 0.125rem; margin-top: 0.125rem; }
      .person-block.right .person-sub { align-items: flex-end; }

      .person-line { display: flex; align-items: center; gap: 0.25rem; min-width: 0; }
      .person-block.right .person-line { flex-direction: row-reverse; }

      .person-location {
        font-size: var(--fz-sm); font-weight: 500; color: var(--t3);
        white-space: nowrap; overflow: hidden; min-width: 0; text-overflow: ellipsis;
      }
      .source-icon { display: flex; align-items: center; flex-shrink: 0; }
      .source-icon ha-icon {
        display: flex; align-items: center; justify-content: center;
        --mdc-icon-size: var(--icon-xs); color: var(--t4);
      }

      .driving-icon { display: flex; align-items: center; flex-shrink: 0; }
      .driving-icon ha-icon {
        display: flex; align-items: center; justify-content: center;
        --mdc-icon-size: 0.75rem; color: var(--c-info); opacity: 0.7;
      }

      /* ── Distance ── */
      .distance-center { flex-shrink: 0; display: flex; align-items: center; padding: 0; gap: 0; }
      .distance-line {
        width: 1.25rem; height: 0.0625rem;
        background: linear-gradient(to right, var(--b1), var(--b3));
      }
      .distance-line.right { background: linear-gradient(to right, var(--b3), var(--b1)); }
      .distance-info {
        display: flex; flex-direction: column; align-items: center;
        gap: 0.0625rem; padding: 0 0.25rem;
      }
      .distance-value { font-size: var(--fz-lg); font-weight: 700; color: var(--t2); white-space: nowrap; line-height: 1; }
      .distance-unit { font-size: var(--fz-xs); font-weight: 400; color: var(--t4); text-align: center; line-height: 1; }

      .heart-pulse {
        display: none; color: #f472b6; line-height: 1; padding: 0 0.25rem;
        filter: drop-shadow(0 0 4px rgba(244,114,182,0.35));
        animation: pulse-beat 2.5s ease-in-out infinite;
      }
      .heart-pulse ha-icon {
        display: flex; align-items: center; justify-content: center;
        --mdc-icon-size: var(--icon-md);
      }
      .distance-center.near .heart-pulse { display: flex; align-items: center; }
      .distance-center.near .distance-info { display: none; }
      @keyframes pulse-beat {
        0%, 100% { transform: scale(1); opacity: 0.55; }
        50% { transform: scale(1.05); opacity: 0.85; }
      }
      @media (prefers-reduced-motion: reduce) {
        .heart-pulse { animation: none; }
      }

      /* ── Solo health chips (rendered as <glass-pill>) ── */
      .solo-health-chips { display: flex; align-items: center; gap: 0.3125rem; flex-shrink: 0; }
      .solo-health-chips glass-pill ha-icon {
        --mdc-icon-size: 0.75rem;
        display: flex; align-items: center; justify-content: center;
      }

      /* ── Fold ── */
      .fold-sep {
        height: 0.0625rem; margin: 0.5rem 0.75rem 0;
        background: linear-gradient(90deg, transparent, rgba(var(--rgb-purple),0.25), transparent);
        opacity: 0; transition: opacity 0.25s var(--ease-std);
      }
      .fold-sep.home { background: linear-gradient(90deg, transparent, rgba(var(--rgb-success),0.3), transparent); }
      .fold-sep.mixed { background: linear-gradient(90deg, transparent, rgba(var(--rgb-info),0.3), transparent); }
      .fold-sep.away { background: linear-gradient(90deg, transparent, rgba(var(--rgb-alert),0.3), transparent); }
      .fold-sep.visible { opacity: 1; }
      .fold-sep.bottom { margin: 0 0.75rem 0.25rem; }

      .ctrl-fold {
        pointer-events: none;
        display: grid; grid-template-rows: 0fr;
        transition: grid-template-rows var(--t-layout);
        position: relative; z-index: 1;
      }
      .ctrl-fold.open { grid-template-rows: 1fr; pointer-events: auto; }
      .ctrl-fold-inner { overflow: hidden; opacity: 0; transition: opacity 0.25s var(--ease-std); }
      .ctrl-fold.open .ctrl-fold-inner { opacity: 1; transition-delay: 0.1s; }

      .fold-content { display: flex; flex-direction: column; gap: 0.5rem; padding-top: 0.5rem; }

      /* ── Health zone ── */
      /* Address + meta row — boxed, hierarchy via typography and state colors */
      .loc-row {
        display: flex; flex-wrap: wrap; align-items: center;
        column-gap: 0.625rem; row-gap: 0.3125rem;
        padding: 0.4375rem 0.625rem;
        border-radius: var(--radius-sm);
        background: var(--s1); border: 1px solid var(--b1);
      }
      .loc-address {
        flex: 1 1 auto; min-width: 0;
        display: inline-flex; align-items: center; gap: 0.375rem;
        font-size: var(--fz-sm); font-weight: 600; color: var(--t1);
      }
      .loc-address ha-icon {
        display: flex; align-items: center; justify-content: center;
        --mdc-icon-size: 0.875rem;
        color: rgb(var(--rgb-info));
        flex-shrink: 0;
      }
      .loc-address-text {
        white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        min-width: 0; flex: 0 1 auto;
      }
      .loc-address-time {
        font-size: var(--fz-xs); font-weight: 500;
        color: var(--t4); flex-shrink: 0;
        font-variant-numeric: tabular-nums;
      }
      .loc-address-text + .loc-address-time::before {
        content: '·'; margin-right: 0.3125rem; opacity: 0.5;
      }
      .loc-address-time.lastseen-stale { color: var(--c-warning); }
      .loc-address-time.lastseen-old { color: var(--c-alert); }
      .meta-chip {
        display: inline-flex; align-items: center; gap: 0.25rem;
        font-size: var(--fz-xs); font-weight: 600;
        color: var(--t4); font-variant-numeric: tabular-nums;
        white-space: nowrap;
      }
      .meta-chip ha-icon {
        display: flex; align-items: center; justify-content: center;
        --mdc-icon-size: 0.8125rem;
        color: var(--t4);
      }
      /* Battery state colours */
      .meta-chip.battery-high ha-icon { color: var(--c-success); }
      .meta-chip.battery-medium { color: var(--c-warning); }
      .meta-chip.battery-medium ha-icon { color: var(--c-warning); }
      .meta-chip.battery-low { color: var(--c-alert); }
      .meta-chip.battery-low ha-icon { color: var(--c-alert); }
      /* Charging: subtle pulse on the icon to signal active charge */
      .meta-chip.charging ha-icon { animation: charge-pulse 1.8s ease-in-out infinite; }
      @keyframes charge-pulse {
        0%, 100% { opacity: 0.7; }
        50% { opacity: 1; }
      }
      @media (prefers-reduced-motion: reduce) {
        .meta-chip.charging ha-icon { animation: none; }
      }
      /* Last-seen freshness */
      .meta-chip.lastseen-fresh ha-icon { color: rgba(var(--rgb-success), 0.65); }
      .meta-chip.lastseen-stale { color: var(--c-warning); }
      .meta-chip.lastseen-stale ha-icon { color: var(--c-warning); }
      .meta-chip.lastseen-old { color: var(--c-alert); }
      .meta-chip.lastseen-old ha-icon { color: var(--c-alert); }

      .health-pills { display: flex; gap: 0.375rem; }
      .health-pill {
        flex: 1; display: flex; align-items: center; gap: 0.375rem;
        padding: 0.375rem 0.625rem; border-radius: var(--radius-md);
        background: var(--s1); border: 1px solid var(--b1);
        transition: background var(--t-fast), border-color var(--t-fast);
      }
      @media (hover: hover) and (pointer: fine) {
        .health-pill:hover { background: var(--s3); border-color: var(--b2); }
      }
      .health-pill-icon { flex-shrink: 0; display: flex; align-items: center; }
      .health-pill-icon ha-icon {
        display: flex; align-items: center; justify-content: center;
        --mdc-icon-size: var(--icon-sm);
      }
      .health-pill-data { display: flex; flex-direction: column; min-width: 0; }
      .health-pill-value { font-size: var(--fz-md); font-weight: 700; line-height: 1.1; color: var(--t1); }
      .health-pill-label {
        font-size: var(--fz-xxs); font-weight: 500; text-transform: uppercase;
        letter-spacing: 0.8px; color: var(--t4); line-height: 1.2;
      }

      .health-pill.bpm .health-pill-icon ha-icon { color: var(--c-alert); }
      .health-pill.bpm .health-pill-value { color: var(--c-alert); opacity: 0.85; }
      .health-pill.spo2 .health-pill-icon ha-icon { color: var(--c-info); }
      .health-pill.spo2 .health-pill-value { color: var(--c-info); opacity: 0.85; }
      .health-pill.steps .health-pill-icon ha-icon { color: var(--c-success); }
      .health-pill.steps .health-pill-value { color: var(--c-success); opacity: 0.85; }

      /* ── Notification zone ── */
      .notif-zone { display: flex; gap: 0.5rem; flex-direction: column; }
      .notif-row { display: flex; gap: 0.5rem; align-items: center; }
      .notif-row .notif-input { flex: 1; }

      .notif-toast {
        display: flex; align-items: center; justify-content: center; gap: 0.375rem;
        padding: 0.5rem; font-size: var(--fz-base); font-weight: 600;
        color: var(--c-success);
        animation: toast-in 0.3s var(--ease-out, cubic-bezier(0.16, 1, 0.3, 1));
      }
      .notif-toast ha-icon {
        --mdc-icon-size: 1rem; display: flex; align-items: center; justify-content: center;
      }
      @keyframes toast-in {
        from { opacity: 0; transform: scale(0.9); }
        to   { opacity: 1; transform: scale(1); }
      }

      @media (pointer: coarse) {
        .avatar-wrapper:active { animation: bounce 0.3s ease; }
      }
    `;
