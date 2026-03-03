"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BlogCategory } from "@/data/blog-articles";
import Card, { CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";

interface CategoryCardProps {
  category: BlogCategory;
  articleCount: number;
  index?: number;
}

export default function CategoryCard({ category, articleCount, index = 0 }: CategoryCardProps) {
  const CategoryIcon = category.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Link href={`/blog/${category.slug}`}>
        <Card variant="interactive" padding="lg" className="h-full">
          <CardHeader className="p-0 mb-4">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
              style={{ backgroundColor: `${category.color}15` }}
            >
              <CategoryIcon className="w-8 h-8" style={{ color: category.color }} />
            </div>
            <CardTitle as="h3" className="text-2xl mb-2">
              {category.name}
            </CardTitle>
            <CardDescription className="text-base">
              {category.description}
            </CardDescription>
          </CardHeader>

          <CardContent className="p-0">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[var(--text-tertiary)]">
                {articleCount} {articleCount === 1 ? "articol" : "articole"}
              </span>
              <div className="flex items-center gap-2 text-sm font-semibold transition-all duration-200" style={{ color: category.color }}>
                Explorează
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
