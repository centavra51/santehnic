'use client';

import { useState, useEffect } from 'react';
import { Save, Loader2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

const INITIAL_RATES = {
    'Устранение засора': 400,
    'Замена смесителя': 300,
    'Установка унитаза': 600,
    'Разводка труб': 800,
    'Монтаж отопления': 1000,
    'Аварийный выезд': 500,
    'За метр трубы': 50,
    'За доп. помещение': 100,
};

export default function CalculatorSettingsPage() {
    const [rates, setRates] = useState(INITIAL_RATES);
    const [saving, setSaving] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRates = async () => {
            const supabase = createClient();
            const { data } = await supabase.from('calculator_settings').select('service_name, price_mdl');
            if (data && data.length > 0) {
                const newRates = { ...INITIAL_RATES };
                data.forEach(item => {
                    if (item.service_name in newRates) {
                        newRates[item.service_name as keyof typeof INITIAL_RATES] = Number(item.price_mdl);
                    }
                });
                setRates(newRates);
            }
            setLoading(false);
        };
        fetchRates();
    }, []);

    const handleSave = async () => {
        setSaving(true);
        const supabase = createClient();

        const updates = Object.entries(rates).map(([key, value]) => ({
            service_name: key,
            price_mdl: value
        }));

        const { error } = await supabase.from('calculator_settings').upsert(updates, { onConflict: 'service_name' });

        setSaving(false);
        if (error) {
            alert('Ошибка при сохранении: ' + error.message);
        } else {
            alert('Цены успешно обновлены!');
        }
    };

    return (
        <div className="max-w-4xl">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-heading font-extrabold text-primary-main">Настройки Калькулятора</h1>
                    <p className="text-muted-foreground mt-2">Изменение базовых тарифов для Quiz-калькулятора на главной.</p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="bg-accent-cyan hover:bg-accent-cyan/90 text-white font-bold px-6 py-3 rounded-xl flex items-center gap-2 transition-colors disabled:opacity-70"
                >
                    {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                    Сохранить изменения
                </button>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm">
                <h3 className="text-xl font-bold font-heading text-primary-main mb-6">Базовые услуги (MDL)</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {Object.entries(rates).map(([key, value]) => (
                        <div key={key}>
                            <label className="block text-sm font-bold text-slate-700 mb-2">{key}</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    value={value}
                                    onChange={(e) => setRates({ ...rates, [key]: Number(e.target.value) })}
                                    className="w-full p-3 pl-4 pr-12 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-accent-cyan transition-shadow"
                                />
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">MDL</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-8 p-4 bg-blue-50 text-blue-800 rounded-xl text-sm border border-blue-100">
                    <strong>Примечание:</strong> Изменение этих значений немедленно отразится на калькуляторе для новых пользователей.
                </div>
            </div>
        </div>
    );
}
