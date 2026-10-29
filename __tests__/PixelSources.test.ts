import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const manifest = JSON.parse(readFileSync(join(process.cwd(), 'docs/mora-pixel/SOURCE.json'), 'utf8')) as {
  canonicalRepository: string; sourceCommit: string; files: Record<string, string>;
};

describe('Pixel MÔRA and the pixel painter stay identical to mora-ui', () => {
  it('names mora-ui as the only source', () => {
    expect(manifest.canonicalRepository).toBe('Saimor-world/mora-ui');
    expect(manifest.sourceCommit).toMatch(/^[0-9a-f]{40}$/);
  });
  it('mirrors the final set with the default wardrobe, the captain hat and the OS painter', () => {
    expect(Object.keys(manifest.files)).toEqual(expect.arrayContaining([
      'lib/pixel/pixelArt.ts', 'public/mora/pixel/body.png', 'public/mora/pixel/eyes_l.png', 'public/mora/pixel/eyes_r.png',
      'public/mora/pixel/traits/neck-scarf.png', 'public/mora/pixel/traits/head-sprout.png',
      'public/mora/pixel/traits/clip-moon.png', 'public/mora/pixel/traits/head-captain.png',
    ]));
  });
  it.each(Object.entries(manifest.files))('%s is byte-identical', (file, sha256) => {
    // Only a Windows CRLF checkout of the .ts file is normalised; every other byte must match the source.
    const bytes = readFileSync(join(process.cwd(), file));
    const lf = file.endsWith('.ts') ? Buffer.from(bytes.toString('utf8').replace(/\r\n/g, '\n')) : bytes;
    expect(createHash('sha256').update(lf).digest('hex')).toBe(sha256);
  });
});
