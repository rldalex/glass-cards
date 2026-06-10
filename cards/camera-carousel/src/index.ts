import { html, nothing, type PropertyValues, type TemplateResult } from 'lit';
import { property, state } from 'lit/decorators.js';
import {
  BaseCard,
  BackendService,
  getAreaEntities,
  isEntityVisibleNow,
  type EntityScheduleMap,
  type HassEntity,
  type EntityRegistryEntry,
} from '@glass-cards/base-card';
import './editor';
import { glassTokens, hostMixin, glassMixin, foldMixin, marqueeMixin, bounceMixin, tappableMixin } from '@glass-cards/ui-core';
import { t } from '@glass-cards/i18n';

import {
  F,
  AI_ICONS,
  AI_DETECTION,
  discoverCompanions,
  dedupeCamerasPerDevice,
  ringExpiry,
  cameraStateText,
  cameraIcon,
  type CameraInfo,
  type CameraBackendConfig,
  type CameraRoomConfig,
} from './camera-utils';
import { cameraCarouselStyles } from './styles';

class GlassCameraCarouselCard extends BaseCard {
  static getConfigElement() {
    return document.createElement('glass-camera-carousel-card-editor');
  }

  getCardSize() {
    return 3;
  }

  @property() areaId?: string;

  @state() private _carouselIndex = 0;
  @state() private _liveIds = new Set<string>();
  @state() private _foldOpen = false;
  @state() private _isFullscreen = false;
  /** Dev-only : forces the fullscreen overlay rendering without requesting native fullscreen. */
  @property({ type: Boolean, attribute: 'preview-fullscreen' }) previewFullscreen = false;
  private _fsEscHandler?: (e: KeyboardEvent) => void;

  private _backend: BackendService | undefined;
  private _camConfig: CameraBackendConfig | null = null;
  private _roomConfig: CameraRoomConfig | null = null;
  private _configLoaded = false;
  private _roomConfigLoaded = false;
  private _schedules: EntityScheduleMap | null = null;
  private _schedulesLoaded = false;
  private _loadVersion = 0;
  private _lastAreaId: string | undefined;

  // Swipe state
  private _touchStartX = 0;
  private _touchDelta = 0;
  private _isSwiping = false;
  private _trackEl: HTMLElement | null = null;

  // Auto-cycle
  private _cycleTimer?: ReturnType<typeof setInterval>;
  // Timestamp refresh (stream overlay clock)
  private _timestampTimer?: ReturnType<typeof setInterval>;
  // Doorbell ring fade-out (one-shot)
  private _ringTimer?: ReturnType<typeof setTimeout>;

  // Camera cache
  private _cachedCameraIds: string[] = [];
  private _cachedCamerasKey = '';

  connectedCallback() {
    super.connectedCallback();
    this._listen('camera-carousel-config-changed', () => {
      this._configLoaded = false;
      this._cachedCamerasKey = '';
      this._loadConfig();
    });
    this._listen('room-config-changed', (payload) => {
      if (this.areaId && payload.areaId === this.areaId) {
        this._roomConfig = null;
        this._roomConfigLoaded = false;
        this._cachedCamerasKey = '';
        this._loadRoomConfig();
      }
    });
    this._listen('dashboard-config-changed', () => this.requestUpdate());
    this._listen('schedule-changed', () => {
      this._schedulesLoaded = false;
      this._loadSchedules();
    });
    // Refresh stream overlay timestamp every 60s
    this._timestampTimer = setInterval(() => this.requestUpdate(), 60_000);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._backend = undefined;
    this._configLoaded = false;
    this._roomConfigLoaded = false;
    this._schedulesLoaded = false;
    // Streams manually started by the user stop on unmount; do not auto-restart
    // them on the next mount.
    this._liveIds = new Set();
    this._clearCycleTimer();
    this._clearTimestampTimer();
    this._clearRingTimer();
    if (this._fsEscHandler) {
      document.removeEventListener('keydown', this._fsEscHandler);
      this._fsEscHandler = undefined;
    }
    if (this._isFullscreen) {
      document.body.style.overflow = this._prevBodyOverflow ?? '';
      this._prevBodyOverflow = null;
      this._isFullscreen = false;
    }
    // NOTE: _companionCache is module-scoped and shared across card instances.
    // Don't clear it here — would wipe entries for other cards still mounted.
    // Entries auto-invalidate via stateKey (states change → cache miss).
  }

  getTrackedEntityIds(): string[] {
    if (!this.hass) return [];
    const hass = this.hass;
    // Track all camera entities + companion entities
    return this._getCameraIds().flatMap((eid) => {
      const companions = discoverCompanions(eid, hass.states, hass.entities);
      return [
        eid,
        companions.motionSensorId,
        companions.recordSwitchId,
        companions.sirenId,
        companions.floodlightId,
        companions.autoTrackId,
        companions.doorbellEventId,
        companions.visitorSensorId,
        companions.privacySwitchId,
        companions.detectSwitchId,
        companions.snapshotsSwitchId,
        companions.isDarkSensorId,
        companions.batterySensorId,
        companions.batteryLowSensorId,
        companions.sleepSensorId,
        companions.ptzUpId,
        companions.ptzDownId,
        companions.ptzLeftId,
        companions.ptzRightId,
        companions.ptzZoomInId,
        companions.ptzZoomOutId,
      ].filter(Boolean) as string[];
    });
  }

  updated(changedProps: PropertyValues) {
    super.updated(changedProps);

    if (changedProps.has('hass') && this.hass) {
      // Invalidate backend on WS reconnect and reload everything.
      if (this._backend && this._backend.connection !== this.hass.connection) {
        this._backend = undefined;
        this._configLoaded = false;
        this._roomConfigLoaded = false;
        this._schedulesLoaded = false;
        this._roomConfig = null;
        this._cachedCamerasKey = '';
      }
    }

    if (this.areaId !== this._lastAreaId) {
      this._lastAreaId = this.areaId;
      this._carouselIndex = 0;
      this._cachedCamerasKey = '';
      this._configLoaded = false;
      this._roomConfig = null;
      this._roomConfigLoaded = false;
      this._liveIds = new Set();
      this._reolinkCamCache.clear();
    }

    if (this.hass && !this._configLoaded) {
      this._loadConfig();
    }
    if (this.hass && !this._schedulesLoaded) {
      this._loadSchedules();
    }
    if (this.hass && this.areaId && !this._roomConfigLoaded) {
      this._loadRoomConfig();
    }
  }

  private async _loadConfig() {
    if (!this.hass || this._configLoaded) return;
    this._configLoaded = true;
    const version = ++this._loadVersion;
    try {
      if (!this._backend) this._backend = new BackendService(this.hass);
      const resp = await this._backend.send<{ camera_carousel: CameraBackendConfig }>('get_config');
      if (version !== this._loadVersion) return;
      this._camConfig = {
        show_header: resp.camera_carousel?.show_header ?? true,
        entity_order: resp.camera_carousel?.entity_order ?? [],
        hidden_entities: resp.camera_carousel?.hidden_entities ?? [],
        auto_cycle: resp.camera_carousel?.auto_cycle ?? false,
        cycle_interval: resp.camera_carousel?.cycle_interval ?? 10,
        entity_aspect_ratios: resp.camera_carousel?.entity_aspect_ratios ?? {},
      };
      this._setupCycleTimer();
      this.requestUpdate();
    } catch {
      // Retry on the next hass tick.
      if (version === this._loadVersion) this._configLoaded = false;
    }
  }

  private async _loadSchedules() {
    if (!this.hass || this._schedulesLoaded) return;
    this._schedulesLoaded = true;
    try {
      if (!this._backend) this._backend = new BackendService(this.hass);
      const result = await this._backend.send<EntityScheduleMap>('get_schedules');
      this._schedules = result;
      this._cachedCamerasKey = '';
      this.requestUpdate();
    } catch {
      this._schedulesLoaded = false;
    }
  }

  private async _loadRoomConfig() {
    if (!this.hass || !this.areaId || this._roomConfigLoaded) return;
    this._roomConfigLoaded = true;
    const targetArea = this.areaId;
    try {
      if (!this._backend) this._backend = new BackendService(this.hass);
      const resp = await this._backend.send<{ hidden_entities?: string[]; entity_order?: string[] } | null>(
        'get_room', { area_id: targetArea },
      );
      if (this.areaId !== targetArea) return;
      this._roomConfig = {
        hidden_entities: resp?.hidden_entities ?? [],
        entity_order: resp?.entity_order ?? [],
      };
      this._cachedCamerasKey = '';
      this.requestUpdate();
    } catch {
      if (this.areaId === targetArea) this._roomConfigLoaded = false;
    }
  }

  // — Camera discovery —

  private _getCameraIds(): string[] {
    if (!this.hass) return [];

    // Collect raw camera entity ids
    let ids: string[];
    if (this.areaId) {
      ids = getAreaEntities(this.areaId, this.hass.entities, this.hass.devices)
        .filter((e) => e.entity_id.startsWith('camera.'))
        .map((e) => e.entity_id);
    } else {
      ids = Object.keys(this.hass.states).filter((eid) => eid.startsWith('camera.'));
    }

    // Filter out hidden entities (global + per-room) and schedule-hidden ones
    const hiddenSet = new Set(this._camConfig?.hidden_entities ?? []);
    if (this.areaId && this._roomConfig) {
      for (const id of this._roomConfig.hidden_entities ?? []) hiddenSet.add(id);
    }
    ids = ids.filter((eid) => !hiddenSet.has(eid) && isEntityVisibleNow(eid, this._schedules));

    // Dedupe multiple streams per device (Reolink Fluent/Clear/Balanced/Snapshots).
    ids = dedupeCamerasPerDevice(ids, this.hass.entities);

    // Cheap fingerprint: skip expensive sort if camera set + alert states unchanged
    const cheapKey = ids.length + ':' + ids.map((eid) => {
      const s = this.hass?.states[eid];
      return s ? `${eid}:${s.last_updated}` : eid;
    }).join(',');
    if (cheapKey === this._cachedCamerasKey) return this._cachedCameraIds;

    // Order: per-room order wins in room mode, otherwise global order + alert sort
    const roomOrder = this.areaId ? (this._roomConfig?.entity_order ?? []) : [];
    if (this.areaId && roomOrder.length) {
      const ordered = roomOrder.filter((eid) => ids.includes(eid));
      const remaining = ids.filter((eid) => !ordered.includes(eid));
      ids = [...ordered, ...remaining];
    } else {
      const configOrder = this._camConfig?.entity_order ?? [];
      if (configOrder.length) {
        const ordered = configOrder.filter((eid) => ids.includes(eid));
        const remaining = ids.filter((eid) => !ordered.includes(eid));
        if (!this.areaId) {
          const states = this.hass.states;
          const entities = this.hass.entities;
          remaining.sort((a, b) => this._latestAlertTimestamp(b, states, entities) - this._latestAlertTimestamp(a, states, entities));
        }
        ids = [...ordered, ...remaining];
      } else if (!this.areaId) {
        const states = this.hass.states;
        const entities = this.hass.entities;
        ids.sort((a, b) => this._latestAlertTimestamp(b, states, entities) - this._latestAlertTimestamp(a, states, entities));
      }
    }

    this._cachedCamerasKey = cheapKey;
    this._cachedCameraIds = ids;
    if (this._carouselIndex >= ids.length) {
      this._carouselIndex = Math.max(0, ids.length - 1);
    }
    return this._cachedCameraIds;
  }

  /** Get the most recent last_changed timestamp among AI detection binary_sensors for a camera. */
  private _latestAlertTimestamp(
    cameraEntityId: string,
    states: Record<string, HassEntity>,
    entities: Record<string, EntityRegistryEntry>,
  ): number {
    const camEntry = entities[cameraEntityId];
    if (!camEntry?.device_id) return 0;
    const deviceId = camEntry.device_id;
    let latest = 0;
    for (const [eid, entry] of Object.entries(entities)) {
      if (entry.device_id !== deviceId || !eid.startsWith('binary_sensor.')) continue;
      // Check if this is an AI detection sensor
      const isAi = AI_DETECTION.some(([pattern]) => pattern.test(eid));
      if (!isAi) continue;
      const st = states[eid];
      if (!st) continue;
      const ts = new Date(st.last_changed).getTime();
      if (ts > latest) latest = ts;
    }
    return latest;
  }

  private _getCameraInfo(entityId: string): CameraInfo | null {
    if (!this.hass) return null;
    const entity = this.hass.states[entityId];
    if (!entity) return null;

    const features = (entity.attributes?.supported_features ?? 0) as number;
    const isOn = entity.state !== 'unavailable' && entity.attributes?.is_on !== false;
    const companions = discoverCompanions(entityId, this.hass.states, this.hass.entities);

    const isDoorbell = !!(companions.doorbellEventId || companions.visitorSensorId);
    const ringMs = isDoorbell
      ? ringExpiry(companions.doorbellEventId, companions.visitorSensorId, this.hass.states, Date.now())
      : 0;
    const privacyState = companions.privacySwitchId ? this.hass.states[companions.privacySwitchId]?.state : undefined;
    const isPrivacyOn = privacyState === 'on';

    return {
      entityId,
      entity,
      name: (entity.attributes?.friendly_name as string) || entityId.split('.')[1],
      state: entity.state,
      isOn,
      features,
      entityPicture: (entity.attributes?.entity_picture as string) ?? null,
      motionSensorId: companions.motionSensorId,
      motionDetectionSupported: entity.attributes?.motion_detection !== undefined,
      motionDetectionEnabled: entity.attributes?.motion_detection === true,
      hasMotion: companions.motionSensorId ? this.hass.states[companions.motionSensorId]?.state === 'on' : false,
      recordSwitchId: companions.recordSwitchId,
      isRecording: entity.state === 'recording' || (companions.recordSwitchId ? this.hass.states[companions.recordSwitchId]?.state === 'on' : false),
      sirenId: companions.sirenId,
      floodlightId: companions.floodlightId,
      autoTrackId: companions.autoTrackId,
      aiDetected: companions.aiDetected,
      icon: cameraIcon(entity, isDoorbell),
      isDoorbell,
      doorbellEventId: companions.doorbellEventId,
      visitorSensorId: companions.visitorSensorId,
      isRinging: ringMs > 0,
      ringExpiresInMs: ringMs,
      privacySwitchId: companions.privacySwitchId,
      isPrivacyOn,
      detectSwitchId: companions.detectSwitchId,
      isDetectOn: companions.detectSwitchId ? this.hass.states[companions.detectSwitchId]?.state === 'on' : false,
      snapshotsSwitchId: companions.snapshotsSwitchId,
      isSnapshotsOn: companions.snapshotsSwitchId ? this.hass.states[companions.snapshotsSwitchId]?.state === 'on' : false,
      isDarkSensorId: companions.isDarkSensorId,
      isDark: companions.isDarkSensorId ? this.hass.states[companions.isDarkSensorId]?.state === 'on' : false,
      batterySensorId: companions.batterySensorId,
      batteryLevel: this._readBatteryLevel(companions.batterySensorId),
      isBatteryLow: this._readBatteryLow(companions.batteryLowSensorId, companions.batterySensorId),
      sleepSensorId: companions.sleepSensorId,
      isSleeping: companions.sleepSensorId ? this.hass.states[companions.sleepSensorId]?.state === 'on' : false,
      hasPtz: !!(companions.ptzUpId || companions.ptzDownId || companions.ptzLeftId || companions.ptzRightId),
      ptzUpId: companions.ptzUpId,
      ptzDownId: companions.ptzDownId,
      ptzLeftId: companions.ptzLeftId,
      ptzRightId: companions.ptzRightId,
      ptzZoomInId: companions.ptzZoomInId,
      ptzZoomOutId: companions.ptzZoomOutId,
    };
  }

  /** mdi icon matching the battery level — empty/20/30/.../full + alert variants. */
  private _batteryIcon(level: number): string {
    if (level <= 10) return 'mdi:battery-alert-variant-outline';
    if (level >= 95) return 'mdi:battery';
    // mdi:battery-{10..90} in 10-step increments — round down to nearest 10.
    const step = Math.max(10, Math.min(90, Math.floor(level / 10) * 10));
    return `mdi:battery-${step}`;
  }

  /** Parse battery level (0-100) or null if unavailable / unknown. */
  private _readBatteryLevel(sensorId: string | null): number | null {
    if (!sensorId || !this.hass) return null;
    const raw = this.hass.states[sensorId]?.state;
    if (!raw || raw === 'unknown' || raw === 'unavailable') return null;
    const n = parseFloat(raw);
    return Number.isFinite(n) ? Math.max(0, Math.min(100, Math.round(n))) : null;
  }

  /** True if dedicated _battery_low sensor is ON, OR if battery level < 20%. */
  private _readBatteryLow(lowId: string | null, levelId: string | null): boolean {
    if (lowId && this.hass?.states[lowId]?.state === 'on') return true;
    const lvl = this._readBatteryLevel(levelId);
    return lvl !== null && lvl < 20;
  }

  // — Auto-cycle —

  private _setupCycleTimer() {
    this._clearCycleTimer();
    if (this._camConfig?.auto_cycle && this._getCameraIds().length > 1) {
      const interval = (this._camConfig.cycle_interval || 10) * 1000;
      this._cycleTimer = setInterval(() => {
        if (this._isSwiping) return;
        const ids = this._getCameraIds();
        if (ids.length > 1) {
          this._carouselIndex = (this._carouselIndex + 1) % ids.length;
          this.requestUpdate();
        }
      }, interval);
    }
  }

  private _clearCycleTimer() {
    if (this._cycleTimer) {
      clearInterval(this._cycleTimer);
      this._cycleTimer = undefined;
    }
  }

  private _clearTimestampTimer() {
    if (this._timestampTimer) {
      clearInterval(this._timestampTimer);
      this._timestampTimer = undefined;
    }
  }

  private _clearRingTimer() {
    if (this._ringTimer) {
      clearTimeout(this._ringTimer);
      this._ringTimer = undefined;
    }
  }

  /** Schedule a one-shot re-render to fade out the visitor badge when the ring window closes. */
  private _scheduleRingFadeOut(ms: number) {
    if (this._ringTimer) clearTimeout(this._ringTimer);
    this._ringTimer = setTimeout(() => {
      this._ringTimer = undefined;
      this.requestUpdate();
    }, Math.max(200, ms + 200));
  }

  // — Navigation —

  private _goTo(idx: number) {
    const ids = this._getCameraIds();
    if (!ids.length) return;
    this._carouselIndex = ((idx % ids.length) + ids.length) % ids.length;
    this._foldOpen = false;
    this._setupCycleTimer(); // Reset cycle timer on manual navigation
    this.requestUpdate();
  }

  private _prev() {
    this._goTo(this._carouselIndex - 1);
  }

  private _next() {
    this._goTo(this._carouselIndex + 1);
  }

  // — Swipe handlers —

  private _onPointerDown = (e: PointerEvent) => {
    if ((e.target as HTMLElement).closest('glass-icon-button, .carousel-nav')) return;
    this._touchStartX = e.clientX;
    this._touchDelta = 0;
    this._isSwiping = true;
    const viewport = e.currentTarget as HTMLElement;
    viewport.setPointerCapture(e.pointerId);
    this._trackEl = this.shadowRoot?.querySelector('.carousel-track') as HTMLElement;
    if (this._trackEl) this._trackEl.style.transition = 'none';
  };

  private _onPointerMove = (e: PointerEvent) => {
    if (!this._isSwiping) return;
    const track = this._trackEl ?? this.shadowRoot?.querySelector('.carousel-track') as HTMLElement | null;
    if (!track) return;
    this._trackEl = track;
    this._touchDelta = e.clientX - this._touchStartX;
    const viewport = e.currentTarget as HTMLElement;
    const vw = viewport.offsetWidth;
    const basePct = this._carouselIndex * 100;
    const deltaPct = (this._touchDelta / vw) * 100;
    this._trackEl.style.transform = `translateX(${-basePct + deltaPct}%)`;
  };

  private _onPointerUp = (e: PointerEvent) => {
    if (!this._isSwiping || !this._trackEl) return;
    this._isSwiping = false;
    this._trackEl.style.transition = '';
    const viewport = (e.currentTarget as HTMLElement);
    const threshold = viewport.offsetWidth * 0.2;
    if (this._touchDelta < -threshold) this._goTo(this._carouselIndex + 1);
    else if (this._touchDelta > threshold) this._goTo(this._carouselIndex - 1);
    else this._goTo(this._carouselIndex); // Snap back
    this._trackEl = null;
  };

  private _onPointerCancel = () => {
    if (!this._isSwiping || !this._trackEl) return;
    this._isSwiping = false;
    this._trackEl.style.transition = '';
    this._goTo(this._carouselIndex);
    this._trackEl = null;
  };

  // — Actions —

  private _togglePower(cam: CameraInfo) {
    if (!this.hass) return;
    const service = cam.isOn ? 'turn_off' : 'turn_on';
    this._safeCallService('camera', service, { entity_id: cam.entityId });
  }

  private _snapshot(cam: CameraInfo) {
    if (!this.hass) return;
    // Trigger more-info dialog for snapshot (file path required, best done in HA UI)
    const event = new CustomEvent('hass-more-info', { detail: { entityId: cam.entityId }, bubbles: true, composed: true });
    this.dispatchEvent(event);
  }

  private _toggleRecord(cam: CameraInfo) {
    if (!this.hass || !cam.recordSwitchId) return;
    const isOn = this.hass.states[cam.recordSwitchId]?.state === 'on';
    this._safeCallService('switch', isOn ? 'turn_off' : 'turn_on', { entity_id: cam.recordSwitchId });
  }

  private _toggleMotion(cam: CameraInfo) {
    if (!this.hass) return;
    const service = cam.motionDetectionEnabled ? 'disable_motion_detection' : 'enable_motion_detection';
    this._safeCallService('camera', service, { entity_id: cam.entityId });
  }

  private _toggleSiren(cam: CameraInfo) {
    if (!this.hass || !cam.sirenId) return;
    const isOn = this.hass.states[cam.sirenId]?.state === 'on';
    this._safeCallService('siren', isOn ? 'turn_off' : 'turn_on', { entity_id: cam.sirenId });
  }

  private _toggleFloodlight(cam: CameraInfo) {
    if (!this.hass || !cam.floodlightId) return;
    const isOn = this.hass.states[cam.floodlightId]?.state === 'on';
    this._safeCallService('light', isOn ? 'turn_off' : 'turn_on', { entity_id: cam.floodlightId });
  }

  private _toggleAutoTrack(cam: CameraInfo) {
    if (!this.hass || !cam.autoTrackId) return;
    const isOn = this.hass.states[cam.autoTrackId]?.state === 'on';
    this._safeCallService('switch', isOn ? 'turn_off' : 'turn_on', { entity_id: cam.autoTrackId });
  }

  private _togglePrivacy(cam: CameraInfo) {
    if (!this.hass || !cam.privacySwitchId) return;
    this._safeCallService('switch', cam.isPrivacyOn ? 'turn_off' : 'turn_on', { entity_id: cam.privacySwitchId });
  }

  private _toggleDetect(cam: CameraInfo) {
    if (!this.hass || !cam.detectSwitchId) return;
    this._safeCallService('switch', cam.isDetectOn ? 'turn_off' : 'turn_on', { entity_id: cam.detectSwitchId });
  }

  private _toggleSnapshots(cam: CameraInfo) {
    if (!this.hass || !cam.snapshotsSwitchId) return;
    this._safeCallService('switch', cam.isSnapshotsOn ? 'turn_off' : 'turn_on', { entity_id: cam.snapshotsSwitchId });
  }

  private _ptzPress(entityId: string | null) {
    if (!this.hass || !entityId) return;
    this._safeCallService('button', 'press', { entity_id: entityId });
  }

  // Cleared at area change; retained for name-prefix fallback bookkeeping (currently unused
  // but kept as a hook in case we re-enable service-based PTZ later).
  private _reolinkCamCache = new Map<string, boolean>();

  /** Pseudo-fullscreen — bypasses Shadow DOM quirks of the native Fullscreen API.
   *  Adds .fs-active class which pins the hero with position:fixed and z-index:99999.
   *  Saves/restores body.overflow so a parent dialog (HA more-info) still works after exit. */
  private _prevBodyOverflow: string | null = null;
  private _toggleFullscreen() {
    this._isFullscreen = !this._isFullscreen;
    if (this._isFullscreen) {
      this._prevBodyOverflow = document.body.style.overflow || '';
      document.body.style.overflow = 'hidden';
      this._fsEscHandler = (e: KeyboardEvent) => {
        if (e.key === 'Escape') this._toggleFullscreen();
      };
      document.addEventListener('keydown', this._fsEscHandler);
    } else {
      document.body.style.overflow = this._prevBodyOverflow ?? '';
      this._prevBodyOverflow = null;
      if (this._fsEscHandler) {
        document.removeEventListener('keydown', this._fsEscHandler);
        this._fsEscHandler = undefined;
      }
    }
  }

  private _startStream(entityId: string) {
    const next = new Set(this._liveIds);
    next.add(entityId);
    this._liveIds = next;
  }



  // — Render —

  render() {
    void this._lang;
    if (!this.hass) return nothing;

    const ids = this._getCameraIds();
    if (!ids.length) return nothing;

    const showHeader = this._camConfig?.show_header !== false;
    const currentCam = this._getCameraInfo(ids[this._carouselIndex]);

    // Schedule a fade-out re-render when any ring window is about to close.
    // We pick the soonest expiry across all cams so badges drop in time.
    let earliestRingMs = Infinity;
    for (const eid of ids) {
      const info = this._getCameraInfo(eid);
      if (info?.isRinging && info.ringExpiresInMs < earliestRingMs) {
        earliestRingMs = info.ringExpiresInMs;
      }
    }
    if (earliestRingMs !== Infinity) {
      this._scheduleRingFadeOut(earliestRingMs);
    } else if (this._ringTimer) {
      this._clearRingTimer();
    }

    const heroGesture = this._bindGesture({
      onTap: () => {
        const eid = ids[this._carouselIndex];
        if (eid && !this._liveIds.has(eid)) this._startStream(eid);
      },
      onLongPress: () => { this._isSwiping = false; this._trackEl = null; this._foldOpen = !this._foldOpen; },
      exclude: 'glass-icon-button, .fs-chip, .fs-back-btn, .fs-toggle-btn, .joystick, .jp',
    });

    return html`
      ${showHeader ? html`
        <div class="card-header">
          <div class="card-header-left">
            <span class="card-title">${t('camera.title')}</span>
          </div>
        </div>
      ` : nothing}
      <div class="cam-wrap ${this._foldOpen ? 'fold-open' : ''} ${this._heroPulseClass(currentCam)}">
        <div class="carousel-hero ${this._aspectClass(currentCam)} ${this.previewFullscreen ? 'fs-preview' : ''} ${this._isFullscreen ? 'fs-active' : ''}"
          role=${this._isFullscreen ? 'dialog' : nothing}
          aria-modal=${this._isFullscreen ? 'true' : nothing}
          aria-label=${this._isFullscreen ? (currentCam?.name ?? t('camera.fullscreen_aria')) : nothing}
          @pointerdown=${(e: PointerEvent) => { heroGesture.pointerdown(e); this._onPointerDown(e); }}
          @pointermove=${(e: PointerEvent) => { heroGesture.pointermove(e); this._onPointerMove(e); }}
          @pointerup=${(e: PointerEvent) => { heroGesture.pointerup(e); this._onPointerUp(e); }}
          @pointercancel=${() => { heroGesture.pointercancel(); this._onPointerCancel(); }}
          @contextmenu=${heroGesture.contextmenu}
        >
          <div class="tint" style="${this._tintStyle(currentCam)}"></div>
          <div class="carousel-track" style="transform:translateX(-${this._carouselIndex * 100}%)">
            ${ids.map((eid, idx) => this._renderSlide(eid, idx === this._carouselIndex))}
          </div>
          ${ids.length > 1 ? html`
            <glass-icon-button
              class="carousel-nav prev"
              size="md"
              .icon=${'mdi:chevron-left'}
              aria-label="${t('camera.prev_aria')}"
              @click=${this._prev}
            ></glass-icon-button>
            <glass-icon-button
              class="carousel-nav next"
              size="md"
              .icon=${'mdi:chevron-right'}
              aria-label="${t('camera.next_aria')}"
              @click=${this._next}
            ></glass-icon-button>
          ` : nothing}
          ${ids.length > 1 ? html`
            <div class="carousel-dots">
              ${ids.map((eid, idx) => this._renderDot(eid, idx))}
            </div>
          ` : nothing}
          ${currentCam ? this._renderFullscreenOverlay(currentCam) : nothing}
        </div>

        <!-- Connected fold -->
        <div class="ctrl-fold ${this._foldOpen ? 'open' : ''}">
          <div class="ctrl-fold-inner">
            <div class="fold-sep-top"></div>
            <div class="fold-panel">
              ${currentCam ? this._renderInfoBar(currentCam) : nothing}
              ${currentCam ? this._renderActions(currentCam) : nothing}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  /** Resolve aspect-ratio class for the hero. Config override wins over the doorbell heuristic. */
  private _aspectClass(cam: CameraInfo | null): string {
    if (!cam) return '';
    const override = this._camConfig?.entity_aspect_ratios?.[cam.entityId];
    switch (override) {
      case '16:9': return 'aspect-landscape';
      case '4:3':  return 'aspect-classic';
      case '1:1':  return 'aspect-square';
      case '3:4':  return 'aspect-portrait';
      // 'auto' or undefined → fall through to the doorbell heuristic
    }
    return cam.isDoorbell ? 'aspect-portrait' : '';
  }

  /** Border pulse class — visually flags ongoing events on the hero card. */
  private _heroPulseClass(cam: CameraInfo | null): string {
    if (!cam || !cam.isOn || cam.isPrivacyOn) return '';
    if (cam.isRinging) return 'pulse-ring';
    if (cam.isBatteryLow) return 'pulse-alert';
    if (cam.aiDetected.length > 0) return 'pulse-ai';
    if (cam.hasMotion) return 'pulse-motion';
    return '';
  }

  private _tintStyle(cam: CameraInfo | null): string {
    if (!cam) return 'opacity:0';
    if (cam.isRinging) {
      return `background:radial-gradient(ellipse at 50% 50%,var(--c-accent),transparent 70%);opacity:0.22`;
    }
    if (!cam.isOn || cam.state === 'idle') return 'opacity:0';
    const color = cam.aiDetected.length > 0 ? 'var(--c-warning)' : 'var(--cam-color)';
    return `background:radial-gradient(ellipse at 50% 50%,${color},transparent 70%);opacity:0.12`;
  }

  private _renderSlide(entityId: string, isVisible: boolean): TemplateResult {
    const cam = this._getCameraInfo(entityId);
    if (!cam) return html`<div class="carousel-slide"><div class="carousel-slide-inner off-feed"></div></div>`;

    // Privacy mode short-circuits everything: hide the feed entirely.
    if (cam.isOn && cam.isPrivacyOn) {
      return html`
        <div class="carousel-slide">
          <div class="carousel-slide-inner privacy-feed">
            <div class="stream-overlay-top">
              <div class="stream-cam-name">
                <ha-icon .icon=${cam.icon} style="--mdc-icon-size:12px"></ha-icon>
                <span>${cam.name}</span>
              </div>
              <div class="stream-time">${new Date().toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}</div>
            </div>
            <div class="privacy-placeholder">
              <ha-icon .icon=${'mdi:eye-off-outline'} style="--mdc-icon-size:42px;color:var(--t3)"></ha-icon>
              <span class="privacy-label">${t('camera.privacy_on')}</span>
              <span class="privacy-sub">${t('camera.privacy_sub')}</span>
            </div>
          </div>
        </div>
      `;
    }

    const isLive = this._liveIds.has(entityId) || cam.state === 'streaming' || cam.state === 'recording';
    const showStream = cam.isOn && isLive && isVisible;
    const feedCls = !cam.isOn ? 'off-feed' : isLive ? 'active-feed' : 'idle-feed';

    return html`
      <div class="carousel-slide">
        <div class="carousel-slide-inner ${feedCls}">
          ${showStream && this.hass ? html`
            <ha-camera-stream
              .hass=${this.hass}
              .stateObj=${cam.entity}
              .controls=${false}
              .muted=${true}
              class="cam-stream"
            ></ha-camera-stream>
          ` : cam.entityPicture && cam.isOn ? html`
            <img class="cam-thumbnail" src="${cam.entityPicture}" alt="${cam.name}"
              @error=${(e: Event) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
          ` : nothing}
          ${cam.isOn ? html`
            <div class="stream-overlay-top">
              <div class="stream-cam-name">
                <ha-icon .icon=${cam.icon} style="--mdc-icon-size:12px"></ha-icon>
                <span>${cam.name}</span>
                ${cam.isRinging ? html`
                  <span class="ring-indicator">
                    <span class="ring-circle"></span> ${t('camera.ringing')}
                  </span>
                ` : nothing}
                ${isLive && cam.isRecording ? html`
                  <span class="rec-indicator">
                    <span class="rec-circle"></span> REC
                  </span>
                ` : nothing}
              </div>
              <div class="stream-time">
                ${cam.batteryLevel !== null ? html`
                  <span class="battery-badge ${cam.isBatteryLow ? 'low' : ''}">
                    <ha-icon .icon=${this._batteryIcon(cam.batteryLevel)} style="--mdc-icon-size:12px"></ha-icon>
                    ${cam.batteryLevel}%
                  </span>
                ` : nothing}
                ${cam.isSleeping ? html`
                  <ha-icon class="sleep-icon" .icon=${'mdi:sleep'} style="--mdc-icon-size:12px"></ha-icon>
                ` : nothing}
                ${cam.isDark ? html`<ha-icon class="night-icon" .icon=${'mdi:weather-night'} style="--mdc-icon-size:12px"></ha-icon>` : nothing}
                ${new Date().toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
                <button class="fs-toggle-btn"
                  aria-label="${t('camera.fullscreen_aria')}"
                  @click=${(e: Event) => { e.stopPropagation(); this._toggleFullscreen(); }}>
                  <ha-icon .icon=${'mdi:fullscreen'} style="--mdc-icon-size:14px"></ha-icon>
                </button>
              </div>
            </div>
            <div class="stream-overlay-bottom">
              ${cam.aiDetected.length > 0 ? html`
                <div class="stream-ai-tags">
                  ${cam.aiDetected.map((ai) => html`
                    <div class="stream-ai-tag">
                      <ha-icon .icon=${AI_ICONS[ai] || 'mdi:eye'} style="--mdc-icon-size:10px"></ha-icon>
                      ${t(`camera.ai_${ai}` as Parameters<typeof t>[0])}
                    </div>
                  `)}
                </div>
              ` : html`<div></div>`}
            </div>
            ${!isLive ? html`
              <button class="stream-placeholder" @click=${(e: Event) => { e.stopPropagation(); this._startStream(entityId); }}
                aria-label="${t('camera.tap_to_stream')}">
                <ha-icon .icon=${cam.icon} style="--mdc-icon-size:36px;color:var(--t4)"></ha-icon>
                <span>${t('camera.tap_to_stream')}</span>
              </button>
            ` : nothing}
          ` : html`
            <div class="stream-placeholder">
              <ha-icon .icon=${'mdi:camera-off'} style="--mdc-icon-size:36px;color:var(--t4)"></ha-icon>
              <span>${t('camera.camera_off')}</span>
            </div>
          `}
        </div>
      </div>
    `;
  }

  private _renderDot(entityId: string, idx: number): TemplateResult {
    const cam = this._getCameraInfo(entityId);
    const isActive = idx === this._carouselIndex;
    let cls = 'carousel-dot-btn tappable';
    if (isActive) cls += ' active';
    if (cam?.aiDetected.length) cls += ' motion-dot';

    return html`
      <button class="${cls}"
        aria-label="${t('camera.dot_aria', { name: cam?.name || '' })}"
        @click=${() => this._goTo(idx)}
      ></button>
    `;
  }

  private _renderInfoBar(cam: CameraInfo): TemplateResult {
    const isLive = cam.isOn && cam.state !== 'idle';

    return html`
      <div class="carousel-info">
        <div class="carousel-cam-icon ${isLive ? 'on' : ''}">
          <ha-icon .icon=${cam.icon} style="--mdc-icon-size:20px"></ha-icon>
        </div>
        <div class="carousel-info-text">
          <div class="carousel-cam-name">${cam.name}</div>
          <div class="carousel-cam-sub">
            <span class="carousel-state ${cam.isRinging ? 'ringing' : isLive ? 'live' : ''} ${cam.isPrivacyOn ? 'privacy' : ''}">${cameraStateText(cam)}</span>
            ${cam.aiDetected.length > 0 && cam.isOn ? html`
              <div class="carousel-ai-mini">
                ${cam.aiDetected.map((ai) => html`
                  <div class="ai-badge active">
                    <ha-icon .icon=${AI_ICONS[ai] || 'mdi:eye'} style="--mdc-icon-size:10px"></ha-icon>
                  </div>
                `)}
              </div>
            ` : nothing}
          </div>
        </div>
      </div>
    `;
  }

  /** Overlay visible ONLY when the hero is fullscreen (CSS :fullscreen).
   *  Layout inspired by mobile PTZ apps (Reolink, Frigate, Foscam) :
   *  – top-left : floating action chips (snapshot, motion)
   *  – top-right : close button
   *  – bottom-left : pan/tilt joystick (4 directions)
   *  – bottom-right : zoom joystick (+/−) */
  private _renderFullscreenOverlay(cam: CameraInfo): TemplateResult {
    if (!cam.isOn) return html`<div class="fs-overlay"></div>`;
    const hasPan = cam.ptzUpId || cam.ptzDownId || cam.ptzLeftId || cam.ptzRightId;
    const hasZoom = cam.ptzZoomInId || cam.ptzZoomOutId;
    return html`
      <div class="fs-overlay">
        <div class="fs-top-chips">
          <button class="fs-chip" aria-label="${t('camera.snapshot')}"
            @click=${() => this._snapshot(cam)}>
            <ha-icon .icon=${'mdi:camera'} style="--mdc-icon-size:18px"></ha-icon>
          </button>
          ${cam.motionDetectionSupported ? html`
            <button class="fs-chip ${cam.motionDetectionEnabled ? 'active' : ''}"
              aria-label="${cam.motionDetectionEnabled ? t('camera.motion_on_aria') : t('camera.motion_off_aria')}"
              @click=${() => this._toggleMotion(cam)}>
              <ha-icon .icon=${cam.motionDetectionEnabled ? 'mdi:motion-sensor' : 'mdi:motion-sensor-off'} style="--mdc-icon-size:18px"></ha-icon>
            </button>
          ` : nothing}
        </div>
        <button class="fs-back-btn"
          aria-label="${t('camera.exit_fullscreen_aria')}"
          @click=${this._toggleFullscreen}>
          <ha-icon .icon=${'mdi:close'} style="--mdc-icon-size:20px"></ha-icon>
        </button>
        ${hasPan ? html`
          <div class="joystick joystick-pan" role="group" aria-label="Pan/Tilt">
            <div class="joystick-center"></div>
            ${cam.ptzUpId ? html`
              <button class="jp jp-up" aria-label="${t('camera.ptz_up_aria')}"
                @click=${() => this._ptzPress(cam.ptzUpId)}>
                <ha-icon .icon=${'mdi:chevron-up'} style="--mdc-icon-size:22px"></ha-icon>
              </button>
            ` : nothing}
            ${cam.ptzDownId ? html`
              <button class="jp jp-down" aria-label="${t('camera.ptz_down_aria')}"
                @click=${() => this._ptzPress(cam.ptzDownId)}>
                <ha-icon .icon=${'mdi:chevron-down'} style="--mdc-icon-size:22px"></ha-icon>
              </button>
            ` : nothing}
            ${cam.ptzLeftId ? html`
              <button class="jp jp-left" aria-label="${t('camera.ptz_left_aria')}"
                @click=${() => this._ptzPress(cam.ptzLeftId)}>
                <ha-icon .icon=${'mdi:chevron-left'} style="--mdc-icon-size:22px"></ha-icon>
              </button>
            ` : nothing}
            ${cam.ptzRightId ? html`
              <button class="jp jp-right" aria-label="${t('camera.ptz_right_aria')}"
                @click=${() => this._ptzPress(cam.ptzRightId)}>
                <ha-icon .icon=${'mdi:chevron-right'} style="--mdc-icon-size:22px"></ha-icon>
              </button>
            ` : nothing}
          </div>
        ` : nothing}
        ${hasZoom ? html`
          <div class="joystick joystick-zoom" role="group" aria-label="Zoom">
            <div class="joystick-center"></div>
            ${cam.ptzZoomInId ? html`
              <button class="jp jp-up" aria-label="${t('camera.ptz_zoom_in_aria')}"
                @click=${() => this._ptzPress(cam.ptzZoomInId)}>
                <ha-icon .icon=${'mdi:plus'} style="--mdc-icon-size:22px"></ha-icon>
              </button>
            ` : nothing}
            ${cam.ptzZoomOutId ? html`
              <button class="jp jp-down" aria-label="${t('camera.ptz_zoom_out_aria')}"
                @click=${() => this._ptzPress(cam.ptzZoomOutId)}>
                <ha-icon .icon=${'mdi:minus'} style="--mdc-icon-size:22px"></ha-icon>
              </button>
            ` : nothing}
          </div>
        ` : nothing}
      </div>
    `;
  }

  /** Compact PTZ D-pad : direction arrows + zoom — only renders buttons whose
   *  underlying entity exists. No fallback service (reolink.ptz_move only accepts
   *  speed, directions live on the per-direction button entities). */
  private _renderPtzDpad(cam: CameraInfo, ctx: 'fold' | 'fs'): TemplateResult {
    return html`
      <div class="ptz-dpad ptz-dpad-${ctx}">
        ${cam.ptzLeftId ? html`
          <glass-icon-button size="md" .icon=${'mdi:chevron-left'}
            aria-label="${t('camera.ptz_left_aria')}"
            @click=${() => this._ptzPress(cam.ptzLeftId)}></glass-icon-button>
        ` : nothing}
        ${cam.ptzUpId ? html`
          <glass-icon-button size="md" .icon=${'mdi:chevron-up'}
            aria-label="${t('camera.ptz_up_aria')}"
            @click=${() => this._ptzPress(cam.ptzUpId)}></glass-icon-button>
        ` : nothing}
        ${cam.ptzDownId ? html`
          <glass-icon-button size="md" .icon=${'mdi:chevron-down'}
            aria-label="${t('camera.ptz_down_aria')}"
            @click=${() => this._ptzPress(cam.ptzDownId)}></glass-icon-button>
        ` : nothing}
        ${cam.ptzRightId ? html`
          <glass-icon-button size="md" .icon=${'mdi:chevron-right'}
            aria-label="${t('camera.ptz_right_aria')}"
            @click=${() => this._ptzPress(cam.ptzRightId)}></glass-icon-button>
        ` : nothing}
        ${cam.ptzZoomOutId ? html`
          <glass-icon-button size="md" .icon=${'mdi:magnify-minus-outline'}
            aria-label="${t('camera.ptz_zoom_out_aria')}"
            @click=${() => this._ptzPress(cam.ptzZoomOutId)}></glass-icon-button>
        ` : nothing}
        ${cam.ptzZoomInId ? html`
          <glass-icon-button size="md" .icon=${'mdi:magnify-plus-outline'}
            aria-label="${t('camera.ptz_zoom_in_aria')}"
            @click=${() => this._ptzPress(cam.ptzZoomInId)}></glass-icon-button>
        ` : nothing}
      </div>
    `;
  }

  private _renderActions(cam: CameraInfo): TemplateResult {
    if (!cam.isOn) {
      // Only offer turn_on to cameras that actually support ON_OFF.
      if (!(cam.features & F.ON_OFF)) return html``;
      return html`
        <div class="carousel-actions">
          <glass-icon-button
            size="md"
            .icon=${'mdi:power'}
            aria-label="${t('camera.power_on')}"
            @click=${() => this._togglePower(cam)}
          ></glass-icon-button>
        </div>
      `;
    }

    const hasPower = (cam.features & F.ON_OFF) !== 0;
    const sirenOn = cam.sirenId ? this.hass?.states[cam.sirenId]?.state === 'on' : false;
    const floodOn = cam.floodlightId ? this.hass?.states[cam.floodlightId]?.state === 'on' : false;
    const autoTrackOn = cam.autoTrackId ? this.hass?.states[cam.autoTrackId]?.state === 'on' : false;

    return html`
      <div class="carousel-actions">
        ${hasPower ? html`
          <glass-icon-button
            size="md"
            .icon=${'mdi:power'}
            ?active=${true}
            active-color="alert"
            aria-label="${t('camera.power_off')}"
            @click=${() => this._togglePower(cam)}
          ></glass-icon-button>
        ` : nothing}
        <glass-icon-button
          size="md"
          .icon=${'mdi:camera'}
          aria-label="${t('camera.snapshot')}"
          @click=${() => this._snapshot(cam)}
        ></glass-icon-button>
        ${cam.recordSwitchId ? html`
          <glass-icon-button
            size="md"
            .icon=${cam.isRecording ? 'mdi:record-circle' : 'mdi:record'}
            ?active=${cam.isRecording}
            active-color="alert"
            aria-label="${cam.isRecording ? t('camera.record_stop') : t('camera.record_start')}"
            @click=${() => this._toggleRecord(cam)}
          ></glass-icon-button>
        ` : nothing}
        ${cam.motionDetectionSupported ? html`
          <glass-icon-button
            size="md"
            .icon=${cam.motionDetectionEnabled ? 'mdi:motion-sensor' : 'mdi:motion-sensor-off'}
            ?active=${cam.motionDetectionEnabled}
            active-color="alert"
            aria-label="${cam.motionDetectionEnabled ? t('camera.motion_on_aria') : t('camera.motion_off_aria')}"
            @click=${() => this._toggleMotion(cam)}
          ></glass-icon-button>
        ` : nothing}
        ${cam.sirenId ? html`
          <glass-icon-button
            size="md"
            .icon=${'mdi:bullhorn'}
            ?active=${sirenOn}
            active-color="alert"
            aria-label="${t('camera.siren_aria')}"
            @click=${() => this._toggleSiren(cam)}
          ></glass-icon-button>
        ` : nothing}
        ${cam.floodlightId ? html`
          <glass-icon-button
            size="md"
            .icon=${floodOn ? 'mdi:flashlight' : 'mdi:flashlight-off'}
            ?active=${floodOn}
            active-color="warning"
            aria-label="${t('camera.floodlight_aria')}"
            @click=${() => this._toggleFloodlight(cam)}
          ></glass-icon-button>
        ` : nothing}
        ${cam.autoTrackId ? html`
          <glass-icon-button
            size="md"
            .icon=${'mdi:target-account'}
            ?active=${autoTrackOn}
            active-color="alert"
            aria-label="${t('camera.auto_track_aria')}"
            @click=${() => this._toggleAutoTrack(cam)}
          ></glass-icon-button>
        ` : nothing}
        ${cam.detectSwitchId ? html`
          <glass-icon-button
            size="md"
            .icon=${'mdi:brain'}
            ?active=${cam.isDetectOn}
            active-color="info"
            aria-label="${cam.isDetectOn ? t('camera.detect_off_aria') : t('camera.detect_on_aria')}"
            @click=${() => this._toggleDetect(cam)}
          ></glass-icon-button>
        ` : nothing}
        ${cam.snapshotsSwitchId ? html`
          <glass-icon-button
            size="md"
            .icon=${'mdi:image-multiple-outline'}
            ?active=${cam.isSnapshotsOn}
            active-color="info"
            aria-label="${cam.isSnapshotsOn ? t('camera.snapshots_off_aria') : t('camera.snapshots_on_aria')}"
            @click=${() => this._toggleSnapshots(cam)}
          ></glass-icon-button>
        ` : nothing}
        ${cam.privacySwitchId ? html`
          <glass-icon-button
            size="md"
            .icon=${cam.isPrivacyOn ? 'mdi:eye-off' : 'mdi:eye'}
            ?active=${cam.isPrivacyOn}
            active-color="warning"
            aria-label="${cam.isPrivacyOn ? t('camera.privacy_off_aria') : t('camera.privacy_on_aria')}"
            @click=${() => this._togglePrivacy(cam)}
          ></glass-icon-button>
        ` : nothing}
      </div>
      ${cam.hasPtz ? this._renderPtzDpad(cam, 'fold') : nothing}
    `;
  }

  // — Styles —

  static styles = [
    glassTokens,
    hostMixin,
    glassMixin,
    foldMixin,
    marqueeMixin,
    bounceMixin,
    tappableMixin,
    cameraCarouselStyles,
  ];
}

try { customElements.define('glass-camera-carousel-card', GlassCameraCarouselCard); } catch { /* already registered */ }
