import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `Mentions Légales | ${siteConfig.name}`,
  description: `Mentions légales du site ${siteConfig.domain}. ${siteConfig.fullName}. Informations éditeur, hébergement et RGPD.`,
  robots: { index: true, follow: true },
  alternates: {
    canonical: `${siteConfig.url}/mentions-legales/`,
  },
};

export default function MentionsLegalesPage() {
  // Schema.org BreadcrumbList
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Accueil", "item": siteConfig.url },
      { "@type": "ListItem", "position": 2, "name": "Mentions Légales", "item": `${siteConfig.url}/mentions-legales/` },
    ],
  };

  return (
    <main className="pt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Breadcrumb visuel */}
      <nav aria-label="Fil d'Ariane" className="bg-gray-50 border-b border-gray-100">
        <div className="container py-3">
          <ol className="flex items-center gap-1.5 text-sm">
            <li>
              <Link href="/" className="text-gray-500 hover:text-primary-600 transition-colors">Accueil</Link>
            </li>
            <li>
              <svg className="w-4 h-4 text-gray-400 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </li>
            <li className="text-primary-600 font-medium">Mentions Légales</li>
          </ol>
        </div>
      </nav>

      <section className="section bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto prose prose-lg prose-gray">
            <h1 className="font-display text-3xl md:text-4xl text-gray-900">Mentions Légales</h1>

            <h2>1. Éditeur du site</h2>
            <p>
              <strong>{siteConfig.fullName}</strong><br />
              Adresse : {siteConfig.address}<br />
              Téléphone : <a href={siteConfig.phoneLink}>{siteConfig.phone}</a><br />
              Email : <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a><br />
              Site web : <a href={siteConfig.url}>{siteConfig.domain}</a>
            </p>

            <h2>2. Hébergement</h2>
            <p>
              Ce site est hébergé par :<br />
              OVH SAS — 2 Rue Kellermann, 59100 Roubaix, France<br />
              Téléphone : 1007<br />
              Site web : <a href="https://www.ovh.com" target="_blank" rel="noopener noreferrer">www.ovh.com</a>
            </p>

            <h2>3. Propriété intellectuelle</h2>
            <p>
              L&apos;ensemble du contenu de ce site (textes, images, logos, graphismes, icônes, sons, logiciels…)
              est la propriété exclusive de {siteConfig.fullName} ou de ses partenaires et est protégé par les
              lois françaises et internationales relatives à la propriété intellectuelle.
            </p>
            <p>
              Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des
              éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation
              écrite préalable de {siteConfig.name}.
            </p>

            <h2>4. Données personnelles et RGPD</h2>
            <p>
              Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi
              « Informatique et Libertés » du 6 janvier 1978 modifiée, vous disposez des droits suivants
              concernant vos données personnelles :
            </p>
            <ul>
              <li>Droit d&apos;accès à vos données</li>
              <li>Droit de rectification</li>
              <li>Droit d&apos;effacement (« droit à l&apos;oubli »)</li>
              <li>Droit à la limitation du traitement</li>
              <li>Droit à la portabilité des données</li>
              <li>Droit d&apos;opposition</li>
            </ul>
            <p>
              Pour exercer ces droits, contactez-nous :<br />
              Email : <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a><br />
              Courrier : {siteConfig.fullName}, {siteConfig.address}
            </p>

            <h2>5. Cookies</h2>
            <p>
              Ce site utilise des cookies techniques nécessaires à son bon fonctionnement. Des cookies
              de mesure d&apos;audience (anonymes) peuvent également être utilisés pour améliorer
              l&apos;expérience utilisateur. Vous pouvez gérer vos préférences à tout moment.
            </p>

            <h2>6. Limitation de responsabilité</h2>
            <p>
              {siteConfig.name} s&apos;efforce d&apos;assurer l&apos;exactitude des informations diffusées sur ce site.
              Toutefois, {siteConfig.name} ne peut garantir l&apos;exactitude, la complétude et l&apos;actualité des
              informations diffusées et décline toute responsabilité pour les erreurs ou omissions portant
              sur les informations disponibles sur ce site.
            </p>

            <h2>7. Liens hypertextes</h2>
            <p>
              Ce site peut contenir des liens vers d&apos;autres sites. {siteConfig.name} n&apos;exerce aucun
              contrôle sur ces sites et décline toute responsabilité quant à leur contenu.
            </p>

            <h2>8. Droit applicable</h2>
            <p>
              Les présentes mentions légales sont soumises au droit français. En cas de litige,
              les tribunaux de {siteConfig.city} seront seuls compétents.
            </p>

            <p className="text-sm text-gray-400 mt-12 border-t border-gray-100 pt-6">
              Dernière mise à jour : Janvier 2025
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
