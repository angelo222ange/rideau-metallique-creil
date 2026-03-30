import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { siteConfig, zones, services } from "@/config/site";
import { CTA } from "@/components/sections/CTA";
import { ServicesCarousel } from "@/components/sections/ServicesCarousel";

export const metadata: Metadata = {
  title: `A Propos DRM Creil | Specialiste Rideau Metallique`,
  description: `DRM Creil : ${siteConfig.experience} ans d'experience, ${siteConfig.interventions} interventions en rideau metallique. Equipe certifiee, Creil et Oise. ${siteConfig.phone}`,
  alternates: {
    canonical: `${siteConfig.url}/a-propos/`,
  },
  openGraph: {
    title: `A Propos - DRM Creil | Rideau Metallique Oise`,
    description: `Specialiste rideau metallique a Creil. ${siteConfig.experience} ans d'experience, ${siteConfig.interventions} interventions.`,
    type: "website",
    locale: "fr_FR",
    url: `${siteConfig.url}/a-propos/`,
    images: [{
      url: `${siteConfig.url}/images/gallery/rideau-metallique-creil.webp`,
      width: 800,
      height: 600,
      alt: `DRM Creil - Specialiste rideau metallique`,
    }],
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

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Accueil", "item": siteConfig.url },
      { "@type": "ListItem", "position": 2, "name": "A propos", "item": `${siteConfig.url}/a-propos` },
    ],
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden bg-gray-900">
        <Image
          src="/images/gallery/hero-bg-technicien-drm.webp"
          alt={`A propos ${siteConfig.name} rideau metallique ${siteConfig.city}`}
          title={`A propos ${siteConfig.name} rideau metallique ${siteConfig.city}`}
          fill
          className="object-cover opacity-20"
          sizes="100vw"
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
      <section className="section bg-white">
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
                className="bg-white rounded-2xl border border-gray-100 p-8 text-center shadow-lg hover:shadow-xl transition-all"
              >
                <p className="stat-number text-primary-600">{stat.value}</p>
                <p className="stat-label">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── NOTRE HISTOIRE ─── */}
      <section className="section bg-gray-50">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-16 items-center">
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
            <div className="relative hidden md:block">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/images/gallery/fabrication-rideau-metallique-entreprise-drm.webp"
                  alt={`Intervention ${siteConfig.name} sur rideau metallique`}
                  title={`Intervention ${siteConfig.name} sur rideau metallique`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 0vw, 50vw"
                  />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-primary-600 text-white p-6 rounded-2xl shadow-lg">
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
      <ServicesCarousel
        services={services.filter(s => s.hasPage)}
        serviceImages={{
          depannage: "/images/gallery/depannage-rideau-metallique-DRM-reparation.webp",
          installation: "/images/gallery/installation-rideau-metallique-drm.webp",
          fabrication: "/images/gallery/realisation-rideau-metallique-lame-pleine-commerce.webp",
          entretien: "/images/gallery/entretien-rideau-metallique-rideau-de-fer.webp",
          motorisation: "/images/gallery/motorisation-rideau-metallique-drm-depannage.webp",
          deblocage: "/images/gallery/depannage-rideau-metallique-drm-france-rm.webp",
          reparation: "/images/gallery/realisation-drm-rideau-metallique-lame-pleine.webp",
        }}
        city={siteConfig.city}
        department={siteConfig.department}
      />

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
                href={`/rideau-metallique-${z.slug}`}
                className="px-4 py-2 rounded-full bg-gray-50 text-gray-600 text-sm border border-gray-200 hover:border-primary-500 hover:text-primary-700 hover:bg-primary-50 transition-all"
              >
                {z.name} ({z.postalCode})
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── LIENS UTILES ─── */}
      <section className="section bg-gray-50">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <p className="section-label">En savoir plus</p>
            <h2 className="section-title">Decouvrez aussi</h2>
            <div className="h-px bg-gray-200 mx-auto max-w-xs mt-4 mb-10" />
            <div className="grid sm:grid-cols-3 gap-4">
              <Link href="/tarifs" className="card p-6 text-center group">
                <p className="font-bold text-gray-900 group-hover:text-primary-600 transition-colors">Nos tarifs</p>
                <p className="text-gray-500 text-sm mt-1">Prix et devis gratuit</p>
              </Link>
              <Link href="/avis" className="card p-6 text-center group">
                <p className="font-bold text-gray-900 group-hover:text-primary-600 transition-colors">{siteConfig.reviews.rating}/5 -- {siteConfig.reviews.count} avis</p>
                <p className="text-gray-500 text-sm mt-1">Avis clients verifies</p>
              </Link>
              <Link href="/blog" className="card p-6 text-center group">
                <p className="font-bold text-gray-900 group-hover:text-primary-600 transition-colors">Blog conseils</p>
                <p className="text-gray-500 text-sm mt-1">Guides et actualites</p>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── COORDONNEES ─── */}
      <section className="relative overflow-hidden bg-gray-900">
        <Image
          src="/images/gallery/rideau-metallique-industrielle-rideau-metallique-drm.webp"
          alt={`Coordonnees ${siteConfig.name}`}
          title={`Coordonnees ${siteConfig.name}`}
          fill
          className="object-cover opacity-10"
          sizes="100vw"
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
                <div className="rounded-2xl bg-white/5 border border-white/10 p-8 hover:bg-white/10 transition-all">
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
