import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig, zones, services } from "@/config/site";
import { blogArticles } from "@/content/blog";

export const metadata: Metadata = {
  title: `Plan du Site`,
  description: `Plan du site ${siteConfig.domain}. Retrouvez toutes les pages : services, zones d'intervention, blog, contact.`,
  robots: { index: true, follow: true },
  alternates: {
    canonical: `${siteConfig.url}/plan-du-site/`,
  },
};

export default function PlanDuSitePage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Plan du site", item: `${siteConfig.url}/plan-du-site` },
    ],
  };

  return (
    <main className="pt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <nav aria-label="Fil d'Ariane" className="bg-gray-50 border-b border-gray-100">
        <div className="container py-3">
          <ol className="flex items-center gap-1.5 text-sm">
            <li>
              <Link href="/" className="text-gray-500 hover:text-primary-600 transition-colors">Accueil</Link>
            </li>
            <li>
              <svg className="w-4 h-4 text-gray-400 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </li>
            <li className="text-primary-600 font-medium">Plan du site</li>
          </ol>
        </div>
      </nav>

      <section className="section bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-bold text-3xl md:text-4xl text-gray-900 mb-10">Plan du Site</h1>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {/* Pages principales */}
              <div>
                <h2 className="font-bold text-gray-900 text-lg mb-4">Pages principales</h2>
                <div className="h-px bg-gray-200 mb-4" />
                <ul className="space-y-2">
                  <li><Link href="/" className="text-gray-600 text-sm hover:text-primary-600 transition-colors">Accueil</Link></li>
                  <li><Link href="/contact" className="text-gray-600 text-sm hover:text-primary-600 transition-colors">Contact</Link></li>
                  <li><Link href="/tarifs" className="text-gray-600 text-sm hover:text-primary-600 transition-colors">Tarifs</Link></li>
                  <li><Link href="/a-propos" className="text-gray-600 text-sm hover:text-primary-600 transition-colors">A propos</Link></li>
                  <li><Link href="/avis" className="text-gray-600 text-sm hover:text-primary-600 transition-colors">Avis clients</Link></li>
                  <li><Link href="/zones" className="text-gray-600 text-sm hover:text-primary-600 transition-colors">Zones d&apos;intervention</Link></li>
                  <li><Link href="/blog" className="text-gray-600 text-sm hover:text-primary-600 transition-colors">Blog</Link></li>
                </ul>
              </div>

              {/* Services */}
              <div>
                <h2 className="font-bold text-gray-900 text-lg mb-4">Services</h2>
                <div className="h-px bg-gray-200 mb-4" />
                <ul className="space-y-2">
                  {services.filter(s => s.hasPage).map((service) => (
                    <li key={service.id}>
                      <Link
                        href={`/${service.slug}-rideau-metallique-creil`}
                        className="text-gray-600 text-sm hover:text-primary-600 transition-colors"
                      >
                        {service.name} rideau metallique {siteConfig.city}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Zones */}
              <div>
                <h2 className="font-bold text-gray-900 text-lg mb-4">Zones d&apos;intervention</h2>
                <div className="h-px bg-gray-200 mb-4" />
                <ul className="space-y-2">
                  {zones.filter(z => !('isMain' in z)).map((zone) => (
                    <li key={zone.slug}>
                      <Link
                        href={`/rideau-metallique-${zone.slug}`}
                        className="text-gray-600 text-sm hover:text-primary-600 transition-colors"
                      >
                        Rideau metallique {zone.name} ({zone.postalCode})
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Blog */}
              <div>
                <h2 className="font-bold text-gray-900 text-lg mb-4">Articles de blog</h2>
                <div className="h-px bg-gray-200 mb-4" />
                <ul className="space-y-2">
                  {blogArticles.map((article) => (
                    <li key={article.slug}>
                      <Link
                        href={`/blog/${article.slug}`}
                        className="text-gray-600 text-sm hover:text-primary-600 transition-colors"
                      >
                        {article.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Informations legales */}
              <div>
                <h2 className="font-bold text-gray-900 text-lg mb-4">Informations legales</h2>
                <div className="h-px bg-gray-200 mb-4" />
                <ul className="space-y-2">
                  <li><Link href="/mentions-legales" className="text-gray-600 text-sm hover:text-primary-600 transition-colors">Mentions legales</Link></li>
                  <li><Link href="/confidentialite" className="text-gray-600 text-sm hover:text-primary-600 transition-colors">Politique de confidentialite</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
