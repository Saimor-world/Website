// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;
const SENTRY_ENVIRONMENT = process.env.SENTRY_ENVIRONMENT || process.env.NODE_ENV || 'production';

Sentry.init({
  dsn: SENTRY_DSN,
  
  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: SENTRY_ENVIRONMENT === 'production' ? 0.1 : 1.0,
  
  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: SENTRY_ENVIRONMENT === 'development',
  
  // Filter out sensitive data
  beforeSend(event, hint) {
    // Don't send events in development unless explicitly enabled
    if (SENTRY_ENVIRONMENT === 'development' && !process.env.SENTRY_DEBUG) {
      return null;
    }

    // Don't send events without DSN
    if (!SENTRY_DSN) {
      return null;
    }

    // Filter out health check endpoints
    if (event.request?.url?.includes('/health') || event.request?.url?.includes('/api/health')) {
      return null;
    }

    return event;
  },

  // Environment
  environment: SENTRY_ENVIRONMENT,
  
  // Release tracking
  release: process.env.VERCEL_GIT_COMMIT_SHA || process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA || undefined,
  
  // Integrations
  integrations: [
    Sentry.nodeProfilingIntegration(),
  ],
  
  // Ignore certain errors
  ignoreErrors: [
    // Prisma connection errors (usually transient)
    'PrismaClientInitializationError',
    // Database connection errors
    'ECONNREFUSED',
    'ETIMEDOUT',
  ],
});

