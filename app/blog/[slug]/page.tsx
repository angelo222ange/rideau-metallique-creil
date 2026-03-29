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
          <h2 key={index} className="font-bold text-2xl md:text-3xl text-gray-900 mt-12 mb-5">
            {block.text}
          </h2>
        );
      }
      return (
        <h3 key={index} className="font-heading font-bold text-xl text-gray-900 mt-8 mb-4">
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
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-50">
                {block.headers.map((header, i) => (
                  <th key={i} className="text-left font-heading font-bold text-gray-900 px-4 py-3 border-b-2 border-gray-200">
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

      {/* Hero */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 bg-dark overflow-hidden">
        <div className="hidden" />
        <div className="container relative z-10">
          {/* Breadcrumb */}
          <nav className="mb-8" aria-label="Fil d'Ariane">
            <ol className="flex items-center gap-2 text-xs text-white/30 flex-wrap">
              <li><Link href="/" className="hover:text-white/60 transition-colors">Accueil</Link></li>
              <li>/</li>
              <li><Link href="/blog" className="hover:text-white/60 transition-colors">Blog</Link></li>
              <li>/</li>
              <li className="text-white/70 font-bold truncate max-w-[200px]">{article.title}</li>
            </ol>
          </nav>

          <div className="max-w-3xl">
            <div className="rule-accent mb-8"  />

            {/* Meta */}
            <div className="flex items-center gap-3 text-xs text-white/30 mb-6">
              <time dateTime={article.date}>
                {new Date(article.date).toLocaleDateString('fr-FR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </time>
              <span>|</span>
              <span>{article.readTime} de lecture</span>
            </div>

            <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl text-white leading-[1.1]">
              {article.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="section bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-12 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-8">
              {/* Featured Image */}
              <div className="relative aspect-[16/9] overflow-hidden mb-10 bg-gray-100" style={{ borderRadius: '8px' }}>
                <Image
                  src={article.image}
                  alt={article.imageAlt}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Summary Box */}
              <div className="bg-gray-50 border-l-4 border-primary-600 p-6 md:p-8 mb-10" style={{ borderRadius: '8px' }}>
                <h2 className="font-heading font-bold text-gray-900 text-lg mb-4">
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
              <div className="prose-custom">
                {article.content.map((block, index) => renderContentBlock(block, index))}
              </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-4">
              <div className="sticky top-28 space-y-8">
                {/* CTA Box */}
                <div className="bg-dark p-6 text-center" style={{ borderRadius: '8px' }}>
                  <p className="text-white font-heading font-bold text-lg mb-2">
                    Besoin d&apos;un devis ?
                  </p>
                  <p className="text-white/40 text-sm mb-5">
                    Intervention 24h/24 à {siteConfig.city}
                  </p>
                  <a href={siteConfig.phoneLink} className="btn-phone w-full justify-center text-sm mb-3">
                    {siteConfig.phone}
                  </a>
                  <Link href="/contact" className="btn-secondary w-full justify-center text-sm border-white/15 text-white/60 hover:text-white hover:border-white/40">
                    Devis gratuit
                  </Link>
                </div>

                {/* Related Articles */}
                {relatedArticles.length > 0 && (
                  <div>
                    <h3 className="font-heading font-bold text-gray-900 text-sm uppercase tracking-wider mb-4">
                      Articles similaires
                    </h3>
                    <div className="space-y-4">
                      {relatedArticles.map((related) => (
                        <Link
                          key={related.slug}
                          href={`/blog/${related.slug}`}
                          className="block group"
                        >
                          <div className="relative aspect-[16/9] overflow-hidden mb-2 bg-gray-100" style={{ borderRadius: '8px' }}>
                            <Image
                              src={related.image}
                              alt={related.imageAlt}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                          <h4 className="font-heading font-bold text-gray-900 text-sm group-hover:text-primary-600 transition-colors leading-snug">
                            {related.title}
                          </h4>
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
