"use client";

import { useState, useEffect, useRef } from "react";
import { siteConfig } from "@/config/site";

/**
 * Floating phone CTA button (bottom-right).
 * - Shows after 300px scroll
 * - Auto-expands phone number after 30 seconds on page
 * - Expands when user scrolls back up (exit intent proxy)
 * - Hidden on mobile (replaced by MobileCTABar)
 */
export function FloatingPhoneButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const lastScrollY = useRef(0);
  const expandTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const collapseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Auto-expand after 30 seconds on page
    const autoExpandTimer = setTimeout(() => {
      setIsExpanded(true);
      // Collapse after 5 seconds
      collapseTimeoutRef.current = setTimeout(() => {
        setIsExpanded(false);
      }, 5000);
    }, 30000);

    const handleScroll = () => {
      const currentY = window.scrollY;
      setIsVisible(currentY > 300);

      // Detect scroll up (exit intent proxy) -- only trigger if user scrolled up significantly
      if (currentY > 300 && lastScrollY.current - currentY > 120) {
        setIsExpanded(true);
        // Clear any existing collapse timer
        if (collapseTimeoutRef.current) clearTimeout(collapseTimeoutRef.current);
        collapseTimeoutRef.current = setTimeout(() => {
          setIsExpanded(false);
        }, 4000);
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(autoExpandTimer);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      if (expandTimeoutRef.current) clearTimeout(expandTimeoutRef.current);
      if (collapseTimeoutRef.current) clearTimeout(collapseTimeoutRef.current);
    };
  }, []);

  const showNumber = isExpanded || isHovered;

  return (
    <a
      href={siteConfig.phoneLink}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`fixed bottom-6 right-6 z-50 hidden md:flex items-center gap-0
                   text-white font-bold text-sm
                   transition-all duration-300 ease-out
                   ${isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0 pointer-events-none"}`}
      aria-label={`Appeler le ${siteConfig.phone}`}
    >
      {/* Phone number tooltip on hover/expand */}
      <span
        className={`overflow-hidden whitespace-nowrap bg-primary-700 text-white font-bold text-sm rounded-full py-3.5 transition-all duration-300 ease-out ${
          showNumber ? "max-w-[200px] opacity-100 px-5 mr-[-20px] pr-8" : "max-w-0 opacity-0 px-0 mr-0"
        }`}
      >
        {siteConfig.phone}
      </span>

      {/* Green circle button */}
      <div
        className="relative w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0"
        style={{
          background: "#1B7A4E",
          boxShadow: "0 4px 20px rgba(27, 122, 78, 0.45), 0 2px 8px rgba(0, 0, 0, 0.15)",
        }}
      >
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full animate-ping" style={{ background: "rgba(27, 122, 78, 0.3)", animationDuration: "2s" }} />

        {/* Phone icon */}
        <svg className="w-5 h-5 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          />
        </svg>
      </div>
    </a>
  );
}
