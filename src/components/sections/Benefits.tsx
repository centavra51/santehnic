'use client';

import { Clock, ShieldCheck, MapPin, Wallet, PenTool, ThumbsUp } from 'lucide-react';
import { motion } from 'framer-motion';

const benefits = [
    {
        icon: <Clock className="w-8 h-8 text-accent-cyan" />,
        title: 'Выезд от 40 минут',
        description: 'Мастер приедет в кратчайшие сроки или в любое удобное для вас время.'
    },
    {
        icon: <ShieldCheck className="w-8 h-8 text-accent-cyan" />,
        title: 'Гарантия до 2-х лет',
        description: 'Официальная гарантия на все виды выполненных монтажных работ.'
    },
    {
        icon: <Wallet className="w-8 h-8 text-accent-cyan" />,
        title: 'Оплата после работы',
        description: 'Никаких авансов. Вы платите только после проверки результата.'
    },
    {
        icon: <PenTool className="w-8 h-8 text-accent-cyan" />,
        title: 'Свой склад запчастей',
        description: 'Вам не придется бегать по магазинам — всё необходимое мастер привезет.'
    },
    {
        icon: <MapPin className="w-8 h-8 text-accent-cyan" />,
        title: 'Весь Кишинев и пригород',
        description: 'Выезжаем во все районы Кишинева: Ботаника, Рышкановка, Чеканы и др.'
    },
    {
        icon: <ThumbsUp className="w-8 h-8 text-accent-cyan" />,
        title: 'Чистота и порядок',
        description: 'Работаем аккуратно, в бахилах. Убираем строительный мусор за собой.'
    }
];

export function Benefits() {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-main mb-4">
                        Почему вам <span className="text-accent-cyan">выгодно</span> работать с нами
                    </h2>
                    <p className="text-muted-foreground">
                        Мы строим долгосрочные отношения с клиентами на основе доверия и высокого качества.
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
