// Mock HomeAssistant for dev server — no real HA required.

import type {
  HomeAssistant,
  HassEntity,
  HassConnection,
  EntityRegistryEntry,
  DeviceRegistryEntry,
  AreaRegistryEntry,
} from '@glass-cards/base-card';

// ───────────────────────── Types ─────────────────────────

export type MockState = Partial<HassEntity> & { entity_id: string; state: string };

export interface MockScenario {
  id: string;
  label: string;
  description: string;
  entities: MockState[];
  /** Optional area assignments — entity_id → area_id. Defaults to 'living'. */
  areas?: Record<string, string>;
}

export interface MockContext {
  scenario: MockScenario;
  displayMode: 'list' | 'normal';
  areaId: string | null;
  hass: HomeAssistant;
  onUpdate: (hass: HomeAssistant) => void;
}

// ───────────────────────── Helpers ─────────────────────────

const ISO_NOW = new Date().toISOString();

function fullEntity(s: MockState): HassEntity {
  return {
    entity_id: s.entity_id,
    state: s.state,
    attributes: s.attributes ?? {},
    last_changed: s.last_changed ?? ISO_NOW,
    last_updated: s.last_updated ?? ISO_NOW,
    context: s.context ?? { id: 'mock', parent_id: null, user_id: null },
  };
}

function buildAreas(): Record<string, AreaRegistryEntry> {
  const entries: AreaRegistryEntry[] = [
    { area_id: 'living', name: 'Salon', icon: 'mdi:sofa', picture: null },
    { area_id: 'bedroom', name: 'Chambre', icon: 'mdi:bed', picture: null },
    { area_id: 'office', name: 'Bureau', icon: 'mdi:desk', picture: null },
    { area_id: 'kitchen', name: 'Cuisine', icon: 'mdi:silverware-fork-knife', picture: null },
  ];
  return Object.fromEntries(entries.map((a) => [a.area_id, a]));
}

function buildEntitiesRegistry(states: HassEntity[], areas: Record<string, string>): Record<string, EntityRegistryEntry> {
  const reg: Record<string, EntityRegistryEntry> = {};
  for (const s of states) {
    reg[s.entity_id] = {
      entity_id: s.entity_id,
      area_id: areas[s.entity_id] ?? 'living',
      device_id: null,
      platform: 'mock',
      disabled_by: null,
      hidden_by: null,
      icon: null,
    };
  }
  return reg;
}

function buildDevicesRegistry(): Record<string, DeviceRegistryEntry> {
  return {};
}

// ───────────────────────── Mock connection ─────────────────────────

function makeMockConnection(getDisplayMode: () => 'list' | 'normal'): HassConnection {
  return {
    async sendMessagePromise<T>(msg: Record<string, unknown>): Promise<T> {
      const type = msg.type as string;
      if (type === 'glass_cards/get_config') {
        return {
          climate_card: {
            show_header: true,
            display_mode: getDisplayMode(),
            dashboard_display_mode: getDisplayMode(),
            dashboard_entities: [],
            hidden_entities: [],
          },
        } as unknown as T;
      }
      if (type === 'glass_cards/get_room') {
        return { hidden_entities: [], entity_order: [] } as unknown as T;
      }
      if (type === 'glass_cards/get_schedules') {
        return {} as unknown as T;
      }
      return null as unknown as T;
    },
    async subscribeMessage() {
      return () => {};
    },
    async subscribeEvents() {
      return () => {};
    },
  };
}

// ───────────────────────── Service mutations ─────────────────────────

function applyService(ctx: MockContext, domain: string, service: string, data: Record<string, unknown> | undefined, target: { entity_id?: string | string[] } | undefined): void {
  if (domain !== 'climate') return;
  const ids = ([] as string[]).concat(target?.entity_id ?? []);
  if (ids.length === 0) return;

  const states = { ...ctx.hass.states };
  for (const id of ids) {
    const cur = states[id];
    if (!cur) continue;
    const attrs = { ...cur.attributes };
    let newState = cur.state;

    switch (service) {
      case 'turn_on': {
        const modes = (attrs.hvac_modes as string[]) ?? ['heat'];
        newState = modes.find((m) => m !== 'off') ?? 'heat';
        attrs.hvac_action = inferAction(newState, attrs);
        break;
      }
      case 'turn_off': {
        newState = 'off';
        attrs.hvac_action = 'off';
        break;
      }
      case 'set_hvac_mode': {
        newState = (data?.hvac_mode as string) ?? newState;
        attrs.hvac_action = inferAction(newState, attrs);
        break;
      }
      case 'set_preset_mode': {
        attrs.preset_mode = data?.preset_mode as string;
        break;
      }
      case 'set_fan_mode': {
        attrs.fan_mode = data?.fan_mode as string;
        break;
      }
      case 'set_swing_mode': {
        attrs.swing_mode = data?.swing_mode as string;
        break;
      }
      case 'set_humidity': {
        attrs.humidity = data?.humidity as number;
        break;
      }
      case 'set_aux_heat': {
        attrs.aux_heat = (data?.aux_heat as boolean) ? 'on' : 'off';
        break;
      }
      case 'set_temperature': {
        if (data?.temperature != null) attrs.temperature = data.temperature as number;
        if (data?.target_temp_low != null) attrs.target_temp_low = data.target_temp_low as number;
        if (data?.target_temp_high != null) attrs.target_temp_high = data.target_temp_high as number;
        break;
      }
    }

    states[id] = {
      ...cur,
      state: newState,
      attributes: attrs,
      last_changed: new Date().toISOString(),
      last_updated: new Date().toISOString(),
    };
  }

  const next: HomeAssistant = { ...ctx.hass, states };
  ctx.hass = next;
  ctx.onUpdate(next);
}

function inferAction(mode: string, attrs: Record<string, unknown>): string {
  if (mode === 'off') return 'off';
  if (mode === 'fan_only') return 'idle';
  if (mode === 'dry') return 'drying';
  const target = (attrs.temperature as number) ?? (attrs.target_temp_high as number);
  const current = attrs.current_temperature as number;
  if (target == null || current == null) return 'idle';
  if (mode === 'heat') return current < target - 0.2 ? 'heating' : 'idle';
  if (mode === 'cool') return current > target + 0.2 ? 'cooling' : 'idle';
  if (mode === 'heat_cool' || mode === 'auto') {
    const low = (attrs.target_temp_low as number) ?? target;
    const high = (attrs.target_temp_high as number) ?? target;
    if (current < low - 0.2) return 'heating';
    if (current > high + 0.2) return 'cooling';
    return 'idle';
  }
  return 'idle';
}

// ───────────────────────── Factory ─────────────────────────

export function makeMockHass(
  scenario: MockScenario,
  getDisplayMode: () => 'list' | 'normal',
  onMutate: (hass: HomeAssistant) => void,
): HomeAssistant {
  const areas = buildAreas();
  const entityAreas: Record<string, string> = scenario.areas ?? {};
  const states: Record<string, HassEntity> = {};
  for (const s of scenario.entities) states[s.entity_id] = fullEntity(s);

  const fullList = Object.values(states);
  const registry = buildEntitiesRegistry(fullList, entityAreas);
  const devices = buildDevicesRegistry();

  const ctx: { hass: HomeAssistant } = { hass: null as unknown as HomeAssistant };

  const hass: HomeAssistant = {
    states,
    callApi: async () => [] as never,
    callService: async (domain, service, data, target) => {
      applyService(
        { scenario, displayMode: getDisplayMode(), areaId: null, hass: ctx.hass, onUpdate: onMutate },
        domain,
        service,
        data,
        target,
      );
    },
    connection: makeMockConnection(getDisplayMode),
    localize: (key: string) => key,
    language: 'fr',
    user: { name: 'Dev', is_admin: true, is_owner: true },
    themes: { darkMode: true },
    areas,
    devices,
    entities: registry,
    // Inject config (unit_system) — extension fields are allowed at runtime
    ...({ config: { unit_system: { temperature: '°C' } } } as object),
  };

  ctx.hass = hass;
  return hass;
}

// ───────────────────────── Scenarios ─────────────────────────

const HVAC_MODES_FULL = ['off', 'heat', 'cool', 'heat_cool', 'auto', 'dry', 'fan_only'];
const FEATURES_FULL = 1 | 2 | 4 | 8 | 16 | 32 | 64 | 128 | 256; // temp + range + humidity + fan + preset + swing + aux_heat + turn on/off

export const SCENARIOS: MockScenario[] = [
  {
    id: 'heating',
    label: 'Chauffage actif',
    description: 'Thermostat en chauffe (current 19, target 21)',
    entities: [{
      entity_id: 'climate.salon',
      state: 'heat',
      attributes: {
        friendly_name: 'Salon',
        hvac_action: 'heating',
        hvac_modes: HVAC_MODES_FULL,
        current_temperature: 19.0,
        temperature: 21.0,
        target_temp_step: 0.5,
        min_temp: 7,
        max_temp: 35,
        supported_features: FEATURES_FULL,
        preset_modes: ['none', 'eco', 'comfort', 'boost', 'away', 'sleep'],
        preset_mode: 'none',
        fan_modes: ['auto', 'low', 'medium', 'high'],
        fan_mode: 'auto',
        swing_modes: ['off', 'vertical', 'horizontal', 'both'],
        swing_mode: 'off',
        current_humidity: 48,
        humidity: 50,
        min_humidity: 30,
        max_humidity: 80,
        aux_heat: 'off',
      },
    }],
  },
  {
    id: 'cooling',
    label: 'Climatisation active',
    description: 'Mode cool, action cooling (current 26, target 22)',
    entities: [{
      entity_id: 'climate.salon',
      state: 'cool',
      attributes: {
        friendly_name: 'Salon',
        hvac_action: 'cooling',
        hvac_modes: HVAC_MODES_FULL,
        current_temperature: 26.0,
        temperature: 22.0,
        target_temp_step: 0.5,
        min_temp: 16,
        max_temp: 32,
        supported_features: FEATURES_FULL,
        preset_modes: ['none', 'eco', 'comfort', 'boost'],
        preset_mode: 'comfort',
        fan_modes: ['auto', 'low', 'medium', 'high'],
        fan_mode: 'medium',
        swing_modes: ['off', 'vertical', 'horizontal', 'both'],
        swing_mode: 'vertical',
        current_humidity: 55,
      },
    }],
  },
  {
    id: 'idle',
    label: 'Idle (chauffage au repos)',
    description: 'Mode heat, action idle (target atteint)',
    entities: [{
      entity_id: 'climate.salon',
      state: 'heat',
      attributes: {
        friendly_name: 'Salon',
        hvac_action: 'idle',
        hvac_modes: HVAC_MODES_FULL,
        current_temperature: 21.0,
        temperature: 21.0,
        target_temp_step: 0.5,
        min_temp: 7,
        max_temp: 35,
        supported_features: FEATURES_FULL,
        preset_mode: 'none',
        preset_modes: ['none', 'eco', 'comfort'],
      },
    }],
  },
  {
    id: 'off',
    label: 'Éteint',
    description: 'Thermostat off',
    entities: [{
      entity_id: 'climate.salon',
      state: 'off',
      attributes: {
        friendly_name: 'Salon',
        hvac_action: 'off',
        hvac_modes: HVAC_MODES_FULL,
        current_temperature: 19.5,
        temperature: 20.0,
        target_temp_step: 0.5,
        min_temp: 7,
        max_temp: 35,
        supported_features: FEATURES_FULL,
        preset_modes: ['none', 'eco'],
        preset_mode: 'none',
      },
    }],
  },
  {
    id: 'heat_cool_range',
    label: 'Heat/Cool (range)',
    description: 'Mode heat_cool avec target_temp_low + high',
    entities: [{
      entity_id: 'climate.salon',
      state: 'heat_cool',
      attributes: {
        friendly_name: 'Salon',
        hvac_action: 'idle',
        hvac_modes: HVAC_MODES_FULL,
        current_temperature: 22.0,
        target_temp_low: 19.0,
        target_temp_high: 24.0,
        target_temp_step: 0.5,
        min_temp: 7,
        max_temp: 35,
        supported_features: FEATURES_FULL,
        preset_modes: ['none', 'eco', 'comfort'],
        preset_mode: 'none',
      },
    }],
  },
  {
    id: 'multi_zones',
    label: '3 zones (même pièce)',
    description: 'Salon avec 3 zones de climatisation — tabs visibles en popup',
    entities: [
      {
        entity_id: 'climate.salon_zone1',
        state: 'heat',
        attributes: {
          friendly_name: 'Salon — Zone Nord',
          hvac_action: 'heating',
          hvac_modes: HVAC_MODES_FULL,
          current_temperature: 19.0,
          temperature: 21.0,
          target_temp_step: 0.5,
          min_temp: 7, max_temp: 35,
          supported_features: FEATURES_FULL,
          preset_modes: ['none', 'eco'], preset_mode: 'none',
        },
      },
      {
        entity_id: 'climate.salon_zone2',
        state: 'cool',
        attributes: {
          friendly_name: 'Salon — Zone Sud',
          hvac_action: 'cooling',
          hvac_modes: HVAC_MODES_FULL,
          current_temperature: 25.5,
          temperature: 22.0,
          target_temp_step: 0.5,
          min_temp: 16, max_temp: 32,
          supported_features: FEATURES_FULL,
          preset_modes: ['none', 'sleep'], preset_mode: 'sleep',
        },
      },
      {
        entity_id: 'climate.salon_zone3',
        state: 'off',
        attributes: {
          friendly_name: 'Salon — Mezzanine',
          hvac_action: 'off',
          hvac_modes: HVAC_MODES_FULL,
          current_temperature: 18.0,
          temperature: 20.0,
          target_temp_step: 0.5,
          min_temp: 7, max_temp: 35,
          supported_features: FEATURES_FULL,
          preset_modes: ['none'], preset_mode: 'none',
        },
      },
    ],
  },
  {
    id: 'multi_rooms',
    label: '3 pièces (dashboard)',
    description: 'Salon + Chambre + Bureau — visible uniquement en context dashboard',
    entities: [
      {
        entity_id: 'climate.salon',
        state: 'heat',
        attributes: {
          friendly_name: 'Salon',
          hvac_action: 'heating',
          hvac_modes: HVAC_MODES_FULL,
          current_temperature: 19.0,
          temperature: 21.0,
          target_temp_step: 0.5,
          min_temp: 7, max_temp: 35,
          supported_features: FEATURES_FULL,
          preset_modes: ['none', 'eco'], preset_mode: 'none',
        },
      },
      {
        entity_id: 'climate.chambre',
        state: 'cool',
        attributes: {
          friendly_name: 'Chambre',
          hvac_action: 'cooling',
          hvac_modes: HVAC_MODES_FULL,
          current_temperature: 25.5,
          temperature: 22.0,
          target_temp_step: 0.5,
          min_temp: 16, max_temp: 32,
          supported_features: FEATURES_FULL,
          preset_modes: ['none', 'sleep'], preset_mode: 'sleep',
        },
      },
      {
        entity_id: 'climate.bureau',
        state: 'off',
        attributes: {
          friendly_name: 'Bureau',
          hvac_action: 'off',
          hvac_modes: HVAC_MODES_FULL,
          current_temperature: 18.0,
          temperature: 20.0,
          target_temp_step: 0.5,
          min_temp: 7, max_temp: 35,
          supported_features: FEATURES_FULL,
          preset_modes: ['none'], preset_mode: 'none',
        },
      },
    ],
    areas: {
      'climate.salon': 'living',
      'climate.chambre': 'bedroom',
      'climate.bureau': 'office',
    },
  },
  {
    id: 'unavailable',
    label: 'Indisponible',
    description: 'État unavailable',
    entities: [{
      entity_id: 'climate.salon',
      state: 'unavailable',
      attributes: { friendly_name: 'Salon' },
    }],
  },
  {
    id: 'fan_only',
    label: 'Fan only',
    description: 'Mode ventilation seule',
    entities: [{
      entity_id: 'climate.salon',
      state: 'fan_only',
      attributes: {
        friendly_name: 'Salon',
        hvac_action: 'idle',
        hvac_modes: HVAC_MODES_FULL,
        current_temperature: 22.0,
        temperature: 22.0,
        target_temp_step: 0.5,
        min_temp: 7, max_temp: 35,
        supported_features: FEATURES_FULL,
        fan_modes: ['low', 'medium', 'high'], fan_mode: 'medium',
      },
    }],
  },
];
