import { css } from 'lit';

/**
 * Base / shared styles: ambient, layout, header, panel, sections, banners,
 * item rows, drag handles, room icons, card icons, item info, badges,
 * toggles, icon buttons, feature toggles, thresholds, item card wrappers,
 * fold separators, save bar, buttons, toast, entry animation, fan preview spin,
 * segmented control, range input, dot, utility spacing, entity rename.
 */
export const baseStyles = css`
      *, *::before, *::after {
        box-sizing: border-box;
      }
      :host {
        position: relative;
        min-height: 100vh;
        padding: 2rem 1rem 3rem;
        color: var(--t1);
      }

      /* ── Ambient ── */
      .ambient-bg {
        position: fixed;
        inset: 0;
        z-index: -1;
        background: #111827;
      }
      .ambient-bg::before,
      .ambient-bg::after {
        content: '';
        position: absolute;
        border-radius: 50%;
        filter: blur(120px);
        opacity: 0.35;
      }
      .ambient-bg::before {
        width: 37.5rem;
        height: 37.5rem;
        top: -12.5rem;
        right: -6.25rem;
        background: var(--ambient-blob-top, #2d4a8a);
      }
      .ambient-bg::after {
        width: 31.25rem;
        height: 31.25rem;
        bottom: -9.375rem;
        left: -6.25rem;
        background: var(--ambient-blob-bottom, #3a2d6b);
      }

      /* ── Layout ── */
      .page-wrap {
        max-width: 40rem;
        margin: 0 auto;
      }
      @media (min-width: 1024px) {
        .page-wrap { max-width: 56rem; }
      }
      @media (min-width: 1440px) {
        .page-wrap { max-width: 72rem; }
      }

      /* ── Header ── */
      .page-header {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        margin-bottom: 1rem;
      }
      .page-back {
        width: 2rem;
        height: 2rem;
        border-radius: var(--radius-md);
        background: var(--s2);
        border: 1px solid var(--b1);
        cursor: pointer;
        outline: none;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--t3);
        padding: 0;
        font-family: inherit;
        transition: background var(--t-fast);
        -webkit-tap-highlight-color: transparent;
        position: relative;
      }
      .page-back::before {
        content: '';
        position: absolute;
        inset: -0.375rem;
      }
      @media (hover: hover) and (pointer: fine) {
        .page-back:hover {
          background: var(--s3);
        }
      }
      @media (pointer: coarse) {
        .page-back:active { animation: bounce 0.3s ease; }
      }
      .page-back:focus-visible {
        outline: 2px solid var(--c-accent);
        outline-offset: 2px;
      }
      .page-back ha-icon {
        --mdc-icon-size: 1.125rem;
        display: flex; align-items: center; justify-content: center;
      }
      .page-title {
        font-size: var(--fz-lg);
        font-weight: 700;
        color: var(--t1);
        letter-spacing: -0.3px;
      }
      .page-subtitle {
        font-size: var(--fz-sm);
        font-weight: 500;
        color: var(--t4);
        margin-left: auto;
        text-transform: uppercase;
        letter-spacing: 0.8px;
        display: inline-flex;
        align-items: baseline;
        gap: 0.375rem;
      }
      .page-version {
        font-size: var(--fz-xs);
        font-weight: 400;
        color: var(--t4);
        opacity: 0.65;
        letter-spacing: 0.4px;
        font-variant-numeric: tabular-nums;
        text-transform: none;
      }

      /* ── Panel ── */
      .config-panel {
        padding: 1rem;
      }

      /* ── Section ── */
      .section-label {
        font-size: var(--fz-xs);
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 1.2px;
        color: var(--t4);
        margin-bottom: 0.5rem;
        padding-left: 0.125rem;
      }
      .section-desc {
        font-size: var(--fz-sm);
        font-weight: 400;
        color: var(--t3);
        margin-bottom: 0.75rem;
        line-height: 1.5;
        padding-left: 0.125rem;
      }

      /* ── Live card preview ── */
      .tab-panel > :is(glass-light-card, glass-climate-card, glass-cover-card,
        glass-fan-card, glass-media-card, glass-weather-card, glass-presence-card,
        glass-spotify-card, glass-camera-carousel-card, glass-title-card) {
        display: block;
        margin-bottom: 1rem;
        overflow: visible;
      }

      /* ── Spacing utilities ── */
      .mt-sm { margin-top: 0.75rem; }

      /* ── Banner ── */
      .banner {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 0.75rem;
        border-radius: var(--radius-lg);
        font-size: var(--fz-base);
        font-weight: 500;
        margin-bottom: 1rem;
        background: rgba(var(--rgb-info), 0.08);
        border: 1px solid rgba(var(--rgb-info), 0.12);
        color: var(--t2);
      }
      .banner ha-icon {
        --mdc-icon-size: 1rem;
        color: var(--c-info);
        flex-shrink: 0;
        display: flex; align-items: center; justify-content: center;
      }

      /* ── Item rows ── */
      .item-list {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
        margin-bottom: 1rem;
      }
      .item-row {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 0.75rem;
        border-radius: var(--radius-md);
        background: var(--s1);
        border: 1px solid var(--b1);
        transition:
          background var(--t-fast),
          border-color var(--t-fast),
          opacity var(--t-fast);
        user-select: none;
        -webkit-user-select: none;
      }
      @media (hover: hover) and (pointer: fine) {
        .item-row:hover {
          background: var(--s2);
          border-color: var(--b2);
        }
      }
      @media (pointer: coarse) {
        .item-row:active { animation: bounce 0.3s ease; }
      }
      .item-row.disabled {
        opacity: 0.35;
      }
      .item-row.dragging {
        opacity: 0.4;
      }
      .item-row.drop-target {
        background: rgba(var(--rgb-accent), 0.06);
        box-shadow: inset 0 -2px 0 var(--c-accent);
      }
      .item-row .feature-icon ha-icon { --mdc-icon-size: 1rem; }

      .card-row {
        padding: 0.75rem;
      }

      /* Drag handle styles now live in <glass-drag-handle> (ui-core).
         Local overrides for specific contexts target the tag name. */

      /* ── Room icon button ── */
      .room-icon-btn {
        width: 2rem;
        height: 2rem;
        border-radius: var(--radius-sm);
        background: var(--s2);
        border: 1px solid var(--b1);
        cursor: pointer;
        outline: none;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        padding: 0;
        font-family: inherit;
        transition:
          background var(--t-fast),
          border-color var(--t-fast);
        -webkit-tap-highlight-color: transparent;
        position: relative;
      }
      .room-icon-btn::before {
        content: '';
        position: absolute;
        inset: -0.375rem;
      }
      .room-icon-btn ha-icon {
        --mdc-icon-size: 1rem;
        color: var(--t2);
        display: flex; align-items: center; justify-content: center;
      }
      @media (hover: hover) and (pointer: fine) {
        .room-icon-btn:hover {
          background: var(--s3);
          border-color: var(--b2);
        }
      }
      @media (pointer: coarse) {
        .room-icon-btn:active { animation: bounce 0.3s ease; }
      }
      .room-icon-btn:focus-visible {
        outline: 2px solid var(--c-accent);
        outline-offset: 2px;
      }

      /* ── Item info ── */
      .item-info {
        flex: 1;
        min-width: 0;
        display: flex;
        flex-direction: column;
        gap: 0.125rem;
      }
      .item-name {
        font-size: var(--fz-base);
        font-weight: 600;
        color: var(--t2);
        line-height: 1.2;
      }
      .item-meta {
        font-size: var(--fz-xs);
        font-weight: 400;
        color: var(--t4);
        line-height: 1.2;
      }
      .item-row.disabled .item-name {
        color: var(--t4);
      }

      /* ── Entity rename (unassigned tab) ── */
      .entity-rename-input {
        display: block;
        width: 100%;
        background: var(--s2);
        border: 1px solid var(--c-accent);
        border-radius: var(--radius-sm);
        padding: 0.375rem 0.5rem;
        font-family: inherit;
        font-size: var(--fz-base);
        font-weight: 600;
        color: var(--t1);
        outline: none;
        box-shadow: 0 0 0 2px rgba(var(--rgb-accent), 0.2);
      }

      /* Toggle styles now live in <glass-toggle> (ui-core).
         Interactive: <glass-toggle .checked .activeColor @glass-toggle-change>
         Decorative (inside a clickable parent): <glass-toggle presentation .checked> */

      /* Icon button styles now live in <glass-icon-button> (ui-core).
         Use size="xs|sm|md|lg" + active-color + ?active. */

      /* ── Feature toggles ── */
      .feature-list {
        display: flex;
        flex-direction: column;
        gap: 0.125rem;
        margin-bottom: 1rem;
      }
      .feature-row {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 0.75rem;
        border-radius: var(--radius-md);
        transition: background var(--t-fast);
        border: none;
        background: none;
        width: 100%;
        cursor: pointer;
        font-family: inherit;
        outline: none;
        text-align: left;
        -webkit-tap-highlight-color: transparent;
      }
      @media (hover: hover) and (pointer: fine) {
        .feature-row:hover {
          background: var(--s1);
        }
      }
      @media (pointer: coarse) {
        .feature-row:active { animation: bounce 0.3s ease; }
      }
      .feature-row:focus-visible {
        outline: 2px solid var(--c-accent);
        outline-offset: -2px;
      }
      .feature-icon {
        width: 1.75rem;
        height: 1.75rem;
        border-radius: var(--radius-sm);
        background: var(--s2);
        border: 1px solid var(--b1);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }
      .feature-icon ha-icon {
        --mdc-icon-size: 0.875rem;
        color: var(--t2);
        display: flex; align-items: center; justify-content: center;
      }
      .feature-text {
        flex: 1;
        min-width: 0;
      }
      .feature-name {
        font-size: var(--fz-base);
        font-weight: 600;
        color: var(--t1);
      }
      .feature-desc {
        font-size: var(--fz-xs);
        color: var(--t3);
        margin-top: 0.125rem;
      }
      .feature-row .feature-name {
        color: var(--t1);
      }

      /* ── Item card wrapper ── */
      .item-card {
        border-radius: var(--radius-md);
        overflow: hidden;
        border: 1px solid var(--b1);
        background: var(--s1);
        transition: border-color var(--t-fast);
      }
      .item-card .item-row {
        border: none;
        border-radius: 0;
        background: transparent;
      }
      @media (hover: hover) and (pointer: fine) {
        .item-card:hover {
          background: var(--s2);
          border-color: var(--b2);
        }
      }
      @media (pointer: coarse) {
        .item-card:active { animation: bounce 0.3s ease; }
      }
      .item-card.expanded {
        border-color: var(--b2);
      }
      .item-card.expanded .item-row {
        border-bottom: none;
      }
      .item-card .item-row.disabled {
        opacity: 0.35;
      }

      /* ── Sub-section group ── */
      .sub-section {
        display: flex;
        flex-direction: column;
        gap: 0.375rem;
      }
      .sub-section + .sub-section {
        padding-top: 0.75rem;
        border-top: 1px solid var(--b1);
      }

      /* ── Fold separator (from kit) ── */
      .fold-sep {
        height: 0.0625rem;
        margin: 0 0.75rem;
        background: linear-gradient(90deg, transparent, var(--fold-color, var(--c-accent)), transparent);
        opacity: 0;
        transition: opacity var(--t-layout);
      }
      .fold-sep.visible { opacity: 0.45; }

      /* ── Save bar ── */
      .save-bar {
        margin-top: 1rem;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 0.5rem;
      }
      /* .btn / .btn-sm / .btn-accent / .btn-ghost styles now live in
         <glass-button> (ui-core). Local context overrides for .schedule-*,
         .picker-confirm, .pw-sp-setup-btn target the host class directly. */

      /* ── Toast ── */
      .toast {
        position: fixed;
        bottom: 2rem;
        left: 50%;
        transform: translateX(-50%) translateY(20px);
        padding: 0.5rem 1rem;
        border-radius: var(--radius-lg);
        backdrop-filter: blur(20px);
        font-family: inherit;
        font-size: var(--fz-base);
        font-weight: 500;
        opacity: 0;
        z-index: 200;
        pointer-events: none;
        transition:
          opacity var(--t-fast),
          transform var(--t-fast);
        background: rgba(var(--rgb-success), 0.15);
        border: 1px solid rgba(var(--rgb-success), 0.2);
        color: var(--c-success);
      }
      .toast.show {
        opacity: 1;
        transform: translateX(-50%) translateY(0);
      }
      .toast.error {
        background: rgba(var(--rgb-alert), 0.15);
        border: 1px solid rgba(var(--rgb-alert), 0.2);
        color: var(--c-alert);
      }

      /* ── Entry animation ── */
      .config-panel {
        animation: panel-in 0.4s var(--ease-out) both;
      }

      /* ── Segmented control ── */
      .segmented {
        display: inline-flex; gap: 0;
        border-radius: var(--radius-lg); background: var(--s1);
        border: 1px solid var(--b1); padding: 0.25rem;
        width: 100%; margin-bottom: 0.5rem;
      }
      .seg-btn {
        flex: 1;
        padding: 0.5rem 0; border-radius: var(--radius-sm);
        font-family: inherit; font-size: var(--fz-base); font-weight: 600;
        color: var(--t3); cursor: pointer; transition: background var(--t-fast), color var(--t-fast), box-shadow var(--t-fast);
        border: none; background: transparent; outline: none;
        -webkit-tap-highlight-color: transparent;
      }
      .seg-btn.active {
        background: var(--s4); color: var(--t1);
        box-shadow: 0 1px 4px rgba(var(--rgb-black),0.2);
      }
      @media (hover: hover) and (pointer: fine) {
        .seg-btn:hover:not(.active) { color: var(--t2); }
      }
      .seg-btn:focus-visible { outline: 2px solid rgba(var(--rgb-white),0.25); outline-offset: -2px; }

      /* ── Range input (styled) ── */
      .range-row {
        display: flex; align-items: center; gap: 0.75rem; padding: 0.25rem 0;
      }
      .range-input {
        flex: 1; height: 0.25rem; border-radius: 2px;
        -webkit-appearance: none; appearance: none;
        background: var(--s2); outline: none;
      }
      .range-input::-webkit-slider-thumb {
        -webkit-appearance: none; appearance: none;
        width: 0.875rem; height: 0.875rem; border-radius: 50%;
        background: var(--c-accent); cursor: pointer;
        box-shadow: 0 1px 4px rgba(var(--rgb-black),0.3);
      }
      .range-input::-moz-range-thumb {
        width: 0.875rem; height: 0.875rem; border-radius: 50%; border: none;
        background: var(--c-accent); cursor: pointer;
        box-shadow: 0 1px 4px rgba(var(--rgb-black),0.3);
      }
      .range-input::-moz-range-track {
        height: 0.25rem; border-radius: 2px; background: var(--s2);
      }
      .range-value {
        font-size: var(--fz-md); font-weight: 600; color: var(--t1);
        /* Anchor at the right with a fixed-width slot wide enough for the
           worst case ("35.5°C" or "99.5°C") + tabular-nums so digit width
           stays constant. Prevents the range-input width from jumping
           when the value changes between integer and .5 step. */
        min-width: 3rem; text-align: right;
        font-variant-numeric: tabular-nums;
      }
      /* Auto-close timer row variants */
      .autoclose-row { padding: 0.375rem 0.75rem; }
      .autoclose-icon {
        background: rgba(var(--rgb-accent), 0.08);
        border-color: rgba(var(--rgb-accent), 0.12);
      }
      .autoclose-icon ha-icon { color: var(--c-accent); }
      .autoclose-value {
        min-width: 3.5rem;
        font-size: var(--fz-sm);
        font-weight: 500;
        color: var(--t3);
      }

      /* ── Dot (status indicator) ── */
      .dot {
        width: 0.375rem; height: 0.375rem;
        border-radius: 50%;
        flex-shrink: 0;
        background: var(--t4);
      }
      .dot.playing {
        background: var(--c-info);
        box-shadow: 0 0 6px rgba(var(--rgb-info), 0.4);
      }

      /* (Dead .entity-rename-row CSS removed — only .entity-rename-input
         is used in unassigned.ts; the wrapper class was never applied.) */

      /* ═══════════════════════════════════════════════
         Navigation (ex nav.ts)
         ═══════════════════════════════════════════════ */

      /* ── Panel layout — vertical stack ── */
      .panel-layout {
        display: flex;
        flex-direction: column;
        min-height: calc(100vh - 4rem);
      }

      /* ── Top nav (horizontal) ── */
      .panel-sidebar {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 0.25rem;
        padding: 0 0.25rem 0.75rem;
        border-bottom: 1px solid var(--b1);
        margin-bottom: 0.75rem;
        flex-shrink: 0;
      }
      .panel-sidebar .nav-btn {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.25rem;
        padding: 0.5rem 0.75rem;
        border-radius: var(--radius-md);
        border: 1px solid transparent;
        background: transparent;
        color: var(--t3);
        cursor: pointer;
        transition: background var(--t-fast), border-color var(--t-fast), color var(--t-fast);
        font-size: var(--fz-sm);
        font-family: inherit;
        font-weight: 600;
        outline: none;
        -webkit-tap-highlight-color: transparent;
        white-space: nowrap;
      }
      .panel-sidebar .nav-btn ha-icon {
        --mdc-icon-size: 1.125rem;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: color var(--t-fast);
      }
      .panel-sidebar .nav-btn.active {
        background: var(--s3);
        border-color: var(--b2);
        color: var(--t1);
      }
      .panel-sidebar .nav-btn.active ha-icon {
        color: var(--c-accent);
      }
      @media (hover: hover) and (pointer: fine) {
        .panel-sidebar .nav-btn:not(.active):hover {
          background: var(--s1);
          color: var(--t1);
          border-color: var(--b1);
        }
      }
      @media (pointer: coarse) {
        .panel-sidebar .nav-btn:active { animation: bounce 0.3s ease; }
      }
      .panel-sidebar .nav-btn:focus-visible {
        outline: 2px solid var(--c-accent);
        outline-offset: 2px;
      }

      /* ── Content area ── */
      .panel-content {
        flex: 1;
        overflow-y: auto;
        overflow-x: clip;
        min-width: 0;
        scrollbar-width: none;
        padding: 0 1rem;
      }
      .panel-content::-webkit-scrollbar { display: none; }

      /* ── Breadcrumb ── */
      .breadcrumb {
        display: flex;
        align-items: center;
        gap: 0.375rem;
        margin-bottom: 1rem;
        font-size: var(--fz-sm);
        color: var(--t4);
      }
      .breadcrumb button {
        border: none;
        background: none;
        color: var(--t3);
        cursor: pointer;
        padding: 0.25rem 0.375rem;
        border-radius: var(--radius-sm);
        font-family: inherit;
        font-size: inherit;
        font-weight: 500;
        transition: background var(--t-fast), color var(--t-fast);
        outline: none;
        -webkit-tap-highlight-color: transparent;
      }
      @media (hover: hover) and (pointer: fine) {
        .breadcrumb button:hover {
          color: var(--t1);
          background: var(--s1);
        }
      }
      .breadcrumb button:focus-visible {
        outline: 2px solid var(--c-accent);
        outline-offset: 2px;
      }
      .breadcrumb .sep {
        color: var(--t4);
        font-weight: 300;
        opacity: 0.5;
      }
      .breadcrumb .current {
        color: var(--t1);
        font-weight: 600;
      }

      /* ── Unassigned tab — toolbar + filter chips + domain folds ── */
      .ua-toolbar {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        margin: 0.5rem 0 0.5rem;
      }
      .ua-search-input {
        width: 100%;
        padding: 0.5rem 0.75rem;
        border-radius: var(--radius-md);
        border: 1px solid var(--b2);
        background: var(--s1);
        color: var(--t1);
        font-family: inherit;
        font-size: var(--fz-md);
        outline: none;
        transition: border-color var(--t-fast);
        box-sizing: border-box;
      }
      .ua-search-input::placeholder { color: var(--t4); }
      .ua-search-input:focus { border-color: var(--b3); }

      .ua-filter-chips {
        display: flex;
        gap: 0.375rem;
      }
      .ua-filter-chips glass-chip {
        flex: 1;
      }
      .ua-filter-chips .chip-count {
        font-size: var(--fz-xxs);
        font-weight: 700;
        padding: 0.0625rem 0.375rem;
        border-radius: var(--radius-full);
        background: var(--s3);
        color: var(--t3);
        letter-spacing: 0.5px;
        font-variant-numeric: tabular-nums;
      }
      .ua-filter-chips glass-chip[active] .chip-count {
        background: rgba(var(--rgb-accent), 0.2);
        color: var(--c-accent);
      }
      .ua-filter-chips glass-chip.has-warn .chip-count {
        background: rgba(var(--rgb-warning), 0.15);
        color: var(--c-warning);
      }

      /* Domain head — collapsible group header */
      .ua-domain-head {
        display: grid;
        grid-template-columns: 1.125rem 1.25rem 1fr auto;
        align-items: center;
        gap: 0.5rem;
        width: 100%;
        padding: 0.5rem 0.5rem 0.5rem 0.25rem;
        margin-top: 0.5rem;
        background: transparent;
        border: none;
        font-family: inherit;
        text-align: left;
        cursor: pointer;
        outline: none;
        -webkit-tap-highlight-color: transparent;
      }
      .ua-domain-head:focus-visible {
        outline: 2px solid var(--c-accent);
        outline-offset: 2px;
        border-radius: var(--radius-sm);
      }
      @media (hover: hover) and (pointer: fine) {
        .ua-domain-head:hover .ua-domain-chev,
        .ua-domain-head:hover .ua-domain-icon { --mdc-icon-color: var(--t2); }
        .ua-domain-head:hover .ua-domain-label { color: var(--t3); }
      }
      .ua-domain-chev {
        --mdc-icon-size: 1rem;
        --mdc-icon-color: var(--t4);
        transition: transform var(--t-fast);
      }
      .ua-domain-head.collapsed .ua-domain-chev { transform: rotate(-90deg); }
      .ua-domain-icon {
        --mdc-icon-size: 1rem;
        --mdc-icon-color: var(--t3);
      }
      .ua-domain-label {
        font-size: var(--fz-xs);
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 1.2px;
        color: var(--t4);
      }
      .ua-domain-count {
        font-size: var(--fz-xxs);
        font-weight: 700;
        color: var(--t4);
        background: var(--s2);
        padding: 0.0625rem 0.375rem;
        border-radius: var(--radius-full);
        letter-spacing: 0.5px;
        font-variant-numeric: tabular-nums;
      }

      .ua-list {
        display: grid;
        grid-template-rows: 1fr;
        transition: grid-template-rows var(--t-layout);
      }
      .ua-list-inner {
        overflow: hidden;
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
      }
      .ua-list.collapsed { grid-template-rows: 0fr; }

      /* ── Room list (config-panel rooms tab) ─────────────────────────
         Vertical list of room rows: drag-handle + order badge + main
         button (icon + name + chevron) + visibility toggle.
         Mobile-first, 56px row height, large tap targets. */
      .room-list {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
      }
      .room-row {
        display: grid;
        grid-template-columns: 1.25rem 1.5rem 1fr 2.25rem;
        align-items: center;
        gap: 0.5rem;
        padding: 0.375rem 0.5rem 0.375rem 0.25rem;
        border-radius: var(--radius-md);
        background: var(--s1);
        border: 1px solid var(--b1);
        min-height: 3rem;
        transition: background var(--t-fast), border-color var(--t-fast), opacity var(--t-fast), transform var(--t-fast);
        cursor: grab;
      }
      .room-row:active { cursor: grabbing; }
      .room-row.dragging { opacity: 0.35; }
      .room-row.drop-target {
        border-color: var(--c-accent);
        background: rgba(var(--rgb-accent), 0.08);
      }
      .room-row.off { opacity: 0.55; }

      .room-row-grip {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--t4);
        cursor: grab;
        --mdc-icon-size: 1rem;
        line-height: 0;
        transition: color var(--t-fast);
      }
      .room-row-grip::before {
        content: '';
        position: absolute;
        inset: -0.625rem;
      }
      .room-row-grip:active { cursor: grabbing; }
      .room-row:hover .room-row-grip { color: var(--t3); }

      .room-row-num {
        font-size: var(--fz-xs);
        font-weight: 700;
        color: var(--t4);
        font-variant-numeric: tabular-nums;
        text-align: center;
        letter-spacing: 0.5px;
      }
      .room-row.off .room-row-num { color: var(--t4); opacity: 0.5; }

      .room-row-main {
        display: flex;
        align-items: center;
        gap: 0.625rem;
        padding: 0.125rem 0;
        background: transparent;
        border: none;
        cursor: pointer;
        font-family: inherit;
        text-align: left;
        outline: none;
        color: var(--t1);
        -webkit-tap-highlight-color: transparent;
        min-width: 0;
        transition: transform var(--t-fast);
      }
      .room-row-main:focus-visible {
        outline: 2px solid var(--c-accent);
        outline-offset: 2px;
        border-radius: var(--radius-sm);
      }
      @media (pointer: coarse) {
        .room-row-main:active { transform: scale(0.98); }
      }

      .room-row-icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 1.75rem;
        height: 1.75rem;
        border-radius: var(--radius-sm);
        background: var(--s2);
        border: 1px solid var(--b1);
        flex-shrink: 0;
      }
      .room-row-icon ha-icon {
        --mdc-icon-size: 1rem;
        color: var(--t2);
      }

      .room-row-name {
        flex: 1;
        min-width: 0;
        font-size: var(--fz-md);
        font-weight: 600;
        color: var(--t1);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .room-row-chev {
        --mdc-icon-size: 1rem;
        color: var(--t4);
        flex-shrink: 0;
        transition: transform var(--t-fast), color var(--t-fast);
      }
      .room-row-main:hover .room-row-chev,
      .room-row-main:focus-visible .room-row-chev {
        color: var(--t2);
        transform: translateX(2px);
      }

      .room-row-toggle {
        width: 2.25rem;
        height: 1.25rem;
        border-radius: var(--radius-full);
        background: var(--s2);
        border: 1px solid var(--b2);
        position: relative;
        cursor: pointer;
        outline: none;
        flex-shrink: 0;
        transition: background var(--t-fast), border-color var(--t-fast);
      }
      /* 44px touch hit-area centred on the toggle for mobile */
      .room-row-toggle::before {
        content: '';
        position: absolute;
        inset: -0.75rem -0.625rem;
      }
      .room-row-toggle::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 0.125rem;
        width: 0.875rem;
        height: 0.875rem;
        border-radius: 50%;
        background: var(--t2);
        transform: translateY(-50%);
        transition: left var(--t-fast), background var(--t-fast);
      }
      .room-row-toggle.on {
        background: var(--c-accent);
        border-color: transparent;
      }
      .room-row-toggle.on::after {
        left: calc(100% - 1rem);
        background: rgba(var(--rgb-white), 0.95);
      }
      .room-row-toggle:focus-visible {
        outline: 2px solid var(--c-accent);
        outline-offset: 2px;
      }
      @media (hover: hover) and (pointer: fine) {
        .room-row:hover {
          background: var(--s2);
          border-color: var(--b2);
        }
      }

      /* Reconfig loading state — spinning icon */
      .reconfig-loading ha-icon {
        animation: reconfig-spin 1s linear infinite;
        --mdc-icon-color: var(--c-accent);
      }
      @keyframes reconfig-spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      @media (prefers-reduced-motion: reduce) {
        .reconfig-loading ha-icon { animation: none; }
      }

      /* ── Preference list (advanced sub-section selector) ─────────
         Each row: large icon (in tinted square) + name/desc stack + chevron.
         Danger variant tints icon + name with alert color. */
      .pref-list {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
      }
      .pref-row {
        display: grid;
        grid-template-columns: 1.75rem 1fr 1rem;
        align-items: center;
        gap: 0.5rem;
        width: 100%;
        padding: 0.375rem 0.5rem 0.375rem 0.25rem;
        background: var(--s1);
        border: 1px solid var(--b1);
        border-radius: var(--radius-md);
        font-family: inherit;
        text-align: left;
        cursor: pointer;
        outline: none;
        -webkit-tap-highlight-color: transparent;
        color: var(--t1);
        min-height: 3rem;
        transition: background var(--t-fast), border-color var(--t-fast), transform var(--t-fast);
      }
      .pref-row:focus-visible {
        outline: 2px solid var(--c-accent);
        outline-offset: 2px;
      }
      @media (hover: hover) and (pointer: fine) {
        .pref-row:hover {
          background: var(--s2);
          border-color: var(--b2);
        }
        .pref-row:hover .pref-row-chev {
          color: var(--t2);
          transform: translateX(2px);
        }
      }
      @media (pointer: coarse) {
        .pref-row:active { transform: scale(0.99); }
      }

      .pref-row-icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 1.75rem;
        height: 1.75rem;
        border-radius: var(--radius-sm);
        background: var(--s2);
        border: 1px solid var(--b1);
      }
      .pref-row-icon ha-icon {
        --mdc-icon-size: 1rem;
        color: var(--t2);
      }

      .pref-row-text {
        display: flex;
        flex-direction: column;
        gap: 0.125rem;
        min-width: 0;
      }
      .pref-row-name {
        font-size: var(--fz-md);
        font-weight: 600;
        color: var(--t1);
        line-height: 1.2;
      }
      .pref-row-desc {
        font-size: var(--fz-sm);
        color: var(--t3);
        line-height: 1.35;
      }
      .pref-row-chev {
        --mdc-icon-size: 1rem;
        color: var(--t4);
        transition: transform var(--t-fast), color var(--t-fast);
      }

      /* Danger variant — destructive action */
      .pref-row.danger {
        background: rgba(var(--rgb-alert), 0.06);
        border-color: rgba(var(--rgb-alert), 0.25);
      }
      .pref-row.danger .pref-row-icon {
        background: rgba(var(--rgb-alert), 0.12);
        border-color: rgba(var(--rgb-alert), 0.25);
      }
      .pref-row.danger .pref-row-icon ha-icon { color: var(--c-alert); }
      .pref-row.danger .pref-row-name { color: var(--c-alert); }
      @media (hover: hover) and (pointer: fine) {
        .pref-row.danger:hover {
          background: rgba(var(--rgb-alert), 0.10);
          border-color: rgba(var(--rgb-alert), 0.35);
        }
      }

      /* ── Empty state ── */
      .empty-state {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 3rem 1rem;
        color: var(--t4);
        font-size: var(--fz-sm);
        font-weight: 500;
      }

      /* ── Responsive breakpoints ── */
      @media (max-width: 600px) {
        .panel-sidebar {
          padding: 0 0.125rem 0.5rem;
        }
        .panel-sidebar .nav-btn {
          font-size: var(--fz-xs);
          padding: 0.375rem 0.5rem;
          gap: 0.25rem;
        }
        .panel-sidebar .nav-btn ha-icon { --mdc-icon-size: 1rem; }
      }

      /* ═══════════════════════════════════════════════
         Room detail sections (ex room-detail.ts)
         ═══════════════════════════════════════════════ */

      .room-sections {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
      }
      /* Wrap each section row (incl. its fold) so the bordered card hugs both. */
      .room-sections > div {
        background: var(--s1);
        border: 1px solid var(--b1);
        border-radius: var(--radius-md);
        overflow: hidden;
        transition: background var(--t-fast), border-color var(--t-fast), opacity var(--t-fast);
      }
      @media (hover: hover) and (pointer: fine) {
        .room-sections > div:hover {
          background: var(--s2);
          border-color: var(--b2);
        }
      }
      .room-sections > div.dragging {
        opacity: 0.35;
      }
      .room-sections > div.drop-target {
        border-color: var(--c-accent);
        background: rgba(var(--rgb-accent), 0.08);
      }

      /* ── Section header (fold trigger) ── */
      /* ── Scene chips ── */
      .scene-chips {
        display: flex;
        flex-wrap: wrap;
        gap: 0.375rem;
        padding: 0 0.25rem 0.75rem;
      }
      .scene-chip {
        display: inline-flex;
        align-items: center;
        gap: 0.25rem;
        padding: 0.5rem 0.75rem;
        min-height: 2.25rem;
        border-radius: var(--radius-full);
        border: 1px solid var(--b1);
        background: var(--s1);
        color: var(--t3);
        font-family: inherit;
        font-size: var(--fz-xs);
        font-weight: 600;
        cursor: pointer;
        transition: background var(--t-fast), border-color var(--t-fast), color var(--t-fast), box-shadow var(--t-fast);
        outline: none;
        -webkit-tap-highlight-color: transparent;
      }
      .scene-chip ha-icon {
        --mdc-icon-size: 0.75rem;
        --mdc-icon-color: var(--t4);
        color: var(--t4);
        display: flex;
      }
      .scene-chip .chip-drag {
        --mdc-icon-size: 0.625rem;
        --mdc-icon-color: var(--t4);
        color: var(--t4);
        margin-left: -0.125rem;
      }
      .scene-chip.on {
        background: rgba(var(--rgb-accent), 0.1);
        border-color: rgba(var(--rgb-accent), 0.2);
        color: var(--c-accent);
      }
      .scene-chip.on ha-icon {
        --mdc-icon-color: var(--c-accent);
        color: var(--c-accent);
      }
      .scene-chip.dragging { opacity: 0.3; }
      .scene-chip.drop-target {
        border-color: var(--c-accent);
        box-shadow: 0 0 0 1px rgba(var(--rgb-accent), 0.2);
      }
      @media (hover: hover) and (pointer: fine) {
        .scene-chip:hover {
          background: var(--s2);
          border-color: var(--b2);
          color: var(--t2);
        }
        .scene-chip.on:hover {
          background: rgba(var(--rgb-accent), 0.15);
        }
      }

      .section-header-wrap {
        display: flex;
        align-items: center;
        gap: 0;
        min-height: 3rem;
        padding: 0.375rem 0.5rem 0.375rem 0.25rem;
      }
      .section-header-wrap glass-drag-handle {
        width: 1.5rem;
        padding: 0.5rem 0;
      }
      @media (hover: hover) and (pointer: fine) {
        .section-header-wrap glass-drag-handle:hover {
          background: var(--s2);
          border-radius: var(--radius-xs);
        }
      }
      .section-header-wrap.off { opacity: 0.35; }
      .section-header-wrap.off .section-header { pointer-events: none; }
      /* Drag/drop visuals live on the outer wrapper now (.room-sections > div). */

      /* Chevron — now <glass-chevron ?open tone> inside .section-header.
         Rotation animation owned by the primitive. */

      .section-header {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 0.25rem;
        cursor: pointer;
        border-radius: var(--radius-sm);
        background: transparent;
        border: none;
        flex: 1;
        min-width: 0;
        text-align: left;
        transition: background var(--t-fast);
        outline: none;
        -webkit-tap-highlight-color: transparent;
        font-family: inherit;
      }
      /* Section icon takes its color from the inline --icon-color custom prop
         (RGB triplet, e.g. 129,140,248). Falls back to accent if unset. */
      .section-header-icon {
        width: 1.75rem;
        height: 1.75rem;
        border-radius: var(--radius-sm);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        background: rgba(var(--icon-color, var(--rgb-accent)), 0.08);
        border: 1px solid rgba(var(--icon-color, var(--rgb-accent)), 0.12);
        color: rgb(var(--icon-color, var(--rgb-accent)));
      }
      .section-header-icon ha-icon {
        --mdc-icon-size: 0.9375rem;
        --mdc-icon-color: currentColor;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .section-header ha-icon {
        --mdc-icon-size: 1.125rem;
        color: var(--t3);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: color var(--t-fast);
      }
      .section-header .section-title {
        flex: 1;
        font-weight: 600;
        color: var(--t2);
        font-size: var(--fz-base);
        letter-spacing: -0.2px;
        transition: color var(--t-fast);
      }
      .section-header glass-chevron {
        margin-left: auto;
        flex-shrink: 0;
      }
      @media (hover: hover) and (pointer: fine) {
        .section-header:hover {
          background: var(--s1);
        }
      }
      .section-header:focus-visible {
        outline: 2px solid var(--c-accent);
        outline-offset: 2px;
      }

      /* ── Section fold animation ── */
      .section-fold {
        display: grid;
        grid-template-rows: 0fr;
        transition: grid-template-rows var(--t-layout);
      }
      .section-fold.open {
        grid-template-rows: 1fr;
      }
      .section-fold-inner {
        overflow: hidden;
        opacity: 0;
        visibility: hidden;
        transition: opacity var(--t-fast), visibility 0s var(--t-layout);
      }
      .section-fold.open .section-fold-inner {
        opacity: 1;
        visibility: visible;
        overflow: visible;
        transition: opacity var(--t-fast) 0.1s, visibility 0s;
      }
      .section-content {
        padding: 0.75rem 0.5rem 0.5rem;
      }

      /* ═══════════════════════════════════════════════
         Wizard (ex wizard.ts)
         ═══════════════════════════════════════════════ */

      .wizard {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1.5rem;
        padding: 1rem 0;
      }

      /* ── Progress dots ── */
      .wizard-progress {
        display: flex;
        gap: 0.375rem;
        align-items: center;
      }
      .wizard-dot {
        width: 0.4375rem;
        height: 0.4375rem;
        border-radius: 50%;
        background: var(--s2);
        border: 1px solid var(--b1);
        transition: background var(--t-fast), border-color var(--t-fast), box-shadow var(--t-fast), transform var(--t-fast);
      }
      .wizard-dot.active {
        background: var(--c-accent);
        border-color: var(--c-accent);
        box-shadow: 0 0 6px rgba(var(--rgb-accent, 139,92,246), 0.35);
        transform: scale(1.25);
      }
      .wizard-dot.done {
        background: var(--c-success);
        border-color: var(--c-success);
      }

      /* ── Step card ── */
      .wizard-card {
        width: 100%;
      }

      /* ── Step icon ── */
      .wizard-step-icon {
        width: 2.5rem;
        height: 2.5rem;
        border-radius: var(--radius-lg);
        background: rgba(var(--rgb-accent, 139,92,246), 0.1);
        border: 1px solid rgba(var(--rgb-accent, 139,92,246), 0.15);
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 1rem;
      }
      .wizard-step-icon ha-icon {
        --mdc-icon-size: 1.25rem;
        color: var(--c-accent);
        display: flex; align-items: center; justify-content: center;
      }
      .wizard-step-icon.success {
        background: rgba(var(--rgb-success, 34,197,94), 0.1);
        border-color: rgba(var(--rgb-success, 34,197,94), 0.15);
      }
      .wizard-step-icon.success ha-icon {
        color: var(--c-success);
      }

      /* ── Room chips ── */
      .wizard-room-list {
        display: flex;
        flex-wrap: wrap;
        gap: 0.25rem;
        margin-bottom: 0.75rem;
      }
      .wizard-room-chip {
        display: flex;
        align-items: center;
        gap: 0.375rem;
        padding: 0.25rem 0.5rem;
        border-radius: var(--radius-md);
        background: var(--s1);
        border: 1px solid var(--b1);
        font-family: inherit;
        font-size: var(--fz-sm);
        color: var(--t2);
        font-weight: 500;
        white-space: nowrap;
        transition: background var(--t-fast), border-color var(--t-fast);
      }
      .wizard-room-chip ha-icon {
        --mdc-icon-size: 0.875rem;
        color: var(--t3);
        display: flex; align-items: center; justify-content: center;
      }

      /* ── Wizard actions ── */
      .wizard-actions {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        margin-top: 0.5rem;
        padding-top: 0.75rem;
        border-top: 1px solid var(--b1);
      }
      .wizard-actions-right {
        display: flex;
        gap: 0.375rem;
        align-items: center;
      }

      /* ── Orphan count ── */
      .wizard-orphan-count {
        font-size: var(--fz-lg);
        font-weight: 700;
        color: var(--t1);
        margin-bottom: 0.25rem;
      }

      /* ═══════════════════════════════════════════════
         DASHBOARD VIEW — redesign 2026-05
         "What's on the dashboard, in order" + "What's available"
         ═══════════════════════════════════════════════ */

      /* ── Head: title + active count ── */
      .dash-head {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 1rem;
        margin-bottom: 0.75rem;
      }
      .dash-head-text {
        flex: 1;
        min-width: 0;
      }
      .dash-head-text .section-label { margin-bottom: 0.125rem; }
      .dash-count {
        display: inline-flex;
        align-items: baseline;
        gap: 0.1875rem;
        padding: 0.375rem 0.625rem;
        border-radius: var(--radius-md);
        background: rgba(var(--rgb-accent), 0.1);
        border: 1px solid rgba(var(--rgb-accent), 0.2);
        flex-shrink: 0;
      }
      .dash-count-num {
        font-size: var(--fz-lg);
        font-weight: 700;
        color: var(--c-accent);
        font-variant-numeric: tabular-nums;
      }
      .dash-count-sep { font-size: var(--fz-sm); color: var(--t4); }
      .dash-count-total {
        font-size: var(--fz-sm);
        color: var(--t3);
        font-variant-numeric: tabular-nums;
      }

      /* ── Active list (vertical, ordered, mirrors dashboard) ── */
      .dash-active-list {
        list-style: none;
        margin: 0; padding: 0;
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
      }
      .dash-row {
        position: relative;
        display: grid;
        grid-template-columns: 1.25rem 1.5rem 1fr 2rem;
        align-items: center;
        gap: 0.5rem;
        padding: 0.375rem 0.5rem 0.375rem 0.25rem;
        background: var(--s1);
        border: 1px solid var(--b1);
        border-radius: var(--radius-md);
        min-height: 3rem;
        transition:
          background var(--t-fast),
          border-color var(--t-fast),
          transform var(--t-fast),
          opacity var(--t-fast);
      }
      .dash-row.dragging {
        opacity: 0.35;
        transform: scale(0.99);
      }
      .dash-row.drop-target {
        border-color: var(--c-accent);
        background: rgba(var(--rgb-accent), 0.08);
      }
      .dash-row::before {
        /* Subtle accent rail on the left, only on hover, signals interactivity */
        content: '';
        position: absolute;
        left: 0; top: 50%;
        width: 0.125rem; height: 0;
        background: var(--c-accent);
        border-radius: var(--radius-full);
        transform: translateY(-50%);
        transition: height var(--t-fast);
        pointer-events: none;
      }
      @media (hover: hover) and (pointer: fine) {
        .dash-row:hover { background: var(--s2); border-color: var(--b2); }
        .dash-row:hover::before { height: 60%; }
      }

      /* Grip (drag handle) */
      .dash-row-grip {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        color: var(--t4);
        cursor: grab;
        line-height: 0;
        transition: color var(--t-fast);
      }
      .dash-row-grip:active { cursor: grabbing; }
      .dash-row:hover .dash-row-grip { color: var(--t3); }
      .dash-row-grip ha-icon { --mdc-icon-size: 1rem; --mdc-icon-color: currentColor; }

      /* Position number — tabular, dimmed, neutral */
      .dash-row-pos {
        font-size: var(--fz-xs);
        font-weight: 700;
        color: var(--t4);
        font-variant-numeric: tabular-nums;
        text-align: center;
        letter-spacing: 0.5px;
      }

      /* Main clickable area: icon + name + chevron */
      .dash-row-main {
        display: flex;
        align-items: center;
        gap: 0.625rem;
        min-width: 0;
        padding: 0.25rem 0;
        background: none;
        border: none;
        cursor: pointer;
        font-family: inherit;
        color: var(--t1);
        outline: none;
        text-align: left;
        -webkit-tap-highlight-color: transparent;
      }
      .dash-row-main:focus-visible {
        outline: 2px solid rgba(var(--rgb-white), 0.25);
        outline-offset: 2px;
        border-radius: var(--radius-sm);
      }
      .dash-row-icon {
        flex-shrink: 0;
        width: 1.75rem; height: 1.75rem;
        border-radius: var(--radius-sm);
        background: rgba(var(--icon-color, 129, 140, 248), 0.12);
        border: 1px solid rgba(var(--icon-color, 129, 140, 248), 0.18);
        display: inline-flex;
        align-items: center;
        justify-content: center;
        color: rgb(var(--icon-color, 129, 140, 248));
      }
      .dash-row-icon ha-icon {
        --mdc-icon-size: 1rem;
        --mdc-icon-color: currentColor;
        color: currentColor;
      }
      .dash-row-name {
        flex: 1;
        min-width: 0;
        font-size: var(--fz-md);
        font-weight: 600;
        color: var(--t1);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .dash-row-chev {
        --mdc-icon-size: 1rem;
        --mdc-icon-color: var(--t4);
        color: var(--t4);
        opacity: 0.5;
        transition: opacity var(--t-fast), transform var(--t-fast);
      }
      .dash-row:hover .dash-row-chev,
      .dash-row-main:focus-visible .dash-row-chev {
        opacity: 1;
        transform: translateX(0.125rem);
      }

      /* Hide button (×) — always visible, clear affordance, expands on interaction */
      .dash-row-hide {
        width: 2rem; height: 2rem;
        border-radius: var(--radius-sm);
        background: var(--s2);
        border: 1px solid var(--b2);
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        color: var(--t3);
        padding: 0;
        outline: none;
        transition:
          background var(--t-fast),
          border-color var(--t-fast),
          color var(--t-fast);
        -webkit-tap-highlight-color: transparent;
      }
      .dash-row-hide ha-icon {
        --mdc-icon-size: 1rem;
        --mdc-icon-color: currentColor;
      }
      @media (hover: hover) and (pointer: fine) {
        .dash-row-hide:hover {
          background: rgba(var(--rgb-alert), 0.15);
          border-color: rgba(var(--rgb-alert), 0.35);
          color: var(--c-alert);
        }
      }
      .dash-row-hide:active {
        background: rgba(var(--rgb-alert), 0.2);
        border-color: rgba(var(--rgb-alert), 0.45);
        color: var(--c-alert);
      }
      .dash-row-hide:focus-visible {
        outline: 2px solid rgba(var(--rgb-white), 0.25);
        outline-offset: 2px;
      }

      /* Empty state when no card is active */
      .dash-empty {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
        padding: 1.75rem 1rem;
        border: 1px dashed var(--b2);
        border-radius: var(--radius-lg);
        color: var(--t4);
      }
      .dash-empty ha-icon { --mdc-icon-size: 1.5rem; --mdc-icon-color: var(--t4); }
      .dash-empty span {
        font-size: var(--fz-sm);
        color: var(--t3);
        text-align: center;
        max-width: 24rem;
      }

      /* ── Divider between active list and disabled chips ── */
      .dash-divider {
        height: 1px;
        margin: 1.25rem 0 1rem;
        background: linear-gradient(
          90deg,
          transparent,
          rgba(var(--rgb-white), 0.08),
          transparent
        );
      }
      .dash-section-disabled {
        display: flex;
        align-items: center;
        gap: 0.375rem;
        margin-bottom: 0.5rem;
      }
      .dash-section-count {
        font-size: var(--fz-xxs);
        font-weight: 700;
        color: var(--t4);
        background: var(--s2);
        padding: 0.0625rem 0.375rem;
        border-radius: var(--radius-full);
        letter-spacing: 0.5px;
      }

      /* ── Disabled chip grid ── */
      .dash-chip-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(8rem, 1fr));
        gap: 0.375rem;
      }
      .dash-chip {
        position: relative;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 0.625rem;
        background: var(--s1);
        border: 1px dashed var(--b2);
        border-radius: var(--radius-md);
        cursor: pointer;
        font-family: inherit;
        text-align: left;
        color: var(--t3);
        outline: none;
        opacity: 0.75;
        transition:
          background var(--t-fast),
          border-color var(--t-fast),
          color var(--t-fast),
          opacity var(--t-fast),
          border-style var(--t-fast);
        -webkit-tap-highlight-color: transparent;
      }
      .dash-chip:focus-visible {
        outline: 2px solid rgba(var(--rgb-white), 0.25);
        outline-offset: 2px;
      }
      .dash-chip-icon {
        flex-shrink: 0;
        width: 1.25rem; height: 1.25rem;
        border-radius: var(--radius-sm);
        background: rgba(var(--icon-color, 129, 140, 248), 0.1);
        display: inline-flex;
        align-items: center;
        justify-content: center;
        color: rgb(var(--icon-color, 129, 140, 248));
      }
      .dash-chip-icon ha-icon {
        --mdc-icon-size: 0.875rem;
        --mdc-icon-color: currentColor;
        color: currentColor;
      }
      .dash-chip-name {
        flex: 1;
        min-width: 0;
        font-size: var(--fz-base);
        font-weight: 600;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .dash-chip-plus {
        --mdc-icon-size: 0.875rem;
        --mdc-icon-color: var(--t4);
        color: var(--t4);
        opacity: 0;
        transform: scale(0.85);
        transition: opacity var(--t-fast), transform var(--t-fast), color var(--t-fast);
      }
      @media (hover: hover) and (pointer: fine) {
        .dash-chip:hover {
          background: rgba(var(--rgb-success), 0.05);
          border-color: rgba(var(--rgb-success), 0.3);
          border-style: solid;
          color: var(--t1);
          opacity: 1;
        }
        .dash-chip:hover .dash-chip-plus {
          opacity: 1;
          transform: scale(1);
          color: var(--c-success);
        }
      }

      /* DOMAIN_COLORS pass --icon-color as an RGB triplet "R, G, B"
         consumed via rgb() / rgba(). Falls back to accent 129,140,248. */

      /* ── Room popup action buttons editor ── */
      .room-buttons-list {
        display: flex;
        flex-direction: column;
        gap: 0.375rem;
        margin-bottom: 1rem;
      }
      .room-button-row {
        display: flex;
        flex-direction: column;
        gap: 0.375rem;
        padding: 0.5rem 0.625rem;
        background: var(--s1);
        border: 1px solid var(--b1);
        border-radius: var(--radius-md);
      }
      .room-button-label-row {
        display: flex;
        align-items: stretch;
        gap: 0.375rem;
      }
      .room-button-entity-dropdown {
        margin-bottom: 0;
      }
      .room-button-entity-dropdown .dropdown-trigger {
        min-height: var(--tap-lg);
      }
      .room-button-entity-dropdown .dropdown-trigger > span {
        min-width: 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .room-button-icon-trigger {
        position: relative;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: var(--tap-lg);
        height: var(--tap-lg);
        flex-shrink: 0;
        padding: 0;
        background: rgba(var(--rgb-accent), 0.10);
        border: 1px dashed rgba(var(--rgb-accent), 0.35);
        border-radius: var(--radius-lg);
        color: var(--c-accent);
        cursor: pointer;
        outline: none;
        transition: background var(--t-fast), border-color var(--t-fast);
        -webkit-tap-highlight-color: transparent;
      }
      .room-button-icon-trigger .room-button-icon-preview { --mdc-icon-size: 1.125rem; }
      @media (hover: hover) and (pointer: fine) {
        .room-button-icon-trigger:hover {
          background: rgba(var(--rgb-accent), 0.18);
          border-color: rgba(var(--rgb-accent), 0.55);
        }
      }
      .room-button-icon-trigger:focus-visible {
        outline: 2px solid var(--c-accent);
        outline-offset: 2px;
      }
      .room-button-delete {
        align-self: stretch;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.375rem;
        margin-top: 0.125rem;
        padding: 0.5rem 0.875rem;
        background: transparent;
        border: 1px solid var(--b1);
        border-radius: var(--radius-md);
        color: var(--t3);
        cursor: pointer;
        font-family: inherit;
        font-size: var(--fz-sm);
        font-weight: 600;
        outline: none;
        transition: background var(--t-fast), color var(--t-fast), border-color var(--t-fast);
        -webkit-tap-highlight-color: transparent;
      }
      .room-button-delete ha-icon { --mdc-icon-size: 1rem; }
      @media (hover: hover) and (pointer: fine) {
        .room-button-delete:hover {
          background: rgba(var(--rgb-alert), 0.12);
          color: var(--c-alert);
          border-color: rgba(var(--rgb-alert), 0.35);
        }
      }
      .room-button-delete:focus-visible {
        outline: 2px solid var(--c-alert);
        outline-offset: 2px;
      }
      .room-button-row .dropdown {
        margin-bottom: 0;
      }
      .room-button-row .dropdown-trigger[disabled] {
        opacity: 0.5;
        cursor: not-allowed;
      }
      .room-button-input {
        flex: 1;
        min-width: 0;
        min-height: var(--tap-lg);
        padding: 0.5rem 0.75rem;
        background: var(--s2);
        border: 1px solid var(--b2);
        border-radius: var(--radius-lg);
        color: var(--t1);
        font-family: inherit;
        font-size: var(--fz-base);
        outline: none;
        transition: border-color var(--t-fast), background var(--t-fast);
        box-sizing: border-box;
      }
      .room-button-input:focus {
        border-color: var(--b3);
        background: var(--s3);
      }
      .room-button-input::placeholder {
        color: var(--t4);
      }
      .room-button-textarea {
        width: 100%;
        font-family: 'SFMono-Regular', Consolas, monospace;
        font-size: var(--fz-sm);
        min-height: 3rem;
        resize: vertical;
      }
      .room-button-advanced {
        margin-top: 0.25rem;
        font-size: var(--fz-sm);
      }
      .room-button-advanced summary {
        cursor: pointer;
        color: var(--t3);
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 1px;
        font-size: var(--fz-xs);
        padding: 0.25rem 0;
        outline: none;
        list-style: none;
        display: flex;
        align-items: center;
        gap: 0.25rem;
      }
      .room-button-advanced summary::before {
        content: '›';
        display: inline-block;
        font-size: 1em;
        line-height: 1;
        transition: transform var(--t-fast);
      }
      .room-button-advanced[open] summary::before {
        transform: rotate(90deg);
      }
      .room-button-advanced summary::-webkit-details-marker {
        display: none;
      }
      /* Spacing between direct children inside the open advanced panel (skip summary itself). */
      .room-button-advanced[open] > *:not(summary) {
        margin-top: 0.5rem;
      }
      .room-button-add {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.375rem;
        padding: 0.5rem 0.875rem;
        background: var(--s1);
        border: 1px dashed var(--b2);
        border-radius: var(--radius-md);
        color: var(--t2);
        cursor: pointer;
        font-family: inherit;
        font-size: var(--fz-sm);
        font-weight: 600;
        outline: none;
        transition: background var(--t-fast), border-color var(--t-fast), color var(--t-fast);
      }
      .room-button-add ha-icon { --mdc-icon-size: 1rem; }
      @media (hover: hover) and (pointer: fine) {
        .room-button-add:hover {
          background: var(--s2);
          border-color: var(--b3);
          color: var(--t1);
        }
      }
`;
