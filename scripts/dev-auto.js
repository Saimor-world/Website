require('dotenv').config({ path: '.env.local', quiet: true });
require('dotenv').config({ path: '.env', quiet: true });

const fs = require('fs');
const net = require('net');
const { execSync, spawn } = require('child_process');

const preferredPort = Number(process.env.PORT || '3001');
const maxPort = Number(process.env.MAX_DEV_PORT || '3010');
const shouldClean = process.argv.includes('--clean');

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isPortFree(port) {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.once('error', () => resolve(false));
    server.once('listening', () => {
      server.close(() => resolve(true));
    });
    server.listen(port, '0.0.0.0');
  });
}

function listListeningPidsWindows(port) {
  try {
    const output = execSync('netstat -ano -p tcp', { encoding: 'utf8' });
    const lines = output.split(/\r?\n/);
    const pids = new Set();
    for (const line of lines) {
      if (!line.includes('LISTENING')) continue;
      if (!line.includes(`:${port}`)) continue;
      const parts = line.trim().split(/\s+/);
      const pid = parts[parts.length - 1];
      if (/^\d+$/.test(pid)) pids.add(pid);
    }
    return [...pids];
  } catch {
    return [];
  }
}

function killPid(pid) {
  try {
    if (process.platform === 'win32') {
      execSync(`taskkill /PID ${pid} /F`, { stdio: 'ignore' });
    } else {
      process.kill(Number(pid), 'SIGKILL');
    }
    return true;
  } catch {
    return false;
  }
}

async function freePortOrFallback(port) {
  if (await isPortFree(port)) return port;

  if (process.platform === 'win32') {
    const pids = listListeningPidsWindows(port);
    for (const pid of pids) {
      const ok = killPid(pid);
      if (ok) {
        console.log(`[dev:auto] Killed PID ${pid} on port ${port}`);
      }
    }
    await sleep(300);
    if (await isPortFree(port)) return port;
  }

  for (let p = port + 1; p <= maxPort; p += 1) {
    if (await isPortFree(p)) return p;
  }
  return null;
}

async function main() {
  if (shouldClean) {
    try {
      fs.rmSync('.next', { recursive: true, force: true });
      console.log('[dev:auto] Cleared .next');
    } catch {}
  }

  const port = await freePortOrFallback(preferredPort);
  if (!port) {
    console.error(`[dev:auto] No free port found in range ${preferredPort}-${maxPort}`);
    process.exit(1);
  }

  if (port !== preferredPort) {
    console.warn(`[dev:auto] Port ${preferredPort} busy. Falling back to ${port}.`);
  } else {
    console.log(`[dev:auto] Starting on preferred port ${port}.`);
  }

  const bin = process.platform === 'win32' ? 'cmd.exe' : 'npx';
  const args =
    process.platform === 'win32'
      ? ['/c', 'npx', 'next', 'dev', '-p', String(port)]
      : ['next', 'dev', '-p', String(port)];

  const child = spawn(bin, args, {
    stdio: 'inherit',
    env: {
      ...process.env,
      PORT: String(port),
      NEXTAUTH_URL: process.env.NEXTAUTH_URL || `http://localhost:${port}`,
      NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || `http://localhost:${port}`,
    },
  });

  process.on('SIGINT', () => child.kill('SIGINT'));
  process.on('SIGTERM', () => child.kill('SIGTERM'));
  child.on('exit', (code) => process.exit(code ?? 0));
}

main().catch((error) => {
  console.error('[dev:auto] Failed:', error);
  process.exit(1);
});
