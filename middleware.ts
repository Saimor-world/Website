import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Enhanced Content Security Policy
  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.matomo.cloud https://saimorworld.matomo.cloud https://js.hcaptcha.com https://vercel.live blob:",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "img-src 'self' data: https: blob:",
    "font-src 'self' data: https://fonts.gstatic.com",
    "connect-src 'self' https://cal.com https://api.cal.com https://saimorworld.matomo.cloud https://vitals.vercel-insights.com https://api.saimor.world https://hcaptcha.com https://api.anthropic.com https://vercel.live wss://vercel.live https://*.sentry.io https://*.ingest.sentry.io https://*.ingest.de.sentry.io",
    "frame-src https://cal.com https://embed.cal.com https://newassets.hcaptcha.com",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "upgrade-insecure-requests",
    "block-all-mixed-content"
  ].join('; ');

  // Security Headers - Hardened
  response.headers.set('Content-Security-Policy', csp);
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), interest-cohort=()');

  // HSTS (HTTP Strict Transport Security) - only on HTTPS
  if (request.nextUrl.protocol === 'https:') {
    response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  }

  // XSS Protection (legacy but still useful)
  response.headers.set('X-XSS-Protection', '1; mode=block');

  // Cross-Origin Policies
  response.headers.set('Cross-Origin-Embedder-Policy', 'unsafe-none'); // Allow Cal.com embeds
  response.headers.set('Cross-Origin-Opener-Policy', 'same-origin-allow-popups'); // Allow Cal.com popups
  response.headers.set('Cross-Origin-Resource-Policy', 'cross-origin'); // Allow external resources

  // Performance: Preconnect hints
  response.headers.set('Link', [
    '<https://fonts.googleapis.com>; rel=preconnect; crossorigin',
    '<https://fonts.gstatic.com>; rel=preconnect; crossorigin',
    '<https://saimorworld.matomo.cloud>; rel=preconnect',
  ].join(', '));

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api routes
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)).*)',
  ],
};
