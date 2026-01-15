/**
 * Unified Analytics Helper
 * Centralized tracking for all analytics services
 */

import * as Sentry from '@sentry/nextjs';

// Sentry Error Tracking
export const captureException = (error: Error | unknown, context?: Record<string, any>) => {
  try {
    if (error instanceof Error) {
      Sentry.captureException(error, {
        extra: context,
        tags: {
          component: context?.component || 'unknown',
        },
      });
    } else {
      Sentry.captureException(new Error(String(error)), {
        extra: { originalError: error, ...context },
      });
    }
  } catch (e) {
    // Fallback if Sentry fails
    console.error('Error captured:', error, context);
  }
};

export const captureMessage = (message: string, level: 'info' | 'warning' | 'error' = 'info', context?: Record<string, any>) => {
  try {
    Sentry.captureMessage(message, {
      level: level as Sentry.SeverityLevel,
      extra: context,
    });
  } catch (e) {
    console[level === 'error' ? 'error' : level === 'warning' ? 'warn' : 'log'](message, context);
  }
};

// Performance tracking
export const trackPerformance = (metricName: string, value: number, tags?: Record<string, string>) => {
  try {
    Sentry.metrics.distribution(metricName, value, {
      tags,
      unit: 'millisecond',
    });
  } catch (e) {
    // Silently fail if Sentry not available
  }
};

// API Error Helper
export const captureApiError = (endpoint: string, error: Error | unknown, requestData?: Record<string, any>) => {
  captureException(error, {
    component: 'api',
    endpoint,
    requestData,
  });
};

