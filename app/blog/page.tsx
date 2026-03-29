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

      {/* Hero dark compact */}
      <section className="relative overflow-hidden bg-gray-950">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%), repeating-linear-gradient(-45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)', backgroundSize: '20px 20px' }} />
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-primary-600/10 rounded-full blur-3xl" />

        <div className="container relative z-10 py-14 md:py-20 text-center">
          <nav className="mb-6" aria-label="Fil d'Ariane">
            <ol className="flex items-center justify-center gap-2 text-xs text-white/30">
              <li><Link href="/" className="hover:text-primary-400 transition-colors">Accueil</Link></li>
              <li>/</li>
              <li className="text-white/60 font-medium">Blog</li>
            </ol>
          </nav>
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/[0.06] border border-white/[0.08] text-white/70 text-sm font-medium mb-5" style={{ borderRadius: '100px' }}>
            <span className="w-2 h-2 bg-primary-400 rounded-full animate-pulse" />
            Actualités
          </span>
          <h1 className="font-extrabold text-4xl md:text-5xl lg:text-6xl text-white leading-[1.1] mb-4 tracking-tight">
            Blog
          </h1>
          <p className="text-white/40 text-lg max-w-lg mx-auto">
            Conseils, guides et actualités sur les rideaux métalliques à {siteConfig.city}.
          </p>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedArticles.map((article) => (
              <Link
                key={article.slug}
                href={`/blog/${article.slug}`}
                className="group block bg-white border border-gray-100 hover:border-primary-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                style={{ borderRadius: '16px' }}
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
      <section className="relative py-20 md:py-28 bg-gray-950 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%), repeating-linear-gradient(-45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)', backgroundSize: '20px 20px' }} />
        <div className="absolute -bottom-32 -right-32 w-[400px] h-[400px] bg-primary-600/10 rounded-full blur-3xl" />
        <div className="container relative z-10 text-center">
          <p className="text-primary-400 text-sm font-semibold uppercase tracking-widest mb-3">Professionnel</p>
          <h2 className="font-extrabold text-3xl md:text-4xl text-white mb-4 tracking-tight">
            Besoin d&apos;un professionnel ?
          </h2>
          <p className="text-white/40 text-lg mb-8 max-w-lg mx-auto">
            {siteConfig.name} intervient 24h/24 pour tous vos besoins en rideau métallique à {siteConfig.city}.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={siteConfig.phoneLink}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 font-semibold text-gray-900 bg-white hover:bg-gray-100 transition-all"
              style={{ borderRadius: '8px' }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {siteConfig.phone}
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3.5 font-semibold text-white border border-white/20 hover:bg-white/10 transition-all"
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
