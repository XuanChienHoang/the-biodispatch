/**
 * Pharmacokinetic engine — 1-compartment, first-order absorption.
 *   C(t) = (F · D · ka) / (V · (ka - ke)) · ( e^{-ke·t} - e^{-ka·t} )
 * All computation is local. Nothing leaves the browser.
 */

export type Form = "standard" | "micronized" | "liposomal";
export type Food = "fasting" | "highfat";

export interface PKParams {
  doseMg: number;
  form: Form;
  food: Food;
}

export interface PKPoint {
  t: number;
  c: number;
}

export interface PKResult {
  points: PKPoint[];
  cmax: number;
  tmax: number;
  halfLife: number;
  auc: number;
  kel: number;
  ka: number;
  F: number;
  V: number;
}

/** Formulation-specific fraction absorbed + absorption rate. */
const FORM: Record<Form, { F: number; ka: number; V: number; label: string; note: string }> = {
  standard: { F: 0.011, ka: 1.35, V: 148, label: "Standard extract", note: "Native curcuminoids, rapid Phase II clearance" },
  micronized: { F: 0.065, ka: 1.05, V: 148, label: "Micronized / phytosome", note: "↓ particle size, ↑ dissolution surface" },
  liposomal: { F: 0.19, ka: 0.72, V: 148, label: "Liposomal (Meriva-type)", note: "Phospholipid complex, lymphatic bypass" },
};

/** High-fat meal: chylomicron transport raises exposure, delays Tmax. */
const FOOD: Record<Food, { fMul: number; kaMul: number; lag: number }> = {
  fasting: { fMul: 1, kaMul: 1, lag: 0 },
  highfat: { fMul: 2.4, kaMul: 0.62, lag: 0.65 },
};

export const FORM_META = FORM;

/** Terminal elimination rate constant for curcumin ≈ t½ 6–8 h. */
export const BASE_KEL = 0.099;

export function simulate(p: PKParams): PKResult {
  const f = FORM[p.form];
  const meal = FOOD[p.food];
  const F = Math.min(0.62, f.F * meal.fMul);
  const ka = f.ka * meal.kaMul;
  const V = f.V;
  const ke = BASE_KEL;
  const lag = meal.lag;

  const points: PKPoint[] = [];
  const dt = 0.05;
  for (let t = 0; t <= 24.0001; t += dt) {
    const tt = Math.max(0, t - lag);
    const c =
      tt <= 0
        ? 0
        : ((F * p.doseMg * ka) / (V * (ka - ke))) *
          (Math.exp(-ke * tt) - Math.exp(-ka * tt));
    points.push({ t, c: Math.max(0, c) });
  }

  let cmax = 0;
  let tmax = 0;
  for (const pt of points) {
    if (pt.c > cmax) {
      cmax = pt.c;
      tmax = pt.t;
    }
  }

  // Trapezoidal AUC(0→24)
  let auc = 0;
  for (let i = 1; i < points.length; i++) {
    auc += ((points[i].c + points[i - 1].c) / 2) * (points[i].t - points[i - 1].t);
  }

  return { points, cmax, tmax, halfLife: Math.LN2 / ke, auc, kel: ke, ka, F, V };
}

/* ------------------------------------------------------------------ */
/* Curcumin × Piperine — the headline gizmo                            */
/* ------------------------------------------------------------------ */

/**
 * Piperine inhibits hepatic & intestinal UDP-glucuronosyltransferase
 * (UGT1A1) and CYP3A4, collapsing Phase II glucuronidation clearance.
 * Modelled as a dose-dependent fall in elimination rate + rise in F.
 */
export function curcuminPiperine(piperineMg: number, doseMg = 1000) {
  // saturates at 20 mg piperine: F 1.1 % → 5.5 %, ke 0.128 → 0.032 h⁻¹
  // AUC fold = (F₂/F₁)·(ke₁/ke₂) = 5 × 4 = 20.0 at saturation
  const frac = Math.min(1, piperineMg / 20);
  const ke = 0.128 * (1 - 0.75 * frac); // t½ 5.4 h → 21.7 h
  const F = 0.011 * (1 + 4 * frac);
  const ka = 1.35;
  const V = 148;

  const mk = (kel: number, fracAbs: number): PKPoint[] => {
    const f = 0.011 * (1 + 4 * fracAbs);
    const out: PKPoint[] = [];
    for (let t = 0; t <= 24.0001; t += 0.05) {
      const c =
        Math.abs(ka - kel) < 1e-6
          ? ((f * doseMg * ka) / V) * t * Math.exp(-ka * t)
          : ((f * doseMg * ka) / (V * (ka - kel))) *
            (Math.exp(-kel * t) - Math.exp(-ka * t));
      out.push({ t, c: Math.max(0, c) });
    }
    return out;
  };

  // reference trace: unmodified Phase II clearance
  const control = mk(0.128, 0);
  const treated = mk(ke, frac);

  const stat = (pts: PKPoint[]) => {
    let cmax = 0;
    let tmax = 0;
    let auc = 0;
    for (const p of pts)
      if (p.c > cmax) {
        cmax = p.c;
        tmax = p.t;
      }
    for (let i = 1; i < pts.length; i++)
      auc += ((pts[i].c + points_safe_prev(pts, i)) / 2) * (pts[i].t - pts[i - 1].t);
    return { cmax, tmax, auc };
  };

  function points_safe_prev(pts: PKPoint[], i: number) {
    return pts[i - 1].c;
  }

  const a = stat(control);
  const b = stat(treated);

  return {
    control,
    treated,
    controlStats: a,
    treatedStats: b,
    aucFold: b.auc / a.auc,
    keControl: 0.128,
    keTreated: ke,
    halfLife: Math.LN2 / ke,
    F,
    ugtInhibition: frac * 88, // % predicted UGT1A1 suppression
    glucuronideFrac: 100 - frac * 63,
    piperineMg,
  };
}

/* ------------------------------------------------------------------ */
/* Biomarker delta forecaster — pooled meta-analytic effect sizes      */
/* ------------------------------------------------------------------ */

export interface BiomarkerSpec {
  key: string;
  name: string;
  unit: string;
  min: number;
  max: number;
  step: number;
  def: number;
  /** pooled effect as % of baseline, and its 95% CI half-width in % */
  delta: number;
  ci: number;
  comparator: string;
  k: number;
  n: number;
}

export const BIOMARKERS: BiomarkerSpec[] = [
  { key: "glucose", name: "Fasting glucose", unit: "mg/dL", min: 70, max: 180, step: 1, def: 108, delta: -7.4, ci: 2.9, comparator: "Berberine 500 mg × 3/d", k: 12, n: 1063 },
  { key: "ldl", name: "LDL cholesterol", unit: "mg/dL", min: 60, max: 220, step: 1, def: 142, delta: -8.1, ci: 3.4, comparator: "Plant sterols 2 g/d", k: 19, n: 3114 },
  { key: "crp", name: "hs-CRP", unit: "mg/L", min: 0.2, max: 12, step: 0.1, def: 3.1, delta: -24.6, ci: 9.8, comparator: "Curcumin 1000 mg/d", k: 9, n: 742 },
  { key: "tg", name: "Triglycerides", unit: "mg/dL", min: 50, max: 400, step: 1, def: 168, delta: -12.3, ci: 5.1, comparator: "Omega-3 EPA+DHA 2 g/d", k: 21, n: 4890 },
];
