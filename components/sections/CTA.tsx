import { siteConfig } from "@/config/site";

interface CTAProps {
  title?: string;
  subtitle?: string;
  variant?: "default" | "urgence" | "devis";
}

export function CTA({ title, subtitle, variant = "default" }: CTAProps) {
  const defaultTitle = `Besoin d'un spécialiste rideau métallique à ${siteConfig.city} ?`;
  const defaultSubtitle = `Intervention rapide dans tout le département de l'${siteConfig.department}. Devis gratuit, sans engagement.`;

  return (
    <section className="relative overflow-hidden bg-primary-600">
      {/* Subtle dot pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '24px 24px'
        }} />
      </div>

      <div className="container relative py-16 md:py-20">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Left — content */}
          <div>
            {variant === "urgence" && (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/20 text-white text-sm font-medium mb-5" style={{ borderRadius: '6px' }}>
                <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                Urgence 24h/24
              </div>
            )}
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4">
              {title || defaultTitle}
            </h2>
            <p className="text-white/70 text-lg leading-relaxed mb-6">
              {subtitle || defaultSubtitle}
            </p>

            {/* Trust points */}
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/60">
              {["Devis gratuit", "Intervention 30-60 min", "Garantie pièces et main-d'œuvre"].map((item, i) => (
                <span key={i} className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Right — action card */}
          <div className="bg-white p-8" style={{ borderRadius: '12px' }}>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Appelez maintenant</h3>
            <p className="text-gray-500 text-sm mb-6">Un technicien prend en charge votre demande immédiatement.</p>

            <a
              href={siteConfig.phoneLink}
              className="flex items-center justify-center gap-3 w-full py-4 bg-primary-600 text-white text-xl font-bold hover:bg-primary-700 transition-colors shadow-lg shadow-primary-600/25 mb-4"
              style={{ borderRadius: '8px' }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {siteConfig.phone}
            </a>

            <div className="text-center">
              <span className="text-gray-400 text-xs">ou</span>
            </div>

            <a
              href="/contact"
              className="flex items-center justify-center gap-2 w-full py-3.5 bg-gray-50 text-gray-700 font-semibold border border-gray-200 hover:border-primary-300 hover:text-primary-700 transition-all mt-3"
              style={{ borderRadius: '8px' }}
            >
              Demander un devis en ligne
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>

            <p className="text-center text-gray-400 text-xs mt-4">
              {siteConfig.address} · Disponible 24h/24
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
