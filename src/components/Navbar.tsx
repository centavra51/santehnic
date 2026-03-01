'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Phone, Wrench } from 'lucide-react';

export function Navbar() {
    const t = useTranslations('Navbar');

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center space-x-2">
                    <Wrench className="h-6 w-6 text-accent-cyan" />
                    <span className="font-heading font-bold text-xl hidden sm:inline-block">
                        Santehnik<span className="text-accent-cyan">{t('brand_pro')}</span>
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
                    <a href="/#services" className="transition-colors hover:text-accent-cyan">
                        {t('services')}
                    </a>
                    <a href="/#calculator" className="transition-colors hover:text-accent-cyan">
                        {t('calculator')}
                    </a>
                    <a href="/#reviews" className="transition-colors hover:text-accent-cyan">
                        {t('reviews')}
                    </a>
                    <Link href="/faq" className="transition-colors hover:text-accent-cyan">
                        {t('faq')}
                    </Link>
                    <Link href="/articles" className="transition-colors hover:text-accent-cyan">
                        {t('blog')}
                    </Link>
                </nav>

                <div className="flex items-center space-x-4">
                    <a href="tel:+37360000000" className="hidden lg:flex items-center space-x-2 text-sm font-bold hover:text-accent-cyan">
                        <Phone className="h-4 w-4" />
                        <span>{t('phone')}</span>
                    </a>
                    <LanguageSwitcher />
                </div>
            </div>
        </header>
    );
}
