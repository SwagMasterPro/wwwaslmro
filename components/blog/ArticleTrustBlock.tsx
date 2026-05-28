"use client";

import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { getArticleEnhancement } from "@/data/article-enhancements";
import { getArticleBySlug } from "@/data/blog-articles";
import { getTopicByCategory } from "@/data/seo-topic-map";
import RelatedResources from "@/components/seo/RelatedResources";
import { generateFAQSchema } from "@/lib/structured-data";

type ArticleTrustBlockProps = {
  slug: string;
};

export default function ArticleTrustBlock({ slug }: ArticleTrustBlockProps) {
  const enhancement = getArticleEnhancement(slug);
  const article = getArticleBySlug(slug);
  if (!enhancement) {
    return null;
  }
  const topic = article ? getTopicByCategory(article.categorySlug) : null;

  return (
    <section className="surface-secondary py-8">
      <div className="container-default">
        <div className="max-w-4xl mx-auto rounded-lg bg-white border border-[var(--color-primary-100)] p-6 md:p-8">
          <div className="flex flex-wrap gap-3 mb-6">
            <span className="px-3 py-1 rounded-full text-sm font-semibold bg-[var(--color-primary-50)] text-[var(--color-primary-700)]">
              {`Last updated: ${enhancement.lastUpdated}`}
            </span>
            <span className="px-3 py-1 rounded-full text-sm font-semibold bg-[var(--surface-tertiary)] text-[var(--text-secondary)]">
              Autor: Echipa editorială ASLM
            </span>
            <span className="px-3 py-1 rounded-full text-sm font-semibold bg-[var(--surface-tertiary)] text-[var(--text-secondary)]">
              {`Revizuit de: ${enhancement.reviewer}`}
            </span>
          </div>

          <div className="flex flex-wrap gap-4 mb-8 text-sm">
            <Link href="/revizie-medicala" className="font-semibold text-[var(--color-primary-700)] hover:underline">
              Proces editorial și revizie medicală
            </Link>
            <Link href="/echipa" className="font-semibold text-[var(--color-primary-700)] hover:underline">
              Consiliul Științific ASLM
            </Link>
          </div>

          <h2 className="text-title text-[var(--text-primary)] mb-4">Key takeaways</h2>
          <ul className="space-y-3 mb-8">
            {enhancement.takeaways.map((takeaway) => (
              <li key={takeaway} className="flex items-start gap-3 text-[var(--text-secondary)]">
                <span className="w-2 h-2 rounded-full bg-[var(--color-primary-600)] mt-3 flex-shrink-0" />
                <span>{takeaway}</span>
              </li>
            ))}
          </ul>

          <h3 className="font-heading text-xl font-semibold text-[var(--text-primary)] mb-4">
            Întrebări frecvente
          </h3>
          <div className="grid gap-4 mb-8">
            {enhancement.faqs.map((faq) => (
              <div key={faq.question} className="rounded-lg bg-[var(--surface-secondary)] p-4">
                <p className="font-semibold text-[var(--text-primary)] mb-2">{faq.question}</p>
                <p className="text-[var(--text-secondary)] leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>

          <h3 className="font-heading text-xl font-semibold text-[var(--text-primary)] mb-4">
            Referințe
          </h3>
          <ul className="space-y-2">
            {enhancement.references.map((reference) => (
              <li key={reference.href}>
                <a
                  href={reference.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[var(--color-primary-700)] font-semibold hover:underline"
                >
                  {reference.label}
                  <ExternalLink className="w-4 h-4" />
                </a>
              </li>
            ))}
          </ul>

          {topic && (
            <div className="mt-8">
              <RelatedResources resources={topic.resources} />
            </div>
          )}
        </div>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateFAQSchema(enhancement.faqs)),
        }}
      />
    </section>
  );
}
