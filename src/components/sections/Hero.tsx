'use client';

import { ArrowRight, Calculator, PhoneCall } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export function Hero() {
    const t = useTranslations('Hero');

    return (
        <section className="relative w-full min-h-[90vh] flex items-center bg-background-light overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-accent-cyan/10 blur-3xl rounded-bl-[100px] -z-10" />

            <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="space-y-8"
                >
                    <div className="inline-flex items-center space-x-2 bg-success-green/10 text-success-green px-4 py-2 rounded-full text-sm font-bold">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success-green opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-success-green"></span>
                        </span>
                        <span>{t('badge')}</span>
                    </div>

                    <h1 className="text-5xl md:text-6xl font-heading font-extrabold leading-tight text-primary-main">
                        {t('title_1')} <br />
                        <span className="text-accent-cyan">{t('title_highlight')}</span> <br />
                        {t('title_2')}
                    </h1>

                    <p className="text-lg md:text-xl text-muted-foreground max-w-lg">
                        {t('subtitle')}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <a href="tel:+37360000000" className="inline-flex items-center justify-center space-x-2 bg-primary-main hover:bg-primary-main/90 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all hover:scale-105 shadow-xl shadow-primary-main/20">
                            <PhoneCall className="w-5 h-5" />
                            <span>{t('call_master')}</span>
                        </a>
                        <a href="#calculator" className="inline-flex items-center justify-center space-x-2 bg-white text-primary-main border-2 border-primary-main/10 hover:border-accent-cyan hover:text-accent-cyan px-8 py-4 rounded-xl font-bold text-lg transition-all hover:-translate-y-1 shadow-sm">
                            <Calculator className="w-5 h-5" />
                            <span>{t('calc_price')}</span>
                            <ArrowRight className="w-5 h-5" />
                        </a>
                    </div>

                    <div className="flex items-center space-x-4 pt-4 text-sm text-muted-foreground font-medium">
                        <div className="flex items-center space-x-1">
                            <span className="text-accent-cyan font-bold">✓</span>
                            <span>{t('no_prepay')}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <span className="text-accent-cyan font-bold">✓</span>
                            <span>{t('contract')}</span>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative hidden lg:block h-[600px] w-full"
                >
                    <div className="absolute inset-0 bg-gradient-to-tr from-accent-cyan/20 to-primary-main/5 rounded-3xl border-4 border-white shadow-2xl overflow-hidden flex items-center justify-center">
                        <Image src="/hero-bg.png" alt={t('img_alt')} fill style={{ objectFit: 'cover' }} priority />
                    </div>

                    {/* Floating badge */}
                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                        className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl flex items-center space-x-4 border border-slate-100"
                    >
                        <div className="w-14 h-14 bg-success-green/10 rounded-full flex items-center justify-center">
                            <span className="text-2xl font-bold text-success-green">{t('warranty_years')}</span>
                        </div>
                        <div>
                            <p className="font-bold text-primary-main leading-tight">{t('warranty_label')}</p>
                            <p className="text-sm text-muted-foreground">{t('warranty_desc')}</p>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
