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
import type { PressRelease } from "@/data/press-releases";
import {
  getNewsArticlePath,
  getNewsCategoryPath,
  getPressReleasePath,
} from "@/lib/news-routes";
import {
  DEFAULT_SITE_IMAGE,
  DEFAULT_SITE_IMAGE_HEIGHT,
  DEFAULT_SITE_IMAGE_WIDTH,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
  getSiteUrl,
} from "@/lib/site-config";
import { getRouteLocale, localizedRoutePairs } from "@/lib/localized-routes";

export type SocialImage = {
  url: string;
  width?: number;
  height?: number;
  alt?: string;
};

type StaticPageMetadata = {
  title: string;
  description: string;
  keywords?: string[];
  image?: SocialImage;
};

const staticPages: Record<string, StaticPageMetadata> = {
  "/news": {
    title: "News ASLM",
    description:
      "Noutăți ASLM: articole educaționale, proiecte, activități și comunicate de presă despre medicina stilului de viață.",
    keywords: ["News ASLM", "noutăți ASLM", "medicina stilului de viață", "comunicate de presă"],
  },
  "/news/articole": {
    title: "Articole despre Medicina Stilului de Viață",
    description:
      "Articole ASLM bazate pe dovezi despre alimentație, activitate fizică, somn, stres, relații sociale și evitarea substanțelor nocive.",
    keywords: ["articole medicale", "articole sănătate", "prevenție", "stil de viață sănătos"],
  },
  "/news/comunicate-de-presa": {
    title: "Comunicate de presă ASLM",
    description:
      "Comunicatele de presă ale Societății Academice de Medicina Stilului de Viață despre proiecte, activități și publicații ASLM.",
    keywords: ["comunicate de presă ASLM", "proiecte ASLM", "activități ASLM"],
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
  "/consiliu-stiintific": {
    title: "Consiliu Științific",
    description:
      "Cunoaște membrii Consiliului Științific ASLM și experții care susțin dezvoltarea medicinei stilului de viață în România.",
    keywords: ["consiliu științific ASLM", "experți medicina stilului de viață"],
  },
  "/consiliu-executiv": {
    title: "Consiliu Executiv",
    description:
      "Află cine coordonează activitatea ASLM și inițiativele societății pentru educație, cercetare și colaborare medicală.",
    keywords: ["consiliu executiv ASLM", "conducere ASLM"],
  },
  "/adunarea-generala": {
    title: "Adunarea Generală",
    description:
      "Lista actualizată a membrilor Adunării Generale ASLM, cu nume și localitate, afișată alfabetic.",
    keywords: ["Adunarea Generală ASLM", "membri ASLM", "lista membri ASLM"],
  },
  "/membri": {
    title: "Membri ASLM: înscriere, beneficii și categorii",
    description:
      "Înscrie-te în ASLM ca membru afiliat, asociat, titular sau organizație. Compară beneficiile, cotizațiile și pașii de aderare în medicina stilului de viață.",
    keywords: ["membri ASLM", "înscriere ASLM", "devino membru ASLM", "beneficii membri", "medicina stilului de viață"],
  },
  "/en": {
    title: "ASLM in English",
    description:
      "English entry point for ASLM membership, governance and lifestyle medicine information.",
    keywords: ["ASLM English", "lifestyle medicine Romania", "Academic Society of Lifestyle Medicine"],
  },
  "/en/scientific-council": {
    title: "Scientific Council",
    description:
      "Meet the ASLM Scientific Council and the experts supporting lifestyle medicine in Romania.",
    keywords: ["ASLM Scientific Council", "lifestyle medicine experts Romania"],
  },
  "/en/executive-council": {
    title: "Executive Council",
    description:
      "Meet the ASLM Executive Council coordinating the society's operational and strategic projects.",
    keywords: ["ASLM Executive Council", "ASLM leadership"],
  },
  "/en/membership": {
    title: "Membership",
    description:
      "Explore ASLM membership categories, benefits and the joining process for healthcare professionals, students, organizations and supporters.",
    keywords: ["ASLM membership", "join ASLM", "lifestyle medicine Romania"],
  },
  "/en/general-assembly": {
    title: "General Assembly",
    description:
      "Updated ASLM General Assembly member list, with names and locations shown alphabetically.",
    keywords: ["ASLM General Assembly", "ASLM members"],
  },
  "/medicina-stilului-de-viata": {
    title: "Medicina Stilului de Viață: Ghid ASLM",
    description:
      "Descoperă ce este medicina stilului de viață, cei șase piloni și rolul lor în prevenirea și managementul bolilor cronice în România.",
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
    title: "Evenimente ASLM: calendar, arhivă și credite EMC",
    description:
      "Calendarul și arhiva evenimentelor ASLM: congrese, conferințe, workshop-uri, Proceedings 2026 și informații despre credite EMC.",
    keywords: ["evenimente ASLM", "congres ASLM", "conferințe medicale", "credite EMC", "puncte EMC medici"],
    image: {
      url: "/images/banner-congres-2026.png",
      width: 1500,
      height: 1000,
      alt: "Congresul Inaugural ASLM 2026",
    },
  },
  "/evenimente/credite-emc": {
    title: "Credite EMC pentru medici",
    description:
      "Cum verifici creditele EMC și punctele EMC pentru medici la evenimente ASLM: statut, eligibilitate, documente și comunicări oficiale.",
    keywords: ["credite EMC", "credite EMC medici", "puncte EMC medici", "evenimente medicale", "educație medicală continuă"],
  },
  "/lifestyle-medicine-romania": {
    title: "Lifestyle Medicine Romania",
    description:
      "English overview of ASLM, the Academic Society of Lifestyle Medicine in Romania, and its work in education, research and professional collaboration.",
    keywords: ["lifestyle medicine Romania", "Academic Society of Lifestyle Medicine", "Romanian Society of Lifestyle Medicine"],
  },
  "/ghid/gestionare-stres": {
    title: "Gestionarea stresului: tehnici practice",
    description:
      "Ghid ASLM despre gestionarea stresului, tehnici practice și rolul stresului în medicina stilului de viață și prevenția bolilor cronice.",
    keywords: ["gestionarea stresului", "tehnici de gestionare a stresului", "stres cronic", "sănătate mentală"],
  },
  "/ghid/sanatatea-somnului": {
    title: "Sănătatea somnului și igiena somnului",
    description:
      "Ghid ASLM despre sănătatea somnului și igiena somnului, somn de calitate, ritm circadian și prevenția bolilor cronice prin odihnă adecvată.",
    keywords: ["sănătatea somnului", "igiena somnului", "somn de calitate", "somnul și sănătatea"],
  },
  "/ghid/alimentatie-sanatoasa": {
    title: "Ghid de Alimentație Sănătoasă",
    description:
      "Ghid ASLM despre alimentație sănătoasă, alimente integrale, prevenție nutrițională și rolul nutriției în medicina stilului de viață.",
    keywords: ["alimentație sănătoasă", "alimentatie sanatoasa", "nutriție preventivă", "alimente integrale"],
  },
  "/ghid/activitate-fizica": {
    title: "Ghid de Activitate Fizică",
    description:
      "Ghid ASLM despre activitate fizică, mișcare regulată, aderență și prevenția bolilor cronice.",
    keywords: ["activitate fizică", "activitate fizica", "mișcare regulată", "prevenție"],
  },
  "/ghid/renuntare-fumat-alcool": {
    title: "Ghid pentru Renunțarea la Fumat și Alcool",
    description:
      "Ghid ASLM despre renunțare fumat alcool, evitarea substanțelor nocive, reducerea riscului și suport medical.",
    keywords: ["renunțare fumat alcool", "renuntare fumat alcool", "substanțe nocive", "tutun alcool"],
  },
  "/ghid/relatii-sociale-sanatate": {
    title: "Relații Sociale și Sănătate: Ghid ASLM",
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
    title: "Conferințe ASLM 2026: Arhivă",
    description:
      "Arhiva conferințelor ASLM 2026 despre medicina stilului de viață, cu formatul prezentărilor, temele abordate și calendarul ediției încheiate.",
    keywords: ["conferințe ASLM", "conferințe medicale", "medicina stilului de viață"],
  },
  "/comunicari-orale": {
    title: "Comunicări Orale ASLM 2026: Arhivă",
    description:
      "Arhiva apelului pentru comunicări orale ASLM 2026, cu cerințele de redactare, formatul prezentărilor și calendarul ediției încheiate.",
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
    "ASLM promovează medicina stilului de viață în România prin educație, cercetare și colaborare. Descoperă cei șase piloni pentru prevenirea bolilor cronice.";

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
          width: DEFAULT_SITE_IMAGE_WIDTH,
          height: DEFAULT_SITE_IMAGE_HEIGHT,
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
      languages: {
        ro: SITE_URL,
        en: getAbsoluteUrl("/en"),
        "x-default": SITE_URL,
      },
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
  socialImage?: SocialImage,
): Metadata {
  const fullTitle = `${title} | ASLM`;
  const url = getAbsoluteUrl(path);
  const image = socialImage ? getAbsoluteUrl(socialImage.url) : DEFAULT_SITE_IMAGE;
  const locale = getRouteLocale(path);
  const localizedPair = localizedRoutePairs.find((pair) => pair.ro === path || pair.en === path);
  const languageAlternates = localizedPair
    ? {
        ro: getAbsoluteUrl(localizedPair.ro),
        en: getAbsoluteUrl(localizedPair.en),
        "x-default": getAbsoluteUrl(localizedPair.xDefault),
      }
    : undefined;

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
      locale: locale === "en" ? "en" : "ro_RO",
      type: "website",
      images: [
        {
          url: image,
          width: socialImage ? socialImage.width : DEFAULT_SITE_IMAGE_WIDTH,
          height: socialImage ? socialImage.height : DEFAULT_SITE_IMAGE_HEIGHT,
          alt: socialImage?.alt ?? title,
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
      ...(languageAlternates ? { languages: languageAlternates } : {}),
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
  const fullTitle = `${article.metadata.seoTitle} | ASLM`;
  const url = getAbsoluteUrl(path);
  const image = getAbsoluteUrl(article.image.src);

  return {
    metadataBase: new URL(SITE_URL),
    title: fullTitle,
    description: article.metadata.metaDescription,
    keywords: [
      ...article.metadata.tags,
      category.name,
      "medicina stilului de viață",
      "ASLM",
      "articole medicale",
    ],
    authors: [{ name: "ASLM" }],
    openGraph: {
      title: article.title,
      description: article.metadata.metaDescription,
      url,
      siteName: SITE_NAME,
      locale: "ro_RO",
      type: "article",
      publishedTime: article.metadata.publishDate,
      modifiedTime: article.metadata.modifiedDate,
      authors: ["ASLM"],
      section: category.name,
      tags: article.metadata.tags,
      images: [
        {
          url: image,
          width: 1000,
          height: 1000,
          alt: article.image.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.metadata.metaDescription,
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
  const fullTitle = `${category.name} | Articole ASLM`;
  const url = getAbsoluteUrl(path);

  return {
    metadataBase: new URL(SITE_URL),
    title: fullTitle,
    description: category.description,
    keywords: [
      category.name,
      "medicina stilului de viață",
      "ASLM",
      "News ASLM",
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
          width: DEFAULT_SITE_IMAGE_WIDTH,
          height: DEFAULT_SITE_IMAGE_HEIGHT,
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
    page.image,
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
    getNewsArticlePath(article.categorySlug, article.slug),
  );
}

export function generateCategoryMetadataBySlug(categorySlug: string): Metadata {
  const category = getCategoryBySlug(categorySlug);
  if (!category) {
    throw new Error(`Missing category metadata for ${categorySlug}`);
  }

  return generateCategoryMetadata(category, getNewsCategoryPath(category.slug));
}

export function generatePressReleaseMetadata(pressRelease: PressRelease): Metadata {
  const path = getPressReleasePath(pressRelease.slug);
  const url = getAbsoluteUrl(path);
  const image = getAbsoluteUrl(pressRelease.image.src);
  const title = `${pressRelease.metadata.seoTitle} | ASLM`;

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description: pressRelease.metadata.metaDescription,
    keywords: [...pressRelease.metadata.tags, "Comunicate de presă ASLM", "News ASLM"],
    authors: [{ name: "ASLM" }],
    openGraph: {
      title: pressRelease.title,
      description: pressRelease.metadata.metaDescription,
      url,
      siteName: SITE_NAME,
      locale: "ro_RO",
      type: "article",
      publishedTime: pressRelease.metadata.publishDate,
      modifiedTime: pressRelease.metadata.modifiedDate,
      authors: ["ASLM"],
      section: "Comunicate de presă",
      tags: pressRelease.metadata.tags,
      images: [{
        url: image,
        width: pressRelease.image.width,
        height: pressRelease.image.height,
        alt: pressRelease.image.alt,
      }],
    },
    twitter: {
      card: "summary_large_image",
      title: pressRelease.title,
      description: pressRelease.metadata.metaDescription,
      images: [image],
    },
    alternates: { canonical: url },
  };
}
