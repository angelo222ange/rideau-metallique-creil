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
    <section className="relative py-20 md:py-28 bg-white overflow-hidden">
      <div className="absolute -top-24 -right-24 w-[400px] h-[400px] bg-primary-50 rounded-full blur-3xl" />
      <div className="container relative z-10">
        <div className="max-w-4xl">
          <div className="w-12 h-1 bg-primary-600 mb-6" style={{borderRadius:"4px"}} />
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight tracking-tight">
            {serviceName} rideau metallique dans les quartiers de {zoneName}
          </h2>
          <p className="text-gray-500 text-lg leading-relaxed mt-4 mb-10">
            {localData.description}
          </p>

          {/* Quartiers desservis - pills with hover */}
          <div className="mb-10">
            <h3 className="font-extrabold text-gray-900 text-lg mb-4">
              Quartiers desservis a {zoneName} ({zonePostal})
            </h3>
            <div className="flex flex-wrap gap-2">
              {localData.quartiers.map((quartier, i) => (
                <span
                  key={i}
                  className="px-4 py-2 bg-gray-50 text-gray-700 text-sm font-medium border border-gray-200 hover:border-primary-300 hover:bg-primary-50 hover:text-primary-700 transition-all duration-200 cursor-default"
                  style={{ borderRadius: '100px' }}
                >
                  {quartier}
                </span>
              ))}
            </div>
          </div>

          {/* Points de repere - pills colorees */}
          <div className="mb-10">
            <h3 className="font-extrabold text-gray-900 text-lg mb-4">
              Intervention rapide pres de
            </h3>
            <div className="flex flex-wrap gap-2">
              {localData.landmarks.map((landmark, i) => (
                <span
                  key={i}
                  className="px-4 py-2 bg-primary-50 text-primary-700 text-sm font-medium border border-primary-100 hover:bg-primary-100 hover:border-primary-200 transition-all duration-200 cursor-default"
                  style={{ borderRadius: '100px' }}
                >
                  {landmark}
                </span>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Commerces locaux - card bordee */}
            <div
              className="bg-white border border-gray-200 p-6 md:p-8 hover:shadow-lg transition-shadow duration-300"
              style={{ borderRadius: '16px' }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary-50 text-primary-600 flex items-center justify-center flex-shrink-0" style={{ borderRadius: '10px' }}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="font-extrabold text-gray-900">
                  Commerces et professionnels
                </h3>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed">
                Nous intervenons aupres des {localData.commerces} a {zoneName} ({zonePostal}).
                Chaque commercant et professionnel de {zoneName} beneficie d&apos;une intervention adaptee
                a son activite et a ses contraintes horaires.
              </p>
            </div>

            {/* Specificites locales - card avec icone */}
            <div
              className="bg-gray-50 border border-gray-200 p-6 md:p-8 hover:shadow-lg transition-shadow duration-300"
              style={{ borderRadius: '16px' }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary-600 text-white flex items-center justify-center flex-shrink-0" style={{ borderRadius: '10px' }}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-extrabold text-gray-900">
                  Specificites locales a {zoneName}
                </h3>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                {localData.problematiques}
              </p>
              <a href={siteConfig.phoneLink} className="inline-flex items-center gap-2 text-sm font-bold text-primary-600 hover:gap-3 transition-all">
                Intervention a {zoneName} : {siteConfig.phone}
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
