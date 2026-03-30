"use client";

import { useState } from "react";
import { siteConfig } from "@/config/site";

interface ReviewItem {
  name: string;
  rating: number;
  text: string;
  date: string;
  zone?: string;
  service?: string;
}

interface ReviewsProps {
  title?: string;
  subtitle?: string;
  items: ReviewItem[];
  allReviewsLink?: string;
}

/**
 * Noms masculins et féminins français pour gender-correct photos.
 * Utilisé pour déterminer le dossier randomuser.me (men/ ou women/).
 */
const feminineNames = new Set([
  "sophie", "nathalie", "fatima", "caroline", "samira", "isabelle", "amandine",
  "marie", "julie", "sarah", "laura", "emma", "léa", "chloé", "manon",
  "camille", "alice", "charlotte", "margaux", "hélène", "valérie", "sylvie",
  "martine", "sandrine", "aurélie", "céline", "virginie", "stéphanie",
  "karine", "myriam", "aïcha", "yasmine", "leïla", "rachida", "djamila",
  "patricia", "brigitte", "claudine", "monique", "francoise", "élise",
]);

function isFeminineName(name: string): boolean {
  const firstName = name.split(/[\s.]/)[0].toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return feminineNames.has(firstName);
}

/**
 * Génère un ID photo UNIQUE par nom (hash déterministe).
 * Comme ça, "Jacques L." a TOUJOURS la même photo partout sur le site.
 */
function getPhotoId(name: string): number {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = ((hash << 5) - hash) + name.charCodeAt(i);
    hash |= 0;
  }
  return (Math.abs(hash) % 70) + 1; // 1-70 range pour randomuser.me
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-3.5 h-3.5 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-200 fill-gray-200"}`}
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function GoogleLogo() {
  return (
    <svg className="w-4 h-4 inline-block" viewBox="0 0 24 24">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}

/** Convertit "Février 2025" en "il y a 13 mois" etc. */
function timeAgo(dateStr: string): string {
  const months: Record<string, number> = {
    "janvier": 0, "février": 1, "mars": 2, "avril": 3, "mai": 4, "juin": 5,
    "juillet": 6, "août": 7, "septembre": 8, "octobre": 9, "novembre": 10, "décembre": 11,
  };
  const parts = dateStr.toLowerCase().split(" ");
  if (parts.length !== 2) return dateStr;
  const month = months[parts[0]];
  const year = parseInt(parts[1]);
  if (month === undefined || isNaN(year)) return dateStr;

  const reviewDate = new Date(year, month);
  const now = new Date();
  const diffMonths = (now.getFullYear() - reviewDate.getFullYear()) * 12 + (now.getMonth() - reviewDate.getMonth());

  if (diffMonths <= 0) return "ce mois-ci";
  if (diffMonths === 1) return "il y a 1 mois";
  if (diffMonths < 12) return `il y a ${diffMonths} mois`;
  const years = Math.floor(diffMonths / 12);
  return years === 1 ? "il y a 1 an" : `il y a ${years} ans`;
}

export function Reviews({ title = "Avis Clients", subtitle, items, allReviewsLink }: ReviewsProps) {
  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 3;
  const displayItems = items.slice(0, 9); // Max 9 avis
  const maxStart = Math.max(0, displayItems.length - visibleCount);

  const next = () => setStartIndex((prev) => Math.min(prev + 1, maxStart));
  const prev = () => setStartIndex((prev) => Math.max(prev - 1, 0));

  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.name,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: siteConfig.reviews.rating,
      reviewCount: siteConfig.reviews.count,
      bestRating: 5,
    },
    review: displayItems.map((item) => ({
      "@type": "Review",
      author: { "@type": "Person", name: item.name },
      reviewRating: { "@type": "Rating", ratingValue: item.rating, bestRating: 5 },
      reviewBody: item.text,
    })),
  };

  return (
    <section className="py-24 bg-gray-50 relative overflow-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }} />
      <div className="absolute top-0 left-0 w-80 h-80 bg-primary-50 rounded-full blur-3xl opacity-30" />

      <div className="container relative">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <p className="text-primary-600 text-sm font-semibold uppercase tracking-widest mb-3">Avis clients</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">{title}</h2>
            <p className="text-gray-500 text-lg mt-2">{subtitle || `${siteConfig.reviews.rating}/5 sur ${siteConfig.reviews.count} avis Google vérifiés.`}</p>
          </div>

          {/* Navigation carousel */}
          <div className="flex items-center gap-2">
            <button
              onClick={prev}
              disabled={startIndex === 0}
              className="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 text-gray-400 hover:text-gray-900 hover:border-gray-300 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              style={{ borderRadius: "10px" }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button
              onClick={next}
              disabled={startIndex >= maxStart}
              className="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 text-gray-400 hover:text-gray-900 hover:border-gray-300 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              style={{ borderRadius: "10px" }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div className="overflow-hidden">
          <div
            className="flex gap-5 transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${startIndex * (100 / visibleCount)}%)` }}
          >
            {displayItems.map((review, index) => {
              const isFeminine = isFeminineName(review.name);
              const photoId = getPhotoId(review.name);
              const photoGender = isFeminine ? "women" : "men";
              const showPhoto = index % 2 === 0; // Alterner photo / initiale
              const isFeatured = index === 0;

              return (
                <div
                  key={index}
                  className={`flex-shrink-0 w-full sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)] p-6 transition-all duration-300 ${
                    isFeatured
                      ? "bg-primary-50 border-2 border-primary-200 shadow-lg shadow-primary-600/10 ring-1 ring-primary-100"
                      : "bg-white border border-gray-100 hover:border-gray-200 hover:shadow-lg"
                  }`}
                  style={{ borderRadius: "16px" }}
                >
                  {/* Featured badge */}
                  {isFeatured && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary-600 text-white text-[10px] font-bold uppercase tracking-wider rounded-full mb-3">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      Avis du mois
                    </div>
                  )}

                  {/* Header — Format Google */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      {/* Photo ou initiale */}
                      {showPhoto ? (
                        <img
                          src={`https://randomuser.me/api/portraits/${photoGender}/${photoId}.jpg`}
                          alt={review.name}
                          title={review.name}
                          className={`rounded-full object-cover ${isFeatured ? "w-12 h-12" : "w-10 h-10"}`}
                          loading="lazy"
                        />
                      ) : (
                        <div className={`${isFeatured ? "w-12 h-12 text-base" : "w-10 h-10 text-sm"} ${
                          ['bg-blue-500','bg-emerald-500','bg-amber-500','bg-violet-500','bg-rose-500','bg-cyan-500'][index % 6]
                        } rounded-full flex items-center justify-center text-white font-bold`}>
                          {review.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <div>
                        <p className={`font-semibold text-gray-900 ${isFeatured ? "text-base" : "text-sm"}`}>{review.name}</p>
                        <p className="text-gray-400 text-xs flex items-center gap-1">
                          Avis de <GoogleLogo /> <span className="text-blue-600 font-medium">Google</span>
                        </p>
                      </div>
                    </div>
                    {/* 3 dots menu (decorative) */}
                    <svg className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                      <circle cx="12" cy="5" r="1.5" />
                      <circle cx="12" cy="12" r="1.5" />
                      <circle cx="12" cy="19" r="1.5" />
                    </svg>
                  </div>

                  {/* Rating + time ago */}
                  <div className="flex items-center gap-2 mb-3">
                    <StarRating rating={review.rating} />
                    <span className="text-gray-400 text-xs">· {timeAgo(review.date)}</span>
                  </div>

                  {/* Review text */}
                  <p className={`text-gray-600 leading-relaxed ${isFeatured ? "text-sm" : "text-sm line-clamp-4"}`}>
                    {review.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dots indicator -- min 44px touch target via padding */}
        <div className="flex justify-center gap-0 mt-6">
          {Array.from({ length: maxStart + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => setStartIndex(i)}
              className="p-3 flex items-center justify-center"
              aria-label={`Aller au groupe d'avis ${i + 1}`}
            >
              <span
                className={`block h-1.5 transition-all duration-300 ${
                  i === startIndex ? "w-6 bg-primary-600" : "w-1.5 bg-gray-300"
                }`}
                style={{ borderRadius: "100px" }}
              />
            </button>
          ))}
        </div>

        {allReviewsLink && (
          <div className="text-center mt-8">
            <a href={allReviewsLink} className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold text-sm transition-colors">
              Voir tous les avis clients
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
