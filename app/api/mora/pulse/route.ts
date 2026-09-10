import { NextResponse } from 'next/server';

export const revalidate = 300;

type GdeltArticle = {
  title?: string;
  url?: string;
  seendate?: string;
  domain?: string;
  language?: string;
  sourcecountry?: string;
  socialimage?: string;
};

function safeUrl(value?: string) {
  if (!value) return null;
  try {
    const url = new URL(value);
    if (!['http:', 'https:'].includes(url.protocol)) return null;
    return url.toString();
  } catch {
    return null;
  }
}

function topicHits(titles: string[]) {
  const joined = titles.join(' ').toLowerCase();
  const count = (terms: string[]) => terms.reduce((sum, term) => sum + (joined.match(new RegExp(term, 'g'))?.length ?? 0), 0);

  return {
    ai: count(['ai', 'artificial intelligence', 'model', 'agent', 'openai', 'anthropic', 'gemini']),
    security: count(['cyber', 'security', 'hack', 'breach', 'malware', 'ransomware']),
    markets: count(['market', 'stock', 'econom', 'bank', 'rate', 'inflation', 'bitcoin', 'crypto']),
    science: count(['science', 'research', 'space', 'climate', 'health', 'quantum']),
  };
}

export async function GET() {
  const endpoint = new URL('https://api.gdeltproject.org/api/v2/doc/doc');
  endpoint.searchParams.set('query', '(artificial intelligence OR cybersecurity OR technology OR markets)');
  endpoint.searchParams.set('mode', 'ArtList');
  endpoint.searchParams.set('maxrecords', '18');
  endpoint.searchParams.set('format', 'json');
  endpoint.searchParams.set('sort', 'HybridRel');

  try {
    const response = await fetch(endpoint, {
      headers: { 'User-Agent': 'Saimor-Mora-Public-Signal/1.0' },
      next: { revalidate: 300 },
    });

    if (!response.ok) throw new Error(`GDELT ${response.status}`);

    const payload = await response.json() as { articles?: GdeltArticle[] };
    const seen = new Set<string>();
    const items = (payload.articles ?? [])
      .map((article) => {
        const url = safeUrl(article.url);
        const title = article.title?.trim();
        if (!url || !title || seen.has(url)) return null;
        seen.add(url);
        return {
          title,
          url,
          seenAt: article.seendate ?? null,
          domain: article.domain ?? new URL(url).hostname,
          language: article.language ?? null,
          country: article.sourcecountry ?? null,
          image: safeUrl(article.socialimage) ?? null,
        };
      })
      .filter(Boolean)
      .slice(0, 12);

    const titles = items.map((item) => item!.title);
    const domains = new Set(items.map((item) => item!.domain).filter(Boolean));

    return NextResponse.json({
      live: true,
      source: 'GDELT 2.0',
      generatedAt: new Date().toISOString(),
      stats: {
        signals: items.length,
        sources: domains.size,
        topics: topicHits(titles),
      },
      items,
    });
  } catch (error) {
    return NextResponse.json({
      live: false,
      source: 'GDELT 2.0',
      generatedAt: new Date().toISOString(),
      stats: { signals: 0, sources: 0, topics: { ai: 0, security: 0, markets: 0, science: 0 } },
      items: [],
      error: error instanceof Error ? error.message : 'signal unavailable',
    }, { status: 200 });
  }
}
