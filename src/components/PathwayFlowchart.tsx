"use client";

import React, { useState, useRef } from "react";
import {
  ArrowRight,
  ArrowDown,
  Activity,
  Zap,
  Sparkles,
  ShieldAlert,
  CheckCircle2,
  GitBranch,
  Flame,
  Layers,
  Code,
  Info,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  Columns,
  Dna,
  Brain,
  Droplets,
  Clock,
  HeartPulse
} from "lucide-react";

interface PathwayFlowchartProps {
  rawText: string;
  isVi?: boolean;
}

interface StepNode {
  title: string;
  role: "input" | "sensor" | "inhibition" | "pathology" | "outcome";
  roleLabel: string;
  description?: string;
}

interface PathwayLine {
  condition?: string;
  steps: StepNode[];
}

/**
 * Intelligent Biological Knowledge Dictionary for Interactive Explanations
 */
function getNodeExplanation(title: string, role: StepNode["role"], isVi: boolean): string {
  const lower = title.toLowerCase();

  // Glymphatic System
  if (lower.includes("giấc ngủ sâu") || lower.includes("nrem") || lower.includes("slow-wave")) {
    return isVi
      ? "Giai đoạn ngủ sâu sóng chậm (NREM Delta). Lúc này hoạt động điện não đồng bộ chậm, hệ giao cảm giảm tiết hormone báo động, tạo điều kiện vật lý tiên quyết để khởi động hệ thống làm sạch não bộ."
      : "Slow-wave deep sleep (NREM delta waves). Synchronized slow oscillations silence sympathetic tone, creating the physiological prerequisites for brain self-cleansing.";
  }
  if (lower.includes("noradrenaline") || lower.includes("noradrenergic")) {
    return isVi
      ? "Chất dẫn truyền thần kinh cảnh giác do nhân lục (locus coeruleus) tiết ra. Khi ngủ sâu, nồng độ chất này tụt chạm đáy, khiến các tế bào thần kinh co nhỏ lại, giải phóng thể tích mô não."
      : "Vigilance neurotransmitter from the locus coeruleus. During deep sleep, noradrenergic tone plummets, causing cortical neurons to shrink and dramatically freeing up intracranial space.";
  }
  if (lower.includes("khoảng kẽ") || lower.includes("60%") || lower.includes("interstitial space")) {
    return isVi
      ? "Thể tích khoảng kẽ nội sọ nở rộng thêm 60%. Khoảng trống giữa các tế bào biến từ những con hẻm chật chội ban ngày thành đại lộ thênh thang cho dịch lỏng lưu thông."
      : "The interstitial space expands by 60%. Narrow intercellular gaps transform into expansive channels, lowering hydraulic resistance for fluid convection.";
  }
  if (lower.includes("aqp4") || lower.includes("aquaporin") || lower.includes("kênh aqp4")) {
    return isVi
      ? "Kênh nước Aquaporin-4 nằm dày đặc ở bàn chân tế bào hình sao (astrocytes) bọc quanh mạch máu não. Khi mở van đối lưu, hàng lít dịch não tủy ào ạt chảy qua để sục rửa mô thần kinh."
      : "Aquaporin-4 water channels polarized on astrocytic vascular endfeet. When opened, they drive convective influx of cerebrospinal fluid to flush neural parenchyma.";
  }
  if (lower.includes("dịch não tủy") || lower.includes("amyloid") || lower.includes("tau") || lower.includes("csf")) {
    return isVi
      ? "Dịch não tủy (CSF) cuốn phăng các mảng protein rác thải Amyloid-Beta và Tau gây bệnh Alzheimer, đưa về xoang tĩnh mạch màng cứng để đào thải an toàn."
      : "Cerebrospinal fluid (CSF) sweeps toxic monomeric and oligomeric Amyloid-Beta and Hyperphosphorylated Tau proteins into dural lymphatic vessels for systemic clearance.";
  }

  // NAD+ / CD38 / Sirtuins
  if (lower.includes("sasp") || lower.includes("senescent") || lower.includes("già cỗi")) {
    return isVi
      ? "Tế bào già cỗi không chịu chết (zombie cells) liên tục tiết ra bão cytokine viêm SASP, gây độc và lây nhiễm trạng thái lão hóa sang các mô khỏe mạnh lân cận."
      : "Senescent zombie cells continuously secrete the Senescence-Associated Secretory Phenotype (SASP), spreading paracrine inflammatory stress to healthy bystander cells.";
  }
  if (lower.includes("cd38")) {
    return isVi
      ? "Enzyme bề mặt tế bào tiêu thụ NAD+ mạnh nhất cơ thể. Càng lớn tuổi, đại thực bào biểu hiện CD38 tăng vọt 300-500%, trực tiếp ngốn sạch nguồn NAD+ của ty thể."
      : "The primary NAD+-consuming glycohydrolase on macrophages. CD38 expression surges 300-500% with age, draining cellular NAD+ pools required for DNA repair.";
  }
  if (lower.includes("100 phân tử nad") || lower.includes("100 nad+")) {
    return isVi
      ? "Tốc độ hủy diệt: Cứ xúc tác 1 chu kỳ, 1 phân tử CD38 phá hủy tới 100 phân tử NAD+. Đây là 'lỗ đen' hút cạn nguồn năng lượng trường thọ."
      : "Destructive kinetics: Each catalytic cycle of CD38 degrades up to 100 NAD+ molecules, starving longevity enzymes of their essential metabolic cofactor.";
  }
  if (lower.includes("sirtuin") || lower.includes("bỏ đói") || lower.includes("starved")) {
    return isVi
      ? "Sirtuins (SIRT1-SIRT7) là nhóm enzyme điều hòa gen trường thọ. Khi thiếu NAD+, Sirtuins ngừng hoạt động, khiến ty thể thoái hóa và DNA tích lũy đột biến."
      : "Sirtuins are NAD+-dependent deacetylases governing mitochondrial biogenesis and epigenetic maintenance. Without NAD+, Sirtuins stall, accelerating cellular decay.";
  }

  // Insulin / IGF-1 / Cancer
  if (lower.includes("insulin") || lower.includes("igf-1") || lower.includes("thụ thể")) {
    return isVi
      ? "Hormone đồng hóa tăng vọt khi đường huyết cao. Khi gắn vào thụ thể Tyrosine Kinase, nó gửi tín hiệu ra lệnh cho tế bào tăng tốc phân chia vô hạn."
      : "Anabolic growth factors elevated by refined carbohydrates. Ligand binding to receptor tyrosine kinases sends continuous proliferative signals to dormant or mutant cells.";
  }
  if (lower.includes("pi3k")) {
    return isVi
      ? "Enzyme Phosphoinositide 3-kinase. Mắt xích trung gian chuyển hóa lipid màng thành chất truyền tin thứ hai PIP3, kích hoạt toàn bộ trục sinh tồn của tế bào."
      : "Phosphoinositide 3-kinase converts PIP2 to PIP3 at the plasma membrane, serving as the master upstream activator of cell survival and anabolic growth.";
  }
  if (lower.includes("akt") || lower.includes("phosphoryl")) {
    return isVi
      ? "Protein Kinase B (Akt). Khi được phosphoryl hóa, Akt khóa chặt các protein kích hoạt apoptosis, tước bỏ khả năng tự sát của các tế bào tổn thương."
      : "Protein Kinase B (Akt). Once phosphorylated, Akt directly inhibits pro-apoptotic proteins, rendering damaged or mutated cells resistant to programmed cell death.";
  }
  if (lower.includes("mtorc1") || lower.includes("mtor")) {
    return isVi
      ? "Công tắc tăng trưởng tế bào trung tâm. mTORC1 thúc đẩy sinh tổng hợp protein ồ ạt nhưng đồng thời dập tắt hoàn toàn quá trình dọn rác tự thực bào (Autophagy)."
      : "Mechanistic Target of Rapamycin Complex 1. Drives macromolecular protein synthesis and cell size while completely silencing protective autophagic clearance.";
  }

  // AMPK & Nrf2
  if (lower.includes("ampk")) {
    return isVi
      ? "Cảm biến năng lượng tế bào (kích hoạt khi tỉ lệ AMP/ATP tăng). Bật công tắc AMPK sẽ ức chế mTOR, kích thích đốt mỡ và tái tạo ty thể mới."
      : "Cellular fuel gauge activated during energy deficit. AMPK phosphorylates PGC-1α, suppresses anabolic mTOR, and triggers mitochondrial recycling (mitophagy).";
  }
  if (lower.includes("nrf2")) {
    return isVi
      ? "Yếu tố phiên mã tối cao chỉ huy mạng lưới chống oxy hóa nội sinh. Khi vào nhân, Nrf2 kích hoạt sản sinh Glutathione, Catalase và enzyme giải độc Pha II."
      : "Master cytoprotective transcription factor. Binds the Antioxidant Response Element (ARE) in the nucleus to ramp up endogenous Glutathione, SOD, and Catalase synthesis.";
  }
  if (lower.includes("keap1")) {
    return isVi
      ? "Cảm biến protein giữ chân Nrf2 trong tế bào chất để tiêu hủy. Các hợp chất như Sulforaphane phản ứng với cysteine của Keap1, giải phóng Nrf2 tự do bay vào nhân."
      : "Cytoplasmic repressor of Nrf2. Electrophilic bioactives (e.g., sulforaphane) modify sensor cysteines on Keap1, freeing Nrf2 for nuclear translocation.";
  }

  // Lipids & Vascular
  if (lower.includes("sdldl") || lower.includes("nhỏ đậm đặc")) {
    return isVi
      ? "Hạt LDL nhỏ đậm đặc (Pattern B). Nhỏ gọn nên dễ luồn lách qua khe hở nội mạc, mắc kẹt trong lớp áo trong động mạch và không được thụ thể gan nhận diện."
      : "Small dense LDL particles (Pattern B). Small size allows rapid trans-endothelial penetration, subendothelial proteoglycan entrapment, and prolonged serum circulation.";
  }
  if (lower.includes("oxldl") || lower.includes("gốc tự do")) {
    return isVi
      ? "Hạt LDL bị gốc tự do oxy hóa màng lipid. oxLDL bị đại thực bào coi là kháng nguyên lạ và nuốt ngấu nghiến không kiểm soát, sinh ra tế bào bọt xơ vữa."
      : "Oxidatively modified LDL particles. Recognized by macrophage scavenger receptors (CD36), driving uninhibited lipid engulfment into necrotic foam cells.";
  }
  if (lower.includes("cetp")) {
    return isVi
      ? "Enzyme chuyển dịch este cholesterol. Khi mỡ máu cao, CETP trút triglyceride vào HDL và lấy đi cholesterol tốt, khiến hạt HDL rỗng ruột và dễ bị thận đào thải."
      : "Cholesteryl Ester Transfer Protein. Shuttles triglycerides into HDL while extracting core cholesterol, destabilizing protective HDL into rapidly cleared remnants.";
  }
  if (lower.includes("tmao") || lower.includes("fmo3")) {
    return isVi
      ? "Độc tố chuyển hóa do gan oxy hóa từ khí TMA của vi khuẩn đường ruột. Nồng độ TMAO cao kích hoạt viêm nội mạc và đẩy nhanh xơ vữa mạch vành."
      : "Microbiome-derived metabolite oxidized by hepatic FMO3. Elevated plasma TMAO promotes endothelial adhesion molecule expression and accelerates plaque progression.";
  }

  // Pharmacokinetics & Natural Actives
  if (lower.includes("curcumin") || lower.includes("piperine") || lower.includes("ugt1a1")) {
    return isVi
      ? "Cơ chế hiệp đồng: Piperine hạt tiêu kìm hãm tạm thời enzyme gan UGT1A1 dán nhãn đào thải, giữ Curcumin nguyên vẹn trong máu tăng vọt tới 2000% (20 lần)."
      : "Pharmacokinetic synergy: Piperine reversibly inhibits hepatic UGT1A1 glucuronidation, allowing intact lipophilic curcumin to achieve a 20-fold systemic AUC elevation.";
  }

  // Optogenetics
  if (lower.includes("channelrhodopsin") || lower.includes("470 nm")) {
    return isVi
      ? "Kênh quang học từ tảo lục mở ra trong 1 mili-giây khi bắt photon xanh 470 nm, cho ion dương Na+ tràn vào nơ-ron để kích hoạt xung thần kinh tức thì."
      : "Algal light-gated cation channel opening within 1 ms under 470 nm blue light, admitting sodium ions to trigger instant neuronal action potentials.";
  }
  if (lower.includes("halorhodopsin") || lower.includes("580 nm")) {
    return isVi
      ? "Bơm ion quang học từ vi khuẩn hút Cl- vào khi bắt ánh sáng vàng 580 nm, tăng phân cực màng nơ-ron và dập tắt hoàn toàn xung điện nơ-ron."
      : "Microbial light-driven chloride pump activated by 580 nm amber light, hyperpolarizing the neural membrane to silence action potential discharge.";
  }

  // Fallback generic
  return isVi
    ? `Mắt xích quan trọng trong chuỗi phản ứng sinh học: Điều biến tại phân tử này trực tiếp kiểm soát tốc độ dòng truyền tín hiệu và hiệu quả bảo vệ tế bào.`
    : `Critical regulatory checkpoint: Modulation at this biochemical node directly commands downstream transcription cascades and clinical endpoints.`;
}

/**
 * Classifies node role based on biological keywords
 */
function classifyRole(
  text: string,
  isVi: boolean,
  isFirst: boolean,
  isLast: boolean
): { role: StepNode["role"]; roleLabel: string } {
  const lower = text.toLowerCase();

  // Inhibition / Blockade
  if (
    lower.includes("ức chế") ||
    lower.includes("inhibit") ||
    lower.includes("kìm hãm") ||
    lower.includes("chặn") ||
    lower.includes("brake") ||
    lower.includes("tụt giảm") ||
    lower.includes("dập tắt") ||
    lower.includes("silencing") ||
    lower.includes("suppression")
  ) {
    return {
      role: "inhibition",
      roleLabel: isVi ? "KÌM HÃM / ỨC CHẾ" : "INHIBITION"
    };
  }

  // Pathology / Pro-inflammatory / Oxidative Stress
  if (
    lower.includes("ung thư") ||
    lower.includes("cancer") ||
    lower.includes("mỡ nội tạng") ||
    lower.includes("adiposity") ||
    lower.includes("viêm") ||
    lower.includes("inflamm") ||
    lower.includes("stress oxy hóa") ||
    lower.includes("oxidative") ||
    lower.includes("lps") ||
    lower.includes("endotoxin") ||
    lower.includes("oxldl") ||
    lower.includes("sdldl") ||
    lower.includes("foam cell") ||
    lower.includes("necrosis") ||
    lower.includes("acidic") ||
    lower.includes("acidification") ||
    lower.includes("tổn thương") ||
    lower.includes("injury")
  ) {
    return {
      role: "pathology",
      roleLabel: isVi ? "TÁC NHÂN BỆNH SINH" : "PATHOLOGY"
    };
  }

  // Final Positive Outcome
  if (
    isLast ||
    lower.includes("trường thọ") ||
    lower.includes("longevity") ||
    lower.includes("mitophagy") ||
    lower.includes("tái sinh") ||
    lower.includes("hồi sinh") ||
    lower.includes("rejuvenation") ||
    lower.includes("cleansing") ||
    lower.includes("2000%") ||
    lower.includes("tăng vọt") ||
    lower.includes("bảo vệ") ||
    lower.includes("hàn gắn") ||
    lower.includes("tight junction") ||
    lower.includes("cuốn phăng") ||
    lower.includes("thực bào")
  ) {
    return {
      role: "outcome",
      roleLabel: isVi ? "ĐÍCH ĐẾN SINH HỌC" : "ENDPOINT"
    };
  }

  // Initial Input / Ligand / Stimulus
  if (
    isFirst ||
    lower.includes("uống") ||
    lower.includes("ingested") ||
    lower.includes("dietary") ||
    lower.includes("dưỡng chất") ||
    lower.includes("gắn thụ thể") ||
    lower.includes("binds") ||
    lower.includes("ligand") ||
    lower.includes("pulse") ||
    lower.includes("chiếu") ||
    lower.includes("laser") ||
    lower.includes("bóng tối") ||
    lower.includes("darkness") ||
    lower.includes("giấc ngủ sâu") ||
    lower.includes("sleep")
  ) {
    return {
      role: "input",
      roleLabel: isVi ? "KÍCH HOẠT / ĐẦU VÀO" : "STIMULUS"
    };
  }

  // Default: Sensor / Signaling Hub / Enzyme
  return {
    role: "sensor",
    roleLabel: isVi ? "NÚT TÍN HIỆU" : "SIGNAL HUB"
  };
}

function getRoleIcon(role: StepNode["role"]) {
  switch (role) {
    case "input":
      return <Sparkles size={13} className="text-emerald-400" />;
    case "inhibition":
      return <ShieldAlert size={13} className="text-rose-400" />;
    case "pathology":
      return <Flame size={13} className="text-amber-400" />;
    case "outcome":
      return <CheckCircle2 size={13} className="text-cyan-400" />;
    case "sensor":
    default:
      return <Zap size={13} className="text-sky-400" />;
  }
}

function getRoleBadgeClasses(role: StepNode["role"]) {
  switch (role) {
    case "input":
      return "bg-emerald-950/70 border-emerald-500/40 text-emerald-300";
    case "inhibition":
      return "bg-rose-950/70 border-rose-500/40 text-rose-300";
    case "pathology":
      return "bg-amber-950/70 border-amber-500/40 text-amber-300";
    case "outcome":
      return "bg-cyan-950/80 border-cyan-400/50 text-cyan-200 shadow-[0_0_10px_rgba(6,182,212,0.2)]";
    case "sensor":
    default:
      return "bg-sky-950/70 border-sky-500/40 text-sky-300";
  }
}

function getCardStyle(role: StepNode["role"], isSelected: boolean) {
  if (isSelected) {
    return "border-cyan-400 bg-[#0f243a] shadow-[0_0_20px_rgba(6,182,212,0.35)] ring-2 ring-cyan-400/40";
  }
  switch (role) {
    case "input":
      return "border-emerald-500/30 bg-[#081816] hover:border-emerald-400/60 hover:bg-[#0c2321]";
    case "inhibition":
      return "border-rose-500/30 bg-[#1c0c11] hover:border-rose-400/60 hover:bg-[#271017]";
    case "pathology":
      return "border-amber-500/30 bg-[#1b1207] hover:border-amber-400/60 hover:bg-[#271a0a]";
    case "outcome":
      return "border-cyan-500/40 bg-[#081b28] hover:border-cyan-400/70 hover:bg-[#0c2639]";
    case "sensor":
    default:
      return "border-slate-800 bg-[#0a1424] hover:border-sky-400/50 hover:bg-[#0e1d32]";
  }
}

export function PathwayFlowchart({ rawText, isVi = true }: PathwayFlowchartProps) {
  const [selectedNode, setSelectedNode] = useState<{
    title: string;
    role: StepNode["role"];
    roleLabel: string;
    index: number;
  } | null>(null);
  const [showRaw, setShowRaw] = useState(false);
  // View mode: "grid" (responsive wrapped cards, no horizontal scroll needed) or "stream" (horizontal carousel with navigation)
  const [viewMode, setViewMode] = useState<"grid" | "stream">("grid");

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -260, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 260, behavior: "smooth" });
    }
  };

  // 1. Detect 2D Tree with fork or vertical branch
  const hasBranchSymbols =
    rawText.includes("┌") ||
    rawText.includes("┴") ||
    rawText.includes("┐") ||
    rawText.includes("┼");
  const hasVerticalFlow =
    rawText.includes("│") && rawText.includes("▼");

  if (hasBranchSymbols || hasVerticalFlow) {
    const isMevalonate =
      rawText.toLowerCase().includes("mevalonate") ||
      rawText.toLowerCase().includes("hmg-coa");
    const isGlp1 =
      rawText.toLowerCase().includes("glp-1") ||
      rawText.toLowerCase().includes("ampk kinase activation");
    const isResistantStarchTree =
      rawText.toLowerCase().includes("acetate (60%)") ||
      rawText.toLowerCase().includes("resistant starch reaches");

    if (isMevalonate) {
      return renderMevalonateInteractiveTree(rawText, isVi, showRaw, setShowRaw, setSelectedNode, selectedNode);
    }
    if (isGlp1) {
      return renderGlp1InteractiveTree(rawText, isVi, showRaw, setShowRaw, setSelectedNode, selectedNode);
    }
    if (isResistantStarchTree) {
      return renderResistantStarchTree(rawText, isVi, showRaw, setShowRaw, setSelectedNode, selectedNode);
    }
  }

  // 2. Parse standard linear pathways (can have multiple lines)
  const arrowRegex = /──►|-->|->|→|=>/;
  const rawLines = rawText
    .trim()
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => arrowRegex.test(l));

  if (rawLines.length === 0) {
    return (
      <div className="my-8 rounded-xl border border-slate-800 bg-[#08121f] p-5 shadow-2xl">
        <pre className="overflow-x-auto font-mono text-sm text-cyan-300">
          <code>{rawText}</code>
        </pre>
      </div>
    );
  }

  const parsedPipelines: PathwayLine[] = rawLines.map((line, idx) => {
    let condition: string | undefined = undefined;
    if (rawLines.length > 1) {
      if (line.toLowerCase().includes("alone") || line.toLowerCase().includes("đơn độc")) {
        condition = isVi ? "Điều kiện 1: Dùng Đơn Độc" : "Condition 1: Monotherapy";
      } else if (line.toLowerCase().includes("piperine") || line.toLowerCase().includes("tiêu đen")) {
        condition = isVi ? "Điều kiện 2: Phối hợp Piperine" : "Condition 2: Piperine Synergism";
      } else if (line.toLowerCase().includes("470 nm") || line.toLowerCase().includes("xanh")) {
        condition = isVi ? "Kích thích Ánh sáng Xanh (470 nm)" : "Optical Excitation (470 nm Blue)";
      } else if (line.toLowerCase().includes("580 nm") || line.toLowerCase().includes("vàng")) {
        condition = isVi ? "Ức chế Ánh sáng Vàng (580 nm)" : "Optical Silencing (580 nm Yellow)";
      } else if (line.toLowerCase().includes("retinal") || line.toLowerCase().includes("tiếp xúc")) {
        condition = isVi ? "Kích thích Ánh sáng ban ngày" : "Daytime Light Exposure";
      } else if (line.toLowerCase().includes("darkness") || line.toLowerCase().includes("bóng tối")) {
        condition = isVi ? "Trạng thái Bóng tối Hoàn toàn" : "Complete Darkness Phase";
      } else {
        condition = isVi ? `Chuỗi phản ứng ${idx + 1}` : `Signal Chain ${idx + 1}`;
      }
    }

    const rawSteps = line
      .split(arrowRegex)
      .map((s) => s.replace(/\[/g, "").replace(/\]/g, "").trim())
      .filter(Boolean);

    const steps: StepNode[] = rawSteps.map((stepText, sIdx) => {
      const isFirst = sIdx === 0;
      const isLast = sIdx === rawSteps.length - 1;
      const { role, roleLabel } = classifyRole(stepText, isVi, isFirst, isLast);
      return {
        title: stepText,
        role,
        roleLabel
      };
    });

    return {
      condition,
      steps
    };
  });

  // Calculate max steps count among pipelines
  const maxSteps = Math.max(...parsedPipelines.map((p) => p.steps.length));

  return (
    <div className="my-10 w-full">
      {/* Outer Card with no clipping */}
      <div className="rounded-2xl border border-slate-700/60 bg-[#070e1a] p-4 sm:p-6 shadow-2xl shadow-black/60 relative">
        {/* Subtle background glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-950/20 via-transparent to-transparent pointer-events-none rounded-2xl" />

        {/* Master Header */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 border-b border-slate-700/60 pb-4 mb-5">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-80" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
            </span>
            <div className="flex items-center gap-2">
              <Activity size={16} className="text-cyan-400" />
              <span className="font-mono text-xs uppercase tracking-widest text-cyan-300 font-bold">
                {isVi ? "Sơ đồ Cơ chế Phân tử (Click để xem giải mã)" : "Molecular Mechanism Pipeline"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* View Mode Switcher for multi-step pipelines */}
            {maxSteps >= 4 && (
              <div className="flex items-center bg-slate-900/90 rounded-lg p-0.5 border border-slate-800">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`px-2 py-1 rounded text-[0.65rem] font-mono flex items-center gap-1 transition-all ${
                    viewMode === "grid"
                      ? "bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                  title={isVi ? "Xem dạng lưới toàn màn hình" : "Grid full layout"}
                >
                  <LayoutGrid size={11} />
                  {isVi ? "Lưới" : "Grid"}
                </button>
                <button
                  onClick={() => setViewMode("stream")}
                  className={`px-2 py-1 rounded text-[0.65rem] font-mono flex items-center gap-1 transition-all ${
                    viewMode === "stream"
                      ? "bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                  title={isVi ? "Xem dòng ngang cuộn" : "Stream carousel"}
                >
                  <Columns size={11} />
                  {isVi ? "Dòng ngang" : "Stream"}
                </button>
              </div>
            )}

            <button
              onClick={() => setShowRaw(!showRaw)}
              className="font-mono text-[0.65rem] text-slate-400 hover:text-cyan-300 bg-slate-900/80 px-2 py-1 rounded-md border border-slate-800 hover:border-slate-700 transition-colors flex items-center gap-1"
              title={isVi ? "Xem mã ký tự thô" : "Toggle raw schema"}
            >
              <Code size={11} />
              {showRaw ? (isVi ? "Đóng mã" : "Close") : (isVi ? "Mã gốc" : "Raw")}
            </button>
          </div>
        </div>

        {/* Raw View Toggle */}
        {showRaw && (
          <div className="mb-6 p-4 rounded-xl border border-slate-800 bg-[#050a12] font-mono text-xs text-cyan-300/80 overflow-x-auto">
            <pre className="!my-0 !p-0 !bg-transparent">{rawText}</pre>
          </div>
        )}

        {/* Navigation buttons for Stream Mode */}
        {viewMode === "stream" && maxSteps >= 4 && (
          <div className="relative z-10 flex items-center justify-between text-xs text-slate-400 mb-2 px-1">
            <span className="font-mono text-[0.68rem] text-cyan-300/80">
              👉 {isVi ? "Kéo hoặc bấm mũi tên để duyệt các giai đoạn:" : "Drag or use arrows to navigate phases:"}
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={scrollLeft}
                className="w-7 h-7 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-200 flex items-center justify-center border border-slate-700 transition-colors"
                title={isVi ? "Cuộn sang trái" : "Scroll left"}
              >
                <ChevronLeft size={14} />
              </button>
              <button
                onClick={scrollRight}
                className="w-7 h-7 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-200 flex items-center justify-center border border-slate-700 transition-colors"
                title={isVi ? "Cuộn sang phải" : "Scroll right"}
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        )}

        {/* Pipelines Render */}
        <div className="relative z-10 space-y-6">
          {parsedPipelines.map((pipeline, pIdx) => (
            <div
              key={pIdx}
              className="rounded-xl border border-slate-800/90 bg-[#091424]/90 p-4 sm:p-5 shadow-inner"
            >
              {pipeline.condition && (
                <div className="flex items-center justify-between mb-4 border-b border-slate-800/80 pb-2.5">
                  <span className="font-mono text-[0.72rem] font-bold text-sky-400 uppercase tracking-wider flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                    {pipeline.condition}
                  </span>
                  <span className="text-[0.68rem] text-slate-300 font-mono">
                    {pipeline.steps.length} {isVi ? "Giai đoạn" : "Stages"}
                  </span>
                </div>
              )}

              {/* VIEW MODE 1: ADAPTIVE RESPONSIVE GRID (No truncation, zero cropping) */}
              {viewMode === "grid" || pipeline.steps.length <= 3 ? (
                <div
                  className={`grid gap-3.5 ${
                    pipeline.steps.length === 2
                      ? "grid-cols-1 sm:grid-cols-2"
                      : pipeline.steps.length === 3
                      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                      : pipeline.steps.length === 4
                      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
                      : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                  }`}
                >
                  {pipeline.steps.map((step, sIdx) => {
                    const isSelected =
                      selectedNode?.title === step.title &&
                      selectedNode?.index === sIdx;

                    return (
                      <div
                        key={sIdx}
                        onClick={() =>
                          setSelectedNode(
                            isSelected
                              ? null
                              : {
                                  title: step.title,
                                  role: step.role,
                                  roleLabel: step.roleLabel,
                                  index: sIdx
                                }
                          )
                        }
                        className={`cursor-pointer select-none rounded-xl border p-4 flex flex-col justify-between transition-all duration-200 min-h-[120px] ${getCardStyle(
                          step.role,
                          isSelected
                        )}`}
                      >
                        {/* Top Meta Bar */}
                        <div className="flex items-center justify-between gap-2 mb-2.5">
                          <span className="font-mono text-[0.68rem] font-bold text-slate-300 tracking-wider">
                            {isVi ? `GIAI ĐOẠN 0${sIdx + 1}` : `PHASE 0${sIdx + 1}`}
                          </span>
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-[0.65rem] font-mono font-semibold ${getRoleBadgeClasses(
                              step.role
                            )}`}
                          >
                            {getRoleIcon(step.role)}
                            {step.roleLabel}
                          </span>
                        </div>

                        {/* Title text */}
                        <div className="my-1">
                          <p className="text-sm font-semibold text-slate-100 leading-snug">
                            {step.title}
                          </p>
                        </div>

                        {/* Card bottom hint */}
                        <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[0.68rem] font-mono">
                          <span className="text-slate-400">
                            {sIdx < pipeline.steps.length - 1
                              ? isVi ? "Chuyển tiếp ➔" : "Next ➔"
                              : isVi ? "Đích đến ✓" : "Terminal ✓"}
                          </span>
                          <span className="text-cyan-400 hover:text-cyan-200 font-semibold flex items-center gap-0.5">
                            <Info size={11} />
                            {isSelected ? (isVi ? "Đang mở" : "Active") : (isVi ? "Giải mã" : "Inspect")}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                /* VIEW MODE 2: HORIZONTAL STREAM (Scroll track with NO cropping) */
                <div
                  ref={scrollContainerRef}
                  className="flex items-stretch gap-3 overflow-x-auto pb-4 pt-1 px-1 -mx-1"
                  style={{
                    scrollbarWidth: "thin",
                    scrollbarColor: "rgba(6, 182, 212, 0.4) rgba(15, 23, 42, 0.6)"
                  }}
                >
                  {pipeline.steps.map((step, sIdx) => {
                    const isSelected =
                      selectedNode?.title === step.title &&
                      selectedNode?.index === sIdx;

                    return (
                      <React.Fragment key={sIdx}>
                        <div
                          onClick={() =>
                            setSelectedNode(
                              isSelected
                                ? null
                                : {
                                    title: step.title,
                                    role: step.role,
                                    roleLabel: step.roleLabel,
                                    index: sIdx
                                  }
                            )
                          }
                          className={`w-[230px] shrink-0 cursor-pointer select-none rounded-xl border p-4 flex flex-col justify-between transition-all duration-200 min-h-[120px] ${getCardStyle(
                            step.role,
                            isSelected
                          )}`}
                        >
                          <div className="flex items-center justify-between gap-2 mb-2.5">
                            <span className="font-mono text-[0.68rem] font-bold text-slate-300 tracking-wider">
                              {isVi ? `GIAI ĐOẠN 0${sIdx + 1}` : `PHASE 0${sIdx + 1}`}
                            </span>
                            <span
                              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-[0.65rem] font-mono font-semibold ${getRoleBadgeClasses(
                                step.role
                              )}`}
                            >
                              {getRoleIcon(step.role)}
                              {step.roleLabel}
                            </span>
                          </div>

                          <div className="my-1">
                            <p className="text-sm font-semibold text-slate-100 leading-snug">
                              {step.title}
                            </p>
                          </div>

                          <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[0.68rem] font-mono">
                            <span className="text-slate-400">
                              {sIdx < pipeline.steps.length - 1
                                ? isVi ? "Chuyển tiếp" : "Next"
                                : isVi ? "Đích đến" : "Target"}
                            </span>
                            <span className="text-cyan-400 hover:text-cyan-200 font-semibold flex items-center gap-0.5">
                              <Info size={11} />
                              {isSelected ? (isVi ? "Đang mở" : "Active") : (isVi ? "Giải mã" : "Inspect")}
                            </span>
                          </div>
                        </div>

                        {/* Connector Arrow */}
                        {sIdx < pipeline.steps.length - 1 && (
                          <div className="flex items-center justify-center shrink-0 text-cyan-400 px-1">
                            <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[#0a1829] border border-cyan-500/50 shadow-[0_0_8px_rgba(6,182,212,0.3)]">
                              <ArrowRight size={14} className="text-cyan-400" />
                            </span>
                          </div>
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Selected Node Deep-Dive Drawer */}
        {selectedNode && (
          <div className="relative z-10 mt-6 rounded-xl border border-cyan-500/50 bg-[#0d1e35] p-5 shadow-2xl">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2 text-cyan-300 font-mono text-xs uppercase tracking-wider font-bold">
                <Info size={16} />
                <span>
                  {isVi ? "Giải mã Cơ chế Vi mô của Nút này:" : "Micro-Mechanism Deep Dive:"}
                </span>
                <span className="text-slate-300 font-normal">
                  ({selectedNode.roleLabel})
                </span>
              </div>
              <button
                onClick={() => setSelectedNode(null)}
                className="text-xs text-slate-400 hover:text-white px-2.5 py-1 rounded bg-slate-800 border border-slate-700 transition-colors"
              >
                ✕ {isVi ? "Đóng" : "Close"}
              </button>
            </div>
            <div className="mt-3">
              <h4 className="text-base font-bold text-cyan-200 mb-1.5">
                {selectedNode.title}
              </h4>
              <p className="text-sm text-slate-200 leading-relaxed font-normal">
                {getNodeExplanation(selectedNode.title, selectedNode.role, isVi)}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Interactive Tree for Mevalonate & CoQ10 Bifurcation
 */
function renderMevalonateInteractiveTree(
  rawText: string,
  isVi: boolean,
  showRaw: boolean,
  setShowRaw: React.Dispatch<React.SetStateAction<boolean>>,
  setSelectedNode: React.Dispatch<any>,
  selectedNode: any
) {
  return (
    <div className="my-10 w-full">
      <div className="rounded-2xl border border-slate-700/60 bg-[#070e1a] p-4 sm:p-6 shadow-2xl relative">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-700/60 pb-4 mb-5">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-80" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-400 shadow-[0_0_8px_#f59e0b]" />
            </span>
            <div className="flex items-center gap-2">
              <GitBranch size={16} className="text-amber-400" />
              <span className="font-mono text-xs uppercase tracking-widest text-amber-300 font-bold">
                {isVi ? "Ngã ba Phân nhánh: Con đường Mevalonate & CoQ10" : "Bifurcation: Mevalonate Pathway"}
              </span>
            </div>
          </div>
          <button
            onClick={() => setShowRaw(!showRaw)}
            className="font-mono text-[0.68rem] text-slate-400 hover:text-amber-300 bg-slate-900/80 px-2.5 py-1 rounded-md border border-slate-800"
          >
            {showRaw ? (isVi ? "Đóng mã" : "Close") : (isVi ? "Mã ASCII" : "Raw")}
          </button>
        </div>

        {showRaw && (
          <pre className="mb-6 p-4 rounded-xl border border-slate-800 bg-[#050a12] font-mono text-xs text-amber-300/80 overflow-x-auto">
            {rawText}
          </pre>
        )}

        {/* Trunk Stage 1: Acetyl-CoA -> HMG-CoA */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          <div
            onClick={() =>
              setSelectedNode({
                title: "Acetyl-CoA",
                role: "input",
                roleLabel: isVi ? "TIỀN CHẤT KHỞI ĐẦU" : "SUBSTRATE",
                index: 0
              })
            }
            className="cursor-pointer rounded-xl border border-slate-800 bg-[#0a1322] hover:border-sky-400/50 p-4 transition-all"
          >
            <span className="font-mono text-[0.65rem] text-slate-400 uppercase font-semibold">TIỀN CHẤT KHỞI ĐẦU</span>
            <span className="text-sm font-bold text-slate-100 mt-1 block">Acetyl-CoA</span>
          </div>
          <div
            onClick={() =>
              setSelectedNode({
                title: "HMG-CoA",
                role: "sensor",
                roleLabel: isVi ? "CƠ CHẤT ENZYME" : "ENZYME TARGET",
                index: 1
              })
            }
            className="cursor-pointer rounded-xl border border-slate-800 bg-[#0a1322] hover:border-sky-400/50 p-4 transition-all"
          >
            <span className="font-mono text-[0.65rem] text-slate-400 uppercase font-semibold">ĐÍCH TÁC ĐỘNG</span>
            <span className="text-sm font-bold text-slate-100 mt-1 block">HMG-CoA</span>
          </div>
        </div>

        {/* Central Inhibition Hub: Statin Blockade */}
        <div
          onClick={() =>
            setSelectedNode({
              title: "HMG-CoA Reductase Statin Blockade",
              role: "inhibition",
              roleLabel: isVi ? "KHÓA CỬA ĐẬP" : "INHIBITION",
              index: 2
            })
          }
          className="my-4 cursor-pointer rounded-xl border border-rose-500/50 bg-rose-950/40 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-rose-400 transition-all shadow-lg"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-rose-900/60 border border-rose-600/50 text-rose-300 shrink-0">
              <ShieldAlert size={20} />
            </div>
            <div>
              <span className="text-xs font-mono font-bold text-rose-300 uppercase tracking-wider block">
                {isVi ? "VỊ TRÍ THUỐC STATIN CHẶN CỬA ĐẬP" : "HMG-COA REDUCTASE COMPETITIVE INHIBITION"}
              </span>
              <p className="text-xs text-rose-200/90 mt-0.5 leading-relaxed">
                {isVi
                  ? "Statin khóa enzyme HMG-CoA Reductase, làm cạn kiệt lượng Mevalonate và FPP hạ lưu"
                  : "Statins arrest HMG-CoA Reductase, depleting downstream Mevalonate and FPP"}
              </p>
            </div>
          </div>
          <span className="self-start sm:self-center font-mono text-[0.7rem] bg-rose-900/80 px-2.5 py-1 rounded text-rose-100 font-bold border border-rose-700 shrink-0">
            [ ⊣ BLOCKED ]
          </span>
        </div>

        {/* Intermediate: Mevalonate -> FPP */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
          <div className="rounded-xl border border-slate-800 bg-[#0a1322] p-4">
            <span className="font-mono text-[0.65rem] text-slate-400 uppercase font-semibold">SẢN PHẨM TRUNG GIAN 1</span>
            <span className="text-sm font-bold text-slate-100 mt-1 block">Mevalonate</span>
          </div>
          <div className="rounded-xl border border-amber-500/40 bg-[#171208] p-4">
            <span className="font-mono text-[0.65rem] text-amber-400 uppercase font-bold">NGÃ BA RẼ NHÁNH CHÍNH</span>
            <span className="text-sm font-bold text-amber-200 mt-1 block">Farnesyl Pyrophosphate (FPP)</span>
          </div>
        </div>

        {/* Branch Bifurcation Visual Cards */}
        <div className="mt-5 border-t border-slate-700/60 pt-5">
          <div className="text-center mb-4">
            <span className="font-mono text-xs text-amber-300 uppercase tracking-widest font-bold">
              {isVi ? "▼ HAI NHÁNH TÁCH ĐÔI HẠ LƯU CỦA FPP ▼" : "▼ TWO DOWNSTREAM BIFURCATION TRIBUTARIES ▼"}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Branch 1: Cholesterol */}
            <div
              onClick={() =>
                setSelectedNode({
                  title: "Squalene -> Cholesterol",
                  role: "outcome",
                  roleLabel: isVi ? "MỤC TIÊU ĐIỀU TRỊ" : "THERAPEUTIC GOAL",
                  index: 3
                })
              }
              className="cursor-pointer rounded-xl border border-emerald-500/40 bg-[#081a17] hover:border-emerald-400 p-5 flex flex-col justify-between shadow-lg transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[0.7rem] font-bold text-emerald-400 uppercase tracking-wider">
                    {isVi ? "NHÁNH 1: SQUALENE" : "BRANCH 1: SQUALENE"}
                  </span>
                  <span className="font-mono text-[0.65rem] bg-emerald-950 px-2 py-0.5 rounded text-emerald-300 border border-emerald-700">
                    {isVi ? "Mục tiêu Điều trị" : "Therapeutic Goal"}
                  </span>
                </div>
                <h4 className="text-base font-bold text-emerald-200">Cholesterol</h4>
                <p className="text-xs text-emerald-300/80 mt-1.5 leading-relaxed">
                  {isVi
                    ? "Giảm lượng LDL-C lưu hành trong máu để ngăn hình thành mảng xơ vữa động mạch."
                    : "Lowers circulating atherogenic LDL-C to attenuate cardiovascular plaque formation."}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-emerald-800/40 text-[0.75rem] font-mono text-emerald-400 font-semibold flex items-center justify-between">
                <span>✓ {isVi ? "Hiệu quả mong muốn đạt được" : "Target Achieved"}</span>
                <span className="text-xs text-emerald-300">Click để giải mã ➔</span>
              </div>
            </div>

            {/* Branch 2: CoQ10 */}
            <div
              onClick={() =>
                setSelectedNode({
                  title: "Geranylgeranyl-PP -> Coenzyme Q10 (Ubiquinone)",
                  role: "inhibition",
                  roleLabel: isVi ? "TÁC DỤNG PHỤ" : "COLLATERAL DEFICIT",
                  index: 4
                })
              }
              className="cursor-pointer rounded-xl border border-rose-500/50 bg-[#1f0d14] hover:border-rose-400 p-5 flex flex-col justify-between shadow-lg transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[0.7rem] font-bold text-rose-400 uppercase tracking-wider">
                    {isVi ? "NHÁNH 2: GERANYLGERANYL-PP" : "BRANCH 2: GERANYLGERANYL-PP"}
                  </span>
                  <span className="font-mono text-[0.65rem] bg-rose-950 px-2 py-0.5 rounded text-rose-300 border border-rose-700 font-bold">
                    {isVi ? "Tác dụng Phụ" : "Collateral Deficit"}
                  </span>
                </div>
                <h4 className="text-base font-bold text-rose-200">Coenzyme Q10 (Ubiquinone)</h4>
                <p className="text-xs text-rose-300/80 mt-1.5 leading-relaxed">
                  {isVi
                    ? "Sụt giảm 40-50% CoQ10 ty thể khiến tế bào cơ thiếu ATP, gây đau mỏi cơ (hội chứng SAMS)."
                    : "Unintentional 40-50% depletion of mitochondrial ubiquinone precipitates myalgia (SAMS)."}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-rose-800/40 text-[0.75rem] font-mono text-rose-300 font-semibold flex items-center justify-between">
                <span>⚠ {isVi ? "Cần bù đắp Ubiquinol" : "Requires Ubiquinol"}</span>
                <span className="text-xs text-rose-300">Click để giải mã ➔</span>
              </div>
            </div>
          </div>
        </div>

        {/* Deep Dive Drawer */}
        {selectedNode && (
          <div className="mt-6 rounded-xl border border-amber-500/50 bg-[#14120e] p-5 shadow-2xl">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2 text-amber-300 font-mono text-xs uppercase tracking-wider font-bold">
                <Info size={16} />
                <span>{isVi ? "Giải mã Thực chứng cho Nút này:" : "Mechanism Explainer:"}</span>
              </div>
              <button
                onClick={() => setSelectedNode(null)}
                className="text-xs text-slate-400 hover:text-white px-2.5 py-1 rounded bg-slate-800 border border-slate-700"
              >
                ✕ {isVi ? "Đóng" : "Close"}
              </button>
            </div>
            <h4 className="text-base font-bold text-amber-200 mt-2">{selectedNode.title}</h4>
            <p className="text-sm text-slate-200 mt-1 leading-relaxed">
              {isVi
                ? "Ngã ba Mevalonate là bài học kinh điển trong dược động học: Khi chúng ta can thiệp vào một enzyme thượng lưu (HMG-CoA Reductase), chúng ta đạt được mục tiêu giảm Cholesterol nhưng đồng thời làm gián đoạn chuỗi cung ứng Coenzyme Q10 thiết yếu cho chuỗi hô hấp tế bào ty thể. Bù đắp dạng Ubiquinol giúp bảo vệ mô cơ mà không làm mất tác dụng hạ mỡ máu của Statin."
                : "The Mevalonate cascade demonstrates why upstream enzyme blockade triggers collateral consequences. Statins achieve their primary goal of lowering atherogenic LDL-C, but simultaneously arrest ubiquinone synthesis for mitochondrial complexes I and II. Co-administering bioavailable Ubiquinol restores muscle bioenergetics without attenuating statin efficacy."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Interactive Tree for GLP-1 & Mitochondrial Cascade
 */
function renderGlp1InteractiveTree(
  rawText: string,
  isVi: boolean,
  showRaw: boolean,
  setShowRaw: React.Dispatch<React.SetStateAction<boolean>>,
  setSelectedNode: React.Dispatch<any>,
  selectedNode: any
) {
  return (
    <div className="my-10 w-full">
      <div className="rounded-2xl border border-slate-700/60 bg-[#070e1a] p-4 sm:p-6 shadow-2xl relative">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-700/60 pb-4 mb-5">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-80" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
            </span>
            <div className="flex items-center gap-2">
              <Zap size={16} className="text-cyan-400" />
              <span className="font-mono text-xs uppercase tracking-widest text-cyan-300 font-bold">
                {isVi ? "Dòng thác Tín hiệu GLP-1 & Tái sinh Ty thể (Mitophagy)" : "GLP-1 Mitophagy Cascade"}
              </span>
            </div>
          </div>
          <button
            onClick={() => setShowRaw(!showRaw)}
            className="font-mono text-[0.68rem] text-slate-400 hover:text-cyan-300 bg-slate-900/80 px-2.5 py-1 rounded-md border border-slate-800"
          >
            {showRaw ? (isVi ? "Đóng mã" : "Close") : (isVi ? "Mã ASCII" : "Raw")}
          </button>
        </div>

        {showRaw && (
          <pre className="mb-6 p-4 rounded-xl border border-slate-800 bg-[#050a12] font-mono text-xs text-cyan-300/80 overflow-x-auto">
            {rawText}
          </pre>
        )}

        {/* Step 1: Ligand Binds GLP-1R */}
        <div
          onClick={() =>
            setSelectedNode({
              title: "GLP-1 Binds GLP-1R",
              role: "input",
              roleLabel: isVi ? "GẮN THỤ THỂ" : "LIGAND BINDING",
              index: 0
            })
          }
          className="cursor-pointer rounded-xl border border-emerald-500/30 bg-[#081816] hover:border-emerald-400 p-4.5 mb-3 flex items-center justify-between transition-all"
        >
          <div>
            <span className="font-mono text-[0.65rem] text-emerald-400 font-bold uppercase">GIAI ĐOẠN 01 · GẮN THỤ THỂ</span>
            <h4 className="text-sm sm:text-base font-bold text-slate-100 mt-1">
              {isVi ? "GLP-1 Gắn Thụ thể Màng GLP-1R" : "Ligand Binds Transmembrane GLP-1R"}
            </h4>
          </div>
          <span className="font-mono text-xs bg-emerald-950/80 px-2.5 py-1 rounded text-emerald-300 border border-emerald-700/60">
            {isVi ? "Bắt đầu" : "Initiation"}
          </span>
        </div>

        <div className="flex justify-center my-1 text-cyan-400">
          <ArrowDown size={18} />
        </div>

        {/* Step 2: AMPK + Lateral mTORC1 Inhibition */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-3 my-2">
          {/* Main Node: AMPK Activation */}
          <div
            onClick={() =>
              setSelectedNode({
                title: "AMPK Kinase Activation",
                role: "sensor",
                roleLabel: isVi ? "KÍCH HOẠT NĂNG LƯỢNG" : "KINASE ON",
                index: 1
              })
            }
            className="cursor-pointer rounded-xl border border-cyan-500/40 bg-[#091b2c] hover:border-cyan-400 p-4.5 shadow-lg transition-all"
          >
            <span className="font-mono text-[0.65rem] text-cyan-300 font-bold uppercase">GIAI ĐOẠN 02 · KÍCH HOẠT NĂNG LƯỢNG</span>
            <h4 className="text-sm sm:text-base font-bold text-cyan-100 mt-1">
              {isVi ? "Hoạt hóa Enzyme AMPK" : "AMPK Kinase Activation"}
            </h4>
            <p className="text-xs text-slate-300 mt-1">
              {isVi ? "Chuyển tế bào sang chế độ sửa chữa và dọn rác nội mô" : "Simulates energetic fasting state"}
            </p>
          </div>

          {/* Lateral Inhibits Arrow */}
          <div className="flex md:flex-col items-center justify-center text-rose-400 gap-1 px-2">
            <span className="font-mono text-[0.65rem] text-rose-400 font-bold uppercase">
              {isVi ? "ỨC CHẾ" : "INHIBITS"}
            </span>
            <ArrowRight size={16} className="hidden md:block" />
            <ArrowDown size={16} className="md:hidden" />
          </div>

          {/* Lateral Inhibited Node: mTOR */}
          <div
            onClick={() =>
              setSelectedNode({
                title: "mTORC1 Hyperactivity",
                role: "inhibition",
                roleLabel: isVi ? "KÌM HÃM" : "INHIBITED",
                index: 2
              })
            }
            className="cursor-pointer rounded-xl border border-rose-500/40 bg-[#1e0e15] hover:border-rose-400 p-4.5 shadow-lg transition-all"
          >
            <span className="font-mono text-[0.65rem] text-rose-300 font-bold uppercase">KÌM HÃM ĐỘT BIẾN</span>
            <h4 className="text-sm sm:text-base font-bold text-rose-100 mt-1">
              {isVi ? "Dập tắt Quá hoạt động mTORC1" : "mTORC1 Hyperactivity Suppressed"}
            </h4>
            <p className="text-xs text-rose-200/80 mt-1">
              {isVi ? "Chấm dứt tích lũy protein lỗi hỏng và lão hóa sớm" : "Arrests proteostatic degradation"}
            </p>
          </div>
        </div>

        <div className="flex justify-center my-1 text-cyan-400">
          <ArrowDown size={18} />
        </div>

        {/* Step 3: PGC-1alpha */}
        <div
          onClick={() =>
            setSelectedNode({
              title: "PGC-1α Transcription Factor",
              role: "sensor",
              roleLabel: isVi ? "YẾU TỐ PHIÊN MÃ" : "TRANSCRIPTION",
              index: 3
            })
          }
          className="cursor-pointer rounded-xl border border-sky-500/30 bg-[#091424] hover:border-sky-400 p-4.5 my-2 flex items-center justify-between transition-all"
        >
          <div>
            <span className="font-mono text-[0.65rem] text-sky-400 font-bold uppercase">GIAI ĐOẠN 03 · YẾU TỐ PHIÊN MÃ</span>
            <h4 className="text-sm sm:text-base font-bold text-slate-100 mt-1">
              {isVi ? "Bùng nổ Yếu tố Phiên mã PGC-1α" : "PGC-1α Transcription Factor Induction"}
            </h4>
          </div>
          <span className="font-mono text-xs bg-sky-950/80 px-2.5 py-1 rounded text-sky-300 border border-sky-700/60">
            {isVi ? "Sinh ty thể" : "Biogenesis"}
          </span>
        </div>

        <div className="flex justify-center my-1 text-cyan-400">
          <ArrowDown size={18} />
        </div>

        {/* Step 4: Mitophagy Endpoint */}
        <div
          onClick={() =>
            setSelectedNode({
              title: "Mitophagy Cellular Rejuvenation",
              role: "outcome",
              roleLabel: isVi ? "ĐÍCH ĐẾN CUỐI CÙNG" : "CELLULAR ENDPOINT",
              index: 4
            })
          }
          className="cursor-pointer rounded-xl border border-cyan-400/60 bg-[#081e2b] hover:border-cyan-300 p-5 shadow-[0_0_20px_rgba(6,182,212,0.25)] flex items-center justify-between transition-all"
        >
          <div>
            <span className="font-mono text-[0.68rem] text-cyan-300 font-bold uppercase tracking-wider">
              {isVi ? "ĐÍCH ĐẾN CUỐI CÙNG · ĐẢO NGƯỢC LÃO HÓA" : "ULTIMATE CELLULAR OUTCOME · GEROPROTECTION"}
            </span>
            <h4 className="text-base sm:text-lg font-bold text-cyan-100 mt-1">
              {isVi
                ? "Tái sinh Ty thể (Mitophagy): Tiêu hủy Ty thể Già + Tái tạo Ty thể Mới Tinh khiết"
                : "Mitophagy Triggered: Defective Mitochondria Cleared + Biogenesis of Fresh Organelles"}
            </h4>
          </div>
          <CheckCircle2 size={24} className="text-cyan-400 shrink-0 ml-3" />
        </div>

        {/* Deep Dive Drawer */}
        {selectedNode && (
          <div className="mt-6 rounded-xl border border-cyan-500/50 bg-[#0d1e35] p-5 shadow-2xl">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2 text-cyan-300 font-mono text-xs uppercase tracking-wider font-bold">
                <Info size={16} />
                <span>{isVi ? "Giải mã Thực chứng cho Nút này:" : "Mechanism Explainer:"}</span>
              </div>
              <button
                onClick={() => setSelectedNode(null)}
                className="text-xs text-slate-400 hover:text-white px-2.5 py-1 rounded bg-slate-800 border border-slate-700"
              >
                ✕ {isVi ? "Đóng" : "Close"}
              </button>
            </div>
            <h4 className="text-base font-bold text-cyan-200 mt-2">{selectedNode.title}</h4>
            <p className="text-sm text-slate-200 mt-1 leading-relaxed">
              {getNodeExplanation(selectedNode.title, selectedNode.role, isVi)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Interactive Tree for Resistant Starch 60:20:20 Fermentation
 */
function renderResistantStarchTree(
  rawText: string,
  isVi: boolean,
  showRaw: boolean,
  setShowRaw: React.Dispatch<React.SetStateAction<boolean>>,
  setSelectedNode: React.Dispatch<any>,
  selectedNode: any
) {
  return (
    <div className="my-10 w-full">
      <div className="rounded-2xl border border-slate-700/60 bg-[#070e1a] p-4 sm:p-6 shadow-2xl relative">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-700/60 pb-4 mb-5">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-80" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400 shadow-[0_0_8px_#10b981]" />
            </span>
            <div className="flex items-center gap-2">
              <Layers size={16} className="text-emerald-400" />
              <span className="font-mono text-xs uppercase tracking-widest text-emerald-300 font-bold">
                {isVi ? "Chuỗi Lên men Kỵ khí Tinh bột Kháng: Tỷ lệ 60:20:20" : "Colonic Fermentation: 60:20:20 Stoichiometry"}
              </span>
            </div>
          </div>
          <button
            onClick={() => setShowRaw(!showRaw)}
            className="font-mono text-[0.68rem] text-slate-400 hover:text-emerald-300 bg-slate-900/80 px-2.5 py-1 rounded-md border border-slate-800"
          >
            {showRaw ? (isVi ? "Đóng mã" : "Close") : (isVi ? "Mã ASCII" : "Raw")}
          </button>
        </div>

        {showRaw && (
          <pre className="mb-6 p-4 rounded-xl border border-slate-800 bg-[#050a12] font-mono text-xs text-emerald-300/80 overflow-x-auto">
            {rawText}
          </pre>
        )}

        {/* Input Root */}
        <div
          onClick={() =>
            setSelectedNode({
              title: "Resistant Starch Reaches Distal Colon",
              role: "input",
              roleLabel: isVi ? "CƠ CHẤT KHỞI NGUYÊN" : "SUBSTRATE",
              index: 0
            })
          }
          className="cursor-pointer rounded-xl border border-emerald-500/40 bg-[#081816] hover:border-emerald-400 p-4.5 mb-5 flex items-center justify-between transition-all"
        >
          <div>
            <span className="font-mono text-[0.65rem] text-emerald-400 font-bold uppercase">CƠ CHẤT KHỞI NGUYÊN</span>
            <h4 className="text-sm sm:text-base font-bold text-slate-100 mt-1">
              {isVi ? "Tinh bột Kháng (RS2/RS3) Vượt qua Ruột non đến Đại tràng" : "Resistant Starch Reaches Distal Colon Intact"}
            </h4>
          </div>
          <span className="font-mono text-xs bg-emerald-950 px-2.5 py-1 rounded text-emerald-300 border border-emerald-700">
            {isVi ? "Lên men Kỵ khí" : "Fermentation"}
          </span>
        </div>

        {/* Three SCFA Branches */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Acetate 60% */}
          <div
            onClick={() =>
              setSelectedNode({
                title: "Acetate (60%)",
                role: "outcome",
                roleLabel: "ACETATE 60%",
                index: 1
              })
            }
            className="cursor-pointer rounded-xl border border-slate-800 bg-[#0a1322] hover:border-sky-400 p-4.5 flex flex-col justify-between transition-all"
          >
            <div>
              <span className="font-mono text-[0.68rem] font-bold text-sky-400 uppercase">ACETATE (60%)</span>
              <h5 className="text-sm font-bold text-slate-100 mt-1">
                {isVi ? "Oxy hóa Ngoại vi" : "Peripheral Oxidation"}
              </h5>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                {isVi ? "Đi vào tuần hoàn chung cung cấp năng lượng cho mô ngoại vi và điều hòa mỡ máu." : "Enters systemic circulation for muscle energy."}
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-800 text-[0.7rem] font-mono text-slate-500 flex justify-between">
              <span>60% Molar Ratio</span>
              <span className="text-sky-400">Click xem ➔</span>
            </div>
          </div>

          {/* Propionate 20% */}
          <div
            onClick={() =>
              setSelectedNode({
                title: "Propionate (20%)",
                role: "outcome",
                roleLabel: "PROPIONATE 20%",
                index: 2
              })
            }
            className="cursor-pointer rounded-xl border border-slate-800 bg-[#0a1322] hover:border-indigo-400 p-4.5 flex flex-col justify-between transition-all"
          >
            <div>
              <span className="font-mono text-[0.68rem] font-bold text-indigo-400 uppercase">PROPIONATE (20%)</span>
              <h5 className="text-sm font-bold text-slate-100 mt-1">
                {isVi ? "Tân tạo Đường tại Gan" : "Hepatic Gluconeogenesis"}
              </h5>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                {isVi ? "Hấp thu về gan qua tĩnh mạch cửa, điều hòa cảm giác no và chuyển hóa glucose." : "Signals satiety and hepatic lipid homeostasis."}
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-800 text-[0.7rem] font-mono text-slate-500 flex justify-between">
              <span>20% Molar Ratio</span>
              <span className="text-indigo-400">Click xem ➔</span>
            </div>
          </div>

          {/* Butyrate 20% */}
          <div
            onClick={() =>
              setSelectedNode({
                title: "Butyrate (20%)",
                role: "outcome",
                roleLabel: "BUTYRATE 20%",
                index: 3
              })
            }
            className="cursor-pointer rounded-xl border border-emerald-400/60 bg-[#091f1b] hover:border-emerald-300 p-4.5 flex flex-col justify-between shadow-[0_0_15px_rgba(16,185,129,0.2)] transition-all"
          >
            <div>
              <span className="font-mono text-[0.68rem] font-bold text-emerald-300 uppercase">BUTYRATE (20%) ★</span>
              <h5 className="text-sm font-bold text-emerald-100 mt-1">
                {isVi ? "Nhiên liệu Tế bào Ruột & Hàn gắn Niêm mạc" : "Colonocyte Fuel & Tight Junctions"}
              </h5>
              <p className="text-xs text-emerald-200/80 mt-1 leading-relaxed">
                {isVi ? "Cung cấp >70% năng lượng biểu mô, kích hoạt Claudin-1 niêm phong thành ruột chống rò rỉ độc tố LPS." : "Supplies 70% colonocyte ATP and drives Claudin-1 assembly against leaky gut."}
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-emerald-800 text-[0.7rem] font-mono text-emerald-300 font-bold flex justify-between">
              <span>★ Trọng tâm hàng rào ruột</span>
              <span className="text-emerald-300">Click xem ➔</span>
            </div>
          </div>
        </div>

        {/* Deep Dive Drawer */}
        {selectedNode && (
          <div className="mt-6 rounded-xl border border-emerald-500/50 bg-[#091e19] p-5 shadow-2xl">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2 text-emerald-300 font-mono text-xs uppercase tracking-wider font-bold">
                <Info size={16} />
                <span>{isVi ? "Giải mã Thực chứng cho Nút này:" : "Mechanism Explainer:"}</span>
              </div>
              <button
                onClick={() => setSelectedNode(null)}
                className="text-xs text-slate-400 hover:text-white px-2.5 py-1 rounded bg-slate-800 border border-slate-700"
              >
                ✕ {isVi ? "Đóng" : "Close"}
              </button>
            </div>
            <h4 className="text-base font-bold text-emerald-200 mt-2">{selectedNode.title}</h4>
            <p className="text-sm text-slate-200 mt-1 leading-relaxed">
              {isVi
                ? "Quá trình lên men kỵ khí tinh bột kháng tạo ra tỷ lệ chuẩn 60 Acetate : 20 Propionate : 20 Butyrate. Trong đó, Butyrate đóng vai trò then chốt nhất đối với tuổi thọ tế bào biểu mô đại tràng: nó vừa là nguồn năng lượng chính thay thế đường máu, vừa ức chế men HDAC để kích hoạt phiên mã gen Claudin-1, hàn gắn các mối nối tế bào để ngăn chặn triệt để độc tố vi khuẩn LPS rò rỉ vào tuần hoàn máu."
                : "Anaerobic microbial fermentation yields the canonical 60:20:20 short-chain fatty acid stoichiometric ratio. Butyrate is the primary biological driver: mature colonocytes utilize butyrate for over 70% of oxidative metabolism. Concurrently, butyrate functions as an endogenous histone deacetylase (HDAC) inhibitor, upregulating Claudin-1 and ZO-1 to seal paracellular tight junctions against systemic lipopolysaccharide (LPS) translocation."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
