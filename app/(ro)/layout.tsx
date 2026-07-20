import "../globals.css";
import SiteDocument from "@/components/layout/SiteDocument";
import { rootMetadata } from "@/lib/root-metadata";

export const metadata = rootMetadata;

export default function RomanianRootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <SiteDocument lang="ro">{children}</SiteDocument>;
}
