/**
 * Embeds the ASLM promo video on the homepage (no modal).
 * Uses a custom poster frame; playback is user-initiated only.
 */
export default function PromoVideoEmbed({ locale = "ro" }: { locale?: "ro" | "en" }) {
  const isEnglish = locale === "en";
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
          {isEnglish ? "Lifestyle medicine" : "Medicina stilului de viață"}
        </p>
        <h2
          id="promo-video-heading"
          className="font-heading text-2xl md:text-3xl font-bold text-center text-[var(--text-primary)] mb-4"
        >
          {isEnglish ? "How can chronic diseases be prevented?" : "Cum prevenim bolile cronice?"}
        </h2>
        <p className="text-body text-center text-[var(--text-secondary)] mb-8 max-w-2xl mx-auto">
          {isEnglish
            ? "Video presentation. Press play when you are ready to watch."
            : "Prezentare video. Apăsați redare când doriți să o vizionați."}
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
              poster="/images/promo-video-cover.webp"
              aria-label={
                isEnglish
                  ? "Video: preventing chronic diseases through lifestyle medicine"
                  : "Video: Cum prevenim bolile cronice? — Medicina stilului de viață"
              }
            >
              <source src="/videos/promo.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </section>
  );
}
