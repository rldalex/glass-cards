import { html, nothing, type TemplateResult } from 'lit';
import { t } from '@glass-cards/i18n';
import type { HassEntity } from '@glass-cards/base-card';

// — ClimateEntityFeature bitmask —

export const CF = {
  TARGET_TEMPERATURE: 1,
  TARGET_TEMPERATURE_RANGE: 2,
  TARGET_HUMIDITY: 4,
  FAN_MODE: 8,
  PRESET_MODE: 16,
  SWING_MODE: 32,
  AUX_HEAT: 64,
  TURN_ON: 128,
  TURN_OFF: 256,
} as const;

// — HVAC mode icons & colors —

export const HVAC_ICONS: Record<string, string> = {
  heat: 'mdi:fire',
  cool: 'mdi:snowflake',
  heat_cool: 'mdi:sun-snowflake-variant',
  auto: 'mdi:thermostat-auto',
  dry: 'mdi:water-percent',
  fan_only: 'mdi:fan',
  off: 'mdi:power',
};

export const HVAC_COLORS: Record<string, string> = {
  heat: 'var(--cl-heat)',
  cool: 'var(--cl-cool)',
  heat_cool: 'var(--cl-auto)',
  auto: 'var(--cl-auto)',
  dry: 'var(--cl-dry)',
  fan_only: 'var(--cl-fan)',
  off: 'var(--t4)',
};

// — Preset icons —

const PRESET_ICONS: Record<string, string> = {
  eco: 'mdi:leaf',
  comfort: 'mdi:sofa',
  boost: 'mdi:rocket-launch',
  away: 'mdi:home-export-outline',
  sleep: 'mdi:bed',
  activity: 'mdi:motion-sensor',
  none: 'mdi:cancel',
};

// — HVAC mode i18n keys —

const HVAC_I18N: Record<string, string> = {
  heat: 'climate.mode_heat',
  cool: 'climate.mode_cool',
  heat_cool: 'climate.mode_heat_cool',
  auto: 'climate.mode_auto',
  dry: 'climate.mode_dry',
  fan_only: 'climate.mode_fan_only',
  off: 'climate.mode_off',
};

const PRESET_I18N: Record<string, string> = {
  eco: 'climate.preset_eco',
  comfort: 'climate.preset_comfort',
  boost: 'climate.preset_boost',
  away: 'climate.preset_away',
  sleep: 'climate.preset_sleep',
  activity: 'climate.preset_activity',
  none: 'climate.preset_none',
};

// — Renderers —

export function renderHvacModes(
  entity: HassEntity,
  onSetMode: (mode: string) => void,
): TemplateResult {
  const modes = (entity.attributes.hvac_modes as string[]) || [];
  const current = entity.state;

  return html`
    <div class="chip-row">
      ${modes.map((mode) => {
        const active = mode === current;
        const color = HVAC_COLORS[mode] || 'var(--t4)';
        const icon = HVAC_ICONS[mode] || 'mdi:thermostat';
        const label = HVAC_I18N[mode] ? t(HVAC_I18N[mode] as any) : mode;
        return html`
          <button
            class="chip ${active ? 'active' : ''}"
            style="${active ? `--chip-color:${color};` : ''}"
            @click=${() => onSetMode(mode)}
            aria-label=${label}
            aria-pressed=${active ? 'true' : 'false'}
          >
            <ha-icon .icon=${icon} style="--mdc-icon-size:14px;display:flex;align-items:center;justify-content:center;"></ha-icon>
            <span>${label}</span>
          </button>
        `;
      })}
    </div>
  `;
}

export function renderPresets(
  entity: HassEntity,
  onSetPreset: (preset: string) => void,
): TemplateResult | typeof nothing {
  if (entity.state === 'off') return nothing;
  const features = (entity.attributes.supported_features as number) || 0;
  if (!(features & CF.PRESET_MODE)) return nothing;

  const presets = (entity.attributes.preset_modes as string[]) || [];
  const current = entity.attributes.preset_mode as string | undefined;

  return html`
    <div class="chip-row">
      ${presets.map((preset) => {
        const active = preset === current;
        const icon = PRESET_ICONS[preset] || 'mdi:tune';
        const label = PRESET_I18N[preset] ? t(PRESET_I18N[preset] as any) : preset;
        return html`
          <button
            class="chip ${active ? 'active' : ''}"
            @click=${() => onSetPreset(preset)}
            aria-label=${label}
            aria-pressed=${active ? 'true' : 'false'}
          >
            <ha-icon .icon=${icon} style="--mdc-icon-size:14px;display:flex;align-items:center;justify-content:center;"></ha-icon>
            <span>${label}</span>
          </button>
        `;
      })}
    </div>
  `;
}

export function renderFanModes(
  entity: HassEntity,
  onSetFan: (mode: string) => void,
): TemplateResult | typeof nothing {
  if (entity.state === 'off') return nothing;
  const features = (entity.attributes.supported_features as number) || 0;
  if (!(features & CF.FAN_MODE)) return nothing;

  const modes = (entity.attributes.fan_modes as string[]) || [];
  const current = entity.attributes.fan_mode as string | undefined;

  return html`
    <div class="chip-row">
      ${modes.map((mode) => html`
        <button
          class="chip ${mode === current ? 'active' : ''}"
          @click=${() => onSetFan(mode)}
          aria-label="${t('climate.fan_mode')}: ${mode}"
          aria-pressed=${mode === current ? 'true' : 'false'}
        >
          <ha-icon .icon=${'mdi:fan'} style="--mdc-icon-size:14px;display:flex;align-items:center;justify-content:center;"></ha-icon>
          <span>${mode}</span>
        </button>
      `)}
    </div>
  `;
}

export function renderSwingModes(
  entity: HassEntity,
  onSetSwing: (mode: string) => void,
): TemplateResult | typeof nothing {
  if (entity.state === 'off') return nothing;
  const features = (entity.attributes.supported_features as number) || 0;
  if (!(features & CF.SWING_MODE)) return nothing;

  const modes = (entity.attributes.swing_modes as string[]) || [];
  const current = entity.attributes.swing_mode as string | undefined;

  return html`
    <div class="chip-row">
      ${modes.map((mode) => html`
        <button
          class="chip ${mode === current ? 'active' : ''}"
          @click=${() => onSetSwing(mode)}
          aria-label="${t('climate.swing_mode')}: ${mode}"
          aria-pressed=${mode === current ? 'true' : 'false'}
        >
          <ha-icon .icon=${'mdi:arrow-oscillating'} style="--mdc-icon-size:14px;display:flex;align-items:center;justify-content:center;"></ha-icon>
          <span>${mode}</span>
        </button>
      `)}
    </div>
  `;
}
