"use client";

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
}

/* Couleurs d'avatar Google-style (rotation déterministe) */
const avatarColors = [
  "bg-blue-600",
  "bg-red-500",
  "bg-green-600",
  "bg-purple-600",
  "bg-orange-500",
  "bg-teal-600",
  "bg-pink-500",
  "bg-indigo-500",
];

function GoogleLogo({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

function StarRating({ rating, size = "sm" }: { rating: number; size?: "sm" | "md" }) {
  const sizeClass = size === "md" ? "w-5 h-5" : "w-4 h-4";
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`${sizeClass} ${i < rating ? "text-yellow-400" : "text-gray-600"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export function Reviews({ title = "Avis Clients", subtitle, items }: ReviewsProps) {
  const defaultSubtitle = `${siteConfig.reviews.rating}/5 sur ${siteConfig.reviews.count} avis Google vérifiés.`;

  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.name,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: siteConfig.reviews.rating,
      reviewCount: siteConfig.reviews.count,
      bestRating: 5,
      worstRating: 1,
    },
    review: items.map((item) => ({
      "@type": "Review",
      author: { "@type": "Person", name: item.name },
      reviewRating: {
        "@type": "Rating",
        ratingValue: item.rating,
        bestRating: 5,
      },
      reviewBody: item.text,
    })),
  };

  return (
    <section className="section bg-[#1a1a1a]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
      />

      <div className="container">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-14">
          <div>
            <div className="rule-accent mb-6" />
            <h2 className="section-title text-white">{title}</h2>
            <p className="section-subtitle text-gray-400">
              {subtitle || defaultSubtitle}
            </p>
          </div>
          {/* Note globale Google */}
          <div className="flex items-center gap-3 shrink-0 bg-[#222] px-5 py-3 rounded-lg">
            <GoogleLogo className="w-7 h-7" />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-white font-bold text-lg">
                  {siteConfig.reviews.rating}/5
                </span>
                <StarRating rating={5} size="sm" />
              </div>
              <p className="text-gray-500 text-xs">{siteConfig.reviews.count} avis Google</p>
            </div>
          </div>
        </div>

        {/* Grille d'avis — cards style Google */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.slice(0, 6).map((review, index) => (
            <div
              key={index}
              className="bg-[#222] rounded-2xl p-6 hover:bg-[#282828] transition-colors"
            >
              {/* Header : Avatar + Nom + Google */}
              <div className="flex items-center gap-3 mb-4">
                {/* Avatar coloré */}
                <div
                  className={`w-10 h-10 ${avatarColors[index % avatarColors.length]} rounded-full flex items-center justify-center text-white font-bold text-sm`}
                >
                  {review.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-white text-sm truncate">
                    {review.name}
                  </p>
                  <div className="flex items-center gap-1.5">
                    <span className="text-gray-500 text-xs">Avis de</span>
                    <GoogleLogo className="w-3.5 h-3.5" />
                    <span className="text-gray-500 text-xs">Google</span>
                  </div>
                </div>
              </div>

              {/* Note + Étoiles + Date */}
              <div className="flex items-center gap-2 mb-3">
                <span className="text-white font-bold text-sm">
                  {review.rating}/5
                </span>
                <StarRating rating={review.rating} />
                <span className="text-gray-600 text-xs">·</span>
                <span className="text-gray-500 text-xs">{review.date}</span>
              </div>

              {/* Texte de l'avis */}
              <p className="text-gray-300 text-sm leading-relaxed">
                {review.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
