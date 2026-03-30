import Link from "next/link";
import { siteConfig, services, zones } from "@/config/site";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const displayZones = zones.slice(0, 6);

  const getServiceHref = (serviceSlug: string): string => {
    if (serviceSlug === "depannage") return "/";
    return `/${serviceSlug}-rideau-metallique-creil`;
  };

  return (
    <footer className="bg-gray-900 pb-20 md:pb-0">
      {/* ── Main Footer ────────────────────────────────────────── */}
      <div className="container py-14 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Col 1 -- Company Info */}
          <div>
            <div className="mb-5">
              <span className="font-bold text-lg text-white">{siteConfig.name}</span>
              <div className="w-10 h-0.5 bg-primary-500 rounded-full mt-3" />
            </div>

            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Specialiste du rideau metallique a {siteConfig.city} et dans l&apos;{siteConfig.department}.
              Depannage {siteConfig.openingHours}, installation, motorisation et entretien de rideaux metalliques pour commerces et professionnels.
            </p>

            {/* Contact info */}
            <ul className="space-y-3">
              <li>
                <a
                  href={siteConfig.phoneLink}
                  className="flex items-center gap-3 text-white hover:text-primary-400 transition-colors group"
                >
                  <span className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center group-hover:bg-primary-600/80 transition-colors flex-shrink-0">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </span>
                  <span className="font-semibold text-sm">{siteConfig.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center gap-3 text-gray-400 hover:text-primary-400 transition-colors group"
                >
                  <span className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center group-hover:bg-primary-600/80 transition-colors flex-shrink-0">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </span>
                  <span className="text-sm break-all">{siteConfig.email}</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-gray-400">
                <span className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </span>
                <span className="text-sm">{siteConfig.address}</span>
              </li>
            </ul>
          </div>

          {/* Col 2 -- Services */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Nos Services
            </h3>
            <div className="w-8 h-0.5 bg-primary-500 rounded-full mb-5" />
            <ul className="space-y-2.5">
              {services
                .filter((s) => s.hasPage)
                .map((service) => (
                  <li key={service.id}>
                    <Link
                      href={getServiceHref(service.slug)}
                      className="flex items-center gap-2 text-gray-400 text-sm hover:text-primary-400 transition-colors group"
                    >
                      <svg
                        className="w-3 h-3 text-gray-600 group-hover:text-primary-500 transition-colors flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      {service.name}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          {/* Col 3 -- Zones */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Zones d&apos;intervention
            </h3>
            <div className="w-8 h-0.5 bg-primary-500 rounded-full mb-5" />
            <ul className="space-y-2.5">
              {displayZones.map((zone) => (
                <li key={zone.slug}>
                  <Link
                    href={`/depannage-rideau-metallique-${zone.slug}`}
                    className="flex items-center gap-2 text-gray-400 text-sm hover:text-primary-400 transition-colors group"
                  >
                    <svg
                      className="w-3 h-3 text-gray-600 group-hover:text-primary-500 transition-colors flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    {zone.name} ({zone.postalCode})
                  </Link>
                </li>
              ))}
              <li className="pt-1">
                <Link
                  href="/zones"
                  className="inline-flex items-center gap-1.5 text-primary-400 text-sm font-semibold hover:text-primary-300 transition-colors"
                >
                  Toutes les zones
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4 -- Contact / Liens Utiles */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Informations
            </h3>
            <div className="w-8 h-0.5 bg-primary-500 rounded-full mb-5" />
            <ul className="space-y-2.5">
              <li>
                <Link href="/a-propos" className="flex items-center gap-2 text-gray-400 text-sm hover:text-primary-400 transition-colors group">
                  <svg className="w-3 h-3 text-gray-600 group-hover:text-primary-500 transition-colors flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  A propos
                </Link>
              </li>
              <li>
                <Link href="/avis" className="flex items-center gap-2 text-gray-400 text-sm hover:text-primary-400 transition-colors group">
                  <svg className="w-3 h-3 text-gray-600 group-hover:text-primary-500 transition-colors flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  Avis clients
                </Link>
              </li>
              <li>
                <Link href="/tarifs" className="flex items-center gap-2 text-gray-400 text-sm hover:text-primary-400 transition-colors group">
                  <svg className="w-3 h-3 text-gray-600 group-hover:text-primary-500 transition-colors flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  Tarifs
                </Link>
              </li>
              <li>
                <Link href="/blog" className="flex items-center gap-2 text-gray-400 text-sm hover:text-primary-400 transition-colors group">
                  <svg className="w-3 h-3 text-gray-600 group-hover:text-primary-500 transition-colors flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="flex items-center gap-2 text-gray-400 text-sm hover:text-primary-400 transition-colors group">
                  <svg className="w-3 h-3 text-gray-600 group-hover:text-primary-500 transition-colors flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  Contact
                </Link>
              </li>
            </ul>

            {/* Hours block */}
            <div className="mt-6 p-4 bg-gray-800/50 rounded-xl">
              <p className="text-xs font-semibold text-white mb-1.5">Horaires d&apos;intervention</p>
              <p className="text-xs text-gray-400 leading-relaxed">
                Urgences : {siteConfig.openingHours}
              </p>
              <p className="text-xs text-gray-400 leading-relaxed">
                Devis gratuit sous 24h
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom Bar ──────────────────────────────────────────── */}
      <div className="border-t border-gray-800">
        <div className="container py-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-gray-500 text-xs">
              &copy; {currentYear} {siteConfig.name}. Tous droits reserves.
            </p>

            <div className="flex items-center flex-wrap justify-center gap-x-4 gap-y-1 text-xs">
              <Link href="/mentions-legales" className="text-gray-500 hover:text-gray-300 transition-colors">
                Mentions legales
              </Link>
              <span className="text-gray-700">|</span>
              <Link href="/confidentialite" className="text-gray-500 hover:text-gray-300 transition-colors">
                Politique de confidentialite
              </Link>
              <span className="text-gray-700">|</span>
              <Link href="/plan-du-site" className="text-gray-500 hover:text-gray-300 transition-colors">
                Plan du site
              </Link>
            </div>

            <p className="text-gray-500 text-xs flex items-center gap-1.5">
              <svg className="w-3 h-3 text-primary-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
              {siteConfig.reviews.rating}/5 sur {siteConfig.reviews.count} avis
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
