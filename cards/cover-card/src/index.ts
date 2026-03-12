import { html, css, nothing, type PropertyValues } from 'lit';
import { property, state } from 'lit/decorators.js';
import {
  BaseCard,
  BackendService,
  getAreaEntities,
  type HassEntity,
} from '@glass-cards/base-card';
import { glassTokens, glassMixin, foldMixin, marqueeMixin, marqueeText, bounceMixin } from '@glass-cards/ui-core';
import { t } from '@glass-cards/i18n';

// — Feature bitmask (HA CoverEntityFeature) —

const F = {
  OPEN: 1,
  CLOSE: 2,
  SET_POSITION: 4,
  STOP: 8,
  OPEN_TILT: 16,
  CLOSE_TILT: 32,
  STOP_TILT: 64,
  SET_TILT_POSITION: 128,
} as const;

// — Device class icon map [open, closed] —

const DC_ICONS: Record<string, [string, string]> = {
  shutter:  ['mdi:window-shutter-open',  'mdi:window-shutter'],
  blind:    ['mdi:blinds-open',          'mdi:blinds'],
  curtain:  ['mdi:curtains',             'mdi:curtains-closed'],
  garage:   ['mdi:garage-open',          'mdi:garage'],
  gate:     ['mdi:gate-open',            'mdi:gate'],
  door:     ['mdi:door-open',            'mdi:door-closed'],
  awning:   ['mdi:awning-outline',       'mdi:awning-outline'],
  shade:    ['mdi:roller-shade-open',    'mdi:roller-shade'],
  window:   ['mdi:window-open',          'mdi:window-closed'],
  damper:   ['mdi:valve-open',           'mdi:valve'],
};

// — Transport icons per device_class category —

interface TransportInfo {
  open: string;
  close: string;
  stop: string | null;
}

const TRANSPORT: Record<string, TransportInfo> = {
  vertical: { open: 'mdi:arrow-up',       close: 'mdi:arrow-down',      stop: 'mdi:stop' },
  garage:   { open: 'mdi:garage-open',     close: 'mdi:garage',          stop: 'mdi:stop' },
  gate:     { open: 'mdi:gate-open',       close: 'mdi:gate',            stop: 'mdi:stop' },
  door:     { open: 'mdi:door-open',       close: 'mdi:door-closed',     stop: null },
  damper:   { open: 'mdi:valve-open',      close: 'mdi:valve',           stop: null },
  window:   { open: 'mdi:window-open',     close: 'mdi:window-closed',   stop: null },
};

// — Helpers —

function coverIcon(dc: string, isOpen: boolean): string {
  const pair = DC_ICONS[dc] || DC_ICONS.shutter;
  return pair[isOpen ? 0 : 1];
}

function getTransport(dc: string): TransportInfo {
  if (['shutter', 'blind', 'shade', 'curtain', 'awning'].includes(dc)) return TRANSPORT.vertical;
  return TRANSPORT[dc] || TRANSPORT.vertical;
}

function stateText(state: string): string {
  switch (state) {
    case 'open': return t('cover.open');
    case 'closed': return t('cover.closed');
    case 'opening': return t('cover.opening');
    case 'closing': return t('cover.closing');
    default: return state;
  }
}

// — Cover info interface —

interface CoverInfo {
  entity: HassEntity;
  entityId: string;
  name: string;
  isOpen: boolean;
  position: number | null;
  tiltPosition: number | null;
  deviceClass: string;
  features: number;
}

function buildCoverInfo(entityId: string, entity: HassEntity): CoverInfo {
  const attrs = entity.attributes;
  const dc = (attrs.device_class as string) || 'shutter';
  const features = (attrs.supported_features as number) || 0;
  const pos = attrs.current_position as number | undefined;
  const tilt = attrs.current_tilt_position as number | undefined;
  const isOpen = entity.state === 'open' || entity.state === 'opening';

  return {
    entity,
    entityId,
    name: (attrs.friendly_name as string) || entityId.split('.')[1] || entityId,
    isOpen,
    position: pos ?? null,
    tiltPosition: tilt ?? null,
    deviceClass: dc,
    features,
  };
}

// — Backend config —

interface CoverBackendConfig {
  show_header: boolean;
  dashboard_entities: string[];
  presets: number[];
  entity_presets: Record<string, number[]>;
}

interface RoomCoverConfig {
  hidden_entities: string[];
  entity_order: string[];
  entity_layouts: Record<string, string>;
}

// — Card —

class GlassCoverCard extends BaseCard {
  @property() areaId?: string;

  @state() private _expanded: string | null = null;

  private _coverConfig: CoverBackendConfig = { show_header: true, dashboard_entities: [], presets: [0, 25, 50, 75, 100], entity_presets: {} };
  private _roomConfig: RoomCoverConfig | null = null;
  private _backend: BackendService | undefined;
  private _configLoaded = false;
  private _configLoading = false;
  private _roomLoading = false;
  private _lastAreaId: string | undefined;
  private _throttleTimers = new Map<string, number>();
  private _sliderCleanups: (() => void)[] = [];
  private _coversCache: CoverInfo[] | null = null;
  private _coversCacheKey = '';

  static styles = [glassTokens, glassMixin, foldMixin, marqueeMixin, bounceMixin, css`
    :host {
      display: block;
      width: 100%;
      max-width: 500px;
      margin: 0 auto;
      font-family: 'Plus Jakarta Sans', sans-serif;
    }

    .cover-header {
      display: flex; align-items: center; justify-content: space-between;
      padding: 0 6px;
      margin-bottom: 6px; min-height: 22px;
    }
    .cover-header-left { display: flex; align-items: center; gap: 8px; }
    .cover-title {
      font-size: 9px; font-weight: 700; text-transform: uppercase;
      letter-spacing: 1.5px; color: var(--t4);
    }
    .cover-count {
      display: inline-flex; align-items: center; justify-content: center;
      min-width: 14px; height: 14px; padding: 0 4px;
      border-radius: var(--radius-full); font-size: 9px; font-weight: 600;
      transition: all var(--t-med);
    }
    .cover-count.some { background: rgba(167,139,250,0.15); color: var(--cv-color, #a78bfa); }
    .cover-count.none { background: var(--s2); color: var(--t3); }
    .cover-count.all  { background: rgba(167,139,250,0.2); color: var(--cv-color, #a78bfa); }

    .cover-header-actions { display: flex; gap: 4px; }
    .header-btn {
      width: 22px; height: 22px; border-radius: var(--radius-sm);
      background: var(--s2); border: 1px solid var(--b2);
      display: flex; align-items: center; justify-content: center;
      cursor: pointer; padding: 0; outline: none;
      transition: all var(--t-fast); -webkit-tap-highlight-color: transparent;
    }
    .header-btn ha-icon {
      --mdc-icon-size: 14px;
      display: flex; align-items: center; justify-content: center;
      color: var(--t3); transition: color var(--t-fast);
    }
    @media (hover: hover) and (pointer: fine) {
      .header-btn:hover { background: var(--s3); border-color: var(--b3); }
      .header-btn:hover ha-icon { color: var(--t1); }
    }
    @media (hover: hover) {
      .header-btn:active { transform: scale(0.96); }
    }
    @media (hover: none) {
      .header-btn:active { animation: bounce 0.3s ease; }
    }
    .header-btn:focus-visible { outline: 2px solid rgba(255,255,255,0.25); outline-offset: -2px; }

    .cover-card { position: relative; padding: 2px 14px; }
    .card-inner {
      position: relative; z-index: 1;
      display: grid; grid-template-columns: 1fr 1fr; gap: 0;
    }

    /* Tint */
    .tint {
      position: absolute; inset: 0; border-radius: inherit;
      pointer-events: none; z-index: 0;
      transition: opacity var(--t-slow), background var(--t-slow);
    }

    /* ── Row ── */
    .cv-row {
      display: flex; align-items: center; gap: 10px;
      grid-column: 1 / -1;
      padding: 8px 4px; position: relative;
      border-radius: var(--radius-md);
      transition: background var(--t-fast);
    }
    .cv-row.compact { grid-column: span 1; min-width: 0; overflow: hidden; }
    .cv-row.compact-right { padding-left: 10px; }
    .cv-row.compact-right::before {
      content: ''; position: absolute; left: 0; top: 20%; bottom: 20%; width: 1px;
      background: linear-gradient(180deg, transparent, var(--b2), transparent);
    }
    @media (hover: hover) and (pointer: fine) {
      .cv-row:hover { background: var(--s1); }
    }
    @media (hover: none) {
      .cv-row:active { animation: bounce 0.3s ease; }
    }
    .cv-row:focus-within { background: var(--s1); }

    .cv-expand-btn {
      flex: 1; min-width: 0;
      display: flex; align-items: center; gap: 10px;
      background: none; border: none; padding: 0;
      font-family: inherit; cursor: pointer; outline: none;
      text-align: left;
      -webkit-tap-highlight-color: transparent;
    }
    .cv-expand-btn:focus-visible { outline: 2px solid rgba(255,255,255,0.25); outline-offset: 2px; border-radius: var(--radius-sm); }

    .cv-icon-btn {
      width: 36px; height: 36px; border-radius: var(--radius-md);
      background: var(--s2); border: 1px solid var(--b1);
      display: flex; align-items: center; justify-content: center; flex-shrink: 0;
      transition: all var(--t-fast);
      cursor: pointer; padding: 0; outline: none;
      -webkit-tap-highlight-color: transparent;
    }
    .cv-icon-btn ha-icon {
      --mdc-icon-size: 18px;
      display: flex; align-items: center; justify-content: center;
      color: var(--t3); transition: all var(--t-fast);
    }
    @media (hover: hover) and (pointer: fine) {
      .cv-icon-btn:hover { background: var(--s3); border-color: var(--b2); }
      .cv-icon-btn:hover ha-icon { color: var(--t2); }
    }
    @media (hover: hover) {
      .cv-icon-btn:active { transform: scale(0.96); }
    }
    @media (hover: none) {
      .cv-icon-btn:active { animation: bounce 0.3s ease; }
    }
    .cv-icon-btn:focus-visible { outline: 2px solid rgba(255,255,255,0.25); outline-offset: -2px; }
    .cv-row.open .cv-icon-btn { background: rgba(167,139,250,0.1); border-color: rgba(167,139,250,0.15); }
    .cv-row.open .cv-icon-btn ha-icon { color: var(--cv-color, #a78bfa); filter: drop-shadow(0 0 6px rgba(167,139,250,0.4)); }

    .cv-info { flex: 1; min-width: 0; }
    .cv-name {
      font-size: 13px; font-weight: 600; color: var(--t1); line-height: 1.2;
      overflow: hidden; white-space: nowrap;
    }
    .cv-sub { display: flex; align-items: center; gap: 5px; margin-top: 2px; }
    .cv-state-text {
      font-size: 10px; font-weight: 500; color: var(--t3);
      transition: color var(--t-med);
    }
    .cv-row.open .cv-state-text { color: rgba(167,139,250,0.6); }
    .cv-position {
      font-size: 16px; font-weight: 700; color: var(--t3);
      font-variant-numeric: tabular-nums; flex-shrink: 0;
      transition: color var(--t-med);
    }
    .cv-position .unit { font-size: 10px; font-weight: 500; }
    .cv-row.open .cv-position { color: var(--cv-color, #a78bfa); }

    .cv-dot {
      width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0;
      background: var(--t4); transition: all var(--t-med);
    }
    .cv-row.open .cv-dot {
      background: var(--cv-color, #a78bfa); box-shadow: 0 0 8px rgba(167,139,250,0.4);
    }

    /* ── Fold ── */
    .fold-sep {
      grid-column: 1 / -1;
      height: 0; margin: 0 12px; overflow: hidden;
      background: linear-gradient(90deg, transparent, rgba(167,139,250,0.25), transparent);
      opacity: 0; transition: opacity 0.25s var(--ease-std, ease), height 0.25s var(--ease-std, ease);
    }
    .fold-sep.visible { height: 1px; opacity: 1; }

    .ctrl-fold {
      grid-column: 1 / -1;
      display: grid; grid-template-rows: 0fr;
      transition: grid-template-rows var(--t-layout);
    }
    .ctrl-fold.open { grid-template-rows: 1fr; }
    .ctrl-fold-inner {
      overflow: hidden; opacity: 0;
      transition: opacity 0.25s var(--ease-std, ease);
    }
    .ctrl-fold.open .ctrl-fold-inner { opacity: 1; transition-delay: 0.1s; }

    .ctrl-panel {
      padding: 6px 0 4px;
      display: flex; flex-direction: column; gap: 10px;
    }
    .ctrl-label {
      font-size: 10px; font-weight: 600; letter-spacing: 0.5px;
      color: rgba(167,139,250,0.6); text-transform: uppercase;
    }

    /* Transport */
    .transport-row {
      display: flex; align-items: center; justify-content: center; gap: 6px;
    }
    .transport-btn {
      width: 44px; height: 44px; border-radius: 14px;
      background: var(--s2); border: 1px solid var(--b2);
      display: flex; align-items: center; justify-content: center;
      cursor: pointer; transition: all var(--t-fast); outline: none; padding: 0;
      -webkit-tap-highlight-color: transparent;
    }
    .transport-btn ha-icon {
      --mdc-icon-size: 22px;
      display: flex; align-items: center; justify-content: center;
      color: var(--t2); transition: color var(--t-fast);
    }
    @media (hover: hover) and (pointer: fine) {
      .transport-btn:hover { background: var(--s3); border-color: var(--b3); }
      .transport-btn:hover ha-icon { color: var(--t1); }
    }
    @media (hover: hover) {
      .transport-btn:active { transform: scale(0.96); }
    }
    @media (hover: none) {
      .transport-btn:active { animation: bounce 0.3s ease; }
    }
    .transport-btn:focus-visible { outline: 2px solid rgba(255,255,255,0.25); outline-offset: -2px; }
    .transport-btn.accent { background: rgba(167,139,250,0.1); border-color: rgba(167,139,250,0.15); }
    .transport-btn.accent ha-icon { color: var(--cv-color, #a78bfa); }

    /* Slider */
    .slider-wrap { display: flex; align-items: center; gap: 8px; }
    .slider-icon {
      display: flex; align-items: center; justify-content: center;
      width: 28px; height: 28px; flex-shrink: 0;
    }
    .slider-icon ha-icon {
      --mdc-icon-size: 18px;
      display: flex; align-items: center; justify-content: center;
      color: var(--t3);
    }
    .slider {
      position: relative; flex: 1; height: 36px;
      border-radius: var(--radius-lg); background: var(--s1);
      border: 1px solid var(--b1); overflow: hidden; cursor: pointer;
      touch-action: none; user-select: none; -webkit-user-select: none;
    }
    .slider-fill {
      position: absolute; top: 0; left: 0; height: 100%;
      border-radius: inherit; pointer-events: none;
      background: linear-gradient(90deg, rgba(167,139,250,0.15), rgba(167,139,250,0.25));
      transition: width 0.05s linear;
    }
    .slider-thumb {
      position: absolute; top: 50%; transform: translate(-50%, -50%);
      width: 8px; height: 20px; border-radius: 4px;
      background: rgba(255,255,255,0.7); box-shadow: 0 0 8px rgba(255,255,255,0.2);
      pointer-events: none; transition: left 0.05s linear;
    }
    .slider-val {
      position: absolute; top: 50%; right: 12px; transform: translateY(-50%);
      font-size: 11px; font-weight: 600; color: var(--t3); pointer-events: none;
    }

    /* Presets */
    .preset-row { display: flex; gap: 6px; flex-wrap: wrap; }
    .chip {
      display: inline-flex; align-items: center; gap: 5px;
      padding: 5px 12px; border-radius: var(--radius-md);
      border: 1px solid var(--b2); background: var(--s1);
      font-family: inherit; font-size: 11px; font-weight: 600;
      color: var(--t3); cursor: pointer; transition: all var(--t-fast);
      outline: none; -webkit-tap-highlight-color: transparent;
    }
    .chip ha-icon {
      --mdc-icon-size: 14px;
      display: flex; align-items: center; justify-content: center;
    }
    @media (hover: hover) and (pointer: fine) {
      .chip:hover { background: var(--s3); color: var(--t2); border-color: var(--b3); }
    }
    .chip:focus-visible { outline: 2px solid rgba(255,255,255,0.25); outline-offset: -2px; }
    @media (hover: hover) {
      .chip:active { transform: scale(0.96); }
    }
    @media (hover: none) {
      .chip:active { animation: bounce 0.3s ease; }
    }
    .chip.active { border-color: rgba(167,139,250,0.15); background: rgba(167,139,250,0.1); color: var(--cv-color, #a78bfa); }

    .ctrl-sep { height: 1px; background: var(--b1); margin: 2px 0; }
  `];

  connectedCallback(): void {
    super.connectedCallback();
    this._listen('cover-config-changed', () => { this._coversCacheKey = ''; this._loadConfig(); });
    this._listen('room-config-changed', (payload) => {
      if (this.areaId && payload.areaId === this.areaId) {
        this._roomConfig = null;
        this._coversCacheKey = '';
        this._loadRoomConfig(this.areaId);
      }
    });
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._backend = undefined;
    this._configLoaded = false;
    this._configLoading = false;
    this._roomLoading = false;
    for (const timer of this._throttleTimers.values()) clearTimeout(timer);
    this._throttleTimers.clear();
    for (const cleanup of this._sliderCleanups) cleanup();
    this._sliderCleanups = [];
  }

  protected _collapseExpanded(): void {
    if (this._expanded !== null) this._expanded = null;
  }

  protected updated(changedProps: PropertyValues): void {
    super.updated(changedProps);
    if (changedProps.has('hass') && this.hass) {
      if (this._backend && this._backend.connection !== this.hass.connection) {
        this._backend = undefined;
        this._configLoaded = false;
        this._configLoading = false;
        this._roomConfig = null;
        this._roomLoading = false;
      }
      if (!this._configLoaded && !this._configLoading) {
        this._backend = new BackendService(this.hass);
        this._loadConfig();
      }
    }
    if (changedProps.has('areaId') && this.areaId !== this._lastAreaId) {
      this._lastAreaId = this.areaId;
      this._roomConfig = null;
      this._expanded = null;
      if (this.areaId) this._loadRoomConfig(this.areaId);
    }
  }

  protected getTrackedEntityIds(): string[] {
    return this._getCovers().map((c) => c.entityId);
  }

  // — Config loading —

  private async _loadConfig(): Promise<void> {
    if (!this._backend || this._configLoading) return;
    this._configLoading = true;
    try {
      const result = await this._backend.send<{
        cover_card?: CoverBackendConfig;
      }>('get_config');
      if (result?.cover_card) {
        this._coverConfig = result.cover_card;
      }
      this._configLoaded = true;
      this._configLoading = false;
      if (this.areaId) this._loadRoomConfig(this.areaId);
      this.requestUpdate();
    } catch {
      this._configLoading = false;
    }
  }

  private async _loadRoomConfig(areaId: string): Promise<void> {
    if (!this._backend || this._roomLoading) return;
    this._roomLoading = true;
    try {
      const result = await this._backend.send<RoomCoverConfig | null>('get_room', { area_id: areaId });
      if (this.areaId === areaId) {
        this._roomConfig = result ? { ...result, entity_layouts: result.entity_layouts ?? {} } : null;
        this.requestUpdate();
      }
    } catch {
      // ignore
    } finally {
      this._roomLoading = false;
    }
  }

  // — Entity discovery —

  private _getCovers(): CoverInfo[] {
    if (!this.hass) return [];

    let entityIds: string[];

    if (this.areaId) {
      // Room mode: get covers from area
      const areaEntities = getAreaEntities(this.areaId, this.hass.entities, this.hass.devices);
      entityIds = areaEntities
        .filter((e) => e.entity_id.startsWith('cover.'))
        .map((e) => e.entity_id);

      // Apply room config (order + hidden)
      if (this._roomConfig) {
        const hidden = new Set(this._roomConfig.hidden_entities);
        entityIds = entityIds.filter((id) => !hidden.has(id));
        const order = this._roomConfig.entity_order;
        entityIds.sort((a, b) => {
          const ai = order.indexOf(a);
          const bi = order.indexOf(b);
          if (ai !== -1 && bi !== -1) return ai - bi;
          if (ai !== -1) return -1;
          if (bi !== -1) return 1;
          return 0;
        });
      }
    } else {
      // Dashboard mode: use selected entities
      entityIds = this._coverConfig.dashboard_entities;
    }

    // Build fingerprint to cache results
    const fp = entityIds.map((id) => {
      const e = this.hass?.states[id];
      return e ? `${id}:${e.state}:${e.attributes.current_position}:${e.attributes.current_tilt_position}` : id;
    }).join('|');

    if (fp === this._coversCacheKey && this._coversCache) return this._coversCache;

    this._coversCache = entityIds
      .map((id) => {
        const entity = this.hass?.states[id];
        if (!entity) return null;
        return buildCoverInfo(id, entity);
      })
      .filter((c): c is CoverInfo => c !== null);
    this._coversCacheKey = fp;
    return this._coversCache;
  }

  // — Actions —

  private _toggleCover(cv: CoverInfo, e: Event) {
    e.stopPropagation();
    if (!this.hass) return;
    this.hass.callService('cover', 'toggle', {}, { entity_id: cv.entityId });
  }

  private _openCover(cv: CoverInfo, e: Event) {
    e.stopPropagation();
    if (!this.hass) return;
    this.hass.callService('cover', 'open_cover', {}, { entity_id: cv.entityId });
  }

  private _closeCover(cv: CoverInfo, e: Event) {
    e.stopPropagation();
    if (!this.hass) return;
    this.hass.callService('cover', 'close_cover', {}, { entity_id: cv.entityId });
  }

  private _stopCover(cv: CoverInfo, e: Event) {
    e.stopPropagation();
    if (!this.hass) return;
    this.hass.callService('cover', 'stop_cover', {}, { entity_id: cv.entityId });
  }

  private _setPosition(cv: CoverInfo, position: number) {
    if (!this.hass) return;
    // Throttle position updates (50ms)
    const existing = this._throttleTimers.get(cv.entityId);
    if (existing) clearTimeout(existing);
    this._throttleTimers.set(cv.entityId, window.setTimeout(() => {
      this._throttleTimers.delete(cv.entityId);
      this.hass?.callService('cover', 'set_cover_position', { position }, { entity_id: cv.entityId });
    }, 50));
  }

  private _setTiltPosition(cv: CoverInfo, tiltPosition: number) {
    if (!this.hass) return;
    const key = `${cv.entityId}_tilt`;
    const existing = this._throttleTimers.get(key);
    if (existing) clearTimeout(existing);
    this._throttleTimers.set(key, window.setTimeout(() => {
      this._throttleTimers.delete(key);
      this.hass?.callService('cover', 'set_cover_tilt_position', { tilt_position: tiltPosition }, { entity_id: cv.entityId });
    }, 50));
  }

  private _openAll() {
    if (!this.hass) return;
    const covers = this._getCovers();
    for (const cv of covers) {
      if (cv.features & F.OPEN) {
        this.hass.callService('cover', 'open_cover', {}, { entity_id: cv.entityId });
      }
    }
  }

  private _closeAll() {
    if (!this.hass) return;
    const covers = this._getCovers();
    for (const cv of covers) {
      if (cv.features & F.CLOSE) {
        this.hass.callService('cover', 'close_cover', {}, { entity_id: cv.entityId });
      }
    }
  }

  private _setPreset(cv: CoverInfo, position: number, e: Event) {
    e.stopPropagation();
    if (!this.hass) return;
    if (cv.features & F.SET_POSITION) {
      this.hass.callService('cover', 'set_cover_position', { position }, { entity_id: cv.entityId });
    } else if (position > 0) {
      this.hass.callService('cover', 'open_cover', {}, { entity_id: cv.entityId });
    } else {
      this.hass.callService('cover', 'close_cover', {}, { entity_id: cv.entityId });
    }
  }

  private _toggleExpand(entityId: string) {
    this._expanded = this._expanded === entityId ? null : entityId;
  }

  // — Slider interaction —

  private _onSliderDown(cv: CoverInfo, type: 'position' | 'tilt', e: PointerEvent) {
    e.stopPropagation();
    const slider = e.currentTarget as HTMLElement;
    slider.setPointerCapture(e.pointerId);
    const ac = new AbortController();
    const { signal } = ac;

    const update = (evt: PointerEvent) => {
      const rect = slider.getBoundingClientRect();
      const pct = Math.max(0, Math.min(100, Math.round(((evt.clientX - rect.left) / rect.width) * 100)));
      if (type === 'position') {
        this._setPosition(cv, pct);
      } else {
        this._setTiltPosition(cv, pct);
      }
    };

    update(e);

    const done = () => {
      ac.abort();
      try { slider.releasePointerCapture(e.pointerId); } catch { /* already released */ }
      this._sliderCleanups = this._sliderCleanups.filter((c) => c !== done);
    };
    this._sliderCleanups.push(done);
    slider.addEventListener('pointermove', (evt) => update(evt as PointerEvent), { signal });
    slider.addEventListener('pointerup', done, { signal });
    slider.addEventListener('pointercancel', done, { signal });
  }

  // — Render —

  protected render() {
    void this._lang;
    const covers = this._getCovers();
    if (covers.length === 0 && !this.areaId) {
      this.style.display = 'none';
      return nothing;
    }
    this.style.display = '';

    const showHeader = this._coverConfig.show_header;
    const openCount = covers.filter((c) => c.isOpen).length;
    const total = covers.length;

    return html`
      ${showHeader ? html`
        <div class="cover-header">
          <div class="cover-header-left">
            <span class="cover-title">${t('cover.title')}</span>
            <span class="cover-count ${openCount === 0 ? 'none' : openCount === total ? 'all' : 'some'}">${openCount}/${total}</span>
          </div>
          <div class="cover-header-actions">
            <button class="header-btn" @click=${() => this._openAll()} aria-label=${t('cover.open_all_aria')}>
              <ha-icon .icon=${'mdi:arrow-up'}></ha-icon>
            </button>
            <button class="header-btn" @click=${() => this._closeAll()} aria-label=${t('cover.close_all_aria')}>
              <ha-icon .icon=${'mdi:arrow-down'}></ha-icon>
            </button>
          </div>
        </div>
      ` : nothing}
      <div class="glass cover-card">
        <div class="tint" style="background:radial-gradient(ellipse at 50% 50%, var(--cv-color, #a78bfa), transparent 70%);opacity:${total > 0 ? (openCount / total * 0.18).toFixed(3) : '0'};"></div>
        <div class="card-inner">
          ${covers.length === 0 ? html`
            <div style="padding:16px;text-align:center;font-size:12px;color:var(--t4);grid-column:1/-1;">${t('config.cover_no_covers')}</div>
          ` : nothing}
          ${!this.areaId ? this._renderDashboardGrid(covers) : this._renderGrid(covers)}
        </div>
      </div>
    `;
  }

  private _getEntityLayout(entityId: string): 'full' | 'compact' {
    const layouts = this._roomConfig?.entity_layouts ?? {};
    const layout = layouts[entityId];
    return (layout as 'full' | 'compact') === 'full' ? 'full' : 'compact';
  }

  private _isCompact(cv: CoverInfo): boolean {
    return this._getEntityLayout(cv.entityId) === 'compact';
  }

  private _renderGrid(covers: CoverInfo[]) {
    const results: unknown[] = [];
    let i = 0;
    while (i < covers.length) {
      const cv = covers[i];
      if (this._isCompact(cv)) {
        const next = i + 1 < covers.length && this._isCompact(covers[i + 1]) ? covers[i + 1] : null;
        if (next) {
          const last = i + 2 >= covers.length;
          results.push(this._renderCoverRow(cv, true, false));
          results.push(this._renderCoverRow(next, true, true));
          results.push(this._renderControlFold(cv, last));
          results.push(this._renderControlFold(next, last));
          i += 2;
        } else {
          const last = i + 1 >= covers.length;
          results.push(this._renderCoverRow(cv, false, false));
          results.push(this._renderControlFold(cv, last));
          i++;
        }
      } else {
        const last = i + 1 >= covers.length;
        results.push(this._renderCoverRow(cv, false, false));
        results.push(this._renderControlFold(cv, last));
        i++;
      }
    }
    return results;
  }

  private _renderDashboardGrid(covers: CoverInfo[]) {
    const results: unknown[] = [];
    let i = 0;
    while (i < covers.length) {
      const left = covers[i];
      const right = i + 1 < covers.length ? covers[i + 1] : null;
      if (right) {
        const last = i + 2 >= covers.length;
        results.push(this._renderCoverRow(left, true, false));
        results.push(this._renderCoverRow(right, true, true));
        results.push(this._renderControlFold(left, last));
        results.push(this._renderControlFold(right, last));
        i += 2;
      } else {
        results.push(this._renderCoverRow(left, false, false));
        results.push(this._renderControlFold(left, true));
        i++;
      }
    }
    return results;
  }

  private _renderCoverRow(cv: CoverInfo, compact = false, isRight = false) {
    const isExpanded = this._expanded === cv.entityId;
    const rowClasses = ['cv-row', cv.isOpen ? 'open' : '', compact ? 'compact' : '', isRight ? 'compact-right' : '']
      .filter(Boolean).join(' ');
    return html`
      <div class=${rowClasses}>
        <button
          class="cv-icon-btn"
          @click=${(e: Event) => this._toggleCover(cv, e)}
          aria-label=${t('cover.toggle_aria', { name: cv.name })}
        >
          <ha-icon .icon=${coverIcon(cv.deviceClass, cv.isOpen)}></ha-icon>
        </button>
        <button
          class="cv-expand-btn"
          @click=${() => this._toggleExpand(cv.entityId)}
          aria-expanded=${isExpanded ? 'true' : 'false'}
          aria-label=${t('cover.expand_aria', { name: cv.name })}
        >
          <div class="cv-info">
            <div class="cv-name">${marqueeText(cv.name)}</div>
            <div class="cv-sub">
              <span class="cv-state-text">${stateText(cv.entity.state)}</span>
            </div>
          </div>
          ${cv.position !== null ? html`
            <div class="cv-position">${cv.position}<span class="unit">%</span></div>
          ` : nothing}
          <div class="cv-dot"></div>
        </button>
      </div>
    `;
  }

  private _renderControlFold(cv: CoverInfo, isLast = false) {
    const isExpanded = this._expanded === cv.entityId;
    return html`
      <div class="fold-sep ${isExpanded ? 'visible' : ''}"></div>
      <div class="ctrl-fold ${isExpanded ? 'open' : ''}">
        <div class="ctrl-fold-inner">
          ${isExpanded ? this._renderControls(cv) : nothing}
        </div>
      </div>
      ${!isLast ? html`<div class="fold-sep ${isExpanded ? 'visible' : ''}"></div>` : nothing}
    `;
  }

  private _renderControls(cv: CoverInfo) {
    const sf = cv.features;
    const tp = getTransport(cv.deviceClass);
    const hasPosition = !!(sf & F.SET_POSITION);
    const hasTilt = !!(sf & F.SET_TILT_POSITION);

    // Presets: per-entity overrides take priority over global defaults
    const presets: { label: string; icon: string; position: number }[] = [];
    if (hasPosition) {
      const entityPresets = this._coverConfig.entity_presets[cv.entityId];
      const configPresets = entityPresets && entityPresets.length > 0
        ? entityPresets
        : this._coverConfig.presets.length > 0
          ? this._coverConfig.presets
          : [0, 25, 50, 75, 100];
      for (const p of configPresets) {
        const isOpen = p >= 50;
        const label = p === 0
          ? t('cover.preset_closed')
          : p === 100
            ? t('cover.preset_open')
            : `${p}%`;
        presets.push({
          label,
          icon: coverIcon(cv.deviceClass, isOpen),
          position: p,
        });
      }
    } else {
      presets.push(
        { label: t('cover.preset_closed'), icon: coverIcon(cv.deviceClass, false), position: 0 },
        { label: t('cover.preset_open'), icon: coverIcon(cv.deviceClass, true), position: 100 },
      );
    }

    return html`
      <div class="ctrl-panel">
        <span class="ctrl-label">${cv.name}</span>

        <!-- Transport -->
        <div class="transport-row">
          ${sf & F.OPEN ? html`
            <button class="transport-btn ${cv.position === 100 || (cv.position === null && cv.isOpen) ? 'accent' : ''}"
              @click=${(e: Event) => this._openCover(cv, e)}
              aria-label=${t('cover.open_aria', { name: cv.name })}>
              <ha-icon .icon=${tp.open}></ha-icon>
            </button>
          ` : nothing}
          ${sf & F.STOP ? html`
            <button class="transport-btn"
              @click=${(e: Event) => this._stopCover(cv, e)}
              aria-label=${t('cover.stop_aria', { name: cv.name })}>
              <ha-icon .icon=${tp.stop || 'mdi:stop'}></ha-icon>
            </button>
          ` : nothing}
          ${sf & F.CLOSE ? html`
            <button class="transport-btn ${cv.position === 0 || (cv.position === null && !cv.isOpen) ? 'accent' : ''}"
              @click=${(e: Event) => this._closeCover(cv, e)}
              aria-label=${t('cover.close_aria', { name: cv.name })}>
              <ha-icon .icon=${tp.close}></ha-icon>
            </button>
          ` : nothing}
        </div>

        <!-- Position slider -->
        ${hasPosition ? html`
          <div class="slider-wrap">
            <div class="slider-icon"><ha-icon .icon=${coverIcon(cv.deviceClass, false)}></ha-icon></div>
            <div class="slider" @pointerdown=${(e: PointerEvent) => this._onSliderDown(cv, 'position', e)}>
              <div class="slider-fill" style="width:${cv.position ?? 0}%;"></div>
              <div class="slider-thumb" style="left:${cv.position ?? 0}%;"></div>
              <div class="slider-val">${cv.position ?? 0}%</div>
            </div>
            <div class="slider-icon"><ha-icon .icon=${coverIcon(cv.deviceClass, true)}></ha-icon></div>
          </div>
        ` : nothing}

        <!-- Tilt slider -->
        ${hasTilt ? html`
          <span class="ctrl-label">${t('cover.tilt')}</span>
          <div class="slider-wrap">
            <div class="slider-icon"><ha-icon .icon=${'mdi:blinds'}></ha-icon></div>
            <div class="slider" @pointerdown=${(e: PointerEvent) => this._onSliderDown(cv, 'tilt', e)}>
              <div class="slider-fill" style="width:${cv.tiltPosition ?? 0}%;"></div>
              <div class="slider-thumb" style="left:${cv.tiltPosition ?? 0}%;"></div>
              <div class="slider-val">${cv.tiltPosition ?? 0}%</div>
            </div>
            <div class="slider-icon"><ha-icon .icon=${'mdi:blinds-open'}></ha-icon></div>
          </div>
        ` : nothing}

        <!-- Presets -->
        <div class="ctrl-sep"></div>
        <div class="preset-row">
          ${presets.map((p) => html`
            <button
              class="chip ${cv.position === p.position ? 'active' : ''}"
              @click=${(e: Event) => this._setPreset(cv, p.position, e)}
              aria-label=${p.label}
            >
              <ha-icon .icon=${p.icon}></ha-icon>
              <span>${p.label}</span>
            </button>
          `)}
        </div>
      </div>
    `;
  }
}

try { customElements.define('glass-cover-card', GlassCoverCard); } catch { /* already registered */ }
