"use client";

import { useState } from "react";
import { Lock, KeyRound, ArrowRight, ShieldCheck, Sparkles, AlertCircle } from "lucide-react";

interface AdminLoginProps {
  onSuccess: () => void;
}

export function AdminLogin({ onSuccess }: AdminLoginProps) {
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pin.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        onSuccess();
      } else {
        setError(data.error || "Mã PIN không hợp lệ. Vui lòng thử lại.");
      }
    } catch {
      setError("Không thể kết nối đến máy chủ xác thực.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#08121f] text-slate-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-20 right-1/4 w-80 h-80 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <div className="bg-[#0b192c]/90 border border-slate-800 rounded-3xl p-8 backdrop-blur-xl shadow-2xl shadow-cyan-950/30">
          {/* Logo & Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500/20 to-emerald-500/20 border border-cyan-500/30 text-cyan-400 mb-4 shadow-lg shadow-cyan-500/10">
              <KeyRound className="w-8 h-8" />
            </div>
            <div className="flex items-center justify-center gap-1.5 text-[11px] font-mono tracking-widest uppercase text-cyan-400 font-semibold mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>BioDispatch Editorial Studio</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Cổng Quản Trị Bài Viết
            </h1>
            <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
              Dành riêng cho TS. Hoàng Xuân Chiến · Giám tuyển & Biên tập cơ chế sinh học phân tử
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
                Mã PIN / Mật mã bảo mật
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  value={pin}
                  onChange={(e) => {
                    setPin(e.target.value);
                    if (error) setError(null);
                  }}
                  placeholder="Nhập mã PIN..."
                  autoFocus
                  className="w-full pl-10 pr-4 py-3 bg-[#060d16] border border-slate-700/80 rounded-xl text-white placeholder-slate-500 font-mono tracking-widest text-lg focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                />
              </div>
              <p className="text-[11px] text-slate-400 mt-2 font-mono">
                💡 PIN mặc định: <span className="text-cyan-400 font-bold">2026</span> (có thể đổi bằng biến <code className="text-slate-300">ADMIN_PIN</code>)
              </p>
            </div>

            {error && (
              <div className="flex items-start gap-2 p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-300 text-xs animate-in fade-in">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !pin.trim()}
              className="w-full py-3.5 px-4 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed text-[#08121f] font-semibold text-sm rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 active:scale-[0.98]"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-[#08121f] border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Mở Khóa Studio</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Security badge footer */}
          <div className="mt-8 pt-6 border-t border-slate-800/80 flex items-center justify-center gap-2 text-[11px] text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Xác thực mã hóa HTTP-Only · An toàn chuẩn máy chủ</span>
          </div>
        </div>
      </div>
    </div>
  );
}
