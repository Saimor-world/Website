'use client';
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

/** Consent-first page views and active-time heartbeats, without personal identifiers. */
export default function MatomoTracker() {
  const pathname = usePathname();
  const initialized = useRef(false);
  const lastPage = useRef('');
  useEffect(() => {
    const sync = () => {
      let allowed = false;
      try { allowed = localStorage.getItem('analytics_enabled') === 'true'; } catch { return; }
      if (navigator.doNotTrack === '1') allowed = false;
      if (!allowed) {
        if (initialized.current) {
          window._paq?.push(['forgetConsentGiven'], ['disableHeartBeatTimer']);
          lastPage.current = '';
        }
        return;
      }
      if (!initialized.current) {
        const endpoint = process.env.NEXT_PUBLIC_MATOMO_URL;
        const siteId = process.env.NEXT_PUBLIC_MATOMO_SITE_ID;
        if (!endpoint || !siteId) return;
        let url: URL;
        try { url = new URL(endpoint); } catch { return; }
        if (url.protocol !== 'https:') return;
        const base = url.href.replace(/\/?$/, '/');
        window._paq = window._paq || [];
        window._paq.push(['requireConsent'], ['disableCookies'], ['setDoNotTrack', true],
          ['setTrackerUrl', base + 'matomo.php'], ['setSiteId', siteId],
          ['setRequestMethod', 'POST']);
        if (!document.querySelector('script[data-saimor-analytics]')) {
          const script = document.createElement('script');
          script.async = true; script.src = base + 'matomo.js'; script.dataset.saimorAnalytics = 'true';
          document.head.appendChild(script);
        }
        initialized.current = true;
      }
      window._paq?.push(['setConsentGiven'], ['enableHeartBeatTimer', 15]);
      const phase = ['#mora', '#clarity'].includes(location.hash) ? location.hash : '';
      const page = location.origin + pathname + phase;
      if (lastPage.current === page) return;
      window._paq?.push(['setCustomUrl', page], ['setReferrerUrl', ''],
        ['setDocumentTitle', pathname + phase], ['trackPageView']);
      lastPage.current = page;
    };
    sync();
    window.addEventListener('saimor-consent-change', sync);
    window.addEventListener('storage', sync);
    window.addEventListener('hashchange', sync);
    window.addEventListener('popstate', sync);
    return () => {
      window.removeEventListener('saimor-consent-change', sync);
      window.removeEventListener('storage', sync);
      window.removeEventListener('hashchange', sync);
      window.removeEventListener('popstate', sync);
    };
  }, [pathname]);
  return null;
}
