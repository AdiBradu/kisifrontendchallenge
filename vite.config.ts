/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/kisifrontendchallenge/',
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: ['./setupTest.ts'],
  },
});
