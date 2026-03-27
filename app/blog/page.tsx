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
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 bg-dark overflow-hidden">
        <div className="noise absolute inset-0" />
        <div className="container relative z-10 text-center">
          <div className="rule-accent mx-auto mb-8" style={{ background: '#E07B39' }} />
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-white leading-[1.1] mb-4">
            Blog
          </h1>
          <p className="text-white/40 text-lg max-w-lg mx-auto">
            Conseils, guides et actualités sur les rideaux métalliques à {siteConfig.city}.
          </p>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="section bg-white">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedArticles.map((article) => (
              <Link
                key={article.slug}
                href={`/blog/${article.slug}`}
                className="group block"
              >
                <article>
                  {/* Image */}
                  <div className="relative aspect-[16/10] overflow-hidden mb-5 bg-gray-100" style={{ borderRadius: '2px' }}>
                    <Image
                      src={article.image}
                      alt={article.imageAlt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>

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
                  <h2 className="font-heading font-bold text-gray-900 text-lg mb-2 group-hover:text-primary-600 transition-colors leading-snug">
                    {article.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>

                  {/* Read more */}
                  <span className="inline-flex items-center gap-1 text-sm font-bold text-secondary-terracotta mt-4 group-hover:gap-2 transition-all">
                    Lire l&apos;article
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 md:py-28 bg-dark overflow-hidden">
        <div className="noise absolute inset-0" />
        <div className="container relative z-10 text-center">
          <h2 className="font-display text-3xl md:text-4xl text-white mb-4">
            Besoin d&apos;un professionnel ?
          </h2>
          <p className="text-white/40 text-lg mb-8 max-w-lg mx-auto">
            {siteConfig.name} intervient 24h/24 pour tous vos besoins en rideau métallique à {siteConfig.city}.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href={siteConfig.phoneLink} className="btn-phone">
              {siteConfig.phone}
            </a>
            <Link href="/contact" className="btn-secondary border-white/15 text-white/60 hover:text-white hover:border-white/40">
              Devis gratuit
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
