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
import { isEnglishPath } from "@/lib/localized-routes";
import { MEMBERSHIP_DIALOG_OPEN_EVENT } from "@/components/marketing/membership-dialog-events";
import MembershipJoinLink from "@/components/marketing/MembershipJoinLink";

export default function MembershipPopup({ initialOpen = false }: { initialOpen?: boolean }) {
  const [isOpen, setIsOpen] = useState(initialOpen);
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const titleId = useId();
  const descriptionId = useId();
  const pathname = usePathname();
  const isEnglish = isEnglishPath(pathname);

  const closePopup = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    const openPopup = () => {
      previousFocusRef.current = document.activeElement as HTMLElement | null;
      setIsOpen(true);
    };

    window.addEventListener(MEMBERSHIP_DIALOG_OPEN_EVENT, openPopup);
    return () => window.removeEventListener(MEMBERSHIP_DIALOG_OPEN_EVENT, openPopup);
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
          className="fixed inset-0 z-[1040] flex items-center justify-center overflow-y-auto bg-[#5f7469]/90 p-3 sm:p-5"
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
            aria-describedby={descriptionId}
            tabIndex={-1}
            className="relative flex min-h-0 w-full max-w-[1080px] flex-col overflow-hidden rounded-[22px] bg-white shadow-[0_28px_80px_rgba(8,28,21,0.34)] focus:outline-none max-h-[calc(100dvh-1.5rem)] sm:max-h-[calc(100dvh-2.5rem)]"
            style={{ outline: "none" }}
            initial={{ opacity: 0, scale: 0.96, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 18 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            onKeyDown={handleKeyDown}
          >
            <button
              type="button"
              aria-label={isEnglish ? "Close membership popup" : "Închide fereastra de înscriere"}
              onClick={closePopup}
              className="absolute right-3 top-3 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-[#082b27] shadow-md transition hover:scale-105 hover:text-[#1f8f2e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1f8f2e] sm:right-5 sm:top-5"
            >
              <X className="h-5 w-5 stroke-[2.5]" aria-hidden="true" />
            </button>

            <div className="grid min-h-0 flex-1 grid-cols-1 overflow-y-auto lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:overflow-hidden">
              <div className="relative min-h-[clamp(155px,24dvh,240px)] max-h-[240px] overflow-hidden bg-[#eef4ef] lg:h-auto lg:min-h-0 lg:max-h-none">
                <Image
                  src="/images/membership-popup-doctor.webp"
                  alt={isEnglish ? "Medical professional" : "Profesionist medical"}
                  fill
                  sizes="(min-width: 1024px) 43vw, 100vw"
                  className="object-cover object-[50%_28%] brightness-[1.16] contrast-[1.03] saturate-[1.04]"
                />
                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#082b27]/20 to-transparent lg:inset-y-0 lg:right-0 lg:left-auto lg:h-auto lg:w-24 lg:bg-gradient-to-l lg:from-white/80 lg:to-transparent" />
              </div>

              <div className="flex min-h-0 items-center overflow-y-auto px-5 py-8 sm:px-9 sm:py-10 lg:px-12 xl:px-14">
                <div className="mx-auto w-full max-w-[500px] min-w-0">
                  <p className="mb-3 text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[#45a536] sm:text-xs">
                    {isEnglish ? "ASLM membership" : "Înscriere în ASLM"}
                  </p>

                  <h2
                    id={titleId}
                    className="max-w-[12ch] text-[clamp(2.65rem,8vw,4.7rem)] font-black leading-[0.94] tracking-[-0.055em] text-[#082b27]"
                  >
                    {isEnglish ? "Become an" : "Devino membru"}
                    <span className="block text-[#45a536]">
                      {isEnglish ? "ASLM member" : "ASLM"}
                    </span>
                  </h2>

                  <div className="mt-5 h-1.5 w-14 rounded-full bg-[#21943c] sm:mt-7 sm:w-16" />

                  <div className="mt-6 flex items-start gap-3 sm:mt-8 sm:gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#eaf3e9] sm:h-14 sm:w-14">
                      <HeartHandshake className="h-7 w-7 text-[#1c9638] sm:h-8 sm:w-8" strokeWidth={1.9} aria-hidden="true" />
                    </div>
                    <p
                      id={descriptionId}
                      className="min-w-0 pt-1 text-[0.98rem] font-semibold leading-[1.35] text-[#082b27] sm:text-lg"
                    >
                      {isEnglish
                        ? "Discover the benefits and advantages available to ASLM members."
                        : "Descoperă beneficiile și avantajele disponibile membrilor ASLM."}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center gap-3 rounded-xl bg-[#eef6ed] px-3.5 py-3.5 sm:mt-8 sm:gap-4 sm:px-4 sm:py-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#71bd61] text-white sm:h-14 sm:w-14">
                      <CalendarDays className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={2.2} aria-hidden="true" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[0.78rem] font-semibold leading-tight text-[#174f3d] sm:text-sm">
                        {isEnglish ? "Offer valid from" : "Ofertă valabilă în perioada"}
                      </p>
                      <p className="mt-1 break-words text-[0.98rem] font-black leading-tight text-[#15912f] sm:text-base">
                        {isEnglish
                          ? "5 June 2026 – 31 July 2026"
                          : "5 iunie 2026 – 31 iulie 2026"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="shrink-0 border-t border-[#e1e6e2] bg-white px-4 py-3.5 sm:px-8 sm:py-4 lg:px-10">
              <MembershipJoinLink
                source="membership_popup"
                onClick={closePopup}
                className="mx-auto flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#1c9638] px-4 py-3 text-center text-[0.95rem] font-semibold leading-tight text-white shadow-[0_12px_26px_rgba(20,115,45,0.24)] transition hover:bg-[#15852f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1f8f2e] focus-visible:ring-offset-2 sm:min-h-14 sm:gap-3 sm:px-6 sm:text-base"
              >
                <span className="min-w-0 break-words">
                  {isEnglish
                    ? "Learn more about ASLM membership"
                    : "Află mai multe despre calitatea de membru"}
                </span>
                <ArrowRight className="h-5 w-5 shrink-0" strokeWidth={2.2} aria-hidden="true" />
              </MembershipJoinLink>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
