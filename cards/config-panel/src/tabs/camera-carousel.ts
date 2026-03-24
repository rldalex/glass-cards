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
  @state() private _localDragIdx: number | null = null;
  @state() private _localDropIdx: number | null = null;

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

  async save(): Promise<void> {
    if (!this.backend) return;
    try {
      await this.backend.send('set_camera_carousel_config', this.collectSaveData());
      this._fireToast(true);
      bus.emit('camera-carousel-config-changed', undefined);
    } catch {
      this._fireToast(false);
    }
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

  renderPreview(): TemplateResult | typeof nothing {
    const camColor = 'rgba(96,165,250,';

    // Mock cameras for preview
    const mockCams = [
      { name: 'Entrée', state: 'streaming', icon: 'mdi:cctv', ai: ['person'] },
      { name: 'Jardin', state: 'recording', icon: 'mdi:cctv', ai: ['vehicle'] },
      { name: 'Garage', state: 'idle', icon: 'mdi:webcam', ai: [] },
    ];

    const current = mockCams[0];
    const isLive = current.state !== 'idle';

    return html`
      <div class="pw-cam-wrap">
        <!-- Viewport -->
        <div class="pw-cam-frame">
          <div class="pw-cam-bg">
            <!-- Top overlay -->
            <div class="pw-cam-overlay-top">
              <div class="pw-cam-label">
                <ha-icon .icon=${'mdi:cctv'}></ha-icon>
                ${current.name}
                <span class="pw-cam-rec">
                  <span class="pw-cam-rec-dot"></span> REC
                </span>
              </div>
            </div>
            <!-- Bottom overlay -->
            ${current.ai.length > 0 ? html`
              <div class="pw-cam-overlay-bottom">
                <div class="pw-cam-ai-list">
                  ${current.ai.map((ai) => html`
                    <div class="pw-cam-ai-badge" style="background:${camColor}0.15);border:1px solid ${camColor}0.2);">
                      <ha-icon .icon=${'mdi:human'}></ha-icon>
                      ${ai}
                    </div>
                  `)}
                </div>
              </div>
            ` : nothing}
            <!-- Nav arrows -->
            <div class="pw-cam-arrow pw-cam-arrow--left">
              <ha-icon .icon=${'mdi:chevron-left'}></ha-icon>
            </div>
            <div class="pw-cam-arrow pw-cam-arrow--right">
              <ha-icon .icon=${'mdi:chevron-right'}></ha-icon>
            </div>
          </div>
        </div>

        <!-- Dots -->
        <div class="pw-cam-dots">
          <div class="pw-cam-dot pw-cam-dot--active" style="box-shadow:0 0 6px ${camColor}0.4);"></div>
          <div class="pw-cam-dot pw-cam-dot--rec"></div>
          <div class="pw-cam-dot pw-cam-dot--idle"></div>
        </div>

        <!-- Info bar -->
        <div class="pw-cam-info">
          <div class="pw-cam-icon" style="background:${camColor}0.1);border:1px solid ${camColor}0.15);">
            <ha-icon .icon=${'mdi:cctv'}></ha-icon>
          </div>
          <div class="pw-cam-detail">
            <div class="pw-cam-name">${current.name}</div>
            <div class="pw-cam-status-row">
              <span class="pw-cam-status" style="color:${isLive ? `${camColor}0.6)` : 'var(--t3)'};">${isLive ? 'En direct' : 'Veille'}</span>
              ${current.ai.length > 0 ? html`
                <div class="pw-cam-ai-mini">
                  <div class="pw-cam-ai-dot" style="background:${camColor}0.12);">
                    <ha-icon .icon=${'mdi:human'}></ha-icon>
                  </div>
                </div>
              ` : nothing}
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="pw-cam-actions">
          ${['mdi:power', 'mdi:camera', 'mdi:record-circle', 'mdi:motion-sensor'].map((icon, i) => html`
            <div class="pw-cam-action ${i === 0 ? '' : 'pw-cam-action--default'}" style="${i === 0 ? `border:1px solid ${camColor}0.15);background:${camColor}0.1);color:var(--c-info);` : ''}">
              <ha-icon .icon=${icon}></ha-icon>
            </div>
          `)}
        </div>
      </div>
    `;
  }

  renderTab(): TemplateResult {
    void this._lang;

    // Ensure entity order is initialized
    if (this.hass && this._cameraEntityOrder.length === 0) {
      this._initCameraEntityOrder();
    }

    return html`
      <div class="preview-encart">
        <div class="preview-label">${t('config.preview')}</div>
        ${this.renderPreview()}
      </div>

      <div class="tab-panel" id="panel-camera_carousel">
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
