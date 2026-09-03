import { MetadataRoute } from 'next';
export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://saimor.world';

  return [
    { url: `${base}/de`, priority: 1 },
    { url: `${base}/en`, priority: 0.8 },
    { url: `${base}/mora`, priority: 0.7 },
    { url: `${base}/en/mora`, priority: 0.7 },
    { url: `${base}/yori`, priority: 0.8 },
    { url: `${base}/en/yori`, priority: 0.75 },
    { url: `${base}/demo`, priority: 0.75 },
    { url: `${base}/earth`, priority: 0.55 },
    { url: `${base}/wall`, priority: 0.5 },
    { url: `${base}/de/trust`, priority: 0.6 },
    { url: `${base}/en/trust`, priority: 0.6 },
    { url: `${base}/de/rechtliches/impressum`, priority: 0.5 },
    { url: `${base}/de/rechtliches/datenschutz`, priority: 0.5 },
    { url: `${base}/de/rechtliches/agb`, priority: 0.5 },
    { url: `${base}/de/rechtliches/widerruf`, priority: 0.5 },
    { url: `${base}/en/legal/imprint`, priority: 0.5 },
    { url: `${base}/en/legal/privacy`, priority: 0.5 },
    { url: `${base}/en/legal/terms`, priority: 0.5 },
    { url: `${base}/en/legal/refund`, priority: 0.5 },
  ];
}
