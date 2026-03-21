import { css } from 'lit';

/** Preview component styles — mini card renderings for all tabs. */
export const previewStyles = css`
      /* ── Preview ── */
      .preview-encart {
        margin-bottom: 0.875rem;
        padding: 0.75rem;
        border-radius: var(--radius-lg);
        background: var(--s1);
        border: 1px solid var(--b1);
      }
      .preview-label {
        font-size: var(--fz-xxs);
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 1.2px;
        color: var(--t4);
        margin-bottom: 0.5rem;
      }

      /* Preview navbar — miniature faithful to real navbar */
      .preview-navbar {
        display: flex;
        align-items: center;
        gap: 0.1875rem;
        padding: 0 0.375rem;
        height: 2.875rem;
        border-radius: var(--radius-lg);
        background: linear-gradient(
          135deg,
          rgba(var(--rgb-white), 0.08) 0%,
          rgba(var(--rgb-white), 0.03) 50%,
          rgba(var(--rgb-white), 0.06) 100%
        );
        backdrop-filter: blur(50px) saturate(1.5);
        -webkit-backdrop-filter: blur(50px) saturate(1.5);
        box-shadow:
          inset 0 1px 0 0 rgba(var(--rgb-white), 0.1),
          0 20px 60px rgba(var(--rgb-black), 0.4),
          0 4px 16px rgba(var(--rgb-black), 0.25);
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
        gap: 0.3125rem;
        height: 2.125rem;
        min-width: 2.125rem;
        padding: 0 0.5rem;
        border-radius: var(--radius-md);
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
        --mdc-icon-size: 1.125rem;
        flex-shrink: 0;
        display: flex; align-items: center; justify-content: center;
      }
      .preview-nav-item.hidden-preview {
        opacity: 0.2;
      }
      .preview-nav-item.active-preview {
        background: rgba(var(--rgb-white), 0.1);
        color: var(--t1);
      }
      .preview-nav-item.active-preview ha-icon {
        color: var(--t1);
      }
      .preview-nav-label {
        font-size: var(--fz-sm);
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
        filter: drop-shadow(0 0 6px rgba(var(--rgb-light-glow), 0.6));
        animation: pulse-light 3s ease-in-out infinite;
      }
      @keyframes pulse-light {
        0%, 100% { filter: drop-shadow(0 0 6px rgba(var(--rgb-light-glow), 0.6)); }
        50% { filter: drop-shadow(0 0 2px rgba(var(--rgb-light-glow), 0.2)); }
      }
      .preview-nav-item.has-humidity::after {
        content: '';
        position: absolute;
        bottom: 0.1875rem;
        left: 50%;
        transform: translateX(-50%);
        width: 0.75rem;
        height: 0.125rem;
        border-radius: 2px;
        background: var(--c-info);
        opacity: 0.8;
        box-shadow: 0 0 6px rgba(var(--rgb-info), 0.4);
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
        top: 0.0625rem;
        right: 0.1875rem;
        width: 0.75rem;
        height: 0.75rem;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        pointer-events: none;
        transition: opacity var(--t-fast);
      }
      .preview-temp-badge ha-icon {
        --mdc-icon-size: 0.5rem;
      }
      .preview-nav-item.has-temp-hot .preview-temp-badge {
        opacity: 1;
        color: var(--c-temp-hot);
        filter: drop-shadow(0 0 4px rgba(var(--rgb-alert), 0.6));
        animation: pulse-temp-hot 2s infinite ease-in-out;
      }
      .preview-nav-item.has-temp-cold .preview-temp-badge {
        opacity: 1;
        color: var(--c-temp-cold);
        filter: drop-shadow(0 0 4px rgba(var(--rgb-info), 0.6));
        animation: pulse-temp-cold 2s infinite ease-in-out;
      }
      @keyframes pulse-temp-hot {
        0%, 100% { transform: scale(1); filter: drop-shadow(0 0 0 transparent); }
        50% { transform: scale(1.15); filter: drop-shadow(0 0 6px rgba(var(--rgb-alert), 0.6)); }
      }
      @keyframes pulse-temp-cold {
        0%, 100% { transform: scale(1); filter: drop-shadow(0 0 0 transparent); }
        50% { transform: scale(1.15); filter: drop-shadow(0 0 6px rgba(var(--rgb-info), 0.6)); }
      }

      /* Preview popup — faithful miniature of real popup */
      .preview-popup {
        border-radius: var(--radius-lg);
        background: linear-gradient(
          135deg,
          rgba(var(--rgb-white), 0.08) 0%,
          rgba(var(--rgb-white), 0.03) 50%,
          rgba(var(--rgb-white), 0.06) 100%
        );
        backdrop-filter: blur(50px) saturate(1.5);
        -webkit-backdrop-filter: blur(50px) saturate(1.5);
        box-shadow:
          inset 0 1px 0 0 rgba(var(--rgb-white), 0.1),
          0 20px 60px rgba(var(--rgb-black), 0.4),
          0 4px 16px rgba(var(--rgb-black), 0.25);
        border: 1px solid var(--b2);
        padding: 0.75rem;
        overflow: hidden;
      }
      .preview-popup-header {
        display: flex;
        align-items: center;
        gap: 0.625rem;
        margin-bottom: 0.5rem;
      }
      .preview-popup-header-left {
        display: flex;
        flex-direction: column;
        align-items: center;
        flex-shrink: 0;
      }
      .preview-popup-icon-box {
        width: 1.875rem;
        height: 1.875rem;
        border-radius: var(--radius-md);
        background: var(--s2);
        border: 1px solid var(--b1);
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--t2);
      }
      .preview-popup-icon-box ha-icon {
        --mdc-icon-size: 0.9375rem;
        display: flex; align-items: center; justify-content: center;
      }
      .preview-popup-icon-box.has-light ha-icon {
        color: var(--c-light-glow);
        filter: drop-shadow(0 0 5px rgba(var(--rgb-light-glow), 0.6));
      }
      .preview-popup-icon-box.has-music ha-icon {
        animation: pulse-music 0.8s ease-in-out infinite;
      }
      .preview-popup-scene-dash {
        width: 0.625rem;
        height: 0.125rem;
        background: var(--t4);
        border-radius: 4px;
        margin-top: 0.25rem;
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
        font-size: var(--fz-base);
        font-weight: 700;
        color: var(--t1);
        line-height: 1.2;
      }
      .preview-popup-meta {
        display: flex;
        gap: 0.5rem;
        font-size: var(--fz-xs);
        font-weight: 500;
        color: var(--t3);
        margin-top: 0.125rem;
      }
      .preview-popup-close {
        width: 1.25rem;
        height: 1.25rem;
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
        --mdc-icon-size: 0.625rem;
        display: flex; align-items: center; justify-content: center;
      }

      /* Preview popup scenes */
      .preview-popup-scenes {
        display: flex;
        flex-wrap: wrap;
        gap: 0.25rem;
        padding-bottom: 0.5rem;
      }
      .preview-scene-chip {
        background: rgba(var(--rgb-white), 0.04);
        border: 1px solid var(--b1);
        border-radius: var(--radius-md);
        padding: 0.1875rem 0.5rem;
        font-size: var(--fz-xxs);
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
        gap: 0.25rem;
      }
      .preview-card-slot {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.375rem 0.5rem;
        border-radius: var(--radius-sm);
        background: var(--s1);
        border: 1px solid var(--b1);
        transition: opacity var(--t-fast);
      }
      .preview-card-slot ha-icon {
        --mdc-icon-size: 0.875rem;
        color: var(--t3);
        display: flex; align-items: center; justify-content: center;
      }
      .preview-card-slot-name {
        font-size: var(--fz-sm);
        font-weight: 600;
        color: var(--t2);
      }
      .preview-card-slot-count {
        margin-left: auto;
        font-size: var(--fz-xs);
        font-weight: 600;
        color: var(--t4);
        padding: 0.0625rem 0.375rem;
        border-radius: var(--radius-full);
        background: var(--s2);
        border: 1px solid var(--b1);
      }
      .preview-empty {
        font-size: var(--fz-sm);
        font-weight: 500;
        color: var(--t4);
        text-align: center;
        padding: 0.75rem 0;
      }

      /* Variant picker */
      .variant-picker {
        display: flex; gap: 0.375rem; margin-top: 0.375rem;
      }

      /* Preview media hero card — full-bleed artwork style */
      .preview-media {
        position: relative; overflow: hidden;
        border-radius: var(--radius-xl);
        min-height: 12.5rem;
        display: flex; flex-direction: column;
        border: 1px solid var(--b2);
        box-shadow: 0 8px 32px rgba(var(--rgb-black),0.25), 0 2px 8px rgba(var(--rgb-black),0.15);
      }
      .mp-art-bg {
        position: absolute; inset: 0; z-index: 0;
        background: linear-gradient(135deg, #1a1040 0%, #2d1b69 30%, #4a2c8a 60%, #1a1040 100%);
      }
      .mp-gradient {
        position: absolute; inset: 0; z-index: 1; pointer-events: none;
        background: linear-gradient(to top,
          rgba(var(--rgb-black),0.85) 0%,
          rgba(var(--rgb-black),0.4) 40%,
          rgba(var(--rgb-black),0.15) 70%,
          transparent 100%
        );
      }
      .mp-content {
        position: relative; z-index: 2;
        display: flex; flex-direction: column;
        padding: 0.625rem 0.75rem; flex: 1;
      }
      .mp-top {
        display: flex; align-items: center; justify-content: space-between;
      }
      .mp-pill {
        display: inline-flex; align-items: center; gap: 0.25rem;
        padding: 0.1875rem 0.5rem 0.1875rem 0.3125rem;
        border-radius: var(--radius-full);
        backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
        background: rgba(var(--rgb-black),0.35); border: 1px solid rgba(var(--rgb-white),0.08);
        font-size: var(--fz-xxs); font-weight: 600; color: rgba(var(--rgb-white),0.9);
      }
      .mp-pill ha-icon { --mdc-icon-size: 0.625rem; display: flex; align-items: center; justify-content: center; }
      .mp-eq {
        display: flex; align-items: flex-end; gap: 0.0938rem;
        height: 0.625rem; margin-left: 0.25rem;
      }
      .mp-eq-bar {
        width: 0.125rem; border-radius: 1px;
        background: #fff;
        filter: drop-shadow(0 0 3px rgba(var(--rgb-white),0.6));
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
        background: rgba(var(--rgb-black),0.3);
        border: 1px solid rgba(var(--rgb-white),0.06);
        border-radius: var(--radius-lg);
        padding: 0.625rem 0.75rem 0.5rem;
      }
      .mp-track {
        display: flex; flex-direction: column; gap: 0.125rem;
      }
      .mp-track-title {
        font-size: var(--fz-md); font-weight: 700; color: #fff; line-height: 1.15;
        text-shadow: 0 1px 6px rgba(var(--rgb-black),0.4);
      }
      .mp-track-artist {
        font-size: var(--fz-sm); font-weight: 500; color: rgba(var(--rgb-white),0.7);
      }
      .mp-track-meta {
        display: flex; align-items: center; gap: 0.375rem; margin-top: 0.0625rem;
      }
      .mp-track-time { font-size: var(--fz-xxs); color: rgba(var(--rgb-white),0.4); font-variant-numeric: tabular-nums; }
      .mp-track-source {
        font-size: var(--fz-xxs); font-weight: 700; text-transform: uppercase;
        letter-spacing: 0.4px; color: rgba(var(--rgb-white),0.4);
        padding: 0.0625rem 0.25rem; border-radius: 3px; background: rgba(var(--rgb-white),0.06);
      }
      .mp-progress {
        position: relative; width: 100%; height: 0.1875rem;
        border-radius: 1.5px; background: rgba(var(--rgb-white),0.08); margin-top: 0.375rem;
      }
      .mp-progress-fill {
        position: absolute; top: 0; left: 0; height: 100%; width: 67%;
        border-radius: inherit;
        background: rgba(var(--rgb-accent),0.8);
        box-shadow: 0 0 6px rgba(var(--rgb-accent),0.4);
      }
      .mp-transport {
        display: flex; align-items: center; justify-content: center; gap: 0.375rem;
        margin-top: 0.5rem;
      }
      .mp-btn {
        width: 1.5rem; height: 1.5rem; border-radius: var(--radius-xs);
        background: transparent; border: none;
        display: flex; align-items: center; justify-content: center;
        color: rgba(var(--rgb-white),0.45); padding: 0;
      }
      .mp-btn ha-icon { --mdc-icon-size: 0.875rem; display: flex; align-items: center; justify-content: center; }
      .mp-btn.skip { width: 1.75rem; height: 1.75rem; }
      .mp-btn.skip ha-icon { --mdc-icon-size: 1.125rem; }
      .mp-btn.main {
        width: 2.125rem; height: 2.125rem; border-radius: var(--radius-md);
        background: rgba(var(--rgb-accent),0.1); border: 1px solid rgba(var(--rgb-accent),0.15);
        color: rgba(var(--rgb-accent),0.8);
      }
      .mp-btn.main ha-icon { --mdc-icon-size: 1.125rem; }

      /* Preview light card */
      .preview-light {
        border-radius: var(--radius-lg);
        overflow: hidden;
      }
      .preview-light-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 0.25rem;
        padding: 0 0.25rem;
      }
      .preview-light-header-left {
        display: flex;
        align-items: center;
        gap: 0.375rem;
      }
      .preview-light-title {
        font-size: var(--fz-xxs);
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 1.5px;
        color: var(--t4);
      }
      .preview-light-count {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-width: 0.875rem;
        height: 0.875rem;
        padding: 0 0.25rem;
        border-radius: var(--radius-full);
        font-size: var(--fz-xxs);
        font-weight: 700;
      }
      .preview-light-count.none {
        background: var(--s2);
        color: var(--t3);
      }
      .preview-light-count.some {
        background: rgba(var(--rgb-light-glow), 0.15);
        color: var(--c-light-glow);
      }
      .preview-light-count.all {
        background: rgba(var(--rgb-light-glow), 0.2);
        color: var(--c-light-glow);
      }
      .preview-light-toggle {
        width: 1.75rem;
        height: 0.875rem;
        border-radius: var(--radius-sm);
        background: var(--s2);
        border: 1px solid var(--b2);
        position: relative;
        pointer-events: none;
      }
      .preview-light-toggle::after {
        content: '';
        position: absolute;
        top: 0.125rem;
        left: 0.125rem;
        width: 0.5rem;
        height: 0.5rem;
        border-radius: 50%;
        background: var(--t3);
        transition: transform var(--t-fast), background var(--t-fast);
      }
      .preview-light-toggle.on {
        background: rgba(var(--rgb-light-glow), 0.2);
        border-color: rgba(var(--rgb-light-glow), 0.3);
      }
      .preview-light-toggle.on::after {
        transform: translateX(14px);
        background: var(--c-light-glow);
        box-shadow: 0 0 6px rgba(var(--rgb-light-glow), 0.4);
      }
      .preview-light-body {
        border-radius: var(--radius-lg);
        background: linear-gradient(
          135deg,
          rgba(var(--rgb-white), 0.06) 0%,
          rgba(var(--rgb-white), 0.02) 100%
        );
        box-shadow:
          inset 0 1px 0 0 rgba(var(--rgb-white), 0.08),
          0 8px 24px rgba(var(--rgb-black), 0.3);
        border: 1px solid var(--b1);
        padding: 0.5rem;
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
        gap: 0.375rem;
        grid-column: 1 / -1;
        padding: 0.3125rem 0.25rem;
        border-radius: var(--radius-xs);
        transition: opacity var(--t-fast);
      }
      .preview-light-row.compact {
        grid-column: span 1;
      }
      .preview-light-row.compact-right {
        padding-left: 0.5rem;
        position: relative;
      }
      .preview-light-row.compact-right::before {
        content: '';
        position: absolute;
        left: 0;
        top: 20%;
        bottom: 20%;
        width: 0.0625rem;
        background: linear-gradient(
          to bottom,
          transparent,
          rgba(var(--rgb-white), 0.08) 30%,
          rgba(var(--rgb-white), 0.08) 70%,
          transparent
        );
      }
      .preview-light-row.hidden-light {
        opacity: 0.2;
      }
      .preview-light-icon {
        width: 1.5rem;
        height: 1.5rem;
        border-radius: var(--radius-xs);
        background: var(--s2);
        border: 1px solid var(--b1);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        color: var(--t3);
      }
      .preview-light-icon ha-icon {
        --mdc-icon-size: 0.75rem;
        display: flex; align-items: center; justify-content: center;
      }
      .preview-light-icon.on {
        background: rgba(var(--rgb-light-glow), 0.1);
        border-color: rgba(var(--rgb-light-glow), 0.15);
        color: var(--c-light-glow);
        filter: drop-shadow(0 0 4px rgba(var(--rgb-light-glow), 0.4));
      }
      .preview-light-info {
        flex: 1;
        min-width: 0;
      }
      .preview-light-name {
        font-size: var(--fz-xs);
        font-weight: 600;
        color: var(--t1);
        line-height: 1.2;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .preview-light-sub {
        font-size: var(--fz-xxs);
        font-weight: 500;
        color: var(--t3);
        margin-top: 0.0625rem;
      }
      .preview-light-row[data-on='true'] .preview-light-sub {
        color: rgba(var(--rgb-light-glow), 0.55);
      }
      .preview-light-dot {
        width: 0.25rem;
        height: 0.25rem;
        border-radius: 50%;
        flex-shrink: 0;
        background: var(--t4);
        transition: background var(--t-fast), box-shadow var(--t-fast);
      }
      .preview-light-dot.on {
        background: var(--c-light-glow);
        box-shadow: 0 0 6px rgba(var(--rgb-light-glow), 0.5);
      }
      .preview-light-tint {
        position: absolute;
        inset: 0;
        border-radius: inherit;
        pointer-events: none;
        transition: opacity var(--t-slow);
      }
      .preview-light-sched {
        --mdc-icon-size: 0.625rem;
        color: var(--c-accent);
        flex-shrink: 0;
        opacity: 0.7;
      }
      .preview-light-layout-tag {
        font-size: var(--fz-xxs);
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        color: var(--t4);
        background: var(--s2);
        border: 1px solid var(--b1);
        border-radius: 3px;
        padding: 0.0625rem 0.25rem;
        flex-shrink: 0;
      }

      /* ── Preview weather (realistic miniature) ── */
      .preview-weather-wrap {
        display: flex; flex-direction: column; gap: 0.25rem;
      }
      .pw-card-header {
        display: flex; align-items: center; justify-content: space-between;
        padding: 0 0.25rem;
      }
      .pw-card-title {
        font-size: var(--fz-xxs); font-weight: 700;
        text-transform: uppercase; letter-spacing: 1.2px;
        color: var(--t4);
      }
      .pw-card-location {
        font-size: var(--fz-xxs); font-weight: 500; color: var(--t3);
      }

      /* ── Preview title card ── */
      .preview-title-card {
        display: flex; flex-direction: column; align-items: center;
        gap: 0.25rem; padding: 0.5rem 0.75rem; text-align: center;
      }
      .preview-title-text {
        font-size: var(--fz-lg); font-weight: 700; color: var(--t1);
        letter-spacing: -0.3px; line-height: 1.2;
        display: flex; align-items: center; gap: 0.625rem;
        width: 100%;
      }
      .preview-title-text::before, .preview-title-text::after {
        content: ''; flex: 1; height: 0.0625rem;
        background: linear-gradient(90deg, transparent, var(--b3));
      }
      .preview-title-text::after {
        background: linear-gradient(90deg, var(--b3), transparent);
      }
      .yaml-block {
        background: var(--s1); border: 1px solid var(--b1);
        border-radius: var(--radius-md); padding: 0.625rem 0.875rem;
        font-family: 'Courier New', monospace; font-size: var(--fz-sm);
        line-height: 1.5; color: var(--t3);
        overflow-x: auto; white-space: pre; margin: 0.5rem 0 0;
        user-select: all; -webkit-user-select: all;
      }
      .preview-period {
        display: flex; align-items: center; justify-content: center;
        font-size: var(--fz-xs); font-weight: 500; text-transform: uppercase;
        letter-spacing: 1.5px; user-select: none;
      }
      .preview-title-dash {
        display: flex; align-items: center; justify-content: center;
        padding: 0.125rem 0;
      }
      .preview-dash-line {
        width: 1.25rem; height: 0.125rem; border-radius: 1px;
        background: var(--t4);
        transition: all var(--t-med);
      }

      .preview-weather {
        border-radius: var(--radius-lg);
        background: linear-gradient(
          135deg,
          rgba(var(--rgb-white), 0.08) 0%,
          rgba(var(--rgb-white), 0.03) 50%,
          rgba(var(--rgb-white), 0.06) 100%
        );
        backdrop-filter: blur(50px) saturate(1.5);
        -webkit-backdrop-filter: blur(50px) saturate(1.5);
        box-shadow:
          inset 0 1px 0 0 rgba(var(--rgb-white), 0.1),
          0 20px 60px rgba(var(--rgb-black), 0.4),
          0 4px 16px rgba(var(--rgb-black), 0.25);
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
        padding: 0.625rem;
        display: flex; flex-direction: column; gap: 0.375rem;
      }
      .pw-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
      }
      .pw-header-left {
        display: flex; flex-direction: column; gap: 0.0625rem;
      }
      .pw-time {
        font-size: var(--fz-xl); font-weight: 300; color: var(--t1); line-height: 1;
        font-variant-numeric: tabular-nums;
      }
      .pw-time .pw-sec {
        font-size: var(--fz-xxs); font-weight: 400; color: var(--t4);
      }
      .pw-date {
        font-size: var(--fz-xxs); color: var(--t3);
        text-transform: capitalize;
      }
      .pw-date::first-letter { font-weight: 700; }
      .pw-header-right {
        display: flex; flex-direction: column; align-items: flex-end; gap: 0.125rem;
      }
      .pw-temp {
        font-size: var(--fz-xl); font-weight: 700; color: var(--t1); line-height: 1;
      }
      .pw-temp-unit {
        font-size: var(--fz-xxs); font-weight: 400; color: var(--t3); vertical-align: super;
      }
      .pw-cond {
        display: flex; align-items: center; gap: 0.1875rem;
        font-size: var(--fz-xxs); font-weight: 500; color: var(--t3);
      }
      .pw-cond ha-icon {
        --mdc-icon-size: 0.625rem;
        display: flex; align-items: center; justify-content: center;
        color: var(--t3);
      }
      .pw-feels {
        font-size: var(--fz-xxs); color: var(--t4);
      }
      /* ── Sparkline ── */
      .pw-spark-zone {
        height: 2.75rem; position: relative; overflow: hidden;
        border-radius: var(--radius-sm);
      }
      .pw-spark-svg {
        display: block; width: 100%; height: 100%;
      }
      .pw-spark-now {
        position: absolute; top: 0; bottom: 1rem; width: 0.0625rem;
        background: linear-gradient(180deg, transparent 0%, rgba(var(--rgb-white),0.5) 30%, rgba(var(--rgb-white),0.5) 70%, transparent 100%);
        transform: translateX(-50%);
      }
      .pw-spark-now-dot {
        position: absolute; left: 50%; transform: translate(-50%, -50%);
        width: 0.25rem; height: 0.25rem; border-radius: 50%;
        background: white;
        box-shadow: 0 0 4px rgba(var(--rgb-white),0.8);
      }
      .pw-spark-labels {
        position: absolute; bottom: 0; left: 0; right: 0; height: 0.75rem;
      }
      .pw-spark-lbl {
        position: absolute; transform: translateX(-50%);
        font-size: var(--fz-xxs); color: var(--t4);
        font-variant-numeric: tabular-nums;
      }
      /* ── Metrics ── */
      .pw-metrics {
        display: grid;
        gap: 0.0625rem;
        border-radius: var(--radius-sm);
        background: var(--b1);
        overflow: hidden;
      }
      .pw-metric {
        display: flex; align-items: center; justify-content: center; gap: 0.125rem;
        padding: 0.25rem 0.1875rem;
        background: var(--s1);
      }
      .pw-metric ha-icon {
        --mdc-icon-size: 0.5625rem;
        width: 0.5625rem; height: 0.5625rem;
        display: flex; align-items: center; justify-content: center;
        color: var(--t4);
      }
      .pw-metric.humidity ha-icon { color: rgba(var(--rgb-info),0.5); }
      .pw-metric.wind ha-icon { color: rgba(110,231,183,0.5); }
      .pw-metric.pressure ha-icon { color: rgba(148,163,184,0.5); }
      .pw-metric.uv ha-icon { color: rgba(var(--rgb-warning),0.5); }
      .pw-metric.visibility ha-icon { color: rgba(148,163,184,0.4); }
      .pw-metric.sunrise ha-icon { color: rgba(var(--rgb-warning),0.4); }
      .pw-metric.sunset ha-icon { color: rgba(251,146,60,0.5); }
      .pw-metric-val { font-size: var(--fz-xxs); font-weight: 600; color: var(--t2); }
      .pw-metric-unit { font-size: var(--fz-xxs); font-weight: 400; color: var(--t4); }
      .pw-metric-dir { font-size: var(--fz-xxs); font-weight: 700; color: var(--t3); }
      /* ── Forecast ── */
      .pw-forecast-zone {
        display: flex; flex-direction: column; gap: 0.25rem;
      }
      .pw-tabs {
        display: flex; justify-content: center; gap: 0.25rem;
      }
      .pw-tab {
        font-size: var(--fz-xxs); font-weight: 600; letter-spacing: 0.5px; text-transform: uppercase;
        color: var(--t4);
        padding: 0.125rem 0.375rem;
        border-radius: var(--radius-full);
        border: 1px solid var(--b1);
        background: transparent;
      }
      .pw-tab.active {
        color: var(--t1);
        background: var(--s4);
        border-color: var(--b3);
      }
      .pw-fold-sep {
        height: 0.0625rem;
        background: linear-gradient(90deg, transparent, var(--b2), transparent);
        opacity: 0.3;
      }
      .pw-daily-list {
        display: flex; flex-direction: column; gap: 0.0625rem;
      }
      .pw-day-row {
        display: grid;
        grid-template-columns: 28px 14px 1fr 24px;
        align-items: center;
        gap: 0.25rem;
        padding: 0.125rem 0.25rem;
        border-radius: var(--radius-sm);
      }
      .pw-day-row.today {
        background: var(--s2);
      }
      .pw-day-label {
        font-size: var(--fz-xxs); font-weight: 600; color: var(--t3);
      }
      .pw-day-row.today .pw-day-label { color: var(--t2); }
      .pw-day-icon {
        --mdc-icon-size: 0.625rem;
        display: flex; align-items: center; justify-content: center;
        color: var(--t3);
      }
      .pw-day-temps {
        display: flex; align-items: baseline; gap: 0.1875rem;
      }
      .pw-day-high {
        font-size: var(--fz-xxs); font-weight: 700; color: var(--t2);
      }
      .pw-day-low {
        font-size: var(--fz-xxs); font-weight: 400; color: var(--t4);
      }
      .pw-day-precip {
        font-size: var(--fz-xxs); color: rgba(var(--rgb-info),0.5);
        text-align: right;
      }

      /* ── Preview Spotify card ── */
      .preview-spotify-wrap {
        display: flex; flex-direction: column; gap: 0.25rem;
      }
      .ps-card-header {
        display: flex; align-items: center; gap: 0.25rem;
        padding: 0 0.25rem;
      }
      .ps-card-header ha-icon {
        --mdc-icon-size: 0.625rem; color: #1DB954;
        display: flex; align-items: center; justify-content: center;
      }
      .ps-card-title {
        font-size: var(--fz-xxs); font-weight: 700;
        text-transform: uppercase; letter-spacing: 1.2px;
        color: var(--t4);
      }
      .preview-spotify {
        border-radius: var(--radius-lg);
        background: linear-gradient(135deg, rgba(var(--rgb-white),0.08) 0%, rgba(var(--rgb-white),0.03) 50%, rgba(var(--rgb-white),0.06) 100%);
        backdrop-filter: blur(50px) saturate(1.5);
        -webkit-backdrop-filter: blur(50px) saturate(1.5);
        box-shadow: inset 0 1px 0 0 rgba(var(--rgb-white),0.1), 0 20px 60px rgba(var(--rgb-black),0.4), 0 4px 16px rgba(var(--rgb-black),0.25);
        border: 1px solid var(--b2);
        overflow: hidden;
        padding: 0.5rem;
        display: flex; flex-direction: column; gap: 0.375rem;
      }
      .ps-search {
        display: flex; align-items: center; gap: 0.25rem;
        background: var(--s3); border-radius: var(--radius-full);
        padding: 0.1875rem 0.5rem;
      }
      .ps-search ha-icon {
        --mdc-icon-size: 0.625rem; color: var(--t4);
        display: flex; align-items: center; justify-content: center;
      }
      .ps-search-text {
        font-size: var(--fz-xxs); color: var(--t4); flex: 1;
      }
      .ps-tabs {
        display: flex; gap: 0.1875rem;
      }
      .ps-tab {
        font-size: var(--fz-xxs); font-weight: 600; letter-spacing: 0.3px;
        color: var(--t4);
        padding: 0.125rem 0.3125rem;
        border-radius: var(--radius-full);
        border: 1px solid var(--b1);
        background: transparent;
      }
      .ps-tab.active {
        color: var(--t1);
        background: var(--s4);
        border-color: var(--b3);
      }
      .ps-section-label {
        font-size: var(--fz-xxs); font-weight: 700; color: var(--t3);
        text-transform: uppercase; letter-spacing: 0.5px;
        padding: 0.125rem 0 0.0625rem;
      }
      .ps-item-row {
        display: flex; align-items: center; gap: 0.375rem;
        padding: 0.125rem 0;
      }
      .ps-item-art {
        width: 1.25rem; height: 1.25rem; border-radius: 3px;
        background: var(--s3); flex-shrink: 0;
        display: flex; align-items: center; justify-content: center;
      }
      .ps-item-art ha-icon {
        --mdc-icon-size: 0.625rem; color: var(--t4);
        display: flex; align-items: center; justify-content: center;
      }
      .ps-item-info {
        flex: 1; min-width: 0;
      }
      .ps-item-name {
        font-size: var(--fz-xxs); font-weight: 600; color: var(--t2);
        white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
      }
      .ps-item-meta {
        font-size: var(--fz-xxs); color: var(--t4);
        white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
      }
      .ps-item-play {
        --mdc-icon-size: 0.75rem; color: #1DB954; flex-shrink: 0;
        display: flex; align-items: center; justify-content: center;
        opacity: 0.6;
      }

      /* ── Preview dashboard ── */
      .preview-dashboard {
        border-radius: var(--radius-lg);
        background: rgba(17, 24, 39, 0.6);
        padding: 0.625rem;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        min-height: 5rem;
      }
      .preview-dashboard-cards {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 0.375rem;
      }
      .preview-dashboard-navbar {
        display: flex;
        gap: 0.375rem;
        justify-content: center;
        padding: 0.25rem 0.5rem;
        border-radius: var(--radius-md);
        background: var(--s1);
        border: 1px solid var(--b1);
        margin-top: auto;
      }
      .preview-dashboard-navbar ha-icon {
        --mdc-icon-size: 0.875rem;
        color: var(--t3);
        display: flex; align-items: center; justify-content: center;
      }
      .preview-dashboard-card {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 0.625rem;
        border-radius: var(--radius-md);
        background: linear-gradient(
          135deg,
          rgba(var(--rgb-white), 0.06) 0%,
          rgba(var(--rgb-white), 0.02) 100%
        );
        border: 1px solid var(--b1);
        font-size: var(--fz-sm);
        font-weight: 600;
        color: var(--t2);
      }
      .preview-dashboard-card ha-icon {
        --mdc-icon-size: 1rem;
        color: var(--t3);
        display: flex; align-items: center; justify-content: center;
      }
      .preview-dashboard-card.weather ha-icon {
        color: rgba(var(--rgb-light-glow), 0.7);
      }
      .preview-dashboard-card.light ha-icon {
        color: rgba(var(--rgb-light-glow), 0.5);
      }
      .preview-dashboard-empty {
        text-align: center;
        color: var(--t4);
        font-size: var(--fz-base);
        padding: 1rem 0;
      }

      /* ── Cover preview ── */
      .preview-cover {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
        padding: 0.75rem;
      }
      .preview-cover-card {
        border-radius: var(--radius-lg);
        overflow: hidden;
      }

      /* ── Presence preview ── */
      .preview-presence {
        padding: 0.75rem;
      }
      .preview-presence-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 0.625rem;
      }
      .preview-presence-title {
        font-size: var(--fz-base);
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 1px;
        color: var(--t2);
      }
      .preview-presence-pill {
        font-size: var(--fz-sm);
        font-weight: 700;
        padding: 0.125rem 0.5rem;
        border-radius: var(--radius-full);
        color: white;
      }
      .preview-presence-pill.all-home { background: var(--c-success); }
      .preview-presence-pill.all-away { background: var(--c-alert); }
      .preview-presence-pill.mixed { background: var(--c-accent); }
      .preview-presence-persons {
        display: flex;
        gap: 0.75rem;
        justify-content: center;
      }
      .preview-presence-person {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.25rem;
      }
      .preview-presence-avatar {
        width: 2rem;
        height: 2rem;
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
        --mdc-icon-size: 1.125rem;
        color: var(--t3);
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .preview-presence-name {
        font-size: var(--fz-xs);
        color: var(--t3);
        max-width: 3rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-align: center;
      }
`;
