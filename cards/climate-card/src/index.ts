import { html, nothing, type PropertyValues, type TemplateResult } from 'lit';
import { property, state } from 'lit/decorators.js';
import {
  BaseCard,
  BackendService,
  getAreaEntities,
  getDashboardEntityIds,
  resolveEntityAreaId,
  isEntityVisibleNow,
  fireHaptic,
  type EntityScheduleMap,
  type HassEntity,
} from '@glass-cards/base-card';
import { glassTokens, hostMixin, glassMixin, foldMixin, marqueeMixin, bounceMixin, unavailableMixin, isEntityUnavailable } from '@glass-cards/ui-core';
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
  ACTION_LABELS,
  renderHvacModes,
  renderPresets,
} from './climate-modes';
import { renderArcGauge } from './climate-arc';
import { ThermalCanvas } from './climate-canvas';
import { climateCardStyles } from './styles';
import './editor';

// — Constants —

const ACTION_ORDER: Record<string, number> = { heating: 0, cooling: 1, idle: 2, off: 3 };

/** Translate a fan_mode ('fm') or swing_mode ('sm') value to a user-facing
 *  label. Falls back to the raw value with underscores → spaces when the
 *  mode isn't a known HA standard (vendor-specific quirks like Daikin
 *  "wind_free", Samsung "comfort", etc.). */
function translateModeLabel(prefix: 'fm' | 'sm', mode: string): string {
  const slug = mode.toLowerCase().replace(/[^a-z0-9]+/g, '_');
  const key = `climate.${prefix}_${slug}`;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const translated = t(key as any);
  return translated === key ? mode.replace(/_/g, ' ') : translated;
}

// — Backend config interfaces —

interface ClimateBackendConfig {
  show_header: boolean;
  display_mode: 'list' | 'normal';
  dashboard_display_mode: 'list' | 'normal';
  dashboard_entities: string[];
  hidden_entities: string[];
}

interface RoomClimateConfig {
  hidden_entities: string[];
  entity_order: string[];
}

// — Component —

export class GlassClimateCard extends BaseCard {
  static getConfigElement() {
    return document.createElement('glass-climate-card-editor');
  }

  getCardSize() {
    return 3;
  }

  @property({ attribute: false }) areaId?: string;
  @property({ attribute: false }) visibleAreaIds?: string[];

  // Shared state
  @state() private _showHeader = true;
  @state() private _displayMode: 'list' | 'normal' = 'list';
  @state() private _configReady = false;

  // List mode state
  @state() private _expanded: string | null = null;

  // Normal mode state
  @state() private _selectedEntity: string | null = null;
  @state() private _foldOpen = false;

  private _climateConfigLoaded = false;
  private _roomConfig: RoomClimateConfig | null = null;
  private _roomConfigLoaded = false;
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
      this._dashboardHiddenEntities = new Set<string>();
      this._dashboardHiddenLoaded = false;
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
      if (this._lastLoadedAreaId !== this.areaId) {
        this._lastLoadedAreaId = this.areaId;
        this._resetForNewArea();
      }
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

    // Clear stale pending temp/humidity values once HA state catches up
    if (changedProps.has('hass') && this._pendingTemps.size > 0) {
      let changed = false;
      for (const [key, pending] of this._pendingTemps) {
        const isHumidity = key.startsWith('humidity_');
        const entityId = key.slice(isHumidity ? 'humidity_'.length : 'temp_'.length);
        const entity = this.hass?.states[entityId];
        if (!entity) continue;
        const haVal = isHumidity
          ? (entity.attributes.humidity as number | undefined)
          : (entity.attributes.temperature as number | undefined);
        const tolerance = isHumidity ? 2 : ((entity.attributes.target_temp_step as number) || 0.5);
        if (haVal != null && Math.abs(haVal - pending) <= tolerance) {
          this._pendingTemps.delete(key);
          changed = true;
        }
      }
      if (changed) this.requestUpdate();
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
    if (this._isDashboardMode && this.hass) {
      return getDashboardEntityIds('climate', this.hass, this.visibleAreaIds);
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
        // Dashboard context uses dashboard_display_mode, popup uses display_mode
        this._displayMode = this.areaId
          ? (result.climate_card.display_mode ?? 'list')
          : (result.climate_card.dashboard_display_mode ?? 'list');
        this._dashboardEntities = result.climate_card.dashboard_entities ?? [];
        const configHidden = result.climate_card.hidden_entities ?? [];
        for (const id of configHidden) this._dashboardHiddenEntities.add(id);
        this._cachedClimateIds = undefined;
        this._cachedClimatesFingerprint = '';
      }
      this._configReady = true;
      this.requestUpdate();
    } catch {
      // Unblock the render but retry the load on the next hass tick.
      this._configReady = true;
      this._climateConfigLoaded = false;
    }
  }

  private async _loadRoomConfig(): Promise<void> {
    if (!this.hass || !this.areaId || this._roomConfigLoaded) return;
    this._roomConfigLoaded = true;
    const areaId = this.areaId;
    try {
      if (!this._backend) this._backend = new BackendService(this.hass);
      const result = await this._backend.send<RoomClimateConfig | null>('get_room', { area_id: areaId });
      if (this.areaId !== areaId) return;
      this._roomConfig = result;
      this._cachedClimateIds = undefined;
      this._cachedClimatesFingerprint = '';
      this.requestUpdate();
    } catch {
      if (this.areaId === areaId) this._roomConfigLoaded = false;
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
    const capturedAreaIds = this.visibleAreaIds;
    const areas = capturedAreaIds?.length ? capturedAreaIds : Object.keys(this.hass.areas ?? {});
    if (areas.length === 0) return;
    try {
      if (!this._backend) this._backend = new BackendService(this.hass);
      const backend = this._backend;
      const hidden = new Set<string>();
      const results = await Promise.all(
        areas.map((aId) => backend.send<{ hidden_entities: string[] } | null>('get_room', { area_id: aId })),
      );
      if (this.visibleAreaIds !== capturedAreaIds) return;
      for (const result of results) {
        if (result?.hidden_entities) {
          for (const id of result.hidden_entities) hidden.add(id);
        }
      }
      this._dashboardHiddenEntities = hidden;
      this._cachedClimateIds = undefined;
      this._cachedClimatesFingerprint = '';
      this.requestUpdate();
    } catch {
      if (this.visibleAreaIds === capturedAreaIds) this._dashboardHiddenLoaded = false;
    }
  }

  private _resetForNewArea(): void {
    this._roomConfig = null;
    this._roomConfigLoaded = false;
    this._expanded = null;
    this._selectedEntity = null;
    this._foldOpen = false;
    this._cachedClimateIds = undefined;
    this._cachedClimatesFingerprint = '';
    for (const timer of this._throttleTimers.values()) clearTimeout(timer);
    this._throttleTimers.clear();
    this._pendingTemps.clear();
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
        return this._dashboardEntities.filter((id) => this.hass?.states[id] && !this._dashboardHiddenEntities.has(id) && isEntityVisibleNow(id, this._schedules));
      }
      const areas = this.visibleAreaIds?.length ? this.visibleAreaIds : Object.keys(this.hass.areas ?? {});
      if (areas.length === 0 || !this.hass.entities || !this.hass.devices) return [];
      const ids: string[] = [];
      for (const aId of areas) {
        for (const e of getAreaEntities(aId, this.hass.entities, this.hass.devices)) {
          if (e.entity_id.startsWith('climate.') && !this._dashboardHiddenEntities.has(e.entity_id) && isEntityVisibleNow(e.entity_id, this._schedules)) ids.push(e.entity_id);
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
        this._safeCallService('climate', 'turn_on', {}, { entity_id: entityId });
      } else {
        const modes = (entity.attributes.hvac_modes as string[]) || [];
        const firstMode = modes.find((m) => m !== 'off');
        if (firstMode) {
          this._safeCallService('climate', 'set_hvac_mode', { hvac_mode: firstMode }, { entity_id: entityId });
        }
      }
    } else {
      if (features & CF.TURN_OFF) {
        this._safeCallService('climate', 'turn_off', {}, { entity_id: entityId });
      } else {
        this._safeCallService('climate', 'set_hvac_mode', { hvac_mode: 'off' }, { entity_id: entityId });
      }
    }
  }

  private _setHvacMode(entityId: string, mode: string): void {
    if (!this.hass) return;
    fireHaptic(this, 'light');
    this._safeCallService('climate', 'set_hvac_mode', { hvac_mode: mode }, { entity_id: entityId });
  }

  private _setPreset(entityId: string, preset: string): void {
    if (!this.hass) return;
    fireHaptic(this, 'light');
    this._safeCallService('climate', 'set_preset_mode', { preset_mode: preset }, { entity_id: entityId });
  }

  private _setFanMode(entityId: string, mode: string): void {
    if (!this.hass) return;
    this._safeCallService('climate', 'set_fan_mode', { fan_mode: mode }, { entity_id: entityId });
  }

  private _setSwingMode(entityId: string, mode: string): void {
    if (!this.hass) return;
    this._safeCallService('climate', 'set_swing_mode', { swing_mode: mode }, { entity_id: entityId });
  }

  private _setTemperature(entityId: string, temp: number): void {
    if (!this.hass) return;
    fireHaptic(this, 'light');
    this._pendingTemps.set(`temp_${entityId}`, temp);
    this.requestUpdate();
    const key = `temp_throttle_${entityId}`;
    const existing = this._throttleTimers.get(key);
    if (existing) clearTimeout(existing);
    this._throttleTimers.set(key, setTimeout(() => {
      this._throttleTimers.delete(key);
      this._safeCallService('climate', 'set_temperature', { temperature: temp }, { entity_id: entityId });
      // The pending value stays until HA confirms; the stale-clear in
      // updated() drops it, avoiding a visual bounce to the old value.
    }, 400));
  }

  private _setTemperatureRange(entityId: string, low: number, high: number): void {
    if (!this.hass) return;
    const key = `range_throttle_${entityId}`;
    const existing = this._throttleTimers.get(key);
    if (existing) clearTimeout(existing);
    this._throttleTimers.set(key, setTimeout(() => {
      this._throttleTimers.delete(key);
      this._safeCallService('climate', 'set_temperature', {
        target_temp_low: low,
        target_temp_high: high,
      }, { entity_id: entityId });
    }, 400));
  }

  private _setHumidity(entityId: string, humidity: number): void {
    if (!this.hass) return;
    this._pendingTemps.set(`humidity_${entityId}`, humidity);
    this.requestUpdate();
    const key = `humidity_throttle_${entityId}`;
    const existing = this._throttleTimers.get(key);
    if (existing) clearTimeout(existing);
    this._throttleTimers.set(key, setTimeout(() => {
      this._throttleTimers.delete(key);
      this._safeCallService('climate', 'set_humidity', { humidity }, { entity_id: entityId });
    }, 400));
  }

  private _toggleAuxHeat(entityId: string, entity: HassEntity): void {
    if (!this.hass) return;
    const isOn = entity.attributes.aux_heat === 'on';
    this._safeCallService('climate', 'set_aux_heat', { aux_heat: !isOn }, { entity_id: entityId });
  }

  // — Range drag —

  private _onRangeDragStart(thumb: 'low' | 'high', e: PointerEvent, entityId: string): void {
    e.preventDefault();
    if (this._rangeDragCleanup) { this._rangeDragCleanup(); this._rangeDragCleanup = null; }
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
    if (isEntityUnavailable(entity.state)) return 'mdi:thermostat-off';
    const registryIcon = this.hass?.entities[entityId]?.icon;
    const attrIcon = entity.attributes.icon as string | undefined;
    return registryIcon || attrIcon || HVAC_ICONS[entity.state] || 'mdi:thermostat';
  }

  // ════════════════════════════════════════════════════════════════
  //  RENDER — dispatches to list or normal mode
  // ════════════════════════════════════════════════════════════════

  protected render() {
    void this._lang;
    if (!this._configReady) return nothing;
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
            <glass-empty-state
              icon="mdi:thermometer-off"
              .title=${t('climate.no_climates')}
            ></glass-empty-state>
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
    const activeCount = climates.filter((c) => {
      const a = (c.attributes.hvac_action as string) || '';
      return a === 'heating' || a === 'cooling' || a === 'preheating';
    }).length;
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
        <span class="card-header-right">${avg != null ? `${t('climate.avg_label')} ${avg}${unit}` : ''}</span>
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
    const unavailable = isEntityUnavailable(entity.state);
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

    const gesture = this._bindGesture({
      onTap: () => { if (!unavailable) this._toggle(entityId, entity, new Event('tap')); },
      onLongPress: () => { if (!unavailable) this._expanded = isExpanded ? null : entityId; },
      exclude: 'glass-icon-button',
    });

    const isHeating = hvacAction === 'heating' || hvacAction === 'preheating';
    const isCooling = hvacAction === 'cooling';
    const iconActiveColor = isHeating ? 'heat' : isCooling ? 'cool' : 'info';
    const iconActive = isHeating || isCooling;
    const pulseClass = isHeating ? 'pulse-heat' : isCooling ? 'pulse-cool' : '';

    return html`
      <div class="cl-row ${unavailable ? 'entity-unavailable' : ''}" data-action=${hvacAction}
        @pointerdown=${gesture.pointerdown}
        @pointermove=${gesture.pointermove}
        @pointerup=${gesture.pointerup}
        @pointercancel=${gesture.pointercancel}
        @contextmenu=${gesture.contextmenu}
      >
        <glass-icon-button
          ?active=${iconActive}
          ?glow=${iconActive}
          ?unavailable=${unavailable}
          ?disabled=${unavailable}
          .activeColor=${iconActiveColor}
          aria-label=${isOff ? t('climate.turn_on_aria') : t('climate.turn_off_aria')}
          @click=${(e: Event) => this._toggle(entityId, entity, e)}
        >
          <ha-icon class=${pulseClass} .icon=${icon}></ha-icon>
        </glass-icon-button>
        <button class="cl-expand-area" type="button" aria-expanded=${isExpanded ? 'true' : 'false'}
          @click=${(e: MouseEvent) => {
            // detail === 0 → synthetic click from Enter/Space; pointer taps are
            // handled by the row gesture (tap = toggle, long-press = expand).
            if (e.detail === 0 && !unavailable) this._expanded = isExpanded ? null : entityId;
          }}
        >
          <div class="cl-info">
            <div class="cl-name">${name}</div>
            <div class="cl-sub">
              <span class="cl-action-text">${t(actionKey as Parameters<typeof t>[0])}</span>
              ${!isOff ? html`<span class="cl-mode-badge">${modeBadgeText}</span>` : nothing}
            </div>
          </div>
          <div class="cl-temps">
            <div class="cl-temp-current">${unavailable ? '--' : (currentTemp != null ? html`${currentTemp.toFixed(1)}<span class="unit">°</span>` : '--')}</div>
            ${!isOff && targetTemp != null ? html`<div class="cl-temp-target">→ ${targetTemp.toFixed(1)}°</div>` : nothing}
          </div>
          ${unavailable
            ? html`<span class="unavailable-badge"><ha-icon .icon=${'mdi:alert-circle-outline'}></ha-icon></span>`
            : nothing}
        </button>
      </div>
    `;
  }

  private _renderListFold(entityId: string, entity: HassEntity): TemplateResult | typeof nothing {
    // Always render the fold (even for unavailable entities, where expand is
    // blocked upstream) so the 0fr->1fr grid transition has a node to animate.
    const isExpanded = this._expanded === entityId;
    const hvacAction = this._getHvacAction(entity);
    const sepColor = hvacAction === 'cooling' ? 'cool' : '';

    const tempControl = this._renderListTempControl(entityId, entity);
    const sectionSepClass = sepColor === 'cool' ? 'cool' : (hvacAction === 'heating' || hvacAction === 'preheating') ? 'heat' : '';

    return html`
      <div class="fold-sep ${isExpanded ? 'visible' : ''} ${sepColor}"></div>
      <div class="ctrl-fold ${isExpanded ? 'open' : ''}">
        <div class="ctrl-fold-inner">
          <div class="ctrl-panel">
            ${tempControl}
            ${tempControl !== nothing ? html`<div class="section-sep ${sectionSepClass}"></div>` : nothing}
            ${this._renderFoldControls(entityId, entity)}
          </div>
        </div>
      </div>
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
        <glass-stepper-button
          .icon=${'mdi:minus'}
          ?disabled=${target <= min}
          aria-label=${t('climate.temp_down_aria')}
          @click=${() => this._setTemperature(entityId, Math.max(min, target - step))}
        ></glass-stepper-button>
        <div class="temp-display">
          <div class="temp-display-label">${t('climate.target')}</div>
          <div class="temp-display-value ${colorClass}">${target.toFixed(1)}<span class="unit">${unit}</span></div>
          ${currentTemp != null ? html`
            <div class="temp-display-current">
              <span style="--mdc-icon-size:13px;display:inline-flex;align-items:center;justify-content:center;"><ha-icon .icon=${'mdi:thermometer'}></ha-icon></span>
              <span>${t('climate.current_label')} ${currentTemp.toFixed(1)}${unit}</span>
            </div>
          ` : nothing}
        </div>
        <glass-stepper-button
          .icon=${'mdi:plus'}
          ?disabled=${target >= max}
          aria-label=${t('climate.temp_up_aria')}
          @click=${() => this._setTemperature(entityId, Math.min(max, target + step))}
        ></glass-stepper-button>
      </div>
    `;
  }

  // Shared fold controls (modes, presets, air section)
  private _renderFoldControls(entityId: string, entity: HassEntity): TemplateResult {
    const hvacAction = this._getHvacAction(entity);
    const sepClass = (hvacAction === 'heating' || hvacAction === 'preheating') ? 'heat'
      : hvacAction === 'cooling' ? 'cool' : '';
    const hvacModes = renderHvacModes(entity, (mode) => this._setHvacMode(entityId, mode));
    const presets = renderPresets(entity, (preset) => this._setPreset(entityId, preset));
    const airSection = this._renderAirSection(entityId, entity);

    return html`
      ${hvacModes}
      ${presets !== nothing ? html`
        ${hvacModes !== nothing ? html`<div class="section-sep ${sepClass}"></div>` : nothing}
        ${presets}
      ` : nothing}
      ${airSection !== nothing ? html`
        ${(hvacModes !== nothing || presets !== nothing) ? html`<div class="section-sep ${sepClass}"></div>` : nothing}
        ${airSection}
      ` : nothing}
    `;
  }

  private _renderAirSection(entityId: string, entity: HassEntity): TemplateResult | typeof nothing {
    const features = (entity.attributes.supported_features as number) || 0;
    const isOff = entity.state === 'off';
    const fanModes = !isOff && (features & CF.FAN_MODE) ? (entity.attributes.fan_modes as string[]) || [] : [];
    const swingModes = !isOff && (features & CF.SWING_MODE) ? (entity.attributes.swing_modes as string[]) || [] : [];
    const hasHumidity = !isOff && !!(features & CF.TARGET_HUMIDITY) && entity.attributes.humidity != null;
    const hasAux = !!(features & CF.AUX_HEAT);

    if (!fanModes.length && !swingModes.length && !hasHumidity && !hasAux) return nothing;

    const currentFan = entity.attributes.fan_mode as string | undefined;
    const currentSwing = entity.attributes.swing_mode as string | undefined;

    return html`
      <div class="air-section">
        ${fanModes.length ? html`
          <div class="air-row">
            <glass-section-title label=${t('climate.fan_mode')}></glass-section-title>
            <div class="air-pills">
              ${fanModes.map((m) => html`
                <glass-chip
                  size="sm"
                  active-color="info"
                  ?active=${m === currentFan}
                  aria-label="${t('climate.fan_mode')}: ${m}"
                  @click=${() => this._setFanMode(entityId, m)}
                >${translateModeLabel('fm', m)}</glass-chip>
              `)}
            </div>
          </div>
        ` : nothing}
        ${swingModes.length ? html`
          <div class="air-row">
            <glass-section-title label=${t('climate.swing_mode')}></glass-section-title>
            <div class="air-pills">
              ${swingModes.map((m) => html`
                <glass-chip
                  size="sm"
                  active-color="info"
                  ?active=${m === currentSwing}
                  aria-label="${t('climate.swing_mode')}: ${m}"
                  @click=${() => this._setSwingMode(entityId, m)}
                >${translateModeLabel('sm', m)}</glass-chip>
              `)}
            </div>
          </div>
        ` : nothing}
        ${hasHumidity ? renderHumidityStepper(entity, (val) => this._setHumidity(entityId, val), this._pendingTemps.get(`humidity_${entityId}`)) : nothing}
        ${hasAux ? renderAuxHeat(entity, () => this._toggleAuxHeat(entityId, entity)) : nothing}
      </div>
    `;
  }

  // ════════════════════════════════════════════════════════════════
  //  NORMAL MODE (arc gauge)
  // ════════════════════════════════════════════════════════════════

  private _renderNormalMode(climates: HassEntity[]): TemplateResult {
    // Respect user-defined order when dashboard_entities is set; otherwise sort by hvac action
    const sorted = this._dashboardEntities.length > 0 || (this._roomConfig?.entity_order?.length ?? 0) > 0
      ? climates
      : [...climates].sort((a, b) => {
          const aAction = this._getHvacAction(a);
          const bAction = this._getHvacAction(b);
          return (ACTION_ORDER[aAction] ?? 3) - (ACTION_ORDER[bAction] ?? 3);
        });
    const selectedId = this._selectedEntity || sorted[0]?.entity_id;
    const entity = sorted.find((c) => c.entity_id === selectedId) || sorted[0];
    if (!entity) return html``;

    const hvacAction = this._getHvacAction(entity);
    const tintClass = (hvacAction === 'heating' || hvacAction === 'preheating') ? 'heat'
      : hvacAction === 'cooling' ? 'cool'
      : (entity.state === 'auto' || entity.state === 'heat_cool') ? 'auto-tint' : '';
    const foldSepClass = (hvacAction === 'heating' || hvacAction === 'preheating') ? 'heat-sep'
      : hvacAction === 'cooling' ? 'cool-sep' : '';

    const gesture = this._bindGesture({
      onTap: () => {
        this._toggle(entity.entity_id, entity, new Event('tap'));
      },
      onLongPress: () => {
        this._foldOpen = !this._foldOpen;
        const card = this.renderRoot.querySelector('.climate-card') as HTMLElement | null;
        if (card) {
          card.classList.add('lp-pulse');
          card.addEventListener('animationend', () => card.classList.remove('lp-pulse'), { once: true });
        }
      },
      onSwipe: (dir) => {
        if (sorted.length <= 1) return;
        const curIdx = sorted.findIndex((c) => c.entity_id === selectedId);
        const nextIdx = dir === 'left'
          ? (curIdx + 1) % sorted.length
          : (curIdx - 1 + sorted.length) % sorted.length;
        this._selectedEntity = sorted[nextIdx].entity_id;
      },
      exclude: 'button, glass-icon-button, glass-chip, glass-toggle, glass-stepper-button, .entity-tab, .mode-tile',
    });

    return html`
      ${this._showHeader ? this._renderHeader(climates) : nothing}
      <div class="climate-wrap ${this._foldOpen ? 'fold-open' : ''}">
        <div class="glass climate-card normal-mode"
          @pointerdown=${gesture.pointerdown}
          @pointermove=${gesture.pointermove}
          @pointerup=${gesture.pointerup}
          @pointercancel=${gesture.pointercancel}
          @contextmenu=${gesture.contextmenu}>
          <div class="tint ${tintClass}"></div>
          <div class="thermal-canvas" id="thermal-canvas-wrap">
            <canvas id="thermal-canvas"></canvas>
          </div>
          <div class="card-inner">
            ${this._renderEntityTabs(sorted)}
            ${renderArcGauge(entity)}
            ${this._renderNormalTempStepper(entity)}
          </div>
        </div>
        <div class="ctrl-fold ${this._foldOpen ? 'open' : ''}">
          <div class="ctrl-fold-inner normal-fold-inner" data-tint=${tintClass || 'none'}>
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

    const selectedId = this._selectedEntity || climates[0]?.entity_id;

    return html`
      <div class="entity-tabs">
        ${climates.map((entity) => {
          const friendlyName = (entity.attributes.friendly_name as string) || entity.entity_id;
          const hvacAction = this._getHvacAction(entity);
          const isSelected = entity.entity_id === selectedId;
          const colorClass = (hvacAction === 'heating' || hvacAction === 'preheating') ? 'heat' : hvacAction === 'cooling' ? 'cool' : '';

          // Resolve room icon for this entity
          const regEntry = this.hass?.entities[entity.entity_id];
          const areaId = regEntry ? resolveEntityAreaId(regEntry, this.hass?.devices) : null;
          const area = areaId ? this.hass?.areas[areaId] : null;
          const roomIcon = area?.icon || 'mdi:home';

          return html`
            <button class="entity-tab ${isSelected ? 'active' : ''} ${colorClass}"
              @click=${() => { this._selectedEntity = entity.entity_id; }}
              aria-label=${friendlyName}
              aria-pressed=${isSelected ? 'true' : 'false'}>
              <ha-icon .icon=${roomIcon} style="--mdc-icon-size:16px;display:flex;align-items:center;justify-content:center;"></ha-icon>
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
        <glass-stepper-button
          surface="dark"
          .icon=${'mdi:minus'}
          ?disabled=${target <= min}
          aria-label=${t('climate.temp_down_aria')}
          @click=${() => this._setTemperature(entityId, Math.max(min, target - step))}
        ></glass-stepper-button>
        <div class="target-display">
          <div class="target-label">${t('climate.target')}</div>
          <div class="target-value ${colorClass}">${target.toFixed(1)}<span class="unit">${this._tempUnit()}</span></div>
        </div>
        <glass-stepper-button
          surface="dark"
          .icon=${'mdi:plus'}
          ?disabled=${target >= max}
          aria-label=${t('climate.temp_up_aria')}
          @click=${() => this._setTemperature(entityId, Math.min(max, target + step))}
        ></glass-stepper-button>
      </div>
    `;
  }

  // ════════════════════════════════════════════════════════════════
  //  STYLES
  // ════════════════════════════════════════════════════════════════

  static styles = [glassTokens, hostMixin, glassMixin, foldMixin, marqueeMixin, bounceMixin, unavailableMixin, climateCardStyles];
}

try { customElements.define('glass-climate-card', GlassClimateCard); } catch { /* already registered */ }
