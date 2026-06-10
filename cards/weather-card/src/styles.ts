import { css } from 'lit';

export const weatherCardStyles = css`
    :host {
      width: 100%;
      max-width: 31.25rem;
      margin: 0 auto;
      user-select: none;
      -webkit-user-select: none;
    }

    .weather-card-wrap {
      display: flex; flex-direction: column; gap: 0.375rem;
    }

    .card-header {
      display: flex; align-items: center; justify-content: space-between;
      padding: 0 0.375rem;
    }
    .card-title {
      font-size: var(--fz-xs); font-weight: 700;
      text-transform: uppercase; letter-spacing: 1.5px;
      color: var(--t4);
    }
    .card-location {
      font-size: var(--fz-xs); font-weight: 500; color: var(--t3);
    }

    .weather-card {
      position: relative;
      width: 100%; padding: 0.875rem 0.875rem 0.375rem;
      box-sizing: border-box;
      display: flex; flex-direction: column; justify-content: center;
    }

    .card-inner {
      position: relative; z-index: 1;
      display: flex; flex-direction: column; gap: 0.5rem;
    }

    /* ── Header: clock + weather ── */
    .wc-header {
      display: flex; align-items: flex-start; justify-content: space-between;
    }

    .wc-clock-zone {
      display: flex; flex-direction: column; gap: 0.0625rem;
    }
    .wc-clock-hm {
      font-size: var(--fz-display); font-weight: 300; line-height: 1;
      color: var(--t1); letter-spacing: -0.8px;
      font-variant-numeric: tabular-nums;
    }
    .wc-clock-sec {
      font-size: var(--fz-base); font-weight: 300; color: var(--t4);
      margin-left: 0.0625rem;
    }
    .wc-clock-date {
      font-size: var(--fz-sm); font-weight: 500; color: var(--t4);
    }
    .wc-clock-day {
      font-weight: 600; color: var(--t3);
      text-transform: capitalize;
    }

    .wc-weather-zone {
      display: flex; flex-direction: column; align-items: flex-end; gap: 0.0625rem;
    }
    .wc-temp-row {
      display: flex; align-items: baseline; gap: 0.125rem;
    }
    .wc-temp {
      font-size: var(--fz-display); font-weight: 700; line-height: 1;
      color: var(--t1); letter-spacing: -0.5px;
    }
    .wc-temp-unit {
      font-size: var(--fz-base); font-weight: 400; color: var(--t3);
    }
    .wc-cond-row {
      display: flex; align-items: center; gap: 0.25rem;
    }
    .wc-cond-icon {
      --mdc-icon-size: 0.8125rem;
      width: 0.8125rem; height: 0.8125rem;
      display: flex; align-items: center; justify-content: center;
      color: var(--t3);
      transition: color var(--t-med), filter var(--t-med);
    }
    .wc-cond-icon.sunny { color: #fbbf24; filter: drop-shadow(0 0 4px rgba(var(--rgb-warning),0.35)); }
    .wc-cond-icon.partly_cloudy { color: #fcd34d; }
    .wc-cond-icon.cloudy { color: var(--t2); }
    .wc-cond-icon.rainy { color: #60a5fa; filter: drop-shadow(0 0 4px rgba(var(--rgb-info),0.3)); }
    .wc-cond-icon.pouring { color: #3b82f6; filter: drop-shadow(0 0 4px rgba(59,130,246,0.4)); }
    .wc-cond-icon.stormy { color: #a78bfa; filter: drop-shadow(0 0 4px rgba(var(--rgb-purple),0.35)); }
    .wc-cond-icon.lightning { color: #c084fc; filter: drop-shadow(0 0 5px rgba(192,132,252,0.4)); }
    .wc-cond-icon.snowy { color: #e0f2fe; }
    .wc-cond-icon.snowy_rainy { color: #93c5fd; }
    .wc-cond-icon.hail { color: #bae6fd; filter: drop-shadow(0 0 3px rgba(186,230,253,0.3)); }
    .wc-cond-icon.foggy { color: var(--t3); }
    .wc-cond-icon.windy { color: #6ee7b7; filter: drop-shadow(0 0 3px rgba(110,231,183,0.3)); }
    .wc-cond-icon.windy_variant { color: #6ee7b7; }
    .wc-cond-icon.clear_night { color: #818cf8; filter: drop-shadow(0 0 4px rgba(var(--rgb-accent),0.35)); }
    .wc-cond-icon.exceptional { color: #fca5a5; filter: drop-shadow(0 0 4px rgba(252,165,165,0.3)); }
    .wc-cond-text {
      font-size: var(--fz-sm); font-weight: 500; color: var(--t3);
    }
    .wc-feels {
      font-size: var(--fz-xs); font-weight: 500; color: var(--t4);
    }

    /* ── Canvas animation ── */
    .wc-anim {
      position: absolute; inset: 0; border-radius: inherit;
      overflow: hidden; pointer-events: none; z-index: 0;
    }

    /* ── Sparkline ── */
    .wc-spark-zone {
      position: relative;
      width: 100%; height: 4rem;
      border-radius: var(--radius-sm);
      overflow: hidden;
    }
    .wc-spark-svg {
      width: 100%; height: 100%;
      display: block;
    }
    .wc-spark-line {
      fill: none; stroke-width: 2;
      stroke-linecap: round; stroke-linejoin: round;
      transition: stroke var(--t-med), d var(--t-med);
    }
    .wc-spark-area {
      stroke: none;
      transition: fill var(--t-med), d var(--t-med);
    }
    .wc-spark-labels {
      position: absolute; inset: 0;
      display: flex; justify-content: space-between; align-items: flex-end;
      padding: 0 0.25rem 0.25rem;
      pointer-events: none;
    }
    .wc-spark-lbl {
      font-size: var(--fz-xxs); font-weight: 600; color: var(--t4);
      text-align: center;
    }
    .wc-spark-now {
      position: absolute;
      top: 0; bottom: 0;
      width: 0.0625rem;
      background: linear-gradient(to bottom, transparent, rgba(var(--rgb-white),0.15), transparent);
      pointer-events: none;
    }
    .wc-spark-now-dot {
      position: absolute; top: 0;
      width: 0.375rem; height: 0.375rem; border-radius: 50%;
      background: var(--t1);
      box-shadow: 0 0 6px rgba(var(--rgb-white),0.4);
      transform: translate(-50%, -50%);
      pointer-events: none;
    }

    /* ── Metrics Grid ── */
    /* Metric row: compact icon + value on a single line, no label text */
    .wc-metrics {
      display: flex; align-items: center; justify-content: space-between;
      gap: 0.5rem;
      padding: 0.3125rem 0.5rem;
      border-radius: var(--radius-sm);
      background: var(--s1);
      border: 1px solid var(--b1);
      margin-bottom: 0.25rem;
      overflow-x: auto;
      scrollbar-width: none;
    }
    .wc-metrics::-webkit-scrollbar { display: none; }
    .wc-metric {
      display: inline-flex; align-items: center; gap: 0.25rem;
      flex-shrink: 0;
      font-variant-numeric: tabular-nums;
    }
    .wc-metric ha-icon {
      --mdc-icon-size: 0.8125rem;
      width: 0.8125rem; height: 0.8125rem;
      display: flex; align-items: center; justify-content: center;
      color: var(--t4);
      flex-shrink: 0;
    }
    .wc-metric.humidity ha-icon { color: rgb(var(--rgb-info)); }
    .wc-metric.pressure ha-icon { color: rgba(148,163,184,0.85); }
    .wc-metric.wind ha-icon { color: rgba(110,231,183,0.85); }
    .wc-metric.uv ha-icon { color: rgb(var(--rgb-warning)); }
    .wc-metric.visibility ha-icon { color: rgba(148,163,184,0.7); }
    .wc-metric.sunrise ha-icon { color: rgb(var(--rgb-warning)); }
    .wc-metric.sunset ha-icon { color: rgba(251,146,60,0.95); }
    .wc-metric-val {
      font-size: var(--fz-sm); font-weight: 600; color: var(--t2);
      line-height: 1;
      display: inline-flex; align-items: baseline; gap: 0.125rem;
    }
    .wc-metric-unit { font-size: var(--fz-xxs); font-weight: 400; color: var(--t4); }
    .wc-metric-dir { font-size: var(--fz-xxs); font-weight: 600; color: var(--t3); margin-left: 0.0625rem; }

    /* ── Forecast tabs / Fold separator ── */
    .wc-fold-sep {
      height: 0.0625rem; margin: 0 0.75rem; overflow: hidden;
      background: linear-gradient(90deg, transparent, rgba(var(--rgb-accent),0.2), transparent);
      opacity: 0; transition: opacity var(--t-layout);
    }
    .wc-fold-sep.visible { opacity: 1; }

    .wc-forecast-zone {
      display: flex; flex-direction: column; gap: 0.375rem;
      margin-top: 0.125rem;
    }

    /* ── Daily list ── */
    .wc-daily-list, .wc-hourly-list {
      display: flex; flex-direction: column; gap: 0.0625rem;
      padding: 0.125rem 0;
    }
    .wc-day-row {
      display: grid; grid-template-columns: 2.625rem 1.125rem 1fr 2.625rem 2.375rem;
      align-items: center; gap: 0.3125rem;
      padding: 0.3125rem 0.5rem 0.3125rem 0.25rem;
      border-radius: var(--radius-sm);
      border: 1px solid transparent;
      transition: background var(--t-fast), border-color var(--t-fast), transform var(--t-fast);
    }
    .wc-day-row:first-child {
      background: color-mix(in srgb, var(--c-accent) 10%, transparent);
      border-color: color-mix(in srgb, var(--c-accent) 28%, transparent);
    }
    .wc-day-label {
      font-size: var(--fz-sm); font-weight: 600; color: var(--t3);
    }
    .wc-day-row:first-child .wc-day-label { color: var(--t2); }
    .wc-day-icon {
      --mdc-icon-size: var(--icon-sm);
      width: 0.875rem; height: 0.875rem;
      display: flex; align-items: center; justify-content: center;
      color: var(--t3);
    }
    .wc-day-icon.sunny, .wc-hour-icon.sunny { color: #fbbf24; }
    .wc-day-icon.partly_cloudy, .wc-hour-icon.partly_cloudy { color: #fcd34d; }
    .wc-day-icon.cloudy, .wc-hour-icon.cloudy { color: var(--t2); }
    .wc-day-icon.rainy, .wc-hour-icon.rainy { color: #60a5fa; }
    .wc-day-icon.pouring, .wc-hour-icon.pouring { color: #3b82f6; }
    .wc-day-icon.stormy, .wc-hour-icon.stormy { color: #a78bfa; }
    .wc-day-icon.lightning, .wc-hour-icon.lightning { color: #c084fc; }
    .wc-day-icon.snowy, .wc-hour-icon.snowy { color: #e0f2fe; }
    .wc-day-icon.snowy_rainy, .wc-hour-icon.snowy_rainy { color: #93c5fd; }
    .wc-day-icon.hail, .wc-hour-icon.hail { color: #bae6fd; }
    .wc-day-icon.foggy, .wc-hour-icon.foggy { color: var(--t3); }
    .wc-day-icon.windy, .wc-hour-icon.windy { color: #6ee7b7; }
    .wc-day-icon.windy_variant, .wc-hour-icon.windy_variant { color: #6ee7b7; }
    .wc-day-icon.clear_night, .wc-hour-icon.clear_night { color: #818cf8; }
    .wc-day-icon.exceptional, .wc-hour-icon.exceptional { color: #fca5a5; }
    .wc-day-cond {
      font-size: var(--fz-sm); font-weight: 500; color: var(--t4);
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }
    .wc-day-temps {
      display: flex; align-items: baseline; gap: 0.125rem; justify-content: flex-end;
    }
    .wc-day-hi { font-size: var(--fz-base); font-weight: 700; color: var(--t1); }
    .wc-day-lo { font-size: var(--fz-sm); font-weight: 500; color: var(--t4); }
    .wc-day-precip {
      font-size: var(--fz-xs); font-weight: 500; color: rgba(var(--rgb-info),0.5);
      text-align: right;
    }

    /* ── Hourly list ── */
    .wc-hour-row {
      display: grid; grid-template-columns: 2.625rem 1.125rem 1fr 2.375rem 2rem;
      align-items: center; gap: 0.3125rem;
      padding: 0.3125rem 0.5rem 0.3125rem 0.25rem;
      border-radius: var(--radius-sm);
      border: 1px solid transparent;
      transition: background var(--t-fast), border-color var(--t-fast), transform var(--t-fast);
    }
    .wc-hour-row.now {
      background: color-mix(in srgb, var(--c-accent) 10%, transparent);
      border-color: color-mix(in srgb, var(--c-accent) 28%, transparent);
    }
    .wc-hour-time {
      font-size: var(--fz-sm); font-weight: 600; color: var(--t3);
    }
    .wc-hour-row.now .wc-hour-time { color: var(--t2); }
    .wc-hour-icon {
      --mdc-icon-size: var(--icon-sm);
      width: 0.875rem; height: 0.875rem;
      display: flex; align-items: center; justify-content: center;
      color: var(--t3);
    }
    .wc-hour-cond {
      font-size: var(--fz-sm); font-weight: 500; color: var(--t4);
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }
    .wc-hour-temp {
      font-size: var(--fz-base); font-weight: 700; color: var(--t1);
      text-align: right;
    }
    .wc-hour-precip {
      font-size: var(--fz-xs); font-weight: 500; color: rgba(var(--rgb-info),0.5);
      text-align: right;
    }

    @media (hover: hover) and (pointer: fine) {
      .wc-day-row:hover, .wc-hour-row:hover {
        background: var(--s1);
        transform: translateX(2px);
        border-color: var(--b2);
      }
    }
    @media (pointer: coarse) {
      .wc-day-row:active, .wc-hour-row:active { animation: bounce 0.3s ease; }
    }
    @media (prefers-reduced-motion: reduce) {
      .wc-day-row:hover, .wc-hour-row:hover { transform: none; }
      .wc-fc-capsule { transition: none; }
    }

    /* ── Tint (top, dynamic per condition) ── */
    .tint {
      position: absolute; inset: 0; border-radius: inherit;
      pointer-events: none; z-index: 0;
      transition: opacity var(--t-slow);
    }
    /* Atmospheric halo at the card bottom — accent-tinted, coherent with
       library / spotify / climate / calendar */
    .weather-card { position: relative; }
    .weather-card::after {
      content: ''; position: absolute; left: 0; right: 0; bottom: 0;
      height: 45%; pointer-events: none; z-index: 0;
      background: radial-gradient(ellipse 70% 60% at 50% 100%, rgba(var(--rgb-accent), 0.08), transparent 70%);
      transition: opacity var(--t-slow);
    }
    /* Only card-inner sits above the halo. Tint and canvas keep their own
       absolute positioning so they don't enter the flow and explode the
       card height. */
    .weather-card .card-inner { position: relative; z-index: 1; }
    @media (prefers-reduced-motion: reduce) {
      .weather-card::after { transition: none; }
    }
  `;
