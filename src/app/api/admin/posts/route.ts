import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { checkAdminSession } from "@/lib/adminAuth";
import { getMarkdownPosts } from "@/lib/store";

const postsDirectory = path.join(process.cwd(), "content/posts");

export const dynamic = "force-dynamic";

export async function GET() {
  const isAuth = await checkAdminSession();
  if (!isAuth) {
    return NextResponse.json({ error: "Yêu cầu đăng nhập quản trị." }, { status: 401 });
  }

  try {
    const posts = await getMarkdownPosts();
    // Sort newest first
    posts.sort((a, b) => new Date(b.date || "").getTime() - new Date(a.date || "").getTime());
    return NextResponse.json({ posts });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Không thể tải danh sách bài viết." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const isAuth = await checkAdminSession();
  if (!isAuth) {
    return NextResponse.json({ error: "Yêu cầu đăng nhập quản trị." }, { status: 401 });
  }

  try {
    const body = await request.json();
    const {
      slug,
      title,
      excerpt,
      author = "TS. Hoàng Xuân Chiến",
      authorRole = "Tiến sĩ Khoa học Tự nhiên (Dr. rer. nat.) · Đại học Hamburg, CHLB Đức",
      tags = [],
      organ = "Metabolic",
      tier = "Clinical Deep-Dive",
      readingTime = "7 phút đọc",
      featured = false,
      doi = "10.1126/science.1241224",
      gizmo = "pathway",
      lang = "vi",
      image = "",
      imageAlt = "",
      content = "",
      isNew = false,
    } = body;

    if (!slug || !title) {
      return NextResponse.json({ error: "Tiêu đề và đường dẫn (slug) không được để trống." }, { status: 400 });
    }

    const cleanSlug = slug
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9-_]/g, "-")
      .replace(/-+/g, "-");

    const filePath = path.join(postsDirectory, `${cleanSlug}.md`);

    if (isNew && fs.existsSync(filePath)) {
      return NextResponse.json({ error: `Bài viết với slug "${cleanSlug}" đã tồn tại. Vui lòng chọn slug khác.` }, { status: 409 });
    }

    // Determine current date ISO string
    const postDate = body.date || new Date().toISOString();

    // Clean tags array
    const cleanTags = Array.isArray(tags)
      ? tags.map((t: string) => t.trim()).filter(Boolean)
      : typeof tags === "string"
      ? tags.split(",").map((t: string) => t.trim()).filter(Boolean)
      : [];

    const frontmatter: Record<string, any> = {
      title: title.trim(),
      date: postDate,
      excerpt: excerpt ? excerpt.trim() : "",
      author: author.trim(),
      authorRole: authorRole.trim(),
      tags: cleanTags,
      organ,
      tier,
      readingTime: readingTime.trim(),
      featured: Boolean(featured),
      doi: doi ? doi.trim() : "",
      gizmo: gizmo ? gizmo.trim() : "pathway",
      lang: lang === "en" ? "en" : "vi",
    };

    if (image) frontmatter.image = image.trim();
    if (imageAlt) frontmatter.imageAlt = imageAlt.trim();

    // Format markdown with frontmatter
    const fileContent = matter.stringify(content.trim() + "\n", frontmatter);

    // 1. Write to local file system if available
    let localSaved = false;
    try {
      if (!fs.existsSync(postsDirectory)) {
        fs.mkdirSync(postsDirectory, { recursive: true });
      }
      fs.writeFileSync(filePath, fileContent, "utf8");
      localSaved = true;
    } catch (fsErr) {
      console.warn("Could not write directly to disk (likely serverless environment):", fsErr);
    }

    // 2. Sync to GitHub API if GITHUB_TOKEN or GH_TOKEN is provided
    let gitSynced = false;
    let gitError: string | null = null;
    const githubToken = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
    const repoOwner = "XuanChienHoang";
    const repoName = "the-biodispatch";

    if (githubToken) {
      try {
        const ghPath = `content/posts/${cleanSlug}.md`;
        const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${ghPath}`;

        // Get existing file SHA if updating
        let sha: string | undefined;
        const getRes = await fetch(apiUrl, {
          headers: {
            Authorization: `Bearer ${githubToken}`,
            Accept: "application/vnd.github.v3+json",
            "User-Agent": "BioDispatch-Admin-Studio",
          },
        });

        if (getRes.ok) {
          const getData = await getRes.json();
          sha = getData.sha;
        }

        // Commit and push via GitHub Contents API
        const commitMessage = sha
          ? `content(editorial): update dispatch "${title.trim()}" via Admin Studio`
          : `content(editorial): create dispatch "${title.trim()}" via Admin Studio`;

        const putRes = await fetch(apiUrl, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${githubToken}`,
            Accept: "application/vnd.github.v3+json",
            "Content-Type": "application/json",
            "User-Agent": "BioDispatch-Admin-Studio",
          },
          body: JSON.stringify({
            message: commitMessage,
            content: Buffer.from(fileContent, "utf8").toString("base64"),
            sha: sha,
            committer: {
              name: "Xuan Chien Hoang",
              email: "hoangxuanchien86@gmail.com",
            },
            author: {
              name: "Xuan Chien Hoang",
              email: "hoangxuanchien86@gmail.com",
            },
          }),
        });

        if (putRes.ok) {
          gitSynced = true;
        } else {
          const errData = await putRes.json();
          gitError = errData.message || "Lỗi GitHub API";
        }
      } catch (err: any) {
        gitError = err.message || "Không thể kết nối GitHub API";
      }
    }

    return NextResponse.json({
      success: true,
      slug: cleanSlug,
      localSaved,
      gitSynced,
      gitError,
      message: gitSynced
        ? "Đã lưu và đồng bộ lên GitHub thành công! Vercel sẽ tự động build cập nhật."
        : localSaved
        ? "Đã lưu bài viết vào hệ thống nội bộ thành công!"
        : "Đã xử lý bài viết.",
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Lỗi lưu bài viết." }, { status: 500 });
  }
}
