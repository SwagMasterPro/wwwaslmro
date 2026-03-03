"use client";

import { getArticleBySlug, getCategoryBySlug, getArticlesByCategory } from "@/data/blog-articles";
import ArticleHeader from "@/components/blog/ArticleHeader";
import ArticleContent from "@/components/blog/ArticleContent";
import RelatedArticles from "@/components/blog/RelatedArticles";

export default function ArticlePage() {
  const article = getArticleBySlug("inlocuirea-obiceiurilor-nocive-cu-obiceiuri-sanatoase")!;
  const category = getCategoryBySlug(article.categorySlug)!;
  const relatedArticles = getArticlesByCategory(article.categorySlug);

  const content = article.content || (
    <>
      <p>
        Acest articol va fi completat cu conținutul furnizat de utilizator.
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
