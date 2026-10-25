import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
const manifest = JSON.parse(readFileSync('docs/mora-alive/SOURCE.json', 'utf8'));
for (const [file, expected] of Object.entries(manifest.files)) {
  const actual = createHash('sha256').update(readFileSync(file)).digest('hex');
  if (actual !== expected) throw new Error(`Canonical MÔRA source drift: ${file}`);
}
console.log(`MÔRA source verified: ${manifest.sourceCommit}`);
