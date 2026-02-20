import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Facebook, Linkedin, Instagram, ExternalLink } from "lucide-react";

/**
 * Footer Component - ASLM NGO Website
 * Updated with complete site structure
 */

const aboutLinks = [
  { href: "/despre", label: "Ce este ASLM" },
  { href: "/misiune", label: "Misiune & Viziune" },
  { href: "/echipa", label: "Echipa ASLM" },
];

const memberLinks = [
  { href: "/membri", label: "Categorii de membri" },
  { href: "/membri#beneficii", label: "Beneficii membri" },
  { href: "/contact", label: "Înscriere" },
];

const resourceLinks = [
  { href: "/publicatii", label: "Publicații" },
  { href: "/evenimente", label: "Evenimente" },
  { href: "https://medscience.center/LMRR/", label: "Revista LMRR", external: true },
];

const quickLinks = [
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Confidențialitate" },
  { href: "/terms", label: "Termeni" },
];

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#FFFFFF', color: '#111827' }}>
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" style={{ borderTop: '1px solid #E5E7EB' }}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="relative w-14 h-14">
                <Image
                  src="/images/aslm-logo.png"
                  alt="ASLM Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <span className="font-heading text-xl font-bold block" style={{ color: '#111827' }}>
                  ASLM
                </span>
                <span className="text-sm" style={{ color: '#6B7280' }}>
                  România
                </span>
              </div>
            </Link>
            <p className="mb-6 max-w-sm leading-relaxed text-sm" style={{ color: '#4B5563' }}>
              Societatea Academică de Medicina Stilului de Viață promovează excelența
              în medicina stilului de viață prin educație, cercetare și colaborare.
            </p>
            
            {/* Congres Link */}
            <div className="mb-6">
              <a
                href="https://congres.aslm.ro"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors"
                style={{ backgroundColor: '#F0FDF4', color: '#166534' }}
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
                style={{ backgroundColor: '#F3F4F6', color: '#374151' }}
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/aslm.lifestylemedicine/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-colors hover:bg-green-100"
                style={{ backgroundColor: '#F3F4F6', color: '#374151' }}
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* About Links */}
          <div>
            <h3 
              className="font-bold text-sm mb-5 uppercase tracking-wider"
              style={{ color: '#166534' }}
            >
              Despre ASLM
            </h3>
            <ul className="space-y-3">
              {aboutLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="transition-colors font-medium hover:text-green-700"
                    style={{ color: '#4B5563' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h3 
              className="font-bold text-sm mb-5 uppercase tracking-wider mt-8"
              style={{ color: '#166534' }}
            >
              Membri
            </h3>
            <ul className="space-y-3">
              {memberLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="transition-colors font-medium hover:text-green-700"
                    style={{ color: '#4B5563' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 
              className="font-bold text-sm mb-5 uppercase tracking-wider"
              style={{ color: '#166534' }}
            >
              Resurse
            </h3>
            <ul className="space-y-3">
              {resourceLinks.map((link) => (
                <li key={link.href}>
                  {'external' in link && link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 transition-colors font-medium hover:text-green-700"
                      style={{ color: '#4B5563' }}
                    >
                      {link.label}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="transition-colors font-medium hover:text-green-700"
                      style={{ color: '#4B5563' }}
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>

            {/* Quick Links */}
            <div className="mt-8">
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm transition-colors hover:text-green-700"
                      style={{ color: '#6B7280' }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 
              className="font-bold text-sm mb-5 uppercase tracking-wider"
              style={{ color: '#166534' }}
            >
              Contact
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: '#166534' }} />
                <div>
                  <p className="font-medium" style={{ color: '#111827' }}>Str. Iuliu Maniu 41A</p>
                  <p style={{ color: '#4B5563' }}>Brașov, România</p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 flex-shrink-0" style={{ color: '#166534' }} />
                <a
                  href="mailto:contact@aslm.ro"
                  className="transition-colors font-medium hover:text-green-700"
                  style={{ color: '#4B5563' }}
                >
                  contact@aslm.ro
                </a>
              </li>
            </ul>

            {/* AMR Affiliation */}
            <div className="mt-6 pt-6" style={{ borderTop: '1px solid #E5E7EB' }}>
              <p 
                className="text-xs font-bold uppercase tracking-wider mb-3"
                style={{ color: '#166534' }}
              >
                Afiliere
              </p>
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 flex-shrink-0">
                  <Image
                    src="/images/amr-logo.png"
                    alt="AMR Logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: '#111827' }}>
                    AMR
                  </p>
                  <p className="text-xs" style={{ color: '#6B7280' }}>
                    Asociația Medicală Română
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={{ borderTop: '1px solid #E5E7EB', backgroundColor: '#F9FAFB' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <p className="text-sm" style={{ color: '#6B7280' }}>
              © {new Date().getFullYear()} Societatea Academică de Medicina Stilului de Viață.
              Toate drepturile rezervate.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
