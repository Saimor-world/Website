import { defineConfig, devices } from '@playwright/test';
import path from 'node:path';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  workers: process.env.CI ? 3 : 1,
  timeout: 60000,
  expect: { timeout: 10000 },
  retries: 0,
  maxFailures: 10,
  reporter: [['list'], ['json', { outputFile: '.qa/browser-results.json' }]],
  outputDir: 'test-results',
  use: {
    baseURL: process.env.QA_BASE_URL || 'http://127.0.0.1:3001',
    serviceWorkers: 'block',
    screenshot: 'only-on-failure',
    video: 'off',
    trace: 'retain-on-failure',
  },
  projects: [
    { name: 'chromium-1440', use: { browserName: 'chromium', viewport: { width: 1440, height: 960 } } },
    ...[375, 390, 430].map(width => ({ name: `chromium-${width}`, use: { browserName: 'chromium' as const, viewport: { width, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 } })),
    { name: 'webkit-390', use: { ...devices['iPhone 13'], browserName: 'webkit' } },
  ],
  webServer: process.env.QA_BASE_URL ? undefined : [{
    command: 'npx next start -p 3001',
    url: 'http://127.0.0.1:3001/de',
    timeout: 90000,
    reuseExistingServer: !process.env.CI,
  }, {
    command: 'npx next start -p 3002',
    cwd: path.resolve(process.cwd(), '../website-v21'),
    url: 'http://127.0.0.1:3002/de',
    timeout: 90000,
    reuseExistingServer: !process.env.CI,
  }],
});
