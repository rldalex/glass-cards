export type AmbientPeriod = 'morning' | 'day' | 'evening' | 'night';

export interface GlassEventMap {
  'location-changed': undefined;
  'ambient-update': { period: AmbientPeriod };
  'popup-open': { areaId: string; originRect?: DOMRect; roomIndex?: number };
  'popup-close': undefined;
  'navbar-config-changed': undefined;
  'room-config-changed': { areaId: string };
  'weather-config-changed': undefined;
  'dashboard-config-changed': undefined;
  'light-config-changed': undefined;
  'fan-config-changed': undefined;
  'cover-config-changed': undefined;
  'climate-config-changed': undefined;
  'title-config-changed': undefined;
  'spotify-config-changed': undefined;
  'media-config-changed': undefined;
  'presence-config-changed': undefined;
  'camera-carousel-config-changed': undefined;
  'calendar-config-changed': undefined;
  'vacuum-config-changed': undefined;
  'schedule-changed': { entityId: string };
  // Radio queue feedback events (spotify → media card)
  'radio-queue-started': { count: number };
  'radio-queue-track-added': { track: { id: string; name: string; uri: string; artist?: string }; index: number };
  'radio-queue-complete': { total: number };
  'radio-queue-error': { message: string };
}

type EventCallback<T = unknown> = (payload: T) => void;

class EventBus {
  private listeners = new Map<string, Set<EventCallback>>();

  on<K extends keyof GlassEventMap>(
    event: K,
    callback: EventCallback<GlassEventMap[K]>,
  ): () => void {
    let set = this.listeners.get(event);
    if (!set) {
      set = new Set();
      this.listeners.set(event, set);
    }
    set.add(callback as EventCallback);
    return () => this.off(event, callback);
  }

  off<K extends keyof GlassEventMap>(event: K, callback: EventCallback<GlassEventMap[K]>): void {
    this.listeners.get(event)?.delete(callback as EventCallback);
  }

  emit<K extends keyof GlassEventMap>(event: K, payload: GlassEventMap[K]): void {
    const set = this.listeners.get(event);
    if (!set) return;
    // Isolate listeners: one throwing callback must not block the others
    // nor propagate back into the emitter (e.g. a card crash breaking the
    // navbar click handler).
    for (const cb of [...set]) {
      try {
        cb(payload);
      } catch (err) {
        console.error(`[glass-cards] bus listener error on "${event}"`, err);
      }
    }
  }
}

// Singleton on window to ensure the same instance across multiple IIFE bundles
const GLOBAL_KEY = '__glassEventBus';
const w = window as unknown as Record<string, unknown>;
export const bus: EventBus = (w[GLOBAL_KEY] as EventBus) ?? (w[GLOBAL_KEY] = new EventBus());
export type { EventCallback };

// History API monkey-patch — call once at startup
let historyIntercepted = false;
let origPush: typeof history.pushState | null = null;
let origReplace: typeof history.replaceState | null = null;
let _dispatching = false;

function _onPopState() {
  bus.emit('location-changed', undefined);
}

export function installHistoryIntercept(): void {
  if (historyIntercepted) return;
  historyIntercepted = true;

  const savedPush = history.pushState;
  const savedReplace = history.replaceState;
  origPush = savedPush;
  origReplace = savedReplace;

  history.pushState = function (data: unknown, title: string, url?: string | URL | null) {
    savedPush.call(this, data, title, url);
    if (_dispatching) return;
    _dispatching = true;
    try {
      window.dispatchEvent(new Event('location-changed'));
      bus.emit('location-changed', undefined);
    } finally {
      _dispatching = false;
    }
  };

  history.replaceState = function (data: unknown, title: string, url?: string | URL | null) {
    savedReplace.call(this, data, title, url);
    if (_dispatching) return;
    _dispatching = true;
    try {
      window.dispatchEvent(new Event('location-changed'));
      bus.emit('location-changed', undefined);
    } finally {
      _dispatching = false;
    }
  };

  window.addEventListener('popstate', _onPopState);
}

export function removeHistoryIntercept(): void {
  if (!historyIntercepted) return;
  historyIntercepted = false;
  window.removeEventListener('popstate', _onPopState);
  if (origPush) history.pushState = origPush;
  if (origReplace) history.replaceState = origReplace;
  origPush = null;
  origReplace = null;
}

// ─────────── HA event bus bridge ───────────
//
// The backend fires "glass_cards_config_changed" on the HA bus after every
// config save, so other tabs / devices receive the change. attachHass()
// subscribes to that event once per HA connection and dispatches the matching
// local bus event the cards already listen to.

const HA_EVENT = 'glass_cards_config_changed';

const SECTION_TO_EVENT: Partial<Record<string, keyof GlassEventMap>> = {
  navbar: 'navbar-config-changed',
  weather: 'weather-config-changed',
  light_card: 'light-config-changed',
  fan_card: 'fan-config-changed',
  cover_card: 'cover-config-changed',
  climate_card: 'climate-config-changed',
  camera_carousel: 'camera-carousel-config-changed',
  title_card: 'title-config-changed',
  spotify_card: 'spotify-config-changed',
  media_card: 'media-config-changed',
  presence_card: 'presence-config-changed',
  calendar_card: 'calendar-config-changed',
  vacuum_card: 'vacuum-config-changed',
  dashboard: 'dashboard-config-changed',
};

interface HassLike {
  connection: {
    subscribeEvents: (
      callback: (ev: { data?: { section?: string; area_id?: string; entity_id?: string } }) => void,
      eventType: string,
    ) => Promise<() => void>;
  };
}

let attachedConnection: HassLike['connection'] | null = null;
let unsubscribe: (() => void) | null = null;
let pending: Promise<void> | null = null;

export function attachHass(hass: HassLike | undefined | null): void {
  if (!hass || !hass.connection) return;
  if (hass.connection === attachedConnection) return;
  if (pending) return;

  // Tear down any previous subscription (HA reconnect rebuilds the connection).
  if (unsubscribe) { unsubscribe(); unsubscribe = null; }
  attachedConnection = hass.connection;

  pending = (async () => {
    try {
      unsubscribe = await hass.connection.subscribeEvents((ev) => {
        const data = ev.data ?? {};
        const section = data.section;
        if (!section) return;
        if (section === 'rooms' && data.area_id) {
          bus.emit('room-config-changed', { areaId: data.area_id });
          return;
        }
        if (section === 'entity_schedules' && data.entity_id) {
          bus.emit('schedule-changed', { entityId: data.entity_id });
          return;
        }
        const localEvent = SECTION_TO_EVENT[section];
        if (localEvent) bus.emit(localEvent, undefined as never);
      }, HA_EVENT);
    } catch (err) {
      console.warn('[glass-cards] HA event bridge failed to subscribe', err);
      attachedConnection = null;
    } finally {
      pending = null;
    }
  })();
}

export function detachHass(): void {
  if (unsubscribe) { unsubscribe(); unsubscribe = null; }
  attachedConnection = null;
}
