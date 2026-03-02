import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(req: Request) {
    try {
        const body = await req.json();

        // Save to Supabase first
        const supabase = await createClient();
        const { name, phone, address, service, description, quiz_data } = body;
        const { error: dbError } = await supabase.from('leads').insert({
            name,
            phone,
            address: address || null,
            service: service || null,
            problem_description: description || null,
            quiz_data: quiz_data || {},
            status: 'new'
        });

        if (dbError) {
            console.error('Supabase lead insert error:', dbError);
        }

        // In production, fetch these securely from process.env
        // TELEGRAM_BOT_TOKEN
        // TELEGRAM_CHAT_ID

        const botToken = process.env.TELEGRAM_BOT_TOKEN;
        const chatId = process.env.TELEGRAM_CHAT_ID;

        if (!botToken || !chatId) {
            console.log('Telegram Token missing, logging payload:', body);
            return NextResponse.json({ success: true, dummy: true });
        }

        let quizDetails = "";
        if (body.quiz_data) {
            const q = body.quiz_data;
            quizDetails = `
🛠 <b>Детали Квиза:</b>
• Тип: ${q.serviceType || '---'}
• Метры: ${q.meters || 0}
• Комнаты: ${q.rooms || 1}
• Срочность: ${q.urgency || '---'}
`;
        }

        const message = `🚨 <b>Новая Заявка: Сантехник</b> 🚨

👤 Имя: ${body.name}
📱 Телефон: ${body.phone}
📍 Адрес: ${body.address || 'Не указан'}
📝 Описание: ${body.description || 'Не указана'}
${quizDetails}`;

        const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: chatId,
                text: message,
                parse_mode: 'html',
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
