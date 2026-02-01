import { NextRequest } from 'next/server';

interface RateLimitEntry {
  count: number;
  resetTime: number;
  lastRequest: number;
}

interface RateLimitOptions {
  interval: number; // in milliseconds
  limit: number;
}

// In-memory storage (replace with Redis in production)
const rateLimitStore = new Map<string, RateLimitEntry>();

// Cleanup old entries every hour
setInterval(() => {
  const now = Date.now();
  Array.from(rateLimitStore.entries()).forEach(([key, entry]) => {
    if (now > entry.resetTime) {
      rateLimitStore.delete(key);
    }
  });
}, 60 * 60 * 1000);

export function rateLimit(options: RateLimitOptions) {
  return {
    check: async (request: NextRequest, identifier: string): Promise<{ success: boolean; limit: number; remaining: number; reset: Date }> => {
      const now = Date.now();
      const key = `${identifier}:${options.interval}`;

      let entry = rateLimitStore.get(key);

      if (!entry || now > entry.resetTime) {
        // Create new entry or reset expired entry
        entry = {
          count: 0,
          resetTime: now + options.interval,
          lastRequest: now
        };
      }

      entry.count++;
      entry.lastRequest = now;
      rateLimitStore.set(key, entry);

      const success = entry.count <= options.limit;
      const remaining = Math.max(0, options.limit - entry.count);
      const reset = new Date(entry.resetTime);

      return {
        success,
        limit: options.limit,
        remaining,
        reset
      };
    }
  };
}

// Get client IP address
export function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');

  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }

  if (realIP) {
    return realIP;
  }

  return 'unknown';
}

// Rate limiters for different scenarios
// Rate limiters for different scenarios
export const publicChatLimiter = rateLimit({
  interval: 60 * 1000,
  limit: parseInt(process.env.RATE_LIMIT_CHAT_PUBLIC || '5')
});

export const authChatLimiter = rateLimit({
  interval: 60 * 1000,
  limit: parseInt(process.env.RATE_LIMIT_CHAT_AUTH || '30')
});

export const globalLimiter = rateLimit({
  interval: 60 * 1000,
  limit: parseInt(process.env.RATE_LIMIT_GLOBAL || '100')
});

export const contactFormLimiter = rateLimit({
  interval: 60 * 60 * 1000, // 1 hour per submission
  limit: parseInt(process.env.RATE_LIMIT_CONTACT || '3')
});

export const waitlistLimiter = rateLimit({
  interval: 60 * 60 * 1000, // 1 hour per submission
  limit: parseInt(process.env.RATE_LIMIT_WAITLIST || '3')
});