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

  // Couleurs alternées pour les cards zones
  const cardColors = [
    'from-primary-600/10 to-primary-600/5',
    'from-emerald-600/10 to-emerald-600/5',
    'from-teal-600/10 to-teal-600/5',
    'from-green-600/10 to-green-600/5',
    'from-primary-700/10 to-primary-700/5',
  ];

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero dark compact */}
      <section className="relative overflow-hidden">
        <Image
          src="/images/gallery/hero-bg-technicien-drm.webp"
          alt={`Zones intervention rideau metallique ${siteConfig.city}`}
          title={`Zones intervention rideau metallique ${siteConfig.city}`}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gray-950/90" />
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-primary-600/10 rounded-full blur-3xl" />

        <div className="container relative z-10 py-14 md:py-20 text-center">
          <nav className="mb-6" aria-label="Fil d'Ariane">
            <ol className="flex items-center justify-center gap-2 text-xs text-white/30">
              <li><Link href="/" className="hover:text-primary-400 transition-colors">Accueil</Link></li>
              <li>/</li>
              <li className="text-white/60 font-medium">Zones d&apos;intervention</li>
            </ol>
          </nav>
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/[0.06] border border-white/[0.08] text-white/70 text-sm font-medium mb-5" style={{ borderRadius: '100px' }}>
            <span className="w-2 h-2 bg-primary-400 rounded-full animate-pulse" />
            Nos zones
          </span>
          <h1 className="font-extrabold text-4xl md:text-5xl lg:text-6xl text-white leading-[1.1] mb-4 tracking-tight">
            Zones d&apos;intervention
          </h1>
          <p className="text-white/40 text-lg max-w-lg mx-auto">
            Intervention rapide sur {siteConfig.city} et toute l&apos;agglomération.
          </p>
        </div>
      </section>

      {/* Main city */}
      {mainCity && (
        <section className="relative py-20 md:py-28 bg-white overflow-hidden">
          <div className="absolute -bottom-24 -left-24 w-[400px] h-[400px] bg-primary-50 rounded-full blur-3xl" />
          <div className="container relative z-10">
            <div className="max-w-3xl">
              <p className="text-primary-600 text-sm font-semibold uppercase tracking-widest mb-3">Ville principale</p>
              <h2 className="font-extrabold text-3xl md:text-4xl text-gray-900 tracking-tight mb-4">{mainCity.name}</h2>
              <p className="text-gray-500 text-lg mb-8 leading-relaxed">
                Basés à {mainCity.name}, nous intervenons en 1 heure maximum pour tous vos besoins en rideau métallique.
              </p>
              <a
                href={siteConfig.phoneLink}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-primary-600 hover:bg-primary-700 transition-all shadow-lg shadow-primary-600/25"
                style={{ borderRadius: '8px' }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {siteConfig.phone}
              </a>
            </div>
          </div>
        </section>
      )}

      {/* All zones grid */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="container">
          <div className="max-w-xl mb-14">
            <p className="text-primary-600 text-sm font-semibold uppercase tracking-widest mb-3">Communes</p>
            <h2 className="font-extrabold text-3xl md:text-4xl text-gray-900 tracking-tight">Toutes nos zones</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {otherZones.map((zone, i) => (
              <Link key={zone.slug} href={`/zones/${zone.slug}`}
                className="group relative overflow-hidden bg-white border border-gray-100 p-5 text-center hover:border-primary-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                style={{ borderRadius: '16px' }}>
                {/* Gradient background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${cardColors[i % cardColors.length]} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                <div className="relative z-10">
                  <h3 className="font-bold text-gray-900 text-sm group-hover:text-primary-600 transition-colors">{zone.name}</h3>
                  <p className="text-xs text-gray-400 mt-0.5">{zone.postalCode}</p>
                  {'distance' in zone && (
                    <p className="text-[10px] text-gray-300 mt-1">{(zone as { distance: string }).distance}</p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </main>
  );
}
