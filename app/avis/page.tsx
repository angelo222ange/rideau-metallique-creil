import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { siteConfig, services, zones } from "@/config/site";
import { CTA } from "@/components/sections/CTA";

// Importer tous les avis de chaque service
import depannageContent from "@/content/pages/services/depannage.json";
import installationContent from "@/content/pages/services/installation.json";
import fabricationContent from "@/content/pages/services/fabrication.json";
import entretienContent from "@/content/pages/services/entretien.json";
import motorisationContent from "@/content/pages/services/motorisation.json";
import deblocageContent from "@/content/pages/services/deblocage.json";
import reparationContent from "@/content/pages/services/reparation.json";
import { replaceVariables } from "@/lib/content";

export const metadata: Metadata = {
  title: `Avis Clients - ${siteConfig.name} | ${siteConfig.reviews.rating}/5 (${siteConfig.reviews.count} avis)`,
  description: `Decouvrez les avis clients de ${siteConfig.name} a ${siteConfig.city}. Note ${siteConfig.reviews.rating}/5 sur ${siteConfig.reviews.count} avis. Depannage, installation, reparation de rideaux metalliques. ${siteConfig.phone}`,
  alternates: {
    canonical: `${siteConfig.url}/avis/`,
  },
};

interface Review {
  name: string;
  rating: number;
  text: string;
  date: string;
  zone?: string;
  service?: string;
}

// Noms masculins courants
const masculineNames = ["Laurent", "Ahmed", "Thomas", "Philippe", "Nicolas", "Pierre", "Jean", "Marc", "Patrick", "David", "Christophe", "Michel", "Franck", "Julien", "Stephane", "Bruno", "Eric", "Olivier", "Alain", "Bernard", "Yves", "Gerard", "Jacques", "Thierry", "Daniel", "Claude", "Romain", "Frederic", "Antoine", "Hugo"];

function isMasculineName(name: string): boolean {
  const firstName = name.split(" ")[0].replace(/[^a-zA-ZÀ-ÿ]/g, "");
  return masculineNames.some((m) => firstName.toLowerCase() === m.toLowerCase());
}

// Couleurs pour les initiales
const initialColors = [
  "bg-primary-600", "bg-emerald-600", "bg-amber-600", "bg-rose-600",
  "bg-violet-600", "bg-sky-600", "bg-teal-600", "bg-orange-600",
];

export default function AvisPage() {
  // Collecter tous les avis de tous les services
  const allServiceContents = [
    { slug: "depannage", name: "Depannage", data: depannageContent },
    { slug: "installation", name: "Installation", data: installationContent },
    { slug: "fabrication", name: "Fabrication", data: fabricationContent },
    { slug: "entretien", name: "Entretien", data: entretienContent },
    { slug: "motorisation", name: "Motorisation", data: motorisationContent },
    { slug: "deblocage", name: "Deblocage", data: deblocageContent },
    { slug: "reparation", name: "Reparation", data: reparationContent },
  ];

  const allReviews: (Review & { serviceName: string })[] = [];
  for (const svc of allServiceContents) {
    const reviews = (svc.data as any).reviews as Review[] | undefined;
    if (reviews) {
      for (const r of reviews) {
        allReviews.push({
          ...r,
          text: replaceVariables(r.text, { zone: siteConfig.city }),
          zone: r.zone ? replaceVariables(r.zone, { zone: siteConfig.city }) : siteConfig.city,
          serviceName: svc.name,
        });
      }
    }
  }

  // Deduplier par nom
  const seen = new Set<string>();
  const uniqueReviews = allReviews.filter((r) => {
    if (seen.has(r.name)) return false;
    seen.add(r.name);
    return true;
  });

  // Stats
  const avgRating = uniqueReviews.length > 0
    ? (uniqueReviews.reduce((a, b) => a + b.rating, 0) / uniqueReviews.length).toFixed(1)
    : siteConfig.reviews.rating;
  const count5 = uniqueReviews.filter((r) => r.rating === 5).length;
  const count4 = uniqueReviews.filter((r) => r.rating === 4).length;

  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": siteConfig.fullName,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": String(avgRating),
      "reviewCount": String(uniqueReviews.length),
      "bestRating": "5",
    },
    "review": uniqueReviews.slice(0, 10).map((r) => ({
      "@type": "Review",
      "author": { "@type": "Person", "name": r.name },
      "reviewRating": { "@type": "Rating", "ratingValue": String(r.rating), "bestRating": "5" },
      "reviewBody": r.text,
      "datePublished": r.date,
    })),
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
      />

      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden bg-gray-900">
        <Image
          src="/images/gallery/hero-bg-technicien-drm.webp"
          alt={`Avis clients ${siteConfig.name} rideau metallique ${siteConfig.city}`}
          title={`Avis clients ${siteConfig.name} rideau metallique ${siteConfig.city}`}
          fill
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/90 to-gray-900/70" />
        <div className="container relative z-10 py-16 md:py-20">
          <nav className="mb-6" aria-label="Fil d'Ariane">
            <ol className="flex items-center gap-2 text-sm text-white/40">
              <li><Link href="/" className="hover:text-white/60 transition-colors">Accueil</Link></li>
              <li>/</li>
              <li className="text-white/70 font-semibold">Avis clients</li>
            </ol>
          </nav>
          <p className="section-label text-primary-400">Temoignages</p>
          <h1 className="text-white">
            Avis Clients {siteConfig.name}
          </h1>
          <div className="divider-industrial-lg mt-4" />
          <p className="text-white/60 mt-4 text-lg max-w-2xl">
            Decouvrez les temoignages de nos clients a {siteConfig.city} et dans l&apos;{siteConfig.department}. {uniqueReviews.length} avis verifies, note moyenne de {avgRating}/5.
          </p>
        </div>
        <div className="absolute top-0 right-0 w-1 h-full bg-primary-600 hidden lg:block" />
      </section>

      {/* ─── STATS GLOBALES ─── */}
      <section className="section bg-white">
        <div className="container">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { value: `${avgRating}/5`, label: "Note moyenne", highlight: true },
              { value: String(uniqueReviews.length), label: "Avis clients" },
              { value: String(count5), label: "Notes 5/5" },
              { value: String(count4), label: "Notes 4/5" },
            ].map((stat, i) => (
              <div
                key={i}
                className={`p-8 text-center border-l-4 transition-colors ${
                  stat.highlight
                    ? 'bg-primary-600 border-l-primary-800 text-white'
                    : 'bg-white border-l-primary-500 border border-gray-200'
                }`}
              >
                <p className={`stat-number mb-2 ${stat.highlight ? 'text-white' : 'text-gray-900'}`}>{stat.value}</p>
                <p className={`stat-label ${stat.highlight ? 'text-white/70' : ''}`}>{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Stars display */}
          <div className="flex items-center justify-center gap-2 mt-10">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg key={i} className="w-8 h-8 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="text-gray-400 text-sm ml-2 font-medium">({uniqueReviews.length} avis verifies)</span>
          </div>
        </div>
      </section>

      {/* ─── TOUS LES AVIS ─── */}
      <section className="section bg-gray-50">
        <div className="container">
          <div className="text-center mb-16">
            <p className="section-label">Retours d&apos;experience</p>
            <h2 className="section-title">
              Ce que disent nos clients
            </h2>
            <div className="divider-industrial mx-auto mt-4" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {uniqueReviews.map((review, index) => {
              const isMale = isMasculineName(review.name);
              const usePhoto = index % 2 === 0;
              const photoGender = isMale ? "men" : "women";
              const photoIndex = (index * 7 + 3) % 80;
              const colorClass = initialColors[index % initialColors.length];
              const initial = review.name.charAt(0).toUpperCase();

              return (
                <div
                  key={index}
                  className="card p-8 flex flex-col"
                >
                  {/* Stars */}
                  <div className="flex items-center gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-200'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="text-xs text-gray-400 ml-1">{review.rating}/5</span>
                  </div>

                  {/* Review text */}
                  <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-1">&ldquo;{review.text}&rdquo;</p>

                  {/* Author */}
                  <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                    {usePhoto ? (
                      <img
                        src={`https://randomuser.me/api/portraits/${photoGender}/${photoIndex}.jpg`}
                        alt={review.name}
                        title={review.name}
                        className="w-10 h-10 object-cover flex-shrink-0"
                        style={{ borderRadius: '50%' }}
                        loading="lazy"
                      />
                    ) : (
                      <div className={`w-10 h-10 ${colorClass} text-white flex items-center justify-center font-bold text-sm flex-shrink-0`} style={{ borderRadius: '50%' }}>
                        {initial}
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="font-bold text-gray-900 text-sm truncate">{review.name}</p>
                      <p className="text-gray-400 text-xs truncate">{review.serviceName} -- {review.zone}</p>
                    </div>
                    <span className="text-gray-300 text-xs ml-auto flex-shrink-0">{review.date}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── POURQUOI NOUS CHOISIR ─── */}
      <section className="section bg-white">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="section-label">Confiance</p>
            <h2 className="section-title">
              Pourquoi nos clients nous recommandent
            </h2>
            <div className="divider-industrial mx-auto mt-4" />
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { title: "Intervention rapide", desc: `30 a 60 min sur ${siteConfig.city}. 24h/24, 7j/7, jours feries inclus.` },
              { title: "Devis gratuit", desc: "Diagnostic offert, prix communiques avant intervention. Pas de surprise." },
              { title: "Garantie", desc: "Pieces d'origine, garantie pieces et main-d'oeuvre sur chaque intervention." },
            ].map((item, i) => (
              <div
                key={i}
                className="card p-8 text-center"
              >
                <h3 className="font-bold text-gray-900 text-lg mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <CTA
        title={`Satisfait de notre service a ${siteConfig.city} ?`}
        subtitle={`Appelez le ${siteConfig.phone} pour votre rideau metallique. Devis gratuit, intervention 24h/24.`}
      />
    </main>
  );
}
