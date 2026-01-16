import { NextResponse } from 'next/server';

/**
 * Debug endpoint to check all Sentry-related environment variables
 * Usage: GET /api/debug-env
 */
export async function GET() {
  // Get all Sentry-related environment variables
  const sentryEnvVars = {
    // Server-side DSN
    SENTRY_DSN: process.env.SENTRY_DSN 
      ? `configured (${process.env.SENTRY_DSN.substring(0, 20)}...)` 
      : 'missing',
    
    // Client-side DSN
    NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN
      ? `configured (${process.env.NEXT_PUBLIC_SENTRY_DSN.substring(0, 20)}...)`
      : 'missing',
    
    // Environment variables
    SENTRY_ENVIRONMENT: process.env.SENTRY_ENVIRONMENT || 'not set',
    NEXT_PUBLIC_SENTRY_ENVIRONMENT: process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT || 'not set',
    
    // Node environment
    NODE_ENV: process.env.NODE_ENV || 'not set',
    
    // Vercel specific
    VERCEL: process.env.VERCEL || 'not set',
    VERCEL_ENV: process.env.VERCEL_ENV || 'not set',
    
    // Debug flags
    hasSentryDsn: !!process.env.SENTRY_DSN,
    hasPublicDsn: !!process.env.NEXT_PUBLIC_SENTRY_DSN,
    
    // Raw values (first 30 chars for security)
    sentryDsnPreview: process.env.SENTRY_DSN?.substring(0, 30) || 'not set',
    publicDsnPreview: process.env.NEXT_PUBLIC_SENTRY_DSN?.substring(0, 30) || 'not set',
  };

  return NextResponse.json({
    success: true,
    message: 'Environment variables debug info',
    environment: sentryEnvVars,
    allEnvKeys: Object.keys(process.env).filter(key => 
      key.includes('SENTRY') || key.includes('VERCEL')
    ),
  }, {
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate',
    },
  });
}

