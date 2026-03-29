import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { siteConfig, zones, services } from "@/config/site";
import { getPageContent, getZoneBySlug, getServiceBySlug, getZoneContent, getNeighborZones } from "@/lib/content";
import { FAQ } from "@/components/sections/FAQ";
import { CTA } from "@/components/sections/CTA";
import { Reviews } from "@/components/sections/Reviews";

// Composants SubCity spécifiques
import { WhyChooseUs } from "@/components/subcity/WhyChooseUs";
import { TypesRideaux } from "@/components/subcity/TypesRideaux";
import { ProcessusInstallation } from "@/components/subcity/ProcessusInstallation";
import { SurMesureLocal } from "@/components/subcity/SurMesureLocal";
import { NormesCertifications } from "@/components/subcity/NormesCertifications";
import { ContratEntretien } from "@/components/subcity/ContratEntretien";
import { SignesUsure } from "@/components/subcity/SignesUsure";
import { AvantagesMotorisation } from "@/components/subcity/AvantagesMotorisation";
import { MarquesMoteurs } from "@/components/subcity/MarquesMoteurs";
import { AlternatingFeatures } from "@/components/sections/AlternatingFeatures";
import { ZoneLocalSection } from "@/components/subcity/ZoneLocalSection";
import { zoneLocalData } from "@/content/zones-local";
import { getZoneServiceContent } from "@/content/zone-service";
import type { ZoneServiceContent, ZoneServiceRecentCase } from "@/content/zone-service";

// Import des contenus de chaque service
import depannageContent from "@/content/pages/services/depannage.json";
import installationContent from "@/content/pages/services/installation.json";
import motorisationContent from "@/content/pages/services/motorisation.json";
import entretienContent from "@/content/pages/services/entretien.json";
import fabricationContent from "@/content/pages/services/fabrication.json";
import deblocageContent from "@/content/pages/services/deblocage.json";
import reparationContent from "@/content/pages/services/reparation.json";

// Map des contenus par slug de service
const serviceContents: Record<string, any> = {
  "depannage": depannageContent,
  "installation": installationContent,
  "motorisation": motorisationContent,
  "entretien": entretienContent,
  "fabrication": fabricationContent,
  "deblocage": deblocageContent,
  "reparation": reparationContent,
};

interface Props {
  params: { service_zone: string };
}

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * PARSE L'URL POUR EXTRAIRE SERVICE + ZONE
 * Format: {service}-rideau-metallique-{zone}
 * Exemples:
 * - depannage-rideau-metallique-creil
 * - installation-rideau-metallique-nogent-sur-oise
 * ═══════════════════════════════════════════════════════════════════════════
 */
function parseServiceZone(serviceZone: string): { service: string | null; zone: string } | null {
  // Pattern 1: service-rideau-metallique-zone (page service×zone)
  const serviceMatch = serviceZone.match(/^(.+)-rideau-metallique-(.+)$/);
  if (serviceMatch) {
    const [, serviceSlug, zoneSlug] = serviceMatch;
    const service = getServiceBySlug(serviceSlug);
    const zone = getZoneBySlug(zoneSlug);
    if (service && zone) {
      return { service: serviceSlug, zone: zoneSlug };
    }
  }

  // Pattern 2: rideau-metallique-zone (page zone overview — SEO URL)
  const zoneMatch = serviceZone.match(/^rideau-metallique-(.+)$/);
  if (zoneMatch) {
    const [, zoneSlug] = zoneMatch;
    const zone = getZoneBySlug(zoneSlug);
    if (zone) {
      return { service: null, zone: zoneSlug };
    }
  }

  return null;
}

// ═══════════════════════════════════════════════════════════════════════════
// GÉNÉRATION STATIQUE - 7 services × 32 zones = 223 pages
// ═══════════════════════════════════════════════════════════════════════════
export function generateStaticParams() {
  const params: { service_zone: string }[] = [];

  // Pages service×zone : depannage-rideau-metallique-chambly, etc.
  for (const service of services) {
    if (!service.hasPage) continue;
    for (const zone of zones) {
      if (service.slug === "depannage" && 'isMain' in zone) continue;
      params.push({
        service_zone: `${service.slug}-rideau-metallique-${zone.slug}`,
      });
    }
  }

  // Pages zone overview : rideau-metallique-chambly, etc.
  for (const zone of zones) {
    if ('isMain' in zone) continue; // Homepage couvre Creil
    params.push({
      service_zone: `rideau-metallique-${zone.slug}`,
    });
  }

  return params;
}

// ═══════════════════════════════════════════════════════════════════════════
// MÉTADONNÉES SEO OPTIMISÉES PAR COMBINAISON SERVICE × ZONE
// ═══════════════════════════════════════════════════════════════════════════
export function generateMetadata({ params }: Props): Metadata {
  const parsed = parseServiceZone(params.service_zone);

  if (!parsed) {
    return { title: "Page non trouvée" };
  }

  const zone = getZoneBySlug(parsed.zone);
  if (!zone) {
    return { title: "Page non trouvée" };
  }

  // Page zone overview (rideau-metallique-chambly)
  if (!parsed.service) {
    const title = `Rideau Métallique ${zone.name} (${zone.postalCode}) - Dépannage & Installation`;
    const description = `Rideau métallique à ${zone.name} (${zone.postalCode}) ✓ Dépannage 24h/24 ✓ Installation ✓ Réparation ✓ ${siteConfig.reviews.rating}/5 (${siteConfig.reviews.count} avis). ${siteConfig.phone}`;
    return {
      title,
      description,
      alternates: { canonical: `${siteConfig.url}/rideau-metallique-${zone.slug}/` },
      openGraph: { title, description, type: "website", url: `${siteConfig.url}/rideau-metallique-${zone.slug}` },
    };
  }

  const service = getServiceBySlug(parsed.service);

  if (!service) {
    return { title: "Page non trouvée" };
  }

  let title: string;
  let description: string;

  if (service.slug === "depannage") {
    title = `Dépannage Rideau Métallique ${zone.name} (${zone.postalCode}) - 24h/24`;
    description = `Dépannage rideau métallique à ${zone.name} (${zone.postalCode}) ✓ Intervention -30 min ✓ 24h/24 7j/7 ✓ Devis gratuit ✓ ${siteConfig.reviews.rating}/5 (${siteConfig.reviews.count} avis). ${siteConfig.phone}`;
  } else if (service.slug === "installation") {
    title = `Installation Rideau Métallique ${zone.name} (${zone.postalCode}) - Devis Gratuit`;
    description = `Installation de rideau métallique à ${zone.name} (${zone.postalCode}) ✓ Sur-mesure ✓ Pose par techniciens certifiés ✓ Garantie 2 à 10 ans. ${siteConfig.phone}`;
  } else if (service.slug === "fabrication") {
    title = `Fabrication Rideau Métallique ${zone.name} (${zone.postalCode}) - Sur-Mesure`;
    description = `Fabrication sur-mesure de rideau métallique à ${zone.name} (${zone.postalCode}) ✓ Acier, aluminium, inox ✓ Normes CE ✓ Devis gratuit. ${siteConfig.phone}`;
  } else if (service.slug === "motorisation") {
    title = `Motorisation Rideau Métallique ${zone.name} (${zone.postalCode})`;
    description = `Motorisation de rideau métallique à ${zone.name} (${zone.postalCode}) ✓ Somfy, Nice, Came ✓ Télécommande ✓ Installation rapide. ${siteConfig.phone}`;
  } else if (service.slug === "entretien") {
    title = `Entretien Rideau Métallique ${zone.name} (${zone.postalCode}) - Contrat`;
    description = `Entretien rideau métallique à ${zone.name} (${zone.postalCode}) ✓ Contrats maintenance ✓ Prévention pannes ✓ Technicien certifié ✓ Devis gratuit. ${siteConfig.phone}`;
  } else if (service.slug === "deblocage") {
    title = `Déblocage Rideau Métallique ${zone.name} (${zone.postalCode}) - Urgence`;
    description = `Déblocage rideau métallique à ${zone.name} (${zone.postalCode}) ✓ Intervention -30 min ✓ 24h/24 ✓ Rideau bloqué, coincé ✓ Devis gratuit. ${siteConfig.phone}`;
  } else {
    // reparation
    title = `Réparation Rideau Métallique ${zone.name} (${zone.postalCode}) - Devis Gratuit`;
    description = `Réparation rideau métallique à ${zone.name} (${zone.postalCode}) ✓ Lames, moteur, axe, serrure ✓ Pièces d'origine ✓ Garantie. ${siteConfig.phone}`;
  }

  const keywords = [
    `${service.name.toLowerCase()} rideau métallique ${zone.name}`,
    `rideau métallique ${zone.name}`,
    `${service.name.toLowerCase()} rideau ${zone.postalCode}`,
    `rideau métallique ${zone.postalCode}`,
    `fermeture métallique ${zone.name}`,
    `${service.name.toLowerCase()} rideau ${siteConfig.department}`,
  ].join(', ');

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      type: "website",
      url: `${siteConfig.url}/${service.slug}-rideau-metallique-${zone.slug}`,
      images: [{
        url: `${siteConfig.url}${service.image}`,
        width: 800,
        height: 600,
        alt: `${service.name} rideau métallique ${zone.name}`,
      }],
    },
    alternates: {
      canonical: `${siteConfig.url}/${service.slug}-rideau-metallique-${zone.slug}/`,
    },
  };
}

// ═══════════════════════════════════════════════════════════════════════════
// PAGE UNIFIÉE SERVICE × ZONE
// ═══════════════════════════════════════════════════════════════════════════
export default function ServiceZonePage({ params }: Props) {
  const parsed = parseServiceZone(params.service_zone);

  if (!parsed) {
    notFound();
  }

  const zone = getZoneBySlug(parsed.zone);
  if (!zone) {
    notFound();
  }

  // ═══ PAGE ZONE OVERVIEW (rideau-metallique-chambly) ═══
  if (!parsed.service) {
    const neighborZones = getNeighborZones(zone.slug, 8);
    const zoneLocal = zoneLocalData[zone.slug];

    return (
      <main>
        {/* Hero dark compact */}
        <section className="relative overflow-hidden bg-gray-950">
          {/* Crosshatch pattern */}
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%), repeating-linear-gradient(-45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)', backgroundSize: '20px 20px' }} />
          {/* Blob décoratif */}
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-primary-600/10 rounded-full blur-3xl" />

          <div className="container relative z-10 py-14 md:py-20">
            <nav className="mb-6" aria-label="Fil d'Ariane">
              <ol className="flex items-center gap-2 text-xs text-white/30">
                <li><Link href="/" className="hover:text-primary-400 transition-colors">Accueil</Link></li>
                <li>/</li>
                <li className="text-white/60 font-medium">Rideau Métallique {zone.name}</li>
              </ol>
            </nav>

            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/[0.06] border border-white/[0.08] text-white/70 text-sm font-medium mb-5" style={{ borderRadius: '100px' }}>
                <span className="w-2 h-2 bg-primary-400 rounded-full animate-pulse" />
                Rideau Métallique - {zone.name} ({zone.postalCode})
              </span>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-[1.1] mb-5 tracking-tight">
                Rideau Métallique <span className="text-primary-400">{zone.name}</span>
              </h1>

              <p className="text-white/40 text-lg leading-relaxed mb-8 max-w-xl">
                {zoneLocal?.description || `${siteConfig.name} intervient à ${zone.name} (${zone.postalCode}) pour le dépannage, l'installation, la réparation et l'entretien de vos rideaux métalliques. Intervention rapide, devis gratuit.`}
              </p>

              {/* Stats inline */}
              <div className="flex flex-wrap gap-6 text-sm text-white/30 mb-8">
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>
                  <span className="text-white/60">{siteConfig.reviews.rating}/5</span> ({siteConfig.reviews.count} avis)
                </span>
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <span className="text-white/60">Intervention -30 min</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                  <span className="text-white/60">Garantie incluse</span>
                </span>
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href={siteConfig.phoneLink}
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-gray-900 font-semibold hover:bg-gray-100 transition-colors"
                  style={{ borderRadius: '8px' }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {siteConfig.phone}
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3.5 text-white font-semibold border border-white/20 hover:bg-white/10 transition-colors"
                  style={{ borderRadius: '8px' }}
                >
                  Devis gratuit
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Services dans cette zone */}
        <section className="relative py-20 md:py-28 bg-white overflow-hidden">
          {/* Blob décoratif */}
          <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] bg-primary-50 rounded-full blur-3xl" />
          <div className="container relative z-10">
            <div className="mb-12">
              <p className="text-primary-600 text-sm font-semibold uppercase tracking-widest mb-3">Nos services</p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">Services rideau métallique à {zone.name}</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {services.filter(s => s.hasPage).map((s) => (
                <Link
                  key={s.id}
                  href={`/${s.slug}-rideau-metallique-${zone.slug}`}
                  className="group bg-white p-6 border border-gray-100 hover:border-primary-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                  style={{ borderRadius: '16px' }}
                >
                  <h3 className="font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">{s.name}</h3>
                  <p className="text-gray-400 text-sm mb-4">{s.shortDesc}</p>
                  <span className="text-primary-600 text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                    {s.name} à {zone.name}
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Infos zone */}
        {zoneLocal && (
          <section className="relative py-20 md:py-28 bg-gray-50 overflow-hidden">
            <div className="absolute top-20 right-0 w-[350px] h-[350px] bg-primary-100/40 rounded-full blur-3xl" />
            <div className="container relative z-10">
              <div className="max-w-3xl">
                <p className="text-primary-600 text-sm font-semibold uppercase tracking-widest mb-3">A propos</p>
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-6">{zone.name} — {zone.postalCode}</h2>
                <p className="text-gray-500 text-lg leading-relaxed mb-8">{zoneLocal.description}</p>
                {zoneLocal.quartiers && (
                  <div className="mb-6">
                    <p className="font-semibold text-gray-900 text-sm mb-3">Quartiers desservis :</p>
                    <div className="flex flex-wrap gap-2">
                      {zoneLocal.quartiers.map((q, i) => (
                        <span key={i} className="px-3 py-1.5 bg-white text-gray-600 text-sm border border-gray-200 shadow-sm" style={{ borderRadius: '100px' }}>{q}</span>
                      ))}
                    </div>
                  </div>
                )}
                {zoneLocal.landmarks && (
                  <div>
                    <p className="font-semibold text-gray-900 text-sm mb-3">Points de repère :</p>
                    <div className="flex flex-wrap gap-2">
                      {zoneLocal.landmarks.map((l, i) => (
                        <span key={i} className="px-3 py-1.5 bg-primary-50 text-primary-700 text-sm border border-primary-100" style={{ borderRadius: '100px' }}>{l}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Zones voisines */}
        <section className="py-20 md:py-28 bg-white">
          <div className="container">
            <p className="text-primary-600 text-sm font-semibold uppercase tracking-widest mb-3">Zones voisines</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-8">Rideau métallique dans l&apos;{siteConfig.department}</h2>
            <div className="flex flex-wrap gap-2">
              {neighborZones.map((z) => (
                <Link key={z.slug} href={`/rideau-metallique-${z.slug}`}
                  className="px-4 py-2.5 bg-gray-50 text-gray-600 text-sm border border-gray-200 hover:border-primary-300 hover:text-primary-700 hover:-translate-y-1 transition-all duration-300 shadow-sm" style={{ borderRadius: '100px' }}>
                  {z.name} <span className="text-gray-300 ml-1">{z.postalCode}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <CTA title={`Besoin d'un rideau métallique à ${zone.name} ?`} subtitle={`Appelez le ${siteConfig.phone} pour une intervention rapide.`} />
      </main>
    );
  }

  // ═══ PAGE SERVICE × ZONE (depannage-rideau-metallique-chambly) ═══
  const service = getServiceBySlug(parsed.service);
  if (!service) {
    notFound();
  }

  // Récupérer et contextualiser le contenu
  const rawContent = serviceContents[service.slug];
  if (!rawContent) {
    notFound();
  }

  const context = {
    zone: zone.name,
    zoneSlug: zone.slug,
    zonePostal: zone.postalCode,
    service: service.name,
    serviceSlug: service.slug,
  };

  const content = getPageContent(rawContent, context);

  // Types pour les données dynamiques
  interface ReviewItem {
    name: string;
    rating: number;
    text: string;
    date: string;
    zone?: string;
    service?: string;
  }
  interface FAQItem {
    question: string;
    answer: string;
  }

  // Contenu unique zone × service
  const zoneServiceContent = getZoneServiceContent(zone.slug, service.slug);

  // FAQ et reviews : priorité au contenu zone-spécifique, fallback au pool partagé
  const zoneReviews: ReviewItem[] = zoneServiceContent?.reviews
    ? zoneServiceContent.reviews as ReviewItem[]
    : content.reviews
      ? getZoneContent(content.reviews as ReviewItem[], zone.slug, 5)
      : [];
  const zoneFaq: FAQItem[] = zoneServiceContent?.faq
    ? zoneServiceContent.faq as FAQItem[]
    : content.faq
      ? getZoneContent(content.faq as FAQItem[], zone.slug, 5)
      : [];

  // Maillage interne : autres zones et services
  const neighborZones = getNeighborZones(zone.slug, 8);
  const otherServices = services.filter(s => s.slug !== service.slug && s.hasPage);

  // Schema.org BreadcrumbList
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Accueil", "item": siteConfig.url },
      { "@type": "ListItem", "position": 2, "name": `${service.name} ${zone.name}`, "item": `${siteConfig.url}/${service.slug}-rideau-metallique-${zone.slug}` },
    ],
  };

  // Schema.org Service enrichi (aligné benchmark Store 2000)
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": `${service.name} rideau métallique ${zone.name}`,
    "description": `${service.name} de rideau métallique à ${zone.name} (${zone.postalCode}), ${siteConfig.department}. Intervention rapide, devis gratuit.`,
    "provider": {
      "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
      "name": siteConfig.fullName,
      "telephone": siteConfig.phone.replace(/\s/g, ""),
      "address": {
        "@type": "PostalAddress",
        "streetAddress": siteConfig.streetAddress,
        "addressLocality": siteConfig.city,
        "postalCode": siteConfig.postalCode,
        "addressRegion": siteConfig.department,
        "addressCountry": "FR",
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": String(siteConfig.reviews.rating),
        "reviewCount": String(siteConfig.reviews.count),
        "bestRating": "5",
      },
    },
    "areaServed": {
      "@type": "City",
      "name": zone.name,
      "postalCode": zone.postalCode,
    },
    "serviceType": `${service.name} rideau métallique`,
    "availableChannel": {
      "@type": "ServiceChannel",
      "servicePhone": siteConfig.phone.replace(/\s/g, ""),
      "serviceUrl": `${siteConfig.url}/${service.slug}-rideau-metallique-${zone.slug}`,
    },
  };

  // Schema.org FAQPage (si FAQ disponible)
  const faqSchema = zoneFaq.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": zoneFaq.map((item: FAQItem) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer.replace(/<[^>]*>/g, ''),
      },
    })),
  } : null;

  return (
    <main>
      {/* Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      {/* ─── HERO DARK COMPACT ─── */}
      <section className="relative overflow-hidden bg-gray-950">
        {/* Crosshatch pattern */}
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%), repeating-linear-gradient(-45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)', backgroundSize: '20px 20px' }} />
        {/* Blob décoratif */}
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-primary-600/10 rounded-full blur-3xl" />

        <div className="container relative z-10 py-14 md:py-20">
          {/* Breadcrumb */}
          <nav className="mb-6" aria-label="Fil d'Ariane">
            <ol className="flex items-center gap-2 text-xs text-white/30 flex-wrap">
              <li><Link href="/" className="hover:text-primary-400 transition-colors">Accueil</Link></li>
              <li>/</li>
              <li><Link href={`/zones/${zone.slug}`} className="hover:text-primary-400 transition-colors">{zone.name}</Link></li>
              <li>/</li>
              <li className="text-white/60 font-medium">{service.name}</li>
            </ol>
          </nav>

          <div className="max-w-3xl">
            {/* Badge pill */}
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/[0.06] border border-white/[0.08] text-white/70 text-sm font-medium mb-5" style={{ borderRadius: '100px' }}>
              <span className="w-2 h-2 bg-primary-400 rounded-full animate-pulse" />
              {service.name} - {zone.name}
            </span>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-[1.1] mb-5 tracking-tight">
              {content.hero.title.replace(zone.name, '')} <span className="text-primary-400">{zone.name}</span>
            </h1>

            <p className="text-white/40 text-lg mb-8 leading-relaxed max-w-xl">
              {content.hero.subtitle}
            </p>

            {/* Stats inline */}
            <div className="flex flex-wrap gap-6 text-sm text-white/30 mb-8">
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>
                <span className="text-white/60">{siteConfig.reviews.rating}/5</span> ({siteConfig.reviews.count} avis)
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span className="text-white/60">Intervention -30 min</span>
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                <span className="text-white/60">Garantie incluse</span>
              </span>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href={siteConfig.phoneLink}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-gray-900 font-semibold hover:bg-gray-100 transition-colors"
                style={{ borderRadius: '8px' }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {siteConfig.phone}
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 text-white font-semibold border border-white/20 hover:bg-white/10 transition-colors"
                style={{ borderRadius: '8px' }}
              >
                Devis gratuit
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── INTRODUCTION (masqué si contenu zone-spécifique) ─── */}
      {!zoneServiceContent && service.slug === "reparation" ? (
        <>
          {/* Section 1 : Image gauche, texte droite */}
          <section className="py-20 md:py-28 bg-gray-50">
            <div className="container">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="relative hidden lg:block">
                  <Image
                    src="/images/gallery/installation-rideau-metallique-paris-1-drm-paris.webp"
                    alt={`Technicien réparation rideau métallique ${zone.name}`}
                    title={`Technicien réparation rideau métallique ${zone.name}`}
                    width={800}
                    height={600}
                    className="w-full h-auto"
                    style={{ borderRadius: '8px' }}
                  />
                </div>
                <div className="max-w-xl">
                  <div className="w-12 h-1 bg-primary-600 mb-6" style={{borderRadius:"4px"}} />
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">{content.intro.title}</h2>
                  <div className="mt-6">
                    <p className="text-gray-500 text-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: content.intro.paragraphs[0] }} />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2 : Texte gauche, image droite */}
          <section className="py-20 md:py-28 bg-white">
            <div className="container">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="max-w-xl">
                  <div className="w-12 h-1 bg-primary-600 mb-6" style={{borderRadius:"4px"}} />
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">Réparation complète de votre rideau à {zone.name}</h2>
                  <div className="mt-6">
                    <p className="text-gray-500 text-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: content.intro.paragraphs[1] }} />
                  </div>
                </div>
                <div className="relative hidden lg:block">
                  <Image
                    src="/images/gallery/depannage-rideau-metallique-creil.webp"
                    alt={`Réparation lames rideau métallique ${zone.name}`}
                    title={`Réparation lames rideau métallique ${zone.name}`}
                    width={800}
                    height={600}
                    className="w-full h-auto"
                    style={{ borderRadius: '8px' }}
                  />
                </div>
              </div>
            </div>
          </section>
        </>
      ) : service.slug === "fabrication" ? (
        <section className="py-20 md:py-28 bg-gray-50">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="relative hidden lg:block">
                <div className="relative aspect-[4/3] overflow-hidden" style={{ borderRadius: '8px' }}>
                  <Image
                    src="/images/gallery/Drapeau-rideau-metallique-motorisation-centrale-3D.webp"
                    alt={`Fabrication rideau métallique sur-mesure ${zone.name}`}
                    title={`Fabrication rideau métallique sur-mesure ${zone.name}`}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="max-w-xl">
                <div className="w-12 h-1 bg-primary-600 mb-6" style={{borderRadius:"4px"}} />
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">{content.intro.title}</h2>
                <div className="mt-6 space-y-4">
                  {content.intro.paragraphs.map((p: string, i: number) => (
                    <p key={i} className="text-gray-500 text-lg leading-relaxed">{p}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="py-20 md:py-28 bg-gray-50">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="max-w-xl">
                <div className="w-12 h-1 bg-primary-600 mb-6" style={{borderRadius:"4px"}} />
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">{content.intro.title}</h2>
                <div className="mt-6 space-y-4">
                  {content.intro.paragraphs.map((p: string, i: number) => (
                    <p key={i} className="text-gray-500 text-lg leading-relaxed">{p}</p>
                  ))}
                </div>
              </div>
              <div className="relative hidden lg:block">
                <div className="relative aspect-[4/3] overflow-hidden" style={{ borderRadius: '8px' }}>
                  <Image
                    src="/images/gallery/rideau-metallique-lame-pleine-france.webp"
                    alt={`Rideau métallique ${zone.name}`}
                    title={`Rideau métallique ${zone.name}`}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ─── SITUATIONS / TYPES D'INTERVENTION (masqué si contenu zone-spécifique) ─── */}
      {!zoneServiceContent && !["installation", "reparation", "depannage", "deblocage", "motorisation"].includes(service.slug) && (
        <section className="py-20 md:py-28 bg-white">
          <div className="container">
            <div className="max-w-xl mb-14">
              <div className="w-12 h-1 bg-primary-600 mb-6" style={{borderRadius:"4px"}} />
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">{content.situations.title}</h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200">
              {content.situations.items.map((item: any, index: number) => (
                <div key={index} className="bg-white p-6">
                  <span className="font-bold text-3xl text-gray-200 block mb-3">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-heading font-bold text-gray-900 mb-2 text-[15px]">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════════════
          SECTIONS SPÉCIFIQUES DÉPANNAGE
          ═══════════════════════════════════════════════════════════════════ */}

      {/* ── DEPANNAGE : Étapes de déblocage (masqué si contenu zone-spécifique) ── */}
      {!zoneServiceContent && service.slug === "depannage" && content.deblocage && (
        <section className="py-20 md:py-28 bg-gray-50">
          <div className="container">
            <div className="max-w-xl mb-14">
              <div className="w-12 h-1 bg-primary-600 mb-6" style={{borderRadius:"4px"}} />
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">{content.deblocage.title}</h2>
              <p className="text-gray-500 text-lg mt-4 max-w-xl">{content.deblocage.description}</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-gray-200">
              {content.deblocage.steps.map((step: any, index: number) => (
                <div key={index} className="py-6 lg:py-0 lg:px-8 first:lg:pl-0 last:lg:pr-0">
                  <span className="font-bold text-5xl text-gray-200 block mb-3">{step.step}</span>
                  <h3 className="font-heading font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
            <div className="mt-12">
              <a href={siteConfig.phoneLink} className="btn-primary">
                Déblocage urgent : {siteConfig.phone}
              </a>
            </div>
          </div>
        </section>
      )}

      {/* ── DEPANNAGE : Pannes courantes (masqué si contenu zone-spécifique) ── */}
      {!zoneServiceContent && service.slug === "depannage" && content.pannes && (
        <section className="py-20 md:py-28 bg-white">
          <div className="container">
            <div className="max-w-xl mb-14">
              <div className="w-12 h-1 bg-primary-600 mb-6" style={{borderRadius:"4px"}} />
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">{content.pannes.title}</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-200">
              {content.pannes.items.map((panne: any, index: number) => (
                <div key={index} className="bg-white p-8">
                  <div className="flex items-start gap-4">
                    <span className="font-bold text-3xl text-gray-200 leading-none">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-heading font-bold text-gray-900">{panne.title}</h3>
                        {panne.urgency && (
                          <span className={`text-[10px] font-bold uppercase tracking-wider ${
                            panne.urgency === 'urgent' ? 'text-red-500'
                              : panne.urgency === 'moyen' ? 'text-primary-600'
                              : 'text-gray-400'
                          }`}>
                            {panne.urgency === 'urgent' ? 'Urgent' : panne.urgency === 'moyen' ? 'Moyen' : 'Faible'}
                          </span>
                        )}
                      </div>
                      <p className="text-gray-400 text-sm leading-relaxed">{panne.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── DEPANNAGE : Urgence 24/7 (masqué si contenu zone-spécifique) ── */}
      {!zoneServiceContent && service.slug === "depannage" && content.urgence && (
        <section className="relative py-24 md:py-32 bg-gray-900 overflow-hidden">
          <div className="hidden" />
          <div className="container relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-red-400 mb-6">
                  <span className="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse" />
                  Urgence 24h/24
                </span>
                <h2 className="font-bold text-4xl md:text-5xl text-white leading-[1.1] mb-5">
                  {content.urgence.title}
                </h2>
                <p className="text-white/40 text-lg mb-10 leading-relaxed">{content.urgence.description}</p>

                <div className="flex gap-8 mb-10">
                  {content.urgence.stats.map((stat: any, index: number) => (
                    <div key={index}>
                      <p className="font-bold text-3xl text-primary-600">{stat.value}</p>
                      <p className="text-white/30 text-xs mt-0.5">{stat.label}</p>
                    </div>
                  ))}
                </div>

                <a href={siteConfig.phoneLink}
                  className="inline-flex items-center gap-2 px-7 py-3.5 text-[15px] font-bold text-white transition-colors"
                  style={{ background: '#dc2626', borderRadius: '4px' }}>
                  Appel Urgence : {siteConfig.phone}
                </a>
              </div>

              <div className="space-y-0 divide-y divide-white/[0.06]">
                <h3 className="font-heading font-bold text-white text-sm uppercase tracking-wider pb-4">
                  Cas d&apos;urgence fréquents
                </h3>
                {content.urgence.cases.map((cas: string, index: number) => (
                  <div key={index} className="flex items-center gap-3 py-4 text-white/50 text-sm hover:text-white/80 transition-colors">
                    <span className="w-1 h-1 bg-red-400 rounded-full flex-shrink-0" />
                    {cas}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════════════
          SECTIONS SPÉCIFIQUES DÉBLOCAGE
          ═══════════════════════════════════════════════════════════════════ */}

      {/* ── DEBLOCAGE : Étapes de déblocage (masqué si contenu zone-spécifique) ── */}
      {!zoneServiceContent && service.slug === "deblocage" && content.deblocage && (
        <section className="py-20 md:py-28 bg-gray-50">
          <div className="container">
            <div className="max-w-xl mb-14">
              <div className="w-12 h-1 bg-primary-600 mb-6" style={{borderRadius:"4px"}} />
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">{content.deblocage.title}</h2>
              <p className="text-gray-500 text-lg mt-4 max-w-xl">{content.deblocage.description}</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-gray-200">
              {content.deblocage.steps.map((step: any, index: number) => (
                <div key={index} className="py-6 lg:py-0 lg:px-8 first:lg:pl-0 last:lg:pr-0">
                  <span className="font-bold text-5xl text-gray-200 block mb-3">{step.step}</span>
                  <h3 className="font-heading font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
            <div className="mt-12">
              <a href={siteConfig.phoneLink} className="btn-primary">
                Déblocage urgent : {siteConfig.phone}
              </a>
            </div>
          </div>
        </section>
      )}

      {/* ── DEBLOCAGE : Pannes courantes ── */}
      {!zoneServiceContent && service.slug === "deblocage" && content.pannes && (
        <section className="py-20 md:py-28 bg-white">
          <div className="container">
            <div className="max-w-xl mb-14">
              <div className="w-12 h-1 bg-primary-600 mb-6" style={{borderRadius:"4px"}} />
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">{content.pannes.title}</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-200">
              {content.pannes.items.map((panne: any, index: number) => (
                <div key={index} className="bg-white p-8">
                  <div className="flex items-start gap-4">
                    <span className="font-bold text-3xl text-gray-200 leading-none">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-heading font-bold text-gray-900">{panne.title}</h3>
                        {panne.urgency && (
                          <span className={`text-[10px] font-bold uppercase tracking-wider ${
                            panne.urgency === 'urgent' ? 'text-red-500'
                              : panne.urgency === 'moyen' ? 'text-primary-600'
                              : 'text-gray-400'
                          }`}>
                            {panne.urgency === 'urgent' ? 'Urgent' : panne.urgency === 'moyen' ? 'Moyen' : 'Faible'}
                          </span>
                        )}
                      </div>
                      <p className="text-gray-400 text-sm leading-relaxed">{panne.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── DEBLOCAGE : Urgence 24/7 ── */}
      {!zoneServiceContent && service.slug === "deblocage" && content.urgence && (
        <section className="relative py-24 md:py-32 bg-gray-900 overflow-hidden">
          <div className="hidden" />
          <div className="container relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-red-400 mb-6">
                  <span className="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse" />
                  Urgence 24h/24
                </span>
                <h2 className="font-bold text-4xl md:text-5xl text-white leading-[1.1] mb-5">
                  {content.urgence.title}
                </h2>
                <p className="text-white/40 text-lg mb-10 leading-relaxed">{content.urgence.description}</p>
                <div className="flex gap-8 mb-10">
                  {content.urgence.stats.map((stat: any, index: number) => (
                    <div key={index}>
                      <p className="font-bold text-3xl text-primary-600">{stat.value}</p>
                      <p className="text-white/30 text-xs mt-0.5">{stat.label}</p>
                    </div>
                  ))}
                </div>
                <a href={siteConfig.phoneLink}
                  className="inline-flex items-center gap-2 px-7 py-3.5 text-[15px] font-bold text-white transition-colors"
                  style={{ background: '#dc2626', borderRadius: '4px' }}>
                  Appel Urgence : {siteConfig.phone}
                </a>
              </div>
              <div className="space-y-0 divide-y divide-white/[0.06]">
                <h3 className="font-heading font-bold text-white text-sm uppercase tracking-wider pb-4">
                  Cas d&apos;urgence fréquents
                </h3>
                {content.urgence.cases.map((cas: string, index: number) => (
                  <div key={index} className="flex items-center gap-3 py-4 text-white/50 text-sm hover:text-white/80 transition-colors">
                    <span className="w-1 h-1 bg-red-400 rounded-full flex-shrink-0" />
                    {cas}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════════════
          SECTIONS SPÉCIFIQUES RÉPARATION
          ═══════════════════════════════════════════════════════════════════ */}

      {/* ── REPARATION : Types de réparation ── */}
      {!zoneServiceContent && service.slug === "reparation" && content.typesReparation && (
        <section className="py-20 md:py-28 bg-gray-50">
          <div className="container">
            <div className="max-w-xl mb-14">
              <div className="w-12 h-1 bg-primary-600 mb-6" style={{borderRadius:"4px"}} />
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">{content.typesReparation.title}</h2>
              <p className="text-gray-500 text-lg mt-4 max-w-xl">
                Nous réparons tous les composants de votre rideau métallique à {zone.name} et dans le {siteConfig.department}.
              </p>
            </div>
            <div className="divide-y divide-gray-200">
              {content.typesReparation.items.map((type: any, index: number) => (
                <div key={index} className="grid grid-cols-12 gap-6 py-6 items-center">
                  <div className="col-span-1">
                    <span className="font-bold text-2xl text-gray-200">{String(index + 1).padStart(2, '0')}</span>
                  </div>
                  <div className="col-span-11 md:col-span-8">
                    <h3 className="font-heading font-bold text-gray-900 text-[15px]">{type.name}</h3>
                    <p className="text-gray-400 text-sm">{type.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-10">
              <a href={siteConfig.phoneLink} className="btn-primary">
                Devis réparation : {siteConfig.phone}
              </a>
            </div>
          </div>
        </section>
      )}

      {/* ── REPARATION : Processus de réparation ── */}
      {!zoneServiceContent && service.slug === "reparation" && content.processus && (
        <ProcessusInstallation
          zoneName={zone.name}
          items={content.processus.items}
          title={content.processus.title}
        />
      )}

      {/* ═══════════════════════════════════════════════════════════════════
          SECTIONS SPÉCIFIQUES PAR SERVICE
          ═══════════════════════════════════════════════════════════════════ */}

      {/* ── INSTALLATION : Types de rideaux ── */}
      {!zoneServiceContent && service.slug === "installation" && content.typesRideaux && (
        <TypesRideaux
          zoneName={zone.name}
          items={content.typesRideaux}
          title={`Types de rideaux métalliques installés à ${zone.name}`}
        />
      )}

      {/* ── INSTALLATION : Processus d'installation ── */}
      {!zoneServiceContent && service.slug === "installation" && content.processus && (
        <ProcessusInstallation
          zoneName={zone.name}
          items={content.processus}
          title={`Processus d'installation à ${zone.name}`}
        />
      )}

      {/* ── FABRICATION : Sur-mesure ── */}
      {!zoneServiceContent && service.slug === "fabrication" && content.surMesure && (
        <SurMesureLocal
          title={content.surMesure.title}
          subtitle={content.surMesure.subtitle}
          comparatif={content.surMesure.comparatif}
          avantages={content.surMesure.avantages}
          zoneName={zone.name}
        />
      )}

      {/* ── FABRICATION : Normes et certifications ── */}
      {!zoneServiceContent && service.slug === "fabrication" && content.normes && (
        <NormesCertifications
          title={content.normes.title}
          subtitle={content.normes.subtitle}
          items={content.normes.items}
        />
      )}

      {/* ── ENTRETIEN : Signes d'usure ── */}
      {!zoneServiceContent && service.slug === "entretien" && content.signesUsure && (
        <SignesUsure
          title={content.signesUsure.title}
          subtitle={content.signesUsure.subtitle}
          items={content.signesUsure.items}
          zoneName={zone.name}
        />
      )}

      {/* ── ENTRETIEN : Contrats d'entretien ── */}
      {!zoneServiceContent && service.slug === "entretien" && content.contrats && (
        <ContratEntretien
          title={content.contrats.title}
          subtitle={content.contrats.subtitle}
          formules={content.contrats.formules}
          zoneName={zone.name}
        />
      )}

      {/* ── MOTORISATION : Avantages + comparatif ── */}
      {!zoneServiceContent && service.slug === "motorisation" && content.avantagesMotorisation && (
        <AvantagesMotorisation
          title={content.avantagesMotorisation.title}
          subtitle={content.avantagesMotorisation.subtitle}
          avantages={content.avantagesMotorisation.items}
          comparatif={content.comparatif}
          zoneName={zone.name}
        />
      )}

      {/* ── MOTORISATION : Marques de moteurs ── */}
      {!zoneServiceContent && service.slug === "motorisation" && content.marques && (
        <MarquesMoteurs
          title={content.marques.title}
          subtitle={content.marques.subtitle}
          items={content.marques.items}
        />
      )}

      {/* ═══════════════════════════════════════════════════════════════════
          SECTIONS COMMUNES À TOUS LES SERVICES
          ═══════════════════════════════════════════════════════════════════ */}

      {/* ─── POURQUOI NOUS CHOISIR (masqué si contenu zone-spécifique existe) ─── */}
      {!zoneServiceContent && (
        <WhyChooseUs
          title={content.advantages.title}
          items={content.advantages.items}
          zoneName={zone.name}
          zonePostal={zone.postalCode}
        />
      )}

      {/* ─── SECTIONS ALTERNÉES SEO (masqué si contenu zone-spécifique existe) ─── */}
      {!zoneServiceContent && content.alternatingFeatures && (
        <AlternatingFeatures features={content.alternatingFeatures} bgColor="bg-gray-50" />
      )}

      {/* ═══════════════════════════════════════════════════════════════════
          CONTENU UNIQUE ZONE × SERVICE (généré par analyse SERP)
          ═══════════════════════════════════════════════════════════════════ */}

      {/* ─── ZONE INTRO UNIQUE ─── */}
      {zoneServiceContent?.zoneIntro && (
        <section className="relative py-20 md:py-28 bg-white overflow-hidden">
          {/* Blob décoratif */}
          <div className="absolute -top-24 -left-24 w-[400px] h-[400px] bg-primary-50 rounded-full blur-3xl" />
          <div className="container relative z-10">
            <div className="max-w-4xl mx-auto">
              <div className="w-12 h-1 bg-primary-600 mb-6" style={{borderRadius:"4px"}} />
              <div
                className="text-gray-600 text-lg leading-relaxed prose prose-a:text-primary-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900"
                dangerouslySetInnerHTML={{ __html: zoneServiceContent.zoneIntro }}
              />
            </div>
          </div>
        </section>
      )}

      {/* ─── ZONE FEATURES ALTERNÉES UNIQUES ─── */}
      {zoneServiceContent?.zoneFeatures && zoneServiceContent.zoneFeatures.length > 0 && (
        <>
          {zoneServiceContent.zoneFeatures.map((feature, index) => (
            <section
              key={index}
              className={`relative py-20 md:py-28 overflow-hidden ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
            >
              {/* Blob décoratif */}
              <div className={`absolute w-[350px] h-[350px] rounded-full blur-3xl ${index % 2 === 0 ? 'bg-primary-50 -bottom-20 -right-20' : 'bg-primary-50/60 -top-20 -left-20'}`} />
              <div className="container relative z-10">
                {/* Numéro gradient en haut */}
                <span className="block text-[80px] md:text-[100px] font-extrabold leading-none mb-[-20px] md:mb-[-30px] bg-gradient-to-b from-gray-200 to-transparent bg-clip-text text-transparent select-none">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center ${
                  feature.imagePosition === "left" ? "" : "lg:grid-flow-dense"
                }`}>
                  {feature.imagePosition === "left" && (
                    <div className="relative hidden lg:block">
                      <div className="relative aspect-[4/3] overflow-hidden shadow-2xl" style={{ borderRadius: '16px' }}>
                        <Image
                          src={feature.image}
                          alt={feature.imageAlt} title={feature.imageAlt}
                          fill
                          className="object-cover"
                        />
                      </div>
                      {/* Offset décoratif */}
                      <div className="absolute -z-10 -bottom-4 -right-4 w-full h-full bg-primary-100/50" style={{ borderRadius: '16px' }} />
                    </div>
                  )}
                  <div className="max-w-xl">
                    <h2
                      className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight tracking-tight"
                      dangerouslySetInnerHTML={{ __html: feature.title }}
                    />
                    <div
                      className="mt-6 text-gray-500 text-lg leading-relaxed prose prose-a:text-primary-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900"
                      dangerouslySetInnerHTML={{ __html: feature.content }}
                    />
                  </div>
                  {feature.imagePosition === "right" && (
                    <div className="relative hidden lg:block">
                      <div className="relative aspect-[4/3] overflow-hidden shadow-2xl" style={{ borderRadius: '16px' }}>
                        <Image
                          src={feature.image}
                          alt={feature.imageAlt} title={feature.imageAlt}
                          fill
                          className="object-cover"
                        />
                      </div>
                      {/* Offset décoratif */}
                      <div className="absolute -z-10 -bottom-4 -left-4 w-full h-full bg-primary-100/50" style={{ borderRadius: '16px' }} />
                    </div>
                  )}
                </div>
              </div>
            </section>
          ))}
        </>
      )}

      {/* ─── CAS D'INTERVENTIONS RÉCENTES ─── */}
      {zoneServiceContent?.recentCases && zoneServiceContent.recentCases.length > 0 && (
        <section className="relative py-20 md:py-28 bg-gray-950 overflow-hidden">
          {/* Blob décoratif */}
          <div className="absolute -top-32 -left-32 w-[400px] h-[400px] bg-primary-600/5 rounded-full blur-3xl" />
          <div className="container relative z-10">
            <div className="max-w-xl mb-14">
              <p className="text-primary-400 text-sm font-semibold uppercase tracking-widest mb-3">Cas récents</p>
              <h2 className="font-extrabold text-3xl md:text-4xl text-white leading-[1.1] tracking-tight">
                Interventions récentes à {zone.name}
              </h2>
              <p className="text-white/40 mt-4">
                Découvrez nos dernières interventions de {service.name.toLowerCase()} à {zone.name} et dans les environs.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {zoneServiceContent.recentCases.map((cas: ZoneServiceRecentCase, index: number) => (
                <div key={index} className="bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] p-8 hover:-translate-y-1 transition-all duration-300" style={{ borderRadius: '16px' }}>
                  <span className="text-xs font-bold uppercase tracking-widest text-primary-400">{cas.date}</span>
                  <h3 className="font-heading font-bold text-white mt-2 mb-4">{cas.lieu}</h3>
                  <div className="space-y-3 text-sm">
                    <p className="text-white/50"><span className="text-white/30 font-bold">Probleme :</span> {cas.probleme}</p>
                    <p className="text-white/50"><span className="text-white/30 font-bold">Solution :</span> {cas.solution}</p>
                    <p className="text-white/50"><span className="text-white/30 font-bold">Durée :</span> {cas.duree}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── CONTEXTE TARIFS ZONE ─── */}
      {zoneServiceContent?.tarifContext && (
        <section className="relative py-20 md:py-28 bg-gray-50 overflow-hidden">
          <div className="absolute -bottom-20 -right-20 w-[300px] h-[300px] bg-primary-50 rounded-full blur-3xl" />
          <div className="container relative z-10">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white border border-gray-200 p-8 md:p-12 shadow-sm" style={{ borderRadius: '20px' }}>
                <p className="text-primary-600 text-sm font-semibold uppercase tracking-widest mb-3">Tarifs</p>
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight tracking-tight">Tarifs {service.name.toLowerCase()} à {zone.name}</h2>
                <div
                  className="mt-6 text-gray-500 text-lg leading-relaxed prose prose-strong:text-gray-900"
                  dangerouslySetInnerHTML={{ __html: zoneServiceContent.tarifContext }}
                />
                <div className="mt-8">
                  <a
                    href={siteConfig.phoneLink}
                    className="inline-flex items-center gap-2 px-6 py-3.5 bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors shadow-lg shadow-primary-600/25"
                    style={{ borderRadius: '8px' }}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Devis gratuit : {siteConfig.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ─── CONTENU HYPER-LOCAL ─── */}
      {zoneLocalData[zone.slug] && (
        <ZoneLocalSection
          zoneName={zone.name}
          zonePostal={zone.postalCode}
          zoneSlug={zone.slug}
          serviceName={service.name}
          serviceSlug={service.slug}
          localData={zoneLocalData[zone.slug]}
        />
      )}

      {/* ─── AVIS CLIENTS ─── */}
      {zoneReviews.length > 0 && (
        <Reviews
          items={zoneReviews}
          title={`Avis ${service.name} Rideau Métallique ${zone.name}`}
          subtitle={`Nos clients à ${zone.name} témoignent de la qualité de notre service de ${service.name.toLowerCase()}.`}
        />
      )}

      {/* ─── MAILLAGE : AUTRES SERVICES À [ZONE] ─── */}
      <section className="relative py-20 md:py-28 bg-white overflow-hidden">
        <div className="absolute -bottom-24 -left-24 w-[350px] h-[350px] bg-primary-50/60 rounded-full blur-3xl" />
        <div className="container relative z-10">
          <div className="max-w-xl mb-12">
            <p className="text-primary-600 text-sm font-semibold uppercase tracking-widest mb-3">Nos services</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
              Nos autres services à {zone.name}
            </h2>
            <p className="text-gray-500 text-lg mt-4 max-w-xl">
              {siteConfig.name} propose une gamme complète de services pour rideaux métalliques à {zone.name}.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-4xl">
            {otherServices.map((s) => (
              <Link
                key={s.id}
                href={`/${s.slug}-rideau-metallique-${zone.slug}`}
                className="group flex items-center justify-between p-5 bg-white border border-gray-100 hover:border-primary-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                style={{ borderRadius: '16px' }}
              >
                <div>
                  <span className="font-bold text-gray-900 group-hover:text-primary-600 transition-colors block">{s.name}</span>
                  <span className="text-xs text-gray-400 mt-0.5 block">{zone.name}</span>
                </div>
                <svg className="w-5 h-5 text-gray-300 group-hover:text-primary-600 group-hover:translate-x-1 transition-all flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── MAILLAGE : CE SERVICE DANS D'AUTRES ZONES ─── */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="container">
          <div className="max-w-xl mb-12">
            <p className="text-primary-600 text-sm font-semibold uppercase tracking-widest mb-3">Zones voisines</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
              {service.name} dans les zones voisines
            </h2>
            <p className="text-gray-500 text-lg mt-4 max-w-xl">
              {siteConfig.name} intervient pour {service.name.toLowerCase()} dans tout le {siteConfig.department}.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {neighborZones.map((z) => (
              <Link
                key={z.slug}
                href={`/${service.slug}-rideau-metallique-${z.slug}`}
                className="px-4 py-2.5 bg-white text-gray-600 text-sm border border-gray-200 hover:border-primary-300 hover:text-primary-700 hover:-translate-y-1 transition-all duration-300 shadow-sm"
                style={{ borderRadius: '100px' }}
              >
                {service.name} {z.name}
              </Link>
            ))}
            <Link
              href="/"
              className="px-4 py-2.5 bg-gray-900 text-white text-sm font-bold hover:bg-gray-800 transition-colors"
              style={{ borderRadius: '100px' }}
            >
              Toutes les zones
            </Link>
          </div>
        </div>
      </section>

      {/* ─── FAQ LOCALE ─── */}
      {zoneFaq.length > 0 && (
        <FAQ
          items={zoneFaq}
          title={`Questions fréquentes - ${service.name} à ${zone.name}`}
          subtitle={`Retrouvez les réponses aux questions les plus fréquentes sur le service de ${service.name.toLowerCase()} à ${zone.name} (${zone.postalCode}).`}
        />
      )}

      {/* ─── CTA FINAL ─── */}
      <CTA
        title={content.cta.title}
        subtitle={content.cta.subtitle}
      />
    </main>
  );
}
