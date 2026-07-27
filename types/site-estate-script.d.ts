declare module '@/scripts/verify-site-estate.mjs' {
  export const estate: {
    siteOrigin: string;
    yoriWorkspaceOrigin: string;
    legacyYoriOrigin: string;
    canonicalRoutes: string[];
    legacyPathRedirects: Record<string, string>;
  };

  export function canonicalHref(html: string): string | null;

  export function verifySiteEstate(options: {
    baseUrl: string;
    fetchImpl?: typeof fetch;
    checkLegacyHost?: boolean;
  }): Promise<{
    ok: boolean;
    checks: Array<{ kind: string; route: string; status: number; ok: boolean }>;
    failures: string[];
  }>;
}
