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


-- 2. Create the `articles` table for the Blog
CREATE TABLE IF NOT EXISTS public.articles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title_ru TEXT NOT NULL,
    title_ro TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    content_ru TEXT NOT NULL,
    content_ro TEXT NOT NULL,
    image_url TEXT,
    is_published BOOLEAN DEFAULT false,
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
CREATE POLICY "Allow public read-only access to calculator_settings"
ON public.calculator_settings FOR SELECT
USING (true);

-- Only authenticated users can update prices
CREATE POLICY "Allow authenticated users to update calculator_settings"
ON public.calculator_settings FOR ALL
USING (auth.role() = 'authenticated');


-- Articles Policies
-- Anyone can read published articles
CREATE POLICY "Allow public read-only access to published articles"
ON public.articles FOR SELECT
USING (is_published = true);

-- Authenticated users can read all articles (even drafts) and manage them
CREATE POLICY "Allow authenticated users full access to articles"
ON public.articles FOR ALL
USING (auth.role() = 'authenticated');


-- Leads Policies
-- Anonymous users can INSER leads (submit forms)
CREATE POLICY "Allow anonymous users to insert leads"
ON public.leads FOR INSERT
TO anon
WITH CHECK (true);

-- Only authenticated users can Read/Update/Delete leads
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
CREATE TRIGGER update_calculator_settings_modtime
    BEFORE UPDATE ON public.calculator_settings
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_articles_modtime
    BEFORE UPDATE ON public.articles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
