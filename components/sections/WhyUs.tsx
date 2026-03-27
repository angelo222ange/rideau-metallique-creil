import Image from "next/image";
import { siteConfig } from "@/config/site";
import { getPageContent } from "@/lib/content";
import homeContent from "@/content/pages/home.json";

const content = getPageContent(homeContent);

export function WhyUs() {
  return (
    <section className="section bg-white">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Image */}
          <div className="relative order-2 lg:order-1">
            <div className="relative aspect-[4/3] overflow-hidden" style={{ borderRadius: '2px' }}>
              <Image
                src="/images/gallery/rideau-metallique-creil.webp"
                alt={`Technicien rideau métallique ${siteConfig.city}`}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            {/* Floating stat — minimal */}
            <div className="absolute -bottom-6 right-4 md:right-8 bg-dark px-6 py-5" style={{ borderRadius: '2px' }}>
              <p className="font-display text-4xl text-secondary-terracotta">{content.stats.experience}</p>
              <p className="text-white/40 text-xs mt-0.5">{content.stats.experienceLabel}</p>
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <div className="rule-accent mb-6" />
            <h2 className="section-title">{content.whyUs.title}</h2>
            <p className="section-subtitle mb-10">{content.whyUs.subtitle}</p>

            <div className="space-y-0 divide-y divide-gray-100">
              {content.whyUs.advantages.map((advantage, index) => (
                <div key={index} className="py-5 flex items-start gap-4">
                  <span className="text-secondary-terracotta font-display text-2xl leading-none mt-0.5">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="font-heading font-bold text-gray-900 mb-1 text-[15px]">{advantage.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{advantage.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <a href={siteConfig.phoneLink} className="btn-primary">
                Nous contacter
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
