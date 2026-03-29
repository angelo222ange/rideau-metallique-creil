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

  const displayServices = services;

  const getServiceUrl = (serviceSlug: string) => {
    const zone = zoneSlug || 'creil';
    return `/${serviceSlug}-rideau-metallique-${zone}`;
  };

  return (
    <section className="py-20 md:py-28 bg-gray-50">
      <div className="container">
        {/* Header — centered */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block px-3 py-1 bg-primary-50 text-primary-700 text-xs font-semibold uppercase tracking-wider mb-4" style={{ borderRadius: '6px' }}>
            Services
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">{title}</h2>
          <p className="text-gray-500 text-lg mt-4">{subtitle || defaultSubtitle}</p>
        </div>

        {/* Service cards — grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {displayServices.map((service) => (
            <Link
              key={service.id}
              href={getServiceUrl(service.slug)}
              className="group relative bg-white border border-gray-100 overflow-hidden hover:border-primary-200 hover:shadow-lg hover:shadow-primary-600/5 transition-all duration-300"
              style={{ borderRadius: '10px' }}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={service.image}
                  alt={`${service.name} rideau métallique ${siteConfig.city}`}
                  title={`${service.name} rideau métallique ${siteConfig.city}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                  {service.name}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">
                  {service.longDesc || service.shortDesc}
                </p>

                {/* Arrow link */}
                <div className="flex items-center gap-2 text-primary-600 text-sm font-medium mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  En savoir plus
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
