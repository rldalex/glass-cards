import { describe, it, expect } from 'vitest';
import {
  detectLightType, getTempInfo, hsClose, buildLayout, computeTint,
  sliderColor, foldColor, lightTintStyle,
  type LightInfo,
} from '../../cards/light-card/src/light-utils';
import type { HassEntity } from '@glass-cards/base-card';

function entity(attributes: Record<string, unknown>, state = 'on'): HassEntity {
  return { entity_id: 'light.test', state, attributes } as HassEntity;
}

function light(overrides: Partial<LightInfo>): LightInfo {
  return {
    entity: entity({}),
    entityId: 'light.test',
    name: 'Test',
    icon: 'mdi:lightbulb',
    isOn: true,
    type: 'dimmable',
    brightnessPct: 100,
    colorTempKelvin: null,
    minKelvin: 2000,
    maxKelvin: 6500,
    rgbColor: null,
    ...overrides,
  };
}

describe('detectLightType', () => {
  it('detects rgb from any colour mode', () => {
    for (const mode of ['hs', 'rgb', 'rgbw', 'rgbww', 'xy']) {
      expect(detectLightType(entity({ supported_color_modes: [mode] }))).toBe('rgb');
    }
  });

  it('rgb wins over color_temp when both are supported', () => {
    expect(detectLightType(entity({ supported_color_modes: ['color_temp', 'hs'] }))).toBe('rgb');
  });

  it('detects color_temp and brightness modes', () => {
    expect(detectLightType(entity({ supported_color_modes: ['color_temp'] }))).toBe('color_temp');
    expect(detectLightType(entity({ supported_color_modes: ['brightness'] }))).toBe('dimmable');
  });

  it('falls back on the brightness attribute when no modes are declared', () => {
    expect(detectLightType(entity({ brightness: 128 }))).toBe('dimmable');
    expect(detectLightType(entity({}))).toBe('simple');
  });

  it('returns simple for unknown modes (e.g. onoff)', () => {
    expect(detectLightType(entity({ supported_color_modes: ['onoff'] }))).toBe('simple');
  });
});

describe('getTempInfo', () => {
  it('buckets kelvin into warm / neutral / cold', () => {
    expect(getTempInfo(2500)).toEqual({ labelKey: 'light.temp_warm', color: '#ffd4a3' });
    expect(getTempInfo(3500)).toEqual({ labelKey: 'light.temp_warm', color: '#ffedb3' });
    expect(getTempInfo(4500).labelKey).toBe('light.temp_neutral');
    expect(getTempInfo(6000).labelKey).toBe('light.temp_cold');
  });

  it('falls back to cold above all ranges', () => {
    expect(getTempInfo(10000).labelKey).toBe('light.temp_cold');
  });
});

describe('hsClose', () => {
  it('matches identical colours', () => {
    expect(hsClose([251, 191, 36], [251, 191, 36])).toBe(true);
  });

  it('tolerates small hue drift from HA normalization', () => {
    expect(hsClose([255, 0, 0], [255, 6, 0])).toBe(true);
  });

  it('handles the hue wrap-around at 360°', () => {
    // ~358° vs ~2° — only 4° apart across the wrap
    expect(hsClose([255, 0, 9], [255, 9, 0])).toBe(true);
  });

  it('rejects clearly different hues and saturations', () => {
    expect(hsClose([255, 0, 0], [0, 0, 255])).toBe(false);
    expect(hsClose([255, 0, 0], [255, 128, 128])).toBe(false);
  });
});

describe('buildLayout', () => {
  const compact = (id: string) => light({ entityId: id });
  const isCompact = (l: LightInfo) => l.entityId.startsWith('c');

  it('pairs consecutive compact lights', () => {
    const layout = buildLayout([compact('c1'), compact('c2')], isCompact);
    expect(layout).toHaveLength(1);
    expect(layout[0].kind).toBe('compact-pair');
  });

  it('promotes an isolated compact light to full width', () => {
    const layout = buildLayout([compact('c1'), compact('f1'), compact('c2')], isCompact);
    expect(layout.map((i) => i.kind)).toEqual(['full', 'full', 'full']);
  });

  it('promotes the trailing odd compact light to full width', () => {
    const layout = buildLayout([compact('c1'), compact('c2'), compact('c3')], isCompact);
    expect(layout.map((i) => i.kind)).toEqual(['compact-pair', 'full']);
  });

  it('returns an empty layout for no lights', () => {
    expect(buildLayout([], isCompact)).toEqual([]);
  });
});

describe('computeTint', () => {
  it('returns null when every light is off', () => {
    expect(computeTint([light({ isOn: false })])).toBeNull();
  });

  it('borrows the colour of the brightest rgb lamp', () => {
    const tint = computeTint([
      light({ type: 'rgb', rgbColor: [255, 0, 0], brightnessPct: 80 }),
      light({ type: 'rgb', rgbColor: [0, 0, 255], brightnessPct: 30 }),
    ]);
    expect(tint?.background).toContain('#ff0000');
  });

  it('falls back to the kelvin colour, then to the warm default', () => {
    const kelvinTint = computeTint([light({ type: 'color_temp', colorTempKelvin: 2500 })]);
    expect(kelvinTint?.background).toContain('#ffd4a3');
    const plainTint = computeTint([light({})]);
    expect(plainTint?.background).toContain('#fbbf24');
  });

  it('scales intensity with brightness and on-ratio', () => {
    const dim = computeTint([light({ brightnessPct: 10 }), light({ isOn: false, brightnessPct: 0 })]);
    const bright = computeTint([light({ brightnessPct: 100 }), light({ brightnessPct: 100 })]);
    expect(Number(dim?.opacity)).toBeLessThan(Number(bright?.opacity));
    expect(Number(bright?.opacity)).toBeCloseTo(0.22, 2);
  });
});

describe('per-light colour styling', () => {
  it('sliderColor uses the rgb colour, the kelvin bucket colour, or the CSS var', () => {
    expect(sliderColor(light({ type: 'rgb', rgbColor: [10, 20, 30] }))).toBe('10,20,30');
    expect(sliderColor(light({ type: 'color_temp', colorTempKelvin: 2500 }))).toBe('255,212,163');
    expect(sliderColor(light({}))).toBe('var(--rgb-light-glow)');
  });

  it('foldColor produces an rgba with the lamp colour', () => {
    expect(foldColor(light({ rgbColor: [10, 20, 30] }))).toBe('rgba(10,20,30,0.3)');
    expect(foldColor(light({}))).toBe('rgba(var(--rgb-light-glow),0.25)');
  });

  it('lightTintStyle emits both custom properties or an empty string', () => {
    const style = lightTintStyle(light({ type: 'rgb', rgbColor: [10, 20, 30] }));
    expect(style).toContain('--light-tint:rgb(10,20,30)');
    expect(style).toContain('--light-tint-glow:rgba(10,20,30,0.45)');
    expect(lightTintStyle(light({}))).toBe('');
  });
});
