import { t } from '@glass-cards/i18n';
import type { HassEntity, EntityRegistryEntry } from '@glass-cards/base-card';

// — Feature bitmask (HA CameraEntityFeature) —

export const F = {
  ON_OFF: 1,
  STREAM: 2,
} as const;

// — Icon map per camera type —

export const CAM_ICONS: Record<string, string> = {
  outdoor: 'mdi:cctv',
  indoor: 'mdi:webcam',
  doorbell: 'mdi:doorbell-video',
  ptz: 'mdi:cctv',
  hub: 'mdi:tablet',
};

// — AI detection icons —

export const AI_ICONS: Record<string, string> = {
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
export const COMPANION_PATTERNS = {
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
export const RING_WINDOW_MS = 30_000;

// AI detection: [regex on entity_id, canonical name].
// Patterns cover Reolink (_person / _personne), Unifi Protect (_person_detected),
// Frigate (_person_occupancy), Eufy (_person_detected).
export const AI_DETECTION: [RegExp, string][] = [
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

export interface CameraInfo {
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

export type CameraAspectRatio = 'auto' | '16:9' | '4:3' | '1:1' | '3:4';

export interface CameraBackendConfig {
  show_header: boolean;
  entity_order: string[];
  hidden_entities: string[];
  auto_cycle: boolean;
  cycle_interval: number;
  entity_aspect_ratios: Record<string, CameraAspectRatio>;
}

export interface CameraRoomConfig {
  hidden_entities: string[];
  entity_order: string[];
}

// — Helper: discover companion entities for a camera (memoized) —

export type CompanionResult = {
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

export function emptyCompanions(): CompanionResult {
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

/** Detect a HA event entity acting as a doorbell.
 *  Only trust strict signals (device_class or event_types) — the regex fallback
 *  caused false positives on generic camera integrations (Action no-name, etc.). */
export function isDoorbellEventEntity(state: HassEntity): boolean {
  if (!state.entity_id.startsWith('event.')) return false;
  const attrs = state.attributes ?? {};
  if (attrs.device_class === 'doorbell') return true;
  const types = attrs.event_types;
  if (Array.isArray(types) && types.includes('ring')) return true;
  return false;
}

/** Extract the camera object key from an entity_id : the slug before quality suffixes.
 *  'camera.cour_fluide' → 'cour' ; 'camera.entree_net_2' → 'entree' ; 'camera.cuisine' → 'cuisine'. */
export function cameraNamePrefix(eid: string): string {
  const slug = eid.replace(/^camera\./, '');
  return slug.replace(/_(?:fluide|fluent|net|clear|balanced|main|sub|stream|instantanes_.+)(?:_\d+)?$/, '');
}

export function discoverCompanions(
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
export function dedupeCamerasPerDevice(
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
export function ringExpiry(
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

export function cameraStateText(cam: CameraInfo): string {
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

export function cameraIcon(entity: HassEntity, isDoorbell: boolean): string {
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
