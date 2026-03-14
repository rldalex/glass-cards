import { html, css, nothing, type PropertyValues, type TemplateResult } from 'lit';
import { property, state } from 'lit/decorators.js';
import {
  BaseCard,
  BackendService,
  getAreaEntities,
  isEntityVisibleNow,
  type EntityScheduleMap,
  type HassEntity,
} from '@glass-cards/base-card';
import { glassTokens, glassMixin, foldMixin, marqueeMixin, marqueeText, MARQUEE_COMPACT, bounceMixin } from '@glass-cards/ui-core';
import { t } from '@glass-cards/i18n';
import {
  renderRangeSlider,
  renderHumidityStepper,
  renderAuxHeat,
  type RangeSliderState,
} from './climate-controls';
import {
  CF,
  HVAC_ICONS,
  renderHvacModes,
  renderPresets,
  renderFanModes,
  renderSwingModes,
} from './climate-modes';
import { renderArcGauge } from './climate-arc';
import { ThermalCanvas } from './climate-canvas';

// — Constants —

const ACTION_LABELS: Record<string, string> = {
  heating: 'climate.action_heating',
  cooling: 'climate.action_cooling',
  idle: 'climate.action_idle',
  off: 'climate.action_off',
  drying: 'climate.action_drying',
  preheating: 'climate.action_heating',
};

const ACTION_ORDER: Record<string, number> = { heating: 0, cooling: 1, idle: 2, off: 3 };

// — Backend config interfaces —

interface ClimateBackendConfig {
  show_header: boolean;
  display_mode: 'list' | 'normal';
  dashboard_entities: string[];
}

interface RoomClimateConfig {
  hidden_entities: string[];
  entity_order: string[];
}

// — Component —

export class GlassClimateCard extends BaseCard {
  @property({ attribute: false }) areaId?: string;
  @property({ attribute: false }) visibleAreaIds?: string[];

  // Shared state
  @state() private _showHeader = true;
  @state() private _displayMode: 'list' | 'normal' = 'list';

  // List mode state
  @state() private _expanded: string | null = null;

  // Normal mode state
  @state() private _selectedEntity: string | null = null;
  @state() private _foldOpen = false;

  private _climateConfigLoaded = false;
  private _roomConfig: RoomClimateConfig | null = null;
  private _roomConfigLoaded = false;
  private _roomConfigLoading = false;
  private _lastLoadedAreaId?: string;
  private _backend?: BackendService;
  private _cachedClimateIds?: string[];
  private _cachedClimatesFingerprint = '';
  private _cachedClimatesResult?: HassEntity[];
  private _dashboardEntities: string[] = [];
  private _dashboardHiddenEntities = new Set<string>();
  private _dashboardHiddenLoaded = false;
  private _throttleTimers = new Map<string, ReturnType<typeof setTimeout>>();
  private _pendingTemps = new Map<string, number>();
  private _schedules: EntityScheduleMap | null = null;
  private _schedulesLoaded = false;

  // Range slider drag state
  private _rangeState: RangeSliderState = { dragging: null, lowTemp: 0, highTemp: 0 };
  private _rangeDragEntity: string | null = null;
  private _rangeDragCleanup: (() => void) | null = null;

  // Long-press (normal mode)
  private _lpTimer: ReturnType<typeof setTimeout> | null = null;
  private _lpStartX = 0;
  private _lpStartY = 0;

  // Thermal canvas (normal mode)
  private _thermalCanvas?: ThermalCanvas;

  private get _isDashboardMode(): boolean {
    return !this.areaId;
  }

  // — Lifecycle —

  connectedCallback(): void {
    super.connectedCallback();
    this._listen('climate-config-changed', () => {
      this._climateConfigLoaded = false;
      this._cachedClimateIds = undefined;
      this._cachedClimatesFingerprint = '';
      this._loadConfig();
    });
    this._listen('room-config-changed', (payload) => {
      const area = this.areaId;
      if (area && payload.areaId === area) {
        this._roomConfigLoaded = false;
        this._roomConfig = null;
        this._cachedClimateIds = undefined;
        this._cachedClimatesFingerprint = '';
        this._loadRoomConfig();
      }
      if (this._isDashboardMode) {
        this._dashboardHiddenLoaded = false;
        this._loadDashboardHidden();
      }
    });
    this._listen('dashboard-config-changed', () => {
      this._cachedClimateIds = undefined;
      this._cachedClimatesFingerprint = '';
      this.requestUpdate();
    });
    this._listen('schedule-changed', () => {
      this._schedulesLoaded = false;
      this._loadSchedules();
    });
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._backend = undefined;
    this._climateConfigLoaded = false;
    this._schedulesLoaded = false;
    this._roomConfigLoaded = false;
    this._dashboardHiddenLoaded = false;
    for (const timer of this._throttleTimers.values()) clearTimeout(timer);
    this._throttleTimers.clear();
    this._pendingTemps.clear();
    if (this._rangeDragCleanup) {
      this._rangeDragCleanup();
      this._rangeDragCleanup = null;
    }
    if (this._lpTimer) {
      clearTimeout(this._lpTimer);
      this._lpTimer = null;
    }
    if (this._thermalCanvas) {
      this._thermalCanvas.destroy();
      this._thermalCanvas = undefined;
    }
  }

  protected _collapseExpanded(): void {
    if (this._expanded !== null) this._expanded = null;
    if (this._foldOpen) this._foldOpen = false;
  }

  protected updated(changedProps: PropertyValues): void {
    super.updated(changedProps);

    // Invalidate backend on WS reconnect
    if (changedProps.has('hass') && this.hass && this._backend && this._backend.connection !== this.hass.connection) {
      this._backend = undefined;
      this._climateConfigLoaded = false;
      this._roomConfigLoaded = false;
      this._schedulesLoaded = false;
      this._dashboardHiddenLoaded = false;
    }

    if (this.hass && !this._schedulesLoaded) this._loadSchedules();
    if (this.hass && !this._climateConfigLoaded) this._loadConfig();

    if (this.areaId && this.hass) {
      if (this._lastLoadedAreaId !== this.areaId) this._resetForNewArea();
      if (!this._roomConfigLoaded) this._loadRoomConfig();
    }

    if (this.hass && this._isDashboardMode && !this._dashboardHiddenLoaded) {
      this._loadDashboardHidden();
    }

    // Invalidate structure cache when entities registry changes
    if (changedProps.has('hass') && this.hass) {
      const oldHass = changedProps.get('hass') as { entities?: unknown } | undefined;
      if (oldHass && oldHass.entities !== this.hass.entities) {
        this._cachedClimateIds = undefined;
        this._cachedClimatesFingerprint = '';
      }
    }
    if (changedProps.has('visibleAreaIds')) {
      this._cachedClimateIds = undefined;
      this._cachedClimatesFingerprint = '';
      this._dashboardHiddenLoaded = false;
    }

    // Update thermal canvas for normal mode
    if (this._displayMode === 'normal') {
      this._updateThermalCanvas();
    } else if (this._thermalCanvas) {
      this._thermalCanvas.destroy();
      this._thermalCanvas = undefined;
    }
  }

  protected getTrackedEntityIds(): string[] {
    if (this._isDashboardMode && this.hass && this.visibleAreaIds?.length && this.hass.entities && this.hass.devices) {
      const ids: string[] = [];
      for (const aId of this.visibleAreaIds) {
        for (const e of getAreaEntities(aId, this.hass.entities, this.hass.devices)) {
          if (e.entity_id.startsWith('climate.')) ids.push(e.entity_id);
        }
      }
      return ids;
    }
    return this._getClimateIds();
  }

  // — Config loading —

  private async _loadConfig(): Promise<void> {
    if (!this.hass || this._climateConfigLoaded) return;
    this._climateConfigLoaded = true;
    try {
      if (!this._backend) this._backend = new BackendService(this.hass);
      const result = await this._backend.send<{
        climate_card?: ClimateBackendConfig;
      }>('get_config');
      if (result?.climate_card) {
        this._showHeader = result.climate_card.show_header ?? true;
        this._displayMode = result.climate_card.display_mode ?? 'list';
        this._dashboardEntities = result.climate_card.dashboard_entities ?? [];
        this._cachedClimateIds = undefined;
        this._cachedClimatesFingerprint = '';
        this.requestUpdate();
      }
    } catch {
      // Backend not available
    }
  }

  private async _loadRoomConfig(): Promise<void> {
    if (!this.hass || !this.areaId || this._roomConfigLoaded || this._roomConfigLoading) return;
    this._roomConfigLoading = true;
    this._lastLoadedAreaId = this.areaId;
    try {
      if (!this._backend) this._backend = new BackendService(this.hass);
      const result = await this._backend.send<RoomClimateConfig | null>('get_room', { area_id: this.areaId });
      if (this.areaId === this._lastLoadedAreaId) {
        this._roomConfig = result;
        this._roomConfigLoaded = true;
        this._cachedClimateIds = undefined;
        this._cachedClimatesFingerprint = '';
        this.requestUpdate();
      }
    } catch {
      // ignore
    } finally {
      this._roomConfigLoading = false;
    }
  }

  private async _loadSchedules(): Promise<void> {
    if (!this.hass || this._schedulesLoaded) return;
    this._schedulesLoaded = true;
    try {
      if (!this._backend) this._backend = new BackendService(this.hass);
      const result = await this._backend.send<EntityScheduleMap>('get_schedules');
      this._schedules = result;
      this._cachedClimateIds = undefined;
      this._cachedClimatesFingerprint = '';
      this.requestUpdate();
    } catch {
      this._schedulesLoaded = false;
    }
  }

  private async _loadDashboardHidden(): Promise<void> {
    if (!this.hass || this._dashboardHiddenLoaded || !this._isDashboardMode) return;
    this._dashboardHiddenLoaded = true;
    const areas = this.visibleAreaIds;
    if (!areas || areas.length === 0) return;
    try {
      if (!this._backend) this._backend = new BackendService(this.hass);
      const hidden = new Set<string>();
      for (const aId of areas) {
        const result = await this._backend.send<{
          hidden_entities: string[];
        } | null>('get_room', { area_id: aId });
        if (result?.hidden_entities) {
          for (const id of result.hidden_entities) hidden.add(id);
        }
      }
      this._dashboardHiddenEntities = hidden;
      this._cachedClimateIds = undefined;
      this._cachedClimatesFingerprint = '';
      this.requestUpdate();
    } catch {
      // Backend not available
    }
  }

  private _resetForNewArea(): void {
    this._roomConfig = null;
    this._roomConfigLoaded = false;
    this._roomConfigLoading = false;
    this._expanded = null;
    this._selectedEntity = null;
    this._foldOpen = false;
    this._cachedClimateIds = undefined;
    this._cachedClimatesFingerprint = '';
    for (const timer of this._throttleTimers.values()) clearTimeout(timer);
    this._throttleTimers.clear();
  }

  // — Entity discovery —

  private _getClimateIds(): string[] {
    if (this._cachedClimateIds) return this._cachedClimateIds;
    this._cachedClimateIds = this._computeClimateIds();
    return this._cachedClimateIds;
  }

  private _computeClimateIds(): string[] {
    if (!this.hass) return [];
    if (this.areaId) {
      const hiddenSet = new Set<string>(this._roomConfig?.hidden_entities ?? []);
      const ids = getAreaEntities(this.areaId, this.hass.entities, this.hass.devices)
        .filter((e) => e.entity_id.startsWith('climate.') && !hiddenSet.has(e.entity_id) && isEntityVisibleNow(e.entity_id, this._schedules))
        .map((e) => e.entity_id);

      const order = this._roomConfig?.entity_order ?? [];
      if (order.length > 0) {
        const orderMap = new Map<string, number>();
        order.forEach((id, i) => orderMap.set(id, i));
        ids.sort((a, b) => {
          const aIdx = orderMap.get(a);
          const bIdx = orderMap.get(b);
          if (aIdx !== undefined && bIdx !== undefined) return aIdx - bIdx;
          if (aIdx !== undefined) return -1;
          if (bIdx !== undefined) return 1;
          return 0;
        });
      }
      return ids;
    }
    if (this._isDashboardMode) {
      if (this._dashboardEntities.length > 0) {
        return this._dashboardEntities.filter((id) => this.hass?.states[id]);
      }
      const areas = this.visibleAreaIds;
      if (!areas || areas.length === 0 || !this.hass.entities || !this.hass.devices) return [];
      const ids: string[] = [];
      for (const aId of areas) {
        for (const e of getAreaEntities(aId, this.hass.entities, this.hass.devices)) {
          if (e.entity_id.startsWith('climate.') && !this._dashboardHiddenEntities.has(e.entity_id)) ids.push(e.entity_id);
        }
      }
      return ids;
    }
    return [];
  }

  private _getClimates(): HassEntity[] {
    if (!this.hass) return [];
    const ids = this._getClimateIds();
    const fp = ids.map((id) => {
      const e = this.hass?.states[id];
      return e ? `${id}:${e.state}:${e.last_updated}` : `${id}:-`;
    }).join('|');

    if (fp === this._cachedClimatesFingerprint && this._cachedClimatesResult) {
      return this._cachedClimatesResult;
    }
    this._cachedClimatesFingerprint = fp;
    const result = ids
      .map((id) => this.hass?.states[id])
      .filter((e): e is HassEntity => e != null);
    this._cachedClimatesResult = result;
    return this._cachedClimatesResult;
  }

  // — Service calls —

  private _toggle(entityId: string, entity: HassEntity, e: Event): void {
    e.stopPropagation();
    if (!this.hass) return;
    const features = (entity.attributes.supported_features as number) || 0;
    const isOff = entity.state === 'off';

    if (isOff) {
      if (features & CF.TURN_ON) {
        this.hass.callService('climate', 'turn_on', {}, { entity_id: entityId });
      } else {
        const modes = (entity.attributes.hvac_modes as string[]) || [];
        const firstMode = modes.find((m) => m !== 'off');
        if (firstMode) {
          this.hass.callService('climate', 'set_hvac_mode', { hvac_mode: firstMode }, { entity_id: entityId });
        }
      }
    } else {
      if (features & CF.TURN_OFF) {
        this.hass.callService('climate', 'turn_off', {}, { entity_id: entityId });
      } else {
        this.hass.callService('climate', 'set_hvac_mode', { hvac_mode: 'off' }, { entity_id: entityId });
      }
    }
  }

  private _setHvacMode(entityId: string, mode: string): void {
    if (!this.hass) return;
    this.hass.callService('climate', 'set_hvac_mode', { hvac_mode: mode }, { entity_id: entityId });
  }

  private _setPreset(entityId: string, preset: string): void {
    if (!this.hass) return;
    this.hass.callService('climate', 'set_preset_mode', { preset_mode: preset }, { entity_id: entityId });
  }

  private _setFanMode(entityId: string, mode: string): void {
    if (!this.hass) return;
    this.hass.callService('climate', 'set_fan_mode', { fan_mode: mode }, { entity_id: entityId });
  }

  private _setSwingMode(entityId: string, mode: string): void {
    if (!this.hass) return;
    this.hass.callService('climate', 'set_swing_mode', { swing_mode: mode }, { entity_id: entityId });
  }

  private _setTemperature(entityId: string, temp: number): void {
    if (!this.hass) return;
    this._pendingTemps.set(`temp_${entityId}`, temp);
    this.requestUpdate();
    const key = `temp:${entityId}`;
    const existing = this._throttleTimers.get(key);
    if (existing) clearTimeout(existing);
    this._throttleTimers.set(key, setTimeout(() => {
      this._throttleTimers.delete(key);
      this.hass?.callService('climate', 'set_temperature', { temperature: temp }, { entity_id: entityId });
      this._pendingTemps.delete(`temp_${entityId}`);
    }, 400));
  }

  private _setTemperatureRange(entityId: string, low: number, high: number): void {
    if (!this.hass) return;
    const key = `range:${entityId}`;
    const existing = this._throttleTimers.get(key);
    if (existing) clearTimeout(existing);
    this._throttleTimers.set(key, setTimeout(() => {
      this._throttleTimers.delete(key);
      this.hass?.callService('climate', 'set_temperature', {
        target_temp_low: low,
        target_temp_high: high,
      }, { entity_id: entityId });
    }, 400));
  }

  private _setHumidity(entityId: string, humidity: number): void {
    if (!this.hass) return;
    this._pendingTemps.set(`humidity_${entityId}`, humidity);
    this.requestUpdate();
    const key = `hum:${entityId}`;
    const existing = this._throttleTimers.get(key);
    if (existing) clearTimeout(existing);
    this._throttleTimers.set(key, setTimeout(() => {
      this._throttleTimers.delete(key);
      this.hass?.callService('climate', 'set_humidity', { humidity }, { entity_id: entityId });
      this._pendingTemps.delete(`humidity_${entityId}`);
    }, 400));
  }

  private _toggleAuxHeat(entityId: string, entity: HassEntity): void {
    if (!this.hass) return;
    const isOn = entity.attributes.aux_heat === 'on';
    this.hass.callService('climate', 'set_aux_heat', { aux_heat: !isOn }, { entity_id: entityId });
  }

  // — Range drag —

  private _onRangeDragStart(thumb: 'low' | 'high', e: PointerEvent, entityId: string): void {
    e.preventDefault();
    const entity = this.hass?.states[entityId];
    if (!entity) return;

    const min = (entity.attributes.min_temp as number) || 7;
    const max = (entity.attributes.max_temp as number) || 35;
    const step = (entity.attributes.target_temp_step as number) || 0.5;
    const currentLow = (entity.attributes.target_temp_low as number) ?? min;
    const currentHigh = (entity.attributes.target_temp_high as number) ?? max;

    this._rangeDragEntity = entityId;
    this._rangeState = { dragging: thumb, lowTemp: currentLow, highTemp: currentHigh };

    const track = (e.target as HTMLElement).closest('.range-track') as HTMLElement | null;
    if (!track) return;

    const onMove = (ev: PointerEvent) => {
      const rect = track.getBoundingClientRect();
      const pct = Math.max(0, Math.min(1, (ev.clientX - rect.left) / rect.width));
      const raw = min + pct * (max - min);
      const snapped = Math.round(raw / step) * step;

      if (thumb === 'low') {
        const clamped = Math.max(min, Math.min(snapped, this._rangeState.highTemp - step));
        this._rangeState = { ...this._rangeState, lowTemp: clamped };
      } else {
        const clamped = Math.max(this._rangeState.lowTemp + step, Math.min(snapped, max));
        this._rangeState = { ...this._rangeState, highTemp: clamped };
      }
      this.requestUpdate();
    };

    const onUp = () => {
      this._setTemperatureRange(entityId, this._rangeState.lowTemp, this._rangeState.highTemp);
      this._rangeState = { dragging: null, lowTemp: 0, highTemp: 0 };
      this._rangeDragEntity = null;
      this.requestUpdate();
      cleanup();
    };

    const cleanup = () => {
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerup', onUp);
      if (this._rangeDragCleanup === cleanup) this._rangeDragCleanup = null;
    };

    document.addEventListener('pointermove', onMove);
    document.addEventListener('pointerup', onUp);
    this._rangeDragCleanup = cleanup;
  }

  // — Long-press gesture (normal mode) —

  private _onPointerDown(e: PointerEvent): void {
    if ((e.target as HTMLElement).closest('button, .entity-tab, .temp-stepper-btn, .chip')) return;
    this._lpStartX = e.clientX;
    this._lpStartY = e.clientY;
    this._lpTimer = setTimeout(() => {
      this._lpTimer = null;
      this._foldOpen = !this._foldOpen;
    }, 500);
  }

  private _onPointerMove(e: PointerEvent): void {
    if (!this._lpTimer) return;
    const dx = e.clientX - this._lpStartX;
    const dy = e.clientY - this._lpStartY;
    if (Math.abs(dx) > 15 || Math.abs(dy) > 15) {
      clearTimeout(this._lpTimer);
      this._lpTimer = null;
    }
  }

  private _onPointerUp(): void {
    if (this._lpTimer) {
      clearTimeout(this._lpTimer);
      this._lpTimer = null;
    }
  }

  // — Thermal canvas —

  private _updateThermalCanvas(): void {
    const canvas = this.shadowRoot?.querySelector('#thermal-canvas') as HTMLCanvasElement | null;
    const wrap = this.shadowRoot?.querySelector('#thermal-canvas-wrap') as HTMLElement | null;
    if (!canvas || !wrap) return;

    if (!this._thermalCanvas) this._thermalCanvas = new ThermalCanvas();
    this._thermalCanvas.attach(canvas);

    const selectedId = this._selectedEntity || this._getClimateIds()[0];
    const entity = selectedId ? this.hass?.states[selectedId] : undefined;
    const hvacAction = entity ? ((entity.attributes.hvac_action as string) || 'off') : 'off';
    this._thermalCanvas.update(hvacAction, wrap.offsetWidth, wrap.offsetHeight);
  }

  // — Helpers —

  private _tempUnit(): string {
    const hassAny = this.hass as Record<string, unknown> | undefined;
    const config = hassAny?.config as Record<string, unknown> | undefined;
    const unitSystem = config?.unit_system as Record<string, unknown> | undefined;
    const unit = unitSystem?.temperature as string | undefined;
    if (unit === '°F' || unit === 'F') return '°F';
    return '°C';
  }

  private _avgTemp(): string | null {
    const climates = this._getClimates();
    const temps: number[] = [];
    for (const c of climates) {
      const temp = c.attributes.current_temperature as number | undefined;
      if (temp != null) temps.push(temp);
    }
    if (temps.length === 0) return null;
    return (temps.reduce((a, b) => a + b, 0) / temps.length).toFixed(1);
  }

  private _getHvacAction(entity: HassEntity): string {
    return (entity.attributes.hvac_action as string) || (entity.state === 'off' ? 'off' : 'idle');
  }

  private _getIcon(entityId: string, entity: HassEntity): string {
    const isUnavailable = entity.state === 'unavailable' || entity.state === 'unknown';
    if (isUnavailable) return 'mdi:thermostat-off';
    const registryIcon = this.hass?.entities[entityId]?.icon;
    const attrIcon = entity.attributes.icon as string | undefined;
    return registryIcon || attrIcon || HVAC_ICONS[entity.state] || 'mdi:thermostat';
  }

  // ════════════════════════════════════════════════════════════════
  //  RENDER — dispatches to list or normal mode
  // ════════════════════════════════════════════════════════════════

  protected render() {
    void this._lang;
    const climates = this._getClimates();

    if (this._isDashboardMode) {
      if (climates.length === 0) {
        this.style.display = 'none';
        return nothing;
      }
      this.style.display = '';
    }

    if (!this._isDashboardMode && climates.length === 0) {
      return html`
        ${this._showHeader ? this._renderHeader(climates) : nothing}
        <div class="glass climate-card">
          <div class="card-inner">
            <div class="empty-state">${t('climate.no_climates')}</div>
          </div>
        </div>
      `;
    }

    if (this._displayMode === 'normal') {
      return this._renderNormalMode(climates);
    }
    return this._renderListMode(climates);
  }

  // — Header —

  private _renderHeader(climates: HassEntity[]) {
    const activeCount = climates.filter((c) => c.state !== 'off' && c.state !== 'unavailable').length;
    const total = climates.length;
    const countClass = activeCount === 0 ? 'none' : activeCount === total ? 'all' : 'some';
    const avg = this._avgTemp();
    const unit = this._tempUnit();

    return html`
      <div class="card-header">
        <div class="card-header-left">
          <span class="card-title">${t('climate.title')}</span>
          <span class="card-count ${countClass}">${activeCount}/${total}</span>
        </div>
        <span class="card-header-right">${avg != null ? `${avg}${unit}` : ''}</span>
      </div>
    `;
  }

  // ════════════════════════════════════════════════════════════════
  //  LIST MODE
  // ════════════════════════════════════════════════════════════════

  private _renderListMode(climates: HassEntity[]): TemplateResult {
    // Compute tint
    let tintClass = '';
    if (this._expanded && this.hass?.states[this._expanded]) {
      const action = this._getHvacAction(this.hass.states[this._expanded]);
      if (action === 'heating' || action === 'preheating') tintClass = 'heat';
      else if (action === 'cooling') tintClass = 'cool';
    } else {
      const anyHeating = climates.some((c) => { const a = this._getHvacAction(c); return a === 'heating' || a === 'preheating'; });
      const anyCooling = climates.some((c) => this._getHvacAction(c) === 'cooling');
      if (anyHeating) tintClass = 'heat';
      else if (anyCooling) tintClass = 'cool';
    }

    return html`
      ${this._showHeader ? this._renderHeader(climates) : nothing}
      <div class="glass climate-card list-mode">
        <div class="tint ${tintClass}"></div>
        <div class="card-inner">
          ${climates.map((c) => html`
            ${this._renderListRow(c.entity_id, c)}
            ${this._renderListFold(c.entity_id, c)}
          `)}
        </div>
      </div>
    `;
  }

  private _renderListRow(entityId: string, entity: HassEntity): TemplateResult {
    const attrs = entity.attributes;
    const name = (attrs.friendly_name as string) || entityId.split('.')[1] || entityId;
    const isUnavailable = entity.state === 'unavailable' || entity.state === 'unknown';
    const isOff = entity.state === 'off';
    const hvacAction = this._getHvacAction(entity);
    const currentTemp = attrs.current_temperature as number | undefined;
    const targetTemp = this._pendingTemps.get(`temp_${entityId}`) ?? (attrs.temperature as number | undefined);
    const isExpanded = this._expanded === entityId;
    const hvacMode = entity.state;
    const presetMode = attrs.preset_mode as string | undefined;
    const icon = this._getIcon(entityId, entity);

    const actionKey = ACTION_LABELS[hvacAction] || 'climate.unknown';
    const modeBadgeText = presetMode && presetMode !== 'none' ? presetMode : hvacMode;

    return html`
      <div class="cl-row ${isUnavailable ? 'unavailable' : ''}" data-action=${hvacAction}>
        <button
          class="cl-icon-btn"
          @click=${(e: Event) => this._toggle(entityId, entity, e)}
          aria-label=${isOff ? t('climate.turn_on_aria') : t('climate.turn_off_aria')}
          ?disabled=${isUnavailable}
        >
          <ha-icon .icon=${icon} style="--mdc-icon-size:18px;display:flex;align-items:center;justify-content:center;"></ha-icon>
        </button>
        <button
          class="cl-expand-btn"
          @click=${() => { if (!isUnavailable) this._expanded = isExpanded ? null : entityId; }}
          aria-expanded=${isExpanded ? 'true' : 'false'}
          aria-label=${t('climate.controls_aria')}
        >
          <div class="cl-info">
            <div class="cl-name">${marqueeText(name, MARQUEE_COMPACT)}</div>
            <div class="cl-sub">
              <span class="cl-action-text">${t(actionKey as Parameters<typeof t>[0])}</span>
              ${!isOff ? html`<span class="cl-mode-badge">${modeBadgeText}</span>` : nothing}
            </div>
          </div>
          <div class="cl-temps">
            <div class="cl-temp-current">${isUnavailable ? '--' : (currentTemp != null ? html`${currentTemp.toFixed(1)}<span class="unit">°</span>` : '--')}</div>
            ${!isOff && targetTemp != null ? html`<div class="cl-temp-target">→ ${targetTemp.toFixed(1)}°</div>` : nothing}
          </div>
          <div class="cl-dot"></div>
        </button>
      </div>
    `;
  }

  private _renderListFold(entityId: string, entity: HassEntity): TemplateResult {
    const isExpanded = this._expanded === entityId;
    const isUnavailable = entity.state === 'unavailable' || entity.state === 'unknown';
    if (isUnavailable) return html``;

    const hvacAction = this._getHvacAction(entity);
    const sepColor = hvacAction === 'cooling' ? 'cool' : '';

    return html`
      <div class="fold-sep ${isExpanded ? 'visible' : ''} ${sepColor}"></div>
      <div class="ctrl-fold ${isExpanded ? 'open' : ''}">
        <div class="ctrl-fold-inner">
          <div class="ctrl-panel">
            ${this._renderListTempControl(entityId, entity)}
            <div class="ctrl-sep"></div>
            ${this._renderFoldControls(entityId, entity)}
          </div>
        </div>
      </div>
      <div class="fold-sep ${isExpanded ? 'visible' : ''} ${sepColor}"></div>
    `;
  }

  private _renderListTempControl(entityId: string, entity: HassEntity): TemplateResult | typeof nothing {
    if (entity.state === 'off' || entity.state === 'fan_only') return nothing;
    const features = (entity.attributes.supported_features as number) || 0;

    // Range slider for heat_cool mode
    if (entity.state === 'heat_cool' && (features & CF.TARGET_TEMPERATURE_RANGE)) {
      const unit = this._tempUnit();
      const rangeState: RangeSliderState = this._rangeDragEntity === entityId
        ? this._rangeState
        : { dragging: null, lowTemp: 0, highTemp: 0 };
      return renderRangeSlider(
        entity, unit, rangeState,
        (low, high) => this._setTemperatureRange(entityId, low, high),
        (thumb, e) => this._onRangeDragStart(thumb, e, entityId),
      );
    }

    if (!(features & CF.TARGET_TEMPERATURE)) return nothing;

    const target = this._pendingTemps.get(`temp_${entityId}`) ?? (entity.attributes.temperature as number | undefined);
    const step = (entity.attributes.target_temp_step as number) || 0.5;
    const min = (entity.attributes.min_temp as number) || 7;
    const max = (entity.attributes.max_temp as number) || 35;
    const currentTemp = entity.attributes.current_temperature as number | undefined;
    const hvacAction = this._getHvacAction(entity);
    const colorClass = hvacAction === 'heating' || hvacAction === 'preheating' ? 'heat' : hvacAction === 'cooling' ? 'cool' : 'off';
    const unit = this._tempUnit();

    if (target == null) return nothing;

    return html`
      <div class="temp-control">
        <button class="temp-stepper-btn"
          @click=${() => this._setTemperature(entityId, Math.max(min, target - step))}
          aria-label=${t('climate.temp_down_aria')}
          ?disabled=${target <= min}>
          <ha-icon .icon=${'mdi:minus'} style="--mdc-icon-size:22px;display:flex;align-items:center;justify-content:center;"></ha-icon>
        </button>
        <div class="temp-display">
          <div class="temp-display-label">${t('climate.target')}</div>
          <div class="temp-display-value ${colorClass}">${target.toFixed(1)}<span class="unit">${unit}</span></div>
          ${currentTemp != null ? html`
            <div class="temp-display-current">
              <ha-icon .icon=${'mdi:thermometer'} style="--mdc-icon-size:13px;display:flex;align-items:center;justify-content:center;"></ha-icon>
              <span>${t('climate.current_label')} ${currentTemp.toFixed(1)}${unit}</span>
            </div>
          ` : nothing}
        </div>
        <button class="temp-stepper-btn"
          @click=${() => this._setTemperature(entityId, Math.min(max, target + step))}
          aria-label=${t('climate.temp_up_aria')}
          ?disabled=${target >= max}>
          <ha-icon .icon=${'mdi:plus'} style="--mdc-icon-size:22px;display:flex;align-items:center;justify-content:center;"></ha-icon>
        </button>
      </div>
    `;
  }

  // Shared fold controls (modes, presets, fan, swing, humidity, aux heat)
  private _renderFoldControls(entityId: string, entity: HassEntity): TemplateResult {
    return html`
      ${renderHvacModes(entity, (mode) => this._setHvacMode(entityId, mode))}
      ${renderPresets(entity, (preset) => this._setPreset(entityId, preset))}
      ${renderFanModes(entity, (mode) => this._setFanMode(entityId, mode))}
      ${renderSwingModes(entity, (mode) => this._setSwingMode(entityId, mode))}
      ${renderHumidityStepper(entity, (val) => this._setHumidity(entityId, val), this._pendingTemps.get(`humidity_${entityId}`))}
      ${renderAuxHeat(entity, () => this._toggleAuxHeat(entityId, entity))}
    `;
  }

  // ════════════════════════════════════════════════════════════════
  //  NORMAL MODE (arc gauge)
  // ════════════════════════════════════════════════════════════════

  private _renderNormalMode(climates: HassEntity[]): TemplateResult {
    const selectedId = this._selectedEntity || climates[0]?.entity_id;
    const entity = climates.find((c) => c.entity_id === selectedId) || climates[0];
    if (!entity) return html``;

    const hvacAction = this._getHvacAction(entity);
    const tintClass = (hvacAction === 'heating' || hvacAction === 'preheating') ? 'heat'
      : hvacAction === 'cooling' ? 'cool'
      : (entity.state === 'auto' || entity.state === 'heat_cool') ? 'auto-tint' : '';
    const foldSepClass = (hvacAction === 'heating' || hvacAction === 'preheating') ? 'heat-sep'
      : hvacAction === 'cooling' ? 'cool-sep' : '';

    return html`
      ${this._showHeader ? this._renderHeader(climates) : nothing}
      <div class="climate-wrap ${this._foldOpen ? 'fold-open' : ''}">
        <div class="glass climate-card normal-mode"
          @pointerdown=${(e: PointerEvent) => this._onPointerDown(e)}
          @pointermove=${(e: PointerEvent) => this._onPointerMove(e)}
          @pointerup=${() => this._onPointerUp()}
          @pointercancel=${() => this._onPointerUp()}>
          <div class="tint ${tintClass}"></div>
          <div class="thermal-canvas" id="thermal-canvas-wrap">
            <canvas id="thermal-canvas"></canvas>
          </div>
          <div class="card-inner">
            ${this._renderEntityTabs(climates)}
            ${renderArcGauge(entity)}
            ${this._renderNormalTempStepper(entity)}
          </div>
        </div>
        <div class="ctrl-fold ${this._foldOpen ? 'open' : ''}">
          <div class="ctrl-fold-inner normal-fold-inner">
            <div class="ctrl-fold-sep-top ${foldSepClass}"></div>
            <div class="ctrl-panel">
              ${this._renderFoldControls(entity.entity_id, entity)}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  private _renderEntityTabs(climates: HassEntity[]): TemplateResult | typeof nothing {
    if (climates.length <= 1) return nothing;

    const sorted = [...climates].sort((a, b) => {
      const aAction = this._getHvacAction(a);
      const bAction = this._getHvacAction(b);
      return (ACTION_ORDER[aAction] ?? 3) - (ACTION_ORDER[bAction] ?? 3);
    });

    const selectedId = this._selectedEntity || sorted[0]?.entity_id;

    return html`
      <div class="entity-tabs">
        ${sorted.map((entity) => {
          const friendlyName = (entity.attributes.friendly_name as string) || entity.entity_id;
          const shortName = friendlyName.split(' ').pop() || friendlyName;
          const hvacAction = this._getHvacAction(entity);
          const isSelected = entity.entity_id === selectedId;
          const colorClass = isSelected
            ? ((hvacAction === 'heating' || hvacAction === 'preheating') ? 'heat' : hvacAction === 'cooling' ? 'cool' : '')
            : '';

          return html`
            <button class="entity-tab ${isSelected ? 'active' : ''} ${colorClass}"
              @click=${() => { this._selectedEntity = entity.entity_id; }}
              aria-label=${friendlyName}
              aria-pressed=${isSelected ? 'true' : 'false'}>
              <span class="tab-dot ${hvacAction}"></span>
              <span>${shortName}</span>
            </button>
          `;
        })}
      </div>
    `;
  }

  private _renderNormalTempStepper(entity: HassEntity): TemplateResult | typeof nothing {
    if (entity.state === 'off' || entity.state === 'fan_only') return nothing;
    const features = (entity.attributes.supported_features as number) || 0;
    if (!(features & CF.TARGET_TEMPERATURE)) return nothing;
    if (entity.state === 'heat_cool' && (features & CF.TARGET_TEMPERATURE_RANGE)) return nothing;

    const entityId = entity.entity_id;
    const target = this._pendingTemps.get(`temp_${entityId}`) ?? (entity.attributes.temperature as number | undefined);
    const step = (entity.attributes.target_temp_step as number) || 0.5;
    const min = (entity.attributes.min_temp as number) || 7;
    const max = (entity.attributes.max_temp as number) || 35;
    const hvacAction = this._getHvacAction(entity);
    const colorClass = (hvacAction === 'heating' || hvacAction === 'preheating') ? 'heat'
      : hvacAction === 'cooling' ? 'cool'
      : (entity.state === 'auto' || entity.state === 'heat_cool') ? 'auto-val' : 'off';

    if (target == null) return nothing;

    return html`
      <div class="temp-control-panel">
        <button class="temp-stepper-btn normal-stepper"
          @click=${() => this._setTemperature(entityId, Math.max(min, target - step))}
          aria-label=${t('climate.temp_down_aria')}
          ?disabled=${target <= min}>
          <ha-icon .icon=${'mdi:minus'} style="--mdc-icon-size:20px;display:flex;align-items:center;justify-content:center;"></ha-icon>
        </button>
        <div class="target-display">
          <div class="target-value ${colorClass}">${target.toFixed(1)}<span class="unit">°C</span></div>
        </div>
        <button class="temp-stepper-btn normal-stepper"
          @click=${() => this._setTemperature(entityId, Math.min(max, target + step))}
          aria-label=${t('climate.temp_up_aria')}
          ?disabled=${target >= max}>
          <ha-icon .icon=${'mdi:plus'} style="--mdc-icon-size:20px;display:flex;align-items:center;justify-content:center;"></ha-icon>
        </button>
      </div>
    `;
  }

  // ════════════════════════════════════════════════════════════════
  //  STYLES
  // ════════════════════════════════════════════════════════════════

  static styles = [glassTokens, glassMixin, foldMixin, marqueeMixin, bounceMixin, css`
    :host {
      display: block;
      width: 100%;
      max-width: 500px;
      margin: 0 auto;
      font-family: 'Plus Jakarta Sans', sans-serif;

      /* Climate tokens */
      --cl-heat: #f97316;
      --cl-heat-bg: rgba(249,115,22,0.1);
      --cl-heat-border: rgba(249,115,22,0.15);
      --cl-heat-glow: rgba(249,115,22,0.4);
      --cl-heat-sub: rgba(249,115,22,0.6);

      --cl-cool: #38bdf8;
      --cl-cool-bg: rgba(56,189,248,0.1);
      --cl-cool-border: rgba(56,189,248,0.15);
      --cl-cool-glow: rgba(56,189,248,0.4);
      --cl-cool-sub: rgba(56,189,248,0.6);

      --cl-auto: #a78bfa;
      --cl-auto-bg: rgba(167,139,250,0.1);
      --cl-auto-border: rgba(167,139,250,0.15);
      --cl-auto-glow: rgba(167,139,250,0.4);

      --cl-dry: #eab308;
      --cl-fan: #06b6d4;
      --cl-off: var(--t4);
    }

    /* ── Card Header ── */
    .card-header {
      display: flex; align-items: center; justify-content: space-between;
      padding: 0 6px; margin-bottom: 6px; min-height: 22px;
    }
    .card-header-left { display: flex; align-items: center; gap: 8px; }
    .card-title {
      font-size: 9px; font-weight: 700; text-transform: uppercase;
      letter-spacing: 1.5px; color: var(--t4);
    }
    .card-count {
      display: inline-flex; align-items: center; justify-content: center;
      min-width: 14px; height: 14px; padding: 0 4px;
      border-radius: var(--radius-full); font-size: 9px; font-weight: 600;
      transition: all var(--t-med);
    }
    .card-count.some { background: rgba(249,115,22,0.15); color: var(--cl-heat); }
    .card-count.none { background: var(--s2); color: var(--t3); }
    .card-count.all  { background: rgba(249,115,22,0.2); color: var(--cl-heat); }
    .card-header-right { font-size: 10px; font-weight: 500; color: var(--t3); }

    /* ── Card Body ── */
    .climate-card { position: relative; overflow: hidden; }
    .climate-card.list-mode { padding: 2px 14px; }
    .climate-card.normal-mode {
      padding: 14px;
      touch-action: pan-y; user-select: none; -webkit-user-select: none;
      -webkit-tap-highlight-color: transparent; cursor: default;
      transition: border-color var(--t-fast), border-radius var(--t-layout);
    }
    .card-inner { position: relative; z-index: 1; }
    .normal-mode .card-inner { display: flex; flex-direction: column; gap: 8px; }

    /* ── Tint ── */
    .tint {
      position: absolute; inset: 0; border-radius: inherit;
      pointer-events: none; z-index: 0;
      transition: opacity var(--t-slow), background var(--t-slow);
      opacity: 0;
    }
    .tint.heat {
      opacity: 0.15;
      background: radial-gradient(ellipse at 50% 40%, var(--cl-heat), transparent 70%);
    }
    .tint.cool {
      opacity: 0.15;
      background: radial-gradient(ellipse at 50% 40%, var(--cl-cool), transparent 70%);
    }
    .tint.auto-tint {
      opacity: 0.12;
      background: radial-gradient(ellipse at 50% 40%, var(--cl-auto), transparent 70%);
    }

    .empty-state {
      padding: 16px; text-align: center;
      font-size: 12px; color: var(--t3);
    }

    /* ════════════════════════════════════════════
       LIST MODE STYLES
       ════════════════════════════════════════════ */

    /* ── Row ── */
    .cl-row {
      display: flex; align-items: center; gap: 10px;
      padding: 8px 4px; position: relative;
      transition: background var(--t-fast); border-radius: var(--radius-md);
    }
    .cl-row.unavailable { opacity: 0.4; pointer-events: none; }
    @media (hover: hover) and (pointer: fine) {
      .cl-row:hover { background: var(--s1); }
    }
    @media (pointer: coarse) {
      .cl-row:active { animation: bounce 0.3s ease; }
    }

    /* ── Icon Button ── */
    .cl-icon-btn {
      width: 36px; height: 36px; border-radius: var(--radius-md);
      background: var(--s2); border: 1px solid var(--b1);
      display: flex; align-items: center; justify-content: center; flex-shrink: 0;
      transition: all var(--t-fast); cursor: pointer; padding: 0; outline: none;
      font-family: inherit; -webkit-tap-highlight-color: transparent;
    }
    .cl-icon-btn ha-icon {
      color: var(--t3); transition: color var(--t-fast), filter var(--t-fast);
    }
    .cl-icon-btn:focus-visible { outline: 2px solid rgba(255,255,255,0.25); outline-offset: -2px; }
    @media (hover: hover) and (pointer: fine) {
      .cl-icon-btn:hover { background: var(--s3); border-color: var(--b2); }
      .cl-icon-btn:hover ha-icon { color: var(--t2); }
    }
    @media (hover: hover) { .cl-icon-btn:active { transform: scale(0.96); } }
    @media (pointer: coarse) { .cl-icon-btn:active { animation: bounce 0.3s ease; } }

    /* Icon states */
    .cl-row[data-action="heating"] .cl-icon-btn,
    .cl-row[data-action="preheating"] .cl-icon-btn {
      background: var(--cl-heat-bg); border-color: var(--cl-heat-border);
    }
    .cl-row[data-action="heating"] .cl-icon-btn ha-icon,
    .cl-row[data-action="preheating"] .cl-icon-btn ha-icon {
      color: var(--cl-heat); animation: pulse-heat 2s ease-in-out infinite;
    }
    .cl-row[data-action="cooling"] .cl-icon-btn {
      background: var(--cl-cool-bg); border-color: var(--cl-cool-border);
    }
    .cl-row[data-action="cooling"] .cl-icon-btn ha-icon {
      color: var(--cl-cool); animation: pulse-cool 2s ease-in-out infinite;
    }
    .cl-row[data-action="idle"] .cl-icon-btn { background: var(--s2); border-color: var(--b2); }
    .cl-row[data-action="idle"] .cl-icon-btn ha-icon { color: var(--t2); }

    @keyframes pulse-heat {
      0%, 100% { filter: drop-shadow(0 0 6px rgba(249,115,22,0.6)); }
      50%      { filter: drop-shadow(0 0 2px rgba(249,115,22,0.2)); }
    }
    @keyframes pulse-cool {
      0%, 100% { filter: drop-shadow(0 0 6px rgba(56,189,248,0.6)); }
      50%      { filter: drop-shadow(0 0 2px rgba(56,189,248,0.2)); }
    }

    /* ── Expand Button ── */
    .cl-expand-btn {
      flex: 1; min-width: 0;
      display: flex; align-items: center; gap: 10px;
      background: none; border: none; padding: 0;
      font-family: inherit; cursor: pointer; outline: none;
      text-align: left; color: inherit;
      -webkit-tap-highlight-color: transparent;
    }
    .cl-expand-btn:focus-visible {
      outline: 2px solid rgba(255,255,255,0.25); outline-offset: 2px;
      border-radius: var(--radius-sm);
    }

    /* ── Info ── */
    .cl-info { flex: 1; min-width: 0; }
    .cl-name {
      font-size: 13px; font-weight: 600; color: var(--t1); line-height: 1.2;
      white-space: nowrap; overflow: hidden;
    }
    .cl-sub { display: flex; align-items: center; gap: 5px; margin-top: 2px; }
    .cl-action-text {
      font-size: 10px; font-weight: 500; color: var(--t3);
      transition: color var(--t-med);
    }
    .cl-row[data-action="heating"] .cl-action-text,
    .cl-row[data-action="preheating"] .cl-action-text { color: var(--cl-heat-sub); }
    .cl-row[data-action="cooling"] .cl-action-text { color: var(--cl-cool-sub); }

    .cl-mode-badge {
      font-size: 8px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;
      padding: 1px 5px; border-radius: var(--radius-full);
      background: var(--s2); color: var(--t4); flex-shrink: 0;
    }
    .cl-row[data-action="heating"] .cl-mode-badge,
    .cl-row[data-action="preheating"] .cl-mode-badge {
      background: var(--cl-heat-bg); color: var(--cl-heat-sub);
    }
    .cl-row[data-action="cooling"] .cl-mode-badge {
      background: var(--cl-cool-bg); color: var(--cl-cool-sub);
    }

    /* ── Temps ── */
    .cl-temps {
      display: flex; flex-direction: column; align-items: flex-end; gap: 0;
      flex-shrink: 0;
    }
    .cl-temp-current {
      font-size: 18px; font-weight: 700; color: var(--t1);
      line-height: 1; font-variant-numeric: tabular-nums;
    }
    .cl-temp-current .unit { font-size: 11px; font-weight: 500; color: var(--t3); }
    .cl-temp-target {
      font-size: 10px; font-weight: 600; color: var(--t3);
      font-variant-numeric: tabular-nums; margin-top: 1px;
    }
    .cl-row[data-action="heating"] .cl-temp-target,
    .cl-row[data-action="preheating"] .cl-temp-target { color: var(--cl-heat-sub); }
    .cl-row[data-action="cooling"] .cl-temp-target { color: var(--cl-cool-sub); }

    /* ── Dot ── */
    .cl-dot {
      width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0;
      background: var(--t4); transition: all var(--t-med);
    }
    .cl-row[data-action="heating"] .cl-dot,
    .cl-row[data-action="preheating"] .cl-dot {
      background: var(--cl-heat); box-shadow: 0 0 8px var(--cl-heat-glow);
    }
    .cl-row[data-action="cooling"] .cl-dot {
      background: var(--cl-cool); box-shadow: 0 0 8px var(--cl-cool-glow);
    }

    /* ── Fold separator ── */
    .fold-sep {
      height: 0; margin: 0 12px; overflow: hidden;
      background: linear-gradient(90deg, transparent, rgba(249,115,22,0.25), transparent);
      opacity: 0; transition: opacity 0.25s var(--ease-std), height 0.25s var(--ease-std);
    }
    .fold-sep.cool {
      background: linear-gradient(90deg, transparent, rgba(56,189,248,0.25), transparent);
    }
    .fold-sep.visible { height: 1px; opacity: 1; }

    /* ── Controls fold (list mode) ── */
    .ctrl-fold {
      display: grid; grid-template-rows: 0fr;
      transition: grid-template-rows var(--t-layout);
    }
    .ctrl-fold.open { grid-template-rows: 1fr; }
    .ctrl-fold-inner {
      overflow: hidden; opacity: 0;
      transition: opacity 0.25s var(--ease-std);
    }
    .ctrl-fold.open .ctrl-fold-inner { opacity: 1; transition-delay: 0.1s; }
    .ctrl-panel {
      padding: 6px 0 4px;
      display: flex; flex-direction: column; gap: 12px;
    }
    .ctrl-sep { height: 1px; background: var(--b1); margin: 2px 0; }

    /* ── Large temperature stepper (list mode fold) ── */
    .temp-control {
      display: flex; align-items: center; justify-content: center; gap: 16px;
      padding: 8px 0;
    }
    .temp-stepper-btn {
      width: 44px; height: 44px; border-radius: 14px;
      background: var(--s2); border: 1px solid var(--b2);
      display: flex; align-items: center; justify-content: center;
      cursor: pointer; transition: all var(--t-fast); outline: none; padding: 0;
      font-family: inherit; -webkit-tap-highlight-color: transparent;
    }
    .temp-stepper-btn ha-icon { color: var(--t2); transition: color var(--t-fast); }
    @media (hover: hover) and (pointer: fine) {
      .temp-stepper-btn:hover { background: var(--s3); border-color: var(--b3); }
      .temp-stepper-btn:hover ha-icon { color: var(--t1); }
    }
    @media (hover: hover) { .temp-stepper-btn:active { transform: scale(0.96); } }
    @media (pointer: coarse) { .temp-stepper-btn:active { animation: bounce 0.3s ease; } }
    .temp-stepper-btn:focus-visible { outline: 2px solid rgba(255,255,255,0.25); outline-offset: -2px; }
    .temp-stepper-btn:disabled { opacity: 0.3; pointer-events: none; }

    .temp-display {
      display: flex; flex-direction: column; align-items: center; gap: 2px;
      min-width: 100px;
    }
    .temp-display-label {
      font-size: 9px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.8px;
      color: var(--t4);
    }
    .temp-display-value {
      font-size: 40px; font-weight: 700; line-height: 1;
      font-variant-numeric: tabular-nums; transition: color var(--t-fast);
    }
    .temp-display-value.heat { color: var(--cl-heat); }
    .temp-display-value.cool { color: var(--cl-cool); }
    .temp-display-value.off { color: var(--t3); }
    .temp-display-value .unit { font-size: 18px; font-weight: 500; }
    .temp-display-current {
      font-size: 11px; font-weight: 500; color: var(--t3);
      display: flex; align-items: center; gap: 4px;
    }
    .temp-display-current ha-icon { display: flex; align-items: center; justify-content: center; }

    /* ════════════════════════════════════════════
       NORMAL MODE STYLES
       ════════════════════════════════════════════ */

    /* ── Thermal canvas ── */
    .thermal-canvas {
      position: absolute; inset: 0; border-radius: inherit;
      overflow: hidden; pointer-events: none; z-index: 0;
    }
    .thermal-canvas canvas { width: 100%; height: 100%; }

    /* ── Connected fold wrapper ── */
    .climate-wrap { display: flex; flex-direction: column; }
    .climate-wrap.fold-open .climate-card {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      border-bottom-color: transparent;
    }

    /* Touch hint at card bottom when fold closed */
    .normal-mode::after {
      content: ''; position: absolute; bottom: 0; left: 20%; right: 20%;
      height: 2px; border-radius: 1px;
      background: linear-gradient(90deg, transparent, var(--b3), transparent);
      opacity: 0; transition: opacity var(--t-med); z-index: 2;
    }
    .climate-wrap:not(.fold-open) .normal-mode::after { opacity: 1; }

    /* Normal fold inner (external, connected) */
    .normal-fold-inner {
      background: linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01));
      backdrop-filter: blur(40px) saturate(1.4);
      -webkit-backdrop-filter: blur(40px) saturate(1.4);
      border: 1px solid var(--b2);
      border-top: none;
      border-radius: 0 0 var(--radius-xl) var(--radius-xl);
      box-shadow: 0 8px 32px rgba(0,0,0,0.3), 0 2px 8px rgba(0,0,0,0.2), inset 0 -1px 0 rgba(0,0,0,0.1);
    }
    .normal-fold-inner .ctrl-panel {
      padding: 12px 14px 14px;
    }

    .ctrl-fold-sep-top {
      height: 1px; margin: 0 12px;
      background: linear-gradient(90deg, transparent, var(--b3), transparent);
      transition: background var(--t-med);
    }
    .ctrl-fold-sep-top.heat-sep {
      background: linear-gradient(90deg, transparent, rgba(249,115,22,0.25), transparent);
    }
    .ctrl-fold-sep-top.cool-sep {
      background: linear-gradient(90deg, transparent, rgba(56,189,248,0.25), transparent);
    }

    /* ── Entity tabs ── */
    .entity-tabs {
      display: flex; gap: 0; overflow-x: auto; scrollbar-width: none;
      border-radius: 12px; background: var(--s1);
      border: 1px solid var(--b1); padding: 3px;
    }
    .entity-tabs::-webkit-scrollbar { display: none; }

    .entity-tab {
      flex: 1; display: flex; align-items: center; justify-content: center; gap: 5px;
      padding: 7px 10px; border-radius: 9px; min-width: 0;
      font-family: inherit; font-size: 11px; font-weight: 600;
      color: var(--t3); cursor: pointer; transition: all var(--t-fast);
      border: none; background: transparent; outline: none;
      -webkit-tap-highlight-color: transparent; white-space: nowrap;
    }
    .entity-tab:focus-visible { outline: 2px solid rgba(255,255,255,0.25); outline-offset: 2px; }
    @media (hover: hover) { .entity-tab:active { transform: scale(0.96); } }
    @media (pointer: coarse) { .entity-tab:active { animation: bounce 0.3s ease; } }
    @media (hover: hover) and (pointer: fine) {
      .entity-tab:not(.active):hover { background: var(--s2); color: var(--t2); }
    }

    .entity-tab .tab-dot {
      width: 5px; height: 5px; border-radius: 50%; flex-shrink: 0;
      transition: all var(--t-med);
    }
    .entity-tab .tab-dot.heating,
    .entity-tab .tab-dot.preheating {
      background: var(--cl-heat); box-shadow: 0 0 6px var(--cl-heat-glow);
    }
    .entity-tab .tab-dot.cooling {
      background: var(--cl-cool); box-shadow: 0 0 6px var(--cl-cool-glow);
    }
    .entity-tab .tab-dot.idle { background: var(--t3); }
    .entity-tab .tab-dot.off { background: var(--t4); }

    .entity-tab.active {
      background: var(--s4); color: var(--t1);
      box-shadow: 0 1px 4px rgba(0,0,0,0.2);
    }
    .entity-tab.active.heat {
      background: var(--cl-heat-bg); color: var(--cl-heat);
      box-shadow: 0 1px 6px rgba(249,115,22,0.15);
    }
    .entity-tab.active.cool {
      background: var(--cl-cool-bg); color: var(--cl-cool);
      box-shadow: 0 1px 6px rgba(56,189,248,0.15);
    }

    /* ── Arc gauge ── */
    .gauge-section {
      display: flex; flex-direction: column; align-items: center;
      padding: 0; gap: 0;
    }
    .arc-gauge { position: relative; width: 240px; height: 160px; }
    .arc-gauge svg { width: 100%; height: 100%; }

    .arc-bg { fill: none; stroke: var(--s2); stroke-width: 8; stroke-linecap: round; }
    .arc-progress {
      fill: none; stroke-width: 8; stroke-linecap: round;
      transition: stroke-dashoffset 0.6s var(--ease-out), stroke var(--t-med);
    }
    .arc-progress.heat { stroke: var(--cl-heat); filter: drop-shadow(0 0 8px var(--cl-heat-glow)); }
    .arc-progress.cool { stroke: var(--cl-cool); filter: drop-shadow(0 0 8px var(--cl-cool-glow)); }
    .arc-progress.auto-arc { stroke: var(--cl-auto); filter: drop-shadow(0 0 8px var(--cl-auto-glow)); }
    .arc-progress.off { stroke: var(--t4); filter: none; }

    .arc-target-dot {
      fill: rgba(255,255,255,0.9);
      filter: drop-shadow(0 0 4px rgba(255,255,255,0.5));
      transition: all 0.6s var(--ease-out);
    }
    .arc-tick { stroke: var(--t4); stroke-width: 1; opacity: 0.3; }
    .arc-tick-major { stroke: var(--t3); stroke-width: 1.5; opacity: 0.5; }
    .arc-tick-label {
      font-size: 8px; font-weight: 500; fill: var(--t4);
      text-anchor: middle; dominant-baseline: middle;
    }

    /* Center display */
    .gauge-center {
      position: absolute; bottom: 14px; left: 50%; transform: translateX(-50%);
      display: flex; flex-direction: column; align-items: center; gap: 2px;
      width: 160px;
    }
    .gauge-current-temp {
      font-size: 48px; font-weight: 300; line-height: 1;
      font-variant-numeric: tabular-nums; letter-spacing: -2px;
      transition: color var(--t-med);
    }
    .gauge-current-temp .unit {
      font-size: 20px; font-weight: 400; color: var(--t3);
      vertical-align: super; margin-left: -2px;
    }
    .gauge-current-temp.off { color: var(--t3); }

    .gauge-action-label {
      font-size: 10px; font-weight: 600; text-transform: uppercase;
      letter-spacing: 0.8px; transition: color var(--t-med);
      display: flex; align-items: center; gap: 4px;
    }
    .gauge-action-label ha-icon { display: flex; align-items: center; justify-content: center; }
    .gauge-action-label.heat { color: var(--cl-heat-sub); }
    .gauge-action-label.cool { color: var(--cl-cool-sub); }
    .gauge-action-label.idle { color: var(--t3); }
    .gauge-action-label.off { color: var(--t4); }

    .gauge-sub-info {
      display: flex; align-items: center; gap: 6px;
      font-size: 10px; font-weight: 500; color: var(--t3);
    }
    .gauge-sub-info ha-icon { opacity: 0.5; display: flex; align-items: center; justify-content: center; }

    /* ── Normal mode temp stepper (glass sub-panel) ── */
    .temp-control-panel {
      display: flex; align-items: center; justify-content: center; gap: 14px;
      padding: 10px 16px;
      border-radius: var(--radius-lg);
      backdrop-filter: blur(4px) saturate(1.2);
      -webkit-backdrop-filter: blur(4px) saturate(1.2);
      background: rgba(0,0,0,0.25);
      border: 1px solid rgba(255,255,255,0.08);
      box-shadow: 0 4px 16px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.04);
    }
    .normal-stepper {
      width: 40px; height: 40px; border-radius: 12px;
    }
    .target-display {
      display: flex; flex-direction: column; align-items: center; gap: 0;
      min-width: 100px;
    }
    .target-value {
      font-size: 28px; font-weight: 600; line-height: 1.1;
      font-variant-numeric: tabular-nums; letter-spacing: -1px;
      transition: color var(--t-med);
    }
    .target-value .unit { font-size: 14px; font-weight: 400; color: var(--t3); }
    .target-value.heat { color: var(--cl-heat); }
    .target-value.cool { color: var(--cl-cool); }
    .target-value.auto-val { color: var(--cl-auto); }
    .target-value.off { color: var(--t4); }

    /* ════════════════════════════════════════════
       SHARED CONTROL STYLES (used in both modes)
       ════════════════════════════════════════════ */

    /* ── Chip row (HVAC modes, presets, fan, swing) ── */
    .chip-row { display: flex; gap: 4px; flex-wrap: wrap; }
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
    @media (hover: hover) { .chip:active { transform: scale(0.96); } }
    @media (pointer: coarse) { .chip:active { animation: bounce 0.3s ease; } }
    .chip.active {
      border-color: var(--chip-color, rgba(249,115,22,0.15));
      background: color-mix(in srgb, var(--chip-color, var(--cl-heat)) 10%, transparent);
      color: var(--chip-color, var(--cl-heat));
    }

    /* ── Stepper row (inline small stepper, used by climate-controls.ts) ── */
    .stepper-row {
      display: flex; align-items: center; justify-content: space-between;
      padding: 2px 0;
    }
    .stepper-label {
      font-size: 11px; font-weight: 600; color: var(--t2);
      display: flex; align-items: center;
    }
    .stepper { display: flex; align-items: center; gap: 8px; }
    .stepper-value {
      font-size: 14px; font-weight: 700; color: var(--t1);
      min-width: 52px; text-align: center;
    }

    /* ── btn-icon ── */
    .btn-icon {
      display: inline-flex; align-items: center; justify-content: center;
      border-radius: var(--radius-md); background: var(--s2);
      border: 1px solid var(--b2); cursor: pointer; padding: 0;
      outline: none; font-family: inherit;
      transition: all var(--t-fast); -webkit-tap-highlight-color: transparent;
    }
    .btn-icon.xs { width: 28px; height: 28px; }
    .btn-icon:focus-visible { outline: 2px solid rgba(255,255,255,0.25); outline-offset: -2px; }
    @media (hover: hover) and (pointer: fine) {
      .btn-icon:hover { background: var(--s3); border-color: var(--b3); }
    }
    @media (hover: hover) { .btn-icon:active { transform: scale(0.96); } }
    @media (pointer: coarse) { .btn-icon:active { animation: bounce 0.3s ease; } }
    .btn-icon:disabled { opacity: 0.3; pointer-events: none; }

    /* ── Range slider ── */
    .range-slider-row { display: flex; flex-direction: column; gap: 6px; padding: 4px 0; }
    .range-labels { display: flex; justify-content: space-between; }
    .range-label { font-size: 12px; font-weight: 700; }
    .range-label.heat { color: var(--cl-heat); }
    .range-label.cool { color: var(--cl-cool); }
    .range-track {
      position: relative; height: 28px;
      background: var(--s1); border-radius: var(--radius-lg);
      border: 1px solid var(--b1);
      touch-action: none; user-select: none; -webkit-user-select: none;
    }
    .range-fill {
      position: absolute; top: 0; height: 100%;
      border-radius: inherit; pointer-events: none;
      background: linear-gradient(90deg, var(--cl-heat), var(--cl-cool));
      opacity: 0.2;
    }
    .range-thumb {
      position: absolute; top: 50%; transform: translate(-50%, -50%);
      width: 16px; height: 16px; border-radius: 50%;
      border: 2px solid; cursor: grab; outline: none;
      transition: box-shadow var(--t-fast);
      -webkit-tap-highlight-color: transparent;
    }
    .range-thumb:active { cursor: grabbing; }
    .range-thumb:focus-visible { box-shadow: 0 0 0 3px rgba(255,255,255,0.25); }
    .range-thumb.low {
      background: var(--cl-heat); border-color: var(--cl-heat);
      box-shadow: 0 0 8px rgba(249,115,22,0.4);
    }
    .range-thumb.high {
      background: var(--cl-cool); border-color: var(--cl-cool);
      box-shadow: 0 0 8px rgba(56,189,248,0.4);
    }

    /* ── Aux heat toggle ── */
    .aux-row { display: flex; align-items: center; gap: 6px; padding: 4px 0; }
    .aux-label { font-size: 11px; font-weight: 600; color: var(--t2); flex: 1; }
    .toggle {
      position: relative; width: 40px; height: 22px; border-radius: 11px;
      background: var(--s2); border: 1px solid var(--b2); cursor: pointer;
      transition: all var(--t-fast); padding: 0; outline: none;
      font-family: inherit; -webkit-tap-highlight-color: transparent;
    }
    .toggle .toggle-knob {
      content: ''; position: absolute; top: 3px; left: 3px;
      width: 14px; height: 14px; border-radius: 50%;
      background: var(--t3);
      transition: transform var(--t-fast), background var(--t-fast), box-shadow var(--t-fast);
    }
    .toggle.on { background: rgba(249,115,22,0.2); border-color: rgba(249,115,22,0.3); }
    .toggle.on .toggle-knob {
      transform: translateX(18px); background: var(--cl-heat);
      box-shadow: 0 0 8px rgba(249,115,22,0.4);
    }
    .toggle:focus-visible { outline: 2px solid rgba(255,255,255,0.25); outline-offset: 2px; }
  `];
}

customElements.define('glass-climate-card', GlassClimateCard);
