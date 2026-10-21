import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  outputFileTracingRoot: path.join(__dirname),
  transpilePackages: ["framer-motion"],
  serverExternalPackages: ["msedge-tts", "ws"],
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: "/blog/thoi-quen-nhai-ky-no-lau-vi-sinh-duong-ruot-en",
        destination: "/blog/chewing-slowly-satiety-gut-hormones",
        permanent: true,
      },
      {
        source: "/blog/thoi-quen-nhai-ky-noi-sinh-hoc-tieu-hoa-en",
        destination: "/blog/chewing-slowly-satiety-gut-hormones",
        permanent: true,
      },
      {
        source: "/blog/thoi-quen-nhai-ky-no-lau-vi-sinh-duong-ruot-vi",
        destination: "/blog/nhai-ky-no-lau-giam-calo",
        permanent: true,
      },
      {
        source: "/blog/thoi-quen-nhai-ky-noi-sinh-hoc-tieu-hoa-vi",
        destination: "/blog/nhai-ky-no-lau-giam-calo",
        permanent: true,
      },
      {
        source: "/blog/truc-nao-ruot-va-con-duong-phe-vi-vi-khuan-gaba-vi",
        destination: "/blog/tam-trang-bat-an-bat-nguon-tu-duong-ruot-vagus-nerve-gaba-vi",
        permanent: true,
      },
      {
        source: "/blog/truc-nao-ruot-gaba-vi-khuan-vi",
        destination: "/blog/tam-trang-bat-an-bat-nguon-tu-duong-ruot-vagus-nerve-gaba-vi",
        permanent: true,
      },
      {
        source: "/blog/gut-brain-axis-vagal-gaba-pathway-en",
        destination: "/blog/how-gut-microbes-talk-to-the-brain-vagus-nerve-gaba-en",
        permanent: true,
      },
      {
        source: "/blog/gut-brain-axis-gaba-microbiota-en",
        destination: "/blog/how-gut-microbes-talk-to-the-brain-vagus-nerve-gaba-en",
        permanent: true,
      },
      {
        source: "/blog/collagen-peptide-thuy-phan-hap-thu-ruot-va-da-vi",
        destination: "/blog/collagen-peptide-thuy-phan-su-that-sinh-hoc-vi-mo-vi",
        permanent: true,
      },
      {
        source: "/blog/di-bo-sau-an-giam-duong-huyet-vi-sao-hieu-qua-vi",
        destination: "/blog/di-bo-sau-an-giai-ma-chuyen-hoa-glut4-khong-can-insulin-vi",
        permanent: true,
      },
      {
        source: "/blog/di-bo-10-phut-sau-bua-an-kich-hoat-co-bap-vi",
        destination: "/blog/di-bo-sau-an-giai-ma-chuyen-hoa-glut4-khong-can-insulin-vi",
        permanent: true,
      },
      {
        source: "/blog/post-meal-walking-blood-sugar-mechanisms-en",
        destination: "/blog/post-meal-walking-glut4-insulin-independent-clearance-en",
        permanent: true,
      },
      {
        source: "/blog/ten-minute-post-meal-walk-glucose-clearance-en",
        destination: "/blog/post-meal-walking-glut4-insulin-independent-clearance-en",
        permanent: true,
      },
      {
        source: "/blog/co-che-zonulin-va-hoi-chung-ro-ri-ruot-vi",
        destination: "/blog/co-che-ro-ri-ruot-va-xu-huong-viêm-he-thong-vi",
        permanent: true,
      },
      {
        source: "/blog/giai-ma-hoi-chung-ro-ri-ruot-zonulin-lps-vi",
        destination: "/blog/co-che-ro-ri-ruot-va-xu-huong-viêm-he-thong-vi",
        permanent: true,
      },
      {
        source: "/blog/l-theanine-va-caffeine-song-nao-alpha-vi",
        destination: "/blog/tra-xanh-l-theanine-va-caffeine-tinh-tao-em-ai-vi",
        permanent: true,
      },
      {
        source: "/blog/mitohormesis-va-nghich-ly-stress-oxi-hoa-vi",
        destination: "/blog/nghich-ly-mitohormesis-va-suc-manh-cua-stress-oxy-hoa-co-kiem-soat-vi",
        permanent: true,
      },
      {
        source: "/blog/vitamin-d3-k2-nghich-ly-canxi-vi",
        destination: "/blog/vitamin-d3-k2-mk7-chong-voi-hoa-dong-mach-vi",
        permanent: true,
      },
      {
        source: "/blog/alpha-ketoglutarate-tre-hoa-bieu-gen-vi",
        destination: "/blog/alpha-ketoglutarate-dao-nguoc-dong-ho-bieu-sinh-vi",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
