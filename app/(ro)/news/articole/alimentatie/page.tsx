"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import Script from "@/components/seo/JsonLdScript";
import { ChevronRight, ArrowLeft } from "lucide-react";
import { getCategoryBySlug, getArticlesByCategory } from "@/data/blog-articles";
import BlogCard from "@/components/blog/BlogCard";
import CategoryHubSection from "@/components/blog/CategoryHubSection";
import { generateWebPageSchema } from "@/lib/structured-data";
import { NEWS_ARTICLES_PATH, NEWS_PATH, getNewsCategoryPath } from "@/lib/news-routes";

export default function AlimentatiePage() {
  const category = getCategoryBySlug("alimentatie")!;
  const articles = getArticlesByCategory("alimentatie");

  return (
    <div className="pt-20">
      {/* Breadcrumb Navigation */}
      <section className="surface-secondary py-4">
        <div className="container-default">
          <nav className="flex items-center gap-2 text-sm text-[var(--text-tertiary)]">
            <Link href={NEWS_PATH} className="hover:text-[var(--color-primary-600)] transition-colors">
              News
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link href={NEWS_ARTICLES_PATH} className="hover:text-[var(--color-primary-600)] transition-colors">
              Articole
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-[var(--text-primary)]">{category.name}</span>
          </nav>
        </div>
      </section>

      {/* Category Header */}
      <section className="section-lg surface-primary">
        <div className="container-default">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center mb-12"
          >
            <div
              className="w-24 h-24 rounded-2xl flex items-center justify-center mx-auto mb-6 overflow-hidden"
              style={{ backgroundColor: `${category.color}15` }}
            >
              <div className="relative w-full h-full p-4">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
            <h1 className="text-display mb-6" style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)" }}>
              {category.name}
            </h1>
            <p className="text-lg leading-relaxed text-[var(--text-secondary)]">
              {category.description}
            </p>
            <div className="mt-6">
              <span className="px-4 py-2 rounded-full text-sm font-medium bg-[var(--surface-tertiary)] text-[var(--text-secondary)]">
                {articles.length} {articles.length === 1 ? "articol" : "articole"}
              </span>
            </div>
          </motion.div>

          <CategoryHubSection categorySlug="alimentatie" />

          {/* Back to Blog Link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-12"
          >
            <Link
              href={NEWS_ARTICLES_PATH}
              className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-primary-600)] hover:gap-3 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              Înapoi la Articole
            </Link>
          </motion.div>

          {/* Articles Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article, index) => (
              <BlogCard key={article.slug} article={article} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Structured Data for AI Search Optimization */}
      <Script
        id="category-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateWebPageSchema(
              "https://www.aslm.ro/news/articole/alimentatie",
              "Alimentație Sănătoasă | Articole ASLM",
              "Articole despre alimentația echilibrată și nutriția în medicina stilului de viață: diete bazate pe plante, prevenirea bolilor cronice, deficiențe nutriționale și sănătate mentală.",
              [
                { name: "Acasă", path: "/" },
                { name: "News", path: NEWS_PATH },
                { name: "Articole", path: NEWS_ARTICLES_PATH },
                { name: "Alimentație Sănătoasă", path: getNewsCategoryPath("alimentatie") },
              ]
            )
          ),
        }}
      />
    </div>
  );
}
