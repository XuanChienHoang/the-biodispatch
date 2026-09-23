"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Citation, type CitationData } from "@/components/Citation";

const SECTIONS = [
  { id: "opening", label: "The claim" },
  { id: "phase2", label: "Phase II clearance" },
  { id: "gizmo", label: "Run the model" },
  { id: "auc", label: "Reading the AUC surge" },
  { id: "timing", label: "Timing & the fat window" },
  { id: "limits", label: "Limits of the model" },
];

export function ArticleBody({ refs }: { refs: CitationData[] }) {
  const byOrd = (n: number) => refs[n - 1];
  const [activeId, setActiveId] = useState("opening");
  const { scrollYProgress } = useScroll();
  const spine = useSpring(scrollYProgress, { stiffness: 260, damping: 40, mass: 0.4 });

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActiveId(e.target.id);
      },
      { rootMargin: "-18% 0px -68% 0px", threshold: 0 }
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const C = ({ n }: { n: number }) => <Citation data={byOrd(n)} />;

  return (
    <div className="relative grid gap-12 lg:grid-cols-[minmax(0,1fr)_220px] lg:gap-14">
      {/* ---------------- measure ---------------- */}
      <article className="min-w-0 max-w-[68ch]">
        <section id="opening" className="scroll-mt-24">
          <p className="caps text-slate-ink">The claim</p>
          <p className="mt-4 text-[1.14rem] leading-[1.72] text-indigo-deep">
            <span className="float-left mr-3 mt-1 font-display text-[4.2rem] font-black leading-[0.76] tracking-[-0.05em] text-indigo-deep">
              T
            </span>
            he headline that circulates is always the same: black pepper extract makes curcumin
            &ldquo;20&nbsp;000&nbsp;% more absorbable&rdquo;. The number is real. The interpretation is
            usually wrong. It does not mean piperine helps curcumin get into cells, nor that more
            curcumin got used — it means the liver got slower at throwing it away.
            <C n={1} />
          </p>
          <p className="mt-5 text-[1.05rem] leading-[1.75] text-indigo-soft">
            That distinction is the whole article. Once you can see the difference between{" "}
            <em>absorption</em> and <em>disappearance</em>, most supplement bioavailability marketing
            becomes readable rather than magical.
          </p>
        </section>

        <Rule />

        <section id="phase2" className="scroll-mt-24">
          <p className="caps text-slate-ink">§ 1 · Phase II clearance</p>
          <h2 className="mt-3 font-display text-step-3 font-bold leading-[1.05] tracking-[-0.03em] text-indigo-deep">
            Your liver does not care how good it is.
          </h2>
          <p className="mt-5 text-[1.05rem] leading-[1.75] text-indigo-soft">
            Curcumin crosses the enterocyte reasonably well and then meets UDP-glucuronosyltransferase
            — chiefly UGT1A1 in the liver, UGT1A8 in the gut wall. The enzyme appends a glucuronic acid
            moiety, the molecule becomes water-soluble, and it is excreted into bile within minutes.
            Microsomal assays confirm curcumin is one of the better UGT1A1 substrates tested.
            <C n={2} />
          </p>
          <Callout title="Why the free form disappears">
            Native curcuminoids have an oral bioavailability near{" "}
            <span className="num text-indigo-deep">1.1 %</span>. Not because the gut rejects them —
            because the portal circulation delivers them straight into a liver that treats them as a
            xenobiotic worth conjugating.
          </Callout>
          <p className="mt-5 text-[1.05rem] leading-[1.75] text-indigo-soft">
            Piperine is an inhibitor of that conjugation. It alkylates the enzyme&rsquo;s active site
            and, at 20&nbsp;mg, meaningfully lowers the rate at which glucuronidation proceeds. Nothing
            about the curcumin molecule changes. The sink simply drains more slowly.
          </p>
        </section>

        <section id="gizmo" className="scroll-mt-8">
          <p className="caps mt-10 text-slate-ink">§ 2 · Run the model</p>
          <h2 className="mt-3 font-display text-step-3 font-bold leading-[1.05] tracking-[-0.03em] text-indigo-deep">
            Flip the switch yourself.
          </h2>
          <p className="mt-4 mb-2 text-[1.05rem] leading-[1.75] text-indigo-soft">
            The gizmo below is a first-order one-compartment model with piperine treated as a
            saturating UGT1A1 inhibitor. Toggle <span className="num text-indigo-deep">0&nbsp;mg →&nbsp;20&nbsp;mg</span>{" "}
            and watch two things at once: the cyan trace swelling, and the amber glucuronidation band
            collapsing.
          </p>
          <LazyCurcumin />
        </section>

        <Rule />

        <section id="auc" className="scroll-mt-24">
          <p className="caps text-slate-ink">§ 3 · Reading the AUC surge</p>
          <h2 className="mt-3 font-display text-step-3 font-bold leading-[1.05] tracking-[-0.03em] text-indigo-deep">
            AUC is area, not height.
          </h2>
          <p className="mt-5 text-[1.05rem] leading-[1.75] text-indigo-soft">
            In the eight-volunteer crossover, curcumin with 20&nbsp;mg piperine produced serum levels
            roughly twenty times those of curcumin alone, with the difference concentrated in the first
            two hours.<C n={1} /> AUC — area under the concentration-time curve — is the integral of
            that trace. It rises because two separate things happen together: apparent bioavailability
            climbs from about 1.1&nbsp;% to 5.5&nbsp;%, and terminal clearance falls from a half-life of
            roughly 5.4&nbsp;h to about 22&nbsp;h. Multiplied, those two shifts give the twenty-fold
            exposure the model reports.
          </p>
          <div className="my-7 grid gap-px bg-indigo-deep sm:grid-cols-3">
            {[
              ["AUC fold", "≈ 20 ×", "#00F2FE"],
              ["t½ shift", "5.4 → 22 h", "#10B981"],
              ["UGT1A1", "↓ up to 88 %", "#F59E0B"],
            ].map(([k, v, c]) => (
              <div key={k} className="bg-instrument px-5 py-4">
                <p className="caps text-white/50">{k}</p>
                <p className="num mt-1.5 text-[1.5rem] leading-none tracking-tight" style={{ color: c }}>
                  {v}
                </p>
              </div>
            ))}
          </div>
          <p className="text-[1.05rem] leading-[1.75] text-indigo-soft">
            Both mechanisms are visible in the model: the peak rises modestly, but the tail persists.
            That is why a formulation comparison based only on Cmax routinely misleads — it measures
            the spike and misses the exposure.
          </p>
        </section>

        <Rule />

        <section id="timing" className="scroll-mt-24">
          <p className="caps text-slate-ink">§ 4 · Timing &amp; the fat window</p>
          <h2 className="mt-3 font-display text-step-3 font-bold leading-[1.05] tracking-[-0.03em] text-indigo-deep">
            Lipids do what piperine cannot.
          </h2>
          <p className="mt-5 text-[1.05rem] leading-[1.75] text-indigo-soft">
            Curcuminoids are lipophilic; a high-fat meal forms mixed micelles that carry them past the
            unstirred water layer, and the resulting chylomicrons route a portion into lymphatic
            transport — bypassing first-pass hepatic delivery entirely. Switch the PK engine&rsquo;s food
            state to <span className="num text-indigo-deep">high-fat meal</span> and compare: the
            formulation effect is larger than the piperine effect at equal dose.{" "}
            <a href="/gizmos/pk" className="text-indigo-deep underline decoration-trace decoration-2 underline-offset-4 hover:text-trace-ink">
              Open the PK engine →
            </a>
          </p>
          <Callout title="Phytosome complexing changes F, not t½">
            Comparative human pharmacokinetics across three formulations found 7- to 18-fold gains for
            lipid-based systems — driven by solubility rather than by any change in elimination
            kinetics.<C n={3} /> A genuine formulation gain and an enzyme-inhibition gain leave
            different fingerprints on the curve, and the model lets you tell them apart.
          </Callout>
        </section>

        <Rule />

        <section id="limits" className="scroll-mt-24">
          <p className="caps text-slate-ink">§ 5 · Limits of the model</p>
          <h2 className="mt-3 font-display text-step-3 font-bold leading-[1.05] tracking-[-0.03em] text-indigo-deep">
            What this simulation is not.
          </h2>
          <ul className="mt-5 space-y-4">
            {[
              ["The 2000 % figure came from eight people.", "The Shoba crossover enrolled n = 8 healthy volunteers. That is an excellent mechanistic signal and a poor estimate of any individual's exposure."],
              ["Inhibition is modelled as saturating, not linear.", "Real UGT1A1 inhibition follows a competitive curve with substrate concentration; we approximate it with a graded term capped at 88 %."],
              ["Enterohepatic recirculation is ignored.", "Curcumin glucuronides are excreted into bile and can be deconjugated by gut β-glucuronidase. Omitting this flattens the model's terminal phase."],
              ["Higher exposure is not automatically better.", "AUC is a pharmacokinetic quantity, not an efficacy endpoint. The hs-CRP meta-analysis (n = 742) shows benefit at ≥1000 mg/d, but does not attribute it to piperine."],
            ].map(([h, b], i) => (
              <li key={h} className="border-b border-slate-hair pb-4">
                <div className="flex gap-4">
                  <span className="num shrink-0 text-[0.8rem] text-antag">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <p className="text-[1rem] font-semibold leading-snug text-indigo-deep">{h}</p>
                    <p className="mt-1.5 text-[0.95rem] leading-relaxed text-slate-ink">{b}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-[1.02rem] leading-relaxed text-indigo-soft">
            Safety data for repeat 20&nbsp;mg piperine over four weeks showed no clinically relevant
            hepatic or renal shift in 32 subjects.<C n={4} /> That is reassuring for a trial, not a
            licence for indefinite high dosing alongside CYP2C9 substrates.
          </p>
        </section>
      </article>

      {/* ---------------- sticky TOC rail ---------------- */}
      <aside className="hidden lg:block">
        <div className="sticky top-10">
          <div className="relative pl-5">
            <span className="absolute left-0 top-0 h-full w-px bg-slate-hair" />
            <motion.span
              className="spine absolute left-0 top-0 w-[2px] origin-top"
              style={{ scaleY: spine, height: "100%" }}
            />
            <p className="caps mb-4 text-slate-ink">Contents</p>
            <nav className="space-y-3">
              {SECTIONS.map((s, i) => {
                const on = activeId === s.id;
                return (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className={`group flex items-baseline gap-2.5 transition-colors duration-200 ${
                      on ? "text-indigo-deep" : "text-slate-ink hover:text-indigo-deep"
                    }`}
                  >
                    <span className={`num text-[0.68rem] ${on ? "text-trace-ink" : "text-slate-ink"}`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[0.86rem] leading-snug">{s.label}</span>
                  </a>
                );
              })}
            </nav>

            <div className="mt-8 border-t border-slate-hair pt-5">
              <p className="caps text-slate-ink">Evidence</p>
              <p className="num mt-2 text-[1.6rem] leading-none text-indigo-deep">{refs.length}</p>
              <p className="caps mt-1.5 text-slate-ink">verified refs</p>
              <a
                href="#references"
                className="caps mt-4 inline-block text-indigo-deep underline decoration-trace decoration-2 underline-offset-4 hover:text-trace-ink"
              >
                jump to list
              </a>
            </div>

            <div className="mt-6 rounded-sm border border-slate-hair bg-paper-tint p-3">
              <p className="caps text-slate-ink">Share</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {["X", "in", "mail"].map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      if (typeof navigator !== "undefined" && navigator.clipboard) {
                        navigator.clipboard.writeText(window.location.href).catch(() => {});
                      }
                    }}
                    className="caps rounded-sm border border-slate-hair bg-paper px-2 py-1.5 text-indigo-soft transition-colors hover:border-indigo-deep hover:text-indigo-deep"
                    aria-label={`Copy link for ${s}`}
                  >
                    {s === "mail" ? "link" : s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}

function Rule() {
  return <hr className="my-12 border-0 border-t border-slate-hair" />;
}

function Callout({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="my-7 border-l-2 border-trace bg-paper-tint py-4 pl-5 pr-4">
      <p className="caps text-trace-ink">{title}</p>
      <div className="mt-2 text-[0.98rem] leading-relaxed text-indigo-soft">{children}</div>
    </div>
  );
}

function LazyCurcumin() {
  const [C, setC] = useState<null | (() => React.ReactElement)>(null);
  useEffect(() => {
    let dead = false;
    import("@/components/gizmo/CurcuminPiperine").then((m) => {
      if (!dead) setC(() => m.default);
    });
    return () => {
      dead = true;
    };
  }, []);
  if (!C) {
    return (
      <div className="graticule flex h-[420px] items-center justify-center rounded-sm border border-slate-hair bg-instrument">
        <span className="caps animate-pulse text-slate-ink">loading instrument…</span>
      </div>
    );
  }
  return <C />;
}
