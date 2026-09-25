import { afterEach, describe, expect, it, vi } from 'vitest';
import { yoriOrigin } from '../lib/product-origins';

afterEach(() => vi.unstubAllEnvs());

describe('YORI product origin', () => {
  it('defaults to the verified production origin until domain cutover', () => {
    vi.stubEnv('NEXT_PUBLIC_YORI_ORIGIN', '');
    expect(yoriOrigin()).toBe('https://frnt.saimor.world');
  });

  it('accepts a configured HTTPS origin', () => {
    expect(yoriOrigin('https://preview.example/')).toBe('https://preview.example');
  });

  it.each([
    'javascript:alert(1)',
    'https://user:secret@example.com',
    'https://example.com/path',
    'https://example.com?x=1',
    'https://example.com#fragment',
    '//example.com',
  ])('rejects unsafe/non-origin input %s', (value) => {
    expect(() => yoriOrigin(value)).toThrow();
  });

  it('rejects HTTP in production', () => {
    vi.stubEnv('NODE_ENV', 'production');
    expect(() => yoriOrigin('http://localhost:3000')).toThrow();
  });

  it('allows local HTTP in development', () => {
    vi.stubEnv('NODE_ENV', 'development');
    expect(yoriOrigin('http://localhost:3000/')).toBe('http://localhost:3000');
    expect(() => yoriOrigin('http://remote.example')).toThrow();
  });
});
