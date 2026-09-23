import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About The BioDispatch | Dr. Xuan Chien Hoang",
  description: "About The BioDispatch and Dr. Xuan Chien Hoang (Dr. rer. nat.), specialist in biotechnology, metabolomics, and health intelligence.",
};

export default function AboutPage() {
  return (
    <div className="container" style={{ maxWidth: "780px", padding: "4rem 1.5rem 6rem" }}>
      <Link href="/" style={{ color: "var(--accent)", fontWeight: 600, fontSize: "0.9rem" }}>
        ← Back to Dispatches
      </Link>
      
      <div style={{ margin: "2rem 0 3rem" }}>
        <h1 style={{ fontSize: "2.5rem", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: "1rem" }}>
          About The BioDispatch
        </h1>
        <p style={{ fontSize: "1.2rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
          Evidence-based analysis at the intersection of biotechnology, metabolomics, and next-generation healthcare innovations.
        </p>
      </div>

      <div className="article-content" style={{ padding: 0 }}>
        <h2>Mission & Editorial Philosophy</h2>
        <p>
          <strong>The BioDispatch</strong> is an independent analytical publication dedicated to translating complex 
          molecular research and high-dimensional clinical telemetry into clear, actionable intelligence.
        </p>
        <p>
          In an era inundated with generic health claims and algorithmic marketing, The BioDispatch operates on a strict 
          <strong> evidence-based paradigm</strong>: every premise is grounded in peer-reviewed scientific literature, 
          empirical metabolomic data, and verified clinical consensus.
        </p>

        <h2>Curator & Lead Author</h2>
        <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "1rem", padding: "2rem", margin: "2rem 0" }}>
          <h3 style={{ marginTop: 0, color: "#fff" }}>Dr. Xuan Chien Hoang (Dr. rer. nat.)</h3>
          <p style={{ color: "var(--accent)", fontWeight: 600, fontSize: "0.9rem", marginBottom: "1rem" }}>
            Doctor of Natural Sciences (University of Hamburg, Germany)
          </p>
          <p style={{ fontSize: "1rem", color: "var(--text-secondary)", marginBottom: "1rem" }}>
            Dr. Hoang brings over 8 years of specialized industry and academic experience across Germany, Europe, and APAC. 
            His career spans end-to-end healthcare product lifecycle management, metabolomic profiling, clinical quality governance, 
            and data intelligence.
          </p>
          <p style={{ fontSize: "1rem", color: "var(--text-secondary)", margin: 0 }}>
            He has overseen the successful market deployment of over 15 EU-compliant healthcare formulations, led diagnostic 
            testing operations, and actively contributes to the international scientific and innovation exchange between 
            Germany and Vietnam.
          </p>
        </div>

        <h2>Core Focus Areas</h2>
        <ul>
          <li><strong>Untargeted & Targeted Metabolomics:</strong> Mass spectrometry profiling, small molecule biomarkers, and metabolic pathway deconvolution.</li>
          <li><strong>Gut Microbiome & Systemic Axis:</strong> Bioactive microbial metabolites (SCFAs, secondary bile acids) and cardiovascular/metabolic impact.</li>
          <li><strong>TechBio & Regulatory Intelligence:</strong> Machine learning in spectral prediction, EU regulatory frameworks (MDR, HWG, EFSA), and digital diagnostics.</li>
        </ul>
      </div>
    </div>
  );
}
