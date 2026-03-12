import { html, css, nothing, type PropertyValues } from 'lit';
import { state } from 'lit/decorators.js';
import { bus, type AmbientPeriod } from '@glass-cards/event-bus';
import {
  BaseCard,
  BackendService,
  getAreaEntities,
  type HomeAssistant,
  type LovelaceCardConfig,
} from '@glass-cards/base-card';
import { glassTokens, glassMixin, bounceMixin } from '@glass-cards/ui-core';
import { t } from '@glass-cards/i18n';
import './editor';

function computeAmbientPeriod(hass: HomeAssistant): AmbientPeriod {
  const sun = hass.states['sun.sun'];
  if (!sun) {
    // Fallback: time-based periods
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 10) return 'morning';
    if (hour >= 10 && hour < 17) return 'day';
    if (hour >= 17 && hour < 21) return 'evening';
    return 'night';
  }
  const elevation = parseFloat(sun.attributes.elevation as string) || 0;
  if (elevation > 20) return 'day';
  if (elevation > 0) {
    // Sun is low — determine if rising (morning) or setting (evening)
    const nextSetting = Date.parse(sun.attributes.next_setting as string);
    const nextRising = Date.parse(sun.attributes.next_rising as string);
    // If next_setting is sooner than next_rising, sun is going down → evening
    if (!isNaN(nextSetting) && !isNaN(nextRising)) {
      return nextSetting < nextRising ? 'evening' : 'morning';
    }
    return sun.state === 'above_horizon' ? 'day' : 'night';
  }
  // elevation <= 0 — below horizon
  // Distinguish deep night from twilight (dusk/dawn)
  if (elevation > -6) {
    const nextRising = Date.parse(sun.attributes.next_rising as string);
    const nextSetting = Date.parse(sun.attributes.next_setting as string);
    if (!isNaN(nextRising) && !isNaN(nextSetting)) {
      return nextRising < nextSetting ? 'morning' : 'evening';
    }
  }
  return 'night';
}

/** Maps dashboard config keys to custom element tag names */
const DASHBOARD_CARD_MAP: Record<string, string> = {
  weather: 'glass-weather-card',
  light: 'glass-light-card',
  cover: 'glass-cover-card',
  fan: 'glass-fan-card',
  title: 'glass-title-card',
  spotify: 'glass-spotify-card',
  media: 'glass-media-card',
  presence: 'glass-presence-card',
};

/** Default render order for dashboard cards */
const DEFAULT_CARD_ORDER = ['title', 'weather', 'light', 'media', 'fan', 'cover', 'spotify', 'presence'];

const DEFAULT_TEMP_HIGH = 24.0;
const DEFAULT_TEMP_LOW = 17.0;
const DEFAULT_HUMIDITY_THRESHOLD = 65;

interface NavItem {
  areaId: string;
  name: string;
  icon: string;
  lightsOn: number;
  temperature: string | null;
  tempValue: number | null;
  humidity: string | null;
  humidityValue: number | null;
  mediaPlaying: boolean;
  entityIds: string[];
}

interface AreaStructure {
  areaId: string;
  name: string;
  icon: string;
  entityIds: string[];
}

export class GlassNavbarCard extends BaseCard {
  @state() private _items: NavItem[] = [];
  @state() private _activeArea: string | null = null;
  @state() private _scrollMask: 'none' | 'mask-right' | 'mask-left' | 'mask-both' = 'none';
  private _popup: HTMLElement | null = null;
  private _ownsPopup = false;
  private _areaStructure: AreaStructure[] = [];
  private _lastAreaKeys = '';
  private _lastEntitiesRef?: Record<string, unknown>;
  private _cachedEntityFingerprint = '';
  private _boundUpdateMask = this._updateNavMask.bind(this);
  private _scrollEl: Element | null = null;
  private _navbarConfig: {
    room_order: string[];
    hidden_rooms: string[];
    show_lights?: boolean;
    show_temperature?: boolean;
    show_humidity?: boolean;
    show_media?: boolean;
    auto_sort?: boolean;
    temp_high?: number;
    temp_low?: number;
    humidity_threshold?: number;
  } | null = null;
  private _configLoaded = false;
  private _configLoading = false;
  private _dashboardLoading = false;
  private _roomConfigs: Record<string, { icon?: string | null }> = {};
  private _flipPositions = new Map<string, number>();
  private _litTimestamps = new Map<string, number>();
  private _backend?: BackendService;
  private _configReady = false;
  private _lastAmbientPeriod: AmbientPeriod | null = null;
  @state() private _editMode = false;
  @state() private _enabledCards: string[] = ['weather'];
  private _cardOrder: string[] = DEFAULT_CARD_ORDER;
  private _dashboardCards = new Map<string, HTMLElement>();
  private _hideHeader = false;
  private _hideSidebar = false;
  private _headerStyleEl: HTMLStyleElement | null = null;
  private _sidebarStyleEl: HTMLStyleElement | null = null;
  private _loadingOverlay: HTMLElement | null = null;
  private _removeOverlayTimer?: ReturnType<typeof setTimeout>;
  private _headerRetryTimer?: ReturnType<typeof setTimeout>;
  private _sidebarRetryTimer?: ReturnType<typeof setTimeout>;
  @state() private _bgIsLight = false;
  private _bgIntersectionObserver?: IntersectionObserver;
  private _bgMutationObserver?: MutationObserver;
  private _bgIntersectingCards = new Set<Element>();

  static getConfigElement() {
    return document.createElement('glass-navbar-card-editor');
  }

  static styles = [
    glassTokens,
    glassMixin,
    bounceMixin,
    css`
      :host {
        display: block;
        width: 100%;
        max-width: 500px;
        margin: 0 auto;
        padding: 6px 0 80px; /* top + space for fixed navbar */
        box-sizing: border-box;
      }

      .dashboard-cards {
        display: flex;
        flex-direction: column;
        gap: 12px;
        padding: 0 12px 45px;
      }

      .navbar {
        position: fixed;
        bottom: 16px;
        left: 50%;
        transform: translateX(-50%);
        max-width: 500px;
        width: calc(100vw - 32px);
        height: 58px;
        border-radius: 20px;
        display: flex;
        align-items: center;
        padding: 0 6px;
        box-sizing: border-box;
        z-index: 9997;
        font-family: 'Plus Jakarta Sans', sans-serif;
      }

      .nav-scroll {
        display: flex;
        align-items: center;
        gap: 4px;
        overflow-x: auto;
        scrollbar-width: none;
        flex: 1;
        padding-block: 8px;
      }
      .nav-scroll::before,
      .nav-scroll::after {
        content: '';
        flex: 1 0 8px;
      }
      .nav-scroll::-webkit-scrollbar {
        display: none;
      }

      /* Adaptive inactive icon color based on background luminance */
      .navbar { --nav-inactive: rgba(255,255,255,0.45); }
      .navbar.bg-light { --nav-inactive: rgba(0,0,0,0.45); }

      .nav-item {
        background: transparent;
        border: none;
        border-radius: 14px;
        min-width: 42px;
        height: 42px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 10px;
        cursor: pointer;
        position: relative;
        color: rgba(255,255,255,0.45);
        font-family: inherit;
        outline: none;
        flex-shrink: 0;
        transition:
          background var(--t-fast),
          color 0.6s ease;
      }
      .navbar.bg-light .nav-item {
        color: rgba(0,0,0,0.45);
      }
      @media (hover: hover) and (pointer: fine) {
        .nav-item:hover {
          background: var(--s2);
        }
      }
      @media (hover: none) {
        .nav-item:active {
          animation: bounce 0.3s ease;
        }
      }
      .nav-item.active {
        background: rgba(255, 255, 255, 0.1);
        color: var(--t1);
      }
      .navbar.bg-light .nav-item.active {
        background: rgba(0, 0, 0, 0.08);
        color: rgba(0, 0, 0, 0.85);
      }

      .nav-item ha-icon {
        --mdc-icon-size: 22px;
        flex-shrink: 0;
        transition: color 0.6s ease;
        display: flex; align-items: center; justify-content: center;
      }

      /* 1. Pulse-light: oscillating glow on lights-on icons */
      .nav-item.has-light .nav-content > ha-icon {
        color: var(--c-light-glow);
        filter: drop-shadow(0 0 6px rgba(251, 191, 36, 0.6));
        animation: pulse-light 3s ease-in-out infinite;
      }
      @keyframes pulse-light {
        0%,
        100% {
          filter: drop-shadow(0 0 6px rgba(251, 191, 36, 0.6));
        }
        50% {
          filter: drop-shadow(0 0 2px rgba(251, 191, 36, 0.2));
        }
      }

      .nav-content {
        position: relative;
        display: flex;
        align-items: center;
        flex-shrink: 0;
      }
      .nav-item.active .nav-content {
        gap: 6px;
      }

      /* 2. Humidity bar centered on nav-content (icon + label, excludes badge) */
      .humidity-bar {
        position: absolute;
        bottom: -6px;
        left: 50%;
        transform: translateX(-50%);
        width: 14px;
        height: 3px;
        border-radius: 2px;
        background: var(--c-temp-cold);
        opacity: 0.8;
        box-shadow: 0 0 6px rgba(96, 165, 250, 0.4);
      }

      /* 3. Music icon bounce */
      .nav-item.has-music .nav-content > ha-icon {
        animation: pulse-music 0.8s ease-in-out infinite;
      }
      /* Combined: light glow + music bounce */
      .nav-item.has-light.has-music .nav-content > ha-icon {
        color: var(--c-light-glow);
        animation:
          pulse-light 3s ease-in-out infinite,
          pulse-music 0.8s ease-in-out infinite;
      }
      @keyframes pulse-music {
        0%,
        100% {
          transform: scale(1);
        }
        30% {
          transform: scale(1.2);
        }
        50% {
          transform: scale(0.95);
        }
        70% {
          transform: scale(1.1);
        }
      }

      /* 4. Temp badges (hot/cold) */
      .nav-temp-badge {
        position: absolute;
        top: 2px;
        right: 4px;
        width: 14px;
        height: 14px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        pointer-events: none;
        transition: opacity var(--t-fast);
      }
      .nav-temp-badge ha-icon {
        --mdc-icon-size: 10px;
      }
      .nav-item.has-temp-hot .nav-temp-badge {
        opacity: 1;
        color: var(--c-temp-hot);
        filter: drop-shadow(0 0 4px rgba(248, 113, 113, 0.6));
        animation: pulse-temp-hot 2s infinite ease-in-out;
      }
      .nav-item.has-temp-cold .nav-temp-badge {
        opacity: 1;
        color: var(--c-temp-cold);
        filter: drop-shadow(0 0 4px rgba(96, 165, 250, 0.6));
        animation: pulse-temp-cold 2s infinite ease-in-out;
      }
      @keyframes pulse-temp-hot {
        0%,
        100% {
          transform: scale(1);
          filter: drop-shadow(0 0 0 transparent);
        }
        50% {
          transform: scale(1.15);
          filter: drop-shadow(0 0 6px rgba(248, 113, 113, 0.6));
        }
      }
      @keyframes pulse-temp-cold {
        0%,
        100% {
          transform: scale(1);
          filter: drop-shadow(0 0 0 transparent);
        }
        50% {
          transform: scale(1.15);
          filter: drop-shadow(0 0 6px rgba(96, 165, 250, 0.6));
        }
      }

      /* 5. Dynamic scroll masking */
      .nav-scroll.mask-right {
        -webkit-mask-image: linear-gradient(to right, black calc(100% - 20px), transparent 100%);
        mask-image: linear-gradient(to right, black calc(100% - 20px), transparent 100%);
      }
      .nav-scroll.mask-left {
        -webkit-mask-image: linear-gradient(to left, black calc(100% - 20px), transparent 100%);
        mask-image: linear-gradient(to left, black calc(100% - 20px), transparent 100%);
      }
      .nav-scroll.mask-both {
        -webkit-mask-image: linear-gradient(
          to right,
          transparent 0%,
          black 20px,
          black calc(100% - 20px),
          transparent 100%
        );
        mask-image: linear-gradient(
          to right,
          transparent 0%,
          black 20px,
          black calc(100% - 20px),
          transparent 100%
        );
      }

      .nav-label-wrap {
        display: grid;
        grid-template-columns: 0fr;
        transition: grid-template-columns 0.35s var(--ease-out);
        overflow: hidden;
      }
      .nav-item.active .nav-label-wrap {
        grid-template-columns: 1fr;
      }
      .nav-label {
        font-size: 11px;
        font-weight: 600;
        white-space: nowrap;
        min-width: 0;
        opacity: 0;
        transition: opacity var(--t-fast);
      }
      .nav-item.active .nav-label {
        opacity: 1;
      }

      /* Focus-visible ring */
      .nav-item:focus-visible {
        outline: 2px solid var(--c-accent);
        outline-offset: 2px;
      }

      /* Settings button — always last in scroll */
      .nav-settings {
        margin-left: auto;
      }
      .nav-settings ha-icon {
        --mdc-icon-size: 20px;
        color: rgba(255,255,255,0.45);
        opacity: 0.65;
        transition: color 0.6s ease, opacity var(--t-fast);
        display: flex; align-items: center; justify-content: center;
      }
      .navbar.bg-light .nav-settings ha-icon {
        color: rgba(0,0,0,0.45);
      }
      @media (hover: hover) and (pointer: fine) {
        .nav-settings:hover ha-icon {
          color: var(--t2);
        }
        .nav-settings:active ha-icon {
          color: var(--t1);
        }
      }
      @media (hover: none) {
        .nav-settings:active {
          animation: bounce 0.3s ease;
        }
      }
    `,
  ];

  connectedCallback() {
    super.connectedCallback();
    // Singleton popup — reuse existing if another navbar instance created one
    const existing = document.querySelector('glass-room-popup') as HTMLElement | null;
    if (existing) {
      this._popup = existing;
      this._ownsPopup = false;
    } else {
      this._popup = document.createElement('glass-room-popup');
      document.body.appendChild(this._popup);
      this._ownsPopup = true;
    }

    this._listen('popup-close', () => {
      this._activeArea = null;
    });

    this._listen('navbar-config-changed', () => {
      this._loadBackendConfig();
    });

    this._listen('dashboard-config-changed', () => {
      this._loadDashboardConfig();
    });

    // Reload dashboard config when navigating back from config panel (separate JS context)
    this._listen('location-changed', () => {
      this._loadDashboardConfig();
    });

    this._editMode = this._detectEditMode();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._ownsPopup) this._popup?.remove();
    this._popup = null;
    this._ownsPopup = false;
    if (this._scrollEl) {
      this._scrollEl.removeEventListener('scroll', this._boundUpdateMask);
      this._scrollEl = null;
    }
    for (const card of this._dashboardCards.values()) card.remove();
    this._dashboardCards.clear();
    this._removeHeaderStyle();
    this._removeSidebarStyle();
    if (this._loadingOverlay) { this._loadingOverlay.remove(); this._loadingOverlay = null; }
    if (this._removeOverlayTimer) { clearTimeout(this._removeOverlayTimer); this._removeOverlayTimer = undefined; }
    if (this._headerRetryTimer) { clearTimeout(this._headerRetryTimer); this._headerRetryTimer = undefined; }
    if (this._sidebarRetryTimer) { clearTimeout(this._sidebarRetryTimer); this._sidebarRetryTimer = undefined; }
    this._backend = undefined;
    this._configLoaded = false;
    this._configLoading = false;
    this._bgIntersectionObserver?.disconnect();
    this._bgIntersectionObserver = undefined;
    this._bgMutationObserver?.disconnect();
    this._bgMutationObserver = undefined;
    this._bgIntersectingCards.clear();
  }

  protected firstUpdated(changedProps: PropertyValues) {
    super.firstUpdated(changedProps);
    this._attachScrollListener();
    // Watch .dashboard-cards for child additions to (re)setup IntersectionObserver
    const container = this.renderRoot.querySelector('.dashboard-cards');
    if (container) {
      this._bgMutationObserver = new MutationObserver((mutations) => {
        const hasChildList = mutations.some((m) => m.type === 'childList');
        if (hasChildList) {
          // Card added/removed — rebuild IntersectionObserver
          this._setupBgObserver();
        } else {
          // data-bg-light attribute changed — re-check current intersections
          this._checkBgLightFromIntersecting();
        }
      });
      this._bgMutationObserver.observe(container, {
        childList: true,
        subtree: true,
        attributeFilter: ['data-bg-light'],
      });
    }
    this._setupBgObserver();
  }

  /** Setup IntersectionObserver that watches dashboard cards entering the navbar zone */
  private _setupBgObserver() {
    this._bgIntersectionObserver?.disconnect();
    this._bgIntersectingCards.clear();
    const navbar = this.renderRoot.querySelector('.navbar') as HTMLElement | null;
    const container = this.renderRoot.querySelector('.dashboard-cards');
    if (!navbar || !container || container.children.length === 0) return;

    const navRect = navbar.getBoundingClientRect();
    // Guard: navbar not yet laid out (zero-rect in firstUpdated)
    if (navRect.height === 0) return;
    const topMargin = -navRect.top;
    const bottomMargin = -(window.innerHeight - navRect.bottom);
    this._bgIntersectionObserver = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) this._bgIntersectingCards.add(e.target);
          else this._bgIntersectingCards.delete(e.target);
        }
        this._checkBgLightFromIntersecting();
      },
      { root: null, rootMargin: `${topMargin}px 0px ${bottomMargin}px 0px`, threshold: 0 },
    );

    for (const card of container.children) {
      this._bgIntersectionObserver.observe(card);
    }
  }

  /** Re-check data-bg-light on currently intersecting cards */
  private _checkBgLightFromIntersecting() {
    let isLight = false;
    for (const card of this._bgIntersectingCards) {
      if ((card as HTMLElement).dataset.bgLight === 'true') {
        isLight = true;
        break;
      }
    }
    if (isLight !== this._bgIsLight) this._bgIsLight = isLight;
  }

  private _detectEditMode(): boolean {
    let root = this.getRootNode() as ShadowRoot | Document;
    while (root instanceof ShadowRoot) {
      const host = root.host as HTMLElement & { lovelace?: { editMode?: boolean } };
      if (host.tagName === 'HUI-CARD-OPTIONS') return true;
      if (host.tagName === 'HUI-DIALOG-EDIT-CARD') return true;
      if (host.tagName === 'HA-PANEL-LOVELACE' && host.lovelace?.editMode) return true;
      root = host.getRootNode() as ShadowRoot | Document;
    }
    return false;
  }

  private _attachScrollListener() {
    if (this._scrollEl && this.renderRoot.contains(this._scrollEl)) return;
    if (this._scrollEl) {
      this._scrollEl.removeEventListener('scroll', this._boundUpdateMask);
      this._scrollEl = null;
    }
    const scroll = this.renderRoot.querySelector('.nav-scroll');
    if (!scroll) return;
    scroll.addEventListener('scroll', this._boundUpdateMask, { passive: true });
    this._scrollEl = scroll;
    this._updateNavMask();
  }

  setConfig(config: LovelaceCardConfig) {
    super.setConfig(config);
  }

  getCardSize() {
    return 0;
  }

  protected getTrackedEntityIds(): string[] {
    return ['sun.sun', ...this._items.flatMap((item) => item.entityIds)];
  }

  protected shouldUpdate(changedProps: PropertyValues): boolean {
    if (changedProps.has('hass') && this.hass) {
      // Always propagate hass to child cards even if navbar itself doesn't need re-render
      if (this._popup) {
        (this._popup as unknown as { hass: HomeAssistant }).hass = this.hass;
      }
      for (const card of this._dashboardCards.values()) {
        (card as unknown as { hass: HomeAssistant }).hass = this.hass;
      }
    }
    return super.shouldUpdate(changedProps);
  }

  updated(changedProps: PropertyValues) {
    super.updated(changedProps);
    if (changedProps.has('hass') && this.hass) {
      this._editMode = this._detectEditMode();
      if (this._editMode) return;
      // Invalidate backend on WS reconnect
      if (this._backend && this._backend.connection !== this.hass.connection) {
        this._backend = undefined;
        this._configLoaded = false;
      }
      if (!this._configLoaded && !this._configLoading) {
        this._loadBackendConfig();
      }
      if (this._configReady) {
        this._rebuildStructure();
        this._aggregateState();
      }
      this._updateAmbient();
    }
    if (changedProps.has('_items') || changedProps.has('_enabledCards')) {
      this.updateComplete.then(() => {
        this._syncDashboardCards();
        this._attachScrollListener();
        this._updateNavMask();
        this._animateFlip();
        // Re-setup IntersectionObserver when dashboard cards change
        this._setupBgObserver();
      });
    }
  }

  private async _loadBackendConfig() {
    if (!this.hass || this._configLoading) return;
    this._configLoading = true;
    try {
      if (!this._backend) this._backend = new BackendService(this.hass);
      const result = await this._backend.send<{
        navbar: {
          room_order: string[];
          hidden_rooms: string[];
          show_lights?: boolean;
          show_temperature?: boolean;
          show_humidity?: boolean;
          show_media?: boolean;
          temp_high?: number;
          temp_low?: number;
          humidity_threshold?: number;
        };
        rooms: Record<string, { icon?: string | null }>;
        dashboard: { enabled_cards: string[]; card_order?: string[]; hide_header?: boolean; hide_sidebar?: boolean };
      }>('get_config');
      this._navbarConfig = result.navbar;
      this._roomConfigs = result.rooms ?? {};
      if (result.dashboard) {
        this._enabledCards = result.dashboard.enabled_cards;
        this._cardOrder = result.dashboard.card_order ?? DEFAULT_CARD_ORDER;
        this._hideHeader = result.dashboard.hide_header ?? false;
        this._hideSidebar = result.dashboard.hide_sidebar ?? false;
        this._applyHideHeader();
        this._applyHideSidebar();
      }
      // Force rebuild with new config
      this._configLoaded = true;
      this._configReady = true;
      this._lastAreaKeys = '';
      this._rebuildStructure();
      this._aggregateState();
    } catch {
      // Backend not available — retry after delay
      this._configLoading = false;
      if (this.isConnected) {
        this._showLoadingOverlay();
        setTimeout(() => {
          this._configLoaded = false;
          this._loadBackendConfig();
        }, 2000);
      }
      return;
    } finally {
      this._configLoading = false;
    }
    this._removeLoadingOverlay();
  }

  private async _loadDashboardConfig(): Promise<void> {
    if (!this.hass || this._dashboardLoading || this._configLoading) return;
    this._dashboardLoading = true;
    try {
      if (!this._backend) this._backend = new BackendService(this.hass);
      const result = await this._backend.send<{
        dashboard: { enabled_cards: string[]; card_order?: string[]; hide_header?: boolean; hide_sidebar?: boolean };
      }>('get_config');
      if (result?.dashboard) {
        this._enabledCards = result.dashboard.enabled_cards;
        this._cardOrder = result.dashboard.card_order ?? DEFAULT_CARD_ORDER;
        const hideHeader = result.dashboard.hide_header ?? false;
        const hideSidebar = result.dashboard.hide_sidebar ?? false;
        if (hideHeader !== this._hideHeader) {
          this._hideHeader = hideHeader;
          this._applyHideHeader();
        }
        if (hideSidebar !== this._hideSidebar) {
          this._hideSidebar = hideSidebar;
          this._applyHideSidebar();
        }
      }
    } catch {
      // Backend not available — keep defaults
    } finally {
      this._dashboardLoading = false;
    }
  }

  private _applyHideHeader(retries = 10): void {
    if (this._hideHeader) {
      if (!this._injectHeaderStyle() && retries > 0 && this.isConnected) {
        this._headerRetryTimer = setTimeout(() => this._applyHideHeader(retries - 1), 500);
      }
    } else {
      this._removeHeaderStyle();
    }
  }

  private _injectHeaderStyle(): boolean {
    if (this._headerStyleEl) return true; // Already injected
    const huiRoot = this._findHuiRoot();
    if (!huiRoot) return false;
    const style = document.createElement('style');
    style.id = 'glass-cards-hide-header';
    style.textContent = `
      .header { display: none !important; }
      #view, hui-view-container {
        min-height: 100vh !important;
        padding-top: env(safe-area-inset-top) !important;
      }
    `;
    huiRoot.appendChild(style);
    this._headerStyleEl = style;
    return true;
  }

  private _removeHeaderStyle(): void {
    if (this._headerStyleEl) {
      this._headerStyleEl.remove();
      this._headerStyleEl = null;
    }
  }

  private _applyHideSidebar(retries = 10): void {
    if (this._hideSidebar) {
      if (!this._injectSidebarStyle() && retries > 0 && this.isConnected) {
        this._sidebarRetryTimer = setTimeout(() => this._applyHideSidebar(retries - 1), 500);
      }
    } else {
      this._removeSidebarStyle();
    }
  }

  private _injectSidebarStyle(): boolean {
    if (this._sidebarStyleEl) return true;
    const drawerShadow = this._findDrawerShadow();
    if (!drawerShadow) return false;
    const style = document.createElement('style');
    style.id = 'glass-cards-hide-sidebar';
    style.textContent = `
      .mdc-drawer { display: none !important; }
      .mdc-drawer-scrim { display: none !important; }
      .mdc-drawer-app-content { margin-left: 0 !important; }
    `;
    drawerShadow.appendChild(style);
    this._sidebarStyleEl = style;
    return true;
  }

  private _removeSidebarStyle(): void {
    if (this._sidebarStyleEl) {
      this._sidebarStyleEl.remove();
      this._sidebarStyleEl = null;
    }
  }

  private _findDrawerShadow(): ShadowRoot | null {
    try {
      const ha = document.querySelector('home-assistant');
      if (!ha?.shadowRoot) return null;
      const main = ha.shadowRoot.querySelector('home-assistant-main');
      if (!main?.shadowRoot) return null;
      const drawer = main.shadowRoot.querySelector('ha-drawer');
      if (!drawer?.shadowRoot) return null;
      return drawer.shadowRoot;
    } catch {
      return null;
    }
  }

  private _showLoadingOverlay(): void {
    if (this._loadingOverlay) return;
    const el = document.createElement('div');
    el.id = 'glass-cards-loading';
    el.style.cssText = `
      position: fixed; inset: 0; z-index: 99999;
      background: var(--primary-background-color, #111);
      display: flex; align-items: center; justify-content: center;
      flex-direction: column; gap: 16px;
      transition: opacity 0.4s ease;
    `;

    const styleEl = document.createElement('style');
    styleEl.textContent = '@keyframes gc-spin { to { transform: rotate(360deg); } }';
    el.appendChild(styleEl);

    const spinner = document.createElement('div');
    spinner.style.cssText = 'width:36px;height:36px;border:3px solid rgba(255,255,255,.15);border-top-color:rgba(255,255,255,.7);border-radius:50%;animation:gc-spin .8s linear infinite;';
    el.appendChild(spinner);

    const label = document.createElement('span');
    label.style.cssText = 'font:500 13px/1 sans-serif;color:rgba(255,255,255,.5);letter-spacing:1px;text-transform:uppercase;';
    label.textContent = 'Glass Cards';
    el.appendChild(label);

    document.body.appendChild(el);
    this._loadingOverlay = el;
  }

  private _removeLoadingOverlay(): void {
    if (!this._loadingOverlay) return;
    const el = this._loadingOverlay;
    this._loadingOverlay = null;
    el.style.opacity = '0';
    this._removeOverlayTimer = setTimeout(() => { el.remove(); this._removeOverlayTimer = undefined; }, 400);
  }

  private _findHuiRoot(): ShadowRoot | null {
    try {
      const ha = document.querySelector('home-assistant');
      if (!ha?.shadowRoot) return null;
      const main = ha.shadowRoot.querySelector('home-assistant-main');
      if (!main?.shadowRoot) return null;
      const drawer = main.shadowRoot.querySelector('ha-drawer');
      if (!drawer) return null;
      const resolver = drawer.querySelector('partial-panel-resolver');
      if (!resolver) return null;
      const lovelace = resolver.querySelector('ha-panel-lovelace');
      if (!lovelace?.shadowRoot) return null;
      const huiRoot = lovelace.shadowRoot.querySelector('hui-root');
      if (!huiRoot?.shadowRoot) return null;
      return huiRoot.shadowRoot;
    } catch {
      return null;
    }
  }

  private _getOrCreateCard(tag: string): HTMLElement {
    let card = this._dashboardCards.get(tag);
    if (!card) {
      card = document.createElement(tag);
      this._dashboardCards.set(tag, card);
    }
    if (this.hass) {
      (card as unknown as { hass: HomeAssistant }).hass = this.hass;
    }
    // Pass visible area IDs to cards that need dashboard filtering
    if (tag === 'glass-light-card' || tag === 'glass-fan-card') {
      const areaIds = this._items.map((item) => item.areaId);
      (card as unknown as { visibleAreaIds: string[] }).visibleAreaIds = areaIds;
    }
    return card;
  }

  private _rebuildStructure() {
    if (!this.hass?.areas) return;
    const configKey = this._navbarConfig
      ? `${this._navbarConfig.room_order.join(',')}|${this._navbarConfig.hidden_rooms.join(',')}`
      : '';
    // Only recalculate entity fingerprint when entities registry reference changes
    if (this.hass.entities !== this._lastEntitiesRef) {
      this._lastEntitiesRef = this.hass.entities;
      this._cachedEntityFingerprint = Object.values(this.hass.entities)
        .map((e) => `${e.entity_id}:${e.area_id ?? ''}`)
        .sort()
        .join('|');
    }
    const entityFingerprint = this._cachedEntityFingerprint;
    const iconKey = Object.entries(this._roomConfigs)
      .map(([k, v]) => `${k}:${v.icon ?? ''}`)
      .sort()
      .join(',');
    const cacheKey =
      Object.keys(this.hass.areas).sort().join(',') + '||' + entityFingerprint + '||' + configKey + '||' + iconKey;
    if (cacheKey === this._lastAreaKeys) return;
    this._lastAreaKeys = cacheKey;

    const hiddenSet = new Set(this._navbarConfig?.hidden_rooms ?? []);
    const orderMap = new Map<string, number>();
    (this._navbarConfig?.room_order ?? []).forEach((id, i) => orderMap.set(id, i));

    const allAreas: AreaStructure[] = [];
    for (const area of Object.values(this.hass.areas)) {
      if (hiddenSet.has(area.area_id)) continue;
      const areaEntities = getAreaEntities(area.area_id, this.hass.entities, this.hass.devices);
      if (areaEntities.length === 0) continue;
      const backendIcon = this._roomConfigs[area.area_id]?.icon;
      allAreas.push({
        areaId: area.area_id,
        name: area.name,
        icon: backendIcon || area.icon || 'mdi:home',
        entityIds: areaEntities.map((e) => e.entity_id),
      });
    }

    // Sort by backend order, then alphabetically
    allAreas.sort((a, b) => {
      const aOrder = orderMap.get(a.areaId);
      const bOrder = orderMap.get(b.areaId);
      if (aOrder !== undefined && bOrder !== undefined) return aOrder - bOrder;
      if (aOrder !== undefined) return -1;
      if (bOrder !== undefined) return 1;
      return a.name.localeCompare(b.name);
    });

    this._areaStructure = allAreas;
  }

  private _aggregateState() {
    if (!this.hass) return;
    const items: NavItem[] = this._areaStructure.map((area) => {
      let lightsOn = 0;
      let temperature: string | null = null;
      let tempValue: number | null = null;
      let humidity: string | null = null;
      let humidityValue: number | null = null;
      let mediaPlaying = false;

      for (const entityId of area.entityIds) {
        const entity = this.hass?.states[entityId];
        if (!entity) continue;
        const domain = entityId.split('.')[0];

        if (domain === 'light' && entity.state === 'on') lightsOn++;
        if (domain === 'sensor' && entity.state !== 'unavailable' && entity.state !== 'unknown') {
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

      return { ...area, lightsOn, temperature, tempValue, humidity, humidityValue, mediaPlaying };
    });

    // Track when each room was last lit (most recent first)
    const now = Date.now();
    for (const item of items) {
      if (item.lightsOn > 0) {
        if (!this._litTimestamps.has(item.areaId)) {
          this._litTimestamps.set(item.areaId, now);
        }
      } else {
        this._litTimestamps.delete(item.areaId);
      }
    }

    // Stable sort: lit rooms first, most recently lit leftmost
    const autoSort = this._navbarConfig?.auto_sort !== false;
    if (autoSort) {
      items.sort((a, b) => {
        const aLit = a.lightsOn > 0 ? 0 : 1;
        const bLit = b.lightsOn > 0 ? 0 : 1;
        if (aLit !== bLit) return aLit - bLit;
        if (aLit === 0) {
          // Both lit: most recently lit first
          const aTs = this._litTimestamps.get(a.areaId) ?? 0;
          const bTs = this._litTimestamps.get(b.areaId) ?? 0;
          return bTs - aTs;
        }
        return 0;
      });
    }

    // Only update if order or data changed
    const itemKey = items.map((i) => `${i.areaId}:${i.lightsOn}:${i.temperature}:${i.humidity}:${i.mediaPlaying}`).join('|');
    const oldKey = this._items.map((i) => `${i.areaId}:${i.lightsOn}:${i.temperature}:${i.humidity}:${i.mediaPlaying}`).join('|');
    if (itemKey === oldKey) return;

    // FLIP: capture current positions before DOM update
    this._snapshotPositions();

    this._items = items;
  }

  /* ── Background luminance (IntersectionObserver) ── */

  private _updateAmbient() {
    if (!this.hass) return;
    const period = computeAmbientPeriod(this.hass);
    if (period !== this._lastAmbientPeriod) {
      this._lastAmbientPeriod = period;
      bus.emit('ambient-update', { period });
    }
  }

  private _snapshotPositions() {
    this._flipPositions.clear();
    const buttons = this.renderRoot.querySelectorAll<HTMLElement>('.nav-item[data-area]');
    for (const btn of buttons) {
      const areaId = btn.dataset.area;
      if (!areaId) continue;
      this._flipPositions.set(areaId, btn.getBoundingClientRect().left);
    }
  }

  private _animateFlip() {
    if (this._flipPositions.size === 0) return;
    const buttons = this.renderRoot.querySelectorAll<HTMLElement>('.nav-item[data-area]');
    for (const btn of buttons) {
      const areaId = btn.dataset.area;
      if (!areaId) continue;
      const oldLeft = this._flipPositions.get(areaId);
      if (oldLeft === undefined) continue;
      const newLeft = btn.getBoundingClientRect().left;
      const deltaX = oldLeft - newLeft;
      if (Math.abs(deltaX) < 1) continue;
      btn.animate(
        [
          { transform: `translateX(${deltaX}px)` },
          { transform: 'translateX(0)' },
        ],
        { duration: 350, easing: 'cubic-bezier(0.4, 0, 0.2, 1)' },
      );
    }
    this._flipPositions.clear();
  }

  private _updateNavMask() {
    const scroll = this.renderRoot.querySelector('.nav-scroll') as HTMLElement | null;
    if (!scroll) return;
    const isScrollable = scroll.scrollWidth > scroll.offsetWidth;
    if (!isScrollable) {
      this._scrollMask = 'none';
      return;
    }
    const isAtStart = scroll.scrollLeft <= 5;
    const isAtEnd = scroll.scrollLeft + scroll.offsetWidth >= scroll.scrollWidth - 5;
    if (isAtStart && isAtEnd) this._scrollMask = 'none';
    else if (isAtStart) this._scrollMask = 'mask-right';
    else if (isAtEnd) this._scrollMask = 'mask-left';
    else this._scrollMask = 'mask-both';
  }

  private _handleNavClick(item: NavItem, e: Event) {
    const button = e.currentTarget as HTMLElement;
    const rect = button.getBoundingClientRect();

    if (this._activeArea === item.areaId) {
      bus.emit('popup-close', undefined);
      this._activeArea = null;
    } else {
      this._activeArea = item.areaId;
      const roomIndex = this._items.indexOf(item);
      bus.emit('popup-open', {
        areaId: item.areaId,
        originRect: rect,
        roomIndex: roomIndex >= 0 ? roomIndex : undefined,
      });
    }
  }

  private _renderNavItem(item: NavItem) {
    const isActive = this._activeArea === item.areaId;
    const showLights = this._navbarConfig?.show_lights !== false;
    const showTemp = this._navbarConfig?.show_temperature !== false;
    const showHumidity = this._navbarConfig?.show_humidity !== false;
    const showMedia = this._navbarConfig?.show_media !== false;
    const tempHigh = this._navbarConfig?.temp_high ?? DEFAULT_TEMP_HIGH;
    const tempLow = this._navbarConfig?.temp_low ?? DEFAULT_TEMP_LOW;
    const humidityThreshold = this._navbarConfig?.humidity_threshold ?? DEFAULT_HUMIDITY_THRESHOLD;
    const hasLight = showLights && item.lightsOn > 0;
    const hasHumidity = showHumidity && item.humidityValue !== null && item.humidityValue >= humidityThreshold;
    const hasMusic = showMedia && item.mediaPlaying;
    const hasTempHot = showTemp && item.tempValue !== null && item.tempValue >= tempHigh;
    const hasTempCold = showTemp && item.tempValue !== null && !hasTempHot && item.tempValue <= tempLow;

    const classes = [
      'nav-item',
      isActive ? 'active' : '',
      hasLight ? 'has-light' : '',
      hasMusic ? 'has-music' : '',
      hasTempHot ? 'has-temp-hot' : '',
      hasTempCold ? 'has-temp-cold' : '',
    ]
      .filter(Boolean)
      .join(' ');

    return html`
      <button
        class=${classes}
        data-area=${item.areaId}
        @click=${(e: Event) => this._handleNavClick(item, e)}
        aria-label=${item.name}
        aria-pressed=${isActive ? 'true' : 'false'}
      >
        <span class="nav-temp-badge">
          <ha-icon .icon=${hasTempHot ? 'mdi:thermometer-high' : 'mdi:snowflake'}></ha-icon>
        </span>
        <span class="nav-content">
          <ha-icon .icon=${item.icon}></ha-icon>
          <span class="nav-label-wrap"><span class="nav-label">${item.name}</span></span>
          ${hasHumidity ? html`<span class="humidity-bar"></span>` : nothing}
        </span>
      </button>
    `;
  }

  private _syncDashboardCards(): void {
    const container = this.renderRoot.querySelector('.dashboard-cards') as HTMLElement | null;
    if (!container) return;

    const enabledSet = new Set(this._enabledCards);
    const wanted = this._cardOrder.filter((key) => enabledSet.has(key));

    // Remove cards no longer enabled (collect first to avoid Map mutation during iteration)
    const toRemove: string[] = [];
    for (const [tag] of this._dashboardCards) {
      const key = Object.entries(DASHBOARD_CARD_MAP).find(([, cardTag]) => cardTag === tag)?.[0];
      if (!key || !enabledSet.has(key)) toRemove.push(tag);
    }
    for (const tag of toRemove) {
      this._dashboardCards.get(tag)?.remove();
      this._dashboardCards.delete(tag);
    }

    // Add/reorder enabled cards
    let prevNode: Element | null = null;
    for (const key of wanted) {
      const tag = DASHBOARD_CARD_MAP[key];
      if (!tag) continue;
      const el = this._getOrCreateCard(tag);
      const nextSibling: Element | null = prevNode ? prevNode.nextElementSibling : container.firstElementChild;
      if (el !== nextSibling) {
        container.insertBefore(el, nextSibling);
      }
      prevNode = el;
    }
  }

  render() {
    void this._lang;
    // Always render the dashboard-cards container — it holds imperatively managed children
    // that would be destroyed if render() returned nothing
    const showNavbar = !this._editMode && this._items.length > 0;
    const scrollClass = `nav-scroll${this._scrollMask !== 'none' ? ` ${this._scrollMask}` : ''}`;
    return html`
      <div class="dashboard-cards"></div>
      ${showNavbar
        ? html`<nav class="navbar glass glass-float${this._bgIsLight ? ' bg-light' : ''}">
            <div class=${scrollClass}>
              ${this._items.map((item) => this._renderNavItem(item))}
              <button
                class="nav-item nav-settings"
                @click=${() => { history.pushState(null, '', '/glass-cards'); window.dispatchEvent(new Event('location-changed')); }}
                aria-label=${t('config.title')}
              >
                <span class="nav-content">
                  <ha-icon .icon=${'mdi:cog'}></ha-icon>
                </span>
              </button>
            </div>
          </nav>`
        : nothing}
    `;
  }
}

try { customElements.define('glass-navbar-card', GlassNavbarCard); } catch { /* already registered */ }

// Lovelace card registration
const windowWithCards = window as unknown as {
  customCards?: { type: string; name: string; description: string }[];
};
windowWithCards.customCards = windowWithCards.customCards || [];
windowWithCards.customCards.push({
  type: 'glass-navbar-card',
  name: 'Glass Navbar Card',
  description: 'Auto-discovering bottom navigation for Glass Cards',
});
