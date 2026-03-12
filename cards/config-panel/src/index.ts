import { LitElement, html, nothing, type PropertyValues, type TemplateResult } from 'lit';
import { configPanelStyles } from './styles';
import { property, state } from 'lit/decorators.js';
import { bus } from '@glass-cards/event-bus';
import { glassTokens, glassMixin, bounceMixin } from '@glass-cards/ui-core';
import { t, setLanguage, getLanguage } from '@glass-cards/i18n';
import {
  BackendService,
  getAreaEntities,
  type EntityScheduleMap,
  type HomeAssistant,
} from '@glass-cards/base-card';
import {
  type RoomEntry, type CardEntry, type SceneEntry, type LightEntry, type SchedulePeriodEdit,
  type TabId,
  DEFAULT_TEMP_HIGH, DEFAULT_TEMP_LOW, DEFAULT_HUMIDITY_THRESHOLD,
  DEFAULT_CARD_ORDER, IMPLEMENTED_CARDS, CARD_ICONS,
  getCardMeta,
} from './types';
import { renderCoverPreview, renderCoverTab, selectCoverRoom, toggleCoverEntityVisibility, cycleCoverLayout, getAllCoverEntities, toggleCoverDashboardEntity, initCoverDashboardOrder, onDropDashboardCover, onDropCover, addCoverPreset, removeCoverPreset, addCoverEntityPreset, removeCoverEntityPreset, resetCoverEntityPresets } from './tabs/cover';
import { renderDashboardPreview, renderDashboardTab, renderDashboardCardSub, toggleDashboardCard, toggleDashboardExpand, onDropDashboardCard } from './tabs/dashboard';
import { renderLightPreview, renderLightTab, renderLightRow, selectLightRoom, toggleLightVisible, cycleLightLayout, toggleScheduleExpand, addSchedulePeriod, removeSchedulePeriod, updateSchedulePeriod, toggleScheduleRecurring, renderScheduleContent, formatDateTimeShort, formatPeriodDisplay, parseDateTimeValue, openRangePicker, closePicker, pickerPrevMonth, pickerNextMonth, pickerSelectDay, pickerSetTime, pickerConfirm, toAbsDay, getMonthDays, getMonthLabel, getDayLabels, renderDateTimePicker } from './tabs/light';
import { renderMediaPreview, renderMediaTab, selectMediaRoom, addMediaExtraEntity, removeMediaExtraEntity } from './tabs/media';
import { renderFanPreview, renderFanTab, selectFanRoom, toggleFanEntityVisibility, cycleFanLayout, onDropFan } from './tabs/fan';
import { renderNavbarPreview, renderNavbarTab, renderRoomRow, toggleRoomVisible, openIconPicker, setRoomIcon, selectRoom, goBack } from './tabs/navbar';
import { renderPopupPreview, renderPopupTab, renderCardRow, renderSceneRow, toggleCardVisible, toggleSceneVisible } from './tabs/popup';
import { renderPresencePreview, renderPresenceTab, getAvailablePersonEntities, getAvailableSmartphoneSensors, getAvailableDrivingSensors, getAvailableNotifyServices, togglePresencePerson } from './tabs/presence';
import { renderSpotifyPreview, renderSpotifyTab, renderSpotifySetupGuide, selectSpotifyEntity, toggleSpotifySpeaker, onDropSpeaker } from './tabs/spotify';
import { renderTitlePreview, renderTitleTab, renderIconPopup, renderColorPicker, addTitleSource, removeTitleSource, setTitleSourceEntity, setTitleSourceLabel, addTitleModeEntity, removeTitleModeEntity, moveTitleMode, updateTitleMode, getFilteredIcons, openColorPicker, closeColorPicker, applyColorPicker, onCpWheel } from './tabs/title';
import { renderWeatherPreview, renderWeatherTab, toggleWeatherMetric, selectWeatherEntity, windBearingToDir } from './tabs/weather';


// — Component —

export class GlassConfigPanel extends LitElement {
  @property({ attribute: false }) hass?: HomeAssistant;
  @property({ type: Boolean }) narrow = false;
  _mounted = false;

  @state() _lang = getLanguage();
  @state() _tab: TabId = 'dashboard';
  @state() _tabSelectOpen = false;
  @state() _tabSearch = '';
  @state() _rooms: RoomEntry[] = [];
  @state() _emptyRooms: { areaId: string; name: string; icon: string }[] = [];
  @state() _selectedRoom = '';
  @state() _cards: CardEntry[] = [];
  @state() _scenes: SceneEntry[] = [];
  @state() _lights: LightEntry[] = [];
  @state() _lightRoom = '';
  @state() _lightDropdownOpen = false;
  @state() _iconPickerRoom: string | null = null;
  @state() _dropdownOpen = false;
  @state() _toast = false;
  @state() _saving = false;

  // Feature toggles
  @state() _showLights = true;
  @state() _showTemperature = true;
  @state() _showHumidity = true;
  @state() _showMedia = true;
  @state() _autoSort = true;
  @state() _tempHigh = DEFAULT_TEMP_HIGH;
  @state() _tempLow = DEFAULT_TEMP_LOW;
  @state() _humidityThreshold = DEFAULT_HUMIDITY_THRESHOLD;

  // Weather config
  @state() _weatherEntity = '';
  @state() _weatherHiddenMetrics: string[] = [];
  @state() _weatherShowDaily = true;
  @state() _weatherShowHourly = true;
  @state() _weatherShowHeader = true;
  @state() _weatherDropdownOpen = false;

  // Title card config (multi-source)
  @state() _titleText = '';
  @state() _titleSources: { source_type: 'input_select' | 'scenes' | 'booleans'; entity: string; label: string; modes: { id: string; label: string; icon: string; color: string }[] }[] = [];
  @state() _titleEditingSourceIdx: number | null = null;
  @state() _titleAddSourceDropdownOpen = false;
  @state() _titleAddEntityDropdownOpen = false;
  _titleAddEntitySearch = '';
  // Backward compat aliases for icon/color picker that use flat mode index
  get _titleModes(): { id: string; label: string; icon: string; color: string }[] {
    return this._titleSources.flatMap((s) => s.modes);
  }
  @state() _iconPopupModeIdx: number | null = null;
  @state() _iconSearch = '';
  _iconList: string[] = [];

  // Title color picker
  @state() _colorPickerModeIdx: number | null = null;
  @state() _colorPickerHex: string = '#ffffff';
  @state() _colorPickerPos: { x: number; y: number } = { x: 50, y: 50 };
  _cpCanvas: HTMLCanvasElement | null = null;
  _cancelColorDrag: (() => void) | undefined;

  // Light card config
  @state() _lightShowHeader = true;

  // Cover card config
  @state() _coverShowHeader = true;
  @state() _coverDashboardEntities: string[] = [];
  @state() _coverDashboardOrder: string[] = [];
  @state() _coverPresets: number[] = [0, 25, 50, 75, 100];
  @state() _coverEntityPresets: Record<string, number[]> = {};
  @state() _coverRoom = '';
  @state() _coverRoomDropdownOpen = false;
  @state() _coverRoomEntities: { entityId: string; name: string; visible: boolean; deviceClass: string; layout: 'full' | 'compact' }[] = [];
  @state() _coverPresetInput = '';
  @state() _coverEntityPresetInput: Record<string, string> = {};
  @state() _coverPresetsExpandedEntity: string | null = null;

  // Fan card config
  @state() _fanShowHeader = true;
  @state() _fanRoom = '';
  @state() _fanRoomDropdownOpen = false;
  @state() _fanRoomEntities: { entityId: string; name: string; visible: boolean; layout: 'full' | 'compact' }[] = [];

  // Media card config
  @state() _presenceShowHeader = true;
  @state() _presencePersonEntities: string[] = [];
  @state() _presenceSmartphoneSensors: Record<string, string> = {};
  @state() _presenceNotifyServices: Record<string, string> = {};
  @state() _presenceDrivingSensors: Record<string, string> = {};
  @state() _presenceDropdownOpen: string | null = null;
  @state() _presenceDropdownSearch = '';

  @state() _mediaShowHeader = true;
  @state() _mediaExtraEntities: Record<string, string[]> = {};
  @state() _mediaRoom = '';
  @state() _mediaRoomDropdownOpen = false;
  @state() _mediaRoomNativePlayers: string[] = [];
  @state() _mediaAddDropdownOpen = false;
  @state() _mediaEntitySearch = '';

  // Spotify config
  @state() _spotifyShowHeader = true;
  @state() _spotifyEntity = '';
  @state() _spotifySortOrder: 'recent_first' | 'oldest_first' = 'recent_first';
  @state() _spotifyDropdownOpen = false;
  @state() _spotifyMaxItems = 6;
  @state() _spotifyVisibleSpeakers: string[] = [];
  @state() _spotifyConfigured: boolean | null = null; // null = checking

  // Dashboard config
  @state() _dashboardEnabledCards: string[] = ['weather'];
  @state() _dashboardCardOrder: string[] = ['title', 'weather', 'light', 'media', 'fan', 'cover', 'spotify', 'presence'];
  @state() _dashboardHideHeader = false;
  @state() _dashboardHideSidebar = false;
  @state() _dashboardExpanded = new Set<string>();

  // Schedule config
  @state() _scheduleExpandedEntity: string | null = null;
  _scheduleEdits = new Map<string, SchedulePeriodEdit[]>();
  _schedulesLoaded: EntityScheduleMap = {};

  // DateTime range picker popup
  @state() _pickerOpen = false;
  _pickerTarget: { entityId: string; periodIdx: number } | null = null;
  @state() _pickerYear = new Date().getFullYear();
  @state() _pickerMonth = new Date().getMonth();
  @state() _pickerStartDay: number | null = null;
  @state() _pickerStartMonth = 0;
  @state() _pickerStartYear = new Date().getFullYear();
  @state() _pickerEndDay: number | null = null;
  @state() _pickerEndMonth = 0;
  @state() _pickerEndYear = new Date().getFullYear();
  @state() _pickerStartHour = '00';
  @state() _pickerStartMinute = '00';
  @state() _pickerEndHour = '23';
  @state() _pickerEndMinute = '59';
  @state() _pickerPhase: 'start' | 'end' = 'start';

  // Drag state
  @state() _dragIdx: number | null = null;
  @state() _dropIdx: number | null = null;
  @state() _dragContext: 'rooms' | 'cards' | 'scenes' | 'lights' | 'covers' | 'fans' | 'dashboard_covers' | 'dashboard_cards' | 'speakers' | 'title_sources' | 'title_modes' = 'rooms';
  @state() _dragModeSrcIdx: number | null = null;

  _backend?: BackendService;
  _loaded = false;
  _loading = false;
  _configReady = false;
  _suppressAutoSave = false;
  _autoSaveTimer?: ReturnType<typeof setTimeout>;
  _toastTimeout?: ReturnType<typeof setTimeout>;
  @state() _toastError = false;
  _boundCloseDropdowns = this._closeDropdownsOnOutsideClick.bind(this);
  _initialIcons = new Map<string, string | null>();

  /** Config properties that trigger auto-save when changed by user interaction. */
  private static _AUTO_SAVE_KEYS = new Set([
    '_rooms', '_cards', '_scenes',
    '_showLights', '_showTemperature', '_showHumidity', '_showMedia',
    '_autoSort', '_tempHigh', '_tempLow', '_humidityThreshold',
    '_weatherEntity', '_weatherHiddenMetrics', '_weatherShowDaily', '_weatherShowHourly', '_weatherShowHeader',
    '_titleText', '_titleSources',
    '_lightShowHeader', '_lights',
    '_coverShowHeader', '_coverDashboardEntities', '_coverDashboardOrder', '_coverPresets', '_coverEntityPresets', '_coverRoomEntities',
    '_fanShowHeader', '_fanRoomEntities',
    '_presenceShowHeader', '_presencePersonEntities', '_presenceSmartphoneSensors', '_presenceNotifyServices', '_presenceDrivingSensors',
    '_mediaShowHeader', '_mediaExtraEntities',
    '_spotifyShowHeader', '_spotifyEntity', '_spotifySortOrder', '_spotifyMaxItems', '_spotifyVisibleSpeakers',
    '_dashboardEnabledCards', '_dashboardCardOrder', '_dashboardHideHeader', '_dashboardHideSidebar',
  ]);

  static styles = [
    glassTokens,
    glassMixin,
    bounceMixin,
    configPanelStyles,
  ];

  protected shouldUpdate(changedProps: PropertyValues): boolean {
    if (!changedProps.has('hass')) return true;
    if (changedProps.size > 1) return true;
    const oldHass = changedProps.get('hass') as HomeAssistant | undefined;
    // Detect language change (pure check, no side effects)
    if (oldHass && oldHass.language !== this.hass?.language) return true;
    return !this._loaded;
  }

  connectedCallback() {
    super.connectedCallback();
    this._mounted = true;
    document.addEventListener('click', this._boundCloseDropdowns);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._mounted = false;
    document.removeEventListener('click', this._boundCloseDropdowns);
    if (this._toastTimeout !== undefined) {
      clearTimeout(this._toastTimeout);
      this._toastTimeout = undefined;
    }
    if (this._autoSaveTimer !== undefined) {
      clearTimeout(this._autoSaveTimer);
      this._autoSaveTimer = undefined;
    }
    this._cancelColorDrag?.();
    this._cancelColorDrag = undefined;
    this._backend = undefined;
  }

  _closeDropdownsOnOutsideClick(e: MouseEvent) {
    if (!this._dropdownOpen && !this._lightDropdownOpen && !this._weatherDropdownOpen && !this._titleAddSourceDropdownOpen && !this._titleAddEntityDropdownOpen && !this._coverRoomDropdownOpen && !this._fanRoomDropdownOpen && !this._spotifyDropdownOpen && !this._presenceDropdownOpen && !this._tabSelectOpen) return;
    const path = e.composedPath();
    const root = this.shadowRoot;
    if (!root) return;
    const dropdowns = root.querySelectorAll('.dropdown, .tab-select-wrap');
    for (const dd of dropdowns) {
      if (path.includes(dd)) return;
    }
    this._dropdownOpen = false;
    this._lightDropdownOpen = false;
    this._weatherDropdownOpen = false;
    this._titleAddSourceDropdownOpen = false;
    this._titleAddEntityDropdownOpen = false;
    this._coverRoomDropdownOpen = false;
    this._fanRoomDropdownOpen = false;
    this._mediaRoomDropdownOpen = false;
    this._spotifyDropdownOpen = false;
    this._presenceDropdownOpen = null;
    this._tabSelectOpen = false;
    this._tabSearch = '';
  }


  updated(changedProps: PropertyValues) {
    super.updated(changedProps);
    if (changedProps.has('hass')) {
      if (this.hass?.language && setLanguage(this.hass.language)) {
        this._lang = getLanguage();
      }
      // Invalidate backend on WS reconnect
      if (this.hass && this._backend && this._backend.connection !== this.hass.connection) {
        this._backend = undefined;
        this._loaded = false;
        this._loading = false;
        this._configReady = false;
      }
      if (this.hass && !this._loaded && !this._loading) {
        this._backend = new BackendService(this.hass);
        this._loadConfig();
      }
    }
    // Auto-save: skip initial load and programmatic loads, debounce on user changes
    if (!this._loaded || this._loading || this._saving) return;
    if (!this._configReady) {
      this._configReady = true;
      return;
    }
    if (this._suppressAutoSave) {
      this._suppressAutoSave = false;
      return;
    }
    for (const key of changedProps.keys()) {
      if (GlassConfigPanel._AUTO_SAVE_KEYS.has(key as string)) {
        this._scheduleAutoSave();
        break;
      }
    }
  }

  /** Suppress auto-save for the next updated() cycle (use before programmatic state changes). */
  _beginSuppressAutoSave() { this._suppressAutoSave = true; }

  private _scheduleAutoSave() {
    if (this._autoSaveTimer !== undefined) clearTimeout(this._autoSaveTimer);
    this._autoSaveTimer = setTimeout(() => {
      this._autoSaveTimer = undefined;
      if (!this._saving) this._save();
    }, 800);
  }

  private async _loadConfig() {
    if (!this.hass || this._loading) return;
    this._loading = true;
    try {
      await this._loadConfigInner();
      this._loaded = true;
    } catch {
      this._loaded = false;
    } finally {
      this._loading = false;
    }
  }

  private async _loadConfigInner() {
    if (!this.hass) return;

    // Build rooms from HA areas
    const areas = Object.values(this.hass.areas).sort((a, b) =>
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
      card_order: ['title', 'weather', 'light', 'media', 'fan', 'cover', 'spotify', 'presence'] as string[],
      hide_header: false,
      hide_sidebar: false,
    };
    let lightCardConfig = {
      show_header: true,
    };
    let titleCardConfig = {
      title: '',
      sources: [] as { source_type: string; entity: string; label: string; modes: { id: string; label: string; icon: string; color: string }[] }[],
    };
    let coverCardConfig = {
      show_header: true,
      dashboard_entities: [] as string[],
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
    const roomConfigs: Record<string, { icon?: string | null }> = {};
    try {
      if (!this._backend) throw new Error('No backend');
      const result = await this._backend.send<{
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
      if (result.dashboard) dashboardConfig = result.dashboard;
    } catch {
      // Backend not available
    }

    this._showLights = navbarConfig.show_lights ?? true;
    this._showTemperature = navbarConfig.show_temperature ?? true;
    this._showHumidity = navbarConfig.show_humidity ?? true;
    this._showMedia = navbarConfig.show_media ?? true;
    this._autoSort = navbarConfig.auto_sort ?? true;
    this._tempHigh = navbarConfig.temp_high ?? DEFAULT_TEMP_HIGH;
    this._tempLow = navbarConfig.temp_low ?? DEFAULT_TEMP_LOW;
    this._humidityThreshold = navbarConfig.humidity_threshold ?? DEFAULT_HUMIDITY_THRESHOLD;

    this._weatherEntity = weatherConfig.entity_id ?? '';
    this._weatherHiddenMetrics = weatherConfig.hidden_metrics ?? [];
    this._weatherShowDaily = weatherConfig.show_daily ?? true;
    this._weatherShowHourly = weatherConfig.show_hourly ?? true;
    this._weatherShowHeader = weatherConfig.show_header ?? true;

    this._lightShowHeader = lightCardConfig.show_header ?? true;

    this._titleText = titleCardConfig.title ?? '';
    this._titleSources = (titleCardConfig.sources ?? []).map((s) => ({
      source_type: (s.source_type || '') as 'input_select' | 'scenes' | 'booleans',
      entity: s.entity || '',
      label: s.label || '',
      modes: (s.modes || []).map((m) => ({ id: m.id || '', label: m.label || '', icon: m.icon || '', color: m.color || 'neutral' })),
    }));

    this._coverShowHeader = coverCardConfig.show_header ?? true;
    this._fanShowHeader = fanCardConfig.show_header ?? true;
    this._coverDashboardEntities = coverCardConfig.dashboard_entities ?? [];
    this._coverPresets = coverCardConfig.presets ?? [0, 25, 50, 75, 100];
    this._coverEntityPresets = coverCardConfig.entity_presets ?? {};
    this._initCoverDashboardOrder();

    this._spotifyShowHeader = spotifyCardConfig.show_header ?? true;
    this._spotifyEntity = spotifyCardConfig.entity_id ?? '';
    this._spotifySortOrder = spotifyCardConfig.sort_order === 'oldest_first' ? 'oldest_first' : 'recent_first';
    this._spotifyMaxItems = spotifyCardConfig.max_items_per_section ?? 6;
    this._spotifyVisibleSpeakers = spotifyCardConfig.visible_speakers ?? [];
    this._checkSpotifyStatus();

    this._mediaShowHeader = mediaCardConfig.show_header ?? true;
    this._mediaExtraEntities = mediaCardConfig.extra_entities ?? {};

    this._presenceShowHeader = presenceCardConfig.show_header ?? true;
    this._presencePersonEntities = presenceCardConfig.person_entities ?? [];
    this._presenceSmartphoneSensors = presenceCardConfig.smartphone_sensors ?? {};
    this._presenceNotifyServices = presenceCardConfig.notify_services ?? {};
    this._presenceDrivingSensors = presenceCardConfig.driving_sensors ?? {};

    this._dashboardEnabledCards = dashboardConfig.enabled_cards ?? ['weather'];
    this._dashboardCardOrder = dashboardConfig.card_order ?? ['title', 'weather', 'light', 'media', 'cover', 'spotify', 'presence'];
    this._dashboardHideHeader = dashboardConfig.hide_header ?? false;
    this._dashboardHideSidebar = dashboardConfig.hide_sidebar ?? false;

    const hiddenSet = new Set(navbarConfig.hidden_rooms);
    const orderMap = new Map<string, number>();
    navbarConfig.room_order.forEach((id, i) => orderMap.set(id, i));

    const hass = this.hass;
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
    this._initialIcons.clear();
    for (const room of rooms) {
      this._initialIcons.set(room.areaId, room.icon);
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

    this._rooms = rooms;
    this._emptyRooms = emptyRooms;
    if (!this._selectedRoom && rooms.length > 0) {
      this._selectedRoom = rooms[0].areaId;
    }
    this._loadRoomCards();
  }

  async _loadRoomCards() {
    if (!this.hass || !this._selectedRoom) {
      this._cards = [];
      this._scenes = [];
      return;
    }

    const targetRoom = this._selectedRoom;
    const entities = getAreaEntities(
      targetRoom,
      this.hass.entities,
      this.hass.devices,
    );

    // Load room config from backend
    let storedOrder: string[] | null = null;
    let hiddenEntities = new Set<string>();
    let hiddenScenes = new Set<string>();
    let sceneOrder: string[] = [];
    try {
      if (!this._backend) throw new Error('No backend');
      const result = await this._backend.send<{
        card_order: string[];
        hidden_entities: string[];
        hidden_scenes: string[];
        scene_order: string[];
        visible?: boolean;
      } | null>('get_room', { area_id: targetRoom });
      if (this._selectedRoom !== targetRoom) return;
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
    const hass = this.hass;
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

    this._scenes = scenes;

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

    this._cards = orderedIds
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

  // — Tab switching —

  _switchTab(tab: TabId) {
    this._tab = tab;
    this._tabSelectOpen = false;
    this._tabSearch = '';
    this._iconPickerRoom = null;
    this._dropdownOpen = false;
    this._lightDropdownOpen = false;
    this._weatherDropdownOpen = false;
    this._titleAddSourceDropdownOpen = false;
    this._titleAddEntityDropdownOpen = false;
    this._coverRoomDropdownOpen = false;
    this._fanRoomDropdownOpen = false;
    this._mediaRoomDropdownOpen = false;
    this._spotifyDropdownOpen = false;
    this._presenceDropdownOpen = null;
    this._iconPopupModeIdx = null;
    this._colorPickerModeIdx = null;
    if (tab === 'light' && !this._lightRoom && this._rooms.length > 0) {
      this._lightRoom = this._rooms[0].areaId;
      this._loadRoomLights();
    }
    if (tab === 'cover' && !this._coverRoom && this._rooms.length > 0) {
      this._coverRoom = this._rooms[0].areaId;
      this._loadRoomCovers();
    }
    if (tab === 'fan' && !this._fanRoom && this._rooms.length > 0) {
      this._fanRoom = this._rooms[0].areaId;
      this._loadRoomFans();
    }
    if (tab === 'media' && !this._mediaRoom && this._rooms.length > 0) {
      this._mediaRoom = this._rooms[0].areaId;
      this._loadRoomMediaPlayers();
    }
    if ((tab === 'cover' || tab === 'dashboard') && this._coverDashboardOrder.length === 0) {
      this._initCoverDashboardOrder();
    }
  }

  // — Drag & Drop —

  _onDragStart(idx: number, context: 'rooms' | 'cards' | 'scenes' | 'lights' | 'covers' | 'fans' | 'dashboard_covers' | 'dashboard_cards' | 'speakers' | 'title_sources' | 'title_modes', srcIdx?: number) {
    this._dragIdx = idx;
    this._dragContext = context;
    if (context === 'title_modes') this._dragModeSrcIdx = srcIdx ?? null;
  }

  _onDragOver(idx: number, e: DragEvent, srcIdx?: number) {
    e.preventDefault();
    if (this._dragIdx === null || this._dragIdx === idx) return;
    // Block cross-source drag for title_modes
    if (this._dragContext === 'title_modes' && srcIdx !== undefined && srcIdx !== this._dragModeSrcIdx) return;
    this._dropIdx = idx;
  }

  _onDragLeave() {
    this._dropIdx = null;
  }

  _onDropGeneric(idx: number, e: DragEvent) {
    e.preventDefault();
    if (this._dragIdx === null || this._dragIdx === idx) {
      this._dragIdx = null;
      this._dropIdx = null;
      return;
    }
    const ctx = this._dragContext;
    if (ctx === 'rooms') {
      const arr = [...this._rooms];
      const [moved] = arr.splice(this._dragIdx, 1);
      arr.splice(idx, 0, moved);
      this._rooms = arr;
    } else if (ctx === 'cards') {
      const arr = [...this._cards];
      const [moved] = arr.splice(this._dragIdx, 1);
      arr.splice(idx, 0, moved);
      this._cards = arr;
    } else if (ctx === 'scenes') {
      const arr = [...this._scenes];
      const [moved] = arr.splice(this._dragIdx, 1);
      arr.splice(idx, 0, moved);
      this._scenes = arr;
    } else if (ctx === 'lights') {
      const arr = [...this._lights];
      const [moved] = arr.splice(this._dragIdx, 1);
      arr.splice(idx, 0, moved);
      this._lights = arr;
    } else if (ctx === 'title_sources') {
      const arr = [...this._titleSources];
      const [moved] = arr.splice(this._dragIdx, 1);
      arr.splice(idx, 0, moved);
      this._titleSources = arr;
      // Update editing index to follow moved source
      if (this._titleEditingSourceIdx === this._dragIdx) {
        this._titleEditingSourceIdx = idx;
      } else if (this._titleEditingSourceIdx !== null) {
        const oldEdit = this._titleEditingSourceIdx;
        const from = this._dragIdx;
        if (from < oldEdit && idx >= oldEdit) this._titleEditingSourceIdx = oldEdit - 1;
        else if (from > oldEdit && idx <= oldEdit) this._titleEditingSourceIdx = oldEdit + 1;
      }
    } else if (ctx === 'title_modes' && this._dragModeSrcIdx !== null) {
      const sources = [...this._titleSources];
      const src = sources[this._dragModeSrcIdx];
      if (src) {
        const modes = [...src.modes];
        const [moved] = modes.splice(this._dragIdx, 1);
        modes.splice(idx, 0, moved);
        sources[this._dragModeSrcIdx] = { ...src, modes };
        this._titleSources = sources;
      }
      this._dragModeSrcIdx = null;
    }
    this._dragIdx = null;
    this._dropIdx = null;
  }

  _onDragEnd() {
    this._dragIdx = null;
    this._dropIdx = null;
    this._dragModeSrcIdx = null;
  }

  // — Room actions —

  _toggleRoomVisible(areaId: string) { toggleRoomVisible(this, areaId); }

  _openIconPicker(areaId: string) { openIconPicker(this, areaId); }

  _setRoomIcon(areaId: string, icon: string) { setRoomIcon(this, areaId, icon); }

  // — Card actions —

  _toggleCardVisible(id: string) { toggleCardVisible(this, id); }

  _toggleSceneVisible(entityId: string) { toggleSceneVisible(this, entityId); }

  // — Room dropdown —

  _selectRoom(areaId: string) { selectRoom(this, areaId); }

  // — Save —

  private async _saveNavbar() {
    const backend = this._backend;
    if (!backend || this._saving) return;
    this._saving = true;
    try {
      await backend.send('set_navbar', {
        room_order: this._rooms.filter((r) => r.visible).map((r) => r.areaId),
        hidden_rooms: this._rooms.filter((r) => !r.visible).map((r) => r.areaId),
        show_lights: this._showLights,
        show_temperature: this._showTemperature,
        show_humidity: this._showHumidity,
        show_media: this._showMedia,
        auto_sort: this._autoSort,
        temp_high: this._tempHigh,
        temp_low: this._tempLow,
        humidity_threshold: this._humidityThreshold,
      });
      // Save only changed room icons in parallel
      const iconSaves = this._rooms
        .filter((room) => room.icon !== this._initialIcons.get(room.areaId))
        .map((room) => {
          const area = this.hass?.areas[room.areaId];
          const haIcon = area?.icon || 'mdi:home';
          const iconToSave = room.icon === haIcon ? null : room.icon;
          return backend.send('set_room', {
            area_id: room.areaId,
            icon: iconToSave,
          });
        });
      if (iconSaves.length > 0) await Promise.all(iconSaves);
      if (!this._mounted) return;
      this._showToast();
      bus.emit('navbar-config-changed', undefined);
    } catch {
      this._showToast(true);
    } finally {
      this._saving = false;
    }
  }

  private async _savePopup() {
    if (!this._backend || this._saving || !this._selectedRoom) return;
    this._saving = true;
    try {
      await this._backend.send('set_room', {
        area_id: this._selectedRoom,
        card_order: this._cards.filter((c) => c.visible).map((c) => c.id),
        hidden_scenes: this._scenes.filter((s) => !s.visible).map((s) => s.entityId),
        scene_order: this._scenes.map((s) => s.entityId),
      });
      if (!this._mounted) return;
      this._showToast();
      bus.emit('room-config-changed', { areaId: this._selectedRoom });
    } catch {
      this._showToast(true);
    } finally {
      this._saving = false;
    }
  }

  _save() {
    if (this._tab === 'navbar') {
      this._saveNavbar();
    } else if (this._tab === 'popup') {
      this._savePopup();
    } else if (this._tab === 'light') {
      this._saveLights();
    } else if (this._tab === 'weather') {
      this._saveWeather();
    } else if (this._tab === 'title') {
      this._saveTitle();
    } else if (this._tab === 'cover') {
      this._saveCover();
    } else if (this._tab === 'fan') {
      this._saveFan();
    } else if (this._tab === 'spotify') {
      this._saveSpotify();
    } else if (this._tab === 'media') {
      this._saveMedia();
    } else if (this._tab === 'presence') {
      this._savePresence();
    } else {
      this._saveDashboard();
    }
  }

  // — Light Card config —

  _selectLightRoom(areaId: string) { this._beginSuppressAutoSave(); selectLightRoom(this, areaId); }

  async _loadRoomLights() {
    this._beginSuppressAutoSave();
    if (!this.hass || !this._lightRoom) {
      this._lights = [];
      return;
    }

    const targetRoom = this._lightRoom;
    const entities = getAreaEntities(targetRoom, this.hass.entities, this.hass.devices);
    const lightEntities = entities.filter((e) => e.entity_id.startsWith('light.'));

    // Load room config from backend
    let hiddenEntities = new Set<string>();
    let entityOrder: string[] = [];
    let entityLayouts: Record<string, string> = {};
    try {
      if (!this._backend) throw new Error('No backend');
      const result = await this._backend.send<{
        hidden_entities: string[];
        entity_order: string[];
        entity_layouts: Record<string, string>;
      } | null>('get_room', { area_id: targetRoom });
      if (this._lightRoom !== targetRoom) return;
      if (result) {
        hiddenEntities = new Set(result.hidden_entities ?? []);
        entityOrder = result.entity_order ?? [];
        entityLayouts = result.entity_layouts ?? {};
      }
    } catch {
      // Backend not available
    }

    // Build ordered list
    const hass = this.hass;
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

    this._lights = lights;

    // Load schedules
    try {
      if (this._backend) {
        const schedules = await this._backend.send<EntityScheduleMap>('get_schedules');
        if (this._lightRoom !== targetRoom) return;
        this._schedulesLoaded = schedules ?? {};
        this._scheduleEdits = new Map();
        for (const l of lights) {
          const sched = this._schedulesLoaded[l.entityId];
          this._scheduleEdits.set(
            l.entityId,
            sched?.periods?.map((p) => ({ start: p.start, end: p.end, recurring: p.recurring ?? false })) ?? [],
          );
        }
      }
    } catch {
      // Backend not available
    }
  }

  _toggleLightVisible(entityId: string) { toggleLightVisible(this, entityId); }

  _cycleLightLayout(entityId: string) { cycleLightLayout(this, entityId); }

  _toggleScheduleExpand(entityId: string) { toggleScheduleExpand(this, entityId); }

  _addSchedulePeriod(entityId: string) { addSchedulePeriod(this, entityId); }

  _removeSchedulePeriod(entityId: string, idx: number) { removeSchedulePeriod(this, entityId, idx); }

  _updateSchedulePeriod(entityId: string, idx: number, field: 'start' | 'end', value: string) { updateSchedulePeriod(this, entityId, idx, field, value); }

  _toggleScheduleRecurring(entityId: string, idx: number) { toggleScheduleRecurring(this, entityId, idx); }

  async _saveSchedule(entityId: string) {
    if (!this._backend) return;
    const periods = this._scheduleEdits.get(entityId) ?? [];
    const validPeriods = periods.filter((p) => p.start && p.end);
    try {
      await this._backend.send('set_schedule', {
        entity_id: entityId,
        periods: validPeriods,
      });
      if (!this._mounted) return;
      this._showToast();
      bus.emit('schedule-changed', { entityId });
    } catch {
      if (!this._mounted) return;
      this._showToast(true);
    }
  }

  // — DateTime range picker —

  _parseDateTimeValue(value: string) { return parseDateTimeValue(this, value); }

  _openRangePicker(entityId: string, periodIdx: number) { openRangePicker(this, entityId, periodIdx); }

  _closePicker() { closePicker(this); }

  _pickerPrevMonth() { pickerPrevMonth(this); }

  _pickerNextMonth() { pickerNextMonth(this); }

  _pickerSelectDay(day: number, isOtherMonth: boolean) { pickerSelectDay(this, day, isOtherMonth); }

  _pickerSetTime(which: 'startHour' | 'startMinute' | 'endHour' | 'endMinute', e: Event) { pickerSetTime(this, which, e); }

  _pickerConfirm() { pickerConfirm(this); }

  _toAbsDay(year: number, month: number, day: number): number { return toAbsDay(this, year, month, day); }

  _getMonthDays() { return getMonthDays(this); }

  _getMonthLabel(): string { return getMonthLabel(this); }

  _getDayLabels(): string[] { return getDayLabels(this); }

  _renderDateTimePicker() { return renderDateTimePicker(this); }

  private async _saveLights() {
    if (!this._backend || this._saving) return;
    this._saving = true;
    try {
      // Save light card global config
      await this._backend.send('set_light_config', {
        show_header: this._lightShowHeader,
      });

      if (!this._lightRoom) {
        if (!this._mounted) return;
        this._showToast();
        bus.emit('light-config-changed', undefined);
        return;
      }
      // Load existing hidden_entities to preserve non-light hidden entries
      let existingHidden: string[] = [];
      try {
        const existing = await this._backend.send<{
          hidden_entities: string[];
        } | null>('get_room', { area_id: this._lightRoom });
        if (existing) existingHidden = existing.hidden_entities ?? [];
      } catch { /* ignore */ }

      const lightEntityIds = new Set(this._lights.map((l) => l.entityId));
      const nonLightHidden = existingHidden.filter((id) => !lightEntityIds.has(id));
      const hiddenLights = this._lights.filter((l) => !l.visible).map((l) => l.entityId);

      const layouts: Record<string, string> = {};
      for (const l of this._lights) {
        if (l.layout === 'full') {
          layouts[l.entityId] = l.layout;
        }
      }
      await this._backend.send('set_room', {
        area_id: this._lightRoom,
        entity_order: this._lights.map((l) => l.entityId),
        hidden_entities: [...nonLightHidden, ...hiddenLights],
        entity_layouts: layouts,
      });
      if (!this._mounted) return;
      this._showToast();
      bus.emit('light-config-changed', undefined);
      bus.emit('room-config-changed', { areaId: this._lightRoom });
    } catch {
      this._showToast(true);
    } finally {
      this._saving = false;
    }
  }

  async _reset() {
    if (this._loading) return;
    this._loaded = false;
    await this._loadConfig();
    if (this._lightRoom) {
      await this._loadRoomLights();
    }
  }

  _showToast(error = false) {
    if (this._toastTimeout !== undefined) clearTimeout(this._toastTimeout);
    this._toastError = error;
    this._toast = true;
    this._toastTimeout = setTimeout(() => {
      this._toast = false;
      this._toastTimeout = undefined;
    }, 2000);
  }

  _goBack() { goBack(this); }

  // — Preview —

  _renderNavbarPreview() { return renderNavbarPreview(this); }

  _renderPopupPreview() { return renderPopupPreview(this); }

  // — Render: Navbar tab —

  _renderNavbarTab() { return renderNavbarTab(this); }

  _renderRoomRow(room: RoomEntry, idx: number) { return renderRoomRow(this, room, idx); }

  // — Render: Popup tab —

  _renderPopupTab() { return renderPopupTab(this); }

  _renderCardRow(card: CardEntry, idx: number) { return renderCardRow(this, card, idx); }

  _renderSceneRow(scene: SceneEntry, idx: number) { return renderSceneRow(this, scene, idx); }

  // — Render: Light tab —

  _renderLightPreview() { return renderLightPreview(this); }

  _renderLightTab() { return renderLightTab(this); }

  _renderLightRow(light: LightEntry, idx: number) { return renderLightRow(this, light, idx); }

  _formatDateTimeShort(value: string): string { return formatDateTimeShort(this, value); }

  _formatPeriodDisplay(p: SchedulePeriodEdit): string { return formatPeriodDisplay(this, p); }

  _renderScheduleContent(entityId: string) { return renderScheduleContent(this, entityId); }

  // — Cover card config —

  _selectCoverRoom(areaId: string) { this._beginSuppressAutoSave(); selectCoverRoom(this, areaId); }

  async _loadRoomCovers() {
    if (!this._backend || !this._coverRoom || !this.hass) return;
    const targetRoom = this._coverRoom;
    const areaEntities = getAreaEntities(targetRoom, this.hass.entities, this.hass.devices);
    const coverIds = areaEntities
      .filter((e) => e.entity_id.startsWith('cover.'))
      .map((e) => e.entity_id);

    // Load room config for hidden_entities / entity_order / entity_layouts
    let roomConfig: { hidden_entities?: string[]; entity_order?: string[]; entity_layouts?: Record<string, string> } | null = null;
    try {
      roomConfig = await this._backend.send<{ hidden_entities?: string[]; entity_order?: string[]; entity_layouts?: Record<string, string> } | null>('get_room', { area_id: targetRoom });
    } catch { /* ignore */ }

    // Discard stale result if room changed during async call
    if (this._coverRoom !== targetRoom) return;

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

    this._coverRoomEntities = sorted.map((id) => {
      const entity = this.hass?.states[id];
      const name = (entity?.attributes?.friendly_name as string) || id.split('.')[1] || id;
      const dc = (entity?.attributes?.device_class as string) || 'shutter';
      return { entityId: id, name, visible: !hiddenSet.has(id), deviceClass: dc, layout: (entityLayouts[id] as 'full' | 'compact') || 'compact' };
    });
  }

  _toggleCoverEntityVisibility(entityId: string) { toggleCoverEntityVisibility(this, entityId); }

  _cycleCoverLayout(entityId: string) { cycleCoverLayout(this, entityId); }

  _getAllCoverEntities() { return getAllCoverEntities(this); }

  _toggleCoverDashboardEntity(entityId: string) { toggleCoverDashboardEntity(this, entityId); }

  _initCoverDashboardOrder() { initCoverDashboardOrder(this); }

  _onDropDashboardCover(idx: number, e: DragEvent) { onDropDashboardCover(this, idx, e); }

  private async _saveCover() {
    if (!this._backend || this._saving) return;
    this._saving = true;
    try {
      // Save global cover config — ordered dashboard entities (selected ones in order)
      const orderedDashboardEntities = this._coverDashboardOrder.filter((id) =>
        this._coverDashboardEntities.includes(id),
      );
      await this._backend.send('set_cover_config', {
        show_header: this._coverShowHeader,
        dashboard_entities: orderedDashboardEntities,
        presets: this._coverPresets,
        entity_presets: this._coverEntityPresets,
      });

      // Save room-level cover config if a room is selected
      if (this._coverRoom && this._coverRoomEntities.length > 0) {
        // Load existing room config to preserve non-cover entries
        let existingHidden: string[] = [];
        let existingOrder: string[] = [];
        let existingLayouts: Record<string, string> = {};
        try {
          const existing = await this._backend.send<{
            hidden_entities: string[];
            entity_order: string[];
            entity_layouts: Record<string, string>;
          } | null>('get_room', { area_id: this._coverRoom });
          if (existing) {
            existingHidden = existing.hidden_entities ?? [];
            existingOrder = existing.entity_order ?? [];
            existingLayouts = existing.entity_layouts ?? {};
          }
        } catch { /* ignore */ }

        const coverEntityIds = new Set(this._coverRoomEntities.map((e) => e.entityId));
        const nonCoverHidden = existingHidden.filter((id) => !coverEntityIds.has(id));
        const hiddenCovers = this._coverRoomEntities.filter((e) => !e.visible).map((e) => e.entityId);
        const nonCoverOrder = existingOrder.filter((id) => !coverEntityIds.has(id));
        const entityOrder = [...nonCoverOrder, ...this._coverRoomEntities.map((e) => e.entityId)];

        // Merge cover layouts with existing non-cover layouts
        const layouts: Record<string, string> = { ...existingLayouts };
        for (const e of this._coverRoomEntities) {
          layouts[e.entityId] = e.layout;
        }

        await this._backend.send('set_room', {
          area_id: this._coverRoom,
          hidden_entities: [...nonCoverHidden, ...hiddenCovers],
          entity_order: entityOrder,
          entity_layouts: layouts,
        });
      }

      if (!this._mounted) return;
      this._showToast();
      bus.emit('cover-config-changed', undefined);
      if (this._coverRoom) bus.emit('room-config-changed', { areaId: this._coverRoom });
    } catch {
      this._showToast(true);
    } finally {
      this._saving = false;
    }
  }

  _renderCoverPreview() { return renderCoverPreview(this); }

  _renderCoverTab() { return renderCoverTab(this); }

  // — Fan Card config —

  _renderFanPreview() { return renderFanPreview(this); }

  _renderFanTab() { return renderFanTab(this); }

  _selectFanRoom(areaId: string) { this._beginSuppressAutoSave(); selectFanRoom(this, areaId); }

  _toggleFanEntityVisibility(entityId: string) { toggleFanEntityVisibility(this, entityId); }

  _cycleFanLayout(entityId: string) { cycleFanLayout(this, entityId); }

  _onDropFan(idx: number, e: DragEvent) { onDropFan(this, idx, e); }

  async _loadRoomFans() {
    if (!this._backend || !this._fanRoom || !this.hass) return;
    const targetRoom = this._fanRoom;
    const areaEntities = getAreaEntities(targetRoom, this.hass.entities, this.hass.devices);
    const fanIds = areaEntities
      .filter((e) => e.entity_id.startsWith('fan.'))
      .map((e) => e.entity_id);

    // Load room config for hidden_entities / entity_order / entity_layouts
    let roomConfig: { hidden_entities?: string[]; entity_order?: string[]; entity_layouts?: Record<string, string> } | null = null;
    try {
      roomConfig = await this._backend.send<{ hidden_entities?: string[]; entity_order?: string[]; entity_layouts?: Record<string, string> } | null>('get_room', { area_id: targetRoom });
    } catch { /* ignore */ }

    // Discard stale result if room changed during async call
    if (this._fanRoom !== targetRoom) return;

    const hiddenSet = new Set(roomConfig?.hidden_entities ?? []);
    const order = roomConfig?.entity_order ?? [];
    const entityLayouts = roomConfig?.entity_layouts ?? {};

    // Sort by order
    const sorted = [...fanIds].sort((a, b) => {
      const ai = order.indexOf(a);
      const bi = order.indexOf(b);
      if (ai !== -1 && bi !== -1) return ai - bi;
      if (ai !== -1) return -1;
      if (bi !== -1) return 1;
      return 0;
    });

    this._fanRoomEntities = sorted.map((id) => {
      const entity = this.hass?.states[id];
      const name = (entity?.attributes?.friendly_name as string) || id.split('.')[1] || id;
      return { entityId: id, name, visible: !hiddenSet.has(id), layout: (entityLayouts[id] as 'full' | 'compact') || 'compact' };
    });
  }

  private async _saveFan() {
    if (!this._backend || this._saving) return;
    this._saving = true;
    try {
      await this._backend.send('set_fan_config', {
        show_header: this._fanShowHeader,
      });

      // Save room-level fan config if a room is selected
      if (this._fanRoom && this._fanRoomEntities.length > 0) {
        // Load existing room config to preserve non-fan entries
        let existingHidden: string[] = [];
        let existingOrder: string[] = [];
        let existingLayouts: Record<string, string> = {};
        try {
          const existing = await this._backend.send<{
            hidden_entities: string[];
            entity_order: string[];
            entity_layouts: Record<string, string>;
          } | null>('get_room', { area_id: this._fanRoom });
          if (existing) {
            existingHidden = existing.hidden_entities ?? [];
            existingOrder = existing.entity_order ?? [];
            existingLayouts = existing.entity_layouts ?? {};
          }
        } catch { /* ignore */ }

        const fanEntityIds = new Set(this._fanRoomEntities.map((e) => e.entityId));
        const nonFanHidden = existingHidden.filter((id) => !fanEntityIds.has(id));
        const hiddenFans = this._fanRoomEntities.filter((e) => !e.visible).map((e) => e.entityId);
        const nonFanOrder = existingOrder.filter((id) => !fanEntityIds.has(id));
        const entityOrder = [...nonFanOrder, ...this._fanRoomEntities.map((e) => e.entityId)];

        // Merge fan layouts with existing non-fan layouts
        const layouts: Record<string, string> = { ...existingLayouts };
        for (const e of this._fanRoomEntities) {
          layouts[e.entityId] = e.layout;
        }

        await this._backend.send('set_room', {
          area_id: this._fanRoom,
          hidden_entities: [...nonFanHidden, ...hiddenFans],
          entity_order: entityOrder,
          entity_layouts: layouts,
        });
      }

      if (!this._mounted) return;
      this._showToast();
      bus.emit('fan-config-changed', undefined);
      if (this._fanRoom) bus.emit('room-config-changed', { areaId: this._fanRoom });
    } catch {
      this._showToast(true);
    } finally {
      this._saving = false;
    }
  }

  async _loadFanConfig(): Promise<void> {
    this._beginSuppressAutoSave();
    if (!this.hass) return;
    if (!this._backend) this._backend = new BackendService(this.hass);
    try {
      const result = await this._backend.send<{
        fan_card?: { show_header: boolean };
      }>('get_config');
      if (result?.fan_card) {
        this._fanShowHeader = result.fan_card.show_header ?? true;
      }
    } catch { /* ignore */ }
    await this._loadRoomFans();
  }

  _onDropCover(idx: number, e: DragEvent) { onDropCover(this, idx, e); }

  async _resetCover() {
    this._beginSuppressAutoSave();
    if (!this._backend) return;
    try {
      const result = await this._backend.send<{
        cover_card?: { show_header: boolean; dashboard_entities: string[]; presets: number[]; entity_presets?: Record<string, number[]> };
      }>('get_config');
      if (result?.cover_card) {
        this._coverShowHeader = result.cover_card.show_header ?? true;
        this._coverDashboardEntities = result.cover_card.dashboard_entities ?? [];
        this._coverPresets = result.cover_card.presets ?? [0, 25, 50, 75, 100];
        this._coverEntityPresets = result.cover_card.entity_presets ?? {};
        this._coverEntityPresetInput = {};
        this._initCoverDashboardOrder();
      }
    } catch { /* ignore */ }
    await this._loadRoomCovers();
  }

  _addCoverPreset() { addCoverPreset(this); }

  _removeCoverPreset(val: number) { removeCoverPreset(this, val); }

  _addCoverEntityPreset(entityId: string) { addCoverEntityPreset(this, entityId); }

  _removeCoverEntityPreset(entityId: string, val: number) { removeCoverEntityPreset(this, entityId, val); }

  _resetCoverEntityPresets(entityId: string) { resetCoverEntityPresets(this, entityId); }

  _toggleCoverPresetsExpand(entityId: string) {
    this._coverPresetsExpandedEntity = this._coverPresetsExpandedEntity === entityId ? null : entityId;
  }

  // — Media card config —

  private async _saveMedia() {
    if (!this._backend || this._saving) return;
    this._saving = true;
    try {
      await this._backend.send('set_media_config', {
        show_header: this._mediaShowHeader,
        extra_entities: this._mediaExtraEntities,
      });
      if (!this._mounted) return;
      this._showToast();
      bus.emit('media-config-changed', undefined);
    } catch {
      this._showToast(true);
    } finally {
      this._saving = false;
    }
  }

  async _loadMediaConfig(): Promise<void> {
    this._beginSuppressAutoSave();
    if (!this._backend) return;
    try {
      const result = await this._backend.send<{
        media_card: { show_header: boolean; extra_entities: Record<string, string[]> };
      }>('get_config');
      if (result?.media_card) {
        this._mediaShowHeader = result.media_card.show_header ?? true;
        this._mediaExtraEntities = result.media_card.extra_entities ?? {};
      }
    } catch { /* ignore */ }
  }

  _renderMediaPreview() { return renderMediaPreview(this); }

  _renderMediaTab() { return renderMediaTab(this); }

  _selectMediaRoom(areaId: string) { this._beginSuppressAutoSave(); selectMediaRoom(this, areaId); }

  _addMediaExtraEntity(entityId: string) { addMediaExtraEntity(this, entityId); }

  _removeMediaExtraEntity(entityId: string) { removeMediaExtraEntity(this, entityId); }

  _loadRoomMediaPlayers() {
    if (!this.hass || !this._mediaRoom) {
      this._mediaRoomNativePlayers = [];
      return;
    }
    const entities = getAreaEntities(this._mediaRoom, this.hass.entities, this.hass.devices);
    this._mediaRoomNativePlayers = entities
      .filter((e) => e.entity_id.startsWith('media_player.'))
      .map((e) => e.entity_id);
  }

  // — Dashboard config —

  _toggleDashboardCard(card: string) { toggleDashboardCard(this, card); }

  _toggleDashboardExpand(card: string) { toggleDashboardExpand(this, card); }

  _onDropDashboardCard(idx: number, e: DragEvent) { onDropDashboardCard(this, idx, e); }

  async _saveDashboard() {
    if (!this._backend || this._saving) return;
    this._saving = true;
    try {
      await this._backend.send('set_dashboard', {
        enabled_cards: this._dashboardEnabledCards,
        card_order: this._dashboardCardOrder,
        hide_header: this._dashboardHideHeader,
        hide_sidebar: this._dashboardHideSidebar,
      });
      await this._backend.send('set_light_config', {
        show_header: this._lightShowHeader,
      });
      await this._backend.send('set_weather', {
        show_header: this._weatherShowHeader,
      });
      const orderedDashCovers = this._coverDashboardOrder.filter((id) =>
        this._coverDashboardEntities.includes(id),
      );
      await this._backend.send('set_cover_config', {
        show_header: this._coverShowHeader,
        dashboard_entities: orderedDashCovers,
        presets: this._coverPresets,
        entity_presets: this._coverEntityPresets,
      });
      await this._backend.send('set_spotify_config', {
        show_header: this._spotifyShowHeader,
      });
      await this._backend.send('set_fan_config', {
        show_header: this._fanShowHeader,
      });
      await this._backend.send('set_media_config', {
        show_header: this._mediaShowHeader,
        extra_entities: this._mediaExtraEntities,
      });
      await this._backend.send('set_presence_config', {
        show_header: this._presenceShowHeader,
      });
      if (!this._mounted) return;
      this._showToast();
      bus.emit('dashboard-config-changed', undefined);
      bus.emit('light-config-changed', undefined);
      bus.emit('weather-config-changed', undefined);
      bus.emit('cover-config-changed', undefined);
      bus.emit('fan-config-changed', undefined);
      bus.emit('spotify-config-changed', undefined);
      bus.emit('media-config-changed', undefined);
      bus.emit('presence-config-changed', undefined);
    } catch {
      this._showToast(true);
    } finally {
      this._saving = false;
    }
  }

  async _loadDashboardConfig(): Promise<void> {
    this._beginSuppressAutoSave();
    if (!this._backend) return;
    try {
      const result = await this._backend.send<{
        dashboard: { enabled_cards: string[]; card_order?: string[]; hide_header?: boolean; hide_sidebar?: boolean };
        light_card?: { show_header?: boolean };
        weather?: { show_header?: boolean };
        cover_card?: { show_header?: boolean };
        fan_card?: { show_header?: boolean };
        spotify_card?: { show_header?: boolean };
        media_card?: { show_header?: boolean; extra_entities?: Record<string, string[]> };
        presence_card?: { show_header?: boolean };
      }>('get_config');
      if (result?.dashboard) {
        this._dashboardEnabledCards = result.dashboard.enabled_cards ?? ['weather'];
        this._dashboardCardOrder = result.dashboard.card_order ?? ['title', 'weather', 'light', 'media', 'cover', 'spotify', 'presence'];
        this._dashboardHideHeader = result.dashboard.hide_header ?? false;
        this._dashboardHideSidebar = result.dashboard.hide_sidebar ?? false;
      }
      this._lightShowHeader = result?.light_card?.show_header ?? true;
      this._weatherShowHeader = result?.weather?.show_header ?? true;
      this._coverShowHeader = result?.cover_card?.show_header ?? true;
      this._fanShowHeader = result?.fan_card?.show_header ?? true;
      this._spotifyShowHeader = result?.spotify_card?.show_header ?? true;
      this._mediaShowHeader = result?.media_card?.show_header ?? true;
      this._mediaExtraEntities = result?.media_card?.extra_entities ?? {};
      this._presenceShowHeader = result?.presence_card?.show_header ?? true;
    } catch { /* ignore */ }
  }

  _renderDashboardPreview() { return renderDashboardPreview(this); }

  _renderDashboardTab() { return renderDashboardTab(this); }

  _renderDashboardCardSub(key: string, enabled: boolean, expanded: boolean): TemplateResult | typeof nothing { return renderDashboardCardSub(this, key, enabled, expanded); }

  // — Presence config —

  private async _savePresence() {
    if (!this._backend || this._saving) return;
    this._saving = true;
    try {
      await this._backend.send('set_presence_config', {
        show_header: this._presenceShowHeader,
        person_entities: this._presencePersonEntities,
        smartphone_sensors: this._presenceSmartphoneSensors,
        notify_services: this._presenceNotifyServices,
        driving_sensors: this._presenceDrivingSensors,
      });
      if (!this._mounted) return;
      this._showToast();
      bus.emit('presence-config-changed', undefined);
    } catch {
      this._showToast(true);
    } finally {
      this._saving = false;
    }
  }

  async _loadPresenceConfig(): Promise<void> {
    this._beginSuppressAutoSave();
    if (!this._backend) return;
    try {
      const result = await this._backend.send<{
        presence_card?: {
          show_header?: boolean;
          person_entities?: string[];
          smartphone_sensors?: Record<string, string>;
          notify_services?: Record<string, string>;
          driving_sensors?: Record<string, string>;
        };
      }>('get_config');
      if (result?.presence_card) {
        this._presenceShowHeader = result.presence_card.show_header ?? true;
        this._presencePersonEntities = result.presence_card.person_entities ?? [];
        this._presenceSmartphoneSensors = result.presence_card.smartphone_sensors ?? {};
        this._presenceNotifyServices = result.presence_card.notify_services ?? {};
        this._presenceDrivingSensors = result.presence_card.driving_sensors ?? {};
      }
    } catch { /* ignore */ }
  }

  _getAvailablePersonEntities() { return getAvailablePersonEntities(this); }

  _getAvailableSmartphoneSensors() { return getAvailableSmartphoneSensors(this); }

  _getAvailableDrivingSensors() { return getAvailableDrivingSensors(this); }

  _getAvailableNotifyServices(): string[] { return getAvailableNotifyServices(this); }

  _togglePresencePerson(entityId: string) { togglePresencePerson(this, entityId); }

  _renderPresencePreview() { return renderPresencePreview(this); }

  _renderPresenceTab() { return renderPresenceTab(this); }

  // — Weather config —

  _toggleWeatherMetric(metric: string) { toggleWeatherMetric(this, metric); }

  _selectWeatherEntity(entityId: string) { selectWeatherEntity(this, entityId); }

  private async _saveWeather() {
    if (!this._backend || this._saving) return;
    this._saving = true;
    try {
      await this._backend.send('set_weather', {
        ...(this._weatherEntity ? { entity_id: this._weatherEntity } : {}),
        hidden_metrics: this._weatherHiddenMetrics,
        show_daily: this._weatherShowDaily,
        show_hourly: this._weatherShowHourly,
        show_header: this._weatherShowHeader,
      });
      if (!this._mounted) return;
      this._showToast();
      bus.emit('weather-config-changed', undefined);
    } catch {
      this._showToast(true);
    } finally {
      this._saving = false;
    }
  }

  _renderWeatherPreview() { return renderWeatherPreview(this); }

  _windBearingToDir(bearing: number): string { return windBearingToDir(this, bearing); }

  _renderWeatherTab() { return renderWeatherTab(this); }

  async _loadWeatherConfig(): Promise<void> {
    this._beginSuppressAutoSave();
    if (!this._backend) return;
    try {
      const result = await this._backend.send<{
        weather: { entity_id: string; hidden_metrics: string[]; show_daily: boolean; show_hourly: boolean; show_header: boolean };
      }>('get_config');
      if (result?.weather) {
        this._weatherEntity = result.weather.entity_id ?? '';
        this._weatherHiddenMetrics = result.weather.hidden_metrics ?? [];
        this._weatherShowDaily = result.weather.show_daily ?? true;
        this._weatherShowHourly = result.weather.show_hourly ?? true;
        this._weatherShowHeader = result.weather.show_header ?? true;
      }
    } catch { /* ignore */ }
  }

  // — Spotify card config —

  async _checkSpotifyStatus() {
    if (!this._backend) return;
    try {
      const result = await this._backend.send<{ configured: boolean }>('spotify_status');
      if (!this._mounted) return;
      this._spotifyConfigured = result?.configured ?? false;
    } catch {
      this._spotifyConfigured = false;
    }
  }

  private async _saveSpotify() {
    if (!this._backend || this._saving) return;
    this._saving = true;
    try {
      await this._backend.send('set_spotify_config', {
        show_header: this._spotifyShowHeader,
        entity_id: this._spotifyEntity,
        sort_order: this._spotifySortOrder,
        max_items_per_section: this._spotifyMaxItems,
        visible_speakers: this._spotifyVisibleSpeakers,
      });
      if (!this._mounted) return;
      this._showToast();
      bus.emit('spotify-config-changed', undefined);
    } catch {
      this._showToast(true);
    } finally {
      this._saving = false;
    }
  }

  async _loadSpotifyConfig(): Promise<void> {
    this._beginSuppressAutoSave();
    if (!this._backend) return;
    try {
      const result = await this._backend.send<{
        spotify_card: { show_header: boolean; entity_id: string; sort_order: string; max_items_per_section: number; visible_speakers?: string[] };
      }>('get_config');
      if (result?.spotify_card) {
        this._spotifyShowHeader = result.spotify_card.show_header ?? true;
        this._spotifyEntity = result.spotify_card.entity_id ?? '';
        this._spotifySortOrder = result.spotify_card.sort_order === 'oldest_first' ? 'oldest_first' : 'recent_first';
        this._spotifyMaxItems = result.spotify_card.max_items_per_section ?? 6;
        this._spotifyVisibleSpeakers = result.spotify_card.visible_speakers ?? [];
      }
    } catch { /* ignore */ }
  }

  _selectSpotifyEntity(entityId: string) { selectSpotifyEntity(this, entityId); }

  _renderSpotifyPreview() { return renderSpotifyPreview(this); }

  _renderSpotifySetupGuide() { return renderSpotifySetupGuide(this); }

  _renderSpotifyTab() { return renderSpotifyTab(this); }

  _toggleSpotifySpeaker(entityId: string) { toggleSpotifySpeaker(this, entityId); }

  _onDropSpeaker(idx: number, e: DragEvent) { onDropSpeaker(this, idx, e); }

  // — Title card config —

  private async _saveTitle() {
    if (!this._backend || this._saving) return;
    this._saving = true;
    try {
      await this._backend.send('set_title_config', {
        title: this._titleText,
        sources: this._titleSources.map((s) => ({
          source_type: s.source_type,
          entity: s.entity || '',
          label: s.label || '',
          modes: s.modes,
        })),
      });
      if (!this._mounted) return;
      this._showToast();
      bus.emit('title-config-changed', undefined);
    } catch {
      this._showToast(true);
    } finally {
      this._saving = false;
    }
  }

  async _loadTitleConfig(): Promise<void> {
    this._beginSuppressAutoSave();
    if (!this._backend) return;
    // Close pickers to avoid stale flatIdx after data reload
    this._iconPopupModeIdx = null;
    this._colorPickerModeIdx = null;
    this._titleEditingSourceIdx = null;
    this._titleAddSourceDropdownOpen = false;
    this._titleAddEntityDropdownOpen = false;
    try {
      const result = await this._backend.send<{
        title_card: { title: string; sources: { source_type: string; entity: string; label: string; modes: { id: string; label: string; icon: string; color: string }[] }[] };
      }>('get_config');
      if (result?.title_card) {
        this._titleText = result.title_card.title ?? '';
        this._titleSources = (result.title_card.sources ?? []).map((s) => ({
          source_type: (s.source_type || '') as 'input_select' | 'scenes' | 'booleans',
          entity: s.entity || '',
          label: s.label || '',
          modes: (s.modes || []).map((m) => ({ id: m.id || '', label: m.label || '', icon: m.icon || '', color: m.color || 'neutral' })),
        }));
      }
    } catch { /* ignore */ }
  }

  _addTitleSource(sourceType: 'input_select' | 'scenes' | 'booleans') {
    addTitleSource(this, sourceType);
  }

  _removeTitleSource(idx: number) {
    removeTitleSource(this, idx);
  }

  _setTitleSourceEntity(srcIdx: number, entityId: string) {
    setTitleSourceEntity(this, srcIdx, entityId);
  }

  _setTitleSourceLabel(srcIdx: number, label: string) {
    setTitleSourceLabel(this, srcIdx, label);
  }

  _addTitleModeEntity(srcIdx: number, entityId: string) {
    addTitleModeEntity(this, srcIdx, entityId);
  }

  _removeTitleModeEntity(srcIdx: number, entityId: string) {
    removeTitleModeEntity(this, srcIdx, entityId);
  }

  _moveTitleMode(srcIdx: number, modeIdx: number, direction: -1 | 1) {
    moveTitleMode(this, srcIdx, modeIdx, direction);
  }

  _updateTitleMode(idx: number, field: 'label' | 'icon' | 'color', value: string) {
    updateTitleMode(this, idx, field, value);
  }

  _iconLoading = false;

  async _openIconPopup(modeIdx: number) {
    if (this._iconLoading) return;
    if (this._iconList.length === 0) {
      this._iconLoading = true;
      // Try to get the full MDI list from HA via a temporary ha-icon-picker
      const picker = document.createElement('ha-icon-picker') as HTMLElement & { hass: unknown };
      picker.hass = this.hass;
      picker.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden;opacity:0;pointer-events:none';
      try {
        this.shadowRoot!.appendChild(picker);
        await new Promise((r) => setTimeout(r, 50));
        const gp = picker.shadowRoot?.querySelector('ha-generic-picker') as HTMLElement & { getItems(): Promise<{ id: string }[]> } | null;
        if (gp?.getItems) {
          const items = await gp.getItems();
          if (items?.length) {
            this._iconList = items.map((i) => i.id);
          }
        }
      } catch { /* ignore */ } finally {
        if (this.shadowRoot?.contains(picker)) {
          this.shadowRoot.removeChild(picker);
        }
        this._iconLoading = false;
      }
    }
    if (modeIdx < this._titleModes.length) {
      this._iconSearch = '';
      this._iconPopupModeIdx = modeIdx;
    }
  }

  _getFilteredIcons(): string[] { return getFilteredIcons(this); }

  _renderIconPopup() { return renderIconPopup(this); }

  _renderTitlePreview() { return renderTitlePreview(this); }

  // — Title color picker (chromatic wheel) —

  _openColorPicker(modeIdx: number) { openColorPicker(this, modeIdx); }

  _closeColorPicker() { closeColorPicker(this); }

  _applyColorPicker() { applyColorPicker(this); }

  _onCpWheel(e: MouseEvent | TouchEvent) { onCpWheel(this, e); }

  _renderColorPicker() { return renderColorPicker(this); }

  _renderTitleTab() { return renderTitleTab(this); }

  // — Tab Select —

  private static _TAB_META: { id: TabId; icon: string; labelKey: Parameters<typeof t>[0] }[] = [
    { id: 'dashboard', icon: 'mdi:view-dashboard', labelKey: 'config.tab_dashboard' },
    { id: 'title', icon: 'mdi:format-title', labelKey: 'config.tab_title' },
    { id: 'navbar', icon: 'mdi:dock-bottom', labelKey: 'config.tab_navbar' },
    { id: 'popup', icon: 'mdi:card-outline', labelKey: 'config.tab_popup' },
    { id: 'light', icon: 'mdi:lightbulb-group', labelKey: 'config.tab_light' },
    { id: 'weather', icon: 'mdi:weather-partly-cloudy', labelKey: 'config.tab_weather' },
    { id: 'media', icon: 'mdi:speaker', labelKey: 'config.tab_media' },
    { id: 'cover', icon: 'mdi:blinds', labelKey: 'config.tab_cover' },
    { id: 'fan', icon: 'mdi:fan', labelKey: 'config.tab_fan' },
    { id: 'spotify', icon: 'mdi:spotify', labelKey: 'config.tab_spotify' },
    { id: 'presence', icon: 'mdi:account-group', labelKey: 'config.tab_presence' },
  ];

  _renderTabSelect() {
    const current = GlassConfigPanel._TAB_META.find((m) => m.id === this._tab);
    const search = this._tabSearch.toLowerCase();
    return html`
      <div class="tab-select-wrap ${this._tabSelectOpen ? 'open' : ''}">
        <button
          class="tab-select-trigger"
          @click=${() => { this._tabSelectOpen = !this._tabSelectOpen; this._tabSearch = ''; }}
          aria-haspopup="listbox"
          aria-expanded=${this._tabSelectOpen ? 'true' : 'false'}
        >
          <ha-icon .icon=${current?.icon || 'mdi:cog'}></ha-icon>
          <span>${current ? t(current.labelKey) : ''}</span>
          <ha-icon class="arrow" .icon=${'mdi:chevron-down'}></ha-icon>
        </button>
        <div class="tab-select-menu" role="listbox">
          <input
            type="text"
            class="tab-select-search"
            placeholder="${t('config.search_entity')}"
            .value=${this._tabSearch}
            @input=${(e: Event) => { this._tabSearch = (e.target as HTMLInputElement).value; }}
            @click=${(e: Event) => e.stopPropagation()}
          />
          ${GlassConfigPanel._TAB_META.map((m) => {
            const label = t(m.labelKey);
            const hidden = search && !label.toLowerCase().includes(search) && !m.id.includes(search);
            return html`
              <button
                class="tab-select-option ${m.id === this._tab ? 'selected' : ''} ${hidden ? 'hidden' : ''}"
                role="option"
                aria-selected=${m.id === this._tab ? 'true' : 'false'}
                @click=${() => this._switchTab(m.id)}
              >
                <ha-icon .icon=${m.icon}></ha-icon>
                ${label}
              </button>
            `;
          })}
        </div>
      </div>
    `;
  }

  // — Main render —

  render() {
    void this._lang; // Trigger re-render on language change
    if (!this.hass) return nothing;

    return html`
      <div class="ambient-bg"></div>
      <div class="page-wrap">
        <div class="page-header">
          <button class="page-back" @click=${() => this._goBack()} aria-label="${t('common.back')}">
            <ha-icon .icon=${'mdi:chevron-left'}></ha-icon>
          </button>
          <span class="page-title">${t('config.title')}</span>
          <span class="page-subtitle">${t('config.brand')}</span>
        </div>

        <div class="glass config-panel">
          ${this._renderTabSelect()}

          <div class="preview-encart">
            <div class="preview-label">${t('config.preview')}</div>
            ${this._tab === 'navbar'
              ? this._renderNavbarPreview()
              : this._tab === 'popup'
                ? this._renderPopupPreview()
                : this._tab === 'light'
                  ? this._renderLightPreview()
                  : this._tab === 'weather'
                    ? this._renderWeatherPreview()
                    : this._tab === 'title'
                      ? this._renderTitlePreview()
                      : this._tab === 'media'
                        ? this._renderMediaPreview()
                        : this._tab === 'cover'
                          ? this._renderCoverPreview()
                          : this._tab === 'fan'
                            ? this._renderFanPreview()
                            : this._tab === 'spotify'
                            ? this._renderSpotifyPreview()
                            : this._tab === 'presence'
                              ? this._renderPresencePreview()
                              : this._renderDashboardPreview()}
          </div>

          ${this._tab === 'navbar'
            ? this._renderNavbarTab()
            : this._tab === 'popup'
              ? this._renderPopupTab()
              : this._tab === 'light'
                ? this._renderLightTab()
                : this._tab === 'weather'
                  ? this._renderWeatherTab()
                  : this._tab === 'title'
                    ? this._renderTitleTab()
                    : this._tab === 'media'
                      ? this._renderMediaTab()
                      : this._tab === 'cover'
                        ? this._renderCoverTab()
                        : this._tab === 'fan'
                          ? this._renderFanTab()
                          : this._tab === 'spotify'
                          ? this._renderSpotifyTab()
                          : this._tab === 'presence'
                            ? this._renderPresenceTab()
                            : this._renderDashboardTab()}
        </div>
      </div>

      ${this._pickerOpen ? this._renderDateTimePicker() : nothing}
      ${this._renderIconPopup()}
      ${this._renderColorPicker()}

      <div class="toast ${this._toast ? 'show' : ''} ${this._toastError ? 'error' : ''}">
        ${this._toastError ? t('common.error_save') : t('common.config_saved')}
      </div>
    `;
  }
}

try { customElements.define('glass-config-panel', GlassConfigPanel); } catch { /* scoped registry */ }
