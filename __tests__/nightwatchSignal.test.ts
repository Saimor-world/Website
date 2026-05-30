import { describe, expect, it, vi } from 'vitest';
import { emitNightwatchSignal, nightwatchSignalId, redactedHqUrl } from '@/lib/nightwatch-signal';

describe('nightwatch signal bridge', () => {
  it('skips delivery when endpoint or secret is missing', async () => {
    const fetchImpl = vi.fn();

    const result = await emitNightwatchSignal(
      { event: 'security_scan_completed', auditId: 'audit-1' },
      { endpoint: '', secret: '', fetchImpl: fetchImpl as any }
    );

    expect(result).toEqual({ sent: false, reason: 'not_configured' });
    expect(fetchImpl).not.toHaveBeenCalled();
  });

  it('sends signed Nightwatch customer signals', async () => {
    const fetchImpl = vi.fn().mockResolvedValue({ ok: true, status: 200 });

    const result = await emitNightwatchSignal(
      { event: 'hq_link_sent', auditId: 'audit-1', email: 'lead@example.com' },
      { endpoint: 'https://dash.saimor.world/api/nightwatch/signals', secret: 'secret', fetchImpl: fetchImpl as any }
    );

    expect(result).toEqual({ sent: true, status: 200 });
    expect(fetchImpl).toHaveBeenCalledWith(
      'https://dash.saimor.world/api/nightwatch/signals',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          authorization: 'Bearer secret',
          'x-nightwatch-secret': 'secret',
        }),
      })
    );
    expect(JSON.parse(fetchImpl.mock.calls[0][1].body)).toMatchObject({
      event: 'hq_link_sent',
      auditId: 'audit-1',
      source: 'world',
    });
  });

  it('redacts entry tokens from HQ URLs before they enter dashboard memory', () => {
    const url = redactedHqUrl('https://hq.saimor.world/entry?company=Acme&token=secret&entry_token=also-secret');

    expect(url).toBe('https://hq.saimor.world/entry?company=Acme');
  });

  it('builds stable signal ids', () => {
    expect(nightwatchSignalId(null, 'Lead@Example.com', 'Example.com')).toBe('lead-example-com:example-com');
    expect(nightwatchSignalId('Audit_123', 'Lead@Example.com', 'Example.com')).toBe('audit_123');
  });
});
