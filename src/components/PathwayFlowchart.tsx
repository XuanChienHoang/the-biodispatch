"use client";

import React, { useState } from "react";
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
  Eye,
  Info,
  Network
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
  inhibitionOf?: string;
}

interface PathwayLine {
  label?: string;
  condition?: string;
  steps: StepNode[];
}

interface TreeBifurcation {
  trunk: StepNode[];
  inhibitorNote?: string;
  branches: {
    title: string;
    steps: StepNode[];
    tag?: string;
    isPrimary?: boolean;
  }[];
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
      roleLabel: isVi ? "KÌM HÃM / ỨC CHẾ" : "INHIBITION / BRAKE"
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
      roleLabel: isVi ? "TÁC NHÂN BỆNH SINH" : "PATHOLOGY DYNAMICS"
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
      roleLabel: isVi ? "ĐÍCH ĐẾN SINH HỌC" : "CELLULAR ENDPOINT"
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
      roleLabel: isVi ? "KÍCH HOẠT / ĐẦU VÀO" : "STIMULUS / LIGAND"
    };
  }

  // Default: Sensor / Signaling Hub / Enzyme
  return {
    role: "sensor",
    roleLabel: isVi ? "NÚT TÍN HIỆU NỘI BÀO" : "SIGNALING HUB"
  };
}

/**
 * Returns icon corresponding to role
 */
function getRoleIcon(role: StepNode["role"]) {
  switch (role) {
    case "input":
      return <Sparkles size={14} className="text-emerald-400" />;
    case "inhibition":
      return <ShieldAlert size={14} className="text-rose-400" />;
    case "pathology":
      return <Flame size={14} className="text-amber-400" />;
    case "outcome":
      return <CheckCircle2 size={14} className="text-cyan-400" />;
    case "sensor":
    default:
      return <Zap size={14} className="text-sky-400" />;
  }
}

/**
 * Role badge styling
 */
function getRoleBadgeClasses(role: StepNode["role"]) {
  switch (role) {
    case "input":
      return "bg-emerald-950/70 border-emerald-500/40 text-emerald-300";
    case "inhibition":
      return "bg-rose-950/70 border-rose-500/40 text-rose-300";
    case "pathology":
      return "bg-amber-950/70 border-amber-500/40 text-amber-300";
    case "outcome":
      return "bg-cyan-950/80 border-cyan-400/50 text-cyan-200 shadow-[0_0_12px_rgba(6,182,212,0.25)]";
    case "sensor":
    default:
      return "bg-sky-950/70 border-sky-500/40 text-sky-300";
  }
}

/**
 * Card background & border styling
 */
function getCardStyle(role: StepNode["role"], isSelected: boolean) {
  if (isSelected) {
    return "border-cyan-400 bg-[#0f2238] shadow-[0_0_20px_rgba(6,182,212,0.35)] ring-2 ring-cyan-400/30";
  }
  switch (role) {
    case "input":
      return "border-emerald-500/30 bg-[#081716] hover:border-emerald-400/60 hover:bg-[#0c2220]";
    case "inhibition":
      return "border-rose-500/30 bg-[#1c0c11] hover:border-rose-400/60 hover:bg-[#271017]";
    case "pathology":
      return "border-amber-500/30 bg-[#1b1207] hover:border-amber-400/60 hover:bg-[#271a0a]";
    case "outcome":
      return "border-cyan-500/40 bg-[#081a26] hover:border-cyan-400/70 hover:bg-[#0c2436]";
    case "sensor":
    default:
      return "border-slate-800 bg-[#0a1322] hover:border-sky-400/50 hover:bg-[#0e1b2f]";
  }
}

export function PathwayFlowchart({ rawText, isVi = true }: PathwayFlowchartProps) {
  const [selectedNode, setSelectedNode] = useState<{
    title: string;
    roleLabel: string;
    index: number;
  } | null>(null);
  const [showRaw, setShowRaw] = useState(false);

  // 1. Detect 2D Tree with fork or vertical branch
  const hasBranchSymbols =
    rawText.includes("┌") ||
    rawText.includes("┴") ||
    rawText.includes("┐") ||
    rawText.includes("┼");
  const hasVerticalFlow =
    rawText.includes("│") && rawText.includes("▼");

  // If complex 2D Tree, check if we can parse it intelligently
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
      return renderMevalonateInteractiveTree(rawText, isVi, showRaw, setShowRaw);
    }
    if (isGlp1) {
      return renderGlp1InteractiveTree(rawText, isVi, showRaw, setShowRaw);
    }
    if (isResistantStarchTree) {
      return renderResistantStarchTree(rawText, isVi, showRaw, setShowRaw);
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
    // Fallback for simple preformatted text
    return (
      <div className="my-8 rounded-xl border border-slate-800 bg-[#08121f] p-5 shadow-2xl">
        <pre className="overflow-x-auto font-mono text-sm text-cyan-300">
          <code>{rawText}</code>
        </pre>
      </div>
    );
  }

  const parsedPipelines: PathwayLine[] = rawLines.map((line, idx) => {
    // Check if line contains a condition prefix like [Condition] ──► ...
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

    // Split steps
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

  return (
    <div className="my-10 space-y-6">
      {/* Master Container */}
      <div className="rounded-2xl border border-slate-700/60 bg-[#070e1a] p-5 sm:p-7 shadow-2xl shadow-black/60 relative overflow-hidden">
        {/* Subtle background graticule */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-950/20 via-transparent to-transparent pointer-events-none" />

        {/* Master Header */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 border-b border-slate-700/60 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-80" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
            </span>
            <div className="flex items-center gap-2">
              <Activity size={16} className="text-cyan-400" />
              <span className="font-mono text-xs uppercase tracking-widest text-cyan-300 font-bold">
                {isVi ? "Bản đồ Tín hiệu Phân tử theo Chuỗi" : "Molecular Signaling Architecture"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-mono text-[0.68rem] text-slate-300 bg-slate-800/90 px-2.5 py-1 rounded-md border border-slate-700">
              {parsedPipelines.length}{" "}
              {parsedPipelines.length > 1
                ? isVi ? "Dòng truyền" : "Pathways"
                : isVi ? "Tuyến tín hiệu" : "Pipeline"}
            </span>
            <button
              onClick={() => setShowRaw(!showRaw)}
              className="font-mono text-[0.68rem] text-slate-400 hover:text-cyan-300 bg-slate-900/80 px-2.5 py-1 rounded-md border border-slate-800 hover:border-slate-700 transition-colors flex items-center gap-1"
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

              {/* Step Cards Horizontal on Desktop, Vertical on Mobile */}
              <div className="flex flex-col lg:flex-row lg:items-stretch gap-3">
                {pipeline.steps.map((step, sIdx) => {
                  const isSelected =
                    selectedNode?.title === step.title &&
                    selectedNode?.index === sIdx;

                  return (
                    <div
                      key={sIdx}
                      className="flex flex-col lg:flex-row items-center flex-1"
                    >
                      {/* Interactive Step Card */}
                      <div
                        onClick={() =>
                          setSelectedNode(
                            isSelected
                              ? null
                              : {
                                  title: step.title,
                                  roleLabel: step.roleLabel,
                                  index: sIdx
                                }
                          )
                        }
                        className={`w-full flex-1 cursor-pointer select-none rounded-xl border p-4 flex flex-col justify-between transition-all duration-200 min-h-[110px] ${getCardStyle(
                          step.role,
                          isSelected
                        )}`}
                      >
                        {/* Card Header: Phase index + Role Badge */}
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

                        {/* Card Body: Molecule / Process Name */}
                        <div className="mt-1">
                          <p className="text-sm sm:text-[0.92rem] font-semibold text-slate-100 leading-snug">
                            {step.title}
                          </p>
                        </div>

                        {/* Card Footer: Micro Hint */}
                        <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[0.65rem] text-slate-400 font-mono">
                          <span>
                            {step.role === "inhibition"
                              ? isVi ? "Chặn dòng" : "Suppresses"
                              : step.role === "outcome"
                              ? isVi ? "Đích đến" : "Endpoint"
                              : isVi ? "Dòng chuyển" : "Converts"}
                          </span>
                          <span className="text-cyan-400/80 hover:text-cyan-300">
                            {isSelected ? (isVi ? "Đang chọn" : "Active") : (isVi ? "Xem chi tiết" : "Inspect")}
                          </span>
                        </div>
                      </div>

                      {/* Connecting Arrow */}
                      {sIdx < pipeline.steps.length - 1 && (
                        <div className="flex items-center justify-center py-2 lg:py-0 lg:px-2.5 shrink-0">
                          {/* Mobile Down Arrow with connector badge */}
                          <div className="lg:hidden flex flex-col items-center gap-1 text-slate-300">
                            <div className="w-0.5 h-3 bg-gradient-to-b from-cyan-400/80 to-cyan-500/80" />
                            <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[#0a1829] border border-cyan-500/50 shadow-[0_0_8px_rgba(6,182,212,0.3)]">
                              <ArrowDown size={14} className="text-cyan-400" />
                            </span>
                            <div className="w-0.5 h-3 bg-gradient-to-b from-cyan-500/80 to-cyan-400/80" />
                          </div>

                          {/* Desktop Right Arrow with connector conduit */}
                          <div className="hidden lg:flex items-center gap-1 text-slate-300">
                            <div className="h-0.5 w-2 bg-gradient-to-r from-cyan-400/80 to-cyan-500/80" />
                            <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[#0a1829] border border-cyan-500/50 shadow-[0_0_10px_rgba(6,182,212,0.3)]">
                              <ArrowRight size={14} className="text-cyan-400" />
                            </span>
                            <div className="h-0.5 w-2 bg-gradient-to-r from-cyan-500/80 to-cyan-400/80" />
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Selected Node Deep-Dive Drawer */}
        {selectedNode && (
          <div className="relative z-10 mt-6 rounded-xl border border-cyan-500/50 bg-[#0d1d33] p-4 sm:p-5 shadow-xl animate-rise">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2 text-cyan-300 font-mono text-xs uppercase tracking-wider font-bold">
                <Info size={15} />
                <span>
                  {isVi ? "Giải mã Thực chứng cho Nút này:" : "Node Mechanism Explainer:"}
                </span>
                <span className="text-slate-300 font-normal">
                  ({selectedNode.roleLabel})
                </span>
              </div>
              <button
                onClick={() => setSelectedNode(null)}
                className="text-xs text-slate-400 hover:text-white px-2 py-0.5 rounded bg-slate-800/80"
              >
                ✕
              </button>
            </div>
            <p className="mt-2 text-sm text-slate-200 font-medium">
              <strong className="text-cyan-300 font-semibold">{selectedNode.title}</strong>
              {isVi
                ? " là mắt xích quyết định trong chuỗi phản ứng sinh học này. Sự điều biến ở phân tử này sẽ chi phối toàn bộ các phân tầng phiên mã và hiệu quả bảo vệ tế bào ở các giai đoạn tiếp sau."
                : " represents a decisive regulatory node in this biological cascade. Modulation at this checkpoint directly dictates subsequent transcription tiers and cytoprotective outcomes."}
            </p>
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
  setShowRaw: React.Dispatch<React.SetStateAction<boolean>>
) {
  return (
    <div className="my-10 space-y-6">
      <div className="rounded-2xl border border-slate-700/60 bg-[#070e1a] p-5 sm:p-7 shadow-2xl relative overflow-hidden">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-700/60 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-80" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-400 shadow-[0_0_8px_#f59e0b]" />
            </span>
            <div className="flex items-center gap-2">
              <GitBranch size={16} className="text-amber-400" />
              <span className="font-mono text-xs uppercase tracking-widest text-amber-300 font-bold">
                {isVi ? "Ngã ba Phân nhánh: Con đường Mevalonate" : "Bifurcation: Mevalonate Pathway"}
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
          <div className="rounded-xl border border-slate-800 bg-[#0a1322] p-4 flex flex-col justify-between">
            <span className="font-mono text-[0.65rem] text-slate-400 uppercase">TIỀN CHẤT KHỞI ĐẦU</span>
            <span className="text-sm font-bold text-slate-100 mt-1">Acetyl-CoA</span>
          </div>
          <div className="rounded-xl border border-slate-800 bg-[#0a1322] p-4 flex flex-col justify-between">
            <span className="font-mono text-[0.65rem] text-slate-400 uppercase">ĐÍCH TÁC ĐỘNG</span>
            <span className="text-sm font-bold text-slate-100 mt-1">HMG-CoA</span>
          </div>
        </div>

        {/* Central Inhibition Hub: Statin Blockade */}
        <div className="my-4 rounded-xl border border-rose-500/50 bg-rose-950/40 p-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-rose-900/60 border border-rose-600/50 text-rose-300">
              <ShieldAlert size={20} />
            </div>
            <div>
              <span className="text-xs font-mono font-bold text-rose-300 uppercase tracking-wider block">
                {isVi ? "VỊ TRÍ THUỐC STATIN CHẶN CỬA ĐẬP" : "HMG-COA REDUCTASE COMPETITIVE INHIBITION"}
              </span>
              <p className="text-xs text-rose-200/90 mt-0.5">
                {isVi
                  ? "Statin khóa enzyme HMG-CoA Reductase, làm cạn kiệt lượng Mevalonate và FPP hạ lưu"
                  : "Statins arrest HMG-CoA Reductase, depleting downstream Mevalonate and FPP"}
              </p>
            </div>
          </div>
          <span className="hidden sm:inline-block font-mono text-[0.7rem] bg-rose-900/80 px-2.5 py-1 rounded text-rose-100 font-bold border border-rose-700">
            [ ⊣ BLOCKED ]
          </span>
        </div>

        {/* Intermediate: Mevalonate -> FPP */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-4">
          <div className="rounded-xl border border-slate-800 bg-[#0a1322] p-4">
            <span className="font-mono text-[0.65rem] text-slate-400 uppercase">SẢN PHẨM TRUNG GIAN 1</span>
            <span className="text-sm font-bold text-slate-100 mt-1 block">Mevalonate</span>
          </div>
          <div className="rounded-xl border border-amber-500/40 bg-[#171208] p-4">
            <span className="font-mono text-[0.65rem] text-amber-400 uppercase font-bold">NGÃ BA RẼ NHÁNH CHÍNH</span>
            <span className="text-sm font-bold text-amber-200 mt-1 block">Farnesyl Pyrophosphate (FPP)</span>
          </div>
        </div>

        {/* Branch Bifurcation Visual Cards */}
        <div className="mt-6 border-t border-slate-700/60 pt-5">
          <div className="text-center mb-4">
            <span className="font-mono text-xs text-amber-300 uppercase tracking-widest font-bold">
              {isVi ? "▼ HAI NHÁNH TÁCH ĐÔI HẠ LƯU CỦA FPP ▼" : "▼ TWO DOWNSTREAM BIFURCATION TRIBUTARIES ▼"}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Branch 1: Cholesterol */}
            <div className="rounded-xl border border-emerald-500/40 bg-[#081a17] p-5 flex flex-col justify-between shadow-lg">
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
              <div className="mt-4 pt-3 border-t border-emerald-800/40 text-[0.75rem] font-mono text-emerald-400 font-semibold">
                ✓ {isVi ? "Hiệu quả mong muốn đạt được" : "Target Achieved"}
              </div>
            </div>

            {/* Branch 2: CoQ10 */}
            <div className="rounded-xl border border-rose-500/50 bg-[#1f0d14] p-5 flex flex-col justify-between shadow-lg">
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
              <div className="mt-4 pt-3 border-t border-rose-800/40 text-[0.75rem] font-mono text-rose-300 font-semibold">
                ⚠ {isVi ? "Cần bổ sung bù đắp Ubiquinol" : "Requires Ubiquinol Replenishment"}
              </div>
            </div>
          </div>
        </div>
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
  setShowRaw: React.Dispatch<React.SetStateAction<boolean>>
) {
  return (
    <div className="my-10 space-y-6">
      <div className="rounded-2xl border border-slate-700/60 bg-[#070e1a] p-5 sm:p-7 shadow-2xl relative overflow-hidden">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-700/60 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-80" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
            </span>
            <div className="flex items-center gap-2">
              <Zap size={16} className="text-cyan-400" />
              <span className="font-mono text-xs uppercase tracking-widest text-cyan-300 font-bold">
                {isVi ? "Dòng thác Tín hiệu GLP-1 & Tái sinh Ty thể" : "GLP-1 Mitophagy Cascade"}
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
        <div className="rounded-xl border border-emerald-500/30 bg-[#081816] p-4.5 mb-3 flex items-center justify-between">
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
          <div className="rounded-xl border border-cyan-500/40 bg-[#091b2c] p-4.5 shadow-lg">
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
          <div className="rounded-xl border border-rose-500/40 bg-[#1e0e15] p-4.5 shadow-lg">
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
        <div className="rounded-xl border border-sky-500/30 bg-[#091424] p-4.5 my-2 flex items-center justify-between">
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
        <div className="rounded-xl border border-cyan-400/60 bg-[#081e2b] p-5 shadow-[0_0_20px_rgba(6,182,212,0.25)] flex items-center justify-between">
          <div>
            <span className="font-mono text-[0.68rem] text-cyan-300 font-bold uppercase tracking-wider">
              {isVi ? "ĐÍCH ĐẾN CUỐI CÙNG · ĐẢO NGƯỢC LÃO HÓA" : "ULTIMATE CELLULAR OUTCOME · GEROPROTECTION"}
            </span>
            <h4 className="text-base sm:text-lg font-bold text-cyan-100 mt-1">
              {isVi
                ? "Tái sinh Ty thể (Mitophagy): Tiêu hủy Ty thể Già + Tái tạo Ty thể Tinh khiết"
                : "Mitophagy Triggered: Defective Mitochondria Cleared + Biogenesis of Fresh Organelles"}
            </h4>
          </div>
          <CheckCircle2 size={24} className="text-cyan-400 shrink-0 ml-3" />
        </div>
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
  setShowRaw: React.Dispatch<React.SetStateAction<boolean>>
) {
  return (
    <div className="my-10 space-y-6">
      <div className="rounded-2xl border border-slate-700/60 bg-[#070e1a] p-5 sm:p-7 shadow-2xl relative overflow-hidden">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-700/60 pb-4 mb-6">
          <div className="flex items-center gap-3">
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
        <div className="rounded-xl border border-emerald-500/40 bg-[#081816] p-4.5 mb-5 flex items-center justify-between">
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
          <div className="rounded-xl border border-slate-800 bg-[#0a1322] p-4.5 flex flex-col justify-between">
            <div>
              <span className="font-mono text-[0.68rem] font-bold text-sky-400 uppercase">ACETATE (60%)</span>
              <h5 className="text-sm font-bold text-slate-100 mt-1">
                {isVi ? "Oxy hóa Ngoại vi" : "Peripheral Oxidation"}
              </h5>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                {isVi ? "Đi vào tuần hoàn chung cung cấp năng lượng cho mô ngoại vi và điều hòa mỡ máu." : "Enters systemic circulation for muscle energy."}
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-800 text-[0.7rem] font-mono text-slate-500">
              60% Molar Ratio
            </div>
          </div>

          {/* Propionate 20% */}
          <div className="rounded-xl border border-slate-800 bg-[#0a1322] p-4.5 flex flex-col justify-between">
            <div>
              <span className="font-mono text-[0.68rem] font-bold text-indigo-400 uppercase">PROPIONATE (20%)</span>
              <h5 className="text-sm font-bold text-slate-100 mt-1">
                {isVi ? "Tân tạo Đường tại Gan" : "Hepatic Gluconeogenesis"}
              </h5>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                {isVi ? "Hấp thu về gan qua tĩnh mạch cửa, điều hòa cảm giác no và chuyển hóa glucose." : "Signals satiety and hepatic lipid homeostasis."}
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-800 text-[0.7rem] font-mono text-slate-500">
              20% Molar Ratio
            </div>
          </div>

          {/* Butyrate 20% */}
          <div className="rounded-xl border border-emerald-400/60 bg-[#091f1b] p-4.5 flex flex-col justify-between shadow-[0_0_15px_rgba(16,185,129,0.2)]">
            <div>
              <span className="font-mono text-[0.68rem] font-bold text-emerald-300 uppercase">BUTYRATE (20%) ★</span>
              <h5 className="text-sm font-bold text-emerald-100 mt-1">
                {isVi ? "Nhiên liệu Tế bào Ruột & Hàn gắn Niêm mạc" : "Colonocyte Fuel & Tight Junctions"}
              </h5>
              <p className="text-xs text-emerald-200/80 mt-1 leading-relaxed">
                {isVi ? "Cung cấp >70% năng lượng biểu mô, kích hoạt Claudin-1 niêm phong thành ruột chống rò rỉ độc tố LPS." : "Supplies 70% colonocyte ATP and drives Claudin-1 assembly against leaky gut."}
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-emerald-800 text-[0.7rem] font-mono text-emerald-300 font-bold">
              {isVi ? "★ Đích tác động quan trọng nhất" : "★ Primary Geroprotective Endpoint"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
