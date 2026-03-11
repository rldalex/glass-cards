import { html, nothing } from 'lit';
import { t } from '@glass-cards/i18n';
import type { GlassConfigPanel } from '../index';

export function renderFanPreview(self: GlassConfigPanel) {
  // Use real room entities if a room is selected, otherwise mock data
  const roomEntities = self._fanRoomEntities.filter((e) => e.visible);
  const useMock = roomEntities.length === 0 && !self._fanRoom;

  const fans = useMock
    ? [
        { name: 'Ventilateur Salon', isOn: true, pct: 67, step: 2, total: 3, icon: 'mdi:fan' },
        { name: 'Plafonnier Chambre', isOn: true, pct: 50, step: 3, total: 6, icon: 'mdi:ceiling-fan' },
        { name: 'Extracteur SdB', isOn: false, pct: 0, step: 0, total: 3, icon: 'mdi:fan' },
      ]
    : roomEntities.map((e) => {
        const entity = self.hass?.states[e.entityId];
        const isOn = entity?.state === 'on';
        const pct = (entity?.attributes?.percentage as number) ?? 0;
        const speedCount = (entity?.attributes?.speed_count as number) ?? 3;
        const step = isOn ? Math.round((pct / 100) * speedCount) : 0;
        return { name: e.name, isOn, pct, step, total: speedCount, icon: 'mdi:fan' };
      });

  const onCount = fans.filter((f) => f.isOn).length;
  const accentRgba = 'rgba(129,140,248,';

  return html`
    <style>
      @keyframes spin-fan-preview {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
    </style>
    <div class="preview-fan">
      ${self._fanShowHeader ? html`
        <div style="display:flex;align-items:center;justify-content:space-between;padding:0 4px 4px;">
          <div style="display:flex;align-items:center;gap:6px;">
            <span style="font-size:8px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:var(--t4);">${t('fan.title')}</span>
            <span style="font-size:8px;font-weight:600;padding:1px 4px;border-radius:8px;background:${onCount > 0 ? `${accentRgba}0.15)` : 'var(--s2)'};color:${onCount > 0 ? '#818cf8' : 'var(--t3)'};">${onCount}/${fans.length}</span>
          </div>
          <div style="width:28px;height:14px;border-radius:7px;background:${onCount > 0 ? `${accentRgba}0.25)` : 'var(--s2)'};position:relative;">
            <div style="width:10px;height:10px;border-radius:50%;background:${onCount > 0 ? '#818cf8' : 'var(--t4)'};position:absolute;top:2px;${onCount > 0 ? 'right:2px;' : 'left:2px;'}transition:all var(--t-fast);"></div>
          </div>
        </div>
      ` : nothing}
      <div class="preview-fan-card glass" style="padding:8px 10px;display:flex;flex-direction:column;gap:2px;position:relative;">
        <!-- Tint -->
        <div style="position:absolute;inset:0;border-radius:inherit;pointer-events:none;background:radial-gradient(ellipse at 50% 50%,#818cf8,transparent 70%);opacity:${fans.length > 0 ? (onCount / fans.length * 0.18).toFixed(3) : '0'};"></div>
        ${fans.length === 0 ? html`
          <div style="padding:8px;text-align:center;font-size:10px;color:var(--t4);">—</div>
        ` : nothing}
        ${fans.map((f) => html`
          <div style="display:flex;align-items:center;gap:6px;padding:4px 2px;position:relative;z-index:1;">
            <div style="width:22px;height:22px;border-radius:6px;background:${f.isOn ? `${accentRgba}0.1)` : 'var(--s2)'};border:1px solid ${f.isOn ? `${accentRgba}0.15)` : 'var(--b1)'};display:flex;align-items:center;justify-content:center;">
              <ha-icon .icon=${f.icon} style="--mdc-icon-size:13px;color:${f.isOn ? '#818cf8' : 'var(--t3)'};display:flex;align-items:center;justify-content:center;${f.isOn ? `filter:drop-shadow(0 0 4px ${accentRgba}0.4));animation:spin-fan-preview ${f.pct > 50 ? '0.8' : '1.5'}s linear infinite;` : ''}"></ha-icon>
            </div>
            <div style="flex:1;min-width:0;">
              <div style="font-size:10px;font-weight:600;color:var(--t1);overflow:hidden;white-space:nowrap;text-overflow:ellipsis;">${f.name}</div>
              <div style="display:flex;align-items:center;gap:4px;margin-top:1px;">
                <span style="font-size:8px;color:${f.isOn ? `${accentRgba}0.6)` : 'var(--t4)'};">${f.isOn ? `${f.pct}%` : t('fan.off')}</span>
                ${f.isOn ? html`
                  <span style="font-size:7px;color:var(--t4);">${t('fan.speed_step', { step: f.step, total: f.total })}</span>
                ` : nothing}
              </div>
            </div>
            <div style="width:6px;height:6px;border-radius:50%;background:${f.isOn ? '#818cf8' : 'var(--t4)'};${f.isOn ? `box-shadow:0 0 6px ${accentRgba}0.4);` : ''}"></div>
          </div>
        `)}
      </div>
    </div>
  `;
}

export function renderFanTab(self: GlassConfigPanel) {
  if (!self.hass) return nothing;

  const currentRoom = self._rooms.find((r) => r.areaId === self._fanRoom);

  return html`
    <div class="tab-panel" id="panel-fan">
      <div class="section-label">${t('config.navbar_behavior')}</div>
      <div class="feature-list">
        <button
          class="feature-row"
          @click=${() => { self._fanShowHeader = !self._fanShowHeader; }}
        >
          <div class="feature-icon">
            <ha-icon .icon=${'mdi:page-layout-header'}></ha-icon>
          </div>
          <div class="feature-text">
            <div class="feature-name">${t('config.fan_show_header')}</div>
            <div class="feature-desc">${t('config.fan_show_header_desc')}</div>
          </div>
          <span
            class="toggle ${self._fanShowHeader ? 'on' : ''}"
            role="switch"
            aria-checked=${self._fanShowHeader ? 'true' : 'false'}
          ></span>
        </button>
      </div>

      <!-- Per-room fan config -->
      <div class="section-label">${t('config.fan_room')}</div>
      <div class="section-desc">${t('config.fan_room_desc')}</div>

      <!-- Room selector dropdown -->
      <div class="dropdown ${self._fanRoomDropdownOpen ? 'open' : ''}">
        <button
          class="dropdown-trigger"
          @click=${() => { self._fanRoomDropdownOpen = !self._fanRoomDropdownOpen; }}
          aria-expanded=${self._fanRoomDropdownOpen ? 'true' : 'false'}
          aria-haspopup="listbox"
        >
          <ha-icon .icon=${currentRoom?.icon || 'mdi:home'}></ha-icon>
          <span>${currentRoom?.name || t('common.select')}</span>
          <ha-icon class="arrow" .icon=${'mdi:chevron-down'}></ha-icon>
        </button>
        <div class="dropdown-menu" role="listbox">
          ${self._rooms.map((r) => html`
            <button
              class="dropdown-item ${r.areaId === self._fanRoom ? 'active' : ''}"
              role="option"
              aria-selected=${r.areaId === self._fanRoom ? 'true' : 'false'}
              @click=${() => self._selectFanRoom(r.areaId)}
            >
              <ha-icon .icon=${r.icon}></ha-icon>
              ${r.name}
            </button>
          `)}
        </div>
      </div>

      ${self._fanRoom ? html`
        ${self._fanRoomEntities.length > 0 ? html`
          <div class="section-label">${t('config.fan_list_title')} (${self._fanRoomEntities.length})</div>
          <div class="section-desc">${t('config.fan_list_banner')}</div>
          <div class="item-list">
            ${self._fanRoomEntities.map((e, idx) => {
              const isDragging = self._dragIdx === idx && self._dragContext === 'fans';
              const isDropTarget = self._dropIdx === idx && self._dragContext === 'fans';
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
                  @dragstart=${() => self._onDragStart(idx, 'fans')}
                  @dragover=${(ev: DragEvent) => self._onDragOver(idx, ev)}
                  @dragleave=${() => self._onDragLeave()}
                  @drop=${(ev: DragEvent) => self._onDropFan(idx, ev)}
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
                    @click=${() => self._toggleFanEntityVisibility(e.entityId)}
                    role="switch"
                    aria-checked=${e.visible ? 'true' : 'false'}
                    aria-label="${e.visible ? t('common.hide') : t('common.show')} ${e.name}"
                  ></button>
                </div>
              `;
            })}
          </div>
        ` : html`
          <div class="banner">
            <ha-icon .icon=${'mdi:fan-off'}></ha-icon>
            <span>${t('config.fan_no_fans')}</span>
          </div>
        `}
      ` : nothing}

      <div class="save-bar">
        <button class="btn btn-ghost" @click=${() => self._loadFanConfig()}>${t('common.reset')}</button>
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

export function selectFanRoom(self: GlassConfigPanel, areaId: string) {
  self._fanRoom = areaId;
  self._fanRoomDropdownOpen = false;
  self._loadRoomFans();
}

export function toggleFanEntityVisibility(self: GlassConfigPanel, entityId: string) {
  self._fanRoomEntities = self._fanRoomEntities.map((e) =>
    e.entityId === entityId ? { ...e, visible: !e.visible } : e,
  );
}

export function onDropFan(self: GlassConfigPanel, idx: number, e: DragEvent) {
  e.preventDefault();
  if (self._dragIdx === null || self._dragIdx === idx || self._dragContext !== 'fans') {
    self._dragIdx = null;
    self._dropIdx = null;
    return;
  }
  const arr = [...self._fanRoomEntities];
  const [moved] = arr.splice(self._dragIdx, 1);
  arr.splice(idx, 0, moved);
  self._fanRoomEntities = arr;
  self._dragIdx = null;
  self._dropIdx = null;
}
