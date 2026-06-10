import { describe, it, expect } from 'vitest';
import {
  F, coverIcon, getTransport, stateLabelKey, buildCoverInfo, buildPresets, buildLayout,
} from '../../cards/cover-card/src/cover-utils';
import type { HassEntity } from '@glass-cards/base-card';

function entity(state: string, attributes: Record<string, unknown> = {}): HassEntity {
  return { entity_id: 'cover.test', state, attributes } as HassEntity;
}

describe('coverIcon', () => {
  it('maps device classes to open/closed icon pairs', () => {
    expect(coverIcon('garage', true)).toBe('mdi:garage-open');
    expect(coverIcon('garage', false)).toBe('mdi:garage');
    expect(coverIcon('blind', false)).toBe('mdi:blinds');
  });

  it('falls back to shutter icons for unknown device classes', () => {
    expect(coverIcon('weird', true)).toBe('mdi:window-shutter-open');
  });
});

describe('getTransport', () => {
  it('uses vertical arrows for shutter-like covers', () => {
    for (const dc of ['shutter', 'blind', 'shade', 'curtain', 'awning']) {
      expect(getTransport(dc).open).toBe('mdi:arrow-up');
    }
  });

  it('uses contextual icons for garage/gate/door', () => {
    expect(getTransport('garage').open).toBe('mdi:garage-open');
    expect(getTransport('gate').close).toBe('mdi:gate');
  });

  it('doors, dampers and windows have no stop icon', () => {
    expect(getTransport('door').stop).toBeNull();
    expect(getTransport('damper').stop).toBeNull();
    expect(getTransport('window').stop).toBeNull();
  });

  it('falls back to vertical for unknown device classes', () => {
    expect(getTransport('weird')).toEqual(getTransport('shutter'));
  });
});

describe('stateLabelKey', () => {
  it('maps known states to i18n keys', () => {
    expect(stateLabelKey('open')).toBe('cover.open');
    expect(stateLabelKey('closing')).toBe('cover.closing');
  });

  it('returns null for unknown states (rendered raw)', () => {
    expect(stateLabelKey('unavailable')).toBeNull();
  });
});

describe('buildCoverInfo', () => {
  it('reads position, tilt, device_class and features', () => {
    const info = buildCoverInfo('cover.salon', entity('open', {
      friendly_name: 'Volet salon',
      device_class: 'shutter',
      supported_features: 15,
      current_position: 70,
      current_tilt_position: 30,
    }));
    expect(info).toMatchObject({
      entityId: 'cover.salon', name: 'Volet salon', isOpen: true,
      position: 70, tiltPosition: 30, deviceClass: 'shutter', features: 15,
    });
  });

  it('applies safe defaults on a bare entity', () => {
    const info = buildCoverInfo('cover.bare', entity('closed'));
    expect(info).toMatchObject({
      name: 'bare', isOpen: false, position: null, tiltPosition: null,
      deviceClass: 'shutter', features: 0,
    });
  });

  it('treats opening as open', () => {
    expect(buildCoverInfo('cover.x', entity('opening')).isOpen).toBe(true);
  });
});

describe('buildPresets', () => {
  it('binary covers (no SET_POSITION) get Open/Close only', () => {
    const presets = buildPresets('door', F.OPEN | F.CLOSE);
    expect(presets).toHaveLength(2);
    expect(presets[0]).toMatchObject({ position: 0, labelKey: 'cover.preset_closed' });
    expect(presets[1]).toMatchObject({ position: 100, labelKey: 'cover.preset_open' });
  });

  it('position-capable covers get the default 5 presets', () => {
    const presets = buildPresets('shutter', F.SET_POSITION);
    expect(presets.map((p) => p.position)).toEqual([0, 25, 50, 75, 100]);
    expect(presets[1].labelKey).toBeNull(); // 25% renders as raw percentage
  });

  it('per-entity presets override the defaults', () => {
    const presets = buildPresets('shutter', F.SET_POSITION, [0, 40, 100]);
    expect(presets.map((p) => p.position)).toEqual([0, 40, 100]);
  });

  it('icon reflects mostly-open vs mostly-closed', () => {
    const presets = buildPresets('garage', F.SET_POSITION);
    expect(presets[0].icon).toBe('mdi:garage');
    expect(presets[4].icon).toBe('mdi:garage-open');
  });
});

describe('buildLayout', () => {
  const isCompact = (s: string) => s.startsWith('c');

  it('pairs consecutive compact items', () => {
    expect(buildLayout(['c1', 'c2'], isCompact)).toEqual([{ kind: 'pair', left: 'c1', right: 'c2' }]);
  });

  it('promotes isolated and trailing compact items to full width', () => {
    expect(buildLayout(['c1', 'f1', 'c2'], isCompact).map((i) => i.kind)).toEqual(['full', 'full', 'full']);
    expect(buildLayout(['c1', 'c2', 'c3'], isCompact).map((i) => i.kind)).toEqual(['pair', 'full']);
  });

  it('handles empty and full-only lists', () => {
    expect(buildLayout([], isCompact)).toEqual([]);
    expect(buildLayout(['f1', 'f2'], isCompact).map((i) => i.kind)).toEqual(['full', 'full']);
  });
});
