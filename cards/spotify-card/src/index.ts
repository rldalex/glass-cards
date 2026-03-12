import { css, html, nothing, type CSSResult, type TemplateResult, type PropertyValues } from 'lit';
import { state } from 'lit/decorators.js';
import { BaseCard, BackendService } from '@glass-cards/base-card';
import { glassTokens, glassMixin, bounceMixin, eqMixin } from '@glass-cards/ui-core';
import { t } from '@glass-cards/i18n';
import { bus } from '@glass-cards/event-bus';

// — Types —

interface SpotifyBackendConfig {
  entity_id: string;
  show_header: boolean;
  sort_order: 'recent_first' | 'oldest_first';
  max_items_per_section: number;
  visible_speakers: string[];
}

interface SpotifyImage {
  url: string;
  width?: number;
  height?: number;
}

interface SpotifyItem {
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

type ViewMode = 'library' | 'search' | 'drilldown' | 'speaker_picker';
type TabId = 'all' | 'tracks' | 'playlists' | 'podcasts';

interface DrilldownState {
  title: string;
  type: 'playlist' | 'album';
  id: string;
  items: SpotifyItem[];
  total: number;
  offset: number;
  loading: boolean;
}

// — Helpers —

function getImage(item: SpotifyItem | null | undefined, size = 300): string {
  if (!item) return '';
  const images = item.images ?? item.album?.images ?? [];
  if (images.length === 0) return '';
  // Pick closest to requested size
  const sorted = [...images].sort((a, b) => Math.abs((a.width ?? 300) - size) - Math.abs((b.width ?? 300) - size));
  return sorted[0]?.url ?? '';
}

function getArtistNames(item: SpotifyItem | null | undefined): string {
  if (!item || !item.artists?.length) return '';
  return item.artists.map((a) => a.name).join(', ');
}

function typeIcon(type: string): string {
  switch (type) {
    case 'track': return 'mdi:music-note';
    case 'playlist': return 'mdi:playlist-music';
    case 'album': return 'mdi:album';
    case 'show': case 'podcast': return 'mdi:podcast';
    case 'episode': return 'mdi:podcast';
    default: return 'mdi:music-note';
  }
}

function typeBadgeKey(type: string): string {
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

class GlassSpotifyCard extends BaseCard {
  // — State —
  @state() private _view: ViewMode = 'library';
  @state() private _tab: TabId = 'all';
  @state() private _searchQuery = '';
  @state() private _playlists: SpotifyItem[] = [];
  @state() private _recentlyPlayed: SpotifyItem[] = [];
  @state() private _savedTracks: SpotifyItem[] = [];
  @state() private _savedShows: SpotifyItem[] = [];
  @state() private _searchResults: { tracks: SpotifyItem[]; playlists: SpotifyItem[]; shows: SpotifyItem[] } = { tracks: [], playlists: [], shows: [] };
  @state() private _searchLoading = false;
  @state() private _searchOffset = 0;
  @state() private _searchHasMore = false;
  private _searchVersion = 0;
  @state() private _drilldown: DrilldownState | null = null;
  @state() private _speakers: { entityId: string; name: string; state: string; mediaTitle: string | null; icon: string }[] = [];
  @state() private _pickerItem: SpotifyItem | null = null;
  @state() private _selectedSpeakers = new Set<string>();
  @state() private _error: string | null = null;
  @state() private _libraryLoading = false;
  @state() private _spotifyConfigured: boolean | null = null;
  @state() private _foldOpen = false;
  @state() private _savedMap: Map<string, boolean> = new Map();
  @state() private _sectionTotals: Record<string, number> = {};
  private _loadingMore: Record<string, boolean> = {};

  // — Config —
  private _spotifyConfig: SpotifyBackendConfig = {
    entity_id: '', show_header: true, sort_order: 'recent_first', max_items_per_section: 6, visible_speakers: [],
  };
  private _backend: BackendService | undefined;
  private _configLoaded = false;
  private _configLoadingInProgress = false;
  private _loadVersion = 0;
  private _debounceTimer = 0;

  // — Styles —

  static styles: CSSResult[] = [glassTokens, glassMixin, bounceMixin, eqMixin, css`
    :host { display: block; width: 100%; max-width: 500px; margin: 0 auto; font-family: 'Plus Jakarta Sans', sans-serif; }

    .spotify-card-wrap { display: flex; flex-direction: column; gap: 6px; }

    .card-header { display: flex; align-items: center; justify-content: space-between; padding: 0 6px; min-height: 22px; }
    .card-header-left { display: flex; align-items: center; gap: 8px; }
    .card-title {
      font-size: 9px; font-weight: 700; text-transform: uppercase;
      letter-spacing: 1.5px; color: var(--t4); display: flex; align-items: center; gap: 4px;
    }
    .card-title ha-icon { color: #1DB954; --mdc-icon-size: 14px; display: flex; align-items: center; justify-content: center; }

    .spotify-card { position: relative; width: 100%; padding: 14px; box-sizing: border-box; overflow: hidden; }
    .card-inner { position: relative; z-index: 1; display: flex; flex-direction: column; gap: 0; }

    .tint {
      position: absolute; inset: 0; border-radius: inherit;
      pointer-events: none; z-index: 0;
      background: radial-gradient(ellipse at 20% 20%, rgba(29,185,84,0.12), transparent 70%);
      opacity: 0.6;
    }

    /* Search */
    .search-row { display: flex; gap: 6px; align-items: center; }
    .search-input-wrap { position: relative; flex: 1; }
    .search-input {
      width: 100%; height: 36px; padding: 0 36px 0 34px;
      border-radius: var(--radius-lg); background: var(--s2);
      border: 1px solid var(--b2); color: var(--t1);
      font-family: inherit; font-size: 12px; font-weight: 500;
      outline: none; transition: all var(--t-fast);
      -webkit-tap-highlight-color: transparent; box-sizing: border-box;
    }
    .search-input::placeholder { color: var(--t4); }
    .search-input:focus { border-color: rgba(29,185,84,0.3); background: var(--s3); box-shadow: 0 0 0 2px rgba(29,185,84,0.1); }
    .search-icon {
      position: absolute; top: 50%; left: 10px; transform: translateY(-50%);
      pointer-events: none; display: flex; align-items: center; justify-content: center;
    }
    .search-icon ha-icon { --mdc-icon-size: 16px; color: var(--t4); display: flex; align-items: center; justify-content: center; }
    .search-clear {
      position: absolute; top: 50%; right: 30px; transform: translateY(-50%);
      width: 24px; height: 24px; border-radius: 6px;
      background: transparent; border: none;
      display: none; align-items: center; justify-content: center;
      cursor: pointer; padding: 0; outline: none;
    }
    .search-clear.visible { display: flex; }
    .search-clear ha-icon { --mdc-icon-size: 14px; color: var(--t3); display: flex; align-items: center; justify-content: center; }
    @media (hover: hover) { .search-clear:hover { background: var(--s3); } }
    @media (hover: none) { .search-clear:active { animation: bounce 0.3s ease; } }
    .search-clear:focus-visible { outline: 2px solid rgba(255,255,255,0.25); outline-offset: -2px; }

    /* Fold toggle arrow (inside search bar) */
    .search-toggle {
      position: absolute; top: 50%; right: 6px; transform: translateY(-50%);
      width: 24px; height: 24px; border-radius: 6px;
      background: transparent; border: none;
      display: flex; align-items: center; justify-content: center;
      cursor: pointer; padding: 0; outline: none;
      transition: all var(--t-fast);
      -webkit-tap-highlight-color: transparent;
    }
    .search-toggle ha-icon {
      --mdc-icon-size: 14px; color: var(--t4);
      display: flex; align-items: center; justify-content: center;
      transition: transform var(--t-fast), color var(--t-fast);
    }
    @media (hover: hover) { .search-toggle:hover { background: var(--s3); } }
    @media (hover: hover) { .search-toggle:hover ha-icon { color: var(--t2); } }
    @media (hover: none) { .search-toggle:active { animation: bounce 0.3s ease; } }
    .search-toggle:focus-visible { outline: 2px solid rgba(255,255,255,0.25); outline-offset: -2px; }
    .search-toggle.open ha-icon { transform: rotate(180deg); color: #1DB954; }

    /* Content fold (CSS Grid 0fr/1fr) */
    .sp-fold {
      display: grid; grid-template-rows: 0fr;
      transition: grid-template-rows var(--t-layout);
    }
    .sp-fold.open { grid-template-rows: 1fr; }
    .sp-fold-inner {
      overflow: hidden; opacity: 0; min-height: 0;
      transition: opacity var(--t-fast) 0s;
      display: flex; flex-direction: column; gap: 10px;
    }
    .sp-fold.open .sp-fold-inner { padding-top: 10px; }
    .sp-fold.open .sp-fold-inner {
      opacity: 1;
      transition: opacity var(--t-fast) 0.1s;
    }

    /* Fold separator */
    .sp-fold-sep {
      height: 1px; margin: 2px 12px 0;
      background: linear-gradient(90deg, transparent, rgba(29,185,84,0.15), transparent);
      opacity: 0; transition: opacity var(--t-fast);
    }
    .sp-fold.open + .sp-fold-sep { opacity: 1; }

    /* Tabs */
    .tab-bar {
      display: flex; gap: 0; border-radius: var(--radius-md);
      background: var(--s1); border: 1px solid var(--b1); overflow: hidden;
    }
    .tab-btn {
      flex: 1; height: 30px;
      display: flex; align-items: center; justify-content: center; gap: 4px;
      background: transparent; border: none; color: var(--t3);
      font-family: inherit; font-size: 10px; font-weight: 600;
      text-transform: uppercase; letter-spacing: 0.6px;
      cursor: pointer; transition: all var(--t-fast); outline: none; padding: 0;
      -webkit-tap-highlight-color: transparent;
    }
    .tab-btn ha-icon { --mdc-icon-size: 14px; display: flex; align-items: center; justify-content: center; }
    @media (hover: hover) { .tab-btn:hover { background: var(--s2); color: var(--t2); } }
    .tab-btn:focus-visible { outline: 2px solid rgba(255,255,255,0.25); outline-offset: -2px; }
    @media (hover: hover) { .tab-btn:active { transform: scale(0.96); } }
    @media (hover: none) { .tab-btn:active { animation: bounce 0.3s ease; } }
    .tab-btn.active { background: rgba(29,185,84,0.1); color: #1DB954; }
    .tab-btn + .tab-btn { border-left: 1px solid var(--b1); }

    /* Content area */
    .content-area {
      display: flex; flex-direction: column; gap: 6px;
      max-height: 380px; overflow-y: auto; overflow-x: hidden; scrollbar-width: none;
    }
    .content-area::-webkit-scrollbar { display: none; }

    /* Section title */
    .section-title {
      font-size: 9px; font-weight: 700; text-transform: uppercase;
      letter-spacing: 1.2px; color: var(--t4); padding: 4px 2px 2px; flex-shrink: 0;
    }

    /* Result row */
    .result-row {
      display: flex; align-items: center; gap: 10px;
      padding: 6px 4px; cursor: pointer; position: relative;
      transition: background var(--t-fast); border-radius: var(--radius-md);
      flex-shrink: 0; background: none; border: none; width: 100%; box-sizing: border-box;
      font-family: inherit; text-align: left; color: inherit; outline: none;
      -webkit-tap-highlight-color: transparent;
    }
    @media (hover: hover) { .result-row:hover { background: var(--s1); } }
    @media (hover: hover) { .result-row:active { transform: scale(0.99); } }
    @media (hover: none) { .result-row:active { animation: bounce 0.3s ease; } }
    .result-row:focus-visible { outline: 2px solid rgba(255,255,255,0.25); outline-offset: -2px; }

    .result-art {
      width: 42px; height: 42px; border-radius: var(--radius-sm); flex-shrink: 0;
      background: var(--s2); border: 1px solid var(--b1);
      display: flex; align-items: center; justify-content: center;
      overflow: hidden; position: relative;
    }
    .result-art.round { border-radius: 50%; }
    .result-art img { width: 100%; height: 100%; object-fit: cover; }
    .result-art ha-icon { --mdc-icon-size: 18px; color: var(--t4); display: flex; align-items: center; justify-content: center; }

    .result-info { flex: 1; min-width: 0; }
    .result-title {
      font-size: 12px; font-weight: 600; color: var(--t1); line-height: 1.2;
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }
    .result-meta {
      font-size: 10px; font-weight: 500; color: var(--t3); margin-top: 1px;
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
      display: flex; align-items: center; gap: 4px;
    }
    .result-type-badge {
      font-size: 8px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.4px;
      padding: 1px 4px; border-radius: 9999px;
      background: var(--s3); color: var(--t4); flex-shrink: 0;
    }

    .result-play {
      width: 32px; height: 32px; border-radius: 50%;
      background: #1DB954; border: none;
      display: flex; align-items: center; justify-content: center;
      cursor: pointer; transition: all var(--t-fast); outline: none; padding: 0;
      -webkit-tap-highlight-color: transparent;
      opacity: 0; transform: scale(0.8); flex-shrink: 0;
    }
    .result-play ha-icon { --mdc-icon-size: 16px; color: #000; display: flex; align-items: center; justify-content: center; }
    @media (hover: hover) { .result-row:hover .result-play { opacity: 1; transform: scale(1); } }
    @media (hover: hover) { .result-play:active { transform: scale(0.92); } }
    @media (hover: none) { .result-play:active { animation: bounce 0.3s ease; } }
    .result-play:focus-visible { outline: 2px solid rgba(255,255,255,0.25); outline-offset: 2px; }

    /* Playlist grid (horizontal scroll) */
    .playlist-scroll {
      display: flex; gap: 8px; overflow-x: auto; overflow-y: hidden;
      padding: 2px 2px 4px; margin: 0 -2px; scrollbar-width: none; flex-shrink: 0;
    }
    .playlist-scroll::-webkit-scrollbar { display: none; }

    .playlist-card {
      flex-shrink: 0; width: 84px;
      display: flex; flex-direction: column; gap: 6px;
      cursor: pointer; padding: 0; background: none; border: none;
      outline: none; text-align: left; font-family: inherit;
      -webkit-tap-highlight-color: transparent; color: inherit;
    }
    @media (hover: hover) { .playlist-card:active { transform: scale(0.97); } }
    @media (hover: none) { .playlist-card:active { animation: bounce 0.3s ease; } }
    .playlist-card:focus-visible { outline: 2px solid rgba(255,255,255,0.25); outline-offset: 2px; }

    .playlist-art {
      width: 84px; height: 84px; border-radius: var(--radius-md);
      background: var(--s2); border: 1px solid var(--b1);
      display: flex; align-items: center; justify-content: center;
      overflow: hidden; position: relative; transition: border-color var(--t-fast);
    }
    @media (hover: hover) { .playlist-card:hover .playlist-art { border-color: var(--b3); } }
    .playlist-art img { width: 100%; height: 100%; object-fit: cover; }
    .playlist-art ha-icon { --mdc-icon-size: 32px; color: rgba(255,255,255,0.4); display: flex; align-items: center; justify-content: center; }

    .playlist-art-play {
      position: absolute; bottom: 6px; right: 6px;
      width: 28px; height: 28px; border-radius: 50%;
      background: #1DB954;
      display: flex; align-items: center; justify-content: center;
      opacity: 0; transform: translateY(4px);
      transition: all var(--t-fast);
      box-shadow: 0 4px 12px rgba(0,0,0,0.4);
      pointer-events: none;
    }
    .playlist-art-play ha-icon { --mdc-icon-size: 14px; color: #000; display: flex; align-items: center; justify-content: center; }
    @media (hover: hover) {
      .playlist-card:hover .playlist-art-play { opacity: 1; transform: translateY(0); }
    }

    .playlist-name {
      font-size: 10px; font-weight: 600; color: var(--t2); line-height: 1.3;
      display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
    }
    .playlist-count { font-size: 9px; font-weight: 500; color: var(--t4); }

    /* Drilldown header */
    .drilldown-header {
      display: flex; align-items: center; justify-content: space-between;
    }

    /* Back button */
    .back-btn {
      display: flex; align-items: center; gap: 4px;
      background: none; border: none; color: var(--t3);
      font-family: inherit; font-size: 11px; font-weight: 600;
      cursor: pointer; padding: 4px 2px; outline: none;
      -webkit-tap-highlight-color: transparent;
      transition: color var(--t-fast);
    }
    .back-btn ha-icon { --mdc-icon-size: 16px; display: flex; align-items: center; justify-content: center; }
    @media (hover: hover) { .back-btn:hover { color: var(--t1); } }
    @media (hover: none) { .back-btn:active { animation: bounce 0.3s ease; } }
    .back-btn:focus-visible { outline: 2px solid rgba(255,255,255,0.25); outline-offset: 2px; }

    /* Play all button */
    .play-all-btn {
      display: flex; align-items: center; gap: 4px;
      background: rgba(30, 215, 96, 0.12); border: none; color: #1ed760;
      font-family: inherit; font-size: 11px; font-weight: 600;
      cursor: pointer; padding: 4px 10px; border-radius: var(--radius-full);
      outline: none; -webkit-tap-highlight-color: transparent;
      transition: background var(--t-fast), color var(--t-fast);
    }
    .play-all-btn ha-icon { --mdc-icon-size: 16px; display: flex; align-items: center; justify-content: center; }
    @media (hover: hover) { .play-all-btn:hover { background: rgba(30, 215, 96, 0.22); } }
    @media (hover: none) { .play-all-btn:active { animation: bounce 0.3s ease; } }
    .play-all-btn:focus-visible { outline: 2px solid rgba(30, 215, 96, 0.4); outline-offset: 2px; }

    /* Empty & error states */
    .empty-state {
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      padding: 32px 16px; gap: 8px;
    }
    .empty-state ha-icon { --mdc-icon-size: 32px; color: var(--t4); display: flex; align-items: center; justify-content: center; }
    .empty-state-text { font-size: 11px; font-weight: 500; color: var(--t4); text-align: center; }

    .error-banner {
      padding: 8px 12px; border-radius: var(--radius-md);
      background: rgba(248,113,113,0.1); border: 1px solid rgba(248,113,113,0.2);
      font-size: 11px; font-weight: 500; color: var(--c-alert);
    }

    .setup-banner {
      display: flex; flex-direction: column; align-items: center; gap: 12px;
      padding: 24px 16px; text-align: center;
    }
    .setup-banner ha-icon { --mdc-icon-size: 40px; color: #1DB954; display: flex; align-items: center; justify-content: center; }
    .setup-banner-text { font-size: 12px; color: var(--t3); line-height: 1.5; }
    .setup-link {
      font-size: 11px; font-weight: 600; color: #1DB954;
      background: rgba(29,185,84,0.1); border: 1px solid rgba(29,185,84,0.2);
      border-radius: var(--radius-md); padding: 6px 14px;
      cursor: pointer; text-decoration: none; outline: none;
      -webkit-tap-highlight-color: transparent; transition: all var(--t-fast);
    }
    @media (hover: hover) { .setup-link:hover { background: rgba(29,185,84,0.2); } }
    @media (hover: none) { .setup-link:active { animation: bounce 0.3s ease; } }
    .setup-link:focus-visible { outline: 2px solid rgba(255,255,255,0.25); outline-offset: 2px; }

    /* Load more button */
    .load-more-btn {
      display: flex; align-items: center; justify-content: center;
      padding: 8px; border-radius: var(--radius-md);
      background: var(--s1); border: 1px solid var(--b1);
      color: var(--t3); font-family: inherit; font-size: 11px; font-weight: 600;
      cursor: pointer; outline: none; -webkit-tap-highlight-color: transparent;
      transition: all var(--t-fast); flex-shrink: 0;
    }
    @media (hover: hover) { .load-more-btn:hover { background: var(--s2); color: var(--t1); } }
    @media (hover: none) { .load-more-btn:active { animation: bounce 0.3s ease; } }
    .load-more-btn:focus-visible { outline: 2px solid rgba(255,255,255,0.25); outline-offset: -2px; }

    /* Speaker picker overlay */
    .picker-backdrop {
      position: fixed; inset: 0; z-index: 10000;
      background: rgba(0,0,0,0.5);
      display: flex; align-items: flex-end; justify-content: center;
      padding: 16px; padding-bottom: 80px;
      opacity: 0; pointer-events: none;
      transition: opacity 0.2s ease;
    }
    .picker-backdrop.visible { opacity: 1; pointer-events: auto; }

    .speaker-picker {
      width: 100%; max-width: 400px;
      padding: 16px;
      max-height: calc(100dvh - 160px);
      display: flex; flex-direction: column;
      transform: translateY(20px);
      transition: transform 0.3s cubic-bezier(0.16,1,0.3,1);
    }
    .picker-backdrop.visible .speaker-picker { transform: translateY(0); }

    .picker-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; }
    .picker-title { font-size: 13px; font-weight: 700; color: var(--t1); }
    .picker-close {
      width: 28px; height: 28px; border-radius: var(--radius-sm);
      background: var(--s2); border: 1px solid var(--b1);
      display: flex; align-items: center; justify-content: center;
      cursor: pointer; padding: 0; outline: none; transition: all var(--t-fast);
    }
    .picker-close ha-icon { --mdc-icon-size: 16px; color: var(--t3); display: flex; align-items: center; justify-content: center; }
    @media (hover: hover) { .picker-close:hover { background: var(--s3); } }
    @media (hover: none) { .picker-close:active { animation: bounce 0.3s ease; } }
    .picker-close:focus-visible { outline: 2px solid rgba(255,255,255,0.25); outline-offset: -2px; }

    .picker-track {
      display: flex; align-items: center; gap: 10px;
      padding: 8px; margin-bottom: 12px;
      background: var(--s1); border-radius: var(--radius-md); border: 1px solid var(--b1);
    }
    .picker-track-art {
      width: 40px; height: 40px; border-radius: var(--radius-sm); flex-shrink: 0;
      background: var(--s2); display: flex; align-items: center; justify-content: center; overflow: hidden;
    }
    .picker-track-art img { width: 100%; height: 100%; object-fit: cover; }
    .picker-track-art ha-icon { --mdc-icon-size: 18px; color: var(--t4); display: flex; align-items: center; justify-content: center; }
    .picker-track-info { flex: 1; min-width: 0; }
    .picker-track-title { font-size: 12px; font-weight: 600; color: var(--t1); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .picker-track-artist { font-size: 10px; font-weight: 500; color: var(--t3); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

    .picker-speakers {
      display: flex; flex-direction: column; gap: 4px;
      overflow-y: auto; flex: 1; min-height: 0;
      scrollbar-width: none;
    }
    .picker-speakers::-webkit-scrollbar { display: none; }
    .picker-speaker {
      display: flex; align-items: center; gap: 10px;
      padding: 8px; border-radius: var(--radius-md);
      background: var(--s1); border: 1px solid var(--b1);
      cursor: pointer; transition: all var(--t-fast);
      font-family: inherit; outline: none; width: 100%;
      -webkit-tap-highlight-color: transparent; color: inherit;
      flex-shrink: 0;
    }
    .picker-speaker.selected { border-color: rgba(29,185,84,0.4); background: rgba(29,185,84,0.08); }
    @media (hover: hover) { .picker-speaker:hover { background: var(--s3); border-color: var(--b2); } }
    @media (hover: hover) { .picker-speaker:active { transform: scale(0.98); } }
    @media (hover: none) { .picker-speaker:active { animation: bounce 0.3s ease; } }
    .picker-speaker:focus-visible { outline: 2px solid rgba(255,255,255,0.25); outline-offset: -2px; }

    .picker-speaker-icon {
      width: 32px; height: 32px; border-radius: var(--radius-sm);
      background: var(--s2); border: 1px solid var(--b1);
      display: flex; align-items: center; justify-content: center; flex-shrink: 0;
      transition: all var(--t-fast);
    }
    .picker-speaker.selected .picker-speaker-icon { background: rgba(29,185,84,0.15); border-color: rgba(29,185,84,0.3); }
    .picker-speaker-icon ha-icon { --mdc-icon-size: 16px; color: var(--t3); display: flex; align-items: center; justify-content: center; }
    .picker-speaker.selected .picker-speaker-icon ha-icon { color: #1DB954; }
    .picker-speaker-name { flex: 1; font-size: 12px; font-weight: 600; color: var(--t2); }
    .picker-speaker-status { font-size: 9px; font-weight: 500; color: var(--t4); white-space: nowrap; }
    .picker-speaker-status.playing { color: rgba(29,185,84,0.6); }
    .picker-speaker-check {
      width: 20px; height: 20px; border-radius: 50%;
      border: 2px solid var(--b2); background: transparent;
      display: flex; align-items: center; justify-content: center; flex-shrink: 0;
      transition: all var(--t-fast);
    }
    .picker-speaker.selected .picker-speaker-check { border-color: #1DB954; background: #1DB954; }
    .picker-speaker-check ha-icon { --mdc-icon-size: 14px; color: #fff; display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity var(--t-fast); }
    .picker-speaker.selected .picker-speaker-check ha-icon { opacity: 1; }

    .picker-play-bar {
      display: flex; gap: 8px; padding-top: 8px; flex-shrink: 0;
    }
    .picker-play-btn {
      flex: 1; padding: 10px; border-radius: var(--radius-md);
      border: none; cursor: pointer; font-family: inherit; font-size: 12px; font-weight: 700;
      display: flex; align-items: center; justify-content: center; gap: 6px;
      transition: all var(--t-fast); outline: none;
      -webkit-tap-highlight-color: transparent;
    }
    .picker-play-btn.primary { background: #1DB954; color: #fff; }
    .picker-play-btn.primary:disabled { opacity: 0.4; cursor: default; }
    @media (hover: hover) { .picker-play-btn.primary:not(:disabled):hover { background: #1ed760; } }
    .picker-play-btn.primary ha-icon { --mdc-icon-size: 18px; display: flex; align-items: center; justify-content: center; }
    @media (hover: hover) { .picker-play-btn:active:not(:disabled) { transform: scale(0.98); } }
    @media (hover: none) { .picker-play-btn:active:not(:disabled) { animation: bounce 0.3s ease; } }

    /* Now playing indicator */
    .result-row.now-playing {
      background: color-mix(in srgb, var(--c-accent) 8%, transparent);
      border-radius: var(--radius-sm);
    }
    .result-row.now-playing .result-title {
      color: var(--c-accent);
    }
    .result-row .eq-bars { flex-shrink: 0; }

    /* Heart (favorite) button */
    .heart-btn {
      width: 24px; height: 24px;
      border-radius: var(--radius-sm);
      background: transparent; border: none;
      display: flex; align-items: center; justify-content: center;
      cursor: pointer; padding: 0; outline: none;
      color: var(--t3); flex-shrink: 0;
      transition: transform var(--t-fast), color var(--t-fast);
      -webkit-tap-highlight-color: transparent;
    }
    .heart-btn ha-icon {
      --mdc-icon-size: 16px;
      display: flex; align-items: center; justify-content: center;
    }
    .heart-btn.saved ha-icon {
      color: var(--c-accent);
    }
    .heart-btn:active {
      transform: scale(0.85);
    }
    @media (hover: hover) and (pointer: fine) {
      .heart-btn:hover {
        transform: scale(1.1);
      }
    }

    /* Load more (library pagination) */
    .load-more {
      width: 100%;
      margin-top: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }
    .items-count {
      font-size: 10px;
      color: var(--t3);
    }

    /* Loading spinner placeholder */
    .loading-text { font-size: 11px; color: var(--t4); text-align: center; padding: 16px 0; }
  `];

  // — Entity helpers —

  protected getTrackedEntityIds(): string[] {
    const eid = this._getEntityId();
    const ids = eid ? [eid] : [];
    if (this._spotifyConfig?.entity_id && !ids.includes(this._spotifyConfig.entity_id)) {
      ids.push(this._spotifyConfig.entity_id);
    }
    return ids;
  }

  private _isNowPlaying(uri: string): boolean {
    const entityId = this._spotifyConfig?.entity_id;
    if (!entityId) return false;
    const entity = this.hass?.states[entityId];
    if (!entity || entity.state !== 'playing') return false;
    return (entity.attributes.media_content_id as string ?? '') === uri;
  }

  private _getEntityId(): string {
    if (this._config?.entity) return this._config.entity as string;
    if (this._spotifyConfig.entity_id) return this._spotifyConfig.entity_id;
    if (this.hass) {
      const found = Object.keys(this.hass.states).find((k) => k.startsWith('media_player.spotify'));
      if (found) return found;
    }
    return '';
  }

  // — Lifecycle —

  connectedCallback(): void {
    super.connectedCallback();
    this._listen('spotify-config-changed', () => {
      this._configLoaded = false;
      this._loadConfig();
    });
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this._debounceTimer) clearTimeout(this._debounceTimer);
    this._backend = undefined;
    this._configLoaded = false;
    this._configLoadingInProgress = false;
  }

  protected _collapseExpanded(): void {
    if (this._view === 'speaker_picker') { this._closePicker(); return; }
    if (this._foldOpen) this._foldOpen = false;
    if (this._drilldown) { this._drilldown = null; this._view = this._searchQuery ? 'search' : 'library'; }
  }

  protected updated(changedProps: PropertyValues): void {
    super.updated(changedProps);
    if (changedProps.has('hass') && this.hass) {
      if (this._backend && this._backend.connection !== this.hass.connection) {
        this._backend = undefined;
        this._configLoaded = false;
      }
      if (!this._configLoaded && !this._configLoadingInProgress) {
        this._backend = new BackendService(this.hass);
        this._loadConfig();
      }
    }
  }

  // — Config loading —

  private async _loadConfig(): Promise<void> {
    if (!this._backend || this._configLoadingInProgress) return;
    this._configLoadingInProgress = true;
    const version = ++this._loadVersion;
    try {
      const result = await this._backend.send<{
        spotify_card: SpotifyBackendConfig;
      }>('get_config');
      if (version !== this._loadVersion) return;
      if (result?.spotify_card) {
        this._spotifyConfig = result.spotify_card;
      }
      this._configLoaded = true;
      await this._checkSpotifyStatus();
      if (version !== this._loadVersion) return;
      if (this._spotifyConfigured) this._loadLibrary();
      this.requestUpdate();
    } catch {
      // swallow
    } finally {
      if (version === this._loadVersion) this._configLoadingInProgress = false;
    }
  }

  private async _checkSpotifyStatus(): Promise<void> {
    if (!this._backend) return;
    try {
      const result = await this._backend.send<{ configured: boolean }>('spotify_status');
      this._spotifyConfigured = result?.configured ?? false;
    } catch {
      this._spotifyConfigured = false;
    }
  }

  // — Library data loading —

  private async _loadLibrary(): Promise<void> {
    if (!this._backend) return;
    this._libraryLoading = true;
    this._error = null;
    const limit = this._spotifyConfig.max_items_per_section;
    try {
      const [playlists, recent, saved, shows] = await Promise.all([
        this._backend.send<{ items: SpotifyItem[]; total: number }>('spotify_browse', { category: 'playlists', limit, offset: 0, sort_order: this._spotifyConfig.sort_order }),
        this._backend.send<{ items: SpotifyItem[]; total: number }>('spotify_browse', { category: 'recently_played', limit, offset: 0, sort_order: this._spotifyConfig.sort_order }),
        this._backend.send<{ items: SpotifyItem[]; total: number }>('spotify_browse', { category: 'saved_tracks', limit, offset: 0, sort_order: this._spotifyConfig.sort_order }),
        this._backend.send<{ items: SpotifyItem[]; total: number }>('spotify_browse', { category: 'saved_shows', limit, offset: 0, sort_order: this._spotifyConfig.sort_order }),
      ]);
      this._playlists = (playlists?.items ?? []).filter(Boolean) as SpotifyItem[];
      this._recentlyPlayed = (recent?.items ?? []).filter(Boolean) as SpotifyItem[];
      this._savedTracks = (saved?.items ?? []).filter(Boolean) as SpotifyItem[];
      // Shows are wrapped: { show: {...} }
      this._savedShows = (shows?.items ?? []).filter(Boolean).map((item) => item.show ?? item);
      // Track totals for pagination
      this._sectionTotals = {
        playlists: playlists?.total ?? 0,
        recently_played: recent?.total ?? 0,
        saved_tracks: saved?.total ?? 0,
        saved_shows: shows?.total ?? 0,
      };
      // Batch check saved status for all tracks
      const trackIds: string[] = [];
      for (const item of this._recentlyPlayed) { const tr = item.track ?? item; if (tr.id && (tr.type === 'track' || !tr.type)) trackIds.push(tr.id); }
      for (const item of this._savedTracks) { const tr = item.track ?? item; if (tr.id) trackIds.push(tr.id); }
      if (trackIds.length) this._checkSavedStatus(trackIds);
    } catch (e) {
      this._handleApiError(e);
    } finally {
      this._libraryLoading = false;
    }
  }

  // — Search —

  private _onSearchInput(e: Event): void {
    const value = (e.target as HTMLInputElement).value;
    this._searchQuery = value;
    if (this._debounceTimer) clearTimeout(this._debounceTimer);
    if (value.length === 0) {
      this._view = 'library';
      this._searchResults = { tracks: [], playlists: [], shows: [] };
      this._searchOffset = 0;
      return;
    }
    // Auto-open fold when typing
    if (!this._foldOpen) this._foldOpen = true;
    this._view = 'search';
    this._debounceTimer = window.setTimeout(() => this._doSearch(false), 300);
  }

  private _clearSearch(): void {
    this._searchQuery = '';
    this._view = 'library';
    this._searchResults = { tracks: [], playlists: [], shows: [] };
    this._searchOffset = 0;
    this._foldOpen = false;
  }

  private async _doSearch(append: boolean): Promise<void> {
    if (!this._backend || !this._searchQuery) return;
    const version = ++this._searchVersion;
    this._searchLoading = true;
    this._error = null;
    const offset = append ? this._searchOffset : 0;
    try {
      // Map tab to search types
      let types: string[];
      if (this._tab === 'tracks') types = ['track'];
      else if (this._tab === 'playlists') types = ['playlist'];
      else if (this._tab === 'podcasts') types = ['show'];
      else types = ['track', 'playlist', 'show'];

      const result = await this._backend.send<Record<string, { items: SpotifyItem[]; total: number }>>('spotify_search', {
        query: this._searchQuery,
        types,
        limit: 12,
        offset,
      });

      // Discard stale results
      if (version !== this._searchVersion) return;

      const tracks = (result?.tracks?.items ?? []).filter(Boolean) as SpotifyItem[];
      const playlists = (result?.playlists?.items ?? []).filter(Boolean) as SpotifyItem[];
      const shows = (result?.shows?.items ?? []).filter(Boolean) as SpotifyItem[];

      if (append) {
        this._searchResults = {
          tracks: [...this._searchResults.tracks, ...tracks],
          playlists: [...this._searchResults.playlists, ...playlists],
          shows: [...this._searchResults.shows, ...shows],
        };
      } else {
        this._searchResults = { tracks, playlists, shows };
      }
      this._searchOffset = offset + 12;
      // Check if there are more results
      const totalResults = (result?.tracks?.total ?? 0) + (result?.playlists?.total ?? 0) + (result?.shows?.total ?? 0);
      const loadedResults = this._searchResults.tracks.length + this._searchResults.playlists.length + this._searchResults.shows.length;
      this._searchHasMore = loadedResults < totalResults;
      // Check saved status for search result tracks
      const trackIds = tracks.filter((tr) => tr.id).map((tr) => tr.id);
      if (trackIds.length) this._checkSavedStatus(trackIds);
    } catch (e) {
      if (version !== this._searchVersion) return;
      this._handleApiError(e);
    } finally {
      if (version === this._searchVersion) this._searchLoading = false;
    }
  }

  // — Drilldown —

  private async _openDrilldown(type: 'playlist' | 'album', id: string, title: string): Promise<void> {
    if (!this._backend) return;
    this._view = 'drilldown';
    this._drilldown = { title, type, id, items: [], total: 0, offset: 0, loading: true };
    this._error = null;
    try {
      const category = type === 'playlist' ? 'playlist_tracks' : 'album_tracks';
      const result = await this._backend.send<{ items: SpotifyItem[]; total: number }>(
        'spotify_browse',
        { category, content_id: id, limit: 20, offset: 0, sort_order: this._spotifyConfig.sort_order },
      );
      const items = result?.items ?? [];
      this._drilldown = {
        ...this._drilldown!,
        items,
        total: result?.total ?? 0,
        offset: 20,
        loading: false,
      };
      const ddTrackIds = items.map((it) => (it.track ?? it).id).filter(Boolean);
      if (ddTrackIds.length) this._checkSavedStatus(ddTrackIds);
    } catch (e) {
      this._handleApiError(e);
      if (this._drilldown) this._drilldown = { ...this._drilldown, loading: false };
    }
  }

  private async _loadMoreDrilldown(): Promise<void> {
    if (!this._drilldown || !this._backend) return;
    this._drilldown = { ...this._drilldown, loading: true };
    try {
      const category = this._drilldown.type === 'playlist' ? 'playlist_tracks' : 'album_tracks';
      const result = await this._backend.send<{ items: SpotifyItem[]; total: number }>(
        'spotify_browse',
        { category, content_id: this._drilldown.id, limit: 20, offset: this._drilldown.offset, sort_order: this._spotifyConfig.sort_order },
      );
      const moreItems = result?.items ?? [];
      this._drilldown = {
        ...this._drilldown,
        items: [...this._drilldown.items, ...moreItems],
        offset: this._drilldown.offset + 20,
        loading: false,
      };
      const moreTrackIds = moreItems.map((it) => (it.track ?? it).id).filter(Boolean);
      if (moreTrackIds.length) this._checkSavedStatus(moreTrackIds);
    } catch (e) {
      this._handleApiError(e);
      if (this._drilldown) this._drilldown = { ...this._drilldown, loading: false };
    }
  }

  private _goBack(): void {
    this._drilldown = null;
    this._view = this._searchQuery ? 'search' : 'library';
  }

  // — Speaker picker —

  private _openPicker(item: SpotifyItem): void {
    this._pickerItem = item;
    this._view = 'speaker_picker';
    this._selectedSpeakers = new Set<string>();
    // Collect media_player entities
    if (this.hass) {
      const visibleSet = this._spotifyConfig.visible_speakers;
      const filterByVisible = visibleSet.length > 0;
      this._speakers = Object.entries(this.hass.states)
        .filter(([id]) => {
          if (!id.startsWith('media_player.')) return false;
          if (filterByVisible && !visibleSet.includes(id)) return false;
          return true;
        })
        .map(([id, entity]) => {
          const dc = (entity.attributes.device_class as string | undefined) ?? '';
          let icon = 'mdi:speaker';
          if (dc === 'tv' || id.includes('tv')) icon = 'mdi:television';
          else if (dc === 'receiver') icon = 'mdi:audio-video';
          else if (id.includes('nest') || id.includes('hub') || id.includes('echo_show')) icon = 'mdi:tablet';
          return {
            entityId: id,
            name: (entity.attributes.friendly_name as string) ?? id,
            state: entity.state,
            mediaTitle: (entity.attributes.media_title as string | undefined) ?? null,
            icon,
          };
        })
        .sort((a, b) => {
          if (filterByVisible) {
            // Respect configured order from visible_speakers
            return visibleSet.indexOf(a.entityId) - visibleSet.indexOf(b.entityId);
          }
          // No config: playing first, then paused, then idle
          const order = (s: string) => s === 'playing' ? 0 : s === 'paused' ? 1 : 2;
          return order(a.state) - order(b.state);
        });
    }
  }

  private _closePicker(): void {
    this._pickerItem = null;
    this._view = this._drilldown ? 'drilldown' : this._searchQuery ? 'search' : 'library';
  }

  private _toggleSpeakerSelection(entityId: string): void {
    const next = new Set(this._selectedSpeakers);
    if (next.has(entityId)) next.delete(entityId);
    else next.add(entityId);
    this._selectedSpeakers = next;
  }

  private async _playOnSelectedSpeakers(): Promise<void> {
    if (!this.hass || !this._pickerItem || this._selectedSpeakers.size === 0) return;
    const item = this._pickerItem;
    const uri = item.uri ?? `spotify:${item.type}:${item.id}`;
    const entityIds = [...this._selectedSpeakers];
    const contentType = item.type === 'track' ? 'music' : item.type === 'playlist' ? 'playlist' : item.type === 'album' ? 'music' : 'podcast';
    const F_GROUPING = 524288;

    try {
      // Unjoin speakers that are in existing groups first
      for (const id of entityIds) {
        const entity = this.hass!.states[id];
        if (!entity) continue;
        const members = entity.attributes.group_members as string[] | undefined;
        if (members && members.length > 1) {
          this.hass!.callService('media_player', 'unjoin', {}, { entity_id: id });
        }
      }
      // Small delay for unjoins to propagate
      if (entityIds.length > 1) {
        await new Promise((r) => setTimeout(r, 600));
      }

      // Play on the first (coordinator) speaker
      const coordinator = entityIds[0];
      await this.hass.callService('media_player', 'play_media', {
        media_content_id: uri,
        media_content_type: contentType,
      }, { entity_id: coordinator });

      // If multiple speakers selected, join the rest to the coordinator
      if (entityIds.length > 1) {
        const others = entityIds.slice(1);
        const coordinatorEntity = this.hass.states[coordinator];
        const canGroup = coordinatorEntity &&
          ((coordinatorEntity.attributes.supported_features as number) & F_GROUPING) !== 0;
        if (canGroup) {
          // Small delay for play_media to start
          await new Promise((r) => setTimeout(r, 800));
          this.hass.callService('media_player', 'join', {
            group_members: others,
          }, { entity_id: coordinator });
        } else {
          // Coordinator can't group — play individually on each
          for (const id of others) {
            this.hass.callService('media_player', 'play_media', {
              media_content_id: uri,
              media_content_type: contentType,
            }, { entity_id: id });
          }
        }
      }

      // Radio queue: for single tracks, seed recommendations and add to queue
      if ((item.type === 'track' || item.type === 'episode') && this._backend) {
        this._seedRadioQueue(item);
      }
    } catch {
      // Ignore playback errors
    }
    this._closePicker();
  }

  /** Fire-and-forget: fetch recommendations for a track and add them to the queue. */
  private async _seedRadioQueue(item: SpotifyItem): Promise<void> {
    if (!this._backend) return;
    bus.emit('radio-queue-started', { count: 0 });
    try {
      // Wait for Spotify to register the play_media command before queuing
      await new Promise((r) => setTimeout(r, 2000));
      if (!this._backend) return;
      const result = await this._backend.send<{ tracks: SpotifyItem[] }>(
        'spotify_browse',
        { category: 'recommendations', seed_tracks: [item.id], limit: 20 },
      );
      const recommended = result?.tracks ?? [];
      bus.emit('radio-queue-started', { count: recommended.length });
      let added = 0;
      for (let i = 0; i < recommended.length; i++) {
        const rec = recommended[i];
        if (!this._backend) break;
        const recUri = rec.uri ?? `spotify:track:${rec.id}`;
        try {
          await this._backend.send('spotify_add_to_queue', { uri: recUri });
          added++;
          bus.emit('radio-queue-track-added', {
            track: { id: rec.id, name: rec.name, uri: recUri, artist: getArtistNames(rec) || undefined },
            index: i,
          });
          // Small delay between queue additions to avoid Spotify rate limiting
          await new Promise((r) => setTimeout(r, 150));
        } catch {
          break; // Stop on first error (rate limit, etc.)
        }
      }
      bus.emit('radio-queue-complete', { total: added });
    } catch (e) {
      bus.emit('radio-queue-error', { message: (e as Error).message ?? 'Unknown error' });
    }
  }

  // — Library pagination —

  private async _loadMoreItems(category: string): Promise<void> {
    if (!this._backend || this._loadingMore[category]) return;
    this._loadingMore = { ...this._loadingMore, [category]: true };
    const limit = this._spotifyConfig.max_items_per_section;
    let offset = 0;
    if (category === 'playlists') offset = this._playlists.length;
    else if (category === 'recently_played') offset = this._recentlyPlayed.length;
    else if (category === 'saved_tracks') offset = this._savedTracks.length;
    else if (category === 'saved_shows') offset = this._savedShows.length;

    try {
      const result = await this._backend.send<{ items: SpotifyItem[]; total: number }>(
        'spotify_browse',
        { category, limit, offset, sort_order: this._spotifyConfig.sort_order },
      );
      const newItems = (result?.items ?? []).filter(Boolean) as SpotifyItem[];
      if (category === 'playlists') {
        this._playlists = [...this._playlists, ...newItems];
      } else if (category === 'recently_played') {
        this._recentlyPlayed = [...this._recentlyPlayed, ...newItems];
      } else if (category === 'saved_tracks') {
        this._savedTracks = [...this._savedTracks, ...newItems];
        const trackIds = newItems.map((it) => (it.track ?? it).id).filter(Boolean);
        if (trackIds.length) this._checkSavedStatus(trackIds);
      } else if (category === 'saved_shows') {
        this._savedShows = [...this._savedShows, ...newItems.map((item) => item.show ?? item)];
      }
      if (result?.total != null) {
        this._sectionTotals = { ...this._sectionTotals, [category]: result.total };
      }
    } catch (e) {
      this._handleApiError(e);
    } finally {
      this._loadingMore = { ...this._loadingMore, [category]: false };
    }
  }

  private _renderLoadMore(category: string, currentCount: number): TemplateResult | typeof nothing {
    const total = this._sectionTotals[category] ?? 0;
    if (currentCount >= total) return nothing;
    return html`
      <button class="load-more-btn load-more" ?disabled=${this._loadingMore[category]} @click=${() => this._loadMoreItems(category)}>
        ${t('spotify.load_more')}
        <span class="items-count">${t('spotify.items_count', { current: String(currentCount), total: String(total) })}</span>
      </button>
    `;
  }

  // — Favorites —

  private async _checkSavedStatus(trackIds: string[]): Promise<void> {
    if (!trackIds.length || !this._backend) return;
    try {
      const result = await this._backend.send<Record<string, boolean>>('spotify_check_saved', { track_ids: trackIds });
      if (!this.isConnected) return;
      const newMap = new Map(this._savedMap);
      for (const [id, saved] of Object.entries(result ?? {})) {
        newMap.set(id, saved);
      }
      this._savedMap = newMap;
    } catch { /* silent */ }
  }

  private async _toggleSaved(trackId: string): Promise<void> {
    if (!this._backend) return;
    const isSaved = this._savedMap.get(trackId) ?? false;
    // Optimistic update
    const newMap = new Map(this._savedMap);
    newMap.set(trackId, !isSaved);
    this._savedMap = newMap;
    try {
      if (isSaved) {
        await this._backend.send('spotify_remove_tracks', { track_ids: [trackId] });
      } else {
        await this._backend.send('spotify_save_tracks', { track_ids: [trackId] });
      }
    } catch {
      // Rollback on failure
      const rollbackMap = new Map(this._savedMap);
      rollbackMap.set(trackId, isSaved);
      this._savedMap = rollbackMap;
    }
  }

  // — Error handling —

  private _handleApiError(e: unknown): void {
    const err = e as { message?: string; code?: string };
    if (err.code === 'spotify_not_configured') {
      this._spotifyConfigured = false;
    } else if (err.message?.includes('rate limit') || err.message?.includes('429')) {
      this._error = t('spotify.error_rate_limit', { seconds: '30' });
    } else {
      this._error = t('spotify.error_api');
    }
  }

  // — Render —

  render(): TemplateResult | typeof nothing {
    void this._lang;

    if (!this._configLoaded) return nothing;

    const entityId = this._getEntityId();

    // Not configured
    if (this._spotifyConfigured === false) {
      return this._renderShell(html`
        <div class="setup-banner">
          <ha-icon .icon=${'mdi:spotify'}></ha-icon>
          <div class="setup-banner-text">${t('spotify.not_configured')}</div>
          <a class="setup-link" href="/config/integrations/dashboard" target="_blank">
            ${t('spotify.open_config')}
          </a>
        </div>
      `);
    }

    // No entity
    if (!entityId) {
      return this._renderShell(html`
        <div class="setup-banner">
          <ha-icon .icon=${'mdi:spotify'}></ha-icon>
          <div class="setup-banner-text">${t('spotify.no_entity')}</div>
          <a class="setup-link" href="/glass-cards" target="_blank">
            ${t('spotify.open_config')}
          </a>
        </div>
      `);
    }

    const showSpeakerPicker = this._view === 'speaker_picker' && this._pickerItem;

    return html`
      ${this._renderShell(html`
        ${this._error ? html`<div class="error-banner">${this._error}</div>` : nothing}
        ${this._view === 'drilldown' && this._drilldown
          ? this._renderDrilldown()
          : html`
            ${this._renderSearch()}
            <div class="sp-fold ${this._foldOpen ? 'open' : ''}">
              <div class="sp-fold-inner">
                ${this._renderTabs()}
                <div class="content-area">
                  ${this._view === 'search' ? this._renderSearchResults() : this._renderLibrary()}
                </div>
              </div>
            </div>
          `}
      `)}
      ${showSpeakerPicker ? this._renderSpeakerPicker() : nothing}
    `;
  }

  private _renderShell(content: TemplateResult): TemplateResult {
    return html`
      <div class="spotify-card-wrap">
        ${this._spotifyConfig.show_header ? html`
          <div class="card-header">
            <div class="card-header-left">
              <span class="card-title">${t('spotify.title')}</span>
            </div>
          </div>
        ` : nothing}
        <div class="glass spotify-card">
          <div class="tint"></div>
          <div class="card-inner">${content}</div>
        </div>
      </div>
    `;
  }

  private _renderSearch(): TemplateResult {
    return html`
      <div class="search-row">
        <div class="search-input-wrap">
          <div class="search-icon"><ha-icon .icon=${'mdi:magnify'}></ha-icon></div>
          <input
            class="search-input"
            type="text"
            placeholder=${t('spotify.search_placeholder')}
            .value=${this._searchQuery}
            @input=${this._onSearchInput}
            @focus=${() => { if (!this._foldOpen) this._foldOpen = true; this._scrollToTop(); }}
          />
          <button
            class="search-clear ${this._searchQuery ? 'visible' : ''}"
            aria-label="Clear"
            @click=${this._clearSearch}
          >
            <ha-icon .icon=${'mdi:close'}></ha-icon>
          </button>
          <button
            class="search-toggle ${this._foldOpen ? 'open' : ''}"
            aria-label=${t('spotify.toggle_library')}
            @click=${() => { this._foldOpen = !this._foldOpen; }}
          >
            <ha-icon .icon=${'mdi:chevron-down'}></ha-icon>
          </button>
        </div>
      </div>
    `;
  }

  private _renderTabs(): TemplateResult {
    const tabs: { id: TabId; labelKey: string; icon: string }[] = [
      { id: 'all', labelKey: 'spotify.tab_all', icon: 'mdi:home' },
      { id: 'tracks', labelKey: 'spotify.tab_tracks', icon: 'mdi:music-note' },
      { id: 'playlists', labelKey: 'spotify.tab_playlists', icon: 'mdi:playlist-music' },
      { id: 'podcasts', labelKey: 'spotify.tab_podcasts', icon: 'mdi:podcast' },
    ];
    return html`
      <div class="tab-bar">
        ${tabs.map((tab) => html`
          <button
            class="tab-btn ${this._tab === tab.id ? 'active' : ''}"
            aria-label=${t(tab.labelKey as Parameters<typeof t>[0])}
            @click=${() => { this._tab = tab.id; if (this._searchQuery) { this._searchOffset = 0; this._doSearch(false); } }}
          >
            <ha-icon .icon=${tab.icon}></ha-icon>
            <span>${t(tab.labelKey as Parameters<typeof t>[0])}</span>
          </button>
        `)}
      </div>
    `;
  }

  // — Library render —

  private _renderLibrary(): TemplateResult {
    if (this._libraryLoading) {
      return html`<div class="loading-text">${t('spotify.loading')}</div>`;
    }

    const showPlaylists = this._tab === 'all' || this._tab === 'playlists';
    const showTracks = this._tab === 'all' || this._tab === 'tracks';
    const showPodcasts = this._tab === 'all' || this._tab === 'podcasts';
    const hasContent = (showPlaylists && this._playlists.length > 0) ||
                       (showTracks && (this._recentlyPlayed.length > 0 || this._savedTracks.length > 0)) ||
                       (showPodcasts && this._savedShows.length > 0);

    if (!hasContent) {
      return html`
        <div class="empty-state">
          <ha-icon .icon=${'mdi:music-note-off'}></ha-icon>
          <div class="empty-state-text">${t('spotify.no_content')}</div>
        </div>
      `;
    }

    return html`
      ${showPlaylists && this._playlists.length > 0 ? html`
        <div class="section-title">${t('spotify.my_playlists')}</div>
        <div class="playlist-scroll">
          ${this._playlists.map((pl) => this._renderPlaylistCard(pl))}
        </div>
        ${this._renderLoadMore('playlists', this._playlists.length)}
      ` : nothing}

      ${showTracks && this._recentlyPlayed.length > 0 ? html`
        <div class="section-title">${t('spotify.recently_played')}</div>
        ${this._recentlyPlayed.map((item) => {
          const track = item.track ?? item;
          return this._renderResultRow(track, track.type ?? 'track');
        })}
        ${this._renderLoadMore('recently_played', this._recentlyPlayed.length)}
      ` : nothing}

      ${showTracks && this._savedTracks.length > 0 ? html`
        <div class="section-title">${t('spotify.saved_tracks')}</div>
        ${this._savedTracks.map((item) => {
          const track = item.track ?? item;
          return this._renderResultRow(track, 'track');
        })}
        ${this._renderLoadMore('saved_tracks', this._savedTracks.length)}
      ` : nothing}

      ${showPodcasts && this._savedShows.length > 0 ? html`
        <div class="section-title">${t('spotify.followed_podcasts')}</div>
        ${this._savedShows.map((show) => this._renderResultRow({ ...show, type: 'show' as const }, 'show'))}
        ${this._renderLoadMore('saved_shows', this._savedShows.length)}
      ` : nothing}
    `;
  }

  private _renderPlaylistCard(pl: SpotifyItem): TemplateResult {
    const img = getImage(pl, 160);
    const count = pl.tracks?.total ?? 0;
    return html`
      <button
        class="playlist-card"
        aria-label=${pl.name}
        @click=${() => this._openDrilldown('playlist', pl.id, pl.name)}
      >
        <div class="playlist-art" style=${img ? '' : 'background:#3040a0'}>
          ${img
            ? html`<img src=${img} alt="" loading="lazy" />`
            : html`<ha-icon .icon=${'mdi:playlist-music'}></ha-icon>`}
          <div class="playlist-art-play"><ha-icon .icon=${'mdi:play'}></ha-icon></div>
        </div>
        <div class="playlist-name">${pl.name}</div>
        ${count > 0 ? html`<div class="playlist-count">${t('spotify.tracks_count', { count: String(count) })}</div>` : nothing}
      </button>
    `;
  }

  private _renderResultRow(item: SpotifyItem, type: string): TemplateResult | typeof nothing {
    if (!item) return nothing;
    const img = getImage(item, 64);
    const artist = getArtistNames(item) || (item.owner?.display_name ?? '');
    const isRound = type === 'show' || type === 'episode';
    const uri = item.uri ?? `spotify:${item.type ?? type}:${item.id}`;
    const playing = this._isNowPlaying(uri);
    return html`
      <div
        class="result-row ${playing ? 'now-playing' : ''}"
        role="button"
        tabindex="0"
        @click=${() => {
          if (type === 'playlist') this._openDrilldown('playlist', item.id, item.name);
          else if (type === 'album') this._openDrilldown('album', item.id, item.name);
          else this._openPicker(item);
        }}
        @keydown=${(e: KeyboardEvent) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); (e.currentTarget as HTMLElement).click(); } }}
      >
        <div class="result-art ${isRound ? 'round' : ''}">
          ${img
            ? html`<img src=${img} alt="" loading="lazy" />`
            : html`<ha-icon .icon=${typeIcon(type)}></ha-icon>`}
        </div>
        <div class="result-info">
          <div class="result-title">${item.name}</div>
          <div class="result-meta">
            <span class="result-type-badge">${t(typeBadgeKey(type) as Parameters<typeof t>[0])}</span>
            <span>${artist}</span>
          </div>
        </div>
        ${(type === 'track' || type === 'episode') && item.id ? html`
          <button class="heart-btn ${this._savedMap.get(item.id) ? 'saved' : ''}"
                  aria-label="${this._savedMap.get(item.id) ? t('spotify.remove_track') : t('spotify.save_track')}"
                  @click=${(e: Event) => { e.stopPropagation(); this._toggleSaved(item.id); }}>
            <ha-icon .icon="${this._savedMap.get(item.id) ? 'mdi:heart' : 'mdi:heart-outline'}"></ha-icon>
          </button>
        ` : nothing}
        ${playing
          ? html`<div class="eq-bars"><span></span><span></span><span></span></div>`
          : html`
            <button
              class="result-play"
              aria-label=${t('spotify.play_aria', { name: item.name })}
              @click=${(e: Event) => { e.stopPropagation(); this._openPicker(item); }}
            >
              <ha-icon .icon=${'mdi:play'}></ha-icon>
            </button>
          `}
      </div>
    `;
  }

  // — Search results render —

  private _renderSearchResults(): TemplateResult {
    if (this._searchLoading && this._searchOffset === 0) {
      return html`<div class="loading-text">${t('spotify.loading')}</div>`;
    }

    const { tracks, playlists, shows } = this._searchResults;
    const showTracks = (this._tab === 'all' || this._tab === 'tracks') && tracks.length > 0;
    const showPlaylists = (this._tab === 'all' || this._tab === 'playlists') && playlists.length > 0;
    const showShows = (this._tab === 'all' || this._tab === 'podcasts') && shows.length > 0;

    if (!showTracks && !showPlaylists && !showShows) {
      return html`
        <div class="empty-state">
          <ha-icon .icon=${'mdi:music-note-off'}></ha-icon>
          <div class="empty-state-text">${t('spotify.no_results', { query: this._searchQuery })}</div>
        </div>
      `;
    }

    return html`
      ${showTracks ? html`
        ${this._tab === 'all' ? html`<div class="section-title">${t('spotify.tab_tracks')}</div>` : nothing}
        ${tracks.map((item) => this._renderResultRow(item, 'track'))}
      ` : nothing}

      ${showPlaylists ? html`
        ${this._tab === 'all' ? html`<div class="section-title">${t('spotify.tab_playlists')}</div>` : nothing}
        ${playlists.map((item) => this._renderResultRow(item, 'playlist'))}
      ` : nothing}

      ${showShows ? html`
        ${this._tab === 'all' ? html`<div class="section-title">${t('spotify.tab_podcasts')}</div>` : nothing}
        ${shows.map((item) => this._renderResultRow({ ...item, type: 'show' }, 'show'))}
      ` : nothing}

      ${this._searchHasMore ? html`
        <button class="load-more-btn" @click=${() => this._doSearch(true)} ?disabled=${this._searchLoading}>
          ${this._searchLoading ? t('spotify.loading') : t('spotify.load_more')}
        </button>
      ` : nothing}
    `;
  }

  // — Drilldown render —

  private _playFullDrilldown(): void {
    if (!this._drilldown) return;
    const dd = this._drilldown;
    const uri = `spotify:${dd.type}:${dd.id}`;
    this._openPicker({ id: dd.id, name: dd.title, type: dd.type, uri } as SpotifyItem);
  }

  private _renderDrilldown(): TemplateResult {
    const dd = this._drilldown!;
    return html`
      <div class="drilldown-header">
        <button class="back-btn" @click=${this._goBack}>
          <ha-icon .icon=${'mdi:arrow-left'}></ha-icon>
          ${t('spotify.back')}
        </button>
        <button class="play-all-btn" @click=${this._playFullDrilldown} aria-label=${t('spotify.play_all')}>
          <ha-icon .icon=${'mdi:play-circle'}></ha-icon>
          ${t('spotify.play_all')}
        </button>
      </div>
      <div class="section-title">${dd.title}</div>
      <div class="content-area">
        ${dd.items.map((item) => {
          const track = item.track ?? item;
          return this._renderResultRow(track, track.type ?? 'track');
        })}
        ${dd.loading ? html`<div class="loading-text">${t('spotify.loading')}</div>` : nothing}
        ${!dd.loading && dd.items.length < dd.total ? html`
          <button class="load-more-btn" ?disabled=${dd.loading} @click=${this._loadMoreDrilldown}>
            ${t('spotify.load_more')}
          </button>
        ` : nothing}
      </div>
    `;
  }

  // — Speaker picker render —

  private _renderSpeakerPicker(): TemplateResult {
    const item = this._pickerItem!;
    const img = getImage(item, 64);
    const artist = getArtistNames(item);
    const hasSelection = this._selectedSpeakers.size > 0;
    return html`
      <div class="picker-backdrop visible" @click=${(e: Event) => { if ((e.target as HTMLElement).classList.contains('picker-backdrop')) this._closePicker(); }}>
        <div class="glass speaker-picker">
          <div class="picker-header">
            <div class="picker-title">${t('spotify.play_on')}</div>
            <button class="picker-close" aria-label="Close" @click=${this._closePicker}>
              <ha-icon .icon=${'mdi:close'}></ha-icon>
            </button>
          </div>

          <div class="picker-track">
            <div class="picker-track-art">
              ${img
                ? html`<img src=${img} alt="" />`
                : html`<ha-icon .icon=${typeIcon(item.type ?? 'track')}></ha-icon>`}
            </div>
            <div class="picker-track-info">
              <div class="picker-track-title">${item.name}</div>
              ${artist ? html`<div class="picker-track-artist">${artist}</div>` : nothing}
            </div>
          </div>

          <div class="picker-speakers">
            ${this._speakers.map((sp) => {
              const selected = this._selectedSpeakers.has(sp.entityId);
              return html`
                <button class="picker-speaker ${selected ? 'selected' : ''}" @click=${() => this._toggleSpeakerSelection(sp.entityId)}>
                  <div class="picker-speaker-icon">
                    <ha-icon .icon=${sp.icon}></ha-icon>
                  </div>
                  <div class="picker-speaker-name">${sp.name}</div>
                  <div class="picker-speaker-status ${sp.state === 'playing' ? 'playing' : ''}">
                    ${sp.state === 'playing' && sp.mediaTitle
                      ? sp.mediaTitle
                      : sp.state === 'paused'
                        ? t('spotify.paused')
                        : t('spotify.available')}
                  </div>
                  <div class="picker-speaker-check">
                    <ha-icon .icon=${'mdi:check'}></ha-icon>
                  </div>
                </button>
              `;
            })}
          </div>

          <div class="picker-play-bar">
            <button
              class="picker-play-btn primary"
              ?disabled=${!hasSelection}
              @click=${() => this._playOnSelectedSpeakers()}
              aria-label=${t('spotify.play')}
            >
              <ha-icon .icon=${'mdi:play'}></ha-icon>
              ${t('spotify.play')}${hasSelection ? ` (${this._selectedSpeakers.size})` : ''}
            </button>
          </div>
        </div>
      </div>
    `;
  }
}

try { customElements.define('glass-spotify-card', GlassSpotifyCard); } catch { /* scoped registry */ }
