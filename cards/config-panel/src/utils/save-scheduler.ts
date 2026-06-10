/** Reusable debounced save scheduler. */
export function createSaveScheduler(delay = 800) {
  let timer: ReturnType<typeof setTimeout> | undefined;
  let pending: (() => void) | null = null;
  return {
    schedule(saveFn: () => void): void {
      pending = saveFn;
      if (timer !== undefined) clearTimeout(timer);
      timer = setTimeout(() => { timer = undefined; pending = null; saveFn(); }, delay);
    },
    cancel(): void {
      if (timer !== undefined) { clearTimeout(timer); timer = undefined; pending = null; }
    },
    /** Run the pending save NOW. Use on disconnect: cancel() silently threw
     *  away any edit made in the last debounce window. */
    flush(): void {
      if (timer !== undefined) {
        clearTimeout(timer);
        timer = undefined;
        const fn = pending;
        pending = null;
        fn?.();
      }
    },
  };
}
