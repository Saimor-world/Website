const { execSync } = require('child_process');

const rawPort = process.argv[2] || '3001';
const port = Number(rawPort);

if (!Number.isInteger(port) || port <= 0) {
  console.error(`[kill-port] Invalid port: ${rawPort}`);
  process.exit(1);
}

function killWindows(targetPort) {
  const output = execSync('netstat -ano -p tcp', { encoding: 'utf8' });
  const lines = output.split(/\r?\n/);
  const pids = new Set();

  for (const line of lines) {
    if (!line.includes('LISTENING')) continue;
    if (!line.includes(`:${targetPort}`)) continue;
    const parts = line.trim().split(/\s+/);
    const pid = parts[parts.length - 1];
    if (pid && /^\d+$/.test(pid)) {
      pids.add(pid);
    }
  }

  for (const pid of pids) {
    try {
      execSync(`taskkill /PID ${pid} /F`, { stdio: 'ignore' });
      console.log(`[kill-port] Killed PID ${pid} on port ${targetPort}`);
    } catch (err) {
      console.warn(`[kill-port] Could not kill PID ${pid}: ${err.message}`);
    }
  }
}

function killUnix(targetPort) {
  try {
    const output = execSync(`lsof -ti tcp:${targetPort}`, { encoding: 'utf8' });
    const pids = output
      .split(/\r?\n/)
      .map((v) => v.trim())
      .filter(Boolean);
    for (const pid of pids) {
      try {
        process.kill(Number(pid), 'SIGKILL');
        console.log(`[kill-port] Killed PID ${pid} on port ${targetPort}`);
      } catch (err) {
        console.warn(`[kill-port] Could not kill PID ${pid}: ${err.message}`);
      }
    }
  } catch {
    // no process found or lsof unavailable
  }
}

try {
  if (process.platform === 'win32') {
    killWindows(port);
  } else {
    killUnix(port);
  }
} catch (err) {
  console.warn(`[kill-port] Failed while checking port ${port}: ${err.message}`);
}
