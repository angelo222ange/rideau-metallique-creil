import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `Politique de Confidentialité`,
  description: `Politique de confidentialité et de protection des données personnelles de ${siteConfig.fullName}. RGPD, cookies, droits des utilisateurs.`,
  robots: { index: true, follow: true },
  alternates: {
    canonical: `${siteConfig.url}/confidentialite/`,
  },
};

export default function ConfidentialitePage() {
  // Schema.org BreadcrumbList
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Accueil", "item": siteConfig.url },
      { "@type": "ListItem", "position": 2, "name": "Politique de Confidentialité", "item": `${siteConfig.url}/confidentialite/` },
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
            <li className="text-primary-600 font-medium">Politique de Confidentialité</li>
          </ol>
        </div>
      </nav>

      <section className="section bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto prose prose-lg prose-gray">
            <h1 className="font-bold text-3xl md:text-4xl text-gray-900">Politique de Confidentialité</h1>

            <p>
              <strong>{siteConfig.fullName}</strong> (ci-après « {siteConfig.name} ») s&apos;engage à protéger
              la vie privée des utilisateurs de son site internet{" "}
              <a href={siteConfig.url}>{siteConfig.domain}</a>.
              La présente politique de confidentialité a pour objet de vous informer sur la manière dont
              nous collectons, utilisons et protégeons vos données personnelles.
            </p>

            <h2>1. Responsable du traitement</h2>
            <p>
              Le responsable du traitement des données personnelles est :<br />
              <strong>{siteConfig.fullName}</strong><br />
              {siteConfig.address}<br />
              Email : <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a><br />
              Téléphone : <a href={siteConfig.phoneLink}>{siteConfig.phone}</a>
            </p>

            <h2>2. Données collectées</h2>
            <p>Nous collectons les données suivantes, uniquement lorsque vous utilisez notre formulaire de contact :</p>
            <ul>
              <li><strong>Nom et prénom</strong> : pour vous identifier et personnaliser nos échanges</li>
              <li><strong>Numéro de téléphone</strong> : pour vous recontacter rapidement</li>
              <li><strong>Adresse email</strong> : pour vous répondre par écrit</li>
              <li><strong>Adresse / zone d&apos;intervention</strong> : pour estimer le délai d&apos;intervention</li>
              <li><strong>Description du besoin</strong> : pour préparer un devis adapté</li>
            </ul>

            <h2>3. Finalité du traitement</h2>
            <p>Vos données personnelles sont collectées pour les finalités suivantes :</p>
            <ul>
              <li>Répondre à vos demandes de devis et d&apos;intervention</li>
              <li>Vous recontacter dans le cadre de votre demande</li>
              <li>Améliorer la qualité de nos services</li>
              <li>Respecter nos obligations légales</li>
            </ul>

            <h2>4. Base légale du traitement</h2>
            <p>
              Le traitement de vos données repose sur votre consentement (envoi du formulaire de contact)
              et sur notre intérêt légitime à répondre à vos demandes commerciales.
            </p>

            <h2>5. Durée de conservation</h2>
            <p>
              Vos données personnelles sont conservées pendant une durée maximale de <strong>3 ans</strong> à
              compter de votre dernier contact avec {siteConfig.name}. Au-delà de cette période, vos données
              seront supprimées de nos bases.
            </p>

            <h2>6. Destinataires des données</h2>
            <p>
              Vos données personnelles sont traitées uniquement par l&apos;équipe de {siteConfig.name}.
              Elles ne sont jamais vendues, louées ou transmises à des tiers à des fins commerciales.
            </p>

            <h2>7. Vos droits (RGPD)</h2>
            <p>
              Conformément au Règlement Général sur la Protection des Données (UE 2016/679), vous disposez
              des droits suivants :
            </p>
            <ul>
              <li><strong>Droit d&apos;accès</strong> : obtenir une copie de vos données personnelles</li>
              <li><strong>Droit de rectification</strong> : corriger des données inexactes ou incomplètes</li>
              <li><strong>Droit d&apos;effacement</strong> : demander la suppression de vos données</li>
              <li><strong>Droit à la limitation</strong> : restreindre le traitement de vos données</li>
              <li><strong>Droit à la portabilité</strong> : récupérer vos données dans un format structuré</li>
              <li><strong>Droit d&apos;opposition</strong> : vous opposer au traitement de vos données</li>
            </ul>
            <p>
              Pour exercer ces droits, adressez votre demande à :<br />
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a><br />
              ou par courrier : {siteConfig.fullName}, {siteConfig.address}
            </p>
            <p>
              En cas de litige, vous pouvez introduire une réclamation auprès de la CNIL :{" "}
              <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">www.cnil.fr</a>
            </p>

            <h2>8. Cookies</h2>
            <p>
              Ce site utilise des cookies strictement nécessaires à son bon fonctionnement. Aucun cookie
              publicitaire ou de traçage n&apos;est utilisé. Des cookies de mesure d&apos;audience anonymes
              peuvent être utilisés pour améliorer nos services.
            </p>
            <table>
              <thead>
                <tr>
                  <th>Cookie</th>
                  <th>Type</th>
                  <th>Durée</th>
                  <th>Finalité</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Session</td>
                  <td>Technique</td>
                  <td>Session</td>
                  <td>Fonctionnement du site</td>
                </tr>
                <tr>
                  <td>Analytics</td>
                  <td>Mesure d&apos;audience</td>
                  <td>13 mois</td>
                  <td>Statistiques anonymes</td>
                </tr>
              </tbody>
            </table>

            <h2>9. Sécurité des données</h2>
            <p>
              {siteConfig.name} met en œuvre toutes les mesures techniques et organisationnelles appropriées
              pour assurer la sécurité et la confidentialité de vos données personnelles, notamment contre
              la destruction accidentelle ou illicite, la perte, l&apos;altération ou l&apos;accès non autorisé.
            </p>

            <h2>10. Modifications de la politique</h2>
            <p>
              {siteConfig.name} se réserve le droit de modifier la présente politique de confidentialité à tout
              moment. Les modifications prendront effet dès leur publication sur cette page. Nous vous invitons
              à consulter régulièrement cette page.
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
