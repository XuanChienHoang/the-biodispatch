import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { GIZMOS } from "@/lib/content";
import PKGizmo from "@/components/gizmo/PKGizmo";
import PathwayGizmo from "@/components/gizmo/PathwayGizmo";
import SynergyGizmo from "@/components/gizmo/SynergyGizmo";
import BiomarkerGizmo from "@/components/gizmo/BiomarkerGizmo";
import CurcuminPiperineGizmo from "@/components/gizmo/CurcuminPiperine";
import { GizmoViewWrapper } from "@/components/GizmoViewWrapper";

const ENGINES: Record<
  string,
  {
    Comp: () => React.ReactElement;
    assumptions: string[];
    assumptionsVi: string[];
    refs: string;
  }
> = {
  pk: {
    Comp: PKGizmo,
    assumptions: [
      "Single homogeneous compartment with instantaneous distribution",
      "First-order absorption and elimination (linear kinetics)",
      "Terminal kₑ held at 0.099 h⁻¹ for native curcuminoids",
      "High-fat meal multiplies F by 2.4 and delays ka by 0.62",
    ],
    assumptionsVi: [
      "Mô hình 1 ngăn đồng nhất với sự phân bố tức thời trong dịch thể",
      "Động học hấp thu và thải trừ bậc một (dược động học tuyến tính)",
      "Hằng số thải trừ kₑ được ấn định ở 0.099 h⁻¹ cho curcuminoids tự nhiên",
      "Bữa ăn giàu chất béo làm tăng sinh khả dụng F gấp 2.4 lần và kéo dài thời gian hấp thu ka",
    ],
    refs: "10.1002/9780470740412",
  },
  pathway: {
    Comp: PathwayGizmo,
    assumptions: [
      "Schematic topology — node positions carry no quantitative meaning",
      "Binary activation state, no graded dose-response modelled",
      "Downstream transcripts are illustrative of published target sets",
      "Cross-talk between the four axes is not simulated",
    ],
    assumptionsVi: [
      "Sơ đồ topo định tính — vị trí các nút biểu diễn dòng tín hiệu sinh học, không mang ý nghĩa khoảng cách vật lý",
      "Trạng thái kích hoạt nhị phân trực quan, không mô phỏng đường cong liều - đáp ứng đa tầng",
      "Các phân tử hạ nguồn đại diện cho tập hợp đích tác động đã được công bố trên các tạp chí bình duyệt",
      "Tương tác chéo phức tạp giữa 4 trục chưa được đưa vào phiên bản tính toán hiện tại",
    ],
    refs: "10.1038/nrd3757",
  },
  synergy: {
    Comp: SynergyGizmo,
    assumptions: [
      "Classification is qualitative; no additivity index (Bliss/Loewe) is computed",
      "Only the 8 agents shown are populated in this release",
      "Grade A = replicated human RCT, C = case report or in-vitro",
      "Missing cells mean unstudied, not safe",
    ],
    assumptionsVi: [
      "Phân loại hiệp đồng mang tính chất định tính thực chứng lâm sàng",
      "Chỉ có 8 hoạt chất và thuốc phổ biến nhất được nạp dữ liệu trong phiên bản này",
      "Mức bằng chứng A = thử nghiệm lâm sàng ngẫu nhiên có đối chứng (RCT) lặp lại trên người; C = báo cáo ca lâm sàng hoặc thử nghiệm in-vitro",
      "Ô trống nghĩa là chưa có nghiên cứu kiểm chứng, không có nghĩa là an toàn tuyệt đối khi dùng chung",
    ],
    refs: "10.1097/CLI.0000000000000042",
  },
  biomarker: {
    Comp: BiomarkerGizmo,
    assumptions: [
      "Fixed-effect pooling of randomised trial endpoints",
      "Relative effect held constant across the baseline range",
      "95% CI reflects sampling error only, not real-world variance",
      "No adjustment for regression to the mean or adherence",
    ],
    assumptionsVi: [
      "Phân tích gộp mô hình hiệu ứng cố định từ các thử nghiệm lâm sàng ngẫu nhiên",
      "Hiệu quả tương đối được giả định đồng nhất trên dải chỉ số ban đầu",
      "Khoảng tin cậy 95% CI phản ánh sai số chọn mẫu thống kê từ các nghiên cứu",
      "Chưa hiệu chỉnh cho hiện tượng hồi quy về giá trị trung bình hoặc mức độ tuân thủ liều dùng",
    ],
    refs: "10.1001/jama.2017.18240",
  },
  "curcumin-piperine": {
    Comp: CurcuminPiperineGizmo,
    assumptions: [
      "Piperine suppresses UGT1A1 in a saturating dose-response, capped at 88% by 20 mg",
      "Apparent bioavailability rises from 1.1% toward 5.5% as glucuronidation falls",
      "Terminal kₑ falls from 0.128 h⁻¹ to a floor of 0.032 h⁻¹ (t½ 5.4 h → 21.7 h)",
      "Single oral dose, 24 h trapezoidal integration window; enterohepatic recycling omitted",
    ],
    assumptionsVi: [
      "Piperine ức chế enzyme UGT1A1 theo đường cong bão hòa liều, đạt trần ức chế 88% ở mức liều 20 mg",
      "Sinh khả dụng biểu kiến tăng từ 1.1% lên tiệm cận 5.5% khi quá trình glucuronidation tại gan bị chặn",
      "Hằng số thải trừ kₑ giảm từ 0.128 h⁻¹ xuống sàn 0.032 h⁻¹ (thời gian bán thải t½ kéo dài từ 5.4h lên 21.7h)",
      "Liều uống đơn lẻ, tích phân diện tích AUC trong cửa sổ 24 giờ",
    ],
    refs: "10.1055/s-2006-957541",
  },
};

export function generateStaticParams(): { slug: string }[] {
  return [
    ...GIZMOS.map((g) => ({ slug: g.slug as string })),
    { slug: "curcumin-piperine" },
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const g = GIZMOS.find((x) => x.slug === slug);
  const title = slug === "curcumin-piperine" ? "Curcumin × Piperine Bio-enhancement" : g?.name;
  return { title: `${title} · The BioDispatch` };
}

export default async function GizmoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const engine = ENGINES[slug];
  if (!engine) notFound();

  const meta = GIZMOS.find((g) => g.slug === slug);
  const { Comp } = engine;
  const index = meta?.index ?? "01a";

  const defaultTitle =
    slug === "curcumin-piperine"
      ? "Curcumin × Piperine Bio-enhancement"
      : meta?.name ?? "Biomedical Simulation Engine";

  const defaultTitleVi =
    slug === "curcumin-piperine"
      ? "Mô phỏng Tăng cường Sinh khả dụng: Curcumin × Piperine"
      : meta?.nameVi ?? defaultTitle;

  const defaultBlurb =
    meta?.blurb ??
    "Piperine inhibits hepatic and intestinal UGT1A1, collapsing Phase II glucuronidation of curcuminoids and lifting systemic exposure roughly twenty-fold.";

  const defaultBlurbVi =
    meta?.blurbVi ??
    "Piperine ức chế enzyme UGT1A1 tại gan và ruột, tạm dừng quá trình thải trừ Phase II của curcuminoids và nâng nồng độ hấp thu trong máu lên gấp 20 lần.";

  return (
    <main className="min-h-screen">
      <GizmoViewWrapper
        slug={slug}
        index={index}
        name={defaultTitle}
        nameVi={defaultTitleVi}
        short={meta?.short ?? "Curcumin × Piperine"}
        blurb={defaultBlurb}
        blurbVi={defaultBlurbVi}
        refs={engine.refs}
        assumptions={engine.assumptions}
        assumptionsVi={engine.assumptionsVi}
      >
        <Comp />
      </GizmoViewWrapper>
    </main>
  );
}
