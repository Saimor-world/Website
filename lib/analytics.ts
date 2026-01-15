/**
 * Unified Analytics Helper
 * Centralized tracking for all analytics services
 */

// Sentry Error Tracking (if available)
export const captureException = (error: Error, context?: Record<string, any>) => {
  if (typeof window !== 'undefined' && (window as any).Sentry) {
    (window as any).Sentry.captureException(error, { extra: context });
  }
  console.error('Error captured:', error, context);
};

export const captureMessage = (message: string, level: 'info' | 'warning' | 'error' = 'info') => {
  if (typeof window !== 'undefined' && (window as any).Sentry) {
    (window as any).Sentry.captureMessage(message, level);
  }
};

// Performance tracking
export const trackPerformance = (metricName: string, value: number) => {
  if (typeof window !== 'undefined' && (window as any).Sentry) {
    (window as any).Sentry.metrics.distribution(metricName, value);
  }
};

