"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Download, Copy, Check, X, Sparkles, Type } from "lucide-react";

interface QuoteCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  quote: string;
  articleTitle: string;
  authorName: string;
  authorRole: string;
  isVi: boolean;
  doi?: string;
}

/**
 * Modal tạo Card ảnh vuông (1080x1080) trích dẫn khoa học chuẩn cao cấp để chia sẻ lên Facebook, LinkedIn, Zalo.
 * Hỗ trợ 100% tiếng Việt chuẩn Unicode, không bị lỗi font hay mất dấu tiếng Việt trên mọi hệ điều hành.
 */
export function QuoteCardModal({
  isOpen,
  onClose,
  quote,
  articleTitle,
  authorName,
  authorRole,
  isVi,
  doi,
}: QuoteCardModalProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [fontStyle, setFontStyle] = useState<"editorial" | "modern">("editorial");

  const renderCard = useCallback(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = 1080;
    const height = 1080;
    canvas.width = width;
    canvas.height = height;

    // Lấy biến font từ hệ thống nếu có
    const rootStyle = typeof window !== "undefined" ? window.getComputedStyle(document.documentElement) : null;
    const frauncesVar = rootStyle?.getPropertyValue("--font-fraunces")?.trim();
    const archivoVar = rootStyle?.getPropertyValue("--font-archivo")?.trim();
    const jetbrainsVar = rootStyle?.getPropertyValue("--font-jetbrains")?.trim();

    // Font stack chuẩn tiếng Việt không bao giờ lỗi dấu trên Windows, Mac, iOS, Android
    const serifStack = frauncesVar
      ? `${frauncesVar}, "Segoe UI", "Times New Roman", serif`
      : '"Segoe UI", "Times New Roman", serif';

    const sansStack = archivoVar
      ? `${archivoVar}, "Segoe UI", -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", Arial, sans-serif`
      : '"Segoe UI", -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", Arial, sans-serif';

    const monoStack = jetbrainsVar
      ? `${jetbrainsVar}, "JetBrains Mono", Consolas, "Courier New", monospace`
      : '"JetBrains Mono", Consolas, "Courier New", monospace';

    // 1. Nền Deep Indigo sang trọng
    ctx.fillStyle = "#0B192C";
    ctx.fillRect(0, 0, width, height);

    // 2. Lưới Graticule tinh tế (phong cách tạp chí khoa học Thụy Sĩ)
    ctx.strokeStyle = "rgba(148, 163, 184, 0.08)";
    ctx.lineWidth = 1;
    const gridSize = 45;
    for (let x = 0; x < width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // 3. Vòng tròn sáng mờ nghệ thuật (Radial Gradient Accent)
    const radGrad = ctx.createRadialGradient(width - 180, 180, 40, width - 180, 180, 480);
    radGrad.addColorStop(0, "rgba(0, 242, 254, 0.20)");
    radGrad.addColorStop(1, "rgba(11, 25, 44, 0)");
    ctx.fillStyle = radGrad;
    ctx.fillRect(0, 0, width, height);

    // 4. Khung viền tinh xảo
    ctx.strokeStyle = "rgba(226, 232, 240, 0.16)";
    ctx.lineWidth = 2;
    ctx.strokeRect(54, 54, width - 108, height - 108);

    // 5. Header: Logo Phyto-Codex & Badge
    ctx.fillStyle = "#00F2FE";
    ctx.font = `bold 24px ${monoStack}`;
    ctx.fillText("PHYTO-CODEX.ORG", 95, 120);

    ctx.fillStyle = "rgba(226, 232, 240, 0.65)";
    ctx.font = `600 15px ${monoStack}`;
    ctx.fillText(
      isVi ? "CHUYÊN KHẢO DƯỢC LIỆU & Y SINH HỌC PHÂN TỬ" : "EVIDENCE-BASED BIOMEDICAL DISPATCH",
      95,
      152
    );

    // Dấu ngoặc kép trích dẫn lớn mờ
    ctx.fillStyle = "rgba(0, 242, 254, 0.18)";
    ctx.font = `bold 140px ${serifStack}`;
    ctx.fillText("“", 90, 260);

    // 6. Tính toán kích thước font linh hoạt theo độ dài quote để không bao giờ bị cắt chữ
    const quoteLength = quote.length;
    let quoteFontSize = 34;
    let lineHeight = 52;
    if (quoteLength > 240) {
      quoteFontSize = 26;
      lineHeight = 40;
    } else if (quoteLength > 150) {
      quoteFontSize = 30;
      lineHeight = 46;
    }

    ctx.fillStyle = "#FFFFFF";
    if (fontStyle === "editorial") {
      ctx.font = `italic 600 ${quoteFontSize}px ${serifStack}`;
    } else {
      ctx.font = `600 ${quoteFontSize}px ${sansStack}`;
    }

    const maxWidth = width - 190;
    const words = quote.split(" ");
    let line = "";
    let y = 300;
    const maxLines = quoteLength > 240 ? 10 : 8;
    let lineCount = 0;

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + " ";
      const metrics = ctx.measureText(testLine);
      const testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        ctx.fillText(line.trim(), 95, y);
        line = words[n] + " ";
        y += lineHeight;
        lineCount++;
        if (lineCount >= maxLines - 1 && n < words.length - 1) {
          line += "...";
          break;
        }
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line.trim(), 95, y);

    // 7. Divider Line
    ctx.strokeStyle = "rgba(0, 242, 254, 0.5)";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(95, 805);
    ctx.lineTo(260, 805);
    ctx.stroke();

    // 8. Tác giả & Chức danh
    ctx.fillStyle = "#00F2FE";
    ctx.font = `bold 30px ${sansStack}`;
    ctx.fillText(authorName, 95, 855);

    ctx.fillStyle = "#CBD5E1";
    ctx.font = `500 21px ${sansStack}`;
    ctx.fillText(authorRole, 95, 892);

    // 9. Tiêu đề bài viết tham chiếu
    ctx.fillStyle = "rgba(148, 163, 184, 0.9)";
    ctx.font = `italic 400 18px ${sansStack}`;
    const refPrefix = isVi ? "Trích từ chuyên khảo: " : "From dispatch: ";
    const refText = refPrefix + articleTitle;
    const truncatedRef = refText.length > 72 ? refText.slice(0, 70) + "..." : refText;
    ctx.fillText(truncatedRef, 95, 948);

    if (doi) {
      ctx.fillStyle = "rgba(0, 242, 254, 0.7)";
      ctx.font = `500 15px ${monoStack}`;
      ctx.fillText(`DOI: ${doi}`, 95, 980);
    }
  }, [quote, articleTitle, authorName, authorRole, isVi, doi, fontStyle]);

  useEffect(() => {
    if (!isOpen) return;

    // Chờ web fonts sẵn sàng để vẽ chuẩn xác 100%
    if (typeof document !== "undefined" && "fonts" in document) {
      document.fonts.ready.then(() => {
        renderCard();
      });
    } else {
      renderCard();
    }
  }, [isOpen, renderCard]);

  const handleDownload = () => {
    if (!canvasRef.current) return;
    setDownloading(true);
    const dataUrl = canvasRef.current.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = `phytocodex-quote-${Date.now()}.png`;
    link.href = dataUrl;
    link.click();
    setTimeout(() => setDownloading(false), 800);
  };

  const handleCopyImage = async () => {
    if (!canvasRef.current) return;
    try {
      canvasRef.current.toBlob(async (blob) => {
        if (!blob) return;
        await navigator.clipboard.write([
          new ClipboardItem({ "image/png": blob }),
        ]);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      });
    } catch {
      handleDownload();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-indigo-deep/80 backdrop-blur-sm">
      <div className="relative w-full max-w-lg overflow-hidden rounded-md border border-slate-hair bg-paper shadow-2xl">
        {/* Header modal */}
        <div className="flex items-center justify-between border-b border-slate-hair px-5 py-3.5 bg-paper-tint">
          <div className="flex items-center gap-2">
            <Sparkles size={16} className="text-teal-600" />
            <h3 className="font-display text-sm font-bold text-indigo-deep">
              {isVi ? "Tạo Card Ảnh Trích Dẫn Chia Sẻ" : "Generate Shareable Quote Card"}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-slate-ink hover:text-indigo-deep cursor-pointer transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Font Switcher & Preview Canvas */}
        <div className="p-5 flex flex-col items-center justify-center bg-slate-900/10">
          {/* Font switcher pills */}
          <div className="mb-3 flex items-center gap-2">
            <span className="text-[11px] font-medium text-slate-ink flex items-center gap-1">
              <Type size={12} />
              {isVi ? "Kiểu chữ:" : "Font Style:"}
            </span>
            <button
              type="button"
              onClick={() => setFontStyle("editorial")}
              className={`rounded px-2.5 py-1 text-[11px] font-semibold transition-colors cursor-pointer ${
                fontStyle === "editorial"
                  ? "bg-indigo-deep text-white shadow-2xs"
                  : "bg-paper text-slate-ink border border-slate-hair hover:text-indigo-deep"
              }`}
            >
              {isVi ? "Chuyên khảo (Serif)" : "Editorial (Serif)"}
            </button>
            <button
              type="button"
              onClick={() => setFontStyle("modern")}
              className={`rounded px-2.5 py-1 text-[11px] font-semibold transition-colors cursor-pointer ${
                fontStyle === "modern"
                  ? "bg-indigo-deep text-white shadow-2xs"
                  : "bg-paper text-slate-ink border border-slate-hair hover:text-indigo-deep"
              }`}
            >
              {isVi ? "Hiện đại (Sans)" : "Modern (Sans)"}
            </button>
          </div>

          <canvas
            ref={canvasRef}
            className="w-full max-w-[340px] aspect-square rounded-sm shadow-xl border border-slate-hair"
          />
          <p className="mt-3 text-[11px] text-slate-ink text-center">
            {isVi
              ? "Ảnh vuông chuẩn 1080x1080px · Sắc nét cho Facebook, LinkedIn, Instagram Stories, Zalo"
              : "High-resolution 1080x1080px · Optimized for LinkedIn, Facebook, Instagram & X"}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 border-t border-slate-hair px-5 py-3.5 bg-paper-tint">
          <button
            type="button"
            onClick={handleCopyImage}
            className="inline-flex items-center gap-1.5 rounded-sm border border-slate-hair bg-paper px-3.5 py-2 text-xs font-semibold text-indigo-deep hover:border-indigo-deep hover:bg-paper-tint transition-all cursor-pointer"
          >
            {copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
            <span>{copied ? (isVi ? "Đã chép ảnh!" : "Image Copied!") : (isVi ? "Sao chép ảnh" : "Copy Image")}</span>
          </button>

          <button
            type="button"
            onClick={handleDownload}
            disabled={downloading}
            className="inline-flex items-center gap-1.5 rounded-sm bg-indigo-deep px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-[#101f34] transition-all cursor-pointer"
          >
            <Download size={14} className="text-trace" />
            <span>{isVi ? "Tải ảnh về máy" : "Download PNG"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
