import { html, nothing, type PropertyValues, type TemplateResult } from 'lit';
import { state } from 'lit/decorators.js';
import { t } from '@glass-cards/i18n';
import { bus } from '@glass-cards/event-bus';
import { getAreaEntities } from '@glass-cards/base-card';
import { BaseConfigTab } from '../base-tab';

// — Types —

interface FanRoomEntity {
  entityId: string; name: string; visible: boolean; layout: 'full' | 'compact';
}

// — Component —

export class ConfigTabFan extends BaseConfigTab {
  @state() _fanShowHeader = true;
  @state() _fanRoom = '';
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
    if (changedProps.has('areaId') && this.areaId) {
      this._fanRoom = this.areaId;
      void this._loadRoomFans();
    }
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

  protected override async _performSave(): Promise<void> {
    await this.backend!.send('set_fan_config', this.collectSaveData());

    if (this._fanRoom && this._fanRoomEntities.length > 0) {
      const cardIds = new Set(this._fanRoomEntities.map((e) => e.entityId));
      const hiddenIds = this._fanRoomEntities.filter((e) => !e.visible).map((e) => e.entityId);
      const orderedIds = this._fanRoomEntities.map((e) => e.entityId);
      const layouts: Record<string, string> = {};
      for (const e of this._fanRoomEntities) {
        layouts[e.entityId] = e.layout;
      }
      await this._saveRoomEntities(this._fanRoom, cardIds, hiddenIds, orderedIds, layouts);
    }

    bus.emit('fan-config-changed', undefined);
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

  protected override _onLocalDragStart(idx: number): void {
    this._dragIdx = idx;
    this._dragContext = 'fans';
  }

  protected override _onLocalDragOver(idx: number, e: DragEvent): void {
    e.preventDefault();
    this._dropIdx = idx;
  }

  protected override _onLocalDragLeave(): void {
    this._dropIdx = null;
  }

  protected override _onLocalDragEnd(): void {
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

  // — Render —

  renderTab(): TemplateResult {
    void this._lang;
    if (!this.hass) return html``;

    return html`
      <div class="tab-panel" id="panel-fan">
        <glass-fan-card .hass=${this.hass} .areaId=${this.areaId} config-preview></glass-fan-card>
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
