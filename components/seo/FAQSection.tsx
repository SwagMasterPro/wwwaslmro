"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

/**
 * FAQ Section Component with structured data support
 * Optimized for AI search engines (ChatGPT, Claude, Perplexity, Gemini)
 */

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  title?: string;
  subtitle?: string;
  faqs: FAQItem[];
  className?: string;
}

export default function FAQSection({
  title = "Întrebări Frecvente",
  subtitle,
  faqs,
  className = "",
}: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className={`section-lg surface-secondary ${className}`}>
      <div className="container-default">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="text-overline mb-3">FAQ</p>
          <h2 className="text-headline text-[var(--text-primary)] mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-subtitle text-[var(--text-secondary)] max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="card-elevated overflow-hidden"
              itemScope
              itemProp="mainEntity"
              itemType="https://schema.org/Question"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left transition-colors hover:bg-[var(--color-primary-50)]"
                aria-expanded={openIndex === index}
              >
                <span
                  className="font-semibold text-[var(--text-primary)] text-lg"
                  itemProp="name"
                >
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-[var(--color-primary-600)] flex-shrink-0 transition-transform duration-200 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="px-6 pb-5"
                  itemScope
                  itemProp="acceptedAnswer"
                  itemType="https://schema.org/Answer"
                >
                  <div
                    className="text-[var(--text-secondary)] leading-relaxed pt-2 border-t border-[var(--color-primary-100)]"
                    itemProp="text"
                    dangerouslySetInnerHTML={{ __html: faq.answer }}
                  />
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
