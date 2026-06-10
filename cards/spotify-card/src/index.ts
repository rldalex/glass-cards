import { html, nothing, type CSSResult, type TemplateResult, type PropertyValues } from 'lit';
import { state } from 'lit/decorators.js';
import { BaseCard, BackendService, fireHaptic } from '@glass-cards/base-card';
import './editor';
import { glassTokens, hostMixin, glassMixin, bounceMixin, eqMixin } from '@glass-cards/ui-core';
import { t } from '@glass-cards/i18n';
import { bus } from '@glass-cards/event-bus';

// — Types —

import {
  LIB_SECTION_LABEL_KEY,
  getImage,
  getArtistNames,
  typeIcon,
  formatTime,
  typeBadgeKey,
  type SpotifyBackendConfig,
  type SpotifyItem,
  type ViewMode,
  type TabId,
  type LibraryCategory,
  type DrilldownState,
} from './spotify-utils';
import { spotifyCardStyles } from './styles';

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
  private _loadVersion = 0;
  private _radioQueueVersion = 0;
  private _debounceTimer = 0;
  private _progressTimer = 0;

  // — Styles —

  static styles: CSSResult[] = [glassTokens, hostMixin, glassMixin, bounceMixin, eqMixin, spotifyCardStyles];

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

  private _getPlaybackEntity(): {
    entityId: string;
    state: string;
    title: string | null;
    artist: string | null;
    art: string | null;
    position: number | null;
    duration: number | null;
    positionUpdatedAt: number | null;
  } | null {
    const entityId = this._getEntityId();
    if (!entityId) return null;
    const entity = this.hass?.states[entityId];
    if (!entity) return null;
    if (entity.state !== 'playing' && entity.state !== 'paused') return null;
    const updatedAtIso = entity.attributes.media_position_updated_at as string | undefined;
    const updatedAtMs = updatedAtIso ? Date.parse(updatedAtIso) : NaN;
    return {
      entityId,
      state: entity.state,
      title: (entity.attributes.media_title as string | undefined) ?? null,
      artist: (entity.attributes.media_artist as string | undefined) ?? null,
      art: (entity.attributes.entity_picture as string | undefined) ?? null,
      position: (entity.attributes.media_position as number | undefined) ?? null,
      duration: (entity.attributes.media_duration as number | undefined) ?? null,
      positionUpdatedAt: Number.isFinite(updatedAtMs) ? updatedAtMs : null,
    };
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
    if (this._progressTimer) { clearInterval(this._progressTimer); this._progressTimer = 0; }
    this._backend = undefined;
    this._configLoaded = false;
    // Invalidate in-flight loads so they cannot write after a quick remount.
    ++this._loadVersion;
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
      if (!this._configLoaded) {
        this._loadConfig();
      }
      this._syncProgressTimer();
    }
  }

  private _syncProgressTimer(): void {
    // L'intégration Spotify HA push media_position de façon ponctuelle (5-30s).
    // Pour que la barre de progression du np-bar tick visuellement, on lance
    // un setInterval(1s) qui force un re-render et fait avancer l'extrapolation
    // depuis media_position_updated_at. On arrête dès que rien n'est en lecture.
    const playback = this._getPlaybackEntity();
    const needsTimer =
      playback?.state === 'playing' &&
      playback.duration != null &&
      playback.duration > 0 &&
      playback.positionUpdatedAt != null;
    if (needsTimer && !this._progressTimer) {
      this._progressTimer = window.setInterval(() => this.requestUpdate(), 1000);
    } else if (!needsTimer && this._progressTimer) {
      clearInterval(this._progressTimer);
      this._progressTimer = 0;
    }
  }

  // — Config loading —

  private async _loadConfig(): Promise<void> {
    if (!this.hass || this._configLoaded) return;
    this._configLoaded = true;
    const version = ++this._loadVersion;
    try {
      if (!this._backend) this._backend = new BackendService(this.hass);
      const result = await this._backend.send<{
        spotify_card: SpotifyBackendConfig;
      }>('get_config');
      if (version !== this._loadVersion) return;
      if (result?.spotify_card) {
        this._spotifyConfig = result.spotify_card;
      }
      await this._checkSpotifyStatus();
      if (version !== this._loadVersion) return;
      if (this._spotifyConfigured) this._loadLibrary();
      this.requestUpdate();
    } catch {
      // Retry on the next hass tick.
      if (version === this._loadVersion) this._configLoaded = false;
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
    if (!this._backend || this._libraryLoading) return;
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
      // Bail out if the drilldown was closed or replaced by another one
      // while the request was in flight.
      if (!this._drilldown || this._drilldown.id !== id) return;
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
      if (this._drilldown && this._drilldown.id === id) this._drilldown = { ...this._drilldown, loading: false };
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

  private _renderNowPlayingBar(playback: {
    state: string;
    title: string | null;
    artist: string | null;
    art: string | null;
    position: number | null;
    duration: number | null;
    positionUpdatedAt: number | null;
  }): TemplateResult {
    const titleText = playback.title ?? t('spotify.tab_tracks');
    // Calcul de la position live : HA met à jour media_position de façon
    // ponctuelle ; pour un affichage à jour, on extrapole depuis
    // media_position_updated_at quand l'entité est en lecture.
    let livePos = playback.position;
    if (
      playback.state === 'playing' &&
      playback.position != null &&
      playback.positionUpdatedAt != null
    ) {
      const elapsed = (Date.now() - playback.positionUpdatedAt) / 1000;
      livePos = playback.position + elapsed;
      if (playback.duration != null) livePos = Math.min(livePos, playback.duration);
    }
    const progressPct =
      livePos != null && playback.duration != null && playback.duration > 0
        ? Math.max(0, Math.min(100, (livePos / playback.duration) * 100))
        : 0;
    const hasProgress = livePos != null && playback.duration != null && playback.duration > 0;
    return html`
      <div class="np-bar" role="region" aria-label=${t('spotify.now_playing_aria')}>
        <div class="np-art">
          ${playback.art
            ? html`<img src=${playback.art} alt="" loading="lazy" @error=${(e: Event) => { (e.target as HTMLImageElement).style.display = 'none'; }} />`
            : html`<ha-icon .icon=${'mdi:music-note'}></ha-icon>`}
        </div>
        <div class="np-meta">
          <div class="np-title">${titleText}</div>
          ${playback.artist ? html`<div class="np-artist">${playback.artist}</div>` : nothing}
          ${hasProgress
            ? html`
                <div class="np-progress" aria-hidden="true">
                  <div class="np-progress-track">
                    <div class="np-progress-fill" style=${`width:${progressPct}%`}></div>
                  </div>
                  <div class="np-progress-time">
                    <span>${formatTime(livePos ?? 0)}</span>
                    <span>${formatTime(playback.duration ?? 0)}</span>
                  </div>
                </div>
              `
            : nothing}
        </div>
        <glass-icon-button
          class="np-btn-search"
          size="sm"
          .icon=${'mdi:magnify'}
          aria-label=${t('spotify.search_placeholder')}
          @click=${(e: Event) => { e.stopPropagation(); this._foldOpen = true; this._focusSearchInput(); }}
        ></glass-icon-button>
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
            ? html`<img src=${img} alt="" loading="lazy" @error=${(e: Event) => { (e.target as HTMLImageElement).style.display = 'none'; }} />`
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
      <div class="result-row ${playing ? 'now-playing' : ''}">
        <button
          class="result-main"
          aria-label=${item.name}
          @click=${() => {
            if (type === 'playlist') this._openDrilldown('playlist', item.id, item.name, getImage(item, 300), item.owner?.display_name);
            else if (type === 'album') this._openDrilldown('album', item.id, item.name, getImage(item, 300), getArtistNames(item));
            else this._openPicker(item);
          }}
        >
          <div class="result-art ${isRound ? 'round' : ''}">
            ${img
              ? html`<img src=${img} alt="" loading="lazy" @error=${(e: Event) => { (e.target as HTMLImageElement).style.display = 'none'; }} />`
              : html`<ha-icon .icon=${typeIcon(type)}></ha-icon>`}
          </div>
          <div class="result-info">
            <div class="result-title">${item.name}</div>
            <div class="result-meta">
              <span class="result-type-badge">${t(typeBadgeKey(type) as Parameters<typeof t>[0])}</span>
              <span>${artist}</span>
            </div>
          </div>
        </button>
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
              ? html`<img src=${dd.image} alt="" loading="lazy" @error=${(e: Event) => { (e.target as HTMLImageElement).style.display = 'none'; }} />`
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
                ? html`<img src=${img} alt="" @error=${(e: Event) => { (e.target as HTMLImageElement).style.display = 'none'; }} />`
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
