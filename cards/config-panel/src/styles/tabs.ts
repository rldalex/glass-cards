import { css } from 'lit';

/** Tab select dropdown + tab panel animation styles. */
export const tabStyles = css`
      /* ── Tab Select ── */
      .tab-select-wrap {
        position: relative;
        width: 100%;
        margin-bottom: 1rem;
      }
      .tab-select-trigger {
        display: flex;
        align-items: center;
        gap: 0.625rem;
        width: 100%;
        padding: 0.625rem 0.875rem;
        border-radius: var(--radius-lg);
        border: 1px solid var(--b2);
        background: var(--s1);
        color: var(--t2);
        font-family: inherit;
        font-size: var(--fz-md);
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
        --mdc-icon-size: 1rem;
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
        top: calc(100% + 0.375rem);
        left: 0;
        right: 0;
        max-height: 17.5rem;
        overflow-y: auto;
        border-radius: var(--radius-lg);
        padding: 0.25rem;
        background: #1e2433;
        border: 1px solid var(--b2);
        box-shadow: 0 12px 40px rgba(var(--rgb-black),0.5);
        z-index: 20;
        opacity: 0;
        transform: translateY(-4px);
        pointer-events: none;
        transition: all var(--t-fast);
        scrollbar-width: thin;
        scrollbar-color: rgba(var(--rgb-white),0.1) transparent;
      }
      .tab-select-menu::-webkit-scrollbar { width: 0.25rem; }
      .tab-select-menu::-webkit-scrollbar-track { background: transparent; }
      .tab-select-menu::-webkit-scrollbar-thumb { background: rgba(var(--rgb-white),0.1); border-radius: 2px; }
      .tab-select-menu::-webkit-scrollbar-thumb:hover { background: rgba(var(--rgb-white),0.2); }
      .tab-select-wrap.open .tab-select-menu {
        opacity: 1;
        transform: translateY(0);
        pointer-events: all;
      }
      .tab-select-search {
        width: calc(100% - 0.5rem);
        margin: 0.25rem;
        padding: 0.4375rem 0.625rem;
        border-radius: var(--radius-sm);
        border: 1px solid var(--b1);
        background: var(--s1);
        color: var(--t1);
        font-family: inherit;
        font-size: var(--fz-base);
        outline: none;
      }
      .tab-select-search::placeholder { color: var(--t4); }
      .tab-select-option {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 0.75rem;
        border-radius: var(--radius-md);
        font-size: var(--fz-base);
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
        --mdc-icon-size: 1rem;
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
`;
