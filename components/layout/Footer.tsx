import Link from "next/link";
import { siteConfig, services, zones } from "@/config/site";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const displayZones = zones.slice(0, 10);

  return (
    <footer className="bg-gray-900">
      {/* Main footer */}
      <div className="container py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Col 1 — About */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary-600 flex items-center justify-center text-white font-bold text-sm" style={{ borderRadius: '6px' }}>
                D
              </div>
              <span className="font-bold text-white text-sm">{siteConfig.name}</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Spécialiste du dépannage, de l&apos;installation et de la réparation de rideaux métalliques à {siteConfig.city} et dans l&apos;{siteConfig.department}.
            </p>
            <div className="space-y-2">
              <a href={siteConfig.phoneLink} className="flex items-center gap-2 text-primary-400 text-sm font-medium hover:text-primary-300 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {siteConfig.phone}
              </a>
              <p className="flex items-center gap-2 text-gray-500 text-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {siteConfig.address}
              </p>
            </div>
          </div>

          {/* Col 2 — Services */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4">Services</h3>
            <ul className="space-y-2.5">
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

          {/* Col 3 — Zones */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4">Zones d&apos;intervention</h3>
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
                <Link href="/zones" className="text-primary-400 text-sm font-medium hover:text-primary-300 transition-colors">
                  Toutes les zones →
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4 — Infos */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4">Informations</h3>
            <ul className="space-y-2.5">
              <li><Link href="/a-propos" className="text-gray-400 text-sm hover:text-primary-400 transition-colors">À propos</Link></li>
              <li><Link href="/avis" className="text-gray-400 text-sm hover:text-primary-400 transition-colors">Avis clients</Link></li>
              <li><Link href="/tarifs" className="text-gray-400 text-sm hover:text-primary-400 transition-colors">Tarifs</Link></li>
              <li><Link href="/blog" className="text-gray-400 text-sm hover:text-primary-400 transition-colors">Blog</Link></li>
              <li><Link href="/contact" className="text-gray-400 text-sm hover:text-primary-400 transition-colors">Contact</Link></li>
              <li><Link href="/mentions-legales" className="text-gray-400 text-sm hover:text-primary-400 transition-colors">Mentions légales</Link></li>
              <li><Link href="/confidentialite" className="text-gray-400 text-sm hover:text-primary-400 transition-colors">Confidentialité</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="container py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-gray-600 text-xs">
            © {currentYear} {siteConfig.name}. Tous droits réservés.
          </p>
          <p className="text-gray-600 text-xs">
            {siteConfig.reviews.rating}/5 sur {siteConfig.reviews.count} avis · {siteConfig.experience}+ ans d&apos;expérience · {siteConfig.openingHours}
          </p>
        </div>
      </div>
    </footer>
  );
}
