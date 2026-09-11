import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://saimor.world';
  const now = new Date();

  return [
    { url: `${base}/de`, lastModified: now, priority: 1 },
    { url: `${base}/en`, lastModified: now, priority: 0.9 },
    { url: `${base}/mora`, lastModified: now, priority: 0.75 },
    { url: `${base}/en/mora`, lastModified: now, priority: 0.7 },
    { url: `${base}/earth`, lastModified: now, priority: 0.55 },
    { url: `${base}/de/trust`, lastModified: now, priority: 0.6 },
    { url: `${base}/en/trust`, lastModified: now, priority: 0.6 },
    { url: `${base}/de/rechtliches/impressum`, priority: 0.4 },
    { url: `${base}/de/rechtliches/datenschutz`, priority: 0.4 },
    { url: `${base}/de/rechtliches/agb`, priority: 0.35 },
    { url: `${base}/de/rechtliches/widerruf`, priority: 0.35 },
    { url: `${base}/en/legal/imprint`, priority: 0.4 },
    { url: `${base}/en/legal/privacy`, priority: 0.4 },
    { url: `${base}/en/legal/terms`, priority: 0.35 },
    { url: `${base}/en/legal/refund`, priority: 0.35 },
  ];
}
