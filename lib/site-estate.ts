import estate from '@/config/site-estate.json';

export const SITE_ORIGIN = estate.siteOrigin;
export const YORI_WORKSPACE_ORIGIN = estate.yoriWorkspaceOrigin;
export const LEGACY_YORI_ORIGIN = estate.legacyYoriOrigin;
export const CANONICAL_ROUTES = Object.freeze(estate.canonicalRoutes);
export const LEGACY_PATH_REDIRECTS = Object.freeze(estate.legacyPathRedirects);

export function canonicalPathForRequest(pathname: string | null | undefined): string {
  const rawPath = (pathname || '/de').split(/[?#]/, 1)[0] || '/de';
  const prefixed = rawPath.startsWith('/') ? rawPath : `/${rawPath}`;
  const normalized = prefixed.replace(/\/{2,}/g, '/').replace(/\/+$/, '') || '/';

  if (normalized === '/') return '/de';

  return LEGACY_PATH_REDIRECTS[normalized as keyof typeof LEGACY_PATH_REDIRECTS] || normalized;
}

export function canonicalUrlForRequest(pathname: string | null | undefined): string {
  return new URL(canonicalPathForRequest(pathname), SITE_ORIGIN).toString();
}
