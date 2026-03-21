import { html, nothing, type PropertyValues, type TemplateResult } from 'lit';
import { state } from 'lit/decorators.js';
import { t } from '@glass-cards/i18n';
import { bus } from '@glass-cards/event-bus';
import { getAreaEntities } from '@glass-cards/base-card';
import { BaseConfigTab } from '../base-tab';
import type { CardEntry, SceneEntry } from '../types';
import {
  DEFAULT_CARD_ORDER, IMPLEMENTED_CARDS, CARD_ICONS,
  getCardMeta,
} from '../types';

// — Component —

export class ConfigTabPopup extends BaseConfigTab {
  @state() _cards: CardEntry[] = [];
  @state() _scenes: SceneEntry[] = [];
  @state() _popupDropdownOpen = false;
  @state() _selectedRoom = '';
  _popupRoomSearch = '';

  // Internal drag state
  @state() _localDragIdx: number | null = null;
  @state() _localDropIdx: number | null = null;
  @state() _localDragContext: 'cards' | 'scenes' | null = null;

  private _saving = false;
  _mounted = false;

  protected static override _AUTO_SAVE_KEYS = new Set([
    '_cards', '_scenes',
  ]);

  // — Lifecycle —

  connectedCallback(): void {
    super.connectedCallback();
    this._mounted = true;
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._mounted = false;
  }

  protected override updated(changedProps: PropertyValues): void {
    super.updated(changedProps);
    // Auto-select first room when rooms arrive and none selected
    if (changedProps.has('rooms') && this.rooms.length > 0 && !this._selectedRoom) {
      this._selectedRoom = this.rooms[0].areaId;
      this._loadRoomCards();
    }
    this._checkAutoSave(changedProps);
  }

  // — Persistence —

  loadFromConfig(_config: Record<string, unknown>): void {
    // Popup config is room-specific, loaded via _loadRoomCards() on room selection
    // Nothing to load from the global config slice
  }

  collectSaveData(): Record<string, unknown> {
    return {
      area_id: this._selectedRoom,
      card_order: this._cards.filter((c) => c.visible).map((c) => c.id),
      hidden_scenes: this._scenes.filter((s) => !s.visible).map((s) => s.entityId),
      scene_order: this._scenes.map((s) => s.entityId),
    };
  }

  async save(): Promise<void> {
    if (!this.backend || this._saving || !this._selectedRoom) return;
    this._saving = true;
    try {
      await this.backend.send('set_room', this.collectSaveData());
      if (!this._mounted) return;
      this._fireToast(true);
      bus.emit('room-config-changed', { areaId: this._selectedRoom });
    } catch {
      this._fireToast(false);
    } finally {
      this._saving = false;
    }
  }

  async reload(): Promise<void> {
    await this._loadRoomCards();
  }

  // — Room selection —

  private _selectRoom(areaId: string): void {
    this._selectedRoom = areaId;
    this._popupDropdownOpen = false;
    this._popupRoomSearch = '';
    this._loadRoomCards();
  }

  // — Load room cards & scenes —

  private async _loadRoomCards(): Promise<void> {
    if (!this.hass || !this._selectedRoom) {
      this._cards = [];
      this._scenes = [];
      return;
    }

    const targetRoom = this._selectedRoom;
    const entities = getAreaEntities(
      targetRoom,
      this.hass.entities,
      this.hass.devices,
    );

    // Load room config from backend
    let storedOrder: string[] | null = null;
    let hiddenEntities = new Set<string>();
    let hiddenScenes = new Set<string>();
    let sceneOrder: string[] = [];
    try {
      if (!this.backend) throw new Error('No backend');
      const result = await this.backend.send<{
        card_order: string[];
        hidden_entities: string[];
        hidden_scenes: string[];
        scene_order: string[];
        visible?: boolean;
      } | null>('get_room', { area_id: targetRoom });
      if (this._selectedRoom !== targetRoom) return;
      if (result) {
        storedOrder = result.card_order.length > 0 ? result.card_order : null;
        hiddenEntities = new Set(result.hidden_entities);
        hiddenScenes = new Set(result.hidden_scenes ?? []);
        sceneOrder = result.scene_order ?? [];
      }
    } catch {
      // Backend not available
    }

    // Build scenes list
    const hass = this.hass;
    const sceneEntities = entities.filter((e) => e.entity_id.startsWith('scene.'));
    const sceneOrderMap = new Map<string, number>();
    sceneOrder.forEach((id, i) => sceneOrderMap.set(id, i));

    const scenes: SceneEntry[] = sceneEntities.map((e) => {
      const state = hass.states[e.entity_id];
      return {
        entityId: e.entity_id,
        name: (state?.attributes.friendly_name as string) || e.entity_id.split('.')[1],
        visible: !hiddenScenes.has(e.entity_id),
      };
    });

    scenes.sort((a, b) => {
      const aIdx = sceneOrderMap.get(a.entityId);
      const bIdx = sceneOrderMap.get(b.entityId);
      if (aIdx !== undefined && bIdx !== undefined) return aIdx - bIdx;
      if (aIdx !== undefined) return -1;
      if (bIdx !== undefined) return 1;
      return a.name.localeCompare(b.name);
    });

    this._scenes = scenes;

    // Count visible entities per domain (subtract hidden_entities)
    const domainCounts = new Map<string, number>();
    for (const e of entities) {
      if (hiddenEntities.has(e.entity_id)) continue;
      const d = e.entity_id.split('.')[0];
      domainCounts.set(d, (domainCounts.get(d) || 0) + 1);
    }

    // Build ordered list: stored order first, then any extra domains with entities
    const orderedIds = storedOrder ? [...storedOrder] : [...DEFAULT_CARD_ORDER];
    const orderedSet = new Set(orderedIds);

    // Add domains that have entities but aren't in the stored order
    for (const domain of domainCounts.keys()) {
      if (!orderedSet.has(domain) && CARD_ICONS[domain]) {
        orderedIds.push(domain);
      }
    }

    this._cards = orderedIds
      .filter((id) => {
        // Only show domains that have entities AND an implemented card
        return (domainCounts.get(id) || 0) > 0 && IMPLEMENTED_CARDS.has(id);
      })
      .map((id) => {
        const meta = getCardMeta(id);
        const count = domainCounts.get(id) || 0;
        return {
          id,
          nameKey: meta.nameKey,
          icon: meta.icon,
          descKey: meta.descKey,
          count,
          visible: storedOrder ? storedOrder.includes(id) : count > 0,
        };
      });
  }

  // — Toggle visibility —

  private _toggleCardVisible(id: string): void {
    this._cards = this._cards.map((c) =>
      c.id === id ? { ...c, visible: !c.visible } : c,
    );
  }

  private _toggleSceneVisible(entityId: string): void {
    this._scenes = this._scenes.map((s) =>
      s.entityId === entityId ? { ...s, visible: !s.visible } : s,
    );
  }

  // — Drag & Drop (internal) —

  private _onLocalDragStart(idx: number, context: 'cards' | 'scenes'): void {
    this._localDragIdx = idx;
    this._localDragContext = context;
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
    if (this._localDragContext === 'cards') {
      const arr = [...this._cards];
      const [moved] = arr.splice(this._localDragIdx, 1);
      arr.splice(idx, 0, moved);
      this._cards = arr;
    } else if (this._localDragContext === 'scenes') {
      const arr = [...this._scenes];
      const [moved] = arr.splice(this._localDragIdx, 1);
      arr.splice(idx, 0, moved);
      this._scenes = arr;
    }
    this._localDragIdx = null;
    this._localDropIdx = null;
  }

  private _onLocalDragEnd(): void {
    this._localDragIdx = null;
    this._localDropIdx = null;
    this._localDragContext = null;
  }

  // — Render helpers —

  private _renderCardRow(card: CardEntry, idx: number): TemplateResult {
    const isDragging = this._localDragIdx === idx && this._localDragContext === 'cards';
    const isDropTarget = this._localDropIdx === idx && this._localDragContext === 'cards';
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
        @dragstart=${() => this._onLocalDragStart(idx, 'cards')}
        @dragover=${(e: DragEvent) => this._onLocalDragOver(idx, e)}
        @dragleave=${() => this._onLocalDragLeave()}
        @drop=${(e: DragEvent) => this._onLocalDrop(idx, e)}
        @dragend=${() => this._onLocalDragEnd()}
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
          @click=${() => this._toggleCardVisible(card.id)}
          role="switch"
          aria-checked=${card.visible ? 'true' : 'false'}
          aria-label="${card.visible ? t('common.hide') : t('common.show')} ${card.nameKey ? t(card.nameKey) : card.id}"
        ></button>
      </div>
    `;
  }

  private _renderSceneRow(scene: SceneEntry, idx: number): TemplateResult {
    const isDragging = this._localDragIdx === idx && this._localDragContext === 'scenes';
    const isDropTarget = this._localDropIdx === idx && this._localDragContext === 'scenes';
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
        @dragstart=${() => this._onLocalDragStart(idx, 'scenes')}
        @dragover=${(e: DragEvent) => this._onLocalDragOver(idx, e)}
        @dragleave=${() => this._onLocalDragLeave()}
        @drop=${(e: DragEvent) => this._onLocalDrop(idx, e)}
        @dragend=${() => this._onLocalDragEnd()}
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
          @click=${() => this._toggleSceneVisible(scene.entityId)}
          role="switch"
          aria-checked=${scene.visible ? 'true' : 'false'}
          aria-label="${scene.visible ? t('common.hide') : t('common.show')} ${scene.name}"
        ></button>
      </div>
    `;
  }

  // — Render —

  renderPreview(): TemplateResult | typeof nothing {
    const room = this.rooms.find((r) => r.areaId === this._selectedRoom);
    if (!room) return html`<div class="preview-empty">${t('config.popup_select_room')}</div>`;

    const hasScenes = this._scenes.length > 0;
    const visibleScenes = this._scenes.filter((s) => s.visible);
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
          ${this._cards.filter((c) => c.visible).map(
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

  renderTab(): TemplateResult {
    void this._lang;
    const selectedRoomObj = this.rooms.find((r) => r.areaId === this._selectedRoom);

    return html`
      <div class="preview-encart">
        <div class="preview-label">${t('config.preview')}</div>
        ${this.renderPreview()}
      </div>

      <div class="tab-panel" id="panel-popup">
        <div class="section-label">${t('config.popup_room')}</div>
        <div class="section-desc">
          ${t('config.popup_room_desc')}
        </div>
        <div class="dropdown ${this._popupDropdownOpen ? 'open' : ''}">
          <button
            class="dropdown-trigger"
            @click=${() => { if (!this._popupDropdownOpen) this._popupRoomSearch = ''; this._popupDropdownOpen = !this._popupDropdownOpen; }}
            aria-expanded=${this._popupDropdownOpen ? 'true' : 'false'}
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
              .value=${this._popupRoomSearch}
              @input=${(e: InputEvent) => { this._popupRoomSearch = (e.target as HTMLInputElement).value; this.requestUpdate(); }}
              @click=${(e: Event) => e.stopPropagation()}
            />
            ${this.rooms
              .filter((room) => !this._popupRoomSearch || room.name.toLowerCase().includes(this._popupRoomSearch.toLowerCase()))
              .map(
              (room) => html`
                <button
                  class="dropdown-item ${room.areaId === this._selectedRoom ? 'active' : ''}"
                  role="option"
                  aria-selected=${room.areaId === this._selectedRoom ? 'true' : 'false'}
                  @click=${() => this._selectRoom(room.areaId)}
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
          ${this._cards.map((card, idx) => this._renderCardRow(card, idx))}
        </div>

        ${this._scenes.length > 0 ? html`
          <div class="section-label">${t('config.popup_scenes')} (${this._scenes.length})</div>
          <div class="section-desc">
            ${t('config.popup_scenes_desc')}
          </div>
          <div class="item-list">
            ${this._scenes.map((scene, idx) => this._renderSceneRow(scene, idx))}
          </div>
        ` : nothing}

        <div class="save-bar">
          <button class="btn btn-ghost" @click=${() => this.reload()}>${t('common.reset')}</button>
        </div>
      </div>
    `;
  }
}

try { customElements.define('config-tab-popup', ConfigTabPopup); } catch { /* already registered */ }
