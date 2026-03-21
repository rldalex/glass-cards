import { LitElement, html, nothing, type PropertyValues, type TemplateResult } from 'lit';
import { configPanelStyles } from './styles';
import { property, state } from 'lit/decorators.js';
import { glassTokens, hostMixin, glassMixin, bounceMixin } from '@glass-cards/ui-core';
import { t, setLanguage, getLanguage } from '@glass-cards/i18n';
import {
  BackendService,
  type EntityScheduleMap,
  type HomeAssistant,
} from '@glass-cards/base-card';
import {
  type RoomEntry, type CardEntry, type SceneEntry, type LightEntry, type SchedulePeriodEdit,
  type TabId,
  DEFAULT_TEMP_HIGH, DEFAULT_TEMP_LOW, DEFAULT_HUMIDITY_THRESHOLD,
} from './types';

// Tab renderers
import { renderCoverPreview, renderCoverTab, selectCoverRoom, toggleCoverEntityVisibility, cycleCoverLayout, getAllCoverEntities, toggleCoverDashboardEntity, initCoverDashboardOrder, onDropDashboardCover, onDropCover, addCoverPreset, removeCoverPreset, addCoverEntityPreset, removeCoverEntityPreset, resetCoverEntityPresets } from './tabs/cover';
import { renderDashboardPreview, renderDashboardTab, renderDashboardCardSub, toggleDashboardCard, toggleDashboardExpand, onDropDashboardCard } from './tabs/dashboard';
import { renderLightPreview, renderLightTab, renderLightRow, selectLightRoom, toggleLightVisible, cycleLightLayout, toggleScheduleExpand, addSchedulePeriod, removeSchedulePeriod, updateSchedulePeriod, toggleScheduleRecurring, renderScheduleContent, formatDateTimeShort, formatPeriodDisplay, parseDateTimeValue, openRangePicker, closePicker, pickerPrevMonth, pickerNextMonth, pickerSelectDay, pickerSetTime, pickerConfirm, toAbsDay, getMonthDays, getMonthLabel, getDayLabels, renderDateTimePicker } from './tabs/light';
import { renderMediaPreview, renderMediaTab, selectMediaRoom, addMediaExtraEntity, removeMediaExtraEntity } from './tabs/media';
import { renderFanPreview, renderFanTab, selectFanRoom, toggleFanEntityVisibility, cycleFanLayout, onDropFan } from './tabs/fan';
import { renderNavbarPreview, renderNavbarTab, renderRoomRow, toggleRoomVisible, openIconPicker, setRoomIcon, selectRoom, goBack } from './tabs/navbar';
import { renderPopupPreview, renderPopupTab, renderCardRow, renderSceneRow, toggleCardVisible, toggleSceneVisible } from './tabs/popup';
import { renderPresencePreview, renderPresenceTab, getAvailablePersonEntities, getAvailableSmartphoneSensors, getAvailableDrivingSensors, getAvailableNotifyServices, togglePresencePerson } from './tabs/presence';
import { renderSpotifyPreview, renderSpotifyTab, renderSpotifySetupGuide, selectSpotifyEntity, toggleSpotifySpeaker, onDropSpeaker } from './tabs/spotify';
import { renderTitlePreview, renderTitleTab, renderIconPopup, addTitleSource, removeTitleSource, setTitleSourceEntity, setTitleSourceLabel, addTitleModeEntity, removeTitleModeEntity, moveTitleMode, updateTitleMode, getFilteredIcons } from './tabs/title';
import { renderWeatherPreview, renderWeatherTab, toggleWeatherMetric, selectWeatherEntity, windBearingToDir } from './tabs/weather';
import { renderCameraCarouselPreview, renderCameraCarouselTab } from './tabs/camera-carousel';
import { renderClimatePreview, renderClimateTab, selectClimateRoom, toggleClimateEntityVisibility, moveClimate, onDropClimate, getAllClimateEntities } from './tabs/climate';
import { renderUnassignedPreview, renderUnassignedTab, collectAllEntities, assignEntityArea, renameEntity, type EntityAreaEntry } from './tabs/unassigned';

// Extracted modules
import * as P from './persistence';
import * as DD from './drag-drop';


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
  _popupRoomSearch = '';
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
  @state() _titlePeriodEntity = '';
  @state() _titlePeriodOptions: { id: string; label: string; icon: string; color: string }[] = [];
  @state() _titleEditingSourceIdx: number | null = null;
  @state() _titleAddSourceDropdownOpen = false;
  @state() _titleAddEntityDropdownOpen = false;
  _titleAddEntitySearch = '';
  get _titleModes(): { id: string; label: string; icon: string; color: string }[] {
    return this._titleSources.flatMap((s) => s.modes);
  }
  @state() _iconPopupModeIdx: number | null = null;
  @state() _iconSearch = '';
  _iconList: string[] = [];

  // Light card config
  @state() _lightShowHeader = true;

  // Cover card config
  @state() _coverShowHeader = true;
  @state() _coverDashboardCompact = true;
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

  // Climate card config
  @state() _climateShowHeader = true;
  @state() _climateDisplayMode: 'list' | 'normal' = 'list';
  @state() _climateDashboardDisplayMode: 'list' | 'normal' = 'list';
  @state() _climateDashboardEntities: string[] = [];
  @state() _climateRoom = '';
  @state() _climateRoomDropdownOpen = false;
  @state() _climateRoomEntities: { entityId: string; name: string; visible: boolean }[] = [];

  // Presence / Media config
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
  @state() _spotifyConfigured: boolean | null = null;

  // Camera carousel config
  @state() _cameraShowHeader = true;
  @state() _cameraAutoCycle = false;
  @state() _cameraCycleInterval = 10;
  @state() _cameraEntityOrder: string[] = [];

  // Entity area assignment
  @state() _unassignedEntities: EntityAreaEntry[] = [];
  @state() _unassignedDropdownEntity: string | null = null;
  @state() _unassignedEntitySearch = '';
  @state() _unassignedAreaSearch = '';
  @state() _unassignedEditingEntity: string | null = null;

  // Dashboard config
  @state() _dashboardEnabledCards: string[] = ['weather'];
  @state() _dashboardCardOrder: string[] = ['title', 'weather', 'climate', 'light', 'media', 'fan', 'cover', 'camera_carousel', 'spotify', 'presence'];
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
    '_titleText', '_titleSources', '_titlePeriodEntity', '_titlePeriodOptions',
    '_lightShowHeader', '_lights',
    '_coverShowHeader', '_coverDashboardCompact', '_coverDashboardEntities', '_coverDashboardOrder', '_coverPresets', '_coverEntityPresets', '_coverRoomEntities',
    '_fanShowHeader', '_fanRoomEntities',
    '_climateShowHeader', '_climateDisplayMode', '_climateDashboardDisplayMode', '_climateRoomEntities',
    '_presenceShowHeader', '_presencePersonEntities', '_presenceSmartphoneSensors', '_presenceNotifyServices', '_presenceDrivingSensors',
    '_mediaShowHeader', '_mediaExtraEntities',
    '_spotifyShowHeader', '_spotifyEntity', '_spotifySortOrder', '_spotifyMaxItems', '_spotifyVisibleSpeakers',
    '_cameraShowHeader', '_cameraAutoCycle', '_cameraCycleInterval', '_cameraEntityOrder',
    '_dashboardEnabledCards', '_dashboardCardOrder', '_dashboardHideHeader', '_dashboardHideSidebar',
  ]);

  static styles = [
    glassTokens,
    hostMixin,
    glassMixin,
    bounceMixin,
    ...configPanelStyles,
  ];

  protected shouldUpdate(changedProps: PropertyValues): boolean {
    if (!changedProps.has('hass')) return true;
    if (changedProps.size > 1) return true;
    const oldHass = changedProps.get('hass') as HomeAssistant | undefined;
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
    this._backend = undefined;
  }

  _closeDropdownsOnOutsideClick(e: MouseEvent) {
    if (!this._dropdownOpen && !this._lightDropdownOpen && !this._weatherDropdownOpen && !this._titleAddSourceDropdownOpen && !this._titleAddEntityDropdownOpen && !this._coverRoomDropdownOpen && !this._climateRoomDropdownOpen && !this._fanRoomDropdownOpen && !this._mediaRoomDropdownOpen && !this._mediaAddDropdownOpen && !this._spotifyDropdownOpen && !this._presenceDropdownOpen && !this._unassignedDropdownEntity && !this._tabSelectOpen) return;
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
    this._climateRoomDropdownOpen = false;
    this._fanRoomDropdownOpen = false;
    this._mediaRoomDropdownOpen = false;
    this._spotifyDropdownOpen = false;
    this._presenceDropdownOpen = null;
    this._unassignedDropdownEntity = null;
    this._tabSelectOpen = false;
    this._tabSearch = '';
  }

  updated(changedProps: PropertyValues) {
    super.updated(changedProps);
    if (changedProps.has('hass')) {
      if (this.hass?.language && setLanguage(this.hass.language)) {
        this._lang = getLanguage();
      }
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

  _beginSuppressAutoSave() { this._suppressAutoSave = true; }

  private _scheduleAutoSave() {
    if (this._autoSaveTimer !== undefined) clearTimeout(this._autoSaveTimer);
    this._autoSaveTimer = setTimeout(() => {
      this._autoSaveTimer = undefined;
      if (!this._saving) this._save();
    }, 800);
  }

  // ─── Persistence delegates ───

  async _loadConfig() { return P.loadConfig(this); }
  async _loadRoomCards() { return P.loadRoomCards(this); }
  async _loadRoomLights() { return P.loadRoomLights(this); }
  async _loadRoomCovers() { return P.loadRoomCovers(this); }
  async _loadRoomFans() { return P.loadRoomFans(this); }
  async _loadRoomClimates() { return P.loadRoomClimates(this); }
  _loadRoomMediaPlayers() { P.loadRoomMediaPlayers(this); }
  async _loadFanConfig() { return P.loadFanConfig(this); }
  async _loadClimateConfig() { return P.loadClimateConfig(this); }
  async _loadMediaConfig() { return P.loadMediaConfig(this); }
  async _loadDashboardConfig() { return P.loadDashboardConfig(this); }
  async _loadPresenceConfig() { return P.loadPresenceConfig(this); }
  async _loadCameraCarouselConfig() { return P.loadCameraCarouselConfig(this); }
  async _loadWeatherConfig() { return P.loadWeatherConfig(this); }
  async _loadSpotifyConfig() { return P.loadSpotifyConfig(this); }
  async _loadTitleConfig() { return P.loadTitleConfig(this); }
  _save() { P.save(this); }
  async _saveSchedule(entityId: string) { return P.saveSchedule(this, entityId); }
  async _reset() { return P.resetConfig(this); }
  async _saveClimate() { return P.saveClimate(this); }
  async _saveDashboard() { return P.saveDashboard(this); }
  async _resetCover() { return P.resetCover(this); }
  async _checkSpotifyStatus() { return P.checkSpotifyStatus(this); }

  // ─── Drag & Drop delegates ───

  _onDragStart(idx: number, context: 'rooms' | 'cards' | 'scenes' | 'lights' | 'covers' | 'fans' | 'dashboard_covers' | 'dashboard_cards' | 'speakers' | 'title_sources' | 'title_modes', srcIdx?: number) { DD.onDragStart(this, idx, context, srcIdx); }
  _onDragOver(idx: number, e: DragEvent, srcIdx?: number) { DD.onDragOver(this, idx, e, srcIdx); }
  _onDragLeave() { DD.onDragLeave(this); }
  _onDropGeneric(idx: number, e: DragEvent) { DD.onDropGeneric(this, idx, e); }
  _onDragEnd() { DD.onDragEnd(this); }

  // ─── Toast ───

  _showToast(error = false) {
    if (this._toastTimeout !== undefined) clearTimeout(this._toastTimeout);
    this._toastError = error;
    this._toast = true;
    this._toastTimeout = setTimeout(() => {
      this._toast = false;
      this._toastTimeout = undefined;
    }, 2000);
  }

  // ─── Tab switching ───

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
    this._climateRoomDropdownOpen = false;
    this._fanRoomDropdownOpen = false;
    this._mediaRoomDropdownOpen = false;
    this._mediaAddDropdownOpen = false;
    this._spotifyDropdownOpen = false;
    this._presenceDropdownOpen = null;
    this._unassignedDropdownEntity = null;
    this._iconPopupModeIdx = null;
    if (tab === 'light' && !this._lightRoom && this._rooms.length > 0) {
      this._lightRoom = this._rooms[0].areaId;
      this._loadRoomLights();
    }
    if (tab === 'cover' && !this._coverRoom && this._rooms.length > 0) {
      this._coverRoom = this._rooms[0].areaId;
      this._loadRoomCovers();
    }
    if (tab === 'climate') {
      this._loadClimateConfig();
      if (!this._climateRoom && this._rooms.length > 0) {
        this._climateRoom = this._rooms[0].areaId;
        this._loadRoomClimates();
      }
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
    if (tab === 'unassigned') {
      this._loadUnassignedEntities();
    }
  }

  // ─── Tab action delegates ───

  _toggleRoomVisible(areaId: string) { toggleRoomVisible(this, areaId); }
  _openIconPicker(areaId: string) { openIconPicker(this, areaId); }
  _setRoomIcon(areaId: string, icon: string) { setRoomIcon(this, areaId, icon); }
  _toggleCardVisible(id: string) { toggleCardVisible(this, id); }
  _toggleSceneVisible(entityId: string) { toggleSceneVisible(this, entityId); }
  _selectRoom(areaId: string) { selectRoom(this, areaId); }
  _goBack() { goBack(this); }

  _selectLightRoom(areaId: string) { this._beginSuppressAutoSave(); selectLightRoom(this, areaId); }
  _toggleLightVisible(entityId: string) { toggleLightVisible(this, entityId); }
  _cycleLightLayout(entityId: string) { cycleLightLayout(this, entityId); }
  _toggleScheduleExpand(entityId: string) { toggleScheduleExpand(this, entityId); }
  _addSchedulePeriod(entityId: string) { addSchedulePeriod(this, entityId); }
  _removeSchedulePeriod(entityId: string, idx: number) { removeSchedulePeriod(this, entityId, idx); }
  _updateSchedulePeriod(entityId: string, idx: number, field: 'start' | 'end', value: string) { updateSchedulePeriod(this, entityId, idx, field, value); }
  _toggleScheduleRecurring(entityId: string, idx: number) { toggleScheduleRecurring(this, entityId, idx); }

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

  _selectCoverRoom(areaId: string) { this._beginSuppressAutoSave(); selectCoverRoom(this, areaId); }
  _toggleCoverEntityVisibility(entityId: string) { toggleCoverEntityVisibility(this, entityId); }
  _cycleCoverLayout(entityId: string) { cycleCoverLayout(this, entityId); }
  _getAllCoverEntities() { return getAllCoverEntities(this); }
  _toggleCoverDashboardEntity(entityId: string) { toggleCoverDashboardEntity(this, entityId); }
  _initCoverDashboardOrder() { initCoverDashboardOrder(this); }
  _onDropDashboardCover(idx: number, e: DragEvent) { onDropDashboardCover(this, idx, e); }
  _onDropCover(idx: number, e: DragEvent) { onDropCover(this, idx, e); }
  _addCoverPreset() { addCoverPreset(this); }
  _removeCoverPreset(val: number) { removeCoverPreset(this, val); }
  _addCoverEntityPreset(entityId: string) { addCoverEntityPreset(this, entityId); }
  _removeCoverEntityPreset(entityId: string, val: number) { removeCoverEntityPreset(this, entityId, val); }
  _resetCoverEntityPresets(entityId: string) { resetCoverEntityPresets(this, entityId); }
  _toggleCoverPresetsExpand(entityId: string) {
    this._coverPresetsExpandedEntity = this._coverPresetsExpandedEntity === entityId ? null : entityId;
  }

  _selectFanRoom(areaId: string) { this._beginSuppressAutoSave(); selectFanRoom(this, areaId); }
  _toggleFanEntityVisibility(entityId: string) { toggleFanEntityVisibility(this, entityId); }
  _cycleFanLayout(entityId: string) { cycleFanLayout(this, entityId); }
  _onDropFan(idx: number, e: DragEvent) { onDropFan(this, idx, e); }

  _selectClimateRoom(areaId: string) { this._beginSuppressAutoSave(); selectClimateRoom(this, areaId); }
  _toggleClimateEntityVisibility(entityId: string) { toggleClimateEntityVisibility(this, entityId); }
  _moveClimate(idx: number, dir: number) { moveClimate(this, idx, dir); }
  _onDropClimate(idx: number, e: DragEvent) { onDropClimate(this, idx, e); }
  _getAllClimateEntities() { return getAllClimateEntities(this); }

  _selectMediaRoom(areaId: string) { this._beginSuppressAutoSave(); selectMediaRoom(this, areaId); }
  _addMediaExtraEntity(entityId: string) { addMediaExtraEntity(this, entityId); }
  _removeMediaExtraEntity(entityId: string) { removeMediaExtraEntity(this, entityId); }

  _toggleDashboardCard(card: string) { toggleDashboardCard(this, card); }
  _toggleDashboardExpand(card: string) { toggleDashboardExpand(this, card); }
  _onDropDashboardCard(idx: number, e: DragEvent) { onDropDashboardCard(this, idx, e); }

  _getAvailablePersonEntities() { return getAvailablePersonEntities(this); }
  _getAvailableSmartphoneSensors() { return getAvailableSmartphoneSensors(this); }
  _getAvailableDrivingSensors() { return getAvailableDrivingSensors(this); }
  _getAvailableNotifyServices(): string[] { return getAvailableNotifyServices(this); }
  _togglePresencePerson(entityId: string) { togglePresencePerson(this, entityId); }

  _selectSpotifyEntity(entityId: string) { selectSpotifyEntity(this, entityId); }
  _toggleSpotifySpeaker(entityId: string) { toggleSpotifySpeaker(this, entityId); }
  _onDropSpeaker(idx: number, e: DragEvent) { onDropSpeaker(this, idx, e); }

  _toggleWeatherMetric(metric: string) { toggleWeatherMetric(this, metric); }
  _selectWeatherEntity(entityId: string) { selectWeatherEntity(this, entityId); }
  _windBearingToDir(bearing: number): string { return windBearingToDir(this, bearing); }

  _addTitleSource(sourceType: 'input_select' | 'scenes' | 'booleans') { addTitleSource(this, sourceType); }
  _removeTitleSource(idx: number) { removeTitleSource(this, idx); }
  _setTitleSourceEntity(srcIdx: number, entityId: string) { setTitleSourceEntity(this, srcIdx, entityId); }
  _setTitleSourceLabel(srcIdx: number, label: string) { setTitleSourceLabel(this, srcIdx, label); }
  _addTitleModeEntity(srcIdx: number, entityId: string) { addTitleModeEntity(this, srcIdx, entityId); }
  _removeTitleModeEntity(srcIdx: number, entityId: string) { removeTitleModeEntity(this, srcIdx, entityId); }
  _moveTitleMode(srcIdx: number, modeIdx: number, direction: -1 | 1) { moveTitleMode(this, srcIdx, modeIdx, direction); }
  _updateTitleMode(idx: number, field: 'label' | 'icon' | 'color', value: string) { updateTitleMode(this, idx, field, value); }

  _iconLoading = false;
  async _openIconPopup(modeIdx: number) {
    if (this._iconLoading) return;
    if (this._iconList.length === 0) {
      this._iconLoading = true;
      const picker = document.createElement('ha-icon-picker') as HTMLElement & { hass: unknown };
      picker.hass = this.hass;
      picker.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden;opacity:0;pointer-events:none';
      try {
        this.shadowRoot?.appendChild(picker);
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

  _loadUnassignedEntities() {
    this._unassignedEntities = collectAllEntities(this);
    this._unassignedDropdownEntity = null;
    this._unassignedEditingEntity = null;
    this._unassignedEntitySearch = '';
    this._unassignedAreaSearch = '';
  }
  _assignEntityArea(entityId: string, areaId: string) { assignEntityArea(this, entityId, areaId); }
  _renameEntity(entityId: string, newName: string) { renameEntity(this, entityId, newName); }

  // ─── Render delegates ───

  _renderNavbarPreview() { return renderNavbarPreview(this); }
  _renderPopupPreview() { return renderPopupPreview(this); }
  _renderLightPreview() { return renderLightPreview(this); }
  _renderWeatherPreview() { return renderWeatherPreview(this); }
  _renderTitlePreview() { return renderTitlePreview(this); }
  _renderMediaPreview() { return renderMediaPreview(this); }
  _renderCoverPreview() { return renderCoverPreview(this); }
  _renderClimatePreview() { return renderClimatePreview(this); }
  _renderFanPreview() { return renderFanPreview(this); }
  _renderSpotifyPreview() { return renderSpotifyPreview(this); }
  _renderPresencePreview() { return renderPresencePreview(this); }
  _renderCameraCarouselPreview() { return renderCameraCarouselPreview(this); }
  _renderDashboardPreview() { return renderDashboardPreview(this); }

  _renderNavbarTab() { return renderNavbarTab(this); }
  _renderRoomRow(room: RoomEntry, idx: number) { return renderRoomRow(this, room, idx); }
  _renderPopupTab() { return renderPopupTab(this); }
  _renderCardRow(card: CardEntry, idx: number) { return renderCardRow(this, card, idx); }
  _renderSceneRow(scene: SceneEntry, idx: number) { return renderSceneRow(this, scene, idx); }
  _renderLightTab() { return renderLightTab(this); }
  _renderLightRow(light: LightEntry, idx: number) { return renderLightRow(this, light, idx); }
  _formatDateTimeShort(value: string): string { return formatDateTimeShort(this, value); }
  _formatPeriodDisplay(p: SchedulePeriodEdit): string { return formatPeriodDisplay(this, p); }
  _renderScheduleContent(entityId: string) { return renderScheduleContent(this, entityId); }
  _renderCoverTab() { return renderCoverTab(this); }
  _renderFanTab() { return renderFanTab(this); }
  _renderClimateTab() { return renderClimateTab(this); }
  _renderMediaTab() { return renderMediaTab(this); }
  _renderDashboardTab() { return renderDashboardTab(this); }
  _renderDashboardCardSub(key: string, enabled: boolean, expanded: boolean): TemplateResult | typeof nothing { return renderDashboardCardSub(this, key, enabled, expanded); }
  _renderPresenceTab() { return renderPresenceTab(this); }
  _renderCameraCarouselTab() { return renderCameraCarouselTab(this); }
  _renderWeatherTab() { return renderWeatherTab(this); }
  _renderSpotifyPreview2() { return renderSpotifyPreview(this); }
  _renderSpotifySetupGuide() { return renderSpotifySetupGuide(this); }
  _renderSpotifyTab() { return renderSpotifyTab(this); }
  _renderIconPopup() { return renderIconPopup(this); }
  _renderTitlePreview2() { return renderTitlePreview(this); }
  _renderTitleTab() { return renderTitleTab(this); }
  _renderUnassignedPreview() { return renderUnassignedPreview(this); }
  _renderUnassignedTab() { return renderUnassignedTab(this); }

  // ─── Tab Select ───

  private static _TAB_META: { id: TabId; icon: string; labelKey: Parameters<typeof t>[0] }[] = [
    { id: 'dashboard', icon: 'mdi:view-dashboard', labelKey: 'config.tab_dashboard' },
    { id: 'title', icon: 'mdi:format-title', labelKey: 'config.tab_title' },
    { id: 'navbar', icon: 'mdi:dock-bottom', labelKey: 'config.tab_navbar' },
    { id: 'popup', icon: 'mdi:card-outline', labelKey: 'config.tab_popup' },
    { id: 'light', icon: 'mdi:lightbulb-group', labelKey: 'config.tab_light' },
    { id: 'weather', icon: 'mdi:weather-partly-cloudy', labelKey: 'config.tab_weather' },
    { id: 'media', icon: 'mdi:speaker', labelKey: 'config.tab_media' },
    { id: 'cover', icon: 'mdi:blinds', labelKey: 'config.tab_cover' },
    { id: 'climate', icon: 'mdi:thermostat', labelKey: 'config.tab_climate' },
    { id: 'fan', icon: 'mdi:fan', labelKey: 'config.tab_fan' },
    { id: 'spotify', icon: 'mdi:spotify', labelKey: 'config.tab_spotify' },
    { id: 'presence', icon: 'mdi:account-group', labelKey: 'config.tab_presence' },
    { id: 'camera_carousel', icon: 'mdi:cctv', labelKey: 'config.tab_camera_carousel' },
    { id: 'unassigned', icon: 'mdi:home-map-marker', labelKey: 'config.tab_unassigned' },
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

  // ─── Main render ───

  render() {
    void this._lang;
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

          ${this._tab === 'unassigned' ? nothing : html`<div class="preview-encart">
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
                          : this._tab === 'climate'
                            ? this._renderClimatePreview()
                            : this._tab === 'fan'
                              ? this._renderFanPreview()
                              : this._tab === 'spotify'
                            ? this._renderSpotifyPreview()
                            : this._tab === 'presence'
                              ? this._renderPresencePreview()
                              : this._tab === 'camera_carousel'
                                ? this._renderCameraCarouselPreview()
                                : this._renderDashboardPreview()}
          </div>`}

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
                        : this._tab === 'climate'
                          ? this._renderClimateTab()
                          : this._tab === 'fan'
                            ? this._renderFanTab()
                            : this._tab === 'spotify'
                          ? this._renderSpotifyTab()
                          : this._tab === 'presence'
                            ? this._renderPresenceTab()
                            : this._tab === 'camera_carousel'
                              ? this._renderCameraCarouselTab()
                              : this._tab === 'unassigned'
                                ? this._renderUnassignedTab()
                                : this._renderDashboardTab()}
        </div>
      </div>

      ${this._pickerOpen ? this._renderDateTimePicker() : nothing}
      ${this._renderIconPopup()}

      <div class="toast ${this._toast ? 'show' : ''} ${this._toastError ? 'error' : ''}">
        ${this._toastError ? t('common.error_save') : t('common.config_saved')}
      </div>
    `;
  }
}

try { customElements.define('glass-config-panel', GlassConfigPanel); } catch { /* scoped registry */ }
