export const SITE_URL = "https://www.aslm.ro";
export const SITE_NAME = "ASLM - Societatea Academică de Medicina Stilului de Viață";
export const SITE_TITLE = "ASLM | Societatea Academică de Medicina Stilului de Viață";
export const DEFAULT_SITE_IMAGE = `${SITE_URL}/images/aslm-logo.png`;

export function getSiteUrl(path: string = ""): string {
  if (!path || path === "/") {
    return SITE_URL;
  }

  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
