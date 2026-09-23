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
    "Rigorous, evidence-based deep dives in biotechnology, metabolomics, and pharmacokinetic simulations by Dr. Xuan Chien Hoang (Dr. rer. nat., University of Hamburg).",
  openGraph: {
    type: "website",
    siteName: "The BioDispatch",
    title: "The BioDispatch · Dr. Xuan Chien Hoang",
    description: "Evidence-based biomedical intelligence, mass spectrometry telemetry and pharmacokinetic explorables.",
    locale: "en_US",
  },
};

const JSONLD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MedicalWebPage",
      "@id": "https://the-biodispatch.vercel.app/#webpage",
      name: "The BioDispatch",
      description: "Evidence-based deep dives in biotechnology and metabolomic health science.",
      inLanguage: "en",
      publisher: {
        "@type": "Person",
        name: "Dr. Xuan Chien Hoang",
        jobTitle: "Doctor of Natural Sciences (Dr. rer. nat.)",
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
          <div className="md:pl-[72px]">
            {children}
            <ComplianceStrip />
          </div>
        </MotionProvider>
      </body>
    </html>
  );
}
