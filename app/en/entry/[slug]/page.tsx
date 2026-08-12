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

  return {
    title: article ? `${article.title} | Saimôr Entry` : 'Article not found | Saimôr',
    description: article?.excerpt ?? 'Article from Saimor entry layer',
  };
}

export default async function EntryArticlePageEn({ params }: Props) {
  const { slug } = await params;

const article = entryContent.en.find((item) => item.slug === slug);

  if (!article) {
    notFound();
  }

  return <EntryArticle locale="en" slug={slug} />;
}

