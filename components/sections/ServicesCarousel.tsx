"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

type Service = {
  id: string;
  slug: string;
  name: string;
  shortDesc: string;
};

type Props = {
  services: Service[];
  serviceImages: Record<string, string>;
  city: string;
  department: string;
};

export function ServicesCarousel({ services, serviceImages, city, department }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  }, []);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = 300;
    el.scrollBy({ left: direction === "left" ? -cardWidth : cardWidth, behavior: "smooth" });
    setTimeout(checkScroll, 350);
  };

  return (
    <section className="section bg-white">
      <div className="container">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="section-label">
              <span className="w-2 h-2 bg-primary-500 rounded-full" />
              Nos Services
            </span>
            <h2 className="section-title">Services Rideau Metallique {city}</h2>
            <p className="text-gray-500 mt-2 max-w-xl text-sm">
              Intervention pour tous vos besoins en rideau metallique a {city} et dans l&apos;{department}.
            </p>
          </div>

          {/* Arrows desktop */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              aria-label="Precedent"
              className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              aria-label="Suivant"
              className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Carousel track */}
        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory -mx-4 px-4 pb-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {services.map((service) => {
            const bgImage = serviceImages[service.slug] || "";
            return (
              <Link
                key={service.id}
                href={`/${service.slug}-rideau-metallique-creil`}
                className="group relative flex-shrink-0 w-[280px] sm:w-[300px] h-[220px] overflow-hidden rounded-2xl snap-start transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
              >
                {bgImage && (
                  <>
                    <div className="absolute inset-0">
                      <Image
                        src={bgImage}
                        alt={service.name}
                        title={service.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        quality={70}
                        loading="lazy"
                        sizes="300px"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent group-hover:from-black/80 transition-all duration-300" />
                  </>
                )}
                <div className="relative z-10 flex flex-col justify-end h-full p-5">
                  <h3 className="font-bold text-lg text-white mb-1">{service.name}</h3>
                  <p className="text-white/75 text-sm line-clamp-2 mb-2">{service.shortDesc}</p>
                  <span className="text-sm font-semibold text-primary-300 group-hover:text-primary-200 inline-flex items-center gap-1">
                    En savoir plus
                    <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
