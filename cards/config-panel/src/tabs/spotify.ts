import { html, nothing } from 'lit';
import { t } from '@glass-cards/i18n';
import type { GlassConfigPanel } from '../index';

export function renderSpotifyPreview(self: GlassConfigPanel) {
  if (self._spotifyConfigured === false) {
    return html`<div class="preview-empty">${t('config.spotify_not_configured')}</div>`;
  }
  if (!self._spotifyEntity || !self.hass) {
    return html`<div class="preview-empty">${t('config.spotify_select_entity')}</div>`;
  }

  const entity = self.hass.states[self._spotifyEntity];
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
      ${self._spotifyShowHeader ? html`
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

export function renderSpotifyTab(self: GlassConfigPanel) {
  if (self._spotifyConfigured === null) {
    return html`<div class="tab-panel" id="panel-spotify">
      <div class="preview-empty">${t('config.spotify_checking')}</div>
    </div>`;
  }
  if (self._spotifyConfigured === false) {
    return self._renderSpotifySetupGuide();
  }

  const mediaPlayerEntities = self.hass
    ? Object.keys(self.hass.states).filter((id) => id.startsWith('media_player.')).sort()
    : [];
  const selectedEntity = mediaPlayerEntities.find((id) => id === self._spotifyEntity);

  return html`
    <div class="tab-panel" id="panel-spotify">
      <div class="section-label">${t('config.spotify_entity')}</div>
      <div class="section-desc">${t('config.spotify_entity_desc')}</div>
      <div class="dropdown ${self._spotifyDropdownOpen ? 'open' : ''}">
        <button
          class="dropdown-trigger"
          @click=${() => (self._spotifyDropdownOpen = !self._spotifyDropdownOpen)}
          aria-expanded=${self._spotifyDropdownOpen ? 'true' : 'false'}
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
                class="dropdown-item ${id === self._spotifyEntity ? 'active' : ''}"
                role="option"
                aria-selected=${id === self._spotifyEntity ? 'true' : 'false'}
                @click=${() => self._selectSpotifyEntity(id)}
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
      <div class="feature-list">
        <button
          class="feature-row"
          @click=${() => { self._spotifySortOrder = 'recent_first'; }}
        >
          <div class="feature-icon">
            <ha-icon .icon=${'mdi:sort-clock-descending'}></ha-icon>
          </div>
          <div class="feature-text">
            <div class="feature-name">${t('config.spotify_sort_recent')}</div>
          </div>
          <span
            class="toggle ${self._spotifySortOrder === 'recent_first' ? 'on' : ''}"
            role="switch"
            aria-checked=${self._spotifySortOrder === 'recent_first' ? 'true' : 'false'}
          ></span>
        </button>
        <button
          class="feature-row"
          @click=${() => { self._spotifySortOrder = 'oldest_first'; }}
        >
          <div class="feature-icon">
            <ha-icon .icon=${'mdi:sort-clock-ascending'}></ha-icon>
          </div>
          <div class="feature-text">
            <div class="feature-name">${t('config.spotify_sort_oldest')}</div>
          </div>
          <span
            class="toggle ${self._spotifySortOrder === 'oldest_first' ? 'on' : ''}"
            role="switch"
            aria-checked=${self._spotifySortOrder === 'oldest_first' ? 'true' : 'false'}
          ></span>
        </button>
      </div>

      <div class="section-label">${t('config.spotify_max_items')}</div>
      <div class="section-desc">${t('config.spotify_max_items_desc')}</div>
      <div style="display: flex; align-items: center; gap: 12px; padding: 4px 0;">
        <input
          type="range"
          min="1"
          max="20"
          .value=${String(self._spotifyMaxItems)}
          @input=${(e: Event) => { self._spotifyMaxItems = parseInt((e.target as HTMLInputElement).value, 10); }}
          style="flex: 1; accent-color: #1DB954;"
        />
        <span style="
          font-size: 13px; font-weight: 600; color: var(--t1);
          min-width: 28px; text-align: center;
        ">${self._spotifyMaxItems}</span>
      </div>

      <div class="section-label">${t('config.spotify_speakers')}</div>
      <div class="section-desc">${t('config.spotify_speakers_desc')}</div>
      ${(() => {
        const allSpeakers = self.hass
          ? Object.entries(self.hass.states)
              .filter(([id]) => id.startsWith('media_player.'))
              .map(([id, entity]) => ({
                entityId: id,
                name: (entity.attributes.friendly_name as string) ?? id,
                visible: self._spotifyVisibleSpeakers.includes(id),
              }))
          : [];
        // Selected speakers in order, then unselected sorted alphabetically
        const selected = self._spotifyVisibleSpeakers
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
              const visIdx = isSelected ? self._spotifyVisibleSpeakers.indexOf(sp.entityId) : -1;
              const isDragging = self._dragIdx === visIdx && visIdx !== -1 && self._dragContext === 'speakers';
              const isDropTarget = self._dropIdx === visIdx && visIdx !== -1 && self._dragContext === 'speakers';
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
                  @dragstart=${() => { if (isSelected && visIdx !== -1) self._onDragStart(visIdx, 'speakers'); }}
                  @dragover=${(e: DragEvent) => { if (isSelected && visIdx !== -1) self._onDragOver(visIdx, e); }}
                  @dragleave=${() => self._onDragLeave()}
                  @drop=${(e: DragEvent) => { if (isSelected && visIdx !== -1) self._onDropSpeaker(visIdx, e); }}
                  @dragend=${() => self._onDragEnd()}
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
                    @click=${() => self._toggleSpotifySpeaker(sp.entityId)}
                    role="switch"
                    aria-checked=${isSelected ? 'true' : 'false'}
                    aria-label="${isSelected ? t('common.hide') : t('common.show')} ${sp.name}"
                  ></button>
                </div>
              `;
            })}
          </div>
        `;
      })()}

      <div class="save-bar">
        <button class="btn btn-ghost" @click=${() => self._loadSpotifyConfig()}>${t('common.reset')}</button>
      </div>
    </div>
  `;
}

export function renderSpotifySetupGuide(_self: GlassConfigPanel) {
  return html`
    <div class="tab-panel" id="panel-spotify">
      <div style="
        padding: 20px; border-radius: var(--radius-lg);
        background: var(--s2); border: 1px solid var(--b2);
        text-align: center;
      ">
        <ha-icon .icon=${'mdi:spotify'} style="
          color: #1DB954; --mdc-icon-size: 48px;
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 16px;
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
              display: flex; align-items: flex-start; gap: 10px;
              margin-bottom: 12px; font-size: 13px; color: var(--t2);
            ">
              <span style="
                flex-shrink: 0; width: 22px; height: 22px;
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
          font-size: 12px; color: var(--t3); margin-top: 16px;
          padding: 10px; border-radius: var(--radius-md);
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

export function selectSpotifyEntity(self: GlassConfigPanel, entityId: string) {
  self._spotifyEntity = entityId;
  self._spotifyDropdownOpen = false;
}

export function toggleSpotifySpeaker(self: GlassConfigPanel, entityId: string) {
  if (self._spotifyVisibleSpeakers.includes(entityId)) {
    self._spotifyVisibleSpeakers = self._spotifyVisibleSpeakers.filter((id) => id !== entityId);
  } else {
    self._spotifyVisibleSpeakers = [...self._spotifyVisibleSpeakers, entityId];
  }
}

export function onDropSpeaker(self: GlassConfigPanel, idx: number, e: DragEvent) {
  e.preventDefault();
  if (self._dragIdx === null || self._dragIdx === idx || self._dragContext !== 'speakers') {
    self._dragIdx = null;
    self._dropIdx = null;
    return;
  }
  // Reorder within visible_speakers only
  const arr = [...self._spotifyVisibleSpeakers];
  if (self._dragIdx >= arr.length || idx >= arr.length) {
    self._dragIdx = null;
    self._dropIdx = null;
    return;
  }
  const [moved] = arr.splice(self._dragIdx, 1);
  arr.splice(idx, 0, moved);
  self._spotifyVisibleSpeakers = arr;
  self._dragIdx = null;
  self._dropIdx = null;
}
