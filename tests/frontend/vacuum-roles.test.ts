import { describe, it, expect } from 'vitest';
import {
  emptyVacuumOverrides, slugFromButtonEntity, applyVacuumOverrides,
} from '../../cards/vacuum-card/src/roles';
import {
  deriveVacuumPrefix, discoverVacuumCompanions, entityState, isBinaryOn, numericState,
  type VacuumCompanions,
} from '../../cards/vacuum-card/src/companions';

function hassWith(ids: string[], states: Record<string, string> = {}) {
  const out: Record<string, { entity_id: string; state: string; attributes: Record<string, unknown> }> = {};
  for (const id of ids) out[id] = { entity_id: id, state: states[id] ?? 'unknown', attributes: {} };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return { states: out } as any;
}

describe('deriveVacuumPrefix / slugFromButtonEntity', () => {
  it('derives the prefix from the vacuum entity_id', () => {
    expect(deriveVacuumPrefix('vacuum.saros_10r')).toBe('saros_10r');
  });

  it('strips prefix and nettoyage/clean markers from button ids', () => {
    expect(slugFromButtonEntity('button.saros_10r_nettoyage_cuisine', 'saros_10r')).toBe('cuisine');
    expect(slugFromButtonEntity('button.saros_10r_clean_kitchen', 'saros_10r')).toBe('kitchen');
    expect(slugFromButtonEntity('button.autre_chose', 'saros_10r')).toBe('autre_chose');
  });
});

describe('discoverVacuumCompanions', () => {
  const hass = hassWith([
    'vacuum.saros_10r',
    'sensor.saros_10r_battery',
    'button.saros_10r_nettoyage_cuisine',
    'button.saros_10r_nettoyage_salon',
    'sensor.unrelated_battery',
  ]);

  it('collects room buttons matching the vacuum prefix only', () => {
    const c = discoverVacuumCompanions(hass, 'vacuum.saros_10r');
    expect(c.roomButtons.map((b) => b.slug)).toEqual(['cuisine', 'salon']);
    expect(c.prefix).toBe('saros_10r');
  });

  it('ignores entities from other devices', () => {
    const c = discoverVacuumCompanions(hass, 'vacuum.saros_10r');
    const all = [c.battery, ...c.roomButtons.map((b) => b.entityId)];
    expect(all).not.toContain('sensor.unrelated_battery');
  });
});

describe('applyVacuumOverrides', () => {
  const auto: VacuumCompanions = {
    vacuumEntityId: 'vacuum.x', prefix: 'x',
    battery: 'sensor.x_battery',
    roomButtons: [
      { entityId: 'button.x_nettoyage_cuisine', slug: 'cuisine' },
      { entityId: 'button.x_nettoyage_salon', slug: 'salon' },
    ],
  };

  it('replaces a role with the override entity', () => {
    const r = applyVacuumOverrides(auto, { ...emptyVacuumOverrides(), entityOverrides: { battery: 'sensor.custom' } });
    expect(r.battery).toBe('sensor.custom');
  });

  it('empty string hides the role entirely', () => {
    const r = applyVacuumOverrides(auto, { ...emptyVacuumOverrides(), entityOverrides: { battery: '' } });
    expect(r.battery).toBeUndefined();
  });

  it('merges extras, removes hidden, applies the saved order', () => {
    const r = applyVacuumOverrides(auto, {
      entityOverrides: {},
      roomButtonsHidden: ['button.x_nettoyage_salon'],
      roomButtonsOrder: ['button.x_extra', 'button.x_nettoyage_cuisine'],
      roomButtonsExtra: ['button.x_extra'],
    });
    expect(r.roomButtons.map((b) => b.entityId)).toEqual(['button.x_extra', 'button.x_nettoyage_cuisine']);
  });

  it('never mutates the auto-detected input', () => {
    const before = JSON.stringify(auto);
    applyVacuumOverrides(auto, { ...emptyVacuumOverrides(), entityOverrides: { battery: '' }, roomButtonsHidden: ['button.x_nettoyage_cuisine'] });
    expect(JSON.stringify(auto)).toBe(before);
  });
});

describe('state accessors', () => {
  const hass = hassWith(['sensor.a', 'binary_sensor.b'], { 'sensor.a': '42.5', 'binary_sensor.b': 'on' });

  it('entityState falls back for missing entities', () => {
    expect(entityState(hass, 'sensor.a')).toBe('42.5');
    expect(entityState(hass, 'sensor.missing', 'x')).toBe('x');
    expect(entityState(hass, undefined, 'x')).toBe('x');
  });

  it('isBinaryOn and numericState parse safely', () => {
    expect(isBinaryOn(hass, 'binary_sensor.b')).toBe(true);
    expect(isBinaryOn(hass, undefined)).toBe(false);
    expect(numericState(hass, 'sensor.a')).toBe(42.5);
    expect(numericState(hass, 'binary_sensor.b', 7)).toBe(7);
  });
});
