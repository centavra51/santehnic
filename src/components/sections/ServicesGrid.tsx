'use strict';

import { Droplet, ThermometerSun, Wrench, ShowerHead, Disc as Toilet, Pipette as Pipe } from 'lucide-react';
import { motion } from 'framer-motion';

const services = [
    {
        icon: <Droplet className="w-10 h-10 text-white" />,
        title: 'Устранение засоров',
        description: 'Очистка труб любой сложности специальным оборудованием. Промывка канализации.',
        price: 'от 400 MDL',
    },
    {
        icon: <Wrench className="w-10 h-10 text-white" />,
        title: 'Ремонт и замена смесителей',
        description: 'Установка смесителей на кухне и в ванной. Устранение течи, замена картриджей.',
        price: 'от 300 MDL',
    },
    {
        icon: <Toilet className="w-10 h-10 text-white" />,
        title: 'Установка унитазов / инсталляций',
        description: 'Демонтаж старого оборудования, сборка и монтаж нового, герметизация.',
        price: 'от 600 MDL',
    },
    {
        icon: <Pipe className="w-10 h-10 text-white" />,
        title: 'Разводка труб (вода/слив)',
        description: 'Замена старых труб на новые (полипропилен, сшитый полиэтилен, металлопласт).',
        price: 'от 800 MDL',
    },
    {
        icon: <ThermometerSun className="w-10 h-10 text-white" />,
        title: 'Монтаж систем отопления',
        description: 'Установка радиаторов, теплых полов, бойлеров, подключение котлов.',
        price: 'от 1000 MDL',
    },
    {
        icon: <ShowerHead className="w-10 h-10 text-white" />,
        title: 'Подключение бытовой техники',
        description: 'Стиральные и посудомоечные машины, душевые кабины, гидробоксы.',
        price: 'от 450 MDL',
    }
];

export function ServicesGrid() {
    return (
        <section id="services" className="py-24 bg-background-light">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-primary-main mb-6">
                        Наши Услуги
                    </h2>
                    <div className="w-24 h-1 bg-accent-cyan mx-auto rounded-full mb-6" />
                    <p className="text-muted-foreground text-lg">
                        Выполняем полный спектр сантехнических работ для квартир, частных домов и коммерческих объектов.
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
                                    Рассчитать <span>→</span>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
