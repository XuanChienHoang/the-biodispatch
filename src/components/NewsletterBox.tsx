"use client";

import { useState } from "react";
import { Mail, CheckCircle, ArrowRight, ShieldCheck } from "lucide-react";

interface NewsletterBoxProps {
  isVi?: boolean;
}

export function NewsletterBox({ isVi = true }: NewsletterBoxProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setStatus("error");
      setMessage(isVi ? "Vui lòng nhập địa chỉ email hợp lệ." : "Please enter a valid email address.");
      return;
    }

    setStatus("loading");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage(
          isVi
            ? "Cảm ơn anh/chị! Bạn đã được đăng ký nhận bản tin y sinh định kỳ từ TS. Hoàng Xuân Chiến."
            : "Thank you! You are subscribed to weekly biomedical intelligence from Dr. Xuan Chien Hoang."
        );
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || (isVi ? "Có lỗi xảy ra, vui lòng thử lại." : "Something went wrong. Please try again."));
      }
    } catch {
      setStatus("error");
      setMessage(isVi ? "Không thể kết nối máy chủ. Vui lòng thử lại sau." : "Network error. Please try again later.");
    }
  };

  return (
    <div className="relative overflow-hidden rounded-sm border border-slate-hair bg-gradient-to-br from-paper via-paper-tint to-paper p-6 sm:p-8">
      {/* Subtle accent glow */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-trace-ink/5 blur-3xl" />

      <div className="relative max-w-2xl">
        <div className="flex items-center gap-2 text-trace-ink">
          <Mail size={16} />
          <span className="caps text-[0.72rem] font-bold tracking-widest text-trace-ink">
            {isVi ? "THE BIODISPATCH · BẢN TIN ĐỊNH KỲ" : "THE BIODISPATCH · WEEKLY BRIEF"}
          </span>
        </div>

        <h3 className="mt-2.5 font-display text-[1.35rem] font-bold tracking-[-0.02em] text-indigo-deep sm:text-[1.55rem]">
          {isVi
            ? "Giải mã Y sinh & Dược học Thực chứng Trực tiếp vào Hộp thư"
            : "Evidence-Based Biomedical Intelligence Straight to Your Inbox"}
        </h3>

        <p className="mt-2 text-[0.92rem] leading-relaxed text-indigo-soft">
          {isVi
            ? "Cập nhật các phân tích sinh khả dụng, con đường truyền tín hiệu tế bào, mô phỏng dược động học và cơ chế thảo dược Đông - Tây bởi TS. Hoàng Xuân Chiến. Không spam, bảo mật 100%."
            : "Deep-dives into bioavailability kinetics, cellular pathways, interactive simulation models, and East-West ethnobotanicals by Dr. Xuan Chien Hoang. Zero spam, unsubscribe anytime."}
        </p>

        {status === "success" ? (
          <div className="mt-5 flex items-start gap-3 rounded-sm border border-emerald-500/30 bg-emerald-500/10 p-4 text-emerald-800">
            <CheckCircle size={18} className="mt-0.5 shrink-0 text-emerald-600" />
            <p className="text-sm font-medium">{message}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-2.5 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={isVi ? "Nhập địa chỉ email của bạn..." : "Enter your email address..."}
                required
                className="w-full rounded-sm border border-slate-hair bg-paper px-4 py-2.5 text-sm text-indigo-deep placeholder-slate-ink outline-none transition-all duration-200 focus:border-trace-ink focus:ring-1 focus:ring-trace-ink"
              />
            </div>
            <button
              type="submit"
              disabled={status === "loading"}
              className="caps inline-flex items-center justify-center gap-2 rounded-sm bg-indigo-deep px-5 py-2.5 text-xs font-semibold text-paper transition-all duration-200 hover:bg-indigo-mid disabled:opacity-60"
            >
              {status === "loading" ? (
                isVi ? "Đang xử lý..." : "Subscribing..."
              ) : (
                <>
                  {isVi ? "Đăng ký nhận tin" : "Subscribe"}
                  <ArrowRight size={13} />
                </>
              )}
            </button>
          </form>
        )}

        {status === "error" && (
          <p className="mt-2 text-xs text-rose-600 font-medium">{message}</p>
        )}

        <div className="mt-4 flex items-center gap-2 text-[0.72rem] text-slate-ink">
          <ShieldCheck size={13} className="text-trace-ink" />
          <span>
            {isVi
              ? "Bảo mật chuẩn EU GDPR. Hỗ trợ huỷ đăng ký bằng 1 click bất kỳ lúc nào."
              : "GDPR compliant. 1-click unsubscribe anytime."}
          </span>
        </div>
      </div>
    </div>
  );
}
