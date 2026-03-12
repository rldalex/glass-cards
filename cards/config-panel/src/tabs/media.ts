import { html, nothing } from 'lit';
import { t } from '@glass-cards/i18n';
import type { GlassConfigPanel } from '../index';

/* ── Preview ── */

export function renderMediaPreview(self: GlassConfigPanel) {
  // Count total players for the selected room (native + extra)
  const roomId = self._mediaRoom;
  const nativeCount = self._mediaRoomNativePlayers.length;
  const extraCount = roomId ? (self._mediaExtraEntities[roomId] ?? []).length : 0;
  const totalCount = nativeCount + extraCount;
  const playingCount = roomId ? _countPlaying(self, roomId) : 1;

  return html`
    <div class="preview-media">
      <!-- Simulated full-bleed artwork background -->
      <div class="mp-art-bg"></div>
      <div class="mp-gradient"></div>
      <div class="mp-content">
        <!-- Top bar: glass pill badges -->
        <div class="mp-top">
          <div class="mp-pill">
            <ha-icon .icon=${'mdi:speaker'}></ha-icon>
            <span>${roomId ? (self._rooms.find((r) => r.areaId === roomId)?.name ?? t('config.media_room')) : t('config.media_select_room')}</span>
            ${playingCount > 0 ? html`
              <div class="mp-eq">
                <div class="mp-eq-bar"></div>
                <div class="mp-eq-bar"></div>
                <div class="mp-eq-bar"></div>
              </div>
            ` : nothing}
          </div>
          ${totalCount > 1 ? html`
            <div class="mp-pill">
              <ha-icon .icon=${'mdi:speaker-multiple'}></ha-icon>
              <span>${totalCount}</span>
            </div>
          ` : nothing}
        </div>
        <!-- Spacer -->
        <div class="mp-spacer"></div>
        <!-- Bottom glass panel -->
        <div class="mp-glass-panel">
          ${self._mediaShowHeader ? html`
            <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;">
              <span style="font-size:8px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:var(--t4);">${t('media.title')}</span>
              <span style="font-size:8px;font-weight:600;padding:1px 4px;border-radius:8px;background:rgba(96,165,250,0.15);color:#60a5fa;">${playingCount}/${totalCount || 1}</span>
            </div>
          ` : nothing}
          <div class="mp-track">
            <div class="mp-track-title">Blinding Lights</div>
            <div class="mp-track-artist">The Weeknd</div>
            <div class="mp-track-meta">
              <span class="mp-track-time">2:14 / 3:20</span>
              <span class="mp-track-source">Spotify</span>
            </div>
          </div>
          <!-- Progress -->
          <div class="mp-progress">
            <div class="mp-progress-fill"></div>
          </div>
          <!-- Transport -->
          <div class="mp-transport">
            <div class="mp-btn"><ha-icon .icon=${'mdi:shuffle-variant'}></ha-icon></div>
            <div class="mp-btn skip"><ha-icon .icon=${'mdi:skip-previous'}></ha-icon></div>
            <div class="mp-btn main"><ha-icon .icon=${'mdi:pause'}></ha-icon></div>
            <div class="mp-btn skip"><ha-icon .icon=${'mdi:skip-next'}></ha-icon></div>
            <div class="mp-btn"><ha-icon .icon=${'mdi:repeat'}></ha-icon></div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function _countPlaying(self: GlassConfigPanel, roomId: string): number {
  if (!self.hass) return 0;
  const allIds = [...self._mediaRoomNativePlayers, ...(self._mediaExtraEntities[roomId] ?? [])];
  return allIds.filter((id) => self.hass?.states[id]?.state === 'playing').length;
}

/* ── Tab ── */

export function renderMediaTab(self: GlassConfigPanel) {
  if (!self.hass) return nothing;

  const currentRoom = self._rooms.find((r) => r.areaId === self._mediaRoom);
  const roomId = self._mediaRoom;
  const extraEntities = roomId ? (self._mediaExtraEntities[roomId] ?? []) : [];

  // All media_player entities in HA (for search dropdown)
  const allMediaPlayers = Object.keys(self.hass.states)
    .filter((id) => id.startsWith('media_player.'))
    .sort();

  // Already assigned entities for this room
  const assignedSet = new Set([...self._mediaRoomNativePlayers, ...extraEntities]);

  // Available entities = all media_players not yet assigned to this room
  const search = self._mediaEntitySearch?.toLowerCase() ?? '';
  const available = allMediaPlayers.filter((id) => {
    if (assignedSet.has(id)) return false;
    if (!search) return true;
    const name = (self.hass?.states[id]?.attributes?.friendly_name as string ?? '').toLowerCase();
    return id.toLowerCase().includes(search) || name.includes(search);
  });

  return html`
    <div class="tab-panel" id="panel-media">
      <!-- Show header toggle -->
      <div class="section-label">${t('config.behavior')}</div>
      <div class="feature-list">
        <button
          class="feature-row"
          @click=${() => { self._mediaShowHeader = !self._mediaShowHeader; }}
        >
          <div class="feature-icon">
            <ha-icon .icon=${'mdi:page-layout-header'}></ha-icon>
          </div>
          <div class="feature-text">
            <div class="feature-name">${t('config.media_show_header')}</div>
            <div class="feature-desc">${t('config.media_show_header_desc')}</div>
          </div>
          <span
            class="toggle ${self._mediaShowHeader ? 'on' : ''}"
            role="switch"
            aria-checked=${self._mediaShowHeader ? 'true' : 'false'}
          ></span>
        </button>
      </div>

      <!-- Per-room extra entities -->
      <div class="section-label">${t('config.media_room')}</div>
      <div class="section-desc">${t('config.media_room_desc')}</div>

      <!-- Room selector dropdown -->
      <div class="dropdown ${self._mediaRoomDropdownOpen ? 'open' : ''}">
        <button
          class="dropdown-trigger"
          @click=${() => { self._mediaRoomDropdownOpen = !self._mediaRoomDropdownOpen; }}
          aria-expanded=${self._mediaRoomDropdownOpen ? 'true' : 'false'}
          aria-haspopup="listbox"
        >
          <ha-icon .icon=${currentRoom?.icon || 'mdi:home'}></ha-icon>
          <span>${currentRoom?.name || t('config.media_select_room')}</span>
          <ha-icon class="arrow" .icon=${'mdi:chevron-down'}></ha-icon>
        </button>
        <div class="dropdown-menu" role="listbox">
          ${self._rooms.map((r) => html`
            <button
              class="dropdown-item ${r.areaId === self._mediaRoom ? 'active' : ''}"
              role="option"
              aria-selected=${r.areaId === self._mediaRoom ? 'true' : 'false'}
              @click=${() => self._selectMediaRoom(r.areaId)}
            >
              <ha-icon .icon=${r.icon}></ha-icon>
              ${r.name}
            </button>
          `)}
        </div>
      </div>

      ${roomId ? html`
        <!-- Native players (read-only) -->
        <div class="section-label">${t('config.media_native_players')} (${self._mediaRoomNativePlayers.length})</div>
        <div class="section-desc">${t('config.media_native_players_desc')}</div>
        ${self._mediaRoomNativePlayers.length > 0 ? html`
          <div class="item-list">
            ${self._mediaRoomNativePlayers.map((id) => {
              const entity = self.hass?.states[id];
              const name = (entity?.attributes?.friendly_name as string) || id.split('.')[1] || id;
              const isPlaying = entity?.state === 'playing';
              return html`
                <div class="item-row">
                  <div class="item-info" style="padding-left:8px;">
                    <span class="item-name">${name}</span>
                    <span class="item-meta">${id}</span>
                  </div>
                  <div class="dot" style="background:${isPlaying ? '#60a5fa' : 'var(--t4)'};${isPlaying ? 'box-shadow:0 0 6px rgba(96,165,250,0.4);' : ''}"></div>
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
              const entity = self.hass?.states[id];
              const name = (entity?.attributes?.friendly_name as string) || id.split('.')[1] || id;
              return html`
                <div class="item-row">
                  <div class="item-info" style="padding-left:8px;">
                    <span class="item-name">${name}</span>
                    <span class="item-meta">${id}</span>
                  </div>
                  <button
                    class="btn-icon xs"
                    @click=${() => self._removeMediaExtraEntity(id)}
                    aria-label="${t('common.hide')} ${name}"
                  >
                    <ha-icon .icon=${'mdi:close'}></ha-icon>
                  </button>
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
        <div class="dropdown ${self._mediaAddDropdownOpen ? 'open' : ''}">
          <button
            class="dropdown-trigger"
            @click=${() => { self._mediaAddDropdownOpen = !self._mediaAddDropdownOpen; self._mediaEntitySearch = ''; }}
            aria-expanded=${self._mediaAddDropdownOpen ? 'true' : 'false'}
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
              .value=${self._mediaEntitySearch ?? ''}
              @input=${(e: Event) => { self._mediaEntitySearch = (e.target as HTMLInputElement).value; }}
              @click=${(e: Event) => e.stopPropagation()}
            />
            ${available.slice(0, 20).map((id) => {
              const entity = self.hass?.states[id];
              const name = (entity?.attributes?.friendly_name as string) || id.split('.')[1] || id;
              return html`
                <button
                  class="dropdown-item"
                  role="option"
                  @click=${() => { self._addMediaExtraEntity(id); self._mediaAddDropdownOpen = false; }}
                >
                  <ha-icon .icon=${'mdi:speaker'}></ha-icon>
                  ${name}
                </button>
              `;
            })}
            ${available.length === 0 ? html`
              <div style="padding:8px 12px;font-size:12px;color:var(--t4);text-align:center;">—</div>
            ` : nothing}
          </div>
        </div>
      ` : nothing}

      <div class="save-bar">
        <button class="btn btn-ghost" @click=${() => self._loadMediaConfig()}>${t('common.reset')}</button>
      </div>
    </div>
  `;
}

/* ── Helpers ── */

export function selectMediaRoom(self: GlassConfigPanel, areaId: string) {
  self._mediaRoom = areaId;
  self._mediaRoomDropdownOpen = false;
  self._mediaAddDropdownOpen = false;
  self._mediaEntitySearch = '';
  self._loadRoomMediaPlayers();
}

export function addMediaExtraEntity(self: GlassConfigPanel, entityId: string) {
  const roomId = self._mediaRoom;
  if (!roomId) return;
  const current = self._mediaExtraEntities[roomId] ?? [];
  if (current.includes(entityId)) return;
  self._mediaExtraEntities = {
    ...self._mediaExtraEntities,
    [roomId]: [...current, entityId],
  };
}

export function removeMediaExtraEntity(self: GlassConfigPanel, entityId: string) {
  const roomId = self._mediaRoom;
  if (!roomId) return;
  const current = self._mediaExtraEntities[roomId] ?? [];
  self._mediaExtraEntities = {
    ...self._mediaExtraEntities,
    [roomId]: current.filter((id) => id !== entityId),
  };
}
