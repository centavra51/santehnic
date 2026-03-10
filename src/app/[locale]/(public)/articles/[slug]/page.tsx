import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import { notFound } from 'next/navigation';
import { Link } from '@/i18n/routing';
import { getArticleBySlug } from '@/lib/articles';

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
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const title = locale === 'ru' ? article.title_ru : article.title_ro;
  const content = locale === 'ru' ? article.content_ru : article.content_ro;

  return (
    <main className="min-h-screen bg-white">
      <article className="mx-auto max-w-3xl px-4 py-24 sm:px-6 lg:px-8 md:py-32">
        <Link
          href="/articles"
          className="mb-8 inline-flex items-center font-bold text-accent-cyan hover:underline"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {locale === 'ru' ? 'Назад к статьям' : 'Înapoi la articole'}
        </Link>

        <header className="mb-12">
          <div className="mb-6 flex items-center gap-4 text-sm font-medium text-slate-500">
            <time dateTime={article.created_at}>
              {new Date(article.created_at).toLocaleDateString(
                locale === 'ru' ? 'ru-RU' : 'ro-RO',
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
      </article>
    </main>
  );
}
