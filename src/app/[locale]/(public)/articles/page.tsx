import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';

export default async function ArticlesPage({ params }: { params: Promise<{ locale: string }> }) {
    const p = await params;
    const locale = p.locale;
    const t = await getTranslations({ locale, namespace: 'Articles' });
    const supabase = await createClient();

    const { data: articles, error } = await supabase
        .from('articles')
        .select('*')
        .eq('is_published', true)
        .order('created_at', { ascending: false });

    return (
        <div className="container mx-auto max-w-4xl py-24 px-4 min-h-[60vh]">
            <div className="mb-12">
                <Link href="/" className="inline-flex items-center text-accent-cyan font-bold hover:underline mb-6">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    {t('back')}
                </Link>
                <h1 className="text-3xl md:text-5xl font-heading font-extrabold text-primary-main">{t('title')}</h1>
                <p className="text-muted-foreground text-lg mt-4">{t('subtitle')}</p>
            </div>

            {error ? (
                <div className="text-center text-red-500 bg-red-50 p-6 rounded-xl border border-red-100">
                    Failed to load articles. Please check the connection.
                </div>
            ) : articles && articles.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {articles.map((article) => {
                        const title = locale === 'ru' ? article.title_ru : article.title_ro;
                        const excerpt = locale === 'ru' ? article.excerpt_ru : article.excerpt_ro;

                        // Skip if title for this locale is empty (though usually they should exist if published)
                        if (!title) return null;

                        return (
                            <div key={article.id} className="border border-slate-200 rounded-2xl p-6 hover:shadow-lg transition-shadow bg-white flex flex-col">
                                <div className="relative w-full h-48 bg-slate-100 rounded-lg mb-4 flex items-center justify-center text-slate-400 font-medium overflow-hidden">
                                    {article.image_url ? (
                                        <Image src={article.image_url} alt={title} fill className="object-cover" />
                                    ) : (
                                        "Фото к статье"
                                    )}
                                </div>
                                <h3 className="text-xl font-bold text-primary-main mb-3 line-clamp-2">{title}</h3>
                                <p className="text-muted-foreground mb-4 line-clamp-2 flex-grow">
                                    {excerpt}
                                </p>
                                <Link href={`/${locale}/articles/${article.slug}`} className="text-accent-cyan font-bold hover:underline">
                                    {t('read_more')} &rarr;
                                </Link>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="text-center text-slate-500 bg-slate-50 p-12 rounded-2xl border border-slate-100">
                    {t('no_articles')}
                </div>
            )}
        </div>
    );
}
