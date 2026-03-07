import { installHistoryIntercept } from '@glass-cards/event-bus';
import { getThemeManager } from '@glass-cards/ui-core';

installHistoryIntercept();

const theme = getThemeManager();
theme.applyAmbient('day');

console.log('[Glass Cards] Dev server running — period:', theme.currentPeriod);
