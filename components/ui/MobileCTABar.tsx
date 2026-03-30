"use client";

import { useState, useEffect } from "react";
import { siteConfig } from "@/config/site";

/**
 * Sticky bottom bar for mobile only.
 * Shows phone button (green, left) + "Devis gratuit" button (right).
 * Hidden when at top of page, visible after scrolling.
 */
export function MobileCTABar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 200);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-[45] md:hidden transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      {/* Subtle gradient fade above the bar */}
      <div className="h-4 bg-gradient-to-t from-white to-transparent" />

      <div className="bg-white border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] px-4 py-3 safe-area-bottom">
        <div className="flex items-center gap-3">
          {/* Phone button - green, prominent */}
          <a
            href={siteConfig.phoneLink}
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-full py-3.5 font-bold text-sm text-white shadow-lg transition-all active:scale-[0.97]"
            style={{
              background: "#1B7A4E",
              boxShadow: "0 4px 14px rgba(27, 122, 78, 0.35)",
            }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            Appeler
          </a>

          {/* Devis gratuit button - outline */}
          <a
            href="/contact"
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-full border-2 border-gray-900 py-3.5 font-bold text-sm text-gray-900 transition-all active:scale-[0.97] hover:bg-gray-50"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            Devis gratuit
          </a>
        </div>
      </div>
    </div>
  );
}
