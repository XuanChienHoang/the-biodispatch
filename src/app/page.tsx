import Link from "next/link";
import { Hero } from "@/components/Hero";
import { Directory } from "@/components/Directory";
import { getArticles } from "@/lib/store";
import CurcuminPiperineGizmo from "@/components/gizmo/CurcuminPiperine";
import { GIZMOS } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const articles = await getArticles();

  return (
    <main>
      <Hero />

      {/* ---- featured interactive simulation instrument ---- */}
      <section className="border-b border-slate-hair bg-paper-tint">
        <div className="mx-auto max-w-[1240px] px-6 py-16 lg:px-10 lg:py-24">
          <div className="flex flex-wrap items-end justify-between gap-6 border-b-2 border-indigo-deep pb-5">
            <div>
              <span className="caps text-slate-ink">§ 0 · Interactive Pharmacokinetic Instrument</span>
              <h2 className="mt-3 max-w-2xl font-display display-lg font-black leading-[0.95] tracking-[-0.035em] text-indigo-deep">
                One switch. Twenty-fold exposure.
              </h2>
            </div>
            <p className="max-w-md text-[0.95rem] leading-relaxed text-slate-ink">
              Piperine is not an active ingredient — it is an enzyme inhibitor that suppresses hepatic Phase II glucuronidation.
              Move the dose slider or toggle the switch to watch the clearance curve deform in real time.
            </p>
          </div>

          <div className="mt-8">
            <CurcuminPiperineGizmo />
          </div>
        </div>
      </section>

      {/* ---- Corpus / Directory of papers ---- */}
      <Directory articles={articles} />

      {/* ---- Simulation Engines Index ---- */}
      <section className="border-t border-slate-hair bg-indigo-deep text-white">
        <div className="mx-auto max-w-[1240px] px-6 py-16 lg:px-10 lg:py-24">
          <div className="flex flex-wrap items-end justify-between gap-6 border-b border-white/12 pb-5">
            <div>
              <span className="caps text-trace">§ 2 · Simulation Engines & Gizmos Lab</span>
              <h2 className="mt-3 font-display display-lg font-black leading-[0.95] tracking-[-0.035em]">
                Four Laboratory Engines.
              </h2>
            </div>
            <Link href="/gizmos" className="caps text-slate-400 transition-colors hover:text-trace">
              Open Full Simulation Lab →
            </Link>
          </div>

          <div className="mt-8 grid gap-px bg-white/12 md:grid-cols-2">
            {GIZMOS.map((g, i) => (
              <Link
                key={g.slug}
                href={`/gizmos/${g.slug}`}
                className="group relative flex gap-5 bg-indigo-deep p-6 transition-colors duration-300 hover:bg-[#101f34]"
              >
                <div className="flex w-14 shrink-0 flex-col items-center gap-2 border-r border-white/10 pr-4">
                  <span className="num text-[1.7rem] leading-none font-medium" style={{ color: g.color }}>
                    {g.index}
                  </span>
                  <Sparkline color={g.color} i={i} />
                </div>
                <div className="min-w-0">
                  <h3 className="font-display text-[1.24rem] font-semibold leading-tight tracking-[-0.02em]">
                    {g.name}
                  </h3>
                  <p className="mt-2 text-[0.88rem] leading-relaxed text-slate-300">{g.blurb}</p>
                  <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1">
                    {g.inputs.map((inp) => (
                      <li key={inp} className="caps text-white/40">
                        {inp}
                      </li>
                    ))}
                  </ul>
                  <span
                    className="caps mt-4 inline-flex items-center gap-1 transition-transform duration-300 group-hover:translate-x-1"
                    style={{ color: g.color }}
                  >
                    Run Simulation Engine →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function Sparkline({ color, i }: { color: string; i: number }) {
  const paths = [
    "M2 30 C 12 30, 14 6, 24 6 C 34 6, 34 24, 46 24 C 54 24, 56 30, 62 30",
    "M2 26 L 16 26 L 16 10 L 30 10 L 30 30 L 44 30 L 44 16 L 62 16",
    "M2 6 L 14 18 L 26 8 L 38 22 L 50 12 L 62 26",
    "M2 30 C 18 30, 18 12, 30 12 S 46 26, 62 8",
  ];
  return (
    <svg width="64" height="36" viewBox="0 0 64 36" fill="none" aria-hidden>
      <path
        d={paths[i % paths.length]}
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
