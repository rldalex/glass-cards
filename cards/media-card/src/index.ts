import { html, css, nothing, type PropertyValues, type TemplateResult } from 'lit';
import { property, state } from 'lit/decorators.js';
import {
  BaseCard,
  BackendService,
  getAreaEntities,
  type LovelaceCardConfig,
  type HassEntity,
} from '@glass-cards/base-card';
import { glassTokens, glassMixin, marqueeMixin, marqueeText, MARQUEE_FULL, bounceMixin, eqMixin } from '@glass-cards/ui-core';
import { t } from '@glass-cards/i18n';
import './editor';

/* ── Feature bitmask ── */
const F_PAUSE = 1;
const F_SEEK = 2;
const F_VOLUME_SET = 4;
const F_VOLUME_MUTE = 8;
const F_PREVIOUS = 16;
const F_NEXT = 32;
const F_SELECT_SOURCE = 2048;
const F_STOP = 4096;
const F_PLAY = 16384;
const F_SHUFFLE_SET = 32768;
const F_SELECT_SOUND_MODE = 65536;
const F_REPEAT_SET = 262144;
const F_GROUPING = 524288;

/* ── Types ── */

interface MediaPlayerInfo {
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

interface MediaBackendConfig {
  extra_entities: Record<string, string[]>;
  show_header: boolean;
}

/* ── Helpers ── */

function getMediaInfo(entity: HassEntity): MediaPlayerInfo {
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

function isPlaying(state: string): boolean {
  return state === 'playing' || state === 'buffering';
}

function isActive(state: string): boolean {
  return state === 'playing' || state === 'paused' || state === 'buffering';
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

function hasFeature(player: MediaPlayerInfo, flag: number): boolean {
  return (player.features & flag) !== 0;
}

const SOURCE_ICONS: Record<string, string> = {
  Spotify: 'mdi:spotify',
  AirPlay: 'mdi:apple',
  Bluetooth: 'mdi:bluetooth',
  'Line-In': 'mdi:audio-input-stereo-minijack',
  TV: 'mdi:television',
  HDMI: 'mdi:hdmi-port',
};

export class GlassMediaCard extends BaseCard {
  @property() areaId?: string;
  @state() private _foldOpen = false;
  @state() private _mediaConfig: MediaBackendConfig = {
    extra_entities: {},
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
  private _configLoadingInProgress = false;
  private _playersCache: MediaPlayerInfo[] | null = null;
  private _playersCacheKey = '';
  private _volumeThrottles = new Map<string, number>();
  private _progressTimer = 0;
  private _lpTimer = 0;
  private _lpFired = false;
  private _swipeFired = false;
  private _swipeAnimating = false;
  private _swipeAnimTimer = 0;
  private _pointerStart = { x: 0, y: 0, t: 0 };
  private _queueRefreshTimer = 0;
  private _prevMediaTitle = '';
  private _lastMaster: MediaPlayerInfo | null = null;
  private _lastMasterStaleTimer = 0;

  setConfig(config: LovelaceCardConfig): void {
    this._config = config;
  }

  connectedCallback(): void {
    super.connectedCallback();
    this._listen('media-config-changed', () => {
      this._playersCache = null;
      this._loadConfig();
    });
    this._listen('room-config-changed', () => {
      this._playersCache = null;
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
    if (this._progressTimer) { clearInterval(this._progressTimer); this._progressTimer = 0; }
    if (this._lpTimer) { clearTimeout(this._lpTimer); this._lpTimer = 0; }
    if (this._swipeAnimTimer) { clearTimeout(this._swipeAnimTimer); this._swipeAnimTimer = 0; }
    if (this._queueRefreshTimer) { clearTimeout(this._queueRefreshTimer); this._queueRefreshTimer = 0; }
    if (this._lastMasterStaleTimer) { clearTimeout(this._lastMasterStaleTimer); this._lastMasterStaleTimer = 0; }
    this._lastMaster = null;
    ++this._queueVersion;
    this._swipeAnimating = false;
    this._swipeClass = '';
    this._prevPlayingSet = '';
    ++this._loadVersion;
    this._configLoadingInProgress = false;
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
        this._configLoadingInProgress = false;
      }
      if (!this._backend) {
        this._backend = new BackendService(this.hass);
        this._loadConfig();
      }
      // Invalidate players cache when entity registry changes
      const oldHass = changedProps.get('hass') as { entities?: unknown } | undefined;
      if (oldHass && oldHass.entities !== this.hass.entities) {
        this._playersCache = null;
        this._playersCacheKey = '';
      }
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
    if (!this._backend || this._configLoadingInProgress) return;
    this._configLoadingInProgress = true;
    const version = ++this._loadVersion;
    try {
      const result = await this._backend.send<{ media_card: MediaBackendConfig }>('get_config');
      if (version !== this._loadVersion) return;
      if (result?.media_card) {
        this._mediaConfig = {
          extra_entities: result.media_card.extra_entities ?? {},
          show_header: result.media_card.show_header ?? true,
        };
      }
      this._configLoaded = true;
      this.requestUpdate();
    } catch { /* ignore */ } finally {
      if (version === this._loadVersion) this._configLoadingInProgress = false;
    }
  }

  private _getPlayers(): MediaPlayerInfo[] {
    if (!this.hass) return [];

    if (this.isDashboard) {
      return Object.values(this.hass.states)
        .filter((e) => e.entity_id.startsWith('media_player.') && isActive(e.state))
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

    const allIds = [...new Set([...areaPlayerIds, ...extraIds])];
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
    const allPlaying = Object.values(this.hass.states)
      .filter((e) => e.entity_id.startsWith('media_player.') && isActive(e.state))
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

  private _callService(entityId: string, service: string, data?: Record<string, unknown>): void {
    this.hass?.callService('media_player', service, data, { entity_id: entityId });
  }

  private _togglePlayPause(player: MediaPlayerInfo): void {
    if (isPlaying(player.state)) {
      if (hasFeature(player, F_PAUSE)) {
        this._callService(player.entityId, 'media_pause');
      } else if (hasFeature(player, F_STOP)) {
        this._callService(player.entityId, 'media_stop');
      }
    } else {
      if (hasFeature(player, F_PLAY)) {
        this._callService(player.entityId, 'media_play');
      }
    }
  }

  private _previous(entityId: string): void {
    this._callService(entityId, 'media_previous_track');
  }

  private _next(entityId: string): void {
    this._callService(entityId, 'media_next_track');
    // Schedule queue refresh if queue tab is open
    if (this._foldOpen && this._foldTab === 'queue') {
      if (this._queueRefreshTimer) clearTimeout(this._queueRefreshTimer);
      this._queueRefreshTimer = window.setTimeout(() => this._loadQueue(), 1000);
    }
  }

  private _toggleMute(player: MediaPlayerInfo): void {
    this._callService(player.entityId, 'volume_mute', { is_volume_muted: !player.isMuted });
  }

  private _setVolume(entityId: string, volume: number): void {
    const now = Date.now();
    const last = this._volumeThrottles.get(entityId) || 0;
    if (now - last < 100) return;
    this._volumeThrottles.set(entityId, now);
    this._callService(entityId, 'volume_set', { volume_level: volume });
  }

  private _toggleShuffle(player: MediaPlayerInfo): void {
    this._callService(player.entityId, 'shuffle_set', { shuffle: !player.shuffle });
  }

  private _cycleRepeat(player: MediaPlayerInfo): void {
    const next = player.repeat === 'off' ? 'all' : player.repeat === 'all' ? 'one' : 'off';
    this._callService(player.entityId, 'repeat_set', { repeat: next });
  }

  private _selectSource(entityId: string, source: string): void {
    this._callService(entityId, 'select_source', { source });
  }

  private _selectSoundMode(entityId: string, mode: string): void {
    this._callService(entityId, 'select_sound_mode', { sound_mode: mode });
  }

  private _seekProgress(entityId: string, duration: number, percent: number): void {
    const position = (percent / 100) * duration;
    this._callService(entityId, 'media_seek', { seek_position: position });
  }

  private _joinGroup(coordinatorId: string, memberId: string): void {
    this.hass?.callService('media_player', 'join', { group_members: [memberId] }, { entity_id: coordinatorId });
  }

  private _unjoinGroup(memberId: string): void {
    this._callService(memberId, 'unjoin');
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

  /* ── Gesture handlers (long-press / swipe on hero) ── */

  private _onHeroPointerDown(e: PointerEvent, _master: MediaPlayerInfo): void {
    if ((e.target as HTMLElement).closest('button')) return;
    this._pointerStart = { x: e.clientX, y: e.clientY, t: Date.now() };
    this._lpFired = false;
    this._swipeFired = false;
    this._lpTimer = window.setTimeout(() => {
      this._lpFired = true;
      this._foldOpen = !this._foldOpen;
      // Pre-load queue when fold opens so we know whether to show tabs
      if (this._foldOpen) this._loadQueue();
      // Scroll card into view when fold opens (wait for fold CSS transition)
      if (this._foldOpen) {
        setTimeout(() => {
          const fold = this.renderRoot?.querySelector('.ctrl-fold') as HTMLElement | null;
          fold?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 350);
      }
    }, 500);
  }

  private _onHeroPointerMove(e: PointerEvent): void {
    if (this._lpFired || this._swipeFired) return;
    const dx = e.clientX - this._pointerStart.x;
    const dy = e.clientY - this._pointerStart.y;
    if (Math.abs(dx) > 15 || Math.abs(dy) > 15) {
      clearTimeout(this._lpTimer);
      this._lpTimer = 0;
    }
  }

  private _onHeroPointerUp(e: PointerEvent, _master: MediaPlayerInfo, roomCount: number): void {
    clearTimeout(this._lpTimer);
    if (this._lpFired) return;
    const dx = e.clientX - this._pointerStart.x;
    const elapsed = Date.now() - this._pointerStart.t;

    // Swipe detection (dashboard only, multiple rooms) — animated
    if (this.isDashboard && roomCount > 1 && Math.abs(dx) > 50 && elapsed < 500) {
      this._swipeFired = true;
      if (dx < 0) {
        this._swipeToRoom('left', (this._roomIndex + 1) % roomCount);
      } else {
        this._swipeToRoom('right', (this._roomIndex - 1 + roomCount) % roomCount);
      }
      return;
    }

  }

  private _onHeroPointerCancel(): void {
    clearTimeout(this._lpTimer);
  }

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

  /* ── Volume slider (pill) ── */

  private _onVolumePointerDown(e: PointerEvent, entityId: string): void {
    e.stopPropagation();
    const bar = e.currentTarget as HTMLElement;
    bar.setPointerCapture(e.pointerId);
    const fill = bar.querySelector('.slider-fill') as HTMLElement;
    const thumb = bar.querySelector('.slider-thumb') as HTMLElement;
    const val = bar.querySelector('.slider-val') as HTMLElement;

    const update = (evt: PointerEvent) => {
      const r = bar.getBoundingClientRect();
      const pct = Math.max(0, Math.min(100, ((evt.clientX - r.left) / r.width) * 100));
      fill.style.width = pct + '%';
      thumb.style.left = pct + '%';
      if (val) val.textContent = Math.round(pct) + '%';
      this._setVolume(entityId, pct / 100);
    };
    update(e);

    const onMove = (evt: PointerEvent) => update(evt);
    const cleanup = () => {
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

  /* ── Multiroom volume slider ── */

  private _onMrVolPointerDown(e: PointerEvent, entityId: string): void {
    e.stopPropagation();
    const bar = e.currentTarget as HTMLElement;
    bar.setPointerCapture(e.pointerId);
    const fill = bar.querySelector('.mr-vol-fill') as HTMLElement;
    const val = bar.querySelector('.mr-vol-val') as HTMLElement;

    const update = (evt: PointerEvent) => {
      const r = bar.getBoundingClientRect();
      const pct = Math.max(0, Math.min(100, ((evt.clientX - r.left) / r.width) * 100));
      fill.style.width = pct + '%';
      if (val) val.textContent = Math.round(pct) + '%';
      this._setVolume(entityId, pct / 100);
    };
    update(e);

    const onMove = (evt: PointerEvent) => update(evt);
    const cleanup = () => {
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

    return html`
      <div class="dash-wrap ${this._foldOpen ? 'fold-open' : ''}">
        <div class="dash-hero ${this._swipeClass}"
          @pointerdown=${(e: PointerEvent) => this._onHeroPointerDown(e, master)}
          @pointermove=${(e: PointerEvent) => this._onHeroPointerMove(e)}
          @pointerup=${(e: PointerEvent) => this._onHeroPointerUp(e, master, roomCount)}
          @pointercancel=${() => this._onHeroPointerCancel()}
        >
          <!-- Full-bleed artwork background -->
          ${master.albumArt ? html`
            <img class="dash-art-bg" src=${master.albumArt} alt="" loading="lazy" />
          ` : nothing}
          <div class="dash-gradient"></div>
          ${!master.albumArt ? html`
            <div class="dash-deco"></div>
            <div class="dash-placeholder">
              <ha-icon .icon=${master.source?.toLowerCase().includes('tv') || master.icon?.includes('tv') || master.icon?.includes('television')
                ? 'mdi:television-classic'
                : master.appName?.toLowerCase().includes('spotify')
                  ? 'mdi:spotify'
                  : master.state === 'playing' || master.state === 'paused'
                    ? 'mdi:music-note'
                    : master.icon || 'mdi:speaker'}></ha-icon>
            </div>
          ` : nothing}

          <div class="dash-content">
            <!-- Top bar: speaker badge + group badge (glass pills) -->
            <div class="dash-top">
              <div class="dash-speaker glass-pill">
                <ha-icon .icon=${master.icon || 'mdi:speaker'}></ha-icon>
                <span>${marqueeText(master.name, MARQUEE_FULL)}</span>
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
              <div class="dash-track">
                ${master.title ? html`
                  <div class="dash-track-title">${marqueeText(master.title, 22)}</div>
                ` : nothing}
                ${master.artist ? html`
                  <div class="dash-track-artist">${marqueeText(master.artist, 28)}</div>
                ` : nothing}
              </div>

              <!-- Progress bar -->
              ${master.duration > 0 && hasFeature(master, F_SEEK) ? html`
                <div class="dash-progress-wrap">
                  <div class="dash-time-row">
                    <span class="dash-track-time">${formatTime(elapsed)}</span>
                    <span class="dash-track-time">${formatTime(master.duration)}</span>
                  </div>
                  <div class="dash-progress"
                    aria-label=${t('media.seek_aria')}
                    @pointerdown=${(e: PointerEvent) => this._onProgressPointerDown(e, master.entityId, master.duration)}
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
                  <button class="transport-btn ${master.shuffle ? 'active' : ''}"
                    aria-label=${t('media.shuffle_aria')}
                    @click=${(e: Event) => { e.stopPropagation(); this._toggleShuffle(master); }}>
                    <ha-icon .icon=${'mdi:shuffle-variant'}></ha-icon>
                  </button>
                ` : nothing}

                ${hasFeature(master, F_PREVIOUS) ? html`
                  <button class="transport-btn transport-skip"
                    aria-label=${t('media.prev_aria', { name: master.name })}
                    @click=${(e: Event) => { e.stopPropagation(); this._previous(master.entityId); }}>
                    <ha-icon .icon=${'mdi:skip-previous'}></ha-icon>
                  </button>
                ` : nothing}

                <button class="transport-btn transport-main"
                  aria-label=${playing ? t('media.pause_aria', { name: master.name }) : t('media.play_aria', { name: master.name })}
                  @click=${(e: Event) => { e.stopPropagation(); this._togglePlayPause(master); }}>
                  <ha-icon .icon=${playing ? 'mdi:pause' : 'mdi:play'}></ha-icon>
                </button>

                ${hasFeature(master, F_NEXT) ? html`
                  <button class="transport-btn transport-skip"
                    aria-label=${t('media.next_aria', { name: master.name })}
                    @click=${(e: Event) => { e.stopPropagation(); this._next(master.entityId); }}>
                    <ha-icon .icon=${'mdi:skip-next'}></ha-icon>
                  </button>
                ` : nothing}

                ${hasFeature(master, F_REPEAT_SET) ? html`
                  <button class="transport-btn ${master.repeat !== 'off' ? 'active' : ''}"
                    aria-label=${t('media.repeat_aria')}
                    @click=${(e: Event) => { e.stopPropagation(); this._cycleRepeat(master); }}>
                    <ha-icon .icon=${master.repeat === 'one' ? 'mdi:repeat-once' : 'mdi:repeat'}></ha-icon>
                  </button>
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

        <!-- Connected fold -->
        <div class="ctrl-fold ${this._foldOpen ? 'open' : ''}">
          <div class="ctrl-fold-inner">
            <div class="dash-fold-sep-top"></div>
            <div class="dash-fold-panel">
              ${this._foldOpen ? this._renderFoldContent(master, coordinator, allGroupable) : nothing}
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
      <div class="segmented">
        <button class="seg-btn ${!isQueue ? 'active' : ''}"
                @click=${() => { this._foldTab = 'controls'; }}>
          ${t('media.controls_tab')}
        </button>
        <button class="seg-btn ${isQueue ? 'active' : ''}"
                @click=${() => { this._foldTab = 'queue'; this._loadQueue(); }}>
          ${t('media.queue_tab')}
        </button>
      </div>
      ${isQueue ? this._renderQueueTab() : this._renderControlsTab(master, coordinator, allGroupable)}
    `;
  }

  private _renderControlsTab(master: MediaPlayerInfo, coordinator: MediaPlayerInfo | null, allGroupable: MediaPlayerInfo[]): TemplateResult {
    return html`
      <!-- Volume -->
      ${hasFeature(master, F_VOLUME_SET) ? html`
        <div class="ctrl-label">${t('media.volume_label')}</div>
        <div class="volume-row">
          ${hasFeature(master, F_VOLUME_MUTE) ? html`
            <button class="volume-btn ${master.isMuted ? 'muted' : ''}"
              aria-label=${master.isMuted ? t('media.unmute_aria', { name: master.name }) : t('media.mute_aria', { name: master.name })}
              @click=${(e: Event) => { e.stopPropagation(); this._toggleMute(master); }}>
              <ha-icon .icon=${master.isMuted ? 'mdi:volume-off' : master.volume > 0.5 ? 'mdi:volume-high' : 'mdi:volume-medium'}></ha-icon>
            </button>
          ` : nothing}
          <div class="slider" @pointerdown=${(e: PointerEvent) => this._onVolumePointerDown(e, master.entityId)}>
            <div class="slider-fill accent" style="width:${Math.round((master.isMuted ? 0 : master.volume) * 100)}%"></div>
            <div class="slider-thumb" style="left:${Math.round((master.isMuted ? 0 : master.volume) * 100)}%"></div>
            <span class="slider-val">${Math.round((master.isMuted ? 0 : master.volume) * 100)}%</span>
          </div>
        </div>
      ` : nothing}

      <!-- Source chips -->
      ${hasFeature(master, F_SELECT_SOURCE) && master.sourceList.length > 0 ? html`
        <div class="dash-fold-sep"></div>
        <div class="ctrl-label">${t('media.source_label')}</div>
        <div class="chips-row">
          ${master.sourceList.map((src) => html`
            <button class="chip ${master.source === src ? 'active' : ''}"
              @click=${(e: Event) => { e.stopPropagation(); this._selectSource(master.entityId, src); }}>
              <ha-icon .icon=${SOURCE_ICONS[src] || 'mdi:import'}></ha-icon>
              <span>${src}</span>
            </button>
          `)}
        </div>
      ` : nothing}

      <!-- Sound mode chips -->
      ${hasFeature(master, F_SELECT_SOUND_MODE) && master.soundModeList.length > 0 ? html`
        <div class="dash-fold-sep"></div>
        <div class="ctrl-label">${t('media.sound_mode_label')}</div>
        <div class="chips-row">
          ${master.soundModeList.map((mode) => html`
            <button class="chip ${master.soundMode === mode ? 'active' : ''}"
              @click=${(e: Event) => { e.stopPropagation(); this._selectSoundMode(master.entityId, mode); }}>
              <ha-icon .icon=${'mdi:equalizer'}></ha-icon>
              <span>${mode}</span>
            </button>
          `)}
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
                <span class="queue-title">${marqueeText(name, MARQUEE_FULL)}</span>
                <span class="queue-artist">${artist}</span>
              </div>
              ${isRadio ? html`<span class="queue-badge">${t('media.radio_badge')}</span>` : nothing}
              <button class="btn-icon xs queue-remove" aria-label="${t('media.remove_from_queue')}"
                      @click=${(e: Event) => { e.stopPropagation(); this._removeFromQueue(realIndex); }}>
                <ha-icon icon="mdi:close"></ha-icon>
              </button>
            </div>
          `;
        })}
      </div>
    `;
  }

  private async _removeFromQueue(sonosIndex: number): Promise<void> {
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
    // Exclude coordinator from the grid (it's shown in the glass panel)
    const otherPlayers = allPlayers.filter((p) => p.entityId !== coordinatorId);

    if (otherPlayers.length === 0) return html``;

    return html`
      <div class="dash-fold-sep"></div>
      <div class="ctrl-label">${t('media.speakers_label')}</div>
      <div class="multiroom-grid">
        ${otherPlayers.map((speaker) => {
          const inGroup = groupSet.has(speaker.entityId);

          return html`
            <div class="mr-cell ${inGroup ? 'joined' : ''}">
              <div class="mr-cell-top">
                <button class="mr-icon-btn"
                  aria-label=${inGroup
                    ? t('media.remove_group_aria', { name: speaker.name })
                    : t('media.add_group_aria', { name: speaker.name })}
                  @click=${(e: Event) => {
                    e.stopPropagation();
                    if (inGroup) this._unjoinGroup(speaker.entityId);
                    else this._smartJoin(coordinatorId, speaker.entityId);
                  }}>
                  <ha-icon .icon=${speaker.icon || 'mdi:speaker'}></ha-icon>
                </button>
                <div class="mr-info">
                  <div class="mr-name">${speaker.name}</div>
                </div>
              </div>
              ${inGroup ? html`
                <div class="mr-vol-slider"
                  @pointerdown=${(e: PointerEvent) => this._onMrVolPointerDown(e, speaker.entityId)}>
                  <div class="mr-vol-fill" style="width:${Math.round(speaker.volume * 100)}%"></div>
                  <div class="mr-vol-icon"><ha-icon .icon=${'mdi:volume-medium'}></ha-icon></div>
                  <span class="mr-vol-val">${Math.round(speaker.volume * 100)}%</span>
                </div>
              ` : nothing}
            </div>
          `;
        })}
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
    glassMixin,
    marqueeMixin,
    bounceMixin,
    eqMixin,
    css`
      :host {
        display: block;
        width: 100%;
        max-width: 500px;
        margin: 0 auto;
        font-family: 'Plus Jakarta Sans', sans-serif;
        /* media player tokens */
        --mp-color: #818cf8;
        --mp-bg: rgba(129,140,248,0.1);
        --mp-border: rgba(129,140,248,0.15);
        --mp-glow: rgba(129,140,248,0.4);
        --mp-sub: rgba(129,140,248,0.55);
      }

      /* ── Header ── */
      .card-header {
        display: flex; align-items: center; justify-content: space-between;
        padding: 0 6px; margin-bottom: 6px; min-height: 22px;
      }
      .card-header-left { display: flex; align-items: center; gap: 8px; }
      .card-title {
        font-size: 9px; font-weight: 700; text-transform: uppercase;
        letter-spacing: 1.5px; color: var(--t4);
      }
      .card-source {
        font-size: 10px; font-weight: 500; color: var(--t4);
        white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        max-width: 50%;
        opacity: 0; transition: opacity var(--t-fast);
      }
      .card-source.active { opacity: 1; color: var(--mp-sub); }

      /* ── Swipe slide animation ── */
      @keyframes swipe-exit-l {
        0%   { transform: translateX(0) scale(1); opacity: 1; filter: blur(0); }
        100% { transform: translateX(-40%) scale(0.92); opacity: 0; filter: blur(6px); }
      }
      @keyframes swipe-enter-r {
        0%   { transform: translateX(40%) scale(0.92); opacity: 0; filter: blur(6px); }
        100% { transform: translateX(0) scale(1); opacity: 1; filter: blur(0); }
      }
      @keyframes swipe-exit-r {
        0%   { transform: translateX(0) scale(1); opacity: 1; filter: blur(0); }
        100% { transform: translateX(40%) scale(0.92); opacity: 0; filter: blur(6px); }
      }
      @keyframes swipe-enter-l {
        0%   { transform: translateX(-40%) scale(0.92); opacity: 0; filter: blur(6px); }
        100% { transform: translateX(0) scale(1); opacity: 1; filter: blur(0); }
      }
      .swipe-exit-left  { animation: swipe-exit-l 220ms cubic-bezier(0.4, 0, 0.7, 0.2) forwards; pointer-events: none; }
      .swipe-enter-right { animation: swipe-enter-r 280ms cubic-bezier(0.16, 1, 0.3, 1) forwards; pointer-events: none; }
      .swipe-exit-right  { animation: swipe-exit-r 220ms cubic-bezier(0.4, 0, 0.7, 0.2) forwards; pointer-events: none; }
      .swipe-enter-left  { animation: swipe-enter-l 280ms cubic-bezier(0.16, 1, 0.3, 1) forwards; pointer-events: none; }

      /* ── Dash wrap ── */
      .dash-wrap {
        position: relative; z-index: 1;
        display: flex; flex-direction: column; gap: 0;
      }

      /* ── Hero card ── */
      .dash-hero {
        position: relative;
        border-radius: var(--radius-xl);
        overflow: hidden;
        background: #111;
        border: 1px solid var(--b2);
        box-shadow:
          0 8px 32px rgba(0,0,0,0.3),
          0 2px 8px rgba(0,0,0,0.2),
          inset 0 1px 0 rgba(255,255,255,0.04),
          inset 0 -1px 0 rgba(0,0,0,0.1);
        touch-action: pan-y;
        user-select: none; -webkit-user-select: none;
        -webkit-tap-highlight-color: transparent;
        transition: border-radius var(--t-layout), border-color var(--t-fast);
      }
      @media (hover: hover) and (pointer: fine) { .dash-hero:hover { border-color: var(--b3); } }

      /* Connected fold: hero loses bottom radius when fold is open */
      .dash-wrap.fold-open .dash-hero {
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
        border-bottom-color: transparent;
      }

      /* ── Full-bleed artwork background ── */
      .dash-art-bg {
        position: absolute; inset: 0; width: 100%; height: 100%;
        object-fit: cover; pointer-events: none; z-index: 0;
        transition: opacity 0.8s;
      }

      /* ── Gradient overlay — minimal vignette to preserve artwork visibility ── */
      .dash-gradient {
        position: absolute; inset: 0; pointer-events: none; z-index: 1;
        background: linear-gradient(
          to bottom,
          rgba(0,0,0,0.08) 0%,
          rgba(0,0,0,0) 25%,
          rgba(0,0,0,0) 50%,
          rgba(0,0,0,0.15) 75%,
          rgba(0,0,0,0.4) 100%
        );
      }

      /* ── Decorative shapes (no-artwork fallback) ── */
      .dash-deco {
        position: absolute; inset: 0; pointer-events: none; z-index: 0; overflow: hidden;
        background: linear-gradient(135deg, rgba(30,30,50,1) 0%, rgba(15,15,30,1) 50%, rgba(25,20,40,1) 100%);
      }
      .dash-deco::before {
        content: ''; position: absolute;
        width: 280px; height: 280px; border-radius: 50%;
        top: -80px; right: -60px;
        background: radial-gradient(circle, rgba(129,140,248,0.08), transparent 70%);
      }
      .dash-deco::after {
        content: ''; position: absolute;
        width: 220px; height: 220px; border-radius: 50%;
        bottom: -50px; left: -40px;
        background: radial-gradient(circle, rgba(168,85,247,0.06), transparent 70%);
      }
      .dash-placeholder {
        position: absolute; inset: 0; pointer-events: none; z-index: 0;
        display: flex; align-items: center; justify-content: center;
      }
      .dash-placeholder ha-icon {
        --mdc-icon-size: 80px;
        color: rgba(255,255,255,0.06);
        display: flex; align-items: center; justify-content: center;
      }

      /* ── Content ── */
      .dash-content {
        position: relative; z-index: 2;
        display: flex; flex-direction: column;
        min-height: 340px;
        padding: 14px;
      }

      /* ── Glass pill (shared for top badges) ── */
      .glass-pill {
        backdrop-filter: blur(16px) saturate(1.3);
        -webkit-backdrop-filter: blur(16px) saturate(1.3);
        background: rgba(0,0,0,0.22);
        border: 1px solid rgba(255,255,255,0.12);
        box-shadow: 0 2px 8px rgba(0,0,0,0.2);
      }

      /* ── Glass panel (bottom info card) — frosted glass, artwork bleeds through ── */
      .glass-panel {
        border-radius: var(--radius-lg);
        backdrop-filter: blur(10px) saturate(1.4);
        -webkit-backdrop-filter: blur(10px) saturate(1.4);
        background: rgba(0,0,0,0.25);
        border: 1px solid rgba(255,255,255,0.12);
        box-shadow:
          0 4px 16px rgba(0,0,0,0.12),
          inset 0 1px 0 rgba(255,255,255,0.08);
      }

      /* ── Top bar ── */
      .dash-top {
        display: flex; align-items: center; justify-content: space-between;
      }
      .dash-speaker {
        display: inline-flex; align-items: center; gap: 6px;
        padding: 4px 10px 4px 6px;
        border-radius: var(--radius-full, 9999px);
        font-size: 10px; font-weight: 600; color: rgba(255,255,255,0.9);
        overflow: hidden; white-space: nowrap;
      }
      .dash-speaker ha-icon {
        display: flex; align-items: center; justify-content: center;
        --mdc-icon-size: 13px;
      }
      .dash-group-badge {
        display: inline-flex; align-items: center; gap: 4px;
        padding: 2px 8px; border-radius: 20px;
        color: rgba(255,255,255,0.9);
        font-size: 10px; font-weight: 600;
      }
      .dash-group-badge ha-icon {
        display: flex; align-items: center; justify-content: center;
        --mdc-icon-size: 12px;
      }

      /* ── Equalizer bars ── */
      .dash-eq {
        display: flex; align-items: flex-end; gap: 2px;
        height: 14px; margin-left: 6px;
      }
      .dash-eq-bar {
        width: 3px; border-radius: 1.5px;
        background: #fff;
        box-shadow: 0 0 3px rgba(255,255,255,0.6);
      }
      .dash-eq.playing .dash-eq-bar:nth-child(1) {
        height: 40%; animation: eq-lo 0.65s ease-in-out infinite alternate;
      }
      .dash-eq.playing .dash-eq-bar:nth-child(2) {
        height: 80%; animation: eq-hi 0.52s ease-in-out infinite alternate;
        animation-delay: 0.12s;
      }
      .dash-eq.playing .dash-eq-bar:nth-child(3) {
        height: 55%; animation: eq-mid 0.78s ease-in-out infinite alternate;
        animation-delay: 0.25s;
      }
      .dash-eq.playing .dash-eq-bar:nth-child(4) {
        height: 70%; animation: eq-lo 0.6s ease-in-out infinite alternate;
        animation-delay: 0.08s;
      }
      @keyframes eq-lo  { 0% { height: 15%; } 100% { height: 70%; } }
      @keyframes eq-mid { 0% { height: 20%; } 100% { height: 90%; } }
      @keyframes eq-hi  { 0% { height: 25%; } 100% { height: 100%; } }

      /* ── Spacer ── */
      .dash-spacer { flex: 1; }

      /* ── Bottom info panel ── */
      .dash-info-panel {
        position: relative; z-index: 10;
        display: flex; flex-direction: column; gap: 8px;
        padding: 12px 14px;
      }

      /* ── Track info ── */
      .dash-track {
        display: flex; flex-direction: column; gap: 2px;
        min-width: 0;
      }
      .dash-track-title {
        font-size: 16px; font-weight: 700; color: #fff; line-height: 1.2;
        overflow: hidden; white-space: nowrap;
        text-shadow: 0 1px 4px rgba(0,0,0,0.5), 0 0 12px rgba(0,0,0,0.3);
      }
      .dash-track-artist {
        font-size: 12px; font-weight: 500; color: rgba(255,255,255,0.75);
        overflow: hidden; white-space: nowrap;
        text-shadow: 0 1px 3px rgba(0,0,0,0.5);
      }

      /* ── Time row ── */
      .dash-time-row {
        display: flex; justify-content: space-between; align-items: center;
      }
      .dash-track-time {
        font-size: 9px; font-weight: 500; color: rgba(255,255,255,0.4);
        font-variant-numeric: tabular-nums;
        text-shadow: 0 1px 2px rgba(0,0,0,0.4);
      }
      .dash-track-source {
        font-size: 8px; font-weight: 700; text-transform: uppercase;
        letter-spacing: 0.5px; color: rgba(255,255,255,0.3);
        padding: 1px 6px; border-radius: 4px;
        background: rgba(255,255,255,0.06);
      }
      .dash-source-row {
        display: flex; align-items: center; justify-content: center; gap: 8px;
        margin-top: -2px;
      }
      .dash-coordinator-badge {
        display: inline-flex; align-items: center; gap: 4px;
        font-size: 9px; font-weight: 600; color: rgba(255,255,255,0.5);
      }
      .dash-coordinator-badge ha-icon {
        display: flex; align-items: center; justify-content: center;
        --mdc-icon-size: 11px;
      }

      /* ── Progress bar ── */
      .dash-progress-wrap {
        margin-top: 0;
      }
      .dash-progress {
        position: relative; width: 100%; height: 4px;
        border-radius: 2px; background: var(--s2);
        cursor: pointer; touch-action: none;
        transition: height var(--t-fast);
      }
      @media (hover: hover) and (pointer: fine) {
        .dash-progress:hover { height: 6px; }
        .dash-progress:hover .dash-progress-thumb { opacity: 1; }
      }
      .dash-progress-fill {
        position: absolute; top: 0; left: 0; height: 100%;
        border-radius: inherit;
        background: var(--c-accent-dynamic, var(--mp-color));
        box-shadow: 0 0 8px var(--mp-glow);
        transition: width 0.3s linear;
        pointer-events: none;
      }
      .dash-progress-thumb {
        position: absolute; top: 50%; transform: translate(-50%, -50%);
        width: 10px; height: 10px; border-radius: 50%;
        background: #fff; box-shadow: 0 0 6px rgba(0,0,0,0.3);
        pointer-events: none; opacity: 0; transition: opacity var(--t-fast);
      }

      /* ── Transport ── */
      .dash-transport {
        display: flex; align-items: center; justify-content: center; gap: 8px;
        margin-top: 2px;
      }
      .transport-btn {
        width: 36px; height: 36px; border-radius: var(--radius-md);
        background: transparent; border: 1px solid transparent;
        display: flex; align-items: center; justify-content: center;
        cursor: pointer; transition: all var(--t-fast); outline: none; padding: 0;
        -webkit-tap-highlight-color: transparent;
        color: rgba(255,255,255,0.7);
      }
      .transport-btn ha-icon {
        display: flex; align-items: center; justify-content: center;
        --mdc-icon-size: 18px;
      }
      @media (hover: hover) and (pointer: fine) {
        .transport-btn:hover { background: rgba(255,255,255,0.08); color: #fff; }
      }
      .transport-btn:focus-visible { outline: 2px solid rgba(255,255,255,0.25); outline-offset: -2px; }
      @media (pointer: coarse) { .transport-btn:active { animation: bounce 0.3s ease; } }
      @media (hover: hover) and (pointer: fine) { .transport-btn:active { transform: scale(0.96); } }
      .transport-btn.active {
        color: var(--c-accent-dynamic, var(--mp-color));
        background: color-mix(in srgb, var(--c-accent-dynamic, var(--mp-color)) 12%, transparent);
        border-color: color-mix(in srgb, var(--c-accent-dynamic, var(--mp-color)) 25%, transparent);
      }

      .transport-skip { width: 40px; height: 40px; }
      .transport-skip ha-icon { --mdc-icon-size: 26px; }
      .transport-skip { color: rgba(255,255,255,0.85); }

      .transport-main {
        width: 52px; height: 52px; border-radius: 16px;
        background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.15);
        color: #fff;
      }
      .transport-main ha-icon { --mdc-icon-size: 28px; }
      @media (hover: hover) and (pointer: fine) {
        .transport-main:hover {
          background: rgba(255,255,255,0.2); border-color: rgba(255,255,255,0.25);
        }
        .transport-main:active { transform: scale(0.96); }
      }
      @media (pointer: coarse) { .transport-main:active { animation: bounce 0.3s ease; } }

      /* ── Idle state ── */
      .dash-idle {
        display: flex; flex-direction: column; align-items: center; justify-content: center;
        flex: 1; gap: 8px; padding: 20px;
      }
      .dash-idle ha-icon {
        display: flex; align-items: center; justify-content: center;
        --mdc-icon-size: 32px; color: var(--t4);
      }
      .dash-idle span { font-size: 11px; color: var(--t3); font-weight: 500; }

      /* ── Navigation arrows (hover on sides) ── */
      .dash-nav-arrow {
        position: absolute; top: 0; bottom: 0; width: 40px; z-index: 8;
        display: flex; align-items: center; justify-content: center;
        background: none; border: none; cursor: pointer; padding: 0;
        opacity: 0; transition: opacity var(--t-fast);
        -webkit-tap-highlight-color: transparent; outline: none;
      }
      .dash-nav-arrow ha-icon {
        display: flex; align-items: center; justify-content: center;
        --mdc-icon-size: 24px; color: rgba(255,255,255,0.7);
        filter: drop-shadow(0 1px 4px rgba(0,0,0,0.5));
        transition: color var(--t-fast);
      }
      .dash-nav-left { left: 0; border-radius: var(--radius-xl) 0 0 var(--radius-xl); }
      .dash-nav-right { right: 0; border-radius: 0 var(--radius-xl) var(--radius-xl) 0; }
      @media (hover: hover) and (pointer: fine) {
        .dash-nav-left:hover, .dash-nav-right:hover {
          background: linear-gradient(90deg, rgba(0,0,0,0.25), transparent);
        }
        .dash-nav-right:hover {
          background: linear-gradient(270deg, rgba(0,0,0,0.25), transparent);
        }
        .dash-nav-arrow:hover ha-icon { color: #fff; }
        .dash-hero:hover .dash-nav-arrow { opacity: 1; }
      }
      @media (pointer: coarse) { .dash-nav-arrow:active { animation: bounce 0.3s ease; } }
      @media (hover: hover) and (pointer: fine) { .dash-nav-arrow:active { transform: scale(0.95); } }
      .dash-nav-arrow:focus-visible { outline: 2px solid rgba(255,255,255,0.25); outline-offset: -2px; }

      /* ── Room dots (dashboard swipe indicator) ── */
      .dash-dots {
        display: flex; justify-content: center; gap: 6px;
        padding: 8px 0 2px;
      }
      .dash-dot {
        width: 6px; height: 6px; border-radius: 50%;
        background: rgba(255,255,255,0.2); border: none;
        padding: 0; cursor: pointer; transition: all var(--t-fast);
        outline: none; -webkit-tap-highlight-color: transparent;
      }
      .dash-dot.active {
        background: rgba(255,255,255,0.7);
        transform: scale(1.3);
      }
      @media (hover: hover) and (pointer: fine) { .dash-dot:hover { background: rgba(255,255,255,0.5); } }
      @media (pointer: coarse) { .dash-dot:active { animation: bounce 0.3s ease; } }
      .dash-dot:focus-visible { outline: 2px solid rgba(255,255,255,0.5); outline-offset: 2px; }

      /* ══════════════════════════════════════════
         Connected Fold
         ══════════════════════════════════════════ */
      .ctrl-fold {
        display: grid; grid-template-rows: 0fr;
        transition: grid-template-rows var(--t-layout);
      }
      .ctrl-fold.open { grid-template-rows: 1fr; }
      .ctrl-fold-inner {
        overflow: hidden;
        opacity: 0; transition: opacity 0.25s;
        background: linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01));
        backdrop-filter: blur(40px) saturate(1.4);
        -webkit-backdrop-filter: blur(40px) saturate(1.4);
        border: 1px solid var(--b2);
        border-top: none;
        border-radius: 0 0 var(--radius-xl) var(--radius-xl);
        box-shadow:
          0 8px 32px rgba(0,0,0,0.3),
          0 2px 8px rgba(0,0,0,0.2),
          inset 0 -1px 0 rgba(0,0,0,0.1);
      }
      .ctrl-fold.open .ctrl-fold-inner { opacity: 1; transition-delay: 0.1s; }

      .ctrl-label {
        font-size: 9px; font-weight: 700; text-transform: uppercase;
        letter-spacing: 1px; color: var(--t4); margin-bottom: -4px;
      }

      .dash-fold-sep-top {
        height: 1px; margin: 0 12px;
        background: linear-gradient(90deg, transparent, var(--mp-border), transparent);
      }
      .dash-fold-panel {
        display: flex; flex-direction: column; gap: 10px;
        padding: 12px 16px 14px;
      }
      .dash-fold-sep {
        height: 1px; margin: 2px 0;
        background: linear-gradient(90deg, transparent, var(--mp-border), transparent);
      }

      /* ── Volume row ── */
      .volume-row { display: flex; align-items: center; gap: 8px; }
      .volume-btn {
        width: 28px; height: 28px; border-radius: var(--radius-sm);
        background: transparent; border: none;
        display: flex; align-items: center; justify-content: center;
        cursor: pointer; transition: all var(--t-fast); outline: none; padding: 0;
        -webkit-tap-highlight-color: transparent; flex-shrink: 0;
        color: var(--t3);
      }
      .volume-btn ha-icon {
        display: flex; align-items: center; justify-content: center;
        --mdc-icon-size: 18px;
      }
      @media (hover: hover) and (pointer: fine) { .volume-btn:hover { color: var(--t2); } }
      .volume-btn:focus-visible { outline: 2px solid rgba(255,255,255,0.25); outline-offset: -2px; }
      @media (pointer: coarse) { .volume-btn:active { animation: bounce 0.3s ease; } }
      @media (hover: hover) and (pointer: fine) { .volume-btn:active { transform: scale(0.96); } }
      .volume-btn.muted { color: var(--c-alert); }

      /* ── Slider (pill) ── */
      .slider {
        position: relative; flex: 1; height: 36px;
        border-radius: var(--radius-lg); background: var(--s1);
        border: 1px solid var(--b1); overflow: hidden; cursor: pointer;
        touch-action: none; user-select: none; -webkit-user-select: none;
      }
      .slider-fill {
        position: absolute; top: 0; left: 0; height: 100%;
        border-radius: inherit; pointer-events: none;
        transition: width var(--t-fast);
      }
      .slider-fill.accent { background: linear-gradient(90deg, rgba(129,140,248,0.15), rgba(129,140,248,0.25)); }
      .slider-thumb {
        position: absolute; top: 50%; transform: translate(-50%, -50%);
        width: 8px; height: 20px; border-radius: 4px;
        background: rgba(255,255,255,0.7); box-shadow: 0 0 8px rgba(255,255,255,0.2);
        pointer-events: none;
      }
      .slider-val {
        position: absolute; top: 50%; right: 12px; transform: translateY(-50%);
        font-size: 11px; font-weight: 600; color: var(--t3); pointer-events: none;
      }

      /* ── Chips ── */
      .chips-row { display: flex; gap: 6px; flex-wrap: wrap; }
      .chip {
        display: inline-flex; align-items: center; gap: 5px;
        padding: 5px 10px; border-radius: var(--radius-md);
        border: 1px solid var(--b2); background: var(--s1);
        font-family: inherit; font-size: 10px; font-weight: 600;
        text-transform: uppercase; letter-spacing: 0.8px;
        color: var(--t3); cursor: pointer; transition: all var(--t-fast);
        outline: none; -webkit-tap-highlight-color: transparent;
      }
      .chip ha-icon {
        display: flex; align-items: center; justify-content: center;
        --mdc-icon-size: 14px;
      }
      @media (hover: hover) and (pointer: fine) {
        .chip:hover { background: var(--s3); color: var(--t2); border-color: var(--b3); }
      }
      .chip:focus-visible { outline: 2px solid rgba(255,255,255,0.25); outline-offset: -2px; }
      @media (pointer: coarse) { .chip:active { animation: bounce 0.3s ease; } }
      @media (hover: hover) and (pointer: fine) { .chip:active { transform: scale(0.96); } }
      .chip.active {
        border-color: rgba(129,140,248,0.2); background: rgba(129,140,248,0.08);
        color: rgba(129,140,248,0.8);
      }

      /* ── Multiroom grid ── */
      .multiroom-grid {
        display: grid; grid-template-columns: 1fr 1fr; gap: 6px;
      }
      .mr-cell {
        display: flex; flex-direction: column; gap: 4px;
        padding: 6px; border-radius: var(--radius-md);
        background: var(--s1); border: 1px solid var(--b1);
        transition: all var(--t-fast);
      }
      .mr-cell.joined {
        background: rgba(129,140,248,0.06); border-color: var(--mp-border);
      }
      .mr-cell-top {
        display: flex; align-items: center; gap: 6px;
      }
      .mr-icon-btn {
        width: 28px; height: 28px; border-radius: var(--radius-sm);
        background: var(--s2); border: 1px solid var(--b1);
        display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        cursor: pointer; padding: 0; outline: none;
        transition: all var(--t-fast);
        -webkit-tap-highlight-color: transparent;
        color: var(--t4);
      }
      .mr-icon-btn ha-icon {
        display: flex; align-items: center; justify-content: center;
        --mdc-icon-size: 14px;
      }
      @media (hover: hover) and (pointer: fine) {
        .mr-icon-btn:hover { background: var(--s3); border-color: var(--b2); color: var(--t2); }
      }
      @media (pointer: coarse) { .mr-icon-btn:active { animation: bounce 0.3s ease; } }
      @media (hover: hover) and (pointer: fine) { .mr-icon-btn:active { transform: scale(0.96); } }
      .mr-icon-btn:focus-visible { outline: 2px solid rgba(255,255,255,0.25); outline-offset: -2px; }
      .mr-cell.joined .mr-icon-btn {
        background: var(--mp-bg); border-color: var(--mp-border); color: var(--mp-color);
      }

      .mr-info { flex: 1; min-width: 0; }
      .mr-name {
        font-size: 10px; font-weight: 600; color: var(--t3);
        white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
      }
      .mr-cell.joined .mr-name { color: var(--t2); }
      .mr-coordinator {
        font-size: 7px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.4px;
        color: var(--mp-sub);
      }

      /* Multiroom volume slider */
      .mr-vol-slider {
        position: relative; width: 100%; height: 20px;
        border-radius: 6px; background: var(--s2);
        border: 1px solid var(--b1); overflow: hidden; cursor: pointer;
        touch-action: none; user-select: none; -webkit-user-select: none;
      }
      .mr-vol-fill {
        position: absolute; top: 0; left: 0; height: 100%;
        border-radius: inherit; pointer-events: none;
        background: linear-gradient(90deg, rgba(129,140,248,0.08), rgba(129,140,248,0.18));
        transition: width var(--t-fast);
      }
      .mr-cell.joined .mr-vol-fill {
        background: linear-gradient(90deg, rgba(129,140,248,0.12), rgba(129,140,248,0.25));
      }
      .mr-vol-val {
        position: absolute; top: 50%; right: 6px; transform: translateY(-50%);
        font-size: 8px; font-weight: 600; color: var(--t4); pointer-events: none;
        font-variant-numeric: tabular-nums;
      }
      .mr-cell.joined .mr-vol-val { color: var(--mp-sub); }
      .mr-vol-icon {
        position: absolute; top: 0; bottom: 0; left: 6px;
        display: flex; align-items: center;
        pointer-events: none;
      }
      .mr-vol-icon ha-icon {
        display: flex; align-items: center; justify-content: center;
        --mdc-icon-size: 11px; color: var(--t4);
      }
      .mr-cell.joined .mr-vol-icon ha-icon { color: var(--mp-sub); }

      /* ── Segmented control ── */
      .segmented {
        display: inline-flex; gap: 0;
        border-radius: 12px; background: var(--s1);
        border: 1px solid var(--b1); padding: 3px;
        margin-bottom: 8px; width: 100%;
      }
      .seg-btn {
        flex: 1;
        padding: 7px 0; border-radius: 9px;
        font-family: inherit; font-size: 11px; font-weight: 600;
        color: var(--t3); cursor: pointer; transition: all var(--t-fast);
        border: none; background: transparent; outline: none;
        -webkit-tap-highlight-color: transparent;
      }
      .seg-btn.active {
        background: var(--s4); color: var(--t1);
        box-shadow: 0 1px 4px rgba(0,0,0,0.2);
      }
      @media (hover: hover) and (pointer: fine) {
        .seg-btn:hover:not(.active) { color: var(--t2); }
      }
      .seg-btn:focus-visible { outline: 2px solid rgba(255,255,255,0.25); outline-offset: -2px; }

      /* ── Queue tab ── */
      .queue-loading, .queue-empty {
        text-align: center;
        padding: 20px 0;
        font-size: 11px;
        color: var(--t3);
        font-weight: 500;
      }
      .queue-list {
        max-height: 280px;
        overflow-y: auto;
        scrollbar-width: none;
      }
      .queue-list::-webkit-scrollbar { display: none; }
      .queue-item {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 6px 4px;
      }
      .queue-num {
        width: 20px;
        flex-shrink: 0;
        font-size: 11px;
        font-weight: 500;
        color: var(--t4);
        text-align: center;
      }
      .queue-info {
        flex: 1;
        min-width: 0;
        display: flex;
        flex-direction: column;
        overflow: hidden;
      }
      .queue-title {
        font-size: 12px;
        font-weight: 500;
        color: var(--t1);
        overflow: hidden;
        white-space: nowrap;
      }
      .queue-artist {
        font-size: 10px;
        color: var(--t3);
      }
      .queue-badge {
        font-size: 9px;
        padding: 1px 5px;
        border-radius: var(--radius-sm);
        background: var(--s2);
        color: var(--t2);
        flex-shrink: 0;
      }
      .queue-item .btn-icon {
        width: 24px; height: 24px;
        border-radius: var(--radius-sm);
        background: transparent; border: none;
        display: flex; align-items: center; justify-content: center;
        cursor: pointer; padding: 0; outline: none;
        color: var(--t3); flex-shrink: 0;
        transition: color var(--t-fast);
        -webkit-tap-highlight-color: transparent;
      }
      .queue-item .btn-icon ha-icon {
        display: flex; align-items: center; justify-content: center;
        --mdc-icon-size: 16px;
      }
      @media (hover: hover) and (pointer: fine) {
        .queue-item .btn-icon:hover { color: var(--t1); }
      }
      .queue-item .btn-icon:focus-visible { outline: 2px solid rgba(255,255,255,0.25); outline-offset: -2px; }
      .queue-remove { opacity: 0.4; --mdc-icon-size: 14px; }
      @media (hover: hover) and (pointer: fine) {
        .queue-remove:hover { opacity: 1; color: var(--c-alert, #ef4444) !important; }
      }
      @media (pointer: coarse) { .queue-remove:active { animation: bounce 0.3s ease; } }
    `,
  ];
}

try { customElements.define('glass-media-card', GlassMediaCard); } catch { /* scoped registry */ }
