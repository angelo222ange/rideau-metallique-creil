interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

interface ProcessusInstallationProps {
  title?: string;
  zoneName: string;
  items: ProcessStep[];
}

export function ProcessusInstallation({ title, zoneName, items }: ProcessusInstallationProps) {
  return (
    <section className="section bg-white">
      <div className="container">
        <div className="max-w-xl mb-14">
          <div className="w-12 h-1 bg-primary-600 mb-6" style={{borderRadius:"4px"}} />
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">{title || `Processus d'installation à ${zoneName}`}</h2>
          <p className="text-gray-500 text-lg mt-3">
            De la visite technique à la mise en service, un accompagnement complet pour votre installation à {zoneName}.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-gray-200 max-w-5xl">
          {items.map((step, index) => (
            <div key={index} className="py-6 lg:py-0 lg:px-8 first:lg:pl-0 last:lg:pr-0">
              <span className="font-bold text-5xl text-gray-200 block mb-3">{step.step}</span>
              <h3 className="font-heading font-bold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
