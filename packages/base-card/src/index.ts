export { GlassCardEditor, defineEditor } from './editor';
import { LitElement, type PropertyValues } from 'lit';
import { property, state } from 'lit/decorators.js';
import { bus, attachHass, type GlassEventMap } from '@glass-cards/event-bus';
import { setLanguage, getLanguage } from '@glass-cards/i18n';
import { initMarqueeObserver, BREAKPOINTS, type CardSize } from '@glass-cards/ui-core';

// — HA Types —

export interface HassEntity {
  entity_id: string;
  state: string;
  attributes: Record<string, unknown>;
  last_changed: string;
  last_updated: string;
  context: { id: string; parent_id: string | null; user_id: string | null };
}

export interface HassConnection {
  sendMessagePromise<T>(msg: Record<string, unknown>): Promise<T>;
  subscribeMessage<T>(
    callback: (msg: T) => void,
    msg: Record<string, unknown>,
  ): Promise<() => void>;
  subscribeEvents<T>(
    callback: (msg: T) => void,
    eventType?: string,
  ): Promise<() => void>;
}

export interface HassUser {
  name: string;
  is_admin: boolean;
  is_owner: boolean;
}

export interface HomeAssistant {
  states: Record<string, HassEntity>;
  callService(
    domain: string,
    service: string,
    data?: Record<string, unknown>,
    target?: { entity_id?: string | string[] },
  ): Promise<void>;
  callApi<T>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    path: string,
    parameters?: Record<string, unknown>,
  ): Promise<T>;
  connection: HassConnection;
  localize(key: string, ...args: unknown[]): string;
  language: string;
  user: HassUser;
  themes: { darkMode: boolean };
  areas: Record<string, AreaRegistryEntry>;
  devices: Record<string, DeviceRegistryEntry>;
  entities: Record<string, EntityRegistryEntry>;
  services?: Record<string, Record<string, { fields?: Record<string, unknown> }>>;
}

export interface LovelaceCardConfig {
  type: string;
  entity?: string;
  [key: string]: unknown;
}

export interface AreaRegistryEntry {
  area_id: string;
  name: string;
  icon: string | null;
  picture: string | null;
}

export interface DeviceRegistryEntry {
  id: string;
  area_id: string | null;
  name: string | null;
}

export interface EntityRegistryEntry {
  entity_id: string;
  area_id: string | null;
  device_id: string | null;
  platform: string;
  disabled_by: string | null;
  hidden_by: string | null;
  icon: string | null;
}

// — Gesture Types —

export interface GestureCallbacks {
  onTap?: () => void;
  onLongPress?: () => void;
  onSwipe?: (direction: 'left' | 'right') => void;
  /** CSS selectors to exclude from gesture detection (e.g. 'button', '.slider') */
  exclude?: string;
}

// — BaseCard —

export abstract class BaseCard extends LitElement {
  @property({ attribute: false }) hass?: HomeAssistant;
  @property({ type: Boolean, attribute: 'config-preview' }) configPreview = false;
  @state() protected _lang = getLanguage();
  protected _config?: LovelaceCardConfig;
  protected _busCleanups: (() => void)[] = [];
  private _marqueeCleanup: (() => void) | null = null;
  private _ro?: ResizeObserver;
  private _cardSize: CardSize = 'md';
  private _gestureTimer = 0;
  private _gestureFired = false;
  private _gestureStart: { x: number; y: number; t: number } | null = null;

  setConfig(config: LovelaceCardConfig): void {
    this._config = config;
  }

  static getStubConfig(): Record<string, unknown> {
    return {};
  }

  // Override in multi-entity cards to compare relevant entity states
  protected shouldUpdate(changedProps: PropertyValues): boolean {
    if (!changedProps.has('hass')) return true;
    const oldHass = changedProps.get('hass') as HomeAssistant | undefined;
    if (!oldHass) return true;
    // Detect language change
    if (oldHass.language !== this.hass?.language) return true;
    const entityIds = this.getTrackedEntityIds();
    if (entityIds.length === 0) return true;
    return entityIds.some((id) => oldHass.states[id] !== this.hass?.states[id]);
  }

  protected updated(changedProps: PropertyValues): void {
    super.updated(changedProps);
    if (changedProps.has('hass') && this.hass?.language && setLanguage(this.hass.language)) {
      this._lang = getLanguage();
    }
    if (changedProps.has('hass') && this.hass) {
      // Subscribe (or re-subscribe on HA reconnect) to the server-side config-changed event
      attachHass(this.hass as unknown as Parameters<typeof attachHass>[0]);
    }
  }

  // Single-entity cards use _config.entity by default; override for multi-entity
  protected getTrackedEntityIds(): string[] {
    const entity = this._config?.entity;
    return entity ? [entity] : [];
  }

  private _boundDocClick = this._handleDocumentClick.bind(this);

  connectedCallback(): void {
    super.connectedCallback();
    // Flush stale bus subscriptions from a previous connection cycle
    this._busCleanups.forEach((cleanup) => cleanup());
    this._busCleanups = [];
    document.addEventListener('click', this._boundDocClick, true);
    this._marqueeCleanup = initMarqueeObserver(this.shadowRoot);
    this._ro = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect.width ?? this.offsetWidth;
      this._applyCardSize(w);
    });
    this._ro.observe(this);
  }

  private _applyCardSize(w: number) {
    let next: CardSize = 'xl';
    if (w < BREAKPOINTS.xs) next = 'xs';
    else if (w < BREAKPOINTS.sm) next = 'sm';
    else if (w < BREAKPOINTS.md) next = 'md';
    else if (w < BREAKPOINTS.lg) next = 'lg';
    if (next !== this._cardSize) {
      this._cardSize = next;
      this.setAttribute('size', next);
    }
  }

  protected _listen<K extends keyof GlassEventMap>(
    event: K,
    callback: (payload: GlassEventMap[K]) => void,
  ): void {
    this._busCleanups.push(bus.on(event, callback));
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._busCleanups.forEach((cleanup) => cleanup());
    this._busCleanups = [];
    document.removeEventListener('click', this._boundDocClick, true);
    this._marqueeCleanup?.();
    this._marqueeCleanup = null;
    this._ro?.disconnect();
    this._ro = undefined;
    clearTimeout(this._gestureTimer);
  }

  private _handleDocumentClick(e: Event): void {
    const path = e.composedPath();
    if (!path.includes(this)) this._collapseExpanded();
  }

  /** Override in subclasses to collapse any expanded/fold state on outside click. */
  protected _collapseExpanded(): void {
    // no-op — subclasses override
  }

  // — Gesture handling —

  protected _bindGesture(callbacks: GestureCallbacks) {
    if (this.configPreview) {
      return {
        pointerdown: () => {},
        pointerup: () => {},
        pointermove: () => {},
        pointercancel: () => {},
        contextmenu: () => {},
      };
    }
    return {
      pointerdown: (e: PointerEvent) => this._onGestureDown(e, callbacks),
      pointerup: (e: PointerEvent) => this._onGestureUp(e, callbacks),
      pointermove: (e: PointerEvent) => this._onGestureMove(e),
      pointercancel: () => this._onGestureCancel(),
      contextmenu: (e: Event) => e.preventDefault(),
    };
  }

  /** Call a HA service, blocked in configPreview mode. */
  protected _safeCallService(
    domain: string,
    service: string,
    data?: Record<string, unknown>,
    target?: { entity_id: string | string[] },
  ): void {
    if (this.configPreview || !this.hass) return;
    this.hass.callService(domain, service, data, target);
  }

  private _onGestureDown(e: PointerEvent, cb: GestureCallbacks): void {
    if (cb.exclude && (e.target as HTMLElement).closest(cb.exclude)) return;
    this._gestureStart = { x: e.clientX, y: e.clientY, t: Date.now() };
    this._gestureFired = false;
    clearTimeout(this._gestureTimer);
    if (cb.onLongPress) {
      this._gestureTimer = window.setTimeout(() => {
        this._gestureFired = true;
        fireHaptic(this, 'light');
        cb.onLongPress!();
      }, 500);
    }
  }

  private _onGestureUp(e: PointerEvent, cb: GestureCallbacks): void {
    clearTimeout(this._gestureTimer);
    if (this._gestureFired || !this._gestureStart) { this._gestureStart = null; return; }
    const dx = e.clientX - this._gestureStart.x;
    const elapsed = Date.now() - this._gestureStart.t;
    this._gestureStart = null;
    // Swipe detection
    if (cb.onSwipe && Math.abs(dx) > 50 && elapsed < 500) {
      cb.onSwipe(dx < 0 ? 'left' : 'right');
      return;
    }
    // Tap
    cb.onTap?.();
  }

  private _onGestureMove(e: PointerEvent): void {
    if (this._gestureFired || !this._gestureStart) return;
    const dx = Math.abs(e.clientX - this._gestureStart.x);
    const dy = Math.abs(e.clientY - this._gestureStart.y);
    // Cancel long-press if finger moved, but keep _gestureStart for swipe detection
    if (dx > 15 || dy > 15) {
      clearTimeout(this._gestureTimer);
      // Only cancel gesture entirely on vertical movement (scroll intent)
      if (dy > dx) {
        this._gestureStart = null;
      }
    }
  }

  private _onGestureCancel(): void {
    clearTimeout(this._gestureTimer);
    this._gestureStart = null;
  }

  /**
   * Scroll this card to the top of the viewport.
   * Useful on input focus to keep content visible above the mobile keyboard.
   * Uses a short delay to wait for the virtual keyboard to appear.
   */
  protected _scrollToTop(): void {
    setTimeout(() => {
      this.scrollIntoView({ block: 'start', behavior: 'smooth' });
    }, 300);
  }
}

// — Haptic Feedback —

export type HapticType = 'success' | 'warning' | 'failure' | 'light' | 'medium' | 'heavy' | 'selection';

/**
 * Fire a haptic feedback event (HA companion app pattern).
 * Call on toggle, slider release, mode selection, etc.
 */
export function fireHaptic(el: HTMLElement, type: HapticType = 'light'): void {
  el.dispatchEvent(new CustomEvent('haptic', { bubbles: true, composed: true, detail: type }));
}

// — Area Utilities —

/**
 * Resolve the area_id for an entity, falling back to its device's area_id.
 */
export function resolveEntityAreaId(
  entry: EntityRegistryEntry,
  devices?: Record<string, DeviceRegistryEntry>,
): string | null {
  if (entry.area_id) return entry.area_id;
  if (entry.device_id && devices) {
    const device = devices[entry.device_id];
    if (device?.area_id) return device.area_id;
  }
  return null;
}

/**
 * Get all visible entities belonging to a given area (including via device chain).
 */
export function getAreaEntities(
  areaId: string,
  entities: Record<string, EntityRegistryEntry>,
  devices?: Record<string, DeviceRegistryEntry>,
): EntityRegistryEntry[] {
  return Object.values(entities).filter((e) => {
    if (e.disabled_by || e.hidden_by) return false;
    return resolveEntityAreaId(e, devices) === areaId;
  });
}

// — Visibility Schedule Types —

export interface VisibilityPeriod {
  start: string; // "2026-12-01T18:00"
  end: string;
  recurring?: boolean;
}

export interface EntitySchedule {
  entity_id: string;
  periods: VisibilityPeriod[];
}

export type EntityScheduleMap = Record<string, EntitySchedule>;

/**
 * Check if an entity is currently visible based on its schedule.
 * Returns true if no schedule exists or if at least one period is active now.
 */
export function isEntityVisibleNow(
  entityId: string,
  schedules: EntityScheduleMap | null | undefined,
): boolean {
  if (!schedules) return true;
  const schedule = schedules[entityId];
  if (!schedule || schedule.periods.length === 0) return true;

  const now = new Date();
  return schedule.periods.some((p) => {
    const start = new Date(p.start);
    const end = new Date(p.end);
    end.setSeconds(59, 999);
    if (p.recurring) {
      const sNow = new Date(now.getFullYear(), start.getMonth(), start.getDate(), start.getHours(), start.getMinutes());
      const eNow = new Date(now.getFullYear(), end.getMonth(), end.getDate(), end.getHours(), end.getMinutes(), 59, 999);
      if (sNow <= eNow) {
        // Same-year window (e.g. Mar→Jun)
        return now >= sNow && now <= eNow;
      }
      // Cross-year window (e.g. Nov→Feb): check both halves
      const eNext = new Date(now.getFullYear() + 1, end.getMonth(), end.getDate(), end.getHours(), end.getMinutes(), 59, 999);
      const sPrev = new Date(now.getFullYear() - 1, start.getMonth(), start.getDate(), start.getHours(), start.getMinutes());
      return (now >= sNow && now <= eNext) || (now >= sPrev && now <= eNow);
    }
    return now >= start && now <= end;
  });
}

// — Dashboard entity helper —

/**
 * Collect all entity IDs for a given domain across visible areas.
 * Used in dashboard mode by multi-entity cards (light, climate, fan, cover).
 */
export function getDashboardEntityIds(
  domain: string,
  hass: HomeAssistant,
  visibleAreaIds: string[] | undefined,
): string[] {
  const areas = visibleAreaIds?.length ? visibleAreaIds : Object.keys(hass.areas ?? {});
  if (areas.length === 0) return [];
  const ids: string[] = [];
  for (const aId of areas) {
    for (const e of getAreaEntities(aId, hass.entities, hass.devices)) {
      if (e.entity_id.startsWith(`${domain}.`)) ids.push(e.entity_id);
    }
  }
  return ids;
}

// — BackendService —

export class BackendService {
  readonly connection: HassConnection;

  constructor(hass: HomeAssistant) {
    this.connection = hass.connection;
  }

  send<T = unknown>(command: string, data: Record<string, unknown> = {}): Promise<T> {
    return this.connection.sendMessagePromise<T>({
      type: `glass_cards/${command}`,
      ...data,
    });
  }

  subscribe<T = unknown>(
    command: string,
    callback: (msg: T) => void,
    data: Record<string, unknown> = {},
  ): Promise<() => void> {
    return this.connection.subscribeMessage<T>(callback, {
      type: `glass_cards/${command}`,
      ...data,
    });
  }
}
