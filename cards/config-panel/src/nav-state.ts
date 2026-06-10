export interface NavState {
  section: 'wizard' | 'rooms' | 'dashboard' | 'advanced';
  subSection?: string;
  roomId?: string;
}

export const DEFAULT_NAV: NavState = { section: 'dashboard' };

export function pushNav(state: NavState): void {
  window.history.pushState({ glassNav: state }, '');
}

/** Stamp the CURRENT history entry with a nav state (initial entry, wizard
 *  redirect) so popstate can always restore panel entries. */
export function replaceNav(state: NavState): void {
  window.history.replaceState({ glassNav: state }, '');
}

/** Nav state of the current history entry, if it belongs to the panel. */
export function readCurrentNav(): NavState | null {
  return (window.history.state as { glassNav?: NavState } | null)?.glassNav ?? null;
}

export function readNavFromHistory(event: PopStateEvent): NavState | null {
  return event.state?.glassNav ?? null;
}

export function navEquals(a: NavState, b: NavState): boolean {
  return a.section === b.section && a.subSection === b.subSection && a.roomId === b.roomId;
}
