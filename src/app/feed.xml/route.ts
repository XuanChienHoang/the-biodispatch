import { NextResponse } from "next/server";
import { getMarkdownPosts } from "@/lib/store";

const BASE_URL = "https://the-biodispatch.vercel.app";

function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case "&":
        return "&amp;";
      case "'":
        return "&apos;";
      case '"':
        return "&quot;";
      default:
        return c;
    }
  });
}

export async function GET() {
  const posts = await getMarkdownPosts();

  const itemsXml = posts
    .map((post) => {
      const pubDate = post.date ? new Date(post.date).toUTCString() : new Date().toUTCString();
      const link = `${BASE_URL}/blog/${post.slug}`;
      const title = escapeXml(post.title || "Untitled Dispatch");
      const description = escapeXml(post.dek || "");
      const author = escapeXml(post.author || "Dr. Xuan Chien Hoang");
      const categories = (post.tags || [post.organ]).map((t) => `<category>${escapeXml(t)}</category>`).join("");

      return `
    <item>
      <title>${title}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${description}</description>
      <author>${author}</author>
      ${categories}
    </item>`;
    })
    .join("");

  const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Phytocodex · Dr. Xuan Chien Hoang</title>
    <link>${BASE_URL}</link>
    <description>Evidence-based biomedical dispatches, pharmacokinetics, and interactive cellular simulation models by Dr. rer. nat. Xuan Chien Hoang (University of Hamburg).</description>
    <language>vi</language>
    <atom:link href="${BASE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${itemsXml}
  </channel>
</rss>`;

  return new NextResponse(rssFeed, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
