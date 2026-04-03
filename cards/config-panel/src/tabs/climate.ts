import { html, nothing, type PropertyValues, type TemplateResult } from 'lit';
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

  private _dashboardLoaded = false;

  protected override updated(changedProps: PropertyValues): void {
    super.updated(changedProps);
    if (changedProps.has('areaId') && this.areaId) {
      this._climateRoom = this.areaId;
      void this._loadRoomClimates();
    }
    if (!this.areaId && !this._dashboardLoaded && this.hass && this.backend) {
      this._dashboardLoaded = true;
      void this._loadDashboardClimates();
    }
    this._checkAutoSave(changedProps);
  }

  // — Persistence —

  loadFromConfig(config: Record<string, unknown>): void {
    const raw = config as {
      show_header?: boolean;
      display_mode?: string;
      dashboard_display_mode?: string;
      dashboard_entities?: string[];
    };
    this._climateShowHeader = raw.show_header ?? true;
    this._climateDisplayMode = raw.display_mode === 'normal' ? 'normal' : 'list';
    this._climateDashboardDisplayMode = raw.dashboard_display_mode === 'normal' ? 'normal' : 'list';
    this._climateDashboardEntities = raw.dashboard_entities ?? [];
  }

  collectSaveData(): Record<string, unknown> {
    return {
      show_header: this._climateShowHeader,
      display_mode: this._climateDisplayMode,
      dashboard_display_mode: this._climateDashboardDisplayMode,
      dashboard_entities: this._climateDashboardEntities,
    };
  }

  protected override _canSave(): boolean {
    return !!this.backend && !this._saving;
  }

  protected override async _performSave(): Promise<void> {
    this._saving = true;
    try {
      const saveData = this.collectSaveData();

      if (!this.areaId && this._climateRoomEntities.length > 0) {
        // Dashboard mode: persist order + hidden in climate config
        saveData.dashboard_entities = this._climateRoomEntities.map((e) => e.entityId);
        saveData.hidden_entities = this._climateRoomEntities.filter((e) => !e.visible).map((e) => e.entityId);
      }

      await this.backend!.send('set_climate_config', saveData);

      if (this._climateRoom && this._climateRoomEntities.length > 0) {
        const cardIds = new Set(this._climateRoomEntities.map((e) => e.entityId));
        const hiddenIds = this._climateRoomEntities.filter((e) => !e.visible).map((e) => e.entityId);
        const orderedIds = this._climateRoomEntities.map((e) => e.entityId);
        await this._saveRoomEntities(this._climateRoom, cardIds, hiddenIds, orderedIds);
      }

      bus.emit('climate-config-changed', undefined);
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
    if (this._climateRoom) {
      await this._loadRoomClimates();
    } else {
      this._dashboardLoaded = false;
      await this._loadDashboardClimates();
    }
  }

  // — Dashboard climate loading —

  private async _loadDashboardClimates(): Promise<void> {
    if (!this.hass || !this.backend) return;

    // Discover all climate entities across all areas
    const allAreas = Object.keys(this.hass.areas ?? {});
    const allClimateIds: string[] = [];
    for (const aId of allAreas) {
      for (const e of getAreaEntities(aId, this.hass.entities, this.hass.devices)) {
        if (e.entity_id.startsWith('climate.')) allClimateIds.push(e.entity_id);
      }
    }
    // Also include any orphan climate entities not in areas
    for (const eid of Object.keys(this.hass.states)) {
      if (eid.startsWith('climate.') && !allClimateIds.includes(eid)) allClimateIds.push(eid);
    }

    // Use saved dashboard_entities order + hidden_entities from climate config
    const savedOrder = this._climateDashboardEntities;
    const hiddenSet = new Set<string>();

    // Load hidden from climate config
    try {
      const result = await this.backend.send<{
        climate_card?: { hidden_entities?: string[]; dashboard_entities?: string[] };
      }>('get_config');
      if (result?.climate_card?.hidden_entities) {
        for (const id of result.climate_card.hidden_entities) hiddenSet.add(id);
      }
    } catch { /* ignore */ }

    // Sort: saved order first, then remaining alphabetically
    const orderMap = new Map(savedOrder.map((id, i) => [id, i]));
    const sorted = [...allClimateIds].sort((a, b) => {
      const oa = orderMap.get(a) ?? 999;
      const ob = orderMap.get(b) ?? 999;
      if (oa !== ob) return oa - ob;
      return a.localeCompare(b);
    });

    this._climateRoomEntities = sorted.map((id) => {
      const stateObj = this.hass?.states[id];
      const name = (stateObj?.attributes?.friendly_name as string) || id.split('.')[1] || id;
      return { entityId: id, name, visible: !hiddenSet.has(id) };
    });
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

  protected override _onLocalDragStart(idx: number): void {
    this._localDragIdx = idx;
  }

  protected override _onLocalDragOver(idx: number, e: DragEvent): void {
    e.preventDefault();
    this._localDropIdx = idx;
  }

  protected override _onLocalDragLeave(): void {
    this._localDropIdx = null;
  }

  protected override _onLocalDragEnd(): void {
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

  renderTab(): TemplateResult {
    void this._lang;
    if (!this.hass) return html`${nothing}`;

    const entities = this._climateRoomEntities;

    return html`
      <div class="tab-panel" id="panel-climate">
        <glass-climate-card .hass=${this.hass} .areaId=${this.areaId} config-preview></glass-climate-card>
        <!-- Description -->
        <div class="sub-section">
          <div class="section-label">${t('config.tab_climate')}</div>
          <div class="section-desc">${t('config.climate_desc')}</div>
        </div>

        <!-- Display mode -->
        <div class="sub-section">
          <div class="section-label">${this.areaId ? t('config.climate_display_mode_popup') : t('config.climate_display_mode_dashboard')}</div>
          <div class="section-desc">${this.areaId ? t('config.climate_display_mode_popup_desc') : t('config.climate_display_mode_dashboard_desc')}</div>
          <div class="chip-group">
            <button class="chip ${(this.areaId ? this._climateDisplayMode : this._climateDashboardDisplayMode) === 'list' ? 'active' : ''}"
              @click=${() => { if (this.areaId) this._climateDisplayMode = 'list'; else this._climateDashboardDisplayMode = 'list'; }}
              aria-pressed=${(this.areaId ? this._climateDisplayMode : this._climateDashboardDisplayMode) === 'list' ? 'true' : 'false'}>
              <ha-icon .icon=${'mdi:format-list-bulleted'}></ha-icon>
              ${t('config.climate_mode_list')}
            </button>
            <button class="chip ${(this.areaId ? this._climateDisplayMode : this._climateDashboardDisplayMode) === 'normal' ? 'active' : ''}"
              @click=${() => { if (this.areaId) this._climateDisplayMode = 'normal'; else this._climateDashboardDisplayMode = 'normal'; }}
              aria-pressed=${(this.areaId ? this._climateDisplayMode : this._climateDashboardDisplayMode) === 'normal' ? 'true' : 'false'}>
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
            <div class="section-label">${t(this.areaId ? 'config.climate_room_entities' : 'config.climate_dashboard_entities')} (${entities.length})</div>
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
