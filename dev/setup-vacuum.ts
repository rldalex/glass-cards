// Vacuum-card harness — 9 scenarios du Roborock Saros 10R.

import { layoutHarness, rowEl, chipEl } from './setup-climate';
import { makeCardHass, type MockEntitySpec } from './mock-card-hass';
import type { HomeAssistant } from '@glass-cards/base-card';
import mapMockUrl from './assets/vacuum-map-mock.svg?url';

interface Scenario {
  id: string;
  label: string;
  description: string;
  entities: MockEntitySpec[];
}

const VAC_PREFIX = 'saros_10r';
const VAC_ID = `vacuum.${VAC_PREFIX}`;
const FRIENDLY_NAME = 'Saros 10R';

// — Helpers pour construire les 49 entités compagnes Roborock —

function baseVacuumState(state: string, extras: Partial<Record<string, unknown>> = {}): MockEntitySpec {
  return {
    entity_id: VAC_ID,
    state,
    attributes: {
      friendly_name: FRIENDLY_NAME,
      fan_speed: 'turbo',
      fan_speed_list: [
        'quiet', 'balanced', 'turbo', 'max', 'max_plus', 'off_raise_main_brush', 'smart_mode', 'custom',
      ],
      supported_features: 30524,
      ...extras,
    },
  };
}

function sensor(id: string, value: string | number, attrs: Record<string, unknown> = {}): MockEntitySpec {
  return {
    entity_id: `sensor.${VAC_PREFIX}_${id}`,
    state: String(value),
    attributes: { friendly_name: id, ...attrs },
  };
}

function binarySensor(id: string, on: boolean): MockEntitySpec {
  return {
    entity_id: `binary_sensor.${VAC_PREFIX}_${id}`,
    state: on ? 'on' : 'off',
    attributes: { friendly_name: id },
  };
}

function selectEntity(id: string, value: string, options: string[]): MockEntitySpec {
  return {
    entity_id: `select.${VAC_PREFIX}_${id}`,
    state: value,
    attributes: { friendly_name: id, options },
  };
}

function imageEntity(id: string): MockEntitySpec {
  return {
    entity_id: `image.${VAC_PREFIX}_${id}`,
    state: new Date().toISOString(),
    attributes: { friendly_name: id, entity_picture: mapMockUrl },
  };
}

function roomButton(slug: string): MockEntitySpec {
  return {
    entity_id: `button.${VAC_PREFIX}_nettoyage_${slug}`,
    state: '2026-05-01T10:00:00+00:00',
    attributes: { friendly_name: `Nettoyage ${slug}` },
  };
}

interface CommonEntityOpts {
  state: string;
  battery: number;
  charging: boolean;
  currentRoom?: string;
  errorMessage?: string;
  mopIntensity?: string;
  mopPattern?: string;
  mopDrying?: boolean;
  dryingMin?: number;
  cleanWaterEmpty?: boolean;
  dirtyWaterFull?: boolean;
  consoFilterHours?: number;
  consoSensorsHours?: number;
  durationCurrentMin?: number;
  areaCurrent?: number;
}

// Common entities present in every scenario (variations injected per-scenario).
function commonEntities(overrides: CommonEntityOpts): MockEntitySpec[] {
  return [
    baseVacuumState(overrides.state),
    // Status
    sensor('etat', overrides.state),
    sensor('batterie', String(overrides.battery)),
    sensor('erreur_de_l_aspirateur', overrides.errorMessage ?? 'none'),
    sensor('current_room', overrides.currentRoom ?? ''),
    // Map
    imageEntity('maison'),
    // Mop / water
    binarySensor('serpilliere_fixee', true),
    binarySensor('reservoir_d_eau_fixe', true),
    binarySensor('penurie_d_eau', false),
    selectEntity('intensite_de_frottement', overrides.mopIntensity ?? 'moderate', ['off', 'slight', 'low', 'medium', 'moderate', 'high', 'extreme']),
    selectEntity('parcours_de_lavage_de_sol', overrides.mopPattern ?? 'standard', ['standard', 'deep', 'deep_plus', 'fast', 'smart_mode', 'custom']),
    // Dock
    binarySensor('en_charge', overrides.charging),
    binarySensor('dock_sechage_de_la_serpilliere', overrides.mopDrying ?? false),
    binarySensor('dock_dirty_water_box', overrides.dirtyWaterFull ?? false),
    binarySensor('dock_clean_water_box', overrides.cleanWaterEmpty ? false : true),
    binarySensor('dock_cleaning_fluid', true),
    selectEntity('dock_empty_mode', 'smart', ['unknown', 'smart', 'light', 'balanced', 'max']),
    sensor('dock_temps_de_sechage_de_la_serpilliere_restant', String(overrides.dryingMin ?? 0)),
    // Consumables
    sensor('temps_restant_brosse_principale', '254'),
    sensor('temps_restant_brosse_laterale', '127'),
    sensor('temps_restant_filtre', String(overrides.consoFilterHours ?? 104)),
    sensor('temps_restant_capteurs', String(overrides.consoSensorsHours ?? 80)),
    sensor('dock_strainer_time_left', '27'),
    // Stats
    sensor('duree_de_nettoyage', String(overrides.durationCurrentMin ?? 0)),
    sensor('duree_totale_de_nettoyage', '71.6'),
    sensor('nombre_total_de_nettoyages', '226'),
    sensor('surface_de_nettoyage', String(overrides.areaCurrent ?? 0)),
    sensor('surface_de_nettoyage_totale', '3513.1'),
    sensor('fin_du_dernier_nettoyage', '2026-05-21T09:14:28+00:00'),
    sensor('debut_du_dernier_nettoyage', '2026-05-21T08:54:31+00:00'),
    // Room buttons (un par pièce de la maison Saros)
    roomButton('cuisine'),
    roomButton('sam'),
    roomButton('atelier'),
    roomButton('sdb'),
    roomButton('couloir'),
    roomButton('enfant'),
    roomButton('chambre'),
    roomButton('dressing'),
    {
      entity_id: `button.${VAC_PREFIX}_nettoyage_complet`,
      state: '2026-05-15T10:00:00+00:00',
      attributes: { friendly_name: 'Nettoyage complet' },
    },
  ];
}

const SCENARIOS: Scenario[] = [
  { id: 'docked_full', label: 'Docked plein', description: 'Au dock, batterie 100%, prêt à partir', entities: commonEntities({ state: 'docked', battery: 100, charging: true }) },
  { id: 'cleaning_atelier', label: 'Cleaning Atelier (turbo)', description: "En train de nettoyer l'atelier en mode turbo", entities: commonEntities({ state: 'cleaning', battery: 87, charging: false, currentRoom: 'Atelier', durationCurrentMin: 13, areaCurrent: 10.5 }) },
  { id: 'cleaning_cuisine_mop', label: 'Cleaning Cuisine (mop deep)', description: 'Lavage profond de la cuisine, intensité élevée', entities: commonEntities({ state: 'cleaning', battery: 72, charging: false, currentRoom: 'Cuisine', mopIntensity: 'high', mopPattern: 'deep', durationCurrentMin: 22, areaCurrent: 8.2 }) },
  { id: 'returning', label: 'Returning to dock', description: 'Retour au dock après nettoyage partiel', entities: commonEntities({ state: 'returning', battery: 42, charging: false }) },
  { id: 'paused', label: 'Paused mid-clean', description: 'Nettoyage en pause au milieu du salon', entities: commonEntities({ state: 'paused', battery: 65, charging: false, currentRoom: 'Salon', durationCurrentMin: 18, areaCurrent: 15.3 }) },
  { id: 'error', label: 'Error brush stuck', description: 'Erreur : brosse bloquée par un câble', entities: commonEntities({ state: 'error', battery: 58, charging: false, errorMessage: 'Brosse principale bloquée — retirer l\'obstacle' }) },
  { id: 'mop_drying', label: 'Mop drying', description: 'Au dock, séchage de la serpillière en cours', entities: commonEntities({ state: 'docked', battery: 100, charging: true, mopDrying: true, dryingMin: 12 }) },
  { id: 'low_battery', label: 'Low battery', description: 'Retour forcé, batterie 18%', entities: commonEntities({ state: 'returning', battery: 18, charging: false }) },
  { id: 'consumable_warning', label: 'Consumable warning', description: 'Au dock, filtre à 42h (warning), capteurs à -10h (alert)', entities: commonEntities({ state: 'docked', battery: 100, charging: true, consoFilterHours: 42, consoSensorsHours: -10 }) },
];

export async function setupVacuum(): Promise<void> {
  await import('../cards/vacuum-card/src/index');

  let current: Scenario = SCENARIOS[0];
  let hass: HomeAssistant;

  const { toolbar, stage } = layoutHarness();

  const cardWrap = document.createElement('div');
  cardWrap.style.cssText = 'width:100%; max-width:500px; display:flex; flex-direction:column; gap:12px;';
  stage.appendChild(cardWrap);

  const card = document.createElement('glass-vacuum-card') as HTMLElement & {
    hass?: HomeAssistant;
    config?: { type: string; entity: string };
    setConfig?: (cfg: { type: string; entity: string }) => void;
  };
  card.setConfig?.({ type: 'custom:glass-vacuum-card', entity: VAC_ID });
  cardWrap.appendChild(card);

  function rebuildHass(): void {
    hass = makeCardHass({ entities: current.entities }, (h) => { hass = h; card.hass = h; });
    card.hass = hass;
  }

  function renderToolbar(): void {
    toolbar.replaceChildren();
    toolbar.appendChild(rowEl('Scenario', SCENARIOS.map((s) =>
      chipEl(s.label, s.id === current.id, () => { current = s; rebuildHass(); renderToolbar(); }),
    )));
    const meta = document.createElement('div');
    meta.style.cssText = 'font-size:12px; color:rgba(255,255,255,0.5); margin-top:2px;';
    meta.textContent = current.description;
    toolbar.appendChild(meta);
  }

  renderToolbar();
  rebuildHass();
}
