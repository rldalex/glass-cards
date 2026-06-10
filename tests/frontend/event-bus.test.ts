import { describe, it, expect, vi, afterEach } from 'vitest';
import { bus, attachHass, detachHass } from '@glass-cards/event-bus';

describe('EventBus', () => {
  it('delivers payloads to subscribers and stops after cleanup', () => {
    const seen: string[] = [];
    const off = bus.on('room-config-changed', (p) => seen.push(p.areaId));

    bus.emit('room-config-changed', { areaId: 'salon' });
    off();
    bus.emit('room-config-changed', { areaId: 'cuisine' });

    expect(seen).toEqual(['salon']);
  });

  it('isolates listeners: one throwing callback must not block the others', () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const seen: string[] = [];
    const offBoom = bus.on('popup-close', () => { throw new Error('boom'); });
    const offOk = bus.on('popup-close', () => seen.push('ok'));

    expect(() => bus.emit('popup-close', undefined)).not.toThrow();
    expect(seen).toEqual(['ok']);
    expect(errorSpy).toHaveBeenCalledOnce();

    offBoom();
    offOk();
    errorSpy.mockRestore();
  });

  it('is a window-global singleton shared across bundle instances', () => {
    const w = window as unknown as Record<string, unknown>;
    expect(w.__glassEventBus).toBe(bus);
  });
});

describe('attachHass (HA event bridge)', () => {
  afterEach(() => detachHass());

  function makeConnection() {
    let handler: ((ev: { data?: Record<string, string> }) => void) | undefined;
    const unsubscribe = vi.fn();
    const connection = {
      subscribeEvents: vi.fn(async (cb: typeof handler) => {
        handler = cb;
        return unsubscribe;
      }),
    };
    return { connection, unsubscribe, fire: (data: Record<string, string>) => handler?.({ data }) };
  }

  it('subscribes once per connection and bridges sections to bus events', async () => {
    const { connection, fire } = makeConnection();
    attachHass({ connection } as never);
    attachHass({ connection } as never); // same connection — no resubscribe
    await Promise.resolve();

    expect(connection.subscribeEvents).toHaveBeenCalledOnce();

    const seen: string[] = [];
    const off = bus.on('room-config-changed', (p) => seen.push(p.areaId));
    fire({ section: 'rooms', area_id: 'bureau' });
    expect(seen).toEqual(['bureau']);
    off();
  });

  it('hands over to a connection that arrived while a subscribe was in flight', async () => {
    let resolveFirst!: (fn: () => void) => void;
    const first = {
      subscribeEvents: vi.fn(() => new Promise<() => void>((r) => { resolveFirst = r; })),
    };
    const second = makeConnection();

    attachHass({ connection: first } as never);
    attachHass({ connection: second.connection } as never); // mid-flight

    resolveFirst(vi.fn());
    // settle the pending chain + the follow-up attach
    await Promise.resolve(); await Promise.resolve(); await Promise.resolve();

    expect(second.connection.subscribeEvents).toHaveBeenCalledOnce();
  });
});
