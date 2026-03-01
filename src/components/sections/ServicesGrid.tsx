'use client';

import { Droplet, ThermometerSun, Wrench, ShowerHead, Disc as Toilet, Pipette as Pipe } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function ServicesGrid() {
    const t = useTranslations('Services');

    const services = [
        {
            icon: <Droplet className="w-10 h-10 text-white" />,
            title: t('items.clog.title'),
            description: t('items.clog.desc'),
            price: t('items.clog.price'),
        },
        {
            icon: <Wrench className="w-10 h-10 text-white" />,
            title: t('items.mixer.title'),
            description: t('items.mixer.desc'),
            price: t('items.mixer.price'),
        },
        {
            icon: <Toilet className="w-10 h-10 text-white" />,
            title: t('items.toilet.title'),
            description: t('items.toilet.desc'),
            price: t('items.toilet.price'),
        },
        {
            icon: <Pipe className="w-10 h-10 text-white" />,
            title: t('items.pipes.title'),
            description: t('items.pipes.desc'),
            price: t('items.pipes.price'),
        },
        {
            icon: <ThermometerSun className="w-10 h-10 text-white" />,
            title: t('items.heating.title'),
            description: t('items.heating.desc'),
            price: t('items.heating.price'),
        },
        {
            icon: <ShowerHead className="w-10 h-10 text-white" />,
            title: t('items.appliances.title'),
            description: t('items.appliances.desc'),
            price: t('items.appliances.price'),
        }
    ];

    return (
        <section id="services" className="py-24 bg-background-light">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-primary-main mb-6">
                        {t('title')}
                    </h2>
                    <div className="w-24 h-1 bg-accent-cyan mx-auto rounded-full mb-6" />
                    <p className="text-muted-foreground text-lg">
                        {t('subtitle')}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, idx) => (
                        <div
                            key={idx}
                            className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-slate-100 flex flex-col h-full"
                        >
                            <div className="p-8 flex-1">
                                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-main to-accent-cyan flex items-center justify-center mb-8 shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                                    {service.icon}
                                </div>
                                <h3 className="text-2xl font-bold font-heading mb-4 text-primary-main group-hover:text-accent-cyan transition-colors">
                                    {service.title}
                                </h3>
                                <p className="text-muted-foreground mb-6 leading-relaxed">
                                    {service.description}
                                </p>
                            </div>

                            <div className="px-8 py-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between mt-auto">
                                <span className="font-bold text-lg text-primary-main">{service.price}</span>
                                <a href="#calculator" className="text-accent-cyan font-bold hover:underline flex items-center gap-1">
                                    {t('calc_btn')} <span>→</span>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
