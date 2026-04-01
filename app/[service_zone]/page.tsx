import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { siteConfig, zones, services } from "@/config/site";
import { getPageContent, getZoneBySlug, getServiceBySlug, getZoneContent, getNeighborZones } from "@/lib/content";
import { FAQ } from "@/components/sections/FAQ";
import { CTA } from "@/components/sections/CTA";
import { Reviews } from "@/components/sections/Reviews";
import { ServicesCarousel } from "@/components/sections/ServicesCarousel";

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

// ═══════════════════════════════════════════════════════════════════════════
// IMAGES PAR SERVICE — chaque service a des images uniques par section
// ═══════════════════════════════════════════════════════════════════════════
const SERVICE_IMAGES: Record<string, {
  hero: string;
  intro1: string;
  intro2: string;
  zoneIntro: string;
  zoneFeatures: string[];
}> = {
  depannage: {
    hero: "/images/gallery/depannage-rideau-metallique-creil-60.webp",
    intro1: "/images/gallery/depannage-rideau-metallique-drm-services.webp",
    intro2: "/images/gallery/depannage-rideau-metallique-drm-france-rm.webp",
    zoneIntro: "/images/gallery/depannage-rideau-metallique-creil.webp",
    zoneFeatures: [
      "/images/gallery/depannage-rideau-metallique-DRM-reparation.webp",
      "/images/gallery/depannage-rideau-metallique-paris-19-drm.webp",
      "/images/gallery/rideau-metallique-bloque-depannage-rideau-metallique.webp",
      "/images/gallery/depannage-rideau-metallique-rm-drm-france.webp",
    ],
  },
  installation: {
    hero: "/images/gallery/installation-rideau-metallique-creil.webp",
    intro1: "/images/gallery/installation-rideau-metallique-drm.webp",
    intro2: "/images/gallery/installation-rideau-metallique-sur-mesure-france.webp",
    zoneIntro: "/images/gallery/installation-rideau-metallique-anti-effraction.webp",
    zoneFeatures: [
      "/images/gallery/installation-rideau-metallique-paris-1-drm-paris.webp",
      "/images/gallery/pose-coulisse-tablier-rideau-metallique.webp",
      "/images/gallery/prise-de-mesure-rideau-metallique-drm.webp",
      "/images/gallery/raccordement-rideau-metallique-drm.webp",
    ],
  },
  motorisation: {
    hero: "/images/gallery/motorisation-rideau-metallique-drm-depannage.webp",
    intro1: "/images/gallery/motorisation-rideau-metallique-rideau-metallique-drm.webp",
    intro2: "/images/gallery/motorisation-rideau-metallique-rm-rideau-metallique.webp",
    zoneIntro: "/images/gallery/rideau-metallique-motorise-garage.webp",
    zoneFeatures: [
      "/images/gallery/raccordement-rideau-metallique-drm.webp",
      "/images/gallery/realisation-rideau-metallique-garage.webp",
      "/images/gallery/depannage-rideau-metallique-paris-19-drm.webp",
      "/images/gallery/realisation-rideau-metallique-lame-pleine-en-applique-france.webp",
    ],
  },
  entretien: {
    hero: "/images/gallery/entretien-rideau-metallique-drm-france.webp",
    intro1: "/images/gallery/entretien-rideau-metallique-drm-rideau-metallique.webp",
    intro2: "/images/gallery/entretien-rideau-metallique-france-entretien.webp",
    zoneIntro: "/images/gallery/entretien-rideau-metallique-rideau-de-fer.webp",
    zoneFeatures: [
      "/images/gallery/test-rideau-metallique-drm.webp",
      "/images/gallery/rideau-metallique-depannage-rideau-metallique.webp",
      "/images/gallery/realisation-rideau-metallique-lame-pleine-commerce.webp",
      "/images/gallery/details-rideau-metallique-france.webp",
    ],
  },
  fabrication: {
    hero: "/images/gallery/fabrication-rideau-metallique-creil.webp",
    intro1: "/images/gallery/fabrication-rideau-metallique-creil-2.webp",
    intro2: "/images/gallery/rideau-metallique-thermolaquage.webp",
    zoneIntro: "/images/gallery/fabrication-rideau-metallique-entreprise-drm.webp",
    zoneFeatures: [
      "/images/gallery/fabrication-axe-rideau-metallique-france.webp",
      "/images/gallery/realisation-rideau-metallique-lame-pleine-industriel-france.webp",
      "/images/gallery/fabrication-rideau-metallique-rideau-metallique-france-drm.webp",
      "/images/gallery/realisation-rideau-metallique-lame-pleine-en-applique-france.webp",
    ],
  },
  deblocage: {
    hero: "/images/gallery/rideau-metallique-bloque-depannage-rideau-metallique.webp",
    intro1: "/images/gallery/depannage-rideau-metallique-drm-france-rm.webp",
    intro2: "/images/gallery/depannage-rideau-metallique-paris-1-drm-paris.webp",
    zoneIntro: "/images/gallery/depannage-rideau-metallique-drm.webp",
    zoneFeatures: [
      "/images/gallery/rideau-metallique-anti-effraction-blinde.webp",
      "/images/gallery/depannage-rideau-metallique-rm-drm-france.webp",
      "/images/gallery/realisation-rideau-metallique-lame-pleine-commerce.webp",
      "/images/gallery/depannage-rideau-metallique-creil.webp",
    ],
  },
  reparation: {
    hero: "/images/gallery/depannage-rideau-metallique-DRM-reparation.webp",
    intro1: "/images/gallery/depannage-rideau-metallique-drm-services.webp",
    intro2: "/images/gallery/depannage-rideau-metallique-creil.webp",
    zoneIntro: "/images/gallery/rideau-metallique-depannage-rideau-metallique.webp",
    zoneFeatures: [
      "/images/gallery/depannage-rideau-metallique-paris-19-drm.webp",
      "/images/gallery/rideau-metallique-anti-effraction-blinde.webp",
      "/images/gallery/depannage-rideau-metallique-rm-drm-france.webp",
      "/images/gallery/realisation-rideau-metallique-lame-pleine-industriel-france.webp",
    ],
  },
};

// Helper: get the right images for a service (with fallback)
function getServiceImages(serviceSlug: string) {
  return SERVICE_IMAGES[serviceSlug] || SERVICE_IMAGES.depannage;
}

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
      params.push({
        service_zone: `${service.slug}-rideau-metallique-${zone.slug}`,
      });
    }
  }

  // Pages zone overview : rideau-metallique-chambly, rideau-metallique-creil, etc.
  for (const zone of zones) {
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
      openGraph: { title, description, type: "website", locale: "fr_FR", url: `${siteConfig.url}/rideau-metallique-${zone.slug}/` },
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
      locale: "fr_FR",
      url: `${siteConfig.url}/${service.slug}-rideau-metallique-${zone.slug}/`,
      images: [{
        url: `${siteConfig.url}${service.image}`,
        width: 800,
        height: 600,
        alt: `${service.name} rideau metallique ${zone.name}`,
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
        {/* Hero with background image */}
        <section className="relative overflow-hidden bg-gray-900">
          <Image
            src="/images/gallery/rideau-metallique-industrielle-rideau-metallique-drm.webp"
            alt={`Rideau métallique ${zone.name}`}
            title={`Rideau métallique ${zone.name}`}
            fill
            className="object-cover opacity-20"
            sizes="100vw"
            />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/90 to-gray-900/70" />

          <div className="container relative z-10 py-14 md:py-20">
            <nav className="mb-6" aria-label="Fil d'Ariane">
              <ol className="flex items-center gap-2 text-xs text-white/30">
                <li><Link href="/" className="hover:text-primary-400 transition-colors">Accueil</Link></li>
                <li>/</li>
                <li className="text-white/60 font-medium">Rideau Métallique {zone.name}</li>
              </ol>
            </nav>

            <div className="max-w-3xl">
              <span className="section-label text-primary-400 mb-4 block">
                Rideau Métallique — {zone.name} ({zone.postalCode})
              </span>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-[1.1] mb-4 tracking-tight">
                Rideau Métallique <span className="text-primary-400">{zone.name}</span>
              </h1>

              <div className="divider-industrial-lg mb-6" />

              <p className="text-white/50 text-lg leading-relaxed mb-8 max-w-xl">
                {zoneLocal?.description || `${siteConfig.name} intervient à ${zone.name} (${zone.postalCode}) pour le dépannage, l'installation, la réparation et l'entretien de vos rideaux métalliques. Intervention rapide, devis gratuit.`}
              </p>

              <div className="flex flex-wrap gap-3 mb-10">
                <a href={siteConfig.phoneLink} className="btn-phone">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {siteConfig.phone}
                </a>
                <Link href="/contact" className="inline-flex items-center justify-center rounded-full border-2 border-white/40 px-7 py-3.5 text-sm font-bold text-white bg-transparent hover:bg-white hover:text-gray-900 transition-all">
                  Devis gratuit
                </Link>
              </div>

              {/* Trust stats */}
              <div className="flex flex-wrap gap-8 text-sm">
                <div>
                  <span className="text-white font-bold">{siteConfig.reviews.rating}/5</span>
                  <span className="text-white/40 ml-1">({siteConfig.reviews.count} avis)</span>
                </div>
                <div>
                  <span className="text-white font-bold">-30 min</span>
                  <span className="text-white/40 ml-1">intervention</span>
                </div>
                <div>
                  <span className="text-white font-bold">24h/24</span>
                  <span className="text-white/40 ml-1">7j/7</span>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute top-0 right-0 w-1 h-full bg-primary-600 hidden lg:block" />
        </section>

        {/* Services dans cette zone — carrousel avec visuels */}
        <ServicesCarousel
          services={services.filter(s => s.hasPage)}
          serviceImages={{
            depannage: "/images/gallery/depannage-rideau-metallique-DRM-reparation.webp",
            installation: "/images/gallery/installation-rideau-metallique-drm.webp",
            fabrication: "/images/gallery/realisation-rideau-metallique-lame-pleine-commerce.webp",
            entretien: "/images/gallery/entretien-rideau-metallique-rideau-de-fer.webp",
            motorisation: "/images/gallery/motorisation-rideau-metallique-drm-depannage.webp",
            deblocage: "/images/gallery/depannage-rideau-metallique-drm-france-rm.webp",
            reparation: "/images/gallery/realisation-drm-rideau-metallique-lame-pleine.webp",
          }}
          city={zone.name}
          department={siteConfig.department}
        />

        {/* Infos zone */}
        {zoneLocal && (
          <section className="relative py-20 md:py-28 bg-gray-50 overflow-hidden">
            <div className="container relative z-10">
              <div className="max-w-3xl">
                <span className="section-label block mb-3">A propos</span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-4">{zone.name} — {zone.postalCode}</h2>
                <div className="divider-industrial mb-6" />
                <p className="text-gray-500 text-lg leading-relaxed mb-8">{zoneLocal.description}</p>
                {zoneLocal.quartiers && (
                  <div className="mb-6">
                    <p className="font-semibold text-gray-900 text-sm mb-3">Quartiers desservis :</p>
                    <div className="flex flex-wrap gap-2">
                      {zoneLocal.quartiers.map((q, i) => (
                        <span key={i} className="px-3 py-1.5 bg-white text-gray-600 text-sm border border-gray-200">{q}</span>
                      ))}
                    </div>
                  </div>
                )}
                {zoneLocal.landmarks && (
                  <div>
                    <p className="font-semibold text-gray-900 text-sm mb-3">Points de repère :</p>
                    <div className="flex flex-wrap gap-2">
                      {zoneLocal.landmarks.map((l, i) => (
                        <span key={i} className="px-3 py-1.5 bg-primary-50 text-primary-700 text-sm border border-primary-100">{l}</span>
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
            <span className="section-label block mb-3">Zones voisines</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-4">Rideau métallique dans l&apos;{siteConfig.department}</h2>
            <div className="divider-industrial mb-8" />
            <div className="flex flex-wrap gap-2">
              {neighborZones.map((z) => (
                <Link key={z.slug} href={`/rideau-metallique-${z.slug}`}
                  className="px-4 py-2.5 bg-white text-gray-600 text-sm border border-gray-200 hover:border-primary-300 hover:text-primary-700 hover:-translate-y-1 transition-all duration-300">
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

  // Images uniques pour ce service
  const svcImages = getServiceImages(service.slug);

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

  // NOTE: FAQPage schema is handled by the <FAQ> component itself — do NOT add it here
  // to avoid duplicate FAQPage structured data (GSC error "Champ FAQPage en double")

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

      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden bg-gray-900">
        <Image
          src={svcImages.hero}
          alt={`${service.name} rideau métallique ${zone.name}`}
          title={`${service.name} rideau métallique ${zone.name}`}
          fill
          priority
          className="object-cover opacity-25"
          sizes="100vw"
          />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 via-gray-900/70 to-gray-900/95" />

        <div className="container relative z-10 py-12 md:py-16">
          {/* Breadcrumb */}
          <nav className="mb-5" aria-label="Fil d'Ariane">
            <ol className="flex items-center gap-2 text-xs text-white/40 flex-wrap">
              <li><Link href="/" className="hover:text-primary-400 transition-colors">Accueil</Link></li>
              <li>/</li>
              <li><Link href={`/rideau-metallique-${zone.slug}`} className="hover:text-primary-400 transition-colors">{zone.name}</Link></li>
              <li>/</li>
              <li className="text-white/70 font-medium">{service.name}</li>
            </ol>
          </nav>

          <div className="max-w-3xl">
            <span className="section-label text-primary-400 mb-3 block">
              {service.name} — {zone.name} ({zone.postalCode})
            </span>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-[1.1] mb-4 tracking-tight">
              {content.hero.title.replace(zone.name, '')} <span className="text-primary-400">{zone.name}</span>
            </h1>

            <div className="divider-industrial-lg mb-5" />

            <p className="text-white/50 text-lg mb-6 leading-relaxed max-w-xl">
              {content.hero.subtitle}
            </p>

            <div className="flex flex-wrap gap-3">
              <a href={siteConfig.phoneLink} className="btn-phone">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {siteConfig.phone}
              </a>
              <Link href="/contact" className="inline-flex items-center justify-center rounded-full border-2 border-white/40 px-7 py-3.5 text-sm font-bold text-white bg-transparent hover:bg-white hover:text-gray-900 transition-all">
                Devis gratuit
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── STATS BAR sous le hero ─── */}
      <section className="py-5 bg-white border-b border-gray-100 shadow-sm">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 text-center">
            {[
              { value: siteConfig.experience, label: "ans d'expérience" },
              { value: siteConfig.interventions, label: "interventions" },
              { value: "-30 min", label: "délai moyen" },
              { value: `${siteConfig.reviews.rating}/5`, label: `${siteConfig.reviews.count} avis` },
            ].map((s, i) => (
              <div key={i}>
                <p className="text-xl md:text-2xl font-extrabold text-gray-900">{s.value}</p>
                <p className="text-[10px] md:text-xs text-gray-400 font-medium uppercase tracking-wider mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── INTRODUCTION (masqué si contenu zone-spécifique) ─── */}
      {!zoneServiceContent && (service.slug === "reparation" ? (
        <>
          {/* Section 1 : Image LEFT, Text RIGHT */}
          <section className="py-16 md:py-24 bg-gray-50">
            <div className="container">
              <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
                <div className="relative order-2 lg:order-1">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-xl">
                    <Image
                      src={svcImages.intro1}
                      alt={`Technicien réparation rideau métallique ${zone.name}`}
                      title={`Technicien réparation rideau métallique ${zone.name}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                  </div>
                </div>
                <div className="max-w-xl order-1 lg:order-2">
                  <div className="w-12 h-1 bg-primary-600 mb-6 rounded" />
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">{content.intro.title}</h2>
                  <div className="mt-6">
                    <p className="text-gray-500 text-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: content.intro.paragraphs[0] }} />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2 : Text LEFT, Image RIGHT */}
          <section className="py-16 md:py-24 bg-white">
            <div className="container">
              <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
                <div className="max-w-xl">
                  <div className="w-12 h-1 bg-primary-600 mb-6 rounded" />
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">Réparation complète de votre rideau à {zone.name}</h2>
                  <div className="mt-6">
                    <p className="text-gray-500 text-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: content.intro.paragraphs[1] }} />
                  </div>
                </div>
                <div className="relative">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-xl">
                    <Image
                      src={svcImages.intro2}
                      alt={`Réparation lames rideau métallique ${zone.name}`}
                      title={`Réparation lames rideau métallique ${zone.name}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      ) : (
        <>
          {/* Section 1 : Image LEFT, Text RIGHT */}
          <section className="py-16 md:py-24 bg-gray-50">
            <div className="container">
              <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
                <div className="relative order-2 lg:order-1">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-xl">
                    <Image
                      src={svcImages.intro1}
                      alt={`${service.name} rideau métallique ${zone.name}`}
                      title={`${service.name} rideau métallique ${zone.name}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                  </div>
                </div>
                <div className="max-w-xl order-1 lg:order-2">
                  <div className="w-12 h-1 bg-primary-600 mb-6 rounded" />
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">{content.intro.title}</h2>
                  <div className="mt-6 space-y-4">
                    {content.intro.paragraphs.slice(0, 1).map((p: string, i: number) => (
                      <p key={i} className="text-gray-500 text-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: p }} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2 : Text LEFT, Image RIGHT (only if more than 1 paragraph) */}
          {content.intro.paragraphs.length > 1 && (
            <section className="py-16 md:py-24 bg-white">
              <div className="container">
                <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
                  <div className="max-w-xl">
                    <div className="w-12 h-1 bg-primary-600 mb-6 rounded" />
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                      {service.name} sur-mesure à {zone.name}
                    </h2>
                    <div className="mt-6 space-y-4">
                      {content.intro.paragraphs.slice(1).map((p: string, i: number) => (
                        <p key={i} className="text-gray-500 text-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: p }} />
                      ))}
                    </div>
                  </div>
                  <div className="relative">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-xl">
                      <Image
                        src={svcImages.intro2}
                        alt={`${service.name} rideau métallique sur-mesure ${zone.name}`}
                        title={`${service.name} rideau métallique sur-mesure ${zone.name}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}
        </>
      ))}

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
              <p className="text-gray-500 text-lg mt-4 max-w-xl" dangerouslySetInnerHTML={{ __html: content.deblocage.description }} />
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-gray-200">
              {content.deblocage.steps.map((step: any, index: number) => (
                <div key={index} className="py-6 lg:py-0 lg:px-8 first:lg:pl-0 last:lg:pr-0">
                  <span className="font-bold text-5xl text-gray-200 block mb-3">{step.step}</span>
                  <h3 className="font-heading font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: step.description }} />
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
                      <p className="text-gray-400 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: panne.description }} />
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
                <p className="text-white/40 text-lg mb-10 leading-relaxed" dangerouslySetInnerHTML={{ __html: content.urgence.description }} />

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
              <p className="text-gray-500 text-lg mt-4 max-w-xl" dangerouslySetInnerHTML={{ __html: content.deblocage.description }} />
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-gray-200">
              {content.deblocage.steps.map((step: any, index: number) => (
                <div key={index} className="py-6 lg:py-0 lg:px-8 first:lg:pl-0 last:lg:pr-0">
                  <span className="font-bold text-5xl text-gray-200 block mb-3">{step.step}</span>
                  <h3 className="font-heading font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: step.description }} />
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
                      <p className="text-gray-400 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: panne.description }} />
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
                <p className="text-white/40 text-lg mb-10 leading-relaxed" dangerouslySetInnerHTML={{ __html: content.urgence.description }} />
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
                <div key={index} className="flex gap-4 md:gap-6 py-6 items-start">
                  <span className="font-bold text-2xl text-gray-200 flex-shrink-0 w-8">{String(index + 1).padStart(2, '0')}</span>
                  <div className="flex-1 min-w-0">
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
        <section className="relative py-16 md:py-24 bg-white overflow-hidden">
          <div className="container relative z-10">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center max-w-6xl mx-auto">
              {/* Image LEFT */}
              <div className="relative order-2 lg:order-1">
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-xl">
                  <Image
                    src={svcImages.zoneIntro}
                    alt={`${service.name} rideau metallique ${zone.name}`}
                    title={`${service.name} rideau metallique ${zone.name}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                </div>
              </div>
              {/* Text RIGHT */}
              <div className="order-1 lg:order-2">
                <div className="w-12 h-1 bg-primary-600 mb-6 rounded" />
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight mb-6">
                  {service.name} rideau metallique à {zone.name}
                </h2>
                <div
                  className="text-gray-500 text-lg leading-relaxed prose prose-lg max-w-none prose-a:text-primary-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 [&_p]:mb-4"
                  dangerouslySetInnerHTML={{ __html: zoneServiceContent.zoneIntro }}
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ─── ZONE FEATURES ALTERNEES UNIQUES ─── */}
      {zoneServiceContent?.zoneFeatures && zoneServiceContent.zoneFeatures.length > 0 && (
        <>
          {zoneServiceContent.zoneFeatures.map((feature, index) => {
            // Start with image RIGHT to alternate with zoneIntro (image LEFT)
            const isImageLeft = index % 2 === 1;
            const featureImage = feature.image || svcImages.zoneFeatures[index % svcImages.zoneFeatures.length];
            const featureAlt = feature.imageAlt || `${service.name} rideau métallique ${zone.name}`;

            return (
              <section
                key={index}
                className={`relative py-16 md:py-24 overflow-hidden ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
              >
                <div className="container relative z-10">
                  <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
                    {/* Image */}
                    <div className={`relative ${isImageLeft ? "order-2 lg:order-1" : "order-2"}`}>
                      <div className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-xl">
                        <Image
                          src={featureImage}
                          alt={featureAlt}
                          title={featureAlt}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          />
                      </div>
                    </div>

                    {/* Text */}
                    <div className={`max-w-xl ${isImageLeft ? "order-1 lg:order-2" : "order-1"}`}>
                      <span className="text-xs font-bold uppercase tracking-widest text-primary-600 mb-3 block">
                        {String(index + 1).padStart(2, '0')} — {service.name}
                      </span>
                      <h2
                        className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight"
                        dangerouslySetInnerHTML={{ __html: feature.title }}
                      />
                      <div className="w-12 h-1 bg-primary-600 mt-4 mb-6 rounded" />
                      <div
                        className="text-gray-500 text-lg leading-relaxed prose prose-lg max-w-none prose-a:text-primary-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 [&_p]:mb-4"
                        dangerouslySetInnerHTML={{ __html: feature.content }}
                      />
                    </div>
                  </div>
                </div>
              </section>
            );
          })}
        </>
      )}

      {/* ─── CAS D'INTERVENTIONS RÉCENTES ─── */}
      {zoneServiceContent?.recentCases && zoneServiceContent.recentCases.length > 0 && (
        <section className="relative py-20 md:py-28 bg-gray-900 overflow-hidden">
          <div className="container relative z-10">
            <div className="max-w-xl mb-14">
              <span className="section-label text-primary-400 block mb-3">Cas recents</span>
              <h2 className="font-extrabold text-3xl md:text-4xl text-white leading-[1.1] tracking-tight">
                Interventions récentes à {zone.name}
              </h2>
              <div className="divider-industrial mt-4" />
              <p className="text-white/40 mt-4">
                Découvrez nos dernières interventions de {service.name.toLowerCase()} à {zone.name} et dans les environs.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {zoneServiceContent.recentCases.map((cas: ZoneServiceRecentCase, index: number) => (
                <div key={index} className="bg-white/[0.03] border-l-4 border-l-primary-500 border border-white/[0.06] p-8 hover:-translate-y-1 transition-all duration-300">
                  <span className="text-xs font-bold uppercase tracking-widest text-primary-400">{cas.date}</span>
                  <h3 className="font-bold text-white mt-2 mb-4">{cas.lieu}</h3>
                  <div className="space-y-3 text-sm">
                    <p className="text-white/50"><span className="text-white/30 font-bold">Probleme :</span> {cas.probleme}</p>
                    <p className="text-white/50"><span className="text-white/30 font-bold">Solution :</span> {cas.solution}</p>
                    <p className="text-white/50"><span className="text-white/30 font-bold">Duree :</span> {cas.duree}</p>
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
          <div className="container relative z-10">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white border-l-4 border-l-primary-500 border border-gray-200 p-8 md:p-12">
                <span className="section-label block mb-3">Tarifs</span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight tracking-tight">Tarifs {service.name.toLowerCase()} à {zone.name}</h2>
                <div className="divider-industrial mt-4 mb-6" />
                <div
                  className="text-gray-500 text-lg leading-relaxed prose prose-strong:text-gray-900"
                  dangerouslySetInnerHTML={{ __html: zoneServiceContent.tarifContext }}
                />
                <div className="mt-8">
                  <a href={siteConfig.phoneLink} className="btn-phone">
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

      {/* ─── FAQ LOCALE ─── */}
      {zoneFaq.length > 0 && (
        <FAQ
          items={zoneFaq}
          title={`Questions fréquentes - ${service.name} à ${zone.name}`}
          subtitle={`Retrouvez les réponses aux questions les plus fréquentes sur le service de ${service.name.toLowerCase()} à ${zone.name} (${zone.postalCode}).`}
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
        <div className="container relative z-10">
          <div className="max-w-xl mb-12">
            <span className="section-label block mb-3">Nos services</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
              Nos autres services à {zone.name}
            </h2>
            <div className="divider-industrial mt-4" />
            <p className="text-gray-500 text-lg mt-4 max-w-xl">
              {siteConfig.name} propose une gamme complète de services pour rideaux métalliques à {zone.name}.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-4xl">
            {otherServices.map((s) => (
              <Link
                key={s.id}
                href={`/${s.slug}-rideau-metallique-${zone.slug}`}
                className="group flex items-center justify-between p-5 bg-white border-l-4 border-l-primary-500 border border-gray-200 hover:border-l-primary-700 hover:-translate-y-1 transition-all duration-300"
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
            <span className="section-label block mb-3">Zones voisines</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
              {service.name} dans les zones voisines
            </h2>
            <div className="divider-industrial mt-4" />
            <p className="text-gray-500 text-lg mt-4 max-w-xl">
              {siteConfig.name} intervient pour {service.name.toLowerCase()} dans tout le {siteConfig.department}.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {neighborZones.map((z) => (
              <Link
                key={z.slug}
                href={`/${service.slug}-rideau-metallique-${z.slug}`}
                className="px-4 py-2.5 bg-white text-gray-600 text-sm border border-gray-200 hover:border-primary-300 hover:text-primary-700 hover:-translate-y-1 transition-all duration-300"
              >
                {service.name} {z.name}
              </Link>
            ))}
            <Link
              href="/"
              className="px-4 py-2.5 bg-gray-900 text-white text-sm font-bold hover:bg-gray-800 transition-colors"
            >
              Toutes les zones
            </Link>
          </div>
        </div>
      </section>

      {/* ─── CTA FINAL ─── */}
      <CTA
        title={content.cta.title}
        subtitle={content.cta.subtitle}
      />
    </main>
  );
}
