import { Hero, HeroStrip } from "@/components/Hero";
import { HomeMagazine } from "@/components/HomeMagazine";
import { Directory } from "@/components/Directory";
import { getArticles } from "@/lib/store";
import { HomeFeaturedGizmo, HomeSimulationLab } from "@/components/HomeGizmosSection";
import type { Article } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const all = await getArticles();

  // Trang chủ chỉ cần metadata. Bỏ toàn văn markdown để không gửi cả bài xuống trình duyệt.
  const articles: Article[] = all.map((a) => {
    const { content: _content, ...meta } = a as Article & { content?: string };
    return meta;
  });

  return (
    <main>
      <Hero />

      {/* ---- Bài mới nhất: 1 bài lớn + 3 bài nhỏ, có ảnh ---- */}
      <HomeMagazine articles={articles} />

      {/* ---- Kho bài viết dạng lưới ảnh, có bộ lọc ---- */}
      <Directory articles={articles} />

      {/* ---- Dải thông tin tác giả & chuẩn biên tập ---- */}
      <HeroStrip />

      {/* ---- Dụng cụ mô phỏng tương tác ---- */}
      <HomeFeaturedGizmo />

      {/* ---- Simulation Engines Index ---- */}
      <HomeSimulationLab />
    </main>
  );
}
