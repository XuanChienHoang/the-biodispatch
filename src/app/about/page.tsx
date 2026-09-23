import type { Metadata } from "next";
import { AboutClient } from "@/components/AboutClient";

export const metadata: Metadata = {
  title: "About Dr. Xuan Chien Hoang · The BioDispatch",
  description:
    "Curator Profile: Dr. Xuan Chien Hoang (Dr. rer. nat. in Molecular Biology, University of Hamburg). Founder of Lava Health GmbH, bridging Asian ethnobotanicals with European extraction standards, bioavailability enhancement, oncology supportive care, and biomedical Data Science.",
};

export default function AboutPage() {
  return <AboutClient />;
}
