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

      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden bg-gray-900">
        <Image
          src="/images/gallery/hero-bg-technicien-drm.webp"
          alt={`Blog rideau metallique ${siteConfig.city}`}
          title={`Blog rideau metallique ${siteConfig.city}`}
          fill
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/90 to-gray-900/70" />
        <div className="container relative z-10 py-16 md:py-20">
          <nav className="mb-6" aria-label="Fil d'Ariane">
            <ol className="flex items-center gap-2 text-sm text-white/40">
              <li><Link href="/" className="hover:text-white/60 transition-colors">Accueil</Link></li>
              <li>/</li>
              <li className="text-white/70 font-semibold">Blog</li>
            </ol>
          </nav>
          <p className="section-label text-primary-400">Actualités</p>
          <h1 className="text-white">
            Blog
          </h1>
          <div className="divider-industrial-lg mt-4" />
          <p className="text-white/60 mt-4 text-lg max-w-lg">
            Conseils, guides et actualités sur les rideaux métalliques à {siteConfig.city}.
          </p>
        </div>
        <div className="absolute top-0 right-0 w-1 h-full bg-primary-600 hidden lg:block" />
      </section>

      {/* ─── ARTICLES GRID ─── */}
      <section className="section bg-gray-50 bg-dots-pattern">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedArticles.map((article) => (
              <Link
                key={article.slug}
                href={`/blog/${article.slug}`}
                className="group block bg-white border-l-4 border-l-primary-500 border border-gray-200 hover:border-l-primary-700 transition-all overflow-hidden"
              >
                <article>
                  {/* Image */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                    <Image
                      src={article.image}
                      alt={article.imageAlt} title={article.imageAlt}
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
                      <span className="w-1 h-1 bg-gray-300 rounded-full" />
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
                    <span className="inline-flex items-center gap-1 text-sm font-bold text-primary-600 mt-4 uppercase tracking-wide group-hover:gap-2 transition-all">
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

      {/* ─── CTA ─── */}
      <section className="relative overflow-hidden bg-gray-900">
        <Image
          src="/images/gallery/hero-bg-technicien-drm.webp"
          alt={`Professionnel rideau metallique ${siteConfig.city}`}
          title={`Professionnel rideau metallique ${siteConfig.city}`}
          fill
          className="object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/95 to-gray-900/90" />
        <div className="container relative z-10 py-16 md:py-24 text-center">
          <p className="section-label text-primary-400">Professionnel</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Besoin d&apos;un professionnel ?
          </h2>
          <div className="divider-industrial-lg mx-auto mt-4" />
          <p className="text-white/60 text-lg mt-4 mb-8 max-w-lg mx-auto">
            {siteConfig.name} intervient 24h/24 pour tous vos besoins en rideau métallique à {siteConfig.city}.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
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
    </main>
  );
}
