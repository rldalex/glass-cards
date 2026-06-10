import { css } from 'lit';

export const cameraCarouselStyles = css`
      :host {
        width: 100%;
        max-width: 31.25rem;
        margin: 0 auto;
        user-select: none;
        -webkit-user-select: none;

        --cam-color: #60a5fa;
        --cam-bg: rgba(var(--rgb-info),0.1);
        --cam-border: rgba(var(--rgb-info),0.15);
        --cam-glow: rgba(var(--rgb-info),0.4);
        --cam-sub: rgba(var(--rgb-info),0.6);
      }

      .card-header {
        display: flex; align-items: center; justify-content: space-between;
        padding: 0 0.375rem; margin-bottom: 0.375rem; min-height: 1.375rem;
      }
      .card-header-left { display: flex; align-items: center; gap: 0.5rem; }
      .card-title {
        font-size: var(--fz-xs); font-weight: 700; text-transform: uppercase;
        letter-spacing: 1.5px; color: var(--t4);
      }

      /* — Wrap — */
      .cam-wrap {
        position: relative; z-index: 1;
        display: flex; flex-direction: column; gap: 0;
      }

      /* — Hero — */
      .carousel-hero {
        position: relative; width: 100%; aspect-ratio: 16 / 9;
        /* border-box so the 1px border doesn't push hero 2px wider than .cam-wrap
           (would create the visible right-edge offset between hero and fold). */
        box-sizing: border-box;
        border-radius: var(--radius-xl);
        overflow: hidden;
        background: #0a0f18;
        border: 1px solid var(--b2);
        box-shadow:
          0 8px 32px rgba(var(--rgb-black),0.3),
          0 2px 8px rgba(var(--rgb-black),0.2),
          inset 0 1px 0 rgba(var(--rgb-white),0.04);
        touch-action: pan-y;
        -webkit-tap-highlight-color: transparent;
        transition: border-radius var(--t-layout), border-color var(--t-fast);
      }
      @media (hover: hover) and (pointer: fine) { .carousel-hero:hover { border-color: var(--b3); } }

      /* Event pulse on the card outline — a single ::after overlay on .cam-wrap so the
         contour stays unified whether the fold is open or closed. The hero + fold each keep
         their static borders underneath; the overlay draws ONE continuous ring around both. */
      .cam-wrap::after {
        content: '';
        position: absolute; inset: 0;
        border-radius: var(--radius-xl);
        pointer-events: none;
        border: 1.5px solid transparent;
        opacity: 0;
        transition: opacity 0.2s ease-out;
        z-index: 6;
      }
      .cam-wrap.pulse-ring::after,
      .cam-wrap.pulse-alert::after,
      .cam-wrap.pulse-ai::after,
      .cam-wrap.pulse-motion::after { opacity: 1; }

      @keyframes cam-pulse-ring {
        0%, 100% { border-color: rgba(var(--rgb-accent), 0.4);
                   box-shadow: 0 0 0 0 rgba(var(--rgb-accent), 0); }
        50%      { border-color: rgba(var(--rgb-accent), 1);
                   box-shadow: 0 0 18px 2px rgba(var(--rgb-accent), 0.5); }
      }
      @keyframes cam-pulse-ai {
        0%, 100% { border-color: rgba(var(--rgb-warning), 0.4);
                   box-shadow: 0 0 0 0 rgba(var(--rgb-warning), 0); }
        50%      { border-color: rgba(var(--rgb-warning), 1);
                   box-shadow: 0 0 14px 1px rgba(var(--rgb-warning), 0.4); }
      }
      @keyframes cam-pulse-motion {
        0%, 100% { border-color: rgba(var(--rgb-info), 0.35); }
        50%      { border-color: rgba(var(--rgb-info), 0.85); }
      }
      @keyframes cam-pulse-alert {
        0%, 100% { border-color: rgba(var(--rgb-alert), 0.4);
                   box-shadow: 0 0 0 0 rgba(var(--rgb-alert), 0); }
        50%      { border-color: rgba(var(--rgb-alert), 1);
                   box-shadow: 0 0 16px 2px rgba(var(--rgb-alert), 0.45); }
      }
      .cam-wrap.pulse-ring::after   { animation: cam-pulse-ring 1.2s ease-in-out infinite; }
      .cam-wrap.pulse-alert::after  { animation: cam-pulse-alert 1.6s ease-in-out infinite; }
      .cam-wrap.pulse-ai::after     { animation: cam-pulse-ai 2s ease-in-out infinite; }
      .cam-wrap.pulse-motion::after { animation: cam-pulse-motion 2.4s ease-in-out infinite; }

      /* Connected fold: hero loses bottom radius when fold is open (mirrors media-card).
         The inset bottom shadow is only added when fold is open so the closed-state hero
         doesn't show a useless dark inner line. */
      .cam-wrap.fold-open .carousel-hero {
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
        border-bottom-color: transparent;
        box-shadow:
          0 8px 32px rgba(var(--rgb-black),0.3),
          0 2px 8px rgba(var(--rgb-black),0.2),
          inset 0 1px 0 rgba(var(--rgb-white),0.04),
          inset 0 -1px 0 rgba(var(--rgb-black),0.1);
      }

      .tint {
        position: absolute; inset: 0; border-radius: inherit;
        pointer-events: none; z-index: 0;
        transition: opacity 1.2s cubic-bezier(0.4,0,0.2,1), background 1.2s cubic-bezier(0.4,0,0.2,1);
      }

      .carousel-track {
        position: absolute; inset: 0;
        display: flex; width: 100%; height: 100%;
        transition: transform 0.4s cubic-bezier(0.16,1,0.3,1);
      }
      .carousel-slide {
        flex: 0 0 100%; width: 100%; height: 100%;
        position: relative;
      }
      .carousel-slide-inner {
        position: absolute; inset: 0;
        display: flex; align-items: center; justify-content: center;
      }
      .carousel-slide-inner.active-feed {
        background:
          radial-gradient(circle at 25% 35%, rgba(40,60,90,0.4) 0%, transparent 40%),
          radial-gradient(circle at 65% 55%, rgba(30,50,70,0.3) 0%, transparent 45%),
          radial-gradient(circle at 50% 80%, rgba(50,40,60,0.2) 0%, transparent 50%),
          linear-gradient(135deg, #141e2e 0%, #0d1520 40%, #111a28 100%);
      }
      .carousel-slide-inner.idle-feed {
        background:
          radial-gradient(circle at 30% 40%, rgba(var(--rgb-info),0.06) 0%, transparent 50%),
          radial-gradient(circle at 70% 60%, rgba(var(--rgb-accent),0.04) 0%, transparent 50%),
          linear-gradient(135deg, #0d1520 0%, #0a0f18 100%);
      }
      .carousel-slide-inner.off-feed {
        background: linear-gradient(135deg, #0a0e14 0%, #080c12 100%);
      }
      /* Privacy feed: dim, neutral, with eye-off centerpiece. */
      .carousel-slide-inner.privacy-feed {
        background:
          radial-gradient(circle at 50% 50%, rgba(var(--rgb-warning),0.08) 0%, transparent 60%),
          linear-gradient(135deg, #14110a 0%, #0c0a07 100%);
      }
      .privacy-placeholder {
        position: absolute; inset: 0;
        display: flex; flex-direction: column; align-items: center; justify-content: center;
        gap: 0.375rem; z-index: 3;
        padding: 0 1rem;
        text-align: center;
      }
      .privacy-label {
        font-size: var(--fz-sm); font-weight: 700; color: var(--c-warning);
        letter-spacing: 0.5px; text-transform: uppercase;
      }
      .privacy-sub {
        font-size: var(--fz-xs); font-weight: 500; color: var(--t4);
        max-width: 16rem;
      }

      .cam-thumbnail {
        position: absolute; inset: 0; width: 100%; height: 100%;
        object-fit: cover; z-index: 0;
      }
      .cam-stream {
        position: absolute; inset: 0; width: 100%; height: 100%;
        display: block; z-index: 0; overflow: hidden;
        --video-object-fit: cover;
      }

      /* — Stream overlays — */
      .stream-overlay-top {
        position: absolute; top: 0; left: 0; right: 0; z-index: 2;
        display: flex; align-items: center; justify-content: space-between;
        padding: 0.5rem 0.625rem;
      }
      .stream-cam-name {
        font-size: var(--fz-sm); font-weight: 600; color: rgba(var(--rgb-white),0.85);
        display: flex; align-items: center; gap: 0.3125rem;
        text-shadow: 0 1px 2px rgba(0,0,0,0.55);
      }
      .stream-cam-name ha-icon { display: flex; align-items: center; justify-content: center; }
      .rec-indicator {
        display: inline-flex; align-items: center; gap: 0.1875rem;
        font-size: var(--fz-xs); font-weight: 700; color: var(--c-alert);
        letter-spacing: 0.5px;
      }
      .rec-circle {
        width: 0.375rem; height: 0.375rem; border-radius: 50%; background: var(--c-alert);
        animation: rec-pulse 1.5s ease-in-out infinite;
      }
      @keyframes rec-pulse {
        0%, 100% { opacity: 1; box-shadow: 0 0 4px var(--c-alert); }
        50% { opacity: 0.4; box-shadow: 0 0 0px var(--c-alert); }
      }
      .ring-indicator {
        display: inline-flex; align-items: center; gap: 0.1875rem;
        padding: 0.0625rem 0.375rem; border-radius: var(--radius-sm);
        font-size: var(--fz-xs); font-weight: 700; color: var(--c-accent);
        letter-spacing: 0.5px;
        background: rgba(var(--rgb-accent),0.18);
        border: 1px solid rgba(var(--rgb-accent),0.35);
        animation: ring-flash 0.9s ease-in-out infinite;
      }
      .ring-circle {
        width: 0.375rem; height: 0.375rem; border-radius: 50%;
        background: var(--c-accent);
        box-shadow: 0 0 6px var(--c-accent);
      }
      @keyframes ring-flash {
        0%, 100% { transform: scale(1); box-shadow: 0 0 0 rgba(var(--rgb-accent),0); }
        50% { transform: scale(1.04); box-shadow: 0 0 10px rgba(var(--rgb-accent),0.4); }
      }
      .stream-time {
        font-size: var(--fz-xs); font-weight: 500; color: rgba(var(--rgb-white),0.5);
        font-variant-numeric: tabular-nums;
        display: inline-flex; align-items: center; gap: 0.25rem;
      }
      .night-icon {
        display: inline-flex; align-items: center; justify-content: center;
        color: rgba(var(--rgb-info),0.85);
      }
      .sleep-icon {
        display: inline-flex; align-items: center; justify-content: center;
        color: rgba(var(--rgb-white),0.6);
      }
      .battery-badge {
        display: inline-flex; align-items: center; gap: 0.1875rem;
        padding: 0 0.25rem; border-radius: var(--radius-sm);
        font-size: var(--fz-xs); font-weight: 600;
        background: rgba(var(--rgb-white),0.08);
        color: rgba(var(--rgb-white),0.75);
      }
      .battery-badge.low {
        background: rgba(var(--rgb-alert),0.18);
        color: var(--c-alert);
        animation: battery-low-pulse 2s ease-in-out infinite;
      }
      @keyframes battery-low-pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.55; }
      }
      .battery-badge ha-icon { display: inline-flex; align-items: center; justify-content: center; }

      /* Aspect ratio overrides — user-selectable per camera from the config panel. */
      .carousel-hero.aspect-landscape { aspect-ratio: 16 / 9; }
      .carousel-hero.aspect-classic   { aspect-ratio: 4 / 3; }
      .carousel-hero.aspect-square    { aspect-ratio: 1 / 1; }
      .carousel-hero.aspect-portrait  { aspect-ratio: 3 / 4; }

      /* Fullscreen toggle button — compact, in the stream overlay clock area. */
      .fs-toggle-btn {
        display: inline-flex; align-items: center; justify-content: center;
        background: none; border: none; padding: 0.125rem;
        color: rgba(var(--rgb-white),0.6);
        cursor: pointer; border-radius: var(--radius-sm);
        margin-left: 0.125rem;
        transition: color var(--t-fast);
        -webkit-tap-highlight-color: transparent;
      }
      .fs-toggle-btn:hover { color: rgba(var(--rgb-white),0.95); }
      .fs-toggle-btn:focus-visible { outline: 2px solid rgba(var(--rgb-white),0.3); outline-offset: 1px; }
      .fs-toggle-btn ha-icon { display: inline-flex; align-items: center; justify-content: center; }

      /* Pseudo-fullscreen — bypasses Shadow DOM limitations of the native API.
         Position fixed at viewport, escapes ALL ancestor constraints (max-width, overflow…). */
      .carousel-hero.fs-active {
        position: fixed; inset: 0;
        width: 100vw; height: 100vh; max-width: none; max-height: none;
        aspect-ratio: auto; border-radius: 0; border: none;
        box-shadow: none; background: #000;
        z-index: 99999;
      }
      .carousel-hero.fs-active .cam-stream,
      .carousel-hero.fs-active .cam-thumbnail {
        width: 100%; height: 100%;
        object-fit: contain; /* preserve full image — no crop in fullscreen */
      }

      /* Fullscreen overlay — hidden by default, visible only when .fs-active (real) or
         .fs-preview (dev harness simulation). */
      .fs-overlay { display: none; }
      .carousel-hero.fs-active .fs-overlay,
      .carousel-hero.fs-preview .fs-overlay {
        display: block;
        position: absolute; inset: 0;
        pointer-events: none;
        z-index: 10;
      }
      /* Drop the carousel arrows / dots / stream overlays in fullscreen — fs-overlay has its own. */
      .carousel-hero.fs-active .carousel-nav,
      .carousel-hero.fs-active .carousel-dots,
      .carousel-hero.fs-active .stream-overlay-top,
      .carousel-hero.fs-active .stream-overlay-bottom,
      .carousel-hero.fs-preview .carousel-nav,
      .carousel-hero.fs-preview .carousel-dots,
      .carousel-hero.fs-preview .stream-overlay-top,
      .carousel-hero.fs-preview .stream-overlay-bottom { display: none; }

      .fs-back-btn {
        position: absolute; top: 1rem; right: 1rem;
        width: 2.5rem; height: 2.5rem; border-radius: 50%;
        display: inline-flex; align-items: center; justify-content: center;
        background: rgba(0,0,0,0.45);
        backdrop-filter: var(--blur-lg, blur(12px));
        -webkit-backdrop-filter: var(--blur-lg, blur(12px));
        border: 1px solid rgba(255,255,255,0.12);
        color: rgba(255,255,255,0.9); cursor: pointer;
        pointer-events: auto;
        transition: background var(--t-fast), transform var(--t-fast);
        -webkit-tap-highlight-color: transparent;
        touch-action: manipulation;
      }
      .fs-back-btn:hover { background: rgba(0,0,0,0.6); transform: scale(1.05); }
      .fs-back-btn ha-icon { display: inline-flex; align-items: center; justify-content: center; }

      /* Top-left floating action chips (snapshot, motion toggle). */
      .fs-top-chips {
        position: absolute; top: 1rem; left: 1rem;
        display: flex; gap: 0.5rem;
        pointer-events: auto;
      }
      .fs-chip {
        width: 2.5rem; height: 2.5rem; border-radius: 50%;
        display: inline-flex; align-items: center; justify-content: center;
        background: rgba(0,0,0,0.45);
        backdrop-filter: var(--blur-lg, blur(12px));
        -webkit-backdrop-filter: var(--blur-lg, blur(12px));
        border: 1px solid rgba(255,255,255,0.12);
        color: rgba(255,255,255,0.9); cursor: pointer;
        pointer-events: auto; /* explicit override — parent fs-overlay has pointer-events:none */
        transition: background var(--t-fast), transform var(--t-fast), color var(--t-fast);
        -webkit-tap-highlight-color: transparent;
        touch-action: manipulation;
      }
      .fs-chip:hover { background: rgba(0,0,0,0.6); transform: scale(1.05); }
      .fs-chip.active {
        background: rgba(var(--rgb-alert), 0.3);
        border-color: rgba(var(--rgb-alert), 0.5);
        color: var(--c-alert);
      }
      .fs-chip ha-icon { display: inline-flex; align-items: center; justify-content: center; }

      /* Joysticks — circular floating PTZ controls (Reolink/Frigate-style). */
      .joystick {
        position: absolute;
        width: 8rem; height: 8rem;
        border-radius: 50%;
        background: radial-gradient(circle at 50% 50%, rgba(255,255,255,0.04), rgba(0,0,0,0.55) 70%);
        backdrop-filter: var(--blur-lg, blur(16px));
        -webkit-backdrop-filter: var(--blur-lg, blur(16px));
        border: 1px solid rgba(255,255,255,0.12);
        box-shadow: 0 8px 24px rgba(0,0,0,0.4);
        pointer-events: auto;
      }
      .joystick-pan  { bottom: 1.5rem; left: 1.5rem; }
      .joystick-zoom { bottom: 1.5rem; right: 1.5rem; width: 5.5rem; height: 5.5rem; }
      .joystick-center {
        position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%);
        width: 0.625rem; height: 0.625rem; border-radius: 50%;
        background: rgba(255,255,255,0.18);
        pointer-events: none;
      }
      .jp {
        position: absolute;
        width: 2.5rem; height: 2.5rem; border-radius: 50%;
        display: inline-flex; align-items: center; justify-content: center;
        background: rgba(255,255,255,0.08);
        border: 1px solid rgba(255,255,255,0.08);
        color: rgba(255,255,255,0.88); cursor: pointer;
        /* Explicit pointer-events override — some WebKit builds (iOS 15-16) don't propagate
           the parent's pointer-events:auto to non-positioned descendants reliably. */
        pointer-events: auto;
        transition: background var(--t-fast), transform var(--t-fast);
        -webkit-tap-highlight-color: transparent;
      }
      .jp:hover { background: rgba(255,255,255,0.18); transform: scale(1.08); }
      .jp:active { background: rgba(var(--rgb-accent), 0.35); }
      .jp ha-icon { display: inline-flex; align-items: center; justify-content: center; }
      .jp-up    { top: 0.375rem; left: 50%; transform: translateX(-50%); }
      .jp-down  { bottom: 0.375rem; left: 50%; transform: translateX(-50%); }
      .jp-left  { left: 0.375rem; top: 50%; transform: translateY(-50%); }
      .jp-right { right: 0.375rem; top: 50%; transform: translateY(-50%); }
      .joystick-zoom .jp { width: 2rem; height: 2rem; }
      /* Hover/active retain centering — re-apply transform with scale. */
      .jp-up:hover    { transform: translateX(-50%) scale(1.08); }
      .jp-down:hover  { transform: translateX(-50%) scale(1.08); }
      .jp-left:hover  { transform: translateY(-50%) scale(1.08); }
      .jp-right:hover { transform: translateY(-50%) scale(1.08); }

      /* PTZ D-pad — compact horizontal row (left/up/down/right + zoom). */
      .ptz-dpad {
        display: inline-flex; gap: 0.25rem; align-items: center;
      }
      .ptz-dpad-fold {
        display: flex; gap: 0.25rem; flex-wrap: wrap;
        margin-top: 0.5rem;
        padding-top: 0.5rem;
        border-top: 1px solid rgba(var(--rgb-white),0.06);
      }
      .stream-overlay-bottom {
        position: absolute; bottom: 0; left: 0; right: 0; z-index: 2;
        display: flex; align-items: center; justify-content: space-between;
        padding: 0.5rem 0.625rem;
      }
      .stream-ai-tags { display: flex; gap: 0.25rem; }
      .stream-ai-tag {
        display: inline-flex; align-items: center; gap: 0.1875rem;
        padding: 0.125rem 0.375rem; border-radius: var(--radius-sm);
        font-size: var(--fz-xs); font-weight: 600;
        background: rgba(var(--rgb-info),0.15); color: var(--cam-color);
        border: 1px solid rgba(var(--rgb-info),0.2);
      }
      .stream-ai-tag ha-icon { display: flex; align-items: center; justify-content: center; }
      .stream-placeholder {
        display: flex; flex-direction: column; align-items: center; gap: 0.375rem;
        z-index: 3; background: none; border: none; padding: 0; cursor: pointer;
        outline: none; -webkit-tap-highlight-color: transparent;
        font-family: inherit;
      }
      .stream-placeholder:focus-visible { outline: 2px solid rgba(var(--rgb-white),0.3); outline-offset: 4px; border-radius: var(--radius-md); }
      .stream-placeholder span { font-size: var(--fz-sm); color: var(--t4); font-weight: 500; }
      button.stream-placeholder { position: absolute; inset: 0; width: 100%; height: 100%; justify-content: center; }

      /* — Nav arrows (positioning overlay for <glass-icon-button>) — */
      .carousel-nav {
        position: absolute; top: 50%; transform: translateY(-50%);
        z-index: 5; opacity: 0.7;
        transition: opacity 0.2s cubic-bezier(0.4,0,0.2,1);
      }
      .carousel-nav.prev { left: 0.5rem; }
      .carousel-nav.next { right: 0.5rem; }
      @media (hover: hover) and (pointer: fine) {
        .carousel-nav:hover { opacity: 1; }
      }

      /* — Dots (overlay inside hero) — */
      .carousel-dots {
        position: absolute; bottom: 0.5rem; left: 0; right: 0; z-index: 5;
        display: flex; align-items: center; justify-content: center; gap: 0.375rem;
      }
      .carousel-dot-btn {
        width: 0.5rem; height: 0.5rem; border-radius: 50%; padding: 0;
        border: none; background: var(--t4); cursor: pointer;
        transition: width 0.2s cubic-bezier(0.4,0,0.2,1), border-radius 0.2s cubic-bezier(0.4,0,0.2,1), background 0.2s cubic-bezier(0.4,0,0.2,1), box-shadow 0.2s cubic-bezier(0.4,0,0.2,1); outline: none;
        -webkit-tap-highlight-color: transparent;
      }
      .carousel-dot-btn:focus-visible { outline: 2px solid rgba(var(--rgb-white),0.3); outline-offset: 2px; }
      .carousel-dot-btn.active {
        width: 1.25rem; border-radius: 4px;
        background: var(--cam-color); box-shadow: 0 0 8px var(--cam-glow);
      }
      .carousel-dot-btn.recording {
        background: var(--c-alert); box-shadow: 0 0 6px rgba(var(--rgb-alert),0.5);
      }
      .carousel-dot-btn.recording.active {
        background: var(--c-alert);
        animation: rec-pulse 1.5s ease-in-out infinite;
      }
      .carousel-dot-btn.motion-dot {
        background: var(--c-warning); box-shadow: 0 0 6px rgba(var(--rgb-warning),0.4);
      }

      @media (hover: hover) and (pointer: fine) {
        .carousel-dot-btn:hover { background: var(--t3); }
      }

      /* — Connected Fold — */
      .ctrl-fold {
        display: grid; grid-template-rows: 0fr;
        transition: grid-template-rows var(--t-layout);
      }
      .ctrl-fold.open { grid-template-rows: 1fr; }
      .ctrl-fold-inner {
        overflow: hidden;
        box-sizing: border-box;
        opacity: 0; transition: opacity 0.25s;
        background: linear-gradient(135deg, rgba(var(--rgb-white),0.03), rgba(var(--rgb-white),0.01));
        backdrop-filter: var(--blur-lg);
        -webkit-backdrop-filter: var(--blur-lg);
        border: 1px solid var(--b2);
        border-top: none;
        border-radius: 0 0 var(--radius-xl) var(--radius-xl);
        box-shadow:
          0 8px 32px rgba(var(--rgb-black),0.3),
          0 2px 8px rgba(var(--rgb-black),0.2),
          inset 0 -1px 0 rgba(var(--rgb-black),0.1);
      }
      .ctrl-fold.open .ctrl-fold-inner { opacity: 1; transition-delay: 0.1s; }

      .fold-sep-top {
        height: 0.0625rem; margin: 0 0.75rem;
        background: linear-gradient(90deg, transparent, rgba(var(--rgb-white),0.12), transparent);
      }
      .fold-panel {
        display: flex; flex-direction: column; gap: 0.625rem;
        padding: 0.75rem 0.875rem 0.875rem;
      }

      /* — Info bar — */
      .carousel-info {
        display: flex; align-items: center; gap: 0.625rem; padding: 0 0.125rem;
      }
      .carousel-cam-icon {
        width: 2.5rem; height: 2.5rem; border-radius: var(--radius-md);
        background: var(--s2); border: 1px solid var(--b1);
        display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        transition: background 0.2s cubic-bezier(0.4,0,0.2,1), border-color 0.2s cubic-bezier(0.4,0,0.2,1);
      }
      .carousel-cam-icon ha-icon {
        color: var(--t3); display: flex; align-items: center; justify-content: center;
      }
      .carousel-cam-icon.on { background: var(--cam-bg); border-color: var(--cam-border); }
      .carousel-cam-icon.on ha-icon { color: var(--cam-color); }
      .carousel-info-text { flex: 1; min-width: 0; }
      .carousel-cam-name {
        font-size: var(--fz-md); font-weight: 600; color: var(--t1);
        overflow: hidden; white-space: nowrap; text-overflow: ellipsis;
      }
      .carousel-cam-sub {
        display: flex; align-items: center; gap: 0.3125rem; margin-top: 0.0625rem;
      }
      .carousel-state { font-size: var(--fz-sm); font-weight: 500; color: var(--t3); }
      .carousel-state.live { color: var(--cam-sub); }
      .carousel-state.ringing { color: var(--c-accent); font-weight: 600; }
      .carousel-state.privacy { color: var(--c-warning); font-weight: 600; }
      .carousel-ai-mini { display: flex; gap: 0.125rem; align-items: center; }
      .ai-badge {
        display: inline-flex; align-items: center; justify-content: center;
        width: 1rem; height: 1rem; border-radius: var(--radius-sm);
        font-size: var(--fz-sm); transition: background 0.2s cubic-bezier(0.4,0,0.2,1), color 0.2s cubic-bezier(0.4,0,0.2,1);
      }
      .ai-badge.active { background: rgba(var(--rgb-info),0.12); color: var(--cam-color); }
      .ai-badge ha-icon {
        display: flex; align-items: center; justify-content: center;
        filter: drop-shadow(0 0 4px var(--cam-glow));
      }

      /* — Quick actions — */
      .carousel-actions { display: flex; gap: 0.375rem; flex-wrap: wrap; align-items: center; }
      /* Recording-active <glass-button>: tint the label red to match the alert active state. */
      glass-button.rec-active { color: var(--c-alert); }
      /* Privacy-active <glass-button>: tint warning to match the privacy overlay. */
      glass-button.privacy-active { color: var(--c-warning); }
    `;
