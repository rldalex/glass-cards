import { LitElement, type PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';
import { bus, type GlassEventMap } from '@glass-cards/event-bus';
import { setLanguage } from '@glass-cards/i18n';

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
  protected _config?: LovelaceCardConfig;
  private _busCleanups: (() => void)[] = [];

  setConfig(config: LovelaceCardConfig): void {
    this._config = config;
  }

  // Override in multi-entity cards to compare relevant entity states
  protected shouldUpdate(changedProps: PropertyValues): boolean {
    if (!changedProps.has('hass')) return true;
    // If other props changed alongside hass, always update
    if (changedProps.size > 1) return true;
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
      this.requestUpdate();
    }
  }

  // Single-entity cards use _config.entity by default; override for multi-entity
  protected getTrackedEntityIds(): string[] {
    const entity = this._config?.entity;
    return entity ? [entity] : [];
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

// — BackendService —

export class BackendService {
  private connection: HassConnection;

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
