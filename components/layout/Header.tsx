"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { siteConfig, navigation, zones, services } from "@/config/site";

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

  const getServiceHref = (serviceSlug: string): string => {
    if (serviceSlug === "depannage") return "/";
    return `/${serviceSlug}-rideau-metallique-creil`;
  };

  const isActive = (href: string): boolean => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  const handleServicesEnter = () => {
    if (servicesTimeout.current) clearTimeout(servicesTimeout.current);
    setIsServicesOpen(true);
  };

  const handleServicesLeave = () => {
    servicesTimeout.current = setTimeout(() => setIsServicesOpen(false), 150);
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-gray-900 shadow-lg shadow-black/20'
          : 'bg-gray-900'
      }`}>
        <div className="container">
          <div className="flex items-center justify-between h-16 md:h-[72px]">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 md:w-10 md:h-10 overflow-hidden border-2 border-white/20 group-hover:border-primary-500 transition-colors">
                <Image
                  src="/images/logos/depannage-rideau-metallique-creil.webp"
                  alt={`Logo ${siteConfig.name}`}
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                  priority
                  quality={90}
                  sizes="40px"
                />
              </div>
              <div className="hidden sm:block">
                <span className="font-bold text-white text-sm uppercase tracking-wide leading-none">
                  {siteConfig.name}
                </span>
                <span className="block text-[10px] uppercase tracking-[0.2em] text-gray-400 mt-0.5">
                  Rideau Metallique
                </span>
              </div>
            </Link>

            {/* Nav Desktop */}
            <nav className="hidden lg:flex items-center gap-0">
              <Link
                href="/"
                className={`px-3 py-2 text-xs font-bold uppercase tracking-wider transition-colors ${
                  pathname === '/' ? 'text-primary-400' : 'text-white/70 hover:text-white'
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
                  className={`px-3 py-2 text-xs font-bold uppercase tracking-wider flex items-center gap-1 transition-colors ${
                    pathname.includes('-rideau-metallique-') ? 'text-primary-400' : 'text-white/70 hover:text-white'
                  }`}
                >
                  Services
                  <svg className={`w-3 h-3 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <div className={`absolute top-full left-0 pt-2 transition-all duration-200 ${
                  isServicesOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-1 pointer-events-none'
                }`}>
                  <div className="bg-gray-800 border border-white/10 py-1.5 min-w-[240px]">
                    {services.filter(s => s.hasPage).map((service) => {
                      const href = getServiceHref(service.slug);
                      return (
                        <Link
                          key={service.id}
                          href={href}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-white/60 hover:text-primary-400 hover:bg-white/5 transition-colors"
                        >
                          <span className="font-medium">{service.name}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>

              {navigation.filter(item => item.label !== "Accueil").map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 text-xs font-bold uppercase tracking-wider transition-colors ${
                    isActive(item.href) ? 'text-primary-400' : 'text-white/70 hover:text-white'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* CTA + Mobile */}
            <div className="flex items-center gap-3">
              {/* Badge en ligne - Desktop */}
              <span className="hidden md:flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-green-400">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                En ligne
              </span>

              {/* Bouton Telephone */}
              <a
                href={siteConfig.phoneLink}
                className="btn-phone text-sm"
              >
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span className="hidden sm:inline whitespace-nowrap">{siteConfig.phone}</span>
              </a>

              {/* Menu Mobile Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 text-white hover:text-primary-400 transition-colors"
                aria-label="Menu"
                aria-expanded={isMenuOpen}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Bande primary en bas */}
        <div className="h-[2px] bg-primary-600" />
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-[60] transition-opacity duration-300 ${
        isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}>
        <div className="absolute inset-0 bg-gray-900/95 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)} />

        <div className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-300 ${
          isMenuOpen ? 'opacity-100' : 'opacity-0'
        }`}>
          {/* Close button */}
          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-5 right-5 p-3 text-white/60 hover:text-white"
            aria-label="Fermer"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <nav className="flex flex-col items-center gap-2">
            <Link href="/" onClick={() => setIsMenuOpen(false)}
              className={`text-2xl font-bold uppercase tracking-wider transition-colors ${
                pathname === '/' ? 'text-primary-400' : 'text-white/70 hover:text-white'
              }`}>
              Accueil
            </Link>

            {/* Services accordion */}
            <div className="flex flex-col items-center">
              <button
                onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                className="text-2xl font-bold uppercase tracking-wider text-white/70 hover:text-white transition-colors flex items-center gap-2"
              >
                Services
                <svg className={`w-5 h-5 transition-transform ${isMobileServicesOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isMobileServicesOpen && (
                <div className="mt-3 flex flex-col items-center gap-2">
                  {services.filter(s => s.hasPage).map((service) => (
                    <Link
                      key={service.id}
                      href={getServiceHref(service.slug)}
                      onClick={() => setIsMenuOpen(false)}
                      className="text-base text-white/40 hover:text-primary-400 transition-colors"
                    >
                      {service.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {navigation.filter(item => item.label !== "Accueil").map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`text-2xl font-bold uppercase tracking-wider transition-colors ${
                  isActive(item.href) ? 'text-primary-400' : 'text-white/70 hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA phone mobile */}
          <div className="mt-10">
            <a
              href={siteConfig.phoneLink}
              className="btn-phone text-lg px-8 py-4"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              Appeler le {siteConfig.phone}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
