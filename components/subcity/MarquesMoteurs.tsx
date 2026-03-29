interface MarqueItem {
  nom: string;
  description: string;
  origine: string;
  garantie: string;
}

interface MarquesMoteursProps {
  title: string;
  subtitle: string;
  items: MarqueItem[];
}

export function MarquesMoteurs({ title, subtitle, items }: MarquesMoteursProps) {
  return (
    <section className="section bg-white">
      <div className="container">
        <div className="max-w-xl mb-14">
          <div className="w-12 h-1 bg-primary-600 mb-6" style={{borderRadius:"4px"}} />
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">{title}</h2>
          <p className="text-gray-500 text-lg mt-3">{subtitle}</p>
        </div>

        <div className="divide-y divide-gray-200 max-w-3xl">
          {items.map((marque, index) => (
            <div key={index} className="grid grid-cols-12 gap-6 py-6 items-center">
              <div className="col-span-2 md:col-span-1">
                <div className="w-10 h-10 flex items-center justify-center font-bold text-lg text-white bg-gray-900" style={{ borderRadius: '8px' }}>
                  {marque.nom.charAt(0)}
                </div>
              </div>
              <div className="col-span-7 md:col-span-8">
                <h3 className="font-heading font-bold text-gray-900 text-[15px]">{marque.nom}</h3>
                <p className="text-gray-400 text-sm">{marque.description}</p>
                <span className="text-xs text-gray-300">{marque.origine}</span>
              </div>
              <div className="col-span-3 text-right">
                <span className="text-xs font-bold text-primary-600 uppercase tracking-wider">{marque.garantie}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
