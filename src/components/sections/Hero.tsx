'use client';

import { ArrowRight, Calculator, PhoneCall } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export function Hero() {
    return (
        <section className="relative w-full min-h-[90vh] flex items-center bg-background-light overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-accent-cyan/10 blur-3xl rounded-bl-[100px] -z-10" />

            <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="space-y-8"
                >
                    <div className="inline-flex items-center space-x-2 bg-success-green/10 text-success-green px-4 py-2 rounded-full text-sm font-bold">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success-green opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-success-green"></span>
                        </span>
                        <span>Дежурный мастер свободен. Выезд за 40 минут.</span>
                    </div>

                    <h1 className="text-5xl md:text-6xl font-heading font-extrabold leading-tight text-primary-main">
                        Срочный Вызов <br />
                        <span className="text-accent-cyan">Сантехника 24/7</span> <br />
                        в Кишиневе
                    </h1>

                    <p className="text-lg md:text-xl text-muted-foreground max-w-lg">
                        Устранение прорывов, монтаж труб и установка любой сантехники с гарантией до 2-х лет. Приезжаем быстро, делаем на совесть.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <a href="tel:+37360000000" className="inline-flex items-center justify-center space-x-2 bg-primary-main hover:bg-primary-main/90 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all hover:scale-105 shadow-xl shadow-primary-main/20">
                            <PhoneCall className="w-5 h-5" />
                            <span>Вызвать Мастера</span>
                        </a>
                        <a href="#calculator" className="inline-flex items-center justify-center space-x-2 bg-white text-primary-main border-2 border-primary-main/10 hover:border-accent-cyan hover:text-accent-cyan px-8 py-4 rounded-xl font-bold text-lg transition-all hover:-translate-y-1 shadow-sm">
                            <Calculator className="w-5 h-5" />
                            <span>Расчет Цены</span>
                            <ArrowRight className="w-5 h-5" />
                        </a>
                    </div>

                    <div className="flex items-center space-x-4 pt-4 text-sm text-muted-foreground font-medium">
                        <div className="flex items-center space-x-1">
                            <span className="text-accent-cyan font-bold">✓</span>
                            <span>Без предоплаты</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <span className="text-accent-cyan font-bold">✓</span>
                            <span>Официальный договор</span>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative hidden lg:block h-[600px] w-full"
                >
                    {/* Mock image placeholder generated for a premium plumbing aesthetic */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-accent-cyan/20 to-primary-main/5 rounded-3xl border-4 border-white shadow-2xl overflow-hidden flex items-center justify-center">
                        {/* Using standard placeholder img until actual assets are provided */}
                        <div className="w-full h-full bg-slate-200 animate-pulse relative">
                            <div className="absolute inset-0 flex items-center justify-center text-slate-400 font-bold">
                                [Nano Banana 2 Image: Professional plumber in uniform fixing a sink, clean modern interior]
                            </div>
                        </div>
                    </div>

                    {/* Floating badge */}
                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                        className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl flex items-center space-x-4 border border-slate-100"
                    >
                        <div className="w-14 h-14 bg-success-green/10 rounded-full flex items-center justify-center">
                            <span className="text-2xl font-bold text-success-green">2</span>
                        </div>
                        <div>
                            <p className="font-bold text-primary-main leading-tight">Года</p>
                            <p className="text-sm text-muted-foreground">Официальной гарантии</p>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
