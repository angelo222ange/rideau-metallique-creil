import { siteConfig } from "@/config/site";

interface CTAProps {
  title?: string;
  subtitle?: string;
  variant?: "default" | "urgence" | "devis";
}

export function CTA({ title, subtitle, variant = "default" }: CTAProps) {
  const defaultTitle = `Besoin d'un specialiste rideau metallique a ${siteConfig.city} ?`;
  const defaultSubtitle = `Intervention rapide dans tout le departement de l'${siteConfig.department}. Devis gratuit, sans engagement.`;

  const trustIndicators = [
    {
      value: "24h/24",
      label: "Disponibilite",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      value: "< 30 min",
      label: "Intervention",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      value: "Garanti",
      label: "Pieces et main-d'oeuvre",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="py-12 md:py-16">
      <div className="container">
        <div className="relative overflow-hidden rounded-2xl bg-gray-900">
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900 to-primary-900/40" />

          {/* Subtle dot pattern */}
          <div className="absolute inset-0 opacity-[0.04]" aria-hidden="true">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="cta-dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1" fill="white" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#cta-dots)" />
            </svg>
          </div>

          {/* Glow effect */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary-600/10 rounded-full blur-3xl" />

          <div className="relative px-6 py-12 md:px-12 md:py-16 lg:px-16 lg:py-20">
            <div className="grid lg:grid-cols-5 gap-10 lg:gap-16 items-center">

              {/* Left -- content (3 cols) */}
              <div className="lg:col-span-3">
                {variant === "urgence" && (
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/15 text-white text-sm font-medium rounded-full mb-6">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-red-400"></span>
                    </span>
                    Urgence 24h/24
                  </div>
                )}

                <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-white leading-tight mb-4">
                  {title || defaultTitle}
                </h2>
                <p className="text-gray-400 text-lg leading-relaxed mb-8 max-w-xl">
                  {subtitle || defaultSubtitle}
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 mb-8">
                  <a
                    href={siteConfig.phoneLink}
                    className="inline-flex items-center justify-center gap-2.5 rounded-full bg-primary-600 px-7 py-4 text-white font-bold text-lg shadow-lg shadow-primary-600/30 hover:bg-primary-500 transition-all duration-200"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    {siteConfig.phone}
                  </a>
                  <a
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/20 px-7 py-4 text-white font-semibold hover:bg-white/10 transition-all duration-200"
                  >
                    Demander un devis gratuit
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>

                {/* Trust check marks */}
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-500">
                  {["Devis gratuit", "Sans engagement", "Garantie pieces et main-d'oeuvre"].map((item, i) => (
                    <span key={i} className="flex items-center gap-1.5">
                      <svg className="w-4 h-4 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right -- trust indicators (2 cols) */}
              <div className="lg:col-span-2">
                <div className="space-y-4">
                  {trustIndicators.map((indicator, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-4 bg-white/[0.06] backdrop-blur-sm border border-white/10 rounded-2xl p-5"
                    >
                      <div className="w-12 h-12 rounded-xl bg-primary-600/20 flex items-center justify-center text-primary-400 flex-shrink-0">
                        {indicator.icon}
                      </div>
                      <div>
                        <p className="text-white font-bold text-lg leading-tight">{indicator.value}</p>
                        <p className="text-gray-500 text-sm">{indicator.label}</p>
                      </div>
                    </div>
                  ))}

                  {/* Google rating mini badge */}
                  <div className="flex items-center gap-3 bg-white/[0.06] backdrop-blur-sm border border-white/10 rounded-2xl p-5">
                    <div className="w-12 h-12 rounded-xl bg-yellow-500/20 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-white font-bold text-lg leading-tight">{siteConfig.reviews.rating}/5 Google</p>
                      <p className="text-gray-500 text-sm">{siteConfig.reviews.count} avis verifies</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
