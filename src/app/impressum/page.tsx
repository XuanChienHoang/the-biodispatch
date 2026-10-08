"use client";

import Link from "next/link";
import { ArrowLeft, Scale, ShieldAlert, Mail, MapPin, UserCheck } from "lucide-react";
import { useLanguageStore } from "@/lib/i18n";

export default function ImpressumPage() {
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
              Legal Disclosure
            </span>
            <span className="caps rounded-sm border border-slate-hair px-2.5 py-1 text-slate-ink font-medium">
              § 5 DDG (Germany)
            </span>
          </div>

          <h1 className="mt-4 font-display display-lg font-black leading-[0.98] tracking-[-0.03em] text-indigo-deep">
            Impressum
          </h1>

          <p className="mt-3 text-[1.05rem] leading-relaxed text-indigo-soft">
            {isVi
              ? "Thông tin định danh pháp lý của trang theo Điều 5 Đạo luật Dịch vụ Kỹ thuật số CHLB Đức (Digitale-Dienste-Gesetz - DDG)."
              : "Information pursuant to § 5 Digitale-Dienste-Gesetz (DDG) of the Federal Republic of Germany."}
          </p>
        </header>

        <div className="mt-10 space-y-10 text-[0.95rem] leading-[1.75] text-indigo-soft">
          {/* Angaben gemäß § 5 DDG */}
          <section className="rounded-sm border border-slate-hair bg-paper-tint p-6 lg:p-8">
            <div className="flex items-center gap-3 border-b border-slate-hair pb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-sm bg-indigo-deep text-trace">
                <UserCheck size={18} />
              </div>
              <h2 className="font-display text-xl font-bold text-indigo-deep">
                Angaben gemäß § 5 DDG / Chủ thể Quản lý
              </h2>
            </div>
            
            <div className="mt-5 space-y-3 font-mono text-xs">
              <div>
                <span className="caps text-slate-ink block">Herausgeber & Verantwortlicher / Publisher:</span>
                <span className="font-bold text-indigo-deep text-sm">Dr. rer. nat. Xuan Chien Hoang</span>
              </div>
              <div>
                <span className="caps text-slate-ink block">Anschrift / Trụ sở hoạt động:</span>
                <span className="text-indigo-deep">Hamburg, Deutschland (CHLB Đức)</span>
              </div>
              <div>
                <span className="caps text-slate-ink block">Kontakt / Liên hệ:</span>
                <span>E-Mail: </span>
                <a href="mailto:hoangxuanchien86@gmail.com" className="text-trace-ink underline">
                  hoangxuanchien86@gmail.com
                </a>
              </div>
            </div>
          </section>

          {/* Redaktionelle Verantwortung */}
          <section className="rounded-sm border border-slate-hair bg-paper-tint p-6 lg:p-8">
            <div className="flex items-center gap-3 border-b border-slate-hair pb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-sm bg-indigo-deep text-trace">
                <Scale size={18} />
              </div>
              <h2 className="font-display text-xl font-bold text-indigo-deep">
                Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV
              </h2>
            </div>
            <div className="mt-4 font-mono text-xs space-y-1">
              <p className="font-bold text-indigo-deep">Dr. Xuan Chien Hoang</p>
              <p className="text-indigo-deep">Hamburg, Deutschland</p>
            </div>
            <p className="mt-4 text-xs text-slate-ink leading-relaxed">
              {isVi
                ? "Phytocodex là ấn phẩm khoa học, tổng thuật y sinh học và thông tin giáo dục sức khỏe phi thương mại do cá nhân tác giả tự chủ biên và vận hành độc lập."
                : "Phytocodex is an independent, non-commercial scientific analysis, biomedical literature synthesis, and health-educational publication published personally by the author."}
            </p>
          </section>

          {/* Haftungsausschluss / Disclaimer */}
          <section className="rounded-sm border border-slate-hair bg-paper-tint p-6 lg:p-8">
            <div className="flex items-center gap-3 border-b border-slate-hair pb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-sm bg-indigo-deep text-trace">
                <ShieldAlert size={18} />
              </div>
              <h2 className="font-display text-xl font-bold text-indigo-deep">
                Medizinischer Disclaimer & Haftungsausschluss
              </h2>
            </div>
            <div className="mt-4 space-y-3 text-xs leading-relaxed text-slate-ink">
              <p>
                <strong>Keine ärztliche Beratung (Không cấu thành tư vấn y khoa):</strong> Die auf dieser Website bereitgestellten Inhalte dienen ausschließlich Informations- und wissenschaftlichen Bildungszwecken. Sie stellen keine medizinische Beratung, Diagnose oder Behandlungsempfehlung dar. Bei gesundheitlichen Beschwerden konsultieren Sie bitte stets einen approbierten Arzt.
              </p>
              <p>
                <strong>Haftung für Inhalte (Trách nhiệm về nội dung):</strong> Als Diensteanbieter sind wir gemäß § 7 Abs.1 DDG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Wir übernehmen jedoch keine Gewähr für die vollständige Aktualität oder Richtigkeit jederzeitiger wissenschaftlicher Entwicklungen.
              </p>
              <p>
                <strong>Haftung für Links (Liên kết ngoài):</strong> Unser Angebot enthält Links zu externen Websites Dritter (z. B. PubMed, DOI Foundation, Amazon), auf deren Inhalte wir keinen Einfluss haben. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
