import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import LuanaYoriPreview from '@/components/LuanaYoriPreview';
import { getClientWorld } from '@/lib/client-world';
import { getPriorPreviewDecision } from '@/lib/client-world-interactions';
import { readWorldSession, worldPreviewCookieName } from '@/lib/client-world-session';

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

  const cookieStore = await cookies();
  const token = cookieStore.get(worldPreviewCookieName(slug))?.value;
  const session = readWorldSession(token, slug);
  const priorDecision = session ? await getPriorPreviewDecision(slug, session.sid) : null;

  return <LuanaYoriPreview world={world} initialDecision={priorDecision} />;
}
