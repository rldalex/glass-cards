import { installHistoryIntercept } from '@glass-cards/event-bus';
import { getThemeManager } from '@glass-cards/ui-core';

// Debug logger — persists to localStorage for mobile companion debugging
function _gcLog(msg: string) {
  const ts = new Date().toISOString().slice(11, 23);
  const entry = `[${ts}] ${msg}`;
  try {
    const prev = localStorage.getItem('gc_debug') ?? '';
    // Keep last 50 lines
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

// Tell Lovelace to re-render now that our custom elements are defined.
function fireRebuild() {
  _gcLog('fireRebuild');
  window.dispatchEvent(new Event('ll-rebuild'));
}

// Fire rebuild after a short delay to let Lovelace initialize
if (document.readyState === 'loading') {
  _gcLog('waiting DOMContentLoaded');
  document.addEventListener('DOMContentLoaded', () => requestAnimationFrame(fireRebuild));
} else {
  _gcLog('DOM ready, scheduling rAF');
  requestAnimationFrame(fireRebuild);
}

// Re-fire rebuild when HA reconnects (mobile app resume from background).
window.addEventListener('connection-status', (e: Event) => {
  const detail = (e as CustomEvent).detail;
  _gcLog('connection-status: ' + detail);
  if (detail === 'connected') {
    setTimeout(fireRebuild, 500);
  }
});
