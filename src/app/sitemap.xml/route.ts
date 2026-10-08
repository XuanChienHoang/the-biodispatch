import { NextResponse } from "next/server";
import { getArticles } from "@/lib/store";
import { GIZMOS } from "@/lib/content";

const BASE_URL = "https://phytocodex.vercel.app";

export async function GET() {
  const articles = await getArticles();

  const staticUrls = [
    { loc: `${BASE_URL}`, priority: "1.0", changefreq: "daily" },
    { loc: `${BASE_URL}/about`, priority: "0.8", changefreq: "monthly" },
    { loc: `${BASE_URL}/gizmos`, priority: "0.9", changefreq: "weekly" },
  ];

  const gizmoUrls = GIZMOS.map((g) => ({
    loc: `${BASE_URL}/gizmos/${g.slug}`,
    priority: "0.85",
    changefreq: "weekly",
  }));

  const articleUrls = articles.map((a) => {
    const articleDate = (a as { date?: string }).date;
    return {
      loc: `${BASE_URL}/blog/${a.slug}`,
      lastmod: articleDate ? new Date(articleDate).toISOString().split("T")[0] : new Date().toISOString().split("T")[0],
      priority: "0.8",
      changefreq: "weekly",
    };
  });

  const allUrls = [...staticUrls, ...gizmoUrls, ...articleUrls];

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    ${"lastmod" in u && u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : `<lastmod>${new Date().toISOString().split("T")[0]}</lastmod>`}
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  return new NextResponse(sitemapXml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
