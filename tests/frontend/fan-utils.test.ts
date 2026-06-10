import { describe, it, expect } from 'vitest';
import {
  FanFeature, presetLabelKey, pctToStep, stepToPct, stepToPctDisplay, snapPct,
  spinDuration, isCeilingFan, findCeilingLight, buildFanInfo, hasControls, buildLayout,
} from '../../cards/fan-card/src/fan-utils';
import type { HassEntity } from '@glass-cards/base-card';

function entity(state: string, attributes: Record<string, unknown> = {}, id = 'fan.test'): HassEntity {
  return { entity_id: id, state, attributes } as HassEntity;
}

const emptyHass = { states: {} };

describe('speed step math', () => {
  it('converts percentage to the nearest step', () => {
    expect(pctToStep(0, 3)).toBe(0);
    expect(pctToStep(33, 3)).toBe(1);
    expect(pctToStep(66, 3)).toBe(2);
    expect(pctToStep(100, 3)).toBe(3);
  });

  it('clamps tiny non-zero percentages to step 1', () => {
    expect(pctToStep(1, 3)).toBe(1);
  });

  it('round-trips through stepToPct', () => {
    expect(stepToPct(2, 3)).toBeCloseTo(66.666, 2);
    expect(stepToPctDisplay(2, 3)).toBe(67);
    expect(stepToPct(0, 3)).toBe(0);
  });

  it('snapPct snaps to the closest step percentage', () => {
    expect(snapPct(50, 3)).toBeCloseTo(stepToPct(2, 3), 5);
    expect(snapPct(0, 3)).toBe(0);
    expect(snapPct(100, 4)).toBe(100);
  });
});

describe('spinDuration', () => {
  it('spins faster at higher percentages', () => {
    expect(spinDuration(0)).toBe('3s');
    expect(spinDuration(10)).toBe('4s');
    expect(spinDuration(100)).toBe('0.7s');
  });
});

describe('presetLabelKey', () => {
  it('maps known modes (incl. french aliases) to i18n keys', () => {
    expect(presetLabelKey('auto')).toBe('fan.preset_auto');
    expect(presetLabelKey('Nuit')).toBe('fan.preset_night');
    expect(presetLabelKey('SILENT')).toBe('fan.preset_silent');
  });

  it('returns null for unknown modes', () => {
    expect(presetLabelKey('whoosh')).toBeNull();
  });
});

describe('ceiling fan detection', () => {
  it('detects via device_class or entity id keywords', () => {
    expect(isCeilingFan('fan.x', entity('on', { device_class: 'ceiling' }))).toBe(true);
    expect(isCeilingFan('fan.ventilateur_plafond', entity('on'))).toBe(true);
    expect(isCeilingFan('fan.bureau', entity('on'))).toBe(false);
  });

  it('finds the ceiling light by naming convention', () => {
    const hass = { states: { 'light.salon': entity('on', {}, 'light.salon') } };
    expect(findCeilingLight('fan.salon', hass)).toBe('light.salon');
    expect(findCeilingLight('fan.cuisine', hass)).toBeNull();
  });

  it('finds the ceiling light on the same device', () => {
    const hass = {
      states: { 'light.lampe': entity('on', {}, 'light.lampe') },
      entities: {
        'fan.plafond': { entity_id: 'fan.plafond', device_id: 'dev1' },
        'light.lampe': { entity_id: 'light.lampe', device_id: 'dev1' },
      },
    };
    expect(findCeilingLight('fan.plafond', hass)).toBe('light.lampe');
  });
});

describe('buildFanInfo', () => {
  it('reads speed, preset, direction and features', () => {
    const info = buildFanInfo('fan.bureau', entity('on', {
      friendly_name: 'Ventilo bureau',
      percentage: 66,
      speed_count: 3,
      direction: 'forward',
      oscillating: true,
      preset_mode: 'auto',
      preset_modes: ['auto', 'turbo'],
      supported_features: 15,
    }), emptyHass);
    expect(info).toMatchObject({
      name: 'Ventilo bureau', isOn: true, percentage: 66, speedCount: 3,
      direction: 'forward', oscillating: true, presetMode: 'auto', isSimple: false,
    });
  });

  it('derives speed count from percentage_step when speed_count missing', () => {
    expect(buildFanInfo('fan.x', entity('on', { percentage_step: 25 }), emptyHass).speedCount).toBe(4);
    expect(buildFanInfo('fan.x', entity('on'), emptyHass).speedCount).toBe(3);
  });

  it('zeroes percentage and preset when off', () => {
    const info = buildFanInfo('fan.x', entity('off', { percentage: 66, preset_mode: 'auto' }), emptyHass);
    expect(info.percentage).toBe(0);
    expect(info.presetMode).toBeNull();
  });

  it('marks speed-only fans as simple', () => {
    expect(buildFanInfo('fan.x', entity('on', { supported_features: FanFeature.SET_SPEED }), emptyHass).isSimple).toBe(true);
    expect(buildFanInfo('fan.x', entity('on', { supported_features: FanFeature.SET_SPEED | FanFeature.OSCILLATE }), emptyHass).isSimple).toBe(false);
  });
});

describe('hasControls', () => {
  it('is false for bare on/off fans, true with any feature or ceiling light', () => {
    const bare = buildFanInfo('fan.x', entity('on'), emptyHass);
    expect(hasControls(bare)).toBe(false);
    const speedy = buildFanInfo('fan.x', entity('on', { supported_features: FanFeature.SET_SPEED }), emptyHass);
    expect(hasControls(speedy)).toBe(true);
    expect(hasControls({ ...bare, lightEntityId: 'light.x' })).toBe(true);
  });
});

describe('buildLayout', () => {
  const isCompact = (s: string) => s.startsWith('c');

  it('pairs consecutive compact items, promotes trailing ones', () => {
    expect(buildLayout(['c1', 'c2'], isCompact)).toEqual([{ kind: 'pair', left: 'c1', right: 'c2' }]);
    expect(buildLayout(['c1', 'c2', 'c3'], isCompact).map((i) => i.kind)).toEqual(['pair', 'full']);
    expect(buildLayout(['c1', 'f1', 'c2'], isCompact).map((i) => i.kind)).toEqual(['full', 'full', 'full']);
  });

  it('pairs everything when isCompact is constant true (dashboard mode)', () => {
    expect(buildLayout(['a', 'b', 'c'], () => true).map((i) => i.kind)).toEqual(['pair', 'full']);
  });
});
