import { notFound } from 'next/navigation';
import EntryArticle from '@/components/EntryArticle';
import ScanPage from '@/components/ScanPage';
import { entryContent } from '@/lib/entry-content';
import { entryAlternates } from '@/lib/seo/alternates';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return entryContent.en.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  if (slug === 'security-check') return { alternates: entryAlternates('en', slug), title: 'Security Check – Saimôr', description: 'Inspect publicly available domain signals and explore the findings in an isolated workspace.' };
  const article = entryContent.en.find((item) => item.slug === slug);

  return {
    alternates: entryAlternates('en', slug),
    title: article ? `${article.title} – Saimôr` : 'Article not found – Saimôr',
    description: article?.excerpt ?? 'Article from Saimor entry layer',
  };
}

export default async function EntryArticlePageEn({ params }: Props) {
  const { slug } = await params;

  if (slug === 'security-check') return <ScanPage locale="en" />;
  const article = entryContent.en.find((item) => item.slug === slug);

  if (!article) {
    notFound();
  }

  return <EntryArticle locale="en" slug={slug} />;
}

