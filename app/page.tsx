import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { siteConfig, services, zones } from "@/config/site";
import { FAQ } from "@/components/sections/FAQ";
import { CTA } from "@/components/sections/CTA";
import { Reviews } from "@/components/sections/Reviews";
import { getPageContent } from "@/lib/content";
import faqData from "@/content/faq.json";
import homeContent from "@/content/pages/home.json";

const content = getPageContent(homeContent);

export const metadata: Metadata = {
  title: `Dépannage Rideau Métallique ${siteConfig.city} - Urgence 24h/24 7j/7`,
  description: `Dépannage rideau métallique à ${siteConfig.city} ✓ Intervention en -30 min ✓ 24h/24 7j/7 ✓ Devis gratuit ✓ ${siteConfig.reviews.rating}/5 (${siteConfig.reviews.count} avis). ${siteConfig.phone}`,
  alternates: { canonical: `${siteConfig.url}/` },
};

export default function HomePage() {
  const faq = getPageContent(faqData);
  const displayServices = services.filter(s => s.hasPage);

  return (
    <main>
      {/* ═══ HERO — full width image bg, white overlay gauche ═══ */}
      <section className="relative min-h-[85vh] flex items-center">
        <Image
          src="/images/gallery/realisation-rideau-metallique-lame-pleine-commerce.webp"
          alt={`Rideau métallique commerce ${siteConfig.city}`}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/60" />

        <div className="container relative z-10 py-20">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-primary-600 flex items-center justify-center text-white font-bold text-xs" style={{ borderRadius: '8px' }}>
                24h
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">Disponible jour et nuit</p>
                <p className="text-xs text-gray-400">7j/7 y compris jours fériés</p>
              </div>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-[1.08] mb-6">
              Dépannage<br />
              Rideau Métallique<br />
              <span className="text-primary-600">{siteConfig.city}</span>
            </h1>

            <p className="text-gray-500 text-lg max-w-lg mb-8 leading-relaxed">
              Intervention en moins de 30 minutes sur {siteConfig.city} et {zones.length} communes de l&apos;{siteConfig.department}. Déblocage, réparation, installation.
            </p>

            <div className="flex flex-wrap gap-3 mb-10">
              <a href={siteConfig.phoneLink} className="btn-primary text-base">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {siteConfig.phone}
              </a>
              <Link href="/contact" className="btn-secondary">
                Devis gratuit en ligne
              </Link>
            </div>

            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-1.5">
                <div className="flex -space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="font-semibold text-gray-900">{siteConfig.reviews.rating}/5</span>
                <span className="text-gray-400">({siteConfig.reviews.count} avis)</span>
              </div>
              <span className="text-gray-300">|</span>
              <span className="text-gray-500">{siteConfig.experience}+ ans</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SERVICES — dark bg, grid cards ═══ */}
      <section className="py-20 bg-gray-900">
        <div className="container">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-primary-400 text-sm font-semibold uppercase tracking-wider mb-2">Nos services</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white">Tous vos besoins en rideau métallique</h2>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {displayServices.slice(0, 4).map((service) => (
              <Link key={service.id} href={`/${service.slug}-rideau-metallique-creil`}
                className="group relative overflow-hidden bg-white/5 border border-white/10 hover:border-primary-500/50 transition-all" style={{ borderRadius: '12px' }}>
                <div className="relative h-44 overflow-hidden">
                  <Image src={service.image} alt={`${service.name} ${siteConfig.city}`} fill className="object-cover group-hover:scale-105 transition-transform duration-500 brightness-75" />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-white mb-1">{service.name}</h3>
                  <p className="text-white/40 text-sm">{service.shortDesc}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="grid md:grid-cols-3 gap-4 mt-4">
            {displayServices.slice(4).map((service) => (
              <Link key={service.id} href={`/${service.slug}-rideau-metallique-creil`}
                className="group flex items-center gap-4 p-4 bg-white/5 border border-white/10 hover:border-primary-500/50 transition-all" style={{ borderRadius: '12px' }}>
                <div className="relative w-16 h-16 flex-shrink-0 overflow-hidden" style={{ borderRadius: '8px' }}>
                  <Image src={service.image} alt={service.name} fill className="object-cover" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">{service.name}</h3>
                  <p className="text-white/40 text-xs">{service.shortDesc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PROCESSUS — timeline ═══ */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center max-w-xl mx-auto mb-16">
            <p className="text-primary-600 text-sm font-semibold uppercase tracking-wider mb-2">Comment ça marche</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{content.deblocage.title}</h2>
          </div>
          <div className="relative max-w-3xl mx-auto">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gray-200 hidden md:block" />
            <div className="space-y-10">
              {content.deblocage.steps.map((step: any, i: number) => (
                <div key={i} className="flex gap-6 items-start">
                  <div className="w-16 h-16 bg-primary-600 text-white font-bold text-xl flex items-center justify-center flex-shrink-0 relative z-10 rounded-full">{step.step}</div>
                  <div className="pt-3">
                    <h3 className="font-bold text-gray-900 text-lg mb-1">{step.title}</h3>
                    <p className="text-gray-500">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="text-center mt-12">
            <a href={siteConfig.phoneLink} className="btn-primary">Déblocage urgent : {siteConfig.phone}</a>
          </div>
        </div>
      </section>

      {/* ═══ PANNES ═══ */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <div className="max-w-xl mb-12">
            <p className="text-red-500 text-sm font-semibold uppercase tracking-wider mb-2">Pannes fréquentes</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{content.pannes.title}</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {content.pannes.items.map((panne: any, i: number) => (
              <div key={i} className="bg-white p-6 border border-gray-100 hover:shadow-md transition-shadow" style={{ borderRadius: '12px' }}>
                <div className="flex items-center justify-between mb-4">
                  <div className={`px-2.5 py-1 text-[10px] font-bold uppercase ${panne.urgency === 'urgent' ? 'text-red-600 bg-red-50' : panne.urgency === 'moyen' ? 'text-amber-600 bg-amber-50' : 'text-gray-500 bg-gray-50'}`} style={{ borderRadius: '4px' }}>
                    {panne.urgency === 'urgent' ? 'Urgent' : panne.urgency === 'moyen' ? 'Moyen' : 'Faible'}
                  </div>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{panne.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{panne.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ URGENCE ═══ */}
      <section className="py-20 bg-gray-900">
        <div className="container">
          <div className="grid lg:grid-cols-5 gap-12 items-start">
            <div className="lg:col-span-3">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-500/15 text-red-400 text-sm font-medium mb-6" style={{ borderRadius: '8px' }}>
                <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
                Urgence 24h/24
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-5">{content.urgence.title}</h2>
              <p className="text-white/40 text-lg mb-8 max-w-xl">{content.urgence.description}</p>
              <div className="grid grid-cols-3 gap-4 mb-8">
                {content.urgence.stats.map((stat: any, i: number) => (
                  <div key={i} className="bg-white/5 p-4 text-center" style={{ borderRadius: '10px' }}>
                    <p className="text-2xl font-bold text-primary-400">{stat.value}</p>
                    <p className="text-white/30 text-xs mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
              <a href={siteConfig.phoneLink} className="inline-flex items-center gap-2 px-6 py-3.5 bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors" style={{ borderRadius: '8px' }}>
                Appel Urgence : {siteConfig.phone}
              </a>
            </div>
            <div className="lg:col-span-2 space-y-2">
              <p className="text-white/30 text-xs font-semibold uppercase tracking-wider mb-3">Cas fréquents</p>
              {content.urgence.cases.map((cas: string, i: number) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-white/5 text-white/60 text-sm" style={{ borderRadius: '8px' }}>
                  <span className="w-1.5 h-1.5 bg-red-400 rounded-full flex-shrink-0 mt-1.5" />
                  {cas}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ POURQUOI NOUS ═══ */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <Image src="/images/gallery/installation-rideau-metallique-drm.webp" alt={`Installation ${siteConfig.city}`} width={600} height={450} className="w-full h-auto object-cover" style={{ borderRadius: '16px' }} />
              <div className="absolute -bottom-6 -right-6 bg-primary-600 text-white p-6 shadow-xl" style={{ borderRadius: '12px' }}>
                <p className="text-3xl font-bold">{siteConfig.interventions}</p>
                <p className="text-white/70 text-sm">interventions</p>
              </div>
            </div>
            <div>
              <p className="text-primary-600 text-sm font-semibold uppercase tracking-wider mb-2">Pourquoi nous choisir</p>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">{siteConfig.experience}+ ans d&apos;expertise</h2>
              <div className="space-y-4">
                {content.whyUs.advantages.slice(0, 6).map((item: { icon: string; title: string; description: string }, i: number) => (
                  <div key={i} className="flex items-start gap-4 p-3 hover:bg-gray-50 transition-colors" style={{ borderRadius: '8px' }}>
                    <div className="w-8 h-8 bg-primary-50 flex items-center justify-center flex-shrink-0" style={{ borderRadius: '8px' }}>
                      <svg className="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-sm">{item.title}</p>
                      <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ ZONES ═══ */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-primary-600 text-sm font-semibold uppercase tracking-wider mb-2">Zone d&apos;intervention</p>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{zones.length} communes couvertes</h2>
            </div>
            <Link href="/zones" className="hidden md:flex items-center gap-2 text-primary-600 text-sm font-medium">
              Toutes les zones <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </div>
          <div className="flex flex-wrap gap-2">
            {zones.slice(0, 18).map((z) => (
              <Link key={z.slug} href={`/zones/${z.slug}`} className="px-4 py-2.5 bg-white text-gray-600 text-sm border border-gray-200 hover:border-primary-300 hover:text-primary-700 hover:shadow-sm transition-all" style={{ borderRadius: '8px' }}>
                {z.name} <span className="text-gray-300 ml-1">{z.postalCode}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Reviews items={content.reviews} title={`Avis Clients ${siteConfig.city}`} />
      <FAQ items={content.faq.length > 0 ? content.faq : faq} title="Questions Fréquentes" />
      <CTA />
    </main>
  );
}
