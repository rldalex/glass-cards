// Camera-carousel harness — multi cameras avec alerts + companions (motion, record).

import { layoutHarness, rowEl, chipEl } from './setup-climate';
import { makeCardHass, type MockEntitySpec } from './mock-card-hass';
import type { HomeAssistant } from '@glass-cards/base-card';

interface Scenario { id: string; label: string; description: string; entities: MockEntitySpec[] }

function camWithCompanions(entityId: string, name: string, state: string, area: string, deviceId: string, opts: { motion?: boolean; recording?: boolean; aiPerson?: boolean }): MockEntitySpec[] {
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
  return [cam, motion, record, aiPerson];
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
];

export async function setupCameraCarousel(): Promise<void> {
  await import('../cards/camera-carousel/src/index');

  let current = SCENARIOS[0];
  let context: 'popup' | 'dashboard' = 'popup';

  const { toolbar, stage } = layoutHarness();
  const wrap = document.createElement('div');
  wrap.style.cssText = 'width:100%; max-width:500px; display:flex; flex-direction:column; gap:12px;';
  stage.appendChild(wrap);

  const card = document.createElement('glass-camera-carousel-card') as HTMLElement & {
    hass?: HomeAssistant; areaId?: string;
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
