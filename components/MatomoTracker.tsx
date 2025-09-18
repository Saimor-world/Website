'use client';
import { useEffect } from 'react';

export default function MatomoTracker() {
  useEffect(() => {
    // Initialize Matomo tracking with saimorworld.matomo.cloud
    (window as any)._paq = (window as any)._paq || [];
    const _paq = (window as any)._paq;

    // Privacy-focused tracker configuration
    _paq.push(['setDoNotTrack', true]);
    _paq.push(['disableCookies']);
    _paq.push(['anonymizeIp']);
    _paq.push(['enableLinkTracking']);

    // Tracker URL and site configuration
    const u = 'https://saimorworld.matomo.cloud/';
    _paq.push(['setTrackerUrl', u + 'matomo.php']);
    _paq.push(['setSiteId', '1']);

    // Create and append script
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = 'https://cdn.matomo.cloud/saimorworld.matomo.cloud/matomo.js';

    const firstScript = document.getElementsByTagName('script')[0];
    if (firstScript && firstScript.parentNode) {
      firstScript.parentNode.insertBefore(script, firstScript);
    } else {
      document.head.appendChild(script);
    }

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