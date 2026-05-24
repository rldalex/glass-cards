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

// — Preset palette: each preset evokes its own atmosphere —
// Maps to existing tokens; rendered as colored chip backgrounds in renderPresets()
export const PRESET_COLORS: Record<string, string> = {
  eco: 'var(--c-success)',
  comfort: 'var(--c-warning)',
  boost: 'var(--cl-heat)',
  away: 'var(--c-info)',
  sleep: 'var(--c-purple)',
  activity: 'var(--c-accent)',
  none: 'var(--t3)',
};

/** Token name used as `active-color` on the standardized `<glass-chip>`. */
const PRESET_ACTIVE_COLORS: Record<string, string> = {
  eco: 'success',
  comfort: 'warning',
  boost: 'heat',
  away: 'info',
  sleep: 'purple',
  activity: 'accent',
  none: 'accent',
};

// — Action labels (shared with arc gauge) —

export const ACTION_LABELS: Record<string, string> = {
  heating: 'climate.action_heating',
  cooling: 'climate.action_cooling',
  idle: 'climate.action_idle',
  off: 'climate.action_off',
  drying: 'climate.action_drying',
  preheating: 'climate.action_heating',
};

// — Preset icons —

export const PRESET_ICONS: Record<string, string> = {
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

export const PRESET_I18N: Record<string, string> = {
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
): TemplateResult | typeof nothing {
  const modes = (entity.attributes.hvac_modes as string[]) || [];
  if (modes.length === 0) return nothing;
  const current = entity.state;

  return html`
    <div class="modes-row">
      <glass-section-title label=${t('climate.modes_label')}></glass-section-title>
      <div class="mode-tile-grid">
        ${modes.map((mode) => {
          const active = mode === current;
          const icon = HVAC_ICONS[mode] || 'mdi:thermostat';
          const label = HVAC_I18N[mode] ? t(HVAC_I18N[mode] as Parameters<typeof t>[0]) : mode;
          return html`
            <button
              class="mode-tile mode-${mode.replace('_', '-')} ${active ? 'active' : ''}"
              @click=${() => onSetMode(mode)}
              aria-label=${label}
              aria-pressed=${active ? 'true' : 'false'}
            >
              <ha-icon class="mode-tile-icon" .icon=${icon}></ha-icon>
              <span class="mode-tile-label">${label}</span>
            </button>
          `;
        })}
      </div>
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
  if (presets.length === 0) return nothing;
  const current = entity.attributes.preset_mode as string | undefined;

  return html`
    <div class="presets-row">
      <glass-section-title label=${t('climate.presets_label')}></glass-section-title>
      <div class="preset-row">
        ${presets.map((preset) => {
          const active = preset === current;
          const icon = PRESET_ICONS[preset] || 'mdi:tune';
          const label = PRESET_I18N[preset] ? t(PRESET_I18N[preset] as Parameters<typeof t>[0]) : preset;
          const activeColor = PRESET_ACTIVE_COLORS[preset] || 'accent';
          return html`
            <glass-chip
              size="sm"
              .activeColor=${activeColor}
              ?active=${active}
              .icon=${icon}
              aria-label=${label}
              @click=${() => onSetPreset(preset)}
            >${label}</glass-chip>
          `;
        })}
      </div>
    </div>
  `;
}

