import { notFound, redirect } from 'next/navigation';
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
    title: article ? `${article.title} | Saimor Entry` : 'Article not found | Saimor',
    description: article?.excerpt ?? 'Article from Saimor entry layer',
  };
}

export default async function EntryArticlePageEn({ params }: Props) {
  const { slug } = await params;

  if (slug === 'security-check') {
    redirect('/de/einstieg/security-check');
  }

  const article = entryContent.en.find((item) => item.slug === slug);

  if (!article) {
    notFound();
  }

  return <EntryArticle locale="en" slug={slug} />;
}

