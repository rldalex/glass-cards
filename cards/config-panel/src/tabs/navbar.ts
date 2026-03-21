import { html, nothing, type PropertyValues, type TemplateResult } from 'lit';
import { state } from 'lit/decorators.js';
import { t } from '@glass-cards/i18n';
import { bus } from '@glass-cards/event-bus';
import { BaseConfigTab } from '../base-tab';
import { ROOM_ICONS, DEFAULT_TEMP_HIGH, DEFAULT_TEMP_LOW, DEFAULT_HUMIDITY_THRESHOLD } from '../types';
import type { RoomEntry } from '../types';

export class ConfigTabNavbar extends BaseConfigTab {
  @state() _showLights = true;
  @state() _showTemperature = true;
  @state() _showHumidity = true;
  @state() _showMedia = true;
  @state() _autoSort = true;
  @state() _tempHigh = DEFAULT_TEMP_HIGH;
  @state() _tempLow = DEFAULT_TEMP_LOW;
  @state() _humidityThreshold = DEFAULT_HUMIDITY_THRESHOLD;
  @state() _iconPickerRoom: string | null = null;

  // Local drag state for rooms context
  @state() private _localDragIdx: number | null = null;
  @state() private _localDropIdx: number | null = null;

  // Track initial icons for dirty-checking on save
  private _initialIcons = new Map<string, string | null>();

  protected static override _AUTO_SAVE_KEYS = new Set([
    '_showLights', '_showTemperature', '_showHumidity', '_showMedia',
    '_autoSort', '_tempHigh', '_tempLow', '_humidityThreshold',
  ]);

  // — Lifecycle —

  protected override updated(changedProps: PropertyValues): void {
    super.updated(changedProps);
    this._checkAutoSave(changedProps);
    // Track initial icons when rooms are set
    if (changedProps.has('rooms') && this.rooms.length > 0 && this._initialIcons.size === 0) {
      for (const room of this.rooms) {
        this._initialIcons.set(room.areaId, room.icon);
      }
    }
  }

  // — Persistence —

  loadFromConfig(config: Record<string, unknown>): void {
    const c = config as {
      show_lights?: boolean;
      show_temperature?: boolean;
      show_humidity?: boolean;
      show_media?: boolean;
      auto_sort?: boolean;
      temp_high?: number;
      temp_low?: number;
      humidity_threshold?: number;
    };
    this._showLights = c.show_lights ?? true;
    this._showTemperature = c.show_temperature ?? true;
    this._showHumidity = c.show_humidity ?? true;
    this._showMedia = c.show_media ?? true;
    this._autoSort = c.auto_sort ?? true;
    this._tempHigh = c.temp_high ?? DEFAULT_TEMP_HIGH;
    this._tempLow = c.temp_low ?? DEFAULT_TEMP_LOW;
    this._humidityThreshold = c.humidity_threshold ?? DEFAULT_HUMIDITY_THRESHOLD;
  }

  collectSaveData(): Record<string, unknown> {
    return {
      room_order: this.rooms.filter((r) => r.visible).map((r) => r.areaId),
      hidden_rooms: this.rooms.filter((r) => !r.visible).map((r) => r.areaId),
      show_lights: this._showLights,
      show_temperature: this._showTemperature,
      show_humidity: this._showHumidity,
      show_media: this._showMedia,
      auto_sort: this._autoSort,
      temp_high: this._tempHigh,
      temp_low: this._tempLow,
      humidity_threshold: this._humidityThreshold,
    };
  }

  async save(): Promise<void> {
    if (!this.backend) return;
    try {
      await this.backend.send('set_navbar', this.collectSaveData());
      // Save only changed room icons in parallel
      const backend = this.backend;
      const iconSaves = this.rooms
        .filter((room) => room.icon !== this._initialIcons.get(room.areaId))
        .map((room) => {
          const hass = this.hass;
          const area = hass?.areas[room.areaId];
          const haIcon = area?.icon || 'mdi:home';
          const iconToSave = room.icon === haIcon ? null : room.icon;
          return backend.send('set_room', {
            area_id: room.areaId,
            icon: iconToSave,
          });
        });
      if (iconSaves.length > 0) await Promise.all(iconSaves);
      this._fireToast(true);
      bus.emit('navbar-config-changed', undefined);
    } catch {
      this._fireToast(false);
    }
  }

  async reload(): Promise<void> {
    if (!this.backend) return;
    try {
      const result = await this.backend.send<{
        navbar: {
          show_lights: boolean; show_temperature: boolean; show_humidity: boolean; show_media: boolean;
          auto_sort: boolean; temp_high: number; temp_low: number; humidity_threshold: number;
        };
      }>('get_config');
      if (result?.navbar) this.loadFromConfig(result.navbar);
    } catch { /* ignore */ }
  }

  // — Room actions —

  private _toggleRoomVisible(areaId: string): void {
    const toggled = this.rooms.map((r) =>
      r.areaId === areaId ? { ...r, visible: !r.visible } : r,
    );
    const visible = toggled.filter((r) => r.visible);
    const hidden = toggled.filter((r) => !r.visible);
    this._updateRooms([...visible, ...hidden]);
  }

  private _openIconPicker(areaId: string): void {
    this._iconPickerRoom = this._iconPickerRoom === areaId ? null : areaId;
  }

  private _setRoomIcon(areaId: string, icon: string): void {
    this._updateRooms(this.rooms.map((r) =>
      r.areaId === areaId ? { ...r, icon } : r,
    ));
    this._iconPickerRoom = null;
  }

  /** Notify parent of rooms change via event (rooms live in parent). */
  private _updateRooms(newRooms: RoomEntry[]): void {
    this.dispatchEvent(new CustomEvent('rooms-changed', { bubbles: true, composed: true, detail: { rooms: newRooms } }));
    this._fireDirty();
  }

  // — Local drag-drop for rooms —

  private _onLocalDragStart(idx: number): void {
    this._localDragIdx = idx;
  }

  private _onLocalDragOver(idx: number, e: DragEvent): void {
    e.preventDefault();
    if (this._localDragIdx === null || this._localDragIdx === idx) return;
    this._localDropIdx = idx;
  }

  private _onLocalDragLeave(): void {
    this._localDropIdx = null;
  }

  private _onLocalDrop(idx: number, e: DragEvent): void {
    e.preventDefault();
    if (this._localDragIdx === null || this._localDragIdx === idx) {
      this._localDragIdx = null;
      this._localDropIdx = null;
      return;
    }
    const arr = [...this.rooms];
    const [moved] = arr.splice(this._localDragIdx, 1);
    arr.splice(idx, 0, moved);
    this._updateRooms(arr);
    this._localDragIdx = null;
    this._localDropIdx = null;
  }

  private _onLocalDragEnd(): void {
    this._localDragIdx = null;
    this._localDropIdx = null;
  }

  // — Render helpers —

  private _renderRoomRow(room: RoomEntry, idx: number): TemplateResult {
    const isDragging = this._localDragIdx === idx;
    const isDropTarget = this._localDropIdx === idx;
    const classes = [
      'item-row',
      !room.visible ? 'disabled' : '',
      isDragging ? 'dragging' : '',
      isDropTarget ? 'drop-target' : '',
    ]
      .filter(Boolean)
      .join(' ');

    return html`
      <div
        class=${classes}
        draggable="true"
        @dragstart=${() => this._onLocalDragStart(idx)}
        @dragover=${(e: DragEvent) => this._onLocalDragOver(idx, e)}
        @dragleave=${() => this._onLocalDragLeave()}
        @drop=${(e: DragEvent) => this._onLocalDrop(idx, e)}
        @dragend=${() => this._onLocalDragEnd()}
      >
        <span class="drag-handle">
          <ha-icon .icon=${'mdi:drag'}></ha-icon>
        </span>
        <button
          class="room-icon-btn"
          @click=${() => this._openIconPicker(room.areaId)}
          aria-label="${t('config.navbar_change_icon_aria', { name: room.name })}"
        >
          <ha-icon .icon=${room.icon}></ha-icon>
        </button>
        <div class="item-info">
          <span class="item-name">${room.name}</span>
          <span class="item-meta">${room.entityCount} ${t('common.entities')}</span>
        </div>
        <button
          class="toggle ${room.visible ? 'on' : ''}"
          @click=${() => this._toggleRoomVisible(room.areaId)}
          role="switch"
          aria-checked=${room.visible ? 'true' : 'false'}
          aria-label="${room.visible ? t('common.hide') : t('common.show')} ${room.name}"
        ></button>
      </div>
    `;
  }

  // — Render —

  renderPreview(): TemplateResult | typeof nothing {
    const visibleRooms = [...this.rooms.filter((r) => r.visible)];
    if (this._autoSort) {
      visibleRooms.sort((a, b) => {
        const aLit = a.lightsOn > 0 ? 0 : 1;
        const bLit = b.lightsOn > 0 ? 0 : 1;
        return aLit - bLit;
      });
    }
    return html`
      <div class="preview-navbar">
        ${visibleRooms.map((room, idx) => {
          const hasLight = this._showLights && room.lightsOn > 0;
          const hasHumidity = this._showHumidity && room.humidityValue !== null && room.humidityValue >= this._humidityThreshold;
          const hasMusic = this._showMedia && room.mediaPlaying;
          const hasTempHot = this._showTemperature && room.tempValue !== null && room.tempValue >= this._tempHigh;
          const hasTempCold = this._showTemperature && room.tempValue !== null && !hasTempHot && room.tempValue <= this._tempLow;

          const classes = [
            'preview-nav-item',
            idx === 0 ? 'active-preview' : '',
            hasLight ? 'has-light' : '',
            hasHumidity ? 'has-humidity' : '',
            hasMusic ? 'has-music' : '',
            hasTempHot ? 'has-temp-hot' : '',
            hasTempCold ? 'has-temp-cold' : '',
          ].filter(Boolean).join(' ');

          return html`
            <div class=${classes}>
              ${(hasTempHot || hasTempCold) ? html`
                <span class="preview-temp-badge">
                  <ha-icon .icon=${hasTempHot ? 'mdi:thermometer-high' : 'mdi:snowflake'}></ha-icon>
                </span>
              ` : nothing}
              <ha-icon .icon=${room.icon}></ha-icon>
              <div class="preview-nav-label"><span>${room.name}</span></div>
            </div>
          `;
        })}
      </div>
    `;
  }

  renderTab(): TemplateResult {
    void this._lang;
    return html`
      <div class="preview-encart">
        <div class="preview-label">${t('config.preview')}</div>
        ${this.renderPreview()}
      </div>

      <div class="tab-panel" id="panel-navbar">

        ${this.emptyRooms.length > 0 ? html`
          <div class="section-label">${t('config.navbar_empty_rooms')}</div>
          <div class="section-desc">
            ${t('config.navbar_empty_rooms_desc')}
          </div>
          <div class="item-list empty-rooms">
            ${this.emptyRooms.map((room) => html`
              <div class="item-row disabled">
                <span class="drag-handle">
                  <ha-icon .icon=${'mdi:drag'}></ha-icon>
                </span>
                <div class="room-icon-btn">
                  <ha-icon .icon=${room.icon}></ha-icon>
                </div>
                <div class="item-info">
                  <span class="item-name">${room.name}</span>
                  <span class="item-meta">0 ${t('common.entities')}</span>
                </div>
              </div>
            `)}
          </div>
        ` : nothing}

        <div class="section-label">${t('config.navbar_behavior')}</div>
        <div class="feature-list">
          <button
            class="feature-row"
            role="switch"
            aria-checked=${this._autoSort ? 'true' : 'false'}
            @click=${() => { this._autoSort = !this._autoSort; }}
          >
            <div class="feature-icon">
              <ha-icon .icon=${'mdi:sort-bool-ascending'}></ha-icon>
            </div>
            <div class="feature-text">
              <div class="feature-name">${t('config.navbar_auto_sort')}</div>
              <div class="feature-desc">${t('config.navbar_auto_sort_desc')}</div>
            </div>
            <span
              class="toggle ${this._autoSort ? 'on' : ''}"
            ></span>
          </button>
        </div>

        <div class="banner">
          <ha-icon .icon=${'mdi:information-outline'}></ha-icon>
          <span>${t('config.navbar_rooms_banner')}</span>
        </div>
        <div class="section-label">${t('config.navbar_visible_rooms')}</div>
        <div class="item-list">
          ${this.rooms.map((room, idx) => this._renderRoomRow(room, idx))}
        </div>

        <div class="icon-picker-fold ${this._iconPickerRoom ? 'open' : ''}">
          <div class="icon-picker-inner">
            <div class="section-label">
              ${t('config.navbar_icon_label', { name: this.rooms.find((r) => r.areaId === this._iconPickerRoom)?.name || '' })}
            </div>
            <div class="icon-picker-grid">
              ${ROOM_ICONS.map(
                (icon) => html`
                  <button
                    class="icon-pick ${this.rooms.find((r) => r.areaId === this._iconPickerRoom)?.icon === icon ? 'selected' : ''}"
                    @click=${() => this._iconPickerRoom && this._setRoomIcon(this._iconPickerRoom, icon)}
                    aria-label="${t('config.navbar_choose_icon')}"
                  >
                    <ha-icon .icon=${icon}></ha-icon>
                  </button>
                `,
              )}
            </div>
          </div>
        </div>

        <div class="section-label">${t('config.navbar_indicators')}</div>
        <div class="section-desc">${t('config.navbar_indicators_desc')}</div>
        <div class="feature-list">
          ${([
            { key: 'lights' as const, icon: 'mdi:lightbulb', nameKey: 'config.navbar_ind_lights' as const, descKey: 'config.navbar_ind_lights_desc' as const },
            { key: 'temperature' as const, icon: 'mdi:thermometer', nameKey: 'config.navbar_ind_temp' as const, descKey: 'config.navbar_ind_temp_desc' as const },
            { key: 'humidity' as const, icon: 'mdi:water-percent', nameKey: 'config.navbar_ind_humidity' as const, descKey: 'config.navbar_ind_humidity_desc' as const },
            { key: 'media' as const, icon: 'mdi:music', nameKey: 'config.navbar_ind_media' as const, descKey: 'config.navbar_ind_media_desc' as const },
          ] as const).map((feat) => {
            const stateMap = {
              lights: this._showLights,
              temperature: this._showTemperature,
              humidity: this._showHumidity,
              media: this._showMedia,
            };
            const checked = stateMap[feat.key];
            return html`
              <button
                class="feature-row"
                role="switch"
                aria-checked=${checked ? 'true' : 'false'}
                @click=${() => {
                  if (feat.key === 'lights') this._showLights = !this._showLights;
                  else if (feat.key === 'temperature') this._showTemperature = !this._showTemperature;
                  else if (feat.key === 'humidity') this._showHumidity = !this._showHumidity;
                  else this._showMedia = !this._showMedia;
                }}
              >
                <div class="feature-icon">
                  <ha-icon .icon=${feat.icon}></ha-icon>
                </div>
                <div class="feature-text">
                  <div class="feature-name">${t(feat.nameKey)}</div>
                  <div class="feature-desc">${t(feat.descKey)}</div>
                </div>
                <span
                  class="toggle ${checked ? 'on' : ''}"
                ></span>
              </button>
            `;
          })}
        </div>

        <div class="section-label">${t('config.navbar_thresholds')}</div>
        <div class="section-desc">${t('config.navbar_thresholds_desc')}</div>
        <div class="threshold-list">
          <div class="threshold-row">
            <div class="threshold-icon hot">
              <ha-icon .icon=${'mdi:thermometer-high'}></ha-icon>
            </div>
            <span class="threshold-label">${t('config.navbar_temp_high')}</span>
            <input
              class="threshold-input"
              type="number"
              step="0.5"
              .value=${String(this._tempHigh)}
              @change=${(e: Event) => { const v = parseFloat((e.target as HTMLInputElement).value); this._tempHigh = isNaN(v) ? DEFAULT_TEMP_HIGH : v; }}
              aria-label="${t('config.navbar_temp_high')}"
            />
            <span class="threshold-unit">°C</span>
          </div>
          <div class="threshold-row">
            <div class="threshold-icon cold">
              <ha-icon .icon=${'mdi:snowflake'}></ha-icon>
            </div>
            <span class="threshold-label">${t('config.navbar_temp_low')}</span>
            <input
              class="threshold-input"
              type="number"
              step="0.5"
              .value=${String(this._tempLow)}
              @change=${(e: Event) => { const v = parseFloat((e.target as HTMLInputElement).value); this._tempLow = isNaN(v) ? DEFAULT_TEMP_LOW : v; }}
              aria-label="${t('config.navbar_temp_low')}"
            />
            <span class="threshold-unit">°C</span>
          </div>
          <div class="threshold-row">
            <div class="threshold-icon humidity">
              <ha-icon .icon=${'mdi:water-percent'}></ha-icon>
            </div>
            <span class="threshold-label">${t('config.navbar_humidity_threshold')}</span>
            <input
              class="threshold-input"
              type="number"
              step="1"
              .value=${String(this._humidityThreshold)}
              @change=${(e: Event) => { const v = parseFloat((e.target as HTMLInputElement).value); this._humidityThreshold = isNaN(v) ? DEFAULT_HUMIDITY_THRESHOLD : v; }}
              aria-label="${t('config.navbar_humidity_threshold')}"
            />
            <span class="threshold-unit">%</span>
          </div>
        </div>

        <div class="save-bar">
          <button class="btn btn-ghost" @click=${() => this.reload()}>${t('common.reset')}</button>
        </div>
      </div>
    `;
  }
}

try { customElements.define('config-tab-navbar', ConfigTabNavbar); } catch { /* already registered */ }
