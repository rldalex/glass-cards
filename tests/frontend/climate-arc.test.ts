import { describe, it, expect } from 'vitest';
import {
  toRad, pointOnArc, arcPath, tempToAngle, getArcColorClass, getActionColorClass,
} from '../../cards/climate-card/src/climate-arc';

describe('toRad', () => {
  it('offsets by -90° so that 0° points up', () => {
    expect(toRad(90)).toBeCloseTo(0, 5);
    expect(toRad(0)).toBeCloseTo(-Math.PI / 2, 5);
  });
});

describe('pointOnArc', () => {
  it('places 0° at the top of the circle', () => {
    const p = pointOnArc(0, 0, 10, 0);
    expect(p.x).toBeCloseTo(0, 5);
    expect(p.y).toBeCloseTo(-10, 5);
  });

  it('places 90° at the right of the circle', () => {
    const p = pointOnArc(0, 0, 10, 90);
    expect(p.x).toBeCloseTo(10, 5);
    expect(p.y).toBeCloseTo(0, 5);
  });
});

describe('tempToAngle', () => {
  it('maps the min/max range onto the -120°..120° gauge', () => {
    expect(tempToAngle(7, 7, 35)).toBe(-120);
    expect(tempToAngle(35, 7, 35)).toBe(120);
    expect(tempToAngle(21, 7, 35)).toBe(0);
  });

  it('clamps out-of-range temperatures', () => {
    expect(tempToAngle(0, 7, 35)).toBe(-120);
    expect(tempToAngle(50, 7, 35)).toBe(120);
  });
});

describe('arcPath', () => {
  it('produces an SVG arc command from start to end angle', () => {
    const d = arcPath(-120, 120);
    expect(d).toMatch(/^M [\d.-]+ [\d.-]+ A 90 90 0 [01] 1 [\d.-]+ [\d.-]+$/);
  });

  it('uses the large-arc flag only beyond 180°', () => {
    expect(arcPath(-120, 120)).toContain(' A 90 90 0 1 1 ');
    expect(arcPath(0, 90)).toContain(' A 90 90 0 0 1 ');
  });
});

describe('arc color classes', () => {
  it('follows hvac_action first, then falls back to auto modes', () => {
    expect(getArcColorClass('heating', 'cool')).toBe('heat');
    expect(getArcColorClass('cooling', 'heat')).toBe('cool');
    expect(getArcColorClass('idle', 'heat_cool')).toBe('auto-arc');
    expect(getArcColorClass('idle', 'heat')).toBe('off');
  });

  it('action color distinguishes idle from active states', () => {
    expect(getActionColorClass('heating')).toBe('heat');
    expect(getActionColorClass('cooling')).toBe('cool');
    expect(getActionColorClass('idle')).toBe('idle');
  });
});
