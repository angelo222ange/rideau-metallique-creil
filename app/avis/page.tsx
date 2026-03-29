import type { Metadata } from "next";
import Link from "next/link";
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
  description: `Découvrez les avis clients de ${siteConfig.name} à ${siteConfig.city}. Note ${siteConfig.reviews.rating}/5 sur ${siteConfig.reviews.count} avis. Dépannage, installation, réparation de rideaux métalliques. ${siteConfig.phone}`,
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

export default function AvisPage() {
  // Collecter tous les avis de tous les services
  const allServiceContents = [
    { slug: "depannage", name: "Dépannage", data: depannageContent },
    { slug: "installation", name: "Installation", data: installationContent },
    { slug: "fabrication", name: "Fabrication", data: fabricationContent },
    { slug: "entretien", name: "Entretien", data: entretienContent },
    { slug: "motorisation", name: "Motorisation", data: motorisationContent },
    { slug: "deblocage", name: "Déblocage", data: deblocageContent },
    { slug: "reparation", name: "Réparation", data: reparationContent },
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

  // Déduplier par nom
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
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-gray-900 overflow-hidden">
        <div className="hidden" />
        <div className="container relative z-10">
          <nav className="mb-8" aria-label="Fil d'Ariane">
            <ol className="flex items-center gap-2 text-xs text-white/30">
              <li><Link href="/" className="hover:text-white/60 transition-colors">Accueil</Link></li>
              <li>/</li>
              <li className="text-white/70 font-bold">Avis clients</li>
            </ol>
          </nav>
          <div className="max-w-3xl">
            <div className="rule-accent mb-8"  />
            <h1 className="font-bold text-4xl md:text-5xl lg:text-6xl text-white leading-[1.1] mb-5">
              Avis Clients {siteConfig.name}
            </h1>
            <p className="text-white/40 text-lg leading-relaxed">
              Découvrez les témoignages de nos clients à {siteConfig.city} et dans l&apos;{siteConfig.department}. {uniqueReviews.length} avis vérifiés, note moyenne de {avgRating}/5.
            </p>

            {/* Stats rapides */}
            <div className="flex gap-8 mt-10">
              <div>
                <p className="font-bold text-4xl text-primary-600">{avgRating}/5</p>
                <p className="text-white/30 text-xs mt-0.5">Note moyenne</p>
              </div>
              <div>
                <p className="font-bold text-4xl text-white">{uniqueReviews.length}</p>
                <p className="text-white/30 text-xs mt-0.5">Avis clients</p>
              </div>
              <div>
                <p className="font-bold text-4xl text-white">{count5}</p>
                <p className="text-white/30 text-xs mt-0.5">Notes 5/5</p>
              </div>
              <div>
                <p className="font-bold text-4xl text-white">{count4}</p>
                <p className="text-white/30 text-xs mt-0.5">Notes 4/5</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TOUS LES AVIS ─── */}
      <section className="section bg-gray-50">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-200">
            {uniqueReviews.map((review, index) => (
              <div key={index} className="bg-white p-8">
                <div className="flex items-center gap-1 mb-3">
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
                  <span className="text-xs text-gray-400 ml-2">{review.rating}/5</span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{review.text}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-heading font-bold text-gray-900 text-sm">{review.name}</p>
                    <p className="text-gray-400 text-xs">{review.serviceName} — {review.zone}</p>
                  </div>
                  <span className="text-gray-300 text-xs">{review.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <CTA
        title={`Satisfait de notre service à ${siteConfig.city} ?`}
        subtitle={`Appelez le ${siteConfig.phone} pour votre rideau métallique. Devis gratuit, intervention 24h/24.`}
      />
    </main>
  );
}
