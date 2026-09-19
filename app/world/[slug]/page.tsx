import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import ClientWorldAccess from '@/components/ClientWorldAccess';
import ClientWorldPage from '@/components/ClientWorldPage';
import { getClientWorld } from '@/lib/client-world';
import { readWorldSession, worldCookieName } from '@/lib/client-world-session';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const world = getClientWorld(slug);

  if (!world) {
    return {
      title: 'Private World',
      robots: { index: false, follow: false },
    };
  }

  return {
    title: `${world.clientName} × Saimôr`,
    description: `Private Saimôr World für ${world.clientName}.`,
    robots: { index: false, follow: false, noarchive: true, nosnippet: true },
  };
}

export default async function WorldPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const world = getClientWorld(slug);
  if (!world) notFound();

  const cookieStore = await cookies();
  const token = cookieStore.get(worldCookieName(slug))?.value;
  const session = readWorldSession(token, slug);

  if (!session) {
    return <ClientWorldAccess slug={slug} clientName={world.clientName} />;
  }

  return <ClientWorldPage world={world} />;
}
