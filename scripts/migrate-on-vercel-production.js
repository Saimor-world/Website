/* eslint-disable no-console */
const { spawnSync } = require('child_process');

const isVercel = process.env.VERCEL === '1';
const isDatabaseDeployment =
  isVercel && (process.env.VERCEL_ENV === 'production' || process.env.VERCEL_ENV === 'preview');
const hasDatabaseUrl = Boolean(process.env.DATABASE_URL && process.env.DATABASE_URL.trim());

if (!isDatabaseDeployment) {
  console.log('[migrate] skipped: not a Vercel preview/production build');
  process.exit(0);
}

if (!hasDatabaseUrl) {
  console.warn('[migrate] skipped: DATABASE_URL is not available');
  process.exit(0);
}

// The Vercel + Neon integration provisions an isolated database branch for
// Preview deployments. Applying committed Prisma migrations here keeps the
// preview schema aligned with the code without touching production.
console.log(`[migrate] running prisma migrate deploy for ${process.env.VERCEL_ENV}`);
const command = process.platform === 'win32' ? 'npx.cmd' : 'npx';
const result = spawnSync(command, ['prisma', 'migrate', 'deploy'], {
  stdio: 'inherit',
  env: process.env,
});

if (result.status !== 0) {
  process.exit(result.status || 1);
}
