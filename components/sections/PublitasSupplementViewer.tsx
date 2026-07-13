"use client";

import { useEffect } from "react";
import { ExternalLink } from "lucide-react";

const SCRIPT_SRC = "https://view.publitas.com/embed.js";

type PublitasSupplementViewerProps = {
  code: string;
  title: string;
  description: string;
  publicationUrl: string;
  aspectRatio: number;
  wrapperId: string;
};

export default function PublitasSupplementViewer({
  code,
  title,
  description,
  publicationUrl,
  aspectRatio,
  wrapperId,
}: PublitasSupplementViewerProps) {
  useEffect(() => {
    const existing = document.querySelector<HTMLScriptElement>(
      `script[data-wrapper-id="${wrapperId}"][src="${SCRIPT_SRC}"]`,
    );

    if (existing) return undefined;

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = SCRIPT_SRC;
    script.async = false;
    script.setAttribute("data-cfasync", "false");
    script.setAttribute("data-height", "");
    script.setAttribute("data-publication", publicationUrl);
    script.setAttribute("data-publication-aspect-ratio", String(aspectRatio));
    script.setAttribute("data-publication-title", `${code} · ${title}`);
    script.setAttribute("data-responsive", "true");
    script.setAttribute("data-width", "");
    script.setAttribute("data-wrapper-id", wrapperId);
    script.setAttribute("publitas-embed", "");
    document.body.appendChild(script);

    return () => {
      script.remove();
      const wrapper = document.getElementById(wrapperId);
      if (wrapper) wrapper.innerHTML = "";
    };
  }, [aspectRatio, code, publicationUrl, title, wrapperId]);

  return (
    <article className="card-elevated overflow-hidden">
      <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-start sm:justify-between md:p-8">
        <div>
          <p className="text-overline text-[var(--color-primary-600)]">{code}</p>
          <h3 className="mt-2 text-title text-[var(--text-primary)]">{title}</h3>
          <p className="mt-3 max-w-3xl text-body-sm text-[var(--text-secondary)]">{description}</p>
        </div>
        <a
          href={publicationUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-[var(--color-primary-700)] px-4 py-3 text-sm font-semibold text-[var(--color-primary-700)] transition-colors hover:bg-[var(--color-primary-700)] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-600)]"
        >
          Deschide în Publitas
          <ExternalLink className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
      <div className="border-t border-[var(--border-primary)] bg-[#f6f8f6] p-3 sm:p-5">
        <div
          id={wrapperId}
          className="w-full overflow-hidden rounded-xl bg-white shadow-sm [&_iframe]:block [&_iframe]:h-full [&_iframe]:w-full"
          style={{ aspectRatio }}
          role="region"
          aria-label={`${title} Publitas viewer`}
        />
      </div>
    </article>
  );
}
