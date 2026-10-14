import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import FinanceLiveClient from './FinanceLiveClient';

export const dynamic = 'force-dynamic';
export const metadata = {
  robots: { index: false, follow: false, noarchive: true },
  title: 'Saimôr Finance · Owner',
};

export default async function OwnerFinancePage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect('/owner/login?callbackUrl=/owner/finance');
  }
  if (session.user.role !== 'owner') {
    redirect('/owner/login?callbackUrl=/owner/finance');
  }

  const envReady = Boolean((process.env.FINANCE_TRADER_WALLET || '').trim());

  return <FinanceLiveClient envReady={envReady} />;
}
