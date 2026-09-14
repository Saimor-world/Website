import { describe, expect, it } from 'vitest';
import { ownerLoginAllowed, roleForEmail } from '@/lib/auth-role';

const env = { OWNER_EMAILS: 'Owner@Example.com, second-owner@example.com', PRO_EMAILS: 'pro@example.com' };

describe('roleForEmail', () => {
  it('grants owner only to listed addresses, case-insensitive', () => {
    expect(roleForEmail('owner@example.com', 'free', env)).toBe('owner');
    expect(roleForEmail(' OWNER@example.com ', null, env)).toBe('owner');
  });

  it('demotes a stored owner that is not on the list', () => {
    expect(roleForEmail('someone@example.com', 'owner', env)).toBe('free');
    expect(roleForEmail('pro@example.com', 'owner', env)).toBe('pro');
  });

  it('keeps other stored roles and falls back to pro or free', () => {
    expect(roleForEmail('someone@example.com', 'pro', env)).toBe('pro');
    expect(roleForEmail('pro@example.com', undefined, env)).toBe('pro');
    expect(roleForEmail('someone@example.com', undefined, env)).toBe('free');
  });

  it('never grants owner when the list is empty', () => {
    expect(roleForEmail('owner@example.com', 'owner', {})).toBe('free');
  });
});

describe('ownerLoginAllowed', () => {
  it('requires the address to be on a non-empty list', () => {
    expect(ownerLoginAllowed('second-owner@example.com', env)).toBe(true);
    expect(ownerLoginAllowed('someone@example.com', env)).toBe(false);
    expect(ownerLoginAllowed('owner@example.com', {})).toBe(false);
  });
});
