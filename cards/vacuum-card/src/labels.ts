// Pure label mappings. No Lit, no hass, just dictionaries.
// FR by default. Engine consumes them as fallback when i18n key is absent.

export const FAN_SPEED_LABELS: Record<string, string> = {
  quiet: 'Silence',
  silent: 'Silence',
  balanced: 'Équilibré',
  standard: 'Standard',
  turbo: 'Turbo',
  max: 'Max',
  max_plus: 'Max+',
  off_raise_main_brush: 'Sans brosse',
  smart_mode: 'Auto',
  smart: 'Auto',
  custom: 'Custom',
};

export const MOP_INTENSITY_LABELS: Record<string, string> = {
  off: 'Off',
  slight: 'Très faible',
  low: 'Faible',
  medium: 'Moyen',
  moderate: 'Modéré',
  high: 'Élevé',
  extreme: 'Extrême',
};

export const MOP_PATTERN_LABELS: Record<string, string> = {
  standard: 'Standard',
  deep: 'Profond',
  deep_plus: 'Profond+',
  fast: 'Rapide',
  smart_mode: 'Auto',
  custom: 'Custom',
};

export const DOCK_EMPTY_MODE_LABELS: Record<string, string> = {
  unknown: 'Inconnu',
  smart: 'Auto',
  light: 'Léger',
  balanced: 'Équilibré',
  max: 'Max',
};

export const ROOM_SLUG_LABELS: Record<string, string> = {
  cuisine: 'Cuisine',
  kitchen: 'Cuisine',
  sam: 'Séjour',
  salon: 'Salon',
  living: 'Salon',
  sdb: 'Salle de bain',
  bathroom: 'Salle de bain',
  atelier: 'Atelier',
  workshop: 'Atelier',
  couloir: 'Couloir',
  corridor: 'Couloir',
  hallway: 'Couloir',
  enfant: 'Chambre enfant',
  kids: 'Chambre enfant',
  chambre: 'Chambre',
  bedroom: 'Chambre',
  dressing: 'Dressing',
  closet: 'Dressing',
  bureau: 'Bureau',
  office: 'Bureau',
};

/**
 * Humanize a room slug. Falls back to capitalize-first + replace_ with space.
 */
export function humanizeRoomSlug(slug: string): string {
  if (ROOM_SLUG_LABELS[slug]) return ROOM_SLUG_LABELS[slug];
  const cleaned = slug.replace(/[_-]+/g, ' ').trim();
  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
}

/**
 * Lookup with fallback: returns the table value, else humanizeRoomSlug as default behaviour.
 */
export function labelOf(table: Record<string, string>, key: string, fallback?: string): string {
  return table[key] ?? fallback ?? humanizeRoomSlug(key);
}
