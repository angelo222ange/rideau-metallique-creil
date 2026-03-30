import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { CTA } from "@/components/sections/CTA";
import { FAQ } from "@/components/sections/FAQ";

export const metadata: Metadata = {
  title: `Prix Rideau Metallique Creil | Tarifs 2026 + Devis`,
  description: `Tarifs rideau metallique a Creil : depannage des 150 EUR, installation des 800 EUR. Devis gratuit, sans engagement. ${siteConfig.phone}`,
  keywords: `prix rideau metallique ${siteConfig.city}, tarif rideau metallique, devis rideau metallique ${siteConfig.department}, cout installation rideau metallique`,
  alternates: {
    canonical: `${siteConfig.url}/tarifs/`,
  },
  openGraph: {
    title: `Prix Rideau Metallique Creil - Tarifs 2026`,
    description: `Tarifs rideau metallique a Creil. Depannage, installation, motorisation. Devis gratuit.`,
    type: "website",
    locale: "fr_FR",
    url: `${siteConfig.url}/tarifs/`,
    images: [{
      url: `${siteConfig.url}/images/gallery/rideau-metallique-creil.webp`,
      width: 800,
      height: 600,
      alt: `Tarifs rideau metallique Creil`,
    }],
  },
};

const tarifs = {
  depannage: [
    { prestation: "Diagnostic et deplacement", fourchette: "Gratuit", details: "Pre-diagnostic telephonique inclus" },
    { prestation: "Deblocage rideau metallique", fourchette: "A partir de 150 EUR", details: "Selon type de blocage et dimensions" },
    { prestation: "Reparation moteur", fourchette: "A partir de 250 EUR", details: "Pieces et main d'oeuvre incluses" },
    { prestation: "Remplacement lames (par lame)", fourchette: "A partir de 30 EUR", details: "Selon type, materiau et dimension" },
    { prestation: "Reparation axe d'enroulement", fourchette: "A partir de 300 EUR", details: "Remplacement si necessaire" },
    { prestation: "Remise en place tablier", fourchette: "A partir de 150 EUR", details: "Reglage glissieres inclus" },
    { prestation: "Remplacement serrure", fourchette: "A partir de 120 EUR", details: "Serrure haute securite disponible" },
    { prestation: "Intervention urgence nuit/week-end", fourchette: "Sur devis", details: "Disponible 24h/24, 7j/7" },
  ],
  installation: [
    { prestation: "Rideau a lames pleines (manuel)", fourchette: "A partir de 800 EUR", details: "Acier galvanise, sur-mesure" },
    { prestation: "Rideau a lames pleines (motorise)", fourchette: "A partir de 1 500 EUR", details: "Moteur Somfy/Nice inclus" },
    { prestation: "Rideau micro-perfore (manuel)", fourchette: "A partir de 900 EUR", details: "Visibilite vitrine conservee" },
    { prestation: "Rideau micro-perfore (motorise)", fourchette: "A partir de 1 800 EUR", details: "Avec telecommande" },
    { prestation: "Grille metallique articulee", fourchette: "A partir de 700 EUR", details: "Tubes ondules ou mailles" },
    { prestation: "Rideau coupe-feu", fourchette: "A partir de 2 500 EUR", details: "Conforme normes ERP" },
    { prestation: "Porte de garage enroulable", fourchette: "A partir de 1 200 EUR", details: "Aluminium, motorisation integree" },
  ],
  motorisation: [
    { prestation: "Motorisation rideau existant (tubulaire)", fourchette: "A partir de 500 EUR", details: "Moteur integre dans l'axe" },
    { prestation: "Motorisation rideau existant (laterale)", fourchette: "A partir de 600 EUR", details: "Moteur externe visible" },
    { prestation: "Remplacement moteur", fourchette: "A partir de 400 EUR", details: "Toutes marques" },
    { prestation: "Ajout telecommande", fourchette: "A partir de 80 EUR", details: "Programmation incluse" },
    { prestation: "Installation interrupteur a cle", fourchette: "A partir de 100 EUR", details: "Securite renforcee" },
  ],
  entretien: [
    { prestation: "Formule Essentiel", fourchette: "A partir de 120 EUR /an", details: "1 visite annuelle, graissage, controle complet" },
    { prestation: "Formule Pro", fourchette: "A partir de 200 EUR /an", details: "2 visites, pieces d'usure incluses" },
    { prestation: "Formule Premium", fourchette: "Sur devis", details: "Illimite, depannage prioritaire" },
  ],
};

const faqTarifs = [
  {
    question: `Combien coute un depannage de rideau metallique a ${siteConfig.city} ?`,
    answer: `Un depannage de rideau metallique a ${siteConfig.city} coute <strong>a partir de 150 EUR</strong> pour un deblocage simple. Appelez DRM Creil au <strong>${siteConfig.phone}</strong> pour un devis gratuit. Le tarif exact depend de la nature de la panne (moteur, lames, axe, serrure), des dimensions du rideau et des pieces a remplacer. Le diagnostic est gratuit et le devis est communique avant toute intervention.`,
  },
  {
    question: `Quel est le prix d'installation d'un rideau metallique a ${siteConfig.city} ?`,
    answer: `L'installation d'un rideau metallique a ${siteConfig.city} coute <strong>entre 800 et 3 000 EUR</strong> selon les dimensions, le type de lames et la motorisation. Appelez DRM Creil au <strong>${siteConfig.phone}</strong> pour un devis sur-mesure gratuit. Un technicien se deplace gratuitement pour prendre les mesures exactes et vous remettre un devis sans engagement.`,
  },
  {
    question: "Le devis est-il gratuit ?",
    answer: `Oui, le devis est <strong>100% gratuit et sans engagement</strong> chez DRM ${siteConfig.city}. Appelez le <strong>${siteConfig.phone}</strong> pour tous les services : depannage, installation, motorisation et entretien. Pour les installations, un technicien se deplace gratuitement pour prendre les mesures et evaluer vos besoins.`,
  },
  {
    question: `Y a-t-il des frais de deplacement a ${siteConfig.city} ?`,
    answer: `Non, il n'y a <strong>aucun frais de deplacement</strong> a ${siteConfig.city} et dans l'${siteConfig.department} (rayon 30 km). Appelez DRM Creil au <strong>${siteConfig.phone}</strong>. Le deplacement et le diagnostic sont inclus dans nos tarifs. Vous ne payez que l'intervention validee apres acceptation du devis.`,
  },
  {
    question: "Comment payer l'intervention ?",
    answer: `DRM ${siteConfig.city} accepte <strong>carte bancaire, especes, cheque et virement bancaire</strong>. Appelez le <strong>${siteConfig.phone}</strong> pour toute question. Le paiement en plusieurs fois est possible pour les installations. Une facture detaillee est systematiquement remise apres chaque intervention.`,
  },
  {
    question: `Pourquoi les prix ne sont pas fixes ?`,
    answer: `Les prix varient car chaque rideau metallique est different : <strong>dimensions, type de lames, marque du moteur, etat general</strong>. Un rideau de 2 metres ne demande pas la meme intervention qu'un rideau de 5 metres. DRM ${siteConfig.city} etablit un <strong>devis precis sur place</strong>, apres diagnostic gratuit, pour un prix juste et transparent. Appelez le <strong>${siteConfig.phone}</strong>.`,
  },
];

interface TarifTableProps {
  title: string;
  label: string;
  description: string;
  items: { prestation: string; fourchette: string; details: string }[];
  columnTitle: string;
}

function TarifTable({ title, label, description, items, columnTitle }: TarifTableProps) {
  return (
    <div>
      <div className="max-w-xl mb-10">
        <p className="section-label">{label}</p>
        <h2 className="section-title">{title}</h2>
        <div className="divider-industrial mt-4" />
        <p className="text-gray-500 mt-3">{description}</p>
      </div>
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-lg">
        <div className="bg-gray-900 rounded-t-2xl px-4 md:px-6 py-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <p className="text-white font-bold text-sm uppercase tracking-wide">{columnTitle}</p>
            <p className="text-white font-bold text-sm uppercase tracking-wide">Tarif indicatif</p>
            <p className="text-white/70 font-bold text-sm uppercase tracking-wide hidden md:block">Details</p>
          </div>
        </div>
        <div>
          {items.map((item, i) => (
            <div
              key={i}
              className={`grid grid-cols-2 md:grid-cols-3 gap-4 px-4 md:px-6 py-4 ${i !== items.length - 1 ? 'border-b border-gray-100' : ''} hover:bg-gray-50 transition-colors`}
            >
              <p className="text-gray-900 font-medium text-sm">{item.prestation}</p>
              <p className="text-primary-600 font-bold text-sm whitespace-nowrap">{item.fourchette}</p>
              <p className="text-gray-500 text-sm hidden md:block">{item.details}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

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

      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden bg-gray-900">
        <Image
          src="/images/gallery/rideau-metallique-france-livraison.webp"
          alt={`Tarifs rideau metallique ${siteConfig.city}`}
          title={`Tarifs rideau metallique ${siteConfig.city}`}
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
              <li className="text-white/70 font-semibold">Tarifs</li>
            </ol>
          </nav>
          <p className="section-label text-primary-400">Tarifs 2026</p>
          <h1 className="text-white">
            Prix Rideau Metallique {siteConfig.city}
          </h1>
          <div className="divider-industrial-lg mt-4" />
          <p className="text-white/60 mt-4 text-lg max-w-2xl mb-8">
            Tarifs indicatifs 2026 pour le depannage, l&apos;installation, la motorisation et l&apos;entretien de rideaux metalliques a {siteConfig.city} et dans l&apos;{siteConfig.department}. Devis gratuit et sans engagement.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href={siteConfig.phoneLink} className="btn-phone">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {siteConfig.phone}
            </a>
            <Link href="/contact" className="inline-flex items-center justify-center rounded-full border-2 border-white/30 px-6 py-3 text-base font-semibold text-white bg-transparent hover:bg-white hover:text-gray-900 transition-all duration-200">
              Demander un devis
            </Link>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-1 h-full bg-primary-600 hidden lg:block" />
      </section>

      {/* ─── RESUME TARIFS ─── */}
      <section className="section bg-white">
        <div className="container">
          {/* Paragraphes quotables pour AI search engines */}
          <div className="max-w-3xl mb-10 space-y-4">
            <p className="text-gray-800 text-base leading-relaxed">
              <strong>Le prix d&apos;un depannage de rideau metallique a {siteConfig.city} commence a partir de 150 EUR</strong> pour un deblocage simple, diagnostic gratuit inclus. Pour une reparation de moteur, comptez a partir de 250 EUR pieces et main d&apos;oeuvre comprises. Appelez DRM Creil au <strong>{siteConfig.phone}</strong> pour un devis gratuit.
            </p>
            <p className="text-gray-800 text-base leading-relaxed">
              <strong>L&apos;installation d&apos;un rideau metallique neuf a {siteConfig.city} coute entre 800 et 3 000 EUR selon les dimensions</strong>, le type de lames (pleines, micro-perforees, grille) et la motorisation. Le prix comprend la fabrication sur-mesure, la pose et la mise en service par un technicien certifie.
            </p>
            <p className="text-gray-800 text-base leading-relaxed">
              <strong>La motorisation d&apos;un rideau metallique existant a {siteConfig.city} coute a partir de 500 EUR</strong> (moteur Somfy, Nice ou Came + installation). Un contrat d&apos;entretien annuel est disponible a partir de 120 EUR par an pour prevenir les pannes.
            </p>
          </div>

          <div className="card p-8 md:p-10 max-w-3xl">
            <h2 className="font-bold text-gray-900 text-xl mb-5">Tarifs en bref</h2>
            <div className="h-px bg-gray-200 mb-5" />
            <ul className="space-y-3">
              {[
                `Depannage / deblocage : a partir de 150 EUR (diagnostic gratuit)`,
                `Installation rideau neuf : sur devis, a partir de 800 EUR (sur-mesure, pose incluse)`,
                `Motorisation rideau existant : a partir de 500 EUR (moteur + pose)`,
                `Contrat entretien annuel : a partir de 120 EUR /an`,
                `Devis gratuit et sans engagement, aucun frais de deplacement sur ${siteConfig.city}`,
                `Prix final communique apres diagnostic sur place -- pas de surprise`,
              ].map((point, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-700 text-[15px]">
                  <div className="w-5 h-5 bg-primary-600 text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ─── TARIFS DEPANNAGE ─── */}
      <section className="section bg-gray-50">
        <div className="container">
          <TarifTable
            title={`Tarifs Depannage Rideau Metallique ${siteConfig.city}`}
            label="Depannage"
            description="Prix indicatifs pour les interventions de depannage et reparation. Le devis exact est communique avant toute intervention."
            items={tarifs.depannage}
            columnTitle="Prestation"
          />
          <div className="mt-8 flex flex-wrap gap-4">
            <a href={siteConfig.phoneLink} className="btn-primary">
              Devis depannage gratuit : {siteConfig.phone}
            </a>
            <Link href="/depannage-rideau-metallique-nogent-sur-oise" className="btn-secondary">
              Depannage Nogent-sur-Oise
            </Link>
          </div>
        </div>
      </section>

      {/* ─── TARIFS INSTALLATION ─── */}
      <section className="section bg-white">
        <div className="container">
          <TarifTable
            title={`Tarifs Installation Rideau Metallique ${siteConfig.city}`}
            label="Installation"
            description="Prix fourniture + pose pour les rideaux metalliques neufs. Fabrication sur-mesure, garantie 2 a 10 ans."
            items={tarifs.installation}
            columnTitle="Type de rideau"
          />
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/contact" className="btn-primary">
              Demander un devis installation
            </Link>
            <Link href="/installation-rideau-metallique-creil" className="btn-secondary">
              En savoir plus sur l&apos;installation
            </Link>
          </div>
        </div>
      </section>

      {/* ─── TARIFS MOTORISATION ─── */}
      <section className="section bg-gray-50">
        <div className="container">
          <TarifTable
            title="Tarifs Motorisation Rideau Metallique"
            label="Motorisation"
            description="Motorisez votre rideau metallique existant. Installation rapide, moteurs grandes marques."
            items={tarifs.motorisation}
            columnTitle="Prestation"
          />
        </div>
      </section>

      {/* ─── TARIFS ENTRETIEN ─── */}
      <section className="section bg-white">
        <div className="container">
          <div className="max-w-xl mb-10">
            <p className="section-label">Entretien</p>
            <h2 className="section-title">
              Contrats d&apos;Entretien {siteConfig.city}
            </h2>
            <div className="divider-industrial mt-4" />
            <p className="text-gray-500 mt-3">
              Prevenez les pannes et prolongez la duree de vie de votre rideau metallique avec un contrat d&apos;entretien.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {tarifs.entretien.map((formule, i) => {
              const isPopular = i === 1;
              return (
                <div
                  key={i}
                  className={`relative rounded-2xl p-8 transition-all ${
                    isPopular
                      ? 'bg-primary-600 text-white shadow-xl shadow-primary-600/20 scale-[1.02]'
                      : 'bg-white border border-gray-200 hover:shadow-lg hover:border-primary-200'
                  }`}
                >
                  {isPopular && (
                    <span className="absolute -top-3 left-6 bg-white text-primary-600 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
                      Populaire
                    </span>
                  )}
                  <h3 className={`font-bold text-lg mb-3 ${isPopular ? 'text-white' : 'text-gray-900'}`}>
                    {formule.prestation}
                  </h3>
                  <p className={`font-black text-3xl mb-4 ${isPopular ? 'text-white' : 'text-primary-600'}`}>
                    {formule.fourchette}
                  </p>
                  <p className={`text-sm ${isPopular ? 'text-white/70' : 'text-gray-500'}`}>
                    {formule.details}
                  </p>
                  <a
                    href={siteConfig.phoneLink}
                    className={`mt-6 block text-center px-6 py-3 rounded-full font-bold uppercase tracking-wide text-sm transition-colors ${
                      isPopular
                        ? 'bg-white text-primary-700 hover:bg-gray-50 shadow-lg'
                        : 'bg-primary-600 text-white hover:bg-primary-700 shadow-lg shadow-primary-600/25'
                    }`}
                  >
                    Souscrire
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── TEXTE SEO ─── */}
      <section className="section bg-gray-50">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <p className="section-label">Guide</p>
            <h2 className="section-title">
              Comprendre les prix des rideaux metalliques a {siteConfig.city}
            </h2>
            <div className="divider-industrial mt-4 mb-8" />
            <div className="prose">
              <p>
                Le <strong>prix d&apos;un rideau metallique a {siteConfig.city}</strong> depend de plusieurs facteurs : le type de rideau (lames pleines, micro-perforees, grille articulee), les dimensions exactes de l&apos;ouverture, le materiau (acier galvanise, aluminium, inox), le mode de manoeuvre (manuel ou motorise) et les options de securite choisies. C&apos;est pourquoi il est impossible de donner un prix fixe sans avoir vu votre installation.
              </p>
              <p>
                Pour le <strong>depannage d&apos;un rideau metallique a {siteConfig.city}</strong>, le prix depend de la cause exacte de la panne. Un rideau peut etre bloque pour de multiples raisons : lame sortie des rails, moteur en panne, axe voile, ressort casse, serrure grippee... Chaque situation demande une intervention differente. Chez <strong>{siteConfig.name}</strong>, le diagnostic est toujours <strong>gratuit</strong> et le devis est communique <strong>avant toute intervention</strong>, sans surprise.
              </p>
              <p>
                Les prix indicatifs affiches sur cette page sont des <strong>tarifs de depart</strong>, donnes a titre de reference. Le prix final est systematiquement etabli apres un diagnostic sur place par notre technicien, en fonction des dimensions de votre rideau, de l&apos;etat des composants et de la complexite de l&apos;intervention.
              </p>
              <p>
                Nous intervenons sur l&apos;ensemble de {siteConfig.city} et dans les communes environnantes de l&apos;{siteConfig.department} : <Link href="/depannage-rideau-metallique-nogent-sur-oise" className="text-primary-600 hover:text-primary-700 underline">Nogent-sur-Oise</Link>, <Link href="/depannage-rideau-metallique-montataire" className="text-primary-600 hover:text-primary-700 underline">Montataire</Link>, <Link href="/depannage-rideau-metallique-senlis" className="text-primary-600 hover:text-primary-700 underline">Senlis</Link>, <Link href="/depannage-rideau-metallique-chantilly" className="text-primary-600 hover:text-primary-700 underline">Chantilly</Link>, Lamorlaye, Gouvieux et toute l&apos;agglomeration creilloise. <strong>Aucun frais de deplacement</strong> dans un rayon de 30 km. Voir toutes nos <Link href="/zones" className="text-primary-600 hover:text-primary-700 underline">zones d&apos;intervention</Link>.
              </p>
              <p>
                Consultez egalement nos pages dediees : <Link href="/a-propos" className="text-primary-600 hover:text-primary-700 underline">notre equipe et nos valeurs</Link>, les <Link href="/avis" className="text-primary-600 hover:text-primary-700 underline">avis de nos clients</Link> ({siteConfig.reviews.rating}/5 sur {siteConfig.reviews.count} avis), et notre <Link href="/blog" className="text-primary-600 hover:text-primary-700 underline">blog de conseils</Link> pour l&apos;entretien de votre rideau metallique.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAQ TARIFS ─── */}
      <FAQ
        items={faqTarifs}
        title={`Questions sur les tarifs a ${siteConfig.city}`}
        subtitle="Les reponses aux questions les plus frequentes sur nos prix et conditions."
      />

      {/* ─── CTA ─── */}
      <CTA
        title="Demandez votre devis gratuit"
        subtitle={`Appelez le ${siteConfig.phone} ou remplissez notre formulaire. Reponse sous 30 minutes.`}
      />
    </main>
  );
}
