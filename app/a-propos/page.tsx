import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { siteConfig, zones, services } from "@/config/site";
import { CTA } from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: `A Propos - ${siteConfig.name} | Rideau Metallique ${siteConfig.city}`,
  description: `${siteConfig.name}, specialiste du rideau metallique a ${siteConfig.city} (${siteConfig.postalCode}) et dans l'${siteConfig.department}. ${siteConfig.experience} ans d'experience, ${siteConfig.interventions} interventions. ${siteConfig.phone}`,
  alternates: {
    canonical: `${siteConfig.url}/a-propos/`,
  },
};

export default function AProposPage() {
  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": `A propos de ${siteConfig.name}`,
    "url": `${siteConfig.url}/a-propos`,
    "mainEntity": {
      "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
      "name": siteConfig.fullName,
      "description": `Specialiste du depannage, de l'installation et de la reparation de rideaux metalliques a ${siteConfig.city} et dans l'${siteConfig.department}`,
      "telephone": siteConfig.phone.replace(/\s/g, ""),
      "email": siteConfig.email,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": siteConfig.streetAddress,
        "addressLocality": siteConfig.city,
        "postalCode": siteConfig.postalCode,
        "addressRegion": siteConfig.department,
        "addressCountry": "FR",
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": siteConfig.geo.lat,
        "longitude": siteConfig.geo.lng,
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "00:00",
        "closes": "23:59",
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": String(siteConfig.reviews.rating),
        "reviewCount": String(siteConfig.reviews.count),
        "bestRating": "5",
      },
      "areaServed": zones.map((z) => ({
        "@type": "City",
        "name": z.name,
        "postalCode": z.postalCode,
      })),
    },
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />

      {/* ─── HERO ─── */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <Image
          src="/images/gallery/hero-bg-technicien-drm.webp"
          alt={`A propos ${siteConfig.name} rideau metallique ${siteConfig.city}`}
          title={`A propos ${siteConfig.name} rideau metallique ${siteConfig.city}`}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gray-950/90" />
        <div className="container relative z-10">
          <nav className="mb-6" aria-label="Fil d'Ariane">
            <ol className="flex items-center gap-2 text-sm text-white/40">
              <li><Link href="/" className="hover:text-white/60 transition-colors">Accueil</Link></li>
              <li>/</li>
              <li className="text-white/70 font-semibold">A propos</li>
            </ol>
          </nav>
          <p className="text-primary-400 text-sm font-semibold uppercase tracking-widest mb-3">Notre entreprise</p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            {siteConfig.name} — Votre specialiste rideau metallique dans l&apos;{siteConfig.department}
          </h1>
          <p className="text-white/50 text-lg max-w-2xl">
            Installes au {siteConfig.address}, nous intervenons sur {zones.length} communes pour le depannage, l&apos;installation et l&apos;entretien de vos fermetures metalliques.
          </p>
        </div>
      </section>

      {/* ─── CHIFFRES CLES ─── */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-50 rounded-full blur-3xl opacity-30" />
        <div className="container relative">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { value: `${siteConfig.experience}+`, label: "Annees d'experience" },
              { value: `${siteConfig.interventions}+`, label: "Interventions realisees" },
              { value: `${siteConfig.reviews.rating}/5`, label: `Sur ${siteConfig.reviews.count} avis` },
              { value: `${zones.length}`, label: "Communes couvertes" },
            ].map((stat, i) => (
              <div
                key={i}
                className="bg-white border border-gray-100 hover:border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-8 text-center"
                style={{ borderRadius: '16px' }}
              >
                <p className="text-4xl font-extrabold text-primary-600 mb-2">{stat.value}</p>
                <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── NOTRE HISTOIRE ─── */}
      <section className="py-24 bg-gray-50 relative overflow-hidden">
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary-50 rounded-full blur-3xl opacity-30" />
        <div className="container relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-primary-600 text-sm font-semibold uppercase tracking-widest mb-3">Qui sommes-nous</p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-6">
                Une equipe de specialistes a votre service
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  <strong className="text-gray-900">{siteConfig.name}</strong> est une entreprise specialisee dans le <strong className="text-gray-900">depannage, l&apos;installation, la fabrication et l&apos;entretien de rideaux metalliques</strong> a {siteConfig.city} et dans tout le departement de l&apos;{siteConfig.department} (60). Bases au <strong className="text-gray-900">{siteConfig.address}</strong>, nous sommes au coeur du bassin creillois, ce qui nous permet d&apos;intervenir rapidement dans les {zones.length} communes de notre zone de couverture.
                </p>
                <p>
                  Avec plus de <strong className="text-gray-900">{siteConfig.experience} ans d&apos;experience</strong> dans le metier, notre equipe de techniciens qualifies a realise plus de <strong className="text-gray-900">{siteConfig.interventions} interventions</strong> sur tous types de fermetures metalliques : rideaux a lames pleines, rideaux micro-perfores, grilles articulees, grilles cobra, rideaux coupe-feu et portes de garage enroulables. Nous travaillons avec les marques de reference : <strong className="text-gray-900">Somfy, Nice, Came, ACM, Simu, BFT et Faac</strong>.
                </p>
                <p>
                  Notre engagement : une intervention rapide (sous 30 a 60 minutes), un diagnostic precis, un devis transparent et une reparation durable. Nous intervenons <strong className="text-gray-900">24 heures sur 24, 7 jours sur 7</strong>, y compris les week-ends et jours feries, parce qu&apos;un rideau metallique en panne ne peut pas attendre.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 mt-8">
                <a
                  href={siteConfig.phoneLink}
                  className="px-6 py-3 bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors"
                  style={{ borderRadius: '8px' }}
                >
                  {siteConfig.phone}
                </a>
                <Link
                  href="/contact"
                  className="px-6 py-3 bg-white text-gray-700 font-medium border border-gray-200 hover:border-primary-300 transition-colors"
                  style={{ borderRadius: '8px' }}
                >
                  Devis gratuit
                </Link>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div className="relative aspect-[4/3] overflow-hidden shadow-2xl" style={{ borderRadius: '20px' }}>
                <Image
                  src="/images/gallery/rideau-metallique-creil.webp"
                  alt={`Intervention ${siteConfig.name} sur rideau metallique`}
                  title={`Intervention ${siteConfig.name} sur rideau metallique`}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-primary-600 text-white p-6 shadow-xl" style={{ borderRadius: '16px' }}>
                <p className="text-3xl font-extrabold">{siteConfig.experience}+</p>
                <p className="text-white/80 text-sm font-medium">ans d&apos;experience</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── NOS VALEURS ─── */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-20 right-0 w-80 h-80 bg-primary-50 rounded-full blur-3xl opacity-30" />
        <div className="container relative">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-primary-600 text-sm font-semibold uppercase tracking-widest mb-3">Nos valeurs</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
              4 engagements qui font la difference
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                num: "01",
                title: "Reactivite",
                desc: `Intervention en 30 a 60 minutes sur ${siteConfig.city} et les communes limitrophes. Disponibilite 24h/24 et 7j/7, y compris les jours feries.`,
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
              },
              {
                num: "02",
                title: "Transparence",
                desc: "Devis gratuit et detaille avant toute intervention. Prix communiques a l'avance, sans frais caches ni supplement injustifie.",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                ),
              },
              {
                num: "03",
                title: "Qualite",
                desc: "Pieces de qualite d'origine ou equivalente. Techniciens formes en continu. Garantie pieces et main-d'oeuvre sur chaque intervention.",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                ),
              },
              {
                num: "04",
                title: "Proximite",
                desc: `Bases a ${siteConfig.city}, nous connaissons chaque commune, chaque quartier, chaque zone commerciale de l'${siteConfig.department}.`,
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ),
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white border border-gray-100 hover:border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-8"
                style={{ borderRadius: '16px' }}
              >
                <div className="w-12 h-12 bg-primary-50 text-primary-600 flex items-center justify-center mb-5" style={{ borderRadius: '12px' }}>
                  {item.icon}
                </div>
                <span className="text-xs font-bold text-primary-400 uppercase tracking-widest">{item.num}</span>
                <h3 className="font-extrabold text-gray-900 text-lg mt-1 mb-3">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── NOS SERVICES ─── */}
      <section className="py-24 bg-gray-50 relative overflow-hidden">
        <div className="absolute -top-20 -left-40 w-80 h-80 bg-primary-50 rounded-full blur-3xl opacity-30" />
        <div className="container relative">
          <div className="max-w-2xl mb-14">
            <p className="text-primary-600 text-sm font-semibold uppercase tracking-widest mb-3">Nos services</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
              {services.filter(s => s.hasPage).length} services pour vos fermetures metalliques
            </h2>
            <p className="text-gray-500 text-lg mt-4">
              Une offre complete pour tous vos besoins en fermetures metalliques a {siteConfig.city} et dans l&apos;{siteConfig.department}.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-4 max-w-3xl">
            {services.filter(s => s.hasPage).map((s) => (
              <Link
                key={s.id}
                href={`/${s.slug}-rideau-metallique-${siteConfig.city.toLowerCase()}`}
                className="bg-white border border-gray-100 hover:border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-6 flex items-center justify-between group"
                style={{ borderRadius: '16px' }}
              >
                <div>
                  <span className="font-bold text-gray-900 group-hover:text-primary-600 transition-colors">{s.name}</span>
                  <span className="block text-gray-400 text-sm mt-1">{s.longDesc}</span>
                </div>
                <svg className="w-5 h-5 text-gray-300 group-hover:text-primary-600 group-hover:translate-x-1 transition-all flex-shrink-0 ml-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ZONE D'INTERVENTION ─── */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-primary-50 rounded-full blur-3xl opacity-30" />
        <div className="container relative">
          <div className="max-w-2xl mb-14">
            <p className="text-primary-600 text-sm font-semibold uppercase tracking-widest mb-3">Zone d&apos;intervention</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
              {zones.length} communes couvertes dans l&apos;{siteConfig.department}
            </h2>
            <p className="text-gray-500 text-lg mt-4">
              {siteConfig.name} intervient dans un rayon de 45 km autour de {siteConfig.city}.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {zones.map((z) => (
              <Link
                key={z.slug}
                href={`/zones/${z.slug}`}
                className="px-4 py-2 bg-gray-50 text-gray-600 text-sm border border-gray-100 hover:border-primary-300 hover:text-primary-700 hover:bg-primary-50 transition-all"
                style={{ borderRadius: '8px' }}
              >
                {z.name} ({z.postalCode})
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── COORDONNEES ─── */}
      <section className="py-24 bg-gray-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage:'repeating-linear-gradient(45deg, white 0, white 1px, transparent 0, transparent 8px)'}} />
        <div className="container relative">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                label: "Adresse",
                value: siteConfig.address,
                sub: `${siteConfig.city}, ${siteConfig.department}`,
                icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ),
              },
              {
                label: "Telephone",
                value: siteConfig.phone,
                sub: "Disponible 24h/24, 7j/7",
                href: siteConfig.phoneLink,
                icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                ),
              },
              {
                label: "Email",
                value: siteConfig.email,
                sub: "Reponse sous 24h",
                href: `mailto:${siteConfig.email}`,
                icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                ),
              },
            ].map((item, i) => {
              const content = (
                <div className="bg-white/5 border border-white/10 p-8 hover:bg-white/10 transition-all" style={{ borderRadius: '16px' }}>
                  <div className="w-10 h-10 bg-primary-600 text-white flex items-center justify-center mb-4" style={{ borderRadius: '10px' }}>
                    {item.icon}
                  </div>
                  <p className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-2">{item.label}</p>
                  <p className="text-white font-bold text-lg">{item.value}</p>
                  <p className="text-white/30 text-sm mt-1">{item.sub}</p>
                </div>
              );
              return item.href ? (
                <a key={i} href={item.href} className="block">
                  {content}
                </a>
              ) : (
                <div key={i}>{content}</div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <CTA
        title={`Besoin d'un specialiste a ${siteConfig.city} ?`}
        subtitle={`Appelez le ${siteConfig.phone} pour une intervention rapide ou un devis gratuit.`}
      />
    </main>
  );
}
