import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { siteConfig, services, zones } from "@/config/site";
import { FAQ } from "@/components/sections/FAQ";
import { CTA } from "@/components/sections/CTA";
import { Reviews } from "@/components/sections/Reviews";
import { AlternatingFeatures } from "@/components/sections/AlternatingFeatures";
import { ServiceTabs } from "@/components/sections/ServiceTabs";
import { getPageContent } from "@/lib/content";
import faqData from "@/content/faq.json";
import homeContent from "@/content/pages/home.json";

const content = getPageContent(homeContent);

export const metadata: Metadata = {
  title: `Depannage Rideau Metallique ${siteConfig.city} - Urgence 24h/24 7j/7`,
  description: `Depannage rideau metallique a ${siteConfig.city} - Intervention en -30 min - 24h/24 7j/7 - Devis gratuit - ${siteConfig.reviews.rating}/5 (${siteConfig.reviews.count} avis). ${siteConfig.phone}`,
  alternates: { canonical: `${siteConfig.url}/` },
};

export default function HomePage() {
  const faq = getPageContent(faqData);
  const displayServices = services.filter(s => s.hasPage);

  return (
    <main>
      {/* ================================================================
          HERO -- Dark, cinematic, product detoured right
          ================================================================ */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background image */}
        <Image
          src="/images/gallery/realisation-rideau-metallique-lame-pleine-commerce.webp"
          alt={`Rideau metallique commerce ${siteConfig.city}`}
          title={`Rideau metallique commerce ${siteConfig.city}`}
          fill
          className="object-cover"
          priority
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-950/95 via-gray-900/90 to-gray-900/60" />

        {/* Subtle industrial pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "repeating-linear-gradient(90deg, white 0, white 1px, transparent 0, transparent 60px), repeating-linear-gradient(0deg, white 0, white 1px, transparent 0, transparent 60px)",
          }}
        />

        <div className="container relative z-10 py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              {/* Badge */}
              <div
                className="inline-flex items-center gap-2.5 px-4 py-2 bg-white/[0.07] backdrop-blur-md border border-white/[0.12] text-white/90 text-sm font-medium mb-8"
                style={{ borderRadius: "100px" }}
              >
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                Disponible 24h/24 -- {siteConfig.city} et {zones.length} communes
              </div>

              {/* Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold text-white leading-[1.08] mb-6 tracking-tight">
                Depannage Rideau{" "}
                <br className="hidden sm:block" />
                Metallique a{" "}
                <span className="relative">
                  <span className="relative z-10 text-primary-400">{siteConfig.city}</span>
                  <span
                    className="absolute -bottom-1 left-0 right-0 h-3 bg-primary-500/20"
                    style={{ borderRadius: "2px" }}
                  />
                </span>
              </h1>

              {/* Subtitle */}
              <p
                className="text-white/50 text-lg md:text-xl max-w-xl mb-10 leading-relaxed font-light"
                style={{ textWrap: "balance" } as React.CSSProperties}
              >
                Intervention en moins de 30 minutes. Deblocage, reparation, installation de rideaux metalliques pour commerces et professionnels.
              </p>

              {/* CTAs -- more industrial, less AI-rounded */}
              <div className="flex items-center gap-3 mb-12">
                <a
                  href={siteConfig.phoneLink}
                  className="inline-flex items-center gap-2.5 whitespace-nowrap px-7 py-3.5 bg-white text-gray-900 font-bold text-sm tracking-wide transition-all duration-200 hover:bg-gray-100 hover:shadow-lg hover:shadow-white/10 hover:-translate-y-0.5"
                  style={{ borderRadius: "6px" }}
                >
                  <svg className="w-4 h-4 text-primary-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  {siteConfig.phone}
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 whitespace-nowrap px-7 py-3.5 text-white/70 font-medium text-sm border border-white/15 transition-all duration-200 hover:bg-white/[0.06] hover:text-white hover:border-white/25"
                  style={{ borderRadius: "6px" }}
                >
                  Devis gratuit
                  <svg className="w-3.5 h-3.5 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>

              {/* Trust signals */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                {/* Reviews */}
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-3">
                    <img
                      src="https://randomuser.me/api/portraits/men/32.jpg"
                      alt="Karim"
                      className="w-10 h-10 rounded-full border-2 border-gray-900 object-cover"
                      loading="lazy"
                    />
                    <div className="w-10 h-10 bg-primary-600 rounded-full border-2 border-gray-900 flex items-center justify-center text-white text-xs font-bold">
                      S
                    </div>
                    <img
                      src="https://randomuser.me/api/portraits/women/44.jpg"
                      alt="Nathalie"
                      className="w-10 h-10 rounded-full border-2 border-gray-900 object-cover"
                      loading="lazy"
                    />
                    <div className="w-10 h-10 bg-secondary-terracotta rounded-full border-2 border-gray-900 flex items-center justify-center text-white text-xs font-bold">
                      M
                    </div>
                    <img
                      src="https://randomuser.me/api/portraits/men/67.jpg"
                      alt="Antoine"
                      className="w-10 h-10 rounded-full border-2 border-gray-900 object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-white/40 text-sm">
                      {siteConfig.reviews.rating}/5 -- {siteConfig.reviews.count} avis
                    </p>
                  </div>
                </div>

                <div className="hidden sm:block w-px h-10 bg-white/15" />

                {/* Stats */}
                <div className="flex gap-6">
                  <div>
                    <p className="text-white font-bold text-lg">{siteConfig.experience} ans</p>
                    <p className="text-white/30 text-xs uppercase tracking-wider">experience</p>
                  </div>
                  <div>
                    <p className="text-white font-bold text-lg">-30 min</p>
                    <p className="text-white/30 text-xs uppercase tracking-wider">intervention</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Hero right -- Product image detoured */}
            <div className="hidden lg:flex items-center justify-center relative">
              <div className="relative w-full max-w-md">
                {/* Glow behind product */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/15 to-emerald-500/5 rounded-full blur-3xl scale-110" />
                {/* Subtle ring decoration */}
                <div
                  className="absolute inset-[-20px] border border-white/[0.04] rounded-full"
                />
                <div
                  className="absolute inset-[-50px] border border-white/[0.02] rounded-full"
                />
                <Image
                  src="/images/gallery/hero-rideau-lame-pleine.webp"
                  alt="Rideau metallique lame pleine sur-mesure DRM"
                  title="Rideau metallique lame pleine sur-mesure DRM"
                  width={500}
                  height={600}
                  className="relative z-10 drop-shadow-2xl object-contain w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          STATS BAR -- Gradient with industrial dot pattern
          ================================================================ */}
      <section className="py-10 md:py-12 bg-gradient-to-r from-primary-700 via-primary-600 to-primary-700 relative overflow-hidden">
        {/* Industrial crosshatch pattern */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, white 0, white 1px, transparent 0, transparent 8px)",
          }}
        />
        <div className="container relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {[
              { value: `${siteConfig.experience}`, label: "Annees d'experience", suffix: "ans" },
              { value: `${siteConfig.interventions}`, label: "Interventions realisees", suffix: "" },
              { value: "-30", label: "Delai d'intervention", suffix: "min" },
              { value: `${siteConfig.reviews.rating}/5`, label: `${siteConfig.reviews.count} avis Google`, suffix: "" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="flex items-baseline justify-center gap-1">
                  <p className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">{stat.value}</p>
                  {stat.suffix && <span className="text-white/50 text-sm font-medium">{stat.suffix}</span>}
                </div>
                <p className="text-white/50 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          SERVICES -- Interactive tabs with large images
          ================================================================ */}
      <ServiceTabs services={displayServices} />

      {/* ================================================================
          CONTENU SEO -- Alternating features (improved)
          ================================================================ */}
      {content.alternatingFeatures && (
        <AlternatingFeatures features={content.alternatingFeatures} bgColor="bg-gray-50" />
      )}

      {/* ================================================================
          COMMENT CA MARCHE -- Timeline with numbered steps
          ================================================================ */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Decorative industrial lines */}
        <div className="absolute top-0 left-1/2 w-px h-full bg-gray-100" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-primary-50 rounded-full blur-3xl opacity-40" />

        <div className="container relative">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-primary-600 text-sm font-semibold uppercase tracking-widest mb-3">Comment ca marche</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
              {content.deblocage.title}
            </h2>
            <p className="text-gray-500 text-lg mt-4" style={{ textWrap: "balance" } as React.CSSProperties}>
              {content.deblocage.description}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {content.deblocage.steps.map((step: { step: number; title: string; description: string }, i: number) => (
              <div key={i} className="text-center group relative">
                {/* Connector line -- hidden on last item and mobile */}
                {i < content.deblocage.steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[calc(50%+32px)] right-[-calc(50%-32px)] w-[calc(100%-64px)] h-px bg-gray-200" />
                )}
                <div
                  className="w-16 h-16 bg-gradient-to-br from-primary-600 to-primary-800 text-white font-extrabold text-xl flex items-center justify-center mx-auto mb-5 shadow-lg shadow-primary-900/15 transition-transform duration-300 group-hover:-translate-y-1 relative z-10"
                  style={{ borderRadius: "14px" }}
                >
                  {step.step}
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">{step.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-14">
            <a
              href={siteConfig.phoneLink}
              className="inline-flex items-center gap-3 px-8 py-4 bg-primary-600 text-white font-bold text-base transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_32px_rgba(27,122,78,0.25)]"
              style={{ borderRadius: "8px" }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              Deblocage urgent : {siteConfig.phone}
            </a>
          </div>
        </div>
      </section>

      {/* ================================================================
          PANNES -- Cards with urgency badges
          ================================================================ */}
      <section className="py-24 bg-gray-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-72 h-72 bg-red-100 rounded-full blur-3xl opacity-20" />

        <div className="container relative">
          <div className="max-w-2xl mb-14">
            <p className="text-red-500 text-sm font-semibold uppercase tracking-widest mb-3">Pannes frequentes</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
              {content.pannes.title}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {content.pannes.items.map((panne: { title: string; description: string; urgency: string }, i: number) => (
              <div
                key={i}
                className="bg-white p-7 border border-gray-100 hover:border-gray-200 hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 hover:-translate-y-1"
                style={{ borderRadius: "14px" }}
              >
                <div className="flex items-center justify-between mb-5">
                  <span className="text-gray-200 text-xs font-mono tracking-wider">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 ${
                      panne.urgency === "urgent"
                        ? "text-red-600 bg-red-50"
                        : panne.urgency === "moyen"
                        ? "text-amber-600 bg-amber-50"
                        : "text-gray-500 bg-gray-50"
                    }`}
                    style={{ borderRadius: "100px" }}
                  >
                    {panne.urgency === "urgent" ? "Urgent" : panne.urgency === "moyen" ? "Moyen" : "Faible"}
                  </span>
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">{panne.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{panne.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          URGENCE -- Dark dramatic section
          ================================================================ */}
      <section className="py-24 bg-gray-950 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-500/[0.04] rounded-full blur-3xl" />
        {/* Industrial grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, white 0, white 1px, transparent 0, transparent 80px), repeating-linear-gradient(0deg, white 0, white 1px, transparent 0, transparent 80px)",
          }}
        />

        <div className="container relative">
          <div className="grid lg:grid-cols-5 gap-16 items-start">
            <div className="lg:col-span-3">
              <div
                className="inline-flex items-center gap-2.5 px-4 py-2 bg-red-500/10 backdrop-blur-sm border border-red-500/20 text-red-400 text-sm font-medium mb-8"
                style={{ borderRadius: "100px" }}
              >
                <span className="w-2.5 h-2.5 bg-red-400 rounded-full animate-pulse" />
                Urgence 24h/24 -- 7j/7
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-6">
                {content.urgence.title}
              </h2>
              <p className="text-white/40 text-lg mb-10 max-w-xl leading-relaxed">{content.urgence.description}</p>

              <div className="grid grid-cols-3 gap-4 mb-10">
                {content.urgence.stats.map((stat: { value: string; label: string }, i: number) => (
                  <div
                    key={i}
                    className="bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] p-5 text-center"
                    style={{ borderRadius: "14px" }}
                  >
                    <p className="text-2xl font-extrabold text-primary-400">{stat.value}</p>
                    <p className="text-white/30 text-xs mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>

              <a
                href={siteConfig.phoneLink}
                className="inline-flex items-center gap-3 px-8 py-4 bg-red-600 text-white font-bold text-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_32px_rgba(220,38,38,0.25)]"
                style={{ borderRadius: "8px" }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                Appel Urgence : {siteConfig.phone}
              </a>
            </div>

            <div className="lg:col-span-2 space-y-3">
              <p className="text-white/20 text-xs font-semibold uppercase tracking-widest mb-4">Cas frequents</p>
              {content.urgence.cases.map((cas: string, i: number) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-4 bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] text-white/50 text-sm hover:border-red-500/20 hover:text-white/70 transition-all"
                  style={{ borderRadius: "10px" }}
                >
                  <span className="w-2 h-2 bg-red-400 rounded-full flex-shrink-0 mt-1.5" />
                  {cas}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          POURQUOI NOUS -- Image + checklist
          ================================================================ */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary-50 rounded-full blur-3xl opacity-30" />

        <div className="container relative">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <Image
                src="/images/gallery/installation-rideau-metallique-drm.webp"
                alt={`Technicien DRM installation rideau metallique ${siteConfig.city}`}
                title={`Technicien DRM installation rideau metallique ${siteConfig.city}`}
                width={640}
                height={480}
                className="w-full h-auto object-cover shadow-2xl"
                style={{ borderRadius: "16px" }}
              />
              {/* Floating stat card */}
              <div
                className="absolute -bottom-6 -right-6 bg-white p-5 shadow-2xl border border-gray-100"
                style={{ borderRadius: "14px" }}
              >
                <p className="text-3xl font-extrabold text-primary-600">{siteConfig.interventions}</p>
                <p className="text-gray-500 text-sm mt-0.5">interventions realisees</p>
              </div>
              {/* Decorative offset */}
              <div
                className="absolute -z-10 -top-4 -left-4 w-full h-full opacity-40"
                style={{
                  borderRadius: "16px",
                  background: "linear-gradient(135deg, rgba(27,122,78,0.3) 0%, rgba(180,83,9,0.15) 100%)",
                }}
              />
            </div>

            <div>
              <p className="text-primary-600 text-sm font-semibold uppercase tracking-widest mb-3">Pourquoi nous choisir</p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
                {siteConfig.experience} ans d&apos;expertise en rideau metallique
              </h2>
              {/* Decorative separator */}
              <div className="flex items-center gap-3 mb-10">
                <div className="w-10 h-1 bg-primary-500" style={{ borderRadius: "2px" }} />
                <div className="w-3 h-1 bg-secondary-terracotta opacity-60" style={{ borderRadius: "2px" }} />
              </div>

              <div className="space-y-3">
                {content.whyUs.advantages
                  .slice(0, 6)
                  .map((item: { icon: string; title: string; description: string }, i: number) => (
                    <div
                      key={i}
                      className="flex items-start gap-4 p-4 hover:bg-gray-50 transition-all duration-200 group"
                      style={{ borderRadius: "10px" }}
                    >
                      <div
                        className="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center flex-shrink-0 shadow-md shadow-primary-900/15 group-hover:-translate-y-0.5 transition-transform"
                        style={{ borderRadius: "8px" }}
                      >
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">{item.title}</p>
                        <p className="text-gray-500 text-sm leading-relaxed mt-0.5">{item.description}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          ZONES -- Tag cloud
          ================================================================ */}
      <section className="py-24 bg-gray-50">
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
            <div>
              <p className="text-primary-600 text-sm font-semibold uppercase tracking-widest mb-3">Zone d&apos;intervention</p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                {zones.length} communes couvertes
              </h2>
            </div>
            <Link
              href="/zones"
              className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center gap-2 transition-colors"
            >
              Toutes les zones{" "}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {zones.slice(0, 18).map((z) => (
              <Link
                key={z.slug}
                href={`/rideau-metallique-${z.slug}`}
                className="px-5 py-2.5 bg-white text-gray-600 text-sm font-medium border border-gray-200 hover:border-primary-300 hover:text-primary-700 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                style={{ borderRadius: "8px" }}
              >
                {z.name}
                <span className="text-gray-300 ml-2">{z.postalCode}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Reviews items={content.reviews} title={`Avis Clients ${siteConfig.city}`} />
      <FAQ items={content.faq.length > 0 ? content.faq : faq} title="Questions Frequentes" />
      <CTA />
    </main>
  );
}
