import { siteConfig } from "@/config/site";

interface AvantageItem {
  icon: string;
  title: string;
  description: string;
  stat: string;
  statLabel: string;
}

interface ComparatifItem {
  critere: string;
  manuel: string;
  motorise: string;
}

interface AvantagesMotorisationProps {
  title: string;
  subtitle: string;
  avantages: AvantageItem[];
  comparatif?: {
    title: string;
    criteres: ComparatifItem[];
  };
  zoneName: string;
}

export function AvantagesMotorisation({ title, subtitle, avantages, comparatif, zoneName }: AvantagesMotorisationProps) {
  return (
    <section className="section bg-gray-50">
      <div className="container">
        <div className="max-w-xl mb-14">
          <div className="w-12 h-1 bg-primary-600 mb-6" style={{borderRadius:"4px"}} />
          <h2 className="section-title">{title}</h2>
          <p className="section-subtitle">{subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200 mb-16">
          {avantages.map((item, index) => (
            <div key={index} className="bg-gray-50 p-6">
              <p className="font-bold text-3xl text-gray-900 mb-1">{item.stat}</p>
              <p className="text-xs text-gray-300 mb-3">{item.statLabel}</p>
              <h3 className="font-heading font-bold text-gray-900 mb-2 text-[15px]">{item.title}</h3>
              <p className="text-gray-400 text-sm">{item.description}</p>
            </div>
          ))}
        </div>

        {comparatif && (
          <div className="max-w-2xl">
            <h3 className="font-heading font-bold text-gray-900 text-sm uppercase tracking-wider mb-6">
              {comparatif.title}
            </h3>
            <div className="border border-gray-200" style={{ borderRadius: '8px' }}>
              <table className="w-full">
                <thead>
                  <tr className="bg-dark">
                    <th className="px-5 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Critère</th>
                    <th className="px-5 py-3 text-center text-xs font-bold text-white/40 uppercase tracking-wider">Manuel</th>
                    <th className="px-5 py-3 text-center text-xs font-bold text-primary-600 uppercase tracking-wider">Motorisé</th>
                  </tr>
                </thead>
                <tbody>
                  {comparatif.criteres.map((item, index) => (
                    <tr key={index} className="border-t border-gray-100">
                      <td className="px-5 py-3.5 text-sm text-gray-900">{item.critere}</td>
                      <td className="px-5 py-3.5 text-sm text-center text-gray-300">{item.manuel}</td>
                      <td className="px-5 py-3.5 text-sm text-center font-bold text-primary-600">{item.motorise}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="mt-10">
          <a href={siteConfig.phoneLink} className="btn-primary">
            Étude gratuite à {zoneName} : {siteConfig.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
