import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { CTA } from "@/components/sections/CTA";
import { FAQ } from "@/components/sections/FAQ";

export const metadata: Metadata = {
  title: `Prix Rideau Métallique ${siteConfig.city} - Tarifs et Devis 2026`,
  description: `Prix rideau métallique à ${siteConfig.city} : devis gratuit et sans engagement. Dépannage, installation, motorisation, entretien. ☎️ ${siteConfig.phone}`,
  keywords: `prix rideau métallique ${siteConfig.city}, tarif rideau métallique, devis rideau métallique ${siteConfig.department}, cout installation rideau metallique`,
  alternates: {
    canonical: `${siteConfig.url}/tarifs/`,
  },
  openGraph: {
    title: `Prix Rideau Métallique ${siteConfig.city} - Tarifs 2026`,
    description: `Tarifs rideau métallique à ${siteConfig.city}. Installation, dépannage, motorisation. Devis gratuit.`,
    type: "website",
    url: `${siteConfig.url}/tarifs`,
    images: [{
      url: `${siteConfig.url}/images/gallery/rideau-metallique-creil.webp`,
      width: 800,
      height: 600,
      alt: `Tarifs rideau métallique ${siteConfig.city}`,
    }],
  },
};

const tarifs = {
  depannage: [
    { prestation: "Diagnostic et déplacement", fourchette: "Gratuit", details: "Pré-diagnostic téléphonique inclus" },
    { prestation: "Déblocage rideau métallique", fourchette: "À partir de 150 €", details: "Selon type de blocage et dimensions" },
    { prestation: "Réparation moteur", fourchette: "À partir de 250 €", details: "Pièces et main d'oeuvre incluses" },
    { prestation: "Remplacement lames (par lame)", fourchette: "À partir de 30 €", details: "Selon type, matériau et dimension" },
    { prestation: "Réparation axe d'enroulement", fourchette: "À partir de 300 €", details: "Remplacement si nécessaire" },
    { prestation: "Remise en place tablier", fourchette: "À partir de 150 €", details: "Réglage glissières inclus" },
    { prestation: "Remplacement serrure", fourchette: "À partir de 120 €", details: "Serrure haute sécurité disponible" },
    { prestation: "Intervention urgence nuit/week-end", fourchette: "Sur devis", details: "Disponible 24h/24, 7j/7" },
  ],
  installation: [
    { prestation: "Rideau à lames pleines (manuel)", fourchette: "À partir de 800 €", details: "Acier galvanisé, sur-mesure" },
    { prestation: "Rideau à lames pleines (motorisé)", fourchette: "À partir de 1 500 €", details: "Moteur Somfy/Nice inclus" },
    { prestation: "Rideau micro-perforé (manuel)", fourchette: "À partir de 900 €", details: "Visibilité vitrine conservée" },
    { prestation: "Rideau micro-perforé (motorisé)", fourchette: "À partir de 1 800 €", details: "Avec télécommande" },
    { prestation: "Grille métallique articulée", fourchette: "À partir de 700 €", details: "Tubes ondulés ou mailles" },
    { prestation: "Rideau coupe-feu", fourchette: "À partir de 2 500 €", details: "Conforme normes ERP" },
    { prestation: "Porte de garage enroulable", fourchette: "À partir de 1 200 €", details: "Aluminium, motorisation intégrée" },
  ],
  motorisation: [
    { prestation: "Motorisation rideau existant (tubulaire)", fourchette: "À partir de 500 €", details: "Moteur intégré dans l'axe" },
    { prestation: "Motorisation rideau existant (latérale)", fourchette: "À partir de 600 €", details: "Moteur externe visible" },
    { prestation: "Remplacement moteur", fourchette: "À partir de 400 €", details: "Toutes marques" },
    { prestation: "Ajout télécommande", fourchette: "À partir de 80 €", details: "Programmation incluse" },
    { prestation: "Installation interrupteur à clé", fourchette: "À partir de 100 €", details: "Sécurité renforcée" },
  ],
  entretien: [
    { prestation: "Entretien annuel (Formule Essentiel)", fourchette: "À partir de 120 € /an", details: "1 visite, graissage, contrôle" },
    { prestation: "Entretien semestriel (Formule Pro)", fourchette: "À partir de 200 € /an", details: "2 visites, pièces d'usure incluses" },
    { prestation: "Contrat tout inclus (Formule Premium)", fourchette: "Sur devis", details: "Illimité, dépannage prioritaire" },
  ],
};

const faqTarifs = [
  {
    question: `Combien coûte un dépannage de rideau métallique à ${siteConfig.city} ?`,
    answer: `Le prix d'un <strong>dépannage de rideau métallique à ${siteConfig.city}</strong> dépend de la nature exacte de la panne, des dimensions du rideau et des pièces à remplacer. Chaque situation est différente : un déblocage simple ne coûte pas la même chose qu'un remplacement de moteur ou d'axe. C'est pourquoi le diagnostic est gratuit et le <strong>devis détaillé est communiqué avant toute intervention</strong>. Appelez le <strong>${siteConfig.phone}</strong> pour un devis personnalisé.`,
  },
  {
    question: `Quel est le prix d'installation d'un rideau métallique à ${siteConfig.city} ?`,
    answer: `Le prix d'une <strong>installation de rideau métallique à ${siteConfig.city}</strong> dépend du type de rideau (lames pleines, micro-perforé, grille), des dimensions exactes de l'ouverture, du matériau et de la motorisation. Un technicien se déplace <strong>gratuitement</strong> pour prendre les mesures et vous remettre un <strong>devis sur-mesure sans engagement</strong>.`,
  },
  {
    question: "Le devis est-il gratuit ?",
    answer: `Oui, <strong>${siteConfig.name}</strong> propose un <strong>devis 100% gratuit et sans engagement</strong> pour tous les services : dépannage, installation, motorisation et entretien. Pour les installations, un technicien se déplace gratuitement pour prendre les mesures et évaluer vos besoins.`,
  },
  {
    question: `Y a-t-il des frais de déplacement à ${siteConfig.city} ?`,
    answer: `Non, il n'y a <strong>aucun frais de déplacement</strong> sur ${siteConfig.city} et dans les ${siteConfig.department} (rayon 30 km). Le déplacement et le diagnostic sont inclus dans nos tarifs. Vous ne payez que l'intervention validée après acceptation du devis.`,
  },
  {
    question: "Comment payer l'intervention ?",
    answer: `Nous acceptons plusieurs <strong>modes de paiement</strong> : carte bancaire, espèces, chèque et virement bancaire. Le paiement en <strong>plusieurs fois</strong> est possible pour les installations. Une facture détaillée est systématiquement remise après chaque intervention.`,
  },
  {
    question: `Pourquoi les prix ne sont pas fixes ?`,
    answer: `Chaque rideau métallique est différent : <strong>dimensions, type de lames, marque du moteur, état général, cause exacte de la panne</strong>... Tous ces facteurs influencent le prix final. Un rideau de 2 mètres ne demande pas la même intervention qu'un rideau de 5 mètres. C'est pour cette raison que nous établissons systématiquement un <strong>devis précis sur place</strong>, après diagnostic, pour vous donner un prix juste et transparent.`,
  },
];

export default function TarifsPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Accueil", "item": siteConfig.url },
      { "@type": "ListItem", "position": 2, "name": "Tarifs", "item": `${siteConfig.url}/tarifs` },
    ],
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-white">
        <div className="h-1 bg-gradient-to-r from-primary-600 via-emerald-500 to-primary-700" />
        <div className="container py-16 md:py-20 lg:py-24">
          <nav className="mb-6" aria-label="Fil d'Ariane">
            <ol className="flex items-center gap-2 text-xs text-gray-400">
              <li><Link href="/" className="hover:text-primary-600 transition-colors">Accueil</Link></li>
              <li>/</li>
              <li className="text-gray-700 font-bold">Tarifs</li>
            </ol>
          </nav>
          <div className="max-w-3xl">
            <span className="inline-block px-3 py-1 bg-primary-50 text-primary-700 text-xs font-semibold uppercase tracking-wider mb-4" style={{borderRadius:'6px'}}>Tarifs 2026</span>
            <h1 className="font-bold text-4xl md:text-5xl lg:text-6xl text-gray-900 leading-[1.1] mb-5">
              Prix Rideau Métallique {siteConfig.city}
            </h1>
            <p className="text-gray-500 text-lg leading-relaxed mb-8">
              Tarifs indicatifs 2026 pour le dépannage, l&apos;installation, la motorisation et l&apos;entretien de rideaux métalliques à {siteConfig.city} et dans les {siteConfig.department}. Devis gratuit et sans engagement.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={siteConfig.phoneLink}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-primary-600 hover:bg-primary-700 transition-all shadow-lg shadow-primary-600/25"
                style={{ borderRadius: '8px' }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {siteConfig.phone}
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3.5 text-sm font-semibold text-gray-700 bg-white border-2 border-gray-200 hover:border-primary-300 hover:text-primary-700 transition-all"
                style={{ borderRadius: '8px' }}
              >
                Demander un devis
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Encadré résumé */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="container">
          <div className="bg-white border border-gray-100 border-l-4 border-l-primary-600 p-6 md:p-8 max-w-3xl" style={{ borderRadius: '10px' }}>
            <h2 className="font-bold text-gray-900 text-lg mb-4">
              Tarifs en bref
            </h2>
            <ul className="space-y-2">
              {[
                `Dépannage / déblocage : à partir de 150 € (diagnostic gratuit)`,
                `Installation rideau neuf : sur devis, à partir de 800 € (sur-mesure, pose incluse)`,
                `Motorisation rideau existant : à partir de 500 € (moteur + pose)`,
                `Contrat entretien annuel : à partir de 120 € /an`,
                `Devis gratuit et sans engagement, aucun frais de déplacement sur ${siteConfig.city}`,
                `Prix final communiqué après diagnostic sur place — pas de surprise`,
              ].map((point, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-700 text-[15px]">
                  <span className="w-1.5 h-1.5 bg-primary-600 rounded-full mt-2 flex-shrink-0" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Tarifs Dépannage */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container">
          <div className="max-w-xl mb-10">
            <span className="inline-block px-3 py-1 bg-primary-50 text-primary-700 text-xs font-semibold uppercase tracking-wider mb-4" style={{borderRadius:'6px'}}>Dépannage</span>
            <h2 className="font-bold text-3xl md:text-4xl text-gray-900">Tarifs Dépannage Rideau Métallique {siteConfig.city}</h2>
            <p className="text-gray-500 mt-3">
              Prix indicatifs pour les interventions de dépannage et réparation. Le devis exact est communiqué avant toute intervention.
            </p>
          </div>
          <div className="overflow-x-auto bg-white border border-gray-100" style={{ borderRadius: '10px' }}>
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left font-bold text-gray-900 px-4 py-3 border-b-2 border-gray-200">Prestation</th>
                  <th className="text-left font-bold text-gray-900 px-4 py-3 border-b-2 border-gray-200">Tarif indicatif</th>
                  <th className="text-left font-bold text-gray-900 px-4 py-3 border-b-2 border-gray-200 hidden md:table-cell">Détails</th>
                </tr>
              </thead>
              <tbody>
                {tarifs.depannage.map((item, i) => (
                  <tr key={i} className="border-b border-gray-100 hover:bg-gray-50/50">
                    <td className="text-gray-900 font-medium px-4 py-3">{item.prestation}</td>
                    <td className="text-primary-600 font-bold px-4 py-3 whitespace-nowrap">{item.fourchette}</td>
                    <td className="text-gray-500 px-4 py-3 hidden md:table-cell">{item.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-8">
            <a
              href={siteConfig.phoneLink}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-primary-600 hover:bg-primary-700 transition-all shadow-lg shadow-primary-600/25"
              style={{ borderRadius: '8px' }}
            >
              Devis dépannage gratuit : {siteConfig.phone}
            </a>
          </div>
        </div>
      </section>

      {/* Tarifs Installation */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="container">
          <div className="max-w-xl mb-10">
            <span className="inline-block px-3 py-1 bg-primary-50 text-primary-700 text-xs font-semibold uppercase tracking-wider mb-4" style={{borderRadius:'6px'}}>Installation</span>
            <h2 className="font-bold text-3xl md:text-4xl text-gray-900">Tarifs Installation Rideau Métallique {siteConfig.city}</h2>
            <p className="text-gray-500 mt-3">
              Prix fourniture + pose pour les rideaux métalliques neufs. Fabrication sur-mesure, garantie 2 à 10 ans.
            </p>
          </div>
          <div className="overflow-x-auto bg-white border border-gray-100" style={{ borderRadius: '10px' }}>
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left font-bold text-gray-900 px-4 py-3 border-b-2 border-gray-200">Type de rideau</th>
                  <th className="text-left font-bold text-gray-900 px-4 py-3 border-b-2 border-gray-200">Tarif indicatif</th>
                  <th className="text-left font-bold text-gray-900 px-4 py-3 border-b-2 border-gray-200 hidden md:table-cell">Détails</th>
                </tr>
              </thead>
              <tbody>
                {tarifs.installation.map((item, i) => (
                  <tr key={i} className="border-b border-gray-100 hover:bg-gray-50/50">
                    <td className="text-gray-900 font-medium px-4 py-3">{item.prestation}</td>
                    <td className="text-primary-600 font-bold px-4 py-3 whitespace-nowrap">{item.fourchette}</td>
                    <td className="text-gray-500 px-4 py-3 hidden md:table-cell">{item.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-8">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white bg-primary-600 hover:bg-primary-700 transition-all shadow-lg shadow-primary-600/25"
              style={{ borderRadius: '8px' }}
            >
              Demander un devis installation
            </Link>
          </div>
        </div>
      </section>

      {/* Tarifs Motorisation */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container">
          <div className="max-w-xl mb-10">
            <span className="inline-block px-3 py-1 bg-primary-50 text-primary-700 text-xs font-semibold uppercase tracking-wider mb-4" style={{borderRadius:'6px'}}>Motorisation</span>
            <h2 className="font-bold text-3xl md:text-4xl text-gray-900">Tarifs Motorisation Rideau Métallique</h2>
            <p className="text-gray-500 mt-3">
              Motorisez votre rideau métallique existant. Installation rapide, moteurs grandes marques.
            </p>
          </div>
          <div className="overflow-x-auto bg-white border border-gray-100" style={{ borderRadius: '10px' }}>
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left font-bold text-gray-900 px-4 py-3 border-b-2 border-gray-200">Prestation</th>
                  <th className="text-left font-bold text-gray-900 px-4 py-3 border-b-2 border-gray-200">Tarif indicatif</th>
                  <th className="text-left font-bold text-gray-900 px-4 py-3 border-b-2 border-gray-200 hidden md:table-cell">Détails</th>
                </tr>
              </thead>
              <tbody>
                {tarifs.motorisation.map((item, i) => (
                  <tr key={i} className="border-b border-gray-100 hover:bg-gray-50/50">
                    <td className="text-gray-900 font-medium px-4 py-3">{item.prestation}</td>
                    <td className="text-primary-600 font-bold px-4 py-3 whitespace-nowrap">{item.fourchette}</td>
                    <td className="text-gray-500 px-4 py-3 hidden md:table-cell">{item.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Tarifs Entretien */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="container">
          <div className="max-w-xl mb-10">
            <span className="inline-block px-3 py-1 bg-primary-50 text-primary-700 text-xs font-semibold uppercase tracking-wider mb-4" style={{borderRadius:'6px'}}>Entretien</span>
            <h2 className="font-bold text-3xl md:text-4xl text-gray-900">Contrats d&apos;Entretien {siteConfig.city}</h2>
            <p className="text-gray-500 mt-3">
              Prévenez les pannes et prolongez la durée de vie de votre rideau métallique avec un contrat d&apos;entretien.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {tarifs.entretien.map((formule, i) => (
              <div key={i} className="bg-white p-6 border border-gray-100 hover:border-primary-200 transition-colors" style={{ borderRadius: '10px' }}>
                <h3 className="font-bold text-gray-900 mb-2">{formule.prestation}</h3>
                <p className="font-bold text-2xl text-primary-600 mb-3">{formule.fourchette}</p>
                <p className="text-gray-500 text-sm">{formule.details}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Texte SEO */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto space-y-6">
            <span className="inline-block px-3 py-1 bg-primary-50 text-primary-700 text-xs font-semibold uppercase tracking-wider mb-4" style={{borderRadius:'6px'}}>Guide</span>
            <h2 className="font-bold text-3xl md:text-4xl text-gray-900">Comprendre les prix des rideaux métalliques à {siteConfig.city}</h2>
            <p className="text-gray-600 text-[16px] leading-[1.85]">
              Le <strong>prix d&apos;un rideau métallique à {siteConfig.city}</strong> dépend de plusieurs facteurs : le type de rideau (lames pleines, micro-perforées, grille articulée), les dimensions exactes de l&apos;ouverture, le matériau (acier galvanisé, aluminium, inox), le mode de manoeuvre (manuel ou motorisé) et les options de sécurité choisies. C&apos;est pourquoi il est impossible de donner un prix fixe sans avoir vu votre installation.
            </p>
            <p className="text-gray-600 text-[16px] leading-[1.85]">
              Pour le <strong>dépannage d&apos;un rideau métallique à {siteConfig.city}</strong>, le prix dépend de la cause exacte de la panne. Un rideau peut être bloqué pour de multiples raisons : lame sortie des rails, moteur en panne, axe voilé, ressort cassé, serrure grippée... Chaque situation demande une intervention différente. Chez <strong>{siteConfig.name}</strong>, le diagnostic est toujours <strong>gratuit</strong> et le devis est communiqué <strong>avant toute intervention</strong>, sans surprise.
            </p>
            <p className="text-gray-600 text-[16px] leading-[1.85]">
              Les prix indicatifs affichés sur cette page sont des <strong>tarifs de départ</strong>, donnés à titre de référence. Le prix final est systématiquement établi après un diagnostic sur place par notre technicien, en fonction des dimensions de votre rideau, de l&apos;état des composants et de la complexité de l&apos;intervention.
            </p>
            <p className="text-gray-600 text-[16px] leading-[1.85]">
              Nous intervenons sur l&apos;ensemble de {siteConfig.city} et dans les communes environnantes de l&apos;{siteConfig.department} : Nogent-sur-Oise, Montataire, Senlis, Chantilly, Lamorlaye, Gouvieux et toute l&apos;agglomération creilloise. <strong>Aucun frais de déplacement</strong> dans un rayon de 30 km.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Tarifs */}
      <FAQ
        items={faqTarifs}
        title={`Questions sur les tarifs à ${siteConfig.city}`}
        subtitle="Les réponses aux questions les plus fréquentes sur nos prix et conditions."
      />

      {/* CTA */}
      <CTA
        title="Demandez votre devis gratuit"
        subtitle={`Appelez le ${siteConfig.phone} ou remplissez notre formulaire. Réponse sous 30 minutes.`}
      />
    </main>
  );
}
