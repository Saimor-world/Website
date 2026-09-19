import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import {
  accessCodeMatches,
  createWorldSession,
  readWorldSession,
  worldCookieName,
} from '@/lib/client-world-session';

describe('client world session', () => {
  const originalSecret = process.env.NEXTAUTH_SECRET;

  beforeEach(() => {
    process.env.NEXTAUTH_SECRET = 'test-secret-for-client-world-session';
  });

  afterEach(() => {
    process.env.NEXTAUTH_SECRET = originalSecret;
  });

  it('creates and verifies a session only for the expected world', () => {
    const token = createWorldSession('luana');

    const session = readWorldSession(token, 'luana');
    expect(session?.slug).toBe('luana');
    expect(session?.sid).toBeTruthy();
    expect(session?.exp).toBeGreaterThan(Date.now());

    expect(readWorldSession(token, 'other')).toBeNull();
  });

  it('rejects a tampered token', () => {
    const token = createWorldSession('luana');
    const [payload, signature] = token.split('.');

    expect(readWorldSession(`${payload}x.${signature}`, 'luana')).toBeNull();
  });

  it('compares access codes without exposing the configured code', () => {
    expect(accessCodeMatches('LUANA-EXAMPLE-42', 'LUANA-EXAMPLE-42')).toBe(true);
    expect(accessCodeMatches('wrong', 'LUANA-EXAMPLE-42')).toBe(false);
  });

  it('normalizes the cookie name', () => {
    expect(worldCookieName('Luana Test!')).toBe('saimor_world_luanatest');
  });
});
