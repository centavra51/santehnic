'use client';

import { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type QuizState = {
    serviceType: string;
    meters: number;
    rooms: number;
    urgency: string;
    photoUrl: string | null;
};

const INITIAL_STATE: QuizState = {
    serviceType: '',
    meters: 0,
    rooms: 1,
    urgency: 'standard',
    photoUrl: null,
};

const SERVICE_RATES: Record<string, number> = {
    'Устранение засора': 400,
    'Замена смесителя': 300,
    'Установка унитаза': 600,
    'Разводка труб': 800,
    'Монтаж отопления': 1000,
    'Аварийный выезд': 500,
};

export function QuizCalculator() {
    const [step, setStep] = useState(1);
    const [data, setData] = useState<QuizState>(INITIAL_STATE);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        const saved = localStorage.getItem('santehnik_quiz');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                setData(parsed.data || INITIAL_STATE);
                setStep(parsed.step || 1);
            } catch (e) { }
        }
    }, []);

    useEffect(() => {
        if (isClient) {
            localStorage.setItem('santehnik_quiz', JSON.stringify({ step, data }));
        }
    }, [step, data, isClient]);

    const calculateTotal = () => {
        let base = SERVICE_RATES[data.serviceType] || 0;

        // Simple logic for demonstration. In admin panel this would be editable coefficients.
        if (data.serviceType === 'Разводка труб') {
            base += data.meters * 50; // 50 MDL per meter
        }

        base += (data.rooms - 1) * 100; // 100 MDL per extra room

        if (data.urgency === 'night') base *= 1.5;
        if (data.urgency === 'weekend') base *= 1.2;

        return Math.round(base);
    };

    const handleNext = () => setStep(s => Math.min(s + 1, 5));
    const handlePrev = () => setStep(s => Math.max(s - 1, 1));
    const updateData = (updates: Partial<QuizState>) => setData({ ...data, ...updates });

    if (!isClient) return <div className="py-24 animate-pulse bg-slate-100 min-h-[500px]" />;

    const isStepValid = () => {
        if (step === 1 && !data.serviceType) return false;
        if (step === 2 && data.serviceType === 'Разводка труб' && data.meters <= 0) return false;
        return true;
    };

    return (
        <section id="calculator" className="py-24 bg-white">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-primary-main mb-4">
                        Калькулятор <span className="text-accent-cyan">Цен</span>
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        Ответьте на несколько вопросов, чтобы узнать точную стоимость работ
                    </p>
                </div>

                <div className="bg-background-light p-6 md:p-12 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden">
                    {/* Progress Bar */}
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-slate-200">
                        <motion.div
                            className="h-full bg-accent-cyan"
                            initial={{ width: 0 }}
                            animate={{ width: `${(step / 5) * 100}%` }}
                            transition={{ duration: 0.3 }}
                        />
                    </div>

                    <div className="mb-8 flex justify-between items-center text-sm font-medium text-muted-foreground mt-2">
                        <span>Шаг {step} из 5</span>
                        {step === 5 && <span className="text-success-green flex items-center gap-1"><CheckCircle2 className="w-4 h-4" /> Расчет готов</span>}
                    </div>

                    <div className="min-h-[300px]">
                        <AnimatePresence mode="wait">
                            {step === 1 && (
                                <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                    <h3 className="text-2xl font-bold text-primary-main mb-6">Какая услуга вам нужна?</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {Object.keys(SERVICE_RATES).map(service => (
                                            <button
                                                key={service}
                                                onClick={() => updateData({ serviceType: service })}
                                                className={`p-4 border-2 rounded-xl text-left transition-all ${data.serviceType === service
                                                    ? 'border-accent-cyan bg-accent-cyan/5 text-primary-main font-bold shadow-md'
                                                    : 'border-slate-200 hover:border-slate-300 text-muted-foreground hover:bg-white'
                                                    }`}
                                            >
                                                {service}
                                            </button>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {step === 2 && (
                                <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                    <h3 className="text-2xl font-bold text-primary-main mb-6">Детали помещения</h3>

                                    {data.serviceType === 'Разводка труб' && (
                                        <div className="mb-8">
                                            <label className="block text-sm font-bold text-primary-main mb-2">Примерный метраж труб (от 1 до 100 м)</label>
                                            <input
                                                type="number"
                                                min="1"
                                                max="100"
                                                value={data.meters || ''}
                                                onChange={(e) => updateData({ meters: parseInt(e.target.value) || 0 })}
                                                className="w-full max-w-sm p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-accent-cyan outline-none"
                                                placeholder="Например, 10"
                                            />
                                        </div>
                                    )}

                                    <div>
                                        <label className="block text-sm font-bold text-primary-main mb-2">Количество помещений/точек</label>
                                        <div className="flex items-center gap-4">
                                            <button
                                                onClick={() => updateData({ rooms: Math.max(1, data.rooms - 1) })}
                                                className="w-12 h-12 rounded-xl border border-slate-200 flex items-center justify-center hover:bg-slate-50 text-xl font-bold"
                                            >
                                                -
                                            </button>
                                            <span className="text-2xl font-bold w-12 text-center">{data.rooms}</span>
                                            <button
                                                onClick={() => updateData({ rooms: Math.min(10, data.rooms + 1) })}
                                                className="w-12 h-12 rounded-xl border border-slate-200 flex items-center justify-center hover:bg-slate-50 text-xl font-bold"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {step === 3 && (
                                <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                    <h3 className="text-2xl font-bold text-primary-main mb-6">Срочность работ</h3>
                                    <div className="flex flex-col gap-4 max-w-md">
                                        {[
                                            { id: 'standard', label: 'В плановом порядке (будни)' },
                                            { id: 'weekend', label: 'В выходной день (+20%)' },
                                            { id: 'night', label: 'Ночной аварийный выезд (+50%)' },
                                        ].map(u => (
                                            <label
                                                key={u.id}
                                                className={`flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition-colors ${data.urgency === u.id
                                                    ? 'border-accent-cyan bg-accent-cyan/5'
                                                    : 'border-slate-200 hover:border-slate-300 bg-white'
                                                    }`}
                                            >
                                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${data.urgency === u.id ? 'border-accent-cyan' : 'border-slate-300'}`}>
                                                    {data.urgency === u.id && <div className="w-3 h-3 rounded-full bg-accent-cyan" />}
                                                </div>
                                                <span className="font-medium text-primary-main">{u.label}</span>
                                            </label>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {step === 4 && (
                                <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                    <h3 className="text-2xl font-bold text-primary-main mb-6">Прикрепить фото (необязательно)</h3>
                                    <p className="text-muted-foreground mb-6">Если у вас есть фото проблемы, прикрепите его, чтобы мастер мог взять нужные запчасти.</p>

                                    <div className="border-2 border-dashed border-slate-300 rounded-xl p-12 text-center hover:bg-slate-50 transition-colors cursor-pointer text-muted-foreground flex flex-col items-center gap-4 relative">
                                        <AlertCircle className="w-8 h-8 opacity-50" />
                                        <p className="font-medium">Нажмите или перетащите файл сюда</p>
                                        <p className="text-sm opacity-70">PNG, JPG до 5 MB</p>
                                        <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" />
                                    </div>
                                </motion.div>
                            )}

                            {step === 5 && (
                                <motion.div key="step5" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
                                    <div className="w-20 h-20 bg-success-green/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <CheckCircle2 className="w-10 h-10 text-success-green" />
                                    </div>
                                    <h3 className="text-2xl md:text-3xl font-bold text-primary-main mb-2">Предварительный расчет</h3>
                                    <p className="text-muted-foreground mb-8">Итоговая сумма зависит от точных материалов и дополнительных нюансов.</p>

                                    <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-lg max-w-sm mx-auto mb-8 relative">
                                        <div className="text-5xl font-extrabold text-primary-main tracking-tight mb-2">
                                            {calculateTotal()} <span className="text-2xl text-muted-foreground font-medium">MDL</span>
                                        </div>
                                        <div className="text-sm font-medium text-success-green bg-success-green/10 inline-block px-3 py-1 rounded-full">
                                            Вызов мастера: 0 MDL (при заказе)
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => {
                                            window.location.href = `#order?service=${encodeURIComponent(data.serviceType)}&price=${calculateTotal()}`;
                                        }}
                                        className="inline-flex items-center justify-center space-x-2 bg-primary-main hover:bg-primary-main/90 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all hover:scale-105 shadow-xl shadow-primary-main/20 w-full sm:w-auto"
                                    >
                                        Зафиксировать Цену и Вызвать Мастера
                                    </button>

                                    <button onClick={() => { setStep(1); setData(INITIAL_STATE); }} className="block mx-auto mt-6 text-sm font-bold text-muted-foreground hover:text-primary-main transition-colors">
                                        Расчитать заново
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Navigation Controls */}
                    {step < 5 && (
                        <div className="mt-8 pt-8 border-t border-slate-200 flex items-center justify-between">
                            <button
                                onClick={handlePrev}
                                disabled={step === 1}
                                className={`flex items-center gap-2 font-bold px-4 py-2 rounded-lg transition-colors ${step === 1 ? 'opacity-0 pointer-events-none' : 'text-muted-foreground hover:bg-slate-100 hover:text-primary-main'}`}
                            >
                                <ChevronLeft className="w-5 h-5" /> Назад
                            </button>

                            <button
                                onClick={handleNext}
                                disabled={!isStepValid()}
                                className={`flex items-center gap-2 font-bold px-6 py-3 rounded-xl transition-all ${isStepValid()
                                    ? 'bg-accent-cyan text-white hover:bg-accent-cyan/90 shadow-lg shadow-accent-cyan/20 cursor-pointer'
                                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                                    }`}
                            >
                                Далее <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
