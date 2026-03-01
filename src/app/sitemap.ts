import { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';

const HOST = 'https://santehnik.md';

export default function sitemap(): MetadataRoute.Sitemap {
    const sitemapEntries: MetadataRoute.Sitemap = [];

    // Core pages
    const routes = ['', '/privacy-policy', '/articles'];

    routes.forEach((route) => {
        routing.locales.forEach((locale) => {
            const url = locale === routing.defaultLocale
                ? `${HOST}${route}`
                : `${HOST}/${locale}${route}`;

            sitemapEntries.push({
                url,
                lastModified: new Date(),
                changeFrequency: route === '' ? 'weekly' : 'monthly',
                priority: route === '' ? 1 : 0.8,
            });
        });
    });

    return sitemapEntries;
}
