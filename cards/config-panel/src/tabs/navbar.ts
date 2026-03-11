import { html, nothing } from 'lit';
import { t } from '@glass-cards/i18n';
import type { GlassConfigPanel } from '../index';
import { ROOM_ICONS, DEFAULT_TEMP_HIGH, DEFAULT_TEMP_LOW, DEFAULT_HUMIDITY_THRESHOLD } from '../types';
import type { RoomEntry } from '../types';

export function renderNavbarPreview(self: GlassConfigPanel) {
  // Only show visible rooms in preview (like the real navbar)
  const visibleRooms = [...self._rooms.filter((r) => r.visible)];
  if (self._autoSort) {
    visibleRooms.sort((a, b) => {
      const aLit = a.lightsOn > 0 ? 0 : 1;
      const bLit = b.lightsOn > 0 ? 0 : 1;
      return aLit - bLit;
    });
  }
  return html`
    <div class="preview-navbar">
      ${visibleRooms.map((room, idx) => {
        const hasLight = self._showLights && room.lightsOn > 0;
        const hasHumidity = self._showHumidity && room.humidityValue !== null && room.humidityValue >= self._humidityThreshold;
        const hasMusic = self._showMedia && room.mediaPlaying;
        const hasTempHot = self._showTemperature && room.tempValue !== null && room.tempValue >= self._tempHigh;
        const hasTempCold = self._showTemperature && room.tempValue !== null && !hasTempHot && room.tempValue <= self._tempLow;

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

export function renderNavbarTab(self: GlassConfigPanel) {
  return html`
    <div class="tab-panel" id="panel-navbar">

      ${self._emptyRooms.length > 0 ? html`
        <div class="section-label">${t('config.navbar_empty_rooms')}</div>
        <div class="section-desc">
          ${t('config.navbar_empty_rooms_desc')}
        </div>
        <div class="item-list empty-rooms">
          ${self._emptyRooms.map((room) => html`
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
          @click=${() => { self._autoSort = !self._autoSort; }}
        >
          <div class="feature-icon">
            <ha-icon .icon=${'mdi:sort-bool-ascending'}></ha-icon>
          </div>
          <div class="feature-text">
            <div class="feature-name">${t('config.navbar_auto_sort')}</div>
            <div class="feature-desc">${t('config.navbar_auto_sort_desc')}</div>
          </div>
          <span
            class="toggle ${self._autoSort ? 'on' : ''}"
            role="switch"
            aria-checked=${self._autoSort ? 'true' : 'false'}
          ></span>
        </button>
      </div>

      <div class="banner">
        <ha-icon .icon=${'mdi:information-outline'}></ha-icon>
        <span>${t('config.navbar_rooms_banner')}</span>
      </div>
      <div class="section-label">${t('config.navbar_visible_rooms')}</div>
      <div class="item-list">
        ${self._rooms.map((room, idx) => self._renderRoomRow(room, idx))}
      </div>

      <div class="icon-picker-fold ${self._iconPickerRoom ? 'open' : ''}">
        <div class="icon-picker-inner">
          <div class="section-label">
            ${t('config.navbar_icon_label', { name: self._rooms.find((r) => r.areaId === self._iconPickerRoom)?.name || '' })}
          </div>
          <div class="icon-picker-grid">
            ${ROOM_ICONS.map(
              (icon) => html`
                <button
                  class="icon-pick ${self._rooms.find((r) => r.areaId === self._iconPickerRoom)?.icon === icon ? 'selected' : ''}"
                  @click=${() => self._iconPickerRoom && self._setRoomIcon(self._iconPickerRoom, icon)}
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
            lights: self._showLights,
            temperature: self._showTemperature,
            humidity: self._showHumidity,
            media: self._showMedia,
          };
          const checked = stateMap[feat.key];
          return html`
            <button
              class="feature-row"
              @click=${() => {
                if (feat.key === 'lights') self._showLights = !self._showLights;
                else if (feat.key === 'temperature') self._showTemperature = !self._showTemperature;
                else if (feat.key === 'humidity') self._showHumidity = !self._showHumidity;
                else self._showMedia = !self._showMedia;
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
                role="switch"
                aria-checked=${checked ? 'true' : 'false'}
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
            .value=${String(self._tempHigh)}
            @change=${(e: Event) => { self._tempHigh = parseFloat((e.target as HTMLInputElement).value) || DEFAULT_TEMP_HIGH; }}
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
            .value=${String(self._tempLow)}
            @change=${(e: Event) => { self._tempLow = parseFloat((e.target as HTMLInputElement).value) || DEFAULT_TEMP_LOW; }}
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
            .value=${String(self._humidityThreshold)}
            @change=${(e: Event) => { self._humidityThreshold = parseFloat((e.target as HTMLInputElement).value) || DEFAULT_HUMIDITY_THRESHOLD; }}
            aria-label="${t('config.navbar_humidity_threshold')}"
          />
          <span class="threshold-unit">%</span>
        </div>
      </div>

      <div class="save-bar">
        <button class="btn btn-ghost" @click=${() => self._reset()}>${t('common.reset')}</button>
        <button
          class="btn btn-accent"
          @click=${() => self._save()}
          ?disabled=${self._saving}
        >
          ${self._saving ? t('common.saving') : t('common.save')}
        </button>
      </div>
    </div>
  `;
}

export function renderRoomRow(self: GlassConfigPanel, room: RoomEntry, idx: number) {
  const isDragging = self._dragIdx === idx && self._dragContext === 'rooms';
  const isDropTarget = self._dropIdx === idx && self._dragContext === 'rooms';
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
      @dragstart=${() => self._onDragStart(idx, 'rooms')}
      @dragover=${(e: DragEvent) => self._onDragOver(idx, e)}
      @dragleave=${() => self._onDragLeave()}
      @drop=${(e: DragEvent) => self._onDropGeneric(idx, e)}
      @dragend=${() => self._onDragEnd()}
    >
      <span class="drag-handle">
        <ha-icon .icon=${'mdi:drag'}></ha-icon>
      </span>
      <button
        class="room-icon-btn"
        @click=${() => self._openIconPicker(room.areaId)}
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
        @click=${() => self._toggleRoomVisible(room.areaId)}
        role="switch"
        aria-checked=${room.visible ? 'true' : 'false'}
        aria-label="${room.visible ? t('common.hide') : t('common.show')} ${room.name}"
      ></button>
    </div>
  `;
}

export function toggleRoomVisible(self: GlassConfigPanel, areaId: string) {
  const toggled = self._rooms.map((r) =>
    r.areaId === areaId ? { ...r, visible: !r.visible } : r,
  );
  const visible = toggled.filter((r) => r.visible);
  const hidden = toggled.filter((r) => !r.visible);
  self._rooms = [...visible, ...hidden];
}

export function openIconPicker(self: GlassConfigPanel, areaId: string) {
  self._iconPickerRoom = self._iconPickerRoom === areaId ? null : areaId;
}

export function setRoomIcon(self: GlassConfigPanel, areaId: string, icon: string) {
  self._rooms = self._rooms.map((r) =>
    r.areaId === areaId ? { ...r, icon } : r,
  );
  self._iconPickerRoom = null;
}

export function selectRoom(self: GlassConfigPanel, areaId: string) {
  self._selectedRoom = areaId;
  self._dropdownOpen = false;
  self._loadRoomCards();
}

export function goBack(_self: GlassConfigPanel) {
  history.back();
}
