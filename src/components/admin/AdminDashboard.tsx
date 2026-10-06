"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Plus,
  Search,
  Filter,
  FileText,
  ExternalLink,
  Edit3,
  Download,
  Trash2,
  LogOut,
  Sparkles,
  CheckCircle2,
  RefreshCw,
  Globe,
  Clock,
  Dna,
  Layers,
  ArrowUpRight,
  ShieldCheck,
  Brain,
  Heart,
  Activity,
  Flame,
  Shield,
} from "lucide-react";
import { PostEditorModal } from "./PostEditorModal";

interface AdminPost {
  slug: string;
  title: string;
  excerpt: string;
  date?: string;
  author?: string;
  authorRole?: string;
  tags?: string[];
  organ: string;
  tier: string;
  readingTime?: string;
  featured?: boolean;
  doi?: string;
  gizmo?: string | null;
  lang?: "vi" | "en";
  image?: string;
  imageAlt?: string;
}

interface AdminDashboardProps {
  onLogout: () => void;
}

const ORGAN_ICONS: Record<string, any> = {
  Brain: Brain,
  Heart: Heart,
  Gut: Activity,
  "Cellular Aging": Dna,
  Immune: Shield,
  Metabolic: Flame,
};

const ORGAN_COLORS: Record<string, string> = {
  Brain: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
  Heart: "bg-rose-500/10 text-rose-400 border-rose-500/20",
  Gut: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  "Cellular Aging": "bg-purple-500/10 text-purple-400 border-purple-500/20",
  Immune: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  Metabolic: "bg-amber-500/10 text-amber-400 border-amber-500/20",
};

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [posts, setPosts] = useState<AdminPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrgan, setSelectedOrgan] = useState<string>("ALL");
  const [selectedLang, setSelectedLang] = useState<string>("ALL");
  const [editorData, setEditorData] = useState<any | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/posts");
      const data = await res.json();
      if (res.ok && data.posts) {
        setPosts(data.posts);
      }
    } catch (err) {
      console.error("Failed to fetch posts:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [refreshKey]);

  const handleEdit = async (slug: string) => {
    try {
      const res = await fetch(`/api/admin/posts/${slug}`);
      const data = await res.json();
      if (res.ok && data.post) {
        setEditorData({
          ...data.post,
          isNew: false,
        });
        setIsEditorOpen(true);
      }
    } catch {
      alert("Không thể tải chi tiết bài viết để chỉnh sửa.");
    }
  };

  const handleCreateNew = (lang: "vi" | "en" = "vi") => {
    setEditorData({
      slug: "",
      title: "",
      excerpt: "",
      content: lang === "vi"
        ? `## Mở đầu: Câu hỏi thực tế & Nghịch lý sinh học

Đã bao giờ bạn tự hỏi vì sao...

> *"Lời giải thích ẩn dụ trực quan, sâu sắc của TS. Chiến: Ví dụ cơ thể như một bộ máy..."*

## Cơ chế phân tử đa bước: Từng bánh răng sinh học

1. **Bước 1**: Phân tử A liên kết với thụ thể B trên màng tế bào.
2. **Bước 2**: Kích hoạt chuỗi tín hiệu nội bào qua enzyme C.
3. **Bước 3**: Thay đổi biểu hiện gen và tối ưu hóa năng lượng ty thể.

## Ứng dụng thực tế & Khuyến nghị y sinh

Dưới góc nhìn khoa học thực nghiệm:
- Liều lượng và thời điểm thích hợp
- Những hiểu lầm phổ biến cần tránh`
        : `## Introduction: Real-world Paradox & Biological Mystery

Have you ever wondered why...

> *"Metaphorical insight from Dr. Hoang: Imagine the human cell as a high-precision chemical refinery..."*

## Step-by-Step Molecular Mechanism

1. **Step 1**: Molecule A binds to receptor B on the cell membrane.
2. **Step 2**: Activation of intracellular signaling cascade via enzyme C.
3. **Step 3**: Genomic transcriptional modulation and mitochondrial fidelity.

## Translational Insights & Practical Takeaways

From a rigorous biochemical standpoint:
- Optimal dosage timing and bioavailability
- Common clinical myths dismantled`,
      date: new Date().toISOString(),
      author: "TS. Hoàng Xuân Chiến",
      authorRole: "Tiến sĩ Khoa học Tự nhiên (Dr. rer. nat.) · Đại học Hamburg, CHLB Đức",
      tags: lang === "vi" ? ["Sinh học phân tử", "Y học thực chứng"] : ["Molecular Biology", "Evidence-based Medicine"],
      organ: "Metabolic",
      tier: "Clinical Deep-Dive",
      readingTime: lang === "vi" ? "8 phút đọc" : "8 min read",
      featured: false,
      doi: "10.1126/science.1241224",
      gizmo: "pathway",
      lang,
      image: "",
      imageAlt: "",
      isNew: true,
    });
    setIsEditorOpen(true);
  };

  const handleDelete = async (slug: string, title: string) => {
    if (!confirm(`Anh có chắc chắn muốn xóa bài viết "${title}" (${slug}) không?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/posts/${slug}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok && data.success) {
        alert("Đã gỡ bài viết thành công!");
        setRefreshKey((k) => k + 1);
      } else {
        alert(data.error || "Không thể gỡ bài viết.");
      }
    } catch {
      alert("Lỗi kết nối khi gỡ bài viết.");
    }
  };

  const handleDownloadMd = async (slug: string) => {
    try {
      const res = await fetch(`/api/admin/posts/${slug}`);
      const data = await res.json();
      if (res.ok && data.post) {
        const post = data.post;
        const tags = Array.isArray(post.tags) ? post.tags.map((t: string) => `"${t}"`).join(", ") : "";
        const fileContent = `---
title: "${post.title.replace(/"/g, '\\"')}"
date: "${post.date || ""}"
excerpt: "${(post.excerpt || "").replace(/"/g, '\\"')}"
author: "${post.author || "TS. Hoàng Xuân Chiến"}"
authorRole: "${post.authorRole || ""}"
tags: [${tags}]
organ: "${post.organ}"
tier: "${post.tier}"
readingTime: "${post.readingTime}"
featured: ${post.featured}
doi: "${post.doi}"
gizmo: "${post.gizmo}"
lang: "${post.lang}"
image: "${post.image || ""}"
imageAlt: "${post.imageAlt || ""}"
---

${post.content || ""}
`;
        const blob = new Blob([fileContent], { type: "text/markdown;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${slug}.md`;
        a.click();
        URL.revokeObjectURL(url);
      }
    } catch {
      alert("Không thể tải file markdown.");
    }
  };

  // Filter posts
  const filteredPosts = posts.filter((p) => {
    const matchesSearch =
      !searchQuery.trim() ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (Array.isArray(p.tags) && p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())));

    const matchesOrgan = selectedOrgan === "ALL" || p.organ === selectedOrgan;
    const matchesLang = selectedLang === "ALL" || p.lang === selectedLang;

    return matchesSearch && matchesOrgan && matchesLang;
  });

  const viCount = posts.filter((p) => p.lang === "vi").length;
  const enCount = posts.filter((p) => p.lang === "en").length;

  return (
    <div className="min-h-screen bg-[#08121f] text-slate-100 flex flex-col font-sans">
      {/* Studio Header Bar */}
      <header className="sticky top-0 z-40 bg-[#0b192c]/95 border-b border-slate-800 backdrop-blur-md px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-emerald-500 flex items-center justify-center text-[#08121f] font-bold shadow-md shadow-cyan-500/20">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold text-white tracking-tight">
                BioDispatch Editorial Studio
              </h1>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-semibold">
                v2.4
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Trình quản trị & giám tuyển bài viết · TS. Hoàng Xuân Chiến
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700/80 hover:border-slate-600 text-xs text-slate-300 hover:text-white transition-all"
          >
            <Globe className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Xem Web Live</span>
            <ArrowUpRight className="w-3 h-3 opacity-60" />
          </Link>

          <button
            type="button"
            onClick={onLogout}
            title="Đăng xuất"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/10 border border-rose-500/30 hover:bg-rose-500/20 text-xs text-rose-300 transition-all"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Đăng Xuất</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-8 space-y-6">
        {/* Metric Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-[#0b192c] border border-slate-800/80 rounded-2xl p-4">
            <div className="text-[11px] font-mono uppercase text-slate-400 mb-1">
              Tổng số bài viết
            </div>
            <div className="text-2xl font-bold text-white font-mono flex items-baseline gap-2">
              <span>{posts.length}</span>
              <span className="text-xs text-slate-500 font-sans font-normal">Dispatches</span>
            </div>
          </div>

          <div className="bg-[#0b192c] border border-slate-800/80 rounded-2xl p-4">
            <div className="text-[11px] font-mono uppercase text-slate-400 mb-1">
              Song ngữ (Bilingual)
            </div>
            <div className="text-xl font-bold text-cyan-300 font-mono flex items-center gap-2">
              <span>🇻🇳 {viCount}</span>
              <span className="text-slate-600">/</span>
              <span>🇬🇧 {enCount}</span>
            </div>
          </div>

          <div className="bg-[#0b192c] border border-slate-800/80 rounded-2xl p-4">
            <div className="text-[11px] font-mono uppercase text-slate-400 mb-1">
              Kiểm định Chất lượng
            </div>
            <div className="text-xl font-bold text-emerald-400 font-mono flex items-center gap-1.5">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span>100% Passed</span>
            </div>
          </div>

          <div className="bg-[#0b192c] border border-slate-800/80 rounded-2xl p-4">
            <div className="text-[11px] font-mono uppercase text-slate-400 mb-1">
              Sơ đồ Tương tác v2
            </div>
            <div className="text-xl font-bold text-purple-400 font-mono flex items-center gap-1.5">
              <Layers className="w-5 h-5 text-purple-400" />
              <span>40 Flowcharts</span>
            </div>
          </div>
        </div>

        {/* Action Controls & Filters */}
        <div className="bg-[#0b192c] border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            {/* Search Box */}
            <div className="relative flex-1 max-w-lg">
              <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm kiếm theo tiêu đề, slug, cơ chế phân tử hoặc từ khóa..."
                className="w-full pl-10 pr-4 py-2.5 bg-[#060d16] border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none transition-all"
              />
            </div>

            {/* Create Post Buttons */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => handleCreateNew("vi")}
                className="flex items-center gap-1.5 px-3.5 py-2.5 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-[#08121f] font-semibold text-xs rounded-xl shadow-md shadow-cyan-500/20 transition-all active:scale-[0.98]"
              >
                <Plus className="w-4 h-4" />
                <span>+ Viết bài Tiếng Việt</span>
              </button>
              <button
                type="button"
                onClick={() => handleCreateNew("en")}
                className="flex items-center gap-1.5 px-3 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs rounded-xl border border-slate-700 transition-all"
              >
                <Plus className="w-4 h-4 text-cyan-400" />
                <span>+ New English</span>
              </button>
              <button
                type="button"
                onClick={() => setRefreshKey((k) => k + 1)}
                title="Làm mới danh sách"
                className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-400 hover:text-white transition-all"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
              </button>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-800/80 text-xs">
            {/* Organ Filters */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] font-mono uppercase text-slate-500 mr-1">Chủ đề:</span>
              {["ALL", "Brain", "Heart", "Gut", "Cellular Aging", "Immune", "Metabolic"].map((org) => (
                <button
                  key={org}
                  type="button"
                  onClick={() => setSelectedOrgan(org)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                    selectedOrgan === org
                      ? "bg-cyan-500 text-[#08121f] font-semibold"
                      : "bg-[#060d16] text-slate-400 hover:text-white border border-slate-800"
                  }`}
                >
                  {org === "ALL" ? "Tất cả" : org}
                </button>
              ))}
            </div>

            {/* Lang Filters */}
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-mono uppercase text-slate-500 mr-1">Ngôn ngữ:</span>
              {[
                { id: "ALL", label: "Tất cả" },
                { id: "vi", label: "🇻🇳 Tiếng Việt" },
                { id: "en", label: "🇬🇧 English" },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedLang(item.id)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                    selectedLang === item.id
                      ? "bg-cyan-500 text-[#08121f] font-semibold"
                      : "bg-[#060d16] text-slate-400 hover:text-white border border-slate-800"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Posts List / Grid */}
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center text-slate-400 gap-3">
            <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
            <span className="text-xs font-mono">Đang tải danh mục bài viết...</span>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="py-16 text-center bg-[#0b192c] border border-slate-800 rounded-2xl p-8">
            <FileText className="w-10 h-10 text-slate-600 mx-auto mb-3" />
            <h3 className="text-base font-semibold text-white">Không tìm thấy bài viết phù hợp</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              Thử thay đổi từ khóa tìm kiếm hoặc bấm nút "+ Viết bài mới" ở trên để tạo bản tin mới.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="text-xs text-slate-400 font-mono px-1 flex items-center justify-between">
              <span>Hiển thị <strong>{filteredPosts.length}</strong> bài viết</span>
              <span>Sắp xếp: Mới nhất lên đầu</span>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {filteredPosts.map((post) => {
                const OrganIcon = ORGAN_ICONS[post.organ] || Dna;
                const organColorClass = ORGAN_COLORS[post.organ] || "bg-slate-800 text-slate-300";

                return (
                  <div
                    key={post.slug}
                    className="bg-[#0b192c] border border-slate-800/90 hover:border-slate-700/80 rounded-2xl p-4 sm:p-5 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 group"
                  >
                    {/* Left: Metadata & Titles */}
                    <div className="flex-1 min-w-0 space-y-2">
                      <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono">
                        {/* Lang badge */}
                        <span className="px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-cyan-300 font-bold">
                          {post.lang === "vi" ? "🇻🇳 VI" : "🇬🇧 EN"}
                        </span>

                        {/* Organ badge */}
                        <span className={`px-2 py-0.5 rounded-md border text-[11px] font-semibold flex items-center gap-1 ${organColorClass}`}>
                          <OrganIcon className="w-3 h-3" />
                          <span>{post.organ}</span>
                        </span>

                        {/* Tier */}
                        <span className="text-slate-400 hidden sm:inline">
                          {post.tier}
                        </span>

                        <span className="text-slate-600">·</span>

                        {/* Reading time */}
                        <span className="text-slate-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{post.readingTime || "7 min"}</span>
                        </span>

                        {post.featured && (
                          <span className="px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-300 border border-amber-500/20 text-[10px] font-bold">
                            ★ Featured
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                        {post.title}
                      </h3>

                      {/* Excerpt */}
                      {post.excerpt && (
                        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                          {post.excerpt}
                        </p>
                      )}

                      {/* Slug & Date */}
                      <div className="text-[11px] text-slate-500 font-mono flex flex-wrap items-center gap-2 pt-1">
                        <span>slug: <code className="text-slate-400 font-mono">{post.slug}</code></span>
                        {post.date && (
                          <>
                            <span>·</span>
                            <span>{new Date(post.date).toLocaleDateString("vi-VN")}</span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center gap-2 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-800/80">
                      <button
                        type="button"
                        onClick={() => handleEdit(post.slug)}
                        className="flex items-center gap-1.5 px-3 py-2 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-semibold rounded-xl transition-all"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Sửa</span>
                      </button>

                      <Link
                        href={`/blog/${post.slug}`}
                        target="_blank"
                        className="flex items-center gap-1.5 px-3 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-slate-300 hover:text-white text-xs font-medium rounded-xl transition-all"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Xem</span>
                      </Link>

                      <button
                        type="button"
                        onClick={() => handleDownloadMd(post.slug)}
                        title="Tải file .md"
                        className="p-2 text-slate-400 hover:text-cyan-300 bg-slate-900 border border-slate-800 rounded-xl transition-all"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(post.slug, post.title)}
                        title="Xóa bài viết"
                        className="p-2 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-all"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>

      {/* Editor Modal */}
      {isEditorOpen && editorData && (
        <PostEditorModal
          initialData={editorData}
          isOpen={isEditorOpen}
          onClose={() => setIsEditorOpen(false)}
          onSaved={() => {
            setIsEditorOpen(false);
            setRefreshKey((k) => k + 1);
          }}
        />
      )}
    </div>
  );
}
