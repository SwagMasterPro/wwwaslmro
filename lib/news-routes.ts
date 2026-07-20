export const NEWS_PATH = "/news";
export const NEWS_ARTICLES_PATH = "/news/articole";
export const PRESS_RELEASES_PATH = "/news/comunicate-de-presa";

export function getNewsCategoryPath(categorySlug: string): string {
  return `${NEWS_ARTICLES_PATH}/${categorySlug}`;
}

export function getNewsArticlePath(categorySlug: string, articleSlug: string): string {
  return `${getNewsCategoryPath(categorySlug)}/${articleSlug}`;
}

export function getPressReleasePath(slug: string): string {
  return `${PRESS_RELEASES_PATH}/${slug}`;
}

export function normalizeLegacyBlogPath(path: string): string {
  if (path === "/blog") return NEWS_ARTICLES_PATH;
  return path.startsWith("/blog/")
    ? `${NEWS_ARTICLES_PATH}${path.slice("/blog".length)}`
    : path;
}
