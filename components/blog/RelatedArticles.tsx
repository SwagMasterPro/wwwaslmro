"use client";

import { motion } from "framer-motion";
import { BlogArticle } from "@/data/blog-articles";
import BlogCard from "./BlogCard";

interface RelatedArticlesProps {
  articles: BlogArticle[];
  currentArticleSlug: string;
}

export default function RelatedArticles({ articles, currentArticleSlug }: RelatedArticlesProps) {
  // Filter out current article and limit to 3
  const relatedArticles = articles
    .filter((article) => article.slug !== currentArticleSlug)
    .slice(0, 3);

  if (relatedArticles.length === 0) {
    return null;
  }

  return (
    <section className="section-lg surface-secondary">
      <div className="container-default">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="text-overline mb-3">Citește și</p>
          <h2 className="text-headline text-[var(--text-primary)]">
            Articole Asemănătoare
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedArticles.map((article, index) => (
            <BlogCard key={article.slug} article={article} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
