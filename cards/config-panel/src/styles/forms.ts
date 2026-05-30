import { css } from 'lit';

/**
 * Form element styles: dropdowns, icon pickers, chips, title config,
 * title mode icon picker, icon picker popup, light row extras,
 * schedule styles, inputs, check items, datetime picker, presence mapping,
 * hint texts.
 */
export const formStyles = css`
      /* Dropdown styles now provided by <glass-dropdown> (ui-core).
         Pattern: <glass-dropdown .items .value icon label searchable
         search-placeholder empty-text @glass-dropdown-change>. */

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

      /* Chip styles now live in <glass-chip> (ui-core).
         Pattern: <glass-chip size="sm" active-color="..." ?active>label</glass-chip> */

      /* ── Title config styles ── */
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
      .title-mode-header glass-drag-handle { opacity: 0.4; }
      .title-mode-header glass-drag-handle:hover { opacity: 0.7; }
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
      .presence-mapping-card .presence-mapping-field glass-dropdown {
        margin-bottom: 0;
      }
      .presence-mapping-card .presence-mapping-field glass-dropdown::part(trigger) {
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
      /* .schedule-btn styles now provided by <glass-icon-button size="xs"
         active-color="accent"> — see tabs/light.ts. */

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
      .cycle-interval-input {
        width: 3.75rem;
        text-align: center;
      }
      /* Per-camera aspect-ratio picker — glass-dropdown sits at the row end.
         Fixed width keeps a clean column; longest label "Auto (détection)". */
      .item-row .aspect-dropdown {
        flex: 0 0 auto;
        width: 12rem;
      }
      /* The wrapping .item-card defaults to overflow:hidden (rounded clip for
         draggable rows). The aspect rows host an open dropdown menu, which that
         clip would cut off — so opt these cards out. */
      .item-card.aspect-card {
        overflow: visible;
      }
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

      /* .schedule-delete styles now provided by <glass-icon-button
         size="xs" active active-color="alert"> — see tabs/light.ts. */

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
      .schedule-hint {
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
      .schedule-hint ha-icon {
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
      .preset-add-btn:disabled {
        opacity: 0.4;
        cursor: not-allowed;
        pointer-events: none;
      }
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
      /* .presets-btn styles now provided by glass-icon-button size=xs,
         active-color=purple, ?active. See tabs/cover.ts for usage. */

      /* ── Unassigned / Orphan entities ── */
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
        --mdc-icon-color: var(--t3);
        opacity: 0.7;
      }
      .pw-ua-area-trigger.pw-ua-unassigned {
        color: var(--c-warning);
        border-color: rgba(var(--rgb-warning), 0.2);
      }
      .pw-ua-area-trigger.pw-ua-unassigned .pw-ua-area-icon {
        --mdc-icon-color: var(--c-warning);
        opacity: 1;
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

      /* ═══════════════════════════════════════════════
         TITLE TAB — specific styles
         (generic .cfg-section* layout lives in styles/sections.ts)
         ═══════════════════════════════════════════════ */

      /* ── Title text input + char counter ── */
      .title-text-field {
        position: relative;
        display: flex;
        align-items: center;
      }
      .title-text-field .input { padding-right: 3.5rem; }
      .title-text-count {
        position: absolute;
        right: 0.75rem;
        font-size: var(--fz-xxs);
        font-weight: 600;
        color: var(--t4);
        font-variant-numeric: tabular-nums;
        pointer-events: none;
        letter-spacing: 0.5px;
      }
      .title-text-count.warn { color: var(--c-warning); }

      /* ─────────────────────────────────────────────
         PERIOD — chip row + inline editor
         ───────────────────────────────────────────── */

      .title-period-head {
        display: flex;
        flex-direction: column;
        gap: 0.125rem;
        margin-top: 0.875rem;
        margin-bottom: 0.5rem;
      }
      .title-period-head-label {
        font-size: var(--fz-xs);
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 1.2px;
        color: var(--t4);
      }
      .title-period-head-desc {
        font-size: var(--fz-sm);
        color: var(--t3);
      }

      .title-period-empty {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.875rem 1rem;
        margin-top: 0.875rem;
        border: 1px dashed var(--b2);
        border-radius: var(--radius-md);
        color: var(--t3);
      }
      .title-period-empty ha-icon {
        --mdc-icon-size: 1.25rem;
        --mdc-icon-color: var(--t4);
        flex-shrink: 0;
      }
      .title-period-empty-text {
        display: flex; flex-direction: column; gap: 0.125rem;
      }
      .title-period-empty-text strong {
        font-size: var(--fz-sm);
        color: var(--t2);
        font-weight: 600;
      }
      .title-period-empty-text span {
        font-size: var(--fz-xs);
        color: var(--t4);
      }

      /* Horizontal chip row */
      .title-period-chips-row {
        display: flex;
        flex-wrap: wrap;
        gap: 0.375rem;
      }
      .title-period-chip {
        position: relative;
        display: inline-flex;
        align-items: center;
        gap: 0.4375rem;
        padding: 0.4375rem 0.75rem 0.4375rem 0.5rem;
        background: var(--s1);
        border: 1px solid var(--b2);
        border-radius: var(--radius-full);
        cursor: pointer;
        font-family: inherit;
        font-size: var(--fz-base);
        font-weight: 600;
        color: var(--t2);
        outline: none;
        transition:
          background var(--t-fast),
          border-color var(--t-fast),
          color var(--t-fast),
          box-shadow var(--t-fast);
        -webkit-tap-highlight-color: transparent;
      }
      .title-period-chip:focus-visible {
        outline: 2px solid rgba(var(--rgb-white), 0.25);
        outline-offset: 2px;
      }
      .title-period-chip-icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 1.25rem; height: 1.25rem;
        border-radius: 50%;
        background: color-mix(in srgb, var(--chip-tint, var(--t4)) 14%, transparent);
        color: var(--chip-tint, var(--t3));
        flex-shrink: 0;
      }
      .title-period-chip-icon ha-icon {
        --mdc-icon-size: 0.875rem;
        --mdc-icon-color: currentColor;
        color: currentColor;
      }
      @media (hover: hover) and (pointer: fine) {
        .title-period-chip:hover {
          background: var(--s2);
          border-color: var(--b3);
          color: var(--t1);
        }
      }
      .title-period-chip.editing {
        background: color-mix(in srgb, var(--chip-tint, var(--c-accent)) 12%, var(--s2));
        border-color: var(--chip-tint, var(--c-accent));
        color: var(--t1);
        box-shadow: 0 0 0 1px var(--chip-tint, var(--c-accent));
      }
      .title-period-chip.live .title-period-chip-live-dot {
        position: absolute;
        top: 0.1875rem; right: 0.1875rem;
        width: 0.375rem; height: 0.375rem;
        border-radius: 50%;
        background: var(--c-success);
        box-shadow: 0 0 0.25rem rgba(var(--rgb-success), 0.6);
      }

      /* Inline period editor (slides under the chip row) */
      .title-period-editor {
        margin-top: 0.625rem;
        padding: 0.875rem;
        background: rgba(var(--rgb-black), 0.18);
        border: 1px solid var(--b2);
        border-radius: var(--radius-lg);
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
      }
      .title-period-editor-head {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }
      .title-period-editor-icon {
        --mdc-icon-size: 1.125rem;
        flex-shrink: 0;
      }
      .title-period-editor-name {
        flex: 1; min-width: 0;
        font-size: var(--fz-md);
        font-weight: 600;
        color: var(--t1);
      }
      .title-period-editor-field {
        display: flex;
        align-items: center;
        gap: 0.625rem;
      }
      .title-period-editor-field-label {
        font-size: var(--fz-xxs);
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 1px;
        color: var(--t4);
        width: 3rem;
        flex-shrink: 0;
      }
      .title-period-editor-nav {
        display: flex;
        justify-content: space-between;
        padding-top: 0.25rem;
        border-top: 1px solid var(--b1);
      }
      .title-period-editor-nav .btn-link {
        display: inline-flex;
        align-items: center;
        gap: 0.25rem;
        background: none;
        border: none;
        color: var(--t3);
        font-family: inherit;
        font-size: var(--fz-sm);
        font-weight: 600;
        cursor: pointer;
        padding: 0.375rem 0.5rem;
        border-radius: var(--radius-sm);
        outline: none;
        transition: background var(--t-fast), color var(--t-fast);
      }
      .title-period-editor-nav .btn-link ha-icon {
        --mdc-icon-size: 1rem;
        --mdc-icon-color: currentColor;
      }
      .title-period-editor-nav .btn-link:hover {
        background: var(--s2);
        color: var(--t1);
      }

      /* ─────────────────────────────────────────────
         COLOR SWATCHES — larger, labelled, clear selected
         ───────────────────────────────────────────── */

      .title-color-swatches {
        display: inline-flex;
        gap: 0.3125rem;
        flex-wrap: wrap;
      }
      /* .title-color-swatch styles now provided by glass-color-swatch
         with-check, .color=var(--c-tone), and ?selected.
         See tabs/title.ts for usage. */
`;
