require('dotenv').config({ path: '.env.local', quiet: true });
require('dotenv').config({ path: '.env', quiet: true });

const fs = require('fs');
const { spawnSync } = require('child_process');

const maxAttempts = Number(process.env.BUILD_RETRIES || '3');

function cleanNext() {
  try {
    fs.rmSync('.next', { recursive: true, force: true });
    console.log('[build:auto] Cleared .next');
  } catch {}
}

function runBuild() {
  const cmd = process.platform === 'win32' ? 'cmd.exe' : 'npx';
  const args = process.platform === 'win32' ? ['/c', 'npx', 'next', 'build'] : ['next', 'build'];
  return spawnSync(cmd, args, { stdio: 'inherit', env: process.env });
}

for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
  console.log(`[build:auto] Attempt ${attempt}/${maxAttempts}`);
  cleanNext();

  const result = runBuild();
  if (result.status === 0) {
    console.log('[build:auto] Build succeeded');
    process.exit(0);
  }

  if (attempt < maxAttempts) {
    console.warn('[build:auto] Build failed, retrying...');
  } else {
    console.error('[build:auto] Build failed after all retries');
    process.exit(result.status || 1);
  }
}
