import { html, nothing } from 'lit';
import { t } from '@glass-cards/i18n';
import type { GlassConfigPanel } from '../index';

const PREVIEW_DC_ICONS: Record<string, [string, string]> = {
  shutter: ['mdi:window-shutter-open', 'mdi:window-shutter'],
  blind: ['mdi:blinds-open', 'mdi:blinds'],
  curtain: ['mdi:curtains', 'mdi:curtains'],
  garage: ['mdi:garage-open', 'mdi:garage'],
  gate: ['mdi:gate-open', 'mdi:gate'],
  door: ['mdi:door-open', 'mdi:door-closed'],
};

function renderCoverPreviewRow(
  self: GlassConfigPanel,
  e: { entityId: string; name: string; visible: boolean; deviceClass: string; layout: 'full' | 'compact' },
  compact: boolean,
  isRight: boolean,
) {
  const icons = PREVIEW_DC_ICONS[e.deviceClass] || PREVIEW_DC_ICONS.shutter;
  const entity = self.hass?.states[e.entityId];
  const isOpen = entity?.state === 'open' || entity?.state === 'opening';
  const pos = entity?.attributes.current_position as number | undefined;

  return html`
    <div style="display:flex;align-items:center;gap:6px;padding:4px 2px;position:relative;z-index:1;${compact ? 'min-width:0;overflow:hidden;' : 'grid-column:1/-1;'}${isRight ? 'padding-left:8px;border-left:1px solid var(--b2);' : ''}">
      <div style="width:22px;height:22px;border-radius:6px;background:${isOpen ? 'rgba(167,139,250,0.1)' : 'var(--s2)'};border:1px solid ${isOpen ? 'rgba(167,139,250,0.15)' : 'var(--b1)'};display:flex;align-items:center;justify-content:center;">
        <ha-icon .icon=${icons[isOpen ? 0 : 1]} style="--mdc-icon-size:13px;color:${isOpen ? '#a78bfa' : 'var(--t3)'};display:flex;align-items:center;justify-content:center;${isOpen ? 'filter:drop-shadow(0 0 4px rgba(167,139,250,0.4));' : ''}"></ha-icon>
      </div>
      <div style="flex:1;min-width:0;">
        <div style="font-size:10px;font-weight:600;color:var(--t1);overflow:hidden;white-space:nowrap;text-overflow:ellipsis;">${e.name}</div>
        <div style="display:flex;align-items:center;gap:4px;margin-top:1px;">
          <span style="font-size:8px;color:${isOpen ? 'rgba(167,139,250,0.6)' : 'var(--t4)'};">${isOpen ? t('cover.open') : t('cover.closed')}</span>
        </div>
      </div>
      ${!compact && pos !== undefined ? html`
        <span style="font-size:12px;font-weight:700;color:${isOpen ? '#a78bfa' : 'var(--t3)'};font-variant-numeric:tabular-nums;">${pos}<span style="font-size:8px;font-weight:500;">%</span></span>
      ` : nothing}
      <div style="width:6px;height:6px;border-radius:50%;flex-shrink:0;background:${isOpen ? '#a78bfa' : 'var(--t4)'};${isOpen ? 'box-shadow:0 0 6px rgba(167,139,250,0.4);' : ''}"></div>
    </div>
  `;
}

function renderCoverPreviewRows(
  self: GlassConfigPanel,
  entities: { entityId: string; name: string; visible: boolean; deviceClass: string; layout: 'full' | 'compact' }[],
) {
  const results: unknown[] = [];
  let i = 0;
  while (i < entities.length) {
    const e = entities[i];
    const isCompact = e.layout === 'compact';
    if (isCompact && i + 1 < entities.length && entities[i + 1].layout === 'compact') {
      results.push(renderCoverPreviewRow(self, e, true, false));
      results.push(renderCoverPreviewRow(self, entities[i + 1], true, true));
      i += 2;
    } else {
      results.push(renderCoverPreviewRow(self, e, false, false));
      i++;
    }
  }
  return results;
}

export function renderCoverPreview(self: GlassConfigPanel) {
  const entities = self._coverRoomEntities.filter((e) => e.visible);
  const openCount = entities.filter((e) => {
    const s = self.hass?.states[e.entityId];
    return s?.state === 'open' || s?.state === 'opening';
  }).length;

  return html`
    <div class="preview-cover">
      ${self._coverShowHeader ? html`
        <div style="display:flex;align-items:center;justify-content:space-between;padding:0 4px 4px;">
          <div style="display:flex;align-items:center;gap:6px;">
            <span style="font-size:8px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:var(--t4);">${t('cover.title')}</span>
            <span style="font-size:8px;font-weight:600;padding:1px 4px;border-radius:8px;background:${openCount > 0 ? 'rgba(167,139,250,0.15)' : 'var(--s2)'};color:${openCount > 0 ? '#a78bfa' : 'var(--t3)'};">${openCount}/${entities.length}</span>
          </div>
          <div style="display:flex;gap:3px;">
            <div style="width:18px;height:18px;border-radius:4px;background:var(--s2);border:1px solid var(--b2);display:flex;align-items:center;justify-content:center;">
              <ha-icon .icon=${'mdi:arrow-up'} style="--mdc-icon-size:10px;color:var(--t3);display:flex;align-items:center;justify-content:center;"></ha-icon>
            </div>
            <div style="width:18px;height:18px;border-radius:4px;background:var(--s2);border:1px solid var(--b2);display:flex;align-items:center;justify-content:center;">
              <ha-icon .icon=${'mdi:arrow-down'} style="--mdc-icon-size:10px;color:var(--t3);display:flex;align-items:center;justify-content:center;"></ha-icon>
            </div>
          </div>
        </div>
      ` : nothing}
      <div class="preview-cover-card glass" style="padding:8px 10px;display:grid;grid-template-columns:1fr 1fr;gap:0;position:relative;">
        <!-- Tint -->
        <div style="position:absolute;inset:0;border-radius:inherit;pointer-events:none;background:radial-gradient(ellipse at 50% 50%,#a78bfa,transparent 70%);opacity:${entities.length > 0 ? (openCount / entities.length * 0.18).toFixed(3) : '0'};"></div>
        ${entities.length === 0 ? html`
          <div style="padding:8px;text-align:center;font-size:10px;color:var(--t4);grid-column:1/-1;">—</div>
        ` : nothing}
        ${renderCoverPreviewRows(self, entities.slice(0, 4))}
        ${entities.length > 4 ? html`
          <div style="font-size:9px;color:var(--t4);text-align:center;padding-top:2px;position:relative;z-index:1;grid-column:1/-1;">+${entities.length - 4}</div>
        ` : nothing}
      </div>
    </div>
  `;
}

export function renderCoverTab(self: GlassConfigPanel) {
  if (!self.hass) return nothing;

  const currentRoom = self._rooms.find((r) => r.areaId === self._coverRoom);

  return html`
    <div class="tab-panel" id="panel-cover">
      <div class="section-label">${t('config.behavior')}</div>
      <div class="feature-list">
        <button
          class="feature-row"
          role="switch"
          aria-checked=${self._coverShowHeader ? 'true' : 'false'}
          @click=${() => { self._coverShowHeader = !self._coverShowHeader; }}
        >
          <div class="feature-icon">
            <ha-icon .icon=${'mdi:page-layout-header'}></ha-icon>
          </div>
          <div class="feature-text">
            <div class="feature-name">${t('config.cover_show_header')}</div>
            <div class="feature-desc">${t('config.cover_show_header_desc')}</div>
          </div>
          <span
            class="toggle ${self._coverShowHeader ? 'on' : ''}"
          ></span>
        </button>
      </div>

      <!-- Per-room cover config -->
      <div class="section-label">${t('config.cover_room')}</div>
      <div class="section-desc">${t('config.cover_room_desc')}</div>

      <!-- Room selector dropdown -->
      <div class="dropdown ${self._coverRoomDropdownOpen ? 'open' : ''}">
        <button
          class="dropdown-trigger"
          @click=${() => { self._coverRoomDropdownOpen = !self._coverRoomDropdownOpen; }}
          aria-expanded=${self._coverRoomDropdownOpen ? 'true' : 'false'}
          aria-haspopup="listbox"
        >
          <ha-icon .icon=${currentRoom?.icon || 'mdi:home'}></ha-icon>
          <span>${currentRoom?.name || t('common.select')}</span>
          <ha-icon class="arrow" .icon=${'mdi:chevron-down'}></ha-icon>
        </button>
        <div class="dropdown-menu" role="listbox">
          ${self._rooms.map((r) => html`
            <button
              class="dropdown-item ${r.areaId === self._coverRoom ? 'active' : ''}"
              role="option"
              aria-selected=${r.areaId === self._coverRoom ? 'true' : 'false'}
              @click=${() => self._selectCoverRoom(r.areaId)}
            >
              <ha-icon .icon=${r.icon}></ha-icon>
              ${r.name}
            </button>
          `)}
        </div>
      </div>

      ${self._coverRoom ? html`
        ${self._coverRoomEntities.length > 0 ? html`
          <div class="section-label">${t('config.cover_list_title')} (${self._coverRoomEntities.length})</div>
          <div class="section-desc">${t('config.cover_list_banner')}</div>
          <div class="item-list">
            ${self._coverRoomEntities.map((e, idx) => {
              const isDragging = self._dragIdx === idx && self._dragContext === 'covers';
              const isDropTarget = self._dropIdx === idx && self._dragContext === 'covers';
              const isExpanded = self._coverPresetsExpandedEntity === e.entityId;
              const hasCustomPresets = !!self._coverEntityPresets[e.entityId];
              const rowClasses = [
                'item-row',
                !e.visible ? 'disabled' : '',
                isDragging ? 'dragging' : '',
                isDropTarget ? 'drop-target' : '',
              ].filter(Boolean).join(' ');
              const wrapClasses = ['item-card', isExpanded ? 'expanded' : ''].filter(Boolean).join(' ');
              return html`
                <div class=${wrapClasses}>
                  <div
                    class=${rowClasses}
                    draggable="true"
                    @dragstart=${() => self._onDragStart(idx, 'covers')}
                    @dragover=${(ev: DragEvent) => self._onDragOver(idx, ev)}
                    @dragleave=${() => self._onDragLeave()}
                    @drop=${(ev: DragEvent) => self._onDropCover(idx, ev)}
                    @dragend=${() => self._onDragEnd()}
                  >
                    <span class="drag-handle">
                      <ha-icon .icon=${'mdi:drag'}></ha-icon>
                    </span>
                    <div class="item-info">
                      <span class="item-name">${e.name}</span>
                      <span class="item-meta">${e.entityId}</span>
                    </div>
                    <button
                      class="schedule-btn ${hasCustomPresets ? 'active' : ''}"
                      @click=${() => self._toggleCoverPresetsExpand(e.entityId)}
                      aria-label="${t('config.cover_entity_presets')}"
                      aria-expanded=${isExpanded ? 'true' : 'false'}
                      title="${t('config.cover_entity_presets')}"
                    >
                      <ha-icon .icon=${'mdi:tune-vertical'}></ha-icon>
                    </button>
                    <button
                      class="layout-btn"
                      @click=${() => self._cycleCoverLayout(e.entityId)}
                      aria-label="${t('config.light_change_layout_aria')}"
                      title="${t(e.layout === 'compact' ? 'config.light_layout_compact' : 'config.light_layout_full')}"
                    >
                      ${t(e.layout === 'compact' ? 'config.light_layout_compact' : 'config.light_layout_full')}
                    </button>
                    <button
                      class="toggle ${e.visible ? 'on' : ''}"
                      @click=${() => self._toggleCoverEntityVisibility(e.entityId)}
                      role="switch"
                      aria-checked=${e.visible ? 'true' : 'false'}
                      aria-label="${e.visible ? t('common.hide') : t('common.show')} ${e.name}"
                    ></button>
                  </div>
                  <div class="fold-sep ${isExpanded ? 'visible' : ''}"></div>
                  <div class="schedule-fold ${isExpanded ? 'open' : ''}">
                    <div class="schedule-fold-inner">
                      <div style="padding:8px 12px 10px 36px;">
                        <div style="font-size:9px;font-weight:600;color:var(--t4);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:6px;">${t('config.cover_entity_presets')}</div>
                        <div style="display:flex;flex-wrap:wrap;gap:4px;align-items:center;">
                          ${(self._coverEntityPresets[e.entityId] ?? self._coverPresets).map((p) => {
                            const pIcon = p >= 50 ? 'mdi:window-shutter-open' : 'mdi:window-shutter';
                            const isCustom = !!self._coverEntityPresets[e.entityId];
                            return html`
                              <span style="
                                display:inline-flex;align-items:center;gap:3px;
                                padding:3px 7px;border-radius:var(--radius-md);
                                border:1px solid ${isCustom ? 'rgba(167,139,250,0.2)' : 'var(--b2)'};
                                background:${isCustom ? 'rgba(167,139,250,0.05)' : 'var(--s1)'};
                                font-size:10px;font-weight:600;color:${isCustom ? 'var(--c-accent)' : 'var(--t3)'};
                              ">
                                <ha-icon .icon=${pIcon} style="--mdc-icon-size:12px;display:flex;align-items:center;justify-content:center;"></ha-icon>
                                ${p === 0 ? t('cover.preset_closed') : p === 100 ? t('cover.preset_open') : `${p}%`}
                                ${isCustom ? html`
                                  <button
                                    style="background:none;border:none;cursor:pointer;padding:0;display:flex;align-items:center;justify-content:center;color:var(--t4);transition:color var(--t-fast);"
                                    @click=${() => self._removeCoverEntityPreset(e.entityId, p)}
                                    aria-label="${t('common.delete')} ${p}%"
                                  >
                                    <ha-icon .icon=${'mdi:close'} style="--mdc-icon-size:10px;display:flex;align-items:center;justify-content:center;"></ha-icon>
                                  </button>
                                ` : nothing}
                              </span>
                            `;
                          })}
                          <span style="display:inline-flex;align-items:center;gap:3px;">
                            <input
                              class="input"
                              type="number"
                              min="0"
                              max="100"
                              step="5"
                              .value=${self._coverEntityPresetInput[e.entityId] ?? ''}
                              @input=${(ev: Event) => { self._coverEntityPresetInput = { ...self._coverEntityPresetInput, [e.entityId]: (ev.target as HTMLInputElement).value }; }}
                              @keydown=${(ev: KeyboardEvent) => { if (ev.key === 'Enter') self._addCoverEntityPreset(e.entityId); }}
                              placeholder="%"
                              style="width:48px;font-size:10px;padding:3px 6px;"
                            />
                            <button
                              style="
                                display:inline-flex;align-items:center;
                                padding:3px 6px;border-radius:var(--radius-md);
                                border:1px solid rgba(167,139,250,0.3);background:rgba(167,139,250,0.1);
                                font-size:10px;font-weight:600;color:var(--c-accent);
                                cursor:pointer;font-family:inherit;
                                opacity:${self._coverEntityPresetInput[e.entityId] ? '1' : '0.4'};
                                pointer-events:${self._coverEntityPresetInput[e.entityId] ? 'auto' : 'none'};
                                transition:opacity var(--t-fast);
                              "
                              @click=${() => self._addCoverEntityPreset(e.entityId)}
                              aria-label="${t('config.cover_preset_add')}"
                            >
                              <ha-icon .icon=${'mdi:plus'} style="--mdc-icon-size:12px;display:flex;align-items:center;justify-content:center;"></ha-icon>
                            </button>
                            ${self._coverEntityPresets[e.entityId] ? html`
                              <button
                                style="
                                  display:inline-flex;align-items:center;gap:2px;
                                  padding:3px 6px;border-radius:var(--radius-md);
                                  border:1px solid var(--b2);background:var(--s1);
                                  font-size:9px;font-weight:600;color:var(--t4);
                                  cursor:pointer;font-family:inherit;
                                  transition:all var(--t-fast);
                                "
                                @click=${() => self._resetCoverEntityPresets(e.entityId)}
                                aria-label="${t('common.reset')}"
                              >
                                <ha-icon .icon=${'mdi:restore'} style="--mdc-icon-size:12px;display:flex;align-items:center;justify-content:center;"></ha-icon>
                              </button>
                            ` : nothing}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              `;
            })}
          </div>
        ` : html`
          <div class="banner">
            <ha-icon .icon=${'mdi:blinds-open'}></ha-icon>
            <span>${t('config.cover_no_covers')}</span>
          </div>
        `}
      ` : nothing}

      <!-- Preset config -->
      <div class="section-label">${t('config.cover_presets')}</div>
      <div class="section-desc">${t('config.cover_presets_desc')}</div>

      <div style="display:flex;flex-wrap:wrap;gap:6px;align-items:center;">
        ${self._coverPresets.map((p) => {
          const pIcon = p >= 50 ? 'mdi:window-shutter-open' : 'mdi:window-shutter';
          return html`
            <span style="
              display:inline-flex;align-items:center;gap:4px;
              padding:5px 10px;border-radius:var(--radius-md);
              border:1px solid var(--b2);background:var(--s1);
              font-size:11px;font-weight:600;color:var(--t2);
            ">
              <ha-icon .icon=${pIcon} style="--mdc-icon-size:14px;display:flex;align-items:center;justify-content:center;"></ha-icon>
              ${p === 0 ? t('cover.preset_closed') : p === 100 ? t('cover.preset_open') : `${p}%`}
              <button
                style="
                  background:none;border:none;cursor:pointer;padding:0;
                  display:flex;align-items:center;justify-content:center;
                  color:var(--t4);transition:color var(--t-fast);
                "
                @click=${() => self._removeCoverPreset(p)}
                aria-label="${t('common.delete')} ${p}%"
              >
                <ha-icon .icon=${'mdi:close'} style="--mdc-icon-size:12px;display:flex;align-items:center;justify-content:center;"></ha-icon>
              </button>
            </span>
          `;
        })}
        <span style="display:inline-flex;align-items:center;gap:4px;">
          <input
            class="input"
            type="number"
            min="0"
            max="100"
            step="5"
            .value=${self._coverPresetInput}
            @input=${(e: Event) => { self._coverPresetInput = (e.target as HTMLInputElement).value; }}
            @keydown=${(e: KeyboardEvent) => { if (e.key === 'Enter') self._addCoverPreset(); }}
            placeholder=${t('config.cover_preset_placeholder')}
            style="width:64px;font-size:11px;padding:5px 8px;"
          />
          <button
            style="
              display:inline-flex;align-items:center;gap:4px;
              padding:5px 10px;border-radius:var(--radius-md);
              border:1px solid rgba(167,139,250,0.3);background:rgba(167,139,250,0.1);
              font-size:11px;font-weight:600;color:var(--c-accent);
              cursor:pointer;font-family:inherit;
              opacity:${self._coverPresetInput ? '1' : '0.4'};
              pointer-events:${self._coverPresetInput ? 'auto' : 'none'};
              transition:opacity var(--t-fast);
            "
            @click=${() => self._addCoverPreset()}
          >
            <ha-icon .icon=${'mdi:plus'} style="--mdc-icon-size:14px;display:flex;align-items:center;justify-content:center;"></ha-icon>
            ${t('config.cover_preset_add')}
          </button>
        </span>
      </div>

      <div class="save-bar">
        <button class="btn btn-ghost" @click=${() => self._resetCover()}>${t('common.reset')}</button>
      </div>
    </div>
  `;
}

export function selectCoverRoom(self: GlassConfigPanel, areaId: string) {
  self._coverRoom = areaId;
  self._coverRoomDropdownOpen = false;
  self._loadRoomCovers();
}

export function toggleCoverEntityVisibility(self: GlassConfigPanel, entityId: string) {
  self._coverRoomEntities = self._coverRoomEntities.map((e) =>
    e.entityId === entityId ? { ...e, visible: !e.visible } : e,
  );
}

export function getAllCoverEntities(self: GlassConfigPanel): { entityId: string; name: string }[] {
  if (!self.hass) return [];
  const covers: { entityId: string; name: string }[] = [];
  for (const [id, entity] of Object.entries(self.hass.states)) {
    if (!id.startsWith('cover.')) continue;
    const name = (entity.attributes?.friendly_name as string) || id.split('.')[1] || id;
    covers.push({ entityId: id, name });
  }
  return covers.sort((a, b) => a.name.localeCompare(b.name));
}

export function toggleCoverDashboardEntity(self: GlassConfigPanel, entityId: string) {
  const set = new Set(self._coverDashboardEntities);
  if (set.has(entityId)) {
    set.delete(entityId);
    self._coverDashboardOrder = self._coverDashboardOrder.filter((id) => id !== entityId);
  } else {
    set.add(entityId);
    if (!self._coverDashboardOrder.includes(entityId)) {
      self._coverDashboardOrder = [...self._coverDashboardOrder, entityId];
    }
  }
  self._coverDashboardEntities = [...set];
}

export function initCoverDashboardOrder(self: GlassConfigPanel) {
  const all = new Set(self._getAllCoverEntities().map((c) => c.entityId));
  // Preserve saved order (dashboard_entities from backend), then append any new entities
  const ordered = self._coverDashboardEntities.filter((id) => all.has(id));
  const remaining = [...all].filter((id) => !self._coverDashboardEntities.includes(id));
  self._coverDashboardOrder = [...ordered, ...remaining];
}

export function onDropDashboardCover(self: GlassConfigPanel, idx: number, e: DragEvent) {
  e.preventDefault();
  if (self._dragIdx === null || self._dragIdx === idx || self._dragContext !== 'dashboard_covers') {
    self._dragIdx = null;
    self._dropIdx = null;
    return;
  }
  const arr = [...self._coverDashboardOrder];
  const [moved] = arr.splice(self._dragIdx, 1);
  arr.splice(idx, 0, moved);
  self._coverDashboardOrder = arr;
  self._dragIdx = null;
  self._dropIdx = null;
}

export function onDropCover(self: GlassConfigPanel, idx: number, e: DragEvent) {
  e.preventDefault();
  if (self._dragIdx === null || self._dragIdx === idx || self._dragContext !== 'covers') {
    self._dragIdx = null;
    self._dropIdx = null;
    return;
  }
  const arr = [...self._coverRoomEntities];
  const [moved] = arr.splice(self._dragIdx, 1);
  arr.splice(idx, 0, moved);
  self._coverRoomEntities = arr;
  self._dragIdx = null;
  self._dropIdx = null;
}

export function addCoverPreset(self: GlassConfigPanel) {
  const val = parseInt(self._coverPresetInput, 10);
  if (isNaN(val) || val < 0 || val > 100) return;
  if (self._coverPresets.includes(val)) { self._coverPresetInput = ''; return; }
  self._coverPresets = [...self._coverPresets, val].sort((a, b) => a - b);
  self._coverPresetInput = '';
}

export function removeCoverPreset(self: GlassConfigPanel, val: number) {
  self._coverPresets = self._coverPresets.filter((p) => p !== val);
}

export function addCoverEntityPreset(self: GlassConfigPanel, entityId: string) {
  const raw = self._coverEntityPresetInput[entityId] ?? '';
  const val = parseInt(raw, 10);
  if (isNaN(val) || val < 0 || val > 100) return;
  const current = self._coverEntityPresets[entityId] ?? [...self._coverPresets];
  if (current.includes(val)) {
    self._coverEntityPresetInput = { ...self._coverEntityPresetInput, [entityId]: '' };
    return;
  }
  self._coverEntityPresets = {
    ...self._coverEntityPresets,
    [entityId]: [...current, val].sort((a, b) => a - b),
  };
  self._coverEntityPresetInput = { ...self._coverEntityPresetInput, [entityId]: '' };
}

export function removeCoverEntityPreset(self: GlassConfigPanel, entityId: string, val: number) {
  const current = self._coverEntityPresets[entityId];
  if (!current) return;
  const updated = current.filter((p) => p !== val);
  if (updated.length === 0) {
    const ep = { ...self._coverEntityPresets };
    delete ep[entityId];
    self._coverEntityPresets = ep;
  } else {
    self._coverEntityPresets = { ...self._coverEntityPresets, [entityId]: updated };
  }
}

export function resetCoverEntityPresets(self: GlassConfigPanel, entityId: string) {
  const ep = { ...self._coverEntityPresets };
  delete ep[entityId];
  self._coverEntityPresets = ep;
}

export function cycleCoverLayout(self: GlassConfigPanel, entityId: string) {
  self._coverRoomEntities = self._coverRoomEntities.map((e) =>
    e.entityId === entityId ? { ...e, layout: e.layout === 'full' ? 'compact' : 'full' } : e,
  );
}
