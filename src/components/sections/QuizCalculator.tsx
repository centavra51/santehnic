'use client';

import { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, CheckCircle2, AlertCircle, Loader2, Upload } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { createClient } from '@/lib/supabase/client';

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

export function QuizCalculator() {
    const t = useTranslations('QuizCalculator');

    const [serviceRates, setServiceRates] = useState<Record<string, { key: string, label: string, price: number }>>({
        'clear_blockage': { key: 'clear_blockage', label: t('services.clear_blockage'), price: 400 },
        'replace_mixer': { key: 'replace_mixer', label: t('services.replace_mixer'), price: 300 },
        'install_toilet': { key: 'install_toilet', label: t('services.install_toilet'), price: 600 },
        'pipe_routing': { key: 'pipe_routing', label: t('services.pipe_routing'), price: 800 },
        'heating_install': { key: 'heating_install', label: t('services.heating_install'), price: 1000 },
        'emergency_call': { key: 'emergency_call', label: t('services.emergency_call'), price: 500 },
    });

    const [baseMetrics, setBaseMetrics] = useState({ per_meter: 50, per_room: 100 });

    const [step, setStep] = useState(1);
    const [data, setData] = useState<QuizState>(INITIAL_STATE);
    const [isClient, setIsClient] = useState(false);
    const [uploading, setUploading] = useState(false);

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

        const fetchRates = async () => {
            const { createClient } = await import('@/lib/supabase/client');
            const supabase = createClient();
            const { data: ratesData } = await supabase.from('calculator_settings').select('service_name, price_mdl');

            if (ratesData) {
                setServiceRates(prev => {
                    const next = { ...prev };
                    ratesData.forEach(item => {
                        const price = Number(item.price_mdl);
                        if (item.service_name === 'Устранение засора') next['clear_blockage'].price = price;
                        if (item.service_name === 'Замена смесителя') next['replace_mixer'].price = price;
                        if (item.service_name === 'Установка унитаза') next['install_toilet'].price = price;
                        if (item.service_name === 'Разводка труб') next['pipe_routing'].price = price;
                        if (item.service_name === 'Монтаж отопления') next['heating_install'].price = price;
                        if (item.service_name === 'Аварийный выезд') next['emergency_call'].price = price;

                        setBaseMetrics(m => {
                            const newM = { ...m };
                            if (item.service_name === 'За метр трубы') newM.per_meter = price;
                            if (item.service_name === 'За доп. помещение') newM.per_room = price;
                            return newM;
                        });
                    });
                    return next;
                });
            }
        };
        fetchRates();
    }, []);

    useEffect(() => {
        if (isClient) {
            localStorage.setItem('santehnik_quiz', JSON.stringify({
                step,
                data: {
                    ...data,
                    totalPrice: calculateTotal()
                }
            }));
        }
    }, [step, data, isClient]);

    const calculateTotal = () => {
        const service = serviceRates[data.serviceType];
        let base = service ? service.price : 0;

        if (data.serviceType === 'pipe_routing') {
            base += data.meters * baseMetrics.per_meter;
        }

        base += (data.rooms - 1) * baseMetrics.per_room;

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
        if (step === 2 && data.serviceType === 'pipe_routing' && data.meters <= 0) return false;
        return true;
    };

    return (
        <section id="calculator" className="py-24 bg-white">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-primary-main mb-4">
                        {t('title')} <span className="text-accent-cyan">{t('title_highlight')}</span>
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        {t('subtitle')}
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
                        <span>{t('step', { step: step, total: 5 })}</span>
                        {step === 5 && <span className="text-success-green flex items-center gap-1"><CheckCircle2 className="w-4 h-4" /> {t('step_ready')}</span>}
                    </div>

                    <div className="min-h-[300px]">
                        <AnimatePresence mode="wait">
                            {step === 1 && (
                                <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                    <h3 className="text-2xl font-bold text-primary-main mb-6">{t('step1_title')}</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {Object.values(serviceRates).map(service => (
                                            <button
                                                key={service.key}
                                                onClick={() => updateData({ serviceType: service.key })}
                                                className={`p-4 border-2 rounded-xl text-left transition-all ${data.serviceType === service.key
                                                    ? 'border-accent-cyan bg-accent-cyan/5 text-primary-main font-bold shadow-md'
                                                    : 'border-slate-200 hover:border-slate-300 text-muted-foreground hover:bg-white'
                                                    }`}
                                            >
                                                {service.label}
                                            </button>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {step === 2 && (
                                <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                    <h3 className="text-2xl font-bold text-primary-main mb-6">{t('step2_title')}</h3>

                                    {(data.serviceType === 'pipe_routing' || data.serviceType === 'heating_install') && (
                                        <div className="mb-8">
                                            <label className="block text-sm font-bold text-primary-main mb-2">{t('meters_title')}</label>
                                            <input
                                                type="number"
                                                min="1"
                                                max="100"
                                                value={data.meters || ''}
                                                onChange={(e) => updateData({ meters: parseInt(e.target.value) || 0 })}
                                                className="w-full max-w-sm p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-accent-cyan outline-none"
                                                placeholder={t('meters_placeholder')}
                                            />
                                        </div>
                                    )}

                                    <div>
                                        <label className="block text-sm font-bold text-primary-main mb-2">{t('rooms_title')}</label>
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
                                    <h3 className="text-2xl font-bold text-primary-main mb-6">{t('step3_title')}</h3>
                                    <div className="flex flex-col gap-4 max-w-md">
                                        {[
                                            { id: 'standard', label: t('urgency.standard') },
                                            { id: 'weekend', label: t('urgency.weekend') },
                                            { id: 'night', label: t('urgency.night') },
                                        ].map(u => (
                                            <label
                                                key={u.id}
                                                onClick={() => updateData({ urgency: u.id })}
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
                                    <h3 className="text-2xl font-bold text-primary-main mb-6">{t('step4_title')}</h3>
                                    <p className="text-muted-foreground mb-6">{t('step4_desc')}</p>

                                    <div className="border-2 border-dashed border-slate-300 rounded-xl p-12 text-center hover:bg-slate-50 transition-colors cursor-pointer text-muted-foreground flex flex-col items-center gap-4 relative">
                                        {uploading ? (
                                            <Loader2 className="w-8 h-8 animate-spin text-accent-cyan" />
                                        ) : (
                                            <Upload className="w-8 h-8 opacity-50" />
                                        )}
                                        <p className="font-medium">{uploading ? 'Загрузка...' : t('drag_drop')}</p>
                                        <p className="text-sm opacity-70">{t('file_format')}</p>
                                        <input
                                            type="file"
                                            disabled={uploading}
                                            className="absolute inset-0 opacity-0 cursor-pointer disabled:cursor-not-allowed"
                                            onChange={async (e) => {
                                                const file = e.target.files?.[0];
                                                if (!file) return;

                                                setUploading(true);
                                                try {
                                                    const supabase = createClient();
                                                    const fileExt = file.name.split('.').pop();
                                                    const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
                                                    const filePath = `quiz-photos/${fileName}`;

                                                    const { error: uploadError } = await supabase.storage
                                                        .from('site-media')
                                                        .upload(filePath, file);

                                                    if (uploadError) throw uploadError;

                                                    const { data: { publicUrl } } = supabase.storage
                                                        .from('site-media')
                                                        .getPublicUrl(filePath);

                                                    updateData({ photoUrl: publicUrl });
                                                } catch (error) {
                                                    console.error('Error uploading image:', error);
                                                    alert('Ошибка при загрузке изображения');
                                                } finally {
                                                    setUploading(false);
                                                }
                                            }}
                                        />
                                        {data.photoUrl && (
                                            <div className="absolute top-4 right-4 bg-accent-cyan/10 text-accent-cyan px-3 py-1 rounded-full text-xs font-bold border border-accent-cyan/30 z-10 flex items-center gap-2">
                                                <CheckCircle2 className="w-3 h-3" />
                                                Изображение загружено
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            )}

                            {step === 5 && (
                                <motion.div key="step5" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
                                    <div className="w-20 h-20 bg-success-green/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <CheckCircle2 className="w-10 h-10 text-success-green" />
                                    </div>
                                    <h3 className="text-2xl md:text-3xl font-bold text-primary-main mb-2">{t('step5_title')}</h3>
                                    <p className="text-muted-foreground mb-8">{t('step5_desc')}</p>

                                    <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-lg max-w-sm mx-auto mb-8 relative">
                                        <div className="text-5xl font-extrabold text-primary-main tracking-tight mb-2">
                                            {calculateTotal()} <span className="text-2xl text-muted-foreground font-medium">MDL</span>
                                        </div>
                                        <div className="text-sm font-medium text-success-green bg-success-green/10 inline-block px-3 py-1 rounded-full">
                                            {t('call_fee')}
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => {
                                            const serviceName = serviceRates[data.serviceType]?.label || data.serviceType;
                                            const quizPayload = {
                                                ...data,
                                                totalPrice: calculateTotal(),
                                                serviceLabel: serviceName,
                                            };
                                            // Save to localStorage
                                            localStorage.setItem('santehnik_quiz', JSON.stringify({
                                                step: 5,
                                                data: quizPayload
                                            }));
                                            // Dispatch custom event so ContactForm picks up the data immediately
                                            window.dispatchEvent(new CustomEvent('quizCompleted', { detail: quizPayload }));
                                            // Scroll to order form
                                            setTimeout(() => {
                                                document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' });
                                            }, 50);
                                        }}
                                        className="inline-flex items-center justify-center space-x-2 bg-primary-main hover:bg-primary-main/90 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all hover:scale-105 shadow-xl shadow-primary-main/20 w-full sm:w-auto"
                                    >
                                        {t('btn_fix_price')}
                                    </button>

                                    <button onClick={() => { setStep(1); setData(INITIAL_STATE); }} className="block mx-auto mt-6 text-sm font-bold text-muted-foreground hover:text-primary-main transition-colors">
                                        {t('btn_restart')}
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
                                <ChevronLeft className="w-5 h-5" /> {t('btn_prev')}
                            </button>

                            <button
                                onClick={handleNext}
                                disabled={!isStepValid()}
                                className={`flex items-center gap-2 font-bold px-6 py-3 rounded-xl transition-all ${isStepValid()
                                    ? 'bg-accent-cyan text-white hover:bg-accent-cyan/90 shadow-lg shadow-accent-cyan/20 cursor-pointer'
                                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                                    }`}
                            >
                                {t('btn_next')} <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
