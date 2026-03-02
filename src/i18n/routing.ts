import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
    locales: ['ru', 'ro'],
    defaultLocale: 'ru',
    pathnames: {
        '/': '/',
        '/articles': {
            ru: '/stati',
            ro: '/articole'
        },
        '/articles/[slug]': {
            ru: '/stati/[slug]',
            ro: '/articole/[slug]'
        },
        '/faq': '/faq',
        '/admin': '/admin',
        '/admin/calculator': '/admin/calculator',
        '/admin/blog': '/admin/blog',
        '/admin/blog/new': '/admin/blog/new',
        '/admin/blog/[id]': '/admin/blog/[id]',
        '/admin/images': '/admin/images',
        '/admin/login': '/admin/login'
    }
});

export const { Link, redirect, usePathname, useRouter, getPathname } =
    createNavigation(routing);
