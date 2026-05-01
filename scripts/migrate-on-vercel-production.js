/* eslint-disable no-console */
const { spawnSync } = require('child_process');

const isVercelProduction = process.env.VERCEL === '1' && process.env.VERCEL_ENV === 'production';
const hasDatabaseUrl = Boolean(process.env.DATABASE_URL && process.env.DATABASE_URL.trim());

if (!isVercelProduction) {
  console.log('[migrate] skipped: not a Vercel production build');
  process.exit(0);
}

if (!hasDatabaseUrl) {
  console.warn('[migrate] skipped: DATABASE_URL is not available');
  process.exit(0);
}

console.log('[migrate] running prisma migrate deploy');
const command = process.platform === 'win32' ? 'npx.cmd' : 'npx';
const result = spawnSync(command, ['prisma', 'migrate', 'deploy'], {
  stdio: 'inherit',
  env: process.env,
});

if (result.status !== 0) {
  process.exit(result.status || 1);
}
