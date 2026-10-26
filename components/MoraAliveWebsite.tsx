'use client';
import { useSiteLiteMode } from '@/lib/use-site-lite-mode';
import MoraAliveView from '@/components/mora/alive/MoraAliveView';

/** Same canonical renderer as the OS; public presentation has no CORE/auth adapter. */
export default function MoraAliveWebsite() {
  const motionLimited = useSiteLiteMode();
  return <div className="pt-20"><MoraAliveView motionLimited={motionLimited} actual={{ state: 'idle', source: 'preview' }} /></div>;
}
