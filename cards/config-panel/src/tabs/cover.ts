import { html, nothing } from 'lit';
import { t } from '@glass-cards/i18n';
import type { GlassConfigPanel } from '../index';

export function renderCoverPreview(self: GlassConfigPanel) {
  const entities = self._coverRoomEntities.filter((e) => e.visible);
  const DC_ICONS: Record<string, [string, string]> = {
    shutter: ['mdi:window-shutter-open', 'mdi:window-shutter'],
    blind: ['mdi:blinds-open', 'mdi:blinds'],
    curtain: ['mdi:curtains', 'mdi:curtains'],
    garage: ['mdi:garage-open', 'mdi:garage'],
    gate: ['mdi:gate-open', 'mdi:gate'],
    door: ['mdi:door-open', 'mdi:door-closed'],
  };
  // Pick the first entity with real HA state as the "expanded" one
  const expandedEntity = entities.length > 0 ? entities[0] : null;
  const expandedHaState = expandedEntity ? self.hass?.states[expandedEntity.entityId] : null;
  const expandedIsOpen = expandedHaState?.state === 'open' || expandedHaState?.state === 'opening';
  const expandedPos = expandedHaState?.attributes.current_position as number | undefined;
  const expandedFeatures = (expandedHaState?.attributes.supported_features as number) || 0;
  const hasPosition = !!(expandedFeatures & 4); // SET_POSITION
  const posVal = expandedPos ?? (expandedIsOpen ? 100 : 0);
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
      <div class="preview-cover-card glass" style="padding:8px 10px;display:flex;flex-direction:column;gap:2px;position:relative;">
        <!-- Tint -->
        <div style="position:absolute;inset:0;border-radius:inherit;pointer-events:none;background:radial-gradient(ellipse at 50% 50%,#a78bfa,transparent 70%);opacity:${entities.length > 0 ? (openCount / entities.length * 0.18).toFixed(3) : '0'};"></div>
        ${entities.length === 0 ? html`
          <div style="padding:8px;text-align:center;font-size:10px;color:var(--t4);">—</div>
        ` : nothing}
        ${entities.slice(0, 3).map((e, idx) => {
          const icons = DC_ICONS[e.deviceClass] || DC_ICONS.shutter;
          const entity = self.hass?.states[e.entityId];
          const isOpen = entity?.state === 'open' || entity?.state === 'opening';
          const pos = entity?.attributes.current_position as number | undefined;
          const isExpanded = idx === 0;
          return html`
            <!-- Row -->
            <div style="display:flex;align-items:center;gap:6px;padding:4px 2px;position:relative;z-index:1;">
              <div style="width:22px;height:22px;border-radius:6px;background:${isOpen ? 'rgba(167,139,250,0.1)' : 'var(--s2)'};border:1px solid ${isOpen ? 'rgba(167,139,250,0.15)' : 'var(--b1)'};display:flex;align-items:center;justify-content:center;">
                <ha-icon .icon=${icons[isOpen ? 0 : 1]} style="--mdc-icon-size:13px;color:${isOpen ? '#a78bfa' : 'var(--t3)'};display:flex;align-items:center;justify-content:center;${isOpen ? 'filter:drop-shadow(0 0 4px rgba(167,139,250,0.4));' : ''}"></ha-icon>
              </div>
              <div style="flex:1;min-width:0;">
                <div style="font-size:10px;font-weight:600;color:var(--t1);overflow:hidden;white-space:nowrap;text-overflow:ellipsis;">${e.name}</div>
                <div style="display:flex;align-items:center;gap:4px;margin-top:1px;">
                  <span style="font-size:8px;color:${isOpen ? 'rgba(167,139,250,0.6)' : 'var(--t4)'};">${isOpen ? t('cover.open') : t('cover.closed')}</span>
                </div>
              </div>
              ${pos !== undefined ? html`
                <span style="font-size:12px;font-weight:700;color:${isOpen ? '#a78bfa' : 'var(--t3)'};font-variant-numeric:tabular-nums;">${pos}<span style="font-size:8px;font-weight:500;">%</span></span>
              ` : nothing}
              <div style="width:6px;height:6px;border-radius:50%;background:${isOpen ? '#a78bfa' : 'var(--t4)'};${isOpen ? 'box-shadow:0 0 6px rgba(167,139,250,0.4);' : ''}"></div>
            </div>
            ${isExpanded ? html`
              <!-- Expanded controls for first entity -->
              <div style="height:1px;margin:0 8px;background:linear-gradient(90deg,transparent,rgba(167,139,250,0.25),transparent);"></div>
              <div style="padding:4px 2px;display:flex;flex-direction:column;gap:6px;position:relative;z-index:1;">
                <span style="font-size:8px;font-weight:600;letter-spacing:0.5px;color:rgba(167,139,250,0.6);text-transform:uppercase;">${e.name}</span>
                <!-- Transport -->
                <div style="display:flex;align-items:center;justify-content:center;gap:4px;">
                  <div style="width:28px;height:28px;border-radius:8px;background:var(--s2);border:1px solid var(--b2);display:flex;align-items:center;justify-content:center;">
                    <ha-icon .icon=${'mdi:arrow-up'} style="--mdc-icon-size:14px;color:var(--t2);display:flex;align-items:center;justify-content:center;"></ha-icon>
                  </div>
                  <div style="width:28px;height:28px;border-radius:8px;background:var(--s2);border:1px solid var(--b2);display:flex;align-items:center;justify-content:center;">
                    <ha-icon .icon=${'mdi:stop'} style="--mdc-icon-size:14px;color:var(--t2);display:flex;align-items:center;justify-content:center;"></ha-icon>
                  </div>
                  <div style="width:28px;height:28px;border-radius:8px;background:var(--s2);border:1px solid var(--b2);display:flex;align-items:center;justify-content:center;">
                    <ha-icon .icon=${'mdi:arrow-down'} style="--mdc-icon-size:14px;color:var(--t2);display:flex;align-items:center;justify-content:center;"></ha-icon>
                  </div>
                </div>
                <!-- Position slider -->
                ${hasPosition ? html`
                  <div style="display:flex;align-items:center;gap:4px;">
                    <ha-icon .icon=${icons[1]} style="--mdc-icon-size:12px;color:var(--t3);display:flex;align-items:center;justify-content:center;"></ha-icon>
                    <div style="flex:1;height:22px;border-radius:var(--radius-lg);background:var(--s1);border:1px solid var(--b1);position:relative;overflow:hidden;">
                      <div style="position:absolute;top:0;left:0;height:100%;width:${posVal}%;border-radius:inherit;background:linear-gradient(90deg,rgba(167,139,250,0.15),rgba(167,139,250,0.25));"></div>
                      <div style="position:absolute;top:50%;left:${posVal}%;transform:translate(-50%,-50%);width:5px;height:14px;border-radius:3px;background:rgba(255,255,255,0.7);"></div>
                      <span style="position:absolute;top:50%;right:6px;transform:translateY(-50%);font-size:9px;font-weight:600;color:var(--t3);">${posVal}%</span>
                    </div>
                    <ha-icon .icon=${icons[0]} style="--mdc-icon-size:12px;color:var(--t3);display:flex;align-items:center;justify-content:center;"></ha-icon>
                  </div>
                ` : nothing}
                <!-- Presets -->
                <div style="height:1px;background:var(--b1);"></div>
                <div style="display:flex;gap:4px;flex-wrap:wrap;">
                  ${(self._coverEntityPresets[e.entityId] ?? self._coverPresets).map((p) => {
                    const isActive = posVal === p;
                    const pIsOpen = p >= 50;
                    const label = p === 0 ? t('cover.preset_closed') : p === 100 ? t('cover.preset_open') : `${p}%`;
                    return html`
                      <span style="
                        display:inline-flex;align-items:center;gap:3px;
                        padding:3px 7px;border-radius:var(--radius-md);
                        border:1px solid ${isActive ? 'rgba(167,139,250,0.15)' : 'var(--b2)'};
                        background:${isActive ? 'rgba(167,139,250,0.1)' : 'var(--s1)'};
                        font-size:9px;font-weight:600;
                        color:${isActive ? '#a78bfa' : 'var(--t3)'};
                      ">
                        <ha-icon .icon=${icons[pIsOpen ? 0 : 1]} style="--mdc-icon-size:10px;display:flex;align-items:center;justify-content:center;"></ha-icon>
                        ${label}
                      </span>
                    `;
                  })}
                </div>
              </div>
              <div style="height:1px;margin:0 8px;background:linear-gradient(90deg,transparent,rgba(167,139,250,0.25),transparent);"></div>
            ` : nothing}
          `;
        })}
        ${entities.length > 3 ? html`
          <div style="font-size:9px;color:var(--t4);text-align:center;padding-top:2px;position:relative;z-index:1;">+${entities.length - 3}</div>
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
      <div class="section-label">${t('config.navbar_behavior')}</div>
      <div class="feature-list">
        <button
          class="feature-row"
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
            role="switch"
            aria-checked=${self._coverShowHeader ? 'true' : 'false'}
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
              const rowClasses = [
                'item-row',
                !e.visible ? 'disabled' : '',
                isDragging ? 'dragging' : '',
                isDropTarget ? 'drop-target' : '',
              ].filter(Boolean).join(' ');
              return html`
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
                    class="toggle ${e.visible ? 'on' : ''}"
                    @click=${() => self._toggleCoverEntityVisibility(e.entityId)}
                    role="switch"
                    aria-checked=${e.visible ? 'true' : 'false'}
                    aria-label="${e.visible ? t('common.hide') : t('common.show')} ${e.name}"
                  ></button>
                </div>
                <!-- Per-entity presets -->
                ${e.visible ? html`
                  <div style="padding:2px 8px 8px 32px;">
                    <div style="font-size:9px;font-weight:600;color:var(--t4);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:4px;">${t('config.cover_entity_presets')}</div>
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
                ` : nothing}
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
  if (set.has(entityId)) set.delete(entityId);
  else set.add(entityId);
  self._coverDashboardEntities = [...set];
  // Re-sort _coverDashboardOrder: selected first, then unselected
  const newSet = new Set(self._coverDashboardEntities);
  const selected = self._coverDashboardOrder.filter((id) => newSet.has(id));
  const unselected = self._coverDashboardOrder.filter((id) => !newSet.has(id));
  self._coverDashboardOrder = [...selected, ...unselected];
}

export function initCoverDashboardOrder(self: GlassConfigPanel) {
  const all = self._getAllCoverEntities().map((c) => c.entityId);
  const selSet = new Set(self._coverDashboardEntities);
  // Keep existing order for entities already in _coverDashboardEntities, then append new ones
  const ordered = self._coverDashboardEntities.filter((id) => all.includes(id));
  const remaining = all.filter((id) => !selSet.has(id));
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
