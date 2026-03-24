import { html, svg, nothing, type PropertyValues, type TemplateResult } from 'lit';
import { state } from 'lit/decorators.js';
import { t } from '@glass-cards/i18n';
import { bus } from '@glass-cards/event-bus';
import { getAreaEntities } from '@glass-cards/base-card';
import { BaseConfigTab } from '../base-tab';

// — Component —

export class ConfigTabClimate extends BaseConfigTab {
  @state() _climateShowHeader = true;
  @state() _climateDisplayMode: 'list' | 'normal' = 'list';
  @state() _climateDashboardDisplayMode: 'list' | 'normal' = 'list';
  @state() _climateDashboardEntities: string[] = [];
  @state() _climateRoom = '';
  @state() _climateRoomEntities: { entityId: string; name: string; visible: boolean }[] = [];

  /** Track saving state to prevent concurrent saves. */
  private _saving = false;

  // Local drag state
  @state() _localDragIdx: number | null = null;
  @state() _localDropIdx: number | null = null;

  protected static override _AUTO_SAVE_KEYS = new Set([
    '_climateShowHeader', '_climateDisplayMode', '_climateDashboardDisplayMode', '_climateDashboardEntities', '_climateRoomEntities',
  ]);

  // — Lifecycle —

  protected override updated(changedProps: PropertyValues): void {
    super.updated(changedProps);
    if (changedProps.has('areaId') && this.areaId) {
      this._climateRoom = this.areaId;
      void this._loadRoomClimates();
    }
    this._checkAutoSave(changedProps);
  }

  // — Persistence —

  loadFromConfig(config: Record<string, unknown>): void {
    const c = config as {
      show_header?: boolean;
      display_mode?: string;
      dashboard_display_mode?: string;
      dashboard_entities?: string[];
    };
    this._climateShowHeader = c.show_header ?? true;
    this._climateDisplayMode = c.display_mode === 'normal' ? 'normal' : 'list';
    this._climateDashboardDisplayMode = c.dashboard_display_mode === 'normal' ? 'normal' : 'list';
    this._climateDashboardEntities = c.dashboard_entities ?? [];
  }

  collectSaveData(): Record<string, unknown> {
    return {
      show_header: this._climateShowHeader,
      display_mode: this._climateDisplayMode,
      dashboard_display_mode: this._climateDashboardDisplayMode,
      dashboard_entities: this._climateDashboardEntities,
    };
  }

  async save(): Promise<void> {
    if (!this.backend || this._saving) return;
    this._saving = true;
    try {
      const allIds = this._climateRoomEntities.map((e) => e.entityId);
      const hiddenIds = this._climateRoomEntities.filter((e) => !e.visible).map((e) => e.entityId);

      await this.backend.send('set_climate_config', this.collectSaveData());

      if (this._climateRoom && this._climateRoomEntities.length > 0) {
        let existingHidden: string[] = [];
        let existingOrder: string[] = [];
        try {
          const existing = await this.backend.send<{
            hidden_entities: string[];
            entity_order: string[];
          } | null>('get_room', { area_id: this._climateRoom });
          if (existing) {
            existingHidden = existing.hidden_entities ?? [];
            existingOrder = existing.entity_order ?? [];
          }
        } catch { /* ignore */ }

        const climateEntityIds = new Set(this._climateRoomEntities.map((e) => e.entityId));
        const nonClimateHidden = existingHidden.filter((id) => !climateEntityIds.has(id));
        const nonClimateOrder = existingOrder.filter((id) => !climateEntityIds.has(id));

        await this.backend.send('set_room', {
          area_id: this._climateRoom,
          hidden_entities: [...nonClimateHidden, ...hiddenIds],
          entity_order: [...nonClimateOrder, ...allIds],
        });

        bus.emit('room-config-changed', { areaId: this._climateRoom });
      }

      this._fireToast(true);
      bus.emit('climate-config-changed', undefined);
    } catch {
      this._fireToast(false);
    } finally {
      this._saving = false;
    }
  }

  async reload(): Promise<void> {
    if (!this.backend) return;
    try {
      const result = await this.backend.send<{
        climate_card?: { show_header: boolean; display_mode: string; dashboard_display_mode: string; dashboard_entities: string[] };
      }>('get_config');
      if (result?.climate_card) this.loadFromConfig(result.climate_card);
    } catch { /* ignore */ }
    if (this._climateRoom) await this._loadRoomClimates();
  }

  // — Room climate loading —

  private async _loadRoomClimates(): Promise<void> {
    if (!this.hass || !this._climateRoom || !this.backend) return;
    const targetRoom = this._climateRoom;
    const areaEntities = getAreaEntities(targetRoom, this.hass.entities, this.hass.devices);
    const climateIds = areaEntities
      .filter((e) => e.entity_id.startsWith('climate.'))
      .map((e) => e.entity_id);

    let roomHidden: string[] = [];
    let roomOrder: string[] = [];
    try {
      const result = await this.backend.send<{ hidden_entities?: string[]; entity_order?: string[] }>('get_room', { area_id: targetRoom });
      roomHidden = result?.hidden_entities || [];
      roomOrder = result?.entity_order || [];
    } catch { /* ignore */ }

    if (this._climateRoom !== targetRoom) return;

    const orderMap = new Map(roomOrder.map((id, i) => [id, i]));
    const sorted = [...climateIds].sort((a, b) => {
      const oa = orderMap.get(a) ?? 999;
      const ob = orderMap.get(b) ?? 999;
      if (oa !== ob) return oa - ob;
      return a.localeCompare(b);
    });

    this._climateRoomEntities = sorted.map((id) => {
      const stateObj = this.hass?.states[id];
      const name = (stateObj?.attributes?.friendly_name as string) || id.split('.')[1] || id;
      return { entityId: id, name, visible: !roomHidden.includes(id) };
    });
  }

  // — Local drag & drop —

  private _onLocalDragStart(idx: number): void {
    this._localDragIdx = idx;
  }

  private _onLocalDragOver(idx: number, e: DragEvent): void {
    e.preventDefault();
    this._localDropIdx = idx;
  }

  private _onLocalDragLeave(): void {
    this._localDropIdx = null;
  }

  private _onLocalDragEnd(): void {
    this._localDragIdx = null;
    this._localDropIdx = null;
  }

  private _onLocalDrop(idx: number, e: DragEvent): void {
    e.preventDefault();
    if (this._localDragIdx === null || this._localDragIdx === idx) {
      this._localDragIdx = null;
      this._localDropIdx = null;
      return;
    }
    const arr = [...this._climateRoomEntities];
    const [moved] = arr.splice(this._localDragIdx, 1);
    arr.splice(idx, 0, moved);
    this._climateRoomEntities = arr;
    this._localDragIdx = null;
    this._localDropIdx = null;
  }

  // — Actions —

  private _toggleEntityVisibility(entityId: string): void {
    this._climateRoomEntities = this._climateRoomEntities.map((e) =>
      e.entityId === entityId ? { ...e, visible: !e.visible } : e,
    );
  }

  // — Render —

  private _getClimateAction(entityId: string): string {
    const state = this.hass?.states[entityId];
    if (!state) return 'off';
    const action = state.attributes.hvac_action as string | undefined;
    if (action) return action;
    return state.state === 'off' ? 'off' : 'idle';
  }

  private _getClimateIcon(action: string): string {
    switch (action) {
      case 'heating': return 'mdi:fire';
      case 'cooling': return 'mdi:snowflake';
      default: return 'mdi:thermostat';
    }
  }

  private _previewEntityData(e: { entityId: string; name: string }) {
    const state = this.hass?.states[e.entityId];
    const action = this._getClimateAction(e.entityId);
    const currentTemp = state?.attributes.current_temperature as number | undefined;
    const targetTemp = state?.attributes.temperature as number | undefined;
    const mode = state?.attributes.preset_mode as string | undefined;
    const hvacMode = state?.state ?? 'off';
    const actionText = action === 'heating' ? t('climate.action_heating')
      : action === 'cooling' ? t('climate.action_cooling')
      : action === 'idle' ? t('climate.action_idle')
      : t('climate.action_off');
    return { state, action, currentTemp, targetTemp, mode, hvacMode, actionText };
  }

  private _previewCommon(entities: { entityId: string; name: string; visible: boolean }[]) {
    const activeCount = entities.filter((e) => {
      const s = this.hass?.states[e.entityId];
      return s && s.state !== 'off';
    }).length;
    const temps: number[] = [];
    for (const e of entities) {
      const ct = this.hass?.states[e.entityId]?.attributes.current_temperature as number | undefined;
      if (ct !== undefined && ct !== null) temps.push(ct);
    }
    const avgTemp = temps.length > 0 ? (temps.reduce((a, b) => a + b, 0) / temps.length).toFixed(1) : null;
    const actions = entities.map((e) => this._getClimateAction(e.entityId));
    const hasHeating = actions.includes('heating');
    const hasCooling = actions.includes('cooling');
    const tintColor = hasHeating ? 'var(--c-heat)' : hasCooling ? 'var(--c-cool)' : null;
    const countBg = hasHeating ? 'rgba(var(--rgb-heat),0.15)' : hasCooling ? 'rgba(var(--rgb-cool),0.15)' : 'var(--s3)';
    const countColor = hasHeating ? 'var(--c-heat)' : hasCooling ? 'var(--c-cool)' : 'var(--t2)';
    return { activeCount, avgTemp, tintColor, countBg, countColor };
  }

  renderPreview(): TemplateResult | typeof nothing {
    const entities = this._climateRoomEntities.filter((e) => e.visible);
    if (entities.length === 0) {
      return html`<div class="cl-empty">${t('config.climate_no_entities')}</div>`;
    }

    const { activeCount, avgTemp, tintColor, countBg, countColor } = this._previewCommon(entities);

    return html`
      <div class="cl-preview-wrap">
        <!-- Header (reactive to toggle) -->
        ${this._climateShowHeader ? html`
          <div class="preview-climate-header">
            <div class="preview-climate-header-left">
              <span class="preview-climate-header-title">${t('climate.title')}</span>
              <span class="preview-climate-header-count" style="background:${countBg};color:${countColor};">${activeCount}/${entities.length}</span>
            </div>
            ${avgTemp ? html`<span class="preview-climate-header-avg">${avgTemp}°C</span>` : nothing}
          </div>
        ` : nothing}

        ${this._climateDisplayMode === 'normal'
          ? this._renderNormalPreview(entities, tintColor)
          : this._renderListPreview(entities, tintColor)
        }
      </div>
    `;
  }

  private _renderListPreview(
    entities: { entityId: string; name: string; visible: boolean }[],
    tintColor: string | null,
  ): TemplateResult {
    const first = entities[0];
    const firstData = this._previewEntityData(first);

    return html`
      <div class="preview-climate-card glass">
        ${tintColor ? html`<div class="preview-climate-tint" style="background:radial-gradient(ellipse at 30% 30%,${tintColor},transparent 70%);"></div>` : nothing}
        <!-- First entity row -->
        <div class="cl-row ${firstData.action}">
          <div class="cl-icon-btn">
            <ha-icon .icon=${this._getClimateIcon(firstData.action)}></ha-icon>
          </div>
          <div class="cl-expand">
            <div class="cl-info">
              <div class="cl-name">${first.name}</div>
              <div class="cl-sub">
                <span class="cl-action-text">${firstData.actionText}</span>
                ${firstData.mode ? html`<span class="cl-mode-badge">${firstData.mode}</span>` : nothing}
              </div>
            </div>
            <div class="cl-temps">
              <div class="cl-temp-current">${firstData.currentTemp !== undefined ? firstData.currentTemp.toFixed(1) : '--'}<span class="unit">°</span></div>
              ${firstData.targetTemp !== undefined && firstData.action !== 'off' ? html`<div class="cl-temp-target">→ ${firstData.targetTemp}°</div>` : nothing}
            </div>
            <div class="cl-dot"></div>
          </div>
        </div>
        <!-- Fold separator -->
        <div class="cl-separator" style="background:linear-gradient(90deg,transparent,${firstData.action === 'heating' ? 'rgba(var(--rgb-heat),0.3)' : firstData.action === 'cooling' ? 'rgba(var(--rgb-cool),0.3)' : 'var(--b2)'},transparent);margin:0.0625rem 0.25rem;opacity:0.6;"></div>
        <!-- Expanded controls -->
        <div class="cl-controls">
          <!-- Temperature stepper -->
          <div class="cl-stepper-row">
            <div class="cl-stepper-btn">
              <ha-icon .icon=${'mdi:minus'}></ha-icon>
            </div>
            <div class="cl-stepper-center">
              <div class="cl-stepper-label">${t('climate.target')}</div>
              <div class="cl-stepper-value" style="color:${firstData.action === 'heating' ? 'var(--c-heat)' : firstData.action === 'cooling' ? 'var(--c-cool)' : 'var(--t1)'};">${firstData.targetTemp !== undefined ? `${firstData.targetTemp.toFixed(1)}°` : '--°'}</div>
            </div>
            <div class="cl-stepper-btn">
              <ha-icon .icon=${'mdi:plus'}></ha-icon>
            </div>
          </div>
          <!-- Separator -->
          <div class="cl-separator"></div>
          <!-- Mode chips -->
          <div class="cl-chips">
            ${['heat', 'cool', 'auto', 'off'].map((m) => html`
              <span class="cl-chip" style="border:1px solid ${firstData.hvacMode === m ? (m === 'heat' ? 'rgba(var(--rgb-heat),0.3)' : m === 'cool' ? 'rgba(var(--rgb-cool),0.3)' : 'var(--b3)') : 'var(--b2)'};background:${firstData.hvacMode === m ? (m === 'heat' ? 'rgba(var(--rgb-heat),0.1)' : m === 'cool' ? 'rgba(var(--rgb-cool),0.1)' : 'var(--s3)') : 'var(--s1)'};color:${firstData.hvacMode === m ? (m === 'heat' ? 'var(--c-heat)' : m === 'cool' ? 'var(--c-cool)' : 'var(--t1)') : 'var(--t3)'};">
                <ha-icon .icon=${m === 'heat' ? 'mdi:fire' : m === 'cool' ? 'mdi:snowflake' : m === 'auto' ? 'mdi:thermostat-auto' : 'mdi:power'}></ha-icon>
                ${m === 'heat' ? t('climate.mode_heat') : m === 'cool' ? t('climate.mode_cool') : m === 'auto' ? t('climate.mode_auto') : t('climate.mode_off')}
              </span>
            `)}
          </div>
        </div>
        <!-- Remaining entities -->
        ${entities.length > 1 ? html`
          <div class="cl-remaining-sep"></div>
          ${entities.slice(1, 4).map((e) => {
            const d = this._previewEntityData(e);
            return html`
              <div class="cl-row ${d.action}">
                <div class="cl-icon-btn">
                  <ha-icon .icon=${this._getClimateIcon(d.action)}></ha-icon>
                </div>
                <div class="cl-expand">
                  <div class="cl-info">
                    <div class="cl-name">${e.name}</div>
                    <div class="cl-sub">
                      <span class="cl-action-text">${d.actionText}</span>
                      ${d.mode ? html`<span class="cl-mode-badge">${d.mode}</span>` : nothing}
                    </div>
                  </div>
                  <div class="cl-temps">
                    <div class="cl-temp-current">${d.currentTemp !== undefined ? d.currentTemp.toFixed(1) : '--'}<span class="unit">°</span></div>
                    ${d.targetTemp !== undefined && d.action !== 'off' ? html`<div class="cl-temp-target">→ ${d.targetTemp}°</div>` : nothing}
                  </div>
                  <div class="cl-dot"></div>
                </div>
              </div>
            `;
          })}
        ` : nothing}
      </div>
    `;
  }

  private _renderNormalPreview(
    entities: { entityId: string; name: string; visible: boolean }[],
    tintColor: string | null,
  ): TemplateResult {
    const first = entities[0];
    const d = this._previewEntityData(first);
    const unit = '°C';

    // Arc gauge
    const cx = 60, cy = 62, r = 40;
    const startA = -120, endA = 120;
    const toRad = (a: number) => ((a - 90) * Math.PI) / 180;
    const pt = (a: number) => ({ x: cx + r * Math.cos(toRad(a)), y: cy + r * Math.sin(toRad(a)) });
    const p1 = pt(startA), p2 = pt(endA);
    const arcD = `M ${p1.x} ${p1.y} A ${r} ${r} 0 1 1 ${p2.x} ${p2.y}`;
    const fullLen = Math.PI * r * (240 / 180);

    // Compute progress based on temp range (15-35)
    const minT = 15, maxT = 35;
    const current = d.currentTemp ?? 20;
    const progress = Math.max(0, Math.min(1, (current - minT) / (maxT - minT)));
    const progressLen = progress * fullLen;

    // Target dot
    const target = d.targetTemp ?? current;
    const targetProgress = Math.max(0, Math.min(1, (target - minT) / (maxT - minT)));
    const tAngle = startA + targetProgress * 240;
    const tPt = pt(tAngle);

    const gaugeColor = d.action === 'heating' ? 'var(--c-heat)' : d.action === 'cooling' ? 'var(--c-cool)' : 'var(--c-warning)';
    const actionEmoji = d.action === 'heating' ? '🔥' : d.action === 'cooling' ? '❄️' : '';

    return html`
      <div class="preview-climate-card glass">
        ${tintColor ? html`<div class="preview-climate-tint" style="background:radial-gradient(ellipse at 50% 30%,${tintColor},transparent 70%);"></div>` : nothing}
        <div class="cl-normal-content">
          <!-- Entity tabs -->
          ${entities.length > 1 ? html`
            <div class="cl-entity-tabs">
              ${entities.slice(0, 4).map((e, i) => html`
                <span class="cl-entity-tab ${i === 0 ? 'active' : ''}">${e.name.length > 8 ? e.name.slice(0, 8) + '…' : e.name}</span>
              `)}
            </div>
          ` : nothing}
          <!-- Arc gauge -->
          <div class="cl-gauge-wrap">
            <svg viewBox="0 0 120 80" fill="none" class="cl-gauge-svg">
              ${svg`
                <path d=${arcD} stroke="var(--s3)" stroke-width="4" fill="none" stroke-linecap="round" />
                <path d=${arcD} stroke=${gaugeColor} stroke-width="4" fill="none" stroke-linecap="round"
                  stroke-dasharray=${fullLen} stroke-dashoffset=${fullLen - progressLen} />
                <circle cx=${tPt.x} cy=${tPt.y} r="3" fill="var(--t1)" />
                <text x=${cx} y=${cy - 4} text-anchor="middle" fill="var(--t1)" font-size="14" font-weight="700">${current.toFixed(1)}°</text>
                <text x=${cx} y=${cy + 8} text-anchor="middle" fill="var(--t3)" font-size="7">
                  ${actionEmoji} ${d.actionText}
                </text>
              `}
            </svg>
          </div>
          <!-- Temperature stepper -->
          <div class="cl-stepper-row">
            <div class="cl-stepper-btn sm">
              <ha-icon .icon=${'mdi:minus'}></ha-icon>
            </div>
            <div class="cl-stepper-center">
              <div class="cl-stepper-label">${t('climate.target')}</div>
              <div class="cl-stepper-value sm" style="color:${d.action === 'heating' ? 'var(--c-heat)' : d.action === 'cooling' ? 'var(--c-cool)' : 'var(--t1)'};">${d.targetTemp !== undefined ? `${d.targetTemp.toFixed(1)}°${unit}` : `--°${unit}`}</div>
            </div>
            <div class="cl-stepper-btn sm">
              <ha-icon .icon=${'mdi:plus'}></ha-icon>
            </div>
          </div>
          <!-- Separator + mode chips (fold open) -->
          <div class="cl-separator cl-fold-sep" style="background:linear-gradient(90deg,transparent,${d.action === 'heating' ? 'rgba(var(--rgb-heat),0.3)' : d.action === 'cooling' ? 'rgba(var(--rgb-cool),0.3)' : 'var(--b2)'},transparent);"></div>
          <div class="cl-chips pb">
            ${['heat', 'cool', 'auto', 'off'].map((m) => html`
              <span class="cl-chip" style="border:1px solid ${d.hvacMode === m ? (m === 'heat' ? 'rgba(var(--rgb-heat),0.3)' : m === 'cool' ? 'rgba(var(--rgb-cool),0.3)' : 'var(--b3)') : 'var(--b2)'};background:${d.hvacMode === m ? (m === 'heat' ? 'rgba(var(--rgb-heat),0.1)' : m === 'cool' ? 'rgba(var(--rgb-cool),0.1)' : 'var(--s3)') : 'var(--s1)'};color:${d.hvacMode === m ? (m === 'heat' ? 'var(--c-heat)' : m === 'cool' ? 'var(--c-cool)' : 'var(--t1)') : 'var(--t3)'};">
                <ha-icon .icon=${m === 'heat' ? 'mdi:fire' : m === 'cool' ? 'mdi:snowflake' : m === 'auto' ? 'mdi:thermostat-auto' : 'mdi:power'}></ha-icon>
                ${m === 'heat' ? t('climate.mode_heat') : m === 'cool' ? t('climate.mode_cool') : m === 'auto' ? t('climate.mode_auto') : t('climate.mode_off')}
              </span>
            `)}
          </div>
        </div>
      </div>
    `;
  }

  renderTab(): TemplateResult {
    void this._lang;
    if (!this.hass) return html`${nothing}`;

    const entities = this._climateRoomEntities;

    return html`
      <div class="preview-encart">
        <div class="preview-label">${t('config.preview')}</div>
        ${this.renderPreview()}
      </div>

      <div class="tab-panel" id="panel-climate">
        <!-- Description -->
        <div class="sub-section">
          <div class="section-label">${t('config.tab_climate')}</div>
          <div class="section-desc">${t('config.climate_desc')}</div>
        </div>

        <!-- Display mode popup -->
        <div class="sub-section">
          <div class="section-label">${t('config.climate_display_mode_popup')}</div>
          <div class="section-desc">${t('config.climate_display_mode_popup_desc')}</div>
          <div class="chip-group">
            <button class="chip ${this._climateDisplayMode === 'list' ? 'active' : ''}"
              @click=${() => { this._climateDisplayMode = 'list'; }}
              aria-pressed=${this._climateDisplayMode === 'list' ? 'true' : 'false'}>
              <ha-icon .icon=${'mdi:format-list-bulleted'}></ha-icon>
              ${t('config.climate_mode_list')}
            </button>
            <button class="chip ${this._climateDisplayMode === 'normal' ? 'active' : ''}"
              @click=${() => { this._climateDisplayMode = 'normal'; }}
              aria-pressed=${this._climateDisplayMode === 'normal' ? 'true' : 'false'}>
              <ha-icon .icon=${'mdi:gauge'}></ha-icon>
              ${t('config.climate_mode_normal')}
            </button>
          </div>
        </div>

        <!-- Behaviour -->
        <div class="sub-section">
          <div class="section-label">${t('config.behavior')}</div>
          <div class="feature-list">
            <button
              class="feature-row"
              role="switch"
              aria-checked=${this._climateShowHeader ? 'true' : 'false'}
              @click=${() => { this._climateShowHeader = !this._climateShowHeader; }}
            >
              <div class="feature-icon">
                <ha-icon .icon=${'mdi:page-layout-header'}></ha-icon>
              </div>
              <div class="feature-text">
                <div class="feature-name">${t('config.climate_show_header')}</div>
                <div class="feature-desc">${t('config.climate_show_header_desc')}</div>
              </div>
              <span class="toggle ${this._climateShowHeader ? 'on' : ''}"></span>
            </button>
          </div>
        </div>

        <!-- Room entities -->
        <div class="sub-section">
          ${entities.length === 0 ? html`
            <div class="banner">
              <ha-icon .icon=${'mdi:thermostat'}></ha-icon>
              <span>${t('config.climate_no_entities')}</span>
            </div>
          ` : html`
            <div class="section-label">${t('config.climate_room_entities')} (${entities.length})</div>
            <div class="section-desc">${t('config.climate_room_entities_desc')}</div>
            <div class="item-list">
              ${entities.map((e, idx) => {
                const isDragging = this._localDragIdx === idx;
                const isDropTarget = this._localDropIdx === idx;
                const rowClasses = [
                  'item-row',
                  !e.visible ? 'disabled' : '',
                  isDragging ? 'dragging' : '',
                  isDropTarget ? 'drop-target' : '',
                ].filter(Boolean).join(' ');
                return html`
                  <div class="item-card">
                    <div
                      class=${rowClasses}
                      draggable="true"
                      @dragstart=${() => this._onLocalDragStart(idx)}
                      @dragover=${(ev: DragEvent) => this._onLocalDragOver(idx, ev)}
                      @dragleave=${() => this._onLocalDragLeave()}
                      @drop=${(ev: DragEvent) => this._onLocalDrop(idx, ev)}
                      @dragend=${() => this._onLocalDragEnd()}
                    >
                      <span class="drag-handle">
                        <ha-icon .icon=${'mdi:drag'}></ha-icon>
                      </span>
                      <div class="item-info">
                        <span class="item-name">${e.name}</span>
                        <span class="item-meta">${e.entityId}</span>
                      </div>
                      <button
                        class="toggle ${e.visible ? 'on' : ''}"
                        @click=${() => this._toggleEntityVisibility(e.entityId)}
                        role="switch"
                        aria-checked=${e.visible ? 'true' : 'false'}
                        aria-label="${e.visible ? t('common.hide') : t('common.show')} ${e.name}"
                      ></button>
                    </div>
                  </div>
                `;
              })}
            </div>
          `}
        </div>

        <div class="save-bar">
          <button class="btn btn-ghost" @click=${() => this.reload()}>${t('common.reset')}</button>
        </div>
      </div>
    `;
  }
}

try { customElements.define('config-tab-climate', ConfigTabClimate); } catch { /* already registered */ }
