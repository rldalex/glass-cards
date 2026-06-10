import { css } from 'lit';

export const vacuumCardStyles = css`
      :host {
        --rgb-info: 96, 165, 250;
        --rgb-warning: 251, 191, 36;
        --rgb-accent: 129, 140, 248;
        width: 100%;
        max-width: 31.25rem;
        margin: 0 auto;
        color: var(--t1);
      }
      .card-inner {
        display: flex;
        flex-direction: column;
        position: relative;
        z-index: 1;
      }
      .card-header {
        display: flex; align-items: center; justify-content: space-between;
        padding: 0 0.375rem; margin-bottom: 0.375rem; min-height: 1.375rem;
      }
      .card-title {
        font-size: var(--fz-xs); font-weight: 700; text-transform: uppercase;
        letter-spacing: 1.5px; color: var(--t4);
      }
      .placeholder {
        padding: 1rem;
        font-size: var(--fz-md);
        color: var(--t2);
      }
      .vacuum-icon {
        --mdc-icon-size: 1.5rem;
        color: var(--t2);
        flex-shrink: 0;
      }
      .status-info {
        flex: 1 1 auto;
        display: flex;
        flex-direction: column;
        gap: 0.125rem;
        min-width: 0;
      }
      .vacuum-name {
        font-size: var(--fz-md);
        font-weight: 600;
        color: var(--t1);
        line-height: 1.2;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .status-text {
        font-size: var(--fz-sm);
        font-weight: 500;
        color: var(--t3);
        line-height: 1.2;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .dot {
        width: 0.5rem;
        height: 0.5rem;
        border-radius: 50%;
        flex-shrink: 0;
      }
      .dot-success { background: var(--c-success); box-shadow: 0 0 6px rgba(74,222,128,0.5); }
      .dot-alert   { background: var(--c-alert);   box-shadow: 0 0 6px rgba(248,113,113,0.5); }
      .dot-warning { background: var(--c-warning); box-shadow: 0 0 6px rgba(251,191,36,0.5); }
      .dot-info    { background: var(--c-info);    box-shadow: 0 0 6px rgba(96,165,250,0.5); }
      .dot-off     { background: var(--t4); }
      .battery {
        display: inline-flex;
        align-items: center;
        gap: 0.25rem;
        font-size: var(--fz-sm);
        font-weight: 600;
        flex-shrink: 0;
      }
      .battery ha-icon {
        --mdc-icon-size: 1.125rem;
      }
      .battery.charging ha-icon {
        animation: vac-pulse 2s ease-in-out infinite;
      }
      @keyframes vac-pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.55; }
      }
      @keyframes vac-pulse-alert {
        0%, 100% { border-color: rgba(var(--rgb-alert), 0.4); }
        50%      { border-color: rgba(var(--rgb-alert), 1); }
      }
      @keyframes vac-pulse-warning {
        0%, 100% { border-color: rgba(var(--rgb-warning), 0.4); }
        50%      { border-color: rgba(var(--rgb-warning), 1); }
      }
      .glass.alert-pulse   { animation: vac-pulse-alert 2s ease-in-out infinite; border-width: 1.5px; }
      .glass.warning-pulse { animation: vac-pulse-warning 2.4s ease-in-out infinite; border-width: 1.5px; }
      .rooms-section {
        padding: 0.5rem 0 0.75rem;
      }
      .rooms-scroller {
        overflow-x: auto;
        overflow-y: hidden;
        scrollbar-width: none;
        mask-image: linear-gradient(90deg, black 0, black calc(100% - 14px), transparent);
        -webkit-mask-image: linear-gradient(90deg, black 0, black calc(100% - 14px), transparent);
      }
      .rooms-scroller::-webkit-scrollbar {
        display: none;
      }
      .rooms-track {
        display: inline-flex;
        align-items: center;
        gap: 0.375rem;
        padding: 0 1.5rem 0 0.875rem;
      }
      .rooms-sep-v {
        display: inline-block;
        width: 1px;
        height: 1.25rem;
        background: var(--b1);
        flex-shrink: 0;
        margin: 0 0.125rem;
      }
      .dot.pulsing {
        animation: vac-dot-pulse 1.5s ease-in-out infinite;
      }
      @keyframes vac-dot-pulse {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.5; transform: scale(0.85); }
      }
      .transport {
        display: flex;
        gap: 0.5rem;
        padding: 0.5rem 0.75rem 0.75rem;
        align-items: center;
      }
      .transport-error {
        gap: 0.5rem;
      }
      .transport-error glass-button {
        flex: 1 1 auto;
      }
      .stop-confirm {
        flex: 1 1 auto;
      }
      @keyframes vac-locate-flash {
        0% { transform: scale(1); }
        30% { transform: scale(1.2); }
        60% { transform: scale(1); }
        100% { transform: scale(1); }
      }
      .locate-flashing {
        animation: vac-locate-flash 1.5s ease-out;
      }
      .compact {
        box-sizing: border-box;
        display: flex;
        align-items: center;
        gap: 0.625rem;
        width: 100%;
        padding: 0.4375rem 0.875rem;
        border-radius: var(--radius-xl);
        min-height: 3.25rem;
        background: none;
        border: none;
        font-size: inherit;
        color: var(--t1);
        cursor: pointer;
        text-align: left;
        font-family: inherit;
        outline: none;
        -webkit-tap-highlight-color: transparent;
      }
      .compact:focus-visible {
        outline: 2px solid rgba(var(--rgb-white),0.25);
        outline-offset: 2px;
      }
      .compact .unavailable-badge {
        position: static;
        flex-shrink: 0;
        --mdc-icon-size: 1rem;
        color: var(--c-warning);
      }
      .ctrl-fold {
        display: grid;
        grid-template-rows: 0fr;
        transition: grid-template-rows var(--t-layout);
        pointer-events: none;
      }
      .ctrl-fold.open {
        grid-template-rows: 1fr;
        pointer-events: auto;
      }
      .ctrl-fold-inner {
        overflow: hidden;
        opacity: 0;
        transition: opacity var(--t-med) 0.1s;
      }
      .ctrl-fold.open .ctrl-fold-inner {
        opacity: 1;
      }
      .fold-content {
        display: flex;
        flex-direction: column;
      }
      .fold-sep {
        height: 1px;
        background: linear-gradient(90deg, transparent, rgba(var(--rgb-accent), 0.18), transparent);
        margin: 0 0.75rem;
      }
      .fold-sep.top {
        margin-bottom: 0.5rem;
      }
      .fold-sep.bottom {
        margin-top: 0.5rem;
      }
      .fold-section {
        padding: 0.5rem 0.875rem 0.75rem;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }
      .chips-row {
        display: flex;
        flex-wrap: nowrap;
        gap: 0.375rem;
        overflow-x: auto;
        scrollbar-width: none;
        padding-bottom: 0.125rem;
      }
      .chips-row::-webkit-scrollbar {
        display: none;
      }
      .chips-row glass-chip {
        flex-shrink: 0;
      }
      .rooms-track glass-chip {
        flex-shrink: 0;
      }
      .status-row {
        display: flex;
        flex-wrap: wrap;
        gap: 0.375rem;
        margin-top: 0.25rem;
      }
      .badge {
        display: inline-flex;
        align-items: center;
        gap: 0.375rem;
        padding: 0.25rem 0.625rem;
        border-radius: 20px;
        font-size: var(--fz-sm);
        font-weight: 600;
      }
      .badge ha-icon {
        --mdc-icon-size: 0.9rem;
      }
      .badge-success { background: rgba(74,222,128,0.15);  color: var(--c-success); }
      .badge-alert   { background: rgba(248,113,113,0.15); color: var(--c-alert); }
      .badge-warning { background: rgba(251,191,36,0.15);  color: var(--c-warning); }
      .badge-info    { background: rgba(96,165,250,0.15);  color: var(--c-info); }
      .badge-off     { background: var(--s1); color: var(--t3); border: 1px solid var(--b1); }
      .dock-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(5.5rem, 1fr));
        gap: 0.375rem;
      }
      .dock-cell {
        display: flex;
        align-items: center;
        gap: 0.375rem;
        padding: 0.3125rem 0.5rem;
        background: var(--s1);
        border: 1px solid var(--b1);
        border-radius: var(--radius-md);
        min-height: 1.75rem;
        transition: background var(--t-fast), border-color var(--t-fast);
      }
      .dock-cell ha-icon {
        --mdc-icon-size: 0.9rem;
        flex-shrink: 0;
      }
      .dock-cell.success { background: rgba(74,222,128,0.08);  border-color: rgba(74,222,128,0.25); }
      .dock-cell.alert   { background: rgba(248,113,113,0.08); border-color: rgba(248,113,113,0.25); }
      .dock-cell.warning { background: rgba(251,191,36,0.08);  border-color: rgba(251,191,36,0.25); }
      .dock-cell.info    { background: rgba(96,165,250,0.08);  border-color: rgba(96,165,250,0.25); }
      .dock-label {
        font-size: var(--fz-xs);
        color: var(--t2);
        line-height: 1.2;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .conso-row {
        display: flex;
        flex-direction: column;
        gap: 0.3125rem;
      }
      .conso-header {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        font-size: var(--fz-sm);
      }
      .conso-label {
        color: var(--t2);
      }
      .conso-value {
        font-weight: 600;
      }
      .stats-row {
        font-size: var(--fz-sm);
        color: var(--t2);
        line-height: 1.4;
      }
      .stats-totals {
        color: var(--t3);
      }
      button:focus-visible {
        outline: 2px solid rgba(255, 255, 255, 0.35);
        outline-offset: 2px;
      }
      @media (prefers-reduced-motion: reduce) {
        .battery.charging ha-icon {
          animation: none;
        }
        .dot.pulsing {
          animation: none;
        }
        .locate-flashing {
          animation: none;
        }
        .glass.alert-pulse,
        .glass.warning-pulse {
          animation: none;
        }
        .glass.alert-pulse   { border-color: var(--c-alert); }
        .glass.warning-pulse { border-color: var(--c-warning); }
        .ctrl-fold {
          transition: none;
        }
        .ctrl-fold-inner {
          transition: none;
        }
      }
    `;
