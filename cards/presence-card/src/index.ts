import { html, css, nothing, type CSSResult, type PropertyValues, type TemplateResult } from 'lit';
import { state } from 'lit/decorators.js';
import { BaseCard, BackendService } from '@glass-cards/base-card';
import { glassTokens, glassMixin, foldMixin, marqueeMixin, marqueeText, MARQUEE_FULL } from '@glass-cards/ui-core';
import { t } from '@glass-cards/i18n';

/* ── Types ── */

interface PresenceBackendConfig {
  show_header: boolean;
  person_entities: string[];
  smartphone_sensors: Record<string, string>;
  notify_services: Record<string, string>;
  driving_sensors: Record<string, string>;
}

interface PersonData {
  entityId: string;
  name: string;
  state: string;
  entityPicture: string | null;
  latitude: number | null;
  longitude: number | null;
  sourceType: string;
  batteryLevel: number | null;
  lastUpdated: string;
  geocodedLocation: string | null;
  heartRate: number | null;
  spo2: number | null;
  steps: number | null;
  isDriving: boolean;
  notifyService: string | null;
}

/* ── Avatar colors (fallback when no entity_picture) ── */
const AVATAR_COLORS = [
  { from: '#6366f1', to: '#8b5cf6' },
  { from: '#ec4899', to: '#f472b6' },
  { from: '#f59e0b', to: '#fbbf24' },
  { from: '#10b981', to: '#34d399' },
  { from: '#06b6d4', to: '#22d3ee' },
  { from: '#f43f5e', to: '#fb7185' },
];

/* ── Helpers ── */

function haversineKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function timeAgo(isoString: string): string {
  const diff = Math.floor((Date.now() - new Date(isoString).getTime()) / 1000);
  if (diff < 60) return t('presence.just_now');
  if (diff < 3600) return t('presence.min_ago', { count: Math.floor(diff / 60) });
  if (diff < 86400) return t('presence.hours_ago', { count: Math.floor(diff / 3600) });
  return t('presence.days_ago', { count: Math.floor(diff / 86400) });
}

function batteryIcon(level: number): string {
  if (level > 80) return 'mdi:battery';
  if (level > 60) return 'mdi:battery-70';
  if (level > 40) return 'mdi:battery-50';
  if (level > 20) return 'mdi:battery-30';
  return 'mdi:battery-10';
}

function batteryClass(level: number): string {
  if (level > 50) return 'high';
  if (level > 20) return 'medium';
  return 'low';
}

function stateClass(s: string): string {
  if (s === 'home') return 'home';
  if (s === 'not_home') return 'away';
  return 'zone';
}

function stateText(s: string): string {
  if (s === 'home') return t('presence.home');
  if (s === 'not_home') return t('presence.away');
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function sourceIcon(sourceType: string): string {
  switch (sourceType) {
    case 'gps': return 'mdi:crosshairs-gps';
    case 'router': return 'mdi:router-wireless';
    case 'bluetooth':
    case 'bluetooth_le': return 'mdi:bluetooth';
    default: return 'mdi:crosshairs-gps';
  }
}

function safeNum(v: unknown): number | null {
  if (v == null || v === '' || v === 'unknown' || v === 'unavailable') return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

/* ── Card ── */

export class GlassPresenceCard extends BaseCard {
  @state() private _presenceConfig: PresenceBackendConfig = {
    show_header: true,
    person_entities: [],
    smartphone_sensors: {},
    notify_services: {},
    driving_sensors: {},
  };
  @state() private _activePerson: string | null = null;
  @state() private _notifText = '';

  private _backend?: BackendService;
  private _configLoaded = false;
  private _configLoadingInProgress = false;
  private _clockInterval?: ReturnType<typeof setInterval>;
  private _prevActivePerson: string | null = null;

  connectedCallback(): void {
    super.connectedCallback();
    this._listen('presence-config-changed', () => {
      this._configLoaded = false;
      this._loadConfig();
    });
    this._clockInterval = setInterval(() => this.requestUpdate(), 60_000);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._backend = undefined;
    this._configLoaded = false;
    this._configLoadingInProgress = false;
    clearInterval(this._clockInterval);
    this._clockInterval = undefined;
  }

  protected updated(changedProps: PropertyValues): void {
    super.updated(changedProps);
    if (changedProps.has('hass') && this.hass) {
      if (this._backend && this._backend.connection !== this.hass.connection) {
        this._backend = undefined;
        this._configLoaded = false;
        this._configLoadingInProgress = false;
      }
      if (!this._configLoaded && !this._configLoadingInProgress) {
        this._backend = new BackendService(this.hass);
        this._loadConfig();
      }
    }
    // Double rAF for fold animation
    if (changedProps.has('_activePerson') && this._activePerson && this._activePerson !== this._prevActivePerson) {
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          this.shadowRoot?.querySelectorAll('.fold-sep').forEach((el) => el.classList.add('visible'));
          this.shadowRoot?.querySelector('.ctrl-fold')?.classList.add('open');
        }),
      );
    }
    this._prevActivePerson = this._activePerson;
  }

  private async _loadConfig(): Promise<void> {
    if (!this._backend || this._configLoadingInProgress) return;
    this._configLoadingInProgress = true;
    try {
      const result = await this._backend.send<{
        presence_card: PresenceBackendConfig;
      }>('get_config');
      if (result?.presence_card) {
        this._presenceConfig = result.presence_card;
      }
      this._configLoaded = true;
      this._configLoadingInProgress = false;
      this.requestUpdate();
    } catch {
      this._configLoadingInProgress = false;
    }
  }

  protected getTrackedEntityIds(): string[] {
    return this._getPersonIds();
  }

  /* ── Person resolution ── */

  private _getPersonIds(): string[] {
    if (this._presenceConfig.person_entities.length > 0) {
      return this._presenceConfig.person_entities.filter(
        (id) => this.hass?.states[id],
      );
    }
    if (!this.hass) return [];
    return Object.keys(this.hass.states).filter((id) => id.startsWith('person.'));
  }

  private _getPersonData(entityId: string): PersonData | null {
    const entity = this.hass?.states[entityId];
    if (!entity) return null;

    const attrs = entity.attributes;
    const name = (attrs.friendly_name as string) || entityId.split('.')[1];
    const entityPicture = (attrs.entity_picture as string) || null;

    // Smartphone sensor data
    const smartphoneSensorId = this._presenceConfig.smartphone_sensors[entityId];
    const smartphoneEntity = smartphoneSensorId ? this.hass?.states[smartphoneSensorId] : null;
    const smartAttrs = smartphoneEntity?.attributes ?? {};

    // Battery: try smartphone sensor state first, then person's device_tracker
    let batteryLevel = smartphoneEntity ? safeNum(smartphoneEntity.state) : null;
    if (batteryLevel == null) {
      batteryLevel = safeNum(attrs.battery_level);
    }

    // Health data from smartphone sensor attributes
    const heartRate = safeNum(smartAttrs.heart_rate);
    const spo2 = safeNum(smartAttrs.oxygen_saturation);
    const steps = safeNum(smartAttrs.daily_steps);

    // Geocoded location from smartphone sensor
    const geocodedLocation =
      (smartAttrs.geocoded_location as string) || null;

    // Notify service
    const notifyService =
      this._presenceConfig.notify_services[entityId] ||
      (smartAttrs.notify_service as string) ||
      null;

    // Driving
    const drivingSensorId = this._presenceConfig.driving_sensors[entityId];
    let isDriving = false;
    if (drivingSensorId && this.hass?.states[drivingSensorId]) {
      isDriving = this.hass.states[drivingSensorId].state === 'on';
    } else if (smartAttrs.android_auto === 'on' || smartAttrs.android_auto === true) {
      isDriving = true;
    }

    return {
      entityId,
      name,
      state: entity.state,
      entityPicture,
      latitude: safeNum(attrs.latitude),
      longitude: safeNum(attrs.longitude),
      sourceType: (attrs.source_type as string) || 'gps',
      batteryLevel,
      lastUpdated: entity.last_updated,
      geocodedLocation,
      heartRate,
      spo2,
      steps,
      isDriving,
      notifyService,
    };
  }

  /* ── Presence class for tint ── */

  private _presenceClass(persons: PersonData[]): string {
    let hasHome = false;
    let hasAway = false;
    for (const p of persons) {
      if (p.state === 'home') hasHome = true;
      else hasAway = true;
    }
    if (hasHome && hasAway) return 'mixed';
    if (hasHome) return 'home';
    return 'away';
  }

  /* ── Collapse on outside click ── */

  protected _collapseExpanded(): void {
    if (this._activePerson) {
      this._activePerson = null;
    }
  }

  /* ── Send notification ── */

  private async _sendNotification(person: PersonData): Promise<void> {
    if (!this.hass || !person.notifyService || !this._notifText.trim()) return;
    try {
      // Support both "mobile_app_xxx" and "notify.mobile_app_xxx" formats
      let domain = 'notify';
      let service = person.notifyService;
      if (service.includes('.')) {
        const parts = service.split('.');
        domain = parts[0];
        service = parts.slice(1).join('.');
      }
      const senderName = this.hass.user?.name || 'Home Assistant';
      await this.hass.callService(domain, service, {
        title: t('presence.notif_title', { name: senderName }),
        message: this._notifText.trim(),
      });
      this._notifText = '';
      this._activePerson = null;
    } catch {
      // silent
    }
  }

  /* ── Render ── */

  render(): TemplateResult | typeof nothing {
    void this._lang;
    if (!this.hass) return nothing;

    const personIds = this._getPersonIds();
    if (personIds.length === 0) return nothing;

    const persons = personIds
      .map((id) => this._getPersonData(id))
      .filter((p): p is PersonData => p !== null);

    if (persons.length === 0) return nothing;

    const homeCount = persons.filter((p) => p.state === 'home').length;
    const presClass = this._presenceClass(persons);
    const countClass =
      homeCount === 0 ? 'all-away' : homeCount === persons.length ? 'all-home' : 'mixed';

    return html`
      ${this._presenceConfig.show_header
        ? html`
            <div class="card-header">
              <div class="card-header-left">
                <span class="card-title">${persons.length === 1 ? t('presence.title_single') : t('presence.title')}</span>
              </div>
              <span class="card-count ${countClass}">${homeCount}/${persons.length}</span>
            </div>
          `
        : nothing}
      <div class="glass presence-card" data-presence=${presClass}>
        <div class="card-tint"></div>
        <div class="card-inner ${this._layoutClass(persons.length)}">
          ${this._renderPersons(persons)}
        </div>
        ${this._renderFold(persons, presClass)}
      </div>
    `;
  }

  private _layoutClass(count: number): string {
    if (count === 1) return 'solo-layout';
    if (count === 2) return '';
    return 'family-layout';
  }

  private _renderPersons(persons: PersonData[]): TemplateResult | typeof nothing {
    if (persons.length === 1) {
      return html`
        ${this._renderPerson(persons[0], false, 0)}
        ${this._renderSoloChips(persons[0])}
      `;
    }
    if (persons.length === 2) {
      return html`
        ${this._renderPerson(persons[0], false, 0)}
        ${this._renderDistance(persons[0], persons[1])}
        ${this._renderPerson(persons[1], true, 1)}
      `;
    }
    // Family: paired rows
    const rows: TemplateResult[] = [];
    for (let i = 0; i < persons.length; i += 2) {
      if (i > 0) {
        rows.push(html`<div class="family-sep"></div>`);
      }
      if (i + 1 < persons.length) {
        rows.push(html`
          <div class="family-row">
            ${this._renderPerson(persons[i], false, i)}
            ${this._renderDistance(persons[i], persons[i + 1])}
            ${this._renderPerson(persons[i + 1], true, i + 1)}
          </div>
        `);
      } else {
        rows.push(html`
          <div class="family-row solo-row">
            ${this._renderPerson(persons[i], false, i)}
          </div>
        `);
      }
    }
    return html`${rows}`;
  }

  private _renderPerson(p: PersonData, isRight: boolean, colorIdx = 0): TemplateResult {
    const colors = AVATAR_COLORS[colorIdx % AVATAR_COLORS.length];

    return html`
      <div class="person-block ${isRight ? 'right' : ''}">
        <button
          class="avatar-wrapper"
          aria-label=${t('presence.avatar_aria', { name: p.name })}
          aria-expanded=${String(this._activePerson === p.entityId)}
          @click=${(e: Event) => {
            e.stopPropagation();
            const next = this._activePerson === p.entityId ? null : p.entityId;
            if (next !== this._activePerson) this._notifText = '';
            this._activePerson = next;
          }}
        >
          ${p.entityPicture
            ? html`<img class="avatar" src=${p.entityPicture} alt=${p.name} />`
            : html`
                <div
                  class="avatar avatar-fallback"
                  style="background: linear-gradient(135deg, ${colors.from}, ${colors.to})"
                >
                  <ha-icon .icon=${'mdi:account'}></ha-icon>
                </div>
              `}
          <div class="avatar-status ${stateClass(p.state)}"></div>
        </button>
        <div class="person-info">
          <div class="person-name">${p.name}</div>
          <div class="person-sub">
            <div class="person-line">
              <span class="source-icon"><ha-icon .icon=${sourceIcon(p.sourceType)}></ha-icon></span>
              <span class="person-location">${marqueeText(stateText(p.state), MARQUEE_FULL)}</span>
              ${p.isDriving
                ? html`<span class="driving-icon"><ha-icon .icon=${'mdi:car'}></ha-icon></span>`
                : nothing}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  private _renderDistance(a: PersonData, b: PersonData): TemplateResult | typeof nothing {
    if (a.latitude == null || a.longitude == null || b.latitude == null || b.longitude == null) {
      return nothing;
    }
    const km = haversineKm(a.latitude, a.longitude, b.latitude, b.longitude);
    const isNear = km < 0.05;
    const valueText = km < 1 ? String(Math.round(km * 1000)) : String(Math.round(km));
    const unitText = km < 1 ? t('presence.distance_m') : t('presence.distance_km');

    return html`
      <div class="distance-center ${isNear ? 'near' : ''}">
        <div class="distance-line"></div>
        <div class="distance-info">
          <div class="distance-value">${valueText}</div>
          <div class="distance-unit">${unitText}</div>
        </div>
        <div class="heart-pulse" aria-hidden="true"><ha-icon .icon=${'mdi:heart'}></ha-icon></div>
        <div class="distance-line right"></div>
      </div>
    `;
  }

  private _renderSoloChips(p: PersonData): TemplateResult | typeof nothing {
    if (p.heartRate == null && p.spo2 == null && p.steps == null) return nothing;
    return html`
      <div class="solo-health-chips">
        ${p.heartRate != null
          ? html`<div class="solo-chip bpm"><ha-icon .icon=${'mdi:heart-pulse'}></ha-icon><span class="solo-chip-val">${p.heartRate}</span></div>`
          : nothing}
        ${p.spo2 != null
          ? html`<div class="solo-chip spo2"><ha-icon .icon=${'mdi:water-percent'}></ha-icon><span class="solo-chip-val">${p.spo2}%</span></div>`
          : nothing}
        ${p.steps != null
          ? html`<div class="solo-chip steps"><ha-icon .icon=${'mdi:walk'}></ha-icon><span class="solo-chip-val">${p.steps.toLocaleString()}</span></div>`
          : nothing}
      </div>
    `;
  }

  private _renderFold(persons: PersonData[], presClass: string): TemplateResult | typeof nothing {
    if (!this._activePerson) return nothing;
    const person = persons.find((p) => p.entityId === this._activePerson);
    if (!person) return nothing;

    const hasHealth = person.heartRate != null || person.spo2 != null || person.steps != null;

    return html`
      <div class="fold-sep ${presClass}"></div>
      <div class="ctrl-fold">
        <div class="ctrl-fold-inner">
          <div class="fold-content">
            <div class="health-address-row">
              ${person.geocodedLocation ? html`
                <ha-icon .icon=${'mdi:map-marker'}></ha-icon>
                <span class="address-text">${person.geocodedLocation}</span>
              ` : nothing}
              <span class="fold-meta">
                ${person.batteryLevel != null ? html`
                  <span class="fold-battery ${batteryClass(person.batteryLevel)}">
                    <ha-icon .icon=${batteryIcon(person.batteryLevel)}></ha-icon>
                    ${person.batteryLevel}%
                  </span>
                ` : nothing}
                <span class="fold-last-seen">${timeAgo(person.lastUpdated)}</span>
              </span>
            </div>
            ${hasHealth
              ? html`
                  <div class="health-zone-label">
                    ${t('presence.health_label')}
                    <span class="health-zone-name">${person.name}</span>
                  </div>
                  <div class="health-pills">
                    ${person.heartRate != null
                      ? html`
                          <div class="health-pill bpm">
                            <div class="health-pill-icon"><ha-icon .icon=${'mdi:heart-pulse'}></ha-icon></div>
                            <div class="health-pill-data">
                              <span class="health-pill-value">${person.heartRate}</span>
                              <span class="health-pill-label">${t('presence.bpm')}</span>
                            </div>
                          </div>
                        `
                      : nothing}
                    ${person.spo2 != null
                      ? html`
                          <div class="health-pill spo2">
                            <div class="health-pill-icon"><ha-icon .icon=${'mdi:water-percent'}></ha-icon></div>
                            <div class="health-pill-data">
                              <span class="health-pill-value">${person.spo2}%</span>
                              <span class="health-pill-label">${t('presence.spo2')}</span>
                            </div>
                          </div>
                        `
                      : nothing}
                    ${person.steps != null
                      ? html`
                          <div class="health-pill steps">
                            <div class="health-pill-icon"><ha-icon .icon=${'mdi:walk'}></ha-icon></div>
                            <div class="health-pill-data">
                              <span class="health-pill-value">${person.steps.toLocaleString()}</span>
                              <span class="health-pill-label">${t('presence.steps')}</span>
                            </div>
                          </div>
                        `
                      : nothing}
                  </div>
                `
              : nothing}
            ${person.notifyService
              ? html`
                  <div class="notif-zone">
                    <div class="notif-to">
                      ${t('presence.notify_to')}
                      <span class="notif-to-name">${person.name}</span>
                    </div>
                    <div class="notif-row">
                      <textarea
                        class="notif-input"
                        placeholder=${t('presence.notify_placeholder')}
                        .value=${this._notifText}
                        @input=${(e: InputEvent) => {
                          this._notifText = (e.target as HTMLTextAreaElement).value;
                        }}
                        @focus=${() => this._scrollToTop()}
                      ></textarea>
                      <button
                        class="notif-send"
                        aria-label=${t('presence.send_aria')}
                        @click=${(e: Event) => {
                          e.stopPropagation();
                          this._sendNotification(person);
                        }}
                      >
                        <ha-icon .icon=${'mdi:send'}></ha-icon>
                      </button>
                    </div>
                  </div>
                `
              : nothing}
          </div>
        </div>
      </div>
    `;
  }

  /* ── Styles ── */

  static styles: CSSResult[] = [
    glassTokens,
    glassMixin,
    foldMixin,
    marqueeMixin,
    css`
      :host {
        display: block;
        width: 100%;
        max-width: 500px;
        margin: 0 auto;
        font-family: 'Plus Jakarta Sans', sans-serif;
      }

      /* ── Header ── */
      .card-header {
        display: flex; align-items: center; justify-content: space-between;
        width: 100%; padding: 0 6px; min-height: 22px; margin-bottom: 6px;
        box-sizing: border-box;
      }
      .card-header-left { display: flex; align-items: center; gap: 8px; }
      .card-title {
        font-size: 9px; font-weight: 700;
        text-transform: uppercase; letter-spacing: 1.5px;
        color: var(--t4);
      }
      .card-count {
        display: inline-flex; align-items: center; justify-content: center;
        min-width: 14px; height: 14px; padding: 0 4px;
        border-radius: var(--radius-full);
        font-size: 9px; font-weight: 600;
        transition: all var(--t-med);
      }
      .card-count.all-home { background: rgba(74,222,128,0.15); color: var(--c-success); }
      .card-count.all-away { background: rgba(248,113,113,0.15); color: var(--c-alert); }
      .card-count.mixed { background: rgba(251,191,36,0.15); color: var(--c-warning); }

      /* ── Presence card ── */
      .presence-card { padding: 7px 14px; width: 100%; box-sizing: border-box; }

      .card-tint {
        position: absolute; inset: 0; border-radius: inherit;
        opacity: 0.06; z-index: 0;
        transition: opacity var(--t-slow), background var(--t-slow);
        pointer-events: none;
      }
      .presence-card[data-presence="home"] .card-tint {
        background: radial-gradient(ellipse at 50% 50%, var(--c-success), transparent 70%);
        opacity: 0.1;
      }
      .presence-card[data-presence="away"] .card-tint {
        background: radial-gradient(ellipse at 50% 50%, var(--c-alert), transparent 70%);
        opacity: 0.09;
      }
      .presence-card[data-presence="mixed"] .card-tint {
        background: linear-gradient(to right, rgba(74,222,128,0.15), transparent 40%, transparent 60%, rgba(248,113,113,0.15));
        opacity: 0.5;
      }

      .card-inner {
        position: relative; z-index: 1;
        display: flex; align-items: center;
      }

      /* Solo: person left, chips right */
      .card-inner.solo-layout { justify-content: space-between; gap: 8px; }

      /* Family: stacked pair rows */
      .card-inner.family-layout { flex-direction: column; gap: 0; }
      .family-row { display: flex; align-items: center; width: 100%; }
      .family-sep {
        height: 1px; margin: 8px 12px;
        background: linear-gradient(90deg, transparent, var(--b2), transparent);
      }
      .family-row.solo-row { justify-content: center; }
      .family-row.solo-row .person-block { flex: 0 1 auto; }

      /* ── Person block ── */
      .person-block {
        display: flex; align-items: center; gap: 10px;
        flex: 1; min-width: 0;
      }
      .person-block.right { flex-direction: row-reverse; text-align: right; }

      .avatar-wrapper {
        position: relative; flex-shrink: 0;
        cursor: pointer; background: none; border: none;
        padding: 0; border-radius: 50%;
        -webkit-tap-highlight-color: transparent;
      }
      .avatar-wrapper:not(:focus-visible) { outline: none; }
      .avatar-wrapper:active { transform: scale(0.96); }
      .avatar-wrapper:focus-visible { outline: 2px solid rgba(255,255,255,0.25); outline-offset: 2px; }

      .avatar {
        width: 38px; height: 38px; border-radius: 50%;
        display: flex; align-items: center; justify-content: center;
        transition: border-color var(--t-med);
        object-fit: cover;
      }
      .avatar-fallback { border: 2px solid rgba(255,255,255,0.1); }
      img.avatar { display: block; }
      .avatar-fallback ha-icon {
        display: flex; align-items: center; justify-content: center;
        --mdc-icon-size: 22px; color: rgba(255,255,255,0.85);
      }

      @media (hover: hover) {
        .avatar-wrapper:hover .avatar { border-color: rgba(255,255,255,0.3); }
      }

      .avatar-status {
        position: absolute; bottom: -1px; right: -1px;
        width: 12px; height: 12px; border-radius: 50%;
        border: 2px solid rgba(15,25,35,0.9);
        transition: background var(--t-med), box-shadow var(--t-med);
      }
      .avatar-status.home { background: var(--c-success); box-shadow: 0 0 6px rgba(74,222,128,0.5); }
      .avatar-status.away { background: var(--c-alert); box-shadow: 0 0 6px rgba(248,113,113,0.5); }
      .avatar-status.zone { background: var(--c-info); box-shadow: 0 0 6px rgba(96,165,250,0.5); }

      .person-info { min-width: 0; flex: 1; }
      .person-name { font-size: 13px; font-weight: 600; color: var(--t1); line-height: 1.2; }
      .person-block.right .person-name { text-align: right; }

      .person-sub { display: flex; flex-direction: column; gap: 2px; margin-top: 2px; }
      .person-block.right .person-sub { align-items: flex-end; }

      .person-line { display: flex; align-items: center; gap: 4px; min-width: 0; }
      .person-block.right .person-line { flex-direction: row-reverse; }

      .person-location {
        font-size: 10px; font-weight: 500; color: var(--t3);
        white-space: nowrap; overflow: hidden; min-width: 0;
      }
      .source-icon { display: flex; align-items: center; flex-shrink: 0; }
      .source-icon ha-icon {
        display: flex; align-items: center; justify-content: center;
        --mdc-icon-size: 10px; color: var(--t4);
      }

      .driving-icon { display: flex; align-items: center; flex-shrink: 0; }
      .driving-icon ha-icon {
        display: flex; align-items: center; justify-content: center;
        --mdc-icon-size: 12px; color: var(--c-info); opacity: 0.7;
      }

      /* ── Distance ── */
      .distance-center { flex-shrink: 0; display: flex; align-items: center; padding: 0; gap: 0; }
      .distance-line {
        width: 20px; height: 1px;
        background: linear-gradient(to right, var(--b1), var(--b3));
      }
      .distance-line.right { background: linear-gradient(to right, var(--b3), var(--b1)); }
      .distance-info {
        display: flex; flex-direction: column; align-items: center;
        gap: 1px; padding: 0 4px;
      }
      .distance-value { font-size: 14px; font-weight: 700; color: var(--t2); white-space: nowrap; line-height: 1; }
      .distance-unit { font-size: 9px; font-weight: 400; color: var(--t4); text-align: center; line-height: 1; }

      .heart-pulse {
        display: none; color: #f472b6; line-height: 1; padding: 0 4px;
        filter: drop-shadow(0 0 4px rgba(244,114,182,0.35));
        animation: pulse-beat 2.5s ease-in-out infinite;
      }
      .heart-pulse ha-icon {
        display: flex; align-items: center; justify-content: center;
        --mdc-icon-size: 18px;
      }
      .distance-center.near .heart-pulse { display: flex; align-items: center; }
      .distance-center.near .distance-info { display: none; }
      @keyframes pulse-beat {
        0%, 100% { transform: scale(1); opacity: 0.55; }
        50% { transform: scale(1.05); opacity: 0.85; }
      }

      /* ── Solo health chips ── */
      .solo-health-chips { display: flex; align-items: center; gap: 5px; flex-shrink: 0; }
      .solo-chip {
        display: flex; align-items: center; gap: 3px;
        padding: 4px 8px; border-radius: var(--radius-full);
        background: var(--s2); border: 1px solid var(--b1);
        white-space: nowrap; line-height: 1;
      }
      .solo-chip ha-icon {
        display: flex; align-items: center; justify-content: center;
        --mdc-icon-size: 12px;
      }
      .solo-chip-val { font-size: 11px; font-weight: 600; }
      .solo-chip.bpm ha-icon, .solo-chip.bpm .solo-chip-val { color: var(--c-alert); opacity: 0.8; }
      .solo-chip.spo2 ha-icon, .solo-chip.spo2 .solo-chip-val { color: var(--c-info); opacity: 0.8; }
      .solo-chip.steps ha-icon, .solo-chip.steps .solo-chip-val { color: var(--c-success); opacity: 0.8; }

      /* ── Fold ── */
      .fold-sep {
        height: 1px; margin: 8px 12px 0;
        background: linear-gradient(90deg, transparent, rgba(167,139,250,0.25), transparent);
        opacity: 0; transition: opacity 0.25s var(--ease-std);
      }
      .fold-sep.home { background: linear-gradient(90deg, transparent, rgba(74,222,128,0.3), transparent); }
      .fold-sep.mixed { background: linear-gradient(90deg, transparent, rgba(96,165,250,0.3), transparent); }
      .fold-sep.away { background: linear-gradient(90deg, transparent, rgba(248,113,113,0.3), transparent); }
      .fold-sep.visible { opacity: 1; }
      .fold-sep.bottom { margin: 0 12px 4px; }

      .ctrl-fold {
        display: grid; grid-template-rows: 0fr;
        transition: grid-template-rows var(--t-layout);
        position: relative; z-index: 1;
      }
      .ctrl-fold.open { grid-template-rows: 1fr; }
      .ctrl-fold-inner { overflow: hidden; opacity: 0; transition: opacity 0.25s var(--ease-std); }
      .ctrl-fold.open .ctrl-fold-inner { opacity: 1; transition-delay: 0.1s; }

      .fold-content { display: flex; flex-direction: column; gap: 6px; padding-top: 8px; }

      /* ── Health zone ── */
      .health-zone-label {
        font-size: 10px; font-weight: 500; color: var(--t4);
        display: flex; align-items: center; gap: 5px;
      }
      .health-zone-name { color: var(--t3); font-weight: 600; }

      .health-address-row {
        display: flex; align-items: center; gap: 5px;
        padding: 5px 8px; border-radius: var(--radius-sm);
        background: var(--s1); border: 1px solid var(--b1);
      }
      .health-address-row > ha-icon {
        display: flex; align-items: center; justify-content: center;
        --mdc-icon-size: 12px; color: var(--t4); flex-shrink: 0;
      }
      .address-text {
        font-size: 10px; font-weight: 400; color: var(--t3);
        white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        flex: 1; min-width: 0;
      }
      .fold-battery {
        display: flex; align-items: center; gap: 3px;
        font-size: 10px; font-weight: 500; flex-shrink: 0; margin-left: auto;
      }
      .fold-battery.high { color: var(--c-success); }
      .fold-battery.medium { color: var(--c-warning); }
      .fold-battery.low { color: var(--c-alert); }
      .fold-battery ha-icon {
        display: flex; align-items: center; justify-content: center;
        --mdc-icon-size: 14px; color: inherit;
      }
      .fold-meta {
        display: flex; align-items: center; gap: 6px;
        margin-left: auto; flex-shrink: 0;
      }
      .fold-last-seen {
        font-size: 10px; font-weight: 400; color: var(--t4); white-space: nowrap;
      }

      .health-pills { display: flex; gap: 6px; }
      .health-pill {
        flex: 1; display: flex; align-items: center; gap: 6px;
        padding: 6px 10px; border-radius: var(--radius-md);
        background: var(--s1); border: 1px solid var(--b1);
        transition: background var(--t-fast), border-color var(--t-fast);
      }
      @media (hover: hover) {
        .health-pill:hover { background: var(--s3); border-color: var(--b2); }
      }
      .health-pill-icon { flex-shrink: 0; display: flex; align-items: center; }
      .health-pill-icon ha-icon {
        display: flex; align-items: center; justify-content: center;
        --mdc-icon-size: 14px;
      }
      .health-pill-data { display: flex; flex-direction: column; min-width: 0; }
      .health-pill-value { font-size: 13px; font-weight: 700; line-height: 1.1; color: var(--t1); }
      .health-pill-label {
        font-size: 8px; font-weight: 500; text-transform: uppercase;
        letter-spacing: 0.8px; color: var(--t4); line-height: 1.2;
      }

      .health-pill.bpm .health-pill-icon ha-icon { color: var(--c-alert); }
      .health-pill.bpm .health-pill-value { color: var(--c-alert); opacity: 0.85; }
      .health-pill.spo2 .health-pill-icon ha-icon { color: var(--c-info); }
      .health-pill.spo2 .health-pill-value { color: var(--c-info); opacity: 0.85; }
      .health-pill.steps .health-pill-icon ha-icon { color: var(--c-success); }
      .health-pill.steps .health-pill-value { color: var(--c-success); opacity: 0.85; }

      /* ── Notification zone ── */
      .notif-zone { padding: 8px 0 4px; display: flex; gap: 8px; flex-direction: column; }
      .notif-to {
        font-size: 10px; font-weight: 500; color: var(--t4);
        display: flex; align-items: center; gap: 5px;
      }
      .notif-to-name { color: var(--t2); font-weight: 600; }

      .notif-row { display: flex; gap: 8px; align-items: flex-end; }
      .notif-input {
        flex: 1; padding: 8px 12px; border-radius: 12px;
        border: 1px solid var(--b2); background: var(--s1);
        color: var(--t1); font-family: inherit; font-size: 12px;
        outline: none; resize: none; height: 36px; box-sizing: border-box;
        transition: border-color var(--t-fast);
      }
      .notif-input::placeholder { color: var(--t4); }
      .notif-input:focus { border-color: var(--b3); }

      .notif-send {
        width: 36px; height: 36px; border-radius: var(--radius-lg);
        border: 1px solid rgba(74,222,128,0.2);
        background: rgba(74,222,128,0.1); color: var(--c-success);
        cursor: pointer; display: flex; align-items: center; justify-content: center;
        flex-shrink: 0; transition: background var(--t-fast), border-color var(--t-fast);
        padding: 0; outline: none; font-size: 0;
        -webkit-tap-highlight-color: transparent;
      }
      .notif-send ha-icon {
        display: flex; align-items: center; justify-content: center;
        --mdc-icon-size: 16px;
      }
      @media (hover: hover) {
        .notif-send:hover { background: rgba(74,222,128,0.2); border-color: rgba(74,222,128,0.3); }
      }
      .notif-send:focus-visible { outline: 2px solid rgba(255,255,255,0.25); outline-offset: 2px; }
      .notif-send:active { transform: scale(0.96); }
    `,
  ];
}

try {
  customElements.define('glass-presence-card', GlassPresenceCard);
} catch {
  /* already registered */
}
