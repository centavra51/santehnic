'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MessageCircle, Send, X, MessageSquareText } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function FloatingContact() {
    const [isOpen, setIsOpen] = useState(false);
    // Ideally useTranslations for title if needed, or simple hardcoded tips
    // But since it's global, let's keep it simple with icons and minimal text

    const contacts = [
        {
            id: 'phone',
            icon: <Phone className="w-6 h-6" />,
            label: '+373 60 000 000',
            href: 'tel:+37360000000',
            color: 'bg-primary-main hover:bg-primary-main/90 text-white',
        },
        {
            id: 'viber',
            icon: <MessageSquareText className="w-6 h-6" />,
            label: 'Viber',
            href: 'viber://chat?number=%2B37360000000',
            color: 'bg-[#7360f2] hover:bg-[#5f4de1] text-white',
        },
        {
            id: 'whatsapp',
            icon: <MessageCircle className="w-6 h-6" />,
            label: 'WhatsApp',
            href: 'https://wa.me/37360000000',
            color: 'bg-[#25D366] hover:bg-[#1ebe5d] text-white',
        },
        {
            id: 'telegram',
            icon: <Send className="w-6 h-6 -ml-1" />, // Send icon looks like telegram
            label: 'Telegram',
            href: 'https://t.me/santehnik',
            color: 'bg-[#229ED9] hover:bg-[#1c8ec4] text-white',
        }
    ];

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                        className="flex flex-col gap-3 mb-2"
                    >
                        {contacts.map((contact, idx) => (
                            <motion.a
                                key={contact.id}
                                href={contact.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ delay: idx * 0.05 }}
                                className={`flex items-center gap-3 px-4 py-3 rounded-2xl shadow-lg transition-transform hover:scale-105 ${contact.color}`}
                                title={contact.label}
                            >
                                <span className="font-bold text-sm hidden sm:block pr-2">{contact.label}</span>
                                {contact.icon}
                            </motion.a>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 ${isOpen ? 'bg-slate-800 text-white rotate-90' : 'bg-accent-cyan text-white animate-bounce-slow'
                    }`}
                style={!isOpen ? { animation: 'bounce 2s infinite' } : {}}
            >
                {isOpen ? <X className="w-8 h-8" /> : <MessageCircle className="w-8 h-8" />}
            </button>
        </div>
    );
}
