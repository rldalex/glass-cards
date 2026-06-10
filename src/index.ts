import { installHistoryIntercept } from '@glass-cards/event-bus';
import { getThemeManager } from '@glass-cards/ui-core';

// Register all card custom elements (side-effect imports)
import '../cards/light-card/src/index';
import '../cards/popup-card/src/index';
import '../cards/navbar-card/src/index';
import '../cards/weather-card/src/index';
import '../cards/cover-card/src/index';
import '../cards/climate-card/src/index';
import '../cards/fan-card/src/index';
import '../cards/title-card/src/index';
import '../cards/spotify-card/src/index';
import '../cards/media-card/src/index';
import '../cards/presence-card/src/index';
import '../cards/camera-carousel/src/index';
import '../cards/calendar-card/src/index';
import '../cards/vacuum-card/src/index';

installHistoryIntercept();
getThemeManager();

// No manual ll-rebuild needed: Lovelace's create-element-base watches
// customElements.whenDefined(tag) for unknown card types and fires
// ll-rebuild on the placeholder element itself once the definition lands.
// (A window-level dispatch was never listened to by HA anyway.)
