import Link from "next/link";
import { siteConfig } from "@/config/site";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  // Toujours commencer par Accueil
  const allItems: BreadcrumbItem[] = [
    { label: "Accueil", href: "/" },
    ...items,
  ];

  // Schema.org BreadcrumbList
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": allItems.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      ...(item.href ? { "item": `${siteConfig.url}${item.href}` } : {}),
    })),
  };

  return (
    <>
      {/* Schema.org BreadcrumbList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Fil d'Ariane visuel */}
      <nav aria-label="Fil d'Ariane" className="bg-gray-50 border-b border-gray-100">
        <div className="container py-3">
          <ol className="flex flex-wrap items-center gap-1.5 text-sm" itemScope itemType="https://schema.org/BreadcrumbList">
            {allItems.map((item, index) => {
              const isLast = index === allItems.length - 1;
              
              return (
                <li
                  key={index}
                  className="flex items-center gap-1.5"
                  itemProp="itemListElement"
                  itemScope
                  itemType="https://schema.org/ListItem"
                >
                  {index > 0 && (
                    <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  )}
                  
                  {isLast ? (
                    <span className="text-primary-600 font-medium" itemProp="name">
                      {item.label}
                    </span>
                  ) : (
                    <Link
                      href={item.href || "/"}
                      className="text-gray-500 hover:text-primary-600 transition-colors"
                      itemProp="item"
                    >
                      <span itemProp="name">{item.label}</span>
                    </Link>
                  )}
                  
                  <meta itemProp="position" content={String(index + 1)} />
                </li>
              );
            })}
          </ol>
        </div>
      </nav>
    </>
  );
}
