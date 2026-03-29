import { siteConfig } from "@/config/site";

interface TypeRideau {
  name: string;
  description: string;
  icon: string;
  ideal: string;
}

interface TypesRideauxProps {
  title?: string;
  zoneName: string;
  items: TypeRideau[];
}

export function TypesRideaux({ title, zoneName, items }: TypesRideauxProps) {
  return (
    <section className="section bg-gray-50">
      <div className="container">
        <div className="max-w-xl mb-14">
          <div className="w-12 h-1 bg-primary-600 mb-6" style={{borderRadius:"4px"}} />
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">{title || `Types de rideaux métalliques à ${zoneName}`}</h2>
          <p className="text-gray-500 text-lg mt-3">
            Découvrez notre gamme complète de rideaux métalliques disponibles à {zoneName} et dans le {siteConfig.department}.
          </p>
        </div>

        <div className="divide-y divide-gray-200">
          {items.map((type, index) => (
            <div key={index} className="grid grid-cols-12 gap-6 py-6 items-center">
              <div className="col-span-1">
                <span className="font-bold text-2xl text-gray-200">{String(index + 1).padStart(2, '0')}</span>
              </div>
              <div className="col-span-7 md:col-span-8">
                <h3 className="font-heading font-bold text-gray-900 text-[15px]">{type.name}</h3>
                <p className="text-gray-400 text-sm">{type.description}</p>
                <span className="text-xs text-gray-300">Idéal : {type.ideal}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <a href={siteConfig.phoneLink} className="btn-primary">
            Conseil gratuit : {siteConfig.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
