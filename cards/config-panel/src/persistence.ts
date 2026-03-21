import { bus } from '@glass-cards/event-bus';
import {
  getAreaEntities,
  type EntityScheduleMap,
} from '@glass-cards/base-card';
import {
  type RoomEntry, type SceneEntry, type LightEntry,
  DEFAULT_TEMP_HIGH, DEFAULT_TEMP_LOW, DEFAULT_HUMIDITY_THRESHOLD,
  DEFAULT_CARD_ORDER, IMPLEMENTED_CARDS, CARD_ICONS,
  getCardMeta,
} from './types';
import type { GlassConfigPanel } from './index';

// ─── Load ───

export async function loadConfig(self: GlassConfigPanel): Promise<void> {
  if (!self.hass || self._loading) return;
  self._loading = true;
  try {
    await loadConfigInner(self);
    self._loaded = true;
  } catch {
    self._loaded = false;
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

  // Load backend config
  let navbarConfig = {
    room_order: [] as string[],
    hidden_rooms: [] as string[],
    show_lights: true,
    show_temperature: true,
    show_humidity: true,
    show_media: true,
    auto_sort: true,
    temp_high: DEFAULT_TEMP_HIGH,
    temp_low: DEFAULT_TEMP_LOW,
    humidity_threshold: DEFAULT_HUMIDITY_THRESHOLD,
  };
  let weatherConfig = {
    entity_id: '',
    hidden_metrics: [] as string[],
    show_daily: true,
    show_hourly: true,
    show_header: true,
  };
  let dashboardConfig = {
    enabled_cards: ['weather'] as string[],
    card_order: ['title', 'weather', 'climate', 'light', 'media', 'fan', 'cover', 'spotify', 'presence'] as string[],
    hide_header: false,
    hide_sidebar: false,
  };
  let lightCardConfig = {
    show_header: true,
  };
  let titleCardConfig = {
    title: '',
    sources: [] as { source_type: string; entity: string; label: string; modes: { id: string; label: string; icon: string; color: string }[] }[],
    period_entity: '',
    period_options: [] as { id: string; label: string; icon: string; color: string }[],
  };
  let coverCardConfig = {
    show_header: true,
    dashboard_entities: [] as string[],
    dashboard_compact: true,
    presets: [0, 25, 50, 75, 100] as number[],
    entity_presets: {} as Record<string, number[]>,
  };
  let spotifyCardConfig = {
    show_header: true,
    entity_id: '',
    sort_order: 'recent_first' as 'recent_first' | 'oldest_first',
    max_items_per_section: 6,
    visible_speakers: [] as string[],
  };
  let fanCardConfig = {
    show_header: true,
  };
  let mediaCardConfig = {
    variant: 'list' as string,
    dashboard_variant: 'list' as string,
    room_variants: {} as Record<string, string>,
    extra_entities: {} as Record<string, string[]>,
    show_header: true,
  };
  let presenceCardConfig = {
    show_header: true,
    person_entities: [] as string[],
    smartphone_sensors: {} as Record<string, string>,
    notify_services: {} as Record<string, string>,
    driving_sensors: {} as Record<string, string>,
  };
  let climateCardConfig = {
    show_header: true,
    display_mode: 'list' as string,
    dashboard_display_mode: 'list' as string,
    dashboard_entities: [] as string[],
  };
  let cameraCarouselConfig = {
    show_header: true,
    entity_order: [] as string[],
    auto_cycle: false,
    cycle_interval: 10,
  };
  const roomConfigs: Record<string, { icon?: string | null }> = {};
  try {
    if (!self._backend) throw new Error('No backend');
    const result = await self._backend.send<{
      navbar: typeof navbarConfig;
      rooms: Record<string, { icon?: string | null }>;
      weather: typeof weatherConfig;
      light_card: typeof lightCardConfig;
      title_card: typeof titleCardConfig;
      cover_card: typeof coverCardConfig;
      fan_card: typeof fanCardConfig;
      spotify_card: typeof spotifyCardConfig;
      media_card: typeof mediaCardConfig;
      presence_card: typeof presenceCardConfig;
      climate_card: typeof climateCardConfig;
      camera_carousel: typeof cameraCarouselConfig;
      dashboard: typeof dashboardConfig;
    }>('get_config');
    navbarConfig = result.navbar;
    Object.assign(roomConfigs, result.rooms);
    if (result.weather) weatherConfig = result.weather;
    if (result.light_card) lightCardConfig = result.light_card;
    if (result.title_card) titleCardConfig = result.title_card;
    if (result.cover_card) coverCardConfig = result.cover_card;
    if (result.fan_card) fanCardConfig = result.fan_card;
    if (result.spotify_card) spotifyCardConfig = result.spotify_card;
    if (result.media_card) mediaCardConfig = result.media_card;
    if (result.presence_card) presenceCardConfig = result.presence_card;
    if (result.climate_card) climateCardConfig = result.climate_card;
    if (result.camera_carousel) cameraCarouselConfig = result.camera_carousel;
    if (result.dashboard) dashboardConfig = result.dashboard;
  } catch {
    // Backend not available
  }

  self._showLights = navbarConfig.show_lights ?? true;
  self._showTemperature = navbarConfig.show_temperature ?? true;
  self._showHumidity = navbarConfig.show_humidity ?? true;
  self._showMedia = navbarConfig.show_media ?? true;
  self._autoSort = navbarConfig.auto_sort ?? true;
  self._tempHigh = navbarConfig.temp_high ?? DEFAULT_TEMP_HIGH;
  self._tempLow = navbarConfig.temp_low ?? DEFAULT_TEMP_LOW;
  self._humidityThreshold = navbarConfig.humidity_threshold ?? DEFAULT_HUMIDITY_THRESHOLD;

  self._weatherEntity = weatherConfig.entity_id ?? '';
  self._weatherHiddenMetrics = weatherConfig.hidden_metrics ?? [];
  self._weatherShowDaily = weatherConfig.show_daily ?? true;
  self._weatherShowHourly = weatherConfig.show_hourly ?? true;
  self._weatherShowHeader = weatherConfig.show_header ?? true;

  self._lightShowHeader = lightCardConfig.show_header ?? true;

  self._titleText = titleCardConfig.title ?? '';
  self._titlePeriodEntity = titleCardConfig.period_entity ?? '';
  self._titlePeriodOptions = (titleCardConfig.period_options ?? []).map((o) => ({
    id: o.id || '', label: o.label || '', icon: o.icon || '', color: o.color || '',
  }));
  self._titleSources = (titleCardConfig.sources ?? []).map((s) => ({
    source_type: (s.source_type || '') as 'input_select' | 'scenes' | 'booleans',
    entity: s.entity || '',
    label: s.label || '',
    modes: (s.modes || []).map((m) => ({ id: m.id || '', label: m.label || '', icon: m.icon || '', color: m.color || 'neutral' })),
  }));
  self._coverShowHeader = coverCardConfig.show_header ?? true;
  self._fanShowHeader = fanCardConfig.show_header ?? true;
  self._coverDashboardEntities = coverCardConfig.dashboard_entities ?? [];
  self._coverDashboardCompact = coverCardConfig.dashboard_compact ?? true;
  self._coverPresets = coverCardConfig.presets ?? [0, 25, 50, 75, 100];
  self._coverEntityPresets = coverCardConfig.entity_presets ?? {};
  self._initCoverDashboardOrder();

  self._spotifyShowHeader = spotifyCardConfig.show_header ?? true;
  self._spotifyEntity = spotifyCardConfig.entity_id ?? '';
  self._spotifySortOrder = spotifyCardConfig.sort_order === 'oldest_first' ? 'oldest_first' : 'recent_first';
  self._spotifyMaxItems = spotifyCardConfig.max_items_per_section ?? 6;
  self._spotifyVisibleSpeakers = spotifyCardConfig.visible_speakers ?? [];
  self._checkSpotifyStatus();

  self._mediaShowHeader = mediaCardConfig.show_header ?? true;
  self._mediaExtraEntities = mediaCardConfig.extra_entities ?? {};

  self._presenceShowHeader = presenceCardConfig.show_header ?? true;
  self._presencePersonEntities = presenceCardConfig.person_entities ?? [];
  self._presenceSmartphoneSensors = presenceCardConfig.smartphone_sensors ?? {};
  self._presenceNotifyServices = presenceCardConfig.notify_services ?? {};
  self._presenceDrivingSensors = presenceCardConfig.driving_sensors ?? {};

  self._climateShowHeader = climateCardConfig.show_header ?? true;
  self._climateDisplayMode = climateCardConfig.display_mode === 'normal' ? 'normal' : 'list';
  self._climateDashboardDisplayMode = climateCardConfig.dashboard_display_mode === 'normal' ? 'normal' : 'list';
  self._climateDashboardEntities = climateCardConfig.dashboard_entities ?? [];

  self._cameraShowHeader = cameraCarouselConfig.show_header ?? true;
  self._cameraEntityOrder = cameraCarouselConfig.entity_order ?? [];
  self._cameraAutoCycle = cameraCarouselConfig.auto_cycle ?? false;
  self._cameraCycleInterval = cameraCarouselConfig.cycle_interval ?? 10;

  self._dashboardEnabledCards = dashboardConfig.enabled_cards ?? ['weather'];
  self._dashboardCardOrder = dashboardConfig.card_order ?? ['title', 'weather', 'climate', 'light', 'media', 'fan', 'cover', 'camera_carousel', 'spotify', 'presence'];
  self._dashboardHideHeader = dashboardConfig.hide_header ?? false;
  self._dashboardHideSidebar = dashboardConfig.hide_sidebar ?? false;

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

  // Track initial icons for dirty-checking on save
  self._initialIcons.clear();
  for (const room of rooms) {
    self._initialIcons.set(room.areaId, room.icon);
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
  self._loadRoomCards();
}

export async function loadRoomCards(self: GlassConfigPanel): Promise<void> {
  if (!self.hass || !self._selectedRoom) {
    self._cards = [];
    self._scenes = [];
    return;
  }

  const targetRoom = self._selectedRoom;
  const entities = getAreaEntities(
    targetRoom,
    self.hass.entities,
    self.hass.devices,
  );

  // Load room config from backend
  let storedOrder: string[] | null = null;
  let hiddenEntities = new Set<string>();
  let hiddenScenes = new Set<string>();
  let sceneOrder: string[] = [];
  try {
    if (!self._backend) throw new Error('No backend');
    const result = await self._backend.send<{
      card_order: string[];
      hidden_entities: string[];
      hidden_scenes: string[];
      scene_order: string[];
      visible?: boolean;
    } | null>('get_room', { area_id: targetRoom });
    if (self._selectedRoom !== targetRoom) return;
    if (result) {
      storedOrder = result.card_order.length > 0 ? result.card_order : null;
      hiddenEntities = new Set(result.hidden_entities);
      hiddenScenes = new Set(result.hidden_scenes ?? []);
      sceneOrder = result.scene_order ?? [];
    }
  } catch {
    // Backend not available
  }

  // Build scenes list
  const hass = self.hass;
  const sceneEntities = entities.filter((e) => e.entity_id.startsWith('scene.'));
  const sceneOrderMap = new Map<string, number>();
  sceneOrder.forEach((id, i) => sceneOrderMap.set(id, i));

  const scenes: SceneEntry[] = sceneEntities.map((e) => {
    const state = hass.states[e.entity_id];
    return {
      entityId: e.entity_id,
      name: (state?.attributes.friendly_name as string) || e.entity_id.split('.')[1],
      visible: !hiddenScenes.has(e.entity_id),
    };
  });

  scenes.sort((a, b) => {
    const aIdx = sceneOrderMap.get(a.entityId);
    const bIdx = sceneOrderMap.get(b.entityId);
    if (aIdx !== undefined && bIdx !== undefined) return aIdx - bIdx;
    if (aIdx !== undefined) return -1;
    if (bIdx !== undefined) return 1;
    return a.name.localeCompare(b.name);
  });

  self._scenes = scenes;

  // Count visible entities per domain (subtract hidden_entities)
  const domainCounts = new Map<string, number>();
  for (const e of entities) {
    if (hiddenEntities.has(e.entity_id)) continue;
    const d = e.entity_id.split('.')[0];
    domainCounts.set(d, (domainCounts.get(d) || 0) + 1);
  }

  // Build ordered list: stored order first, then any extra domains with entities
  const orderedIds = storedOrder ? [...storedOrder] : [...DEFAULT_CARD_ORDER];
  const orderedSet = new Set(orderedIds);

  // Add domains that have entities but aren't in the stored order
  for (const domain of domainCounts.keys()) {
    if (!orderedSet.has(domain) && CARD_ICONS[domain]) {
      orderedIds.push(domain);
    }
  }

  self._cards = orderedIds
    .filter((id) => {
      // Only show domains that have entities AND an implemented card
      return (domainCounts.get(id) || 0) > 0 && IMPLEMENTED_CARDS.has(id);
    })
    .map((id) => {
      const meta = getCardMeta(id);
      const count = domainCounts.get(id) || 0;
      return {
        id,
        nameKey: meta.nameKey,
        icon: meta.icon,
        descKey: meta.descKey,
        count,
        visible: storedOrder ? storedOrder.includes(id) : count > 0,
      };
    });
}

export async function loadRoomLights(self: GlassConfigPanel): Promise<void> {
  self._beginSuppressAutoSave();
  if (!self.hass || !self._lightRoom) {
    self._lights = [];
    return;
  }

  const targetRoom = self._lightRoom;
  const entities = getAreaEntities(targetRoom, self.hass.entities, self.hass.devices);
  const lightEntities = entities.filter((e) => e.entity_id.startsWith('light.'));

  // Load room config from backend
  let hiddenEntities = new Set<string>();
  let entityOrder: string[] = [];
  let entityLayouts: Record<string, string> = {};
  try {
    if (!self._backend) throw new Error('No backend');
    const result = await self._backend.send<{
      hidden_entities: string[];
      entity_order: string[];
      entity_layouts: Record<string, string>;
    } | null>('get_room', { area_id: targetRoom });
    if (self._lightRoom !== targetRoom) return;
    if (result) {
      hiddenEntities = new Set(result.hidden_entities ?? []);
      entityOrder = result.entity_order ?? [];
      entityLayouts = result.entity_layouts ?? {};
    }
  } catch {
    // Backend not available
  }

  // Build ordered list
  const hass = self.hass;
  const orderMap = new Map<string, number>();
  entityOrder.forEach((id, i) => orderMap.set(id, i));

  const lights: LightEntry[] = lightEntities.map((e) => {
    const state = hass.states[e.entity_id];
    const isOn = state?.state === 'on';
    const brightness = state?.attributes.brightness as number | undefined;
    const brightnessPct = isOn && brightness !== undefined ? Math.round((brightness / 255) * 100) : 0;
    return {
      entityId: e.entity_id,
      name: state?.attributes.friendly_name as string || e.entity_id.split('.')[1],
      isOn,
      brightnessPct,
      layout: (entityLayouts[e.entity_id] as 'full' | 'compact') || 'compact',
      visible: !hiddenEntities.has(e.entity_id),
    };
  });

  // Sort: visible first, then by backend order, then by name
  lights.sort((a, b) => {
    if (a.visible !== b.visible) return a.visible ? -1 : 1;
    const aIdx = orderMap.get(a.entityId);
    const bIdx = orderMap.get(b.entityId);
    if (aIdx !== undefined && bIdx !== undefined) return aIdx - bIdx;
    if (aIdx !== undefined) return -1;
    if (bIdx !== undefined) return 1;
    return a.name.localeCompare(b.name);
  });

  self._lights = lights;

  // Load schedules
  try {
    if (self._backend) {
      const schedules = await self._backend.send<EntityScheduleMap>('get_schedules');
      if (self._lightRoom !== targetRoom) return;
      self._schedulesLoaded = schedules ?? {};
      self._scheduleEdits = new Map();
      for (const l of lights) {
        const sched = self._schedulesLoaded[l.entityId];
        self._scheduleEdits.set(
          l.entityId,
          sched?.periods?.map((p) => ({ start: p.start, end: p.end, recurring: p.recurring ?? false })) ?? [],
        );
      }
    }
  } catch {
    // Backend not available
  }
}

export async function loadRoomCovers(self: GlassConfigPanel): Promise<void> {
  if (!self._backend || !self._coverRoom || !self.hass) return;
  const targetRoom = self._coverRoom;
  const areaEntities = getAreaEntities(targetRoom, self.hass.entities, self.hass.devices);
  const coverIds = areaEntities
    .filter((e) => e.entity_id.startsWith('cover.'))
    .map((e) => e.entity_id);

  // Load room config for hidden_entities / entity_order / entity_layouts
  let roomConfig: { hidden_entities?: string[]; entity_order?: string[]; entity_layouts?: Record<string, string> } | null = null;
  try {
    roomConfig = await self._backend.send<{ hidden_entities?: string[]; entity_order?: string[]; entity_layouts?: Record<string, string> } | null>('get_room', { area_id: targetRoom });
  } catch { /* ignore */ }

  // Discard stale result if room changed during async call
  if (self._coverRoom !== targetRoom) return;

  const hiddenSet = new Set(roomConfig?.hidden_entities ?? []);
  const order = roomConfig?.entity_order ?? [];
  const entityLayouts = roomConfig?.entity_layouts ?? {};

  // Sort by order
  const sorted = [...coverIds].sort((a, b) => {
    const ai = order.indexOf(a);
    const bi = order.indexOf(b);
    if (ai !== -1 && bi !== -1) return ai - bi;
    if (ai !== -1) return -1;
    if (bi !== -1) return 1;
    return 0;
  });

  self._coverRoomEntities = sorted.map((id) => {
    const entity = self.hass?.states[id];
    const name = (entity?.attributes?.friendly_name as string) || id.split('.')[1] || id;
    const dc = (entity?.attributes?.device_class as string) || 'shutter';
    return { entityId: id, name, visible: !hiddenSet.has(id), deviceClass: dc, layout: (entityLayouts[id] as 'full' | 'compact') || 'compact' };
  });
}

export async function loadRoomFans(self: GlassConfigPanel): Promise<void> {
  if (!self._backend || !self._fanRoom || !self.hass) return;
  const targetRoom = self._fanRoom;
  const areaEntities = getAreaEntities(targetRoom, self.hass.entities, self.hass.devices);
  const fanIds = areaEntities
    .filter((e) => e.entity_id.startsWith('fan.'))
    .map((e) => e.entity_id);

  let roomConfig: { hidden_entities?: string[]; entity_order?: string[]; entity_layouts?: Record<string, string> } | null = null;
  try {
    roomConfig = await self._backend.send<{ hidden_entities?: string[]; entity_order?: string[]; entity_layouts?: Record<string, string> } | null>('get_room', { area_id: targetRoom });
  } catch { /* ignore */ }

  if (self._fanRoom !== targetRoom) return;

  const hiddenSet = new Set(roomConfig?.hidden_entities ?? []);
  const order = roomConfig?.entity_order ?? [];
  const entityLayouts = roomConfig?.entity_layouts ?? {};

  const sorted = [...fanIds].sort((a, b) => {
    const ai = order.indexOf(a);
    const bi = order.indexOf(b);
    if (ai !== -1 && bi !== -1) return ai - bi;
    if (ai !== -1) return -1;
    if (bi !== -1) return 1;
    return 0;
  });

  self._fanRoomEntities = sorted.map((id) => {
    const entity = self.hass?.states[id];
    const name = (entity?.attributes?.friendly_name as string) || id.split('.')[1] || id;
    return { entityId: id, name, visible: !hiddenSet.has(id), layout: (entityLayouts[id] as 'full' | 'compact') || 'compact' };
  });
}

export async function loadRoomClimates(self: GlassConfigPanel): Promise<void> {
  self._beginSuppressAutoSave();
  if (!self.hass || !self._climateRoom || !self._backend) return;
  const targetRoom = self._climateRoom;
  const areaEntities = getAreaEntities(targetRoom, self.hass.entities, self.hass.devices);
  const climateIds = areaEntities
    .filter((e) => e.entity_id.startsWith('climate.'))
    .map((e) => e.entity_id);

  let roomHidden: string[] = [];
  let roomOrder: string[] = [];
  try {
    const result = await self._backend.send<{ hidden_entities?: string[]; entity_order?: string[] }>('get_room', { area_id: targetRoom });
    roomHidden = result?.hidden_entities || [];
    roomOrder = result?.entity_order || [];
  } catch { /* ignore */ }

  if (self._climateRoom !== targetRoom) return;

  const orderMap = new Map(roomOrder.map((id, i) => [id, i]));
  const sorted = [...climateIds].sort((a, b) => {
    const oa = orderMap.get(a) ?? 999;
    const ob = orderMap.get(b) ?? 999;
    if (oa !== ob) return oa - ob;
    return a.localeCompare(b);
  });

  self._climateRoomEntities = sorted.map((id) => {
    const state = self.hass?.states[id];
    const name = (state?.attributes?.friendly_name as string) || id.split('.')[1] || id;
    return { entityId: id, name, visible: !roomHidden.includes(id) };
  });
}

export function loadRoomMediaPlayers(self: GlassConfigPanel): void {
  if (!self.hass || !self._mediaRoom) {
    self._mediaRoomNativePlayers = [];
    return;
  }
  const entities = getAreaEntities(self._mediaRoom, self.hass.entities, self.hass.devices);
  self._mediaRoomNativePlayers = entities
    .filter((e) => e.entity_id.startsWith('media_player.'))
    .map((e) => e.entity_id);
}

// ─── Per-card load helpers ───

export async function loadFanConfig(self: GlassConfigPanel): Promise<void> {
  self._beginSuppressAutoSave();
  if (!self.hass || !self._backend) return;
  try {
    const result = await self._backend.send<{
      fan_card?: { show_header: boolean };
    }>('get_config');
    if (result?.fan_card) {
      self._fanShowHeader = result.fan_card.show_header ?? true;
    }
  } catch { /* ignore */ }
  await loadRoomFans(self);
}

export async function loadClimateConfig(self: GlassConfigPanel): Promise<void> {
  self._beginSuppressAutoSave();
  if (!self.hass || !self._backend) return;
  try {
    const result = await self._backend.send<{
      climate_card?: { show_header: boolean; display_mode: string; dashboard_display_mode: string; dashboard_entities: string[] };
    }>('get_config');
    if (result?.climate_card) {
      self._climateShowHeader = result.climate_card.show_header ?? true;
      self._climateDisplayMode = (result.climate_card.display_mode === 'normal' ? 'normal' : 'list');
      self._climateDashboardDisplayMode = (result.climate_card.dashboard_display_mode === 'normal' ? 'normal' : 'list');
      self._climateDashboardEntities = result.climate_card.dashboard_entities ?? [];
    }
  } catch { /* ignore */ }
  if (self._climateRoom) await loadRoomClimates(self);
}

export async function loadMediaConfig(self: GlassConfigPanel): Promise<void> {
  self._beginSuppressAutoSave();
  if (!self._backend) return;
  try {
    const result = await self._backend.send<{
      media_card: { show_header: boolean; extra_entities: Record<string, string[]> };
    }>('get_config');
    if (result?.media_card) {
      self._mediaShowHeader = result.media_card.show_header ?? true;
      self._mediaExtraEntities = result.media_card.extra_entities ?? {};
    }
  } catch { /* ignore */ }
}

export async function loadDashboardConfig(self: GlassConfigPanel): Promise<void> {
  self._beginSuppressAutoSave();
  if (!self._backend) return;
  try {
    const result = await self._backend.send<{
      dashboard: { enabled_cards: string[]; card_order?: string[]; hide_header?: boolean; hide_sidebar?: boolean };
      light_card?: { show_header?: boolean };
      weather?: { show_header?: boolean };
      cover_card?: { show_header?: boolean };
      fan_card?: { show_header?: boolean };
      spotify_card?: { show_header?: boolean };
      media_card?: { show_header?: boolean; extra_entities?: Record<string, string[]> };
      presence_card?: { show_header?: boolean };
      camera_carousel?: { show_header?: boolean };
    }>('get_config');
    if (result?.dashboard) {
      self._dashboardEnabledCards = result.dashboard.enabled_cards ?? ['weather'];
      self._dashboardCardOrder = result.dashboard.card_order ?? ['title', 'weather', 'climate', 'light', 'media', 'fan', 'cover', 'camera_carousel', 'spotify', 'presence'];
      self._dashboardHideHeader = result.dashboard.hide_header ?? false;
      self._dashboardHideSidebar = result.dashboard.hide_sidebar ?? false;
    }
    self._lightShowHeader = result?.light_card?.show_header ?? true;
    self._weatherShowHeader = result?.weather?.show_header ?? true;
    self._coverShowHeader = result?.cover_card?.show_header ?? true;
    self._fanShowHeader = result?.fan_card?.show_header ?? true;
    self._spotifyShowHeader = result?.spotify_card?.show_header ?? true;
    self._mediaShowHeader = result?.media_card?.show_header ?? true;
    self._mediaExtraEntities = result?.media_card?.extra_entities ?? {};
    self._presenceShowHeader = result?.presence_card?.show_header ?? true;
    self._cameraShowHeader = result?.camera_carousel?.show_header ?? true;
  } catch { /* ignore */ }
}

export async function loadPresenceConfig(self: GlassConfigPanel): Promise<void> {
  self._beginSuppressAutoSave();
  if (!self._backend) return;
  try {
    const result = await self._backend.send<{
      presence_card?: {
        show_header?: boolean;
        person_entities?: string[];
        smartphone_sensors?: Record<string, string>;
        notify_services?: Record<string, string>;
        driving_sensors?: Record<string, string>;
      };
    }>('get_config');
    if (result?.presence_card) {
      self._presenceShowHeader = result.presence_card.show_header ?? true;
      self._presencePersonEntities = result.presence_card.person_entities ?? [];
      self._presenceSmartphoneSensors = result.presence_card.smartphone_sensors ?? {};
      self._presenceNotifyServices = result.presence_card.notify_services ?? {};
      self._presenceDrivingSensors = result.presence_card.driving_sensors ?? {};
    }
  } catch { /* ignore */ }
}

export async function loadCameraCarouselConfig(self: GlassConfigPanel): Promise<void> {
  self._beginSuppressAutoSave();
  if (!self._backend) return;
  try {
    const result = await self._backend.send<{
      camera_carousel?: {
        show_header?: boolean;
        entity_order?: string[];
        auto_cycle?: boolean;
        cycle_interval?: number;
      };
    }>('get_config');
    if (result?.camera_carousel) {
      self._cameraShowHeader = result.camera_carousel.show_header ?? true;
      self._cameraEntityOrder = result.camera_carousel.entity_order ?? [];
      self._cameraAutoCycle = result.camera_carousel.auto_cycle ?? false;
      self._cameraCycleInterval = result.camera_carousel.cycle_interval ?? 10;
    }
  } catch { /* ignore */ }
}

export async function loadWeatherConfig(self: GlassConfigPanel): Promise<void> {
  self._beginSuppressAutoSave();
  if (!self._backend) return;
  try {
    const result = await self._backend.send<{
      weather: { entity_id: string; hidden_metrics: string[]; show_daily: boolean; show_hourly: boolean; show_header: boolean };
    }>('get_config');
    if (result?.weather) {
      self._weatherEntity = result.weather.entity_id ?? '';
      self._weatherHiddenMetrics = result.weather.hidden_metrics ?? [];
      self._weatherShowDaily = result.weather.show_daily ?? true;
      self._weatherShowHourly = result.weather.show_hourly ?? true;
      self._weatherShowHeader = result.weather.show_header ?? true;
    }
  } catch { /* ignore */ }
}

export async function loadSpotifyConfig(self: GlassConfigPanel): Promise<void> {
  self._beginSuppressAutoSave();
  if (!self._backend) return;
  try {
    const result = await self._backend.send<{
      spotify_card: { show_header: boolean; entity_id: string; sort_order: string; max_items_per_section: number; visible_speakers?: string[] };
    }>('get_config');
    if (result?.spotify_card) {
      self._spotifyShowHeader = result.spotify_card.show_header ?? true;
      self._spotifyEntity = result.spotify_card.entity_id ?? '';
      self._spotifySortOrder = result.spotify_card.sort_order === 'oldest_first' ? 'oldest_first' : 'recent_first';
      self._spotifyMaxItems = result.spotify_card.max_items_per_section ?? 6;
      self._spotifyVisibleSpeakers = result.spotify_card.visible_speakers ?? [];
    }
  } catch { /* ignore */ }
}

export async function loadTitleConfig(self: GlassConfigPanel): Promise<void> {
  self._beginSuppressAutoSave();
  if (!self._backend) return;
  self._iconPopupModeIdx = null;
  self._titleEditingSourceIdx = null;
  self._titleAddSourceDropdownOpen = false;
  self._titleAddEntityDropdownOpen = false;
  try {
    const result = await self._backend.send<{
      title_card: { title: string; sources: { source_type: string; entity: string; label: string; modes: { id: string; label: string; icon: string; color: string }[] }[]; period_entity: string; period_options: { id: string; label: string; icon: string; color: string }[] };
    }>('get_config');
    if (result?.title_card) {
      self._titleText = result.title_card.title ?? '';
      self._titlePeriodEntity = result.title_card.period_entity ?? '';
      self._titlePeriodOptions = (result.title_card.period_options ?? []).map((o) => ({
        id: o.id || '', label: o.label || '', icon: o.icon || '', color: o.color || '',
      }));
      self._titleSources = (result.title_card.sources ?? []).map((s) => ({
        source_type: (s.source_type || '') as 'input_select' | 'scenes' | 'booleans',
        entity: s.entity || '',
        label: s.label || '',
        modes: (s.modes || []).map((m) => ({ id: m.id || '', label: m.label || '', icon: m.icon || '', color: m.color || 'neutral' })),
      }));
    }
  } catch { /* ignore */ }
}

// ─── Save ───

export async function saveNavbar(self: GlassConfigPanel): Promise<void> {
  const backend = self._backend;
  if (!backend || self._saving) return;
  self._saving = true;
  try {
    await backend.send('set_navbar', {
      room_order: self._rooms.filter((r) => r.visible).map((r) => r.areaId),
      hidden_rooms: self._rooms.filter((r) => !r.visible).map((r) => r.areaId),
      show_lights: self._showLights,
      show_temperature: self._showTemperature,
      show_humidity: self._showHumidity,
      show_media: self._showMedia,
      auto_sort: self._autoSort,
      temp_high: self._tempHigh,
      temp_low: self._tempLow,
      humidity_threshold: self._humidityThreshold,
    });
    // Save only changed room icons in parallel
    const iconSaves = self._rooms
      .filter((room) => room.icon !== self._initialIcons.get(room.areaId))
      .map((room) => {
        const area = self.hass?.areas[room.areaId];
        const haIcon = area?.icon || 'mdi:home';
        const iconToSave = room.icon === haIcon ? null : room.icon;
        return backend.send('set_room', {
          area_id: room.areaId,
          icon: iconToSave,
        });
      });
    if (iconSaves.length > 0) await Promise.all(iconSaves);
    if (!self._mounted) return;
    self._showToast();
    bus.emit('navbar-config-changed', undefined);
  } catch {
    self._showToast(true);
  } finally {
    self._saving = false;
  }
}

export async function savePopup(self: GlassConfigPanel): Promise<void> {
  if (!self._backend || self._saving || !self._selectedRoom) return;
  self._saving = true;
  try {
    await self._backend.send('set_room', {
      area_id: self._selectedRoom,
      card_order: self._cards.filter((c) => c.visible).map((c) => c.id),
      hidden_scenes: self._scenes.filter((s) => !s.visible).map((s) => s.entityId),
      scene_order: self._scenes.map((s) => s.entityId),
    });
    if (!self._mounted) return;
    self._showToast();
    bus.emit('room-config-changed', { areaId: self._selectedRoom });
  } catch {
    self._showToast(true);
  } finally {
    self._saving = false;
  }
}

export async function saveLights(self: GlassConfigPanel): Promise<void> {
  if (!self._backend || self._saving) return;
  self._saving = true;
  try {
    await self._backend.send('set_light_config', {
      show_header: self._lightShowHeader,
    });

    if (!self._lightRoom) {
      if (!self._mounted) return;
      self._showToast();
      bus.emit('light-config-changed', undefined);
      return;
    }
    // Load existing hidden_entities to preserve non-light hidden entries
    let existingHidden: string[] = [];
    try {
      const existing = await self._backend.send<{
        hidden_entities: string[];
      } | null>('get_room', { area_id: self._lightRoom });
      if (existing) existingHidden = existing.hidden_entities ?? [];
    } catch { /* ignore */ }

    const lightEntityIds = new Set(self._lights.map((l) => l.entityId));
    const nonLightHidden = existingHidden.filter((id) => !lightEntityIds.has(id));
    const hiddenLights = self._lights.filter((l) => !l.visible).map((l) => l.entityId);

    const layouts: Record<string, string> = {};
    for (const l of self._lights) {
      if (l.layout === 'full') {
        layouts[l.entityId] = l.layout;
      }
    }
    await self._backend.send('set_room', {
      area_id: self._lightRoom,
      entity_order: self._lights.map((l) => l.entityId),
      hidden_entities: [...nonLightHidden, ...hiddenLights],
      entity_layouts: layouts,
    });
    if (!self._mounted) return;
    self._showToast();
    bus.emit('light-config-changed', undefined);
    bus.emit('room-config-changed', { areaId: self._lightRoom });
  } catch {
    self._showToast(true);
  } finally {
    self._saving = false;
  }
}

export async function saveSchedule(self: GlassConfigPanel, entityId: string): Promise<void> {
  if (!self._backend) return;
  const periods = self._scheduleEdits.get(entityId) ?? [];
  const validPeriods = periods.filter((p) => p.start && p.end);
  try {
    await self._backend.send('set_schedule', {
      entity_id: entityId,
      periods: validPeriods,
    });
    if (!self._mounted) return;
    self._showToast();
    bus.emit('schedule-changed', { entityId });
  } catch {
    if (!self._mounted) return;
    self._showToast(true);
  }
}

export async function saveCover(self: GlassConfigPanel): Promise<void> {
  if (!self._backend || self._saving) return;
  self._saving = true;
  try {
    const orderedDashboardEntities = self._coverDashboardOrder.filter((id) =>
      self._coverDashboardEntities.includes(id),
    );
    await self._backend.send('set_cover_config', {
      show_header: self._coverShowHeader,
      dashboard_compact: self._coverDashboardCompact,
      dashboard_entities: orderedDashboardEntities,
      presets: self._coverPresets,
      entity_presets: self._coverEntityPresets,
    });

    if (self._coverRoom && self._coverRoomEntities.length > 0) {
      let existingHidden: string[] = [];
      let existingOrder: string[] = [];
      let existingLayouts: Record<string, string> = {};
      try {
        const existing = await self._backend.send<{
          hidden_entities: string[];
          entity_order: string[];
          entity_layouts: Record<string, string>;
        } | null>('get_room', { area_id: self._coverRoom });
        if (existing) {
          existingHidden = existing.hidden_entities ?? [];
          existingOrder = existing.entity_order ?? [];
          existingLayouts = existing.entity_layouts ?? {};
        }
      } catch { /* ignore */ }

      const coverEntityIds = new Set(self._coverRoomEntities.map((e) => e.entityId));
      const nonCoverHidden = existingHidden.filter((id) => !coverEntityIds.has(id));
      const hiddenCovers = self._coverRoomEntities.filter((e) => !e.visible).map((e) => e.entityId);
      const nonCoverOrder = existingOrder.filter((id) => !coverEntityIds.has(id));
      const entityOrder = [...nonCoverOrder, ...self._coverRoomEntities.map((e) => e.entityId)];

      const layouts: Record<string, string> = { ...existingLayouts };
      for (const e of self._coverRoomEntities) {
        layouts[e.entityId] = e.layout;
      }

      await self._backend.send('set_room', {
        area_id: self._coverRoom,
        hidden_entities: [...nonCoverHidden, ...hiddenCovers],
        entity_order: entityOrder,
        entity_layouts: layouts,
      });
    }

    if (!self._mounted) return;
    self._showToast();
    bus.emit('cover-config-changed', undefined);
    if (self._coverRoom) bus.emit('room-config-changed', { areaId: self._coverRoom });
  } catch {
    self._showToast(true);
  } finally {
    self._saving = false;
  }
}

export async function saveFan(self: GlassConfigPanel): Promise<void> {
  if (!self._backend || self._saving) return;
  self._saving = true;
  try {
    await self._backend.send('set_fan_config', {
      show_header: self._fanShowHeader,
    });

    if (self._fanRoom && self._fanRoomEntities.length > 0) {
      let existingHidden: string[] = [];
      let existingOrder: string[] = [];
      let existingLayouts: Record<string, string> = {};
      try {
        const existing = await self._backend.send<{
          hidden_entities: string[];
          entity_order: string[];
          entity_layouts: Record<string, string>;
        } | null>('get_room', { area_id: self._fanRoom });
        if (existing) {
          existingHidden = existing.hidden_entities ?? [];
          existingOrder = existing.entity_order ?? [];
          existingLayouts = existing.entity_layouts ?? {};
        }
      } catch { /* ignore */ }

      const fanEntityIds = new Set(self._fanRoomEntities.map((e) => e.entityId));
      const nonFanHidden = existingHidden.filter((id) => !fanEntityIds.has(id));
      const hiddenFans = self._fanRoomEntities.filter((e) => !e.visible).map((e) => e.entityId);
      const nonFanOrder = existingOrder.filter((id) => !fanEntityIds.has(id));
      const entityOrder = [...nonFanOrder, ...self._fanRoomEntities.map((e) => e.entityId)];

      const layouts: Record<string, string> = { ...existingLayouts };
      for (const e of self._fanRoomEntities) {
        layouts[e.entityId] = e.layout;
      }

      await self._backend.send('set_room', {
        area_id: self._fanRoom,
        hidden_entities: [...nonFanHidden, ...hiddenFans],
        entity_order: entityOrder,
        entity_layouts: layouts,
      });
    }

    if (!self._mounted) return;
    self._showToast();
    bus.emit('fan-config-changed', undefined);
    if (self._fanRoom) bus.emit('room-config-changed', { areaId: self._fanRoom });
  } catch {
    self._showToast(true);
  } finally {
    self._saving = false;
  }
}

export async function saveClimate(self: GlassConfigPanel): Promise<void> {
  if (!self._backend || self._saving) return;
  self._saving = true;
  try {
    const allIds = self._climateRoomEntities.map((e) => e.entityId);
    const hiddenIds = self._climateRoomEntities.filter((e) => !e.visible).map((e) => e.entityId);

    await self._backend.send('set_climate_config', {
      show_header: self._climateShowHeader,
      display_mode: self._climateDisplayMode,
      dashboard_display_mode: self._climateDashboardDisplayMode,
      dashboard_entities: self._climateDashboardEntities,
    });

    if (self._climateRoom && self._climateRoomEntities.length > 0) {
      let existingHidden: string[] = [];
      let existingOrder: string[] = [];
      try {
        const existing = await self._backend.send<{
          hidden_entities: string[];
          entity_order: string[];
        } | null>('get_room', { area_id: self._climateRoom });
        if (existing) {
          existingHidden = existing.hidden_entities ?? [];
          existingOrder = existing.entity_order ?? [];
        }
      } catch { /* ignore */ }

      const climateEntityIds = new Set(self._climateRoomEntities.map((e) => e.entityId));
      const nonClimateHidden = existingHidden.filter((id) => !climateEntityIds.has(id));
      const nonClimateOrder = existingOrder.filter((id) => !climateEntityIds.has(id));

      await self._backend.send('set_room', {
        area_id: self._climateRoom,
        hidden_entities: [...nonClimateHidden, ...hiddenIds],
        entity_order: [...nonClimateOrder, ...allIds],
      });

      bus.emit('room-config-changed', { areaId: self._climateRoom });
    }

    if (!self._mounted) return;
    self._showToast();
    bus.emit('climate-config-changed', undefined);
  } catch {
    self._showToast(true);
  } finally {
    self._saving = false;
  }
}

export async function saveMedia(self: GlassConfigPanel): Promise<void> {
  if (!self._backend || self._saving) return;
  self._saving = true;
  try {
    await self._backend.send('set_media_config', {
      show_header: self._mediaShowHeader,
      extra_entities: self._mediaExtraEntities,
    });
    if (!self._mounted) return;
    self._showToast();
    bus.emit('media-config-changed', undefined);
  } catch {
    self._showToast(true);
  } finally {
    self._saving = false;
  }
}

export async function savePresence(self: GlassConfigPanel): Promise<void> {
  if (!self._backend || self._saving) return;
  self._saving = true;
  try {
    await self._backend.send('set_presence_config', {
      show_header: self._presenceShowHeader,
      person_entities: self._presencePersonEntities,
      smartphone_sensors: self._presenceSmartphoneSensors,
      notify_services: self._presenceNotifyServices,
      driving_sensors: self._presenceDrivingSensors,
    });
    if (!self._mounted) return;
    self._showToast();
    bus.emit('presence-config-changed', undefined);
  } catch {
    self._showToast(true);
  } finally {
    self._saving = false;
  }
}

export async function saveCameraCarousel(self: GlassConfigPanel): Promise<void> {
  if (!self._backend || self._saving) return;
  self._saving = true;
  try {
    await self._backend.send('set_camera_carousel_config', {
      show_header: self._cameraShowHeader,
      entity_order: self._cameraEntityOrder,
      auto_cycle: self._cameraAutoCycle,
      cycle_interval: self._cameraCycleInterval,
    });
    if (!self._mounted) return;
    self._showToast();
    bus.emit('camera-carousel-config-changed', undefined);
  } catch {
    self._showToast(true);
  } finally {
    self._saving = false;
  }
}

export async function saveWeather(self: GlassConfigPanel): Promise<void> {
  if (!self._backend || self._saving) return;
  self._saving = true;
  try {
    await self._backend.send('set_weather', {
      ...(self._weatherEntity ? { entity_id: self._weatherEntity } : {}),
      hidden_metrics: self._weatherHiddenMetrics,
      show_daily: self._weatherShowDaily,
      show_hourly: self._weatherShowHourly,
      show_header: self._weatherShowHeader,
    });
    if (!self._mounted) return;
    self._showToast();
    bus.emit('weather-config-changed', undefined);
  } catch {
    self._showToast(true);
  } finally {
    self._saving = false;
  }
}

export async function saveSpotify(self: GlassConfigPanel): Promise<void> {
  if (!self._backend || self._saving) return;
  self._saving = true;
  try {
    await self._backend.send('set_spotify_config', {
      show_header: self._spotifyShowHeader,
      entity_id: self._spotifyEntity,
      sort_order: self._spotifySortOrder,
      max_items_per_section: self._spotifyMaxItems,
      visible_speakers: self._spotifyVisibleSpeakers,
    });
    if (!self._mounted) return;
    self._showToast();
    bus.emit('spotify-config-changed', undefined);
  } catch {
    self._showToast(true);
  } finally {
    self._saving = false;
  }
}

export async function saveTitle(self: GlassConfigPanel): Promise<void> {
  if (!self._backend || self._saving) return;
  self._saving = true;
  try {
    await self._backend.send('set_title_config', {
      title: self._titleText,
      period_entity: self._titlePeriodEntity,
      period_options: self._titlePeriodOptions,
      sources: self._titleSources.map((s) => ({
        source_type: s.source_type,
        entity: s.entity || '',
        label: s.label || '',
        modes: s.modes,
      })),
    });
    if (!self._mounted) return;
    self._showToast();
    bus.emit('title-config-changed', undefined);
  } catch {
    self._showToast(true);
  } finally {
    self._saving = false;
  }
}

export async function saveDashboard(self: GlassConfigPanel): Promise<void> {
  if (!self._backend || self._saving) return;
  self._saving = true;
  try {
    await self._backend.send('set_dashboard', {
      enabled_cards: self._dashboardEnabledCards,
      card_order: self._dashboardCardOrder,
      hide_header: self._dashboardHideHeader,
      hide_sidebar: self._dashboardHideSidebar,
    });
    await self._backend.send('set_light_config', {
      show_header: self._lightShowHeader,
    });
    await self._backend.send('set_weather', {
      show_header: self._weatherShowHeader,
    });
    const orderedDashCovers = self._coverDashboardOrder.filter((id) =>
      self._coverDashboardEntities.includes(id),
    );
    await self._backend.send('set_cover_config', {
      show_header: self._coverShowHeader,
      dashboard_compact: self._coverDashboardCompact,
      dashboard_entities: orderedDashCovers,
      presets: self._coverPresets,
      entity_presets: self._coverEntityPresets,
    });
    await self._backend.send('set_spotify_config', {
      show_header: self._spotifyShowHeader,
    });
    await self._backend.send('set_fan_config', {
      show_header: self._fanShowHeader,
    });
    await self._backend.send('set_media_config', {
      show_header: self._mediaShowHeader,
      extra_entities: self._mediaExtraEntities,
    });
    await self._backend.send('set_presence_config', {
      show_header: self._presenceShowHeader,
      person_entities: self._presencePersonEntities,
      smartphone_sensors: self._presenceSmartphoneSensors,
      notify_services: self._presenceNotifyServices,
      driving_sensors: self._presenceDrivingSensors,
    });
    await self._backend.send('set_climate_config', {
      show_header: self._climateShowHeader,
      display_mode: self._climateDisplayMode,
      dashboard_display_mode: self._climateDashboardDisplayMode,
      dashboard_entities: self._climateDashboardEntities,
    });
    if (!self._mounted) return;
    self._showToast();
    bus.emit('dashboard-config-changed', undefined);
    bus.emit('light-config-changed', undefined);
    bus.emit('weather-config-changed', undefined);
    bus.emit('cover-config-changed', undefined);
    bus.emit('fan-config-changed', undefined);
    bus.emit('spotify-config-changed', undefined);
    bus.emit('media-config-changed', undefined);
    bus.emit('presence-config-changed', undefined);
    bus.emit('climate-config-changed', undefined);
  } catch {
    self._showToast(true);
  } finally {
    self._saving = false;
  }
}

// ─── Reset ───

export async function resetConfig(self: GlassConfigPanel): Promise<void> {
  if (self._loading) return;
  self._loaded = false;
  await loadConfig(self);
  if (self._lightRoom) {
    await loadRoomLights(self);
  }
}

export async function resetCover(self: GlassConfigPanel): Promise<void> {
  self._beginSuppressAutoSave();
  if (!self._backend) return;
  try {
    const result = await self._backend.send<{
      cover_card?: { show_header: boolean; dashboard_entities: string[]; dashboard_compact?: boolean; presets: number[]; entity_presets?: Record<string, number[]> };
    }>('get_config');
    if (result?.cover_card) {
      self._coverShowHeader = result.cover_card.show_header ?? true;
      self._coverDashboardEntities = result.cover_card.dashboard_entities ?? [];
      self._coverDashboardCompact = result.cover_card.dashboard_compact ?? true;
      self._coverPresets = result.cover_card.presets ?? [0, 25, 50, 75, 100];
      self._coverEntityPresets = result.cover_card.entity_presets ?? {};
      self._coverEntityPresetInput = {};
      self._initCoverDashboardOrder();
    }
  } catch { /* ignore */ }
  await loadRoomCovers(self);
}

export async function checkSpotifyStatus(self: GlassConfigPanel): Promise<void> {
  if (!self._backend) return;
  try {
    const result = await self._backend.send<{ configured: boolean }>('spotify_status');
    if (!self._mounted) return;
    self._spotifyConfigured = result?.configured ?? false;
  } catch {
    self._spotifyConfigured = false;
  }
}

export function save(self: GlassConfigPanel): void {
  if (self._tab === 'navbar') {
    saveNavbar(self);
  } else if (self._tab === 'popup') {
    savePopup(self);
  } else if (self._tab === 'light') {
    saveLights(self);
  } else if (self._tab === 'weather') {
    saveWeather(self);
  } else if (self._tab === 'title') {
    saveTitle(self);
  } else if (self._tab === 'cover') {
    saveCover(self);
  } else if (self._tab === 'climate') {
    saveClimate(self);
  } else if (self._tab === 'fan') {
    saveFan(self);
  } else if (self._tab === 'spotify') {
    saveSpotify(self);
  } else if (self._tab === 'media') {
    saveMedia(self);
  } else if (self._tab === 'presence') {
    savePresence(self);
  } else if (self._tab === 'camera_carousel') {
    saveCameraCarousel(self);
  } else if (self._tab === 'unassigned') {
    // No save — assignments go directly to HA entity registry
  } else {
    saveDashboard(self);
  }
}
