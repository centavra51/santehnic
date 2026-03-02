'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Loader2, Upload, Save, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';

type SiteImage = {
    id: string;
    key: string;
    image_url: string;
    description: string;
};

export default function AdminImagesPage() {
    const [images, setImages] = useState<SiteImage[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploadingKey, setUploadingKey] = useState<string | null>(null);

    const fetchImages = async () => {
        setLoading(true);
        const supabase = createClient();
        const { data } = await supabase.from('site_images').select('*').order('key', { ascending: true });
        if (data) setImages(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchImages();
    }, []);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>, imageKey: string, id: string) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploadingKey(imageKey);
        const supabase = createClient();

        try {
            // 1. Upload file to Supabase Storage 'site-media'
            const fileExt = file.name.split('.').pop();
            const fileName = `${imageKey}-${Date.now()}.${fileExt}`;
            const { error: uploadError, data: uploadData } = await supabase.storage
                .from('site-media')
                .upload(fileName, file, { cacheControl: '3600', upsert: true });

            if (uploadError) throw uploadError;

            // 2. Get public URL
            const { data: { publicUrl } } = supabase.storage.from('site-media').getPublicUrl(fileName);

            // 3. Update database
            const { error: dbError } = await supabase.from('site_images').update({ image_url: publicUrl }).eq('id', id);

            if (dbError) throw dbError;

            // Update UI
            setImages(images.map(img => img.key === imageKey ? { ...img, image_url: publicUrl } : img));
            alert('Изображение успешно обновлено!');

        } catch (error: any) {
            alert('Ошибка при загрузке: ' + error.message);
        } finally {
            setUploadingKey(null);
        }
    };

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-heading font-extrabold text-primary-main">Изображения Сайта</h1>
                <p className="text-muted-foreground mt-2">Управление главными фотографиями и фонами.</p>
            </div>

            {loading ? (
                <div className="flex justify-center p-12">
                    <Loader2 className="w-8 h-8 animate-spin text-accent-cyan" />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {images.map((img) => (
                        <div key={img.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col">
                            <div className="aspect-video relative bg-slate-100 flex items-center justify-center overflow-hidden border-b border-slate-100">
                                {img.image_url ? (
                                    <Image src={img.image_url} alt={img.key} fill style={{ objectFit: 'cover' }} className="group-hover:scale-105 transition-transform" />
                                ) : (
                                    <ImageIcon className="w-12 h-12 text-slate-300" />
                                )}

                                <label className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex flex-col items-center justify-center cursor-pointer text-white">
                                    {uploadingKey === img.key ? (
                                        <Loader2 className="w-8 h-8 animate-spin" />
                                    ) : (
                                        <>
                                            <Upload className="w-8 h-8 mb-2" />
                                            <span className="font-bold text-sm">Загрузить новое</span>
                                        </>
                                    )}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        disabled={uploadingKey === img.key}
                                        onChange={(e) => handleUpload(e, img.key, img.id)}
                                    />
                                </label>
                            </div>
                            <div className="p-4">
                                <h3 className="font-bold text-primary-main text-lg">{img.description || img.key}</h3>
                                <p className="text-xs text-slate-500 font-mono mt-1 pr-2 truncate">{img.image_url}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
