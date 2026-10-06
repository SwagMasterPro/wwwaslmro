import { OPTION_LABELS } from "./config";
import { type Registration } from "./model";

export function sheetValues(r: Registration) {
  // Retain the existing table layout; ticket amount/order columns stay empty.
  return [r.id, new Intl.DateTimeFormat("ro-RO", { dateStyle: "short", timeStyle: "short", timeZone: "Europe/Bucharest" }).format(new Date(r.created_at)), r.name, r.email, r.phone, OPTION_LABELS[r.option], "", "Solicitare primită", ""];
}
