'use client';

import MatomoTracker from './MatomoTracker'
import MatomoPageViews from './MatomoPageViews'
import { SpeedInsights } from '@vercel/speed-insights/next'

export default function ClientProviders() {
  const enableSpeedInsights =
    process.env.NEXT_PUBLIC_ENABLE_SPEED_INSIGHTS === 'true' ||
    process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'

  return (
    <>
      <MatomoTracker />
      <MatomoPageViews />
      {enableSpeedInsights ? <SpeedInsights /> : null}
    </>
  )
}
