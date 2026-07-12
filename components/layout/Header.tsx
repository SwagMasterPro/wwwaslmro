"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Globe2, Menu, X } from "lucide-react";
import {
  getCounterpartPath,
  isEnglishPath,
  MEMBERSHIP_JOIN_URL,
  STATUTE_EN_URL,
  type Locale,
} from "@/lib/localized-routes";

type NavItem = {
  href: string;
  label: string;
  children?: NavItem[];
};

function isExternalHref(href: string): boolean {
  return href.startsWith("http") || href.startsWith("mailto:");
}

function HeaderAnchor({
  href,
  children,
  className,
  onClick,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  if (isExternalHref(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className} onClick={onClick}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className} onClick={onClick}>
      {children}
    </Link>
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
      { href: "/blog", label: "Blog" },
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
    { href: "/blog", label: "Blog" },
    { href: "/evenimente", label: "Evenimente" },
    { href: "/y-aslm", label: "Y-ASLM" },
    { href: "/contact", label: "Contact" },
  ];
}

export default function Header() {
  const pathname = usePathname();
  const locale: Locale = isEnglishPath(pathname) ? "en" : "ro";
  const languageHref = getCounterpartPath(pathname);
  const navItems = getNavItems(locale);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white"
      style={{
        boxShadow: isScrolled ? "0 4px 6px -1px rgba(0,0,0,0.1)" : "0 1px 3px rgba(0,0,0,0.05)",
        padding: isScrolled ? "8px 0" : "12px 0",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between gap-4">
          <Link href={locale === "en" ? "/en" : "/"} className="flex items-center gap-3 shrink-0">
            <div className="relative w-12 h-12 sm:w-14 sm:h-14">
              <Image src="/images/aslm-logo.png" alt="ASLM Logo" fill sizes="56px" className="object-contain" />
            </div>
            <div className="flex flex-col">
              <span className="font-heading text-lg sm:text-xl font-bold leading-tight" style={{ color: "#111827" }}>
                ASLM
              </span>
              <span className="text-xs sm:text-sm font-medium leading-tight hidden sm:block" style={{ color: "#6B7280" }}>
                {locale === "ro" ? "Medicina Stilului de Viață" : "Lifestyle Medicine"}
              </span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => item.children && setOpenDropdown(item.href)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                {item.children ? (
                  <>
                    <button className="px-2.5 py-2 text-sm font-semibold rounded-lg transition-all duration-200 flex items-center gap-1 text-gray-700 hover:text-green-800 hover:bg-green-50">
                      {item.label}
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    <AnimatePresence>
                      {openDropdown === item.href && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.15 }}
                          className="absolute top-full left-0 mt-1 w-56 py-2 bg-white rounded-xl shadow-lg border border-gray-100"
                        >
                          {item.children.map((child) => (
                            <HeaderAnchor
                              key={child.href}
                              href={child.href}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors"
                            >
                              {child.label}
                            </HeaderAnchor>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <HeaderAnchor
                    href={item.href}
                    className="px-2.5 py-2 text-sm font-semibold rounded-lg transition-all duration-200 flex items-center text-gray-700 hover:text-green-800 hover:bg-green-50"
                  >
                    {item.label}
                  </HeaderAnchor>
                )}
              </div>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-2">
            <Link
              href={languageHref}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-semibold rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50"
              aria-label={locale === "ro" ? "Switch to English" : "Comută în română"}
            >
              <Globe2 className="w-4 h-4" />
              {locale === "ro" ? "EN" : "RO"}
            </Link>
            <a
              href={MEMBERSHIP_JOIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-5 py-2.5 text-sm font-bold rounded-xl transition-all duration-200 shadow-sm hover:shadow-md bg-red-600 text-white hover:bg-red-700"
            >
              {locale === "ro" ? "Înscrie-te" : "Join ASLM"}
            </a>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg"
            style={{ color: "#111827" }}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-white border-t border-gray-200 shadow-lg"
          >
            <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.03 }}
                >
                  {item.children ? (
                    <div className="space-y-1">
                      <div className="px-4 py-3 font-semibold text-gray-500 text-sm uppercase tracking-wider">{item.label}</div>
                      {item.children.map((child) => (
                        <HeaderAnchor
                          key={child.href}
                          href={child.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block px-4 py-2 pl-8 rounded-lg text-gray-700"
                        >
                          {child.label}
                        </HeaderAnchor>
                      ))}
                    </div>
                  ) : (
                    <HeaderAnchor
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-4 py-3 rounded-lg font-semibold text-gray-800"
                    >
                      {item.label}
                    </HeaderAnchor>
                  )}
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navItems.length * 0.03 }}
                className="pt-4 px-4 grid grid-cols-[auto_1fr] gap-3"
              >
                <Link
                  href={languageHref}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-3 font-bold text-gray-700"
                >
                  <Globe2 className="w-4 h-4" />
                  {locale === "ro" ? "EN" : "RO"}
                </Link>
                <a
                  href={MEMBERSHIP_JOIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full text-center px-5 py-3 font-bold rounded-xl bg-red-600 text-white"
                >
                  {locale === "ro" ? "Înscrie-te" : "Join ASLM"}
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
