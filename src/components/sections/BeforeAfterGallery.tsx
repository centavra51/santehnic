'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

interface BeforeAfterGalleryProps {
    images?: Record<string, string>;
}

export function BeforeAfterGallery({ images }: BeforeAfterGalleryProps) {
    const t = useTranslations('Gallery');

    const CATEGORIES = [
        t('categories.all'),
        t('categories.heating'),
        t('categories.plumbing'),
        t('categories.pipes')
    ];

    const MOCK_IMAGES = [
        {
            title: t('items.item1'),
            category: t('categories.heating'),
            img: images?.['gallery_1'] || '/gallery-heating.png'
        },
        {
            title: t('items.item2'),
            category: t('categories.plumbing'),
            img: images?.['gallery_2'] || '/gallery-plumbing1.png'
        },
        {
            title: t('items.item3'),
            category: t('categories.pipes'),
            img: images?.['gallery_3'] || '/gallery-pipes.png'
        },
        {
            title: t('items.item4'),
            category: t('categories.plumbing'),
            img: images?.['gallery_4'] || '/gallery-plumbing2.png'
        },
    ];

    const [activeTab, setActiveTab] = useState(CATEGORIES[0]);

    const filtered = activeTab === CATEGORIES[0] ? MOCK_IMAGES : MOCK_IMAGES.filter(i => i.category === activeTab);

    return (
        <section className="py-24 bg-background-light">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-primary-main mb-6">
                        {t('title_1')} <span className="text-accent-cyan">{t('title_highlight')}</span>
                    </h2>
                    <div className="w-24 h-1 bg-accent-cyan mx-auto rounded-full mb-6" />
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        {t('subtitle')}
                    </p>
                </div>

                {/* Tabs */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {CATEGORIES.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveTab(cat)}
                            className={`px-6 py-2 rounded-full font-bold transition-colors ${activeTab === cat
                                ? 'bg-primary-main text-white shadow-md'
                                : 'bg-white text-muted-foreground hover:bg-slate-100 hover:text-primary-main shadow-sm'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Gallery Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence>
                        {filtered.map((item, idx) => (
                            <motion.div
                                key={item.title + idx}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                className="group relative rounded-3xl overflow-hidden aspect-square bg-slate-200 shadow-lg border border-slate-100 cursor-pointer"
                            >
                                <Image
                                    src={item.img}
                                    alt={item.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />

                                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary-main/90 to-transparent p-6 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                    <span className="text-accent-cyan text-sm font-bold uppercase tracking-wider">{item.category}</span>
                                    <h4 className="text-white font-bold text-lg">{item.title}</h4>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
