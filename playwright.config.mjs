import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: 'tests',
  webServer: { command: 'npx vite preview --port 4173 --strictPort', url: 'http://localhost:4173', reuseExistingServer: true },
  // PW_CHANNEL=chrome uses the installed Chrome when Playwright's own browsers are not downloaded
  use: { baseURL: 'http://localhost:4173', channel: process.env.PW_CHANNEL },
});
