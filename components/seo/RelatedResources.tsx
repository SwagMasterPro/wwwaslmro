import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { RelatedResource } from "@/data/seo-topic-map";

type RelatedResourcesProps = {
  title?: string;
  resources: RelatedResource[];
};

export default function RelatedResources({
  title = "Resurse principale",
  resources,
}: RelatedResourcesProps) {
  return (
    <div className="rounded-lg bg-[var(--surface-secondary)] border border-[var(--color-primary-100)] p-5 md:p-6">
      <h3 className="font-heading text-xl font-semibold text-[var(--text-primary)] mb-4">
        {title}
      </h3>
      <div className="grid sm:grid-cols-2 gap-3">
        {resources.map((resource) => (
          <Link
            key={resource.href}
            href={resource.href}
            className="inline-flex items-center justify-between gap-3 rounded-lg bg-white border border-[var(--color-primary-100)] px-4 py-3 font-semibold text-[var(--color-primary-700)] hover:bg-[var(--surface-primary)]"
          >
            {resource.label}
            <ArrowRight className="w-4 h-4 flex-shrink-0" />
          </Link>
        ))}
      </div>
    </div>
  );
}
