import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { siteConfig, zones } from "@/config/site";
import { CTA } from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: `Zones d'Intervention Rideau Métallique ${siteConfig.city} et ${siteConfig.department}`,
  description: `Dépannage rideau métallique à ${siteConfig.city} et environs : 16 arrondissements + 15 communes (${siteConfig.department}). Intervention rapide 24h/24. ${siteConfig.phone}`,
  keywords: `rideau métallique ${siteConfig.city}, zones intervention ${siteConfig.department}, dépannage rideau ${siteConfig.departmentCode}`,
  openGraph: {
    title: `Zones d'Intervention Rideau Métallique ${siteConfig.city} et ${siteConfig.department}`,
    description: `Dépannage rideau métallique à ${siteConfig.city} et environs : 16 arrondissements + 15 communes. Intervention rapide 24h/24.`,
    type: "website",
    url: `${siteConfig.url}/zones/`,
  },
  alternates: {
    canonical: `${siteConfig.url}/zones/`,
  },
};

export default function ZonesPage() {
  const mainCity = zones.find(z => 'isMain' in z);
  const otherZones = zones.filter(z => !('isMain' in z));

  // Schema.org BreadcrumbList
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Accueil", "item": siteConfig.url },
      { "@type": "ListItem", "position": 2, "name": "Zones d'intervention", "item": `${siteConfig.url}/zones` },
    ],
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden bg-gray-900">
        <Image
          src="/images/gallery/hero-bg-technicien-drm.webp"
          alt={`Zones intervention rideau metallique ${siteConfig.city}`}
          title={`Zones intervention rideau metallique ${siteConfig.city}`}
          fill
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/90 to-gray-900/70" />
        <div className="container relative z-10 py-16 md:py-20">
          <nav className="mb-6" aria-label="Fil d'Ariane">
            <ol className="flex items-center gap-2 text-sm text-white/40">
              <li><Link href="/" className="hover:text-white/60 transition-colors">Accueil</Link></li>
              <li>/</li>
              <li className="text-white/70 font-semibold">Zones d&apos;intervention</li>
            </ol>
          </nav>
          <p className="section-label text-primary-400">Nos zones</p>
          <h1 className="text-white">
            Zones d&apos;intervention
          </h1>
          <div className="divider-industrial-lg mt-4" />
          <p className="text-white/60 mt-4 text-lg max-w-lg">
            Intervention rapide sur {siteConfig.city} et toute l&apos;agglomération.
          </p>
        </div>
        <div className="absolute top-0 right-0 w-1 h-full bg-primary-600 hidden lg:block" />
      </section>

      {/* ─── VILLE PRINCIPALE ─── */}
      {mainCity && (
        <section className="section bg-white bg-crosshatch">
          <div className="container">
            <div className="max-w-3xl">
              <p className="section-label">Ville principale</p>
              <h2 className="section-title">{mainCity.name}</h2>
              <div className="divider-industrial mt-4" />
              <p className="text-gray-500 text-lg mt-4 mb-8 leading-relaxed">
                Basés à {mainCity.name}, nous intervenons en 1 heure maximum pour tous vos besoins en rideau métallique.
              </p>
              <a href={siteConfig.phoneLink} className="btn-phone">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {siteConfig.phone}
              </a>
            </div>
          </div>
        </section>
      )}

      {/* ─── TOUTES LES ZONES ─── */}
      <section className="section bg-gray-50 bg-dots-pattern">
        <div className="container">
          <div className="max-w-xl mb-14">
            <p className="section-label">Communes</p>
            <h2 className="section-title">Toutes nos zones</h2>
            <div className="divider-industrial mt-4" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {otherZones.map((zone) => (
              <Link key={zone.slug} href={`/zones/${zone.slug}`}
                className="group bg-white border-l-4 border-l-primary-500 border border-gray-200 p-5 text-center hover:border-l-primary-700 transition-all">
                <h3 className="font-bold text-gray-900 text-sm group-hover:text-primary-600 transition-colors">{zone.name}</h3>
                <p className="text-xs text-gray-400 mt-0.5">{zone.postalCode}</p>
                {'distance' in zone && (
                  <p className="text-[10px] text-gray-300 mt-1">{(zone as { distance: string }).distance}</p>
                )}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </main>
  );
}
