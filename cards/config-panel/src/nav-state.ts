export interface NavState {
  section: 'wizard' | 'rooms' | 'dashboard' | 'advanced';
  subSection?: string;
  roomId?: string;
}

export const DEFAULT_NAV: NavState = { section: 'dashboard' };

export function pushNav(state: NavState): void {
  window.history.pushState({ glassNav: state }, '');
}

export function readNavFromHistory(event: PopStateEvent): NavState | null {
  return event.state?.glassNav ?? null;
}

export function navEquals(a: NavState, b: NavState): boolean {
  return a.section === b.section && a.subSection === b.subSection && a.roomId === b.roomId;
}
