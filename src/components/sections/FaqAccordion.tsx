'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
    {
        q: 'Вы выезжаете в пригород Кишинева?',
        a: 'Да, мы выезжаем во все пригороды (Яловены, Ставчены, Дурлешты и др.). Стоимость выезда может незначительно отличаться.'
    },
    {
        q: 'Нужно ли мне самому покупать материалы?',
        a: 'Не обязательно. Наш мастер может сам закупить все необходимое по оптовым ценам и предоставить вам чеки.'
    },
    {
        q: 'Как быстро приезжает мастер при аварии?',
        a: 'В случае прорыва трубы или другой аварийной ситуации дежурный мастер прибывает на место в течение 40 минут.'
    },
    {
        q: 'Что будет, если после ухода мастера снова потечет?',
        a: 'Мы даем официальную гарантию. Если проблема возникнет снова по нашей вине — мы устраним ее абсолютно бесплатно.'
    },
    {
        q: 'Можно ли оплатить работу картой?',
        a: 'Да, мы принимаем наличные, а также переводы на банковскую карту или оплату по IBAN счету (для юридических лиц).'
    }
];

export function FaqAccordion() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="py-24 bg-background-light" id="faq">
            <div className="container mx-auto px-4 max-w-3xl">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-primary-main mb-6">
                        Популярные <span className="text-accent-cyan">Вопросы</span>
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
