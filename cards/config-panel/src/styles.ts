import { css, type CSSResult } from 'lit';

export const configPanelStyles: CSSResult = css`
      *, *::before, *::after {
        box-sizing: border-box;
      }
      :host {
        display: block;
        font-family: 'Plus Jakarta Sans', sans-serif;
        min-height: 100vh;
        padding: 32px 16px 48px;
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
        width: 600px;
        height: 600px;
        top: -200px;
        right: -100px;
        background: var(--ambient-blob-top, #2d4a8a);
      }
      .ambient-bg::after {
        width: 500px;
        height: 500px;
        bottom: -150px;
        left: -100px;
        background: var(--ambient-blob-bottom, #3a2d6b);
      }

      /* ── Layout ── */
      .page-wrap {
        max-width: 440px;
        margin: 0 auto;
      }

      /* ── Header ── */
      .page-header {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 16px;
      }
      .page-back {
        width: 32px;
        height: 32px;
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
      @media (hover: none) {
        .page-back:active { animation: bounce 0.3s ease; }
      }
      .page-back:focus-visible {
        outline: 2px solid var(--c-accent);
        outline-offset: 2px;
      }
      .page-back ha-icon {
        --mdc-icon-size: 18px;
        display: flex; align-items: center; justify-content: center;
      }
      .page-title {
        font-size: 16px;
        font-weight: 700;
        color: var(--t1);
        letter-spacing: -0.3px;
      }
      .page-subtitle {
        font-size: 10px;
        font-weight: 500;
        color: var(--t4);
        margin-left: auto;
        text-transform: uppercase;
        letter-spacing: 0.8px;
      }

      /* ── Panel ── */
      .config-panel {
        padding: 16px;
      }

      /* ── Tabs ── */
      /* ── Tab Select ── */
      .tab-select-wrap {
        position: relative;
        width: 100%;
        margin-bottom: 16px;
      }
      .tab-select-trigger {
        display: flex;
        align-items: center;
        gap: 10px;
        width: 100%;
        padding: 10px 14px;
        border-radius: 12px;
        border: 1px solid var(--b2);
        background: var(--s1);
        color: var(--t2);
        font-family: inherit;
        font-size: 13px;
        font-weight: 500;
        cursor: pointer;
        outline: none;
        transition: border-color var(--t-fast);
      }
      .tab-select-trigger:focus,
      .tab-select-wrap.open .tab-select-trigger {
        border-color: var(--b3);
      }
      .tab-select-trigger ha-icon {
        --mdc-icon-size: 16px;
        display: flex; align-items: center; justify-content: center;
        color: var(--t3);
      }
      .tab-select-trigger ha-icon.arrow {
        margin-left: auto;
        transition: transform var(--t-fast);
      }
      .tab-select-wrap.open .tab-select-trigger ha-icon.arrow {
        transform: rotate(180deg);
      }
      .tab-select-trigger span {
        flex: 1;
      }
      .tab-select-menu {
        position: absolute;
        top: calc(100% + 6px);
        left: 0;
        right: 0;
        max-height: 280px;
        overflow-y: auto;
        border-radius: var(--radius-lg);
        padding: 4px;
        background: #1e2433;
        border: 1px solid var(--b2);
        box-shadow: 0 12px 40px rgba(0,0,0,0.5);
        z-index: 20;
        opacity: 0;
        transform: translateY(-4px);
        pointer-events: none;
        transition: all var(--t-fast);
        scrollbar-width: thin;
        scrollbar-color: rgba(255,255,255,0.1) transparent;
      }
      .tab-select-menu::-webkit-scrollbar { width: 4px; }
      .tab-select-menu::-webkit-scrollbar-track { background: transparent; }
      .tab-select-menu::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 2px; }
      .tab-select-menu::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }
      .tab-select-wrap.open .tab-select-menu {
        opacity: 1;
        transform: translateY(0);
        pointer-events: all;
      }
      .tab-select-search {
        width: calc(100% - 8px);
        margin: 4px;
        padding: 7px 10px;
        border-radius: var(--radius-sm);
        border: 1px solid var(--b1);
        background: var(--s1);
        color: var(--t1);
        font-family: inherit;
        font-size: 11px;
        outline: none;
      }
      .tab-select-search::placeholder { color: var(--t4); }
      .tab-select-option {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 12px;
        border-radius: var(--radius-md);
        font-size: 12px;
        font-weight: 500;
        color: var(--t2);
        cursor: pointer;
        transition: all var(--t-fast);
        border: none;
        background: transparent;
        width: 100%;
        font-family: inherit;
        outline: none;
        text-align: left;
      }
      @media (hover: hover) and (pointer: fine) {
        .tab-select-option:hover { background: var(--s3); color: var(--t1); }
      }
      @media (pointer: coarse) {
        .tab-select-option:active { animation: bounce 0.3s ease; }
      }
      .tab-select-option.selected { color: var(--c-accent); }
      .tab-select-option.hidden { display: none; }
      .tab-select-option ha-icon {
        --mdc-icon-size: 16px;
        display: flex; align-items: center; justify-content: center;
        color: var(--t3);
      }
      .tab-select-option.selected ha-icon { color: var(--c-accent); }

      /* ── Tab panel animation ── */
      .tab-panel {
        animation: panel-in 0.3s var(--ease-out) both;
      }
      @keyframes panel-in {
        from {
          opacity: 0;
          transform: translateY(6px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      /* ── Section ── */
      .section-label {
        font-size: 9px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 1.2px;
        color: var(--t4);
        margin-bottom: 8px;
        padding-left: 2px;
      }
      .section-desc {
        font-size: 10px;
        font-weight: 400;
        color: var(--t3);
        margin-bottom: 12px;
        line-height: 1.5;
        padding-left: 2px;
      }

      /* ── Banner ── */
      .banner {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px 14px;
        border-radius: var(--radius-lg);
        font-size: 11px;
        font-weight: 500;
        margin-bottom: 14px;
        background: rgba(96, 165, 250, 0.08);
        border: 1px solid rgba(96, 165, 250, 0.12);
        color: var(--t2);
      }
      .banner ha-icon {
        --mdc-icon-size: 16px;
        color: var(--c-info);
        flex-shrink: 0;
        display: flex; align-items: center; justify-content: center;
      }

      /* ── Item rows ── */
      .item-list {
        display: flex;
        flex-direction: column;
        gap: 4px;
        margin-bottom: 16px;
      }
      .item-row {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 8px 10px;
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
      @media (hover: none) {
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
        background: rgba(129, 140, 248, 0.06);
      }
      .item-row .feature-icon ha-icon { --mdc-icon-size: 16px; }

      .card-row {
        padding: 10px;
      }

      /* ── Drag handle ── */
      .drag-handle {
        width: 20px;
        height: 20px;
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
        --mdc-icon-size: 14px;
        display: flex; align-items: center; justify-content: center;
      }

      /* ── Room icon button ── */
      .room-icon-btn {
        width: 32px;
        height: 32px;
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
        --mdc-icon-size: 16px;
        color: var(--t2);
        display: flex; align-items: center; justify-content: center;
      }
      @media (hover: hover) and (pointer: fine) {
        .room-icon-btn:hover {
          background: var(--s3);
          border-color: var(--b2);
        }
      }
      @media (hover: none) {
        .room-icon-btn:active { animation: bounce 0.3s ease; }
      }
      .room-icon-btn:focus-visible {
        outline: 2px solid var(--c-accent);
        outline-offset: 2px;
      }

      /* ── Card icon box ── */
      .card-icon-box {
        width: 36px;
        height: 36px;
        border-radius: var(--radius-md);
        background: var(--s2);
        border: 1px solid var(--b1);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }
      .card-icon-box ha-icon {
        --mdc-icon-size: 18px;
        color: var(--t2);
        display: flex; align-items: center; justify-content: center;
      }

      /* ── Item info ── */
      .item-info {
        flex: 1;
        min-width: 0;
        display: flex;
        flex-direction: column;
        gap: 1px;
      }
      .item-name {
        font-size: 12px;
        font-weight: 600;
        color: var(--t2);
        line-height: 1.2;
      }
      .item-meta {
        font-size: 9px;
        font-weight: 400;
        color: var(--t4);
        line-height: 1.2;
      }
      .item-row.disabled .item-name {
        color: var(--t4);
      }

      /* ── Card count badge ── */
      .card-count {
        font-size: 10px;
        font-weight: 600;
        color: var(--t3);
        padding: 2px 8px;
        border-radius: var(--radius-full);
        background: var(--s1);
        border: 1px solid var(--b1);
        flex-shrink: 0;
      }

      /* ── Toggle ── */
      .toggle {
        position: relative;
        width: 38px;
        height: 20px;
        border-radius: 10px;
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
        top: 2px;
        left: 2px;
        width: 14px;
        height: 14px;
        border-radius: 50%;
        background: var(--t3);
        transition:
          transform var(--t-fast),
          background var(--t-fast),
          box-shadow var(--t-fast);
      }
      .toggle.on {
        background: rgba(74, 222, 128, 0.2);
        border-color: rgba(74, 222, 128, 0.3);
      }
      .toggle.on::after {
        transform: translateX(18px);
        background: var(--c-success);
        box-shadow: 0 0 8px rgba(74, 222, 128, 0.4);
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
        width: 40px; height: 40px;
        border-radius: 12px;
        border: none; background: transparent;
        color: var(--t3); cursor: pointer;
        padding: 0; outline: none; flex-shrink: 0;
        transition: all var(--t-fast);
        -webkit-tap-highlight-color: transparent;
      }
      .btn-icon.sm { width: 32px; height: 32px; border-radius: var(--radius-md); }
      .btn-icon.xs { width: 28px; height: 28px; border-radius: var(--radius-sm); }
      .btn-icon ha-icon { display: flex; align-items: center; justify-content: center; }
      .btn-icon.xs ha-icon { --mdc-icon-size: 14px; }
      .btn-icon.sm ha-icon { --mdc-icon-size: 16px; }
      @media (hover: hover) { .btn-icon:hover { background: var(--s2); color: var(--t2); } }
      @media (hover: none) { .btn-icon:active { animation: bounce 0.3s ease; } }
      .btn-icon:focus-visible { outline: 2px solid var(--c-accent); outline-offset: 2px; }

      /* ── Dropdown ── */
      .dropdown {
        position: relative;
        width: 100%;
        margin-bottom: 14px;
      }
      .dropdown-trigger {
        width: 100%;
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 8px 14px;
        border-radius: 12px;
        border: 1px solid var(--b2);
        background: var(--s2);
        color: var(--t2);
        font-family: inherit;
        font-size: 12px;
        font-weight: 600;
        cursor: pointer;
        transition: all var(--t-fast);
        outline: none;
        -webkit-tap-highlight-color: transparent;
      }
      @media (hover: hover) and (pointer: fine) {
        .dropdown-trigger:hover {
          background: var(--s3);
          border-color: var(--b3);
        }
      }
      @media (hover: none) {
        .dropdown-trigger:active { animation: bounce 0.3s ease; }
      }
      .dropdown-trigger:focus-visible {
        outline: 2px solid var(--c-accent);
        outline-offset: 2px;
      }
      .dropdown-trigger ha-icon {
        --mdc-icon-size: 16px;
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
        top: calc(100% + 6px);
        left: 0;
        right: 0;
        z-index: 20;
        min-width: 160px;
        max-height: 200px;
        overflow-y: auto;
        border-radius: var(--radius-lg);
        padding: 4px;
        background: #1e2433;
        border: 1px solid var(--b2);
        box-shadow: 0 12px 40px rgba(0, 0, 0, 0.5);
        opacity: 0;
        transform: translateY(-4px);
        pointer-events: none;
        transition: all var(--t-fast);
        scrollbar-width: thin;
        scrollbar-color: rgba(255,255,255,0.1) transparent;
      }
      .dropdown-menu::-webkit-scrollbar { width: 4px; }
      .dropdown-menu::-webkit-scrollbar-track { background: transparent; }
      .dropdown-menu::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 2px; }
      .dropdown-menu::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }
      .dropdown-search {
        width: calc(100% - 8px); margin: 4px; padding: 7px 10px;
        border-radius: var(--radius-sm); border: 1px solid var(--b1);
        background: var(--s1); color: var(--t1);
        font-family: inherit; font-size: 11px; outline: none;
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
        gap: 8px;
        padding: 8px 12px;
        border-radius: var(--radius-md);
        font-size: 12px;
        font-weight: 500;
        color: var(--t2);
        cursor: pointer;
        transition: all var(--t-fast);
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
      @media (hover: none) {
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
        --mdc-icon-size: 16px;
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
        gap: 4px;
        padding: 8px 0;
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
        --mdc-icon-size: 18px;
        color: var(--t2);
        display: flex; align-items: center; justify-content: center;
      }
      @media (hover: hover) and (pointer: fine) {
        .icon-pick:hover {
          background: var(--s3);
          border-color: var(--b2);
        }
      }
      @media (hover: none) {
        .icon-pick:active { animation: bounce 0.3s ease; }
      }
      .icon-pick:focus-visible {
        outline: 2px solid var(--c-accent);
        outline-offset: -2px;
      }
      .icon-pick.selected {
        background: rgba(129, 140, 248, 0.12);
        border-color: rgba(129, 140, 248, 0.25);
      }

      /* ── Preview ── */
      .preview-encart {
        margin-bottom: 14px;
        padding: 12px;
        border-radius: var(--radius-lg);
        background: var(--s1);
        border: 1px solid var(--b1);
      }
      .preview-label {
        font-size: 8px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 1.2px;
        color: var(--t4);
        margin-bottom: 8px;
      }

      /* Preview navbar — miniature faithful to real navbar */
      .preview-navbar {
        display: flex;
        align-items: center;
        gap: 3px;
        padding: 0 6px;
        height: 46px;
        border-radius: 16px;
        background: linear-gradient(
          135deg,
          rgba(255, 255, 255, 0.08) 0%,
          rgba(255, 255, 255, 0.03) 50%,
          rgba(255, 255, 255, 0.06) 100%
        );
        backdrop-filter: blur(50px) saturate(1.5);
        -webkit-backdrop-filter: blur(50px) saturate(1.5);
        box-shadow:
          inset 0 1px 0 0 rgba(255, 255, 255, 0.1),
          0 20px 60px rgba(0, 0, 0, 0.4),
          0 4px 16px rgba(0, 0, 0, 0.25);
        border: 1px solid var(--b2);
        overflow-x: auto;
        scrollbar-width: none;
      }
      .preview-navbar::-webkit-scrollbar {
        display: none;
      }
      .preview-nav-item {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 5px;
        height: 34px;
        min-width: 34px;
        padding: 0 8px;
        border-radius: 11px;
        background: transparent;
        flex-shrink: 0;
        position: relative;
        transition:
          background var(--t-fast),
          color var(--t-fast),
          opacity var(--t-fast);
        color: var(--t3);
      }
      .preview-nav-item ha-icon {
        --mdc-icon-size: 18px;
        flex-shrink: 0;
        display: flex; align-items: center; justify-content: center;
      }
      .preview-nav-item.hidden-preview {
        opacity: 0.2;
      }
      .preview-nav-item.active-preview {
        background: rgba(255, 255, 255, 0.1);
        color: var(--t1);
      }
      .preview-nav-item.active-preview ha-icon {
        color: var(--t1);
      }
      .preview-nav-label {
        font-size: 10px;
        font-weight: 600;
        white-space: nowrap;
        display: grid;
        grid-template-columns: 0fr;
        overflow: hidden;
        transition: grid-template-columns 0.35s var(--ease-out);
      }
      .preview-nav-item.active-preview .preview-nav-label {
        grid-template-columns: 1fr;
      }
      .preview-nav-label span {
        min-width: 0;
        overflow: hidden;
        opacity: 0;
        transition: opacity var(--t-fast);
      }
      .preview-nav-item.active-preview .preview-nav-label span {
        opacity: 1;
      }

      /* Preview navbar — live indicators */
      .preview-nav-item.has-light ha-icon {
        color: var(--c-light-glow);
        filter: drop-shadow(0 0 6px rgba(251, 191, 36, 0.6));
        animation: pulse-light 3s ease-in-out infinite;
      }
      @keyframes pulse-light {
        0%, 100% { filter: drop-shadow(0 0 6px rgba(251, 191, 36, 0.6)); }
        50% { filter: drop-shadow(0 0 2px rgba(251, 191, 36, 0.2)); }
      }
      .preview-nav-item.has-humidity::after {
        content: '';
        position: absolute;
        bottom: 3px;
        left: 50%;
        transform: translateX(-50%);
        width: 12px;
        height: 2px;
        border-radius: 2px;
        background: var(--c-info);
        opacity: 0.8;
        box-shadow: 0 0 6px rgba(96, 165, 250, 0.4);
      }
      .preview-nav-item.has-music ha-icon {
        animation: pulse-music 0.8s ease-in-out infinite;
      }
      .preview-nav-item.has-light.has-music ha-icon {
        color: var(--c-light-glow);
        animation: pulse-light 3s ease-in-out infinite, pulse-music 0.8s ease-in-out infinite;
      }
      @keyframes pulse-music {
        0%, 100% { transform: scale(1); }
        30% { transform: scale(1.2); }
        50% { transform: scale(0.95); }
        70% { transform: scale(1.1); }
      }
      .preview-temp-badge {
        position: absolute;
        top: 1px;
        right: 3px;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        pointer-events: none;
        transition: opacity var(--t-fast);
      }
      .preview-temp-badge ha-icon {
        --mdc-icon-size: 8px;
      }
      .preview-nav-item.has-temp-hot .preview-temp-badge {
        opacity: 1;
        color: var(--c-temp-hot);
        filter: drop-shadow(0 0 4px rgba(248, 113, 113, 0.6));
        animation: pulse-temp-hot 2s infinite ease-in-out;
      }
      .preview-nav-item.has-temp-cold .preview-temp-badge {
        opacity: 1;
        color: var(--c-temp-cold);
        filter: drop-shadow(0 0 4px rgba(96, 165, 250, 0.6));
        animation: pulse-temp-cold 2s infinite ease-in-out;
      }
      @keyframes pulse-temp-hot {
        0%, 100% { transform: scale(1); filter: drop-shadow(0 0 0 transparent); }
        50% { transform: scale(1.15); filter: drop-shadow(0 0 6px rgba(248, 113, 113, 0.6)); }
      }
      @keyframes pulse-temp-cold {
        0%, 100% { transform: scale(1); filter: drop-shadow(0 0 0 transparent); }
        50% { transform: scale(1.15); filter: drop-shadow(0 0 6px rgba(96, 165, 250, 0.6)); }
      }

      /* Preview popup — faithful miniature of real popup */
      .preview-popup {
        border-radius: var(--radius-lg);
        background: linear-gradient(
          135deg,
          rgba(255, 255, 255, 0.08) 0%,
          rgba(255, 255, 255, 0.03) 50%,
          rgba(255, 255, 255, 0.06) 100%
        );
        backdrop-filter: blur(50px) saturate(1.5);
        -webkit-backdrop-filter: blur(50px) saturate(1.5);
        box-shadow:
          inset 0 1px 0 0 rgba(255, 255, 255, 0.1),
          0 20px 60px rgba(0, 0, 0, 0.4),
          0 4px 16px rgba(0, 0, 0, 0.25);
        border: 1px solid var(--b2);
        padding: 12px;
        overflow: hidden;
      }
      .preview-popup-header {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 8px;
      }
      .preview-popup-header-left {
        display: flex;
        flex-direction: column;
        align-items: center;
        flex-shrink: 0;
      }
      .preview-popup-icon-box {
        width: 30px;
        height: 30px;
        border-radius: var(--radius-md);
        background: var(--s2);
        border: 1px solid var(--b1);
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--t2);
      }
      .preview-popup-icon-box ha-icon {
        --mdc-icon-size: 15px;
        display: flex; align-items: center; justify-content: center;
      }
      .preview-popup-icon-box.has-light ha-icon {
        color: var(--c-light-glow);
        filter: drop-shadow(0 0 5px rgba(251, 191, 36, 0.6));
      }
      .preview-popup-icon-box.has-music ha-icon {
        animation: pulse-music 0.8s ease-in-out infinite;
      }
      .preview-popup-scene-dash {
        width: 10px;
        height: 2px;
        background: var(--t4);
        border-radius: 4px;
        margin-top: 4px;
        opacity: 0;
        transition: opacity 0.3s var(--ease-std);
      }
      .preview-popup-scene-dash.visible {
        opacity: 1;
      }
      .preview-popup-info {
        flex: 1;
        min-width: 0;
      }
      .preview-popup-name {
        font-size: 12px;
        font-weight: 700;
        color: var(--t1);
        line-height: 1.2;
      }
      .preview-popup-meta {
        display: flex;
        gap: 8px;
        font-size: 9px;
        font-weight: 500;
        color: var(--t3);
        margin-top: 2px;
      }
      .preview-popup-close {
        width: 20px;
        height: 20px;
        border-radius: var(--radius-sm);
        background: transparent;
        border: 1px solid var(--b1);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        color: var(--t3);
        pointer-events: none;
      }
      .preview-popup-close ha-icon {
        --mdc-icon-size: 10px;
        display: flex; align-items: center; justify-content: center;
      }

      /* Preview popup scenes */
      .preview-popup-scenes {
        display: flex;
        flex-wrap: wrap;
        gap: 4px;
        padding-bottom: 8px;
      }
      .preview-scene-chip {
        background: rgba(255, 255, 255, 0.04);
        border: 1px solid var(--b1);
        border-radius: var(--radius-md);
        padding: 3px 8px;
        font-size: 7px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.6px;
        color: var(--t3);
        transition: opacity var(--t-fast);
      }
      .preview-scene-chip.hidden-scene {
        opacity: 0.2;
      }

      /* Preview popup cards */
      .preview-popup-cards {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      .preview-card-slot {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 6px 8px;
        border-radius: var(--radius-sm);
        background: var(--s1);
        border: 1px solid var(--b1);
        transition: opacity var(--t-fast);
      }
      .preview-card-slot ha-icon {
        --mdc-icon-size: 14px;
        color: var(--t3);
        display: flex; align-items: center; justify-content: center;
      }
      .preview-card-slot-name {
        font-size: 10px;
        font-weight: 600;
        color: var(--t2);
      }
      .preview-card-slot-count {
        margin-left: auto;
        font-size: 9px;
        font-weight: 600;
        color: var(--t4);
        padding: 1px 6px;
        border-radius: var(--radius-full);
        background: var(--s2);
        border: 1px solid var(--b1);
      }
      .preview-empty {
        font-size: 10px;
        font-weight: 500;
        color: var(--t4);
        text-align: center;
        padding: 12px 0;
      }

      /* Variant picker */
      .variant-picker {
        display: flex; gap: 6px; margin-top: 6px;
      }

      /* Preview media hero card — full-bleed artwork style */
      .media-preview {
        position: relative; overflow: hidden;
        border-radius: var(--radius-xl);
        min-height: 200px;
        display: flex; flex-direction: column;
        border: 1px solid var(--b2);
        box-shadow: 0 8px 32px rgba(0,0,0,0.25), 0 2px 8px rgba(0,0,0,0.15);
      }
      .mp-art-bg {
        position: absolute; inset: 0; z-index: 0;
        background: linear-gradient(135deg, #1a1040 0%, #2d1b69 30%, #4a2c8a 60%, #1a1040 100%);
      }
      .mp-gradient {
        position: absolute; inset: 0; z-index: 1; pointer-events: none;
        background: linear-gradient(to top,
          rgba(0,0,0,0.85) 0%,
          rgba(0,0,0,0.4) 40%,
          rgba(0,0,0,0.15) 70%,
          transparent 100%
        );
      }
      .mp-content {
        position: relative; z-index: 2;
        display: flex; flex-direction: column;
        padding: 10px 12px; flex: 1;
      }
      .mp-top {
        display: flex; align-items: center; justify-content: space-between;
      }
      .mp-pill {
        display: inline-flex; align-items: center; gap: 4px;
        padding: 3px 8px 3px 5px;
        border-radius: 9999px;
        backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
        background: rgba(0,0,0,0.35); border: 1px solid rgba(255,255,255,0.08);
        font-size: 8px; font-weight: 600; color: rgba(255,255,255,0.9);
      }
      .mp-pill ha-icon { --mdc-icon-size: 10px; display: flex; align-items: center; justify-content: center; }
      .mp-eq {
        display: flex; align-items: flex-end; gap: 1.5px;
        height: 10px; margin-left: 4px;
      }
      .mp-eq-bar {
        width: 2px; border-radius: 1px;
        background: #fff;
        filter: drop-shadow(0 0 3px rgba(255,255,255,0.6));
        animation: mp-eq-1 0.8s ease-in-out infinite alternate;
      }
      .mp-eq-bar:nth-child(1) { height: 40%; animation-delay: 0s; }
      .mp-eq-bar:nth-child(2) { height: 80%; animation-delay: 0.15s; animation-name: mp-eq-2; }
      .mp-eq-bar:nth-child(3) { height: 55%; animation-delay: 0.3s; animation-name: mp-eq-3; }
      @keyframes mp-eq-1 { 0% { height: 20%; } 100% { height: 100%; } }
      @keyframes mp-eq-2 { 0% { height: 30%; } 100% { height: 90%; } }
      @keyframes mp-eq-3 { 0% { height: 15%; } 100% { height: 85%; } }
      .mp-spacer { flex: 1; }
      .mp-glass-panel {
        backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
        background: rgba(0,0,0,0.3);
        border: 1px solid rgba(255,255,255,0.06);
        border-radius: var(--radius-lg);
        padding: 10px 12px 8px;
      }
      .mp-track {
        display: flex; flex-direction: column; gap: 2px;
      }
      .mp-track-title {
        font-size: 13px; font-weight: 700; color: #fff; line-height: 1.15;
        text-shadow: 0 1px 6px rgba(0,0,0,0.4);
      }
      .mp-track-artist {
        font-size: 10px; font-weight: 500; color: rgba(255,255,255,0.7);
      }
      .mp-track-meta {
        display: flex; align-items: center; gap: 6px; margin-top: 1px;
      }
      .mp-track-time { font-size: 8px; color: rgba(255,255,255,0.4); font-variant-numeric: tabular-nums; }
      .mp-track-source {
        font-size: 6px; font-weight: 700; text-transform: uppercase;
        letter-spacing: 0.4px; color: rgba(255,255,255,0.4);
        padding: 1px 4px; border-radius: 3px; background: rgba(255,255,255,0.06);
      }
      .mp-progress {
        position: relative; width: 100%; height: 3px;
        border-radius: 1.5px; background: rgba(255,255,255,0.08); margin-top: 6px;
      }
      .mp-progress-fill {
        position: absolute; top: 0; left: 0; height: 100%; width: 67%;
        border-radius: inherit;
        background: rgba(129,140,248,0.8);
        box-shadow: 0 0 6px rgba(129,140,248,0.4);
      }
      .mp-transport {
        display: flex; align-items: center; justify-content: center; gap: 6px;
        margin-top: 8px;
      }
      .mp-btn {
        width: 24px; height: 24px; border-radius: 6px;
        background: transparent; border: none;
        display: flex; align-items: center; justify-content: center;
        color: rgba(255,255,255,0.45); padding: 0;
      }
      .mp-btn ha-icon { --mdc-icon-size: 14px; display: flex; align-items: center; justify-content: center; }
      .mp-btn.skip { width: 28px; height: 28px; }
      .mp-btn.skip ha-icon { --mdc-icon-size: 18px; }
      .mp-btn.main {
        width: 34px; height: 34px; border-radius: 10px;
        background: rgba(129,140,248,0.1); border: 1px solid rgba(129,140,248,0.15);
        color: rgba(129,140,248,0.8);
      }
      .mp-btn.main ha-icon { --mdc-icon-size: 18px; }

      /* Preview light card */
      .preview-light {
        border-radius: var(--radius-lg);
        overflow: hidden;
      }
      .preview-light-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 4px;
        padding: 0 4px;
      }
      .preview-light-header-left {
        display: flex;
        align-items: center;
        gap: 6px;
      }
      .preview-light-title {
        font-size: 7px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 1.5px;
        color: var(--t4);
      }
      .preview-light-count {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-width: 14px;
        height: 14px;
        padding: 0 4px;
        border-radius: var(--radius-full);
        font-size: 7px;
        font-weight: 700;
      }
      .preview-light-count.none {
        background: var(--s2);
        color: var(--t3);
      }
      .preview-light-count.some {
        background: rgba(251, 191, 36, 0.15);
        color: var(--c-light-glow);
      }
      .preview-light-count.all {
        background: rgba(251, 191, 36, 0.2);
        color: var(--c-light-glow);
      }
      .preview-light-toggle {
        width: 28px;
        height: 14px;
        border-radius: 7px;
        background: var(--s2);
        border: 1px solid var(--b2);
        position: relative;
        pointer-events: none;
      }
      .preview-light-toggle::after {
        content: '';
        position: absolute;
        top: 2px;
        left: 2px;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: var(--t3);
        transition: transform var(--t-fast), background var(--t-fast);
      }
      .preview-light-toggle.on {
        background: rgba(251, 191, 36, 0.2);
        border-color: rgba(251, 191, 36, 0.3);
      }
      .preview-light-toggle.on::after {
        transform: translateX(14px);
        background: var(--c-light-glow);
        box-shadow: 0 0 6px rgba(251, 191, 36, 0.4);
      }
      .preview-light-body {
        border-radius: var(--radius-lg);
        background: linear-gradient(
          135deg,
          rgba(255, 255, 255, 0.06) 0%,
          rgba(255, 255, 255, 0.02) 100%
        );
        box-shadow:
          inset 0 1px 0 0 rgba(255, 255, 255, 0.08),
          0 8px 24px rgba(0, 0, 0, 0.3);
        border: 1px solid var(--b1);
        padding: 8px;
        position: relative;
        overflow: hidden;
      }
      .preview-light-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 0;
        position: relative;
        z-index: 1;
      }
      .preview-light-row {
        display: flex;
        align-items: center;
        gap: 6px;
        grid-column: 1 / -1;
        padding: 5px 4px;
        border-radius: 6px;
        transition: opacity var(--t-fast);
      }
      .preview-light-row.compact {
        grid-column: span 1;
      }
      .preview-light-row.compact-right {
        padding-left: 8px;
        position: relative;
      }
      .preview-light-row.compact-right::before {
        content: '';
        position: absolute;
        left: 0;
        top: 20%;
        bottom: 20%;
        width: 1px;
        background: linear-gradient(
          to bottom,
          transparent,
          rgba(255, 255, 255, 0.08) 30%,
          rgba(255, 255, 255, 0.08) 70%,
          transparent
        );
      }
      .preview-light-row.hidden-light {
        opacity: 0.2;
      }
      .preview-light-icon {
        width: 24px;
        height: 24px;
        border-radius: 6px;
        background: var(--s2);
        border: 1px solid var(--b1);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        color: var(--t3);
      }
      .preview-light-icon ha-icon {
        --mdc-icon-size: 12px;
        display: flex; align-items: center; justify-content: center;
      }
      .preview-light-icon.on {
        background: rgba(251, 191, 36, 0.1);
        border-color: rgba(251, 191, 36, 0.15);
        color: var(--c-light-glow);
        filter: drop-shadow(0 0 4px rgba(251, 191, 36, 0.4));
      }
      .preview-light-info {
        flex: 1;
        min-width: 0;
      }
      .preview-light-name {
        font-size: 9px;
        font-weight: 600;
        color: var(--t1);
        line-height: 1.2;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .preview-light-sub {
        font-size: 7px;
        font-weight: 500;
        color: var(--t3);
        margin-top: 1px;
      }
      .preview-light-row[data-on='true'] .preview-light-sub {
        color: rgba(251, 191, 36, 0.55);
      }
      .preview-light-dot {
        width: 4px;
        height: 4px;
        border-radius: 50%;
        flex-shrink: 0;
        background: var(--t4);
        transition: background var(--t-fast), box-shadow var(--t-fast);
      }
      .preview-light-dot.on {
        background: var(--c-light-glow);
        box-shadow: 0 0 6px rgba(251, 191, 36, 0.5);
      }
      .preview-light-tint {
        position: absolute;
        inset: 0;
        border-radius: inherit;
        pointer-events: none;
        transition: opacity var(--t-slow);
      }
      .preview-light-sched {
        --mdc-icon-size: 10px;
        color: var(--c-accent);
        flex-shrink: 0;
        opacity: 0.7;
      }
      .preview-light-layout-tag {
        font-size: 6px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        color: var(--t4);
        background: var(--s2);
        border: 1px solid var(--b1);
        border-radius: 3px;
        padding: 1px 4px;
        flex-shrink: 0;
      }

      /* ── Preview weather (realistic miniature) ── */
      .preview-weather-wrap {
        display: flex; flex-direction: column; gap: 4px;
      }
      .pw-card-header {
        display: flex; align-items: center; justify-content: space-between;
        padding: 0 4px;
      }
      .pw-card-title {
        font-size: 7px; font-weight: 700;
        text-transform: uppercase; letter-spacing: 1.2px;
        color: var(--t4);
      }
      .pw-card-location {
        font-size: 7px; font-weight: 500; color: var(--t3);
      }

      /* ── Preview title card ── */
      .preview-title-card {
        display: flex; flex-direction: column; align-items: center;
        gap: 4px; padding: 8px 12px; text-align: center;
      }
      .preview-title-text {
        font-size: 16px; font-weight: 700; color: var(--t1);
        letter-spacing: -0.3px; line-height: 1.2;
        display: flex; align-items: center; gap: 10px;
        width: 100%;
      }
      .preview-title-text::before, .preview-title-text::after {
        content: ''; flex: 1; height: 1px;
        background: linear-gradient(90deg, transparent, var(--b3));
      }
      .preview-title-text::after {
        background: linear-gradient(90deg, var(--b3), transparent);
      }
      .preview-title-dash {
        display: flex; align-items: center; justify-content: center;
        padding: 2px 0;
      }
      .preview-dash-line {
        width: 20px; height: 2px; border-radius: 1px;
        background: var(--t4);
        transition: all var(--t-med);
      }

      /* ── Chip (UI kit) ── */
      .chip {
        display: inline-flex; align-items: center; gap: 5px;
        padding: 5px 12px; border-radius: var(--radius-md);
        border: 1px solid var(--b2); background: var(--s1);
        font-family: inherit; font-size: 11px; font-weight: 600;
        color: var(--t3); cursor: pointer; transition: all var(--t-fast);
        outline: none; -webkit-tap-highlight-color: transparent;
      }
      @media (hover: hover) and (pointer: fine) {
        .chip:hover { background: var(--s3); color: var(--t2); border-color: var(--b3); }
      }
      .chip:focus-visible { outline: 2px solid rgba(255,255,255,0.25); outline-offset: 2px; }
      .chip.active { background: var(--s4); border-color: var(--b3); color: var(--t1); }
      .chip ha-icon {
        --mdc-icon-size: 14px;
        display: flex; align-items: center; justify-content: center;
      }
      @media (pointer: coarse) {
        .chip:active { transform: scale(0.94); }
      }

      /* ── Title config styles ── */
      .title-section-gap {
        height: 12px;
      }
      .title-modes-list {
        display: flex; flex-direction: column; gap: 10px;
      }
      .title-mode-row {
        display: flex; flex-direction: column; gap: 8px;
        padding: 12px; border-radius: var(--radius-md);
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
        background: var(--s1); margin-bottom: 8px;
      }
      .title-source-header {
        display: flex; align-items: center; gap: 8px;
        padding: 10px 12px;
      }
      .title-source-block.dragging {
        opacity: 0.4;
      }
      .title-source-block.drop-target {
        border-color: var(--c-accent);
        box-shadow: 0 0 0 1px var(--c-accent);
      }
      .title-source-header ha-icon {
        --mdc-icon-size: 16px; color: var(--t3);
        display: flex; align-items: center; justify-content: center;
      }
      .title-source-type {
        font-size: 12px; font-weight: 600; color: var(--t2);
      }
      .title-source-badge {
        font-size: 9px; font-weight: 700; color: var(--t4);
        background: var(--s3); border-radius: var(--radius-full);
        padding: 1px 6px;
      }
      .title-source-body {
        padding: 0 12px 12px;
        display: flex; flex-direction: column; gap: 8px;
      }
      .title-source-field {
        display: flex; flex-direction: column; gap: 4px;
      }
      .title-source-field-label {
        font-size: 10px; font-weight: 600; color: var(--t4);
        text-transform: uppercase; letter-spacing: 0.5px;
      }
      .title-mode-header {
        display: flex; align-items: center; gap: 6px;
      }
      .title-mode-header .drag-handle {
        cursor: grab; opacity: 0.4; display: flex; align-items: center;
        --mdc-icon-size: 16px;
      }
      .title-mode-header .drag-handle:hover { opacity: 0.7; }
      .title-mode-id {
        flex: 1;
        font-size: 10px; font-weight: 700; color: var(--t3);
        text-transform: uppercase; letter-spacing: 0.5px;
      }
      .title-color-row {
        display: flex; align-items: center; gap: 8px;
      }
      .title-color-label {
        font-size: 10px; color: var(--t4); white-space: nowrap;
      }
      .title-color-chips {
        display: flex; gap: 6px; align-items: center;
      }
      .title-color-chip {
        width: 20px; height: 20px; border-radius: 50%;
        border: 2px solid transparent; cursor: pointer;
        transition: all var(--t-fast); outline: none;
      }
      @media (hover: hover) and (pointer: fine) {
        .title-color-chip:hover { transform: scale(1.1); }
      }
      @media (hover: none) {
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
        display: flex; gap: 8px; align-items: center;
      }
      .title-mode-fields-row .input { flex: 1; min-width: 0; }
      .title-icon-btn {
        width: 44px; align-self: stretch; flex-shrink: 0;
        border-radius: 12px; border: 1px solid var(--b2);
        background: var(--s1); cursor: pointer; outline: none;
        display: flex; align-items: center; justify-content: center;
        padding: 0; font-family: inherit;
        transition: background var(--t-fast), border-color var(--t-fast);
      }
      .title-icon-btn ha-icon {
        --mdc-icon-size: 20px;
        color: var(--t3);
        display: flex; align-items: center; justify-content: center;
      }
      .title-icon-btn.has-icon { border-color: var(--b3); }
      .title-icon-btn.has-icon ha-icon { color: var(--t1); }
      @media (hover: hover) and (pointer: fine) {
        .title-icon-btn:hover { background: var(--s3); border-color: var(--b3); }
      }
      @media (hover: none) {
        .title-icon-btn:active { animation: bounce 0.3s ease; }
      }
      .title-icon-btn:focus-visible {
        outline: 2px solid var(--c-accent); outline-offset: -2px;
      }

      /* ── Icon picker popup (glass) ── */
      .icon-popup-overlay {
        position: fixed; inset: 0; z-index: 10000;
        background: rgba(0, 0, 0, 0.5);
        display: flex; align-items: center; justify-content: center;
        padding: 24px;
        animation: fade-in 0.15s ease-out;
      }
      @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
      .icon-popup {
        width: 100%; max-width: 400px; max-height: 70vh;
        display: flex; flex-direction: column;
        border-radius: var(--radius-xl);
        background: linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 50%, rgba(255,255,255,0.06) 100%);
        backdrop-filter: blur(40px) saturate(1.4);
        -webkit-backdrop-filter: blur(40px) saturate(1.4);
        box-shadow: inset 0 1px 0 0 rgba(255,255,255,0.1), 0 8px 32px rgba(0,0,0,0.25), 0 2px 8px rgba(0,0,0,0.15);
        border: 1px solid var(--b2);
        overflow: hidden;
        animation: popup-in 0.2s var(--ease-out);
      }
      @keyframes popup-in { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
      .icon-popup-header {
        padding: 14px 16px 10px;
        display: flex; flex-direction: column; gap: 10px;
        border-bottom: 1px solid var(--b1);
      }
      .icon-popup-title {
        font-size: 11px; font-weight: 600; text-transform: uppercase;
        letter-spacing: 1px; color: var(--t3);
      }
      .icon-popup-search {
        width: 100%; padding: 10px 14px; border-radius: 12px;
        border: 1px solid var(--b2); background: var(--s1);
        color: var(--t1); font-family: inherit; font-size: 13px;
        outline: none; transition: border-color var(--t-fast);
        box-sizing: border-box;
      }
      .icon-popup-search:focus { border-color: var(--b3); }
      .icon-popup-search::placeholder { color: var(--t4); }
      .icon-popup-grid-wrap {
        flex: 1; overflow-y: auto; padding: 10px;
        scrollbar-width: thin;
        scrollbar-color: var(--s3) transparent;
      }
      .icon-popup-grid {
        display: grid; grid-template-columns: repeat(6, 1fr);
        gap: 4px;
      }
      .icon-popup-grid .icon-pick {
        aspect-ratio: 1; width: 100%;
        display: flex; align-items: center; justify-content: center;
      }
      .icon-popup-grid .icon-pick ha-icon {
        display: flex; align-items: center; justify-content: center;
      }
      .icon-popup-empty {
        padding: 24px; text-align: center;
        font-size: 12px; color: var(--t4);
      }

      /* ── Color picker popup (glass) ── */
      .cp-overlay {
        position: fixed; inset: 0; z-index: 10001;
        display: flex; align-items: center; justify-content: center;
        background: rgba(0, 0, 0, 0.4);
        backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
        animation: cpFadeIn 0.2s ease;
      }
      @keyframes cpFadeIn { from { opacity: 0; } to { opacity: 1; } }
      .cp-dialog {
        background: linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 50%, rgba(255,255,255,0.06) 100%);
        backdrop-filter: blur(40px) saturate(1.4); -webkit-backdrop-filter: blur(40px) saturate(1.4);
        border: 1px solid var(--b2); border-radius: var(--radius-xl);
        padding: 20px; display: flex; flex-direction: column; align-items: center; gap: 14px;
        box-shadow: inset 0 1px 0 0 rgba(255,255,255,0.1), 0 8px 32px rgba(0,0,0,0.25);
        max-width: 300px; width: 90vw;
      }
      .cp-dialog .cp-title {
        font-size: 11px; font-weight: 700; text-transform: uppercase;
        letter-spacing: 1px; color: var(--t3);
      }
      .cp-wheel-wrap {
        position: relative; width: 220px; height: 220px;
      }
      .cp-wheel-wrap canvas {
        width: 100%; height: 100%; border-radius: 50%; cursor: crosshair;
      }
      .cp-cursor {
        position: absolute; width: 22px; height: 22px; border-radius: 50%;
        border: 3px solid white; box-shadow: 0 0 6px rgba(0,0,0,0.6), 0 0 0 1px rgba(0,0,0,0.2);
        pointer-events: none; transform: translate(-50%, -50%);
      }
      .cp-preview {
        width: 100%; height: 32px; border-radius: var(--radius-md);
        border: 1px solid var(--b2);
      }
      .cp-hex {
        font-size: 12px; font-weight: 600; color: var(--t2);
        font-family: monospace; letter-spacing: 0.5px;
      }
      .cp-confirm {
        font-family: inherit; font-size: 12px; font-weight: 600;
        text-transform: uppercase; letter-spacing: 0.8px; color: var(--t2);
        background: var(--s2); border: 1px solid var(--b2);
        border-radius: var(--radius-md); padding: 8px 24px;
        cursor: pointer; outline: none; -webkit-tap-highlight-color: transparent;
        transition: background var(--t-fast), border-color var(--t-fast);
      }
      @media (hover: hover) and (pointer: fine) {
        .cp-confirm:hover { background: var(--s3); border-color: var(--b3); }
      }
      @media (hover: none) {
        .cp-confirm:active { animation: bounce 0.3s ease; }
      }
      .cp-confirm:focus-visible { outline: 2px solid var(--c-accent); outline-offset: -2px; }

      /* Color picker button (rainbow ring) */
      .title-color-picker-btn {
        width: 20px; height: 20px; border-radius: 50%;
        border: 2px solid transparent; cursor: pointer; padding: 0;
        outline: none; background: none; -webkit-tap-highlight-color: transparent;
        transition: all var(--t-fast); flex-shrink: 0;
        position: relative;
      }
      .title-color-picker-btn::before {
        content: ''; position: absolute; inset: -2px; border-radius: 50%;
        background: conic-gradient(
          hsl(0,80%,60%), hsl(60,80%,55%), hsl(120,70%,50%),
          hsl(180,75%,50%), hsl(240,75%,60%), hsl(300,75%,55%), hsl(360,80%,60%)
        );
      }
      @media (hover: hover) and (pointer: fine) {
        .title-color-picker-btn:hover { transform: scale(1.15); }
      }
      @media (hover: none) {
        .title-color-picker-btn:active { animation: bounce 0.3s ease; }
      }
      .title-color-picker-btn:focus-visible { outline: 2px solid var(--c-accent); outline-offset: 2px; }
      .title-color-chip.custom {
        border: 2px solid var(--b3);
      }
      .title-color-chip.custom.active {
        border-color: var(--t1); transform: scale(1.15);
      }

      .preview-weather {
        border-radius: var(--radius-lg);
        background: linear-gradient(
          135deg,
          rgba(255, 255, 255, 0.08) 0%,
          rgba(255, 255, 255, 0.03) 50%,
          rgba(255, 255, 255, 0.06) 100%
        );
        backdrop-filter: blur(50px) saturate(1.5);
        -webkit-backdrop-filter: blur(50px) saturate(1.5);
        box-shadow:
          inset 0 1px 0 0 rgba(255, 255, 255, 0.1),
          0 20px 60px rgba(0, 0, 0, 0.4),
          0 4px 16px rgba(0, 0, 0, 0.25);
        border: 1px solid var(--b2);
        overflow: hidden;
        position: relative;
      }
      .pw-tint {
        position: absolute; inset: 0;
        border-radius: inherit;
        pointer-events: none; z-index: 0;
      }
      .pw-content {
        position: relative; z-index: 1;
        padding: 10px;
        display: flex; flex-direction: column; gap: 6px;
      }
      .pw-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
      }
      .pw-header-left {
        display: flex; flex-direction: column; gap: 1px;
      }
      .pw-time {
        font-size: 18px; font-weight: 300; color: var(--t1); line-height: 1;
        font-variant-numeric: tabular-nums;
      }
      .pw-time .pw-sec {
        font-size: 8px; font-weight: 400; color: var(--t4);
      }
      .pw-date {
        font-size: 7px; color: var(--t3);
        text-transform: capitalize;
      }
      .pw-date::first-letter { font-weight: 700; }
      .pw-header-right {
        display: flex; flex-direction: column; align-items: flex-end; gap: 2px;
      }
      .pw-temp {
        font-size: 20px; font-weight: 700; color: var(--t1); line-height: 1;
      }
      .pw-temp-unit {
        font-size: 8px; font-weight: 400; color: var(--t3); vertical-align: super;
      }
      .pw-cond {
        display: flex; align-items: center; gap: 3px;
        font-size: 7px; font-weight: 500; color: var(--t3);
      }
      .pw-cond ha-icon {
        --mdc-icon-size: 10px;
        display: flex; align-items: center; justify-content: center;
        color: var(--t3);
      }
      .pw-feels {
        font-size: 6px; color: var(--t4);
      }
      /* ── Sparkline ── */
      .pw-spark-zone {
        height: 44px; position: relative; overflow: hidden;
        border-radius: var(--radius-sm);
      }
      .pw-spark-svg {
        display: block; width: 100%; height: 100%;
      }
      .pw-spark-now {
        position: absolute; top: 0; bottom: 16px; width: 1px;
        background: linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.5) 30%, rgba(255,255,255,0.5) 70%, transparent 100%);
        transform: translateX(-50%);
      }
      .pw-spark-now-dot {
        position: absolute; left: 50%; transform: translate(-50%, -50%);
        width: 4px; height: 4px; border-radius: 50%;
        background: white;
        box-shadow: 0 0 4px rgba(255,255,255,0.8);
      }
      .pw-spark-labels {
        position: absolute; bottom: 0; left: 0; right: 0; height: 12px;
      }
      .pw-spark-lbl {
        position: absolute; transform: translateX(-50%);
        font-size: 5px; color: var(--t4);
        font-variant-numeric: tabular-nums;
      }
      /* ── Metrics ── */
      .pw-metrics {
        display: grid;
        gap: 1px;
        border-radius: var(--radius-sm);
        background: var(--b1);
        overflow: hidden;
      }
      .pw-metric {
        display: flex; align-items: center; justify-content: center; gap: 2px;
        padding: 4px 3px;
        background: var(--s1);
      }
      .pw-metric ha-icon {
        --mdc-icon-size: 9px;
        width: 9px; height: 9px;
        display: flex; align-items: center; justify-content: center;
        color: var(--t4);
      }
      .pw-metric.humidity ha-icon { color: rgba(96,165,250,0.5); }
      .pw-metric.wind ha-icon { color: rgba(110,231,183,0.5); }
      .pw-metric.pressure ha-icon { color: rgba(148,163,184,0.5); }
      .pw-metric.uv ha-icon { color: rgba(251,191,36,0.5); }
      .pw-metric.visibility ha-icon { color: rgba(148,163,184,0.4); }
      .pw-metric.sunrise ha-icon { color: rgba(251,191,36,0.4); }
      .pw-metric.sunset ha-icon { color: rgba(251,146,60,0.5); }
      .pw-metric-val { font-size: 7px; font-weight: 600; color: var(--t2); }
      .pw-metric-unit { font-size: 5px; font-weight: 400; color: var(--t4); }
      .pw-metric-dir { font-size: 6px; font-weight: 700; color: var(--t3); }
      /* ── Forecast ── */
      .pw-forecast-zone {
        display: flex; flex-direction: column; gap: 4px;
      }
      .pw-tabs {
        display: flex; justify-content: center; gap: 4px;
      }
      .pw-tab {
        font-size: 7px; font-weight: 600; letter-spacing: 0.5px; text-transform: uppercase;
        color: var(--t4);
        padding: 2px 6px;
        border-radius: 100px;
        border: 1px solid var(--b1);
        background: transparent;
      }
      .pw-tab.active {
        color: var(--t1);
        background: var(--s4);
        border-color: var(--b3);
      }
      .pw-fold-sep {
        height: 1px;
        background: linear-gradient(90deg, transparent, var(--b2), transparent);
        opacity: 0.3;
      }
      .pw-daily-list {
        display: flex; flex-direction: column; gap: 1px;
      }
      .pw-day-row {
        display: grid;
        grid-template-columns: 28px 14px 1fr 24px;
        align-items: center;
        gap: 4px;
        padding: 2px 4px;
        border-radius: var(--radius-sm);
      }
      .pw-day-row.today {
        background: var(--s2);
      }
      .pw-day-label {
        font-size: 7px; font-weight: 600; color: var(--t3);
      }
      .pw-day-row.today .pw-day-label { color: var(--t2); }
      .pw-day-icon {
        --mdc-icon-size: 10px;
        display: flex; align-items: center; justify-content: center;
        color: var(--t3);
      }
      .pw-day-temps {
        display: flex; align-items: baseline; gap: 3px;
      }
      .pw-day-high {
        font-size: 7px; font-weight: 700; color: var(--t2);
      }
      .pw-day-low {
        font-size: 6px; font-weight: 400; color: var(--t4);
      }
      .pw-day-precip {
        font-size: 6px; color: rgba(96,165,250,0.5);
        text-align: right;
      }

      /* ── Preview Spotify card ── */
      .preview-spotify-wrap {
        display: flex; flex-direction: column; gap: 4px;
      }
      .ps-card-header {
        display: flex; align-items: center; gap: 4px;
        padding: 0 4px;
      }
      .ps-card-header ha-icon {
        --mdc-icon-size: 10px; color: #1DB954;
        display: flex; align-items: center; justify-content: center;
      }
      .ps-card-title {
        font-size: 7px; font-weight: 700;
        text-transform: uppercase; letter-spacing: 1.2px;
        color: var(--t4);
      }
      .preview-spotify {
        border-radius: var(--radius-lg);
        background: linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 50%, rgba(255,255,255,0.06) 100%);
        backdrop-filter: blur(50px) saturate(1.5);
        -webkit-backdrop-filter: blur(50px) saturate(1.5);
        box-shadow: inset 0 1px 0 0 rgba(255,255,255,0.1), 0 20px 60px rgba(0,0,0,0.4), 0 4px 16px rgba(0,0,0,0.25);
        border: 1px solid var(--b2);
        overflow: hidden;
        padding: 8px;
        display: flex; flex-direction: column; gap: 6px;
      }
      .ps-search {
        display: flex; align-items: center; gap: 4px;
        background: var(--s3); border-radius: 100px;
        padding: 3px 8px;
      }
      .ps-search ha-icon {
        --mdc-icon-size: 10px; color: var(--t4);
        display: flex; align-items: center; justify-content: center;
      }
      .ps-search-text {
        font-size: 7px; color: var(--t4); flex: 1;
      }
      .ps-tabs {
        display: flex; gap: 3px;
      }
      .ps-tab {
        font-size: 6px; font-weight: 600; letter-spacing: 0.3px;
        color: var(--t4);
        padding: 2px 5px;
        border-radius: 100px;
        border: 1px solid var(--b1);
        background: transparent;
      }
      .ps-tab.active {
        color: var(--t1);
        background: var(--s4);
        border-color: var(--b3);
      }
      .ps-section-label {
        font-size: 6px; font-weight: 700; color: var(--t3);
        text-transform: uppercase; letter-spacing: 0.5px;
        padding: 2px 0 1px;
      }
      .ps-item-row {
        display: flex; align-items: center; gap: 6px;
        padding: 2px 0;
      }
      .ps-item-art {
        width: 20px; height: 20px; border-radius: 3px;
        background: var(--s3); flex-shrink: 0;
        display: flex; align-items: center; justify-content: center;
      }
      .ps-item-art ha-icon {
        --mdc-icon-size: 10px; color: var(--t4);
        display: flex; align-items: center; justify-content: center;
      }
      .ps-item-info {
        flex: 1; min-width: 0;
      }
      .ps-item-name {
        font-size: 7px; font-weight: 600; color: var(--t2);
        white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
      }
      .ps-item-meta {
        font-size: 6px; color: var(--t4);
        white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
      }
      .ps-item-play {
        --mdc-icon-size: 12px; color: #1DB954; flex-shrink: 0;
        display: flex; align-items: center; justify-content: center;
        opacity: 0.6;
      }

      /* ── Preview dashboard ── */
      .preview-dashboard {
        border-radius: var(--radius-lg);
        background: rgba(17, 24, 39, 0.6);
        padding: 10px;
        display: flex;
        flex-direction: column;
        gap: 8px;
        min-height: 80px;
      }
      .preview-dashboard-cards {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 6px;
      }
      .preview-dashboard-navbar {
        display: flex;
        gap: 6px;
        justify-content: center;
        padding: 4px 8px;
        border-radius: var(--radius-md);
        background: var(--s1);
        border: 1px solid var(--b1);
        margin-top: auto;
      }
      .preview-dashboard-navbar ha-icon {
        --mdc-icon-size: 14px;
        color: var(--t3);
        display: flex; align-items: center; justify-content: center;
      }
      .preview-dashboard-card {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 10px;
        border-radius: var(--radius-md);
        background: linear-gradient(
          135deg,
          rgba(255, 255, 255, 0.06) 0%,
          rgba(255, 255, 255, 0.02) 100%
        );
        border: 1px solid var(--b1);
        font-size: 10px;
        font-weight: 600;
        color: var(--t2);
      }
      .preview-dashboard-card ha-icon {
        --mdc-icon-size: 16px;
        color: var(--t3);
        display: flex; align-items: center; justify-content: center;
      }
      .preview-dashboard-card.weather ha-icon {
        color: rgba(251, 191, 36, 0.7);
      }
      .preview-dashboard-card.light ha-icon {
        color: rgba(251, 191, 36, 0.5);
      }
      .preview-dashboard-empty {
        text-align: center;
        color: var(--t4);
        font-size: 11px;
        padding: 16px 0;
      }

      /* ── Cover preview ── */
      .preview-cover {
        display: flex;
        flex-direction: column;
        gap: 4px;
        padding: 12px;
      }
      .preview-cover-card {
        border-radius: var(--radius-lg);
        overflow: hidden;
      }

      /* ── Presence preview ── */
      .preview-presence {
        padding: 12px;
      }
      .preview-presence-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 10px;
      }
      .preview-presence-title {
        font-size: 11px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 1px;
        color: var(--t2);
      }
      .preview-presence-pill {
        font-size: 10px;
        font-weight: 700;
        padding: 2px 8px;
        border-radius: 9999px;
        color: white;
      }
      .preview-presence-pill.all-home { background: var(--c-success); }
      .preview-presence-pill.all-away { background: var(--c-alert); }
      .preview-presence-pill.mixed { background: var(--c-accent); }
      .preview-presence-persons {
        display: flex;
        gap: 12px;
        justify-content: center;
      }
      .preview-presence-person {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
      }
      .preview-presence-avatar {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background-size: cover;
        background-position: center;
        border: 2px solid var(--c-success);
      }
      .preview-presence-person.away .preview-presence-avatar {
        border-color: var(--c-alert);
        opacity: 0.6;
      }
      .preview-presence-avatar.fallback {
        background: var(--s3);
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .preview-presence-avatar.fallback ha-icon {
        --mdc-icon-size: 18px;
        color: var(--t3);
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .preview-presence-name {
        font-size: 9px;
        color: var(--t3);
        max-width: 48px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-align: center;
      }

      /* ── Presence mapping cards ── */
      .presence-mapping-card {
        margin-top: 10px;
        padding: 12px;
        background: var(--s2);
        border-radius: var(--radius-md);
        border: 1px solid var(--b1);
      }
      .presence-mapping-header {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 10px;
      }
      .presence-mapping-header .feature-icon {
        width: 28px;
        height: 28px;
      }
      .presence-mapping-field {
        margin-bottom: 8px;
      }
      .presence-mapping-field:last-child {
        margin-bottom: 0;
      }
      .presence-mapping-label {
        display: block;
        font-size: 11px;
        color: var(--t3);
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin-bottom: 4px;
      }
      .presence-mapping-field select.input {
        width: 100%;
      }

      /* ── Feature toggles ── */
      .feature-list {
        display: flex;
        flex-direction: column;
        gap: 2px;
        margin-bottom: 14px;
      }
      .feature-row {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 8px 10px;
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
      @media (hover: none) {
        .feature-row:active { animation: bounce 0.3s ease; }
      }
      .feature-row:focus-visible {
        outline: 2px solid var(--c-accent);
        outline-offset: -2px;
      }
      .feature-icon {
        width: 28px;
        height: 28px;
        border-radius: var(--radius-sm);
        background: var(--s2);
        border: 1px solid var(--b1);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }
      .feature-icon ha-icon {
        --mdc-icon-size: 14px;
        color: var(--t2);
        display: flex; align-items: center; justify-content: center;
      }
      .feature-text {
        flex: 1;
        min-width: 0;
      }
      .feature-name {
        font-size: 11px;
        font-weight: 600;
        color: var(--t1);
      }
      .feature-desc {
        font-size: 9px;
        color: var(--t3);
        margin-top: 1px;
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
        padding: 6px 10px 8px;
      }

      /* ── Threshold inputs ── */
      .threshold-list {
        display: flex;
        flex-direction: column;
        gap: 6px;
        margin-bottom: 14px;
      }
      .threshold-row {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 6px 10px;
      }
      .threshold-icon {
        width: 28px;
        height: 28px;
        border-radius: var(--radius-sm);
        background: var(--s2);
        border: 1px solid var(--b1);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }
      .threshold-icon ha-icon {
        --mdc-icon-size: 14px;
        color: var(--t2);
        display: flex; align-items: center; justify-content: center;
      }
      .threshold-icon.hot ha-icon { color: var(--c-temp-hot); }
      .threshold-icon.cold ha-icon { color: var(--c-temp-cold); }
      .threshold-icon.humidity ha-icon { color: var(--c-info); }
      .threshold-label {
        flex: 1;
        min-width: 0;
        font-size: 11px;
        font-weight: 600;
        color: var(--t2);
      }
      .threshold-input {
        width: 56px;
        height: 28px;
        border-radius: var(--radius-sm);
        border: 1px solid var(--b2);
        background: var(--s2);
        color: var(--t1);
        font-family: inherit;
        font-size: 12px;
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
        font-size: 10px;
        font-weight: 500;
        color: var(--t4);
        width: 16px;
      }

      /* ── Light row extras ── */
      .light-state {
        display: flex;
        align-items: center;
        gap: 4px;
        margin-left: auto;
        flex-shrink: 0;
      }
      .light-dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: var(--t4);
      }
      .light-dot.on {
        background: var(--c-light-glow);
        box-shadow: 0 0 6px rgba(251, 191, 36, 0.5);
      }
      .light-brightness {
        font-size: 9px;
        font-weight: 600;
        color: var(--t3);
        min-width: 28px;
        text-align: right;
      }
      .layout-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        height: 24px;
        padding: 0 8px;
        border-radius: var(--radius-sm);
        border: 1px solid var(--b2);
        background: var(--s1);
        color: var(--t3);
        font-family: inherit;
        font-size: 8px;
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
      @media (hover: none) {
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
        width: 28px;
        height: 28px;
        border-radius: var(--radius-sm);
        border: 1px solid transparent;
        background: transparent;
        color: var(--t4);
        cursor: pointer;
        flex-shrink: 0;
        padding: 0;
        transition: all var(--t-fast);
        outline: none;
        -webkit-tap-highlight-color: transparent;
        --mdc-icon-size: 16px;
      }
      .schedule-btn.active {
        color: var(--c-accent);
        border-color: rgba(129,140,248,0.25);
        background: rgba(129,140,248,0.12);
      }
      @media (hover: hover) and (pointer: fine) {
        .schedule-btn:hover {
          background: var(--s4);
          border-color: var(--b3);
          color: var(--t1);
        }
      }
      @media (hover: hover) {
        .schedule-btn:active { transform: scale(0.96); }
      }
      @media (hover: none) {
        .schedule-btn:active { animation: bounce 0.3s ease; }
      }
      .schedule-btn:focus-visible {
        outline: 2px solid var(--c-accent);
        outline-offset: 2px;
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
      @media (hover: none) {
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
        height: 1px;
        margin: 0 12px;
        background: linear-gradient(90deg, transparent, var(--b2), transparent);
        opacity: 0;
        transition: opacity var(--t-fast);
      }
      .fold-sep.visible { opacity: 1; }

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
        padding: 10px 12px 12px 36px;
      }
      .schedule-header {
        font-size: 10px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 1px;
        color: var(--t3);
        margin-bottom: 8px;
      }
      .schedule-period {
        padding: 8px 0;
        border-bottom: 1px solid var(--b1);
      }
      .schedule-period:last-of-type {
        border-bottom: none;
      }
      .schedule-row {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 6px;
      }
      .schedule-row-actions {
        justify-content: space-between;
        margin-bottom: 0;
      }
      .schedule-label {
        font-size: 11px;
        font-weight: 500;
        color: var(--t3);
        min-width: 36px;
        flex-shrink: 0;
      }
      /* ── Input (from kit) ── */
      .input {
        width: 100%;
        padding: 10px 14px;
        border-radius: 12px;
        border: 1px solid var(--b2);
        background: var(--s1);
        color: var(--t1);
        font-family: inherit;
        font-size: 13px;
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
        gap: 8px;
        padding: 0;
        background: none;
        border: none;
        cursor: pointer;
        outline: none;
        font-family: inherit;
      }
      .check-box {
        width: 18px;
        height: 18px;
        border-radius: 4px;
        border: 2px solid var(--b3);
        background: transparent;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all var(--t-fast);
        flex-shrink: 0;
        --mdc-icon-size: 12px;
      }
      .check-box ha-icon {
        opacity: 0;
        transform: scale(0);
        transition: all var(--t-fast);
        color: #fff;
      }
      .check-item.checked .check-box {
        background: var(--c-accent);
        border-color: var(--c-accent);
        box-shadow: 0 0 6px rgba(129,140,248,0.3);
      }
      .check-item.checked .check-box ha-icon {
        opacity: 1;
        transform: scale(1);
      }
      .check-label {
        font-size: 12px;
        font-weight: 500;
        color: var(--t2);
      }
      .check-desc {
        display: block;
        font-size: 9px;
        color: var(--t4);
        margin-top: 1px;
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
        width: 28px;
        height: 28px;
        border-radius: var(--radius-sm);
        border: 1px solid rgba(248,113,113,0.2);
        background: rgba(248,113,113,0.1);
        color: var(--c-alert);
        cursor: pointer;
        padding: 0;
        --mdc-icon-size: 14px;
        transition: all var(--t-fast);
        outline: none;
      }
      @media (hover: hover) and (pointer: fine) {
        .schedule-delete:hover {
          background: rgba(248,113,113,0.2);
          border-color: rgba(248,113,113,0.3);
        }
      }
      @media (hover: hover) {
        .schedule-delete:active { transform: scale(0.96); }
      }
      @media (hover: none) {
        .schedule-delete:active { animation: bounce 0.3s ease; }
      }

      /* ── Schedule add & save (btn btn-sm from kit) ── */
      .schedule-add {
        width: 100%;
        margin-top: 8px;
        border-style: dashed;
        --mdc-icon-size: 14px;
      }
      .schedule-save {
        margin-top: 8px;
        width: 100%;
      }

      /* ── Hint & explanation texts ── */
      .schedule-hint,
      .dashboard-vs-room {
        display: flex;
        align-items: flex-start;
        gap: 6px;
        margin-top: 12px;
        padding: 8px 10px;
        background: var(--s1);
        border-radius: var(--radius-sm);
        border: 1px solid var(--b1);
        font-size: 11px;
        line-height: 1.4;
        color: var(--t3);
        --mdc-icon-size: 14px;
      }
      .schedule-hint ha-icon,
      .dashboard-vs-room ha-icon {
        flex-shrink: 0;
        margin-top: 1px;
        color: var(--c-info);
        display: flex; align-items: center; justify-content: center;
      }

      /* ── DateTime display trigger ── */
      .datetime-display {
        flex: 1;
        min-width: 0;
        padding: 6px 10px;
        border-radius: 10px;
        border: 1px solid var(--b2);
        background: var(--s1);
        color: var(--t2);
        font-family: inherit;
        font-size: 11px;
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
      @media (hover: none) {
        .datetime-display:active { animation: bounce 0.3s ease; }
      }
      .datetime-display:focus-visible {
        outline: 2px solid var(--c-accent);
        outline-offset: 2px;
      }
      .datetime-display.empty { color: var(--t4); }

      /* ── DateTime picker popup ── */
      .picker-overlay {
        position: fixed;
        inset: 0;
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(0,0,0,0.5);
        backdrop-filter: blur(4px);
        animation: picker-fade-in var(--t-fast) ease-out;
      }
      @keyframes picker-fade-in {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      .picker-popup {
        width: 280px;
        padding: 16px;
        border-radius: var(--radius-lg);
        border: 1px solid var(--b2);
        background: var(--s3);
        box-shadow: 0 8px 32px rgba(0,0,0,0.4);
      }
      .picker-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 4px 10px;
      }
      .picker-month {
        font-size: 13px;
        font-weight: 700;
        color: var(--t1);
      }
      .picker-nav {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 28px;
        height: 28px;
        border-radius: var(--radius-sm);
        border: none;
        background: transparent;
        color: var(--t3);
        cursor: pointer;
        padding: 0;
        outline: none;
        transition: all var(--t-fast);
        --mdc-icon-size: 16px;
      }
      @media (hover: hover) and (pointer: fine) {
        .picker-nav:hover { background: var(--s2); color: var(--t1); }
      }
      @media (hover: none) {
        .picker-nav:active { animation: bounce 0.3s ease; }
      }
      .picker-nav:focus-visible {
        outline: 2px solid var(--c-accent);
        outline-offset: 2px;
      }
      .picker-grid {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        gap: 2px;
      }
      .picker-day-label {
        font-size: 9px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        color: var(--t4);
        text-align: center;
        padding: 4px 0;
      }
      .picker-day {
        aspect-ratio: 1;
        border-radius: var(--radius-sm);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 11px;
        font-weight: 500;
        color: var(--t3);
        background: transparent;
        border: none;
        cursor: pointer;
        transition: all var(--t-fast);
        outline: none;
        font-family: inherit;
        padding: 0;
      }
      @media (hover: hover) and (pointer: fine) {
        .picker-day:hover { background: var(--s2); color: var(--t1); }
      }
      @media (hover: none) {
        .picker-day:active { animation: bounce 0.3s ease; }
      }
      .picker-day.today { border: 1px solid var(--b3); color: var(--t1); }
      .picker-day.selected {
        background: rgba(129,140,248,0.2);
        color: var(--c-accent);
        font-weight: 700;
        border: 1px solid rgba(129,140,248,0.3);
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
        background: rgba(129,140,248,0.12);
        color: var(--c-accent);
        border-radius: 0;
      }
      .picker-day.other-month { opacity: 0.3; }

      /* ── Picker phase indicator ── */
      .picker-phase {
        display: flex;
        justify-content: center;
        gap: 8px;
        margin-bottom: 10px;
      }
      .picker-phase-btn {
        padding: 4px 12px;
        border-radius: 8px;
        border: 1px solid var(--b1);
        background: transparent;
        color: var(--t3);
        font-family: inherit;
        font-size: 11px;
        font-weight: 600;
        cursor: pointer;
        transition: all var(--t-fast);
        outline: none;
      }
      .picker-phase-btn.active {
        background: rgba(129,140,248,0.15);
        color: var(--c-accent);
        border-color: rgba(129,140,248,0.3);
      }

      /* ── Time picker ── */
      .picker-time-row {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 16px;
        margin-top: 14px;
        padding-top: 12px;
        border-top: 1px solid var(--b1);
      }
      .picker-time-group {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
      }
      .picker-time-label {
        font-size: 9px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        color: var(--t4);
      }
      .time-input {
        display: flex;
        align-items: center;
        gap: 4px;
      }
      .time-digit {
        width: 44px;
        height: 40px;
        text-align: center;
        border-radius: 10px;
        border: 1px solid var(--b2);
        background: var(--s1);
        color: var(--t1);
        font-family: inherit;
        font-size: 16px;
        font-weight: 700;
        outline: none;
        transition: border-color var(--t-fast);
      }
      .time-digit:focus { border-color: var(--c-accent); }
      .time-sep {
        font-size: 18px;
        font-weight: 700;
        color: var(--t3);
      }

      /* ── Picker confirm button ── */
      .picker-confirm {
        margin-top: 14px;
        width: 100%;
      }

      /* ── Save bar ── */
      .save-bar {
        margin-top: 16px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 8px;
      }
      .btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
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
        height: 36px;
        padding: 0 14px;
        border-radius: 12px;
        font-size: 12px;
      }
      .btn-sm {
        height: 28px;
        padding: 0 10px;
        font-size: 11px;
        border-radius: var(--radius-md);
      }
      @media (hover: hover) and (pointer: fine) {
        .btn:hover {
          background: var(--s4);
          border-color: var(--b3);
          color: var(--t1);
        }
      }
      @media (hover: none) {
        .btn:active { animation: bounce 0.3s ease; }
      }
      .btn:focus-visible {
        outline: 2px solid var(--c-accent);
        outline-offset: 2px;
      }
      .btn-accent {
        border-color: rgba(129, 140, 248, 0.25);
        background: rgba(129, 140, 248, 0.12);
        color: var(--c-accent);
      }
      @media (hover: hover) and (pointer: fine) {
        .btn-accent:hover {
          background: rgba(129, 140, 248, 0.2);
          border-color: rgba(129, 140, 248, 0.35);
        }
      }
      @media (hover: none) {
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
      @media (hover: none) {
        .btn-ghost:active { animation: bounce 0.3s ease; }
      }

      /* ── Toast ── */
      .toast {
        position: fixed;
        bottom: 32px;
        left: 50%;
        transform: translateX(-50%) translateY(20px);
        padding: 10px 18px;
        border-radius: var(--radius-lg);
        backdrop-filter: blur(20px);
        font-family: inherit;
        font-size: 12px;
        font-weight: 500;
        opacity: 0;
        z-index: 200;
        pointer-events: none;
        transition:
          opacity var(--t-fast),
          transform var(--t-fast);
        background: rgba(74, 222, 128, 0.15);
        border: 1px solid rgba(74, 222, 128, 0.2);
        color: var(--c-success);
      }
      .toast.show {
        opacity: 1;
        transform: translateX(-50%) translateY(0);
      }
      .toast.error {
        background: rgba(248, 113, 113, 0.15);
        border: 1px solid rgba(248, 113, 113, 0.2);
        color: var(--c-alert);
      }

      /* ── Entry animation ── */
      .config-panel {
        animation: panel-in 0.4s var(--ease-out) both;
      }
`;
