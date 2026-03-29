import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { siteConfig, zones, services } from "@/config/site";
import { CTA } from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: `À Propos - ${siteConfig.name} | Rideau Métallique ${siteConfig.city}`,
  description: `${siteConfig.name}, spécialiste du rideau métallique à ${siteConfig.city} (${siteConfig.postalCode}) et dans l'${siteConfig.department}. ${siteConfig.experience} ans d'expérience, ${siteConfig.interventions} interventions. ${siteConfig.phone}`,
  alternates: {
    canonical: `${siteConfig.url}/a-propos/`,
  },
};

export default function AProposPage() {
  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": `À propos de ${siteConfig.name}`,
    "url": `${siteConfig.url}/a-propos`,
    "mainEntity": {
      "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
      "name": siteConfig.fullName,
      "description": `Spécialiste du dépannage, de l'installation et de la réparation de rideaux métalliques à ${siteConfig.city} et dans l'${siteConfig.department}`,
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
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-gray-900 overflow-hidden">
        <div className="hidden" />
        <div className="container relative z-10">
          <nav className="mb-8" aria-label="Fil d'Ariane">
            <ol className="flex items-center gap-2 text-xs text-white/30">
              <li><Link href="/" className="hover:text-white/60 transition-colors">Accueil</Link></li>
              <li>/</li>
              <li className="text-white/70 font-bold">À propos</li>
            </ol>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="w-12 h-1 bg-primary-600 mb-8" style={{borderRadius:"4px"}} />
              <h1 className="font-bold text-4xl md:text-5xl lg:text-6xl text-white leading-[1.1] mb-5">
                {siteConfig.name} — Votre spécialiste rideau métallique dans l&apos;{siteConfig.department}
              </h1>
              <p className="text-white/40 text-lg mb-8 leading-relaxed">
                Installés au <strong className="text-white/60">{siteConfig.address}</strong>, nous intervenons sur {zones.length} communes de l&apos;{siteConfig.department} pour le dépannage, l&apos;installation, la réparation et l&apos;entretien de vos fermetures métalliques. Plus de <strong className="text-white/60">{siteConfig.experience} ans d&apos;expérience</strong> et <strong className="text-white/60">{siteConfig.interventions} interventions</strong> réalisées.
              </p>
              <div className="flex flex-wrap gap-6 mb-10 text-xs font-bold uppercase tracking-widest text-white/25">
                <span>{siteConfig.reviews.rating}/5 — {siteConfig.reviews.count} avis</span>
                <span>{siteConfig.experience} ans</span>
                <span>{siteConfig.interventions} interventions</span>
              </div>
              <div className="flex flex-wrap gap-3">
                <a href={siteConfig.phoneLink} className="btn-phone">{siteConfig.phone}</a>
                <Link href="/contact" className="btn-secondary border-white/15 text-white/60 hover:text-white hover:border-white/40">
                  Devis gratuit
                </Link>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div className="relative aspect-[4/3] overflow-hidden" style={{ borderRadius: '8px' }}>
                <Image
                  src="/images/gallery/depannage-rideau-metallique-creil-60.webp"
                  alt={`Équipe ${siteConfig.name} à ${siteConfig.city}`}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── NOTRE HISTOIRE ─── */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-xl">
              <div className="w-12 h-1 bg-primary-600 mb-6" style={{borderRadius:"4px"}} />
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">Qui sommes-nous ?</h2>
              <div className="mt-6 space-y-4 text-gray-500 text-lg leading-relaxed">
                <p>
                  <strong className="text-gray-900">{siteConfig.name}</strong> est une entreprise spécialisée dans le <strong className="text-gray-900">dépannage, l&apos;installation, la fabrication et l&apos;entretien de rideaux métalliques</strong> à {siteConfig.city} et dans tout le département de l&apos;{siteConfig.department} (60). Basés au <strong className="text-gray-900">{siteConfig.address}</strong>, nous sommes au cœur du bassin creillois, ce qui nous permet d&apos;intervenir rapidement dans les {zones.length} communes de notre zone de couverture.
                </p>
                <p>
                  Avec plus de <strong className="text-gray-900">{siteConfig.experience} ans d&apos;expérience</strong> dans le métier, notre équipe de techniciens qualifiés a réalisé plus de <strong className="text-gray-900">{siteConfig.interventions} interventions</strong> sur tous types de fermetures métalliques : rideaux à lames pleines, rideaux micro-perforés, grilles articulées, grilles cobra, rideaux coupe-feu et portes de garage enroulables. Nous travaillons avec les marques de référence : <strong className="text-gray-900">Somfy, Nice, Came, ACM, Simu, BFT et Faac</strong>.
                </p>
                <p>
                  Notre engagement : une intervention rapide (sous 30 à 60 minutes), un diagnostic précis, un devis transparent et une réparation durable. Nous intervenons <strong className="text-gray-900">24 heures sur 24, 7 jours sur 7</strong>, y compris les week-ends et jours fériés, parce qu&apos;un rideau métallique en panne ne peut pas attendre.
                </p>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div className="relative aspect-[4/3] overflow-hidden" style={{ borderRadius: '8px' }}>
                <Image
                  src="/images/gallery/rideau-metallique-creil.webp"
                  alt={`Intervention ${siteConfig.name} sur rideau métallique`}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── NOS VALEURS ─── */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container">
          <div className="max-w-xl mb-14">
            <div className="w-12 h-1 bg-primary-600 mb-6" style={{borderRadius:"4px"}} />
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">Nos engagements</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200">
            {[
              {
                num: "01",
                title: "Réactivité",
                desc: `Intervention en 30 à 60 minutes sur ${siteConfig.city} et les communes limitrophes. Disponibilité 24h/24 et 7j/7, y compris les jours fériés. Un technicien de permanence est toujours joignable.`,
              },
              {
                num: "02",
                title: "Transparence",
                desc: "Devis gratuit et détaillé avant toute intervention. Prix communiqués à l'avance, sans frais cachés ni supplément injustifié. Facture remise systématiquement après chaque intervention.",
              },
              {
                num: "03",
                title: "Qualité",
                desc: "Pièces de qualité d'origine ou équivalente. Techniciens formés en continu sur les dernières technologies. Garantie pièces et main-d'œuvre sur chaque intervention (3 mois à 2 ans selon le type).",
              },
              {
                num: "04",
                title: "Proximité",
                desc: `Basés à ${siteConfig.city}, nous connaissons chaque commune, chaque quartier, chaque zone commerciale de l'${siteConfig.department}. Cette connaissance du terrain nous permet d'intervenir efficacement et de proposer des solutions adaptées au contexte local.`,
              },
            ].map((item, i) => (
              <div key={i} className="bg-white p-8">
                <span className="font-bold text-4xl text-gray-200 block mb-4">{item.num}</span>
                <h3 className="font-heading font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── NOS SERVICES ─── */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="container">
          <div className="max-w-xl mb-14">
            <div className="w-12 h-1 bg-primary-600 mb-6" style={{borderRadius:"4px"}} />
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">Nos {services.filter(s => s.hasPage).length} services</h2>
            <p className="text-gray-500 text-lg mt-4 max-w-xl">
              Une offre complète pour tous vos besoins en fermetures métalliques à {siteConfig.city} et dans l&apos;{siteConfig.department}.
            </p>
          </div>
          <div className="divide-y divide-gray-200 max-w-3xl">
            {services.filter(s => s.hasPage).map((s) => (
              <Link
                key={s.id}
                href={`/${s.slug}-rideau-metallique-${siteConfig.city.toLowerCase()}`}
                className="flex items-center justify-between py-5 group"
              >
                <div>
                  <span className="font-heading font-bold text-gray-900 group-hover:text-primary-600 transition-colors">{s.name}</span>
                  <span className="text-gray-400 text-sm ml-3">{s.longDesc}</span>
                </div>
                <svg className="w-4 h-4 text-gray-300 group-hover:text-primary-600 group-hover:translate-x-1 transition-all flex-shrink-0 ml-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ZONE D'INTERVENTION ─── */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container">
          <div className="max-w-xl mb-14">
            <div className="w-12 h-1 bg-primary-600 mb-6" style={{borderRadius:"4px"}} />
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">Notre zone d&apos;intervention</h2>
            <p className="text-gray-500 text-lg mt-4 max-w-xl">
              {siteConfig.name} couvre {zones.length} communes dans l&apos;{siteConfig.department}, dans un rayon de 45 km autour de {siteConfig.city}.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {zones.map((z) => (
              <Link
                key={z.slug}
                href={`/zones/${z.slug}`}
                className="px-4 py-2 bg-gray-50 text-gray-600 text-sm border border-gray-200 hover:border-primary-300 hover:text-primary-700 transition-all"
                style={{ borderRadius: '8px' }}
              >
                {z.name} ({z.postalCode})
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── COORDONNÉES ─── */}
      <section className="py-20 md:py-28 bg-gray-900">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-12">
            <div>
              <h3 className="font-heading font-bold text-white text-sm uppercase tracking-wider mb-4">Adresse</h3>
              <p className="text-white/50">{siteConfig.address}</p>
            </div>
            <div>
              <h3 className="font-heading font-bold text-white text-sm uppercase tracking-wider mb-4">Téléphone</h3>
              <a href={siteConfig.phoneLink} className="text-primary-600 hover:text-white transition-colors font-bold">{siteConfig.phone}</a>
              <p className="text-white/30 text-sm mt-1">Disponible 24h/24, 7j/7</p>
            </div>
            <div>
              <h3 className="font-heading font-bold text-white text-sm uppercase tracking-wider mb-4">Email</h3>
              <a href={`mailto:${siteConfig.email}`} className="text-white/50 hover:text-white transition-colors">{siteConfig.email}</a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <CTA
        title={`Besoin d'un spécialiste à ${siteConfig.city} ?`}
        subtitle={`Appelez le ${siteConfig.phone} pour une intervention rapide ou un devis gratuit.`}
      />
    </main>
  );
}
