"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { inkOn, onPaper } from "@/lib/tones";
export { inkOn, onPaper };

let ctx: AudioContext | null = null;
export function tick(freq = 2200, gainAmt = 0.018) {
  if (typeof window === "undefined") return;
  try {
    if (!ctx) ctx = new AudioContext();
    if (ctx.state === "suspended") return;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = "square";
    o.frequency.value = freq;
    g.gain.value = gainAmt;
    o.connect(g);
    g.connect(ctx.destination);
    const now = ctx.currentTime;
    g.gain.setValueAtTime(gainAmt, now);
    g.gain.exponentialRampToValueAtTime(0.0001, now + 0.035);
    o.start(now);
    o.stop(now + 0.04);
  } catch {
    /* audio unavailable */
  }
}

export function LabSlider({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
  unit,
  display,
  variant = "lab",
  hint,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (v: number) => void;
  unit?: string;
  display?: string;
  variant?: "lab" | "on-paper";
  hint?: string;
}) {
  void variant;
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="flex items-baseline justify-between gap-2">
        <label className="caps text-slate-ink" htmlFor={`s-${label}`}>
          {label}
        </label>
        <span className="num text-[1.02rem] font-medium tracking-tight text-indigo-deep">
          {display ?? value}
          {unit && <span className="ml-1 text-[0.68rem] text-slate-ink">{unit}</span>}
        </span>
      </div>
      <input
        id={`s-${label}`}
        type="range"
        className={`lab mt-1 ${variant === "on-paper" ? "on-paper" : ""}`}
        min={min}
        max={max}
        step={step}
        value={value}
        style={{ ["--pct" as string]: `${pct}%` }}
        onChange={(e) => onChange(Number(e.target.value))}
        onPointerUp={() => tick(2600)}
        aria-valuetext={`${display ?? value} ${unit ?? ""}`}
      />
      {hint && (
        <p className={`text-[0.72rem] leading-snug ${variant === "lab" ? "text-slate-ink" : "text-slate-ink"}`}>
          {hint}
        </p>
      )}
    </div>
  );
}

export function Segmented<T extends string>({
  label,
  options,
  value,
  onChange,
  tone = "#00F2FE",
}: {
  label?: string;
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
  tone?: string;
}) {
  return (
    <div>
      {label && <p className="caps mb-1.5 text-slate-ink">{label}</p>}
      <div className="flex flex-wrap gap-px overflow-hidden rounded-sm bg-slate-hair p-px">
        {options.map((o) => {
          const active = o.value === value;
          return (
            <button
              key={o.value}
              type="button"
              onClick={() => {
                onChange(o.value);
                tick(1600);
              }}
              className={`caps flex-1 whitespace-nowrap px-2.5 py-2 transition-all duration-200 ${
                active ? "" : "bg-paper text-slate-ink hover:bg-indigo-deep hover:text-paper"
              }`}
              style={active ? { background: tone, color: inkOn(tone) } : undefined}
              aria-pressed={active}
            >
              {o.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function useCountUp(target: number, decimals = 2, duration = 650) {
  const [v, setV] = useState(target);
  const from = useRef(target);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    const start = performance.now();
    const a = from.current;
    const b = target;
    if (Math.abs(a - b) < 1e-9) return;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      from.current = b;
      setV(b);
      return;
    }
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const e = 1 - Math.pow(1 - t, 3);
      setV(a + (b - a) * e);
      if (t < 1) raf.current = requestAnimationFrame(step);
      else from.current = b;
    };
    raf.current = requestAnimationFrame(step);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
      from.current = b;
    };
  }, [target, duration]);

  return v.toFixed(decimals);
}

export function useExportPng() {
  return useCallback((svgId: string, filename: string) => {
    const el = document.getElementById(svgId) as SVGSVGElement | null;
    if (!el) return;
    try {
      const xml = new XMLSerializer().serializeToString(el);
      const blob = new Blob([xml], { type: "image/svg+xml;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        const c = document.createElement("canvas");
        c.width = el.viewBox.baseVal.width * 2;
        c.height = el.viewBox.baseVal.height * 2;
        const g = c.getContext("2d");
        if (!g) return;
        g.fillStyle = "#08121F";
        g.fillRect(0, 0, c.width, c.height);
        g.drawImage(img, 0, 0, c.width, c.height);
        URL.revokeObjectURL(url);
        const a = document.createElement("a");
        a.download = `${filename}.png`;
        a.href = c.toDataURL("image/png");
        a.click();
      };
      img.onerror = () => URL.revokeObjectURL(url);
      img.src = url;
    } catch {
      /* export unsupported */
    }
  }, []);
}

export function exportCsv(rows: (string | number)[][], filename: string) {
  try {
    const csv = rows.map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${filename}.csv`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 500);
  } catch {
    /* ignore */
  }
}
