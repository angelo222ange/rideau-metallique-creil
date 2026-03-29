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
      <section className="relative overflow-hidden bg-gray-900">
        <Image
          src="/images/gallery/hero-bg-technicien-drm.webp"
          alt={`A propos ${siteConfig.name} rideau metallique ${siteConfig.city}`}
          title={`A propos ${siteConfig.name} rideau metallique ${siteConfig.city}`}
          fill
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/90 to-gray-900/70" />
        <div className="container relative z-10 py-16 md:py-20">
          <nav className="mb-6" aria-label="Fil d'Ariane">
            <ol className="flex items-center gap-2 text-sm text-white/40">
              <li><Link href="/" className="hover:text-white/60 transition-colors">Accueil</Link></li>
              <li>/</li>
              <li className="text-white/70 font-semibold">A propos</li>
            </ol>
          </nav>
          <p className="section-label text-primary-400">Notre entreprise</p>
          <h1 className="text-white">
            {siteConfig.name} — Votre specialiste rideau metallique dans l&apos;{siteConfig.department}
          </h1>
          <div className="divider-industrial-lg mt-4" />
          <p className="text-white/60 mt-4 text-lg max-w-2xl">
            Installes au {siteConfig.address}, nous intervenons sur {zones.length} communes pour le depannage, l&apos;installation et l&apos;entretien de vos fermetures metalliques.
          </p>
        </div>
        <div className="absolute top-0 right-0 w-1 h-full bg-primary-600 hidden lg:block" />
      </section>

      {/* ─── CHIFFRES CLES ─── */}
      <section className="section bg-white bg-crosshatch">
        <div className="container">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { value: `${siteConfig.experience}+`, label: "Annees d'experience" },
              { value: `${siteConfig.interventions}+`, label: "Interventions realisees" },
              { value: `${siteConfig.reviews.rating}/5`, label: `Sur ${siteConfig.reviews.count} avis` },
              { value: `${zones.length}`, label: "Communes couvertes" },
            ].map((stat, i) => (
              <div
                key={i}
                className="bg-white border-l-4 border-l-primary-500 border border-gray-200 p-8 text-center hover:border-l-primary-700 transition-colors"
              >
                <p className="stat-number text-primary-600">{stat.value}</p>
                <p className="stat-label">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── NOTRE HISTOIRE ─── */}
      <section className="section bg-gray-50 bg-dots-pattern">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="section-label">Qui sommes-nous</p>
              <h2 className="section-title">
                Une equipe de specialistes a votre service
              </h2>
              <div className="divider-industrial mb-6" />
              <div className="prose">
                <p>
                  <strong>{siteConfig.name}</strong> est une entreprise specialisee dans le <strong>depannage, l&apos;installation, la fabrication et l&apos;entretien de rideaux metalliques</strong> a {siteConfig.city} et dans tout le departement de l&apos;{siteConfig.department} (60). Bases au <strong>{siteConfig.address}</strong>, nous sommes au coeur du bassin creillois, ce qui nous permet d&apos;intervenir rapidement dans les {zones.length} communes de notre zone de couverture.
                </p>
                <p>
                  Avec plus de <strong>{siteConfig.experience} ans d&apos;experience</strong> dans le metier, notre equipe de techniciens qualifies a realise plus de <strong>{siteConfig.interventions} interventions</strong> sur tous types de fermetures metalliques : rideaux a lames pleines, rideaux micro-perfores, grilles articulees, grilles cobra, rideaux coupe-feu et portes de garage enroulables. Nous travaillons avec les marques de reference : <strong>Somfy, Nice, Came, ACM, Simu, BFT et Faac</strong>.
                </p>
                <p>
                  Notre engagement : une intervention rapide (sous 30 a 60 minutes), un diagnostic precis, un devis transparent et une reparation durable. Nous intervenons <strong>24 heures sur 24, 7 jours sur 7</strong>, y compris les week-ends et jours feries, parce qu&apos;un rideau metallique en panne ne peut pas attendre.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 mt-8">
                <a href={siteConfig.phoneLink} className="btn-phone">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {siteConfig.phone}
                </a>
                <Link href="/contact" className="btn-secondary">
                  Devis gratuit
                </Link>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src="/images/gallery/rideau-metallique-creil.webp"
                  alt={`Intervention ${siteConfig.name} sur rideau metallique`}
                  title={`Intervention ${siteConfig.name} sur rideau metallique`}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-primary-600 text-white p-6">
                <p className="stat-number text-white">{siteConfig.experience}+</p>
                <p className="text-white/80 text-sm font-medium">ans d&apos;experience</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── NOS VALEURS ─── */}
      <section className="section bg-white">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="section-label">Nos valeurs</p>
            <h2 className="section-title">
              4 engagements qui font la difference
            </h2>
            <div className="divider-industrial mx-auto mt-4" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                num: "01",
                title: "Reactivite",
                desc: `Intervention en 30 a 60 minutes sur ${siteConfig.city} et les communes limitrophes. Disponibilite 24h/24 et 7j/7, y compris les jours feries.`,
              },
              {
                num: "02",
                title: "Transparence",
                desc: "Devis gratuit et detaille avant toute intervention. Prix communiques a l'avance, sans frais caches ni supplement injustifie.",
              },
              {
                num: "03",
                title: "Qualite",
                desc: "Pieces de qualite d'origine ou equivalente. Techniciens formes en continu. Garantie pieces et main-d'oeuvre sur chaque intervention.",
              },
              {
                num: "04",
                title: "Proximite",
                desc: `Bases a ${siteConfig.city}, nous connaissons chaque commune, chaque quartier, chaque zone commerciale de l'${siteConfig.department}.`,
              },
            ].map((item, i) => (
              <div
                key={i}
                className="card p-8"
              >
                <span className="section-label">{item.num}</span>
                <h3 className="font-bold text-gray-900 text-lg mt-1 mb-3">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── NOS SERVICES ─── */}
      <section className="section bg-gray-50 bg-crosshatch">
        <div className="container">
          <div className="max-w-2xl mb-14">
            <p className="section-label">Nos services</p>
            <h2 className="section-title">
              {services.filter(s => s.hasPage).length} services pour vos fermetures metalliques
            </h2>
            <div className="divider-industrial mt-4" />
            <p className="section-subtitle mt-4">
              Une offre complete pour tous vos besoins en fermetures metalliques a {siteConfig.city} et dans l&apos;{siteConfig.department}.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-4 max-w-3xl">
            {services.filter(s => s.hasPage).map((s) => (
              <Link
                key={s.id}
                href={`/${s.slug}-rideau-metallique-${siteConfig.city.toLowerCase()}`}
                className="card flex items-center justify-between group"
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
      <section className="section bg-white">
        <div className="container">
          <div className="max-w-2xl mb-14">
            <p className="section-label">Zone d&apos;intervention</p>
            <h2 className="section-title">
              {zones.length} communes couvertes dans l&apos;{siteConfig.department}
            </h2>
            <div className="divider-industrial mt-4" />
            <p className="section-subtitle mt-4">
              {siteConfig.name} intervient dans un rayon de 45 km autour de {siteConfig.city}.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {zones.map((z) => (
              <Link
                key={z.slug}
                href={`/zones/${z.slug}`}
                className="px-4 py-2 bg-gray-50 text-gray-600 text-sm border border-gray-200 hover:border-primary-500 hover:text-primary-700 hover:bg-primary-50 transition-all"
              >
                {z.name} ({z.postalCode})
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── COORDONNEES ─── */}
      <section className="relative overflow-hidden bg-gray-900">
        <Image
          src="/images/gallery/hero-bg-technicien-drm.webp"
          alt={`Coordonnees ${siteConfig.name}`}
          title={`Coordonnees ${siteConfig.name}`}
          fill
          className="object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/95 to-gray-900/90" />
        <div className="container relative z-10 py-16 md:py-24">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                label: "Adresse",
                value: siteConfig.address,
                sub: `${siteConfig.city}, ${siteConfig.department}`,
              },
              {
                label: "Telephone",
                value: siteConfig.phone,
                sub: "Disponible 24h/24, 7j/7",
                href: siteConfig.phoneLink,
              },
              {
                label: "Email",
                value: siteConfig.email,
                sub: "Reponse sous 24h",
                href: `mailto:${siteConfig.email}`,
              },
            ].map((item, i) => {
              const content = (
                <div className="border-l-4 border-l-primary-500 bg-white/5 border border-white/10 p-8 hover:bg-white/10 transition-all">
                  <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-2">{item.label}</p>
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
        <div className="absolute top-0 right-0 w-1 h-full bg-primary-600 hidden lg:block" />
      </section>

      {/* ─── CTA ─── */}
      <CTA
        title={`Besoin d'un specialiste a ${siteConfig.city} ?`}
        subtitle={`Appelez le ${siteConfig.phone} pour une intervention rapide ou un devis gratuit.`}
      />
    </main>
  );
}
