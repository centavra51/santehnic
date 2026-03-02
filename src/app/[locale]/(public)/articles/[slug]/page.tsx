import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { notFound } from 'next/navigation';
import Image from 'next/image';

export async function generateMetadata({ params }: { params: Promise<{ slug: string, locale: string }> }) {
    const p = await params;
    const supabase = await createClient();
    const { data: article } = await supabase
        .from('articles')
        .select('title, excerpt')
        .eq('slug', p.slug)
        .eq('locale', p.locale)
        .eq('is_published', true)
        .single();

    if (!article) return { title: 'Article Not Found' };

    return {
        title: `${article.title} | Santehnik`,
        description: article.excerpt || '',
    };
}

export default async function ArticleDetailPage({ params }: { params: Promise<{ slug: string, locale: string }> }) {
    const p = await params;
    const { slug, locale } = p;
    const supabase = await createClient();

    const { data: article, error } = await supabase
        .from('articles')
        .select('*')
        .eq('slug', slug)
        .eq('locale', locale)
        .eq('is_published', true)
        .single();

    if (error || !article) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-white">
            <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
                <Link
                    href={`/${locale}/articles`}
                    className="inline-flex items-center text-accent-cyan font-bold hover:underline mb-8"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    {locale === 'ru' ? 'Назад к статьям' : 'Înapoi la articole'}
                </Link>

                <header className="mb-12">
                    <div className="flex items-center gap-4 text-sm font-medium text-slate-500 mb-6">
                        <time dateTime={article.created_at}>
                            {new Date(article.created_at).toLocaleDateString(locale === 'ru' ? 'ru-RU' : 'ro-RO')}
                        </time>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold text-primary-main leading-tight mb-6">
                        {article.title}
                    </h1>
                </header>

                {article.image_url && (
                    <div className="relative w-full h-64 md:h-96 rounded-3xl overflow-hidden mb-12 shadow-md">
                        <Image
                            src={article.image_url}
                            alt={article.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                )}

                <div
                    className="prose prose-lg md:prose-xl prose-slate max-w-none prose-headings:font-heading prose-headings:font-extrabold prose-a:text-accent-cyan hover:prose-a:text-accent-cyan/80 prose-img:rounded-2xl"
                    dangerouslySetInnerHTML={{ __html: article.content }}
                />
            </article>
        </main>
    );
}
