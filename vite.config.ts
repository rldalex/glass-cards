import { defineConfig } from 'vite';
import { resolve } from 'node:path';

export default defineConfig(({ command }) => ({
  root: command === 'serve' ? 'dev' : undefined,
  resolve: {
    alias: {
      '@glass-cards/event-bus': resolve(__dirname, 'packages/event-bus/src'),
      '@glass-cards/base-card': resolve(__dirname, 'packages/base-card/src'),
      '@glass-cards/ui-core': resolve(__dirname, 'packages/ui-core/src'),
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
