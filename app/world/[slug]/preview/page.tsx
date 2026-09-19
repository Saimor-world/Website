import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ClientWorldPage from '@/components/ClientWorldPage';
import { getClientWorld } from '@/lib/client-world';

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
      title: 'World Preview',
      robots: { index: false, follow: false },
    };
  }

  return {
    title: `${world.clientName} · World Preview`,
    description: `Offene Design-Preview der Saimôr World für ${world.clientName}.`,
    robots: { index: false, follow: false, noarchive: true, nosnippet: true },
  };
}

export default async function OpenWorldPreview({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  if (process.env.VERCEL_ENV === 'production') notFound();

  const { slug } = await params;
  const world = getClientWorld(slug);
  if (!world) notFound();

  return <ClientWorldPage world={world} openPreview />;
}
