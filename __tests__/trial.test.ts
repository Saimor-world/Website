import { describe, expect, it } from 'vitest';
import { createTrialWindow, DEMO_DAYS, isTrialActive, isTrialExpired } from '@/lib/trial';

describe('trial lifecycle', () => {
  it('creates an exact 30-day trial window', () => {
    const start = new Date('2026-09-06T12:00:00.000Z');
    const { trialStartedAt, trialEndsAt } = createTrialWindow(start);

    expect(trialStartedAt.toISOString()).toBe(start.toISOString());
    expect(trialEndsAt.getTime() - trialStartedAt.getTime()).toBe(
      DEMO_DAYS * 24 * 60 * 60 * 1000,
    );
  });

  it('treats a trial as active before its end and expired at its end', () => {
    const trialEndsAt = new Date('2026-10-06T12:00:00.000Z');
    const user = { role: 'trial', trialEndsAt };

    expect(isTrialActive(user, new Date('2026-10-06T11:59:59.999Z'))).toBe(true);
    expect(isTrialExpired(user, new Date('2026-10-06T11:59:59.999Z'))).toBe(false);

    expect(isTrialActive(user, new Date('2026-10-06T12:00:00.000Z'))).toBe(false);
    expect(isTrialExpired(user, new Date('2026-10-06T12:00:00.000Z'))).toBe(true);
  });

  it('does not apply expiry rules to non-trial users', () => {
    const past = new Date('2020-01-01T00:00:00.000Z');
    expect(isTrialExpired({ role: 'owner', trialEndsAt: past }, new Date())).toBe(false);
    expect(isTrialActive({ role: 'owner', trialEndsAt: past }, new Date())).toBe(false);
  });
});
