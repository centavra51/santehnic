'use client';

import { useState, useEffect } from 'react';
import { Link, useRouter, usePathname } from '@/i18n/routing';
import { LayoutDashboard, Users, Settings, LogOut, FileText, Image as ImageIcon, Loader2, Globe } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { useTranslations, useLocale } from 'next-intl';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const t = useTranslations('Admin');
    const locale = useLocale();

    const [sessionLoading, setSessionLoading] = useState(true);

    useEffect(() => {
        // Skip session check on the login page itself to prevent redirect loop
        const isLoginPage = window.location.pathname.includes('/admin/login');
        if (isLoginPage) {
            setSessionLoading(false);
            return;
        }

        const checkSession = async () => {
            const supabase = createClient();
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                const loc = window.location.pathname.split('/')[1] || 'ru';
                window.location.href = `/${loc}/admin/login`;
            } else {
                setSessionLoading(false);
            }
        };
        checkSession();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleLogout = async () => {
        const supabase = createClient();
        await supabase.auth.signOut();
        const loc = window.location.pathname.split('/')[1] || 'ru';
        window.location.href = `/${loc}/admin/login`;
    };

    const switchLocale = () => {
        const newLocale = locale === 'ru' ? 'ro' : 'ru';
        // Navigate to the same admin page in the other locale
        window.location.href = `/${newLocale}${pathname}`;
    };

    if (sessionLoading) {
        return (
            <div className="h-screen bg-slate-50 flex items-center justify-center">
                <Loader2 className="w-10 h-10 animate-spin text-accent-cyan" />
            </div>
        );
    }
    return (
        <div className="flex h-screen bg-slate-50">
            {/* Sidebar */}
            <aside className="w-64 bg-primary-main text-white flex flex-col hidden md:flex">
                <div className="p-6 border-b border-white/10">
                    <Link href="/admin" className="text-xl font-heading font-extrabold text-white">
                        Santehnik<span className="text-accent-cyan">Admin</span>
                    </Link>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-lg text-white/70 hover:bg-white/10 hover:text-white transition-colors">
                        <LayoutDashboard className="w-5 h-5 text-accent-cyan" />
                        <span className="font-medium">{t('sidebar.leads')}</span>
                    </Link>
                    <Link href="/admin/calculator" className="flex items-center gap-3 px-4 py-3 rounded-lg text-white/70 hover:bg-white/10 hover:text-white transition-colors">
                        <Settings className="w-5 h-5 text-accent-cyan" />
                        <span className="font-medium">{t('sidebar.calculator')}</span>
                    </Link>
                    <Link href="/admin/blog" className="flex items-center gap-3 px-4 py-3 rounded-lg text-white/70 hover:bg-white/10 hover:text-white transition-colors">
                        <Users className="w-5 h-5 text-accent-cyan" />
                        <span className="font-medium">{t('sidebar.blog')}</span>
                    </Link>
                    <Link href="/admin/images" className="flex items-center gap-3 px-4 py-3 rounded-lg text-white/70 hover:bg-white/10 hover:text-white transition-colors">
                        <ImageIcon className="w-5 h-5 text-accent-cyan" />
                        <span className="font-medium">{t('sidebar.images')}</span>
                    </Link>
                </nav>

                <div className="p-4 border-t border-white/10 space-y-2">
                    <button onClick={switchLocale} className="flex items-center gap-3 px-4 py-3 w-full text-left rounded-lg text-white/70 hover:bg-white/10 hover:text-white transition-colors">
                        <Globe className="w-5 h-5 text-accent-cyan" />
                        <span className="font-medium">{locale === 'ru' ? 'Română' : 'Русский'}</span>
                    </button>
                    <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 w-full text-left rounded-lg text-white/70 hover:bg-white/10 hover:text-white transition-colors">
                        <LogOut className="w-5 h-5 text-accent-cyan" />
                        <span className="font-medium">{t('sidebar.logout')}</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto">
                <header className="bg-white border-b border-slate-200 p-4 md:px-8 flex justify-between items-center sticky top-0 md:hidden z-10">
                    <Link href="/admin" className="text-xl font-heading font-extrabold text-primary-main">
                        Santehnik<span className="text-accent-cyan">Admin</span>
                    </Link>
                    <div className="flex items-center gap-2">
                        <button onClick={switchLocale} className="text-slate-500 hover:text-primary-main transition-colors px-2 py-1 rounded-lg border border-slate-200 text-sm font-bold">
                            {locale === 'ru' ? 'RO' : 'RU'}
                        </button>
                        <button onClick={handleLogout} className="text-slate-500 hover:text-primary-main transition-colors">
                            <LogOut className="w-6 h-6" />
                        </button>
                    </div>
                </header>
                <div className="p-4 md:p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
