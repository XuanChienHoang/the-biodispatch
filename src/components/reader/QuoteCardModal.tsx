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
  articleImage?: string;
}

function loadImg(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = (e) => reject(e);
    img.src = src;
  });
}

function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.arcTo(x + w, y, x + w, y + r, r);
  ctx.lineTo(x + w, y + h - r);
  ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
  ctx.lineTo(x + r, y + h);
  ctx.arcTo(x, y + h, x, y + h - r, r);
  ctx.lineTo(x, y + r);
  ctx.arcTo(x, y, x + r, y, r);
  ctx.closePath();
}

function drawImageCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  x: number,
  y: number,
  w: number,
  h: number
) {
  const imgRatio = img.width / img.height;
  const targetRatio = w / h;
  let sx = 0;
  let sy = 0;
  let sw = img.width;
  let sh = img.height;

  if (imgRatio > targetRatio) {
    sw = img.height * targetRatio;
    sx = (img.width - sw) / 2;
  } else {
    sh = img.width / targetRatio;
    sy = (img.height - sh) / 2;
  }

  ctx.drawImage(img, sx, sy, sw, sh, x, y, w, h);
}

/**
 * Modal tạo Card ảnh vuông (1080x1080) trích dẫn khoa học chuẩn cao cấp:
 * - Chèn Logo chuẩn Phyto-Codex (Ginkgo vàng & phân tử)
 * - Chèn Hình ảnh minh họa chính của bài viết (Artwork Cover)
 * - Typography Unicode tiếng Việt hoàn hảo không lỗi dấu
 * - Tối ưu cho Facebook, LinkedIn, Instagram Stories, X
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
  articleImage,
}: QuoteCardModalProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [fontStyle, setFontStyle] = useState<"editorial" | "modern">("editorial");

  const renderCard = useCallback(async () => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = 1080;
    const height = 1080;
    canvas.width = width;
    canvas.height = height;

    // Tải đồng thời logo Phytocodex và hình ảnh bài viết
    const [emblemImg, articleImg] = await Promise.all([
      loadImg("/images/phytocodex-emblem.jpg").catch(() => null),
      articleImage ? loadImg(articleImage).catch(() => null) : Promise.resolve(null),
    ]);

    // Lấy biến font từ hệ thống nếu có
    const rootStyle = typeof window !== "undefined" ? window.getComputedStyle(document.documentElement) : null;
    const frauncesVar = rootStyle?.getPropertyValue("--font-fraunces")?.trim();
    const archivoVar = rootStyle?.getPropertyValue("--font-archivo")?.trim();
    const jetbrainsVar = rootStyle?.getPropertyValue("--font-jetbrains")?.trim();

    const serifStack = frauncesVar
      ? `${frauncesVar}, "Segoe UI", "Times New Roman", serif`
      : '"Segoe UI", "Times New Roman", serif';

    const sansStack = archivoVar
      ? `${archivoVar}, "Segoe UI", -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", Arial, sans-serif`
      : '"Segoe UI", -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", Arial, sans-serif';

    const monoStack = jetbrainsVar
      ? `${jetbrainsVar}, "JetBrains Mono", Consolas, "Courier New", monospace`
      : '"JetBrains Mono", Consolas, "Courier New", monospace';

    // 1. Nền Deep Laboratory Indigo sang trọng
    const bgGrad = ctx.createLinearGradient(0, 0, width, height);
    bgGrad.addColorStop(0, "#070E1A");
    bgGrad.addColorStop(1, "#0B192C");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // 2. Lưới Graticule tinh tế (Engineering Grid)
    ctx.strokeStyle = "rgba(148, 163, 184, 0.05)";
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

    // 3. Khung viền tinh xảo bo góc
    ctx.save();
    ctx.strokeStyle = "rgba(226, 232, 240, 0.12)";
    ctx.lineWidth = 2;
    drawRoundedRect(ctx, 36, 36, width - 72, height - 72, 16);
    ctx.stroke();
    ctx.restore();

    // 4. Header: Logo Phyto-Codex (Ginkgo Emblem) + Brand Typography
    const emblemX = 86;
    const emblemY = 88;
    const emblemRadius = 26;

    if (emblemImg) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(emblemX, emblemY, emblemRadius, 0, Math.PI * 2);
      ctx.clip();
      ctx.drawImage(emblemImg, emblemX - emblemRadius, emblemY - emblemRadius, emblemRadius * 2, emblemRadius * 2);
      ctx.restore();

      // Viền vàng kim tinh tế cho logo
      ctx.strokeStyle = "#D4AF37";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(emblemX, emblemY, emblemRadius, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Brand Name & Subtitle
    ctx.fillStyle = "#00F2FE";
    ctx.font = `bold 21px ${monoStack}`;
    ctx.fillText("PHYTO-CODEX.ORG", 130, 84);

    ctx.fillStyle = "rgba(226, 232, 240, 0.65)";
    ctx.font = `600 12px ${monoStack}`;
    ctx.fillText(
      isVi ? "CHUYÊN KHẢO DƯỢC LIỆU & Y SINH HỌC PHÂN TỬ" : "EVIDENCE-BASED BIOMEDICAL DISPATCH",
      130,
      104
    );

    // Header Right Badge: PEER-REVIEWED
    ctx.fillStyle = "rgba(0, 242, 254, 0.08)";
    ctx.strokeStyle = "rgba(0, 242, 254, 0.3)";
    ctx.lineWidth = 1;
    const badgeW = isVi ? 155 : 170;
    const badgeH = 28;
    const badgeX = width - 68 - badgeW;
    const badgeY = 72;
    drawRoundedRect(ctx, badgeX, badgeY, badgeW, badgeH, 14);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#00F2FE";
    ctx.font = `600 11px ${monoStack}`;
    ctx.fillText(isVi ? "Y HỌC THỰC CHỨNG" : "EVIDENCE ARCHIVE", badgeX + 16, badgeY + 18);

    // 5. Artwork Hero Banner (Hình ảnh minh họa bài viết)
    const artX = 64;
    const artY = 138;
    const artW = width - 128;
    const artH = 340;
    const artR = 12;

    ctx.save();
    drawRoundedRect(ctx, artX, artY, artW, artH, artR);
    ctx.clip();

    if (articleImg) {
      drawImageCover(ctx, articleImg, artX, artY, artW, artH);

      // Gradient chuyển tiếp mờ dần xuống phía dưới để tôn vinh chữ
      const artFade = ctx.createLinearGradient(0, artY + artH * 0.45, 0, artY + artH);
      artFade.addColorStop(0, "rgba(11, 25, 44, 0)");
      artFade.addColorStop(1, "rgba(11, 25, 44, 0.95)");
      ctx.fillStyle = artFade;
      ctx.fillRect(artX, artY, artW, artH);
    } else {
      // Fallback: Lưới đồ họa phân tử
      const fallbackGrad = ctx.createLinearGradient(artX, artY, artX + artW, artY + artH);
      fallbackGrad.addColorStop(0, "#0D223A");
      fallbackGrad.addColorStop(1, "#07111D");
      ctx.fillStyle = fallbackGrad;
      ctx.fillRect(artX, artY, artW, artH);

      ctx.fillStyle = "rgba(0, 242, 254, 0.2)";
      ctx.font = `italic 16px ${sansStack}`;
      ctx.fillText(articleTitle, artX + 24, artY + artH - 24);
    }

    ctx.restore();

    // Viền nhẹ cho ảnh bài viết
    ctx.strokeStyle = "rgba(226, 232, 240, 0.18)";
    ctx.lineWidth = 1.5;
    drawRoundedRect(ctx, artX, artY, artW, artH, artR);
    ctx.stroke();

    // 6. Quote Section (Đoạn trích dẫn đắt giá)
    // Dấu ngoặc trích dẫn nghệ thuật
    ctx.fillStyle = "rgba(0, 242, 254, 0.25)";
    ctx.font = `bold 80px ${serifStack}`;
    ctx.fillText("“", 62, 535);

    const quoteLength = quote.length;
    let quoteFontSize = 28;
    let lineHeight = 42;
    if (quoteLength > 240) {
      quoteFontSize = 21;
      lineHeight = 33;
    } else if (quoteLength > 140) {
      quoteFontSize = 24;
      lineHeight = 38;
    }

    ctx.fillStyle = "#FFFFFF";
    if (fontStyle === "editorial") {
      ctx.font = `italic 600 ${quoteFontSize}px ${serifStack}`;
    } else {
      ctx.font = `600 ${quoteFontSize}px ${sansStack}`;
    }

    const maxWidth = width - 136;
    const words = quote.split(" ");
    let line = "";
    let y = 560;
    const maxLines = quoteLength > 240 ? 8 : 6;
    let lineCount = 0;

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + " ";
      const metrics = ctx.measureText(testLine);
      const testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        ctx.fillText(line.trim(), 68, y);
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
    ctx.fillText(line.trim(), 68, y);

    // 7. Footer Divider Line (Cyan Accent)
    ctx.strokeStyle = "rgba(0, 242, 254, 0.55)";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(68, 875);
    ctx.lineTo(240, 875);
    ctx.stroke();

    // 8. Tác giả & Chức danh
    ctx.fillStyle = "#00F2FE";
    ctx.font = `bold 24px ${sansStack}`;
    ctx.fillText(authorName, 68, 915);

    ctx.fillStyle = "#CBD5E1";
    ctx.font = `500 17px ${sansStack}`;
    ctx.fillText(authorRole, 68, 945);

    // 9. Tiêu đề bài viết tham chiếu & DOI
    ctx.fillStyle = "rgba(148, 163, 184, 0.9)";
    ctx.font = `italic 400 15px ${sansStack}`;
    const refPrefix = isVi ? "Trích từ chuyên khảo: " : "From dispatch: ";
    const refText = refPrefix + articleTitle;
    const truncatedRef = refText.length > 70 ? refText.slice(0, 68) + "..." : refText;
    ctx.fillText(truncatedRef, 68, 990);

    if (doi) {
      ctx.fillStyle = "rgba(0, 242, 254, 0.75)";
      ctx.font = `500 13px ${monoStack}`;
      ctx.fillText(`DOI: ${doi}`, 68, 1016);
    }
  }, [quote, articleTitle, authorName, authorRole, isVi, doi, articleImage, fontStyle]);

  useEffect(() => {
    if (!isOpen) return;

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
              ? "Ảnh vuông chuẩn 1080x1080px · Logo Phytocodex & Artwork bài viết sắc nét"
              : "High-resolution 1080x1080px · Embedded Phytocodex Emblem & Article Artwork"}
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
