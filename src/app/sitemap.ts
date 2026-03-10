import { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { getPublishedArticles } from '@/lib/articles';

const HOST = 'https://santehnik.md';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const sitemapEntries: MetadataRoute.Sitemap = [];
  const articles = await getPublishedArticles();
  const coreRoutes = ['', '/privacy-policy', '/articles'];

  coreRoutes.forEach((route) => {
    routing.locales.forEach((locale) => {
      const url =
        locale === routing.defaultLocale ? `${HOST}${route}` : `${HOST}/${locale}${route}`;

      sitemapEntries.push({
        url,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'weekly' : 'monthly',
        priority: route === '' ? 1 : 0.8,
      });
    });
  });

  articles.forEach((article) => {
    routing.locales.forEach((locale) => {
      const url =
        locale === routing.defaultLocale
          ? `${HOST}/articles/${article.slug}`
          : `${HOST}/${locale}/articles/${article.slug}`;

      sitemapEntries.push({
        url,
        lastModified: new Date(article.updated_at || article.created_at),
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    });
  });

  return sitemapEntries;
}
