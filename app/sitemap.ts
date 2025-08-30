import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://saimor.world';
  return [
    { url: `${base}/de`, priority: 1 },
    { url: `${base}/en`, priority: 0.8 }
  ];
}
