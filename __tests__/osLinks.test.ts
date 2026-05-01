import { afterEach, describe, expect, it } from 'vitest';
import { buildOsAuditUrl, buildOsBlueprintUrl, buildOsSsoUrl, getOsBaseUrl } from '@/lib/os-links';

const originalEnv = { ...process.env };

afterEach(() => {
  process.env = { ...originalEnv };
});

describe('OS links', () => {
  it('defaults HQ links to the root so SSO can be processed', () => {
    delete process.env.OS_HOME_URL;
    delete process.env.NEXT_PUBLIC_OS_HOME_URL;

    expect(getOsBaseUrl()).toBe('https://hq.saimor.world');
  });

  it('adds website context to signed SSO URLs', () => {
    process.env.OS_HOME_URL = 'https://hq.saimor.world';
    process.env.SSO_SHARED_SECRET = 'test-secret';

    const url = new URL(
      buildOsSsoUrl('demo@saimor.io', {
        surface: 'website',
        entity: 'security-audit',
        id: 'audit-1',
      })
    );

    expect(url.origin).toBe('https://hq.saimor.world');
    expect(url.pathname).toBe('/');
    expect(url.searchParams.get('sso_token')).toBeTruthy();
    expect(url.searchParams.get('surface')).toBe('website');
    expect(url.searchParams.get('entity')).toBe('security-audit');
    expect(url.searchParams.get('id')).toBe('audit-1');
  });

  it('builds unauthenticated context links for audits and blueprints', () => {
    process.env.OS_HOME_URL = 'https://hq.saimor.world';

    const audit = new URL(buildOsAuditUrl('audit-1'));
    const blueprint = new URL(buildOsBlueprintUrl('blueprint-1'));

    expect(audit.searchParams.get('entity')).toBe('security-audit');
    expect(audit.searchParams.get('id')).toBe('audit-1');
    expect(blueprint.searchParams.get('entity')).toBe('digital-blueprint');
    expect(blueprint.searchParams.get('id')).toBe('blueprint-1');
  });

  it('adds optional audit preview context to HQ links', () => {
    process.env.OS_HOME_URL = 'https://hq.saimor.world';

    const audit = new URL(buildOsAuditUrl('audit-1', {
      company: 'Coffee Test',
      domain: 'coffee-test.de',
      score: '58',
      level: 'Mittel',
    }));

    expect(audit.searchParams.get('company')).toBe('Coffee Test');
    expect(audit.searchParams.get('domain')).toBe('coffee-test.de');
    expect(audit.searchParams.get('score')).toBe('58');
    expect(audit.searchParams.get('level')).toBe('Mittel');
  });
});
