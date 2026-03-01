export function LocalBusinessSchema({ locale }: { locale: string }) {
    const isRu = locale === 'ru';
    const name = isRu ? 'Услуги Сантехника Кишинев' : 'Servicii Instalator Chișinău';
    const description = isRu
        ? 'Профессиональные сантехнические работы в Кишиневе. Выезд за 40 минут, гарантия 2 года.'
        : 'Lucrări profesionale de instalații sanitare în Chișinău. Intervenție în 40 de minute, garanție 2 ani.';

    const schema = {
        '@context': 'https://schema.org',
        '@type': 'Plumber',
        name,
        image: 'https://santehnik-chisinau.md/logo.png',
        '@id': 'https://santehnik-chisinau.md',
        url: 'https://santehnik-chisinau.md',
        telephone: '+373xxxxxxxx',
        address: {
            '@type': 'PostalAddress',
            streetAddress: 'str. Alecu Russo',
            addressLocality: 'Chișinău',
            postalCode: 'MD-2000',
            addressCountry: 'MD',
        },
        geo: {
            '@type': 'GeoCoordinates',
            latitude: 47.0105,
            longitude: 28.8638,
        },
        openingHoursSpecification: {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            opens: '00:00',
            closes: '23:59',
        },
        priceRange: 'MDL 300 - 5000',
        description,
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
