import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

// Design law "Visuelles spricht, Text schweigt": no MÔRA self-talk or negative-definition copy.
const BANNED = [
  'Môra hört zu', 'MÔRA hört zu', 'Der Funke hört zu', 'The Spark is listening', 'Ich sammle gerade', 'Frag mich was',
  'Kein Chat.', 'Kein Befehlsmenü', 'Sprich einfach in den Raum', 'Ein offener Raum für Ideen',
  'kein Chatbot', 'Ein Moment zum Ankommen',
];
const ROOTS = ['app', 'components', 'lib', 'config'];
const SKIP = /(node_modules|\/api\/|\/admin\/|\/owner\/|\.test\.)/;

function files(dir: string): string[] {
  return readdirSync(dir).flatMap((n) => {
    const p = join(dir, n);
    if (SKIP.test(p)) return [];
    if (statSync(p).isDirectory()) return files(p);
    return /\.(tsx?|json)$/.test(n) ? [p] : [];
  });
}

describe('banned copy', () => {
  it('contains none of the banned phrases', () => {
    const hits: string[] = [];
    for (const f of ROOTS.flatMap(files)) {
      const lines = readFileSync(f, 'utf8').split('\n');
      lines.forEach((l, i) => {
        if (l.trim().startsWith('*') || l.trim().startsWith('//') || l.includes('{/*')) return;
        for (const b of BANNED) if (l.toLowerCase().includes(b.toLowerCase())) hits.push(`${f}:${i + 1} ${b}`);
      });
    }
    expect(hits).toEqual([]);
  });
});
