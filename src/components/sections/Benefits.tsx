'use client';

import { Clock, ShieldCheck, MapPin, Wallet, PenTool, ThumbsUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export function Benefits() {
    const t = useTranslations('Benefits');

    const benefits = [
        {
            icon: <Clock className="w-8 h-8 text-accent-cyan" />,
            title: t('items.time.title'),
            description: t('items.time.desc')
        },
        {
            icon: <ShieldCheck className="w-8 h-8 text-accent-cyan" />,
            title: t('items.warranty.title'),
            description: t('items.warranty.desc')
        },
        {
            icon: <Wallet className="w-8 h-8 text-accent-cyan" />,
            title: t('items.payment.title'),
            description: t('items.payment.desc')
        },
        {
            icon: <PenTool className="w-8 h-8 text-accent-cyan" />,
            title: t('items.parts.title'),
            description: t('items.parts.desc')
        },
        {
            icon: <MapPin className="w-8 h-8 text-accent-cyan" />,
            title: t('items.area.title'),
            description: t('items.area.desc')
        },
        {
            icon: <ThumbsUp className="w-8 h-8 text-accent-cyan" />,
            title: t('items.clean.title'),
            description: t('items.clean.desc')
        }
    ];

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-main mb-4">
                        {t('title_1')} <span className="text-accent-cyan">{t('title_highlight')}</span> {t('title_2')}
                    </h2>
                    <p className="text-muted-foreground">
                        {t('subtitle')}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {benefits.map((benefit, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-background-light p-8 rounded-2xl hover:shadow-xl transition-shadow border border-slate-100"
                        >
                            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6">
                                {benefit.icon}
                            </div>
                            <h3 className="text-xl font-bold font-heading mb-3 text-primary-main">{benefit.title}</h3>
                            <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
