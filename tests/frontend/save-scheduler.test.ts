import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { createSaveScheduler } from '../../cards/config-panel/src/utils/save-scheduler';

describe('createSaveScheduler', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it('debounces: only the last scheduled save runs, after the delay', () => {
    const scheduler = createSaveScheduler(800);
    const a = vi.fn();
    const b = vi.fn();

    scheduler.schedule(a);
    vi.advanceTimersByTime(400);
    scheduler.schedule(b);
    vi.advanceTimersByTime(799);
    expect(b).not.toHaveBeenCalled();
    vi.advanceTimersByTime(1);

    expect(a).not.toHaveBeenCalled();
    expect(b).toHaveBeenCalledOnce();
  });

  it('cancel() drops the pending save', () => {
    const scheduler = createSaveScheduler(800);
    const save = vi.fn();
    scheduler.schedule(save);
    scheduler.cancel();
    vi.advanceTimersByTime(2000);
    expect(save).not.toHaveBeenCalled();
  });

  it('flush() runs the pending save immediately, exactly once', () => {
    const scheduler = createSaveScheduler(800);
    const save = vi.fn();
    scheduler.schedule(save);
    scheduler.flush();
    expect(save).toHaveBeenCalledOnce();
    vi.advanceTimersByTime(2000);
    expect(save).toHaveBeenCalledOnce(); // timer was cleared, no double-run
  });

  it('flush() is a no-op when nothing is pending', () => {
    const scheduler = createSaveScheduler(800);
    expect(() => scheduler.flush()).not.toThrow();
    const save = vi.fn();
    scheduler.schedule(save);
    vi.advanceTimersByTime(800);
    expect(save).toHaveBeenCalledOnce();
    scheduler.flush(); // already ran — must not run again
    expect(save).toHaveBeenCalledOnce();
  });
});
