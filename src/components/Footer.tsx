import { Link } from '@/i18n/routing';
import { Facebook, Instagram, Mail, MapPin, Phone } from 'lucide-react';

export function Footer() {
    return (
        <footer className="bg-primary text-primary-foreground">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        <h3 className="font-heading font-bold text-2xl">
                            Santehnik<span className="text-accent-cyan">Pro</span>
                        </h3>
                        <p className="text-primary-foreground/80 text-sm">
                            Профессиональные сантехнические услуги в Кишиневе и пригородах. Мы решаем любые проблемы: от засоров до монтажа систем отопления.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4 text-lg">Быстрые ссылки</h4>
                        <ul className="space-y-2 text-sm text-primary-foreground/80">
                            <li><a href="/#services" className="hover:text-accent-cyan transition-colors">Наши услуги</a></li>
                            <li><a href="/#calculator" className="hover:text-accent-cyan transition-colors">Калькулятор цен</a></li>
                            <li><Link href="/articles" className="hover:text-accent-cyan transition-colors">Полезные статьи</Link></li>
                            <li><a href="/#faq" className="hover:text-accent-cyan transition-colors">Вопросы и ответы</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4 text-lg">Контакты</h4>
                        <ul className="space-y-3 text-sm text-primary-foreground/80">
                            <li className="flex items-center space-x-3">
                                <Phone className="h-4 w-4 text-accent-cyan" />
                                <a href="tel:+37360000000" className="hover:text-accent-cyan">+373 60 000 000</a>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Mail className="h-4 w-4 text-accent-cyan" />
                                <a href="mailto:info@santehnik-chisinau.md" className="hover:text-accent-cyan">info@santehnik-chisinau.md</a>
                            </li>
                            <li className="flex items-center space-x-3">
                                <MapPin className="h-4 w-4 text-accent-cyan" />
                                <span>Chișinău, str. Alecu Russo 1</span>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4 text-lg">Мы в соцсетях</h4>
                        <div className="flex space-x-4">
                            <a href="#" className="p-2 bg-primary-foreground/10 rounded-full hover:bg-accent-cyan transition-colors">
                                <Facebook className="h-5 w-5" />
                            </a>
                            <a href="#" className="p-2 bg-primary-foreground/10 rounded-full hover:bg-accent-cyan transition-colors">
                                <Instagram className="h-5 w-5" />
                            </a>
                        </div>
                        <div className="mt-6">
                            <p className="text-sm font-semibold mb-2">Режим работы:</p>
                            <p className="text-sm border border-accent-cyan text-accent-cyan px-3 py-1 inline-block rounded-md">Круглосуточно 24/7</p>
                        </div>
                    </div>
                </div>

                <div className="border-t border-primary-foreground/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-primary-foreground/60">
                    <p>© {new Date().getFullYear()} SantehnikPro. Данный сайт является демонстрационным проектом.</p>
                    <div className="flex space-x-4 mt-4 md:mt-0">
                        <a href="/privacy-policy" className="hover:text-white transition-colors">Политика конфиденциальности</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
