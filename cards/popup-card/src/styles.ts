import { css } from 'lit';

export const popupCardStyles = css`
      :host {
        pointer-events: none;
      }

      .overlay {
        position: fixed;
        inset: 0;
        z-index: 9995;
        background: rgba(var(--rgb-black), 0.5);
        opacity: 0;
        transition: opacity 0.3s var(--ease-std);
        pointer-events: none;
      }
      :host([open]) .overlay {
        opacity: 1;
        pointer-events: auto;
        touch-action: none;
      }

      .dialog {
        position: fixed;
        bottom: 5.625rem;
        left: 50%;
        z-index: 9999;
        transform: translateX(-50%) scale(0.3);
        transform-origin: center bottom;
        width: calc(100vw - 1rem);
        max-width: 31.25rem;
        min-height: calc(100vh - 7.5rem);
        max-height: calc(100vh - 7.5rem);
        overflow-y: auto;
        overflow-x: hidden;
        scrollbar-width: none;
        opacity: 0;
        pointer-events: none;
        transition:
          transform 0.45s var(--ease-out),
          opacity 0.3s var(--ease-std);
        padding: 1rem;
        box-sizing: border-box;
      }
      .dialog::-webkit-scrollbar {
        display: none;
      }
      /* Container receives focus on open (APG modal pattern) — a ring on the
         whole dialog is noise; inner controls keep their own focus styles. */
      .dialog:focus {
        outline: none;
      }
      :host([open]) .dialog {
        transform: translateX(-50%) scale(1);
        opacity: 1;
        pointer-events: auto;
      }

      @keyframes swipe-exit-l {
        0%   { transform: translateX(0) scale(1); opacity: 1; }
        100% { transform: translateX(-25%) scale(0.95); opacity: 0; }
      }
      @keyframes swipe-enter-r {
        0%   { transform: translateX(25%) scale(0.95); opacity: 0; }
        100% { transform: translateX(0) scale(1); opacity: 1; }
      }
      @keyframes swipe-exit-r {
        0%   { transform: translateX(0) scale(1); opacity: 1; }
        100% { transform: translateX(25%) scale(0.95); opacity: 0; }
      }
      @keyframes swipe-enter-l {
        0%   { transform: translateX(-25%) scale(0.95); opacity: 0; }
        100% { transform: translateX(0) scale(1); opacity: 1; }
      }

      .dialog-inner.swipe-exit-left,
      .dialog-inner.swipe-exit-right,
      .dialog-inner.swipe-enter-right,
      .dialog-inner.swipe-enter-left {
        will-change: transform, opacity;
        pointer-events: none;
      }
      .dialog-inner.swipe-exit-left {
        animation: swipe-exit-l 180ms cubic-bezier(0.4, 0, 0.7, 0.2) forwards;
      }
      .dialog-inner.swipe-enter-right {
        animation: swipe-enter-r 220ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
      }
      .dialog-inner.swipe-exit-right {
        animation: swipe-exit-r 180ms cubic-bezier(0.4, 0, 0.7, 0.2) forwards;
      }
      .dialog-inner.swipe-enter-left {
        animation: swipe-enter-l 220ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
      }

      .header {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        margin-bottom: 0;
      }
      .header-sep {
        height: 0.0625rem; margin: 0.5rem 0.75rem;
        background: linear-gradient(90deg, transparent, var(--b2), transparent);
      }
      .header-left {
        display: flex;
        flex-direction: column;
        align-items: center;
        flex-shrink: 0;
      }
      /* Music pulse on the room header icon — the ha-icon is passed as
         a slot child so it lives in this card's shadow DOM and the
         selector reaches it normally. */
      glass-icon-button.header-icon.has-music > ha-icon {
        animation: pulse-music 0.8s ease-in-out infinite;
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
      .scene-dash {
        width: 1rem;
        height: 0.1875rem;
        background: var(--t4);
        border-radius: 4px;
        margin-top: 0.375rem;
        opacity: 0;
        transform-origin: center;
        transform: scaleX(0.75);
        transition:
          opacity 0.3s var(--ease-std),
          transform 0.3s var(--ease-std);
      }
      .scene-dash.visible {
        opacity: 1;
        transform: scaleX(1);
      }
      .header-info {
        flex: 1;
        min-width: 0;
      }
      .header-name {
        font-size: var(--fz-lg);
        font-weight: 700;
        color: var(--t1);
      }
      .header-meta {
        display: flex;
        gap: 0.625rem;
        font-size: var(--fz-base);
        color: var(--t3);
        font-weight: 500;
      }
      .sensor-warn {
        color: var(--c-warning, #f59e0b);
        font-size: var(--fz-sm);
        font-style: italic;
      }
      /* Cap labelled action buttons so the room name keeps space. Icon-only
         buttons are intrinsically square ~32px and not affected. */
      glass-action-button { max-width: 8rem; }

      /* Scene grid fold */
      .scenes-wrapper {
        display: grid;
        grid-template-rows: 0fr;
        transition: grid-template-rows 0.6s var(--ease-std);
        contain: layout style;
      }
      .scenes-wrapper.open {
        grid-template-rows: 1fr;
      }
      .scenes-inner {
        overflow: hidden;
        opacity: 0;
        transition: opacity 0.5s var(--ease-std);
      }
      .scenes-wrapper.open .scenes-inner {
        opacity: 1;
      }
      .scene-chips {
        display: flex;
        flex-wrap: wrap;
        gap: 0.375rem;
        padding: 0 0 0.75rem;
      }
      /* Scenes are styled by <glass-chip>; force the uppercase eyebrow
         treatment that the room popup uses (the design specifically
         wants scenes to read as labels, not headings). */
      glass-chip.scene-chip {
        text-transform: uppercase;
        letter-spacing: 0.8px;
      }

      .cards {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
      }

    `;
