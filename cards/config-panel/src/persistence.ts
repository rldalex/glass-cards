import {
  getAreaEntities,
  GLASS_CARDS,
} from '@glass-cards/base-card';
import {
  type RoomEntry,
} from './types';
import type { GlassConfigPanel } from './index';

// ─── Load ───

export async function loadConfig(self: GlassConfigPanel): Promise<void> {
  if (!self.hass || self._loading) return;
  self._loading = true;
  try {
    await loadConfigInner(self);
    self._loaded = true;
    self._loadState = 'ready';
  } catch {
    self._loaded = false;
    // Fail safe: surface the error instead of rendering interactive tabs on
    // default configs — any auto-save would overwrite the user's real config.
    self._loadState = 'error';
  } finally {
    self._loading = false;
  }
}

async function loadConfigInner(self: GlassConfigPanel): Promise<void> {
  if (!self.hass) return;

  // Build rooms from HA areas
  const areas = Object.values(self.hass.areas).sort((a, b) =>
    a.name.localeCompare(b.name),
  );

  // No try/catch: a failed get_config must propagate to loadConfig() so the
  // panel shows its error state. Loading "defaults" on failure looked like a
  // wiped config and let the next auto-save persist those defaults for real.
  if (!self._backend) throw new Error('No backend');
  const result = await self._backend.send<Record<string, unknown> & {
    navbar?: { room_order?: string[]; hidden_rooms?: string[]; auto_sort?: boolean };
    rooms?: Record<string, { icon?: string | null }>;
    wizard_completed?: boolean;
  }>('get_config');

  const navbarConfig = {
    room_order: result.navbar?.room_order ?? [],
    hidden_rooms: result.navbar?.hidden_rooms ?? [],
    auto_sort: result.navbar?.auto_sort ?? true,
  };
  const roomConfigs: Record<string, { icon?: string | null }> = result.rooms ?? {};
  if (result.wizard_completed !== undefined) self._wizardCompleted = result.wizard_completed;

  self._navbarConfig = navbarConfig;

  // Combined per-card slices for the dashboard view, derived from the card
  // registry — each tab's loadFromConfig owns its own field defaults, so an
  // absent slice is just {}.
  self._dashboardConfig = {
    dashboard: (result.dashboard as Record<string, unknown>) ?? {},
    ...Object.fromEntries(
      GLASS_CARDS.map((c) => [c.configKey, (result[c.configKey] as Record<string, unknown>) ?? {}]),
    ),
  };

  const hiddenSet = new Set(navbarConfig.hidden_rooms);
  const orderMap = new Map<string, number>();
  navbarConfig.room_order.forEach((id, i) => orderMap.set(id, i));

  const hass = self.hass;
  if (!hass) return;
  const rooms: RoomEntry[] = [];
  const emptyRooms: { areaId: string; name: string; icon: string }[] = [];

  for (const area of areas) {
    const entities = getAreaEntities(area.area_id, hass.entities, hass.devices);
    const backendIcon = roomConfigs[area.area_id]?.icon;
    const icon = backendIcon || area.icon || 'mdi:home';

    // Separate empty rooms (no entities) — they won't appear in the navbar
    if (entities.length === 0) {
      emptyRooms.push({ areaId: area.area_id, name: area.name, icon });
      continue;
    }

    // Aggregate live state — same logic as navbar card
    let lightsOn = 0;
    let temperature: string | null = null;
    let tempValue: number | null = null;
    let humidity: string | null = null;
    let humidityValue: number | null = null;
    let mediaPlaying = false;

    for (const entry of entities) {
      const entity = hass.states[entry.entity_id];
      if (!entity) continue;
      const domain = entry.entity_id.split('.')[0];

      if (domain === 'light' && entity.state === 'on') lightsOn++;
      if (domain === 'sensor') {
        const dc = entity.attributes.device_class;
        if (dc === 'temperature' && !temperature) {
          temperature = `${entity.state}°`;
          tempValue = parseFloat(entity.state);
        }
        if (dc === 'humidity' && !humidity) {
          humidity = `${entity.state}%`;
          humidityValue = parseFloat(entity.state);
        }
      }
      if (domain === 'media_player' && entity.state === 'playing') mediaPlaying = true;
    }

    rooms.push({
      areaId: area.area_id,
      name: area.name,
      icon,
      entityCount: entities.length,
      visible: !hiddenSet.has(area.area_id),
      lightsOn,
      temperature,
      tempValue,
      humidity,
      humidityValue,
      mediaPlaying,
    });
  }

  // Sort by backend order, then alphabetically; visible rooms first
  rooms.sort((a, b) => {
    if (a.visible !== b.visible) return a.visible ? -1 : 1;
    const aOrder = orderMap.get(a.areaId);
    const bOrder = orderMap.get(b.areaId);
    if (aOrder !== undefined && bOrder !== undefined) return aOrder - bOrder;
    if (aOrder !== undefined) return -1;
    if (bOrder !== undefined) return 1;
    return a.name.localeCompare(b.name);
  });

  self._rooms = rooms;
  self._emptyRooms = emptyRooms;
  if (!self._selectedRoom && rooms.length > 0) {
    self._selectedRoom = rooms[0].areaId;
  }
}


