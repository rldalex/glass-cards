import { html, nothing } from 'lit';
import { t } from '@glass-cards/i18n';
import type { GlassConfigPanel } from '../index';
import type { CardEntry, SceneEntry } from '../types';

export function renderPopupPreview(self: GlassConfigPanel) {
  const room = self._rooms.find((r) => r.areaId === self._selectedRoom);
  if (!room) return html`<div class="preview-empty">${t('config.popup_select_room')}</div>`;

  const hasScenes = self._scenes.length > 0;
  const visibleScenes = self._scenes.filter((s) => s.visible);
  const iconClasses = [
    'preview-popup-icon-box',
    room.lightsOn > 0 ? 'has-light' : '',
    room.mediaPlaying ? 'has-music' : '',
  ].filter(Boolean).join(' ');

  return html`
    <div class="preview-popup">
      <div class="preview-popup-header">
        <div class="preview-popup-header-left">
          <div class=${iconClasses}>
            <ha-icon .icon=${room.icon}></ha-icon>
          </div>
          <div class="preview-popup-scene-dash ${hasScenes ? 'visible' : ''}"></div>
        </div>
        <div class="preview-popup-info">
          <div class="preview-popup-name">${room.name}</div>
          <div class="preview-popup-meta">
            ${room.temperature ? html`<span>${room.temperature}</span>` : nothing}
            ${room.humidity ? html`<span>${room.humidity}</span>` : nothing}
          </div>
        </div>
        <div class="preview-popup-close">
          <ha-icon .icon=${'mdi:close'}></ha-icon>
        </div>
      </div>

      ${visibleScenes.length > 0 ? html`
        <div class="preview-popup-scenes">
          ${visibleScenes.map(
            (s) => html`
              <span class="preview-scene-chip">${s.name}</span>
            `,
          )}
        </div>
      ` : nothing}

      <div class="preview-popup-cards">
        ${self._cards.filter((c) => c.visible).map(
          (card) => html`
            <div class="preview-card-slot">
              <ha-icon .icon=${card.icon}></ha-icon>
              <span class="preview-card-slot-name">${card.nameKey ? t(card.nameKey) : card.id}</span>
              <span class="preview-card-slot-count">${card.count}</span>
            </div>
          `,
        )}
      </div>
    </div>
  `;
}

export function renderPopupTab(self: GlassConfigPanel) {
  const selectedRoomObj = self._rooms.find((r) => r.areaId === self._selectedRoom);

  return html`
    <div class="tab-panel" id="panel-popup">
      <div class="section-label">${t('config.popup_room')}</div>
      <div class="section-desc">
        ${t('config.popup_room_desc')}
      </div>
      <div class="dropdown ${self._dropdownOpen ? 'open' : ''}">
        <button
          class="dropdown-trigger"
          @click=${() => { if (!self._dropdownOpen) self._popupRoomSearch = ''; self._dropdownOpen = !self._dropdownOpen; }}
          aria-expanded=${self._dropdownOpen ? 'true' : 'false'}
          aria-haspopup="listbox"
        >
          <ha-icon .icon=${selectedRoomObj?.icon || 'mdi:home'}></ha-icon>
          <span>${selectedRoomObj?.name || t('common.select')}</span>
          <ha-icon class="arrow" .icon=${'mdi:chevron-down'}></ha-icon>
        </button>
        <div class="dropdown-menu" role="listbox">
          <input
            class="dropdown-search"
            type="text"
            placeholder=${t('config.search_entity')}
            .value=${self._popupRoomSearch}
            @input=${(e: InputEvent) => { self._popupRoomSearch = (e.target as HTMLInputElement).value; self.requestUpdate(); }}
            @click=${(e: Event) => e.stopPropagation()}
          />
          ${self._rooms
            .filter((room) => !self._popupRoomSearch || room.name.toLowerCase().includes(self._popupRoomSearch.toLowerCase()))
            .map(
            (room) => html`
              <button
                class="dropdown-item ${room.areaId === self._selectedRoom ? 'active' : ''}"
                role="option"
                aria-selected=${room.areaId === self._selectedRoom ? 'true' : 'false'}
                @click=${() => self._selectRoom(room.areaId)}
              >
                <ha-icon .icon=${room.icon}></ha-icon>
                ${room.name}
              </button>
            `,
          )}
        </div>
      </div>

      <div class="section-label">${t('config.popup_internal_cards')}</div>
      <div class="section-desc">
        ${t('config.popup_internal_cards_desc')}
      </div>
      <div class="item-list">
        ${self._cards.map((card, idx) => self._renderCardRow(card, idx))}
      </div>

      ${self._scenes.length > 0 ? html`
        <div class="section-label">${t('config.popup_scenes')} (${self._scenes.length})</div>
        <div class="section-desc">
          ${t('config.popup_scenes_desc')}
        </div>
        <div class="item-list">
          ${self._scenes.map((scene, idx) => self._renderSceneRow(scene, idx))}
        </div>
      ` : nothing}

      <div class="save-bar">
        <button class="btn btn-ghost" @click=${() => self._loadConfig()}>${t('common.reset')}</button>
      </div>
    </div>
  `;
}

export function renderCardRow(self: GlassConfigPanel, card: CardEntry, idx: number) {
  const isDragging = self._dragIdx === idx && self._dragContext === 'cards';
  const isDropTarget = self._dropIdx === idx && self._dragContext === 'cards';
  const classes = [
    'item-row card-row',
    !card.visible ? 'disabled' : '',
    isDragging ? 'dragging' : '',
    isDropTarget ? 'drop-target' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return html`
    <div
      class=${classes}
      draggable="true"
      @dragstart=${() => self._onDragStart(idx, 'cards')}
      @dragover=${(e: DragEvent) => self._onDragOver(idx, e)}
      @dragleave=${() => self._onDragLeave()}
      @drop=${(e: DragEvent) => self._onDropGeneric(idx, e)}
      @dragend=${() => self._onDragEnd()}
    >
      <span class="drag-handle">
        <ha-icon .icon=${'mdi:drag'}></ha-icon>
      </span>
      <div class="card-icon-box">
        <ha-icon .icon=${card.icon}></ha-icon>
      </div>
      <div class="item-info">
        <span class="item-name">${card.nameKey ? t(card.nameKey) : card.id}</span>
        <span class="item-meta">${card.descKey ? t(card.descKey) : ''}</span>
      </div>
      <span class="card-count">${card.count}</span>
      <button
        class="toggle ${card.visible ? 'on' : ''}"
        @click=${() => self._toggleCardVisible(card.id)}
        role="switch"
        aria-checked=${card.visible ? 'true' : 'false'}
        aria-label="${card.visible ? t('common.hide') : t('common.show')} ${card.nameKey ? t(card.nameKey) : card.id}"
      ></button>
    </div>
  `;
}

export function renderSceneRow(self: GlassConfigPanel, scene: SceneEntry, idx: number) {
  const isDragging = self._dragIdx === idx && self._dragContext === 'scenes';
  const isDropTarget = self._dropIdx === idx && self._dragContext === 'scenes';
  const classes = [
    'item-row',
    !scene.visible ? 'disabled' : '',
    isDragging ? 'dragging' : '',
    isDropTarget ? 'drop-target' : '',
  ].filter(Boolean).join(' ');

  return html`
    <div
      class=${classes}
      draggable="true"
      @dragstart=${() => self._onDragStart(idx, 'scenes')}
      @dragover=${(e: DragEvent) => self._onDragOver(idx, e)}
      @dragleave=${() => self._onDragLeave()}
      @drop=${(e: DragEvent) => self._onDropGeneric(idx, e)}
      @dragend=${() => self._onDragEnd()}
    >
      <span class="drag-handle">
        <ha-icon .icon=${'mdi:drag'}></ha-icon>
      </span>
      <div class="card-icon-box">
        <ha-icon .icon=${'mdi:palette'}></ha-icon>
      </div>
      <div class="item-info">
        <span class="item-name">${scene.name}</span>
        <span class="item-meta">${scene.entityId}</span>
      </div>
      <button
        class="toggle ${scene.visible ? 'on' : ''}"
        @click=${() => self._toggleSceneVisible(scene.entityId)}
        role="switch"
        aria-checked=${scene.visible ? 'true' : 'false'}
        aria-label="${scene.visible ? t('common.hide') : t('common.show')} ${scene.name}"
      ></button>
    </div>
  `;
}

export function toggleCardVisible(self: GlassConfigPanel, id: string) {
  self._cards = self._cards.map((c) =>
    c.id === id ? { ...c, visible: !c.visible } : c,
  );
}

export function toggleSceneVisible(self: GlassConfigPanel, entityId: string) {
  self._scenes = self._scenes.map((s) =>
    s.entityId === entityId ? { ...s, visible: !s.visible } : s,
  );
}
