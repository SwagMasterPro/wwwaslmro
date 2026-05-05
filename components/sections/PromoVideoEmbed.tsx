"use client";

/**
 * Embeds the ASLM promo video on the homepage (no modal).
 * Uses a custom poster frame; playback is user-initiated only.
 */
export default function PromoVideoEmbed() {
  return (
    <section
      className="section-lg surface-secondary"
      aria-labelledby="promo-video-heading"
    >
      <div className="container-wide max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <p
          className="text-center text-sm font-semibold tracking-wide uppercase mb-2"
          style={{ color: "#166534" }}
        >
          Medicina stilului de viață
        </p>
        <h2
          id="promo-video-heading"
          className="font-heading text-2xl md:text-3xl font-bold text-center text-[var(--text-primary)] mb-4"
        >
          Cum prevenim bolile cronice?
        </h2>
        <p className="text-body text-center text-[var(--text-secondary)] mb-8 max-w-2xl mx-auto">
          Prezentare video. Apăsați redare când doriți să o vizionați.
        </p>
        <div
          className="relative w-full rounded-2xl overflow-hidden shadow-xl border bg-black"
          style={{ borderColor: "rgba(22, 101, 52, 0.2)" }}
        >
          <div className="aspect-video w-full">
            <video
              className="h-full w-full object-contain"
              controls
              playsInline
              preload="metadata"
              poster="/images/promo-video-cover.png"
              aria-label="Video: Cum prevenim bolile cronice? — Medicina stilului de viață, Societatea Academică de Medicina Stilului de Viață"
            >
              <source src="/videos/promo.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </section>
  );
}
