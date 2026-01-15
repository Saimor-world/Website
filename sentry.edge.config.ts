// This file configures the initialization of Sentry for edge features (middleware, edge routes, etc.)
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;
const SENTRY_ENVIRONMENT = process.env.SENTRY_ENVIRONMENT || process.env.NODE_ENV || 'production';

Sentry.init({
  dsn: SENTRY_DSN,
  
  // Adjust this value in production
  tracesSampleRate: SENTRY_ENVIRONMENT === 'production' ? 0.1 : 1.0,
  
  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: SENTRY_ENVIRONMENT === 'development',
  
  // Filter out sensitive data
  beforeSend(event) {
    // Don't send events without DSN
    if (!SENTRY_DSN) {
      return null;
    }

    // Don't send events in development unless explicitly enabled
    if (SENTRY_ENVIRONMENT === 'development' && !process.env.SENTRY_DEBUG) {
      return null;
    }

    return event;
  },

  // Environment
  environment: SENTRY_ENVIRONMENT,
});

