import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { checkAdminSession } from "@/lib/adminAuth";

const postsDirectory = path.join(process.cwd(), "content/posts");

export const dynamic = "force-dynamic";

interface Params {
  params: Promise<{ slug: string }>;
}

export async function GET(request: Request, { params }: Params) {
  const isAuth = await checkAdminSession();
  if (!isAuth) {
    return NextResponse.json({ error: "Yêu cầu đăng nhập quản trị." }, { status: 401 });
  }

  const { slug } = await params;
  const filePath = path.join(postsDirectory, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: "Không tìm thấy bài viết." }, { status: 404 });
  }

  try {
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);

    return NextResponse.json({
      post: {
        slug,
        title: data.title || "",
        date: data.date || "",
        excerpt: data.excerpt || "",
        author: data.author || "TS. Hoàng Xuân Chiến",
        authorRole: data.authorRole || "Tiến sĩ Khoa học Tự nhiên (Dr. rer. nat.) · Đại học Hamburg, CHLB Đức",
        tags: data.tags || [],
        organ: data.organ || "Metabolic",
        tier: data.tier || "Clinical Deep-Dive",
        readingTime: data.readingTime || "7 phút đọc",
        featured: data.featured ?? false,
        doi: data.doi || "",
        gizmo: data.gizmo || "pathway",
        lang: data.lang || (slug.endsWith("-en") ? "en" : "vi"),
        image: data.image || "",
        imageAlt: data.imageAlt || "",
        content,
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Lỗi đọc bài viết." }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: Params) {
  const isAuth = await checkAdminSession();
  if (!isAuth) {
    return NextResponse.json({ error: "Yêu cầu đăng nhập quản trị." }, { status: 401 });
  }

  const { slug } = await params;
  const filePath = path.join(postsDirectory, `${slug}.md`);

  let localDeleted = false;
  if (fs.existsSync(filePath)) {
    try {
      fs.unlinkSync(filePath);
      localDeleted = true;
    } catch (err) {
      console.warn("Could not delete file locally:", err);
    }
  }

  // GitHub sync if token present
  const githubToken = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
  let gitDeleted = false;
  if (githubToken) {
    try {
      const ghPath = `content/posts/${slug}.md`;
      const apiUrl = `https://api.github.com/repos/XuanChienHoang/the-biodispatch/contents/${ghPath}`;

      const getRes = await fetch(apiUrl, {
        headers: {
          Authorization: `Bearer ${githubToken}`,
          Accept: "application/vnd.github.v3+json",
          "User-Agent": "BioDispatch-Admin-Studio",
        },
      });

      if (getRes.ok) {
        const getData = await getRes.json();
        const delRes = await fetch(apiUrl, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${githubToken}`,
            Accept: "application/vnd.github.v3+json",
            "Content-Type": "application/json",
            "User-Agent": "BioDispatch-Admin-Studio",
          },
          body: JSON.stringify({
            message: `content(editorial): remove dispatch "${slug}" via Admin Studio`,
            sha: getData.sha,
            committer: {
              name: "Xuan Chien Hoang",
              email: "hoangxuanchien86@gmail.com",
            },
          }),
        });
        if (delRes.ok) gitDeleted = true;
      }
    } catch (err) {
      console.warn("GitHub deletion failed:", err);
    }
  }

  return NextResponse.json({
    success: true,
    localDeleted,
    gitDeleted,
    message: "Đã gỡ bài viết thành công.",
  });
}
