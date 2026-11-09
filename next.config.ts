import type { NextConfig } from "next";

const config: NextConfig = {
  distDir: process.env.NEXT_DIST_DIR || ".next",
  images: { formats: ["image/webp"], minimumCacheTTL: 60 * 60 * 24 * 31, deviceSizes: [360, 640, 828, 1080, 1440, 1920] },
  experimental: { optimizePackageImports: ["motion"] },
};
export default config;
