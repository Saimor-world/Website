// This file configures the initialization of Sentry on the client.
// The config you add here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

// Priority: Env Var > Hardcoded Fallback
const SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN || "https://0287484514575ed20ba4b22bf03512fa@o4510719412273152.ingest.de.sentry.io/4510719418433616";
const SENTRY_ENVIRONMENT = process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT || process.env.NODE_ENV;

Sentry.init({
  dsn: SENTRY_DSN,

  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: SENTRY_ENVIRONMENT === 'production' ? 0.1 : 1.0,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: SENTRY_ENVIRONMENT === 'development',

  // Enable session replay - only in production with low sample rate
  replaysOnErrorSampleRate: SENTRY_ENVIRONMENT === 'production' ? 0.1 : 1.0,
  replaysSessionSampleRate: 0,

  // Filter out sensitive data
  beforeSend(event, hint) {
    // Don't send events in development unless explicitly enabled
    if (SENTRY_ENVIRONMENT === 'development' && !process.env.NEXT_PUBLIC_SENTRY_DEBUG) {
      return null;
    }

    // Filter out browser extension errors
    if (event.exception) {
      const error = hint.originalException;
      if (error instanceof Error) {
        // Filter common browser extension errors
        if (
          error.message.includes('chrome-extension://') ||
          error.message.includes('moz-extension://') ||
          error.message.includes('safari-extension://')
        ) {
          return null;
        }
      }
    }

    // Don't send events without DSN
    if (!SENTRY_DSN) {
      return null;
    }

    return event;
  },

  // Environment
  environment: SENTRY_ENVIRONMENT,

  // Release tracking
  release: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA || undefined,

  // Integrations
  integrations: [
    Sentry.replayIntegration({
      maskAllText: true,
      blockAllMedia: true,
    }),
    Sentry.browserTracingIntegration(),
  ],

  // Ignore certain errors
  ignoreErrors: [
    'top.GLOBALS',
    'originalCreateNotification',
    'canvas.contentDocument',
    'MyApp_RemoveAllHighlights',
    'atomicFindClose',
    'fb_xd_fragment',
    'bmi_SafeAddOnload',
    'EBCallBackMessageReceived',
    'NetworkError',
    'Failed to fetch',
    'Network request failed',
    'Load failed',
    'ResizeObserver loop limit exceeded',
    'ResizeObserver loop completed with undelivered notifications',
  ],
});
