import { notFound } from 'next/navigation';
import EntryArticle from '@/components/EntryArticle';
import { entryContent } from '@/lib/entry-content';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return entryContent.en.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const article = entryContent.en.find((item) => item.slug === slug);
  const canonical = `/en/entry/${slug}`;
  const title = article ? `${article.title} | Saimôr Entry` : 'Article not found | Saimôr';
  const description = article?.excerpt ?? 'Article from the Saimôr entry layer';

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical, locale: 'en-US' },
    twitter: { card: 'summary_large_image' as const, title, description, images: ['/og'] },
  };
}

export default async function EntryArticlePageEn({ params }: Props) {
  const { slug } = await params;
  const article = entryContent.en.find((item) => item.slug === slug);

  if (!article) notFound();

  return <EntryArticle locale="en" slug={slug} />;
}
