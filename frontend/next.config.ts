import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      'res.cloudinary.com', // Add Cloudinary domain
      'reimagined-tribble-pjjvj5vr44wrcjgj-8080.app.github.dev' // Add your dev server if needed
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination:
          process.env.NEXT_PUBLIC_API_SECONDARY_URL ||
          "https://reimagined-tribble-pjjvj5vr44wrcjgj-3000.app.github.dev/:path*",
      },
      {
        source: "/upload",
        destination:
          "https://reimagined-tribble-pjjvj5vr44wrcjgj-3000.app.github.dev/upload",
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,POST,PUT,DELETE,OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization",
          },
        ],
      },
    ];
  },
};

export default nextConfig;