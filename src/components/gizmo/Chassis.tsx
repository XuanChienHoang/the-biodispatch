"use client";

import { useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { RotateCcw, Camera, Quote, ShieldCheck, WifiOff } from "lucide-react";
import { CiteModal } from "@/components/Citation";
import { tick } from "@/components/ui";

export interface Telemetry {
  key: string;
  value: string;
  unit?: string;
  tone?: string;
}

/**
 * <BiomedicalGizmoContainer />
 * Three-zone instrument chassis set into the white journal page:
 *   top    — parameter/preset strip
 *   middle — control deck · simulation canvas · telemetry rail
 *   bottom — live readout · scientific insight · cite-this-model
 */
export function BiomedicalGizmoContainer({
  fig,
  title,
  subtitle,
  controls,
  canvas,
  telemetry,
  insight,
  citeParams,
  presets,
  activePreset,
  onPreset,
  onReset,
  onExport,
}: {
  fig: string;
  title: string;
  subtitle?: string;
  controls: ReactNode;
  canvas: ReactNode;
  telemetry: Telemetry[];
  insight: ReactNode;
  citeParams: [string, string][];
  presets?: { id: string; label: string }[];
  activePreset?: string;
  onPreset?: (id: string) => void;
  onReset?: () => void;
  onExport?: () => void;
}) {
  const [cite, setCite] = useState(false);

  return (
    <motion.figure
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="my-10 overflow-hidden rounded-sm border border-slate-hair bg-paper shadow-[0_28px_70px_-42px_rgba(11,25,44,0.55)]"
    >
      {/* ---- header ---- */}
      <header className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-slate-hair bg-paper-tint px-4 py-3">
        <span className="caps rounded-sm bg-indigo-deep px-2 py-1 text-trace">{fig}</span>
        <span className="font-display text-[1.02rem] font-semibold leading-tight tracking-[-0.01em] text-indigo-deep">
          {title}
        </span>
        {subtitle && <span className="hidden text-[0.78rem] text-slate-ink sm:inline">{subtitle}</span>}
        <span className="ml-auto flex items-center gap-1.5">
          <span className="hidden items-center gap-1.5 rounded-sm border border-slate-hair bg-paper px-2 py-1 sm:flex">
            <WifiOff size={11} className="text-syn-ink" />
            <span className="caps text-slate-ink">local</span>
          </span>
          <button
            type="button"
            onClick={() => {
              onReset?.();
              tick(900, 0.03);
            }}
            className="caps flex items-center gap-1.5 rounded-sm border border-slate-hair bg-paper px-2.5 py-1.5 text-indigo-soft transition-colors hover:border-indigo-deep hover:text-indigo-deep"
          >
            <RotateCcw size={11} /> reset
          </button>
          {onExport && (
            <button
              type="button"
              onClick={onExport}
              className="caps flex items-center gap-1.5 rounded-sm border border-slate-hair bg-paper px-2.5 py-1.5 text-indigo-soft transition-colors hover:border-indigo-deep hover:text-indigo-deep"
            >
              <Camera size={11} /> export
            </button>
          )}
        </span>
      </header>

      {/* ---- preset strip ---- */}
      {presets && presets.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-hair bg-indigo-deep px-4 py-2.5">
          <span className="caps text-white/40">preset scenarios</span>
          <div className="flex flex-wrap gap-1.5">
            {presets.map((p) => {
              const on = p.id === activePreset;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => {
                    onPreset?.(p.id);
                    tick(1400);
                  }}
                  className={`caps rounded-sm px-2.5 py-1.5 transition-all duration-200 ${
                    on
                      ? "bg-trace text-indigo-deep"
                      : "bg-white/8 text-white/60 hover:bg-white/16 hover:text-white"
                  }`}
                  aria-pressed={on}
                >
                  {p.label}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ---- three-zone body ---- */}
      <div className="grid lg:grid-cols-[248px_minmax(0,1fr)]">
        {/* control deck */}
        <div className="order-2 space-y-5 border-t border-slate-hair bg-paper-tint p-4 lg:order-1 lg:border-r lg:border-t-0">
          <p className="caps border-b border-slate-hair pb-2 text-slate-ink">Parameter control</p>
          {controls}
          <p className="caps flex items-center gap-1.5 pt-1 text-slate-ink">
            <ShieldCheck size={12} className="text-syn-ink" /> 0 bytes transmitted
          </p>
        </div>

        {/* canvas */}
        <div className="order-1 lg:order-2">
          <div className="graticule relative bg-instrument p-3 sm:p-4">{canvas}</div>
        </div>
      </div>

      {/* ---- telemetry rail ---- */}
      <div className="grid grid-cols-2 gap-px border-t border-slate-hair bg-slate-hair sm:grid-cols-4">
        {telemetry.map((t) => (
          <div key={t.key} className="bg-instrument px-4 py-3">
            <p className="caps text-white/35">{t.key}</p>
            <p
              className="num mt-1 text-[1.35rem] font-medium leading-none tracking-tight"
              style={{ color: t.tone ?? "#00F2FE" }}
            >
              {t.value}
              {t.unit && (
                <span className="ml-1 text-[0.66rem] font-normal text-white/55">{t.unit}</span>
              )}
            </p>
          </div>
        ))}
      </div>

      {/* ---- insight + cite ---- */}
      <figcaption className="flex flex-col gap-4 border-t border-slate-hair bg-paper px-4 py-4 sm:flex-row sm:items-start">
        <div className="min-w-0 flex-1">
          <p className="caps text-slate-ink">Scientific insight</p>
          <div className="mt-1.5 text-[0.9rem] leading-relaxed text-indigo-soft">{insight}</div>
        </div>
        <button
          type="button"
          onClick={() => setCite(true)}
          className="caps flex shrink-0 items-center gap-1.5 self-start rounded-sm bg-indigo-deep px-3 py-2.5 text-paper transition-colors hover:bg-indigo-mid"
        >
          <Quote size={11} /> cite this model
        </button>
      </figcaption>

      <CiteModal
        open={cite}
        onClose={() => setCite(false)}
        title={`LavaHealth Innovation Hub — ${title}`}
        params={citeParams}
      />
    </motion.figure>
  );
}
