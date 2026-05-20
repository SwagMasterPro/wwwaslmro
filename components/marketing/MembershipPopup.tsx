"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";

const POPUP_SESSION_KEY = "aslm-membership-popup-dismissed";

const benefits = [
  "Platforma ASLM — hub digital de resurse și oportunități",
  "MedScience Center — certificate EMC/EFC, reviste și publicații",
  "Sistem integrat de parcurs profesional și certificări",
  "Certificat LMRR inclus + Kit oficial ASLM",
  "Acces prioritar la congrese, proiecte și inițiative ASLM",
  "Rețea națională selectată de profesioniști medicali",
];

export default function MembershipPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const titleId = useId();

  const markDismissed = useCallback(() => {
    try {
      window.sessionStorage.setItem(POPUP_SESSION_KEY, "true");
    } catch {
      // Storage can be unavailable in strict privacy modes; dismissal should still work.
    }
  }, []);

  const closePopup = useCallback(() => {
    markDismissed();
    setIsOpen(false);
  }, [markDismissed]);

  useEffect(() => {
    try {
      if (window.sessionStorage.getItem(POPUP_SESSION_KEY) === "true") {
        return;
      }
    } catch {
      // If storage is blocked, still show the popup once for this render lifecycle.
    }

    const timer = window.setTimeout(() => {
      previousFocusRef.current = document.activeElement as HTMLElement | null;
      setIsOpen(true);
    }, 3000);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      previousFocusRef.current?.focus?.();
    };
  }, [isOpen]);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      closePopup();
      return;
    }

    if (event.key !== "Tab" || !dialogRef.current) {
      return;
    }

    const focusableElements = Array.from(
      dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
      )
    ).filter((element) => !element.hasAttribute("disabled"));

    if (focusableElements.length === 0) {
      return;
    }

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[1040] flex items-center justify-center bg-[#5f7469]/90 p-3 sm:p-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closePopup();
            }
          }}
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="relative grid max-h-[calc(100vh-1.5rem)] w-full max-w-[1440px] overflow-y-auto rounded-[28px] bg-white shadow-[0_28px_80px_rgba(8,28,21,0.32)] lg:grid-cols-[minmax(320px,520px)_1fr] lg:overflow-hidden"
            initial={{ opacity: 0, scale: 0.96, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 18 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            onKeyDown={handleKeyDown}
          >
            <h2 id={titleId} className="sr-only">
              Devino membru ASLM
            </h2>

            <button
              ref={closeButtonRef}
              type="button"
              aria-label="Închide popup-ul"
              onClick={closePopup}
              className="absolute right-4 top-4 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/95 text-[#173f31] shadow-lg ring-1 ring-black/10 transition hover:bg-[#edf5e1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#40916c]"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>

            <div className="relative min-h-[230px] overflow-hidden bg-[#dfe5e1] lg:min-h-[720px]">
              <Image
                src="/images/membership-popup-doctor.jpg"
                alt="Profesionist medical într-un spital"
                fill
                sizes="(min-width: 1024px) 520px, 100vw"
                priority
                className="object-cover object-[50%_34%]"
              />
              <div className="absolute inset-0 bg-[#123b2d]/35" />
              <div className="absolute bottom-6 left-6 right-6 rounded-2xl bg-[#143f32]/95 p-5 shadow-2xl backdrop-blur-sm sm:bottom-9 sm:left-8 sm:right-auto sm:w-[400px]">
                <p className="mb-2 text-xl font-extrabold leading-tight text-[#bdebd4] sm:text-2xl">
                  Profesioniști medicali
                </p>
                <p className="text-base font-semibold leading-relaxed text-white sm:text-xl">
                  Comunitate academică activă la standarde înalte
                </p>
              </div>
            </div>

            <div className="px-5 py-7 sm:px-8 sm:py-9 lg:max-h-[calc(100vh-1.5rem)] lg:overflow-y-auto lg:px-12 lg:py-8 xl:px-12">
              <div className="max-w-[820px]">
                <div className="mb-5 inline-flex rounded-lg border border-[#badb83] bg-[#f0f7de] px-5 py-2 text-base font-medium text-[#467725] sm:text-lg">
                  Membru afiliat AMR
                </div>

                <div className="mb-8 rounded-r-xl border-l-[5px] border-[#5e9b37] bg-[#edf5e1] px-5 py-5 sm:px-6">
                  <p className="text-xl font-medium leading-[1.6] text-[#2f4e1f] sm:text-2xl">
                    Un ecosistem dedicat profesioniștilor medicali care aleg un
                    standard ridicat de practică, educație continuă și
                    comunitate academică activă.
                  </p>
                </div>

                <p className="mb-4 text-sm font-bold uppercase tracking-[0.12em] text-[#8b8a84] sm:text-base">
                  Beneficii incluse în membership
                </p>

                <ul className="mb-5 space-y-3">
                  {benefits.map((benefit) => (
                    <li
                      key={benefit}
                      className="flex min-h-[58px] items-center gap-4 rounded-xl border border-[#d2cec5] bg-[#fbfaf8] px-5 py-3 text-lg font-medium leading-snug text-[#2b2b2b] sm:text-xl"
                    >
                      <span
                        className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#2f7a61]"
                        aria-hidden="true"
                      />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>

                <div className="mb-4 flex flex-col gap-4 rounded-2xl bg-[#143f32] p-5 text-white sm:flex-row sm:items-center sm:px-6">
                  <div className="flex h-[68px] w-[110px] shrink-0 flex-col items-center justify-center rounded-xl bg-[#ffd27a] text-[#3a2b12]">
                    <span className="text-2xl font-extrabold leading-none">
                      20%
                    </span>
                    <span className="text-base font-semibold leading-tight">
                      reducere
                    </span>
                  </div>
                  <p className="text-lg font-extrabold leading-relaxed sm:text-xl">
                    La achiziționarea Cărții Congresului ASLM — beneficiu
                    exclusiv membri
                  </p>
                </div>

                <div className="mb-7 flex items-center gap-4 rounded-xl border border-[#d2cec5] bg-[#fbfaf8] px-5 py-4">
                  <span
                    className="h-16 w-16 shrink-0 rounded-xl border border-[#9be2d0] bg-[#e5f7f2]"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="text-lg font-extrabold leading-snug text-[#173f31] sm:text-xl">
                      Reînnoire anuală automată
                    </p>
                    <p className="text-sm font-semibold leading-snug text-[#8f8a82] sm:text-base">
                      Accesul se reînnoiește automat în fiecare an. Poți anula
                      oricând.
                    </p>
                  </div>
                </div>

                <Link
                  href="/membri#payment-details"
                  onClick={markDismissed}
                  className="mb-4 flex min-h-[76px] w-full items-center justify-center rounded-2xl bg-[#143f32] px-6 text-center text-xl font-extrabold leading-snug text-white transition hover:bg-[#0f2f25] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#40916c] focus-visible:ring-offset-2 sm:text-2xl"
                >
                  Devino membru ASLM — activează până la 1 iulie
                </Link>

                <p className="text-center text-base font-semibold text-[#8b8a84] sm:text-lg">
                  Structura de beneficii se actualizează după data limită
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
