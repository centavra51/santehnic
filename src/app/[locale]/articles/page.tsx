import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function ArticlesPage() {
    return (
        <div className="container mx-auto max-w-4xl py-24 px-4 min-h-[60vh]">
            <div className="mb-12">
                <Link href="/" className="inline-flex items-center text-accent-cyan font-bold hover:underline mb-6">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Вернуться на главную
                </Link>
                <h1 className="text-3xl md:text-5xl font-heading font-extrabold text-primary-main">Статьи и Советы</h1>
                <p className="text-muted-foreground text-lg mt-4">Полезная информация о сантехнике, ремонте и уходе за трубами.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Placeholder Article Cards */}
                {[
                    'Как предотвратить засор в раковине: 5 простых правил',
                    'Какой смеситель выбрать на кухню: обзор материалов',
                    'Самостоятельная замена прокладки: пошаговая инструкция',
                    'Почему гудят трубы и как с этим бороться'
                ].map((title, i) => (
                    <div key={i} className="border border-slate-200 rounded-2xl p-6 hover:shadow-lg transition-shadow bg-white">
                        <div className="w-full h-48 bg-slate-100 rounded-lg mb-4 flex items-center justify-center text-slate-400 font-medium">
                            Фото к статье
                        </div>
                        <h3 className="text-xl font-bold text-primary-main mb-3 line-clamp-2">{title}</h3>
                        <p className="text-muted-foreground mb-4 line-clamp-2">
                            Небольшое превью текста статьи, чтобы заинтересовать читателя и показать часть пользы...
                        </p>
                        <Link href={`/articles/article-${i + 1}`} className="text-accent-cyan font-bold hover:underline">
                            Читать далее →
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
