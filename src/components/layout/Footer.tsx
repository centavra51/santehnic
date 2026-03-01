import Link from 'next/link';
import { Phone, MapPin, Mail, Clock, Facebook, Instagram } from 'lucide-react';

export function Footer() {
    return (
        <footer className="bg-primary-main pt-20 pb-10 text-white/80">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand */}
                    <div>
                        <Link href="/" className="inline-block mb-6">
                            <span className="text-2xl font-heading font-extrabold text-white">Santehnik<span className="text-accent-cyan">.md</span></span>
                        </Link>
                        <p className="mb-6 leading-relaxed text-sm">
                            Надежные сантехнические услуги в Кишиневе и пригородах. Работаем 24/7, даем официальную гарантию.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent-cyan hover:text-white transition-colors">
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent-cyan hover:text-white transition-colors">
                                <Instagram className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="text-white font-bold text-lg mb-6">Навигация</h4>
                        <ul className="space-y-4 text-sm font-medium">
                            <li><Link href="/#services" className="hover:text-accent-cyan transition-colors">Услуги</Link></li>
                            <li><Link href="/#calculator" className="hover:text-accent-cyan transition-colors">Цены и Калькулятор</Link></li>
                            <li><Link href="/#reviews" className="hover:text-accent-cyan transition-colors">Отзывы</Link></li>
                            <li><Link href="/#faq" className="hover:text-accent-cyan transition-colors">Вопросы и Ответы</Link></li>
                            <li><Link href="/articles" className="hover:text-accent-cyan transition-colors">Блог / Статьи</Link></li>
                        </ul>
                    </div>

                    {/* Contacts */}
                    <div>
                        <h4 className="text-white font-bold text-lg mb-6">Контакты</h4>
                        <ul className="space-y-4 text-sm">
                            <li className="flex items-start gap-3">
                                <Phone className="w-5 h-5 text-accent-cyan shrink-0" />
                                <div>
                                    <a href="tel:+37300000000" className="text-white font-bold hover:text-accent-cyan block mb-1">+373 (00) 000-000</a>
                                    <span className="text-xs">Ежедневно 24/7</span>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-accent-cyan shrink-0" />
                                <span>г. Кишинев, ул. Примерная 123</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Mail className="w-5 h-5 text-accent-cyan shrink-0" />
                                <a href="mailto:info@santehnik.md" className="hover:text-accent-cyan">info@santehnik.md</a>
                            </li>
                            <li className="flex items-start gap-3">
                                <Clock className="w-5 h-5 text-accent-cyan shrink-0" />
                                <span>Пн-Вс: Круглосуточно</span>
                            </li>
                        </ul>
                    </div>

                    {/* Call to action */}
                    <div>
                        <h4 className="text-white font-bold text-lg mb-6">Нужна помощь?</h4>
                        <p className="text-sm mb-6">Оставьте номер, мы перезвоним за 5 минут.</p>
                        <form className="flex gap-2">
                            <input type="tel" placeholder="+373" className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent-cyan placeholder:text-white/40" />
                            <button type="button" className="bg-accent-cyan hover:bg-accent-cyan/90 text-white px-4 py-2 rounded-lg font-bold transition-colors">
                                Ок
                            </button>
                        </form>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm font-medium">
                    <p>© {new Date().getFullYear()} Santehnik.md. Все права защищены.</p>
                    <div className="flex gap-6">
                        <Link href="/privacy-policy" className="hover:text-white transition-colors">Политика конфиденциальности</Link>
                        <Link href="/terms" className="hover:text-white transition-colors">Пользовательское соглашение</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
