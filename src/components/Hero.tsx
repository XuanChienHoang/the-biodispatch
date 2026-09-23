"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Activity, Timer, BadgeCheck, ShieldCheck, Microscope } from "lucide-react";
import { Wordmark } from "@/components/InstrumentRail";

const CH = [0.12, 0.34, 0.2, 0.62, 0.44, 0.86, 0.58, 0.71, 0.4, 0.95, 0.52, 0.66];

export function Hero() {
  return (
    <header className="relative overflow-hidden border-b border-slate-hair">
      {/* masthead bar */}
      <div className="mx-auto flex max-w-[1240px] flex-wrap items-center gap-x-6 gap-y-2 px-6 py-4 lg:px-10">
        <span className="flex items-center gap-2.5 text-indigo-deep md:hidden">
          <Wordmark size={22} />
        </span>
        <span className="caps font-semibold text-indigo-deep">The BioDispatch</span>
        <span className="hidden h-3 w-px bg-slate-hair sm:block" />
        <span className="caps text-slate-ink">Curator: Dr. Xuan Chien Hoang (Dr. rer. nat.)</span>
        <span className="hidden h-3 w-px bg-slate-hair sm:block" />
        <span className="caps text-slate-ink">University of Hamburg</span>
        <span className="caps ml-auto text-slate-ink">Evidence-Based Editorial · 2026</span>
      </div>

      <div className="relative">
        <div className="relative mx-auto max-w-[1240px] px-6 pb-16 pt-10 lg:px-10 lg:pb-24 lg:pt-16">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-[54rem]"
          >
            <div className="flex flex-wrap items-center gap-2">
              <span className="caps rounded-sm bg-indigo-deep px-2.5 py-1.5 text-trace font-medium">
                Metabolomic Telemetry
              </span>
              <span className="caps rounded-sm border border-slate-hair px-2.5 py-1.5 text-slate-ink font-medium">
                Interactive Simulation Engines
              </span>
              <span className="caps rounded-sm border border-slate-hair px-2.5 py-1.5 text-slate-ink font-medium">
                Zero-Hallucination Verified
              </span>
            </div>

            <h1 className="display-xl mt-6 font-display font-black leading-[0.92] tracking-[-0.04em] text-indigo-deep">
              The BioDispatch.
            </h1>

            <p className="mt-6 max-w-2xl text-[1.18rem] leading-[1.62] text-indigo-soft">
              An independent analytical publication delivering rigorous, evidence-based insights at the intersection of
              biotechnology, metabolomics, and next-generation clinical healthcare. Every thesis is anchored in peer-reviewed
              literature, mass spectrometry telemetry, and verifiable pharmacokinetic models.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#directory"
                className="caps inline-flex items-center gap-2 rounded-sm bg-indigo-deep px-6 py-3.5 text-white transition-all duration-300 hover:bg-[#101f34] hover:shadow-lg"
              >
                <span>Explore Corpus & Dispatches</span>
                <span className="text-trace">↓</span>
              </a>
              <Link
                href="/gizmos"
                className="caps inline-flex items-center gap-2 rounded-sm border border-slate-hair bg-paper px-6 py-3.5 text-indigo-deep transition-all duration-200 hover:border-indigo-deep hover:bg-paper-tint"
              >
                <span>Interactive Gizmos Lab</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/about"
                className="caps inline-flex items-center gap-1.5 text-slate-ink hover:text-indigo-deep px-3 py-2 transition-colors"
              >
                <span>About Lead Author</span>
                <span>→</span>
              </Link>
            </div>
          </motion.div>

          {/* live instrument telemetry strip */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="mt-14 border-t border-slate-hair pt-8"
          >
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="border-l-2 border-indigo-deep pl-4">
                <span className="caps text-slate-ink">Lead Investigator</span>
                <p className="num mt-1 text-[1.15rem] font-bold text-indigo-deep">Dr. Xuan Chien Hoang</p>
                <p className="mt-0.5 text-[0.8rem] text-slate-ink">Doctor of Natural Sciences (Hamburg)</p>
              </div>

              <div className="border-l-2 border-trace pl-4">
                <span className="caps text-slate-ink">Core Focus</span>
                <p className="num mt-1 text-[1.15rem] font-bold text-indigo-deep">Metabolomics & TechBio</p>
                <p className="mt-0.5 text-[0.8rem] text-slate-ink">Targeted / Untargeted mass spec profiling</p>
              </div>

              <div className="border-l-2 border-syn pl-4">
                <span className="caps text-slate-ink">Editorial Rigour</span>
                <p className="num mt-1 text-[1.15rem] font-bold text-indigo-deep">100% DOI Verified</p>
                <p className="mt-0.5 text-[0.8rem] text-slate-ink">NCBI PubMed & CrossRef verified citations</p>
              </div>

              <div className="border-l-2 border-plasma pl-4">
                <span className="caps text-slate-ink">Simulation Engines</span>
                <p className="num mt-1 text-[1.15rem] font-bold text-indigo-deep">4 Local Calculators</p>
                <p className="mt-0.5 text-[0.8rem] text-slate-ink">1-compartment PK, Synergy & Biomarkers</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </header>
  );
}
