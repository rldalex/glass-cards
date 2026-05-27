// Camera-carousel harness — multi cameras avec alerts + companions (motion, record).

import { layoutHarness, rowEl, chipEl } from './setup-climate';
import { makeCardHass, type MockEntitySpec } from './mock-card-hass';
import type { HomeAssistant } from '@glass-cards/base-card';

interface Scenario { id: string; label: string; description: string; entities: MockEntitySpec[] }

interface CompanionOpts {
  motion?: boolean;
  recording?: boolean;
  aiPerson?: boolean;
  // Doorbell event entity (HA core: device_class=doorbell, event_type=ring).
  doorbell?: boolean;
  // ms ago the doorbell last rang (within 30 000 = active ring). undefined = never.
  ringAgoMs?: number;
  // Reolink-style binary_sensor _visitor (legacy doorbell signal).
  visitorOn?: boolean;
  // Reolink switch _privacy_mode.
  privacyOn?: boolean;
}

function camWithCompanions(entityId: string, name: string, state: string, area: string, deviceId: string, opts: CompanionOpts): MockEntitySpec[] {
  const cam: MockEntitySpec = {
    entity_id: entityId,
    state,
    area_id: area,
    device_id: deviceId,
    attributes: {
      friendly_name: name,
      entity_picture: `/api/camera_proxy/${entityId}?token=mock`,
    },
  };
  const motion: MockEntitySpec = {
    entity_id: `binary_sensor.${deviceId}_motion`,
    state: opts.motion ? 'on' : 'off',
    device_id: deviceId,
    area_id: area,
    attributes: { friendly_name: `${name} Motion`, device_class: 'motion' },
  };
  const record: MockEntitySpec = {
    entity_id: `switch.${deviceId}_record`,
    state: opts.recording ? 'on' : 'off',
    device_id: deviceId,
    area_id: area,
    attributes: { friendly_name: `${name} Record` },
  };
  const aiPerson: MockEntitySpec = {
    entity_id: `binary_sensor.${deviceId}_person`,
    state: opts.aiPerson ? 'on' : 'off',
    device_id: deviceId,
    area_id: area,
    attributes: { friendly_name: `${name} AI Person`, device_class: 'occupancy' },
  };
  const list: MockEntitySpec[] = [cam, motion, record, aiPerson];

  if (opts.doorbell) {
    const ringTs = opts.ringAgoMs !== undefined
      ? new Date(Date.now() - opts.ringAgoMs).toISOString()
      : 'unknown';
    list.push({
      entity_id: `event.${deviceId}_doorbell`,
      state: ringTs,
      device_id: deviceId,
      area_id: area,
      attributes: {
        friendly_name: `${name} Doorbell`,
        device_class: 'doorbell',
        event_types: ['ring'],
        event_type: opts.ringAgoMs !== undefined ? 'ring' : null,
      },
    });
  }
  if (opts.visitorOn !== undefined) {
    list.push({
      entity_id: `binary_sensor.${deviceId}_visitor`,
      state: opts.visitorOn ? 'on' : 'off',
      device_id: deviceId,
      area_id: area,
      attributes: { friendly_name: `${name} Visitor`, device_class: 'occupancy' },
    });
  }
  if (opts.privacyOn !== undefined) {
    list.push({
      entity_id: `switch.${deviceId}_privacy_mode`,
      state: opts.privacyOn ? 'on' : 'off',
      device_id: deviceId,
      area_id: area,
      attributes: { friendly_name: `${name} Privacy mode` },
    });
  }
  return list;
}

const SCENARIOS: Scenario[] = [
  {
    id: 'single_idle',
    label: 'Une caméra (idle)',
    description: 'Caméra seule, pas de mouvement',
    entities: camWithCompanions('camera.entree', 'Entrée', 'idle', 'salon', 'reolink_entree', {}),
  },
  {
    id: 'single_motion',
    label: 'Une caméra (motion + AI personne)',
    description: 'Mouvement détecté + IA = personne',
    entities: camWithCompanions('camera.entree', 'Entrée', 'idle', 'salon', 'reolink_entree', { motion: true, aiPerson: true }),
  },
  {
    id: 'single_recording',
    label: 'En enregistrement',
    description: 'Caméra streaming + recording on',
    entities: camWithCompanions('camera.entree', 'Entrée', 'streaming', 'salon', 'reolink_entree', { recording: true }),
  },
  {
    id: 'multi',
    label: '4 caméras mixées',
    description: 'Entrée + Salon + Jardin + Garage avec états variés',
    entities: [
      ...camWithCompanions('camera.entree', 'Entrée', 'idle', 'salon', 'cam_entree', { motion: true, aiPerson: true }),
      ...camWithCompanions('camera.salon', 'Salon', 'idle', 'salon', 'cam_salon', {}),
      ...camWithCompanions('camera.jardin', 'Jardin', 'streaming', 'salon', 'cam_jardin', { recording: true }),
      ...camWithCompanions('camera.garage', 'Garage', 'idle', 'salon', 'cam_garage', { motion: true }),
    ],
  },
  {
    id: 'unavailable',
    label: 'Caméra HS',
    description: 'État unavailable',
    entities: [{
      entity_id: 'camera.entree', state: 'unavailable', area_id: 'salon', device_id: 'reolink_entree',
      attributes: { friendly_name: 'Entrée' },
    }],
  },
  {
    id: 'doorbell_idle',
    label: 'Sonnette idle',
    description: 'Doorbell event entity, jamais sonné',
    entities: camWithCompanions('camera.sonnette', 'Sonnette', 'idle', 'entree', 'reolink_doorbell', { doorbell: true }),
  },
  {
    id: 'doorbell_ringing',
    label: 'Sonnette ON',
    description: 'Ring il y a 4s → badge VISITEUR + tint accent',
    entities: camWithCompanions('camera.sonnette', 'Sonnette', 'idle', 'entree', 'reolink_doorbell', { doorbell: true, ringAgoMs: 4_000 }),
  },
  {
    id: 'visitor_legacy',
    label: 'Visitor Reolink',
    description: 'binary_sensor _visitor ON (Reolink sans event entity)',
    entities: camWithCompanions('camera.sonnette', 'Sonnette', 'idle', 'entree', 'reolink_legacy', { visitorOn: true }),
  },
  {
    id: 'privacy_on',
    label: 'Privacy on',
    description: 'Mode confidentialité activé → feed masqué',
    entities: camWithCompanions('camera.entree', 'Entrée', 'idle', 'salon', 'reolink_priv', { privacyOn: true }),
  },
  {
    id: 'doorbell_mixed',
    label: 'Mix sonnette + caméras',
    description: 'Sonnette ring + 2 cams normales (multi-cam avec doorbell prioritaire)',
    entities: [
      ...camWithCompanions('camera.sonnette', 'Sonnette entrée', 'idle', 'entree', 'reolink_doorbell', { doorbell: true, ringAgoMs: 2_000 }),
      ...camWithCompanions('camera.jardin', 'Jardin', 'idle', 'salon', 'cam_jardin', { motion: true }),
      ...camWithCompanions('camera.garage', 'Garage', 'idle', 'salon', 'cam_garage', {}),
    ],
  },
  {
    id: 'frigate',
    label: 'Frigate (detect+recordings+snapshots)',
    description: 'NVR Frigate : binary_sensor _person_occupancy + switches _detect/_recordings/_snapshots',
    entities: [
      {
        entity_id: 'camera.entree', state: 'streaming', area_id: 'salon', device_id: 'frigate_entree',
        attributes: { friendly_name: 'Entrée NVR', entity_picture: '/api/camera_proxy/camera.entree?token=mock' },
      },
      { entity_id: 'binary_sensor.entree_motion', state: 'on', device_id: 'frigate_entree', area_id: 'salon',
        attributes: { friendly_name: 'Entrée Motion', device_class: 'motion' } },
      { entity_id: 'binary_sensor.entree_person_occupancy', state: 'on', device_id: 'frigate_entree', area_id: 'salon',
        attributes: { friendly_name: 'Entrée Person', device_class: 'occupancy' } },
      { entity_id: 'binary_sensor.entree_car_occupancy', state: 'off', device_id: 'frigate_entree', area_id: 'salon',
        attributes: { friendly_name: 'Entrée Car', device_class: 'occupancy' } },
      { entity_id: 'switch.entree_detect', state: 'on', device_id: 'frigate_entree', area_id: 'salon',
        attributes: { friendly_name: 'Entrée Detect' } },
      { entity_id: 'switch.entree_recordings', state: 'on', device_id: 'frigate_entree', area_id: 'salon',
        attributes: { friendly_name: 'Entrée Recordings' } },
      { entity_id: 'switch.entree_snapshots', state: 'off', device_id: 'frigate_entree', area_id: 'salon',
        attributes: { friendly_name: 'Entrée Snapshots' } },
    ],
  },
  {
    id: 'unifi_protect',
    label: 'Unifi Protect (doorbell+is_dark)',
    description: 'Doorbell G4 : event _doorbell + _is_dark + _person_detected',
    entities: [
      {
        entity_id: 'camera.front_door', state: 'idle', area_id: 'entree', device_id: 'unifi_g4',
        attributes: { friendly_name: 'Front Door', entity_picture: '/api/camera_proxy/camera.front_door?token=mock' },
      },
      { entity_id: 'event.front_door_doorbell', state: new Date(Date.now() - 5_000).toISOString(), device_id: 'unifi_g4', area_id: 'entree',
        attributes: { friendly_name: 'Front Door Doorbell', device_class: 'doorbell', event_types: ['ring'], event_type: 'ring' } },
      { entity_id: 'binary_sensor.front_door_motion_detected', state: 'on', device_id: 'unifi_g4', area_id: 'entree',
        attributes: { friendly_name: 'Front Door Motion', device_class: 'motion' } },
      { entity_id: 'binary_sensor.front_door_is_dark', state: 'on', device_id: 'unifi_g4', area_id: 'entree',
        attributes: { friendly_name: 'Is Dark', device_class: 'light' } },
      { entity_id: 'binary_sensor.front_door_person_detected', state: 'on', device_id: 'unifi_g4', area_id: 'entree',
        attributes: { friendly_name: 'Person Detected', device_class: 'occupancy' } },
      { entity_id: 'switch.front_door_privacy_mode', state: 'off', device_id: 'unifi_g4', area_id: 'entree',
        attributes: { friendly_name: 'Privacy mode' } },
    ],
  },
  {
    id: 'reolink_multi_streams',
    label: 'Reolink (5 streams, 1 device)',
    description: 'Dédup : Fluent + Balanced + Clear + Snapshots Fluent/Clear → ne garder que Fluent',
    entities: [
      { entity_id: 'camera.entree',                     state: 'idle', area_id: 'salon', device_id: 'reolink_one',
        attributes: { friendly_name: 'Entrée Fluent',  entity_picture: '/api/camera_proxy/camera.entree?token=mock' } },
      { entity_id: 'camera.entree_balanced',            state: 'idle', area_id: 'salon', device_id: 'reolink_one',
        attributes: { friendly_name: 'Entrée Balanced' } },
      { entity_id: 'camera.entree_clear',               state: 'idle', area_id: 'salon', device_id: 'reolink_one',
        attributes: { friendly_name: 'Entrée Clear' } },
      { entity_id: 'camera.entree_snapshots_fluent',    state: 'idle', area_id: 'salon', device_id: 'reolink_one',
        attributes: { friendly_name: 'Entrée Snapshots Fluent' } },
      { entity_id: 'camera.entree_snapshots_clear',     state: 'idle', area_id: 'salon', device_id: 'reolink_one',
        attributes: { friendly_name: 'Entrée Snapshots Clear' } },
    ],
  },
  {
    id: 'eufy_battery',
    label: 'Eufy (person+motion detected)',
    description: 'Eufy Security : _person_detected + _motion_detected (naming Unifi-like)',
    entities: [
      {
        entity_id: 'camera.jardin', state: 'idle', area_id: 'jardin', device_id: 'eufy_solar',
        attributes: { friendly_name: 'Jardin Solar', entity_picture: '/api/camera_proxy/camera.jardin?token=mock' },
      },
      { entity_id: 'binary_sensor.jardin_motion_detected', state: 'on', device_id: 'eufy_solar', area_id: 'jardin',
        attributes: { friendly_name: 'Jardin Motion', device_class: 'motion' } },
      { entity_id: 'binary_sensor.jardin_person_detected', state: 'on', device_id: 'eufy_solar', area_id: 'jardin',
        attributes: { friendly_name: 'Jardin Person', device_class: 'occupancy' } },
    ],
  },
  {
    id: 'battery_low',
    label: 'Solar (battery 12%)',
    description: 'Cam solaire batterie faible → badge rouge clignotant',
    entities: [
      {
        entity_id: 'camera.cabane', state: 'idle', area_id: 'jardin', device_id: 'argus_solar',
        attributes: { friendly_name: 'Cabane', entity_picture: '/api/camera_proxy/camera.cabane?token=mock' },
      },
      { entity_id: 'sensor.cabane_battery_percentage', state: '12', device_id: 'argus_solar', area_id: 'jardin',
        attributes: { friendly_name: 'Cabane Battery', device_class: 'battery', unit_of_measurement: '%' } },
    ],
  },
  {
    id: 'sleeping',
    label: 'Solar (sleep)',
    description: 'Reolink Argus en veille (sleep_status=on) + batterie 65%',
    entities: [
      {
        entity_id: 'camera.cabane', state: 'idle', area_id: 'jardin', device_id: 'argus_solar',
        attributes: { friendly_name: 'Cabane', entity_picture: '/api/camera_proxy/camera.cabane?token=mock' },
      },
      { entity_id: 'sensor.cabane_battery_percentage', state: '65', device_id: 'argus_solar', area_id: 'jardin',
        attributes: { friendly_name: 'Cabane Battery', device_class: 'battery', unit_of_measurement: '%' } },
      { entity_id: 'binary_sensor.cabane_sleep_status', state: 'on', device_id: 'argus_solar', area_id: 'jardin',
        attributes: { friendly_name: 'Cabane Sleep' } },
    ],
  },
  {
    id: 'doorbell_portrait',
    label: 'Doorbell portrait',
    description: 'Sonnette détectée → aspect-ratio 3:4 (portrait)',
    entities: camWithCompanions('camera.porte', 'Porte', 'idle', 'entree', 'nest_doorbell', { doorbell: true }),
  },
  {
    id: 'ptz_motorized',
    label: 'PTZ (Reolink motorisé)',
    description: 'Caméra motorisée : D-pad direction + zoom',
    entities: [
      { entity_id: 'camera.entree', state: 'idle', area_id: 'salon', device_id: 'reolink_ptz',
        attributes: { friendly_name: 'Entrée', entity_picture: '/api/camera_proxy/camera.entree?token=mock' } },
      { entity_id: 'button.entree_ptz_up',        state: 'unknown', device_id: 'reolink_ptz', area_id: 'salon', attributes: { friendly_name: 'PTZ Up' } },
      { entity_id: 'button.entree_ptz_down',      state: 'unknown', device_id: 'reolink_ptz', area_id: 'salon', attributes: { friendly_name: 'PTZ Down' } },
      { entity_id: 'button.entree_ptz_left',      state: 'unknown', device_id: 'reolink_ptz', area_id: 'salon', attributes: { friendly_name: 'PTZ Left' } },
      { entity_id: 'button.entree_ptz_right',     state: 'unknown', device_id: 'reolink_ptz', area_id: 'salon', attributes: { friendly_name: 'PTZ Right' } },
      { entity_id: 'button.entree_ptz_zoom_in',   state: 'unknown', device_id: 'reolink_ptz', area_id: 'salon', attributes: { friendly_name: 'PTZ Zoom +' } },
      { entity_id: 'button.entree_ptz_zoom_out',  state: 'unknown', device_id: 'reolink_ptz', area_id: 'salon', attributes: { friendly_name: 'PTZ Zoom -' } },
    ],
  },
];

export async function setupCameraCarousel(): Promise<void> {
  await import('../cards/camera-carousel/src/index');

  let current = SCENARIOS[0];
  let context: 'popup' | 'dashboard' = 'popup';
  let previewFs = false;

  const { toolbar, stage } = layoutHarness();
  const wrap = document.createElement('div');
  wrap.style.cssText = 'width:100%; max-width:500px; display:flex; flex-direction:column; gap:12px;';
  stage.appendChild(wrap);

  const card = document.createElement('glass-camera-carousel-card') as HTMLElement & {
    hass?: HomeAssistant; areaId?: string; previewFullscreen?: boolean;
  };
  wrap.appendChild(card);

  function renderToolbar(): void {
    toolbar.replaceChildren();
    toolbar.appendChild(rowEl('Scenario', SCENARIOS.map((s) =>
      chipEl(s.label, s.id === current.id, () => { current = s; rebuild(); renderToolbar(); }),
    )));
    toolbar.appendChild(rowEl('Context', (['popup', 'dashboard'] as const).map((c) =>
      chipEl(c, c === context, () => { context = c; applyContext(); renderToolbar(); }),
    )));
    toolbar.appendChild(rowEl('Fullscreen preview', [
      chipEl(previewFs ? 'ON' : 'OFF', previewFs, () => {
        previewFs = !previewFs;
        card.previewFullscreen = previewFs;
        renderToolbar();
      }),
    ]));
    const meta = document.createElement('div');
    meta.style.cssText = 'font-size:12px; color:rgba(255,255,255,0.5); margin-top:2px;';
    meta.textContent = current.description;
    toolbar.appendChild(meta);
  }

  function rebuild(): void {
    const hass = makeCardHass({
      entities: current.entities,
      cardConfig: { camera_carousel: { show_header: true, entity_order: [], hidden_entities: [], auto_cycle: false, cycle_interval: 10 } },
      serviceHandler: (states, _d, service, _data, target) => {
        const ids = ([] as string[]).concat(target?.entity_id ?? []);
        for (const id of ids) {
          const cur = states[id];
          if (!cur) continue;
          let next = cur.state;
          if (service === 'turn_on') next = 'on';
          if (service === 'turn_off') next = 'off';
          if (service === 'toggle') next = cur.state === 'on' ? 'off' : 'on';
          states[id] = { ...cur, state: next, last_changed: new Date().toISOString(), last_updated: new Date().toISOString() };
        }
      },
    }, (h) => { card.hass = h; });
    card.hass = hass;
    applyContext();
  }

  function applyContext(): void {
    if (context === 'popup') {
      card.areaId = current.entities[0]?.area_id ?? 'salon';
    } else {
      card.areaId = undefined;
    }
  }

  renderToolbar();
  rebuild();
}
