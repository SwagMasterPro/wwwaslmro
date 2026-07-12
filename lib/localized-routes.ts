export type Locale = "ro" | "en";

export const MEMBERSHIP_JOIN_URL = "https://membership.aslm.ro/";
export const STATUTE_RO_URL = "https://view.publitas.com/amph/statutul-aslm_extrase_ro/";
export const STATUTE_EN_URL = "https://view.publitas.com/amph/aslm_statute_extracts_en/";

export const localizedRoutePairs = [
  { ro: "/", en: "/en" },
  { ro: "/consiliu-stiintific", en: "/en/scientific-council" },
  { ro: "/consiliu-executiv", en: "/en/executive-council" },
  { ro: "/membri", en: "/en/membership" },
  { ro: "/adunarea-generala", en: "/en/general-assembly" },
];

const legacyRouteMap: Record<string, string> = {
  "/echipa": "/consiliu-stiintific",
  "/consiliul-director": "/consiliu-executiv",
};

export function isEnglishPath(pathname: string): boolean {
  return pathname === "/en" || pathname.startsWith("/en/");
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
