import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function Page() {
  const host = (await headers()).get('host')?.toLowerCase() || '';
  if (host === 'owner.saimor.world' || host.startsWith('owner.saimor.world:')) {
    redirect('/owner/login');
  }
  redirect('/de');
  return null;
}
