import { describe, expect, it } from 'vitest';
import { localizedLegalHref } from '@/lib/legal-routes';

describe('localized legal routes', () => {
  it.each([
    ['/de/rechtliches/impressum', '/en/legal/imprint'],
    ['/de/rechtliches/datenschutz', '/en/legal/privacy'],
    ['/de/rechtliches/agb', '/en/legal/terms'],
    ['/de/rechtliches/widerruf', '/en/legal/refund'],
    ['/en/legal/imprint', '/de/rechtliches/impressum'],
    ['/en/legal/privacy', '/de/rechtliches/datenschutz'],
    ['/en/legal/terms', '/de/rechtliches/agb'],
    ['/en/legal/refund', '/de/rechtliches/widerruf'],
  ])('maps %s to %s', (source, destination) => {
    expect(localizedLegalHref(source)).toBe(destination);
  });

  it('does not claim a mapping for unrelated routes', () => {
    expect(localizedLegalHref('/de/trust')).toBeUndefined();
  });
});
