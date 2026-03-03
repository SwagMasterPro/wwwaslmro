"use client";

import Link from "next/link";
import { BookOpen, ArrowRight } from "lucide-react";
import { getAllCategories, articles, getArticlesByCategory } from "@/data/blog-articles";
import CategoryCard from "@/components/blog/CategoryCard";
import BlogCard from "@/components/blog/BlogCard";
import { motion } from "framer-motion";

export default function BlogPage() {
  const categories = getAllCategories();
  
  // Get latest 6 articles
  const recentArticles = articles.slice(0, 6);

  return (
    <div className="pt-20">
      {/* Page Header */}
      <section className="mesh-hero section-lg">
        <div className="container-default">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="text-overline text-[var(--color-primary-300)] mb-3 block">
              Resurse Educaționale
            </span>
            <h1
              className="text-display text-white mb-6"
              style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)" }}
            >
              Blog ASLM
            </h1>
            <p
              className="text-lg leading-relaxed mb-8"
              style={{ color: "rgba(255, 255, 255, 0.85)" }}
            >
              Descoperiți articole bazate pe dovezi științifice despre cei șase piloni
              ai medicinei stilului de viață: alimentație, activitate fizică, somn,
              gestionarea stresului, evitarea substanțelor nocive și relații sociale.
            </p>
            <div className="flex items-center justify-center gap-2 text-white/70">
              <BookOpen className="w-5 h-5" />
              <span>{articles.length} articole publicate</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="section-lg surface-secondary">
        <div className="container-default">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <p className="text-overline mb-3">Explorează pe Categorii</p>
            <h2 className="text-headline text-[var(--text-primary)] mb-4">
              Cei 6 Piloni ai Medicinei Stilului de Viață
            </h2>
            <p className="text-body max-w-2xl mx-auto">
              Alege categoria care te interesează pentru a descoperi articole relevante
              despre sănătate și prevenție.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => {
              const articleCount = getArticlesByCategory(category.slug).length;
              return (
                <CategoryCard
                  key={category.slug}
                  category={category}
                  articleCount={articleCount}
                  index={index}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* Recent Articles */}
      <section className="section-lg surface-primary">
        <div className="container-default">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <p className="text-overline mb-3">Articole Recente</p>
            <h2 className="text-headline text-[var(--text-primary)] mb-4">
              Ultimele Publicații
            </h2>
            <p className="text-body max-w-2xl mx-auto">
              Cele mai recente articole din toate categoriile, pentru a fi mereu la
              curent cu cele mai noi informații despre medicina stilului de viață.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {recentArticles.map((article, index) => (
              <BlogCard key={article.slug} article={article} index={index} />
            ))}
          </div>

          {/* View All Link */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center"
          >
            <p className="text-[var(--text-tertiary)] mb-4">
              Explorează toate articolele organizate pe categorii
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/blog/${category.slug}`}
                  className="px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all hover:shadow-lg hover:-translate-y-0.5"
                  style={{ backgroundColor: category.color }}
                >
                  {category.name}
                  <ArrowRight className="w-4 h-4 inline-block ml-2" />
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-lg surface-tertiary">
        <div className="container-default">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-headline text-[var(--text-primary)] mb-4">
              Alătură-te Comunității ASLM
            </h2>
            <p className="text-body mb-8">
              Devino membru ASLM pentru acces la resurse exclusive, evenimente educaționale
              și oportunități de networking cu profesioniști din domeniul medicinei stilului de viață.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/membri"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-all shadow-md hover:shadow-lg"
                style={{ backgroundColor: "var(--color-primary-600)" }}
              >
                Devino Membru
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all border-2"
                style={{
                  borderColor: "var(--color-primary-600)",
                  color: "var(--color-primary-600)",
                }}
              >
                Contactează-ne
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
