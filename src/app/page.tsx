import { Hero } from "@/components/Hero";
import { Directory } from "@/components/Directory";
import { getArticles } from "@/lib/store";
import { HomeFeaturedGizmo, HomeSimulationLab } from "@/components/HomeGizmosSection";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const articles = await getArticles();

  return (
    <main>
      <Hero />

      {/* ---- featured interactive simulation instrument ---- */}
      <HomeFeaturedGizmo />

      {/* ---- Corpus / Directory of papers ---- */}
      <Directory articles={articles} />

      {/* ---- Simulation Engines Index ---- */}
      <HomeSimulationLab />
    </main>
  );
}
