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
  showContact?: boolean;
}

export function FAQ({ title = "Questions Fréquentes", subtitle, items, showContact = true }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": items.map((item) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer.replace(/<[^>]*>/g, ''),
      },
    })),
  };

  return (
    <section className="section bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="container">
        <div className="grid lg:grid-cols-5 gap-16 items-start">
          {/* Left */}
          <div className="lg:col-span-2">
            <div className="rule-accent mb-6" />
            <h2 className="section-title">{title}</h2>
            <p className="section-subtitle">
              {subtitle || "Les réponses aux questions les plus fréquentes."}
            </p>

            {showContact && (
              <div className="mt-10 pt-8 border-t border-gray-100">
                <p className="text-gray-400 text-sm mb-4">
                  Une autre question ?
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a href={siteConfig.phoneLink} className="btn-primary text-sm">
                    {siteConfig.phone}
                  </a>
                  <a href="/contact" className="btn-secondary text-sm">
                    Nous écrire
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Right — Accordion */}
          <div className="lg:col-span-3">
            {items.map((item, index) => (
              <div
                key={index}
                className={`border-b border-gray-100 ${index === 0 ? 'border-t' : ''}`}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between py-6 text-left group"
                  aria-expanded={openIndex === index}
                >
                  <span className={`text-[15px] pr-8 transition-colors duration-200 ${
                    openIndex === index ? 'text-gray-900 font-bold' : 'text-gray-600 group-hover:text-gray-900'
                  }`}>
                    {item.question}
                  </span>
                  <span className={`w-6 h-6 flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-45' : ''
                  }`}>
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                    </svg>
                  </span>
                </button>
                <div className={`overflow-hidden transition-all duration-400 ease-out ${
                  openIndex === index ? 'max-h-96 opacity-100 pb-6' : 'max-h-0 opacity-0'
                }`}>
                  <p className="text-gray-400 text-sm leading-relaxed pr-12" dangerouslySetInnerHTML={{ __html: item.answer }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
