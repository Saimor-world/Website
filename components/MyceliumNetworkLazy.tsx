'use client';

import dynamic from 'next/dynamic';

/**
 * Canvas mycelium background — keep it out of the landing first JS payload.
 */
const MyceliumNetwork = dynamic(() => import('@/components/MyceliumNetwork'), {
  ssr: false,
});

export default function MyceliumNetworkLazy() {
  return <MyceliumNetwork />;
}
