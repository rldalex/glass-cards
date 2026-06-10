import { describe, it, expect } from 'vitest';
import { computeAmbientPeriod } from '../../cards/navbar-card/src/index';
import type { HomeAssistant } from '@glass-cards/base-card';

function hassWithSun(elevation: number, attrs: Record<string, unknown> = {}, state = 'above_horizon'): HomeAssistant {
  return {
    states: {
      'sun.sun': { entity_id: 'sun.sun', state, attributes: { elevation, ...attrs } },
    },
  } as unknown as HomeAssistant;
}

describe('computeAmbientPeriod', () => {
  it('high sun is day', () => {
    expect(computeAmbientPeriod(hassWithSun(45))).toBe('day');
  });

  it('low rising sun is morning, low setting sun is evening', () => {
    const rising = hassWithSun(10, {
      next_rising: '2026-06-11T06:00:00Z',
      next_setting: '2026-06-10T21:00:00Z',
    });
    expect(computeAmbientPeriod(rising)).toBe('evening');
    const setting = hassWithSun(10, {
      next_rising: '2026-06-10T06:00:00Z',
      next_setting: '2026-06-10T21:00:00Z',
    });
    expect(computeAmbientPeriod(setting)).toBe('morning');
  });

  it('twilight (between -6 and 0) distinguishes dawn from dusk', () => {
    const dawn = hassWithSun(-3, {
      next_rising: '2026-06-10T06:00:00Z',
      next_setting: '2026-06-10T21:00:00Z',
    }, 'below_horizon');
    expect(computeAmbientPeriod(dawn)).toBe('morning');
  });

  it('deep night is night', () => {
    expect(computeAmbientPeriod(hassWithSun(-30, {}, 'below_horizon'))).toBe('night');
  });
});
