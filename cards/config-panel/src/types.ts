import type { TranslationKey } from '@glass-cards/i18n';

export type { NavState } from './nav-state.js';

// — Shared Types —

export interface RoomEntry {
  areaId: string;
  name: string;
  icon: string;
  entityCount: number;
  visible: boolean;
  lightsOn: number;
  temperature: string | null;
  tempValue: number | null;
  humidity: string | null;
  humidityValue: number | null;
  mediaPlaying: boolean;
}

export const DEFAULT_TEMP_HIGH = 24.0;
export const DEFAULT_TEMP_LOW = 17.0;
export const DEFAULT_HUMIDITY_THRESHOLD = 65;

export interface CardEntry {
  id: string;
  nameKey: TranslationKey | null;
  icon: string;
  descKey: TranslationKey | null;
  count: number;
  visible: boolean;
}

export interface SceneEntry {
  entityId: string;
  name: string;
  visible: boolean;
}

export interface LightEntry {
  entityId: string;
  name: string;
  isOn: boolean;
  brightnessPct: number;
  layout: 'full' | 'compact';
  visible: boolean;
}

export interface SchedulePeriodEdit {
  start: string;
  end: string;
  recurring: boolean;
}

// Room-card tables derive from the shared card registry — keep NO hand-copied
// per-card data here (diverging copies caused the 'media'/'media_player' bug).
import { GLASS_CARDS, ROOM_CARD_ORDER } from '@glass-cards/base-card';

export const DEFAULT_CARD_ORDER: readonly string[] = ROOM_CARD_ORDER;

export const IMPLEMENTED_CARDS = new Set(ROOM_CARD_ORDER);

/** Entity domain → icon, for every registry card that has a domain. */
export const CARD_ICONS: Record<string, string> = Object.fromEntries(
  GLASS_CARDS.filter((c) => c.domain).map((c) => [c.domain as string, c.icon]),
);

export function getCardMeta(domain: string): { nameKey: TranslationKey | null; icon: string; descKey: TranslationKey | null } {
  const known = domain in CARD_ICONS;
  return {
    nameKey: known ? (`config.domain_${domain}` as TranslationKey) : null,
    icon: CARD_ICONS[domain] || 'mdi:help-circle',
    descKey: known ? (`config.domain_${domain}_desc` as TranslationKey) : null,
  };
}

export const ROOM_ICONS = [
  'mdi:sofa', 'mdi:stove', 'mdi:bed', 'mdi:desk',
  'mdi:shower', 'mdi:home', 'mdi:movie-open', 'mdi:music',
  'mdi:wrench', 'mdi:flower', 'mdi:white-balance-sunny', 'mdi:weather-night',
  'mdi:lightbulb', 'mdi:snowflake', 'mdi:fire', 'mdi:lock',
];

export type TabId = 'popup' | 'light' | 'weather' | 'title' | 'cover' | 'climate' | 'spotify' | 'media' | 'presence' | 'fan' | 'camera_carousel' | 'dashboard' | 'unassigned';

export type DragContext = 'rooms' | 'lights' | 'covers' | 'fans' | 'climates' | 'dashboard_covers' | 'dashboard_cards' | 'speakers' | 'title_sources' | 'title_modes' | 'camera_order';

export interface DragState {
  dragIdx: number | null;
  dropIdx: number | null;
  dragContext: DragContext;
  dragModeSrcIdx: number | null;
}
