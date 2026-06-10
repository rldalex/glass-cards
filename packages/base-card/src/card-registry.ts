/**
 * Card registry — the single source of truth for every Glass Card's identity.
 *
 * Before this module, the same facts (tag name, HA domain, backend config key,
 * icon, default orders…) were hand-copied across 5+ tables in the navbar, the
 * popup and the config panel. Two of those tables diverging is exactly what
 * produced the `'media'` vs `'media_player'` card_order bug (the media card
 * silently vanished from the popup after saving a room's card order).
 *
 * Adding a new card = ONE entry here + its element/tab implementations.
 * Everything else (dashboard order, popup order, panel grid, breadcrumbs,
 * config routing) derives from this list.
 *
 * NOTE — `SECTION_TO_EVENT` in @glass-cards/event-bus maps backend sections to
 * bus events and cannot import this module (it sits below base-card in the
 * dependency graph). A Vitest coherence test cross-checks both sides instead.
 */

import { html as staticHtml, unsafeStatic, type StaticValue } from 'lit/static-html.js';
import type { GlassEventMap } from '@glass-cards/event-bus';

export { staticHtml };

export interface GlassCardDef {
  /** Dashboard/config id — the key used in dashboard.enabled_cards/card_order. */
  readonly id: string;
  /** Custom element tag of the production card. */
  readonly tag: string;
  /** Config-panel tab element tag. */
  readonly panelTag: string;
  /** Config-panel sub-section id (navigation + breadcrumb i18n). */
  readonly sub: string;
  /** Backend config section key — also the `section` value of the server-side
   *  glass_cards_config_changed event. */
  readonly configKey: string;
  /** Local bus event emitted after a config save. */
  readonly configEvent: keyof GlassEventMap;
  /** HA entity domain in room/popup context — null for dashboard-only cards. */
  readonly domain: string | null;
  /** Position in the room popup's default card order — null = no room mode. */
  readonly roomOrder: number | null;
  readonly icon: string;
  /** Key into ui-core's DOMAIN_COLORS. */
  readonly colorKey: string;
}

/** All cards, in DEFAULT DASHBOARD ORDER. */
export const GLASS_CARDS: readonly GlassCardDef[] = [
  { id: 'title',           tag: 'glass-title-card',           panelTag: 'config-tab-title',    sub: 'title',    configKey: 'title_card',      configEvent: 'title-config-changed',           domain: null,           roomOrder: null, icon: 'mdi:format-title',          colorKey: 'title' },
  { id: 'weather',         tag: 'glass-weather-card',         panelTag: 'config-tab-weather',  sub: 'weather',  configKey: 'weather',         configEvent: 'weather-config-changed',         domain: null,           roomOrder: null, icon: 'mdi:weather-partly-cloudy', colorKey: 'weather' },
  { id: 'climate',         tag: 'glass-climate-card',         panelTag: 'config-tab-climate',  sub: 'climate',  configKey: 'climate_card',    configEvent: 'climate-config-changed',         domain: 'climate',      roomOrder: 2,    icon: 'mdi:thermostat',            colorKey: 'climate' },
  { id: 'light',           tag: 'glass-light-card',           panelTag: 'config-tab-light',    sub: 'light',    configKey: 'light_card',      configEvent: 'light-config-changed',           domain: 'light',        roomOrder: 0,    icon: 'mdi:lightbulb-group',       colorKey: 'light' },
  { id: 'media',           tag: 'glass-media-card',           panelTag: 'config-tab-media',    sub: 'media',    configKey: 'media_card',      configEvent: 'media-config-changed',           domain: 'media_player', roomOrder: 1,    icon: 'mdi:speaker',               colorKey: 'media' },
  { id: 'fan',             tag: 'glass-fan-card',             panelTag: 'config-tab-fan',      sub: 'fan',      configKey: 'fan_card',        configEvent: 'fan-config-changed',             domain: 'fan',          roomOrder: 3,    icon: 'mdi:fan',                   colorKey: 'fan' },
  { id: 'cover',           tag: 'glass-cover-card',           panelTag: 'config-tab-cover',    sub: 'cover',    configKey: 'cover_card',      configEvent: 'cover-config-changed',           domain: 'cover',        roomOrder: 4,    icon: 'mdi:blinds',                colorKey: 'cover' },
  { id: 'spotify',         tag: 'glass-spotify-card',         panelTag: 'config-tab-spotify',  sub: 'spotify',  configKey: 'spotify_card',    configEvent: 'spotify-config-changed',         domain: null,           roomOrder: null, icon: 'mdi:spotify',               colorKey: 'spotify' },
  { id: 'presence',        tag: 'glass-presence-card',        panelTag: 'config-tab-presence', sub: 'presence', configKey: 'presence_card',   configEvent: 'presence-config-changed',        domain: null,           roomOrder: null, icon: 'mdi:account-group',         colorKey: 'presence' },
  { id: 'camera_carousel', tag: 'glass-camera-carousel-card', panelTag: 'config-tab-camera',   sub: 'camera',   configKey: 'camera_carousel', configEvent: 'camera-carousel-config-changed', domain: 'camera',       roomOrder: 5,    icon: 'mdi:cctv',                  colorKey: 'camera' },
  { id: 'calendar',        tag: 'glass-calendar-card',        panelTag: 'config-tab-calendar', sub: 'calendar', configKey: 'calendar_card',   configEvent: 'calendar-config-changed',        domain: null,           roomOrder: null, icon: 'mdi:calendar-month',        colorKey: 'calendar' },
  // vacuum has no room mode yet: domain is set (used for icons/labels) but
  // roomOrder stays null so it never appears in popup/room-detail lists.
  { id: 'vacuum',          tag: 'glass-vacuum-card',          panelTag: 'config-tab-vacuum',   sub: 'vacuum',   configKey: 'vacuum_card',     configEvent: 'vacuum-config-changed',          domain: 'vacuum',       roomOrder: null, icon: 'mdi:robot-vacuum-variant',  colorKey: 'vacuum' },
];

// — Derived views (computed once at module load) —

/** Default dashboard card order (ids). */
export const DASHBOARD_CARD_ORDER: readonly string[] = GLASS_CARDS.map((c) => c.id);

/** Dashboard id → production element tag. */
export const DASHBOARD_CARD_TAGS: Readonly<Record<string, string>> = Object.fromEntries(
  GLASS_CARDS.map((c) => [c.id, c.tag]),
);

/** Cards that render inside the room popup, in default popup order. */
export const ROOM_CARDS: readonly GlassCardDef[] = GLASS_CARDS
  .filter((c): c is GlassCardDef & { domain: string; roomOrder: number } => c.roomOrder !== null && c.domain !== null)
  .sort((a, b) => (a.roomOrder as number) - (b.roomOrder as number));

/** Default room popup card order (entity domains — what room card_order stores). */
export const ROOM_CARD_ORDER: readonly string[] = ROOM_CARDS.map((c) => c.domain as string);

export const cardById = (id: string): GlassCardDef | undefined =>
  GLASS_CARDS.find((c) => c.id === id);

export const cardByDomain = (domain: string): GlassCardDef | undefined =>
  GLASS_CARDS.find((c) => c.domain === domain);

export const cardBySub = (sub: string): GlassCardDef | undefined =>
  GLASS_CARDS.find((c) => c.sub === sub);

/** Legacy room card_order values persisted by older config panels. */
const LEGACY_ROOM_IDS: Readonly<Record<string, string>> = { media: 'media_player' };

/** Normalize a stored room card_order entry to its canonical domain. */
export function normalizeRoomCardId(id: string): string {
  return LEGACY_ROOM_IDS[id] ?? id;
}

// — Static tag handles for lit/static-html —
// Hoisted once per tag: static templates are cached by their static values
// (https://lit.dev/docs/templates/expressions/#static-expressions), so the
// fixed card set yields a small, stable template cache.

const TAG_STATICS = new Map<string, StaticValue>();

/** Static handle for a card's production tag (use inside staticHtml``). */
export function staticTag(tag: string): StaticValue {
  let s = TAG_STATICS.get(tag);
  if (!s) {
    s = unsafeStatic(tag);
    TAG_STATICS.set(tag, s);
  }
  return s;
}
