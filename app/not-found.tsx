import Link from "next/link";
import { siteConfig } from "@/config/site";

export default function NotFound() {
  return (
    <main>
      {/* Hero 404 */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-dark overflow-hidden min-h-[70vh] flex items-center">
        <div className="hidden" />
        <div className="container relative z-10 text-center">
          <span className="font-bold text-[120px] md:text-[180px] text-white/[0.04] leading-none block select-none">
            404
          </span>

          <div className="relative -mt-16 md:-mt-24">
            <div className="rule-accent mx-auto mb-8"  />
            <h1 className="font-bold text-3xl md:text-5xl text-white leading-[1.1] mb-4">
              Page introuvable
            </h1>
            <p className="text-white/40 text-lg max-w-md mx-auto mb-10">
              La page que vous recherchez n&apos;existe pas ou a été déplacée.
              Pas de panique, nous sommes là pour vous aider !
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/"
                className="btn-primary"
              >
                Retour à l&apos;accueil
              </Link>
              <a
                href={siteConfig.phoneLink}
                className="btn-phone"
              >
                {siteConfig.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Liens utiles */}
      <section className="section bg-gray-50">
        <div className="container">
          <div className="text-center max-w-xl mx-auto mb-14">
            <div className="rule-accent mx-auto mb-6" />
            <h2 className="section-title">Nos services à {siteConfig.city}</h2>
            <p className="section-subtitle">
              Retrouvez rapidement ce que vous cherchez parmi nos services de rideau métallique.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200 max-w-4xl mx-auto">
            {[
              { label: "Installation", href: "/installation-rideau-metallique-creil", icon: "🏗️" },
              { label: "Fabrication", href: "/fabrication-rideau-metallique-creil", icon: "🏭" },
              { label: "Entretien", href: "/entretien-rideau-metallique-creil", icon: "🛠️" },
              { label: "Motorisation", href: "/motorisation-rideau-metallique-creil", icon: "⚡" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="bg-gray-50 p-6 text-center hover:bg-white transition-colors group"
              >
                <span className="text-3xl block mb-2">{item.icon}</span>
                <h3 className="font-heading font-bold text-gray-900 text-sm group-hover:text-primary-600 transition-colors">
                  {item.label}
                </h3>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/contact" className="text-primary-600 font-heading font-bold text-sm hover:text-primary-700 transition-colors">
              Ou contactez-nous directement →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
