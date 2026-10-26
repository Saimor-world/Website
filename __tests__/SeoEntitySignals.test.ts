import fs from 'fs';
import path from 'path';
import { describe, expect, it } from 'vitest';
import { entryAlternates, LOCALE_PAIRS, localeAlternates } from '@/lib/seo/alternates';
import { entryContent } from '@/lib/entry-content';

const root = path.resolve(__dirname, '..');
const read = (rel: string) => fs.readFileSync(path.join(root, rel), 'utf8');
const pageFile = (route: string) => path.join('app', route.slice(1), 'page.tsx');

describe('canonical und hreflang je Seite', () => {
  it('jede Seite ist ihr eigener Canonical und verweist auf ihr Sprachpaar', () => {
    for (const pair of LOCALE_PAIRS) {
      for (const route of [pair.de, pair.en]) {
        expect(localeAlternates(route)).toEqual({
          canonical: route,
          languages: { de: pair.de, en: pair.en, 'x-default': pair.de },
        });
      }
    }
  });

  it('jede gepaarte Seite setzt ihre Alternates selbst, mit ihrem eigenen Pfad', () => {
    for (const pair of LOCALE_PAIRS) {
      for (const route of [pair.de, pair.en]) {
        expect(read(pageFile(route))).toContain(`localeAlternates('${route}')`);
      }
    }
  });

  it('Layouts vererben keinen Canonical mehr an Unterseiten', () => {
    for (const layout of ['app/layout.tsx', 'app/de/layout.tsx', 'app/en/layout.tsx']) {
      expect(read(layout)).not.toMatch(/canonical\s*:\s*['"`]/);
      expect(read(layout)).not.toMatch(/alternates\s*:/);
    }
  });

  it('Einstiegsartikel sind in beiden Sprachen gepaart', () => {
    const de = entryContent.de.map((a) => a.slug).sort();
    expect(entryContent.en.map((a) => a.slug).sort()).toEqual(de);
    for (const slug of de) {
      expect(entryAlternates('de', slug)).toEqual({
        canonical: `/de/einstieg/${slug}`,
        languages: { de: `/de/einstieg/${slug}`, en: `/en/entry/${slug}`, 'x-default': `/de/einstieg/${slug}` },
      });
      expect(entryAlternates('en', slug).canonical).toBe(`/en/entry/${slug}`);
    }
  });

  it('unbekannte Pfade fallen auf, statt still falsch zu verlinken', () => {
    expect(() => localeAlternates('/de/gibt-es-nicht')).toThrow();
  });
});

describe('Organisation und Betreiber', () => {
  it('JSON-LD nennt SAIMÔR mit Betreiber Next Chapter', () => {
    const layout = read('app/layout.tsx');
    expect(layout).toContain("name: 'SAIMÔR'");
    expect(layout).toContain("legalName: 'Next Chapter'");
    expect(layout).toContain("logo: 'https://saimor.world/brand/saimor-sigil-restored-v1.webp'");
    expect(fs.existsSync(path.join(root, 'public/brand/saimor-sigil-restored-v1.webp'))).toBe(true);
  });

  it('„Next Chapter“ steht in Impressum DE/EN und Datenschutz DE in zwei Wörtern', () => {
    for (const rel of ['app/de/rechtliches/impressum/page.tsx', 'app/en/legal/imprint/page.tsx', 'app/de/rechtliches/datenschutz/page.tsx']) {
      const source = read(rel);
      expect(source).toContain('Next Chapter');
      expect(source).not.toContain('NextChapter');
    }
  });
});
