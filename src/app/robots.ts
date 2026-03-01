import { MetadataRoute } from 'next';

const HOST = 'https://santehnik.md';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/admin/', '/api/'],
        },
        sitemap: `${HOST}/sitemap.xml`,
    };
}
