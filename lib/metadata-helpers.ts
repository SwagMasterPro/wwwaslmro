/**
 * Metadata Helpers for AI Search Optimization
 * Generates consistent metadata objects for pages, articles, and categories
 */

import { Metadata } from "next";
import {
  BlogArticle,
  BlogCategory,
  getArticleBySlug,
  getCategoryBySlug,
} from "@/data/blog-articles";
import {
  DEFAULT_SITE_IMAGE,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
  getSiteUrl,
} from "@/lib/site-config";

type StaticPageMetadata = {
  title: string;
  description: string;
  keywords?: string[];
  imageUrl?: string;
};

const staticPages: Record<string, StaticPageMetadata> = {
  "/blog": {
    title: "Blog Medicina Stilului de Viață",
    description:
      "Articole ASLM bazate pe dovezi despre alimentație, activitate fizică, somn, stres, relații sociale și evitarea substanțelor nocive.",
    keywords: ["blog medical", "articole sănătate", "prevenție", "stil de viață sănătos"],
  },
  "/despre": {
    title: "Despre ASLM",
    description:
      "Descoperă Societatea Academică de Medicina Stilului de Viață, misiunea ASLM și cei șase piloni ai medicinei stilului de viață în România.",
    keywords: ["despre ASLM", "medicina stilului de viață", "asociație medicală"],
  },
  "/misiune": {
    title: "Misiune și Viziune",
    description:
      "Misiunea și viziunea ASLM pentru integrarea medicinei stilului de viață în prevenția și tratamentul bolilor cronice în România.",
    keywords: ["misiune ASLM", "viziune ASLM", "prevenție boli cronice"],
  },
  "/echipa": {
    title: "Consiliul Științific",
    description:
      "Cunoaște membrii Consiliului Științific ASLM și experții care susțin dezvoltarea medicinei stilului de viață în România.",
    keywords: ["consiliul științific ASLM", "experți medicina stilului de viață"],
  },
  "/consiliul-director": {
    title: "Consiliul Director",
    description:
      "Află cine coordonează activitatea ASLM și inițiativele societății pentru educație, cercetare și colaborare medicală.",
    keywords: ["consiliul director ASLM", "conducere ASLM"],
  },
  "/membri": {
    title: "Devino Membru",
    description:
      "Alătură-te ASLM ca membru afiliat, asociat, titular sau organizație și accesează beneficii profesionale în medicina stilului de viață.",
    keywords: ["membri ASLM", "înscriere ASLM", "beneficii membri", "educație medicală continuă"],
  },
  "/medicina-stilului-de-viata": {
    title: "Medicina stilului de viață",
    description:
      "Definiție, piloni și aplicare în România pentru medicina stilului de viață: alimentație, activitate fizică, somn, stres, relații sociale și evitarea substanțelor nocive.",
    keywords: ["medicina stilului de viață", "medicina stilului de viata", "lifestyle medicine", "prevenție boli cronice"],
  },
  "/internship": {
    title: "Program Internship",
    description:
      "Programul de internship ASLM pentru studenți interesați de promovarea medicinei stilului de viață în comunitatea academică.",
    keywords: ["internship ASLM", "student leader", "studenți medicină"],
  },
  "/publicatii": {
    title: "Publicații",
    description:
      "Publicațiile și resursele ASLM, inclusiv Lifestyle Medicine Romania Review și materiale educaționale pentru profesioniști.",
    keywords: ["publicații ASLM", "LMRR", "revistă medicina stilului de viață"],
  },
  "/evenimente": {
    title: "Evenimente",
    description:
      "Evenimente ASLM, conferințe, workshop-uri și retrospectiva Congresului Inaugural ASLM 2026 dedicat medicinei stilului de viață.",
    keywords: ["evenimente ASLM", "congres ASLM", "conferințe medicale", "credite EMC"],
    imageUrl: "/images/banner-congres-2026.png",
  },
  "/evenimente/credite-emc": {
    title: "Credite EMC",
    description:
      "Informații despre credite EMC, puncte EMC medici și participarea la evenimente ASLM acreditate sau în curs de acreditare.",
    keywords: ["credite EMC", "puncte EMC medici", "evenimente medicale", "educație medicală continuă"],
  },
  "/lifestyle-medicine-romania": {
    title: "Lifestyle Medicine Romania",
    description:
      "English overview of ASLM, the Academic Society of Lifestyle Medicine in Romania, and its work in education, research and professional collaboration.",
    keywords: ["lifestyle medicine Romania", "Academic Society of Lifestyle Medicine", "Romanian Society of Lifestyle Medicine"],
  },
  "/ghid/gestionare-stres": {
    title: "Gestionare Stres",
    description:
      "Ghid ASLM despre gestionare stres, tehnici practice și rolul stresului în medicina stilului de viață și prevenția bolilor cronice.",
    keywords: ["gestionare stres", "tehnici gestionare stres", "stres cronic", "sănătate mentală"],
  },
  "/ghid/sanatatea-somnului": {
    title: "Sănătatea Somnului",
    description:
      "Ghid ASLM despre sănătatea somnului, somn de calitate, ritm circadian și prevenția bolilor cronice prin odihnă adecvată.",
    keywords: ["sănătatea somnului", "sanatatea somnului", "somn de calitate", "somnul și sănătatea"],
  },
  "/ghid/alimentatie-sanatoasa": {
    title: "Alimentație Sănătoasă",
    description:
      "Ghid ASLM despre alimentație sănătoasă, alimente integrale, prevenție nutrițională și rolul nutriției în medicina stilului de viață.",
    keywords: ["alimentație sănătoasă", "alimentatie sanatoasa", "nutriție preventivă", "alimente integrale"],
  },
  "/ghid/activitate-fizica": {
    title: "Activitate Fizică",
    description:
      "Ghid ASLM despre activitate fizică, mișcare regulată, aderență și prevenția bolilor cronice.",
    keywords: ["activitate fizică", "activitate fizica", "mișcare regulată", "prevenție"],
  },
  "/ghid/renuntare-fumat-alcool": {
    title: "Renunțare Fumat Alcool",
    description:
      "Ghid ASLM despre renunțare fumat alcool, evitarea substanțelor nocive, reducerea riscului și suport medical.",
    keywords: ["renunțare fumat alcool", "renuntare fumat alcool", "substanțe nocive", "tutun alcool"],
  },
  "/ghid/relatii-sociale-sanatate": {
    title: "Relații Sociale Sănătate",
    description:
      "Ghid ASLM despre relații sociale sănătate, sprijin social, izolare și rolul conexiunilor în medicina stilului de viață.",
    keywords: ["relații sociale sănătate", "relatii sociale sanatate", "sprijin social", "izolare socială"],
  },
  "/medicina-stilului-de-viata-vs-medicina-preventiva": {
    title: "Medicina Stilului de Viață vs Medicina Preventivă",
    description:
      "Comparație ASLM între medicina stilului de viață și medicina preventivă: diferențe, suprapuneri și aplicare în România.",
    keywords: ["medicina stilului de viață vs medicina preventivă", "medicina preventivă", "lifestyle medicine"],
  },
  "/revizie-medicala": {
    title: "Revizie Medicală și Proces Editorial",
    description:
      "Procesul editorial ASLM, standardul de citare, revizia medicală și limitele conținutului educațional publicat pe site.",
    keywords: ["revizie medicală ASLM", "proces editorial", "E-E-A-T medical", "Consiliul Științific ASLM"],
  },
  "/conferinte": {
    title: "Conferințe",
    description:
      "Conferințele ASLM pentru profesioniștii din sănătate interesați de medicina stilului de viață, prevenție și educație medicală.",
    keywords: ["conferințe ASLM", "conferințe medicale", "medicina stilului de viață"],
  },
  "/comunicari-orale": {
    title: "Comunicări Orale",
    description:
      "Informații pentru comunicări orale ASLM, prezentări științifice și contribuții academice în medicina stilului de viață.",
    keywords: ["comunicări orale", "ASLM", "prezentări științifice"],
  },
  "/contact": {
    title: "Contact",
    description:
      "Contactează Societatea Academică de Medicina Stilului de Viață pentru întrebări, colaborări, înscrieri sau informații despre ASLM.",
    keywords: ["contact ASLM", "Societatea Academică de Medicina Stilului de Viață", "Brașov"],
  },
  "/privacy": {
    title: "Politica de Confidențialitate",
    description:
      "Politica de confidențialitate și protecția datelor personale pentru site-ul Societății Academice de Medicina Stilului de Viață.",
    keywords: ["politica de confidențialitate", "GDPR", "ASLM"],
  },
  "/terms": {
    title: "Termeni și Condiții",
    description:
      "Termenii și condițiile de utilizare pentru site-ul Societății Academice de Medicina Stilului de Viață.",
    keywords: ["termeni și condiții", "ASLM"],
  },
  "/y-aslm": {
    title: "Y-ASLM",
    description:
      "Departamentul Studențesc ASLM pentru studenți interesați de prevenție, sănătate și medicina stilului de viață.",
    keywords: ["Y-ASLM", "departament studențesc", "studenți", "prevenție"],
  },
};

/**
 * Get absolute URL
 */
export function getAbsoluteUrl(path: string = ""): string {
  return getSiteUrl(path);
}

/**
 * Generate metadata for homepage
 */
export function generateHomeMetadata(): Metadata {
  const title = SITE_TITLE;
  const description =
    "Societatea Academică de Medicina Stilului de Viață (ASLM) promovează excelența în medicina stilului de viață prin educație, cercetare și colaborare profesională în România. Descoperă cei șase piloni ai medicinei stilului de viață.";

  return {
    metadataBase: new URL(SITE_URL),
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
      url: SITE_URL,
      siteName: SITE_NAME,
      locale: "ro_RO",
      type: "website",
      images: [
        {
          url: DEFAULT_SITE_IMAGE,
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
      images: [DEFAULT_SITE_IMAGE],
    },
    alternates: {
      canonical: SITE_URL,
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
  const image = imageUrl ? getAbsoluteUrl(imageUrl) : DEFAULT_SITE_IMAGE;

  return {
    metadataBase: new URL(SITE_URL),
    title: fullTitle,
    description,
    keywords: [...keywords, "ASLM", "medicina stilului de viață", "România"],
    authors: [{ name: "ASLM" }],
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
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
    metadataBase: new URL(SITE_URL),
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
      siteName: SITE_NAME,
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
    metadataBase: new URL(SITE_URL),
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
      siteName: SITE_NAME,
      locale: "ro_RO",
      type: "website",
      images: [
        {
          url: DEFAULT_SITE_IMAGE,
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
      images: [DEFAULT_SITE_IMAGE],
    },
    alternates: {
      canonical: url,
    },
  };
}

export function generateStaticPageMetadata(path: string): Metadata {
  const page = staticPages[path];
  if (!page) {
    throw new Error(`Missing static metadata for ${path}`);
  }

  return generatePageMetadata(
    page.title,
    page.description,
    path,
    page.keywords ?? [],
    page.imageUrl,
  );
}

export function generateArticleMetadataBySlug(slug: string): Metadata {
  const article = getArticleBySlug(slug);
  if (!article) {
    throw new Error(`Missing article metadata for ${slug}`);
  }

  const category = getCategoryBySlug(article.categorySlug);
  if (!category) {
    throw new Error(`Missing category metadata for ${article.categorySlug}`);
  }

  return generateArticleMetadata(
    article,
    category,
    `/blog/${article.categorySlug}/${article.slug}`,
  );
}

export function generateCategoryMetadataBySlug(categorySlug: string): Metadata {
  const category = getCategoryBySlug(categorySlug);
  if (!category) {
    throw new Error(`Missing category metadata for ${categorySlug}`);
  }

  return generateCategoryMetadata(category, `/blog/${category.slug}`);
}
