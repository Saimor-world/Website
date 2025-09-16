'use client';
import { useEffect } from 'react';

export default function MatomoTracker() {
  useEffect(() => {
    // Only load Matomo if environment variables are set
    const matomoUrl = process.env.NEXT_PUBLIC_MATOMO_URL;
    const siteId = process.env.NEXT_PUBLIC_MATOMO_SITE_ID;

    if (!matomoUrl || !siteId) {
      console.log('Matomo not configured - tracking disabled');
      return;
    }

    // Initialize Matomo tracking
    (window as any)._paq = (window as any)._paq || [];
    const _paq = (window as any)._paq;

    // Tracker configuration for privacy compliance
    _paq.push(['trackPageView']);
    _paq.push(['enableLinkTracking']);
    _paq.push(['setTrackerUrl', matomoUrl + 'matomo.php']);
    _paq.push(['setSiteId', siteId]);

    // Create and append script
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = matomoUrl + 'matomo.js';
    document.head.appendChild(script);

    // Cleanup function
    return () => {
      // Remove script on component unmount
      const existingScript = document.querySelector(`script[src="${matomoUrl}matomo.js"]`);
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return null; // This component doesn't render anything
}