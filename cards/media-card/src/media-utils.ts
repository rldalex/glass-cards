import type { HassEntity } from '@glass-cards/base-card';

/* ── Feature bitmask ── */
export const F_PAUSE = 1;
export const F_SEEK = 2;
export const F_VOLUME_SET = 4;
export const F_VOLUME_MUTE = 8;
export const F_PREVIOUS = 16;
export const F_NEXT = 32;
export const F_SELECT_SOURCE = 2048;
export const F_STOP = 4096;
export const F_PLAY = 16384;
export const F_SHUFFLE_SET = 32768;
export const F_SELECT_SOUND_MODE = 65536;
export const F_REPEAT_SET = 262144;
export const F_GROUPING = 524288;

/* ── Types ── */

export interface MediaPlayerInfo {
  entityId: string;
  name: string;
  state: string;
  title: string;
  artist: string;
  albumArt: string;
  appName: string;
  volume: number;
  isMuted: boolean;
  features: number;
  groupMembers: string[];
  shuffle: boolean;
  repeat: string;
  source: string;
  sourceList: string[];
  soundMode: string;
  soundModeList: string[];
  duration: number;
  elapsed: number;
  positionUpdatedAt: number;
  lastUpdated: number;
  icon: string;
}

export interface MediaBackendConfig {
  extra_entities: Record<string, string[]>;
  hidden_entities: string[];
  show_header: boolean;
}

/* ── Helpers ── */

export function getMediaInfo(entity: HassEntity): MediaPlayerInfo {
  const attrs = entity.attributes;
  let posUpdated = 0;
  if (attrs.media_position_updated_at) {
    posUpdated = new Date(attrs.media_position_updated_at as string).getTime() / 1000;
  }
  return {
    entityId: entity.entity_id,
    name: (attrs.friendly_name as string) || entity.entity_id,
    state: entity.state,
    title: (attrs.media_title as string) || '',
    artist: (attrs.media_artist as string) || '',
    albumArt: (attrs.entity_picture as string) || '',
    appName: (attrs.app_name as string) || '',
    volume: typeof attrs.volume_level === 'number' ? attrs.volume_level : 0,
    isMuted: !!attrs.is_volume_muted,
    features: (attrs.supported_features as number) || 0,
    groupMembers: Array.isArray(attrs.group_members) ? (attrs.group_members as string[]) : [],
    shuffle: !!attrs.shuffle,
    repeat: (attrs.repeat as string) || 'off',
    source: (attrs.source as string) || '',
    sourceList: Array.isArray(attrs.source_list) ? (attrs.source_list as string[]) : [],
    soundMode: (attrs.sound_mode as string) || '',
    soundModeList: Array.isArray(attrs.sound_mode_list) ? (attrs.sound_mode_list as string[]) : [],
    duration: typeof attrs.media_duration === 'number' ? attrs.media_duration : 0,
    elapsed: typeof attrs.media_position === 'number' ? attrs.media_position : 0,
    positionUpdatedAt: posUpdated,
    lastUpdated: entity.last_updated ? new Date(entity.last_updated).getTime() : 0,
    icon: (attrs.icon as string) || 'mdi:speaker',
  };
}

export function isPlaying(state: string): boolean {
  return state === 'playing' || state === 'buffering';
}

export function isActive(state: string): boolean {
  return state === 'playing' || state === 'paused' || state === 'buffering';
}

export function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export function hasFeature(player: MediaPlayerInfo, flag: number): boolean {
  return (player.features & flag) !== 0;
}

export const SOURCE_ICONS: Record<string, string> = {
  Spotify: 'mdi:spotify',
  AirPlay: 'mdi:apple',
  Bluetooth: 'mdi:bluetooth',
  'Line-In': 'mdi:audio-input-stereo-minijack',
  TV: 'mdi:television',
  HDMI: 'mdi:hdmi-port',
};
