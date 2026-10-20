import { describe, expect, it } from 'vitest';
import nextConfig from '../next.config.js';

describe('locale gap redirects', () => {
  it('sends German-prefixed Earth to the live /earth route', async () => {
    const redirects = await nextConfig.redirects!();
    expect(redirects).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ source: '/de/earth', destination: '/earth', permanent: false }),
      ]),
    );
  });
});
