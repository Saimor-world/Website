import createIntl from 'next-intl/middleware';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const intl = createIntl({
  locales: ['de', 'en'],
  defaultLocale: 'de',
  localePrefix: 'always',
});

export default function middleware(req: NextRequest) {
  const res = intl(req);
  // Security headers baseline
  res.headers.set('X-Frame-Options', 'DENY');
  res.headers.set('X-Content-Type-Options', 'nosniff');
  res.headers.set('Referrer-Policy', 'strict-origin');
  res.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  // Minimal CSP – ergänze bei Bedarf Cal.com/Matomo Domains
  res.headers.set(
    'Content-Security-Policy',
    [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data:",
      "font-src 'self' data:",
      "connect-src 'self'",
      "frame-ancestors 'none'",
      "base-uri 'self'",
    ].join('; ')
  );
  return res;
}

export const config = {
  matcher: ['/((?!_next|api|.*\\..*).*)'],
};

// CSP inkl. Cal.com
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self' data:",
  "connect-src 'self' https://cal.com https://api.cal.com",
  "frame-src https://cal.com https://embed.cal.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
].join("; ");
//res.headers.set("Content-Security-Policy", csp);
