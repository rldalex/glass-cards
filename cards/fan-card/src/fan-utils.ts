import type { HassEntity } from '@glass-cards/base-card';

// — Feature bitmask (HA FanEntityFeature) —

export const FanFeature = {
  SET_SPEED: 1,
  OSCILLATE: 2,
  DIRECTION: 4,
  PRESET_MODE: 8,
  TURN_OFF: 16,
  TURN_ON: 32,
} as const;

// — Types —

export interface FanInfo {
  entity: HassEntity;
  entityId: string;
  name: string;
  icon: string;
  isCeiling: boolean;
  isOn: boolean;
  percentage: number;
  speedCount: number;
  direction: string | null;
  oscillating: boolean;
  presetMode: string | null;
  presetModes: string[];
  supportedFeatures: number;
  lightEntityId: string | null;
  isSimple: boolean;
}

export interface FanBackendConfig {
  show_header: boolean;
}

export interface RoomFanConfig {
  hidden_entities: string[];
  entity_order: string[];
  entity_layouts: Record<string, string>;
}

/** Minimal hass shape needed by the pure helpers below. */
export interface FanHassLike {
  states: Record<string, HassEntity>;
  devices?: Record<string, { id: string }>;
  entities?: Record<string, { entity_id: string; device_id?: string | null; icon?: string | null }>;
}

// — Preset modes —

export const PRESET_MODE_ICONS: Record<string, string> = {
  auto: 'mdi:autorenew',
  eco: 'mdi:leaf',
  night: 'mdi:weather-night',
  nuit: 'mdi:weather-night',
  comfort: 'mdi:sofa',
  confort: 'mdi:sofa',
  silent: 'mdi:volume-off',
  silence: 'mdi:volume-off',
  turbo: 'mdi:lightning-bolt',
};

export type FanPresetKey =
  | 'fan.preset_auto'
  | 'fan.preset_eco'
  | 'fan.preset_night'
  | 'fan.preset_comfort'
  | 'fan.preset_silent'
  | 'fan.preset_turbo';

const PRESET_I18N: Record<string, FanPresetKey> = {
  auto: 'fan.preset_auto',
  eco: 'fan.preset_eco',
  night: 'fan.preset_night',
  nuit: 'fan.preset_night',
  comfort: 'fan.preset_comfort',
  confort: 'fan.preset_comfort',
  silent: 'fan.preset_silent',
  silence: 'fan.preset_silent',
  turbo: 'fan.preset_turbo',
};

/** i18n key for a preset mode, or null for unknown modes (render capitalized raw). */
export function presetLabelKey(mode: string): FanPresetKey | null {
  return PRESET_I18N[mode.toLowerCase()] ?? null;
}

// — Speed step math —

export function pctToStep(pct: number, speedCount: number): number {
  if (pct <= 0) return 0;
  return Math.max(1, Math.min(speedCount, Math.round(pct / (100 / speedCount))));
}

export function stepToPct(step: number, speedCount: number): number {
  if (step <= 0) return 0;
  return (step / speedCount) * 100;
}

export function stepToPctDisplay(step: number, speedCount: number): number {
  return Math.round(stepToPct(step, speedCount));
}

export function snapPct(pct: number, speedCount: number): number {
  return stepToPct(pctToStep(pct, speedCount), speedCount);
}

export function spinDuration(pct: number): string {
  if (pct <= 0) return '3s';
  if (pct <= 20) return '4s';
  if (pct <= 40) return '2.5s';
  if (pct <= 60) return '1.6s';
  if (pct <= 80) return '1.1s';
  return '0.7s';
}

// — Ceiling fan detection —

export function isCeilingFan(entityId: string, entity: HassEntity): boolean {
  const dc = entity.attributes.device_class as string | undefined;
  if (dc === 'ceiling') return true;
  const lower = entityId.toLowerCase();
  return lower.includes('ceiling') || lower.includes('plafond') || lower.includes('plafonnier');
}

export function findCeilingLight(fanEntityId: string, hass: FanHassLike): string | null {
  const suffix = fanEntityId.replace('fan.', '');
  // Naming convention: fan.X → light.X or light.X_light
  const candidates = [`light.${suffix}`, `light.${suffix}_light`];
  for (const c of candidates) {
    if (hass.states[c]) return c;
  }
  // Device match: find light entity on same device
  if (hass.entities) {
    const fanEntry = hass.entities[fanEntityId];
    if (fanEntry?.device_id) {
      for (const [eid, entry] of Object.entries(hass.entities)) {
        if (eid.startsWith('light.') && entry.device_id === fanEntry.device_id && hass.states[eid]) {
          return eid;
        }
      }
    }
  }
  return null;
}

// — Fan info —

export function buildFanInfo(entityId: string, entity: HassEntity, hass: FanHassLike): FanInfo {
  const attrs = entity.attributes;
  const isOn = entity.state === 'on';
  const percentage = (attrs.percentage as number) ?? 0;
  const pctStep = attrs.percentage_step as number | undefined;
  const rawCount = attrs.speed_count as number | undefined;
  const speedCount = rawCount ?? (pctStep && pctStep > 0 ? Math.round(100 / pctStep) : 3);
  const direction = (attrs.direction as string) || null;
  const oscillating = (attrs.oscillating as boolean) || false;
  const presetMode = (attrs.preset_mode as string) || null;
  const presetModes = (attrs.preset_modes as string[]) || [];
  const supportedFeatures = (attrs.supported_features as number) || 0;
  const ceiling = isCeilingFan(entityId, entity);

  const registryIcon = hass.entities?.[entityId]?.icon;
  const attrIcon = attrs.icon as string | undefined;
  const icon = registryIcon || attrIcon || (ceiling ? 'mdi:ceiling-fan' : 'mdi:fan');

  const lightEntityId = ceiling ? findCeilingLight(entityId, hass) : null;

  // Simple fan = speed only, no preset/direction/oscillation/ceiling light
  const hasPreset = !!(supportedFeatures & FanFeature.PRESET_MODE) && presetModes.length > 0;
  const hasDirection = !!(supportedFeatures & FanFeature.DIRECTION);
  const hasOscillate = !!(supportedFeatures & FanFeature.OSCILLATE);
  const isSimple = !hasPreset && !hasDirection && !hasOscillate && !lightEntityId;

  return {
    entity,
    entityId,
    name: (attrs.friendly_name as string) || entityId.split('.')[1] || entityId,
    icon,
    isCeiling: ceiling,
    isOn,
    percentage: isOn ? percentage : 0,
    speedCount,
    direction,
    oscillating,
    presetMode: isOn ? presetMode : null,
    presetModes,
    supportedFeatures,
    lightEntityId,
    isSimple,
  };
}

export function hasControls(fan: FanInfo): boolean {
  const sf = fan.supportedFeatures;
  return !!(sf & FanFeature.SET_SPEED) || !!(sf & FanFeature.PRESET_MODE) || !!(sf & FanFeature.DIRECTION) || !!(sf & FanFeature.OSCILLATE) || !!fan.lightEntityId;
}

// — Layout —

export type LayoutItem<T> =
  | { kind: 'full'; item: T }
  | { kind: 'pair'; left: T; right: T };

/** Pack items into rows: consecutive compact items pair up two per row,
 * a trailing/isolated compact item spans full width. */
export function buildLayout<T>(items: T[], isCompact: (item: T) => boolean): LayoutItem<T>[] {
  const result: LayoutItem<T>[] = [];
  let i = 0;
  while (i < items.length) {
    const item = items[i];
    if (isCompact(item) && i + 1 < items.length && isCompact(items[i + 1])) {
      result.push({ kind: 'pair', left: item, right: items[i + 1] });
      i += 2;
    } else {
      result.push({ kind: 'full', item });
      i++;
    }
  }
  return result;
}
