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
          <section key={index} className={`py-20 md:py-28 ${sectionBg} relative overflow-hidden`}>
            {/* Decorative corner accent -- industrial feel */}
            <div
              className={`absolute ${isImageLeft ? "top-0 right-0" : "bottom-0 left-0"} w-[400px] h-[400px] opacity-[0.04]`}
              style={{
                backgroundImage: "repeating-linear-gradient(45deg, #1B7A4E 0, #1B7A4E 1px, transparent 0, transparent 50%)",
                backgroundSize: "12px 12px",
              }}
            />

            {/* Soft color blob */}
            <div className={`absolute ${isImageLeft ? "top-20 right-20" : "bottom-20 left-20"} w-72 h-72 bg-primary-100 rounded-full blur-3xl opacity-20`} />

            <div className="container relative">
              {/* Section divider line with number */}
              <div className="flex items-center gap-4 mb-12">
                <div
                  className="w-14 h-14 bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-primary-900/20"
                  style={{ borderRadius: "12px" }}
                >
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div className="h-px flex-1 bg-gradient-to-r from-primary-200 to-transparent" />
              </div>

              <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
                {/* Image block */}
                <div className={`lg:col-span-5 ${isImageLeft ? "lg:order-1" : "lg:order-2"}`}>
                  <div className="relative group">
                    {/* Decorative offset frame -- industrial/brique */}
                    <div
                      className={`absolute -z-10 w-full h-full ${
                        isImageLeft ? "-top-4 -left-4" : "-bottom-4 -right-4"
                      }`}
                      style={{
                        borderRadius: "16px",
                        background: "linear-gradient(135deg, #1B7A4E 0%, #B45309 100%)",
                        opacity: 0.15,
                      }}
                    />

                    {/* Second decorative offset -- thinner, darker */}
                    <div
                      className={`absolute -z-10 w-full h-full ${
                        isImageLeft ? "-top-2 -left-2" : "-bottom-2 -right-2"
                      }`}
                      style={{
                        borderRadius: "16px",
                        border: "2px solid rgba(27, 122, 78, 0.2)",
                      }}
                    />

                    {/* Main image */}
                    <div
                      className="relative aspect-[4/3] overflow-hidden shadow-2xl shadow-gray-900/10 group-hover:shadow-gray-900/20 transition-shadow duration-500"
                      style={{ borderRadius: "16px" }}
                    >
                      <Image
                        src={feature.image}
                        alt={feature.imageAlt}
                        title={feature.imageAlt}
                        fill
                        sizes="(max-width: 1024px) 100vw, 40vw"
                        className="object-cover group-hover:scale-[1.03] transition-transform duration-700"
                      />
                      {/* Subtle inner shadow for depth */}
                      <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(0,0,0,0.08)]" style={{ borderRadius: "16px" }} />
                    </div>

                    {/* Floating accent badge */}
                    <div
                      className={`absolute ${isImageLeft ? "-bottom-5 -right-5" : "-top-5 -left-5"} bg-white px-4 py-3 shadow-xl shadow-gray-200/60 border border-gray-100`}
                      style={{ borderRadius: "12px" }}
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className="w-9 h-9 bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white"
                          style={{ borderRadius: "8px" }}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-gray-900 font-bold text-sm leading-tight">
                            {index === 0 ? "25+ ans" : index === 1 ? "Sur-mesure" : "Garanti"}
                          </p>
                          <p className="text-gray-400 text-[11px]">
                            {index === 0 ? "d'expertise" : index === 1 ? "fabrication" : "pièces & MO"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content block */}
                <div className={`lg:col-span-7 ${isImageLeft ? "lg:order-2" : "lg:order-1"}`}>
                  <h2
                    className="text-2xl md:text-3xl lg:text-[2.5rem] font-extrabold text-gray-900 leading-[1.15] tracking-tight mb-8 [&_strong]:text-primary-600"
                    dangerouslySetInnerHTML={{ __html: feature.title }}
                  />

                  {/* Decorative separator */}
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-1 bg-primary-500" style={{ borderRadius: "2px" }} />
                    <div className="w-3 h-1 bg-secondary-terracotta opacity-60" style={{ borderRadius: "2px" }} />
                  </div>

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
                <div className="flex items-center gap-4">
                  <div className="flex-1 h-px bg-gray-200" />
                  <div className="w-2 h-2 bg-primary-300 rotate-45" />
                  <div className="flex-1 h-px bg-gray-200" />
                </div>
              </div>
            )}
          </section>
        );
      })}
    </>
  );
}
