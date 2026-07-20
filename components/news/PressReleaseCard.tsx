import Image from "next/image";
import Link from "next/link";
import { Calendar, FileText, ArrowRight } from "lucide-react";
import type { PressRelease } from "@/data/press-releases";
import { getPressReleasePath } from "@/lib/news-routes";

export default function PressReleaseCard({ pressRelease }: { pressRelease: PressRelease }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-white shadow-sm transition-shadow hover:shadow-lg">
      <Link href={getPressReleasePath(pressRelease.slug)} className="block">
        <div className="relative aspect-square overflow-hidden bg-[var(--surface-secondary)]">
          <Image
            src={pressRelease.image.src}
            alt={pressRelease.image.alt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
        </div>
        <div className="p-6">
          <div className="mb-3 flex flex-wrap items-center gap-3 text-sm text-[var(--text-tertiary)]">
            <span className="inline-flex items-center gap-1.5 font-semibold text-[var(--color-primary-700)]">
              <FileText className="h-4 w-4" />
              Comunicat de presă
            </span>
            <time className="inline-flex items-center gap-1.5" dateTime={pressRelease.metadata.publishDate}>
              <Calendar className="h-4 w-4" />
              {new Date(pressRelease.metadata.publishDate).toLocaleDateString("ro-RO", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </time>
          </div>
          <h2 className="font-heading text-xl font-semibold leading-snug text-[var(--text-primary)]">
            {pressRelease.title}
          </h2>
          <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">{pressRelease.excerpt}</p>
          <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-primary-700)] transition-all group-hover:gap-3">
            Citește comunicatul <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </Link>
    </article>
  );
}
