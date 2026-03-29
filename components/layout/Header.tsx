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
      {/* Top bar */}
      <div className="bg-gray-900 text-white/70 text-xs py-2 hidden md:block">
        <div className="container flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {siteConfig.address}
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Disponible 24h/24, 7j/7
            </span>
          </div>
          <a href={`mailto:${siteConfig.email}`} className="hover:text-white transition-colors">
            {siteConfig.email}
          </a>
        </div>
      </div>

      {/* Main header */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white shadow-sm'
          : 'bg-white border-b border-gray-100'
      }`}>
        <div className="container">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-primary-600 flex items-center justify-center text-white font-bold text-sm" style={{ borderRadius: '6px' }}>
                D
              </div>
              <div className="hidden sm:block">
                <span className="font-bold text-gray-900 text-sm">{siteConfig.name}</span>
                <span className="block text-[10px] text-gray-400 leading-tight -mt-0.5">Rideau Métallique</span>
              </div>
            </Link>

            {/* Nav Desktop */}
            <nav className="hidden lg:flex items-center gap-1">
              <Link
                href="/"
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  pathname === '/' ? 'text-primary-600' : 'text-gray-600 hover:text-gray-900'
                }`}
                style={{ borderRadius: '6px' }}
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
                  className={`px-3 py-2 text-sm font-medium flex items-center gap-1 transition-colors ${
                    pathname.includes('-rideau-metallique-') ? 'text-primary-600' : 'text-gray-600 hover:text-gray-900'
                  }`}
                  style={{ borderRadius: '6px' }}
                >
                  Services
                  <svg className={`w-3.5 h-3.5 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <div className={`absolute top-full left-0 pt-2 transition-all duration-200 ${
                  isServicesOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-1 pointer-events-none'
                }`}>
                  <div className="bg-white shadow-lg border border-gray-100 py-1.5 min-w-[240px]" style={{ borderRadius: '10px' }}>
                    {services.filter(s => s.hasPage).map((service) => {
                      const href = getServiceHref(service.slug);
                      return (
                        <Link
                          key={service.id}
                          href={href}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:text-primary-600 hover:bg-primary-50 transition-colors"
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
                  className={`px-3 py-2 text-sm font-medium transition-colors ${
                    isActive(item.href) ? 'text-primary-600' : 'text-gray-600 hover:text-gray-900'
                  }`}
                  style={{ borderRadius: '6px' }}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* CTA */}
            <div className="flex items-center gap-2">
              <a
                href={siteConfig.phoneLink}
                className="hidden md:flex items-center gap-2 text-sm font-semibold text-white px-4 py-2 bg-primary-600 hover:bg-primary-700 transition-colors"
                style={{ borderRadius: '8px' }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {siteConfig.phone}
              </a>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 text-gray-600"
                aria-label="Menu"
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
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)} />

        <div className={`absolute right-0 top-0 h-full w-[300px] bg-white shadow-2xl transition-transform duration-300 ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <div className="p-6 pt-20 overflow-y-auto h-full">
            <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-5 right-5 p-2 text-gray-400 hover:text-gray-600"
              aria-label="Fermer"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <nav className="space-y-1">
              <Link href="/" onClick={() => setIsMenuOpen(false)}
                className={`block px-3 py-3 text-base font-medium transition-colors ${pathname === '/' ? 'text-primary-600 bg-primary-50' : 'text-gray-700 hover:bg-gray-50'}`}
                style={{ borderRadius: '8px' }}>
                Accueil
              </Link>

              <div>
                <button
                  onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                  className="w-full flex items-center justify-between px-3 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  style={{ borderRadius: '8px' }}
                >
                  Services
                  <svg className={`w-4 h-4 transition-transform ${isMobileServicesOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isMobileServicesOpen && (
                  <div className="ml-3 space-y-0.5">
                    {services.filter(s => s.hasPage).map((service) => (
                      <Link
                        key={service.id}
                        href={getServiceHref(service.slug)}
                        onClick={() => setIsMenuOpen(false)}
                        className="block px-3 py-2 text-sm text-gray-500 hover:text-primary-600 transition-colors"
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
                  className={`block px-3 py-3 text-base font-medium transition-colors ${
                    isActive(item.href) ? 'text-primary-600 bg-primary-50' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                  style={{ borderRadius: '8px' }}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="mt-8 pt-6 border-t border-gray-100">
              <a
                href={siteConfig.phoneLink}
                className="flex items-center justify-center gap-2 w-full py-3 bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors"
                style={{ borderRadius: '8px' }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {siteConfig.phone}
              </a>
              <p className="text-gray-400 text-xs text-center mt-3">{siteConfig.address}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
