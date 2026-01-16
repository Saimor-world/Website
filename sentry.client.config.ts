// This file configures the initialization of Sentry on the client.
// The config you add here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

const SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN;
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
      // In development, log that DSN is missing
      if (process.env.NODE_ENV === 'development') {
        console.debug('[Sentry] DSN not configured - events will not be sent');
      }
      return null;
    }

    return event;
  },

  // Privacy - Don't track user IPs
  beforeBreadcrumb(breadcrumb) {
    // Filter out sensitive breadcrumbs
    if (breadcrumb.category === 'console' && breadcrumb.level === 'log') {
      return null;
    }
    return breadcrumb;
  },

  // Environment
  environment: SENTRY_ENVIRONMENT,
  
  // Release tracking
  release: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA || undefined,
  
  // Integrations
  integrations: [
    Sentry.replayIntegration({
      // Only capture replays on errors
      maskAllText: true,
      blockAllMedia: true,
    }),
    Sentry.browserTracingIntegration(),
  ],
  
  // Ignore certain errors
  ignoreErrors: [
    // Browser extensions
    'top.GLOBALS',
    'originalCreateNotification',
    'canvas.contentDocument',
    'MyApp_RemoveAllHighlights',
    'atomicFindClose',
    'fb_xd_fragment',
    'bmi_SafeAddOnload',
    'EBCallBackMessageReceived',
    // Network errors that are usually user-side
    'NetworkError',
    'Failed to fetch',
    'Network request failed',
    'Load failed',
    // ResizeObserver (common and usually harmless)
    'ResizeObserver loop limit exceeded',
    'ResizeObserver loop completed with undelivered notifications',
  ],
});

