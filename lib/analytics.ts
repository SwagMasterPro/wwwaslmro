export const ANALYTICS_CONSENT_KEY = "aslm-analytics-consent";
export const ANALYTICS_CONSENT_EVENT = "aslm-analytics-consent-changed";

export type AnalyticsConsent = "granted" | "denied";
export type MembershipAnalyticsEvent = "view_membership" | "select_membership_type" | "begin_membership";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function getAnalyticsConsent(): AnalyticsConsent | null {
  if (typeof window === "undefined") return null;
  const stored = window.localStorage.getItem(ANALYTICS_CONSENT_KEY);
  return stored === "granted" || stored === "denied" ? stored : null;
}

export function setAnalyticsConsent(consent: AnalyticsConsent): void {
  window.localStorage.setItem(ANALYTICS_CONSENT_KEY, consent);
  window.dispatchEvent(new Event(ANALYTICS_CONSENT_EVENT));
}

export function trackMembershipEvent(
  eventName: MembershipAnalyticsEvent,
  parameters: Record<string, string> = {},
): void {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", eventName, { ...parameters, destination: "membership.aslm.ro" });
}

export function getMembershipJoinUrl(source: string): string {
  const url = new URL("https://membership.aslm.ro/");
  url.searchParams.set("utm_source", "aslm.ro");
  url.searchParams.set("utm_medium", "referral");
  url.searchParams.set("utm_campaign", "membership");
  url.searchParams.set("utm_content", source);
  return url.toString();
}
