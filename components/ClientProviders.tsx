'use client';

import MatomoTracker from './MatomoTracker'
import MatomoPageViews from './MatomoPageViews'
import { SpeedInsights } from '@vercel/speed-insights/next'

export default function ClientProviders() {
  return (
    <>
      <MatomoTracker />
      <MatomoPageViews />
      <SpeedInsights />
    </>
  )
}