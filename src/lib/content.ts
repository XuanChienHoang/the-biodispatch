/* Editorial corpus — seeded into Postgres, mirrored here as a build-safe fallback. */

export type Tier = "Fundamentals" | "Clinical Deep-Dive" | "Lab Gizmo";
export type Organ = "Brain" | "Heart" | "Gut" | "Cellular Aging" | "Immune" | "Metabolic";

export interface Article {
  slug: string;
  title: string;
  dek: string;
  titleVi?: string;
  dekVi?: string;
  organ: Organ;
  tier: Tier;
  minutes: number;
  doi: string;
  gizmo: string | null;
  feature?: boolean;
}

export const ORGANS: Organ[] = ["Brain", "Heart", "Gut", "Cellular Aging", "Immune", "Metabolic"];
export const TIERS: Tier[] = ["Fundamentals", "Clinical Deep-Dive", "Lab Gizmo"];

export const ARTICLES: Article[] = [
  {
    slug: "curcumin-piperine-sinh-kha-dung",
    title: "Vì sao hạt tiêu đen giúp tinh chất nghệ tăng hấp thu gấp 20 lần? Giải mã 'chiếc phanh sinh học' của lá gan",
    dek: "Con số tăng hấp thu 2000% (gấp 20 lần) khi kết hợp tiêu đen và nghệ là hoàn toàn có thật. Nhưng cơ chế thực sự không phải là tiêu đen giúp nghệ 'thấm' qua ruột tốt hơn, mà là nó tạm thời kìm hãm lá gan đào thải nghệ quá nhanh.",
    titleVi: "Vì sao hạt tiêu đen giúp tinh chất nghệ tăng hấp thu gấp 20 lần? Giải mã 'chiếc phanh sinh học' của lá gan",
    dekVi: "Con số tăng hấp thu 2000% (gấp 20 lần) khi kết hợp tiêu đen và nghệ là hoàn toàn có thật. Nhưng cơ chế thực sự không phải là tiêu đen giúp nghệ 'thấm' qua ruột tốt hơn, mà là nó tạm thời kìm hãm lá gan đào thải nghệ quá nhanh.",
    organ: "Immune",
    tier: "Lab Gizmo",
    minutes: 6,
    doi: "10.1055/s-2006-957541",
    gizmo: "curcumin-piperine",
    feature: true,
  },
  {
    slug: "curcumin-piperine-bioavailability",
    title: "Curcumin & Piperine Bioavailability",
    dek: "How a bio-enhancer dismantles Phase II hepatic metabolism — and why a 20 mg peppercorn extract moves AUC more than tripling the dose.",
    titleVi: "Sinh khả dụng Curcumin & Piperine: Giải mã 'chiếc phanh sinh học' của lá gan",
    dekVi: "Vì sao chiết xuất tiêu đen 20 mg lại giúp nồng độ nghệ trong máu tăng vọt gấp 20 lần thay vì tăng liều uống? Khám phá cơ chế ức chế chuyển hóa Pha 2.",
    organ: "Immune",
    tier: "Lab Gizmo",
    minutes: 14,
    doi: "10.1055/s-2006-957541",
    gizmo: "curcumin-piperine",
  },
  {
    slug: "metabolomic-horizon-clinical-diagnostics-vi",
    title: "Đường chân trời Chuyển hóa học: Vì sao các phân tử nhỏ đang thay đổi hoàn toàn cách phát hiện sớm bệnh lý?",
    dek: "Nếu xét nghiệm gen chỉ cho biết những gì 'có thể xảy ra trong tương lai', thì xét nghiệm chất chuyển hóa (Metabolomics) cho ta biết cơ thể 'đang thực sự vận hành ra sao' ngay lúc này. Giải mã khoa học chẩn đoán sớm dưới góc nhìn y sinh thực chứng.",
    titleVi: "Đường chân trời Chuyển hóa học: Vì sao các phân tử nhỏ đang thay đổi hoàn toàn cách phát hiện sớm bệnh lý?",
    dekVi: "Nếu xét nghiệm gen chỉ cho biết những gì 'có thể xảy ra trong tương lai', thì xét nghiệm chất chuyển hóa (Metabolomics) cho ta biết cơ thể 'đang thực sự vận hành ra sao' ngay lúc này. Giải mã khoa học chẩn đoán sớm dưới góc nhìn y sinh thực chứng.",
    organ: "Metabolic",
    tier: "Clinical Deep-Dive",
    minutes: 7,
    doi: "10.1093/nar/gkab1062",
    gizmo: "biomarker",
    feature: false,
  },
  {
    slug: "pharmacokinetics-one-compartment",
    title: "Reading a Serum–Concentration Curve",
    dek: "Cmax, Tmax, half-life and the therapeutic window — the four numbers that decide whether a dose is a dose.",
    titleVi: "Cách đọc đường cong Nồng độ Dược chất trong Máu (Dược động học)",
    dekVi: "Cmax, Tmax, thời gian bán thải và cửa sổ điều trị — 4 chỉ số quyết định một liều uống có thực sự phát huy tác dụng hay không.",
    organ: "Metabolic",
    tier: "Fundamentals",
    minutes: 9,
    doi: "10.1002/9780470740412",
    gizmo: "pk",
  },
  {
    slug: "ampk-nrf2-mtor-map",
    title: "Four Nodes, One Cell",
    dek: "Berberine on AMPK, sulforaphane on Nrf2, quercetin on mTOR, curcumin on NF-κB — traced on a single interactive pathway.",
    titleVi: "Bản đồ 4 Nút Tín hiệu Tế bào: AMPK, Nrf2, mTOR & NF-κB",
    dekVi: "Berberine tác động lên AMPK, sulforaphane kích hoạt Nrf2, quercetin ức chế mTOR, curcumin điều hòa NF-κB trên một tế bào trực quan.",
    organ: "Cellular Aging",
    tier: "Lab Gizmo",
    minutes: 17,
    doi: "10.1038/nrd3757",
    gizmo: "pathway",
  },
  {
    slug: "supplement-drug-interaction-matrix",
    title: "The Interaction Matrix",
    dek: "Antagonist, potentiator or silent: 64 pairings of common nutraceuticals and prescription drugs, with the mechanism behind each cell.",
    titleVi: "Ma trận Tương tác Hoạt chất & Thuốc Điều trị",
    dekVi: "Đồng vận, đối kháng hay trung tính: 64 cặp phối hợp giữa thực phẩm bảo vệ sức khỏe và thuốc kê đơn kèm cơ chế sinh hóa chi tiết.",
    organ: "Gut",
    tier: "Clinical Deep-Dive",
    minutes: 12,
    doi: "10.1097/CLI.0000000000000042",
    gizmo: "synergy",
  },
  {
    slug: "forecasting-hs-crp-delta",
    title: "Forecasting a Biomarker Delta",
    dek: "Pull baseline values, get a predicted change with 95% confidence bounds drawn straight from pooled meta-analyses.",
    titleVi: "Dự báo Biến thiên Chỉ số Viêm hs-CRP",
    dekVi: "Nhập chỉ số ban đầu, công cụ tính toán mức giảm viêm kèm khoảng tin cậy 95% trích xuất từ các phân tích gộp (meta-analysis).",
    organ: "Heart",
    tier: "Clinical Deep-Dive",
    minutes: 11,
    doi: "10.1001/jama.2017.18240",
    gizmo: "biomarker",
  },
  {
    slug: "policosanol-versus-statins",
    title: "Policosanol, Reconsidered",
    dek: "Twenty years of Cuban trial data, the replication gap in Europe, and what a clinician should actually tell a patient.",
    titleVi: "Đánh giá lại Policosanol trong Hạ mỡ máu",
    dekVi: "20 năm dữ liệu thử nghiệm tại Cuba, khoảng trống lặp lại tại châu Âu và lời khuyên thực chứng bác sĩ nên tư vấn cho bệnh nhân.",
    organ: "Heart",
    tier: "Clinical Deep-Dive",
    minutes: 16,
    doi: "10.1161/01.CIR.102.2.192",
    gizmo: null,
  },
  {
    slug: "butyrate-colonocyte-fuel",
    title: "Butyrate Is the Colonocyte's Fuel",
    dek: "Resistant starch → acetate, propionate, butyrate → HDAC inhibition. A gut gizmo you can push from fibre to fermentation.",
    titleVi: "Axit béo Butyrate: Nguồn năng lượng sống của tế bào niêm mạc đại tràng",
    dekVi: "Tinh bột kháng → acetate, propionate, butyrate → nuôi dưỡng tế bào biểu mô ruột non và dập tắt các phản ứng viêm.",
    organ: "Gut",
    tier: "Fundamentals",
    minutes: 10,
    doi: "10.1152/ajpgi.00072.2019",
    gizmo: null,
  },
  {
    slug: "sulforaphane-nrf2-window",
    title: "The Sulforaphane Activation Window",
    dek: "Myrosinase activity, chewing, and the 4-hour Nrf2 peak that boiling a broccoli spear destroys.",
    titleVi: "Cửa sổ Kích hoạt Nrf2 từ Hợp chất Sulforaphane",
    dekVi: "Enzyme myrosinase, cơ chế nhai và đỉnh kích hoạt chống oxy hóa Nrf2 kéo dài 4 giờ mà việc luộc súp lơ quá kỹ sẽ phá hủy.",
    organ: "Cellular Aging",
    tier: "Lab Gizmo",
    minutes: 13,
    doi: "10.1093/carcin/bgs275",
    gizmo: null,
  },
  {
    slug: "melatonin-circadian-zeitgeber",
    title: "Melatonin as a Zeitgeber, Not a Sedative",
    dek: "Why 0.3 mg phase-shifts the clock and 10 mg mostly sedates — dose, dim light, and the suppression curve.",
    titleVi: "Melatonin là 'Người chỉnh nhịp sinh học', không phải thuốc an thần gây ngủ",
    dekVi: "Vì sao liều 0.3 mg giúp tái thiết lập đồng hồ sinh học tự nhiên mà liều cao 10 mg lại gây lơ mơ mệt mỏi vào sáng hôm sau.",
    organ: "Brain",
    tier: "Fundamentals",
    minutes: 8,
    doi: "10.1210/jc.2015-2756",
    gizmo: null,
  },
  {
    slug: "coq10-depletion-in-statins",
    title: "CoQ10 Depletion Under Statin Therapy",
    dek: "HMG-CoA reductase inhibition does not stop at cholesterol. Plasma ubiquinone, myalgia, and the contested substitution trial.",
    titleVi: "Sự suy giảm CoQ10 khi sử dụng Thuốc Statin hạ mỡ máu",
    dekVi: "Thuốc ức chế HMG-CoA reductase không chỉ giảm cholesterol mà còn hạ ubiquinone huyết tương, giải thích triệu chứng đau mỏi cơ bắp.",
    organ: "Heart",
    tier: "Clinical Deep-Dive",
    minutes: 15,
    doi: "10.1016/j.atherosclerosis.2010.01.003",
    gizmo: null,
  },
];

export const GIZMOS = [
  {
    slug: "pk",
    index: "01",
    name: "Pharmacokinetics & Bioavailability Simulator",
    nameVi: "Mô phỏng Dược động học & Sinh khả dụng",
    short: "PK Curve",
    blurb: "One-compartment, first-order absorption. Move dose, delivery form and fed state; Cmax, Tmax, t½ and AUC recompute on every frame.",
    blurbVi: "Hấp thu bậc một 1 ngăn. Thay đổi liều, dạng bào chế và lúc no/đói; Cmax, Tmax, t½ và diện tích dưới đường cong (AUC) tái tính toán tức thì.",
    inputs: ["Dose 50–2000 mg", "3 delivery forms", "Fasting / high-fat meal"],
    inputsVi: ["Liều 50–2000 mg", "3 dạng bào chế", "Lúc đói / Sau ăn no"],
    color: "#00F2FE",
  },
  {
    slug: "pathway",
    index: "02",
    name: "Molecular Pathway & Target Visualizer",
    nameVi: "Bản đồ Con đường Tín hiệu & Thụ thể Tế bào",
    short: "Pathway",
    blurb: "A hand-drawn cell. Select a ligand, watch signal propagate through the receptor to the nucleus, and read the downstream regulation panel.",
    blurbVi: "Tế bào sống trực quan. Chọn hoạt chất, quan sát đường truyền tín hiệu từ màng tế bào vào nhân và xem bảng điều hòa gen phản ứng.",
    inputs: ["4 ligands", "4 receptor nodes", "Nuclear translocation"],
    inputsVi: ["4 hoạt chất sinh học", "4 thụ thể tế bào", "Chuyển vị vào nhân ADN"],
    color: "#10B981",
  },
  {
    slug: "synergy",
    index: "03",
    name: "Synergy & Interaction Checker",
    nameVi: "Ma trận Kiểm tra Tương tác & Hiệp đồng Hoạt chất",
    short: "Matrix",
    blurb: "An 8×8 matrix of supplement–supplement and supplement–drug pairings classified as synergistic, neutral, or antagonistic.",
    blurbVi: "Ma trận 8×8 giữa các hoạt chất tự nhiên và thuốc điều trị, phân loại rõ ràng: tăng tác dụng, trung tính, hay đối kháng gây hại.",
    inputs: ["64 pairings", "Mechanism cards", "Evidence grade"],
    inputsVi: ["64 cặp tương tác", "Thẻ phân tích cơ chế", "Cấp độ bằng chứng A-B-C"],
    color: "#F59E0B",
  },
  {
    slug: "biomarker",
    index: "04",
    name: "Biomarker Delta Forecaster",
    nameVi: "Công cụ Dự báo Mức Biến thiên Chỉ số Viêm (hs-CRP)",
    short: "Forecaster",
    blurb: "Set a baseline; the model returns a predicted change with 95% confidence bounds from pooled meta-analytic effect sizes.",
    blurbVi: "Thiết lập chỉ số nền ban đầu; mô hình dự báo mức giảm viêm kèm khoảng tin cậy 95% trích xuất từ dữ liệu lâm sàng thế giới.",
    inputs: ["4 biomarkers", "95% CI whiskers", "Pooled k / n readout"],
    inputsVi: ["4 chỉ số sinh học", "Khoảng tin cậy 95% CI", "Phân tích gộp thử nghiệm"],
    color: "#FF6B4A",
  },
  {
    slug: "tmao",
    index: "05",
    name: "Gut-Liver TMAO Axis & Atheroma Cascade",
    nameVi: "Trục TMAO Tim - Gan - Ruột & Thác Xơ vữa Động mạch",
    short: "TMAO Axis",
    blurb: "Simulate microbial Choline cleavage by CutC/D, hepatic FMO3 oxidation to TMAO, and macrophage CD36 foam-cell atherogenesis.",
    blurbVi: "Mô phỏng vi khuẩn bẻ gãy Choline thành TMA, enzyme FMO3 gan oxy hóa thành TMAO và thụ thể CD36 thúc đẩy mảng xơ vữa.",
    inputs: ["Choline & Carnitine", "CutC/D & DMB Inhibitor", "eGFR Clearance"],
    inputsVi: ["Khẩu phần Choline", "Enzyme CutC/D & DMB", "Độ lọc cầu thận eGFR"],
    color: "#DC2626",
  },
] as const;

/* ------------------------------------------------------------------ */
/* Synergy matrix                                                      */
/* ------------------------------------------------------------------ */

export type Relation = "synergistic" | "antagonistic" | "neutral" | "potentiates";

export interface Interaction {
  a: string;
  b: string;
  relation: Relation;
  mechanism: string;
  evidence: "A" | "B" | "C";
}

export const MATRIX_AGENTS = [
  "Curcumin",
  "Piperine",
  "Iron",
  "Calcium",
  "Green Tea EGCG",
  "Quercetin",
  "Warfarin",
  "Magnesium",
];

export const INTERACTIONS: Interaction[] = [
  { a: "Curcumin", b: "Piperine", relation: "potentiates", mechanism: "Piperine inhibits intestinal UGT1A1 and CYP3A4, suppressing Phase II glucuronidation of curcuminoids. Predicted AUC fold-change ≈ 20× at 20 mg.", evidence: "A" },
  { a: "Curcumin", b: "Iron", relation: "synergistic", mechanism: "Curcumin chelates Fe³⁺ and increases ferritin expression in enterocytes, augmenting iron loading in iron-deficient subjects.", evidence: "B" },
  { a: "Curcumin", b: "Calcium", relation: "neutral", mechanism: "No shared transporter or CYP/UGT competition at physiological intake. Co-administration does not alter either AUC.", evidence: "B" },
  { a: "Curcumin", b: "Green Tea EGCG", relation: "synergistic", mechanism: "Additive NF-κB suppression; both catechins and curcuminoids converge on IKKβ, giving greater-than-additive hs-CRP reduction.", evidence: "B" },
  { a: "Curcumin", b: "Quercetin", relation: "neutral", mechanism: "Overlapping OATP-mediated uptake but no competitive inhibition at usual intakes; effects on inflammation are additive rather than interactive.", evidence: "C" },
  { a: "Curcumin", b: "Warfarin", relation: "potentiates", mechanism: "Curcuminoids displace warfarin from plasma albumin and inhibit CYP2C9, raising INR. Case reports only — monitor INR within 5 days.", evidence: "C" },
  { a: "Curcumin", b: "Magnesium", relation: "neutral", mechanism: "No pharmacokinetic interaction. Independent absorption pathways (TRPM6/7 vs. passive paracellular).", evidence: "C" },
  { a: "Piperine", b: "Iron", relation: "synergistic", mechanism: "Piperine enhances divalent metal transporter-1 (DMT1) activity, increasing non-haem iron absorption in coeliac and post-bariatric patients.", evidence: "B" },
  { a: "Piperine", b: "Calcium", relation: "neutral", mechanism: "Calcium's tight junction route is insensitive to piperine's enzyme-inhibition mechanism.", evidence: "C" },
  { a: "Piperine", b: "Green Tea EGCG", relation: "potentiates", mechanism: "Intestinal UGT inhibition raises catechin exposure, but also raises theobromine load — modest, dose-capped benefit.", evidence: "B" },
  { a: "Piperine", b: "Quercetin", relation: "potentiates", mechanism: "Quercetin glucuronides are UGT substrates; piperine shifts the equilibrium toward the aglycone, prolonging plasma residence.", evidence: "B" },
  { a: "Piperine", b: "Warfarin", relation: "potentiates", mechanism: "CYP3A4/2C9 inhibition plus P-glycoprotein blockade. Documented INR elevation — avoid concurrent high-dose piperine.", evidence: "B" },
  { a: "Piperine", b: "Magnesium", relation: "neutral", mechanism: "No shared carrier; transient increase in paracellular permeability is not clinically meaningful for Mg²⁺.", evidence: "C" },
  { a: "Iron", b: "Calcium", relation: "antagonistic", mechanism: "Competitive inhibition at DMT1: co-ingestion of 600 mg calcium with ferrous sulfate cuts non-haem iron absorption by up to 60%. Separate by ≥2 h.", evidence: "A" },
  { a: "Iron", b: "Green Tea EGCG", relation: "antagonistic", mechanism: "Polyphenol–iron complex formation is insoluble at gastric pH; tea with meals measurably reduces ferritin response.", evidence: "A" },
  { a: "Iron", b: "Quercetin", relation: "neutral", mechanism: "Quercetin's chelation affinity for Fe³⁺ is too low at dietary doses to displace DMT1 transport.", evidence: "C" },
  { a: "Iron", b: "Warfarin", relation: "neutral", mechanism: "No documented pharmacokinetic interaction; haem iron does not alter vitamin-K-dependent clotting factor synthesis.", evidence: "C" },
  { a: "Iron", b: "Magnesium", relation: "antagonistic", mechanism: "Divalent cations share DMT1 and TRPM6 competition. High-dose magnesium hydroxide reduces ferrous absorption.", evidence: "B" },
  { a: "Calcium", b: "Green Tea EGCG", relation: "antagonistic", mechanism: "Calcium forms insoluble catechinate salts, lowering bioavailable EGCG by roughly a third.", evidence: "B" },
  { a: "Calcium", b: "Quercetin", relation: "neutral", mechanism: "No transport-level competition. Quercetin aglycone is passively absorbed; calcium is paracellular/transcellular.", evidence: "C" },
  { a: "Calcium", b: "Warfarin", relation: "neutral", mechanism: "Vitamin K content of calcium supplements is negligible; no INR effect at ≤1200 mg/d.", evidence: "C" },
  { a: "Calcium", b: "Magnesium", relation: "antagonistic", mechanism: "Reciprocal competition at TRPM6/7 and DMT1. High calcium:magnesium ratios depress Mg status; maintain ≈2:1.", evidence: "A" },
  { a: "Green Tea EGCG", b: "Quercetin", relation: "synergistic", mechanism: "Quercetin inhibits catechol-O-methyltransferase, sparing EGCG from methylation and extending its plasma half-life.", evidence: "B" },
  { a: "Green Tea EGCG", b: "Warfarin", relation: "potentiates", mechanism: "Vitamin K antagonism is additive with warfarin; high-dose green tea extract has triggered INR spikes.", evidence: "B" },
  { a: "Green Tea EGCG", b: "Magnesium", relation: "neutral", mechanism: "No shared transport or metabolism. Antacids do not alter catechin AUC.", evidence: "C" },
  { a: "Quercetin", b: "Warfarin", relation: "potentiates", mechanism: "CYP2C9 inhibition raises S-warfarin exposure. Modest but real — monitor rather than avoid.", evidence: "C" },
  { a: "Quercetin", b: "Magnesium", relation: "neutral", mechanism: "No interaction; quercetin's O-methylated metabolites are glucuronidated, not Mg-dependent.", evidence: "C" },
  { a: "Warfarin", b: "Magnesium", relation: "neutral", mechanism: "No effect on vitamin-K epoxide recycling; magnesium oxide does not alter anticoagulation.", evidence: "C" },
];

export const RELATION_META: Record<Relation, { label: string; color: string; sign: string }> = {
  synergistic: { label: "Synergistic", color: "#10B981", sign: "+" },
  potentiates: { label: "Potentiates", color: "#00F2FE", sign: "↑" },
  neutral: { label: "Neutral", color: "#64748B", sign: "·" },
  antagonistic: { label: "Antagonistic", color: "#FF6B4A", sign: "−" },
};

export function interactionFor(a: string, b: string): Interaction | undefined {
  return (
    INTERACTIONS.find((i) => i.a === a && i.b === b) ||
    INTERACTIONS.find((i) => i.a === b && i.b === a)
  );
}
