import { html, nothing, type PropertyValues, type TemplateResult } from 'lit';
import { state } from 'lit/decorators.js';
import { t } from '@glass-cards/i18n';
import { bus } from '@glass-cards/event-bus';
import { getAreaEntities, type EntityScheduleMap } from '@glass-cards/base-card';
import { BaseConfigTab } from '../base-tab';
import type { LightEntry, SchedulePeriodEdit } from '../types';

// — Component —

export class ConfigTabLight extends BaseConfigTab {
  @state() _lights: LightEntry[] = [];
  @state() _lightRoom = '';
  @state() _lightShowHeader = true;

  // Schedule state
  @state() _scheduleExpandedEntity: string | null = null;
  _scheduleEdits = new Map<string, SchedulePeriodEdit[]>();
  _schedulesLoaded: EntityScheduleMap = {};

  // DateTime range picker state
  @state() _pickerOpen = false;
  _pickerTarget: { entityId: string; periodIdx: number } | null = null;
  @state() _pickerYear = new Date().getFullYear();
  @state() _pickerMonth = new Date().getMonth();
  @state() _pickerStartDay: number | null = null;
  @state() _pickerStartMonth = 0;
  @state() _pickerStartYear = new Date().getFullYear();
  @state() _pickerEndDay: number | null = null;
  @state() _pickerEndMonth = 0;
  @state() _pickerEndYear = new Date().getFullYear();
  @state() _pickerStartHour = '00';
  @state() _pickerStartMinute = '00';
  @state() _pickerEndHour = '23';
  @state() _pickerEndMinute = '59';
  @state() _pickerPhase: 'start' | 'end' = 'start';

  // Local drag state
  @state() _dragIdx: number | null = null;
  @state() _dropIdx: number | null = null;

  // Internal flags
  _mounted = false;

  protected static override _AUTO_SAVE_KEYS = new Set([
    '_lightShowHeader', '_lights',
  ]);

  // — Lifecycle —

  connectedCallback(): void {
    super.connectedCallback();
    this._mounted = true;
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._mounted = false;
  }

  protected override updated(changedProps: PropertyValues): void {
    super.updated(changedProps);
    if (changedProps.has('areaId') && this.areaId) {
      this._lightRoom = this.areaId;
      void this._withLoading(() => this._loadRoomLights());
    }
    this._checkAutoSave(changedProps);
  }

  // — Persistence —

  loadFromConfig(config: Record<string, unknown>): void {
    const c = config as { show_header?: boolean };
    this._lightShowHeader = c.show_header ?? true;
  }

  collectSaveData(): Record<string, unknown> {
    return {
      show_header: this._lightShowHeader,
    };
  }

  protected override async _performSave(): Promise<void> {
    await this.backend!.send('set_light_config', {
      show_header: this._lightShowHeader,
    });

    if (this._lightRoom && this._lights.length > 0) {
      const cardIds = new Set(this._lights.map((l) => l.entityId));
      const hiddenIds = this._lights.filter((l) => !l.visible).map((l) => l.entityId);
      const orderedIds = this._lights.map((l) => l.entityId);
      const layouts: Record<string, string> = {};
      for (const l of this._lights) {
        if (l.layout === 'full') {
          layouts[l.entityId] = l.layout;
        }
      }
      await this._saveRoomEntities(this._lightRoom, cardIds, hiddenIds, orderedIds, layouts);
    }

    bus.emit('light-config-changed', undefined);
  }

  protected override async _reloadExtras(): Promise<void> {
    if (this._lightRoom) await this._loadRoomLights();
  }

  /** Called when tab becomes active and no room is selected yet. */
  initRoom(): void {
    if (!this._lightRoom && this.rooms.length > 0) {
      this._lightRoom = this.rooms[0].areaId;
      void this._withLoading(() => this._loadRoomLights());
    }
  }

  // — Room lights loading —

  private async _loadRoomLights(): Promise<void> {
    if (!this.hass || !this._lightRoom) {
      this._lights = [];
      return;
    }

    const targetRoom = this._lightRoom;
    const entities = getAreaEntities(targetRoom, this.hass.entities, this.hass.devices);
    const lightEntities = entities.filter((e) => e.entity_id.startsWith('light.'));

    // Load room config from backend
    let hiddenEntities = new Set<string>();
    let entityOrder: string[] = [];
    let entityLayouts: Record<string, string> = {};
    try {
      if (!this.backend) throw new Error('No backend');
      const result = await this.backend.send<{
        hidden_entities: string[];
        entity_order: string[];
        entity_layouts: Record<string, string>;
      } | null>('get_room', { area_id: targetRoom });
      if (this._lightRoom !== targetRoom) return;
      if (result) {
        hiddenEntities = new Set(result.hidden_entities ?? []);
        entityOrder = result.entity_order ?? [];
        entityLayouts = result.entity_layouts ?? {};
      }
    } catch {
      // Backend not available
    }

    // Build ordered list
    const hass = this.hass;
    const orderMap = new Map<string, number>();
    entityOrder.forEach((id, i) => orderMap.set(id, i));

    const lights: LightEntry[] = lightEntities.map((e) => {
      const st = hass.states[e.entity_id];
      const isOn = st?.state === 'on';
      const brightness = st?.attributes.brightness as number | undefined;
      const brightnessPct = isOn && brightness !== undefined ? Math.round((brightness / 255) * 100) : 0;
      return {
        entityId: e.entity_id,
        name: st?.attributes.friendly_name as string || e.entity_id.split('.')[1],
        isOn,
        brightnessPct,
        layout: (entityLayouts[e.entity_id] as 'full' | 'compact') || 'compact',
        visible: !hiddenEntities.has(e.entity_id),
      };
    });

    // Sort: visible first, then by backend order, then by name
    lights.sort((a, b) => {
      if (a.visible !== b.visible) return a.visible ? -1 : 1;
      const aIdx = orderMap.get(a.entityId);
      const bIdx = orderMap.get(b.entityId);
      if (aIdx !== undefined && bIdx !== undefined) return aIdx - bIdx;
      if (aIdx !== undefined) return -1;
      if (bIdx !== undefined) return 1;
      return a.name.localeCompare(b.name);
    });

    this._lights = lights;

    // Load schedules
    try {
      if (this.backend) {
        const schedules = await this.backend.send<EntityScheduleMap>('get_schedules');
        if (this._lightRoom !== targetRoom) return;
        this._schedulesLoaded = schedules ?? {};
        this._scheduleEdits = new Map();
        for (const l of lights) {
          const sched = this._schedulesLoaded[l.entityId];
          this._scheduleEdits.set(
            l.entityId,
            sched?.periods?.map((p) => ({ start: p.start, end: p.end, recurring: p.recurring ?? false })) ?? [],
          );
        }
      }
    } catch {
      // Backend not available
    }
  }

  // — Actions —

  private _toggleLightVisible(entityId: string): void {
    this._lights = this._lights.map((l) =>
      l.entityId === entityId ? { ...l, visible: !l.visible } : l,
    );
  }

  private _cycleLightLayout(entityId: string): void {
    this._lights = this._lights.map((l) =>
      l.entityId === entityId ? { ...l, layout: l.layout === 'full' ? 'compact' : 'full' } : l,
    );
  }

  // — Schedule actions —

  private _toggleScheduleExpand(entityId: string): void {
    this._scheduleExpandedEntity = this._scheduleExpandedEntity === entityId ? null : entityId;
    if (!this._scheduleEdits.has(entityId)) {
      const sched = this._schedulesLoaded[entityId];
      this._scheduleEdits.set(
        entityId,
        sched?.periods?.map((p) => ({ start: p.start, end: p.end, recurring: p.recurring ?? false })) ?? [],
      );
    }
    this.requestUpdate();
  }

  private _addSchedulePeriod(entityId: string): void {
    const periods = this._scheduleEdits.get(entityId) ?? [];
    periods.push({ start: '', end: '', recurring: false });
    this._scheduleEdits.set(entityId, [...periods]);
    this.requestUpdate();
  }

  private _removeSchedulePeriod(entityId: string, idx: number): void {
    const periods = this._scheduleEdits.get(entityId) ?? [];
    periods.splice(idx, 1);
    this._scheduleEdits.set(entityId, [...periods]);
    this.requestUpdate();
  }

  private _updateSchedulePeriod(entityId: string, idx: number, field: 'start' | 'end', value: string): void {
    const periods = this._scheduleEdits.get(entityId) ?? [];
    if (periods[idx]) {
      periods[idx] = { ...periods[idx], [field]: value };
      this._scheduleEdits.set(entityId, [...periods]);
      this.requestUpdate();
    }
  }

  private _toggleScheduleRecurring(entityId: string, idx: number): void {
    const periods = this._scheduleEdits.get(entityId) ?? [];
    if (periods[idx]) {
      periods[idx] = { ...periods[idx], recurring: !periods[idx].recurring };
      this._scheduleEdits.set(entityId, [...periods]);
      this.requestUpdate();
    }
  }

  private async _saveSchedule(entityId: string): Promise<void> {
    if (!this.backend) return;
    const periods = this._scheduleEdits.get(entityId) ?? [];
    const validPeriods = periods.filter((p) => p.start && p.end);
    try {
      await this.backend.send('set_schedule', {
        entity_id: entityId,
        periods: validPeriods,
      });
      if (!this._mounted) return;
      this._fireToast(true);
      bus.emit('schedule-changed', { entityId });
    } catch {
      if (!this._mounted) return;
      this._fireToast(false);
    }
  }

  // — Picker helpers —

  private _formatDateTimeShort(value: string): string {
    if (!value) return '';
    const [datePart, timePart] = value.split('T');
    if (!datePart) return value;
    const [y, m, d] = datePart.split('-');
    const time = timePart ?? '00:00';
    return `${d}/${m}/${y} ${time}`;
  }

  private _formatPeriodDisplay(p: SchedulePeriodEdit): string {
    if (!p.start && !p.end) return '';
    const s = this._formatDateTimeShort(p.start);
    const e = this._formatDateTimeShort(p.end);
    if (s && e) return `${s}  →  ${e}`;
    if (s) return `${s}  → …`;
    return `…  →  ${e}`;
  }

  private _parseDateTimeValue(value: string): { year: number; month: number; day: number; hour: string; minute: string } | null {
    if (!value) return null;
    const [datePart, timePart] = value.split('T');
    if (!datePart) return null;
    const parts = datePart.split('-').map(Number);
    if (parts.length < 3 || parts.some(isNaN)) return null;
    const [y, m, d] = parts;
    const [hh, mm] = (timePart ?? '00:00').split(':');
    return { year: y, month: m - 1, day: d, hour: hh ?? '00', minute: mm ?? '00' };
  }

  private _openRangePicker(entityId: string, periodIdx: number): void {
    this._pickerTarget = { entityId, periodIdx };
    const periods = this._scheduleEdits.get(entityId) ?? [];
    const p = periods[periodIdx];
    const startParsed = p ? this._parseDateTimeValue(p.start) : null;
    const endParsed = p ? this._parseDateTimeValue(p.end) : null;
    const now = new Date();

    if (startParsed) {
      this._pickerStartDay = startParsed.day;
      this._pickerStartMonth = startParsed.month;
      this._pickerStartYear = startParsed.year;
      this._pickerStartHour = startParsed.hour;
      this._pickerStartMinute = startParsed.minute;
      this._pickerYear = startParsed.year;
      this._pickerMonth = startParsed.month;
    } else {
      this._pickerStartDay = null;
      this._pickerStartMonth = now.getMonth();
      this._pickerStartYear = now.getFullYear();
      this._pickerStartHour = '00';
      this._pickerStartMinute = '00';
      this._pickerYear = now.getFullYear();
      this._pickerMonth = now.getMonth();
    }

    if (endParsed) {
      this._pickerEndDay = endParsed.day;
      this._pickerEndMonth = endParsed.month;
      this._pickerEndYear = endParsed.year;
      this._pickerEndHour = endParsed.hour;
      this._pickerEndMinute = endParsed.minute;
    } else {
      this._pickerEndDay = null;
      this._pickerEndMonth = now.getMonth();
      this._pickerEndYear = now.getFullYear();
      this._pickerEndHour = '23';
      this._pickerEndMinute = '59';
    }

    this._pickerPhase = startParsed ? (endParsed ? 'start' : 'end') : 'start';
    this._pickerOpen = true;
  }

  private _closePicker(): void {
    this._pickerOpen = false;
    this._pickerTarget = null;
  }

  private _pickerPrevMonth(): void {
    if (this._pickerMonth === 0) { this._pickerMonth = 11; this._pickerYear--; }
    else this._pickerMonth--;
  }

  private _pickerNextMonth(): void {
    if (this._pickerMonth === 11) { this._pickerMonth = 0; this._pickerYear++; }
    else this._pickerMonth++;
  }

  private _pickerSelectDay(day: number, isOtherMonth: boolean): void {
    if (isOtherMonth) return;
    if (this._pickerPhase === 'start') {
      this._pickerStartDay = day;
      this._pickerStartMonth = this._pickerMonth;
      this._pickerStartYear = this._pickerYear;
      this._pickerPhase = 'end';
      if (this._pickerEndDay !== null) {
        const startTs = new Date(this._pickerStartYear, this._pickerStartMonth, day).getTime();
        const endTs = new Date(this._pickerEndYear, this._pickerEndMonth, this._pickerEndDay).getTime();
        if (endTs < startTs) {
          this._pickerEndDay = null;
        }
      }
    } else {
      if (this._pickerStartDay !== null) {
        const startTs = new Date(this._pickerStartYear, this._pickerStartMonth, this._pickerStartDay).getTime();
        const endTs = new Date(this._pickerYear, this._pickerMonth, day).getTime();
        if (endTs < startTs) {
          this._pickerStartDay = day;
          this._pickerStartMonth = this._pickerMonth;
          this._pickerStartYear = this._pickerYear;
          this._pickerEndDay = null;
          this._pickerPhase = 'start';
          return;
        }
      }
      this._pickerEndDay = day;
      this._pickerEndMonth = this._pickerMonth;
      this._pickerEndYear = this._pickerYear;
    }
  }

  private _pickerSetTime(which: 'startHour' | 'startMinute' | 'endHour' | 'endMinute', e: Event): void {
    const val = (e.target as HTMLInputElement).value.replace(/\D/g, '').slice(0, 2);
    const isHour = which.includes('Hour');
    const num = Math.min(isHour ? 23 : 59, Math.max(0, parseInt(val, 10) || 0));
    const padded = String(num).padStart(2, '0');
    (e.target as HTMLInputElement).value = padded;
    if (which === 'startHour') this._pickerStartHour = padded;
    else if (which === 'startMinute') this._pickerStartMinute = padded;
    else if (which === 'endHour') this._pickerEndHour = padded;
    else this._pickerEndMinute = padded;
    this.requestUpdate();
  }

  private _pickerConfirm(): void {
    if (!this._pickerTarget || this._pickerStartDay === null || this._pickerEndDay === null) return;
    const { entityId, periodIdx } = this._pickerTarget;
    const sm = String(this._pickerStartMonth + 1).padStart(2, '0');
    const sd = String(this._pickerStartDay).padStart(2, '0');
    const em = String(this._pickerEndMonth + 1).padStart(2, '0');
    const ed = String(this._pickerEndDay).padStart(2, '0');
    const startVal = `${this._pickerStartYear}-${sm}-${sd}T${this._pickerStartHour}:${this._pickerStartMinute}`;
    const endVal = `${this._pickerEndYear}-${em}-${ed}T${this._pickerEndHour}:${this._pickerEndMinute}`;
    this._updateSchedulePeriod(entityId, periodIdx, 'start', startVal);
    this._updateSchedulePeriod(entityId, periodIdx, 'end', endVal);
    this._closePicker();
  }

  private _toAbsDay(year: number, month: number, day: number): number {
    return new Date(year, month, day).getTime();
  }

  private _getMonthDays(): Array<{ day: number; otherMonth: boolean; today: boolean; rangeStart: boolean; rangeEnd: boolean; inRange: boolean }> {
    const year = this._pickerYear;
    const month = this._pickerMonth;
    const firstDay = new Date(year, month, 1).getDay();
    const startOffset = (firstDay + 6) % 7;
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();
    const now = new Date();
    const isCurrentMonth = now.getFullYear() === year && now.getMonth() === month;
    const todayDate = now.getDate();

    const startTs = this._pickerStartDay !== null ? this._toAbsDay(this._pickerStartYear, this._pickerStartMonth, this._pickerStartDay) : null;
    const endTs = this._pickerEndDay !== null ? this._toAbsDay(this._pickerEndYear, this._pickerEndMonth, this._pickerEndDay) : null;

    type DayInfo = { day: number; otherMonth: boolean; today: boolean; rangeStart: boolean; rangeEnd: boolean; inRange: boolean };
    const days: DayInfo[] = [];

    const classify = (d: number, isOther: boolean, absYear: number, absMonth: number): DayInfo => {
      const ts = this._toAbsDay(absYear, absMonth, d);
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

  private _getMonthLabel(): string {
    const date = new Date(this._pickerYear, this._pickerMonth, 1);
    const lang = this._lang === 'fr' ? 'fr-FR' : 'en-US';
    const monthName = date.toLocaleDateString(lang, { month: 'long' });
    return `${monthName.charAt(0).toUpperCase()}${monthName.slice(1)} ${this._pickerYear}`;
  }

  private _getDayLabels(): string[] {
    if (this._lang === 'fr') return ['Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa', 'Di'];
    return ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
  }

  // — Drag & drop for light reorder —

  protected override _onLocalDragStart(idx: number): void {
    this._dragIdx = idx;
  }

  protected override _onLocalDragOver(idx: number, e: DragEvent): void {
    e.preventDefault();
    if (this._dragIdx !== null && this._dragIdx !== idx) this._dropIdx = idx;
  }

  protected override _onLocalDragLeave(): void {
    this._dropIdx = null;
  }

  protected override _onLocalDragEnd(): void {
    this._dragIdx = null;
    this._dropIdx = null;
  }

  private _onDropLight(idx: number, e: DragEvent): void {
    e.preventDefault();
    if (this._dragIdx === null || this._dragIdx === idx) {
      this._onLocalDragEnd();
      return;
    }
    const arr = [...this._lights];
    const [moved] = arr.splice(this._dragIdx, 1);
    arr.splice(idx, 0, moved);
    this._lights = arr;
    this._onLocalDragEnd();
  }

  // — Render: schedule content —

  private _renderScheduleContent(entityId: string): TemplateResult {
    const periods = this._scheduleEdits.get(entityId) ?? [];
    return html`
      <div class="schedule-body">
        <div class="schedule-header">${t('config.light_schedule_title')}</div>
        ${periods.map((p, idx) => html`
          <div class="schedule-period">
            <div class="schedule-row">
              <button
                class="datetime-display ${p.start || p.end ? '' : 'empty'}"
                @click=${() => this._openRangePicker(entityId, idx)}
              >
                ${p.start || p.end ? this._formatPeriodDisplay(p) : t('config.light_schedule_no_date')}
              </button>
            </div>
            <div class="schedule-row schedule-row-actions">
              <button
                class="check-item ${p.recurring ? 'checked' : ''}"
                @click=${() => this._toggleScheduleRecurring(entityId, idx)}
              >
                <span class="check-box">
                  <ha-icon .icon=${'mdi:check'}></ha-icon>
                </span>
                <span class="check-label">${t('config.light_schedule_recurring')}</span>
              </button>
              <glass-icon-button
                class="schedule-delete"
                size="xs"
                active
                active-color="alert"
                .icon=${'mdi:delete-outline'}
                aria-label="${t('config.light_schedule_delete_aria')}"
                @click=${() => this._removeSchedulePeriod(entityId, idx)}
              ></glass-icon-button>
            </div>
          </div>
        `)}
        <glass-button class="schedule-add" variant="secondary" size="sm" .icon=${'mdi:plus'} @click=${() => this._addSchedulePeriod(entityId)}>
          ${t('config.light_schedule_add')}
        </glass-button>
        <glass-button class="schedule-save" variant="primary" size="sm" @click=${() => this._saveSchedule(entityId)}>
          ${t('common.save')}
        </glass-button>
      </div>
    `;
  }

  // — Render: light row —

  private _renderLightRow(light: LightEntry, idx: number): TemplateResult {
    const isDragging = this._dragIdx === idx;
    const isDropTarget = this._dropIdx === idx;
    const rowClasses = [
      'item-row',
      !light.visible ? 'disabled' : '',
      isDragging ? 'dragging' : '',
      isDropTarget ? 'drop-target' : '',
    ].filter(Boolean).join(' ');
    const editPeriods = this._scheduleEdits.get(light.entityId);
    const hasSchedule = editPeriods
      ? editPeriods.some((p) => p.start && p.end)
      : (this._schedulesLoaded[light.entityId]?.periods?.length ?? 0) > 0;
    const isExpanded = this._scheduleExpandedEntity === light.entityId;
    const wrapClasses = ['item-card', isExpanded ? 'expanded' : ''].filter(Boolean).join(' ');

    return html`
      <div class=${wrapClasses}>
        <div
          class=${rowClasses}
          draggable="true"
          @dragstart=${() => this._onLocalDragStart(idx)}
          @dragover=${(e: DragEvent) => this._onLocalDragOver(idx, e)}
          @dragleave=${() => this._onLocalDragLeave()}
          @drop=${(e: DragEvent) => this._onDropLight(idx, e)}
          @dragend=${() => this._onLocalDragEnd()}
        >
          <glass-drag-handle></glass-drag-handle>
          <div class="item-info">
            <span class="item-name">${light.name}</span>
            <span class="item-meta">${light.entityId}</span>
          </div>
          <div class="light-state">
            <span class="light-dot ${light.isOn ? 'on' : ''}"></span>
          </div>
          <glass-icon-button
            class="schedule-btn"
            size="xs"
            ?active=${hasSchedule}
            .icon=${'mdi:calendar-clock'}
            aria-label="${t('config.light_schedule_aria', { name: light.name })}"
            aria-expanded=${isExpanded ? 'true' : 'false'}
            title="${t('config.light_schedule_title')}"
            @click=${() => this._toggleScheduleExpand(light.entityId)}
          ></glass-icon-button>
          <button
            class="layout-btn"
            @click=${() => this._cycleLightLayout(light.entityId)}
            aria-label="${t('config.light_change_layout_aria')}"
            title="${t(light.layout === 'compact' ? 'config.light_layout_compact' : 'config.light_layout_full')}"
          >
            ${t(light.layout === 'compact' ? 'config.light_layout_compact' : 'config.light_layout_full')}
          </button>
          <glass-toggle
            .checked=${light.visible}
            aria-label="${light.visible ? t('common.hide') : t('common.show')} ${light.name}"
            @glass-toggle-change=${() => this._toggleLightVisible(light.entityId)}
          ></glass-toggle>
        </div>
        <div class="fold-sep ${isExpanded ? 'visible' : ''}"></div>
        <div class="schedule-fold ${isExpanded ? 'open' : ''}">
          <div class="schedule-fold-inner">
            ${this._renderScheduleContent(light.entityId)}
          </div>
        </div>
      </div>
    `;
  }

  // — Render: datetime picker —

  private _renderDateTimePicker(): TemplateResult | typeof nothing {
    if (!this._pickerOpen) return nothing;
    const days = this._getMonthDays();
    const dayLabels = this._getDayLabels();
    const canConfirm = this._pickerStartDay !== null && this._pickerEndDay !== null;
    return html`
      <div class="picker-overlay"
        @click=${(e: Event) => { if (e.target === e.currentTarget) this._closePicker(); }}
        @keydown=${(e: KeyboardEvent) => { if (e.key === 'Escape') this._closePicker(); }}
      >
        <div class="picker-popup" role="dialog" aria-modal="true" aria-label="${t('config.light_schedule_title')}">
          <div class="picker-phase">
            <button
              class="picker-phase-btn ${this._pickerPhase === 'start' ? 'active' : ''}"
              @click=${() => { this._pickerPhase = 'start'; }}
            >${t('config.light_schedule_start')}</button>
            <button
              class="picker-phase-btn ${this._pickerPhase === 'end' ? 'active' : ''}"
              @click=${() => { this._pickerPhase = 'end'; }}
            >${t('config.light_schedule_end')}</button>
          </div>
          <div class="picker-header">
            <button class="picker-nav" @click=${() => this._pickerPrevMonth()} aria-label="${t('config.light_schedule_prev_month_aria')}">
              <ha-icon .icon=${'mdi:chevron-left'}></ha-icon>
            </button>
            <span class="picker-month">${this._getMonthLabel()}</span>
            <button class="picker-nav" @click=${() => this._pickerNextMonth()} aria-label="${t('config.light_schedule_next_month_aria')}">
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
                <button class=${cls} @click=${() => this._pickerSelectDay(d.day, d.otherMonth)}>${d.day}</button>
              `;
            })}
          </div>
          <div class="picker-time-row">
            <div class="picker-time-group">
              <span class="picker-time-label">${t('config.light_schedule_start')}</span>
              <div class="time-input">
                <input type="text" class="time-digit" maxlength="2"
                  .value=${this._pickerStartHour}
                  @change=${(e: Event) => this._pickerSetTime('startHour', e)}
                />
                <span class="time-sep">:</span>
                <input type="text" class="time-digit" maxlength="2"
                  .value=${this._pickerStartMinute}
                  @change=${(e: Event) => this._pickerSetTime('startMinute', e)}
                />
              </div>
            </div>
            <div class="picker-time-group">
              <span class="picker-time-label">${t('config.light_schedule_end')}</span>
              <div class="time-input">
                <input type="text" class="time-digit" maxlength="2"
                  .value=${this._pickerEndHour}
                  @change=${(e: Event) => this._pickerSetTime('endHour', e)}
                />
                <span class="time-sep">:</span>
                <input type="text" class="time-digit" maxlength="2"
                  .value=${this._pickerEndMinute}
                  @change=${(e: Event) => this._pickerSetTime('endMinute', e)}
                />
              </div>
            </div>
          </div>
          <glass-button
            class="picker-confirm"
            variant="primary"
            size="sm"
            ?disabled=${!canConfirm}
            @click=${() => this._pickerConfirm()}
          >
            ${t('config.light_schedule_confirm')}
          </glass-button>
        </div>
      </div>
    `;
  }

  // — Render: main tab —

  renderTab(): TemplateResult {
    void this._lang;
    const hasRoom = !!this._lightRoom;
    const hasLights = this._lights.length > 0;

    return html`
      <div class="tab-panel light-tab" id="panel-light">
        <glass-light-card .hass=${this.hass} .areaId=${this.areaId} config-preview></glass-light-card>
        <div class="cfg-info">
          <ha-icon .icon=${'mdi:information-outline'}></ha-icon>
          <span>${t('config.light_dashboard_vs_room')}</span>
        </div>

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
              nameKey: 'config.light_show_header',
              descKey: 'config.light_show_header_desc',
              on: this._lightShowHeader,
              onToggle: () => { this._lightShowHeader = !this._lightShowHeader; },
            })}
          </div>
        </section>

        ${hasRoom ? html`
          <section class="cfg-section">
            <header class="cfg-section-head">
              <span class="cfg-section-num">2</span>
              <div class="cfg-section-text">
                <span class="section-label">${t('config.light_list_title')}</span>
                <span class="section-desc">${t('config.light_list_banner')}</span>
              </div>
              ${hasLights ? html`<span class="cfg-section-count">${this._lights.length}</span>` : nothing}
            </header>

            ${hasLights ? html`
              <div class="item-list">
                ${this._lights.map((light, idx) => this._renderLightRow(light, idx))}
              </div>
              <div class="section-desc schedule-hint">
                <ha-icon .icon=${'mdi:information-outline'}></ha-icon>
                ${t('config.light_schedule_hint')}
              </div>
            ` : html`
              <glass-empty-state variant="inline" .icon=${'mdi:lightbulb-off-outline'} .title=${t('config.light_no_lights')}></glass-empty-state>
            `}
          </section>
        ` : nothing}

        ${hasRoom ? html`
          <div class="save-bar">
            <glass-button variant="ghost" @click=${() => this._loadRoomLights()}>${t('common.reset')}</glass-button>
          </div>
        ` : nothing}
      </div>

      ${this._renderDateTimePicker()}
    `;
  }
}

try { customElements.define('config-tab-light', ConfigTabLight); } catch { /* already registered */ }
