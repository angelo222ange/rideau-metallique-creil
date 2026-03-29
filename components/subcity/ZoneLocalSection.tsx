import Link from "next/link";
import { siteConfig } from "@/config/site";
import type { ZoneLocalInfo } from "@/content/zones-local";

interface ZoneLocalSectionProps {
  zoneName: string;
  zonePostal: string;
  zoneSlug: string;
  serviceName: string;
  serviceSlug: string;
  localData: ZoneLocalInfo;
}

export function ZoneLocalSection({
  zoneName,
  zonePostal,
  zoneSlug,
  serviceName,
  serviceSlug,
  localData,
}: ZoneLocalSectionProps) {
  return (
    <section className="section bg-white">
      <div className="container">
        <div className="max-w-3xl">
          <div className="w-12 h-1 bg-primary-600 mb-6" style={{borderRadius:"4px"}} />
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            {serviceName} rideau métallique dans les quartiers de {zoneName}
          </h2>
          <p className="text-gray-500 text-lg leading-relaxed mb-8">
            {localData.description}
          </p>

          {/* Quartiers desservis */}
          <div className="mb-10">
            <h3 className="font-heading font-bold text-gray-900 mb-4">
              Quartiers desservis à {zoneName} ({zonePostal})
            </h3>
            <div className="flex flex-wrap gap-2">
              {localData.quartiers.map((quartier, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 bg-gray-50 text-gray-700 text-sm border border-gray-200"
                  style={{ borderRadius: '8px' }}
                >
                  {quartier}
                </span>
              ))}
            </div>
          </div>

          {/* Points de repère */}
          <div className="mb-10">
            <h3 className="font-heading font-bold text-gray-900 mb-4">
              Intervention rapide près de
            </h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {localData.landmarks.map((landmark, i) => (
                <div key={i} className="flex items-center gap-3 text-gray-600 text-sm">
                  <span className="w-1.5 h-1.5 bg-primary-600 rounded-full flex-shrink-0" />
                  {landmark}
                </div>
              ))}
            </div>
          </div>

          {/* Commerces locaux */}
          <div className="mb-10">
            <h3 className="font-heading font-bold text-gray-900 mb-3">
              Commerces et professionnels à {zoneName}
            </h3>
            <p className="text-gray-500 leading-relaxed">
              Nous intervenons auprès des {localData.commerces} à {zoneName} ({zonePostal}).
              Chaque commerçant et professionnel de {zoneName} bénéficie d&apos;une intervention adaptée
              à son activité et à ses contraintes horaires.
            </p>
          </div>

          {/* Problématiques locales */}
          <div className="bg-gray-50 p-6 md:p-8 border-l-4 border-primary-600" style={{ borderRadius: '8px' }}>
            <h3 className="font-heading font-bold text-gray-900 mb-3">
              Spécificités locales à {zoneName}
            </h3>
            <p className="text-gray-600 text-[15px] leading-relaxed mb-4">
              {localData.problematiques}
            </p>
            <a href={siteConfig.phoneLink} className="inline-flex items-center gap-2 text-sm font-bold text-primary-600 hover:gap-3 transition-all">
              Intervention à {zoneName} : {siteConfig.phone}
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
