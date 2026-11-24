import { activeYoungMembers } from "@/data/y-aslm";
import type { Locale } from "@/lib/localized-routes";
import RosterProfile from "./RosterProfile";

export default function YoungMemberList({ locale, label }: { locale: Locale; label: string }) {
  return (
    <ul aria-label={label} className="mx-auto grid max-w-5xl gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {activeYoungMembers.map((member) => (
        <li key={member.displayName} className="card-elevated px-5 py-4">
          <RosterProfile name={member.displayName} city={member.city} image={member.image} bio={member.shortBio?.[locale]} />
        </li>
      ))}
    </ul>
  );
}
