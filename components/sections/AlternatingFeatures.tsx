"use client";

import Image from "next/image";

interface FeatureItem {
  title: string;
  content: string;
  image: string;
  imageAlt: string;
  imagePosition: string; // Changed from "left" | "right" to string to accept JSON values
}

interface AlternatingFeaturesProps {
  features: FeatureItem[];
  bgColor?: string;
}

export function AlternatingFeatures({ features, bgColor = "bg-white" }: AlternatingFeaturesProps) {
  return (
    <section className={`section ${bgColor}`}>
      <div className="container">
        <div className="space-y-24 md:space-y-32">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center ${
                feature.imagePosition === "left" ? "lg:grid-flow-dense" : ""
              }`}
            >
              {/* Texte */}
              <div className={feature.imagePosition === "left" ? "lg:col-start-2" : ""}>
                <div className="rule-accent mb-6" />
                <h2 
                  className="font-display text-3xl md:text-4xl text-gray-900 leading-[1.2] mb-6"
                  dangerouslySetInnerHTML={{ __html: feature.title }}
                />
                <div 
                  className="prose prose-lg max-w-none text-gray-500 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: feature.content }}
                />
              </div>

              {/* Image */}
              <div className={feature.imagePosition === "left" ? "lg:col-start-1 lg:row-start-1" : ""}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
                  <Image
                    src={feature.image}
                    alt={feature.imageAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
