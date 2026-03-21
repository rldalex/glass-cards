import { LitElement, html, nothing, type PropertyValues } from 'lit';
import { configPanelStyles } from './styles';
import { property, state } from 'lit/decorators.js';
import { glassTokens, hostMixin, glassMixin, bounceMixin } from '@glass-cards/ui-core';
import { t, setLanguage, getLanguage } from '@glass-cards/i18n';
import {
  BackendService,
  type HomeAssistant,
} from '@glass-cards/base-card';
import {
  type RoomEntry,
  type TabId, type DragContext,
} from './types';

// Tab renderers
import './tabs/cover';
import './tabs/dashboard';
import './tabs/light';
import './tabs/media';
import './tabs/fan';
import './tabs/navbar';
import './tabs/popup';
import './tabs/presence';
import './tabs/spotify';
import './tabs/title';
import './tabs/weather';
import './tabs/camera-carousel';
import './tabs/climate';
import './tabs/unassigned';

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
  @state() _toast = false;
  @state() _saving = false;

  // Navbar config — managed by ConfigTabNavbar
  _navbarConfig: Record<string, unknown> = {};

  // Popup config — managed by ConfigTabPopup
  _popupConfig: Record<string, unknown> = {};

  // Weather config — managed by ConfigTabWeather
  _weatherConfig: Record<string, unknown> = {};

  // Title card config — managed by ConfigTabTitle
  _titleConfig: Record<string, unknown> = {};

  // Light card config — managed by ConfigTabLight
  _lightConfig: Record<string, unknown> = {};

  // Cover card config — managed by ConfigTabCover
  _coverConfig: Record<string, unknown> = {};

  // Fan card config — managed by ConfigTabFan
  _fanConfig: Record<string, unknown> = {};

  // Climate card config — managed by ConfigTabClimate
  _climateConfig: Record<string, unknown> = {};

  // Presence config — managed by ConfigTabPresence
  _presenceConfig: Record<string, unknown> = {};

  // Media config — managed by ConfigTabMedia
  _mediaConfig: Record<string, unknown> = {};

  // Spotify config — managed by ConfigTabSpotify
  _spotifyConfig: Record<string, unknown> = {};

  // Camera carousel config — managed by ConfigTabCamera
  _cameraConfig: Record<string, unknown> = {};

  // Dashboard config — managed by ConfigTabDashboard
  _dashboardConfig: Record<string, unknown> = {};

  // Drag state
  @state() _dragIdx: number | null = null;
  @state() _dropIdx: number | null = null;
  @state() _dragContext: DragContext = 'rooms';
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

  static styles = [
    glassTokens, hostMixin, glassMixin, bounceMixin,
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
    this.addEventListener('tab-dirty', this._onTabDirty);
    this.addEventListener('tab-toast', this._onTabToast as EventListener);
    this.addEventListener('rooms-changed', this._onRoomsChanged as EventListener);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._mounted = false;
    document.removeEventListener('click', this._boundCloseDropdowns);
    this.removeEventListener('tab-dirty', this._onTabDirty);
    this.removeEventListener('tab-toast', this._onTabToast as EventListener);
    this.removeEventListener('rooms-changed', this._onRoomsChanged as EventListener);
    if (this._toastTimeout !== undefined) { clearTimeout(this._toastTimeout); this._toastTimeout = undefined; }
    if (this._autoSaveTimer !== undefined) { clearTimeout(this._autoSaveTimer); this._autoSaveTimer = undefined; }
    this._backend = undefined;
  }

  _closeDropdownsOnOutsideClick(e: MouseEvent) {
    if (!this._tabSelectOpen) return;
    const path = e.composedPath();
    const root = this.shadowRoot;
    if (!root) return;
    const dropdowns = root.querySelectorAll('.dropdown, .tab-select-wrap');
    for (const dd of dropdowns) { if (path.includes(dd)) return; }
    this._tabSelectOpen = false;
    this._tabSearch = '';
  }

  updated(changedProps: PropertyValues) {
    super.updated(changedProps);
    if (changedProps.has('hass')) {
      if (this.hass?.language && setLanguage(this.hass.language)) { this._lang = getLanguage(); }
      if (this.hass && this._backend && this._backend.connection !== this.hass.connection) {
        this._backend = undefined; this._loaded = false; this._loading = false; this._configReady = false;
      }
      if (this.hass && !this._loaded && !this._loading) {
        this._backend = new BackendService(this.hass);
        this._loadConfig();
      }
    }
    if (!this._loaded || this._loading || this._saving) return;
    if (!this._configReady) { this._configReady = true; return; }
    if (this._suppressAutoSave) { this._suppressAutoSave = false; return; }
  }

  _beginSuppressAutoSave() { this._suppressAutoSave = true; }

  private _onTabDirty = () => { this._scheduleAutoSave(); };
  private _onRoomsChanged = (e: Event) => {
    const detail = (e as CustomEvent<{ rooms: RoomEntry[] }>).detail;
    this._rooms = detail.rooms;
  };
  private _onTabToast = (e: CustomEvent<{ success: boolean }>) => {
    this._toastError = !e.detail.success; this._toast = true;
    if (this._toastTimeout !== undefined) clearTimeout(this._toastTimeout);
    this._toastTimeout = setTimeout(() => { this._toast = false; }, 2500);
  };

  get _activeTabEl(): Element | null {
    return this.shadowRoot?.querySelector(`[data-tab="${this._tab}"]`) ?? null;
  }

  private _scheduleAutoSave() {
    if (this._autoSaveTimer !== undefined) clearTimeout(this._autoSaveTimer);
    this._autoSaveTimer = setTimeout(() => { this._autoSaveTimer = undefined; if (!this._saving) this._save(); }, 800);
  }

  // ─── Persistence delegates ───

  async _loadConfig() { return P.loadConfig(this); }
  async _loadRoomLights() {
    const lightTab = this.shadowRoot?.querySelector('config-tab-light') as import('./tabs/light').ConfigTabLight | null;
    if (lightTab) lightTab.reload();
  }
  async _loadCoverConfig() {
    const coverTab = this.shadowRoot?.querySelector('config-tab-cover') as import('./tabs/cover').ConfigTabCover | null;
    if (coverTab) coverTab.reload();
  }
  async _loadFanConfig() { const fanTab = this._activeTabEl as import('./tabs/fan').ConfigTabFan | null; if (fanTab) fanTab.reload(); }
  async _loadClimateConfig() { const climateTab = this._activeTabEl as import('./tabs/climate').ConfigTabClimate | null; if (climateTab) climateTab.reload(); }
  async _loadMediaConfig() { const mediaTab = this.shadowRoot?.querySelector('config-tab-media') as import('./tabs/media').ConfigTabMedia | null; if (mediaTab) mediaTab.reload(); }
  async _loadDashboardConfig() {
    const dashboardTab = this.shadowRoot?.querySelector('config-tab-dashboard') as import('./tabs/dashboard').ConfigTabDashboard | null;
    if (dashboardTab) dashboardTab.reload();
  }
  async _loadPresenceConfig() { const presenceTab = this._activeTabEl as import('./tabs/presence').ConfigTabPresence | null; if (presenceTab) presenceTab.reload(); }
  async _loadCameraCarouselConfig() { const cameraTab = this._activeTabEl as import('./tabs/camera-carousel').ConfigTabCamera | null; if (cameraTab) cameraTab.reload(); }
  async _loadWeatherConfig() { return P.loadWeatherConfig(this); }
  async _loadSpotifyConfig() { const spotifyTab = this.shadowRoot?.querySelector('config-tab-spotify') as import('./tabs/spotify').ConfigTabSpotify | null; if (spotifyTab) spotifyTab.reload(); }
  async _loadTitleConfig() { const titleTab = this.shadowRoot?.querySelector('config-tab-title') as import('./tabs/title').ConfigTabTitle | null; if (titleTab) titleTab.reload(); }
  _save() { P.save(this); }
  async _reset() { return P.resetConfig(this); }
  async _saveClimate() { const climateTab = this._activeTabEl as import('./tabs/climate').ConfigTabClimate | null; if (climateTab) climateTab.save(); }
  async _saveDashboard() {
    const dashboardTab = this.shadowRoot?.querySelector('config-tab-dashboard') as import('./tabs/dashboard').ConfigTabDashboard | null;
    if (dashboardTab) dashboardTab.save();
  }
  async _checkSpotifyStatus() { /* Spotify status is now checked internally by ConfigTabSpotify */ }

  // ─── Drag & Drop delegates ───

  _onDragStart(idx: number, context: 'rooms' | 'lights' | 'covers' | 'fans' | 'dashboard_covers' | 'dashboard_cards' | 'speakers' | 'title_sources' | 'title_modes' | 'camera_order', srcIdx?: number) { DD.onDragStart(this, idx, context, srcIdx); }
  _onDragOver(idx: number, e: DragEvent, srcIdx?: number) { DD.onDragOver(this, idx, e, srcIdx); }
  _onDragLeave() { DD.onDragLeave(this); }
  _onDropGeneric(idx: number, e: DragEvent) { DD.onDropGeneric(this, idx, e); }
  _onDragEnd() { DD.onDragEnd(this); }

  // ─── Toast ───

  _showToast(error = false) {
    if (this._toastTimeout !== undefined) clearTimeout(this._toastTimeout);
    this._toastError = error; this._toast = true;
    this._toastTimeout = setTimeout(() => { this._toast = false; this._toastTimeout = undefined; }, 2000);
  }

  // ─── Tab switching ───

  _switchTab(tab: TabId) {
    this._tab = tab; this._tabSelectOpen = false; this._tabSearch = '';
    if (tab === 'light') {
      requestAnimationFrame(() => {
        const lightTab = this.shadowRoot?.querySelector('config-tab-light') as import('./tabs/light').ConfigTabLight | null;
        if (lightTab) lightTab.initRoom();
      });
    }
    if (tab === 'media') {
      requestAnimationFrame(() => {
        const mediaTab = this.shadowRoot?.querySelector('config-tab-media') as import('./tabs/media').ConfigTabMedia | null;
        if (mediaTab) mediaTab.initRoom();
      });
    }
  }

  // ─── Tab action delegates ───

  _goBack() {
    if (history.length > 1) { history.back(); } else { window.location.href = '/'; }
  }

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
        <button class="tab-select-trigger" @click=${() => { this._tabSelectOpen = !this._tabSelectOpen; this._tabSearch = ''; }} aria-haspopup="listbox" aria-expanded=${this._tabSelectOpen ? 'true' : 'false'}>
          <ha-icon .icon=${current?.icon || 'mdi:cog'}></ha-icon>
          <span>${current ? t(current.labelKey) : ''}</span>
          <ha-icon class="arrow" .icon=${'mdi:chevron-down'}></ha-icon>
        </button>
        <div class="tab-select-menu" role="listbox">
          <input type="text" class="tab-select-search" placeholder="${t('config.search_entity')}" .value=${this._tabSearch} @input=${(e: Event) => { this._tabSearch = (e.target as HTMLInputElement).value; }} @click=${(e: Event) => e.stopPropagation()} />
          ${GlassConfigPanel._TAB_META.map((m) => {
            const label = t(m.labelKey);
            const hidden = search && !label.toLowerCase().includes(search) && !m.id.includes(search);
            return html`<button class="tab-select-option ${m.id === this._tab ? 'selected' : ''} ${hidden ? 'hidden' : ''}" role="option" aria-selected=${m.id === this._tab ? 'true' : 'false'} @click=${() => this._switchTab(m.id)}><ha-icon .icon=${m.icon}></ha-icon>${label}</button>`;
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
          <button class="page-back" @click=${() => this._goBack()} aria-label="${t('common.back')}"><ha-icon .icon=${'mdi:chevron-left'}></ha-icon></button>
          <span class="page-title">${t('config.title')}</span>
          <span class="page-subtitle">${t('config.brand')}</span>
        </div>

        <div class="glass config-panel">
          ${this._renderTabSelect()}

          ${this._tab === 'navbar' ? html`<config-tab-navbar data-tab="navbar" .hass=${this.hass} .backend=${this._backend} .rooms=${this._rooms} .emptyRooms=${this._emptyRooms} .configData=${this._navbarConfig}></config-tab-navbar>`
            : this._tab === 'popup' ? html`<config-tab-popup data-tab="popup" .hass=${this.hass} .backend=${this._backend} .rooms=${this._rooms} .configData=${this._popupConfig}></config-tab-popup>`
            : this._tab === 'light' ? html`<config-tab-light data-tab="light" .hass=${this.hass} .backend=${this._backend} .rooms=${this._rooms} .configData=${this._lightConfig}></config-tab-light>`
            : this._tab === 'weather' ? html`<config-tab-weather data-tab="weather" .hass=${this.hass} .backend=${this._backend} .configData=${this._weatherConfig}></config-tab-weather>`
            : this._tab === 'title' ? html`<config-tab-title data-tab="title" .hass=${this.hass} .backend=${this._backend} .configData=${this._titleConfig}></config-tab-title>`
            : this._tab === 'media' ? html`<config-tab-media data-tab="media" .hass=${this.hass} .backend=${this._backend} .rooms=${this._rooms} .configData=${this._mediaConfig}></config-tab-media>`
            : this._tab === 'cover' ? html`<config-tab-cover data-tab="cover" .hass=${this.hass} .backend=${this._backend} .rooms=${this._rooms} .configData=${this._coverConfig}></config-tab-cover>`
            : this._tab === 'climate' ? html`<config-tab-climate data-tab="climate" .hass=${this.hass} .backend=${this._backend} .rooms=${this._rooms} .configData=${this._climateConfig}></config-tab-climate>`
            : this._tab === 'fan' ? html`<config-tab-fan data-tab="fan" .hass=${this.hass} .backend=${this._backend} .rooms=${this._rooms} .configData=${this._fanConfig}></config-tab-fan>`
            : this._tab === 'spotify' ? html`<config-tab-spotify data-tab="spotify" .hass=${this.hass} .backend=${this._backend} .configData=${this._spotifyConfig}></config-tab-spotify>`
            : this._tab === 'presence' ? html`<config-tab-presence data-tab="presence" .hass=${this.hass} .backend=${this._backend} .configData=${this._presenceConfig}></config-tab-presence>`
            : this._tab === 'camera_carousel' ? html`<config-tab-camera data-tab="camera_carousel" .hass=${this.hass} .backend=${this._backend} .configData=${this._cameraConfig} @tab-dirty=${this._onTabDirty} @tab-toast=${this._onTabToast}></config-tab-camera>`
            : this._tab === 'unassigned' ? html`<config-tab-unassigned data-tab="unassigned" .hass=${this.hass} .backend=${this._backend} .rooms=${this._rooms}></config-tab-unassigned>`
            : html`<config-tab-dashboard data-tab="dashboard" .hass=${this.hass} .backend=${this._backend} .rooms=${this._rooms} .configData=${this._dashboardConfig}></config-tab-dashboard>`}
        </div>
      </div>

      <div class="toast ${this._toast ? 'show' : ''} ${this._toastError ? 'error' : ''}">
        ${this._toastError ? t('common.error_save') : t('common.config_saved')}
      </div>
    `;
  }
}

try { customElements.define('glass-config-panel', GlassConfigPanel); } catch { /* scoped registry */ }
