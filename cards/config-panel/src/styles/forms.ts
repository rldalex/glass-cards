import { css } from 'lit';

/**
 * Form element styles: dropdowns, icon pickers, chips, title config,
 * title mode icon picker, icon picker popup, light row extras,
 * schedule styles, inputs, check items, datetime picker, presence mapping,
 * hint texts.
 */
export const formStyles = css`
      /* ── Dropdown ── */
      .dropdown {
        position: relative;
        width: 100%;
        margin-bottom: 1rem;
      }
      .dropdown-trigger {
        width: 100%;
        display: inline-flex;
        align-items: center;
        gap: 0.375rem;
        padding: 0.5rem 0.75rem;
        border-radius: var(--radius-lg);
        border: 1px solid var(--b2);
        background: var(--s2);
        color: var(--t2);
        font-family: inherit;
        font-size: var(--fz-base);
        font-weight: 600;
        cursor: pointer;
        transition: background var(--t-fast), border-color var(--t-fast);
        outline: none;
        -webkit-tap-highlight-color: transparent;
      }
      @media (hover: hover) and (pointer: fine) {
        .dropdown-trigger:hover {
          background: var(--s3);
          border-color: var(--b3);
        }
      }
      @media (pointer: coarse) {
        .dropdown-trigger:active { animation: bounce 0.3s ease; }
      }
      .dropdown-trigger:focus-visible {
        outline: 2px solid var(--c-accent);
        outline-offset: 2px;
      }
      .dropdown-trigger ha-icon {
        --mdc-icon-size: 1rem;
        display: flex; align-items: center; justify-content: center;
      }
      .dropdown-trigger .arrow {
        margin-left: auto;
        color: var(--t3);
        transition: transform var(--t-fast);
      }
      .dropdown.open .dropdown-trigger .arrow {
        transform: rotate(180deg);
      }
      .dropdown-menu {
        position: absolute;
        top: calc(100% + 0.375rem);
        left: 0;
        right: 0;
        z-index: 20;
        min-width: 10rem;
        max-height: 12.5rem;
        overflow-y: auto;
        border-radius: var(--radius-lg);
        padding: 0.25rem;
        background: #1e2433;
        border: 1px solid var(--b2);
        box-shadow: 0 12px 40px rgba(var(--rgb-black), 0.5);
        opacity: 0;
        transform: translateY(-4px);
        pointer-events: none;
        transition: opacity var(--t-fast), transform var(--t-fast);
        scrollbar-width: none;
      }
      .dropdown-menu::-webkit-scrollbar { display: none; }
      .dropdown-search {
        width: calc(100% - 0.5rem); margin: 0.25rem; padding: 0.4375rem 0.625rem;
        border-radius: var(--radius-sm); border: 1px solid var(--b1);
        background: var(--s1); color: var(--t1);
        font-family: inherit; font-size: var(--fz-base); outline: none;
        box-sizing: border-box;
      }
      .dropdown-search::placeholder { color: var(--t4); }
      .dropdown-search:focus { border-color: var(--b3); }
      .dropdown.open .dropdown-menu {
        opacity: 1;
        transform: translateY(0);
        pointer-events: auto;
      }
      .dropdown-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 0.75rem;
        border-radius: var(--radius-md);
        font-size: var(--fz-base);
        font-weight: 500;
        color: var(--t2);
        cursor: pointer;
        transition: background var(--t-fast), color var(--t-fast);
        border: none;
        background: transparent;
        width: 100%;
        font-family: inherit;
        outline: none;
        text-align: left;
        -webkit-tap-highlight-color: transparent;
      }
      @media (hover: hover) and (pointer: fine) {
        .dropdown-item:hover {
          background: var(--s3);
          color: var(--t1);
        }
      }
      @media (pointer: coarse) {
        .dropdown-item:active { animation: bounce 0.3s ease; }
      }
      .dropdown-item:focus-visible {
        outline: 2px solid var(--c-accent);
        outline-offset: -2px;
      }
      .dropdown-item.active {
        color: var(--c-accent);
      }
      .dropdown-item ha-icon {
        --mdc-icon-size: 1rem;
        display: flex; align-items: center; justify-content: center;
      }

      /* ── Icon picker ── */
      .icon-picker-fold {
        display: grid;
        grid-template-rows: 0fr;
        transition: grid-template-rows var(--t-layout);
      }
      .icon-picker-fold.open {
        grid-template-rows: 1fr;
      }
      .icon-picker-inner {
        overflow: hidden;
        opacity: 0;
        transition: opacity var(--t-fast);
      }
      .icon-picker-fold.open .icon-picker-inner {
        opacity: 1;
      }
      .icon-picker-grid {
        display: grid;
        grid-template-columns: repeat(8, 1fr);
        gap: 0.25rem;
        padding: 0.5rem 0;
      }
      .icon-pick {
        width: 100%;
        aspect-ratio: 1;
        border-radius: var(--radius-sm);
        background: var(--s1);
        border: 1px solid var(--b1);
        cursor: pointer;
        outline: none;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;
        font-family: inherit;
        transition:
          background var(--t-fast),
          border-color var(--t-fast);
        -webkit-tap-highlight-color: transparent;
      }
      .icon-pick ha-icon {
        --mdc-icon-size: 1.125rem;
        color: var(--t2);
        display: flex; align-items: center; justify-content: center;
      }
      @media (hover: hover) and (pointer: fine) {
        .icon-pick:hover {
          background: var(--s3);
          border-color: var(--b2);
        }
      }
      @media (pointer: coarse) {
        .icon-pick:active { animation: bounce 0.3s ease; }
      }
      .icon-pick:focus-visible {
        outline: 2px solid var(--c-accent);
        outline-offset: -2px;
      }
      .icon-pick.selected {
        background: rgba(var(--rgb-accent), 0.12);
        border-color: rgba(var(--rgb-accent), 0.25);
      }

      /* ── Chip group ── */
      .chip-group {
        display: flex;
        flex-wrap: wrap;
        gap: 0.375rem;
        padding: 0 0.25rem;
        margin-bottom: 0.125rem;
      }

      /* ── Chip (UI kit) ── */
      .chip {
        display: inline-flex; align-items: center; gap: 0.25rem;
        padding: 0.25rem 0.75rem; border-radius: var(--radius-md);
        border: 1px solid var(--b2); background: var(--s1);
        font-family: inherit; font-size: var(--fz-base); font-weight: 600;
        color: var(--t3); cursor: pointer; transition: background var(--t-fast), border-color var(--t-fast), color var(--t-fast);
        outline: none; -webkit-tap-highlight-color: transparent;
      }
      @media (hover: hover) and (pointer: fine) {
        .chip:hover { background: var(--s3); color: var(--t2); border-color: var(--b3); }
      }
      .chip:focus-visible { outline: 2px solid rgba(var(--rgb-white),0.25); outline-offset: 2px; }
      .chip.active { background: var(--s4); border-color: var(--b3); color: var(--t1); }
      .chip ha-icon {
        --mdc-icon-size: 0.875rem;
        display: flex; align-items: center; justify-content: center;
      }
      @media (pointer: coarse) {
        .chip:active { transform: scale(0.94); }
      }

      /* ── Title config styles ── */
      .title-section-gap {
        height: 0.75rem;
      }
      .title-modes-list {
        display: flex; flex-direction: column; gap: 0.5rem;
      }
      .title-mode-row {
        display: flex; flex-direction: column; gap: 0.5rem;
        padding: 0.75rem; border-radius: var(--radius-md);
        background: var(--s1); border: 1px solid var(--b1);
        cursor: grab; transition: opacity var(--t-fast), border-color var(--t-fast), box-shadow var(--t-fast);
      }
      .title-mode-row.dragging {
        opacity: 0.4;
      }
      .title-mode-row.drop-target {
        border-color: var(--c-accent);
        box-shadow: 0 0 0 1px var(--c-accent);
      }
      .title-source-block {
        border: 1px solid var(--b1); border-radius: var(--radius-md);
        background: var(--s1); margin-bottom: 0.5rem;
      }
      .title-source-header {
        display: flex; align-items: center; gap: 0.5rem;
        padding: 0.5rem 0.75rem;
      }
      .title-source-block.dragging {
        opacity: 0.4;
      }
      .title-source-block.drop-target {
        border-color: var(--c-accent);
        box-shadow: 0 0 0 1px var(--c-accent);
      }
      .title-source-header ha-icon {
        --mdc-icon-size: 1rem; color: var(--t3);
        display: flex; align-items: center; justify-content: center;
      }
      .title-source-type {
        font-size: var(--fz-base); font-weight: 600; color: var(--t2);
      }
      .title-source-badge {
        font-size: var(--fz-xs); font-weight: 700; color: var(--t4);
        background: var(--s3); border-radius: var(--radius-full);
        padding: 0.0625rem 0.375rem;
      }
      .title-source-actions-first {
        margin-left: auto;
      }
      .title-source-body {
        padding: 0 0.75rem 0.75rem;
        display: flex; flex-direction: column; gap: 0.5rem;
      }
      .title-source-field {
        display: flex; flex-direction: column; gap: 0.25rem;
      }
      .title-source-field-label {
        font-size: var(--fz-sm); font-weight: 600; color: var(--t4);
        text-transform: uppercase; letter-spacing: 0.5px;
      }
      .title-mode-header {
        display: flex; align-items: center; gap: 0.375rem;
      }
      .title-mode-header .drag-handle {
        cursor: grab; opacity: 0.4; display: flex; align-items: center;
        --mdc-icon-size: 1rem;
      }
      .title-mode-header .drag-handle:hover { opacity: 0.7; }
      .title-mode-id {
        flex: 1;
        font-size: var(--fz-sm); font-weight: 700; color: var(--t3);
        text-transform: uppercase; letter-spacing: 0.5px;
      }
      .title-color-row {
        display: flex; align-items: center; gap: 0.5rem;
      }
      .title-color-label {
        font-size: var(--fz-sm); color: var(--t4); white-space: nowrap;
      }
      .title-color-chips {
        display: flex; gap: 0.375rem; align-items: center;
      }
      .title-color-chip {
        width: 1.25rem; height: 1.25rem; border-radius: 50%;
        border: 2px solid transparent; cursor: pointer;
        transition: transform var(--t-fast), border-color var(--t-fast); outline: none;
      }
      @media (hover: hover) and (pointer: fine) {
        .title-color-chip:hover { transform: scale(1.1); }
      }
      @media (pointer: coarse) {
        .title-color-chip:active { animation: bounce 0.3s ease; }
      }
      .title-color-chip.neutral { background: var(--t4); }
      .title-color-chip.success { background: var(--c-success); }
      .title-color-chip.warning { background: var(--c-warning); }
      .title-color-chip.info { background: var(--c-info); }
      .title-color-chip.accent { background: var(--c-accent); }
      .title-color-chip.alert { background: var(--c-alert); }
      .title-color-chip.active { border-color: var(--t1); transform: scale(1.15); }

      /* ── Title mode icon picker ── */
      .title-mode-fields-row {
        display: flex; gap: 0.5rem; align-items: center;
      }
      .title-mode-fields-row .input { flex: 1; min-width: 0; }
      .title-icon-btn {
        width: 2.75rem; align-self: stretch; flex-shrink: 0;
        border-radius: var(--radius-lg); border: 1px solid var(--b2);
        background: var(--s1); cursor: pointer; outline: none;
        display: flex; align-items: center; justify-content: center;
        padding: 0; font-family: inherit;
        transition: background var(--t-fast), border-color var(--t-fast);
      }
      .title-icon-btn ha-icon {
        --mdc-icon-size: 1.25rem;
        color: var(--t3);
        display: flex; align-items: center; justify-content: center;
      }
      .title-icon-btn.has-icon { border-color: var(--b3); }
      .title-icon-btn.has-icon ha-icon { color: var(--t1); }
      @media (hover: hover) and (pointer: fine) {
        .title-icon-btn:hover { background: var(--s3); border-color: var(--b3); }
      }
      @media (pointer: coarse) {
        .title-icon-btn:active { animation: bounce 0.3s ease; }
      }
      .title-icon-btn:focus-visible {
        outline: 2px solid var(--c-accent); outline-offset: -2px;
      }

      /* ── Icon picker popup (glass) ── */
      .icon-popup-overlay {
        position: absolute; inset: 0; z-index: 10000;
        background: rgba(var(--rgb-black), 0.5);
        display: flex; align-items: center; justify-content: center;
        padding: 1.5rem;
        animation: fade-in 0.15s ease-out;
      }
      @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
      .icon-popup {
        width: 100%; max-width: 25rem; max-height: 70vh;
        display: flex; flex-direction: column;
        border-radius: var(--radius-xl);
        background: linear-gradient(135deg, #1a2233 0%, #141c2a 50%, #172030 100%);
        box-shadow: inset 0 1px 0 0 rgba(var(--rgb-white),0.1), 0 8px 32px rgba(var(--rgb-black),0.4), 0 2px 8px rgba(var(--rgb-black),0.25);
        border: 1px solid var(--b2);
        overflow: hidden;
        animation: popup-in 0.2s var(--ease-out);
      }
      @keyframes popup-in { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
      .icon-popup-header {
        padding: 0.75rem 1rem 0.5rem;
        display: flex; flex-direction: column; gap: 0.5rem;
        border-bottom: 0.0625rem solid var(--b1);
      }
      .icon-popup-title {
        font-size: var(--fz-base); font-weight: 600; text-transform: uppercase;
        letter-spacing: 1px; color: var(--t3);
      }
      .icon-popup-search {
        width: 100%; padding: 0.5rem 0.75rem; border-radius: var(--radius-lg);
        border: 1px solid var(--b2); background: var(--s1);
        color: var(--t1); font-family: inherit; font-size: var(--fz-md);
        outline: none; transition: border-color var(--t-fast);
        box-sizing: border-box;
      }
      .icon-popup-search:focus { border-color: var(--b3); }
      .icon-popup-search::placeholder { color: var(--t4); }
      .icon-popup-grid-wrap {
        flex: 1; overflow-y: auto; padding: 0.5rem;
        scrollbar-width: none;
      }
      .icon-popup-grid-wrap::-webkit-scrollbar { display: none; }
      .icon-popup-grid {
        display: grid; grid-template-columns: repeat(6, 1fr);
        gap: 0.25rem;
      }
      .icon-popup-grid .icon-pick {
        aspect-ratio: 1; width: 100%;
        display: flex; align-items: center; justify-content: center;
      }
      .icon-popup-grid .icon-pick ha-icon {
        display: flex; align-items: center; justify-content: center;
      }
      .icon-popup-empty {
        padding: 1.5rem; text-align: center;
        font-size: var(--fz-base); color: var(--t4);
      }

      /* ── Presence mapping cards ── */
      .presence-mapping-card {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
        margin-top: 0.5rem;
        padding: 0.75rem;
        background: var(--s2);
        border-radius: var(--radius-md);
        border: 1px solid var(--b1);
      }
      .presence-mapping-card .presence-mapping-field .dropdown {
        margin-bottom: 0;
      }
      .presence-mapping-card .presence-mapping-field .dropdown-trigger {
        padding: 0.375rem 0.625rem;
        font-size: var(--fz-sm);
      }
      .presence-mapping-header {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }
      .presence-mapping-header .feature-icon {
        width: 1.75rem;
        height: 1.75rem;
      }
      .presence-mapping-label {
        display: block;
        font-size: var(--fz-base);
        color: var(--t3);
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
      .presence-mapping-field select.input {
        width: 100%;
      }

      /* ── Light row extras ── */
      .light-state {
        display: flex;
        align-items: center;
        gap: 0.25rem;
        margin-left: auto;
        flex-shrink: 0;
      }
      .light-dot {
        width: 0.375rem;
        height: 0.375rem;
        border-radius: 50%;
        background: var(--t4);
      }
      .light-dot.on {
        background: var(--c-light-glow);
        box-shadow: 0 0 6px rgba(var(--rgb-light-glow), 0.5);
      }
      .light-brightness {
        font-size: var(--fz-xs);
        font-weight: 600;
        color: var(--t3);
        min-width: 1.75rem;
        text-align: right;
      }
      .layout-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        height: 1.5rem;
        padding: 0 0.5rem;
        border-radius: var(--radius-sm);
        border: 1px solid var(--b2);
        background: var(--s1);
        color: var(--t3);
        font-family: inherit;
        font-size: var(--fz-xxs);
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.8px;
        cursor: pointer;
        transition:
          background var(--t-fast),
          color var(--t-fast),
          border-color var(--t-fast);
        outline: none;
        flex-shrink: 0;
        -webkit-tap-highlight-color: transparent;
      }
      @media (hover: hover) and (pointer: fine) {
        .layout-btn:hover {
          background: var(--s3);
          color: var(--t2);
          border-color: var(--b3);
        }
      }
      @media (pointer: coarse) {
        .layout-btn:active { animation: bounce 0.3s ease; }
      }
      .layout-btn:focus-visible {
        outline: 2px solid var(--c-accent);
        outline-offset: 2px;
      }

      /* ── Schedule button (btn-icon.xs pattern from kit) ── */
      .schedule-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 1.75rem;
        height: 1.75rem;
        border-radius: var(--radius-sm);
        border: 1px solid transparent;
        background: transparent;
        color: var(--t4);
        cursor: pointer;
        flex-shrink: 0;
        padding: 0;
        transition: background var(--t-fast), border-color var(--t-fast), color var(--t-fast);
        outline: none;
        -webkit-tap-highlight-color: transparent;
        --mdc-icon-size: 1rem;
      }
      .schedule-btn.active {
        color: var(--c-accent);
        border-color: rgba(var(--rgb-accent),0.25);
        background: rgba(var(--rgb-accent),0.12);
      }
      @media (hover: hover) and (pointer: fine) {
        .schedule-btn:hover {
          background: var(--s4);
          border-color: var(--b3);
          color: var(--t1);
        }
      }
      @media (hover: hover) and (pointer: fine) {
        .schedule-btn:active { transform: scale(0.96); }
      }
      @media (pointer: coarse) {
        .schedule-btn:active { animation: bounce 0.3s ease; }
      }
      .schedule-btn:focus-visible {
        outline: 2px solid var(--c-accent);
        outline-offset: 2px;
      }

      /* ── Schedule fold (CSS Grid 0fr/1fr from kit) ── */
      .schedule-fold {
        display: grid;
        grid-template-rows: 0fr;
        transition: grid-template-rows var(--t-layout);
      }
      .schedule-fold.open {
        grid-template-rows: 1fr;
      }
      .schedule-fold-inner {
        overflow: hidden;
        opacity: 0;
        transition: opacity var(--t-fast);
      }
      .schedule-fold.open .schedule-fold-inner {
        opacity: 1;
        transition-delay: 0.1s;
      }
      .schedule-body {
        padding: 0.5rem 0.75rem 0.75rem 2.25rem;
      }
      .schedule-header {
        font-size: var(--fz-sm);
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 1px;
        color: var(--t3);
        margin-bottom: 0.5rem;
      }
      .schedule-period {
        padding: 0.5rem 0;
        border-bottom: 0.0625rem solid var(--b1);
      }
      .schedule-period:last-of-type {
        border-bottom: none;
      }
      .schedule-row {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-bottom: 0.375rem;
      }
      .schedule-row-actions {
        justify-content: space-between;
        margin-bottom: 0;
      }
      .schedule-label {
        font-size: var(--fz-base);
        font-weight: 500;
        color: var(--t3);
        min-width: 2.25rem;
        flex-shrink: 0;
      }
      /* ── Input (from kit) ── */
      .input {
        width: 100%;
        padding: 0.5rem 0.75rem;
        border-radius: var(--radius-lg);
        border: 1px solid var(--b2);
        background: var(--s1);
        color: var(--t1);
        font-family: inherit;
        font-size: var(--fz-md);
        outline: none;
        transition: border-color var(--t-fast);
      }
      .input:focus { border-color: var(--b3); }
      .input::placeholder { color: var(--t4); }
      /* schedule-input removed — replaced by .datetime-display */

      /* ── Check item (from kit) ── */
      .check-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0;
        background: none;
        border: none;
        cursor: pointer;
        outline: none;
        font-family: inherit;
      }
      .check-box {
        width: 1.125rem;
        height: 1.125rem;
        border-radius: 4px;
        border: 2px solid var(--b3);
        background: transparent;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background var(--t-fast), border-color var(--t-fast), box-shadow var(--t-fast);
        flex-shrink: 0;
        --mdc-icon-size: 0.75rem;
      }
      .check-box ha-icon {
        opacity: 0;
        transform: scale(0);
        transition: opacity var(--t-fast), transform var(--t-fast);
        color: #fff;
      }
      .check-item.checked .check-box {
        background: var(--c-accent);
        border-color: var(--c-accent);
        box-shadow: 0 0 6px rgba(var(--rgb-accent),0.3);
      }
      .check-item.checked .check-box ha-icon {
        opacity: 1;
        transform: scale(1);
      }
      .check-label {
        font-size: var(--fz-base);
        font-weight: 500;
        color: var(--t2);
      }
      .check-desc {
        display: block;
        font-size: var(--fz-xs);
        color: var(--t4);
        margin-top: 0.0625rem;
        font-weight: 400;
      }
      .check-item.checked .check-label {
        color: var(--t1);
      }

      /* ── Schedule delete (btn-icon.xs btn-alert from kit) ── */
      .schedule-delete {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 1.75rem;
        height: 1.75rem;
        border-radius: var(--radius-sm);
        border: 1px solid rgba(var(--rgb-alert),0.2);
        background: rgba(var(--rgb-alert),0.1);
        color: var(--c-alert);
        cursor: pointer;
        padding: 0;
        --mdc-icon-size: 0.875rem;
        transition: background var(--t-fast), border-color var(--t-fast);
        outline: none;
      }
      @media (hover: hover) and (pointer: fine) {
        .schedule-delete:hover {
          background: rgba(var(--rgb-alert),0.2);
          border-color: rgba(var(--rgb-alert),0.3);
        }
      }
      @media (hover: hover) and (pointer: fine) {
        .schedule-delete:active { transform: scale(0.96); }
      }
      @media (pointer: coarse) {
        .schedule-delete:active { animation: bounce 0.3s ease; }
      }

      /* ── Schedule add & save (btn btn-sm from kit) ── */
      .schedule-add {
        width: 100%;
        margin-top: 0.5rem;
        border-style: dashed;
        --mdc-icon-size: 0.875rem;
      }
      .schedule-save {
        margin-top: 0.5rem;
        width: 100%;
      }

      /* ── Hint & explanation texts ── */
      .schedule-hint,
      .dashboard-vs-room {
        display: flex;
        align-items: flex-start;
        gap: 0.375rem;
        margin-top: 0.75rem;
        padding: 0.5rem 0.5rem;
        background: var(--s1);
        border-radius: var(--radius-sm);
        border: 1px solid var(--b1);
        font-size: var(--fz-base);
        line-height: 1.4;
        color: var(--t3);
        --mdc-icon-size: 0.875rem;
      }
      .schedule-hint ha-icon,
      .dashboard-vs-room ha-icon {
        flex-shrink: 0;
        margin-top: 0.0625rem;
        color: var(--c-info);
        display: flex; align-items: center; justify-content: center;
      }

      /* ── DateTime display trigger ── */
      .datetime-display {
        flex: 1;
        min-width: 0;
        padding: 0.375rem 0.5rem;
        border-radius: var(--radius-md);
        border: 1px solid var(--b2);
        background: var(--s1);
        color: var(--t2);
        font-family: inherit;
        font-size: var(--fz-base);
        font-weight: 500;
        cursor: pointer;
        transition: border-color var(--t-fast);
        text-align: left;
        outline: none;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      @media (hover: hover) and (pointer: fine) {
        .datetime-display:hover { border-color: var(--b3); }
      }
      @media (pointer: coarse) {
        .datetime-display:active { animation: bounce 0.3s ease; }
      }
      .datetime-display:focus-visible {
        outline: 2px solid var(--c-accent);
        outline-offset: 2px;
      }
      .datetime-display.empty { color: var(--t4); }

      /* ── DateTime picker popup ── */
      .picker-overlay {
        position: absolute;
        inset: 0;
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(var(--rgb-black),0.5);
        backdrop-filter: blur(4px);
        animation: picker-fade-in var(--t-fast) ease-out;
      }
      @keyframes picker-fade-in {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      .picker-popup {
        width: 17.5rem;
        padding: 1rem;
        border-radius: var(--radius-lg);
        border: 1px solid var(--b2);
        background: var(--s3);
        box-shadow: 0 8px 32px rgba(var(--rgb-black),0.4);
      }
      .picker-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 0.25rem 0.625rem;
      }
      .picker-month {
        font-size: var(--fz-md);
        font-weight: 700;
        color: var(--t1);
      }
      .picker-nav {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 1.75rem;
        height: 1.75rem;
        border-radius: var(--radius-sm);
        border: none;
        background: transparent;
        color: var(--t3);
        cursor: pointer;
        padding: 0;
        outline: none;
        transition: background var(--t-fast), color var(--t-fast);
        --mdc-icon-size: 1rem;
        position: relative;
      }
      .picker-nav::before {
        content: '';
        position: absolute;
        inset: -0.5rem;
      }
      @media (hover: hover) and (pointer: fine) {
        .picker-nav:hover { background: var(--s2); color: var(--t1); }
      }
      @media (pointer: coarse) {
        .picker-nav:active { animation: bounce 0.3s ease; }
      }
      .picker-nav:focus-visible {
        outline: 2px solid var(--c-accent);
        outline-offset: 2px;
      }
      .picker-grid {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        gap: 0.125rem;
      }
      .picker-day-label {
        font-size: var(--fz-xs);
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        color: var(--t4);
        text-align: center;
        padding: 0.25rem 0;
      }
      .picker-day {
        aspect-ratio: 1;
        border-radius: var(--radius-sm);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: var(--fz-base);
        font-weight: 500;
        color: var(--t3);
        background: transparent;
        border: none;
        cursor: pointer;
        transition: background var(--t-fast), color var(--t-fast);
        outline: none;
        font-family: inherit;
        padding: 0;
      }
      @media (hover: hover) and (pointer: fine) {
        .picker-day:hover { background: var(--s2); color: var(--t1); }
      }
      @media (pointer: coarse) {
        .picker-day:active { animation: bounce 0.3s ease; }
      }
      .picker-day.today { border: 1px solid var(--b3); color: var(--t1); }
      .picker-day.selected {
        background: rgba(var(--rgb-accent),0.2);
        color: var(--c-accent);
        font-weight: 700;
        border: 1px solid rgba(var(--rgb-accent),0.3);
      }
      .picker-day.range-start {
        background: var(--c-accent);
        color: #fff;
        font-weight: 700;
        border-radius: var(--radius-sm) 0 0 var(--radius-sm);
      }
      .picker-day.range-end {
        background: var(--c-accent);
        color: #fff;
        font-weight: 700;
        border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
      }
      .picker-day.range-start.range-end {
        border-radius: var(--radius-sm);
      }
      .picker-day.in-range {
        background: rgba(var(--rgb-accent),0.12);
        color: var(--c-accent);
        border-radius: 0;
      }
      .picker-day.other-month { opacity: 0.3; }

      /* ── Picker phase indicator ── */
      .picker-phase {
        display: flex;
        justify-content: center;
        gap: 0.5rem;
        margin-bottom: 0.5rem;
      }
      .picker-phase-btn {
        padding: 0.25rem 0.75rem;
        border-radius: var(--radius-sm);
        border: 1px solid var(--b1);
        background: transparent;
        color: var(--t3);
        font-family: inherit;
        font-size: var(--fz-base);
        font-weight: 600;
        cursor: pointer;
        transition: background var(--t-fast), border-color var(--t-fast), color var(--t-fast);
        outline: none;
      }
      .picker-phase-btn.active {
        background: rgba(var(--rgb-accent),0.15);
        color: var(--c-accent);
        border-color: rgba(var(--rgb-accent),0.3);
      }

      /* ── Time picker ── */
      .picker-time-row {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        margin-top: 1rem;
        padding-top: 0.75rem;
        border-top: 0.0625rem solid var(--b1);
      }
      .picker-time-group {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.25rem;
      }
      .picker-time-label {
        font-size: var(--fz-xs);
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        color: var(--t4);
      }
      .time-input {
        display: flex;
        align-items: center;
        gap: 0.25rem;
      }
      .time-digit {
        width: 2.75rem;
        height: 2.5rem;
        text-align: center;
        border-radius: var(--radius-md);
        border: 1px solid var(--b2);
        background: var(--s1);
        color: var(--t1);
        font-family: inherit;
        font-size: var(--fz-lg);
        font-weight: 700;
        outline: none;
        transition: border-color var(--t-fast);
      }
      .time-digit:focus { border-color: var(--c-accent); }
      .time-sep {
        font-size: var(--fz-xl);
        font-weight: 700;
        color: var(--t3);
      }

      /* ── Picker confirm button ── */
      .picker-confirm {
        margin-top: 1rem;
        width: 100%;
      }

      /* ══════════════════════════════════════
         Cover entity presets (from prototype)
         ══════════════════════════════════════ */

      /* ── Item fold separator ── */
      .item-fold-sep {
        height: 1px;
        background: linear-gradient(90deg, transparent, rgba(167, 139, 250, 0.3), transparent);
        opacity: 0;
        transition: opacity 0.35s var(--ease-out, cubic-bezier(0.16, 1, 0.3, 1));
        margin: 0 0.75rem;
      }
      .item-fold-sep.visible { opacity: 1; }

      /* ── Entity presets fold ── */
      .entity-presets-fold {
        display: grid;
        grid-template-rows: 0fr;
        transition: grid-template-rows 0.35s var(--ease-out, cubic-bezier(0.16, 1, 0.3, 1));
      }
      .entity-presets-fold.open {
        grid-template-rows: 1fr;
      }
      .entity-presets-fold-inner {
        overflow: hidden;
        opacity: 0;
        transition: opacity var(--t-fast);
      }
      .entity-presets-fold.open .entity-presets-fold-inner {
        opacity: 1;
        transition-delay: 0.1s;
      }
      .entity-presets-content {
        padding: 0.5rem 0.75rem 0.75rem 2.25rem;
        margin: 0 4px 6px;
        background: rgba(167, 139, 250, 0.03);
        border-radius: 0 0 var(--radius-sm) var(--radius-sm);
      }
      .entity-presets-label {
        font-size: 9px;
        font-weight: 600;
        color: var(--t4);
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin-bottom: 0.5rem;
      }

      /* ── Preset chips ── */
      .preset-chips {
        display: flex;
        flex-wrap: wrap;
        gap: 0.375rem;
        align-items: center;
      }
      .preset-chip {
        display: inline-flex;
        align-items: center;
        gap: 0.25rem;
        padding: 0.25rem 0.75rem;
        border-radius: var(--radius-md);
        border: 1px solid var(--b2);
        background: var(--s1);
        font-size: 11px;
        font-weight: 600;
        color: var(--t2);
      }
      .preset-chip ha-icon { --mdc-icon-size: 14px; display: flex; align-items: center; justify-content: center; }
      .preset-chip.small {
        padding: 0.25rem 0.5rem;
        font-size: 10px;
      }
      .preset-chip.small ha-icon { --mdc-icon-size: 12px; }
      .preset-chip.custom {
        border-color: rgba(167, 139, 250, 0.2);
        background: rgba(167, 139, 250, 0.05);
        color: var(--c-accent);
      }
      .preset-chip-remove {
        background: none;
        border: none;
        cursor: pointer;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--t4);
        transition: color var(--t-fast);
        outline: none;
      }
      @media (hover: hover) and (pointer: fine) {
        .preset-chip-remove:hover { color: var(--c-alert); }
      }
      .preset-chip-remove ha-icon { --mdc-icon-size: 12px; display: flex; align-items: center; justify-content: center; }

      /* ── Preset add ── */
      .preset-add {
        display: inline-flex;
        align-items: center;
        gap: 0.25rem;
        margin-top: 0.5rem;
      }
      .preset-input {
        width: 56px;
        padding: 0.25rem 0.5rem;
        border-radius: var(--radius-sm);
        border: 1px solid var(--b2);
        background: var(--s1);
        color: var(--t1);
        font-family: inherit;
        font-size: 11px;
        outline: none;
        transition: border-color var(--t-fast);
      }
      .preset-input:focus { border-color: var(--b3); }
      .preset-input::placeholder { color: var(--t4); }
      .preset-input.small { width: 44px; font-size: 10px; padding: 0.25rem 0.375rem; }
      .preset-add-btn {
        display: inline-flex;
        align-items: center;
        gap: 0.25rem;
        padding: 0.25rem 0.5rem;
        border-radius: var(--radius-md);
        border: 1px solid rgba(167, 139, 250, 0.3);
        background: rgba(167, 139, 250, 0.1);
        font-family: inherit;
        font-size: 11px;
        font-weight: 600;
        color: var(--c-accent);
        cursor: pointer;
        transition: background var(--t-fast), border-color var(--t-fast);
        outline: none;
      }
      @media (hover: hover) and (pointer: fine) {
        .preset-add-btn:hover {
          background: rgba(167, 139, 250, 0.18);
          border-color: rgba(167, 139, 250, 0.4);
        }
      }
      .preset-add-btn ha-icon { --mdc-icon-size: 14px; display: flex; align-items: center; justify-content: center; }
      .preset-add-btn.small { font-size: 10px; padding: 0.125rem 0.375rem; }
      .preset-add-btn.small ha-icon { --mdc-icon-size: 12px; }
      .preset-reset-btn {
        display: inline-flex;
        align-items: center;
        gap: 0.125rem;
        padding: 0.125rem 0.375rem;
        border-radius: var(--radius-md);
        border: 1px solid var(--b2);
        background: var(--s1);
        font-family: inherit;
        font-size: 9px;
        font-weight: 600;
        color: var(--t4);
        cursor: pointer;
        transition: background var(--t-fast), border-color var(--t-fast), color var(--t-fast);
        outline: none;
      }
      @media (hover: hover) and (pointer: fine) {
        .preset-reset-btn:hover {
          background: var(--s3);
          color: var(--t3);
          border-color: var(--b3);
        }
      }
      .preset-reset-btn ha-icon { --mdc-icon-size: 12px; display: flex; align-items: center; justify-content: center; }

      /* ── Presets expand button (cover-specific) ── */
      .presets-btn {
        width: 26px;
        height: 26px;
        border-radius: var(--radius-sm);
        border: 1px solid var(--b2);
        background: var(--s1);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: background var(--t-fast), border-color var(--t-fast);
        outline: none;
        flex-shrink: 0;
        padding: 0;
        --mdc-icon-size: 14px;
        position: relative;
      }
      .presets-btn::before {
        content: '';
        position: absolute;
        inset: -0.5rem;
      }
      .presets-btn ha-icon { display: flex; align-items: center; justify-content: center; color: var(--t3); }
      @media (hover: hover) and (pointer: fine) {
        .presets-btn:hover {
          background: var(--s3);
          border-color: var(--b3);
        }
      }
      .presets-btn.active {
        background: rgba(167, 139, 250, 0.08);
        border-color: rgba(167, 139, 250, 0.2);
      }
      .presets-btn.active ha-icon { color: var(--c-purple, #a78bfa); }
      @media (pointer: coarse) {
        .presets-btn:active { animation: bounce 0.3s ease; }
      }
      .presets-btn:focus-visible {
        outline: 2px solid var(--c-accent);
        outline-offset: 2px;
      }

      /* ── Unassigned / Orphan entities ── */
      .pw-ua-icon-btn {
        flex-shrink: 0;
        width: 1.75rem;
        height: 1.75rem;
        border-radius: var(--radius-sm);
        border: 1px solid var(--b2);
        background: var(--s1);
        padding: 0;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background var(--t-fast), border-color var(--t-fast);
      }
      .pw-ua-icon-btn:hover { background: var(--s3); border-color: var(--b3); }
      .pw-ua-icon-btn ha-icon { --mdc-icon-size: 14px; color: var(--t3); }

      .pw-ua-name {
        cursor: pointer;
        background: none; border: none; padding: 0;
        font-family: inherit;
        font-size: var(--fz-sm);
        font-weight: 600;
        color: var(--t2);
        text-align: left;
        line-height: 1.2;
        outline: none; -webkit-tap-highlight-color: transparent;
      }
      .pw-ua-name:hover { color: var(--t1); }
      .pw-ua-name:focus-visible { outline: 2px solid var(--c-accent); outline-offset: 2px; border-radius: 4px; }

      .pw-ua-card { overflow: visible; }
      .pw-ua-area-dropdown {
        width: auto;
        margin: 0 0.75rem 0.5rem;
        margin-bottom: 0.5rem;
      }
      .pw-ua-area-trigger {
        width: 100%;
        padding: 0.375rem 0.75rem;
        font-size: var(--fz-sm);
        gap: 0.375rem;
        border-radius: var(--radius-md);
      }
      .pw-ua-area-trigger .pw-ua-area-icon {
        --mdc-icon-size: 14px;
        opacity: 0.5;
      }
      .pw-ua-area-trigger.pw-ua-unassigned {
        color: var(--c-warning);
        border-color: rgba(var(--rgb-warning), 0.2);
      }
      .pw-ua-area-trigger.pw-ua-unassigned .pw-ua-area-icon {
        color: var(--c-warning);
        opacity: 0.7;
      }

      /* ── Responsive breakpoints ── */
      @media (min-width: 1024px) {
        .icon-picker-grid {
          grid-template-columns: repeat(10, 1fr);
        }
      }
      @media (min-width: 1440px) {
        .icon-picker-grid {
          grid-template-columns: repeat(12, 1fr);
        }
      }
`;
