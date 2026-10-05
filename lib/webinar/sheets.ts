import { OPTION_LABELS } from "./config";
import { PAYMENT_LABELS, type Registration, type Order } from "./model";

export function sheetValues(r: Registration, reference: string | null, orderStatus?: Order["status"] | null) {
  const status = r.review_required ? "Plăți multiple – verificare ASLM" : r.late_payment ? "Plătit după încheiere – verificare ASLM" : r.status === "pending" && orderStatus === "failed" ? "Plată eșuată / anulată – poate reîncerca" : PAYMENT_LABELS[r.status];
  return [r.id, new Intl.DateTimeFormat("ro-RO", { dateStyle: "short", timeStyle: "short", timeZone: "Europe/Bucharest" }).format(new Date(r.created_at)), r.name, r.email, r.phone, OPTION_LABELS[r.option], r.amount_bani / 100, status, reference || ""];
}
