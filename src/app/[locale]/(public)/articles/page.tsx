import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { getPublishedArticles } from '@/lib/articles';

export default async function ArticlesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Articles' });
  const articles = await getPublishedArticles();

  return (
    <div className="container mx-auto min-h-[60vh] max-w-5xl px-4 py-24">
      <div className="mb-12">
        <Link
          href="/"
          className="mb-6 inline-flex items-center text-accent-cyan font-bold hover:underline"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t('back')}
        </Link>
        <h1 className="text-3xl font-heading font-extrabold text-primary-main md:text-5xl">
          {t('title')}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">{t('subtitle')}</p>
      </div>

      {articles.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {articles.map((article) => {
            const title = locale === 'ru' ? article.title_ru : article.title_ro;
            const excerpt = locale === 'ru' ? article.excerpt_ru : article.excerpt_ro;

            return (
              <article
                key={article.slug}
                className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-xl"
              >
                <div className="relative mb-5 h-52 overflow-hidden rounded-2xl bg-slate-100">
                  <Image src={article.image_url} alt={title} fill className="object-cover" />
                </div>
                <h2 className="mb-3 text-2xl font-heading font-extrabold text-primary-main">
                  {title}
                </h2>
                <p className="mb-5 flex-grow text-muted-foreground">{excerpt}</p>
                <Link
                  href={{ pathname: '/articles/[slug]', params: { slug: article.slug } }}
                  className="font-bold text-accent-cyan hover:underline"
                >
                  {t('read_more')} &rarr;
                </Link>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="rounded-2xl border border-slate-100 bg-slate-50 p-12 text-center text-slate-500">
          {t('no_articles')}
        </div>
      )}
    </div>
  );
}
