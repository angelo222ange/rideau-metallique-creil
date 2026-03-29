import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { blogArticles, getArticleBySlug } from "@/content/blog";
import type { ContentBlock } from "@/content/blog";
import { CTA } from "@/components/sections/CTA";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return blogArticles.map((article) => ({
    slug: article.slug,
  }));
}

export function generateMetadata({ params }: Props): Metadata {
  const article = getArticleBySlug(params.slug);

  if (!article) {
    return { title: "Article non trouvé" };
  }

  return {
    title: article.metaTitle,
    description: article.metaDescription,
    openGraph: {
      title: article.metaTitle,
      description: article.metaDescription,
      type: "article",
      publishedTime: article.date,
      url: `${siteConfig.url}/blog/${article.slug}`,
      images: [{ url: `${siteConfig.url}${article.image}`, alt: article.imageAlt }],
    },
    alternates: {
      canonical: `${siteConfig.url}/blog/${article.slug}/`,
    },
  };
}

function renderContentBlock(block: ContentBlock, index: number) {
  switch (block.type) {
    case 'heading':
      if (block.level === 2) {
        return (
          <h2 key={index} className="font-extrabold text-2xl md:text-3xl text-gray-900 mt-12 mb-5 tracking-tight">
            {block.text}
          </h2>
        );
      }
      return (
        <h3 key={index} className="font-bold text-xl text-gray-900 mt-8 mb-4">
          {block.text}
        </h3>
      );

    case 'paragraph':
      return (
        <p
          key={index}
          className="text-gray-600 text-[16px] leading-[1.85] mb-5"
          dangerouslySetInnerHTML={{ __html: block.text }}
        />
      );

    case 'list':
      if (block.ordered) {
        return (
          <ol key={index} className="list-decimal list-inside space-y-2 mb-6 ml-2">
            {block.items.map((item, i) => (
              <li key={i} className="text-gray-600 text-[16px] leading-relaxed" dangerouslySetInnerHTML={{ __html: item }} />
            ))}
          </ol>
        );
      }
      return (
        <ul key={index} className="space-y-2 mb-6 ml-2">
          {block.items.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-gray-600 text-[16px] leading-relaxed">
              <span className="w-1.5 h-1.5 bg-primary-600 rounded-full mt-2.5 flex-shrink-0" />
              <span dangerouslySetInnerHTML={{ __html: item }} />
            </li>
          ))}
        </ul>
      );

    case 'table':
      return (
        <div key={index} className="overflow-x-auto mb-8 -mx-4 px-4">
          <table className="w-full text-sm border-collapse" style={{ borderRadius: '10px' }}>
            <thead>
              <tr className="bg-gray-50">
                {block.headers.map((header, i) => (
                  <th key={i} className="text-left font-bold text-gray-900 px-4 py-3 border-b-2 border-gray-200">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, i) => (
                <tr key={i} className="border-b border-gray-100 hover:bg-gray-50/50">
                  {row.map((cell, j) => (
                    <td key={j} className="text-gray-600 px-4 py-3" dangerouslySetInnerHTML={{ __html: cell }} />
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    default:
      return null;
  }
}

export default function BlogArticlePage({ params }: Props) {
  const article = getArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }

  // Schema.org Article
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.metaDescription,
    "datePublished": article.date,
    "author": {
      "@type": "Organization",
      "name": siteConfig.name,
    },
    "publisher": {
      "@type": "Organization",
      "name": siteConfig.fullName,
      "url": siteConfig.url,
    },
    "image": `${siteConfig.url}${article.image}`,
    "mainEntityOfPage": `${siteConfig.url}/blog/${article.slug}`,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Accueil", "item": siteConfig.url },
      { "@type": "ListItem", "position": 2, "name": "Blog", "item": `${siteConfig.url}/blog` },
      { "@type": "ListItem", "position": 3, "name": article.title, "item": `${siteConfig.url}/blog/${article.slug}` },
    ],
  };

  // Related articles (excluding current)
  const relatedArticles = blogArticles
    .filter(a => a.slug !== article.slug)
    .slice(0, 3);

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Hero dark compact */}
      <section className="relative overflow-hidden">
        <Image
          src="/images/gallery/hero-bg-technicien-drm.webp"
          alt={`${article.title} - ${siteConfig.name}`}
          title={`${article.title} - ${siteConfig.name}`}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gray-950/90" />
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-primary-600/10 rounded-full blur-3xl" />

        <div className="container relative z-10 py-14 md:py-20">
          {/* Breadcrumb */}
          <nav className="mb-8" aria-label="Fil d'Ariane">
            <ol className="flex items-center gap-2 text-xs text-white/30 flex-wrap">
              <li><Link href="/" className="hover:text-primary-400 transition-colors">Accueil</Link></li>
              <li>/</li>
              <li><Link href="/blog" className="hover:text-primary-400 transition-colors">Blog</Link></li>
              <li>/</li>
              <li className="text-white/60 font-medium truncate max-w-[200px]">{article.title}</li>
            </ol>
          </nav>

          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/[0.06] border border-white/[0.08] text-white/70 text-sm font-medium mb-5" style={{ borderRadius: '100px' }}>
              Article
            </span>

            {/* Meta */}
            <div className="flex items-center gap-3 text-xs text-white/30 mb-6">
              <time dateTime={article.date}>
                {new Date(article.date).toLocaleDateString('fr-FR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </time>
              <span className="w-1 h-1 bg-white/20 rounded-full" />
              <span>{article.readTime} de lecture</span>
            </div>

            <h1 className="font-extrabold text-3xl md:text-4xl lg:text-5xl text-white leading-[1.1] tracking-tight">
              {article.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="container">
          <div className="grid lg:grid-cols-12 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-8">
              {/* Featured Image */}
              <div className="relative aspect-[16/9] overflow-hidden mb-10 bg-gray-100 shadow-2xl" style={{ borderRadius: '16px' }}>
                <Image
                  src={article.image}
                  alt={article.imageAlt} title={article.imageAlt}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Summary Box */}
              <div className="bg-white border border-gray-100 border-l-4 border-l-primary-600 p-6 md:p-8 mb-10 shadow-sm" style={{ borderRadius: '16px' }}>
                <h2 className="font-extrabold text-gray-900 text-lg mb-4 tracking-tight">
                  {article.summary.title}
                </h2>
                <ul className="space-y-2">
                  {article.summary.points.map((point, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-700 text-[15px]">
                      <span className="w-1.5 h-1.5 bg-primary-600 rounded-full mt-2 flex-shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Content Blocks */}
              <div className="prose-custom bg-white border border-gray-100 p-6 md:p-10 shadow-sm" style={{ borderRadius: '16px' }}>
                {article.content.map((block, index) => renderContentBlock(block, index))}
              </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-4">
              <div className="sticky top-28 space-y-8">
                {/* CTA Box */}
                <div className="bg-white border border-gray-100 p-6 text-center shadow-sm" style={{ borderRadius: '16px' }}>
                  <p className="text-primary-600 text-sm font-semibold uppercase tracking-widest mb-3">Contact</p>
                  <p className="font-extrabold text-gray-900 text-lg mb-2 tracking-tight">
                    Besoin d&apos;un devis ?
                  </p>
                  <p className="text-gray-500 text-sm mb-5">
                    Intervention 24h/24 à {siteConfig.city}
                  </p>
                  <a
                    href={siteConfig.phoneLink}
                    className="flex items-center justify-center gap-2 w-full px-6 py-3 text-sm font-semibold text-white bg-primary-600 hover:bg-primary-700 transition-all shadow-lg shadow-primary-600/25 mb-3"
                    style={{ borderRadius: '8px' }}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    {siteConfig.phone}
                  </a>
                  <Link
                    href="/contact"
                    className="flex items-center justify-center w-full px-6 py-3 text-sm font-semibold text-gray-700 bg-white border-2 border-gray-200 hover:border-primary-300 hover:text-primary-700 transition-all"
                    style={{ borderRadius: '8px' }}
                  >
                    Devis gratuit
                  </Link>
                </div>

                {/* Related Articles */}
                {relatedArticles.length > 0 && (
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm uppercase tracking-widest mb-4">
                      Articles similaires
                    </h3>
                    <div className="space-y-4">
                      {relatedArticles.map((related) => (
                        <Link
                          key={related.slug}
                          href={`/blog/${related.slug}`}
                          className="block group bg-white border border-gray-100 hover:border-primary-200 hover:shadow-lg hover:-translate-y-1 overflow-hidden transition-all duration-300"
                          style={{ borderRadius: '16px' }}
                        >
                          <div className="relative aspect-[16/9] overflow-hidden bg-gray-100">
                            <Image
                              src={related.image}
                              alt={related.imageAlt} title={related.imageAlt}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                          <div className="p-3">
                            <h4 className="font-bold text-gray-900 text-sm group-hover:text-primary-600 transition-colors leading-snug">
                              {related.title}
                            </h4>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTA />
    </main>
  );
}
