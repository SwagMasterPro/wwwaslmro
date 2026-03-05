/**
 * Metadata Helpers for AI Search Optimization
 * Generates consistent metadata objects for pages, articles, and categories
 */

import { Metadata } from "next";
import { BlogArticle, BlogCategory } from "@/data/blog-articles";

const baseUrl = "https://aslm.ro";
const siteName = "ASLM - Societatea Academică de Medicina Stilului de Viață";
const defaultImage = `${baseUrl}/images/aslm-logo.png`;

/**
 * Get absolute URL
 */
export function getAbsoluteUrl(path: string = ""): string {
  return `${baseUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * Generate metadata for homepage
 */
export function generateHomeMetadata(): Metadata {
  const title = "ASLM | Societatea Academică de Medicina Stilului de Viață";
  const description =
    "Societatea Academică de Medicina Stilului de Viață (ASLM) promovează excelența în medicina stilului de viață prin educație, cercetare și colaborare profesională în România. Descoperă cei șase piloni ai medicinei stilului de viață.";

  return {
    title,
    description,
    keywords: [
      "medicina stilului de viață",
      "lifestyle medicine",
      "ASLM",
      "România",
      "sănătate",
      "prevenție",
      "boli cronice",
      "alimentație echilibrată",
      "activitate fizică",
      "gestionare stres",
    ],
    authors: [{ name: "ASLM" }],
    openGraph: {
      title,
      description,
      url: baseUrl,
      siteName,
      locale: "ro_RO",
      type: "website",
      images: [
        {
          url: defaultImage,
          width: 1200,
          height: 630,
          alt: "ASLM Logo",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [defaultImage],
    },
    alternates: {
      canonical: baseUrl,
    },
  };
}

/**
 * Generate metadata for static pages
 */
export function generatePageMetadata(
  title: string,
  description: string,
  path: string,
  keywords: string[] = [],
  imageUrl?: string
): Metadata {
  const fullTitle = `${title} | ASLM`;
  const url = getAbsoluteUrl(path);
  const image = imageUrl ? getAbsoluteUrl(imageUrl) : defaultImage;

  return {
    title: fullTitle,
    description,
    keywords: [...keywords, "ASLM", "medicina stilului de viață", "România"],
    authors: [{ name: "ASLM" }],
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName,
      locale: "ro_RO",
      type: "website",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
    alternates: {
      canonical: url,
    },
  };
}

/**
 * Generate metadata for blog articles
 */
export function generateArticleMetadata(
  article: BlogArticle,
  category: BlogCategory,
  path: string
): Metadata {
  const fullTitle = `${article.title} | ${category.name} | ASLM Blog`;
  const url = getAbsoluteUrl(path);
  const image = getAbsoluteUrl(article.image.src);

  return {
    title: fullTitle,
    description: article.excerpt,
    keywords: [
      ...article.metadata.tags,
      category.name,
      "medicina stilului de viață",
      "ASLM",
      "blog medical",
    ],
    authors: [{ name: "ASLM" }],
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url,
      siteName,
      locale: "ro_RO",
      type: "article",
      publishedTime: article.metadata.publishDate,
      modifiedTime: article.metadata.publishDate,
      authors: ["ASLM"],
      section: category.name,
      tags: article.metadata.tags,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: article.image.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      images: [image],
    },
    alternates: {
      canonical: url,
    },
  };
}

/**
 * Generate metadata for blog category pages
 */
export function generateCategoryMetadata(
  category: BlogCategory,
  path: string
): Metadata {
  const fullTitle = `${category.name} | Blog ASLM`;
  const url = getAbsoluteUrl(path);

  return {
    title: fullTitle,
    description: category.description,
    keywords: [
      category.name,
      "medicina stilului de viață",
      "ASLM",
      "blog",
      "articole medicale",
    ],
    authors: [{ name: "ASLM" }],
    openGraph: {
      title: fullTitle,
      description: category.description,
      url,
      siteName,
      locale: "ro_RO",
      type: "website",
      images: [
        {
          url: defaultImage,
          width: 1200,
          height: 630,
          alt: category.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: category.description,
      images: [defaultImage],
    },
    alternates: {
      canonical: url,
    },
  };
}
