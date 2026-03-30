import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { blogArticles } from "@/content/blog";

export const metadata: Metadata = {
  title: `Blog Rideau Metallique Creil | Guides et Conseils`,
  description: `Guides, conseils et actualites sur les rideaux metalliques a Creil. Entretien, depannage, choix moteur, prix. Par DRM Creil.`,
  keywords: `blog rideau metallique ${siteConfig.city}, conseils rideau metallique, guide depannage rideau, entretien rideau metallique`,
  openGraph: {
    title: `Blog Rideau Metallique Creil - Conseils et Guides`,
    description: `Guides et conseils sur les rideaux metalliques a Creil. Entretien, depannage, installation, prix.`,
    type: "website",
    locale: "fr_FR",
    url: `${siteConfig.url}/blog/`,
    images: [{
      url: `${siteConfig.url}/images/logos/depannage-rideau-metallique-creil.webp`,
      width: 800,
      height: 600,
      alt: `Blog DRM Creil`,
    }],
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
          src="/images/gallery/rideau-metallique-lame-pleine-drm-france-national.webp"
          alt={`Blog rideau metallique ${siteConfig.city}`}
          title={`Blog rideau metallique ${siteConfig.city}`}
          fill
          className="object-cover opacity-20"
          sizes="100vw"
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
          <p className="section-label text-primary-400">Actualites</p>
          <h1 className="text-white">
            Blog Rideau Metallique {siteConfig.city}
          </h1>
          <div className="divider-industrial-lg mt-4" />
          <p className="text-white/60 mt-4 text-lg max-w-2xl">
            {sortedArticles.length} guides et conseils pratiques sur les rideaux metalliques : entretien, depannage, choix de moteur, normes, prix. Par l&apos;equipe {siteConfig.name}.
          </p>
        </div>
        <div className="absolute top-0 right-0 w-1 h-full bg-primary-600 hidden lg:block" />
      </section>

      {/* ─── ARTICLES GRID ─── */}
      <section className="section bg-gray-50">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedArticles.map((article) => (
              <Link
                key={article.slug}
                href={`/blog/${article.slug}`}
                className="group block bg-white rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl transition-all overflow-hidden"
              >
                <article>
                  {/* Image */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                    <Image
                      src={article.image}
                      alt={article.imageAlt} title={article.imageAlt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                  </div>

                  <div className="p-6">
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

                    {/* Author + read more */}
                    <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-primary-600 text-white flex items-center justify-center text-[10px] font-bold">D</div>
                        <span className="text-xs text-gray-400">{siteConfig.name}</span>
                      </div>
                      <span className="inline-flex items-center gap-1 text-sm font-bold text-primary-600 uppercase tracking-wide group-hover:gap-2 transition-all">
                        Lire
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </span>
                    </div>
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
          src="/images/gallery/realisation-rideau-metallique-lame-pleine-industriel-france.webp"
          alt={`Professionnel rideau metallique ${siteConfig.city}`}
          title={`Professionnel rideau metallique ${siteConfig.city}`}
          fill
          className="object-cover opacity-10"
          sizes="100vw"
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
            <Link href="/contact" className="inline-flex items-center justify-center rounded-full border-2 border-white/30 px-6 py-3 text-base font-semibold text-white bg-transparent hover:bg-white hover:text-gray-900 transition-all duration-200">
              Devis gratuit
            </Link>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-1 h-full bg-primary-600 hidden lg:block" />
      </section>
    </main>
  );
}
