import { html, nothing, type PropertyValues, type TemplateResult } from 'lit';
import { state } from 'lit/decorators.js';
import { t } from '@glass-cards/i18n';
import { bus } from '@glass-cards/event-bus';
import { BaseConfigTab } from '../base-tab';

// — Component —

export class ConfigTabCamera extends BaseConfigTab {
  @state() _cameraShowHeader = true;
  @state() _cameraAutoCycle = false;
  @state() _cameraCycleInterval = 10;
  @state() _cameraEntityOrder: string[] = [];

  // Internal drag state for entity reorder
  @state() protected override _localDragIdx: number | null = null;
  @state() protected override _localDropIdx: number | null = null;

  protected static override _AUTO_SAVE_KEYS = new Set([
    '_cameraShowHeader', '_cameraAutoCycle', '_cameraCycleInterval', '_cameraEntityOrder',
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
      entity_order?: string[];
      auto_cycle?: boolean;
      cycle_interval?: number;
    };
    this._cameraShowHeader = c.show_header ?? true;
    this._cameraEntityOrder = c.entity_order ?? [];
    this._cameraAutoCycle = c.auto_cycle ?? false;
    this._cameraCycleInterval = c.cycle_interval ?? 10;
  }

  collectSaveData(): Record<string, unknown> {
    return {
      show_header: this._cameraShowHeader,
      entity_order: this._cameraEntityOrder,
      auto_cycle: this._cameraAutoCycle,
      cycle_interval: this._cameraCycleInterval,
    };
  }

  protected override async _performSave(): Promise<void> {
    await this.backend!.send('set_camera_carousel_config', this.collectSaveData());
    bus.emit('camera-carousel-config-changed', undefined);
  }

  async reload(): Promise<void> {
    if (!this.backend) return;
    try {
      const result = await this.backend.send<{
        camera_carousel?: {
          show_header?: boolean;
          entity_order?: string[];
          auto_cycle?: boolean;
          cycle_interval?: number;
        };
      }>('get_config');
      if (result?.camera_carousel) this.loadFromConfig(result.camera_carousel);
    } catch { /* ignore */ }
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

    // Ensure entity order is initialized
    if (this.hass && this._cameraEntityOrder.length === 0) {
      this._initCameraEntityOrder();
    }

    return html`
      <div class="tab-panel" id="panel-camera_carousel">
        <glass-camera-carousel-card .hass=${this.hass} .areaId=${this.areaId} config-preview></glass-camera-carousel-card>
        <div class="section-label">${t('config.behavior')}</div>
        <div class="feature-list">
          <button
            class="feature-row"
            role="switch"
            aria-checked=${this._cameraShowHeader ? 'true' : 'false'}
            @click=${() => { this._cameraShowHeader = !this._cameraShowHeader; }}
          >
            <div class="feature-icon">
              <ha-icon .icon=${'mdi:page-layout-header'}></ha-icon>
            </div>
            <div class="feature-text">
              <div class="feature-name">${t('config.camera_show_header')}</div>
              <div class="feature-desc">${t('config.camera_show_header_desc')}</div>
            </div>
            <span class="toggle ${this._cameraShowHeader ? 'on' : ''}"></span>
          </button>
          <button
            class="feature-row"
            role="switch"
            aria-checked=${this._cameraAutoCycle ? 'true' : 'false'}
            @click=${() => { this._cameraAutoCycle = !this._cameraAutoCycle; }}
          >
            <div class="feature-icon">
              <ha-icon .icon=${'mdi:autorenew'}></ha-icon>
            </div>
            <div class="feature-text">
              <div class="feature-name">${t('config.camera_auto_cycle')}</div>
              <div class="feature-desc">${t('config.camera_auto_cycle_desc')}</div>
            </div>
            <span class="toggle ${this._cameraAutoCycle ? 'on' : ''}"></span>
          </button>
        </div>

        ${this._cameraAutoCycle ? html`
          <div class="feature-list">
            <div class="feature-row" style="pointer-events:none;">
              <div class="feature-icon">
                <ha-icon .icon=${'mdi:timer-outline'}></ha-icon>
              </div>
              <div class="feature-text">
                <div class="feature-name">${t('config.camera_cycle_interval')}</div>
                <div class="feature-desc">${t('config.camera_cycle_interval_desc')}</div>
              </div>
              <input class="input" type="number" min="3" max="60" style="width:60px;pointer-events:auto;text-align:center;"
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

        <!-- Camera entity order -->
        ${this._cameraEntityOrder.length > 0 ? html`
          <div class="section-label">${t('config.camera_entity_order')} (${this._cameraEntityOrder.length})</div>
          <div class="section-desc">${t('config.camera_entity_order_desc')}</div>
          <div class="item-list">
            ${this._cameraEntityOrder.map((entityId, idx) => {
              const isDragging = this._localDragIdx === idx;
              const isDropTarget = this._localDropIdx === idx;
              const entity = this.hass?.states[entityId];
              const name = (entity?.attributes?.friendly_name as string) || entityId.split('.')[1];
              const rowClasses = [
                'item-row',
                isDragging ? 'dragging' : '',
                isDropTarget ? 'drop-target' : '',
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
                    <span class="drag-handle">
                      <ha-icon .icon=${'mdi:drag'}></ha-icon>
                    </span>
                    <div class="item-info">
                      <span class="item-name">${name}</span>
                      <span class="item-meta">${entityId}</span>
                    </div>
                  </div>
                </div>
              `;
            })}
          </div>
        ` : nothing}

        <!-- Save / Reset -->
        <div class="save-bar">
          <button class="btn btn-ghost" @click=${() => this.reload()}>${t('common.reset')}</button>
        </div>
      </div>
    `;
  }
}

try { customElements.define('config-tab-camera', ConfigTabCamera); } catch { /* already registered */ }
