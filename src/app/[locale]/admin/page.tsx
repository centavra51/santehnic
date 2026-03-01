'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Loader2 } from 'lucide-react';

// This is just a stub for demonstrating the UI. 
// In a real app, you would use @supabase/ssr for server-side auth/data.

type Lead = {
    id: string;
    created_at: string;
    name: string;
    phone: string;
    address: string;
    description: string;
    status: 'new' | 'processing' | 'done';
};

const MOCK_LEADS: Lead[] = [
    { id: '1', created_at: new Date().toISOString(), name: 'Иван', phone: '+373 69 123 456', address: 'Кишинев, Московский Проспект 10', description: 'Течет раковина', status: 'new' },
    { id: '2', created_at: new Date(Date.now() - 3600000).toISOString(), name: 'Мария', phone: '+373 79 987 654', address: 'Рышкановка', description: 'Установка стиральной машины', status: 'processing' },
];

export default function AdminLeadsPage() {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate fetching from Supabase
        const fetchLeads = async () => {
            // const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
            // const { data } = await supabase.from('leads').select('*').order('created_at', { ascending: false });

            setTimeout(() => {
                setLeads(MOCK_LEADS);
                setLoading(false);
            }, 1000);
        };

        fetchLeads();
    }, []);

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'new': return <span className="bg-destructive/10 text-destructive px-3 py-1 rounded-full text-xs font-bold uppercase">Новая</span>;
            case 'processing': return <span className="bg-yellow-500/10 text-yellow-600 px-3 py-1 rounded-full text-xs font-bold uppercase">В работе</span>;
            case 'done': return <span className="bg-success-green/10 text-success-green px-3 py-1 rounded-full text-xs font-bold uppercase">Готово</span>;
            default: return null;
        }
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-heading font-extrabold text-primary-main">Заявки</h1>
                    <p className="text-muted-foreground mt-2">Управление поступающими лидами с сайта.</p>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-sm uppercase tracking-wider">
                                <th className="py-4 px-6 font-medium">Дата / Время</th>
                                <th className="py-4 px-6 font-medium">Клиент</th>
                                <th className="py-4 px-6 font-medium">Детали проблемы</th>
                                <th className="py-4 px-6 font-medium">Статус</th>
                                <th className="py-4 px-6 font-medium text-right">Действия</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="py-12 text-center text-slate-400">
                                        <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
                                        Загрузка заявок...
                                    </td>
                                </tr>
                            ) : leads.map(lead => (
                                <tr key={lead.id} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="py-4 px-6 text-sm text-slate-500">
                                        {new Date(lead.created_at).toLocaleString('ru-RU')}
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="font-bold text-primary-main">{lead.name}</div>
                                        <div className="text-sm text-accent-cyan">{lead.phone}</div>
                                    </td>
                                    <td className="py-4 px-6 max-w-xs">
                                        <div className="text-sm font-medium text-slate-700 truncate">{lead.address}</div>
                                        <div className="text-sm text-slate-500 truncate">{lead.description}</div>
                                    </td>
                                    <td className="py-4 px-6">
                                        {getStatusBadge(lead.status)}
                                    </td>
                                    <td className="py-4 px-6 text-right">
                                        <button className="text-sm font-medium text-accent-cyan hover:underline">
                                            Редактировать
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
