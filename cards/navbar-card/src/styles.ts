import { css } from 'lit';

export const navbarCardStyles = css`
      :host {
        width: 100%;
        padding: 0.375rem 0 5rem; /* top + space for fixed navbar */
        user-select: none;
        -webkit-user-select: none;
      }

      .dashboard-cards {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        padding: 0 0.75rem 2.8125rem;
        max-width: 31.25rem;
        margin: 0 auto;
      }

      .navbar {
        position: fixed;
        bottom: 1rem;
        left: 50%;
        transform: translateX(-50%);
        max-width: 31.25rem;
        width: calc(100vw - 2rem);
        height: 4rem;
        border-radius: var(--radius-xl);
        display: flex;
        align-items: center;
        padding: 0 0.5rem;
        box-sizing: border-box;
        z-index: 9997;
        font-family: 'Plus Jakarta Sans', sans-serif;
      }

      .nav-scroll {
        display: flex;
        align-items: center;
        gap: 0.25rem;
        overflow-x: auto;
        scrollbar-width: none;
        flex: 1;
        padding-block: 0.5rem;
      }
      .nav-scroll::before,
      .nav-scroll::after {
        content: '';
        flex: 1 0 0.5rem;
      }
      .nav-scroll::-webkit-scrollbar {
        display: none;
      }

      /* Adaptive inactive icon color based on background luminance */
      .navbar { --nav-inactive: rgba(var(--rgb-white),0.45); }
      .navbar.bg-light { --nav-inactive: rgba(var(--rgb-black),0.45); }

      .nav-item {
        background: transparent;
        border: none;
        border-radius: var(--radius-lg);
        min-width: 3rem;
        height: 3rem;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 0.625rem;
        cursor: pointer;
        position: relative;
        color: rgba(var(--rgb-white),0.45);
        font-family: inherit;
        outline: none;
        flex-shrink: 0;
        transition:
          background var(--t-fast),
          color 0.6s ease;
      }
      .navbar.bg-light .nav-item {
        color: rgba(var(--rgb-black),0.45);
      }
      @media (hover: hover) and (pointer: fine) {
        .nav-item:hover {
          background: var(--s2);
        }
      }
      @media (pointer: coarse) {
        .nav-item:active {
          animation: bounce 0.3s ease;
        }
      }
      .nav-item.active {
        background: rgba(var(--rgb-white), 0.1);
        color: var(--t1);
      }
      .navbar.bg-light .nav-item.active {
        background: rgba(var(--rgb-black), 0.08);
        color: rgba(var(--rgb-black), 0.85);
      }

      .nav-item ha-icon {
        --mdc-icon-size: 1.5rem;
        flex-shrink: 0;
        transition: color 0.6s ease;
        display: flex; align-items: center; justify-content: center;
      }

      /* 1. Pulse-light: oscillating glow on lights-on icons */
      .nav-item.has-light .nav-content > ha-icon {
        color: var(--c-light-glow);
        filter: drop-shadow(0 0 6px rgba(var(--rgb-light-glow), 0.6));
        animation: pulse-light 3s ease-in-out infinite;
      }
      @keyframes pulse-light {
        0%,
        100% {
          filter: drop-shadow(0 0 6px rgba(var(--rgb-light-glow), 0.6));
        }
        50% {
          filter: drop-shadow(0 0 2px rgba(var(--rgb-light-glow), 0.2));
        }
      }

      .nav-content {
        position: relative;
        display: flex;
        align-items: center;
        flex-shrink: 0;
      }
      .nav-item.active .nav-content {
        gap: 0.375rem;
      }

      /* 2. Humidity bar centered on nav-content (icon + label, excludes badge) */
      .humidity-bar {
        position: absolute;
        bottom: -0.375rem;
        left: 50%;
        transform: translateX(-50%);
        width: 0.875rem;
        height: 0.1875rem;
        border-radius: 2px;
        background: var(--c-temp-cold);
        opacity: 0.8;
        box-shadow: 0 0 6px rgba(var(--rgb-info), 0.4);
      }

      /* 3. Music icon bounce */
      .nav-item.has-music .nav-content > ha-icon {
        animation: pulse-music 0.8s ease-in-out infinite;
      }
      /* Combined: light glow + music bounce */
      .nav-item.has-light.has-music .nav-content > ha-icon {
        color: var(--c-light-glow);
        animation:
          pulse-light 3s ease-in-out infinite,
          pulse-music 0.8s ease-in-out infinite;
      }
      @keyframes pulse-music {
        0%,
        100% {
          transform: scale(1);
        }
        30% {
          transform: scale(1.2);
        }
        50% {
          transform: scale(0.95);
        }
        70% {
          transform: scale(1.1);
        }
      }

      /* 4. Temp badges (hot/cold) */
      .nav-temp-badge {
        position: absolute;
        top: 0.125rem;
        right: 0.25rem;
        width: 0.875rem;
        height: 0.875rem;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        pointer-events: none;
        transition: opacity var(--t-fast);
      }
      .nav-temp-badge ha-icon {
        --mdc-icon-size: var(--icon-xs);
      }
      .nav-item.has-temp-hot .nav-temp-badge {
        opacity: 1;
        color: var(--c-temp-hot);
        filter: drop-shadow(0 0 4px rgba(var(--rgb-alert), 0.6));
        animation: pulse-temp-hot 2s infinite ease-in-out;
      }
      .nav-item.has-temp-cold .nav-temp-badge {
        opacity: 1;
        color: var(--c-temp-cold);
        filter: drop-shadow(0 0 4px rgba(var(--rgb-info), 0.6));
        animation: pulse-temp-cold 2s infinite ease-in-out;
      }
      @keyframes pulse-temp-hot {
        0%,
        100% {
          transform: scale(1);
          filter: drop-shadow(0 0 0 transparent);
        }
        50% {
          transform: scale(1.15);
          filter: drop-shadow(0 0 6px rgba(var(--rgb-alert), 0.6));
        }
      }
      @keyframes pulse-temp-cold {
        0%,
        100% {
          transform: scale(1);
          filter: drop-shadow(0 0 0 transparent);
        }
        50% {
          transform: scale(1.15);
          filter: drop-shadow(0 0 6px rgba(var(--rgb-info), 0.6));
        }
      }

      /* 5. Dynamic scroll masking */
      .nav-scroll.mask-right {
        -webkit-mask-image: linear-gradient(to right, black calc(100% - 1.25rem), transparent 100%);
        mask-image: linear-gradient(to right, black calc(100% - 1.25rem), transparent 100%);
      }
      .nav-scroll.mask-left {
        -webkit-mask-image: linear-gradient(to left, black calc(100% - 1.25rem), transparent 100%);
        mask-image: linear-gradient(to left, black calc(100% - 1.25rem), transparent 100%);
      }
      .nav-scroll.mask-both {
        -webkit-mask-image: linear-gradient(
          to right,
          transparent 0%,
          black 1.25rem,
          black calc(100% - 1.25rem),
          transparent 100%
        );
        mask-image: linear-gradient(
          to right,
          transparent 0%,
          black 1.25rem,
          black calc(100% - 1.25rem),
          transparent 100%
        );
      }

      .nav-label-wrap {
        display: grid;
        grid-template-columns: 0fr;
        transition: grid-template-columns 0.35s var(--ease-out);
        overflow: hidden;
      }
      .nav-item.active .nav-label-wrap {
        grid-template-columns: 1fr;
      }
      .nav-label {
        font-size: var(--fz-base);
        font-weight: 600;
        white-space: nowrap;
        min-width: 0;
        opacity: 0;
        transition: opacity var(--t-fast);
      }
      .nav-item.active .nav-label {
        opacity: 1;
      }

      /* Focus-visible ring */
      .nav-item:focus-visible {
        outline: 2px solid var(--c-accent);
        outline-offset: 2px;
      }

      /* Settings button — always last in scroll */
      .nav-settings {
        margin-left: auto;
      }
      .nav-settings ha-icon {
        --mdc-icon-size: 1.375rem;
        color: rgba(var(--rgb-white),0.45);
        opacity: 0.65;
        transition: color 0.6s ease, opacity var(--t-fast);
        display: flex; align-items: center; justify-content: center;
      }
      .navbar.bg-light .nav-settings ha-icon {
        color: rgba(var(--rgb-black),0.45);
      }
      @media (hover: hover) and (pointer: fine) {
        .nav-settings:hover ha-icon {
          color: var(--t2);
        }
        .nav-settings:active ha-icon {
          color: var(--t1);
        }
      }
      @media (pointer: coarse) {
        .nav-settings:active {
          animation: bounce 0.3s ease;
        }
      }
    `;
