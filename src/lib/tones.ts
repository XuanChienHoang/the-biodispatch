/* Surface-aware accent tones. Pure, dependency-free, safe on server + client. */

/**
 * Returns the readable ink colour for a given background accent:
 * light accents get deep indigo, dark accents get white.
 */
export function inkOn(hex: string): string {
  const h = hex.replace("#", "");
  if (h.length < 6) return "#FFFFFF";
  const r = parseInt(h.slice(0, 2), 16) / 255;
  const g = parseInt(h.slice(2, 4), 16) / 255;
  const b = parseInt(h.slice(4, 6), 16) / 255;
  const lin = (c: number) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
  const lum = 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
  return lum > 0.25 ? "#0B192C" : "#FFFFFF";
}

/**
 * Neon accents belong to the instrument (dark surfaces). On journal white they
 * are illegible, so light surfaces use the ink step of the same hue.
 */
const PAPER_INK: Record<string, string> = {
  "#00F2FE": "#0E7490",
  "#10B981": "#047857",
  "#F59E0B": "#B45309",
  "#FF6B4A": "#C2410C",
  "#FFFFFF": "#0B192C",
};

export function onPaper(hex: string): string {
  return PAPER_INK[hex.toUpperCase()] ?? hex;
}
