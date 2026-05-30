// Shared, declarative description of the vacuum card's configurable companion
// roles, plus the merge function that overlays config-panel overrides on top of
// auto-detection. Imported by BOTH the card (cards/vacuum-card/src/index.ts) and
// the config tab (cards/config-panel/src/tabs/vacuum.ts) — single source of truth.

import type { VacuumCompanions } from './companions';

export type VacuumRoleSection = 'state' | 'mopping' | 'dock' | 'consumables' | 'stats';

/** A single configurable role. `key` matches a field of VacuumCompanions. */
export interface VacuumRoleDef {
  key: keyof VacuumCompanions;
  section: VacuumRoleSection;
  /** Entity domains valid for this role — used to filter the config dropdown. */
  domains: string[];
  /** mdi icon shown next to the role label in the config panel. */
  icon: string;
}

/** Section order, also the render order in the config tab. */
export const VACUUM_ROLE_SECTIONS: VacuumRoleSection[] = [
  'state', 'mopping', 'dock', 'consumables', 'stats',
];

/** Role key for the "clean whole house" button. Configurable like any role,
 *  but rendered inside the rooms section rather than a role section. */
export const ALL_HOUSE_ROLE = 'allHouseButton';

/** The 23 roles actually rendered by the card, grouped into 5 sections.
 *  (Roles detected by companions.ts but never displayed — statusText, mapImage,
 *  dockEmptyMode, consoStrainer, durationTotal, lastStart — are intentionally
 *  excluded: overriding an invisible role would have no effect.) */
export const VACUUM_ROLES: VacuumRoleDef[] = [
  // State (3)
  { key: 'battery', section: 'state', domains: ['sensor'], icon: 'mdi:battery' },
  { key: 'currentRoom', section: 'state', domains: ['sensor'], icon: 'mdi:floor-plan' },
  { key: 'errorMessage', section: 'state', domains: ['sensor'], icon: 'mdi:alert-circle-outline' },
  // Mopping (5)
  { key: 'mopIntensity', section: 'mopping', domains: ['select'], icon: 'mdi:water-percent' },
  { key: 'mopPattern', section: 'mopping', domains: ['select'], icon: 'mdi:vector-square' },
  { key: 'mopAttached', section: 'mopping', domains: ['binary_sensor'], icon: 'mdi:square-rounded' },
  { key: 'tankAttached', section: 'mopping', domains: ['binary_sensor'], icon: 'mdi:cup-water' },
  { key: 'waterShortage', section: 'mopping', domains: ['binary_sensor'], icon: 'mdi:water-alert' },
  // Dock (6)
  { key: 'charging', section: 'dock', domains: ['binary_sensor'], icon: 'mdi:battery-charging' },
  { key: 'dockDrying', section: 'dock', domains: ['binary_sensor'], icon: 'mdi:hair-dryer' },
  { key: 'dockDryingTimeLeft', section: 'dock', domains: ['sensor'], icon: 'mdi:timer-sand' },
  { key: 'dirtyWaterBox', section: 'dock', domains: ['binary_sensor'], icon: 'mdi:water-pump' },
  { key: 'cleanWaterBox', section: 'dock', domains: ['binary_sensor'], icon: 'mdi:water' },
  { key: 'cleaningFluid', section: 'dock', domains: ['binary_sensor'], icon: 'mdi:bottle-tonic-outline' },
  // Consumables (4)
  { key: 'consoBrushMain', section: 'consumables', domains: ['sensor'], icon: 'mdi:broom' },
  { key: 'consoBrushSide', section: 'consumables', domains: ['sensor'], icon: 'mdi:broom' },
  { key: 'consoFilter', section: 'consumables', domains: ['sensor'], icon: 'mdi:air-filter' },
  { key: 'consoSensors', section: 'consumables', domains: ['sensor'], icon: 'mdi:eye-outline' },
  // Stats (5)
  { key: 'durationCurrent', section: 'stats', domains: ['sensor'], icon: 'mdi:timer-outline' },
  { key: 'areaCurrent', section: 'stats', domains: ['sensor'], icon: 'mdi:ruler-square' },
  { key: 'totalCleanings', section: 'stats', domains: ['sensor'], icon: 'mdi:counter' },
  { key: 'areaTotal', section: 'stats', domains: ['sensor'], icon: 'mdi:ruler' },
  { key: 'lastEnd', section: 'stats', domains: ['sensor'], icon: 'mdi:clock-end' },
];

/** Override payload coming from the backend (vacuum_card config slice). */
export interface VacuumOverrides {
  /** role key -> entity_id ; "" = hide the role ; key absent = auto-detect. */
  entityOverrides: Record<string, string>;
  roomButtonsHidden: string[];
  roomButtonsOrder: string[];
  roomButtonsExtra: string[];
}

/** Empty overrides — safe default before the backend config has loaded. */
export function emptyVacuumOverrides(): VacuumOverrides {
  return { entityOverrides: {}, roomButtonsHidden: [], roomButtonsOrder: [], roomButtonsExtra: [] };
}

/** Derive a room slug from a button entity_id, mirroring discoverVacuumCompanions.
 *  e.g. "button.saros_10r_nettoyage_cuisine" + prefix "saros_10r" -> "cuisine". */
export function slugFromButtonEntity(entityId: string, prefix: string): string {
  const local = entityId.includes('.') ? entityId.slice(entityId.indexOf('.') + 1) : entityId;
  const suffix = local.startsWith(prefix + '_') ? local.slice(prefix.length + 1) : local;
  return suffix.replace(/^(nettoyage|clean)[_-]/, '');
}

/**
 * Overlay config-panel overrides on top of auto-detected companions.
 * - entityOverrides: "" deletes the role (hidden); any other value replaces it.
 *   Covers allHouseButton too.
 * - roomButtons: detected ∪ extra, minus hidden, ordered by roomButtonsOrder
 *   (known ids first in saved order, then the rest in detection order).
 * Returns a new object; never mutates `auto`.
 */
export function applyVacuumOverrides(
  auto: VacuumCompanions,
  overrides: VacuumOverrides,
): VacuumCompanions {
  const result: VacuumCompanions = { ...auto, roomButtons: [...auto.roomButtons] };
  const bag = result as unknown as Record<string, unknown>;

  for (const [key, entityId] of Object.entries(overrides.entityOverrides)) {
    if (entityId === '') {
      delete bag[key];
    } else {
      bag[key] = entityId;
    }
  }

  const byId = new Map(result.roomButtons.map((b) => [b.entityId, b]));
  for (const entityId of overrides.roomButtonsExtra) {
    if (!byId.has(entityId)) {
      byId.set(entityId, { entityId, slug: slugFromButtonEntity(entityId, auto.prefix) });
    }
  }
  const hidden = new Set(overrides.roomButtonsHidden);
  let merged = [...byId.values()].filter((b) => !hidden.has(b.entityId));
  if (overrides.roomButtonsOrder.length > 0) {
    const orderMap = new Map(overrides.roomButtonsOrder.map((id, i) => [id, i]));
    merged = merged.sort((a, b) => {
      const ai = orderMap.has(a.entityId) ? orderMap.get(a.entityId)! : Infinity;
      const bi = orderMap.has(b.entityId) ? orderMap.get(b.entityId)! : Infinity;
      return ai - bi;
    });
  }
  result.roomButtons = merged;

  return result;
}
