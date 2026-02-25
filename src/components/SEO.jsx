import { Helmet } from 'react-helmet-async';

export default function SEO({ title, description, schema }) {
    const defaultDescription = "Dakoti Bakers - Contemporary South Asian Artisan Confectionery in Alpha 1 and Beta 1, Greater Noida. Best cakes, pastries, and custom orders.";

    const businessSchema = {
        "@context": "https://schema.org",
        "@type": "Bakery",
        "name": "Dakoti Bakers",
        "image": "https://dakotibakers.com/logo.png",
        "@id": "https://dakotibakers.com",
        "url": "https://dakotibakers.com",
        "telephone": "+919599255565",
        "priceRange": "₹₹",
        "address": [
            {
                "@type": "PostalAddress",
                "streetAddress": "Shop 4, Alpha 1 Commercial Belt",
                "addressLocality": "Greater Noida",
                "addressRegion": "UP",
                "postalCode": "201308",
                "addressCountry": "IN"
            },
            {
                "@type": "PostalAddress",
                "streetAddress": "Beta 1 Market",
                "addressLocality": "Greater Noida",
                "addressRegion": "UP",
                "postalCode": "201308",
                "addressCountry": "IN"
            }
        ],
        "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday"
            ],
            "opens": "10:00",
            "closes": "22:00"
        }
    };

    return (
        <Helmet>
            <title>{title ? `${title} | Dakoti Bakers` : "Dakoti Bakers | Artisan Confectionery"}</title>
            <meta name="description" content={description || defaultDescription} />

            {/* Structured Data */}
            <script type="application/ld+json">
                {JSON.stringify(schema || businessSchema)}
            </script>
        </Helmet>
    );
}
