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
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/gallery/rideau-metallique-creil.webp"
          alt={`Dépannage rideau métallique ${siteConfig.city}`}
          fill
          sizes="100vw"
          className="object-cover brightness-75"
          priority
        />
        {/* Strong overlay for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628]/95 via-[#0a1628]/90 to-[#0a1628]/70 lg:to-[#0a1628]/40" />
        {/* Additional vignette for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30" />
      </div>

      {/* Content */}
      <div className="container relative z-10 py-24 md:py-32">
        <div className={`${sideImage ? 'grid lg:grid-cols-2 gap-12 items-center' : ''}`}>
          <div className="max-w-2xl">
            {/* Thin terracotta rule */}
            <div className="rule-accent mb-8" />

            <h1 className="text-5xl md:text-6xl lg:text-[5.5rem] text-white leading-[1.05] mb-8 drop-shadow-2xl">
              {displayTitle.split(/(Creil)/i).map((part, i) =>
                part.toLowerCase() === 'creil' ? (
                  <span key={i} className="text-accent">{part}</span>
                ) : (
                  <span key={i}>{part}</span>
                )
              )}
            </h1>

            <p className="text-white/80 text-lg md:text-xl max-w-lg leading-relaxed mb-10 drop-shadow-lg">
              {displaySubtitle}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 mb-10">
              <a href={siteConfig.phoneLink} className="btn-phone text-base">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {siteConfig.phone}
              </a>
              <a href="/contact" className="btn-secondary border-white/20 text-white hover:bg-white hover:text-gray-900">
                Devis gratuit
              </a>
            </div>
          </div>

          {/* Optional side image */}
          {sideImage && (
            <div className="hidden lg:flex items-center justify-end">
              <div className="relative w-[480px] h-[580px]">
                <Image
                  src={sideImage}
                  alt="Rideau métallique lame pleine"
                  fill
                  className="object-contain drop-shadow-2xl"
                />
              </div>
            </div>
          )}
        </div>

        {/* Trust strip — thin, typographic */}
        <div className="border-t border-white/20 pt-6 flex flex-wrap gap-x-10 gap-y-3 text-sm text-white/50">
          {content.trustBadges.map((badge, i) => (
            <span key={i} className="flex items-center gap-2">
              <span className="text-secondary-terracotta font-bold">{badge.title}</span>
              <span className="text-white/30">—</span>
              <span>{badge.subtitle}</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
