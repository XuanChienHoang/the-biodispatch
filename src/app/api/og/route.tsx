import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const title = searchParams.get("title") || "Phytocodex";
    const dek = searchParams.get("dek") || "Decoding the Molecules of Health";
    const organ = searchParams.get("organ") || "Biomedicine";
    const tier = searchParams.get("tier") || "Clinical Review";

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "60px 80px",
            backgroundColor: "#070B11",
            backgroundImage: "radial-gradient(circle at 90% 10%, rgba(212, 175, 55, 0.15) 0%, transparent 40%), radial-gradient(circle at 10% 90%, rgba(16, 185, 129, 0.1) 0%, transparent 45%)",
            color: "#E2E8F0",
            fontFamily: "sans-serif",
          }}
        >
          {/* Top Brand Bar */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <div
                style={{
                  width: "16px",
                  height: "16px",
                  borderRadius: "50%",
                  backgroundColor: "#D4AF37",
                  boxShadow: "0 0 20px #D4AF37",
                }}
              />
              <span
                style={{
                  fontSize: "24px",
                  fontWeight: 800,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "#F8FAFC",
                }}
              >
                PHYTOCODEX
              </span>
            </div>
            <div style={{ display: "flex", gap: "12px" }}>
              <span
                style={{
                  backgroundColor: "rgba(0, 242, 254, 0.12)",
                  border: "1px solid rgba(0, 242, 254, 0.3)",
                  color: "#00F2FE",
                  padding: "6px 16px",
                  borderRadius: "9999px",
                  fontSize: "14px",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}
              >
                {organ}
              </span>
              <span
                style={{
                  backgroundColor: "rgba(100, 116, 139, 0.2)",
                  border: "1px solid rgba(148, 163, 184, 0.3)",
                  color: "#94A3B8",
                  padding: "6px 16px",
                  borderRadius: "9999px",
                  fontSize: "14px",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}
              >
                {tier}
              </span>
            </div>
          </div>

          {/* Middle Content */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: "1050px" }}>
            <h1
              style={{
                fontSize: title.length > 70 ? "46px" : "56px",
                lineHeight: 1.18,
                fontWeight: 800,
                color: "#FFFFFF",
                letterSpacing: "-0.02em",
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                margin: 0,
              }}
            >
              {title}
            </h1>
            <p
              style={{
                fontSize: "22px",
                lineHeight: 1.45,
                color: "#94A3B8",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                margin: 0,
              }}
            >
              {dek}
            </p>
          </div>

          {/* Footer Credentials */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderTop: "1px solid rgba(148, 163, 184, 0.15)",
              paddingTop: "28px",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <span style={{ fontSize: "20px", fontWeight: 700, color: "#F1F5F9" }}>
                Dr. Xuan Chien Hoang · Dr. rer. nat.
              </span>
              <span style={{ fontSize: "14px", color: "#64748B", letterSpacing: "0.05em" }}>
                University of Hamburg · Molecular Biology & Metabolomics
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontSize: "15px", color: "#00F2FE", fontWeight: 600 }}>
                www.phyto-codex.org
              </span>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: unknown) {
    const errorMsg = e instanceof Error ? e.message : "Internal Error";
    return new Response(`Failed to generate image: ${errorMsg}`, { status: 500 });
  }
}
