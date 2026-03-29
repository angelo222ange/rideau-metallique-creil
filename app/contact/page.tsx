import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { getPageContent } from "@/lib/content";
import { FAQ } from "@/components/sections/FAQ";
import { CTA } from "@/components/sections/CTA";
import { ContactForm } from "@/components/forms/ContactForm";
import pageData from "@/content/pages/contact.json";

const content = getPageContent(pageData);

export const metadata: Metadata = {
  title: `Contact & Devis Gratuit - Rideau Metallique ${siteConfig.city}`,
  description: `Contactez ${siteConfig.name} a ${siteConfig.city}. Disponible 24h/24. ${siteConfig.phone} | ${siteConfig.email}`,
  keywords: `contact rideau metallique ${siteConfig.city}, devis rideau metallique ${siteConfig.department}`,
  alternates: {
    canonical: `${siteConfig.url}/contact/`,
  },
};

export default function ContactPage() {
  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": `Contact ${siteConfig.name}`,
    "description": `Contactez ${siteConfig.name} pour vos besoins en rideau metallique a ${siteConfig.city}`,
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

      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden bg-gray-900">
        <Image
          src="/images/gallery/hero-bg-technicien-drm.webp"
          alt={`Contact ${siteConfig.name} rideau metallique ${siteConfig.city}`}
          title={`Contact ${siteConfig.name} rideau metallique ${siteConfig.city}`}
          fill
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/90 to-gray-900/70" />
        <div className="container relative z-10 py-16 md:py-20">
          <nav className="mb-6" aria-label="Fil d'Ariane">
            <ol className="flex items-center gap-2 text-sm text-white/40">
              <li><Link href="/" className="hover:text-white/60 transition-colors">Accueil</Link></li>
              <li>/</li>
              <li className="text-white/70 font-semibold">Contact</li>
            </ol>
          </nav>
          <p className="section-label text-primary-400">Contactez-nous</p>
          <h1 className="text-white">
            {content.hero.title}
          </h1>
          <div className="divider-industrial-lg mt-4" />
          <p className="text-white/60 mt-4 text-lg max-w-2xl">
            {content.hero.subtitle}
          </p>
        </div>
        <div className="absolute top-0 right-0 w-1 h-full bg-primary-600 hidden lg:block" />
      </section>

      {/* ─── CONTACT GRID ─── */}
      <section className="section bg-white bg-crosshatch">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Left -- Coordonnees */}
            <div>
              <p className="section-label">Nos coordonnees</p>
              <h2 className="section-title">
                Comment nous joindre
              </h2>
              <div className="divider-industrial mb-8" />
              <div className="space-y-4">
                <a
                  href={siteConfig.phoneLink}
                  className="flex items-start gap-4 p-5 bg-white border-l-4 border-l-primary-500 border border-gray-200 hover:border-l-primary-700 transition-all group"
                >
                  <div className="w-12 h-12 bg-primary-600 text-white flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-lg group-hover:text-primary-600 transition-colors">{siteConfig.phone}</p>
                    <p className="text-primary-600 text-xs font-bold uppercase tracking-wider">24h/24 -- 7j/7</p>
                  </div>
                </a>

                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-start gap-4 p-5 bg-white border-l-4 border-l-primary-500 border border-gray-200 hover:border-l-primary-700 transition-all group"
                >
                  <div className="w-12 h-12 bg-primary-600 text-white flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 group-hover:text-primary-600 transition-colors">{siteConfig.email}</p>
                    <p className="text-gray-500 text-xs">Reponse sous 24h</p>
                  </div>
                </a>

                <div className="flex items-start gap-4 p-5 bg-white border-l-4 border-l-gray-300 border border-gray-200">
                  <div className="w-12 h-12 bg-gray-100 text-gray-600 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{siteConfig.address}</p>
                    <p className="text-gray-500 text-xs">{siteConfig.city} et {siteConfig.department}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 bg-white border-l-4 border-l-gray-300 border border-gray-200">
                  <div className="w-12 h-12 bg-gray-100 text-gray-600 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">Horaires</p>
                    <p className="text-green-600 text-sm font-bold flex items-center gap-1.5">
                      <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      {siteConfig.openingHours}
                    </p>
                  </div>
                </div>
              </div>

              {/* Urgence banner */}
              <div className="mt-8 bg-primary-600 p-6 text-white border-l-4 border-l-primary-800">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-3 h-3 bg-white rounded-full animate-pulse" />
                  <p className="font-bold text-lg uppercase tracking-wide">Urgence rideau metallique ?</p>
                </div>
                <p className="text-white/80 text-sm mb-4">
                  Rideau bloque, effraction, panne moteur ? Appelez immediatement, un technicien intervient en moins de 30 minutes.
                </p>
                <a
                  href={siteConfig.phoneLink}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary-700 font-bold hover:bg-gray-50 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {siteConfig.phone}
                </a>
              </div>
            </div>

            {/* Right -- Form */}
            <ContactForm />
          </div>
        </div>
      </section>

      {/* ─── CONFIANCE ─── */}
      <section className="section bg-gray-50 bg-dots-pattern">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="section-label">Confiance</p>
            <h2 className="section-title">{content.confiance.title}</h2>
            <div className="divider-industrial mx-auto mt-4" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {content.confiance.items.map((item, index) => (
              <div
                key={index}
                className="bg-white border-l-4 border-l-primary-500 border border-gray-200 p-8 text-center hover:border-l-primary-700 transition-colors"
              >
                <p className="stat-number text-primary-600 mb-2">{item.value}</p>
                <p className="stat-label">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ENGAGEMENTS ─── */}
      <section className="section bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="section-label">Engagements</p>
              <h2 className="section-title">{content.engagements.title}</h2>
              <div className="divider-industrial mb-8" />
              <ul className="space-y-3">
                {content.engagements.items.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-gray-600">
                    <div className="w-6 h-6 bg-primary-600 text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {content.engagements.stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white border-l-4 border-l-primary-500 border border-gray-200 p-6 text-center hover:border-l-primary-700 transition-colors"
                >
                  <p className="font-black text-2xl text-gray-900">{stat.value}</p>
                  <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── MAP ─── */}
      <section className="section bg-gray-50">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <p className="section-label">Localisation</p>
            <h2 className="section-title">Notre zone d&apos;intervention</h2>
            <div className="divider-industrial mx-auto mt-4" />
            <p className="section-subtitle mx-auto mt-4">{siteConfig.name} intervient a {siteConfig.city} et dans tout le departement de l&apos;{siteConfig.department}.</p>
          </div>
          <div className="overflow-hidden h-[400px] border border-gray-200">
            <iframe
              src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2904.5!2d${siteConfig.geo.lng}!3d${siteConfig.geo.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z${siteConfig.geo.lat}%2C${siteConfig.geo.lng}!5e0!3m2!1sfr!2sfr!4v1`}
              width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Carte ${siteConfig.name}`}
            />
          </div>
        </div>
      </section>

      <FAQ items={content.faq} title="Questions -- Contact" />
      <CTA variant="devis" />
    </main>
  );
}
