import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig, zones } from "@/config/site";
import { CTA } from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: `Zones d'Intervention Rideau Métallique ${siteConfig.city} et ${siteConfig.department}`,
  description: `Dépannage rideau métallique à ${siteConfig.city} et environs : 16 arrondissements + 15 communes (${siteConfig.department}). Intervention rapide 24h/24. ☎️ ${siteConfig.phone}`,
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

      {/* Hero */}
      <section className="relative overflow-hidden bg-white">
        <div className="h-1 bg-gradient-to-r from-primary-600 via-emerald-500 to-primary-700" />
        <div className="container py-16 md:py-20 lg:py-24 text-center">
          <nav className="mb-6" aria-label="Fil d'Ariane">
            <ol className="flex items-center justify-center gap-2 text-xs text-gray-400">
              <li><Link href="/" className="hover:text-primary-600 transition-colors">Accueil</Link></li>
              <li>/</li>
              <li className="text-gray-700 font-bold">Zones d&apos;intervention</li>
            </ol>
          </nav>
          <span className="inline-block px-3 py-1 bg-primary-50 text-primary-700 text-xs font-semibold uppercase tracking-wider mb-4" style={{borderRadius:'6px'}}>Nos zones</span>
          <h1 className="font-bold text-4xl md:text-5xl lg:text-6xl text-gray-900 leading-[1.1] mb-4">
            Zones d&apos;intervention
          </h1>
          <p className="text-gray-500 text-lg max-w-lg mx-auto">
            Intervention rapide sur {siteConfig.city} et toute l&apos;agglomération.
          </p>
        </div>
      </section>

      {/* Main city */}
      {mainCity && (
        <section className="py-20 md:py-28 bg-gray-50">
          <div className="container">
            <div className="max-w-3xl">
              <span className="inline-block px-3 py-1 bg-primary-50 text-primary-700 text-xs font-semibold uppercase tracking-wider mb-4" style={{borderRadius:'6px'}}>Ville principale</span>
              <h2 className="font-bold text-3xl md:text-4xl text-gray-900 mb-4">{mainCity.name}</h2>
              <p className="text-gray-500 text-lg mb-8 leading-relaxed">
                Basés à {mainCity.name}, nous intervenons en 1 heure maximum pour tous vos besoins en rideau métallique.
              </p>
              <a
                href={siteConfig.phoneLink}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-primary-600 hover:bg-primary-700 transition-all shadow-lg shadow-primary-600/25"
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

      {/* All zones */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container">
          <div className="max-w-xl mb-14">
            <span className="inline-block px-3 py-1 bg-primary-50 text-primary-700 text-xs font-semibold uppercase tracking-wider mb-4" style={{borderRadius:'6px'}}>Communes</span>
            <h2 className="font-bold text-3xl md:text-4xl text-gray-900">Toutes nos zones</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {otherZones.map((zone) => (
              <Link key={zone.slug} href={`/zones/${zone.slug}`}
                className="bg-white border border-gray-100 p-4 text-center hover:border-primary-200 transition-colors group"
                style={{ borderRadius: '10px' }}>
                <h3 className="font-bold text-gray-900 text-sm group-hover:text-primary-600 transition-colors">{zone.name}</h3>
                <p className="text-xs text-gray-400">{zone.postalCode}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </main>
  );
}
