import { html, nothing, type PropertyValues, type TemplateResult } from 'lit';
import { state } from 'lit/decorators.js';
import { t } from '@glass-cards/i18n';
import { bus } from '@glass-cards/event-bus';
import { getAreaEntities } from '@glass-cards/base-card';
import { BaseConfigTab } from '../base-tab';

// — Component —

export class ConfigTabMedia extends BaseConfigTab {
  @state() _mediaShowHeader = true;
  @state() _mediaExtraEntities: Record<string, string[]> = {};
  @state() _mediaRoom = '';
  @state() _mediaRoomNativePlayers: string[] = [];
  @state() _mediaAddDropdownOpen = false;
  @state() _mediaEntitySearch = '';

  protected static override _AUTO_SAVE_KEYS = new Set([
    '_mediaShowHeader', '_mediaExtraEntities',
  ]);

  // — Lifecycle —

  protected override updated(changedProps: PropertyValues): void {
    super.updated(changedProps);
    if (changedProps.has('areaId') && this.areaId) {
      this._mediaRoom = this.areaId;
      this._loadRoomMediaPlayers();
    }
    this._checkAutoSave(changedProps);
  }

  // — Persistence —

  loadFromConfig(config: Record<string, unknown>): void {
    const c = config as { show_header?: boolean; extra_entities?: Record<string, string[]> };
    this._mediaShowHeader = c.show_header ?? true;
    this._mediaExtraEntities = c.extra_entities ?? {};
  }

  collectSaveData(): Record<string, unknown> {
    return {
      show_header: this._mediaShowHeader,
      extra_entities: this._mediaExtraEntities,
    };
  }

  async save(): Promise<void> {
    if (!this.backend) return;
    try {
      await this.backend.send('set_media_config', this.collectSaveData());
      this._fireToast(true);
      bus.emit('media-config-changed', undefined);
    } catch {
      this._fireToast(false);
    }
  }

  async reload(): Promise<void> {
    if (!this.backend) return;
    try {
      const result = await this.backend.send<{
        media_card: { show_header: boolean; extra_entities: Record<string, string[]> };
      }>('get_config');
      if (result?.media_card) this.loadFromConfig(result.media_card);
    } catch { /* ignore */ }
  }

  // — Actions —

  private _addMediaExtraEntity(entityId: string): void {
    const roomId = this._mediaRoom;
    if (!roomId) return;
    const current = this._mediaExtraEntities[roomId] ?? [];
    if (current.includes(entityId)) return;
    this._mediaExtraEntities = {
      ...this._mediaExtraEntities,
      [roomId]: [...current, entityId],
    };
  }

  private _removeMediaExtraEntity(entityId: string): void {
    const roomId = this._mediaRoom;
    if (!roomId) return;
    const current = this._mediaExtraEntities[roomId] ?? [];
    this._mediaExtraEntities = {
      ...this._mediaExtraEntities,
      [roomId]: current.filter((id) => id !== entityId),
    };
  }

  _loadRoomMediaPlayers(): void {
    if (!this.hass || !this._mediaRoom) {
      this._mediaRoomNativePlayers = [];
      return;
    }
    const entities = getAreaEntities(this._mediaRoom, this.hass.entities, this.hass.devices);
    this._mediaRoomNativePlayers = entities
      .filter((e) => e.entity_id.startsWith('media_player.'))
      .map((e) => e.entity_id);
  }

  /** Close dropdowns on outside click */
  private _boundCloseDropdowns = this._closeDropdownsOnOutsideClick.bind(this);

  override connectedCallback(): void {
    super.connectedCallback();
    document.addEventListener('click', this._boundCloseDropdowns);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    document.removeEventListener('click', this._boundCloseDropdowns);
  }

  private _closeDropdownsOnOutsideClick(e: MouseEvent): void {
    if (!this._mediaAddDropdownOpen) return;
    const path = e.composedPath();
    const root = this.shadowRoot;
    if (!root) return;
    const dropdowns = root.querySelectorAll('.dropdown');
    for (const dd of dropdowns) {
      if (path.includes(dd)) return;
    }
    this._mediaAddDropdownOpen = false;
  }

  /** Called from parent when switching to media tab without a room selected. */
  initRoom(): void {
    if (!this._mediaRoom && this.rooms.length > 0) {
      this._mediaRoom = this.rooms[0].areaId;
      this._loadRoomMediaPlayers();
    }
  }

  // — Render —

  renderTab(): TemplateResult {
    void this._lang;
    if (!this.hass) return html``;

    const roomId = this._mediaRoom;
    const extraEntities = roomId ? (this._mediaExtraEntities[roomId] ?? []) : [];

    // All media_player entities in HA (for search dropdown)
    const allMediaPlayers = Object.keys(this.hass.states)
      .filter((id) => id.startsWith('media_player.'))
      .sort();

    // Already assigned entities for this room
    const assignedSet = new Set([...this._mediaRoomNativePlayers, ...extraEntities]);

    // Available entities = all media_players not yet assigned to this room
    const search = this._mediaEntitySearch?.toLowerCase() ?? '';
    const available = allMediaPlayers.filter((id) => {
      if (assignedSet.has(id)) return false;
      if (!search) return true;
      const name = (this.hass?.states[id]?.attributes?.friendly_name as string ?? '').toLowerCase();
      return id.toLowerCase().includes(search) || name.includes(search);
    });

    return html`
      <div class="tab-panel" id="panel-media">
        <glass-media-card .hass=${this.hass} .areaId=${this.areaId} config-preview></glass-media-card>
        <!-- Show header toggle -->
        <div class="section-label">${t('config.behavior')}</div>
        <div class="feature-list">
          <button
            class="feature-row"
            role="switch"
            aria-checked=${this._mediaShowHeader ? 'true' : 'false'}
            @click=${() => { this._mediaShowHeader = !this._mediaShowHeader; }}
          >
            <div class="feature-icon">
              <ha-icon .icon=${'mdi:page-layout-header'}></ha-icon>
            </div>
            <div class="feature-text">
              <div class="feature-name">${t('config.media_show_header')}</div>
              <div class="feature-desc">${t('config.media_show_header_desc')}</div>
            </div>
            <span
              class="toggle ${this._mediaShowHeader ? 'on' : ''}"
            ></span>
          </button>
        </div>

        <!-- Per-room extra entities -->
        <div class="section-label">${t('config.media_room')}</div>
        <div class="section-desc">${t('config.media_room_desc')}</div>

        ${roomId ? html`
          <!-- Native players (read-only) -->
          <div class="section-label">${t('config.media_native_players')} (${this._mediaRoomNativePlayers.length})</div>
          <div class="section-desc">${t('config.media_native_players_desc')}</div>
          ${this._mediaRoomNativePlayers.length > 0 ? html`
            <div class="item-list">
              ${this._mediaRoomNativePlayers.map((id) => {
                const entity = this.hass?.states[id];
                const name = (entity?.attributes?.friendly_name as string) || id.split('.')[1] || id;
                const isPlaying = entity?.state === 'playing';
                return html`
                  <div class="item-card">
                    <div class="item-row">
                      <div class="item-info pw-mp-item-info">
                        <span class="item-name">${name}</span>
                        <span class="item-meta">${id}</span>
                      </div>
                      <div class="dot" style="background:${isPlaying ? '#60a5fa' : 'var(--t4)'};${isPlaying ? 'box-shadow:0 0 6px rgba(96,165,250,0.4);' : ''}"></div>
                    </div>
                  </div>
                `;
              })}
            </div>
          ` : html`
            <div class="banner">
              <ha-icon .icon=${'mdi:speaker-off'}></ha-icon>
              <span>${t('media.no_players')}</span>
            </div>
          `}

          <!-- Extra entities -->
          <div class="section-label">${t('config.media_extra_entities')} (${extraEntities.length})</div>
          <div class="section-desc">${t('config.media_extra_entities_desc')}</div>
          ${extraEntities.length > 0 ? html`
            <div class="item-list">
              ${extraEntities.map((id) => {
                const entity = this.hass?.states[id];
                const name = (entity?.attributes?.friendly_name as string) || id.split('.')[1] || id;
                return html`
                  <div class="item-card">
                    <div class="item-row">
                      <div class="item-info pw-mp-item-info">
                        <span class="item-name">${name}</span>
                        <span class="item-meta">${id}</span>
                      </div>
                      <button
                        class="btn-icon xs"
                        @click=${() => this._removeMediaExtraEntity(id)}
                        aria-label="${t('common.hide')} ${name}"
                      >
                        <ha-icon .icon=${'mdi:close'}></ha-icon>
                      </button>
                    </div>
                  </div>
                `;
              })}
            </div>
          ` : html`
            <div class="banner">
              <ha-icon .icon=${'mdi:speaker-multiple'}></ha-icon>
              <span>${t('config.media_no_extra')}</span>
            </div>
          `}

          <!-- Add extra entity dropdown -->
          <div class="dropdown ${this._mediaAddDropdownOpen ? 'open' : ''}">
            <button
              class="dropdown-trigger"
              @click=${() => { this._mediaAddDropdownOpen = !this._mediaAddDropdownOpen; this._mediaEntitySearch = ''; }}
              aria-expanded=${this._mediaAddDropdownOpen ? 'true' : 'false'}
              aria-haspopup="listbox"
            >
              <ha-icon .icon=${'mdi:plus'}></ha-icon>
              <span>${t('config.media_add_extra')}</span>
              <ha-icon class="arrow" .icon=${'mdi:chevron-down'}></ha-icon>
            </button>
            <div class="dropdown-menu" role="listbox">
              <input
                type="text"
                class="dropdown-search"
                placeholder="${t('config.search_entity')}"
                .value=${this._mediaEntitySearch ?? ''}
                @input=${(e: Event) => { this._mediaEntitySearch = (e.target as HTMLInputElement).value; }}
                @click=${(e: Event) => e.stopPropagation()}
              />
              ${available.slice(0, 20).map((id) => {
                const entity = this.hass?.states[id];
                const name = (entity?.attributes?.friendly_name as string) || id.split('.')[1] || id;
                return html`
                  <button
                    class="dropdown-item"
                    role="option"
                    @click=${() => { this._addMediaExtraEntity(id); this._mediaAddDropdownOpen = false; }}
                  >
                    <ha-icon .icon=${'mdi:speaker'}></ha-icon>
                    ${name}
                  </button>
                `;
              })}
              ${available.length === 0 ? html`
                <div class="pw-mp-empty-msg">—</div>
              ` : nothing}
            </div>
          </div>
        ` : nothing}

        <div class="save-bar">
          <button class="btn btn-ghost" @click=${() => this.reload()}>${t('common.reset')}</button>
        </div>
      </div>
    `;
  }
}

try { customElements.define('config-tab-media', ConfigTabMedia); } catch { /* already registered */ }
