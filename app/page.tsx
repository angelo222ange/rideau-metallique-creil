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
  const serviceImages: Record<string, string> = {
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
          1. HERO -- Image fond + overlay gradient, texte gauche, produit droite
          =================================================================== */}
      <section className="relative min-h-[600px] lg:min-h-[650px] overflow-hidden">
        {/* Image de fond avec overlay gradient */}
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
          <div className="absolute inset-0 bg-primary-900/70" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900/85 via-primary-800/60 to-primary-700/40" />
        </div>

        <div className="container relative z-10 pt-28 pb-16 md:pt-32 md:pb-20 lg:pt-36 lg:pb-24">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Texte gauche */}
            <div>
              {/* Badge dispo avec pastille verte animate-ping */}
              <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400"></span>
                </span>
                Disponible 24h/24 a {siteConfig.city}
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Depannage Rideau
                <br />
                Metallique <span className="text-primary-300">{siteConfig.city}</span>
              </h1>

              <p className="text-lg text-white/80 mb-8 max-w-xl leading-relaxed">
                {content.hero.subtitle}
              </p>

              {/* CTAs -- rounded-full, blanc inverse + outline blanc */}
              <div className="flex flex-wrap gap-4 mb-10">
                <a
                  href={siteConfig.phoneLink}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-base font-bold text-primary-700 shadow-lg hover:bg-gray-50 transition-all duration-200"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {siteConfig.phone}
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full border-2 border-white/60 px-7 py-3.5 text-base font-semibold text-white hover:bg-white/10 transition-all duration-200"
                >
                  Devis gratuit
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>

              {/* Trust badges en cards */}
              <div className="flex flex-wrap gap-4">
                {[
                  { title: "-30 min", subtitle: "Intervention rapide" },
                  { title: "Garanti", subtitle: "Pieces & main d'oeuvre" },
                  { title: "Devis gratuit", subtitle: "Sans engagement" },
                ].map((badge, index) => (
                  <div key={index} className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/10">
                    <div className="w-9 h-9 bg-white/20 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-bold text-white text-sm">{badge.title}</p>
                      <p className="text-[11px] text-white/60">{badge.subtitle}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Image produit droite -- JAMAIS coupee, object-contain */}
            <div className="hidden lg:flex items-center justify-center">
              <div className="relative w-full max-w-md">
                <Image
                  src="/images/gallery/hero-rideau-lame-pleine.webp"
                  alt={`Rideau metallique lames pleines ${siteConfig.city}`}
                  title={`Rideau metallique lames pleines ${siteConfig.city}`}
                  width={450}
                  height={550}
                  className="w-full h-auto drop-shadow-2xl"
                  style={{ objectFit: 'contain' }}
                  priority
                  quality={80}
                  sizes="(max-width: 1024px) 0vw, 450px"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          2. TRUST BAR -- Stats avec gradient primary-50 to gray-50
          =================================================================== */}
      <section className="bg-gradient-to-r from-primary-50 via-gray-50 to-primary-50 py-6 border-y border-gray-200">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { number: siteConfig.experience, label: "Ans d'experience" },
              { number: siteConfig.interventions, label: "Interventions" },
              { number: "<30", label: "Minutes d'arrivee" },
              { number: `${siteConfig.reviews.rating}/5`, label: `${siteConfig.reviews.count} avis Google` },
            ].map((stat, index) => (
              <div key={index} className="text-center py-2">
                <p className="stat-number text-gray-900">
                  {stat.number}
                </p>
                <p className="stat-label">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================================
          3. SERVICES -- Grandes cards avec images DIFFERENTES
          =================================================================== */}
      <section className="section bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <span className="section-label justify-center">
              <span className="w-2 h-2 bg-primary-500 rounded-full" />
              Nos Services
            </span>
            <h2 className="section-title">Services Rideau Metallique {siteConfig.city}</h2>
            <p className="section-subtitle mx-auto text-center mt-3">
              {siteConfig.name} intervient pour tous vos besoins en rideau metallique a {siteConfig.city} et dans l&apos;{siteConfig.department}.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {displayServices.map((service) => {
              const backgroundImage = serviceImages[service.slug] || "";

              return (
                <Link
                  key={service.id}
                  href={`/${service.slug}`}
                  className="group relative overflow-hidden rounded-2xl min-h-[300px] transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
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
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent group-hover:from-black/80 transition-all duration-300" />
                    </>
                  )}

                  <div className="relative z-10 flex flex-col justify-end h-full p-6">
                    <h3 className="font-bold text-xl mb-2 text-white">
                      {service.name}
                    </h3>
                    <p className="text-white/80 text-sm group-hover:text-white/90 transition-colors mb-4 line-clamp-2">
                      {service.shortDesc}
                    </p>
                    <span className="text-sm font-semibold text-primary-300 group-hover:text-primary-200 transition-colors inline-flex items-center gap-1">
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
          5. COMMENT CA MARCHE -- 4 cards numerotees, icones cercles primary-600
          =================================================================== */}
      <section className="section bg-gradient-to-b from-white to-gray-50" id="comment-ca-marche">
        <div className="container">
          <div className="text-center mb-12">
            <span className="section-label justify-center">
              <span className="w-2 h-2 bg-primary-500 rounded-full" />
              Processus simplifie
            </span>
            <h2 className="section-title">
              Comment se deroule une intervention
              <br className="hidden sm:block" />
              <span className="text-primary-600"> a {siteConfig.city} ?</span>
            </h2>
            <p className="section-subtitle mx-auto text-center mt-3">
              De votre appel a la remise en service, notre processus est
              <strong className="text-gray-900"> simple, transparent et rapide</strong>.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.deblocage.steps.map((step: { step: number; title: string; description: string }) => {
              const stepIcons = [
                <path key="1" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />,
                <path key="2" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />,
                <path key="3" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />,
                <path key="4" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />,
              ];

              return (
                <div
                  key={step.step}
                  className="relative bg-white rounded-lg p-6 border border-gray-100 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  {/* Step number + icon in circle */}
                  <div className="w-14 h-14 rounded-full bg-primary-600 flex items-center justify-center text-white mb-5">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {stepIcons[(step.step - 1) % 4]}
                    </svg>
                  </div>

                  <div className="text-xs font-bold text-primary-600 uppercase tracking-wider mb-2">
                    Etape {String(step.step).padStart(2, '0')}
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
          6. PANNES -- Cards rounded-xl avec badges urgence rounded-full
          =================================================================== */}
      <section className="section bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <span className="section-label justify-center">
              <span className="w-2 h-2 bg-red-500 rounded-full" />
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
                  className="bg-white rounded-xl p-6 border border-gray-100 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-11 h-11 bg-gray-100 rounded-xl flex items-center justify-center text-gray-600">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    {/* Urgency badge -- rounded-full */}
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full ${colors.bg} ${colors.text} border ${colors.border}`}>
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
          7. URGENCE -- Fond PRIMARY-600 (vert), pattern SVG "+", CTA blanc
          =================================================================== */}
      <section className="relative overflow-hidden bg-primary-600 py-16 md:py-24">
        {/* Pattern SVG "+" en blanc opacity-10 */}
        <div className="absolute inset-0 opacity-10" aria-hidden="true">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="plus-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M20 14v12M14 20h12" stroke="white" strokeWidth="1.5" fill="none" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#plus-pattern)" />
          </svg>
        </div>

        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Contenu gauche */}
            <div>
              <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full mb-6">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
                </span>
                <span className="text-sm font-bold text-white">Urgence 24h/24</span>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4">
                {content.urgence.title}
              </h2>
              <div className="w-12 h-1 bg-white/40 rounded-full mb-6" />
              <p className="text-white/80 mb-8 max-w-lg leading-relaxed">
                {content.urgence.description}
              </p>

              {/* Stats urgence */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                {content.urgence.stats.map((stat: { value: string; label: string }, index: number) => (
                  <div
                    key={index}
                    className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-xl p-4 text-center"
                  >
                    <p className="text-2xl md:text-3xl font-extrabold text-white leading-none mb-1">{stat.value}</p>
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-white/60">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* CTA bouton BLANC inverse rounded-full */}
              <a
                href={siteConfig.phoneLink}
                className="inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 font-bold text-lg text-primary-700 shadow-lg hover:bg-gray-50 transition-all duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {siteConfig.phone}
              </a>

              {/* Cas frequents */}
              <div className="mt-8">
                <p className="text-xs font-bold uppercase tracking-wider text-white/50 mb-3">Cas frequents d&apos;urgence</p>
                <ul className="space-y-2">
                  {content.urgence.cases.map((cas: string, index: number) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-white/80">
                      <svg className="w-4 h-4 text-white/50 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                      {cas}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Image technicien a droite */}
            <div className="hidden lg:block">
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl shadow-2xl">
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
          8. POURQUOI NOUS -- Image rounded-2xl + fond rotate-3 + badge flottant
          =================================================================== */}
      <section className="section bg-gray-50">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image avec fond tourne */}
            <div className="relative order-2 lg:order-1">
              <div className="relative max-w-lg mx-auto">
                {/* Fond tourne */}
                <div className="absolute inset-0 bg-primary-600 rounded-2xl transform rotate-3" />
                {/* Image */}
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <div className="aspect-[3/4]">
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
                </div>
                {/* Badge flottant animate-float */}
                <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl shadow-xl p-4 animate-float">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{content.stats.experience}</p>
                      <p className="text-sm text-gray-500">{content.stats.experienceLabel}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contenu */}
            <div className="order-1 lg:order-2">
              <span className="section-label">
                <span className="w-2 h-2 bg-primary-500 rounded-full" />
                Nos engagements
              </span>
              <h2 className="section-title">{content.whyUs.title}</h2>
              <div className="w-12 h-1 bg-primary-500 rounded-full mt-4 mb-6" />
              <p className="section-subtitle mb-10">{content.whyUs.subtitle}</p>

              <div className="space-y-0">
                {content.whyUs.advantages.map((advantage: { icon: string; title: string; description: string }, index: number) => (
                  <div
                    key={index}
                    className="flex items-start gap-5 p-5 border-b border-gray-200 last:border-b-0 hover:bg-white rounded-xl transition-colors"
                  >
                    <div className="w-11 h-11 bg-primary-50 rounded-xl flex items-center justify-center text-primary-600 flex-shrink-0">
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
          9. ZONES -- Pills rounded-full groupes par distance
          =================================================================== */}
      <section className="section bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <span className="section-label justify-center">
              <span className="w-2 h-2 bg-primary-500 rounded-full" />
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
              <span className="w-2 h-2 bg-primary-500 rounded-full" />
              Communes limitrophes (moins de 6 km)
            </h3>
            <div className="flex flex-wrap gap-2">
              {zonesLimitrophes.map((zone) => (
                <Link
                  key={zone.slug}
                  href={`/depannage-rideau-metallique-${zone.slug}`}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-primary-50 border border-primary-100 text-primary-700 hover:bg-primary-100 hover:border-primary-200 transition-all text-sm font-medium"
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
              <span className="w-2 h-2 bg-amber-500 rounded-full" />
              Communes proches (5-15 km)
            </h3>
            <div className="flex flex-wrap gap-2">
              {zonesProches.map((zone) => (
                <Link
                  key={zone.slug}
                  href={`/depannage-rideau-metallique-${zone.slug}`}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-gray-50 border border-gray-200 text-gray-700 hover:bg-gray-100 hover:border-gray-300 transition-all text-sm font-medium"
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
              <span className="w-2 h-2 bg-gray-400 rounded-full" />
              Zone etendue (15-45 km)
            </h3>
            <div className="flex flex-wrap gap-2">
              {zonesEtendues.map((zone) => (
                <Link
                  key={zone.slug}
                  href={`/depannage-rideau-metallique-${zone.slug}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-50 border border-gray-100 text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-all text-sm"
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
          11. REVIEWS
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
