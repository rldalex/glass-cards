import { html, svg, css, nothing, type TemplateResult } from 'lit';
import { property, state } from 'lit/decorators.js';
import { BaseCard } from '@glass-cards/base-card';
import { glassTokens, hostMixin, glassMixin, marqueeMixin, marqueeText, MARQUEE_COMPACT } from '@glass-cards/ui-core';

// ───────────────────────── Types ─────────────────────────

export interface CalendarEvent {
  title: string;
  /** "HH:MM" or "HH:MM - HH:MM" — null/undefined for all-day */
  time?: string | null;
  cal: string;
  allday?: boolean;
  now?: boolean;
}

interface CalDef { color: string; label: string }

export const CAL_COLORS: Record<string, CalDef> = {
  perso: { color: '#818cf8', label: 'Personnel' },
  travail: { color: '#60a5fa', label: 'Travail' },
  famille: { color: '#f472b6', label: 'Famille' },
  taches: { color: '#fbbf24', label: 'Tâches' },
  anniversaires: { color: '#4ade80', label: 'Anniversaires' },
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
  return !!(e.now || e.allday || !e.time || isUpcoming(e.time));
}

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// ───────────────────────── Component ─────────────────────────

export class GlassCalendarCard extends BaseCard {
  getCardSize() { return 1; }

  @property({ attribute: false }) events: CalendarEvent[] = [];
  @property({ type: Boolean, attribute: 'show-header' }) showHeader = true;

  @state() private _open = false;
  /** Current index of the active ticker item. */
  @state() private _tickerIdx = 0;
  /** Index of the item that is currently sliding out (above). null when no transition in flight. */
  @state() private _tickerLeavingIdx: number | null = null;

  private _tickerTimer?: ReturnType<typeof setInterval>;
  private _leaveTimer?: ReturnType<typeof setTimeout>;
  /** Stable id so multiple instances can coexist with aria-controls. */
  private readonly _foldId = `cal-fold-${Math.random().toString(36).slice(2, 9)}`;

  connectedCallback(): void {
    super.connectedCallback();
    this._startTicker();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._stopTicker();
  }

  protected updated(changedProps: Map<string, unknown>): void {
    super.updated(changedProps as never);
    if (changedProps.has('events')) {
      this._stopTicker();
      this._tickerIdx = 0;
      this._tickerLeavingIdx = null;
      this._startTicker();
    } else if (!this._tickerTimer && this._tickerEvents().length > 1) {
      this._startTicker();
    }
  }

  protected _collapseExpanded(): void {
    if (this._open) this._open = false;
  }

  private _tickerEvents(): CalendarEvent[] {
    return this.events.filter(visibleInTicker);
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
              <div class="v4-fold-separator"></div>
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

  private _renderWeekStrip(): TemplateResult {
    const now = new Date();
    // Placeholder distribution — when wired to backend, this becomes per-day event counts.
    const dotsByOffset: Record<number, string[]> = {
      0: this.events.map((e) => e.cal).slice(0, 3),
      1: ['travail'],
      3: ['famille', 'perso'],
    };
    const days: TemplateResult[] = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(now);
      d.setDate(now.getDate() + i);
      const isToday = i === 0;
      const dots = (dotsByOffset[i] ?? []).slice(0, 3);
      days.push(html`
        <button class="v4-week-day ${isToday ? 'today' : ''}" type="button"
          aria-label="${DAYS_FR[d.getDay()]} ${d.getDate()}${isToday ? ', aujourd\'hui' : ''}, ${dots.length} événement${dots.length > 1 ? 's' : ''}">
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
    const upcoming = this.events.filter(visibleInTicker);
    if (upcoming.length === 0) {
      return html`
        <div class="v4-event-list">
          <div class="v4-event-empty">
            ${this._calendarIcon('v4-event-empty-icon')}
            <span class="v4-event-empty-title">Rien de prévu</span>
            <span class="v4-event-empty-sub">Profitez de votre journée</span>
          </div>
        </div>
      `;
    }
    return html`
      <div class="v4-event-list">
        ${upcoming.map((ev) => {
          const color = CAL_COLORS[ev.cal]?.color ?? 'var(--c-accent)';
          const timeLabel = ev.now && ev.time ? `${ev.time} · En cours` : ev.time ?? 'Toute la journée';
          return html`
            <button class="v4-event-row ${ev.now ? 'now' : ''}" type="button"
              aria-label="${ev.title}${ev.time ? `, ${ev.time}` : ', toute la journée'}${ev.now ? ', en cours' : ''}">
              <span class="v4-event-color-bar" style="background:${color}; color:${color};"></span>
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
    .card-count.now  { background: rgba(var(--rgb-accent), 0.18); color: var(--c-accent); }
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
    .v4-compact-icon { width: 0.875rem; height: 0.875rem; color: var(--c-accent); flex-shrink: 0; }
    .v4-compact-date { font-size: var(--fz-base); font-weight: 700; color: var(--t1); white-space: nowrap; line-height: 1rem; }
    .v4-compact-count {
      font-size: var(--fz-sm); font-weight: 700; color: var(--c-accent);
      background: rgba(var(--rgb-accent), 0.12);
      border: 0.0625rem solid rgba(var(--rgb-accent), 0.2);
      border-radius: var(--radius-full); padding: 0 0.375rem;
      min-width: 1.125rem; height: 1.125rem;
      display: inline-flex; align-items: center; justify-content: center;
      line-height: 1; box-sizing: border-box;
    }
    .v4-compact-sep { width: 0.0625rem; height: 0.75rem; background: var(--b2); flex-shrink: 0; }

    /* ── Chevron (decorative, rotates via parent .open) ── */
    .v4-compact-chevron {
      width: 1.375rem; height: 1.375rem; border-radius: var(--radius-sm);
      background: var(--s2); border: 0.0625rem solid var(--b1);
      display: inline-flex; align-items: center; justify-content: center;
      color: var(--t3); flex-shrink: 0;
      transition: background var(--t-fast), border-color var(--t-fast);
    }
    .v4-compact:hover .v4-compact-chevron { background: var(--s3); border-color: var(--b2); }
    .v4-compact-chevron svg { width: 0.75rem; height: 0.75rem; transition: transform var(--t-fast); }
    .calendar-card.open .v4-compact-chevron svg { transform: rotate(180deg); }

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
    .v4-ticker-item.now .v4-ticker-time { color: var(--c-accent); }
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
    .v4-week-day.today .v4-week-day-num { background: rgba(var(--rgb-accent), 0.2); color: var(--c-accent); font-weight: 700; }
    .v4-week-day-dots { display: inline-flex; gap: 0.1875rem; min-height: 0.25rem; }
    .v4-week-dot { width: 0.25rem; height: 0.25rem; border-radius: 50%; }

    /* ── Event list ── */
    .v4-fold-separator { height: 0.0625rem; background: var(--b1); margin-bottom: 0.5rem; }
    .v4-event-list { display: flex; flex-direction: column; gap: 0.125rem; margin-bottom: 0.5rem; }
    .v4-event-row {
      display: flex; align-items: center; gap: 0.625rem; padding: 0.625rem;
      min-height: 2.75rem; border-radius: var(--radius-sm);
      background: none; border: 0.0625rem solid transparent;
      cursor: pointer; outline: none; font-family: inherit; text-align: left;
      width: 100%; transition: background var(--t-fast);
      -webkit-tap-highlight-color: transparent;
    }
    .v4-event-row:hover { background: var(--s2); }
    .v4-event-row:focus-visible { outline: 2px solid rgba(var(--rgb-white), 0.25); outline-offset: -2px; }
    .v4-event-color-bar { width: 0.1875rem; height: 1.75rem; border-radius: 0.125rem; flex-shrink: 0; transition: box-shadow var(--t-fast); }
    .v4-event-content { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 0.125rem; }
    .v4-event-title { font-size: var(--fz-base); font-weight: 600; color: var(--t2); line-height: 1.3; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .v4-event-time { font-size: var(--fz-base); font-weight: 400; color: var(--t3); line-height: 1.2; }
    .v4-event-allday {
      font-size: var(--fz-xxs); font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;
      color: var(--t3); padding: 0.125rem 0.5rem; border-radius: var(--radius-full);
      background: var(--s1); border: 0.0625rem solid var(--b1); flex-shrink: 0;
    }
    .v4-event-row.now { background: rgba(var(--rgb-accent), 0.04); border-color: rgba(var(--rgb-accent), 0.08); }
    .v4-event-row.now .v4-event-title { color: var(--t1); }
    .v4-event-row.now .v4-event-time { color: var(--c-accent); font-weight: 500; }
    .v4-event-row.now .v4-event-color-bar { box-shadow: 0 0 0.5rem currentColor; }

    /* ── Empty state ── */
    .v4-event-empty { display: flex; flex-direction: column; align-items: center; gap: 0.25rem; padding: 1rem 0 0.5rem; }
    .v4-event-empty-icon { width: 1.5rem; height: 1.5rem; color: var(--t4); margin-bottom: 0.125rem; }
    .v4-event-empty-title { font-size: var(--fz-base); font-weight: 600; color: var(--t3); }
    .v4-event-empty-sub { font-size: var(--fz-sm); font-weight: 400; color: var(--t4); }

    /* ── Legend ── */
    .v4-cal-legend { display: flex; gap: 0.625rem; padding: 0.5rem 0 0; flex-wrap: wrap; }
    .v4-cal-legend-item { display: inline-flex; align-items: center; gap: 0.3125rem; }
    .v4-cal-legend-dot { width: 0.375rem; height: 0.375rem; border-radius: 50%; }
    .v4-cal-legend-label { font-size: var(--fz-xs); font-weight: 500; color: var(--t3); }

    /* ── Reduced motion ── */
    @media (prefers-reduced-motion: reduce) {
      .v4-fold,
      .v4-fold-inner,
      .v4-fold-sep,
      .v4-ticker-item,
      .v4-compact-chevron svg,
      .v4-week-day-num,
      .v4-event-row,
      .v4-event-color-bar { transition-duration: 0.01ms !important; }
      .v4-ticker-item.above,
      .v4-ticker-item.below { display: none; }
      .v4-ticker-item.active { transform: none; opacity: 1; }
    }
  `];
}

try { customElements.define('glass-calendar-card', GlassCalendarCard); } catch { /* already registered */ }
