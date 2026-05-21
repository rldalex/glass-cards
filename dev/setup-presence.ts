// Presence-card harness — scénarios solo / couple / famille avec data smartphone.

import { layoutHarness, rowEl, chipEl } from './setup-climate';
import { makeCardHass, type MockEntitySpec } from './mock-card-hass';
import type { HomeAssistant } from '@glass-cards/base-card';

interface Scenario { id: string; label: string; description: string; entities: MockEntitySpec[]; config: { person_entities: string[]; smartphone_sensors?: Record<string, string>; notify_services?: Record<string, string>; driving_sensors?: Record<string, string>; sleep_sensors?: Record<string, string> } }

const SCENARIOS: Scenario[] = [
  {
    id: 'solo_home',
    label: 'Solo (chez soi)',
    description: '1 personne, à la maison, smartphone connecté',
    config: {
      person_entities: ['person.roland'],
      smartphone_sensors: { 'person.roland': 'sensor.roland_phone_battery' },
      notify_services: { 'person.roland': 'mobile_app_roland_phone' },
    },
    entities: [
      {
        entity_id: 'person.roland', state: 'home',
        attributes: {
          friendly_name: 'Roland',
          entity_picture: null,
          latitude: 48.8566, longitude: 2.3522,
          source_type: 'gps',
        },
      },
      {
        entity_id: 'sensor.roland_phone_battery', state: '82',
        attributes: {
          friendly_name: 'Phone Battery',
          device_class: 'battery',
          unit_of_measurement: '%',
          geocoded_location: 'Paris, France',
          heart_rate: 72, oxygen_saturation: 98, daily_steps: 6234,
        },
      },
    ],
  },
  {
    id: 'solo_away',
    label: 'Solo (absent)',
    description: 'Personne not_home, smartphone signale localisation',
    config: {
      person_entities: ['person.roland'],
      smartphone_sensors: { 'person.roland': 'sensor.roland_phone_battery' },
      notify_services: { 'person.roland': 'mobile_app_roland_phone' },
    },
    entities: [
      {
        entity_id: 'person.roland', state: 'not_home',
        attributes: {
          friendly_name: 'Roland',
          latitude: 48.8738, longitude: 2.2950,
          source_type: 'gps',
        },
      },
      {
        entity_id: 'sensor.roland_phone_battery', state: '45',
        attributes: {
          friendly_name: 'Phone Battery',
          device_class: 'battery',
          unit_of_measurement: '%',
          geocoded_location: 'Champs-Élysées, Paris',
          heart_rate: 88, oxygen_saturation: 97, daily_steps: 9874,
        },
      },
    ],
  },
  {
    id: 'couple_mixed',
    label: 'Couple (mixte)',
    description: 'Roland home, Marie absent',
    config: {
      person_entities: ['person.roland', 'person.marie'],
      smartphone_sensors: {
        'person.roland': 'sensor.roland_phone_battery',
        'person.marie': 'sensor.marie_phone_battery',
      },
      notify_services: {
        'person.roland': 'mobile_app_roland_phone',
        'person.marie': 'mobile_app_marie_phone',
      },
      driving_sensors: { 'person.marie': 'binary_sensor.marie_driving' },
    },
    entities: [
      { entity_id: 'person.roland', state: 'home', attributes: { friendly_name: 'Roland', latitude: 48.8566, longitude: 2.3522, source_type: 'gps' } },
      { entity_id: 'person.marie', state: 'not_home', attributes: { friendly_name: 'Marie', latitude: 45.7640, longitude: 4.8357, source_type: 'gps' } },
      {
        entity_id: 'sensor.roland_phone_battery', state: '88',
        attributes: {
          friendly_name: 'Roland Battery', device_class: 'battery', unit_of_measurement: '%',
          geocoded_location: 'Maison',
          heart_rate: 68, oxygen_saturation: 98, daily_steps: 3120,
        },
      },
      {
        entity_id: 'sensor.marie_phone_battery', state: '23',
        attributes: {
          friendly_name: 'Marie Battery', device_class: 'battery', unit_of_measurement: '%',
          geocoded_location: 'Lyon, France',
          android_auto: 'on',
          heart_rate: 82, oxygen_saturation: 97, daily_steps: 4521,
        },
      },
      { entity_id: 'binary_sensor.marie_driving', state: 'on', attributes: { friendly_name: 'Marie Driving', device_class: 'moving' } },
    ],
  },
  {
    id: 'family_home',
    label: 'Famille (4, tous home)',
    description: '4 personnes à la maison, tous les téléphones connectés',
    config: {
      person_entities: ['person.roland', 'person.marie', 'person.luca', 'person.zoe'],
      smartphone_sensors: {
        'person.roland': 'sensor.roland_phone_battery',
        'person.marie': 'sensor.marie_phone_battery',
        'person.luca': 'sensor.luca_phone_battery',
        'person.zoe': 'sensor.zoe_phone_battery',
      },
      notify_services: {
        'person.roland': 'mobile_app_roland_phone',
        'person.marie': 'mobile_app_marie_phone',
        'person.luca': 'mobile_app_luca_phone',
        'person.zoe': 'mobile_app_zoe_phone',
      },
    },
    entities: [
      { entity_id: 'person.roland', state: 'home', attributes: { friendly_name: 'Roland', latitude: 48.8566, longitude: 2.3522, source_type: 'gps' } },
      { entity_id: 'person.marie', state: 'home', attributes: { friendly_name: 'Marie', latitude: 48.8566, longitude: 2.3522, source_type: 'gps' } },
      { entity_id: 'person.luca', state: 'home', attributes: { friendly_name: 'Luca', latitude: 48.8566, longitude: 2.3522, source_type: 'gps' } },
      { entity_id: 'person.zoe', state: 'home', attributes: { friendly_name: 'Zoé', latitude: 48.8566, longitude: 2.3522, source_type: 'gps' } },
      {
        entity_id: 'sensor.roland_phone_battery', state: '74',
        attributes: {
          friendly_name: 'Roland Battery', device_class: 'battery', unit_of_measurement: '%',
          geocoded_location: 'Maison',
          heart_rate: 70, oxygen_saturation: 98, daily_steps: 2840,
        },
      },
      {
        entity_id: 'sensor.marie_phone_battery', state: '61',
        attributes: {
          friendly_name: 'Marie Battery', device_class: 'battery', unit_of_measurement: '%',
          geocoded_location: 'Maison',
          heart_rate: 74, oxygen_saturation: 99, daily_steps: 5210,
        },
      },
      {
        entity_id: 'sensor.luca_phone_battery', state: '38',
        attributes: {
          friendly_name: 'Luca Battery', device_class: 'battery', unit_of_measurement: '%',
          geocoded_location: 'Maison',
          heart_rate: 92, oxygen_saturation: 99, daily_steps: 12480,
        },
      },
      {
        entity_id: 'sensor.zoe_phone_battery', state: '12',
        attributes: {
          friendly_name: 'Zoé Battery', device_class: 'battery', unit_of_measurement: '%',
          geocoded_location: 'Maison',
          heart_rate: 105, oxygen_saturation: 98, daily_steps: 14320,
        },
      },
    ],
  },
  {
    id: 'all_away',
    label: '2 personnes (tous absents)',
    description: 'Couple à l\'extérieur, smartphones actifs',
    config: {
      person_entities: ['person.roland', 'person.marie'],
      smartphone_sensors: {
        'person.roland': 'sensor.roland_phone_battery',
        'person.marie': 'sensor.marie_phone_battery',
      },
      notify_services: {
        'person.roland': 'mobile_app_roland_phone',
        'person.marie': 'mobile_app_marie_phone',
      },
      driving_sensors: { 'person.roland': 'binary_sensor.roland_driving' },
    },
    entities: [
      { entity_id: 'person.roland', state: 'not_home', attributes: { friendly_name: 'Roland', latitude: 48.8738, longitude: 2.2950, source_type: 'gps' } },
      { entity_id: 'person.marie', state: 'work', attributes: { friendly_name: 'Marie', latitude: 48.8744, longitude: 2.3522, source_type: 'gps' } },
      {
        entity_id: 'sensor.roland_phone_battery', state: '67',
        attributes: {
          friendly_name: 'Roland Battery', device_class: 'battery', unit_of_measurement: '%',
          geocoded_location: 'Avenue des Champs-Élysées, Paris',
          android_auto: 'on',
          heart_rate: 81, oxygen_saturation: 97, daily_steps: 7843,
        },
      },
      { entity_id: 'binary_sensor.roland_driving', state: 'on', attributes: { friendly_name: 'Roland Driving', device_class: 'moving' } },
      {
        entity_id: 'sensor.marie_phone_battery', state: '89',
        attributes: {
          friendly_name: 'Marie Battery', device_class: 'battery', unit_of_measurement: '%',
          geocoded_location: 'Bureau, Tour Eiffel, Paris',
          heart_rate: 76, oxygen_saturation: 98, daily_steps: 4290,
        },
      },
    ],
  },
  {
    id: 'family_sleeping',
    label: 'Famille (Luca dort)',
    description: '4 personnes, Luca a son input_boolean.luca_dort à on',
    config: {
      person_entities: ['person.roland', 'person.marie', 'person.luca', 'person.zoe'],
      smartphone_sensors: {
        'person.roland': 'sensor.roland_phone_battery',
        'person.marie': 'sensor.marie_phone_battery',
        'person.luca': 'sensor.luca_phone_battery',
        'person.zoe': 'sensor.zoe_phone_battery',
      },
      sleep_sensors: {
        'person.luca': 'input_boolean.luca_dort',
      },
    },
    entities: [
      { entity_id: 'person.roland', state: 'home', attributes: { friendly_name: 'Roland', latitude: 48.8566, longitude: 2.3522, source_type: 'gps' } },
      { entity_id: 'person.marie', state: 'home', attributes: { friendly_name: 'Marie', latitude: 48.8566, longitude: 2.3522, source_type: 'gps' } },
      { entity_id: 'person.luca', state: 'home', attributes: { friendly_name: 'Luca', latitude: 48.8566, longitude: 2.3522, source_type: 'gps' } },
      { entity_id: 'person.zoe', state: 'home', attributes: { friendly_name: 'Zoé', latitude: 48.8566, longitude: 2.3522, source_type: 'gps' } },
      { entity_id: 'sensor.roland_phone_battery', state: '88', attributes: { friendly_name: 'Roland Battery', device_class: 'battery', unit_of_measurement: '%', geocoded_location: 'Maison', heart_rate: 68 } },
      { entity_id: 'sensor.marie_phone_battery', state: '74', attributes: { friendly_name: 'Marie Battery', device_class: 'battery', unit_of_measurement: '%', geocoded_location: 'Maison', heart_rate: 72 } },
      { entity_id: 'sensor.luca_phone_battery', state: '52', attributes: { friendly_name: 'Luca Battery', device_class: 'battery', unit_of_measurement: '%', geocoded_location: 'Maison', heart_rate: 58 } },
      { entity_id: 'sensor.zoe_phone_battery', state: '34', attributes: { friendly_name: 'Zoé Battery', device_class: 'battery', unit_of_measurement: '%', geocoded_location: 'Maison', heart_rate: 88 } },
      { entity_id: 'input_boolean.luca_dort', state: 'on', attributes: { friendly_name: 'Luca dort', editable: true } },
    ],
  },
];

export async function setupPresence(): Promise<void> {
  await import('../cards/presence-card/src/index');

  let current = SCENARIOS[0];

  const { toolbar, stage } = layoutHarness();
  const wrap = document.createElement('div');
  wrap.style.cssText = 'width:100%; max-width:500px; display:flex; flex-direction:column; gap:12px;';
  stage.appendChild(wrap);

  const card = document.createElement('glass-presence-card') as HTMLElement & {
    hass?: HomeAssistant;
  };
  wrap.appendChild(card);

  function renderToolbar(): void {
    toolbar.replaceChildren();
    toolbar.appendChild(rowEl('Scenario', SCENARIOS.map((s) =>
      chipEl(s.label, s.id === current.id, () => { current = s; rebuild(); renderToolbar(); }),
    )));
    const meta = document.createElement('div');
    meta.style.cssText = 'font-size:12px; color:rgba(255,255,255,0.5); margin-top:2px;';
    meta.textContent = current.description;
    toolbar.appendChild(meta);
  }

  function rebuild(): void {
    const hass = makeCardHass({
      entities: current.entities,
      cardConfig: { presence_card: { show_header: true, ...current.config } },
      serviceHandler: (states, _domain, service, data, target) => {
        // Notify service: just log
        console.debug('[presence] service', service, data, target);
        void states;
      },
    }, (h) => { card.hass = h; });
    card.hass = hass;
  }

  renderToolbar();
  rebuild();
}
