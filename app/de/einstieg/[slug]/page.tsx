import { notFound } from 'next/navigation';
import EntryArticle from '@/components/EntryArticle';
import ScanPage from '@/components/ScanPage';
import { entryContent } from '@/lib/entry-content';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const staticSlugs = entryContent.de.map((article) => ({ slug: article.slug }));
  const hasScan = staticSlugs.some((s) => s.slug === 'security-check');
  return hasScan ? staticSlugs : [...staticSlugs, { slug: 'security-check' }];
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const canonical = `/de/einstieg/${slug}`;

  if (slug === 'security-check') {
    const title = 'Security Check | Saimôr';
    const description = 'Prüfe deine Domain auf öffentlich sichtbare Sicherheits-Signale und starte damit deinen Saimôr-Demoraum.';
    return {
      title,
      description,
      alternates: { canonical },
      openGraph: { title, description, url: canonical },
      twitter: { card: 'summary_large_image' as const, title, description, images: ['/og'] },
    };
  }

  const article = entryContent.de.find((item) => item.slug === slug);
  const title = article ? `${article.title} | Saimôr Einstieg` : 'Artikel nicht gefunden | Saimôr';
  const description = article?.excerpt ?? 'Artikel aus dem Saimôr Einstieg';
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical },
  };
}

export default async function EntryArticlePageDe({ params }: Props) {
  const { slug } = await params;

  if (slug === 'security-check') {
    return <ScanPage locale="de" />;
  }

  const article = entryContent.de.find((item) => item.slug === slug);
  if (!article) notFound();

  return <EntryArticle locale="de" slug={slug} />;
}
