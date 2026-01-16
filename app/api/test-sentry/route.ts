import { NextResponse } from 'next/server';
import { captureException, captureMessage } from '@sentry/nextjs';

/**
 * Test endpoint for Sentry error tracking
 * Usage: GET /api/test-sentry?type=error|message
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type') || 'error';

  try {
    if (type === 'error') {
      // Test exception tracking
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
        },
      });

      return NextResponse.json({
        success: true,
        message: 'Test error sent to Sentry',
        type: 'exception',
        sentry: {
          dsn: process.env.SENTRY_DSN ? 'configured' : 'missing',
          environment: process.env.SENTRY_ENVIRONMENT || process.env.NODE_ENV,
        },
      });
    } else if (type === 'message') {
      // Test message tracking
      captureMessage('Sentry Test Message - This is intentional', {
        level: 'info',
        tags: {
          test: true,
          source: 'api-test-endpoint',
        },
        extra: {
          timestamp: new Date().toISOString(),
        },
      });

      return NextResponse.json({
        success: true,
        message: 'Test message sent to Sentry',
        type: 'message',
        sentry: {
          dsn: process.env.SENTRY_DSN ? 'configured' : 'missing',
          environment: process.env.SENTRY_ENVIRONMENT || process.env.NODE_ENV,
        },
      });
    } else {
      return NextResponse.json({
        success: false,
        error: 'Invalid type. Use ?type=error or ?type=message',
      }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Failed to send test to Sentry',
      details: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}

