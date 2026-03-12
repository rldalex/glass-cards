import { build } from 'vite';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = resolve(fileURLToPath(import.meta.url), '..');
const root = resolve(__dirname, '..');

await build({
  resolve: {
    alias: {
      '@glass-cards/event-bus': resolve(root, 'packages/event-bus/src'),
      '@glass-cards/base-card': resolve(root, 'packages/base-card/src'),
      '@glass-cards/ui-core': resolve(root, 'packages/ui-core/src'),
      '@glass-cards/i18n': resolve(root, 'packages/i18n/src'),
    },
  },
  build: {
    lib: {
      entry: resolve(root, 'src/panel.ts'),
      name: 'GlassCardsPanel',
      formats: ['iife'],
      fileName: () => 'glass-cards-panel.js',
    },
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
      },
    },
    target: 'es2022',
    minify: 'terser',
    sourcemap: false,
    outDir: resolve(root, 'dist'),
    emptyOutDir: false,
  },
});
