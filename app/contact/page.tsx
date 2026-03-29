import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { getPageContent } from "@/lib/content";
import { FAQ } from "@/components/sections/FAQ";
import { CTA } from "@/components/sections/CTA";
import { ContactForm } from "@/components/forms/ContactForm";
import pageData from "@/content/pages/contact.json";

const content = getPageContent(pageData);

export const metadata: Metadata = {
  title: `Contact & Devis Gratuit - Rideau Métallique ${siteConfig.city}`,
  description: `Contactez ${siteConfig.name} à ${siteConfig.city}. Disponible 24h/24. ☎️ ${siteConfig.phone} | ${siteConfig.email}`,
  keywords: `contact rideau métallique ${siteConfig.city}, devis rideau métallique ${siteConfig.department}`,
  alternates: {
    canonical: `${siteConfig.url}/contact/`,
  },
};

export default function ContactPage() {
  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": `Contact ${siteConfig.name}`,
    "description": `Contactez ${siteConfig.name} pour vos besoins en rideau métallique à ${siteConfig.city}`,
    "url": `${siteConfig.url}/contact`,
    "mainEntity": {
      "@type": "LocalBusiness",
      "name": siteConfig.name,
      "telephone": siteConfig.phone,
      "email": siteConfig.email,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": siteConfig.streetAddress,
        "addressLocality": siteConfig.city,
        "postalCode": siteConfig.postalCode,
        "addressCountry": "FR",
      },
    },
  };

  // Schema.org BreadcrumbList
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Accueil", "item": siteConfig.url },
      { "@type": "ListItem", "position": 2, "name": "Contact", "item": `${siteConfig.url}/contact` },
    ],
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 bg-dark overflow-hidden">
        <div className="hidden" />
        <div className="container relative z-10 text-center">
          <div className="rule-accent mx-auto mb-8"  />
          <h1 className="font-bold text-4xl md:text-5xl lg:text-6xl text-white leading-[1.1] mb-4">{content.hero.title}</h1>
          <p className="text-white/40 text-lg max-w-lg mx-auto">{content.hero.subtitle}</p>
        </div>
      </section>

      {/* Contact grid */}
      <section className="section bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Left — Coordinates */}
            <div>
              <h2 className="font-heading font-bold text-xs uppercase tracking-widest text-gray-400 mb-8">Nos coordonnées</h2>
              <div className="divide-y divide-gray-100">
                <a href={siteConfig.phoneLink} className="flex items-start gap-4 py-6 group">
                  <div className="w-10 h-10 bg-primary-600 flex items-center justify-center flex-shrink-0" style={{ borderRadius: '8px' }}>
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-heading font-bold text-gray-900 text-lg group-hover:text-primary-600 transition-colors">{siteConfig.phone}</p>
                    <p className="text-primary-600 text-xs font-bold uppercase tracking-wider">24h/24 — 7j/7</p>
                  </div>
                </a>

                <a href={`mailto:${siteConfig.email}`} className="flex items-start gap-4 py-6 group">
                  <div className="w-10 h-10 flex items-center justify-center flex-shrink-0 bg-primary-600" style={{ borderRadius: '8px' }}>
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-heading font-bold text-gray-900 group-hover:text-primary-600 transition-colors">{siteConfig.email}</p>
                    <p className="text-gray-400 text-xs">Réponse sous 24h</p>
                  </div>
                </a>

                <div className="flex items-start gap-4 py-6">
                  <div className="w-10 h-10 flex items-center justify-center flex-shrink-0 border border-gray-200" style={{ borderRadius: '8px' }}>
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-heading font-bold text-gray-900">{siteConfig.address}</p>
                    <p className="text-gray-400 text-xs">{siteConfig.city} et {siteConfig.department}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 py-6">
                  <div className="w-10 h-10 flex items-center justify-center flex-shrink-0 border border-gray-200" style={{ borderRadius: '8px' }}>
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-heading font-bold text-gray-900">Horaires</p>
                    <p className="text-green-600 text-sm font-bold flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                      {siteConfig.openingHours}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right — Form */}
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="section bg-gray-50">
        <div className="container">
          <div className="text-center max-w-xl mx-auto mb-14">
            <div className="rule-accent mx-auto mb-6" />
            <h2 className="section-title">{content.confiance.title}</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200 max-w-5xl mx-auto">
            {content.confiance.items.map((item, index) => (
              <div key={index} className="bg-gray-50 p-6 text-center">
                <p className="font-bold text-3xl text-gray-900 mb-1">{item.value}</p>
                <p className="font-heading font-bold text-xs uppercase tracking-wider text-gray-400">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Engagements */}
      <section className="section bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="rule-accent mb-6" />
              <h2 className="section-title">{content.engagements.title}</h2>
              <ul className="space-y-3 mt-6">
                {content.engagements.items.map((item, index) => (
                  <li key={index} className="flex items-center gap-3 text-gray-600 text-sm">
                    <svg className="w-4 h-4 text-primary-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-3 gap-px bg-gray-200">
              {content.engagements.stats.map((stat, index) => (
                <div key={index} className="bg-white p-5 text-center">
                  <p className="font-bold text-2xl text-gray-900">{stat.value}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="section bg-gray-50">
        <div className="container">
          <div className="text-center max-w-xl mx-auto mb-10">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Notre zone d&apos;intervention</p>
          </div>
          <div className="overflow-hidden h-[400px]" style={{ borderRadius: '8px' }}>
            <iframe
              src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2904.5!2d${siteConfig.geo.lng}!3d${siteConfig.geo.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z${siteConfig.geo.lat}%2C${siteConfig.geo.lng}!5e0!3m2!1sfr!2sfr!4v1`}
              width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Carte ${siteConfig.name}`} />
          </div>
        </div>
      </section>

      <FAQ items={content.faq} title={`Questions — Contact`} />
      <CTA variant="devis" />
    </main>
  );
}
