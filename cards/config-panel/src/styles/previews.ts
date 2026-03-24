import { css } from 'lit';

/** Preview component styles — mini card renderings for all tabs. */
export const previewStyles = css`
      /* ── Preview ── */
      .preview-encart {
        margin-bottom: 1rem;
        padding: 0.75rem;
        border-radius: var(--radius-lg);
        background: var(--s1);
        border: 1px solid var(--b1);
      }
      .preview-label {
        font-size: var(--fz-xxs);
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 1px;
        color: var(--t4);
        margin-bottom: 0.5rem;
      }

      /* Preview navbar — miniature faithful to real navbar */
      .preview-navbar {
        display: flex;
        align-items: center;
        gap: 0.125rem;
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
        gap: 0.25rem;
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
        padding: 0.5rem 0.625rem;
        display: flex;
        flex-direction: column;
        gap: 0;
        position: relative;
        transition: grid-template-columns 0.35s var(--ease-out);
      }
      .preview-nav-item.active-preview .preview-nav-label {
        grid-template-columns: 1fr;
      }
      .preview-nav-label span {
        min-width: 0;
        overflow: hidden;
        padding: 0.5rem 0.625rem;
        display: flex;
        flex-direction: column;
        gap: 0;
        position: relative;
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
        padding: 0.5rem 0.625rem;
        display: flex;
        flex-direction: column;
        gap: 0;
        position: relative;
      }
      .preview-popup-header {
        display: flex;
        align-items: center;
        gap: 0.5rem;
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
        padding: 0.125rem 0.5rem;
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
        padding: 0.125rem 0.375rem;
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
        padding: 0.5rem 0.75rem; flex: 1;
      }
      .mp-top {
        display: flex; align-items: center; justify-content: space-between;
      }
      .mp-pill {
        display: inline-flex; align-items: center; gap: 0.25rem;
        padding: 0.125rem 0.5rem 0.125rem 0.25rem;
        border-radius: var(--radius-full);
        backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
        background: rgba(var(--rgb-black),0.35); border: 1px solid rgba(var(--rgb-white),0.08);
        font-size: var(--fz-xxs); font-weight: 600; color: rgba(var(--rgb-white),0.9);
      }
      .mp-pill ha-icon { --mdc-icon-size: 0.625rem; display: flex; align-items: center; justify-content: center; }
      .mp-eq {
        display: flex; align-items: flex-end; gap: 0.125rem;
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
        padding: 0.5rem 0.75rem 0.5rem;
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
        padding: 0.5rem 0.625rem;
        display: flex;
        flex-direction: column;
        gap: 0;
        position: relative;
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
        padding: 0.5rem 0.625rem;
        display: flex;
        flex-direction: column;
        gap: 0;
        position: relative;
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
        padding: 0.5rem 0.625rem;
        display: flex;
        flex-direction: column;
        gap: 0;
        position: relative;
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
        transition: background var(--t-med), width var(--t-med);
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
        padding: 0.5rem 0.625rem;
        display: flex;
        flex-direction: column;
        gap: 0;
        position: relative;
        position: relative;
      }
      .pw-tint {
        position: absolute; inset: 0;
        border-radius: inherit;
        pointer-events: none; z-index: 0;
      }
      .pw-content {
        position: relative; z-index: 1;
        padding: 0.5rem;
        display: flex; flex-direction: column; gap: 0.375rem;
      }
      .pw-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
      }
      .pw-header-left {
        display: flex; flex-direction: column; gap: 0.125rem;
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
        display: flex; align-items: center; gap: 0.125rem;
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
        gap: 0.125rem;
        border-radius: var(--radius-sm);
        background: var(--b1);
        overflow: hidden;
        padding: 0.5rem 0.625rem;
        display: flex;
        flex-direction: column;
        gap: 0;
        position: relative;
      }
      .pw-metric {
        display: flex; align-items: center; justify-content: center; gap: 0.125rem;
        padding: 0.25rem 0.125rem;
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
        display: flex; flex-direction: column; gap: 0.125rem;
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
        --mdc-icon-size: 0.625rem; color: var(--c-spotify);
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
        padding: 0.5rem 0.625rem;
        display: flex;
        flex-direction: column;
        gap: 0;
        position: relative;
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
        display: flex; gap: 0.125rem;
      }
      .ps-tab {
        font-size: var(--fz-xxs); font-weight: 600; letter-spacing: 0.3px;
        color: var(--t4);
        padding: 0.125rem 0.25rem;
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
        --mdc-icon-size: 0.75rem; color: var(--c-spotify); flex-shrink: 0;
        display: flex; align-items: center; justify-content: center;
        opacity: 0.6;
      }

      /* ── Spotify setup guide ── */
      .pw-sp-setup-box {
        padding: 1.25rem; border-radius: var(--radius-lg);
        background: var(--s2); border: 1px solid var(--b2);
        text-align: center;
      }
      .pw-sp-setup-icon {
        color: var(--c-spotify); --mdc-icon-size: 3rem;
        display: flex; align-items: center; justify-content: center;
        margin: 0 auto 1rem;
      }
      .pw-sp-setup-title {
        font-size: 1rem; font-weight: 600; color: var(--t1); margin-bottom: 0.5rem;
      }
      .pw-sp-setup-desc {
        font-size: 0.8125rem; color: var(--t3); margin-bottom: 1.25rem; line-height: 1.5;
      }
      .pw-sp-steps {
        text-align: left; padding: 0 0.5rem;
      }
      .pw-sp-step {
        display: flex; align-items: flex-start; gap: 0.625rem;
        margin-bottom: 0.75rem; font-size: 0.8125rem; color: var(--t2);
      }
      .pw-sp-step-num {
        flex-shrink: 0; width: 1.375rem; height: 1.375rem;
        border-radius: 50%; background: var(--s3);
        display: flex; align-items: center; justify-content: center;
        font-size: 0.75rem; font-weight: 600; color: var(--t1);
      }
      .pw-sp-step-text {
        line-height: 1.375rem;
      }
      .pw-sp-note {
        font-size: 0.75rem; color: var(--t3); margin-top: 1rem;
        padding: 0.625rem; border-radius: var(--radius-md);
        background: var(--s1); border: 1px solid var(--b1);
      }
      .pw-sp-setup-btn {
        margin-top: 1.25rem;
      }
      .pw-sp-setup-btn ha-icon {
        --mdc-icon-size: 1rem;
        display: flex; align-items: center; justify-content: center;
      }
      .pw-sp-entity-icon {
        color: var(--c-spotify);
      }
      .pw-sp-drag-spacer {
        width: 1.5rem;
      }

      /* ── Preview dashboard ── */
      .preview-dashboard {
        border-radius: var(--radius-lg);
        background: rgba(17, 24, 39, 0.6);
        padding: 0.5rem;
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
        padding: 0.5rem 0.5rem;
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
        padding: 0.5rem 0.625rem;
        display: flex;
        flex-direction: column;
        gap: 0;
        position: relative;
      }

      /* Cover preview — header */
      .pw-cv-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 0.25rem 0.25rem;
      }
      .pw-cv-header-left {
        display: flex;
        align-items: center;
        gap: 0.375rem;
      }
      .pw-cv-header-title {
        font-size: 0.5rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 1px;
        color: var(--t4);
      }
      .pw-cv-header-count {
        font-size: 0.5rem;
        font-weight: 600;
        padding: 0.0625rem 0.25rem;
        border-radius: var(--radius-sm);
      }
      .pw-cv-header-count.active {
        background: rgba(var(--rgb-purple), 0.15);
        color: var(--c-purple);
      }
      .pw-cv-header-count.idle {
        background: var(--s2);
        color: var(--t3);
      }
      .pw-cv-header-actions {
        display: flex;
        gap: 0.1875rem;
      }
      .pw-cv-header-btn {
        width: 1.125rem;
        height: 1.125rem;
        border-radius: 4px;
        background: var(--s2);
        border: 1px solid var(--b2);
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .pw-cv-header-btn ha-icon {
        --mdc-icon-size: 0.625rem;
        color: var(--t3);
        display: flex;
        align-items: center;
        justify-content: center;
      }

      /* Cover preview — tint */
      .pw-cv-tint {
        position: absolute;
        inset: 0;
        border-radius: inherit;
        pointer-events: none;
        background: radial-gradient(ellipse at 50% 50%, var(--c-purple), transparent 70%);
      }

      /* Cover preview — empty state */
      .pw-cv-empty {
        padding: 0.5rem;
        text-align: center;
        font-size: 0.625rem;
        color: var(--t4);
      }

      /* Cover preview — entity row */
      .pw-cv-row {
        display: flex;
        align-items: center;
        gap: 0.375rem;
        padding: 0.25rem 0.125rem;
        position: relative;
        z-index: 1;
      }
      .pw-cv-row.compact {
        min-width: 0;
        overflow: hidden;
        padding: 0.5rem 0.625rem;
        display: flex;
        flex-direction: column;
        gap: 0;
        position: relative;
      }
      .pw-cv-row.full {
        grid-column: 1 / -1;
      }
      .pw-cv-row.right {
        padding-left: 0.5rem;
        border-left: 1px solid var(--b2);
      }

      /* Cover preview — icon box */
      .pw-cv-icon {
        width: 1.375rem;
        height: 1.375rem;
        border-radius: var(--radius-xs);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        background: var(--s2);
        border: 1px solid var(--b1);
      }
      .pw-cv-icon.open {
        background: rgba(var(--rgb-purple), 0.1);
        border-color: rgba(var(--rgb-purple), 0.15);
      }
      .pw-cv-icon ha-icon {
        --mdc-icon-size: 0.8125rem;
        color: var(--t3);
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .pw-cv-icon.open ha-icon {
        color: var(--c-purple);
        filter: drop-shadow(0 0 4px rgba(var(--rgb-purple), 0.4));
      }

      /* Cover preview — info */
      .pw-cv-info {
        flex: 1;
        min-width: 0;
      }
      .pw-cv-name {
        font-size: 0.625rem;
        font-weight: 600;
        color: var(--t1);
        overflow: hidden;
        padding: 0.5rem 0.625rem;
        display: flex;
        flex-direction: column;
        gap: 0;
        position: relative;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .pw-cv-sub {
        display: flex;
        align-items: center;
        gap: 0.25rem;
        margin-top: 0.0625rem;
      }
      .pw-cv-state {
        font-size: 0.5rem;
        color: var(--t4);
      }
      .pw-cv-state.open {
        color: rgba(var(--rgb-purple), 0.6);
      }

      /* Cover preview — position */
      .pw-cv-pos {
        font-size: 0.75rem;
        font-weight: 700;
        color: var(--t3);
        font-variant-numeric: tabular-nums;
      }
      .pw-cv-pos.open {
        color: var(--c-purple);
      }
      .pw-cv-pos-unit {
        font-size: 0.5rem;
        font-weight: 500;
      }

      /* Cover preview — status dot */
      .pw-cv-dot {
        width: 0.375rem;
        height: 0.375rem;
        border-radius: 50%;
        flex-shrink: 0;
        background: var(--t4);
      }
      .pw-cv-dot.open {
        background: var(--c-purple);
        box-shadow: 0 0 6px rgba(var(--rgb-purple), 0.4);
      }

      /* Cover preview — fold separator */
      .pw-cv-fold-sep {
        height: 0.0625rem;
        background: linear-gradient(90deg, transparent, rgba(var(--rgb-purple), 0.3), transparent);
        margin: 0.125rem 0.25rem;
        opacity: 0.6;
      }

      /* Cover preview — controls panel */
      .pw-cv-controls {
        padding: 0.375rem 0.125rem 0.25rem;
        display: flex;
        flex-direction: column;
        gap: 0.375rem;
        position: relative;
        z-index: 1;
      }
      .pw-cv-controls-label {
        font-size: 0.5rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        color: var(--t4);
      }

      /* Cover preview — transport */
      .pw-cv-transport {
        display: flex;
        gap: 0.25rem;
        justify-content: center;
      }
      .pw-cv-transport-btn {
        width: 1.75rem;
        height: 1.75rem;
        border-radius: var(--radius-sm);
        background: var(--s2);
        border: 1px solid var(--b2);
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .pw-cv-transport-btn ha-icon {
        --mdc-icon-size: 0.875rem;
        color: var(--t3);
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .pw-cv-transport-btn.accent ha-icon {
        color: var(--c-purple);
      }

      /* Cover preview — slider */
      .pw-cv-slider {
        display: flex;
        align-items: center;
        gap: 0.25rem;
      }
      .pw-cv-slider ha-icon {
        --mdc-icon-size: 0.6875rem;
        color: var(--t4);
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .pw-cv-bar {
        flex: 1;
        height: 0.25rem;
        border-radius: 0.125rem;
        background: var(--s2);
        position: relative;
        overflow: hidden;
        padding: 0.5rem 0.625rem;
        display: flex;
        flex-direction: column;
        gap: 0;
        position: relative;
      }
      .pw-cv-bar-fill {
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        border-radius: 0.125rem;
        background: linear-gradient(90deg, rgba(var(--rgb-purple), 0.4), var(--c-purple));
      }

      /* Cover preview — separator */
      .pw-cv-sep {
        height: 0.0625rem;
        background: linear-gradient(90deg, transparent, var(--b2), transparent);
      }

      /* Cover preview — presets */
      .pw-cv-presets {
        display: flex;
        flex-wrap: wrap;
        gap: 0.1875rem;
        justify-content: center;
      }
      .pw-cv-preset {
        display: inline-flex;
        align-items: center;
        gap: 0.1875rem;
        padding: 0.125rem 0.375rem;
        border-radius: var(--radius-sm);
        border: 1px solid var(--b2);
        background: var(--s1);
        font-size: 0.5rem;
        font-weight: 600;
        color: var(--t3);
      }
      .pw-cv-preset.active {
        border-color: rgba(var(--rgb-purple), 0.3);
        background: rgba(var(--rgb-purple), 0.1);
        color: var(--c-purple);
      }
      .pw-cv-preset ha-icon {
        --mdc-icon-size: 0.625rem;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      /* Cover preview — remaining grid */
      .pw-cv-remaining-sep {
        height: 0.0625rem;
        background: linear-gradient(90deg, transparent, var(--b2), transparent);
        margin: 0.125rem 0.25rem;
      }
      .pw-cv-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 0;
      }

      /* ── Presence preview ── */
      .preview-presence {
        padding: 0.75rem;
      }
      .preview-presence-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 0.5rem;
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
        padding: 0.5rem 0.625rem;
        display: flex;
        flex-direction: column;
        gap: 0;
        position: relative;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-align: center;
      }

      /* ══════════════════════════════════════
         Climate preview (from prototype)
         ══════════════════════════════════════ */

      .preview-climate-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 0.25rem 0.375rem;
      }
      .preview-climate-header-left {
        display: flex;
        align-items: center;
        gap: 0.375rem;
      }
      .preview-climate-header-title {
        font-size: 10px;
        font-weight: 600;
        color: var(--t1);
      }
      .preview-climate-header-count {
        font-size: 8px;
        font-weight: 600;
        padding: 0.125rem 0.25rem;
        border-radius: var(--radius-sm);
      }
      .preview-climate-header-avg {
        font-size: 10px;
        font-weight: 600;
        color: var(--t3);
      }
      .preview-climate-card {
        padding: 0.5rem 0.5rem;
        display: flex;
        flex-direction: column;
        gap: 0;
        position: relative;
        border-radius: var(--radius-lg);
      }
      .preview-climate-tint {
        position: absolute;
        inset: 0;
        border-radius: inherit;
        pointer-events: none;
        opacity: 0.12;
      }

      /* ── Climate row ── */
      .cl-row {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.25rem 0.125rem;
        position: relative;
        z-index: 1;
      }
      .cl-icon-btn {
        width: 24px;
        height: 24px;
        border-radius: var(--radius-sm);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        border: 1px solid var(--b1);
        background: var(--s2);
      }
      .cl-icon-btn ha-icon {
        --mdc-icon-size: 14px;
        display: flex; align-items: center; justify-content: center;
        color: var(--t3);
      }

      /* Heating state (orange) */
      .cl-row.heating .cl-icon-btn {
        background: rgba(var(--rgb-heat), 0.1);
        border-color: rgba(var(--rgb-heat), 0.15);
      }
      .cl-row.heating .cl-icon-btn ha-icon {
        color: var(--c-heat);
        filter: drop-shadow(0 0 4px rgba(var(--rgb-heat), 0.5));
      }
      .cl-row.heating .cl-action-text { color: rgba(var(--rgb-heat), 0.6); }
      .cl-row.heating .cl-mode-badge {
        background: rgba(var(--rgb-heat), 0.1);
        color: rgba(var(--rgb-heat), 0.6);
      }
      .cl-row.heating .cl-temp-target { color: rgba(var(--rgb-heat), 0.6); }
      .cl-row.heating .cl-dot {
        background: var(--c-heat);
        box-shadow: 0 0 6px rgba(var(--rgb-heat), 0.4);
      }

      /* Cooling state (cyan) */
      .cl-row.cooling .cl-icon-btn {
        background: rgba(var(--rgb-cool), 0.1);
        border-color: rgba(var(--rgb-cool), 0.15);
      }
      .cl-row.cooling .cl-icon-btn ha-icon {
        color: var(--c-cool);
        filter: drop-shadow(0 0 4px rgba(var(--rgb-cool), 0.5));
      }
      .cl-row.cooling .cl-action-text { color: rgba(var(--rgb-cool), 0.6); }
      .cl-row.cooling .cl-mode-badge {
        background: rgba(var(--rgb-cool), 0.1);
        color: rgba(var(--rgb-cool), 0.6);
      }
      .cl-row.cooling .cl-temp-target { color: rgba(var(--rgb-cool), 0.6); }
      .cl-row.cooling .cl-dot {
        background: var(--c-cool);
        box-shadow: 0 0 6px rgba(var(--rgb-cool), 0.4);
      }

      /* Idle/off state */
      .cl-row.idle .cl-dot,
      .cl-row.off .cl-dot { background: var(--t4); }

      .cl-expand {
        flex: 1;
        min-width: 0;
        display: flex;
        align-items: center;
        gap: 0.375rem;
      }
      .cl-info {
        flex: 1;
        min-width: 0;
        display: flex;
        flex-direction: column;
        gap: 0.125rem;
      }
      .cl-name {
        font-size: 10px;
        font-weight: 600;
        color: var(--t1);
        overflow: hidden;
        padding: 0.5rem 0.625rem;
        display: flex;
        flex-direction: column;
        gap: 0;
        position: relative;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .cl-sub {
        display: flex;
        align-items: center;
        gap: 0.25rem;
      }
      .cl-action-text {
        font-size: 8px;
        font-weight: 500;
        color: var(--t3);
      }
      .cl-mode-badge {
        font-size: 7px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.3px;
        padding: 0.125rem 0.25rem;
        border-radius: var(--radius-xs);
        background: var(--s3);
        color: var(--t3);
      }
      .cl-temps {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        flex-shrink: 0;
      }
      .cl-temp-current {
        font-size: 13px;
        font-weight: 700;
        color: var(--t1);
        font-variant-numeric: tabular-nums;
        line-height: 1;
      }
      .cl-temp-current .unit {
        font-size: 9px;
        font-weight: 500;
        color: var(--t3);
      }
      .cl-temp-target {
        font-size: 8px;
        font-weight: 500;
        color: var(--t3);
        margin-top: 0.125rem;
      }
      .cl-dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        flex-shrink: 0;
      }

      /* ── Climate expanded controls ── */
      .cl-empty {
        padding: 0.75rem;
        text-align: center;
        font-size: 0.6875rem;
        color: var(--t4);
      }
      .cl-preview-wrap {
        padding: 0.375rem 0;
      }
      .cl-controls {
        padding: 0.375rem 0.125rem 0.25rem;
        display: flex;
        flex-direction: column;
        gap: 0.375rem;
        position: relative;
        z-index: 1;
      }
      .cl-stepper-row {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.625rem;
      }
      .cl-stepper-btn {
        width: 1.625rem;
        height: 1.625rem;
        border-radius: var(--radius-sm);
        background: var(--s2);
        border: 1px solid var(--b2);
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .cl-stepper-btn.sm {
        width: 1.5rem;
        height: 1.5rem;
      }
      .cl-stepper-btn ha-icon {
        --mdc-icon-size: 0.875rem;
        color: var(--t3);
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .cl-stepper-btn.sm ha-icon {
        --mdc-icon-size: 0.75rem;
      }
      .cl-stepper-center {
        text-align: center;
      }
      .cl-stepper-label {
        font-size: 0.4375rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        color: var(--t4);
      }
      .cl-stepper-value {
        font-size: 1rem;
        font-weight: 700;
        font-variant-numeric: tabular-nums;
      }
      .cl-stepper-value.sm {
        font-size: 0.875rem;
      }
      .cl-separator {
        height: 0.0625rem;
        background: linear-gradient(90deg, transparent, var(--b2), transparent);
      }
      .cl-chips {
        display: flex;
        flex-wrap: wrap;
        gap: 0.1875rem;
        justify-content: center;
      }
      .cl-chips.pb {
        padding-bottom: 0.25rem;
      }
      .cl-chip {
        display: inline-flex;
        align-items: center;
        gap: 0.1875rem;
        padding: 0.125rem 0.375rem;
        border-radius: var(--radius-sm);
        font-size: 0.5rem;
        font-weight: 600;
      }
      .cl-chip ha-icon {
        --mdc-icon-size: 0.625rem;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .cl-remaining-sep {
        height: 0.0625rem;
        background: linear-gradient(90deg, transparent, var(--b2), transparent);
        margin: 0.125rem 0.25rem;
      }

      /* ── Climate normal mode ── */
      .cl-normal-content {
        position: relative;
        z-index: 1;
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
      }
      .cl-entity-tabs {
        display: flex;
        gap: 0.25rem;
        justify-content: center;
        padding: 0.25rem 0;
      }
      .cl-entity-tab {
        font-size: 0.5625rem;
        padding: 0.125rem 0.375rem;
        border-radius: var(--radius-sm);
        color: var(--t3);
      }
      .cl-entity-tab.active {
        background: var(--s3);
        color: var(--t1);
        font-weight: 600;
      }
      .cl-gauge-wrap {
        display: flex;
        justify-content: center;
      }
      .cl-gauge-svg {
        width: 6.25rem;
        height: 4.25rem;
      }
      .cl-fold-sep {
        margin: 0.125rem 0;
      }

      /* ── Preview camera carousel ── */
      .pw-cam-wrap {
        padding: 0.625rem;
      }
      .pw-cam-frame {
        position: relative;
        width: 100%;
        aspect-ratio: 16 / 9;
        border-radius: var(--radius-md);
        overflow: hidden;
        padding: 0.5rem 0.625rem;
        display: flex;
        flex-direction: column;
        gap: 0;
        position: relative;
        background: #0a0f18;
        border: 1px solid var(--b1);
        margin-bottom: 0.5rem;
      }
      .pw-cam-bg {
        position: absolute;
        inset: 0;
        background:
          radial-gradient(circle at 25% 35%, rgba(40, 60, 90, 0.4) 0%, transparent 40%),
          radial-gradient(circle at 65% 55%, rgba(30, 50, 70, 0.3) 0%, transparent 45%),
          linear-gradient(135deg, #141e2e 0%, #0d1520 40%, #111a28 100%);
      }
      .pw-cam-overlay-top {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.3125rem 0.4375rem;
        background: linear-gradient(180deg, rgba(0, 0, 0, 0.5) 0%, transparent 100%);
      }
      .pw-cam-label {
        font-size: 7px;
        font-weight: 600;
        color: rgba(var(--rgb-white), 0.7);
        display: flex;
        align-items: center;
        gap: 0.1875rem;
      }
      .pw-cam-label ha-icon {
        --mdc-icon-size: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .pw-cam-rec {
        display: inline-flex;
        align-items: center;
        gap: 0.125rem;
        font-size: 6px;
        font-weight: 700;
        color: var(--c-alert);
      }
      .pw-cam-rec-dot {
        width: 0.25rem;
        height: 0.25rem;
        border-radius: 50%;
        background: var(--c-alert);
      }
      .pw-cam-overlay-bottom {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding: 0.3125rem 0.4375rem;
        background: linear-gradient(0deg, rgba(0, 0, 0, 0.5) 0%, transparent 100%);
      }
      .pw-cam-ai-list {
        display: flex;
        gap: 0.1875rem;
      }
      .pw-cam-ai-badge {
        display: inline-flex;
        align-items: center;
        gap: 0.125rem;
        padding: 0.0625rem 0.25rem;
        border-radius: 4px;
        font-size: 6px;
        font-weight: 600;
        color: var(--c-info);
      }
      .pw-cam-ai-badge ha-icon {
        --mdc-icon-size: 7px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .pw-cam-arrow {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 1.125rem;
        height: 1.125rem;
        border-radius: 50%;
        background: rgba(0, 0, 0, 0.4);
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .pw-cam-arrow--left {
        left: 0.25rem;
      }
      .pw-cam-arrow--right {
        right: 0.25rem;
      }
      .pw-cam-arrow ha-icon {
        --mdc-icon-size: 0.75rem;
        color: rgba(var(--rgb-white), 0.6);
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .pw-cam-dots {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.25rem;
        margin-bottom: 0.375rem;
      }
      .pw-cam-dot {
        width: 0.3125rem;
        height: 0.3125rem;
        border-radius: 50%;
      }
      .pw-cam-dot--active {
        width: 0.875rem;
        height: 0.3125rem;
        border-radius: 0.1875rem;
        background: var(--c-info);
      }
      .pw-cam-dot--rec {
        background: var(--c-alert);
        box-shadow: 0 0 4px rgba(248, 113, 113, 0.5);
      }
      .pw-cam-dot--idle {
        background: var(--t4);
      }
      .pw-cam-info {
        display: flex;
        align-items: center;
        gap: 0.4375rem;
        padding: 0 0.125rem;
        margin-bottom: 0.375rem;
      }
      .pw-cam-icon {
        width: 1.375rem;
        height: 1.375rem;
        border-radius: var(--radius-sm);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }
      .pw-cam-icon ha-icon {
        --mdc-icon-size: 0.75rem;
        color: var(--c-info);
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .pw-cam-detail {
        flex: 1;
        min-width: 0;
      }
      .pw-cam-name {
        font-size: 10px;
        font-weight: 600;
        color: var(--t1);
        overflow: hidden;
        padding: 0.5rem 0.625rem;
        display: flex;
        flex-direction: column;
        gap: 0;
        position: relative;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .pw-cam-status-row {
        display: flex;
        align-items: center;
        gap: 0.25rem;
        margin-top: 0.0625rem;
      }
      .pw-cam-status {
        font-size: 7px;
        font-weight: 500;
      }
      .pw-cam-ai-mini {
        display: flex;
        gap: 0.125rem;
        align-items: center;
      }
      .pw-cam-ai-dot {
        width: 0.75rem;
        height: 0.75rem;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .pw-cam-ai-dot ha-icon {
        --mdc-icon-size: 8px;
        color: var(--c-info);
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .pw-cam-actions {
        display: flex;
        gap: 0.25rem;
        flex-wrap: wrap;
      }
      .pw-cam-action {
        display: inline-flex;
        align-items: center;
        gap: 0.1875rem;
        padding: 0.1875rem 0.4375rem;
        border-radius: var(--radius-xs);
        font-size: 8px;
        font-weight: 600;
      }
      .pw-cam-action ha-icon {
        --mdc-icon-size: 0.625rem;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .pw-cam-action--default {
        border: 1px solid var(--b2);
        background: var(--s1);
        color: var(--t3);
      }

      /* ── Fan preview ── */

      .pw-fan-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 0.25rem 0.25rem;
      }
      .pw-fan-header-left {
        display: flex;
        align-items: center;
        gap: 0.375rem;
      }
      .pw-fan-header-title {
        font-size: 8px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 1px;
        color: var(--t4);
      }
      .pw-fan-header-badge {
        font-size: 8px;
        font-weight: 600;
        padding: 0.0625rem 0.25rem;
        border-radius: var(--radius-sm);
      }
      .pw-fan-header-badge.on {
        background: rgba(var(--rgb-accent), 0.15);
        color: var(--c-accent);
      }
      .pw-fan-header-badge.off {
        background: var(--s2);
        color: var(--t3);
      }
      .pw-fan-toggle-track {
        width: 1.75rem;
        height: 0.875rem;
        border-radius: var(--radius-sm);
        position: relative;
      }
      .pw-fan-toggle-track.on {
        background: rgba(var(--rgb-accent), 0.25);
      }
      .pw-fan-toggle-track.off {
        background: var(--s2);
      }
      .pw-fan-toggle-knob {
        width: 0.625rem;
        height: 0.625rem;
        border-radius: 50%;
        position: absolute;
        top: 0.125rem;
        transition: background var(--t-fast);
      }
      .pw-fan-toggle-knob.on {
        right: 0.125rem;
        background: var(--c-accent);
      }
      .pw-fan-toggle-knob.off {
        left: 0.125rem;
        background: var(--t4);
      }
      .pw-fan-card {
        padding: 0.5rem 0.625rem;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 0;
        position: relative;
      }
      .pw-fan-tint {
        grid-column: 1 / -1;
        position: absolute;
        inset: 0;
        border-radius: inherit;
        pointer-events: none;
        background: radial-gradient(ellipse at 50% 50%, var(--c-accent), transparent 70%);
      }
      .pw-fan-empty {
        grid-column: 1 / -1;
        padding: 0.5rem;
        text-align: center;
        font-size: 10px;
        color: var(--t4);
      }
      .pw-fan-row {
        display: flex;
        align-items: center;
        gap: 0.375rem;
        padding: 0.25rem 0.125rem;
        position: relative;
        z-index: 1;
        grid-column: 1 / -1;
      }
      .pw-fan-row.compact {
        min-width: 0;
        overflow: hidden;
        grid-column: span 1;
      }
      .pw-fan-row.compact-right {
        padding-left: 0.5rem;
        position: relative;
      }
      .pw-fan-row.compact-right::before {
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
      .pw-fan-icon {
        width: 1.375rem;
        height: 1.375rem;
        border-radius: var(--radius-xs);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }
      .pw-fan-icon.on {
        background: rgba(var(--rgb-accent), 0.1);
        border: 1px solid rgba(var(--rgb-accent), 0.15);
      }
      .pw-fan-icon.off {
        background: var(--s2);
        border: 1px solid var(--b1);
      }
      .pw-fan-icon ha-icon {
        --mdc-icon-size: 0.8125rem;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .pw-fan-icon.on ha-icon {
        color: var(--c-accent);
        filter: drop-shadow(0 0 0.25rem rgba(var(--rgb-accent), 0.4));
      }
      .pw-fan-icon.off ha-icon {
        color: var(--t3);
      }
      .pw-fan-info {
        flex: 1;
        min-width: 0;
      }
      .pw-fan-name {
        font-size: 10px;
        font-weight: 600;
        color: var(--t1);
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .pw-fan-meta {
        display: flex;
        align-items: center;
        gap: 0.25rem;
        margin-top: 0.0625rem;
      }
      .pw-fan-status {
        font-size: 8px;
      }
      .pw-fan-status.on {
        color: rgba(var(--rgb-accent), 0.6);
      }
      .pw-fan-status.off {
        color: var(--t4);
      }
      .pw-fan-speed {
        font-size: 7px;
        color: var(--t4);
      }
      .pw-fan-dot {
        width: 0.375rem;
        height: 0.375rem;
        border-radius: 50%;
        flex-shrink: 0;
      }
      .pw-fan-dot.on {
        background: var(--c-accent);
        box-shadow: 0 0 0.375rem rgba(var(--rgb-accent), 0.4);
      }
      .pw-fan-dot.off {
        background: var(--t4);
      }

      /* ── Unassigned tab (pw-ua-*) ── */
      .pw-ua-banner-warn { color: var(--c-warning); }
      .pw-ua-search {
        width: 100%;
        margin: 0.5rem 0;
      }
      .pw-ua-domain-group {
        margin-top: 1rem;
        display: flex;
        align-items: center;
      }
      .pw-ua-domain-icon {
        --mdc-icon-size: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 0.375rem;
      }
      .pw-ua-domain-count {
        margin-left: 0.375rem;
        font-size: var(--fz-base);
        font-weight: 500;
        color: var(--t3);
      }
      .pw-ua-entity-info {
        flex: 1;
        min-width: 0;
      }
      .pw-ua-edit-icon {
        --mdc-icon-size: var(--icon-sm);
        color: var(--t4);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }
      .pw-ua-icon-btn-shrink { flex-shrink: 0; }
      .pw-ua-entity-icon {
        --mdc-icon-size: var(--icon-sm);
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .pw-ua-dropdown-wrap {
        flex-shrink: 0;
        max-width: 10rem;
      }
      .pw-ua-area-text {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      /* ── Title tab (pw-tt-*) ── */
      .pw-tt-spacer { flex: 1; }
      .pw-tt-mt-sm { margin-top: 0.625rem; }
      .pw-tt-mt-md { margin-top: 0.75rem; }
      .pw-tt-mt-lg { margin-top: 1rem; }
      .pw-tt-mt-add { margin-top: 0.5rem; }

      /* ── Media tab (pw-mp-*) ── */
      .pw-mp-header-row {
        display: flex;
        align-items: center;
        gap: 0.375rem;
        margin-bottom: 0.25rem;
      }
      .pw-mp-header-label {
        font-size: 0.5rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 1px;
        color: var(--t4);
      }
      .pw-mp-header-badge {
        font-size: 0.5rem;
        font-weight: 600;
        padding: 0.0625rem 0.25rem;
        border-radius: var(--radius-sm);
        background: rgba(var(--rgb-info), 0.15);
        color: var(--c-info);
      }
      .pw-mp-item-info { padding-left: 0.5rem; }
      .pw-mp-empty-msg {
        padding: 0.5rem 0.75rem;
        font-size: 0.75rem;
        color: var(--t4);
        text-align: center;
      }

      /* ── Room detail view (pw-rd-*) ── */
      .pw-rd-cards-label { margin-top: 0.5rem; }
      .pw-rd-sensor-label { padding: 0.25rem 0.875rem 0.125rem; }
      .pw-rd-threshold-label { padding: 0.5rem 0.875rem 0.125rem; }
      .pw-rd-flex-fixed { flex: 0 0 auto; }
      .pw-rd-sep { margin: 0.75rem 0; }

      /* ── Dashboard view (pw-db-*) ── */
      .pw-db-grid-mt { margin-top: 0.5rem; }
      .pw-db-sep { margin: 1rem 0; }
`;
