"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight, ArrowLeft } from "lucide-react";
import { getCategoryBySlug, getArticlesByCategory } from "@/data/blog-articles";
import BlogCard from "@/components/blog/BlogCard";

export default function RelatiiSocialePage() {
  const category = getCategoryBySlug("relatii-sociale")!;
  const articles = getArticlesByCategory("relatii-sociale");
  const CategoryIcon = category.icon;

  return (
    <div className="pt-20">
      {/* Breadcrumb Navigation */}
      <section className="surface-secondary py-4">
        <div className="container-default">
          <nav className="flex items-center gap-2 text-sm text-[var(--text-tertiary)]">
            <Link href="/blog" className="hover:text-[var(--color-primary-600)] transition-colors">
              Blog
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
              className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6"
              style={{ backgroundColor: `${category.color}15` }}
            >
              <CategoryIcon className="w-10 h-10" style={{ color: category.color }} />
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

          {/* Back to Blog Link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-12"
          >
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-primary-600)] hover:gap-3 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              Înapoi la Blog
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
    </div>
  );
}
