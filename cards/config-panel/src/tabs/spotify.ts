import { html, nothing, type PropertyValues, type TemplateResult } from 'lit';
import { state } from 'lit/decorators.js';
import { t } from '@glass-cards/i18n';
import { bus } from '@glass-cards/event-bus';
import { BaseConfigTab } from '../base-tab';

// — Component —

export class ConfigTabSpotify extends BaseConfigTab {
  @state() _spotifyShowHeader = true;
  @state() _spotifyEntity = '';
  @state() _spotifySortOrder: 'recent_first' | 'oldest_first' = 'recent_first';
  @state() _spotifyDropdownOpen = false;
  @state() _spotifyMaxItems = 6;
  @state() _spotifyVisibleSpeakers: string[] = [];
  @state() _spotifyConfigured: boolean | null = null;

  // Local drag state for speakers
  private _localDragIdx: number | null = null;
  private _localDropIdx: number | null = null;
  private _localDragContext = '';

  protected static override _AUTO_SAVE_KEYS = new Set([
    '_spotifyShowHeader', '_spotifyEntity', '_spotifySortOrder', '_spotifyMaxItems', '_spotifyVisibleSpeakers',
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
      entity_id?: string;
      sort_order?: string;
      max_items_per_section?: number;
      visible_speakers?: string[];
    };
    this._spotifyShowHeader = c.show_header ?? true;
    this._spotifyEntity = c.entity_id ?? '';
    this._spotifySortOrder = c.sort_order === 'oldest_first' ? 'oldest_first' : 'recent_first';
    this._spotifyMaxItems = c.max_items_per_section ?? 6;
    this._spotifyVisibleSpeakers = c.visible_speakers ?? [];
    // Check spotify status after loading config
    this._checkSpotifyStatus();
  }

  collectSaveData(): Record<string, unknown> {
    return {
      show_header: this._spotifyShowHeader,
      ...(this._spotifyEntity ? { entity_id: this._spotifyEntity } : {}),
      sort_order: this._spotifySortOrder,
      max_items_per_section: this._spotifyMaxItems,
      visible_speakers: this._spotifyVisibleSpeakers,
    };
  }

  async save(): Promise<void> {
    if (!this.backend) return;
    try {
      await this.backend.send('set_spotify_config', this.collectSaveData());
      this._fireToast(true);
      bus.emit('spotify-config-changed', undefined);
    } catch {
      this._fireToast(false);
    }
  }

  async reload(): Promise<void> {
    if (!this.backend) return;
    try {
      const result = await this.backend.send<{
        spotify_card: { show_header: boolean; entity_id: string; sort_order: string; max_items_per_section: number; visible_speakers?: string[] };
      }>('get_config');
      if (result?.spotify_card) this.loadFromConfig(result.spotify_card);
    } catch { /* ignore */ }
  }

  // — Spotify status check —

  private async _checkSpotifyStatus(): Promise<void> {
    if (!this.backend) return;
    try {
      const result = await this.backend.send<{ configured: boolean }>('spotify_status');
      this._spotifyConfigured = result?.configured ?? false;
    } catch {
      this._spotifyConfigured = false;
    }
  }

  // — Actions —

  private _selectEntity(entityId: string): void {
    this._spotifyEntity = entityId;
    this._spotifyDropdownOpen = false;
  }

  private _toggleSpeaker(entityId: string): void {
    if (this._spotifyVisibleSpeakers.includes(entityId)) {
      this._spotifyVisibleSpeakers = this._spotifyVisibleSpeakers.filter((id) => id !== entityId);
    } else {
      this._spotifyVisibleSpeakers = [...this._spotifyVisibleSpeakers, entityId];
    }
  }

  // — Local drag-drop for speakers —

  private _onLocalDragStart(idx: number): void {
    this._localDragIdx = idx;
    this._localDragContext = 'speakers';
  }

  private _onLocalDragOver(idx: number, e: DragEvent): void {
    e.preventDefault();
    this._localDropIdx = idx;
    this.requestUpdate();
  }

  private _onLocalDragLeave(): void {
    this._localDropIdx = null;
    this.requestUpdate();
  }

  private _onLocalDragEnd(): void {
    this._localDragIdx = null;
    this._localDropIdx = null;
    this._localDragContext = '';
    this.requestUpdate();
  }

  private _onDropSpeaker(idx: number, e: DragEvent): void {
    e.preventDefault();
    if (this._localDragIdx === null || this._localDragIdx === idx || this._localDragContext !== 'speakers') {
      this._localDragIdx = null;
      this._localDropIdx = null;
      return;
    }
    const arr = [...this._spotifyVisibleSpeakers];
    if (this._localDragIdx >= arr.length || idx >= arr.length) {
      this._localDragIdx = null;
      this._localDropIdx = null;
      return;
    }
    const [moved] = arr.splice(this._localDragIdx, 1);
    arr.splice(idx, 0, moved);
    this._spotifyVisibleSpeakers = arr;
    this._localDragIdx = null;
    this._localDropIdx = null;
  }

  // — Render —

  renderPreview(): TemplateResult | typeof nothing {
    if (this._spotifyConfigured === false) {
      return html`<div class="preview-empty">${t('config.spotify_not_configured')}</div>`;
    }
    if (!this._spotifyEntity || !this.hass) {
      return html`<div class="preview-empty">${t('config.spotify_select_entity')}</div>`;
    }

    const entity = this.hass.states[this._spotifyEntity];
    if (!entity) {
      return html`<div class="preview-empty">${t('config.spotify_select_entity')}</div>`;
    }

    const tabs = [
      { id: 'all', label: t('spotify.tab_all'), active: true },
      { id: 'tracks', label: t('spotify.tab_tracks'), active: false },
      { id: 'playlists', label: t('spotify.tab_playlists'), active: false },
      { id: 'podcasts', label: t('spotify.tab_podcasts'), active: false },
    ];

    const mockItems = [
      { name: 'Daily Mix 1', meta: t('spotify.type_playlist'), icon: 'mdi:playlist-music' },
      { name: t('spotify.saved_tracks'), meta: '128 ' + t('spotify.tracks_count', { count: '' }).trim(), icon: 'mdi:heart' },
      { name: 'Discover Weekly', meta: t('spotify.type_playlist'), icon: 'mdi:playlist-music' },
    ];

    return html`
      <div class="preview-spotify-wrap">
        ${this._spotifyShowHeader ? html`
          <div class="ps-card-header">
            <ha-icon .icon=${'mdi:spotify'}></ha-icon>
            <span class="ps-card-title">${t('spotify.title')}</span>
          </div>
        ` : nothing}
        <div class="preview-spotify">
          <div class="ps-search">
            <ha-icon .icon=${'mdi:magnify'}></ha-icon>
            <span class="ps-search-text">${t('spotify.search_placeholder')}</span>
          </div>
          <div class="ps-tabs">
            ${tabs.map((tab) => html`
              <span class="ps-tab ${tab.active ? 'active' : ''}">${tab.label}</span>
            `)}
          </div>
          <div class="ps-section-label">${t('spotify.my_playlists')}</div>
          ${mockItems.map((item) => html`
            <div class="ps-item-row">
              <div class="ps-item-art">
                <ha-icon .icon=${item.icon}></ha-icon>
              </div>
              <div class="ps-item-info">
                <div class="ps-item-name">${item.name}</div>
                <div class="ps-item-meta">${item.meta}</div>
              </div>
              <ha-icon class="ps-item-play" .icon=${'mdi:play-circle'}></ha-icon>
            </div>
          `)}
        </div>
      </div>
    `;
  }

  private _renderSetupGuide(): TemplateResult {
    return html`
      <div class="tab-panel" id="panel-spotify">
        <div style="
          padding: 1.25rem; border-radius: var(--radius-lg);
          background: var(--s2); border: 1px solid var(--b2);
          text-align: center;
        ">
          <ha-icon .icon=${'mdi:spotify'} style="
            color: #1DB954; --mdc-icon-size: 3rem;
            display: flex; align-items: center; justify-content: center;
            margin: 0 auto 1rem;
          "></ha-icon>
          <div style="font-size: 16px; font-weight: 600; color: var(--t1); margin-bottom: 8px;">
            ${t('config.spotify_not_configured')}
          </div>
          <div style="font-size: 13px; color: var(--t3); margin-bottom: 20px; line-height: 1.5;">
            ${t('config.spotify_setup_guide')}
          </div>

          <div style="text-align: left; padding: 0 8px;">
            ${[1, 2, 3, 4].map((n) => html`
              <div style="
                display: flex; align-items: flex-start; gap: 0.625rem;
                margin-bottom: 0.75rem; font-size: 13px; color: var(--t2);
              ">
                <span style="
                  flex-shrink: 0; width: 1.375rem; height: 1.375rem;
                  border-radius: 50%; background: var(--s3);
                  display: flex; align-items: center; justify-content: center;
                  font-size: 12px; font-weight: 600; color: var(--t1);
                ">${n}</span>
                <span style="line-height: 22px;">
                  ${t(`config.spotify_setup_step${n}` as Parameters<typeof t>[0])}
                </span>
              </div>
            `)}
          </div>

          <div style="
            font-size: 12px; color: var(--t3); margin-top: 1rem;
            padding: 0.625rem; border-radius: var(--radius-md);
            background: var(--s1); border: 1px solid var(--b1);
          ">
            ${t('config.spotify_setup_note')}
          </div>

          <button
            class="btn btn-accent"
            style="margin-top: 20px;"
            @click=${() => { window.open('/config/integrations/dashboard', '_blank'); }}
          >
            <ha-icon .icon=${'mdi:cog'} style="--mdc-icon-size: 16px; display: flex; align-items: center; justify-content: center;"></ha-icon>
            ${t('config.spotify_open_settings')}
          </button>
        </div>
      </div>
    `;
  }

  renderTab(): TemplateResult {
    void this._lang;

    if (this._spotifyConfigured === null) {
      return html`
        <div class="preview-encart">
          <div class="preview-label">${t('config.preview')}</div>
          <div class="preview-empty">${t('config.spotify_checking')}</div>
        </div>
        <div class="tab-panel" id="panel-spotify">
          <div class="preview-empty">${t('config.spotify_checking')}</div>
        </div>
      `;
    }
    if (this._spotifyConfigured === false) {
      return html`
        <div class="preview-encart">
          <div class="preview-label">${t('config.preview')}</div>
          ${this.renderPreview()}
        </div>
        ${this._renderSetupGuide()}
      `;
    }

    const mediaPlayerEntities = this.hass
      ? Object.keys(this.hass.states).filter((id) => id.startsWith('media_player.')).sort()
      : [];
    const selectedEntity = mediaPlayerEntities.find((id) => id === this._spotifyEntity);

    return html`
      <div class="preview-encart">
        <div class="preview-label">${t('config.preview')}</div>
        ${this.renderPreview()}
      </div>

      <div class="tab-panel" id="panel-spotify">
        <div class="feature-list">
          <button class="feature-row" role="switch" aria-checked="${this._spotifyShowHeader ? 'true' : 'false'}"
            @click=${() => { this._spotifyShowHeader = !this._spotifyShowHeader; }}>
            <div class="feature-icon">
              <ha-icon .icon=${'mdi:page-layout-header'}></ha-icon>
            </div>
            <div class="feature-text">
              <div class="feature-name">${t('config.spotify_show_header')}</div>
              <div class="feature-desc">${t('config.spotify_show_header_desc')}</div>
            </div>
            <span class="toggle ${this._spotifyShowHeader ? 'on' : ''}"></span>
          </button>
        </div>

        <div class="section-label">${t('config.spotify_entity')}</div>
        <div class="section-desc">${t('config.spotify_entity_desc')}</div>
        <div class="dropdown ${this._spotifyDropdownOpen ? 'open' : ''}">
          <button
            class="dropdown-trigger"
            @click=${() => (this._spotifyDropdownOpen = !this._spotifyDropdownOpen)}
            aria-expanded=${this._spotifyDropdownOpen ? 'true' : 'false'}
            aria-haspopup="listbox"
          >
            <ha-icon .icon=${'mdi:spotify'} style="color: #1DB954;"></ha-icon>
            <span>${selectedEntity || t('common.select')}</span>
            <ha-icon class="arrow" .icon=${'mdi:chevron-down'}></ha-icon>
          </button>
          <div class="dropdown-menu" role="listbox">
            ${mediaPlayerEntities.map(
              (id) => html`
                <button
                  class="dropdown-item ${id === this._spotifyEntity ? 'active' : ''}"
                  role="option"
                  aria-selected=${id === this._spotifyEntity ? 'true' : 'false'}
                  @click=${() => this._selectEntity(id)}
                >
                  <ha-icon .icon=${'mdi:speaker'}></ha-icon>
                  ${id}
                </button>
              `,
            )}
          </div>
        </div>

        <div class="section-label">${t('config.spotify_sort_order')}</div>
        <div class="section-desc">${t('config.spotify_sort_order_desc')}</div>
        <div class="segmented">
          <button class="seg-btn ${this._spotifySortOrder === 'recent_first' ? 'active' : ''}"
            @click=${() => { this._spotifySortOrder = 'recent_first'; }}>
            ${t('config.spotify_sort_recent')}
          </button>
          <button class="seg-btn ${this._spotifySortOrder === 'oldest_first' ? 'active' : ''}"
            @click=${() => { this._spotifySortOrder = 'oldest_first'; }}>
            ${t('config.spotify_sort_oldest')}
          </button>
        </div>

        <div class="section-label">${t('config.spotify_max_items')}</div>
        <div class="section-desc">${t('config.spotify_max_items_desc')}</div>
        <div class="range-row">
          <input
            type="range"
            class="range-input"
            min="1"
            max="20"
            .value=${String(this._spotifyMaxItems)}
            @input=${(e: Event) => { this._spotifyMaxItems = parseInt((e.target as HTMLInputElement).value, 10); }}
          />
          <span class="range-value">${this._spotifyMaxItems}</span>
        </div>

        <div class="section-label">${t('config.spotify_speakers')}</div>
        <div class="section-desc">${t('config.spotify_speakers_desc')}</div>
        ${this._renderSpeakerList()}

        <div class="save-bar">
          <button class="btn btn-ghost" @click=${() => this.reload()}>${t('common.reset')}</button>
        </div>
      </div>
    `;
  }

  private _renderSpeakerList(): TemplateResult {
    const allSpeakers = this.hass
      ? Object.entries(this.hass.states)
          .filter(([id]) => id.startsWith('media_player.'))
          .map(([id, entity]) => ({
            entityId: id,
            name: (entity.attributes.friendly_name as string) ?? id,
            visible: this._spotifyVisibleSpeakers.includes(id),
          }))
      : [];
    // Selected speakers in order, then unselected sorted alphabetically
    const selected = this._spotifyVisibleSpeakers
      .map((id) => allSpeakers.find((s) => s.entityId === id))
      .filter((s): s is NonNullable<typeof s> => !!s);
    const unselected = allSpeakers
      .filter((s) => !s.visible)
      .sort((a, b) => a.name.localeCompare(b.name));
    const ordered = [...selected, ...unselected];

    return html`
      <div class="item-list">
        ${ordered.map((sp) => {
          const isSelected = sp.visible;
          const visIdx = isSelected ? this._spotifyVisibleSpeakers.indexOf(sp.entityId) : -1;
          const isDragging = this._localDragIdx === visIdx && visIdx !== -1 && this._localDragContext === 'speakers';
          const isDropTarget = this._localDropIdx === visIdx && visIdx !== -1 && this._localDragContext === 'speakers';
          const rowClasses = [
            'item-row',
            !isSelected ? 'disabled' : '',
            isDragging ? 'dragging' : '',
            isDropTarget ? 'drop-target' : '',
          ].filter(Boolean).join(' ');
          return html`
            <div
              class=${rowClasses}
              draggable=${isSelected ? 'true' : 'false'}
              @dragstart=${() => { if (isSelected && visIdx !== -1) this._onLocalDragStart(visIdx); }}
              @dragover=${(e: DragEvent) => { if (isSelected && visIdx !== -1) this._onLocalDragOver(visIdx, e); }}
              @dragleave=${() => this._onLocalDragLeave()}
              @drop=${(e: DragEvent) => { if (isSelected && visIdx !== -1) this._onDropSpeaker(visIdx, e); }}
              @dragend=${() => this._onLocalDragEnd()}
            >
              ${isSelected ? html`
                <span class="drag-handle">
                  <ha-icon .icon=${'mdi:drag'}></ha-icon>
                </span>
              ` : html`<span style="width:24px;"></span>`}
              <div class="item-info">
                <span class="item-name">${sp.name}</span>
                <span class="item-meta">${sp.entityId}</span>
              </div>
              <button
                class="toggle ${isSelected ? 'on' : ''}"
                @click=${() => this._toggleSpeaker(sp.entityId)}
                role="switch"
                aria-checked=${isSelected ? 'true' : 'false'}
                aria-label="${isSelected ? t('common.hide') : t('common.show')} ${sp.name}"
              ></button>
            </div>
          `;
        })}
      </div>
    `;
  }
}

try { customElements.define('config-tab-spotify', ConfigTabSpotify); } catch { /* already registered */ }
