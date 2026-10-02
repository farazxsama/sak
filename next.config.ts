import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   output: "export",

  images: {
    unoptimized: true,
  },

  trailingSlash: true,

  generateBuildId: async () => {
    return "static-build";
  },

  turbopack: {}, // 👈 fixes the turbopack warning
};

export default nextConfig;
