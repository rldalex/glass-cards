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

      /* ── Banner ── */
      .banner {
        display: flex;
        align-items: center;
        gap: 0.625rem;
        padding: 0.625rem 0.875rem;
        border-radius: var(--radius-lg);
        font-size: var(--fz-base);
        font-weight: 500;
        margin-bottom: 0.875rem;
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
        gap: 0.625rem;
        padding: 0.5rem 0.625rem;
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
        border-color: var(--c-accent);
        background: rgba(var(--rgb-accent), 0.06);
      }
      .item-row .feature-icon ha-icon { --mdc-icon-size: 1rem; }

      .card-row {
        padding: 0.625rem;
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
        gap: 0.0625rem;
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
        width: 2.375rem;
        height: 1.25rem;
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
        top: 0.125rem;
        left: 0.125rem;
        width: 0.875rem;
        height: 0.875rem;
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
        transform: translateX(18px);
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
        transition: all var(--t-fast);
        -webkit-tap-highlight-color: transparent;
      }
      .btn-icon.sm { width: 2rem; height: 2rem; border-radius: var(--radius-md); }
      .btn-icon.xs { width: 1.75rem; height: 1.75rem; border-radius: var(--radius-sm); }
      .btn-icon ha-icon { display: flex; align-items: center; justify-content: center; }
      .btn-icon.xs ha-icon { --mdc-icon-size: 0.875rem; }
      .btn-icon.sm ha-icon { --mdc-icon-size: 1rem; }
      @media (hover: hover) and (pointer: fine) { .btn-icon:hover { background: var(--s2); color: var(--t2); } }
      @media (pointer: coarse) { .btn-icon:active { animation: bounce 0.3s ease; } }
      .btn-icon:focus-visible { outline: 2px solid var(--c-accent); outline-offset: 2px; }

      /* ── Feature toggles ── */
      .feature-list {
        display: flex;
        flex-direction: column;
        gap: 0.125rem;
        margin-bottom: 0.875rem;
      }
      .feature-row {
        display: flex;
        align-items: center;
        gap: 0.625rem;
        padding: 0.5rem 0.625rem;
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
        margin-top: 0.0625rem;
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
        padding: 0.375rem 0.625rem 0.5rem;
      }

      /* ── Threshold inputs ── */
      .threshold-list {
        display: flex;
        flex-direction: column;
        gap: 0.375rem;
        margin-bottom: 0.875rem;
      }
      .threshold-row {
        display: flex;
        align-items: center;
        gap: 0.625rem;
        padding: 0.375rem 0.625rem;
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

      /* ── Fold separator (from kit) ── */
      .fold-sep {
        height: 0.0625rem;
        margin: 0 0.75rem;
        background: linear-gradient(90deg, transparent, var(--b2), transparent);
        opacity: 0;
        transition: opacity var(--t-fast);
      }
      .fold-sep.visible { opacity: 1; }

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
        padding: 0 0.875rem;
        border-radius: var(--radius-lg);
        font-size: var(--fz-base);
      }
      .btn-sm {
        height: 1.75rem;
        padding: 0 0.625rem;
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
        padding: 0.625rem 1.125rem;
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
        border: 1px solid var(--b1); padding: 0.1875rem;
        width: 100%; margin-bottom: 0.5rem;
      }
      .seg-btn {
        flex: 1;
        padding: 0.4375rem 0; border-radius: var(--radius-sm);
        font-family: inherit; font-size: var(--fz-base); font-weight: 600;
        color: var(--t3); cursor: pointer; transition: all var(--t-fast);
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
        padding: 0.375rem 0.625rem;
        font-size: var(--fz-base);
      }
      .entity-rename-row .btn-icon {
        width: 1.75rem; height: 1.75rem;
        border-radius: var(--radius-sm);
      }
      .entity-rename-row .btn-icon ha-icon {
        --mdc-icon-size: 0.875rem;
      }
`;
