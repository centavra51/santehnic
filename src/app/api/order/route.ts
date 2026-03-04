import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

// Service key → human-readable name mapping
const SERVICE_NAMES: Record<string, { ru: string; ro: string }> = {
    'clear_blockage': { ru: 'Устранение засора', ro: 'Desfundare canalizare' },
    'replace_mixer': { ru: 'Замена смесителя', ro: 'Înlocuire baterie' },
    'install_toilet': { ru: 'Установка унитаза', ro: 'Instalare vas WC' },
    'pipe_routing': { ru: 'Разводка труб', ro: 'Instalații țevi' },
    'heating_install': { ru: 'Монтаж отопления', ro: 'Montaj încălzire' },
    'emergency_call': { ru: 'Аварийный выезд', ro: 'Intervenție de urgență' },
};

const URGENCY_LABELS: Record<string, string> = {
    'standard': '📗 Плановый (будни)',
    'weekend': '📙 Выходной (+20%)',
    'night': '📕 Ночной аварийный (+50%)',
};

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, phone, address, service, description, quiz_data, source } = body;

        // Resolve service name for display
        const serviceKey = service || quiz_data?.serviceType || null;
        const serviceName = serviceKey && SERVICE_NAMES[serviceKey]
            ? SERVICE_NAMES[serviceKey].ru
            : serviceKey || null;

        // 1. Save to Supabase (Leads table)
        console.log('--- SUPABASE INSERTION ATTEMPT ---');
        console.log('Lead Name:', name);

        const supabase = await createClient();

        // Try FULL insertion first
        const { data: supabaseData, error: dbError, status: dbStatus } = await supabase
            .from('leads')
            .insert([{
                name,
                phone,
                address: address || null,
                service_type: serviceName,
                problem_description: description || null,
                quiz_data: quiz_data || {},
                status: 'new'
            }])
            .select();

        let finalError = dbError;

        // FALLBACK: If full insert fails, try a MINIMAL insert (Safe Mode)
        // This handles cases where columns like 'service_type' or 'quiz_data' are missing
        if (dbError) {
            console.warn('FULL insertion failed. Attempting MINIMAL (Safe Mode) insertion...');
            console.warn('Reason:', dbError.message);

            const { error: fallbackError } = await supabase
                .from('leads')
                .insert([{
                    name,
                    phone,
                    address: address || null
                }]);

            if (fallbackError) {
                console.error('CRITICAL: Both FULL and MINIMAL insertions failed!');
                finalError = fallbackError;
            } else {
                console.log('SUCCESS: Lead saved using MINIMAL fallback (Safe Mode).');
                finalError = null;
            }
        } else {
            console.log('SUCCESS: Lead saved to Supabase (Full Data).');
        }

        if (finalError) {
            console.error('Final Supabase Error:', finalError.message);
            console.error('HTTP Status:', dbStatus);
        }
        console.log('--- END SUPABASE INSERTION ---');

        // ──────────────────────────────────────
        // 2. Send to Telegram
        // ──────────────────────────────────────
        const botToken = process.env.TELEGRAM_BOT_TOKEN;
        const chatId = process.env.TELEGRAM_CHAT_ID;

        if (!botToken || !chatId) {
            console.log('Telegram Token missing, logging payload:', body);
            return NextResponse.json({ success: true, dummy: true });
        }

        // Format date/time
        const now = new Date();
        const dateStr = now.toLocaleString('ru-RU', {
            timeZone: 'Europe/Chisinau',
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });

        // Determine lead source label
        const sourceLabel = source === 'quiz'
            ? '🧮 Квиз-калькулятор'
            : '📝 Форма на сайте';

        // Build quiz details block
        let quizBlock = '';
        if (quiz_data && Object.keys(quiz_data).length > 0) {
            const q = quiz_data;
            const svcName = q.serviceType && SERVICE_NAMES[q.serviceType]
                ? SERVICE_NAMES[q.serviceType].ru
                : (q.serviceType || '—');
            const urgLabel = URGENCY_LABELS[q.urgency] || q.urgency || '—';
            const photoLink = q.photoUrl ? `\n\n🖼 <b>Фото проблемы:</b> <a href="${q.photoUrl}">Открыть фото</a>` : '';

            quizBlock = `
┌─────────────────────────┐
│  🧮  <b>ДАННЫЕ КВИЗА</b>
├─────────────────────────┤
│  🔧 Услуга:  <b>${svcName}</b>
│  📏 Метраж:  <b>${q.meters || 0} м</b>
│  🚪 Комнаты: <b>${q.rooms || 1}</b>
│  ⏰ Срочность: <b>${urgLabel}</b>
│
│  💰 <b>ИТОГО: ${q.totalPrice || '—'} MDL</b>
└─────────────────────────┘${photoLink}`;
        }

        // Build the main Telegram message
        const message = `
━━━━━━━━━━━━━━━━━━━━━
🚨  <b>НОВАЯ ЗАЯВКА</b>  🚨
━━━━━━━━━━━━━━━━━━━━━

📅 <b>Дата:</b>  ${dateStr}
🏷 <b>Источник:</b>  ${sourceLabel}

┌─────────────────────────┐
│  👤  <b>КЛИЕНТ</b>
├─────────────────────────┤
│  📛 Имя:     <b>${name}</b>
│  📱 Телефон: <b>${phone}</b>
│  📍 Адрес:   <b>${address || 'Не указан'}</b>
└─────────────────────────┘
${serviceName ? `\n🔧 <b>Услуга:</b>  ${serviceName}` : ''}
${description ? `📝 <b>Описание:</b>  ${description}` : ''}
${quizBlock}
━━━━━━━━━━━━━━━━━━━━━`.trim();

        const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: chatId,
                text: message,
                parse_mode: 'HTML',
            }),
        });

        if (!response.ok) {
            const errBody = await response.text();
            console.error('Telegram API Error:', errBody);
            // Don't throw — lead is already saved to DB
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Order submission error:', error);
        return NextResponse.json({ error: 'Failed to process order' }, { status: 500 });
    }
}
