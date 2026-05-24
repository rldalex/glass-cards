import { html, nothing, type PropertyValues, type TemplateResult } from 'lit';
import { state } from 'lit/decorators.js';
import { t } from '@glass-cards/i18n';
import { bus } from '@glass-cards/event-bus';
import { getAreaEntities } from '@glass-cards/base-card';
import { BaseConfigTab } from '../base-tab';

// — Types —

interface CoverRoomEntity {
  entityId: string; name: string; visible: boolean; deviceClass: string; layout: 'full' | 'compact';
}

// — Component —

export class ConfigTabCover extends BaseConfigTab {

  @state() _coverShowHeader = true;
  @state() _coverDashboardEntities: string[] = [];
  @state() _coverDashboardOrder: string[] = [];
  @state() _coverDashboardLayouts: Record<string, string> = {};
  @state() _coverEntityPresets: Record<string, number[]> = {};
  @state() _coverRoom = '';
  @state() _coverRoomEntities: CoverRoomEntity[] = [];
  @state() _coverEntityPresetInput: Record<string, string> = {};
  @state() _coverPresetsExpandedEntity: string | null = null;

  // Local drag state
  @state() _dragIdx: number | null = null;
  @state() _dropIdx: number | null = null;
  @state() _dragContext = '';

  protected static override _AUTO_SAVE_KEYS = new Set([
    '_coverShowHeader', '_coverDashboardEntities', '_coverDashboardOrder', '_coverDashboardLayouts',
    '_coverEntityPresets', '_coverRoomEntities',
  ]);

  // — Lifecycle —

  protected override updated(changedProps: PropertyValues): void {
    super.updated(changedProps);
    if (changedProps.has('areaId') && this.areaId) {
      this._coverRoom = this.areaId;
      void this._loadRoomCovers();
    }
    this._checkAutoSave(changedProps);
  }

  // — Persistence —

  loadFromConfig(config: Record<string, unknown>): void {
    const c = config as {
      show_header?: boolean;
      dashboard_compact?: boolean;
      dashboard_entities?: string[];
      dashboard_entity_layouts?: Record<string, string>;
      presets?: number[];
      entity_presets?: Record<string, number[]>;
    };
    this._coverShowHeader = c.show_header ?? true;
    this._coverDashboardEntities = c.dashboard_entities ?? [];
    // Migrate legacy dashboard_compact boolean → per-entity layouts
    if (c.dashboard_entity_layouts) {
      this._coverDashboardLayouts = c.dashboard_entity_layouts;
    } else {
      const fallback = (c.dashboard_compact ?? true) ? 'compact' : 'full';
      const layouts: Record<string, string> = {};
      for (const id of this._coverDashboardEntities) layouts[id] = fallback;
      this._coverDashboardLayouts = layouts;
    }
    this._coverEntityPresets = c.entity_presets ?? {};
    this._initDashboardOrder();
  }

  collectSaveData(): Record<string, unknown> {
    const orderedDashboardEntities = this._coverDashboardOrder.filter((id) =>
      this._coverDashboardEntities.includes(id),
    );
    return {
      show_header: this._coverShowHeader,
      dashboard_entities: orderedDashboardEntities,
      dashboard_entity_layouts: this._coverDashboardLayouts,
      entity_presets: this._coverEntityPresets,
    };
  }

  protected override async _performSave(): Promise<void> {
    await this.backend!.send('set_cover_config', this.collectSaveData());

    if (this._coverRoom && this._coverRoomEntities.length > 0) {
      const cardIds = new Set(this._coverRoomEntities.map((e) => e.entityId));
      const hiddenIds = this._coverRoomEntities.filter((e) => !e.visible).map((e) => e.entityId);
      const orderedIds = this._coverRoomEntities.map((e) => e.entityId);
      const layouts: Record<string, string> = {};
      for (const e of this._coverRoomEntities) {
        layouts[e.entityId] = e.layout;
      }
      await this._saveRoomEntities(this._coverRoom, cardIds, hiddenIds, orderedIds, layouts);
    }

    bus.emit('cover-config-changed', undefined);
  }

  async reload(): Promise<void> {
    if (!this.backend) return;
    try {
      const result = await this.backend.send<{
        cover_card?: { show_header: boolean; dashboard_entities: string[]; dashboard_compact?: boolean; dashboard_entity_layouts?: Record<string, string>; presets: number[]; entity_presets?: Record<string, number[]> };
      }>('get_config');
      if (result?.cover_card) this.loadFromConfig(result.cover_card);
    } catch { /* ignore */ }
    this._coverEntityPresetInput = {};
    await this._loadRoomCovers();
  }

  // — Room loading —

  private async _loadRoomCovers(): Promise<void> {
    if (!this.backend || !this._coverRoom || !this.hass) return;
    const targetRoom = this._coverRoom;
    const areaEntities = getAreaEntities(targetRoom, this.hass.entities, this.hass.devices);
    const coverIds = areaEntities
      .filter((e) => e.entity_id.startsWith('cover.'))
      .map((e) => e.entity_id);

    let roomConfig: { hidden_entities?: string[]; entity_order?: string[]; entity_layouts?: Record<string, string> } | null = null;
    try {
      roomConfig = await this.backend.send<{ hidden_entities?: string[]; entity_order?: string[]; entity_layouts?: Record<string, string> } | null>('get_room', { area_id: targetRoom });
    } catch { /* ignore */ }

    if (this._coverRoom !== targetRoom) return;

    const hiddenSet = new Set(roomConfig?.hidden_entities ?? []);
    const order = roomConfig?.entity_order ?? [];
    const entityLayouts = roomConfig?.entity_layouts ?? {};

    const sorted = [...coverIds].sort((a, b) => {
      const ai = order.indexOf(a);
      const bi = order.indexOf(b);
      if (ai !== -1 && bi !== -1) return ai - bi;
      if (ai !== -1) return -1;
      if (bi !== -1) return 1;
      return 0;
    });

    this._coverRoomEntities = sorted.map((id) => {
      const entity = this.hass?.states[id];
      const name = (entity?.attributes?.friendly_name as string) || id.split('.')[1] || id;
      const dc = (entity?.attributes?.device_class as string) || 'shutter';
      return { entityId: id, name, visible: !hiddenSet.has(id), deviceClass: dc, layout: (entityLayouts[id] as 'full' | 'compact') || 'compact' };
    });
  }

  // — Dashboard order helpers —

  private _initDashboardOrder(): void {
    const all = new Set(this._getAllCoverEntities().map((c) => c.entityId));
    const ordered = this._coverDashboardEntities.filter((id) => all.has(id));
    const remaining = [...all].filter((id) => !this._coverDashboardEntities.includes(id));
    this._coverDashboardOrder = [...ordered, ...remaining];
  }

  /** Public getter for dashboard.ts usage. */
  getAllCoverEntities(): { entityId: string; name: string }[] {
    return this._getAllCoverEntities();
  }

  private _getAllCoverEntities(): { entityId: string; name: string }[] {
    if (!this.hass) return [];
    const covers: { entityId: string; name: string }[] = [];
    for (const [id, entity] of Object.entries(this.hass.states)) {
      if (!id.startsWith('cover.')) continue;
      const name = (entity.attributes?.friendly_name as string) || id.split('.')[1] || id;
      covers.push({ entityId: id, name });
    }
    return covers.sort((a, b) => a.name.localeCompare(b.name));
  }

  // — Actions —

  private _toggleEntityVisibility(entityId: string): void {
    this._coverRoomEntities = this._coverRoomEntities.map((e) =>
      e.entityId === entityId ? { ...e, visible: !e.visible } : e,
    );
  }

  private _cycleLayout(entityId: string): void {
    this._coverRoomEntities = this._coverRoomEntities.map((e) =>
      e.entityId === entityId ? { ...e, layout: e.layout === 'full' ? 'compact' : 'full' } : e,
    );
  }

  private _toggleDashboardEntity(entityId: string): void {
    const set = new Set(this._coverDashboardEntities);
    if (set.has(entityId)) {
      set.delete(entityId);
      this._coverDashboardOrder = this._coverDashboardOrder.filter((id) => id !== entityId);
      const rest = { ...this._coverDashboardLayouts };
      delete rest[entityId];
      this._coverDashboardLayouts = rest;
    } else {
      set.add(entityId);
      if (!this._coverDashboardOrder.includes(entityId)) {
        this._coverDashboardOrder = [...this._coverDashboardOrder, entityId];
      }
      this._coverDashboardLayouts = { ...this._coverDashboardLayouts, [entityId]: 'compact' };
    }
    this._coverDashboardEntities = [...set];
  }

  private _cycleDashboardLayout(entityId: string): void {
    const current = this._coverDashboardLayouts[entityId] ?? 'compact';
    this._coverDashboardLayouts = { ...this._coverDashboardLayouts, [entityId]: current === 'full' ? 'compact' : 'full' };
  }

  private _onDropDashboardCover(idx: number, e: DragEvent): void {
    e.preventDefault();
    if (this._dragIdx === null || this._dragIdx === idx || this._dragContext !== 'dashboard_covers') {
      this._dragIdx = null;
      this._dropIdx = null;
      return;
    }
    const arr = [...this._coverDashboardOrder];
    const [moved] = arr.splice(this._dragIdx, 1);
    arr.splice(idx, 0, moved);
    this._coverDashboardOrder = arr;
    this._dragIdx = null;
    this._dropIdx = null;
  }

  // — Preset actions —

  private _addEntityPreset(entityId: string): void {
    const raw = this._coverEntityPresetInput[entityId] ?? '';
    const val = parseInt(raw, 10);
    if (isNaN(val) || val < 0 || val > 100) return;
    const current = this._coverEntityPresets[entityId] ?? [0, 25, 50, 75, 100];
    if (current.includes(val)) {
      this._coverEntityPresetInput = { ...this._coverEntityPresetInput, [entityId]: '' };
      return;
    }
    this._coverEntityPresets = {
      ...this._coverEntityPresets,
      [entityId]: [...current, val].sort((a, b) => a - b),
    };
    this._coverEntityPresetInput = { ...this._coverEntityPresetInput, [entityId]: '' };
  }

  private _removeEntityPreset(entityId: string, val: number): void {
    const current = this._coverEntityPresets[entityId];
    if (!current) return;
    const updated = current.filter((p) => p !== val);
    if (updated.length === 0) {
      const ep = { ...this._coverEntityPresets };
      delete ep[entityId];
      this._coverEntityPresets = ep;
    } else {
      this._coverEntityPresets = { ...this._coverEntityPresets, [entityId]: updated };
    }
  }

  private _resetEntityPresets(entityId: string): void {
    const ep = { ...this._coverEntityPresets };
    delete ep[entityId];
    this._coverEntityPresets = ep;
  }

  private _togglePresetsExpand(entityId: string): void {
    this._coverPresetsExpandedEntity = this._coverPresetsExpandedEntity === entityId ? null : entityId;
  }

  // — Local drag & drop —

  private _onCoverDragStart(idx: number, context: string): void {
    this._dragIdx = idx;
    this._dragContext = context;
  }

  private _onCoverDragOver(idx: number, e: DragEvent): void {
    e.preventDefault();
    this._dropIdx = idx;
  }

  private _onCoverDragLeave(): void {
    this._dropIdx = null;
  }

  private _onCoverDragEnd(): void {
    this._dragIdx = null;
    this._dropIdx = null;
    this._dragContext = '';
  }

  private _onLocalDrop(idx: number, e: DragEvent): void {
    e.preventDefault();
    if (this._dragIdx === null || this._dragIdx === idx || this._dragContext !== 'covers') {
      this._dragIdx = null;
      this._dropIdx = null;
      return;
    }
    const arr = [...this._coverRoomEntities];
    const [moved] = arr.splice(this._dragIdx, 1);
    arr.splice(idx, 0, moved);
    this._coverRoomEntities = arr;
    this._dragIdx = null;
    this._dropIdx = null;
  }

  // — Dashboard entity picker —

  private _renderDashboardEntities(): TemplateResult {
    const all = this._getAllCoverEntities();
    if (all.length === 0) {
      return html`
        <div class="banner">
          <ha-icon .icon=${'mdi:blinds-open'}></ha-icon>
          <span>${t('config.cover_no_covers')}</span>
        </div>
      `;
    }

    const enabledSet = new Set(this._coverDashboardEntities);
    const ordered = this._coverDashboardOrder.filter((id) => all.some((c) => c.entityId === id));
    const remaining = all.filter((c) => !ordered.includes(c.entityId)).map((c) => c.entityId);
    const sortedIds = [...ordered, ...remaining];

    return html`
      <section class="cfg-section">
        <header class="cfg-section-head">
          <span class="cfg-section-num">2</span>
          <div class="cfg-section-text">
            <span class="section-label">${t('config.cover_dashboard_entities')}</span>
            <span class="section-desc">${t('config.cover_dashboard_entities_desc')}</span>
          </div>
          ${all.length > 0 ? html`
            <span class="cfg-section-count" aria-label="${t('common.count_visible', { count: enabledSet.size, total: all.length })}">
              ${enabledSet.size}/${all.length}
            </span>
          ` : nothing}
        </header>
        <div class="item-list">
          ${sortedIds.map((id, idx) => {
            const entity = all.find((c) => c.entityId === id);
            if (!entity) return nothing;
            const enabled = enabledSet.has(id);
            const isDragging = this._dragIdx === idx && this._dragContext === 'dashboard_covers';
            const isDropTarget = this._dropIdx === idx && this._dragContext === 'dashboard_covers';
            const rowClasses = [
              'item-row',
              !enabled ? 'disabled' : '',
              isDragging ? 'dragging' : '',
              isDropTarget ? 'drop-target' : '',
            ].filter(Boolean).join(' ');
            return html`
              <div class="item-card">
                <div
                  class=${rowClasses}
                  draggable="true"
                  @dragstart=${() => this._onCoverDragStart(idx, 'dashboard_covers')}
                  @dragover=${(ev: DragEvent) => this._onCoverDragOver(idx, ev)}
                  @dragleave=${() => this._onCoverDragLeave()}
                  @drop=${(ev: DragEvent) => this._onDropDashboardCover(idx, ev)}
                  @dragend=${() => this._onCoverDragEnd()}
                >
                  <glass-drag-handle></glass-drag-handle>
                  <div class="item-info">
                    <span class="item-name">${entity.name}</span>
                    <span class="item-meta">${entity.entityId}</span>
                  </div>
                  ${enabled ? html`
                    <button
                      class="layout-btn"
                      @click=${() => this._cycleDashboardLayout(id)}
                      aria-label="${t('config.light_change_layout_aria')}"
                      title="${t((this._coverDashboardLayouts[id] ?? 'compact') === 'compact' ? 'config.light_layout_compact' : 'config.light_layout_full')}"
                    >
                      ${t((this._coverDashboardLayouts[id] ?? 'compact') === 'compact' ? 'config.light_layout_compact' : 'config.light_layout_full')}
                    </button>
                  ` : nothing}
                  <glass-toggle
                    .checked=${enabled}
                    aria-label="${enabled ? t('common.hide') : t('common.show')} ${entity.name}"
                    @glass-toggle-change=${() => this._toggleDashboardEntity(id)}
                  ></glass-toggle>
                </div>
              </div>
            `;
          })}
        </div>
      </section>
    `;
  }

  // — Render —

  renderTab(): TemplateResult {
    void this._lang;
    if (!this.hass) return html``;

    return html`
      <div class="tab-panel cover-tab" id="panel-cover">
        <glass-cover-card .hass=${this.hass} .areaId=${this.areaId} config-preview></glass-cover-card>
        ${!this._coverRoom ? html`
          <div class="cfg-info">
            <ha-icon .icon=${'mdi:information-outline'}></ha-icon>
            <span>${t('config.cover_dashboard_info')}</span>
          </div>
        ` : nothing}

        <section class="cfg-section">
          <header class="cfg-section-head">
            <span class="cfg-section-num">1</span>
            <div class="cfg-section-text">
              <span class="section-label">${t('config.display')}</span>
            </div>
          </header>
          <div class="feature-list">
            ${this._renderFeatureRow({
              icon: 'mdi:page-layout-header',
              nameKey: 'config.cover_show_header',
              descKey: 'config.cover_show_header_desc',
              on: this._coverShowHeader,
              onToggle: () => { this._coverShowHeader = !this._coverShowHeader; },
            })}
          </div>
        </section>

        ${!this._coverRoom ? this._renderDashboardEntities() : nothing}
        ${this._coverRoom ? html`
          ${this._coverRoomEntities.length > 0 ? html`
            <section class="cfg-section">
              <header class="cfg-section-head">
                <span class="cfg-section-num">2</span>
                <div class="cfg-section-text">
                  <span class="section-label">${t('config.cover_list_title')}</span>
                  <span class="section-desc">${t('config.cover_list_banner')}</span>
                </div>
                <span class="cfg-section-count">${this._coverRoomEntities.length}</span>
              </header>
              <div class="item-list">
              ${this._coverRoomEntities.map((e, idx) => {
                const isDragging = this._dragIdx === idx && this._dragContext === 'covers';
                const isDropTarget = this._dropIdx === idx && this._dragContext === 'covers';
                const isExpanded = this._coverPresetsExpandedEntity === e.entityId;
                const hasCustomPresets = !!this._coverEntityPresets[e.entityId];
                const rowClasses = [
                  'item-row',
                  !e.visible ? 'disabled' : '',
                  isDragging ? 'dragging' : '',
                  isDropTarget ? 'drop-target' : '',
                ].filter(Boolean).join(' ');
                const wrapClasses = ['item-card', isExpanded ? 'expanded' : ''].filter(Boolean).join(' ');
                return html`
                  <div class=${wrapClasses}>
                    <div
                      class=${rowClasses}
                      draggable="true"
                      @dragstart=${() => this._onCoverDragStart(idx, 'covers')}
                      @dragover=${(ev: DragEvent) => this._onCoverDragOver(idx, ev)}
                      @dragleave=${() => this._onCoverDragLeave()}
                      @drop=${(ev: DragEvent) => this._onLocalDrop(idx, ev)}
                      @dragend=${() => this._onCoverDragEnd()}
                    >
                      <glass-drag-handle></glass-drag-handle>
                      <div class="item-info">
                        <span class="item-name">${e.name}</span>
                        <span class="item-meta">${e.entityId}</span>
                      </div>
                      <glass-icon-button
                        class="presets-btn"
                        size="xs"
                        active-color="purple"
                        ?active=${hasCustomPresets}
                        .icon=${'mdi:tune-vertical'}
                        aria-label="${t('config.cover_entity_presets')}"
                        aria-expanded=${isExpanded ? 'true' : 'false'}
                        title="${t('config.cover_entity_presets')}"
                        @click=${() => this._togglePresetsExpand(e.entityId)}
                      ></glass-icon-button>
                      <button
                        class="layout-btn"
                        @click=${() => this._cycleLayout(e.entityId)}
                        aria-label="${t('config.light_change_layout_aria')}"
                        title="${t(e.layout === 'compact' ? 'config.light_layout_compact' : 'config.light_layout_full')}"
                      >
                        ${t(e.layout === 'compact' ? 'config.light_layout_compact' : 'config.light_layout_full')}
                      </button>
                      <glass-toggle
                        .checked=${e.visible}
                        aria-label="${e.visible ? t('common.hide') : t('common.show')} ${e.name}"
                        @glass-toggle-change=${() => this._toggleEntityVisibility(e.entityId)}
                      ></glass-toggle>
                    </div>
                    <div class="item-fold-sep ${isExpanded ? 'visible' : ''}"></div>
                    <div class="entity-presets-fold ${isExpanded ? 'open' : ''}">
                      <div class="entity-presets-fold-inner">
                        <div class="entity-presets-content">
                          <div class="entity-presets-label">${hasCustomPresets ? t('config.cover_entity_presets') : t('config.cover_presets')}</div>
                          <div class="preset-chips">
                            ${(this._coverEntityPresets[e.entityId] ?? [0, 25, 50, 75, 100]).map((p) => {
                              const pIcon = p >= 50 ? 'mdi:window-shutter-open' : 'mdi:window-shutter';
                              return html`
                                <span class="preset-chip small ${hasCustomPresets ? 'custom' : ''}">
                                  <ha-icon .icon=${pIcon}></ha-icon>
                                  ${p === 0 ? t('cover.preset_closed') : p === 100 ? t('cover.preset_open') : `${p}%`}
                                  ${hasCustomPresets ? html`
                                    <button
                                      class="preset-chip-remove"
                                      @click=${() => this._removeEntityPreset(e.entityId, p)}
                                      aria-label="${t('common.delete')} ${p}%"
                                    >
                                      <ha-icon .icon=${'mdi:close'}></ha-icon>
                                    </button>
                                  ` : nothing}
                                </span>
                              `;
                            })}
                          </div>
                          <div class="preset-add">
                            <input
                              class="preset-input small"
                              type="number"
                              min="0"
                              max="100"
                              step="5"
                              .value=${this._coverEntityPresetInput[e.entityId] ?? ''}
                              @input=${(ev: Event) => { this._coverEntityPresetInput = { ...this._coverEntityPresetInput, [e.entityId]: (ev.target as HTMLInputElement).value }; }}
                              @keydown=${(ev: KeyboardEvent) => { if (ev.key === 'Enter') this._addEntityPreset(e.entityId); }}
                              placeholder="%"
                            />
                            <button
                              class="preset-add-btn small"
                              ?disabled=${!this._coverEntityPresetInput[e.entityId]}
                              @click=${() => this._addEntityPreset(e.entityId)}
                              aria-label="${t('config.cover_preset_add')}"
                            >
                              <ha-icon .icon=${'mdi:plus'}></ha-icon>
                              ${t('config.cover_preset_add')}
                            </button>
                            ${hasCustomPresets ? html`
                              <button
                                class="preset-reset-btn"
                                @click=${() => this._resetEntityPresets(e.entityId)}
                                aria-label="${t('common.reset')}"
                              >
                                <ha-icon .icon=${'mdi:restore'}></ha-icon>
                              </button>
                            ` : nothing}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                `;
              })}
            </div>
            </section>
          ` : html`
            <section class="cfg-section">
              <header class="cfg-section-head">
                <span class="cfg-section-num">2</span>
                <div class="cfg-section-text">
                  <span class="section-label">${t('config.cover_list_title')}</span>
                </div>
              </header>
              <div class="cfg-empty">
                <ha-icon .icon=${'mdi:blinds-open'}></ha-icon>
                <span>${t('config.cover_no_covers')}</span>
              </div>
            </section>
          `}
        ` : nothing}

        <div class="save-bar">
          <glass-button variant="ghost" @click=${() => this.reload()}>${t('common.reset')}</glass-button>
        </div>
      </div>
    `;
  }
}

try { customElements.define('config-tab-cover', ConfigTabCover); } catch { /* already registered */ }
