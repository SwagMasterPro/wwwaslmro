export type Locale = "ro" | "en";

export const MEMBERSHIP_JOIN_URL = "https://membership.aslm.ro/";
export const STATUTE_RO_URL = "https://view.publitas.com/amph/statutul-aslm_extrase_ro/";
export const STATUTE_EN_URL = "https://view.publitas.com/amph/aslm_statute_extracts_en/";

export type LocalizedRoutePair = {
  ro: string;
  en: string;
  xDefault: string;
};

export const localizedRoutePairs: LocalizedRoutePair[] = [
  { ro: "/", en: "/en", xDefault: "/" },
  { ro: "/consiliu-stiintific", en: "/en/scientific-council", xDefault: "/consiliu-stiintific" },
  { ro: "/consiliu-executiv", en: "/en/executive-council", xDefault: "/consiliu-executiv" },
  { ro: "/membri", en: "/en/membership", xDefault: "/membri" },
  { ro: "/adunarea-generala", en: "/en/general-assembly", xDefault: "/adunarea-generala" },
];

const englishOnlyRoutes = new Set(["/lifestyle-medicine-romania"]);

const legacyRouteMap: Record<string, string> = {
  "/echipa": "/consiliu-stiintific",
  "/consiliul-director": "/consiliu-executiv",
};

export function isEnglishPath(pathname: string): boolean {
  const normalized = pathname.length > 1 ? pathname.replace(/\/$/, "") : pathname;
  return normalized === "/en" || normalized.startsWith("/en/") || englishOnlyRoutes.has(normalized);
}

export function getRouteLocale(pathname: string): Locale {
  return isEnglishPath(pathname) ? "en" : "ro";
}

export function normalizeLocalizedPath(pathname: string): string {
  const normalized = pathname.length > 1 ? pathname.replace(/\/$/, "") : pathname;
  return legacyRouteMap[normalized] ?? normalized;
}

export function getCounterpartPath(pathname: string): string {
  const normalized = normalizeLocalizedPath(pathname);
  const pair = localizedRoutePairs.find(
    (routePair) => routePair.ro === normalized || routePair.en === normalized,
  );

  if (pair) {
    return pair.ro === normalized ? pair.en : pair.ro;
  }

  return isEnglishPath(normalized) ? "/" : "/en";
}

export function getLocalizedPath(roPath: string, locale: Locale): string {
  if (locale === "ro") {
    return roPath;
  }

  return localizedRoutePairs.find((routePair) => routePair.ro === roPath)?.en ?? "/en";
}
