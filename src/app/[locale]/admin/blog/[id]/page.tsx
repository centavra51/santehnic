'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Save, ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function EditArticlePage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const [saving, setSaving] = useState(false);
    const [loading, setLoading] = useState(true);

    // @ts-ignore - unwrapping in a real scenario would be async, but simpler here
    const articleId = params.id;

    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        excerpt: '',
        image_url: '',
        content: '',
        locale: 'ru',
        is_published: false
    });

    useEffect(() => {
        const fetchArticle = async () => {
            const supabase = createClient();
            const { data, error } = await supabase.from('articles').select('*').eq('id', articleId).single();
            if (data) {
                setFormData({
                    title: data.title || '',
                    slug: data.slug || '',
                    excerpt: data.excerpt || '',
                    image_url: data.image_url || '',
                    content: data.content || '',
                    locale: data.locale || 'ru',
                    is_published: data.is_published || false
                });
            } else if (error) {
                alert('Не удалось загрузить статью: ' + error.message);
                router.push('/admin/blog');
            }
            setLoading(false);
        };
        fetchArticle();
    }, [articleId, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        const supabase = createClient();

        const { error } = await supabase.from('articles').update({
            title: formData.title,
            slug: formData.slug,
            excerpt: formData.excerpt,
            image_url: formData.image_url,
            content: formData.content,
            locale: formData.locale,
            is_published: formData.is_published,
            updated_at: new Date().toISOString()
        }).eq('id', articleId);

        setSaving(false);

        if (error) {
            alert('Ошибка при сохранении: ' + error.message);
        } else {
            router.push('/admin/blog');
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center py-20">
                <Loader2 className="w-10 h-10 animate-spin text-accent-cyan" />
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
                <Link href="/admin/blog" className="p-2 bg-white rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors">
                    <ArrowLeft className="w-5 h-5 text-slate-500" />
                </Link>
                <div>
                    <h1 className="text-3xl font-heading font-extrabold text-primary-main">Редактировать статью</h1>
                    <p className="text-muted-foreground mt-1">Изменение существующего материала.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 space-y-6">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Заголовок</label>
                        <input
                            required
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-accent-cyan"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">ЧПУ (Slug)</label>
                        <input
                            required
                            type="text"
                            value={formData.slug}
                            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                            className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-accent-cyan"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Язык (Locale)</label>
                        <select
                            value={formData.locale}
                            onChange={(e) => setFormData({ ...formData, locale: e.target.value })}
                            className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-accent-cyan"
                        >
                            <option value="ru">Русский (RU)</option>
                            <option value="ro">Румынский (RO)</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Изображение (URL)</label>
                        <input
                            type="text"
                            value={formData.image_url}
                            onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                            className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-accent-cyan"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Краткое описание (Excerpt)</label>
                    <textarea
                        rows={3}
                        value={formData.excerpt}
                        onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                        className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-accent-cyan"
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Контент (HTML/Markdown)</label>
                    <textarea
                        required
                        rows={10}
                        value={formData.content}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-accent-cyan font-mono text-sm"
                    />
                </div>

                <div className="flex items-center gap-3 py-4 border-t border-slate-100">
                    <input
                        type="checkbox"
                        id="published"
                        checked={formData.is_published}
                        onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
                        className="w-5 h-5 rounded text-accent-cyan focus:ring-accent-cyan"
                    />
                    <label htmlFor="published" className="font-bold text-slate-700 cursor-pointer">
                        Опубликовать статью сразу
                    </label>
                </div>

                <div className="flex justify-end pt-4">
                    <button
                        type="submit"
                        disabled={saving}
                        className="bg-accent-cyan hover:bg-accent-cyan/90 text-white font-bold px-8 py-3 rounded-xl flex items-center gap-2 transition-colors disabled:opacity-70"
                    >
                        {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                        Сохранить изменения
                    </button>
                </div>
            </form>
        </div>
    );
}
