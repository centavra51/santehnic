'use strict';

import { CheckCircle2 } from 'lucide-react';

const reasons = [
    'Работаем официально по договору',
    'Не берем предоплату',
    'Мастера с профильным образованием',
    'Используем профессиональный инструмент',
    'Вывозим за собой строительный мусор',
    'Составляем прозрачную смету',
    'Даем гарантию до 2-х лет в письменном виде',
    'Помогаем с закупкой материалов со скидкой'
];

export function WhyChooseUs() {
    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div>
                    <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-primary-main mb-6">
                        Мастера, которым <br /><span className="text-accent-cyan">можно доверять</span>
                    </h2>
                    <div className="w-24 h-1 bg-accent-cyan rounded-full mb-8" />

                    <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
                        Наш подход отличается от "шабашников". Мы несем полную юридическую и моральную ответственность за качество выполненной работы. Ваша квартира или дом в надежных руках.
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
                    <div className="aspect-[4/5] rounded-3xl bg-slate-200 shadow-2xl overflow-hidden border-8 border-white flex items-center justify-center">
                        <span className="text-slate-400 font-bold p-8 text-center">[Nano Banana 2 Img: Trustworthy professional plumber showing contract/smiling]</span>
                    </div>

                    <div className="absolute -left-12 bottom-12 bg-white p-6 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-4">
                        <div className="w-12 h-12 bg-accent-cyan/10 rounded-full flex items-center justify-center">
                            <span className="text-accent-cyan font-extrabold text-xl">5+</span>
                        </div>
                        <div>
                            <p className="font-bold text-primary-main">Лет опыта</p>
                            <p className="text-sm text-muted-foreground">У каждого мастера</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
