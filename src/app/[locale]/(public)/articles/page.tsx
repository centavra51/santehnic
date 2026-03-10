import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { getPublishedArticles } from '@/lib/articles';

const copy = {
  ru: {
    back: 'На главную',
    title: 'Полезные статьи',
    subtitle:
      'Понятные советы о сантехнике, ремонте, замене труб и подключении техники без сложных терминов.',
    readMore: 'Открыть статью',
    empty: 'Статей пока нет.',
  },
  ro: {
    back: 'Înapoi pe pagina principală',
    title: 'Articole utile',
    subtitle:
      'Sfaturi clare despre instalații sanitare, reparații, schimbarea țevilor și conectarea tehnicii, fără termeni complicați.',
    readMore: 'Deschide articolul',
    empty: 'Încă nu există articole.',
  },
} as const;

export default async function ArticlesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const safeLocale = locale === 'ro' ? 'ro' : 'ru';
  const t = copy[safeLocale];
  const articles = await getPublishedArticles();

  return (
    <div className="container mx-auto min-h-[60vh] max-w-5xl px-4 py-24">
      <div className="mb-12">
        <Link
          href="/"
          className="mb-6 inline-flex items-center text-accent-cyan font-bold hover:underline"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t.back}
        </Link>
        <h1 className="text-3xl font-heading font-extrabold text-primary-main md:text-5xl">
          {t.title}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">{t.subtitle}</p>
      </div>

      {articles.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {articles.map((article) => {
            const title = safeLocale === 'ru' ? article.title_ru : article.title_ro;
            const excerpt = safeLocale === 'ru' ? article.excerpt_ru : article.excerpt_ro;

            return (
              <article
                key={article.slug}
                className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-xl"
              >
                <div className="relative mb-5 h-52 overflow-hidden rounded-2xl bg-slate-100">
                  <Image src={article.image_url} alt={title} fill className="object-cover" />
                </div>
                <Link
                  href={{ pathname: '/articles/[slug]', params: { slug: article.slug } }}
                  className="mb-3 block rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent-cyan/40"
                >
                  <h2 className="text-2xl font-heading font-extrabold text-primary-main transition-colors hover:text-accent-cyan">
                    {title}
                  </h2>
                  <p className="mt-3 text-muted-foreground">{excerpt}</p>
                </Link>
                <div className="mb-5 flex-grow" />
                <Link
                  href={{ pathname: '/articles/[slug]', params: { slug: article.slug } }}
                  className="font-bold text-accent-cyan hover:underline"
                >
                  {t.readMore} &rarr;
                </Link>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="rounded-2xl border border-slate-100 bg-slate-50 p-12 text-center text-slate-500">
          {t.empty}
        </div>
      )}
    </div>
  );
}
