import { html, css, nothing, type PropertyValues, type TemplateResult } from 'lit';
import { property, state } from 'lit/decorators.js';
import {
  BaseCard,
  BackendService,
  getAreaEntities,
  type HassEntity,
  type EntityRegistryEntry,
} from '@glass-cards/base-card';
import { glassTokens, glassMixin, marqueeMixin, marqueeText, MARQUEE_FULL, bounceMixin } from '@glass-cards/ui-core';
import { t } from '@glass-cards/i18n';

// — Feature bitmask (HA CameraEntityFeature) —

const F = {
  ON_OFF: 1,
  STREAM: 2,
} as const;

// — Icon map per camera type —

const CAM_ICONS: Record<string, string> = {
  outdoor: 'mdi:cctv',
  indoor: 'mdi:webcam',
  doorbell: 'mdi:doorbell-video',
  ptz: 'mdi:cctv',
  hub: 'mdi:tablet',
};

// — AI detection icons —

const AI_ICONS: Record<string, string> = {
  person: 'mdi:human',
  vehicle: 'mdi:car',
  pet: 'mdi:dog',
  animal: 'mdi:paw',
  package: 'mdi:package-variant',
  face: 'mdi:face-recognition',
  baby_crying: 'mdi:baby-face-outline',
  bicycle: 'mdi:bicycle',
};

// — Companion entity patterns (Reolink-style) —

// Patterns support both EN (Reolink EN) and FR (Reolink FR) entity names
const COMPANION_PATTERNS = {
  motion: /_(motion|mouvement)$/,
  record: /_(record|enregistrer)$/,
  siren: /^siren\./,
  floodlight: /_(floodlight|projecteur)$/,
  auto_tracking: /_(auto_tracking|suivi_automatique)$/,
} as const;

// AI detection: [regex on entity_id, canonical name]
const AI_DETECTION: [RegExp, string][] = [
  [/_person(ne)?$/, 'person'],
  [/_vehicu?le$/, 'vehicle'],
  [/_pet$|_animal_domestique$/, 'pet'],
  [/_animal$/, 'animal'],
  [/_face$|_visage$/, 'face'],
  [/_package$|_colis$/, 'package'],
  [/_baby_crying$|_pleur_bebe$/, 'baby_crying'],
  [/_bicycl?e$|_velo$/, 'bicycle'],
];

// — Interfaces —

interface CameraInfo {
  entityId: string;
  entity: HassEntity;
  name: string;
  state: string;
  isOn: boolean;
  features: number;
  entityPicture: string | null;
  // Companion entities (discovered via device)
  motionSensorId: string | null;
  motionDetectionSupported: boolean;
  motionDetectionEnabled: boolean;
  hasMotion: boolean;
  recordSwitchId: string | null;
  isRecording: boolean;
  sirenId: string | null;
  floodlightId: string | null;
  autoTrackId: string | null;
  aiDetected: string[];
  icon: string;
}

interface CameraBackendConfig {
  show_header: boolean;
  entity_order: string[];
  auto_cycle: boolean;
  cycle_interval: number;
}

// — Helper: discover companion entities for a camera (memoized) —

type CompanionResult = {
  motionSensorId: string | null;
  recordSwitchId: string | null;
  sirenId: string | null;
  floodlightId: string | null;
  autoTrackId: string | null;
  aiDetected: string[];
};

const _companionCache = new Map<string, { key: string; result: CompanionResult }>();

function discoverCompanions(
  cameraEntityId: string,
  states: Record<string, HassEntity>,
  entities: Record<string, EntityRegistryEntry>,
): CompanionResult {
  // Cache key: device_id + AI binary sensor states (the only volatile part)
  const camEntry = entities[cameraEntityId];
  if (!camEntry?.device_id) {
    return { motionSensorId: null, recordSwitchId: null, sirenId: null, floodlightId: null, autoTrackId: null, aiDetected: [] };
  }

  const deviceId = camEntry.device_id;

  // Build invalidation key from AI binary_sensor states on this device
  let aiKey = deviceId;
  for (const eid of Object.keys(entities)) {
    if (entities[eid].device_id === deviceId && eid.startsWith('binary_sensor.') && states[eid]) {
      aiKey += `:${eid}=${states[eid].state}`;
    }
  }

  const cached = _companionCache.get(cameraEntityId);
  if (cached && cached.key === aiKey) return cached.result;

  // Collect all entity_ids for this device
  const deviceEntities: string[] = [];
  for (const [eid, entry] of Object.entries(entities)) {
    if (entry.device_id === deviceId) {
      deviceEntities.push(eid);
    }
  }

  const result: CompanionResult = {
    motionSensorId: null,
    recordSwitchId: null,
    sirenId: null,
    floodlightId: null,
    autoTrackId: null,
    aiDetected: [],
  };

  for (const eid of deviceEntities) {
    const st = states[eid];
    if (!st) continue;

    if (eid.startsWith('binary_sensor.') && COMPANION_PATTERNS.motion.test(eid)) {
      result.motionSensorId = eid;
    }
    if (eid.startsWith('switch.') && COMPANION_PATTERNS.record.test(eid)) {
      result.recordSwitchId = eid;
    }
    if (COMPANION_PATTERNS.siren.test(eid)) {
      result.sirenId = eid;
    }
    if (eid.startsWith('light.') && COMPANION_PATTERNS.floodlight.test(eid)) {
      result.floodlightId = eid;
    }
    if (eid.startsWith('switch.') && COMPANION_PATTERNS.auto_tracking.test(eid)) {
      result.autoTrackId = eid;
    }
    if (eid.startsWith('binary_sensor.') && st.state === 'on') {
      for (const [pattern, name] of AI_DETECTION) {
        if (pattern.test(eid) && !result.aiDetected.includes(name)) {
          result.aiDetected.push(name);
        }
      }
    }
  }

  _companionCache.set(cameraEntityId, { key: aiKey, result });
  return result;
}

// — State text helper —

function cameraStateText(camState: string, isOn: boolean): string {
  if (!isOn) return t('camera.off');
  switch (camState) {
    case 'idle': return t('camera.idle');
    case 'streaming': return t('camera.streaming');
    case 'recording': return t('camera.recording');
    default: return camState;
  }
}

// — Icon from entity attributes —

function cameraIcon(entity: HassEntity): string {
  const icon = entity.attributes?.icon as string | undefined;
  if (icon) return icon;

  // Guess from entity_id
  const eid = entity.entity_id;
  if (eid.includes('doorbell')) return CAM_ICONS.doorbell;
  if (eid.includes('indoor') || eid.includes('salon') || eid.includes('chambre')) return CAM_ICONS.indoor;
  return CAM_ICONS.outdoor;
}

// ================================================================
//  GlassCameraCarouselCard
// ================================================================

class GlassCameraCarouselCard extends BaseCard {
  @property() areaId?: string;

  @state() private _carouselIndex = 0;
  @state() private _liveIds = new Set<string>();

  private _backend: BackendService | undefined;
  private _camConfig: CameraBackendConfig | null = null;
  private _configLoaded = false;
  private _configLoading = false;
  private _loadVersion = 0;
  private _lastAreaId: string | undefined;

  // Swipe state
  private _touchStartX = 0;
  private _touchDelta = 0;
  private _isSwiping = false;
  private _trackEl: HTMLElement | null = null;

  // Auto-cycle
  private _cycleTimer?: ReturnType<typeof setInterval>;

  // Camera cache
  private _cachedCameraIds: string[] = [];
  private _cachedCamerasKey = '';

  connectedCallback() {
    super.connectedCallback();
    this._listen('camera-carousel-config-changed', () => {
      this._configLoaded = false;
      this._loadConfig();
    });
    this._listen('dashboard-config-changed', () => this.requestUpdate());
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._backend = undefined;
    this._clearCycleTimer();
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
      ].filter(Boolean) as string[];
    });
  }

  updated(changedProps: PropertyValues) {
    super.updated(changedProps);

    if (changedProps.has('hass') && this.hass) {
      if (!this._backend) {
        this._backend = new BackendService(this.hass);
      }
    }

    if (this.areaId !== this._lastAreaId) {
      this._lastAreaId = this.areaId;
      this._carouselIndex = 0;
      this._cachedCamerasKey = '';
      this._configLoaded = false;
      this._liveIds = new Set();
    }

    if (!this._configLoaded && !this._configLoading) {
      this._loadConfig();
    }
  }

  private async _loadConfig() {
    if (!this._backend || this._configLoading) return;
    this._configLoading = true;
    const version = ++this._loadVersion;
    try {
      const resp = await this._backend.send<{ camera_carousel: CameraBackendConfig }>('get_config');
      if (version !== this._loadVersion) return;
      this._camConfig = resp.camera_carousel || { show_header: true, entity_order: [], auto_cycle: false, cycle_interval: 10 };
      this._configLoaded = true;
      this._setupCycleTimer();
      this.requestUpdate();
    } catch {
      // silent — will retry on next update
    } finally {
      this._configLoading = false;
    }
  }

  // — Camera discovery —

  private _getCameraIds(): string[] {
    if (!this.hass) return [];

    // Build a fingerprint to avoid re-computing every render
    let ids: string[];
    if (this.areaId) {
      ids = getAreaEntities(this.areaId, this.hass.entities, this.hass.devices)
        .filter((e) => e.entity_id.startsWith('camera.'))
        .map((e) => e.entity_id);
    } else {
      // Dashboard mode: all cameras
      ids = Object.keys(this.hass.states).filter((eid) => eid.startsWith('camera.'));
    }

    // Apply entity_order from config
    if (this._camConfig?.entity_order?.length) {
      const ordered = this._camConfig.entity_order.filter((eid) => ids.includes(eid));
      const remaining = ids.filter((eid) => !ordered.includes(eid));
      ids = [...ordered, ...remaining];
    }

    const key = ids.join(',');
    if (key !== this._cachedCamerasKey) {
      this._cachedCamerasKey = key;
      this._cachedCameraIds = ids;
      // Reset carousel index if it's out of bounds
      if (this._carouselIndex >= ids.length) {
        this._carouselIndex = Math.max(0, ids.length - 1);
      }
    }

    return this._cachedCameraIds;
  }

  private _getCameraInfo(entityId: string): CameraInfo | null {
    if (!this.hass) return null;
    const entity = this.hass.states[entityId];
    if (!entity) return null;

    const features = (entity.attributes?.supported_features ?? 0) as number;
    const isOn = entity.state !== 'unavailable' && entity.attributes?.is_on !== false;
    const companions = discoverCompanions(entityId, this.hass.states, this.hass.entities);

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
      icon: cameraIcon(entity),
    };
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

  // — Navigation —

  private _goTo(idx: number) {
    const ids = this._getCameraIds();
    if (!ids.length) return;
    this._carouselIndex = ((idx % ids.length) + ids.length) % ids.length;
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
    if ((e.target as HTMLElement).closest('.carousel-nav')) return;
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
    this.hass.callService('camera', service, { entity_id: cam.entityId });
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
    this.hass.callService('switch', isOn ? 'turn_off' : 'turn_on', { entity_id: cam.recordSwitchId });
  }

  private _toggleMotion(cam: CameraInfo) {
    if (!this.hass) return;
    const service = cam.motionDetectionEnabled ? 'disable_motion_detection' : 'enable_motion_detection';
    this.hass.callService('camera', service, { entity_id: cam.entityId });
  }

  private _toggleSiren(cam: CameraInfo) {
    if (!this.hass || !cam.sirenId) return;
    const isOn = this.hass.states[cam.sirenId]?.state === 'on';
    this.hass.callService('siren', isOn ? 'turn_off' : 'turn_on', { entity_id: cam.sirenId });
  }

  private _toggleFloodlight(cam: CameraInfo) {
    if (!this.hass || !cam.floodlightId) return;
    const isOn = this.hass.states[cam.floodlightId]?.state === 'on';
    this.hass.callService('light', isOn ? 'turn_off' : 'turn_on', { entity_id: cam.floodlightId });
  }

  private _toggleAutoTrack(cam: CameraInfo) {
    if (!this.hass || !cam.autoTrackId) return;
    const isOn = this.hass.states[cam.autoTrackId]?.state === 'on';
    this.hass.callService('switch', isOn ? 'turn_off' : 'turn_on', { entity_id: cam.autoTrackId });
  }

  private _startStream(entityId: string) {
    const next = new Set(this._liveIds);
    next.add(entityId);
    this._liveIds = next;
  }

  /** Stop a live stream (used by future stop button or area change). */
  protected _stopStream(entityId: string) {
    const next = new Set(this._liveIds);
    next.delete(entityId);
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

    return html`
      ${showHeader ? html`
        <div class="card-header">
          <div class="card-header-left">
            <span class="card-title">${t('camera.title')}</span>
          </div>
        </div>
      ` : nothing}
      <div class="glass carousel-card">
        <div class="tint" style="${this._tintStyle(currentCam)}"></div>
        <div class="carousel-inner">
          <div class="carousel-viewport"
            @pointerdown=${this._onPointerDown}
            @pointermove=${this._onPointerMove}
            @pointerup=${this._onPointerUp}
            @pointercancel=${this._onPointerCancel}
          >
            <div class="carousel-track" style="transform:translateX(-${this._carouselIndex * 100}%)">
              ${ids.map((eid, idx) => this._renderSlide(eid, idx === this._carouselIndex))}
            </div>
            ${ids.length > 1 ? html`
              <button class="carousel-nav prev" aria-label="${t('camera.prev_aria')}" @click=${this._prev}>
                <ha-icon .icon=${'mdi:chevron-left'}></ha-icon>
              </button>
              <button class="carousel-nav next" aria-label="${t('camera.next_aria')}" @click=${this._next}>
                <ha-icon .icon=${'mdi:chevron-right'}></ha-icon>
              </button>
            ` : nothing}
          </div>
          ${ids.length > 1 ? html`
            <div class="carousel-dots">
              ${ids.map((eid, idx) => this._renderDot(eid, idx))}
            </div>
          ` : nothing}
          ${currentCam ? this._renderInfoBar(currentCam) : nothing}
          ${currentCam ? this._renderActions(currentCam) : nothing}
        </div>
      </div>
    `;
  }

  private _tintStyle(cam: CameraInfo | null): string {
    if (!cam || !cam.isOn || cam.state === 'idle') return 'opacity:0';
    const color = cam.aiDetected.length > 0 ? 'var(--c-warning)' : 'var(--cam-color)';
    return `background:radial-gradient(ellipse at 50% 50%,${color},transparent 70%);opacity:0.12`;
  }

  private _renderSlide(entityId: string, isVisible: boolean): TemplateResult {
    const cam = this._getCameraInfo(entityId);
    if (!cam) return html`<div class="carousel-slide"><div class="carousel-slide-inner off-feed"></div></div>`;

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
            <img class="cam-thumbnail" src="${cam.entityPicture}" alt="${cam.name}" />
          ` : nothing}
          ${cam.isOn ? html`
            <div class="stream-overlay-top">
              <div class="stream-cam-name">
                <ha-icon .icon=${cam.icon} style="--mdc-icon-size:12px"></ha-icon>
                <span>${cam.name}</span>
                ${cam.isRecording ? html`
                  <span class="rec-indicator">
                    <span class="rec-circle"></span> REC
                  </span>
                ` : nothing}
              </div>
              <div class="stream-time">${new Date().toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}</div>
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
    let cls = 'carousel-dot-btn';
    if (isActive) cls += ' active';
    if (cam?.isRecording) cls += ' recording';
    else if (cam?.aiDetected.length) cls += ' motion-dot';

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
          <ha-icon .icon=${cam.icon} style="--mdc-icon-size:16px"></ha-icon>
        </div>
        <div class="carousel-info-text">
          <div class="carousel-cam-name">${marqueeText(cam.name, MARQUEE_FULL)}</div>
          <div class="carousel-cam-sub">
            <span class="carousel-state ${isLive ? 'live' : ''}">${cameraStateText(cam.state, cam.isOn)}</span>
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

  private _renderActions(cam: CameraInfo): TemplateResult {
    if (!cam.isOn) {
      return html`
        <div class="carousel-actions">
          <button class="action-btn" @click=${() => this._togglePower(cam)} aria-label="${t('camera.power_on')}">
            <ha-icon .icon=${'mdi:power'} style="--mdc-icon-size:14px"></ha-icon>
            ${t('camera.power_on')}
          </button>
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
          <button class="action-btn active" @click=${() => this._togglePower(cam)} aria-label="${t('camera.power_off')}">
            <ha-icon .icon=${'mdi:power'} style="--mdc-icon-size:14px"></ha-icon>
          </button>
        ` : nothing}
        <button class="action-btn" @click=${() => this._snapshot(cam)} aria-label="${t('camera.snapshot')}">
          <ha-icon .icon=${'mdi:camera'} style="--mdc-icon-size:14px"></ha-icon>
          ${t('camera.snapshot')}
        </button>
        ${cam.recordSwitchId ? html`
          <button class="action-btn ${cam.isRecording ? 'active-alert' : ''}" @click=${() => this._toggleRecord(cam)}
            aria-label="${cam.isRecording ? t('camera.record_stop') : t('camera.record_start')}">
            <ha-icon .icon=${cam.isRecording ? 'mdi:record-circle' : 'mdi:record'} style="--mdc-icon-size:14px"></ha-icon>
            ${cam.isRecording ? t('camera.record_stop') : t('camera.record_start')}
          </button>
        ` : nothing}
        ${cam.motionDetectionSupported ? html`
          <button class="action-btn ${cam.motionDetectionEnabled ? 'active' : ''}" @click=${() => this._toggleMotion(cam)}
            aria-label="${cam.motionDetectionEnabled ? t('camera.motion_on_aria') : t('camera.motion_off_aria')}">
            <ha-icon .icon=${cam.motionDetectionEnabled ? 'mdi:motion-sensor' : 'mdi:motion-sensor-off'} style="--mdc-icon-size:14px"></ha-icon>
          </button>
        ` : nothing}
        ${cam.sirenId ? html`
          <button class="action-btn ${sirenOn ? 'active-alert' : ''}" @click=${() => this._toggleSiren(cam)}
            aria-label="${t('camera.siren_aria')}">
            <ha-icon .icon=${'mdi:bullhorn'} style="--mdc-icon-size:14px"></ha-icon>
          </button>
        ` : nothing}
        ${cam.floodlightId ? html`
          <button class="action-btn ${floodOn ? 'active-warning' : ''}" @click=${() => this._toggleFloodlight(cam)}
            aria-label="${t('camera.floodlight_aria')}">
            <ha-icon .icon=${floodOn ? 'mdi:flashlight' : 'mdi:flashlight-off'} style="--mdc-icon-size:14px"></ha-icon>
          </button>
        ` : nothing}
        ${cam.autoTrackId ? html`
          <button class="action-btn ${autoTrackOn ? 'active' : ''}" @click=${() => this._toggleAutoTrack(cam)}
            aria-label="${t('camera.auto_track_aria')}">
            <ha-icon .icon=${'mdi:target-account'} style="--mdc-icon-size:14px"></ha-icon>
          </button>
        ` : nothing}
      </div>
    `;
  }

  // — Styles —

  static styles = [
    glassTokens,
    glassMixin,
    marqueeMixin,
    bounceMixin,
    css`
      :host {
        display: block;
        width: 100%;
        font-family: 'Plus Jakarta Sans', sans-serif;
        max-width: 500px;
        margin: 0 auto;

        --cam-color: #60a5fa;
        --cam-bg: rgba(96,165,250,0.1);
        --cam-border: rgba(96,165,250,0.15);
        --cam-glow: rgba(96,165,250,0.4);
        --cam-sub: rgba(96,165,250,0.6);
      }

      .card-header {
        display: flex; align-items: center; justify-content: space-between;
        padding: 0 6px; margin-bottom: 6px; min-height: 22px;
      }
      .card-header-left { display: flex; align-items: center; gap: 8px; }
      .card-title {
        font-size: 9px; font-weight: 700; text-transform: uppercase;
        letter-spacing: 1.5px; color: var(--t4);
      }

      .carousel-card { width: 100%; padding: 14px; position: relative; }
      .carousel-inner {
        position: relative; z-index: 1;
        display: flex; flex-direction: column; gap: 10px;
      }

      .tint {
        position: absolute; inset: 0; border-radius: inherit;
        pointer-events: none; z-index: 0;
        transition: opacity 1.2s cubic-bezier(0.4,0,0.2,1), background 1.2s cubic-bezier(0.4,0,0.2,1);
      }

      /* — Viewport — */
      .carousel-viewport {
        position: relative; width: 100%; aspect-ratio: 16 / 9;
        border-radius: var(--radius-lg); overflow: hidden;
        background: #0a0f18; border: 1px solid var(--b1);
        touch-action: pan-y;
      }
      .carousel-track {
        display: flex; width: 100%; height: 100%;
        transition: transform 0.4s cubic-bezier(0.16,1,0.3,1);
      }
      .carousel-slide {
        flex: 0 0 100%; width: 100%; height: 100%;
        position: relative;
      }
      .carousel-slide-inner {
        position: absolute; inset: 0;
        display: flex; align-items: center; justify-content: center;
      }
      .carousel-slide-inner.active-feed {
        background:
          radial-gradient(circle at 25% 35%, rgba(40,60,90,0.4) 0%, transparent 40%),
          radial-gradient(circle at 65% 55%, rgba(30,50,70,0.3) 0%, transparent 45%),
          radial-gradient(circle at 50% 80%, rgba(50,40,60,0.2) 0%, transparent 50%),
          linear-gradient(135deg, #141e2e 0%, #0d1520 40%, #111a28 100%);
      }
      .carousel-slide-inner.idle-feed {
        background:
          radial-gradient(circle at 30% 40%, rgba(96,165,250,0.06) 0%, transparent 50%),
          radial-gradient(circle at 70% 60%, rgba(129,140,248,0.04) 0%, transparent 50%),
          linear-gradient(135deg, #0d1520 0%, #0a0f18 100%);
      }
      .carousel-slide-inner.off-feed {
        background: linear-gradient(135deg, #0a0e14 0%, #080c12 100%);
      }

      .cam-thumbnail {
        position: absolute; inset: 0; width: 100%; height: 100%;
        object-fit: cover; z-index: 0;
      }
      .cam-stream {
        position: absolute; inset: 0; width: 100%; height: 100%;
        z-index: 0; --video-object-fit: cover;
      }

      /* — Stream overlays — */
      .stream-overlay-top {
        position: absolute; top: 0; left: 0; right: 0; z-index: 2;
        display: flex; align-items: center; justify-content: space-between;
        padding: 8px 10px;
        background: linear-gradient(180deg, rgba(0,0,0,0.5) 0%, transparent 100%);
      }
      .stream-cam-name {
        font-size: 10px; font-weight: 600; color: rgba(255,255,255,0.7);
        display: flex; align-items: center; gap: 5px;
      }
      .stream-cam-name ha-icon { display: flex; align-items: center; justify-content: center; }
      .rec-indicator {
        display: inline-flex; align-items: center; gap: 3px;
        font-size: 9px; font-weight: 700; color: var(--c-alert);
        letter-spacing: 0.5px;
      }
      .rec-circle {
        width: 6px; height: 6px; border-radius: 50%; background: var(--c-alert);
        animation: rec-pulse 1.5s ease-in-out infinite;
      }
      @keyframes rec-pulse {
        0%, 100% { opacity: 1; box-shadow: 0 0 4px var(--c-alert); }
        50% { opacity: 0.4; box-shadow: 0 0 0px var(--c-alert); }
      }
      .stream-time {
        font-size: 9px; font-weight: 500; color: rgba(255,255,255,0.5);
        font-variant-numeric: tabular-nums;
      }
      .stream-overlay-bottom {
        position: absolute; bottom: 0; left: 0; right: 0; z-index: 2;
        display: flex; align-items: center; justify-content: space-between;
        padding: 8px 10px;
        background: linear-gradient(0deg, rgba(0,0,0,0.5) 0%, transparent 100%);
      }
      .stream-ai-tags { display: flex; gap: 4px; }
      .stream-ai-tag {
        display: inline-flex; align-items: center; gap: 3px;
        padding: 2px 6px; border-radius: var(--radius-sm);
        font-size: 9px; font-weight: 600;
        background: rgba(96,165,250,0.15); color: var(--cam-color);
        border: 1px solid rgba(96,165,250,0.2);
      }
      .stream-ai-tag ha-icon { display: flex; align-items: center; justify-content: center; }
      .stream-placeholder {
        display: flex; flex-direction: column; align-items: center; gap: 6px;
        z-index: 3; background: none; border: none; padding: 0; cursor: pointer;
        outline: none; -webkit-tap-highlight-color: transparent;
        font-family: inherit;
      }
      .stream-placeholder:focus-visible { outline: 2px solid rgba(255,255,255,0.3); outline-offset: 4px; border-radius: var(--radius-md); }
      .stream-placeholder span { font-size: 10px; color: var(--t4); font-weight: 500; }
      button.stream-placeholder { position: absolute; inset: 0; width: 100%; height: 100%; justify-content: center; }

      /* — Nav arrows — */
      .carousel-nav {
        position: absolute; top: 50%; transform: translateY(-50%);
        width: 32px; height: 32px; border-radius: 50%;
        background: rgba(0,0,0,0.4); border: 1px solid rgba(255,255,255,0.1);
        backdrop-filter: blur(8px);
        display: flex; align-items: center; justify-content: center;
        cursor: pointer; padding: 0; outline: none;
        font-family: inherit; transition: all 0.2s cubic-bezier(0.4,0,0.2,1);
        -webkit-tap-highlight-color: transparent;
        z-index: 5; opacity: 0.7;
      }
      .carousel-nav ha-icon {
        --mdc-icon-size: 18px; color: rgba(255,255,255,0.8);
        display: flex; align-items: center; justify-content: center;
      }
      .carousel-nav:focus-visible { outline: 2px solid rgba(255,255,255,0.3); outline-offset: -2px; }
      .carousel-nav:active { transform: translateY(-50%) scale(0.92); }
      .carousel-nav.prev { left: 8px; }
      .carousel-nav.next { right: 8px; }

      @media (hover: hover) and (pointer: fine) {
        .carousel-nav:hover { background: rgba(0,0,0,0.6); opacity: 1; }
      }

      /* — Dots — */
      .carousel-dots {
        display: flex; align-items: center; justify-content: center; gap: 6px;
      }
      .carousel-dot-btn {
        width: 8px; height: 8px; border-radius: 50%; padding: 0;
        border: none; background: var(--t4); cursor: pointer;
        transition: all 0.2s cubic-bezier(0.4,0,0.2,1); outline: none;
        -webkit-tap-highlight-color: transparent;
      }
      .carousel-dot-btn:focus-visible { outline: 2px solid rgba(255,255,255,0.3); outline-offset: 2px; }
      .carousel-dot-btn.active {
        width: 20px; border-radius: 4px;
        background: var(--cam-color); box-shadow: 0 0 8px var(--cam-glow);
      }
      .carousel-dot-btn.recording {
        background: var(--c-alert); box-shadow: 0 0 6px rgba(248,113,113,0.5);
      }
      .carousel-dot-btn.recording.active {
        background: var(--c-alert);
        animation: rec-pulse 1.5s ease-in-out infinite;
      }
      .carousel-dot-btn.motion-dot {
        background: var(--c-warning); box-shadow: 0 0 6px rgba(251,191,36,0.4);
      }

      @media (hover: hover) and (pointer: fine) {
        .carousel-dot-btn:hover { background: var(--t3); }
      }

      /* — Info bar — */
      .carousel-info {
        display: flex; align-items: center; gap: 10px; padding: 0 2px;
      }
      .carousel-cam-icon {
        width: 32px; height: 32px; border-radius: var(--radius-md);
        background: var(--s2); border: 1px solid var(--b1);
        display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        transition: all 0.2s cubic-bezier(0.4,0,0.2,1);
      }
      .carousel-cam-icon ha-icon {
        color: var(--t3); display: flex; align-items: center; justify-content: center;
      }
      .carousel-cam-icon.on { background: var(--cam-bg); border-color: var(--cam-border); }
      .carousel-cam-icon.on ha-icon { color: var(--cam-color); }
      .carousel-info-text { flex: 1; min-width: 0; }
      .carousel-cam-name {
        font-size: 13px; font-weight: 600; color: var(--t1);
        overflow: hidden; white-space: nowrap;
      }
      .carousel-cam-sub {
        display: flex; align-items: center; gap: 5px; margin-top: 1px;
      }
      .carousel-state { font-size: 10px; font-weight: 500; color: var(--t3); }
      .carousel-state.live { color: var(--cam-sub); }
      .carousel-ai-mini { display: flex; gap: 2px; align-items: center; }
      .ai-badge {
        display: inline-flex; align-items: center; justify-content: center;
        width: 16px; height: 16px; border-radius: var(--radius-sm);
        font-size: 10px; transition: all 0.2s cubic-bezier(0.4,0,0.2,1);
      }
      .ai-badge.active { background: rgba(96,165,250,0.12); color: var(--cam-color); }
      .ai-badge ha-icon {
        display: flex; align-items: center; justify-content: center;
        filter: drop-shadow(0 0 4px var(--cam-glow));
      }

      /* — Quick actions — */
      .carousel-actions { display: flex; gap: 6px; flex-wrap: wrap; }
      .action-btn {
        display: inline-flex; align-items: center; gap: 5px;
        padding: 6px 12px; border-radius: var(--radius-md);
        border: 1px solid var(--b2); background: var(--s1);
        font-family: inherit; font-size: 11px; font-weight: 600;
        color: var(--t3); cursor: pointer; transition: all 0.2s cubic-bezier(0.4,0,0.2,1);
        outline: none; -webkit-tap-highlight-color: transparent;
      }
      .action-btn ha-icon { display: flex; align-items: center; justify-content: center; }
      .action-btn:focus-visible { outline: 2px solid rgba(255,255,255,0.25); outline-offset: -2px; }
      .action-btn:active { transform: scale(0.96); }
      .action-btn.active { border-color: var(--cam-border); background: var(--cam-bg); color: var(--cam-color); }
      .action-btn.active-alert { border-color: rgba(248,113,113,0.2); background: rgba(248,113,113,0.1); color: var(--c-alert); }
      .action-btn.active-warning { border-color: rgba(251,191,36,0.2); background: rgba(251,191,36,0.1); color: var(--c-warning); }

      @media (hover: hover) and (pointer: fine) {
        .action-btn:hover { background: var(--s3); color: var(--t2); border-color: var(--b3); }
      }
      @media (pointer: coarse) {
        .action-btn:active { animation: bounce 0.15s ease-out; }
      }
    `,
  ];
}

customElements.define('glass-camera-carousel-card', GlassCameraCarouselCard);
