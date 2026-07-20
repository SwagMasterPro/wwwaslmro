/**
 * Structured Data (JSON-LD) Helpers for AI Search Optimization
 * Generates schema.org structured data for better visibility in ChatGPT, Claude, Perplexity, Gemini
 */

import type { BlogArticle, BlogCategory } from "@/data/blog-articles";
import type { EventRecord } from "@/data/events";
import type { PressRelease } from "@/data/press-releases";
import { getExpertBySlug } from "@/data/experts";
import { normalizeLegacyBlogPath } from "@/lib/news-routes";
import { SITE_LOGO, SITE_NAME, SITE_URL, getSiteUrl } from "@/lib/site-config";

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

export interface PersonSchema {
  "@context": "https://schema.org";
  "@type": "Person";
  name: string;
  url: string;
  image?: string;
  jobTitle?: string;
  sameAs?: string[];
  affiliation?: {
    "@type": "MedicalOrganization";
    name: string;
    url: string;
  };
}

export interface Article {
  "@context": "https://schema.org";
  "@type": "Article" | "NewsArticle";
  headline: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  author: {
    "@type": "Organization" | "Person";
    name: string;
    url?: string;
  };
  reviewedBy?: {
    "@type": "MedicalOrganization" | "Person";
    name: string;
    url: string;
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

export interface MedicalWebPage extends Omit<WebPage, "@type"> {
  "@type": "MedicalWebPage";
  reviewedBy?: {
    "@type": "MedicalOrganization";
    name: string;
    url: string;
  };
  audience?: {
    "@type": "MedicalAudience" | "PeopleAudience";
    audienceType: string;
  };
  lastReviewed?: string;
}

/**
 * Get absolute URL for the site
 */
export function getAbsoluteUrl(path: string = ""): string {
  return getSiteUrl(path);
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
    url: SITE_URL,
    logo: SITE_LOGO,
    description:
      "Societatea Academică de Medicina Stilului de Viață (ASLM) promovează excelența în medicina stilului de viață prin educație, cercetare și colaborare profesională în România. ASLM reunește profesioniști din domeniul sănătății dedicați prevenirii și tratării bolilor cronice prin schimbări ale stilului de viață.",
    foundingDate: "2024",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Brașov",
      addressCountry: "RO",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: "contact@aslm.ro",
    },
    sameAs: [
      "https://www.facebook.com/profile.php?id=61587670614129",
      "https://www.instagram.com/aslm.lifestylemedicine/",
    ],
    memberOf: [
      {
        "@type": "Organization",
        name: "Asociația Medicală Română (AMR)",
      },
    ],
  };
}

export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
  };
}

export interface EventSchema {
  "@context": "https://schema.org";
  "@type": "Event";
  name: string;
  description: string;
  startDate: string;
  endDate?: string;
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode" | "https://schema.org/OnlineEventAttendanceMode" | "https://schema.org/MixedEventAttendanceMode";
  eventStatus: "https://schema.org/EventScheduled";
  image: string;
  location: { "@type": "Place"; name: string } | { "@type": "VirtualLocation"; url: string };
  organizer: { "@type": "MedicalOrganization"; name: string; url: string };
  url: string;
}

export function generatePersonSchema(person: {
  name: string;
  url: string;
  image?: string;
  jobTitle?: string;
  affiliation?: string;
  sameAs?: string[];
}): PersonSchema {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: person.name,
    url: person.url,
    image: person.image,
    jobTitle: person.jobTitle,
    sameAs: person.sameAs,
    affiliation: person.affiliation
      ? {
          "@type": "MedicalOrganization",
          name: person.affiliation,
          url: SITE_URL,
        }
      : undefined,
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
  const author = article.metadata.authorId
    ? getExpertBySlug(article.metadata.authorId)
    : undefined;
  const reviewer = article.metadata.reviewerId
    ? getExpertBySlug(article.metadata.reviewerId)
    : undefined;
  const wordCount = article.content
    .replace(/<[^>]*>/g, "")
    .split(/\s+/)
    .filter((word) => word.length > 0).length;

  const schema: Article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    image: imageUrl,
    datePublished: article.metadata.publishDate,
    author: author
      ? {
          "@type": "Person",
          name: author.name,
          url: getAbsoluteUrl(author.profilePath),
        }
      : {
          "@type": "Organization",
          name: "Echipa editorială ASLM",
          url: SITE_URL,
        },
    publisher: {
      "@type": "Organization",
      name: "ASLM",
      logo: {
        "@type": "ImageObject",
        url: SITE_LOGO,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": normalizeLegacyBlogUrl(fullUrl),
    },
    keywords: article.metadata.tags,
    articleSection: category.name,
    wordCount,
  };

  if (article.metadata.modifiedDate) {
    schema.dateModified = article.metadata.modifiedDate;
  }

  if (reviewer && article.metadata.lastReviewedDate) {
    schema.reviewedBy = {
      "@type": "Person",
      name: reviewer.name,
      url: getAbsoluteUrl(reviewer.profilePath),
    };
  }

  return schema;
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
  const canonicalBreadcrumbs = breadcrumbs.flatMap((crumb) =>
    crumb.path === "/blog"
      ? [
          { name: "News", path: "/news" },
          { name: "Articole", path: "/news/articole" },
        ]
      : [{ ...crumb, path: normalizeLegacyBlogPath(crumb.path) }],
  );

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: canonicalBreadcrumbs.map((crumb, index) => ({
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
      url: SITE_URL,
      name: SITE_NAME,
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

export function generateMedicalWebPageSchema(
  url: string,
  name: string,
  description: string,
  breadcrumbs?: { name: string; path: string }[],
  imageUrl?: string,
  audienceType = "Profesioniști din sănătate și public interesat de prevenție",
  review?: { reviewerName: string; reviewerUrl: string; lastReviewed: string },
): MedicalWebPage {
  const schema: MedicalWebPage = {
    ...generateWebPageSchema(url, name, description, breadcrumbs, imageUrl),
    "@type": "MedicalWebPage",
    audience: {
      "@type": "MedicalAudience",
      audienceType,
    },
  };

  if (review) {
    schema.reviewedBy = {
      "@type": "MedicalOrganization",
      name: review.reviewerName,
      url: review.reviewerUrl,
    };
    schema.lastReviewed = review.lastReviewed;
  }

  return schema;
}

/** Emits Event markup only for approved, forthcoming events. */
export function generateEventSchema(event: EventRecord): EventSchema | null {
  if (event.lifecycle !== "scheduled" || !event.detailsUrl) {
    return null;
  }

  const attendanceMode = event.format === "Online"
    ? "https://schema.org/OnlineEventAttendanceMode"
    : event.format === "Hibrid"
      ? "https://schema.org/MixedEventAttendanceMode"
      : "https://schema.org/OfflineEventAttendanceMode";

  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    description: event.summary,
    startDate: event.startDate,
    ...(event.endDate ? { endDate: event.endDate } : {}),
    eventAttendanceMode: attendanceMode,
    eventStatus: "https://schema.org/EventScheduled",
    image: getAbsoluteUrl(event.image.src),
    location: event.format === "Online"
      ? { "@type": "VirtualLocation", url: event.detailsUrl }
      : { "@type": "Place", name: event.location },
    organizer: {
      "@type": "MedicalOrganization",
      name: "ASLM",
      url: SITE_URL,
    },
    url: event.detailsUrl,
  };
}

function normalizeLegacyBlogUrl(url: string): string {
  const parsed = new URL(url);
  return parsed.origin === SITE_URL
    ? getAbsoluteUrl(normalizeLegacyBlogPath(parsed.pathname))
    : url;
}

export function generatePressReleaseSchema(
  pressRelease: PressRelease,
  fullUrl: string,
): Article {
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: pressRelease.title,
    description: pressRelease.metadata.metaDescription,
    image: getAbsoluteUrl(pressRelease.image.src),
    datePublished: pressRelease.metadata.publishDate,
    dateModified: pressRelease.metadata.modifiedDate ?? pressRelease.metadata.publishDate,
    author: {
      "@type": "Organization",
      name: "ASLM",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "ASLM",
      logo: {
        "@type": "ImageObject",
        url: SITE_LOGO,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": fullUrl,
    },
    keywords: pressRelease.metadata.tags,
    articleSection: "Comunicate de presă",
  };
}

export function generateItemListSchema(
  name: string,
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: item.url,
    })),
  };
}
