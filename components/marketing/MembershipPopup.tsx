"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CalendarDays, HeartHandshake, X } from "lucide-react";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { MEMBERSHIP_JOIN_URL } from "@/lib/localized-routes";

const POPUP_SESSION_KEY = "aslm-membership-popup-dismissed";

export default function MembershipPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
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
    dialogRef.current?.focus({ preventScroll: true });

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
            tabIndex={-1}
            className="relative grid max-h-[calc(100vh-1.5rem)] w-full max-w-[1380px] overflow-y-auto rounded-[26px] bg-white shadow-[0_28px_80px_rgba(8,28,21,0.34)] focus:outline-none lg:grid-rows-[1fr_auto]"
            style={{ outline: "none" }}
            initial={{ opacity: 0, scale: 0.96, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 18 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            onKeyDown={handleKeyDown}
          >
            <button
              type="button"
              aria-label="Închide popup-ul"
              onClick={closePopup}
              className="absolute right-5 top-5 z-20 inline-flex h-12 w-12 items-center justify-center text-[#082b27] transition hover:scale-105 hover:text-[#1f8f2e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1f8f2e] sm:right-8 sm:top-8"
            >
              <X className="h-9 w-9 stroke-[2.4]" aria-hidden="true" />
            </button>

            <div className="grid lg:min-h-[895px] lg:grid-cols-[1.05fr_0.95fr]">
              <div className="relative min-h-[330px] overflow-hidden bg-[#eef4ef] sm:min-h-[470px] lg:min-h-full">
                <Image
                  src="/images/membership-popup-doctor.jpg"
                  alt="Profesionist medical"
                  fill
                  sizes="(min-width: 1024px) 52vw, 100vw"
                  priority
                  className="object-cover object-[50%_28%] brightness-[1.16] contrast-[1.03] saturate-[1.04]"
                />
                <div className="absolute inset-y-0 right-0 hidden w-28 bg-gradient-to-l from-white/80 to-transparent lg:block" />
              </div>

              <div className="flex flex-col justify-center px-8 py-10 sm:px-12 lg:px-16 xl:px-20">
                <div className="max-w-[540px]">
                  <div
                    id={titleId}
                    role="heading"
                    aria-level={2}
                    className="font-sans text-[4.7rem] font-black leading-[0.98] tracking-normal text-[#082b27] sm:text-[6rem] lg:text-[5.9rem] xl:text-[7.1rem]"
                  >
                    Devino
                    <br />
                    membru
                    <br />
                    <span className="text-[#45a536]">în ASLM</span>
                  </div>

                  <div className="mt-9 h-1.5 w-24 rounded-full bg-[#21943c]" />

                  <div className="mt-12 flex items-center gap-7">
                    <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-full bg-[#eaf3e9]">
                      <HeartHandshake className="h-16 w-16 text-[#1c9638]" strokeWidth={1.9} aria-hidden="true" />
                    </div>
                    <p className="max-w-[390px] text-[2rem] font-semibold leading-[1.27] tracking-normal !text-[#082b27]">
                      Descoperă beneficiile și avantajele dedicate membrilor
                      ASLM.
                    </p>
                  </div>

                  <div className="mt-16 flex items-center gap-7 rounded-xl bg-[#eef6ed] px-5 py-5 sm:px-6">
                    <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-[#71bd61] text-white">
                      <CalendarDays className="h-10 w-10" strokeWidth={2.2} aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-[1.65rem] font-medium leading-tight !text-[#082b27]">
                        Ofertă valabilă în perioada
                      </p>
                      <p className="mt-1 text-[1.65rem] font-black leading-tight !text-[#15912f]">
                        5.06.2026 – 31.07.2026
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-[#e1e6e2] bg-white px-7 py-7 sm:px-12 lg:px-[72px]">
              <a
                href={MEMBERSHIP_JOIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closePopup}
                className="ml-auto flex min-h-[112px] w-full items-center justify-center gap-8 rounded-xl bg-[#1c9638] px-8 text-center text-3xl font-semibold leading-tight !text-white shadow-[0_16px_34px_rgba(20,115,45,0.28)] transition hover:bg-[#15852f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1f8f2e] focus-visible:ring-offset-2 lg:max-w-[700px]"
              >
                Află mai multe despre Membership
                <ArrowRight className="h-10 w-10 shrink-0" strokeWidth={2.2} aria-hidden="true" />
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
