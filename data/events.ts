export type EventLifecycle = "completed" | "scheduled" | "accreditation-pending";

export type EmcStatus = "confirmed" | "pending" | "not-offered" | "verify-on-event-page";

export type EventRecord = {
  slug: string;
  title: string;
  summary: string;
  lifecycle: EventLifecycle;
  startDate: string;
  endDate?: string;
  displayDate: string;
  location: string;
  format: "Fizic" | "Online" | "Hibrid";
  image: { src: string; alt: string };
  detailsUrl?: string;
  registrationUrl?: string;
  emc: {
    status: EmcStatus;
    details: string;
  };
  featured?: boolean;
};

/**
 * Single editorial source for the calendar and event-specific structured data.
 * Add future events here only after their dates, location, registration URL and
 * accreditation status have been approved by ASLM.
 */
export const events: EventRecord[] = [
  {
    slug: "congres-inaugural-aslm-2026",
    title: "Congresul Inaugural ASLM",
    summary:
      "Primul congres al Societății Academice de Medicina Stilului de Viață a avut loc în format hibrid, cu sesiuni tematice, speakeri invitați și activități științifice interdisciplinare.",
    lifecycle: "completed",
    startDate: "2026-05-10",
    endDate: "2026-05-12",
    displayDate: "10–12 mai 2026",
    location: "Universitatea Transilvania, Brașov",
    format: "Hibrid",
    image: {
      src: "/images/banner-congres-2026.png",
      alt: "Congresul Inaugural ASLM 2026 – Interdisciplinaritate în medicina stilului de viață",
    },
    detailsUrl: "https://congres.aslm.ro",
    emc: {
      status: "verify-on-event-page",
      details: "Consultă materialele oficiale ale evenimentului pentru statutul și condițiile creditării EMC.",
    },
    featured: true,
  },
  {
    slug: "webinar-introducere-msv-2026",
    title: "Webinar: Introducere în medicina stilului de viață",
    summary: "Webinar introductiv despre principiile de bază ale medicinei stilului de viață.",
    lifecycle: "completed",
    startDate: "2026-01-01",
    displayDate: "ianuarie 2026",
    location: "Online",
    format: "Online",
    image: {
      src: "/images/aslm-og.png",
      alt: "Identitatea vizuală ASLM",
    },
    emc: {
      status: "verify-on-event-page",
      details: "Statutul EMC se verifică în comunicările oficiale ale evenimentului.",
    },
  },
  {
    slug: "workshop-nutritie-plant-based-2025",
    title: "Workshop: Nutriție Plant-Based",
    summary: "Workshop practic despre alimentația bazată pe plante în practica clinică.",
    lifecycle: "completed",
    startDate: "2025-12-01",
    displayDate: "decembrie 2025",
    location: "România",
    format: "Fizic",
    image: {
      src: "/images/aslm-og.png",
      alt: "Identitatea vizuală ASLM",
    },
    emc: {
      status: "verify-on-event-page",
      details: "Statutul EMC se verifică în comunicările oficiale ale evenimentului.",
    },
  },
];

export const upcomingConfirmedEvents = events.filter((event) => event.lifecycle === "scheduled");

export const completedEvents = events.filter((event) => event.lifecycle === "completed");
