const fs = require('fs');
const path = require('path');

const quizRu = {
    title: "Калькулятор",
    title_highlight: "Цен",
    subtitle: "Ответьте на несколько вопросов, чтобы узнать точную стоимость работ",
    step: "Шаг {step} из 5",
    step_ready: "Расчет готов",
    step1_title: "Какая услуга вам нужна?",
    services: {
        clear_blockage: "Устранение засора",
        replace_mixer: "Замена смесителя",
        install_toilet: "Установка унитаза",
        pipe_routing: "Разводка труб",
        heating_install: "Монтаж отопления",
        emergency_call: "Аварийный выезд"
    },
    step2_title: "Детали помещения",
    meters_title: "Примерный метраж труб (от 1 до 100 м)",
    meters_placeholder: "Например, 10",
    rooms_title: "Количество помещений/точек",
    step3_title: "Срочность работ",
    urgency: {
        standard: "В плановом порядке (будни)",
        weekend: "В выходной день (+20%)",
        night: "Ночной аварийный выезд (+50%)"
    },
    step4_title: "Прикрепить фото (необязательно)",
    step4_desc: "Если у вас есть фото проблемы, прикрепите его, чтобы мастер мог взять нужные запчасти.",
    drag_drop: "Нажмите или перетащите файл сюда",
    file_format: "PNG, JPG до 5 MB",
    step5_title: "Предварительный расчет",
    step5_desc: "Итоговая сумма зависит от точных материалов и дополнительных нюансов.",
    call_fee: "Вызов мастера: 0 MDL (при заказе)",
    btn_fix_price: "Зафиксировать Цену и Вызвать Мастера",
    btn_restart: "Рассчитать заново",
    btn_prev: "Назад",
    btn_next: "Далее"
};

const quizRo = {
    title: "Calculator",
    title_highlight: "de Prețuri",
    subtitle: "Răspundeți la câteva întrebări pentru a afla costul exact al lucrărilor",
    step: "Pasul {step} din 5",
    step_ready: "Calcul finalizat",
    step1_title: "De ce serviciu aveți nevoie?",
    services: {
        clear_blockage: "Desfundare canalizare",
        replace_mixer: "Înlocuire baterie",
        install_toilet: "Instalare vas WC",
        pipe_routing: "Instalații țevi",
        heating_install: "Montaj încălzire",
        emergency_call: "Intervenție de urgență"
    },
    step2_title: "Detalii încăpere",
    meters_title: "Metraj aproximativ țevi (1 - 100 m)",
    meters_placeholder: "Exemplu, 10",
    rooms_title: "Număr de încăperi/puncte",
    step3_title: "Urgența lucrării",
    urgency: {
        standard: "În regim normal (zile lucrătoare)",
        weekend: "În weekend (+20%)",
        night: "Intervenție de urgență noaptea (+50%)"
    },
    step4_title: "Atașați o fotografie (opțional)",
    step4_desc: "Dacă aveți o poză a problemei, atașați-o pentru ca meșterul să ia piesele potrivite.",
    drag_drop: "Apăsați sau trageți fișierul aici",
    file_format: "PNG, JPG până la 5 MB",
    step5_title: "Calcul estimativ",
    step5_desc: "Suma finală depinde de materialele exacte și detaliile suplimentare.",
    call_fee: "Deplasarea meșterului: 0 MDL (la comandă)",
    btn_fix_price: "Aplicați Prețul și Chemați Meșterul",
    btn_restart: "Recalculați",
    btn_prev: "Înapoi",
    btn_next: "Următorul"
};

const updateJson = (filePath, key, newData) => {
    const fullPath = path.resolve(filePath);
    const content = fs.readFileSync(fullPath, 'utf8');
    const parsed = JSON.parse(content);
    parsed[key] = newData;
    fs.writeFileSync(fullPath, JSON.stringify(parsed, null, 2), 'utf8');
    console.log(`Updated ${filePath}`);
};

updateJson('c:/Users/admin/Desktop/landing Santehnik/src/messages/ru.json', 'QuizCalculator', quizRu);
updateJson('c:/Users/admin/Desktop/landing Santehnik/src/messages/ro.json', 'QuizCalculator', quizRo);
