import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import { readFileSync } from 'node:fs';

const pkg = JSON.parse(readFileSync(resolve(__dirname, 'package.json'), 'utf8')) as { version: string };

export default defineConfig(({ command }) => ({
  root: command === 'serve' ? 'dev' : undefined,
  define: {
    __GLASS_CARDS_VERSION__: JSON.stringify(pkg.version),
  },
  resolve: {
    alias: {
      '@glass-cards/event-bus': resolve(__dirname, 'packages/event-bus/src'),
      '@glass-cards/base-card': resolve(__dirname, 'packages/base-card/src'),
      '@glass-cards/ui-core': resolve(__dirname, 'packages/ui-core/src'),
      '@glass-cards/i18n': resolve(__dirname, 'packages/i18n/src'),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'GlassCards',
      formats: ['iife'],
      fileName: () => 'glass-cards.js',
    },
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
      },
    },
    target: 'es2022',
    minify: 'terser',
    sourcemap: false,
    outDir: resolve(__dirname, 'dist'),
  },
}));
