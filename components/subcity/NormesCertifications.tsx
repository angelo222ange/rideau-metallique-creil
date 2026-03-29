interface NormeItem {
  icon: string;
  name: string;
  description: string;
}

interface NormesCertificationsProps {
  title: string;
  subtitle: string;
  items: NormeItem[];
}

export function NormesCertifications({ title, subtitle, items }: NormesCertificationsProps) {
  return (
    <section className="section bg-white">
      <div className="container">
        <div className="max-w-xl mb-14">
          <div className="w-12 h-1 bg-primary-600 mb-6" style={{borderRadius:"4px"}} />
          <h2 className="section-title">{title}</h2>
          <p className="section-subtitle">{subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-200 max-w-4xl">
          {items.map((norme, index) => (
            <div key={index} className="bg-white p-6">
              <h3 className="font-heading font-bold text-gray-900 text-sm mb-1">{norme.name}</h3>
              <p className="text-gray-400 text-xs leading-relaxed">{norme.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
