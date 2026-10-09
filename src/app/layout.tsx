import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Fraunces, Archivo, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { InstrumentRail } from "@/components/InstrumentRail";
import { ComplianceStrip } from "@/components/ComplianceStrip";
import { MotionProvider } from "@/components/MotionProvider";
import { Analytics } from "@vercel/analytics/next";

const fraunces = Fraunces({
  subsets: ["latin"],
  axes: ["SOFT", "WONK", "opsz"],
  variable: "--font-fraunces",
  display: "swap",
});

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.phyto-codex.org"),
  icons: {
    icon: "/images/phytocodex-emblem.jpg",
    shortcut: "/images/phytocodex-emblem.jpg",
    apple: "/images/phytocodex-emblem.jpg",
  },
  title: {
    default: "Phytocodex · Dr. Xuan Chien Hoang",
    template: "%s · Phytocodex",
  },
  description:
    "Decoding the molecules of health — where Eastern botanicals meet European science. Evidence-based biomedical monograph by Dr. Xuan Chien Hoang (Dr. rer. nat. in Molecular Biology, Univ. of Hamburg).",
  alternates: {
    types: {
      "application/rss+xml": "https://www.phyto-codex.org/feed.xml",
    },
  },
  openGraph: {
    type: "website",
    siteName: "Phytocodex",
    title: "Phytocodex · Dr. Xuan Chien Hoang",
    description:
      "Decoding the molecules of health — where Eastern botanicals meet European science. Evidence-based molecular pharmacology and pharmacokinetic simulation engines.",
    locale: "en_US",
    images: [
      {
        url: "https://www.phyto-codex.org/images/phytocodex-banner.jpg",
        width: 1200,
        height: 675,
        alt: "Phytocodex — Decoding the Molecules of Health",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Phytocodex · Dr. Xuan Chien Hoang",
    description:
      "Decoding the molecules of health — where Eastern botanicals meet European science.",
    images: [
      "https://www.phyto-codex.org/images/phytocodex-banner.jpg",
    ],
  },
};

const JSONLD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MedicalWebPage",
      "@id": "https://www.phyto-codex.org/#webpage",
      name: "Phytocodex",
      description:
        "Decoding the molecules of health — where Eastern botanicals meet European science. Evidence-based deep dives in biotechnology, metabolomics, and East-West botanical medicine.",
      inLanguage: "en",
      publisher: {
        "@type": "Person",
        name: "Dr. Xuan Chien Hoang",
        jobTitle: "Doctor of Natural Sciences (Dr. rer. nat. in Molecular Biology)",
        alumniOf: "University of Hamburg",
      },
      about: { "@type": "MedicalCondition", name: "Metabolic health" },
    },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${archivo.variable} ${jetbrains.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSONLD) }}
        />
      </head>
      <body className="bg-paper text-indigo-deep antialiased">
        <MotionProvider>
          <InstrumentRail />
          <div className="pt-14 md:pt-0 md:pl-[72px]">
            {children}
            <ComplianceStrip />
          </div>
        </MotionProvider>
        <Analytics />
      </body>
    </html>
  );
}
