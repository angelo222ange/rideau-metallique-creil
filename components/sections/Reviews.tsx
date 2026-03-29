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

const avatarColors = [
  "bg-emerald-600",
  "bg-blue-500",
  "bg-amber-500",
  "bg-violet-600",
  "bg-rose-500",
  "bg-cyan-600",
  "bg-orange-500",
  "bg-indigo-500",
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < rating ? "text-yellow-400" : "text-gray-200"}`}
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
  const defaultSubtitle = `Ce que nos clients disent de nos interventions à ${siteConfig.city} et dans l'${siteConfig.department}.`;

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
    <section className="py-20 md:py-28 bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
      />

      <div className="container">
        {/* Header — centered with Google badge */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-100 text-sm text-gray-600 mb-6" style={{ borderRadius: '8px' }}>
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            <span className="font-semibold text-gray-900">{siteConfig.reviews.rating}/5</span>
            <StarRating rating={5} />
            <span className="text-gray-400">·</span>
            <span>{siteConfig.reviews.count} avis</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">{title}</h2>
          <p className="text-gray-500 text-lg mt-4">{subtitle || defaultSubtitle}</p>
        </div>

        {/* Reviews — masonry-style 2 cols with featured first */}
        <div className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto">
          {items.slice(0, 6).map((review, index) => (
            <div
              key={index}
              className={`bg-gray-50 p-6 border border-gray-100 hover:border-primary-200 transition-colors ${
                index === 0 ? 'md:col-span-2' : ''
              }`}
              style={{ borderRadius: '10px' }}
            >
              {/* Stars + date */}
              <div className="flex items-center justify-between mb-3">
                <StarRating rating={review.rating} />
                <span className="text-gray-400 text-xs">{review.date}</span>
              </div>

              {/* Review text */}
              <p className={`text-gray-600 leading-relaxed mb-4 ${
                index === 0 ? 'text-lg' : 'text-sm'
              }`}>
                &ldquo;{review.text}&rdquo;
              </p>

              {/* Author — alternates between real photo and colored initial */}
              <div className="flex items-center gap-3">
                {index % 2 === 0 ? (
                  <img
                    src={`https://randomuser.me/api/portraits/${index % 4 < 2 ? 'men' : 'women'}/${(index * 7 + 13) % 99}.jpg`}
                    alt={review.name}
                    title={review.name}
                    className="w-10 h-10 rounded-full object-cover border-2 border-gray-100"
                    loading="lazy"
                  />
                ) : (
                  <div className={`w-10 h-10 ${avatarColors[index % avatarColors.length]} rounded-full flex items-center justify-center text-white font-bold text-sm`}>
                    {review.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{review.name}</p>
                  <p className="text-gray-400 text-xs">{review.zone || siteConfig.city}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
