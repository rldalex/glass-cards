import { installHistoryIntercept } from '@glass-cards/event-bus';
import { getThemeManager } from '@glass-cards/ui-core';

// Register all card custom elements (side-effect imports)
import '../cards/light-card/src/index';
import '../cards/popup-card/src/index';
import '../cards/navbar-card/src/index';
import '../cards/weather-card/src/index';
import '../cards/cover-card/src/index';
import '../cards/fan-card/src/index';
import '../cards/title-card/src/index';
import '../cards/spotify-card/src/index';
import '../cards/media-card/src/index';
import '../cards/presence-card/src/index';
import '../cards/camera-carousel/src/index';

installHistoryIntercept();
getThemeManager();

// Tell Lovelace to re-render now that our custom elements are defined.
function fireRebuild() {
  window.dispatchEvent(new Event('ll-rebuild'));
}

// Fire rebuild after a short delay to let Lovelace initialize
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => requestAnimationFrame(fireRebuild));
} else {
  requestAnimationFrame(fireRebuild);
}

// Re-fire rebuild when HA reconnects (mobile app resume from background).
// The 'connection-status' event is dispatched by the HA frontend on WS reconnect.
window.addEventListener('connection-status', (e: Event) => {
  const detail = (e as CustomEvent).detail;
  if (detail === 'connected') {
    setTimeout(fireRebuild, 500);
  }
});
