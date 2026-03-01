export function ServiceSchema({ name, description }: { name: string; description: string }) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'Service',
        serviceType: 'Plumbing',
        provider: {
            '@type': 'LocalBusiness',
            name: 'Услуги Сантехника Кишинев',
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
