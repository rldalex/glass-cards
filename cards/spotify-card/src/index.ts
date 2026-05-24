import { css, html, nothing, type CSSResult, type TemplateResult, type PropertyValues } from 'lit';
import { state } from 'lit/decorators.js';
import { BaseCard, BackendService, fireHaptic } from '@glass-cards/base-card';
import './editor';
import { glassTokens, hostMixin, glassMixin, bounceMixin, eqMixin } from '@glass-cards/ui-core';
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
type LibraryCategory = 'playlists' | 'recently_played' | 'saved_tracks' | 'saved_shows';

const LIB_SECTION_LABEL_KEY: Record<LibraryCategory, Parameters<typeof t>[0]> = {
  playlists: 'spotify.my_playlists',
  recently_played: 'spotify.recently_played',
  saved_tracks: 'spotify.saved_tracks',
  saved_shows: 'spotify.followed_podcasts',
};

interface DrilldownState {
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
  static getConfigElement() {
    return document.createElement('glass-spotify-card-editor');
  }

  getCardSize() {
    return 4;
  }

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
  @state() private _loadingMore: Record<string, boolean> = {};

  // — Config —
  private _spotifyConfig: SpotifyBackendConfig = {
    entity_id: '', show_header: true, sort_order: 'recent_first', max_items_per_section: 6, visible_speakers: [],
  };
  private _backend: BackendService | undefined;
  private _configLoaded = false;
  private _configLoadingInProgress = false;
  private _loadVersion = 0;
  private _radioQueueVersion = 0;
  private _debounceTimer = 0;

  // — Styles —

  static styles: CSSResult[] = [glassTokens, hostMixin, glassMixin, bounceMixin, eqMixin, css`
    :host {
      width: 100%; max-width: 31.25rem; margin: 0 auto;
      user-select: none; -webkit-user-select: none;
      /* "On Spotify" — dark near-black tinted toward spotify green, used for text/icons over the saturated spotify background */
      --c-spotify-on: var(--c-spotify-on);
    }

    .spotify-card-wrap { display: flex; flex-direction: column; gap: 0.375rem; }

    .card-header { display: flex; align-items: center; justify-content: space-between; padding: 0 0.375rem; min-height: 1.375rem; }
    .card-header-left { display: flex; align-items: center; gap: 0.5rem; }
    .card-title {
      font-size: var(--fz-xs); font-weight: 700; text-transform: uppercase;
      letter-spacing: 1.5px; color: var(--t4); display: flex; align-items: center; gap: 0.25rem;
    }
    .card-title ha-icon { color: var(--c-spotify); --mdc-icon-size: var(--icon-sm); display: flex; align-items: center; justify-content: center; }

    .spotify-card { position: relative; width: 100%; padding: 0.875rem; box-sizing: border-box; overflow: hidden; }
    .card-inner { position: relative; z-index: 1; display: flex; flex-direction: column; gap: 0; }

    .tint {
      position: absolute; inset: 0; border-radius: inherit;
      pointer-events: none; z-index: 0;
      background: radial-gradient(ellipse at 20% 20%, rgba(var(--rgb-spotify),0.12), transparent 70%);
      opacity: 0.6;
    }
    .spotify-card::after {
      content: ''; position: absolute; left: 0; right: 0; bottom: 0;
      height: 60%; pointer-events: none; z-index: 0;
      background: radial-gradient(ellipse 70% 60% at 50% 100%, rgba(var(--rgb-spotify), 0.10), transparent 70%);
      opacity: 0; transition: opacity var(--t-slow);
    }
    .spotify-card.fold-open::after { opacity: 1; }
    @media (prefers-reduced-motion: reduce) {
      .spotify-card::after { transition: none; }
    }

    /* Search */
    .search-row { display: flex; gap: 0.375rem; align-items: center; }
    .search-input-wrap { position: relative; flex: 1; }
    .search-input {
      width: 100%; height: 2.25rem; padding: 0 2.25rem 0 2.125rem;
      border-radius: var(--radius-lg); background: var(--s2);
      border: 1px solid var(--b2); color: var(--t1);
      font-family: inherit; font-size: var(--fz-base); font-weight: 500;
      outline: none; transition: border-color var(--t-fast), background var(--t-fast), box-shadow var(--t-fast);
      -webkit-tap-highlight-color: transparent; box-sizing: border-box;
    }
    .search-input::placeholder { color: var(--t4); }
    .search-input:focus {
      border-color: rgba(var(--rgb-spotify), 0.5);
      background: var(--s3);
      box-shadow:
        0 0 0 3px rgba(var(--rgb-spotify), 0.12),
        0 4px 14px rgba(var(--rgb-spotify), 0.18);
    }
    .search-icon {
      position: absolute; top: 50%; left: 0.625rem; transform: translateY(-50%);
      pointer-events: none; display: flex; align-items: center; justify-content: center;
    }
    .search-icon ha-icon {
      --mdc-icon-size: 1rem; color: var(--t4);
      display: flex; align-items: center; justify-content: center;
      transition: color var(--t-fast);
    }
    .search-input-wrap:has(.search-input:focus) .search-icon ha-icon { color: var(--c-spotify); }

    /* — Now-playing bar (replaces search bar when something is playing and fold is closed) — */
    .np-bar {
      display: flex; align-items: center; gap: 0.5rem;
      min-height: var(--tap-lg);
    }
    .np-art {
      width: 2.5rem; height: 2.5rem; border-radius: var(--radius-sm);
      flex-shrink: 0; overflow: hidden;
      background: var(--s2); border: 1px solid var(--b1);
      display: flex; align-items: center; justify-content: center;
      box-shadow: 0 4px 12px rgba(var(--rgb-black), 0.3), 0 0 12px rgba(var(--rgb-spotify), 0.18);
    }
    .np-art img { width: 100%; height: 100%; object-fit: cover; }
    .np-art ha-icon {
      --mdc-icon-size: 1.125rem;
      color: color-mix(in srgb, var(--c-spotify) 60%, var(--t4));
      display: flex; align-items: center; justify-content: center;
    }
    .np-meta { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 0.0625rem; }
    .np-title {
      font-size: var(--fz-base); font-weight: 600; color: var(--t1); line-height: 1.2;
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }
    .np-artist {
      font-size: var(--fz-sm); font-weight: 500; color: var(--t3); line-height: 1.2;
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }
    .np-transport {
      display: inline-flex; align-items: center; gap: 0.0625rem;
      flex-shrink: 0;
    }
    /* np-bar transport buttons (prev/next/search) handled by
       <glass-icon-button size="sm">. Only the branded play stays as
       a real <button>. */
    .np-btn-play {
      position: relative;
      width: 2.125rem; height: 2.125rem; border-radius: 50%;
      background: var(--c-spotify); color: var(--c-spotify-on);
      border: none;
      display: flex; align-items: center; justify-content: center;
      cursor: pointer; padding: 0; outline: none;
      transition: background var(--t-fast), transform var(--t-fast), box-shadow var(--t-fast);
      -webkit-tap-highlight-color: transparent;
      box-shadow: 0 4px 14px rgba(var(--rgb-spotify), 0.35);
    }
    .np-btn-play ha-icon { --mdc-icon-size: 1.25rem; display: flex; align-items: center; justify-content: center; }
    @media (hover: hover) and (pointer: fine) {
      .np-btn-play:hover {
        background: var(--c-spotify-hover);
        box-shadow: 0 6px 18px rgba(var(--rgb-spotify), 0.5);
      }
    }
    @media (hover: hover) { .np-btn-play:active { transform: scale(0.94); } }
    @media (pointer: coarse) { .np-btn-play:active { animation: bounce 0.3s ease; } }
    .np-btn-play:focus-visible { outline: 2px solid rgba(var(--rgb-white), 0.4); outline-offset: 2px; }

    /* Search affordance in np-bar — small magnify icon button */
    .np-btn-search { margin-left: 0.25rem; }

    /* Search-clear (visible only when query non-empty) — absolute positioning
       inside the input wrapper. The button styling itself is handled by
       <glass-icon-button size="sm">. */
    .search-clear {
      position: absolute; top: 50%; right: 1.875rem; transform: translateY(-50%);
      display: none;
    }
    .search-clear.visible { display: inline-flex; }

    /* Fold toggle arrow (inside search bar) — absolute positioning only.
       The button styling itself is handled by <glass-icon-button size="sm">. */
    .search-toggle {
      position: absolute; top: 50%; right: 0.375rem; transform: translateY(-50%);
    }

    /* Content fold (CSS Grid 0fr/1fr) */
    .sp-fold {
      display: grid; grid-template-rows: 0fr;
      transition: grid-template-rows var(--t-layout);
    }
    .sp-fold.open { grid-template-rows: 1fr; }
    .sp-fold-inner {
      overflow: hidden; opacity: 0; min-height: 0;
      transition: opacity var(--t-fast) 0s;
      display: flex; flex-direction: column; gap: 0.625rem;
    }
    .sp-fold.open .sp-fold-inner { padding-top: 0.625rem; }
    .sp-fold.open .sp-fold-inner {
      opacity: 1;
      transition: opacity var(--t-fast) 0.1s;
    }

    /* Fold separator */
    .sp-fold-sep {
      height: 0.0625rem; margin: 0.125rem 0.75rem 0;
      background: linear-gradient(90deg, transparent, rgba(var(--rgb-spotify),0.15), transparent);
      opacity: 0; transition: opacity var(--t-fast);
    }
    .sp-fold.open + .sp-fold-sep { opacity: 1; }

    /* Tabs — sliding rail */
    .tab-rail {
      position: relative;
      display: grid; grid-template-columns: repeat(4, 1fr);
      padding: 0.1875rem;
      border-radius: var(--radius-md);
      background: var(--s1); border: 1px solid var(--b1);
    }
    .tab-rail-capsule {
      position: absolute; top: 0.1875rem; bottom: 0.1875rem;
      left: 0.1875rem; width: calc((100% - 0.375rem) / 4);
      border-radius: calc(var(--radius-md) - 0.1875rem);
      background: color-mix(in srgb, var(--c-spotify) 18%, transparent);
      border: 1px solid color-mix(in srgb, var(--c-spotify) 30%, transparent);
      box-shadow: 0 1px 6px color-mix(in srgb, var(--c-spotify) 25%, transparent);
      transform: translateX(calc(var(--tab-active-idx, 0) * 100%));
      transition: transform var(--t-layout);
      pointer-events: none;
      z-index: 0;
    }
    .tab-btn {
      position: relative; z-index: 1;
      height: 1.875rem;
      display: flex; align-items: center; justify-content: center; gap: 0.3125rem;
      background: transparent; border: none; color: var(--t3);
      font-family: inherit; font-size: var(--fz-sm); font-weight: 600;
      cursor: pointer; outline: none; padding: 0;
      transition: color var(--t-fast), transform var(--t-fast);
      -webkit-tap-highlight-color: transparent;
    }
    .tab-btn ha-icon { --mdc-icon-size: var(--icon-sm); display: flex; align-items: center; justify-content: center; }
    @media (hover: hover) and (pointer: fine) { .tab-btn:not(.active):hover { color: var(--t2); } }
    .tab-btn:focus-visible { outline: 2px solid rgba(var(--rgb-white),0.25); outline-offset: -2px; }
    @media (hover: hover) and (pointer: fine) { .tab-btn:active { transform: scale(0.96); } }
    @media (pointer: coarse) { .tab-btn:active { animation: bounce 0.3s ease; } }
    .tab-btn.active { color: var(--c-spotify); font-weight: 700; }

    @media (prefers-reduced-motion: reduce) {
      .tab-rail-capsule { transition: none; }
    }

    /* Content area */
    .content-area {
      display: flex; flex-direction: column; gap: 0.375rem;
      max-height: 23.75rem; overflow-y: auto; overflow-x: hidden; scrollbar-width: none;
    }
    .content-area::-webkit-scrollbar { display: none; }

    /* Section title (drilldown / search result groups) */
    .section-title {
      font-size: var(--fz-xs); font-weight: 700; text-transform: uppercase;
      letter-spacing: 1.2px; color: var(--t4); padding: 0.25rem 0.125rem 0.125rem; flex-shrink: 0;
    }

    /* Library section with eyebrow */
    .lib-section { display: flex; flex-direction: column; gap: 0.375rem; flex-shrink: 0; }
    .lib-eyebrow {
      display: flex; align-items: center; gap: 0.4375rem;
      padding: 0 0.125rem;
      min-height: 1.625rem;
      font-size: var(--fz-sm); font-weight: 700; color: var(--t2);
      letter-spacing: 0.1px;
    }
    .lib-eyebrow-dot {
      width: 0.375rem; height: 0.375rem; border-radius: 50%; flex-shrink: 0;
      background: var(--lib-dot-color, var(--t3));
      box-shadow: 0 0 6px var(--lib-dot-glow, transparent);
    }
    .lib-eyebrow-recents   { --lib-dot-color: var(--cl-heat);   --lib-dot-glow: rgba(var(--rgb-heat), 0.45); }
    .lib-eyebrow-playlists { --lib-dot-color: var(--c-spotify); --lib-dot-glow: rgba(var(--rgb-spotify), 0.45); }
    .lib-eyebrow-saved     { --lib-dot-color: var(--c-accent);  --lib-dot-glow: rgba(var(--rgb-accent), 0.45); }
    .lib-eyebrow-podcasts  { --lib-dot-color: var(--c-purple);  --lib-dot-glow: rgba(var(--rgb-purple), 0.45); }
    .lib-eyebrow-tracks    { --lib-dot-color: var(--c-spotify); --lib-dot-glow: rgba(var(--rgb-spotify), 0.45); }

    .search-more-standalone {
      display: flex; justify-content: flex-end;
      padding: 0.25rem 0.125rem 0;
    }
    .search-more-standalone .lib-more-link { margin-left: 0; }

    /* Load more (text link, right-aligned inside eyebrow) */
    .lib-more-link {
      position: relative;
      margin-left: auto;
      display: inline-flex; align-items: center; gap: 0.4375rem;
      background: none; border: none; padding: 0.25rem 0.375rem;
      border-radius: var(--radius-sm);
      font-family: inherit; font-size: var(--fz-sm); font-weight: 600;
      color: var(--t3); cursor: pointer; outline: none;
      transition: color var(--t-fast), background var(--t-fast);
      -webkit-tap-highlight-color: transparent;
    }
    .lib-more-link .lib-more-count { font-size: var(--fz-xs); font-weight: 500; color: var(--t4); }
    .lib-more-link:disabled { opacity: 0.5; cursor: default; }
    @media (hover: hover) and (pointer: fine) {
      .lib-more-link:not(:disabled):hover { color: var(--c-spotify); background: var(--s1); }
      .lib-more-link:not(:disabled):hover .lib-more-count { color: color-mix(in srgb, var(--c-spotify) 60%, var(--t3)); }
    }
    .lib-more-link:focus-visible { outline: 2px solid rgba(var(--rgb-white),0.25); outline-offset: -1px; }

    /* Result row */
    .result-row {
      display: flex; align-items: center; gap: 0.625rem;
      padding: 0.375rem 0.5rem 0.375rem 0.25rem; cursor: pointer; position: relative;
      transition: background var(--t-fast), transform var(--t-fast); border-radius: var(--radius-md);
      flex-shrink: 0; background: none; border: none; width: 100%; box-sizing: border-box;
      font-family: inherit; text-align: left; color: inherit; outline: none;
      -webkit-tap-highlight-color: transparent;
    }
    @media (hover: hover) and (pointer: fine) {
      .result-row:hover { background: var(--s1); transform: translateX(2px); }
      .result-row:hover .result-art { box-shadow: 0 0 0 1px rgba(var(--rgb-spotify), 0.35), 0 4px 12px rgba(var(--rgb-black), 0.2); }
    }
    @media (hover: hover) and (pointer: fine) { .result-row:active { transform: translateX(2px) scale(0.99); } }
    @media (pointer: coarse) { .result-row:active { animation: bounce 0.3s ease; } }
    .result-row:focus-visible { outline: 2px solid rgba(var(--rgb-white),0.25); outline-offset: -2px; }

    .result-art {
      width: 2.625rem; height: 2.625rem; border-radius: var(--radius-sm); flex-shrink: 0;
      background: var(--s2); border: 1px solid var(--b1);
      display: flex; align-items: center; justify-content: center;
      overflow: hidden; position: relative;
      transition: box-shadow var(--t-fast), transform var(--t-fast);
    }
    .result-art.round { border-radius: 50%; }
    .result-art img { width: 100%; height: 100%; object-fit: cover; }
    .result-art ha-icon { --mdc-icon-size: var(--icon-md); color: var(--t4); display: flex; align-items: center; justify-content: center; }

    @media (prefers-reduced-motion: reduce) {
      .result-row, .result-row:hover { transform: none; }
      .playlist-art-play { transition: none; }
      .playlist-art-overlay { transition: none; }
      .lib-eyebrow-dot { box-shadow: none; }
    }

    .result-info { flex: 1; min-width: 0; }
    .result-title {
      font-size: var(--fz-base); font-weight: 600; color: var(--t1); line-height: 1.2;
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }
    .result-meta {
      font-size: var(--fz-sm); font-weight: 500; color: var(--t3); margin-top: 0.0625rem;
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
      display: flex; align-items: center; gap: 0.25rem;
    }
    .result-type-badge {
      font-size: var(--fz-xxs); font-weight: 700; text-transform: uppercase; letter-spacing: 0.4px;
      padding: 0.0625rem 0.25rem; border-radius: var(--radius-full);
      background: var(--s3); color: var(--t4); flex-shrink: 0;
    }

    /* Result-row play button — opacity reveal on row hover. The button
       itself is a <glass-icon-button size="sm" active-color="spotify">. */
    .result-play {
      opacity: 0; transform: scale(0.8); flex-shrink: 0;
      transition: opacity var(--t-fast), transform var(--t-fast);
    }
    @media (hover: hover) and (pointer: fine) {
      .result-row:hover .result-play { opacity: 1; transform: scale(1); }
    }
    /* Always show on coarse pointers (no hover) */
    @media (pointer: coarse) { .result-play { opacity: 1; transform: scale(1); } }

    /* Playlist grid (horizontal scroll) */
    .playlist-scroll {
      display: flex; gap: 0.5rem; overflow-x: auto; overflow-y: hidden;
      padding: 0.125rem 0.125rem 0.25rem; margin: 0 -0.125rem; scrollbar-width: none; flex-shrink: 0;
    }
    .playlist-scroll::-webkit-scrollbar { display: none; }

    .playlist-card {
      flex-shrink: 0; width: 5.25rem;
      display: flex; flex-direction: column; gap: 0.375rem;
      cursor: pointer; padding: 0; background: none; border: none;
      outline: none; text-align: left; font-family: inherit;
      -webkit-tap-highlight-color: transparent; color: inherit;
    }
    @media (hover: hover) and (pointer: fine) { .playlist-card:active { transform: scale(0.97); } }
    @media (pointer: coarse) { .playlist-card:active { animation: bounce 0.3s ease; } }
    .playlist-card:focus-visible { outline: 2px solid rgba(var(--rgb-white),0.25); outline-offset: 2px; }

    .playlist-art {
      width: 5.25rem; height: 5.25rem; border-radius: var(--radius-md);
      background: var(--s2); border: 1px solid var(--b1);
      display: flex; align-items: center; justify-content: center;
      overflow: hidden; position: relative;
      transition: border-color var(--t-fast), box-shadow var(--t-fast);
    }
    @media (hover: hover) and (pointer: fine) {
      .playlist-card:hover .playlist-art {
        border-color: color-mix(in srgb, var(--c-spotify) 40%, transparent);
        box-shadow: 0 8px 24px rgba(var(--rgb-black), 0.35);
      }
    }
    .playlist-art img { width: 100%; height: 100%; object-fit: cover; }
    .playlist-art-fallback {
      width: 100%; height: 100%;
      display: flex; align-items: center; justify-content: center;
      background: linear-gradient(135deg, color-mix(in srgb, var(--c-spotify) 25%, var(--s3)), var(--s2));
    }
    .playlist-art-fallback ha-icon {
      --mdc-icon-size: 2rem;
      color: color-mix(in srgb, var(--c-spotify) 60%, rgba(var(--rgb-white),0.4));
      display: flex; align-items: center; justify-content: center;
    }

    /* Hover overlay: bottom gradient + play CTA reveal */
    .playlist-art-overlay {
      position: absolute; inset: 0; pointer-events: none;
      background: linear-gradient(to top, rgba(var(--rgb-black), 0.55), transparent 55%);
      opacity: 0; transition: opacity var(--t-fast);
    }
    @media (hover: hover) and (pointer: fine) {
      .playlist-card:hover .playlist-art-overlay { opacity: 1; }
    }

    .playlist-art-play {
      position: absolute; bottom: 0.4375rem; right: 0.4375rem;
      width: 2rem; height: 2rem; border-radius: 50%;
      background: var(--c-spotify);
      display: flex; align-items: center; justify-content: center;
      opacity: 0; transform: translateY(6px) scale(0.85);
      transition: opacity var(--t-fast), transform var(--t-fast);
      box-shadow: 0 6px 18px rgba(var(--rgb-black),0.45), 0 0 12px rgba(var(--rgb-spotify), 0.4);
      pointer-events: none;
    }
    .playlist-art-play ha-icon {
      --mdc-icon-size: 1.125rem;
      color: var(--c-spotify-on);
      display: flex; align-items: center; justify-content: center;
    }
    @media (hover: hover) and (pointer: fine) {
      .playlist-card:hover .playlist-art-play { opacity: 1; transform: translateY(0) scale(1); }
    }

    .playlist-name {
      font-size: var(--fz-sm); font-weight: 600; color: var(--t2); line-height: 1.3;
      display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
      transition: color var(--t-fast);
    }
    @media (hover: hover) and (pointer: fine) {
      .playlist-card:hover .playlist-name { color: var(--t1); }
    }
    .playlist-count { font-size: var(--fz-xs); font-weight: 500; color: var(--t4); }

    /* Drilldown: hero + tracks */
    .drilldown { display: flex; flex-direction: column; gap: 0.75rem; }

    .drilldown-hero {
      position: relative;
      display: grid; grid-template-columns: auto 1fr;
      gap: 0.875rem;
      padding: 0.5rem 0.125rem 0.875rem;
      border-bottom: 1px solid var(--b1);
    }
    /* Drilldown back button — positioning only, glass-icon-button handles
       the rest. */
    .drilldown-back {
      position: absolute; top: 0; right: 0;
      z-index: 1;
    }

    .drilldown-hero-art {
      width: 5rem; height: 5rem; border-radius: var(--radius-md);
      background: var(--s2); flex-shrink: 0;
      display: flex; align-items: center; justify-content: center;
      overflow: hidden;
      box-shadow:
        0 12px 28px rgba(var(--rgb-black), 0.4),
        0 0 0 1px var(--b1) inset,
        0 0 18px rgba(var(--rgb-spotify), 0.12);
    }
    .drilldown-hero-art img { width: 100%; height: 100%; object-fit: cover; }
    .drilldown-hero-art ha-icon {
      --mdc-icon-size: 2rem;
      color: color-mix(in srgb, var(--c-spotify) 50%, var(--t4));
      display: flex; align-items: center; justify-content: center;
    }

    .drilldown-hero-info {
      min-width: 0;
      display: flex; flex-direction: column; gap: 0.25rem;
      justify-content: center;
      padding-right: 2.25rem;
    }
    .drilldown-hero-title {
      font-size: var(--fz-md); font-weight: 700; color: var(--t1); line-height: 1.2;
      display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
    }
    .drilldown-hero-meta {
      font-size: var(--fz-sm); font-weight: 500; color: var(--t3);
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }
    .drilldown-play-cta {
      position: relative;
      align-self: flex-start;
      margin-top: 0.375rem;
      display: inline-flex; align-items: center; gap: 0.375rem;
      padding: 0.375rem 0.75rem 0.375rem 0.5rem;
      border-radius: var(--radius-full);
      background: var(--c-spotify);
      border: none;
      color: var(--c-spotify-on);
      font-family: inherit; font-size: var(--fz-sm); font-weight: 700;
      cursor: pointer; outline: none;
      transition: background var(--t-fast), transform var(--t-fast), box-shadow var(--t-fast);
      box-shadow: 0 4px 14px rgba(var(--rgb-spotify), 0.3);
      -webkit-tap-highlight-color: transparent;
    }
    @media (pointer: coarse) {
      .drilldown-play-cta::after { content: ''; position: absolute; inset: -0.4375rem; }
    }
    .drilldown-play-cta ha-icon {
      --mdc-icon-size: 1rem;
      display: flex; align-items: center; justify-content: center;
    }
    .drilldown-play-cta:disabled { opacity: 0.4; cursor: default; box-shadow: none; }
    @media (hover: hover) and (pointer: fine) {
      .drilldown-play-cta:not(:disabled):hover {
        background: var(--c-spotify-hover);
        box-shadow: 0 6px 18px rgba(var(--rgb-spotify), 0.45);
      }
    }
    @media (hover: hover) { .drilldown-play-cta:active:not(:disabled) { transform: scale(0.96); } }
    @media (pointer: coarse) { .drilldown-play-cta:active:not(:disabled) { animation: bounce 0.3s ease; } }
    .drilldown-play-cta:focus-visible { outline: 2px solid rgba(var(--rgb-white),0.4); outline-offset: 2px; }

    .drilldown-tracks { flex: 1; min-height: 0; }

    /* — Empty / setup / error states (cohérent eyebrow + cercle ambient) — */
    .empty-state {
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      padding: 2rem 1.25rem; gap: 0.625rem; text-align: center;
    }
    .empty-state .ambient-icon {
      width: 3.25rem; height: 3.25rem; border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      background: color-mix(in srgb, var(--c-spotify) 10%, transparent);
      border: 1px solid color-mix(in srgb, var(--c-spotify) 22%, transparent);
      box-shadow: 0 0 18px rgba(var(--rgb-spotify), 0.15);
      margin-bottom: 0.125rem;
    }
    .empty-state .ambient-icon ha-icon {
      --mdc-icon-size: 1.5rem;
      color: color-mix(in srgb, var(--c-spotify) 70%, var(--t2));
      display: flex; align-items: center; justify-content: center;
    }
    .empty-state-title {
      font-size: var(--fz-md); font-weight: 700; color: var(--t1); line-height: 1.3;
    }
    .empty-state-sub {
      font-size: var(--fz-sm); font-weight: 500; color: var(--t3); line-height: 1.4;
      max-width: 22rem;
    }
    /* Alert variant */
    .empty-state.is-alert .ambient-icon {
      background: color-mix(in srgb, var(--c-alert) 10%, transparent);
      border-color: color-mix(in srgb, var(--c-alert) 22%, transparent);
      box-shadow: 0 0 18px rgba(var(--rgb-alert), 0.15);
    }
    .empty-state.is-alert .ambient-icon ha-icon {
      color: color-mix(in srgb, var(--c-alert) 80%, var(--t2));
    }

    /* Eyebrow for setup/error banners — same pattern as library */
    .banner-eyebrow {
      display: inline-flex; align-items: center; gap: 0.4375rem;
      font-size: var(--fz-sm); font-weight: 700;
      letter-spacing: 0.1px; margin-bottom: 0.25rem;
    }
    .banner-eyebrow-dot {
      width: 0.375rem; height: 0.375rem; border-radius: 50%; flex-shrink: 0;
    }
    .banner-eyebrow-setup { color: var(--c-spotify); }
    .banner-eyebrow-setup .banner-eyebrow-dot { background: var(--c-spotify); box-shadow: 0 0 8px rgba(var(--rgb-spotify), 0.6); }
    .banner-eyebrow-error { color: var(--c-alert); }
    .banner-eyebrow-error .banner-eyebrow-dot { background: var(--c-alert); box-shadow: 0 0 8px rgba(var(--rgb-alert), 0.55); }

    .error-banner {
      display: flex; align-items: flex-start; gap: 0.625rem;
      padding: 0.625rem 0.75rem; border-radius: var(--radius-md);
      background: rgba(var(--rgb-alert), 0.08);
      border: 1px solid rgba(var(--rgb-alert), 0.2);
    }
    .error-banner-icon {
      width: 1.5rem; height: 1.5rem; border-radius: 50%; flex-shrink: 0;
      display: flex; align-items: center; justify-content: center;
      background: rgba(var(--rgb-alert), 0.18);
    }
    .error-banner-icon ha-icon {
      --mdc-icon-size: 0.9375rem; color: var(--c-alert);
      display: flex; align-items: center; justify-content: center;
    }
    .error-banner-body { flex: 1; min-width: 0; }
    .error-banner-text {
      font-size: var(--fz-base); font-weight: 500; color: var(--t2); line-height: 1.35;
    }

    /* Setup banner — uses empty-state shell + eyebrow + CTA */
    .setup-banner-cta {
      display: inline-flex; align-items: center; gap: 0.4375rem;
      margin-top: 0.5rem;
      padding: 0.75rem 1rem; border-radius: var(--radius-full);
      min-height: var(--tap-lg); box-sizing: border-box;
      background: var(--c-spotify); color: var(--c-spotify-on);
      border: none;
      font-family: inherit; font-size: var(--fz-base); font-weight: 700;
      text-decoration: none; cursor: pointer; outline: none;
      box-shadow: 0 4px 14px rgba(var(--rgb-spotify), 0.3);
      transition: background var(--t-fast), transform var(--t-fast), box-shadow var(--t-fast);
      -webkit-tap-highlight-color: transparent;
    }
    .setup-banner-cta ha-icon { --mdc-icon-size: 0.9375rem; display: flex; align-items: center; justify-content: center; }
    @media (hover: hover) and (pointer: fine) {
      .setup-banner-cta:hover {
        background: var(--c-spotify-hover);
        box-shadow: 0 6px 18px rgba(var(--rgb-spotify), 0.45);
      }
    }
    @media (hover: hover) { .setup-banner-cta:active { transform: scale(0.97); } }
    @media (pointer: coarse) { .setup-banner-cta:active { animation: bounce 0.3s ease; } }
    .setup-banner-cta:focus-visible { outline: 2px solid rgba(var(--rgb-white), 0.4); outline-offset: 2px; }

    /* Speaker picker overlay */
    .picker-backdrop {
      position: fixed; inset: 0; z-index: 10000;
      background:
        radial-gradient(ellipse 70% 50% at 50% 30%, rgba(var(--rgb-spotify), 0.18), transparent 70%),
        rgba(var(--rgb-black), 0.62);
      display: flex; align-items: flex-end; justify-content: center;
      padding: 1rem; padding-bottom: 5rem;
      opacity: 0; pointer-events: none;
      transition: opacity 0.25s var(--ease-std);
    }
    .picker-backdrop.visible { opacity: 1; pointer-events: auto; }

    .speaker-picker {
      width: 100%; max-width: 25rem;
      padding: 1rem 1rem 1.125rem;
      max-height: calc(100dvh - 10rem);
      display: flex; flex-direction: column;
      transform: translateY(28px);
      transition: transform 0.35s var(--ease-out);
    }
    .picker-backdrop.visible .speaker-picker { transform: translateY(0); }

    .picker-header {
      display: flex; align-items: center; justify-content: space-between;
      margin-bottom: 0.625rem;
    }
    .picker-eyebrow {
      display: inline-flex; align-items: center; gap: 0.4375rem;
      font-size: var(--fz-sm); font-weight: 700; color: var(--c-spotify);
      letter-spacing: 0.1px;
    }
    .picker-eyebrow-dot {
      width: 0.375rem; height: 0.375rem; border-radius: 50%; flex-shrink: 0;
      background: var(--c-spotify);
      box-shadow: 0 0 8px rgba(var(--rgb-spotify), 0.6);
    }
    .picker-close {
      position: relative;
      width: 1.75rem; height: 1.75rem; border-radius: var(--radius-sm);
      background: var(--s2); border: 1px solid var(--b1);
      display: flex; align-items: center; justify-content: center;
      cursor: pointer; padding: 0; outline: none;
      transition: background var(--t-fast);
    }
    @media (pointer: coarse) {
      .picker-close::after { content: ''; position: absolute; inset: -0.5rem; }
    }
    .picker-close ha-icon { --mdc-icon-size: 1rem; color: var(--t3); display: flex; align-items: center; justify-content: center; }
    @media (hover: hover) and (pointer: fine) { .picker-close:hover { background: var(--s3); } }
    @media (pointer: coarse) { .picker-close:active { animation: bounce 0.3s ease; } }
    .picker-close:focus-visible { outline: 2px solid rgba(var(--rgb-white),0.25); outline-offset: -2px; }

    /* Hero block: oversized artwork + track meta */
    .picker-hero {
      display: flex; align-items: center; gap: 0.875rem;
      padding: 0.25rem 0.125rem 0.75rem;
      margin-bottom: 0.625rem;
      border-bottom: 1px solid var(--b1);
    }
    .picker-hero-art {
      width: 4.5rem; height: 4.5rem; border-radius: var(--radius-md);
      background: var(--s2); flex-shrink: 0;
      display: flex; align-items: center; justify-content: center;
      overflow: hidden; position: relative;
      box-shadow:
        0 12px 28px rgba(var(--rgb-black), 0.45),
        0 0 0 1px var(--b1) inset,
        0 0 18px rgba(var(--rgb-spotify), 0.18);
    }
    .picker-hero-art img { width: 100%; height: 100%; object-fit: cover; }
    .picker-hero-art ha-icon {
      --mdc-icon-size: 1.75rem; color: color-mix(in srgb, var(--c-spotify) 50%, var(--t4));
      display: flex; align-items: center; justify-content: center;
    }
    .picker-hero-info { flex: 1; min-width: 0; }
    .picker-hero-title {
      font-size: var(--fz-md); font-weight: 700; color: var(--t1); line-height: 1.25;
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }
    .picker-hero-artist {
      font-size: var(--fz-base); font-weight: 500; color: var(--t3); margin-top: 0.125rem;
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }

    /* Speaker rows */
    .picker-speakers {
      display: flex; flex-direction: column; gap: 0.3125rem;
      overflow-y: auto; flex: 1; min-height: 0;
      scrollbar-width: none;
      padding-right: 0.125rem;
    }
    .picker-speakers::-webkit-scrollbar { display: none; }
    .picker-speaker {
      display: flex; align-items: center; gap: 0.6875rem;
      padding: 0.5rem 0.625rem; border-radius: var(--radius-md);
      background: var(--s1); border: 1px solid var(--b1);
      cursor: pointer;
      transition: background var(--t-fast), border-color var(--t-fast), transform var(--t-fast);
      font-family: inherit; outline: none; width: 100%;
      -webkit-tap-highlight-color: transparent; color: inherit;
      flex-shrink: 0; position: relative;
      text-align: left;
    }
    .picker-speaker:focus-visible { outline: 2px solid rgba(var(--rgb-white),0.25); outline-offset: -2px; }
    @media (hover: hover) and (pointer: fine) {
      .picker-speaker:not(.selected):hover { background: var(--s2); border-color: var(--b2); transform: translateX(2px); }
    }
    @media (hover: hover) and (pointer: fine) { .picker-speaker:active { transform: translateX(2px) scale(0.985); } }
    @media (pointer: coarse) { .picker-speaker:active { animation: bounce 0.3s ease; } }

    /* State: playing — subtle spotify ring even when not selected */
    .picker-speaker.state-playing .picker-speaker-icon {
      background: rgba(var(--rgb-spotify), 0.12);
      border-color: rgba(var(--rgb-spotify), 0.3);
    }
    .picker-speaker.state-playing .picker-speaker-icon ha-icon { color: var(--c-spotify); }

    /* State: off — dimmed */
    .picker-speaker.state-off .picker-speaker-name { color: var(--t3); }
    .picker-speaker.state-off .picker-speaker-icon ha-icon { color: var(--t4); }

    /* State: selected — wins over playing visually */
    .picker-speaker.selected {
      background: color-mix(in srgb, var(--c-spotify) 14%, transparent);
      border-color: color-mix(in srgb, var(--c-spotify) 55%, transparent);
      box-shadow: 0 0 0 1px color-mix(in srgb, var(--c-spotify) 40%, transparent) inset;
    }

    .picker-speaker-icon {
      width: 2.25rem; height: 2.25rem; border-radius: var(--radius-sm);
      background: var(--s2); border: 1px solid var(--b1);
      display: flex; align-items: center; justify-content: center; flex-shrink: 0;
      transition: background var(--t-fast), border-color var(--t-fast);
    }
    .picker-speaker.selected .picker-speaker-icon {
      background: rgba(var(--rgb-spotify), 0.2);
      border-color: rgba(var(--rgb-spotify), 0.45);
    }
    .picker-speaker-icon ha-icon { --mdc-icon-size: 1.125rem; color: var(--t2); display: flex; align-items: center; justify-content: center; transition: color var(--t-fast); }
    .picker-speaker.selected .picker-speaker-icon ha-icon { color: var(--c-spotify); }

    .picker-speaker-meta { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 0.0625rem; }
    .picker-speaker-name {
      font-size: var(--fz-base); font-weight: 600; color: var(--t1); line-height: 1.2;
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }
    .picker-speaker-status {
      display: inline-flex; align-items: center; gap: 0.375rem;
      font-size: var(--fz-xs); font-weight: 500; color: var(--t3);
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }
    .picker-state-dot {
      width: 0.3125rem; height: 0.3125rem; border-radius: 50%; flex-shrink: 0;
      background: var(--t4);
    }
    .picker-speaker.state-playing .picker-state-label { color: var(--c-spotify); }
    .picker-speaker.state-paused .picker-state-dot { background: var(--c-warning); }
    .picker-speaker.state-off .picker-state-dot { background: var(--t4); opacity: 0.5; }
    .picker-speaker.state-idle .picker-state-dot {
      background: var(--c-spotify);
      box-shadow: 0 0 6px rgba(var(--rgb-spotify), 0.45);
    }

    /* EQ bars for playing state (transform-only, composited) */
    .picker-state-eq {
      display: inline-flex; align-items: flex-end; gap: 0.125rem;
      width: 0.75rem; height: 0.625rem; flex-shrink: 0;
    }
    .picker-state-eq span {
      flex: 1; height: 100%;
      background: var(--c-spotify); border-radius: 1px;
      transform-origin: bottom center;
      animation: picker-eq 0.9s ease-in-out infinite;
    }
    .picker-state-eq span:nth-child(1) { animation-delay: -0.2s; }
    .picker-state-eq span:nth-child(2) { animation-delay: -0.5s; }
    .picker-state-eq span:nth-child(3) { animation-delay: -0.35s; }
    @keyframes picker-eq {
      0%, 100% { transform: scaleY(0.3); }
      50%      { transform: scaleY(1);   }
    }

    .picker-speaker-check {
      width: 1.375rem; height: 1.375rem; border-radius: 50%;
      border: 2px solid var(--b2); background: transparent;
      display: flex; align-items: center; justify-content: center; flex-shrink: 0;
      transition: border-color var(--t-fast), background var(--t-fast), transform var(--t-fast);
      transform: scale(0.9);
    }
    .picker-speaker.selected .picker-speaker-check {
      border-color: var(--c-spotify); background: var(--c-spotify);
      transform: scale(1);
    }
    .picker-speaker-check ha-icon {
      --mdc-icon-size: 0.875rem; color: var(--c-spotify-on);
      display: flex; align-items: center; justify-content: center;
      opacity: 0; transition: opacity var(--t-fast);
    }
    .picker-speaker.selected .picker-speaker-check ha-icon { opacity: 1; }

    .picker-play-bar {
      display: flex; gap: 0.5rem; padding-top: 0.875rem; flex-shrink: 0;
    }
    .picker-play-btn {
      flex: 1; padding: 0.75rem 1rem; border-radius: var(--radius-md);
      border: none; cursor: pointer; font-family: inherit; font-size: var(--fz-base); font-weight: 700;
      display: flex; align-items: center; justify-content: center; gap: 0.5rem;
      transition: background var(--t-fast), transform var(--t-fast), box-shadow var(--t-fast); outline: none;
      -webkit-tap-highlight-color: transparent;
    }
    .picker-play-btn.primary {
      background: var(--c-spotify);
      color: var(--c-spotify-on);
      box-shadow: 0 6px 20px rgba(var(--rgb-spotify), 0.35);
    }
    .picker-play-btn.primary:disabled {
      background: var(--s3); color: var(--t4); cursor: default;
      box-shadow: none;
    }
    @media (hover: hover) and (pointer: fine) {
      .picker-play-btn.primary:not(:disabled):hover {
        background: var(--c-spotify-hover);
        box-shadow: 0 8px 24px rgba(var(--rgb-spotify), 0.5);
      }
    }
    .picker-play-btn.primary ha-icon { --mdc-icon-size: 1.125rem; display: flex; align-items: center; justify-content: center; }
    @media (hover: hover) and (pointer: fine) { .picker-play-btn:active:not(:disabled) { transform: scale(0.98); } }
    @media (pointer: coarse) { .picker-play-btn:active:not(:disabled) { animation: bounce 0.3s ease; } }
    .picker-play-btn:focus-visible { outline: 2px solid rgba(var(--rgb-white),0.4); outline-offset: 2px; }

    @media (prefers-reduced-motion: reduce) {
      .picker-backdrop, .speaker-picker, .picker-speaker { transition: none; }
      .picker-state-eq span { animation: none; transform: scaleY(0.6); }
      .picker-speaker:hover { transform: none; }
      .drilldown-play-cta { transition: none; }
      .drilldown-play-cta:active { transform: none; }
      .np-btn-play, .setup-banner-cta { transition: none; }
      .np-btn-play:active, .setup-banner-cta:active { transform: none; }
    }

    /* Now playing indicator */
    .result-row.now-playing {
      background: color-mix(in srgb, var(--c-spotify) 10%, transparent);
      border-radius: var(--radius-md);
    }
    .result-row.now-playing .result-title {
      color: var(--c-spotify);
    }
    .result-row.now-playing .result-art {
      box-shadow: 0 0 0 2px var(--c-spotify), 0 0 16px rgba(var(--rgb-spotify), 0.35);
    }
    .result-row .eq-bars { flex-shrink: 0; }

    /* Heart (favorite) button — handled by <glass-icon-button size="sm"
       active-color="alert">. flex-shrink stops it from collapsing in
       narrow rows. */
    .heart-btn { flex-shrink: 0; }

    /* Loading spinner placeholder */
    .loading-text { font-size: var(--fz-base); color: var(--t4); text-align: center; padding: 1rem 0; }

    /* Touch hit-area expansion to reach 44px on touch devices.
       .heart-btn now uses <glass-icon-button> which provides its own hit-area. */
    @media (pointer: coarse) {
      .tab-btn::after,
      .lib-more-link::after { content: ''; position: absolute; }
      .tab-btn::after    { left: 0; right: 0; top: -0.4375rem; bottom: -0.4375rem; }
      .lib-more-link::after { left: 0; right: 0; top: -0.625rem; bottom: -0.625rem; }
    }
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

  private _getPlaybackEntity(): { entityId: string; state: string; title: string | null; artist: string | null; art: string | null } | null {
    const entityId = this._getEntityId();
    if (!entityId) return null;
    const entity = this.hass?.states[entityId];
    if (!entity) return null;
    if (entity.state !== 'playing' && entity.state !== 'paused') return null;
    return {
      entityId,
      state: entity.state,
      title: (entity.attributes.media_title as string | undefined) ?? null,
      artist: (entity.attributes.media_artist as string | undefined) ?? null,
      art: (entity.attributes.entity_picture as string | undefined) ?? null,
    };
  }

  private _mediaPlayPause(e: Event): void {
    e.stopPropagation();
    const id = this._getEntityId();
    if (!id) return;
    fireHaptic(this, 'light');
    this._safeCallService('media_player', 'media_play_pause', {}, { entity_id: id });
  }

  private _mediaNext(e: Event): void {
    e.stopPropagation();
    const id = this._getEntityId();
    if (!id) return;
    fireHaptic(this, 'light');
    this._safeCallService('media_player', 'media_next_track', {}, { entity_id: id });
  }

  private _mediaPrev(e: Event): void {
    e.stopPropagation();
    const id = this._getEntityId();
    if (!id) return;
    fireHaptic(this, 'light');
    this._safeCallService('media_player', 'media_previous_track', {}, { entity_id: id });
  }

  private _focusSearchInput(): void {
    // The search input renders only after the fold is open; wait one frame
    requestAnimationFrame(() => {
      const input = this.renderRoot.querySelector<HTMLInputElement>('input.search-input');
      input?.focus();
    });
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

  protected shouldUpdate(changedProps: PropertyValues): boolean {
    if (!super.shouldUpdate(changedProps)) return false;
    // In speaker picker view, skip hass-only updates — speakers are snapshotted at open time
    if (this._view === 'speaker_picker' && changedProps.size === 1 && changedProps.has('hass')) return false;
    return true;
  }

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
    window.removeEventListener('keydown', this._onPickerKeydown);
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

  private async _openDrilldown(type: 'playlist' | 'album', id: string, title: string, image?: string, subtitle?: string): Promise<void> {
    if (!this._backend) return;
    this._view = 'drilldown';
    this._drilldown = { title, type, id, image, subtitle, items: [], total: 0, offset: 0, loading: true };
    this._error = null;
    try {
      const category = type === 'playlist' ? 'playlist_tracks' : 'album_tracks';
      const result = await this._backend.send<{ items: SpotifyItem[]; total: number }>(
        'spotify_browse',
        { category, content_id: id, limit: 20, offset: 0, sort_order: this._spotifyConfig.sort_order },
      );
      const items = result?.items ?? [];
      if (!this._drilldown) return;
      this._drilldown = {
        ...this._drilldown,
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
    window.addEventListener('keydown', this._onPickerKeydown);
    // Focus the close button once the dialog has rendered
    queueMicrotask(() => {
      requestAnimationFrame(() => {
        const closeBtn = this.renderRoot.querySelector<HTMLButtonElement>('.picker-close');
        closeBtn?.focus();
      });
    });
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
    window.removeEventListener('keydown', this._onPickerKeydown);
  }

  private _onPickerKeydown = (e: KeyboardEvent): void => {
    if (e.key === 'Escape' && this._view === 'speaker_picker') {
      e.preventDefault();
      this._closePicker();
    }
  };

  private _toggleSpeakerSelection(entityId: string): void {
    const next = new Set(this._selectedSpeakers);
    if (next.has(entityId)) next.delete(entityId);
    else next.add(entityId);
    this._selectedSpeakers = next;
  }

  private async _playOnSelectedSpeakers(): Promise<void> {
    if (!this.hass || !this._pickerItem || this._selectedSpeakers.size === 0) return;
    fireHaptic(this, 'light');
    const item = this._pickerItem;
    const uri = item.uri ?? `spotify:${item.type}:${item.id}`;
    const entityIds = [...this._selectedSpeakers];
    const contentType = item.type === 'track' ? 'music' : item.type === 'playlist' ? 'playlist' : item.type === 'album' ? 'music' : 'podcast';
    const F_GROUPING = 524288;

    try {
      // Unjoin speakers that are in existing groups first
      for (const id of entityIds) {
        const entity = this.hass.states[id];
        if (!entity) continue;
        const members = entity.attributes.group_members as string[] | undefined;
        if (members && members.length > 1) {
          this._safeCallService('media_player', 'unjoin', {}, { entity_id: id });
        }
      }
      // Small delay for unjoins to propagate
      if (entityIds.length > 1) {
        await new Promise((r) => setTimeout(r, 600));
      }

      // Play on the first (coordinator) speaker
      const coordinator = entityIds[0];
      this._safeCallService('media_player', 'play_media', {
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
          this._safeCallService('media_player', 'join', {
            group_members: others,
          }, { entity_id: coordinator });
        } else {
          // Coordinator can't group — play individually on each
          for (const id of others) {
            this._safeCallService('media_player', 'play_media', {
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
    const version = ++this._radioQueueVersion;
    try {
      // Wait for Spotify to register the play_media command before queuing
      await new Promise((r) => setTimeout(r, 2000));
      if (!this._backend || version !== this._radioQueueVersion) return;
      const result = await this._backend.send<{ tracks: SpotifyItem[] }>(
        'spotify_browse',
        { category: 'recommendations', seed_tracks: [item.id], limit: 20 },
      );
      if (version !== this._radioQueueVersion) return;
      const recommended = result?.tracks ?? [];
      bus.emit('radio-queue-started', { count: recommended.length });
      let added = 0;
      for (let i = 0; i < recommended.length; i++) {
        const rec = recommended[i];
        if (!this._backend || version !== this._radioQueueVersion) break;
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
      if (version === this._radioQueueVersion) {
        bus.emit('radio-queue-complete', { total: added });
      }
    } catch (e) {
      if (version === this._radioQueueVersion) {
        bus.emit('radio-queue-error', { message: (e as Error).message ?? 'Unknown error' });
      }
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

  private _renderLoadMore(category: LibraryCategory, currentCount: number): TemplateResult | typeof nothing {
    const total = this._sectionTotals[category] ?? 0;
    if (currentCount >= total) return nothing;
    const loading = this._loadingMore[category];
    const sectionLabel = t(LIB_SECTION_LABEL_KEY[category]);
    return html`
      <button
        class="lib-more-link"
        ?disabled=${loading}
        aria-label="${t('spotify.load_more')} ${sectionLabel} (${currentCount}/${total})"
        @click=${(e: Event) => { e.stopPropagation(); this._loadMoreItems(category); }}
      >
        ${loading ? t('spotify.loading') : html`<span aria-hidden="true">${t('spotify.load_more')}</span><span class="lib-more-count" aria-hidden="true">${currentCount} / ${total}</span>`}
      </button>
    `;
  }

  // — Favorites —

  private async _checkSavedStatus(trackIds: string[]): Promise<void> {
    const unique = [...new Set(trackIds)];
    if (!unique.length || !this._backend) return;
    try {
      const result = await this._backend.send<Record<string, boolean>>('spotify_check_saved', { track_ids: unique });
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
    fireHaptic(this, 'light');
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
        <div class="empty-state">
          <div class="banner-eyebrow banner-eyebrow-setup">
            <span class="banner-eyebrow-dot"></span>
            <span>${t('spotify.setup_eyebrow')}</span>
          </div>
          <div class="ambient-icon"><ha-icon .icon=${'mdi:spotify'}></ha-icon></div>
          <div class="empty-state-title">${t('spotify.not_configured')}</div>
          <a class="setup-banner-cta" href="/config/integrations/dashboard" target="_blank" rel="noopener noreferrer">
            <ha-icon .icon=${'mdi:arrow-up-right'}></ha-icon>
            <span>${t('spotify.open_config')}</span>
          </a>
        </div>
      `);
    }

    // No entity
    if (!entityId) {
      return this._renderShell(html`
        <div class="empty-state">
          <div class="banner-eyebrow banner-eyebrow-setup">
            <span class="banner-eyebrow-dot"></span>
            <span>${t('spotify.setup_eyebrow')}</span>
          </div>
          <div class="ambient-icon"><ha-icon .icon=${'mdi:spotify'}></ha-icon></div>
          <div class="empty-state-title">${t('spotify.no_entity')}</div>
          <a class="setup-banner-cta" href="/glass-cards" target="_blank" rel="noopener noreferrer">
            <ha-icon .icon=${'mdi:arrow-up-right'}></ha-icon>
            <span>${t('spotify.open_config')}</span>
          </a>
        </div>
      `);
    }

    const showSpeakerPicker = this._view === 'speaker_picker' && this._pickerItem;

    return html`
      ${this._renderShell(html`
        ${this._error ? html`
          <div class="error-banner" role="alert">
            <div class="error-banner-icon"><ha-icon .icon=${'mdi:alert-circle-outline'}></ha-icon></div>
            <div class="error-banner-body">
              <div class="banner-eyebrow banner-eyebrow-error">
                <span class="banner-eyebrow-dot"></span>
                <span>${t('spotify.error_eyebrow')}</span>
              </div>
              <div class="error-banner-text">${this._error}</div>
            </div>
          </div>
        ` : nothing}
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
        <div class="glass spotify-card ${this._foldOpen ? 'fold-open' : ''}">
          <div class="tint"></div>
          <div class="card-inner">${content}</div>
        </div>
      </div>
    `;
  }

  private _renderSearch(): TemplateResult {
    const playback = this._getPlaybackEntity();
    // Show now-playing bar instead of search when fold is closed AND something is playing/paused
    if (playback && !this._foldOpen) {
      return this._renderNowPlayingBar(playback);
    }
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
          <glass-icon-button
            class="search-clear ${this._searchQuery ? 'visible' : ''}"
            size="sm"
            .icon=${'mdi:close'}
            aria-label="${t('spotify.clear_search')}"
            @click=${this._clearSearch}
          ></glass-icon-button>
          <glass-chevron
            class="search-toggle"
            interactive
            size="sm"
            ?open=${this._foldOpen}
            aria-label=${t('spotify.toggle_library')}
            @click=${() => { this._foldOpen = !this._foldOpen; }}
          ></glass-chevron>
        </div>
      </div>
    `;
  }

  private _renderNowPlayingBar(playback: { state: string; title: string | null; artist: string | null; art: string | null }): TemplateResult {
    const isPlaying = playback.state === 'playing';
    const titleText = playback.title ?? t('spotify.tab_tracks');
    return html`
      <div class="np-bar" role="region" aria-label=${t('spotify.now_playing_aria')}>
        <div class="np-art">
          ${playback.art
            ? html`<img src=${playback.art} alt="" loading="lazy" />`
            : html`<ha-icon .icon=${'mdi:music-note'}></ha-icon>`}
        </div>
        <div class="np-meta">
          <div class="np-title">${titleText}</div>
          ${playback.artist ? html`<div class="np-artist">${playback.artist}</div>` : nothing}
        </div>
        <div class="np-transport">
          <glass-icon-button
            size="sm"
            .icon=${'mdi:skip-previous'}
            aria-label=${t('spotify.previous_track')}
            @click=${(e: Event) => this._mediaPrev(e)}
          ></glass-icon-button>
          <button class="np-btn np-btn-play ${isPlaying ? 'is-playing' : 'is-paused'}" aria-label=${isPlaying ? t('spotify.pause') : t('spotify.play')} @click=${(e: Event) => this._mediaPlayPause(e)}>
            <ha-icon .icon=${isPlaying ? 'mdi:pause' : 'mdi:play'}></ha-icon>
          </button>
          <glass-icon-button
            size="sm"
            .icon=${'mdi:skip-next'}
            aria-label=${t('spotify.next_track')}
            @click=${(e: Event) => this._mediaNext(e)}
          ></glass-icon-button>
        </div>
        <glass-icon-button
          class="np-btn-search"
          size="sm"
          .icon=${'mdi:magnify'}
          aria-label=${t('spotify.search_placeholder')}
          @click=${(e: Event) => { e.stopPropagation(); this._foldOpen = true; this._focusSearchInput(); }}
        ></glass-icon-button>
        <glass-chevron
          class="search-toggle"
          interactive
          size="sm"
          ?open=${this._foldOpen}
          aria-label=${t('spotify.toggle_library')}
          @click=${() => { this._foldOpen = !this._foldOpen; }}
        ></glass-chevron>
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
    const activeIdx = tabs.findIndex((t) => t.id === this._tab);
    return html`
      <div class="tab-rail" style="--tab-active-idx: ${activeIdx};">
        <div class="tab-rail-capsule" aria-hidden="true"></div>
        ${tabs.map((tab) => html`
          <button
            class="tab-btn ${this._tab === tab.id ? 'active' : ''}"
            aria-pressed=${this._tab === tab.id ? 'true' : 'false'}
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
          <div class="ambient-icon"><ha-icon .icon=${'mdi:music-note-off'}></ha-icon></div>
          <div class="empty-state-title">${t('spotify.no_content')}</div>
          <div class="empty-state-sub">${t('spotify.no_content_sub')}</div>
        </div>
      `;
    }

    return html`
      ${showPlaylists && this._playlists.length > 0 ? html`
        <div class="lib-section">
          <div class="lib-eyebrow lib-eyebrow-playlists">
            <span class="lib-eyebrow-dot"></span>
            <span>${t('spotify.my_playlists')}</span>
            ${this._renderLoadMore('playlists', this._playlists.length)}
          </div>
          <div class="playlist-scroll">
            ${this._playlists.map((pl) => this._renderPlaylistCard(pl))}
          </div>
        </div>
      ` : nothing}

      ${showTracks && this._recentlyPlayed.length > 0 ? html`
        <div class="lib-section">
          <div class="lib-eyebrow lib-eyebrow-recents">
            <span class="lib-eyebrow-dot"></span>
            <span>${t('spotify.recently_played')}</span>
            ${this._renderLoadMore('recently_played', this._recentlyPlayed.length)}
          </div>
          ${this._recentlyPlayed.map((item) => {
            const track = item.track ?? item;
            return this._renderResultRow(track, track.type ?? 'track');
          })}
        </div>
      ` : nothing}

      ${showTracks && this._savedTracks.length > 0 ? html`
        <div class="lib-section">
          <div class="lib-eyebrow lib-eyebrow-saved">
            <span class="lib-eyebrow-dot"></span>
            <span>${t('spotify.saved_tracks')}</span>
            ${this._renderLoadMore('saved_tracks', this._savedTracks.length)}
          </div>
          ${this._savedTracks.map((item) => {
            const track = item.track ?? item;
            return this._renderResultRow(track, 'track');
          })}
        </div>
      ` : nothing}

      ${showPodcasts && this._savedShows.length > 0 ? html`
        <div class="lib-section">
          <div class="lib-eyebrow lib-eyebrow-podcasts">
            <span class="lib-eyebrow-dot"></span>
            <span>${t('spotify.followed_podcasts')}</span>
            ${this._renderLoadMore('saved_shows', this._savedShows.length)}
          </div>
          ${this._savedShows.map((show) => this._renderResultRow({ ...show, type: 'show' as const }, 'show'))}
        </div>
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
        @click=${() => this._openDrilldown('playlist', pl.id, pl.name, getImage(pl, 300), pl.owner?.display_name)}
      >
        <div class="playlist-art">
          ${img
            ? html`<img src=${img} alt="" loading="lazy" />`
            : html`<div class="playlist-art-fallback"><ha-icon .icon=${'mdi:playlist-music'}></ha-icon></div>`}
          <div class="playlist-art-overlay" aria-hidden="true"></div>
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
          if (type === 'playlist') this._openDrilldown('playlist', item.id, item.name, getImage(item, 300), item.owner?.display_name);
          else if (type === 'album') this._openDrilldown('album', item.id, item.name, getImage(item, 300), getArtistNames(item));
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
          <glass-icon-button
            class="heart-btn"
            size="sm"
            active-color="alert"
            ?active=${this._savedMap.get(item.id) ?? false}
            .icon=${this._savedMap.get(item.id) ? 'mdi:heart' : 'mdi:heart-outline'}
            aria-label="${this._savedMap.get(item.id) ? t('spotify.remove_track') : t('spotify.save_track')}"
            @click=${(e: Event) => { e.stopPropagation(); this._toggleSaved(item.id); }}
          ></glass-icon-button>
        ` : nothing}
        ${playing
          ? html`<div class="eq-bars"><span></span><span></span><span></span></div>`
          : html`
            <glass-icon-button
              class="result-play"
              size="sm"
              .icon=${'mdi:play'}
              active-color="spotify"
              aria-label=${t('spotify.play_aria', { name: item.name })}
              @click=${(e: Event) => { e.stopPropagation(); this._openPicker(item); }}
            ></glass-icon-button>
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
          <div class="ambient-icon"><ha-icon .icon=${'mdi:magnify'}></ha-icon></div>
          <div class="empty-state-title">${t('spotify.no_results_title')}</div>
          <div class="empty-state-sub">${t('spotify.no_results', { query: this._searchQuery })}</div>
        </div>
      `;
    }

    // The lib-more-link attaches to the last visible section. When in a single-tab view,
    // there's only one section, so it lands on it. In "all" view it attaches to the bottom one.
    const showLast = showShows ? 'shows' : showPlaylists ? 'playlists' : 'tracks';
    const moreLink = this._searchHasMore ? html`
      <button
        class="lib-more-link"
        ?disabled=${this._searchLoading}
        aria-label="${t('spotify.load_more')} (${this._searchQuery})"
        @click=${(e: Event) => { e.stopPropagation(); this._doSearch(true); }}
      >
        ${this._searchLoading
          ? html`<span>${t('spotify.loading')}</span>`
          : html`<span aria-hidden="true">${t('spotify.load_more')}</span>`}
      </button>
    ` : nothing;

    return html`
      ${showTracks ? html`
        <div class="lib-section">
          ${this._tab === 'all' ? html`
            <div class="lib-eyebrow lib-eyebrow-tracks">
              <span class="lib-eyebrow-dot"></span>
              <span>${t('spotify.tab_tracks')}</span>
              ${showLast === 'tracks' ? moreLink : nothing}
            </div>
          ` : nothing}
          ${tracks.map((item) => this._renderResultRow(item, 'track'))}
        </div>
      ` : nothing}

      ${showPlaylists ? html`
        <div class="lib-section">
          ${this._tab === 'all' ? html`
            <div class="lib-eyebrow lib-eyebrow-playlists">
              <span class="lib-eyebrow-dot"></span>
              <span>${t('spotify.tab_playlists')}</span>
              ${showLast === 'playlists' ? moreLink : nothing}
            </div>
          ` : nothing}
          ${playlists.map((item) => this._renderResultRow(item, 'playlist'))}
        </div>
      ` : nothing}

      ${showShows ? html`
        <div class="lib-section">
          ${this._tab === 'all' ? html`
            <div class="lib-eyebrow lib-eyebrow-podcasts">
              <span class="lib-eyebrow-dot"></span>
              <span>${t('spotify.tab_podcasts')}</span>
              ${showLast === 'shows' ? moreLink : nothing}
            </div>
          ` : nothing}
          ${shows.map((item) => this._renderResultRow({ ...item, type: 'show' }, 'show'))}
        </div>
      ` : nothing}

      ${this._tab !== 'all' && this._searchHasMore ? html`
        <div class="lib-section search-more-standalone">${moreLink}</div>
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

  private _renderDrilldown(): TemplateResult | typeof nothing {
    const dd = this._drilldown;
    if (!dd) return nothing;
    const typeLabel = dd.type === 'album' ? t('spotify.type_album') : t('spotify.type_playlist');
    const countLabel = dd.total > 0 ? t('spotify.tracks_count', { count: String(dd.total) }) : '';
    const meta = [dd.subtitle, typeLabel, countLabel].filter(Boolean).join(' · ');
    const hasMore = !dd.loading && dd.items.length < dd.total;
    return html`
      <div class="drilldown">
        <div class="drilldown-hero">
          <glass-icon-button
            class="drilldown-back"
            size="sm"
            .icon=${'mdi:arrow-left'}
            aria-label=${t('spotify.back')}
            @click=${this._goBack}
          ></glass-icon-button>
          <div class="drilldown-hero-art">
            ${dd.image
              ? html`<img src=${dd.image} alt="" loading="lazy" />`
              : html`<ha-icon .icon=${dd.type === 'album' ? 'mdi:album' : 'mdi:playlist-music'}></ha-icon>`}
          </div>
          <div class="drilldown-hero-info">
            <div class="drilldown-hero-title">${dd.title}</div>
            ${meta ? html`<div class="drilldown-hero-meta">${meta}</div>` : nothing}
            <button
              class="drilldown-play-cta"
              @click=${this._playFullDrilldown}
              ?disabled=${dd.items.length === 0}
              aria-label=${t('spotify.play_all')}
            >
              <ha-icon .icon=${'mdi:play'}></ha-icon>
              <span>${t('spotify.play_all')}</span>
            </button>
          </div>
        </div>

        <div class="lib-section drilldown-tracks">
          <div class="lib-eyebrow lib-eyebrow-playlists">
            <span class="lib-eyebrow-dot"></span>
            <span>${t('spotify.tab_tracks')}</span>
            ${hasMore ? html`
              <button
                class="lib-more-link"
                ?disabled=${dd.loading}
                aria-label="${t('spotify.load_more')} (${dd.items.length}/${dd.total})"
                @click=${(e: Event) => { e.stopPropagation(); this._loadMoreDrilldown(); }}
              >
                <span aria-hidden="true">${t('spotify.load_more')}</span>
                <span class="lib-more-count" aria-hidden="true">${dd.items.length} / ${dd.total}</span>
              </button>
            ` : nothing}
          </div>
          ${dd.items.map((item) => {
            const track = item.track ?? item;
            return this._renderResultRow(track, track.type ?? 'track');
          })}
          ${dd.loading ? html`<div class="loading-text">${t('spotify.loading')}</div>` : nothing}
          ${!dd.loading && dd.items.length === 0 ? html`
            <div class="empty-state">
              <ha-icon .icon=${'mdi:music-note-off'}></ha-icon>
              <div class="empty-state-text">${t('spotify.no_content')}</div>
            </div>
          ` : nothing}
        </div>
      </div>
    `;
  }

  // — Speaker picker render —

  private _renderSpeakerPicker(): TemplateResult | typeof nothing {
    const item = this._pickerItem;
    if (!item) return nothing;
    const img = getImage(item, 200);
    const artist = getArtistNames(item);
    const selectedCount = this._selectedSpeakers.size;
    const hasSelection = selectedCount > 0;

    let playLabel = t('spotify.choose_speaker');
    if (selectedCount === 1) {
      const single = this._speakers.find((s) => this._selectedSpeakers.has(s.entityId));
      playLabel = single ? t('spotify.play_on_named', { name: single.name }) : t('spotify.play');
    } else if (selectedCount > 1) {
      playLabel = t('spotify.play_on_count', { count: String(selectedCount) });
    }

    return html`
      <div class="picker-backdrop visible" role="presentation" @click=${(e: Event) => { if ((e.target as HTMLElement).classList.contains('picker-backdrop')) this._closePicker(); }}>
        <div class="glass speaker-picker" role="dialog" aria-modal="true" aria-labelledby="picker-track-title">
          <div class="picker-header">
            <div class="picker-eyebrow">
              <span class="picker-eyebrow-dot"></span>
              <span>${t('spotify.connect')}</span>
            </div>
            <button class="picker-close" aria-label="${t('common.close')}" @click=${this._closePicker}>
              <ha-icon .icon=${'mdi:close'}></ha-icon>
            </button>
          </div>

          <div class="picker-hero">
            <div class="picker-hero-art">
              ${img
                ? html`<img src=${img} alt="" />`
                : html`<ha-icon .icon=${typeIcon(item.type ?? 'track')}></ha-icon>`}
            </div>
            <div class="picker-hero-info">
              <div class="picker-hero-title" id="picker-track-title">${item.name}</div>
              ${artist ? html`<div class="picker-hero-artist">${artist}</div>` : nothing}
            </div>
          </div>

          <div class="picker-speakers" role="listbox" aria-multiselectable="true">
            ${this._speakers.map((sp) => this._renderSpeakerRow(sp))}
          </div>

          <div class="picker-play-bar">
            <button
              class="picker-play-btn primary"
              ?disabled=${!hasSelection}
              @click=${() => this._playOnSelectedSpeakers()}
              aria-label=${playLabel}
            >
              <ha-icon .icon=${'mdi:play'}></ha-icon>
              <span>${playLabel}</span>
            </button>
          </div>
        </div>
      </div>
    `;
  }

  private _renderSpeakerRow(sp: { entityId: string; name: string; state: string; mediaTitle: string | null; icon: string }): TemplateResult {
    const selected = this._selectedSpeakers.has(sp.entityId);
    const isPlaying = sp.state === 'playing';
    const isPaused = sp.state === 'paused';
    const stateLabel = isPlaying && sp.mediaTitle
      ? sp.mediaTitle
      : isPaused
        ? t('spotify.paused')
        : sp.state === 'off'
          ? t('spotify.speaker_off')
          : t('spotify.available');
    const stateClass = isPlaying ? 'playing' : isPaused ? 'paused' : sp.state === 'off' ? 'off' : 'idle';
    return html`
      <button
        class="picker-speaker ${selected ? 'selected' : ''} state-${stateClass}"
        role="option"
        aria-selected=${selected ? 'true' : 'false'}
        @click=${() => this._toggleSpeakerSelection(sp.entityId)}
      >
        <div class="picker-speaker-icon">
          <ha-icon .icon=${sp.icon}></ha-icon>
        </div>
        <div class="picker-speaker-meta">
          <div class="picker-speaker-name">${sp.name}</div>
          <div class="picker-speaker-status">
            ${isPlaying
              ? html`<span class="picker-state-eq" aria-hidden="true"><span></span><span></span><span></span></span>`
              : html`<span class="picker-state-dot" aria-hidden="true"></span>`}
            <span class="picker-state-label">${stateLabel}</span>
          </div>
        </div>
        <div class="picker-speaker-check" aria-hidden="true">
          <ha-icon .icon=${'mdi:check'}></ha-icon>
        </div>
      </button>
    `;
  }
}

try { customElements.define('glass-spotify-card', GlassSpotifyCard); } catch { /* scoped registry */ }
