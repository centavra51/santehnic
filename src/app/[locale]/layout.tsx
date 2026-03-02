import type { Metadata } from 'next';
import { Inter, Montserrat } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/layout/Footer';
import { FloatingContact } from '@/components/FloatingContact';
import './globals.css';

const inter = Inter({ subsets: ['cyrillic', 'latin'], variable: '--font-inter' });
const montserrat = Montserrat({ subsets: ['cyrillic', 'latin'], variable: '--font-montserrat' });

export const metadata: Metadata = {
  title: 'Услуги Сантехника в Кишиневе 24/7',
  description: 'Профессиональный сантехник в Кишиневе. Выезд за 40 минут. Гарантия 2 года.',
};

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className="scroll-smooth relative">
      <body className={`${inter.variable} ${montserrat.variable} font-sans antialiased text-[#0A2540] flex flex-col min-h-screen`}>
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          <div className="flex-1">{children}</div>
          <Footer />
          <FloatingContact />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
