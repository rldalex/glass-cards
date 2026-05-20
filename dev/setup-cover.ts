// Cover-card harness — couvre tous les device_class supportés.

import { bus } from '@glass-cards/event-bus';
import { layoutHarness, rowEl, chipEl } from './setup-climate';
import { makeCardHass, type MockEntitySpec } from './mock-card-hass';
import type { HomeAssistant, HassEntity } from '@glass-cards/base-card';

// HA CoverEntityFeature bitmask
const F = { OPEN: 1, CLOSE: 2, SET_POSITION: 4, STOP: 8, OPEN_TILT: 16, CLOSE_TILT: 32, STOP_TILT: 64, SET_TILT_POSITION: 128 };
const ALL = F.OPEN | F.CLOSE | F.SET_POSITION | F.STOP;
const TILTABLE = ALL | F.OPEN_TILT | F.CLOSE_TILT | F.STOP_TILT | F.SET_TILT_POSITION;

interface Scenario { id: string; label: string; description: string; entities: MockEntitySpec[] }

const SCENARIOS: Scenario[] = [
  {
    id: 'shutter_mid',
    label: 'Volet mi-ouvert',
    description: 'Volet roulant à 50%, full features',
    entities: [{
      entity_id: 'cover.salon_volet',
      state: 'open',
      area_id: 'salon',
      attributes: {
        friendly_name: 'Volet Salon',
        device_class: 'shutter',
        current_position: 50,
        supported_features: ALL,
      },
    }],
  },
  {
    id: 'blind_tilt',
    label: 'Store vénitien (tilt)',
    description: 'Store avec position + inclinaison des lames',
    entities: [{
      entity_id: 'cover.bureau_store',
      state: 'open',
      area_id: 'bureau',
      attributes: {
        friendly_name: 'Store Bureau',
        device_class: 'blind',
        current_position: 80,
        current_tilt_position: 45,
        supported_features: TILTABLE,
      },
    }],
  },
  {
    id: 'curtain_open',
    label: 'Rideaux ouverts',
    description: 'Rideaux 100% ouverts',
    entities: [{
      entity_id: 'cover.chambre_rideaux',
      state: 'open',
      area_id: 'chambre',
      attributes: {
        friendly_name: 'Rideaux Chambre',
        device_class: 'curtain',
        current_position: 100,
        supported_features: ALL,
      },
    }],
  },
  {
    id: 'garage_closed',
    label: 'Garage fermé',
    description: 'Porte de garage open/close uniquement (pas de position)',
    entities: [{
      entity_id: 'cover.maison_garage',
      state: 'closed',
      area_id: 'salon',
      attributes: {
        friendly_name: 'Porte garage',
        device_class: 'garage',
        supported_features: F.OPEN | F.CLOSE | F.STOP,
      },
    }],
  },
  {
    id: 'gate_opening',
    label: 'Portail (opening)',
    description: 'Portail en cours d\'ouverture',
    entities: [{
      entity_id: 'cover.maison_portail',
      state: 'opening',
      area_id: 'salon',
      attributes: {
        friendly_name: 'Portail',
        device_class: 'gate',
        supported_features: F.OPEN | F.CLOSE | F.STOP,
      },
    }],
  },
  {
    id: 'multi',
    label: 'Multi (4 volets pièce)',
    description: 'Salon avec 4 volets à positions différentes',
    entities: [
      { entity_id: 'cover.salon_v1', state: 'open',   area_id: 'salon', attributes: { friendly_name: 'Volet baie', device_class: 'shutter', current_position: 100, supported_features: ALL } },
      { entity_id: 'cover.salon_v2', state: 'open',   area_id: 'salon', attributes: { friendly_name: 'Volet ouest', device_class: 'shutter', current_position: 75, supported_features: ALL } },
      { entity_id: 'cover.salon_v3', state: 'open',   area_id: 'salon', attributes: { friendly_name: 'Volet est', device_class: 'shutter', current_position: 25, supported_features: ALL } },
      { entity_id: 'cover.salon_v4', state: 'closed', area_id: 'salon', attributes: { friendly_name: 'Volet nord', device_class: 'shutter', current_position: 0, supported_features: ALL } },
    ],
  },
  {
    id: 'door',
    label: 'Porte (open/close)',
    description: 'Porte motorisée sans position',
    entities: [{
      entity_id: 'cover.entree_porte',
      state: 'closed',
      area_id: 'salon',
      attributes: {
        friendly_name: 'Porte entrée',
        device_class: 'door',
        supported_features: F.OPEN | F.CLOSE,
      },
    }],
  },
  {
    id: 'unavailable',
    label: 'Indisponible',
    description: 'Cover en état unavailable',
    entities: [{
      entity_id: 'cover.salon_offline',
      state: 'unavailable',
      area_id: 'salon',
      attributes: { friendly_name: 'Volet HS', device_class: 'shutter' },
    }],
  },
];

function handleCoverService(states: Record<string, HassEntity>, _domain: string, service: string, data: Record<string, unknown> | undefined, target: { entity_id?: string | string[] } | undefined): void {
  const ids = ([] as string[]).concat(target?.entity_id ?? []);
  for (const id of ids) {
    const cur = states[id];
    if (!cur) continue;
    const attrs = { ...cur.attributes };
    let next = cur.state;

    switch (service) {
      case 'open_cover':
        next = 'open'; attrs.current_position = 100; break;
      case 'close_cover':
        next = 'closed'; attrs.current_position = 0; break;
      case 'stop_cover':
        next = (attrs.current_position as number ?? 0) > 0 ? 'open' : 'closed'; break;
      case 'set_cover_position': {
        const pos = data?.position as number ?? 0;
        attrs.current_position = pos;
        next = pos === 0 ? 'closed' : 'open';
        break;
      }
      case 'set_cover_tilt_position':
        attrs.current_tilt_position = data?.tilt_position as number ?? 0; break;
      case 'open_cover_tilt': attrs.current_tilt_position = 100; break;
      case 'close_cover_tilt': attrs.current_tilt_position = 0; break;
      case 'toggle':
        next = cur.state === 'open' ? 'closed' : 'open';
        attrs.current_position = next === 'open' ? 100 : 0;
        break;
    }

    states[id] = { ...cur, state: next, attributes: attrs, last_changed: new Date().toISOString(), last_updated: new Date().toISOString() };
  }
}

export async function setupCover(): Promise<void> {
  await import('../cards/cover-card/src/index');

  let current = SCENARIOS[0];
  let context: 'popup' | 'dashboard' = 'popup';

  const { toolbar, stage } = layoutHarness();
  const wrap = document.createElement('div');
  wrap.style.cssText = 'width:100%; max-width:500px; display:flex; flex-direction:column; gap:12px;';
  stage.appendChild(wrap);

  const card = document.createElement('glass-cover-card') as HTMLElement & {
    hass?: HomeAssistant; areaId?: string; visibleAreaIds?: string[];
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
      cardConfig: { cover_card: { show_header: true, dashboard_entities: [], dashboard_compact: false, presets: [0, 25, 50, 75, 100], entity_presets: {} } },
      serviceHandler: handleCoverService,
    }, (h) => { card.hass = h; });
    card.hass = hass;
    applyContext();
    bus.emit('dashboard-config-changed', undefined);
  }

  function applyContext(): void {
    if (context === 'popup') {
      card.areaId = current.entities[0]?.area_id ?? 'salon';
      card.visibleAreaIds = undefined;
    } else {
      card.areaId = undefined;
      card.visibleAreaIds = ['salon', 'chambre', 'cuisine', 'bureau', 'salle_de_bain'];
    }
  }

  renderToolbar();
  rebuild();
}
