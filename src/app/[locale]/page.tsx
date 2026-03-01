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

export default function HomePage({ params }: { params: { locale: string } }) {
  const t = useTranslations('Index');

  return (
    <main className="flex flex-col w-full">
      <LocalBusinessSchema locale={params.locale} />
      <Hero />
      <Benefits />
      <ServicesGrid />
      <QuizCalculator />
      <HowWeWork />
      <BeforeAfterGallery />
      <PricesTable />
      <WhyChooseUs />
      <ReviewsCarousel />
      <FaqAccordion />
      <ContactForm />
    </main>
  );
}
