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
  renderTempStepper,
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

// — Constants —

const ACTION_COLORS: Record<string, string> = {
  heating: 'var(--cl-heat)',
  cooling: 'var(--cl-cool)',
  drying: 'var(--cl-dry)',
  fan: 'var(--cl-fan)',
  preheating: 'var(--cl-heat)',
  idle: 'var(--t4)',
  off: 'transparent',
};

const PULSE_ACTIONS = new Set(['heating', 'cooling', 'drying', 'preheating']);

// — Backend config interfaces —

interface ClimateBackendConfig {
  show_header: boolean;
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

  @state() private _expanded: string | null = null;
  @state() private _showHeader = true;

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
  }

  protected _collapseExpanded(): void {
    if (this._expanded !== null) this._expanded = null;
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

    // Load schedules
    if (this.hass && !this._schedulesLoaded) {
      this._loadSchedules();
    }

    // Load climate config
    if (this.hass && !this._climateConfigLoaded) {
      this._loadConfig();
    }

    // Load room config when areaId available or changes
    if (this.areaId && this.hass) {
      if (this._lastLoadedAreaId !== this.areaId) {
        this._resetForNewArea();
      }
      if (!this._roomConfigLoaded) {
        this._loadRoomConfig();
      }
    }

    // Load dashboard hidden entities
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
    // Invalidate when visible areas change (dashboard mode)
    if (changedProps.has('visibleAreaIds')) {
      this._cachedClimateIds = undefined;
      this._cachedClimatesFingerprint = '';
      this._dashboardHiddenLoaded = false;
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
    // Dashboard mode
    if (this._isDashboardMode) {
      // If dashboard_entities configured, use those
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

    // Build fingerprint
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

    // Dashboard mode: show all (not just active — climate always visible)
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
        // Set to first non-off mode
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
    if (isOn) {
      this.hass.callService('climate', 'set_aux_heat', { aux_heat: false }, { entity_id: entityId });
    } else {
      this.hass.callService('climate', 'set_aux_heat', { aux_heat: true }, { entity_id: entityId });
    }
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

  // — Helpers —

  private _tempUnit(): string {
    // Access hass.config (exists at runtime but not in our type defs)
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
    const avg = temps.reduce((a, b) => a + b, 0) / temps.length;
    return avg.toFixed(1);
  }

  // — Render —

  protected render() {
    void this._lang;
    const climates = this._getClimates();

    // Dashboard mode: hide when no climates
    if (this._isDashboardMode) {
      if (climates.length === 0) {
        this.style.display = 'none';
        return nothing;
      }
      this.style.display = '';
    }

    // Room mode: show empty state
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

    const activeCount = climates.filter((c) => c.state !== 'off' && c.state !== 'unavailable').length;
    const total = climates.length;

    return html`
      ${this._showHeader ? this._renderHeader(climates) : nothing}
      <div class="glass climate-card">
        <div class="tint" style="background:radial-gradient(ellipse at 30% 30%, var(--cl-heat), transparent 70%);opacity:${total > 0 ? (activeCount / total * 0.12).toFixed(3) : '0'};"></div>
        <div class="card-inner">
          ${climates.map((c, i) => {
            const entityId = c.entity_id;
            const isLast = i === climates.length - 1;
            return html`
              ${this._renderRow(entityId, c)}
              ${this._renderControlFold(entityId, c, isLast)}
            `;
          })}
        </div>
      </div>
    `;
  }

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
          ${avg != null ? html`<span class="card-avg">${avg}${unit}</span>` : nothing}
        </div>
      </div>
    `;
  }

  private _renderRow(entityId: string, entity: HassEntity): TemplateResult {
    const attrs = entity.attributes;
    const name = (attrs.friendly_name as string) || entityId.split('.')[1] || entityId;
    const isUnavailable = entity.state === 'unavailable' || entity.state === 'unknown';
    const isOff = entity.state === 'off';
    const hvacAction = (attrs.hvac_action as string) || '';
    const currentTemp = attrs.current_temperature as number | undefined;
    const unit = this._tempUnit();
    const isExpanded = this._expanded === entityId;

    // Icon
    const registryIcon = this.hass?.entities[entityId]?.icon;
    const attrIcon = attrs.icon as string | undefined;
    const icon = isUnavailable ? 'mdi:thermostat-off' : (registryIcon || attrIcon || (HVAC_ICONS[entity.state] || 'mdi:thermostat'));

    // Tint color by hvac_action
    const tintColor = ACTION_COLORS[hvacAction] || (isOff ? 'transparent' : 'var(--t4)');
    const isPulsing = PULSE_ACTIONS.has(hvacAction);

    return html`
      <div class="climate-row ${isUnavailable ? 'unavailable' : ''} ${!isOff && !isUnavailable ? 'on' : ''}">
        <button
          class="climate-icon-btn"
          @click=${(e: Event) => this._toggle(entityId, entity, e)}
          aria-label=${isOff ? t('climate.turn_on_aria') : t('climate.turn_off_aria')}
          ?disabled=${isUnavailable}
          style="${!isOff && !isUnavailable ? `background:${tintColor}20;border-color:${tintColor}30;` : ''}"
        >
          <ha-icon
            .icon=${icon}
            style="--mdc-icon-size:18px;display:flex;align-items:center;justify-content:center;${!isOff && !isUnavailable ? `color:${tintColor};filter:drop-shadow(0 0 6px ${tintColor});` : 'color:var(--t3);'}"
          ></ha-icon>
        </button>
        <button
          class="climate-expand-btn"
          @click=${() => { if (!isUnavailable) this._expanded = isExpanded ? null : entityId; }}
          aria-label=${name}
          aria-expanded=${isExpanded ? 'true' : 'false'}
        >
          <div class="climate-info">
            <div class="climate-name">${marqueeText(name, MARQUEE_COMPACT)}</div>
            <div class="climate-sub">
              <span class="climate-temp">${isUnavailable ? '--' : (currentTemp != null ? `${currentTemp.toFixed(1)}${unit}` : '--')}</span>
              <span class="climate-dot ${isPulsing ? 'pulse' : ''}" style="background:${isUnavailable ? 'var(--t4)' : tintColor};${isPulsing ? `box-shadow:0 0 8px ${tintColor};` : ''}"></span>
            </div>
          </div>
          ${!isUnavailable ? html`
            <ha-icon
              .icon=${'mdi:chevron-down'}
              class="chevron ${isExpanded ? 'open' : ''}"
              style="--mdc-icon-size:16px;display:flex;align-items:center;justify-content:center;"
            ></ha-icon>
          ` : nothing}
        </button>
      </div>
    `;
  }

  private _renderControlFold(entityId: string, entity: HassEntity, isLast: boolean): TemplateResult {
    const isExpanded = this._expanded === entityId;
    const isUnavailable = entity.state === 'unavailable' || entity.state === 'unknown';

    if (isUnavailable) {
      return html`<div class="fold-sep"></div>`;
    }

    return html`
      <div class="fold-sep ${isExpanded ? 'visible' : ''}"></div>
      <div class="ctrl-fold ${isExpanded ? 'open' : ''}">
        <div class="ctrl-fold-inner">
          <div class="ctrl-panel">
            ${this._renderControls(entityId, entity)}
          </div>
        </div>
      </div>
      ${!isLast ? html`<div class="fold-sep ${isExpanded ? 'visible' : ''}"></div>` : nothing}
    `;
  }

  private _renderControls(entityId: string, entity: HassEntity): TemplateResult {
    const unit = this._tempUnit();
    const rangeState: RangeSliderState = this._rangeDragEntity === entityId
      ? this._rangeState
      : { dragging: null, lowTemp: 0, highTemp: 0 };

    return html`
      ${renderTempStepper(entity, unit, (temp) => this._setTemperature(entityId, temp), this._pendingTemps.get(`temp_${entityId}`))}
      ${renderRangeSlider(
        entity, unit, rangeState,
        (low, high) => this._setTemperatureRange(entityId, low, high),
        (thumb, e) => this._onRangeDragStart(thumb, e, entityId),
      )}
      ${renderHvacModes(entity, (mode) => this._setHvacMode(entityId, mode))}
      ${renderPresets(entity, (preset) => this._setPreset(entityId, preset))}
      ${renderFanModes(entity, (mode) => this._setFanMode(entityId, mode))}
      ${renderSwingModes(entity, (mode) => this._setSwingMode(entityId, mode))}
      ${renderHumidityStepper(entity, (val) => this._setHumidity(entityId, val), this._pendingTemps.get(`humidity_${entityId}`))}
      ${renderAuxHeat(entity, () => this._toggleAuxHeat(entityId, entity))}
    `;
  }

  // — Styles —

  static styles = [glassTokens, glassMixin, foldMixin, marqueeMixin, bounceMixin, css`
    :host {
      display: block;
      width: 100%;
      max-width: 500px;
      margin: 0 auto;
      font-family: 'Plus Jakarta Sans', sans-serif;

      /* Climate tokens */
      --cl-heat: #f97316;
      --cl-cool: #3b82f6;
      --cl-dry: #eab308;
      --cl-auto: #8b5cf6;
      --cl-fan: #06b6d4;
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
    .card-count.some { background: rgba(239,140,79,0.15); color: var(--cl-heat); }
    .card-count.none { background: var(--s2); color: var(--t3); }
    .card-count.all  { background: rgba(239,140,79,0.2); color: var(--cl-heat); }
    .card-avg {
      font-size: 10px; font-weight: 600; color: var(--t3);
      letter-spacing: 0.3px;
    }

    /* ── Card Body ── */
    .climate-card { position: relative; padding: 2px 14px; }
    .card-inner { position: relative; z-index: 1; }
    .tint { transition: opacity var(--t-slow), background var(--t-slow); }

    .empty-state {
      padding: 16px; text-align: center;
      font-size: 12px; color: var(--t3);
    }

    /* ── Climate Row ── */
    .climate-row {
      display: flex; align-items: center; gap: 10px;
      padding: 8px 4px; position: relative;
      transition: background var(--t-fast); border-radius: var(--radius-md);
    }
    .climate-row.unavailable { opacity: 0.4; pointer-events: none; }
    @media (hover: hover) and (pointer: fine) {
      .climate-row:hover { background: var(--s1); }
    }
    @media (pointer: coarse) {
      .climate-row:active { animation: bounce 0.3s ease; }
    }

    /* ── Icon Button ── */
    .climate-icon-btn {
      width: 36px; height: 36px; border-radius: 10px;
      background: var(--s2); border: 1px solid var(--b1);
      display: flex; align-items: center; justify-content: center; flex-shrink: 0;
      transition: all var(--t-fast); cursor: pointer; padding: 0; outline: none;
      font-family: inherit; -webkit-tap-highlight-color: transparent;
    }
    .climate-icon-btn:focus-visible { outline: 2px solid rgba(255,255,255,0.25); outline-offset: -2px; }
    @media (hover: hover) and (pointer: fine) {
      .climate-icon-btn:hover { background: var(--s3); border-color: var(--b2); }
    }
    @media (hover: hover) and (pointer: fine) {
      .climate-icon-btn:active { transform: scale(0.96); }
    }
    @media (pointer: coarse) {
      .climate-icon-btn:active { animation: bounce 0.3s ease; }
    }

    /* ── Expand Button ── */
    .climate-expand-btn {
      flex: 1; min-width: 0;
      display: flex; align-items: center; gap: 10px;
      background: none; border: none; padding: 0;
      font-family: inherit; cursor: pointer; outline: none;
      text-align: left; color: inherit;
      -webkit-tap-highlight-color: transparent;
    }
    .climate-expand-btn:focus-visible {
      outline: 2px solid rgba(255,255,255,0.25); outline-offset: 2px;
      border-radius: var(--radius-sm);
    }

    /* ── Climate Info ── */
    .climate-info { flex: 1; min-width: 0; }
    .climate-name {
      font-size: 13px; font-weight: 600; color: var(--t1); line-height: 1.2;
      white-space: nowrap; overflow: hidden;
    }
    .climate-sub { display: flex; align-items: center; gap: 5px; margin-top: 2px; }
    .climate-temp {
      font-size: 10px; font-weight: 500; color: var(--t3);
      transition: color var(--t-med);
    }

    /* ── Dot ── */
    .climate-dot {
      width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0;
      background: var(--t4); transition: all var(--t-med);
    }
    .climate-dot.pulse {
      animation: dot-pulse 2s ease-in-out infinite;
    }
    @keyframes dot-pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.3; }
    }

    /* ── Chevron ── */
    .chevron {
      color: var(--t4); transition: transform var(--t-fast);
      flex-shrink: 0;
    }
    .chevron.open { transform: rotate(180deg); }

    /* ── Fold separator ── */
    .fold-sep {
      height: 0; margin: 0 12px; overflow: hidden;
      background: linear-gradient(90deg, transparent, rgba(239,140,79,0.2), transparent);
      opacity: 0; transition: height var(--t-layout), opacity var(--t-layout);
    }
    .fold-sep.visible { height: 1px; opacity: 1; }

    /* ── Controls fold ── */
    .ctrl-fold {
      display: grid; grid-template-rows: 0fr;
      transition: grid-template-rows var(--t-layout);
    }
    .ctrl-fold.open { grid-template-rows: 1fr; }
    .ctrl-fold-inner {
      overflow: hidden;
      opacity: 0; transition: opacity var(--t-fast);
    }
    .ctrl-fold.open .ctrl-fold-inner { opacity: 1; transition-delay: 0.1s; }

    .ctrl-panel {
      padding: 6px 0 4px;
      display: flex; flex-direction: column; gap: 10px;
    }

    /* ── Chip row (HVAC modes, presets, fan, swing) ── */
    .chip-row { display: flex; gap: 6px; flex-wrap: wrap; }
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
    @media (hover: hover) and (pointer: fine) {
      .chip:active { transform: scale(0.96); }
    }
    @media (pointer: coarse) {
      .chip:active { animation: bounce 0.3s ease; }
    }
    .chip.active {
      border-color: var(--chip-color, rgba(239,140,79,0.15));
      background: color-mix(in srgb, var(--chip-color, var(--cl-heat)) 10%, transparent);
      color: var(--chip-color, var(--cl-heat));
    }

    /* ── Stepper row ── */
    .stepper-row {
      display: flex; align-items: center; justify-content: space-between;
      padding: 2px 0;
    }
    .stepper-label {
      font-size: 11px; font-weight: 600; color: var(--t2);
      display: flex; align-items: center;
    }
    .stepper {
      display: flex; align-items: center; gap: 8px;
    }
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
    @media (hover: hover) and (pointer: fine) {
      .btn-icon:active { transform: scale(0.96); }
    }
    @media (pointer: coarse) {
      .btn-icon:active { animation: bounce 0.3s ease; }
    }
    .btn-icon:disabled { opacity: 0.3; pointer-events: none; }

    /* ── Range slider ── */
    .range-slider-row {
      display: flex; flex-direction: column; gap: 6px;
      padding: 4px 0;
    }
    .range-labels {
      display: flex; justify-content: space-between;
    }
    .range-label {
      font-size: 12px; font-weight: 700;
    }
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
      box-shadow: 0 0 8px rgba(239,140,79,0.4);
    }
    .range-thumb.high {
      background: var(--cl-cool); border-color: var(--cl-cool);
      box-shadow: 0 0 8px rgba(79,195,247,0.4);
    }

    /* ── Humidity stepper ── */

    /* ── Aux heat toggle ── */
    .aux-row {
      display: flex; align-items: center; gap: 6px;
      padding: 4px 0;
    }
    .aux-label {
      font-size: 11px; font-weight: 600; color: var(--t2);
      flex: 1;
    }

    /* ── Toggle ── */
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
    .toggle.on { background: rgba(239,140,79,0.2); border-color: rgba(239,140,79,0.3); }
    .toggle.on .toggle-knob {
      transform: translateX(18px); background: var(--cl-heat);
      box-shadow: 0 0 8px rgba(239,140,79,0.4);
    }
    .toggle:focus-visible { outline: 2px solid rgba(255,255,255,0.25); outline-offset: 2px; }
  `];
}

customElements.define('glass-climate-card', GlassClimateCard);
