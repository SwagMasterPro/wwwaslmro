import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

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
  description: "Societatea Academică de Medicina Stilului de Viață (ASLM) promovează excelența în medicina stilului de viață prin educație, cercetare și colaborare profesională în România.",
  keywords: ["medicina stilului de viață", "lifestyle medicine", "ASLM", "România", "sănătate", "prevenție", "boli cronice"],
  authors: [{ name: "ASLM" }],
  openGraph: {
    title: "ASLM | Societatea Academică de Medicina Stilului de Viață",
    description: "Promovăm excelența în medicina stilului de viață prin educație, cercetare și colaborare profesională.",
    type: "website",
    locale: "ro_RO",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro" className="scroll-smooth">
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
