import {
  getAreaEntities,
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
    auto_sort: true,
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
    card_order: ['title', 'weather', 'climate', 'light', 'media', 'fan', 'cover', 'camera_carousel', 'spotify', 'presence'] as string[],
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
  let calendarCardConfig = {
    show_header: true,
    hidden_entities: [] as string[],
  };
  let vacuumCardConfig = {
    show_header: true,
    entity: '',
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
      calendar_card: typeof calendarCardConfig;
      vacuum_card: typeof vacuumCardConfig;
      dashboard: typeof dashboardConfig;
      wizard_completed?: boolean;
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
    if (result.calendar_card) calendarCardConfig = result.calendar_card;
    if (result.vacuum_card) vacuumCardConfig = result.vacuum_card;
    if (result.dashboard) dashboardConfig = result.dashboard;
    if (result.wizard_completed !== undefined) self._wizardCompleted = result.wizard_completed;
  } catch {
    // Backend not available
  }

  self._navbarConfig = navbarConfig;
  self._weatherConfig = weatherConfig;
  self._lightConfig = lightCardConfig;
  self._titleConfig = titleCardConfig;
  self._coverConfig = coverCardConfig;
  self._fanConfig = fanCardConfig;
  self._spotifyConfig = spotifyCardConfig;
  self._mediaConfig = mediaCardConfig;
  self._presenceConfig = presenceCardConfig;
  self._climateConfig = climateCardConfig;
  self._cameraConfig = cameraCarouselConfig;

  // Dashboard tab gets a combined config object with all card slices
  self._dashboardConfig = {
    dashboard: dashboardConfig,
    title_card: titleCardConfig,
    light_card: lightCardConfig,
    weather: weatherConfig,
    cover_card: coverCardConfig,
    fan_card: fanCardConfig,
    spotify_card: spotifyCardConfig,
    media_card: mediaCardConfig,
    presence_card: presenceCardConfig,
    climate_card: climateCardConfig,
    camera_carousel: cameraCarouselConfig,
    calendar_card: calendarCardConfig,
    vacuum_card: vacuumCardConfig,
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

// loadRoomCards — moved to ConfigTabPopup._loadRoomCards()

// loadRoomLights — moved to ConfigTabLight._loadRoomLights()

// loadRoomCovers — moved to ConfigTabCover._loadRoomCovers()

// ─── Per-card load helpers ───

export async function loadFanConfig(self: GlassConfigPanel): Promise<void> {
  const fanTab = self.shadowRoot?.querySelector('config-tab-fan') as import('./tabs/fan').ConfigTabFan | null;
  if (fanTab) fanTab.reload();
}

export async function loadClimateConfig(self: GlassConfigPanel): Promise<void> {
  const climateTab = self.shadowRoot?.querySelector('config-tab-climate') as import('./tabs/climate').ConfigTabClimate | null;
  if (climateTab) climateTab.reload();
}

export async function loadMediaConfig(self: GlassConfigPanel): Promise<void> {
  const mediaTab = self.shadowRoot?.querySelector('config-tab-media') as import('./tabs/media').ConfigTabMedia | null;
  if (mediaTab) mediaTab.reload();
}

export async function loadDashboardConfig(_self: GlassConfigPanel): Promise<void> {
  // Dashboard view manages its own state from configData prop — no-op
}

export async function loadPresenceConfig(self: GlassConfigPanel): Promise<void> {
  const presenceTab = self.shadowRoot?.querySelector('config-tab-presence') as import('./tabs/presence').ConfigTabPresence | null;
  if (presenceTab) presenceTab.reload();
}


// loadCameraCarouselConfig — moved to ConfigTabCamera.reload()
export async function loadCameraCarouselConfig(self: GlassConfigPanel): Promise<void> {
  const cameraTab = self.shadowRoot?.querySelector('config-tab-camera') as import('./tabs/camera-carousel').ConfigTabCamera | null;
  if (cameraTab) cameraTab.reload();
}

export async function loadWeatherConfig(self: GlassConfigPanel): Promise<void> {
  const weatherTab = self.shadowRoot?.querySelector('config-tab-weather') as import('./tabs/weather').ConfigTabWeather | null;
  if (weatherTab) weatherTab.reload();
}

export async function loadSpotifyConfig(self: GlassConfigPanel): Promise<void> {
  const spotifyTab = self.shadowRoot?.querySelector('config-tab-spotify') as import('./tabs/spotify').ConfigTabSpotify | null;
  if (spotifyTab) spotifyTab.reload();
}

export async function loadTitleConfig(self: GlassConfigPanel): Promise<void> {
  const titleTab = self.shadowRoot?.querySelector('config-tab-title') as import('./tabs/title').ConfigTabTitle | null;
  if (titleTab) titleTab.reload();
}

// ─── Reset ───

export async function resetConfig(self: GlassConfigPanel): Promise<void> {
  if (self._loading) return;
  self._loaded = false;
  await loadConfig(self);
}

// resetCover — moved to ConfigTabCover.reload()

export async function checkSpotifyStatus(_self: GlassConfigPanel): Promise<void> {
  // Spotify status is now checked internally by ConfigTabSpotify
}

