import { html, svg, css, nothing, type TemplateResult } from 'lit';
import { property, state } from 'lit/decorators.js';
import { BaseCard, BackendService } from '@glass-cards/base-card';
import { glassTokens, hostMixin, glassMixin, marqueeMixin, marqueeText, MARQUEE_COMPACT } from '@glass-cards/ui-core';

interface HaCalendarEvent {
  summary: string;
  start: { dateTime?: string; date?: string };
  end: { dateTime?: string; date?: string };
  description?: string;
  location?: string;
}

const REFRESH_INTERVAL_MS = 15 * 60 * 1000;

// ───────────────────────── Types ─────────────────────────

export interface CalendarEvent {
  title: string;
  /** "HH:MM" or "HH:MM - HH:MM" — null/undefined for all-day */
  time?: string | null;
  cal: string;
  allday?: boolean;
  now?: boolean;
  /** Days from today: 0 = today, 1 = tomorrow, etc. Undefined for the
   *  externally-provided preview events (treated as today). */
  dayOffset?: number;
}

interface CalDef { color: string; label: string }

// Calendar colors map to framework tokens where possible.
// `famille` (pink) has no equivalent in the current palette — kept as hex.
export const CAL_COLORS: Record<string, CalDef> = {
  perso: { color: 'var(--c-accent)', label: 'Personnel' },
  travail: { color: 'var(--c-info)', label: 'Travail' },
  famille: { color: '#f472b6', label: 'Famille' },
  taches: { color: 'var(--c-warning)', label: 'Tâches' },
  anniversaires: { color: 'var(--c-success)', label: 'Anniversaires' },
};

const DAYS_FR = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
const MONTHS_FR = ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'];

const TICKER_INTERVAL_MS = 3500;
const TICKER_TRANSITION_MS = 500;

// ───────────────────────── Helpers ─────────────────────────

function isUpcoming(timeStr: string): boolean {
  const parts = timeStr.split(' - ');
  const endTime = parts.length > 1 ? parts[1] : parts[0];
  const [h, m] = endTime.split(':').map((n) => parseInt(n, 10));
  const now = new Date();
  const eventEnd = new Date();
  eventEnd.setHours(h, m, 0, 0);
  return eventEnd > now;
}

function visibleInTicker(e: CalendarEvent): boolean {
  if ((e.dayOffset ?? 0) !== 0) return false;
  return !!(e.now || e.allday || !e.time || isUpcoming(e.time));
}

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// ───────────────────────── Component ─────────────────────────

export class GlassCalendarCard extends BaseCard {
  getCardSize() { return 1; }

  /** Events. When externally provided (e.g. configPreview), the card uses
   *  them as-is. Otherwise the card fetches them from HA Calendar API. */
  @property({ attribute: false }) events: CalendarEvent[] = [];
  @property({ type: Boolean, attribute: 'show-header' }) showHeader = true;

  @state() private _open = false;
  /** Day selected in the week strip (0 = today, 1 = tomorrow, ..., 6 = +6d). */
  @state() private _selectedDayOffset = 0;
  /** Current index of the active ticker item. */
  @state() private _tickerIdx = 0;
  /** Index of the item that is currently sliding out (above). null when no transition in flight. */
  @state() private _tickerLeavingIdx: number | null = null;

  /** Backend-loaded list of calendar.* entities the user has chosen to hide. */
  @state() private _hiddenEntities: string[] = [];
  /** Events fetched from HA Calendar API when no external events are supplied. */
  @state() private _fetchedEvents: CalendarEvent[] = [];

  private _tickerTimer?: ReturnType<typeof setInterval>;
  private _leaveTimer?: ReturnType<typeof setTimeout>;
  private _refreshTimer?: ReturnType<typeof setInterval>;
  private _backend?: BackendService;
  private _configLoaded = false;
  private _fetchInFlight = false;
  /** Stable id so multiple instances can coexist with aria-controls. */
  private readonly _foldId = `cal-fold-${Math.random().toString(36).slice(2, 9)}`;

  connectedCallback(): void {
    super.connectedCallback();
    this._startTicker();
    this._listen('calendar-config-changed', () => {
      this._configLoaded = false;
      this._loadConfigAndFetch();
    });
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._stopTicker();
    this._stopRefreshTimer();
    this._backend = undefined;
    this._configLoaded = false;
  }

  protected willUpdate(changedProps: Map<string, unknown>): void {
    super.willUpdate(changedProps as never);
    if (changedProps.has('hass') && this.hass && !this.configPreview) {
      if (!this._configLoaded) this._loadConfigAndFetch();
    }
  }

  private async _loadConfigAndFetch(): Promise<void> {
    if (!this.hass) return;
    if (!this._backend) this._backend = new BackendService(this.hass);
    try {
      const result = await this._backend.send<{
        calendar_card?: { show_header?: boolean; hidden_entities?: string[] };
      }>('get_config');
      this._hiddenEntities = result?.calendar_card?.hidden_entities ?? [];
      if (result?.calendar_card?.show_header !== undefined) {
        this.showHeader = result.calendar_card.show_header;
      }
      this._configLoaded = true;
    } catch {
      // Backend unavailable — proceed with defaults
      this._configLoaded = true;
    }
    await this._fetchEvents();
    this._startRefreshTimer();
  }

  private _startRefreshTimer(): void {
    this._stopRefreshTimer();
    this._refreshTimer = setInterval(() => { void this._fetchEvents(); }, REFRESH_INTERVAL_MS);
  }

  private _stopRefreshTimer(): void {
    if (this._refreshTimer) {
      clearInterval(this._refreshTimer);
      this._refreshTimer = undefined;
    }
  }

  private async _fetchEvents(): Promise<void> {
    if (!this.hass || this.configPreview || this._fetchInFlight) return;
    this._fetchInFlight = true;
    try {
      const hidden = new Set(this._hiddenEntities);
      const calendarIds = Object.keys(this.hass.states)
        .filter((id) => id.startsWith('calendar.') && !hidden.has(id));
      if (calendarIds.length === 0) {
        this._fetchedEvents = [];
        return;
      }
      const start = new Date();
      start.setHours(0, 0, 0, 0);
      const end = new Date(start);
      end.setDate(end.getDate() + 7);
      const startIso = start.toISOString();
      const endIso = end.toISOString();
      const qs = `start=${encodeURIComponent(startIso)}&end=${encodeURIComponent(endIso)}`;
      const lists = await Promise.all(
        calendarIds.map(async (id) => {
          try {
            const raw = await this.hass!.callApi<HaCalendarEvent[]>('GET', `calendars/${id}?${qs}`);
            return (Array.isArray(raw) ? raw : []).map((ev) => this._toCardEvent(ev, id));
          } catch (err) {
            console.warn(`[glass-calendar-card] failed to fetch events for ${id}`, err);
            return [];
          }
        }),
      );
      const flat = lists.flat();
      flat.sort((a: CalendarEvent, b: CalendarEvent) => (a.allday ? 0 : 1) - (b.allday ? 0 : 1)
        || (a.time ?? '').localeCompare(b.time ?? ''));
      this._fetchedEvents = flat;
    } finally {
      this._fetchInFlight = false;
    }
  }

  private _toCardEvent(ev: HaCalendarEvent, entityId: string): CalendarEvent {
    const cal = entityId.split('.')[1] || 'perso';
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (ev.start.date && !ev.start.dateTime) {
      const startDay = new Date(ev.start.date + 'T00:00:00');
      const dayOffset = Math.round((startDay.getTime() - today.getTime()) / 86400000);
      return { title: ev.summary, time: null, cal, allday: true, dayOffset };
    }
    const startIso = ev.start.dateTime ?? '';
    const endIso = ev.end.dateTime ?? '';
    const startHM = startIso ? startIso.slice(11, 16) : '';
    const endHM = endIso ? endIso.slice(11, 16) : '';
    const time = endHM && endHM !== startHM ? `${startHM} - ${endHM}` : startHM || null;
    const startDate = startIso ? new Date(startIso) : null;
    const endDate = endIso ? new Date(endIso) : null;
    const now = new Date();
    const isNow = !!(startDate && endDate && startDate <= now && endDate >= now);
    let dayOffset = 0;
    if (startDate) {
      const startDay = new Date(startDate);
      startDay.setHours(0, 0, 0, 0);
      dayOffset = Math.round((startDay.getTime() - today.getTime()) / 86400000);
    }
    return { title: ev.summary, time, cal, now: isNow, dayOffset };
  }

  protected updated(changedProps: Map<string, unknown>): void {
    super.updated(changedProps as never);
    if (changedProps.has('events') || changedProps.has('_fetchedEvents')) {
      this._stopTicker();
      this._tickerIdx = 0;
      this._tickerLeavingIdx = null;
      this._startTicker();
    } else if (!this._tickerTimer && this._tickerEvents().length > 1) {
      this._startTicker();
    }
  }

  private _allEvents(): CalendarEvent[] {
    return this.events.length > 0 ? this.events : this._fetchedEvents;
  }

  protected _collapseExpanded(): void {
    if (this._open) this._open = false;
  }

  private _tickerEvents(): CalendarEvent[] {
    return this._allEvents().filter(visibleInTicker);
  }

  private _startTicker(): void {
    const items = this._tickerEvents();
    if (items.length <= 1 || prefersReducedMotion()) return;
    this._tickerTimer = setInterval(() => this._advanceTicker(), TICKER_INTERVAL_MS);
  }

  private _stopTicker(): void {
    if (this._tickerTimer) clearInterval(this._tickerTimer);
    this._tickerTimer = undefined;
    if (this._leaveTimer) clearTimeout(this._leaveTimer);
    this._leaveTimer = undefined;
  }

  private _advanceTicker(): void {
    const items = this._tickerEvents();
    if (items.length <= 1) return;
    const prev = this._tickerIdx;
    this._tickerLeavingIdx = prev;
    this._tickerIdx = (prev + 1) % items.length;
    this._leaveTimer = setTimeout(() => { this._tickerLeavingIdx = null; }, TICKER_TRANSITION_MS);
  }

  private _toggleOpen(): void {
    this._open = !this._open;
  }

  // ───────────── Render ─────────────

  protected render(): TemplateResult {
    const now = new Date();
    const dateLabel = `${DAYS_FR[now.getDay()]} ${now.getDate()} ${MONTHS_FR[now.getMonth()]}`;
    const ticker = this._tickerEvents();
    const nowCount = ticker.filter((e) => e.now).length;

    return html`
      ${this.showHeader ? this._renderHeader(ticker.length, nowCount) : nothing}
      <div class="glass calendar-card ${this._open ? 'open' : ''}">
        <button
          class="v4-compact"
          type="button"
          aria-expanded=${this._open ? 'true' : 'false'}
          aria-controls=${this._foldId}
          aria-label=${this._open ? 'Fermer le calendrier' : 'Ouvrir le calendrier'}
          @click=${() => this._toggleOpen()}
        >
          <span class="v4-compact-left">
            ${this._calendarIcon('v4-compact-icon')}
            <span class="v4-compact-date">${dateLabel}</span>
            <span class="v4-compact-count">${ticker.length}</span>
          </span>
          <span class="v4-compact-sep"></span>
          <span class="v4-ticker-wrap" aria-live="polite" aria-atomic="true">
            ${this._renderTicker(ticker)}
          </span>
          <span class="v4-compact-chevron">${this._chevronIcon()}</span>
        </button>

        <div class="v4-fold-sep below-compact" aria-hidden="true"></div>
        <div class="v4-fold" id=${this._foldId}>
          <div class="v4-fold-inner">
            <div class="card-inner">
              ${this._renderWeekStrip()}
              ${this._renderEventList()}
              ${this._renderLegend()}
            </div>
          </div>
        </div>
        <div class="v4-fold-sep below-fold" aria-hidden="true"></div>
      </div>
    `;
  }

  private _renderHeader(total: number, nowCount: number): TemplateResult {
    const countClass = total === 0 ? 'none' : nowCount > 0 ? 'now' : 'some';
    return html`
      <div class="card-header">
        <div class="card-header-left">
          <span class="card-title">Calendrier</span>
          <span class="card-count ${countClass}">${total}</span>
        </div>
      </div>
    `;
  }

  private _renderTicker(items: CalendarEvent[]): TemplateResult | typeof nothing {
    if (items.length === 0) {
      return html`<span class="v4-ticker-empty">Aucun événement</span>`;
    }
    // Normalize indices defensively — items.length may have changed since last advance.
    const activeIdx = ((this._tickerIdx % items.length) + items.length) % items.length;
    const leavingIdx = this._tickerLeavingIdx == null ? null : ((this._tickerLeavingIdx % items.length) + items.length) % items.length;
    return html`${items.map((ev, i) => {
      const color = CAL_COLORS[ev.cal]?.color ?? 'var(--t4)';
      const timeLabel = ev.time ? ev.time.split(' - ')[0] : 'Journée';
      const state = i === activeIdx
        ? 'active'
        : i === leavingIdx ? 'above' : 'below';
      return html`
        <span class="v4-ticker-item ${state} ${ev.now ? 'now' : ''}">
          <span class="v4-ticker-dot" style="background:${color}"></span>
          <span class="v4-ticker-text">${ev.title}</span>
          <span class="v4-ticker-time">${timeLabel}</span>
        </span>
      `;
    })}`;
  }

  private _eventsForOffset(offset: number): CalendarEvent[] {
    const all = this._allEvents();
    if (offset === 0) {
      // Today: include events explicitly tagged today, plus untagged preview
      // events (which the card represents as "today" by convention).
      return all.filter((e) => (e.dayOffset ?? 0) === 0);
    }
    return all.filter((e) => e.dayOffset === offset);
  }

  private _selectDay(offset: number): void {
    this._selectedDayOffset = offset;
    if (!this._open) this._open = true;
  }

  private _renderWeekStrip(): TemplateResult {
    const now = new Date();
    const all = this._allEvents();
    const dotsByOffset = new Map<number, string[]>();
    for (const e of all) {
      const off = e.dayOffset ?? 0;
      if (off < 0 || off > 6) continue;
      const arr = dotsByOffset.get(off) ?? [];
      arr.push(e.cal);
      dotsByOffset.set(off, arr);
    }
    const days: TemplateResult[] = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(now);
      d.setDate(now.getDate() + i);
      const isToday = i === 0;
      const isSelected = i === this._selectedDayOffset;
      const dots = (dotsByOffset.get(i) ?? []).slice(0, 3);
      days.push(html`
        <button
          class="v4-week-day ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''}"
          type="button"
          aria-pressed=${isSelected ? 'true' : 'false'}
          aria-label="${DAYS_FR[d.getDay()]} ${d.getDate()}${isToday ? ', aujourd\'hui' : ''}, ${dots.length} évènement${dots.length > 1 ? 's' : ''}"
          @click=${(e: Event) => { e.stopPropagation(); this._selectDay(i); }}
        >
          <span class="v4-week-day-label">${DAYS_FR[d.getDay()]}</span>
          <span class="v4-week-day-num">${d.getDate()}</span>
          <span class="v4-week-day-dots">
            ${dots.map((c) => html`<span class="v4-week-dot" style="background:${CAL_COLORS[c]?.color ?? 'var(--t4)'}"></span>`)}
          </span>
        </button>
      `);
    }
    return html`<div class="v4-week-strip">${days}</div>`;
  }

  private _renderEventList(): TemplateResult {
    const events = this._eventsForOffset(this._selectedDayOffset);
    const isToday = this._selectedDayOffset === 0;
    const sectionLabel = this._sectionLabelFor(this._selectedDayOffset);
    const eyebrow = html`
      <div class="cal-eyebrow">
        <span class="cal-eyebrow-dot"></span>
        <span>${sectionLabel}</span>
        ${events.length > 0 ? html`<span class="cal-eyebrow-count">${events.length}</span>` : nothing}
      </div>
    `;
    const body = events.length === 0
      ? html`
        <div class="v4-event-empty" role="status" aria-live="polite">
          <div class="ambient-icon">${this._calendarIcon('ambient-svg')}</div>
          <span class="v4-event-empty-title">Rien de prévu</span>
          <span class="v4-event-empty-sub">${isToday ? 'Profitez de votre journée' : 'Aucun évènement ce jour-là'}</span>
        </div>
      `
      : html`
        <div class="v4-event-list">
          ${events.map((ev) => {
            const color = CAL_COLORS[ev.cal]?.color ?? 'var(--c-accent)';
            const timeLabel = ev.now && ev.time ? `${ev.time} · En cours` : ev.time ?? 'Toute la journée';
            return html`
              <button class="v4-event-row ${ev.now ? 'now' : ''}" type="button"
                style="--ev-color: ${color};"
                aria-label="${ev.title}${ev.time ? `, ${ev.time}` : ', toute la journée'}${ev.now ? ', en cours' : ''}">
                <span class="v4-event-dot" aria-hidden="true"></span>
                <span class="v4-event-content">
                  <span class="v4-event-title">${marqueeText(ev.title, MARQUEE_COMPACT)}</span>
                  <span class="v4-event-time">${timeLabel}</span>
                </span>
                ${ev.allday ? html`<span class="v4-event-allday">Journée</span>` : nothing}
              </button>
            `;
          })}
        </div>
      `;
    return html`<div class="v4-event-section">${eyebrow}${body}</div>`;
  }

  private _sectionLabelFor(offset: number): string {
    if (offset === 0) return 'Aujourd\'hui';
    if (offset === 1) return 'Demain';
    const d = new Date();
    d.setDate(d.getDate() + offset);
    return `${DAYS_FR[d.getDay()]} ${d.getDate()} ${MONTHS_FR[d.getMonth()]}`;
  }

  private _renderLegend(): TemplateResult {
    return html`
      <div class="v4-cal-legend">
        ${Object.entries(CAL_COLORS).map(([, def]) => html`
          <span class="v4-cal-legend-item">
            <span class="v4-cal-legend-dot" style="background:${def.color}"></span>
            <span class="v4-cal-legend-label">${def.label}</span>
          </span>
        `)}
      </div>
    `;
  }

  private _calendarIcon(cls: string): TemplateResult {
    return html`<svg class=${cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      ${svg`<rect x="3" y="4" width="18" height="18" rx="2"/>`}
      ${svg`<line x1="16" y1="2" x2="16" y2="6"/>`}
      ${svg`<line x1="8" y1="2" x2="8" y2="6"/>`}
      ${svg`<line x1="3" y1="10" x2="21" y2="10"/>`}
    </svg>`;
  }

  private _chevronIcon(): TemplateResult {
    return html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      ${svg`<polyline points="6 9 12 15 18 9"/>`}
    </svg>`;
  }

  // ───────────── Styles ─────────────

  static styles = [glassTokens, hostMixin, glassMixin, marqueeMixin, css`
    :host { width: 100%; color: var(--t1); }
    .calendar-card { width: 100%; overflow: hidden; position: relative; }

    /* ── Card Header (matches presence/climate/etc. pattern) ── */
    .card-header {
      display: flex; align-items: center; justify-content: space-between;
      padding: 0 0.375rem; min-height: 1.375rem; margin-bottom: 0.375rem;
      box-sizing: border-box;
    }
    .card-header-left { display: flex; align-items: center; gap: 0.5rem; }
    .card-title {
      font-size: var(--fz-xs); font-weight: 700;
      text-transform: uppercase; letter-spacing: 1.5px;
      color: var(--t4);
    }
    .card-count {
      display: inline-flex; align-items: center; justify-content: center;
      min-width: 0.875rem; height: 0.875rem; padding: 0 0.25rem;
      border-radius: var(--radius-full);
      font-size: var(--fz-xs); font-weight: 600;
      transition: background var(--t-med), color var(--t-med);
    }
    .card-count.some { background: var(--s2); color: var(--t3); }
    .card-count.now  { background: rgba(var(--rgb-accent), 0.18); color: rgb(var(--rgb-accent)); }
    .card-count.none { background: var(--s1); color: var(--t4); }

    /* ── Compact bar (matches presence-card height ~52px) ── */
    .v4-compact {
      display: flex; align-items: center; gap: 0.625rem;
      width: 100%;
      padding: 0.4375rem 0.875rem;
      min-height: 3.25rem;
      background: none; border: none; color: inherit;
      font-family: inherit; text-align: left;
      cursor: pointer; outline: none;
      border-radius: var(--radius-xl);
      transition: background var(--t-fast);
      -webkit-tap-highlight-color: transparent;
    }
    .v4-compact:active { background: rgba(var(--rgb-white), 0.03); }
    .v4-compact:focus-visible { outline: 2px solid rgba(var(--rgb-white), 0.25); outline-offset: -2px; }

    .v4-compact-left { display: inline-flex; align-items: center; gap: 0.5rem; flex-shrink: 0; }
    .v4-compact-icon { width: 0.875rem; height: 0.875rem; color: rgb(var(--rgb-accent)); flex-shrink: 0; }
    .v4-compact-date { font-size: var(--fz-base); font-weight: 700; color: var(--t1); white-space: nowrap; line-height: 1rem; }
    .v4-compact-count {
      font-size: var(--fz-sm); font-weight: 700; color: rgb(var(--rgb-accent));
      background: rgba(var(--rgb-accent), 0.12);
      border: 0.0625rem solid rgba(var(--rgb-accent), 0.2);
      border-radius: var(--radius-full); padding: 0 0.375rem;
      min-width: 1.125rem; height: 1.125rem;
      display: inline-flex; align-items: center; justify-content: center;
      line-height: 1; box-sizing: border-box;
    }
    .v4-compact-sep { width: 0.0625rem; height: 0.75rem; background: var(--b2); flex-shrink: 0; }

    /* ── Chevron (round, rotates via parent .open) ── */
    .v4-compact-chevron {
      width: 1.625rem; height: 1.625rem; border-radius: 50%;
      background: var(--s2); border: 0.0625rem solid var(--b1);
      display: inline-flex; align-items: center; justify-content: center;
      color: var(--t3); flex-shrink: 0;
      transition: background var(--t-fast), border-color var(--t-fast), color var(--t-fast);
    }
    .v4-compact:hover .v4-compact-chevron {
      background: var(--s3);
      border-color: rgba(var(--rgb-accent), 0.35);
      color: rgb(var(--rgb-accent));
    }
    .v4-compact-chevron svg { width: 0.75rem; height: 0.75rem; transition: transform var(--t-fast); }
    .calendar-card.open .v4-compact-chevron svg { transform: rotate(180deg); }
    .calendar-card.open .v4-compact-chevron {
      background: rgba(var(--rgb-accent), 0.12);
      border-color: rgba(var(--rgb-accent), 0.3);
      color: rgb(var(--rgb-accent));
    }

    /* ── Ticker ── */
    .v4-ticker-wrap { flex: 1; min-width: 0; height: 1rem; position: relative; overflow: hidden; }
    .v4-ticker-item {
      display: inline-flex; align-items: center; gap: 0.375rem;
      position: absolute; left: 0; right: 0; top: 0; bottom: 0;
      transition:
        transform var(--t-med),
        opacity var(--t-med);
    }
    .v4-ticker-item.below  { transform: translateY(100%);  opacity: 0; pointer-events: none; }
    .v4-ticker-item.active { transform: translateY(0);     opacity: 1; }
    .v4-ticker-item.above  { transform: translateY(-100%); opacity: 0; pointer-events: none; }
    .v4-ticker-dot { width: 0.3125rem; height: 0.3125rem; border-radius: 50%; flex-shrink: 0; }
    .v4-ticker-text {
      font-size: var(--fz-base); font-weight: 500; color: var(--t2);
      flex: 1; min-width: 0;
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis; line-height: 1rem;
    }
    .v4-ticker-time { font-size: var(--fz-base); font-weight: 500; color: var(--t3); flex-shrink: 0; line-height: 1rem; }
    .v4-ticker-item.now .v4-ticker-text { color: var(--t1); font-weight: 600; }
    .v4-ticker-item.now .v4-ticker-time { color: rgb(var(--rgb-accent)); }
    .v4-ticker-empty {
      position: relative; height: 1rem; display: inline-flex; align-items: center;
      font-size: var(--fz-base); font-weight: 500; color: var(--t4); font-style: italic;
    }

    /* ── Fold separators (gradient lines above/below open fold) ── */
    /* Hidden entirely when closed — no space taken, no anti-aliased traces. */
    .v4-fold-sep {
      display: none;
      height: 0.0625rem;
      margin: 0 0.75rem;
      background: linear-gradient(90deg, transparent, rgba(var(--rgb-accent), 0.15), transparent);
      opacity: 0;
      transition: opacity var(--t-fast) 0.1s;
    }
    .calendar-card.open .v4-fold-sep { display: block; opacity: 1; }
    .calendar-card.open .v4-fold-sep.below-fold { margin-bottom: 0.5rem; }

    /* ── Fold (grid 0fr/1fr — never animate height) ── */
    .v4-fold { display: grid; grid-template-rows: 0fr; transition: grid-template-rows var(--t-layout); }
    .calendar-card.open .v4-fold { grid-template-rows: 1fr; }
    .v4-fold-inner { overflow: hidden; opacity: 0; transition: opacity var(--t-fast); }
    .calendar-card.open .v4-fold-inner { opacity: 1; transition: opacity var(--t-fast) 0.1s; }
    .v4-fold .card-inner { padding: 0.5rem 0.875rem 0.875rem; }

    /* ── Week strip ── */
    .v4-week-strip {
      display: grid; grid-template-columns: repeat(7, 1fr); gap: 0.125rem;
      margin-bottom: 0.75rem; padding: 0.375rem 0.25rem;
      border-radius: var(--radius-md); background: var(--s1); border: 0.0625rem solid var(--b1);
    }
    .v4-week-day {
      display: flex; flex-direction: column; align-items: center; gap: 0.1875rem;
      padding: 0.375rem 0; min-height: 2.75rem;
      border-radius: var(--radius-sm); background: none; border: none;
      cursor: pointer; outline: none; font-family: inherit;
      transition: background var(--t-fast);
      -webkit-tap-highlight-color: transparent;
    }
    .v4-week-day:hover { background: var(--s3); }
    .v4-week-day:focus-visible { outline: 2px solid rgba(var(--rgb-white), 0.25); outline-offset: -2px; }
    .v4-week-day-label { font-size: var(--fz-xs); font-weight: 600; color: var(--t3); text-transform: uppercase; letter-spacing: 0.3px; line-height: 1; }
    .v4-week-day-num {
      font-size: var(--fz-md); font-weight: 600; color: var(--t2); line-height: 1;
      width: 1.625rem; height: 1.625rem;
      display: flex; align-items: center; justify-content: center; border-radius: 50%;
      transition: background var(--t-fast), color var(--t-fast);
    }
    .v4-week-day.today .v4-week-day-num {
      background: rgba(var(--rgb-accent), 0.2);
      color: rgb(var(--rgb-accent));
      font-weight: 700;
      box-shadow: 0 0 12px rgba(var(--rgb-accent), 0.35);
    }
    .v4-week-day.selected .v4-week-day-num {
      background: rgb(var(--rgb-accent));
      color: rgba(var(--rgb-white), 0.95);
      font-weight: 700;
      box-shadow: 0 0 14px rgba(var(--rgb-accent), 0.45);
    }
    .v4-week-day.selected.today .v4-week-day-num {
      background: rgb(var(--rgb-accent));
      color: rgba(var(--rgb-white), 0.95);
      box-shadow: 0 0 14px rgba(var(--rgb-accent), 0.5);
    }
    .v4-week-day-dots { display: inline-flex; gap: 0.1875rem; min-height: 0.25rem; }
    .v4-week-dot { width: 0.25rem; height: 0.25rem; border-radius: 50%; }
    @media (pointer: coarse) {
      .v4-week-day { position: relative; }
      .v4-week-day::after { content: ''; position: absolute; inset: -0.25rem 0; }
    }

    /* ── Event section (eyebrow + list) ── */
    .v4-event-section { display: flex; flex-direction: column; gap: 0.375rem; margin-bottom: 0.5rem; }
    .cal-eyebrow {
      display: flex; align-items: center; gap: 0.4375rem;
      padding: 0 0.125rem;
      min-height: 1.625rem;
      font-size: var(--fz-sm); font-weight: 700; color: var(--t2);
      letter-spacing: 0.1px;
    }
    .cal-eyebrow-dot {
      width: 0.375rem; height: 0.375rem; border-radius: 50%; flex-shrink: 0;
      background: rgb(var(--rgb-accent));
      box-shadow: 0 0 8px rgba(var(--rgb-accent), 0.55);
    }
    .cal-eyebrow-count {
      margin-left: auto;
      font-size: var(--fz-xs); font-weight: 600; color: var(--t4);
      padding: 0 0.375rem; height: 1rem;
      border-radius: var(--radius-full);
      background: var(--s2);
      display: inline-flex; align-items: center; line-height: 1;
    }

    .v4-event-list { display: flex; flex-direction: column; gap: 0.1875rem; }
    .v4-event-row {
      position: relative;
      display: flex; align-items: center; gap: 0.625rem;
      padding: 0.5rem 0.625rem;
      min-height: 2.75rem; border-radius: var(--radius-md);
      background: var(--s1); border: 0.0625rem solid transparent;
      cursor: pointer; outline: none; font-family: inherit; text-align: left;
      width: 100%;
      transition: background var(--t-fast), border-color var(--t-fast), transform var(--t-fast), box-shadow var(--t-fast);
      -webkit-tap-highlight-color: transparent;
    }
    @media (hover: hover) and (pointer: fine) {
      .v4-event-row:hover {
        background: var(--s2);
        transform: translateX(2px);
        box-shadow: 0 0 0 1px color-mix(in srgb, var(--ev-color) 35%, transparent);
      }
      .v4-event-row:hover .v4-event-dot { transform: scale(1.15); }
    }
    @media (hover: hover) { .v4-event-row:active { transform: translateX(2px) scale(0.99); } }
    .v4-event-row:focus-visible { outline: 2px solid rgba(var(--rgb-white), 0.25); outline-offset: -2px; }

    /* Calendar color dot (replaces the banned 3px side-stripe) */
    .v4-event-dot {
      width: 0.625rem; height: 0.625rem; border-radius: 50%;
      flex-shrink: 0;
      background: var(--ev-color);
      transition: transform var(--t-fast), box-shadow var(--t-fast);
    }
    .v4-event-content { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 0.125rem; }
    .v4-event-title {
      font-size: var(--fz-base); font-weight: 600; color: var(--t1); line-height: 1.3;
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }
    .v4-event-time { font-size: var(--fz-sm); font-weight: 500; color: var(--t3); line-height: 1.2; }
    .v4-event-allday {
      font-size: var(--fz-xxs); font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;
      color: var(--t3); padding: 0.125rem 0.5rem; border-radius: var(--radius-full);
      background: var(--s2); border: 0.0625rem solid var(--b1); flex-shrink: 0;
    }

    /* Now state: ring accent + glow on the dot */
    .v4-event-row.now {
      background: color-mix(in srgb, var(--c-accent) 9%, transparent);
      border-color: color-mix(in srgb, var(--c-accent) 35%, transparent);
      box-shadow: 0 0 0 1px color-mix(in srgb, var(--c-accent) 25%, transparent) inset;
    }
    .v4-event-row.now .v4-event-time {
      color: rgb(var(--rgb-accent)); font-weight: 600;
    }
    .v4-event-row.now .v4-event-dot {
      box-shadow: 0 0 10px var(--ev-color);
      animation: cal-dot-pulse 1.8s ease-in-out infinite;
    }
    @keyframes cal-dot-pulse {
      0%, 100% { box-shadow: 0 0 10px var(--ev-color); }
      50%      { box-shadow: 0 0 4px var(--ev-color); }
    }

    /* ── Empty state ── */
    .v4-event-empty {
      display: flex; flex-direction: column; align-items: center; gap: 0.375rem;
      padding: 1rem 1.25rem; text-align: center;
    }
    .v4-event-empty .ambient-icon {
      width: 3rem; height: 3rem; border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      background: color-mix(in srgb, var(--c-accent) 10%, transparent);
      border: 1px solid color-mix(in srgb, var(--c-accent) 22%, transparent);
      box-shadow: 0 0 18px rgba(var(--rgb-accent), 0.15);
      margin-bottom: 0.25rem;
    }
    .v4-event-empty .ambient-svg {
      width: 1.375rem; height: 1.375rem;
      color: color-mix(in srgb, var(--c-accent) 75%, var(--t2));
    }
    .v4-event-empty-title { font-size: var(--fz-md); font-weight: 700; color: var(--t1); line-height: 1.3; }
    .v4-event-empty-sub { font-size: var(--fz-sm); font-weight: 500; color: var(--t3); }

    /* ── Legend ── */
    .v4-cal-legend {
      display: flex; gap: 0.625rem; padding: 0.5rem 0.125rem 0; flex-wrap: wrap;
      border-top: 1px solid var(--b1);
      margin-top: 0.5rem;
    }
    .v4-cal-legend-item { display: inline-flex; align-items: center; gap: 0.3125rem; }
    .v4-cal-legend-dot { width: 0.375rem; height: 0.375rem; border-radius: 50%; }
    .v4-cal-legend-label { font-size: var(--fz-xs); font-weight: 500; color: var(--t3); }

    /* ── Atmospheric halo at the bottom of the open fold ── */
    .calendar-card { position: relative; }
    .calendar-card::after {
      content: ''; position: absolute; left: 0; right: 0; bottom: 0;
      height: 50%; pointer-events: none; z-index: 0;
      background: radial-gradient(ellipse 70% 60% at 50% 100%, rgba(var(--rgb-accent), 0.08), transparent 70%);
      opacity: 0; transition: opacity var(--t-slow);
    }
    .calendar-card.open::after { opacity: 1; }
    .calendar-card > * { position: relative; z-index: 1; }

    /* ── Reduced motion ── */
    @media (prefers-reduced-motion: reduce) {
      .v4-fold,
      .v4-fold-inner,
      .v4-fold-sep,
      .v4-ticker-item,
      .v4-compact-chevron svg,
      .v4-week-day-num,
      .v4-event-row,
      .v4-event-dot,
      .calendar-card::after { transition-duration: 0.01ms !important; }
      .v4-event-row.now .v4-event-dot { animation: none; }
      .v4-ticker-item.above,
      .v4-ticker-item.below { display: none; }
      .v4-ticker-item.active { transform: none; opacity: 1; }
      .v4-event-row:hover { transform: none; }
    }
  `];
}

try { customElements.define('glass-calendar-card', GlassCalendarCard); } catch { /* already registered */ }
