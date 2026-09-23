import type { Metadata } from "next";
import { GizmosDirectory } from "@/components/GizmosDirectory";

export const metadata: Metadata = {
  title: "Simulation Index · The BioDispatch",
  description:
    "Four interactive biomedical engines: pharmacokinetics, molecular pathway, synergy matrix and biomarker forecasting.",
};

export default function GizmosIndex() {
  return (
    <main className="min-h-screen">
      <GizmosDirectory />
    </main>
  );
}
