import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://alphanarrative.pro"),
  title: {
    default: "Alpha Narrative — Engineering Intelligence for Business",
    template: "%s | Alpha Narrative",
  },
  description:
    "Alpha Narrative builds software, AI automation and intelligent business systems that help companies operate efficiently and grow.",
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
  alternates: {
    canonical: "/",
  },
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
      <body>{children}</body>
    </html>
  );
}
