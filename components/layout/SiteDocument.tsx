import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AnalyticsConsentBanner from "@/components/analytics/AnalyticsConsentBanner";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import MembershipPopupLoader from "@/components/marketing/MembershipPopupLoader";
import StructuredData from "@/components/seo/StructuredData";
import { generateOrganizationSchema, generateWebSiteSchema } from "@/lib/structured-data";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "latin-ext"],
  display: "optional",
  weight: ["400", "500", "600", "700", "800"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin", "latin-ext"],
  display: "optional",
  weight: ["300", "400", "500", "600", "700"],
});

export default function SiteDocument({
  children,
  lang,
}: Readonly<{
  children: React.ReactNode;
  lang: "ro" | "en";
}>) {
  return (
    <html lang={lang} className="scroll-smooth">
      {/* Root documents require a literal head so JSON-LD is present in the initial HTML. */}
      {/* eslint-disable-next-line @next/next/no-head-element */}
      <head>
        <StructuredData data={[generateOrganizationSchema(), generateWebSiteSchema()]} />
      </head>
      <body
        className={`${playfair.variable} ${jakarta.variable} antialiased min-h-screen flex flex-col font-sans bg-[var(--color-background)] selection:bg-[var(--color-accent)] selection:text-white`}
      >
        <Header locale={lang} />
        <main className="flex-1 w-full overflow-x-hidden">{children}</main>
        <Footer />
        <MembershipPopupLoader />
        <AnalyticsConsentBanner />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
