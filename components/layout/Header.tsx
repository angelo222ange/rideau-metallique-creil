"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { siteConfig, navigation, zones, services } from "@/config/site";

const servicesSlugs: string[] = services.map(s => s.slug);

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const servicesTimeout = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsMobileServicesOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  const getZoneSlugFromPath = (): string | null => {
    const segments = pathname.split('/').filter(Boolean);
    if (segments[0] === 'zones' && segments[1]) {
      const zone = zones.find(z => z.slug === segments[1]);
      if (zone && !('isMain' in zone)) return zone.slug;
    }
    if (segments.length >= 2 && servicesSlugs.includes(segments[0])) {
      const zone = zones.find(z => z.slug === segments[1]);
      if (zone && !('isMain' in zone)) return zone.slug;
    }
    return null;
  };

  const currentZoneSlug = getZoneSlugFromPath();

  const getServiceHref = (serviceSlug: string): string => {
    if (currentZoneSlug) {
      return `/${serviceSlug}-rideau-metallique-${currentZoneSlug}`;
    }
    if (serviceSlug === "depannage") return "/";
    return `/${serviceSlug}-rideau-metallique-creil`;
  };

  const isActive = (href: string): boolean => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  const isServiceActive = (): boolean => {
    return services.some(s => {
      const href = getServiceHref(s.slug);
      return pathname === href || pathname.startsWith(`/${s.slug}-rideau-metallique`);
    });
  };

  const isHomepage = pathname === '/';

  const handleServicesEnter = () => {
    if (servicesTimeout.current) clearTimeout(servicesTimeout.current);
    setIsServicesOpen(true);
  };

  const handleServicesLeave = () => {
    servicesTimeout.current = setTimeout(() => setIsServicesOpen(false), 150);
  };

  const navTextColor = isScrolled || !isHomepage ? 'text-gray-600 hover:text-gray-900' : 'text-white/80 hover:text-white';

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-sm shadow-[0_1px_0_rgba(0,0,0,0.06)]'
          : isHomepage
            ? 'bg-transparent'
            : 'bg-white'
      }`}>
        <div className="container">
          <div className="flex items-center justify-between h-[72px]">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 relative z-10">
              <div className="relative w-9 h-9 rounded-sm overflow-hidden">
                <Image
                  src="/images/logos/depannage-rideau-metallique-creil.webp"
                  alt={`Logo ${siteConfig.name}`}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <span className={`font-heading font-bold text-sm tracking-wide uppercase transition-colors duration-300 ${
                isScrolled || !isHomepage ? 'text-gray-900' : 'text-white'
              }`}>
                {siteConfig.name}
              </span>
            </Link>

            {/* Nav Desktop */}
            <nav className="hidden lg:flex items-center gap-7">
              {/* Accueil */}
              <Link
                href="/"
                className={`nav-link ${
                  pathname === '/' ? 'text-secondary-terracotta' : navTextColor
                }`}
              >
                Accueil
              </Link>

              {/* Services Dropdown */}
              <div
                className="relative"
                onMouseEnter={handleServicesEnter}
                onMouseLeave={handleServicesLeave}
              >
                <button
                  className={`nav-link flex items-center gap-1 ${
                    isServiceActive() ? 'text-secondary-terracotta' : navTextColor
                  }`}
                >
                  Services
                  <svg
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown Panel */}
                <div className={`absolute top-full left-1/2 -translate-x-1/2 pt-3 transition-all duration-200 ${
                  isServicesOpen
                    ? 'opacity-100 translate-y-0 pointer-events-auto'
                    : 'opacity-0 -translate-y-2 pointer-events-none'
                }`}>
                  <div className="bg-white rounded shadow-xl border border-gray-100 py-2 min-w-[260px]">
                    {services.filter(s => s.hasPage).map((service) => {
                      const href = getServiceHref(service.slug);
                      const active = pathname.startsWith(`/${service.slug}-rideau-metallique`) || (service.slug === 'depannage' && pathname === '/');
                      return (
                        <Link
                          key={service.id}
                          href={href}
                          className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                            active
                              ? 'text-secondary-terracotta bg-secondary-sable'
                              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                          }`}
                        >
                          <div>
                            <span className="font-heading font-bold text-[13px]">{service.name}</span>
                            <span className="block text-[11px] text-gray-400 leading-tight">{service.shortDesc}</span>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Other nav items */}
              {navigation.filter(item => item.label !== "Accueil").map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`nav-link ${
                    isActive(item.href) ? 'text-secondary-terracotta' : navTextColor
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* CTA */}
            <div className="flex items-center gap-3">
              <a
                href={siteConfig.phoneLink}
                className="hidden md:flex items-center gap-2 text-sm font-bold text-white px-5 py-2.5 transition-all duration-300 hover:opacity-90"
                style={{ background: '#E07B39', borderRadius: '4px' }}
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {siteConfig.phone}
              </a>

              <a
                href={siteConfig.phoneLink}
                className="md:hidden flex items-center justify-center w-10 h-10 text-white transition-all duration-300"
                style={{ background: '#E07B39', borderRadius: '4px' }}
                aria-label={`Appeler ${siteConfig.phone}`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </a>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`lg:hidden p-2 transition-colors ${
                  isScrolled || !isHomepage ? 'text-gray-900' : 'text-white'
                }`}
                aria-label="Menu"
                aria-expanded={isMenuOpen}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8h16M4 16h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-[60] transition-opacity duration-300 ${
        isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}>
        <div className="absolute inset-0 bg-dark/95" onClick={() => setIsMenuOpen(false)} />

        <div className={`relative z-10 h-full flex flex-col justify-between px-8 pt-28 pb-10 overflow-y-auto transition-transform duration-400 ${
          isMenuOpen ? 'translate-y-0' : '-translate-y-8'
        }`}>
          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-7 right-6 text-white/60 hover:text-white transition-colors"
            aria-label="Fermer"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <nav className="flex flex-col">
            {/* Accueil */}
            <Link
              href="/"
              onClick={() => setIsMenuOpen(false)}
              className={`py-4 border-b border-white/10 font-display text-3xl transition-colors ${
                pathname === '/' ? 'text-secondary-terracotta' : 'text-white/70 hover:text-white'
              }`}
            >
              Accueil
            </Link>

            {/* Services accordion */}
            <div className="border-b border-white/10">
              <button
                onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                className={`w-full flex items-center justify-between py-4 font-display text-3xl transition-colors ${
                  isServiceActive() ? 'text-secondary-terracotta' : 'text-white/70 hover:text-white'
                }`}
              >
                Services
                <svg
                  className={`w-5 h-5 transition-transform duration-200 ${isMobileServicesOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <div className={`overflow-hidden transition-all duration-300 ${
                isMobileServicesOpen ? 'max-h-[500px] pb-3' : 'max-h-0'
              }`}>
                {services.filter(s => s.hasPage).map((service) => {
                  const href = getServiceHref(service.slug);
                  const active = pathname.startsWith(`/${service.slug}-rideau-metallique`) || (service.slug === 'depannage' && pathname === '/');
                  return (
                    <Link
                      key={service.id}
                      href={href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`flex items-center gap-3 py-2.5 pl-4 transition-colors ${
                        active ? 'text-secondary-terracotta' : 'text-white/50 hover:text-white/80'
                      }`}
                    >
                      <span className="text-lg font-heading">{service.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Other links */}
            {navigation.filter(item => item.label !== "Accueil").map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`py-4 border-b border-white/10 font-display text-3xl transition-colors ${
                  isActive(item.href) ? 'text-secondary-terracotta' : 'text-white/70 hover:text-white'
                }`}
                style={{ transitionDelay: `${(index + 2) * 40}ms` }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div>
            <a
              href={siteConfig.phoneLink}
              className="flex items-center justify-center gap-3 w-full py-4 text-white font-bold text-xl"
              style={{ background: '#E07B39', borderRadius: '4px' }}
            >
              {siteConfig.phone}
            </a>
            <p className="text-white/30 text-xs text-center mt-4">Disponible 24h/24, 7j/7</p>
          </div>
        </div>
      </div>
    </>
  );
}
