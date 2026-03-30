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
  initialVisible?: number;
}

export function FAQ({
  title = "Questions frequentes",
  subtitle,
  items,
  showContactCTA = true,
  initialVisible = 6,
}: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [showAll, setShowAll] = useState(false);
  const defaultSubtitle = `Retrouvez les reponses aux questions les plus posees sur nos services a ${siteConfig.city}.`;

  const visibleItems = showAll ? items : items.slice(0, initialVisible);
  const hasMore = items.length > initialVisible;

  // FAQPage JSON-LD schema for all items (not just visible)
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
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary-50 text-primary-700 text-xs font-semibold uppercase tracking-wider rounded-full mb-5">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            FAQ
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
            {title}
          </h2>
          <p className="text-gray-500 text-lg mt-4">{subtitle || defaultSubtitle}</p>
        </div>

        {/* FAQ items - accordion */}
        <div className="max-w-3xl mx-auto space-y-3">
          {visibleItems.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`bg-white border rounded-2xl transition-all duration-300 ${
                  isOpen
                    ? "border-primary-200 shadow-lg shadow-primary-600/5"
                    : "border-gray-100 hover:border-gray-200"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between p-5 md:p-6 text-left gap-4"
                  aria-expanded={isOpen}
                >
                  <span
                    className={`font-semibold text-base md:text-lg transition-colors duration-200 ${
                      isOpen ? "text-primary-700" : "text-gray-900"
                    }`}
                  >
                    {item.question}
                  </span>
                  <span
                    className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isOpen
                        ? "bg-primary-600 text-white rotate-180"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </button>

                {/* Animated answer panel */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-5 md:px-6 pb-5 md:pb-6">
                    <div className="h-px bg-gray-100 mb-4" />
                    <div
                      className="faq-answer text-gray-600 text-sm md:text-base leading-relaxed prose prose-sm max-w-none"
                      dangerouslySetInnerHTML={{ __html: item.answer }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Show more button */}
        {hasMore && !showAll && (
          <div className="text-center mt-8">
            <button
              onClick={() => setShowAll(true)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-gray-200 text-gray-700 font-semibold text-sm hover:border-primary-300 hover:text-primary-700 transition-all duration-200 shadow-sm"
            >
              Voir plus de questions ({items.length - initialVisible})
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        )}

        {/* Contact CTA */}
        {showContactCTA && (
          <div className="max-w-3xl mx-auto mt-12">
            <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="text-center sm:text-left">
                <p className="font-bold text-gray-900 text-lg">Vous ne trouvez pas votre reponse ?</p>
                <p className="text-gray-500 text-sm mt-1">
                  Nos techniciens sont disponibles 24h/24 pour repondre a vos questions.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
                <a
                  href={siteConfig.phoneLink}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors shadow-lg shadow-primary-600/25 text-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  {siteConfig.phone}
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border-2 border-gray-200 text-gray-700 font-semibold hover:border-primary-300 hover:text-primary-700 transition-all text-sm"
                >
                  Contact en ligne
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
