import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { CTA } from "@/components/sections/CTA";
import { FAQ } from "@/components/sections/FAQ";

export const metadata: Metadata = {
  title: `Prix Rideau Metallique ${siteConfig.city} - Tarifs et Devis 2026`,
  description: `Prix rideau metallique a ${siteConfig.city} : devis gratuit et sans engagement. Depannage, installation, motorisation, entretien. ${siteConfig.phone}`,
  keywords: `prix rideau metallique ${siteConfig.city}, tarif rideau metallique, devis rideau metallique ${siteConfig.department}, cout installation rideau metallique`,
  alternates: {
    canonical: `${siteConfig.url}/tarifs/`,
  },
  openGraph: {
    title: `Prix Rideau Metallique ${siteConfig.city} - Tarifs 2026`,
    description: `Tarifs rideau metallique a ${siteConfig.city}. Installation, depannage, motorisation. Devis gratuit.`,
    type: "website",
    url: `${siteConfig.url}/tarifs`,
    images: [{
      url: `${siteConfig.url}/images/gallery/rideau-metallique-creil.webp`,
      width: 800,
      height: 600,
      alt: `Tarifs rideau metallique ${siteConfig.city}`,
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
    answer: `Le prix d'un <strong>depannage de rideau metallique a ${siteConfig.city}</strong> depend de la nature exacte de la panne, des dimensions du rideau et des pieces a remplacer. Chaque situation est differente : un deblocage simple ne coute pas la meme chose qu'un remplacement de moteur ou d'axe. C'est pourquoi le diagnostic est gratuit et le <strong>devis detaille est communique avant toute intervention</strong>. Appelez le <strong>${siteConfig.phone}</strong> pour un devis personnalise.`,
  },
  {
    question: `Quel est le prix d'installation d'un rideau metallique a ${siteConfig.city} ?`,
    answer: `Le prix d'une <strong>installation de rideau metallique a ${siteConfig.city}</strong> depend du type de rideau (lames pleines, micro-perfore, grille), des dimensions exactes de l'ouverture, du materiau et de la motorisation. Un technicien se deplace <strong>gratuitement</strong> pour prendre les mesures et vous remettre un <strong>devis sur-mesure sans engagement</strong>.`,
  },
  {
    question: "Le devis est-il gratuit ?",
    answer: `Oui, <strong>${siteConfig.name}</strong> propose un <strong>devis 100% gratuit et sans engagement</strong> pour tous les services : depannage, installation, motorisation et entretien. Pour les installations, un technicien se deplace gratuitement pour prendre les mesures et evaluer vos besoins.`,
  },
  {
    question: `Y a-t-il des frais de deplacement a ${siteConfig.city} ?`,
    answer: `Non, il n'y a <strong>aucun frais de deplacement</strong> sur ${siteConfig.city} et dans les ${siteConfig.department} (rayon 30 km). Le deplacement et le diagnostic sont inclus dans nos tarifs. Vous ne payez que l'intervention validee apres acceptation du devis.`,
  },
  {
    question: "Comment payer l'intervention ?",
    answer: `Nous acceptons plusieurs <strong>modes de paiement</strong> : carte bancaire, especes, cheque et virement bancaire. Le paiement en <strong>plusieurs fois</strong> est possible pour les installations. Une facture detaillee est systematiquement remise apres chaque intervention.`,
  },
  {
    question: `Pourquoi les prix ne sont pas fixes ?`,
    answer: `Chaque rideau metallique est different : <strong>dimensions, type de lames, marque du moteur, etat general, cause exacte de la panne</strong>... Tous ces facteurs influencent le prix final. Un rideau de 2 metres ne demande pas la meme intervention qu'un rideau de 5 metres. C'est pour cette raison que nous etablissons systematiquement un <strong>devis precis sur place</strong>, apres diagnostic, pour vous donner un prix juste et transparent.`,
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
        <p className="text-primary-600 text-sm font-semibold uppercase tracking-widest mb-3">{label}</p>
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">{title}</h2>
        <p className="text-gray-500 mt-3">{description}</p>
      </div>
      <div
        className="bg-white border border-gray-100 overflow-hidden shadow-xl"
        style={{ borderRadius: '16px' }}
      >
        <div className="bg-primary-600 px-6 py-4">
          <div className="grid grid-cols-3 gap-4">
            <p className="text-white font-bold text-sm">{columnTitle}</p>
            <p className="text-white font-bold text-sm">Tarif indicatif</p>
            <p className="text-white/70 font-bold text-sm hidden md:block">Details</p>
          </div>
        </div>
        <div>
          {items.map((item, i) => (
            <div
              key={i}
              className={`grid grid-cols-3 gap-4 px-6 py-4 ${i !== items.length - 1 ? 'border-b border-gray-100' : ''} hover:bg-gray-50/50 transition-colors`}
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
      <section className="pt-32 pb-16 bg-gray-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage:'repeating-linear-gradient(45deg, white 0, white 1px, transparent 0, transparent 8px)'}} />
        <div className="container relative">
          <nav className="mb-6" aria-label="Fil d'Ariane">
            <ol className="flex items-center gap-2 text-sm text-white/40">
              <li><Link href="/" className="hover:text-white/60 transition-colors">Accueil</Link></li>
              <li>/</li>
              <li className="text-white/70 font-semibold">Tarifs</li>
            </ol>
          </nav>
          <p className="text-primary-400 text-sm font-semibold uppercase tracking-widest mb-3">Tarifs 2026</p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Prix Rideau Metallique {siteConfig.city}
          </h1>
          <p className="text-white/50 text-lg max-w-2xl mb-8">
            Tarifs indicatifs 2026 pour le depannage, l&apos;installation, la motorisation et l&apos;entretien de rideaux metalliques a {siteConfig.city} et dans l&apos;{siteConfig.department}. Devis gratuit et sans engagement.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href={siteConfig.phoneLink}
              className="px-6 py-3 bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors inline-flex items-center gap-2"
              style={{ borderRadius: '8px' }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {siteConfig.phone}
            </a>
            <Link
              href="/contact"
              className="px-6 py-3 bg-white text-gray-700 font-medium border border-gray-200 hover:border-primary-300 transition-colors"
              style={{ borderRadius: '8px' }}
            >
              Demander un devis
            </Link>
          </div>
        </div>
      </section>

      {/* ─── RESUME TARIFS ─── */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-50 rounded-full blur-3xl opacity-30" />
        <div className="container relative">
          <div
            className="bg-white border border-gray-100 border-l-4 border-l-primary-600 p-8 max-w-3xl shadow-xl"
            style={{ borderRadius: '16px' }}
          >
            <h2 className="font-extrabold text-gray-900 text-xl mb-5">Tarifs en bref</h2>
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
                  <div className="w-5 h-5 bg-primary-50 text-primary-600 flex items-center justify-center flex-shrink-0 mt-0.5" style={{ borderRadius: '6px' }}>
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
      <section className="py-24 bg-gray-50 relative overflow-hidden">
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary-50 rounded-full blur-3xl opacity-30" />
        <div className="container relative">
          <TarifTable
            title={`Tarifs Depannage Rideau Metallique ${siteConfig.city}`}
            label="Depannage"
            description="Prix indicatifs pour les interventions de depannage et reparation. Le devis exact est communique avant toute intervention."
            items={tarifs.depannage}
            columnTitle="Prestation"
          />
          <div className="mt-8">
            <a
              href={siteConfig.phoneLink}
              className="px-6 py-3 bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors inline-flex items-center gap-2"
              style={{ borderRadius: '8px' }}
            >
              Devis depannage gratuit : {siteConfig.phone}
            </a>
          </div>
        </div>
      </section>

      {/* ─── TARIFS INSTALLATION ─── */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-20 right-0 w-80 h-80 bg-primary-50 rounded-full blur-3xl opacity-30" />
        <div className="container relative">
          <TarifTable
            title={`Tarifs Installation Rideau Metallique ${siteConfig.city}`}
            label="Installation"
            description="Prix fourniture + pose pour les rideaux metalliques neufs. Fabrication sur-mesure, garantie 2 a 10 ans."
            items={tarifs.installation}
            columnTitle="Type de rideau"
          />
          <div className="mt-8">
            <Link
              href="/contact"
              className="px-6 py-3 bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors inline-block"
              style={{ borderRadius: '8px' }}
            >
              Demander un devis installation
            </Link>
          </div>
        </div>
      </section>

      {/* ─── TARIFS MOTORISATION ─── */}
      <section className="py-24 bg-gray-50 relative overflow-hidden">
        <div className="absolute -top-20 -left-40 w-80 h-80 bg-primary-50 rounded-full blur-3xl opacity-30" />
        <div className="container relative">
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
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-primary-50 rounded-full blur-3xl opacity-30" />
        <div className="container relative">
          <div className="max-w-xl mb-10">
            <p className="text-primary-600 text-sm font-semibold uppercase tracking-widest mb-3">Entretien</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
              Contrats d&apos;Entretien {siteConfig.city}
            </h2>
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
                  className={`relative border hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-8 ${
                    isPopular
                      ? 'bg-primary-600 border-primary-600 text-white'
                      : 'bg-white border-gray-100 hover:border-gray-200'
                  }`}
                  style={{ borderRadius: '16px' }}
                >
                  {isPopular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-primary-600 text-xs font-bold px-3 py-1 uppercase tracking-wider" style={{ borderRadius: '6px' }}>
                      Populaire
                    </span>
                  )}
                  <h3 className={`font-extrabold text-lg mb-3 ${isPopular ? 'text-white' : 'text-gray-900'}`}>
                    {formule.prestation}
                  </h3>
                  <p className={`font-extrabold text-3xl mb-4 ${isPopular ? 'text-white' : 'text-primary-600'}`}>
                    {formule.fourchette}
                  </p>
                  <p className={`text-sm ${isPopular ? 'text-white/70' : 'text-gray-500'}`}>
                    {formule.details}
                  </p>
                  <a
                    href={siteConfig.phoneLink}
                    className={`mt-6 block text-center px-6 py-3 font-semibold transition-colors ${
                      isPopular
                        ? 'bg-white text-primary-700 hover:bg-gray-50'
                        : 'bg-primary-600 text-white hover:bg-primary-700'
                    }`}
                    style={{ borderRadius: '8px' }}
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
      <section className="py-24 bg-gray-50 relative overflow-hidden">
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-primary-50 rounded-full blur-3xl opacity-30" />
        <div className="container relative">
          <div className="max-w-3xl mx-auto">
            <p className="text-primary-600 text-sm font-semibold uppercase tracking-widest mb-3">Guide</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-8">
              Comprendre les prix des rideaux metalliques a {siteConfig.city}
            </h2>
            <div className="space-y-6">
              <p className="text-gray-600 text-[16px] leading-[1.85]">
                Le <strong>prix d&apos;un rideau metallique a {siteConfig.city}</strong> depend de plusieurs facteurs : le type de rideau (lames pleines, micro-perforees, grille articulee), les dimensions exactes de l&apos;ouverture, le materiau (acier galvanise, aluminium, inox), le mode de manoeuvre (manuel ou motorise) et les options de securite choisies. C&apos;est pourquoi il est impossible de donner un prix fixe sans avoir vu votre installation.
              </p>
              <p className="text-gray-600 text-[16px] leading-[1.85]">
                Pour le <strong>depannage d&apos;un rideau metallique a {siteConfig.city}</strong>, le prix depend de la cause exacte de la panne. Un rideau peut etre bloque pour de multiples raisons : lame sortie des rails, moteur en panne, axe voile, ressort casse, serrure grippee... Chaque situation demande une intervention differente. Chez <strong>{siteConfig.name}</strong>, le diagnostic est toujours <strong>gratuit</strong> et le devis est communique <strong>avant toute intervention</strong>, sans surprise.
              </p>
              <p className="text-gray-600 text-[16px] leading-[1.85]">
                Les prix indicatifs affiches sur cette page sont des <strong>tarifs de depart</strong>, donnes a titre de reference. Le prix final est systematiquement etabli apres un diagnostic sur place par notre technicien, en fonction des dimensions de votre rideau, de l&apos;etat des composants et de la complexite de l&apos;intervention.
              </p>
              <p className="text-gray-600 text-[16px] leading-[1.85]">
                Nous intervenons sur l&apos;ensemble de {siteConfig.city} et dans les communes environnantes de l&apos;{siteConfig.department} : Nogent-sur-Oise, Montataire, Senlis, Chantilly, Lamorlaye, Gouvieux et toute l&apos;agglomeration creilloise. <strong>Aucun frais de deplacement</strong> dans un rayon de 30 km.
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
