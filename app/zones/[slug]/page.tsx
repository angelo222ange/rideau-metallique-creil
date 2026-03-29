import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { siteConfig, zones, services } from "@/config/site";
import { FAQ } from "@/components/sections/FAQ";
import { CTA } from "@/components/sections/CTA";
import { AlternatingFeatures } from "@/components/sections/AlternatingFeatures";
import { ZoneLocalSection } from "@/components/subcity/ZoneLocalSection";
import { getPageContent } from "@/lib/content";
import { zoneLocalData } from "@/content/zones-local";
import faqData from "@/content/faq.json";
import zoneContent from "@/content/pages/zones/zone-content.json";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return zones.filter(zone => !('isMain' in zone)).map((zone) => ({ slug: zone.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const zone = zones.find((z) => z.slug === params.slug);
  if (!zone) return { title: "Zone non trouvée" };

  const title = `Rideau Métallique ${zone.name} (${zone.postalCode}) | ${siteConfig.name}`;
  const description = `Dépannage rideau métallique à ${zone.name} (${zone.postalCode}), ${siteConfig.department}. Installation, fabrication, motorisation, entretien. Intervention rapide 24h/24. ${siteConfig.phone}`;

  return {
    title,
    description,
    keywords: `rideau métallique ${zone.name}, dépannage ${zone.name}, installation rideau ${zone.postalCode}`,
    openGraph: {
      title,
      description,
      type: "website",
      url: `${siteConfig.url}/zones/${zone.slug}`,
    },
    alternates: {
      canonical: `${siteConfig.url}/zones/${zone.slug}/`,
    },
  };
}

export default function ZonePage({ params }: Props) {
  const zone = zones.find((z) => z.slug === params.slug);
  if (!zone) notFound();

  // Contexte pour les variables
  const context = {
    zone: zone.name,
    zonePostal: zone.postalCode,
  };

  // Contenu avec variables remplacées
  const content = getPageContent(zoneContent, context);

  const zoneFaq = getPageContent(faqData).map(item => ({
    ...item,
    answer: item.answer.replace(new RegExp(siteConfig.city, 'g'), zone.name),
  }));

  // Schema.org BreadcrumbList
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Accueil", "item": siteConfig.url },
      { "@type": "ListItem", "position": 2, "name": "Zones d'intervention", "item": `${siteConfig.url}/zones` },
      { "@type": "ListItem", "position": 3, "name": zone.name, "item": `${siteConfig.url}/zones/${zone.slug}` },
    ],
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero dark compact */}
      <section className="relative overflow-hidden">
        <Image
          src="/images/gallery/hero-bg-technicien-drm.webp"
          alt={`Rideau metallique ${zone.name}`}
          title={`Rideau metallique ${zone.name}`}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gray-950/90" />
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-primary-600/10 rounded-full blur-3xl" />

        <div className="container relative z-10 py-14 md:py-20">
          <nav className="mb-6" aria-label="Fil d'Ariane">
            <ol className="flex items-center gap-2 text-xs text-white/30">
              <li><Link href="/" className="hover:text-primary-400 transition-colors">Accueil</Link></li>
              <li>/</li>
              <li><Link href="/zones" className="hover:text-primary-400 transition-colors">Zones</Link></li>
              <li>/</li>
              <li className="text-white/60 font-medium">{zone.name}</li>
            </ol>
          </nav>

          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/[0.06] border border-white/[0.08] text-white/70 text-sm font-medium mb-5" style={{ borderRadius: '100px' }}>
            <span className="w-2 h-2 bg-primary-400 rounded-full animate-pulse" />
            {zone.name} ({zone.postalCode})
          </span>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-[1.1] mb-5 tracking-tight">
            Rideau Métallique <span className="text-primary-400">{zone.name}</span>
          </h1>

          <p className="text-white/40 text-lg leading-relaxed mb-8 max-w-xl">
            Intervention rapide en 1 heure à {zone.name} ({zone.postalCode}). Dépannage, installation, motorisation. 24h/24.
          </p>

          {/* Stats inline */}
          <div className="flex flex-wrap gap-6 text-sm text-white/30 mb-8">
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>
              <span className="text-white/60">{siteConfig.reviews.rating}/5</span> ({siteConfig.reviews.count} avis)
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span className="text-white/60">Intervention -30 min</span>
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              <span className="text-white/60">Garantie incluse</span>
            </span>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href={siteConfig.phoneLink}
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-gray-900 font-semibold hover:bg-gray-100 transition-colors"
              style={{ borderRadius: '8px' }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {siteConfig.phone}
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 text-white font-semibold border border-white/20 hover:bg-white/10 transition-colors"
              style={{ borderRadius: '8px' }}
            >
              Devis gratuit
            </Link>
          </div>
        </div>
      </section>

      {/* Services disponibles */}
      <section className="relative py-20 md:py-28 bg-white overflow-hidden">
        <div className="absolute -bottom-24 -right-24 w-[400px] h-[400px] bg-primary-50 rounded-full blur-3xl" />
        <div className="container relative z-10">
          <div className="mb-12">
            <p className="text-primary-600 text-sm font-semibold uppercase tracking-widest mb-3">Nos services</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">Nos services à {zone.name}</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.filter(s => s.hasPage).map((s) => (
              <Link
                key={s.id}
                href={`/${s.slug}-rideau-metallique-${zone.slug}`}
                className="group flex items-center justify-between p-5 bg-white border border-gray-100 hover:border-primary-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                style={{ borderRadius: '16px' }}
              >
                <div>
                  <span className="font-bold text-gray-900 group-hover:text-primary-600 transition-colors block">{s.name}</span>
                  <span className="text-gray-400 text-sm mt-0.5 block">{s.shortDesc}</span>
                </div>
                <svg className="w-5 h-5 text-gray-300 group-hover:text-primary-600 group-hover:translate-x-1 transition-all flex-shrink-0 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Sections alternées SEO-optimisées */}
      {content.alternatingFeatures && (
        <AlternatingFeatures features={content.alternatingFeatures} bgColor="bg-gray-50" />
      )}

      {/* Infos locales */}
      <section className="relative py-20 md:py-28 bg-gray-50 overflow-hidden">
        <div className="absolute top-20 -left-20 w-[350px] h-[350px] bg-primary-100/40 rounded-full blur-3xl" />
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <p className="text-primary-600 text-sm font-semibold uppercase tracking-widest mb-3">Expertise locale</p>
            <h2 className="font-extrabold text-3xl md:text-4xl text-gray-900 tracking-tight">Rideau métallique à {zone.name}</h2>
            <div className="mt-6 space-y-4">
              <p className="text-gray-500 text-lg leading-relaxed">
                Vous recherchez un spécialiste du <strong className="text-gray-900">rideau métallique à {zone.name}</strong> ?
                {siteConfig.name} intervient rapidement sur {zone.name} ({zone.postalCode}) pour tous vos besoins :
                dépannage, installation, motorisation et entretien.
              </p>
            </div>

            <div className="mt-10 space-y-4">
              {[
                { title: "Intervention en 1 heure", desc: `sur ${zone.name}` },
                { title: "Disponible 24h/24", desc: "y compris week-ends et jours fériés" },
                { title: "Devis gratuit", desc: "avant intervention" },
                { title: "Techniciens qualifiés", desc: "toutes marques" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-4 bg-white border border-gray-100 shadow-sm hover:-translate-y-0.5 transition-all duration-300" style={{ borderRadius: '16px' }}>
                  <span className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-primary-600 to-primary-700 text-white font-bold text-sm flex-shrink-0" style={{ borderRadius: '8px' }}>{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <p className="font-bold text-gray-900 text-[15px]">{item.title}</p>
                    <p className="text-gray-500 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contenu hyper-local */}
      {zoneLocalData[zone.slug] && (
        <ZoneLocalSection
          zoneName={zone.name}
          zonePostal={zone.postalCode}
          zoneSlug={zone.slug}
          serviceName="Rideau métallique"
          serviceSlug=""
          localData={zoneLocalData[zone.slug]}
        />
      )}

      <FAQ items={zoneFaq.slice(0, 5)} title={`FAQ - Rideau Métallique ${zone.name}`} />
      <CTA title={`Besoin d'un dépannage à ${zone.name} ?`} />
    </main>
  );
}
