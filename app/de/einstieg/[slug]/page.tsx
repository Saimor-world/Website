import { notFound } from 'next/navigation';
import EntryArticle from '@/components/EntryArticle';
import ScanPage from '@/components/ScanPage';
import { entryContent } from '@/lib/entry-content';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const staticSlugs = entryContent.de.map((article) => ({ slug: article.slug }));
  // security-check is dynamic (client-side), include it so the route is known
  const hasScan = staticSlugs.some((s) => s.slug === 'security-check');
  return hasScan ? staticSlugs : [...staticSlugs, { slug: 'security-check' }];
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  if (slug === 'security-check') {
    return {
      title: 'Gratis Sicherheits-Audit | Saimor',
      description:
        'Was sieht man über dein Unternehmen von außen? Kostenloser Domain-Audit in Sekunden.',
    };
  }
  const article = entryContent.de.find((item) => item.slug === slug);
  return {
    title: article ? `${article.title} | Saimor Einstieg` : 'Artikel nicht gefunden | Saimor',
    description: article?.excerpt ?? 'Artikel aus dem Saimor Einstieg',
  };
}

export default async function EntryArticlePageDe({ params }: Props) {
  const { slug } = await params;

  if (slug === 'security-check') {
    return <ScanPage locale="de" />;
  }

  const article = entryContent.de.find((item) => item.slug === slug);
  if (!article) {
    notFound();
  }

  return <EntryArticle locale="de" slug={slug} />;
}

