import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, Award, BookOpen, GraduationCap, Microscope, ShieldCheck, Stethoscope } from "lucide-react";

export const metadata: Metadata = {
  title: "About Dr. Xuan Chien Hoang · The BioDispatch",
  description:
    "Curator Profile: Dr. Xuan Chien Hoang (Dr. rer. nat., University of Hamburg). Research background in biotechnology, metabolomics, and evidence-based health science.",
};

export default function AboutPage() {
  return (
    <main className="bg-paper text-indigo-deep">
      {/* Header */}
      <header className="border-b border-slate-hair bg-paper-tint">
        <div className="mx-auto max-w-[1080px] px-6 py-12 lg:px-10 lg:py-20">
          <Link
            href="/"
            className="caps inline-flex items-center gap-1.5 text-slate-ink hover:text-indigo-deep transition-colors"
          >
            <ArrowLeft size={13} /> Return to Front
          </Link>

          <div className="mt-8 flex flex-wrap items-center gap-2">
            <span className="caps rounded-sm bg-indigo-deep px-2.5 py-1 text-trace font-medium">
              Lead Investigator
            </span>
            <span className="caps rounded-sm border border-slate-hair px-2.5 py-1 text-slate-ink font-medium">
              Editorial Board
            </span>
            <span className="caps rounded-sm border border-slate-hair px-2.5 py-1 text-slate-ink font-medium">
              University of Hamburg
            </span>
          </div>

          <h1 className="mt-5 font-display display-lg font-black leading-[0.95] tracking-[-0.035em] text-indigo-deep">
            Dr. Xuan Chien Hoang
          </h1>

          <p className="mt-3 text-[1.2rem] font-medium text-trace-ink font-mono">
            Doctor of Natural Sciences (Dr. rer. nat.) · Biotechnology & Metabolomics Specialist
          </p>

          <p className="mt-5 max-w-2xl text-[1.08rem] leading-relaxed text-indigo-soft">
            Bridging fundamental molecular biochemistry, mass spectrometry metabolomics, and real-world health product
            lifecycles across Germany, Europe, and APAC.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <div className="mx-auto max-w-[1080px] px-6 py-14 lg:px-10 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_320px]">
          <div className="space-y-12">
            {/* Bio section */}
            <section>
              <span className="caps text-slate-ink font-semibold">§ 1 · Academic & Professional Background</span>
              <h2 className="mt-3 font-display text-[1.85rem] font-bold tracking-tight text-indigo-deep">
                The Intersection of Biology & Telemetry
              </h2>
              <div className="mt-5 space-y-4 text-[1.05rem] leading-[1.75] text-indigo-soft">
                <p>
                  Dr. Xuan Chien Hoang earned his doctorate in natural sciences (<strong>Dr. rer. nat.</strong>) from the{" "}
                  <strong>University of Hamburg (Germany)</strong>, specializing in biological data modeling, experimental
                  design, and high-resolution chemical profiling.
                </p>
                <p>
                  With more than 8 years of post-doctoral industry experience in Hamburg, Rostock, and Potsdam, he has directed
                  laboratory analytical testing operations, led quality assurance pipelines adhering to strict ISO and EU
                  pharmaceutical standards, and successfully engineered over 15 EU-compliant healthcare formulations from
                  concept to commercial deployment.
                </p>
                <p>
                  His technical domain encompasses both targeted and untargeted metabolomics, pharmacokinetic modeling (1- and
                  2-compartment systems), bioactive compound bio-enhancement, and algorithmic data pipelines.
                </p>
              </div>
            </section>

            {/* Core Pillars Bento */}
            <section>
              <span className="caps text-slate-ink font-semibold">§ 2 · Analytical Pillars</span>
              <h2 className="mt-3 font-display text-[1.85rem] font-bold tracking-tight text-indigo-deep">
                Core Research Domains
              </h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-sm border border-slate-hair bg-paper-tint p-5">
                  <div className="flex items-center gap-2.5 text-trace-ink">
                    <Microscope size={18} />
                    <h3 className="font-display text-[1.05rem] font-bold text-indigo-deep">
                      Metabolomics & MS Profiling
                    </h3>
                  </div>
                  <p className="mt-2 text-[0.88rem] leading-relaxed text-indigo-soft">
                    High-resolution LC-MS/MS and GC-MS spectral deconvolution, identification of low-molecular-weight
                    phenotypic markers, and metabolic flux analysis.
                  </p>
                </div>

                <div className="rounded-sm border border-slate-hair bg-paper-tint p-5">
                  <div className="flex items-center gap-2.5 text-syn-ink">
                    <GraduationCap size={18} />
                    <h3 className="font-display text-[1.05rem] font-bold text-indigo-deep">
                      Evidence-Based Medicine (EBM)
                    </h3>
                  </div>
                  <p className="mt-2 text-[0.88rem] leading-relaxed text-indigo-soft">
                    Zero-hallucination citation protocol (Citation-Before-Claim), systematic meta-analyses, and Bayesian
                    prior evaluation of clinical trial endpoints.
                  </p>
                </div>

                <div className="rounded-sm border border-slate-hair bg-paper-tint p-5">
                  <div className="flex items-center gap-2.5 text-plasma-ink">
                    <BookOpen size={18} />
                    <h3 className="font-display text-[1.05rem] font-bold text-indigo-deep">
                      Interactive Simulation Engines
                    </h3>
                  </div>
                  <p className="mt-2 text-[0.88rem] leading-relaxed text-indigo-soft">
                    Client-side pharmacokinetic calculators, enzyme inhibition models (UGT1A1, CYP3A4), and dynamic
                    synergy matrices running without server roundtrips.
                  </p>
                </div>

                <div className="rounded-sm border border-slate-hair bg-paper-tint p-5">
                  <div className="flex items-center gap-2.5 text-indigo-deep">
                    <ShieldCheck size={18} />
                    <h3 className="font-display text-[1.05rem] font-bold text-indigo-deep">
                      EU Regulatory Compliance
                    </h3>
                  </div>
                  <p className="mt-2 text-[0.88rem] leading-relaxed text-indigo-soft">
                    Rigorous adherence to Regulation (EC) No 1924/2006 (NHCR), German Heilmittelwerbegesetz (HWG), and
                    clinical evidence substantiation standards.
                  </p>
                </div>
              </div>
            </section>

            {/* Editorial Philosophy */}
            <section className="border-t border-slate-hair pt-8">
              <span className="caps text-slate-ink font-semibold">§ 3 · Editorial Mission</span>
              <h2 className="mt-3 font-display text-[1.85rem] font-bold tracking-tight text-indigo-deep">
                Why The BioDispatch Exists
              </h2>
              <p className="mt-4 text-[1.05rem] leading-[1.75] text-indigo-soft">
                Most biomedical journalism falls into two traps: either unreadable academic paywalls or hyper-simplified,
                scientifically groundless marketing claims.
              </p>
              <p className="mt-3 text-[1.05rem] leading-[1.75] text-indigo-soft">
                <strong>The BioDispatch</strong> is dedicated to a third path: explorable, rigorous, transparent science.
                Every article links directly to verified PubMed/DOI records and provides interactive visual models that let
                clinicians, researchers, and curious minds test the mathematical claims themselves.
              </p>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="rounded-sm border border-slate-hair bg-paper p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="h-14 w-14 rounded-full bg-indigo-deep text-trace font-mono font-bold flex items-center justify-center text-xl">
                  CH
                </div>
                <div>
                  <h3 className="font-display text-[1.15rem] font-bold text-indigo-deep">Dr. Xuan Chien Hoang</h3>
                  <p className="caps text-[0.68rem] text-slate-ink">Dr. rer. nat. · Hamburg</p>
                </div>
              </div>

              <div className="mt-6 space-y-3.5 border-t border-slate-hair pt-5 text-xs">
                <div>
                  <span className="caps text-slate-ink block">Alma Mater</span>
                  <span className="font-semibold text-indigo-deep">University of Hamburg, Germany</span>
                </div>
                <div>
                  <span className="caps text-slate-ink block">Location</span>
                  <span className="font-semibold text-indigo-deep">Hamburg, Germany</span>
                </div>
                <div>
                  <span className="caps text-slate-ink block">Languages</span>
                  <span className="font-semibold text-indigo-deep">German · English · Vietnamese</span>
                </div>
                <div>
                  <span className="caps text-slate-ink block">Leadership</span>
                  <span className="font-semibold text-indigo-deep">Board Member, VGI e.V. (since 2019)</span>
                </div>
                <div>
                  <span className="caps text-slate-ink block">Contact / Editorial Inquiries</span>
                  <a
                    href="mailto:hoangxuanchien86@gmail.com"
                    className="font-mono text-trace-ink underline block break-all"
                  >
                    hoangxuanchien86@gmail.com
                  </a>
                </div>
              </div>
            </div>

            <div className="rounded-sm border border-slate-hair bg-paper-tint p-6">
              <span className="caps text-slate-ink block font-semibold mb-2">Publishing Pipeline</span>
              <p className="text-xs text-indigo-soft leading-relaxed">
                Authored and maintained in a private Git workspace with automated continuous deployment to Vercel.
              </p>
              <Link
                href="/#directory"
                className="caps mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-deep hover:text-trace-ink"
              >
                Browse Published Dispatches →
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
