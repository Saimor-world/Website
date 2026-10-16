import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    exclude: ['e2e/**', 'node_modules/**', '.next/**'],
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts',
    css: true
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.')
    }
  }
});
