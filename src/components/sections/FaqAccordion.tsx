'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';

export function FaqAccordion() {
    const t = useTranslations('FAQ');

    const faqs = [
        { q: t('items.item1.q'), a: t('items.item1.a') },
        { q: t('items.item2.q'), a: t('items.item2.a') },
        { q: t('items.item3.q'), a: t('items.item3.a') },
        { q: t('items.item4.q'), a: t('items.item4.a') },
        { q: t('items.item5.q'), a: t('items.item5.a') },
    ];

    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="py-24 bg-background-light" id="faq">
            <div className="container mx-auto px-4 max-w-3xl">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-primary-main mb-6">
                        {t('title_1')} <span className="text-accent-cyan">{t('title_highlight')}</span>
                    </h2>
                    <div className="w-24 h-1 bg-accent-cyan mx-auto rounded-full" />
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, idx) => (
                        <div
                            key={idx}
                            className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                                className="w-full text-left px-6 py-5 flex items-center justify-between font-bold text-lg text-primary-main hover:text-accent-cyan transition-colors"
                            >
                                <span>{faq.q}</span>
                                <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${openIndex === idx ? 'rotate-180 text-accent-cyan' : 'text-slate-400'}`} />
                            </button>

                            <AnimatePresence>
                                {openIndex === idx && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-6 pb-6 text-muted-foreground leading-relaxed">
                                            {faq.a}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
