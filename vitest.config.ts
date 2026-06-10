import { defineConfig } from 'vitest/config';
import { resolve } from 'node:path';

export default defineConfig({
  define: {
    __GLASS_CARDS_VERSION__: JSON.stringify('test'),
  },
  resolve: {
    alias: {
      '@glass-cards/event-bus': resolve(__dirname, 'packages/event-bus/src'),
      '@glass-cards/base-card': resolve(__dirname, 'packages/base-card/src'),
      '@glass-cards/ui-core': resolve(__dirname, 'packages/ui-core/src'),
      '@glass-cards/i18n': resolve(__dirname, 'packages/i18n/src'),
    },
  },
  test: {
    // window/history/document are needed by the modules under test
    // (event-bus singleton, nav-state); happy-dom is lighter than jsdom.
    environment: 'happy-dom',
    include: ['tests/frontend/**/*.test.ts'],
  },
});
