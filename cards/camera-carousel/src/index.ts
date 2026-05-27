import { html, css, nothing, type PropertyValues, type TemplateResult } from 'lit';
import { property, state } from 'lit/decorators.js';
import {
  BaseCard,
  BackendService,
  getAreaEntities,
  type HassEntity,
  type EntityRegistryEntry,
} from '@glass-cards/base-card';
import './editor';
import { glassTokens, hostMixin, glassMixin, foldMixin, marqueeMixin, bounceMixin, tappableMixin } from '@glass-cards/ui-core';
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

// Patterns support EN, FR, plus Frigate (_recordings/_detect/_snapshots/_audio),
// Unifi Protect (_motion_detected/_is_dark/_doorbell_chime/_smart_detections),
// Eufy Security (_person_detected/_motion_detected), Tapo, Wyze.
// Anchored on entity_id WITHOUT domain prefix (we test against eid directly).
const COMPANION_PATTERNS = {
  // Reolink _motion / Frigate _motion / Unifi _motion_detected / Eufy _motion_detected.
  motion: /_(motion|mouvement|motion_detected)$/,
  // Reolink _record (singular) / Frigate _recordings (plural).
  record: /_(record|enregistrer|recordings)$/,
  siren: /^siren\./,
  floodlight: /_(floodlight|projecteur)$/,
  auto_tracking: /_(auto_tracking|suivi_automatique)$/,
  // Doorbell press : Reolink _visitor / Unifi _doorbell_chime.
  visitor: /_(visitor|visiteur|doorbell_chime)$/,
  // Privacy : Reolink _privacy_mode / Unifi Protect _privacy_mode.
  privacy: /_(privacy_mode|mode_confidentialite)$/,
  // Frigate object-detection toggle. EN: _detect / FR Reolink: _detection_ia.
  detect: /_(detect|detection_ia)$/,
  // Frigate snapshot capture toggle. EN: _snapshots / FR Reolink: _instantanes_*.
  snapshots: /_(?:snapshots|instantanes)(?:_|$)/,
  // Unifi Protect: brightness sensor — true at night. EN: _is_dark / FR: _il_fait_nuit / _obscurite.
  is_dark: /_(is_dark|il_fait_nuit|obscurite)$/,
  // Battery level (Reolink Argus/Solar/Eufy). EN: _battery_percentage / FR: _batterie / _pourcentage_batterie.
  battery: /_(battery(_percentage|_level)?|batterie|pourcentage_batterie|niveau_batterie)$/,
  // Battery low binary sensor. EN: _battery_low / FR: _batterie_faible.
  battery_low: /_(battery_low|batterie_faible)$/,
  // Camera sleep state. EN: _sleep_status / FR Reolink: _etat_de_veille / _veille.
  sleep_status: /_(sleep_status|etat_de_veille|veille)$/,
  // PTZ button entities (Reolink). EN + FR variants : up/haut, down/bas, left/gauche,
  // right/droite, zoom_in/zoom_plus/zoom_avant, zoom_out/zoom_minus/zoom_arriere.
  // (_|$) at the end accepts suffix variants like _ptz_droite_2 on multi-channel cams.
  ptz_up: /_ptz_(?:up|haut)(?:_|$)/,
  ptz_down: /_ptz_(?:down|bas)(?:_|$)/,
  ptz_left: /_ptz_(?:left|gauche)(?:_|$)/,
  ptz_right: /_ptz_(?:right|droite)(?:_|$)/,
  ptz_zoom_in: /_ptz_zoom_(?:in|plus|avant)(?:_|$)/,
  ptz_zoom_out: /_ptz_zoom_(?:out|minus|arriere)(?:_|$)/,
} as const;

// Window during which a doorbell ring is shown as "active" (ms).
const RING_WINDOW_MS = 30_000;

// AI detection: [regex on entity_id, canonical name].
// Patterns cover Reolink (_person / _personne), Unifi Protect (_person_detected),
// Frigate (_person_occupancy), Eufy (_person_detected).
const AI_DETECTION: [RegExp, string][] = [
  [/_person(ne)?(_detected|_occupancy)?$/, 'person'],
  [/_vehicu?le(_detected|_occupancy)?$/, 'vehicle'],
  [/_(pet|animal_domestique)(_detected|_occupancy)?$/, 'pet'],
  [/_animal(_detected|_occupancy)?$/, 'animal'],
  [/_(face|visage)(_detected|_occupancy)?$/, 'face'],
  [/_(package|colis)(_detected|_occupancy)?$/, 'package'],
  [/_(baby_crying|pleur_bebe)$/, 'baby_crying'],
  [/_(bicycl?e|velo)(_detected|_occupancy)?$/, 'bicycle'],
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
  // Doorbell (event entity or Reolink _visitor binary_sensor)
  isDoorbell: boolean;
  doorbellEventId: string | null;
  visitorSensorId: string | null;
  isRinging: boolean;
  ringExpiresInMs: number; // 0 if not ringing
  // Privacy mode (switch _privacy_mode)
  privacySwitchId: string | null;
  isPrivacyOn: boolean;
  // Frigate object-detection toggle (orthogonal to motion).
  detectSwitchId: string | null;
  isDetectOn: boolean;
  // Frigate snapshot toggle.
  snapshotsSwitchId: string | null;
  isSnapshotsOn: boolean;
  // Unifi Protect: night/dark sensor.
  isDarkSensorId: string | null;
  isDark: boolean;
  // Battery (Reolink Argus/Solar, Eufy battery cams).
  batterySensorId: string | null;
  batteryLevel: number | null;       // 0-100, null if unavailable
  isBatteryLow: boolean;              // from binary_sensor _battery_low OR level < 20
  // Sleep state (Reolink solar power-save).
  sleepSensorId: string | null;
  isSleeping: boolean;
  // PTZ controls (Reolink motorized cams).
  hasPtz: boolean;
  ptzUpId: string | null;
  ptzDownId: string | null;
  ptzLeftId: string | null;
  ptzRightId: string | null;
  ptzZoomInId: string | null;
  ptzZoomOutId: string | null;
}

interface CameraBackendConfig {
  show_header: boolean;
  entity_order: string[];
  hidden_entities: string[];
  auto_cycle: boolean;
  cycle_interval: number;
}

interface CameraRoomConfig {
  hidden_entities: string[];
  entity_order: string[];
}

// — Helper: discover companion entities for a camera (memoized) —

type CompanionResult = {
  motionSensorId: string | null;
  recordSwitchId: string | null;
  sirenId: string | null;
  floodlightId: string | null;
  autoTrackId: string | null;
  aiDetected: string[];
  doorbellEventId: string | null;
  visitorSensorId: string | null;
  privacySwitchId: string | null;
  detectSwitchId: string | null;
  snapshotsSwitchId: string | null;
  isDarkSensorId: string | null;
  batterySensorId: string | null;
  batteryLowSensorId: string | null;
  sleepSensorId: string | null;
  ptzUpId: string | null;
  ptzDownId: string | null;
  ptzLeftId: string | null;
  ptzRightId: string | null;
  ptzZoomInId: string | null;
  ptzZoomOutId: string | null;
};

function emptyCompanions(): CompanionResult {
  return {
    motionSensorId: null,
    recordSwitchId: null,
    sirenId: null,
    floodlightId: null,
    autoTrackId: null,
    aiDetected: [],
    doorbellEventId: null,
    visitorSensorId: null,
    privacySwitchId: null,
    detectSwitchId: null,
    snapshotsSwitchId: null,
    isDarkSensorId: null,
    batterySensorId: null,
    batteryLowSensorId: null,
    sleepSensorId: null,
    ptzUpId: null,
    ptzDownId: null,
    ptzLeftId: null,
    ptzRightId: null,
    ptzZoomInId: null,
    ptzZoomOutId: null,
  };
}

const _companionCache = new Map<string, { key: string; result: CompanionResult }>();

/** Detect a HA event entity acting as a doorbell (device_class=doorbell or event_types includes 'ring'). */
function isDoorbellEventEntity(state: HassEntity): boolean {
  if (!state.entity_id.startsWith('event.')) return false;
  const attrs = state.attributes ?? {};
  if (attrs.device_class === 'doorbell') return true;
  const types = attrs.event_types;
  if (Array.isArray(types) && types.includes('ring')) return true;
  // Common naming fallback (Unifi Protect, generic doorbells)
  if (/doorbell|sonnette|chime/i.test(state.entity_id)) return true;
  return false;
}

/** Extract the camera object key from an entity_id : the slug before quality suffixes.
 *  'camera.cour_fluide' → 'cour' ; 'camera.entree_net_2' → 'entree' ; 'camera.cuisine' → 'cuisine'. */
function cameraNamePrefix(eid: string): string {
  const slug = eid.replace(/^camera\./, '');
  return slug.replace(/_(?:fluide|fluent|net|clear|balanced|main|sub|stream|instantanes_.+)(?:_\d+)?$/, '');
}

function discoverCompanions(
  cameraEntityId: string,
  states: Record<string, HassEntity>,
  entities: Record<string, EntityRegistryEntry>,
): CompanionResult {
  // Cache key: device_id + all volatile states we read (binary_sensor for AI/visitor/sleep/battery_low,
  // event for doorbell ring timestamp, switch for privacy, sensor for battery level)
  const camEntry = entities[cameraEntityId];
  if (!camEntry?.device_id) return emptyCompanions();

  const deviceId = camEntry.device_id;
  // Name-prefix match : Reolink multi-channel cams sometimes split companions onto a separate
  // device_id from the camera. Companions sharing the same `<prefix>_` token are also collected.
  const namePrefix = cameraNamePrefix(cameraEntityId);
  const prefixPattern = namePrefix ? new RegExp(`^[a-z_]+\\.${namePrefix}_`) : null;

  let stateKey = deviceId;
  for (const eid of Object.keys(entities)) {
    const sameDevice = entities[eid].device_id === deviceId;
    const samePrefix = prefixPattern?.test(eid) ?? false;
    if (!sameDevice && !samePrefix) continue;
    const st = states[eid];
    if (!st) continue;
    // Only volatile states need to bust the cache: aiDetected[] is derived from
    // binary_sensor states, doorbell rings from event state, and battery level from
    // sensor state. All other companion IDs (detect/snapshots/record/privacy switches)
    // are read fresh in _getCameraInfo without going through this cache.
    if (
      eid.startsWith('binary_sensor.') ||
      eid.startsWith('event.') ||
      (eid.startsWith('sensor.') && COMPANION_PATTERNS.battery.test(eid))
    ) {
      stateKey += `:${eid}=${st.state}`;
    }
  }

  const cached = _companionCache.get(cameraEntityId);
  if (cached && cached.key === stateKey) return cached.result;

  const deviceEntities: string[] = [];
  const seen = new Set<string>();
  for (const [eid, entry] of Object.entries(entities)) {
    if (entry.device_id === deviceId) {
      deviceEntities.push(eid);
      seen.add(eid);
    }
  }
  // Also pull entities sharing the camera's name-prefix (handles multi-channel devices).
  if (prefixPattern) {
    for (const eid of Object.keys(entities)) {
      if (!seen.has(eid) && prefixPattern.test(eid)) {
        deviceEntities.push(eid);
        seen.add(eid);
      }
    }
  }

  const result: CompanionResult = emptyCompanions();

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
    if (eid.startsWith('switch.') && COMPANION_PATTERNS.privacy.test(eid)) {
      result.privacySwitchId = eid;
    }
    if (eid.startsWith('binary_sensor.') && COMPANION_PATTERNS.visitor.test(eid)) {
      result.visitorSensorId = eid;
    }
    if (eid.startsWith('switch.') && COMPANION_PATTERNS.detect.test(eid)) {
      result.detectSwitchId = eid;
    }
    if (eid.startsWith('switch.') && COMPANION_PATTERNS.snapshots.test(eid)) {
      result.snapshotsSwitchId = eid;
    }
    if (eid.startsWith('binary_sensor.') && COMPANION_PATTERNS.is_dark.test(eid)) {
      result.isDarkSensorId = eid;
    }
    if (eid.startsWith('sensor.') && COMPANION_PATTERNS.battery.test(eid)) {
      result.batterySensorId = eid;
    }
    if (eid.startsWith('binary_sensor.') && COMPANION_PATTERNS.battery_low.test(eid)) {
      result.batteryLowSensorId = eid;
    }
    if (eid.startsWith('binary_sensor.') && COMPANION_PATTERNS.sleep_status.test(eid)) {
      result.sleepSensorId = eid;
    }
    if (eid.startsWith('button.')) {
      if (COMPANION_PATTERNS.ptz_up.test(eid)) result.ptzUpId = eid;
      else if (COMPANION_PATTERNS.ptz_down.test(eid)) result.ptzDownId = eid;
      else if (COMPANION_PATTERNS.ptz_left.test(eid)) result.ptzLeftId = eid;
      else if (COMPANION_PATTERNS.ptz_right.test(eid)) result.ptzRightId = eid;
      else if (COMPANION_PATTERNS.ptz_zoom_in.test(eid)) result.ptzZoomInId = eid;
      else if (COMPANION_PATTERNS.ptz_zoom_out.test(eid)) result.ptzZoomOutId = eid;
    }
    if (isDoorbellEventEntity(st)) {
      result.doorbellEventId = eid;
    }
    if (eid.startsWith('binary_sensor.') && st.state === 'on') {
      for (const [pattern, name] of AI_DETECTION) {
        if (pattern.test(eid) && !result.aiDetected.includes(name)) {
          result.aiDetected.push(name);
        }
      }
    }
  }

  _companionCache.set(cameraEntityId, { key: stateKey, result });
  return result;
}

/** Dedupe camera entities that share the same device.
 *  Reolink commonly exposes Fluent/Balanced/Clear + Snapshots Fluent/Clear for ONE camera
 *  (FR: _fluide / _net / _instantanes). We drop snapshot/still streams, then prefer
 *  primary > Fluent/Fluide > shortest entity_id. Entities with no device_id pass through. */
function dedupeCamerasPerDevice(
  ids: string[],
  entities: Record<string, EntityRegistryEntry>,
): string[] {
  // Drop pure-snapshot streams (still images) — covers EN "_snapshots" and FR "_instantanes".
  const withoutSnapshots = ids.filter((eid) => !/_(?:snapshots|instantanes)(?:_|$)/.test(eid));

  const QUALITY_SUFFIX = /_(fluide|fluent|net|clear|balanced)(_|$)/;
  const FLUENT_SUFFIX = /_(fluide|fluent)(_|$)/;

  const preferOver = (a: string, b: string): boolean => {
    // Primary (no quality suffix) wins over any qualified variant.
    const aPrim = !QUALITY_SUFFIX.test(a);
    const bPrim = !QUALITY_SUFFIX.test(b);
    if (aPrim !== bPrim) return aPrim;
    // Fluent (default Reolink stream) wins over Clear / Net / Balanced.
    const aFluent = FLUENT_SUFFIX.test(a);
    const bFluent = FLUENT_SUFFIX.test(b);
    if (aFluent !== bFluent) return aFluent;
    // Tie-break : shortest entity_id (fewer suffixes ≈ more canonical).
    return a.length < b.length;
  };

  const perDevice = new Map<string, string>();
  const noDevice = new Set<string>();
  for (const eid of withoutSnapshots) {
    const deviceId = entities[eid]?.device_id;
    if (!deviceId) {
      noDevice.add(eid);
      continue;
    }
    const current = perDevice.get(deviceId);
    if (!current || preferOver(eid, current)) {
      perDevice.set(deviceId, eid);
    }
  }

  const kept = new Set([...perDevice.values(), ...noDevice]);
  return ids.filter((eid) => kept.has(eid));
}

/** Compute remaining ring window in ms (0 if not ringing).
 *  Clamps `now - ts` to ≥ 0 so a future timestamp (clock skew) doesn't extend the window;
 *  returns 0 when the sensor is stuck ON beyond RING_WINDOW_MS so the badge actually fades. */
function ringExpiry(
  doorbellEventId: string | null,
  visitorSensorId: string | null,
  states: Record<string, HassEntity>,
  now: number,
): number {
  // Event entity : state is the last-ring ISO timestamp, attributes.event_type === 'ring'.
  if (doorbellEventId) {
    const st = states[doorbellEventId];
    if (st && st.attributes?.event_type === 'ring' && st.state && st.state !== 'unknown' && st.state !== 'unavailable') {
      const ts = new Date(st.state).getTime();
      if (Number.isFinite(ts)) {
        const elapsed = Math.max(0, now - ts);
        const remaining = RING_WINDOW_MS - elapsed;
        if (remaining > 0) return remaining;
      }
    }
  }
  // Reolink binary_sensor _visitor : pulses ON for a few seconds.
  if (visitorSensorId) {
    const st = states[visitorSensorId];
    if (st?.state === 'on') {
      const ts = new Date(st.last_changed).getTime();
      if (Number.isFinite(ts)) {
        const elapsed = Math.max(0, now - ts);
        const remaining = RING_WINDOW_MS - elapsed;
        if (remaining > 0) return remaining;
      }
      // Sensor stuck ON beyond the ring window — stop showing the badge so the user isn't
      // misled by a missed MQTT OFF. The hero pulse already de-emphasizes when ring expires.
    }
  }
  return 0;
}

// — State text helper —

function cameraStateText(cam: CameraInfo): string {
  if (!cam.isOn) return t('camera.off');
  if (cam.isPrivacyOn) return t('camera.privacy_on');
  if (cam.isRinging) return t('camera.ringing');
  switch (cam.state) {
    case 'idle': return t('camera.idle');
    case 'streaming': return t('camera.streaming');
    case 'recording': return t('camera.recording');
    default: return cam.state;
  }
}

// — Icon from entity attributes —

function cameraIcon(entity: HassEntity, isDoorbell: boolean): string {
  const icon = entity.attributes?.icon as string | undefined;
  if (icon) return icon;
  if (isDoorbell) return CAM_ICONS.doorbell;

  // Guess from entity_id
  const eid = entity.entity_id;
  if (eid.includes('doorbell') || eid.includes('sonnette')) return CAM_ICONS.doorbell;
  if (eid.includes('indoor') || eid.includes('salon') || eid.includes('chambre')) return CAM_ICONS.indoor;
  return CAM_ICONS.outdoor;
}

// ================================================================
//  GlassCameraCarouselCard
// ================================================================

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
  private _configLoading = false;
  private _roomConfigLoading = false;
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
        this._cachedCamerasKey = '';
        this._loadRoomConfig();
      }
    });
    this._listen('dashboard-config-changed', () => this.requestUpdate());
    // Refresh stream overlay timestamp every 60s
    this._timestampTimer = setInterval(() => this.requestUpdate(), 60_000);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._backend = undefined;
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
      if (!this._backend || this._backend.connection !== this.hass.connection) {
        this._backend = new BackendService(this.hass);
      }
    }

    if (this.areaId !== this._lastAreaId) {
      this._lastAreaId = this.areaId;
      this._carouselIndex = 0;
      this._cachedCamerasKey = '';
      this._configLoaded = false;
      this._roomConfig = null;
      this._liveIds = new Set();
      this._reolinkCamCache.clear();
    }

    if (!this._configLoaded && !this._configLoading) {
      this._loadConfig();
    }
    if (this.areaId && !this._roomConfig && !this._roomConfigLoading) {
      this._loadRoomConfig();
    }
  }

  private async _loadConfig() {
    if (!this._backend || this._configLoading) return;
    this._configLoading = true;
    const version = ++this._loadVersion;
    try {
      const resp = await this._backend.send<{ camera_carousel: CameraBackendConfig }>('get_config');
      if (version !== this._loadVersion) return;
      this._camConfig = resp.camera_carousel || { show_header: true, entity_order: [], hidden_entities: [], auto_cycle: false, cycle_interval: 10 };
      this._configLoaded = true;
      this._setupCycleTimer();
      this.requestUpdate();
    } catch {
      // silent — will retry on next update
    } finally {
      this._configLoading = false;
    }
  }

  private async _loadRoomConfig() {
    if (!this._backend || !this.areaId || this._roomConfigLoading) return;
    this._roomConfigLoading = true;
    const targetArea = this.areaId;
    try {
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
      // silent
    } finally {
      this._roomConfigLoading = false;
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

    // Filter out hidden entities (global + per-room)
    const hiddenSet = new Set(this._camConfig?.hidden_entities ?? []);
    if (this.areaId && this._roomConfig) {
      for (const id of this._roomConfig.hidden_entities) hiddenSet.add(id);
    }
    if (hiddenSet.size) ids = ids.filter((eid) => !hiddenSet.has(eid));

    // Dedupe multiple streams per device (Reolink Fluent/Clear/Balanced/Snapshots).
    ids = dedupeCamerasPerDevice(ids, this.hass.entities);

    // Cheap fingerprint: skip expensive sort if camera set + alert states unchanged
    const cheapKey = ids.length + ':' + ids.map((eid) => {
      const s = this.hass?.states[eid];
      return s ? `${eid}:${s.last_changed}` : eid;
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
        <div class="carousel-hero ${currentCam?.isDoorbell ? 'aspect-portrait' : ''} ${this.previewFullscreen ? 'fs-preview' : ''} ${this._isFullscreen ? 'fs-active' : ''}"
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
            <img class="cam-thumbnail" src="${cam.entityPicture}" alt="${cam.name}" />
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
    css`
      :host {
        width: 100%;
        max-width: 31.25rem;
        margin: 0 auto;
        user-select: none;
        -webkit-user-select: none;

        --cam-color: #60a5fa;
        --cam-bg: rgba(var(--rgb-info),0.1);
        --cam-border: rgba(var(--rgb-info),0.15);
        --cam-glow: rgba(var(--rgb-info),0.4);
        --cam-sub: rgba(var(--rgb-info),0.6);
      }

      .card-header {
        display: flex; align-items: center; justify-content: space-between;
        padding: 0 0.375rem; margin-bottom: 0.375rem; min-height: 1.375rem;
      }
      .card-header-left { display: flex; align-items: center; gap: 0.5rem; }
      .card-title {
        font-size: var(--fz-xs); font-weight: 700; text-transform: uppercase;
        letter-spacing: 1.5px; color: var(--t4);
      }

      /* — Wrap — */
      .cam-wrap {
        position: relative; z-index: 1;
        display: flex; flex-direction: column; gap: 0;
      }

      /* — Hero — */
      .carousel-hero {
        position: relative; width: 100%; aspect-ratio: 16 / 9;
        /* border-box so the 1px border doesn't push hero 2px wider than .cam-wrap
           (would create the visible right-edge offset between hero and fold). */
        box-sizing: border-box;
        border-radius: var(--radius-xl);
        overflow: hidden;
        background: #0a0f18;
        border: 1px solid var(--b2);
        box-shadow:
          0 8px 32px rgba(var(--rgb-black),0.3),
          0 2px 8px rgba(var(--rgb-black),0.2),
          inset 0 1px 0 rgba(var(--rgb-white),0.04);
        touch-action: pan-y;
        -webkit-tap-highlight-color: transparent;
        transition: border-radius var(--t-layout), border-color var(--t-fast);
      }
      @media (hover: hover) and (pointer: fine) { .carousel-hero:hover { border-color: var(--b3); } }

      /* Event pulse on the card outline — a single ::after overlay on .cam-wrap so the
         contour stays unified whether the fold is open or closed. The hero + fold each keep
         their static borders underneath; the overlay draws ONE continuous ring around both. */
      .cam-wrap::after {
        content: '';
        position: absolute; inset: 0;
        border-radius: var(--radius-xl);
        pointer-events: none;
        border: 1.5px solid transparent;
        opacity: 0;
        transition: opacity 0.2s ease-out;
        z-index: 6;
      }
      .cam-wrap.pulse-ring::after,
      .cam-wrap.pulse-alert::after,
      .cam-wrap.pulse-ai::after,
      .cam-wrap.pulse-motion::after { opacity: 1; }

      @keyframes cam-pulse-ring {
        0%, 100% { border-color: rgba(var(--rgb-accent), 0.4);
                   box-shadow: 0 0 0 0 rgba(var(--rgb-accent), 0); }
        50%      { border-color: rgba(var(--rgb-accent), 1);
                   box-shadow: 0 0 18px 2px rgba(var(--rgb-accent), 0.5); }
      }
      @keyframes cam-pulse-ai {
        0%, 100% { border-color: rgba(var(--rgb-warning), 0.4);
                   box-shadow: 0 0 0 0 rgba(var(--rgb-warning), 0); }
        50%      { border-color: rgba(var(--rgb-warning), 1);
                   box-shadow: 0 0 14px 1px rgba(var(--rgb-warning), 0.4); }
      }
      @keyframes cam-pulse-motion {
        0%, 100% { border-color: rgba(var(--rgb-info), 0.35); }
        50%      { border-color: rgba(var(--rgb-info), 0.85); }
      }
      @keyframes cam-pulse-alert {
        0%, 100% { border-color: rgba(var(--rgb-alert), 0.4);
                   box-shadow: 0 0 0 0 rgba(var(--rgb-alert), 0); }
        50%      { border-color: rgba(var(--rgb-alert), 1);
                   box-shadow: 0 0 16px 2px rgba(var(--rgb-alert), 0.45); }
      }
      .cam-wrap.pulse-ring::after   { animation: cam-pulse-ring 1.2s ease-in-out infinite; }
      .cam-wrap.pulse-alert::after  { animation: cam-pulse-alert 1.6s ease-in-out infinite; }
      .cam-wrap.pulse-ai::after     { animation: cam-pulse-ai 2s ease-in-out infinite; }
      .cam-wrap.pulse-motion::after { animation: cam-pulse-motion 2.4s ease-in-out infinite; }

      /* Connected fold: hero loses bottom radius when fold is open (mirrors media-card).
         The inset bottom shadow is only added when fold is open so the closed-state hero
         doesn't show a useless dark inner line. */
      .cam-wrap.fold-open .carousel-hero {
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
        border-bottom-color: transparent;
        box-shadow:
          0 8px 32px rgba(var(--rgb-black),0.3),
          0 2px 8px rgba(var(--rgb-black),0.2),
          inset 0 1px 0 rgba(var(--rgb-white),0.04),
          inset 0 -1px 0 rgba(var(--rgb-black),0.1);
      }

      .tint {
        position: absolute; inset: 0; border-radius: inherit;
        pointer-events: none; z-index: 0;
        transition: opacity 1.2s cubic-bezier(0.4,0,0.2,1), background 1.2s cubic-bezier(0.4,0,0.2,1);
      }

      .carousel-track {
        position: absolute; inset: 0;
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
          radial-gradient(circle at 30% 40%, rgba(var(--rgb-info),0.06) 0%, transparent 50%),
          radial-gradient(circle at 70% 60%, rgba(var(--rgb-accent),0.04) 0%, transparent 50%),
          linear-gradient(135deg, #0d1520 0%, #0a0f18 100%);
      }
      .carousel-slide-inner.off-feed {
        background: linear-gradient(135deg, #0a0e14 0%, #080c12 100%);
      }
      /* Privacy feed: dim, neutral, with eye-off centerpiece. */
      .carousel-slide-inner.privacy-feed {
        background:
          radial-gradient(circle at 50% 50%, rgba(var(--rgb-warning),0.08) 0%, transparent 60%),
          linear-gradient(135deg, #14110a 0%, #0c0a07 100%);
      }
      .privacy-placeholder {
        position: absolute; inset: 0;
        display: flex; flex-direction: column; align-items: center; justify-content: center;
        gap: 0.375rem; z-index: 3;
        padding: 0 1rem;
        text-align: center;
      }
      .privacy-label {
        font-size: var(--fz-sm); font-weight: 700; color: var(--c-warning);
        letter-spacing: 0.5px; text-transform: uppercase;
      }
      .privacy-sub {
        font-size: var(--fz-xs); font-weight: 500; color: var(--t4);
        max-width: 16rem;
      }

      .cam-thumbnail {
        position: absolute; inset: 0; width: 100%; height: 100%;
        object-fit: cover; z-index: 0;
      }
      .cam-stream {
        position: absolute; inset: 0; width: 100%; height: 100%;
        display: block; z-index: 0; overflow: hidden;
        --video-object-fit: cover;
      }

      /* — Stream overlays — */
      .stream-overlay-top {
        position: absolute; top: 0; left: 0; right: 0; z-index: 2;
        display: flex; align-items: center; justify-content: space-between;
        padding: 0.5rem 0.625rem;
      }
      .stream-cam-name {
        font-size: var(--fz-sm); font-weight: 600; color: rgba(var(--rgb-white),0.85);
        display: flex; align-items: center; gap: 0.3125rem;
        text-shadow: 0 1px 2px rgba(0,0,0,0.55);
      }
      .stream-cam-name ha-icon { display: flex; align-items: center; justify-content: center; }
      .rec-indicator {
        display: inline-flex; align-items: center; gap: 0.1875rem;
        font-size: var(--fz-xs); font-weight: 700; color: var(--c-alert);
        letter-spacing: 0.5px;
      }
      .rec-circle {
        width: 0.375rem; height: 0.375rem; border-radius: 50%; background: var(--c-alert);
        animation: rec-pulse 1.5s ease-in-out infinite;
      }
      @keyframes rec-pulse {
        0%, 100% { opacity: 1; box-shadow: 0 0 4px var(--c-alert); }
        50% { opacity: 0.4; box-shadow: 0 0 0px var(--c-alert); }
      }
      .ring-indicator {
        display: inline-flex; align-items: center; gap: 0.1875rem;
        padding: 0.0625rem 0.375rem; border-radius: var(--radius-sm);
        font-size: var(--fz-xs); font-weight: 700; color: var(--c-accent);
        letter-spacing: 0.5px;
        background: rgba(var(--rgb-accent),0.18);
        border: 1px solid rgba(var(--rgb-accent),0.35);
        animation: ring-flash 0.9s ease-in-out infinite;
      }
      .ring-circle {
        width: 0.375rem; height: 0.375rem; border-radius: 50%;
        background: var(--c-accent);
        box-shadow: 0 0 6px var(--c-accent);
      }
      @keyframes ring-flash {
        0%, 100% { transform: scale(1); box-shadow: 0 0 0 rgba(var(--rgb-accent),0); }
        50% { transform: scale(1.04); box-shadow: 0 0 10px rgba(var(--rgb-accent),0.4); }
      }
      .stream-time {
        font-size: var(--fz-xs); font-weight: 500; color: rgba(var(--rgb-white),0.5);
        font-variant-numeric: tabular-nums;
        display: inline-flex; align-items: center; gap: 0.25rem;
      }
      .night-icon {
        display: inline-flex; align-items: center; justify-content: center;
        color: rgba(var(--rgb-info),0.85);
      }
      .sleep-icon {
        display: inline-flex; align-items: center; justify-content: center;
        color: rgba(var(--rgb-white),0.6);
      }
      .battery-badge {
        display: inline-flex; align-items: center; gap: 0.1875rem;
        padding: 0 0.25rem; border-radius: var(--radius-sm);
        font-size: var(--fz-xs); font-weight: 600;
        background: rgba(var(--rgb-white),0.08);
        color: rgba(var(--rgb-white),0.75);
      }
      .battery-badge.low {
        background: rgba(var(--rgb-alert),0.18);
        color: var(--c-alert);
        animation: battery-low-pulse 2s ease-in-out infinite;
      }
      @keyframes battery-low-pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.55; }
      }
      .battery-badge ha-icon { display: inline-flex; align-items: center; justify-content: center; }

      /* Doorbell-shaped aspect — portrait 3/4 for typical doorbell cameras. */
      .carousel-hero.aspect-portrait { aspect-ratio: 3 / 4; }

      /* Fullscreen toggle button — compact, in the stream overlay clock area. */
      .fs-toggle-btn {
        display: inline-flex; align-items: center; justify-content: center;
        background: none; border: none; padding: 0.125rem;
        color: rgba(var(--rgb-white),0.6);
        cursor: pointer; border-radius: var(--radius-sm);
        margin-left: 0.125rem;
        transition: color var(--t-fast);
        -webkit-tap-highlight-color: transparent;
      }
      .fs-toggle-btn:hover { color: rgba(var(--rgb-white),0.95); }
      .fs-toggle-btn:focus-visible { outline: 2px solid rgba(var(--rgb-white),0.3); outline-offset: 1px; }
      .fs-toggle-btn ha-icon { display: inline-flex; align-items: center; justify-content: center; }

      /* Pseudo-fullscreen — bypasses Shadow DOM limitations of the native API.
         Position fixed at viewport, escapes ALL ancestor constraints (max-width, overflow…). */
      .carousel-hero.fs-active {
        position: fixed; inset: 0;
        width: 100vw; height: 100vh; max-width: none; max-height: none;
        aspect-ratio: auto; border-radius: 0; border: none;
        box-shadow: none; background: #000;
        z-index: 99999;
      }
      .carousel-hero.fs-active .cam-stream,
      .carousel-hero.fs-active .cam-thumbnail {
        width: 100%; height: 100%;
        object-fit: contain; /* preserve full image — no crop in fullscreen */
      }

      /* Fullscreen overlay — hidden by default, visible only when .fs-active (real) or
         .fs-preview (dev harness simulation). */
      .fs-overlay { display: none; }
      .carousel-hero.fs-active .fs-overlay,
      .carousel-hero.fs-preview .fs-overlay {
        display: block;
        position: absolute; inset: 0;
        pointer-events: none;
        z-index: 10;
      }
      /* Drop the carousel arrows / dots / stream overlays in fullscreen — fs-overlay has its own. */
      .carousel-hero.fs-active .carousel-nav,
      .carousel-hero.fs-active .carousel-dots,
      .carousel-hero.fs-active .stream-overlay-top,
      .carousel-hero.fs-active .stream-overlay-bottom,
      .carousel-hero.fs-preview .carousel-nav,
      .carousel-hero.fs-preview .carousel-dots,
      .carousel-hero.fs-preview .stream-overlay-top,
      .carousel-hero.fs-preview .stream-overlay-bottom { display: none; }

      .fs-back-btn {
        position: absolute; top: 1rem; right: 1rem;
        width: 2.5rem; height: 2.5rem; border-radius: 50%;
        display: inline-flex; align-items: center; justify-content: center;
        background: rgba(0,0,0,0.45);
        backdrop-filter: var(--blur-lg, blur(12px));
        -webkit-backdrop-filter: var(--blur-lg, blur(12px));
        border: 1px solid rgba(255,255,255,0.12);
        color: rgba(255,255,255,0.9); cursor: pointer;
        pointer-events: auto;
        transition: background var(--t-fast), transform var(--t-fast);
        -webkit-tap-highlight-color: transparent;
        touch-action: manipulation;
      }
      .fs-back-btn:hover { background: rgba(0,0,0,0.6); transform: scale(1.05); }
      .fs-back-btn ha-icon { display: inline-flex; align-items: center; justify-content: center; }

      /* Top-left floating action chips (snapshot, motion toggle). */
      .fs-top-chips {
        position: absolute; top: 1rem; left: 1rem;
        display: flex; gap: 0.5rem;
        pointer-events: auto;
      }
      .fs-chip {
        width: 2.5rem; height: 2.5rem; border-radius: 50%;
        display: inline-flex; align-items: center; justify-content: center;
        background: rgba(0,0,0,0.45);
        backdrop-filter: var(--blur-lg, blur(12px));
        -webkit-backdrop-filter: var(--blur-lg, blur(12px));
        border: 1px solid rgba(255,255,255,0.12);
        color: rgba(255,255,255,0.9); cursor: pointer;
        pointer-events: auto; /* explicit override — parent fs-overlay has pointer-events:none */
        transition: background var(--t-fast), transform var(--t-fast), color var(--t-fast);
        -webkit-tap-highlight-color: transparent;
        touch-action: manipulation;
      }
      .fs-chip:hover { background: rgba(0,0,0,0.6); transform: scale(1.05); }
      .fs-chip.active {
        background: rgba(var(--rgb-alert), 0.3);
        border-color: rgba(var(--rgb-alert), 0.5);
        color: var(--c-alert);
      }
      .fs-chip ha-icon { display: inline-flex; align-items: center; justify-content: center; }

      /* Joysticks — circular floating PTZ controls (Reolink/Frigate-style). */
      .joystick {
        position: absolute;
        width: 8rem; height: 8rem;
        border-radius: 50%;
        background: radial-gradient(circle at 50% 50%, rgba(255,255,255,0.04), rgba(0,0,0,0.55) 70%);
        backdrop-filter: var(--blur-lg, blur(16px));
        -webkit-backdrop-filter: var(--blur-lg, blur(16px));
        border: 1px solid rgba(255,255,255,0.12);
        box-shadow: 0 8px 24px rgba(0,0,0,0.4);
        pointer-events: auto;
      }
      .joystick-pan  { bottom: 1.5rem; left: 1.5rem; }
      .joystick-zoom { bottom: 1.5rem; right: 1.5rem; width: 5.5rem; height: 5.5rem; }
      .joystick-center {
        position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%);
        width: 0.625rem; height: 0.625rem; border-radius: 50%;
        background: rgba(255,255,255,0.18);
        pointer-events: none;
      }
      .jp {
        position: absolute;
        width: 2.5rem; height: 2.5rem; border-radius: 50%;
        display: inline-flex; align-items: center; justify-content: center;
        background: rgba(255,255,255,0.08);
        border: 1px solid rgba(255,255,255,0.08);
        color: rgba(255,255,255,0.88); cursor: pointer;
        /* Explicit pointer-events override — some WebKit builds (iOS 15-16) don't propagate
           the parent's pointer-events:auto to non-positioned descendants reliably. */
        pointer-events: auto;
        transition: background var(--t-fast), transform var(--t-fast);
        -webkit-tap-highlight-color: transparent;
      }
      .jp:hover { background: rgba(255,255,255,0.18); transform: scale(1.08); }
      .jp:active { background: rgba(var(--rgb-accent), 0.35); }
      .jp ha-icon { display: inline-flex; align-items: center; justify-content: center; }
      .jp-up    { top: 0.375rem; left: 50%; transform: translateX(-50%); }
      .jp-down  { bottom: 0.375rem; left: 50%; transform: translateX(-50%); }
      .jp-left  { left: 0.375rem; top: 50%; transform: translateY(-50%); }
      .jp-right { right: 0.375rem; top: 50%; transform: translateY(-50%); }
      .joystick-zoom .jp { width: 2rem; height: 2rem; }
      /* Hover/active retain centering — re-apply transform with scale. */
      .jp-up:hover    { transform: translateX(-50%) scale(1.08); }
      .jp-down:hover  { transform: translateX(-50%) scale(1.08); }
      .jp-left:hover  { transform: translateY(-50%) scale(1.08); }
      .jp-right:hover { transform: translateY(-50%) scale(1.08); }

      /* PTZ D-pad — compact horizontal row (left/up/down/right + zoom). */
      .ptz-dpad {
        display: inline-flex; gap: 0.25rem; align-items: center;
      }
      .ptz-dpad-fold {
        display: flex; gap: 0.25rem; flex-wrap: wrap;
        margin-top: 0.5rem;
        padding-top: 0.5rem;
        border-top: 1px solid rgba(var(--rgb-white),0.06);
      }
      .stream-overlay-bottom {
        position: absolute; bottom: 0; left: 0; right: 0; z-index: 2;
        display: flex; align-items: center; justify-content: space-between;
        padding: 0.5rem 0.625rem;
      }
      .stream-ai-tags { display: flex; gap: 0.25rem; }
      .stream-ai-tag {
        display: inline-flex; align-items: center; gap: 0.1875rem;
        padding: 0.125rem 0.375rem; border-radius: var(--radius-sm);
        font-size: var(--fz-xs); font-weight: 600;
        background: rgba(var(--rgb-info),0.15); color: var(--cam-color);
        border: 1px solid rgba(var(--rgb-info),0.2);
      }
      .stream-ai-tag ha-icon { display: flex; align-items: center; justify-content: center; }
      .stream-placeholder {
        display: flex; flex-direction: column; align-items: center; gap: 0.375rem;
        z-index: 3; background: none; border: none; padding: 0; cursor: pointer;
        outline: none; -webkit-tap-highlight-color: transparent;
        font-family: inherit;
      }
      .stream-placeholder:focus-visible { outline: 2px solid rgba(var(--rgb-white),0.3); outline-offset: 4px; border-radius: var(--radius-md); }
      .stream-placeholder span { font-size: var(--fz-sm); color: var(--t4); font-weight: 500; }
      button.stream-placeholder { position: absolute; inset: 0; width: 100%; height: 100%; justify-content: center; }

      /* — Nav arrows (positioning overlay for <glass-icon-button>) — */
      .carousel-nav {
        position: absolute; top: 50%; transform: translateY(-50%);
        z-index: 5; opacity: 0.7;
        transition: opacity 0.2s cubic-bezier(0.4,0,0.2,1);
      }
      .carousel-nav.prev { left: 0.5rem; }
      .carousel-nav.next { right: 0.5rem; }
      @media (hover: hover) and (pointer: fine) {
        .carousel-nav:hover { opacity: 1; }
      }

      /* — Dots (overlay inside hero) — */
      .carousel-dots {
        position: absolute; bottom: 0.5rem; left: 0; right: 0; z-index: 5;
        display: flex; align-items: center; justify-content: center; gap: 0.375rem;
      }
      .carousel-dot-btn {
        width: 0.5rem; height: 0.5rem; border-radius: 50%; padding: 0;
        border: none; background: var(--t4); cursor: pointer;
        transition: width 0.2s cubic-bezier(0.4,0,0.2,1), border-radius 0.2s cubic-bezier(0.4,0,0.2,1), background 0.2s cubic-bezier(0.4,0,0.2,1), box-shadow 0.2s cubic-bezier(0.4,0,0.2,1); outline: none;
        -webkit-tap-highlight-color: transparent;
      }
      .carousel-dot-btn:focus-visible { outline: 2px solid rgba(var(--rgb-white),0.3); outline-offset: 2px; }
      .carousel-dot-btn.active {
        width: 1.25rem; border-radius: 4px;
        background: var(--cam-color); box-shadow: 0 0 8px var(--cam-glow);
      }
      .carousel-dot-btn.recording {
        background: var(--c-alert); box-shadow: 0 0 6px rgba(var(--rgb-alert),0.5);
      }
      .carousel-dot-btn.recording.active {
        background: var(--c-alert);
        animation: rec-pulse 1.5s ease-in-out infinite;
      }
      .carousel-dot-btn.motion-dot {
        background: var(--c-warning); box-shadow: 0 0 6px rgba(var(--rgb-warning),0.4);
      }

      @media (hover: hover) and (pointer: fine) {
        .carousel-dot-btn:hover { background: var(--t3); }
      }

      /* — Connected Fold — */
      .ctrl-fold {
        display: grid; grid-template-rows: 0fr;
        transition: grid-template-rows var(--t-layout);
      }
      .ctrl-fold.open { grid-template-rows: 1fr; }
      .ctrl-fold-inner {
        overflow: hidden;
        box-sizing: border-box;
        opacity: 0; transition: opacity 0.25s;
        background: linear-gradient(135deg, rgba(var(--rgb-white),0.03), rgba(var(--rgb-white),0.01));
        backdrop-filter: var(--blur-lg);
        -webkit-backdrop-filter: var(--blur-lg);
        border: 1px solid var(--b2);
        border-top: none;
        border-radius: 0 0 var(--radius-xl) var(--radius-xl);
        box-shadow:
          0 8px 32px rgba(var(--rgb-black),0.3),
          0 2px 8px rgba(var(--rgb-black),0.2),
          inset 0 -1px 0 rgba(var(--rgb-black),0.1);
      }
      .ctrl-fold.open .ctrl-fold-inner { opacity: 1; transition-delay: 0.1s; }

      .fold-sep-top {
        height: 0.0625rem; margin: 0 0.75rem;
        background: linear-gradient(90deg, transparent, rgba(var(--rgb-white),0.12), transparent);
      }
      .fold-panel {
        display: flex; flex-direction: column; gap: 0.625rem;
        padding: 0.75rem 0.875rem 0.875rem;
      }

      /* — Info bar — */
      .carousel-info {
        display: flex; align-items: center; gap: 0.625rem; padding: 0 0.125rem;
      }
      .carousel-cam-icon {
        width: 2.5rem; height: 2.5rem; border-radius: var(--radius-md);
        background: var(--s2); border: 1px solid var(--b1);
        display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        transition: background 0.2s cubic-bezier(0.4,0,0.2,1), border-color 0.2s cubic-bezier(0.4,0,0.2,1);
      }
      .carousel-cam-icon ha-icon {
        color: var(--t3); display: flex; align-items: center; justify-content: center;
      }
      .carousel-cam-icon.on { background: var(--cam-bg); border-color: var(--cam-border); }
      .carousel-cam-icon.on ha-icon { color: var(--cam-color); }
      .carousel-info-text { flex: 1; min-width: 0; }
      .carousel-cam-name {
        font-size: var(--fz-md); font-weight: 600; color: var(--t1);
        overflow: hidden; white-space: nowrap; text-overflow: ellipsis;
      }
      .carousel-cam-sub {
        display: flex; align-items: center; gap: 0.3125rem; margin-top: 0.0625rem;
      }
      .carousel-state { font-size: var(--fz-sm); font-weight: 500; color: var(--t3); }
      .carousel-state.live { color: var(--cam-sub); }
      .carousel-state.ringing { color: var(--c-accent); font-weight: 600; }
      .carousel-state.privacy { color: var(--c-warning); font-weight: 600; }
      .carousel-ai-mini { display: flex; gap: 0.125rem; align-items: center; }
      .ai-badge {
        display: inline-flex; align-items: center; justify-content: center;
        width: 1rem; height: 1rem; border-radius: var(--radius-sm);
        font-size: var(--fz-sm); transition: background 0.2s cubic-bezier(0.4,0,0.2,1), color 0.2s cubic-bezier(0.4,0,0.2,1);
      }
      .ai-badge.active { background: rgba(var(--rgb-info),0.12); color: var(--cam-color); }
      .ai-badge ha-icon {
        display: flex; align-items: center; justify-content: center;
        filter: drop-shadow(0 0 4px var(--cam-glow));
      }

      /* — Quick actions — */
      .carousel-actions { display: flex; gap: 0.375rem; flex-wrap: wrap; align-items: center; }
      /* Recording-active <glass-button>: tint the label red to match the alert active state. */
      glass-button.rec-active { color: var(--c-alert); }
      /* Privacy-active <glass-button>: tint warning to match the privacy overlay. */
      glass-button.privacy-active { color: var(--c-warning); }
    `,
  ];
}

try { customElements.define('glass-camera-carousel-card', GlassCameraCarouselCard); } catch { /* already registered */ }
