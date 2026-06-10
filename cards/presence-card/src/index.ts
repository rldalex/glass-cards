import { html, nothing, type CSSResult, type PropertyValues, type TemplateResult } from 'lit';
import { state } from 'lit/decorators.js';
import { BaseCard, BackendService, fireHaptic } from '@glass-cards/base-card';
import './editor';
import { glassTokens, hostMixin, glassMixin, foldMixin, marqueeMixin, bounceMixin, unavailableMixin, tappableMixin, isEntityUnavailable } from '@glass-cards/ui-core';
import { t } from '@glass-cards/i18n';
import { presenceCardStyles } from './styles';

/* ── Types ── */

interface PresenceBackendConfig {
  show_header: boolean;
  person_entities: string[];
  smartphone_sensors: Record<string, string>;
  notify_services: Record<string, string>;
  driving_sensors: Record<string, string>;
  sleep_sensors: Record<string, string>;
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
  isCharging: boolean;
  lastUpdated: string;
  geocodedLocation: string | null;
  heartRate: number | null;
  spo2: number | null;
  steps: number | null;
  isDriving: boolean;
  isSleeping: boolean;
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

export function haversineKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

/** Seconds since `isoString`. Cheap and shared between seenAgo + lastSeenClass. */
function elapsedSeconds(isoString: string): number {
  return Math.floor((Date.now() - new Date(isoString).getTime()) / 1000);
}

function elapsedText(diff: number): string {
  if (diff < 60) return t('presence.just_now');
  if (diff < 3600) return t('presence.min_ago', { count: Math.floor(diff / 60) });
  if (diff < 86400) return t('presence.hours_ago', { count: Math.floor(diff / 3600) });
  return t('presence.days_ago', { count: Math.floor(diff / 86400) });
}

function seenAgoFromDiff(diff: number): string {
  const time = elapsedText(diff);
  const prefix = t('presence.seen_prefix');
  // Lowercase the first character so e.g. "Vu" + "À l'instant" → "Vu à l'instant"
  const lowered = time.charAt(0).toLocaleLowerCase() + time.slice(1);
  return `${prefix} ${lowered}`;
}

export function lastSeenClassFromDiff(diff: number): 'fresh' | 'stale' | 'old' {
  if (diff < 3600) return 'fresh';
  if (diff < 86400) return 'stale';
  return 'old';
}

export function batteryIcon(level: number, charging = false): string {
  if (charging) {
    if (level > 80) return 'mdi:battery-charging';
    if (level > 60) return 'mdi:battery-charging-70';
    if (level > 40) return 'mdi:battery-charging-50';
    if (level > 20) return 'mdi:battery-charging-30';
    return 'mdi:battery-charging-10';
  }
  if (level > 80) return 'mdi:battery';
  if (level > 60) return 'mdi:battery-70';
  if (level > 40) return 'mdi:battery-50';
  if (level > 20) return 'mdi:battery-30';
  return 'mdi:battery-10';
}

export function batteryClass(level: number): string {
  if (level > 50) return 'high';
  if (level > 20) return 'medium';
  return 'low';
}


export function stateClass(s: string): string {
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

export function safeNum(v: unknown): number | null {
  if (v == null || v === '' || v === 'unknown' || v === 'unavailable') return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

/* ── Card ── */

export class GlassPresenceCard extends BaseCard {
  static getConfigElement() {
    return document.createElement('glass-presence-card-editor');
  }

  getCardSize() {
    return 3;
  }

  @state() private _presenceConfig: PresenceBackendConfig = {
    show_header: true,
    person_entities: [],
    smartphone_sensors: {},
    notify_services: {},
    driving_sensors: {},
    sleep_sensors: {},
  };
  @state() private _activePerson: string | null = null;
  /** Persons whose entity_picture failed to load — fall back to the gradient avatar. */
  @state() private _brokenPictures = new Set<string>();
  @state() private _notifText = '';
  @state() private _notifSent = false;
  private _notifSentTimer = 0;

  private _backend?: BackendService;
  private _configLoaded = false;
  private _clockInterval?: ReturnType<typeof setInterval>;
  /** Last person shown in the fold — kept so the close animation has content. */
  private _lastFoldPersonId: string | null = null;

  connectedCallback(): void {
    super.connectedCallback();
    this._listen('presence-config-changed', () => {
      this._configLoaded = false;
      this._loadConfig();
    });
    // Only `seenAgo` / `lastSeenClass` in the open fold need re-rendering by elapsed time.
    // Skip the tick when no person is active to avoid spurious 60s full re-renders.
    this._clockInterval = setInterval(() => {
      if (this._activePerson) this.requestUpdate();
    }, 60_000);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._backend = undefined;
    this._configLoaded = false;
    clearInterval(this._clockInterval);
    this._clockInterval = undefined;
    if (this._notifSentTimer) { clearTimeout(this._notifSentTimer); this._notifSentTimer = 0; }
  }

  protected updated(changedProps: PropertyValues): void {
    super.updated(changedProps);

    if (changedProps.has('hass') && this.hass) {
      if (this._backend && this._backend.connection !== this.hass.connection) {
        this._backend = undefined;
        this._configLoaded = false;
      }
      if (!this._configLoaded) {
        this._loadConfig();
      }
    }
  }

  private async _loadConfig(): Promise<void> {
    if (!this.hass || this._configLoaded) return;
    this._configLoaded = true;
    try {
      if (!this._backend) this._backend = new BackendService(this.hass);
      const result = await this._backend.send<{
        presence_card: PresenceBackendConfig;
      }>('get_config');
      if (result?.presence_card) {
        // Backend may send a partial payload (missing smartphone_sensors etc.).
        // Fill in defaults so downstream lookups never hit `undefined[key]`.
        const cfg = result.presence_card;
        this._presenceConfig = {
          show_header: cfg.show_header ?? true,
          person_entities: cfg.person_entities ?? [],
          smartphone_sensors: cfg.smartphone_sensors ?? {},
          notify_services: cfg.notify_services ?? {},
          driving_sensors: cfg.driving_sensors ?? {},
          sleep_sensors: cfg.sleep_sensors ?? {},
        };
      }
      this.requestUpdate();
    } catch {
      // Retry on the next hass tick.
      this._configLoaded = false;
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
    // Charging state: HA companion app exposes `is_charging` on the battery sensor.
    // Also check truthy string variants ("true", "on", "1") since HA sometimes
    // surfaces it as a string template attribute.
    const chargingRaw = smartAttrs.is_charging ?? attrs.is_charging;
    const isCharging =
      chargingRaw === true ||
      chargingRaw === 'true' ||
      chargingRaw === 'on' ||
      chargingRaw === '1';

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

    // Sleeping (input_boolean.<person>_dort or any binary_sensor)
    const sleepSensorId = this._presenceConfig.sleep_sensors[entityId];
    const isSleeping = !!(sleepSensorId && this.hass?.states[sleepSensorId]?.state === 'on');

    return {
      entityId,
      name,
      state: entity.state,
      entityPicture,
      latitude: safeNum(attrs.latitude),
      longitude: safeNum(attrs.longitude),
      sourceType: (attrs.source_type as string) || 'gps',
      batteryLevel,
      isCharging,
      lastUpdated: entity.last_updated,
      geocodedLocation,
      heartRate,
      spo2,
      steps,
      isDriving,
      isSleeping,
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
    fireHaptic(this, 'light');
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
      this._safeCallService(domain, service, {
        title: t('presence.notif_title', { name: senderName }),
        message: this._notifText.trim(),
      });
      this._notifText = '';
      this._notifSent = true;
      if (this._notifSentTimer) clearTimeout(this._notifSentTimer);
      this._notifSentTimer = window.setTimeout(() => {
        this._notifSent = false;
        this._activePerson = null;
      }, 4000);
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
    const unavailable = isEntityUnavailable(p.state);
    const isActive = this._activePerson === p.entityId;
    const isDimmed = this._activePerson !== null && !isActive;

    return html`
      <div class="person-block ${isRight ? 'right' : ''} ${unavailable ? 'entity-unavailable' : ''} ${isDimmed ? 'dimmed' : ''} ${isActive ? 'active' : ''}">
        <button
          class="avatar-wrapper tappable"
          aria-label=${t('presence.avatar_aria', { name: p.name })}
          aria-expanded=${String(this._activePerson === p.entityId)}
          @click=${(e: Event) => {
            e.stopPropagation();
            const next = this._activePerson === p.entityId ? null : p.entityId;
            if (next !== this._activePerson) this._notifText = '';
            this._activePerson = next;
          }}
        >
          ${unavailable
            ? html`<div class="avatar avatar-fallback avatar-unavailable"><ha-icon .icon=${'mdi:alert-circle-outline'}></ha-icon></div>`
            : html`
                ${p.entityPicture && !this._brokenPictures.has(p.entityId)
                  ? html`<img class="avatar ${p.isSleeping ? 'sleeping' : ''}" src=${p.entityPicture} alt=${p.name}
                      @error=${() => { this._brokenPictures = new Set(this._brokenPictures).add(p.entityId); }} />`
                  : html`
                      <div
                        class="avatar avatar-fallback ${p.isSleeping ? 'sleeping' : ''}"
                        style="background: linear-gradient(135deg, ${colors.from}, ${colors.to})"
                      >
                        <ha-icon .icon=${'mdi:account'}></ha-icon>
                      </div>
                    `}
                <div class="avatar-status ${stateClass(p.state)}"></div>
                ${p.isSleeping ? html`
                  <span class="sleep-badge" aria-label=${t('presence.sleeping_aria', { name: p.name })}>zzz</span>
                ` : nothing}
              `}
        </button>
        <div class="person-info">
          <div class="person-name">${p.name}</div>
          <div class="person-sub">
            <div class="person-line">
              <span class="source-icon"><ha-icon .icon=${sourceIcon(p.sourceType)}></ha-icon></span>
              <span class="person-location">${stateText(p.state)}</span>
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

    const isDimmed = this._activePerson !== null;
    return html`
      <div class="distance-center ${isNear ? 'near' : ''} ${isDimmed ? 'dimmed' : ''}">
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
          ? html`<glass-pill tone="alert"><ha-icon .icon=${'mdi:heart-pulse'}></ha-icon><span>${p.heartRate}</span></glass-pill>`
          : nothing}
        ${p.spo2 != null
          ? html`<glass-pill tone="info"><ha-icon .icon=${'mdi:water-percent'}></ha-icon><span>${p.spo2}%</span></glass-pill>`
          : nothing}
        ${p.steps != null
          ? html`<glass-pill tone="success"><ha-icon .icon=${'mdi:walk'}></ha-icon><span>${p.steps.toLocaleString()}</span></glass-pill>`
          : nothing}
      </div>
    `;
  }

  private _renderFold(persons: PersonData[], presClass: string): TemplateResult | typeof nothing {
    // Always render the fold so the 0fr->1fr grid transition can animate in
    // BOTH directions; only the .open/.visible classes follow _activePerson.
    const person = persons.find((p) => p.entityId === this._activePerson) ?? null;
    const isOpen = person !== null;
    if (person) this._lastFoldPersonId = person.entityId;
    // Fall back to the first person so the (closed, invisible) fold exists in
    // the DOM before the very first expand — required for the open animation.
    const display = person
      ?? persons.find((p) => p.entityId === this._lastFoldPersonId)
      ?? persons[0]
      ?? null;
    if (!display) return nothing;

    // In solo mode (1 person), health chips are already shown beside the avatar
    // (see _renderSoloChips) and notifying oneself is pointless. Show only the
    // address / battery / last-seen row in the fold.
    const isSolo = persons.length === 1;
    const hasHealth = !isSolo && (display.heartRate != null || display.spo2 != null || display.steps != null);
    const showNotif = !isSolo && !!display.notifyService;

    return html`
      <div class="fold-sep ${presClass} ${isOpen ? 'visible' : ''}"></div>
      <div class="ctrl-fold ${isOpen ? 'open' : ''}">
        <div class="ctrl-fold-inner">
          <div class="fold-content">
            <div class="loc-row">
              ${(() => {
                const diff = elapsedSeconds(display.lastUpdated);
                return html`
                  <span class="loc-address">
                    <ha-icon .icon=${'mdi:map-marker-radius'}></ha-icon>
                    ${display.geocodedLocation ? html`<span class="loc-address-text">${display.geocodedLocation}</span>` : nothing}
                    <span class="loc-address-time lastseen-${lastSeenClassFromDiff(diff)}"
                          title=${t('presence.last_seen_label')}>
                      ${seenAgoFromDiff(diff)}
                    </span>
                  </span>
                `;
              })()}
              ${display.batteryLevel != null ? html`
                <span class="meta-chip battery-${batteryClass(display.batteryLevel)} ${display.isCharging ? 'charging' : ''}">
                  <ha-icon .icon=${batteryIcon(display.batteryLevel, display.isCharging)}></ha-icon>
                  <span>${display.batteryLevel}%</span>
                </span>
              ` : nothing}
            </div>
            ${hasHealth
              ? html`
                  <div class="health-pills">
                    ${display.heartRate != null
                      ? html`
                          <div class="health-pill bpm">
                            <div class="health-pill-icon"><ha-icon .icon=${'mdi:heart-pulse'}></ha-icon></div>
                            <div class="health-pill-data">
                              <span class="health-pill-value">${display.heartRate}</span>
                              <span class="health-pill-label">${t('presence.bpm')}</span>
                            </div>
                          </div>
                        `
                      : nothing}
                    ${display.spo2 != null
                      ? html`
                          <div class="health-pill spo2">
                            <div class="health-pill-icon"><ha-icon .icon=${'mdi:water-percent'}></ha-icon></div>
                            <div class="health-pill-data">
                              <span class="health-pill-value">${display.spo2}%</span>
                              <span class="health-pill-label">${t('presence.spo2')}</span>
                            </div>
                          </div>
                        `
                      : nothing}
                    ${display.steps != null
                      ? html`
                          <div class="health-pill steps">
                            <div class="health-pill-icon"><ha-icon .icon=${'mdi:walk'}></ha-icon></div>
                            <div class="health-pill-data">
                              <span class="health-pill-value">${display.steps.toLocaleString()}</span>
                              <span class="health-pill-label">${t('presence.steps')}</span>
                            </div>
                          </div>
                        `
                      : nothing}
                  </div>
                `
              : nothing}
            ${showNotif
              ? html`
                  <div class="notif-zone">
                    ${this._notifSent ? html`
                      <div class="notif-toast">
                        <ha-icon .icon=${'mdi:check-circle'}></ha-icon>
                        ${t('presence.notif_sent')}
                      </div>
                    ` : html`
                      <div class="notif-row">
                        <glass-form-input
                          class="notif-input"
                          placeholder=${t('presence.notify_placeholder', { name: display.name })}
                          .value=${this._notifText}
                          @glass-input=${(e: CustomEvent<{ value: string }>) => {
                            this._notifText = e.detail.value;
                          }}
                          @focus=${(e: Event) => {
                            const el = e.target as HTMLElement & { dataset: DOMStringMap };
                            if (el.dataset.scrolled) return;
                            el.dataset.scrolled = '1';
                            this._scrollToTop();
                          }}
                        ></glass-form-input>
                        <glass-icon-button
                          active
                          active-color="success"
                          .icon=${'mdi:send'}
                          aria-label=${t('presence.send_aria')}
                          @click=${(e: Event) => {
                            e.stopPropagation();
                            this._sendNotification(display);
                          }}
                        ></glass-icon-button>
                      </div>
                    `}
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
    hostMixin,
    glassMixin,
    foldMixin,
    marqueeMixin,
    bounceMixin,
    unavailableMixin,
    tappableMixin,
    presenceCardStyles,
  ];
}

try {
  customElements.define('glass-presence-card', GlassPresenceCard);
} catch {
  /* already registered */
}
