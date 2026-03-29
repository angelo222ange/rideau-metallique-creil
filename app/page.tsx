import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { siteConfig, services, zones } from "@/config/site";
import { FAQ } from "@/components/sections/FAQ";
import { CTA } from "@/components/sections/CTA";
import { Reviews } from "@/components/sections/Reviews";
import { AlternatingFeatures } from "@/components/sections/AlternatingFeatures";
import { getPageContent } from "@/lib/content";
import faqData from "@/content/faq.json";
import homeContent from "@/content/pages/home.json";

const content = getPageContent(homeContent);

export const metadata: Metadata = {
  title: `Depannage Rideau Metallique ${siteConfig.city} | 24h/24 7j/7 | ${siteConfig.phone}`,
  description: `Depannage rideau metallique a ${siteConfig.city} (${siteConfig.postalCode}). Intervention en -30 min, 24h/24. Deblocage, reparation, motorisation. ${siteConfig.phone}`,
  alternates: { canonical: `${siteConfig.url}/` },
};

export default function HomePage() {
  const faq = getPageContent(faqData);

  // Zones groupees par distance — cast pour acceder a .distance
  type ZoneWithDistance = { name: string; slug: string; postalCode: string; distance: string };
  const zonesWithDistance = zones.filter((z): z is typeof z & { distance: string } => 'distance' in z) as unknown as ZoneWithDistance[];
  const zonesLimitrophes = zonesWithDistance.filter(z => parseInt(z.distance) <= 6);
  const zonesProches = zonesWithDistance.filter(z => parseInt(z.distance) > 6 && parseInt(z.distance) <= 15);
  const zonesEtendues = zonesWithDistance.filter(z => parseInt(z.distance) > 15);

  // Services pour la grille (7 max, images differentes)
  const displayServices = services.filter(s => s.hasPage);

  // Couleurs d'urgence par type de panne
  const urgencyColors: Record<string, string> = {
    urgent: "border-l-red-500",
    moyen: "border-l-amber-500",
    faible: "border-l-blue-400",
  };

  // Icones SVG par type de panne
  const panneIcons: Record<string, JSX.Element> = {
    "Panne moteur electrique": (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    "Lames abimees ou tordues": (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    "Axe d'enroulement casse": (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
    "Attache tablier defaillante": (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
      </svg>
    ),
    "Butees de fin de course HS": (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    "Probleme telecommande/recepteur": (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.858 15.355-5.858 21.213 0" />
      </svg>
    ),
  };

  // Images de fond pour chaque service (toutes differentes)
  const serviceBackgrounds: Record<string, string> = {
    depannage: "/images/gallery/depannage-rideau-metallique-DRM-reparation.webp",
    installation: "/images/gallery/installation-rideau-metallique-drm.webp",
    fabrication: "/images/gallery/realisation-rideau-metallique-lame-pleine-commerce.webp",
    entretien: "/images/gallery/entretien-rideau-metallique-rideau-de-fer.webp",
    motorisation: "/images/gallery/moteur-tubulaire-rideau-metallique-drm.webp",
    deblocage: "/images/gallery/realisation-drm-rideau-metallique-lame-pleine.webp",
    reparation: "/images/gallery/rideau-metallique-lame-cobra-realisation.webp",
  };

  // Icones SVG par service
  const serviceIcons: Record<string, JSX.Element> = {
    depannage: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
      </svg>
    ),
    installation: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    fabrication: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    entretien: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    motorisation: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    deblocage: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
      </svg>
    ),
    reparation: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.121 14.121L19 19m-7-7l7-7m-2.5 2.5L12 3m0 0L8.5 6.5M12 3v6m-7 7l7-7m-2.5 2.5L4 12m0 0l3.5 3.5M4 12h6" />
      </svg>
    ),
  };

  return (
    <main>
      {/* ═══════════════════════════════════════════════════════════════════════
          1. HERO — Full-screen, image fond, items-end, produit detoure a droite
          ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative h-screen max-h-screen flex items-end overflow-hidden bg-gray-900">
        {/* Image de fond */}
        <div className="absolute inset-0">
          <Image
            src="/images/gallery/hero-bg-technicien-drm.webp"
            alt={`Technicien depannage rideau metallique ${siteConfig.city}`}
            title={`Technicien depannage rideau metallique ${siteConfig.city}`}
            fill
            className="object-cover"
            priority
            quality={75}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-gray-900/30" />
        </div>

        <div className="container relative z-10 pb-8 pt-24 md:pb-12 md:pt-32">
          <div className="grid lg:grid-cols-2 gap-8 items-end">
            <div className="max-w-3xl">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 border border-white/20 px-4 py-2 mb-4">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/80">
                  {content.hero.badge}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 leading-[1.02]">
                {content.hero.title}
              </h1>

              <div className="divider-industrial-lg mb-4" />

              <p className="text-base md:text-lg text-white/70 mb-6 max-w-xl leading-relaxed">
                {content.hero.subtitle}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4 mb-6">
                <a href={siteConfig.phoneLink} className="btn-phone text-base md:text-lg">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {siteConfig.phone}
                </a>
                <Link href="/contact" className="inline-flex items-center justify-center border-2 border-white/30 text-white px-6 py-3 font-bold uppercase tracking-wide hover:bg-white hover:text-gray-900 transition-all">
                  Devis gratuit
                </Link>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-4 border-t border-white/10 pt-4">
                {content.trustBadges.map((badge: { icon: string; title: string; subtitle: string }, index: number) => (
                  <div key={index} className="flex items-center gap-2.5">
                    <span className="text-2xl">{badge.icon}</span>
                    <div>
                      <p className="font-bold text-white text-xs">{badge.title}</p>
                      <p className="text-[10px] text-white/50 uppercase tracking-wider">{badge.subtitle}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Image rideau metallique detoure a droite */}
            <div className="hidden lg:flex items-end justify-end h-full max-h-[calc(100vh-8rem)]">
              <div className="relative w-full max-w-xs">
                <Image
                  src="/images/gallery/hero-rideau-lame-pleine.webp"
                  alt={`Rideau metallique lames pleines ${siteConfig.city}`}
                  title={`Rideau metallique lames pleines ${siteConfig.city}`}
                  width={350}
                  height={500}
                  className="object-contain w-full h-auto max-h-[calc(100vh-12rem)]"
                  priority
                  quality={75}
                  sizes="(max-width: 1024px) 0vw, 350px"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bande laterale decorative verte */}
        <div className="hidden lg:block absolute top-0 right-0 w-1.5 h-full bg-primary-600" />
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          2. STATS — Chiffres industriels
          ═══════════════════════════════════════════════════════════════════════ */}
      <section className="bg-white border-b-4 border-primary-600">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-200">
            {[
              { number: siteConfig.experience, label: "Ans d'experience" },
              { number: siteConfig.interventions, label: "Interventions" },
              { number: "<30", label: "Minutes d'arrivee" },
              { number: `${siteConfig.reviews.rating}/5`, label: `${siteConfig.reviews.count} avis Google` },
            ].map((stat, index) => (
              <div key={index} className="py-8 md:py-10 text-center px-4">
                <p className="stat-number text-gray-900">{stat.number}</p>
                <p className="stat-label">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          3. SERVICES — Grille avec images de fond visibles
          ═══════════════════════════════════════════════════════════════════════ */}
      <section className="section bg-secondary-sable bg-crosshatch">
        <div className="container">
          <div className="mb-12">
            <p className="section-label">Nos Services</p>
            <h2 className="section-title">Services Rideau Metallique {siteConfig.city}</h2>
            <div className="divider-industrial mt-4 mb-4" />
            <p className="section-subtitle">
              {siteConfig.name} intervient pour tous vos besoins en rideau metallique a {siteConfig.city} et dans l&apos;{siteConfig.department}.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-0">
            {displayServices.map((service, index) => {
              const backgroundImage = serviceBackgrounds[service.slug] || "";
              const icon = serviceIcons[service.slug];

              return (
                <Link
                  key={service.id}
                  href={`/${service.slug}`}
                  className="group border border-gray-200 bg-white p-8 hover:bg-gray-900 transition-all duration-300 relative overflow-hidden min-h-[280px]"
                >
                  {/* Image de fond toujours visible */}
                  {backgroundImage && (
                    <>
                      <div className="absolute inset-0">
                        <Image
                          src={backgroundImage}
                          alt={service.name}
                          title={service.name}
                          fill
                          className="object-cover"
                          quality={70}
                          loading="lazy"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/85 to-gray-900/50 group-hover:from-gray-900 group-hover:via-gray-900/90 group-hover:to-gray-900/60 transition-all duration-300" />
                    </>
                  )}

                  {/* Numero en grand semi-transparent */}
                  <span className="absolute top-4 right-4 text-6xl font-black text-white/10 group-hover:text-white/20 transition-colors leading-none">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <div className="relative z-10">
                    <div className="w-12 h-12 bg-primary-600 flex items-center justify-center text-white mb-5 group-hover:bg-secondary-terracotta transition-colors">
                      {icon}
                    </div>
                    <h3 className="font-bold text-xl mb-2 text-white transition-colors">
                      {service.name}
                    </h3>
                    <p className="text-white/80 text-sm group-hover:text-white/90 transition-colors mb-4">{service.shortDesc}</p>
                    <span className="text-sm font-bold uppercase tracking-wider text-secondary-ocre group-hover:text-secondary-terracotta transition-colors inline-flex items-center gap-1">
                      En savoir plus
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          4. SECTIONS SEO — AlternatingFeatures
          ═══════════════════════════════════════════════════════════════════════ */}
      {content.alternatingFeatures && (
        <AlternatingFeatures features={content.alternatingFeatures} />
      )}

      {/* ═══════════════════════════════════════════════════════════════════════
          5. PANNES — Cards avec border-l-4 coloree selon urgence
          ═══════════════════════════════════════════════════════════════════════ */}
      <section className="section bg-secondary-sable bg-dots-pattern">
        <div className="container">
          <div className="mb-12">
            <p className="section-label">Diagnostic</p>
            <h2 className="section-title">{content.pannes.title}</h2>
            <div className="divider-industrial mt-4 mb-4" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {content.pannes.items.map((panne: { icon: string; title: string; description: string; urgency: string }, index: number) => {
              const borderColor = urgencyColors[panne.urgency] || "border-l-gray-300";
              // Normalize title for icon lookup
              const normalizedTitle = panne.title
                .normalize("NFD").replace(/[\u0300-\u036f]/g, "");
              const icon = panneIcons[normalizedTitle];

              return (
                <div
                  key={index}
                  className={`bg-white border border-gray-200 border-l-4 ${borderColor} p-6 flex items-start gap-4 hover:shadow-md transition-shadow`}
                >
                  <div className="w-12 h-12 bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-700 flex-shrink-0">
                    {icon || <span className="text-xl">{panne.icon}</span>}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">{panne.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{panne.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          6. URGENCE — Fond BLANC, image technicien a droite, CTA rouge
          ═══════════════════════════════════════════════════════════════════════ */}
      <section className="section bg-white relative overflow-hidden">
        {/* Pattern diagonal subtil */}
        <div className="absolute inset-0 bg-diagonal-lines opacity-50" />

        <div className="container relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Contenu gauche */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 border border-red-200 bg-red-50 px-4 py-2 mb-6">
                <span className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-red-600">Urgence 24h/24</span>
              </div>

              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 leading-tight">
                {content.urgence.title}
              </h2>
              <div className="divider-industrial mt-2 mb-6" />
              <p className="text-gray-500 mb-8 max-w-lg leading-relaxed">
                {content.urgence.description}
              </p>

              {/* Stats urgence */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                {content.urgence.stats.map((stat: { value: string; label: string }, index: number) => (
                  <div key={index} className="border border-gray-200 p-4 text-center bg-gray-50">
                    <p className="text-2xl md:text-3xl font-black text-primary-600 leading-none mb-1">{stat.value}</p>
                    <p className="stat-label">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* CTA rouge */}
              <a
                href={siteConfig.phoneLink}
                className="inline-flex items-center gap-3 bg-red-600 text-white px-8 py-4 font-black text-xl uppercase tracking-wider hover:bg-red-700 transition-colors mb-8"
                style={{ boxShadow: '4px 4px 0 rgba(0,0,0,0.15)' }}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {siteConfig.phone}
              </a>

              {/* Cas frequents */}
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-3">Cas frequents d&apos;urgence</p>
                <ul className="space-y-2">
                  {content.urgence.cases.map((cas: string, index: number) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                      <svg className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                      {cas}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Image technicien a droite */}
            <div className="lg:col-span-5 hidden lg:block">
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src="/images/gallery/depannage-rideau-metallique-creil.webp"
                  alt={`Technicien urgence rideau metallique ${siteConfig.city}`}
                  title={`Technicien urgence rideau metallique ${siteConfig.city}`}
                  fill
                  className="object-cover"
                  quality={75}
                  loading="lazy"
                  sizes="(max-width: 1024px) 0vw, 42vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          7. POURQUOI NOUS — Image + divider-industrial + checklist
          ═══════════════════════════════════════════════════════════════════════ */}
      <section className="section bg-gray-50">
        <div className="container">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            {/* Image */}
            <div className="lg:col-span-5 relative order-2 lg:order-1">
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src="/images/gallery/rideau-metallique-creil.webp"
                  alt={`Technicien rideau metallique ${siteConfig.city}`}
                  title={`Technicien rideau metallique ${siteConfig.city}`}
                  fill
                  className="object-cover"
                  quality={75}
                  loading="lazy"
                  sizes="(max-width: 1024px) 100vw, 42vw"
                />
              </div>
              {/* Stats overlay */}
              <div className="absolute -bottom-6 -right-4 md:-right-6 bg-gray-900 text-white p-6" style={{ boxShadow: '4px 4px 0 rgba(0,0,0,0.15)' }}>
                <p className="stat-number text-primary-400 text-4xl md:text-5xl">{content.stats.experience}</p>
                <p className="stat-label text-white/60">{content.stats.experienceLabel}</p>
              </div>
            </div>

            {/* Contenu */}
            <div className="lg:col-span-7 order-1 lg:order-2">
              <p className="section-label">Nos engagements</p>
              <h2 className="section-title">{content.whyUs.title}</h2>
              <div className="divider-industrial mt-4 mb-6" />
              <p className="section-subtitle mb-10">{content.whyUs.subtitle}</p>

              <div className="space-y-0">
                {content.whyUs.advantages.map((advantage: { icon: string; title: string; description: string }, index: number) => {
                  // Icones variees pour chaque avantage
                  const advantageIcons = [
                    <svg key="speed" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
                    <svg key="map" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
                    <svg key="doc" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
                    <svg key="shield" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
                  ];

                  return (
                    <div key={index} className="flex items-start gap-5 p-5 border-b border-gray-200 last:border-b-0 hover:bg-white transition-colors">
                      <div className="w-11 h-11 bg-primary-600 flex items-center justify-center text-white flex-shrink-0">
                        {advantageIcons[index % advantageIcons.length]}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 mb-1">{advantage.title}</h3>
                        <p className="text-gray-500 text-sm leading-relaxed">{advantage.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 pt-8 border-t border-gray-200">
                <a href={siteConfig.phoneLink} className="btn-primary inline-flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {siteConfig.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          8. ZONES — Groupees par distance avec dividers
          ═══════════════════════════════════════════════════════════════════════ */}
      <section className="section bg-secondary-sable bg-dots-pattern">
        <div className="container">
          <div className="mb-12">
            <p className="section-label">Zones</p>
            <h2 className="section-title">Zones d&apos;intervention a {siteConfig.city}</h2>
            <div className="divider-industrial mt-4 mb-4" />
            <p className="section-subtitle">
              Intervention rapide a {siteConfig.city} et dans toute l&apos;agglomeration de l&apos;{siteConfig.department}.
            </p>
          </div>

          {/* Communes limitrophes */}
          <div className="mb-10">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-900 mb-4 flex items-center gap-3">
              <span className="w-3 h-0.5 bg-primary-600" />
              Communes limitrophes (&lt; 6 km)
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {zonesLimitrophes.map((zone) => (
                <Link
                  key={zone.slug}
                  href={`/depannage-rideau-metallique-${zone.slug}`}
                  className="flex items-center gap-3 p-3 bg-white border border-gray-200 hover:border-primary-600 hover:bg-primary-50 transition-all group"
                >
                  <svg className="w-4 h-4 text-primary-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <span className="font-bold text-sm text-gray-900 block leading-tight">{zone.name}</span>
                    <span className="text-[10px] text-gray-400">{zone.postalCode} - {zone.distance}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-10">
            <div className="flex-1 h-px bg-gray-300" />
            <div className="w-2 h-2 bg-primary-300 rotate-45" />
            <div className="flex-1 h-px bg-gray-300" />
          </div>

          {/* Communes proches */}
          <div className="mb-10">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-900 mb-4 flex items-center gap-3">
              <span className="w-3 h-0.5 bg-secondary-terracotta" />
              Communes proches (5-15 km)
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
              {zonesProches.map((zone) => (
                <Link
                  key={zone.slug}
                  href={`/depannage-rideau-metallique-${zone.slug}`}
                  className="flex items-center gap-2 p-2.5 bg-white/80 border border-gray-200 hover:border-gray-900 hover:bg-white transition-all text-sm"
                >
                  <svg className="w-3 h-3 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="font-medium text-gray-900">{zone.name}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-10">
            <div className="flex-1 h-px bg-gray-300" />
            <div className="w-2 h-2 bg-gray-300 rotate-45" />
            <div className="flex-1 h-px bg-gray-300" />
          </div>

          {/* Zone etendue */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-900 mb-4 flex items-center gap-3">
              <span className="w-3 h-0.5 bg-gray-400" />
              Zone etendue (15-45 km)
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
              {zonesEtendues.map((zone) => (
                <Link
                  key={zone.slug}
                  href={`/depannage-rideau-metallique-${zone.slug}`}
                  className="flex items-center gap-2 p-2 bg-white/60 border border-gray-200 hover:border-gray-400 transition-all text-sm"
                >
                  <svg className="w-3 h-3 text-gray-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="font-medium text-gray-500">{zone.name}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-10">
            <Link href="/zones" className="btn-secondary">
              Voir toutes les zones ({zones.length})
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          9. FAQ
          ═══════════════════════════════════════════════════════════════════════ */}
      <FAQ items={faq.slice(0, 6)} title={`Questions Frequentes - Rideau Metallique ${siteConfig.city}`} />

      {/* ═══════════════════════════════════════════════════════════════════════
          10. REVIEWS — Carousel Google format
          ═══════════════════════════════════════════════════════════════════════ */}
      <Reviews
        title={`Avis Clients ${siteConfig.city}`}
        subtitle={`Ce que disent nos clients a ${siteConfig.city} et dans l'${siteConfig.department}`}
        items={content.reviews}
      />

      {/* ═══════════════════════════════════════════════════════════════════════
          11. CTA FINAL
          ═══════════════════════════════════════════════════════════════════════ */}
      <CTA
        title={`Besoin d'un depannage rideau metallique a ${siteConfig.city} ?`}
        subtitle={`Notre equipe intervient 24h/24, 7j/7. Appelez le ${siteConfig.phone} pour un devis gratuit.`}
      />
    </main>
  );
}
