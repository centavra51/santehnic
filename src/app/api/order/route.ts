import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const body = await req.json();

        // In production, fetch these securely from process.env
        // TELEGRAM_BOT_TOKEN
        // TELEGRAM_CHAT_ID

        const botToken = process.env.TELEGRAM_BOT_TOKEN;
        const chatId = process.env.TELEGRAM_CHAT_ID;

        if (!botToken || !chatId) {
            console.log('Telegram Token missing, logging payload:', body);
            return NextResponse.json({ success: true, dummy: true });
        }

        const message = `
🚨 **Новая Заявка: Сантехник** 🚨

👤 Имя: ${body.name}
📱 Телефон: ${body.phone}
📍 Адрес: ${body.address}
📝 Проблема: ${body.description || 'Не указана'}
    `;

        const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: chatId,
                text: message,
                parse_mode: 'Markdown',
            }),
        });

        if (!response.ok) {
            throw new Error('Telegram API Error');
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Order submission error:', error);
        return NextResponse.json({ error: 'Failed to process order' }, { status: 500 });
    }
}
