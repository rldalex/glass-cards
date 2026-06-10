import { describe, it, expect } from 'vitest';
import {
  cameraNamePrefix, discoverCompanions, dedupeCamerasPerDevice, isDoorbellEventEntity,
} from '../../cards/camera-carousel/src/camera-utils';
import type { HassEntity, EntityRegistryEntry } from '@glass-cards/base-card';

function st(id: string, state = 'idle', attributes: Record<string, unknown> = {}): HassEntity {
  return { entity_id: id, state, attributes } as HassEntity;
}

describe('cameraNamePrefix', () => {
  it('returns the object_id of the camera', () => {
    expect(cameraNamePrefix('camera.terrasse')).toBe('terrasse');
  });
});

describe('discoverCompanions', () => {
  const states: Record<string, HassEntity> = {
    'camera.terrasse': st('camera.terrasse'),
    'binary_sensor.terrasse_motion': st('binary_sensor.terrasse_motion', 'off', { device_class: 'motion' }),
    'switch.terrasse_record': st('switch.terrasse_record', 'off'),
    'siren.terrasse_siren': st('siren.terrasse_siren', 'off'),
    'binary_sensor.salon_motion': st('binary_sensor.salon_motion', 'off', { device_class: 'motion' }),
  };
  const entities = {
    'camera.terrasse': { entity_id: 'camera.terrasse', device_id: 'd1' },
    'binary_sensor.terrasse_motion': { entity_id: 'binary_sensor.terrasse_motion', device_id: 'd1' },
    'switch.terrasse_record': { entity_id: 'switch.terrasse_record', device_id: 'd1' },
    'siren.terrasse_siren': { entity_id: 'siren.terrasse_siren', device_id: 'd1' },
    'binary_sensor.salon_motion': { entity_id: 'binary_sensor.salon_motion', device_id: 'd2' },
  } as unknown as Record<string, EntityRegistryEntry>;

  it('matches companions on the same device', () => {
    const c = discoverCompanions('camera.terrasse', states, entities);
    expect(c.motionSensorId).toBe('binary_sensor.terrasse_motion');
    expect(c.recordSwitchId).toBe('switch.terrasse_record');
    expect(c.sirenId).toBe('siren.terrasse_siren');
  });

  it('does not match companions of other devices', () => {
    const c = discoverCompanions('camera.terrasse', states, entities);
    expect(Object.values(c)).not.toContain('binary_sensor.salon_motion');
  });

  it('returns empty companions when the camera has no device entry', () => {
    const c = discoverCompanions('camera.inconnue', states, entities);
    expect(c.motionSensorId).toBeNull();
  });
});

describe('dedupeCamerasPerDevice', () => {
  it('keeps one stream per device, preferring the registry order', () => {
    const entities = {
      'camera.cam_fluent': { entity_id: 'camera.cam_fluent', device_id: 'd1' },
      'camera.cam_clear': { entity_id: 'camera.cam_clear', device_id: 'd1' },
      'camera.autre': { entity_id: 'camera.autre', device_id: 'd2' },
    } as unknown as Record<string, EntityRegistryEntry>;
    const out = dedupeCamerasPerDevice(['camera.cam_fluent', 'camera.cam_clear', 'camera.autre'], entities);
    expect(out).toHaveLength(2);
    expect(out).toContain('camera.autre');
  });

  it('keeps cameras with no device entry', () => {
    const out = dedupeCamerasPerDevice(['camera.x'], {} as Record<string, EntityRegistryEntry>);
    expect(out).toEqual(['camera.x']);
  });
});

describe('isDoorbellEventEntity', () => {
  it('detects doorbell event entities', () => {
    expect(isDoorbellEventEntity(st('event.porte_doorbell', '2026-06-10T12:00:00Z', { event_types: ['ring'], device_class: 'doorbell' }))).toBe(true);
    expect(isDoorbellEventEntity(st('event.bouton', 'unknown', { event_types: ['press'] }))).toBe(false);
  });
});
