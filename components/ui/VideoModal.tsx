"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const STORAGE_KEY = "aslm-video-modal-shown";
const DELAY_MS = 3000;

export default function VideoModal() {
  const [isOpen, setIsOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setIsOpen(false);
  }, []);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(STORAGE_KEY)) return;
    } catch {
      // sessionStorage unavailable (e.g. private browsing)
    }

    const timer = setTimeout(() => {
      setIsOpen(true);
      try {
        sessionStorage.setItem(STORAGE_KEY, "1");
      } catch {
        // ignore
      }
    }, DELAY_MS);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    closeButtonRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, close]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Video prezentare"
          className="fixed inset-0 flex items-center justify-center p-4 sm:p-6"
          style={{ zIndex: "var(--z-modal, 1050)" as unknown as number }}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 cursor-pointer"
            style={{
              backgroundColor: "var(--surface-overlay, rgba(0,0,0,0.5))",
              zIndex: -1,
            }}
            onClick={close}
            aria-hidden="true"
          />

          {/* Modal content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative w-full max-w-[900px]"
          >
            {/* Close button */}
            <button
              ref={closeButtonRef}
              onClick={close}
              aria-label="Închide"
              className="absolute -top-10 right-0 sm:-top-11 sm:-right-1 flex items-center justify-center w-8 h-8 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Video */}
            <div className="relative w-full rounded-xl overflow-hidden shadow-2xl bg-black aspect-video">
              <video
                ref={videoRef}
                controls
                playsInline
                preload="metadata"
                className="w-full h-full object-contain"
              >
                <source src="/videos/promo.mp4" type="video/mp4" />
              </video>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
