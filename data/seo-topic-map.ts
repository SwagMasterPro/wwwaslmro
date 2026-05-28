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
      "/blog/alimentatie/alimentatia-echilibrata-cheia-unei-vieti-active",
      "/blog/alimentatie/deficientele-nutritionale-si-riscul-de-depresie",
      "/blog/alimentatie/rolul-alimentatiei-in-prevenirea-bolilor",
    ],
    resources: [
      { label: "Ghid alimentație sănătoasă", href: "/ghid/alimentatie-sanatoasa" },
      { label: "Hub alimentație", href: "/blog/alimentatie" },
      { label: "Medicina stilului de viață", href: "/medicina-stilului-de-viata" },
    ],
  },
  "activitate-fizica": {
    keyword: "activitate fizică",
    canonicalPath: "/ghid/activitate-fizica",
    categorySlug: "activitate-fizica",
    preferredAnchor: "ghid ASLM despre activitate fizică",
    supportingPaths: [
      "/blog/activitate-fizica/cum-activitatile-in-aer-liber-reduc-stresul",
      "/blog/activitate-fizica/tehnici-de-automotivare-pentru-antrenamente",
      "/blog/activitate-fizica/beneficiile-inotului-pentru-sanatatea-pulmonara",
    ],
    resources: [
      { label: "Ghid activitate fizică", href: "/ghid/activitate-fizica" },
      { label: "Hub activitate fizică", href: "/blog/activitate-fizica" },
      { label: "Medicina stilului de viață", href: "/medicina-stilului-de-viata" },
    ],
  },
  "calitate-somn": {
    keyword: "sănătatea somnului",
    canonicalPath: "/ghid/sanatatea-somnului",
    categorySlug: "calitate-somn",
    preferredAnchor: "ghid ASLM despre sănătatea somnului",
    supportingPaths: [
      "/blog/calitate-somn/cum-impacteaza-somnul-sanatatea-fizica-si-mentala",
      "/blog/calitate-somn/ritmul-circadian-de-ce-conteaza-ora-de-culcare",
      "/blog/calitate-somn/somnul-fragmentat-si-inflamatia-sistemica",
    ],
    resources: [
      { label: "Ghid sănătatea somnului", href: "/ghid/sanatatea-somnului" },
      { label: "Hub calitate somn", href: "/blog/calitate-somn" },
      { label: "Medicina stilului de viață", href: "/medicina-stilului-de-viata" },
    ],
  },
  "gestionare-stres": {
    keyword: "gestionare stres",
    canonicalPath: "/ghid/gestionare-stres",
    categorySlug: "gestionare-stres",
    preferredAnchor: "ghid ASLM despre gestionare stres",
    supportingPaths: [
      "/blog/gestionare-stres/stresul-cronic-si-riscul-cardiovascular",
      "/blog/gestionare-stres/managementul-stresului-la-locul-de-munca",
      "/blog/gestionare-stres/constientizarea-emotiilor-si-gandirea-pozitiva",
    ],
    resources: [
      { label: "Ghid gestionare stres", href: "/ghid/gestionare-stres" },
      { label: "Hub gestionare stres", href: "/blog/gestionare-stres" },
      { label: "Medicina stilului de viață", href: "/medicina-stilului-de-viata" },
    ],
  },
  "evitare-substante": {
    keyword: "renunțare fumat alcool",
    canonicalPath: "/ghid/renuntare-fumat-alcool",
    categorySlug: "evitare-substante",
    preferredAnchor: "ghid ASLM despre renunțare fumat alcool",
    supportingPaths: [
      "/blog/evitare-substante/fumatul-si-inflamatia-cronica",
      "/blog/evitare-substante/tehnici-pentru-renuntarea-la-tutun-si-alcool",
      "/blog/evitare-substante/inlocuirea-obiceiurilor-nocive-cu-obiceiuri-sanatoase",
    ],
    resources: [
      { label: "Ghid renunțare fumat alcool", href: "/ghid/renuntare-fumat-alcool" },
      { label: "Hub evitare substanțe", href: "/blog/evitare-substante" },
      { label: "Medicina stilului de viață", href: "/medicina-stilului-de-viata" },
    ],
  },
  "relatii-sociale": {
    keyword: "relații sociale sănătate",
    canonicalPath: "/ghid/relatii-sociale-sanatate",
    categorySlug: "relatii-sociale",
    preferredAnchor: "ghid ASLM despre relații sociale și sănătate",
    supportingPaths: [
      "/blog/relatii-sociale/importanta-relatiilor-sociale-la-varstnici",
      "/blog/relatii-sociale/combaterea-izolarii-sociale-beneficiile-activitatilor-de-grup",
      "/blog/relatii-sociale/conexiunile-sociale-si-sanatatea-mentala",
    ],
    resources: [
      { label: "Ghid relații sociale sănătate", href: "/ghid/relatii-sociale-sanatate" },
      { label: "Hub relații sociale", href: "/blog/relatii-sociale" },
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
