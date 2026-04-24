import { describe, expect, it } from 'vitest';
import { isSafeInternalPath, safeInternalPath } from '@/lib/safe-redirect';

describe('safe redirects', () => {
  it('allows normal internal paths', () => {
    expect(isSafeInternalPath('/account/bridge')).toBe(true);
    expect(isSafeInternalPath('/account/bridge?claimType=audit&claimId=abc')).toBe(true);
  });

  it('rejects external and protocol-relative redirects', () => {
    expect(isSafeInternalPath('https://evil.example')).toBe(false);
    expect(isSafeInternalPath('//evil.example/path')).toBe(false);
    expect(isSafeInternalPath('/\\evil')).toBe(false);
  });

  it('falls back when the target is unsafe', () => {
    expect(safeInternalPath('//evil.example', '/account/bridge')).toBe('/account/bridge');
  });
});
