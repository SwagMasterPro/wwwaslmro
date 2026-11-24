import RosterProfile from "@/components/governance/RosterProfile";
import type { Locale } from "@/lib/localized-routes";

export default function HonoraryMembers({ locale }: { locale: Locale }) {
  const isRomanian = locale === "ro";

  return (
    <section id="membri-de-onoare" aria-labelledby="honorary-title" className="my-12 scroll-mt-28">
      <h2 id="honorary-title" className="mb-4 text-title text-[var(--text-primary)]">
        {isRomanian ? "Membri de onoare ASLM" : "ASLM Honorary Members"}
      </h2>
      <RosterProfile name="Dr. Cristian Cârstoiu" image="/images/members/cristian-carstoiu.webp"
        bio={isRomanian
          ? "Absolvent al Facultății de Medicină, Cristian Cârstoiu a cofondat Editura Amaltea în timpul studenției. În 2007 a fondat Audiosfera, editură dedicată cărților audio."
          : "Cristian Cârstoiu co-founded Amaltea while studying medicine. A medical graduate and publisher, he founded Audiosfera in 2007 to publish audiobooks."} />
    </section>
  );
}
