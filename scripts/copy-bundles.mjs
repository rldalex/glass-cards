import { cpSync } from 'node:fs';

cpSync('dist/glass-cards.js', 'custom_components/glass_cards/www/glass-cards.js');
cpSync('dist/glass-cards-panel.js', 'custom_components/glass_cards/www/glass-cards-panel.js');
