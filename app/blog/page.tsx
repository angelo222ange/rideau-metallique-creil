import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { blogArticles } from "@/content/blog";

export const metadata: Metadata = {
  title: `Blog Rideau Métallique ${siteConfig.city} - Conseils et Guides`,
  description: `Conseils, guides et actualités sur les rideaux métalliques à ${siteConfig.city}. Entretien, dépannage, installation, prix : tout savoir pour protéger votre commerce.`,
  keywords: `blog rideau métallique ${siteConfig.city}, conseils rideau métallique, guide dépannage rideau, entretien rideau métallique`,
  openGraph: {
    title: `Blog Rideau Métallique ${siteConfig.city} - Conseils et Guides`,
    description: `Conseils, guides et actualités sur les rideaux métalliques à ${siteConfig.city}. Entretien, dépannage, installation, prix.`,
    type: "website",
    url: `${siteConfig.url}/blog/`,
  },
  alternates: {
    canonical: `${siteConfig.url}/blog/`,
  },
};

export default function BlogPage() {
  const sortedArticles = [...blogArticles].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Accueil", "item": siteConfig.url },
      { "@type": "ListItem", "position": 2, "name": "Blog", "item": `${siteConfig.url}/blog` },
    ],
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-white">
        <div className="h-1 bg-gradient-to-r from-primary-600 via-emerald-500 to-primary-700" />
        <div className="container py-16 md:py-20 lg:py-24 text-center">
          <nav className="mb-6" aria-label="Fil d'Ariane">
            <ol className="flex items-center justify-center gap-2 text-xs text-gray-400">
              <li><Link href="/" className="hover:text-primary-600 transition-colors">Accueil</Link></li>
              <li>/</li>
              <li className="text-gray-700 font-bold">Blog</li>
            </ol>
          </nav>
          <span className="inline-block px-3 py-1 bg-primary-50 text-primary-700 text-xs font-semibold uppercase tracking-wider mb-4" style={{borderRadius:'6px'}}>Actualités</span>
          <h1 className="font-bold text-4xl md:text-5xl lg:text-6xl text-gray-900 leading-[1.1] mb-4">
            Blog
          </h1>
          <p className="text-gray-500 text-lg max-w-lg mx-auto">
            Conseils, guides et actualités sur les rideaux métalliques à {siteConfig.city}.
          </p>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedArticles.map((article) => (
              <Link
                key={article.slug}
                href={`/blog/${article.slug}`}
                className="group block bg-white border border-gray-100 hover:border-primary-200 transition-all overflow-hidden"
                style={{ borderRadius: '10px' }}
              >
                <article>
                  {/* Image */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                    <Image
                      src={article.image}
                      alt={article.imageAlt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>

                  <div className="p-5">
                    {/* Meta */}
                    <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                      <time dateTime={article.date}>
                        {new Date(article.date).toLocaleDateString('fr-FR', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </time>
                      <span className="text-gray-200">|</span>
                      <span>{article.readTime} de lecture</span>
                    </div>

                    {/* Title */}
                    <h2 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-primary-600 transition-colors leading-snug">
                      {article.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">
                      {article.excerpt}
                    </p>

                    {/* Read more */}
                    <span className="inline-flex items-center gap-1 text-sm font-bold text-primary-600 mt-4 group-hover:gap-2 transition-all">
                      Lire l&apos;article
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container text-center">
          <span className="inline-block px-3 py-1 bg-primary-50 text-primary-700 text-xs font-semibold uppercase tracking-wider mb-4" style={{borderRadius:'6px'}}>Professionnel</span>
          <h2 className="font-bold text-3xl md:text-4xl text-gray-900 mb-4">
            Besoin d&apos;un professionnel ?
          </h2>
          <p className="text-gray-500 text-lg mb-8 max-w-lg mx-auto">
            {siteConfig.name} intervient 24h/24 pour tous vos besoins en rideau métallique à {siteConfig.city}.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
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
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-gray-700 bg-white border-2 border-gray-200 hover:border-primary-300 hover:text-primary-700 transition-all"
              style={{ borderRadius: '8px' }}
            >
              Devis gratuit
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
