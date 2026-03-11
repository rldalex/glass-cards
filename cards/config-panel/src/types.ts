import type { TranslationKey } from '@glass-cards/i18n';

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

export const DEFAULT_CARD_ORDER = ['light', 'media_player', 'climate', 'fan', 'cover', 'vacuum'];

export const IMPLEMENTED_CARDS = new Set(['light', 'media_player', 'cover', 'fan']);

export const CARD_ICONS: Record<string, string> = {
  light: 'mdi:lightbulb-group',
  media_player: 'mdi:speaker',
  climate: 'mdi:thermostat',
  fan: 'mdi:fan',
  cover: 'mdi:blinds',
  vacuum: 'mdi:robot-vacuum',
};

type DomainKey = 'light' | 'media_player' | 'climate' | 'fan' | 'cover' | 'vacuum';

export const DOMAIN_I18N_KEYS: Record<DomainKey, { name: TranslationKey; desc: TranslationKey }> = {
  light: { name: 'config.domain_light', desc: 'config.domain_light_desc' },
  media_player: { name: 'config.domain_media_player', desc: 'config.domain_media_player_desc' },
  climate: { name: 'config.domain_climate', desc: 'config.domain_climate_desc' },
  fan: { name: 'config.domain_fan', desc: 'config.domain_fan_desc' },
  cover: { name: 'config.domain_cover', desc: 'config.domain_cover_desc' },
  vacuum: { name: 'config.domain_vacuum', desc: 'config.domain_vacuum_desc' },
};

export function getCardMeta(domain: string): { nameKey: TranslationKey | null; icon: string; descKey: TranslationKey | null } {
  const keys = DOMAIN_I18N_KEYS[domain as DomainKey];
  return {
    nameKey: keys ? keys.name : null,
    icon: CARD_ICONS[domain] || 'mdi:help-circle',
    descKey: keys ? keys.desc : null,
  };
}

export const ROOM_ICONS = [
  'mdi:sofa', 'mdi:stove', 'mdi:bed', 'mdi:desk',
  'mdi:shower', 'mdi:home', 'mdi:movie-open', 'mdi:music',
  'mdi:wrench', 'mdi:flower', 'mdi:white-balance-sunny', 'mdi:weather-night',
  'mdi:lightbulb', 'mdi:snowflake', 'mdi:fire', 'mdi:lock',
];

export type TabId = 'navbar' | 'popup' | 'light' | 'weather' | 'title' | 'cover' | 'spotify' | 'media' | 'presence' | 'fan' | 'dashboard';
