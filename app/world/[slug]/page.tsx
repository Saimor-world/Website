import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import ClientWorldAccess from '@/components/ClientWorldAccess';
import ClientWorldPage from '@/components/ClientWorldPage';
import { getClientWorld } from '@/lib/client-world';
import { getPriorIdeaReactions } from '@/lib/client-world-interactions';
import { readWorldSession, worldCookieName } from '@/lib/client-world-session';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const world = getClientWorld(slug);
  const path = `/world/${slug}`;

  if (!world) {
    return {
      title: 'Private World',
      robots: { index: false, follow: false },
      alternates: { canonical: path },
      openGraph: { title: 'Private World', url: path, images: [] },
      twitter: { card: 'summary', title: 'Private World' },
    };
  }

  const title = `${world.clientName} × Saimôr`;
  const description = `Private Saimôr World für ${world.clientName}.`;

  // A private Client World must never carry the public marketing site's
  // canonical URL, OpenGraph title/image or Twitter card — noindex alone
  // does not stop those from being inherited from the root layout, and a
  // shared link preview must not surface "Saimôr OS" branding.
  return {
    title,
    description,
    robots: { index: false, follow: false, noarchive: true, nosnippet: true },
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: 'Saimôr',
      type: 'website',
      images: [],
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
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

  const priorReactions = await getPriorIdeaReactions(slug, session.sid);

  return <ClientWorldPage world={world} initialReactions={priorReactions} />;
}
