import Image from 'next/image';
import { ArrowRight, CalendarDays, Newspaper } from 'lucide-react';
import { Link } from '@/i18n/routing';
import type { ArticleRecord } from '@/lib/articles';

const copy = {
  ru: {
    eyebrow: 'Полезные статьи',
    title: 'Полезные советы по сантехнике',
    subtitle:
      'Простые и понятные статьи о поломках, ремонте, замене труб и подключении техники в квартире или доме.',
    readMore: 'Читать статью',
    allArticles: 'Все статьи',
  },
  ro: {
    eyebrow: 'Articole utile',
    title: 'Sfaturi simple de la instalator',
    subtitle:
      'Articole clare despre defecțiuni, reparații, schimbarea țevilor și conectarea tehnicii în apartament sau casă.',
    readMore: 'Citește articolul',
    allArticles: 'Toate articolele',
  },
} as const;

export function ArticlesPreview({
  locale,
  articles,
}: {
  locale: 'ru' | 'ro';
  articles: ArticleRecord[];
}) {
  const safeLocale = locale === 'ro' ? 'ro' : 'ru';
  const t = copy[safeLocale];
  const dateLocale = safeLocale === 'ru' ? 'ru-RU' : 'ro-RO';

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-100 bg-cyan-50 px-4 py-2 text-sm font-semibold text-accent-cyan">
              <Newspaper className="h-4 w-4" />
              {t.eyebrow}
            </div>
            <h2 className="mb-5 text-3xl font-heading font-extrabold text-primary-main md:text-5xl">
              {t.title}
            </h2>
            <p className="text-lg text-muted-foreground">{t.subtitle}</p>
          </div>

          <Link
            href="/articles"
            className="inline-flex items-center gap-2 self-start rounded-full border border-slate-200 px-5 py-3 font-bold text-primary-main transition-colors hover:border-accent-cyan hover:text-accent-cyan"
          >
            {t.allArticles}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
          {articles.map((article) => {
            const title = safeLocale === 'ru' ? article.title_ru : article.title_ro;
            const excerpt = safeLocale === 'ru' ? article.excerpt_ru : article.excerpt_ro;

            return (
              <article
                key={article.slug}
                className="group overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
              >
                <div className="relative h-56 overflow-hidden bg-slate-100">
                  <Image
                    src={article.image_url}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="p-7">
                  <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    <CalendarDays className="h-3.5 w-3.5" />
                    {new Date(article.created_at).toLocaleDateString(dateLocale, {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </div>

                  <Link
                    href={{ pathname: '/articles/[slug]', params: { slug: article.slug } }}
                    className="mt-5 block"
                  >
                    <h3 className="text-2xl font-heading font-extrabold leading-snug text-primary-main transition-colors group-hover:text-accent-cyan hover:text-accent-cyan">
                      {title}
                    </h3>
                  </Link>

                  <p className="mt-4 text-muted-foreground leading-relaxed">{excerpt}</p>

                  <Link
                    href={{ pathname: '/articles/[slug]', params: { slug: article.slug } }}
                    className="mt-6 inline-flex items-center gap-2 font-bold text-accent-cyan transition-transform group-hover:translate-x-1"
                  >
                    {t.readMore}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
