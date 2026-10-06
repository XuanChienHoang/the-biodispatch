"use client";

import { useState, useEffect } from "react";
import {
  X,
  Save,
  Download,
  Eye,
  Edit3,
  Settings2,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Globe,
  Tag,
  Clock,
  Layers,
  Heart,
  Brain,
  Flame,
  Activity,
  Shield,
  Dna,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

interface PostEditorData {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date?: string;
  author?: string;
  authorRole?: string;
  tags: string[] | string;
  organ: string;
  tier: string;
  readingTime: string;
  featured: boolean;
  doi: string;
  gizmo: string;
  lang: "vi" | "en";
  image: string;
  imageAlt: string;
  isNew?: boolean;
}

interface PostEditorModalProps {
  initialData: PostEditorData;
  isOpen: boolean;
  onClose: () => void;
  onSaved: () => void;
}

const ORGANS = [
  { value: "Brain", label: "Brain (Não bộ)", icon: Brain, color: "text-indigo-400" },
  { value: "Heart", label: "Heart (Tim mạch)", icon: Heart, color: "text-rose-400" },
  { value: "Gut", label: "Gut (Đường ruột)", icon: Activity, color: "text-emerald-400" },
  { value: "Cellular Aging", label: "Cellular Aging (Lão hóa tế bào)", icon: Dna, color: "text-purple-400" },
  { value: "Immune", label: "Immune (Miễn dịch)", icon: Shield, color: "text-cyan-400" },
  { value: "Metabolic", label: "Metabolic (Chuyển hóa)", icon: Flame, color: "text-amber-400" },
];

const TIERS = [
  { value: "Clinical Deep-Dive", label: "Clinical Deep-Dive (Chuyên sâu lâm sàng)" },
  { value: "Fundamentals", label: "Fundamentals (Nền tảng sinh học)" },
  { value: "Lab Gizmo", label: "Lab Gizmo (Mô hình tương tác)" },
];

const GIZMOS = [
  { value: "pathway", label: "Biological Pathway Flowchart (Sơ đồ cơ chế phân tử đa bước)" },
  { value: "curcumin-piperine", label: "Curcumin & Piperine Absorption Simulator" },
  { value: "pk", label: "Pharmacokinetics (Dược động học 1 ngăn)" },
  { value: "biomarker", label: "Forecasting hs-CRP Delta" },
  { value: "synergy", label: "Synergy & Antagonist Calculator" },
  { value: "", label: "Không có widget đặc biệt" },
];

export function PostEditorModal({ initialData, isOpen, onClose, onSaved }: PostEditorModalProps) {
  const [formData, setFormData] = useState<PostEditorData>(initialData);
  const [activeTab, setActiveTab] = useState<"write" | "preview" | "settings">("write");
  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  useEffect(() => {
    setFormData(initialData);
    setStatusMessage(null);
  }, [initialData]);

  if (!isOpen) return null;

  const updateField = (field: keyof PostEditorData, value: any) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: value };
      // Auto generate slug from title when creating a new dispatch
      if (field === "title" && prev.isNew) {
        const autoSlug = (value as string)
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, "");
        if (autoSlug && !prev.slug.startsWith("custom-")) {
          updated.slug = updated.lang === "vi" && !autoSlug.endsWith("-vi") ? `${autoSlug}` : autoSlug;
        }
      }
      return updated;
    });
  };

  const handleSave = async () => {
    if (!formData.title.trim()) {
      setStatusMessage({ text: "Vui lòng nhập tiêu đề bài viết.", type: "error" });
      return;
    }
    if (!formData.slug.trim()) {
      setStatusMessage({ text: "Vui lòng nhập đường dẫn slug cho bài viết.", type: "error" });
      return;
    }

    setSaving(true);
    setStatusMessage(null);

    try {
      const tagsArray = typeof formData.tags === "string"
        ? formData.tags.split(",").map((t) => t.trim()).filter(Boolean)
        : formData.tags;

      const res = await fetch("/api/admin/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          tags: tagsArray,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setStatusMessage({
          text: data.message || "Đã lưu bài viết thành công!",
          type: "success",
        });
        setTimeout(() => {
          onSaved();
        }, 1200);
      } else {
        setStatusMessage({ text: data.error || "Không thể lưu bài viết.", type: "error" });
      }
    } catch {
      setStatusMessage({ text: "Lỗi kết nối khi lưu bài viết.", type: "error" });
    } finally {
      setSaving(false);
    }
  };

  const handleDownload = () => {
    const tagsArray = typeof formData.tags === "string"
      ? formData.tags.split(",").map((t) => `"${t.trim()}"`).filter(Boolean).join(", ")
      : formData.tags.map((t) => `"${t}"`).join(", ");

    const frontmatter = `---
title: "${formData.title.replace(/"/g, '\\"')}"
date: "${formData.date || new Date().toISOString()}"
excerpt: "${(formData.excerpt || "").replace(/"/g, '\\"')}"
author: "${formData.author || "TS. Hoàng Xuân Chiến"}"
authorRole: "${formData.authorRole || "Tiến sĩ Khoa học Tự nhiên (Dr. rer. nat.) · Đại học Hamburg, CHLB Đức"}"
tags: [${tagsArray}]
organ: "${formData.organ}"
tier: "${formData.tier}"
readingTime: "${formData.readingTime}"
featured: ${formData.featured}
doi: "${formData.doi}"
gizmo: "${formData.gizmo}"
lang: "${formData.lang}"
image: "${formData.image || ""}"
imageAlt: "${(formData.imageAlt || "").replace(/"/g, '\\"')}"
---

${formData.content.trim()}
`;

    const blob = new Blob([frontmatter], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${formData.slug || "dispatch"}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const insertSnippet = (snippet: string) => {
    setFormData((prev) => ({
      ...prev,
      content: prev.content + "\n" + snippet + "\n",
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md">
      <div className="bg-[#0b192c] border border-slate-800 rounded-2xl w-full max-w-6xl h-[92vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-[#08121f]">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-sm shadow-cyan-400 animate-pulse" />
            <div>
              <div className="text-[11px] font-mono uppercase tracking-widest text-cyan-400 font-semibold flex items-center gap-1.5">
                <span>{formData.isNew ? "Viết Bài Mới" : "Chỉnh Sửa Bài Viết"}</span>
                <span className="text-slate-600">·</span>
                <span className="text-slate-400 font-mono">/{formData.slug}.md</span>
              </div>
              <h2 className="text-lg font-bold text-white truncate max-w-md sm:max-w-xl">
                {formData.title || "Tiêu đề bài viết..."}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Tab switchers */}
            <div className="flex bg-[#060d16] p-1 rounded-xl border border-slate-800 mr-2">
              <button
                type="button"
                onClick={() => setActiveTab("write")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeTab === "write"
                    ? "bg-cyan-500 text-[#08121f] font-semibold shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Soạn thảo</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("preview")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeTab === "preview"
                    ? "bg-cyan-500 text-[#08121f] font-semibold shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Xem trước</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("settings")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeTab === "settings"
                    ? "bg-cyan-500 text-[#08121f] font-semibold shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Settings2 className="w-3.5 h-3.5" />
                <span>Cấu hình & SEO</span>
              </button>
            </div>

            <button
              type="button"
              onClick={handleDownload}
              title="Tải file .md về máy"
              className="p-2 text-slate-400 hover:text-cyan-400 bg-slate-900/60 border border-slate-800 rounded-xl transition-all"
            >
              <Download className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 disabled:opacity-50 text-[#08121f] font-semibold text-xs rounded-xl transition-all shadow-md shadow-cyan-500/20"
            >
              {saving ? (
                <div className="w-4 h-4 border-2 border-[#08121f] border-t-transparent rounded-full animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              <span>{saving ? "Đang lưu..." : "Lưu & Xuất Bản"}</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-all ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Status alert message */}
        {statusMessage && (
          <div
            className={`px-6 py-2.5 text-xs flex items-center gap-2 border-b transition-all ${
              statusMessage.type === "success"
                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                : "bg-rose-500/10 border-rose-500/30 text-rose-300"
            }`}
          >
            {statusMessage.type === "success" ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            )}
            <span>{statusMessage.text}</span>
          </div>
        )}

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 bg-[#091524]">
          {/* TAB 1: WRITE (Markdown Editor & Quick Metadata) */}
          {activeTab === "write" && (
            <div className="space-y-5 max-w-5xl mx-auto">
              {/* Quick Header Fields */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 bg-[#08121f] p-4 rounded-2xl border border-slate-800/80">
                <div className="md:col-span-8">
                  <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
                    Tiêu đề bài viết (Title)
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => updateField("title", e.target.value)}
                    placeholder="Nhập tiêu đề lôi cuốn mang tính phát hiện..."
                    className="w-full px-3.5 py-2.5 bg-[#060d16] border border-slate-700/80 rounded-xl text-white font-semibold text-base focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div className="md:col-span-4">
                  <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
                    Đường dẫn (Slug URL)
                  </label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => updateField("slug", e.target.value)}
                    placeholder="ten-bai-viet-slug"
                    className="w-full px-3.5 py-2.5 bg-[#060d16] border border-slate-700/80 rounded-xl text-cyan-300 font-mono text-xs focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div className="md:col-span-12">
                  <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
                    Tóm tắt dẫn dắt (Dek / Excerpt)
                  </label>
                  <textarea
                    rows={2}
                    value={formData.excerpt}
                    onChange={(e) => updateField("excerpt", e.target.value)}
                    placeholder="Tóm tắt ngắn gọn câu hỏi thực tế và nghịch lý sinh học..."
                    className="w-full px-3.5 py-2 bg-[#060d16] border border-slate-700/80 rounded-xl text-slate-200 text-xs focus:border-cyan-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Quick Snippets Toolbar */}
              <div className="flex flex-wrap items-center gap-1.5 p-2 bg-[#08121f] rounded-xl border border-slate-800 text-xs">
                <span className="text-[11px] font-mono text-slate-500 uppercase px-2 font-semibold">Chèn mẫu:</span>
                <button
                  type="button"
                  onClick={() => insertSnippet("## Tiêu đề mục mới")}
                  className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-[11px] font-mono"
                >
                  H2
                </button>
                <button
                  type="button"
                  onClick={() => insertSnippet("### Tiểu mục chi tiết")}
                  className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-[11px] font-mono"
                >
                  H3
                </button>
                <button
                  type="button"
                  onClick={() => insertSnippet('> *"Lời giải thích ẩn dụ trực quan sâu sắc của TS. Chiến..."*')}
                  className="px-2.5 py-1 bg-cyan-950/60 hover:bg-cyan-900/60 text-cyan-300 border border-cyan-800/40 rounded-lg text-[11px]"
                >
                  Trích dẫn TS. Chiến
                </button>
                <button
                  type="button"
                  onClick={() =>
                    insertSnippet(`| Phân tử / Tác nhân | Cơ chế sinh học tác động | Tác động thực tế trên người |
| :--- | :--- | :--- |
| **Phân tử A** | Kích hoạt thụ thể XYZ | Cải thiện hiệu suất tế bào |
| **Phân tử B** | Kìm hãm thoái biến | Giữ nồng độ ổn định |`)
                  }
                  className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-[11px]"
                >
                  Bảng đối chiếu
                </button>
                <button
                  type="button"
                  onClick={() =>
                    insertSnippet(
                      `![Chú thích hình ảnh phân tử](/images/posts/${formData.slug}.jpg)`
                    )
                  }
                  className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-[11px]"
                >
                  Hình ảnh minh họa
                </button>
              </div>

              {/* Main Markdown Textarea */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span>Thân bài (Markdown Format):</span>
                  <span>
                    {formData.content.length} ký tự · ~{formData.content.split(/\s+/).filter(Boolean).length} từ
                  </span>
                </div>
                <textarea
                  rows={22}
                  value={formData.content}
                  onChange={(e) => updateField("content", e.target.value)}
                  placeholder="Bắt đầu soạn thảo bài viết bằng định dạng Markdown..."
                  className="w-full p-4 bg-[#060d16] border border-slate-700/80 rounded-2xl text-slate-100 font-mono text-sm leading-relaxed focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400/20 resize-y"
                />
              </div>
            </div>
          )}

          {/* TAB 2: LIVE PREVIEW */}
          {activeTab === "preview" && (
            <div className="max-w-4xl mx-auto bg-white text-slate-900 p-8 sm:p-12 rounded-3xl shadow-2xl border border-slate-200 min-h-[600px]">
              {/* Header preview */}
              <div className="border-b border-slate-200 pb-6 mb-8">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-cyan-700 font-bold mb-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-cyan-100 text-cyan-800">
                    {formData.organ}
                  </span>
                  <span>·</span>
                  <span>{formData.tier}</span>
                  <span>·</span>
                  <span>{formData.readingTime}</span>
                </div>
                <h1 className="text-3xl font-bold tracking-tight text-slate-950 font-serif leading-tight mb-4">
                  {formData.title || "Tiêu đề bài viết"}
                </h1>
                {formData.excerpt && (
                  <p className="text-base text-slate-600 font-sans leading-relaxed border-l-4 border-cyan-500 pl-4 py-1 italic">
                    {formData.excerpt}
                  </p>
                )}
                <div className="mt-4 flex items-center gap-3 text-xs text-slate-500 font-mono">
                  <span>Tác giả: <strong>{formData.author}</strong></span>
                  <span>·</span>
                  <span>DOI: {formData.doi}</span>
                </div>
              </div>

              {/* Body markdown preview */}
              <div className="prose prose-slate max-w-none prose-headings:font-serif prose-headings:font-bold prose-h2:text-2xl prose-h2:border-b prose-h2:border-slate-200 prose-h2:pb-2 prose-h2:mt-8 prose-h3:text-xl prose-p:text-slate-800 prose-p:leading-relaxed prose-blockquote:border-cyan-500 prose-blockquote:bg-cyan-50/50 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:rounded-r-xl prose-table:border prose-th:bg-slate-100 prose-td:border">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm, remarkMath]}
                  rehypePlugins={[rehypeKatex]}
                >
                  {formData.content || "*Chưa có nội dung soạn thảo...*"}
                </ReactMarkdown>
              </div>
            </div>
          )}

          {/* TAB 3: SETTINGS & METADATA */}
          {activeTab === "settings" && (
            <div className="max-w-3xl mx-auto space-y-6 bg-[#08121f] p-8 rounded-3xl border border-slate-800">
              <div className="flex items-center gap-2 pb-4 border-b border-slate-800 text-cyan-400 font-mono text-xs uppercase tracking-wider font-semibold">
                <Settings2 className="w-4 h-4" />
                <span>Cấu hình Siêu dữ liệu & Xuất bản (Metadata)</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Organ */}
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-300 mb-2">
                    Cơ quan / Chủ đề (Organ)
                  </label>
                  <select
                    value={formData.organ}
                    onChange={(e) => updateField("organ", e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#060d16] border border-slate-700 rounded-xl text-white text-xs font-medium focus:border-cyan-400 focus:outline-none"
                  >
                    {ORGANS.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Tier */}
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-300 mb-2">
                    Cấp độ bài viết (Tier)
                  </label>
                  <select
                    value={formData.tier}
                    onChange={(e) => updateField("tier", e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#060d16] border border-slate-700 rounded-xl text-white text-xs font-medium focus:border-cyan-400 focus:outline-none"
                  >
                    {TIERS.map((t) => (
                      <option key={t.value} value={t.value}>
                        {t.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Language */}
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-300 mb-2">
                    Ngôn ngữ (Language)
                  </label>
                  <div className="flex gap-3">
                    <label className="flex items-center gap-2 px-4 py-2.5 bg-[#060d16] border border-slate-700 rounded-xl text-xs text-white cursor-pointer hover:border-cyan-400">
                      <input
                        type="radio"
                        name="lang"
                        checked={formData.lang === "vi"}
                        onChange={() => updateField("lang", "vi")}
                        className="text-cyan-500 focus:ring-cyan-500"
                      />
                      <span>🇻🇳 Tiếng Việt (vi)</span>
                    </label>
                    <label className="flex items-center gap-2 px-4 py-2.5 bg-[#060d16] border border-slate-700 rounded-xl text-xs text-white cursor-pointer hover:border-cyan-400">
                      <input
                        type="radio"
                        name="lang"
                        checked={formData.lang === "en"}
                        onChange={() => updateField("lang", "en")}
                        className="text-cyan-500 focus:ring-cyan-500"
                      />
                      <span>🇬🇧 English (en)</span>
                    </label>
                  </div>
                </div>

                {/* Reading time */}
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-300 mb-2">
                    Thời lượng đọc (Reading Time)
                  </label>
                  <input
                    type="text"
                    value={formData.readingTime}
                    onChange={(e) => updateField("readingTime", e.target.value)}
                    placeholder="ví dụ: 8 phút đọc"
                    className="w-full px-3.5 py-2.5 bg-[#060d16] border border-slate-700 rounded-xl text-white text-xs focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                {/* DOI */}
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-300 mb-2">
                    Mã Trích Dẫn DOI / Nghiên cứu gốc
                  </label>
                  <input
                    type="text"
                    value={formData.doi}
                    onChange={(e) => updateField("doi", e.target.value)}
                    placeholder="10.1126/science.1241224"
                    className="w-full px-3.5 py-2.5 bg-[#060d16] border border-slate-700 rounded-xl text-white font-mono text-xs focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                {/* Gizmo Widget */}
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-300 mb-2">
                    Mô hình tương tác / Sơ đồ (Gizmo)
                  </label>
                  <select
                    value={formData.gizmo}
                    onChange={(e) => updateField("gizmo", e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#060d16] border border-slate-700 rounded-xl text-white text-xs font-medium focus:border-cyan-400 focus:outline-none"
                  >
                    {GIZMOS.map((g) => (
                      <option key={g.value} value={g.value}>
                        {g.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Tags */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-mono uppercase text-slate-300 mb-2">
                    Thẻ Phân loại (Tags - cách nhau bởi dấu phẩy)
                  </label>
                  <input
                    type="text"
                    value={Array.isArray(formData.tags) ? formData.tags.join(", ") : formData.tags}
                    onChange={(e) => updateField("tags", e.target.value)}
                    placeholder="Sinh học phân tử, Khoa học Não bộ, Chất lượng Giấc ngủ"
                    className="w-full px-3.5 py-2.5 bg-[#060d16] border border-slate-700 rounded-xl text-white text-xs focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                {/* Image URL */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-mono uppercase text-slate-300 mb-2">
                    Đường dẫn Ảnh bìa (Cover Image Path)
                  </label>
                  <input
                    type="text"
                    value={formData.image}
                    onChange={(e) => updateField("image", e.target.value)}
                    placeholder="/images/posts/ten-bai-viet.jpg"
                    className="w-full px-3.5 py-2.5 bg-[#060d16] border border-slate-700 rounded-xl text-cyan-300 font-mono text-xs focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                {/* Featured Toggle */}
                <div className="sm:col-span-2 pt-2">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) => updateField("featured", e.target.checked)}
                      className="w-4 h-4 rounded text-cyan-500 focus:ring-cyan-500 bg-[#060d16] border-slate-700"
                    />
                    <span className="text-xs font-medium text-slate-200">
                      Ghim bài viết tiêu điểm trên trang chủ (Featured Dispatch)
                    </span>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
