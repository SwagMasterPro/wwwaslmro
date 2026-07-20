import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Menu } from "lucide-react";
import { MEMBERSHIP_JOIN_URL, STATUTE_EN_URL, type Locale } from "@/lib/localized-routes";
import LanguageSwitch from "@/components/layout/LanguageSwitch";
import MembershipButton from "@/components/marketing/MembershipButton";

type NavItem = {
  href: string;
  label: string;
  children?: NavItem[];
};

function isExternalHref(href: string) {
  return href.startsWith("http") || href.startsWith("mailto:");
}

function HeaderAnchor({ href, children, className }: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return isExternalHref(href) ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>{children}</a>
  ) : (
    <Link href={href} className={className}>{children}</Link>
  );
}

function getNavItems(locale: Locale): NavItem[] {
  if (locale === "en") {
    return [
      {
        href: "/en",
        label: "About ASLM",
        children: [
          { href: "/en", label: "ASLM in English" },
          { href: "/lifestyle-medicine-romania", label: "Lifestyle Medicine Romania" },
          { href: "/en/scientific-council", label: "Scientific Council" },
          { href: "/en/executive-council", label: "Executive Council" },
          { href: STATUTE_EN_URL, label: "ASLM Statute" },
        ],
      },
      {
        href: "/en/membership",
        label: "Membership",
        children: [
          { href: "/en/membership", label: "Categories" },
          { href: "/en/membership#beneficii", label: "Benefits" },
          { href: "/en/general-assembly", label: "General Assembly" },
          { href: MEMBERSHIP_JOIN_URL, label: "Join ASLM" },
        ],
      },
      { href: "/publicatii", label: "Publications" },
      {
        href: "/news",
        label: "News",
        children: [
          { href: "/news/articole", label: "Articles" },
          { href: "/news/comunicate-de-presa", label: "Press releases" },
        ],
      },
      { href: "/evenimente", label: "Events" },
      { href: "/y-aslm", label: "Y-ASLM" },
      { href: "/contact", label: "Contact" },
    ];
  }

  return [
    {
      href: "/despre",
      label: "Despre ASLM",
      children: [
        { href: "/despre", label: "Ce este ASLM" },
        { href: "/medicina-stilului-de-viata", label: "Medicina stilului de viață" },
        { href: "/misiune", label: "Misiune & Viziune" },
        { href: "/consiliu-stiintific", label: "Consiliu Științific" },
        { href: "/consiliu-executiv", label: "Consiliu Executiv" },
        { href: "/despre#statutul-aslm", label: "Statutul ASLM" },
      ],
    },
    {
      href: "/membri",
      label: "Membri",
      children: [
        { href: "/membri", label: "Categorii de membri" },
        { href: "/membri#beneficii", label: "Beneficii" },
        { href: "/adunarea-generala", label: "Adunarea Generală" },
        { href: MEMBERSHIP_JOIN_URL, label: "Înscrie-te" },
      ],
    },
    { href: "/publicatii", label: "Publicații" },
    {
      href: "/news",
      label: "News",
      children: [
        { href: "/news/articole", label: "Articole" },
        { href: "/news/comunicate-de-presa", label: "Comunicate de presă" },
      ],
    },
    { href: "/evenimente", label: "Evenimente" },
    { href: "/y-aslm", label: "Y-ASLM" },
    { href: "/contact", label: "Contact" },
  ];
}

export default function Header({ locale }: { locale: Locale }) {
  const navItems = getNavItems(locale);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white py-3 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between gap-4" aria-label="Navigație principală">
          <Link href={locale === "en" ? "/en" : "/"} className="flex items-center gap-3 shrink-0">
            <div className="relative w-12 h-12 sm:w-14 sm:h-14">
              <Image src="/images/aslm-logo.png" alt="ASLM Logo" fill sizes="56px" className="object-contain" />
            </div>
            <div className="flex flex-col">
              <span className="font-heading text-lg sm:text-xl font-bold leading-tight text-gray-900">ASLM</span>
              <span className="text-xs sm:text-sm font-medium leading-tight hidden sm:block text-gray-500">
                {locale === "ro" ? "Medicina Stilului de Viață" : "Lifestyle Medicine"}
              </span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <div key={item.href} className="relative group">
                {item.children ? (
                  <>
                    <button type="button" className="px-2.5 py-2 text-sm font-semibold rounded-lg flex items-center gap-1 text-gray-700 hover:text-green-800 hover:bg-green-50">
                      {item.label}<ChevronDown className="w-4 h-4" />
                    </button>
                    <div className="absolute invisible opacity-0 translate-y-2 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:visible group-focus-within:opacity-100 group-focus-within:translate-y-0 top-full left-0 mt-1 w-56 py-2 bg-white rounded-xl shadow-lg border border-gray-100 transition-all">
                      {item.children.map((child) => (
                        <HeaderAnchor key={child.href} href={child.href} className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700">
                          {child.label}
                        </HeaderAnchor>
                      ))}
                    </div>
                  </>
                ) : (
                  <HeaderAnchor href={item.href} className="px-2.5 py-2 text-sm font-semibold rounded-lg flex items-center text-gray-700 hover:text-green-800 hover:bg-green-50">
                    {item.label}
                  </HeaderAnchor>
                )}
              </div>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-2">
            <LanguageSwitch locale={locale} />
            <MembershipButton locale={locale} />
          </div>

          <details className="relative lg:hidden">
            <summary className="list-none cursor-pointer p-2 rounded-lg text-gray-900" aria-label="Open menu">
              <Menu className="w-6 h-6" />
            </summary>
            <div className="absolute right-0 top-full mt-3 w-[min(90vw,24rem)] max-h-[75vh] overflow-y-auto rounded-xl border border-gray-200 bg-white p-4 shadow-xl">
              {navItems.map((item) => (
                <div key={item.href} className="border-b border-gray-100 py-2 last:border-0">
                  <HeaderAnchor href={item.href} className="block px-3 py-2 font-semibold text-gray-800">{item.label}</HeaderAnchor>
                  {item.children?.map((child) => (
                    <HeaderAnchor key={child.href} href={child.href} className="block px-6 py-2 text-sm text-gray-600">
                      {child.label}
                    </HeaderAnchor>
                  ))}
                </div>
              ))}
              <div className="grid grid-cols-[auto_1fr] gap-3 pt-4">
                <LanguageSwitch locale={locale} />
                <MembershipButton locale={locale} className="w-full justify-center" />
              </div>
            </div>
          </details>
        </nav>
      </div>
    </header>
  );
}
