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
} from '@glass-cards/base-card';
import { glassTokens, hostMixin, glassMixin, foldMixin, marqueeMixin, bounceMixin, unavailableMixin, isEntityUnavailable } from '@glass-cards/ui-core';
import { t } from '@glass-cards/i18n';
import {
  FanFeature,
  PRESET_MODE_ICONS,
  presetLabelKey,
  pctToStep,
  stepToPct,
  stepToPctDisplay,
  snapPct,
  spinDuration,
  buildFanInfo,
  hasControls,
  buildLayout,
  type FanInfo,
  type FanBackendConfig,
  type RoomFanConfig,
} from './fan-utils';
import { fanCardStyles } from './styles';
import './editor';

function presetLabel(mode: string): string {
  const key = presetLabelKey(mode);
  if (key) return t(key);
  return mode.charAt(0).toUpperCase() + mode.slice(1);
}

// — Component —

class GlassFanCard extends BaseCard {
  static getConfigElement() {
    return document.createElement('glass-fan-card-editor');
  }

  getCardSize() {
    return 3;
  }

  @property({ attribute: false }) areaId?: string;
  @property({ attribute: false }) visibleAreaIds?: string[];

  @state() private _expandedEntity: string | null = null;
  @state() private _dragValues = new Map<string, number>();
  @state() private _showHeader = true;

  private _fanConfigLoaded = false;
  private _roomConfig: RoomFanConfig | null = null;
  private _roomConfigLoaded = false;
  private _lastLoadedAreaId?: string;
  private _backend?: BackendService;
  private _cachedFanIds?: string[];
  private _cachedFansResult?: FanInfo[];
  private _fansFingerprint = '';
  private _dashboardHiddenEntities = new Set<string>();
  private _dashboardHiddenLoaded = false;
  private _throttleTimers = new Map<string, ReturnType<typeof setTimeout>>();
  private _schedules: EntityScheduleMap | null = null;
  private _schedulesLoaded = false;

  private get _isDashboardMode(): boolean {
    return !this.areaId;
  }

  static styles = [glassTokens, hostMixin, glassMixin, foldMixin, marqueeMixin, bounceMixin, unavailableMixin, fanCardStyles];

  // — Lifecycle —

  connectedCallback(): void {
    super.connectedCallback();
    this._listen('fan-config-changed', () => {
      this._fanConfigLoaded = false;
      this._cachedFanIds = undefined; this._fansFingerprint = '';
      this._loadFanConfig();
    });
    this._listen('room-config-changed', (payload) => {
      const area = this.areaId;
      if (area && payload.areaId === area) {
        this._roomConfigLoaded = false;
        this._roomConfig = null;
        this._cachedFanIds = undefined; this._fansFingerprint = '';
        this._loadRoomConfig();
      }
      // Dashboard mode: reload hidden entities
      if (this._isDashboardMode) {
        this._dashboardHiddenLoaded = false;
        this._loadDashboardHidden();
      }
    });
    this._listen('dashboard-config-changed', () => {
      this._cachedFanIds = undefined; this._fansFingerprint = '';
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
    this._fanConfigLoaded = false;
    this._schedulesLoaded = false;
    this._roomConfigLoaded = false;
    this._dashboardHiddenLoaded = false;
    for (const timer of this._throttleTimers.values()) clearTimeout(timer);
    this._throttleTimers.clear();
  }

  protected _collapseExpanded(): void {
    if (this._expandedEntity !== null) this._expandedEntity = null;
  }

  protected updated(changedProps: PropertyValues): void {
    super.updated(changedProps);

    // Invalidate backend on WS reconnect
    if (changedProps.has('hass') && this.hass && this._backend && this._backend.connection !== this.hass.connection) {
      this._backend = undefined;
      this._fanConfigLoaded = false;
      this._roomConfigLoaded = false;
      this._schedulesLoaded = false;
      this._dashboardHiddenLoaded = false;
    }

    // Load schedules
    if (this.hass && !this._schedulesLoaded) {
      this._loadSchedules();
    }

    // Load fan config
    if (this.hass && !this._fanConfigLoaded) {
      this._loadFanConfig();
    }

    // Load room config when areaId available or changes
    if (this.areaId && this.hass) {
      if (this._lastLoadedAreaId !== this.areaId) {
        this._lastLoadedAreaId = this.areaId;
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
        this._cachedFanIds = undefined; this._fansFingerprint = '';
      }
    }
    // Invalidate when visible areas change (dashboard mode)
    if (changedProps.has('visibleAreaIds')) {
      this._cachedFanIds = undefined; this._fansFingerprint = '';
      this._dashboardHiddenLoaded = false;
    }

    // Clear stale drag values once HA state catches up
    if (changedProps.has('hass') && this._dragValues.size > 0) {
      const fans = this._getFanInfos();
      let changed = false;
      const next = new Map(this._dragValues);
      for (const fan of fans) {
        const key = `speed:${fan.entityId}`;
        const drag = next.get(key);
        if (drag !== undefined && Math.abs(fan.percentage - drag) <= 2) {
          next.delete(key);
          changed = true;
        }
        const lightKey = `light:${fan.entityId}`;
        const lightDrag = next.get(lightKey);
        if (lightDrag !== undefined && fan.lightEntityId) {
          const lightEntity = this.hass?.states[fan.lightEntityId];
          if (lightEntity) {
            const brightness = (lightEntity.attributes.brightness as number) ?? 0;
            const pct = Math.round((brightness / 255) * 100);
            if (Math.abs(pct - lightDrag) <= 2) {
              next.delete(lightKey);
              changed = true;
            }
          }
        }
      }
      if (changed) this._dragValues = next;
    }
  }

  protected getTrackedEntityIds(): string[] {
    if (this._isDashboardMode && this.hass) {
      return getDashboardEntityIds('fan', this.hass, this.visibleAreaIds);
    }
    return this._getFanInfos().map((f) => f.entityId);
  }

  // — Config loading —

  private async _loadFanConfig(): Promise<void> {
    if (!this.hass || this._fanConfigLoaded) return;
    this._fanConfigLoaded = true;
    try {
      if (!this._backend) this._backend = new BackendService(this.hass);
      const result = await this._backend.send<{
        fan_card?: FanBackendConfig;
      }>('get_config');
      if (result?.fan_card) {
        this._showHeader = result.fan_card.show_header ?? true;
      }
    } catch {
      this._fanConfigLoaded = false;
    }
  }

  private async _loadRoomConfig(): Promise<void> {
    if (!this.hass || !this.areaId || this._roomConfigLoaded) return;
    this._roomConfigLoaded = true;
    const areaId = this.areaId;
    try {
      if (!this._backend) this._backend = new BackendService(this.hass);
      const result = await this._backend.send<RoomFanConfig | null>('get_room', { area_id: areaId });
      if (this.areaId !== areaId) return;
      this._roomConfig = result;
      this._cachedFanIds = undefined; this._fansFingerprint = '';
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
      this._cachedFanIds = undefined; this._fansFingerprint = '';
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
      this._cachedFanIds = undefined; this._fansFingerprint = '';
      this.requestUpdate();
    } catch {
      if (this.visibleAreaIds === capturedAreaIds) this._dashboardHiddenLoaded = false;
    }
  }

  private _resetForNewArea(): void {
    this._roomConfig = null;
    this._roomConfigLoaded = false;
    this._expandedEntity = null;
    this._dragValues = new Map();
    this._cachedFanIds = undefined; this._fansFingerprint = '';
    for (const timer of this._throttleTimers.values()) clearTimeout(timer);
    this._throttleTimers.clear();
  }

  // — Entity discovery —

  private _getFanIds(): string[] {
    if (this._cachedFanIds) return this._cachedFanIds;
    this._cachedFanIds = this._computeFanIds();
    return this._cachedFanIds;
  }

  private _computeFanIds(): string[] {
    if (!this.hass) return [];
    if (this.areaId) {
      const hiddenSet = new Set<string>(this._roomConfig?.hidden_entities ?? []);
      const ids = getAreaEntities(this.areaId, this.hass.entities, this.hass.devices)
        .filter((e) => e.entity_id.startsWith('fan.') && !hiddenSet.has(e.entity_id) && isEntityVisibleNow(e.entity_id, this._schedules))
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
    // Dashboard mode: all fan IDs from visible areas
    if (this._isDashboardMode) {
      const areas = this.visibleAreaIds?.length ? this.visibleAreaIds : Object.keys(this.hass.areas ?? {});
      if (areas.length === 0 || !this.hass.entities || !this.hass.devices) return [];
      const ids: string[] = [];
      for (const aId of areas) {
        for (const e of getAreaEntities(aId, this.hass.entities, this.hass.devices)) {
          if (e.entity_id.startsWith('fan.') && !this._dashboardHiddenEntities.has(e.entity_id) && isEntityVisibleNow(e.entity_id, this._schedules)) ids.push(e.entity_id);
        }
      }
      return ids;
    }
    return [];
  }

  private _getFanInfos(): FanInfo[] {
    if (!this.hass) return [];
    const ids = this._getFanIds();

    // Build fingerprint
    const fp = ids.map((id) => {
      const e = this.hass?.states[id];
      return e ? `${id}:${e.state}:${e.last_updated}` : `${id}:-`;
    }).join('|');

    if (fp === this._fansFingerprint && this._cachedFansResult) {
      return this._cachedFansResult;
    }
    this._fansFingerprint = fp;

    const result = ids
      .map((id) => {
        const entity = this.hass?.states[id];
        if (!entity || !this.hass) return null;
        return buildFanInfo(id, entity, this.hass);
      })
      .filter((f): f is FanInfo => f !== null);

    // Dashboard mode: filter to ON fans only
    if (this._isDashboardMode) {
      this._cachedFansResult = result.filter((f) => f.isOn);
    } else {
      this._cachedFansResult = result;
    }
    return this._cachedFansResult;
  }

  // — Actions —

  private _toggleFan(fan: FanInfo, e?: Event): void {
    e?.stopPropagation();
    if (!this.hass) return;
    fireHaptic(this, 'light');
    if (fan.isOn) {
      this._safeCallService('fan', 'turn_off', {}, { entity_id: fan.entityId });
    } else {
      // Turn on at speed step 1 if fan supports speed
      const sf = fan.supportedFeatures;
      if (sf & FanFeature.SET_SPEED) {
        const pct = stepToPct(1, fan.speedCount);
        this._safeCallService('fan', 'turn_on', { percentage: pct }, { entity_id: fan.entityId });
      } else {
        this._safeCallService('fan', 'turn_on', {}, { entity_id: fan.entityId });
      }
    }
  }

  private _toggleAll(): void {
    if (!this.hass) return;
    const fans = this._getFanInfos();
    const anyOn = fans.some((f) => f.isOn);
    if (anyOn) {
      const ids = fans.map((f) => f.entityId);
      this._safeCallService('fan', 'turn_off', {}, { entity_id: ids });
    } else {
      // Turn on each fan at speed step 1
      for (const fan of fans) {
        const sf = fan.supportedFeatures;
        if (sf & FanFeature.SET_SPEED) {
          const pct = stepToPct(1, fan.speedCount);
          this._safeCallService('fan', 'turn_on', { percentage: pct }, { entity_id: fan.entityId });
        } else {
          this._safeCallService('fan', 'turn_on', {}, { entity_id: fan.entityId });
        }
      }
    }
    if (anyOn) {
      this._expandedEntity = null;
    }
  }

  private _setSpeed(fan: FanInfo, pct: number): void {
    if (!this.hass) return;
    fireHaptic(this, 'light');
    if (pct === 0) {
      this._safeCallService('fan', 'turn_off', {}, { entity_id: fan.entityId });
      return;
    }
    if (!fan.isOn) {
      this._safeCallService('fan', 'turn_on', {}, { entity_id: fan.entityId });
    }
    this._safeCallService('fan', 'set_percentage', { percentage: pct }, { entity_id: fan.entityId });
  }

  private _setPresetMode(fan: FanInfo, mode: string, e: Event): void {
    e.stopPropagation();
    if (!this.hass) return;
    // Toggle off if already active
    if (fan.presetMode === mode) {
      // Set back to percentage mode
      if (fan.percentage > 0) {
        this._safeCallService('fan', 'set_percentage', { percentage: fan.percentage }, { entity_id: fan.entityId });
      }
      return;
    }
    if (!fan.isOn) {
      this._safeCallService('fan', 'turn_on', {}, { entity_id: fan.entityId });
    }
    this._safeCallService('fan', 'set_preset_mode', { preset_mode: mode }, { entity_id: fan.entityId });
  }

  private _setDirection(fan: FanInfo, dir: string, e: Event): void {
    e.stopPropagation();
    if (!this.hass) return;
    fireHaptic(this, 'light');
    this._safeCallService('fan', 'set_direction', { direction: dir }, { entity_id: fan.entityId });
  }

  private _toggleOscillation(fan: FanInfo, e: Event): void {
    e.stopPropagation();
    if (!this.hass) return;
    this._safeCallService('fan', 'oscillate', { oscillating: !fan.oscillating }, { entity_id: fan.entityId });
  }

  private _toggleCeilingLight(fan: FanInfo, e: Event): void {
    e.stopPropagation();
    if (!this.hass || !fan.lightEntityId) return;
    const lightEntity = this.hass.states[fan.lightEntityId];
    const service = lightEntity?.state === 'on' ? 'turn_off' : 'turn_on';
    this._safeCallService('light', service, {}, { entity_id: fan.lightEntityId });
  }

  private _toggleExpand(fan: FanInfo): void {
    if (this._expandedEntity === fan.entityId) {
      this._expandedEntity = null;
    } else {
      this._expandedEntity = fan.entityId;
    }
  }

  // — Slider helpers —

  private _onSpeedSliderInput(fan: FanInfo, value: number): void {
    const snapped = snapPct(value, fan.speedCount);
    const next = new Map(this._dragValues);
    next.set(`speed:${fan.entityId}`, snapped);
    this._dragValues = next;
  }

  private _onSpeedSliderChange(fan: FanInfo, value: number): void {
    const snapped = snapPct(value, fan.speedCount);
    this._setSpeed(fan, snapped);
    // Keep the committed value as drag state; the stale-clear in updated()
    // drops it once HA confirms (±2), avoiding a visual bounce meanwhile.
    const next = new Map(this._dragValues);
    next.set(`speed:${fan.entityId}`, snapped);
    this._dragValues = next;
  }

  private _onLightSliderInput(fan: FanInfo, value: number): void {
    if (!fan.lightEntityId || !this.hass) return;
    const next = new Map(this._dragValues);
    next.set(`light:${fan.entityId}`, value);
    this._dragValues = next;

    // Throttled HA call
    const key = `light:${fan.entityId}`;
    const existing = this._throttleTimers.get(key);
    if (existing) clearTimeout(existing);
    const lightEntityId = fan.lightEntityId;
    this._throttleTimers.set(key, setTimeout(() => {
      this._throttleTimers.delete(key);
      const val = this._dragValues.get(key) ?? value;
      const brightness = Math.round((val / 100) * 255);
      this._safeCallService('light', 'turn_on', { brightness }, { entity_id: lightEntityId });
    }, 100));
  }

  private _onLightSliderChange(fan: FanInfo, value: number): void {
    if (!fan.lightEntityId || !this.hass) return;
    const key = `light:${fan.entityId}`;
    const pending = this._throttleTimers.get(key);
    if (pending) { clearTimeout(pending); this._throttleTimers.delete(key); }
    const brightness = Math.round((value / 100) * 255);
    this._safeCallService('light', 'turn_on', { brightness }, { entity_id: fan.lightEntityId });
    const next = new Map(this._dragValues);
    next.set(key, value);
    this._dragValues = next;
  }

  // — Render —

  protected render() {
    void this._lang;
    const fans = this._getFanInfos();

    // Dashboard mode: hide when no fans are on
    if (this._isDashboardMode) {
      if (fans.length === 0) {
        this.style.display = 'none';
        return nothing;
      }
      this.style.display = '';
    }

    // Room mode: show even if empty
    if (!this._isDashboardMode && fans.length === 0) {
      return html`
        ${this._showHeader ? this._renderHeader(0, 0) : nothing}
        <div class="glass fan-card">
          <div class="card-inner">
            <glass-empty-state
              style="grid-column: 1 / -1;"
              icon="mdi:fan-off"
              .title=${t('fan.no_fans')}
            ></glass-empty-state>
          </div>
        </div>
      `;
    }

    const onCount = fans.filter((f) => f.isOn).length;
    const total = fans.length;

    return html`
      ${this._showHeader ? this._renderHeader(onCount, total) : nothing}
      <div class="glass fan-card">
        <div class="tint" style="background:radial-gradient(ellipse at 30% 30%, var(--c-accent), transparent 70%);opacity:${total > 0 ? (onCount / total * 0.18).toFixed(3) : '0'};"></div>
        <div class="card-inner">
          ${this._isDashboardMode
            ? this._renderLayout(fans, () => true)
            : this._renderLayout(fans, (fan) => this._isCompact(fan))}
        </div>
      </div>
    `;
  }

  private _renderHeader(onCount: number, total: number) {
    const anyOn = onCount > 0;
    const countClass = onCount === 0 ? 'none' : onCount === total ? 'all' : 'some';
    return html`
      <div class="card-header">
        <div class="card-header-left">
          <span class="card-title">${t('fan.title')}</span>
          <span class="card-count ${countClass}">${onCount}/${total}</span>
        </div>
        <glass-toggle
          active-color="cool"
          .checked=${anyOn}
          aria-label=${anyOn ? t('fan.toggle_all_on_aria') : t('fan.toggle_all_off_aria')}
          @glass-toggle-change=${() => this._toggleAll()}
        ></glass-toggle>
      </div>
    `;
  }

  private _getEntityLayout(entityId: string): 'full' | 'compact' {
    const layouts = this._roomConfig?.entity_layouts ?? {};
    const layout = layouts[entityId];
    return (layout as 'full' | 'compact') === 'full' ? 'full' : 'compact';
  }

  private _isCompact(fan: FanInfo): boolean {
    return this._getEntityLayout(fan.entityId) === 'compact';
  }

  private _renderLayout(fans: FanInfo[], isCompact: (fan: FanInfo) => boolean) {
    const results: unknown[] = [];
    for (const item of buildLayout(fans, isCompact)) {
      if (item.kind === 'pair') {
        results.push(this._renderFanRow(item.left, true, false));
        results.push(this._renderFanRow(item.right, true, true));
        results.push(this._renderControlFold(item.left, 'left'));
        results.push(this._renderControlFold(item.right, 'right'));
      } else {
        results.push(this._renderFanRow(item.item, false, false));
        results.push(this._renderControlFold(item.item, 'full'));
      }
    }
    return results;
  }

  private _renderFanRow(fan: FanInfo, compact = false, isRight = false) {
    const speedDrag = this._dragValues.get(`speed:${fan.entityId}`);
    const displayPct = speedDrag ?? fan.percentage;
    const isExpanded = this._expandedEntity === fan.entityId;

    // Speed text — simple fans without controls show on/off, others show step info
    const fanHasControls = hasControls(fan);
    let speedText: string;
    if (!fanHasControls) {
      speedText = fan.isOn ? t('common.on') : t('fan.off');
    } else if (fan.isOn || speedDrag !== undefined) {
      speedText = `${displayPct}%`;
    } else {
      speedText = t('fan.off');
    }

    const unavailable = isEntityUnavailable(fan.entity.state);
    const rowClasses = ['fan-row', fan.isOn ? 'on' : '', compact ? 'compact' : '', isRight ? 'compact-right' : '', unavailable ? 'entity-unavailable' : '']
      .filter(Boolean).join(' ');

    const gesture = this._bindGesture({
      onTap: () => this._toggleFan(fan),
      // Long-press expands controls only when the fan actually has some.
      onLongPress: fanHasControls ? () => this._toggleExpand(fan) : undefined,
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
          ?active=${fan.isOn}
          ?glow=${fan.isOn}
          ?unavailable=${unavailable}
          active-color="cool"
          aria-label=${t('fan.toggle_aria', { name: fan.name })}
          style="${fan.isOn ? `--spin-duration:${spinDuration(fan.percentage)}` : ''}"
          @click=${(e: Event) => this._toggleFan(fan, e)}
        >
          <ha-icon
            .icon=${fan.icon}
            class="${fan.isOn ? 'spinning' : ''} ${fan.isOn && fan.direction === 'reverse' ? 'reverse' : ''}"
          ></ha-icon>
        </glass-icon-button>
        <button
          class="fan-expand-btn"
          aria-expanded=${fanHasControls ? (isExpanded ? 'true' : 'false') : nothing}
          aria-label=${fanHasControls ? t('fan.expand_aria', { name: fan.name }) : t('fan.toggle_aria', { name: fan.name })}
          @click=${(e: MouseEvent) => {
            // detail === 0 → synthetic click from Enter/Space; pointer taps are
            // handled by the row gesture (tap = toggle, long-press = expand).
            if (e.detail !== 0) return;
            if (fanHasControls) this._toggleExpand(fan);
            else this._toggleFan(fan);
          }}
        >
          <div class="fan-info">
            <div class="fan-name">${fan.name}</div>
            <div class="fan-sub">
              <span class="fan-speed-text">${speedText}</span>
              ${fan.isOn && fan.direction !== null ? html`
                <span class="fan-direction">
                  <ha-icon .icon=${fan.direction === 'forward' ? 'mdi:rotate-right' : 'mdi:rotate-left'}></ha-icon>
                  ${fan.direction === 'forward' ? t('fan.direction_forward') : t('fan.direction_reverse')}
                </span>
              ` : nothing}
            </div>
          </div>
          ${unavailable
            ? html`<span class="unavailable-badge"><ha-icon .icon=${'mdi:alert-circle-outline'}></ha-icon></span>`
            : html`<div class="fan-dot"></div>`}
        </button>
      </div>
    `;
  }

  private _renderControlFold(fan: FanInfo, position: 'full' | 'left' | 'right' = 'full'): TemplateResult | typeof nothing {
    // Simple on/off fans have no controls → no fold at all.
    if (!hasControls(fan)) return nothing;
    const isExpanded = this._expandedEntity === fan.entityId;
    return html`
      <div class="fold-sep fold-sep-${position} ${isExpanded ? 'visible' : ''}"></div>
      <div class="ctrl-fold ${isExpanded ? 'open' : ''}">
        <div class="ctrl-fold-inner">
          ${this._renderControls(fan)}
        </div>
      </div>
    `;
  }

  private _renderControls(fan: FanInfo) {
    const sf = fan.supportedFeatures;
    const hasSpeed = !!(sf & FanFeature.SET_SPEED);
    const hasPreset = !!(sf & FanFeature.PRESET_MODE) && fan.presetModes.length > 0;
    const hasDirection = !!(sf & FanFeature.DIRECTION);
    const hasOscillate = !!(sf & FanFeature.OSCILLATE);

    const speedDrag = this._dragValues.get(`speed:${fan.entityId}`);
    const displayPct = speedDrag ?? fan.percentage;
    const currentStep = fan.isOn || speedDrag !== undefined ? pctToStep(displayPct, fan.speedCount) : 0;

    return html`
      <div class="ctrl-panel">
        ${hasSpeed ? html`
          <div class="fan-section">
            <glass-section-title label=${t('fan.section_speed')}></glass-section-title>
            <div class="speed-steps">
              ${Array.from({ length: fan.speedCount }, (_, i) => {
                const step = i + 1;
                const pct = stepToPct(step, fan.speedCount);
                const pctDisplay = stepToPctDisplay(step, fan.speedCount);
                return html`
                  <button
                    class="speed-step ${currentStep === step ? 'active' : ''}"
                    @click=${(e: Event) => { e.stopPropagation(); this._setSpeed(fan, pct); }}
                    aria-label=${t('fan.speed_step_aria', { step: String(step), pct: String(pctDisplay) })}
                  >
                    <span>${step}</span>
                    <span class="speed-step-pct">${pctDisplay}%</span>
                  </button>
                `;
              })}
            </div>
            ${!fan.isSimple ? html`
              <div class="slider-wrap">
                <div class="slider-icon"><ha-icon .icon=${'mdi:speedometer'}></ha-icon></div>
                <glass-slider
                  .value=${displayPct}
                  .step=${Math.round(100 / fan.speedCount)}
                  color="var(--rgb-accent)"
                  .label=${`${displayPct}%`}
                  @glass-slider-input=${(e: CustomEvent) => this._onSpeedSliderInput(fan, e.detail.value)}
                  @glass-slider-change=${(e: CustomEvent) => this._onSpeedSliderChange(fan, e.detail.value)}
                ></glass-slider>
              </div>
            ` : nothing}
          </div>
        ` : nothing}

        ${hasPreset ? html`
          <div class="fan-section">
            <glass-section-title label=${t('fan.section_mode')}></glass-section-title>
            <div class="mode-row">
              ${fan.presetModes.map((mode) => html`
                <glass-chip
                  size="sm"
                  active-color="cool"
                  ?active=${fan.presetMode === mode}
                  .icon=${PRESET_MODE_ICONS[mode.toLowerCase()] || 'mdi:cog'}
                  aria-label=${presetLabel(mode)}
                  @click=${(e: Event) => this._setPresetMode(fan, mode, e)}
                >${presetLabel(mode)}</glass-chip>
              `)}
            </div>
          </div>
        ` : nothing}

        ${hasDirection ? html`
          <div class="fan-section">
            <glass-section-title label=${t('fan.section_direction')}></glass-section-title>
            <div class="direction-row">
              <div class="direction-label">
                <ha-icon .icon=${'mdi:rotate-3d-variant'}></ha-icon>
                ${t('fan.direction')}
              </div>
              <div class="direction-btns">
                <glass-icon-button
                  size="sm"
                  active-color="cool"
                  ?active=${fan.direction === 'forward'}
                  .icon=${'mdi:rotate-right'}
                  aria-label=${t('fan.direction_forward_aria')}
                  @click=${(e: Event) => this._setDirection(fan, 'forward', e)}
                ></glass-icon-button>
                <glass-icon-button
                  size="sm"
                  active-color="cool"
                  ?active=${fan.direction === 'reverse'}
                  .icon=${'mdi:rotate-left'}
                  aria-label=${t('fan.direction_reverse_aria')}
                  @click=${(e: Event) => this._setDirection(fan, 'reverse', e)}
                ></glass-icon-button>
              </div>
            </div>
          </div>
        ` : nothing}

        ${hasOscillate ? html`
          <div class="fan-section">
            <glass-section-title label=${t('fan.section_oscillation')}></glass-section-title>
            <div class="osc-row">
              <div class="osc-label">
                <ha-icon .icon=${'mdi:arrow-left-right'}></ha-icon>
                ${t('fan.oscillation')}
              </div>
              <glass-toggle
                active-color="cool"
                .checked=${fan.oscillating}
                aria-label=${t('fan.oscillation_aria')}
                @glass-toggle-change=${(e: Event) => this._toggleOscillation(fan, e)}
              ></glass-toggle>
            </div>
          </div>
        ` : nothing}

        ${fan.lightEntityId ? this._renderCeilingLight(fan) : nothing}
      </div>
    `;
  }

  private _renderCeilingLight(fan: FanInfo) {
    if (!fan.lightEntityId || !this.hass) return nothing;
    const lightEntity = this.hass.states[fan.lightEntityId];
    if (!lightEntity) return nothing;

    const lightIsOn = lightEntity.state === 'on';
    const brightness = (lightEntity.attributes.brightness as number) ?? 0;
    const lightDrag = this._dragValues.get(`light:${fan.entityId}`);
    const displayPct = lightDrag ?? (lightIsOn ? Math.round((brightness / 255) * 100) : 0);

    return html`
      <div class="ctrl-sep"></div>
      <!-- Ceiling light -->
      <div class="ceiling-light-row">
        <div class="ceiling-light-label">
          <ha-icon .icon=${'mdi:lightbulb-outline'}></ha-icon>
          ${t('fan.ceiling_light')}
        </div>
        <glass-toggle
          active-color="light-glow"
          .checked=${lightIsOn}
          aria-label=${t('fan.ceiling_light_aria')}
          @glass-toggle-change=${(e: Event) => this._toggleCeilingLight(fan, e)}
        ></glass-toggle>
      </div>
      ${lightIsOn ? html`
        <div class="slider-wrap">
          <div class="slider-icon"><ha-icon .icon=${'mdi:brightness-6'}></ha-icon></div>
          <glass-slider
            .value=${displayPct}
            color="var(--rgb-light-glow)"
            .label=${`${displayPct}%`}
            @glass-slider-input=${(e: CustomEvent) => this._onLightSliderInput(fan, e.detail.value)}
            @glass-slider-change=${(e: CustomEvent) => this._onLightSliderChange(fan, e.detail.value)}
          ></glass-slider>
        </div>
      ` : nothing}
    `;
  }
}

try { customElements.define('glass-fan-card', GlassFanCard); } catch { /* already registered */ }
