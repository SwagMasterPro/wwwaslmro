"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Clock, Calendar, ArrowRight } from "lucide-react";
import { BlogArticle, getCategoryBySlug } from "@/data/blog-articles";
import Card, { CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/Card";

interface BlogCardProps {
  article: BlogArticle;
  index?: number;
}

export default function BlogCard({ article, index = 0 }: BlogCardProps) {
  const category = getCategoryBySlug(article.categorySlug);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Link href={`/blog/${article.categorySlug}/${article.slug}`}>
        <Card variant="interactive" padding="none" className="h-full overflow-hidden">
          {/* Article Image */}
          <div className="relative w-full h-48 bg-gray-200 overflow-hidden">
            <Image
              src={article.image.src}
              alt={article.image.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {/* Category Badge */}
            {category && (
              <div
                className="absolute top-4 left-4 px-3 py-1.5 rounded-lg text-xs font-semibold text-white flex items-center gap-1.5 backdrop-blur-sm"
                style={{ backgroundColor: `${category.color}dd` }}
              >
                <div className="relative w-3.5 h-3.5">
                  <Image
                    src={category.image}
                    alt=""
                    fill
                    className="object-contain"
                  />
                </div>
                {category.name}
              </div>
            )}
          </div>

          {/* Article Content */}
          <div className="p-6">
            <CardHeader className="p-0 mb-3">
              <CardTitle as="h3" className="text-xl mb-2 line-clamp-2">
                {article.title}
              </CardTitle>
              <CardDescription className="line-clamp-2">
                {article.excerpt}
              </CardDescription>
            </CardHeader>

            {/* Metadata */}
            <div className="flex items-center gap-4 text-sm text-[var(--text-tertiary)] mb-4">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                <time dateTime={article.metadata.publishDate}>
                  {new Date(article.metadata.publishDate).toLocaleDateString("ro-RO", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                <span>{article.metadata.readingTime} min</span>
              </div>
            </div>

            {/* Read More Link */}
            <div className="flex items-center gap-2 text-sm font-semibold transition-colors group-hover:gap-3 transition-all duration-200" style={{ color: category?.color }}>
              Citește articolul
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </Card>
      </Link>
    </motion.article>
  );
}
