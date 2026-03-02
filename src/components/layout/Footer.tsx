import { Phone, MapPin, Mail, Clock, Facebook, Instagram } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export function Footer() {
    const t = useTranslations('Footer');
    const nt = useTranslations('Navbar');

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
                            {t('desc')}
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
                        <h4 className="text-white font-bold text-lg mb-6">{t('nav_title')}</h4>
                        <ul className="space-y-4 text-sm font-medium">
                            <li><a href="#services" className="hover:text-accent-cyan transition-colors">{nt('services')}</a></li>
                            <li><a href="#calculator" className="hover:text-accent-cyan transition-colors">{nt('calculator')}</a></li>
                            <li><a href="#reviews" className="hover:text-accent-cyan transition-colors">{nt('reviews')}</a></li>
                            <li><a href="#faq" className="hover:text-accent-cyan transition-colors">{nt('faq')}</a></li>
                            <li><Link href="/articles" className="hover:text-accent-cyan transition-colors">{nt('blog')}</Link></li>
                        </ul>
                    </div>

                    {/* Contacts */}
                    <div>
                        <h4 className="text-white font-bold text-lg mb-6">{t('contacts_title')}</h4>
                        <ul className="space-y-4 text-sm">
                            <li className="flex items-start gap-3">
                                <Phone className="w-5 h-5 text-accent-cyan shrink-0" />
                                <div>
                                    <a href={`tel:${nt('phone').replace(/\s/g, '')}`} className="text-white font-bold hover:text-accent-cyan block mb-1">{nt('phone')}</a>
                                    <span className="text-xs">{t('schedule')}</span>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-accent-cyan shrink-0" />
                                <span>{t('address')}</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Mail className="w-5 h-5 text-accent-cyan shrink-0" />
                                <a href="mailto:info@santehnik.md" className="hover:text-accent-cyan">info@santehnik.md</a>
                            </li>
                            <li className="flex items-start gap-3">
                                <Clock className="w-5 h-5 text-accent-cyan shrink-0" />
                                <span>{t('schedule')}</span>
                            </li>
                        </ul>
                    </div>

                    {/* Call to action */}
                    <div>
                        <h4 className="text-white font-bold text-lg mb-6">{t('help_title')}</h4>
                        <p className="text-sm mb-6">{t('help_desc')}</p>
                        <form className="flex gap-2">
                            <input type="tel" placeholder={t('phone_placeholder')} className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent-cyan placeholder:text-white/40" />
                            <button type="button" className="bg-accent-cyan hover:bg-accent-cyan/90 text-white px-4 py-2 rounded-lg font-bold transition-colors">
                                {t('ok')}
                            </button>
                        </form>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm font-medium">
                    <p>© {new Date().getFullYear()} Santehnik.md. {t('rights')}</p>
                    <div className="flex gap-6">
                        <a href="/privacy-policy" className="hover:text-white transition-colors">{t('privacy')}</a>
                        <a href="/terms" className="hover:text-white transition-colors">{t('terms')}</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
