import { installHistoryIntercept } from '@glass-cards/event-bus';
import { getThemeManager } from '@glass-cards/ui-core';

// Debug logger — persists to localStorage for mobile companion debugging
function _gcLog(msg: string) {
  const ts = new Date().toISOString().slice(11, 23);
  const entry = `[${ts}] ${msg}`;
  try {
    const prev = localStorage.getItem('gc_debug') ?? '';
    const lines = prev.split('\n').filter(Boolean).slice(-49);
    lines.push(entry);
    localStorage.setItem('gc_debug', lines.join('\n'));
  } catch { /* quota */ }
}

_gcLog('script loaded, readyState=' + document.readyState);

// Register all card custom elements (side-effect imports)
import '../cards/light-card/src/index';
import '../cards/popup-card/src/index';
import '../cards/navbar-card/src/index';
import '../cards/weather-card/src/index';

_gcLog('elements registered: ' + [
  'glass-navbar-card', 'glass-room-popup', 'glass-light-card',
  'glass-weather-card',
].map(n => n + '=' + !!customElements.get(n)).join(', '));

installHistoryIntercept();
getThemeManager();

// Lovelace lives deep in the shadow DOM. Find the hui-root if it exists.
function _findHuiRoot(): Element | null {
  try {
    return document.querySelector('home-assistant')
      ?.shadowRoot?.querySelector('home-assistant-main')
      ?.shadowRoot?.querySelector('ha-panel-lovelace')
      ?.shadowRoot?.querySelector('hui-root') ?? null;
  } catch { return null; }
}

// Check if any of our cards are showing as error cards (hui-error-card)
function _hasErrorCards(): boolean {
  try {
    const huiRoot = _findHuiRoot();
    if (!huiRoot?.shadowRoot) return false;
    const errors = huiRoot.shadowRoot.querySelectorAll('hui-error-card');
    return errors.length > 0;
  } catch { return false; }
}

// Tell Lovelace to re-render now that our custom elements are defined.
function fireRebuild() {
  const huiRoot = _findHuiRoot();
  _gcLog('fireRebuild, huiRoot=' + !!huiRoot);
  window.dispatchEvent(new Event('ll-rebuild'));
}

// Retry fireRebuild with increasing delays until Lovelace is found
// and no error cards remain, or max retries reached.
function fireRebuildWithRetry() {
  const delays = [0, 200, 500, 1000, 2000, 4000];
  let attempt = 0;

  function tryRebuild() {
    fireRebuild();
    attempt++;
    if (attempt < delays.length) {
      // Check after a short delay if error cards are still present
      setTimeout(() => {
        if (_hasErrorCards() || !_findHuiRoot()) {
          _gcLog('retry #' + attempt + ', errorCards=' + _hasErrorCards() + ', huiRoot=' + !!_findHuiRoot());
          tryRebuild();
        } else {
          _gcLog('cards OK after attempt #' + attempt);
        }
      }, delays[attempt]);
    }
  }

  tryRebuild();
}

// Fire rebuild after a short delay to let Lovelace initialize
if (document.readyState === 'loading') {
  _gcLog('waiting DOMContentLoaded');
  document.addEventListener('DOMContentLoaded', () => requestAnimationFrame(fireRebuildWithRetry));
} else {
  _gcLog('DOM ready, scheduling rAF');
  requestAnimationFrame(fireRebuildWithRetry);
}

// Re-fire rebuild when HA reconnects (mobile app resume from background).
window.addEventListener('connection-status', (e: Event) => {
  const detail = (e as CustomEvent).detail;
  _gcLog('connection-status: ' + detail);
  if (detail === 'connected') {
    setTimeout(fireRebuildWithRetry, 300);
  }
});
