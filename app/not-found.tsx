import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";

export default function NotFound() {
  return (
    <main>
      {/* ─── HERO 404 ─── */}
      <section className="relative overflow-hidden bg-gray-900 min-h-[60vh] flex items-center">
        <Image
          src="/images/gallery/hero-bg-technicien-drm.webp"
          alt="Page introuvable"
          title="Page introuvable"
          fill
          className="object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/95 to-gray-900/80" />
        <div className="container relative z-10 text-center py-16 md:py-20">
          <span className="font-black text-[140px] md:text-[200px] text-white/[0.04] leading-none block select-none">
            404
          </span>

          <div className="relative -mt-20 md:-mt-28">
            <p className="section-label text-primary-400">Page introuvable</p>
            <h1 className="text-white mb-4">
              Oups, cette page n&apos;existe pas
            </h1>
            <div className="divider-industrial-lg mx-auto mt-4" />
            <p className="text-white/60 mt-4 text-lg max-w-md mx-auto mb-10">
              La page que vous recherchez n&apos;existe pas ou a ete deplacee.
              Pas de panique, nous sommes la pour vous aider !
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/" className="btn-primary">
                Retour a l&apos;accueil
              </Link>
              <a href={siteConfig.phoneLink} className="btn-secondary border-white/30 text-white hover:bg-white hover:text-gray-900">
                {siteConfig.phone}
              </a>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-1 h-full bg-primary-600 hidden lg:block" />
      </section>

      {/* ─── LIENS UTILES ─── */}
      <section className="section bg-gray-50 bg-dots-pattern">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="section-label">Navigation</p>
            <h2 className="section-title">
              Nos services a {siteConfig.city}
            </h2>
            <div className="divider-industrial mx-auto mt-4" />
            <p className="section-subtitle mx-auto mt-4">
              Retrouvez rapidement ce que vous cherchez parmi nos services de rideau metallique.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              {
                label: "Depannage",
                href: `/depannage-rideau-metallique-${siteConfig.city.toLowerCase()}`,
                desc: "Intervention urgente 24h/24",
              },
              {
                label: "Installation",
                href: `/installation-rideau-metallique-${siteConfig.city.toLowerCase()}`,
                desc: "Pose sur-mesure",
              },
              {
                label: "Entretien",
                href: `/entretien-rideau-metallique-${siteConfig.city.toLowerCase()}`,
                desc: "Contrats annuels",
              },
              {
                label: "Motorisation",
                href: `/motorisation-rideau-metallique-${siteConfig.city.toLowerCase()}`,
                desc: "Motorisez votre rideau",
              },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="card p-8 text-center group"
              >
                <h3 className="font-bold text-gray-900 group-hover:text-primary-600 transition-colors mb-1">
                  {item.label}
                </h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12 space-y-3">
            <p className="text-gray-400 text-sm">Vous ne trouvez toujours pas ?</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/contact" className="btn-primary">
                Contactez-nous
              </Link>
              <a href={siteConfig.phoneLink} className="btn-secondary">
                {siteConfig.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
