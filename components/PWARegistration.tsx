'use client';

import { useEffect } from 'react';
import { registerServiceWorker } from '@/lib/pwa';

/**
 * PWA Service Worker Registration Component
 * Registers the service worker for offline support
 */
export default function PWARegistration() {
  useEffect(() => {
    // Only register in production and if service workers are supported
    if (process.env.NODE_ENV === 'production') {
      registerServiceWorker();
    }
  }, []);

  return null;
}

