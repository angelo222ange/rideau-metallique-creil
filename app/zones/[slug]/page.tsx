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

      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden bg-gray-900">
        <Image
          src="/images/gallery/hero-bg-technicien-drm.webp"
          alt={`Rideau metallique ${zone.name}`}
          title={`Rideau metallique ${zone.name}`}
          fill
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/90 to-gray-900/70" />
        <div className="container relative z-10 py-16 md:py-20">
          <nav className="mb-6" aria-label="Fil d'Ariane">
            <ol className="flex items-center gap-2 text-sm text-white/40">
              <li><Link href="/" className="hover:text-white/60 transition-colors">Accueil</Link></li>
              <li>/</li>
              <li><Link href="/zones" className="hover:text-white/60 transition-colors">Zones</Link></li>
              <li>/</li>
              <li className="text-white/70 font-semibold">{zone.name}</li>
            </ol>
          </nav>
          <p className="section-label text-primary-400">{zone.name} ({zone.postalCode})</p>
          <h1 className="text-white">
            Rideau Métallique <span className="text-primary-400">{zone.name}</span>
          </h1>
          <div className="divider-industrial-lg mt-4" />
          <p className="text-white/60 mt-4 text-lg max-w-xl mb-8">
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
            <a href={siteConfig.phoneLink} className="btn-phone">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {siteConfig.phone}
            </a>
            <Link href="/contact" className="btn-secondary border-white/30 text-white hover:bg-white hover:text-gray-900">
              Devis gratuit
            </Link>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-1 h-full bg-primary-600 hidden lg:block" />
      </section>

      {/* ─── SERVICES DISPONIBLES ─── */}
      <section className="section bg-white bg-crosshatch">
        <div className="container">
          <div className="mb-12">
            <p className="section-label">Nos services</p>
            <h2 className="section-title">Nos services à {zone.name}</h2>
            <div className="divider-industrial mt-4" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.filter(s => s.hasPage).map((s) => (
              <Link
                key={s.id}
                href={`/${s.slug}-rideau-metallique-${zone.slug}`}
                className="card flex items-center justify-between group"
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

      {/* ─── INFOS LOCALES ─── */}
      <section className="section bg-gray-50 bg-dots-pattern">
        <div className="container">
          <div className="max-w-3xl">
            <p className="section-label">Expertise locale</p>
            <h2 className="section-title">Rideau métallique à {zone.name}</h2>
            <div className="divider-industrial mt-4" />
            <div className="mt-6 prose">
              <p>
                Vous recherchez un spécialiste du <strong>rideau métallique à {zone.name}</strong> ?
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
                <div key={i} className="flex items-center gap-4 p-4 bg-white border-l-4 border-l-primary-500 border border-gray-200 hover:border-l-primary-700 transition-all">
                  <span className="w-10 h-10 flex items-center justify-center bg-primary-600 text-white font-bold text-sm flex-shrink-0">{String(i + 1).padStart(2, '0')}</span>
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
