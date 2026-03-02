'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';
import { useParams } from 'next/navigation';

export function LanguageSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const params = useParams();

    const handleLocaleChange = (newLocale: 'ru' | 'ro') => {
        router.replace(
            // @ts-expect-error -- Generic component cannot know all strict params at compile time
            { pathname, params },
            { locale: newLocale }
        );
    };

    return (
        <div className="flex items-center space-x-2 bg-muted/50 rounded-full p-1">
            <button
                onClick={() => handleLocaleChange('ru')}
                className={`px-3 py-1 text-sm font-medium rounded-full transition-colors ${locale === 'ru' ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:text-primary'
                    }`}
                aria-label="Switch to Russian"
            >
                RU
            </button>
            <button
                onClick={() => handleLocaleChange('ro')}
                className={`px-3 py-1 text-sm font-medium rounded-full transition-colors ${locale === 'ro' ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:text-primary'
                    }`}
                aria-label="Switch to Romanian"
            >
                RO
            </button>
        </div>
    );
}
