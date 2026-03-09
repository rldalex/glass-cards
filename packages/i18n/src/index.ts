/**
 * Glass Cards i18n — lightweight translation system.
 *
 * Locales are statically imported (bundled in the JS) so there are no
 * extra network requests.  The active language is detected from
 * `hass.language` and falls back to `navigator.language` → `'fr'`.
 */

import fr from '../locales/fr.json';
import en from '../locales/en.json';

/* ── Types ── */

type LocaleData = Record<string, Record<string, string>>;

export type TranslationKey =
  | `common.${keyof typeof fr.common}`
  | `light.${keyof typeof fr.light}`
  | `weather.${keyof typeof fr.weather}`
  | `popup.${keyof typeof fr.popup}`
  | `title_card.${keyof typeof fr.title_card}`
  | `editor.${keyof typeof fr.editor}`
  | `cover.${keyof typeof fr.cover}`
  | `spotify.${keyof typeof fr.spotify}`
  | `config.${keyof typeof fr.config}`;

/* ── Locale key validation ── */

// Compile-time check: both locales must have identical structure.
// Missing keys in either direction will produce a TypeScript error.
const _enCheck: typeof fr = en;
const _frCheck: typeof en = fr;
void _enCheck;
void _frCheck;

/* ── Locale registry ── */

const locales: Record<string, LocaleData> = { fr, en };
const fallbackLang = 'fr';

let currentLang = fallbackLang;

/* ── Public API ── */

/**
 * Set the active language.  Called once per card from `set hass()`.
 * Only the first two chars are used (e.g. `'fr'` from `'fr-FR'`).
 */
export function setLanguage(lang: string): boolean {
  const short = lang.slice(0, 2).toLowerCase();
  const resolved = short in locales ? short : fallbackLang;
  if (resolved === currentLang) return false;
  currentLang = resolved;
  return true;
}

/** Return the current language code (2 chars). */
export function getLanguage(): string {
  return currentLang;
}

/**
 * Translate a dotted key, e.g. `t('light.intensity')`.
 *
 * Supports placeholders: `t('popup.activate_scene_aria', { name: 'Relax' })`
 * → replaces `{name}` in the template string.
 *
 * Falls back to the French string, then to the raw key.
 */
export function t(key: TranslationKey, params?: Record<string, string | number>): string {
  const dot = key.indexOf('.');
  const section = dot === -1 ? key : key.slice(0, dot);
  const field = dot === -1 ? '' : key.slice(dot + 1);

  const locale = locales[currentLang] ?? locales[fallbackLang];
  const fallback = locales[fallbackLang];

  const raw = locale?.[section]?.[field] ?? fallback?.[section]?.[field];
  let value = typeof raw === 'string' ? raw : key;

  if (params) {
    for (const [k, v] of Object.entries(params)) {
      value = value.replaceAll(`{${k}}`, String(v));
    }
  }

  return value;
}
