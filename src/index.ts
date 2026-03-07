import { installHistoryIntercept } from '@glass-cards/event-bus';

// Register all card custom elements (side-effect imports)
import '../cards/light-card/src/index';
import '../cards/popup-card/src/index';
import '../cards/navbar-card/src/index';

installHistoryIntercept();

// Tell Lovelace to re-render now that our custom elements are defined
window.dispatchEvent(new Event('ll-rebuild'));
