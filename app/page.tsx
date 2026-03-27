import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { WhyUs } from "@/components/sections/WhyUs";
import { Zones } from "@/components/sections/Zones";

import { FAQ } from "@/components/sections/FAQ";
import { CTA } from "@/components/sections/CTA";
import { Reviews } from "@/components/sections/Reviews";
import { AlternatingFeatures } from "@/components/sections/AlternatingFeatures";
import { getPageContent } from "@/lib/content";
import faqData from "@/content/faq.json";

import homeContent from "@/content/pages/home.json";

const content = getPageContent(homeContent);

export const metadata: Metadata = {
  title: `Dépannage Rideau Métallique ${siteConfig.city} - Urgence 24h/24 7j/7`,
  description: `Dépannage rideau métallique à ${siteConfig.city} ✓ Intervention en -30 min ✓ 24h/24 7j/7 ✓ Devis gratuit ✓ ${siteConfig.reviews.rating}/5 (${siteConfig.reviews.count} avis). ☎️ ${siteConfig.phone}`,
  keywords: `dépannage rideau métallique ${siteConfig.city}, réparation rideau métallique ${siteConfig.department}, rideau métallique bloqué ${siteConfig.city}`,
  alternates: {
    canonical: `${siteConfig.url}/`,
  },
};

export default function HomePage() {
  const faq = getPageContent(faqData);

  // Schema.org BreadcrumbList
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Accueil", "item": siteConfig.url },
    ],
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Hero sideImage="/images/gallery/Drapeau-rideau-metallique-motorisation-centrale-3D.webp" />

      <Services />

      {/* Intervention Express — Steps */}
      <section className="section bg-secondary-sable">
        <div className="container">
          <div className="max-w-xl mb-14">
            <div className="rule-accent mb-6" />
            <h2 className="section-title">{content.deblocage.title}</h2>
            <p className="section-subtitle">{content.deblocage.description}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-gray-200">
            {content.deblocage.steps.map((step, index) => (
              <div key={index} className="py-6 lg:py-0 lg:px-8 first:lg:pl-0 last:lg:pr-0">
                <span className="font-display text-5xl text-gray-200 block mb-3">
                  {step.step}
                </span>
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

      {/* Pannes courantes */}
      <section className="section bg-white">
        <div className="container">
          <div className="max-w-xl mb-14">
            <div className="rule-accent mb-6" />
            <h2 className="section-title">{content.pannes.title}</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-200">
            {content.pannes.items.map((panne, index) => (
              <div key={index} className="bg-white p-8 group">
                <div className="flex items-start gap-4">
                  <span className="font-display text-3xl text-gray-200 leading-none">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-heading font-bold text-gray-900">{panne.title}</h3>
                      <span className={`text-[10px] font-bold uppercase tracking-wider ${
                        panne.urgency === 'urgent' ? 'text-red-500'
                          : panne.urgency === 'moyen' ? 'text-secondary-terracotta'
                          : 'text-gray-400'
                      }`}>
                        {panne.urgency === 'urgent' ? 'Urgent' : panne.urgency === 'moyen' ? 'Moyen' : 'Faible'}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed">{panne.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Urgence 24/7 */}
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
                {content.urgence.stats.map((stat, index) => (
                  <div key={index}>
                    <p className="font-display text-3xl text-secondary-terracotta">{stat.value}</p>
                    <p className="text-white/30 text-xs mt-0.5">{stat.label}</p>
                  </div>
                ))}
              </div>

              <a href={siteConfig.phoneLink}
                className="inline-flex items-center gap-2 px-7 py-3.5 text-[15px] font-bold text-white transition-colors"
                style={{ background: '#dc2626', borderRadius: '4px' }}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Appel Urgence : {siteConfig.phone}
              </a>
            </div>

            <div className="space-y-0 divide-y divide-white/[0.06]">
              <h3 className="font-heading font-bold text-white text-sm uppercase tracking-wider pb-4">
                Cas d&apos;urgence fréquents
              </h3>
              {content.urgence.cases.map((cas, index) => (
                <div key={index} className="flex items-center gap-3 py-4 text-white/50 text-sm hover:text-white/80 transition-colors">
                  <span className="w-1 h-1 bg-red-400 rounded-full flex-shrink-0" />
                  {cas}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <WhyUs />
      
      {/* Sections alternées SEO-optimisées */}
      {content.alternatingFeatures && (
        <AlternatingFeatures features={content.alternatingFeatures} bgColor="bg-white" />
      )}

      <Zones limit={18} />

      <Reviews items={content.reviews} title={`Avis Clients ${siteConfig.city}`} />
      <FAQ items={content.faq.length > 0 ? content.faq : faq} title={`Questions Fréquentes`} />
      <CTA />
    </main>
  );
}
