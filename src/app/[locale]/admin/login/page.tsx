'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Loader2, Mail, Lock } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';

export default function AdminLoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const t = useTranslations('Admin.login');
    const locale = useLocale();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const supabase = createClient();

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(t('error_credentials'));
            setLoading(false);
        } else {
            router.push(`/${locale}/admin`);
            router.refresh();
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-3xl shadow-xl overflow-hidden">
                <div className="bg-primary-main p-8 text-center">
                    <h2 className="text-2xl font-heading font-extrabold text-white">{t('title')}</h2>
                    <p className="text-white/70 mt-2 text-sm">{t('subtitle')}</p>
                </div>
                <div className="p-8">
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm font-medium">
                            {error}
                        </div>
                    )}
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">{t('email_label')}</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-accent-cyan"
                                    placeholder={t('email_placeholder')}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">{t('password_label')}</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-accent-cyan"
                                    placeholder={t('password_placeholder')}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading || !email || !password}
                            className="w-full bg-accent-cyan hover:bg-accent-cyan/90 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-colors disabled:opacity-70 mt-4"
                        >
                            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : t('btn_login')}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
