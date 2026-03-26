import { LitElement, html, nothing, type TemplateResult, type PropertyValues } from 'lit';
import { property, state } from 'lit/decorators.js';
import { t } from '@glass-cards/i18n';
import { bus } from '@glass-cards/event-bus';
import type { HomeAssistant, BackendService } from '@glass-cards/base-card';
import type { RoomEntry } from '../types';
import { createSaveScheduler } from '../utils/save-scheduler';

export class ConfigRoomList extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @property({ attribute: false }) rooms: RoomEntry[] = [];
  @property({ attribute: false }) backend?: BackendService;

  @state() private _dragIdx: number | null = null;
  @state() private _dropIdx: number | null = null;
  @state() private _popupAutoClose = 0;
  private _configLoaded = false;
  private _saveScheduler = createSaveScheduler();

  protected createRenderRoot() { return this; }

  override updated(changedProps: PropertyValues): void {
    super.updated(changedProps);
    if (!this._configLoaded && this.backend) {
      this._configLoaded = true;
      this._loadConfig();
    }
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._saveScheduler.cancel();
  }

  private async _loadConfig(): Promise<void> {
    if (!this.backend) return;
    try {
      const result = await this.backend.send<{ navbar?: { popup_auto_close?: number } }>('get_config');
      this._popupAutoClose = result?.navbar?.popup_auto_close ?? 0;
    } catch { /* backend not available */ }
  }

  private _onAutoCloseChange(e: Event): void {
    this._popupAutoClose = parseInt((e.target as HTMLInputElement).value, 10);
    this._saveScheduler.schedule(() => this._saveAutoClose());
  }

  private async _saveAutoClose(): Promise<void> {
    if (!this.backend) return;
    try {
      await this.backend.send('set_navbar', { popup_auto_close: this._popupAutoClose });
      bus.emit('navbar-config-changed', undefined);
      this.dispatchEvent(new CustomEvent('tab-toast', { detail: { success: true }, bubbles: true, composed: true }));
    } catch {
      this.dispatchEvent(new CustomEvent('tab-toast', { detail: { success: false }, bubbles: true, composed: true }));
    }
  }

  // ── Drag & drop (HTML5 API — same pattern as dashboard-view) ──

  private _onDragStart(idx: number): void { this._dragIdx = idx; }
  private _onDragOver(idx: number, e: DragEvent): void { e.preventDefault(); this._dropIdx = idx; }
  private _onDragLeave(): void { this._dropIdx = null; }
  private _onDragEnd(): void { this._dragIdx = null; this._dropIdx = null; }

  private _onDrop(idx: number, e: DragEvent): void {
    e.preventDefault();
    if (this._dragIdx !== null && this._dragIdx !== idx) {
      const arr = [...this.rooms];
      const [moved] = arr.splice(this._dragIdx, 1);
      arr.splice(idx, 0, moved);
      this.dispatchEvent(new CustomEvent('rooms-reordered', {
        detail: { rooms: arr },
        bubbles: true, composed: true,
      }));
    }
    this._dragIdx = null;
    this._dropIdx = null;
  }

  // ── Visibility toggle ──

  private _toggleVisibility(room: RoomEntry, e: Event) {
    e.stopPropagation();
    e.preventDefault();
    this.dispatchEvent(new CustomEvent('room-visibility-toggle', {
      detail: { areaId: room.areaId, visible: !room.visible },
      bubbles: true, composed: true,
    }));
  }

  // ── Render ──

  protected render(): TemplateResult {
    if (!this.rooms.length) {
      return html`<div class="empty-state">${t('config.no_rooms')}</div>`;
    }

    let visibleIdx = 0;

    return html`
      <div class="section-label">${t('config.popup_auto_close')}</div>
      <div class="section-desc">${t('config.popup_auto_close_desc')}</div>
      <div class="feature-list">
        <div class="range-row" style="padding:0.375rem 0.75rem;">
          <div class="feature-icon" style="background:rgba(var(--rgb-accent),0.08);border-color:rgba(var(--rgb-accent),0.12);">
            <ha-icon .icon=${'mdi:timer-outline'} style="color:var(--c-accent);"></ha-icon>
          </div>
          <input
            type="range"
            class="range-input"
            min="0"
            max="120"
            step="1"
            .value=${String(this._popupAutoClose)}
            @input=${(e: Event) => this._onAutoCloseChange(e)}
          />
          <span class="range-value" style="min-width:3.5rem;font-size:var(--fz-sm);font-weight:500;color:var(--t3);">${this._popupAutoClose === 0 ? t('config.popup_auto_close_off') : `${this._popupAutoClose}s`}</span>
        </div>
      </div>

      <div class="room-grid">
        ${this.rooms.map((room, i) => {
          const isDragging = this._dragIdx === i;
          const isDropTarget = this._dropIdx === i && this._dragIdx !== null && this._dragIdx !== i;
          if (room.visible) visibleIdx++;
          const order = room.visible ? visibleIdx : 0;

          return html`
            <div
              class="room-card dash-card ${!room.visible ? 'off' : ''} ${isDragging ? 'dragging' : ''} ${isDropTarget ? 'drop-target' : ''}"
              draggable="true"
              @dragstart=${() => this._onDragStart(i)}
              @dragover=${(e: DragEvent) => this._onDragOver(i, e)}
              @dragleave=${() => this._onDragLeave()}
              @drop=${(e: DragEvent) => this._onDrop(i, e)}
              @dragend=${() => this._onDragEnd()}
              @click=${() => this.dispatchEvent(new CustomEvent('room-select', { detail: room.areaId, bubbles: true, composed: true }))}
            >
              ${room.visible ? html`<span class="dash-order">${order}</span>` : nothing}
              <ha-icon .icon=${room.icon || 'mdi:home'}></ha-icon>
              <span class="room-name">${room.name}</span>
              <div class="dash-toggle-row">
                <span class="dash-toggle-label">${room.visible ? t('common.enabled') : t('common.disabled')}</span>
                <button
                  class="dash-toggle ${room.visible ? 'on' : ''}"
                  @click=${(e: Event) => this._toggleVisibility(room, e)}
                  aria-label=${room.visible ? t('config.hide_room') : t('config.show_room')}
                ></button>
              </div>
              <span class="dash-drag-hint"><ha-icon .icon=${'mdi:drag'}></ha-icon></span>
            </div>
          `;
        })}
      </div>
    `;
  }
}

customElements.define('config-room-list', ConfigRoomList);
