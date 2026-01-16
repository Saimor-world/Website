import { NextResponse } from 'next/server';
import { captureException, captureMessage } from '@sentry/nextjs';

/**
 * Short alias for test-sentry endpoint
 * Usage: GET /api/t?type=error|message
 */
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'message';

    const HARDCODED_DSN = "https://0287484514575ed20ba4b22bf03512fa@o4510719412273152.ingest.de.sentry.io/4510719418433616";

    const hasEnvDsn = !!process.env.SENTRY_DSN;
    const hasPublicEnvDsn = !!process.env.NEXT_PUBLIC_SENTRY_DSN;
    const isConfigured = hasEnvDsn || hasPublicEnvDsn || !!HARDCODED_DSN;

    try {
        if (type === 'error') {
            const testError = new Error('Sentry Test Error from /api/t');
            captureException(testError, {
                tags: { source: 'api-t-alias' },
                extra: {
                    hasEnvDsn,
                    hasPublicEnvDsn,
                    timestamp: new Date().toISOString()
                },
            });

            return NextResponse.json({
                success: true,
                message: 'Test error sent to Sentry',
                sentry: {
                    dsn: isConfigured ? 'configured' : 'missing',
                    dsnPublic: hasPublicEnvDsn ? 'configured' : 'missing (client might fail)',
                    debug: {
                        hasSentryDsn: hasEnvDsn,
                        hasPublicDsn: hasPublicEnvDsn,
                        usingFallback: !hasEnvDsn && !hasPublicEnvDsn,
                        environment: process.env.SENTRY_ENVIRONMENT || process.env.NODE_ENV
                    }
                },
            });
        }

        // Default to message
        captureMessage('Sentry Test Message from /api/t', {
            level: 'info',
            tags: { source: 'api-t-alias' },
        });

        return NextResponse.json({
            success: true,
            message: 'Test message sent to Sentry',
            sentry: {
                dsn: isConfigured ? 'configured' : 'missing',
                dsnPublic: hasPublicEnvDsn ? 'configured' : 'missing (client might fail)',
                debug: {
                    hasSentryDsn: hasEnvDsn,
                    hasPublicDsn: hasPublicEnvDsn,
                    usingFallback: !hasEnvDsn && !hasPublicEnvDsn,
                    environment: process.env.SENTRY_ENVIRONMENT || process.env.NODE_ENV
                }
            },
        });
    } catch (error) {
        return NextResponse.json({
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error',
        }, { status: 500 });
    }
}
