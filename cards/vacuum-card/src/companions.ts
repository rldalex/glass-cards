import type { HomeAssistant } from '@glass-cards/base-card';

export interface VacuumCompanions {
  vacuumEntityId: string;
  prefix: string;
  // Status sensors (fallback sur l'entité principale si absent)
  battery?: string;
  statusText?: string;
  currentRoom?: string;
  errorMessage?: string;
  // Map image
  mapImage?: string;
  // Mop & water
  mopAttached?: string;
  tankAttached?: string;
  waterShortage?: string;
  mopIntensity?: string;
  mopPattern?: string;
  // Dock binary
  charging?: string;
  dockDrying?: string;
  dockDryingTimeLeft?: string;
  dirtyWaterBox?: string;
  cleanWaterBox?: string;
  cleaningFluid?: string;
  dockEmptyMode?: string;
  // Consumables
  consoBrushMain?: string;
  consoBrushSide?: string;
  consoFilter?: string;
  consoSensors?: string;
  consoStrainer?: string;
  // Stats
  durationCurrent?: string;
  durationTotal?: string;
  totalCleanings?: string;
  areaCurrent?: string;
  areaTotal?: string;
  lastStart?: string;
  lastEnd?: string;
  // Rooms
  roomButtons: Array<{ entityId: string; slug: string }>;
  allHouseButton?: string;
}

// Patterns FR + EN. Order matters: most specific first.
// Format: [pattern_capture, target_key]. Patterns are tested against the suffix
// after the vacuum prefix (e.g. for "sensor.saros_10r_batterie", suffix is "batterie").
const SUFFIX_PATTERNS: Array<[RegExp, keyof VacuumCompanions]> = [
  // Battery
  [/^batterie$|^battery$/, 'battery'],
  // Status / errors
  [/^etat$|^status$|^state$/, 'statusText'],
  [/^current[_-]?room$|^piece[_-]?courante$/, 'currentRoom'],
  [/^erreur[_-]?de[_-]?l[_-]?aspirateur$|^vacuum[_-]?error$|^error[_-]?message$/, 'errorMessage'],
  // Map
  [/^maison$|^map$|^plan$/, 'mapImage'],
  // Mop & water
  [/^serpilliere[_-]?fixee$|^mop[_-]?attached$/, 'mopAttached'],
  [/^reservoir[_-]?d[_-]?eau[_-]?fixe$|^water[_-]?tank[_-]?attached$/, 'tankAttached'],
  [/^penurie[_-]?d[_-]?eau$|^water[_-]?shortage$/, 'waterShortage'],
  [/^intensite[_-]?de[_-]?frottement$|^mop[_-]?intensity$|^scrub[_-]?intensity$/, 'mopIntensity'],
  [/^parcours[_-]?de[_-]?lavage[_-]?de[_-]?sol$|^mop[_-]?pattern$|^floor[_-]?mop[_-]?pattern$/, 'mopPattern'],
  // Dock
  [/^en[_-]?charge$|^charging$/, 'charging'],
  [/^dock[_-]?sechage[_-]?de[_-]?la[_-]?serpilliere$|^dock[_-]?mop[_-]?drying$|^mop[_-]?drying$/, 'dockDrying'],
  [/^dock[_-]?temps[_-]?de[_-]?sechage[_-]?de[_-]?la[_-]?serpilliere[_-]?restant$|^mop[_-]?drying[_-]?time[_-]?left$/, 'dockDryingTimeLeft'],
  [/^dock[_-]?dirty[_-]?water[_-]?box$/, 'dirtyWaterBox'],
  [/^dock[_-]?clean[_-]?water[_-]?box$/, 'cleanWaterBox'],
  [/^dock[_-]?cleaning[_-]?fluid$/, 'cleaningFluid'],
  [/^dock[_-]?empty[_-]?mode$|^dock[_-]?mode[_-]?de[_-]?vidage$/, 'dockEmptyMode'],
  // Consumables
  [/^temps[_-]?restant[_-]?brosse[_-]?principale$|^main[_-]?brush[_-]?time[_-]?left$/, 'consoBrushMain'],
  [/^temps[_-]?restant[_-]?brosse[_-]?laterale$|^side[_-]?brush[_-]?time[_-]?left$/, 'consoBrushSide'],
  [/^temps[_-]?restant[_-]?filtre$|^filter[_-]?time[_-]?left$/, 'consoFilter'],
  [/^temps[_-]?restant[_-]?capteurs$|^sensors[_-]?time[_-]?left$/, 'consoSensors'],
  [/^dock[_-]?strainer[_-]?time[_-]?left$/, 'consoStrainer'],
  // Stats
  [/^duree[_-]?de[_-]?nettoyage$|^cleaning[_-]?duration$/, 'durationCurrent'],
  [/^duree[_-]?totale[_-]?de[_-]?nettoyage$|^total[_-]?cleaning[_-]?duration$/, 'durationTotal'],
  [/^nombre[_-]?total[_-]?de[_-]?nettoyages$|^total[_-]?cleanings$/, 'totalCleanings'],
  [/^surface[_-]?de[_-]?nettoyage$|^cleaning[_-]?area$/, 'areaCurrent'],
  [/^surface[_-]?de[_-]?nettoyage[_-]?totale$|^total[_-]?cleaning[_-]?area$/, 'areaTotal'],
  [/^debut[_-]?du[_-]?dernier[_-]?nettoyage$|^last[_-]?clean[_-]?start$/, 'lastStart'],
  [/^fin[_-]?du[_-]?dernier[_-]?nettoyage$|^last[_-]?clean[_-]?end$/, 'lastEnd'],
];

// Room buttons: button.<prefix>_nettoyage_<slug>  OR  button.<prefix>_clean_<slug>
// The slug "complet"/"complete" is captured separately as allHouseButton.
const ROOM_BUTTON_PATTERN = /^nettoyage[_-]?(?!complet$)(.+)$|^clean[_-]?(?!complete$|all$)(.+)$/;
const ALL_HOUSE_BUTTON = /^nettoyage[_-]?complet$|^clean[_-]?(complete|all)$/;

/**
 * Extracts the suffix after the entity domain.
 * e.g. "sensor.saros_10r_batterie" with prefix "saros_10r" → "batterie"
 */
function suffixAfterPrefix(entityId: string, prefix: string): string | null {
  const dotIdx = entityId.indexOf('.');
  if (dotIdx === -1) return null;
  const local = entityId.slice(dotIdx + 1);
  if (!local.startsWith(prefix + '_')) return null;
  return local.slice(prefix.length + 1);
}

export function deriveVacuumPrefix(vacuumEntityId: string): string {
  // "vacuum.saros_10r" → "saros_10r"
  return vacuumEntityId.includes('.') ? vacuumEntityId.split('.')[1] : vacuumEntityId;
}

export function discoverVacuumCompanions(hass: HomeAssistant, vacuumEntityId: string): VacuumCompanions {
  const prefix = deriveVacuumPrefix(vacuumEntityId);
  const result: VacuumCompanions = { vacuumEntityId, prefix, roomButtons: [] };

  for (const entityId of Object.keys(hass?.states ?? {})) {
    const suffix = suffixAfterPrefix(entityId, prefix);
    if (!suffix) continue;

    const domain = entityId.split('.')[0];

    // Room buttons
    if (domain === 'button') {
      const allMatch = suffix.match(ALL_HOUSE_BUTTON);
      if (allMatch) {
        result.allHouseButton = entityId;
        continue;
      }
      const roomMatch = suffix.match(ROOM_BUTTON_PATTERN);
      if (roomMatch) {
        const slug = roomMatch[1] ?? roomMatch[2];
        if (slug) result.roomButtons.push({ entityId, slug });
        continue;
      }
    }

    // Other companions (first match wins)
    for (const [pattern, key] of SUFFIX_PATTERNS) {
      if (pattern.test(suffix)) {
        if (!result[key]) {
          (result as unknown as Record<string, unknown>)[key as string] = entityId;
        }
        break;
      }
    }
  }

  return result;
}

/**
 * Safe accessor: returns the state of a companion, or fallback.
 */
export function entityState(hass: HomeAssistant, entityId: string | undefined, fallback = 'unknown'): string {
  if (!entityId || !hass?.states?.[entityId]) return fallback;
  return hass.states[entityId].state;
}

export function entityAttribute<T = unknown>(hass: HomeAssistant, entityId: string | undefined, attr: string): T | null {
  if (!entityId || !hass?.states?.[entityId]) return null;
  const value = hass.states[entityId].attributes[attr];
  return (value as T) ?? null;
}

export function isBinaryOn(hass: HomeAssistant, entityId: string | undefined): boolean {
  return entityState(hass, entityId, 'off') === 'on';
}

export function numericState(hass: HomeAssistant, entityId: string | undefined, fallback = 0): number {
  const value = parseFloat(entityState(hass, entityId, ''));
  return Number.isFinite(value) ? value : fallback;
}

/** Duration state in HOURS (consumables time-left). HA integrations report
 *  raw native units (Roborock exposes consumables in SECONDS) — reading the
 *  state as-is silently shows absurd, frozen-looking values. Convert using the
 *  sensor's own unit_of_measurement; unit-less states are assumed hours. */
export function numericStateInHours(hass: HomeAssistant, entityId: string | undefined, fallback = 0): number {
  if (!entityId || !hass?.states?.[entityId]) return fallback;
  const st = hass.states[entityId];
  const value = parseFloat(st.state);
  if (!Number.isFinite(value)) return fallback;
  const unit = (st.attributes?.unit_of_measurement as string | undefined)?.toLowerCase();
  switch (unit) {
    case 's': case 'sec': case 'seconds': case 'secondes': return value / 3600;
    case 'min': case 'minutes': return value / 60;
    case 'd': case 'days': case 'j': case 'jours': return value * 24;
    default: return value; // 'h' or unit-less
  }
}

/** Duration state in MINUTES (drying time left, cleaning duration). Unit-less states are assumed to already be minutes. */
export function numericStateInMinutes(hass: HomeAssistant, entityId: string | undefined, fallback = 0): number {
  if (!entityId || !hass?.states?.[entityId]) return fallback;
  const st = hass.states[entityId];
  const value = parseFloat(st.state);
  if (!Number.isFinite(value)) return fallback;
  const unit = (st.attributes?.unit_of_measurement as string | undefined)?.toLowerCase();
  switch (unit) {
    case 's': case 'sec': case 'seconds': case 'secondes': return value / 60;
    case 'h': case 'hr': case 'hours': case 'heures': return value * 60;
    case 'd': case 'days': case 'j': case 'jours': return value * 1440;
    default: return value; // 'min' or unit-less
  }
}
