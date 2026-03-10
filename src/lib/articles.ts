import { createClient } from '@/lib/supabase/server';

export type ArticleRecord = {
  id: string;
  slug: string;
  title_ru: string;
  title_ro: string;
  excerpt_ru: string;
  excerpt_ro: string;
  content_ru: string;
  content_ro: string;
  seo_title_ru: string;
  seo_title_ro: string;
  seo_description_ru: string;
  seo_description_ro: string;
  image_url: string;
  is_published: boolean;
  created_at: string;
  updated_at: string;
};

const LOCAL_ARTICLES: ArticleRecord[] = [
  {
    id: 'local-clog-cleaning-chisinau',
    slug: 'kak-ustranit-zasor-v-rakovine-kishiniov',
    title_ru: 'Как устранить засор в раковине в Кишиневе и когда нужен сантехник',
    title_ro: 'Cum desfundeți chiuveta în Chișinău și când trebuie chemat instalatorul',
    excerpt_ru:
      'Практическое руководство по устранению засора в раковине: признаки, безопасные способы прочистки и ситуации, когда лучше вызвать сантехника в Кишиневе.',
    excerpt_ro:
      'Ghid practic pentru desfundarea chiuvetei: semne, metode sigure de curățare și cazurile în care este mai bine să chemați instalatorul în Chișinău.',
    seo_title_ru: 'Как устранить засор в раковине в Кишиневе: советы сантехника',
    seo_title_ro: 'Cum desfundați chiuveta în Chișinău: sfaturi de la instalator',
    seo_description_ru:
      'Узнайте, как устранить засор в раковине без повреждения труб. Советы сантехника, профилактика и срочный выезд по Кишиневу.',
    seo_description_ro:
      'Aflați cum puteți desfunda chiuveta fără a deteriora țevile. Sfaturi de la instalator, prevenție și intervenție rapidă în Chișinău.',
    image_url: '/articles/clog-cleaning.png',
    is_published: true,
    created_at: '2026-03-01T09:00:00.000Z',
    updated_at: '2026-03-01T09:00:00.000Z',
    content_ru: `
      <p>Засор в раковине обычно начинается незаметно: вода уходит медленнее, появляется неприятный запах, а затем слив может полностью остановиться. Для квартир и домов в Кишиневе это одна из самых частых причин срочного вызова сантехника, особенно на кухне, где в трубы попадают жир, остатки пищи и бытовой мусор.</p>
      <h2>Почему появляется засор</h2>
      <p>Чаще всего проблема возникает из-за жировых отложений, волос, мыльного налета и неправильного уклона труб. Если системе больше 10 лет, внутри труб скапливается плотный налет, который со временем уменьшает проход для воды.</p>
      <h2>Что можно сделать самостоятельно</h2>
      <ul>
        <li>Промойте слив горячей водой, если трубы не пластиковые и нет риска деформации.</li>
        <li>Используйте вантуз, чтобы создать давление и сдвинуть пробку.</li>
        <li>Разберите и промойте сифон, если засор локальный и находится под мойкой.</li>
        <li>Применяйте бытовую химию только по инструкции и не смешивайте разные средства.</li>
      </ul>
      <h2>Когда лучше не рисковать</h2>
      <p>Если вода стоит полностью, засор повторяется через несколько дней или проблема затронула сразу мойку, ванну и унитаз, значит пробка находится глубже. В такой ситуации попытки прочистить трубу тросом без опыта могут повредить соединения, сифоны и пластиковые участки канализации.</p>
      <h2>Когда нужен сантехник в Кишиневе</h2>
      <p>Профессиональная прочистка нужна при сложных засорах, запахе из канализации, обратном ходе воды и старой системе труб. Мастер использует трос, насадки и диагностирует, нет ли в системе провисаний, неправильных поворотов или частичного разрушения трубы.</p>
      <p>Если вы живете в Кишиневе или пригороде и засор мешает пользоваться кухней или ванной, быстрее и безопаснее вызвать сантехника на дом. Это особенно важно для семей с детьми, арендных квартир и коммерческих помещений, где простои приводят к дополнительным затратам.</p>
      <h2>Как избежать повторения</h2>
      <ul>
        <li>Не сливайте жир и остатки еды в кухонную мойку.</li>
        <li>Установите сетку на слив.</li>
        <li>Промывайте систему горячей водой для профилактики.</li>
        <li>Раз в несколько месяцев выполняйте профилактическую чистку сифона.</li>
      </ul>
      <p>Если засор уже стал системной проблемой, стоит проверить состояние труб и при необходимости заменить изношенные участки. Такой подход помогает не бороться с последствиями каждую неделю, а решить причину один раз.</p>
    `,
    content_ro: `
      <p>Un blocaj în chiuvetă începe de obicei discret: apa se scurge mai greu, apare miros neplăcut, iar apoi scurgerea se poate opri complet. Pentru apartamentele și casele din Chișinău aceasta este una dintre cele mai frecvente cauze pentru chemarea urgentă a instalatorului, mai ales în bucătărie, unde în țevi ajung grăsime, resturi alimentare și murdărie.</p>
      <h2>De ce apare blocajul</h2>
      <p>Cel mai des problema este provocată de depunerile de grăsime, păr, săpun și de panta incorectă a țevilor. Dacă instalația are mai mult de 10 ani, pe interior se formează un strat dens care reduce treptat spațiul pentru apă.</p>
      <h2>Ce puteți face singur</h2>
      <ul>
        <li>Clătiți scurgerea cu apă fierbinte dacă țevile permit acest lucru.</li>
        <li>Folosiți ventuza pentru a crea presiune și a deplasa dopul.</li>
        <li>Demontați și curățați sifonul dacă blocajul este local.</li>
        <li>Utilizați soluțiile chimice doar conform instrucțiunilor și nu le combinați.</li>
      </ul>
      <h2>Când nu merită să riscați</h2>
      <p>Dacă apa stagnează complet, blocajul reapare după câteva zile sau problema afectează simultan chiuveta, cada și vasul WC, dopul se află mai adânc. În astfel de cazuri, curățarea cu spirală fără experiență poate deteriora racordurile și porțiunile de plastic.</p>
      <h2>Când trebuie chemat instalatorul în Chișinău</h2>
      <p>Curățarea profesională este necesară în cazul blocajelor complexe, al mirosului din canalizare, al refluxului de apă și al țevilor vechi. Meșterul folosește cablu profesional, accesorii potrivite și verifică dacă există curburi incorecte sau zone deteriorate.</p>
      <p>Dacă locuiți în Chișinău sau în suburbii și blocajul vă împiedică să folosiți bucătăria ori baia, este mai sigur și mai rapid să chemați instalatorul la domiciliu. Acest lucru este important mai ales pentru familii, apartamente date în chirie și spații comerciale.</p>
      <h2>Cum preveniți repetarea</h2>
      <ul>
        <li>Nu turnați grăsime și resturi alimentare în chiuvetă.</li>
        <li>Montați o sită pe scurgere.</li>
        <li>Clătiți periodic instalația cu apă fierbinte.</li>
        <li>Curățați preventiv sifonul la câteva luni.</li>
      </ul>
      <p>Dacă blocajul a devenit o problemă constantă, merită verificată starea țevilor și, la nevoie, înlocuite segmentele uzate. Astfel rezolvați cauza, nu doar efectul.</p>
    `,
  },
  {
    id: 'local-faucet-leak-chisinau',
    slug: 'pochemu-techet-smesitel-remont-ili-zamena',
    title_ru: 'Почему течет смеситель: когда помогает ремонт, а когда нужна замена',
    title_ro: 'De ce curge bateria: când ajunge reparația și când este necesară înlocuirea',
    excerpt_ru:
      'Разбираем, почему течет смеситель на кухне или в ванной, какие поломки можно устранить быстро и когда выгоднее поставить новый кран.',
    excerpt_ro:
      'Analizăm de ce curge bateria din baie sau bucătărie, ce defecțiuni pot fi remediate rapid și când este mai avantajoasă înlocuirea.',
    seo_title_ru: 'Почему течет смеситель и что делать: ремонт сантехники в Кишиневе',
    seo_title_ro: 'De ce curge bateria și ce puteți face: reparații sanitare în Chișinău',
    seo_description_ru:
      'Течь смесителя увеличивает расход воды и портит отделку. Узнайте, когда возможен ремонт, а когда нужна замена смесителя с гарантией.',
    seo_description_ro:
      'Scurgerile la baterie cresc consumul de apă și afectează finisajele. Aflați când se repară și când se schimbă bateria cu garanție.',
    image_url: '/articles/faucet-repair.png',
    is_published: true,
    created_at: '2026-03-02T09:00:00.000Z',
    updated_at: '2026-03-02T09:00:00.000Z',
    content_ru: `
      <p>Капающая вода из смесителя кажется мелочью, но за месяц даже небольшая течь может привести к заметным счетам за воду, известковому налету и повреждению мебели. В Кишиневе особенно часто ломаются смесители в квартирах со старой сантехникой и нестабильным давлением воды.</p>
      <h2>Основные причины течи</h2>
      <ul>
        <li>Износ картриджа или керамической кран-буксы.</li>
        <li>Повреждение прокладок, уплотнителей и резьбовых соединений.</li>
        <li>Трещина в корпусе смесителя.</li>
        <li>Неправильная установка или перекос при монтаже.</li>
      </ul>
      <h2>Когда ремонт оправдан</h2>
      <p>Если смеситель качественный, а проблема ограничена прокладкой, аэратором, кран-буксой или картриджем, ремонт обычно выгоднее. Замена внутреннего механизма занимает немного времени и позволяет восстановить нормальную работу без демонтажа всей системы.</p>
      <h2>Когда лучше заменить смеситель</h2>
      <p>Полная замена нужна, если корпус дал трещину, резьба повреждена, модель слишком старая или уже несколько раз ремонтировалась. Недорогие смесители часто выходят из строя повторно, поэтому постоянный ремонт становится дороже установки нового крана.</p>
      <h2>Как понять, что проблема срочная</h2>
      <p>Если вода течет из-под гайки, у основания корпуса, из душевого переключателя или под мойкой, откладывать нельзя. Влага портит тумбы, стены и пол, а в многоквартирном доме появляется риск затопить соседей.</p>
      <h2>Что делает сантехник</h2>
      <p>Мастер определяет источник течи, перекрывает воду, подбирает совместимые детали и проверяет состояние подводок. При необходимости он сразу меняет гибкие шланги, эксцентрики и уплотнения, чтобы не оставлять слабые места в системе.</p>
      <p>Если вам нужен ремонт смесителя в Кишиневе, важно не просто остановить течь, а устранить причину. Это позволяет избежать повторной поломки через неделю и сохранить отделку кухни или ванной.</p>
    `,
    content_ro: `
      <p>Picurarea apei din baterie pare un detaliu minor, însă chiar și o scurgere mică poate duce în timp la facturi mai mari, depuneri de calcar și deteriorarea mobilierului. În Chișinău se defectează frecvent bateriile din apartamentele cu instalații vechi și presiune instabilă a apei.</p>
      <h2>Cauzele principale ale scurgerii</h2>
      <ul>
        <li>Uzura cartușului sau a mecanismului ceramic.</li>
        <li>Deteriorarea garniturilor și a etanșărilor.</li>
        <li>Fisură în corpul bateriei.</li>
        <li>Montaj incorect sau tensionat.</li>
      </ul>
      <h2>Când merită reparată</h2>
      <p>Dacă bateria este de calitate, iar problema ține de cartuș, garnitură sau aerator, reparația este de obicei soluția corectă. Înlocuirea mecanismului intern durează puțin și nu necesită demontarea completă a instalației.</p>
      <h2>Când este mai bine să o înlocuiți</h2>
      <p>Înlocuirea completă este necesară dacă corpul este crăpat, filetul este deteriorat, modelul este foarte vechi sau a fost deja reparat de mai multe ori. Bateriile ieftine se defectează repetat, iar reparațiile succesive devin mai scumpe decât montarea unui model nou.</p>
      <h2>Cum recunoașteți o urgență</h2>
      <p>Dacă apa curge pe la piuliță, de la bază, din comutatorul dușului sau sub chiuvetă, nu este bine să amânați intervenția. Umezeala afectează mobilierul, pereții și podeaua, iar într-un bloc există și riscul de a inunda vecinii.</p>
      <h2>Ce face instalatorul</h2>
      <p>Meșterul identifică sursa exactă a scurgerii, oprește apa, alege piesele compatibile și verifică starea racordurilor. La nevoie, schimbă furtunurile flexibile, excentricele și etanșările pentru a evita alte puncte slabe în sistem.</p>
      <p>Dacă aveți nevoie de reparația bateriei în Chișinău, este important să fie eliminată cauza, nu doar efectul vizibil. Astfel evitați o nouă scurgere după câteva zile.</p>
    `,
  },
  {
    id: 'local-pipe-replacement-chisinau',
    slug: 'zamena-trub-i-stoyakov-v-kvartire-kishiniov',
    title_ru: 'Замена труб и стояков в квартире: как подготовиться к работам',
    title_ro: 'Înlocuirea țevilor și a coloanelor în apartament: cum vă pregătiți corect',
    excerpt_ru:
      'Пошагово объясняем, когда нужна замена труб, как выбрать материал и что важно учесть перед ремонтом в квартире или доме.',
    excerpt_ro:
      'Explicăm pas cu pas când este necesară înlocuirea țevilor, ce materiale se aleg și ce trebuie pregătit înainte de lucrare.',
    seo_title_ru: 'Замена труб и стояков в Кишиневе: подготовка, цены, советы',
    seo_title_ro: 'Înlocuirea țevilor și a coloanelor în Chișinău: pregătire și sfaturi',
    seo_description_ru:
      'Старые трубы повышают риск протечек и аварий. Узнайте, как проходит замена труб и стояков в квартире в Кишиневе и что важно предусмотреть.',
    seo_description_ro:
      'Țevile vechi cresc riscul de scurgeri și avarii. Aflați cum se desfășoară înlocuirea țevilor și a coloanelor în apartamentele din Chișinău.',
    image_url: '/articles/pipe-replacement.png',
    is_published: true,
    created_at: '2026-03-03T09:00:00.000Z',
    updated_at: '2026-03-03T09:00:00.000Z',
    content_ru: `
      <p>Замена труб и стояков в квартире требуется не только во время капитального ремонта. Если в системе появляются коррозия, протечки, слабый напор и постоянные подтеки на соединениях, откладывать обновление коммуникаций уже опасно.</p>
      <h2>Признаки, что трубы пора менять</h2>
      <ul>
        <li>Ржавчина на соединениях и мокрые участки на стояке.</li>
        <li>Постоянные засоры и плохой слив.</li>
        <li>Слабый напор воды даже после замены смесителей.</li>
        <li>Старые металлические трубы старше 20 лет.</li>
      </ul>
      <h2>Какие материалы выбирают чаще всего</h2>
      <p>Для разводки воды в квартирах Кишинева обычно используют полипропилен, сшитый полиэтилен или металлопластик. Для канализации подходят современные пластиковые трубы с правильным диаметром и уклоном. Конкретный выбор зависит от бюджета, условий монтажа и конфигурации помещения.</p>
      <h2>Как подготовиться к замене</h2>
      <ul>
        <li>Согласуйте отключение воды, если затрагивается стояк.</li>
        <li>Освободите доступ к санузлу, кухне и техническим нишам.</li>
        <li>Продумайте расположение сантехники и бытовой техники.</li>
        <li>Сразу заложите ревизионные люки и точки обслуживания.</li>
      </ul>
      <h2>Почему важен профессиональный монтаж</h2>
      <p>Даже качественные материалы не спасут, если неправильно рассчитан диаметр труб, нарушен уклон канализации или использованы слабые соединения. Ошибки на этапе разводки проявляются уже после отделки, когда приходится вскрывать плитку и стену.</p>
      <h2>Что входит в работу сантехника</h2>
      <p>Мастер демонтирует старые участки, подготавливает схему разводки, монтирует новые трубы, выполняет опрессовку и проверяет герметичность. При необходимости можно сразу подключить бойлер, стиральную машину, фильтры и коллекторы.</p>
      <p>Если вы планируете замену труб в Кишиневе, выгоднее делать это комплексно: один раз продумать всю систему, чем позже исправлять аварии по частям. Такой подход уменьшает риски и экономит бюджет на будущий ремонт.</p>
    `,
    content_ro: `
      <p>Înlocuirea țevilor și a coloanelor în apartament nu este necesară doar în timpul renovării capitale. Dacă în instalație apar coroziune, scurgeri, presiune slabă și umezeală constantă la îmbinări, amânarea lucrării devine riscantă.</p>
      <h2>Semne că țevile trebuie schimbate</h2>
      <ul>
        <li>Rugină la îmbinări și porțiuni umede pe coloană.</li>
        <li>Blocaje dese și evacuare slabă.</li>
        <li>Presiune mică a apei chiar și după schimbarea bateriilor.</li>
        <li>Țevi metalice vechi de peste 20 de ani.</li>
      </ul>
      <h2>Ce materiale se aleg cel mai des</h2>
      <p>Pentru distribuția apei în apartamentele din Chișinău se folosesc frecvent polipropilenă, PEX sau metal-plastic. Pentru canalizare sunt potrivite țevile moderne din plastic, cu diametrul și panta corecte. Alegerea depinde de buget și de configurația spațiului.</p>
      <h2>Cum vă pregătiți pentru lucrare</h2>
      <ul>
        <li>Coordonați oprirea apei dacă este afectată coloana.</li>
        <li>Asigurați accesul liber la baie, bucătărie și nișele tehnice.</li>
        <li>Stabiliți poziția obiectelor sanitare și a electrocasnicelor.</li>
        <li>Prevedeți din timp trape de revizie și puncte de service.</li>
      </ul>
      <h2>De ce este important montajul profesionist</h2>
      <p>Chiar și materialele bune nu ajută dacă diametrul este calculat greșit, panta canalizării este incorectă sau îmbinările sunt slabe. Erorile de la montaj apar exact după finisaje, când trebuie spartă din nou faianța sau peretele.</p>
      <h2>Ce include lucrarea instalatorului</h2>
      <p>Meșterul demontează conductele vechi, pregătește schema noii instalații, montează țevile, face proba de presiune și verifică etanșeitatea. La nevoie, pot fi conectate imediat boilerul, mașina de spălat, filtrele și colectoarele.</p>
      <p>Dacă planificați înlocuirea țevilor în Chișinău, este mai avantajos să gândiți sistemul complet din prima, decât să reparați ulterior fiecare avarie separat.</p>
    `,
  },
  {
    id: 'local-boiler-guide-chisinau',
    slug: 'kak-vybrat-i-ustanovit-boyler-v-kvartire',
    title_ru: 'Как выбрать и установить бойлер в квартире без ошибок',
    title_ro: 'Cum alegeți și instalați boilerul în apartament fără greșeli',
    excerpt_ru:
      'Какая мощность нужна, где лучше разместить бойлер и почему важно доверить подключение специалисту с опытом.',
    excerpt_ro:
      'Ce volum și putere sunt necesare, unde se montează corect boilerul și de ce conectarea trebuie făcută de un specialist.',
    seo_title_ru: 'Как выбрать бойлер для квартиры и установить его правильно',
    seo_title_ro: 'Cum alegeți boilerul pentru apartament și îl instalați corect',
    seo_description_ru:
      'Подбираем бойлер для квартиры: объем, место установки, безопасность и профессиональное подключение в Кишиневе.',
    seo_description_ro:
      'Alegeți corect boilerul pentru apartament: volum, amplasare, siguranță și conectare profesională în Chișinău.',
    image_url: '/articles/boiler-installation.png',
    is_published: true,
    created_at: '2026-03-04T09:00:00.000Z',
    updated_at: '2026-03-04T09:00:00.000Z',
    content_ru: `
      <p>Бойлер остается одним из самых практичных решений для квартиры, где бывают перебои с горячей водой или требуется стабильный запас на всю семью. Но чтобы оборудование работало безопасно и долго, важно правильно выбрать модель и профессионально выполнить монтаж.</p>
      <h2>Какой объем выбрать</h2>
      <ul>
        <li>30-50 литров обычно хватает для одного человека.</li>
        <li>50-80 литров подходят для пары или небольшой семьи.</li>
        <li>80-100 литров выбирают для семьи из трех-четырех человек.</li>
      </ul>
      <h2>На что смотреть кроме объема</h2>
      <p>Имеют значение мощность ТЭНа, тип бака, защита от коррозии, наличие магниевого анода и качество теплоизоляции. Важно также заранее понимать, выдержит ли стена нагрузку и есть ли рядом удобная точка подключения воды и электричества.</p>
      <h2>Почему монтаж нельзя делать наспех</h2>
      <p>При подключении бойлера нужно установить запорную арматуру, обратный клапан, предохранительный узел и правильно организовать слив. Ошибка в подключении может привести к течи, повышенному давлению в системе и сокращению срока службы оборудования.</p>
      <h2>Где лучше размещать бойлер</h2>
      <p>Чаще всего его ставят в ванной, санузле или на кухне, если там есть несущая стена и короткая линия к точкам водоразбора. Чем короче трасса, тем меньше теплопотери и быстрее идет горячая вода.</p>
      <h2>Когда нужен сантехник</h2>
      <p>Если требуется крепление на плитку, перенос труб, врезка в существующую систему или подключение в ограниченном пространстве, лучше сразу вызывать мастера. Специалист подберет крепеж, проверит давление и обеспечит герметичность всех соединений.</p>
      <p>Для жителей Кишинева установка бойлера под ключ удобна тем, что в один визит можно решить и монтаж, и подключение, и проверку системы. Это снижает риск ошибок и позволяет получить рабочее решение с гарантией.</p>
    `,
    content_ro: `
      <p>Boilerul rămâne una dintre cele mai practice soluții pentru apartamentele în care apar întreruperi ale apei calde sau este nevoie de un volum constant pentru toată familia. Pentru ca echipamentul să funcționeze sigur și durabil, trebuie aleasă corect capacitatea și realizat un montaj profesionist.</p>
      <h2>Ce volum trebuie ales</h2>
      <ul>
        <li>30-50 litri sunt suficienți de obicei pentru o persoană.</li>
        <li>50-80 litri sunt potriviți pentru un cuplu sau o familie mică.</li>
        <li>80-100 litri sunt aleși frecvent pentru 3-4 persoane.</li>
      </ul>
      <h2>La ce să fiți atenți în afară de volum</h2>
      <p>Contează puterea rezistenței, tipul rezervorului, protecția anticorozivă, anodul de magneziu și calitatea izolației termice. Este important și dacă peretele suportă greutatea și dacă există un punct convenabil de conectare la apă și electricitate.</p>
      <h2>De ce montajul nu trebuie făcut în grabă</h2>
      <p>La conectarea boilerului trebuie montate robineți de închidere, supapă de sens, grup de siguranță și evacuare corectă. O greșeală de montaj poate provoca scurgeri, suprapresiune și reducerea duratei de viață a echipamentului.</p>
      <h2>Unde se montează cel mai bine</h2>
      <p>Cel mai des boilerul este instalat în baie, grup sanitar sau bucătărie, acolo unde există un perete rezistent și o distanță scurtă până la punctele de consum. Cu cât traseul este mai scurt, cu atât pierderile de căldură sunt mai mici.</p>
      <h2>Când este necesar instalatorul</h2>
      <p>Dacă este nevoie de fixare pe faianță, mutarea țevilor, racordare la instalația existentă sau montaj într-un spațiu îngust, este mai bine să fie chemat un specialist. Acesta alege fixarea corectă, verifică presiunea și etanșează toate conexiunile.</p>
      <p>Pentru locuitorii din Chișinău, instalarea boilerului la cheie este convenabilă fiindcă într-o singură vizită se rezolvă montajul, conectarea și testarea sistemului.</p>
    `,
  },
  {
    id: 'local-radiator-not-heating',
    slug: 'chto-delat-esli-batareya-ne-greet',
    title_ru: 'Что делать, если батарея не греет: диагностика перед вызовом мастера',
    title_ro: 'Ce faceți dacă radiatorul nu încălzește: verificări înainte de a chema meșterul',
    excerpt_ru:
      'Почему радиатор остается холодным, как проверить воздух и в каких случаях проблема уже не решается без сантехника.',
    excerpt_ro:
      'De ce caloriferul rămâne rece, cum verificați aerul din instalație și când problema nu mai poate fi rezolvată fără specialist.',
    seo_title_ru: 'Почему батарея не греет: причины и помощь сантехника в Кишиневе',
    seo_title_ro: 'De ce caloriferul nu încălzește: cauze și ajutor în Chișinău',
    seo_description_ru:
      'Холодная батарея зимой требует быстрой диагностики. Основные причины, безопасные проверки и ремонт отопления в Кишиневе.',
    seo_description_ro:
      'Un calorifer rece iarna necesită diagnostic rapid. Cauze principale, verificări sigure și reparații de încălzire în Chișinău.',
    image_url: '/articles/radiator-repair.png',
    is_published: true,
    created_at: '2026-03-05T09:00:00.000Z',
    updated_at: '2026-03-05T09:00:00.000Z',
    content_ru: `
      <p>Если батарея остается холодной в отопительный сезон, это не всегда означает серьезную аварию, но игнорировать проблему нельзя. В квартире быстро падает температура, растет влажность, а в некоторых случаях холодный радиатор указывает на завоздушивание или неправильную работу всей системы отопления.</p>
      <h2>Наиболее частые причины</h2>
      <ul>
        <li>Воздух в радиаторе или стояке.</li>
        <li>Засор внутри батареи или труб.</li>
        <li>Неисправный кран, термоголовка или запорная арматура.</li>
        <li>Неправильное подключение радиатора после ремонта.</li>
      </ul>
      <h2>Что можно проверить самостоятельно</h2>
      <p>Сначала посмотрите, открыт ли запорный кран и не перекрыта ли термоголовка. Затем сравните температуру подающей и обратной трубы. Если одна горячая, а другая холодная, возможен засор или воздушная пробка.</p>
      <h2>Когда нельзя вмешиваться самому</h2>
      <p>Если речь идет о центральном отоплении, попытки разбирать соединения или самостоятельно менять арматуру могут привести к протечке и повреждению системы. Особенно рискованно проводить такие работы зимой, когда любое вмешательство может оставить без тепла и вас, и соседей.</p>
      <h2>Что делает мастер</h2>
      <p>Сантехник проверяет подачу теплоносителя, наличие воздуха, состояние кранов, резьбовых соединений и сам радиатор. При необходимости выполняется промывка, замена арматуры или корректировка подключения батареи.</p>
      <p>Если у вас не греет батарея в Кишиневе, лучше провести диагностику сразу после появления проблемы. Чем раньше найдено узкое место, тем проще и дешевле восстановить нормальный обогрев помещения.</p>
    `,
    content_ro: `
      <p>Dacă radiatorul rămâne rece în sezonul rece, nu înseamnă întotdeauna o avarie gravă, însă problema nu trebuie ignorată. Temperatura din apartament scade repede, crește umezeala, iar în unele situații caloriferul rece indică aer în instalație sau funcționarea incorectă a întregului sistem.</p>
      <h2>Cauze frecvente</h2>
      <ul>
        <li>Aer în calorifer sau pe coloană.</li>
        <li>Blocaj în radiator sau în conducte.</li>
        <li>Robinet, cap termostatic sau armătură defectă.</li>
        <li>Conectare greșită după renovare.</li>
      </ul>
      <h2>Ce puteți verifica singur</h2>
      <p>Mai întâi verificați dacă robinetul este deschis și dacă termostatul nu este blocat. Comparați apoi temperatura țevii de tur și a celei de retur. Dacă una este fierbinte și cealaltă rece, poate exista aer sau un blocaj.</p>
      <h2>Când nu trebuie să interveniți singur</h2>
      <p>Dacă este vorba despre încălzire centralizată, demontarea îmbinărilor sau înlocuirea armăturii fără experiență poate provoca scurgeri și defectarea instalației. Mai ales iarna, orice greșeală poate afecta și locuințele vecine.</p>
      <h2>Ce face meșterul</h2>
      <p>Instalatorul verifică alimentarea agentului termic, prezența aerului, starea robineților, a conexiunilor și a radiatorului. La nevoie se realizează aerisirea, spălarea instalației, schimbarea armăturii sau corectarea racordării.</p>
      <p>Dacă aveți un calorifer rece în Chișinău, este mai bine să faceți diagnosticul imediat. Cu cât cauza este găsită mai repede, cu atât costul reparației este mai mic.</p>
    `,
  },
  {
    id: 'local-washing-machine-install',
    slug: 'podklyuchenie-stiralnoy-mashiny-bez-protechek',
    title_ru: 'Подключение стиральной машины без протечек: важные нюансы монтажа',
    title_ro: 'Conectarea mașinii de spălat fără scurgeri: detalii importante de montaj',
    excerpt_ru:
      'Как правильно подключить стиральную машину к воде и канализации, чтобы избежать протечек, вибрации и запаха из слива.',
    excerpt_ro:
      'Cum conectați corect mașina de spălat la apă și canalizare pentru a evita scurgerile, vibrațiile și mirosurile.',
    seo_title_ru: 'Подключение стиральной машины в Кишиневе без ошибок',
    seo_title_ro: 'Conectarea corectă a mașinii de spălat în Chișinău',
    seo_description_ru:
      'Профессиональное подключение стиральной машины в квартире: вода, слив, защита от протечек и проверка после монтажа.',
    seo_description_ro:
      'Conectarea profesională a mașinii de spălat în apartament: apă, scurgere, protecție împotriva scurgerilor și testare după montaj.',
    image_url: '/articles/washing-machine.png',
    is_published: true,
    created_at: '2026-03-06T09:00:00.000Z',
    updated_at: '2026-03-06T09:00:00.000Z',
    content_ru: `
      <p>Даже новая стиральная машина может работать некорректно, если подключение выполнено с ошибками. Самые частые последствия неправильного монтажа: течь на заливном шланге, запах из канализации, сильная вибрация и преждевременный износ техники.</p>
      <h2>Что важно при подключении</h2>
      <ul>
        <li>Надежная точка подключения к холодной воде.</li>
        <li>Правильный слив с учетом высоты и герметичности.</li>
        <li>Ровная установка техники по уровню.</li>
        <li>Проверка шлангов, крана и соединений под нагрузкой.</li>
      </ul>
      <h2>Почему возникают протечки</h2>
      <p>Обычно проблема связана с плохо затянутыми соединениями, старыми кранами, некачественными переходниками или неправильной посадкой сливного шланга. Иногда течь появляется не сразу, а после нескольких циклов стирки.</p>
      <h2>Нужен ли отдельный кран</h2>
      <p>Да, для стиральной машины лучше предусмотреть отдельный запорный кран. Это удобно для обслуживания и снижает риск аварии, если понадобится быстро перекрыть воду.</p>
      <h2>Почему важна проверка после монтажа</h2>
      <p>После подключения мастер выполняет тестовый запуск, смотрит на работу набора воды и слива, проверяет вибрацию корпуса и герметичность всех точек подключения. Без этого монтаж нельзя считать завершенным.</p>
      <p>Если вам нужно подключение стиральной машины в Кишиневе, надежнее сразу заказать установку у сантехника. Это особенно актуально для встроенной техники, новых кухонь и маленьких санузлов, где цена ошибки выше.</p>
    `,
    content_ro: `
      <p>Chiar și o mașină de spălat nouă poate funcționa incorect dacă montajul a fost făcut greșit. Cele mai frecvente consecințe sunt scurgerile la furtunul de alimentare, mirosul din canalizare, vibrațiile puternice și uzura prematură a aparatului.</p>
      <h2>Ce este important la conectare</h2>
      <ul>
        <li>Un punct sigur de conectare la apa rece.</li>
        <li>O evacuare corectă, cu înălțimea și etanșarea potrivită.</li>
        <li>Poziționarea aparatului perfect la nivel.</li>
        <li>Verificarea furtunurilor, robinetului și a conexiunilor sub sarcină.</li>
      </ul>
      <h2>De ce apar scurgerile</h2>
      <p>De obicei problema este legată de conexiuni slab strânse, robinete vechi, adaptoare ieftine sau introducerea incorectă a furtunului de evacuare. Uneori scurgerea apare abia după câteva cicluri de spălare.</p>
      <h2>Este necesar un robinet separat</h2>
      <p>Da, pentru mașina de spălat este recomandat un robinet separat. Astfel întreținerea este mai comodă și apa poate fi oprită rapid în caz de urgență.</p>
      <h2>De ce contează verificarea finală</h2>
      <p>După conectare, meșterul face un test complet: verifică alimentarea cu apă, evacuarea, vibrațiile carcasei și etanșeitatea tuturor punctelor de racord. Fără această probă, montajul nu poate fi considerat finalizat.</p>
      <p>Dacă aveți nevoie de conectarea mașinii de spălat în Chișinău, este mai sigur să apelați la un instalator, mai ales pentru mobilier nou, aparate încorporate și băi compacte.</p>
    `,
  },
];

function hasSupabaseConfig() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}

async function getRemoteArticles(): Promise<ArticleRecord[]> {
  if (!hasSupabaseConfig()) {
    return [];
  }

  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from('articles')
      .select('*')
      .eq('is_published', true)
      .order('created_at', { ascending: false });

    return (data ?? []).map((article) => ({
      ...article,
      id: String(article.id),
    })) as ArticleRecord[];
  } catch {
    return [];
  }
}

export async function getPublishedArticles(): Promise<ArticleRecord[]> {
  const remoteArticles = await getRemoteArticles();
  const uniqueBySlug = new Map<string, ArticleRecord>();

  [...LOCAL_ARTICLES, ...remoteArticles].forEach((article) => {
    if (article.is_published && !uniqueBySlug.has(article.slug)) {
      uniqueBySlug.set(article.slug, article);
    }
  });

  return Array.from(uniqueBySlug.values()).sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
  );
}

export async function getFeaturedArticles(limit = 6): Promise<ArticleRecord[]> {
  const articles = await getPublishedArticles();
  return articles.slice(0, limit);
}

export async function getArticleBySlug(slug: string): Promise<ArticleRecord | null> {
  const articles = await getPublishedArticles();
  return articles.find((article) => article.slug === slug) ?? null;
}
