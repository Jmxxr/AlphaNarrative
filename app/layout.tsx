import type { Metadata } from "next";
import { Manrope, Cormorant_Garamond, IBM_Plex_Mono } from "next/font/google";
import { Footer } from "./components/Footer";
import { Navigation } from "./components/Navigation";
import "./globals.css";

const sans = Manrope({ subsets: ["latin"], variable: "--font-sans" });
const serif = Cormorant_Garamond({ subsets: ["latin"], variable: "--font-serif", weight: ["400", "500", "600"] });
const mono = IBM_Plex_Mono({ subsets: ["latin"], variable: "--font-mono", weight: ["400", "500"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://alphanarrative.pro"),
  title: {
    default: "Alpha Narrative — Engineering Intelligence for Business",
    template: "%s | Alpha Narrative",
  },
  description: "Alpha Narrative designs and builds software, AI automation and intelligent business systems for ambitious companies.",
  applicationName: "Alpha Narrative",
  keywords: [
    "Alpha Narrative",
    "software development",
    "AI automation",
    "business systems",
    "business intelligence",
    "Nigeria",
    "Port Harcourt",
  ],
  authors: [{ name: "John Michael Abang" }],
  creator: "Alpha Narrative",
  publisher: "Alpha Narrative",
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: "/",
    siteName: "Alpha Narrative",
    title: "Alpha Narrative — Engineering Intelligence for Business",
    description:
      "Software, AI automation and connected business systems built for growth.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alpha Narrative — Engineering Intelligence for Business",
    description:
      "Software, AI automation and connected business systems built for growth.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sans.variable} ${serif.variable} ${mono.variable}`}><Navigation /><main>{children}</main><Footer /></body>
    </html>
  );
}
