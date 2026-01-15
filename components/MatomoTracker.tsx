'use client';
import { useEffect } from 'react';

export default function MatomoTracker() {
  useEffect(() => {
    // Only load if analytics consent is given
    const analyticsConsent = localStorage.getItem('cookie-consent-analytics');
    if (analyticsConsent !== 'true') {
      return; // Don't load Matomo if user hasn't consented
    }

    // Initialize Matomo tracking with saimorworld.matomo.cloud
    (window as any)._paq = (window as any)._paq || [];
    const _paq = (window as any)._paq;

    // Privacy-focused tracker configuration (DSGVO-compliant)
    _paq.push(['setDoNotTrack', true]);
    _paq.push(['disableCookies']);
    _paq.push(['anonymizeIp']);
    _paq.push(['enableLinkTracking']);
    _paq.push(['setRequestMethod', 'POST']); // More privacy-friendly
    _paq.push(['setCustomRequestProcessing', '1']); // Process requests server-side

    // Tracker URL and site configuration
    const u = process.env.NEXT_PUBLIC_MATOMO_URL || 'https://saimorworld.matomo.cloud/';
    const siteId = process.env.NEXT_PUBLIC_MATOMO_SITE_ID || '1';
    
    _paq.push(['setTrackerUrl', u + 'matomo.php']);
    _paq.push(['setSiteId', siteId]);

    // Enhanced privacy settings
    _paq.push(['setSecureCookie', true]); // HTTPS only
    _paq.push(['setVisitorId', null]); // Don't store visitor ID

    // Create and append script with error handling
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.defer = true; // Load after page parse
    script.src = u + 'matomo.js';
    script.setAttribute('data-matomo-ignore', 'true');

    // Handle script load errors gracefully (e.g., blocked by ad blockers)
    script.onerror = () => {
      console.debug('Matomo script blocked or failed to load');
      // Remove _paq to prevent errors
      delete (window as any)._paq;
    };

    script.onload = () => {
      // Track initial page view after script loads
      _paq.push(['trackPageView']);
    };

    const firstScript = document.getElementsByTagName('script')[0];
    if (firstScript?.parentNode) {
      firstScript.parentNode.insertBefore(script, firstScript);
    } else {
      document.head.appendChild(script);
    }

    // Listen for cookie consent changes
    const handleConsentChange = (e: StorageEvent) => {
      if (e.key === 'cookie-consent-analytics' && e.newValue === 'false') {
        // User revoked consent - stop tracking
        if ((window as any)._paq) {
          _paq.push(['optUserOut']); // Opt user out
        }
      }
    };

    window.addEventListener('storage', handleConsentChange);

    // Cleanup function
    return () => {
      window.removeEventListener('storage', handleConsentChange);
      // Don't remove script - it might be needed for other components
    };
  }, []);

  return null;
}
