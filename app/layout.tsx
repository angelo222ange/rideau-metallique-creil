import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, DM_Sans } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingPhoneButton } from "@/components/ui/FloatingPhoneButton";
import { MobileCTABar } from "@/components/ui/MobileCTABar";

/* ── Fonts via next/font (self-hosted, no FOUT) ──────────── */
const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

/* ── Viewport (iOS safe area support) ────────────────────── */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

/* ── Metadata ────────────────────────────────────────────── */
export const metadata: Metadata = {
  metadataBase: new URL(`https://${siteConfig.domain}`),
  icons: {
    icon: "/images/logos/favicon.png",
    apple: "/apple-touch-icon.png",
  },
  title: {
    default: `Depannage Rideau Metallique ${siteConfig.city} | Urgence 24h/24`,
    template: `%s | ${siteConfig.name}`,
  },
  description: `Depannage rideau metallique a ${siteConfig.city}. Intervention rapide 24h/24, 7j/7. Deblocage, reparation, installation, motorisation. Tel ${siteConfig.phone}`,
  keywords: [
    `depannage rideau metallique ${siteConfig.city}`,
    `reparation rideau metallique ${siteConfig.city}`,
    `installation rideau metallique ${siteConfig.city}`,
    `fabrication rideau metallique ${siteConfig.city}`,
    `motorisation rideau metallique ${siteConfig.city}`,
    `entretien rideau metallique ${siteConfig.city}`,
    `rideau metallique ${siteConfig.department}`,
    `depannage rideau metallique ${siteConfig.departmentCode}`,
    `rideau metallique ${siteConfig.postalCode}`,
  ],
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large" as const,
    "max-video-preview": -1,
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: siteConfig.fullName,
    title: `Depannage Rideau Metallique ${siteConfig.city} | Urgence 24h/24`,
    description: `Expert rideau metallique a ${siteConfig.city}. Intervention 24h/24, 7j/7. Tel ${siteConfig.phone}`,
    url: siteConfig.url,
    images: [
      {
        url: `${siteConfig.url}/images/logos/depannage-rideau-metallique-creil.webp`,
        width: 800,
        height: 600,
        alt: `${siteConfig.fullName} - Depannage rideau metallique ${siteConfig.city}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Depannage Rideau Metallique ${siteConfig.city} | Urgence 24h/24`,
    description: `Expert rideau metallique a ${siteConfig.city}. Intervention 24h/24, 7j/7. Tel ${siteConfig.phone}`,
    images: [`${siteConfig.url}/images/logos/depannage-rideau-metallique-creil.webp`],
  },
  alternates: {
    canonical: `${siteConfig.url}/`,
  },
  other: {
    "geo.region": `FR-${siteConfig.departmentCode}`,
    "geo.placename": siteConfig.city,
    "geo.position": `${siteConfig.geo.lat};${siteConfig.geo.lng}`,
    ICBM: `${siteConfig.geo.lat}, ${siteConfig.geo.lng}`,
    address: siteConfig.address,
    "contact:street_address": siteConfig.streetAddress,
    "contact:locality": siteConfig.city,
    "contact:postal_code": siteConfig.postalCode,
    "contact:country": "FR",
  },
};

/* ── LocalBusiness JSON-LD ───────────────────────────────── */
function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "HomeAndConstructionBusiness", "LockSmith"],
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.fullName,
    alternateName: [siteConfig.name, "DRM Creil", `Depannage Rideau Metallique ${siteConfig.departmentCode}`],
    description: `Depannage, reparation, installation, fabrication et motorisation de rideaux metalliques a ${siteConfig.city} et dans l'${siteConfig.department}. Intervention urgence 24h/24, 7j/7. Techniciens certifies, devis gratuit.`,
    url: siteConfig.url,
    telephone: siteConfig.phone.replace(/\s/g, ""),
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.streetAddress,
      addressLocality: siteConfig.city,
      postalCode: siteConfig.postalCode,
      addressRegion: siteConfig.region,
      addressCountry: "FR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.geo.lat,
      longitude: siteConfig.geo.lng,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "00:00",
        closes: "23:59",
      },
    ],
    openingHours: "Mo-Su 00:00-23:59",
    priceRange: "$$",
    currenciesAccepted: "EUR",
    paymentAccepted: ["Cash", "Credit Card", "Debit Card", "Check"],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: String(siteConfig.reviews.rating),
      reviewCount: String(siteConfig.reviews.count),
      bestRating: "5",
      worstRating: "1",
    },
    areaServed: [
      {
        "@type": "City",
        name: "Creil",
        sameAs: "https://fr.wikipedia.org/wiki/Creil",
      },
      { "@type": "City", name: "Nogent-sur-Oise" },
      { "@type": "City", name: "Montataire" },
      { "@type": "City", name: "Senlis" },
      { "@type": "City", name: "Chantilly" },
      { "@type": "AdministrativeArea", name: "Oise" },
      {
        "@type": "GeoCircle",
        geoMidpoint: {
          "@type": "GeoCoordinates",
          latitude: siteConfig.geo.lat,
          longitude: siteConfig.geo.lng,
        },
        geoRadius: "30000",
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `Services rideaux metalliques ${siteConfig.city}`,
      itemListElement: [
        {
          "@type": "Offer",
          name: "Deblocage rideau metallique",
          description: "Deblocage d'urgence de rideau metallique bloque",
          price: "150",
          priceCurrency: "EUR",
          itemOffered: { "@type": "Service", name: `Deblocage rideau metallique ${siteConfig.city}` },
        },
        {
          "@type": "Offer",
          name: "Reparation moteur rideau metallique",
          description: "Diagnostic et reparation de moteur",
          price: "250",
          priceCurrency: "EUR",
          itemOffered: { "@type": "Service", name: "Reparation moteur rideau metallique" },
        },
        {
          "@type": "Offer",
          name: "Remplacement lames rideau metallique",
          description: "Remplacement de lames endommagees",
          price: "30",
          priceCurrency: "EUR",
          itemOffered: { "@type": "Service", name: "Remplacement lames rideau metallique" },
        },
        {
          "@type": "Offer",
          name: "Installation rideau metallique neuf",
          description: "Installation complete de rideau metallique",
          price: "800",
          priceCurrency: "EUR",
          itemOffered: { "@type": "Service", name: `Installation rideau metallique ${siteConfig.city}` },
        },
        {
          "@type": "Offer",
          name: "Motorisation rideau metallique",
          description: "Motorisation de rideau metallique existant ou neuf",
          price: "500",
          priceCurrency: "EUR",
          itemOffered: { "@type": "Service", name: `Motorisation rideau metallique ${siteConfig.city}` },
        },
        {
          "@type": "Offer",
          name: "Fabrication rideau metallique sur-mesure",
          description: "Fabrication sur-mesure selon dimensions et materiau",
          price: "700",
          priceCurrency: "EUR",
          itemOffered: { "@type": "Service", name: `Fabrication rideau metallique ${siteConfig.city}` },
        },
        {
          "@type": "Offer",
          name: "Contrat entretien annuel",
          description: "Contrat d'entretien preventif",
          price: "120",
          priceCurrency: "EUR",
          itemOffered: { "@type": "Service", name: `Entretien rideau metallique ${siteConfig.city}` },
        },
        {
          "@type": "Offer",
          name: "Reparation rideau metallique",
          description: "Reparation complete avec diagnostic gratuit",
          price: "120",
          priceCurrency: "EUR",
          itemOffered: { "@type": "Service", name: `Reparation rideau metallique ${siteConfig.city}` },
        },
      ],
    },
    knowsAbout: [
      "Rideau metallique",
      "Grille metallique",
      "Fermeture metallique",
      "Store metallique",
      "Porte de garage enroulable",
      "Rideau coupe-feu",
      "Motorisation Somfy",
      "Motorisation Nice",
      "Motorisation Came",
    ],
    slogan: `Depannage rideau metallique ${siteConfig.city} - Intervention urgence 24h/24`,
    foundingDate: "2010",
    numberOfEmployees: { "@type": "QuantitativeValue", minValue: 5, maxValue: 15 },
    image: [
      `${siteConfig.url}/images/logos/depannage-rideau-metallique-creil.webp`,
      `${siteConfig.url}/images/gallery/rideau-metallique-creil.webp`,
      `${siteConfig.url}/images/gallery/installation-rideau-metallique-creil.webp`,
    ],
    hasMap: `https://www.google.com/maps?q=${siteConfig.geo.lat},${siteConfig.geo.lng}`,
    logo: `${siteConfig.url}/images/logos/depannage-rideau-metallique-creil.webp`,
    makesOffer: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: `Depannage rideau metallique ${siteConfig.city}`,
          description: `Service de depannage et reparation de rideaux metalliques en urgence a ${siteConfig.city}. Intervention 24h/24, 7j/7.`,
          areaServed: { "@type": "City", name: siteConfig.city },
          serviceType: "Depannage rideau metallique",
        },
      },
    ],
    sameAs: [siteConfig.social.facebook, siteConfig.social.instagram, siteConfig.social.google].filter(Boolean),
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

/* ── Organization JSON-LD ───────────────────────────────── */
function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteConfig.url}/#org`,
    name: siteConfig.fullName,
    url: siteConfig.url,
    logo: `${siteConfig.url}/images/logos/depannage-rideau-metallique-creil.webp`,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: siteConfig.phone.replace(/\s/g, ""),
      contactType: "customer service",
      areaServed: "FR",
      availableLanguage: "French",
      hoursAvailable: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "00:00",
        closes: "23:59",
      },
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.streetAddress,
      addressLocality: siteConfig.city,
      postalCode: siteConfig.postalCode,
      addressRegion: siteConfig.region,
      addressCountry: "FR",
    },
    sameAs: [siteConfig.social.facebook, siteConfig.social.instagram, siteConfig.social.google].filter(Boolean),
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

/* ── WebSite JSON-LD (for sitelinks search) ──────────────── */
function WebSiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    name: siteConfig.fullName,
    url: siteConfig.url,
    publisher: { "@id": `${siteConfig.url}/#organization` },
    inLanguage: "fr-FR",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.url}/recherche?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

/* ── HowTo JSON-LD (Comment ca marche) ──────────────────── */
function HowToSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `Comment faire depanner un rideau metallique a ${siteConfig.city}`,
    description: `Etapes pour obtenir un depannage rapide de rideau metallique a ${siteConfig.city} avec ${siteConfig.name}. De l'appel a la remise en service en moins d'une heure.`,
    totalTime: "PT1H",
    estimatedCost: {
      "@type": "MonetaryAmount",
      currency: "EUR",
      value: "150",
    },
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Appel telephonique",
        text: `Appelez DRM Creil au ${siteConfig.phone}. Un technicien effectue un pre-diagnostic par telephone pour identifier la nature de la panne de votre rideau metallique.`,
        url: `${siteConfig.url}/#comment-ca-marche`,
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Diagnostic sur place",
        text: `Un technicien se deplace a ${siteConfig.city} en moins de 30 minutes. Il analyse le mecanisme : moteur, axe d'enroulement, lames, serrure ou systeme electrique. Le devis est gratuit et sans engagement.`,
        url: `${siteConfig.url}/#comment-ca-marche`,
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Reparation sur place",
        text: "Le technicien procede a la reparation immediate avec les pieces de rechange disponibles dans le vehicule atelier. Les pieces les plus courantes sont en stock.",
        url: `${siteConfig.url}/#comment-ca-marche`,
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: "Test et remise en service",
        text: "Verification complete du fonctionnement du rideau metallique, reglages de securite et remise du bon d'intervention avec garantie pieces et main d'oeuvre.",
        url: `${siteConfig.url}/#comment-ca-marche`,
      },
    ],
    tool: [
      { "@type": "HowToTool", name: "Telephone" },
    ],
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

/* ── Service JSON-LD (chaque service) ───────────────────── */
function ServiceSchemas() {
  const serviceList = [
    {
      name: `Depannage rideau metallique ${siteConfig.city}`,
      description: `Service de depannage de rideau metallique en urgence a ${siteConfig.city}. Intervention en moins de 30 minutes, 24h/24, 7j/7. Deblocage, reparation moteur, remplacement lames. A partir de 150 EUR.`,
      serviceType: "Depannage rideau metallique",
      url: `${siteConfig.url}/depannage-rideau-metallique-creil`,
    },
    {
      name: `Installation rideau metallique ${siteConfig.city}`,
      description: `Installation de rideau metallique neuf a ${siteConfig.city}. Lames pleines, micro-perforees, grilles articulees. Fabrication sur-mesure, pose et mise en service. A partir de 800 EUR.`,
      serviceType: "Installation rideau metallique",
      url: `${siteConfig.url}/installation-rideau-metallique-creil`,
    },
    {
      name: `Reparation rideau metallique ${siteConfig.city}`,
      description: `Reparation de rideau metallique a ${siteConfig.city}. Moteur, axe, lames, serrure, tous composants. Diagnostic gratuit, devis sur place. Garantie pieces et main d'oeuvre.`,
      serviceType: "Reparation rideau metallique",
      url: `${siteConfig.url}/reparation-rideau-metallique-creil`,
    },
    {
      name: `Motorisation rideau metallique ${siteConfig.city}`,
      description: `Motorisation de rideau metallique existant ou neuf a ${siteConfig.city}. Moteurs Somfy, Nice, Came. Installation tubulaire ou laterale. A partir de 500 EUR.`,
      serviceType: "Motorisation rideau metallique",
      url: `${siteConfig.url}/motorisation-rideau-metallique-creil`,
    },
    {
      name: `Fabrication rideau metallique sur-mesure ${siteConfig.city}`,
      description: `Fabrication de rideau metallique sur-mesure a ${siteConfig.city}. Acier galvanise, aluminium, inox. Prise de cotes gratuite, fabrication en atelier, pose incluse. A partir de 700 EUR.`,
      serviceType: "Fabrication rideau metallique",
      url: `${siteConfig.url}/fabrication-rideau-metallique-creil`,
    },
    {
      name: `Deblocage rideau metallique ${siteConfig.city}`,
      description: `Deblocage de rideau metallique en urgence a ${siteConfig.city}. Rideau bloque en position haute, basse ou a mi-course. Intervention en moins de 30 minutes, 24h/24. A partir de 150 EUR.`,
      serviceType: "Deblocage rideau metallique",
      url: `${siteConfig.url}/deblocage-rideau-metallique-creil`,
    },
    {
      name: `Entretien rideau metallique ${siteConfig.city}`,
      description: `Contrat d'entretien pour rideau metallique a ${siteConfig.city}. 3 formules : Essentiel (120 EUR/an), Pro (200 EUR/an), Premium. Maintenance preventive, reduction des pannes de 70%.`,
      serviceType: "Entretien rideau metallique",
      url: `${siteConfig.url}/entretien-rideau-metallique-creil`,
    },
  ];

  const schema = serviceList.map((s) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.name,
    description: s.description,
    serviceType: s.serviceType,
    url: s.url,
    provider: {
      "@type": "LocalBusiness",
      "@id": `${siteConfig.url}/#organization`,
      name: siteConfig.fullName,
    },
    areaServed: {
      "@type": "City",
      name: siteConfig.city,
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: s.serviceType,
    },
  }));

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

/* ── Speakable + WebPage JSON-LD ────────────────────────── */
function WebPageSpeakableSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${siteConfig.url}/#webpage`,
    name: `Depannage Rideau Metallique ${siteConfig.city} | Urgence 24h/24`,
    url: siteConfig.url,
    isPartOf: { "@id": `${siteConfig.url}/#website` },
    about: { "@id": `${siteConfig.url}/#organization` },
    description: `Depannage rideau metallique a ${siteConfig.city}. Intervention rapide 24h/24, 7j/7. Deblocage, reparation, installation, motorisation. Tel ${siteConfig.phone}`,
    inLanguage: "fr-FR",
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", ".hero-description", ".faq-answer", ".section-title"],
    },
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

/* ── Root Layout ─────────────────────────────────────────── */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${plusJakarta.variable} ${dmSans.variable}`}>
      <head>
        <LocalBusinessSchema />
        <OrganizationSchema />
        <WebSiteSchema />
        <HowToSchema />
        <ServiceSchemas />
        <WebPageSpeakableSchema />
      </head>
      <body className="antialiased font-sans">
        <Header />
        <main>{children}</main>
        <Footer />
        <FloatingPhoneButton />
        <MobileCTABar />
      </body>
    </html>
  );
}
