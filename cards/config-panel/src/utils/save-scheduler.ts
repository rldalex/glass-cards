/** Reusable debounced save scheduler. */
export function createSaveScheduler(delay = 800) {
  let timer: ReturnType<typeof setTimeout> | undefined;
  return {
    schedule(saveFn: () => void): void {
      if (timer !== undefined) clearTimeout(timer);
      timer = setTimeout(() => { timer = undefined; saveFn(); }, delay);
    },
    cancel(): void {
      if (timer !== undefined) { clearTimeout(timer); timer = undefined; }
    },
  };
}
