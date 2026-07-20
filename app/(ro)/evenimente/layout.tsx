import type { ReactNode } from "react";
import JsonLdScript from "@/components/seo/JsonLdScript";
import { upcomingConfirmedEvents } from "@/data/events";
import { generateStaticPageMetadata } from "@/lib/metadata-helpers";
import { generateEventSchema, generateWebPageSchema } from "@/lib/structured-data";

export const metadata = generateStaticPageMetadata("/evenimente");

export default function EvenimenteLayout({ children }: { children: ReactNode }) {
  const eventSchemas = upcomingConfirmedEvents
    .map(generateEventSchema)
    .filter((schema) => schema !== null);

  return (
    <>
      <JsonLdScript
        id="events-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            generateWebPageSchema(
              "https://www.aslm.ro/evenimente",
              "Evenimente ASLM: calendar, arhivă și credite EMC",
              "Calendarul și arhiva evenimentelor Societății Academice de Medicina Stilului de Viață, cu informații despre congrese, workshop-uri și credite EMC.",
              [{ name: "Acasă", path: "/" }, { name: "Evenimente", path: "/evenimente" }],
            ),
            ...eventSchemas,
          ]),
        }}
      />
      {children}
    </>
  );
}
