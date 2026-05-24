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
  @state() _mediaHiddenEntities: string[] = [];
  @state() _mediaRoom = '';
  @state() _mediaRoomNativePlayers: string[] = [];
  @state() _mediaDashboardPlayers: { entityId: string; name: string; visible: boolean }[] = [];

  private _dashboardLoaded = false;

  protected static override _AUTO_SAVE_KEYS = new Set([
    '_mediaShowHeader', '_mediaExtraEntities', '_mediaHiddenEntities',
  ]);

  // — Lifecycle —

  protected override updated(changedProps: PropertyValues): void {
    super.updated(changedProps);
    if (changedProps.has('areaId') && this.areaId) {
      this._mediaRoom = this.areaId;
      this._loadRoomMediaPlayers();
    }
    if (!this.areaId && !this._dashboardLoaded && this.hass && this.backend) {
      this._dashboardLoaded = true;
      this._loadDashboardMediaPlayers();
    }
    this._checkAutoSave(changedProps);
  }

  // — Persistence —

  loadFromConfig(config: Record<string, unknown>): void {
    const c = config as { show_header?: boolean; extra_entities?: Record<string, string[]>; hidden_entities?: string[] };
    this._mediaShowHeader = c.show_header ?? true;
    this._mediaExtraEntities = c.extra_entities ?? {};
    this._mediaHiddenEntities = c.hidden_entities ?? [];
  }

  collectSaveData(): Record<string, unknown> {
    return {
      show_header: this._mediaShowHeader,
      extra_entities: this._mediaExtraEntities,
      hidden_entities: this._mediaHiddenEntities,
    };
  }

  protected override async _performSave(): Promise<void> {
    const saveData = this.collectSaveData();
    if (!this.areaId && this._mediaDashboardPlayers.length > 0) {
      saveData.hidden_entities = this._mediaDashboardPlayers.filter((e) => !e.visible).map((e) => e.entityId);
    }
    await this.backend!.send('set_media_config', saveData);
    bus.emit('media-config-changed', undefined);
  }

  async reload(): Promise<void> {
    if (!this.backend) return;
    try {
      const result = await this.backend.send<{
        media_card: { show_header: boolean; extra_entities: Record<string, string[]>; hidden_entities: string[] };
      }>('get_config');
      if (result?.media_card) this.loadFromConfig(result.media_card);
    } catch { /* ignore */ }
    if (!this.areaId) {
      this._dashboardLoaded = false;
      this._loadDashboardMediaPlayers();
    }
  }

  // — Dashboard media players —

  private _loadDashboardMediaPlayers(): void {
    if (!this.hass) return;
    const hiddenSet = new Set(this._mediaHiddenEntities);
    const allMediaPlayers = Object.keys(this.hass.states)
      .filter((id) => id.startsWith('media_player.'))
      .sort();
    this._mediaDashboardPlayers = allMediaPlayers.map((id) => {
      const entity = this.hass?.states[id];
      const name = (entity?.attributes?.friendly_name as string) || id.split('.')[1] || id;
      return { entityId: id, name, visible: !hiddenSet.has(id) };
    });
  }

  private _toggleMediaVisible(entityId: string): void {
    this._mediaDashboardPlayers = this._mediaDashboardPlayers.map((e) =>
      e.entityId === entityId ? { ...e, visible: !e.visible } : e,
    );
    this._mediaHiddenEntities = this._mediaDashboardPlayers.filter((e) => !e.visible).map((e) => e.entityId);
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
    const available = allMediaPlayers.filter((id) => !assignedSet.has(id));

    const isDashboard = !this.areaId;
    const dashPlayers = this._mediaDashboardPlayers;
    const dashVisible = dashPlayers.filter((p) => p.visible).length;
    const natives = this._mediaRoomNativePlayers;

    return html`
      <div class="tab-panel media-tab" id="panel-media">
        <glass-media-card .hass=${this.hass} .areaId=${this.areaId} config-preview></glass-media-card>
        ${isDashboard ? html`
          <div class="cfg-info">
            <ha-icon .icon=${'mdi:information-outline'}></ha-icon>
            <span>${t('config.media_dashboard_info')}</span>
          </div>
        ` : nothing}

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
              nameKey: 'config.media_show_header',
              descKey: 'config.media_show_header_desc',
              on: this._mediaShowHeader,
              onToggle: () => { this._mediaShowHeader = !this._mediaShowHeader; },
            })}
          </div>
        </section>

        ${isDashboard ? html`
          <section class="cfg-section">
            <header class="cfg-section-head">
              <span class="cfg-section-num">2</span>
              <div class="cfg-section-text">
                <span class="section-label">${t('config.media_dashboard_players')}</span>
                <span class="section-desc">${t('config.media_dashboard_players_desc')}</span>
              </div>
              ${dashPlayers.length > 0 ? html`
                <span class="cfg-section-count" aria-label="${t('common.count_visible', { count: dashVisible, total: dashPlayers.length })}">
                  ${dashVisible}/${dashPlayers.length}
                </span>
              ` : nothing}
            </header>

            ${dashPlayers.length === 0 ? html`
              <glass-empty-state variant="inline" .icon=${'mdi:speaker-off'} .title=${t('media.no_players')}></glass-empty-state>
            ` : html`
              <div class="item-list">
                ${dashPlayers.map((e) => {
                  const entity = this.hass?.states[e.entityId];
                  const isPlaying = entity?.state === 'playing';
                  return html`
                    <div class="item-card">
                      <div class="item-row ${!e.visible ? 'disabled' : ''}">
                        <div class="item-info">
                          <span class="item-name">${e.name}</span>
                          <span class="item-meta">${e.entityId}${isPlaying ? ` · ${t('media.now_playing')}` : ''}</span>
                        </div>
                        <glass-toggle
                          .checked=${e.visible}
                          aria-label="${e.visible ? t('common.hide') : t('common.show')} ${e.name}"
                          @glass-toggle-change=${() => this._toggleMediaVisible(e.entityId)}
                        ></glass-toggle>
                      </div>
                    </div>
                  `;
                })}
              </div>
            `}
          </section>
        ` : roomId ? html`
          <section class="cfg-section">
            <header class="cfg-section-head">
              <span class="cfg-section-num">2</span>
              <div class="cfg-section-text">
                <span class="section-label">${t('config.media_native_players')}</span>
                <span class="section-desc">${t('config.media_native_players_desc')}</span>
              </div>
              ${natives.length > 0 ? html`<span class="cfg-section-count">${natives.length}</span>` : nothing}
            </header>

            ${natives.length === 0 ? html`
              <glass-empty-state variant="inline" .icon=${'mdi:speaker-off'} .title=${t('media.no_players')}></glass-empty-state>
            ` : html`
              <div class="item-list">
                ${natives.map((id) => {
                  const entity = this.hass?.states[id];
                  const name = (entity?.attributes?.friendly_name as string) || id.split('.')[1] || id;
                  const isPlaying = entity?.state === 'playing';
                  return html`
                    <div class="item-card">
                      <div class="item-row">
                        <div class="item-info">
                          <span class="item-name">${name}</span>
                          <span class="item-meta">${id}</span>
                        </div>
                        <div class="dot ${isPlaying ? 'playing' : ''}"></div>
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
                <span class="section-label">${t('config.media_extra_entities')}</span>
                <span class="section-desc">${t('config.media_extra_entities_desc')}</span>
              </div>
              ${extraEntities.length > 0 ? html`<span class="cfg-section-count">${extraEntities.length}</span>` : nothing}
            </header>

            ${extraEntities.length === 0 ? html`
              <glass-empty-state variant="inline" .icon=${'mdi:speaker-multiple'} .title=${t('config.media_no_extra')}></glass-empty-state>
            ` : html`
              <div class="item-list">
                ${extraEntities.map((id) => {
                  const entity = this.hass?.states[id];
                  const name = (entity?.attributes?.friendly_name as string) || id.split('.')[1] || id;
                  return html`
                    <div class="item-card">
                      <div class="item-row">
                        <div class="item-info">
                          <span class="item-name">${name}</span>
                          <span class="item-meta">${id}</span>
                        </div>
                        <glass-icon-button
                          size="xs"
                          .icon=${'mdi:close'}
                          aria-label="${t('common.hide')} ${name}"
                          @click=${() => this._removeMediaExtraEntity(id)}
                        ></glass-icon-button>
                      </div>
                    </div>
                  `;
                })}
              </div>
            `}

            <div class="cfg-add-wrap">
              <glass-dropdown
                class="cfg-add-btn"
                .items=${available.map((id) => {
                  const entity = this.hass?.states[id];
                  const name = (entity?.attributes?.friendly_name as string) || id.split('.')[1] || id;
                  return { value: id, label: name, icon: 'mdi:speaker' };
                })}
                .value=${''}
                .label=${t('config.media_add_extra')}
                icon="mdi:plus"
                searchable
                search-placeholder=${t('config.search_entity')}
                empty-text=${t('config.unassigned_no_results')}
                @glass-dropdown-change=${(e: CustomEvent<{ value: string }>) => { if (e.detail.value) this._addMediaExtraEntity(e.detail.value); }}
              ></glass-dropdown>
            </div>
          </section>
        ` : nothing}

        <div class="save-bar">
          <glass-button variant="ghost" @click=${() => this.reload()}>${t('common.reset')}</glass-button>
        </div>
      </div>
    `;
  }
}

try { customElements.define('config-tab-media', ConfigTabMedia); } catch { /* already registered */ }
