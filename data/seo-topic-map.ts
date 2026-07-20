export type RelatedResource = {
  label: string;
  href: string;
};

export type SeoTopicMapEntry = {
  keyword: string;
  canonicalPath: string;
  categorySlug: string;
  preferredAnchor: string;
  supportingPaths: string[];
  resources: RelatedResource[];
};

export const seoTopicMap: Record<string, SeoTopicMapEntry> = {
  alimentatie: {
    keyword: "alimentație sănătoasă",
    canonicalPath: "/ghid/alimentatie-sanatoasa",
    categorySlug: "alimentatie",
    preferredAnchor: "ghid ASLM despre alimentație sănătoasă",
    supportingPaths: [
      "/news/articole/alimentatie/alimentatia-echilibrata-cheia-unei-vieti-active",
      "/news/articole/alimentatie/deficientele-nutritionale-si-riscul-de-depresie",
      "/news/articole/alimentatie/rolul-alimentatiei-in-prevenirea-bolilor",
    ],
    resources: [
      { label: "Ghid alimentație sănătoasă", href: "/ghid/alimentatie-sanatoasa" },
      { label: "Hub alimentație", href: "/news/articole/alimentatie" },
      { label: "Medicina stilului de viață", href: "/medicina-stilului-de-viata" },
    ],
  },
  "activitate-fizica": {
    keyword: "activitate fizică",
    canonicalPath: "/ghid/activitate-fizica",
    categorySlug: "activitate-fizica",
    preferredAnchor: "ghid ASLM despre activitate fizică",
    supportingPaths: [
      "/news/articole/activitate-fizica/cum-activitatile-in-aer-liber-reduc-stresul",
      "/news/articole/activitate-fizica/tehnici-de-automotivare-pentru-antrenamente",
      "/news/articole/activitate-fizica/beneficiile-inotului-pentru-sanatatea-pulmonara",
    ],
    resources: [
      { label: "Ghid activitate fizică", href: "/ghid/activitate-fizica" },
      { label: "Hub activitate fizică", href: "/news/articole/activitate-fizica" },
      { label: "Medicina stilului de viață", href: "/medicina-stilului-de-viata" },
    ],
  },
  "calitate-somn": {
    keyword: "sănătatea somnului",
    canonicalPath: "/ghid/sanatatea-somnului",
    categorySlug: "calitate-somn",
    preferredAnchor: "ghid ASLM despre sănătatea somnului",
    supportingPaths: [
      "/news/articole/calitate-somn/cum-impacteaza-somnul-sanatatea-fizica-si-mentala",
      "/news/articole/calitate-somn/ritmul-circadian-de-ce-conteaza-ora-de-culcare",
      "/news/articole/calitate-somn/somnul-fragmentat-si-inflamatia-sistemica",
    ],
    resources: [
      { label: "Ghid sănătatea somnului", href: "/ghid/sanatatea-somnului" },
      { label: "Hub calitate somn", href: "/news/articole/calitate-somn" },
      { label: "Medicina stilului de viață", href: "/medicina-stilului-de-viata" },
    ],
  },
  "gestionare-stres": {
    keyword: "gestionare stres",
    canonicalPath: "/ghid/gestionare-stres",
    categorySlug: "gestionare-stres",
    preferredAnchor: "ghid ASLM despre gestionare stres",
    supportingPaths: [
      "/news/articole/gestionare-stres/stresul-cronic-si-riscul-cardiovascular",
      "/news/articole/gestionare-stres/managementul-stresului-la-locul-de-munca",
      "/news/articole/gestionare-stres/constientizarea-emotiilor-si-gandirea-pozitiva",
    ],
    resources: [
      { label: "Ghid gestionare stres", href: "/ghid/gestionare-stres" },
      { label: "Hub gestionare stres", href: "/news/articole/gestionare-stres" },
      { label: "Medicina stilului de viață", href: "/medicina-stilului-de-viata" },
    ],
  },
  "evitare-substante": {
    keyword: "renunțare fumat alcool",
    canonicalPath: "/ghid/renuntare-fumat-alcool",
    categorySlug: "evitare-substante",
    preferredAnchor: "ghid ASLM despre renunțare fumat alcool",
    supportingPaths: [
      "/news/articole/evitare-substante/fumatul-si-inflamatia-cronica",
      "/news/articole/evitare-substante/tehnici-pentru-renuntarea-la-tutun-si-alcool",
      "/news/articole/evitare-substante/inlocuirea-obiceiurilor-nocive-cu-obiceiuri-sanatoase",
    ],
    resources: [
      { label: "Ghid renunțare fumat alcool", href: "/ghid/renuntare-fumat-alcool" },
      { label: "Hub evitare substanțe", href: "/news/articole/evitare-substante" },
      { label: "Medicina stilului de viață", href: "/medicina-stilului-de-viata" },
    ],
  },
  "relatii-sociale": {
    keyword: "relații sociale sănătate",
    canonicalPath: "/ghid/relatii-sociale-sanatate",
    categorySlug: "relatii-sociale",
    preferredAnchor: "ghid ASLM despre relații sociale și sănătate",
    supportingPaths: [
      "/news/articole/relatii-sociale/importanta-relatiilor-sociale-la-varstnici",
      "/news/articole/relatii-sociale/combaterea-izolarii-sociale-beneficiile-activitatilor-de-grup",
      "/news/articole/relatii-sociale/conexiunile-sociale-si-sanatatea-mentala",
    ],
    resources: [
      { label: "Ghid relații sociale sănătate", href: "/ghid/relatii-sociale-sanatate" },
      { label: "Hub relații sociale", href: "/news/articole/relatii-sociale" },
      { label: "Medicina stilului de viață", href: "/medicina-stilului-de-viata" },
    ],
  },
};

export function getTopicByCategory(categorySlug: string): SeoTopicMapEntry {
  const entry = seoTopicMap[categorySlug];
  if (!entry) {
    throw new Error(`Missing SEO topic map entry for ${categorySlug}`);
  }

  return entry;
}
