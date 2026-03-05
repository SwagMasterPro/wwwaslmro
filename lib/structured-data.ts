/**
 * Structured Data (JSON-LD) Helpers for AI Search Optimization
 * Generates schema.org structured data for better visibility in ChatGPT, Claude, Perplexity, Gemini
 */

import { BlogArticle, BlogCategory } from "@/data/blog-articles";

export interface Organization {
  "@context": "https://schema.org";
  "@type": "MedicalOrganization";
  name: string;
  alternateName?: string;
  url: string;
  logo: string;
  description: string;
  foundingDate?: string;
  address?: {
    "@type": "PostalAddress";
    addressLocality: string;
    addressCountry: string;
  };
  contactPoint?: {
    "@type": "ContactPoint";
    contactType: string;
    email: string;
  };
  sameAs?: string[];
  memberOf?: {
    "@type": "Organization";
    name: string;
  }[];
}

export interface Article {
  "@context": "https://schema.org";
  "@type": "Article";
  headline: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified: string;
  author: {
    "@type": "Organization" | "Person";
    name: string;
    url?: string;
  };
  publisher: {
    "@type": "Organization";
    name: string;
    logo: {
      "@type": "ImageObject";
      url: string;
    };
  };
  mainEntityOfPage: {
    "@type": "WebPage";
    "@id": string;
  };
  keywords?: string[];
  articleSection?: string;
  wordCount?: number;
}

export interface FAQPage {
  "@context": "https://schema.org";
  "@type": "FAQPage";
  mainEntity: {
    "@type": "Question";
    name: string;
    acceptedAnswer: {
      "@type": "Answer";
      text: string;
    };
  }[];
}

export interface BreadcrumbList {
  "@context": "https://schema.org";
  "@type": "BreadcrumbList";
  itemListElement: {
    "@type": "ListItem";
    position: number;
    name: string;
    item: string;
  }[];
}

export interface WebPage {
  "@context": "https://schema.org";
  "@type": "WebPage";
  "@id": string;
  url: string;
  name: string;
  description: string;
  isPartOf?: {
    "@type": "WebSite";
    url: string;
    name: string;
  };
  breadcrumb?: BreadcrumbList;
  primaryImageOfPage?: {
    "@type": "ImageObject";
    url: string;
  };
}

/**
 * Get absolute URL for the site
 */
export function getAbsoluteUrl(path: string = ""): string {
  const baseUrl = "https://aslm.ro";
  return `${baseUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * Generate Organization schema for ASLM
 */
export function generateOrganizationSchema(): Organization {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalOrganization",
    name: "Societatea Academică de Medicina Stilului de Viață",
    alternateName: "ASLM",
    url: "https://aslm.ro",
    logo: "https://aslm.ro/images/aslm-logo.png",
    description:
      "Societatea Academică de Medicina Stilului de Viață (ASLM) promovează excelența în medicina stilului de viață prin educație, cercetare și colaborare profesională în România. ASLM reunește profesioniști din domeniul sănătății dedicați prevenirii și tratării bolilor cronice prin schimbări ale stilului de viață.",
    foundingDate: "2024",
    address: {
      "@type": "PostalAddress",
      addressLocality: "București",
      addressCountry: "RO",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: "contact@aslm.ro",
    },
    sameAs: [
      "https://www.facebook.com/aslmromania",
      "https://www.instagram.com/aslm.ro",
    ],
    memberOf: [
      {
        "@type": "Organization",
        name: "Asociația Medicală Română (AMR)",
      },
    ],
  };
}

/**
 * Generate Article schema for blog posts
 */
export function generateArticleSchema(
  article: BlogArticle,
  category: BlogCategory,
  fullUrl: string
): Article {
  const imageUrl = getAbsoluteUrl(article.image.src);
  const wordCount = article.content
    .replace(/<[^>]*>/g, "")
    .split(/\s+/)
    .filter((word) => word.length > 0).length;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    image: imageUrl,
    datePublished: article.metadata.publishDate,
    dateModified: article.metadata.publishDate,
    author: {
      "@type": "Organization",
      name: "ASLM - Societatea Academică de Medicina Stilului de Viață",
      url: "https://aslm.ro",
    },
    publisher: {
      "@type": "Organization",
      name: "ASLM",
      logo: {
        "@type": "ImageObject",
        url: "https://aslm.ro/images/aslm-logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": fullUrl,
    },
    keywords: article.metadata.tags,
    articleSection: category.name,
    wordCount,
  };
}

/**
 * Generate FAQPage schema
 */
export function generateFAQSchema(
  faqs: { question: string; answer: string }[]
): FAQPage {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generate BreadcrumbList schema
 */
export function generateBreadcrumbSchema(
  breadcrumbs: { name: string; path: string }[]
): BreadcrumbList {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: getAbsoluteUrl(crumb.path),
    })),
  };
}

/**
 * Generate WebPage schema
 */
export function generateWebPageSchema(
  url: string,
  name: string,
  description: string,
  breadcrumbs?: { name: string; path: string }[],
  imageUrl?: string
): WebPage {
  const schema: WebPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": url,
    url,
    name,
    description,
    isPartOf: {
      "@type": "WebSite",
      url: "https://aslm.ro",
      name: "ASLM - Societatea Academică de Medicina Stilului de Viață",
    },
  };

  if (breadcrumbs) {
    schema.breadcrumb = generateBreadcrumbSchema(breadcrumbs);
  }

  if (imageUrl) {
    schema.primaryImageOfPage = {
      "@type": "ImageObject",
      url: imageUrl,
    };
  }

  return schema;
}
