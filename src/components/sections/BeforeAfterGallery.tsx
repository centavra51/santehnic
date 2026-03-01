'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MOCK_IMAGES = [
    {
        title: 'Замена радиатора в гостиной',
        category: 'Отопление',
        img: '/img-placeholder.png' // Replace with Nano Banana generations
    },
    {
        title: 'Монтаж инсталляции Grohe',
        category: 'Сантехника',
        img: '/img-placeholder.png'
    },
    {
        title: 'Комплексная разводка труб',
        category: 'Трубы',
        img: '/img-placeholder.png'
    },
    {
        title: 'Установка душевой кабины',
        category: 'Сантехника',
        img: '/img-placeholder.png'
    },
];

const CATEGORIES = ['Все', 'Отопление', 'Сантехника', 'Трубы'];

export function BeforeAfterGallery() {
    const [activeTab, setActiveTab] = useState('Все');

    const filtered = activeTab === 'Все' ? MOCK_IMAGES : MOCK_IMAGES.filter(i => i.category === activeTab);

    return (
        <section className="py-24 bg-background-light">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-primary-main mb-6">
                        Наши <span className="text-accent-cyan">Работы</span>
                    </h2>
                    <div className="w-24 h-1 bg-accent-cyan mx-auto rounded-full mb-6" />
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Оцените качество и аккуратность наших монтажных работ на реальных объектах в Кишиневе.
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
                                className="group relative rounded-3xl overflow-hidden aspect-square bg-white shadow-lg border border-slate-100 cursor-pointer"
                            >
                                {/* Fallback pattern until image is supplied */}
                                <div className="absolute inset-0 bg-slate-200 flex items-center justify-center">
                                    <div className="text-center p-4">
                                        <span className="text-slate-400 font-bold break-words">[Nano Banana Img: {item.title}]</span>
                                    </div>
                                </div>

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
