import { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { createClient } from '@/lib/supabase/server';

const HOST = 'https://santehnik.md';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const sitemapEntries: MetadataRoute.Sitemap = [];
    const supabase = await createClient();

    // 1. Core pages
    const coreRoutes = ['', '/privacy-policy', '/articles'];

    coreRoutes.forEach((route) => {
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

    // 2. Dynamic Blog Articles
    const { data: articles } = await supabase
        .from('articles')
        .select('slug, updated_at')
        .eq('is_published', true);

    if (articles) {
        articles.forEach((article) => {
            routing.locales.forEach((locale) => {
                const url = locale === routing.defaultLocale
                    ? `${HOST}/articles/${article.slug}`
                    : `${HOST}/${locale}/articles/${article.slug}`;

                sitemapEntries.push({
                    url,
                    lastModified: new Date(article.updated_at || new Date()),
                    changeFrequency: 'monthly',
                    priority: 0.7,
                });
            });
        });
    }

    return sitemapEntries;
}
