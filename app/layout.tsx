import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StructuredData from "@/components/seo/StructuredData";
import { generateOrganizationSchema } from "@/lib/structured-data";

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
  title: "ASLM | Societatea Academică de Medicina Stilului de Viață",
  description: "Societatea Academică de Medicina Stilului de Viață (ASLM) promovează excelența în medicina stilului de viață prin educație, cercetare și colaborare profesională în România. Membru afiliat AMR.",
  keywords: [
    "medicina stilului de viață",
    "lifestyle medicine",
    "ASLM",
    "România",
    "sănătate",
    "prevenție",
    "boli cronice",
    "alimentație echilibrată",
    "activitate fizică",
    "somn de calitate",
    "gestionare stres",
    "relații sociale",
    "AMR",
    "congres medical",
    "educație medicală continuă",
    "EMC"
  ],
  authors: [{ name: "ASLM" }],
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
  openGraph: {
    title: "ASLM | Societatea Academică de Medicina Stilului de Viață",
    description: "Promovăm excelența în medicina stilului de viață prin educație, cercetare și colaborare profesională în România. Membru afiliat AMR, Congres 2026.",
    url: "https://aslm.ro",
    siteName: "ASLM - Societatea Academică de Medicina Stilului de Viață",
    type: "website",
    locale: "ro_RO",
    images: [
      {
        url: "https://aslm.ro/images/aslm-logo.png",
        width: 1200,
        height: 630,
        alt: "ASLM Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ASLM | Societatea Academică de Medicina Stilului de Viață",
    description: "Promovăm excelența în medicina stilului de viață prin educație, cercetare și colaborare profesională în România.",
    images: ["https://aslm.ro/images/aslm-logo.png"],
  },
  alternates: {
    canonical: "https://aslm.ro",
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
        <StructuredData data={generateOrganizationSchema()} />
      </head>
      <body
        className={`${playfair.variable} ${jakarta.variable} antialiased min-h-screen flex flex-col font-sans bg-[var(--color-background)] selection:bg-[var(--color-accent)] selection:text-white`}
      >
        <Header />
        <main className="flex-1 w-full overflow-x-hidden">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
