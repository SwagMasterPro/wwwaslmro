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
import { usePathname } from "next/navigation";
import { isEnglishPath, MEMBERSHIP_JOIN_URL } from "@/lib/localized-routes";

const POPUP_SESSION_KEY = "aslm-membership-popup-dismissed";

export default function MembershipPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const titleId = useId();
  const pathname = usePathname();
  const isEnglish = isEnglishPath(pathname);

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
          className="fixed inset-0 z-[1040] flex items-center justify-center overflow-y-auto bg-[#5f7469]/90 p-2 sm:p-4"
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
            className="relative flex max-h-[calc(100dvh-1rem)] min-h-0 w-full max-w-[1180px] flex-col overflow-hidden rounded-[24px] bg-white shadow-[0_28px_80px_rgba(8,28,21,0.34)] focus:outline-none sm:max-h-[calc(100dvh-2rem)]"
            style={{ outline: "none" }}
            initial={{ opacity: 0, scale: 0.96, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 18 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            onKeyDown={handleKeyDown}
          >
            <button
              type="button"
              aria-label={isEnglish ? "Close membership popup" : "Închide popup-ul"}
              onClick={closePopup}
              className="absolute right-3 top-3 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-[#082b27] shadow-sm transition hover:scale-105 hover:text-[#1f8f2e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1f8f2e] sm:right-5 sm:top-5"
            >
              <X className="h-9 w-9 stroke-[2.4]" aria-hidden="true" />
            </button>

            <div className="grid min-h-0 flex-1 lg:grid-cols-[1fr_1fr]">
              <div className="relative h-[clamp(150px,28vh,270px)] min-h-0 overflow-hidden bg-[#eef4ef] sm:h-[290px] lg:h-auto lg:min-h-0">
                <Image
                  src="/images/membership-popup-doctor.jpg"
                  alt="Profesionist medical"
                  fill
                  sizes="(min-width: 1024px) 52vw, 100vw"
                  priority
                  className="object-cover object-[50%_28%] brightness-[1.16] contrast-[1.03] saturate-[1.04]"
                />
                <div className="absolute inset-y-0 right-0 hidden w-24 bg-gradient-to-l from-white/80 to-transparent lg:block" />
              </div>

              <div className="min-h-0 overflow-y-auto px-5 py-7 sm:px-8 sm:py-9 lg:flex lg:flex-col lg:justify-center lg:px-12 xl:px-14">
                <div className="mx-auto w-full max-w-[500px]">
                  <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-[#45a536]">
                    {isEnglish ? "ASLM membership" : "Membri ASLM"}
                  </p>
                  <div
                    id={titleId}
                    role="heading"
                    aria-level={2}
                    className="font-sans text-[clamp(2.8rem,8vw,4.8rem)] font-black leading-[0.92] tracking-[-0.04em] text-[#082b27]"
                  >
                    {isEnglish ? "Become" : "Devino"}
                    <br />
                    {isEnglish ? "a member" : "membru"}
                    <br />
                    <span className="text-[#45a536]">{isEnglish ? "of ASLM" : "în ASLM"}</span>
                  </div>

                  <div className="mt-6 h-1.5 w-16 rounded-full bg-[#21943c]" />

                  <div className="mt-7 flex items-center gap-4 sm:mt-9 sm:gap-5">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#eaf3e9] sm:h-20 sm:w-20">
                      <HeartHandshake className="h-9 w-9 text-[#1c9638] sm:h-11 sm:w-11" strokeWidth={1.9} aria-hidden="true" />
                    </div>
                    <p className="max-w-[360px] text-base font-semibold leading-[1.3] tracking-normal !text-[#082b27] sm:text-xl">
                      {isEnglish
                        ? "Discover the benefits and advantages available to ASLM members."
                        : "Descoperă beneficiile și avantajele dedicate membrilor ASLM."}
                    </p>
                  </div>

                  <div className="mt-8 flex items-center gap-4 rounded-xl bg-[#eef6ed] px-4 py-4 sm:mt-10 sm:gap-5 sm:px-5">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#71bd61] text-white sm:h-16 sm:w-16">
                      <CalendarDays className="h-7 w-7 sm:h-8 sm:w-8" strokeWidth={2.2} aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-sm font-medium leading-tight !text-[#082b27] sm:text-base">
                        {isEnglish ? "Offer valid from" : "Ofertă valabilă în perioada"}
                      </p>
                      <p className="mt-1 text-base font-black leading-tight !text-[#15912f] sm:text-lg">
                        {isEnglish ? "5 June 2026 – 31 July 2026" : "5.06.2026 – 31.07.2026"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-[#e1e6e2] bg-white px-4 py-4 sm:px-8 sm:py-5 lg:px-10">
              <a
                href={MEMBERSHIP_JOIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closePopup}
                className="mx-auto flex min-h-14 w-full items-center justify-center gap-3 rounded-xl bg-[#1c9638] px-5 py-3 text-center text-base font-semibold leading-tight !text-white shadow-[0_12px_26px_rgba(20,115,45,0.24)] transition hover:bg-[#15852f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1f8f2e] focus-visible:ring-offset-2 sm:min-h-16 sm:gap-4 sm:px-7 sm:text-lg"
              >
                {isEnglish ? "Learn more about membership" : "Află mai multe despre Membership"}
                <ArrowRight className="h-5 w-5 shrink-0 sm:h-6 sm:w-6" strokeWidth={2.2} aria-hidden="true" />
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
