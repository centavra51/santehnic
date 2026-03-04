'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import {
    Loader2,
    ClipboardList,
    Clock,
    MapPin,
    User,
    Info,
    Database,
    RefreshCw,
    CheckCircle2,
    AlertCircle,
    Search,
    Calendar,
    Phone,
    Download
} from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';

type Lead = {
    id: string;
    created_at: string;
    name: string;
    phone: string;
    address: string;
    problem_description: string;
    service_type: string;
    quiz_data: any;
    status: 'new' | 'processing' | 'done' | 'cancelled';
};

export default function AdminLeadsPage() {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(true);
    const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);
    const [testing, setTesting] = useState(false);
    const t = useTranslations('Admin.leads');
    const locale = useLocale();

    const fetchLeads = async () => {
        setLoading(true);
        const supabase = createClient();
        const { data, error } = await supabase
            .from('leads')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching leads:', error);
            alert('Ошибка при загрузке заявок. Проверьте консоль.');
        } else {
            console.log('Fetched leads:', data);
            // Diagnostic mapping for schema verification
            if (data && data.length > 0) {
                console.log('--- DATABASE SCHEMA DIAGNOSTICS ---');
                console.log('Available columns in leads table:', Object.keys(data[0]));
                console.log('Recommended columns for full functionality: id, created_at, name, phone, address, service_type, problem_description, quiz_data, status');
                console.log('--- END DIAGNOSTICS ---');
            }
            setLeads(data || []);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchLeads();
    }, []);

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'new': return <span className="bg-destructive/10 text-destructive px-3 py-1 rounded-full text-xs font-bold uppercase">{t('status_new')}</span>;
            case 'processing': return <span className="bg-yellow-500/10 text-yellow-600 px-3 py-1 rounded-full text-xs font-bold uppercase">{t('status_processing')}</span>;
            case 'done': return <span className="bg-success-green/10 text-success-green px-3 py-1 rounded-full text-xs font-bold uppercase">{t('status_done')}</span>;
            default: return null;
        }
    };

    const runTest = async () => {
        setTesting(true);
        setTestResult(null);
        const supabase = createClient();

        try {
            // 1. Try to fetch
            const { data, error: fetchError } = await supabase.from('leads').select('count', { count: 'exact' }).limit(1);
            if (fetchError) throw new Error(`Fetch error: ${fetchError.message}`);

            // 2. Try a dummy insert
            const { error: insertError } = await supabase.from('leads').insert([{
                name: 'TEST_CONNECTION',
                phone: '000000000',
                address: 'TEST',
                status: 'new'
            }]);

            if (insertError) throw new Error(`Insert error: ${insertError.message}`);

            setTestResult({ success: true, message: 'Соединение установлено! RLS разрешает чтение и запись.' });
            fetchLeads(); // Refresh list to see if TEST lead appeared
        } catch (err: any) {
            setTestResult({ success: false, message: err.message });
        } finally {
            setTesting(false);
        }
    };

    const updateLeadStatus = async (leadId: string, currentStatus: string) => {
        const statusMap: Record<string, string> = {
            'new': 'processing',
            'processing': 'done',
            'done': 'new'
        };
        const nextStatus = statusMap[currentStatus] || 'new';

        const supabase = createClient();
        const { error } = await supabase
            .from('leads')
            .update({ status: nextStatus })
            .eq('id', leadId);

        if (!error) {
            fetchLeads();
        } else {
            console.error('Update status error:', error);
            alert('Failed to update status');
        }
    };

    const deleteLead = async (leadId: string) => {
        if (!window.confirm('Вы уверены, что хотите НАВСЕГДА удалить эту заявку из базы данных Supabase? Это действие нельзя отменить.')) return;

        const supabase = createClient();
        const { error } = await supabase
            .from('leads')
            .delete()
            .eq('id', leadId);

        if (!error) {
            fetchLeads();
        } else {
            console.error('Delete error:', error);
            alert('Failed to delete lead');
        }
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-heading font-extrabold text-primary-main">{t('title')}</h1>
                    <p className="text-muted-foreground mt-2">{t('subtitle')}</p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                    <button
                        onClick={runTest}
                        disabled={testing}
                        className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors disabled:opacity-50"
                    >
                        {testing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Database className="w-4 h-4" />}
                        Проверить БД
                    </button>
                    <button
                        onClick={fetchLeads}
                        className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors"
                    >
                        <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                        {t('btn_refresh')}
                    </button>
                </div>
            </div>

            {testResult && (
                <div className={`mb-6 p-4 rounded-xl border flex items-center gap-3 ${testResult.success ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-700'}`}>
                    {testResult.success ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                    <span className="text-sm font-medium">{testResult.message}</span>
                    <button onClick={() => setTestResult(null)} className="ml-auto text-xs underline">Закрыть</button>
                </div>
            )}

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-sm uppercase tracking-wider">
                                <th className="py-4 px-6 font-medium">{t('col_date')}</th>
                                <th className="py-4 px-6 font-medium">{t('col_client')}</th>
                                <th className="py-4 px-6 font-medium">{t('col_details')}</th>
                                <th className="py-4 px-6 font-medium">{t('col_status')}</th>
                                <th className="py-4 px-6 font-medium text-right">{t('col_actions')}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="py-12 text-center text-slate-400">
                                        <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
                                        {t('loading')}
                                    </td>
                                </tr>
                            ) : leads.map(lead => (
                                <tr key={lead.id} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="py-4 px-6 text-sm text-slate-500">
                                        <div className="flex items-center gap-2">
                                            <Clock className="w-4 h-4 text-slate-400" />
                                            {new Date(lead.created_at).toLocaleString(locale === 'ro' ? 'ro-RO' : 'ru-RU')}
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="flex flex-col">
                                            <div className="font-bold text-primary-main flex items-center gap-2">
                                                <User className="w-4 h-4 text-slate-400" />
                                                {lead.name}
                                            </div>
                                            <div className="text-sm text-accent-cyan font-medium">{lead.phone}</div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="space-y-1">
                                            {lead.address && (
                                                <div className="text-sm font-medium text-slate-700 flex items-center gap-2">
                                                    <MapPin className="w-4 h-4 text-slate-400" />
                                                    {lead.address}
                                                </div>
                                            )}
                                            {lead.service_type && (
                                                <div className="text-sm font-bold text-accent-cyan flex items-center gap-2">
                                                    <ClipboardList className="w-4 h-4" />
                                                    {lead.service_type}
                                                </div>
                                            )}
                                            {lead.problem_description && (
                                                <div className="text-sm text-slate-500 flex items-start gap-2">
                                                    <Info className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                                                    <span>{lead.problem_description}</span>
                                                </div>
                                            )}
                                            {lead.quiz_data && lead.quiz_data.photoUrl && (
                                                <div className="mt-2">
                                                    <a
                                                        href={lead.quiz_data.photoUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-block p-1 bg-slate-100 rounded-lg border border-slate-200 hover:border-accent-cyan transition-colors"
                                                    >
                                                        <img
                                                            src={lead.quiz_data.photoUrl}
                                                            alt="Quiz issue"
                                                            className="w-16 h-16 object-cover rounded-md"
                                                        />
                                                    </a>
                                                </div>
                                            )}
                                            {lead.quiz_data && Object.keys(lead.quiz_data).length > 0 && lead.quiz_data.serviceType && (
                                                <div className="mt-2 p-3 bg-slate-50 rounded-lg border border-slate-100 text-xs">
                                                    <div className="font-bold text-primary-main mb-1 flex items-center gap-1 uppercase tracking-wider">
                                                        <ClipboardList className="w-3.5 h-3.5" />
                                                        {t('quiz_label')}
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-slate-600">
                                                        <span>{t('quiz_service')}:</span> <span className="font-medium text-slate-900">{lead.quiz_data.serviceType || '---'}</span>
                                                        <span>{t('quiz_meters')}:</span> <span className="font-medium text-slate-900">{lead.quiz_data.meters || 0}</span>
                                                        <span>{t('quiz_rooms')}:</span> <span className="font-medium text-slate-900">{lead.quiz_data.rooms || 1}</span>
                                                        <span>{t('quiz_urgency')}:</span> <span className="font-medium text-slate-900">{lead.quiz_data.urgency || '---'}</span>
                                                        {lead.quiz_data.totalPrice && (
                                                            <>
                                                                <span className="font-bold text-primary-main mt-1 pt-1 border-t border-slate-200">{t('quiz_total')}:</span>
                                                                <span className="font-bold text-accent-cyan mt-1 pt-1 border-t border-slate-200">{lead.quiz_data.totalPrice} MDL</span>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <button
                                            onClick={() => updateLeadStatus(lead.id, lead.status)}
                                            className="transition-transform active:scale-95"
                                        >
                                            {getStatusBadge(lead.status)}
                                        </button>
                                    </td>
                                    <td className="py-4 px-6 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => deleteLead(lead.id)}
                                                className="p-2 text-slate-400 hover:text-destructive hover:bg-destructive/5 rounded-lg transition-colors"
                                                title={t('btn_delete')}
                                            >
                                                <AlertCircle className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div >
    );
}
