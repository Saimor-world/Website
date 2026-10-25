'use client';
import MoraAliveView from '@/components/mora/alive/MoraAliveView';

/** Same canonical renderer as the OS; public presentation has no CORE/auth adapter. */
export default function MoraAliveWebsite() {
  return <div className="pt-20"><MoraAliveView actual={{ state: 'idle', source: 'preview' }} /></div>;
}
