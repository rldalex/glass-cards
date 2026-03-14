import { html, svg, nothing } from 'lit';
import { t } from '@glass-cards/i18n';
import type { GlassConfigPanel } from '../index';

export function renderClimatePreview(self: GlassConfigPanel) {
  const entities = self._climateRoomEntities;
  if (entities.length === 0) {
    return html`<div style="padding:12px;text-align:center;font-size:11px;color:var(--t4);">${t('config.climate_no_entities')}</div>`;
  }

  if (self._climateDisplayMode === 'normal') {
    return _renderNormalPreview(entities);
  }
  return _renderListPreview(entities);
}

function _renderListPreview(entities: { entityId: string; name: string; visible: boolean }[]) {
  const activeCount = entities.filter((e) => e.visible).length;
  const total = entities.length;
  return html`
    <div style="padding:6px 10px;">
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:6px;">
        <span style="font-size:12px;font-weight:600;color:var(--t1);">${t('climate.title')}</span>
        <span style="min-width:14px;height:14px;padding:0 4px;font-size:9px;font-weight:600;border-radius:7px;background:var(--s3);color:var(--t2);display:flex;align-items:center;justify-content:center;">${activeCount}/${total}</span>
      </div>
      ${entities.slice(0, 4).map((e) => html`
        <div style="display:flex;align-items:center;gap:6px;padding:4px 2px;opacity:${e.visible ? '1' : '0.3'};">
          <ha-icon .icon=${'mdi:thermostat'} style="--mdc-icon-size:14px;display:flex;align-items:center;justify-content:center;color:var(--t3);"></ha-icon>
          <span style="font-size:11px;color:var(--t2);flex:1;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;">${e.name}</span>
          <span style="font-size:10px;color:var(--t4);flex-shrink:0;">--°C</span>
          <span style="width:5px;height:5px;border-radius:50%;background:var(--t4);flex-shrink:0;"></span>
        </div>
      `)}
      ${entities.length > 4 ? html`<div style="font-size:10px;color:var(--t4);text-align:center;padding:4px;">+${entities.length - 4}</div>` : nothing}
    </div>
  `;
}

function _renderNormalPreview(entities: { entityId: string; name: string; visible: boolean }[]) {
  // Mini arc gauge preview
  const cx = 60, cy = 62, r = 40;
  const startA = -120, endA = 120;
  const toRad = (a: number) => ((a - 90) * Math.PI) / 180;
  const pt = (a: number) => ({ x: cx + r * Math.cos(toRad(a)), y: cy + r * Math.sin(toRad(a)) });
  const p1 = pt(startA), p2 = pt(endA);
  const arcD = `M ${p1.x} ${p1.y} A ${r} ${r} 0 1 1 ${p2.x} ${p2.y}`;
  // Progress at ~60%
  const fullLen = Math.PI * r * (240 / 180);
  const progressLen = 0.6 * fullLen;
  // Target dot at ~70%
  const tAngle = startA + 0.7 * 240;
  const tPt = pt(tAngle);

  const visibleEntities = entities.filter((e) => e.visible);

  return html`
    <div style="padding:6px 10px;">
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;">
        <span style="font-size:12px;font-weight:600;color:var(--t1);">${t('climate.title')}</span>
      </div>
      ${visibleEntities.length > 1 ? html`
        <div style="display:flex;gap:4px;margin-bottom:4px;">
          ${visibleEntities.slice(0, 4).map((e, i) => html`
            <span style="font-size:9px;padding:2px 6px;border-radius:8px;${i === 0 ? 'background:var(--s3);color:var(--t1);font-weight:600;' : 'color:var(--t3);'}">${e.name.length > 8 ? e.name.slice(0, 8) + '…' : e.name}</span>
          `)}
        </div>
      ` : nothing}
      <div style="display:flex;justify-content:center;">
        <svg viewBox="0 0 120 80" fill="none" style="width:100px;height:68px;">
          ${svg`
            <path d=${arcD} stroke="var(--s3)" stroke-width="4" fill="none" stroke-linecap="round" />
            <path d=${arcD} stroke="var(--c-warning)" stroke-width="4" fill="none" stroke-linecap="round"
              stroke-dasharray=${fullLen} stroke-dashoffset=${fullLen - progressLen} />
            <circle cx=${tPt.x} cy=${tPt.y} r="3" fill="var(--t1)" />
            <text x=${cx} y=${cy - 4} text-anchor="middle" fill="var(--t1)" font-size="14" font-weight="700">21.5°</text>
            <text x=${cx} y=${cy + 8} text-anchor="middle" fill="var(--t3)" font-size="7">
              <tspan>🔥</tspan> ${t('climate.action_heating')}
            </text>
          `}
        </svg>
      </div>
    </div>
  `;
}

export function renderClimateTab(self: GlassConfigPanel) {
  if (!self.hass) return nothing;
  const rooms = self._rooms;
  const selectedRoom = self._climateRoom;
  const entities = self._climateRoomEntities;
  const isDropdownOpen = self._climateRoomDropdownOpen;

  return html`
    <div class="tab-panel" id="panel-climate">
      <div class="section-label">${t('config.tab_climate')}</div>
      <div class="section-desc">${t('config.climate_desc')}</div>

      <!-- Room selector -->
      <div class="dropdown ${isDropdownOpen ? 'open' : ''}">
        <button class="dropdown-trigger"
          @click=${() => { self._climateRoomDropdownOpen = !isDropdownOpen; }}
          aria-expanded=${isDropdownOpen ? 'true' : 'false'}
          aria-haspopup="listbox">
          <span>${rooms.find((r) => r.areaId === selectedRoom)?.name ?? t('config.climate_select_room')}</span>
          <ha-icon class="arrow" .icon=${'mdi:chevron-down'}></ha-icon>
        </button>
        <div class="dropdown-menu" role="listbox">
          ${rooms.map((room) => html`
            <button class="dropdown-item ${room.areaId === selectedRoom ? 'active' : ''}"
              role="option" aria-selected=${room.areaId === selectedRoom ? 'true' : 'false'}
              @click=${() => selectClimateRoom(self, room.areaId)}>
              <ha-icon .icon=${room.icon || 'mdi:home'} style="--mdc-icon-size:16px;display:flex;align-items:center;justify-content:center;"></ha-icon>
              ${room.name}
            </button>
          `)}
        </div>
      </div>

      <!-- Display mode selector -->
      <div class="section-label" style="margin-top:14px;font-size:11px;">${t('config.climate_display_mode')}</div>
      <div style="display:flex;gap:6px;margin-top:6px;">
        <button class="chip ${self._climateDisplayMode === 'list' ? 'active' : ''}"
          @click=${() => { self._climateDisplayMode = 'list'; }}>
          <ha-icon .icon=${'mdi:format-list-bulleted'} style="--mdc-icon-size:14px;display:flex;align-items:center;justify-content:center;"></ha-icon>
          ${t('config.climate_mode_list')}
        </button>
        <button class="chip ${self._climateDisplayMode === 'normal' ? 'active' : ''}"
          @click=${() => { self._climateDisplayMode = 'normal'; }}>
          <ha-icon .icon=${'mdi:gauge'} style="--mdc-icon-size:14px;display:flex;align-items:center;justify-content:center;"></ha-icon>
          ${t('config.climate_mode_normal')}
        </button>
      </div>

      <!-- Show header toggle -->
      <div class="check-item" style="margin-top:12px;">
        <button class="check-box ${self._climateShowHeader ? 'on' : ''}"
          role="switch" aria-checked=${self._climateShowHeader ? 'true' : 'false'}
          @click=${() => { self._climateShowHeader = !self._climateShowHeader; }}>
          <ha-icon .icon=${self._climateShowHeader ? 'mdi:check' : ''} style="--mdc-icon-size:12px;display:flex;align-items:center;justify-content:center;"></ha-icon>
        </button>
        <span>${t('config.climate_show_header')}</span>
      </div>

      <!-- Entity list -->
      ${entities.length === 0 ? html`
        <div class="banner" style="margin-top:12px;">
          <ha-icon .icon=${'mdi:thermostat'} style="--mdc-icon-size:16px;display:flex;align-items:center;justify-content:center;"></ha-icon>
          <span>${t('config.climate_no_entities')}</span>
        </div>
      ` : html`
        <div class="item-list" style="margin-top:12px;">
          ${entities.map((e, idx) => html`
            <div class="item-row" draggable="true"
              @dragstart=${(ev: DragEvent) => { ev.dataTransfer?.setData('text/plain', String(idx)); }}
              @dragover=${(ev: DragEvent) => ev.preventDefault()}
              @drop=${(ev: DragEvent) => onDropClimate(self, idx, ev)}>
              <div class="item-info" style="flex:1;min-width:0;">
                <span class="item-name">${e.name}</span>
                <span class="item-meta">${e.entityId}</span>
              </div>
              <div style="display:flex;align-items:center;gap:4px;">
                <button class="btn-icon xs" @click=${() => moveClimate(self, idx, -1)}
                  aria-label=${t('common.move_up')} ?disabled=${idx === 0}>
                  <ha-icon .icon=${'mdi:chevron-up'} style="--mdc-icon-size:14px;display:flex;align-items:center;justify-content:center;"></ha-icon>
                </button>
                <button class="btn-icon xs" @click=${() => moveClimate(self, idx, 1)}
                  aria-label=${t('common.move_down')} ?disabled=${idx === entities.length - 1}>
                  <ha-icon .icon=${'mdi:chevron-down'} style="--mdc-icon-size:14px;display:flex;align-items:center;justify-content:center;"></ha-icon>
                </button>
                <button class="btn-icon xs" @click=${() => toggleClimateEntityVisibility(self, e.entityId)}
                  aria-label="${e.visible ? t('common.hide') : t('common.show')} ${e.name}">
                  <ha-icon .icon=${e.visible ? 'mdi:eye' : 'mdi:eye-off'}
                    style="--mdc-icon-size:14px;display:flex;align-items:center;justify-content:center;${!e.visible ? 'opacity:0.4;' : ''}"></ha-icon>
                </button>
              </div>
            </div>
          `)}
        </div>
      `}

      <div class="save-bar">
        <button class="btn btn-ghost" @click=${() => self._loadClimateConfig()}>${t('common.reset')}</button>
        <button class="btn btn-accent" @click=${() => self._saveClimate()}>${t('common.save')}</button>
      </div>
    </div>
  `;
}

// — Helpers —

export function selectClimateRoom(self: GlassConfigPanel, areaId: string): void {
  self._climateRoom = areaId;
  self._climateRoomDropdownOpen = false;
  self._loadRoomClimates();
}

export function toggleClimateEntityVisibility(self: GlassConfigPanel, entityId: string): void {
  self._climateRoomEntities = self._climateRoomEntities.map((e) =>
    e.entityId === entityId ? { ...e, visible: !e.visible } : e,
  );
}

export function moveClimate(self: GlassConfigPanel, idx: number, dir: number): void {
  const target = idx + dir;
  if (target < 0 || target >= self._climateRoomEntities.length) return;
  const arr = [...self._climateRoomEntities];
  [arr[idx], arr[target]] = [arr[target], arr[idx]];
  self._climateRoomEntities = arr;
}

export function onDropClimate(self: GlassConfigPanel, targetIdx: number, e: DragEvent): void {
  e.preventDefault();
  const srcIdx = Number(e.dataTransfer?.getData('text/plain'));
  if (isNaN(srcIdx) || srcIdx === targetIdx) return;
  const arr = [...self._climateRoomEntities];
  const [moved] = arr.splice(srcIdx, 1);
  arr.splice(targetIdx, 0, moved);
  self._climateRoomEntities = arr;
}

export function getAllClimateEntities(self: GlassConfigPanel): string[] {
  if (!self.hass) return [];
  return Object.keys(self.hass.states).filter((id) => id.startsWith('climate.'));
}
