// Rich mock HomeAssistant for cards that need a full house (config-panel, navbar, popup).
// Provides multiple areas with realistic entity counts per domain, full callService mutation,
// and a stateful backend that responds to all glass_cards/get_/set_ commands plus
// Spotify and weather subscriptions.

import type {
  HomeAssistant,
  HassEntity,
  HassConnection,
  EntityRegistryEntry,
  DeviceRegistryEntry,
  AreaRegistryEntry,
} from '@glass-cards/base-card';

// ───────────────────────── Areas ─────────────────────────

const AREAS: AreaRegistryEntry[] = [
  { area_id: 'salon', name: 'Salon', icon: 'mdi:sofa', picture: null },
  { area_id: 'chambre', name: 'Chambre', icon: 'mdi:bed', picture: null },
  { area_id: 'cuisine', name: 'Cuisine', icon: 'mdi:silverware-fork-knife', picture: null },
  { area_id: 'bureau', name: 'Bureau', icon: 'mdi:desk', picture: null },
  { area_id: 'salle_de_bain', name: 'Salle de bain', icon: 'mdi:shower', picture: null },
  { area_id: 'entree', name: 'Entrée', icon: 'mdi:door', picture: null },
];

// ───────────────────────── Light feature bitmasks ─────────────────────────
// HA ColorMode strings: 'onoff', 'brightness', 'color_temp', 'hs', 'rgb', 'rgbw', 'rgbww', 'xy'

// ───────────────────────── Entity factory ─────────────────────────

const NOW = new Date().toISOString();

function entity(id: string, state: string, attrs: Record<string, unknown> = {}): HassEntity {
  return {
    entity_id: id,
    state,
    attributes: attrs,
    last_changed: NOW,
    last_updated: NOW,
    context: { id: 'mock', parent_id: null, user_id: null },
  };
}

// ───────────────────────── House entities ─────────────────────────

interface EntitySpec {
  state: HassEntity;
  area: string;
  device_id?: string;
}

const ENTITIES: EntitySpec[] = [
  // ════════════════════ SALON ════════════════════
  // Lights — 4 with varied capabilities
  { state: entity('light.salon_plafond', 'on', { friendly_name: 'Plafond Salon', supported_color_modes: ['brightness'], color_mode: 'brightness', brightness: 200 }), area: 'salon' },
  { state: entity('light.salon_lampadaire', 'off', { friendly_name: 'Lampadaire Salon', supported_color_modes: ['color_temp'], color_mode: 'color_temp', brightness: 150, color_temp_kelvin: 2800, min_color_temp_kelvin: 2200, max_color_temp_kelvin: 6500 }), area: 'salon' },
  { state: entity('light.salon_strip', 'on', { friendly_name: 'Strip LED TV', supported_color_modes: ['hs', 'rgb', 'color_temp'], color_mode: 'rgb', brightness: 180, rgb_color: [129, 140, 248], hs_color: [232, 48], color_temp_kelvin: 3500, min_color_temp_kelvin: 2200, max_color_temp_kelvin: 6500 }), area: 'salon' },
  { state: entity('light.salon_meuble', 'off', { friendly_name: 'Meuble TV', supported_color_modes: ['onoff'] }), area: 'salon' },
  // Climate
  { state: entity('climate.salon', 'heat', { friendly_name: 'Salon', hvac_action: 'heating', hvac_modes: ['off', 'heat', 'cool', 'heat_cool', 'auto'], current_temperature: 19, temperature: 21, min_temp: 7, max_temp: 35, target_temp_step: 0.5, supported_features: 1 | 16 | 128 | 256, preset_modes: ['none', 'eco', 'comfort'], preset_mode: 'none', current_humidity: 48 }), area: 'salon' },
  // Media players (Sonos pair + TV)
  { state: entity('media_player.salon_tv', 'playing', { friendly_name: 'TV Salon', media_title: 'Inception', media_artist: 'Hans Zimmer', media_album_name: 'Inception OST', entity_picture: 'https://picsum.photos/seed/inception/200/200', volume_level: 0.4, is_volume_muted: false, media_duration: 8950, media_position: 2340, media_position_updated_at: NOW, source: 'Plex', source_list: ['Plex', 'Netflix', 'Apple TV', 'HDMI 1'], supported_features: 0x80FFF }), area: 'salon' },
  { state: entity('media_player.salon_sonos', 'idle', { friendly_name: 'Sonos Salon', volume_level: 0.3, source: 'Spotify Connect', source_list: ['Spotify Connect', 'AirPlay'], supported_features: 0xFFFFF, group_members: ['media_player.salon_sonos'] }), area: 'salon' },
  // Covers (3 volets)
  { state: entity('cover.salon_volet_nord', 'open', { friendly_name: 'Volet Nord', current_position: 100, device_class: 'shutter', supported_features: 15 }), area: 'salon' },
  { state: entity('cover.salon_volet_est', 'open', { friendly_name: 'Volet Est', current_position: 60, device_class: 'shutter', supported_features: 15 }), area: 'salon' },
  { state: entity('cover.salon_volet_sud', 'closed', { friendly_name: 'Volet Sud', current_position: 0, device_class: 'shutter', supported_features: 15 }), area: 'salon' },
  // Fan
  { state: entity('fan.salon_plafond', 'on', { friendly_name: 'Ventilateur plafond', percentage: 50, percentage_step: 25, oscillating: true, direction: 'forward', preset_modes: ['auto', 'eco', 'night'], preset_mode: 'auto', supported_features: 63 }), area: 'salon' },
  // Camera with companions
  { state: entity('camera.salon_cam', 'idle', { friendly_name: 'Caméra Salon', entity_picture: '/api/camera_proxy/camera.salon_cam' }), area: 'salon', device_id: 'cam_salon' },
  { state: entity('binary_sensor.salon_cam_motion', 'off', { friendly_name: 'Caméra Salon Motion', device_class: 'motion' }), area: 'salon', device_id: 'cam_salon' },
  { state: entity('switch.salon_cam_record', 'on', { friendly_name: 'Caméra Salon Record' }), area: 'salon', device_id: 'cam_salon' },
  { state: entity('binary_sensor.salon_cam_person', 'off', { friendly_name: 'Caméra Salon AI Person', device_class: 'occupancy' }), area: 'salon', device_id: 'cam_salon' },
  // Sensors
  { state: entity('sensor.salon_temperature', '20.5', { friendly_name: 'Température Salon', device_class: 'temperature', unit_of_measurement: '°C', state_class: 'measurement' }), area: 'salon' },
  { state: entity('sensor.salon_humidity', '48', { friendly_name: 'Humidité Salon', device_class: 'humidity', unit_of_measurement: '%', state_class: 'measurement' }), area: 'salon' },
  { state: entity('binary_sensor.salon_presence', 'on', { friendly_name: 'Présence Salon', device_class: 'occupancy' }), area: 'salon' },
  // Vacuum (Saros 10R) + a representative subset of companions for the config panel
  { state: entity('vacuum.saros_10r', 'docked', { friendly_name: 'Saros 10R', fan_speed: 'turbo', fan_speed_list: ['quiet', 'balanced', 'turbo', 'max'], supported_features: 30524 }), area: 'salon' },
  { state: entity('sensor.saros_10r_batterie', '100', { friendly_name: 'Batterie' }), area: 'salon' },
  { state: entity('sensor.saros_10r_current_room', '', { friendly_name: 'Pièce courante' }), area: 'salon' },
  { state: entity('sensor.saros_10r_erreur_de_l_aspirateur', 'none', { friendly_name: 'Erreur' }), area: 'salon' },
  { state: entity('select.saros_10r_intensite_de_frottement', 'moderate', { friendly_name: 'Intensité', options: ['off', 'low', 'medium', 'moderate', 'high'] }), area: 'salon' },
  { state: entity('select.saros_10r_parcours_de_lavage_de_sol', 'standard', { friendly_name: 'Parcours', options: ['standard', 'deep', 'fast'] }), area: 'salon' },
  { state: entity('binary_sensor.saros_10r_en_charge', 'on', { friendly_name: 'En charge' }), area: 'salon' },
  { state: entity('binary_sensor.saros_10r_serpilliere_fixee', 'on', { friendly_name: 'Serpillière' }), area: 'salon' },
  // Real install units: consumables in hours, dock drying time in SECONDS
  { state: entity('sensor.saros_10r_temps_restant_filtre', '112.979166666667', { friendly_name: 'Filtre', unit_of_measurement: 'h', device_class: 'duration' }), area: 'salon' },
  { state: entity('binary_sensor.saros_10r_dock_dirty_water_box', 'off', { friendly_name: 'Eau sale' }), area: 'salon' },
  { state: entity('binary_sensor.saros_10r_dock_clean_water_box', 'on', { friendly_name: 'Eau propre' }), area: 'salon' },
  { state: entity('binary_sensor.saros_10r_dock_sechage_de_la_serpilliere', 'off', { friendly_name: 'Séchage' }), area: 'salon' },
  { state: entity('sensor.saros_10r_dock_temps_de_sechage_de_la_serpilliere_restant', '0', { friendly_name: 'Temps de séchage restant', unit_of_measurement: 's', device_class: 'duration' }), area: 'salon' },
  { state: entity('sensor.saros_10r_duree_de_nettoyage', '12.6166666666667', { friendly_name: 'Durée de nettoyage', unit_of_measurement: 'min', device_class: 'duration' }), area: 'salon' },
  { state: entity('sensor.saros_10r_surface_de_nettoyage', '10.3', { friendly_name: 'Surface de nettoyage', unit_of_measurement: 'm²' }), area: 'salon' },
  { state: entity('sensor.saros_10r_fin_du_dernier_nettoyage', '2026-06-10T08:12:33+00:00', { friendly_name: 'Fin du dernier nettoyage', device_class: 'timestamp' }), area: 'salon' },
  { state: entity('button.saros_10r_nettoyage_cuisine', '2026-05-01T10:00:00+00:00', { friendly_name: 'Nettoyage cuisine' }), area: 'salon' },
  { state: entity('button.saros_10r_nettoyage_sam', '2026-05-01T10:00:00+00:00', { friendly_name: 'Nettoyage séjour' }), area: 'salon' },
  { state: entity('button.saros_10r_nettoyage_complet', '2026-05-01T10:00:00+00:00', { friendly_name: 'Nettoyage complet' }), area: 'salon' },

  // ════════════════════ CHAMBRE ════════════════════
  { state: entity('light.chambre_plafond', 'off', { friendly_name: 'Plafond Chambre', supported_color_modes: ['brightness'], color_mode: 'brightness', brightness: 0 }), area: 'chambre' },
  { state: entity('light.chambre_chevet_gauche', 'on', { friendly_name: 'Chevet gauche', supported_color_modes: ['color_temp'], color_mode: 'color_temp', brightness: 80, color_temp_kelvin: 2400, min_color_temp_kelvin: 2200, max_color_temp_kelvin: 6500 }), area: 'chambre' },
  { state: entity('light.chambre_chevet_droit', 'on', { friendly_name: 'Chevet droit', supported_color_modes: ['color_temp'], color_mode: 'color_temp', brightness: 60, color_temp_kelvin: 2400, min_color_temp_kelvin: 2200, max_color_temp_kelvin: 6500 }), area: 'chambre' },
  { state: entity('climate.chambre', 'cool', { friendly_name: 'Chambre', hvac_action: 'cooling', hvac_modes: ['off', 'heat', 'cool'], current_temperature: 24, temperature: 22, min_temp: 16, max_temp: 32, target_temp_step: 0.5, supported_features: 1 | 128 | 256, preset_modes: ['none', 'sleep'], preset_mode: 'sleep' }), area: 'chambre' },
  { state: entity('fan.chambre', 'on', { friendly_name: 'Ventilateur Chambre', percentage: 33, percentage_step: 33, supported_features: 49 }), area: 'chambre' },
  { state: entity('cover.chambre_volet', 'closed', { friendly_name: 'Volet Chambre', current_position: 0, device_class: 'shutter', supported_features: 15 }), area: 'chambre' },
  { state: entity('cover.chambre_rideau', 'open', { friendly_name: 'Rideau Chambre', current_position: 80, device_class: 'curtain', supported_features: 15 }), area: 'chambre' },
  { state: entity('media_player.chambre_radio', 'off', { friendly_name: 'Radio Chambre', supported_features: 0x80FFF }), area: 'chambre' },
  { state: entity('binary_sensor.chambre_presence', 'off', { friendly_name: 'Présence Chambre', device_class: 'occupancy' }), area: 'chambre' },
  { state: entity('sensor.chambre_temperature', '21.2', { friendly_name: 'Température Chambre', device_class: 'temperature', unit_of_measurement: '°C' }), area: 'chambre' },

  // ════════════════════ CUISINE ════════════════════
  { state: entity('light.cuisine_spots', 'on', { friendly_name: 'Spots Cuisine', supported_color_modes: ['brightness'], color_mode: 'brightness', brightness: 255 }), area: 'cuisine' },
  { state: entity('light.cuisine_ilot', 'on', { friendly_name: 'Suspension îlot', supported_color_modes: ['color_temp'], color_mode: 'color_temp', brightness: 200, color_temp_kelvin: 3500, min_color_temp_kelvin: 2200, max_color_temp_kelvin: 6500 }), area: 'cuisine' },
  { state: entity('light.cuisine_plinthe', 'off', { friendly_name: 'LED plinthe', supported_color_modes: ['hs', 'rgb'], color_mode: 'rgb', brightness: 100, rgb_color: [251, 191, 36], hs_color: [44, 86] }), area: 'cuisine' },
  { state: entity('media_player.cuisine_sonos', 'playing', { friendly_name: 'Sonos Cuisine', media_title: 'Lofi Hip Hop Radio', media_artist: 'ChilledCow', entity_picture: 'https://picsum.photos/seed/lofi/200/200', volume_level: 0.25, supported_features: 0xFFFFF, group_members: ['media_player.cuisine_sonos'] }), area: 'cuisine' },
  { state: entity('sensor.cuisine_temperature', '22.0', { friendly_name: 'Température Cuisine', device_class: 'temperature', unit_of_measurement: '°C' }), area: 'cuisine' },
  { state: entity('binary_sensor.cuisine_porte_frigo', 'off', { friendly_name: 'Porte frigo', device_class: 'door' }), area: 'cuisine' },

  // ════════════════════ BUREAU ════════════════════
  { state: entity('light.bureau_plafond', 'off', { friendly_name: 'Plafond Bureau', supported_color_modes: ['brightness'], color_mode: 'brightness', brightness: 0 }), area: 'bureau' },
  { state: entity('light.bureau_lampe', 'on', { friendly_name: 'Lampe bureau', supported_color_modes: ['hs', 'rgb', 'color_temp'], color_mode: 'color_temp', brightness: 220, color_temp_kelvin: 4500, min_color_temp_kelvin: 2200, max_color_temp_kelvin: 6500, rgb_color: [255, 200, 150] }), area: 'bureau' },
  { state: entity('cover.bureau_store', 'open', { friendly_name: 'Store Bureau', current_position: 75, current_tilt_position: 45, device_class: 'blind', supported_features: 255 }), area: 'bureau' },
  { state: entity('camera.bureau_cam', 'recording', { friendly_name: 'Caméra Bureau' }), area: 'bureau', device_id: 'cam_bureau' },
  { state: entity('binary_sensor.bureau_cam_motion', 'on', { friendly_name: 'Bureau Motion', device_class: 'motion' }), area: 'bureau', device_id: 'cam_bureau' },
  { state: entity('switch.bureau_cam_record', 'on', { friendly_name: 'Bureau Record' }), area: 'bureau', device_id: 'cam_bureau' },
  { state: entity('media_player.bureau_speaker', 'idle', { friendly_name: 'Enceinte Bureau', supported_features: 0xFFFFF }), area: 'bureau' },

  // ════════════════════ SDB ════════════════════
  { state: entity('light.sdb_plafond', 'off', { friendly_name: 'Plafond SDB', supported_color_modes: ['brightness'], color_mode: 'brightness', brightness: 0 }), area: 'salle_de_bain' },
  { state: entity('light.sdb_miroir', 'off', { friendly_name: 'Miroir SDB', supported_color_modes: ['color_temp'], color_mode: 'color_temp', brightness: 0, color_temp_kelvin: 5000, min_color_temp_kelvin: 2700, max_color_temp_kelvin: 6500 }), area: 'salle_de_bain' },
  { state: entity('fan.sdb_vmc', 'on', { friendly_name: 'VMC SDB', supported_features: 49 }), area: 'salle_de_bain' },
  { state: entity('sensor.sdb_humidity', '62', { friendly_name: 'Humidité SDB', device_class: 'humidity', unit_of_measurement: '%' }), area: 'salle_de_bain' },
  { state: entity('sensor.sdb_temperature', '21.5', { friendly_name: 'Température SDB', device_class: 'temperature', unit_of_measurement: '°C' }), area: 'salle_de_bain' },

  // ════════════════════ ENTRÉE ════════════════════
  { state: entity('light.entree_plafond', 'on', { friendly_name: 'Plafond Entrée', supported_color_modes: ['brightness'], color_mode: 'brightness', brightness: 180 }), area: 'entree' },
  { state: entity('cover.entree_porte_garage', 'closed', { friendly_name: 'Porte garage', device_class: 'garage', supported_features: 11 }), area: 'entree' },
  { state: entity('camera.entree_cam', 'idle', { friendly_name: 'Caméra Entrée', entity_picture: '/api/camera_proxy/camera.entree_cam' }), area: 'entree', device_id: 'cam_entree' },
  { state: entity('binary_sensor.entree_cam_motion', 'on', { friendly_name: 'Entrée Motion', device_class: 'motion' }), area: 'entree', device_id: 'cam_entree' },
  { state: entity('binary_sensor.entree_cam_person', 'on', { friendly_name: 'Entrée AI Person', device_class: 'occupancy' }), area: 'entree', device_id: 'cam_entree' },
  { state: entity('switch.entree_cam_record', 'off', { friendly_name: 'Entrée Record' }), area: 'entree', device_id: 'cam_entree' },
  { state: entity('binary_sensor.entree_porte', 'off', { friendly_name: 'Porte entrée', device_class: 'door' }), area: 'entree' },

  // ════════════════════ GLOBAL (no area) ════════════════════
  // Weather
  { state: entity('weather.maison', 'partlycloudy', { friendly_name: 'Météo', temperature: 18, humidity: 65, pressure: 1015, wind_bearing: 220, wind_speed: 12, visibility: 22, uv_index: 4, temperature_unit: '°C' }), area: '' },
  // Persons
  { state: entity('person.roland', 'home', { friendly_name: 'Roland', latitude: 48.8566, longitude: 2.3522, source: 'device_tracker.roland_phone' }), area: '' },
  { state: entity('person.marie', 'not_home', { friendly_name: 'Marie', latitude: 45.7640, longitude: 4.8357, source: 'device_tracker.marie_phone' }), area: '' },
  // Smartphone sensors
  { state: entity('sensor.roland_phone_battery', '82', { friendly_name: 'Roland Phone Battery', device_class: 'battery', unit_of_measurement: '%', geocoded_location: 'Maison', heart_rate: 72, oxygen_saturation: 98, daily_steps: 6234 }), area: '' },
  { state: entity('sensor.marie_phone_battery', '45', { friendly_name: 'Marie Phone Battery', device_class: 'battery', unit_of_measurement: '%', geocoded_location: 'Lyon, France', android_auto: 'on' }), area: '' },
  { state: entity('binary_sensor.marie_driving', 'on', { friendly_name: 'Marie Driving', device_class: 'moving' }), area: '' },
  // Spotify
  { state: entity('media_player.spotify', 'idle', { friendly_name: 'Spotify', source: 'Sonos Salon', source_list: ['Sonos Salon', 'Sonos Cuisine'], supported_features: 0xFFFFF }), area: '' },
  // Calendar
  { state: entity('calendar.maison', 'on', { friendly_name: 'Calendrier maison', message: 'Daily standup', start_time: NOW, end_time: NOW, description: '', location: '', all_day: false }), area: '' },
  { state: entity('calendar.famille', 'off', { friendly_name: 'Famille', message: '', start_time: '', end_time: '' }), area: '' },
  // Title sources (input_select, scenes, input_boolean)
  { state: entity('input_select.periode_journee', 'Après-midi', { friendly_name: 'Période journée', options: ['Matin', 'Après-midi', 'Soir', 'Nuit'] }), area: '' },
  { state: entity('input_select.mode_maison', 'jour', { friendly_name: 'Mode maison', options: ['jour', 'soiree', 'cinema', 'nuit'] }), area: '' },
  { state: entity('scene.lecture', 'unknown', { friendly_name: 'Lecture' }), area: '' },
  { state: entity('scene.detente', 'unknown', { friendly_name: 'Détente' }), area: '' },
  { state: entity('scene.repas', 'unknown', { friendly_name: 'Repas' }), area: '' },
  { state: entity('input_boolean.presence_simulee', 'on', { friendly_name: 'Présence simulée' }), area: '' },
  { state: entity('input_boolean.vacances', 'off', { friendly_name: 'Vacances' }), area: '' },
];

// ───────────────────────── Stateful backend store ─────────────────────────

interface BackendStore {
  navbar: { room_order: string[]; hidden_rooms: string[]; auto_sort: boolean; popup_auto_close?: number };
  rooms: Record<string, { icon?: string | null; hidden_entities?: string[]; entity_order?: string[]; entity_layouts?: Record<string, string>; area_id?: string; buttons?: { icon?: string; label?: string; service: string; data?: Record<string, unknown> }[] }>;
  dashboard: { enabled_cards: string[]; card_order: string[]; hide_header: boolean; hide_sidebar: boolean };
  weather: Record<string, unknown>;
  light_card: Record<string, unknown>;
  title_card: Record<string, unknown>;
  cover_card: Record<string, unknown>;
  fan_card: Record<string, unknown>;
  spotify_card: Record<string, unknown>;
  media_card: Record<string, unknown>;
  presence_card: Record<string, unknown>;
  climate_card: Record<string, unknown>;
  camera_carousel: Record<string, unknown>;
  vacuum_card: Record<string, unknown>;
  schedules: Record<string, unknown>;
  wizard_completed: boolean;
}

function defaultStore(): BackendStore {
  return {
    navbar: { room_order: ['salon', 'chambre', 'cuisine', 'bureau', 'salle_de_bain', 'entree'], hidden_rooms: [], auto_sort: true, popup_auto_close: 0 },
    rooms: {
      salon: {
        area_id: 'salon',
        buttons: [
          { icon: 'mdi:robot-vacuum-variant', label: 'Aspirer', service: 'vacuum.clean_area', data: { entity_id: 'vacuum.saros_10r', segments: [1] } },
          { icon: 'mdi:palette', label: '', service: 'scene.turn_on', data: { entity_id: 'scene.soiree' } },
          { icon: '', label: 'Tout off', service: 'homeassistant.turn_off', data: { area_id: 'salon' } },
        ],
      },
      chambre: {
        area_id: 'chambre',
        buttons: [
          { icon: 'mdi:robot-vacuum-variant', label: '', service: 'vacuum.clean_area', data: { entity_id: 'vacuum.saros_10r', segments: [2] } },
        ],
      },
    },
    dashboard: {
      enabled_cards: ['title', 'weather', 'climate', 'light', 'media', 'presence', 'camera_carousel'],
      card_order: ['title', 'weather', 'climate', 'light', 'media', 'fan', 'cover', 'camera_carousel', 'spotify', 'presence'],
      hide_header: false, hide_sidebar: false,
    },
    weather: { entity_id: 'weather.maison', hidden_metrics: [], show_daily: true, show_hourly: true, show_header: true },
    light_card: { show_header: true },
    title_card: {
      title: 'Maison Roland',
      sources: [
        {
          source_type: 'input_select', entity: 'input_select.mode_maison', label: 'Mode',
          modes: [
            { id: 'jour', label: 'Jour', icon: 'mdi:weather-sunny', color: 'warning' },
            { id: 'soiree', label: 'Soirée', icon: 'mdi:lamp', color: 'accent' },
            { id: 'cinema', label: 'Cinéma', icon: 'mdi:filmstrip', color: 'info' },
            { id: 'nuit', label: 'Nuit', icon: 'mdi:weather-night', color: 'success' },
          ],
        },
        {
          source_type: 'scenes', entity: '', label: 'Scènes',
          modes: [
            { id: 'scene.lecture', label: 'Lecture', icon: 'mdi:book-open-page-variant', color: 'info' },
            { id: 'scene.detente', label: 'Détente', icon: 'mdi:sofa-outline', color: 'accent' },
            { id: 'scene.repas', label: 'Repas', icon: 'mdi:silverware-fork-knife', color: 'warning' },
          ],
        },
        {
          source_type: 'booleans', entity: '', label: 'Toggles',
          modes: [
            { id: 'input_boolean.presence_simulee', label: 'Présence simulée', icon: 'mdi:home-account', color: 'success' },
            { id: 'input_boolean.vacances', label: 'Vacances', icon: 'mdi:beach', color: 'warning' },
          ],
        },
      ],
      period_entity: 'input_select.periode_journee',
      period_options: [
        { id: 'Matin', label: 'Matin', icon: 'mdi:weather-sunset-up', color: '#f0a050' },
        { id: 'Après-midi', label: 'Après-midi', icon: 'mdi:white-balance-sunny', color: '#7db8e0' },
        { id: 'Soir', label: 'Soir', icon: 'mdi:weather-sunset-down', color: '#e08040' },
        { id: 'Nuit', label: 'Nuit', icon: 'mdi:weather-night', color: '#8b8ff0' },
      ],
    },
    cover_card: { show_header: true, dashboard_entities: [], dashboard_compact: false, presets: [0, 25, 50, 75, 100], entity_presets: {} },
    fan_card: { show_header: true },
    spotify_card: { show_header: true, entity_id: 'media_player.spotify', sort_order: 'recent_first', max_items_per_section: 6, visible_speakers: [] },
    media_card: { show_header: true, extra_entities: {}, hidden_entities: [] },
    presence_card: {
      show_header: true,
      person_entities: ['person.roland', 'person.marie'],
      smartphone_sensors: { 'person.roland': 'sensor.roland_phone_battery', 'person.marie': 'sensor.marie_phone_battery' },
      notify_services: { 'person.roland': 'mobile_app_roland_phone', 'person.marie': 'mobile_app_marie_phone' },
      driving_sensors: { 'person.marie': 'binary_sensor.marie_driving' },
    },
    climate_card: { show_header: true, display_mode: 'list', dashboard_display_mode: 'list', dashboard_entities: [], hidden_entities: [] },
    camera_carousel: { show_header: true, entity_order: [], hidden_entities: [], auto_cycle: false, cycle_interval: 10 },
    vacuum_card: { show_header: true, entity: '', entity_overrides: {}, room_buttons_hidden: [], room_buttons_order: [], room_buttons_extra: [] },
    schedules: {},
    wizard_completed: true,
  };
}

// ───────────────────────── Spotify mock data ─────────────────────────

const SPOTIFY_PLAYLISTS = [
  { id: 'pl1', name: 'Lofi Beats', type: 'playlist', uri: 'spotify:playlist:lofi', images: [{ url: 'https://picsum.photos/seed/lofi/300/300', width: 300 }], owner: { display_name: 'Spotify' }, tracks: { total: 124 } },
  { id: 'pl2', name: 'Discover Weekly', type: 'playlist', uri: 'spotify:playlist:dw', images: [{ url: 'https://picsum.photos/seed/dw/300/300', width: 300 }], owner: { display_name: 'Spotify' }, tracks: { total: 30 } },
  { id: 'pl3', name: 'Coding Focus', type: 'playlist', uri: 'spotify:playlist:focus', images: [{ url: 'https://picsum.photos/seed/focus/300/300', width: 300 }], owner: { display_name: 'Roland' }, tracks: { total: 56 } },
  { id: 'pl4', name: 'Jazz Classics', type: 'playlist', uri: 'spotify:playlist:jazz', images: [{ url: 'https://picsum.photos/seed/jazz/300/300', width: 300 }], owner: { display_name: 'Roland' }, tracks: { total: 89 } },
];

// ───────────────────────── Service handler ─────────────────────────

function handleService(states: Record<string, HassEntity>, domain: string, service: string, data: Record<string, unknown> | undefined, target: { entity_id?: string | string[] } | undefined): void {
  // Real HA accepts entity_id both as target AND inside service data (legacy
  // style, used by glass-action-button) — honor both like core does.
  const dataIds = ([] as string[]).concat((data?.entity_id as string | string[] | undefined) ?? []);
  const ids = [...new Set(([] as string[]).concat(target?.entity_id ?? []).concat(dataIds))];
  for (const id of ids) {
    const cur = states[id];
    if (!cur) continue;
    const attrs = { ...cur.attributes };
    let next = cur.state;

    // homeassistant.* universal services act on any entity (real HA semantics)
    if (domain === 'homeassistant') {
      switch (service) {
        case 'turn_on': next = cur.state === 'closed' ? 'open' : 'on'; break;
        case 'turn_off': next = cur.state === 'open' ? 'closed' : 'off'; break;
        case 'toggle':
          next = cur.state === 'on' ? 'off'
            : cur.state === 'off' ? 'on'
            : cur.state === 'open' ? 'closed'
            : cur.state === 'closed' ? 'open'
            : cur.state;
          break;
      }
    } else if (domain === 'light') {
      switch (service) {
        case 'turn_on':
          next = 'on';
          if (data?.brightness !== undefined) attrs.brightness = data.brightness;
          if (data?.brightness_pct !== undefined) attrs.brightness = Math.round(((data.brightness_pct as number) / 100) * 255);
          if (data?.color_temp_kelvin !== undefined) { attrs.color_temp_kelvin = data.color_temp_kelvin; attrs.color_mode = 'color_temp'; }
          if (data?.rgb_color !== undefined) { attrs.rgb_color = data.rgb_color; attrs.color_mode = 'rgb'; }
          if (data?.hs_color !== undefined) { attrs.hs_color = data.hs_color; attrs.color_mode = 'hs'; }
          if (data?.effect !== undefined) attrs.effect = data.effect;
          break;
        case 'turn_off': next = 'off'; break;
        case 'toggle': next = cur.state === 'on' ? 'off' : 'on'; break;
      }
    } else if (domain === 'climate') {
      switch (service) {
        case 'turn_on': next = (attrs.hvac_modes as string[])?.find((m) => m !== 'off') ?? 'heat'; break;
        case 'turn_off': next = 'off'; attrs.hvac_action = 'off'; break;
        case 'set_hvac_mode': next = data?.hvac_mode as string ?? next; break;
        case 'set_temperature':
          if (data?.temperature !== undefined) attrs.temperature = data.temperature;
          if (data?.target_temp_low !== undefined) attrs.target_temp_low = data.target_temp_low;
          if (data?.target_temp_high !== undefined) attrs.target_temp_high = data.target_temp_high;
          break;
        case 'set_preset_mode': attrs.preset_mode = data?.preset_mode; break;
        case 'set_fan_mode': attrs.fan_mode = data?.fan_mode; break;
        case 'set_humidity': attrs.humidity = data?.humidity; break;
      }
    } else if (domain === 'cover') {
      switch (service) {
        case 'open_cover': next = 'open'; attrs.current_position = 100; break;
        case 'close_cover': next = 'closed'; attrs.current_position = 0; break;
        case 'stop_cover': next = (attrs.current_position as number) > 0 ? 'open' : 'closed'; break;
        case 'set_cover_position': {
          const pos = data?.position as number ?? 0;
          attrs.current_position = pos;
          next = pos === 0 ? 'closed' : 'open';
          break;
        }
        case 'set_cover_tilt_position': attrs.current_tilt_position = data?.tilt_position ?? 0; break;
        case 'toggle': next = cur.state === 'open' ? 'closed' : 'open'; attrs.current_position = next === 'open' ? 100 : 0; break;
      }
    } else if (domain === 'fan') {
      switch (service) {
        case 'turn_on': next = 'on'; if (data?.percentage !== undefined) attrs.percentage = data.percentage; break;
        case 'turn_off': next = 'off'; attrs.percentage = 0; break;
        case 'toggle': next = cur.state === 'on' ? 'off' : 'on'; break;
        case 'set_percentage': attrs.percentage = data?.percentage ?? 0; next = (attrs.percentage as number) > 0 ? 'on' : 'off'; break;
        case 'oscillate': attrs.oscillating = data?.oscillating; break;
        case 'set_direction': attrs.direction = data?.direction; break;
        case 'set_preset_mode': attrs.preset_mode = data?.preset_mode; next = 'on'; break;
      }
    } else if (domain === 'media_player') {
      switch (service) {
        case 'media_play': next = 'playing'; break;
        case 'media_pause': next = 'paused'; break;
        case 'media_play_pause': next = cur.state === 'playing' ? 'paused' : 'playing'; break;
        case 'media_stop': next = 'idle'; break;
        case 'turn_on': next = 'idle'; break;
        case 'turn_off': next = 'off'; break;
        case 'volume_set': attrs.volume_level = data?.volume_level ?? 0; break;
        case 'volume_mute': attrs.is_volume_muted = data?.is_volume_muted ?? false; break;
        case 'select_source': attrs.source = data?.source; break;
      }
    } else if (domain === 'switch') {
      switch (service) {
        case 'turn_on': next = 'on'; break;
        case 'turn_off': next = 'off'; break;
        case 'toggle': next = cur.state === 'on' ? 'off' : 'on'; break;
      }
    } else if (domain === 'input_boolean') {
      switch (service) {
        case 'turn_on': next = 'on'; break;
        case 'turn_off': next = 'off'; break;
        case 'toggle': next = cur.state === 'on' ? 'off' : 'on'; break;
      }
    } else if (domain === 'vacuum') {
      switch (service) {
        case 'start': next = 'cleaning'; break;
        case 'pause': next = 'paused'; break;
        case 'stop': next = 'idle'; break;
        case 'return_to_base': next = 'returning'; break;
      }
    } else if (domain === 'input_select') {
      if (service === 'select_option' && data?.option) next = data.option as string;
    } else if (domain === 'scene' && service === 'turn_on') {
      // Scenes don't change state, but trigger a transient highlight in title-card
    }

    states[id] = { ...cur, state: next, attributes: attrs, last_changed: new Date().toISOString(), last_updated: new Date().toISOString() };
  }
}

// ───────────────────────── Mock connection ─────────────────────────

const SET_CONFIG_RE = /^glass_cards\/set_([a-z_]+)_config$/;

function makeBackendConnection(store: BackendStore, onChange: () => void): HassConnection {
  function handle(type: string, data: Record<string, unknown>): unknown {
    if (type === 'glass_cards/get_config') {
      return {
        navbar: store.navbar,
        rooms: store.rooms,
        weather: store.weather,
        light_card: store.light_card,
        title_card: store.title_card,
        cover_card: store.cover_card,
        fan_card: store.fan_card,
        spotify_card: store.spotify_card,
        media_card: store.media_card,
        presence_card: store.presence_card,
        climate_card: store.climate_card,
        camera_carousel: store.camera_carousel,
        vacuum_card: store.vacuum_card,
        dashboard: store.dashboard,
        wizard_completed: store.wizard_completed,
      };
    }
    if (type === 'glass_cards/get_room') {
      const id = data.area_id as string;
      return store.rooms[id] ?? { hidden_entities: [], entity_order: [], entity_layouts: {} };
    }
    if (type === 'glass_cards/set_room') {
      const id = data.area_id as string;
      store.rooms[id] = { ...(store.rooms[id] ?? {}), ...data };
      onChange();
      return { ok: true };
    }
    if (type === 'glass_cards/set_navbar') {
      store.navbar = { ...store.navbar, ...data };
      onChange();
      return { ok: true };
    }
    if (type === 'glass_cards/set_dashboard') {
      store.dashboard = { ...store.dashboard, ...data } as BackendStore['dashboard'];
      onChange();
      return { ok: true };
    }
    if (type === 'glass_cards/set_vacuum_card') {
      store.vacuum_card = { ...(store.vacuum_card as object), ...data };
      onChange();
      return { ok: true };
    }
    if (type === 'glass_cards/get_schedules') return store.schedules;
    if (type === 'glass_cards/set_schedule') {
      store.schedules[data.entity_id as string] = data;
      onChange();
      return { ok: true };
    }
    // Spotify
    if (type === 'glass_cards/spotify_status') return { configured: true };
    if (type === 'glass_cards/spotify_browse') {
      const category = data.category as string;
      const limit = (data.limit as number) ?? 6;
      const offset = (data.offset as number) ?? 0;
      switch (category) {
        case 'playlists': return { items: SPOTIFY_PLAYLISTS.slice(offset, offset + limit), total: SPOTIFY_PLAYLISTS.length };
        case 'recently_played': return { items: [], total: 0 };
        case 'saved_tracks': return { items: [], total: 0 };
        case 'saved_shows': return { items: [], total: 0 };
      }
      return { items: [], total: 0 };
    }
    if (type === 'glass_cards/spotify_search') {
      return { tracks: { items: [], total: 0 }, playlists: { items: [], total: 0 }, albums: { items: [], total: 0 }, shows: { items: [], total: 0 } };
    }
    if (type === 'glass_cards/spotify_check_saved') {
      const ids = (data.track_ids as string[]) ?? [];
      return Object.fromEntries(ids.map((id) => [id, false]));
    }
    if (type === 'glass_cards/spotify_add_to_queue' || type === 'glass_cards/spotify_save_tracks' || type === 'glass_cards/spotify_remove_tracks') {
      return { ok: true };
    }

    const m = type.match(SET_CONFIG_RE);
    if (m) {
      const card = m[1] as keyof BackendStore;
      if (store[card] && typeof store[card] === 'object') {
        (store as unknown as Record<string, unknown>)[card] = { ...(store[card] as object), ...data };
        onChange();
        return { ok: true };
      }
    }

    console.debug('[mock-backend] unhandled', type, data);
    return null;
  }

  return {
    async sendMessagePromise<T>(msg: Record<string, unknown>): Promise<T> {
      return handle(msg.type as string, msg) as T;
    },
    async subscribeMessage<T>(callback: (msg: T) => void, msg: Record<string, unknown>) {
      // Weather forecast subscription
      if (msg.type === 'weather/subscribe_forecast') {
        const type = msg.forecast_type;
        const isoOffset = (h: number) => { const d = new Date(); d.setHours(d.getHours() + h, 0, 0, 0); return d.toISOString(); };
        const isoDay = (days: number) => { const d = new Date(); d.setDate(d.getDate() + days); d.setHours(12, 0, 0, 0); return d.toISOString(); };
        const hourly = Array.from({ length: 10 }, (_, i) => ({ datetime: isoOffset(i + 1), condition: i % 2 === 0 ? 'partlycloudy' : 'cloudy', temperature: 18 + Math.sin(i / 3) * 2, precipitation_probability: 10 }));
        const daily = Array.from({ length: 7 }, (_, i) => ({ datetime: isoDay(i + 1), condition: 'partlycloudy', temperature: 19 + i % 3, templow: 11, precipitation_probability: 15 + (i * 5) % 30 }));
        setTimeout(() => callback({ forecast: type === 'daily' ? daily : hourly } as unknown as T), 50);
      }
      return () => {};
    },
    async subscribeEvents() { return () => {}; },
  };
}

// ───────────────────────── Factory ─────────────────────────

export function makeFullHouseHass(onMutate: (h: HomeAssistant) => void): HomeAssistant {
  const areas = Object.fromEntries(AREAS.map((a) => [a.area_id, a]));
  const states: Record<string, HassEntity> = {};
  const entitiesReg: Record<string, EntityRegistryEntry> = {};
  const devices: Record<string, DeviceRegistryEntry> = {};

  for (const e of ENTITIES) {
    states[e.state.entity_id] = e.state;
    entitiesReg[e.state.entity_id] = {
      entity_id: e.state.entity_id,
      area_id: e.area || null,
      device_id: e.device_id ?? null,
      platform: 'mock',
      disabled_by: null,
      hidden_by: null,
      icon: null,
    };
    if (e.device_id && !devices[e.device_id]) {
      devices[e.device_id] = { id: e.device_id, area_id: e.area || null, name: e.device_id };
    }
  }

  const store = defaultStore();
  const ctx: { hass: HomeAssistant } = { hass: null as unknown as HomeAssistant };

  const connection = makeBackendConnection(store, () => onMutate(ctx.hass));

  const hass: HomeAssistant = {
    states,
    callApi: async () => [] as never,
    callService: async (domain, service, data, target) => {
      const next = { ...ctx.hass.states };
      handleService(next, domain, service, data, target);
      const nextHass: HomeAssistant = { ...ctx.hass, states: next };
      ctx.hass = nextHass;
      onMutate(nextHass);
    },
    connection,
    localize: (key: string) => key,
    language: 'fr',
    user: { name: 'Roland', is_admin: true, is_owner: true },
    themes: { darkMode: true },
    areas,
    devices,
    entities: entitiesReg,
    services: {
      light: { turn_on: {}, turn_off: {}, toggle: {} },
      switch: { turn_on: {}, turn_off: {}, toggle: {} },
      vacuum: { start: {}, pause: {}, stop: {}, return_to_base: {}, locate: {}, clean_area: {}, clean_zone: {} },
      cover: { open_cover: {}, close_cover: {}, stop_cover: {}, toggle: {}, set_cover_position: {} },
      climate: { turn_on: {}, turn_off: {}, set_temperature: {}, set_hvac_mode: {} },
      fan: { turn_on: {}, turn_off: {}, toggle: {}, set_percentage: {} },
      media_player: { media_play_pause: {}, media_play: {}, media_pause: {}, volume_set: {} },
      scene: { turn_on: {} },
      script: { turn_on: {}, turn_off: {}, toggle: {} },
      automation: { trigger: {}, turn_on: {}, turn_off: {} },
      input_boolean: { turn_on: {}, turn_off: {}, toggle: {} },
      button: { press: {} },
      homeassistant: { turn_on: {}, turn_off: {}, toggle: {} },
    },
    ...({ config: { unit_system: { temperature: '°C' } } } as object),
  };

  ctx.hass = hass;
  return hass;
}
