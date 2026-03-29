import { siteConfig } from "@/config/site";

interface WhyChooseUsProps {
  title: string;
  items: string[];
  zoneName: string;
  zonePostal: string;
}

export function WhyChooseUs({ title, items, zoneName, zonePostal }: WhyChooseUsProps) {
  return (
    <section className="section bg-gray-50">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <div className="w-12 h-1 bg-primary-600 mb-6" style={{borderRadius:"4px"}} />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">{title}</h2>

            <div className="mt-8 divide-y divide-gray-200">
              {items.map((item, index) => (
                <div key={index} className="flex items-start gap-4 py-4">
                  <span className="font-bold text-2xl text-gray-200 leading-none mt-0.5">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <p className="text-gray-600 text-[15px] leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-8 md:p-10" style={{ borderRadius: '8px' }}>
            <p className="text-xs font-bold uppercase tracking-widest text-gray-300 mb-6">
              Intervention à {zoneName}
            </p>

            <div className="grid grid-cols-2 gap-px bg-gray-200 mb-8">
              {[
                { value: `${siteConfig.experience}`, label: "ans d'expérience" },
                { value: siteConfig.interventions, label: "interventions" },
                { value: `${siteConfig.reviews.rating}/5`, label: "note Google" },
                { value: "24/7", label: "disponibilité" },
              ].map((stat, i) => (
                <div key={i} className="bg-white p-5 text-center">
                  <p className="font-bold text-2xl text-gray-900">{stat.value}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>

            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              Notre équipe intervient rapidement à {zoneName} ({zonePostal}) et dans tout le {siteConfig.department} pour vos rideaux métalliques.
            </p>

            <a href={siteConfig.phoneLink}
              className="w-full text-center block btn-primary">
              {siteConfig.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
