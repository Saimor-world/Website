import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

/** sha1 of the sprites as they ship in mora-ui a53c7a94 (cockpit preview, PR #201). */
const SPRITES: Record<string, string> = {
  'body.png': '9f87c1779b2d678f06e205a223acca5d2c3019a0',
  'light.png': '7f66f652de4a0813b9e304a4eea7453b7ea411e5',
  'face.png': '2adc4dd53824cde7b860f190f201d0d5058b277c',
  'eyes.png': '351d660b17799747c18c47e0dde3789274ececad',
  'eyes_closed.png': '1ac35aa6842ad954da4ef635031d9ca65c6d151f',
  'eyes_l.png': '0eadb47902331f64bfc282f2681d20038c8b4682',
  'eyes_r.png': '4be815cb9f1361f9e0aaf7cf68ea0a49c6aa0475',
  'traits/head-sprout.png': '3a6d80e016c389ee4bf9c5272fadf46ca2f4e1ef',
  'traits/neck-scarf.png': '75e1ab1efbbfd7e6314e1b67fbddf5662debabf4',
  'traits/clip-moon.png': 'dfa5c4fdff365c5635c40229b8bb85bfbd0a665d',
};

describe('Pixel MÔRA sprites', () => {
  it.each(Object.entries(SPRITES))('%s is byte-identical to mora-ui', (file, sha1) => {
    const bytes = readFileSync(join(process.cwd(), 'public/mora/pixel', file));
    expect(createHash('sha1').update(bytes).digest('hex')).toBe(sha1);
  });
});
