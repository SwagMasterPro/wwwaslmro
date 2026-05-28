"use client";

import Script from "next/script";
import { getArticleBySlug, getCategoryBySlug, getArticlesByCategory } from "@/data/blog-articles";
import ArticleHeader from "@/components/blog/ArticleHeader";
import ArticleContent from "@/components/blog/ArticleContent";
import RelatedArticles from "@/components/blog/RelatedArticles";
import { getArticleEnhancement } from "@/data/article-enhancements";
import { generateArticleSchema, generateBreadcrumbSchema, generateFAQSchema } from "@/lib/structured-data";

export default function ArticlePage() {
  const article = getArticleBySlug("cum-impacteaza-somnul-sanatatea-fizica-si-mentala")!;
  const category = getCategoryBySlug(article.categorySlug)!;
  const relatedArticles = getArticlesByCategory(article.categorySlug);
  const enhancement = getArticleEnhancement(article.slug);

  const content = article.content || (
    <>
      <p>
        Acest articol va fi completat cu conținutul furnizat de utilizator.
      </p>
    </>
  );

  const articleUrl = `https://www.aslm.ro/blog/${article.categorySlug}/${article.slug}`;
  const breadcrumbs = [
    { name: "Acasă", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: category.name, path: `/blog/${article.categorySlug}` },
    { name: article.title, path: `/blog/${article.categorySlug}/${article.slug}` },
  ];

  return (
    <>
      <Script
        id="article-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            generateArticleSchema(article, category, articleUrl),
            generateBreadcrumbSchema(breadcrumbs),
            ...(enhancement ? [generateFAQSchema(enhancement.faqs)] : []),
          ]),
        }}
      />
      <ArticleHeader article={article} category={category} />
      <ArticleContent content={content} />
      <RelatedArticles articles={relatedArticles} currentArticleSlug={article.slug} />
    </>
  );
}
