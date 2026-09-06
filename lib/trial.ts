export const DEMO_DAYS = 30;

export function createTrialWindow(start = new Date()) {
  const trialStartedAt = new Date(start);
  const trialEndsAt = new Date(trialStartedAt.getTime() + DEMO_DAYS * 24 * 60 * 60 * 1000);
  return { trialStartedAt, trialEndsAt };
}

export function isTrialExpired(
  user: { role?: string | null; trialEndsAt?: Date | string | null },
  now = new Date(),
) {
  if (user.role !== 'trial' || !user.trialEndsAt) return false;
  return new Date(user.trialEndsAt) <= now;
}

export function isTrialActive(
  user: { role?: string | null; trialEndsAt?: Date | string | null },
  now = new Date(),
) {
  return user.role === 'trial' && !!user.trialEndsAt && !isTrialExpired(user, now);
}
