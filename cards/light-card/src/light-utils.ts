import type { HassEntity } from '@glass-cards/base-card';
import { rgbToHs, rgbToHex, hexToRgb } from '@glass-cards/ui-core';

// — Types —

export type LightType = 'simple' | 'dimmable' | 'color_temp' | 'rgb';

export interface LightInfo {
  entity: HassEntity;
  entityId: string;
  name: string;
  icon: string;
  isOn: boolean;
  type: LightType;
  brightnessPct: number;
  colorTempKelvin: number | null;
  minKelvin: number;
  maxKelvin: number;
  rgbColor: [number, number, number] | null;
}

export type LayoutItem =
  | { kind: 'full'; light: LightInfo }
  | { kind: 'compact-pair'; left: LightInfo; right: LightInfo | null };

// — Constants —

export const TEMP_RANGES: [number, 'light.temp_warm' | 'light.temp_neutral' | 'light.temp_cold', string][] = [
  [3000, 'light.temp_warm', '#ffd4a3'],
  [4000, 'light.temp_warm', '#ffedb3'],
  [4800, 'light.temp_neutral', '#fff5e6'],
  [9999, 'light.temp_cold', '#e0ecf5'],
];

export const COLOR_DOTS: [number, number, number][] = [
  [251, 191, 36],
  [248, 113, 113],
  [244, 114, 182],
  [167, 139, 250],
  [129, 140, 248],
  [96, 165, 250],
  [74, 222, 128],
  [240, 240, 240],
];

export const ALLOWED_EFFECTS = ['off', 'candle', 'fire'] as const;

// — Helpers —

export function detectLightType(entity: HassEntity): LightType {
  const modes = entity.attributes.supported_color_modes as string[] | undefined;
  if (!modes || modes.length === 0) {
    return entity.attributes.brightness !== undefined ? 'dimmable' : 'simple';
  }
  if (modes.some((m) => ['hs', 'rgb', 'rgbw', 'rgbww', 'xy'].includes(m))) return 'rgb';
  if (modes.includes('color_temp')) return 'color_temp';
  if (modes.includes('brightness')) return 'dimmable';
  return 'simple';
}

export type TempLabelKey = 'light.temp_warm' | 'light.temp_neutral' | 'light.temp_cold';

export function getTempInfo(kelvin: number): { labelKey: TempLabelKey; color: string } {
  for (const [max, key, color] of TEMP_RANGES) {
    if (kelvin < max) return { labelKey: key, color };
  }
  return { labelKey: 'light.temp_cold', color: '#e0ecf5' };
}

export function rgbToRgba(rgb: [number, number, number], alpha: number): string {
  return `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${alpha})`;
}

/** Compare two colors by HS (hue ±5°, sat ±0.08) — tolerant to HA normalization. */
export function hsClose(a: [number, number, number], b: [number, number, number]): boolean {
  const ha = rgbToHs(a), hb = rgbToHs(b);
  const hueDiff = Math.abs(ha.h - hb.h);
  const hueOk = hueDiff < 5 || hueDiff > 355; // wrap-around at 360
  return hueOk && Math.abs(ha.s - hb.s) < 0.08;
}

export function effectIcon(effect: string): string {
  switch (effect) {
    case 'off': return 'mdi:flash-off';
    case 'candle': return 'mdi:candle';
    case 'fire': return 'mdi:fire';
    default: return 'mdi:auto-fix';
  }
}

// — Layout —

/** Pack lights into rows: consecutive compact lights pair up two per row,
 * a trailing/isolated compact light spans full width. */
export function buildLayout(lights: LightInfo[], isCompact: (light: LightInfo) => boolean): LayoutItem[] {
  const items: LayoutItem[] = [];
  let i = 0;
  while (i < lights.length) {
    const light = lights[i];
    if (isCompact(light)) {
      const next = i + 1 < lights.length && isCompact(lights[i + 1]) ? lights[i + 1] : null;
      if (next) {
        items.push({ kind: 'compact-pair', left: light, right: next });
        i += 2;
      } else {
        items.push({ kind: 'full', light });
        i++;
      }
    } else {
      items.push({ kind: 'full', light });
      i++;
    }
  }
  return items;
}

// — Tint —

export function computeTint(lights: LightInfo[]): { background: string; opacity: string } | null {
  const onLights = lights.filter((l) => l.isOn);
  if (onLights.length === 0) return null;

  // Halo intensity reflects how much light is actually emitted: combine the
  // count ratio with the average brightness of the lamps that are on so a
  // single lamp at 100% glows brighter than three lamps at 10%.
  const ratio = onLights.length / lights.length;
  const avgBri = onLights.reduce((sum, l) => sum + (l.brightnessPct ?? 100), 0) / onLights.length;
  const intensity = (avgBri / 100) * (0.55 + ratio * 0.45) * 0.22;

  // Dominant colour: brightest RGB lamp first, else the brightest kelvin,
  // else a warm fallback. The halo borrows the lamp's own colour.
  let color = '#fbbf24';
  const sorted = [...onLights].sort((a, b) => (b.brightnessPct ?? 0) - (a.brightnessPct ?? 0));
  const rgbTop = sorted.find((l) => l.type === 'rgb' && l.rgbColor);
  const tempTop = sorted.find((l) => l.type === 'color_temp' && l.colorTempKelvin);
  if (rgbTop?.rgbColor) color = rgbToHex(rgbTop.rgbColor);
  else if (tempTop?.colorTempKelvin) color = getTempInfo(tempTop.colorTempKelvin).color;

  return {
    background: `radial-gradient(ellipse at 30% 30%, ${color}, transparent 70%)`,
    opacity: intensity.toFixed(3),
  };
}

// — Per-light colour styling —

/** Colour fed to <glass-slider> as "r,g,b" (or a CSS var fallback). */
export function sliderColor(info: LightInfo): string {
  if (info.type === 'rgb' && info.rgbColor) return info.rgbColor.join(',');
  if (info.type === 'color_temp' && info.colorTempKelvin) {
    return hexToRgb(getTempInfo(info.colorTempKelvin).color).join(',');
  }
  return 'var(--rgb-light-glow)';
}

/** Colour of the fold separator gradient, borrowed from the lamp. */
export function foldColor(info: LightInfo): string {
  if (info.rgbColor) return rgbToRgba(info.rgbColor, 0.3);
  if (info.type === 'color_temp' && info.colorTempKelvin) {
    return rgbToRgba(hexToRgb(getTempInfo(info.colorTempKelvin).color), 0.3);
  }
  return 'rgba(var(--rgb-light-glow),0.25)';
}

/** CSS custom properties `--light-tint` (solid) + `--light-tint-glow`
 * (rgba 0.45) reflecting the light's current colour. Used by the fold to
 * colour the active dot / effect chip with the lamp's own colour. */
export function lightTintStyle(info: LightInfo): string {
  if (info.type === 'rgb' && info.rgbColor) {
    return `--light-tint:rgb(${info.rgbColor.join(',')});--light-tint-glow:${rgbToRgba(info.rgbColor, 0.45)}`;
  }
  if (info.type === 'color_temp' && info.colorTempKelvin) {
    const hex = getTempInfo(info.colorTempKelvin).color;
    return `--light-tint:${hex};--light-tint-glow:${rgbToRgba(hexToRgb(hex), 0.45)}`;
  }
  return '';
}
