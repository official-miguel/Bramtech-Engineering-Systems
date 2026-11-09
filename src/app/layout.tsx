import type { Metadata, Viewport } from "next";
import { Archivo, Public_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StickyContactBar } from "@/components/StickyContactBar";
import { SmoothScroll } from "@/components/SmoothScroll";
import { ScrollProgress } from "@/components/ScrollProgress";
import { JsonLd } from "@/components/JsonLd";
import { localBusiness } from "@/lib/schema";
import { site } from "@/content/site";

const archivo = Archivo({ subsets: ["latin"], weight: ["800"], variable: "--font-archivo", display: "swap" });
const publicSans = Public_Sans({ subsets: ["latin"], variable: "--font-public", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "Bramtech Engineering Systems | Solar, electrical, CCTV, sound", template: "%s | Bramtech" },
  description:
    "Solar, electrical, CCTV, electric fence, sound and machinery installation in Kenya. Sound equipment hire for events. Free site survey.",
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_KE",
    images: [{ url: "/images/solar/team-installing-inverter.jpg", width: 1476, height: 1820, alt: "Bramtech installers fitting a hybrid inverter" }],
  },
  alternates: { canonical: "./" },
};

export const viewport: Viewport = { themeColor: "#0F2238", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const plausible = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  return (
    <html lang="en" className={`${archivo.variable} ${publicSans.variable}`}>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SmoothScroll />
        <ScrollProgress />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <StickyContactBar />
        <JsonLd data={localBusiness()} />
        {plausible && (
          <Script defer data-domain={plausible} src="https://plausible.io/js/script.js" strategy="afterInteractive" />
        )}
      </body>
    </html>
  );
}
