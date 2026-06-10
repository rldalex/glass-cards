import { html, nothing, type PropertyValues } from 'lit';
import { property, state } from 'lit/decorators.js';
import {
  BaseCard,
  BackendService,
  getAreaEntities,
  isEntityVisibleNow,
  fireHaptic,
  type EntityScheduleMap,
} from '@glass-cards/base-card';
import './editor';
import { glassTokens, hostMixin, glassMixin, foldMixin, marqueeMixin, bounceMixin, unavailableMixin, isEntityUnavailable } from '@glass-cards/ui-core';
import { t } from '@glass-cards/i18n';
import {
  type CoverInfo,
  F, coverIcon, getTransport, stateLabelKey, buildCoverInfo, buildPresets, buildLayout,
} from './cover-utils';
import { coverCardStyles } from './styles';

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
  @state() private _dragValues = new Map<string, number>();

  @state() private _coverConfig: CoverBackendConfig = { show_header: true, dashboard_entities: [], entity_presets: {} };
  private _roomConfig: RoomCoverConfig | null = null;
  private _backend: BackendService | undefined;
  private _configLoaded = false;
  private _roomConfigLoaded = false;
  private _lastLoadedAreaId: string | undefined;
  private _schedules: EntityScheduleMap | null = null;
  private _schedulesLoaded = false;
  private _throttleTimers = new Map<string, number>();
  private _lastDirection = new Map<string, 'opening' | 'closing'>();

  private _coversCache: CoverInfo[] | null = null;
  private _coversCacheKey = '';

  static styles = [glassTokens, hostMixin, glassMixin, foldMixin, marqueeMixin, bounceMixin, unavailableMixin, coverCardStyles];

  connectedCallback(): void {
    super.connectedCallback();
    this._listen('cover-config-changed', () => {
      this._configLoaded = false;
      this._coversCacheKey = '';
      this._loadConfig();
    });
    this._listen('room-config-changed', (payload) => {
      if (this.areaId && payload.areaId === this.areaId) {
        this._roomConfigLoaded = false;
        this._coversCacheKey = '';
        this._loadRoomConfig();
      }
    });
    this._listen('schedule-changed', () => {
      this._schedulesLoaded = false;
      this._coversCacheKey = '';
      this._loadSchedules();
    });
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._backend = undefined;
    this._configLoaded = false;
    this._roomConfigLoaded = false;
    this._schedulesLoaded = false;
    for (const timer of this._throttleTimers.values()) clearTimeout(timer);
    this._throttleTimers.clear();
    this._lastDirection.clear();
  }

  protected _collapseExpanded(): void {
    if (this._expanded !== null) this._expanded = null;
  }

  protected updated(changedProps: PropertyValues): void {
    super.updated(changedProps);

    // Invalidate backend on WS reconnect
    if (changedProps.has('hass') && this.hass && this._backend && this._backend.connection !== this.hass.connection) {
      this._backend = undefined;
      this._configLoaded = false;
      this._roomConfigLoaded = false;
      this._schedulesLoaded = false;
    }

    if (this.hass && !this._configLoaded) this._loadConfig();
    if (this.hass && !this._schedulesLoaded) this._loadSchedules();

    // Room config: reset on area change, (re)load whenever it is missing —
    // covers the in-flight-load-during-area-change case (the stale load bails
    // out and the next tick retries here).
    if (this.areaId !== this._lastLoadedAreaId) {
      this._lastLoadedAreaId = this.areaId;
      this._roomConfig = null;
      this._roomConfigLoaded = false;
      this._expanded = null;
      this._dragValues = new Map();
      this._lastDirection.clear();
      this._coversCacheKey = '';
    }
    if (this.hass && this.areaId && !this._roomConfigLoaded) this._loadRoomConfig();

    // Clear stale drag values once HA state catches up
    if (changedProps.has('hass') && this._dragValues.size > 0) {
      let changed = false;
      const next = new Map(this._dragValues);
      for (const cv of this._getCovers()) {
        const posDrag = next.get(cv.entityId);
        if (posDrag !== undefined && cv.position !== null && Math.abs(cv.position - posDrag) <= 2) {
          next.delete(cv.entityId);
          changed = true;
        }
        const tiltKey = `${cv.entityId}_tilt`;
        const tiltDrag = next.get(tiltKey);
        if (tiltDrag !== undefined && cv.tiltPosition !== null && Math.abs(cv.tiltPosition - tiltDrag) <= 2) {
          next.delete(tiltKey);
          changed = true;
        }
      }
      if (changed) this._dragValues = next;
    }
  }

  protected getTrackedEntityIds(): string[] {
    return this._getCovers().map((c) => c.entityId);
  }

  // — Config loading —

  private async _loadConfig(): Promise<void> {
    if (!this.hass || this._configLoaded) return;
    this._configLoaded = true;
    try {
      if (!this._backend) this._backend = new BackendService(this.hass);
      const result = await this._backend.send<{
        cover_card?: CoverBackendConfig;
      }>('get_config');
      if (result?.cover_card) {
        this._coverConfig = result.cover_card;
      }
      this._coversCacheKey = '';
      this.requestUpdate();
    } catch {
      this._configLoaded = false;
    }
  }

  private async _loadRoomConfig(): Promise<void> {
    const areaId = this.areaId;
    if (!areaId || !this.hass || this._roomConfigLoaded) return;
    this._roomConfigLoaded = true;
    try {
      if (!this._backend) this._backend = new BackendService(this.hass);
      const result = await this._backend.send<RoomCoverConfig | null>('get_room', { area_id: areaId });
      if (this.areaId !== areaId) return;
      this._roomConfig = result ? { ...result, entity_layouts: result.entity_layouts ?? {} } : null;
      this._coversCacheKey = '';
      this.requestUpdate();
    } catch {
      this._roomConfigLoaded = false;
    }
  }

  private async _loadSchedules(): Promise<void> {
    if (!this.hass || this._schedulesLoaded) return;
    this._schedulesLoaded = true;
    try {
      if (!this._backend) this._backend = new BackendService(this.hass);
      this._schedules = await this._backend.send<EntityScheduleMap>('get_schedules');
      this._coversCacheKey = '';
      this.requestUpdate();
    } catch {
      this._schedulesLoaded = false;
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
        .filter((e) => e.entity_id.startsWith('cover.') && isEntityVisibleNow(e.entity_id, this._schedules))
        .map((e) => e.entity_id);

      // Apply room config (order + hidden)
      if (this._roomConfig) {
        // Defensive defaults: a partial get_room payload without these fields
        // crashed the sort below (undefined.indexOf)
        const hidden = new Set(this._roomConfig.hidden_entities ?? []);
        entityIds = entityIds.filter((id) => !hidden.has(id));
        const order = this._roomConfig.entity_order ?? [];
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
      entityIds = (this._coverConfig.dashboard_entities ?? [])
        .filter((id) => isEntityVisibleNow(id, this._schedules));
    }

    // Build fingerprint to cache results (last_updated covers attribute-only
    // changes: rename, supported_features, device_class…)
    const fp = entityIds.map((id) => {
      const e = this.hass?.states[id];
      return e ? `${id}:${e.state}:${e.last_updated}` : id;
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
      // No STOP feature (doors, dampers…): let the movement finish
      if (!(cv.features & F.STOP)) return;
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

  /** Track the dragged value locally (prevents the slider/label bouncing back
   * to the not-yet-confirmed HA position) and send throttled (during drag)
   * or immediately (on release). */
  private _onSliderValue(key: string, value: number, isFinal: boolean, send: (v: number) => void) {
    if (!this.hass) return;
    const next = new Map(this._dragValues);
    next.set(key, value);
    this._dragValues = next;

    const existing = this._throttleTimers.get(key);
    if (existing) clearTimeout(existing);
    if (isFinal) {
      fireHaptic(this, 'light');
      this._throttleTimers.delete(key);
      send(value);
    } else {
      this._throttleTimers.set(key, window.setTimeout(() => {
        this._throttleTimers.delete(key);
        send(this._dragValues.get(key) ?? value);
      }, 50));
    }
  }

  private _setPosition(cv: CoverInfo, position: number, isFinal: boolean) {
    this._onSliderValue(cv.entityId, position, isFinal, (v) =>
      this._safeCallService('cover', 'set_cover_position', { position: v }, { entity_id: cv.entityId }));
  }

  private _setTiltPosition(cv: CoverInfo, tiltPosition: number, isFinal: boolean) {
    this._onSliderValue(`${cv.entityId}_tilt`, tiltPosition, isFinal, (v) =>
      this._safeCallService('cover', 'set_cover_tilt_position', { tilt_position: v }, { entity_id: cv.entityId }));
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

  private _stateText(state: string): string {
    const key = stateLabelKey(state);
    return key ? t(key) : state;
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
          <glass-toggle
            active-color="purple"
            .checked=${openCount > 0}
            aria-label=${openCount > 0 ? t('cover.close_all_aria') : t('cover.open_all_aria')}
            @glass-toggle-change=${() => openCount > 0 ? this._closeAll() : this._openAll()}
          ></glass-toggle>
        </div>
      ` : nothing}
      <div class="glass cover-card">
        <div class="tint" style="background:radial-gradient(ellipse at 50% 50%, var(--cv-color, #a78bfa), transparent 70%);opacity:${total > 0 ? (openCount / total * 0.18).toFixed(3) : '0'};"></div>
        <div class="card-inner">
          ${covers.length === 0 ? html`
            <div style="padding:16px;text-align:center;font-size:var(--fz-base);color:var(--t4);grid-column:1/-1;">${t('config.cover_no_covers')}</div>
          ` : nothing}
          ${!this.areaId
            ? this._renderLayout(covers, (cv) => this._getDashboardLayout(cv.entityId) === 'compact')
            : this._renderLayout(covers, (cv) => this._isCompact(cv))}
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

  private _getDashboardLayout(entityId: string): 'full' | 'compact' {
    const layouts = this._coverConfig.dashboard_entity_layouts;
    if (layouts && layouts[entityId]) return layouts[entityId] as 'full' | 'compact';
    // Legacy fallback: global dashboard_compact boolean
    return this._coverConfig.dashboard_compact !== false ? 'compact' : 'full';
  }

  /** Shared by room and dashboard mode — only the compact predicate differs. */
  private _renderLayout(covers: CoverInfo[], isCompact: (cv: CoverInfo) => boolean) {
    const results: unknown[] = [];
    for (const item of buildLayout(covers, isCompact)) {
      if (item.kind === 'pair') {
        results.push(this._renderCoverRow(item.left, true, false));
        results.push(this._renderCoverRow(item.right, true, true));
        results.push(this._renderControlFold(item.left, 'left'));
        results.push(this._renderControlFold(item.right, 'right'));
      } else {
        results.push(this._renderCoverRow(item.item, false, false));
        results.push(this._renderControlFold(item.item, 'full'));
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
      exclude: 'glass-icon-button',
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
        <glass-icon-button
          .icon=${coverIcon(cv.deviceClass, cv.isOpen)}
          ?active=${cv.isOpen}
          ?glow=${cv.isOpen}
          ?unavailable=${unavailable}
          active-color="purple"
          aria-label=${t('cover.toggle_aria', { name: cv.name })}
          @click=${(e: Event) => this._toggleCover(cv, e)}
        ></glass-icon-button>
        <button
          class="cv-expand-btn"
          aria-expanded=${isExpanded ? 'true' : 'false'}
          aria-label=${t('cover.expand_aria', { name: cv.name })}
          @click=${(e: MouseEvent) => {
            // detail === 0 → synthetic click from Enter/Space; pointer taps are
            // handled by the row gesture (tap = toggle, long-press = expand).
            if (e.detail === 0) this._toggleExpand(cv.entityId);
          }}
        >
          <div class="cv-info">
            <div class="cv-name">${cv.name}</div>
            <div class="cv-sub">
              <span class="cv-state-text">${this._stateText(cv.entity.state)}</span>
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
          ${this._renderControls(cv)}
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
    const presets = buildPresets(cv.deviceClass, sf, this._coverConfig.entity_presets?.[cv.entityId])
      .map((p) => ({ ...p, label: p.labelKey ? t(p.labelKey) : `${p.position}%` }));

    return html`
      <div class="ctrl-panel">
        <div class="transport-row">
          ${sf & F.OPEN ? html`
            <glass-transport-button
              .icon=${tp.open}
              active-color="purple"
              ?active=${cv.position === 100 || (cv.position === null && cv.isOpen)}
              aria-label=${t('cover.open_aria', { name: cv.name })}
              @click=${(e: Event) => this._openCover(cv, e)}
            ></glass-transport-button>
          ` : nothing}
          ${sf & F.STOP ? html`
            <glass-transport-button
              .icon=${tp.stop || 'mdi:stop'}
              aria-label=${t('cover.stop_aria', { name: cv.name })}
              @click=${(e: Event) => this._stopCover(cv, e)}
            ></glass-transport-button>
          ` : nothing}
          ${sf & F.CLOSE ? html`
            <glass-transport-button
              .icon=${tp.close}
              active-color="purple"
              ?active=${cv.position === 0 || (cv.position === null && !cv.isOpen)}
              aria-label=${t('cover.close_aria', { name: cv.name })}
              @click=${(e: Event) => this._closeCover(cv, e)}
            ></glass-transport-button>
          ` : nothing}
        </div>

        ${hasPosition ? html`
          <div class="cover-section">
            <glass-section-title label=${t('cover.section_position')}></glass-section-title>
            <div class="slider-wrap">
              <div class="slider-icon"><ha-icon .icon=${coverIcon(cv.deviceClass, false)}></ha-icon></div>
              <glass-slider
                .value=${this._dragValues.get(cv.entityId) ?? cv.position ?? 0}
                color="var(--rgb-purple)"
                .label=${`${this._dragValues.get(cv.entityId) ?? cv.position ?? 0}%`}
                @glass-slider-input=${(e: CustomEvent) => this._setPosition(cv, e.detail.value, false)}
                @glass-slider-change=${(e: CustomEvent) => this._setPosition(cv, e.detail.value, true)}
              ></glass-slider>
              <div class="slider-icon"><ha-icon .icon=${coverIcon(cv.deviceClass, true)}></ha-icon></div>
            </div>
          </div>
        ` : nothing}

        ${hasTilt ? html`
          <div class="cover-section">
            <glass-section-title label=${t('cover.section_tilt')}></glass-section-title>
            <div class="slider-wrap">
              <div class="slider-icon"><ha-icon .icon=${'mdi:blinds'}></ha-icon></div>
              <glass-slider
                .value=${this._dragValues.get(`${cv.entityId}_tilt`) ?? cv.tiltPosition ?? 0}
                color="var(--rgb-purple)"
                .label=${`${this._dragValues.get(`${cv.entityId}_tilt`) ?? cv.tiltPosition ?? 0}%`}
                @glass-slider-input=${(e: CustomEvent) => this._setTiltPosition(cv, e.detail.value, false)}
                @glass-slider-change=${(e: CustomEvent) => this._setTiltPosition(cv, e.detail.value, true)}
              ></glass-slider>
              <div class="slider-icon"><ha-icon .icon=${'mdi:blinds-open'}></ha-icon></div>
            </div>
          </div>
        ` : nothing}

        <div class="cover-section">
          <glass-section-title label=${t('cover.section_presets')}></glass-section-title>
          <div class="preset-row">
            ${presets.map((p) => html`
              <glass-chip
                size="sm"
                active-color="purple"
                ?active=${cv.position === p.position}
                .icon=${p.icon}
                aria-label=${p.label}
                @click=${(e: Event) => this._setPreset(cv, p.position, e)}
              >${p.label}</glass-chip>
            `)}
          </div>
        </div>
      </div>
    `;
  }
}

try { customElements.define('glass-cover-card', GlassCoverCard); } catch { /* already registered */ }
