"use client";

import Link from "next/link";
import { useLanguageStore } from "@/lib/i18n";
import type { ReactNode } from "react";

interface EngineData {
  slug: string;
  index: string;
  name: string;
  nameVi?: string;
  short: string;
  blurb: string;
  blurbVi?: string;
  refs: string;
  assumptions: string[];
  assumptionsVi: string[];
  children: ReactNode;
}

export function GizmoViewWrapper({
  slug,
  index,
  name,
  nameVi,
  short,
  blurb,
  blurbVi,
  refs,
  assumptions,
  assumptionsVi,
  children,
}: EngineData) {
  const { lang } = useLanguageStore();
  const isVi = lang === "vi";

  return (
    <div className="mx-auto max-w-[1240px] px-6 py-12 lg:px-10 lg:py-16">
      <nav className="caps flex flex-wrap items-center gap-2 text-slate-ink">
        <Link href="/" className="hover:text-indigo-deep">
          {isVi ? "Trang chủ" : "Hub"}
        </Link>
        <span>/</span>
        <Link href="/gizmos" className="hover:text-indigo-deep">
          {isVi ? "Danh mục Mô phỏng" : "Gizmos"}
        </Link>
        <span>/</span>
        <span className="text-indigo-deep">{short}</span>
      </nav>

      <div className="mt-7 grid gap-8 border-b-2 border-indigo-deep pb-7 lg:grid-cols-[1.3fr_1fr] lg:items-end">
        <div>
          <span className="caps text-slate-ink">
            {isVi ? `Công cụ Mô phỏng ${index}` : `Gizmo ${index}`}
          </span>
          <h1 className="mt-3 font-display display-lg font-black leading-[0.94] tracking-[-0.038em] text-indigo-deep">
            {isVi && nameVi ? nameVi : name}
          </h1>
          <p className="mt-4 max-w-2xl text-[1.02rem] leading-relaxed text-slate-ink">
            {isVi && blurbVi ? blurbVi : blurb}
          </p>
        </div>
        <div className="flex flex-wrap gap-2 lg:justify-end">
          <span className="caps rounded-sm border border-slate-hair px-2.5 py-1.5 text-slate-ink font-mono text-xs">
            DOI {refs}
          </span>
          <span className="caps rounded-sm border border-slate-hair px-2.5 py-1.5 text-slate-ink">
            {isVi ? "100% nội bộ trình duyệt" : "100 % client-side"}
          </span>
          <span className="caps rounded-sm bg-indigo-deep px-2.5 py-1.5 text-trace font-bold">
            {isVi ? "mô hình trực tiếp" : "live model"}
          </span>
        </div>
      </div>

      <div className="my-8">{children}</div>

      <div className="grid gap-10 border-t border-slate-hair pt-10 md:grid-cols-[1.2fr_1fr]">
        <div>
          <p className="caps text-slate-ink font-semibold">
            {isVi
              ? "Giả định khoa học của mô hình toán — Đọc kỹ trước khi suy diễn"
              : "Model assumptions — read these first"}
          </p>
          <ul className="mt-4 space-y-3">
            {(isVi ? assumptionsVi : assumptions).map((a, i) => (
              <li key={i} className="flex gap-4 border-b border-slate-hair pb-3">
                <span className="num shrink-0 text-[0.8rem] text-trace-ink font-bold font-mono">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[0.92rem] leading-relaxed text-indigo-soft">{a}</span>
              </li>
            ))}
          </ul>
        </div>
        <aside className="rounded-sm border border-slate-hair bg-paper-tint p-6">
          <p className="caps text-slate-ink font-semibold">
            {isVi ? "Quy chuẩn Bảo mật Dữ liệu (GDPR & Y tế)" : "GDPR · architectural note"}
          </p>
          <p className="mt-3 text-[0.9rem] leading-relaxed text-indigo-soft">
            {isVi
              ? "Mọi tham số trượt và tính toán ở đây chỉ tồn tại trong bộ nhớ RAM của trình duyệt bạn đang mở. Tuyệt đối không gửi request ra máy chủ, không cookie theo dõi, không lưu trữ thông tin cá nhân. Đóng tab là toàn bộ mô hình tự động hủy bỏ hoàn toàn."
              : "Every slider here writes to React state in your own tab. There is no fetch, no beacon, no localStorage, no analytics event carrying a parameter value. If you close the tab, the model is destroyed — which is precisely the point of Article 5(1)(c)."}
          </p>
          <div className="mt-5 grid grid-cols-3 gap-px border-t border-slate-hair bg-slate-hair pt-px">
            {[
              ["0", isVi ? "request ngoài" : "requests"],
              ["0", isVi ? "cookie theo dõi" : "cookies"],
              ["0", isVi ? "thông tin cá nhân" : "PII"],
            ].map(([v, k]) => (
              <div key={k} className="bg-paper-tint px-3 py-3">
                <p className="num text-[1.5rem] leading-none text-indigo-deep font-bold">{v}</p>
                <p className="caps mt-1.5 text-slate-ink text-[0.7rem]">{k}</p>
              </div>
            ))}
          </div>
          <p className="mt-5 text-xs text-slate-ink font-mono">
            {isVi
              ? "Kiến trúc mô phỏng độc lập theo chuẩn Y tế Châu Âu"
              : "Independent client simulation architecture"}
          </p>
        </aside>
      </div>
    </div>
  );
}
