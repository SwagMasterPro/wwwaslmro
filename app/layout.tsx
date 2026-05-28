import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MembershipPopup from "@/components/marketing/MembershipPopup";
import StructuredData from "@/components/seo/StructuredData";
import { generateOrganizationSchema, generateWebSiteSchema } from "@/lib/structured-data";
import { generateHomeMetadata } from "@/lib/metadata-helpers";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "latin-ext"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin", "latin-ext"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  ...generateHomeMetadata(),
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro" className="scroll-smooth">
      <head>
        <StructuredData data={[generateOrganizationSchema(), generateWebSiteSchema()]} />
      </head>
      <body
        className={`${playfair.variable} ${jakarta.variable} antialiased min-h-screen flex flex-col font-sans bg-[var(--color-background)] selection:bg-[var(--color-accent)] selection:text-white`}
      >
        <Header />
        <main className="flex-1 w-full overflow-x-hidden">
          {children}
        </main>
        <Footer />
        <MembershipPopup />
      </body>
    </html>
  );
}
