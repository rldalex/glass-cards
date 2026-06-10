import { html, nothing, type PropertyValues, type TemplateResult } from 'lit';
import { property, state } from 'lit/decorators.js';
import {
  BaseCard,
  BackendService,
  getAreaEntities,
  isEntityVisibleNow,
  fireHaptic,
  type EntityScheduleMap,
  type LovelaceCardConfig,
  type HassEntity,
} from '@glass-cards/base-card';
import { glassTokens, hostMixin, glassMixin, marqueeMixin, bounceMixin, eqMixin } from '@glass-cards/ui-core';
import { t } from '@glass-cards/i18n';
import './editor';

import {
  F_PAUSE,
  F_SEEK,
  F_VOLUME_SET,
  F_VOLUME_MUTE,
  F_PREVIOUS,
  F_NEXT,
  F_SELECT_SOURCE,
  F_STOP,
  F_PLAY,
  F_SHUFFLE_SET,
  F_SELECT_SOUND_MODE,
  F_REPEAT_SET,
  F_GROUPING,
  getMediaInfo,
  isPlaying,
  isActive,
  formatTime,
  hasFeature,
  SOURCE_ICONS,
  type MediaPlayerInfo,
  type MediaBackendConfig,
} from './media-utils';
import { mediaCardStyles } from './styles';

export class GlassMediaCard extends BaseCard {
  static getConfigElement() {
    return document.createElement('glass-media-card-editor');
  }

  getCardSize() {
    return 4;
  }

  @property() areaId?: string;
  @state() private _foldOpen = false;
  @state() private _mediaConfig: MediaBackendConfig = {
    extra_entities: {},
    hidden_entities: [],
    show_header: true,
  };
  @state() private _configLoaded = false;
  @state() private _roomIndex = 0;
  private _roomEntityId = '';
  private _prevPlayingSet = '';
  @state() private _swipeClass = '';
  @state() private _foldTab: 'controls' | 'queue' = 'controls';
  @state() private _queueData: Array<Record<string, unknown>> = [];
  @state() private _radioTracks: Array<{ id: string; name: string; uri: string; artist?: string }> = [];

  private _backend?: BackendService;
  private _loadVersion = 0;
  private _queueVersion = 0;
  private _lastArtworkUrl = '';
  private _samplingCanvas?: HTMLCanvasElement;
  private _samplingCtx?: CanvasRenderingContext2D | null;
  private _schedules: EntityScheduleMap | null = null;
  private _schedulesLoaded = false;
  private _playersCache: MediaPlayerInfo[] | null = null;
  private _playersCacheKey = '';
  private _volumeThrottles = new Map<string, number>();
  /** Pending volume drags (entityId -> 0-100); cleared once HA confirms. */
  private _dragVolumes = new Map<string, number>();
  private _progressTimer = 0;
  private _swipeAnimating = false;
  private _swipeAnimTimer = 0;
  private _queueRefreshTimer = 0;
  private _prevMediaTitle = '';
  private _lastMaster: MediaPlayerInfo | null = null;
  private _lastMasterStaleTimer = 0;

  setConfig(config: LovelaceCardConfig): void {
    this._config = config;
  }

  protected shouldUpdate(changedProps: PropertyValues): boolean {
    if (!super.shouldUpdate(changedProps)) return false;
    // During swipe animation, skip hass-only updates to avoid unnecessary re-renders
    if (this._swipeAnimating && changedProps.size === 1 && changedProps.has('hass')) return false;
    return true;
  }

  connectedCallback(): void {
    super.connectedCallback();
    this._listen('media-config-changed', () => {
      this._playersCache = null;
      this._configLoaded = false;
      this._loadConfig();
    });
    this._listen('room-config-changed', () => {
      this._playersCache = null;
    });
    this._listen('schedule-changed', () => {
      this._schedulesLoaded = false;
      this._loadSchedules();
    });
    this._listen('radio-queue-started', () => { this._radioTracks = []; });
    this._listen('radio-queue-track-added', (ev) => {
      this._radioTracks = [...this._radioTracks, ev.track];
    });
    this._listen('radio-queue-complete', () => { if (this._foldOpen) this._loadQueue(); });
    this._listen('radio-queue-error', (ev) => {
      console.warn('Radio queue error:', ev.message);
    });
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._backend = undefined;
    this._volumeThrottles.clear();
    this._dragVolumes.clear();
    if (this._progressTimer) { clearInterval(this._progressTimer); this._progressTimer = 0; }
    if (this._swipeAnimTimer) { clearTimeout(this._swipeAnimTimer); this._swipeAnimTimer = 0; }
    if (this._queueRefreshTimer) { clearTimeout(this._queueRefreshTimer); this._queueRefreshTimer = 0; }
    if (this._lastMasterStaleTimer) { clearTimeout(this._lastMasterStaleTimer); this._lastMasterStaleTimer = 0; }
    this._lastMaster = null;
    ++this._queueVersion;
    this._swipeAnimating = false;
    this._swipeClass = '';
    this._prevPlayingSet = '';
    this._configLoaded = false;
    this._schedulesLoaded = false;
    this._lastArtworkUrl = '';
    this._samplingCanvas = undefined;
    this._samplingCtx = undefined;
    delete this.dataset.bgLight;
    this.style.removeProperty('--c-accent-dynamic');
    this._unjoinUnsub?.();
    this._unjoinUnsub = undefined;
  }

  protected updated(changedProps: PropertyValues): void {
    super.updated(changedProps);

    if (changedProps.has('areaId')) {
      this._foldOpen = false;
      this._foldTab = 'controls';
      this._queueData = [];
      this._prevMediaTitle = '';
      this._playersCache = null;
      this._playersCacheKey = '';
      this._roomIndex = 0;
    }
    if (changedProps.has('hass') && this.hass) {
      // Detect WS reconnect (hass.connection changes)
      if (this._backend && this._backend.connection !== this.hass.connection) {
        this._backend = undefined;
        this._configLoaded = false;
        this._schedulesLoaded = false;
      }
      // Invalidate players cache when entity registry changes
      const oldHass = changedProps.get('hass') as { entities?: unknown } | undefined;
      if (oldHass && oldHass.entities !== this.hass.entities) {
        this._playersCache = null;
        this._playersCacheKey = '';
      }
    }
    if (this.hass && !this._configLoaded) this._loadConfig();
    if (this.hass && !this._schedulesLoaded) this._loadSchedules();
    // Clear stale volume drags once HA state catches up (tolerance ±2)
    if (changedProps.has('hass') && this.hass && this._dragVolumes.size > 0) {
      let changed = false;
      for (const [entityId, drag] of this._dragVolumes) {
        const entity = this.hass.states[entityId];
        if (!entity) continue;
        const haVol = Math.round(((entity.attributes.volume_level as number) ?? 0) * 100);
        if (Math.abs(haVol - drag) <= 2) {
          this._dragVolumes.delete(entityId);
          changed = true;
        }
      }
      if (changed) this.requestUpdate();
    }
    // Auto-switch to newly playing room in dashboard mode
    if (changedProps.has('hass') && this.isDashboard && this.hass) {
      const playingNow = Object.entries(this.hass.states)
        .filter(([id, e]) => id.startsWith('media_player.') && e.state === 'playing')
        .map(([id]) => id)
        .sort()
        .join(',');
      if (playingNow !== this._prevPlayingSet) {
        const prev = new Set(this._prevPlayingSet.split(',').filter(Boolean));
        const curr = playingNow.split(',').filter(Boolean);
        const newlyPlaying = curr.filter((id) => !prev.has(id));
        this._prevPlayingSet = playingNow;
        if (newlyPlaying.length > 0) {
          const rooms = this._getActiveRooms();
          const idx = rooms.findIndex((r) =>
            newlyPlaying.includes(r.entityId) ||
            newlyPlaying.some((id) => r.groupMembers.includes(id)),
          );
          if (idx >= 0 && idx !== this._roomIndex) {
            this._roomIndex = idx;
            this._roomEntityId = rooms[idx].entityId;
          }
        }
      }
    }
    // Refresh queue if room changed while queue tab is open
    if (changedProps.has('_roomIndex') && this._foldOpen && this._foldTab === 'queue') {
      this._queueData = [];
      this._prevMediaTitle = '';
      this._loadQueue();
    }
    // Refresh queue when track changes or player goes idle
    if (changedProps.has('hass') && this.hass && this._foldOpen && this._foldTab === 'queue') {
      const master = this._getCurrentMaster();
      const title = master ? (this.hass.states[master.entityId]?.attributes?.media_title as string ?? '') : '';
      if (title !== this._prevMediaTitle) {
        this._prevMediaTitle = title;
        // queue_position attribute updates with hass state, view auto-adjusts
        // Confirm with real Sonos queue data after propagation delay
        if (this._queueRefreshTimer) clearTimeout(this._queueRefreshTimer);
        this._queueRefreshTimer = window.setTimeout(() => this._loadQueue(), 1000);
      }
    }
    // Start/stop progress timer based on playback state (only on relevant changes)
    if (changedProps.has('hass') || changedProps.has('_roomIndex')) {
      this._syncProgressTimer();
    }
    // Check artwork luminance on every render (cheap — early-returns if unchanged)
    this._updateBgLightAttribute();
  }

  /** Analyze artwork luminance and expose data-bg-light on host for navbar IntersectionObserver */
  private _updateBgLightAttribute(): void {
    const img = this.shadowRoot?.querySelector('img.dash-art-bg') as HTMLImageElement | null;
    if (!img) {
      this._lastArtworkUrl = '';
      delete this.dataset.bgLight;
      this.style.removeProperty('--c-accent-dynamic');
      return;
    }
    if (!img.complete || img.naturalWidth === 0) {
      // Image still loading — re-run analysis once it finishes
      img.addEventListener('load', () => this._updateBgLightAttribute(), { once: true });
      return;
    }
    // Only re-analyze when artwork URL changes
    if (img.src === this._lastArtworkUrl) return;
    this._lastArtworkUrl = img.src;

    const size = 16;
    if (!this._samplingCanvas) {
      this._samplingCanvas = document.createElement('canvas');
      this._samplingCanvas.width = size;
      this._samplingCanvas.height = size;
      this._samplingCtx = this._samplingCanvas.getContext('2d', { willReadFrequently: true });
    }
    const ctx = this._samplingCtx;
    if (!ctx) return;
    try {
      ctx.clearRect(0, 0, size, size);
      ctx.drawImage(img, 0, 0, size, size);
      const data = ctx.getImageData(0, 0, size, size).data;
      let totalLum = 0;
      const pixelCount = size * size;
      for (let i = 0; i < data.length; i += 4) {
        totalLum += 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
      }
      const avgLuminance = totalLum / pixelCount / 255;
      if (avgLuminance > 0.55) {
        this.dataset.bgLight = 'true';
      } else {
        delete this.dataset.bgLight;
      }

      // Extract dominant saturated color for accent
      let rSum = 0, gSum = 0, bSum = 0, satCount = 0;
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i], g = data[i + 1], b = data[i + 2];
        const mx = Math.max(r, g, b) / 255, mn = Math.min(r, g, b) / 255;
        const l = (mx + mn) / 2;
        const sat = mx === mn ? 0 : l > 0.5 ? (mx - mn) / (2 - mx - mn) : (mx - mn) / (mx + mn);
        if (sat < 0.15) continue;
        rSum += r * sat; gSum += g * sat; bSum += b * sat;
        satCount += sat;
      }
      if (satCount > 0) {
        const accent = `rgb(${Math.round(rSum / satCount)}, ${Math.round(gSum / satCount)}, ${Math.round(bSum / satCount)})`;
        this.style.setProperty('--c-accent-dynamic', accent);
      } else {
        this.style.removeProperty('--c-accent-dynamic');
      }
    } catch {
      // CORS tainted canvas — cannot read pixels, remove attribute
      delete this.dataset.bgLight;
      this.style.removeProperty('--c-accent-dynamic');
    }
  }

  private _syncProgressTimer(): void {
    const players = this.hass ? this._getPlayers() : [];
    const master = this._findMaster(players);
    const needsTimer = master != null && isPlaying(master.state) && master.duration > 0;

    if (needsTimer && !this._progressTimer) {
      this._progressTimer = window.setInterval(() => this.requestUpdate(), 1000);
    } else if (!needsTimer && this._progressTimer) {
      clearInterval(this._progressTimer);
      this._progressTimer = 0;
    }
  }

  protected getTrackedEntityIds(): string[] {
    if (this.isDashboard && this.hass) {
      // Track all media_player entities so we detect state transitions (playing→idle)
      return Object.keys(this.hass.states).filter((id) => id.startsWith('media_player.'));
    }
    return this._getPlayers().map((p) => p.entityId);
  }

  private get isDashboard(): boolean {
    return !this.areaId;
  }

  private async _loadConfig(): Promise<void> {
    if (!this.hass || this._configLoaded) return;
    this._configLoaded = true;
    try {
      if (!this._backend) this._backend = new BackendService(this.hass);
      const result = await this._backend.send<{ media_card: MediaBackendConfig }>('get_config');
      if (result?.media_card) {
        this._mediaConfig = {
          extra_entities: result.media_card.extra_entities ?? {},
          hidden_entities: result.media_card.hidden_entities ?? [],
          show_header: result.media_card.show_header ?? true,
        };
      }
      this.requestUpdate();
    } catch {
      // Retry on the next hass tick.
      this._configLoaded = false;
    }
  }

  private async _loadSchedules(): Promise<void> {
    if (!this.hass || this._schedulesLoaded) return;
    this._schedulesLoaded = true;
    try {
      if (!this._backend) this._backend = new BackendService(this.hass);
      const result = await this._backend.send<EntityScheduleMap>('get_schedules');
      this._schedules = result;
      this._playersCache = null;
      this._playersCacheKey = '';
      this.requestUpdate();
    } catch {
      this._schedulesLoaded = false;
    }
  }

  private _getPlayers(): MediaPlayerInfo[] {
    if (!this.hass) return [];

    if (this.isDashboard) {
      const hiddenSet = new Set(this._mediaConfig.hidden_entities);
      return Object.values(this.hass.states)
        .filter((e) => e.entity_id.startsWith('media_player.') && isActive(e.state) && !hiddenSet.has(e.entity_id) && isEntityVisibleNow(e.entity_id, this._schedules))
        .map(getMediaInfo)
        .sort((a, b) => {
          const priority = (s: string) => (s === 'playing' ? 0 : s === 'buffering' ? 1 : 2);
          const pd = priority(a.state) - priority(b.state);
          if (pd !== 0) return pd;
          // Within same priority, most recently updated first
          return b.lastUpdated - a.lastUpdated;
        });
    }

    const areaId = this.areaId ?? '';
    const extraIds = this._mediaConfig.extra_entities[areaId] || [];
    const cacheKey = `${areaId}:${JSON.stringify(extraIds)}`;
    if (this._playersCache && this._playersCacheKey === cacheKey) {
      return this._playersCache.map((p) => {
        const entity = this.hass?.states[p.entityId];
        return entity ? getMediaInfo(entity) : p;
      });
    }

    const entities = this.hass.entities ? getAreaEntities(areaId, this.hass.entities, this.hass.devices) : [];
    const areaPlayerIds = entities
      .filter((e) => e.entity_id.startsWith('media_player.'))
      .map((e) => e.entity_id);

    const allIds = [...new Set([...areaPlayerIds, ...extraIds])]
      .filter((id) => isEntityVisibleNow(id, this._schedules));
    const players = allIds
      .map((id) => this.hass?.states[id])
      .filter((e): e is HassEntity => !!e)
      .map(getMediaInfo);

    this._playersCache = players;
    this._playersCacheKey = cacheKey;
    return players;
  }

  private _findMaster(players: MediaPlayerInfo[]): MediaPlayerInfo | null {
    return players.find((p) => isPlaying(p.state)) || players.find((p) => isActive(p.state)) || null;
  }

  /** Return the master for the currently visible room (dashboard swipe) or the room-mode master. */
  private _getCurrentMaster(): MediaPlayerInfo | null {
    if (this.isDashboard) {
      const rooms = this._getActiveRooms();
      if (!rooms.length) return this._lastMaster ?? null;
      const idx = Math.min(this._roomIndex, rooms.length - 1);
      return rooms[idx];
    }
    return this._findMaster(this._getPlayers());
  }

  /**
   * Get active rooms for dashboard swipe view.
   * Each room = a unique coordinator that is currently playing.
   * Grouped speakers count as one room (the coordinator).
   */
  private _getActiveRooms(): MediaPlayerInfo[] {
    if (!this.hass) return [];
    const hiddenSet = new Set(this._mediaConfig.hidden_entities);
    const allPlaying = Object.values(this.hass.states)
      .filter((e) => e.entity_id.startsWith('media_player.') && isActive(e.state) && !hiddenSet.has(e.entity_id) && isEntityVisibleNow(e.entity_id, this._schedules))
      .map(getMediaInfo);

    // Sort: coordinators first, then by most recently updated
    allPlaying.sort((a, b) => {
      const aCoord = a.groupMembers.length > 0 && a.groupMembers[0] === a.entityId ? 0 : 1;
      const bCoord = b.groupMembers.length > 0 && b.groupMembers[0] === b.entityId ? 0 : 1;
      const cd = aCoord - bCoord;
      if (cd !== 0) return cd;
      return b.lastUpdated - a.lastUpdated;
    });

    // Deduplicate: if a speaker is a group member, only keep the coordinator
    const seen = new Set<string>();
    const rooms: MediaPlayerInfo[] = [];
    for (const p of allPlaying) {
      if (seen.has(p.entityId)) continue;
      for (const m of p.groupMembers) seen.add(m);
      seen.add(p.entityId);
      rooms.push(p);
    }
    return rooms;
  }

  /* ── Actions ── */

  private _togglePlayPause(player: MediaPlayerInfo): void {
    fireHaptic(this, 'light');
    if (isPlaying(player.state)) {
      if (hasFeature(player, F_PAUSE)) {
        this._safeCallService('media_player', 'media_pause', {}, { entity_id: player.entityId });
      } else if (hasFeature(player, F_STOP)) {
        this._safeCallService('media_player', 'media_stop', {}, { entity_id: player.entityId });
      }
    } else {
      if (hasFeature(player, F_PLAY)) {
        this._safeCallService('media_player', 'media_play', {}, { entity_id: player.entityId });
      }
    }
  }

  private _previous(entityId: string): void {
    fireHaptic(this, 'light');
    this._safeCallService('media_player', 'media_previous_track', {}, { entity_id: entityId });
  }

  private _next(entityId: string): void {
    fireHaptic(this, 'light');
    this._safeCallService('media_player', 'media_next_track', {}, { entity_id: entityId });
    // Schedule queue refresh if queue tab is open
    if (this._foldOpen && this._foldTab === 'queue') {
      if (this._queueRefreshTimer) clearTimeout(this._queueRefreshTimer);
      this._queueRefreshTimer = window.setTimeout(() => this._loadQueue(), 1000);
    }
  }

  private _toggleMute(player: MediaPlayerInfo): void {
    this._safeCallService('media_player', 'volume_mute', { is_volume_muted: !player.isMuted }, { entity_id: player.entityId });
  }

  private _setVolume(entityId: string, volume: number): void {
    const now = Date.now();
    const last = this._volumeThrottles.get(entityId) || 0;
    if (now - last < 100) return;
    this._volumeThrottles.set(entityId, now);
    this._safeCallService('media_player', 'volume_set', { volume_level: volume }, { entity_id: entityId });
  }

  private _toggleShuffle(player: MediaPlayerInfo): void {
    this._safeCallService('media_player', 'shuffle_set', { shuffle: !player.shuffle }, { entity_id: player.entityId });
  }

  private _cycleRepeat(player: MediaPlayerInfo): void {
    const next = player.repeat === 'off' ? 'all' : player.repeat === 'all' ? 'one' : 'off';
    this._safeCallService('media_player', 'repeat_set', { repeat: next }, { entity_id: player.entityId });
  }

  private _selectSource(entityId: string, source: string): void {
    this._safeCallService('media_player', 'select_source', { source }, { entity_id: entityId });
  }

  private _selectSoundMode(entityId: string, mode: string): void {
    this._safeCallService('media_player', 'select_sound_mode', { sound_mode: mode }, { entity_id: entityId });
  }

  private _seekProgress(entityId: string, duration: number, percent: number): void {
    const position = (percent / 100) * duration;
    this._safeCallService('media_player', 'media_seek', { seek_position: position }, { entity_id: entityId });
  }

  private _joinGroup(coordinatorId: string, memberId: string): void {
    this._safeCallService('media_player', 'join', { group_members: [memberId] }, { entity_id: coordinatorId });
  }

  private _unjoinGroup(memberId: string): void {
    this._safeCallService('media_player', 'unjoin', {}, { entity_id: memberId });
  }

  private _unjoinUnsub?: () => void;

  /** Wait for a speaker to leave its group via state_changed event, with timeout fallback. */
  private async _waitForUnjoin(entityId: string, timeout = 3000): Promise<boolean> {
    // Cancel any previous subscription to avoid orphan listeners
    this._unjoinUnsub?.();
    this._unjoinUnsub = undefined;
    const version = ++this._loadVersion;
    return new Promise<boolean>((resolve) => {
      let resolved = false;
      const cleanup = () => {
        if (resolved) return;
        resolved = true;
        this._unjoinUnsub?.();
        this._unjoinUnsub = undefined;
        clearTimeout(timer);
      };

      if (!this.hass) { resolve(false); return; }
      this.hass.connection.subscribeEvents((ev: { data: { entity_id?: string; new_state?: { attributes?: { group_members?: string[] } } } }) => {
        if (version !== this._loadVersion) { cleanup(); return; }
        if (ev.data.entity_id === entityId) {
          const members = ev.data.new_state?.attributes?.group_members;
          if (!members || members.length <= 1) {
            cleanup();
            resolve(true);
          }
        }
      }, 'state_changed').then((unsub) => {
        if (resolved) { unsub(); return; }
        this._unjoinUnsub = unsub;
      });

      const timer = setTimeout(() => { cleanup(); resolve(false); }, timeout);
    });
  }

  /** Unjoin speaker from any existing group first, then join to our coordinator */
  private async _smartJoin(coordinatorId: string, speakerId: string): Promise<void> {
    if (!this.hass) return;
    const entity = this.hass.states[speakerId];
    if (!entity) return;
    const members = entity.attributes.group_members as string[] | undefined;
    // If speaker is in an existing group (not alone), unjoin first
    if (members && members.length > 1) {
      this._unjoinGroup(speakerId);
      // Wait for state_changed confirming unjoin, with timeout fallback
      await this._waitForUnjoin(speakerId);
      if (!this.isConnected || !this.hass) return;
    }
    this._joinGroup(coordinatorId, speakerId);
  }

  /* ── Flash overlay ── */

  /* ── Animated room switch ── */

  private _swipeToRoom(direction: 'left' | 'right', newIndex: number): void {
    if (this._swipeAnimating) return;
    this._swipeAnimating = true;
    this._foldOpen = false;

    // Phase 1: exit animation
    this._swipeClass = direction === 'left' ? 'swipe-exit-left' : 'swipe-exit-right';

    this._swipeAnimTimer = window.setTimeout(() => {
      // Switch room (triggers re-render with new content)
      this._roomIndex = newIndex;
      this._roomEntityId = '';
      // Phase 2: enter animation
      this._swipeClass = direction === 'left' ? 'swipe-enter-right' : 'swipe-enter-left';

      this._swipeAnimTimer = window.setTimeout(() => {
        this._swipeClass = '';
        this._swipeAnimating = false;
      }, 280);
    }, 220);
  }

  /* ── Progress bar seek ── */

  private _onProgressPointerDown(e: PointerEvent, entityId: string, duration: number): void {
    e.stopPropagation();
    const bar = e.currentTarget as HTMLElement;
    bar.setPointerCapture(e.pointerId);
    const fill = bar.querySelector('.dash-progress-fill') as HTMLElement;
    const thumb = bar.querySelector('.dash-progress-thumb') as HTMLElement;

    const update = (evt: PointerEvent) => {
      const r = bar.getBoundingClientRect();
      const pct = Math.max(0, Math.min(100, ((evt.clientX - r.left) / r.width) * 100));
      fill.style.width = pct + '%';
      fill.style.transition = 'none';
      thumb.style.left = pct + '%';
      thumb.style.opacity = '1';
    };
    update(e);

    const onMove = (evt: PointerEvent) => update(evt);
    const cleanup = () => {
      bar.removeEventListener('pointermove', onMove);
      bar.removeEventListener('pointerup', onUp);
      bar.removeEventListener('pointercancel', cleanup);
      bar.removeEventListener('lostpointercapture', cleanup);
      fill.style.transition = '';
      thumb.style.opacity = '';
    };
    const onUp = (evt: PointerEvent) => {
      cleanup();
      const r = bar.getBoundingClientRect();
      const pct = Math.max(0, Math.min(100, ((evt.clientX - r.left) / r.width) * 100));
      this._seekProgress(entityId, duration, pct);
    };

    bar.addEventListener('pointermove', onMove);
    bar.addEventListener('pointerup', onUp);
    bar.addEventListener('pointercancel', cleanup);
    bar.addEventListener('lostpointercapture', cleanup);
  }

  /* ── Multiroom volume slider (custom: name + value overlay on the track) ── */

  /** Keyboard a11y on the custom slider: arrows ±5, Home/End jump to 0/100. */
  private _onVolKey(e: KeyboardEvent, entityId: string, currentVol: number): void {
    let next: number;
    switch (e.key) {
      case 'ArrowLeft':
      case 'ArrowDown': next = Math.max(0, currentVol - 5); break;
      case 'ArrowRight':
      case 'ArrowUp': next = Math.min(100, currentVol + 5); break;
      case 'PageDown': next = Math.max(0, currentVol - 10); break;
      case 'PageUp': next = Math.min(100, currentVol + 10); break;
      case 'Home': next = 0; break;
      case 'End': next = 100; break;
      default: return;
    }
    e.preventDefault();
    this._setVolume(entityId, next / 100);
  }

  private _onMrVolPointerDown(e: PointerEvent, entityId: string): void {
    e.stopPropagation();
    const bar = e.currentTarget as HTMLElement;
    bar.setPointerCapture(e.pointerId);
    const fill = bar.querySelector('.speaker-vol-fill') as HTMLElement;
    const val = bar.querySelector('.speaker-vol-val') as HTMLElement;

    let lastPct = 0;
    const update = (evt: PointerEvent) => {
      const r = bar.getBoundingClientRect();
      const pct = Math.max(0, Math.min(100, ((evt.clientX - r.left) / r.width) * 100));
      lastPct = pct;
      // Imperative feedback for smooth dragging; _dragVolumes keeps Lit
      // re-renders (hass ticks) from snapping the bar back to the HA value.
      fill.style.width = pct + '%';
      if (val) val.textContent = Math.round(pct) + '%';
      this._dragVolumes.set(entityId, Math.round(pct));
      this._setVolume(entityId, pct / 100);
    };
    update(e);

    const onMove = (evt: PointerEvent) => update(evt);
    const cleanup = () => {
      fireHaptic(this, 'light');
      // Send the final value immediately (the leading throttle may have
      // dropped it); keep it as drag state until HA confirms (stale-clear
      // in updated()).
      this._dragVolumes.set(entityId, Math.round(lastPct));
      this._volumeThrottles.delete(entityId);
      this._setVolume(entityId, lastPct / 100);
      bar.removeEventListener('pointermove', onMove);
      bar.removeEventListener('pointerup', cleanup);
      bar.removeEventListener('pointercancel', cleanup);
      bar.removeEventListener('lostpointercapture', cleanup);
    };

    bar.addEventListener('pointermove', onMove);
    bar.addEventListener('pointerup', cleanup);
    bar.addEventListener('pointercancel', cleanup);
    bar.addEventListener('lostpointercapture', cleanup);
  }

  /* ── Compute elapsed (interpolate from position_updated_at) ── */

  private _getElapsed(player: MediaPlayerInfo): number {
    if (!isPlaying(player.state) || player.positionUpdatedAt === 0) return player.elapsed;
    const now = Date.now() / 1000;
    const delta = now - player.positionUpdatedAt;
    return Math.min(player.elapsed + delta, player.duration);
  }

  private _getProgress(player: MediaPlayerInfo): number {
    if (player.duration <= 0) return 0;
    return Math.min(100, (this._getElapsed(player) / player.duration) * 100);
  }

  /* ── Render: Hero card ── */

  private _renderHero(master: MediaPlayerInfo, roomCount = 1): TemplateResult {
    const playing = isPlaying(master.state);
    const progress = this._getProgress(master);
    const elapsed = this._getElapsed(master);

    // Compute coordinator and group info
    const allGroupable = this._getGroupablePlayers();
    const coordinator = this._findGroupCoordinator(master, allGroupable);
    const groupMembers = coordinator?.groupMembers || [];
    const groupCount = groupMembers.length;

    const heroGesture = this._bindGesture({
      onLongPress: () => {
        this._foldOpen = !this._foldOpen;
        if (this._foldOpen) this._loadQueue();
        if (this._foldOpen) {
          setTimeout(() => {
            const fold = this.renderRoot?.querySelector('.ctrl-fold') as HTMLElement | null;
            fold?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }, 350);
        }
      },
      onSwipe: (dir) => {
        if (this.isDashboard && roomCount > 1) {
          if (dir === 'left') this._swipeToRoom('left', (this._roomIndex + 1) % roomCount);
          else this._swipeToRoom('right', (this._roomIndex - 1 + roomCount) % roomCount);
        }
      },
      exclude: 'button, glass-transport-button, glass-chip, glass-tabs, glass-icon-button',
    });

    return html`
      <div class="dash-wrap ${this._foldOpen ? 'fold-open' : ''}">
        <div class="dash-hero ${this._swipeClass}"
          @pointerdown=${heroGesture.pointerdown}
          @pointerup=${heroGesture.pointerup}
          @pointermove=${heroGesture.pointermove}
          @pointercancel=${heroGesture.pointercancel}
          @contextmenu=${heroGesture.contextmenu}
        >
          <!-- Full-bleed artwork background -->
          ${master.albumArt ? html`
            <img class="dash-art-bg" src=${master.albumArt} alt="" loading="lazy"
              @error=${(e: Event) => { (e.target as HTMLImageElement).style.display = 'none'; const deco = (e.target as HTMLElement).parentElement?.querySelector('.dash-deco') as HTMLElement; if (deco) deco.style.display = ''; const ph = (e.target as HTMLElement).parentElement?.querySelector('.dash-placeholder') as HTMLElement; if (ph) ph.style.display = ''; }} />
          ` : nothing}
          <div class="dash-gradient"></div>
          <div class="dash-deco" style="${master.albumArt ? 'display:none' : ''}"></div>
          <div class="dash-placeholder" style="${master.albumArt ? 'display:none' : ''}">
            <ha-icon .icon=${master.source?.toLowerCase().includes('tv') || master.icon?.includes('tv') || master.icon?.includes('television')
              ? 'mdi:television-classic'
              : master.appName?.toLowerCase().includes('spotify')
                ? 'mdi:spotify'
                : master.state === 'playing' || master.state === 'paused'
                  ? 'mdi:music-note'
                  : master.icon || 'mdi:speaker'}></ha-icon>
          </div>

          <div class="dash-content">
            <!-- Top bar: speaker badge + group badge (glass pills) -->
            <div class="dash-top">
              <div class="dash-speaker glass-pill">
                <ha-icon .icon=${master.icon || 'mdi:speaker'}></ha-icon>
                <span>${master.name}</span>
                ${playing ? html`
                  <div class="dash-eq playing">
                    <div class="dash-eq-bar"></div>
                    <div class="dash-eq-bar"></div>
                    <div class="dash-eq-bar"></div>
                    <div class="dash-eq-bar"></div>
                  </div>
                ` : nothing}
              </div>
              ${groupCount > 1 ? html`
                <div class="dash-group-badge glass-pill">
                  <ha-icon .icon=${'mdi:speaker-multiple'}></ha-icon>
                  <span>${t('media.speakers_count', { count: groupCount })}</span>
                </div>
              ` : nothing}
            </div>

            <!-- Spacer -->
            <div class="dash-spacer"></div>

            <!-- Bottom glass panel: track info + progress + transport -->
            <div class="dash-info-panel glass-panel">
              <button
                class="dash-track"
                aria-expanded=${this._foldOpen ? 'true' : 'false'}
                aria-label=${t('media.fold_toggle_aria')}
                @click=${(e: MouseEvent) => {
                  // detail === 0 → synthetic click from Enter/Space; pointer
                  // interactions are handled by the hero gesture (long-press).
                  if (e.detail !== 0) return;
                  this._foldOpen = !this._foldOpen;
                  if (this._foldOpen) this._loadQueue();
                }}
              >
                ${master.title ? html`
                  <div class="dash-track-title">${master.title}</div>
                ` : nothing}
                ${master.artist ? html`
                  <div class="dash-track-artist">${master.artist}</div>
                ` : nothing}
              </button>

              <!-- Progress bar -->
              ${master.duration > 0 && hasFeature(master, F_SEEK) ? html`
                <div class="dash-progress-wrap">
                  <div class="dash-time-row">
                    <span class="dash-track-time">${formatTime(elapsed)}</span>
                    <span class="dash-track-time">${formatTime(master.duration)}</span>
                  </div>
                  <div class="dash-progress"
                    role="slider"
                    tabindex="0"
                    aria-label=${t('media.seek_aria')}
                    aria-valuenow=${Math.round(progress)}
                    aria-valuemin="0"
                    aria-valuemax="100"
                    @pointerdown=${(e: PointerEvent) => this._onProgressPointerDown(e, master.entityId, master.duration)}
                    @keydown=${(e: KeyboardEvent) => {
                      let pct: number;
                      switch (e.key) {
                        case 'ArrowLeft': case 'ArrowDown': pct = Math.max(0, progress - 5); break;
                        case 'ArrowRight': case 'ArrowUp': pct = Math.min(100, progress + 5); break;
                        case 'PageDown': pct = Math.max(0, progress - 10); break;
                        case 'PageUp': pct = Math.min(100, progress + 10); break;
                        case 'Home': pct = 0; break;
                        case 'End': pct = 100; break;
                        default: return;
                      }
                      e.preventDefault();
                      this._seekProgress(master.entityId, master.duration, pct);
                    }}
                  >
                    <div class="dash-progress-fill" style="width:${progress}%"></div>
                    <div class="dash-progress-thumb" style="left:${progress}%"></div>
                  </div>
                </div>
              ` : master.duration > 0 ? html`
                <div class="dash-progress-wrap">
                  <div class="dash-time-row">
                    <span class="dash-track-time">${formatTime(elapsed)}</span>
                    <span class="dash-track-time">${formatTime(master.duration)}</span>
                  </div>
                  <div class="dash-progress" style="pointer-events:none">
                    <div class="dash-progress-fill" style="width:${progress}%"></div>
                  </div>
                </div>
              ` : nothing}

              <!-- Transport -->
              <div class="dash-transport">
                ${hasFeature(master, F_SHUFFLE_SET) ? html`
                  <glass-transport-button
                    .icon=${'mdi:shuffle-variant'}
                    ?active=${master.shuffle}
                    active-color="accent"
                    aria-label=${t('media.shuffle_aria')}
                    @click=${(e: Event) => { e.stopPropagation(); this._toggleShuffle(master); }}
                  ></glass-transport-button>
                ` : nothing}

                ${hasFeature(master, F_PREVIOUS) ? html`
                  <glass-transport-button
                    .icon=${'mdi:skip-previous'}
                    aria-label=${t('media.prev_aria', { name: master.name })}
                    @click=${(e: Event) => { e.stopPropagation(); this._previous(master.entityId); }}
                  ></glass-transport-button>
                ` : nothing}

                <glass-transport-button
                  variant="main"
                  .icon=${playing ? 'mdi:pause' : 'mdi:play'}
                  aria-label=${playing ? t('media.pause_aria', { name: master.name }) : t('media.play_aria', { name: master.name })}
                  @click=${(e: Event) => { e.stopPropagation(); this._togglePlayPause(master); }}
                ></glass-transport-button>

                ${hasFeature(master, F_NEXT) ? html`
                  <glass-transport-button
                    .icon=${'mdi:skip-next'}
                    aria-label=${t('media.next_aria', { name: master.name })}
                    @click=${(e: Event) => { e.stopPropagation(); this._next(master.entityId); }}
                  ></glass-transport-button>
                ` : nothing}

                ${hasFeature(master, F_REPEAT_SET) ? html`
                  <glass-transport-button
                    .icon=${master.repeat === 'one' ? 'mdi:repeat-once' : 'mdi:repeat'}
                    ?active=${master.repeat !== 'off'}
                    active-color="accent"
                    aria-label=${t('media.repeat_aria')}
                    @click=${(e: Event) => { e.stopPropagation(); this._cycleRepeat(master); }}
                  ></glass-transport-button>
                ` : nothing}
              </div>

              <div class="dash-source-row">
                ${coordinator && coordinator.entityId !== master.entityId ? html`
                  <span class="dash-coordinator-badge">
                    <ha-icon .icon=${coordinator.icon || 'mdi:speaker'}></ha-icon>
                    ${coordinator.name}
                  </span>
                ` : nothing}
                ${master.source ? html`
                  <span class="dash-track-source">${master.source}</span>
                ` : nothing}
              </div>
            </div>
          </div>

          <!-- Navigation arrows (desktop hover, multi-room) -->
          ${this.isDashboard && roomCount > 1 ? html`
            <button class="dash-nav-arrow dash-nav-left" aria-label=${t('media.prev_room_aria')}
              @click=${(e: Event) => { e.stopPropagation(); this._swipeToRoom('right', (this._roomIndex - 1 + roomCount) % roomCount); }}>
              <ha-icon .icon=${'mdi:chevron-left'}></ha-icon>
            </button>
            <button class="dash-nav-arrow dash-nav-right" aria-label=${t('media.next_room_aria')}
              @click=${(e: Event) => { e.stopPropagation(); this._swipeToRoom('left', (this._roomIndex + 1) % roomCount); }}>
              <ha-icon .icon=${'mdi:chevron-right'}></ha-icon>
            </button>
          ` : nothing}
        </div>

        <!-- Connected fold (content always rendered so the grid transition animates) -->
        <div class="ctrl-fold ${this._foldOpen ? 'open' : ''}">
          <div class="ctrl-fold-inner">
            <div class="dash-fold-sep-top"></div>
            <div class="dash-fold-panel">
              ${this._renderFoldContent(master, coordinator, allGroupable)}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  /* ── Render: Fold content ── */

  private _renderFoldContent(master: MediaPlayerInfo, coordinator: MediaPlayerInfo | null, allGroupable: MediaPlayerInfo[]): TemplateResult {
    const isQueue = this._foldTab === 'queue';
    return html`
      <glass-tabs
        layout="segmented"
        size="sm"
        .value=${this._foldTab}
        .items=${[
          { value: 'controls', label: t('media.controls_tab') },
          { value: 'queue', label: t('media.queue_tab') },
        ]}
        @glass-tab-change=${(e: CustomEvent<{ value: string }>) => {
          this._foldTab = e.detail.value as 'controls' | 'queue';
          if (this._foldTab === 'queue') this._loadQueue();
        }}
      ></glass-tabs>
      ${isQueue ? this._renderQueueTab() : this._renderControlsTab(master, coordinator, allGroupable)}
    `;
  }

  private _renderControlsTab(master: MediaPlayerInfo, coordinator: MediaPlayerInfo | null, allGroupable: MediaPlayerInfo[]): TemplateResult {
    return html`
      <!-- Volume (master) — same bar pattern as the speakers below -->
      ${hasFeature(master, F_VOLUME_SET) ? (() => {
        const masterVol = this._dragVolumes.get(master.entityId) ?? Math.round((master.isMuted ? 0 : master.volume) * 100);
        const muteIcon = master.isMuted || master.volume === 0
          ? 'mdi:volume-off'
          : master.volume >= 0.67 ? 'mdi:volume-high'
          : master.volume >= 0.34 ? 'mdi:volume-medium'
          : 'mdi:volume-low';
        return html`
          <div class="speaker-row master ${master.isMuted ? 'muted' : ''}">
            ${hasFeature(master, F_VOLUME_MUTE) ? html`
              <button class="speaker-icon-btn"
                aria-label=${master.isMuted ? t('media.unmute_aria', { name: master.name }) : t('media.mute_aria', { name: master.name })}
                @click=${(e: Event) => { e.stopPropagation(); this._toggleMute(master); }}>
                <ha-icon .icon=${muteIcon}></ha-icon>
              </button>
            ` : html`
              <div class="speaker-icon-btn static">
                <ha-icon .icon=${muteIcon}></ha-icon>
              </div>
            `}
            <div class="speaker-vol-slider"
              role="slider"
              tabindex="0"
              aria-label=${t('media.volume_aria', { name: master.name })}
              aria-valuenow=${masterVol}
              aria-valuemin="0"
              aria-valuemax="100"
              @pointerdown=${(e: PointerEvent) => this._onMrVolPointerDown(e, master.entityId)}
              @keydown=${(e: KeyboardEvent) => this._onVolKey(e, master.entityId, masterVol)}>
              <div class="speaker-vol-fill" style="width:${masterVol}%"></div>
              <span class="speaker-vol-name" title=${master.name}>${master.name}</span>
              <span class="speaker-vol-val">${masterVol}%</span>
            </div>
          </div>
        `;
      })() : nothing}

      ${hasFeature(master, F_SELECT_SOURCE) && master.sourceList.length > 0 ? html`
        <div class="dash-fold-sep"></div>
        <div class="media-section">
          <glass-section-title label=${t('media.source_label')}></glass-section-title>
          <div class="chips-row">
            ${master.sourceList.map((src) => html`
              <glass-chip
                size="sm"
                active-color="accent"
                ?active=${master.source === src}
                .icon=${SOURCE_ICONS[src] || 'mdi:import'}
                @click=${(e: Event) => { e.stopPropagation(); this._selectSource(master.entityId, src); }}
              >${src}</glass-chip>
            `)}
          </div>
        </div>
      ` : nothing}

      ${hasFeature(master, F_SELECT_SOUND_MODE) && master.soundModeList.length > 0 ? html`
        <div class="dash-fold-sep"></div>
        <div class="media-section">
          <glass-section-title label=${t('media.sound_mode_label')}></glass-section-title>
          <div class="chips-row">
            ${master.soundModeList.map((mode) => html`
              <glass-chip
                size="sm"
                active-color="accent"
                ?active=${master.soundMode === mode}
                .icon=${'mdi:equalizer'}
                @click=${(e: Event) => { e.stopPropagation(); this._selectSoundMode(master.entityId, mode); }}
              >${mode}</glass-chip>
            `)}
          </div>
        </div>
      ` : nothing}

      <!-- Multiroom grid (show if any groupable speakers exist) -->
      ${allGroupable.length > 1 ? this._renderMultiroomGrid(coordinator, allGroupable) : nothing}
    `;
  }

  private async _loadQueue(): Promise<void> {
    if (!this.hass) return;
    const version = ++this._queueVersion;
    const master = this._getCurrentMaster();
    if (!master) return;
    try {
      const result = await this.hass.connection.sendMessagePromise({
        type: 'call_service',
        domain: 'sonos',
        service: 'get_queue',
        target: { entity_id: master.entityId },
        return_response: true,
      }) as { response?: Record<string, Array<Record<string, unknown>>> };
      if (version !== this._queueVersion) return;
      const entityQueue = result?.response?.[master.entityId] ?? [];
      this._queueData = entityQueue.map((item) => ({
        name: (item.media_title as string) ?? '',
        artist: (item.media_artist as string) ?? '',
        album_name: (item.media_album_name as string) ?? '',
        content_id: (item.media_content_id as string) ?? '',
      }));
    } catch (err) {
      if (version !== this._queueVersion) return;
      console.warn('[glass] queue load error:', err);
    }
  }

  private _renderQueueTab(): TemplateResult {
    const master = this._getCurrentMaster();
    // queue_position = 1-based position of the currently playing track (UPnP standard)
    const queuePos = master ? (this.hass?.states[master.entityId]?.attributes?.queue_position as number | undefined) ?? 0 : 0;
    // Only show upcoming tracks (after the currently playing one), like the Sonos desktop app
    const upcoming = this._queueData.slice(queuePos);
    if (!upcoming.length) {
      return html`<div class="queue-empty">${t('media.queue_empty')}</div>`;
    }
    return html`
      <div class="queue-list">
        ${upcoming.map((item: Record<string, unknown>, i: number) => {
          const name = (item.name as string) ?? '';
          const artist = (item.artist as string) ?? '';
          const contentId = (item.content_id as string) ?? '';
          const isRadio = contentId ? this._radioTracks.some(rt => rt.uri === contentId) : false;
          // Real Sonos queue index for service calls (0-indexed in the full queue)
          const realIndex = queuePos + i;
          return html`
            <div class="queue-item">
              <div class="queue-num">${i + 1}</div>
              <div class="queue-info">
                <span class="queue-title">${name}</span>
                <span class="queue-artist">${artist}</span>
              </div>
              ${isRadio ? html`<span class="queue-badge">${t('media.radio_badge')}</span>` : nothing}
              <glass-icon-button
                size="sm"
                .icon=${'mdi:close'}
                aria-label="${t('media.remove_from_queue')}"
                @click=${(e: Event) => { e.stopPropagation(); this._removeFromQueue(realIndex); }}
              ></glass-icon-button>
            </div>
          `;
        })}
      </div>
    `;
  }

  private async _removeFromQueue(sonosIndex: number): Promise<void> {
    if (this.configPreview) return;
    const master = this._getCurrentMaster();
    if (!master || !this.hass) return;
    // Optimistic UI: remove from full queue data immediately
    this._queueData = this._queueData.filter((_, i) => i !== sonosIndex);
    try {
      await this.hass.callService('sonos', 'remove_from_queue', { queue_position: sonosIndex }, { entity_id: master.entityId });
    } catch {
      this._loadQueue();
    }
  }

  private _getGroupablePlayers(): MediaPlayerInfo[] {
    if (!this.hass) return [];
    return Object.values(this.hass.states)
      .filter((e) => e.entity_id.startsWith('media_player.'))
      .map(getMediaInfo)
      .filter((p) => hasFeature(p, F_GROUPING));
  }

  /**
   * Find the real groupable coordinator speaker.
   * When master is a non-groupable entity (e.g. Spotify integration),
   * find the actual speaker that is playing the same content.
   */
  private _findGroupCoordinator(master: MediaPlayerInfo, groupablePlayers: MediaPlayerInfo[]): MediaPlayerInfo | null {
    // If master itself is groupable, it's the coordinator
    if (hasFeature(master, F_GROUPING)) return master;

    // Find a groupable speaker that is actively playing the same track
    const playing = groupablePlayers.find(
      (p) => isPlaying(p.state) && p.title && p.title === master.title,
    );
    if (playing) return playing;

    // No reliable match — don't guess a random coordinator
    return null;
  }

  /* ── Render: Multiroom grid ── */

  private _renderMultiroomGrid(coordinator: MediaPlayerInfo | null, allPlayers: MediaPlayerInfo[]): TemplateResult {
    if (!this.hass || !coordinator) return html``;

    const coordinatorId = coordinator.entityId;
    const groupSet = new Set(coordinator.groupMembers);
    // Exclude coordinator from the list (it's shown in the glass panel)
    const otherPlayers = allPlayers.filter((p) => p.entityId !== coordinatorId);
    if (otherPlayers.length === 0) return html``;

    const joinedCount = otherPlayers.filter((p) => groupSet.has(p.entityId)).length + 1;
    const totalCount = otherPlayers.length + 1;

    return html`
      <div class="dash-fold-sep"></div>
      <div class="speakers-section">
        <glass-section-title label=${t('media.speakers_label')}>
          <span slot="end" class="speakers-count">${joinedCount}/${totalCount}</span>
        </glass-section-title>
        <div class="speakers-list">
          ${otherPlayers.map((speaker) => {
            const inGroup = groupSet.has(speaker.entityId);
            const vol = this._dragVolumes.get(speaker.entityId) ?? Math.round(speaker.volume * 100);
            return html`
              <div class="speaker-row ${inGroup ? 'joined' : ''}">
                <button class="speaker-icon-btn"
                  aria-label=${inGroup
                    ? t('media.remove_group_aria', { name: speaker.name })
                    : t('media.add_group_aria', { name: speaker.name })}
                  aria-pressed=${inGroup ? 'true' : 'false'}
                  @click=${(e: Event) => {
                    e.stopPropagation();
                    if (inGroup) this._unjoinGroup(speaker.entityId);
                    else this._smartJoin(coordinatorId, speaker.entityId);
                  }}>
                  <ha-icon .icon=${speaker.icon || 'mdi:speaker'}></ha-icon>
                </button>
                <div class="speaker-vol-slider"
                  role="slider"
                  tabindex=${inGroup ? '0' : '-1'}
                  aria-label=${t('media.volume_aria', { name: speaker.name })}
                  aria-valuenow=${vol}
                  aria-valuemin="0"
                  aria-valuemax="100"
                  aria-disabled=${inGroup ? 'false' : 'true'}
                  @pointerdown=${inGroup ? (e: PointerEvent) => this._onMrVolPointerDown(e, speaker.entityId) : null}
                  @keydown=${inGroup ? (e: KeyboardEvent) => this._onVolKey(e, speaker.entityId, vol) : null}>
                  <div class="speaker-vol-fill" style="width:${vol}%"></div>
                  <span class="speaker-vol-name" title=${speaker.name}>${speaker.name}</span>
                  <span class="speaker-vol-val">${vol}%</span>
                </div>
              </div>
            `;
          })}
        </div>
      </div>
    `;
  }

  /* ── Render: Idle state ── */

  protected _collapseExpanded(): void {
    if (this._foldOpen) {
      this._foldOpen = false;
      this._foldTab = 'controls';
    }
  }

  /* ── Main render ── */

  render() {
    void this._lang;
    if (!this.hass) return nothing;
    if (!this._configLoaded) return nothing;

    const showHeader = this._mediaConfig.show_header;

    if (this.isDashboard) {
      const rooms = this._getActiveRooms();
      if (rooms.length === 0) {
        // Tolerate brief idle transitions during skip — use cached master for up to 2s
        if (!this._lastMaster) return nothing;
        if (!this._lastMasterStaleTimer) {
          this._lastMasterStaleTimer = window.setTimeout(() => {
            this._lastMaster = null;
            this._lastMasterStaleTimer = 0;
            this.requestUpdate();
          }, 2000);
        }
        return html`
          ${showHeader ? html`
            <div class="card-header">
              <div class="card-header-left">
                <span class="card-title">${t('media.title')}</span>
              </div>
            </div>
          ` : nothing}
          ${this._renderHero(this._lastMaster)}
        `;
      }
      // Active rooms found — clear stale timer
      if (this._lastMasterStaleTimer) { clearTimeout(this._lastMasterStaleTimer); this._lastMasterStaleTimer = 0; }

      // Stabilize room index by entity ID across re-renders
      if (this._roomEntityId) {
        const idx = rooms.findIndex((r) => r.entityId === this._roomEntityId);
        if (idx >= 0) this._roomIndex = idx;
        else if (this._roomIndex >= rooms.length) this._roomIndex = 0;
      }
      if (this._roomIndex >= rooms.length) this._roomIndex = 0;
      const master = rooms[this._roomIndex];
      this._roomEntityId = master.entityId;
      this._lastMaster = master;

      return html`
        ${showHeader ? html`
          <div class="card-header">
            <div class="card-header-left">
              <span class="card-title">${t('media.title')}</span>
            </div>
            ${master.source ? html`
              <span class="card-source active">${master.source}</span>
            ` : nothing}
          </div>
        ` : nothing}
        ${this._renderHero(master, rooms.length)}
        ${rooms.length > 1 ? html`
          <div class="dash-dots">
            ${rooms.map((_, i) => html`
              <button class="dash-dot ${i === this._roomIndex ? 'active' : ''}"
                aria-label=${t('media.room_dot_aria', { index: i + 1 })}
                aria-current=${i === this._roomIndex ? 'true' : 'false'}
                @click=${(e: Event) => { e.stopPropagation(); if (i !== this._roomIndex) this._swipeToRoom(i > this._roomIndex ? 'left' : 'right', i); }}>
              </button>
            `)}
          </div>
        ` : nothing}
      `;
    }

    // Room mode — only show if something is playing/paused in this room
    const players = this._getPlayers();
    const master = this._findMaster(players);
    if (!master || !isActive(master.state)) {
      // Tolerate brief idle transitions during skip — use cached master for up to 2s
      if (!this._lastMaster) return nothing;
      if (!this._lastMasterStaleTimer) {
        this._lastMasterStaleTimer = window.setTimeout(() => {
          this._lastMaster = null;
          this._lastMasterStaleTimer = 0;
          this.requestUpdate();
        }, 2000);
      }
      return html`
        ${showHeader ? html`
          <div class="card-header">
            <div class="card-header-left">
              <span class="card-title">${t('media.title')}</span>
            </div>
          </div>
        ` : nothing}
        ${this._renderHero(this._lastMaster)}
      `;
    }
    // Active master found — clear stale timer
    if (this._lastMasterStaleTimer) { clearTimeout(this._lastMasterStaleTimer); this._lastMasterStaleTimer = 0; }
    this._lastMaster = master;

    return html`
      ${showHeader ? html`
        <div class="card-header">
          <div class="card-header-left">
            <span class="card-title">${t('media.title')}</span>
          </div>
          ${master.source ? html`
            <span class="card-source active">${master.source}</span>
          ` : nothing}
        </div>
      ` : nothing}
      ${this._renderHero(master)}
    `;
  }

  static styles = [
    glassTokens,
    hostMixin,
    glassMixin,
    marqueeMixin,
    bounceMixin,
    eqMixin,
    mediaCardStyles,
  ];
}

try { customElements.define('glass-media-card', GlassMediaCard); } catch { /* scoped registry */ }
