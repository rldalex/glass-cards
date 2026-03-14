import { html, nothing, type TemplateResult } from 'lit';
import { t } from '@glass-cards/i18n';
import type { HassEntity } from '@glass-cards/base-card';
import { CF } from './climate-modes';

// — Temperature Stepper —

export function renderTempStepper(
  entity: HassEntity,
  unit: string,
  onChangeTemp: (temp: number) => void,
  pendingTarget?: number,
): TemplateResult | typeof nothing {
  const state = entity.state;
  if (state === 'off' || state === 'fan_only') return nothing;

  const features = (entity.attributes.supported_features as number) || 0;
  if (!(features & CF.TARGET_TEMPERATURE)) return nothing;

  // In heat_cool mode with range support, don't show single stepper
  if (state === 'heat_cool' && (features & CF.TARGET_TEMPERATURE_RANGE)) return nothing;

  const target = pendingTarget ?? (entity.attributes.temperature as number | undefined);
  const step = (entity.attributes.target_temp_step as number) || 0.5;
  const min = (entity.attributes.min_temp as number) || 7;
  const max = (entity.attributes.max_temp as number) || 35;

  if (target == null) return nothing;

  return html`
    <div class="stepper-row">
      <span class="stepper-label">${t('climate.target')}</span>
      <div class="stepper">
        <button
          class="btn-icon xs"
          @click=${() => onChangeTemp(Math.max(min, target - step))}
          aria-label=${t('climate.temp_down_aria')}
          ?disabled=${target <= min}
        >
          <ha-icon .icon=${'mdi:minus'} style="--mdc-icon-size:14px;display:flex;align-items:center;justify-content:center;"></ha-icon>
        </button>
        <span class="stepper-value">${target.toFixed(1)}${unit}</span>
        <button
          class="btn-icon xs"
          @click=${() => onChangeTemp(Math.min(max, target + step))}
          aria-label=${t('climate.temp_up_aria')}
          ?disabled=${target >= max}
        >
          <ha-icon .icon=${'mdi:plus'} style="--mdc-icon-size:14px;display:flex;align-items:center;justify-content:center;"></ha-icon>
        </button>
      </div>
    </div>
  `;
}

// — Range Slider (dual-thumb for heat_cool mode) —

export interface RangeSliderState {
  dragging: 'low' | 'high' | null;
  lowTemp: number;
  highTemp: number;
}

export function renderRangeSlider(
  entity: HassEntity,
  unit: string,
  rangeState: RangeSliderState,
  onChangeRange: (low: number, high: number) => void,
  onDragStart: (thumb: 'low' | 'high', e: PointerEvent) => void,
): TemplateResult | typeof nothing {
  const state = entity.state;
  if (state !== 'heat_cool') return nothing;

  const features = (entity.attributes.supported_features as number) || 0;
  if (!(features & CF.TARGET_TEMPERATURE_RANGE)) return nothing;

  const min = (entity.attributes.min_temp as number) || 7;
  const max = (entity.attributes.max_temp as number) || 35;
  const step = (entity.attributes.target_temp_step as number) || 0.5;

  const low = rangeState.dragging === 'low' ? rangeState.lowTemp : (entity.attributes.target_temp_low as number) ?? min;
  const high = rangeState.dragging === 'high' ? rangeState.highTemp : (entity.attributes.target_temp_high as number) ?? max;

  const range = max - min;
  const lowPct = range > 0 ? ((low - min) / range) * 100 : 0;
  const highPct = range > 0 ? ((high - min) / range) * 100 : 100;

  return html`
    <div class="range-slider-row">
      <div class="range-labels">
        <span class="range-label heat">${low.toFixed(1)}${unit}</span>
        <span class="range-label cool">${high.toFixed(1)}${unit}</span>
      </div>
      <div class="range-track">
        <div
          class="range-fill"
          style="left:${lowPct}%;right:${100 - highPct}%;"
        ></div>
        <button
          class="range-thumb low"
          role="slider"
          aria-label=${t('climate.range_low_aria')}
          aria-valuemin=${min}
          aria-valuemax=${high - step}
          aria-valuenow=${low}
          style="left:${lowPct}%;"
          @pointerdown=${(e: PointerEvent) => onDragStart('low', e)}
          @keydown=${(e: KeyboardEvent) => {
            if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
              e.preventDefault();
              onChangeRange(Math.min(low + step, high - step), high);
            } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
              e.preventDefault();
              onChangeRange(Math.max(low - step, min), high);
            }
          }}
        ></button>
        <button
          class="range-thumb high"
          role="slider"
          aria-label=${t('climate.range_high_aria')}
          aria-valuemin=${low + step}
          aria-valuemax=${max}
          aria-valuenow=${high}
          style="left:${highPct}%;"
          @pointerdown=${(e: PointerEvent) => onDragStart('high', e)}
          @keydown=${(e: KeyboardEvent) => {
            if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
              e.preventDefault();
              onChangeRange(low, Math.min(high + step, max));
            } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
              e.preventDefault();
              onChangeRange(low, Math.max(high - step, low + step));
            }
          }}
        ></button>
      </div>
    </div>
  `;
}

// — Humidity Stepper —

export function renderHumidityStepper(
  entity: HassEntity,
  onChangeHumidity: (val: number) => void,
  pendingTarget?: number,
): TemplateResult | typeof nothing {
  const features = (entity.attributes.supported_features as number) || 0;
  if (!(features & CF.TARGET_HUMIDITY)) return nothing;

  const state = entity.state;
  if (state === 'off') return nothing;

  const target = pendingTarget ?? (entity.attributes.humidity as number | undefined);
  const min = (entity.attributes.min_humidity as number) || 30;
  const max = (entity.attributes.max_humidity as number) || 99;

  if (target == null) return nothing;

  return html`
    <div class="stepper-row">
      <span class="stepper-label">
        <ha-icon .icon=${'mdi:water-percent'} style="--mdc-icon-size:14px;display:flex;align-items:center;justify-content:center;margin-right:4px;"></ha-icon>
        ${t('climate.humidity_target')}
      </span>
      <div class="stepper">
        <button
          class="btn-icon xs"
          @click=${() => onChangeHumidity(Math.max(min, target - 1))}
          aria-label=${t('climate.humidity_down_aria')}
          ?disabled=${target <= min}
        >
          <ha-icon .icon=${'mdi:minus'} style="--mdc-icon-size:14px;display:flex;align-items:center;justify-content:center;"></ha-icon>
        </button>
        <span class="stepper-value">${target}%</span>
        <button
          class="btn-icon xs"
          @click=${() => onChangeHumidity(Math.min(max, target + 1))}
          aria-label=${t('climate.humidity_up_aria')}
          ?disabled=${target >= max}
        >
          <ha-icon .icon=${'mdi:plus'} style="--mdc-icon-size:14px;display:flex;align-items:center;justify-content:center;"></ha-icon>
        </button>
      </div>
    </div>
  `;
}

// — Aux Heat Toggle —

export function renderAuxHeat(
  entity: HassEntity,
  onToggleAux: () => void,
): TemplateResult | typeof nothing {
  const features = (entity.attributes.supported_features as number) || 0;
  if (!(features & CF.AUX_HEAT)) return nothing;

  const isOn = entity.attributes.aux_heat === 'on';

  return html`
    <div class="aux-row">
      <ha-icon .icon=${'mdi:radiator'} style="--mdc-icon-size:16px;display:flex;align-items:center;justify-content:center;margin-right:6px;"></ha-icon>
      <span class="aux-label">${t('climate.aux_heat')}</span>
      <button
        class="toggle ${isOn ? 'on' : ''}"
        role="switch"
        aria-checked=${isOn ? 'true' : 'false'}
        aria-label=${t('climate.aux_heat')}
        @click=${onToggleAux}
      >
        <span class="toggle-knob"></span>
      </button>
    </div>
  `;
}
