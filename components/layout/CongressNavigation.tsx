"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

export default function CongressNavigation({ locale, mobile = false }: { locale: "ro" | "en"; mobile?: boolean }) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const panelId = useId();
  const label = locale === "ro" ? "Congres" : "Congress";

  useEffect(() => {
    if (!open) return;
    const dismiss = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", dismiss);
    return () => document.removeEventListener("pointerdown", dismiss);
  }, [open]);

  return (
    <div
      ref={root}
      className="relative"
      onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false); }}
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          event.preventDefault();
          event.stopPropagation();
          setOpen(false);
          toggle.current?.focus();
        }
      }}
    >
      <div className="flex items-stretch rounded-lg text-gray-700 hover:bg-green-50">
        <a href="https://congres.aslm.ro/" target="_blank" rel="noopener noreferrer" className={`flex-1 rounded-l-lg py-2 font-semibold hover:text-green-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800 ${mobile ? "px-3 text-gray-800" : "px-2 2xl:px-2.5 text-sm text-gray-700"}`}>
          {label}
        </a>
        <button
          ref={toggle}
          type="button"
          aria-label={locale === "ro" ? "Ediții congres" : "Congress editions"}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen(!open)}
          onKeyDown={(event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              setOpen(true);
              requestAnimationFrame(() => root.current?.querySelector<HTMLAnchorElement>("[data-editions] a")?.focus());
            }
          }}
          className="rounded-r-lg px-2 hover:text-green-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800"
        >
          <ChevronDown aria-hidden="true" className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
        </button>
      </div>
      <div id={panelId} data-editions hidden={!open} className={mobile ? "pt-2" : "absolute left-0 top-full z-10 mt-1 w-40 rounded-xl border border-gray-100 bg-white py-2 shadow-lg"}>
        <a href="https://congres.aslm.ro/" target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 focus-visible:outline-2 focus-visible:outline-green-800">2027</a>
        <a href="https://congres2026.aslm.ro/" target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 focus-visible:outline-2 focus-visible:outline-green-800">2026</a>
      </div>
    </div>
  );
}
