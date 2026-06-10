import { describe, it, expect } from 'vitest';
import {
  haversineKm, batteryIcon, batteryClass, lastSeenClassFromDiff, stateClass, safeNum,
} from '../../cards/presence-card/src/index';

describe('haversineKm', () => {
  it('is zero for identical points and ~scale-correct for known pairs', () => {
    expect(haversineKm(48.85, 2.35, 48.85, 2.35)).toBe(0);
    // Paris -> London ≈ 344 km
    const d = haversineKm(48.8566, 2.3522, 51.5074, -0.1278);
    expect(d).toBeGreaterThan(330);
    expect(d).toBeLessThan(360);
  });
});

describe('batteryIcon / batteryClass', () => {
  it('maps levels to icons, charging variant included', () => {
    expect(batteryIcon(90)).toBe('mdi:battery');
    expect(batteryIcon(50)).toBe('mdi:battery-50');
    expect(batteryIcon(10)).toBe('mdi:battery-10');
    expect(batteryIcon(90, true)).toBe('mdi:battery-charging');
  });

  it('classes follow the 50/20 thresholds', () => {
    expect(batteryClass(80)).toBe('high');
    expect(batteryClass(35)).toBe('medium');
    expect(batteryClass(15)).toBe('low');
  });
});

describe('lastSeenClassFromDiff / stateClass', () => {
  it('fresh under 1h, stale under 24h, old beyond', () => {
    expect(lastSeenClassFromDiff(120)).toBe('fresh');
    expect(lastSeenClassFromDiff(7200)).toBe('stale');
    expect(lastSeenClassFromDiff(200000)).toBe('old');
  });

  it('zones are neither home nor away', () => {
    expect(stateClass('home')).toBe('home');
    expect(stateClass('not_home')).toBe('away');
    expect(stateClass('Bureau')).toBe('zone');
  });
});

describe('safeNum', () => {
  it('rejects unknown/unavailable/empty and non-numerics', () => {
    expect(safeNum('42')).toBe(42);
    expect(safeNum(3.5)).toBe(3.5);
    expect(safeNum('unknown')).toBeNull();
    expect(safeNum('unavailable')).toBeNull();
    expect(safeNum('')).toBeNull();
    expect(safeNum('abc')).toBeNull();
  });
});
