import Link from "next/link";
import { siteConfig, services, zones } from "@/config/site";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const displayZones = zones.slice(0, 10);

  return (
    <footer className="bg-gray-900">
      {/* Divider industrial */}
      <div className="h-1 bg-primary-600" />

      {/* Main footer */}
      <div className="container py-14 md:py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">

          {/* Col 1 -- About */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <span className="font-bold text-xl text-white uppercase tracking-wide leading-none">
                {siteConfig.name}
              </span>
              <div className="divider-industrial mt-3" />
            </div>

            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Specialiste du rideau metallique a {siteConfig.city} et dans l&apos;{siteConfig.department}.
              Depannage 24h/24, installation, motorisation et entretien.
            </p>

            {/* Coordonnees */}
            <ul className="space-y-3">
              <li>
                <a href={siteConfig.phoneLink} className="flex items-center gap-3 text-white hover:text-primary-400 transition-colors group">
                  <span className="w-8 h-8 bg-white/10 flex items-center justify-center group-hover:bg-primary-600/20 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </span>
                  <span className="font-bold">{siteConfig.phone}</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-3 text-gray-400 hover:text-primary-400 transition-colors group">
                  <span className="w-8 h-8 bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </span>
                  <span className="text-sm break-all">{siteConfig.email}</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-gray-400">
                <span className="w-8 h-8 bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </span>
                <span className="text-sm">{siteConfig.address}</span>
              </li>
            </ul>
          </div>

          {/* Col 2 -- Services */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-5">
              Nos Services
            </h3>
            <div className="w-8 h-0.5 bg-primary-600 mb-5" />
            <ul className="space-y-3">
              {services.filter(s => s.hasPage).map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/${service.slug}-rideau-metallique-creil`}
                    className="text-gray-400 text-sm hover:text-primary-400 transition-colors"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 -- Zones */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-5">
              Zones d&apos;intervention
            </h3>
            <div className="w-8 h-0.5 bg-primary-600 mb-5" />
            <ul className="space-y-2.5">
              {displayZones.map((zone) => (
                <li key={zone.slug}>
                  <Link
                    href={`/zones/${zone.slug}`}
                    className="text-gray-400 text-sm hover:text-primary-400 transition-colors"
                  >
                    {zone.name} ({zone.postalCode})
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/zones" className="text-primary-400 text-sm font-bold uppercase tracking-wider hover:text-primary-300 transition-colors inline-flex items-center gap-1">
                  Toutes les zones
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4 -- Contact / Infos */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-5">
              Contact
            </h3>
            <div className="w-8 h-0.5 bg-primary-600 mb-5" />
            <ul className="space-y-2.5">
              <li><Link href="/a-propos" className="text-gray-400 text-sm hover:text-primary-400 transition-colors">A propos</Link></li>
              <li><Link href="/avis" className="text-gray-400 text-sm hover:text-primary-400 transition-colors">Avis clients</Link></li>
              <li><Link href="/tarifs" className="text-gray-400 text-sm hover:text-primary-400 transition-colors">Tarifs</Link></li>
              <li><Link href="/blog" className="text-gray-400 text-sm hover:text-primary-400 transition-colors">Blog</Link></li>
              <li><Link href="/contact" className="text-gray-400 text-sm hover:text-primary-400 transition-colors">Contact</Link></li>
              <li><Link href="/mentions-legales" className="text-gray-400 text-sm hover:text-primary-400 transition-colors">Mentions legales</Link></li>
              <li><Link href="/confidentialite" className="text-gray-400 text-sm hover:text-primary-400 transition-colors">Confidentialite</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/5">
        <div className="container py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-gray-600 text-xs">
            &copy; {currentYear} {siteConfig.name}. Tous droits reserves.
          </p>
          <p className="text-gray-600 text-xs">
            {siteConfig.reviews.rating}/5 sur {siteConfig.reviews.count} avis &middot; {siteConfig.experience} ans d&apos;experience &middot; {siteConfig.openingHours}
          </p>
        </div>
      </div>
    </footer>
  );
}
