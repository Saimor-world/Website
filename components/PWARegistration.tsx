'use client';

import { useEffect } from 'react';

/**
 * Retire the old page-caching worker. It could keep stale landing pages alive
 * on iOS after a deploy and made a slow network request look like a frozen app.
 */
export default function PWARegistration() {
  useEffect(() => {
    if (!('serviceWorker' in navigator)) return;

    const retireWorker = async () => {
      const registrations = await navigator.serviceWorker.getRegistrations();
      await Promise.all(registrations.map(async (registration) => {
        try {
          await registration.update();
        } finally {
          await registration.unregister();
        }
      }));

      if ('caches' in window) {
        const cacheNames = await caches.keys();
        await Promise.all(
          cacheNames
            .filter((name) => name.startsWith('saimor-'))
            .map((name) => caches.delete(name)),
        );
      }
    };

    void retireWorker().catch(() => {
      // Cleanup is best-effort; the site must never fail because of it.
    });
  }, []);

  return null;
}
