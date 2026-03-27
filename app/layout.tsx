import type { Metadata } from "next";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingButton } from "@/components/ui/FloatingButton";

export const metadata: Metadata = {
  metadataBase: new URL(`https://${siteConfig.domain}`),
  icons: {
    icon: "/images/logos/favicon.png",
  },
  title: {
    default: `Dépannage Rideau Métallique ${siteConfig.city} | Urgence 24h/24`,
    template: `%s | ${siteConfig.name}`,
  },
  description: `Dépannage rideau métallique à ${siteConfig.city} ✓ Intervention rapide 24h/24 ✓ Déblocage, réparation, installation, motorisation. ☎️ ${siteConfig.phone}`,
  keywords: [
    `dépannage rideau métallique ${siteConfig.city}`,
    `réparation rideau métallique ${siteConfig.city}`,
    `installation rideau métallique ${siteConfig.city}`,
    `fabrication rideau métallique ${siteConfig.city}`,
    `motorisation rideau métallique ${siteConfig.city}`,
    `entretien rideau métallique ${siteConfig.city}`,
    `rideau métallique ${siteConfig.department}`,
    `dépannage rideau métallique ${siteConfig.departmentCode}`,
    `rideau métallique ${siteConfig.postalCode}`,
  ],
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: siteConfig.fullName,
    title: `Dépannage Rideau Métallique ${siteConfig.city} | Urgence 24h/24`,
    description: `Expert rideau métallique à ${siteConfig.city}. Intervention 24h/24, 7j/7. ☎️ ${siteConfig.phone}`,
    url: siteConfig.url,
    images: [{
      url: `${siteConfig.url}/images/logos/depannage-rideau-metallique-creil.webp`,
      width: 800,
      height: 600,
      alt: `${siteConfig.fullName} - Dépannage rideau métallique ${siteConfig.city}`,
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: `Dépannage Rideau Métallique ${siteConfig.city} | Urgence 24h/24`,
    description: `Expert rideau métallique à ${siteConfig.city}. Intervention 24h/24, 7j/7. ☎️ ${siteConfig.phone}`,
    images: [`${siteConfig.url}/images/logos/depannage-rideau-metallique-creil.webp`],
  },
  alternates: {
    canonical: siteConfig.url,
  },
  other: {
    "geo.region": `FR-${siteConfig.departmentCode}`,
    "geo.placename": siteConfig.city,
    "geo.position": `${siteConfig.geo.lat};${siteConfig.geo.lng}`,
    "ICBM": `${siteConfig.geo.lat}, ${siteConfig.geo.lng}`,
    "address": siteConfig.address,
    "contact:street_address": siteConfig.streetAddress,
    "contact:locality": siteConfig.city,
    "contact:postal_code": siteConfig.postalCode,
    "contact:country": "FR",
  },
};

function LocalBusinessSchema() {
  // Schema principal multi-type (aligné benchmark Store 2000 + Melk Fermetures)
  const schema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "HomeAndConstructionBusiness", "LockSmith"],
    "@id": `${siteConfig.url}/#organization`,
    "name": siteConfig.fullName,
    "alternateName": [siteConfig.name, "DRM Creil", "Dépannage Rideau Métallique 60"],
    "description": `Dépannage, réparation, installation, fabrication et motorisation de rideaux métalliques à ${siteConfig.city} et dans les ${siteConfig.department}. Intervention urgence 24h/24, 7j/7. Techniciens certifiés, devis gratuit. Plus de 5000 interventions réalisées.`,
    "url": siteConfig.url,
    "telephone": siteConfig.phone.replace(/\s/g, ""),
    "email": siteConfig.email,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": siteConfig.streetAddress,
      "addressLocality": siteConfig.city,
      "postalCode": siteConfig.postalCode,
      "addressRegion": siteConfig.region,
      "addressCountry": "FR",
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": siteConfig.geo.lat,
      "longitude": siteConfig.geo.lng,
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "00:00",
        "closes": "23:59",
      },
    ],
    "openingHours": "Mo-Su 00:00-23:59",
    "priceRange": "€€",
    "currenciesAccepted": "EUR",
    "paymentAccepted": ["Cash", "Credit Card", "Debit Card", "Check"],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": String(siteConfig.reviews.rating),
      "reviewCount": String(siteConfig.reviews.count),
      "bestRating": "5",
      "worstRating": "1",
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "Creil",
        "sameAs": "https://fr.wikipedia.org/wiki/Creil",
      },
      {
        "@type": "GeoCircle",
        "geoMidpoint": { "@type": "GeoCoordinates", "latitude": siteConfig.geo.lat, "longitude": siteConfig.geo.lng },
        "geoRadius": "30000",
      },
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Services rideaux métalliques Creil",
      "itemListElement": [
        {
          "@type": "Offer",
          "name": "Déblocage rideau métallique",
          "description": "Déblocage d'urgence de rideau métallique bloqué — prix sur devis après diagnostic",
          "price": "150",
          "priceCurrency": "EUR",
          "priceSpecification": { "@type": "PriceSpecification", "price": "150", "priceCurrency": "EUR", "valueAddedTaxIncluded": false },
          "itemOffered": { "@type": "Service", "name": "Déblocage rideau métallique Creil" },
        },
        {
          "@type": "Offer",
          "name": "Réparation moteur rideau métallique",
          "description": "Diagnostic et réparation de moteur — prix sur devis selon modèle et panne",
          "price": "250",
          "priceCurrency": "EUR",
          "priceSpecification": { "@type": "PriceSpecification", "price": "250", "priceCurrency": "EUR", "valueAddedTaxIncluded": false },
          "itemOffered": { "@type": "Service", "name": "Réparation moteur rideau métallique" },
        },
        {
          "@type": "Offer",
          "name": "Remplacement lames rideau métallique",
          "description": "Remplacement de lames endommagées — prix selon type et dimensions",
          "price": "30",
          "priceCurrency": "EUR",
          "priceSpecification": { "@type": "PriceSpecification", "price": "30", "priceCurrency": "EUR", "unitText": "par lame", "valueAddedTaxIncluded": false },
          "itemOffered": { "@type": "Service", "name": "Remplacement lames rideau métallique" },
        },
        {
          "@type": "Offer",
          "name": "Installation rideau métallique neuf",
          "description": "Installation complète de rideau métallique — sur devis après prise de mesures",
          "price": "800",
          "priceCurrency": "EUR",
          "priceSpecification": { "@type": "PriceSpecification", "price": "800", "priceCurrency": "EUR", "valueAddedTaxIncluded": false },
          "itemOffered": { "@type": "Service", "name": "Installation rideau métallique Creil" },
        },
        {
          "@type": "Offer",
          "name": "Motorisation rideau métallique",
          "description": "Motorisation de rideau métallique existant — prix selon modèle et dimensions",
          "price": "500",
          "priceCurrency": "EUR",
          "priceSpecification": { "@type": "PriceSpecification", "price": "500", "priceCurrency": "EUR", "valueAddedTaxIncluded": false },
          "itemOffered": { "@type": "Service", "name": "Motorisation rideau métallique Creil" },
        },
        {
          "@type": "Offer",
          "name": "Fabrication rideau métallique sur-mesure",
          "description": "Fabrication sur-mesure — devis personnalisé selon dimensions et matériau",
          "price": "700",
          "priceCurrency": "EUR",
          "priceSpecification": { "@type": "PriceSpecification", "price": "700", "priceCurrency": "EUR", "valueAddedTaxIncluded": false },
          "itemOffered": { "@type": "Service", "name": "Fabrication rideau métallique Creil" },
        },
        {
          "@type": "Offer",
          "name": "Contrat entretien annuel",
          "description": "Contrat d'entretien préventif — tarif selon formule et nombre de rideaux",
          "price": "120",
          "priceCurrency": "EUR",
          "priceSpecification": { "@type": "PriceSpecification", "price": "120", "priceCurrency": "EUR", "unitText": "par an", "valueAddedTaxIncluded": false },
          "itemOffered": { "@type": "Service", "name": "Entretien rideau métallique Creil" },
        },
        {
          "@type": "Offer",
          "name": "Réparation rideau métallique",
          "description": "Réparation complète — diagnostic gratuit, devis sur place",
          "price": "120",
          "priceCurrency": "EUR",
          "priceSpecification": { "@type": "PriceSpecification", "price": "120", "priceCurrency": "EUR", "valueAddedTaxIncluded": false },
          "itemOffered": { "@type": "Service", "name": "Réparation rideau métallique Creil" },
        },
      ],
    },
    "knowsAbout": [
      "Rideau métallique",
      "Grille métallique",
      "Fermeture métallique",
      "Store métallique",
      "Porte de garage enroulable",
      "Rideau coupe-feu",
      "Motorisation Somfy",
      "Motorisation Nice",
      "Motorisation Came",
    ],
    "slogan": "Dépannage rideau métallique Creil - Intervention urgence 24h/24",
    "foundingDate": "2010",
    "numberOfEmployees": { "@type": "QuantitativeValue", "minValue": 5, "maxValue": 15 },
    "image": [
      `${siteConfig.url}/images/logos/depannage-rideau-metallique-creil.webp`,
      `${siteConfig.url}/images/gallery/rideau-metallique-creil.webp`,
      `${siteConfig.url}/images/gallery/installation-rideau-metallique-creil.webp`,
    ],
    "sameAs": [
      siteConfig.social.facebook,
      siteConfig.social.instagram,
      siteConfig.social.google,
    ].filter(Boolean),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,700&family=DM+Serif+Display&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <LocalBusinessSchema />
      </head>
      <body className="antialiased font-body">
        <Header />
        <main>{children}</main>
        <Footer />
        <FloatingButton />
      </body>
    </html>
  );
}
