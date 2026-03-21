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
  @state() _climateRoomDropdownOpen = false;
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

    // Auto-select first room if none selected
    if (!this._climateRoom && this.rooms.length > 0) {
      this._climateRoom = this.rooms[0].areaId;
      void this._loadRoomClimates();
    }
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

  private _selectRoom(areaId: string): void {
    this._climateRoom = areaId;
    this._climateRoomDropdownOpen = false;
    void this._loadRoomClimates();
  }

  private _toggleEntityVisibility(entityId: string): void {
    this._climateRoomEntities = this._climateRoomEntities.map((e) =>
      e.entityId === entityId ? { ...e, visible: !e.visible } : e,
    );
  }

  private _toggleDashboardEntity(entityId: string): void {
    const set = new Set(this._climateDashboardEntities);
    if (set.has(entityId)) {
      set.delete(entityId);
    } else {
      set.add(entityId);
    }
    this._climateDashboardEntities = [...set];
  }

  private _getAllClimateEntities(): { entityId: string; name: string }[] {
    if (!this.hass) return [];
    const climates: { entityId: string; name: string }[] = [];
    for (const [id, entity] of Object.entries(this.hass.states)) {
      if (!id.startsWith('climate.')) continue;
      const name = (entity.attributes?.friendly_name as string) || id.split('.')[1] || id;
      climates.push({ entityId: id, name });
    }
    return climates.sort((a, b) => a.name.localeCompare(b.name));
  }

  // — Render —

  renderPreview(): TemplateResult | typeof nothing {
    const entities = this._climateRoomEntities;
    if (entities.length === 0) {
      return html`<div style="padding:12px;text-align:center;font-size:11px;color:var(--t4);">${t('config.climate_no_entities')}</div>`;
    }

    if (this._climateDisplayMode === 'normal') {
      return this._renderNormalPreview(entities);
    }
    return this._renderListPreview(entities);
  }

  private _renderListPreview(entities: { entityId: string; name: string; visible: boolean }[]): TemplateResult {
    const activeCount = entities.filter((e) => e.visible).length;
    const total = entities.length;
    return html`
      <div style="padding:6px 10px;">
        <div style="display:flex;align-items:center;gap:6px;margin-bottom:6px;">
          <span style="font-size:12px;font-weight:600;color:var(--t1);">${t('climate.title')}</span>
          <span style="min-width:14px;height:14px;padding:0 4px;font-size:9px;font-weight:600;border-radius:var(--radius-sm);background:var(--s3);color:var(--t2);display:flex;align-items:center;justify-content:center;">${activeCount}/${total}</span>
        </div>
        ${entities.slice(0, 4).map((e) => html`
          <div style="display:flex;align-items:center;gap:6px;padding:4px 2px;opacity:${e.visible ? '1' : '0.3'};">
            <ha-icon .icon=${'mdi:thermostat'} style="--mdc-icon-size:14px;display:flex;align-items:center;justify-content:center;color:var(--t3);"></ha-icon>
            <span style="font-size:11px;color:var(--t2);flex:1;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;">${e.name}</span>
            <span style="font-size:10px;color:var(--t4);flex-shrink:0;">--°C</span>
            <span style="width:5px;height:5px;border-radius:50%;background:var(--t4);flex-shrink:0;"></span>
          </div>
        `)}
        ${entities.length > 4 ? html`<div style="font-size:10px;color:var(--t4);text-align:center;padding:4px;">+${entities.length - 4}</div>` : nothing}
      </div>
    `;
  }

  private _renderNormalPreview(entities: { entityId: string; name: string; visible: boolean }[]): TemplateResult {
    // Mini arc gauge preview
    const cx = 60, cy = 62, r = 40;
    const startA = -120, endA = 120;
    const toRad = (a: number) => ((a - 90) * Math.PI) / 180;
    const pt = (a: number) => ({ x: cx + r * Math.cos(toRad(a)), y: cy + r * Math.sin(toRad(a)) });
    const p1 = pt(startA), p2 = pt(endA);
    const arcD = `M ${p1.x} ${p1.y} A ${r} ${r} 0 1 1 ${p2.x} ${p2.y}`;
    // Progress at ~60%
    const fullLen = Math.PI * r * (240 / 180);
    const progressLen = 0.6 * fullLen;
    // Target dot at ~70%
    const tAngle = startA + 0.7 * 240;
    const tPt = pt(tAngle);

    const visibleEntities = entities.filter((e) => e.visible);

    return html`
      <div style="padding:6px 10px;">
        <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;">
          <span style="font-size:12px;font-weight:600;color:var(--t1);">${t('climate.title')}</span>
        </div>
        ${visibleEntities.length > 1 ? html`
          <div style="display:flex;gap:4px;margin-bottom:4px;">
            ${visibleEntities.slice(0, 4).map((e, i) => html`
              <span style="font-size:9px;padding:2px 6px;border-radius:var(--radius-sm);${i === 0 ? 'background:var(--s3);color:var(--t1);font-weight:600;' : 'color:var(--t3);'}">${e.name.length > 8 ? e.name.slice(0, 8) + '…' : e.name}</span>
            `)}
          </div>
        ` : nothing}
        <div style="display:flex;justify-content:center;">
          <svg viewBox="0 0 120 80" fill="none" style="width:100px;height:68px;">
            ${svg`
              <path d=${arcD} stroke="var(--s3)" stroke-width="4" fill="none" stroke-linecap="round" />
              <path d=${arcD} stroke="var(--c-warning)" stroke-width="4" fill="none" stroke-linecap="round"
                stroke-dasharray=${fullLen} stroke-dashoffset=${fullLen - progressLen} />
              <circle cx=${tPt.x} cy=${tPt.y} r="3" fill="var(--t1)" />
              <text x=${cx} y=${cy - 4} text-anchor="middle" fill="var(--t1)" font-size="14" font-weight="700">21.5°</text>
              <text x=${cx} y=${cy + 8} text-anchor="middle" fill="var(--t3)" font-size="7">
                <tspan>🔥</tspan> ${t('climate.action_heating')}
              </text>
            `}
          </svg>
        </div>
      </div>
    `;
  }

  renderTab(): TemplateResult {
    void this._lang;
    if (!this.hass) return html`${nothing}`;

    const rooms = this.rooms;
    const selectedRoom = this._climateRoom;
    const entities = this._climateRoomEntities;
    const isDropdownOpen = this._climateRoomDropdownOpen;

    // All climate entities for dashboard selection
    const allClimateEntities = this._getAllClimateEntities();

    return html`
      <div class="preview-encart">
        <div class="preview-label">${t('config.preview')}</div>
        ${this.renderPreview()}
      </div>

      <div class="tab-panel" id="panel-climate">
        <div class="section-label">${t('config.tab_climate')}</div>
        <div class="section-desc">${t('config.climate_desc')}</div>

        <!-- Room selector -->
        <div class="dropdown ${isDropdownOpen ? 'open' : ''}">
          <button class="dropdown-trigger"
            @click=${() => { this._climateRoomDropdownOpen = !isDropdownOpen; }}
            aria-expanded=${isDropdownOpen ? 'true' : 'false'}
            aria-haspopup="listbox">
            <span>${rooms.find((r) => r.areaId === selectedRoom)?.name ?? t('config.climate_select_room')}</span>
            <ha-icon class="arrow" .icon=${'mdi:chevron-down'}></ha-icon>
          </button>
          <div class="dropdown-menu" role="listbox">
            ${rooms.map((room) => html`
              <button class="dropdown-item ${room.areaId === selectedRoom ? 'active' : ''}"
                role="option" aria-selected=${room.areaId === selectedRoom ? 'true' : 'false'}
                @click=${() => this._selectRoom(room.areaId)}>
                <ha-icon .icon=${room.icon || 'mdi:home'} style="--mdc-icon-size:16px;display:flex;align-items:center;justify-content:center;"></ha-icon>
                ${room.name}
              </button>
            `)}
          </div>
        </div>

        <!-- Display mode selector (popup) -->
        <div class="section-label" style="margin-top:14px;font-size:11px;">${t('config.climate_display_mode_popup')}</div>
        <div style="display:flex;gap:6px;margin-top:6px;">
          <button class="chip ${this._climateDisplayMode === 'list' ? 'active' : ''}"
            @click=${() => { this._climateDisplayMode = 'list'; }}
            aria-pressed=${this._climateDisplayMode === 'list' ? 'true' : 'false'}>
            <ha-icon .icon=${'mdi:format-list-bulleted'} style="--mdc-icon-size:14px;display:flex;align-items:center;justify-content:center;"></ha-icon>
            ${t('config.climate_mode_list')}
          </button>
          <button class="chip ${this._climateDisplayMode === 'normal' ? 'active' : ''}"
            @click=${() => { this._climateDisplayMode = 'normal'; }}
            aria-pressed=${this._climateDisplayMode === 'normal' ? 'true' : 'false'}>
            <ha-icon .icon=${'mdi:gauge'} style="--mdc-icon-size:14px;display:flex;align-items:center;justify-content:center;"></ha-icon>
            ${t('config.climate_mode_normal')}
          </button>
        </div>

        <!-- Display mode selector (dashboard) -->
        <div class="section-label" style="margin-top:10px;font-size:11px;">${t('config.climate_display_mode_dashboard')}</div>
        <div style="display:flex;gap:6px;margin-top:6px;">
          <button class="chip ${this._climateDashboardDisplayMode === 'list' ? 'active' : ''}"
            @click=${() => { this._climateDashboardDisplayMode = 'list'; }}
            aria-pressed=${this._climateDashboardDisplayMode === 'list' ? 'true' : 'false'}>
            <ha-icon .icon=${'mdi:format-list-bulleted'} style="--mdc-icon-size:14px;display:flex;align-items:center;justify-content:center;"></ha-icon>
            ${t('config.climate_mode_list')}
          </button>
          <button class="chip ${this._climateDashboardDisplayMode === 'normal' ? 'active' : ''}"
            @click=${() => { this._climateDashboardDisplayMode = 'normal'; }}
            aria-pressed=${this._climateDashboardDisplayMode === 'normal' ? 'true' : 'false'}>
            <ha-icon .icon=${'mdi:gauge'} style="--mdc-icon-size:14px;display:flex;align-items:center;justify-content:center;"></ha-icon>
            ${t('config.climate_mode_normal')}
          </button>
        </div>

        <!-- Show header toggle -->
        <div class="check-item" style="margin-top:12px;">
          <button class="check-box ${this._climateShowHeader ? 'on' : ''}"
            role="switch" aria-checked=${this._climateShowHeader ? 'true' : 'false'}
            aria-label=${t('config.climate_show_header')}
            @click=${() => { this._climateShowHeader = !this._climateShowHeader; }}>
            <ha-icon .icon=${this._climateShowHeader ? 'mdi:check' : ''} style="--mdc-icon-size:12px;display:flex;align-items:center;justify-content:center;"></ha-icon>
          </button>
          <span>${t('config.climate_show_header')}</span>
        </div>

        <!-- Dashboard entities -->
        ${allClimateEntities.length > 0 ? html`
          <div class="section-label" style="margin-top:14px;">${t('config.climate_dashboard_entities')}</div>
          <div class="section-desc">${t('config.climate_dashboard_entities_desc')}</div>
          <div class="item-list">
            ${allClimateEntities.map((ce) => {
              const sel = this._climateDashboardEntities.includes(ce.entityId);
              return html`
                <div class="item-row ${!sel ? 'disabled' : ''}">
                  <div class="item-info">
                    <span class="item-name">${ce.name}</span>
                    <span class="item-meta">${ce.entityId}</span>
                  </div>
                  <button
                    class="toggle ${sel ? 'on' : ''}"
                    @click=${() => this._toggleDashboardEntity(ce.entityId)}
                    role="switch"
                    aria-checked=${sel ? 'true' : 'false'}
                    aria-label="${sel ? t('common.hide') : t('common.show')} ${ce.name}"
                  ></button>
                </div>
              `;
            })}
          </div>
        ` : nothing}

        <!-- Entity list -->
        ${entities.length === 0 ? html`
          <div class="banner" style="margin-top:12px;">
            <ha-icon .icon=${'mdi:thermostat'} style="--mdc-icon-size:16px;display:flex;align-items:center;justify-content:center;"></ha-icon>
            <span>${t('config.climate_no_entities')}</span>
          </div>
        ` : html`
          <div class="item-list" style="margin-top:12px;">
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
                  <div class="item-info" style="flex:1;min-width:0;">
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
              `;
            })}
          </div>
        `}

        <div class="save-bar">
          <button class="btn btn-ghost" @click=${() => this.reload()}>${t('common.reset')}</button>
          <button class="btn btn-accent" @click=${() => this.save()}>${t('common.save')}</button>
        </div>
      </div>
    `;
  }
}

try { customElements.define('config-tab-climate', ConfigTabClimate); } catch { /* already registered */ }
