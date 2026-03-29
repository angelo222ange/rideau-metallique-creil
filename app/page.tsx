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
          src="/images/gallery/hero-bg-technicien-drm.webp"
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
          COMMENT CA MARCHE -- Pro cards with progression
          ================================================================ */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-primary-50 rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-50 rounded-full blur-3xl opacity-25" />
        {/* Industrial dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, #1B7A4E 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="container relative">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary-600 mb-3">Comment ca marche</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
              {content.deblocage.title}
            </h2>
            <p className="text-gray-500 text-lg mt-4 leading-relaxed" style={{ textWrap: "balance" } as React.CSSProperties}>
              {content.deblocage.description}
            </p>
          </div>

          {/* Progress bar -- desktop only */}
          <div className="hidden lg:block max-w-4xl mx-auto mb-14">
            <div className="relative h-1 bg-gray-100" style={{ borderRadius: "4px" }}>
              <div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary-600 to-primary-400"
                style={{ borderRadius: "4px", width: "100%" }}
              />
              {content.deblocage.steps.map((_: { step: number; title: string; description: string }, i: number) => (
                <div
                  key={i}
                  className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white border-[3px] border-primary-600 rounded-full"
                  style={{ left: `${(i / (content.deblocage.steps.length - 1)) * 100}%`, transform: "translate(-50%, -50%)" }}
                />
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {content.deblocage.steps.map((step: { step: number; title: string; description: string }, i: number) => {
              const sc = { bg: "bg-gray-50", border: "border-gray-200", iconBg: "from-primary-600 to-primary-800", text: "text-primary-700" };
              const stepIcons = [
                // Phone / diagnostic
                <svg key="icon-0" className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>,
                // Search / identification
                <svg key="icon-1" className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>,
                // Wrench / reparation
                <svg key="icon-2" className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
                // Shield check / test
                <svg key="icon-3" className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
              ];
              return (
                <div
                  key={i}
                  className={`relative ${sc.bg} border ${sc.border} p-7 group transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-gray-200/50`}
                  style={{ borderRadius: "16px" }}
                >
                  {/* Step number watermark */}
                  <span className="absolute top-4 right-5 text-5xl font-extrabold opacity-[0.06] select-none">
                    {String(step.step).padStart(2, "0")}
                  </span>

                  <div
                    className={`w-14 h-14 bg-gradient-to-br ${sc.iconBg} flex items-center justify-center mb-5 shadow-lg group-hover:scale-105 transition-transform duration-300`}
                    style={{ borderRadius: "12px" }}
                  >
                    {stepIcons[i]}
                  </div>
                  <h3 className={`font-bold text-lg mb-2 ${sc.text}`}>{step.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>
                </div>
              );
            })}
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
          PANNES -- Cards with urgency left border + badges
          ================================================================ */}
      <section className="py-24 bg-gray-50 relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-red-100 rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-20 right-0 w-80 h-80 bg-amber-100 rounded-full blur-3xl opacity-15" />

        <div className="container relative">
          <div className="max-w-2xl mb-14">
            <p className="text-sm font-semibold uppercase tracking-widest text-red-500 mb-3">Pannes frequentes</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
              {content.pannes.title}
            </h2>
            <p className="text-gray-500 text-lg mt-4">Nos techniciens diagnostiquent et reparent toutes les pannes de rideaux metalliques.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {content.pannes.items.map((panne: { title: string; description: string; urgency: string }, i: number) => {
              const borderColor = panne.urgency === "urgent" ? "#ef4444" : panne.urgency === "moyen" ? "#f59e0b" : "#9ca3af";
              const panneIcons = [
                // Zap / moteur
                <svg key="pi-0" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
                // Shield / lames
                <svg key="pi-1" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
                // Refresh / axe
                <svg key="pi-2" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>,
                // Link / attache
                <svg key="pi-3" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>,
                // Adjustments / butees
                <svg key="pi-4" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>,
                // Signal / telecommande
                <svg key="pi-5" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.858 15.355-5.858 21.213 0" /></svg>,
              ];
              return (
                <div
                  key={i}
                  className="bg-white p-7 border border-gray-100 hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 hover:-translate-y-1 group"
                  style={{
                    borderRadius: "14px",
                    borderLeft: `4px solid ${borderColor}`,
                  }}
                >
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className={`w-10 h-10 flex items-center justify-center ${
                        panne.urgency === "urgent" ? "bg-red-50 text-red-500" : panne.urgency === "moyen" ? "bg-amber-50 text-amber-500" : "bg-gray-50 text-gray-400"
                      } group-hover:scale-110 transition-transform`}
                      style={{ borderRadius: "10px" }}
                    >
                      {panneIcons[i % 6]}
                    </div>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 ${
                        panne.urgency === "urgent"
                          ? "text-red-600 bg-red-50 border border-red-100"
                          : panne.urgency === "moyen"
                          ? "text-amber-600 bg-amber-50 border border-amber-100"
                          : "text-gray-500 bg-gray-50 border border-gray-100"
                      }`}
                      style={{ borderRadius: "100px" }}
                    >
                      {panne.urgency === "urgent" ? "Urgent" : panne.urgency === "moyen" ? "Moyen" : "Faible"}
                    </span>
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg mb-2">{panne.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{panne.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================================================================
          URGENCE -- Dark dramatic section with image
          ================================================================ */}
      <section className="py-24 bg-gray-950 relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-500/[0.04] rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-primary-500/[0.03] rounded-full blur-3xl" />
        {/* Industrial grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, white 0, white 1px, transparent 0, transparent 80px), repeating-linear-gradient(0deg, white 0, white 1px, transparent 0, transparent 80px)",
          }}
        />

        <div className="container relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: content */}
            <div>
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

              {/* Glass stat cards */}
              <div className="grid grid-cols-3 gap-4 mb-10">
                {content.urgence.stats.map((stat: { value: string; label: string }, i: number) => (
                  <div
                    key={i}
                    className="bg-white/[0.06] backdrop-blur-md border border-white/[0.1] p-5 text-center transition-all duration-300 hover:bg-white/[0.1] hover:-translate-y-0.5"
                    style={{ borderRadius: "14px" }}
                  >
                    <p className="text-2xl md:text-3xl font-extrabold text-primary-400 tracking-tight">{stat.value}</p>
                    <p className="text-white/40 text-xs mt-1.5 font-medium">{stat.label}</p>
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

              {/* Cas frequents */}
              <div className="mt-10 space-y-3">
                <p className="text-white/20 text-xs font-semibold uppercase tracking-widest mb-4">Cas frequents</p>
                {content.urgence.cases.map((cas: string, i: number) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-4 bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] text-white/50 text-sm hover:border-red-500/20 hover:text-white/70 hover:bg-white/[0.06] transition-all"
                    style={{ borderRadius: "10px" }}
                  >
                    <span className="w-2 h-2 bg-red-400 rounded-full flex-shrink-0 mt-1.5" />
                    {cas}
                  </div>
                ))}
              </div>
            </div>

            {/* Right: image technicien */}
            <div className="hidden lg:block relative">
              <div className="relative">
                <Image
                  src="/images/gallery/depannage-rideau-metallique-DRM-reparation.webp"
                  alt={`Technicien DRM depannage rideau metallique urgence ${siteConfig.city}`}
                  title={`Depannage urgence rideau metallique ${siteConfig.city} 24h/24`}
                  width={600}
                  height={700}
                  className="w-full h-auto object-cover shadow-2xl relative z-10"
                  style={{ borderRadius: "16px" }}
                />
                {/* Decorative offset */}
                <div
                  className="absolute -z-[1] -bottom-4 -right-4 w-full h-full"
                  style={{
                    borderRadius: "16px",
                    background: "linear-gradient(135deg, rgba(239,68,68,0.25) 0%, rgba(27,122,78,0.15) 100%)",
                  }}
                />
                {/* Floating badge */}
                <div
                  className="absolute -bottom-5 -left-5 bg-red-600 p-5 shadow-2xl z-20"
                  style={{ borderRadius: "14px" }}
                >
                  <p className="text-2xl font-extrabold text-white">&lt;30 min</p>
                  <p className="text-red-200 text-sm mt-0.5">temps d&apos;intervention</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          POURQUOI NOUS -- Image + checklist with varied icons
          ================================================================ */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary-50 rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-amber-50 rounded-full blur-3xl opacity-20" />
        {/* Subtle diagonal pattern */}
        <div
          className="absolute inset-0 opacity-[0.012]"
          style={{
            backgroundImage: "repeating-linear-gradient(135deg, #1B7A4E 0, #1B7A4E 1px, transparent 0, transparent 40px)",
          }}
        />

        <div className="container relative">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <Image
                src="/images/gallery/installation-rideau-metallique-drm.webp"
                alt={`Technicien DRM installation rideau metallique ${siteConfig.city}`}
                title={`Technicien DRM installation rideau metallique ${siteConfig.city}`}
                width={640}
                height={480}
                className="w-full h-auto object-cover shadow-2xl relative z-10"
                style={{ borderRadius: "16px" }}
              />
              {/* Floating stat card */}
              <div
                className="absolute -bottom-6 -right-6 bg-white p-5 shadow-2xl border border-gray-100 z-20"
                style={{ borderRadius: "14px" }}
              >
                <p className="text-3xl font-extrabold text-primary-600">{siteConfig.interventions}</p>
                <p className="text-gray-500 text-sm mt-0.5">interventions realisees</p>
              </div>
              {/* Experience badge top-left */}
              <div
                className="absolute -top-5 -left-5 bg-primary-600 p-4 shadow-2xl z-20"
                style={{ borderRadius: "12px" }}
              >
                <p className="text-xl font-extrabold text-white">{siteConfig.experience} ans</p>
                <p className="text-primary-200 text-xs mt-0.5">d&apos;experience</p>
              </div>
              {/* Decorative offset */}
              <div
                className="absolute -z-[1] -top-4 -left-4 w-full h-full opacity-50"
                style={{
                  borderRadius: "16px",
                  background: "linear-gradient(135deg, rgba(27,122,78,0.3) 0%, rgba(180,83,9,0.15) 100%)",
                }}
              />
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-primary-600 mb-3">Pourquoi nous choisir</p>
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
                  .map((item: { icon: string; title: string; description: string }, i: number) => {
                    const advantageIcons = [
                      // Zap / rapide
                      <svg key="ai-0" className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
                      // Map pin / locale
                      <svg key="ai-1" className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
                      // Clipboard / devis
                      <svg key="ai-2" className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>,
                      // Shield / garantie
                      <svg key="ai-3" className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
                      // Star / quality
                      <svg key="ai-4" className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>,
                      // Clock / disponible
                      <svg key="ai-5" className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
                    ];
                    const iconBgs = [
                      "from-amber-500 to-amber-700",
                      "from-primary-600 to-primary-800",
                      "from-blue-500 to-blue-700",
                      "from-emerald-500 to-emerald-700",
                      "from-purple-500 to-purple-700",
                      "from-red-500 to-red-700",
                    ];
                    return (
                      <div
                        key={i}
                        className="flex items-start gap-4 p-4 hover:bg-gray-50 transition-all duration-200 group border border-transparent hover:border-gray-100"
                        style={{ borderRadius: "12px" }}
                      >
                        <div
                          className={`w-10 h-10 bg-gradient-to-br ${iconBgs[i % 6]} flex items-center justify-center flex-shrink-0 shadow-md group-hover:-translate-y-0.5 transition-transform`}
                          style={{ borderRadius: "8px" }}
                        >
                          {advantageIcons[i % 6]}
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">{item.title}</p>
                          <p className="text-gray-500 text-sm leading-relaxed mt-0.5">{item.description}</p>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          ZONES -- Grouped by distance with sub-titles
          ================================================================ */}
      <section className="py-24 bg-gray-50 relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-50 rounded-full blur-3xl opacity-25" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-emerald-50 rounded-full blur-3xl opacity-20" />

        <div className="container relative">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-14">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-primary-600 mb-3">Zone d&apos;intervention</p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                {zones.length} communes couvertes
              </h2>
              <p className="text-gray-500 text-lg mt-3">De {siteConfig.city} jusqu&apos;a 45 km autour, nous intervenons rapidement.</p>
            </div>
            <Link
              href="/zones"
              className="text-primary-600 hover:text-primary-700 text-sm font-bold flex items-center gap-2 transition-colors"
            >
              Toutes les zones{" "}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {/* Limitrophes (< 5 km) */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-3 h-3 bg-primary-600 rounded-full" />
              <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Communes limitrophes</h3>
              <span className="text-xs text-gray-400 font-medium">&lt; 6 km</span>
              <div className="flex-1 h-px bg-gray-200 ml-2" />
            </div>
            <div className="flex flex-wrap gap-2.5">
              {zones.filter(z => ('isMain' in z && z.isMain) || ('distance' in z && parseInt(z.distance || '99') <= 6)).map((z) => (
                <Link
                  key={z.slug}
                  href={`/rideau-metallique-${z.slug}`}
                  className="px-5 py-2.5 bg-white text-gray-700 text-sm font-semibold border border-primary-200 hover:border-primary-400 hover:bg-primary-50 hover:text-primary-700 hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
                  style={{ borderRadius: "8px" }}
                >
                  {z.name}
                  <span className="text-primary-400 ml-2">{z.postalCode}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Proches (5-15 km) */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-3 h-3 bg-amber-500 rounded-full" />
              <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Communes proches</h3>
              <span className="text-xs text-gray-400 font-medium">7 -- 15 km</span>
              <div className="flex-1 h-px bg-gray-200 ml-2" />
            </div>
            <div className="flex flex-wrap gap-2.5">
              {zones.filter(z => !('isMain' in z) && 'distance' in z && parseInt(z.distance || '0') >= 7 && parseInt(z.distance || '0') <= 15).map((z) => (
                <Link
                  key={z.slug}
                  href={`/rideau-metallique-${z.slug}`}
                  className="px-5 py-2.5 bg-white text-gray-600 text-sm font-medium border border-gray-200 hover:border-amber-300 hover:bg-amber-50 hover:text-amber-700 hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
                  style={{ borderRadius: "8px" }}
                >
                  {z.name}
                  <span className="text-gray-300 ml-2">{z.postalCode}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Etendues (15-45 km) */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-3 h-3 bg-gray-400 rounded-full" />
              <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Zone etendue</h3>
              <span className="text-xs text-gray-400 font-medium">20 -- 45 km</span>
              <div className="flex-1 h-px bg-gray-200 ml-2" />
            </div>
            <div className="flex flex-wrap gap-2.5">
              {zones.filter(z => !('isMain' in z) && 'distance' in z && parseInt(z.distance || '0') >= 16).map((z) => (
                <Link
                  key={z.slug}
                  href={`/rideau-metallique-${z.slug}`}
                  className="px-5 py-2.5 bg-white text-gray-500 text-sm font-medium border border-gray-200 hover:border-gray-400 hover:bg-gray-100 hover:text-gray-700 hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
                  style={{ borderRadius: "8px" }}
                >
                  {z.name}
                  <span className="text-gray-300 ml-2">{z.postalCode}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FAQ items={content.faq.length > 0 ? content.faq : faq} title="Questions Fréquentes" />
      <Reviews items={content.reviews} title={`Avis Clients ${siteConfig.city}`} />
      <CTA />
    </main>
  );
}
