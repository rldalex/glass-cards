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
        max-width: 27.5rem;
        margin: 0 auto;
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
      .mt-md { margin-top: 1.25rem; }
      .mt-lg { margin-top: 1.75rem; }

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
      .empty-rooms .drag-handle {
        visibility: hidden;
      }
      .empty-rooms .room-icon-btn {
        pointer-events: none;
        opacity: 0.4;
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

      /* ── Drag handle ── */
      .drag-handle {
        width: 1.25rem;
        height: 1.25rem;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: grab;
        color: var(--t4);
        flex-shrink: 0;
        border-radius: 4px;
        transition: color var(--t-fast);
        position: relative;
      }
      .drag-handle::before {
        content: '';
        position: absolute;
        inset: -0.75rem;
      }
      @media (hover: hover) and (pointer: fine) {
        .drag-handle:hover {
          color: var(--t3);
        }
      }
      .drag-handle:active {
        cursor: grabbing;
      }
      .drag-handle ha-icon {
        --mdc-icon-size: 0.875rem;
        display: flex; align-items: center; justify-content: center;
      }

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

      /* ── Card icon box ── */
      .card-icon-box {
        width: 2.25rem;
        height: 2.25rem;
        border-radius: var(--radius-md);
        background: var(--s2);
        border: 1px solid var(--b1);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }
      .card-icon-box ha-icon {
        --mdc-icon-size: 1.125rem;
        color: var(--t2);
        display: flex; align-items: center; justify-content: center;
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
      .entity-name-btn {
        display: inline-flex;
        align-items: center;
        gap: 0.25rem;
        background: var(--s1);
        border: 1px solid var(--b1);
        border-radius: var(--radius-sm);
        padding: 0.375rem 0.5rem;
        font-family: inherit;
        font-size: var(--fz-base);
        font-weight: 600;
        color: var(--t1);
        cursor: pointer;
        outline: none;
        transition: background var(--t-fast), border-color var(--t-fast);
        max-width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        -webkit-tap-highlight-color: transparent;
      }
      .entity-name-btn:focus-visible {
        outline: 2px solid rgba(var(--rgb-white), 0.25);
        outline-offset: 2px;
      }
      @media (hover: hover) and (pointer: fine) {
        .entity-name-btn:hover {
          background: var(--s2);
          border-color: var(--b2);
        }
        .entity-name-btn:hover ha-icon { color: var(--t2) !important; }
      }
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

      /* ── Card count badge ── */
      .card-count {
        font-size: var(--fz-sm);
        font-weight: 600;
        color: var(--t3);
        padding: 0.125rem 0.5rem;
        border-radius: var(--radius-full);
        background: var(--s1);
        border: 1px solid var(--b1);
        flex-shrink: 0;
      }

      /* ── Toggle ── */
      .toggle {
        position: relative;
        width: 2.75rem;
        height: 1.5rem;
        border-radius: var(--radius-md);
        background: var(--s2);
        border: 1px solid var(--b2);
        cursor: pointer;
        transition:
          background var(--t-fast),
          border-color var(--t-fast);
        padding: 0;
        outline: none;
        font-size: 0;
        flex-shrink: 0;
        -webkit-tap-highlight-color: transparent;
      }
      .toggle::after {
        content: '';
        position: absolute;
        top: 0.1875rem;
        left: 0.1875rem;
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
        background: var(--t3);
        transition:
          transform var(--t-fast),
          background var(--t-fast),
          box-shadow var(--t-fast);
      }
      .toggle.on {
        background: rgba(var(--rgb-success), 0.2);
        border-color: rgba(var(--rgb-success), 0.3);
      }
      .toggle.on::after {
        transform: translateX(1.25rem);
        background: var(--c-success);
        box-shadow: 0 0 8px rgba(var(--rgb-success), 0.4);
      }
      .toggle:focus-visible {
        outline: 2px solid var(--c-accent);
        outline-offset: 2px;
      }

      /* ── Icon button (from UI kit) ── */
      .btn-icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 2.5rem; height: 2.5rem;
        border-radius: var(--radius-lg);
        border: none; background: transparent;
        color: var(--t3); cursor: pointer;
        padding: 0; outline: none; flex-shrink: 0;
        transition: background var(--t-fast), color var(--t-fast);
        -webkit-tap-highlight-color: transparent;
        position: relative;
      }
      .btn-icon.sm { width: 2rem; height: 2rem; border-radius: var(--radius-md); }
      .btn-icon.xs { width: 1.75rem; height: 1.75rem; border-radius: var(--radius-sm); }
      .btn-icon ha-icon { display: flex; align-items: center; justify-content: center; }
      .btn-icon.xs ha-icon { --mdc-icon-size: 0.875rem; }
      .btn-icon.sm ha-icon { --mdc-icon-size: 1rem; }
      .btn-icon.sm::before {
        content: '';
        position: absolute;
        inset: -0.375rem;
      }
      .btn-icon.xs::before {
        content: '';
        position: absolute;
        inset: -0.5rem;
      }
      @media (hover: hover) and (pointer: fine) { .btn-icon:hover { background: var(--s2); color: var(--t2); } }
      @media (pointer: coarse) { .btn-icon:active { animation: bounce 0.3s ease; } }
      .btn-icon:focus-visible { outline: 2px solid var(--c-accent); outline-offset: 2px; }

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
      .feature-sub {
        display: grid;
        grid-template-rows: 0fr;
        transition: grid-template-rows var(--t-layout);
      }
      .feature-sub.open { grid-template-rows: 1fr; }
      .feature-sub-inner {
        overflow: hidden;
        opacity: 0;
        transition: opacity 0.2s var(--ease-std);
      }
      .feature-sub.open .feature-sub-inner {
        opacity: 1;
        transition-delay: 0.08s;
      }
      .feature-sub-content {
        padding: 0.375rem 0.5rem 0.5rem;
      }

      /* ── Threshold inputs ── */
      .threshold-list {
        display: flex;
        flex-direction: column;
        gap: 0.375rem;
        margin-bottom: 1rem;
      }
      .threshold-row {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.375rem 0.5rem;
      }
      .threshold-icon {
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
      .threshold-icon ha-icon {
        --mdc-icon-size: 0.875rem;
        color: var(--t2);
        display: flex; align-items: center; justify-content: center;
      }
      .threshold-icon.hot ha-icon { color: var(--c-temp-hot); }
      .threshold-icon.cold ha-icon { color: var(--c-temp-cold); }
      .threshold-icon.humidity ha-icon { color: var(--c-info); }
      .threshold-label {
        flex: 1;
        min-width: 0;
        font-size: var(--fz-base);
        font-weight: 600;
        color: var(--t2);
      }
      .threshold-input {
        width: 3.5rem;
        height: 1.75rem;
        border-radius: var(--radius-sm);
        border: 1px solid var(--b2);
        background: var(--s2);
        color: var(--t1);
        font-family: inherit;
        font-size: var(--fz-base);
        font-weight: 600;
        text-align: center;
        outline: none;
        transition: border-color var(--t-fast);
        -webkit-appearance: none;
        -moz-appearance: textfield;
      }
      .threshold-input:focus {
        border-color: var(--c-accent);
      }
      .threshold-input::-webkit-inner-spin-button,
      .threshold-input::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
      .threshold-unit {
        font-size: var(--fz-sm);
        font-weight: 500;
        color: var(--t4);
        width: 1rem;
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
      .btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.375rem;
        border: 1px solid var(--b2);
        background: var(--s2);
        color: var(--t2);
        font-family: inherit;
        font-weight: 600;
        cursor: pointer;
        transition:
          background var(--t-fast),
          border-color var(--t-fast),
          color var(--t-fast);
        outline: none;
        -webkit-tap-highlight-color: transparent;
        height: 2.25rem;
        padding: 0 0.75rem;
        border-radius: var(--radius-lg);
        font-size: var(--fz-base);
      }
      .btn-sm {
        height: 1.75rem;
        padding: 0 0.5rem;
        font-size: var(--fz-base);
        border-radius: var(--radius-md);
      }
      @media (hover: hover) and (pointer: fine) {
        .btn:hover {
          background: var(--s4);
          border-color: var(--b3);
          color: var(--t1);
        }
      }
      @media (pointer: coarse) {
        .btn:active { animation: bounce 0.3s ease; }
      }
      .btn:focus-visible {
        outline: 2px solid var(--c-accent);
        outline-offset: 2px;
      }
      .btn-accent {
        border-color: rgba(var(--rgb-accent), 0.25);
        background: rgba(var(--rgb-accent), 0.12);
        color: var(--c-accent);
      }
      @media (hover: hover) and (pointer: fine) {
        .btn-accent:hover {
          background: rgba(var(--rgb-accent), 0.2);
          border-color: rgba(var(--rgb-accent), 0.35);
        }
      }
      @media (pointer: coarse) {
        .btn-accent:active { animation: bounce 0.3s ease; }
      }
      .btn-accent:disabled {
        opacity: 0.4;
        cursor: not-allowed;
      }
      .btn-ghost {
        border-color: transparent;
        background: transparent;
      }
      @media (hover: hover) and (pointer: fine) {
        .btn-ghost:hover {
          background: var(--s2);
        }
      }
      @media (pointer: coarse) {
        .btn-ghost:active { animation: bounce 0.3s ease; }
      }

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

      /* ── Fan preview spin ── */
      @keyframes spin-fan-preview {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
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
        min-width: 1.75rem; text-align: center;
      }

      /* ── Dot (status indicator) ── */
      .dot {
        width: 0.375rem; height: 0.375rem;
        border-radius: 50%;
        flex-shrink: 0;
      }

      /* ── Utility spacing ── */
      .mt-12 { margin-top: 0.75rem; }
      .mb-8 { margin-bottom: 0.5rem; }

      /* ── Entity rename ── */
      .entity-rename-row {
        display: flex; align-items: center; gap: 0.375rem;
      }
      .entity-rename-row .input {
        flex: 1; min-width: 0;
        padding: 0.375rem 0.5rem;
        font-size: var(--fz-base);
      }
      .entity-rename-row .btn-icon {
        width: 1.75rem; height: 1.75rem;
        border-radius: var(--radius-sm);
      }
      .entity-rename-row .btn-icon ha-icon {
        --mdc-icon-size: 0.875rem;
      }

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

      /* ── Room grid ── */
      .room-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(7rem, 1fr));
        gap: 0.5rem;
      }
      .room-card {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
        padding: 1rem 0.5rem;
        border-radius: var(--radius-lg);
        background: var(--s1);
        border: 1px solid var(--b1);
        cursor: pointer;
        transition: background var(--t-fast), border-color var(--t-fast), color var(--t-fast);
        font-family: inherit;
        font-size: var(--fz-sm);
        font-weight: 600;
        color: var(--t2);
        outline: none;
        -webkit-tap-highlight-color: transparent;
      }
      .room-card ha-icon {
        --mdc-icon-size: 1.5rem;
        color: var(--t3);
        transition: color var(--t-fast);
      }
      .room-card-icon {
        width: 36px; height: 36px;
        border-radius: var(--radius-md);
        background: var(--s2);
        border: 1px solid var(--b1);
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .room-card-icon ha-icon {
        --mdc-icon-size: 20px;
        --mdc-icon-color: var(--icon-color, var(--t3));
        color: var(--icon-color, var(--t3));
      }
      .room-card .room-name {
        text-align: center;
        line-height: 1.2;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        max-width: 100%;
      }
      @media (hover: hover) and (pointer: fine) {
        .room-card:hover {
          background: var(--s3);
          border-color: var(--b2);
          color: var(--t1);
        }
      }
      .room-card:focus-visible {
        outline: 2px solid var(--c-accent);
        outline-offset: 2px;
      }
      .room-card.disabled {
        opacity: 0.35;
        cursor: default;
        pointer-events: none;
        color: var(--t4);
      }
      .badge-soon {
        font-size: 0.5rem;
        font-weight: 700;
        font-family: inherit;
        text-transform: uppercase;
        letter-spacing: 0.8px;
        color: var(--t4);
        background: var(--s2);
        padding: 0.125rem 0.375rem;
        border-radius: var(--radius-sm);
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

      /* ── Mobile nav adjustments ── */
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
        .room-grid {
          grid-template-columns: repeat(auto-fill, minmax(5.5rem, 1fr));
          gap: 0.375rem;
        }
        .room-card {
          padding: 0.75rem 0.375rem;
          gap: 0.375rem;
        }
        .room-card ha-icon { --mdc-icon-size: 1.25rem; }
        .room-card .room-name { font-size: var(--fz-xs); }
      }

      /* ═══════════════════════════════════════════════
         Room detail sections (ex room-detail.ts)
         ═══════════════════════════════════════════════ */

      .room-sections {
        display: flex;
        flex-direction: column;
        gap: 0.375rem;
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
        background: rgba(129, 140, 248, 0.1);
        border-color: rgba(129, 140, 248, 0.2);
        color: var(--c-accent);
      }
      .scene-chip.on ha-icon {
        --mdc-icon-color: var(--c-accent);
        color: var(--c-accent);
      }
      .scene-chip.dragging { opacity: 0.3; }
      .scene-chip.drop-target {
        border-color: var(--c-accent);
        box-shadow: 0 0 0 1px rgba(129, 140, 248, 0.2);
      }
      @media (hover: hover) and (pointer: fine) {
        .scene-chip:hover {
          background: var(--s2);
          border-color: var(--b2);
          color: var(--t2);
        }
        .scene-chip.on:hover {
          background: rgba(129, 140, 248, 0.15);
        }
      }

      .section-header-wrap {
        display: flex;
        align-items: center;
        gap: 0;
      }
      .section-header-wrap .drag-handle {
        flex-shrink: 0;
        cursor: grab;
        color: var(--t4);
        display: flex;
        align-items: center;
        justify-content: center;
        width: 1.5rem;
        padding: 0.5rem 0;
      }
      .section-header-wrap .drag-handle ha-icon {
        --mdc-icon-size: 1rem;
        --mdc-icon-color: var(--t4);
      }
      @media (hover: hover) and (pointer: fine) {
        .section-header-wrap .drag-handle:hover {
          color: var(--t2);
          background: var(--s2);
          border-radius: var(--radius-xs);
        }
      }
      .section-header-wrap.off { opacity: 0.35; }
      .section-header-wrap.off .section-header { pointer-events: none; }
      .dragging > .section-header-wrap { opacity: 0.25; }
      .drop-target > .section-header-wrap {
        background: rgba(129, 140, 248, 0.06);
        border-radius: var(--radius-sm);
      }

      /* Chevron in header-wrap */
      .section-header-wrap > .section-chevron {
        --mdc-icon-size: 1.125rem;
        --mdc-icon-color: var(--t4);
        color: var(--t4);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: transform var(--t-med), color var(--t-fast);
        cursor: pointer;
        flex-shrink: 0;
        padding: 0.5rem 0.25rem;
      }
      .section-header-wrap > .section-chevron.open {
        transform: rotate(180deg);
        color: var(--t2);
        --mdc-icon-color: var(--t2);
      }

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
      .section-header-icon {
        width: 1.75rem;
        height: 1.75rem;
        border-radius: var(--radius-sm);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }
      .section-header-icon ha-icon {
        --mdc-icon-size: 0.9375rem;
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
      .section-header .section-chevron {
        --mdc-icon-size: 1rem;
        transition: transform var(--t-med), color var(--t-fast);
        color: var(--t4);
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .section-header .section-chevron.open {
        transform: rotate(180deg);
        color: var(--t2);
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

      /* ── Dashboard card grid ── */
      .dash-card { position: relative; cursor: grab; user-select: none; -webkit-user-select: none; }
      .dash-card.off { opacity: 0.5; border-style: dashed; }
      .dash-card.off .room-card-icon { border-style: dashed; }
      .dash-card.dragging { opacity: 0.25; transform: scale(0.95); }
      .dash-card.drop-target { border-color: var(--c-accent); background: rgba(129, 140, 248, 0.06); }

      .dash-toggle-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        padding: 0.375rem 0.25rem 0;
        margin-top: 0.25rem;
        border-top: 1px solid var(--b1);
      }
      .dash-toggle-label {
        font-size: 7px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.4px;
        color: var(--t4);
      }
      .dash-toggle {
        position: relative;
        width: 32px; height: 18px; border-radius: 9px;
        background: var(--s2); border: 1px solid var(--b2);
        cursor: pointer; transition: background 0.2s var(--ease-std), border-color 0.2s var(--ease-std);
        padding: 0; outline: none; flex-shrink: 0;
        -webkit-tap-highlight-color: transparent;
      }
      .dash-toggle::before {
        content: '';
        position: absolute;
        inset: -0.75rem -0.375rem;
      }
      .dash-toggle::after {
        content: ''; position: absolute; top: 2px; left: 2px;
        width: 12px; height: 12px; border-radius: 50%;
        background: var(--t4); transition: transform 0.2s var(--ease-std), background 0.2s var(--ease-std), box-shadow 0.2s var(--ease-std);
      }
      .dash-toggle.on { background: rgba(74, 222, 128, 0.2); border-color: rgba(74, 222, 128, 0.3); }
      .dash-toggle.on::after { transform: translateX(14px); background: var(--c-success); box-shadow: 0 0 6px rgba(74, 222, 128, 0.4); }

      .dash-order {
        position: absolute; top: 6px; left: 6px;
        width: 16px; height: 16px; border-radius: 50%;
        background: var(--s3); border: 1px solid var(--b1);
        font-size: 8px; font-weight: 700; color: var(--t3);
        display: flex; align-items: center; justify-content: center; z-index: 2;
      }

      .dash-drag-hint {
        position: absolute; bottom: 2px; left: 50%; transform: translateX(-50%);
        color: var(--t4); opacity: 0; transition: opacity 0.2s var(--ease-std); pointer-events: none;
      }
      .dash-drag-hint ha-icon {
        --mdc-icon-size: 0.75rem;
        --mdc-icon-color: var(--t4);
      }
      .dash-card:hover .dash-drag-hint { opacity: 0.6; }
`;
