import { siteConfig } from "@/config/site";

interface Formule {
  nom: string;
  frequence: string;
  inclus: string[];
  popular: boolean;
}

interface ContratEntretienProps {
  title: string;
  subtitle: string;
  formules: Formule[];
  zoneName: string;
}

export function ContratEntretien({ title, subtitle, formules, zoneName }: ContratEntretienProps) {
  return (
    <section className="section bg-gray-50">
      <div className="container">
        <div className="text-center max-w-xl mx-auto mb-14">
          <div className="w-12 h-1 bg-primary-600 mx-auto mb-6" style={{borderRadius:"4px"}} />
          <h2 className="section-title">{title}</h2>
          <p className="section-subtitle mx-auto">{subtitle}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {formules.map((formule, index) => (
            <div key={index}
              className={`bg-white p-8 relative ${formule.popular ? 'ring-2 ring-primary-600' : 'border border-gray-200'}`}
              style={{ borderRadius: '8px' }}>
              {formule.popular && (
                <span className="absolute -top-3 left-6 text-[10px] font-bold uppercase tracking-wider text-white px-3 py-1 bg-primary-600"
                  style={{ borderRadius: '8px' }}>
                  Le plus choisi
                </span>
              )}

              <h3 className="font-heading font-bold text-gray-900 mb-1">{formule.nom}</h3>
              <p className="text-xs text-gray-400 mb-4">{formule.frequence}</p>

              <ul className="space-y-3 mb-8">
                {formule.inclus.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-600 text-sm">
                    <svg className="w-4 h-4 text-primary-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>

              <a href={siteConfig.phoneLink}
                className={`w-full text-center block ${formule.popular ? 'btn-primary' : 'btn-secondary'}`}>
                Souscrire à {zoneName}
              </a>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <p className="text-gray-400 text-sm mb-4">
            Besoin d&apos;un contrat personnalisé pour plusieurs rideaux à {zoneName} ?
          </p>
          <a href={siteConfig.phoneLink} className="btn-primary">
            Devis sur-mesure : {siteConfig.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
