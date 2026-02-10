"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";

/**
 * Header Component - ASLM NGO Website
 * Updated navigation structure based on site requirements
 */

const navItems = [
  { 
    href: "/despre", 
    label: "Despre ASLM",
    children: [
      { href: "/despre", label: "Ce este ASLM" },
      { href: "/misiune", label: "Misiune & Viziune" },
      { href: "/echipa", label: "Echipa ASLM" },
      { href: "/despre#statutul-aslm", label: "Statutul ASLM" },
    ]
  },
  { 
    href: "/membri", 
    label: "Membri",
    children: [
      { href: "/membri", label: "Categorii de membri" },
      { href: "/membri#beneficii", label: "Beneficii" },
      { href: "/membri", label: "Înscrie-te" },
    ]
  },
  { href: "/publicatii", label: "Publicații" },
  { href: "/evenimente", label: "Evenimente" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: '#FFFFFF',
        boxShadow: isScrolled ? '0 4px 6px -1px rgba(0,0,0,0.1)' : '0 1px 3px rgba(0,0,0,0.05)',
        padding: isScrolled ? '8px 0' : '12px 0'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="relative w-12 h-12 sm:w-14 sm:h-14">
              <Image
                src="/images/aslm-logo.png"
                alt="ASLM Logo"
                fill
                className="object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span
                className="font-heading text-lg sm:text-xl font-bold leading-tight"
                style={{ color: '#111827' }}
              >
                ASLM
              </span>
              <span
                className="text-xs sm:text-sm font-medium leading-tight hidden sm:block"
                style={{ color: '#6B7280' }}
              >
                Medicina Stilului de Viață
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
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
                    <button
                      className="px-3 py-2 text-sm font-semibold rounded-lg transition-all duration-200 flex items-center gap-1"
                      style={{ color: '#374151' }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = '#166534';
                        e.currentTarget.style.backgroundColor = '#F0FDF4';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = '#374151';
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                    >
                      {item.label}
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    
                    {/* Dropdown Menu */}
                    <AnimatePresence>
                      {openDropdown === item.href && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.15 }}
                          className="absolute top-full left-0 mt-1 w-48 py-2 bg-white rounded-xl shadow-lg border border-gray-100"
                        >
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors"
                              {...(child.href.startsWith('http') ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className="px-3 py-2 text-sm font-semibold rounded-lg transition-all duration-200"
                    style={{ color: '#374151' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#166534';
                      e.currentTarget.style.backgroundColor = '#F0FDF4';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = '#374151';
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Link
              href="https://congres.aslm.ro"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-2.5 text-sm font-semibold rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
              style={{
                backgroundColor: '#166534',
                color: '#FFFFFF'
              }}
            >
              Congres 2026
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg"
            style={{ color: '#111827' }}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden"
            style={{ 
              backgroundColor: '#FFFFFF', 
              borderTop: '1px solid #E5E7EB',
              boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'
            }}
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
                      <div 
                        className="px-4 py-3 font-semibold text-gray-500 text-sm uppercase tracking-wider"
                      >
                        {item.label}
                      </div>
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block px-4 py-2 pl-8 rounded-lg text-gray-700"
                          {...(child.href.startsWith('http') ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-4 py-3 rounded-lg font-semibold"
                      style={{ color: '#1F2937' }}
                    >
                      {item.label}
                    </Link>
                  )}
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navItems.length * 0.03 }}
                className="pt-4 px-4"
              >
                <Link
                  href="https://congres.aslm.ro"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full text-center px-5 py-3 font-bold rounded-xl"
                  style={{ backgroundColor: '#166534', color: '#FFFFFF' }}
                >
                  Congres 2026
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
