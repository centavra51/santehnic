import { Hero } from '@/components/sections/Hero';
import { Benefits } from '@/components/sections/Benefits';
import { ServicesGrid } from '@/components/sections/ServicesGrid';
import { ArticlesPreview } from '@/components/sections/ArticlesPreview';
import { QuizCalculator } from '@/components/sections/QuizCalculator';
import { HowWeWork } from '@/components/sections/HowWeWork';
import { PricesTable } from '@/components/sections/PricesTable';
import { ReviewsCarousel } from '@/components/sections/ReviewsCarousel';
import { BeforeAfterGallery } from '@/components/sections/BeforeAfterGallery';
import { WhyChooseUs } from '@/components/sections/WhyChooseUs';
import { FaqAccordion } from '@/components/sections/FaqAccordion';
import { ContactForm } from '@/components/sections/ContactForm';
import { LocalBusinessSchema } from '@/components/seo/LocalBusinessSchema';
import { getFeaturedArticles } from '@/lib/articles';
import { getSiteImages } from '@/lib/supabase/images';

export default async function HomePage({ params }: { params: { locale: string } }) {
  const images = await getSiteImages();
  const featuredArticles = await getFeaturedArticles(6);

  return (
    <main className="flex flex-col w-full">
      <LocalBusinessSchema locale={params.locale} />
      <Hero backgroundImage={images['hero_bg']} />
      <Benefits />
      <ServicesGrid />
      <ArticlesPreview locale={params.locale as 'ru' | 'ro'} articles={featuredArticles} />
      <QuizCalculator />
      <HowWeWork />
      <BeforeAfterGallery images={images} />
      <PricesTable />
      <WhyChooseUs backgroundImage={images['why_choose_us']} />
      <ReviewsCarousel />
      <FaqAccordion />
      <ContactForm />
    </main>
  );
}
