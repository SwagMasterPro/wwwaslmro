import Image from "next/image";
import Link from "next/link";

type RosterProfileProps = {
  name: string;
  image?: string;
  bio?: string;
  href?: string;
  city?: string;
};

export default function RosterProfile({ name, image, bio, href, city }: RosterProfileProps) {
  return (
    <div className="flex items-start gap-3">
      {image && (
        <Image src={image} alt="" width={64} height={64} sizes="64px"
          className="size-14 shrink-0 rounded-lg bg-green-50 object-cover object-top sm:size-16" />
      )}
      <div className="min-w-0">
        {href ? (
          <Link href={href} className="font-semibold text-green-900 underline decoration-green-300 underline-offset-4 hover:decoration-green-900">{name}</Link>
        ) : (
          <span className="font-semibold text-[var(--text-primary)]">{name}</span>
        )}
        {city && <p className="mt-1 text-sm text-[var(--text-secondary)]">{city}</p>}
        {bio && <p className="mt-1 text-sm leading-relaxed text-[var(--text-secondary)]">{bio}</p>}
      </div>
    </div>
  );
}
