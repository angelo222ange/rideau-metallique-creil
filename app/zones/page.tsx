import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { siteConfig, zones, services } from "@/config/site";
import { CTA } from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: `Zones d'Intervention Rideau Metallique Creil et Oise`,
  description: `Depannage rideau metallique a Creil et ${zones.length} communes de l'Oise : Nogent, Montataire, Senlis, Chantilly. Intervention 24h/24. ${siteConfig.phone}`,
  keywords: `rideau metallique ${siteConfig.city}, zones intervention ${siteConfig.department}, depannage rideau ${siteConfig.departmentCode}`,
  openGraph: {
    title: `Zones d'Intervention Rideau Metallique Creil et Oise`,
    description: `Depannage rideau metallique a Creil et ${zones.length} communes de l'Oise. Intervention rapide 24h/24.`,
    type: "website",
    locale: "fr_FR",
    url: `${siteConfig.url}/zones/`,
    images: [{
      url: `${siteConfig.url}/images/logos/depannage-rideau-metallique-creil.webp`,
      width: 800,
      height: 600,
      alt: `Zones intervention DRM Creil`,
    }],
  },
  alternates: {
    canonical: `${siteConfig.url}/zones/`,
  },
};

export default function ZonesPage() {
  const mainCity = zones.find(z => 'isMain' in z);
  const otherZones = zones.filter(z => !('isMain' in z));

  // Grouper par proximite
  const proximite = otherZones.filter(z => 'distance' in z && parseInt((z as { distance: string }).distance) <= 6);
  const proches = otherZones.filter(z => 'distance' in z && parseInt((z as { distance: string }).distance) > 6 && parseInt((z as { distance: string }).distance) <= 15);
  const etendues = otherZones.filter(z => 'distance' in z && parseInt((z as { distance: string }).distance) > 15);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Accueil", "item": siteConfig.url },
      { "@type": "ListItem", "position": 2, "name": "Zones d'intervention", "item": `${siteConfig.url}/zones` },
    ],
  };

  const serviceAreaSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": `Rideau metallique ${siteConfig.city}`,
    "provider": {
      "@type": "LocalBusiness",
      "name": siteConfig.fullName,
      "telephone": siteConfig.phone,
    },
    "areaServed": zones.map(z => ({
      "@type": "City",
      "name": z.name,
      "postalCode": z.postalCode,
    })),
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceAreaSchema) }} />

      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden bg-gray-900">
        <Image
          src="/images/gallery/Hauts-de-France-rideau-metallique.webp"
          alt={`Zones intervention rideau metallique ${siteConfig.city}`}
          title={`Zones intervention rideau metallique ${siteConfig.city}`}
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
              <li className="text-white/70 font-semibold">Zones d&apos;intervention</li>
            </ol>
          </nav>
          <p className="section-label text-primary-400">Nos zones</p>
          <h1 className="text-white">
            {zones.length} Communes Couvertes dans l&apos;{siteConfig.department}
          </h1>
          <div className="divider-industrial-lg mt-4" />
          <p className="text-white/60 mt-4 text-lg max-w-2xl mb-8">
            {siteConfig.name} intervient dans un rayon de 45 km autour de {siteConfig.city} pour le depannage, l&apos;installation, la motorisation et l&apos;entretien de vos rideaux metalliques. Intervention rapide, 24h/24.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href={siteConfig.phoneLink} className="btn-phone">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {siteConfig.phone}
            </a>
            <Link href="/contact" className="inline-flex items-center justify-center rounded-full border-2 border-white/30 px-6 py-3 text-base font-semibold text-white bg-transparent hover:bg-white hover:text-gray-900 transition-all duration-200">
              Devis gratuit
            </Link>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-1 h-full bg-primary-600 hidden lg:block" />
      </section>

      {/* ─── VILLE PRINCIPALE ─── */}
      {mainCity && (
        <section className="section bg-white">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="section-label">Ville principale</p>
                <h2 className="section-title">Rideau metallique a {mainCity.name}</h2>
                <div className="h-px bg-gray-200 max-w-xs mt-4 mb-6" />
                <p className="text-gray-500 text-lg leading-relaxed mb-6">
                  Bases a {mainCity.name} ({mainCity.postalCode}), nous intervenons en moins de 30 minutes dans toute la ville. Depannage, installation, motorisation et entretien de rideaux metalliques pour commerces, entrepots et locaux professionnels.
                </p>
                <ul className="space-y-3 mb-8">
                  {[
                    "Intervention en 30 minutes maximum sur Creil",
                    "Devis gratuit et sans engagement",
                    "Disponible 24h/24, 7 jours sur 7",
                    "Techniciens qualifies, toutes marques",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-600 text-[15px]">
                      <div className="w-5 h-5 rounded-full bg-primary-600 text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <a href={siteConfig.phoneLink} className="btn-phone">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {siteConfig.phone}
                </a>
              </div>
              <div className="relative hidden md:block">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src="/images/gallery/gemini-zone-creil-centre.webp"
                    alt={`Rideau metallique ${mainCity.name} centre`}
                    title={`Rideau metallique ${mainCity.name} centre`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 0vw, 50vw"
                    />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ─── COMMUNES LIMITROPHES (< 6 km) ─── */}
      {proximite.length > 0 && (
        <section className="section bg-gray-50">
          <div className="container">
            <div className="max-w-xl mb-12">
              <p className="section-label">Communes limitrophes</p>
              <h2 className="section-title">Intervention en moins de 20 min</h2>
              <div className="h-px bg-gray-200 max-w-xs mt-4 mb-4" />
              <p className="text-gray-500">Communes situees a moins de 6 km de {siteConfig.city}. Temps d&apos;intervention le plus rapide.</p>
            </div>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {proximite.map((zone) => (
                <Link key={zone.slug} href={`/rideau-metallique-${zone.slug}`}
                  className="card p-6 group flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-gray-900 group-hover:text-primary-600 transition-colors">{zone.name}</h3>
                    <p className="text-gray-400 text-sm mt-0.5">{zone.postalCode}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {'distance' in zone && (
                      <span className="text-xs text-primary-600 font-semibold bg-primary-50 px-2.5 py-1 rounded-full">{(zone as { distance: string }).distance}</span>
                    )}
                    <svg className="w-4 h-4 text-gray-300 group-hover:text-primary-600 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── COMMUNES PROCHES (5-15 km) ─── */}
      {proches.length > 0 && (
        <section className="section bg-white">
          <div className="container">
            <div className="max-w-xl mb-12">
              <p className="section-label">Communes proches</p>
              <h2 className="section-title">Intervention en moins de 45 min</h2>
              <div className="h-px bg-gray-200 max-w-xs mt-4 mb-4" />
              <p className="text-gray-500">Communes situees entre 7 et 15 km de {siteConfig.city}. Intervention rapide garantie.</p>
            </div>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {proches.map((zone) => (
                <Link key={zone.slug} href={`/rideau-metallique-${zone.slug}`}
                  className="card p-5 group flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm group-hover:text-primary-600 transition-colors">{zone.name}</h3>
                    <p className="text-gray-400 text-xs mt-0.5">{zone.postalCode}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {'distance' in zone && (
                      <span className="text-[10px] text-gray-400 font-medium">{(zone as { distance: string }).distance}</span>
                    )}
                    <svg className="w-4 h-4 text-gray-300 group-hover:text-primary-600 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── COMMUNES ETENDUES (> 15 km) ─── */}
      {etendues.length > 0 && (
        <section className="section bg-gray-50">
          <div className="container">
            <div className="max-w-xl mb-12">
              <p className="section-label">Zone etendue</p>
              <h2 className="section-title">Intervention en 1 heure</h2>
              <div className="h-px bg-gray-200 max-w-xs mt-4 mb-4" />
              <p className="text-gray-500">Communes situees entre 15 et 45 km. Intervention sur rendez-vous ou en urgence.</p>
            </div>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {etendues.map((zone) => (
                <Link key={zone.slug} href={`/rideau-metallique-${zone.slug}`}
                  className="card p-4 text-center group">
                  <h3 className="font-bold text-gray-900 text-sm group-hover:text-primary-600 transition-colors">{zone.name}</h3>
                  <p className="text-xs text-gray-400 mt-0.5">{zone.postalCode}</p>
                  {'distance' in zone && (
                    <p className="text-[10px] text-gray-300 mt-1">{(zone as { distance: string }).distance}</p>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── SERVICES DISPONIBLES ─── */}
      <section className="section bg-white">
        <div className="container">
          <div className="max-w-2xl mb-12">
            <p className="section-label">Nos services</p>
            <h2 className="section-title">Services disponibles dans toutes nos zones</h2>
            <div className="h-px bg-gray-200 max-w-xs mt-4 mb-4" />
            <p className="text-gray-500">Quel que soit votre besoin en fermeture metallique, nous intervenons partout dans l&apos;{siteConfig.department}.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl">
            {services.filter(s => s.hasPage).map((s) => (
              <Link
                key={s.id}
                href={`/${s.slug}-rideau-metallique-${siteConfig.city.toLowerCase()}`}
                className="card p-5 flex items-center justify-between group"
              >
                <div>
                  <span className="font-bold text-gray-900 group-hover:text-primary-600 transition-colors block">{s.name}</span>
                  <span className="text-gray-400 text-sm mt-0.5 block">{s.shortDesc}</span>
                </div>
                <svg className="w-5 h-5 text-gray-300 group-hover:text-primary-600 group-hover:translate-x-1 transition-all flex-shrink-0 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SEO TEXT ─── */}
      <section className="section bg-gray-50">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <p className="section-label">Expertise locale</p>
            <h2 className="section-title">
              Rideau metallique dans l&apos;{siteConfig.department} : notre couverture
            </h2>
            <div className="h-px bg-gray-200 max-w-xs mt-4 mb-8" />
            <div className="prose">
              <p>
                <strong>{siteConfig.name}</strong> est implante a <strong>{siteConfig.city}</strong>, au coeur du bassin creillois, ce qui nous permet d&apos;intervenir rapidement dans l&apos;ensemble du departement de l&apos;<strong>{siteConfig.department}</strong> (60). Nous couvrons {zones.length} communes, de <Link href="/zones/nogent-sur-oise" className="text-primary-600 hover:text-primary-700 underline">Nogent-sur-Oise</Link> a <Link href="/zones/beauvais" className="text-primary-600 hover:text-primary-700 underline">Beauvais</Link>, en passant par <Link href="/zones/senlis" className="text-primary-600 hover:text-primary-700 underline">Senlis</Link>, <Link href="/zones/chantilly" className="text-primary-600 hover:text-primary-700 underline">Chantilly</Link> et <Link href="/zones/compiegne" className="text-primary-600 hover:text-primary-700 underline">Compiegne</Link>.
              </p>
              <p>
                Pour les communes limitrophes (Montataire, Nogent-sur-Oise, Villers-Saint-Paul), notre temps d&apos;intervention est inferieur a 20 minutes. Pour les villes plus eloignees comme Beauvais ou Compiegne, nous intervenons en moins d&apos;une heure.
              </p>
              <p>
                Consultez nos <Link href="/tarifs" className="text-primary-600 hover:text-primary-700 underline">tarifs</Link>, decouvrez les <Link href="/avis" className="text-primary-600 hover:text-primary-700 underline">avis de nos clients</Link> ({siteConfig.reviews.rating}/5 sur {siteConfig.reviews.count} avis), ou lisez nos <Link href="/blog" className="text-primary-600 hover:text-primary-700 underline">guides pratiques</Link> sur l&apos;entretien des rideaux metalliques.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CTA title={`Besoin d'un specialiste dans l'${siteConfig.department} ?`} subtitle={`Appelez le ${siteConfig.phone} pour une intervention rapide. Devis gratuit, 24h/24.`} />
    </main>
  );
}
