"use client";

import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ExternalLink, Facebook, Instagram, Mail, MapPin } from "lucide-react";
import { isEnglishPath, MEMBERSHIP_JOIN_URL, STATUTE_EN_URL, type Locale } from "@/lib/localized-routes";

type FooterLink = {
  href: string;
  label: string;
  external?: boolean;
};

function FooterAnchor({
  href,
  external,
  className,
  style,
  children,
}: {
  href: string;
  external?: boolean;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  if (external || href.startsWith("http") || href.startsWith("mailto:")) {
    return (
      <a href={href} target={href.startsWith("mailto:") ? undefined : "_blank"} rel="noopener noreferrer" className={className} style={style}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className} style={style}>
      {children}
    </Link>
  );
}

function getFooterLinks(locale: Locale) {
  if (locale === "en") {
    return {
      about: [
        { href: "/en", label: "ASLM in English" },
        { href: "/en/scientific-council", label: "Scientific Council" },
        { href: "/en/executive-council", label: "Executive Council" },
        { href: STATUTE_EN_URL, label: "ASLM Statute", external: true },
      ],
      members: [
        { href: "/en/membership", label: "Membership categories" },
        { href: "/en/membership#beneficii", label: "Benefits" },
        { href: "/en/general-assembly", label: "General Assembly" },
        { href: MEMBERSHIP_JOIN_URL, label: "Join ASLM", external: true },
      ],
      resources: [
        { href: "/lifestyle-medicine-romania", label: "Lifestyle medicine Romania" },
        { href: "/blog", label: "ASLM Blog" },
        { href: "/publicatii", label: "Publications" },
        { href: "/evenimente", label: "Events" },
        { href: "/evenimente/credite-emc", label: "CME/EMC credits" },
        { href: "https://medscience.center/LMRR/", label: "LMRR Journal", external: true },
      ],
      guides: [
        { href: "/ghid/alimentatie-sanatoasa", label: "Healthy nutrition" },
        { href: "/ghid/activitate-fizica", label: "Physical activity" },
        { href: "/ghid/sanatatea-somnului", label: "Sleep health" },
        { href: "/ghid/gestionare-stres", label: "Stress management" },
        { href: "/ghid/renuntare-fumat-alcool", label: "Smoking and alcohol" },
        { href: "/ghid/relatii-sociale-sanatate", label: "Social connection" },
      ],
      quick: [
        { href: "/contact", label: "Contact" },
        { href: "/privacy", label: "Privacy" },
        { href: "/terms", label: "Terms" },
        { href: "/revizie-medicala", label: "Medical review" },
      ],
    };
  }

  return {
    about: [
      { href: "/despre", label: "Ce este ASLM" },
      { href: "/misiune", label: "Misiune & Viziune" },
      { href: "/consiliu-stiintific", label: "Consiliu Științific" },
      { href: "/consiliu-executiv", label: "Consiliu Executiv" },
      { href: "/despre#statutul-aslm", label: "Statutul ASLM" },
    ],
    members: [
      { href: "/membri", label: "Categorii de membri" },
      { href: "/membri#beneficii", label: "Beneficii membri" },
      { href: "/adunarea-generala", label: "Adunarea Generală" },
      { href: MEMBERSHIP_JOIN_URL, label: "Înscriere", external: true },
    ],
    resources: [
      { href: "/medicina-stilului-de-viata", label: "Medicina stilului de viață" },
      { href: "/blog", label: "Blog ASLM" },
      { href: "/membri", label: "Membri ASLM" },
      { href: "/publicatii", label: "Publicații" },
      { href: "/evenimente", label: "Evenimente" },
      { href: "/evenimente/credite-emc", label: "Credite EMC" },
      { href: "https://medscience.center/LMRR/", label: "Revista LMRR", external: true },
    ],
    guides: [
      { href: "/ghid/alimentatie-sanatoasa", label: "Alimentație sănătoasă" },
      { href: "/ghid/activitate-fizica", label: "Activitate fizică" },
      { href: "/ghid/sanatatea-somnului", label: "Sănătatea somnului" },
      { href: "/ghid/gestionare-stres", label: "Gestionare stres" },
      { href: "/ghid/renuntare-fumat-alcool", label: "Renunțare fumat alcool" },
      { href: "/ghid/relatii-sociale-sanatate", label: "Relații sociale și sănătate" },
    ],
    quick: [
      { href: "/contact", label: "Contact" },
      { href: "/privacy", label: "Confidențialitate" },
      { href: "/terms", label: "Termeni" },
      { href: "/revizie-medicala", label: "Revizie medicală" },
    ],
  };
}

function LinkList({ links }: { links: FooterLink[] }) {
  return (
    <ul className="space-y-3">
      {links.map((link) => (
        <li key={link.href}>
          <FooterAnchor
            href={link.href}
            external={link.external}
            className="inline-flex items-center gap-1 transition-colors font-medium hover:text-green-700"
            style={{ color: "#4B5563" }}
          >
            {link.label}
            {link.external && <ExternalLink className="w-3 h-3" />}
          </FooterAnchor>
        </li>
      ))}
    </ul>
  );
}

export default function Footer() {
  const pathname = usePathname();
  const locale: Locale = isEnglishPath(pathname) ? "en" : "ro";
  const links = getFooterLinks(locale);

  return (
    <footer style={{ backgroundColor: "#FFFFFF", color: "#111827" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" style={{ borderTop: "1px solid #E5E7EB" }}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2">
            <Link href={locale === "en" ? "/en" : "/"} className="flex items-center gap-3 mb-6">
              <div className="relative w-14 h-14">
                <Image src="/images/aslm-logo.png" alt="ASLM Logo" fill sizes="56px" className="object-contain" />
              </div>
              <div>
                <span className="font-heading text-xl font-bold block" style={{ color: "#111827" }}>
                  ASLM
                </span>
                <span className="text-sm" style={{ color: "#6B7280" }}>
                  {locale === "ro" ? "România" : "Romania"}
                </span>
              </div>
            </Link>
            <p className="mb-6 max-w-sm leading-relaxed text-sm" style={{ color: "#4B5563" }}>
              {locale === "ro"
                ? "Societatea Academică de Medicina Stilului de Viață promovează excelența în medicina stilului de viață prin educație, cercetare și colaborare."
                : "The Academic Society of Lifestyle Medicine promotes excellence in lifestyle medicine through education, research and collaboration."}
            </p>
            <div className="mb-6">
              <a
                href="https://congres.aslm.ro"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors"
                style={{ backgroundColor: "#F0FDF4", color: "#166534" }}
              >
                Congres ASLM 2026
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
            <div className="flex items-center gap-3">
              <a
                href="https://www.facebook.com/profile.php?id=61587670614129"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-colors hover:bg-green-100"
                style={{ backgroundColor: "#F3F4F6", color: "#374151" }}
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/aslm.lifestylemedicine/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-colors hover:bg-green-100"
                style={{ backgroundColor: "#F3F4F6", color: "#374151" }}
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-sm mb-5 uppercase tracking-wider" style={{ color: "#166534" }}>
              {locale === "ro" ? "Despre ASLM" : "About ASLM"}
            </h3>
            <LinkList links={links.about} />

            <h3 className="font-bold text-sm mb-5 uppercase tracking-wider mt-8" style={{ color: "#166534" }}>
              {locale === "ro" ? "Membri" : "Membership"}
            </h3>
            <LinkList links={links.members} />
          </div>

          <div>
            <h3 className="font-bold text-sm mb-5 uppercase tracking-wider" style={{ color: "#166534" }}>
              {locale === "ro" ? "Resurse principale" : "Main resources"}
            </h3>
            <LinkList links={links.resources} />

            <h3 className="font-bold text-sm mb-5 uppercase tracking-wider mt-8" style={{ color: "#166534" }}>
              {locale === "ro" ? "Ghiduri ASLM" : "ASLM guides"}
            </h3>
            <LinkList links={links.guides} />

            <div className="mt-8">
              <ul className="space-y-2">
                {links.quick.map((link) => (
                  <li key={link.href}>
                    <FooterAnchor href={link.href} className="text-sm transition-colors hover:text-green-700" style={{ color: "#6B7280" }}>
                      {link.label}
                    </FooterAnchor>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-sm mb-5 uppercase tracking-wider" style={{ color: "#166534" }}>
              Contact
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: "#166534" }} />
                <div>
                  <p className="font-medium" style={{ color: "#111827" }}>Str. Iuliu Maniu 41A</p>
                  <p style={{ color: "#4B5563" }}>Brașov, România</p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 flex-shrink-0" style={{ color: "#166534" }} />
                <a href="mailto:contact@aslm.ro" className="transition-colors font-medium hover:text-green-700" style={{ color: "#4B5563" }}>
                  contact@aslm.ro
                </a>
              </li>
            </ul>

            <div className="mt-6 pt-6" style={{ borderTop: "1px solid #E5E7EB" }}>
              <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: "#166534" }}>
                {locale === "ro" ? "Afiliere" : "Affiliation"}
              </p>
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 flex-shrink-0">
                  <Image src="/images/amr-logo.png" alt="AMR Logo" fill sizes="48px" className="object-contain" />
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: "#111827" }}>AMR</p>
                  <p className="text-xs" style={{ color: "#6B7280" }}>
                    {locale === "ro" ? "Asociația Medicală Română" : "Romanian Medical Association"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ borderTop: "1px solid #E5E7EB", backgroundColor: "#F9FAFB" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <p className="text-sm text-center" style={{ color: "#6B7280" }}>
              © {new Date().getFullYear()} {locale === "ro" ? "Societatea Academică de Medicina Stilului de Viață." : "Academic Society of Lifestyle Medicine."}{" "}
              {locale === "ro" ? "Toate drepturile rezervate." : "All rights reserved."}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
