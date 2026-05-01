import { describe, expect, it } from 'vitest';
import { createWallVerificationToken, verifyWallVerificationToken } from '@/lib/wall-verification';

describe('wall verification tokens', () => {
  it('round-trips a consented wall intent', () => {
    const token = createWallVerificationToken({
      auditId: 'cmoktest00000000000000000',
      email: 'Lead@Example.com',
      name: 'Lead Person',
      company: 'Example GmbH',
      consentAt: '2026-04-30T08:00:00.000Z',
      followUpAnswers: [{ id: 'owner-note', answer: 'Bitte sichtbar machen.' }],
    });

    const payload = verifyWallVerificationToken(token);

    expect(payload.auditId).toBe('cmoktest00000000000000000');
    expect(payload.email).toBe('lead@example.com');
    expect(payload.company).toBe('Example GmbH');
    expect(payload.followUpAnswers[0].answer).toBe('Bitte sichtbar machen.');
  });

  it('rejects modified tokens', () => {
    const token = createWallVerificationToken({
      auditId: 'cmoktest00000000000000000',
      email: 'lead@example.com',
      name: 'Lead Person',
      company: null,
      consentAt: '2026-04-30T08:00:00.000Z',
      followUpAnswers: [],
    });

    expect(() => verifyWallVerificationToken(`${token}x`)).toThrow();
  });
});
