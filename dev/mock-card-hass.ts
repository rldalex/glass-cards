// Generic mock HomeAssistant factory for per-card harnesses.
// Each card setup defines its entities + scenarios; this factory wraps them
// into a HASS with reactive callService and stateful backend.

import type {
  HomeAssistant,
  HassEntity,
  HassConnection,
  EntityRegistryEntry,
  DeviceRegistryEntry,
  AreaRegistryEntry,
} from '@glass-cards/base-card';

export interface MockEntitySpec {
  entity_id: string;
  state: string;
  attributes?: Record<string, unknown>;
  area_id?: string | null;
  device_id?: string | null;
}

export interface MockAreaSpec {
  area_id: string;
  name: string;
  icon?: string;
}

export interface MockHassOpts {
  entities: MockEntitySpec[];
  areas?: MockAreaSpec[];
  /** Per-card config slice returned by glass_cards/get_config. */
  cardConfig?: Record<string, unknown>;
  /** Per-room config returned by glass_cards/get_room. */
  rooms?: Record<string, { hidden_entities?: string[]; entity_order?: string[]; entity_layouts?: Record<string, string>; icon?: string | null }>;
  /** Custom service handler — receives (domain, service, data, target) and may mutate states. */
  serviceHandler?: (states: Record<string, HassEntity>, domain: string, service: string, data: Record<string, unknown> | undefined, target: { entity_id?: string | string[] } | undefined) => void;
  /** Custom subscription handler — called when a card subscribes via connection.subscribeMessage. Push initial value via the callback, return cleanup. */
  subscriptionHandler?: (msg: Record<string, unknown>, push: (data: unknown) => void) => (() => void) | void;
}

const NOW = new Date().toISOString();

function fullEntity(s: MockEntitySpec): HassEntity {
  return {
    entity_id: s.entity_id,
    state: s.state,
    attributes: s.attributes ?? {},
    last_changed: NOW,
    last_updated: NOW,
    context: { id: 'mock', parent_id: null, user_id: null },
  };
}

function defaultAreas(): MockAreaSpec[] {
  return [
    { area_id: 'salon', name: 'Salon', icon: 'mdi:sofa' },
    { area_id: 'chambre', name: 'Chambre', icon: 'mdi:bed' },
    { area_id: 'cuisine', name: 'Cuisine', icon: 'mdi:silverware-fork-knife' },
    { area_id: 'bureau', name: 'Bureau', icon: 'mdi:desk' },
    { area_id: 'salle_de_bain', name: 'Salle de bain', icon: 'mdi:shower' },
  ];
}

const SET_CONFIG_RE = /^glass_cards\/set_([a-z_]+)_config$/;

function makeBackend(
  cardConfig: Record<string, unknown>,
  rooms: Record<string, { hidden_entities?: string[]; entity_order?: string[]; entity_layouts?: Record<string, string>; icon?: string | null }>,
  onChange: () => void,
): HassConnection {
  const store: Record<string, unknown> = { ...cardConfig };
  const localRooms = { ...rooms };
  const schedules: Record<string, unknown> = {};

  function handle(type: string, data: Record<string, unknown>): unknown {
    if (type === 'glass_cards/get_config') {
      return { ...store, rooms: localRooms };
    }
    if (type === 'glass_cards/get_room') {
      const id = data.area_id as string;
      return localRooms[id] ?? { hidden_entities: [], entity_order: [], entity_layouts: {} };
    }
    if (type === 'glass_cards/set_room') {
      const id = data.area_id as string;
      localRooms[id] = { ...(localRooms[id] ?? {}), ...data };
      onChange();
      return { ok: true };
    }
    if (type === 'glass_cards/set_navbar' || type === 'glass_cards/set_dashboard') {
      const key = type.split('/')[1].replace('set_', '');
      store[key] = { ...(store[key] as object ?? {}), ...data };
      onChange();
      return { ok: true };
    }
    if (type === 'glass_cards/get_schedules') return schedules;
    if (type === 'glass_cards/set_schedule') {
      schedules[data.entity_id as string] = data;
      onChange();
      return { ok: true };
    }
    if (type === 'glass_cards/spotify_status') return { configured: false };

    const m = type.match(SET_CONFIG_RE);
    if (m) {
      const key = `${m[1]}_card`;
      if (store[key]) {
        store[key] = { ...(store[key] as object), ...data };
        onChange();
        return { ok: true };
      }
      // Fallback for camera_carousel which isn't *_card
      if (store[m[1]]) {
        store[m[1]] = { ...(store[m[1]] as object), ...data };
        onChange();
        return { ok: true };
      }
    }

    return null;
  }

  return {
    async sendMessagePromise<T>(msg: Record<string, unknown>): Promise<T> {
      return handle(msg.type as string, msg) as T;
    },
    async subscribeMessage() { return () => {}; },
    async subscribeEvents() { return () => {}; },
  };
}

export function makeCardHass(opts: MockHassOpts, onMutate: (h: HomeAssistant) => void): HomeAssistant {
  const areasList = opts.areas ?? defaultAreas();
  const areas: Record<string, AreaRegistryEntry> = Object.fromEntries(
    areasList.map((a) => [a.area_id, { area_id: a.area_id, name: a.name, icon: a.icon ?? null, picture: null }]),
  );

  const states: Record<string, HassEntity> = {};
  const entitiesReg: Record<string, EntityRegistryEntry> = {};
  const devices: Record<string, DeviceRegistryEntry> = {};

  for (const e of opts.entities) {
    states[e.entity_id] = fullEntity(e);
    entitiesReg[e.entity_id] = {
      entity_id: e.entity_id,
      area_id: e.area_id ?? null,
      device_id: e.device_id ?? null,
      platform: 'mock',
      disabled_by: null,
      hidden_by: null,
      icon: null,
    };
    if (e.device_id && !devices[e.device_id]) {
      devices[e.device_id] = { id: e.device_id, area_id: e.area_id ?? null, name: e.device_id };
    }
  }

  const ctx: { hass: HomeAssistant } = { hass: null as unknown as HomeAssistant };
  const baseConnection = makeBackend(opts.cardConfig ?? {}, opts.rooms ?? {}, () => onMutate(ctx.hass));
  const connection: HassConnection = {
    sendMessagePromise: baseConnection.sendMessagePromise,
    subscribeMessage: opts.subscriptionHandler
      ? async <T,>(callback: (msg: T) => void, msg: Record<string, unknown>) => {
          const push = (data: unknown) => callback(data as T);
          const cleanup = opts.subscriptionHandler!(msg, push);
          return cleanup ?? (() => {});
        }
      : baseConnection.subscribeMessage,
    subscribeEvents: baseConnection.subscribeEvents,
  };

  const hass: HomeAssistant = {
    states,
    callService: async (domain, service, data, target) => {
      if (opts.serviceHandler) {
        const next = { ...ctx.hass.states };
        opts.serviceHandler(next, domain, service, data, target);
        const nextHass: HomeAssistant = { ...ctx.hass, states: next };
        ctx.hass = nextHass;
        onMutate(nextHass);
      } else {
        console.debug('[mock-hass] callService (no handler)', { domain, service, data, target });
      }
    },
    connection,
    localize: (key: string) => key,
    language: 'fr',
    user: { name: 'Dev', is_admin: true, is_owner: true },
    themes: { darkMode: true },
    areas,
    devices,
    entities: entitiesReg,
    ...({ config: { unit_system: { temperature: '°C' } } } as object),
  };

  ctx.hass = hass;
  return hass;
}
