'use client';

import { PhoneCall, Calculator, Truck, Wrench, ThumbsUp } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function HowWeWork() {
    const t = useTranslations('HowWeWork');

    const steps = [
        {
            icon: <PhoneCall className="w-8 h-8 text-white" />,
            title: t('items.step1.title'),
            description: t('items.step1.desc'),
        },
        {
            icon: <Calculator className="w-8 h-8 text-white" />,
            title: t('items.step2.title'),
            description: t('items.step2.desc'),
        },
        {
            icon: <Truck className="w-8 h-8 text-white" />,
            title: t('items.step3.title'),
            description: t('items.step3.desc'),
        },
        {
            icon: <Wrench className="w-8 h-8 text-white" />,
            title: t('items.step4.title'),
            description: t('items.step4.desc'),
        },
        {
            icon: <ThumbsUp className="w-8 h-8 text-white" />,
            title: t('items.step5.title'),
            description: t('items.step5.desc'),
        }
    ];

    return (
        <section className="py-24 bg-primary-main text-white overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-2xl mx-auto mb-20">
                    <h2 className="text-3xl md:text-5xl font-heading font-extrabold mb-6">
                        {t('title_1')} <span className="text-accent-cyan">{t('title_highlight')}</span>
                    </h2>
                    <div className="w-24 h-1 bg-accent-cyan mx-auto rounded-full mb-6" />
                    <p className="text-primary-foreground/80 text-lg">
                        {t('subtitle')}
                    </p>
                </div>

                <div className="max-w-5xl mx-auto relative cursor-default">
                    {/* Connecting Line */}
                    <div className="hidden md:block absolute top-[45px] left-0 w-full h-1 bg-gradient-to-r from-accent-cyan/20 via-accent-cyan to-accent-cyan/20" />

                    <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                        {steps.map((step, idx) => (
                            <div key={idx} className="relative flex flex-col items-center text-center group">
                                {/* Step Node */}
                                <div className="w-24 h-24 rounded-full bg-primary-main border-4 border-accent-cyan flex flex-col items-center justify-center shadow-[0_0_30px_rgba(0,180,216,0.3)] z-10 mb-6 group-hover:scale-110 transition-transform duration-300">
                                    {step.icon}
                                </div>
                                {/* Step Number Badge */}
                                <div className="absolute top-0 right-1/2 translate-x-10 -translate-y-2 w-8 h-8 rounded-full bg-white text-primary-main font-bold flex items-center justify-center text-sm shadow-md z-20">
                                    {idx + 1}
                                </div>
                                <h3 className="text-xl font-bold font-heading mb-3">{step.title}</h3>
                                <p className="text-sm text-primary-foreground/70 leading-relaxed max-w-[200px]">
                                    {step.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
