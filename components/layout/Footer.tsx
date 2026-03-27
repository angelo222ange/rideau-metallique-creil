import Link from "next/link";
import Image from "next/image";
import { siteConfig, navigation, services, zones } from "@/config/site";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const arrondissements = zones.filter(z => 'arrondissement' in z).slice(0, 8);
  const communes = zones.filter(z => 'distance' in z).slice(0, 6);

  return (
    <footer>
      {/* CTA Band */}
      <div className="bg-dark">
        <div className="container py-12 md:py-16">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="font-display text-3xl md:text-4xl text-white mb-2">
                Besoin d&apos;une intervention ?
              </h3>
              <p className="text-white/40 text-sm">
                Disponible 24h/24, 7j/7 à {siteConfig.city} et environs
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href={siteConfig.phoneLink}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-[15px] font-bold text-white transition-colors"
                style={{ background: '#E07B39', borderRadius: '4px' }}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {siteConfig.phone}
              </a>
              <Link href="/contact"
                className="inline-flex items-center justify-center px-7 py-3.5 text-[15px] font-bold text-white/70 border border-white/15 hover:border-white/40 transition-colors"
                style={{ borderRadius: '4px' }}>
                Devis gratuit
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="bg-dark border-t border-white/[0.06]">
        <div className="container py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-10">
            {/* About */}
            <div>
              <div className="flex items-center gap-2.5 mb-5">
                <div className="relative w-8 h-8 rounded-sm overflow-hidden">
                  <Image
                    src="/images/logos/depannage-rideau-metallique-creil.webp"
                    alt={`Logo ${siteConfig.name}`}
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="font-heading font-bold text-sm text-white uppercase tracking-wide">
                  {siteConfig.name}
                </span>
              </div>
              <p className="text-white/40 text-sm leading-relaxed mb-6">
                Spécialiste du rideau métallique à {siteConfig.city}. Dépannage, installation,
                fabrication, motorisation et entretien.
              </p>
              <div className="flex gap-6 text-sm">
                <div>
                  <p className="text-secondary-terracotta font-bold text-xl">{siteConfig.experience}</p>
                  <p className="text-white/30 text-xs">ans d&apos;expérience</p>
                </div>
                <div>
                  <p className="text-secondary-terracotta font-bold text-xl">{siteConfig.reviews.rating}/5</p>
                  <p className="text-white/30 text-xs">{siteConfig.reviews.count} avis</p>
                </div>
              </div>
            </div>

            {/* Services */}
            <div>
              <p className="text-white font-heading font-bold text-xs uppercase tracking-widest mb-5">
                Services
              </p>
              <ul className="space-y-3">
                {services.map((service) => (
                  <li key={service.id}>
                    <Link href={service.slug === 'depannage' ? '/' : `/${service.slug}-rideau-metallique-creil`}
                      className="text-white/40 hover:text-white transition-colors text-sm">
                      {service.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/contact" className="text-white/40 hover:text-white transition-colors text-sm">
                    Contact & Devis
                  </Link>
                </li>
              </ul>
            </div>

            {/* Zones */}
            <div>
              <p className="text-white font-heading font-bold text-xs uppercase tracking-widest mb-5">
                Zones d&apos;intervention
              </p>
              <ul className="space-y-2 mb-4">
                {arrondissements.map((zone) => (
                  <li key={zone.slug}>
                    <Link href={`/zones/${zone.slug}`}
                      className="text-white/40 hover:text-white transition-colors text-sm">
                      {zone.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="border-t border-white/[0.06] pt-3">
                {communes.map((zone) => (
                  <Link key={zone.slug} href={`/zones/${zone.slug}`}
                    className="text-white/30 hover:text-white transition-colors text-xs mr-3 inline-block leading-relaxed">
                    {zone.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div>
              <p className="text-white font-heading font-bold text-xs uppercase tracking-widest mb-5">
                Contact
              </p>
              <div className="space-y-4 text-sm">
                <div>
                  <p className="text-white/30 text-xs mb-0.5">Téléphone</p>
                  <a href={siteConfig.phoneLink} className="text-white font-bold hover:text-secondary-terracotta transition-colors">
                    {siteConfig.phone}
                  </a>
                </div>
                <div>
                  <p className="text-white/30 text-xs mb-0.5">Email</p>
                  <a href={`mailto:${siteConfig.email}`} className="text-white/60 hover:text-white transition-colors text-sm break-all">
                    {siteConfig.email}
                  </a>
                </div>
                <div>
                  <p className="text-white/30 text-xs mb-0.5">Adresse</p>
                  <p className="text-white/60 text-sm">{siteConfig.address}</p>
                </div>
                <div>
                  <p className="text-white/30 text-xs mb-0.5">Disponibilité</p>
                  <p className="text-white/60 text-sm flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                    {siteConfig.openingHours}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/[0.06]">
          <div className="container py-5 flex flex-col md:flex-row justify-between items-center gap-3">
            <p className="text-white/20 text-xs">
              © {currentYear} {siteConfig.fullName} — {siteConfig.department} ({siteConfig.departmentCode})
            </p>
            <nav className="flex gap-6 text-xs">
              <Link href="/mentions-legales" className="text-white/20 hover:text-white/50 transition-colors">
                Mentions légales
              </Link>
              <Link href="/confidentialite" className="text-white/20 hover:text-white/50 transition-colors">
                Confidentialité
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
