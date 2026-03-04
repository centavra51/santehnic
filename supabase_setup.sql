-- Run this in the Supabase SQL Editor

-- 1. Create the `calculator_settings` table
CREATE TABLE IF NOT EXISTS public.calculator_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    service_name TEXT NOT NULL UNIQUE,
    price_mdl NUMERIC NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Insert initial values for calculator
INSERT INTO public.calculator_settings (service_name, price_mdl) VALUES
('Устранение засора', 400),
('Замена смесителя', 300),
('Установка унитаза', 600),
('Разводка труб', 800),
('Монтаж отопления', 1000),
('Аварийный выезд', 500),
('За метр трубы', 50),
('За доп. помещение', 100)
ON CONFLICT (service_name) DO UPDATE SET price_mdl = EXCLUDED.price_mdl;


-- 2. Create the `articles` table for the Blog (Bilingual in one row)
CREATE TABLE IF NOT EXISTS public.articles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title_ru TEXT,
    title_ro TEXT,
    slug TEXT NOT NULL UNIQUE,
    excerpt_ru TEXT,
    excerpt_ro TEXT,
    content_ru TEXT,
    content_ro TEXT,
    image_url TEXT,
    is_published BOOLEAN DEFAULT false,
    seo_title_ru TEXT,
    seo_title_ro TEXT,
    seo_description_ru TEXT,
    seo_description_ro TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);


-- 3. Create the `leads` table for incoming requests
CREATE TABLE IF NOT EXISTS public.leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    address TEXT,
    problem_description TEXT,
    service_type TEXT,
    quiz_data JSONB DEFAULT '{}'::jsonb,
    status TEXT DEFAULT 'new' CHECK (status IN ('new', 'processing', 'done', 'cancelled')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Set up Row Level Security (RLS)

-- Enable RLS
ALTER TABLE public.calculator_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Calculator Policies
-- Anyone can read the prices
DROP POLICY IF EXISTS "Allow public read-only access to calculator_settings" ON public.calculator_settings;
CREATE POLICY "Allow public read-only access to calculator_settings"
ON public.calculator_settings FOR SELECT
USING (true);

-- Only authenticated users can update prices
DROP POLICY IF EXISTS "Allow authenticated users to update calculator_settings" ON public.calculator_settings;
CREATE POLICY "Allow authenticated users to update calculator_settings"
ON public.calculator_settings FOR ALL
USING (auth.role() = 'authenticated');


-- Articles Policies
-- Anyone can read published articles
DROP POLICY IF EXISTS "Allow public read-only access to published articles" ON public.articles;
CREATE POLICY "Allow public read-only access to published articles"
ON public.articles FOR SELECT
USING (is_published = true);

-- Authenticated users can read all articles (even drafts) and manage them
DROP POLICY IF EXISTS "Allow authenticated users full access to articles" ON public.articles;
CREATE POLICY "Allow authenticated users full access to articles"
ON public.articles FOR ALL
USING (auth.role() = 'authenticated');


-- Leads Policies
-- Anonymous users can INSER leads (submit forms)
DROP POLICY IF EXISTS "Allow anonymous users to insert leads" ON public.leads;
CREATE POLICY "Allow anonymous users to insert leads"
ON public.leads FOR INSERT
TO anon
WITH CHECK (true);

-- Only authenticated users can Read/Update/Delete leads
DROP POLICY IF EXISTS "Allow authenticated users full access to leads" ON public.leads;
CREATE POLICY "Allow authenticated users full access to leads"
ON public.leads FOR ALL
USING (auth.role() = 'authenticated');


-- Function to automatically update `updated_at` column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
DROP TRIGGER IF EXISTS update_calculator_settings_modtime ON public.calculator_settings;
CREATE TRIGGER update_calculator_settings_modtime
    BEFORE UPDATE ON public.calculator_settings
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_articles_modtime ON public.articles;
CREATE TRIGGER update_articles_modtime
    BEFORE UPDATE ON public.articles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- 5. Create the `site_images` table for CMS Global Images (CRITICAL FOR IMAGE MANAGEMENT)
CREATE TABLE IF NOT EXISTS public.site_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    key TEXT NOT NULL UNIQUE,
    image_url TEXT NOT NULL,
    description TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- INITIAL SEED DATA
INSERT INTO public.site_images (key, image_url, description) VALUES
('hero_bg', '/hero-bg.png', 'Главное фоновое изображение (Hero Section)'),
('gallery_1', '/plumbing-hero.jpg', 'Галерея: Изображение 1'),
('gallery_2', '/gallery-heating.jpg', 'Галерея: Изображение 2'),
('gallery_3', '/gallery-plumbing-1.jpg', 'Галерея: Изображение 3'),
('gallery_4', '/gallery-plumbing-2.jpg', 'Галерея: Изображение 4'),
('gallery_5', '/gallery-pipes.jpg', 'Галерея: Изображение 5'),
('why_choose_us', '/why-choose-us.png', 'Секция "Почему мы" (Боковое фото)')
ON CONFLICT (key) DO NOTHING;

-- RLS for site_images
ALTER TABLE public.site_images ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read-only access to site_images" ON public.site_images;
CREATE POLICY "Allow public read-only access to site_images"
ON public.site_images FOR SELECT
USING (true);

DROP POLICY IF EXISTS "Allow authenticated users to update site_images" ON public.site_images;
CREATE POLICY "Allow authenticated users to update site_images"
ON public.site_images FOR ALL
USING (auth.role() = 'authenticated');

DROP TRIGGER IF EXISTS update_site_images_modtime ON public.site_images;
CREATE TRIGGER update_site_images_modtime
    BEFORE UPDATE ON public.site_images
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- IMPORTANT: RUN THE WHOLE SCRIPT IN SUPABASE SQL EDITOR TO ENSURE ALL TABLES EXIST!

-- Instructions for Supabase Storage:
-- 1. Create a public bucket named `site-media`
-- 2. Allow all users to SELECT from `site-media`
-- 3. Allow only authenticated users to INSERT/UPDATE/DELETE in `site-media`
