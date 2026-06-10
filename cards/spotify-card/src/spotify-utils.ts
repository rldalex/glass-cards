import { t } from '@glass-cards/i18n';

export interface SpotifyBackendConfig {
  entity_id: string;
  show_header: boolean;
  sort_order: 'recent_first' | 'oldest_first';
  max_items_per_section: number;
  visible_speakers: string[];
}

export interface SpotifyImage {
  url: string;
  width?: number;
  height?: number;
}

export interface SpotifyItem {
  id: string;
  name: string;
  type: 'track' | 'album' | 'playlist' | 'show' | 'episode';
  uri?: string;
  images?: SpotifyImage[];
  artists?: { name: string }[];
  album?: { name: string; images?: SpotifyImage[] };
  owner?: { display_name: string };
  tracks?: { total: number };
  total_tracks?: number;
  description?: string;
  // Wrapped items from recently_played / saved_tracks / saved_shows
  track?: SpotifyItem;
  show?: SpotifyItem;
  added_at?: string;
  played_at?: string;
}

export type ViewMode = 'library' | 'search' | 'drilldown' | 'speaker_picker';
export type TabId = 'all' | 'tracks' | 'playlists' | 'podcasts';
export type LibraryCategory = 'playlists' | 'recently_played' | 'saved_tracks' | 'saved_shows';

export const LIB_SECTION_LABEL_KEY: Record<LibraryCategory, Parameters<typeof t>[0]> = {
  playlists: 'spotify.my_playlists',
  recently_played: 'spotify.recently_played',
  saved_tracks: 'spotify.saved_tracks',
  saved_shows: 'spotify.followed_podcasts',
};

export interface DrilldownState {
  title: string;
  type: 'playlist' | 'album';
  id: string;
  image?: string;
  subtitle?: string;
  items: SpotifyItem[];
  total: number;
  offset: number;
  loading: boolean;
}

// — Helpers —

export function getImage(item: SpotifyItem | null | undefined, size = 300): string {
  if (!item) return '';
  const images = item.images ?? item.album?.images ?? [];
  if (images.length === 0) return '';
  // Pick closest to requested size
  const sorted = [...images].sort((a, b) => Math.abs((a.width ?? 300) - size) - Math.abs((b.width ?? 300) - size));
  return sorted[0]?.url ?? '';
}

export function getArtistNames(item: SpotifyItem | null | undefined): string {
  if (!item || !item.artists?.length) return '';
  return item.artists.map((a) => a.name).join(', ');
}

export function typeIcon(type: string): string {
  switch (type) {
    case 'track': return 'mdi:music-note';
    case 'playlist': return 'mdi:playlist-music';
    case 'album': return 'mdi:album';
    case 'show': case 'podcast': return 'mdi:podcast';
    case 'episode': return 'mdi:podcast';
    default: return 'mdi:music-note';
  }
}

export function formatTime(seconds: number): string {
  const total = Math.max(0, Math.floor(seconds));
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export function typeBadgeKey(type: string): string {
  switch (type) {
    case 'track': return 'spotify.type_track';
    case 'playlist': return 'spotify.type_playlist';
    case 'album': return 'spotify.type_album';
    case 'show': case 'episode': return 'spotify.type_podcast';
    default: return 'spotify.type_track';
  }
}

// ================================================================
// SPOTIFY CARD
// ================================================================
