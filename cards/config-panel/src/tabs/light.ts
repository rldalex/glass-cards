import { html, nothing } from 'lit';
import { t } from '@glass-cards/i18n';
import type { GlassConfigPanel } from '../index';
import type { LightEntry, SchedulePeriodEdit } from '../types';

export function renderLightPreview(self: GlassConfigPanel) {
  if (!self._lightRoom) return html`<div class="preview-empty">${t('config.light_select_room')}</div>`;
  if (self._lights.length === 0) return html`<div class="preview-empty">${t('config.light_no_lights')}</div>`;

  const visibleLights = self._lights.filter((l) => l.visible);
  const onCount = visibleLights.filter((l) => l.isOn).length;
  const total = visibleLights.length;
  const anyOn = onCount > 0;
  const countClass = onCount === 0 ? 'none' : onCount === total ? 'all' : 'some';

  if (visibleLights.length === 0) return html`<div class="preview-empty">${t('config.light_no_visible')}</div>`;

  // Build layout: compact lights are paired, full/auto-on get full row
  type PItem =
    | { kind: 'full'; light: LightEntry }
    | { kind: 'compact-pair'; left: LightEntry; right: LightEntry | null };
  const layout: PItem[] = [];
  const compactBuf: LightEntry[] = [];

  for (const l of visibleLights) {
    const effectiveLayout = l.layout === 'full' ? 'full' : 'compact';
    if (effectiveLayout === 'compact') {
      compactBuf.push(l);
      if (compactBuf.length === 2) {
        layout.push({ kind: 'compact-pair', left: compactBuf[0], right: compactBuf[1] });
        compactBuf.length = 0;
      }
    } else {
      if (compactBuf.length > 0) {
        layout.push({ kind: 'compact-pair', left: compactBuf[0], right: null });
        compactBuf.length = 0;
      }
      layout.push({ kind: 'full', light: l });
    }
  }
  if (compactBuf.length > 0) {
    layout.push({ kind: 'compact-pair', left: compactBuf[0], right: null });
  }

  // Tint: warm glow if any light is on
  const tintOpacity = anyOn ? 0.06 : 0;

  const renderRow = (l: LightEntry, compact: boolean, isRight: boolean) => {
    const classes = [
      'preview-light-row',
      compact ? 'compact' : '',
      isRight ? 'compact-right' : '',
      !l.visible ? 'hidden-light' : '',
    ].filter(Boolean).join(' ');
    const editPeriods = self._scheduleEdits.get(l.entityId);
    const hasSched = editPeriods
      ? editPeriods.some((p) => p.start && p.end)
      : (self._schedulesLoaded[l.entityId]?.periods?.length ?? 0) > 0;

    return html`
      <div class=${classes} data-on=${l.isOn}>
        <div class="preview-light-icon ${l.isOn ? 'on' : ''}">
          <ha-icon .icon=${'mdi:lightbulb'}></ha-icon>
        </div>
        <div class="preview-light-info">
          <div class="preview-light-name">${l.name}</div>
          <div class="preview-light-sub">${l.isOn ? `${l.brightnessPct}%` : t('common.off')}</div>
        </div>
        ${hasSched ? html`<ha-icon class="preview-light-sched" .icon=${'mdi:calendar-clock'}></ha-icon>` : nothing}
        ${l.layout === 'full' ? html`<span class="preview-light-layout-tag">full</span>` : nothing}
        <span class="preview-light-dot ${l.isOn ? 'on' : ''}"></span>
      </div>
    `;
  };

  return html`
    <div class="preview-light">
      ${self._lightShowHeader ? html`
        <div class="preview-light-header">
          <div class="preview-light-header-left">
            <span class="preview-light-title">${t('light.title')}</span>
            <span class="preview-light-count ${countClass}">${onCount}/${total}</span>
          </div>
          <div class="preview-light-toggle ${anyOn ? 'on' : ''}"></div>
        </div>
      ` : nothing}
      <div class="preview-light-body">
        <div
          class="preview-light-tint"
          style="background:radial-gradient(ellipse at 30% 20%, rgba(251,191,36,0.12) 0%, transparent 70%);opacity:${tintOpacity}"
        ></div>
        <div class="preview-light-grid">
          ${layout.map((item) => {
            if (item.kind === 'full') {
              return renderRow(item.light, false, false);
            }
            return html`
              ${renderRow(item.left, true, false)}
              ${item.right ? renderRow(item.right, true, true) : nothing}
            `;
          })}
        </div>
      </div>
    </div>
  `;
}

export function renderLightTab(self: GlassConfigPanel) {
  const selectedRoomObj = self._rooms.find((r) => r.areaId === self._lightRoom);

  return html`
    <div class="tab-panel" id="panel-light">
      <div class="section-label">${t('config.navbar_behavior')}</div>
      <div class="feature-list">
        <button
          class="feature-row"
          @click=${() => { self._lightShowHeader = !self._lightShowHeader; }}
        >
          <div class="feature-icon">
            <ha-icon .icon=${'mdi:page-layout-header'}></ha-icon>
          </div>
          <div class="feature-text">
            <div class="feature-name">${t('config.light_show_header')}</div>
            <div class="feature-desc">${t('config.light_show_header_desc')}</div>
          </div>
          <span
            class="toggle ${self._lightShowHeader ? 'on' : ''}"
            role="switch"
            aria-checked=${self._lightShowHeader ? 'true' : 'false'}
          ></span>
        </button>
      </div>

      <div class="section-label">${t('config.light_room')}</div>
      <div class="section-desc">
        ${t('config.light_room_desc')}
      </div>
      <div class="dropdown ${self._lightDropdownOpen ? 'open' : ''}">
        <button
          class="dropdown-trigger"
          @click=${() => (self._lightDropdownOpen = !self._lightDropdownOpen)}
          aria-expanded=${self._lightDropdownOpen ? 'true' : 'false'}
          aria-haspopup="listbox"
        >
          <ha-icon .icon=${selectedRoomObj?.icon || 'mdi:home'}></ha-icon>
          <span>${selectedRoomObj?.name || t('common.select')}</span>
          <ha-icon class="arrow" .icon=${'mdi:chevron-down'}></ha-icon>
        </button>
        <div class="dropdown-menu" role="listbox">
          ${self._rooms.map(
            (room) => html`
              <button
                class="dropdown-item ${room.areaId === self._lightRoom ? 'active' : ''}"
                role="option"
                aria-selected=${room.areaId === self._lightRoom ? 'true' : 'false'}
                @click=${() => self._selectLightRoom(room.areaId)}
              >
                <ha-icon .icon=${room.icon}></ha-icon>
                ${room.name}
              </button>
            `,
          )}
        </div>
      </div>

      ${self._lights.length > 0
        ? html`
            <div class="section-label">${t('config.light_list_title')} (${self._lights.length})</div>
            <div class="section-desc">
              ${t('config.light_list_banner')}
            </div>
            <div class="item-list">
              ${self._lights.map((light, idx) => self._renderLightRow(light, idx))}
            </div>
          `
        : self._lightRoom
          ? html`<div class="banner">
              <ha-icon .icon=${'mdi:lightbulb-off-outline'}></ha-icon>
              <span>${t('config.light_no_lights')}</span>
            </div>`
          : nothing}

      ${self._lights.length > 0 ? html`
        <div class="section-desc schedule-hint">
          <ha-icon .icon=${'mdi:information-outline'}></ha-icon>
          ${t('config.light_schedule_hint')}
        </div>
      ` : nothing}

      <div class="section-desc dashboard-vs-room">
        <ha-icon .icon=${'mdi:information-outline'}></ha-icon>
        ${t('config.light_dashboard_vs_room')}
      </div>

      ${self._lightRoom ? html`
        <div class="save-bar">
          <button class="btn btn-ghost" @click=${() => self._loadRoomLights()}>${t('common.reset')}</button>
          <button
            class="btn btn-accent"
            @click=${() => self._save()}
            ?disabled=${self._saving}
          >
            ${self._saving ? t('common.saving') : t('common.save')}
          </button>
        </div>
      ` : nothing}
    </div>
  `;
}

export function renderLightRow(self: GlassConfigPanel, light: LightEntry, idx: number) {
  const isDragging = self._dragIdx === idx && self._dragContext === 'lights';
  const isDropTarget = self._dropIdx === idx && self._dragContext === 'lights';
  const rowClasses = [
    'item-row',
    !light.visible ? 'disabled' : '',
    isDragging ? 'dragging' : '',
    isDropTarget ? 'drop-target' : '',
  ].filter(Boolean).join(' ');
  const editPeriods = self._scheduleEdits.get(light.entityId);
  const hasSchedule = editPeriods
    ? editPeriods.some((p) => p.start && p.end)
    : (self._schedulesLoaded[light.entityId]?.periods?.length ?? 0) > 0;
  const isExpanded = self._scheduleExpandedEntity === light.entityId;
  const wrapClasses = ['item-card', isExpanded ? 'expanded' : ''].filter(Boolean).join(' ');

  return html`
    <div class=${wrapClasses}>
      <div
        class=${rowClasses}
        draggable="true"
        @dragstart=${() => self._onDragStart(idx, 'lights')}
        @dragover=${(e: DragEvent) => self._onDragOver(idx, e)}
        @dragleave=${() => self._onDragLeave()}
        @drop=${(e: DragEvent) => self._onDropGeneric(idx, e)}
        @dragend=${() => self._onDragEnd()}
      >
        <span class="drag-handle">
          <ha-icon .icon=${'mdi:drag'}></ha-icon>
        </span>
        <div class="item-info">
          <span class="item-name">${light.name}</span>
          <span class="item-meta">${light.entityId}</span>
        </div>
        <div class="light-state">
          <span class="light-dot ${light.isOn ? 'on' : ''}"></span>
        </div>
        <button
          class="schedule-btn ${hasSchedule ? 'active' : ''}"
          @click=${() => self._toggleScheduleExpand(light.entityId)}
          aria-label="${t('config.light_schedule_aria', { name: light.name })}"
          aria-expanded=${isExpanded ? 'true' : 'false'}
          title="${t('config.light_schedule_title')}"
        >
          <ha-icon .icon=${'mdi:calendar-clock'}></ha-icon>
        </button>
        <button
          class="layout-btn"
          @click=${() => self._cycleLightLayout(light.entityId)}
          aria-label="${t('config.light_change_layout_aria')}"
          title="${t(light.layout === 'compact' ? 'config.light_layout_compact' : 'config.light_layout_full')}"
        >
          ${t(light.layout === 'compact' ? 'config.light_layout_compact' : 'config.light_layout_full')}
        </button>
        <button
          class="toggle ${light.visible ? 'on' : ''}"
          @click=${() => self._toggleLightVisible(light.entityId)}
          role="switch"
          aria-checked=${light.visible ? 'true' : 'false'}
          aria-label="${light.visible ? t('common.hide') : t('common.show')} ${light.name}"
        ></button>
      </div>
      <div class="fold-sep ${isExpanded ? 'visible' : ''}"></div>
      <div class="schedule-fold ${isExpanded ? 'open' : ''}">
        <div class="schedule-fold-inner">
          ${self._renderScheduleContent(light.entityId)}
        </div>
      </div>
    </div>
  `;
}

export function selectLightRoom(self: GlassConfigPanel, areaId: string) {
  self._lightRoom = areaId;
  self._lightDropdownOpen = false;
  self._loadRoomLights();
}

export function toggleLightVisible(self: GlassConfigPanel, entityId: string) {
  self._lights = self._lights.map((l) =>
    l.entityId === entityId ? { ...l, visible: !l.visible } : l,
  );
}

export function cycleLightLayout(self: GlassConfigPanel, entityId: string) {
  self._lights = self._lights.map((l) =>
    l.entityId === entityId ? { ...l, layout: l.layout === 'full' ? 'compact' : 'full' } : l,
  );
}

export function toggleScheduleExpand(self: GlassConfigPanel, entityId: string) {
  self._scheduleExpandedEntity = self._scheduleExpandedEntity === entityId ? null : entityId;
  // Initialize edit entries if not present
  if (!self._scheduleEdits.has(entityId)) {
    const sched = self._schedulesLoaded[entityId];
    self._scheduleEdits.set(
      entityId,
      sched?.periods?.map((p) => ({ start: p.start, end: p.end, recurring: p.recurring ?? false })) ?? [],
    );
  }
  self.requestUpdate();
}

export function addSchedulePeriod(self: GlassConfigPanel, entityId: string) {
  const periods = self._scheduleEdits.get(entityId) ?? [];
  periods.push({ start: '', end: '', recurring: false });
  self._scheduleEdits.set(entityId, [...periods]);
  self.requestUpdate();
}

export function removeSchedulePeriod(self: GlassConfigPanel, entityId: string, idx: number) {
  const periods = self._scheduleEdits.get(entityId) ?? [];
  periods.splice(idx, 1);
  self._scheduleEdits.set(entityId, [...periods]);
  self.requestUpdate();
  self._saveSchedule(entityId);
}

export function updateSchedulePeriod(self: GlassConfigPanel, entityId: string, idx: number, field: 'start' | 'end', value: string) {
  const periods = self._scheduleEdits.get(entityId) ?? [];
  if (periods[idx]) {
    periods[idx] = { ...periods[idx], [field]: value };
    self._scheduleEdits.set(entityId, [...periods]);
    self.requestUpdate();
  }
}

export function toggleScheduleRecurring(self: GlassConfigPanel, entityId: string, idx: number) {
  const periods = self._scheduleEdits.get(entityId) ?? [];
  if (periods[idx]) {
    periods[idx] = { ...periods[idx], recurring: !periods[idx].recurring };
    self._scheduleEdits.set(entityId, [...periods]);
    self.requestUpdate();
  }
}

export function renderScheduleContent(self: GlassConfigPanel, entityId: string) {
  const periods = self._scheduleEdits.get(entityId) ?? [];
  return html`
    <div class="schedule-body">
      <div class="schedule-header">${t('config.light_schedule_title')}</div>
      ${periods.map((p, idx) => html`
        <div class="schedule-period">
          <div class="schedule-row">
            <button
              class="datetime-display ${p.start || p.end ? '' : 'empty'}"
              @click=${() => self._openRangePicker(entityId, idx)}
            >
              ${p.start || p.end ? self._formatPeriodDisplay(p) : t('config.light_schedule_no_date')}
            </button>
          </div>
          <div class="schedule-row schedule-row-actions">
            <button
              class="check-item ${p.recurring ? 'checked' : ''}"
              @click=${() => self._toggleScheduleRecurring(entityId, idx)}
            >
              <span class="check-box">
                <ha-icon .icon=${'mdi:check'}></ha-icon>
              </span>
              <span class="check-label">${t('config.light_schedule_recurring')}</span>
            </button>
            <button
              class="btn-icon xs schedule-delete"
              @click=${() => self._removeSchedulePeriod(entityId, idx)}
              aria-label="${t('config.light_schedule_delete_aria')}"
            >
              <ha-icon .icon=${'mdi:delete-outline'}></ha-icon>
            </button>
          </div>
        </div>
      `)}
      <button class="btn btn-sm schedule-add" @click=${() => self._addSchedulePeriod(entityId)}>
        <ha-icon .icon=${'mdi:plus'}></ha-icon>
        ${t('config.light_schedule_add')}
      </button>
      <button class="btn btn-sm btn-accent schedule-save" @click=${() => self._saveSchedule(entityId)}>
        ${t('common.save')}
      </button>
    </div>
  `;
}

export function formatDateTimeShort(_self: GlassConfigPanel, value: string): string {
  if (!value) return '';
  const [datePart, timePart] = value.split('T');
  if (!datePart) return value;
  const [y, m, d] = datePart.split('-');
  const time = timePart ?? '00:00';
  return `${d}/${m}/${y} ${time}`;
}

export function formatPeriodDisplay(self: GlassConfigPanel, p: SchedulePeriodEdit): string {
  if (!p.start && !p.end) return '';
  const s = self._formatDateTimeShort(p.start);
  const e = self._formatDateTimeShort(p.end);
  if (s && e) return `${s}  →  ${e}`;
  if (s) return `${s}  → …`;
  return `…  →  ${e}`;
}

export function parseDateTimeValue(_self: GlassConfigPanel, value: string): { year: number; month: number; day: number; hour: string; minute: string } | null {
  if (!value) return null;
  const [datePart, timePart] = value.split('T');
  if (!datePart) return null;
  const parts = datePart.split('-').map(Number);
  if (parts.length < 3 || parts.some(isNaN)) return null;
  const [y, m, d] = parts;
  const [hh, mm] = (timePart ?? '00:00').split(':');
  return { year: y, month: m - 1, day: d, hour: hh ?? '00', minute: mm ?? '00' };
}

export function openRangePicker(self: GlassConfigPanel, entityId: string, periodIdx: number) {
  self._pickerTarget = { entityId, periodIdx };
  const periods = self._scheduleEdits.get(entityId) ?? [];
  const p = periods[periodIdx];
  const startParsed = p ? self._parseDateTimeValue(p.start) : null;
  const endParsed = p ? self._parseDateTimeValue(p.end) : null;
  const now = new Date();

  if (startParsed) {
    self._pickerStartDay = startParsed.day;
    self._pickerStartMonth = startParsed.month;
    self._pickerStartYear = startParsed.year;
    self._pickerStartHour = startParsed.hour;
    self._pickerStartMinute = startParsed.minute;
    self._pickerYear = startParsed.year;
    self._pickerMonth = startParsed.month;
  } else {
    self._pickerStartDay = null;
    self._pickerStartMonth = now.getMonth();
    self._pickerStartYear = now.getFullYear();
    self._pickerStartHour = '00';
    self._pickerStartMinute = '00';
    self._pickerYear = now.getFullYear();
    self._pickerMonth = now.getMonth();
  }

  if (endParsed) {
    self._pickerEndDay = endParsed.day;
    self._pickerEndMonth = endParsed.month;
    self._pickerEndYear = endParsed.year;
    self._pickerEndHour = endParsed.hour;
    self._pickerEndMinute = endParsed.minute;
  } else {
    self._pickerEndDay = null;
    self._pickerEndMonth = now.getMonth();
    self._pickerEndYear = now.getFullYear();
    self._pickerEndHour = '23';
    self._pickerEndMinute = '59';
  }

  self._pickerPhase = startParsed ? (endParsed ? 'start' : 'end') : 'start';
  self._pickerOpen = true;
}

export function closePicker(self: GlassConfigPanel) {
  self._pickerOpen = false;
  self._pickerTarget = null;
}

export function pickerPrevMonth(self: GlassConfigPanel) {
  if (self._pickerMonth === 0) { self._pickerMonth = 11; self._pickerYear--; }
  else self._pickerMonth--;
}

export function pickerNextMonth(self: GlassConfigPanel) {
  if (self._pickerMonth === 11) { self._pickerMonth = 0; self._pickerYear++; }
  else self._pickerMonth++;
}

export function pickerSelectDay(self: GlassConfigPanel, day: number, isOtherMonth: boolean) {
  if (isOtherMonth) return;
  if (self._pickerPhase === 'start') {
    self._pickerStartDay = day;
    self._pickerStartMonth = self._pickerMonth;
    self._pickerStartYear = self._pickerYear;
    // Auto-advance to end selection
    self._pickerPhase = 'end';
    // If end is before new start, clear end
    if (self._pickerEndDay !== null) {
      const startTs = new Date(self._pickerStartYear, self._pickerStartMonth, day).getTime();
      const endTs = new Date(self._pickerEndYear, self._pickerEndMonth, self._pickerEndDay).getTime();
      if (endTs < startTs) {
        self._pickerEndDay = null;
      }
    }
  } else {
    // Ensure end >= start
    if (self._pickerStartDay !== null) {
      const startTs = new Date(self._pickerStartYear, self._pickerStartMonth, self._pickerStartDay).getTime();
      const endTs = new Date(self._pickerYear, self._pickerMonth, day).getTime();
      if (endTs < startTs) {
        self._pickerStartDay = day;
        self._pickerStartMonth = self._pickerMonth;
        self._pickerStartYear = self._pickerYear;
        self._pickerEndDay = null;
        self._pickerPhase = 'start';
        return;
      }
    }
    self._pickerEndDay = day;
    self._pickerEndMonth = self._pickerMonth;
    self._pickerEndYear = self._pickerYear;
  }
}

export function pickerSetTime(self: GlassConfigPanel, which: 'startHour' | 'startMinute' | 'endHour' | 'endMinute', e: Event) {
  const val = (e.target as HTMLInputElement).value.replace(/\D/g, '').slice(0, 2);
  const isHour = which.includes('Hour');
  const num = Math.min(isHour ? 23 : 59, Math.max(0, parseInt(val, 10) || 0));
  const padded = String(num).padStart(2, '0');
  (e.target as HTMLInputElement).value = padded;
  if (which === 'startHour') self._pickerStartHour = padded;
  else if (which === 'startMinute') self._pickerStartMinute = padded;
  else if (which === 'endHour') self._pickerEndHour = padded;
  else self._pickerEndMinute = padded;
  self.requestUpdate();
}

export function pickerConfirm(self: GlassConfigPanel) {
  if (!self._pickerTarget || self._pickerStartDay === null || self._pickerEndDay === null) return;
  const { entityId, periodIdx } = self._pickerTarget;
  const sm = String(self._pickerStartMonth + 1).padStart(2, '0');
  const sd = String(self._pickerStartDay).padStart(2, '0');
  const em = String(self._pickerEndMonth + 1).padStart(2, '0');
  const ed = String(self._pickerEndDay).padStart(2, '0');
  const startVal = `${self._pickerStartYear}-${sm}-${sd}T${self._pickerStartHour}:${self._pickerStartMinute}`;
  const endVal = `${self._pickerEndYear}-${em}-${ed}T${self._pickerEndHour}:${self._pickerEndMinute}`;
  self._updateSchedulePeriod(entityId, periodIdx, 'start', startVal);
  self._updateSchedulePeriod(entityId, periodIdx, 'end', endVal);
  self._closePicker();
}

export function toAbsDay(_self: GlassConfigPanel, year: number, month: number, day: number): number {
  return new Date(year, month, day).getTime();
}

export function getMonthDays(self: GlassConfigPanel): Array<{ day: number; otherMonth: boolean; today: boolean; rangeStart: boolean; rangeEnd: boolean; inRange: boolean }> {
  const year = self._pickerYear;
  const month = self._pickerMonth;
  const firstDay = new Date(year, month, 1).getDay();
  const startOffset = (firstDay + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();
  const now = new Date();
  const isCurrentMonth = now.getFullYear() === year && now.getMonth() === month;
  const todayDate = now.getDate();

  const startTs = self._pickerStartDay !== null ? toAbsDay(self, self._pickerStartYear, self._pickerStartMonth, self._pickerStartDay) : null;
  const endTs = self._pickerEndDay !== null ? toAbsDay(self, self._pickerEndYear, self._pickerEndMonth, self._pickerEndDay) : null;

  type DayInfo = { day: number; otherMonth: boolean; today: boolean; rangeStart: boolean; rangeEnd: boolean; inRange: boolean };
  const days: DayInfo[] = [];

  const classify = (d: number, isOther: boolean, absYear: number, absMonth: number): DayInfo => {
    const ts = toAbsDay(self, absYear, absMonth, d);
    const isStart = startTs !== null && ts === startTs;
    const isEnd = endTs !== null && ts === endTs;
    const isInRange = startTs !== null && endTs !== null && ts > startTs && ts < endTs;
    return {
      day: d, otherMonth: isOther,
      today: !isOther && isCurrentMonth && d === todayDate,
      rangeStart: isStart, rangeEnd: isEnd, inRange: isInRange,
    };
  };

  const prevMonth = month === 0 ? 11 : month - 1;
  const prevYear = month === 0 ? year - 1 : year;
  for (let i = startOffset - 1; i >= 0; i--) {
    days.push(classify(daysInPrevMonth - i, true, prevYear, prevMonth));
  }
  for (let d = 1; d <= daysInMonth; d++) {
    days.push(classify(d, false, year, month));
  }
  const nextMonth = month === 11 ? 0 : month + 1;
  const nextYear = month === 11 ? year + 1 : year;
  const remaining = 42 - days.length;
  for (let d = 1; d <= remaining; d++) {
    days.push(classify(d, true, nextYear, nextMonth));
  }
  return days;
}

export function getMonthLabel(self: GlassConfigPanel): string {
  const date = new Date(self._pickerYear, self._pickerMonth, 1);
  const lang = self._lang === 'fr' ? 'fr-FR' : 'en-US';
  const monthName = date.toLocaleDateString(lang, { month: 'long' });
  return `${monthName.charAt(0).toUpperCase()}${monthName.slice(1)} ${self._pickerYear}`;
}

export function getDayLabels(self: GlassConfigPanel): string[] {
  if (self._lang === 'fr') return ['Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa', 'Di'];
  return ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
}

export function renderDateTimePicker(self: GlassConfigPanel) {
  const days = self._getMonthDays();
  const dayLabels = self._getDayLabels();
  const canConfirm = self._pickerStartDay !== null && self._pickerEndDay !== null;
  return html`
    <div class="picker-overlay"
      @click=${(e: Event) => { if (e.target === e.currentTarget) self._closePicker(); }}
      @keydown=${(e: KeyboardEvent) => { if (e.key === 'Escape') self._closePicker(); }}
    >
      <div class="picker-popup" role="dialog" aria-modal="true" aria-label="${t('config.light_schedule_title')}">
        <div class="picker-phase">
          <button
            class="picker-phase-btn ${self._pickerPhase === 'start' ? 'active' : ''}"
            @click=${() => { self._pickerPhase = 'start'; }}
          >${t('config.light_schedule_start')}</button>
          <button
            class="picker-phase-btn ${self._pickerPhase === 'end' ? 'active' : ''}"
            @click=${() => { self._pickerPhase = 'end'; }}
          >${t('config.light_schedule_end')}</button>
        </div>
        <div class="picker-header">
          <button class="picker-nav" @click=${() => self._pickerPrevMonth()} aria-label="${t('config.light_schedule_prev_month_aria')}">
            <ha-icon .icon=${'mdi:chevron-left'}></ha-icon>
          </button>
          <span class="picker-month">${self._getMonthLabel()}</span>
          <button class="picker-nav" @click=${() => self._pickerNextMonth()} aria-label="${t('config.light_schedule_next_month_aria')}">
            <ha-icon .icon=${'mdi:chevron-right'}></ha-icon>
          </button>
        </div>
        <div class="picker-grid">
          ${dayLabels.map((l) => html`<span class="picker-day-label">${l}</span>`)}
          ${days.map((d) => {
            const cls = [
              'picker-day',
              d.today ? 'today' : '',
              d.rangeStart ? 'range-start' : '',
              d.rangeEnd ? 'range-end' : '',
              d.inRange ? 'in-range' : '',
              d.otherMonth ? 'other-month' : '',
            ].filter(Boolean).join(' ');
            return html`
              <button class=${cls} @click=${() => self._pickerSelectDay(d.day, d.otherMonth)}>${d.day}</button>
            `;
          })}
        </div>
        <div class="picker-time-row">
          <div class="picker-time-group">
            <span class="picker-time-label">${t('config.light_schedule_start')}</span>
            <div class="time-input">
              <input type="text" class="time-digit" maxlength="2"
                .value=${self._pickerStartHour}
                @change=${(e: Event) => self._pickerSetTime('startHour', e)}
              />
              <span class="time-sep">:</span>
              <input type="text" class="time-digit" maxlength="2"
                .value=${self._pickerStartMinute}
                @change=${(e: Event) => self._pickerSetTime('startMinute', e)}
              />
            </div>
          </div>
          <div class="picker-time-group">
            <span class="picker-time-label">${t('config.light_schedule_end')}</span>
            <div class="time-input">
              <input type="text" class="time-digit" maxlength="2"
                .value=${self._pickerEndHour}
                @change=${(e: Event) => self._pickerSetTime('endHour', e)}
              />
              <span class="time-sep">:</span>
              <input type="text" class="time-digit" maxlength="2"
                .value=${self._pickerEndMinute}
                @change=${(e: Event) => self._pickerSetTime('endMinute', e)}
              />
            </div>
          </div>
        </div>
        <button
          class="btn btn-sm btn-accent picker-confirm"
          @click=${() => self._pickerConfirm()}
          ?disabled=${!canConfirm}
        >
          ${t('config.light_schedule_confirm')}
        </button>
      </div>
    </div>
  `;
}
