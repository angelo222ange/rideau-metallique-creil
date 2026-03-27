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
function parseServiceZone(serviceZone: string): { service: string; zone: string } | null {
  const match = serviceZone.match(/^(.+)-rideau-metallique-(.+)$/);

  if (!match) {
    return null;
  }

  const [, serviceSlug, zoneSlug] = match;

  const service = getServiceBySlug(serviceSlug);
  const zone = getZoneBySlug(zoneSlug);

  if (!service || !zone) {
    return null;
  }

  return { service: serviceSlug, zone: zoneSlug };
}

// ═══════════════════════════════════════════════════════════════════════════
// GÉNÉRATION STATIQUE - 7 services × 32 zones = 223 pages
// ═══════════════════════════════════════════════════════════════════════════
export function generateStaticParams() {
  const params: { service_zone: string }[] = [];

  for (const service of services) {
    if (!service.hasPage) continue;
    for (const zone of zones) {
      // La homepage couvre déjà "dépannage creil" → skip la zone principale pour dépannage
      if (service.slug === "depannage" && 'isMain' in zone) continue;
      params.push({
        service_zone: `${service.slug}-rideau-metallique-${zone.slug}`,
      });
    }
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

  const service = getServiceBySlug(parsed.service);
  const zone = getZoneBySlug(parsed.zone);

  if (!service || !zone) {
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

  const service = getServiceBySlug(parsed.service);
  const zone = getZoneBySlug(parsed.zone);

  if (!service || !zone) {
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

  // Sélection anti-duplicate: 5 reviews et 5 FAQ différentes selon la zone
  const zoneReviews: ReviewItem[] = content.reviews
    ? getZoneContent(content.reviews as ReviewItem[], zone.slug, 5)
    : [];
  const zoneFaq: FAQItem[] = content.faq
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

      {/* ─── HERO ─── */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-dark overflow-hidden">
        <div className="noise absolute inset-0" />
        <div className="container relative z-10">
          {/* Breadcrumb */}
          <nav className="mb-8" aria-label="Fil d'Ariane">
            <ol className="flex items-center gap-2 text-xs text-white/30 flex-wrap">
              <li><Link href="/" className="hover:text-white/60 transition-colors">Accueil</Link></li>
              <li>/</li>
              <li className="text-white/70 font-bold">{service.name} {zone.name}</li>
            </ol>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="rule-accent mb-8" style={{ background: '#E07B39' }} />

              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-white leading-[1.1] mb-5">
                {content.hero.title}
              </h1>

              <p className="text-white/40 text-lg mb-8 leading-relaxed">
                {content.hero.subtitle}
              </p>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-6 mb-10 text-xs font-bold uppercase tracking-widest text-white/25">
                <span>{siteConfig.reviews.rating}/5 — {siteConfig.reviews.count} avis</span>
                <span>Intervention rapide</span>
                <span>Garanti</span>
              </div>

              <div className="flex flex-wrap gap-3">
                <a href={siteConfig.phoneLink} className="btn-phone">
                  {siteConfig.phone}
                </a>
                <Link href="/contact" className="btn-secondary border-white/15 text-white/60 hover:text-white hover:border-white/40">
                  Devis gratuit
                </Link>
              </div>
            </div>

            {/* Image du service */}
            <div className="relative hidden lg:block">
              <div className="relative aspect-[4/3] overflow-hidden" style={{ borderRadius: '2px' }}>
                <Image
                  src={service.image}
                  alt={`${service.name} rideau métallique ${zone.name}`}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── INTRODUCTION ─── */}
      {service.slug === "reparation" ? (
        <>
          {/* Section 1 : Image gauche, texte droite */}
          <section className="section bg-secondary-sable">
            <div className="container">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="relative hidden lg:block">
                  <Image
                    src="/images/gallery/installation-rideau-metallique-paris-1-drm-paris.webp"
                    alt={`Technicien réparation rideau métallique ${zone.name}`}
                    width={800}
                    height={600}
                    className="w-full h-auto"
                    style={{ borderRadius: '2px' }}
                  />
                </div>
                <div className="max-w-xl">
                  <div className="rule-accent mb-6" />
                  <h2 className="section-title">{content.intro.title}</h2>
                  <div className="mt-6">
                    <p className="text-gray-500 text-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: content.intro.paragraphs[0] }} />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2 : Texte gauche, image droite */}
          <section className="section bg-white">
            <div className="container">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="max-w-xl">
                  <div className="rule-accent mb-6" />
                  <h2 className="section-title">Réparation complète de votre rideau à {zone.name}</h2>
                  <div className="mt-6">
                    <p className="text-gray-500 text-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: content.intro.paragraphs[1] }} />
                  </div>
                </div>
                <div className="relative hidden lg:block">
                  <Image
                    src="/images/gallery/depannage-rideau-metallique-creil.webp"
                    alt={`Réparation lames rideau métallique ${zone.name}`}
                    width={800}
                    height={600}
                    className="w-full h-auto"
                    style={{ borderRadius: '2px' }}
                  />
                </div>
              </div>
            </div>
          </section>
        </>
      ) : service.slug === "fabrication" ? (
        <section className="section bg-secondary-sable">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="relative hidden lg:block">
                <div className="relative aspect-[4/3] overflow-hidden" style={{ borderRadius: '2px' }}>
                  <Image
                    src="/images/gallery/Drapeau-rideau-metallique-motorisation-centrale-3D.webp"
                    alt={`Fabrication rideau métallique sur-mesure ${zone.name}`}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="max-w-xl">
                <div className="rule-accent mb-6" />
                <h2 className="section-title">{content.intro.title}</h2>
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
        <section className="section bg-secondary-sable">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="max-w-xl">
                <div className="rule-accent mb-6" />
                <h2 className="section-title">{content.intro.title}</h2>
                <div className="mt-6 space-y-4">
                  {content.intro.paragraphs.map((p: string, i: number) => (
                    <p key={i} className="text-gray-500 text-lg leading-relaxed">{p}</p>
                  ))}
                </div>
              </div>
              <div className="relative hidden lg:block">
                <div className="relative aspect-[4/3] overflow-hidden" style={{ borderRadius: '2px' }}>
                  <Image
                    src="/images/gallery/rideau-metallique-lame-pleine-france.webp"
                    alt={`Rideau métallique ${zone.name}`}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ─── SITUATIONS / TYPES D'INTERVENTION ─── */}
      {/* Masqué pour les services qui ont une section dédiée plus complète (typesRideaux, typesReparation, pannes, etc.) */}
      {!["installation", "reparation", "depannage", "deblocage", "motorisation"].includes(service.slug) && (
        <section className="section bg-white">
          <div className="container">
            <div className="max-w-xl mb-14">
              <div className="rule-accent mb-6" />
              <h2 className="section-title">{content.situations.title}</h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200">
              {content.situations.items.map((item: any, index: number) => (
                <div key={index} className="bg-white p-6">
                  <span className="font-display text-3xl text-gray-200 block mb-3">
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

      {/* ── DEPANNAGE : Étapes de déblocage ── */}
      {service.slug === "depannage" && content.deblocage && (
        <section className="section bg-secondary-sable">
          <div className="container">
            <div className="max-w-xl mb-14">
              <div className="rule-accent mb-6" />
              <h2 className="section-title">{content.deblocage.title}</h2>
              <p className="section-subtitle">{content.deblocage.description}</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-gray-200">
              {content.deblocage.steps.map((step: any, index: number) => (
                <div key={index} className="py-6 lg:py-0 lg:px-8 first:lg:pl-0 last:lg:pr-0">
                  <span className="font-display text-5xl text-gray-200 block mb-3">{step.step}</span>
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

      {/* ── DEPANNAGE : Pannes courantes ── */}
      {service.slug === "depannage" && content.pannes && (
        <section className="section bg-white">
          <div className="container">
            <div className="max-w-xl mb-14">
              <div className="rule-accent mb-6" />
              <h2 className="section-title">{content.pannes.title}</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-200">
              {content.pannes.items.map((panne: any, index: number) => (
                <div key={index} className="bg-white p-8">
                  <div className="flex items-start gap-4">
                    <span className="font-display text-3xl text-gray-200 leading-none">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-heading font-bold text-gray-900">{panne.title}</h3>
                        {panne.urgency && (
                          <span className={`text-[10px] font-bold uppercase tracking-wider ${
                            panne.urgency === 'urgent' ? 'text-red-500'
                              : panne.urgency === 'moyen' ? 'text-secondary-terracotta'
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

      {/* ── DEPANNAGE : Urgence 24/7 ── */}
      {service.slug === "depannage" && content.urgence && (
        <section className="relative py-24 md:py-32 bg-dark overflow-hidden">
          <div className="noise absolute inset-0" />
          <div className="container relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-red-400 mb-6">
                  <span className="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse" />
                  Urgence 24h/24
                </span>
                <h2 className="font-display text-4xl md:text-5xl text-white leading-[1.1] mb-5">
                  {content.urgence.title}
                </h2>
                <p className="text-white/40 text-lg mb-10 leading-relaxed">{content.urgence.description}</p>

                <div className="flex gap-8 mb-10">
                  {content.urgence.stats.map((stat: any, index: number) => (
                    <div key={index}>
                      <p className="font-display text-3xl text-secondary-terracotta">{stat.value}</p>
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

      {/* ── DEBLOCAGE : Étapes de déblocage ── */}
      {service.slug === "deblocage" && content.deblocage && (
        <section className="section bg-secondary-sable">
          <div className="container">
            <div className="max-w-xl mb-14">
              <div className="rule-accent mb-6" />
              <h2 className="section-title">{content.deblocage.title}</h2>
              <p className="section-subtitle">{content.deblocage.description}</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-gray-200">
              {content.deblocage.steps.map((step: any, index: number) => (
                <div key={index} className="py-6 lg:py-0 lg:px-8 first:lg:pl-0 last:lg:pr-0">
                  <span className="font-display text-5xl text-gray-200 block mb-3">{step.step}</span>
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
      {service.slug === "deblocage" && content.pannes && (
        <section className="section bg-white">
          <div className="container">
            <div className="max-w-xl mb-14">
              <div className="rule-accent mb-6" />
              <h2 className="section-title">{content.pannes.title}</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-200">
              {content.pannes.items.map((panne: any, index: number) => (
                <div key={index} className="bg-white p-8">
                  <div className="flex items-start gap-4">
                    <span className="font-display text-3xl text-gray-200 leading-none">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-heading font-bold text-gray-900">{panne.title}</h3>
                        {panne.urgency && (
                          <span className={`text-[10px] font-bold uppercase tracking-wider ${
                            panne.urgency === 'urgent' ? 'text-red-500'
                              : panne.urgency === 'moyen' ? 'text-secondary-terracotta'
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
      {service.slug === "deblocage" && content.urgence && (
        <section className="relative py-24 md:py-32 bg-dark overflow-hidden">
          <div className="noise absolute inset-0" />
          <div className="container relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-red-400 mb-6">
                  <span className="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse" />
                  Urgence 24h/24
                </span>
                <h2 className="font-display text-4xl md:text-5xl text-white leading-[1.1] mb-5">
                  {content.urgence.title}
                </h2>
                <p className="text-white/40 text-lg mb-10 leading-relaxed">{content.urgence.description}</p>
                <div className="flex gap-8 mb-10">
                  {content.urgence.stats.map((stat: any, index: number) => (
                    <div key={index}>
                      <p className="font-display text-3xl text-secondary-terracotta">{stat.value}</p>
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
      {service.slug === "reparation" && content.typesReparation && (
        <section className="section bg-secondary-sable">
          <div className="container">
            <div className="max-w-xl mb-14">
              <div className="rule-accent mb-6" />
              <h2 className="section-title">{content.typesReparation.title}</h2>
              <p className="section-subtitle">
                Nous réparons tous les composants de votre rideau métallique à {zone.name} et dans le {siteConfig.department}.
              </p>
            </div>
            <div className="divide-y divide-gray-200">
              {content.typesReparation.items.map((type: any, index: number) => (
                <div key={index} className="grid grid-cols-12 gap-6 py-6 items-center">
                  <div className="col-span-1">
                    <span className="font-display text-2xl text-gray-200">{String(index + 1).padStart(2, '0')}</span>
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
      {service.slug === "reparation" && content.processus && (
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
      {service.slug === "installation" && content.typesRideaux && (
        <TypesRideaux
          zoneName={zone.name}
          items={content.typesRideaux}
          title={`Types de rideaux métalliques installés à ${zone.name}`}
        />
      )}

      {/* ── INSTALLATION : Processus d'installation ── */}
      {service.slug === "installation" && content.processus && (
        <ProcessusInstallation
          zoneName={zone.name}
          items={content.processus}
          title={`Processus d'installation à ${zone.name}`}
        />
      )}

      {/* ── FABRICATION : Sur-mesure ── */}
      {service.slug === "fabrication" && content.surMesure && (
        <SurMesureLocal
          title={content.surMesure.title}
          subtitle={content.surMesure.subtitle}
          comparatif={content.surMesure.comparatif}
          avantages={content.surMesure.avantages}
          zoneName={zone.name}
        />
      )}

      {/* ── FABRICATION : Normes et certifications ── */}
      {service.slug === "fabrication" && content.normes && (
        <NormesCertifications
          title={content.normes.title}
          subtitle={content.normes.subtitle}
          items={content.normes.items}
        />
      )}

      {/* ── ENTRETIEN : Signes d'usure ── */}
      {service.slug === "entretien" && content.signesUsure && (
        <SignesUsure
          title={content.signesUsure.title}
          subtitle={content.signesUsure.subtitle}
          items={content.signesUsure.items}
          zoneName={zone.name}
        />
      )}

      {/* ── ENTRETIEN : Contrats d'entretien ── */}
      {service.slug === "entretien" && content.contrats && (
        <ContratEntretien
          title={content.contrats.title}
          subtitle={content.contrats.subtitle}
          formules={content.contrats.formules}
          zoneName={zone.name}
        />
      )}

      {/* ── MOTORISATION : Avantages + comparatif ── */}
      {service.slug === "motorisation" && content.avantagesMotorisation && (
        <AvantagesMotorisation
          title={content.avantagesMotorisation.title}
          subtitle={content.avantagesMotorisation.subtitle}
          avantages={content.avantagesMotorisation.items}
          comparatif={content.comparatif}
          zoneName={zone.name}
        />
      )}

      {/* ── MOTORISATION : Marques de moteurs ── */}
      {service.slug === "motorisation" && content.marques && (
        <MarquesMoteurs
          title={content.marques.title}
          subtitle={content.marques.subtitle}
          items={content.marques.items}
        />
      )}

      {/* ═══════════════════════════════════════════════════════════════════
          SECTIONS COMMUNES À TOUS LES SERVICES
          ═══════════════════════════════════════════════════════════════════ */}

      {/* ─── POURQUOI NOUS CHOISIR ─── */}
      <WhyChooseUs
        title={content.advantages.title}
        items={content.advantages.items}
        zoneName={zone.name}
        zonePostal={zone.postalCode}
      />

      {/* ─── SECTIONS ALTERNÉES SEO ─── */}
      {content.alternatingFeatures && (
        <AlternatingFeatures features={content.alternatingFeatures} bgColor="bg-secondary-sable" />
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
      <section className="section bg-white">
        <div className="container">
          <div className="max-w-xl mb-10">
            <div className="rule-accent mb-6" />
            <h2 className="section-title">
              Nos autres services à {zone.name}
            </h2>
            <p className="section-subtitle">
              {siteConfig.name} propose une gamme complète de services pour rideaux métalliques à {zone.name}.
            </p>
          </div>
          <div className="divide-y divide-gray-200 max-w-3xl">
            {otherServices.map((s) => (
              <Link
                key={s.id}
                href={`/${s.slug}-rideau-metallique-${zone.slug}`}
                className="flex items-center justify-between py-5 group"
              >
                <div className="flex items-center gap-3">
                  <span className="font-heading font-bold text-gray-900 group-hover:text-primary-600 transition-colors">{s.name}</span>
                  <span className="text-xs text-gray-300">{zone.name}</span>
                </div>
                <svg className="w-4 h-4 text-gray-300 group-hover:text-secondary-terracotta group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── MAILLAGE : CE SERVICE DANS D'AUTRES ZONES ─── */}
      <section className="section bg-secondary-sable">
        <div className="container">
          <div className="max-w-xl mb-10">
            <div className="rule-accent mb-6" />
            <h2 className="section-title">
              {service.name} dans les zones voisines
            </h2>
            <p className="section-subtitle">
              {siteConfig.name} intervient pour {service.name.toLowerCase()} dans tout le {siteConfig.department}.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {neighborZones.map((z) => (
              <Link
                key={z.slug}
                href={`/${service.slug}-rideau-metallique-${z.slug}`}
                className="px-4 py-2 bg-white text-gray-600 text-sm border border-gray-200 hover:border-primary-300 hover:text-primary-700 transition-all"
                style={{ borderRadius: '2px' }}
              >
                {service.name} {z.name}
              </Link>
            ))}
            <Link
              href="/"
              className="px-4 py-2 bg-dark text-white text-sm font-bold hover:bg-gray-800 transition-colors"
              style={{ borderRadius: '2px' }}
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
