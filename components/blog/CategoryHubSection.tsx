"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getCategoryHub } from "@/data/category-hubs";
import { getArticlesByCategory } from "@/data/blog-articles";
import { generateItemListSchema, getAbsoluteUrl } from "@/lib/structured-data";
import { getNewsArticlePath } from "@/lib/news-routes";

type CategoryHubSectionProps = {
  categorySlug: string;
};

export default function CategoryHubSection({ categorySlug }: CategoryHubSectionProps) {
  const hub = getCategoryHub(categorySlug);
  const articles = getArticlesByCategory(categorySlug).slice(0, 3);
  const itemListSchema = generateItemListSchema(
    hub.title,
    articles.map((article) => ({
      name: article.title,
      url: getAbsoluteUrl(getNewsArticlePath(article.categorySlug, article.slug)),
    })),
  );

  return (
    <section className="mb-12 rounded-lg bg-[var(--surface-secondary)] border border-[var(--color-primary-100)] p-6 md:p-8">
      <p className="text-overline mb-3">Hub SEO: {hub.targetKeyword}</p>
      <h2 className="text-title text-[var(--text-primary)] mb-4">{hub.title}</h2>
      <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-6">
        {hub.summary}
      </p>
      <div className="space-y-4 mb-8">
        {hub.paragraphs.map((paragraph) => (
          <p key={paragraph} className="text-[var(--text-secondary)] leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>
      <div className="flex flex-col lg:flex-row gap-6 lg:items-end lg:justify-between">
        <div>
          <h3 className="font-semibold text-[var(--text-primary)] mb-3">
            Articole recomandate în această categorie
          </h3>
          <ul className="space-y-2">
            {articles.map((article) => (
              <li key={article.slug}>
                <Link
                  href={getNewsArticlePath(article.categorySlug, article.slug)}
                  className="text-[var(--color-primary-700)] font-medium hover:underline"
                >
                  {article.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
          <Link
            href={hub.relatedGuide.href}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-white transition-all shadow-md hover:shadow-lg"
            style={{ backgroundColor: "var(--color-primary-600)" }}
          >
            {hub.relatedGuide.label}
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href="/medicina-stilului-de-viata"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold border border-[var(--color-primary-200)] text-[var(--color-primary-700)] bg-white hover:bg-[var(--surface-primary)]"
          >
            Medicina stilului de viață
          </Link>
        </div>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
    </section>
  );
}
