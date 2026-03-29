import Image from "next/image";
import { siteConfig } from "@/config/site";
import { getPageContent } from "@/lib/content";
import homeContent from "@/content/pages/home.json";

const content = getPageContent(homeContent);

interface HeroProps {
  badge?: string;
  title?: string;
  subtitle?: string;
  sideImage?: string;
}

export function Hero({ title, subtitle, sideImage }: HeroProps) {
  const displayTitle = title || content.hero.title;
  const displaySubtitle = subtitle || content.hero.subtitle;

  return (
    <section className="relative overflow-hidden bg-white">
      {/* Top accent bar */}
      <div className="h-1 bg-gradient-to-r from-primary-600 via-emerald-500 to-primary-700" />

      <div className="container py-16 md:py-20 lg:py-24">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* LEFT — Content (7 cols) */}
          <div className="lg:col-span-7">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 border border-primary-100 text-primary-700 text-sm font-medium mb-6" style={{ borderRadius: '8px' }}>
              <span className="w-2 h-2 bg-primary-500 rounded-full animate-pulse" />
              Disponible 24h/24 — 7j/7
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-[1.1] mb-6 tracking-tight">
              {displayTitle.split(/(Creil)/i).map((part, i) =>
                part.toLowerCase() === 'creil' ? (
                  <span key={i} className="text-primary-600">{part}</span>
                ) : (
                  <span key={i}>{part}</span>
                )
              )}
            </h1>

            <p className="text-gray-500 text-lg md:text-xl max-w-xl leading-relaxed mb-8">
              {displaySubtitle}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 mb-10">
              <a
                href={siteConfig.phoneLink}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors shadow-lg shadow-primary-600/25"
                style={{ borderRadius: '8px' }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {siteConfig.phone}
              </a>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-gray-700 font-semibold border-2 border-gray-200 hover:border-primary-300 hover:text-primary-700 transition-all"
                style={{ borderRadius: '8px' }}
              >
                Devis gratuit
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>

            {/* Stats row */}
            <div className="flex gap-8 lg:gap-12">
              {[
                { value: `${siteConfig.reviews.rating}/5`, label: `${siteConfig.reviews.count} avis Google` },
                { value: `${siteConfig.experience}+`, label: "ans d'expérience" },
                { value: "30 min", label: "délai intervention" },
              ].map((stat, i) => (
                <div key={i}>
                  <p className="text-2xl md:text-3xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-gray-400 text-sm mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Image (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] overflow-hidden" style={{ borderRadius: '12px' }}>
              <Image
                src={sideImage || "/images/gallery/rideau-metallique-creil.webp"}
                alt={`Dépannage rideau métallique ${siteConfig.city}`}
                title={`Dépannage rideau métallique ${siteConfig.city}`}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
                priority
              />
              {/* Gradient overlay bottom */}
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent" />

              {/* Floating card on image */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm p-4" style={{ borderRadius: '8px' }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary-100 flex items-center justify-center flex-shrink-0" style={{ borderRadius: '8px' }}>
                    <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Intervention garantie</p>
                    <p className="text-xs text-gray-400">{siteConfig.address}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative element */}
            <div className="absolute -z-10 -top-4 -right-4 w-full h-full bg-primary-100 opacity-50" style={{ borderRadius: '12px' }} />
          </div>
        </div>
      </div>
    </section>
  );
}
