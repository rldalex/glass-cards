import { html, svg, nothing, type TemplateResult } from 'lit';
import { property, state } from 'lit/decorators.js';
import { BaseCard, BackendService } from '@glass-cards/base-card';
import { glassTokens, hostMixin, glassMixin, tappableMixin } from '@glass-cards/ui-core';
import { calendarCardStyles } from './styles';

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
  const startStr = parts[0];
  const endStr = parts.length > 1 ? parts[1] : parts[0];
  const [eh, em] = endStr.split(':').map((n) => parseInt(n, 10));
  const [sh, sm] = startStr.split(':').map((n) => parseInt(n, 10));
  const now = new Date();
  const eventEnd = new Date();
  eventEnd.setHours(eh, em, 0, 0);
  // Cross-midnight: end < start numerically means end is tomorrow
  if (eh < sh || (eh === sh && em < sm)) {
    eventEnd.setDate(eventEnd.getDate() + 1);
  }
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
  private _midnightTimer?: ReturnType<typeof setInterval>;
  private _backend?: BackendService;
  private _configLoaded = false;
  private _configLoadInFlight = false;
  private _fetchInFlight = false;
  private _lastEventsKey = '';
  private _lastTodayKey = '';
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
    this._stopMidnightWatcher();
    this._backend = undefined;
    this._configLoaded = false;
  }

  protected willUpdate(changedProps: Map<string, unknown>): void {
    super.willUpdate(changedProps as never);
    if (changedProps.has('hass') && this.hass && !this.configPreview) {
      // Invalidate backend on WS reconnect so config + events reload fresh.
      if (this._backend && this._backend.connection !== this.hass.connection) {
        this._backend = undefined;
        this._configLoaded = false;
        this._configLoadInFlight = false;
      }
      if (!this._configLoaded) this._loadConfigAndFetch();
    }
  }

  private async _loadConfigAndFetch(): Promise<void> {
    if (!this.hass || this._configLoadInFlight) return;
    this._configLoadInFlight = true;
    try {
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
      this._startMidnightWatcher();
    } finally {
      this._configLoadInFlight = false;
    }
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

  private _todayKey(): string {
    const d = new Date();
    return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
  }

  /**
   * Detects midnight crossings (every minute). When today shifts, dayOffsets
   * computed at fetch time become stale, and the selected day index now points
   * to a different absolute date. Reset selection to today and refetch.
   */
  private _startMidnightWatcher(): void {
    this._stopMidnightWatcher();
    this._lastTodayKey = this._todayKey();
    this._midnightTimer = setInterval(() => {
      const k = this._todayKey();
      if (k !== this._lastTodayKey) {
        this._lastTodayKey = k;
        this._selectedDayOffset = 0;
        void this._fetchEvents();
      }
    }, 60 * 1000);
  }

  private _stopMidnightWatcher(): void {
    if (this._midnightTimer) {
      clearInterval(this._midnightTimer);
      this._midnightTimer = undefined;
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
            return (Array.isArray(raw) ? raw : []).flatMap((ev) => this._toCardEvents(ev, id));
          } catch (err) {
            console.warn(`[glass-calendar-card] failed to fetch events for ${id}`, err);
            return [] as CalendarEvent[];
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

  private _toCardEvents(ev: HaCalendarEvent, entityId: string): CalendarEvent[] {
    const cal = entityId.split('.')[1] || 'perso';
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // All-day event: HA returns start.date inclusive, end.date EXCLUSIVE (iCal/CalDAV).
    // A Mon-Wed event has start.date=Mon, end.date=Thu. Explode in one entry per visible day.
    if (ev.start.date && !ev.start.dateTime) {
      const startDay = new Date(ev.start.date + 'T00:00:00');
      const endDayExcl = ev.end.date
        ? new Date(ev.end.date + 'T00:00:00')
        : new Date(startDay.getTime() + 86400000);
      const startOffset = Math.round((startDay.getTime() - today.getTime()) / 86400000);
      const endOffsetExcl = Math.round((endDayExcl.getTime() - today.getTime()) / 86400000);
      const from = Math.max(0, startOffset);
      const to = Math.min(7, endOffsetExcl);
      const out: CalendarEvent[] = [];
      for (let off = from; off < to; off++) {
        out.push({ title: ev.summary, time: null, cal, allday: true, dayOffset: off });
      }
      return out;
    }

    // Timed event (possibly spanning midnight, but HA splits at midnight in most integrations).
    const startIso = ev.start.dateTime ?? '';
    const endIso = ev.end.dateTime ?? '';
    const startDate = startIso ? new Date(startIso) : null;
    const endDate = endIso ? new Date(endIso) : null;
    // Format in the browser's local timezone — backends may return UTC ISO
    // strings ("...Z"), so slicing the raw string would show the wrong hour.
    const fmtHM = (d: Date | null) => d
      ? `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`
      : '';
    const startHM = fmtHM(startDate);
    const endHM = fmtHM(endDate);
    const time = endHM && endHM !== startHM ? `${startHM} - ${endHM}` : startHM || null;
    const now = new Date();
    const isNow = !!(startDate && endDate && startDate <= now && endDate >= now);
    let dayOffset = 0;
    if (startDate) {
      const startDay = new Date(startDate);
      startDay.setHours(0, 0, 0, 0);
      dayOffset = Math.round((startDay.getTime() - today.getTime()) / 86400000);
    }
    if (dayOffset < 0 || dayOffset > 6) return [];
    return [{ title: ev.summary, time, cal, now: isNow, dayOffset }];
  }

  protected updated(changedProps: Map<string, unknown>): void {
    super.updated(changedProps as never);
    if (changedProps.has('events') || changedProps.has('_fetchedEvents')) {
      const key = this._eventsKey(this._allEvents());
      if (key !== this._lastEventsKey) {
        this._lastEventsKey = key;
        this._stopTicker();
        this._tickerIdx = 0;
        this._tickerLeavingIdx = null;
        this._startTicker();
      }
    } else if (!this._tickerTimer && this._tickerEvents().length > 1) {
      this._startTicker();
    }
  }

  /** Cheap content fingerprint for "did the event list change ?" checks. */
  private _eventsKey(events: CalendarEvent[]): string {
    return events.map((e) => `${e.title}\x1f${e.time ?? ''}\x1f${e.dayOffset ?? ''}\x1f${e.allday ? 1 : 0}\x1f${e.now ? 1 : 0}`).join('\x1e');
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
          <span class="v4-ticker-wrap" aria-hidden="true">
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
      </div>
    `;
  }

  private _renderHeader(total: number, nowCount: number): TemplateResult {
    const tone: 'success' | 'neutral' | 'accent' = total === 0 ? 'neutral' : nowCount > 0 ? 'accent' : 'success';
    return html`
      <div class="card-header">
        <div class="card-header-left">
          <span class="card-title">Calendrier</span>
          <glass-pill tone=${tone} size="sm">${total}</glass-pill>
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
      <glass-section-title label=${sectionLabel}>
        ${events.length > 0 ? html`<glass-pill slot="end" size="sm">${events.length}</glass-pill>` : nothing}
      </glass-section-title>
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
                  <span class="v4-event-title">${ev.title}</span>
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

  private _renderLegend(): TemplateResult | typeof nothing {
    // Show every calendar that has at least one event in the fetched window.
    // Slugs in CAL_COLORS keep their canonical label + colour; unknown slugs
    // fall back to the HA friendly_name (or the slug itself) and a neutral
    // accent colour, so users with non-default calendar IDs still see them.
    const usedOrder: string[] = [];
    const used = new Set<string>();
    for (const e of this._allEvents()) {
      if (!e.cal || used.has(e.cal)) continue;
      used.add(e.cal);
      usedOrder.push(e.cal);
    }
    if (usedOrder.length === 0) return nothing;

    const items = usedOrder.map((slug) => {
      const known = CAL_COLORS[slug];
      if (known) return { color: known.color, label: known.label };
      const entity = this.hass?.states[`calendar.${slug}`];
      const label = (entity?.attributes.friendly_name as string | undefined)
        ?? slug.charAt(0).toUpperCase() + slug.slice(1).replace(/_/g, ' ');
      return { color: 'var(--c-accent)', label };
    });

    return html`
      <div class="v4-cal-legend">
        ${items.map((def) => html`
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

  static styles = [glassTokens, hostMixin, glassMixin, tappableMixin, calendarCardStyles];
}

try { customElements.define('glass-calendar-card', GlassCalendarCard); } catch { /* already registered */ }
