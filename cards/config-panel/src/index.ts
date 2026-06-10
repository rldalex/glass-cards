import { LitElement, html, nothing, type TemplateResult, type PropertyValues } from 'lit';
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
  type DragContext,
} from './types';

import { type NavState, DEFAULT_NAV, pushNav, readNavFromHistory, navEquals } from './nav-state.js';

// Tab renderers (still needed — views render them)
import './tabs/cover';
// tabs/dashboard removed — absorbed into views/dashboard-view
import './tabs/light';
import './tabs/media';
import './tabs/fan';
// tabs/navbar removed — absorbed into views/room-list
// tabs/popup removed — absorbed into views/room-detail
import './tabs/presence';
import './tabs/spotify';
import './tabs/title';
import './tabs/weather';
import './tabs/camera-carousel';
import './tabs/climate';
import './tabs/unassigned';
import './tabs/calendar';
import './tabs/vacuum';

// View components
import './views/room-list.js';
import './views/room-detail.js';
import './views/dashboard-view.js';
import './views/advanced.js';
import './views/wizard.js';

// Extracted modules
import * as P from './persistence';
import * as DD from './drag-drop';


// — Component —

export class GlassConfigPanel extends LitElement {
  @property({ attribute: false }) hass?: HomeAssistant;
  @property({ type: Boolean }) narrow = false;
  _mounted = false;

  @state() _lang = getLanguage();
  @state() _nav: NavState = DEFAULT_NAV;
  @state() _rooms: RoomEntry[] = [];
  @state() _emptyRooms: { areaId: string; name: string; icon: string }[] = [];
  @state() _selectedRoom = '';
  @state() _toast = false;
  @state() _saving = false;
  /** Gate for the panel content: tabs must never render interactively on
   *  default configs (an auto-save would overwrite the real, unloaded one). */
  @state() _loadState: 'loading' | 'error' | 'ready' = 'loading';

  // Navbar config — room ordering, visibility, auto_sort
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
  _wizardCompleted = true; // default true, overridden by loadConfig
  _suppressAutoSave = false;
  _toastTimeout?: ReturnType<typeof setTimeout>;
  @state() _toastError = false;

  private _popstateHandler?: (e: PopStateEvent) => void;

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
    this.addEventListener('tab-toast', this._onTabToast as EventListener);
    this.addEventListener('rooms-changed', this._onRoomsChanged as EventListener);
    this.addEventListener('rooms-reordered', this._onRoomsReordered as EventListener);
    this.addEventListener('room-visibility-toggle', this._onRoomVisibilityToggle as EventListener);

    this._popstateHandler = (e: PopStateEvent) => {
      const nav = readNavFromHistory(e);
      if (nav) this._nav = nav;
    };
    window.addEventListener('popstate', this._popstateHandler);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._mounted = false;
    this.removeEventListener('tab-toast', this._onTabToast as EventListener);
    this.removeEventListener('rooms-changed', this._onRoomsChanged as EventListener);
    this.removeEventListener('rooms-reordered', this._onRoomsReordered as EventListener);
    this.removeEventListener('room-visibility-toggle', this._onRoomVisibilityToggle as EventListener);
    if (this._popstateHandler) {
      window.removeEventListener('popstate', this._popstateHandler);
      this._popstateHandler = undefined;
    }
    if (this._toastTimeout !== undefined) { clearTimeout(this._toastTimeout); this._toastTimeout = undefined; }
    this._backend = undefined;
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
    if (!this._configReady) {
      this._configReady = true;
      if (!this._wizardCompleted) this._nav = { section: 'wizard' };
      return;
    }
    if (this._suppressAutoSave) { this._suppressAutoSave = false; return; }
  }

  _beginSuppressAutoSave() { this._suppressAutoSave = true; }

  private _onRoomsChanged = (e: Event) => {
    const detail = (e as CustomEvent<{ rooms: RoomEntry[] }>).detail;
    this._rooms = detail.rooms;
  };

  private _onRoomsReordered = (e: Event) => {
    const detail = (e as CustomEvent<{ rooms: RoomEntry[] }>).detail;
    this._rooms = detail.rooms;
    this._saveNavbarOrder();
  };

  private _onRoomVisibilityToggle = (e: Event) => {
    const { areaId, visible } = (e as CustomEvent<{ areaId: string; visible: boolean }>).detail;
    this._rooms = this._rooms.map((r) =>
      r.areaId === areaId ? { ...r, visible } : r
    );
    this._saveNavbarOrder();
  };

  private async _saveNavbarOrder() {
    if (!this._backend) return;
    try {
      await this._backend.send('set_navbar', {
        room_order: this._rooms.filter((r) => r.visible).map((r) => r.areaId),
        hidden_rooms: this._rooms.filter((r) => !r.visible).map((r) => r.areaId),
      });
      this._showToast();
    } catch {
      this._showToast(true);
    }
  }

  private _onTabToast = (e: CustomEvent<{ success: boolean }>) => {
    this._toastError = !e.detail.success; this._toast = true;
    if (this._toastTimeout !== undefined) clearTimeout(this._toastTimeout);
    this._toastTimeout = setTimeout(() => { this._toast = false; }, 2500);
  };

  // ─── Navigation ───

  private _navigateTo(nav: NavState) {
    if (navEquals(this._nav, nav)) return;
    pushNav(this._nav);
    this._nav = nav;
  }

  _goBack() {
    window.location.href = '/';
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
  async _loadFanConfig() { const fanTab = this.shadowRoot?.querySelector('config-tab-fan') as import('./tabs/fan').ConfigTabFan | null; if (fanTab) fanTab.reload(); }
  async _loadClimateConfig() { const climateTab = this.shadowRoot?.querySelector('config-tab-climate') as import('./tabs/climate').ConfigTabClimate | null; if (climateTab) climateTab.reload(); }
  async _loadMediaConfig() { const mediaTab = this.shadowRoot?.querySelector('config-tab-media') as import('./tabs/media').ConfigTabMedia | null; if (mediaTab) mediaTab.reload(); }
  async _loadDashboardConfig() {
    // Dashboard view manages its own state from configData prop
  }
  async _loadPresenceConfig() { const presenceTab = this.shadowRoot?.querySelector('config-tab-presence') as import('./tabs/presence').ConfigTabPresence | null; if (presenceTab) presenceTab.reload(); }
  async _loadCameraCarouselConfig() { const cameraTab = this.shadowRoot?.querySelector('config-tab-camera') as import('./tabs/camera-carousel').ConfigTabCamera | null; if (cameraTab) cameraTab.reload(); }
  async _loadWeatherConfig() { return P.loadWeatherConfig(this); }
  async _loadSpotifyConfig() { const spotifyTab = this.shadowRoot?.querySelector('config-tab-spotify') as import('./tabs/spotify').ConfigTabSpotify | null; if (spotifyTab) spotifyTab.reload(); }
  async _loadTitleConfig() { const titleTab = this.shadowRoot?.querySelector('config-tab-title') as import('./tabs/title').ConfigTabTitle | null; if (titleTab) titleTab.reload(); }
  async _reset() { return P.resetConfig(this); }
  async _saveClimate() { const climateTab = this.shadowRoot?.querySelector('config-tab-climate') as import('./tabs/climate').ConfigTabClimate | null; if (climateTab) climateTab.save(); }
  async _saveDashboard() {
    // Dashboard view manages its own save
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

  // ─── Sidebar ───

  private _renderSidebar(): TemplateResult {
    const sections = [
      { id: 'dashboard', icon: 'mdi:view-dashboard', label: t('config.nav_dashboard') },
      { id: 'rooms', icon: 'mdi:home-group', label: t('config.nav_rooms') },
      { id: 'advanced', icon: 'mdi:tune-variant', label: t('config.nav_advanced') },
    ] as const;

    return html`
      <nav class="panel-sidebar">
        ${sections.map((s) => html`
          <button class="nav-btn ${this._nav.section === s.id ? 'active' : ''}"
            @click=${() => this._navigateTo({ section: s.id as NavState['section'] })}
            aria-label=${s.label}>
            <ha-icon .icon=${s.icon}></ha-icon>
            <span>${s.label}</span>
          </button>
        `)}
      </nav>
    `;
  }

  // ─── Breadcrumb ───

  private _renderBreadcrumb(): TemplateResult | typeof nothing {
    if (this._nav.section === 'rooms' && this._nav.roomId) {
      const area = this.hass?.areas?.[this._nav.roomId];
      return html`
        <div class="breadcrumb">
          <button @click=${() => this._navigateTo({ section: 'rooms' })}>${t('config.nav_rooms')}</button>
          <span class="sep">›</span>
          <span class="current">${area?.name || this._nav.roomId}</span>
        </div>
      `;
    }
    if (this._nav.subSection) {
      const label = this._nav.section === 'dashboard' ? t('config.nav_dashboard') : t('config.nav_advanced');
      return html`
        <div class="breadcrumb">
          <button @click=${() => this._navigateTo({ section: this._nav.section })}>${label}</button>
          <span class="sep">›</span>
          <span class="current">${this._subSectionLabel(this._nav.subSection)}</span>
        </div>
      `;
    }
    return nothing;
  }

  private _subSectionLabel(sub: string): string {
    const keyMap: Record<string, string> = { camera: 'camera_carousel', orphans: 'unassigned' };
    const key = `config.tab_${keyMap[sub] || sub}` as import('@glass-cards/i18n').TranslationKey;
    const translated = t(key);
    return translated !== key ? translated : sub;
  }

  // ─── Content router ───

  private _renderContent(): TemplateResult | typeof nothing {
    if (this._loadState !== 'ready') {
      if (this._loadState === 'error') {
        return html`
          <div class="panel-load-state">
            <glass-empty-state
              variant="inline"
              .icon=${'mdi:cloud-alert-outline'}
              .title=${t('config.load_error')}
            ></glass-empty-state>
            <glass-button variant="secondary" @click=${() => this._loadConfig()}>
              ${t('config.load_retry')}
            </glass-button>
          </div>
        `;
      }
      return html`
        <div class="panel-load-state">
          <glass-empty-state variant="inline" .icon=${'mdi:loading'} .title=${t('config.load_loading')}></glass-empty-state>
        </div>
      `;
    }
    switch (this._nav.section) {
      case 'wizard':
        return html`<config-wizard
          .hass=${this.hass}
          .backend=${this._backend}
          @wizard-done=${() => { this._wizardCompleted = true; this._navigateTo({ section: 'rooms' }); }}
        ></config-wizard>`;
      case 'rooms':
        if (this._nav.roomId) {
          return html`<config-room-detail
            .hass=${this.hass}
            .areaId=${this._nav.roomId}
            .configData=${this._navbarConfig}
            .backend=${this._backend}
            .rooms=${this._rooms}
          ></config-room-detail>`;
        }
        return html`<config-room-list
          .hass=${this.hass}
          .rooms=${this._rooms}
          .backend=${this._backend}
          @room-select=${(e: CustomEvent) => this._navigateTo({ section: 'rooms', roomId: e.detail })}
        ></config-room-list>`;
      case 'dashboard':
        return html`<config-dashboard-view
          .hass=${this.hass}
          .backend=${this._backend}
          .configData=${this._dashboardConfig}
          .rooms=${this._rooms}
          .subSection=${this._nav.subSection}
          @sub-select=${(e: CustomEvent) => this._navigateTo({ section: 'dashboard', subSection: e.detail })}
        ></config-dashboard-view>`;
      case 'advanced':
        return html`<config-advanced-view
          .hass=${this.hass}
          .backend=${this._backend}
          .configData=${this._navbarConfig}
          .rooms=${this._rooms}
          .subSection=${this._nav.subSection}
          @sub-select=${(e: CustomEvent) => this._navigateTo({ section: 'advanced', subSection: e.detail })}
          @reconfig-wizard=${() => this._navigateTo({ section: 'wizard' })}
        ></config-advanced-view>`;
      default:
        return nothing;
    }
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
          <span class="page-subtitle">${t('config.brand')} <span class="page-version">v${__GLASS_CARDS_VERSION__}</span></span>
        </div>

        <div class="glass config-panel">
          <div class="panel-layout">
            ${this._renderSidebar()}
            <div class="panel-content">
              ${this._renderBreadcrumb()}
              ${this._renderContent()}
            </div>
          </div>
        </div>
      </div>

      <div class="toast ${this._toast ? 'show' : ''} ${this._toastError ? 'error' : ''}">
        ${this._toastError ? t('common.error_save') : t('common.config_saved')}
      </div>
    `;
  }
}

try { customElements.define('glass-config-panel', GlassConfigPanel); } catch { /* scoped registry */ }
