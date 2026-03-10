import { html, css, nothing, type PropertyValues, type TemplateResult } from 'lit';
import { property, state } from 'lit/decorators.js';
import {
  BaseCard,
  BackendService,
  getAreaEntities,
  type LovelaceCardConfig,
  type HassEntity,
} from '@glass-cards/base-card';
import { glassTokens, glassMixin, marqueeMixin, marqueeText, bounceMixin } from '@glass-cards/ui-core';
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
  @state() private _flashIcon: string | null = null;
  @state() private _mediaConfig: MediaBackendConfig = {
    extra_entities: {},
    show_header: true,
  };
  @state() private _configLoaded = false;
  @state() private _roomIndex = 0;

  private _backend?: BackendService;
  private _loadVersion = 0;
  private _configLoadingInProgress = false;
  private _playersCache: MediaPlayerInfo[] | null = null;
  private _playersCacheKey = '';
  private _volumeThrottles = new Map<string, number>();
  private _progressTimer = 0;
  private _flashTimer = 0;
  private _lpTimer = 0;
  private _lpFired = false;
  private _swipeFired = false;
  private _pointerStart = { x: 0, y: 0, t: 0 };

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
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._backend = undefined;
    this._volumeThrottles.clear();
    if (this._progressTimer) clearInterval(this._progressTimer);
    if (this._flashTimer) clearTimeout(this._flashTimer);
    if (this._lpTimer) clearTimeout(this._lpTimer);
  }

  protected updated(changedProps: PropertyValues): void {
    super.updated(changedProps);
    if (changedProps.has('hass') && this.hass && !this._backend) {
      this._backend = new BackendService(this.hass);
      this._loadConfig();
    }
    // Start/stop progress timer based on playback state
    this._syncProgressTimer();
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
          return priority(a.state) - priority(b.state);
        });
    }

    const areaId = this.areaId!;
    const extraIds = this._mediaConfig.extra_entities[areaId] || [];
    const cacheKey = `${areaId}:${JSON.stringify(extraIds)}`;
    if (this._playersCache && this._playersCacheKey === cacheKey) {
      return this._playersCache.map((p) => {
        const entity = this.hass!.states[p.entityId];
        return entity ? getMediaInfo(entity) : p;
      });
    }

    const entities = this.hass.entities ? getAreaEntities(areaId, this.hass.entities, this.hass.devices) : [];
    const areaPlayerIds = entities
      .filter((e) => e.entity_id.startsWith('media_player.'))
      .map((e) => e.entity_id);

    const allIds = [...new Set([...areaPlayerIds, ...extraIds])];
    const players = allIds
      .map((id) => this.hass!.states[id])
      .filter((e): e is HassEntity => !!e)
      .map(getMediaInfo);

    this._playersCache = players;
    this._playersCacheKey = cacheKey;
    return players;
  }

  private _findMaster(players: MediaPlayerInfo[]): MediaPlayerInfo | null {
    return players.find((p) => isPlaying(p.state)) || players.find((p) => isActive(p.state)) || null;
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

    // Deduplicate: if a speaker is a group member, only keep the coordinator
    const seen = new Set<string>();
    const rooms: MediaPlayerInfo[] = [];
    for (const p of allPlaying) {
      if (seen.has(p.entityId)) continue;
      // Mark all group members as seen
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

  /** Unjoin speaker from any existing group first, then join to our coordinator */
  private async _smartJoin(coordinatorId: string, speakerId: string): Promise<void> {
    if (!this.hass) return;
    const entity = this.hass.states[speakerId];
    if (!entity) return;
    const members = entity.attributes.group_members as string[] | undefined;
    // If speaker is in an existing group (not alone), unjoin first
    if (members && members.length > 1) {
      this._unjoinGroup(speakerId);
      // Small delay for unjoin to propagate before joining new group
      await new Promise((r) => setTimeout(r, 500));
    }
    this._joinGroup(coordinatorId, speakerId);
  }

  /* ── Flash overlay ── */

  private _flash(icon: string): void {
    if (this._flashTimer) clearTimeout(this._flashTimer);
    this._flashIcon = icon;
    this._flashTimer = window.setTimeout(() => { this._flashIcon = null; }, 300);
  }

  /* ── Gesture handlers (tap / long-press on hero) ── */

  private _onHeroPointerDown(e: PointerEvent, _master: MediaPlayerInfo): void {
    if ((e.target as HTMLElement).closest('button')) return;
    this._pointerStart = { x: e.clientX, y: e.clientY, t: Date.now() };
    this._lpFired = false;
    this._swipeFired = false;
    this._lpTimer = window.setTimeout(() => {
      this._lpFired = true;
      this._foldOpen = !this._foldOpen;
      // Scroll card into view when fold opens
      if (this._foldOpen) {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            const wrap = this.renderRoot?.querySelector('.dash-wrap') as HTMLElement | null;
            wrap?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          });
        });
      }
    }, 500);
  }

  private _onHeroPointerMove(e: PointerEvent): void {
    if (this._lpFired || this._swipeFired) return;
    const dx = e.clientX - this._pointerStart.x;
    const dy = e.clientY - this._pointerStart.y;
    if (Math.abs(dx) > 15 || Math.abs(dy) > 15) {
      clearTimeout(this._lpTimer);
    }
  }

  private _onHeroPointerUp(e: PointerEvent, master: MediaPlayerInfo, roomCount: number): void {
    clearTimeout(this._lpTimer);
    if (this._lpFired) return;
    const dx = e.clientX - this._pointerStart.x;
    const elapsed = Date.now() - this._pointerStart.t;

    // Swipe detection (dashboard only, multiple rooms)
    if (this.isDashboard && roomCount > 1 && Math.abs(dx) > 50 && elapsed < 500) {
      this._swipeFired = true;
      this._foldOpen = false; // close fold on room switch
      if (dx < 0) {
        // Swipe left → next room
        this._roomIndex = (this._roomIndex + 1) % roomCount;
      } else {
        // Swipe right → previous room
        this._roomIndex = (this._roomIndex - 1 + roomCount) % roomCount;
      }
      return;
    }

    // Tap → play/pause
    if (elapsed < 300 && Math.abs(dx) < 10 && !(e.target as HTMLElement).closest('button')) {
      this._togglePlayPause(master);
      this._flash(isPlaying(master.state) ? 'mdi:pause' : 'mdi:play');
    }
  }

  private _onHeroPointerCancel(): void {
    clearTimeout(this._lpTimer);
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
    const onUp = (evt: PointerEvent) => {
      bar.removeEventListener('pointermove', onMove);
      bar.removeEventListener('pointerup', onUp);
      fill.style.transition = '';
      thumb.style.opacity = '';
      const r = bar.getBoundingClientRect();
      const pct = Math.max(0, Math.min(100, ((evt.clientX - r.left) / r.width) * 100));
      this._seekProgress(entityId, duration, pct);
    };

    bar.addEventListener('pointermove', onMove);
    bar.addEventListener('pointerup', onUp);
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
    const onUp = () => {
      bar.removeEventListener('pointermove', onMove);
      bar.removeEventListener('pointerup', onUp);
    };

    bar.addEventListener('pointermove', onMove);
    bar.addEventListener('pointerup', onUp);
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
    const onUp = () => {
      bar.removeEventListener('pointermove', onMove);
      bar.removeEventListener('pointerup', onUp);
    };

    bar.addEventListener('pointermove', onMove);
    bar.addEventListener('pointerup', onUp);
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
        <div class="dash-hero"
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
          ${!master.albumArt ? html`<div class="dash-deco"></div>` : nothing}

          <div class="dash-content">
            <!-- Top bar: speaker badge + group badge (glass pills) -->
            <div class="dash-top">
              <div class="dash-speaker glass-pill">
                <ha-icon .icon=${master.icon || 'mdi:speaker'}></ha-icon>
                <span>${marqueeText(master.name, 16)}</span>
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
                  <div class="dash-track-title">${master.title}</div>
                ` : nothing}
                ${master.artist ? html`
                  <div class="dash-track-artist">${master.artist}</div>
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

          <!-- Flash overlay -->
          <div class="dash-flash ${this._flashIcon ? 'visible' : ''}">
            <div class="dash-flash-circle">
              <ha-icon .icon=${this._flashIcon || 'mdi:play'}></ha-icon>
            </div>
          </div>

          <!-- Navigation arrows (desktop hover, multi-room) -->
          ${this.isDashboard && roomCount > 1 ? html`
            <button class="dash-nav-arrow dash-nav-left" aria-label="Previous room"
              @click=${(e: Event) => { e.stopPropagation(); this._foldOpen = false; this._roomIndex = (this._roomIndex - 1 + roomCount) % roomCount; }}>
              <ha-icon .icon=${'mdi:chevron-left'}></ha-icon>
            </button>
            <button class="dash-nav-arrow dash-nav-right" aria-label="Next room"
              @click=${(e: Event) => { e.stopPropagation(); this._foldOpen = false; this._roomIndex = (this._roomIndex + 1) % roomCount; }}>
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

    // Fallback: any groupable speaker that is playing
    return groupablePlayers.find((p) => isPlaying(p.state)) || null;
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
    if (this._foldOpen) this._foldOpen = false;
  }

  /* ── Main render ── */

  render() {
    void this._lang;
    if (!this.hass) return nothing;
    if (!this._configLoaded) return nothing;

    const showHeader = this._mediaConfig.show_header;

    if (this.isDashboard) {
      const rooms = this._getActiveRooms();
      if (rooms.length === 0) return nothing;

      // Clamp index if rooms changed
      if (this._roomIndex >= rooms.length) this._roomIndex = 0;
      const master = rooms[this._roomIndex];

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
                @click=${(e: Event) => { e.stopPropagation(); this._roomIndex = i; this._foldOpen = false; }}>
              </button>
            `)}
          </div>
        ` : nothing}
      `;
    }

    // Room mode — only show if something is playing/paused in this room
    const players = this._getPlayers();
    const master = this._findMaster(players);
    if (!master || !isActive(master.state)) return nothing;

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
    css`
      :host {
        display: block;
        width: 100%;
        max-width: 500px;
        margin: 0 auto;
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
        padding: 0 6px; margin-bottom: 6px;
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
      @media (hover: hover) { .dash-hero:hover { border-color: var(--b3); } }

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

      /* ── Gradient overlay for readability ── */
      .dash-gradient {
        position: absolute; inset: 0; pointer-events: none; z-index: 1;
        background: linear-gradient(
          to bottom,
          rgba(0,0,0,0.15) 0%,
          rgba(0,0,0,0.05) 30%,
          rgba(0,0,0,0.25) 55%,
          rgba(0,0,0,0.7) 100%
        );
      }

      /* ── Decorative shapes (no-artwork fallback) ── */
      .dash-deco {
        position: absolute; inset: 0; pointer-events: none; z-index: 0; overflow: hidden;
      }
      .dash-deco::before {
        content: ''; position: absolute;
        width: 200px; height: 200px; border-radius: 50%;
        top: -60px; right: -40px;
        background: radial-gradient(circle, rgba(255,255,255,0.04), transparent 70%);
      }
      .dash-deco::after {
        content: ''; position: absolute;
        width: 160px; height: 160px; border-radius: 50%;
        bottom: -40px; left: -30px;
        background: radial-gradient(circle, rgba(255,255,255,0.02), transparent 70%);
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
        background: rgba(0,0,0,0.35);
        border: 1px solid rgba(255,255,255,0.08);
        box-shadow: 0 2px 8px rgba(0,0,0,0.25);
      }

      /* ── Glass panel (bottom info card) ── */
      .glass-panel {
        border-radius: var(--radius-lg);
        backdrop-filter: blur(20px) saturate(1.4);
        -webkit-backdrop-filter: blur(20px) saturate(1.4);
        background: linear-gradient(135deg, rgba(0,0,0,0.3), rgba(0,0,0,0.2));
        border: 1px solid rgba(255,255,255,0.06);
        box-shadow:
          0 4px 16px rgba(0,0,0,0.2),
          inset 0 1px 0 rgba(255,255,255,0.05);
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
        filter: drop-shadow(0 0 3px rgba(255,255,255,0.6));
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
        white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
      }
      .dash-track-artist {
        font-size: 12px; font-weight: 500; color: rgba(255,255,255,0.65);
        white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
      }

      /* ── Time row ── */
      .dash-time-row {
        display: flex; justify-content: space-between; align-items: center;
      }
      .dash-track-time {
        font-size: 9px; font-weight: 500; color: rgba(255,255,255,0.35);
        font-variant-numeric: tabular-nums;
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
      @media (hover: hover) {
        .dash-progress:hover { height: 6px; }
        .dash-progress:hover .dash-progress-thumb { opacity: 1; }
      }
      .dash-progress-fill {
        position: absolute; top: 0; left: 0; height: 100%;
        border-radius: inherit;
        background: var(--mp-color);
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
        color: var(--t3);
      }
      .transport-btn ha-icon {
        display: flex; align-items: center; justify-content: center;
        --mdc-icon-size: 18px;
      }
      @media (hover: hover) {
        .transport-btn:hover { background: var(--s2); color: var(--t2); }
      }
      .transport-btn:focus-visible { outline: 2px solid rgba(255,255,255,0.25); outline-offset: -2px; }
      @media (hover: none) { .transport-btn:active { animation: bounce 0.3s ease; } }
      @media (hover: hover) { .transport-btn:active { transform: scale(0.96); } }
      .transport-btn.active { color: var(--mp-color); }

      .transport-skip { width: 40px; height: 40px; }
      .transport-skip ha-icon { --mdc-icon-size: 26px; }

      .transport-main {
        width: 52px; height: 52px; border-radius: 16px;
        background: var(--mp-bg); border: 1px solid var(--mp-border);
        color: var(--mp-color);
      }
      .transport-main ha-icon { --mdc-icon-size: 28px; }
      @media (hover: hover) {
        .transport-main:hover {
          background: rgba(129,140,248,0.18); border-color: rgba(129,140,248,0.25);
        }
      }

      /* ── Flash overlay ── */
      .dash-flash {
        position: absolute; inset: 0; z-index: 10;
        display: flex; align-items: center; justify-content: center;
        opacity: 0; pointer-events: none;
        transition: opacity 0.12s;
      }
      .dash-flash.visible { opacity: 1; }
      .dash-flash-circle {
        width: 72px; height: 72px; border-radius: 50%;
        background: var(--s3); backdrop-filter: blur(16px);
        border: 1px solid var(--b2);
        display: flex; align-items: center; justify-content: center;
        transform: scale(0.8); transition: transform 0.15s var(--ease-out, cubic-bezier(0.16, 1, 0.3, 1));
      }
      .dash-flash.visible .dash-flash-circle { transform: scale(1); }
      .dash-flash-circle ha-icon {
        display: flex; align-items: center; justify-content: center;
        --mdc-icon-size: 32px; color: var(--t1);
      }

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
      @media (hover: hover) {
        .dash-nav-left:hover, .dash-nav-right:hover {
          background: linear-gradient(90deg, rgba(0,0,0,0.25), transparent);
        }
        .dash-nav-right:hover {
          background: linear-gradient(270deg, rgba(0,0,0,0.25), transparent);
        }
        .dash-nav-arrow:hover ha-icon { color: #fff; }
        .dash-hero:hover .dash-nav-arrow { opacity: 1; }
      }
      @media (hover: none) { .dash-nav-arrow:active { animation: bounce 0.3s ease; } }
      @media (hover: hover) { .dash-nav-arrow:active { transform: scale(0.95); } }

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
      @media (hover: hover) { .dash-dot:hover { background: rgba(255,255,255,0.5); } }
      @media (hover: none) { .dash-dot:active { animation: bounce 0.3s ease; } }

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
      @media (hover: hover) { .volume-btn:hover { color: var(--t2); } }
      .volume-btn:focus-visible { outline: 2px solid rgba(255,255,255,0.25); outline-offset: -2px; }
      @media (hover: none) { .volume-btn:active { animation: bounce 0.3s ease; } }
      @media (hover: hover) { .volume-btn:active { transform: scale(0.96); } }
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
      @media (hover: hover) {
        .chip:hover { background: var(--s3); color: var(--t2); border-color: var(--b3); }
      }
      .chip:focus-visible { outline: 2px solid rgba(255,255,255,0.25); outline-offset: -2px; }
      @media (hover: none) { .chip:active { animation: bounce 0.3s ease; } }
      @media (hover: hover) { .chip:active { transform: scale(0.96); } }
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
      @media (hover: hover) {
        .mr-icon-btn:hover { background: var(--s3); border-color: var(--b2); color: var(--t2); }
      }
      @media (hover: none) { .mr-icon-btn:active { animation: bounce 0.3s ease; } }
      @media (hover: hover) { .mr-icon-btn:active { transform: scale(0.96); } }
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
    `,
  ];
}

try { customElements.define('glass-media-card', GlassMediaCard); } catch { /* scoped registry */ }
