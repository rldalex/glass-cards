import { html, nothing, type PropertyValues, type TemplateResult } from 'lit';
import { property, state } from 'lit/decorators.js';
import {
  BaseCard,
  BackendService,
  getAreaEntities,
  getDashboardEntityIds,
  isEntityVisibleNow,
  fireHaptic,
  type EntityScheduleMap,
  type HassEntity,
  type LovelaceCardConfig,
} from '@glass-cards/base-card';
import {
  glassTokens, hostMixin, glassMixin, foldMixin, marqueeMixin, bounceMixin,
  unavailableMixin, isEntityUnavailable,
  rgbToHs, rgbToHex, hexToRgb, rgbToWheelPos, drawColorWheel, colorFromWheelEvent,
} from '@glass-cards/ui-core';
import { t } from '@glass-cards/i18n';
import {
  type LightInfo,
  COLOR_DOTS, ALLOWED_EFFECTS,
  detectLightType, getTempInfo, rgbToRgba, hsClose, effectIcon,
  buildLayout, computeTint, sliderColor, foldColor, lightTintStyle,
} from './light-utils';
import { lightCardStyles } from './styles';
import './editor';

// — Component —

export class GlassLightCard extends BaseCard {
  static getConfigElement() {
    return document.createElement('glass-light-card-editor');
  }

  @property({ attribute: false }) areaId?: string;
  @property({ attribute: false }) visibleAreaIds?: string[];
  @state() private _expandedEntity: string | null = null;
  @state() private _dragValues = new Map<string, number>();
  @state() private _colorPickerEntity: string | null = null;
  @state() private _colorPickerRgb: [number, number, number] | null = null;
  @state() private _colorPickerPos: { x: number; y: number } | null = null;
  private _colorPickerHs: { h: number; s: number } | null = null;
  @state() private _showHeader = true;
  private _lightConfigLoaded = false;
  private _throttleTimers = new Map<string, ReturnType<typeof setTimeout>>();
  private _roomConfig: {
    hidden_entities: string[];
    entity_order: string[];
    entity_layouts: Record<string, string>;
  } | null = null;
  private _roomConfigLoaded = false;
  private _lastLoadedAreaId?: string;
  private _backend?: BackendService;
  private _cachedLightIds?: string[];
  private _cachedLightsResult?: HassEntity[];
  private _lightsFingerprint = '';
  private _schedules: EntityScheduleMap | null = null;
  private _schedulesLoaded = false;
  private _dashboardHiddenEntities = new Set<string>();
  private _dashboardHiddenLoaded = false;

  private get _isDashboardMode(): boolean {
    const area = this.areaId || (this._config?.area as string | undefined);
    return !area && !this._config?.entity;
  }

  static styles = [
    glassTokens,
    hostMixin,
    glassMixin,
    foldMixin,
    marqueeMixin,
    bounceMixin,
    unavailableMixin,
    lightCardStyles,
  ];



  setConfig(config: LovelaceCardConfig) {
    super.setConfig(config);
  }

  getCardSize() {
    if (this._isDashboardMode) {
      const count = this._getLights().length;
      return count === 0 ? 1 : Math.min(count, 6) + 1;
    }
    return 3;
  }

  protected _collapseExpanded(): void {
    if (this._expandedEntity !== null) this._expandedEntity = null;
    if (this._colorPickerEntity !== null) this._closeColorPicker();
  }

  connectedCallback() {
    super.connectedCallback();
    this._listen('room-config-changed', (payload) => {
      const area = this.areaId || (this._config?.area as string | undefined);
      if (area && payload.areaId === area) {
        this._roomConfigLoaded = false;
        this._cachedLightIds = undefined; this._lightsFingerprint = '';
        this._loadRoomConfig();
      }
      // Dashboard mode: reload hidden entities from all rooms
      if (this._isDashboardMode) {
        this._dashboardHiddenLoaded = false;
        this._dashboardTotalCache = undefined;
        this._cachedLightIds = undefined; this._lightsFingerprint = '';
        this._loadDashboardHidden();
      }
    });
    this._listen('schedule-changed', () => {
      this._schedulesLoaded = false;
      this._cachedLightIds = undefined; this._lightsFingerprint = '';
      this._loadSchedules();
    });
    this._listen('light-config-changed', () => {
      this._lightConfigLoaded = false;
      this._loadLightConfig();
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._cancelWheelDrag?.();
    this._cancelWheelDrag = undefined;
    this._wheelCanvas = null;
    this._throttleTimers.forEach((t) => clearTimeout(t));
    this._throttleTimers.clear();
    this._backend = undefined;
    this._schedulesLoaded = false;
    this._lightConfigLoaded = false;
    this._roomConfigLoaded = false;
    this._dashboardHiddenLoaded = false;
  }

  private async _loadRoomConfig() {
    const area = this.areaId || (this._config?.area as string | undefined);
    if (!area || !this.hass || this._roomConfigLoaded) return;
    this._roomConfigLoaded = true;
    this._lastLoadedAreaId = area;
    try {
      if (!this._backend) this._backend = new BackendService(this.hass);
      const result = await this._backend.send<{
        hidden_entities: string[];
        entity_order: string[];
        entity_layouts: Record<string, string>;
      } | null>('get_room', { area_id: area });
      const currentArea = this.areaId || (this._config?.area as string | undefined);
      if (currentArea !== area) return;
      this._roomConfig = result;
      this._cachedLightIds = undefined; this._lightsFingerprint = '';
      this.requestUpdate();
    } catch {
      this._roomConfigLoaded = false;
    }
  }

  private async _loadSchedules() {
    if (!this.hass || this._schedulesLoaded) return;
    this._schedulesLoaded = true;
    try {
      if (!this._backend) this._backend = new BackendService(this.hass);
      const result = await this._backend.send<EntityScheduleMap>('get_schedules');
      this._schedules = result;
      this._cachedLightIds = undefined; this._lightsFingerprint = '';
      this.requestUpdate();
    } catch {
      this._schedulesLoaded = false;
    }
  }

  private async _loadLightConfig() {
    if (!this.hass || this._lightConfigLoaded) return;
    this._lightConfigLoaded = true;
    try {
      if (!this._backend) this._backend = new BackendService(this.hass);
      const result = await this._backend.send<{
        light_card: { show_header: boolean };
      }>('get_config');
      if (result?.light_card) {
        this._showHeader = result.light_card.show_header ?? true;
      }
    } catch {
      this._lightConfigLoaded = false;
    }
  }

  private async _loadDashboardHidden() {
    if (!this.hass || this._dashboardHiddenLoaded || !this._isDashboardMode) return;
    this._dashboardHiddenLoaded = true;
    // Snapshot the prop reference: if visibleAreaIds changes mid-loop a new
    // load is triggered and this stale one must not overwrite its result.
    const capturedAreaIds = this.visibleAreaIds;
    const areas = capturedAreaIds?.length ? capturedAreaIds : Object.keys(this.hass.areas ?? {});
    if (areas.length === 0) return;
    try {
      if (!this._backend) this._backend = new BackendService(this.hass);
      const hidden = new Set<string>();
      for (const aId of areas) {
        if (this.visibleAreaIds !== capturedAreaIds) return;
        const result = await this._backend.send<{
          hidden_entities: string[];
        } | null>('get_room', { area_id: aId });
        if (result?.hidden_entities) {
          for (const id of result.hidden_entities) hidden.add(id);
        }
      }
      if (this.visibleAreaIds !== capturedAreaIds) return;
      this._dashboardHiddenEntities = hidden;
      this._cachedLightIds = undefined; this._lightsFingerprint = '';
      this._dashboardTotalCache = undefined;
      this.requestUpdate();
    } catch {
      this._dashboardHiddenLoaded = false;
    }
  }

  private _resetForNewArea() {
    this._roomConfig = null;
    this._roomConfigLoaded = false;
    this._expandedEntity = null;
    this._dragValues = new Map();
    this._cachedLightIds = undefined; this._lightsFingerprint = '';
    this._throttleTimers.forEach((t) => clearTimeout(t));
    this._throttleTimers.clear();
  }

  protected getTrackedEntityIds(): string[] {
    if (this._isDashboardMode && this.hass) {
      return getDashboardEntityIds('light', this.hass, this.visibleAreaIds);
    }
    return this._getLights().map((e) => e.entity_id);
  }

  updated(changedProps: PropertyValues) {
    super.updated(changedProps);

    // Invalidate backend on WS reconnect
    if (changedProps.has('hass') && this.hass && this._backend && this._backend.connection !== this.hass.connection) {
      this._backend = undefined;
      this._roomConfigLoaded = false;
      this._schedulesLoaded = false;
      this._lightConfigLoaded = false;
      this._dashboardHiddenLoaded = false;
    }

    // Load schedules
    if (this.hass && !this._schedulesLoaded) {
      this._loadSchedules();
    }

    // Load light card config
    if (this.hass && !this._lightConfigLoaded) {
      this._loadLightConfig();
    }

    // Load room config from backend when areaId is available or changes
    const area = this.areaId || (this._config?.area as string | undefined);
    if (area && this.hass) {
      if (this._lastLoadedAreaId !== area) {
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

    // Invalidate structure cache when entities registry changes (new/removed entities)
    if (changedProps.has('hass') && this.hass) {
      const oldHass = changedProps.get('hass') as { entities?: unknown } | undefined;
      if (oldHass && oldHass.entities !== this.hass.entities) {
        this._cachedLightIds = undefined; this._lightsFingerprint = '';
      }
    }
    // Invalidate when visible areas change (dashboard mode)
    if (changedProps.has('visibleAreaIds')) {
      this._cachedLightIds = undefined; this._lightsFingerprint = '';
      this._dashboardHiddenLoaded = false;
    }

    const lights = this._getLightInfos();
    const anyOn = lights.some((l) => l.isOn);
    if (anyOn) {
      this.setAttribute('lights-on', '');
    } else {
      this.removeAttribute('lights-on');
    }

    // Clear stale drag values once HA state catches up
    if (changedProps.has('hass') && this._dragValues.size > 0) {
      let changed = false;
      const next = new Map(this._dragValues);
      for (const info of lights) {
        const briKey = `bri:${info.entityId}`;
        const briDrag = next.get(briKey);
        if (briDrag !== undefined && Math.abs(info.brightnessPct - briDrag) <= 2) {
          next.delete(briKey);
          changed = true;
        }
        const tempKey = `temp:${info.entityId}`;
        const tempDrag = next.get(tempKey);
        if (
          tempDrag !== undefined &&
          info.colorTempKelvin !== null &&
          Math.abs(info.colorTempKelvin - tempDrag) <= 50
        ) {
          next.delete(tempKey);
          changed = true;
        }
      }
      if (changed) this._dragValues = next;
    }

    // Draw color wheel canvas when picker opens (redraw if entity changed)
    if (this._colorPickerEntity) {
      const canvas = this.renderRoot.querySelector('.cp-wheel-wrap canvas') as HTMLCanvasElement | null;
      if (canvas && canvas.dataset.drawnFor !== this._colorPickerEntity) {
        drawColorWheel(canvas);
        canvas.dataset.drawnFor = this._colorPickerEntity;
      }
    }
  }

  // — Data —

  /** Resolve cached light IDs to current hass.states — memoized via entity fingerprint */
  private _getLights(): HassEntity[] {
    if (!this.hass) return [];
    const ids = this._getLightIds();
    // Build fingerprint from tracked entities' state + last_updated
    const fp = ids.map((id) => {
      const e = this.hass?.states[id];
      return e ? `${id}:${e.state}:${e.last_updated}` : `${id}:-`;
    }).join('|');
    if (fp === this._lightsFingerprint && this._cachedLightsResult) {
      return this._cachedLightsResult;
    }
    this._lightsFingerprint = fp;
    let result: HassEntity[];
    // Dashboard mode: filter to ON lights only and sort by name
    if (this._isDashboardMode) {
      result = ids
        .map((id) => this.hass?.states[id])
        .filter((e): e is HassEntity => !!e && e.state === 'on' && isEntityVisibleNow(e.entity_id, this._schedules))
        .sort((a, b) => {
          const nameA = (a.attributes.friendly_name as string) || a.entity_id;
          const nameB = (b.attributes.friendly_name as string) || b.entity_id;
          return nameA.localeCompare(nameB);
        });
    } else {
      result = ids
        .map((id) => this.hass?.states[id])
        .filter((s): s is HassEntity => s !== undefined);
    }
    this._cachedLightsResult = result;
    return result;
  }

  /** Return ordered list of light entity IDs — cached, only recomputed on structural changes */
  private _getLightIds(): string[] {
    if (this._cachedLightIds) return this._cachedLightIds;
    this._cachedLightIds = this._computeLightIds();
    return this._cachedLightIds;
  }

  /** Discover and order light entity IDs (expensive: area lookup, filtering, sorting) */
  private _computeLightIds(): string[] {
    if (!this.hass) return [];
    const area = this.areaId || (this._config?.area as string | undefined);
    if (area) {
      const configHidden = (this._config?.hidden_entities as string[] | undefined) ?? [];
      const backendHidden = this._roomConfig?.hidden_entities ?? [];
      const hiddenSet = new Set<string>([...configHidden, ...backendHidden]);

      const ids = getAreaEntities(area, this.hass.entities, this.hass.devices)
        .filter((e) => e.entity_id.startsWith('light.') && !hiddenSet.has(e.entity_id) && isEntityVisibleNow(e.entity_id, this._schedules))
        .map((e) => e.entity_id);

      // Apply custom order: Lovelace config takes priority, then backend
      const configOrder = (this._config?.entity_order as string[] | undefined) ?? [];
      const order = configOrder.length > 0 ? configOrder : (this._roomConfig?.entity_order ?? []);
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
    if (this._config?.entity) {
      if (!isEntityVisibleNow(this._config.entity, this._schedules)) return [];
      return this.hass.states[this._config.entity] ? [this._config.entity] : [];
    }
    // Dashboard mode: all light IDs from visible areas (filtering to ON is done in _getLights)
    if (this._isDashboardMode) {
      const areas = this.visibleAreaIds?.length ? this.visibleAreaIds : Object.keys(this.hass.areas ?? {});
      if (areas.length === 0 || !this.hass.entities || !this.hass.devices) return [];
      const ids: string[] = [];
      for (const aId of areas) {
        for (const e of getAreaEntities(aId, this.hass.entities, this.hass.devices)) {
          if (e.entity_id.startsWith('light.') && !this._dashboardHiddenEntities.has(e.entity_id)) ids.push(e.entity_id);
        }
      }
      return ids;
    }
    return [];
  }

  /** Total number of lights across visible areas (on + off) — dashboard mode only. */
  private _dashboardTotalCache?: number;
  private _dashboardTotalEntitiesRef?: unknown;

  private _getDashboardLightTotal(): number {
    if (!this.hass || !this.hass.entities || !this.hass.devices) return 0;
    if (this._dashboardTotalCache !== undefined && this._dashboardTotalEntitiesRef === this.hass.entities) {
      return this._dashboardTotalCache;
    }
    const areas = this.visibleAreaIds?.length ? this.visibleAreaIds : Object.keys(this.hass.areas ?? {});
    if (areas.length === 0) return 0;
    const ids = new Set<string>();
    for (const aId of areas) {
      for (const e of getAreaEntities(aId, this.hass.entities, this.hass.devices)) {
        if (e.entity_id.startsWith('light.') && !this._dashboardHiddenEntities.has(e.entity_id)) ids.add(e.entity_id);
      }
    }
    this._dashboardTotalEntitiesRef = this.hass.entities;
    this._dashboardTotalCache = ids.size;
    return ids.size;
  }

  private _getLightInfos(): LightInfo[] {
    return this._getLights().map((entity) => this._buildLightInfo(entity));
  }

  private _buildLightInfo(entity: HassEntity): LightInfo {
    const isOn = entity.state === 'on';
    const type = detectLightType(entity);
    const brightness = entity.attributes.brightness as number | undefined;
    // Simple (no-dim) lights have no `brightness` attribute. When such a lamp
    // is ON, treat it as 100% by convention so the tint / halo intensity
    // reflects "fully lit" instead of 0%.
    const brightnessPct = isOn
      ? brightness !== undefined ? Math.round((brightness / 255) * 100) : 100
      : 0;

    let colorTempKelvin: number | null = null;
    const minKelvin = (entity.attributes.min_color_temp_kelvin as number) || 2000;
    const maxKelvin = (entity.attributes.max_color_temp_kelvin as number) || 6500;
    if (isOn && type === 'color_temp') {
      colorTempKelvin = (entity.attributes.color_temp_kelvin as number) || null;
    }

    let rgbColor: [number, number, number] | null = null;
    if (isOn && type === 'rgb') {
      rgbColor = (entity.attributes.rgb_color as [number, number, number]) || null;
    }

    const registryIcon = this.hass?.entities[entity.entity_id]?.icon;
    const attrIcon = entity.attributes.icon as string | undefined;
    const icon = registryIcon || attrIcon || 'mdi:lightbulb';

    return {
      entity,
      entityId: entity.entity_id,
      name: (entity.attributes.friendly_name as string) || entity.entity_id,
      icon,
      isOn,
      type,
      brightnessPct,
      colorTempKelvin,
      minKelvin,
      maxKelvin,
      rgbColor,
    };
  }

  // — Actions —

  private _toggleLight(entityId: string) {
    fireHaptic(this, 'light');
    this._safeCallService('light', 'toggle', {}, { entity_id: entityId });
  }

  private _toggleAll() {
    fireHaptic(this, 'light');
    const lights = this._getLights();
    const anyOn = lights.some((l) => l.state === 'on');
    const service = anyOn ? 'turn_off' : 'turn_on';
    const ids = lights.map((l) => l.entity_id);
    this._safeCallService('light', service, {}, { entity_id: ids });
    if (anyOn) {
      this._expandedEntity = null;
    }
  }

  private _turnAllOff() {
    const lights = this._getLights();
    const ids = lights.map((l) => l.entity_id);
    this._safeCallService('light', 'turn_off', {}, { entity_id: ids });
    this._expandedEntity = null;
  }

  private _hasControls(info: LightInfo): boolean {
    if (info.type !== 'simple') return true;
    const effects = info.entity.attributes.effect_list as string[] | undefined;
    if (effects && effects.length > 0) {
      const lowerEffects = effects.map((e) => e.toLowerCase());
      const available = ALLOWED_EFFECTS.filter((e) => e === 'off' || lowerEffects.includes(e));
      if (available.length > 1) return true;
    }
    return false;
  }

  private _expandFold(entityId: string, isOn: boolean, info?: LightInfo) {
    if (!info) info = this._getLightInfos().find((l) => l.entityId === entityId);
    if (info && !this._hasControls(info)) return;
    if (!isOn) {
      this._toggleLight(entityId);
      return;
    }
    if (this._expandedEntity === entityId) {
      this._expandedEntity = null;
    } else {
      this._expandedEntity = entityId;
    }
  }

  private _onSliderInput(key: string, value: number, send: (v: number) => void) {
    const next = new Map(this._dragValues);
    next.set(key, value);
    this._dragValues = next;

    // Trailing throttle: always send the latest value at end of window
    const existing = this._throttleTimers.get(key);
    if (existing !== undefined) clearTimeout(existing);
    this._throttleTimers.set(
      key,
      setTimeout(() => {
        this._throttleTimers.delete(key);
        send(this._dragValues.get(key) ?? value);
      }, 100),
    );
  }

  private _onSliderChange(key: string, value: number, send: (v: number) => void) {
    fireHaptic(this, 'light');
    // Persist the exact committed value so stale-clear logic compares correctly
    const next = new Map(this._dragValues);
    next.set(key, value);
    this._dragValues = next;
    send(value);
    const timer = this._throttleTimers.get(key);
    if (timer !== undefined) clearTimeout(timer);
    this._throttleTimers.delete(key);
  }

  private _setBrightness(entityId: string, value: number) {
    this._safeCallService('light', 'turn_on', { brightness_pct: value }, { entity_id: entityId });
  }

  private _setColorTemp(entityId: string, kelvin: number) {
    this._safeCallService(
      'light',
      'turn_on',
      { color_temp_kelvin: kelvin },
      { entity_id: entityId },
    );
  }

  private _setHsColor(entityId: string, hue: number, sat: number) {
    this._safeCallService('light', 'turn_on', { hs_color: [hue, sat * 100] }, { entity_id: entityId });
  }

  private _setEffect(entityId: string, effect: string) {
    this._safeCallService('light', 'turn_on', { effect }, { entity_id: entityId });
  }

  private _openColorPicker(entityId: string, currentRgb: [number, number, number] | null) {
    this._colorPickerEntity = entityId;
    this._colorPickerRgb = currentRgb ?? [255, 255, 255];
    this._colorPickerPos = currentRgb ? rgbToWheelPos(currentRgb) : null;
    this._colorPickerHs = currentRgb ? rgbToHs(currentRgb) : null;
  }

  private _closeColorPicker() {
    this._cancelWheelDrag?.();
    this._cancelWheelDrag = undefined;
    this._wheelCanvas = null;
    if (this._colorPickerEntity) {
      const cpKey = `cp:${this._colorPickerEntity}`;
      const timer = this._throttleTimers.get(cpKey);
      if (timer !== undefined) clearTimeout(timer);
      this._throttleTimers.delete(cpKey);
    }
    this._colorPickerEntity = null;
    this._colorPickerRgb = null;
    this._colorPickerPos = null;
    this._colorPickerHs = null;
  }

  private _wheelCanvas: HTMLCanvasElement | null = null;
  private _cancelWheelDrag?: () => void;

  private _onWheelInteraction(e: MouseEvent | TouchEvent) {
    const canvas = this._wheelCanvas;
    if (!canvas) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const result = colorFromWheelEvent(canvas, clientX, clientY);
    this._colorPickerPos = result.pos;
    this._colorPickerRgb = result.rgb;
    this._colorPickerHs = result.hs;

    // Throttled live preview — send hs_color to HA
    if (this._colorPickerEntity) {
      const key = `cp:${this._colorPickerEntity}`;
      const existing = this._throttleTimers.get(key);
      if (existing !== undefined) clearTimeout(existing);
      this._throttleTimers.set(
        key,
        setTimeout(() => {
          this._throttleTimers.delete(key);
          if (this._colorPickerEntity && this._colorPickerHs) {
            this._setHsColor(this._colorPickerEntity, this._colorPickerHs.h, this._colorPickerHs.s);
          }
        }, 150),
      );
    }
  }

  // — Layout —

  private _getEntityLayout(entityId: string): 'full' | 'compact' {
    const configLayouts = (this._config?.entity_layouts as Record<string, string> | undefined) ?? {};
    const backendLayouts = this._roomConfig?.entity_layouts ?? {};
    const layout = configLayouts[entityId] || backendLayouts[entityId];
    return (layout as 'full' | 'compact') === 'full' ? 'full' : 'compact';
  }

  private _isCompact(light: LightInfo): boolean {
    return this._getEntityLayout(light.entityId) === 'compact';
  }

  // — Sub text —

  private _renderSubText(info: LightInfo): TemplateResult | TemplateResult[] | typeof nothing {
    if (!info.isOn) {
      return html`<span class="light-brightness-text">${t('common.off')}</span>`;
    }
    if (info.type === 'simple') {
      return html`<span class="light-brightness-text">${t('common.on')}</span>`;
    }

    const parts: TemplateResult[] = [
      html`<span class="light-brightness-text">${info.brightnessPct}%</span>`,
    ];

    if (info.type === 'color_temp' && info.colorTempKelvin) {
      const ti = getTempInfo(info.colorTempKelvin);
      parts.push(html`<span class="light-temp-dot" style="background:${ti.color}"></span>`);
      parts.push(html`<span class="light-temp-text">${t(ti.labelKey)}</span>`);
    }

    if (info.type === 'rgb' && info.rgbColor) {
      const hex = rgbToHex(info.rgbColor);
      parts.push(html`<span class="light-temp-dot" style="background:${hex}"></span>`);
      parts.push(html`<span class="light-temp-text">${t('light.color')}</span>`);
    }

    return parts;
  }

  // — Render: Light Row —

  private _renderLightRow(info: LightInfo, compact: boolean, isRight: boolean): TemplateResult {
    const unavailable = isEntityUnavailable(info.entity.state);
    const rowClasses = ['light-row', compact ? 'compact' : '', isRight ? 'compact-right' : '', unavailable ? 'entity-unavailable' : '']
      .filter(Boolean)
      .join(' ');

    const rgbStyle =
      info.isOn && info.type === 'rgb' && info.rgbColor
        ? `--light-rgb:${rgbToHex(info.rgbColor)};--light-rgb-bg:${rgbToRgba(info.rgbColor, 0.1)};--light-rgb-border:${rgbToRgba(info.rgbColor, 0.15)};--light-rgb-glow:${rgbToRgba(info.rgbColor, 0.4)};--light-rgb-sub:${rgbToRgba(info.rgbColor, 0.55)}`
        : '';

    const iconActiveColor = info.isOn && info.rgbColor
      ? `${info.rgbColor[0]},${info.rgbColor[1]},${info.rgbColor[2]}`
      : 'light-glow';

    const gesture = this._bindGesture({
      onTap: () => this._toggleLight(info.entityId),
      onLongPress: () => this._expandFold(info.entityId, info.isOn, info),
      exclude: 'glass-icon-button',
    });

    return html`
      <div
        class=${rowClasses}
        data-on=${info.isOn}
        style=${rgbStyle}
        ?data-rgb=${info.isOn && info.type === 'rgb' && !!info.rgbColor}
        @pointerdown=${gesture.pointerdown}
        @pointerup=${gesture.pointerup}
        @pointermove=${gesture.pointermove}
        @pointercancel=${gesture.pointercancel}
        @contextmenu=${gesture.contextmenu}
      >
        <glass-icon-button
          .icon=${info.icon}
          ?active=${info.isOn}
          ?glow=${info.isOn}
          ?unavailable=${unavailable}
          .activeColor=${iconActiveColor}
          aria-label="${t('light.toggle_aria', { name: info.name })}"
          @click=${() => this._toggleLight(info.entityId)}
        ></glass-icon-button>
        <button
          class="light-expand-btn"
          aria-label="${info.isOn ? t('light.expand_aria', { name: info.name }) : info.name}"
          aria-expanded=${info.isOn ? (this._expandedEntity === info.entityId ? 'true' : 'false') : nothing}
          @click=${(e: MouseEvent) => {
            // detail === 0 → synthetic click from Enter/Space; pointer taps are
            // handled by the row gesture (tap = toggle, long-press = expand).
            if (e.detail === 0) this._expandFold(info.entityId, info.isOn, info);
          }}
        >
          <div class="light-info">
            <div class="light-name">${info.name}</div>
            <div class="light-sub">${this._renderSubText(info)}</div>
          </div>
          ${unavailable
            ? html`<span class="unavailable-badge"><ha-icon .icon=${'mdi:alert-circle-outline'}></ha-icon></span>`
            : html`<span class="light-dot"></span>`}
        </button>
      </div>
    `;
  }

  // — Render: Control Fold —

  private _renderControlFold(info: LightInfo, position: 'full' | 'left' | 'right' = 'full'): TemplateResult {
    const isExpanded = this._expandedEntity === info.entityId && info.isOn;
    const isRgb = info.type === 'rgb';
    const tintStyle = lightTintStyle(info);

    return html`
      <div class="fold-sep fold-sep-${position} ${isExpanded ? 'visible' : ''}" style="--fold-color:${foldColor(info)}"></div>
      <div class="ctrl-fold ${isExpanded ? 'open' : ''}" style=${tintStyle}>
        <div class="ctrl-fold-inner">
          <div class="ctrl-panel" ?data-rgb=${isRgb}>
            ${info.type !== 'simple' ? html`
              <div class="light-section">
                <glass-section-title label=${t('light.section_brightness')}></glass-section-title>
                ${this._renderBrightnessSlider(info, sliderColor(info))}
              </div>
            ` : nothing}
            ${info.type === 'color_temp' ? html`
              <div class="light-section">
                <glass-section-title label=${t('light.section_temperature')}></glass-section-title>
                ${this._renderTempSlider(info)}
              </div>
            ` : nothing}
            ${info.type === 'rgb' ? html`
              <div class="light-section">
                <glass-section-title label=${t('light.section_color')}></glass-section-title>
                ${this._renderColorRow(info)}
              </div>
            ` : nothing}
            ${this._renderEffectsSection(info)}
          </div>
        </div>
      </div>
    `;
  }

  private _renderEffectsSection(info: LightInfo): TemplateResult | typeof nothing {
    const chips = this._renderEffectChips(info);
    if (chips === nothing) return nothing;
    return html`
      <div class="light-section">
        <glass-section-title label=${t('light.section_effects')}></glass-section-title>
        ${chips}
      </div>
    `;
  }

  // — Render: Color Row —

  private _renderColorRow(info: LightInfo): TemplateResult {
    return html`
      <div class="color-row">
        ${COLOR_DOTS.map((rgb) => {
          const isActive = info.rgbColor ? hsClose(info.rgbColor, rgb) : false;
          const hex = rgbToHex(rgb);
          return html`
            <glass-color-swatch
              .color=${hex}
              ?selected=${isActive}
              aria-label="${t('light.color_aria', { hex })}"
              @click=${() => { const hs = rgbToHs(rgb); this._setHsColor(info.entityId, hs.h, hs.s); }}
            ></glass-color-swatch>
          `;
        })}
        <button
          class="color-picker-btn"
          @click=${() => this._openColorPicker(info.entityId, info.rgbColor)}
          aria-label="${t('light.color_picker_aria')}"
        ></button>
      </div>
    `;
  }

  // — Render: Effect Chips —

  private _renderEffectChips(info: LightInfo): TemplateResult | typeof nothing {
    const effects = info.entity.attributes.effect_list as string[] | undefined;
    if (!effects || effects.length === 0) return nothing;
    const available = ALLOWED_EFFECTS.filter((e) => e === 'off' || effects.includes(e));
    if (available.length <= 1) return nothing;
    const currentEffect = (info.entity.attributes.effect as string | undefined)?.toLowerCase();

    return html`
      <div class="effect-row">
        ${available.map((effect) => {
          const isActive = currentEffect === effect || (!currentEffect && effect === 'off');
          return html`
            <glass-chip
              size="sm"
              active-color="light-glow"
              ?active=${isActive}
              .icon=${effectIcon(effect)}
              aria-label="${t(`light.effect_${effect}`)}"
              @click=${() => this._setEffect(info.entityId, effect)}
            >${t(`light.effect_${effect}`)}</glass-chip>
          `;
        })}
      </div>
    `;
  }

  // — Render: Color Picker Popup —

  private _renderColorPicker(): TemplateResult | typeof nothing {
    if (!this._colorPickerEntity || !this._colorPickerRgb) return nothing;
    const rgb = this._colorPickerRgb;
    const hex = rgbToHex(rgb);

    return html`
      <div class="color-picker-overlay" role="presentation" @click=${(e: Event) => {
        if ((e.target as HTMLElement).classList.contains('color-picker-overlay')) this._closeColorPicker();
      }}>
        <div class="color-picker-dialog" role="dialog" aria-modal="true" aria-label="${t('light.color_picker_title')}">
          <glass-icon-button
            class="cp-close-x"
            size="sm"
            .icon=${'mdi:close'}
            aria-label="${t('common.close')}"
            @click=${() => this._closeColorPicker()}
          ></glass-icon-button>
          <div class="cp-wheel-wrap">
            <canvas
              @mousedown=${(e: MouseEvent) => {
                this._wheelCanvas = e.currentTarget as HTMLCanvasElement;
                this._onWheelInteraction(e);
                const onMove = (me: MouseEvent) => this._onWheelInteraction(me);
                const onUp = () => {
                  cleanup();
                  if (this._colorPickerEntity && this._colorPickerHs) {
                    this._setHsColor(this._colorPickerEntity, this._colorPickerHs.h, this._colorPickerHs.s);
                  }
                };
                const cleanup = () => {
                  window.removeEventListener('mousemove', onMove);
                  window.removeEventListener('mouseup', onUp);
                  this._cancelWheelDrag = undefined;
                };
                window.addEventListener('mousemove', onMove);
                window.addEventListener('mouseup', onUp);
                this._cancelWheelDrag = cleanup;
              }}
              @touchstart=${(e: TouchEvent) => {
                e.preventDefault();
                this._wheelCanvas = e.currentTarget as HTMLCanvasElement;
                this._onWheelInteraction(e);
                const onMove = (te: TouchEvent) => { te.preventDefault(); this._onWheelInteraction(te); };
                const onEnd = () => {
                  cleanup();
                  if (this._colorPickerEntity && this._colorPickerHs) {
                    this._setHsColor(this._colorPickerEntity, this._colorPickerHs.h, this._colorPickerHs.s);
                  }
                };
                const cleanup = () => {
                  window.removeEventListener('touchmove', onMove);
                  window.removeEventListener('touchend', onEnd);
                  window.removeEventListener('touchcancel', onEnd);
                  this._cancelWheelDrag = undefined;
                };
                window.addEventListener('touchmove', onMove, { passive: false });
                window.addEventListener('touchend', onEnd);
                window.addEventListener('touchcancel', onEnd);
                this._cancelWheelDrag = cleanup;
              }}
            ></canvas>
            <div class="cp-cursor" style="left:${this._colorPickerPos?.x ?? 50}%;top:${this._colorPickerPos?.y ?? 50}%;background:${hex}"></div>
          </div>
          <div class="cp-preview-row">
            <div class="cp-swatch" style="background:${hex}"></div>
            <span class="cp-hex">${hex}</span>
          </div>
        </div>
      </div>
    `;
  }

  // — Render: Brightness Slider —

  private _renderBrightnessSlider(info: LightInfo, sliderColor: string): TemplateResult {
    const briKey = `bri:${info.entityId}`;
    const localVal = this._dragValues.get(briKey) ?? info.brightnessPct;

    return html`
      <div class="slider-wrap">
        <div class="slider-icon"><ha-icon .icon=${'mdi:brightness-6'}></ha-icon></div>
        <glass-slider
          .value=${localVal}
          .min=${1}
          .max=${100}
          color="${sliderColor}"
          .label=${`${localVal}%`}
          @glass-slider-input=${(e: CustomEvent) => this._onSliderInput(briKey, e.detail.value, (v) => this._setBrightness(info.entityId, v))}
          @glass-slider-change=${(e: CustomEvent) => this._onSliderChange(briKey, e.detail.value, (v) => this._setBrightness(info.entityId, v))}
        ></glass-slider>
      </div>
    `;
  }

  // — Render: Temp Slider —

  private _renderTempSlider(info: LightInfo): TemplateResult {
    const tempKey = `temp:${info.entityId}`;
    const kelvin = info.colorTempKelvin || info.minKelvin;
    const localKelvin = this._dragValues.get(tempKey) ?? kelvin;
    const tempHex = getTempInfo(localKelvin).color;
    const tempColor = hexToRgb(tempHex).join(',');

    return html`
      <div class="slider-wrap">
        <div class="slider-icon"><ha-icon .icon=${'mdi:thermometer'}></ha-icon></div>
        <glass-slider
          .value=${localKelvin}
          .min=${info.minKelvin}
          .max=${info.maxKelvin}
          color="${tempColor}"
          .label=${`${localKelvin}K`}
          @glass-slider-input=${(e: CustomEvent) => this._onSliderInput(tempKey, e.detail.value, (k) => this._setColorTemp(info.entityId, k))}
          @glass-slider-change=${(e: CustomEvent) => this._onSliderChange(tempKey, e.detail.value, (k) => this._setColorTemp(info.entityId, k))}
        ></glass-slider>
      </div>
    `;
  }

  // — Render: Grid —

  private _renderGrid(lights: LightInfo[]): TemplateResult[] {
    const layout = buildLayout(lights, (l) => this._isCompact(l));
    const results: TemplateResult[] = [];

    for (const item of layout) {
      if (item.kind === 'full') {
        results.push(this._renderLightRow(item.light, false, false));
        results.push(this._renderControlFold(item.light, 'full'));
      } else {
        results.push(this._renderLightRow(item.left, true, false));
        if (item.right) {
          results.push(this._renderLightRow(item.right, true, true));
        }
        results.push(this._renderControlFold(item.left, 'left'));
        if (item.right) {
          results.push(this._renderControlFold(item.right, 'right'));
        }
      }
    }

    return results;
  }

  // — Dashboard Render —

  private _renderDashboardGrid(visible: LightInfo[]): TemplateResult[] {
    const results: TemplateResult[] = [];
    let i = 0;
    while (i < visible.length) {
      const left = visible[i];
      const right = i + 1 < visible.length ? visible[i + 1] : null;
      if (right) {
        // Compact pair
        results.push(html`
          ${this._renderLightRow(left, true, false)}
          ${this._renderLightRow(right, true, true)}
          ${this._renderControlFold(left, 'left')}
          ${this._renderControlFold(right, 'right')}
        `);
        i += 2;
      } else {
        // Last odd light: full width
        results.push(html`
          ${this._renderLightRow(left, false, false)}
          ${this._renderControlFold(left, 'full')}
        `);
        i++;
      }
    }
    return results;
  }

  private _renderDashboard(): TemplateResult | typeof nothing {
    const infos = this._getLightInfos();
    if (infos.length === 0) return nothing;

    const maxVisible = 6;
    const visible = infos.slice(0, maxVisible);
    const overflow = infos.length - maxVisible;
    const tint = computeTint(infos);
    const onCount = infos.length;
    const totalLights = Math.max(this._getDashboardLightTotal(), onCount);
    const countClass = onCount === totalLights ? 'all' : 'some';

    return html`
      ${this._showHeader ? html`
        <div class="card-header">
          <div class="card-header-left">
            <span class="card-title">${t('light.dashboard_title')}</span>
            <span class="card-count ${countClass}">${onCount}/${totalLights}</span>
          </div>
          <glass-toggle
            active-color="light-glow"
            .checked=${true}
            aria-label="${t('light.dashboard_turn_all_off_aria')}"
            @glass-toggle-change=${() => this._turnAllOff()}
          ></glass-toggle>
        </div>
      ` : nothing}

      <div class="card glass">
        <div
          class="tint"
          style=${tint ? `background:${tint.background};opacity:${tint.opacity}` : 'opacity:0'}
        ></div>
        <div class="card-inner">
          <div class="lights-grid">
            ${this._renderDashboardGrid(visible)}
          </div>
          ${overflow > 0
            ? html`<div class="dashboard-overflow">
                ${t('light.dashboard_overflow', { count: String(overflow) })}
              </div>`
            : nothing}
        </div>
      </div>
      ${this._renderColorPicker()}
    `;
  }

  // — Main Render —

  render() {
    void this._lang;
    if (this._isDashboardMode) {
      const result = this._renderDashboard();
      this.style.display = result === nothing ? 'none' : '';
      return result;
    }

    const infos = this._getLightInfos();
    if (infos.length === 0) {
      this.style.display = 'none';
      return nothing;
    }
    this.style.display = '';

    const onCount = infos.filter((l) => l.isOn).length;
    const total = infos.length;
    const anyOn = onCount > 0;
    const countClass = onCount === 0 ? 'none' : onCount === total ? 'all' : 'some';

    const tint = computeTint(infos);

    return html`
      ${this._showHeader ? html`
        <div class="card-header">
          <div class="card-header-left">
            <span class="card-title">${t('light.title')}</span>
            <span class="card-count ${countClass}">${onCount}/${total}</span>
          </div>
          <glass-toggle
            active-color="light-glow"
            .checked=${anyOn}
            aria-label="${anyOn ? t('light.toggle_all_on_aria') : t('light.toggle_all_off_aria')}"
            @glass-toggle-change=${() => this._toggleAll()}
          ></glass-toggle>
        </div>
      ` : nothing}

      <div class="card glass">
        <div
          class="tint"
          style=${tint ? `background:${tint.background};opacity:${tint.opacity}` : 'opacity:0'}
        ></div>
        <div class="card-inner">
          <div class="lights-grid">${this._renderGrid(infos)}</div>
        </div>
      </div>
      ${this._renderColorPicker()}
    `;
  }
}

try { customElements.define('glass-light-card', GlassLightCard); } catch { /* scoped registry */ }

