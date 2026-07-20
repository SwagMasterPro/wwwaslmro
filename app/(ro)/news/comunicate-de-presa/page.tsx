import { pressReleases } from "@/data/press-releases";
import PressReleaseCard from "@/components/news/PressReleaseCard";
import JsonLdScript from "@/components/seo/JsonLdScript";
import { generateWebPageSchema } from "@/lib/structured-data";

export default function PressReleasesPage() {
  return (
    <main className="pt-20">
      <section className="mesh-hero section-lg">
        <div className="container-default text-center">
          <h1 className="text-display text-white">Comunicate de presă</h1>
        </div>
      </section>
      <section className="section-lg surface-primary">
        <div className={`container-default grid gap-6 ${pressReleases.length === 1 ? "max-w-2xl" : "md:grid-cols-2"}`}>
          {pressReleases.map((pressRelease) => <PressReleaseCard key={pressRelease.slug} pressRelease={pressRelease} />)}
        </div>
      </section>
      <JsonLdScript
        id="press-releases-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateWebPageSchema(
              "https://www.aslm.ro/news/comunicate-de-presa",
              "Comunicate de presă ASLM",
              "Comunicate oficiale despre proiectele, activitățile și publicațiile Societății Academice de Medicina Stilului de Viață.",
              [
                { name: "Acasă", path: "/" },
                { name: "News", path: "/news" },
                { name: "Comunicate de presă", path: "/news/comunicate-de-presa" },
              ],
            ),
          ),
        }}
      />
    </main>
  );
}
