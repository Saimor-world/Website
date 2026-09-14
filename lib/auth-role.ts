export function parseEmailList(value?: string) {
  return (value ?? '')
    .split(',')
    .map((v) => v.trim().toLowerCase())
    .filter(Boolean);
}

/**
 * The owner role comes only from OWNER_EMAILS - never from the database alone and
 * never from knowing the owner password. An address that was made owner earlier but
 * is not on the list loses it the next time it signs in.
 */
type RoleEnv = Record<string, string | undefined>;

export function roleForEmail(emailInput: string, storedRole?: string | null, env: RoleEnv = process.env) {
  const email = emailInput.trim().toLowerCase();
  if (email && parseEmailList(env.OWNER_EMAILS).includes(email)) return 'owner';
  if (storedRole && storedRole !== 'owner') return storedRole;
  return email && parseEmailList(env.PRO_EMAILS).includes(email) ? 'pro' : 'free';
}

/** An empty owner list allows nobody. */
export function ownerLoginAllowed(emailInput: string, env: RoleEnv = process.env) {
  const email = emailInput.trim().toLowerCase();
  return Boolean(email) && parseEmailList(env.OWNER_EMAILS).includes(email);
}
