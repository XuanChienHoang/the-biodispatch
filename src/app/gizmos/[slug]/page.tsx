import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { GIZMOS } from "@/lib/content";
import PKGizmo from "@/components/gizmo/PKGizmo";
import PathwayGizmo from "@/components/gizmo/PathwayGizmo";
import SynergyGizmo from "@/components/gizmo/SynergyGizmo";
import BiomarkerGizmo from "@/components/gizmo/BiomarkerGizmo";
import CurcuminPiperineGizmo from "@/components/gizmo/CurcuminPiperine";

const ENGINES: Record<string, { Comp: () => React.ReactElement; assumptions: string[]; refs: string }> = {
  pk: {
    Comp: PKGizmo,
    assumptions: [
      "Single homogeneous compartment with instantaneous distribution",
      "First-order absorption and elimination (linear kinetics)",
      "Terminal kₑ held at 0.099 h⁻¹ for native curcuminoids",
      "High-fat meal multiplies F by 2.4 and delays ka by 0.62",
    ],
    refs: "10.1002/9780470740412",
  },
  pathway: {
    Comp: PathwayGizmo,
    assumptions: [
      "Schematic topology — node positions carry no quantitative meaning",
      "Binary activation state, no graded dose-response modelled",
      "Downstream transcripts are illustrative of published target sets",
      "Cross-talk between the four axes is not simulated",
    ],
    refs: "10.1038/nrd3757",
  },
  synergy: {
    Comp: SynergyGizmo,
    assumptions: [
      "Classification is qualitative; no additivity index (Bliss/Loewe) is computed",
      "Only the 8 agents shown are populated in this release",
      "Grade A = replicated human RCT, C = case report or in-vitro",
      "Missing cells mean unstudied, not safe",
    ],
    refs: "10.1097/CLI.0000000000000042",
  },
  biomarker: {
    Comp: BiomarkerGizmo,
    assumptions: [
      "Fixed-effect pooling of randomised trial endpoints",
      "Relative effect held constant across the baseline range",
      "95% CI reflects sampling error only, not real-world variance",
      "No adjustment for regression to the mean or adherence",
    ],
    refs: "10.1001/jama.2017.18240",
  },
  "curcumin-piperine": {
    Comp: CurcuminPiperineGizmo,
      assumptions: [
        "Piperine suppresses UGT1A1 in a saturating dose-response, capped at 88% by 20 mg",
        "Apparent bioavailability rises from 1.1% toward 5.5% as glucuronidation falls",
        "Terminal kₑ falls from 0.128 h⁻¹ to a floor of 0.032 h⁻¹ (t½ 5.4 h → 21.7 h)",
        "Single oral dose, 24 h trapezoidal integration window; enterohepatic recycling omitted",
      ],
    refs: "10.1055/s-2006-957541",
  },
};

export function generateStaticParams(): { slug: string }[] {
  return [
    ...GIZMOS.map((g) => ({ slug: g.slug as string })),
    { slug: "curcumin-piperine" },
  ];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const g = GIZMOS.find((x) => x.slug === slug);
  const title = slug === "curcumin-piperine" ? "Curcumin × Piperine Bio-enhancement" : g?.name;
  return { title: title ?? "Gizmo" };
}

export default async function GizmoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const engine = ENGINES[slug];
  if (!engine) notFound();

  const meta = GIZMOS.find((g) => g.slug === slug);
  const { Comp } = engine;
  const index = meta?.index ?? "01a";

  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-[1240px] px-6 py-12 lg:px-10 lg:py-16">
        <nav className="caps flex flex-wrap items-center gap-2 text-slate-ink">
          <Link href="/" className="hover:text-indigo-deep">Hub</Link>
          <span>/</span>
          <Link href="/gizmos" className="hover:text-indigo-deep">Gizmos</Link>
          <span>/</span>
          <span className="text-indigo-deep">{meta?.short ?? "Curcumin × Piperine"}</span>
        </nav>

        <div className="mt-7 grid gap-8 border-b-2 border-indigo-deep pb-7 lg:grid-cols-[1.3fr_1fr] lg:items-end">
          <div>
            <span className="caps text-slate-ink">Gizmo {index}</span>
            <h1 className="mt-3 font-display display-lg font-black leading-[0.94] tracking-[-0.038em] text-indigo-deep">
              {meta?.name ?? "Curcumin × Piperine Bio-enhancement"}
            </h1>
            <p className="mt-4 max-w-2xl text-[1.02rem] leading-relaxed text-slate-ink">
              {meta?.blurb ??
                "Piperine inhibits hepatic and intestinal UGT1A1, collapsing Phase II glucuronidation of curcuminoids and lifting systemic exposure roughly twenty-fold."}
            </p>
          </div>
          <div className="flex flex-wrap gap-2 lg:justify-end">
            <span className="caps rounded-sm border border-slate-hair px-2.5 py-1.5 text-slate-ink">
              DOI {engine.refs}
            </span>
            <span className="caps rounded-sm border border-slate-hair px-2.5 py-1.5 text-slate-ink">
              100 % client-side
            </span>
            <span className="caps rounded-sm bg-indigo-deep px-2.5 py-1.5 text-trace">live model</span>
          </div>
        </div>

        <Comp />

        <div className="grid gap-10 border-t border-slate-hair pt-10 md:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="caps text-slate-ink">Model assumptions — read these first</p>
            <ul className="mt-4 space-y-3">
              {engine.assumptions.map((a, i) => (
                <li key={a} className="flex gap-4 border-b border-slate-hair pb-3">
                  <span className="num shrink-0 text-[0.8rem] text-trace-ink">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-[0.92rem] leading-relaxed text-indigo-soft">{a}</span>
                </li>
              ))}
            </ul>
          </div>
          <aside className="rounded-sm border border-slate-hair bg-paper-tint p-6">
            <p className="caps text-slate-ink">GDPR · architectural note</p>
            <p className="mt-3 text-[0.9rem] leading-relaxed text-indigo-soft">
              Every slider here writes to React state in your own tab. There is no fetch, no beacon,
              no localStorage, no analytics event carrying a parameter value. If you close the tab,
              the model is destroyed — which is precisely the point of Article 5(1)(c).
            </p>
            <div className="mt-5 grid grid-cols-3 gap-px border-t border-slate-hair bg-slate-hair pt-px">
              {[["0", "requests"], ["0", "cookies"], ["0", "PII"]].map(([v, k]) => (
                <div key={k} className="bg-paper-tint px-3 py-3">
                  <p className="num text-[1.5rem] leading-none text-indigo-deep">{v}</p>
                  <p className="caps mt-1.5 text-slate-ink">{k}</p>
                </div>
              ))}
            </div>
            <a
              href="https://lavahealth.de"
              target="_blank"
              rel="noopener noreferrer"
              className="caps mt-5 inline-flex items-center gap-1.5 text-indigo-deep underline decoration-trace decoration-2 underline-offset-4 hover:text-trace-ink"
            >
              lavahealth.de ↗
            </a>
          </aside>
        </div>
      </div>
    </main>
  );
}
