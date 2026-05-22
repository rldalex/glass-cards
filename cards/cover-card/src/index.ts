import { html, css, nothing, type PropertyValues } from 'lit';
import { property, state } from 'lit/decorators.js';
import {
  BaseCard,
  BackendService,
  getAreaEntities,
  fireHaptic,
  type HassEntity,
} from '@glass-cards/base-card';
import './editor';
import { glassTokens, hostMixin, glassMixin, foldMixin, marqueeMixin, bounceMixin, unavailableMixin, isEntityUnavailable } from '@glass-cards/ui-core';
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
  dashboard_compact?: boolean;
  dashboard_entity_layouts?: Record<string, string>;
  presets?: number[];
  entity_presets: Record<string, number[]>;
}

interface RoomCoverConfig {
  hidden_entities: string[];
  entity_order: string[];
  entity_layouts: Record<string, string>;
}

// — Card —

class GlassCoverCard extends BaseCard {
  static getConfigElement() {
    return document.createElement('glass-cover-card-editor');
  }

  getCardSize() {
    return 3;
  }

  @property() areaId?: string;

  @state() private _expanded: string | null = null;

  @state() private _coverConfig: CoverBackendConfig = { show_header: true, dashboard_entities: [], entity_presets: {} };
  private _roomConfig: RoomCoverConfig | null = null;
  private _backend: BackendService | undefined;
  private _configLoaded = false;
  private _configLoading = false;
  private _roomLoading = false;
  private _lastAreaId: string | undefined;
  private _throttleTimers = new Map<string, number>();
  private _lastDirection = new Map<string, 'opening' | 'closing'>();

  private _coversCache: CoverInfo[] | null = null;
  private _coversCacheKey = '';

  static styles = [glassTokens, hostMixin, glassMixin, foldMixin, marqueeMixin, bounceMixin, unavailableMixin, css`
    :host {
      width: 100%;
      user-select: none;
      -webkit-user-select: none;
    }

    .cover-header {
      display: flex; align-items: center; justify-content: space-between;
      padding: 0 0.375rem;
      margin-bottom: 0.375rem; min-height: 1.375rem;
    }
    .cover-header-left { display: flex; align-items: center; gap: 0.5rem; }
    .cover-title {
      font-size: var(--fz-xs); font-weight: 700; text-transform: uppercase;
      letter-spacing: 1.5px; color: var(--t4);
    }
    .cover-count {
      display: inline-flex; align-items: center; justify-content: center;
      min-width: 0.875rem; height: 0.875rem; padding: 0 0.25rem;
      border-radius: var(--radius-full); font-size: var(--fz-xs); font-weight: 600;
      transition: background var(--t-med), color var(--t-med);
    }
    .cover-count.some { background: rgba(var(--rgb-purple),0.15); color: var(--cv-color, #a78bfa); }
    .cover-count.none { background: var(--s2); color: var(--t3); }
    .cover-count.all  { background: rgba(var(--rgb-purple),0.2); color: var(--cv-color, #a78bfa); }

    /* ── Toggle All ── */
    .toggle-all {
      position: relative;
      width: 2.5rem;
      height: 1.375rem;
      border-radius: var(--radius-md);
      background: var(--s2);
      border: 1px solid var(--b2);
      cursor: pointer;
      transition: background var(--t-fast), border-color var(--t-fast);
      padding: 0;
      outline: none;
      font-family: inherit;
      -webkit-tap-highlight-color: transparent;
    }
    .toggle-all::after {
      content: '';
      position: absolute;
      top: 0.1875rem;
      left: 0.1875rem;
      width: 0.875rem;
      height: 0.875rem;
      border-radius: 50%;
      background: var(--t3);
      transition:
        transform var(--t-fast),
        background var(--t-fast),
        box-shadow var(--t-fast);
    }
    .toggle-all.on {
      background: rgba(var(--rgb-purple),0.2);
      border-color: rgba(var(--rgb-purple),0.3);
    }
    .toggle-all.on::after {
      transform: translateX(1.125rem);
      background: var(--cv-color, #a78bfa);
      box-shadow: 0 0 8px rgba(var(--rgb-purple),0.4);
    }
    .toggle-all:focus-visible { outline: 2px solid rgba(var(--rgb-white),0.25); outline-offset: 2px; }

    .cover-card { position: relative; padding: 0.125rem 0.875rem; }
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
      display: flex; align-items: center; gap: 0.625rem;
      grid-column: 1 / -1;
      padding: 0.5rem 0.25rem; position: relative;
      border-radius: var(--radius-md);
      transition: background var(--t-fast);
    }
    .cv-row.compact { grid-column: span 1; min-width: 0; overflow: hidden; }
    .cv-row.compact-right { padding-left: 0.625rem; }
    .cv-row.compact-right::before {
      content: ''; position: absolute; left: 0; top: 20%; bottom: 20%; width: 0.0625rem;
      background: linear-gradient(180deg, transparent, var(--b2), transparent);
    }
    /* No row-level hover: sub-buttons (icon-toggle + expand) carry their own. */
    @media (pointer: coarse) {
      .cv-row:active { animation: bounce 0.3s ease; }
    }


    .cv-expand-btn {
      flex: 1; min-width: 0;
      display: flex; align-items: center; gap: 0.625rem;
      background: none; border: none; padding: 0;
      font-family: inherit; cursor: pointer; outline: none;
      text-align: left;
      -webkit-tap-highlight-color: transparent;
    }
    .cv-expand-btn:focus-visible { outline: 2px solid rgba(var(--rgb-white),0.25); outline-offset: 2px; border-radius: var(--radius-sm); }

    .cv-icon-btn {
      width: var(--tap-lg); height: var(--tap-lg); border-radius: var(--radius-md);
      background: var(--s2); border: 1px solid var(--b1);
      display: flex; align-items: center; justify-content: center; flex-shrink: 0;
      transition: background var(--t-fast), border-color var(--t-fast), transform var(--t-fast);
      cursor: pointer; padding: 0; outline: none;
      -webkit-tap-highlight-color: transparent;
    }
    .cv-icon-btn ha-icon {
      --mdc-icon-size: var(--icon-md);
      display: flex; align-items: center; justify-content: center;
      color: var(--t3); transition: color var(--t-fast), filter var(--t-fast);
    }
    @media (hover: hover) and (pointer: fine) {
      .cv-icon-btn:hover { background: var(--s3); border-color: var(--b2); }
      .cv-icon-btn:hover ha-icon { color: var(--t2); }
    }
    @media (hover: hover) and (pointer: fine) {
      .cv-icon-btn:active { transform: scale(0.96); }
    }
    @media (pointer: coarse) {
      .cv-icon-btn:active { animation: bounce 0.3s ease; }
    }
    .cv-icon-btn:focus-visible { outline: 2px solid rgba(var(--rgb-white),0.25); outline-offset: -2px; }
    .cv-row.open .cv-icon-btn { background: rgba(var(--rgb-purple),0.1); border-color: rgba(var(--rgb-purple),0.15); }
    .cv-row.open .cv-icon-btn ha-icon { color: var(--cv-color, #a78bfa); filter: drop-shadow(0 0 6px rgba(var(--rgb-purple),0.4)); }
    .entity-unavailable .cv-icon-btn { border-color: var(--c-alert); }

    .cv-info { flex: 1; min-width: 0; }
    .cv-name {
      font-size: var(--fz-md); font-weight: 600; color: var(--t1); line-height: 1.2;
      overflow: hidden; white-space: nowrap; text-overflow: ellipsis;
    }
    .cv-sub { display: flex; align-items: center; gap: 0.3125rem; margin-top: 0.125rem; }
    .cv-state-text {
      font-size: var(--fz-sm); font-weight: 500; color: var(--t3);
      transition: color var(--t-med);
    }
    .cv-row.open .cv-state-text { color: rgba(var(--rgb-purple),0.6); }
    .cv-position {
      font-size: var(--fz-lg); font-weight: 700; color: var(--t3);
      font-variant-numeric: tabular-nums; flex-shrink: 0;
      transition: color var(--t-med);
    }
    .cv-position .unit { font-size: var(--fz-sm); font-weight: 500; }
    .cv-row.open .cv-position { color: var(--cv-color, #a78bfa); }

    .cv-dot {
      width: 0.375rem; height: 0.375rem; border-radius: 50%; flex-shrink: 0;
      background: var(--t4); transition: background var(--t-med), box-shadow var(--t-med);
    }
    .cv-row.open .cv-dot {
      background: var(--cv-color, #a78bfa); box-shadow: 0 0 8px rgba(var(--rgb-purple),0.4);
    }

    /* Unavailable badge inline (replaces dot) */
    .cv-expand-btn .unavailable-badge {
      position: static;
      flex-shrink: 0;
      --mdc-icon-size: 0.75rem;
      color: var(--c-warning);
    }

    /* ── Fold ── */
    .fold-sep-left  { grid-column: 1 / -1; width: calc(50% - 0.75rem); margin-right: auto; }
    .fold-sep-right { grid-column: 1 / -1; width: calc(50% - 0.75rem); margin-left: auto; }
    .fold-sep {
      grid-column: 1 / -1;
      height: 0.0625rem; margin: 0 0.75rem; overflow: hidden;
      background: linear-gradient(90deg, transparent, rgba(var(--rgb-purple),0.25), transparent);
      opacity: 0; transition: opacity var(--t-layout);
    }
    .fold-sep.visible { opacity: 1; }

    .ctrl-fold {
      grid-column: 1 / -1;
      display: grid; grid-template-rows: 0fr;
      transition: grid-template-rows var(--t-layout);
    }
    .ctrl-fold.open { grid-template-rows: 1fr; }
    .ctrl-fold-inner {
      overflow: hidden; opacity: 0;
      transition: opacity var(--t-fast);
    }
    .ctrl-fold.open .ctrl-fold-inner { opacity: 1; transition-delay: 0.1s; }

    .ctrl-panel {
      padding: 0.375rem 0 0.25rem;
      display: flex; flex-direction: column; gap: 0.75rem;
    }
    /* ── Fold sections + eyebrow (Position / Inclinaison / Préréglages) ── */
    .cover-section { display: flex; flex-direction: column; gap: 0.4375rem; }
    .cover-eyebrow {
      display: inline-flex; align-items: center; gap: 0.4375rem;
      font-size: var(--fz-xxs); font-weight: 700;
      text-transform: uppercase; letter-spacing: 0.8px;
      color: var(--t4);
      padding-left: 0.125rem;
    }

    /* Transport */
    .transport-row {
      display: flex; align-items: center; justify-content: center; gap: 0.375rem;
    }
    .transport-btn {
      width: var(--tap-lg); height: var(--tap-lg); border-radius: var(--radius-lg);
      background: var(--s2); border: 1px solid var(--b2);
      display: flex; align-items: center; justify-content: center;
      cursor: pointer; transition: background var(--t-fast), border-color var(--t-fast), transform var(--t-fast); outline: none; padding: 0;
      -webkit-tap-highlight-color: transparent;
    }
    .transport-btn ha-icon {
      --mdc-icon-size: var(--icon-lg);
      display: flex; align-items: center; justify-content: center;
      color: var(--t2); transition: color var(--t-fast);
    }
    @media (hover: hover) and (pointer: fine) {
      .transport-btn:hover { background: var(--s3); border-color: var(--b3); }
      .transport-btn:hover ha-icon { color: var(--t1); }
    }
    @media (hover: hover) and (pointer: fine) {
      .transport-btn:active { transform: scale(0.96); }
    }
    @media (pointer: coarse) {
      .transport-btn:active { animation: bounce 0.3s ease; }
    }
    .transport-btn:focus-visible { outline: 2px solid rgba(var(--rgb-white),0.25); outline-offset: -2px; }
    .transport-btn.accent { background: rgba(var(--rgb-purple),0.1); border-color: rgba(var(--rgb-purple),0.15); }
    .transport-btn.accent ha-icon { color: var(--cv-color, #a78bfa); }

    /* Slider */
    .slider-wrap { display: flex; align-items: center; gap: 0.5rem; }
    .slider-icon {
      display: flex; align-items: center; justify-content: center;
      width: 1.75rem; height: 1.75rem; flex-shrink: 0;
    }
    .slider-icon ha-icon {
      --mdc-icon-size: var(--icon-md);
      display: flex; align-items: center; justify-content: center;
      color: var(--t3);
    }
    glass-slider { flex: 1; }

    /* Presets */
    .preset-row { display: flex; gap: 0.375rem; flex-wrap: wrap; }
    .chip {
      display: inline-flex; align-items: center; gap: 0.3125rem;
      padding: 0.3125rem 0.75rem; border-radius: var(--radius-md);
      border: 1px solid var(--b2); background: var(--s1);
      font-family: inherit; font-size: var(--fz-base); font-weight: 600;
      color: var(--t3); cursor: pointer; transition: background var(--t-fast), color var(--t-fast), border-color var(--t-fast), transform var(--t-fast);
      outline: none; -webkit-tap-highlight-color: transparent;
    }
    .chip ha-icon {
      --mdc-icon-size: var(--icon-sm);
      display: flex; align-items: center; justify-content: center;
    }
    @media (hover: hover) and (pointer: fine) {
      .chip:hover { background: var(--s3); color: var(--t2); border-color: var(--b3); }
    }
    .chip:focus-visible { outline: 2px solid rgba(var(--rgb-white),0.25); outline-offset: -2px; }
    @media (hover: hover) and (pointer: fine) {
      .chip:active { transform: scale(0.96); }
    }
    @media (pointer: coarse) {
      .chip:active { animation: bounce 0.3s ease; }
    }
    .chip.active { border-color: rgba(var(--rgb-purple),0.15); background: rgba(var(--rgb-purple),0.1); color: var(--cv-color, #a78bfa); }

    .ctrl-sep { height: 0.0625rem; background: var(--b1); margin: 0.125rem 0; }
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

  private _toggleCover(cv: CoverInfo, e?: Event) {
    e?.stopPropagation();
    if (!this.hass) return;
    const state = cv.entity.state;
    if (state === 'opening' || state === 'closing') {
      this._lastDirection.set(cv.entityId, state);
      this._safeCallService('cover', 'stop_cover', {}, { entity_id: cv.entityId });
    } else if (state === 'closed') {
      this._lastDirection.delete(cv.entityId);
      this._safeCallService('cover', 'open_cover', {}, { entity_id: cv.entityId });
    } else {
      // open or partially open — check if we stopped mid-way
      const last = this._lastDirection.get(cv.entityId);
      this._lastDirection.delete(cv.entityId);
      if (last === 'opening') {
        this._safeCallService('cover', 'close_cover', {}, { entity_id: cv.entityId });
      } else if (last === 'closing') {
        this._safeCallService('cover', 'open_cover', {}, { entity_id: cv.entityId });
      } else {
        this._safeCallService('cover', 'close_cover', {}, { entity_id: cv.entityId });
      }
    }
  }

  private _openCover(cv: CoverInfo, e: Event) {
    e.stopPropagation();
    if (!this.hass) return;
    fireHaptic(this, 'light');
    this._safeCallService('cover', 'open_cover', {}, { entity_id: cv.entityId });
  }

  private _closeCover(cv: CoverInfo, e: Event) {
    e.stopPropagation();
    if (!this.hass) return;
    fireHaptic(this, 'light');
    this._safeCallService('cover', 'close_cover', {}, { entity_id: cv.entityId });
  }

  private _stopCover(cv: CoverInfo, e: Event) {
    e.stopPropagation();
    if (!this.hass) return;
    fireHaptic(this, 'light');
    this._safeCallService('cover', 'stop_cover', {}, { entity_id: cv.entityId });
  }

  private _setPosition(cv: CoverInfo, position: number) {
    if (!this.hass) return;
    // Throttle position updates (50ms)
    const existing = this._throttleTimers.get(cv.entityId);
    if (existing) clearTimeout(existing);
    this._throttleTimers.set(cv.entityId, window.setTimeout(() => {
      this._throttleTimers.delete(cv.entityId);
      this._safeCallService('cover', 'set_cover_position', { position }, { entity_id: cv.entityId });
    }, 50));
  }

  private _setTiltPosition(cv: CoverInfo, tiltPosition: number) {
    if (!this.hass) return;
    const key = `${cv.entityId}_tilt`;
    const existing = this._throttleTimers.get(key);
    if (existing) clearTimeout(existing);
    this._throttleTimers.set(key, window.setTimeout(() => {
      this._throttleTimers.delete(key);
      this._safeCallService('cover', 'set_cover_tilt_position', { tilt_position: tiltPosition }, { entity_id: cv.entityId });
    }, 50));
  }

  private _openAll() {
    if (!this.hass) return;
    const covers = this._getCovers();
    for (const cv of covers) {
      if (cv.features & F.OPEN) {
        this._safeCallService('cover', 'open_cover', {}, { entity_id: cv.entityId });
      }
    }
  }

  private _closeAll() {
    if (!this.hass) return;
    const covers = this._getCovers();
    for (const cv of covers) {
      if (cv.features & F.CLOSE) {
        this._safeCallService('cover', 'close_cover', {}, { entity_id: cv.entityId });
      }
    }
  }

  private _setPreset(cv: CoverInfo, position: number, e: Event) {
    e.stopPropagation();
    if (!this.hass) return;
    fireHaptic(this, 'light');
    if (cv.features & F.SET_POSITION) {
      this._safeCallService('cover', 'set_cover_position', { position }, { entity_id: cv.entityId });
    } else if (position > 0) {
      this._safeCallService('cover', 'open_cover', {}, { entity_id: cv.entityId });
    } else {
      this._safeCallService('cover', 'close_cover', {}, { entity_id: cv.entityId });
    }
  }

  private _toggleExpand(entityId: string) {
    this._expanded = this._expanded === entityId ? null : entityId;
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
          <button
            class="toggle-all ${openCount > 0 ? 'on' : ''}"
            @click=${() => openCount > 0 ? this._closeAll() : this._openAll()}
            role="switch"
            aria-checked=${openCount > 0 ? 'true' : 'false'}
            aria-label=${openCount > 0 ? t('cover.close_all_aria') : t('cover.open_all_aria')}
          ></button>
        </div>
      ` : nothing}
      <div class="glass cover-card">
        <div class="tint" style="background:radial-gradient(ellipse at 50% 50%, var(--cv-color, #a78bfa), transparent 70%);opacity:${total > 0 ? (openCount / total * 0.18).toFixed(3) : '0'};"></div>
        <div class="card-inner">
          ${covers.length === 0 ? html`
            <div style="padding:16px;text-align:center;font-size:var(--fz-base);color:var(--t4);grid-column:1/-1;">${t('config.cover_no_covers')}</div>
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
          results.push(this._renderCoverRow(cv, true, false));
          results.push(this._renderCoverRow(next, true, true));
          results.push(this._renderControlFold(cv, 'left'));
          results.push(this._renderControlFold(next, 'right'));
          i += 2;
        } else {
          results.push(this._renderCoverRow(cv, false, false));
          results.push(this._renderControlFold(cv, 'full'));
          i++;
        }
      } else {
        results.push(this._renderCoverRow(cv, false, false));
        results.push(this._renderControlFold(cv, 'full'));
        i++;
      }
    }
    return results;
  }

  private _getDashboardLayout(entityId: string): 'full' | 'compact' {
    const layouts = this._coverConfig.dashboard_entity_layouts;
    if (layouts && layouts[entityId]) return layouts[entityId] as 'full' | 'compact';
    // Legacy fallback: global dashboard_compact boolean
    return this._coverConfig.dashboard_compact !== false ? 'compact' : 'full';
  }

  private _renderDashboardGrid(covers: CoverInfo[]) {
    const results: unknown[] = [];
    let i = 0;
    while (i < covers.length) {
      const cv = covers[i];
      if (this._getDashboardLayout(cv.entityId) === 'compact') {
        const next = i + 1 < covers.length && this._getDashboardLayout(covers[i + 1].entityId) === 'compact' ? covers[i + 1] : null;
        if (next) {
          results.push(this._renderCoverRow(cv, true, false));
          results.push(this._renderCoverRow(next, true, true));
          results.push(this._renderControlFold(cv, 'left'));
          results.push(this._renderControlFold(next, 'right'));
          i += 2;
        } else {
          results.push(this._renderCoverRow(cv, false, false));
          results.push(this._renderControlFold(cv, 'full'));
          i++;
        }
      } else {
        results.push(this._renderCoverRow(cv, false, false));
        results.push(this._renderControlFold(cv, 'full'));
        i++;
      }
    }
    return results;
  }

  private _renderCoverRow(cv: CoverInfo, compact = false, isRight = false) {
    const isExpanded = this._expanded === cv.entityId;
    const unavailable = isEntityUnavailable(cv.entity.state);
    const rowClasses = ['cv-row', cv.isOpen ? 'open' : '', compact ? 'compact' : '', isRight ? 'compact-right' : '', unavailable ? 'entity-unavailable' : '']
      .filter(Boolean).join(' ');
    const gesture = this._bindGesture({
      onTap: () => this._toggleCover(cv),
      onLongPress: () => this._toggleExpand(cv.entityId),
      exclude: '.cv-icon-btn',
    });
    return html`
      <div
        class=${rowClasses}
        @pointerdown=${gesture.pointerdown}
        @pointerup=${gesture.pointerup}
        @pointermove=${gesture.pointermove}
        @pointercancel=${gesture.pointercancel}
        @contextmenu=${gesture.contextmenu}
      >
        <button
          class="cv-icon-btn"
          @click=${(e: Event) => this._toggleCover(cv, e)}
          aria-label=${t('cover.toggle_aria', { name: cv.name })}
        >
          <ha-icon .icon=${coverIcon(cv.deviceClass, cv.isOpen)}></ha-icon>
        </button>
        <button
          class="cv-expand-btn"
          aria-expanded=${isExpanded ? 'true' : 'false'}
          aria-label=${t('cover.expand_aria', { name: cv.name })}
        >
          <div class="cv-info">
            <div class="cv-name">${cv.name}</div>
            <div class="cv-sub">
              <span class="cv-state-text">${stateText(cv.entity.state)}</span>
            </div>
          </div>
          ${cv.position !== null ? html`
            <div class="cv-position">${cv.position}<span class="unit">%</span></div>
          ` : nothing}
          ${unavailable
            ? html`<span class="unavailable-badge"><ha-icon .icon=${'mdi:alert-circle-outline'}></ha-icon></span>`
            : html`<div class="cv-dot"></div>`}
        </button>
      </div>
    `;
  }

  private _renderControlFold(cv: CoverInfo, position: 'full' | 'left' | 'right' = 'full') {
    const isExpanded = this._expanded === cv.entityId;
    return html`
      <div class="fold-sep fold-sep-${position} ${isExpanded ? 'visible' : ''}"></div>
      <div class="ctrl-fold ${isExpanded ? 'open' : ''}">
        <div class="ctrl-fold-inner">
          ${isExpanded ? this._renderControls(cv) : nothing}
        </div>
      </div>
    `;
  }

  private _renderControls(cv: CoverInfo) {
    const sf = cv.features;
    const tp = getTransport(cv.deviceClass);
    const hasPosition = !!(sf & F.SET_POSITION);
    const hasTilt = !!(sf & F.SET_TILT_POSITION);

    // Presets: per-entity overrides take priority over hardcoded defaults
    const presets: { label: string; icon: string; position: number }[] = [];
    if (hasPosition) {
      const entityPresets = this._coverConfig.entity_presets[cv.entityId];
      const configPresets = entityPresets && entityPresets.length > 0
        ? entityPresets
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

        ${hasPosition ? html`
          <div class="cover-section">
            <div class="cover-eyebrow"><span>${t('cover.section_position')}</span></div>
            <div class="slider-wrap">
              <div class="slider-icon"><ha-icon .icon=${coverIcon(cv.deviceClass, false)}></ha-icon></div>
              <glass-slider
                .value=${cv.position ?? 0}
                color="var(--rgb-purple)"
                .label=${`${cv.position ?? 0}%`}
                @glass-slider-input=${(e: CustomEvent) => this._setPosition(cv, e.detail.value)}
                @glass-slider-change=${(e: CustomEvent) => this._setPosition(cv, e.detail.value)}
              ></glass-slider>
              <div class="slider-icon"><ha-icon .icon=${coverIcon(cv.deviceClass, true)}></ha-icon></div>
            </div>
          </div>
        ` : nothing}

        ${hasTilt ? html`
          <div class="cover-section">
            <div class="cover-eyebrow"><span>${t('cover.section_tilt')}</span></div>
            <div class="slider-wrap">
              <div class="slider-icon"><ha-icon .icon=${'mdi:blinds'}></ha-icon></div>
              <glass-slider
                .value=${cv.tiltPosition ?? 0}
                color="var(--rgb-purple)"
                .label=${`${cv.tiltPosition ?? 0}%`}
                @glass-slider-input=${(e: CustomEvent) => this._setTiltPosition(cv, e.detail.value)}
                @glass-slider-change=${(e: CustomEvent) => this._setTiltPosition(cv, e.detail.value)}
              ></glass-slider>
              <div class="slider-icon"><ha-icon .icon=${'mdi:blinds-open'}></ha-icon></div>
            </div>
          </div>
        ` : nothing}

        <div class="cover-section">
          <div class="cover-eyebrow"><span>${t('cover.section_presets')}</span></div>
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
      </div>
    `;
  }
}

try { customElements.define('glass-cover-card', GlassCoverCard); } catch { /* already registered */ }
