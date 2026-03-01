'use client';

import { useTranslations } from 'next-intl';

export function PricesTable() {
    const t = useTranslations('Prices');

    const prices = [
        { name: t('items.item1.name'), price: t('items.item1.price') },
        { name: t('items.item2.name'), price: t('items.item2.price') },
        { name: t('items.item3.name'), price: t('items.item3.price') },
        { name: t('items.item4.name'), price: t('items.item4.price') },
        { name: t('items.item5.name'), price: t('items.item5.price') },
        { name: t('items.item6.name'), price: t('items.item6.price') },
        { name: t('items.item7.name'), price: t('items.item7.price') },
        { name: t('items.item8.name'), price: t('items.item8.price') },
        { name: t('items.item9.name'), price: t('items.item9.price') },
        { name: t('items.item10.name'), price: t('items.item10.price') },
    ];

    return (
        <section className="py-24 bg-background-light">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-primary-main mb-6">
                        {t('title_1')} <span className="text-accent-cyan">{t('title_highlight')}</span>
                    </h2>
                    <div className="w-24 h-1 bg-accent-cyan mx-auto rounded-full mb-6" />
                    <p className="text-muted-foreground text-lg">
                        {t('subtitle')}
                    </p>
                </div>

                <div className="bg-white rounded-3xl shadow-lg border border-slate-100 overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-primary-main text-white">
                                <th className="py-5 px-6 font-heading font-semibold text-lg">{t('col1')}</th>
                                <th className="py-5 px-6 font-heading font-semibold text-lg w-1/3">{t('col2')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {prices.map((item, idx) => (
                                <tr
                                    key={idx}
                                    className="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors"
                                >
                                    <td className="py-4 px-6 text-primary-main font-medium">{item.name}</td>
                                    <td className="py-4 px-6 text-accent-cyan font-bold">{item.price}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="bg-slate-50 p-6 flex flex-col sm:flex-row items-center justify-between">
                        <p className="text-sm text-muted-foreground mb-4 sm:mb-0">
                            {t('note')}
                        </p>
                        <a
                            href="#calculator"
                            className="px-6 py-2 bg-accent-cyan text-white rounded-lg font-bold hover:bg-accent-cyan/90 transition-colors shadow-md"
                        >
                            {t('calc_btn')}
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
