import { siteConfig } from "@/config/site";

interface CTAProps {
  title?: string;
  subtitle?: string;
  variant?: "default" | "urgence" | "devis";
}

export function CTA({ title, subtitle, variant = "default" }: CTAProps) {
  const defaults = {
    default: {
      title: `Besoin d'un spécialiste à ${siteConfig.city} ?`,
      subtitle: `Intervention 24h/24, 7j/7 dans tout ${siteConfig.city} et les ${siteConfig.department}.`,
    },
    urgence: {
      title: `Urgence rideau métallique ?`,
      subtitle: `Rideau bloqué, moteur en panne ? Nos techniciens sont disponibles immédiatement.`,
    },
    devis: {
      title: `Demandez votre devis gratuit`,
      subtitle: `Devis détaillé communiqué par téléphone. Sans engagement.`,
    },
  };

  const displayTitle = title || defaults[variant].title;
  const displaySubtitle = subtitle || defaults[variant].subtitle;

  return (
    <section className="relative py-24 md:py-32 bg-dark overflow-hidden">
      {/* Subtle noise texture */}
      <div className="noise absolute inset-0" />

      <div className="container relative z-10 text-center">
        {variant === "urgence" && (
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-red-400 mb-6">
            <span className="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse" />
            Urgence 24h/24
          </span>
        )}

        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-white leading-[1.1] mb-5 max-w-3xl mx-auto">
          {displayTitle}
        </h2>
        <p className="text-white/40 text-lg max-w-xl mx-auto mb-12">
          {displaySubtitle}
        </p>

        {/* Giant phone number */}
        <a href={siteConfig.phoneLink} className="inline-block group mb-10">
          <span className="block font-display text-5xl md:text-7xl lg:text-8xl text-white group-hover:text-secondary-terracotta transition-colors duration-300">
            {siteConfig.phone}
          </span>
          <span className="block text-xs text-white/25 mt-2 tracking-wide uppercase">
            Cliquez pour appeler — Disponible 24h/24
          </span>
        </a>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a href={siteConfig.phoneLink}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-[15px] font-bold text-dark bg-white hover:bg-gray-100 transition-colors"
            style={{ borderRadius: '4px' }}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Appeler maintenant
          </a>
          <a href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 text-[15px] font-bold text-white/60 border border-white/15 hover:border-white/40 transition-colors"
            style={{ borderRadius: '4px' }}>
            Demander un devis gratuit
          </a>
        </div>

        {/* Minimal trust */}
        <div className="flex flex-wrap justify-center gap-6 mt-12 text-xs text-white/20 uppercase tracking-wider">
          <span>Devis gratuit</span>
          <span>·</span>
          <span>Sans engagement</span>
          <span>·</span>
          <span>24h/24</span>
          <span>·</span>
          <span>{siteConfig.reviews.rating}/5 ({siteConfig.reviews.count} avis)</span>
        </div>
      </div>
    </section>
  );
}
