"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";

interface ServiceItem {
  id: string;
  slug: string;
  name: string;
  shortDesc: string;
  longDesc?: string;
  image: string;
  hasPage?: boolean;
}

interface ServiceTabsProps {
  services: ServiceItem[];
}

type ServiceCategory = "urgence" | "installation" | "maintenance";

const categoryMap: Record<string, ServiceCategory> = {
  depannage: "urgence",
  deblocage: "urgence",
  reparation: "urgence",
  installation: "installation",
  fabrication: "installation",
  motorisation: "installation",
  entretien: "maintenance",
};

const categoryLabels: Record<ServiceCategory, string> = {
  urgence: "Urgence & Dépannage",
  installation: "Installation & Fabrication",
  maintenance: "Entretien & Motorisation",
};

export function ServiceTabs({ services }: ServiceTabsProps) {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>("urgence");
  const categories: ServiceCategory[] = ["urgence", "installation", "maintenance"];

  const filtered = services.filter(
    (s) => categoryMap[s.slug] === activeCategory
  );

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Decorative blob */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-50 rounded-full blur-3xl opacity-40" />

      <div className="container relative">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-primary-600 text-sm font-semibold uppercase tracking-widest mb-3">
            Nos services
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
            Tous vos besoins en rideau métallique
          </h2>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-10">
          <div
            className="inline-flex gap-1 p-1.5 bg-gray-100"
            style={{ borderRadius: "14px" }}
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
                  activeCategory === cat
                    ? "bg-white text-gray-900 shadow-md"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                style={{ borderRadius: "10px" }}
              >
                {categoryLabels[cat]}
              </button>
            ))}
          </div>
        </div>

        {/* Service cards — product-style with image overflow */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filtered.map((service) => (
            <Link
              key={service.id}
              href={`/${service.slug}-rideau-metallique-creil`}
              className="group"
            >
              {/* Image container with overflow effect */}
              <div className="relative mb-4 pt-8">
                {/* Grey rounded background */}
                <div
                  className="bg-gray-100 aspect-[4/2.5] relative overflow-visible group-hover:bg-gray-50 transition-colors duration-300"
                  style={{ borderRadius: "20px" }}
                >
                  {/* Subtle inner shadow for depth */}
                  <div className="absolute inset-0 shadow-inner opacity-30" style={{ borderRadius: "20px" }} />
                </div>

                {/* Image that overflows upward */}
                <div className="absolute inset-x-0 bottom-0 top-0 flex items-end justify-center pointer-events-none">
                  <div className="relative w-[90%] h-[120%] group-hover:scale-105 transition-transform duration-500 drop-shadow-xl">
                    <Image
                      src={service.image}
                      alt={`${service.name} rideau métallique ${siteConfig.city}`}
                      title={`${service.name} rideau métallique ${siteConfig.city}`}
                      fill
                      className="object-contain object-bottom"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                </div>
              </div>

              {/* Text */}
              <div className="text-center px-2">
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary-600 transition-colors flex items-center justify-center gap-2">
                  <span>{service.name}</span>
                  <svg
                    className="w-4 h-4 text-primary-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </h3>
                <p className="text-gray-400 text-sm mt-1">
                  {service.shortDesc}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
