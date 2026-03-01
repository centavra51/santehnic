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
        '/faq': '/faq',
        '/admin': '/admin'
    }
});

export const { Link, redirect, usePathname, useRouter, getPathname } =
    createNavigation(routing);
