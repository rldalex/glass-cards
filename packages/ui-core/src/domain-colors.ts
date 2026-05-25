/** RGB triplet + hex CSS-var color for a Home Assistant domain. */
export interface DomainColor {
  /** CSS variable reference or hex literal, e.g. '#fbbf24' */
  cssVar: string;
  /** RGB triplet string, e.g. '96,165,250' */
  rgb: string;
}

/**
 * Glass Cards canonical color per HA domain. Used by primitives that need to
 * theme themselves to the domain of the entity they act on (e.g. `<glass-action-button>`).
 * Hardcoded values — Glass Cards owns its palette regardless of HA theme.
 */
export const DOMAIN_COLORS: Record<string, DomainColor> = {
  light:         { cssVar: '#fbbf24', rgb: '251,191,36' },
  cover:         { cssVar: '#a78bfa', rgb: '167,139,250' },
  climate:       { cssVar: '#60a5fa', rgb: '96,165,250' },
  media:         { cssVar: '#818cf8', rgb: '129,140,248' },
  fan:           { cssVar: '#2dd4bf', rgb: '45,212,191' },
  spotify:       { cssVar: '#1DB954', rgb: '29,185,84' },
  camera:        { cssVar: '#f87171', rgb: '248,113,113' },
  presence:      { cssVar: '#818cf8', rgb: '129,140,248' },
  title:         { cssVar: '#818cf8', rgb: '129,140,248' },
  weather:       { cssVar: '#60a5fa', rgb: '96,165,250' },
  calendar:      { cssVar: '#4ade80', rgb: '74,222,128' },
  vacuum:        { cssVar: '#60a5fa', rgb: '96,165,250' },
  switch:        { cssVar: '#818cf8', rgb: '129,140,248' },
  lock:          { cssVar: '#a78bfa', rgb: '167,139,250' },
  humidifier:    { cssVar: '#60a5fa', rgb: '96,165,250' },
  valve:         { cssVar: '#a78bfa', rgb: '167,139,250' },
  siren:         { cssVar: '#f87171', rgb: '248,113,113' },
  input_boolean: { cssVar: '#818cf8', rgb: '129,140,248' },
  water_heater:  { cssVar: '#f97316', rgb: '249,115,22' },
  scene:         { cssVar: '#a78bfa', rgb: '167,139,250' },
  script:        { cssVar: '#818cf8', rgb: '129,140,248' },
  button:        { cssVar: '#818cf8', rgb: '129,140,248' },
  input_button:  { cssVar: '#818cf8', rgb: '129,140,248' },
  automation:    { cssVar: '#4ade80', rgb: '74,222,128' },
  remote:        { cssVar: '#818cf8', rgb: '129,140,248' },
  lawn_mower:    { cssVar: '#4ade80', rgb: '74,222,128' },
};
