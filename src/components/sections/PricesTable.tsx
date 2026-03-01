'use strict';

const prices = [
    { name: 'Вызов мастера и диагностика', price: 'Бесплатно (при ремонте)' },
    { name: 'Устранение простого засора', price: 'от 400 MDL' },
    { name: 'Устранение сложного засора (тросом)', price: 'от 700 MDL' },
    { name: 'Замена смесителя', price: 'от 300 MDL' },
    { name: 'Установка счетчиков воды (пара)', price: 'от 600 MDL' },
    { name: 'Монтаж унитаза', price: 'от 600 MDL' },
    { name: 'Монтаж раковины/мойки', price: 'от 450 MDL' },
    { name: 'Подключение стиральной машины', price: 'от 400 MDL' },
    { name: 'Монтаж бойлера (с разводкой труб)', price: 'от 800 MDL' },
    { name: 'Замена радиатора отопления', price: 'от 700 MDL' },
];

export function PricesTable() {
    return (
        <section className="py-24 bg-background-light">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-primary-main mb-6">
                        Прозрачные <span className="text-accent-cyan">Цены</span>
                    </h2>
                    <div className="w-24 h-1 bg-accent-cyan mx-auto rounded-full mb-6" />
                    <p className="text-muted-foreground text-lg">
                        Мы работаем по фиксированному прайсу. Точную стоимость мастер называет до начала работ. Никаких скрытых платежей.
                    </p>
                </div>

                <div className="bg-white rounded-3xl shadow-lg border border-slate-100 overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-primary-main text-white">
                                <th className="py-5 px-6 font-heading font-semibold text-lg">Наименование услуги</th>
                                <th className="py-5 px-6 font-heading font-semibold text-lg w-1/3">Стоимость</th>
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
                            * Цены не включают стоимость расходных материалов и комплектующих.
                        </p>
                        <a
                            href="#calculator"
                            className="px-6 py-2 bg-accent-cyan text-white rounded-lg font-bold hover:bg-accent-cyan/90 transition-colors shadow-md"
                        >
                            Точный Расчет
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
