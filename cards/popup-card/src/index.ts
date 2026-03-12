import { LitElement, html, css, nothing, type PropertyValues, type TemplateResult } from 'lit';
import { property, state } from 'lit/decorators.js';
import { bus, type GlassEventMap } from '@glass-cards/event-bus';
import { glassTokens, glassMixin, bounceMixin } from '@glass-cards/ui-core';
import { BackendService, getAreaEntities, type HomeAssistant, type HassEntity } from '@glass-cards/base-card';
import { t, setLanguage, getLanguage } from '@glass-cards/i18n';

interface RoomConfig {
  icon?: string | null;
  card_order?: string[];
  hidden_scenes?: string[];
  scene_order?: string[];
}

interface AreaMeta {
  name: string;
  icon: string;
  temperature: string | null;
  humidity: string | null;
  sensorUnavailable: boolean;
  hasLight: boolean;
  hasMusic: boolean;
  scenes: HassEntity[];
  domains: string[];
}

export class GlassRoomPopup extends LitElement {
  @property({ attribute: false }) hass?: HomeAssistant;
  @state() private _lang = getLanguage();
  @state() private _areaId: string | null = null;
  @state() private _open = false;
  @state() private _scenesOpen = false;
  @state() private _activeSceneId: string | null = null;
  private _pendingRaf?: number;
  private _peekTimeout?: ReturnType<typeof setTimeout>;
  private _closeTimeout?: ReturnType<typeof setTimeout>;
  private _peekedRooms = new Set<string>();
  private _boundKeydown = this._onKeydown.bind(this);
  private _roomConfigs = new Map<string, RoomConfig | null>();
  private _loadingRooms = new Set<string>();
  private _backend?: BackendService;
  private _busCleanups: (() => void)[] = [];
  @state() private _swipeClass = '';
  private _swipeAnimating = false;
  private _swipeAnimTimer?: ReturnType<typeof setTimeout>;
  private _currentRoomIndex?: number;
  private _pendingSwipe?: { areaId: string; originRect?: DOMRect; roomIndex?: number };

  protected shouldUpdate(changedProps: PropertyValues): boolean {
    if (!changedProps.has('hass')) return true;
    if (changedProps.size > 1) return true;
    // Skip hass-only updates during swipe animation to prevent flickering
    if (this._swipeAnimating) return false;
    // Skip hass-only updates when popup is closed or closing
    if (!this._open) return false;
    // Only re-render if entities in the active area changed
    const oldHass = changedProps.get('hass') as HomeAssistant | undefined;
    if (!oldHass || !this.hass || !this._areaId) return true;
    const areaEntities = getAreaEntities(this._areaId, this.hass.entities, this.hass.devices);
    const newHass = this.hass;
    return areaEntities.some((e) => oldHass.states[e.entity_id] !== newHass.states[e.entity_id]);
  }

  static styles = [
    glassTokens,
    glassMixin,
    bounceMixin,
    css`
      :host {
        display: block;
        pointer-events: none;
        font-family: 'Plus Jakarta Sans', sans-serif;
      }

      .overlay {
        position: fixed;
        inset: 0;
        z-index: 9995;
        background: rgba(0, 0, 0, 0.5);
        opacity: 0;
        transition: opacity 0.3s var(--ease-std);
        pointer-events: none;
      }
      :host([open]) .overlay {
        opacity: 1;
        pointer-events: auto;
      }

      .dialog {
        position: fixed;
        bottom: 90px;
        left: 50%;
        z-index: 9999;
        transform: translateX(-50%) scale(0.3);
        transform-origin: center bottom;
        width: calc(100vw - 16px);
        max-width: 500px;
        min-height: calc(100vh - 120px);
        max-height: calc(100vh - 120px);
        overflow-y: auto;
        overflow-x: hidden;
        scrollbar-width: none;
        opacity: 0;
        pointer-events: none;
        transition:
          transform 0.45s var(--ease-out),
          opacity 0.3s var(--ease-std);
        padding: 16px;
        box-sizing: border-box;
      }
      .dialog::-webkit-scrollbar {
        display: none;
      }
      :host([open]) .dialog {
        transform: translateX(-50%) scale(1);
        opacity: 1;
        pointer-events: auto;
      }

      @keyframes swipe-exit-l {
        0%   { transform: translateX(0) scale(1); opacity: 1; }
        100% { transform: translateX(-25%) scale(0.95); opacity: 0; }
      }
      @keyframes swipe-enter-r {
        0%   { transform: translateX(25%) scale(0.95); opacity: 0; }
        100% { transform: translateX(0) scale(1); opacity: 1; }
      }
      @keyframes swipe-exit-r {
        0%   { transform: translateX(0) scale(1); opacity: 1; }
        100% { transform: translateX(25%) scale(0.95); opacity: 0; }
      }
      @keyframes swipe-enter-l {
        0%   { transform: translateX(-25%) scale(0.95); opacity: 0; }
        100% { transform: translateX(0) scale(1); opacity: 1; }
      }

      .dialog-inner.swipe-exit-left,
      .dialog-inner.swipe-exit-right,
      .dialog-inner.swipe-enter-right,
      .dialog-inner.swipe-enter-left {
        will-change: transform, opacity;
        pointer-events: none;
      }
      .dialog-inner.swipe-exit-left {
        animation: swipe-exit-l 180ms cubic-bezier(0.4, 0, 0.7, 0.2) forwards;
      }
      .dialog-inner.swipe-enter-right {
        animation: swipe-enter-r 220ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
      }
      .dialog-inner.swipe-exit-right {
        animation: swipe-exit-r 180ms cubic-bezier(0.4, 0, 0.7, 0.2) forwards;
      }
      .dialog-inner.swipe-enter-left {
        animation: swipe-enter-l 220ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
      }

      .header {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 0;
      }
      .header-sep {
        height: 1px; margin: 8px 12px;
        background: linear-gradient(90deg, transparent, var(--b2), transparent);
      }
      .header-left {
        display: flex;
        flex-direction: column;
        align-items: center;
        flex-shrink: 0;
      }
      .header-icon {
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: var(--radius-md);
        background: var(--s2);
        border: 1px solid var(--b1);
        color: var(--t2);
        cursor: pointer;
        padding: 0;
        font-family: inherit;
        outline: none;
        transition: transform var(--t-fast);
      }
      .header-icon ha-icon,
      .close-btn ha-icon {
        display: flex; align-items: center; justify-content: center;
      }
      .header-icon.has-light ha-icon {
        color: var(--c-light-glow);
        filter: drop-shadow(0 0 6px rgba(251, 191, 36, 0.6));
      }
      .header-icon.has-music ha-icon {
        animation: pulse-music 0.8s ease-in-out infinite;
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
      .scene-dash {
        width: 16px;
        height: 3px;
        background: var(--t4);
        border-radius: 4px;
        margin-top: 6px;
        opacity: 0;
        transform-origin: center;
        transform: scaleX(0.75);
        transition:
          opacity 0.3s var(--ease-std),
          transform 0.3s var(--ease-std);
      }
      .scene-dash.visible {
        opacity: 1;
        transform: scaleX(1);
      }
      .header-info {
        flex: 1;
        min-width: 0;
      }
      .header-name {
        font-size: 16px;
        font-weight: 700;
        color: var(--t1);
      }
      .header-meta {
        display: flex;
        gap: 10px;
        font-size: 12px;
        color: var(--t3);
        font-weight: 500;
      }
      .sensor-warn {
        color: var(--c-warning, #f59e0b);
        font-size: 10px;
        font-style: italic;
      }
      .close-btn {
        background: transparent;
        border: 1px solid var(--b1);
        width: 28px;
        height: 28px;
        border-radius: var(--radius-sm);
        color: var(--t3);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;
        font-family: inherit;
        outline: none;
        transition: background var(--t-fast);
        flex-shrink: 0;
      }
      @media (hover: hover) and (pointer: fine) {
        .close-btn:hover {
          background: var(--s3);
        }
      }
      @media (hover: hover) and (pointer: fine) {
        .close-btn:active {
          background: var(--s3);
        }
      }
      @media (pointer: coarse) {
        .close-btn:active {
          animation: bounce 0.3s ease;
        }
      }

      /* Focus-visible ring */
      .header-icon:focus-visible,
      .close-btn:focus-visible,
      .scene-chip:focus-visible {
        outline: 2px solid var(--c-accent);
        outline-offset: 2px;
      }

      /* Scene grid fold */
      .scenes-wrapper {
        display: grid;
        grid-template-rows: 0fr;
        transition: grid-template-rows 0.6s var(--ease-std);
      }
      .scenes-wrapper.open {
        grid-template-rows: 1fr;
      }
      .scenes-inner {
        overflow: hidden;
        opacity: 0;
        transition: opacity 0.5s var(--ease-std);
      }
      .scenes-wrapper.open .scenes-inner {
        opacity: 1;
      }
      .scene-chips {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
        padding: 0 0 12px;
      }
      .scene-chip {
        background: rgba(255, 255, 255, 0.04);
        border: 1px solid var(--b1);
        border-radius: var(--radius-md);
        padding: 5px 12px;
        font-size: 10px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.8px;
        color: var(--t3);
        cursor: pointer;
        font-family: inherit;
        outline: none;
        transition:
          background var(--t-fast),
          border-color var(--t-fast),
          color var(--t-fast);
      }
      @media (hover: hover) and (pointer: fine) {
        .scene-chip:hover {
          background: var(--s3);
          border-color: var(--b3);
          color: var(--t1);
        }
      }
      @media (hover: hover) and (pointer: fine) {
        .scene-chip:active {
          background: var(--s3);
        }
      }
      @media (pointer: coarse) {
        .scene-chip:active {
          animation: bounce 0.3s ease;
        }
      }
      .scene-chip.active {
        background: rgba(255, 255, 255, 0.12);
        border-color: rgba(255, 255, 255, 0.18);
        color: var(--t1);
      }

      .cards {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

    `,
  ];

  protected updated(changedProps: PropertyValues) {
    super.updated(changedProps);
    if (changedProps.has('hass') && this.hass) {
      // Invalidate backend on WS reconnect
      if (this._backend && this._backend.connection !== this.hass.connection) {
        this._backend = undefined;
        this._roomConfigs.clear();
        this._loadingRooms.clear();
      }
      if (this.hass.language && setLanguage(this.hass.language)) {
        this._lang = getLanguage();
      }
    }
  }

  private _listen<K extends keyof GlassEventMap>(
    event: K,
    callback: (payload: GlassEventMap[K]) => void,
  ): void {
    this._busCleanups.push(bus.on(event, callback));
  }

  connectedCallback() {
    super.connectedCallback();
    // Flush stale bus subscriptions from a previous connection cycle
    this._busCleanups.forEach((cleanup) => cleanup());
    this._busCleanups = [];
    // Cancel any stale timers from a previous connection cycle
    if (this._pendingRaf !== undefined) {
      cancelAnimationFrame(this._pendingRaf);
      this._pendingRaf = undefined;
    }
    if (this._peekTimeout !== undefined) {
      clearTimeout(this._peekTimeout);
      this._peekTimeout = undefined;
    }
    if (this._closeTimeout !== undefined) {
      clearTimeout(this._closeTimeout);
      this._closeTimeout = undefined;
    }
    this._listen('popup-open', (payload) => this._handleOpen(payload));
    this._listen('popup-close', () => this._handleClose());
    this._listen('room-config-changed', (payload) => {
      if (this._peekTimeout !== undefined) { clearTimeout(this._peekTimeout); this._peekTimeout = undefined; }
      this._roomConfigs.delete(payload.areaId);
      this._peekedRooms.delete(payload.areaId);
      if (this._areaId === payload.areaId) this._loadRoomConfig(payload.areaId);
    });
    this._listen('navbar-config-changed', () => {
      if (this._peekTimeout !== undefined) { clearTimeout(this._peekTimeout); this._peekTimeout = undefined; }
      this._roomConfigs.clear();
      this._loadingRooms.clear();
      if (this._areaId) this._loadRoomConfig(this._areaId);
    });
    document.addEventListener('keydown', this._boundKeydown);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._pendingRaf !== undefined) {
      cancelAnimationFrame(this._pendingRaf);
      this._pendingRaf = undefined;
    }
    if (this._peekTimeout !== undefined) {
      clearTimeout(this._peekTimeout);
      this._peekTimeout = undefined;
    }
    if (this._closeTimeout !== undefined) {
      clearTimeout(this._closeTimeout);
      this._closeTimeout = undefined;
    }
    this._peekedRooms.clear();
    this._loadingRooms.clear();
    this._busCleanups.forEach((cleanup) => cleanup());
    this._busCleanups = [];
    this._backend = undefined;
    if (this._swipeAnimTimer !== undefined) {
      clearTimeout(this._swipeAnimTimer);
      this._swipeAnimTimer = undefined;
    }
    this._swipeAnimating = false;
    this._swipeClass = '';
    this._pendingSwipe = undefined;
    this._currentRoomIndex = undefined;
    document.removeEventListener('keydown', this._boundKeydown);
  }

  protected _collapseExpanded(): void {
    if (this._scenesOpen) this._scenesOpen = false;
  }

  private _handleOpen(payload: { areaId: string; originRect?: DOMRect; roomIndex?: number }) {
    // Case 1: Room switch while popup is already open → directional swipe animation
    if (
      this._open &&
      this._areaId &&
      this._areaId !== payload.areaId &&
      payload.roomIndex !== undefined &&
      this._currentRoomIndex !== undefined
    ) {
      // Queue the swipe if an animation is already in progress
      if (this._swipeAnimating) {
        this._pendingSwipe = payload;
        return;
      }
      const direction = payload.roomIndex > this._currentRoomIndex ? 'left' : 'right';
      this._swipeAnimating = true;
      this._swipeClass = direction === 'left' ? 'swipe-exit-left' : 'swipe-exit-right';

      // Cancel stale peek timeout before swapping rooms
      if (this._peekTimeout !== undefined) {
        clearTimeout(this._peekTimeout);
        this._peekTimeout = undefined;
      }

      this._swipeAnimTimer = setTimeout(() => {
        this._swipeAnimTimer = undefined;
        this._areaId = payload.areaId;
        this._currentRoomIndex = payload.roomIndex;
        this._scenesOpen = false;
        this._activeSceneId = null;
        this._loadRoomConfig(payload.areaId);
        // Wait for Lit to render new content before applying enter animation
        requestAnimationFrame(() => requestAnimationFrame(() => {
          this._swipeClass = direction === 'left' ? 'swipe-enter-right' : 'swipe-enter-left';
          this._swipeAnimTimer = setTimeout(() => {
            this._swipeAnimTimer = undefined;
            this._swipeClass = '';
            this._swipeAnimating = false;
            // Process any queued swipe
            if (this._pendingSwipe) {
              const pending = this._pendingSwipe;
              this._pendingSwipe = undefined;
              this._handleOpen(pending);
            }
          }, 220);
        }));
      }, 180);
      return;
    }

    // Case 2: Initial open (or same room) → existing behavior
    // If a swipe animation is in progress, queue it
    if (this._swipeAnimating) {
      this._pendingSwipe = payload;
      return;
    }
    this._currentRoomIndex = payload.roomIndex;
    // Cancel stale close timeout from previous room
    if (this._closeTimeout !== undefined) {
      clearTimeout(this._closeTimeout);
      this._closeTimeout = undefined;
    }
    // Cancel stale peek animation from previous room
    if (this._peekTimeout !== undefined) {
      clearTimeout(this._peekTimeout);
      this._peekTimeout = undefined;
    }
    // Cancel pending rAF from previous open
    if (this._pendingRaf !== undefined) {
      cancelAnimationFrame(this._pendingRaf);
      this._pendingRaf = undefined;
    }
    this._areaId = payload.areaId;
    this._scenesOpen = false;
    this._activeSceneId = null;
    this._loadRoomConfig(payload.areaId);
    this._pendingRaf = requestAnimationFrame(() => {
      this._pendingRaf = undefined;
      this._open = true;
      this.setAttribute('open', '');
    });
  }

  private _maybePeekScenes(areaId: string) {
    if (this._peekedRooms.has(areaId)) return;
    const meta = this._getAreaMeta();
    if (!meta || meta.scenes.length === 0) return;

    // Brief peek: open scenes after 400ms, close after 1s
    this._peekTimeout = setTimeout(() => {
      this._peekTimeout = undefined;
      if (!this._open || this._areaId !== areaId) return;
      this._peekedRooms.add(areaId);
      this._scenesOpen = true;
      this._peekTimeout = setTimeout(() => {
        this._peekTimeout = undefined;
        if (this._open) this._scenesOpen = false;
      }, 1000);
    }, 400);
  }

  private _handleClose() {
    if (this._pendingRaf !== undefined) {
      cancelAnimationFrame(this._pendingRaf);
      this._pendingRaf = undefined;
    }
    if (this._peekTimeout !== undefined) {
      clearTimeout(this._peekTimeout);
      this._peekTimeout = undefined;
    }
    // Cancel any in-progress swipe animation
    if (this._swipeAnimTimer !== undefined) {
      clearTimeout(this._swipeAnimTimer);
      this._swipeAnimTimer = undefined;
    }
    this._swipeAnimating = false;
    this._swipeClass = '';
    this._pendingSwipe = undefined;
    this._currentRoomIndex = undefined;
    this._open = false;
    this.removeAttribute('open');
    this._closeTimeout = setTimeout(() => {
      this._areaId = null;
      this._closeTimeout = undefined;
    }, 350);
  }

  private _onKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape' && this._open) {
      bus.emit('popup-close', undefined);
    }
  }

  private async _loadRoomConfig(areaId: string) {
    if (!this.hass) return;
    if (this._roomConfigs.has(areaId)) {
      // Config already cached (even if null) — just trigger peek
      if (this._open && this._areaId === areaId) this._maybePeekScenes(areaId);
      return;
    }
    if (this._loadingRooms.has(areaId)) return;
    this._loadingRooms.add(areaId);
    try {
      if (!this._backend) this._backend = new BackendService(this.hass);
      const result = await this._backend.send<RoomConfig | null>('get_room', { area_id: areaId });
      this._roomConfigs.set(areaId, result);
      if (this._areaId === areaId) this.requestUpdate();
    } catch {
      // Backend not available — cache null to avoid retrying
      this._roomConfigs.set(areaId, null);
    } finally {
      this._loadingRooms.delete(areaId);
    }
    // Trigger peek after config is resolved
    if (this._open && this._areaId === areaId) this._maybePeekScenes(areaId);
  }

  private _onOverlayClick() {
    bus.emit('popup-close', undefined);
  }

  private _getAreaMeta(): AreaMeta | null {
    if (!this.hass || !this._areaId) return null;
    const area = this.hass.areas[this._areaId];
    if (!area) return null;

    const areaEntities = getAreaEntities(this._areaId, this.hass.entities, this.hass.devices);
    let temperature: string | null = null;
    let humidity: string | null = null;
    let sensorUnavailable = false;
    let hasLight = false;
    let hasMusic = false;
    const scenes: HassEntity[] = [];
    const domainSet = new Set<string>();

    for (const regEntry of areaEntities) {
      const entityState = this.hass?.states[regEntry.entity_id];
      if (!entityState) continue;

      const domain = regEntry.entity_id.split('.')[0];
      domainSet.add(domain);

      if (domain === 'light' && entityState.state === 'on') hasLight = true;
      if (domain === 'media_player' && entityState.state === 'playing') hasMusic = true;

      if (domain === 'sensor') {
        const dc = entityState.attributes.device_class;
        const isUnavail = entityState.state === 'unavailable' || entityState.state === 'unknown';
        if ((dc === 'temperature' || dc === 'humidity') && isUnavail) {
          sensorUnavailable = true;
        }
        if (!isUnavail) {
          if (dc === 'temperature' && !temperature) {
            temperature = `${entityState.state}${entityState.attributes.unit_of_measurement || '°C'}`;
          }
          if (dc === 'humidity' && !humidity) {
            humidity = `${entityState.state}%`;
          }
        }
      }
      if (domain === 'scene') {
        scenes.push(entityState);
      }
    }

    // Apply backend config: custom icon, hidden scenes, scene order
    const roomCfg = this._roomConfigs.get(this._areaId);
    const customIcon = roomCfg?.icon ?? area.icon ?? 'mdi:home';

    const hiddenScenes = new Set(roomCfg?.hidden_scenes ?? []);
    const filteredScenes = scenes.filter((s) => !hiddenScenes.has(s.entity_id));

    const sceneOrder = roomCfg?.scene_order;
    if (sceneOrder && sceneOrder.length > 0) {
      const orderMap = new Map(sceneOrder.map((id, i) => [id, i]));
      filteredScenes.sort((a, b) => {
        const aIdx = orderMap.get(a.entity_id) ?? Infinity;
        const bIdx = orderMap.get(b.entity_id) ?? Infinity;
        return aIdx - bIdx;
      });
    }

    return {
      name: area.name,
      icon: customIcon,
      temperature,
      humidity,
      sensorUnavailable,
      hasLight,
      hasMusic,
      scenes: filteredScenes,
      domains: [...domainSet],
    };
  }

  private _activateScene(entityId: string) {
    this._activeSceneId = entityId;
    this.hass?.callService('scene', 'turn_on', {}, { entity_id: entityId });
  }

  private static readonly DEFAULT_CARD_ORDER = ['light', 'media_player', 'climate', 'fan', 'cover', 'camera', 'vacuum'];

  private _getVisibleCards(domains: string[]): string[] {
    const roomCfg = this._areaId ? this._roomConfigs.get(this._areaId) : undefined;
    const cardOrder = roomCfg?.card_order;
    if (cardOrder && cardOrder.length > 0) {
      // card_order contains only visible cards in order
      return cardOrder.filter((d) => domains.includes(d));
    }
    // No config — show all available domains in default order
    return GlassRoomPopup.DEFAULT_CARD_ORDER.filter((d) => domains.includes(d));
  }

  private _renderDomainCard(domain: string): TemplateResult | typeof nothing {
    switch (domain) {
      case 'light':
        return html`<glass-light-card .hass=${this.hass} .areaId=${this._areaId}></glass-light-card>`;
      case 'cover':
        return html`<glass-cover-card .hass=${this.hass} .areaId=${this._areaId}></glass-cover-card>`;
      case 'media_player':
        return html`<glass-media-card .hass=${this.hass} .areaId=${this._areaId}></glass-media-card>`;
      case 'fan':
        return html`<glass-fan-card .hass=${this.hass} .areaId=${this._areaId}></glass-fan-card>`;
      case 'camera':
        return html`<glass-camera-carousel-card .hass=${this.hass} .areaId=${this._areaId}></glass-camera-carousel-card>`;
      default:
        return nothing;
    }
  }

  render() {
    void this._lang; // Trigger re-render on language change
    if (!this._areaId) return nothing;
    const meta = this._getAreaMeta();
    if (!meta) return nothing;

    const hasScenes = meta.scenes.length > 0;
    const visibleCards = this._getVisibleCards(meta.domains);

    return html`
      <div class="overlay" @click=${this._onOverlayClick}></div>
      <div class="dialog glass glass-float" role="dialog" aria-modal="true" aria-label=${meta.name}>
        <div class="dialog-inner ${this._swipeClass}">
        <div class="header">
          <div class="header-left">
            <button
              class="header-icon ${meta.hasLight ? 'has-light' : ''} ${meta.hasMusic
                ? 'has-music'
                : ''}"
              @click=${() => hasScenes && (this._scenesOpen = !this._scenesOpen)}
              aria-label=${hasScenes ? t('popup.toggle_scenes_aria') : meta.name}
              aria-expanded=${hasScenes ? (this._scenesOpen ? 'true' : 'false') : nothing}
            >
              <ha-icon .icon=${meta.icon}></ha-icon>
            </button>
            <div class="scene-dash ${hasScenes ? 'visible' : ''}"></div>
          </div>
          <div class="header-info">
            <div class="header-name">${meta.name}</div>
            <div class="header-meta">
              ${meta.temperature ? html`<span>${meta.temperature}</span>` : nothing}
              ${meta.humidity ? html`<span>${meta.humidity}</span>` : nothing}
              ${meta.sensorUnavailable && !meta.temperature && !meta.humidity ? html`<span class="sensor-warn">${t('popup.sensor_unavailable')}</span>` : nothing}
            </div>
          </div>
          <button
            class="close-btn"
            @click=${() => bus.emit('popup-close', undefined)}
            aria-label="${t('popup.close_aria')}"
          >
            <ha-icon .icon=${'mdi:close'}></ha-icon>
          </button>
        </div>
        <div class="header-sep"></div>

        ${hasScenes
          ? html`
              <div class="scenes-wrapper ${this._scenesOpen ? 'open' : ''}">
                <div class="scenes-inner">
                  <div class="scene-chips">
                    ${meta.scenes.map(
                      (s) => html`
                        <button
                          class="scene-chip ${this._activeSceneId === s.entity_id ? 'active' : ''}"
                          @click=${() => this._activateScene(s.entity_id)}
                          aria-label="${t('popup.activate_scene_aria', { name: (s.attributes.friendly_name as string) || s.entity_id })}"
                        >
                          ${s.attributes.friendly_name || s.entity_id}
                        </button>
                      `,
                    )}
                  </div>
                </div>
              </div>
            `
          : nothing}

        <div class="cards">
          ${visibleCards.map((domain) => this._renderDomainCard(domain))}
        </div>
        </div>
      </div>
    `;
  }
}

try { customElements.define('glass-room-popup', GlassRoomPopup); } catch { /* scoped registry */ }
