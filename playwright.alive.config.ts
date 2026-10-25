import { defineConfig, devices } from '@playwright/test';
export default defineConfig({
  testDir: './e2e', testMatch: 'mora-alive.spec.ts', timeout: 45000,
  expect: { timeout: 15000 }, workers: 1, retries: 0, reporter: 'list',
  outputDir: 'test-results/mora-alive',
  use: { baseURL: 'http://127.0.0.1:3001', screenshot: 'on', trace: 'retain-on-failure' },
  webServer: [{
    command: 'npx next start -p 3001 -H 127.0.0.1',
    url: 'http://127.0.0.1:3001/mora/alive', reuseExistingServer: false, timeout: 60000,
  }, {
    command: 'node scripts/qa-https-proxy.mjs',
    url: 'https://127.0.0.1:3443/mora/alive', reuseExistingServer: false, timeout: 60000,
  }],
  projects: [
    { name: 'desktop-chromium', use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 1000 } } },
    { name: 'iphone-chromium', use: { ...devices['iPhone 13'], defaultBrowserType: 'chromium' } },
    { name: 'iphone-webkit', use: { ...devices['iPhone 13'], baseURL: 'https://127.0.0.1:3443' } },
  ],
});
