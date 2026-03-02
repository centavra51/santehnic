'use client';

import { Link, useRouter } from '@/i18n/routing';
import { LayoutDashboard, Users, Settings, LogOut, FileText, Image as ImageIcon } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();

    const handleLogout = async () => {
        const supabase = createClient();
        await supabase.auth.signOut();
        window.location.href = '/ru/admin/login';
    };
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
                        <span className="font-medium">Заявки (Leads)</span>
                    </Link>
                    <Link href="/admin/calculator" className="flex items-center gap-3 px-4 py-3 rounded-lg text-white/70 hover:bg-white/10 hover:text-white transition-colors">
                        <Settings className="w-5 h-5 text-accent-cyan" />
                        <span className="font-medium">Цены (Калькулятор)</span>
                    </Link>
                    <Link href="/admin/blog" className="flex items-center gap-3 px-4 py-3 rounded-lg text-white/70 hover:bg-white/10 hover:text-white transition-colors">
                        <Users className="w-5 h-5 text-accent-cyan" />
                        <span className="font-medium">Блог (Статьи)</span>
                    </Link>
                    <Link href="/admin/images" className="flex items-center gap-3 px-4 py-3 rounded-lg text-white/70 hover:bg-white/10 hover:text-white transition-colors">
                        <ImageIcon className="w-5 h-5 text-accent-cyan" />
                        <span className="font-medium">Изображения</span>
                    </Link>
                </nav>

                <div className="p-4 border-t border-white/10">
                    <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 w-full text-left rounded-lg text-white/70 hover:bg-white/10 hover:text-white transition-colors">
                        <LogOut className="w-5 h-5 text-accent-cyan" />
                        <span className="font-medium">Выйти</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto">
                <header className="bg-white border-b border-slate-200 p-4 md:px-8 flex justify-between items-center sticky top-0 md:hidden z-10">
                    <Link href="/admin" className="text-xl font-heading font-extrabold text-primary-main">
                        Santehnik<span className="text-accent-cyan">Admin</span>
                    </Link>
                    <button onClick={handleLogout} className="text-slate-500 hover:text-primary-main transition-colors">
                        <LogOut className="w-6 h-6" />
                    </button>
                </header>
                <div className="p-4 md:p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
