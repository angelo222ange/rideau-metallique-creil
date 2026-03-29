import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { siteConfig, zones } from "@/config/site";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { FAQ } from "@/components/sections/FAQ";
import { CTA } from "@/components/sections/CTA";
import { AlternatingFeatures } from "@/components/sections/AlternatingFeatures";
import { ZoneLocalSection } from "@/components/subcity/ZoneLocalSection";
import { getPageContent } from "@/lib/content";
import { zoneLocalData } from "@/content/zones-local";
import faqData from "@/content/faq.json";
import zoneContent from "@/content/pages/zones/zone-content.json";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return zones.filter(zone => !('isMain' in zone)).map((zone) => ({ slug: zone.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const zone = zones.find((z) => z.slug === params.slug);
  if (!zone) return { title: "Zone non trouvée" };

  const title = `Rideau Métallique ${zone.name} (${zone.postalCode}) | ${siteConfig.name}`;
  const description = `Dépannage rideau métallique à ${zone.name} (${zone.postalCode}), ${siteConfig.department}. Installation, fabrication, motorisation, entretien. Intervention rapide 24h/24. ☎️ ${siteConfig.phone}`;

  return {
    title,
    description,
    keywords: `rideau métallique ${zone.name}, dépannage ${zone.name}, installation rideau ${zone.postalCode}`,
    openGraph: {
      title,
      description,
      type: "website",
      url: `${siteConfig.url}/zones/${zone.slug}`,
    },
    alternates: {
      canonical: `${siteConfig.url}/zones/${zone.slug}/`,
    },
  };
}

export default function ZonePage({ params }: Props) {
  const zone = zones.find((z) => z.slug === params.slug);
  if (!zone) notFound();

  // Contexte pour les variables
  const context = {
    zone: zone.name,
    zonePostal: zone.postalCode,
  };

  // Contenu avec variables remplacées
  const content = getPageContent(zoneContent, context);

  const zoneFaq = getPageContent(faqData).map(item => ({
    ...item,
    answer: item.answer.replace(new RegExp(siteConfig.city, 'g'), zone.name),
  }));

  // Schema.org BreadcrumbList
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Accueil", "item": siteConfig.url },
      { "@type": "ListItem", "position": 2, "name": "Zones d'intervention", "item": `${siteConfig.url}/zones` },
      { "@type": "ListItem", "position": 3, "name": zone.name, "item": `${siteConfig.url}/zones/${zone.slug}` },
    ],
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Hero
        badge={zone.name}
        title={`Rideau Métallique ${zone.name}`}
        subtitle={`Intervention rapide en 1 heure à ${zone.name} (${zone.postalCode}). Dépannage, installation, motorisation. 24h/24.`}
        sideImage="/images/gallery/rideau-metallique-lame-pleine-france.webp"
      />
      <Services title={`Nos services à ${zone.name}`} zoneSlug={zone.slug} />

      {/* Sections alternées SEO-optimisées */}
      {content.alternatingFeatures && (
        <AlternatingFeatures features={content.alternatingFeatures} bgColor="bg-gray-50" />
      )}

      <section className="py-20 md:py-28 bg-white">
        <div className="container">
          <div className="max-w-3xl">
            <span className="inline-block px-3 py-1 bg-primary-50 text-primary-700 text-xs font-semibold uppercase tracking-wider mb-4" style={{borderRadius:'6px'}}>Expertise locale</span>
            <h2 className="font-bold text-3xl md:text-4xl text-gray-900">Rideau métallique à {zone.name}</h2>
            <div className="mt-6 space-y-4">
              <p className="text-gray-500 text-lg leading-relaxed">
                Vous recherchez un spécialiste du <strong className="text-gray-900">rideau métallique à {zone.name}</strong> ?
                {siteConfig.name} intervient rapidement sur {zone.name} ({zone.postalCode}) pour tous vos besoins :
                dépannage, installation, motorisation et entretien.
              </p>
            </div>

            <div className="mt-10 space-y-4">
              {[
                { title: "Intervention en 1 heure", desc: `sur ${zone.name}` },
                { title: "Disponible 24h/24", desc: "y compris week-ends et jours fériés" },
                { title: "Devis gratuit", desc: "avant intervention" },
                { title: "Techniciens qualifiés", desc: "toutes marques" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-4 bg-gray-50 border border-gray-100" style={{borderRadius:'10px'}}>
                  <span className="w-10 h-10 flex items-center justify-center bg-primary-50 text-primary-700 font-bold text-sm flex-shrink-0" style={{borderRadius:'8px'}}>{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <p className="font-bold text-gray-900 text-[15px]">{item.title}</p>
                    <p className="text-gray-500 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contenu hyper-local */}
      {zoneLocalData[zone.slug] && (
        <ZoneLocalSection
          zoneName={zone.name}
          zonePostal={zone.postalCode}
          zoneSlug={zone.slug}
          serviceName="Rideau métallique"
          serviceSlug=""
          localData={zoneLocalData[zone.slug]}
        />
      )}

      <FAQ items={zoneFaq.slice(0, 5)} title={`FAQ - Rideau Métallique ${zone.name}`} />
      <CTA title={`Besoin d'un dépannage à ${zone.name} ?`} />
    </main>
  );
}
