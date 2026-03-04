export function ServiceSchema({ name, description }: { name: string; description: string }) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'Service',
        serviceType: 'Plumbing',
        provider: {
            '@type': 'LocalBusiness',
            name: 'Услуги Сантехника Кишинев',
            image: 'https://santehnik.md/logo.png',
            telephone: '+373 60 44 44 81',
            priceRange: '$$',
            address: {
                '@type': 'PostalAddress',
                streetAddress: 'Chișinău',
                addressLocality: 'Chișinău',
                addressRegion: 'Chisinau',
                postalCode: 'MD-2000',
                addressCountry: 'MD'
            }
        },
        areaServed: {
            '@type': 'City',
            name: 'Chișinău',
        },
        name,
        description,
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
