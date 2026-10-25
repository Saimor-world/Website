'use client';
import MoraAliveView from '@/components/mora/alive/MoraAliveView';

/** Same canonical renderer as the OS; public presentation has no CORE/auth adapter. */
export default function MoraAliveWebsite() {
  return <MoraAliveView actual={{ state: 'idle', source: 'preview' }} />;
}
