'use client';
import { useEffect } from 'react';

export default function MatomoTracker() {
  useEffect(() => {
    // Initialize Matomo tracking with saimorworld.matomo.cloud
    (window as any)._paq = (window as any)._paq || [];
    const _paq = (window as any)._paq;

    // Tracker configuration
    _paq.push(['trackPageView']);
    _paq.push(['enableLinkTracking']);
    _paq.push(['setTrackerUrl', 'https://saimorworld.matomo.cloud/matomo.php']);
    _paq.push(['setSiteId', '1']);

    // Create and append script
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = 'https://cdn.matomo.cloud/saimorworld.matomo.cloud/matomo.js';
    document.head.appendChild(script);

    // Cleanup function
    return () => {
      // Remove script on component unmount
      const existingScript = document.querySelector('script[src="https://cdn.matomo.cloud/saimorworld.matomo.cloud/matomo.js"]');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return null; // This component doesn't render anything
}