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
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 bg-dark overflow-hidden">
        <div className="hidden" />
        <div className="container relative z-10 text-center">
          <div className="w-12 h-1 bg-primary-600 mx-auto mb-8" style={{borderRadius:"4px"}}/>
          <h1 className="font-bold text-4xl md:text-5xl lg:text-6xl text-white leading-[1.1] mb-4">
            Zones d&apos;intervention
          </h1>
          <p className="text-white/40 text-lg max-w-lg mx-auto">
            Intervention rapide sur {siteConfig.city} et toute l&apos;agglomération.
          </p>
        </div>
      </section>

      {/* Main city */}
      {mainCity && (
        <section className="section bg-white">
          <div className="container">
            <div className="max-w-3xl">
              <div className="w-12 h-1 bg-primary-600 mb-6" style={{borderRadius:"4px"}} />
              <h2 className="font-bold text-3xl md:text-4xl text-gray-900 mb-4">{mainCity.name}</h2>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                Basés à {mainCity.name}, nous intervenons en 1 heure maximum pour tous vos besoins en rideau métallique.
              </p>
              <a href={siteConfig.phoneLink} className="btn-phone">{siteConfig.phone}</a>
            </div>
          </div>
        </section>
      )}

      {/* All zones */}
      <section className="section bg-gray-50">
        <div className="container">
          <div className="max-w-xl mb-14">
            <div className="w-12 h-1 bg-primary-600 mb-6" style={{borderRadius:"4px"}} />
            <h2 className="section-title">Toutes nos zones</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-px bg-gray-200">
            {otherZones.map((zone) => (
              <Link key={zone.slug} href={`/zones/${zone.slug}`}
                className="bg-gray-50 p-4 text-center hover:bg-white transition-colors group">
                <h3 className="font-heading font-bold text-gray-900 text-sm group-hover:text-primary-600 transition-colors">{zone.name}</h3>
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
