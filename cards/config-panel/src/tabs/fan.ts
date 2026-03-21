import { html, nothing, type PropertyValues, type TemplateResult } from 'lit';
import { state } from 'lit/decorators.js';
import { t } from '@glass-cards/i18n';
import { bus } from '@glass-cards/event-bus';
import { getAreaEntities } from '@glass-cards/base-card';
import { BaseConfigTab } from '../base-tab';

// — Types —

interface PreviewFan {
  name: string; isOn: boolean; pct: number; step: number; total: number; icon: string; layout: 'full' | 'compact';
}

interface FanRoomEntity {
  entityId: string; name: string; visible: boolean; layout: 'full' | 'compact';
}

// — Preview helpers —

function renderFanPreviewRow(f: PreviewFan, accentRgba: string, compact: boolean, isRight: boolean) {
  const sepStyle = isRight ? 'padding-left:8px;position:relative;' : '';
  const sepLine = isRight ? html`<div style="position:absolute;left:0;top:20%;bottom:20%;width:1px;background:linear-gradient(to bottom,transparent,rgba(255,255,255,0.08) 30%,rgba(255,255,255,0.08) 70%,transparent);"></div>` : nothing;
  return html`
    <div style="display:flex;align-items:center;gap:6px;padding:4px 2px;position:relative;z-index:1;${compact ? 'min-width:0;overflow:hidden;' : 'grid-column:1/-1;'}${sepStyle}">
      ${sepLine}
      <div style="width:22px;height:22px;border-radius:var(--radius-xs);background:${f.isOn ? `${accentRgba}0.1)` : 'var(--s2)'};border:1px solid ${f.isOn ? `${accentRgba}0.15)` : 'var(--b1)'};display:flex;align-items:center;justify-content:center;flex-shrink:0;">
        <ha-icon .icon=${f.icon} style="--mdc-icon-size:13px;color:${f.isOn ? '#818cf8' : 'var(--t3)'};display:flex;align-items:center;justify-content:center;${f.isOn ? `filter:drop-shadow(0 0 4px ${accentRgba}0.4));animation:spin-fan-preview ${f.pct > 50 ? '0.8' : '1.5'}s linear infinite;` : ''}"></ha-icon>
      </div>
      <div style="flex:1;min-width:0;">
        <div style="font-size:10px;font-weight:600;color:var(--t1);overflow:hidden;white-space:nowrap;text-overflow:ellipsis;">${f.name}</div>
        <div style="display:flex;align-items:center;gap:4px;margin-top:1px;">
          <span style="font-size:8px;color:${f.isOn ? `${accentRgba}0.6)` : 'var(--t4)'};">${f.isOn ? `${f.pct}%` : t('fan.off')}</span>
          ${f.isOn ? html`
            <span style="font-size:7px;color:var(--t4);">${t('fan.speed_step', { step: f.step, total: f.total })}</span>
          ` : nothing}
        </div>
      </div>
      <div style="width:6px;height:6px;border-radius:50%;flex-shrink:0;background:${f.isOn ? '#818cf8' : 'var(--t4)'};${f.isOn ? `box-shadow:0 0 6px ${accentRgba}0.4);` : ''}"></div>
    </div>
  `;
}

function renderFanPreviewRows(fans: PreviewFan[], accentRgba: string) {
  const results: unknown[] = [];
  let i = 0;
  while (i < fans.length) {
    const fan = fans[i];
    if (fan.layout === 'compact') {
      const next = i + 1 < fans.length && fans[i + 1].layout === 'compact' ? fans[i + 1] : null;
      if (next) {
        results.push(renderFanPreviewRow(fan, accentRgba, true, false));
        results.push(renderFanPreviewRow(next, accentRgba, true, true));
        i += 2;
      } else {
        results.push(renderFanPreviewRow(fan, accentRgba, false, false));
        i++;
      }
    } else {
      results.push(renderFanPreviewRow(fan, accentRgba, false, false));
      i++;
    }
  }
  return results;
}

// — Component —

export class ConfigTabFan extends BaseConfigTab {
  @state() _fanShowHeader = true;
  @state() _fanRoom = '';
  @state() _fanRoomDropdownOpen = false;
  @state() _fanRoomEntities: FanRoomEntity[] = [];

  // Local drag state
  @state() _dragIdx: number | null = null;
  @state() _dropIdx: number | null = null;
  @state() _dragContext = '';

  protected static override _AUTO_SAVE_KEYS = new Set([
    '_fanShowHeader', '_fanRoomEntities',
  ]);

  // — Lifecycle —

  protected override updated(changedProps: PropertyValues): void {
    super.updated(changedProps);
    this._checkAutoSave(changedProps);
  }

  // — Persistence —

  loadFromConfig(config: Record<string, unknown>): void {
    const c = config as { show_header?: boolean };
    this._fanShowHeader = c.show_header ?? true;
  }

  collectSaveData(): Record<string, unknown> {
    return {
      show_header: this._fanShowHeader,
    };
  }

  async save(): Promise<void> {
    if (!this.backend) return;
    try {
      await this.backend.send('set_fan_config', this.collectSaveData());

      if (this._fanRoom && this._fanRoomEntities.length > 0) {
        let existingHidden: string[] = [];
        let existingOrder: string[] = [];
        let existingLayouts: Record<string, string> = {};
        try {
          const existing = await this.backend.send<{
            hidden_entities: string[];
            entity_order: string[];
            entity_layouts: Record<string, string>;
          } | null>('get_room', { area_id: this._fanRoom });
          if (existing) {
            existingHidden = existing.hidden_entities ?? [];
            existingOrder = existing.entity_order ?? [];
            existingLayouts = existing.entity_layouts ?? {};
          }
        } catch { /* ignore */ }

        const fanEntityIds = new Set(this._fanRoomEntities.map((e) => e.entityId));
        const nonFanHidden = existingHidden.filter((id) => !fanEntityIds.has(id));
        const hiddenFans = this._fanRoomEntities.filter((e) => !e.visible).map((e) => e.entityId);
        const nonFanOrder = existingOrder.filter((id) => !fanEntityIds.has(id));
        const entityOrder = [...nonFanOrder, ...this._fanRoomEntities.map((e) => e.entityId)];

        const layouts: Record<string, string> = { ...existingLayouts };
        for (const e of this._fanRoomEntities) {
          layouts[e.entityId] = e.layout;
        }

        await this.backend.send('set_room', {
          area_id: this._fanRoom,
          hidden_entities: [...nonFanHidden, ...hiddenFans],
          entity_order: entityOrder,
          entity_layouts: layouts,
        });
      }

      this._fireToast(true);
      bus.emit('fan-config-changed', undefined);
      if (this._fanRoom) bus.emit('room-config-changed', { areaId: this._fanRoom });
    } catch {
      this._fireToast(false);
    }
  }

  async reload(): Promise<void> {
    if (!this.backend) return;
    try {
      const result = await this.backend.send<{
        fan_card?: { show_header: boolean };
      }>('get_config');
      if (result?.fan_card) this.loadFromConfig(result.fan_card);
    } catch { /* ignore */ }
    await this._loadRoomFans();
  }

  // — Room loading —

  private async _loadRoomFans(): Promise<void> {
    if (!this.backend || !this._fanRoom || !this.hass) return;
    const targetRoom = this._fanRoom;
    const areaEntities = getAreaEntities(targetRoom, this.hass.entities, this.hass.devices);
    const fanIds = areaEntities
      .filter((e) => e.entity_id.startsWith('fan.'))
      .map((e) => e.entity_id);

    let roomConfig: { hidden_entities?: string[]; entity_order?: string[]; entity_layouts?: Record<string, string> } | null = null;
    try {
      roomConfig = await this.backend.send<{ hidden_entities?: string[]; entity_order?: string[]; entity_layouts?: Record<string, string> } | null>('get_room', { area_id: targetRoom });
    } catch { /* ignore */ }

    if (this._fanRoom !== targetRoom) return;

    const hiddenSet = new Set(roomConfig?.hidden_entities ?? []);
    const order = roomConfig?.entity_order ?? [];
    const entityLayouts = roomConfig?.entity_layouts ?? {};

    const sorted = [...fanIds].sort((a, b) => {
      const ai = order.indexOf(a);
      const bi = order.indexOf(b);
      if (ai !== -1 && bi !== -1) return ai - bi;
      if (ai !== -1) return -1;
      if (bi !== -1) return 1;
      return 0;
    });

    this._fanRoomEntities = sorted.map((id) => {
      const entity = this.hass?.states[id];
      const name = (entity?.attributes?.friendly_name as string) || id.split('.')[1] || id;
      return { entityId: id, name, visible: !hiddenSet.has(id), layout: (entityLayouts[id] as 'full' | 'compact') || 'compact' };
    });
  }

  // — Actions —

  private _selectRoom(areaId: string): void {
    this._fanRoom = areaId;
    this._fanRoomDropdownOpen = false;
    this._loadRoomFans();
  }

  private _toggleEntityVisibility(entityId: string): void {
    this._fanRoomEntities = this._fanRoomEntities.map((e) =>
      e.entityId === entityId ? { ...e, visible: !e.visible } : e,
    );
  }

  private _cycleLayout(entityId: string): void {
    this._fanRoomEntities = this._fanRoomEntities.map((e) =>
      e.entityId === entityId ? { ...e, layout: e.layout === 'full' ? 'compact' : 'full' } : e,
    );
  }

  // — Local drag & drop —

  private _onLocalDragStart(idx: number): void {
    this._dragIdx = idx;
    this._dragContext = 'fans';
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
    if (this._dragIdx === null || this._dragIdx === idx || this._dragContext !== 'fans') {
      this._dragIdx = null;
      this._dropIdx = null;
      return;
    }
    const arr = [...this._fanRoomEntities];
    const [moved] = arr.splice(this._dragIdx, 1);
    arr.splice(idx, 0, moved);
    this._fanRoomEntities = arr;
    this._dragIdx = null;
    this._dropIdx = null;
  }

  // — Auto-select first room on connect —

  override connectedCallback(): void {
    super.connectedCallback();
    if (!this._fanRoom && this.rooms.length > 0) {
      this._fanRoom = this.rooms[0].areaId;
      this._loadRoomFans();
    }
  }

  // — Render —

  renderPreview(): TemplateResult | typeof nothing {
    const roomEntities = this._fanRoomEntities.filter((e) => e.visible);
    const useMock = roomEntities.length === 0 && !this._fanRoom;

    const fans = useMock
      ? [
          { name: 'Ventilateur Salon', isOn: true, pct: 67, step: 2, total: 3, icon: 'mdi:fan', layout: 'compact' as const },
          { name: 'Plafonnier Chambre', isOn: true, pct: 50, step: 3, total: 6, icon: 'mdi:ceiling-fan', layout: 'compact' as const },
          { name: 'Extracteur SdB', isOn: false, pct: 0, step: 0, total: 3, icon: 'mdi:fan', layout: 'compact' as const },
        ]
      : roomEntities.map((e) => {
          const entity = this.hass?.states[e.entityId];
          const isOn = entity?.state === 'on';
          const pct = (entity?.attributes?.percentage as number) ?? 0;
          const pctStep = entity?.attributes?.percentage_step as number | undefined;
          const rawCount = entity?.attributes?.speed_count as number | undefined;
          const speedCount = rawCount ?? (pctStep && pctStep > 0 ? Math.round(100 / pctStep) : 3);
          const step = isOn ? Math.round((pct / 100) * speedCount) : 0;
          return { name: e.name, isOn, pct, step, total: speedCount, icon: 'mdi:fan', layout: e.layout };
        });

    const onCount = fans.filter((f) => f.isOn).length;
    const accentRgba = 'rgba(129,140,248,';

    return html`
      <div class="preview-fan">
        ${this._fanShowHeader ? html`
          <div style="display:flex;align-items:center;justify-content:space-between;padding:0 4px 4px;">
            <div style="display:flex;align-items:center;gap:6px;">
              <span style="font-size:8px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:var(--t4);">${t('fan.title')}</span>
              <span style="font-size:8px;font-weight:600;padding:1px 4px;border-radius:var(--radius-sm);background:${onCount > 0 ? `${accentRgba}0.15)` : 'var(--s2)'};color:${onCount > 0 ? '#818cf8' : 'var(--t3)'};">${onCount}/${fans.length}</span>
            </div>
            <div style="width:28px;height:14px;border-radius:var(--radius-sm);background:${onCount > 0 ? `${accentRgba}0.25)` : 'var(--s2)'};position:relative;">
              <div style="width:10px;height:10px;border-radius:50%;background:${onCount > 0 ? '#818cf8' : 'var(--t4)'};position:absolute;top:2px;${onCount > 0 ? 'right:2px;' : 'left:2px;'}transition:all var(--t-fast);"></div>
            </div>
          </div>
        ` : nothing}
        <div class="preview-fan-card glass" style="padding:8px 10px;display:grid;grid-template-columns:1fr 1fr;gap:0;position:relative;">
          <!-- Tint -->
          <div style="grid-column:1/-1;position:absolute;inset:0;border-radius:inherit;pointer-events:none;background:radial-gradient(ellipse at 50% 50%,#818cf8,transparent 70%);opacity:${fans.length > 0 ? (onCount / fans.length * 0.18).toFixed(3) : '0'};"></div>
          ${fans.length === 0 ? html`
            <div style="grid-column:1/-1;padding:8px;text-align:center;font-size:10px;color:var(--t4);">—</div>
          ` : nothing}
          ${renderFanPreviewRows(fans, accentRgba)}
        </div>
      </div>
    `;
  }

  renderTab(): TemplateResult {
    void this._lang;
    if (!this.hass) return html``;

    const currentRoom = this.rooms.find((r) => r.areaId === this._fanRoom);

    return html`
      <div class="preview-encart">
        <div class="preview-label">${t('config.preview')}</div>
        ${this.renderPreview()}
      </div>

      <div class="tab-panel" id="panel-fan">
        <div class="section-label">${t('config.behavior')}</div>
        <div class="feature-list">
          <button
            class="feature-row"
            role="switch"
            aria-checked=${this._fanShowHeader ? 'true' : 'false'}
            @click=${() => { this._fanShowHeader = !this._fanShowHeader; }}
          >
            <div class="feature-icon">
              <ha-icon .icon=${'mdi:page-layout-header'}></ha-icon>
            </div>
            <div class="feature-text">
              <div class="feature-name">${t('config.fan_show_header')}</div>
              <div class="feature-desc">${t('config.fan_show_header_desc')}</div>
            </div>
            <span
              class="toggle ${this._fanShowHeader ? 'on' : ''}"
            ></span>
          </button>
        </div>

        <!-- Per-room fan config -->
        <div class="section-label">${t('config.fan_room')}</div>
        <div class="section-desc">${t('config.fan_room_desc')}</div>

        <!-- Room selector dropdown -->
        <div class="dropdown ${this._fanRoomDropdownOpen ? 'open' : ''}">
          <button
            class="dropdown-trigger"
            @click=${() => { this._fanRoomDropdownOpen = !this._fanRoomDropdownOpen; }}
            aria-expanded=${this._fanRoomDropdownOpen ? 'true' : 'false'}
            aria-haspopup="listbox"
          >
            <ha-icon .icon=${currentRoom?.icon || 'mdi:home'}></ha-icon>
            <span>${currentRoom?.name || t('common.select')}</span>
            <ha-icon class="arrow" .icon=${'mdi:chevron-down'}></ha-icon>
          </button>
          <div class="dropdown-menu" role="listbox">
            ${this.rooms.map((r) => html`
              <button
                class="dropdown-item ${r.areaId === this._fanRoom ? 'active' : ''}"
                role="option"
                aria-selected=${r.areaId === this._fanRoom ? 'true' : 'false'}
                @click=${() => this._selectRoom(r.areaId)}
              >
                <ha-icon .icon=${r.icon}></ha-icon>
                ${r.name}
              </button>
            `)}
          </div>
        </div>

        ${this._fanRoom ? html`
          ${this._fanRoomEntities.length > 0 ? html`
            <div class="section-label">${t('config.fan_list_title')} (${this._fanRoomEntities.length})</div>
            <div class="section-desc">${t('config.fan_list_banner')}</div>
            <div class="item-list">
              ${this._fanRoomEntities.map((e, idx) => {
                const isDragging = this._dragIdx === idx && this._dragContext === 'fans';
                const isDropTarget = this._dropIdx === idx && this._dragContext === 'fans';
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
                    <div class="item-info">
                      <span class="item-name">${e.name}</span>
                      <span class="item-meta">${e.entityId}</span>
                    </div>
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
                `;
              })}
            </div>
          ` : html`
            <div class="banner">
              <ha-icon .icon=${'mdi:fan-off'}></ha-icon>
              <span>${t('config.fan_no_fans')}</span>
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

try { customElements.define('config-tab-fan', ConfigTabFan); } catch { /* already registered */ }
