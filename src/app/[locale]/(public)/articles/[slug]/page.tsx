import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import { notFound } from 'next/navigation';
import { Link } from '@/i18n/routing';
import { getArticleBySlug, getPublishedArticles } from '@/lib/articles';

const copy = {
  ru: {
    back: 'Назад к статьям',
    ctaTitle: 'Нужна помощь сантехника?',
    ctaText:
      'Если не хотите заниматься ремонтом сами, позвоните или оставьте заявку. Подскажем по цене и времени выезда мастера.',
    call: 'Позвонить мастеру',
    form: 'Оставить заявку',
    related: 'Ещё полезно прочитать',
  },
  ro: {
    back: 'Înapoi la articole',
    ctaTitle: 'Aveți nevoie de ajutorul instalatorului?',
    ctaText:
      'Dacă nu doriți să reparați singur, sunați-ne sau lăsați o cerere. Vă spunem rapid prețul și timpul deplasării.',
    call: 'Sună instalatorul',
    form: 'Lasă o cerere',
    related: 'Mai puteți citi și',
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return { title: 'Article Not Found' };
  }

  const title =
    locale === 'ru' ? article.seo_title_ru || article.title_ru : article.seo_title_ro || article.title_ro;
  const description =
    locale === 'ru'
      ? article.seo_description_ru || article.excerpt_ru
      : article.seo_description_ro || article.excerpt_ro;

  return {
    title: `${title} | Santehnik`,
    description,
  };
}

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  const safeLocale = locale === 'ro' ? 'ro' : 'ru';
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const allArticles = await getPublishedArticles();
  const relatedArticles = allArticles.filter((item) => item.slug !== slug).slice(0, 3);
  const title = safeLocale === 'ru' ? article.title_ru : article.title_ro;
  const content = safeLocale === 'ru' ? article.content_ru : article.content_ro;
  const t = copy[safeLocale];

  return (
    <main className="min-h-screen bg-white">
      <article className="mx-auto max-w-3xl px-4 py-24 sm:px-6 lg:px-8 md:py-32">
        <Link
          href="/articles"
          className="mb-8 inline-flex items-center font-bold text-accent-cyan hover:underline"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t.back}
        </Link>

        <header className="mb-12">
          <div className="mb-6 flex items-center gap-4 text-sm font-medium text-slate-500">
            <time dateTime={article.created_at}>
              {new Date(article.created_at).toLocaleDateString(
                safeLocale === 'ru' ? 'ru-RU' : 'ro-RO',
              )}
            </time>
          </div>
          <h1 className="mb-6 text-4xl font-heading font-extrabold leading-tight text-primary-main md:text-5xl lg:text-6xl">
            {title}
          </h1>
        </header>

        <div className="relative mb-12 h-64 w-full overflow-hidden rounded-3xl shadow-md md:h-96">
          <Image src={article.image_url} alt={title} fill className="object-cover" priority />
        </div>

        <div className="article-content max-w-none" dangerouslySetInnerHTML={{ __html: content }} />

        <section className="mt-16 rounded-3xl border border-slate-200 bg-slate-50 p-8 md:p-10">
          <h2 className="mb-4 text-3xl font-heading font-extrabold text-primary-main">{t.ctaTitle}</h2>
          <p className="mb-6 text-lg text-muted-foreground">{t.ctaText}</p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <a
              href="tel:+37360000000"
              className="inline-flex items-center justify-center rounded-xl bg-primary-main px-6 py-4 font-bold text-white transition-colors hover:bg-primary-main/90"
            >
              {t.call}
            </a>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-6 py-4 font-bold text-primary-main transition-colors hover:border-accent-cyan hover:text-accent-cyan"
            >
              {t.form}
            </Link>
          </div>
        </section>

        <section className="mt-14">
          <h2 className="mb-6 text-2xl font-heading font-extrabold text-primary-main">{t.related}</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {relatedArticles.map((item) => {
              const relatedTitle = safeLocale === 'ru' ? item.title_ru : item.title_ro;

              return (
                <Link
                  key={item.slug}
                  href={{ pathname: '/articles/[slug]', params: { slug: item.slug } }}
                  className="rounded-2xl border border-slate-200 bg-white p-5 font-bold text-primary-main transition-colors hover:border-accent-cyan hover:text-accent-cyan"
                >
                  {relatedTitle}
                </Link>
              );
            })}
          </div>
        </section>
      </article>
    </main>
  );
}
