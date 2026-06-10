import { html, nothing, type PropertyValues, type TemplateResult } from 'lit';
import { state } from 'lit/decorators.js';
import { t } from '@glass-cards/i18n';
import { bus } from '@glass-cards/event-bus';
import { getAreaEntities } from '@glass-cards/base-card';
import { BaseConfigTab } from '../base-tab';

// — Types —

interface CameraRoomEntity {
  entityId: string;
  name: string;
  visible: boolean;
}

// — Component —

type CameraAspectRatio = 'auto' | '16:9' | '4:3' | '1:1' | '3:4';
const ASPECT_RATIO_OPTIONS: CameraAspectRatio[] = ['auto', '16:9', '4:3', '1:1', '3:4'];

export class ConfigTabCamera extends BaseConfigTab {
  @state() _cameraShowHeader = true;
  @state() _cameraAutoCycle = false;
  @state() _cameraCycleInterval = 10;
  @state() _cameraEntityOrder: string[] = [];
  @state() _cameraHiddenEntities: string[] = [];
  @state() _cameraAspectRatios: Record<string, CameraAspectRatio> = {};

  // Room-mode state
  @state() _cameraRoom = '';
  @state() _cameraRoomEntities: CameraRoomEntity[] = [];

  // Internal drag state for entity reorder
  @state() _dragContext = '';

  protected static override _AUTO_SAVE_KEYS = new Set([
    '_cameraShowHeader', '_cameraAutoCycle', '_cameraCycleInterval', '_cameraEntityOrder', '_cameraHiddenEntities',
    '_cameraAspectRatios', '_cameraRoomEntities',
  ]);

  // — Lifecycle —

  protected override updated(changedProps: PropertyValues): void {
    super.updated(changedProps);
    if (changedProps.has('areaId') && this.areaId) {
      this._cameraRoom = this.areaId;
      void this._withLoading(() => this._loadRoomCameras());
    }
    this._checkAutoSave(changedProps);
  }

  // — Persistence —

  loadFromConfig(config: Record<string, unknown>): void {
    const c = config as {
      show_header?: boolean;
      entity_order?: string[];
      hidden_entities?: string[];
      auto_cycle?: boolean;
      cycle_interval?: number;
      entity_aspect_ratios?: Record<string, CameraAspectRatio>;
    };
    this._cameraShowHeader = c.show_header ?? true;
    this._cameraEntityOrder = c.entity_order ?? [];
    this._cameraHiddenEntities = c.hidden_entities ?? [];
    this._cameraAutoCycle = c.auto_cycle ?? false;
    this._cameraCycleInterval = c.cycle_interval ?? 10;
    this._cameraAspectRatios = c.entity_aspect_ratios ?? {};
    // Merge new cameras into the stored order here, under the _loading window.
    // Doing it from renderTab() mutated an _AUTO_SAVE_KEYS state mid-render and
    // persisted an order the user never asked for on first open.
    this._initCameraEntityOrder();
  }

  collectSaveData(): Record<string, unknown> {
    return {
      show_header: this._cameraShowHeader,
      entity_order: this._cameraEntityOrder,
      hidden_entities: this._cameraHiddenEntities,
      auto_cycle: this._cameraAutoCycle,
      cycle_interval: this._cameraCycleInterval,
      entity_aspect_ratios: this._cameraAspectRatios,
    };
  }

  protected override async _performSave(): Promise<void> {
    await this.backend!.send('set_camera_carousel_config', this.collectSaveData());

    if (this._cameraRoom && this._cameraRoomEntities.length > 0) {
      const cardIds = new Set(this._cameraRoomEntities.map((e) => e.entityId));
      const hiddenIds = this._cameraRoomEntities.filter((e) => !e.visible).map((e) => e.entityId);
      const orderedIds = this._cameraRoomEntities.map((e) => e.entityId);
      await this._saveRoomEntities(this._cameraRoom, cardIds, hiddenIds, orderedIds);
    }

    bus.emit('camera-carousel-config-changed', undefined);
  }

  async reload(): Promise<void> {
    if (!this.backend) return;
    await this._withLoading(async () => {
      try {
        const result = await this.backend!.send<{
          camera_carousel?: {
            show_header?: boolean;
            entity_order?: string[];
            hidden_entities?: string[];
            auto_cycle?: boolean;
            cycle_interval?: number;
            entity_aspect_ratios?: Record<string, CameraAspectRatio>;
          };
        }>('get_config');
        if (result?.camera_carousel) this.loadFromConfig(result.camera_carousel);
      } catch { /* ignore */ }
      await this._loadRoomCameras();
    });
  }

  // — Room loading —

  private async _loadRoomCameras(): Promise<void> {
    if (!this.backend || !this._cameraRoom || !this.hass) return;
    const targetRoom = this._cameraRoom;
    const areaEntities = getAreaEntities(targetRoom, this.hass.entities, this.hass.devices);
    const cameraIds = areaEntities
      .filter((e) => e.entity_id.startsWith('camera.'))
      .map((e) => e.entity_id);

    let roomConfig: { hidden_entities?: string[]; entity_order?: string[] } | null = null;
    try {
      roomConfig = await this.backend.send<{ hidden_entities?: string[]; entity_order?: string[] } | null>('get_room', { area_id: targetRoom });
    } catch { /* ignore */ }

    if (this._cameraRoom !== targetRoom) return;

    const hiddenSet = new Set(roomConfig?.hidden_entities ?? []);
    const order = roomConfig?.entity_order ?? [];

    const sorted = [...cameraIds].sort((a, b) => {
      const ai = order.indexOf(a);
      const bi = order.indexOf(b);
      if (ai !== -1 && bi !== -1) return ai - bi;
      if (ai !== -1) return -1;
      if (bi !== -1) return 1;
      return 0;
    });

    this._cameraRoomEntities = sorted.map((id) => {
      const entity = this.hass?.states[id];
      const name = (entity?.attributes?.friendly_name as string) || id.split('.')[1] || id;
      return { entityId: id, name, visible: !hiddenSet.has(id) };
    });
  }

  // — Room actions —

  private _toggleRoomCameraVisibility(entityId: string): void {
    this._cameraRoomEntities = this._cameraRoomEntities.map((e) =>
      e.entityId === entityId ? { ...e, visible: !e.visible } : e,
    );
  }

  private _onRoomCameraDragStart(idx: number): void {
    this._localDragIdx = idx;
    this._dragContext = 'room_cameras';
  }

  private _onRoomCameraDragOver(idx: number, e: DragEvent): void {
    e.preventDefault();
    if (this._localDragIdx !== null && this._localDragIdx !== idx) this._localDropIdx = idx;
  }

  private _onRoomCameraDragEnd(): void {
    this._localDragIdx = null;
    this._localDropIdx = null;
    this._dragContext = '';
  }

  private _onRoomCameraDrop(idx: number, e: DragEvent): void {
    e.preventDefault();
    if (this._localDragIdx === null || this._localDragIdx === idx || this._dragContext !== 'room_cameras') {
      this._onRoomCameraDragEnd();
      return;
    }
    const arr = [...this._cameraRoomEntities];
    const [moved] = arr.splice(this._localDragIdx, 1);
    arr.splice(idx, 0, moved);
    this._cameraRoomEntities = arr;
    this._onRoomCameraDragEnd();
  }

  // — Helpers —

  private _initCameraEntityOrder(): void {
    if (!this.hass) return;
    const allCameraIds = Object.keys(this.hass.states)
      .filter((id) => id.startsWith('camera.'))
      .sort();
    // Merge: keep existing order for known entities, append new ones at end
    const known = new Set(allCameraIds);
    const ordered = this._cameraEntityOrder.filter((id) => known.has(id));
    const orderedSet = new Set(ordered);
    for (const id of allCameraIds) {
      if (!orderedSet.has(id)) ordered.push(id);
    }
    this._cameraEntityOrder = ordered;
  }

  private _localDragStart(idx: number): void {
    this._localDragIdx = idx;
  }

  private _localDragOver(idx: number, e: DragEvent): void {
    e.preventDefault();
    this._localDropIdx = idx;
  }

  private _localDragLeave(): void {
    this._localDropIdx = null;
  }

  private _localDragEnd(): void {
    this._localDragIdx = null;
    this._localDropIdx = null;
  }

  private _toggleCameraVisible(entityId: string): void {
    const hiddenSet = new Set(this._cameraHiddenEntities);
    if (hiddenSet.has(entityId)) {
      hiddenSet.delete(entityId);
    } else {
      hiddenSet.add(entityId);
    }
    this._cameraHiddenEntities = [...hiddenSet];
  }

  private _setCameraAspectRatio(entityId: string, ratio: CameraAspectRatio): void {
    const next = { ...this._cameraAspectRatios };
    if (ratio === 'auto') {
      delete next[entityId];
    } else {
      next[entityId] = ratio;
    }
    this._cameraAspectRatios = next;
  }

  private _aspectLabel(ratio: CameraAspectRatio): string {
    switch (ratio) {
      case '16:9': return t('config.camera_aspect_16_9');
      case '4:3':  return t('config.camera_aspect_4_3');
      case '1:1':  return t('config.camera_aspect_1_1');
      case '3:4':  return t('config.camera_aspect_3_4');
      default:     return t('config.camera_aspect_auto');
    }
  }

  private _onDropCameraEntity(idx: number, e: DragEvent): void {
    e.preventDefault();
    if (this._localDragIdx === null || this._localDragIdx === idx) {
      this._localDragEnd();
      return;
    }
    const arr = [...this._cameraEntityOrder];
    const [moved] = arr.splice(this._localDragIdx, 1);
    arr.splice(idx, 0, moved);
    this._cameraEntityOrder = arr;
    this._localDragEnd();
  }

  // — Render —

  renderTab(): TemplateResult {
    void this._lang;

    if (this.areaId) return this._renderRoomTab();

    // Pure fallback if the order is still empty (e.g. hass arrived after the
    // config) — display only, no state mutation in the render path.
    const entityIds = this._cameraEntityOrder.length > 0
      ? this._cameraEntityOrder
      : Object.keys(this.hass?.states ?? {}).filter((id) => id.startsWith('camera.')).sort();
    const hiddenSet = new Set(this._cameraHiddenEntities);
    const visibleCount = entityIds.length - entityIds.filter((id) => hiddenSet.has(id)).length;

    return html`
      <div class="tab-panel camera-tab" id="panel-camera_carousel">
        <glass-camera-carousel-card .hass=${this.hass} .areaId=${this.areaId} config-preview></glass-camera-carousel-card>
        <div class="cfg-info">
          <ha-icon .icon=${'mdi:information-outline'}></ha-icon>
          <span>${t('config.camera_dashboard_info')}</span>
        </div>

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
              nameKey: 'config.camera_show_header',
              descKey: 'config.camera_show_header_desc',
              on: this._cameraShowHeader,
              onToggle: () => { this._cameraShowHeader = !this._cameraShowHeader; },
            })}
            ${this._renderFeatureRow({
              icon: 'mdi:autorenew',
              nameKey: 'config.camera_auto_cycle',
              descKey: 'config.camera_auto_cycle_desc',
              on: this._cameraAutoCycle,
              onToggle: () => { this._cameraAutoCycle = !this._cameraAutoCycle; },
            })}
          </div>
          ${this._cameraAutoCycle ? html`
            <div class="feature-list">
              <div class="feature-row static-row">
                <div class="feature-icon">
                  <ha-icon .icon=${'mdi:timer-outline'}></ha-icon>
                </div>
                <div class="feature-text">
                  <div class="feature-name">${t('config.camera_cycle_interval')}</div>
                  <div class="feature-desc">${t('config.camera_cycle_interval_desc')}</div>
                </div>
                <input
                  class="input cycle-interval-input"
                  type="number"
                  min="3"
                  max="60"
                  .value=${String(this._cameraCycleInterval)}
                  @change=${(e: Event) => {
                    const val = parseInt((e.target as HTMLInputElement).value, 10);
                    if (!isNaN(val) && val >= 3 && val <= 60) {
                      this._cameraCycleInterval = val;
                    }
                  }}
                />
              </div>
            </div>
          ` : nothing}
        </section>

        <section class="cfg-section">
          <header class="cfg-section-head">
            <span class="cfg-section-num">2</span>
            <div class="cfg-section-text">
              <span class="section-label">${t('config.camera_entity_order')}</span>
              <span class="section-desc">${t('config.camera_entity_order_desc')}</span>
            </div>
            ${entityIds.length > 0 ? html`
              <span class="cfg-section-count" aria-label="${t('common.count_visible', { count: visibleCount, total: entityIds.length })}">
                ${visibleCount}/${entityIds.length}
              </span>
            ` : nothing}
          </header>

          ${entityIds.length === 0 ? html`
            <glass-empty-state variant="inline" .icon=${'mdi:cctv'} .title=${t('config.camera_no_cameras')}></glass-empty-state>
          ` : html`
            <div class="item-list">
              ${entityIds.map((entityId, idx) => {
                const isDragging = this._localDragIdx === idx;
                const isDropTarget = this._localDropIdx === idx;
                const isVisible = !hiddenSet.has(entityId);
                const entity = this.hass?.states[entityId];
                const name = (entity?.attributes?.friendly_name as string) || entityId.split('.')[1];
                const rowClasses = [
                  'item-row',
                  isDragging ? 'dragging' : '',
                  isDropTarget ? 'drop-target' : '',
                  !isVisible ? 'disabled' : '',
                ].filter(Boolean).join(' ');
                return html`
                  <div class="item-card">
                    <div
                      class=${rowClasses}
                      draggable="true"
                      @dragstart=${() => this._localDragStart(idx)}
                      @dragover=${(ev: DragEvent) => this._localDragOver(idx, ev)}
                      @dragleave=${() => this._localDragLeave()}
                      @drop=${(ev: DragEvent) => this._onDropCameraEntity(idx, ev)}
                      @dragend=${() => this._localDragEnd()}
                    >
                      <glass-drag-handle></glass-drag-handle>
                      <div class="item-info">
                        <span class="item-name">${name}</span>
                        <span class="item-meta">${entityId}</span>
                      </div>
                      <glass-toggle
                        .checked=${isVisible}
                        aria-label="${isVisible ? t('common.hide') : t('common.show')} ${name}"
                        @glass-toggle-change=${() => this._toggleCameraVisible(entityId)}
                      ></glass-toggle>
                    </div>
                  </div>
                `;
              })}
            </div>
          `}
        </section>

        <section class="cfg-section">
          <header class="cfg-section-head">
            <span class="cfg-section-num">3</span>
            <div class="cfg-section-text">
              <span class="section-label">${t('config.camera_aspect_title')}</span>
              <span class="section-desc">${t('config.camera_aspect_desc')}</span>
            </div>
          </header>

          ${entityIds.length === 0 ? html`
            <glass-empty-state variant="inline" .icon=${'mdi:image-aspect-ratio'} .title=${t('config.camera_no_cameras')}></glass-empty-state>
          ` : html`
            <div class="item-list">
              ${entityIds.map((entityId) => {
                const entity = this.hass?.states[entityId];
                const name = (entity?.attributes?.friendly_name as string) || entityId.split('.')[1];
                const current: CameraAspectRatio = this._cameraAspectRatios[entityId] ?? 'auto';
                return html`
                  <div class="item-card aspect-card">
                    <div class="item-row static-row">
                      <div class="feature-icon">
                        <ha-icon .icon=${'mdi:image-aspect-ratio'}></ha-icon>
                      </div>
                      <div class="item-info">
                        <span class="item-name">${name}</span>
                        <span class="item-meta">${entityId}</span>
                      </div>
                      <glass-dropdown
                        class="aspect-dropdown"
                        .items=${ASPECT_RATIO_OPTIONS.map((opt) => ({ value: opt, label: this._aspectLabel(opt) }))}
                        .value=${current}
                        aria-label=${t('config.camera_aspect_aria', { name })}
                        @glass-dropdown-change=${(e: CustomEvent<{ value: string }>) =>
                          this._setCameraAspectRatio(entityId, e.detail.value as CameraAspectRatio)}
                      ></glass-dropdown>
                    </div>
                  </div>
                `;
              })}
            </div>
          `}
        </section>

        <div class="save-bar">
          <glass-button variant="ghost" @click=${() => this.reload()}>${t('common.reset')}</glass-button>
        </div>
      </div>
    `;
  }

  // — Room render —

  private _renderRoomTab(): TemplateResult {
    const entities = this._cameraRoomEntities;
    return html`
      <div class="tab-panel" id="panel-camera_carousel-room">
        <glass-camera-carousel-card .hass=${this.hass} .areaId=${this.areaId} config-preview></glass-camera-carousel-card>

        ${entities.length > 0 ? html`
          <div class="section-label">${t('config.camera_list_title')} (${entities.length})</div>
          <div class="section-desc">${t('config.camera_list_banner')}</div>
          <div class="item-list">
            ${entities.map((e, idx) => {
              const isDragging = this._localDragIdx === idx && this._dragContext === 'room_cameras';
              const isDropTarget = this._localDropIdx === idx && this._dragContext === 'room_cameras';
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
                    @dragstart=${() => this._onRoomCameraDragStart(idx)}
                    @dragover=${(ev: DragEvent) => this._onRoomCameraDragOver(idx, ev)}
                    @dragleave=${() => { this._localDropIdx = null; }}
                    @drop=${(ev: DragEvent) => this._onRoomCameraDrop(idx, ev)}
                    @dragend=${() => this._onRoomCameraDragEnd()}
                  >
                    <glass-drag-handle></glass-drag-handle>
                    <div class="item-info">
                      <span class="item-name">${e.name}</span>
                      <span class="item-meta">${e.entityId}</span>
                    </div>
                    <glass-toggle
                      .checked=${e.visible}
                      aria-label="${e.visible ? t('common.hide') : t('common.show')} ${e.name}"
                      @glass-toggle-change=${() => this._toggleRoomCameraVisibility(e.entityId)}
                    ></glass-toggle>
                  </div>
                </div>
              `;
            })}
          </div>
        ` : html`
          <div class="banner">
            <ha-icon .icon=${'mdi:cctv'}></ha-icon>
            <span>${t('config.camera_no_cameras')}</span>
          </div>
        `}
      </div>
    `;
  }
}

try { customElements.define('config-tab-camera', ConfigTabCamera); } catch { /* already registered */ }
