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
        const sectionBg = isEven ? "bg-white" : "bg-gray-50";

        return (
          <section key={index} className={`py-20 md:py-28 ${sectionBg}`}>
            <div className="container">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                {/* Image block */}
                <div className={`${isImageLeft ? "lg:order-1" : "lg:order-2"}`}>
                  <div className="relative group">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-xl">
                      <Image
                        src={feature.image}
                        alt={feature.imageAlt}
                        title={feature.imageAlt}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-contain group-hover:scale-[1.03] transition-transform duration-700"
                      />
                    </div>
                  </div>
                </div>

                {/* Content block */}
                <div className={`${isImageLeft ? "lg:order-2" : "lg:order-1"}`}>
                  <h2
                    className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-6 [&_strong]:text-primary-600"
                    dangerouslySetInnerHTML={{ __html: feature.title }}
                  />

                  <div className="w-12 h-1 bg-primary-500 rounded-full mb-8" />

                  <div
                    className="prose prose-lg max-w-none text-gray-600 leading-relaxed [&_p]:mb-5 [&_p:last-child]:mb-0 [&_strong]:text-gray-800 [&_strong]:font-bold [&_a]:text-primary-600 [&_a]:font-medium [&_a]:no-underline hover:[&_a]:underline [&_a]:transition-colors"
                    dangerouslySetInnerHTML={{ __html: feature.content }}
                  />
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}
