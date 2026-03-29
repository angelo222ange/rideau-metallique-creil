import Link from "next/link";
import { siteConfig, zones } from "@/config/site";

interface ZonesProps {
  title?: string;
  limit?: number;
}

export function Zones({ title = "Zones d'intervention", limit = 12 }: ZonesProps) {
  const displayedZones = zones.slice(0, limit);

  return (
    <section className="section bg-white">
      <div className="container">
        <div className="grid lg:grid-cols-3 gap-16 items-start">
          {/* Left — Title */}
          <div className="lg:col-span-1">
            <div className="rule-accent mb-6" />
            <h2 className="section-title">{title}</h2>
            <p className="section-subtitle">
              Intervention rapide à {siteConfig.city} et dans toute l&apos;agglomération.
            </p>

            {zones.length > limit && (
              <Link href="/zones" className="inline-flex items-center gap-2 text-sm font-bold text-primary-600 mt-6 hover:gap-3 transition-all">
                Toutes les zones ({zones.length})
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            )}
          </div>

          {/* Right — Zone list */}
          <div className="lg:col-span-2">
            <div className="columns-2 md:columns-3 gap-x-8">
              {displayedZones.map((zone) => {
                const isMain = 'isMain' in zone;
                return (
                  <Link
                    key={zone.slug}
                    href={`/depannage-rideau-metallique-${zone.slug}`}
                    className={`block py-2.5 border-b border-gray-100 text-sm transition-colors hover:text-primary-600 ${
                      isMain ? 'font-bold text-gray-900' : 'text-gray-600'
                    }`}
                  >
                    <span className="flex items-center justify-between">
                      <span>{zone.name}</span>
                      <span className="text-xs text-gray-300">{zone.postalCode}</span>
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
