export type AmbientPeriod = 'morning' | 'day' | 'evening' | 'night';

export interface GlassEventMap {
  'location-changed': undefined;
  'ambient-update': { period: AmbientPeriod };
  'popup-open': { areaId: string; originRect?: DOMRect };
  'popup-close': undefined;
  'navbar-config-changed': undefined;
  'room-config-changed': { areaId: string };
  'weather-config-changed': undefined;
  'dashboard-config-changed': undefined;
  'schedule-changed': { entityId: string };
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
    this.listeners.get(event)?.forEach((cb) => cb(payload));
  }
}

export const bus = new EventBus();
export type { EventCallback };

// History API monkey-patch — call once at startup
let historyIntercepted = false;
let origPush: typeof history.pushState | null = null;
let origReplace: typeof history.replaceState | null = null;

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
    window.dispatchEvent(new Event('location-changed'));
    bus.emit('location-changed', undefined);
  };

  history.replaceState = function (data: unknown, title: string, url?: string | URL | null) {
    savedReplace.call(this, data, title, url);
    window.dispatchEvent(new Event('location-changed'));
    bus.emit('location-changed', undefined);
  };

  window.addEventListener('popstate', _onPopState);
}

export function removeHistoryIntercept(): void {
  if (!historyIntercepted) return;
  window.removeEventListener('popstate', _onPopState);
  if (origPush) history.pushState = origPush;
  if (origReplace) history.replaceState = origReplace;
  origPush = null;
  origReplace = null;
  historyIntercepted = false;
}
