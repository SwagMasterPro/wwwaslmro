import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, ChevronRight, FileText } from "lucide-react";
import JsonLdScript from "@/components/seo/JsonLdScript";
import ArticleContent from "@/components/blog/ArticleContent";
import { getPressReleaseBySlug, pressReleases } from "@/data/press-releases";
import { generatePressReleaseMetadata } from "@/lib/metadata-helpers";
import { generateBreadcrumbSchema, generatePressReleaseSchema } from "@/lib/structured-data";
import { NEWS_PATH, PRESS_RELEASES_PATH, getPressReleasePath } from "@/lib/news-routes";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return pressReleases.map((pressRelease) => ({ slug: pressRelease.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const pressRelease = getPressReleaseBySlug(slug);
  return pressRelease ? generatePressReleaseMetadata(pressRelease) : {};
}

export default async function PressReleasePage({ params }: PageProps) {
  const { slug } = await params;
  const pressRelease = getPressReleaseBySlug(slug);
  if (!pressRelease) notFound();

  const path = getPressReleasePath(pressRelease.slug);
  const fullUrl = `https://www.aslm.ro${path}`;
  const breadcrumbs = [
    { name: "Acasă", path: "/" },
    { name: "News", path: NEWS_PATH },
    { name: "Comunicate de presă", path: PRESS_RELEASES_PATH },
    { name: pressRelease.title, path },
  ];

  return (
    <main className="pt-20">
      <JsonLdScript
        id="press-release-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            generatePressReleaseSchema(pressRelease, fullUrl),
            generateBreadcrumbSchema(breadcrumbs),
          ]),
        }}
      />
      <section className="surface-secondary py-4">
        <div className="container-default">
          <nav className="flex flex-wrap items-center gap-2 text-sm text-[var(--text-tertiary)]" aria-label="Navigație ierarhică">
            <Link href={NEWS_PATH} className="hover:text-[var(--color-primary-600)]">News</Link>
            <ChevronRight className="h-4 w-4" />
            <Link href={PRESS_RELEASES_PATH} className="hover:text-[var(--color-primary-600)]">Comunicate de presă</Link>
          </nav>
        </div>
      </section>
      <article className="section-lg surface-primary">
        <div className="container-default max-w-4xl">
          <div className="mb-6 flex flex-wrap items-center gap-4 text-sm text-[var(--text-tertiary)]">
            <span className="inline-flex items-center gap-2 font-semibold text-[var(--color-primary-700)]"><FileText className="h-4 w-4" />Comunicat de presă</span>
            <time className="inline-flex items-center gap-2" dateTime={pressRelease.metadata.publishDate}><Calendar className="h-4 w-4" />{new Date(pressRelease.metadata.publishDate).toLocaleDateString("ro-RO", { day: "numeric", month: "long", year: "numeric" })}</time>
          </div>
          <h1 className="text-display text-[var(--text-primary)]" style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}>{pressRelease.title}</h1>
          <div className="relative mt-8 aspect-square overflow-hidden rounded-2xl bg-[var(--surface-secondary)]">
            <Image src={pressRelease.image.src} alt={pressRelease.image.alt} fill priority sizes="(max-width: 900px) 100vw, 896px" className="object-cover" />
          </div>
        </div>
      </article>
      <ArticleContent content={pressRelease.content} />
      <section className="section-md surface-secondary">
        <div className="container-default max-w-4xl">
          <p className="text-overline mb-3">Resurse ASLM</p>
          <div className="grid gap-4 md:grid-cols-3">
            <Link href="/publicatii" className="rounded-xl border border-[var(--color-primary-100)] bg-white p-5 transition-shadow hover:shadow-md">
              <h2 className="font-semibold text-[var(--text-primary)]">Publicații</h2>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">Resurse și publicații științifice ASLM.</p>
            </Link>
            <Link href="/evenimente" className="rounded-xl border border-[var(--color-primary-100)] bg-white p-5 transition-shadow hover:shadow-md">
              <h2 className="font-semibold text-[var(--text-primary)]">Evenimente</h2>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">Calendarul și arhiva activităților ASLM.</p>
            </Link>
            <Link href="/membri" className="rounded-xl border border-[var(--color-primary-100)] bg-white p-5 transition-shadow hover:shadow-md">
              <h2 className="font-semibold text-[var(--text-primary)]">Membri ASLM</h2>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">Beneficii, categorii și înscriere.</p>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
