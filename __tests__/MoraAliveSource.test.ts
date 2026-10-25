import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

describe('MÔRA canonical distribution', () => {
  it('keeps the Website body and state vocabulary identical to the pinned OS source', () => {
    const manifest = JSON.parse(readFileSync('docs/mora-alive/SOURCE.json', 'utf8'));
    expect(manifest.canonicalRepository).toBe('Saimor-world/mora-ui');
    expect(manifest.sourceCommit).toMatch(/^[a-f0-9]{40}$/);
    for (const [file, expected] of Object.entries(manifest.files)) {
      const hash = createHash('sha256').update(readFileSync(file)).digest('hex');
      expect(hash, file).toBe(expected);
    }
  });
});
