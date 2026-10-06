import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Fraunces, Archivo, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { InstrumentRail } from "@/components/InstrumentRail";
import { ComplianceStrip } from "@/components/ComplianceStrip";
import { MotionProvider } from "@/components/MotionProvider";

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
  metadataBase: new URL("https://the-biodispatch.vercel.app"),
  title: {
    default: "The BioDispatch · Dr. Xuan Chien Hoang",
    template: "%s · The BioDispatch",
  },
  description:
    "Evidence-based biomedical intelligence by Dr. Xuan Chien Hoang (Dr. rer. nat. in Molecular Biology, Univ. of Hamburg). Bridging East-West ethnobotanicals, bioavailability enhancement, oncology care, and data-driven HealthTech.",
  alternates: {
    types: {
      "application/rss+xml": "https://the-biodispatch.vercel.app/feed.xml",
    },
  },
  openGraph: {
    type: "website",
    siteName: "The BioDispatch",
    title: "The BioDispatch · Dr. Xuan Chien Hoang",
    description:
      "East-West ethnobotanicals, bioavailability enhancement, supportive oncology, and interactive pharmacokinetic simulation engines.",
    locale: "en_US",
    images: [
      {
        url: "https://the-biodispatch.vercel.app/api/og?title=The%20BioDispatch&dek=Biomedical%20Intelligence%20%26%20Simulation%20Engines&organ=Integrative&tier=Evidence-Based",
        width: 1200,
        height: 630,
        alt: "The BioDispatch",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The BioDispatch · Dr. Xuan Chien Hoang",
    description:
      "East-West ethnobotanicals, bioavailability enhancement, supportive oncology, and interactive pharmacokinetic simulation engines.",
    images: [
      "https://the-biodispatch.vercel.app/api/og?title=The%20BioDispatch&dek=Biomedical%20Intelligence%20%26%20Simulation%20Engines&organ=Integrative&tier=Evidence-Based",
    ],
  },
};

const JSONLD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MedicalWebPage",
      "@id": "https://the-biodispatch.vercel.app/#webpage",
      name: "The BioDispatch",
      description:
        "Evidence-based deep dives in biotechnology, metabolomics, and East-West botanical medicine.",
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
      </body>
    </html>
  );
}
