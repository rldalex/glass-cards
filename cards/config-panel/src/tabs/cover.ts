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

// — Preview helpers —

const PREVIEW_DC_ICONS: Record<string, [string, string]> = {
  shutter: ['mdi:window-shutter-open', 'mdi:window-shutter'],
  blind: ['mdi:blinds-open', 'mdi:blinds'],
  curtain: ['mdi:curtains', 'mdi:curtains'],
  garage: ['mdi:garage-open', 'mdi:garage'],
  gate: ['mdi:gate-open', 'mdi:gate'],
  door: ['mdi:door-open', 'mdi:door-closed'],
};

function renderCoverPreviewRow(
  hass: { states: Record<string, { state: string; attributes: Record<string, unknown> }> } | undefined,
  e: { entityId: string; name: string; visible: boolean; deviceClass: string; layout: 'full' | 'compact' },
  compact: boolean,
  isRight: boolean,
) {
  const icons = PREVIEW_DC_ICONS[e.deviceClass] || PREVIEW_DC_ICONS.shutter;
  const entity = hass?.states[e.entityId];
  const isOpen = entity?.state === 'open' || entity?.state === 'opening';
  const pos = entity?.attributes.current_position as number | undefined;

  const rowClasses = `pw-cv-row ${compact ? 'compact' : 'full'}${isRight ? ' right' : ''}`;
  return html`
    <div class=${rowClasses}>
      <div class="pw-cv-icon ${isOpen ? 'open' : ''}">
        <ha-icon .icon=${icons[isOpen ? 0 : 1]}></ha-icon>
      </div>
      <div class="pw-cv-info">
        <div class="pw-cv-name">${e.name}</div>
        <div class="pw-cv-sub">
          <span class="pw-cv-state ${isOpen ? 'open' : ''}">${isOpen ? t('cover.open') : t('cover.closed')}</span>
        </div>
      </div>
      ${!compact && pos !== undefined ? html`
        <span class="pw-cv-pos ${isOpen ? 'open' : ''}">${pos}<span class="pw-cv-pos-unit">%</span></span>
      ` : nothing}
      <div class="pw-cv-dot ${isOpen ? 'open' : ''}"></div>
    </div>
  `;
}

function renderCoverPreviewRows(
  hass: { states: Record<string, { state: string; attributes: Record<string, unknown> }> } | undefined,
  entities: { entityId: string; name: string; visible: boolean; deviceClass: string; layout: 'full' | 'compact' }[],
) {
  const results: unknown[] = [];
  let i = 0;
  while (i < entities.length) {
    const e = entities[i];
    const isCompact = e.layout === 'compact';
    if (isCompact && i + 1 < entities.length && entities[i + 1].layout === 'compact') {
      results.push(renderCoverPreviewRow(hass, e, true, false));
      results.push(renderCoverPreviewRow(hass, entities[i + 1], true, true));
      i += 2;
    } else {
      results.push(renderCoverPreviewRow(hass, e, false, false));
      i++;
    }
  }
  return results;
}

// — Component —

export class ConfigTabCover extends BaseConfigTab {

  @state() _coverShowHeader = true;
  @state() _coverDashboardCompact = true;
  @state() _coverDashboardEntities: string[] = [];
  @state() _coverDashboardOrder: string[] = [];
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
    '_coverShowHeader', '_coverDashboardCompact', '_coverDashboardEntities', '_coverDashboardOrder',
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
      presets?: number[];
      entity_presets?: Record<string, number[]>;
    };
    this._coverShowHeader = c.show_header ?? true;
    this._coverDashboardCompact = c.dashboard_compact ?? true;
    this._coverDashboardEntities = c.dashboard_entities ?? [];
    this._coverEntityPresets = c.entity_presets ?? {};
    this._initDashboardOrder();
  }

  collectSaveData(): Record<string, unknown> {
    const orderedDashboardEntities = this._coverDashboardOrder.filter((id) =>
      this._coverDashboardEntities.includes(id),
    );
    return {
      show_header: this._coverShowHeader,
      dashboard_compact: this._coverDashboardCompact,
      dashboard_entities: orderedDashboardEntities,
      entity_presets: this._coverEntityPresets,
    };
  }

  async save(): Promise<void> {
    if (!this.backend) return;
    try {
      await this.backend.send('set_cover_config', this.collectSaveData());

      if (this._coverRoom && this._coverRoomEntities.length > 0) {
        let existingHidden: string[] = [];
        let existingOrder: string[] = [];
        let existingLayouts: Record<string, string> = {};
        try {
          const existing = await this.backend.send<{
            hidden_entities: string[];
            entity_order: string[];
            entity_layouts: Record<string, string>;
          } | null>('get_room', { area_id: this._coverRoom });
          if (existing) {
            existingHidden = existing.hidden_entities ?? [];
            existingOrder = existing.entity_order ?? [];
            existingLayouts = existing.entity_layouts ?? {};
          }
        } catch { /* ignore */ }

        const coverEntityIds = new Set(this._coverRoomEntities.map((e) => e.entityId));
        const nonCoverHidden = existingHidden.filter((id) => !coverEntityIds.has(id));
        const hiddenCovers = this._coverRoomEntities.filter((e) => !e.visible).map((e) => e.entityId);
        const nonCoverOrder = existingOrder.filter((id) => !coverEntityIds.has(id));
        const entityOrder = [...nonCoverOrder, ...this._coverRoomEntities.map((e) => e.entityId)];

        const layouts: Record<string, string> = { ...existingLayouts };
        for (const e of this._coverRoomEntities) {
          layouts[e.entityId] = e.layout;
        }

        await this.backend.send('set_room', {
          area_id: this._coverRoom,
          hidden_entities: [...nonCoverHidden, ...hiddenCovers],
          entity_order: entityOrder,
          entity_layouts: layouts,
        });
      }

      this._fireToast(true);
      bus.emit('cover-config-changed', undefined);
      if (this._coverRoom) bus.emit('room-config-changed', { areaId: this._coverRoom });
    } catch {
      this._fireToast(false);
    }
  }

  async reload(): Promise<void> {
    if (!this.backend) return;
    try {
      const result = await this.backend.send<{
        cover_card?: { show_header: boolean; dashboard_entities: string[]; dashboard_compact?: boolean; presets: number[]; entity_presets?: Record<string, number[]> };
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

  toggleDashboardEntity(entityId: string): void {
    const set = new Set(this._coverDashboardEntities);
    if (set.has(entityId)) {
      set.delete(entityId);
      this._coverDashboardOrder = this._coverDashboardOrder.filter((id) => id !== entityId);
    } else {
      set.add(entityId);
      if (!this._coverDashboardOrder.includes(entityId)) {
        this._coverDashboardOrder = [...this._coverDashboardOrder, entityId];
      }
    }
    this._coverDashboardEntities = [...set];
  }

  onDropDashboardCover(idx: number, e: DragEvent): void {
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

  private _onLocalDragStart(idx: number, context: string): void {
    this._dragIdx = idx;
    this._dragContext = context;
  }

  private _onLocalDragOver(idx: number, e: DragEvent): void {
    e.preventDefault();
    this._dropIdx = idx;
  }

  private _onLocalDragLeave(): void {
    this._dropIdx = null;
  }

  private _onLocalDragEnd(): void {
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

  // — Render —

  renderPreview(): TemplateResult | typeof nothing {
    const entities = this._coverRoomEntities.filter((e) => e.visible);
    const openCount = entities.filter((e) => {
      const s = this.hass?.states[e.entityId];
      return s?.state === 'open' || s?.state === 'opening';
    }).length;

    // Pick the first entity for expanded preview
    const expanded = entities[0];
    const expEntity = expanded ? this.hass?.states[expanded.entityId] : undefined;
    const expOpen = expEntity?.state === 'open' || expEntity?.state === 'opening';
    const expPos = (expEntity?.attributes.current_position as number | undefined) ?? 0;
    const expIcons = expanded ? (PREVIEW_DC_ICONS[expanded.deviceClass] || PREVIEW_DC_ICONS.shutter) : PREVIEW_DC_ICONS.shutter;
    const entityPresets = expanded ? (this._coverEntityPresets[expanded.entityId] ?? [0, 25, 50, 75, 100]) : [0, 25, 50, 75, 100];

    return html`
      <div class="preview-cover">
        ${this._coverShowHeader ? html`
          <div class="pw-cv-header">
            <div class="pw-cv-header-left">
              <span class="pw-cv-header-title">${t('cover.title')}</span>
              <span class="pw-cv-header-count ${openCount > 0 ? 'active' : 'idle'}">${openCount}/${entities.length}</span>
            </div>
            <div class="pw-cv-header-actions">
              <div class="pw-cv-header-btn">
                <ha-icon .icon=${'mdi:arrow-up'}></ha-icon>
              </div>
              <div class="pw-cv-header-btn">
                <ha-icon .icon=${'mdi:arrow-down'}></ha-icon>
              </div>
            </div>
          </div>
        ` : nothing}
        <div class="preview-cover-card glass">
          <!-- Tint -->
          <div class="pw-cv-tint" style="opacity:${entities.length > 0 ? (openCount / entities.length * 0.18).toFixed(3) : '0'};"></div>
          ${entities.length === 0 ? html`
            <div class="pw-cv-empty">—</div>
          ` : nothing}
          ${expanded ? html`
            <!-- Expanded entity row -->
            <div class="pw-cv-row">
              <div class="pw-cv-icon ${expOpen ? 'open' : ''}">
                <ha-icon .icon=${expIcons[expOpen ? 0 : 1]}></ha-icon>
              </div>
              <div class="pw-cv-info">
                <div class="pw-cv-name">${expanded.name}</div>
                <div class="pw-cv-state ${expOpen ? 'open' : ''}">${expOpen ? t('cover.open') : t('cover.closed')}</div>
              </div>
              <span class="pw-cv-pos ${expOpen ? 'open' : ''}">${expPos}<span class="pw-cv-pos-unit">%</span></span>
              <div class="pw-cv-dot ${expOpen ? 'open' : ''}"></div>
            </div>
            <!-- Fold separator -->
            <div class="pw-cv-fold-sep"></div>
            <!-- Controls panel -->
            <div class="pw-cv-controls">
              <span class="pw-cv-controls-label">${expanded.name}</span>
              <!-- Transport -->
              <div class="pw-cv-transport">
                <div class="pw-cv-transport-btn ${expPos === 100 ? 'accent' : ''}">
                  <ha-icon .icon=${'mdi:arrow-up'}></ha-icon>
                </div>
                <div class="pw-cv-transport-btn">
                  <ha-icon .icon=${'mdi:stop'}></ha-icon>
                </div>
                <div class="pw-cv-transport-btn ${expPos === 0 ? 'accent' : ''}">
                  <ha-icon .icon=${'mdi:arrow-down'}></ha-icon>
                </div>
              </div>
              <!-- Slider -->
              <div class="pw-cv-slider">
                <ha-icon .icon=${expIcons[1]}></ha-icon>
                <div class="pw-cv-bar">
                  <div class="pw-cv-bar-fill" style="width:${expPos}%;"></div>
                </div>
                <ha-icon .icon=${expIcons[0]}></ha-icon>
              </div>
              <!-- Separator -->
              <div class="pw-cv-sep"></div>
              <!-- Presets -->
              <div class="pw-cv-presets">
                ${entityPresets.map((p) => {
                  const isActive = expPos === p;
                  return html`
                    <span class="pw-cv-preset ${isActive ? 'active' : ''}">
                      <ha-icon .icon=${p >= 50 ? expIcons[0] : expIcons[1]}></ha-icon>
                      ${p === 0 ? t('cover.preset_closed') : p === 100 ? t('cover.preset_open') : `${p}%`}
                    </span>
                  `;
                })}
              </div>
            </div>
          ` : nothing}
          ${entities.length > 1 ? html`
            <!-- Remaining entities (compact) -->
            <div class="pw-cv-remaining-sep"></div>
            <div class="pw-cv-grid">
              ${renderCoverPreviewRows(this.hass, entities.slice(1, 5))}
            </div>
          ` : nothing}
        </div>
      </div>
    `;
  }

  renderTab(): TemplateResult {
    void this._lang;
    if (!this.hass) return html``;

    return html`
      <div class="preview-encart">
        <div class="preview-label">${t('config.preview')}</div>
        ${this.renderPreview()}
      </div>

      <div class="tab-panel" id="panel-cover">
        <div class="section-label">${t('config.behavior')}</div>
        <div class="feature-list">
          <button
            class="feature-row"
            role="switch"
            aria-checked=${this._coverShowHeader ? 'true' : 'false'}
            @click=${() => { this._coverShowHeader = !this._coverShowHeader; }}
          >
            <div class="feature-icon">
              <ha-icon .icon=${'mdi:page-layout-header'}></ha-icon>
            </div>
            <div class="feature-text">
              <div class="feature-name">${t('config.cover_show_header')}</div>
              <div class="feature-desc">${t('config.cover_show_header_desc')}</div>
            </div>
            <span
              class="toggle ${this._coverShowHeader ? 'on' : ''}"
            ></span>
          </button>
        </div>

        ${this._coverRoom ? html`
          ${this._coverRoomEntities.length > 0 ? html`
            <div class="section-label">${t('config.cover_list_title')} (${this._coverRoomEntities.length})</div>
            <div class="section-desc">${t('config.cover_list_banner')}</div>
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
                      @dragstart=${() => this._onLocalDragStart(idx, 'covers')}
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
                        class="presets-btn ${hasCustomPresets ? 'active' : ''}"
                        @click=${() => this._togglePresetsExpand(e.entityId)}
                        aria-label="${t('config.cover_entity_presets')}"
                        aria-expanded=${isExpanded ? 'true' : 'false'}
                        title="${t('config.cover_entity_presets')}"
                      >
                        <ha-icon .icon=${'mdi:tune-vertical'}></ha-icon>
                      </button>
                      <button
                        class="layout-btn"
                        @click=${() => this._cycleLayout(e.entityId)}
                        aria-label="${t('config.light_change_layout_aria')}"
                        title="${t(e.layout === 'compact' ? 'config.light_layout_compact' : 'config.light_layout_full')}"
                      >
                        ${t(e.layout === 'compact' ? 'config.light_layout_compact' : 'config.light_layout_full')}
                      </button>
                      <button
                        class="toggle ${e.visible ? 'on' : ''}"
                        @click=${() => this._toggleEntityVisibility(e.entityId)}
                        role="switch"
                        aria-checked=${e.visible ? 'true' : 'false'}
                        aria-label="${e.visible ? t('common.hide') : t('common.show')} ${e.name}"
                      ></button>
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
                              style="opacity:${this._coverEntityPresetInput[e.entityId] ? '1' : '0.4'};pointer-events:${this._coverEntityPresetInput[e.entityId] ? 'auto' : 'none'};"
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
          ` : html`
            <div class="banner">
              <ha-icon .icon=${'mdi:blinds-open'}></ha-icon>
              <span>${t('config.cover_no_covers')}</span>
            </div>
          `}
        ` : nothing}

        <div class="save-bar">
          <button class="btn btn-ghost" @click=${() => this.reload()}>${t('common.reset')}</button>
        </div>
      </div>
    `;
  }
}

try { customElements.define('config-tab-cover', ConfigTabCover); } catch { /* already registered */ }
