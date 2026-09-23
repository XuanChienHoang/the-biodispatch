import type { Metadata } from "next";
import { AboutClient } from "@/components/AboutClient";

export const metadata: Metadata = {
  title: "About Dr. Xuan Chien Hoang · The BioDispatch",
  description:
    "Curator Profile: Dr. Xuan Chien Hoang (Dr. rer. nat., University of Hamburg). Research background in biotechnology, metabolomics, and evidence-based health science.",
};

export default function AboutPage() {
  return <AboutClient />;
}
