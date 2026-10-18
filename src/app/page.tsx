import { Hero, HeroStrip } from "@/components/Hero";
import { HomeMagazine } from "@/components/HomeMagazine";
import { CuratedSections } from "@/components/CuratedSections";
import { Directory } from "@/components/Directory";
import { getArticles } from "@/lib/store";
import { HomeFeaturedGizmo, HomeSimulationLab } from "@/components/HomeGizmosSection";
import type { Article } from "@/lib/content";

// Tối ưu hóa tài nguyên Vercel: Dùng ISR (Incremental Static Regeneration) 1 giờ.
// Trang chủ sẽ được phục vụ siêu tốc từ Vercel Edge Cache (0 invocation, 0 CPU).
// Khi có bài mới được sinh và deploy, Vercel tự động build lại trang tĩnh.
export const revalidate = 3600;

export default async function HomePage() {
  const all = await getArticles();

  // Trang chủ chỉ cần metadata. Bỏ toàn văn markdown để không gửi cả bài xuống trình duyệt.
  const articles: Article[] = all.map((a) => {
    const { content: _content, brief: _brief, practical: _practical, ...meta } = a as Article & {
      content?: string;
      brief?: unknown;
      practical?: unknown;
    };
    return meta;
  });

  return (
    <main>
      <Hero articles={articles} />

      {/* ---- Bài mới nhất: 1 bài lớn + 3 bài nhỏ (Spotlight Masthead) ---- */}
      <HomeMagazine articles={articles} />

      {/* ---- Các tuyến chuyên đề biên tập theo phong cách tạp chí khoa học cao cấp ---- */}
      <CuratedSections articles={articles} />

      {/* ---- Dải thông tin tác giả & chuẩn biên tập ---- */}
      <HeroStrip />

      {/* ---- Dụng cụ mô phỏng tương tác ---- */}
      <HomeFeaturedGizmo />

      {/* ---- Kho bài viết toàn văn dạng thư mục tìm kiếm & bộ lọc ---- */}
      <Directory articles={articles} />

      {/* ---- Simulation Engines Index ---- */}
      <HomeSimulationLab />
    </main>
  );
}
