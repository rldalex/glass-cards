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
  @state() _spotifyMaxItems = 6;
  @state() _spotifyVisibleSpeakers: string[] = [];
  @state() _spotifyConfigured: boolean | null = null;

  // Local drag state for speakers
  protected override _localDragIdx: number | null = null;
  protected override _localDropIdx: number | null = null;
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

  protected override async _performSave(): Promise<void> {
    await this.backend!.send('set_spotify_config', this.collectSaveData());
    bus.emit('spotify-config-changed', undefined);
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

  private _spotifyStatusRetry?: ReturnType<typeof setTimeout>;

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this._spotifyStatusRetry) {
      clearTimeout(this._spotifyStatusRetry);
      this._spotifyStatusRetry = undefined;
    }
  }

  private async _checkSpotifyStatus(): Promise<void> {
    if (!this.backend) {
      // Backend not ready yet — retry shortly. Stop when detached, otherwise
      // a panel closed before the backend arrives loops forever at 500ms.
      if (!this.isConnected) return;
      if (this._spotifyStatusRetry) clearTimeout(this._spotifyStatusRetry);
      this._spotifyStatusRetry = setTimeout(() => this._checkSpotifyStatus(), 500);
      return;
    }
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
  }

  private _toggleSpeaker(entityId: string): void {
    if (this._spotifyVisibleSpeakers.includes(entityId)) {
      this._spotifyVisibleSpeakers = this._spotifyVisibleSpeakers.filter((id) => id !== entityId);
    } else {
      this._spotifyVisibleSpeakers = [...this._spotifyVisibleSpeakers, entityId];
    }
  }

  // — Local drag-drop for speakers —

  protected override _onLocalDragStart(idx: number): void {
    this._localDragIdx = idx;
    this._localDragContext = 'speakers';
  }

  protected override _onLocalDragOver(idx: number, e: DragEvent): void {
    e.preventDefault();
    if (this._localDragIdx === null || this._localDragIdx === idx) return;
    this._localDropIdx = idx;
    this.requestUpdate();
  }

  protected override _onLocalDragLeave(): void {
    this._localDropIdx = null;
    this.requestUpdate();
  }

  protected override _onLocalDragEnd(): void {
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

  private _renderSetupGuide(): TemplateResult {
    return html`
      <div class="tab-panel" id="panel-spotify">
        <div class="pw-sp-setup-box">
          <ha-icon .icon=${'mdi:spotify'} class="pw-sp-setup-icon"></ha-icon>
          <div class="pw-sp-setup-title">
            ${t('config.spotify_not_configured')}
          </div>
          <div class="pw-sp-setup-desc">
            ${t('config.spotify_setup_guide')}
          </div>

          <div class="pw-sp-steps">
            ${[1, 2, 3, 4].map((n) => html`
              <div class="pw-sp-step">
                <span class="pw-sp-step-num">${n}</span>
                <span class="pw-sp-step-text">
                  ${t(`config.spotify_setup_step${n}` as Parameters<typeof t>[0])}
                </span>
              </div>
            `)}
          </div>

          <div class="pw-sp-note">
            ${t('config.spotify_setup_note')}
          </div>

          <glass-button
            class="pw-sp-setup-btn"
            variant="primary"
            .icon=${'mdi:cog'}
            @click=${() => { window.open('/config/integrations/dashboard', '_blank'); }}
          >
            ${t('config.spotify_open_settings')}
          </glass-button>
        </div>
      </div>
    `;
  }

  renderTab(): TemplateResult {
    void this._lang;

    if (this._spotifyConfigured === null) {
      return html`
        <div class="tab-panel" id="panel-spotify">
          <div class="preview-empty">${t('config.spotify_checking')}</div>
        </div>
      `;
    }
    if (this._spotifyConfigured === false) {
      return this._renderSetupGuide();
    }

    const mediaPlayerEntities = this.hass
      ? Object.keys(this.hass.states).filter((id) => id.startsWith('media_player.')).sort()
      : [];
    const speakersTotal = mediaPlayerEntities.length;
    const speakersVisible = this._spotifyVisibleSpeakers.filter((id) => mediaPlayerEntities.includes(id)).length;

    return html`
      <div class="tab-panel spotify-tab" id="panel-spotify">
        <glass-spotify-card .hass=${this.hass} .areaId=${this.areaId} config-preview></glass-spotify-card>
        <div class="cfg-info">
          <ha-icon .icon=${'mdi:information-outline'}></ha-icon>
          <span>${t('config.spotify_dashboard_info')}</span>
        </div>

        <section class="cfg-section">
          <header class="cfg-section-head">
            <span class="cfg-section-num">1</span>
            <div class="cfg-section-text">
              <span class="section-label">${t('config.spotify_entity')}</span>
              <span class="section-desc">${t('config.spotify_entity_desc')}</span>
            </div>
          </header>

          ${mediaPlayerEntities.length === 0 ? html`
            <glass-empty-state variant="inline" .icon=${'mdi:speaker-off'} .title=${t('media.no_players')}></glass-empty-state>
          ` : html`
            <glass-dropdown
              .items=${mediaPlayerEntities.map((id) => ({ value: id, label: id, icon: 'mdi:speaker' }))}
              .value=${this._spotifyEntity}
              .label=${t('common.select')}
              icon="mdi:spotify"
              @glass-dropdown-change=${(e: CustomEvent<{ value: string }>) => this._selectEntity(e.detail.value)}
            ></glass-dropdown>
          `}
        </section>

        <section class="cfg-section">
          <header class="cfg-section-head">
            <span class="cfg-section-num">2</span>
            <div class="cfg-section-text">
              <span class="section-label">${t('config.display')}</span>
            </div>
          </header>
          <div class="feature-list">
            ${this._renderFeatureRow({
              icon: 'mdi:page-layout-header',
              nameKey: 'config.spotify_show_header',
              descKey: 'config.spotify_show_header_desc',
              on: this._spotifyShowHeader,
              onToggle: () => { this._spotifyShowHeader = !this._spotifyShowHeader; },
            })}
          </div>

          <div class="cfg-sublabel">${t('config.spotify_sort_order')}</div>
          <div class="cfg-subdesc">${t('config.spotify_sort_order_desc')}</div>
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

          <div class="cfg-sublabel">${t('config.spotify_max_items')}</div>
          <div class="cfg-subdesc">${t('config.spotify_max_items_desc')}</div>
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
        </section>

        <section class="cfg-section">
          <header class="cfg-section-head">
            <span class="cfg-section-num">3</span>
            <div class="cfg-section-text">
              <span class="section-label">${t('config.spotify_speakers')}</span>
              <span class="section-desc">${t('config.spotify_speakers_desc')}</span>
            </div>
            ${speakersTotal > 0 ? html`
              <span class="cfg-section-count" aria-label="${t('common.count_visible', { count: speakersVisible, total: speakersTotal })}">
                ${speakersVisible}/${speakersTotal}
              </span>
            ` : nothing}
          </header>
          ${this._renderSpeakerList()}
        </section>

        <div class="save-bar">
          <glass-button variant="ghost" @click=${() => this.reload()}>${t('common.reset')}</glass-button>
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
                <glass-drag-handle></glass-drag-handle>
              ` : html`<span class="pw-sp-drag-spacer"></span>`}
              <div class="item-info">
                <span class="item-name">${sp.name}</span>
                <span class="item-meta">${sp.entityId}</span>
              </div>
              <glass-toggle
                .checked=${isSelected}
                aria-label="${isSelected ? t('common.hide') : t('common.show')} ${sp.name}"
                @glass-toggle-change=${() => this._toggleSpeaker(sp.entityId)}
              ></glass-toggle>
            </div>
          `;
        })}
      </div>
    `;
  }
}

try { customElements.define('config-tab-spotify', ConfigTabSpotify); } catch { /* already registered */ }
