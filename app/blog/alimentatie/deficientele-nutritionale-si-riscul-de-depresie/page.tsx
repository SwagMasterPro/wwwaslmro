"use client";

import { getArticleBySlug, getCategoryBySlug, getArticlesByCategory } from "@/data/blog-articles";
import ArticleHeader from "@/components/blog/ArticleHeader";
import ArticleContent from "@/components/blog/ArticleContent";
import RelatedArticles from "@/components/blog/RelatedArticles";

export default function ArticlePage() {
  const article = getArticleBySlug("deficientele-nutritionale-si-riscul-de-depresie")!;
  const category = getCategoryBySlug(article.categorySlug)!;
  const relatedArticles = getArticlesByCategory(article.categorySlug);

  const content = article.content || (
    <>
      <p>
        Acest articol va fi completat cu conținutul furnizat de utilizator.
        Structura este pregătită pentru a primi text formatat, imagini și alte elemente media.
      </p>
    </>
  );

  return (
    <>
      <ArticleHeader article={article} category={category} />
      <ArticleContent content={content} />
      <RelatedArticles articles={relatedArticles} currentArticleSlug={article.slug} />
    </>
  );
}
