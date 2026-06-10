import { describe, it, expect } from 'vitest';
import { pickDefaultServiceForDomain } from '../../cards/config-panel/src/views/room-detail';

const svc = (...names: string[]) => Object.fromEntries(names.map((n) => [n, {}]));

describe('pickDefaultServiceForDomain', () => {
  it('prefers toggle when the domain exposes it', () => {
    expect(pickDefaultServiceForDomain('light', svc('turn_on', 'turn_off', 'toggle'))).toBe('light.toggle');
    expect(pickDefaultServiceForDomain('switch', svc('toggle', 'turn_on'))).toBe('switch.toggle');
  });

  it('walks the priority list when toggle is absent', () => {
    expect(pickDefaultServiceForDomain('camera', svc('turn_on', 'turn_off', 'snapshot'))).toBe('camera.turn_on');
    expect(pickDefaultServiceForDomain('button', svc('press'))).toBe('button.press');
    expect(pickDefaultServiceForDomain('vacuum', svc('start', 'pause', 'return_to_base'))).toBe('vacuum.start');
    expect(pickDefaultServiceForDomain('lock', svc('lock', 'unlock', 'open'))).toBe('lock.lock');
  });

  it('falls back to the universal homeassistant.toggle for service-less domains', () => {
    // sensor / person / zone expose no services — `<domain>.toggle` would be
    // an invalid service that errors on every tap.
    expect(pickDefaultServiceForDomain('sensor', undefined)).toBe('homeassistant.toggle');
    expect(pickDefaultServiceForDomain('person', {})).toBe('homeassistant.toggle');
  });

  it('skips destructive commands when a safer sibling exists', () => {
    expect(pickDefaultServiceForDomain('remote', svc('delete_command', 'send_command')))
      .toBe('remote.send_command');
  });

  it('returns empty for empty domain', () => {
    expect(pickDefaultServiceForDomain('', svc('toggle'))).toBe('');
  });
});
