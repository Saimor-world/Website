import { NextResponse } from 'next/server';
import { captureException, captureMessage } from '@sentry/nextjs';

/**
 * Test endpoint for Sentry error tracking
 * Usage: GET /api/test-sentry?type=error|message
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type') || 'error';

  const hasEnvDsn = !!process.env.SENTRY_DSN;
  const hasPublicEnvDsn = !!process.env.NEXT_PUBLIC_SENTRY_DSN;
  // We consider it configured if either env var is present or if hardcoded fallback exists in config files
  const isConfigured = hasEnvDsn || hasPublicEnvDsn;

  try {
    if (type === 'error') {
      const testError = new Error('Sentry Test Error - This is intentional');
      testError.name = 'SentryTestError';
      captureException(testError, {
        tags: {
          test: true,
          source: 'api-test-endpoint',
        },
        extra: {
          timestamp: new Date().toISOString(),
          environment: process.env.NODE_ENV,
          hasEnvDsn,
          hasPublicEnvDsn
        },
      });

      return NextResponse.json({
        success: true,
        message: 'Test error sent to Sentry',
        type: 'exception',
        sentry: {
          dsn: isConfigured ? 'configured' : 'missing',
          dsnPublic: hasPublicEnvDsn ? 'configured' : 'missing',
          environment: process.env.SENTRY_ENVIRONMENT || process.env.NODE_ENV,
          nodeEnv: process.env.NODE_ENV,
          debug: {
            hasSentryDsn: hasEnvDsn,
            hasPublicDsn: hasPublicEnvDsn,
            sentryEnv: process.env.SENTRY_ENVIRONMENT,
            publicSentryEnv: process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT,
          },
        },
      });
    } else {
      captureMessage('Sentry Test Message - This is intentional', {
        level: 'info',
        tags: {
          test: true,
          source: 'api-test-endpoint',
        },
        extra: {
          timestamp: new Date().toISOString(),
          hasEnvDsn,
          hasPublicEnvDsn
        },
      });

      return NextResponse.json({
        success: true,
        message: 'Test message sent to Sentry',
        type: 'message',
        sentry: {
          dsn: isConfigured ? 'configured' : 'missing',
          dsnPublic: hasPublicEnvDsn ? 'configured' : 'missing',
          environment: process.env.SENTRY_ENVIRONMENT || process.env.NODE_ENV,
          nodeEnv: process.env.NODE_ENV,
          debug: {
            hasSentryDsn: hasEnvDsn,
            hasPublicDsn: hasPublicEnvDsn,
            sentryEnv: process.env.SENTRY_ENVIRONMENT,
            publicSentryEnv: process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT,
          },
        },
      });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Failed to send test to Sentry',
      details: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}
