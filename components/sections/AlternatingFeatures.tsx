"use client";

import Image from "next/image";

interface FeatureItem {
  title: string;
  content: string;
  image: string;
  imageAlt: string;
  imagePosition: string;
}

interface AlternatingFeaturesProps {
  features: FeatureItem[];
  bgColor?: string;
}

export function AlternatingFeatures({ features }: AlternatingFeaturesProps) {
  return (
    <>
      {features.map((feature, index) => {
        const isImageLeft = feature.imagePosition === "left";
        const isEven = index % 2 === 0;
        const sectionBg = isEven ? "bg-white bg-crosshatch" : "bg-gray-50 bg-dots-pattern";

        return (
          <section key={index} className={`py-20 md:py-28 ${sectionBg} relative overflow-hidden`}>
            <div className="container relative">
              {/* Section label with number */}
              <div className="mb-10">
                <span className="section-label">
                  {String(index + 1).padStart(2, "0")} — Detail
                </span>
              </div>

              <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
                {/* Image block */}
                <div className={`lg:col-span-5 ${isImageLeft ? "lg:order-1" : "lg:order-2"}`}>
                  <div className="relative group">
                    {/* Main image -- angles nets, pas de borderRadius */}
                    <div className="relative aspect-[4/3] overflow-hidden shadow-2xl shadow-gray-900/10 group-hover:shadow-gray-900/20 transition-shadow duration-500">
                      <Image
                        src={feature.image}
                        alt={feature.imageAlt}
                        title={feature.imageAlt}
                        fill
                        sizes="(max-width: 1024px) 100vw, 40vw"
                        className="object-cover group-hover:scale-[1.03] transition-transform duration-700"
                      />
                      {/* Subtle inner shadow */}
                      <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(0,0,0,0.08)]" />
                    </div>

                    {/* Decorative accent bar */}
                    <div className={`absolute ${isImageLeft ? "-right-3 top-0" : "-left-3 top-0"} w-1.5 h-full bg-primary-600`} />
                  </div>
                </div>

                {/* Content block */}
                <div className={`lg:col-span-7 ${isImageLeft ? "lg:order-2" : "lg:order-1"}`}>
                  <h2
                    className="text-2xl md:text-3xl lg:text-[2.5rem] font-extrabold text-gray-900 leading-[1.15] tracking-tight mb-6 [&_strong]:text-primary-600"
                    dangerouslySetInnerHTML={{ __html: feature.title }}
                  />

                  {/* Divider industrial */}
                  <div className="divider-industrial mb-8" />

                  <div
                    className="prose prose-lg max-w-none text-gray-500 leading-[1.85] [&_p]:mb-5 [&_p:last-child]:mb-0 [&_strong]:text-gray-800 [&_strong]:font-bold [&_a]:text-primary-600 [&_a]:font-medium [&_a]:no-underline hover:[&_a]:underline [&_a]:transition-colors"
                    dangerouslySetInnerHTML={{ __html: feature.content }}
                  />
                </div>
              </div>
            </div>

            {/* Bottom decorative divider between sections */}
            {index < features.length - 1 && (
              <div className="container mt-20 md:mt-28">
                <div className="h-px bg-gray-200" />
              </div>
            )}
          </section>
        );
      })}
    </>
  );
}
