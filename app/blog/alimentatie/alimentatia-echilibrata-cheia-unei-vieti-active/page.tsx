"use client";

import { getArticleBySlug, getCategoryBySlug, getArticlesByCategory } from "@/data/blog-articles";
import ArticleHeader from "@/components/blog/ArticleHeader";
import ArticleContent from "@/components/blog/ArticleContent";
import RelatedArticles from "@/components/blog/RelatedArticles";

export default function ArticlePage() {
  const article = getArticleBySlug("alimentatia-echilibrata-cheia-unei-vieti-active")!;
  const category = getCategoryBySlug(article.categorySlug)!;
  const relatedArticles = getArticlesByCategory(article.categorySlug);

  const content = article.content || (
    <>
      <p>
        Acest articol va fi completat cu conținutul furnizat de utilizator.
        Structura este pregătită pentru a primi text formatat, imagini și alte elemente media.
      </p>
      <h2>Titlu Secțiune</h2>
      <p>
        Conținutul articolului va fi adăugat aici. Poate include paragrafe,
        liste, citate și imagini.
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
