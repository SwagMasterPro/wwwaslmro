"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Clock, Calendar, Tag, ChevronRight } from "lucide-react";
import { BlogArticle, BlogCategory } from "@/data/blog-articles";

interface ArticleHeaderProps {
  article: BlogArticle;
  category: BlogCategory;
}

export default function ArticleHeader({ article, category }: ArticleHeaderProps) {
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
            <Link
              href={`/blog/${category.slug}`}
              className="hover:text-[var(--color-primary-600)] transition-colors"
            >
              {category.name}
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-[var(--text-primary)]">{article.title}</span>
          </nav>
        </div>
      </section>

      {/* Article Hero */}
      <section className="section-lg surface-primary">
        <div className="container-default">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            {/* Category Badge */}
            <div className="flex items-center gap-2 mb-6">
              <div
                className="px-4 py-2 rounded-lg text-sm font-semibold text-white flex items-center gap-2"
                style={{ backgroundColor: category.color }}
              >
                <div className="relative w-4 h-4">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-contain"
                  />
                </div>
                {category.name}
              </div>
            </div>

            {/* Title */}
            <h1 className="text-display mb-6" style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}>
              {article.title}
            </h1>

            {/* Metadata */}
            <div className="flex flex-wrap items-center gap-6 text-[var(--text-tertiary)] mb-8">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <time dateTime={article.metadata.publishDate} className="text-base">
                  {new Date(article.metadata.publishDate).toLocaleDateString("ro-RO", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span className="text-base">{article.metadata.readingTime} min citire</span>
              </div>
            </div>

            {/* Tags */}
            {article.metadata.tags.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 mb-8">
                <Tag className="w-4 h-4 text-[var(--text-tertiary)]" />
                {article.metadata.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 rounded-full text-xs font-medium bg-[var(--surface-tertiary)] text-[var(--text-secondary)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Featured Image */}
            <div className="relative w-full h-[400px] rounded-2xl overflow-hidden bg-gray-200 mb-8">
              <Image
                src={article.image.src}
                alt={article.image.alt}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1200px) 100vw, 1200px"
              />
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
