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

_gcLog('elements defined: ' + [
  'glass-navbar-card', 'glass-room-popup', 'glass-light-card',
  'glass-weather-card',
].map(n => n + '=' + !!customElements.get(n)).join(', '));

installHistoryIntercept();
getThemeManager();

// Check if any of our glass-cards elements are actually rendered in the DOM.
// Traverses shadow roots to find them inside Lovelace's nested shadow DOM.
function _findGlassElements(root: Document | ShadowRoot, depth = 0): number {
  if (depth > 10) return 0;
  let count = 0;
  const tags = ['glass-navbar-card', 'glass-light-card', 'glass-weather-card'];
  for (const tag of tags) {
    count += root.querySelectorAll(tag).length;
  }
  // Traverse into shadow roots
  const allElements = root.querySelectorAll('*');
  for (const el of allElements) {
    if (el.shadowRoot) {
      count += _findGlassElements(el.shadowRoot, depth + 1);
    }
    if (count > 0) return count; // Early exit
  }
  return count;
}

// Tell Lovelace to re-render now that our custom elements are defined.
function fireRebuild() {
  _gcLog('fireRebuild');
  window.dispatchEvent(new Event('ll-rebuild'));
}

// Guard against multiple reload loops — use sessionStorage to track
const RELOAD_KEY = 'gc_reload_ts';

function scheduleRebuilds() {
  // Fire ll-rebuild at multiple fixed intervals
  const delays = [0, 300, 800, 1500, 3000];
  for (const delay of delays) {
    setTimeout(fireRebuild, delay);
  }

  // After 5s, check if our cards are actually rendered. If not, reload once.
  setTimeout(() => {
    const found = _findGlassElements(document);
    _gcLog('render check: found=' + found + ' glass elements');
    if (found === 0) {
      // Only reload if we haven't reloaded in the last 15s
      const lastReload = parseInt(sessionStorage.getItem(RELOAD_KEY) ?? '0', 10);
      const now = Date.now();
      if (now - lastReload > 15000) {
        _gcLog('no glass elements found, forcing reload');
        sessionStorage.setItem(RELOAD_KEY, String(now));
        location.reload();
      } else {
        _gcLog('skipping reload (already reloaded recently)');
      }
    } else {
      _gcLog('cards rendered OK');
    }
  }, 5000);
}

// Fire rebuild after DOM is ready
if (document.readyState === 'loading') {
  _gcLog('waiting DOMContentLoaded');
  document.addEventListener('DOMContentLoaded', () => requestAnimationFrame(scheduleRebuilds));
} else {
  _gcLog('DOM ready, scheduling rebuilds');
  requestAnimationFrame(scheduleRebuilds);
}

// Re-fire rebuild when HA reconnects (mobile app resume from background).
window.addEventListener('connection-status', (e: Event) => {
  const detail = (e as CustomEvent).detail;
  _gcLog('connection-status: ' + detail);
  if (detail === 'connected') {
    setTimeout(scheduleRebuilds, 300);
  }
});
