import Link from "next/link";
import { siteConfig } from "@/config/site";

export default function NotFound() {
  return (
    <main>
      {/* ─── HERO 404 ─── */}
      <section className="pt-32 pb-16 bg-gray-950 relative overflow-hidden min-h-[60vh] flex items-center">
        <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage:'repeating-linear-gradient(45deg, white 0, white 1px, transparent 0, transparent 8px)'}} />
        <div className="container relative text-center">
          <span className="font-extrabold text-[140px] md:text-[200px] text-white/[0.04] leading-none block select-none">
            404
          </span>

          <div className="relative -mt-20 md:-mt-28">
            <p className="text-primary-400 text-sm font-semibold uppercase tracking-widest mb-4">Page introuvable</p>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
              Oups, cette page n&apos;existe pas
            </h1>
            <p className="text-white/50 text-lg max-w-md mx-auto mb-10">
              La page que vous recherchez n&apos;existe pas ou a ete deplacee.
              Pas de panique, nous sommes la pour vous aider !
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/"
                className="px-6 py-3 bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors"
                style={{ borderRadius: '8px' }}
              >
                Retour a l&apos;accueil
              </Link>
              <a
                href={siteConfig.phoneLink}
                className="px-6 py-3 bg-white text-gray-700 font-medium border border-gray-200 hover:border-primary-300 transition-colors"
                style={{ borderRadius: '8px' }}
              >
                {siteConfig.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── LIENS UTILES ─── */}
      <section className="py-24 bg-gray-50 relative overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-50 rounded-full blur-3xl opacity-30" />
        <div className="container relative">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-primary-600 text-sm font-semibold uppercase tracking-widest mb-3">Navigation</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
              Nos services a {siteConfig.city}
            </h2>
            <p className="text-gray-500 text-lg mt-4">
              Retrouvez rapidement ce que vous cherchez parmi nos services de rideau metallique.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              {
                label: "Depannage",
                href: `/depannage-rideau-metallique-${siteConfig.city.toLowerCase()}`,
                desc: "Intervention urgente 24h/24",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
              },
              {
                label: "Installation",
                href: `/installation-rideau-metallique-${siteConfig.city.toLowerCase()}`,
                desc: "Pose sur-mesure",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                ),
              },
              {
                label: "Entretien",
                href: `/entretien-rideau-metallique-${siteConfig.city.toLowerCase()}`,
                desc: "Contrats annuels",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ),
              },
              {
                label: "Motorisation",
                href: `/motorisation-rideau-metallique-${siteConfig.city.toLowerCase()}`,
                desc: "Motorisez votre rideau",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
              },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="bg-white border border-gray-100 hover:border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-8 text-center group"
                style={{ borderRadius: '16px' }}
              >
                <div className="w-14 h-14 bg-primary-50 text-primary-600 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-100 transition-colors" style={{ borderRadius: '14px' }}>
                  {item.icon}
                </div>
                <h3 className="font-extrabold text-gray-900 group-hover:text-primary-600 transition-colors mb-1">
                  {item.label}
                </h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12 space-y-3">
            <p className="text-gray-400 text-sm">Vous ne trouvez toujours pas ?</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/contact"
                className="px-6 py-3 bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors"
                style={{ borderRadius: '8px' }}
              >
                Contactez-nous
              </Link>
              <a
                href={siteConfig.phoneLink}
                className="px-6 py-3 bg-white text-gray-700 font-medium border border-gray-200 hover:border-primary-300 transition-colors"
                style={{ borderRadius: '8px' }}
              >
                {siteConfig.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
