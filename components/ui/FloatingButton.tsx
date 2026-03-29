"use client";

import { useState, useEffect } from "react";
import { siteConfig } from "@/config/site";

export function FloatingButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <a
      href={siteConfig.phoneLink}
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-2
                 text-white px-5 py-3 font-bold text-sm
                 transition-all duration-400 shadow-2xl
                 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0 pointer-events-none'}`}
      style={{
        background: '#1B7A4E',
        borderRadius: '14px',
        boxShadow: '0 8px 32px rgba(27, 122, 78, 0.35), 0 4px 16px rgba(0, 0, 0, 0.15)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
      }}
      aria-label={`Appeler le ${siteConfig.phone}`}
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
      <span className="hidden sm:inline">{siteConfig.phone}</span>
      <span className="sm:hidden">Urgence</span>
    </a>
  );
}
