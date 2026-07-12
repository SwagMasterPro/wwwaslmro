import { MetadataRoute } from "next";
import { articles, getAllCategories, getArticlesByCategory } from "@/data/blog-articles";
import { experts } from "@/data/experts";
import { seoGrowthPages } from "@/data/seo-growth-pages";
import { SITE_URL } from "@/lib/site-config";

type SitemapEntry = MetadataRoute.Sitemap[number];
type RouteConfig = {
  path: string;
  lastModified?: string;
  changeFrequency: SitemapEntry["changeFrequency"];
  priority: number;
};

const SITE_LAST_MODIFIED = "2026-06-19";

const staticRoutes: RouteConfig[] = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/despre", changeFrequency: "monthly", priority: 0.9 },
  { path: "/misiune", changeFrequency: "monthly", priority: 0.8 },
  { path: "/consiliu-stiintific", changeFrequency: "monthly", priority: 0.8 },
  { path: "/consiliu-executiv", changeFrequency: "monthly", priority: 0.8 },
  { path: "/membri", changeFrequency: "monthly", priority: 0.9 },
  { path: "/adunarea-generala", changeFrequency: "monthly", priority: 0.65 },
  { path: "/en", changeFrequency: "monthly", priority: 0.75 },
  { path: "/en/scientific-council", changeFrequency: "monthly", priority: 0.65 },
  { path: "/en/executive-council", changeFrequency: "monthly", priority: 0.65 },
  { path: "/en/membership", changeFrequency: "monthly", priority: 0.75 },
  { path: "/en/general-assembly", changeFrequency: "monthly", priority: 0.55 },
  { path: "/revizie-medicala", changeFrequency: "monthly", priority: 0.7 },
  { path: "/internship", changeFrequency: "monthly", priority: 0.9 },
  { path: "/publicatii", changeFrequency: "weekly", priority: 0.8 },
  { path: "/evenimente", changeFrequency: "weekly", priority: 0.9 },
  { path: "/y-aslm", changeFrequency: "monthly", priority: 0.8 },
  { path: "/conferinte", changeFrequency: "monthly", priority: 0.7 },
  { path: "/comunicari-orale", changeFrequency: "monthly", priority: 0.7 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.8 },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.25 },
  { path: "/terms", changeFrequency: "yearly", priority: 0.25 },
];

const growthPagePriority: Record<string, number> = {
  "/medicina-stilului-de-viata": 0.95,
  "/evenimente/credite-emc": 0.75,
  "/lifestyle-medicine-romania": 0.75,
  "/ghid/gestionare-stres": 0.8,
  "/ghid/sanatatea-somnului": 0.8,
  "/ghid/alimentatie-sanatoasa": 0.8,
  "/ghid/activitate-fizica": 0.8,
  "/ghid/renuntare-fumat-alcool": 0.8,
  "/ghid/relatii-sociale-sanatate": 0.8,
  "/medicina-stilului-de-viata-vs-medicina-preventiva": 0.75,
};

function toAbsoluteUrl(path: string): string {
  return path === "/" ? SITE_URL : `${SITE_URL}${path}`;
}

function latestArticleDate(categorySlug?: string): string {
  const source = categorySlug ? getArticlesByCategory(categorySlug) : articles;

  return source.reduce((latest, article) => {
    return article.metadata.publishDate > latest ? article.metadata.publishDate : latest;
  }, SITE_LAST_MODIFIED);
}

function dedupeRoutes(routes: RouteConfig[]): RouteConfig[] {
  const seen = new Set<string>();

  return routes.filter((route) => {
    if (seen.has(route.path)) {
      return false;
    }

    seen.add(route.path);
    return true;
  });
}

export default function sitemap(): MetadataRoute.Sitemap {
  const growthRoutes = Object.keys(seoGrowthPages).map((path) => ({
    path,
    lastModified: SITE_LAST_MODIFIED,
    changeFrequency: "monthly" as const,
    priority: growthPagePriority[path] ?? 0.7,
  }));

  const blogRoutes: RouteConfig[] = [
    {
      path: "/blog",
      lastModified: latestArticleDate(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...getAllCategories().map((category) => ({
      path: `/blog/${category.slug}`,
      lastModified: latestArticleDate(category.slug),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...articles.map((article) => ({
      path: `/blog/${article.categorySlug}/${article.slug}`,
      lastModified: article.metadata.publishDate,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];

  const expertRoutes = experts.map((expert) => ({
    path: expert.profilePath,
    lastModified: SITE_LAST_MODIFIED,
    changeFrequency: "monthly" as const,
    priority: 0.55,
  }));

  return dedupeRoutes([
    ...staticRoutes,
    ...growthRoutes,
    ...expertRoutes,
    ...blogRoutes,
  ]).map((route) => ({
    url: toAbsoluteUrl(route.path),
    lastModified: route.lastModified ?? SITE_LAST_MODIFIED,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
