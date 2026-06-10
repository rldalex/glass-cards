import { css } from 'lit';

export const spotifyCardStyles = css`
    :host {
      width: 100%; max-width: 31.25rem; margin: 0 auto;
      user-select: none; -webkit-user-select: none;
      /* "On Spotify" — dark near-black tinted toward spotify green, used for text/icons over the saturated spotify background */
      --c-spotify-on: var(--c-spotify-on);
    }

    .spotify-card-wrap { display: flex; flex-direction: column; gap: 0.375rem; }

    .card-header { display: flex; align-items: center; justify-content: space-between; padding: 0 0.375rem; min-height: 1.375rem; }
    .card-header-left { display: flex; align-items: center; gap: 0.5rem; }
    .card-title {
      font-size: var(--fz-xs); font-weight: 700; text-transform: uppercase;
      letter-spacing: 1.5px; color: var(--t4); display: flex; align-items: center; gap: 0.25rem;
    }
    .card-title ha-icon { color: var(--c-spotify); --mdc-icon-size: var(--icon-sm); display: flex; align-items: center; justify-content: center; }

    .spotify-card { position: relative; width: 100%; padding: 0.875rem; box-sizing: border-box; overflow: hidden; }
    .card-inner { position: relative; z-index: 1; display: flex; flex-direction: column; gap: 0; }

    .tint {
      position: absolute; inset: 0; border-radius: inherit;
      pointer-events: none; z-index: 0;
      background: radial-gradient(ellipse at 20% 20%, rgba(var(--rgb-spotify),0.12), transparent 70%);
      opacity: 0.6;
    }
    .spotify-card::after {
      content: ''; position: absolute; left: 0; right: 0; bottom: 0;
      height: 60%; pointer-events: none; z-index: 0;
      background: radial-gradient(ellipse 70% 60% at 50% 100%, rgba(var(--rgb-spotify), 0.10), transparent 70%);
      opacity: 0; transition: opacity var(--t-slow);
    }
    .spotify-card.fold-open::after { opacity: 1; }
    @media (prefers-reduced-motion: reduce) {
      .spotify-card::after { transition: none; }
    }

    /* Search */
    .search-row { display: flex; gap: 0.375rem; align-items: center; }
    .search-input-wrap { position: relative; flex: 1; }
    .search-input {
      width: 100%; height: 2.25rem; padding: 0 2.25rem 0 2.125rem;
      border-radius: var(--radius-lg); background: var(--s2);
      border: 1px solid var(--b2); color: var(--t1);
      font-family: inherit; font-size: var(--fz-base); font-weight: 500;
      outline: none; transition: border-color var(--t-fast), background var(--t-fast), box-shadow var(--t-fast);
      -webkit-tap-highlight-color: transparent; box-sizing: border-box;
    }
    .search-input::placeholder { color: var(--t4); }
    .search-input:focus {
      border-color: rgba(var(--rgb-spotify), 0.5);
      background: var(--s3);
      box-shadow:
        0 0 0 3px rgba(var(--rgb-spotify), 0.12),
        0 4px 14px rgba(var(--rgb-spotify), 0.18);
    }
    .search-icon {
      position: absolute; top: 50%; left: 0.625rem; transform: translateY(-50%);
      pointer-events: none; display: flex; align-items: center; justify-content: center;
    }
    .search-icon ha-icon {
      --mdc-icon-size: 1rem; color: var(--t4);
      display: flex; align-items: center; justify-content: center;
      transition: color var(--t-fast);
    }
    .search-input-wrap:has(.search-input:focus) .search-icon ha-icon { color: var(--c-spotify); }

    /* — Now-playing bar (replaces search bar when something is playing and fold is closed) — */
    .np-bar {
      display: flex; align-items: center; gap: 0.5rem;
      min-height: var(--tap-lg);
    }
    .np-art {
      width: 2.5rem; height: 2.5rem; border-radius: var(--radius-sm);
      flex-shrink: 0; overflow: hidden;
      background: var(--s2); border: 1px solid var(--b1);
      display: flex; align-items: center; justify-content: center;
      box-shadow: 0 4px 12px rgba(var(--rgb-black), 0.3), 0 0 12px rgba(var(--rgb-spotify), 0.18);
    }
    .np-art img { width: 100%; height: 100%; object-fit: cover; }
    .np-art ha-icon {
      --mdc-icon-size: 1.125rem;
      color: color-mix(in srgb, var(--c-spotify) 60%, var(--t4));
      display: flex; align-items: center; justify-content: center;
    }
    .np-meta { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 0.0625rem; }
    .np-title {
      font-size: var(--fz-base); font-weight: 600; color: var(--t1); line-height: 1.2;
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }
    .np-artist {
      font-size: var(--fz-sm); font-weight: 500; color: var(--t3); line-height: 1.2;
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }
    /* Progress display (read-only) — Spotify HA n'expose pas de transport
       fiable, on affiche juste position / durée + barre statique. */
    .np-progress {
      display: flex; flex-direction: column; gap: 0.1875rem;
      margin-top: 0.25rem;
    }
    .np-progress-track {
      height: 0.125rem; border-radius: var(--radius-full);
      background: rgba(var(--rgb-white), 0.08);
      overflow: hidden;
    }
    .np-progress-fill {
      height: 100%; border-radius: inherit;
      background: var(--c-spotify);
      box-shadow: 0 0 6px rgba(var(--rgb-spotify), 0.4);
      transition: width 1s linear;
    }
    .np-progress-time {
      display: flex; justify-content: space-between;
      font-size: var(--fz-xxs); font-weight: 500;
      color: var(--t4); font-variant-numeric: tabular-nums;
    }
    @media (prefers-reduced-motion: reduce) {
      .np-progress-fill { transition: none; }
    }

    /* Search affordance in np-bar — small magnify icon button */
    .np-btn-search { margin-left: 0.25rem; align-self: center; }

    /* Search-clear (visible only when query non-empty) — absolute positioning
       inside the input wrapper. The button styling itself is handled by
       <glass-icon-button size="sm">. */
    .search-clear {
      position: absolute; top: 50%; right: 1.875rem; transform: translateY(-50%);
      display: none;
    }
    .search-clear.visible { display: inline-flex; }

    /* Fold toggle arrow (inside search bar) — absolute positioning only.
       The button styling itself is handled by <glass-icon-button size="sm">. */
    .search-toggle {
      position: absolute; top: 50%; right: 0.375rem; transform: translateY(-50%);
    }

    /* Content fold (CSS Grid 0fr/1fr) */
    .sp-fold {
      display: grid; grid-template-rows: 0fr;
      transition: grid-template-rows var(--t-layout);
      pointer-events: none;
    }
    .sp-fold.open { grid-template-rows: 1fr; pointer-events: auto; }
    .sp-fold-inner {
      overflow: hidden; opacity: 0; min-height: 0;
      transition: opacity var(--t-fast) 0s;
      display: flex; flex-direction: column; gap: 0.625rem;
    }
    .sp-fold.open .sp-fold-inner { padding-top: 0.625rem; }
    .sp-fold.open .sp-fold-inner {
      opacity: 1;
      transition: opacity var(--t-fast) 0.1s;
    }

    /* Fold separator */
    .sp-fold-sep {
      height: 0.0625rem; margin: 0.125rem 0.75rem 0;
      background: linear-gradient(90deg, transparent, rgba(var(--rgb-spotify),0.15), transparent);
      opacity: 0; transition: opacity var(--t-fast);
    }
    .sp-fold.open + .sp-fold-sep { opacity: 1; }

    /* Tabs — sliding rail */
    .tab-rail {
      position: relative;
      display: grid; grid-template-columns: repeat(4, 1fr);
      padding: 0.1875rem;
      border-radius: var(--radius-md);
      background: var(--s1); border: 1px solid var(--b1);
    }
    .tab-rail-capsule {
      position: absolute; top: 0.1875rem; bottom: 0.1875rem;
      left: 0.1875rem; width: calc((100% - 0.375rem) / 4);
      border-radius: calc(var(--radius-md) - 0.1875rem);
      background: color-mix(in srgb, var(--c-spotify) 18%, transparent);
      border: 1px solid color-mix(in srgb, var(--c-spotify) 30%, transparent);
      box-shadow: 0 1px 6px color-mix(in srgb, var(--c-spotify) 25%, transparent);
      transform: translateX(calc(var(--tab-active-idx, 0) * 100%));
      transition: transform var(--t-layout);
      pointer-events: none;
      z-index: 0;
    }
    .tab-btn {
      position: relative; z-index: 1;
      height: 1.875rem;
      display: flex; align-items: center; justify-content: center; gap: 0.3125rem;
      background: transparent; border: none; color: var(--t3);
      font-family: inherit; font-size: var(--fz-sm); font-weight: 600;
      cursor: pointer; outline: none; padding: 0;
      transition: color var(--t-fast), transform var(--t-fast);
      -webkit-tap-highlight-color: transparent;
    }
    .tab-btn ha-icon { --mdc-icon-size: var(--icon-sm); display: flex; align-items: center; justify-content: center; }
    @media (hover: hover) and (pointer: fine) { .tab-btn:not(.active):hover { color: var(--t2); } }
    .tab-btn:focus-visible { outline: 2px solid rgba(var(--rgb-white),0.25); outline-offset: -2px; }
    @media (hover: hover) and (pointer: fine) { .tab-btn:active { transform: scale(0.96); } }
    @media (pointer: coarse) { .tab-btn:active { animation: bounce 0.3s ease; } }
    .tab-btn.active { color: var(--c-spotify); font-weight: 700; }

    @media (prefers-reduced-motion: reduce) {
      .tab-rail-capsule { transition: none; }
    }

    /* Content area */
    .content-area {
      display: flex; flex-direction: column; gap: 0.375rem;
      max-height: 23.75rem; overflow-y: auto; overflow-x: hidden; scrollbar-width: none;
    }
    .content-area::-webkit-scrollbar { display: none; }

    /* Section title (drilldown / search result groups) */
    .section-title {
      font-size: var(--fz-xs); font-weight: 700; text-transform: uppercase;
      letter-spacing: 1.2px; color: var(--t4); padding: 0.25rem 0.125rem 0.125rem; flex-shrink: 0;
    }

    /* Library section with eyebrow */
    .lib-section { display: flex; flex-direction: column; gap: 0.375rem; flex-shrink: 0; }
    .lib-eyebrow {
      display: flex; align-items: center; gap: 0.4375rem;
      padding: 0 0.125rem;
      min-height: 1.625rem;
      font-size: var(--fz-sm); font-weight: 700; color: var(--t2);
      letter-spacing: 0.1px;
    }
    .lib-eyebrow-dot {
      width: 0.375rem; height: 0.375rem; border-radius: 50%; flex-shrink: 0;
      background: var(--lib-dot-color, var(--t3));
      box-shadow: 0 0 6px var(--lib-dot-glow, transparent);
    }
    .lib-eyebrow-recents   { --lib-dot-color: var(--cl-heat);   --lib-dot-glow: rgba(var(--rgb-heat), 0.45); }
    .lib-eyebrow-playlists { --lib-dot-color: var(--c-spotify); --lib-dot-glow: rgba(var(--rgb-spotify), 0.45); }
    .lib-eyebrow-saved     { --lib-dot-color: var(--c-accent);  --lib-dot-glow: rgba(var(--rgb-accent), 0.45); }
    .lib-eyebrow-podcasts  { --lib-dot-color: var(--c-purple);  --lib-dot-glow: rgba(var(--rgb-purple), 0.45); }
    .lib-eyebrow-tracks    { --lib-dot-color: var(--c-spotify); --lib-dot-glow: rgba(var(--rgb-spotify), 0.45); }

    .search-more-standalone {
      display: flex; justify-content: flex-end;
      padding: 0.25rem 0.125rem 0;
    }
    .search-more-standalone .lib-more-link { margin-left: 0; }

    /* Load more (text link, right-aligned inside eyebrow) */
    .lib-more-link {
      position: relative;
      margin-left: auto;
      display: inline-flex; align-items: center; gap: 0.4375rem;
      background: none; border: none; padding: 0.25rem 0.375rem;
      border-radius: var(--radius-sm);
      font-family: inherit; font-size: var(--fz-sm); font-weight: 600;
      color: var(--t3); cursor: pointer; outline: none;
      transition: color var(--t-fast), background var(--t-fast);
      -webkit-tap-highlight-color: transparent;
    }
    .lib-more-link .lib-more-count { font-size: var(--fz-xs); font-weight: 500; color: var(--t4); }
    .lib-more-link:disabled { opacity: 0.5; cursor: default; }
    @media (hover: hover) and (pointer: fine) {
      .lib-more-link:not(:disabled):hover { color: var(--c-spotify); background: var(--s1); }
      .lib-more-link:not(:disabled):hover .lib-more-count { color: color-mix(in srgb, var(--c-spotify) 60%, var(--t3)); }
    }
    .lib-more-link:focus-visible { outline: 2px solid rgba(var(--rgb-white),0.25); outline-offset: -1px; }

    /* Result row */
    .result-row {
      display: flex; align-items: center; gap: 0.625rem;
      padding: 0.375rem 0.5rem 0.375rem 0.25rem; position: relative;
      transition: background var(--t-fast), transform var(--t-fast); border-radius: var(--radius-md);
      flex-shrink: 0; width: 100%; box-sizing: border-box;
    }
    .result-main {
      display: flex; align-items: center; gap: 0.625rem;
      flex: 1; min-width: 0; cursor: pointer;
      background: none; border: none; padding: 0; margin: 0;
      font-family: inherit; text-align: left; color: inherit; outline: none;
      -webkit-tap-highlight-color: transparent;
    }
    .result-main:focus-visible {
      outline: 2px solid rgba(var(--rgb-white),0.25); outline-offset: 2px;
      border-radius: var(--radius-sm);
    }
    @media (hover: hover) and (pointer: fine) {
      .result-row:hover { background: var(--s1); transform: translateX(2px); }
      .result-row:hover .result-art { box-shadow: 0 0 0 1px rgba(var(--rgb-spotify), 0.35), 0 4px 12px rgba(var(--rgb-black), 0.2); }
    }
    @media (hover: hover) and (pointer: fine) { .result-row:active { transform: translateX(2px) scale(0.99); } }
    @media (pointer: coarse) { .result-row:active { animation: bounce 0.3s ease; } }
    .result-row:focus-visible { outline: 2px solid rgba(var(--rgb-white),0.25); outline-offset: -2px; }

    .result-art {
      width: 2.625rem; height: 2.625rem; border-radius: var(--radius-sm); flex-shrink: 0;
      background: var(--s2); border: 1px solid var(--b1);
      display: flex; align-items: center; justify-content: center;
      overflow: hidden; position: relative;
      transition: box-shadow var(--t-fast), transform var(--t-fast);
    }
    .result-art.round { border-radius: 50%; }
    .result-art img { width: 100%; height: 100%; object-fit: cover; }
    .result-art ha-icon { --mdc-icon-size: var(--icon-md); color: var(--t4); display: flex; align-items: center; justify-content: center; }

    @media (prefers-reduced-motion: reduce) {
      .result-row, .result-row:hover { transform: none; }
      .playlist-art-play { transition: none; }
      .playlist-art-overlay { transition: none; }
      .lib-eyebrow-dot { box-shadow: none; }
    }

    .result-info { flex: 1; min-width: 0; }
    .result-title {
      font-size: var(--fz-base); font-weight: 600; color: var(--t1); line-height: 1.2;
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }
    .result-meta {
      font-size: var(--fz-sm); font-weight: 500; color: var(--t3); margin-top: 0.0625rem;
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
      display: flex; align-items: center; gap: 0.25rem;
    }
    .result-type-badge {
      font-size: var(--fz-xxs); font-weight: 700; text-transform: uppercase; letter-spacing: 0.4px;
      padding: 0.0625rem 0.25rem; border-radius: var(--radius-full);
      background: var(--s3); color: var(--t4); flex-shrink: 0;
    }

    /* Result-row play button — opacity reveal on row hover. The button
       itself is a <glass-icon-button size="sm" active-color="spotify">. */
    .result-play {
      opacity: 0; transform: scale(0.8); flex-shrink: 0;
      transition: opacity var(--t-fast), transform var(--t-fast);
    }
    @media (hover: hover) and (pointer: fine) {
      .result-row:hover .result-play { opacity: 1; transform: scale(1); }
    }
    /* Always show on coarse pointers (no hover) */
    @media (pointer: coarse) { .result-play { opacity: 1; transform: scale(1); } }

    /* Playlist grid (horizontal scroll) */
    .playlist-scroll {
      display: flex; gap: 0.5rem; overflow-x: auto; overflow-y: hidden;
      padding: 0.125rem 0.125rem 0.25rem; margin: 0 -0.125rem; scrollbar-width: none; flex-shrink: 0;
    }
    .playlist-scroll::-webkit-scrollbar { display: none; }

    .playlist-card {
      flex-shrink: 0; width: 5.25rem;
      display: flex; flex-direction: column; gap: 0.375rem;
      cursor: pointer; padding: 0; background: none; border: none;
      outline: none; text-align: left; font-family: inherit;
      -webkit-tap-highlight-color: transparent; color: inherit;
    }
    @media (hover: hover) and (pointer: fine) { .playlist-card:active { transform: scale(0.97); } }
    @media (pointer: coarse) { .playlist-card:active { animation: bounce 0.3s ease; } }
    .playlist-card:focus-visible { outline: 2px solid rgba(var(--rgb-white),0.25); outline-offset: 2px; }

    .playlist-art {
      width: 5.25rem; height: 5.25rem; border-radius: var(--radius-md);
      background: var(--s2); border: 1px solid var(--b1);
      display: flex; align-items: center; justify-content: center;
      overflow: hidden; position: relative;
      transition: border-color var(--t-fast), box-shadow var(--t-fast);
    }
    @media (hover: hover) and (pointer: fine) {
      .playlist-card:hover .playlist-art {
        border-color: color-mix(in srgb, var(--c-spotify) 40%, transparent);
        box-shadow: 0 8px 24px rgba(var(--rgb-black), 0.35);
      }
    }
    .playlist-art img { width: 100%; height: 100%; object-fit: cover; }
    .playlist-art-fallback {
      width: 100%; height: 100%;
      display: flex; align-items: center; justify-content: center;
      background: linear-gradient(135deg, color-mix(in srgb, var(--c-spotify) 25%, var(--s3)), var(--s2));
    }
    .playlist-art-fallback ha-icon {
      --mdc-icon-size: 2rem;
      color: color-mix(in srgb, var(--c-spotify) 60%, rgba(var(--rgb-white),0.4));
      display: flex; align-items: center; justify-content: center;
    }

    /* Hover overlay: bottom gradient + play CTA reveal */
    .playlist-art-overlay {
      position: absolute; inset: 0; pointer-events: none;
      background: linear-gradient(to top, rgba(var(--rgb-black), 0.55), transparent 55%);
      opacity: 0; transition: opacity var(--t-fast);
    }
    @media (hover: hover) and (pointer: fine) {
      .playlist-card:hover .playlist-art-overlay { opacity: 1; }
    }

    .playlist-art-play {
      position: absolute; bottom: 0.4375rem; right: 0.4375rem;
      width: 2rem; height: 2rem; border-radius: 50%;
      background: var(--c-spotify);
      display: flex; align-items: center; justify-content: center;
      opacity: 0; transform: translateY(6px) scale(0.85);
      transition: opacity var(--t-fast), transform var(--t-fast);
      box-shadow: 0 6px 18px rgba(var(--rgb-black),0.45), 0 0 12px rgba(var(--rgb-spotify), 0.4);
      pointer-events: none;
    }
    .playlist-art-play ha-icon {
      --mdc-icon-size: 1.125rem;
      color: var(--c-spotify-on);
      display: flex; align-items: center; justify-content: center;
    }
    @media (hover: hover) and (pointer: fine) {
      .playlist-card:hover .playlist-art-play { opacity: 1; transform: translateY(0) scale(1); }
    }

    .playlist-name {
      font-size: var(--fz-sm); font-weight: 600; color: var(--t2); line-height: 1.3;
      display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
      transition: color var(--t-fast);
    }
    @media (hover: hover) and (pointer: fine) {
      .playlist-card:hover .playlist-name { color: var(--t1); }
    }
    .playlist-count { font-size: var(--fz-xs); font-weight: 500; color: var(--t4); }

    /* Drilldown: hero + tracks */
    .drilldown { display: flex; flex-direction: column; gap: 0.75rem; }

    .drilldown-hero {
      position: relative;
      display: grid; grid-template-columns: auto 1fr;
      gap: 0.875rem;
      padding: 0.5rem 0.125rem 0.875rem;
      border-bottom: 1px solid var(--b1);
    }
    /* Drilldown back button — positioning only, glass-icon-button handles
       the rest. */
    .drilldown-back {
      position: absolute; top: 0; right: 0;
      z-index: 1;
    }

    .drilldown-hero-art {
      width: 5rem; height: 5rem; border-radius: var(--radius-md);
      background: var(--s2); flex-shrink: 0;
      display: flex; align-items: center; justify-content: center;
      overflow: hidden;
      box-shadow:
        0 12px 28px rgba(var(--rgb-black), 0.4),
        0 0 0 1px var(--b1) inset,
        0 0 18px rgba(var(--rgb-spotify), 0.12);
    }
    .drilldown-hero-art img { width: 100%; height: 100%; object-fit: cover; }
    .drilldown-hero-art ha-icon {
      --mdc-icon-size: 2rem;
      color: color-mix(in srgb, var(--c-spotify) 50%, var(--t4));
      display: flex; align-items: center; justify-content: center;
    }

    .drilldown-hero-info {
      min-width: 0;
      display: flex; flex-direction: column; gap: 0.25rem;
      justify-content: center;
      padding-right: 2.25rem;
    }
    .drilldown-hero-title {
      font-size: var(--fz-md); font-weight: 700; color: var(--t1); line-height: 1.2;
      display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
    }
    .drilldown-hero-meta {
      font-size: var(--fz-sm); font-weight: 500; color: var(--t3);
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }
    .drilldown-play-cta {
      position: relative;
      align-self: flex-start;
      margin-top: 0.375rem;
      display: inline-flex; align-items: center; gap: 0.375rem;
      padding: 0.375rem 0.75rem 0.375rem 0.5rem;
      border-radius: var(--radius-full);
      background: var(--c-spotify);
      border: none;
      color: var(--c-spotify-on);
      font-family: inherit; font-size: var(--fz-sm); font-weight: 700;
      cursor: pointer; outline: none;
      transition: background var(--t-fast), transform var(--t-fast), box-shadow var(--t-fast);
      box-shadow: 0 4px 14px rgba(var(--rgb-spotify), 0.3);
      -webkit-tap-highlight-color: transparent;
    }
    @media (pointer: coarse) {
      .drilldown-play-cta::after { content: ''; position: absolute; inset: -0.4375rem; }
    }
    .drilldown-play-cta ha-icon {
      --mdc-icon-size: 1rem;
      display: flex; align-items: center; justify-content: center;
    }
    .drilldown-play-cta:disabled { opacity: 0.4; cursor: default; box-shadow: none; }
    @media (hover: hover) and (pointer: fine) {
      .drilldown-play-cta:not(:disabled):hover {
        background: var(--c-spotify-hover);
        box-shadow: 0 6px 18px rgba(var(--rgb-spotify), 0.45);
      }
    }
    @media (hover: hover) { .drilldown-play-cta:active:not(:disabled) { transform: scale(0.96); } }
    @media (pointer: coarse) { .drilldown-play-cta:active:not(:disabled) { animation: bounce 0.3s ease; } }
    .drilldown-play-cta:focus-visible { outline: 2px solid rgba(var(--rgb-white),0.4); outline-offset: 2px; }

    .drilldown-tracks { flex: 1; min-height: 0; }

    /* — Empty / setup / error states (cohérent eyebrow + cercle ambient) — */
    .empty-state {
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      padding: 2rem 1.25rem; gap: 0.625rem; text-align: center;
    }
    .empty-state .ambient-icon {
      width: 3.25rem; height: 3.25rem; border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      background: color-mix(in srgb, var(--c-spotify) 10%, transparent);
      border: 1px solid color-mix(in srgb, var(--c-spotify) 22%, transparent);
      box-shadow: 0 0 18px rgba(var(--rgb-spotify), 0.15);
      margin-bottom: 0.125rem;
    }
    .empty-state .ambient-icon ha-icon {
      --mdc-icon-size: 1.5rem;
      color: color-mix(in srgb, var(--c-spotify) 70%, var(--t2));
      display: flex; align-items: center; justify-content: center;
    }
    .empty-state-title {
      font-size: var(--fz-md); font-weight: 700; color: var(--t1); line-height: 1.3;
    }
    .empty-state-sub {
      font-size: var(--fz-sm); font-weight: 500; color: var(--t3); line-height: 1.4;
      max-width: 22rem;
    }
    /* Alert variant */
    .empty-state.is-alert .ambient-icon {
      background: color-mix(in srgb, var(--c-alert) 10%, transparent);
      border-color: color-mix(in srgb, var(--c-alert) 22%, transparent);
      box-shadow: 0 0 18px rgba(var(--rgb-alert), 0.15);
    }
    .empty-state.is-alert .ambient-icon ha-icon {
      color: color-mix(in srgb, var(--c-alert) 80%, var(--t2));
    }

    /* Eyebrow for setup/error banners — same pattern as library */
    .banner-eyebrow {
      display: inline-flex; align-items: center; gap: 0.4375rem;
      font-size: var(--fz-sm); font-weight: 700;
      letter-spacing: 0.1px; margin-bottom: 0.25rem;
    }
    .banner-eyebrow-dot {
      width: 0.375rem; height: 0.375rem; border-radius: 50%; flex-shrink: 0;
    }
    .banner-eyebrow-setup { color: var(--c-spotify); }
    .banner-eyebrow-setup .banner-eyebrow-dot { background: var(--c-spotify); box-shadow: 0 0 8px rgba(var(--rgb-spotify), 0.6); }
    .banner-eyebrow-error { color: var(--c-alert); }
    .banner-eyebrow-error .banner-eyebrow-dot { background: var(--c-alert); box-shadow: 0 0 8px rgba(var(--rgb-alert), 0.55); }

    .error-banner {
      display: flex; align-items: flex-start; gap: 0.625rem;
      padding: 0.625rem 0.75rem; border-radius: var(--radius-md);
      background: rgba(var(--rgb-alert), 0.08);
      border: 1px solid rgba(var(--rgb-alert), 0.2);
    }
    .error-banner-icon {
      width: 1.5rem; height: 1.5rem; border-radius: 50%; flex-shrink: 0;
      display: flex; align-items: center; justify-content: center;
      background: rgba(var(--rgb-alert), 0.18);
    }
    .error-banner-icon ha-icon {
      --mdc-icon-size: 0.9375rem; color: var(--c-alert);
      display: flex; align-items: center; justify-content: center;
    }
    .error-banner-body { flex: 1; min-width: 0; }
    .error-banner-text {
      font-size: var(--fz-base); font-weight: 500; color: var(--t2); line-height: 1.35;
    }

    /* Setup banner — uses empty-state shell + eyebrow + CTA */
    .setup-banner-cta {
      display: inline-flex; align-items: center; gap: 0.4375rem;
      margin-top: 0.5rem;
      padding: 0.75rem 1rem; border-radius: var(--radius-full);
      min-height: var(--tap-lg); box-sizing: border-box;
      background: var(--c-spotify); color: var(--c-spotify-on);
      border: none;
      font-family: inherit; font-size: var(--fz-base); font-weight: 700;
      text-decoration: none; cursor: pointer; outline: none;
      box-shadow: 0 4px 14px rgba(var(--rgb-spotify), 0.3);
      transition: background var(--t-fast), transform var(--t-fast), box-shadow var(--t-fast);
      -webkit-tap-highlight-color: transparent;
    }
    .setup-banner-cta ha-icon { --mdc-icon-size: 0.9375rem; display: flex; align-items: center; justify-content: center; }
    @media (hover: hover) and (pointer: fine) {
      .setup-banner-cta:hover {
        background: var(--c-spotify-hover);
        box-shadow: 0 6px 18px rgba(var(--rgb-spotify), 0.45);
      }
    }
    @media (hover: hover) { .setup-banner-cta:active { transform: scale(0.97); } }
    @media (pointer: coarse) { .setup-banner-cta:active { animation: bounce 0.3s ease; } }
    .setup-banner-cta:focus-visible { outline: 2px solid rgba(var(--rgb-white), 0.4); outline-offset: 2px; }

    /* Speaker picker overlay */
    .picker-backdrop {
      position: fixed; inset: 0; z-index: 10000;
      background:
        radial-gradient(ellipse 70% 50% at 50% 30%, rgba(var(--rgb-spotify), 0.18), transparent 70%),
        rgba(var(--rgb-black), 0.62);
      display: flex; align-items: flex-end; justify-content: center;
      padding: 1rem; padding-bottom: 5rem;
      opacity: 0; pointer-events: none;
      transition: opacity 0.25s var(--ease-std);
    }
    .picker-backdrop.visible { opacity: 1; pointer-events: auto; }

    .speaker-picker {
      width: 100%; max-width: 25rem;
      padding: 1rem 1rem 1.125rem;
      max-height: calc(100dvh - 10rem);
      display: flex; flex-direction: column;
      transform: translateY(28px);
      transition: transform 0.35s var(--ease-out);
    }
    .picker-backdrop.visible .speaker-picker { transform: translateY(0); }

    .picker-header {
      display: flex; align-items: center; justify-content: space-between;
      margin-bottom: 0.625rem;
    }
    .picker-eyebrow {
      display: inline-flex; align-items: center; gap: 0.4375rem;
      font-size: var(--fz-sm); font-weight: 700; color: var(--c-spotify);
      letter-spacing: 0.1px;
    }
    .picker-eyebrow-dot {
      width: 0.375rem; height: 0.375rem; border-radius: 50%; flex-shrink: 0;
      background: var(--c-spotify);
      box-shadow: 0 0 8px rgba(var(--rgb-spotify), 0.6);
    }
    .picker-close {
      position: relative;
      width: 1.75rem; height: 1.75rem; border-radius: var(--radius-sm);
      background: var(--s2); border: 1px solid var(--b1);
      display: flex; align-items: center; justify-content: center;
      cursor: pointer; padding: 0; outline: none;
      transition: background var(--t-fast);
    }
    @media (pointer: coarse) {
      .picker-close::after { content: ''; position: absolute; inset: -0.5rem; }
    }
    .picker-close ha-icon { --mdc-icon-size: 1rem; color: var(--t3); display: flex; align-items: center; justify-content: center; }
    @media (hover: hover) and (pointer: fine) { .picker-close:hover { background: var(--s3); } }
    @media (pointer: coarse) { .picker-close:active { animation: bounce 0.3s ease; } }
    .picker-close:focus-visible { outline: 2px solid rgba(var(--rgb-white),0.25); outline-offset: -2px; }

    /* Hero block: oversized artwork + track meta */
    .picker-hero {
      display: flex; align-items: center; gap: 0.875rem;
      padding: 0.25rem 0.125rem 0.75rem;
      margin-bottom: 0.625rem;
      border-bottom: 1px solid var(--b1);
    }
    .picker-hero-art {
      width: 4.5rem; height: 4.5rem; border-radius: var(--radius-md);
      background: var(--s2); flex-shrink: 0;
      display: flex; align-items: center; justify-content: center;
      overflow: hidden; position: relative;
      box-shadow:
        0 12px 28px rgba(var(--rgb-black), 0.45),
        0 0 0 1px var(--b1) inset,
        0 0 18px rgba(var(--rgb-spotify), 0.18);
    }
    .picker-hero-art img { width: 100%; height: 100%; object-fit: cover; }
    .picker-hero-art ha-icon {
      --mdc-icon-size: 1.75rem; color: color-mix(in srgb, var(--c-spotify) 50%, var(--t4));
      display: flex; align-items: center; justify-content: center;
    }
    .picker-hero-info { flex: 1; min-width: 0; }
    .picker-hero-title {
      font-size: var(--fz-md); font-weight: 700; color: var(--t1); line-height: 1.25;
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }
    .picker-hero-artist {
      font-size: var(--fz-base); font-weight: 500; color: var(--t3); margin-top: 0.125rem;
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }

    /* Speaker rows */
    .picker-speakers {
      display: flex; flex-direction: column; gap: 0.3125rem;
      overflow-y: auto; flex: 1; min-height: 0;
      scrollbar-width: none;
      padding-right: 0.125rem;
    }
    .picker-speakers::-webkit-scrollbar { display: none; }
    .picker-speaker {
      display: flex; align-items: center; gap: 0.6875rem;
      padding: 0.5rem 0.625rem; border-radius: var(--radius-md);
      background: var(--s1); border: 1px solid var(--b1);
      cursor: pointer;
      transition: background var(--t-fast), border-color var(--t-fast), transform var(--t-fast);
      font-family: inherit; outline: none; width: 100%;
      -webkit-tap-highlight-color: transparent; color: inherit;
      flex-shrink: 0; position: relative;
      text-align: left;
    }
    .picker-speaker:focus-visible { outline: 2px solid rgba(var(--rgb-white),0.25); outline-offset: -2px; }
    @media (hover: hover) and (pointer: fine) {
      .picker-speaker:not(.selected):hover { background: var(--s2); border-color: var(--b2); transform: translateX(2px); }
    }
    @media (hover: hover) and (pointer: fine) { .picker-speaker:active { transform: translateX(2px) scale(0.985); } }
    @media (pointer: coarse) { .picker-speaker:active { animation: bounce 0.3s ease; } }

    /* State: playing — subtle spotify ring even when not selected */
    .picker-speaker.state-playing .picker-speaker-icon {
      background: rgba(var(--rgb-spotify), 0.12);
      border-color: rgba(var(--rgb-spotify), 0.3);
    }
    .picker-speaker.state-playing .picker-speaker-icon ha-icon { color: var(--c-spotify); }

    /* State: off — dimmed */
    .picker-speaker.state-off .picker-speaker-name { color: var(--t3); }
    .picker-speaker.state-off .picker-speaker-icon ha-icon { color: var(--t4); }

    /* State: selected — wins over playing visually */
    .picker-speaker.selected {
      background: color-mix(in srgb, var(--c-spotify) 14%, transparent);
      border-color: color-mix(in srgb, var(--c-spotify) 55%, transparent);
      box-shadow: 0 0 0 1px color-mix(in srgb, var(--c-spotify) 40%, transparent) inset;
    }

    .picker-speaker-icon {
      width: 2.25rem; height: 2.25rem; border-radius: var(--radius-sm);
      background: var(--s2); border: 1px solid var(--b1);
      display: flex; align-items: center; justify-content: center; flex-shrink: 0;
      transition: background var(--t-fast), border-color var(--t-fast);
    }
    .picker-speaker.selected .picker-speaker-icon {
      background: rgba(var(--rgb-spotify), 0.2);
      border-color: rgba(var(--rgb-spotify), 0.45);
    }
    .picker-speaker-icon ha-icon { --mdc-icon-size: 1.125rem; color: var(--t2); display: flex; align-items: center; justify-content: center; transition: color var(--t-fast); }
    .picker-speaker.selected .picker-speaker-icon ha-icon { color: var(--c-spotify); }

    .picker-speaker-meta { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 0.0625rem; }
    .picker-speaker-name {
      font-size: var(--fz-base); font-weight: 600; color: var(--t1); line-height: 1.2;
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }
    .picker-speaker-status {
      display: inline-flex; align-items: center; gap: 0.375rem;
      font-size: var(--fz-xs); font-weight: 500; color: var(--t3);
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }
    .picker-state-dot {
      width: 0.3125rem; height: 0.3125rem; border-radius: 50%; flex-shrink: 0;
      background: var(--t4);
    }
    .picker-speaker.state-playing .picker-state-label { color: var(--c-spotify); }
    .picker-speaker.state-paused .picker-state-dot { background: var(--c-warning); }
    .picker-speaker.state-off .picker-state-dot { background: var(--t4); opacity: 0.5; }
    .picker-speaker.state-idle .picker-state-dot {
      background: var(--c-spotify);
      box-shadow: 0 0 6px rgba(var(--rgb-spotify), 0.45);
    }

    /* EQ bars for playing state (transform-only, composited) */
    .picker-state-eq {
      display: inline-flex; align-items: flex-end; gap: 0.125rem;
      width: 0.75rem; height: 0.625rem; flex-shrink: 0;
    }
    .picker-state-eq span {
      flex: 1; height: 100%;
      background: var(--c-spotify); border-radius: 1px;
      transform-origin: bottom center;
      animation: picker-eq 0.9s ease-in-out infinite;
    }
    .picker-state-eq span:nth-child(1) { animation-delay: -0.2s; }
    .picker-state-eq span:nth-child(2) { animation-delay: -0.5s; }
    .picker-state-eq span:nth-child(3) { animation-delay: -0.35s; }
    @keyframes picker-eq {
      0%, 100% { transform: scaleY(0.3); }
      50%      { transform: scaleY(1);   }
    }

    .picker-speaker-check {
      width: 1.375rem; height: 1.375rem; border-radius: 50%;
      border: 2px solid var(--b2); background: transparent;
      display: flex; align-items: center; justify-content: center; flex-shrink: 0;
      transition: border-color var(--t-fast), background var(--t-fast), transform var(--t-fast);
      transform: scale(0.9);
    }
    .picker-speaker.selected .picker-speaker-check {
      border-color: var(--c-spotify); background: var(--c-spotify);
      transform: scale(1);
    }
    .picker-speaker-check ha-icon {
      --mdc-icon-size: 0.875rem; color: var(--c-spotify-on);
      display: flex; align-items: center; justify-content: center;
      opacity: 0; transition: opacity var(--t-fast);
    }
    .picker-speaker.selected .picker-speaker-check ha-icon { opacity: 1; }

    .picker-play-bar {
      display: flex; gap: 0.5rem; padding-top: 0.875rem; flex-shrink: 0;
    }
    .picker-play-btn {
      flex: 1; padding: 0.75rem 1rem; border-radius: var(--radius-md);
      border: none; cursor: pointer; font-family: inherit; font-size: var(--fz-base); font-weight: 700;
      display: flex; align-items: center; justify-content: center; gap: 0.5rem;
      transition: background var(--t-fast), transform var(--t-fast), box-shadow var(--t-fast); outline: none;
      -webkit-tap-highlight-color: transparent;
    }
    .picker-play-btn.primary {
      background: var(--c-spotify);
      color: var(--c-spotify-on);
      box-shadow: 0 6px 20px rgba(var(--rgb-spotify), 0.35);
    }
    .picker-play-btn.primary:disabled {
      background: var(--s3); color: var(--t4); cursor: default;
      box-shadow: none;
    }
    @media (hover: hover) and (pointer: fine) {
      .picker-play-btn.primary:not(:disabled):hover {
        background: var(--c-spotify-hover);
        box-shadow: 0 8px 24px rgba(var(--rgb-spotify), 0.5);
      }
    }
    .picker-play-btn.primary ha-icon { --mdc-icon-size: 1.125rem; display: flex; align-items: center; justify-content: center; }
    @media (hover: hover) and (pointer: fine) { .picker-play-btn:active:not(:disabled) { transform: scale(0.98); } }
    @media (pointer: coarse) { .picker-play-btn:active:not(:disabled) { animation: bounce 0.3s ease; } }
    .picker-play-btn:focus-visible { outline: 2px solid rgba(var(--rgb-white),0.4); outline-offset: 2px; }

    @media (prefers-reduced-motion: reduce) {
      .picker-backdrop, .speaker-picker, .picker-speaker { transition: none; }
      .picker-state-eq span { animation: none; transform: scaleY(0.6); }
      .picker-speaker:hover { transform: none; }
      .drilldown-play-cta { transition: none; }
      .drilldown-play-cta:active { transform: none; }
      .setup-banner-cta { transition: none; }
      .setup-banner-cta:active { transform: none; }
    }

    /* Now playing indicator */
    .result-row.now-playing {
      background: color-mix(in srgb, var(--c-spotify) 10%, transparent);
      border-radius: var(--radius-md);
    }
    .result-row.now-playing .result-title {
      color: var(--c-spotify);
    }
    .result-row.now-playing .result-art {
      box-shadow: 0 0 0 2px var(--c-spotify), 0 0 16px rgba(var(--rgb-spotify), 0.35);
    }
    .result-row .eq-bars { flex-shrink: 0; }

    /* Heart (favorite) button — handled by <glass-icon-button size="sm"
       active-color="alert">. flex-shrink stops it from collapsing in
       narrow rows. */
    .heart-btn { flex-shrink: 0; }

    /* Loading spinner placeholder */
    .loading-text { font-size: var(--fz-base); color: var(--t4); text-align: center; padding: 1rem 0; }

    /* Touch hit-area expansion to reach 44px on touch devices.
       .heart-btn now uses <glass-icon-button> which provides its own hit-area. */
    @media (pointer: coarse) {
      .tab-btn::after,
      .lib-more-link::after { content: ''; position: absolute; }
      .tab-btn::after    { left: 0; right: 0; top: -0.4375rem; bottom: -0.4375rem; }
      .lib-more-link::after { left: 0; right: 0; top: -0.625rem; bottom: -0.625rem; }
    }
  `;
