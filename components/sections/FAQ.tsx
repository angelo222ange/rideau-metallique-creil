"use client";

import { useState } from "react";
import { siteConfig } from "@/config/site";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  title?: string;
  subtitle?: string;
  items: FAQItem[];
  showContactCTA?: boolean;
}

export function FAQ({ title = "Questions fréquentes", subtitle, items, showContactCTA = true }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const defaultSubtitle = `Retrouvez les réponses aux questions les plus posées sur nos services à ${siteConfig.city}.`;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer.replace(/<[^>]*>/g, ""),
      },
    })),
  };

  return (
    <section className="py-20 md:py-28 bg-gray-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="container">
        {/* Header — centered */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block px-3 py-1 bg-primary-50 text-primary-700 text-xs font-semibold uppercase tracking-wider mb-4" style={{ borderRadius: '6px' }}>
            FAQ
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">{title}</h2>
          <p className="text-gray-500 text-lg mt-4">{subtitle || defaultSubtitle}</p>
        </div>

        {/* FAQ items — centered cards */}
        <div className="max-w-3xl mx-auto space-y-3">
          {items.map((item, index) => (
            <div
              key={index}
              className={`bg-white border transition-all ${
                openIndex === index ? 'border-primary-200 shadow-md shadow-primary-600/5' : 'border-gray-100'
              }`}
              style={{ borderRadius: '10px' }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="flex w-full items-center justify-between p-5 text-left"
              >
                <span className={`font-semibold pr-4 transition-colors ${
                  openIndex === index ? 'text-primary-700' : 'text-gray-900'
                }`}>
                  {item.question}
                </span>
                <span className={`flex-shrink-0 w-8 h-8 flex items-center justify-center transition-all ${
                  openIndex === index
                    ? 'bg-primary-100 text-primary-600 rotate-180'
                    : 'bg-gray-100 text-gray-400'
                }`} style={{ borderRadius: '6px' }}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </button>

              {openIndex === index && (
                <div className="px-5 pb-5">
                  <div className="h-px bg-gray-100 mb-4" />
                  <div
                    className="text-gray-500 text-sm leading-relaxed prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: item.answer }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        {showContactCTA && (
          <div className="text-center mt-12">
            <p className="text-gray-500 text-sm mb-4">Vous ne trouvez pas votre réponse ?</p>
            <a
              href={siteConfig.phoneLink}
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors shadow-lg shadow-primary-600/25"
              style={{ borderRadius: '8px' }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Appelez le {siteConfig.phone}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
