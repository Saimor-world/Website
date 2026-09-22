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

  const title = world ? `${world.clientName} · Deine World` : 'World Preview';
  const description = world
    ? `Ein persönlicher erster Blick in die YORI World für ${world.clientName}.`
    : 'Ein erster Blick in YORI.';

  // Override the root marketing metadata for shared preview links as well.
  // Preview deployments must not advertise the public site's canonical URL.
  return {
    title,
    description,
    robots: { index: false, follow: false, noarchive: true, nosnippet: true },
    alternates: { canonical: null, languages: {} },
    openGraph: {
      title,
      description,
      url: null,
      siteName: 'YORI · Saimôr',
      type: 'website',
      images: [],
    },
    twitter: {
      card: 'summary',
      title,
      description,
      images: [],
    },
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
