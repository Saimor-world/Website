import { buildHqUrl } from '@/components/ScanPage';
import { afterEach, describe, expect, it } from 'vitest';

describe('Security Check HQ handoff', () => {
  const previousOsUrl = process.env.NEXT_PUBLIC_OS_HOME_URL;

  afterEach(() => {
    process.env.NEXT_PUBLIC_OS_HOME_URL = previousOsUrl;
  });

  it('uses the private signed entry route instead of the public playground', () => {
    process.env.NEXT_PUBLIC_OS_HOME_URL = 'https://hq.saimor.world';

    const url = new URL(buildHqUrl({
      id: 'audit-123',
      companyName: 'Acme GmbH',
      email: 'owner@acme.test',
      target: 'acme.test',
      score: 61,
      entryToken: 'signed-context.token',
    }));

    expect(url.pathname).toBe('/entry');
    expect(url.searchParams.get('ct')).toBe('signed-context.token');
    expect(url.pathname).not.toBe('/playground');
    expect(url.searchParams.has('audit_session')).toBe(false);
  });
});
