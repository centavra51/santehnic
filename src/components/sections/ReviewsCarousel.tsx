'use client';

import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { useState, useEffect } from 'react';

const reviews = [
    {
        id: 1,
        name: 'Ion Ceban',
        date: '12 Октября 2023',
        service: 'Замена радиаторов',
        text: 'Очень оперативно! Трубу прорвало ночью в воскресенье. Мастер приехал через 35 минут, быстро перекрыл воду и всё починил. Рекомендую.',
        rating: 5,
    },
    {
        id: 2,
        name: 'Мария Стати',
        date: '05 Ноября 2023',
        service: 'Установка сантехники',
        text: 'Делали ремонт в ванной, мастера установили инсталляцию, душевую и раковину. Всё ровно, вода нигде не подтекает. Дали чек и гарантию. Спасибо!',
        rating: 5,
    },
    {
        id: 3,
        name: 'Александр',
        date: '28 Ноября 2023',
        service: 'Сложный засор',
        text: 'До этого вызывал другого сантехника, он ковырялся два часа и ничего не сделал. Ваш мастер приехал со спец аппаратом и прочистил трубу за 15 минут.',
        rating: 5,
    },
];

export function ReviewsCarousel() {
    const [current, setCurrent] = useState(0);

    const next = () => setCurrent((c) => (c + 1) % reviews.length);
    const prev = () => setCurrent((c) => (c === 0 ? reviews.length - 1 : c - 1));

    useEffect(() => {
        const t = setInterval(next, 8000);
        return () => clearInterval(t);
    }, []);

    return (
        <section className="py-24 bg-white overflow-hidden" id="reviews">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-primary-main mb-6">
                        Отзывы <span className="text-accent-cyan">Клиентов</span>
                    </h2>
                    <div className="w-24 h-1 bg-accent-cyan mx-auto rounded-full mb-6" />
                    <p className="text-muted-foreground text-lg">
                        Более 500 успешно выполненных заказов. Вот что говорят люди о нашей работе.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto relative px-12">
                    {/* Main Review Card */}
                    <div className="bg-background-light p-8 md:p-12 rounded-3xl relative">
                        <Quote className="absolute top-8 right-8 w-24 h-24 text-slate-200 rotate-180 -z-1" />

                        <div className="relative z-10">
                            <div className="flex items-center gap-1 mb-6">
                                {[...Array(reviews[current].rating)].map((_, i) => (
                                    <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                                ))}
                            </div>

                            <p className="text-xl md:text-2xl text-primary-main font-medium italic leading-relaxed mb-8 min-h-[120px]">
                                "{reviews[current].text}"
                            </p>

                            <div className="flex items-center justify-between border-t border-slate-200 pt-6">
                                <div>
                                    <h4 className="font-bold text-lg text-primary-main">{reviews[current].name}</h4>
                                    <p className="text-sm text-muted-foreground">{reviews[current].service} • {reviews[current].date}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Controls */}
                    <button
                        onClick={prev}
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg border border-slate-100 hover:text-accent-cyan hover:scale-110 transition-all z-20"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                        onClick={next}
                        className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg border border-slate-100 hover:text-accent-cyan hover:scale-110 transition-all z-20"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>

                    {/* Dots */}
                    <div className="flex justify-center gap-3 mt-8">
                        {reviews.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrent(i)}
                                className={`transition-all rounded-full ${current === i ? 'w-8 h-2.5 bg-accent-cyan' : 'w-2.5 h-2.5 bg-slate-200 hover:bg-slate-300'}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
