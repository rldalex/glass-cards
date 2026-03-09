import { LitElement, type PropertyValues } from 'lit';
import { property, state } from 'lit/decorators.js';
import { bus, type GlassEventMap } from '@glass-cards/event-bus';
import { setLanguage, getLanguage } from '@glass-cards/i18n';

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
  connection: HassConnection;
  localize(key: string, ...args: unknown[]): string;
  language: string;
  user: HassUser;
  themes: { darkMode: boolean };
  areas: Record<string, AreaRegistryEntry>;
  devices: Record<string, DeviceRegistryEntry>;
  entities: Record<string, EntityRegistryEntry>;
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
}

// — BaseCard —

export abstract class BaseCard extends LitElement {
  @property({ attribute: false }) hass?: HomeAssistant;
  @state() protected _lang = getLanguage();
  protected _config?: LovelaceCardConfig;
  protected _busCleanups: (() => void)[] = [];

  setConfig(config: LovelaceCardConfig): void {
    this._config = config;
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
  }

  // Single-entity cards use _config.entity by default; override for multi-entity
  protected getTrackedEntityIds(): string[] {
    const entity = this._config?.entity;
    return entity ? [entity] : [];
  }

  connectedCallback(): void {
    super.connectedCallback();
    // Flush stale bus subscriptions from a previous connection cycle
    this._busCleanups.forEach((cleanup) => cleanup());
    this._busCleanups = [];
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
  }
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
      let eNow = new Date(now.getFullYear(), end.getMonth(), end.getDate(), end.getHours(), end.getMinutes(), 59, 999);
      // Cross-year recurring window: advance end to next year
      if (sNow > eNow) eNow = new Date(now.getFullYear() + 1, end.getMonth(), end.getDate(), end.getHours(), end.getMinutes(), 59, 999);
      return now >= sNow && now <= eNow;
    }
    return now >= start && now <= end;
  });
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
