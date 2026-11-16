import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: 'tests',
  webServer: { command: 'bun run preview --port 4173 --strictPort', url: 'http://localhost:4173', reuseExistingServer: true },
  use: { baseURL: 'http://localhost:4173' },
});
