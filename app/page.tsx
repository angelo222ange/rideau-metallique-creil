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

  // Zones groupees par distance
  type ZoneWithDistance = { name: string; slug: string; postalCode: string; distance: string };
  const zonesWithDistance = zones.filter((z): z is typeof z & { distance: string } => 'distance' in z) as unknown as ZoneWithDistance[];
  const zonesLimitrophes = zonesWithDistance.filter(z => parseInt(z.distance) <= 6);
  const zonesProches = zonesWithDistance.filter(z => parseInt(z.distance) > 6 && parseInt(z.distance) <= 15);
  const zonesEtendues = zonesWithDistance.filter(z => parseInt(z.distance) > 15);

  // Services pour la grille
  const displayServices = services.filter(s => s.hasPage);

  // Couleurs d'urgence par type de panne
  const urgencyColors: Record<string, { bg: string; text: string; border: string }> = {
    urgent: { bg: "bg-red-50", text: "text-red-600", border: "border-red-200" },
    moyen: { bg: "bg-amber-50", text: "text-amber-600", border: "border-amber-200" },
    faible: { bg: "bg-blue-50", text: "text-blue-600", border: "border-blue-200" },
  };

  // Images de fond pour chaque service (toutes differentes)
  const serviceBackgrounds: Record<string, string> = {
    depannage: "/images/gallery/depannage-rideau-metallique-DRM-reparation.webp",
    installation: "/images/gallery/installation-rideau-metallique-drm.webp",
    fabrication: "/images/gallery/realisation-rideau-metallique-lame-pleine-commerce.webp",
    entretien: "/images/gallery/entretien-rideau-metallique-rideau-de-fer.webp",
    motorisation: "/images/gallery/moteur-tubulaire-rideau-metallique-drm.webp",
    deblocage: "/images/gallery/depannage-rideau-metallique-drm-france-rm.webp",
    reparation: "/images/gallery/realisation-drm-rideau-metallique-lame-pleine.webp",
  };

  return (
    <main>
      {/* ===================================================================
          1. HERO -- Image fond + overlay clair, texte gauche, produit droite
          =================================================================== */}
      <section className="relative py-12 sm:py-16 lg:py-20 overflow-hidden">
        {/* Image de fond avec overlay CLAIR */}
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
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/90 to-white/70 max-lg:bg-white/90 max-lg:bg-none" />
          <div className="absolute inset-0 bg-black/[0.05]" />
        </div>

        <div className="container relative z-10 pt-16 md:pt-20">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 items-center">
            {/* Texte */}
            <div className="order-2 lg:order-1">
              {/* Badge */}
              <div
                className="inline-flex items-center gap-2 bg-primary-50 border border-primary-200 text-primary-700 px-4 py-1.5 text-xs sm:text-sm font-semibold mb-4"
                style={{ borderRadius: '9999px' }}
              >
                <span className="w-2 h-2 bg-primary-500 rounded-full animate-pulse" />
                Disponible 24h/24 a {siteConfig.city}
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-gray-900 mb-4 leading-tight">
                Depannage Rideau
                <br />
                Metallique <span className="text-primary-600">{siteConfig.city}</span>
              </h1>

              <p className="text-sm sm:text-base lg:text-lg text-gray-600 mb-5 max-w-xl leading-relaxed">
                {content.hero.subtitle}
              </p>

              {/* CTAs */}
              <div className="flex flex-row flex-wrap gap-3 mb-6">
                <a
                  href={siteConfig.phoneLink}
                  className="group relative inline-flex items-center justify-center gap-2 px-5 py-3 sm:px-7 sm:py-3.5 font-bold text-sm sm:text-base text-white overflow-hidden transition-all duration-300 hover:-translate-y-0.5"
                  style={{
                    borderRadius: '14px',
                    background: 'linear-gradient(135deg, #1B7A4E 0%, #155E3B 100%)',
                    boxShadow: '0 8px 24px rgba(27,122,78,0.3)',
                  }}
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {siteConfig.phone}
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-1.5 px-5 py-3 sm:px-7 sm:py-3.5 font-semibold text-sm sm:text-base text-primary-700 overflow-hidden transition-all duration-300 hover:-translate-y-0.5"
                  style={{
                    borderRadius: '14px',
                    background: 'rgba(255,255,255,0.6)',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.8)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(27,122,78,0.2)',
                  }}
                >
                  Devis gratuit
                </Link>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-5 pt-4 border-t border-gray-200/60">
                {[
                  { title: "-30 min", subtitle: "Intervention rapide" },
                  { title: "Garanti", subtitle: "Pieces & main d'oeuvre" },
                  { title: "Devis gratuit", subtitle: "Sans engagement" },
                ].map((badge, index) => (
                  <div key={index} className="flex items-center gap-2.5">
                    <div className="w-8 h-8 bg-primary-50 flex items-center justify-center" style={{ borderRadius: '8px' }}>
                      <svg className="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-xs">{badge.title}</p>
                      <p className="text-[10px] text-gray-500">{badge.subtitle}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Image produit droite -- JAMAIS coupee */}
            <div className="hidden lg:flex order-1 lg:order-2 items-center justify-center">
              <div className="relative w-full max-w-sm">
                <Image
                  src="/images/gallery/hero-rideau-lame-pleine.webp"
                  alt={`Rideau metallique lames pleines ${siteConfig.city}`}
                  title={`Rideau metallique lames pleines ${siteConfig.city}`}
                  width={400}
                  height={500}
                  className="w-full h-auto"
                  style={{ objectFit: 'contain' }}
                  priority
                  quality={80}
                  sizes="(max-width: 1024px) 0vw, 400px"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          2. TRUST BAR -- Bande de reassurance avec stats
          =================================================================== */}
      <section className="bg-gradient-to-r from-primary-50 via-gray-50 to-primary-50 py-5 sm:py-6 border-y border-gray-200 overflow-hidden">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { number: siteConfig.experience, label: "Ans d'experience" },
              { number: siteConfig.interventions, label: "Interventions" },
              { number: "<30", label: "Minutes d'arrivee" },
              { number: `${siteConfig.reviews.rating}/5`, label: `${siteConfig.reviews.count} avis Google` },
            ].map((stat, index) => (
              <div key={index} className="text-center py-2">
                <p className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 leading-none" style={{ letterSpacing: '-0.04em' }}>
                  {stat.number}
                </p>
                <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-gray-400 mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================================
          3. SERVICES -- Grandes cards avec images differentes
          =================================================================== */}
      <section className="section bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <span className="section-label justify-center">
              <span className="w-2 h-2 bg-primary-500" style={{ borderRadius: '50%' }} />
              Nos Services
            </span>
            <h2 className="section-title">Services Rideau Metallique {siteConfig.city}</h2>
            <p className="section-subtitle mx-auto text-center mt-3">
              {siteConfig.name} intervient pour tous vos besoins en rideau metallique a {siteConfig.city} et dans l&apos;{siteConfig.department}.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {displayServices.map((service) => {
              const backgroundImage = serviceBackgrounds[service.slug] || "";

              return (
                <Link
                  key={service.id}
                  href={`/${service.slug}`}
                  className="group relative overflow-hidden min-h-[300px] transition-all duration-300 hover:-translate-y-1"
                  style={{
                    borderRadius: '16px',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                  }}
                >
                  {/* Image de fond */}
                  {backgroundImage && (
                    <>
                      <div className="absolute inset-0">
                        <Image
                          src={backgroundImage}
                          alt={service.name}
                          title={service.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          quality={70}
                          loading="lazy"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent group-hover:from-gray-900/95 transition-all duration-300" />
                    </>
                  )}

                  <div className="relative z-10 flex flex-col justify-end h-full p-6">
                    <h3 className="font-bold text-xl mb-2 text-white">
                      {service.name}
                    </h3>
                    <p className="text-white/80 text-sm group-hover:text-white/90 transition-colors mb-4 line-clamp-2">
                      {service.shortDesc}
                    </p>
                    <span
                      className="text-sm font-semibold text-primary-300 group-hover:text-primary-200 transition-colors inline-flex items-center gap-1"
                    >
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

      {/* ===================================================================
          4. SECTIONS SEO -- AlternatingFeatures
          =================================================================== */}
      {content.alternatingFeatures && (
        <AlternatingFeatures features={content.alternatingFeatures} />
      )}

      {/* ===================================================================
          5. COMMENT CA MARCHE -- Etapes avec cards soignees
          =================================================================== */}
      <section className="section bg-gradient-to-b from-white via-gray-50/50 to-white" id="comment-ca-marche">
        <div className="container">
          <div className="text-center mb-12">
            <span className="section-label justify-center">
              <span className="w-2 h-2 bg-primary-500" style={{ borderRadius: '50%' }} />
              Processus simplifie
            </span>
            <h2 className="section-title">
              Comment se deroule une intervention
              <br className="hidden sm:block" />
              <span className="text-primary-600">a {siteConfig.city} ?</span>
            </h2>
            <p className="section-subtitle mx-auto text-center mt-3">
              De votre appel a la remise en service, notre processus est
              <strong className="text-gray-900"> simple, transparent et rapide</strong>.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.deblocage.steps.map((step: { step: number; title: string; description: string }) => {
              const stepColors = ['from-primary-500 to-primary-600', 'from-blue-500 to-blue-600', 'from-amber-500 to-amber-600', 'from-green-500 to-green-600'];
              return (
                <div
                  key={step.step}
                  className="relative bg-white p-6 border border-gray-100 hover:-translate-y-1 transition-all duration-300"
                  style={{
                    borderRadius: '16px',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                  }}
                >
                  {/* Step number badge */}
                  <div
                    className={`w-12 h-12 bg-gradient-to-br ${stepColors[(step.step - 1) % 4]} flex items-center justify-center text-white font-bold text-lg mb-5`}
                    style={{ borderRadius: '12px' }}
                  >
                    {String(step.step).padStart(2, '0')}
                  </div>

                  <h3 className="font-bold text-gray-900 text-lg mb-2">{step.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>

                  {/* Connector line */}
                  {step.step < 4 && (
                    <div className="hidden lg:block absolute top-10 -right-3 w-6 border-t-2 border-dashed border-gray-200" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Trust indicators */}
          <div className="mt-12 flex flex-wrap justify-center gap-6 lg:gap-10 text-gray-500 text-sm">
            {["Devis instantane", "Sans engagement", "Intervention garantie", "24h/24 7j/7"].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <svg className="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================================
          6. PANNES -- Cards propres avec badges urgence colores
          =================================================================== */}
      <section className="section bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <span className="section-label justify-center">
              <span className="w-2 h-2 bg-red-500" style={{ borderRadius: '50%' }} />
              Diagnostic
            </span>
            <h2 className="section-title">{content.pannes.title}</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {content.pannes.items.map((panne: { icon: string; title: string; description: string; urgency: string }, index: number) => {
              const colors = urgencyColors[panne.urgency] || { bg: "bg-gray-50", text: "text-gray-600", border: "border-gray-200" };
              const urgencyLabel = panne.urgency === 'urgent' ? 'Urgent' : panne.urgency === 'moyen' ? 'Moyen' : 'Faible';

              return (
                <div
                  key={index}
                  className="bg-white p-6 border border-gray-100 hover:-translate-y-1 transition-all duration-300"
                  style={{
                    borderRadius: '16px',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                  }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className="w-11 h-11 bg-gray-100 flex items-center justify-center text-gray-600"
                      style={{ borderRadius: '10px' }}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    {/* Urgency badge */}
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 ${colors.bg} ${colors.text} border ${colors.border}`}
                      style={{ borderRadius: '9999px' }}
                    >
                      {urgencyLabel}
                    </span>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{panne.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{panne.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===================================================================
          7. URGENCE -- Fond BLANC, image technicien droite, CTA rouge
          =================================================================== */}
      <section className="section bg-white relative overflow-hidden">
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Contenu gauche */}
            <div className="lg:col-span-7">
              <div
                className="inline-flex items-center gap-2 bg-red-50 border border-red-200 px-4 py-2 mb-6"
                style={{ borderRadius: '9999px' }}
              >
                <span className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider text-red-600">Urgence 24h/24</span>
              </div>

              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
                {content.urgence.title}
              </h2>
              <div className="w-12 h-1 bg-primary-500 mb-6" style={{ borderRadius: '2px' }} />
              <p className="text-gray-500 mb-8 max-w-lg leading-relaxed">
                {content.urgence.description}
              </p>

              {/* Stats urgence */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                {content.urgence.stats.map((stat: { value: string; label: string }, index: number) => (
                  <div
                    key={index}
                    className="bg-gray-50 border border-gray-100 p-4 text-center"
                    style={{ borderRadius: '12px' }}
                  >
                    <p className="text-2xl md:text-3xl font-extrabold text-primary-600 leading-none mb-1">{stat.value}</p>
                    <p className="stat-label">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* CTA rouge */}
              <a
                href={siteConfig.phoneLink}
                className="inline-flex items-center gap-3 bg-red-600 text-white px-8 py-4 font-bold text-lg hover:bg-red-700 transition-all duration-300 hover:-translate-y-0.5 mb-8"
                style={{
                  borderRadius: '14px',
                  boxShadow: '0 8px 24px rgba(220,38,38,0.3)',
                }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {siteConfig.phone}
              </a>

              {/* Cas frequents */}
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Cas frequents d&apos;urgence</p>
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
              <div
                className="relative aspect-[3/4] overflow-hidden"
                style={{
                  borderRadius: '20px',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                }}
              >
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

      {/* ===================================================================
          8. POURQUOI NOUS -- Image + checklist elegante
          =================================================================== */}
      <section className="section bg-gray-50">
        <div className="container">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Image */}
            <div className="lg:col-span-5 relative order-2 lg:order-1">
              <div
                className="relative aspect-[3/4] overflow-hidden"
                style={{
                  borderRadius: '20px',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                }}
              >
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
              <div
                className="absolute -bottom-4 -right-2 md:-right-4 bg-white p-5"
                style={{
                  borderRadius: '14px',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                }}
              >
                <p className="text-3xl md:text-4xl font-extrabold text-primary-600 leading-none">{content.stats.experience}</p>
                <p className="stat-label text-gray-500">{content.stats.experienceLabel}</p>
              </div>
            </div>

            {/* Contenu */}
            <div className="lg:col-span-7 order-1 lg:order-2">
              <span className="section-label">
                <span className="w-2 h-2 bg-primary-500" style={{ borderRadius: '50%' }} />
                Nos engagements
              </span>
              <h2 className="section-title">{content.whyUs.title}</h2>
              <div className="w-12 h-1 bg-primary-500 mt-4 mb-6" style={{ borderRadius: '2px' }} />
              <p className="section-subtitle mb-10">{content.whyUs.subtitle}</p>

              <div className="space-y-0">
                {content.whyUs.advantages.map((advantage: { icon: string; title: string; description: string }, index: number) => (
                  <div
                    key={index}
                    className="flex items-start gap-5 p-5 border-b border-gray-200 last:border-b-0 hover:bg-white transition-colors"
                    style={{ borderRadius: '12px' }}
                  >
                    <div
                      className="w-11 h-11 bg-primary-50 flex items-center justify-center text-primary-600 flex-shrink-0"
                      style={{ borderRadius: '10px' }}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">{advantage.title}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed">{advantage.description}</p>
                    </div>
                  </div>
                ))}
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

      {/* ===================================================================
          9. ZONES -- Groupees par distance, pills avec hover
          =================================================================== */}
      <section className="section bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <span className="section-label justify-center">
              <span className="w-2 h-2 bg-primary-500" style={{ borderRadius: '50%' }} />
              Zones
            </span>
            <h2 className="section-title">Zones d&apos;intervention a {siteConfig.city}</h2>
            <p className="section-subtitle mx-auto text-center mt-3">
              Intervention rapide a {siteConfig.city} et dans toute l&apos;agglomeration de l&apos;{siteConfig.department}.
            </p>
          </div>

          {/* Communes limitrophes */}
          <div className="mb-10">
            <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-3">
              <span className="w-2 h-2 bg-primary-500" style={{ borderRadius: '50%' }} />
              Communes limitrophes (moins de 6 km)
            </h3>
            <div className="flex flex-wrap gap-2">
              {zonesLimitrophes.map((zone) => (
                <Link
                  key={zone.slug}
                  href={`/depannage-rideau-metallique-${zone.slug}`}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary-50 border border-primary-100 text-primary-700 hover:bg-primary-100 hover:border-primary-200 transition-all text-sm font-medium"
                  style={{ borderRadius: '9999px' }}
                >
                  <svg className="w-3.5 h-3.5 text-primary-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {zone.name}
                  <span className="text-xs text-primary-400">({zone.postalCode})</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gray-200 mb-10" />

          {/* Communes proches */}
          <div className="mb-10">
            <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-3">
              <span className="w-2 h-2 bg-amber-500" style={{ borderRadius: '50%' }} />
              Communes proches (5-15 km)
            </h3>
            <div className="flex flex-wrap gap-2">
              {zonesProches.map((zone) => (
                <Link
                  key={zone.slug}
                  href={`/depannage-rideau-metallique-${zone.slug}`}
                  className="inline-flex items-center gap-2 px-3.5 py-2 bg-gray-50 border border-gray-200 text-gray-700 hover:bg-gray-100 hover:border-gray-300 transition-all text-sm font-medium"
                  style={{ borderRadius: '9999px' }}
                >
                  <svg className="w-3 h-3 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {zone.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gray-200 mb-10" />

          {/* Zone etendue */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-3">
              <span className="w-2 h-2 bg-gray-400" style={{ borderRadius: '50%' }} />
              Zone etendue (15-45 km)
            </h3>
            <div className="flex flex-wrap gap-2">
              {zonesEtendues.map((zone) => (
                <Link
                  key={zone.slug}
                  href={`/depannage-rideau-metallique-${zone.slug}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 border border-gray-100 text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-all text-sm"
                  style={{ borderRadius: '9999px' }}
                >
                  {zone.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-10 text-center">
            <Link href="/zones" className="btn-secondary">
              Voir toutes les zones ({zones.length})
            </Link>
          </div>
        </div>
      </section>

      {/* ===================================================================
          10. FAQ
          =================================================================== */}
      <FAQ items={faq.slice(0, 6)} title={`Questions Frequentes - Rideau Metallique ${siteConfig.city}`} />

      {/* ===================================================================
          11. REVIEWS -- Carousel Google format
          =================================================================== */}
      <Reviews
        title={`Avis Clients ${siteConfig.city}`}
        subtitle={`Ce que disent nos clients a ${siteConfig.city} et dans l'${siteConfig.department}`}
        items={content.reviews}
      />

      {/* ===================================================================
          12. CTA FINAL
          =================================================================== */}
      <CTA
        title={`Besoin d'un depannage rideau metallique a ${siteConfig.city} ?`}
        subtitle={`Notre equipe intervient 24h/24, 7j/7. Appelez le ${siteConfig.phone} pour un devis gratuit.`}
      />
    </main>
  );
}
