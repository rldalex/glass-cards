import { describe, it, expect } from 'vitest';
import {
  pushNav,
  replaceNav,
  readCurrentNav,
  navEquals,
  type NavState,
} from '../../cards/config-panel/src/nav-state';

describe('nav-state', () => {
  it('pushNav stamps the NEW entry with its own state (back restores it)', () => {
    replaceNav({ section: 'dashboard' });
    pushNav({ section: 'rooms' });
    pushNav({ section: 'rooms', roomId: 'salon' });

    // The current entry must describe the CURRENT view — this is what a
    // popstate landing on it will restore. The off-by-one bug stored the
    // previous view here, making back jump two levels.
    expect(readCurrentNav()).toEqual({ section: 'rooms', roomId: 'salon' });
  });

  it('replaceNav overwrites the current entry without adding one', () => {
    const before = history.length;
    replaceNav({ section: 'wizard' });
    expect(history.length).toBe(before);
    expect(readCurrentNav()).toEqual({ section: 'wizard' });
  });

  it('readCurrentNav returns null for entries without panel state', () => {
    history.replaceState(null, '');
    expect(readCurrentNav()).toBeNull();
  });

  it('navEquals compares all three fields', () => {
    const a: NavState = { section: 'rooms', roomId: 'salon' };
    expect(navEquals(a, { section: 'rooms', roomId: 'salon' })).toBe(true);
    expect(navEquals(a, { section: 'rooms', roomId: 'cuisine' })).toBe(false);
    expect(navEquals(a, { section: 'rooms' })).toBe(false);
    expect(navEquals({ section: 'dashboard', subSection: 'light' }, { section: 'dashboard' })).toBe(false);
  });
});
