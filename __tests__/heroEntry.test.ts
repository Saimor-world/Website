import { describe, expect, it } from 'vitest';
import { heroContent, heroPrimaryHref } from '@/components/Hero';

describe('World hero entry contract', () => {
  it('sends German visitors into the real Quickscan instead of the showcase', () => {
    expect(heroPrimaryHref('de')).toBe('/de/einstieg/security-check');
    expect(heroContent.de.ctaPrimary).toBe('Kostenlosen Lagecheck starten');
    expect(heroContent.de.description).toContain('öffentlich sichtbare Signale');
    expect(heroContent.de.description).toContain('isolierten Arbeitskontext');
  });

  it('keeps the English entry on the matching localized flow', () => {
    expect(heroPrimaryHref('en')).toBe('/en/entry/security-check');
    expect(heroContent.en.ctaPrimary).toBe('Start the free situation check');
  });
});
