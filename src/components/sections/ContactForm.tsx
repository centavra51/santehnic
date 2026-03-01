'use client';

import { useState, useEffect } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, CheckCircle2 } from 'lucide-react';

const formSchema = z.object({
    name: z.string().min(2, 'Имя должно содержать минимум 2 символа'),
    phone: z.string().min(9, 'Введите корректный номер телефона'),
    address: z.string().min(5, 'Укажите улицу, дом, квартиру'),
    problemId: z.string().optional(),
    description: z.string().optional(),
    dateSlot: z.string().optional(),
    consent: z.boolean().refine(val => val === true, 'Необходимо согласие на обработку данных')
});

type FormValues = z.infer<typeof formSchema>;

export function ContactForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            consent: true
        }
    });

    useEffect(() => {
        // Read from URL if navigated from calculator
        const params = new URLSearchParams(window.location.search);
        const service = params.get('service');
        const price = params.get('price');
        if (service && price) {
            setValue('description', `Услуга из калькулятора: ${service}. Предварительная цена: ${price} MDL`);
            // Clean up URL without reloading
            window.history.replaceState({}, document.title, window.location.pathname + window.location.hash);
        }
    }, [setValue]);

    const onSubmit = async (data: FormValues) => {
        setIsSubmitting(true);
        try {
            const res = await fetch('/api/order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            if (res.ok) {
                setIsSuccess(true);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <section className="py-24 bg-white" id="order">
                <div className="container mx-auto px-4 max-w-2xl text-center">
                    <div className="w-24 h-24 bg-success-green/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="w-12 h-12 text-success-green" />
                    </div>
                    <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-primary-main mb-4">
                        Заявка Принята!
                    </h2>
                    <p className="text-muted-foreground text-lg mb-8">
                        Дежурный мастер скоро свяжется с вами по указанному номеру для подтверждения выезда.
                    </p>
                    <button onClick={() => setIsSuccess(false)} className="px-8 py-4 bg-primary-main text-white font-bold rounded-xl hover:bg-primary-main/90 transition-colors">
                        Отправить новую заявку
                    </button>
                </div>
            </section>
        );
    }

    return (
        <section className="py-24 bg-white" id="order">
            <div className="container mx-auto px-4 max-w-5xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-primary-main mb-6">
                            Вызвать <span className="text-accent-cyan">Мастера</span>
                        </h2>
                        <div className="w-24 h-1 bg-accent-cyan rounded-full mb-8" />

                        <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
                            Оставьте заявку онлайн, и мы перезвоним в течение 5 минут. Если ситуация экстренная, лучше звоните напрямую.
                        </p>

                        <div className="bg-background-light p-8 rounded-2xl border border-slate-100">
                            <h4 className="font-bold text-xl text-primary-main mb-6">График работы: 24/7</h4>
                            <p className="text-muted-foreground">Без выходных и праздников. Ночной выезд (с 22:00 до 07:00) тарифицируется с наценкой.</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 md:p-10 rounded-3xl shadow-2xl border border-slate-100 relative">
                        <h3 className="text-2xl font-bold font-heading text-primary-main mb-8">Форма Заявки</h3>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-primary-main mb-2">Ваше Имя *</label>
                                <input
                                    {...register('name')}
                                    type="text"
                                    className={`w-full p-4 rounded-xl border ${errors.name ? 'border-destructive focus:ring-destructive' : 'border-slate-200 focus:ring-accent-cyan'} focus:outline-none focus:ring-2`}
                                    placeholder="Иван Иванов"
                                />
                                {errors.name && <p className="text-destructive text-sm mt-1">{errors.name.message}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-primary-main mb-2">Телефон *</label>
                                <input
                                    {...register('phone')}
                                    type="tel"
                                    className={`w-full p-4 rounded-xl border ${errors.phone ? 'border-destructive focus:ring-destructive' : 'border-slate-200 focus:ring-accent-cyan'} focus:outline-none focus:ring-2`}
                                    placeholder="+373 (__) __ __ __"
                                />
                                {errors.phone && <p className="text-destructive text-sm mt-1">{errors.phone.message}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-primary-main mb-2">Адрес выезда *</label>
                                <input
                                    {...register('address')}
                                    type="text"
                                    className={`w-full p-4 rounded-xl border ${errors.address ? 'border-destructive focus:ring-destructive' : 'border-slate-200 focus:ring-accent-cyan'} focus:outline-none focus:ring-2`}
                                    placeholder="Улица, Дом, Квартира"
                                />
                                {errors.address && <p className="text-destructive text-sm mt-1">{errors.address.message}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-primary-main mb-2">Описание проблемы</label>
                                <textarea
                                    {...register('description')}
                                    rows={3}
                                    className="w-full p-4 rounded-xl border border-slate-200 focus:ring-accent-cyan focus:outline-none focus:ring-2 resize-none"
                                    placeholder="Например, течет труба на кухне под раковиной..."
                                />
                            </div>

                            <label className="flex items-start gap-3 mt-6 cursor-pointer">
                                <input
                                    {...register('consent')}
                                    type="checkbox"
                                    className="mt-1 w-5 h-5 rounded border-slate-300 text-accent-cyan focus:ring-accent-cyan"
                                />
                                <span className="text-sm text-muted-foreground leading-snug">
                                    Я согласен на обработку персональных данных в соответствии с <a href="/privacy-policy" className="text-accent-cyan hover:underline">политикой конфиденциальности</a>
                                </span>
                            </label>
                            {errors.consent && <p className="text-destructive text-sm mt-1">{errors.consent.message}</p>}
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="mt-8 w-full bg-primary-main hover:bg-primary-main/90 text-white font-bold text-lg py-4 rounded-xl shadow-xl shadow-primary-main/20 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="w-6 h-6 animate-spin" />
                                    Отправка...
                                </>
                            ) : (
                                'Оформить Вызов'
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}
