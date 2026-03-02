import { createClient } from './server';

export async function getSiteImages() {
    const supabase = await createClient();
    const { data } = await supabase
        .from('site_images')
        .select('key, image_url');

    const images: Record<string, string> = {};
    data?.forEach(img => {
        images[img.key] = img.image_url;
    });

    return images;
}
