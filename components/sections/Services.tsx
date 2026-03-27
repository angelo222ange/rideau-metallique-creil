import Link from "next/link";
import Image from "next/image";
import { siteConfig, services } from "@/config/site";

interface ServicesProps {
  title?: string;
  subtitle?: string;
  zoneSlug?: string;
}

export function Services({ title = "Nos Services", subtitle, zoneSlug }: ServicesProps) {
  const defaultSubtitle = `${siteConfig.name} intervient pour tous vos besoins en rideau métallique à ${siteConfig.city}.`;

  // Exclure "dépannage" de la liste visuelle (la homepage couvre ce service)
  const displayServices = services.filter(s => s.slug !== 'depannage');

  const getServiceUrl = (serviceSlug: string) => {
    const zone = zoneSlug || 'creil';
    return `/${serviceSlug}-rideau-metallique-${zone}`;
  };

  return (
    <section className="section bg-white">
      <div className="container">
        {/* Header — editorial, left-aligned */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div className="max-w-xl">
            <div className="rule-accent mb-6" />
            <h2 className="section-title">{title}</h2>
            <p className="section-subtitle">{subtitle || defaultSubtitle}</p>
          </div>
        </div>

        {/* Service entries — editorial list, not card grid */}
        <div className="divide-y divide-gray-100">
          {displayServices.map((service, index) => (
            <Link
              key={service.id}
              href={getServiceUrl(service.slug)}
              className="group grid grid-cols-12 gap-6 py-8 md:py-10 items-center transition-colors duration-300 hover:bg-gray-50/50 -mx-5 px-5 md:-mx-8 md:px-8"
            >
              {/* Number */}
              <div className="col-span-2 md:col-span-1">
                <span className="font-display text-3xl md:text-4xl text-gray-200 group-hover:text-secondary-terracotta transition-colors duration-300">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>

              {/* Image — small, revealed on hover */}
              <div className="col-span-4 md:col-span-3 lg:col-span-2">
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-100"
                  style={{ borderRadius: '2px' }}>
                  <Image
                    src={service.image}
                    alt={`${service.name} ${siteConfig.city}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="col-span-6 md:col-span-6 lg:col-span-7">
                <h3 className="font-display text-2xl md:text-3xl text-gray-900 mb-1 group-hover:text-secondary-terracotta transition-colors duration-300">
                  {service.name}
                </h3>
                <p className="text-gray-400 text-sm hidden md:block">{service.shortDesc}</p>
              </div>

              {/* Arrow */}
              <div className="hidden md:flex col-span-2 justify-end">
                <svg className="w-5 h-5 text-gray-300 group-hover:text-secondary-terracotta group-hover:translate-x-1 transition-all duration-300"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
