import { MetadataRoute } from "next";
import { articles, getAllCategories, getArticlesByCategory } from "@/data/blog-articles";
import { latestPressReleaseDate, pressReleases } from "@/data/press-releases";
import { experts } from "@/data/experts";
import { seoGrowthPages } from "@/data/seo-growth-pages";
import {
  NEWS_ARTICLES_PATH,
  NEWS_PATH,
  PRESS_RELEASES_PATH,
  getNewsArticlePath,
  getNewsCategoryPath,
  getPressReleasePath,
} from "@/lib/news-routes";
import { SITE_URL } from "@/lib/site-config";

type SitemapEntry = MetadataRoute.Sitemap[number];
type RouteConfig = {
  path: string;
  lastModified: string;
  changeFrequency: SitemapEntry["changeFrequency"];
  priority: number;
};

const staticRoutes: RouteConfig[] = [
  { path: "/", lastModified: "2026-07-13", changeFrequency: "weekly", priority: 1 },
  { path: "/despre", lastModified: "2026-07-13", changeFrequency: "monthly", priority: 0.9 },
  { path: "/misiune", lastModified: "2026-06-19", changeFrequency: "monthly", priority: 0.8 },
  { path: "/consiliu-stiintific", lastModified: "2026-07-13", changeFrequency: "monthly", priority: 0.8 },
  { path: "/consiliu-executiv", lastModified: "2026-07-13", changeFrequency: "monthly", priority: 0.8 },
  { path: "/membri", lastModified: "2026-07-13", changeFrequency: "monthly", priority: 0.9 },
  { path: "/adunarea-generala", lastModified: "2026-07-13", changeFrequency: "monthly", priority: 0.65 },
  { path: "/en", lastModified: "2026-07-13", changeFrequency: "monthly", priority: 0.75 },
  { path: "/en/scientific-council", lastModified: "2026-07-13", changeFrequency: "monthly", priority: 0.65 },
  { path: "/en/executive-council", lastModified: "2026-07-13", changeFrequency: "monthly", priority: 0.65 },
  { path: "/en/membership", lastModified: "2026-07-13", changeFrequency: "monthly", priority: 0.75 },
  { path: "/en/general-assembly", lastModified: "2026-07-13", changeFrequency: "monthly", priority: 0.55 },
  { path: "/revizie-medicala", lastModified: "2026-07-13", changeFrequency: "monthly", priority: 0.7 },
  { path: "/internship", lastModified: "2026-06-19", changeFrequency: "monthly", priority: 0.9 },
  { path: "/publicatii", lastModified: "2026-07-13", changeFrequency: "weekly", priority: 0.8 },
  { path: "/evenimente", lastModified: "2026-07-13", changeFrequency: "weekly", priority: 0.9 },
  { path: "/y-aslm", lastModified: "2026-07-13", changeFrequency: "monthly", priority: 0.8 },
  { path: "/conferinte", lastModified: "2026-07-13", changeFrequency: "yearly", priority: 0.55 },
  { path: "/comunicari-orale", lastModified: "2026-07-13", changeFrequency: "yearly", priority: 0.55 },
  { path: "/contact", lastModified: "2026-06-19", changeFrequency: "yearly", priority: 0.8 },
  { path: "/privacy", lastModified: "2026-06-19", changeFrequency: "yearly", priority: 0.25 },
  { path: "/terms", lastModified: "2026-06-19", changeFrequency: "yearly", priority: 0.25 },
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
    const articleDate = article.metadata.modifiedDate ?? article.metadata.publishDate;
    return articleDate > latest ? articleDate : latest;
  }, "1970-01-01");
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
  const growthRoutes = Object.values(seoGrowthPages).map((page) => ({
    path: page.path,
    lastModified: page.modifiedDate,
    changeFrequency: "monthly" as const,
    priority: growthPagePriority[page.path] ?? 0.7,
  }));

  const newsRoutes: RouteConfig[] = [
    {
      path: NEWS_PATH,
      lastModified: [latestArticleDate(), latestPressReleaseDate()].sort().at(-1)!,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      path: NEWS_ARTICLES_PATH,
      lastModified: latestArticleDate(),
      changeFrequency: "weekly",
      priority: 0.85,
    },
    ...getAllCategories().map((category) => ({
      path: getNewsCategoryPath(category.slug),
      lastModified: latestArticleDate(category.slug),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...articles.map((article) => ({
      path: getNewsArticlePath(article.categorySlug, article.slug),
      lastModified: article.metadata.modifiedDate ?? article.metadata.publishDate,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    {
      path: PRESS_RELEASES_PATH,
      lastModified: latestPressReleaseDate(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...pressReleases.map((pressRelease) => ({
      path: getPressReleasePath(pressRelease.slug),
      lastModified: pressRelease.metadata.modifiedDate ?? pressRelease.metadata.publishDate,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
  ];

  const expertRoutes = experts.map((expert) => ({
    path: expert.profilePath,
    lastModified: "2026-07-13",
    changeFrequency: "monthly" as const,
    priority: 0.55,
  }));

  return dedupeRoutes([
    ...staticRoutes,
    ...growthRoutes,
    ...expertRoutes,
    ...newsRoutes,
  ]).map((route) => ({
    url: toAbsoluteUrl(route.path),
    lastModified: route.lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
