"use client";

import Link from "next/link";
import { ArrowLeft, ShieldCheck, Lock, EyeOff, Server, Database } from "lucide-react";
import { useLanguageStore } from "@/lib/i18n";

export default function PrivacyPage() {
  const { lang } = useLanguageStore();
  const isVi = lang === "vi";

  return (
    <main className="min-h-screen bg-paper py-12 lg:py-20">
      <div className="mx-auto max-w-[860px] px-6 lg:px-8">
        <div className="mb-8">
          <Link
            href="/"
            className="caps inline-flex items-center gap-1.5 text-xs font-semibold text-slate-ink hover:text-indigo-deep transition-colors"
          >
            <ArrowLeft size={14} />
            {isVi ? "Quay lại Trang chủ" : "Back to Home"}
          </Link>
        </div>

        <header className="border-b border-slate-hair pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="caps rounded-sm bg-indigo-deep px-2.5 py-1 text-trace font-medium">
              Data Privacy Notice
            </span>
            <span className="caps rounded-sm border border-slate-hair px-2.5 py-1 text-slate-ink font-medium">
              EU GDPR / DSGVO
            </span>
          </div>

          <h1 className="mt-4 font-display display-lg font-black leading-[0.98] tracking-[-0.03em] text-indigo-deep">
            {isVi ? "Chính sách Bảo mật Dữ liệu" : "Datenschutzerklärung (Privacy Policy)"}
          </h1>

          <p className="mt-3 text-[1.05rem] leading-relaxed text-indigo-soft">
            {isVi
              ? "Cam kết bảo vệ quyền riêng tư tuyệt đối, nguyên tắc không thu thập dữ liệu sức khỏe và tuân thủ Quy định Bảo vệ Dữ liệu Chung của Liên minh Châu Âu (GDPR / DSGVO)."
              : "Information on the processing of personal data in accordance with the EU General Data Protection Regulation (GDPR / DSGVO)."}
          </p>
        </header>

        <div className="mt-10 space-y-10 text-[0.95rem] leading-[1.75] text-indigo-soft">
          {/* Section 1: Overview */}
          <section className="rounded-sm border border-slate-hair bg-paper-tint p-6 lg:p-8">
            <div className="flex items-center gap-3 border-b border-slate-hair pb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-sm bg-indigo-deep text-trace">
                <ShieldCheck size={18} />
              </div>
              <h2 className="font-display text-xl font-bold text-indigo-deep">
                {isVi ? "1. Nguyên tắc Cốt lõi: Zero Health Telemetry" : "1. Core Philosophy: Zero Health Tracking"}
              </h2>
            </div>
            <p className="mt-4">
              {isVi
                ? "Phytocodex được xây dựng trên triết lý bảo vệ quyền riêng tư nghiêm ngặt nhất. Chúng tôi không kinh doanh dữ liệu, không bán quảng cáo và không sử dụng bất kỳ công cụ thu thập hành vi sức khỏe nào của độc giả."
                : "Phytocodex is built on privacy-by-design principles. We do not sell user data, serve third-party ads, or monitor personal health behaviors."}
            </p>
            <div className="mt-4 space-y-2 text-xs font-mono">
              <div className="flex items-center gap-2 text-emerald-700">
                <span>✓</span>
                <span>Không sử dụng cookie theo dõi của bên thứ ba (Zero 3rd-party tracking cookies).</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-700">
                <span>✓</span>
                <span>Không thu thập thông tin nhận dạng cá nhân (PII) khi duyệt bài.</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-700">
                <span>✓</span>
                <span>Toàn bộ các mô phỏng dược động học tại Phòng Gizmos chạy 100% nội bộ trong trình duyệt của bạn.</span>
              </div>
            </div>
          </section>

          {/* Section 2: Hosting and Server Logs */}
          <section className="rounded-sm border border-slate-hair bg-paper-tint p-6 lg:p-8">
            <div className="flex items-center gap-3 border-b border-slate-hair pb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-sm bg-indigo-deep text-trace">
                <Server size={18} />
              </div>
              <h2 className="font-display text-xl font-bold text-indigo-deep">
                {isVi ? "2. Máy chủ Hosting & Dữ liệu Kỹ thuật" : "2. Web Hosting & Technical Logs"}
              </h2>
            </div>
            <p className="mt-4 text-xs leading-relaxed">
              Website được lưu trữ trên hạ tầng máy chủ toàn cầu của Vercel Inc. Khi bạn truy cập website, máy chủ sẽ tự động ghi lại một số thông tin kỹ thuật cơ bản trong nhật ký máy chủ (Server Logs) nhằm đảm bảo an toàn hệ thống và phòng chống tấn công mạng (theo Điều 6 Khoản 1 Điểm f DSGVO):
            </p>
            <ul className="mt-3 list-disc pl-5 text-xs font-mono space-y-1 text-slate-ink">
              <li>Địa chỉ IP (được ẩn danh hóa / mã hóa)</li>
              <li>Loại trình duyệt và hệ điều hành</li>
              <li>Thời điểm gửi yêu cầu truy cập</li>
            </ul>
          </section>

          {/* Section 3: Newsletter */}
          <section className="rounded-sm border border-slate-hair bg-paper-tint p-6 lg:p-8">
            <div className="flex items-center gap-3 border-b border-slate-hair pb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-sm bg-indigo-deep text-trace">
                <Lock size={18} />
              </div>
              <h2 className="font-display text-xl font-bold text-indigo-deep">
                {isVi ? "3. Bản tin Khoa học (Newsletter)" : "3. Newsletter Subscription"}
              </h2>
            </div>
            <p className="mt-4 text-xs leading-relaxed">
              {isVi
                ? "Nếu bạn đăng ký nhận bản tin định kỳ, địa chỉ email của bạn chỉ được dùng duy nhất cho mục đích gửi các bài phân tích y sinh học mới từ Phytocodex. Bạn có thể hủy đăng ký bất cứ lúc nào thông qua liên kết ở cuối mỗi email gửi đi hoặc bằng cách gửi email yêu cầu trực tiếp."
                : "If you subscribe to our dispatch newsletter, your email address is used solely to deliver periodic scientific analyses. You may revoke consent at any time."}
            </p>
          </section>

          {/* Section 4: Your Rights */}
          <section className="rounded-sm border border-slate-hair bg-paper-tint p-6 lg:p-8">
            <div className="flex items-center gap-3 border-b border-slate-hair pb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-sm bg-indigo-deep text-trace">
                <Database size={18} />
              </div>
              <h2 className="font-display text-xl font-bold text-indigo-deep">
                {isVi ? "4. Quyền của Chủ thể Dữ liệu (Ihre Rechte)" : "4. Data Subject Rights (EU GDPR)"}
              </h2>
            </div>
            <p className="mt-4 text-xs leading-relaxed text-slate-ink">
              Theo quy định của GDPR/DSGVO, bạn có toàn quyền yêu cầu cung cấp thông tin (Art. 15), chỉnh sửa (Art. 16), xóa dữ liệu (Art. 17), hoặc hạn chế xử lý dữ liệu (Art. 18). Mọi yêu cầu vui lòng liên hệ trực tiếp:
            </p>
            <div className="mt-3 font-mono text-xs">
              <span className="font-bold text-indigo-deep">Dr. Xuan Chien Hoang</span> · Hamburg, Germany ·{" "}
              <a href="mailto:hoangxuanchien86@gmail.com" className="text-trace-ink underline">
                hoangxuanchien86@gmail.com
              </a>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
