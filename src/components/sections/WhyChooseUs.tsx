'use client';

import { CheckCircle2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

interface WhyChooseUsProps {
    backgroundImage?: string;
}

export function WhyChooseUs({ backgroundImage }: WhyChooseUsProps) {
    const t = useTranslations('WhyChooseUs');

    const reasons = [
        t('reasons.item1'),
        t('reasons.item2'),
        t('reasons.item3'),
        t('reasons.item4'),
        t('reasons.item5'),
        t('reasons.item6'),
        t('reasons.item7'),
        t('reasons.item8')
    ];

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div>
                    <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-primary-main mb-6">
                        {t('title_1')} <br /><span className="text-accent-cyan">{t('title_highlight')}</span>
                    </h2>
                    <div className="w-24 h-1 bg-accent-cyan rounded-full mb-8" />

                    <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
                        {t('subtitle')}
                    </p>

                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {reasons.map((reason, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                                <CheckCircle2 className="w-6 h-6 text-success-green shrink-0 mt-0.5" />
                                <span className="text-primary-main font-medium">{reason}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="relative">
                    <div className="aspect-[4/5] rounded-3xl bg-slate-200 shadow-2xl overflow-hidden border-8 border-white flex items-center justify-center relative">
                        <Image src={backgroundImage || "/why-choose-us.png"} alt={t('title_1')} fill style={{ objectFit: 'cover' }} />
                    </div>

                    <div className="absolute -left-12 bottom-12 bg-white p-6 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-4">
                        <div className="w-12 h-12 bg-accent-cyan/10 rounded-full flex items-center justify-center">
                            <span className="text-accent-cyan font-extrabold text-xl">{t('exp_value')}</span>
                        </div>
                        <div>
                            <p className="font-bold text-primary-main">{t('exp_title')}</p>
                            <p className="text-sm text-muted-foreground">{t('exp_desc')}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
