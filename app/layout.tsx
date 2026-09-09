import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.alphanarrative.pro"),
  title: {
    default: "Alpha Narrative — Strategy & Product Engineering",
    template: "%s | Alpha Narrative",
  },
  description:
    "Alpha Narrative builds strategy, product, and digital infrastructure for Nigeria's informal economy.",
  applicationName: "Alpha Narrative",
  keywords: [
    "Alpha Narrative",
    "product engineering",
    "product strategy",
    "digital infrastructure",
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
    title: "Alpha Narrative — Strategy & Product Engineering",
    description:
      "Building strategy, product, and digital infrastructure from Port Harcourt.",
  },
  twitter: {
    card: "summary",
    title: "Alpha Narrative — Strategy & Product Engineering",
    description:
      "Building strategy, product, and digital infrastructure from Port Harcourt.",
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
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
