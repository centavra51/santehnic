'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Save, ArrowLeft, Loader2, Upload, Link as LinkIcon, Image as ImageIcon, Bold, Italic, List, Heading1, Heading2, Minus, Layout } from 'lucide-react';
import Link from 'next/link';

const TEMPLATES = {
    step_by_step: {
        ru: `# [Название инструкции]\n\nВ этом руководстве мы пошагово разберем, как [описание задачи].\n\n---\n\n## 🛠 Подготовка\nПеред началом вам понадобятся:\n- [Инструмент 1]\n- [Материал 1]\n- [Время: ~30 минут]\n\n---\n\n## Шаг 1: [Название шага]\n[Описание того, что нужно сделать на этом этапе. Будьте максимально подробны.]\n\n![подпись к фото](/blog/image.jpg)\n\n> [!] **Совет:** Чтобы упростить задачу, попробуйте [совет].\n\n---\n\n## Шаг 2: [Название шага]\n[Продолжаем процесс...]\n\n![подпись к фото](/blog/image.jpg)\n\n---\n\n## ✅ Итог\nПоздравляем! Вы успешно справились с [задачей].\n\n[Призыв к действию: напишите нам, если возникли сложности]`,
        ro: `# [Titlul instrucțiunii]\n\nÎn acest ghid, vom analiza pas cu pas cum să [descrierea sarcinii].\n\n---\n\n## 🛠 Pregătire\nÎnainte de a începe, veți avea nevoie de:\n- [Instrument 1]\n- [Material 1]\n- [Timp: ~30 minute]\n\n---\n\n## Pasul 1: [Numele pasului]\n[Descrierea a ceea ce trebuie făcut în această etapă. Fiți cât mai detaliat.]\n\n![legendă foto](/blog/image.jpg)\n\n> [!] **Sfat:** Pentru a simplifica sarcina, încercați [sfat].\n\n---\n\n## Pasul 2: [Numele pasului]\n[Continuăm procesul...]\n\n![legendă foto](/blog/image.jpg)\n\n---\n\n## ✅ Rezultat\nFelicitări! Ați finalizat cu succes [sarcina].\n\n[Apel la acțiune: scrieți-ne dacă întâmpinați dificultăți]`
    }
};

export default function NewArticlePage() {
    const router = useRouter();
    const [saving, setSaving] = useState(false);

    const [formData, setFormData] = useState({
        title_ru: '',
        title_ro: '',
        slug: '',
        excerpt_ru: '',
        excerpt_ro: '',
        content_ru: '',
        content_ro: '',
        image_url: '',
        is_published: false,
        seo_title_ru: '',
        seo_title_ro: '',
        seo_description_ru: '',
        seo_description_ro: ''
    });

    const applyTemplate = (lang: 'ru' | 'ro') => {
        if (confirm(lang === 'ru' ? 'Заменить текущий текст шаблоном?' : 'Înlocuiți textul curent cu șablonul?')) {
            setFormData(prev => ({
                ...prev,
                [`content_${lang}`]: TEMPLATES.step_by_step[lang]
            }));
        }
    };

    const [uploading, setUploading] = useState(false);

    const insertText = (lang: 'ru' | 'ro', before: string, after: string) => {
        const textarea = document.getElementById(`content_${lang}`) as HTMLTextAreaElement;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const text = textarea.value;
        const selected = text.substring(start, end);
        const newText = text.substring(0, start) + before + selected + after + text.substring(end);

        setFormData(prev => ({
            ...prev,
            [`content_${lang}`]: newText
        }));

        // Reset cursor after state update
        setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(start + before.length, end + before.length);
        }, 0);
    };

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        const supabase = createClient();
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `blog-${Date.now()}.${fileExt}`;
            const { error: uploadError } = await supabase.storage
                .from('site-media')
                .upload(fileName, file);

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage.from('site-media').getPublicUrl(fileName);

            // Set image_url if empty, otherwise add to content
            if (!formData.image_url) {
                setFormData(prev => ({ ...prev, image_url: publicUrl }));
            }

            // Copy to clipboard or alert
            await navigator.clipboard.writeText(`![image](${publicUrl})`);
            alert('Код изображения (Markdown) скопирован! Вставьте его в текст статьи.');
        } catch (error: any) {
            alert('Ошибка загрузки: ' + error.message);
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        const supabase = createClient();

        const { error } = await supabase.from('articles').insert([
            {
                title_ru: formData.title_ru,
                title_ro: formData.title_ro,
                slug: formData.slug,
                excerpt_ru: formData.excerpt_ru,
                excerpt_ro: formData.excerpt_ro,
                content_ru: formData.content_ru,
                content_ro: formData.content_ro,
                image_url: formData.image_url,
                is_published: formData.is_published,
                seo_title_ru: formData.seo_title_ru,
                seo_title_ro: formData.seo_title_ro,
                seo_description_ru: formData.seo_description_ru,
                seo_description_ro: formData.seo_description_ro
            }
        ]);

        setSaving(false);

        if (error) {
            alert('Ошибка при сохранении: ' + error.message);
        } else {
            router.push('/admin/blog');
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
                <Link href="/admin/blog" className="p-2 bg-white rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors">
                    <ArrowLeft className="w-5 h-5 text-slate-500" />
                </Link>
                <div>
                    <h1 className="text-3xl font-heading font-extrabold text-primary-main">Новая статья</h1>
                    <p className="text-muted-foreground mt-1">Создание нового материала для блога.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 space-y-6">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 bg-slate-50 rounded-xl border border-slate-100">
                    <div className="space-y-4">
                        <label className="block text-sm font-bold text-slate-700">Общие настройки</label>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">ЧПУ (Slug) *</label>
                            <input
                                required
                                type="text"
                                value={formData.slug}
                                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-accent-cyan bg-white"
                                placeholder="kak-vybrat-smesitel"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Превью-картинка (URL)</label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={formData.image_url}
                                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                                    className="flex-1 p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-accent-cyan bg-white"
                                    placeholder="/blog/image1.jpg"
                                />
                                <label className="cursor-pointer bg-white border border-slate-200 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                                    {uploading ? <Loader2 className="w-5 h-5 animate-spin text-accent-cyan" /> : <Upload className="w-5 h-5 text-slate-500" />}
                                    <input type="file" className="hidden" onChange={handleUpload} accept="image/*" />
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {/* Russian Version */}
                    <div className="space-y-6 border-r border-slate-100 pr-0 lg:pr-10">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded">RU</span>
                            <h2 className="font-bold text-lg text-slate-800">Русская версия</h2>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Заголовок (RU)</label>
                            <input
                                required
                                type="text"
                                value={formData.title_ru}
                                onChange={(e) => setFormData({ ...formData, title_ru: e.target.value })}
                                className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-accent-cyan"
                                placeholder="Заголовок на русском"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Краткое описание (RU)</label>
                            <textarea
                                rows={2}
                                value={formData.excerpt_ru}
                                onChange={(e) => setFormData({ ...formData, excerpt_ru: e.target.value })}
                                className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-accent-cyan"
                                placeholder="Для карточки в списке..."
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2 flex justify-between">
                                Контент (RU)
                                <div className="flex bg-slate-100 p-1 rounded-lg gap-1 border border-slate-200 shadow-sm">
                                    <button type="button" onClick={() => insertText('ru', '**', '**')} className="p-1.5 hover:bg-white hover:text-accent-cyan rounded-md transition-all" title="Жирный - Bold">
                                        <Bold className="w-5 h-5" />
                                    </button>
                                    <button type="button" onClick={() => insertText('ru', '_', '_')} className="p-1.5 hover:bg-white hover:text-accent-cyan rounded-md transition-all" title="Курсив - Italic">
                                        <Italic className="w-5 h-5" />
                                    </button>
                                    <div className="w-[1px] bg-slate-300 mx-1" />
                                    <button type="button" onClick={() => insertText('ru', '# ', '')} className="p-1.5 hover:bg-white hover:text-accent-cyan rounded-md transition-all" title="Заголовок 1 - H1">
                                        <Heading1 className="w-5 h-5" />
                                    </button>
                                    <button type="button" onClick={() => insertText('ru', '## ', '')} className="p-1.5 hover:bg-white hover:text-accent-cyan rounded-md transition-all" title="Заголовок 2 - H2">
                                        <Heading2 className="w-5 h-5" />
                                    </button>
                                    <div className="w-[1px] bg-slate-300 mx-1" />
                                    <button type="button" onClick={() => insertText('ru', '- ', '')} className="p-1.5 hover:bg-white hover:text-accent-cyan rounded-md transition-all" title="Список - List">
                                        <List className="w-5 h-5" />
                                    </button>
                                    <button type="button" onClick={() => insertText('ru', '\n---\n', '')} className="p-1.5 hover:bg-white hover:text-accent-cyan rounded-md transition-all" title="Разделитель - HR">
                                        <Minus className="w-5 h-5" />
                                    </button>
                                    <button type="button" onClick={() => insertText('ru', '[текст](ссылка)', '')} className="p-1.5 hover:bg-white hover:text-accent-cyan rounded-md transition-all" title="Ссылка - Link">
                                        <LinkIcon className="w-5 h-5" />
                                    </button>
                                    <div className="w-[1px] bg-slate-300 mx-1" />
                                    <button type="button" onClick={() => applyTemplate('ru')} className="p-1.5 bg-accent-cyan/10 text-accent-cyan hover:bg-accent-cyan hover:text-white rounded-md transition-all flex items-center gap-1 px-2" title="Применить шаблон пошаговой инструкции">
                                        <Layout className="w-4 h-4" />
                                        <span className="text-xs font-bold">Шаблон</span>
                                    </button>
                                </div>
                            </label>
                            <textarea
                                id="content_ru"
                                required
                                rows={12}
                                value={formData.content_ru}
                                onChange={(e) => setFormData({ ...formData, content_ru: e.target.value })}
                                className="w-full p-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-accent-cyan font-mono text-sm leading-relaxed"
                            />
                        </div>
                        <div className="pt-4 border-t border-slate-100 space-y-4">
                            <label className="block text-xs font-bold text-slate-400 uppercase">SEO Настройки (RU)</label>
                            <div>
                                <label className="block text-xs font-bold text-slate-600 mb-1">Meta Title (RU)</label>
                                <input
                                    type="text"
                                    value={formData.seo_title_ru}
                                    onChange={(e) => setFormData({ ...formData, seo_title_ru: e.target.value })}
                                    className="w-full p-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-accent-cyan"
                                    placeholder="Заголовок для поисковиков"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-600 mb-1">Meta Description (RU)</label>
                                <textarea
                                    rows={2}
                                    value={formData.seo_description_ru}
                                    onChange={(e) => setFormData({ ...formData, seo_description_ru: e.target.value })}
                                    className="w-full p-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-accent-cyan"
                                    placeholder="Описание для поисковиков"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Romanian Version */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded">RO</span>
                            <h2 className="font-bold text-lg text-slate-800">Versiunea Română</h2>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Titlu (RO)</label>
                            <input
                                required
                                type="text"
                                value={formData.title_ro}
                                onChange={(e) => setFormData({ ...formData, title_ro: e.target.value })}
                                className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-accent-cyan"
                                placeholder="Titlul în română"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Descriere scurtă (RO)</label>
                            <textarea
                                rows={2}
                                value={formData.excerpt_ro}
                                onChange={(e) => setFormData({ ...formData, excerpt_ro: e.target.value })}
                                className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-accent-cyan"
                                placeholder="Pentru cardul din listă..."
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2 flex justify-between">
                                Conținut (RO)
                                <div className="flex bg-slate-100 p-1 rounded-lg gap-1 border border-slate-200 shadow-sm">
                                    <button type="button" onClick={() => insertText('ro', '**', '**')} className="p-1.5 hover:bg-white hover:text-accent-cyan rounded-md transition-all" title="Bold">
                                        <Bold className="w-5 h-5" />
                                    </button>
                                    <button type="button" onClick={() => insertText('ro', '_', '_')} className="p-1.5 hover:bg-white hover:text-accent-cyan rounded-md transition-all" title="Italic">
                                        <Italic className="w-5 h-5" />
                                    </button>
                                    <div className="w-[1px] bg-slate-300 mx-1" />
                                    <button type="button" onClick={() => insertText('ro', '# ', '')} className="p-1.5 hover:bg-white hover:text-accent-cyan rounded-md transition-all" title="H1">
                                        <Heading1 className="w-5 h-5" />
                                    </button>
                                    <button type="button" onClick={() => insertText('ro', '## ', '')} className="p-1.5 hover:bg-white hover:text-accent-cyan rounded-md transition-all" title="H2">
                                        <Heading2 className="w-5 h-5" />
                                    </button>
                                    <div className="w-[1px] bg-slate-300 mx-1" />
                                    <button type="button" onClick={() => insertText('ro', '- ', '')} className="p-1.5 hover:bg-white hover:text-accent-cyan rounded-md transition-all" title="List">
                                        <List className="w-5 h-5" />
                                    </button>
                                    <button type="button" onClick={() => insertText('ro', '\n---\n', '')} className="p-1.5 hover:bg-white hover:text-accent-cyan rounded-md transition-all" title="HR">
                                        <Minus className="w-5 h-5" />
                                    </button>
                                    <button type="button" onClick={() => insertText('ro', '[text](link)', '')} className="p-1.5 hover:bg-white hover:text-accent-cyan rounded-md transition-all" title="Link">
                                        <LinkIcon className="w-5 h-5" />
                                    </button>
                                    <div className="w-[1px] bg-slate-300 mx-1" />
                                    <button type="button" onClick={() => applyTemplate('ro')} className="p-1.5 bg-accent-cyan/10 text-accent-cyan hover:bg-accent-cyan hover:text-white rounded-md transition-all flex items-center gap-1 px-2" title="Aplicați șablonul instrucțiunilor pas cu pas">
                                        <Layout className="w-4 h-4" />
                                        <span className="text-xs font-bold">Șablon</span>
                                    </button>
                                </div>
                            </label>
                            <textarea
                                id="content_ro"
                                required
                                rows={12}
                                value={formData.content_ro}
                                onChange={(e) => setFormData({ ...formData, content_ro: e.target.value })}
                                className="w-full p-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-accent-cyan font-mono text-sm leading-relaxed"
                            />
                        </div>
                        <div className="pt-4 border-t border-slate-100 space-y-4">
                            <label className="block text-xs font-bold text-slate-400 uppercase">Setări SEO (RO)</label>
                            <div>
                                <label className="block text-xs font-bold text-slate-600 mb-1">Meta Title (RO)</label>
                                <input
                                    type="text"
                                    value={formData.seo_title_ro}
                                    onChange={(e) => setFormData({ ...formData, seo_title_ro: e.target.value })}
                                    className="w-full p-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-accent-cyan"
                                    placeholder="Titlu pentru motoarele de căutare"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-600 mb-1">Meta Description (RO)</label>
                                <textarea
                                    rows={2}
                                    value={formData.seo_description_ro}
                                    onChange={(e) => setFormData({ ...formData, seo_description_ro: e.target.value })}
                                    className="w-full p-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-accent-cyan"
                                    placeholder="Descriere pentru motoarele de căutare"
                                />
                            </div>
                        </div>
                    </div>
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
                        Сохранить статью
                    </button>
                </div>
            </form>
        </div>
    );
}
