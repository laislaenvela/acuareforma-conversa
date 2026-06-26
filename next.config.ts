import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable compression for production builds
  compress: true,

  // Optimize production builds
  productionBrowserSourceMaps: false,

  // Experimental optimizations
  experimental: {
    optimizePackageImports: ["react", "react-dom"],
  },

  // Headers for caching optimization
  async headers() {
    return [
      {
        source: "/public/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
