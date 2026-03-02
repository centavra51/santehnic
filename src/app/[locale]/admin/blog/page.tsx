'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Loader2, Plus, Edit, Trash2 } from 'lucide-react';

type Article = {
    id: string;
    title: string;
    slug: string;
    locale: string;
    is_published: boolean;
    created_at: string;
};

export default function AdminBlogPage() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchArticles = async () => {
        setLoading(true);
        const supabase = createClient();
        const { data } = await supabase.from('articles').select('id, title, slug, locale, is_published, created_at').order('created_at', { ascending: false });
        if (data) setArticles(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchArticles();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm('Вы уверены, что хотите удалить эту статью?')) return;

        const supabase = createClient();
        const { error } = await supabase.from('articles').delete().eq('id', id);
        if (!error) {
            setArticles(articles.filter(a => a.id !== id));
        } else {
            alert('Ошибка при удалении: ' + error.message);
        }
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-heading font-extrabold text-primary-main">Статьи Блога</h1>
                    <p className="text-muted-foreground mt-2">Управление полезными советами и новостями.</p>
                </div>
                <Link
                    href="/admin/blog/new"
                    className="bg-accent-cyan hover:bg-accent-cyan/90 text-white font-bold px-6 py-3 rounded-xl flex items-center gap-2 transition-colors"
                >
                    <Plus className="w-5 h-5" />
                    Новая статья
                </Link>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-sm uppercase tracking-wider">
                                <th className="py-4 px-6 font-medium">Название / Ссылка</th>
                                <th className="py-4 px-6 font-medium">Язык</th>
                                <th className="py-4 px-6 font-medium">Статус</th>
                                <th className="py-4 px-6 font-medium">Дата добавления</th>
                                <th className="py-4 px-6 font-medium text-right">Действия</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="py-12 text-center text-slate-400">
                                        <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
                                        Загрузка статей...
                                    </td>
                                </tr>
                            ) : articles.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="py-12 text-center text-slate-500">
                                        Статей пока нет. Создайте первую!
                                    </td>
                                </tr>
                            ) : articles.map(article => (
                                <tr key={article.id} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="py-4 px-6">
                                        <div className="font-bold text-primary-main">{article.title}</div>
                                        <div className="text-sm text-slate-500 truncate max-w-xs block">/{article.locale}/articles/{article.slug}</div>
                                    </td>
                                    <td className="py-4 px-6 relative">
                                        <span className="uppercase text-xs font-bold text-slate-500 bg-slate-100 rounded px-2 py-1">{article.locale}</span>
                                    </td>
                                    <td className="py-4 px-6">
                                        {article.is_published ? (
                                            <span className="bg-success-green/10 text-success-green px-3 py-1 rounded-full text-xs font-bold uppercase transition-colors">Опубликовано</span>
                                        ) : (
                                            <span className="bg-slate-100 text-slate-500 px-3 py-1 rounded-full text-xs font-bold uppercase">Черновик</span>
                                        )}
                                    </td>
                                    <td className="py-4 px-6 text-sm text-slate-500">
                                        {new Date(article.created_at).toLocaleDateString('ru-RU')}
                                    </td>
                                    <td className="py-4 px-6 text-right space-x-3">
                                        <Link href={`/admin/blog/${article.id}`} className="inline-flex items-center text-accent-cyan hover:underline group-hover:bg-cyan-50 p-2 rounded-lg transition-colors">
                                            <Edit className="w-4 h-4" />
                                        </Link>
                                        <button onClick={() => handleDelete(article.id)} className="inline-flex items-center text-destructive hover:underline group-hover:bg-red-50 p-2 rounded-lg transition-colors">
                                            <Trash2 className="w-4 h-4" />
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
