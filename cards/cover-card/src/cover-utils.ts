import type { HassEntity } from '@glass-cards/base-card';

// — Feature bitmask (HA CoverEntityFeature) —

export const F = {
  OPEN: 1,
  CLOSE: 2,
  SET_POSITION: 4,
  STOP: 8,
  OPEN_TILT: 16,
  CLOSE_TILT: 32,
  STOP_TILT: 64,
  SET_TILT_POSITION: 128,
} as const;

// — Device class icon map [open, closed] —

export const DC_ICONS: Record<string, [string, string]> = {
  shutter:  ['mdi:window-shutter-open',  'mdi:window-shutter'],
  blind:    ['mdi:blinds-open',          'mdi:blinds'],
  curtain:  ['mdi:curtains',             'mdi:curtains-closed'],
  garage:   ['mdi:garage-open',          'mdi:garage'],
  gate:     ['mdi:gate-open',            'mdi:gate'],
  door:     ['mdi:door-open',            'mdi:door-closed'],
  awning:   ['mdi:awning-outline',       'mdi:awning-outline'],
  shade:    ['mdi:roller-shade-open',    'mdi:roller-shade'],
  window:   ['mdi:window-open',          'mdi:window-closed'],
  damper:   ['mdi:valve-open',           'mdi:valve'],
};

// — Transport icons per device_class category —

export interface TransportInfo {
  open: string;
  close: string;
  stop: string | null;
}

export const TRANSPORT: Record<string, TransportInfo> = {
  vertical: { open: 'mdi:arrow-up',       close: 'mdi:arrow-down',      stop: 'mdi:stop' },
  garage:   { open: 'mdi:garage-open',     close: 'mdi:garage',          stop: 'mdi:stop' },
  gate:     { open: 'mdi:gate-open',       close: 'mdi:gate',            stop: 'mdi:stop' },
  door:     { open: 'mdi:door-open',       close: 'mdi:door-closed',     stop: null },
  damper:   { open: 'mdi:valve-open',      close: 'mdi:valve',           stop: null },
  window:   { open: 'mdi:window-open',     close: 'mdi:window-closed',   stop: null },
};

// — Helpers —

export function coverIcon(dc: string, isOpen: boolean): string {
  const pair = DC_ICONS[dc] || DC_ICONS.shutter;
  return pair[isOpen ? 0 : 1];
}

export function getTransport(dc: string): TransportInfo {
  if (['shutter', 'blind', 'shade', 'curtain', 'awning'].includes(dc)) return TRANSPORT.vertical;
  return TRANSPORT[dc] || TRANSPORT.vertical;
}

export type CoverStateKey = 'cover.open' | 'cover.closed' | 'cover.opening' | 'cover.closing';

/** i18n key for a cover state, or null for unknown states (render raw). */
export function stateLabelKey(state: string): CoverStateKey | null {
  switch (state) {
    case 'open': return 'cover.open';
    case 'closed': return 'cover.closed';
    case 'opening': return 'cover.opening';
    case 'closing': return 'cover.closing';
    default: return null;
  }
}

// — Cover info —

export interface CoverInfo {
  entity: HassEntity;
  entityId: string;
  name: string;
  isOpen: boolean;
  position: number | null;
  tiltPosition: number | null;
  deviceClass: string;
  features: number;
}

export function buildCoverInfo(entityId: string, entity: HassEntity): CoverInfo {
  const attrs = entity.attributes;
  const dc = (attrs.device_class as string) || 'shutter';
  const features = (attrs.supported_features as number) || 0;
  const pos = attrs.current_position as number | undefined;
  const tilt = attrs.current_tilt_position as number | undefined;
  const isOpen = entity.state === 'open' || entity.state === 'opening';

  return {
    entity,
    entityId,
    name: (attrs.friendly_name as string) || entityId.split('.')[1] || entityId,
    isOpen,
    position: pos ?? null,
    tiltPosition: tilt ?? null,
    deviceClass: dc,
    features,
  };
}

// — Presets —

export interface CoverPreset {
  position: number;
  icon: string;
  /** i18n key for the 0/100 endpoints; null → render `${position}%`. */
  labelKey: 'cover.preset_closed' | 'cover.preset_open' | null;
}

/** Preset chips for the fold. Position-capable covers get the configured
 * per-entity presets (or 0/25/50/75/100); binary covers get Open/Close only. */
export function buildPresets(deviceClass: string, features: number, entityPresets?: number[]): CoverPreset[] {
  if (!(features & F.SET_POSITION)) {
    return [
      { position: 0, icon: coverIcon(deviceClass, false), labelKey: 'cover.preset_closed' },
      { position: 100, icon: coverIcon(deviceClass, true), labelKey: 'cover.preset_open' },
    ];
  }
  const positions = entityPresets && entityPresets.length > 0 ? entityPresets : [0, 25, 50, 75, 100];
  return positions.map((p) => ({
    position: p,
    icon: coverIcon(deviceClass, p >= 50),
    labelKey: p === 0 ? 'cover.preset_closed' : p === 100 ? 'cover.preset_open' : null,
  }));
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
