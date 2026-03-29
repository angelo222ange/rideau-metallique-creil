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

export function AlternatingFeatures({ features, bgColor = "bg-white" }: AlternatingFeaturesProps) {
  return (
    <>
      {features.map((feature, index) => {
        const isImageLeft = feature.imagePosition === "left";
        const isEven = index % 2 === 0;
        const sectionBg = isEven ? "bg-white" : "bg-gray-50";

        return (
          <section key={index} className={`py-20 md:py-24 ${sectionBg} relative overflow-hidden`}>
            {/* Decorative blob */}
            <div className={`absolute ${isImageLeft ? 'top-0 right-0' : 'bottom-0 left-0'} w-80 h-80 bg-primary-50 rounded-full blur-3xl opacity-30`} />

            <div className="container relative">
              <div className={`grid lg:grid-cols-12 gap-10 lg:gap-16 items-center`}>

                {/* Image */}
                <div className={`lg:col-span-5 ${isImageLeft ? 'lg:order-1' : 'lg:order-2'}`}>
                  <div className="relative">
                    <div className="relative aspect-[4/3] overflow-hidden shadow-2xl shadow-gray-200/50" style={{ borderRadius: '20px' }}>
                      <Image
                        src={feature.image}
                        alt={feature.imageAlt}
                        fill
                        sizes="(max-width: 1024px) 100vw, 40vw"
                        className="object-cover"
                      />
                    </div>
                    {/* Decorative offset background */}
                    <div
                      className={`absolute -z-10 w-full h-full ${isImageLeft ? '-top-3 -left-3' : '-bottom-3 -right-3'} bg-gradient-to-br from-primary-100 to-emerald-100 opacity-50`}
                      style={{ borderRadius: '20px' }}
                    />
                  </div>
                </div>

                {/* Content */}
                <div className={`lg:col-span-7 ${isImageLeft ? 'lg:order-2' : 'lg:order-1'}`}>
                  {/* Section number */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-emerald-600 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-primary-600/20" style={{ borderRadius: '10px' }}>
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    <div className="h-px flex-1 bg-gray-200 max-w-[60px]" />
                  </div>

                  <h2
                    className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-gray-900 leading-[1.15] tracking-tight mb-6"
                    dangerouslySetInnerHTML={{ __html: feature.title }}
                  />

                  <div
                    className="prose prose-lg max-w-none text-gray-500 leading-relaxed [&_p]:mb-4 [&_p:last-child]:mb-0 [&_strong]:text-gray-900 [&_strong]:font-bold [&_a]:text-primary-600 [&_a]:font-medium [&_a]:no-underline hover:[&_a]:underline [&_a]:transition-colors"
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
