import Link from "next/link";
import { BookOpen, FileText, ArrowRight } from "lucide-react";
import { generateStaticPageMetadata } from "@/lib/metadata-helpers";
import { NEWS_ARTICLES_PATH, PRESS_RELEASES_PATH } from "@/lib/news-routes";

export const metadata = generateStaticPageMetadata("/news");

const sections = [
  {
    href: NEWS_ARTICLES_PATH,
    title: "Articole",
    description: "Articole educaționale ASLM despre medicina stilului de viață și cei șase piloni ai sănătății.",
    icon: BookOpen,
  },
  {
    href: PRESS_RELEASES_PATH,
    title: "Comunicate de presă",
    description: "Noutăți despre proiectele, activitățile și publicațiile Societății Academice de Medicina Stilului de Viață.",
    icon: FileText,
  },
];

export default function NewsPage() {
  return (
    <main className="pt-20">
      <section className="mesh-hero section-lg">
        <div className="container-default text-center">
          <h1 className="text-display text-white">News</h1>
        </div>
      </section>
      <section className="section-lg surface-primary">
        <div className="container-default grid gap-6 md:grid-cols-2">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <Link
                key={section.href}
                href={section.href}
                className="group rounded-2xl border border-[var(--border-subtle)] bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <Icon className="mb-6 h-10 w-10 text-[var(--color-primary-600)]" />
                <h2 className="text-title text-2xl text-[var(--text-primary)]">{section.title}</h2>
                <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">{section.description}</p>
                <span className="mt-6 inline-flex items-center gap-2 font-semibold text-[var(--color-primary-700)] transition-all group-hover:gap-3">
                  Descoperă <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
