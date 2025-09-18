'use client';
import { Suspense, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

function MatomoPageViewsComponent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const url = pathname + (searchParams?.toString() ? `?${searchParams}` : '');
    const _paq = (window as any)._paq || [];

    _paq.push(['setCustomUrl', url]);
    _paq.push(['setDocumentTitle', document.title]);
    _paq.push(['trackPageView']);
  }, [pathname, searchParams]);

  return null;
}

export default function MatomoPageViews() {
  return (
    <Suspense fallback={null}>
      <MatomoPageViewsComponent />
    </Suspense>
  );
}