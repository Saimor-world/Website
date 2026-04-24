const warnedNamespaces = new Set<string>();

function missing(keys: string[]) {
  return keys.filter((key) => {
    const value = process.env[key];
    return !value || value.trim().length === 0;
  });
}

export function warnMissingEnv(namespace: string, keys: string[]) {
  if (warnedNamespaces.has(namespace)) return;
  warnedNamespaces.add(namespace);

  const missingKeys = missing(keys);
  if (missingKeys.length === 0) return;

  console.warn(
    `[preflight:${namespace}] Missing env vars: ${missingKeys.join(', ')}`
  );
}

export function authPreflight() {
  warnMissingEnv('auth', ['NEXTAUTH_SECRET']);
}

export function magicLinkPreflight() {
  warnMissingEnv('magic-link', ['NEXTAUTH_SECRET']);
}
