import { useTranslations } from 'next-intl';
import { Hero } from '@/components/sections/Hero';
import { Benefits } from '@/components/sections/Benefits';
import { ServicesGrid } from '@/components/sections/ServicesGrid';
import { QuizCalculator } from '@/components/sections/QuizCalculator';
import { HowWeWork } from '@/components/sections/HowWeWork';
import { PricesTable } from '@/components/sections/PricesTable';
import { ReviewsCarousel } from '@/components/sections/ReviewsCarousel';
import { BeforeAfterGallery } from '@/components/sections/BeforeAfterGallery';
import { WhyChooseUs } from '@/components/sections/WhyChooseUs';
import { FaqAccordion } from '@/components/sections/FaqAccordion';
import { ContactForm } from '@/components/sections/ContactForm';
import { LocalBusinessSchema } from '@/components/seo/LocalBusinessSchema';
import { getSiteImages } from '@/lib/supabase/images';

export default async function HomePage({ params }: { params: { locale: string } }) {
  const images = await getSiteImages();

  return (
    <main className="flex flex-col w-full">
      <LocalBusinessSchema locale={params.locale} />
      <Hero backgroundImage={images['hero_bg']} />
      <Benefits />
      <ServicesGrid />
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
