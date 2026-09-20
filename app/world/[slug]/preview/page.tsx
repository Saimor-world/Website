import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import LuanaYoriPreview from '@/components/LuanaYoriPreview';
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
    title: `${world.clientName} · Deine World`,
    description: `Ein persönlicher erster Blick in die YORI World für ${world.clientName}.`,
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

  return <LuanaYoriPreview world={world} />;
}
