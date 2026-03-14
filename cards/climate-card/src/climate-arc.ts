/**
 * Arc gauge SVG renderer for climate card normal mode.
 * Renders a 240° arc with tick marks, progress, target dot and center display.
 */

import { html, svg, nothing, type TemplateResult } from 'lit';
import { t } from '@glass-cards/i18n';
import type { HassEntity } from '@glass-cards/base-card';

// — Arc geometry constants —
const CX = 120;
const CY = 125;
const R = 90;
const START_ANGLE = -120;
const END_ANGLE = 120;
const TOTAL_ANGLE = END_ANGLE - START_ANGLE; // 240°
const TICK_COUNT = 12;

// — Action labels & icons —
const ACTION_LABELS: Record<string, string> = {
  heating: 'climate.action_heating',
  cooling: 'climate.action_cooling',
  idle: 'climate.action_idle',
  off: 'climate.action_off',
  drying: 'climate.action_drying',
  preheating: 'climate.action_heating',
};

const ACTION_ICONS: Record<string, string> = {
  heating: 'mdi:fire',
  cooling: 'mdi:snowflake',
  idle: 'mdi:timer-sand',
  off: 'mdi:power-standby',
  drying: 'mdi:water-percent',
  preheating: 'mdi:fire',
};

const PRESET_ICONS: Record<string, string> = {
  eco: 'mdi:leaf',
  comfort: 'mdi:sofa',
  boost: 'mdi:rocket-launch',
  away: 'mdi:home-export-outline',
  sleep: 'mdi:bed',
  none: 'mdi:circle-outline',
};

// — Geometry helpers —

function toRad(angle: number): number {
  return ((angle - 90) * Math.PI) / 180;
}

function pointOnArc(cx: number, cy: number, r: number, angle: number): { x: number; y: number } {
  const rad = toRad(angle);
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function arcPath(startAngle: number, endAngle: number): string {
  const p1 = pointOnArc(CX, CY, R, startAngle);
  const p2 = pointOnArc(CX, CY, R, endAngle);
  const largeArc = endAngle - startAngle > 180 ? 1 : 0;
  return `M ${p1.x} ${p1.y} A ${R} ${R} 0 ${largeArc} 1 ${p2.x} ${p2.y}`;
}

function tempToAngle(temp: number, min: number, max: number): number {
  const ratio = Math.max(0, Math.min(1, (temp - min) / (max - min)));
  return START_ANGLE + ratio * TOTAL_ANGLE;
}

// — Color class helpers —

function getArcColorClass(hvacAction: string, hvacMode: string): string {
  if (hvacAction === 'heating' || hvacAction === 'preheating') return 'heat';
  if (hvacAction === 'cooling') return 'cool';
  if (hvacMode === 'auto' || hvacMode === 'heat_cool') return 'auto-arc';
  return 'off';
}

function getActionColorClass(hvacAction: string): string {
  if (hvacAction === 'heating' || hvacAction === 'preheating') return 'heat';
  if (hvacAction === 'cooling') return 'cool';
  if (hvacAction === 'idle') return 'idle';
  return 'off';
}

// — Main renderer —

export function renderArcGauge(entity: HassEntity): TemplateResult {
  const attrs = entity.attributes;
  const isOff = entity.state === 'off';
  const hvacAction = (attrs.hvac_action as string) || (isOff ? 'off' : 'idle');
  const hvacMode = entity.state;
  const currentTemp = (attrs.current_temperature as number) ?? 0;
  const targetTemp = (attrs.temperature as number) ?? currentTemp;
  const minTemp = (attrs.min_temp as number) || 7;
  const maxTemp = (attrs.max_temp as number) || 35;
  const humidity = attrs.current_humidity as number | undefined;
  const presetMode = attrs.preset_mode as string | undefined;

  // Arc math
  const fullLen = Math.PI * R * (TOTAL_ANGLE / 180);
  const currentRatio = Math.max(0, Math.min(1, (currentTemp - minTemp) / (maxTemp - minTemp)));
  const progressLen = currentRatio * fullLen;

  const colorClass = getArcColorClass(hvacAction, hvacMode);
  const actionColorClass = getActionColorClass(hvacAction);

  // Target dot
  const targetAngle = tempToAngle(targetTemp, minTemp, maxTemp);
  const targetPos = pointOnArc(CX, CY, R, targetAngle);

  // Tick marks
  const ticks: Array<{
    inner: { x: number; y: number };
    outer: { x: number; y: number };
    isMajor: boolean;
    labelPos: { x: number; y: number };
    labelTemp: number;
  }> = [];
  for (let i = 0; i <= TICK_COUNT; i++) {
    const angle = START_ANGLE + (i / TICK_COUNT) * TOTAL_ANGLE;
    const isMajor = i % 3 === 0;
    ticks.push({
      inner: pointOnArc(CX, CY, R - 4, angle),
      outer: pointOnArc(CX, CY, R + (isMajor ? 6 : 3), angle),
      isMajor,
      labelPos: pointOnArc(CX, CY, R + 14, angle),
      labelTemp: minTemp + (i / TICK_COUNT) * (maxTemp - minTemp),
    });
  }

  // Action label i18n key
  const actionKey = ACTION_LABELS[hvacAction] || 'climate.unknown';
  const actionIcon = ACTION_ICONS[hvacAction] || 'mdi:help';

  const hasSubInfo = (humidity != null) || (presetMode && presetMode !== 'none');

  return html`
    <div class="gauge-section">
      <div class="arc-gauge">
        <svg viewBox="0 0 240 165" fill="none">
          ${ticks.map((tk) => svg`
            <line x1=${tk.inner.x} y1=${tk.inner.y} x2=${tk.outer.x} y2=${tk.outer.y}
              class=${tk.isMajor ? 'arc-tick-major' : 'arc-tick'} />
            ${tk.isMajor ? svg`
              <text x=${tk.labelPos.x} y=${tk.labelPos.y} class="arc-tick-label">
                ${Math.round(tk.labelTemp)}°
              </text>
            ` : nothing}
          `)}
          <path d=${arcPath(START_ANGLE, END_ANGLE)} class="arc-bg" />
          ${!isOff ? svg`
            <path d=${arcPath(START_ANGLE, END_ANGLE)}
              class="arc-progress ${colorClass}"
              stroke-dasharray=${fullLen}
              stroke-dashoffset=${fullLen - progressLen} />
            <circle cx=${targetPos.x} cy=${targetPos.y} r="5" class="arc-target-dot" />
          ` : nothing}
        </svg>
        <div class="gauge-center">
          <div class="gauge-current-temp ${isOff ? 'off' : ''}">${currentTemp.toFixed(1)}<span class="unit">°</span></div>
          <div class="gauge-action-label ${actionColorClass}">
            <ha-icon .icon=${actionIcon} style="--mdc-icon-size:12px;display:flex;align-items:center;justify-content:center;"></ha-icon>
            <span>${t(actionKey as Parameters<typeof t>[0])}</span>
          </div>
          ${hasSubInfo ? html`
            <div class="gauge-sub-info">
              ${humidity != null ? html`
                <ha-icon .icon=${'mdi:water-percent'} style="--mdc-icon-size:12px;display:flex;align-items:center;justify-content:center;"></ha-icon>
                <span>${humidity}%</span>
              ` : nothing}
              ${presetMode && presetMode !== 'none' ? html`
                ${humidity != null ? html`<span style="opacity:0.4">·</span>` : nothing}
                <ha-icon .icon=${PRESET_ICONS[presetMode] || 'mdi:cog'} style="--mdc-icon-size:12px;display:flex;align-items:center;justify-content:center;"></ha-icon>
                <span>${presetMode.charAt(0).toUpperCase() + presetMode.slice(1)}</span>
              ` : nothing}
            </div>
          ` : nothing}
        </div>
      </div>
    </div>
  `;
}
